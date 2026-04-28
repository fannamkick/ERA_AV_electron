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
  LegacyReference,
  WorkerReport,
  WorkerReportShard,
  WorkerReportShardArea,
} from '../types';
import { classifyAutopilotResult } from '../validators/gateValidator';
import {
  validateAiReview,
  validateCommandDraft,
  validateWorkerReport,
  validateWorkerReportShard,
} from '../validators/reportValidator';

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

function shardPromptFile(area: WorkerReportShardArea): string {
  return `training-command-shard-${area}.md`;
}

function isLegacyReference(value: unknown): value is LegacyReference {
  return value !== null &&
    typeof value === 'object' &&
    !Array.isArray(value) &&
    typeof (value as Partial<LegacyReference>).file === 'string' &&
    typeof (value as Partial<LegacyReference>).confidence === 'string';
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function mergeCanonicalDecision(
  report: WorkerReport,
  shard: WorkerReportShard,
  warnings: string[],
): void {
  const allowedKeys = ['availability', 'sourceFormula', 'directEffects', 'sideEffects', 'chainRemap', 'messages'] as const;
  for (const key of allowedKeys) {
    const value = shard.canonicalDecision?.[key];
    if (!value) continue;
    if (isLegacyReference(value)) {
      report.canonicalDecision[key] = value;
    } else {
      warnings.push(`${shard.area}: Dropped invalid canonicalDecision.${key}.`);
    }
  }
}

function shardOpenRouterOptions(area: WorkerReportShardArea): { maxTokens: number; timeoutMs: number } {
  if (area === 'sourceFormula' || area === 'sideEffects') {
    return { maxTokens: 6500, timeoutMs: 120000 };
  }
  return { maxTokens: 5000, timeoutMs: 90000 };
}

function filterEvidenceForShard(bundle: EvidenceBundle, area: WorkerReportShardArea): EvidenceBundle {
  const keep = (file: EvidenceFile): boolean => {
    const filePath = file.path;
    if (filePath.startsWith('ai-port://evidence-slice-policy')) return true;
    if (filePath.startsWith('ai-port://current-implementation-policy')) return true;
    if (filePath.startsWith('ai-port://current-implementation-summary')) return true;
    if (filePath.includes('TRAINING_MIGRATION_READINESS.md')) return true;
    if (filePath.includes('TRAINING_CANONICAL_SOURCES.md')) return true;

    if (area === 'availability') {
      return filePath.includes('availability.ts') ||
        filePath.includes('commandAvailability.ts') ||
        filePath.includes('src/content/training/basicCommands.ts') ||
        filePath.includes('/commands/commands/') ||
        filePath.includes('/commands/improved/');
    }

    if (area === 'sourceFormula') {
      return filePath.includes('SourceCheck.ts') ||
        filePath.includes('src/content/training/basicCommands.ts') ||
        filePath.includes('sourceEffectResolvers.ts') ||
        filePath.includes('/commands/commands/') ||
        filePath.includes('/commands/improved/');
    }

    if (area === 'sideEffects') {
      return filePath.includes('/commands/commands/') ||
        filePath.includes('/commands/improved/') ||
        filePath.includes('src/content/training/basicCommands.ts') ||
        filePath.includes('stainEffectResolvers.ts') ||
        filePath.includes('experienceEffectResolvers.ts') ||
        filePath.includes('SourceCheck.ts');
    }

    return true;
  };

  return {
    ...bundle,
    files: bundle.files.filter(keep),
  };
}

function mergeShardReport(
  commandId: string,
  commandNumber: number,
  shards: readonly WorkerReportShard[],
  warnings: string[],
): WorkerReport {
  const report = defaultWorkerReport(commandId, commandNumber);

  for (const shard of shards) {
    report.command = {
      ...report.command,
      ...shard.command,
      id: shard.command.id || report.command.id,
      originalId: shard.command.originalId ?? report.command.originalId,
    };
    mergeCanonicalDecision(report, shard, warnings);
    if (shard.availability) report.availability = shard.availability;
    if (shard.sourceFormula) report.sourceFormula = shard.sourceFormula;
    if (shard.sideEffects) report.sideEffects = shard.sideEffects;
    if (shard.chainRemap) report.chainRemap = shard.chainRemap;
    if ((shard.unresolvedConflicts?.length ?? 0) > 0) {
      if (shard.area === 'availability') {
        report.availability.unresolvedConflicts.push(...(shard.unresolvedConflicts ?? []));
      } else if (shard.area === 'sourceFormula') {
        report.sourceFormula.unresolvedConflicts.push(...(shard.unresolvedConflicts ?? []));
      } else if (shard.area === 'sideEffects') {
        const sideEffects = report.sideEffects as typeof report.sideEffects & { unresolvedConflicts?: unknown[] };
        sideEffects.unresolvedConflicts = [
          ...(sideEffects.unresolvedConflicts ?? []),
          ...(shard.unresolvedConflicts ?? []),
        ];
      } else {
        report.notes?.push(...(shard.unresolvedConflicts ?? []).map((conflict) =>
          `${shard.area}: unresolved conflict not tied to a report conflict array: ${JSON.stringify(conflict)}`,
        ));
      }
    }
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

function normalizeWorkerReport(report: WorkerReport): WorkerReport {
  const writes = report.sourceFormula.writes;
  const indexedWrites = writes.filter((write) => isRecord(write) && typeof write.sourceIndex === 'number');
  const droppedWrites = writes.length - indexedWrites.length;
  if (droppedWrites > 0) {
    report.sourceFormula.writes = indexedWrites;
    report.notes = [
      ...(report.notes ?? []),
      `Local normalization moved/dropped ${droppedWrites} non-indexed source write row(s); named-key current coverage belongs in modifiers/notes, not sourceFormula.writes.`,
    ];
  }
  return report;
}

function normalizeAiReview(value: AiReview): AiReview {
  const record = value as unknown as Record<string, unknown>;
  if (typeof record.approved === 'string') {
    const normalized = record.approved.trim().toLowerCase();
    if (normalized === 'true' || normalized === 'false') {
      return {
        ...value,
        approved: normalized === 'true',
      };
    }
  }
  if (typeof record.approved === 'number' && (record.approved === 1 || record.approved === 0)) {
    return {
      ...value,
      approved: record.approved === 1,
    };
  }
  return value;
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
  let shardWarnings: string[] = [];

  if (options.shardedAnalysis) {
    const shards = await Promise.all(SHARD_AREAS.map(async (area) => {
      const shardPrompt = readPrompt(options.webPortRoot, shardPromptFile(area));
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
        ...shardOpenRouterOptions(area),
        cache: true,
        responseHealing: true,
        providerSort: 'throughput',
        requireParameters: true,
        reasoningMaxTokens: 512,
        excludeReasoning: true,
        onTiming,
      });
      const shardValidation = validateWorkerReportShard(shard);
      if (!shardValidation.ok) {
        throw new Error(`AI shard failed validation for ${area}:\n${shardValidation.errors.join('\n')}`);
      }
      shardWarnings = [
        ...shardWarnings,
        ...shardValidation.warnings.map((warning) => `${area}: ${warning}`),
      ];
      writeJson(path.join(commandDir, `${parsed.normalized}.${area}.shard.json`), shard);
      return shard;
    }));
    report = mergeShardReport(bundle.commandId, bundle.commandNumber, shards, shardWarnings);
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
  report = normalizeWorkerReport(report);
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
    aiReview = normalizeAiReview(await callOpenRouterJson<AiReview>([
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
    }));
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
  classified.localValidation.warnings.push(...shardWarnings);

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
