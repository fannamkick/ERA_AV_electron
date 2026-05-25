# Training Migration Readiness

This checklist decides when a command family can be assigned to workers for bulk migration. Passing this gate means the worker output should map to the normalized schema without inventing command-local architecture.

## Readiness Levels

| Level | Meaning | Worker action |
| --- | --- | --- |
| `blocked` | Required schema/domain support is missing. | Analysis only. |
| `design-ready` | Schema support exists, but canonical evidence or scenarios are incomplete. | Produce reports and fixture proposals. |
| `migration-ready` | Canonical sources, phases, actors, effects, and validation scenarios are known. | Implement commands from reports. |
| `verified` | Migrated commands pass parity and domain verification. | Allow broader family migration. |

## Required Gate

A family is not `migration-ready` until all of these are true:

- Canonical source files are selected for availability, source formulas, side effects, chain/remap, and messages.
- Actor roles are explicit: target, trainer/master, assistant, previous trainer, current trainer, and effect receiver where used.
- Required state domains are mapped: source, palam, exp, base/loseBase, flags, cflags, tflags, equipment, stains, marks, items, pregnancy, and chain state.
- Required phases are represented: remapBeforeExecute, availability, sourceFormula, directEffects, sourceCheck, postEffects, passive hooks, chain update, messages.
- Required effect families exist in the schema: numeric, bitwise, equipment toggle/conflict, stain modify/transfer, role-targeted effects, and domain hooks.
- Blocking legacy conflicts are recorded as `unresolvedConflicts` and rejected by validation.
- At least one default, one blocked, one modifier, and one side-effect scenario are listed for parity checks.
- The worker report can be reviewed mechanically against `TRAINING_COMMAND_SPEC.md`.

## Current Family Status

| Family | Status | Why |
| --- | --- | --- |
| COMF0-6 pilot | `migration-ready` | Source pipeline, stain effects, conditional EXP, first-contact postEffects, pre-execute confirmation, availability-validated remap, post-effect early-return skips, actor roles, equipment hooks, schema-backed COM69/COM128/COM133 availability, reusable COM_ORDER parity terms, and COMF1/6 original-ERB source/direct/post behavior exist; remaining work is parity fixtures and migrated effects for derived chain targets. |
| COMF7-9 | `design-ready` | Basic/contact schema support exists; canonical source-index reconciliation and dirty-part availability fixtures are still needed. |
| COMF10-19 tools/equipment | `design-ready` | Equipment toggle/conflict, passive hooks, stain clear effects, and domain-owned equipment/stain handlers exist; item alias map and family-specific conflict tables are still needed. |
| COMF18 shower | `design-ready` | Stain assign/clear support exists; parameter decay and environment toggle policy need fixtures. |
| COMF20-39 insertion/service | `blocked` | Actor roles and remap phase exist, but ejaculation, pregnancy, virginity, and player-side domain services are not implemented. |
| COMF40-42, 48, 50-52, 55-56, 72, 81-85, 92 | `design-ready` | Fits the current normalized schema, but needs numeric/mixed source fixtures and COMABLE availability reports. |
| COMF43-47, 49, 53-54, 57-59 | `design-ready` | Equipment/passive/environment schema exists; item aliases, session/video state, and conflict tables are still needed. |
| COMF60-71, 73, 80 | `blocked` | Multi-actor service commands need full COM_ORDER parity, player/master/assistant effects, ejaculation hooks, and richer stain fixtures. |
| COMF87-88 | `blocked` | Requires option/input schema for body-state choices before command migration. |
| COMF90-91 | `design-ready` | Remap phase exists, but worker reports must define target availability and chain fixtures. |
| COMF74-79, 86, 93-99 | `blocked` | No original ERB evidence is present; treat as absent until explicitly designed as new content. |
| COMF89/90/92 mode/action | `design-ready` | Training mode tags, TEQUIP bridges, cleanup rules, and passive hook extension exist; concrete passive formulas and exact availability fixtures are still needed before migration-ready. |
| COMF100+ tentacle/slime families | `blocked` | Mode bridge, disable cleanup, and passive hook extension exist, but wrapper-command remaps and family-specific passive formulas are not implemented. |

## Worker Report Must Include

- Command ids and original ids.
- Canonical source references for each behavior area.
- Required actor roles and fallback assumptions.
- Required state domains and whether each is read, written, or both.
- Phase mapping with ordered source modifiers.
- Effects using named schema operations, not raw custom code.
- Validation scenarios with initial state and expected source/effect deltas.
- Unresolved conflicts with `blocksMigration` marked honestly.

## Current Next Gates

- Use the COMF40+ family split in `TRAINING_CANONICAL_SOURCES.md` before assigning implementation work there.
- Add domain services for ejaculation, pregnancy, virginity, and first-contact before COMF20-39 implementation.
- Build item alias maps and family-specific conflict tables before broad COMF10-19 migration.
- Add parity fixtures/effects for COM69/COM128/COM133 derived chain targets.
- Implement passive mode formulas and wrapper-command remaps before assigning COMF100+ implementation work.
