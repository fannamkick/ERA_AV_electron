import * as fs from 'fs';
import * as path from 'path';
import {
  formatOriginalErbEvidenceForPrompt,
  loadOriginalErbEvidenceBundle,
} from '../adapters/originalErbEvidenceLoader';
import { buildDraftFromIr } from '../ir/codegen';
import { callOpenRouterJson, type ChatMessage, type OpenRouterOptions } from '../openrouter/client';
import type {
  AiPortTiming,
  AiReview,
  AutopilotResult,
  CommandDraft,
  ErbCommandIr,
  ErbSourceFile,
  EvidenceFile,
  JsonValue,
  ValidationResult,
  WorkerConflict,
  WorkerReport,
} from '../types';
import { classifyAutopilotResult, inferFamilyStatus } from '../validators/gateValidator';
import { collectIrSemanticIssues, validateErbCommandIrShape } from '../validators/irValidator';
import { validateAiReview, validateCommandDraft, validateWorkerReport } from '../validators/reportValidator';

export interface SynthesizeFromFactsOptions {
  webPortRoot: string;
  commandId: string;
  outDir: string;
  apiKey: string;
  model: string;
  reviewModel?: string;
  fallbackModels?: string[];
  reviewFallbackModels?: string[];
  review?: boolean;
  apply?: boolean;
  forceApply?: boolean;
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
        'The previous strict IR failed local validation.',
        'Return corrected erb-command-ir/v1 JSON only. Do not explain.',
        'Do not replace invalid logic with prose. Use supported AST objects, or emit an unsupported operation.',
        ...feedback.slice(0, 100).map((item) => `- ${item}`),
      ].join('\n'),
    },
  ];
}

async function callJsonWithValidation<T>(
  messages: readonly ChatMessage[],
  options: RobustJsonOptions<T>,
): Promise<T> {
  const models = uniqueStrings([options.model, ...(options.modelFallbacks ?? [])]);
  const maxCorrectionAttempts = options.maxCorrectionAttempts ?? 3;
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
          maxTokens = Math.min(Math.ceil((maxTokens ?? 10000) * 1.5), 18000);
        }
      }
    }

    if (lastValue !== undefined) return lastValue;
  }

  throw new Error(`OpenRouter strict IR call failed after ${models.length} model route(s):\n${failures.join('\n')}`);
}

function evidenceSourceFiles(files: readonly EvidenceFile[]): ErbSourceFile[] {
  return files.map((file) => ({
    path: file.originalPath ?? file.path.split('#')[0],
    kind: file.path.includes('COMABLE.ERB') ? 'comable-erb' : 'command-erb',
    lineStart: file.range?.startLine ?? 1,
    lineEnd: file.range?.endLine ?? file.content.split(/\r?\n/).length,
  }));
}

function isObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function numericLiteral(value: unknown): number | unknown {
  if (typeof value === 'number') return value;
  if (isObject(value) && value.kind === 'literal' && typeof value.value === 'number') return value.value;
  return value;
}

function normalizeCondition(condition: unknown): unknown {
  if (!isObject(condition)) return condition;

  if (condition.kind === 'statCompare') {
    const raw = isObject(condition.ref) ? String(condition.ref.domain) : undefined;
    const value = isObject(condition.value) && condition.value.kind === 'literal'
      ? numericLiteral(condition.value)
      : condition.value;
    return {
      ...condition,
      value: typeof value === 'number' && (raw === 'PALAMLV' || raw === 'EXPLV')
        ? { kind: 'levelThreshold', domain: raw, level: value }
        : value,
    };
  }

  if ((condition.kind === 'all' || condition.kind === 'any') && Array.isArray(condition.conditions)) {
    return {
      ...condition,
      conditions: condition.conditions.map(normalizeCondition),
    };
  }

  if (condition.kind === 'not') {
    return {
      ...condition,
      condition: normalizeCondition(condition.condition),
    };
  }

  return condition;
}

