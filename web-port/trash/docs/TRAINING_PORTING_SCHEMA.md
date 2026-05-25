# Training Porting Schema

This document is the worker contract for migrating legacy training commands without ad-hoc rewrites. A worker should analyze legacy commands into this schema before any implementation starts.

## Migration Rule

Legacy files are evidence, not the architecture.

Do not directly port a command class line-by-line. Extract the command into normalized command data, source formulas, availability predicates, side effects, and phase hooks.

## Canonical Source Policy

Each command must declare which legacy source is authoritative for each behavior area.

| Area | Preferred source | Notes |
| --- | --- | --- |
| Availability | `availability.ts` or `commandAvailability.ts` when complete | Local `isAvailable` is often weaker or TODO. |
| Baseline source and EXP | richer `commands/commands/COMF*.ts` when executable and coherent | `improved/Com*.ts` may be simplified. |
| Current pilot baseline | `improved/Com0/1/6` plus documented snapshots | Used only until variant reconciliation is complete. |
| Chain/remap | `CommandChainHandler` plus command-local chain checks | Existing central handler is incomplete. |
| SourceCheck | `legacy/training/systems/SourceCheck.ts` | Mapping is narrow and must be preserved before changes. |

If sources conflict, record the conflict and choose one explicitly. Do not merge behavior silently.

## Command Categories

Use these categories before assigning implementation work.

| Category | Examples | Required engine support |
| --- | --- | --- |
| `instant-action` | COMF0, COMF1, COMF2, COMF6, COMF9, COMF10, COMF12 | availability, source formula, direct effects, SourceCheck |
| `toggle-equipment` | COMF11, COMF13, COMF14, COMF15, COMF16, COMF17, COMF19 | equipment mutation, already-equipped removal exception, passive equipped effects |
| `environment-toggle` | COMF18 shower | equipment/mode mutation, stain cleanup, parameter decay |
| `mode-toggle` | COMF89 bestiality, tentacle/slime modes | global conflict state, command blockers, source modifiers |
| `position-insertion` | COMF20-23, COMF26-29 | actor roles, insertion handlers, ejaculation, pregnancy, virginity, chain remap |
| `reverse-action` | COMF24-25 | target-driven source, player-side effects, repeat-state flags |
| `service-action` | COMF30-39 | service score, player state, ejaculation gauge, stains, mixed insertion/service routing |
| `derived-chain` | COMF120-134 | remap-before-execute, previous command validation |

## Standard Worker Report

Every worker report must use this shape.

```txt
Command: COMF<number> / <name>
Category: <category>
Canonical decision:
- availability: <file/function>
- source/effects: <file/function>
- chain/remap: <file/function or none>

Availability:
- hard blockers:
- clothing/anatomy gates:
- item/equipment gates:
- formula/score gates:
- assistant/player fallback gates:
- unresolved conflicts:

Source formula:
- source indices written:
- ability/exp/param tables:
- command-local modifiers:
- global modifiers:
- rounding/flooring:
- unresolved conflicts:

Side effects:
- EXP:
- BASE/LOSEBASE:
- flags:
- equipment:
- stains:
- messages:
- multi-character effects:
- post-execute hooks:

Chain/remap:
- previous command dependencies:
- actor identity dependencies:
- remap target validation:
- unresolved conflicts:

Engine gaps:
- condition predicates needed:
- effect types needed:
- phase hooks needed:
- state adapter fields needed:
```

## Worker Acceptance Criteria

A worker report is acceptable only if it is reviewable without re-reading the entire legacy command by hand.

Required:

- It names the command category and explains why that category applies.
- It cites canonical source files/functions for availability, source/effects, side effects, messages, and chain/remap.
- It lists every raw legacy index it relies on, with the intended named key when one exists.
- It records unresolved conflicts instead of choosing behavior silently.
- It maps every required engine gap to a known schema block, effect family, predicate family, phase hook, or state adapter field.
- It includes at least one blocked availability case and one successful execution scenario for later parity testing.

Reject the report if:

- It ports code line-by-line without extracting source formulas, predicates, effects, and phase hooks.
- It adds command-specific engine branches where a reusable predicate/effect/phase would fit.
- It uses `conflicted` or `unsafe` legacy evidence as canonical without an explicit decision.
- It leaves `blocksMigration: true` conflicts in a command definition.
- It mutates store or React state directly instead of going through an adapter/draft and commit path.

## Engine Phases

The training engine should evolve toward explicit phases. Commands may opt into only the phases they need.

```txt
1. normalizeContext
2. remapBeforeExecute
3. evaluateAvailability
4. resolveSource
5. applyCommandEffects
6. applyGlobalSourceModifiers
7. applySourceCheck
8. applyPostEffects
9. updateChainState
10. collectMessages
```

Current implementation covers phases 3, 4, 5, and 7 for the pilot only.

## Required Schema Blocks

