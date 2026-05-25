# AI Port Autopilot

> 보관 상태: 이 문서는 OpenRouter 기반 자동 포팅 실험 문서다. 현재는 유료 AI 호출을 중지하고, 새 도메인 기반 재구축 계획(`docs/NEW_PORT_MILESTONES.ko.md`)을 기준으로 한다. 사용자의 명시 승인 없이 이 워크플로우를 실행하지 않는다.

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

The next migration loop adds an original-ERB fact pass before analysis:

```txt
extract facts from original COMF*.ERB and COMABLE.ERB
-> validate fact completeness locally
-> analyze validated facts plus helper evidence
-> synthesize draft files
-> validate fact coverage locally
-> independent AI review
-> local schema/gate validation
-> approval-candidate classification
-> explicit materialize step
```

This is not a full ERB-to-TypeScript transpiler. The first AI call is a semantic fact extractor, and the second AI call rewrites those facts into the web-port command architecture.

Current correction:

The late-stage executable generator must not invent architecture, stat keys, helper APIs, or registry changes. It should only write repetitive command code from a fixed ERB-to-web-port mapping dictionary and approved conversion helpers.

If an ERB element has no mapping, the correct output is `missingMapping`, not guessed TypeScript.

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

Extract original ERB/COMABLE facts and run the separate AI fact review:

```powershell
npm run ai-port -- facts --command COMF7 --out-dir artifacts/ai-port-facts
```

Skip the AI fact review when diagnosing only the mechanical fact validator:

```powershell
npm run ai-port -- facts --command COMF7 --out-dir artifacts/ai-port-facts --no-review
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

For executable migration, original `COMF*.ERB` and `COMABLE.ERB` are the primary behavior evidence. Generated and improved TypeScript files are helper evidence only. They may help find candidate formulas or missing behavior, but they must not override original ERB when they disagree.

The local validator warns when:

- generated and improved sources are both treated as canonical without an explicit conflict;
- source writes omit concrete `sourceIndex` or evidence metadata;
- validation scenarios use vague expected values instead of concrete deltas;
- unresolved conflicts block migration.

These warnings do not always mean the report is useless. They mean the result must not be materialized automatically.

## Two-Pass ERB-Centered Flow

The broad migration path should use two AI passes:

```txt
Pass 1: original ERB/COMABLE -> erb-command-facts/v1
Pass 2: validated facts -> training-command-draft/v1
```

The first pass extracts behavior facts, not implementation code. The fact artifact should record:

- availability predicates from `COMABLE.ERB` and command-local checks;
- `SOURCE` writes and modifiers;
- `BASE` and `LOSEBASE` writes without changing domains;
- `EXP`, `FLAG`, `CFLAG`, and `TFLAG` writes;
- `TEQUIP`, equipment, mode, and item reads/writes;
- `STAIN` reads/writes and transfer-like operations;
- `CALL`, `CALLFORM`, chain/remap candidates, and helper calls;
- `RETURN`, early-exit, and phase-order-sensitive branches;
- message lines only when readable and relevant;
- unparsed behavior-bearing lines.

Every fact row must include file and line evidence. A draft may not become an approval candidate if required facts are missing line evidence.

The second pass receives validated facts plus the current web-port command API. It may generate executable code only when the facts can be represented with existing command definitions, predicates, effects, source resolvers, phase skips, remap hooks, and adapter boundaries.

If facts require unsupported engine behavior, the second pass must output a spec-only draft and preserve the blocker.

This needs one more prerequisite before large-scale codegen:

```txt
validated facts
-> fixed ERB-to-web-port mapping dictionary
-> fixed operation conversion rules
-> command codegen
```

The codegen worker should have one job: generate the command file using approved mappings and helpers. It should not decide names for `ABL:17`, `TEQUIP:53`, `CFLAG:3`, `STAIN:1`, or any other numeric legacy key.

Current COMF7 proof:

- `facts --command COMF7` loads original `COMF7.ERB` and the matching `COM_ABLE7` block from `COMABLE.ERB`;
- local fact completeness validation passes with zero errors and zero warnings;
- separate AI fact review passes with `approved: true` and `riskLevel: low`;
- review-feedback repair is active, so a missing fact reported by the reviewer can trigger a corrected fact extraction pass before final classification;
- the resulting fact artifact is approved for the next synthesis stage, but executable draft generation is still a separate step.

## Fact Completeness Gate

Fact extraction is not trusted without local checks.

The local validator should scan original ERB text and verify that the fact artifact accounts for behavior-bearing tokens:

- `SOURCE:`;
- `BASE:`;
- `LOSEBASE:`;
- `EXP:`;
- `FLAG:`;
- `CFLAG:`;
- `TFLAG:`;
- `TEQUIP:`;
- `STAIN:`;
- `CALL`;
- `CALLFORM`;
- `RETURN`;
- `TIMES`;
- branch headers such as `IF`, `ELSEIF`, `ELSE`, and `SIF`.

A token does not always mean the line is implementable, but it must be either represented as a fact row or recorded in `unparsedLines`.

Executable drafts are blocked when:

- a required fact row has no matching draft coverage;
- the draft implements behavior absent from facts without an explicit adapter-translation reason;
- `BASE` and `LOSEBASE` domains are changed;
- source indexes are dropped or remapped without documented named-key evidence;
- early returns or phase ordering are omitted;
- generated/improved evidence is used to override original ERB;
- behavior-bearing `unparsedLines` remain.

This gate is intended to catch the specific failures already observed: generated/improved source-index drift, BASE-vs-LOSEBASE ambiguity, COMABLE availability omission, and shape-valid but semantically incomplete drafts.

## Evidence Roles

Use evidence with these priorities:

- Primary: original `COMF*.ERB` command file and matching `COMABLE.ERB` availability block.
- Primary support: current web-port architecture, domain APIs, command definitions, and validators.
- Helper: generated `commands/commands/COMF*.ts` for candidate structure and missing-behavior detection.
- Helper: improved `improved/Com*Command.ts` for previous intent and simplified logic.
- Diagnostic only: current already-migrated web-port command definitions, used to avoid duplicate implementation and to compare coverage.

When helper evidence disagrees with primary ERB evidence, executable synthesis must follow primary ERB or stop with a recorded conflict if the ERB itself is unclear.

## Evidence Slicing

The autopilot should not send broad legacy files wholesale. Local extraction reduces the model's job from search plus analysis to analysis only.

For a command such as `COMF7`, sliced evidence includes:

- the command-specific original ERB file and matching COMABLE block once the two-pass flow is enabled;
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

## Proven Model Route

The current proven route for this project is:

- analyze and synthesize primary: `minimax/minimax-m2.7`;
- review primary: `deepseek/deepseek-v3.2`;
- analyze and synthesize fallback: `deepseek/deepseek-v3.2`;
- review fallback: `minimax/minimax-m2.7`.

Do not use `z-ai/glm-5.1` as the default route for this workflow yet. In the same COMF7 benchmark shape it still produced length-limit failures and invalid conflict shapes, such as non-object conflict rows.

`deepseek/deepseek-v3.2` is useful as a reviewer and fallback analyzer, but it is too slow and timeout-prone to be the primary analyzer for source-heavy command batches.

## Small Batch Proof

COMF7-9 was run as a small batch on 2026-04-29 with sharded analysis, concurrency 3, and the proven model route.

```powershell
$env:OPENROUTER_MODEL='minimax/minimax-m2.7'
$env:OPENROUTER_REVIEW_MODEL='deepseek/deepseek-v3.2'
$env:OPENROUTER_FALLBACK_MODELS='deepseek/deepseek-v3.2'
$env:OPENROUTER_REVIEW_FALLBACK_MODELS='minimax/minimax-m2.7'
npm run ai-port -- autopilot --range COMF7-9 --concurrency 3 --sharded-analysis
```

Result:

- COMF7, COMF8, and COMF9 all completed end-to-end as `draft-only`;
- each command produced a reviewed spec-only draft;
- local gates blocked materialization for expected reasons only: design-ready family status and unresolved canonical conflicts;
- COMF9 had a primary-model malformed `sideEffects` shard, then recovered through the `deepseek/deepseek-v3.2` fallback;
- the slowest observed stage was the COMF9 `sideEffects` fallback at about 102 seconds;
- source-heavy stages, especially `sourceFormula` and synthesis, remain the main latency bottleneck.

This proves the workflow can keep moving to a classified, reviewable artifact without manual intervention when a model output is malformed. It does not prove executable migration for unresolved command families. Executable drafts should be attempted after the relevant canonical conflicts are resolved.

## Current Limits

- The current version generates classified artifacts and approval candidates; it does not auto-commit.
- `blocked` and `design-ready` families cannot become approval candidates.
- Self-fix loops exist for structural output repair, but semantic disagreements remain blocked/spec work until canonical evidence is resolved.
- Generated artifacts are written under `artifacts/ai-port/`, which is ignored by git.