function normalizeNumericValue(value: unknown): unknown {
  if (typeof value === 'number') return { kind: 'literal', value };
  if (!isObject(value)) return value;

  if (value.kind === 'table') {
    return {
      ...value,
      values: Array.isArray(value.values) ? value.values.map((item) => Number(item)) : value.values,
    };
  }

  if (value.kind === 'conditional' && Array.isArray(value.cases)) {
    return {
      ...value,
      cases: value.cases.map((entry) => isObject(entry)
        ? { ...entry, when: normalizeCondition(entry.when), value: normalizeNumericValue(entry.value) }
        : entry),
      otherwise: value.otherwise !== undefined ? normalizeNumericValue(value.otherwise) : undefined,
    };
  }

  if (value.kind === 'binary') {
    return {
      ...value,
      left: normalizeNumericValue(value.left),
      right: normalizeNumericValue(value.right),
    };
  }

  return value;
}

function normalizeTermLevelNumericValue(term: Record<string, unknown>): unknown {
  if (term.value !== undefined) return normalizeNumericValue(term.value);

  switch (term.kind) {
    case 'literal':
      return normalizeNumericValue({ kind: 'literal', value: term.value });
    case 'levelThreshold':
      return normalizeNumericValue({ kind: 'levelThreshold', domain: term.domain, level: term.level });
    case 'table':
      return normalizeNumericValue({ kind: 'table', by: term.by, values: term.values, clamp: term.clamp });
    case 'conditional':
      return normalizeNumericValue({ kind: 'conditional', cases: term.cases, otherwise: term.otherwise });
    case 'stat':
      return normalizeNumericValue({ kind: 'stat', ref: term.ref });
    case 'binary':
      return normalizeNumericValue({ kind: 'binary', op: term.op, left: term.left, right: term.right });
    default:
      return term.value;
  }
}

function normalizeFormulaTerm(term: unknown): unknown {
  if (!isObject(term)) return term;

  const next: Record<string, unknown> = { ...term };
  const value = normalizeTermLevelNumericValue(next);

  if (value !== undefined) {
    next.value = next.multiplier !== undefined
      ? {
        kind: 'binary',
        op: 'multiply',
        left: value,
        right: normalizeNumericValue(next.multiplier),
      }
      : value;
  }

  if (next.kind === 'formula' || ['literal', 'levelThreshold', 'table', 'conditional', 'stat', 'binary'].includes(String(next.kind))) {
    delete next.kind;
  }
  if (next.multiplier !== undefined) delete next.multiplier;
  if (term.value === undefined && String(term.kind) === 'conditional') {
    delete next.cases;
    delete next.otherwise;
  }
  if (term.value === undefined && String(term.kind) === 'table') {
    delete next.by;
    delete next.values;
    delete next.clamp;
  }
  if (term.value === undefined && String(term.kind) === 'stat') {
    delete next.ref;
  }
  if (term.value === undefined && String(term.kind) === 'binary') {
    delete next.op;
    delete next.left;
    delete next.right;
  }

  if (next.when !== undefined) next.when = normalizeCondition(next.when);
  return next;
}

