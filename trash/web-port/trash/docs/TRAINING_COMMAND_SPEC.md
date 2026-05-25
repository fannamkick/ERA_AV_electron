# Training Command Spec Draft

This is the normalized command shape to design toward before broad migration. It is not a final TypeScript API yet; it is the contract that future types and worker reports should converge on.

## Top-Level Shape

```ts
interface TrainingCommandSpec {
  id: string;
  originalId: number;
  name: string;
  category: TrainingCommandCategory;
  legacy: LegacySourceDecision;
  actors: ActorRequirement[];
  requiredState: StateDomainRequirement[];
  phases: TrainingCommandPhases;
  validation: MigrationValidationSpec;
  unresolved: UnresolvedLegacyConflict[];
}
```

## Legacy Source Decision

Every command must record where each behavior came from.

```ts
interface LegacySourceDecision {
  availability: LegacyReference;
  sourceFormula: LegacyReference;
  directEffects: LegacyReference;
  sideEffects?: LegacyReference;
  chainRemap?: LegacyReference;
  messages?: LegacyReference;
}

interface LegacyReference {
  file: string;
  symbol?: string;
  confidence: 'canonical' | 'temporary' | 'conflicted' | 'unsafe';
  notes?: string;
}
```

Rules:

- `canonical`: can be used for implementation.
- `temporary`: usable for pilot parity only.
- `conflicted`: must be resolved before broad migration.
- `unsafe`: cannot be executed or trusted directly.

## Categories

```ts
type TrainingCommandCategory =
  | 'instant-action'
  | 'toggle-equipment'
  | 'environment-toggle'
  | 'mode-toggle'
  | 'position-insertion'
  | 'reverse-action'
  | 'service-action'
  | 'derived-chain';
```

The category decides which phases are required. For example, `toggle-equipment` must define equipment mutation, while `derived-chain` must define remap behavior.

## Actor Requirements

```ts
type ActorRole =
  | 'target'
  | 'trainer'
  | 'master'
  | 'assistant'
  | 'currentTrainer'
  | 'previousTrainer'
  | 'session'
  | 'global'
  | 'effectReceiver';

interface ActorRequirement {
  role: ActorRole;
  required: boolean;
  defaultFrom?: ActorRole;
}
```

Rules:

- Do not read player/master state through target adapters.
- Normalize legacy `player`, `master`, and trainer aliases into `trainer`, with compatibility mapping only at the adapter boundary.
- Do not encode assistant play as a boolean only; keep the assistant actor addressable.
- Chain checks must compare `currentTrainer` and `previousTrainer`, not infer trainer identity from command IDs.
- Treat `session` as command-history and training-run state, not as a character actor.

Current implementation status:

- Adapter-level actor bindings are available for training contexts.
- Unqualified current pilot commands still default to `target`.
- Role-targeted conditions/effects are intended for new focused migrations first, not broad retroactive rewrites.

## State Requirements

```ts
type StateDomain =
  | 'source'
  | 'palam'
  | 'exp'
  | 'base'
  | 'loseBase'
  | 'up'
  | 'talent'
  | 'ability'
  | 'mark'
  | 'equipment'
  | 'mode'
  | 'stain'
  | 'flag'
  | 'cflag'
  | 'tflag'
  | 'item'
  | 'relation'
  | 'pregnancy'
  | 'chain'
  | 'message'
  | 'random';

interface StateDomainRequirement {
  domain: StateDomain;
  actor?: ActorRole;
  access: 'read' | 'write' | 'readwrite';
}
```

Rules:

- A spec must declare every state domain it reads or writes.
- A command that uses player-side EXP, BASE, or stain must declare the `trainer` or `effectReceiver` actor explicitly.
- Chain commands must declare `chain` and `random` if remap formulas are probabilistic.
- UI, persistence, save/load, and input APIs are not valid state domains for command execution.

## Phases

```ts
interface TrainingCommandPhases {
  normalizeContext?: NormalizeContextSpec;
  preExecuteChecks?: PreExecuteCheckSpec[];
  remapBeforeExecute?: RemapSpec[];
  availability: AvailabilitySpec;
  sourceFormula?: SourceFormulaSpec;
  directEffects?: EffectSpec[];
  globalSourceModifiers?: SourceModifierRef[];
  sourceCheck?: SourceCheckSpec;
  phaseSkips?: PhaseSkipSpec[];
  postEffects?: PostEffectSpec[];
  updateChainState?: ChainStateSpec;
  messages?: MessageSpec;
}
```

Phase order is fixed:

1. `normalizeContext`
2. `preExecuteChecks`
3. `remapBeforeExecute`
4. `availability`
5. `sourceFormula`
6. `directEffects`
7. `globalSourceModifiers`
8. `sourceCheck`
9. `postEffects`
10. `updateChainState`
11. `messages`

## Pre-Execute Checks

```ts
interface PreExecuteCheckSpec {
  id: string;
  prompt: string;
  defaultAccepted?: boolean;
  cancelReason?: string;
}
```

Rules:

- Use this only for legacy flows that can abort before effects, such as first-kiss confirmation.
- If the runtime has no decision provider and no default acceptance, the command must fail closed.
- UI/input wiring belongs to the adapter, not command formulas.

## Availability

```ts
interface AvailabilitySpec {
  predicates: ConditionSpec[];
  formulaGates?: FormulaGateSpec[];
  removalBypass?: RemovalBypassSpec;
  unresolved?: string[];
}
```

Needed predicate families:

