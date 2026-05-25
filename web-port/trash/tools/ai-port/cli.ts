#!/usr/bin/env ts-node

import * as path from 'path';
import { analyzeCommand } from './commands/analyze';
import { expandCommandRange, runAutopilotForCommand, runWithConcurrency } from './commands/autopilot';
import { extractErbFacts } from './commands/facts';
import { synthesizeFromFacts } from './commands/fromFacts';
import { materializeApprovalCandidate } from './commands/materialize';
import { runModelAudit, summarizeModelAudit } from './commands/modelAudit';
import { validateArtifact, validateReportDraftReview } from './commands/validate';
import { loadLocalEnv } from './env';
import type { AutopilotResult } from './types';

interface ParsedArgs {
  command: string;
  positionals: string[];
  flags: Record<string, string | boolean>;
}

function parseArgs(argv: string[]): ParsedArgs {
  const [command = 'help', ...rest] = argv;
  const flags: Record<string, string | boolean> = {};
  const positionals: string[] = [];

  for (let index = 0; index < rest.length; index += 1) {
    const arg = rest[index];
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const next = rest[index + 1];
      if (next && !next.startsWith('--')) {
        flags[key] = next;
        index += 1;
      } else {
        flags[key] = true;
      }
    } else {
      positionals.push(arg);
    }
  }

  return { command, positionals, flags };
}

function usage(): void {
  console.log(`Usage:
  ts-node tools/ai-port/cli.ts analyze --command COMF7 --out artifacts/ai-port/COMF7.report.json --model <openrouter-model> [--full-evidence]
  ts-node tools/ai-port/cli.ts facts --command COMF7 --out-dir artifacts/ai-port-facts --model <openrouter-model> [--review-model <openrouter-model>]
  ts-node tools/ai-port/cli.ts from-facts --command COMF7 --out-dir artifacts/ai-port-from-facts --model <openrouter-model> [--apply]
  ts-node tools/ai-port/cli.ts autopilot --range COMF7-19 --out-dir artifacts/ai-port --concurrency 5 --model <openrouter-model> [--full-evidence] [--sharded-analysis]
  ts-node tools/ai-port/cli.ts validate <artifact.json>
  ts-node tools/ai-port/cli.ts gate <report.json> [--draft draft.json] [--review review.json]
  ts-node tools/ai-port/cli.ts materialize artifacts/ai-port/COMF7/COMF7.result.json
  ts-node tools/ai-port/cli.ts model-audit [--out artifacts/ai-port-model/model-audit.json] [--source-root <path>]

Environment:
  OPENROUTER_API_KEY   required for analyze/autopilot
  OPENROUTER_MODEL     optional default model
  OPENROUTER_REVIEW_MODEL optional reviewer model
  OPENROUTER_FALLBACK_MODELS optional comma-separated analyze/synthesize fallback models
  OPENROUTER_REVIEW_FALLBACK_MODELS optional comma-separated review fallback models`);
}

function flagString(args: ParsedArgs, key: string, fallback?: string): string | undefined {
  const value = args.flags[key];
  return typeof value === 'string' ? value : fallback;
}

function requireString(value: string | undefined, message: string): string {
  if (!value) throw new Error(message);
  return value;
}

