import * as fs from 'fs';
import * as path from 'path';
import {
  loadEvidenceBundle,
  formatEvidenceForPrompt,
  parseCommandId,
  type EvidenceMode,
} from '../adapters/legacyEvidenceLoader';
import { callOpenRouterJson } from '../openrouter/client';
import type {
  AiPortTiming,
  AiReview,
  AutopilotResult,
  CommandDraft,
  EvidenceBundle,
  EvidenceFile,
  WorkerReport,
  WorkerReportShard,
  WorkerReportShardArea,
} from '../types';
import { classifyAutopilotResult } from '../validators/gateValidator';
import { validateAiReview, validateCommandDraft, validateWorkerReport } from '../validators/reportValidator';

function readPrompt(webPortRoot: string, fileName: string): string {
  return fs.readFileSync(path.join(webPortRoot, 'tools', 'ai-port', 'openrouter', 'prompts', fileName), 'utf-8');
}

function writeJson(filePath: string, value: unknown): void {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf-8');
}

function optimizedOpenRouterOptions(stage: 'analyze' | 'synthesize' | 'review'): {
  maxTokens: number;
  timeoutMs: number;
} {
  switch (stage) {
    case 'analyze':
      return { maxTokens: 6000, timeoutMs: 150000 };
    case 'synthesize':
      return { maxTokens: 4500, timeoutMs: 120000 };
    case 'review':
      return { maxTokens: 1600, timeoutMs: 60000 };
  }
}

const SHARD_AREAS: readonly WorkerReportShardArea[] = [
  'availability',
  'sourceFormula',
  'sideEffects',
  'engineGaps',
];

function defaultWorkerReport(commandId: string, commandNumber: number): WorkerReport {
  return {
    schemaVersion: 'training-worker-report/v1',
    command: { id: commandId, originalId: commandNumber },
    category: 'unknown',
    canonicalDecision: {},
    availability: { hardBlockers: [], formulaGates: [], unresolvedConflicts: [] },
    sourceFormula: {
      writes: [],
      modifiers: [],
      rounding: 'none',
      indexPolicy: 'numeric-index',
      unresolvedConflicts: [],
    },
    sideEffects: { effects: [], postEffects: [], messages: [] },
    chainRemap: { dependencies: [], unresolvedConflicts: [] },
    engineGaps: {
      conditionPredicatesNeeded: [],
      effectTypesNeeded: [],
      phaseHooksNeeded: [],
      stateAdapterFieldsNeeded: [],
    },
    validationScenarios: [],
    notes: [],
  };
}

function uniqueStrings(values: readonly string[]): string[] {
  return Array.from(new Set(values.filter((value) => value.length > 0)));
}

function filterEvidenceForShard(bundle: EvidenceBundle, area: WorkerReportShardArea): EvidenceBundle {
  const keep = (file: EvidenceFile): boolean => {
    const filePath = file.path;
    if (filePath.startsWith('ai-port://evidence-slice-policy')) return true;
    if (filePath.includes('TRAINING_MIGRATION_READINESS.md')) return true;
    if (filePath.includes('TRAINING_CANONICAL_SOURCES.md')) return true;

    if (area === 'availability') {
      return filePath.includes('availability.ts') ||
        filePath.includes('commandAvailability.ts') ||
        filePath.includes('/commands/commands/') ||
        filePath.includes('/commands/improved/');
    }

    if (area === 'sourceFormula') {
      return filePath.includes('SourceCheck.ts') ||
        filePath.includes('/commands/commands/') ||
        filePath.includes('/commands/improved/');
    }

    if (area === 'sideEffects') {
      return filePath.includes('/commands/commands/') ||
        filePath.includes('/commands/improved/') ||
        filePath.includes('SourceCheck.ts');
    }

    return true;
  };

  return {
    ...bundle,
    files: bundle.files.filter(keep),
  };
}

