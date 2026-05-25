import * as fs from 'fs';
import * as path from 'path';
import {
  formatOriginalErbEvidenceForPrompt,
  loadOriginalErbEvidenceBundle,
} from '../adapters/originalErbEvidenceLoader';
import { callOpenRouterJson, type ChatMessage, type OpenRouterOptions } from '../openrouter/client';
import type {
  AiPortTiming,
  ErbCommandFacts,
  ErbFactReview,
  ErbUnparsedLine,
  EvidenceFile,
  ValidationResult,
} from '../types';
import {
  validateErbCommandFactsCompleteness,
  validateErbFactReview,
} from '../validators/factValidator';

export interface ExtractFactsOptions {
  webPortRoot: string;
  commandId: string;
  outDir: string;
  apiKey: string;
  model: string;
  reviewModel?: string;
  fallbackModels?: string[];
  reviewFallbackModels?: string[];
  review?: boolean;
}

export interface FactExtractionResult {
  schemaVersion: 'erb-fact-extraction-result/v1';
  commandId: string;
  factsPath: string;
  localValidationPath: string;
  reviewPath?: string;
  localValidation: ValidationResult;
  reviewValidation?: ValidationResult;
  approvedForSynthesis: boolean;
  timings: AiPortTiming[];
}

interface RobustJsonOptions<T> extends OpenRouterOptions {
  modelFallbacks?: string[];
  validate?: (value: T) => ValidationResult;
  normalize?: (value: T) => T;
  maxCorrectionAttempts?: number;
}

function readPrompt(webPortRoot: string, fileName: string): string {
  return fs.readFileSync(path.join(webPortRoot, 'tools', 'ai-port', 'openrouter', 'prompts', fileName), 'utf-8');
}

function writeJson(filePath: string, value: unknown): void {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf-8');
}

function uniqueStrings(values: readonly string[]): string[] {
  return Array.from(new Set(values.filter((value) => value.trim().length > 0)));
}

function shouldRetryError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return /timed out|max_tokens|not parseable JSON|content was not a string|OpenRouter request failed:\s*(429|500|502|503|504)/i.test(message);
}

function correctionMessages<T>(
  messages: readonly ChatMessage[],
  previousOutput: T | undefined,
  feedback: readonly string[],
): ChatMessage[] {
  return [
    ...messages,
    ...(previousOutput ? [{
      role: 'assistant' as const,
      content: JSON.stringify(previousOutput, null, 2),
    }] : []),
    {
      role: 'user',
      content: [
        'The previous output failed local validation.',
        'Return corrected JSON only. Do not explain.',
        'Fix these validation issues. If a line cannot be normalized, add it to unparsedLines with mayAffectBehavior set honestly.',
        ...feedback.slice(0, 80).map((item) => `- ${item}`),
      ].join('\n'),
    },
  ];
}

async function callJsonWithValidation<T>(
  messages: readonly ChatMessage[],
  options: RobustJsonOptions<T>,
): Promise<T> {
  const models = uniqueStrings([options.model, ...(options.modelFallbacks ?? [])]);
  const maxCorrectionAttempts = options.maxCorrectionAttempts ?? 2;
  const failures: string[] = [];

  for (const model of models) {
    let currentMessages = [...messages];
    let maxTokens = options.maxTokens;
    let lastValue: T | undefined;

    for (let attempt = 0; attempt <= maxCorrectionAttempts; attempt += 1) {
      try {
        const raw = await callOpenRouterJson<T>(currentMessages, {
          ...options,
          model,
          maxTokens,
          stage: attempt === 0 ? options.stage : `${options.stage ?? 'openrouter'}:repair${attempt}`,
        });
        const value = options.normalize ? options.normalize(raw) : raw;
        lastValue = value;
        const validation = options.validate?.(value);
        if (!validation || validation.ok) return value;
        if (attempt >= maxCorrectionAttempts) return value;
        currentMessages = correctionMessages(messages, value, [...validation.errors, ...validation.warnings]);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        failures.push(`${model}: ${message}`);
        if (!shouldRetryError(error)) break;
        if (/max_tokens/i.test(message)) {
          maxTokens = Math.min(Math.ceil((maxTokens ?? 7000) * 1.5), 14000);
        }
      }
    }

    if (lastValue !== undefined) return lastValue;
  }

  throw new Error(`OpenRouter fact call failed after ${models.length} model route(s):\n${failures.join('\n')}`);
}

