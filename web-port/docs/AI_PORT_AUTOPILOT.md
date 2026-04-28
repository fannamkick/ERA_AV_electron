# AI Port Autopilot

This tool uses OpenRouter as a parallel analysis and draft-generation worker for training command migration.

The goal is to remove the human bottleneck from repetitive command reading and first-pass implementation while keeping local validation in control.

## Safety Model

OpenRouter is not trusted as the final authority.

The pipeline is:

```txt
analyze legacy evidence
-> synthesize draft files
-> independent AI review
-> local schema/gate validation
-> approval-candidate classification
-> explicit materialize step
```

The tool does not automatically merge changes into source files during `autopilot`.

`materialize` refuses to write anything unless the saved result is classified as `approval-candidate`.

## Commands

Create `web-port/.env.local` for local credentials:

```powershell
OPENROUTER_API_KEY=...
OPENROUTER_MODEL=openai/gpt-4.1-mini
```

The CLI automatically loads `.env.local` first, then `.env`. Existing shell environment variables win over file values.

Do not commit `.env.local`. Use `.env.example` as the template.

Analyze, synthesize, review, and classify a batch:

```powershell
npm run ai-port -- autopilot --range COMF7-19 --concurrency 5
```

Run a single command:

```powershell
npm run ai-port -- autopilot --command COMF7
```

By default, the CLI uses sliced evidence: command-local files plus command-specific blocks from shared legacy files. Use `--full-evidence` only for diagnosis when the slicer may have omitted relevant context.

```powershell
npm run ai-port -- autopilot --command COMF7 --full-evidence
```

Validate an artifact without network access:

```powershell
npm run ai-port -- validate artifacts/ai-port/COMF7/COMF7.report.json
```

Re-run local gate classification:

```powershell
npm run ai-port -- gate artifacts/ai-port/COMF7/COMF7.report.json --draft artifacts/ai-port/COMF7/COMF7.draft.json --review artifacts/ai-port/COMF7/COMF7.review.json
```

Materialize only an approval candidate:

```powershell
npm run ai-port -- materialize artifacts/ai-port/COMF7/COMF7.result.json
```

## Classifications

- `approval-candidate`: migration-ready family, draft exists, AI review approved, no blocking conflicts, no local gate violations.
- `draft-only`: draft exists, but the family/status/gates do not permit automatic approval.
- `report-only`: useful analysis exists but no draft was generated.
- `blocked`: family readiness or unresolved conflicts block implementation.
- `failed`: schema or local validation failed.

## Report Quality Gate

The analysis prompt is checklist-driven. A worker report should not simply summarize a command; it must separate evidence, conflicts, source writes, engine gaps, and validation scenarios.

The local validator warns when:

- generated and improved sources are both treated as canonical without an explicit conflict;
- source writes omit concrete `sourceIndex` or evidence metadata;
- validation scenarios use vague expected values instead of concrete deltas;
- unresolved conflicts block migration.

These warnings do not always mean the report is useless. They mean the result must not be materialized automatically.

## Evidence Slicing

The autopilot should not send broad legacy files wholesale. Local extraction reduces the model's job from search plus analysis to analysis only.

For a command such as `COMF7`, sliced evidence includes:

- the command-specific generated/improved files;
- the matching `COM_ABLE<number>` block from `availability.ts`;
- the matching `COMMAND_AVAILABLE[number]` block from `commandAvailability.ts`;
- the source-index mapping excerpt from `SourceCheck.ts`;
- short readiness/canonical-source excerpts;
- a synthetic note when no command-specific chain remap evidence is found.

Full evidence remains available through `--full-evidence`, but it is slower and more expensive.

Recent COMF7 measurement:

- full evidence: about `118k` request chars, `33k-35k` prompt tokens;
- sliced evidence: about `29k` request chars, `8.8k-9.4k` prompt tokens.

This reduces input size substantially, but model/provider latency can still dominate. The next optimization is responsibility-split analysis: availability/source/side-effects/gaps in parallel, followed by a compact merge.

## Sharded Analysis

`--sharded-analysis` splits analysis into four parallel OpenRouter calls:

- `availability`;
- `sourceFormula`;
- `sideEffects`;
- `engineGaps`.

Each shard receives only the evidence relevant to its responsibility, then the local tool merges the shard outputs into the existing worker-report shape.

```powershell
npm run ai-port -- autopilot --command COMF7 --no-synthesize --no-review --sharded-analysis
```

Recent COMF7 measurement after slicing plus sharding:

- `deepseek/deepseek-v3.2`: about 49 seconds wall time, with the slowest shard at about 44 seconds;
- `minimax/minimax-m2.7`: about 34 seconds wall time, with cache hits on several shards and the slowest non-cached shard at about 30 seconds;
- `deepseek/deepseek-v4-pro`: provider returned 503 during the benchmark;
- `z-ai/glm-5.1` and `moonshotai/kimi-k2.6`: still hit `max_tokens` length limits in this shape.

Sharding improves speed, but shard prompts and merge validation are stricter requirements than single-report analysis. Treat sharded output as an optimization path, not as approval-candidate quality until conflict detection parity is proven.

Shard quality is checklist-gated. Each shard must report which required checks were completed, which checks were missing because evidence was absent, and which conflicts were recorded. The local validator warns when checklist ids are omitted or when area data is placed in the wrong field, such as blockers under `canonicalDecision`.

The production sharded path uses area-specific prompts:

- `training-command-shard-availability.md`;
- `training-command-shard-sourceFormula.md`;
- `training-command-shard-sideEffects.md`;
- `training-command-shard-engineGaps.md`.

Each prompt has its own required checklist and field contract. The generic `training-command-shard-analysis.md` remains as a reference/fallback, not the default sharded prompt.

Shard calls also enable response healing for malformed JSON recovery. Truncated outputs are still treated as failures.

## Retry And Fallback Policy

Autopilot is designed to finish with a usable classified artifact instead of stopping on the first weak model output.

The current policy is:

- retry transient OpenRouter failures such as timeouts, 429/5xx responses, malformed JSON, null content, and `max_tokens` length stops;
- increase `max_tokens` on length failures before retrying the same stage;
- retry locally invalid JSON outputs by feeding the previous JSON and validator feedback back to the model;
- retry shard, draft, and review outputs when local validation finds structural issues such as missing checklist ids, unexpected fields, missing conflict metadata, or invalid review booleans;
- fall back to comma-separated models from `OPENROUTER_FALLBACK_MODELS` or `--fallback-models`;
- fall back review calls separately through `OPENROUTER_REVIEW_FALLBACK_MODELS` or `--review-fallback-models`.

Example:

```powershell
$env:OPENROUTER_MODEL='minimax/minimax-m2.7'
$env:OPENROUTER_FALLBACK_MODELS='deepseek/deepseek-v3.2'
$env:OPENROUTER_REVIEW_MODEL='deepseek/deepseek-v3.2'
$env:OPENROUTER_REVIEW_FALLBACK_MODELS='minimax/minimax-m2.7'
npm run ai-port -- autopilot --command COMF7 --sharded-analysis
```

Batch output includes grouped classification counts, command ids by classification, gate reasons, validation issues, and the slowest stages so the next bottleneck is visible without reading every artifact.

## Current Limits

- The current version generates approval candidates; it does not auto-commit.
- `blocked` and `design-ready` families cannot become approval candidates.
- Self-fix loops exist for structural output repair, but semantic disagreements remain blocked/spec work until canonical evidence is resolved.
- Generated artifacts are written under `artifacts/ai-port/`, which is ignored by git.