function mergeShardReport(commandId: string, commandNumber: number, shards: readonly WorkerReportShard[]): WorkerReport {
  const report = defaultWorkerReport(commandId, commandNumber);

  for (const shard of shards) {
    report.command = {
      ...report.command,
      ...shard.command,
      id: shard.command.id || report.command.id,
      originalId: shard.command.originalId ?? report.command.originalId,
    };
    report.canonicalDecision = {
      ...report.canonicalDecision,
      ...(shard.canonicalDecision ?? {}),
    };
    if (shard.availability) report.availability = shard.availability;
    if (shard.sourceFormula) report.sourceFormula = shard.sourceFormula;
    if (shard.sideEffects) report.sideEffects = shard.sideEffects;
    if (shard.chainRemap) report.chainRemap = shard.chainRemap;
    if (shard.engineGaps) {
      report.engineGaps = {
        conditionPredicatesNeeded: uniqueStrings([
          ...report.engineGaps.conditionPredicatesNeeded,
          ...shard.engineGaps.conditionPredicatesNeeded,
        ]),
        effectTypesNeeded: uniqueStrings([
          ...report.engineGaps.effectTypesNeeded,
          ...shard.engineGaps.effectTypesNeeded,
        ]),
        phaseHooksNeeded: uniqueStrings([
          ...report.engineGaps.phaseHooksNeeded,
          ...shard.engineGaps.phaseHooksNeeded,
        ]),
        stateAdapterFieldsNeeded: uniqueStrings([
          ...report.engineGaps.stateAdapterFieldsNeeded,
          ...shard.engineGaps.stateAdapterFieldsNeeded,
        ]),
      };
    }
    report.validationScenarios.push(...(shard.validationScenarios ?? []));
    report.notes?.push(...(shard.notes ?? []));
  }

  return report;
}

export function expandCommandRange(range: string): string[] {
  const match = /^COMF?(\d+)-(\d+)$/i.exec(range.trim());
  if (!match) return [parseCommandId(range).normalized];
  const start = Number(match[1]);
  const end = Number(match[2]);
  if (!Number.isInteger(start) || !Number.isInteger(end) || end < start) {
    throw new Error(`Invalid command range: ${range}`);
  }
  return Array.from({ length: end - start + 1 }, (_, offset) => `COMF${start + offset}`);
}

export interface AutopilotOptions {
  webPortRoot: string;
  commandId: string;
  outDir: string;
  apiKey: string;
  model: string;
  reviewModel?: string;
  synthesize: boolean;
  review: boolean;
  maxCharsPerFile?: number;
  evidenceMode?: EvidenceMode;
  shardedAnalysis?: boolean;
}

