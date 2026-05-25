# Web Port Task Board

> 보관 상태: 이 문서는 기존 훈련 커맨드 이식 실험의 태스크 보드다. 현재 새 방향의 기준 문서는 `docs/NEW_PORT_MILESTONES.ko.md`이며, 이 문서는 과거 판단과 작업 흔적 확인용으로만 사용한다.

This board is the working contract for the web port. Keep it current as tasks move, and do not add gameplay code that bypasses the dependency rules in `PORTING_ARCHITECTURE.md`.

## Working Principle

System understanding comes before mass migration.

Do not port commands one by one just because workers are available. Workers are for repeatable analysis and bulk conversion after the system is understood. The main task now is to make the migration model strong enough that later worker output can be reviewed mechanically.

Before broad command migration, the project must have:

- a canonical-source decision process for conflicting legacy variants;
- a normalized command schema that can represent availability, source formulas, side effects, equipment, stains, actors, and chain behavior;
- engine phases that match the real legacy flow;
- a domain responsibility map that separates training session orchestration from person/contact-owned state;
- validation tools that compare migrated behavior against documented or executable legacy baselines;
- clear worker report requirements so parallel work produces compatible results.

## Progress

- Overall: 100% for training migration system readiness
- Current milestone: Training migration system design completed
- Current focus: two-pass ERB-centered AI migration loop
- AI-port automation: 100% for repeatable AI-assisted migration workflow readiness
- AI-port current proof point: COMF0 can reach `approval-candidate` with current implementation evidence, sharded analysis, no-op/spec synthesis, independent review, and local validation.
- AI-port current proof point: COMF1 and COMF6 also reach clean `approval-candidate` results with zero local validation warnings.
- AI-port current proof point: COMF7 reaches `draft-only` as a spec-only blocked draft, with blocking conflicts preserved and automatic materialization blocked.
- AI-port current proof point: structural retry, validator-feedback repair, model fallback routing, and grouped batch summaries are implemented.
- AI-port current proof point: COMF7-9 small batch completes end-to-end; every command produces a reviewed spec-only draft and remains blocked from automatic materialization because canonical conflicts are unresolved.
- AI-port current proof point: COMF7 original ERB/COMABLE fact extraction now passes local completeness validation and separate AI fact review.
- AI-port next focus: add an ERB fact extraction pass so executable drafts are based on original ERB/COMABLE facts instead of generated/improved source arbitration.

## Handoff Log

2026-04-28:

- Completed the training migration system readiness goal.
- Verified that future command migration can use canonical-source docs, normalized command specs, domain responsibility boundaries, explicit engine phases, named state access, content packs, and validation tools.
- Promoted the system-readiness progress marker to 100%.
- Deferred remaining work into next-phase content backlog instead of treating it as system incompleteness.
- Remaining backlog is broad command/content parity, especially derived chain target effects for COM69, COM128, and COM133, plus executable legacy comparison once legacy sources are safe to run.
- Last validation set passed: `npx tsc --noEmit`, `npx ts-node tools/verify_foundation.ts`, `npx ts-node tools/verify_content_ids.ts`, `npx ts-node tools/verify_training_pilot.ts`, `npx ts-node tools/verify_legacy_training_pilot.ts`, `npx vite build`, `npx tsc -p tsconfig.electron.json`.

2026-04-28 AI-port automation:

- Added the first `tools/ai-port` autopilot pipeline for OpenRouter-backed batch command migration.
- The pipeline can analyze legacy evidence, synthesize draft file writes, request independent AI review, run local gate classification, and emit `approval-candidate` results.
- `materialize` can write draft files only when the saved autopilot result is already classified as `approval-candidate`.
- `blocked` and `design-ready` command families are prevented from becoming automatic approval candidates.
- OpenRouter credentials are environment-only via `OPENROUTER_API_KEY`; generated artifacts are ignored under `artifacts/`.

2026-04-29 AI-port automation:

- Added current web-port implementation evidence to sliced AI evidence bundles.
- Current evidence now includes existing command definitions, resolver slices, and verification slices where available.
- COMF0 was re-tested through the sharded OpenRouter flow and reached `approval-candidate` as a no-op/spec draft instead of duplicate implementation code.
- A report-only COMF0 re-test reached `localValidation.ok: true` with zero warnings after tightening source-write and chain-remap checklist prompts.
- Verified local safety after the change with `npx tsc --noEmit` and `npx ts-node tools/verify_foundation.ts`.
- Committed the current implementation evidence flow in `b701200 Add current implementation evidence to AI port flow`.
- COMF1 and COMF6 were re-tested through the same sharded flow and both reached `approval-candidate` with `localValidation.ok: true` and zero warnings.
- COMF7 was run as the first real not-yet-migrated command and correctly stopped at `draft-only` because its family is `design-ready` and source/side-effect conflicts block executable implementation.
- Hardened local gates so `severity: "blocking"` and `blocking: true` conflicts are treated as migration blockers even if the AI omits `blocksMigration: true`.
- Materialized the safe COMF1 no-op/spec approval candidate to `docs/ai-port/spec-drafts/COMF1.spec.md`.
- Verified after materialization with `npx tsc --noEmit` and `npx ts-node tools/verify_foundation.ts`.
- Added robust OpenRouter calls with transient retry, `max_tokens` expansion on length stops, validator-feedback repair loops, and model fallback routes.
- Added grouped autopilot summary output with classification counts, commands by classification, gate reasons, validation issues, and slowest stages.
- Re-ran COMF7 with retry/fallback routing; the pipeline completed as `draft-only` with only expected blocking-conflict warnings.
- Benchmarked candidate analyze models on COMF7 sharded report-only runs. `minimax/minimax-m2.7` is the default analyze/synthesize model; `deepseek/deepseek-v3.2` remains the default review model and analyze fallback; `z-ai/glm-5.1` is not default because it still produces length and conflict-shape problems.
- Ran COMF7-9 as a small batch with the default route. All three completed as `draft-only` with reviewed spec drafts and expected blocking-conflict warnings only.
- Updated `AI_PORT_AUTOPILOT.md` with the proven retry/fallback operation and model route.

2026-04-29 AI two-pass migration design:

- Re-evaluated the migration direction after the COMF7-9 blocked/spec run.
- Confirmed the target is behavior parity with a transpiler-like result, but not a line-by-line transpiler implementation.
- Decided that original `COMF*.ERB` and `COMABLE.ERB` are the authoritative behavior source for executable migration.
- Reclassified generated command files and improved command files as helper evidence only: useful for indexing, candidate formulas, and missing-behavior detection, but not canonical when they disagree with original ERB.
- Identified the main gap in the current AI flow: there is no command-local ERB fact artifact that local validators can compare against worker reports and executable drafts.
- Added Milestone 9 to define the next loop: AI fact extraction, local fact validation, AI implementation synthesis, fact-coverage gate, review, materialize, and verification.

2026-04-29 AI two-pass migration implementation:

- Added `erb-command-facts/v1` and `erb-fact-review/v1` artifact contracts.
- Added `facts` CLI command for original ERB/COMABLE fact extraction.
- Added command-local original ERB evidence loading for `COMF<number>.ERB` plus matching `COM_ABLE<number>` block.
- Added local fact completeness validation against behavior-bearing ERB tokens.
- Added a separate AI fact review pass after mechanical validation.
- Added review-feedback repair: if AI fact review reports missing facts, the extractor retries once with the review findings and re-runs validation/review.
- Ran COMF7 through the new loop. Final result: local fact validation `ok: true`, AI fact review `approved: true`, `riskLevel: low`, and `approvedForSynthesis: true`.

## Completion Scope

This `100%` does not mean every legacy training command has been ported.

It means the system is now ready for clean, repeatable migration:

- canonical legacy source decisions are documented;
- training command behavior can be represented as schema/data instead of one-off code;
- command execution has explicit phases for availability, confirmation, remap, source, direct effects, SourceCheck, post effects, chain state, and messages;
- state access has named key maps and adapter boundaries for new training/domain work;
- training, person/contact, equipment, adapters, content, store, and UI responsibilities are separated;
- worker reports can map directly into the command spec;
- validation commands exist and pass for the current pilot foundation.

The remaining unchecked items are not blockers for system readiness. They are next-phase backlog:

- broad UI/store numeric-index cleanup;
- executable comparison against legacy modules after the legacy source set is safe to run;
- full content/effect migration for derived chain targets such as COM69, COM128, and COM133.

## Milestone 0: Baseline

- [x] Identify current split between `gameplay/training.ts` and `legacy/training`.
- [x] Confirm the project can build before architecture work.
- [x] Confirm lint is not currently usable because ESLint config is missing.
- [x] Add a repeatable validation command set for architecture work.
- [x] Decide when generated `dist` and `release` artifacts should be ignored or regenerated.

## Milestone 1: Architecture Contract