function normalizeOperation(operation: unknown): unknown {
  if (!isObject(operation)) return operation;
  const next: Record<string, unknown> = { ...operation };

  if (
    isObject(next.evidence) &&
    typeof next.evidence.raw === 'string' &&
    /^\s*SAVESTR:\d+\s*=/.test(next.evidence.raw)
  ) {
    const text = next.evidence.raw.split('=').slice(1).join('=').trim();
    return {
      ...next,
      kind: 'message',
      text,
      behaviorAffecting: false,
      note: next.note ?? 'Legacy SAVESTR command label is treated as non-behavioral display metadata.',
    };
  }

  if (!('value' in next) && 'factor' in next) next.value = next.factor;
  if (!('when' in next) && 'condition' in next && next.kind !== 'requirement') next.when = next.condition;

  if ('condition' in next) next.condition = normalizeCondition(next.condition);
  if ('when' in next) next.when = normalizeCondition(next.when);
  if ('autoPassWhen' in next) next.autoPassWhen = normalizeCondition(next.autoPassWhen);
  if ('value' in next) next.value = normalizeNumericValue(next.value);
  if ('threshold' in next) next.threshold = normalizeNumericValue(next.threshold);
  if (Array.isArray(next.terms)) {
    next.terms = next.terms.map(normalizeFormulaTerm);
  }
  if (Array.isArray(next.thresholdModifiers)) {
    next.thresholdModifiers = next.thresholdModifiers.map((modifier) => isObject(modifier)
      ? { ...modifier, when: normalizeCondition(modifier.when) }
      : modifier);
  }
  if (next.kind === 'stainMerge') {
    if (next.mode === 'bidirectionalMerge') next.mode = 'bidirectional';
    if (next.mode === 'mergeIntoTo') next.mode = 'fromTo';
    if (next.mode === 'mergeIntoFrom') next.mode = 'toFrom';
  }
  if (next.kind === 'formulaGate') {
    const failWhen = next.failWhen;
    if (
      typeof failWhen === 'string' ||
      (isObject(failWhen) && failWhen.kind === 'statCompare' && isObject(failWhen.ref) && !['ABL', 'TALENT', 'TEQUIP', 'CFLAG', 'TFLAG', 'FLAG', 'SOURCE', 'EXP', 'PALAM', 'LOSEBASE', 'BASE', 'STAIN', 'MARK', 'ITEM'].includes(String(failWhen.ref.domain)))
    ) {
      next.failWhen = { kind: 'scoreBelowThreshold' };
    } else if (isObject(failWhen) && failWhen.kind === 'condition') {
      next.failWhen = {
        ...failWhen,
        condition: normalizeCondition(failWhen.condition),
      };
    }
  }
  if ((next.kind === 'returnFailure' || next.kind === 'returnSuccess') && isObject(next.when) && next.when.kind === 'scoreBelowThreshold') {
    delete next.when;
  }
  if ((next.kind === 'returnFailure' || next.kind === 'returnSuccess') && isObject(next.condition) && next.condition.kind === 'scoreBelowThreshold') {
    delete next.condition;
  }
  if ((next.kind === 'returnFailure' || next.kind === 'returnSuccess') && typeof next.gateId === 'string') {
    delete next.gateId;
  }
  return next;
}

function normalizeIr(
  value: ErbCommandIr,
  commandId: string,
  originalId: number,
  evidenceFiles: readonly EvidenceFile[],
): ErbCommandIr {
  return {
    ...value,
    schemaVersion: 'erb-command-ir/v1',
    command: {
      ...value.command,
      id: commandId,
      originalId,
    },
    sourceFiles: evidenceSourceFiles(evidenceFiles),
    operations: ((value.operations ?? []) as unknown[]).map(normalizeOperation) as ErbCommandIr['operations'],
    notes: value.notes ?? [],
  };
}

function validateStrictIr(value: ErbCommandIr): ValidationResult {
  const shape = validateErbCommandIrShape(value);
  if (!shape.ok) return shape;

  const semantic = collectIrSemanticIssues(value);
  return {
    ok: true,
    errors: [],
    warnings: [
      ...shape.warnings,
      ...semantic.mappingIssues.map((issue) => issue.message ?? `Mapping issue for ${issue.legacy.domain}:${issue.legacy.index}.`),
      ...semantic.unsupportedOperations.map((operation) => `${operation.id}: unsupported operation is recorded.`),
    ],
  };
}

function buildInvalidIrDraft(ir: ErbCommandIr, validation: ValidationResult): CommandDraft {
  const conflicts: WorkerConflict[] = validation.errors.map((error) => ({
    area: 'unknown',
    sources: [],
    decisionNeeded: error,
    blocksMigration: true,
  }));

  return {
    schemaVersion: 'training-command-draft/v1',
    commandId: ir.command.id,
    sourceReport: `${ir.command.id}.ir.json`,
    files: [{
      path: `docs/ai-port/spec-drafts/${ir.command.id}.invalid-ir.md`,
      operation: 'create',
      reason: 'Strict IR failed local validation; executable TypeScript must not be emitted from invalid IR.',
      content: [
        `# ${ir.command.id} Invalid Strict IR`,
        '',
        'Executable TypeScript was not emitted because the strict IR failed local validation.',
        '',
        '## Validation Errors',
        ...validation.errors.map((error) => `- ${error}`),
        '',
        '## Validation Warnings',
        ...(validation.warnings.length > 0 ? validation.warnings.map((warning) => `- ${warning}`) : ['- none']),
        '',
      ].join('\n'),
    }],
    requiredChecks: ['schema', 'strict-ir', 'mapping-resolution', 'typecheck'],
    unresolvedConflicts: conflicts,
    notes: [
      'Generated from erb-command-ir/v1.',
      'Invalid IR is intentionally blocked before executable codegen.',
    ],
  };
}