export async function runAutopilotForCommand(options: AutopilotOptions): Promise<AutopilotResult> {
  const parsed = parseCommandId(options.commandId);
  const commandDir = path.join(options.outDir, parsed.normalized);
  const reportPath = path.join(commandDir, `${parsed.normalized}.report.json`);
  const draftPath = path.join(commandDir, `${parsed.normalized}.draft.json`);
  const reviewPath = path.join(commandDir, `${parsed.normalized}.review.json`);
  const resultPath = path.join(commandDir, `${parsed.normalized}.result.json`);
  const bundle = loadEvidenceBundle(
    options.webPortRoot,
    parsed.normalized,
    options.maxCharsPerFile,
    options.evidenceMode,
  );
  const timings: AiPortTiming[] = [];
  const onTiming = (timing: AiPortTiming): void => {
    timings.push(timing);
  };

  const analyzeOptions = optimizedOpenRouterOptions('analyze');
  let report: WorkerReport;

  if (options.shardedAnalysis) {
    const shardPrompt = readPrompt(options.webPortRoot, 'training-command-shard-analysis.md');
    const shards = await Promise.all(SHARD_AREAS.map(async (area) => {
      const shardBundle = filterEvidenceForShard(bundle, area);
      const shard = await callOpenRouterJson<WorkerReportShard>([
        { role: 'system', content: shardPrompt },
        {
          role: 'user',
          content: JSON.stringify({
            area,
            command: {
              id: bundle.commandId,
              originalId: bundle.commandNumber,
            },
            evidence: formatEvidenceForPrompt(shardBundle),
          }, null, 2),
        },
      ], {
        apiKey: options.apiKey,
        model: options.model,
        title: `ai-port analyze ${bundle.commandId} ${area}`,
        stage: `analyze:${area}`,
        maxTokens: 3200,
        timeoutMs: 120000,
        cache: true,
        providerSort: 'throughput',
        requireParameters: true,
        reasoningMaxTokens: 512,
        excludeReasoning: true,
        onTiming,
      });
      writeJson(path.join(commandDir, `${parsed.normalized}.${area}.shard.json`), shard);
      return shard;
    }));
    report = mergeShardReport(bundle.commandId, bundle.commandNumber, shards);
  } else {
    const analysisPrompt = readPrompt(options.webPortRoot, 'training-command-analysis.md');
    report = await callOpenRouterJson<WorkerReport>([
      { role: 'system', content: analysisPrompt },
      {
        role: 'user',
        content: [
          `Command: ${bundle.commandId}`,
          '',
          'Evidence:',
          formatEvidenceForPrompt(bundle),
        ].join('\n'),
      },
    ], {
      apiKey: options.apiKey,
      model: options.model,
      title: `ai-port analyze ${bundle.commandId}`,
      stage: 'analyze',
      ...analyzeOptions,
      cache: true,
      providerSort: 'throughput',
      requireParameters: true,
      reasoningMaxTokens: 512,
      excludeReasoning: true,
      onTiming,
    });
  }
  writeJson(reportPath, report);

  const reportValidation = validateWorkerReport(report);
  let draft: CommandDraft | undefined;
  let draftValidation = undefined;
  let aiReview: AiReview | undefined;
  let reviewValidation = undefined;

  if (options.synthesize && reportValidation.ok) {
    const synthesisPrompt = readPrompt(options.webPortRoot, 'command-draft-synthesis.md');
    const synthesizeOptions = optimizedOpenRouterOptions('synthesize');
    draft = await callOpenRouterJson<CommandDraft>([
      { role: 'system', content: synthesisPrompt },
      {
        role: 'user',
        content: JSON.stringify({
          sourceReportPath: reportPath.replace(/\\/g, '/'),
          report,
          evidenceSummary: bundle.files.map((file) => ({ path: file.path, truncated: file.truncated })),
        }, null, 2),
      },
    ], {
      apiKey: options.apiKey,
      model: options.model,
      title: `ai-port synthesize ${bundle.commandId}`,
      stage: 'synthesize',
      ...synthesizeOptions,
      cache: true,
      providerSort: 'throughput',
      requireParameters: true,
      reasoningMaxTokens: 512,
      excludeReasoning: true,
      onTiming,
    });
    draft.sourceReport = reportPath.replace(/\\/g, '/');
    writeJson(draftPath, draft);
    draftValidation = validateCommandDraft(draft);
  }

  if (options.review && draft && draftValidation?.ok) {
    const reviewPrompt = readPrompt(options.webPortRoot, 'command-draft-review.md');
    const reviewOptions = optimizedOpenRouterOptions('review');
    aiReview = await callOpenRouterJson<AiReview>([
      { role: 'system', content: reviewPrompt },
      {
        role: 'user',
        content: JSON.stringify({ report, draft }, null, 2),
      },
    ], {
      apiKey: options.apiKey,
      model: options.reviewModel ?? options.model,
      title: `ai-port review ${bundle.commandId}`,
      stage: 'review',
      ...reviewOptions,
      cache: true,
      providerSort: 'throughput',
      requireParameters: true,
      reasoningMaxTokens: 128,
      excludeReasoning: true,
      onTiming,
    });
    writeJson(reviewPath, aiReview);
    reviewValidation = validateAiReview(aiReview);
  }

  const classified = classifyAutopilotResult(
    report,
    reportValidation,
    draft,
    draftValidation,
    aiReview,
    reviewValidation,
  );

  const result: AutopilotResult = {
    schemaVersion: 'ai-port-autopilot-result/v1',
    commandId: parsed.normalized,
    familyStatus: classified.familyStatus,
    classification: classified.classification,
    reportPath: reportPath.replace(/\\/g, '/'),
    draftPath: draft ? draftPath.replace(/\\/g, '/') : undefined,
    reviewPath: aiReview ? reviewPath.replace(/\\/g, '/') : undefined,
    localValidation: classified.localValidation,
    gateReasons: classified.gateReasons,
    timings,
  };
  writeJson(resultPath, result);
  return result;
}

export async function runWithConcurrency<T, R>(
  items: readonly T[],
  concurrency: number,
  worker: (item: T) => Promise<R>,
): Promise<R[]> {
  const results: R[] = [];
  let nextIndex = 0;

  async function runWorker(): Promise<void> {
    while (nextIndex < items.length) {
      const current = nextIndex;
      nextIndex += 1;
      results[current] = await worker(items[current]);
    }
  }

  await Promise.all(
    Array.from({ length: Math.max(1, Math.min(concurrency, items.length)) }, () => runWorker()),
  );
  return results;
}