- [x] Write dependency rules for `core`, `domain`, `content`, `legacy`, `stores`, and `components`.
- [x] Define the first task board for incremental progress reporting.
- [x] Review the contract against the user's porting and expansion intent.
- [x] Add an architecture checklist to future PR/review notes.
- [x] Define domain responsibility boundaries for training, person/character, contact/interaction, content, adapters, and stores.

## Milestone 2: State Access Layer

- [x] Add initial name-based key maps for global flags, character flags, PALAM, SOURCE, TALENT, ABL, and EXP.
- [ ] Deferred cleanup: replace remaining direct numeric stat/index reads in components, gameplay, and store APIs with named key accessors/selectors.
- [x] Add runtime guard helpers for unknown keys.
- [x] Add tests for key-to-index mapping.

Remaining direct-access scope:

- Legacy/generated modules may keep raw numeric indexes until their command family is migrated.
- New domain/training code must use key accessors or adapter-local numeric resolution.
- Old diagnostic tools such as `tools/test_character_generation.ts` need either a rewrite or explicit archival before they count as clean.
- `domain/adapters`, `domain/stats`, and `domain/flags` may resolve named keys to numeric indexes locally.
- `domain/person/sourceProgression.ts` now keeps SOURCE/PALAM conversion as named mappings and resolves numeric indexes locally behind the person/progression boundary.
- Components and gameplay modules still contain display/debug/store-facing numeric reads; these are cleanup targets, not blockers for the training engine feature flag.

## Milestone 3: Condition and Effect Foundation

- [x] Add condition definition types and evaluator shell.
- [x] Add effect definition types and applier shell.
- [x] Add composite and bitmask conditions for legacy availability gates.
- [x] Add concrete effect application against the current store snapshot format.
- [x] Add tests for condition evaluation and effect application.

## Milestone 4: Training Migration Pilot

- [x] Add modular training command definition types.
- [x] Add sample content definitions for COMF0, COMF1, and COMF6.
- [x] Implement a `TrainingEngine` that can execute the sample commands.
- [x] Record legacy COMF0, COMF1, and COMF6 baseline behavior for comparison.
- [x] Replace pilot command placeholder values with legacy baseline values.
- [x] Compare COMF0, COMF1, and COMF6 baseline output against documented legacy snapshots.
- [ ] Deferred validation upgrade: compare COMF0, COMF1, and COMF6 output against `ImprovedTrainingModule` once legacy sources are executable.
- [x] Migrate first-pass dynamic source modifiers for COMF0, COMF1, and COMF6.
- [x] Wire schema-based stain side effects for COMF0, COMF1, and COMF6.
- [x] Add first-pass conditional EXP and first-contact post effects for COMF0, COMF1, and COMF6.
- [x] Add safe assistant-play dirty-mouth handling for COMF0 and COMF6.
- [x] COMF1: reconcile canonical behavior against original `COMF1.ERB`; replace improved baseline assumptions, including COM69 availability-validated chain redirect, LOSEBASE/SOURCE 9/10/12/14/16, stain transfer, and EXP/TFLAG behavior.
- [x] COMF6: reconcile canonical behavior against original `COMF6.ERB`; migrate first-kiss confirm, COM128/COM133 availability-validated chain redirects, order gate, ABL/player source tables, dirty-mouth/TEQUIP89 paths, and TFLAG mutations.
- [ ] Next-phase content migration: add full parity fixtures and migrated effects for derived chain targets COM69, COM128, and COM133; current commands validate availability/remap targets only.
- [x] COMF0: finish low-risk parity cleanup against original `COMF0.ERB`; add mouth-stain SOURCE 8 modifier and TEQUIP90/non-TEQUIP90 stain side-effect checks.
- [x] Analyze simplified improved commands vs original ERB variants for COMF0, COMF1, and COMF6.
- [x] Migrate baseline SourceCheck conversion into a pure modular function.
- [x] Add a standalone pilot verification tool for modular COMF0, COMF1, and COMF6.
- [x] Wire SourceCheck conversion into `TrainingEngine` execution results.
- [x] Add legacy-vs-modular parity comparison tooling for COMF0, COMF1, and COMF6.
- [x] Connect `TrainingScreen` to the new engine behind a feature flag.

## Milestone 5: Training Migration System