function csvList(value: string | undefined): string[] {
  return (value ?? '')
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

function summarizeResults(results: readonly AutopilotResult[]): Record<string, unknown> {
  const byClassification = results.reduce<Record<string, number>>((acc, result) => {
    acc[result.classification] = (acc[result.classification] ?? 0) + 1;
    return acc;
  }, {});
  const commandsByClassification = results.reduce<Record<string, string[]>>((acc, result) => {
    acc[result.classification] = [...(acc[result.classification] ?? []), result.commandId];
    return acc;
  }, {});
  const gateReasons = results
    .filter((result) => result.gateReasons.length > 0)
    .map((result) => ({ commandId: result.commandId, reasons: result.gateReasons }));
  const validationIssues = results
    .filter((result) => !result.localValidation.ok || result.localValidation.errors.length > 0 || result.localValidation.warnings.length > 0)
    .map((result) => ({
      commandId: result.commandId,
      ok: result.localValidation.ok,
      errors: result.localValidation.errors,
      warnings: result.localValidation.warnings,
    }));
  const slowestStages = results
    .flatMap((result) => (result.timings ?? []).map((timing) => ({
      commandId: result.commandId,
      stage: timing.stage,
      model: timing.model,
      totalMs: timing.totalMs,
      ok: timing.ok,
      error: timing.error,
    })))
    .sort((left, right) => right.totalMs - left.totalMs)
    .slice(0, 8);

  return {
    byClassification,
    commandsByClassification,
    gateReasons,
    validationIssues,
    slowestStages,
  };
}

function webPortRoot(): string {
  return path.resolve(__dirname, '..', '..');
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));
  const root = webPortRoot();
  const loadedEnvFiles = loadLocalEnv(root);

  if (args.command === 'help' || args.command === '--help' || args.command === '-h') {
    usage();
    return;
  }

  if (args.command === 'validate') {
    const artifact = requireString(args.positionals[0], 'validate requires an artifact path.');
    console.log(JSON.stringify(validateArtifact(path.resolve(root, artifact)), null, 2));
    return;
  }

  if (args.command === 'gate') {
    const report = requireString(args.positionals[0], 'gate requires a report path.');
    const draft = flagString(args, 'draft');
    const review = flagString(args, 'review');
    console.log(JSON.stringify(validateReportDraftReview(
      path.resolve(root, report),
      draft ? path.resolve(root, draft) : undefined,
      review ? path.resolve(root, review) : undefined,
    ), null, 2));
    return;
  }

  if (args.command === 'materialize') {
    const resultPath = requireString(args.positionals[0], 'materialize requires an autopilot result path.');
    console.log(JSON.stringify(materializeApprovalCandidate({
      webPortRoot: root,
      resultPath: path.resolve(root, resultPath),
      force: args.flags.force === true,
    }), null, 2));
    return;
  }

  if (args.command === 'model-audit') {
    const out = flagString(args, 'out');
    const sourceRoot = flagString(args, 'source-root');
    const audit = runModelAudit({
      webPortRoot: root,
      sourceRoot: sourceRoot ? path.resolve(root, sourceRoot) : undefined,
      outPath: out ? path.resolve(root, out) : undefined,
    });
    console.log(JSON.stringify({
      ok: true,
      outPath: out ? path.resolve(root, out) : undefined,
      summary: summarizeModelAudit(audit),
    }, null, 2));
    return;
  }

  if (args.command === 'analyze') {
    const apiKey = requireString(process.env.OPENROUTER_API_KEY, 'OPENROUTER_API_KEY is required.');
    const model = requireString(flagString(args, 'model', process.env.OPENROUTER_MODEL), '--model or OPENROUTER_MODEL is required.');
    const commandId = requireString(flagString(args, 'command', args.positionals[0]), '--command or positional command id is required.');
    const outPath = path.resolve(root, flagString(args, 'out', args.positionals[1] ?? `artifacts/ai-port/${commandId}.report.json`) ?? '');
    const report = await analyzeCommand({
      webPortRoot: root,
      commandId,
      outPath,
      apiKey,
      model,
      evidenceMode: args.flags['full-evidence'] === true ? 'full' : 'sliced',
    });
    console.log(JSON.stringify({ ok: true, outPath, command: report.command }, null, 2));
    return;
  }

  if (args.command === 'facts') {
    const apiKey = requireString(process.env.OPENROUTER_API_KEY, 'OPENROUTER_API_KEY is required.');
    const model = requireString(flagString(args, 'model', process.env.OPENROUTER_MODEL), '--model or OPENROUTER_MODEL is required.');
    const reviewModel = flagString(args, 'review-model', process.env.OPENROUTER_REVIEW_MODEL);
    const fallbackModels = csvList(flagString(args, 'fallback-models', process.env.OPENROUTER_FALLBACK_MODELS));
    const reviewFallbackModels = csvList(flagString(args, 'review-fallback-models', process.env.OPENROUTER_REVIEW_FALLBACK_MODELS));
    const commandId = requireString(flagString(args, 'command', args.positionals[0]), '--command or positional command id is required.');
    const outDir = path.resolve(root, flagString(args, 'out-dir', flagString(args, 'out', 'artifacts/ai-port-facts')) ?? '');
    const result = await extractErbFacts({
      webPortRoot: root,
      commandId,
      outDir,
      apiKey,
      model,
      reviewModel,
      fallbackModels,
      reviewFallbackModels,
      review: args.flags['no-review'] !== true,
    });
    console.log(JSON.stringify({ ok: true, outDir, loadedEnvFiles, result }, null, 2));
    return;
  }

  if (args.command === 'from-facts') {
    const apiKey = requireString(process.env.OPENROUTER_API_KEY, 'OPENROUTER_API_KEY is required.');
    const model = requireString(flagString(args, 'model', process.env.OPENROUTER_MODEL), '--model or OPENROUTER_MODEL is required.');
    const reviewModel = flagString(args, 'review-model', process.env.OPENROUTER_REVIEW_MODEL);
    const fallbackModels = csvList(flagString(args, 'fallback-models', process.env.OPENROUTER_FALLBACK_MODELS));
    const reviewFallbackModels = csvList(flagString(args, 'review-fallback-models', process.env.OPENROUTER_REVIEW_FALLBACK_MODELS));
    const commandId = requireString(flagString(args, 'command', args.positionals[0]), '--command or positional command id is required.');
    const outDir = path.resolve(root, flagString(args, 'out-dir', flagString(args, 'out', 'artifacts/ai-port-from-facts')) ?? '');
    const result = await synthesizeFromFacts({
      webPortRoot: root,
      commandId,
      outDir,
      apiKey,
      model,
      reviewModel,
      fallbackModels,
      reviewFallbackModels,
      review: args.flags['no-review'] !== true,
      apply: args.flags.apply === true,
      forceApply: args.flags.force === true,
    });
    console.log(JSON.stringify({ ok: true, outDir, loadedEnvFiles, result }, null, 2));
    return;
  }

  if (args.command === 'autopilot') {
    const apiKey = requireString(process.env.OPENROUTER_API_KEY, 'OPENROUTER_API_KEY is required.');
    const model = requireString(flagString(args, 'model', process.env.OPENROUTER_MODEL), '--model or OPENROUTER_MODEL is required.');
    const reviewModel = flagString(args, 'review-model', process.env.OPENROUTER_REVIEW_MODEL);
    const fallbackModels = csvList(flagString(args, 'fallback-models', process.env.OPENROUTER_FALLBACK_MODELS));
    const reviewFallbackModels = csvList(flagString(args, 'review-fallback-models', process.env.OPENROUTER_REVIEW_FALLBACK_MODELS));
    const range = flagString(args, 'range');
    const commandId = flagString(args, 'command', args.positionals[0]);
    const commands = range ? expandCommandRange(range) : [requireString(commandId, '--command or --range is required.')];
    const outDir = path.resolve(root, flagString(args, 'out-dir', flagString(args, 'out', 'artifacts/ai-port')) ?? '');
    const concurrency = Number(flagString(args, 'concurrency', '3'));
    const synthesize = args.flags['no-synthesize'] !== true;
    const review = args.flags['no-review'] !== true;
    const evidenceMode = args.flags['full-evidence'] === true ? 'full' : 'sliced';

    const results = await runWithConcurrency(commands, Number.isFinite(concurrency) ? concurrency : 3, (id) =>
      runAutopilotForCommand({
        webPortRoot: root,
        commandId: id,
        outDir,
        apiKey,
        model,
        reviewModel,
        fallbackModels,
        reviewFallbackModels,
        synthesize,
        review,
        evidenceMode,
        shardedAnalysis: args.flags['sharded-analysis'] === true,
      }),
    );

    console.log(JSON.stringify({
      ok: true,
      outDir,
      loadedEnvFiles,
      summary: summarizeResults(results),
      results,
    }, null, 2));
    return;
  }

  usage();
  throw new Error(`Unknown ai-port command: ${args.command}`);
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  process.exitCode = 1;
});