function evidenceSourceFiles(files: readonly EvidenceFile[]): ErbCommandFacts['sourceFiles'] {
  return files.map((file) => ({
    path: file.originalPath ?? file.path.split('#')[0],
    kind: file.path.includes('COMABLE.ERB') ? 'comable-erb' : 'command-erb',
    lineStart: file.range?.startLine ?? 1,
    lineEnd: file.range?.endLine ?? file.content.split(/\r?\n/).length,
  }));
}

function normalizeFacts(
  value: ErbCommandFacts,
  commandId: string,
  commandNumber: number,
  evidenceFiles: readonly EvidenceFile[],
): ErbCommandFacts {
  return {
    ...value,
    schemaVersion: 'erb-command-facts/v1',
    command: {
      ...value.command,
      id: commandId,
      originalId: commandNumber,
    },
    sourceFiles: evidenceSourceFiles(evidenceFiles),
    formulaGates: value.formulaGates ?? [],
    unparsedLines: normalizeUnparsedLines(value.unparsedLines ?? []),
    notes: value.notes ?? [],
  };
}

function normalizeUnparsedLines(lines: readonly unknown[]): ErbUnparsedLine[] {
  return lines
    .filter((line): line is Record<string, unknown> => line !== null && typeof line === 'object' && !Array.isArray(line))
    .map((line, index) => ({
      file: typeof line.file === 'string' ? line.file : '',
      lineStart: typeof line.lineStart === 'number' ? line.lineStart : 0,
      lineEnd: typeof line.lineEnd === 'number' ? line.lineEnd : typeof line.lineStart === 'number' ? line.lineStart : 0,
      raw: typeof line.raw === 'string' ? line.raw : '',
      reason: typeof line.reason === 'string' && line.reason.trim().length > 0
        ? line.reason
        : typeof line.summary === 'string' && line.summary.trim().length > 0
          ? line.summary
          : `Unparsed behavior-bearing line ${index}.`,
      mayAffectBehavior: typeof line.mayAffectBehavior === 'boolean'
        ? line.mayAffectBehavior
        : typeof line.mustImplement === 'boolean'
          ? line.mustImplement
          : true,
    }));
}