### Availability

Availability must be composable. Required predicate families:

- `stat.compare`
- `stat.bit`
- `all`, `any`, `not`
- reusable predicates such as `lowerExposed`, `topExposed`, `notInMode`, `hasAnatomy`, `assistantCanBypass`
- formula gates such as service score and lubrication thresholds

Implemented reusable helpers:

- `requiresFemaleTarget`
- `requiresNoEquipment` / `requiresNoEquipments`
- `blocksWhenEquipped`
- `requiresLowerClothingRemoved`
- `requiresLowerExposed`
- `blocksStockingState`
- `blocksSpecialLowerClothing`
- `requiresMouthAccessible`
- `toggleableEquipmentCommand`

Known predicate blockers before broader COMF0-19 migration:

- TEQUIP 89/90/150 are resolved as `bestialityPlay`, `tentacleTraining`, and `slime`; these are mode bridges, not ordinary equipment ownership.
- Tentacle cleanup uses reused equipment keys `11/13/14/15/16/17/44/46/98`; slime cleanup uses `151/152/154`.
- Upper-body and shower gates need additional canonical keys such as clothing-system mode, bathroom/shower, caps, and special clothing exceptions.
- Assistant fallback requires actor-role-aware context, ASSIPLAY/session state, and assistant stat resolution.
- Dirty/stain oral-service blockers require a stain state domain and stain condition predicates.
- Item/no-item-mode gates require item or mode condition support.

### Source Formula

Source formulas should be data-first.

Required formula primitives:

- ability table lookup with clamp policy
- exp table lookup
- param level lookup
- multiplier/additive modifiers
- command-local modifier order
- global modifier order
- rounding policy: none, floor, ceil, round
- direct numeric source index fallback for inconsistent legacy mappings

Implemented primitives:

- `SourceValues`
- `SourceModifier`
- `defineSourceModifier`
- `applySourceModifiers`
- `defineSourcePipeline`
- `sourceEffectsFromValues`

Current rule:

- Keep source pipelines inside command-family resolvers until actor roles, source-index policy, and global phase boundaries are stable.
- Do not move global source modifiers into `TrainingEngine` yet; COMF0 intentionally skips common modifiers under gag/faint while COMF1 and COMF6 do not.

### Effects

Required effect families:

- numeric stat add/set/min/max
- bitwise flag/stat set, clear, toggle
- equipment toggle with conflict override
- stain transfer, set, clear, union
- multi-character target effects
- message add
- deferred post-effect

Implemented equipment support:

- `toggleEquipment(key, { enabled, conflicts, target })`
- adapter-level conflict clearing for registered equipment keys
- definition-time rejection for unknown equipment keys and self-conflicts

Implemented stain support:

- canonical STAIN part keys: `mouth`, `hand`, `penis`, `vagina`, `anus`, `breast`;
- canonical STAIN bits: `vaginalFluid`, `penis`, `semen`, `anal`, `breastMilk`, `urine`;
- read-side condition support through `stat.compare` and `stat.bit` on the `stain` domain;
- write-side effects are restricted to `setStainBits`, `clearStainBits`, `assignStain`, and `mergeStains`;
- in-memory and store adapters support role-targeted stain mutation and bidirectional transfer.

Remaining equipment blockers:

- mode systems such as bestiality, tentacle, slime, and COMF100+ should not be treated as ordinary tool toggles;
- broad COMF10-19 migration still requires item gates and family-specific conflict tables.

Implemented passive equipment hook support:

- `definePassiveEquipmentHook({ equipmentKey, phase, when, effects })` registers equipment-driven effects without command-local duplication.
- Hooks can run before or after SourceCheck conversion through the engine's `passiveEffectHooks` option.
- Unknown equipment keys are rejected when defining the hook.

### Actors

State adapters must distinguish:

- `target`
- `master/player`
- `assistant`
- `currentTrainer`
- `previousTrainer`
- `effectReceiver`

Do not encode these as implicit array choices in content.

## Known Migration Blockers

- Legacy source variants conflict for several commands.
- Some generated command files import missing systems such as `PlayerEjaculation`.
- Handler APIs do not always match generated call sites.
- Context shape is inconsistent: `cflag`, `cflags`, `charFlags`, `playerBase`, `context.player.base`, and nested stains appear in different files.
- SOURCE index meanings are not globally stable across generated/plugin/improved layers.
- Direct legacy execution is unsafe until malformed or excluded sources are repaired.

## Near-Term Implementation Order

1. Add canonical source decisions for COMF0-9 and COMF10-19.
2. Add reusable availability predicates for clothing, equipment modes, anatomy, assistant fallback.
3. Add bitwise and stain effects.
4. Add equipment toggle schema and passive equipped hooks.
5. Add actor roles to the training runtime context.
6. Add remap-before-execute phase for chain commands.
7. Only then start broad command migration workers.
