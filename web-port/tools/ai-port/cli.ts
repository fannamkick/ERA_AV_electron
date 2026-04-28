#!/usr/bin/env ts-node

import * as path from 'path';
import { analyzeCommand } from './commands/analyze';
import { expandCommandRange, runAutopilotForCommand, runWithConcurrency } from './commands/autopilot';
import { materializeApprovalCandidate } from './commands/materialize';
import { validateArtifact, validateReportDraftReview } from './commands/validate';

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
  ts-node tools/ai-port/cli.ts analyze --command COMF7 --out artifacts/ai-port/COMF7.report.json --model <openrouter-model>
  ts-node tools/ai-port/cli.ts autopilot --range COMF7-19 --concurrency 5 --model <openrouter-model>
  ts-node tools/ai-port/cli.ts validate <artifact.json>
  ts-node tools/ai-port/cli.ts gate <report.json> [--draft draft.json] [--review review.json]
  ts-node tools/ai-port/cli.ts materialize artifacts/ai-port/COMF7/COMF7.result.json

Environment:
  OPENROUTER_API_KEY   required for analyze/autopilot
  OPENROUTER_MODEL     optional default model
  OPENROUTER_REVIEW_MODEL optional reviewer model`);
}

function flagString(args: ParsedArgs, key: string, fallback?: string): string | undefined {
  const value = args.flags[key];
  return typeof value === 'string' ? value : fallback;
}

function requireString(value: string | undefined, message: string): string {
  if (!value) throw new Error(message);
  return value;
}

function webPortRoot(): string {
  return path.resolve(__dirname, '..', '..');
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));
  const root = webPortRoot();

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

  if (args.command === 'analyze') {
    const apiKey = requireString(process.env.OPENROUTER_API_KEY, 'OPENROUTER_API_KEY is required.');
    const model = requireString(flagString(args, 'model', process.env.OPENROUTER_MODEL), '--model or OPENROUTER_MODEL is required.');
    const commandId = requireString(flagString(args, 'command'), '--command is required.');
    const outPath = path.resolve(root, flagString(args, 'out', `artifacts/ai-port/${commandId}.report.json`) ?? '');
    const report = await analyzeCommand({ webPortRoot: root, commandId, outPath, apiKey, model });
    console.log(JSON.stringify({ ok: true, outPath, command: report.command }, null, 2));
    return;
  }

  if (args.command === 'autopilot') {
    const apiKey = requireString(process.env.OPENROUTER_API_KEY, 'OPENROUTER_API_KEY is required.');
    const model = requireString(flagString(args, 'model', process.env.OPENROUTER_MODEL), '--model or OPENROUTER_MODEL is required.');
    const reviewModel = flagString(args, 'review-model', process.env.OPENROUTER_REVIEW_MODEL);
    const range = flagString(args, 'range');
    const commandId = flagString(args, 'command');
    const commands = range ? expandCommandRange(range) : [requireString(commandId, '--command or --range is required.')];
    const outDir = path.resolve(root, flagString(args, 'out-dir', 'artifacts/ai-port') ?? '');
    const concurrency = Number(flagString(args, 'concurrency', '3'));
    const synthesize = args.flags['no-synthesize'] !== true;
    const review = args.flags['no-review'] !== true;

    const results = await runWithConcurrency(commands, Number.isFinite(concurrency) ? concurrency : 3, (id) =>
      runAutopilotForCommand({
        webPortRoot: root,
        commandId: id,
        outDir,
        apiKey,
        model,
        reviewModel,
        synthesize,
        review,
      }),
    );

    console.log(JSON.stringify({
      ok: true,
      outDir,
      summary: results.reduce<Record<string, number>>((acc, result) => {
        acc[result.classification] = (acc[result.classification] ?? 0) + 1;
        return acc;
      }, {}),
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