export async function extractErbFacts(options: ExtractFactsOptions): Promise<FactExtractionResult> {
  const bundle = loadOriginalErbEvidenceBundle(options.webPortRoot, options.commandId);
  const commandDir = path.join(options.outDir, bundle.commandId);
  const factsPath = path.join(commandDir, `${bundle.commandId}.facts.json`);
  const localValidationPath = path.join(commandDir, `${bundle.commandId}.facts.local-validation.json`);
  const reviewPath = path.join(commandDir, `${bundle.commandId}.facts.review.json`);
  const resultPath = path.join(commandDir, `${bundle.commandId}.facts.result.json`);
  const timings: AiPortTiming[] = [];
  const onTiming = (timing: AiPortTiming): void => {
    timings.push(timing);
  };

  const extractionPrompt = readPrompt(options.webPortRoot, 'erb-fact-extraction.md');
  let facts = await callJsonWithValidation<ErbCommandFacts>([
    { role: 'system', content: extractionPrompt },
    {
      role: 'user',
      content: JSON.stringify({
        command: { id: bundle.commandId, originalId: bundle.commandNumber },
        evidence: formatOriginalErbEvidenceForPrompt(bundle),
      }, null, 2),
    },
  ], {
    apiKey: options.apiKey,
    model: options.model,
    modelFallbacks: options.fallbackModels,
    title: `ai-port facts ${bundle.commandId}`,
    stage: 'facts',
    maxTokens: 14000,
    timeoutMs: 180000,
    cache: true,
    responseHealing: true,
    providerSort: 'throughput',
    requireParameters: true,
    reasoningMaxTokens: 512,
    excludeReasoning: true,
    onTiming,
    normalize: (value) => normalizeFacts(value, bundle.commandId, bundle.commandNumber, bundle.files),
    validate: (value) => validateErbCommandFactsCompleteness(value, bundle.files),
  });

  let normalizedFacts = normalizeFacts(facts, bundle.commandId, bundle.commandNumber, bundle.files);
  let localValidation = validateErbCommandFactsCompleteness(normalizedFacts, bundle.files);

  let factReview: ErbFactReview | undefined;
  let reviewValidation: ValidationResult | undefined;

  if (options.review !== false) {
    const reviewPrompt = readPrompt(options.webPortRoot, 'erb-fact-review.md');
    factReview = await reviewFacts({
      prompt: reviewPrompt,
      bundle,
      facts: normalizedFacts,
      localValidation,
      options,
      onTiming,
    });
    reviewValidation = validateErbFactReview(factReview);

    if (factReview.approved !== true || (factReview.missingFacts?.length ?? 0) > 0) {
      facts = await callJsonWithValidation<ErbCommandFacts>([
        { role: 'system', content: extractionPrompt },
        {
          role: 'user',
          content: JSON.stringify({
            command: { id: bundle.commandId, originalId: bundle.commandNumber },
            evidence: formatOriginalErbEvidenceForPrompt(bundle),
            previousFacts: normalizedFacts,
            localValidation,
            factReview,
            instruction: 'Return corrected erb-command-facts/v1 JSON. Preserve valid rows, add missing facts, and fix review findings. Do not output review JSON.',
          }, null, 2),
        },
      ], {
        apiKey: options.apiKey,
        model: options.model,
        modelFallbacks: options.fallbackModels,
        title: `ai-port facts review-repair ${bundle.commandId}`,
        stage: 'facts:review-repair',
        maxTokens: 14000,
        timeoutMs: 180000,
        cache: true,
        responseHealing: true,
        providerSort: 'throughput',
        requireParameters: true,
        reasoningMaxTokens: 512,
        excludeReasoning: true,
        onTiming,
        normalize: (value) => normalizeFacts(value, bundle.commandId, bundle.commandNumber, bundle.files),
        validate: (value) => validateErbCommandFactsCompleteness(value, bundle.files),
      });
      normalizedFacts = normalizeFacts(facts, bundle.commandId, bundle.commandNumber, bundle.files);
      localValidation = validateErbCommandFactsCompleteness(normalizedFacts, bundle.files);
      factReview = await reviewFacts({
        prompt: reviewPrompt,
        bundle,
        facts: normalizedFacts,
        localValidation,
        options,
        onTiming,
        stageSuffix: 'after-repair',
      });
      reviewValidation = validateErbFactReview(factReview);
    }
  }

  writeJson(factsPath, normalizedFacts);
  writeJson(localValidationPath, localValidation);
  if (factReview) writeJson(reviewPath, factReview);

  const approvedForSynthesis = localValidation.ok &&
    (options.review === false || (factReview?.approved === true && reviewValidation?.ok === true));

  const result: FactExtractionResult = {
    schemaVersion: 'erb-fact-extraction-result/v1',
    commandId: bundle.commandId,
    factsPath: factsPath.replace(/\\/g, '/'),
    localValidationPath: localValidationPath.replace(/\\/g, '/'),
    reviewPath: factReview ? reviewPath.replace(/\\/g, '/') : undefined,
    localValidation,
    reviewValidation,
    approvedForSynthesis,
    timings,
  };
  writeJson(resultPath, result);
  return result;
}

async function reviewFacts(args: {
  prompt: string;
  bundle: ReturnType<typeof loadOriginalErbEvidenceBundle>;
  facts: ErbCommandFacts;
  localValidation: ValidationResult;
  options: ExtractFactsOptions;
  onTiming: (timing: AiPortTiming) => void;
  stageSuffix?: string;
}): Promise<ErbFactReview> {
  return callJsonWithValidation<ErbFactReview>([
    { role: 'system', content: args.prompt },
    {
      role: 'user',
      content: JSON.stringify({
        command: { id: args.bundle.commandId, originalId: args.bundle.commandNumber },
        evidence: formatOriginalErbEvidenceForPrompt(args.bundle),
        facts: args.facts,
        localValidation: args.localValidation,
      }, null, 2),
    },
  ], {
    apiKey: args.options.apiKey,
    model: args.options.reviewModel ?? args.options.model,
    modelFallbacks: args.options.reviewFallbackModels ?? args.options.fallbackModels,
    title: `ai-port fact review ${args.bundle.commandId}`,
    stage: args.stageSuffix ? `facts:review:${args.stageSuffix}` : 'facts:review',
    maxTokens: 3000,
    timeoutMs: 90000,
    cache: true,
    responseHealing: true,
    providerSort: 'throughput',
    requireParameters: true,
    reasoningMaxTokens: 256,
    excludeReasoning: true,
    onTiming: args.onTiming,
    validate: validateErbFactReview,
  });
}
