import * as fs from 'fs';
import * as path from 'path';
import { loadEvidenceBundle, formatEvidenceForPrompt, type EvidenceMode } from '../adapters/legacyEvidenceLoader';
import { callOpenRouterJson } from '../openrouter/client';
import type { WorkerReport } from '../types';
import { validateWorkerReport } from '../validators/reportValidator';

function readPrompt(webPortRoot: string, fileName: string): string {
  return fs.readFileSync(path.join(webPortRoot, 'tools', 'ai-port', 'openrouter', 'prompts', fileName), 'utf-8');
}

export interface AnalyzeOptions {
  webPortRoot: string;
  commandId: string;
  outPath: string;
  apiKey: string;
  model: string;
  maxCharsPerFile?: number;
  evidenceMode?: EvidenceMode;
}

export async function analyzeCommand(options: AnalyzeOptions): Promise<WorkerReport> {
  const bundle = loadEvidenceBundle(
    options.webPortRoot,
    options.commandId,
    options.maxCharsPerFile,
    options.evidenceMode,
  );
  const system = readPrompt(options.webPortRoot, 'training-command-analysis.md');
  const user = [
    `Command: ${bundle.commandId}`,
    '',
    'Evidence:',
    formatEvidenceForPrompt(bundle),
  ].join('\n');

  const report = await callOpenRouterJson<WorkerReport>([
    { role: 'system', content: system },
    { role: 'user', content: user },
  ], {
    apiKey: options.apiKey,
    model: options.model,
    title: `ai-port analyze ${bundle.commandId}`,
    stage: 'analyze',
    maxTokens: 6000,
    timeoutMs: 150000,
    cache: true,
    providerSort: 'throughput',
    requireParameters: true,
    reasoningMaxTokens: 512,
    excludeReasoning: true,
  });

  const validation = validateWorkerReport(report);
  if (!validation.ok) {
    throw new Error(`AI report failed schema validation:\n${validation.errors.join('\n')}`);
  }

  fs.mkdirSync(path.dirname(options.outPath), { recursive: true });
  fs.writeFileSync(options.outPath, `${JSON.stringify(report, null, 2)}\n`, 'utf-8');
  return report;
}
