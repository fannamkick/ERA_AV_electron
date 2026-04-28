import * as fs from 'fs';
import * as path from 'path';
import {
  loadEvidenceBundle,
  formatEvidenceForPrompt,
  parseCommandId,
  type EvidenceMode,
} from '../adapters/legacyEvidenceLoader';
import { callOpenRouterJson } from '../openrouter/client';
import type { AiPortTiming, AiReview, AutopilotResult, CommandDraft, WorkerReport } from '../types';
import { classifyAutopilotResult } from '../validators/gateValidator';
import { validateAiReview, validateCommandDraft, validateWorkerReport } from '../validators/reportValidator';

function readPrompt(webPortRoot: string, fileName: string): string {
  return fs.readFileSync(path.join(webPortRoot, 'tools', 'ai-port', 'openrouter', 'prompts', fileName), 'utf-8');
}

function writeJson(filePath: string, value: unknown): void {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf-8');
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

  const analysisPrompt = readPrompt(options.webPortRoot, 'training-command-analysis.md');
  const report = await callOpenRouterJson<WorkerReport>([
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
    onTiming,
  });
  writeJson(reportPath, report);

  const reportValidation = validateWorkerReport(report);
  let draft: CommandDraft | undefined;
  let draftValidation = undefined;
  let aiReview: AiReview | undefined;
  let reviewValidation = undefined;

  if (options.synthesize && reportValidation.ok) {
    const synthesisPrompt = readPrompt(options.webPortRoot, 'command-draft-synthesis.md');
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
      onTiming,
    });
    draft.sourceReport = reportPath.replace(/\\/g, '/');
    writeJson(draftPath, draft);
    draftValidation = validateCommandDraft(draft);
  }

  if (options.review && draft && draftValidation?.ok) {
    const reviewPrompt = readPrompt(options.webPortRoot, 'command-draft-review.md');
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