function conflictBlocksMigration(conflict: WorkerConflict): boolean {
  const record = conflict as unknown as Record<string, unknown>;
  return conflict.blocksMigration === true ||
    record.blocking === true ||
    ['blocking', 'blocker', 'blocked'].includes(String(record.severity ?? '').toLowerCase());
}

function draftBlockingConflicts(draft: CommandDraft): WorkerConflict[] {
  return draft.unresolvedConflicts.filter(conflictBlocksMigration);
}

function assertInsideWorkspace(workspaceRoot: string, targetPath: string): void {
  const resolvedRoot = path.resolve(workspaceRoot);
  const resolvedTarget = path.resolve(workspaceRoot, targetPath);
  if (resolvedTarget !== resolvedRoot && !resolvedTarget.startsWith(`${resolvedRoot}${path.sep}`)) {
    throw new Error(`Refusing to write outside workspace: ${targetPath}`);
  }
}

function normalizeDraftPath(filePath: string): string {
  return filePath.replace(/\\/g, '/').replace(/^web-port\//, '');
}

function reviewApproved(review: AiReview | undefined): boolean {
  return review?.approved === true && review.riskLevel !== 'high';
}

function materializeReviewedDraft(args: {
  webPortRoot: string;
  draft: CommandDraft;
  draftValidation: ValidationResult;
  review?: AiReview;
  reviewValidation?: ValidationResult;
  force?: boolean;
}): string[] {
  if (!args.draftValidation.ok) {
    throw new Error(`Refusing to apply draft with local validation errors:\n${args.draftValidation.errors.join('\n')}`);
  }
  if (!args.review || !reviewApproved(args.review)) {
    throw new Error('Refusing to apply draft without an approved non-high-risk AI review.');
  }
  if (args.reviewValidation && !args.reviewValidation.ok) {
    throw new Error(`Refusing to apply draft with invalid AI review:\n${args.reviewValidation.errors.join('\n')}`);
  }

  const codeFiles = args.draft.files.filter((file) => normalizeDraftPath(file.path).startsWith('src/'));
  if (codeFiles.length === 0) {
    throw new Error('Refusing to apply draft because it does not contain any src/ code file.');
  }
  const blockingConflicts = draftBlockingConflicts(args.draft);
  if (blockingConflicts.length > 0) {
    throw new Error(`Refusing to apply draft with blocking unresolved conflicts: ${blockingConflicts.map((conflict) => conflict.decisionNeeded).join('; ')}`);
  }

  const written: string[] = [];
  for (const file of args.draft.files) {
    const normalizedPath = normalizeDraftPath(file.path);
    assertInsideWorkspace(args.webPortRoot, normalizedPath);
    const absoluteTarget = path.resolve(args.webPortRoot, normalizedPath);
    const exists = fs.existsSync(absoluteTarget);

    if (file.operation === 'create' && exists && !args.force) {
      throw new Error(`Refusing to overwrite existing file without forceApply: ${normalizedPath}`);
    }
    if (file.operation === 'update' && !exists) {
      throw new Error(`Refusing to update missing file: ${normalizedPath}`);
    }

    fs.mkdirSync(path.dirname(absoluteTarget), { recursive: true });
    fs.writeFileSync(absoluteTarget, file.content, 'utf-8');
    written.push(normalizedPath);
  }

  return written;
}

function deriveWorkerReportFromIr(ir: ErbCommandIr, draft: CommandDraft): WorkerReport {
  return {
    schemaVersion: 'training-worker-report/v1',
    command: ir.command,
    category: 'original-erb-strict-ir',
    canonicalDecision: {
      availability: { file: ir.sourceFiles.find((file) => file.kind === 'comable-erb')?.path ?? `${ir.command.id}.COMABLE`, confidence: 'canonical' },
      sourceFormula: { file: ir.sourceFiles.find((file) => file.kind === 'command-erb')?.path ?? `${ir.command.id}.ERB`, confidence: 'canonical' },
      directEffects: { file: ir.sourceFiles.find((file) => file.kind === 'command-erb')?.path ?? `${ir.command.id}.ERB`, confidence: 'canonical' },
      sideEffects: { file: ir.sourceFiles.find((file) => file.kind === 'command-erb')?.path ?? `${ir.command.id}.ERB`, confidence: 'canonical' },
      messages: { file: ir.sourceFiles.find((file) => file.kind === 'command-erb')?.path ?? `${ir.command.id}.ERB`, confidence: 'canonical' },
    },
    availability: {
      hardBlockers: ir.operations.filter((operation) => operation.kind === 'requirement' || operation.kind === 'formulaGate') as unknown as JsonValue[],
      formulaGates: ir.operations.filter((operation) => operation.kind === 'formulaGate') as unknown as JsonValue[],
      unresolvedConflicts: [],
    },
    sourceFormula: {
      writes: ir.operations.filter((operation) => operation.kind.startsWith('source')) as unknown as JsonValue[],
      modifiers: [],
      rounding: 'none',
      indexPolicy: 'strict-ir',
      unresolvedConflicts: draft.unresolvedConflicts.filter((item) => item.area === 'source'),
    },
    sideEffects: {
      effects: ir.operations.filter((operation) => ['loseBaseAdd', 'baseAdd', 'expAdd', 'flagSet', 'stainMerge', 'stainSetBits', 'stainClearBits'].includes(operation.kind)) as unknown as JsonValue[],
      postEffects: ir.operations.filter((operation) => ['phaseSkip', 'returnSuccess', 'returnFailure'].includes(operation.kind)) as unknown as JsonValue[],
      messages: ir.operations.filter((operation) => operation.kind === 'message') as unknown as JsonValue[],
    },
    chainRemap: {
      dependencies: [],
      unresolvedConflicts: draft.unresolvedConflicts.filter((item) => !['source', 'effects', 'availability'].includes(item.area)),
    },
    engineGaps: {
      conditionPredicatesNeeded: [],
      effectTypesNeeded: Array.from(new Set(ir.operations.map((operation) => operation.kind))),
      phaseHooksNeeded: ir.operations.some((operation) => operation.kind === 'phaseSkip') ? ['phaseSkips'] : [],
      stateAdapterFieldsNeeded: [],
    },
    validationScenarios: [
      {
        name: `${ir.command.id} strict IR coverage`,
        expected: 'Every behavior-bearing ERB operation is represented as typed strict IR or an explicit unsupported operation.',
      },
      {
        name: `${ir.command.id} generated draft safety`,
        expected: 'Executable TypeScript is emitted only when all mappings and operation kinds are locally resolved.',
      },
    ],
    notes: [
      `IR operations: ${ir.operations.length}.`,
      `Blocking draft conflicts by area: ${JSON.stringify(draft.unresolvedConflicts.reduce<Record<string, number>>((acc, item) => {
        acc[item.area] = (acc[item.area] ?? 0) + 1;
        return acc;
      }, {}))}`,
    ],
  };
}

function mergeValidations(...validations: readonly ValidationResult[]): ValidationResult {
  const errors = validations.flatMap((validation) => validation.errors);
  const warnings = validations.flatMap((validation) => validation.warnings);
  return { ok: errors.length === 0, errors, warnings };
}

export async function synthesizeFromFacts(options: SynthesizeFromFactsOptions): Promise<AutopilotResult> {
  const bundle = loadOriginalErbEvidenceBundle(options.webPortRoot, options.commandId);
  const commandDir = path.join(options.outDir, bundle.commandId);
  const irPath = path.join(commandDir, `${bundle.commandId}.ir.json`);
  const irValidationPath = path.join(commandDir, `${bundle.commandId}.ir.local-validation.json`);
  const draftPath = path.join(commandDir, `${bundle.commandId}.draft.json`);
  const reportPath = path.join(commandDir, `${bundle.commandId}.report.json`);
  const reviewPath = path.join(commandDir, `${bundle.commandId}.review.json`);
  const resultPath = path.join(commandDir, `${bundle.commandId}.result.json`);
  const timings: AiPortTiming[] = [];
  const onTiming = (timing: AiPortTiming): void => {
    timings.push(timing);
  };

  const prompt = readPrompt(options.webPortRoot, 'erb-ir-extraction.md');
  const ir = await callJsonWithValidation<ErbCommandIr>([
    { role: 'system', content: prompt },
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
    title: `ai-port strict-ir ${bundle.commandId}`,
    stage: 'strict-ir',
    maxTokens: 16000,
    timeoutMs: 220000,
    cache: true,
    responseHealing: true,
    providerSort: 'throughput',
    requireParameters: true,
    reasoningMaxTokens: 512,
    excludeReasoning: true,
    onTiming,
    normalize: (value) => normalizeIr(value, bundle.commandId, bundle.commandNumber, bundle.files),
    validate: (value) => validateStrictIr(value),
  });

  const normalizedIr = normalizeIr(ir, bundle.commandId, bundle.commandNumber, bundle.files);
  const irValidation = validateStrictIr(normalizedIr);
  const draft = irValidation.ok ? buildDraftFromIr(normalizedIr) : buildInvalidIrDraft(normalizedIr, irValidation);
  const draftValidation = validateCommandDraft(draft);
  const report = deriveWorkerReportFromIr(normalizedIr, draft);
  const reportValidation = validateWorkerReport(report);

  writeJson(irPath, normalizedIr);
  writeJson(irValidationPath, irValidation);
  writeJson(draftPath, draft);
  writeJson(reportPath, report);

  let review: AiReview | undefined;
  let reviewValidation: ValidationResult | undefined;
  if (options.review !== false) {
    const reviewPrompt = readPrompt(options.webPortRoot, 'command-draft-review.md');
    review = await callJsonWithValidation<AiReview>([
      { role: 'system', content: reviewPrompt },
      {
        role: 'user',
        content: JSON.stringify({
          command: normalizedIr.command,
          familyStatus: inferFamilyStatus(normalizedIr.command.originalId),
          strictIr: normalizedIr,
          irValidation,
          report,
          draft,
        }, null, 2),
      },
    ], {
      apiKey: options.apiKey,
      model: options.reviewModel ?? options.model,
      modelFallbacks: options.reviewFallbackModels ?? options.fallbackModels,
      title: `ai-port strict-ir review ${bundle.commandId}`,
      stage: 'strict-ir:review',
      maxTokens: 3500,
      timeoutMs: 120000,
      cache: true,
      responseHealing: true,
      providerSort: 'throughput',
      requireParameters: true,
      reasoningMaxTokens: 256,
      excludeReasoning: true,
      onTiming,
      validate: validateAiReview,
    });
    reviewValidation = validateAiReview(review);
    writeJson(reviewPath, review);
  }

  const classified = classifyAutopilotResult(
    report,
    mergeValidations(reportValidation, irValidation),
    draft,
    draftValidation,
    review,
    reviewValidation,
  );
  const appliedPaths = options.apply === true
    ? materializeReviewedDraft({
      webPortRoot: options.webPortRoot,
      draft,
      draftValidation,
      review,
      reviewValidation,
      force: options.forceApply,
    })
    : undefined;
  const result: AutopilotResult = {
    schemaVersion: 'ai-port-autopilot-result/v1',
    commandId: bundle.commandId,
    familyStatus: classified.familyStatus,
    classification: classified.classification,
    reportPath: reportPath.replace(/\\/g, '/'),
    draftPath: draftPath.replace(/\\/g, '/'),
    reviewPath: review ? reviewPath.replace(/\\/g, '/') : undefined,
    appliedPaths,
    localValidation: classified.localValidation,
    gateReasons: classified.gateReasons,
    timings,
  };
  writeJson(resultPath, result);
  return result;
}
