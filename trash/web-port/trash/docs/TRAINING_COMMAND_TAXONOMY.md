# Training Command Taxonomy

This document summarizes the current command-pattern analysis. It is intentionally higher-level than command implementation notes.

## Summary

The training system should not be migrated as one command class per legacy file. Commands fall into recurring behavior families that need shared schemas and engine phases.

## Command Families

### Basic and Contact Actions

Examples: COMF0-9.

Common patterns:

- Hard blockers based on equipment and clothing.
- Assistant dirty-part rejection.
- Ability-table source calculation.
- Shared source modifiers from sensitivity, pride, and love talents.
- Bidirectional stain transfer between contacted body parts.
- Conditional EXP for orientation or affection thresholds.
- First-contact flags for kiss-like commands.

Schema needs:

- reusable clothing/equipment/anatomy predicates;
- source table formula primitive;
- ordered modifier pipeline;
- stain transfer effect;
- conditional EXP resolver.

### Tool and Equipment Commands

Examples: COMF10-19, COMF89, COMF90, COMF92.

Subtypes:

- `instant-action`: applies source once without persistent equipment.
- `toggle-equipment`: toggles a persistent equipment slot.
- `environment-toggle`: changes environment state, such as shower.
- `mode-toggle`: changes global command mode, such as bestiality.

Common patterns:

- Already-equipped commands are often available to remove equipment even when normal requirements fail.
- Tentacle mode overrides several toggles.
- Equipment has passive effects after being equipped.
- Advanced item IDs modify base loss, pleasure, pain, and shame.
- Shower clears stain and decays parameters.

Schema needs:

- equipment mutation effect;
- equipment conflict table;
- passive equipped hook registry;
- item alias mapping;
- stain clear and parameter decay effects.

### Insertion and Service Commands

Examples: COMF20-39.

Common patterns:

- Position-specific source formulas.
- Actor identity matters: master, assistant, current trainer, previous trainer.
- Chain remap depends on previous commands and actor continuity.
- Vagina/anal insertion handlers add ejaculation, pregnancy, virginity, and first-experience branches.
- Service commands mutate player-side state, not only target state.
- Some service commands route into insertion handlers, so category names are not enough.

Schema needs:

- actor-role-aware context;
- multi-character effects;
- remap-before-execute phase;
- post-execute branching;
- ejaculation/pregnancy/virginity domain services;
- player-side base/exp/stain effects.

## Cross-Cutting Patterns

### Availability

Observed availability families:

- equipment blockers: tentacle, slime, hogtie, gag, mask, bestiality, shower;
- clothing blockers: lower, top, full naked, special clothing bits;
- anatomy/talent blockers: male/futa, virgin, no-service, flat chest, relation state;
- parameter gates: lubrication, lust, PALAM levels;
- formula gates: service score, resistance score;
- assistant fallback gates: assistant ability/talent can allow or block commands.

### Source Formulas

Observed source formula families:

- ability-level tables;
- exp-level tables;
- param-level thresholds;
- command-local additive and multiplicative modifiers;
- global `SourceModifier.applyAll`;
- variant-specific rounding policy.

Important risk: SOURCE index semantics differ across legacy layers. A command report must preserve numeric indices and explain aliases instead of assuming one global meaning.

### Side Effects

Observed side effect families:

- EXP and BASE/LOSEBASE;
- equipment set/toggle/force;
- stain OR/set/clear/transfer;
- TFLAG/CFLAG/FLAG bit operations;
- player-side ejaculation gauge and EXP;
- message output;
- chain state update;
- pregnancy, virginity, and first-contact effects.

## Canonical Decisions Needed

Before mass migration, decide the canonical source per command range.

| Range | Current recommendation | Reason |
| --- | --- | --- |
| COMF0-6 pilot | documented improved baseline until direct legacy execution is safe | Existing parity tooling is built here. |
| COMF7-9 | compare improved vs generated command files before choosing | Availability and source indices diverge. |
| COMF10-19 | prefer generated command files plus centralized availability | Improved/local checks miss item and mode rules. |
| COMF20-39 | do not use simplified improved files as canonical | Rich generated files contain handlers, chain, and player-side effects. |
| COMF89/90/92 | treat as mode/action commands, not ordinary tools | They influence other command availability and source. |

## Engine Gap List

Required before broad worker migration:

- reusable availability predicate library;
- direct numeric source index effect for legacy-conflict cases;
- ordered source modifier pipeline;
- bitwise flag/stat effects;
- stain effects;
- equipment toggle and conflict system;
- passive equipment hook system;
- actor-role-aware context;
- chain remap phase;
- post-execute hook phase;
- canonical source registry for legacy variants.

## Worker Assignment Strategy

Do not assign workers to "port COMF<n>" until the schema supports that command family.

Recommended order:

1. One worker maps canonical source decisions for COMF0-19.
2. One worker maps equipment conflict and passive hook rules for COMF10-19.
3. One worker maps actor roles and chain state for COMF20-39.
4. Main implementation adds missing schema primitives.
5. Workers then migrate commands by category, not by random numeric chunks.