- [x] Add a standard worker report schema for training command analysis.
- [x] Add a command taxonomy for basic, equipment, insertion, service, and chain-heavy commands.
- [x] Define the canonical-source decision matrix for every legacy command family.
- [x] Define the normalized `TrainingCommandSpec` shape before adding more migrated commands.
- [x] Define the command execution phase model and mark which phases are implemented.
- [x] Define worker acceptance criteria for future parallel migration tasks.
- [x] Decide canonical legacy source policy for COMF0-19.
- [x] Decide canonical legacy source policy for COMF20-39.
- [x] Decide whether COMF40+ should use the same schema or require another command family split.
- [x] Map required actor roles: target, master/player, assistant, current trainer, previous trainer, and effect receiver.
- [x] Map required state domains: source, palam, exp, base, loseBase, flags, cflags, tflags, equipment, stains, items, marks, pregnancy, and chain state.
- [x] Map unsupported or unsafe legacy APIs before relying on generated command files.
- [x] Add reusable availability predicate library.
- [x] Add ordered source modifier pipeline.
- [x] Add reusable formula gate system for COM_ORDER-style execution scores.
- [x] Add bitwise flag/stat effects.
- [x] Add stain transfer/set/clear effects.
- [x] Add equipment toggle and conflict system.
- [x] Add passive equipment hook system.
- [x] Add training mode domain bridge for bestiality, tentacle, and slime.
- [x] Add mode-family cleanup rules for tentacle and slime sub-flags.
- [x] Add passive training mode hook system.
- [x] Add standard passive mode processors for bestiality, tentacle, and slime source multipliers.
- [x] Add `LOSEBASE` and `UP` state domains to stat keys, effects, conditions, and adapters.
- [x] Add actor-role-aware training context.
- [x] Add remap-before-execute phase for chain commands.
- [x] Add post-execute hook phase.
- [x] Record the rule that training orchestrates person/contact changes but does not own persistent person/contact facts.
- [x] Add first-pass `person`, `contact`, and shared runtime service boundaries used by training resolvers.
- [x] Move body/contact availability helpers behind person/contact boundaries while keeping training compatibility wrappers.
- [x] Move COMF0/COMF1/COMF6 experience, first-contact, dirty-mouth, and stain helper ownership behind person/contact boundaries.
- [x] Move first-pass `SOURCE -> PALAM` progression ownership behind the person/progression boundary.
- [x] Move in-memory and store-backed training context implementations behind the adapter boundary.
- [x] Narrow the stable `domain/training` public index so staged command resolvers and adapters are not exported as core training API.
- [x] Move COM_ORDER person-state score terms behind the person formula boundary.
- [x] Add first-pass equipment domain for equipment key validation, active checks, blocking conditions, and set/clear effects.
- [x] Split core effect application into a generic applier loop plus replaceable effect handler registry.
- [x] Add schema-level validation that rejects commands with unresolved canonical-source conflicts.
- [x] Add migration readiness checklist for each command family.
- [x] Implement passive mode processors for bestiality, tentacle, and slime.
- [x] Map legacy SOURCE 11/14 mode multipliers to named source keys before claiming full source-modifier parity.
- [x] Decide whether equipment command families need specialized equipment services before broad tool-command migration.
- [x] Move equipment/stain handlers out of the default core handler registry and compose them through domain-owned training handlers.
- [x] Add an engine-level confirm/abort phase for commands such as COMF6 first-kiss confirmation.
- [x] Add availability-validated remap targets for chain commands such as COMF1 -> COM69 and COMF6 -> COM128/COM133.
- [x] Add full reusable `COM_ORDER` parity scoring before claiming COMF6 original-ERB parity.
- [x] Add schema-backed COM69, COM128, and COM133 command availability before enabling their redirect paths.
- [x] Add explicit branch/early-return support for mode-specific command paths such as COMF1/COMF6 `TEQUIP:89`.
- [x] Wire the confirm/abort phase to the training UI before enabling commands that require player input.

Exit criteria for this milestone:

- New commands can be represented as data/specs, not custom ad-hoc code.
- A worker can analyze a command and produce a report that maps directly to the schema.
- The engine has explicit extension points for unsupported behavior instead of hidden one-off branches.
- Known legacy conflicts are recorded before implementation, not discovered after bugs appear.
- Persistent person/contact consequences are owned by person/contact services even when training triggers them.
- Mass worker migration is allowed only after the relevant command family passes the readiness checklist.

## Milestone 6: Content Pack System

- [x] Add `ContentPack` and `ContentRegistry`.
- [x] Register base training commands through a content pack.
- [x] Support enable/disable of experimental content packs.
- [x] Add a migration rule for save data that records enabled content packs.

## Milestone 7: Expansion Workflow