- stat comparison;
- bitmask check;
- clothing exposure;
- equipment/mode blocker;
- anatomy/talent gate;
- item possession;
- assistant fallback;
- service/resistance score;
- PALAM/param level threshold.

Current formula gate contract:

- Use simple `requirements` for boolean gates.
- Use `formulaGates` for legacy `A >= V` score gates such as COM_ORDER-based execution checks.
- Formula gates return `score`, `threshold`, `details`, and failure reasons for parity reports.
- Shared terms should come from helpers like `commonOrderGateTerms`; COMF6-specific terms use `comf6OrderGateTerms`.
- Bestiality, tentacle, and slime availability should use training mode predicates, not raw equipment checks, while the legacy TEQUIP bridge remains readable for parity.

Current remap contract:

- `remapBeforeExecute` may require the target command to pass availability before the remap is accepted.
- If a validated target is unavailable, the source command continues normally.
- This models legacy `IF COM_ABLE... THEN CALLFORM` chain behavior without hard-coding target checks inside the source command.

## Source Formula

```ts
interface SourceFormulaSpec {
  writes: SourceWriteSpec[];
  localModifiers?: SourceModifierSpec[];
  rounding: 'none' | 'floor' | 'ceil' | 'round';
  indexPolicy: 'named-key' | 'numeric-index' | 'mixed';
}

interface SourceWriteSpec {
  target: ActorRole;
  sourceKey?: string;
  sourceIndex?: number;
  formula: FormulaSpec;
}
```

Rules:

- Use named source keys when the index meaning is stable.
- Use numeric indices when legacy variants disagree.
- Record modifier order explicitly.
- Do not hide rounding behavior; old files mix float-preserving and floor-based paths.

## Effects

```ts
type EffectSpec =
  | NumericEffectSpec
  | BitwiseEffectSpec
  | EquipmentEffectSpec
  | TrainingModeEffectSpec
  | StainEffectSpec
  | MessageEffectSpec
  | DomainHookEffectSpec;
```

Required effect families:

- numeric stat mutation;
- bitwise flag/stat mutation;
- equipment toggle/set/force;
- training mode toggle/set with legacy TEQUIP compatibility bridge;
- stain set/clear/union/transfer;
- multi-actor stat mutation;
- domain hook for ejaculation, pregnancy, virginity, first contact, or chain state.

Current stain effect contract:

- `setStainBits(part, mask, target?)` maps legacy `STAIN:x |= mask`.
- `clearStainBits(part, mask, target?)` clears only declared dirt bits.
- `assignStain(part, value, target?)` replaces a part value for reset/default behavior.
- `mergeStains(from, to, op)` supports bidirectional union and one-way merge.
- Direct numeric/bitwise stat effects should not write `stain`; stain writes must use the explicit stain effect family.

Current mode effect contract:

- `defineTrainingModeToggle` toggles named mode state and mirrors the legacy TEQUIP key.
- Mode tags are the forward-facing domain state: `training.mode.bestiality`, `training.mode.tentacle`, and `training.mode.slime`.
- Legacy bridges are compatibility only: `TEQUIP:89`, `TEQUIP:90`, and `TEQUIP:150`.
- Tentacle disable cleanup clears `TEQUIP:11/13/14/15/16/17/44/46/98`.
- Slime disable cleanup clears `TEQUIP:151/152/154`.
- `definePassiveTrainingModeHook` is the extension point for ongoing mode processors.
- `createStandardTrainingModePassiveProcessors` applies named legacy SOURCE multipliers for bestiality, tentacle, and slime before SourceCheck.
- Legacy SOURCE 11/14 mode multipliers use named source buffers `shame` and `aversion`; they must not be treated as SourceCheck-to-PALAM mappings without separate legacy evidence.
- Concrete passive formulas are separate family rules and must not be hidden inside ordinary equipment toggles.

Current transient stat contract:

- `loseBase.health` maps to `LOSEBASE:0` and `loseBase.stamina` maps to `LOSEBASE:1`.
- `up.arousal` maps to `UP:3` and `up.fear` maps to `UP:10`.
- These domains are available to conditions/effects/adapters for mode processors and high-fatigue commands.

Current phase skip contract:

- `phaseSkips` can skip `postEffects` when a condition set passes.
- Use this for legacy early-return branches that should still apply source/direct effects but must not run ordinary stain/EXP/TFLAG post effects.
- The main known pilot cases are COMF1/COMF6 `TEQUIP:89` branches.

## Validation

```ts
interface MigrationValidationSpec {
  baselineMode: 'documented' | 'executable-legacy' | 'manual-review';
  parityTargets: string[];
  requiredScenarios: ValidationScenario[];
}
```

Minimum scenarios:

- default empty state;
- blocked availability case;
- one representative ability-table case;
- one representative talent modifier case;
- one equipment or stain case when applicable;
- chain/remap case when applicable.

## Unresolved Conflicts

```ts
interface UnresolvedLegacyConflict {
  area: 'availability' | 'source' | 'effects' | 'chain' | 'state' | 'messages';
  sources: LegacyReference[];
  decisionNeeded: string;
  blocksMigration: boolean;
}
```

Any command with `blocksMigration: true` cannot be assigned for bulk migration.

## Readiness Gate

A command family is ready for worker migration only when:

- canonical sources are selected;
- every required actor role has a state adapter path;
- required effect families are implemented;
- unresolved conflicts are non-blocking;
- validation scenarios are defined;
- worker output can map directly into this spec.

Use `TRAINING_MIGRATION_READINESS.md` as the current family-level gate before assigning bulk worker migration.
