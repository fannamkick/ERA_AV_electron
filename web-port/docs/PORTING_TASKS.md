# Web Port Task Board

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
- Current focus: next phase content migration backlog
- AI-port automation: 55% toward repeatable approval-candidate factory
- AI-port current proof point: COMF0 can reach `approval-candidate` with current implementation evidence, sharded analysis, no-op/spec synthesis, independent review, and local validation.
- AI-port next proof point: COMF1, COMF6, and one real not-yet-migrated command such as COMF7 must pass the same flow before broad batch migration is trusted.

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

Progress: 55%

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
- [ ] AI-011: Prove COMF1 already-implemented path with the same criteria as COMF0.
- [ ] AI-012: Prove COMF6 already-implemented path with the same criteria as COMF0.
- [ ] AI-013: Run COMF7 as the first real not-yet-migrated command through report, draft, review, and gate.
- [ ] AI-014: Decide whether COMF7 output is safe executable draft, spec-only blocked draft, or report-only; record why.
- [ ] AI-015: Materialize one safe approval candidate in a controlled path, then run typecheck and foundation verification.
- [ ] AI-016: Add a batch report summary that groups results by `approval-candidate`, `draft-only`, `report-only`, `blocked`, and `failed`.
- [ ] AI-017: Benchmark the selected candidate models on the same sharded command set and choose default analyze/review models.
- [ ] AI-018: Add retry/fallback policy for provider timeout, 503, malformed JSON, and `max_tokens` length failures.
- [ ] AI-019: Run a small batch such as COMF7-9 and confirm every output is either approval-candidate, report-only, or explicitly blocked.
- [ ] AI-020: Update `AI_PORT_AUTOPILOT.md` with the proven operating procedure and model route.

### Current Known AI-Port Risks

- `sourceFormula` remains the slowest shard; COMF0 report-only re-test had a 119s sourceFormula shard while cached simple shards returned in under 1s.
- Some models still spend too much budget on reasoning or return malformed JSON unless response healing and strict prompts are used.
- COMF0 success proves the already-implemented path, not the real new-command implementation path.
- AI-generated drafts are still approval candidates, not trusted source edits, until materialize plus local verification is proven on a real command.

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