- [x] Document how to add a new command, event, mission, or visit.
- [x] Add a template for content definitions.
- [x] Add validation that content IDs and original IDs do not collide.
- [x] Add a changelog process for balance and content updates.

## Milestone 8: AI-Assisted Content Migration Factory

Goal: reduce the human bottleneck in repetitive command migration without allowing unreviewed AI code into the project.

This milestone is separate from the already-completed training system readiness milestone. It is complete only when the AI flow can repeatedly produce mechanically reviewable reports, safe drafts, independent review, and local gate results for both already-migrated and not-yet-migrated commands.

Progress: 100%

### Completion Definition

The milestone reaches 100% when:

- already-migrated commands are recognized as already implemented and produce no-op/spec approval candidates instead of duplicate command code;
- not-yet-migrated commands produce either a safe executable draft or a precise blocked/spec draft with concrete missing evidence;
- local validation can reject malformed, conflicted, raw-state, or architecture-breaking outputs without human judgment;
- model/provider latency and quality are measured enough to choose a default model route;
- a small real batch can run end-to-end and leave only approval candidates, report-only items, or explicit blockers.

### Task List

- [x] AI-001: Add OpenRouter-backed CLI pipeline: analyze, synthesize, review, classify, materialize.
- [x] AI-002: Load `.env.local` automatically without committing credentials.
- [x] AI-003: Add local gate rules so raw state mutation, legacy imports, blocked families, and unsafe drafts cannot become approval candidates.
- [x] AI-004: Add sliced evidence mode to avoid sending huge legacy files wholesale.
- [x] AI-005: Add sharded analysis for `availability`, `sourceFormula`, `sideEffects`, and `engineGaps`.
- [x] AI-006: Add area-specific checklist prompts and shard validation.
- [x] AI-007: Add OpenRouter timing metrics, finish-reason checks, reasoning-token limits, provider sorting, cache, and response healing.
- [x] AI-008: Add spec-only draft policy for conflicted or incomplete evidence.
- [x] AI-009: Add current implementation evidence so AI can distinguish already-migrated commands from missing commands.
- [x] AI-010: Prove COMF0 already-implemented path: `approval-candidate`, no executable duplicate code, independent review approved, local validation clean after prompt tightening.
- [x] AI-011: Prove COMF1 already-implemented path with the same criteria as COMF0.
- [x] AI-012: Prove COMF6 already-implemented path with the same criteria as COMF0.
- [x] AI-013: Run COMF7 as the first real not-yet-migrated command through report, draft, review, and gate.
- [x] AI-014: Decide whether COMF7 output is safe executable draft, spec-only blocked draft, or report-only; record why.
- [x] AI-015: Materialize one safe approval candidate in a controlled path, then run typecheck and foundation verification.
- [x] AI-016: Add a batch report summary that groups results by `approval-candidate`, `draft-only`, `report-only`, `blocked`, and `failed`.
- [x] AI-017: Benchmark the selected candidate models on the same sharded command set and choose default analyze/review models.
- [x] AI-018: Add retry/fallback policy for provider timeout, 503, malformed JSON, and `max_tokens` length failures.
- [x] AI-019: Run a small batch such as COMF7-9 and confirm every output is either approval-candidate, report-only, or explicitly blocked.
- [x] AI-020: Update `AI_PORT_AUTOPILOT.md` with the proven operating procedure and model route.

### Current Known AI-Port Risks

- `sourceFormula` and synthesis remain the slowest stages for source-heavy commands.
- `deepseek/deepseek-v3.2` is useful as a reviewer and fallback, but too slow/timeout-prone as the primary analyzer for this workload.
- `z-ai/glm-5.1` is not a default route because it still hits length limits and can produce non-object conflict rows.
- COMF7-9 prove the blocked/spec path, not executable new-command generation. Executable generation should be attempted only after canonical conflicts are resolved.
- AI-generated executable drafts are still not trusted source edits until a real command reaches safe approval and passes materialize plus local verification.

## Milestone 9: Two-Pass ERB-Centered AI Migration Loop

Goal: produce web-port command implementations with the same behavior as original ERB without building a full ERB-to-TypeScript transpiler.

The intended pipeline is:

```txt
original COMF*.ERB + COMABLE.ERB
-> AI fact extraction
-> local fact completeness validation
-> AI implementation synthesis from facts
-> local fact-coverage gate
-> independent AI review
-> approval-candidate classification
-> materialize
-> typecheck and parity verification
```

Progress: 45%

Current readiness split:

- ERB fact extraction and validation readiness: proven for COMF7.
- Executable code generation readiness: not proven. The missing prerequisite is a fixed ERB-to-web-port mapping dictionary and reusable conversion helpers.
- The next session should not continue broad prompt tweaking. It should first build the mapping dictionary and codegen contracts described below.

### Why This Milestone Exists

The previous AI-port factory proved that model outputs can be classified safely, retried, reviewed, and blocked. It did not prove executable migration for not-yet-migrated commands because COMF7-9 still depended on generated/improved source arbitration.

This milestone removes that ambiguity. It makes original ERB and COMABLE the primary evidence, then uses generated/improved files only as secondary aids.

### Design Rules

- Original `COMF*.ERB` and `COMABLE.ERB` are canonical for executable behavior.
- Generated `commands/commands/COMF*.ts` is helper evidence for structure, candidate formulas, and missing-behavior checks.
- Improved `improved/Com*Command.ts` is helper evidence for previous intent only and must not override original ERB.
- AI is used as a semantic interpreter, not as a line-by-line transpiler.
- The first AI call may extract facts only. It must not write executable code.
- The second AI call may synthesize drafts only from validated facts.
- Local validators must reject executable drafts when ERB facts are missing, unparsed, or not covered by the draft.

### Encountered Issue Coverage

This milestone must address the issues already observed:

- Generated/improved conflict: resolved by original ERB precedence and helper-only generated/improved status.
- Source index drift: fact extraction must record every original `SOURCE:` write with line evidence, and the gate must compare draft coverage against it.
- BASE vs LOSEBASE ambiguity: fact extraction must preserve the original write domain exactly.
- COMABLE availability loss: fact extraction must include the matching COMABLE block as primary availability evidence.
- Early return and phase ordering: fact extraction must record `RETURN`, `CALL`, `CALLFORM`, and branch spans so synthesis can map them to `phaseSkips`, remap, or blocking gaps.
- Model malformed JSON: reuse the existing retry, healing, fallback, and local schema validation flow.
- Long sourceFormula latency: fact extraction should reduce repeated source-heavy reasoning by giving synthesis a compact fact artifact.
- Semantic gate weakness: add fact-coverage validation so a draft cannot pass merely because its JSON shape is valid.

### Fact Artifact Contract

The first AI pass should produce an `erb-command-facts/v1` artifact with this minimum shape:

```json
{
  "schemaVersion": "erb-command-facts/v1",
  "command": { "id": "COMF7", "originalId": 7, "name": "" },
  "sourceFiles": [],
  "availability": [],
  "sourceWrites": [],
  "baseWrites": [],
  "loseBaseWrites": [],
  "expWrites": [],
  "flagWrites": [],
  "equipmentWrites": [],
  "stainWrites": [],
  "calls": [],
  "earlyReturns": [],
  "messages": [],
  "unparsedLines": [],
  "notes": []
}
```

Every behavior-bearing row must include:

- `file`;
- `lineStart`;
- `lineEnd`;
- `raw`;
- normalized target domain and index/key when known;
- confidence;
- whether it must be implemented or may remain informational.

### Local Fact Validation

The first local validator should not try to fully understand ERB semantics. Its job is completeness and contradiction detection.

It must compare the original text against the fact artifact for:

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
- branch headers such as `IF`, `ELSEIF`, `ELSE`, `SIF`.

If the original contains behavior-bearing lines that are absent from facts and absent from `unparsedLines`, the command cannot become an executable approval candidate.

### Implementation Synthesis Contract

The second AI pass receives validated facts plus the current web-port command API.

It may produce executable draft code only when:

- fact validation passed;
- required ERB facts have implementation coverage;
- no behavior-bearing `unparsedLines` remain;
- every required state domain/effect family exists in the current web-port schema;
- generated/improved evidence is used only for comparison and never as an override of original ERB.

Otherwise it must produce a spec-only draft that explains the gap.

### Fact-Coverage Gate

Before AI review and materialize, local gate validation must reject drafts when:

- a required fact row has no matching draft coverage;
- a draft implements behavior not present in facts and not justified as a web-port adapter translation;
- a draft changes write domain, such as `LOSEBASE` to `BASE`;
- a draft drops `RETURN` or post-effect ordering;
- a draft uses raw numeric state access outside approved adapter boundaries;
- a draft invents helper names, effect types, condition types, or state keys.

### Task List

- [x] AI2-001: Add `erb-command-facts/v1` TypeScript types and JSON schema.
- [x] AI2-002: Add a command-local original ERB/COMABLE evidence loader that finds `COMF<number>.ERB` and the matching COMABLE block.
- [x] AI2-003: Add a first-pass OpenRouter prompt for ERB fact extraction with strict JSON output and line evidence requirements.
- [x] AI2-004: Add local fact completeness validation for behavior-bearing ERB tokens.
- [ ] AI2-005: Add generated/improved comparison notes as helper evidence, not canonical evidence.
- [ ] AI2-006: Modify sharded analysis so WorkerReport uses validated ERB facts as primary evidence.
- [ ] AI2-007: Modify draft synthesis so executable drafts must cite fact rows they implement.
- [ ] AI2-008: Add fact-coverage gate checks before approval-candidate classification.
- [x] AI2-009: Run COMF7 through fact extraction only and verify source/base/loseBase/EXP/flag/stain/call/return coverage.
- [ ] AI2-010: Run COMF7 through full two-pass flow and classify the result.
- [ ] AI2-011: If COMF7 is blocked, record whether the blocker is missing engine support, unparsed ERB behavior, or unsafe draft coverage.
- [ ] AI2-012: Run COMF8-9 through fact extraction and compare issue patterns against COMF7.
- [ ] AI2-013: Update `AI_PORT_AUTOPILOT.md` with the two-pass operating procedure after COMF7 proof.
- [x] AI2-014: Add a separate AI fact review pass after mechanical fact validation.
- [x] AI2-015: Add review-feedback repair when AI fact review reports missing facts.
- [ ] AI2-016: Add a fixed ERB-to-web-port mapping dictionary for `ABL`, `TALENT`, `TEQUIP`, `CFLAG`, `TFLAG`, `FLAG`, `SOURCE`, `EXP`, `PALAM`, `LOSEBASE`, and `STAIN`.
- [ ] AI2-017: Add fixed conversion rules for ERB operations: `SOURCE =`, `SOURCE +=`, `TIMES SOURCE`, `LOSEBASE +=`, `EXP +=`, `CFLAG/TFLAG/FLAG =`, `STAIN |=`, `CALL COM_ORDER`, `CALL TRAIN_MESSAGE_B`, and `RETURN`.
- [ ] AI2-018: Add reusable helpers for missing operation families before AI codegen, especially legacy order gates and stain OR merge.
- [ ] AI2-019: Restrict executable codegen so AI may only use the mapping dictionary and approved helpers; unknown mappings must become `missingMapping`, not invented keys.
- [ ] AI2-020: Split the late-stage AI flow into single-purpose workers: fact extraction, mapping resolution, command codegen, and review.

### Completion Definition

This milestone reaches 100% when:

- COMF7 produces a validated ERB fact artifact from original ERB and COMABLE;
- local fact validation catches deliberate omissions in a negative test or fixture;
- the full two-pass flow produces either an executable approval candidate or a precisely blocked spec draft;
- any executable draft must pass fact-coverage gate, independent AI review, local validation, materialize, typecheck, and foundation verification;
- COMF8-9 can at least complete fact extraction with clear coverage summaries.

### Current Codegen Diagnosis

The first-pass fact loop is useful, but the late-stage code generation was scoped too broadly.

Observed COMF7 results:

- `facts --command COMF7` can produce a locally valid `erb-command-facts/v1` artifact.
- The improved extraction prompt now records `CALL COM_ORDER` as `formulaGates`, not only as a call.
- `from-facts` can generate executable draft files, but the output is not reliable enough to apply automatically.
- AI review correctly caught unsafe draft behavior such as incorrect stain handling and invented or misused registry keys.
- The latest generated code was blocked before apply because the review was `approved: false` and `riskLevel: high`.

Root cause:

- The second-pass generation AI was asked to do too much in one call: key naming, registry design, helper selection, command implementation, pack registration, fact coverage, and JSON formatting.
- This is not the intended repetitive porting loop. AI should not invent stat keys, helper APIs, or architecture.
- The correct model is: predefine mapping and conversion rules, then make AI perform only the repetitive code writing against those rules.

Required design correction:

```txt
original ERB facts
-> fixed ERB-to-web-port mapping dictionary
-> fixed operation conversion rules
-> missingMapping report if a source element is unknown
-> single-command TypeScript generation using approved helpers only
-> AI review
-> typecheck/foundation verification
```

AI codegen boundaries:

- Allowed: choose a predefined mapping, fill command code, implement numeric tables and conditions, cite fact ids.
- Forbidden: invent new stat keys, invent new helpers, alter architecture, update registries ad hoc, or replace unknown mappings with guessed names.

Next concrete work:

1. Build `ERB_TO_WEBPORT_MAPPING` as code, not prose.
2. Build operation conversion contracts for each ERB write/call/return family.
3. Add or confirm helpers for `COM_ORDER` and `STAIN |=`.
4. Re-run COMF7 codegen with AI limited to those contracts.
5. Only then attempt `--apply`.

### Session Handoff Text

Copy this into the next session:

```txt
We are in web-port of an erAV porting project. The user wants a non-handwavy AI-assisted migration loop where AI does repetitive code writing, not architecture invention.

Current state:
- Original ERB/COMABLE fact extraction exists and works for COMF7.
- Files added/modified include tools/ai-port commands `facts` and `from-facts`, schemas for `erb-command-facts/v1` and fact review, prompts for fact extraction/review/draft synthesis, and validators.
- `facts --command COMF7 --out-dir artifacts/ai-port-facts-codegen --no-review` produced a locally valid facts artifact.
- The fact prompt was improved to extract `CALL COM_ORDER` into `formulaGates`.
- `from-facts` can call AI to generate executable draft files, run AI review, and optionally apply reviewed drafts.
- Do not trust current generated COMF7 code artifacts. They were experiments and were blocked by AI review/local gates.

Important conclusion:
- The problem is not that AI cannot generate TypeScript.
- The problem is that late-stage codegen was asked to choose key names, design registry updates, choose helpers, implement command logic, and satisfy JSON formatting all at once.
- That is too broad and causes invented keys, wrong helper usage, wrong stain handling, and invalid formula-gate code.

Correct next direction:
- Do not keep prompt-tweaking monolithic codegen.
- First implement a fixed ERB-to-web-port mapping dictionary:
  - ABL/TALENT/TEQUIP/CFLAG/TFLAG/FLAG/SOURCE/EXP/PALAM/LOSEBASE/STAIN numeric index -> web-port key.
  - Unknown mapping must become `missingMapping`; AI must not invent names.
- Then implement fixed conversion rules:
  - `SOURCE =`, `SOURCE +=`, `TIMES SOURCE` -> approved source effect/helper pattern.
  - `LOSEBASE +=` -> `addLoseBase`.
  - `EXP +=` -> `addExp`.
  - `CFLAG/TFLAG/FLAG =` -> approved numeric/flag effect.
  - `STAIN:a |= STAIN:b` -> approved stain OR/merge helper.
  - `CALL COM_ORDER` -> approved formula gate helper.
  - `RETURN 0/1` -> requirements/formula-gate fail/success.
- Add missing helpers before asking AI to generate final command code, especially for legacy order gates and stain OR merge.
- After that, restrict AI to codegen only:
  - Input: validated facts + mapping dictionary + conversion rules + approved helper list.
  - Output: one command implementation file, plus minimal pack registration if needed.
  - AI may not modify architecture or invent keys/helpers.

Validation reminders:
- Run `npx tsc --noEmit` after tool changes and after any generated code apply.
- Use artifacts only as working outputs; they are ignored by git.
- `.env.local` has the OpenRouter key and must not be printed or committed.
- Known unrelated dirty files are `.claude/settings.local.json`, `web-port/dist-electron/main.js`, and `web-port/dist-electron/preload.js`; do not revert them.
```

## Reporting Format

Use this format when reporting progress:

```txt
Progress: <overall percent>
Completed: <task ids or summaries>
Current: <active task>
Blocked: <blocker or none>
Next: <next concrete task>
```

## Validation Commands

Run these after architecture or domain-layer changes:

```bash
npx tsc --noEmit
npx ts-node tools/verify_foundation.ts
npx ts-node tools/verify_content_ids.ts
npx ts-node tools/verify_training_pilot.ts
npx ts-node tools/verify_legacy_training_pilot.ts
npx vite build
npx tsc -p tsconfig.electron.json
```

Current known build warnings:

- Electron builder uses the default icon because no app icon is configured.
- `saveSystem.ts` is both dynamically and statically imported.
- `characters.json` is both dynamically and statically imported.
- Legacy direct execution is not currently safe; baseline parity uses documented snapshots until malformed/excluded legacy sources are repaired.

Current known validation issue:

- `npm run build:electron` can hang in electron-builder packaging in the current workspace. `npx tsc --noEmit`, `npx vite build`, and `npx tsc -p tsconfig.electron.json` pass.
