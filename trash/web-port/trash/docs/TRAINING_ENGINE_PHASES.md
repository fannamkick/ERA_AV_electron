# Training Engine Phases

The training engine should not grow as a single `executeCommand` function with command-specific branches. It should execute explicit phases. Each command category opts into the phases it needs.

## Phase Overview

```txt
1. normalizeContext
2. preExecuteChecks
3. remapBeforeExecute
4. evaluateAvailability
5. resolveSource
6. applyDirectEffects
7. applyGlobalSourceModifiers
8. applySourceCheck
9. applyPostEffects
10. updateChainState
11. collectMessages
```

## Phase Details

### 1. normalizeContext

Purpose:

- Convert store/runtime state into a stable domain adapter.
- Normalize legacy aliases such as `cflag`, `cflags`, and `charFlags`.
- Bind actor roles: target, master, assistant, current trainer, previous trainer, effect receiver.

Required before:

- assistant-play commands;
- player-side effects;
- chain/remap commands;
- generated legacy command parity.

### 2. preExecuteChecks

Purpose:

- Ask for command-level confirmation before any availability/effects run.
- Abort safely when legacy flow requires a player decision, such as first-kiss confirmation.

Current implementation:

- `TrainingCommandDefinition.preExecuteChecks` can request a decision.
- `TrainingEngineContext.requestTrainingDecision` supplies the answer.
- If no decision provider exists and the request has no default acceptance, the command is rejected without effects.
- Decision results are returned as `decisionResults`, including through remapped execution.

### 3. remapBeforeExecute

Purpose:

- Convert selected command into another command before availability/effects.
- Preserve chain behavior such as COMF6 into COMF128/133 or COMF20 into derived insertion commands.

Inputs:

- selected command;
- previous command;
- previous-previous command;
- current/previous trainer identity;
- target state;
- random/formula gates when legacy requires them.

Rule:

- Remap targets must pass availability validation before execution.

Current implementation:

- `TrainingCommandDefinition.remapBeforeExecute` can return a replacement command id and reason.
- The engine executes the remap target before availability/effects of the source command.
- Remaps can set `requireTargetAvailable`; when set, the remap is ignored unless the target command passes requirements and formula gates.
- Remap history is returned as `remappedFrom` and `remapReasons`.
- Max remap depth defaults to 8 to prevent accidental loops.

### 4. evaluateAvailability

Purpose:

- Decide if the command can be selected or executed.

Supported condition families:

- stat comparison;
- bitmask checks;
- clothing/anatomy/equipment predicates;
- item possession;
- mode blockers;
- assistant fallback;
- formula gates.

Rule:

- Availability must be data/spec driven.
- Command-local one-off code is allowed only through named reusable predicates.

Current formula gate implementation:

- `TrainingCommandDefinition.formulaGates` runs after simple requirements and before effects.
- `defineScoreFormulaGate` supports threshold checks, auto-pass predicates, diagnostic score details, and command-local computed terms.
- `commonOrderGateTerms` maps the reusable `COMORDER.ERB` terms: obedience, masochism, lesbian/female-pair bonuses, marks, PALAM levels, target talents, trainer talents, relation score, and zero-stamina bonus.
- `comf6OrderGateTerms` adds COMF6-specific desire, mouth-service, pleasure mark, lust PALAM, kiss talents, bestiality penalty, and dirty-mouth penalty terms.
- Broad command families still need family-specific scenarios before the gate is enforced everywhere.

### 5. resolveSource

Purpose:

- Calculate SOURCE output before SourceCheck.

Inputs:

- ability tables;
- exp tables;
- PALAM/param levels;
- local command modifiers;
- actor state;
- equipment and mode state.
- transient `LOSEBASE` and `UP` state for fatigue and mode pressure.

Current mode-state implementation:

- Bestiality, tentacle, and slime are represented as training mode tags with a legacy TEQUIP bridge.
- `training.mode.bestiality` bridges to `TEQUIP:89`, `training.mode.tentacle` to `TEQUIP:90`, and `training.mode.slime` to `TEQUIP:150`.
- Availability should use mode predicates instead of treating these as ordinary equipment blockers.
- Legacy TEQUIP reads still work so parity checks and partially migrated formulas remain compatible.
- Tentacle mode disable clears reused sub-flags `TEQUIP:11/13/14/15/16/17/44/46/98`.
- Slime mode disable clears sub-flags `TEQUIP:151/152/154`.
- `definePassiveTrainingModeHook` provides the engine extension point for ongoing mode processors.
- Standard bestiality/tentacle/slime passive processors apply the currently named legacy SOURCE multipliers before SourceCheck.
- Legacy SOURCE 11/14 mode multipliers are mapped as named source buffers (`shame`, `aversion`) for source-modifier parity, but current SourceCheck still does not convert them to PALAM.

Rule:

- Preserve source index policy explicitly: named key, numeric index, or mixed.
- Preserve rounding policy explicitly.

### 6. applyDirectEffects

Purpose:

- Apply non-source command effects.

Examples:

- EXP gain;
- BASE or LOSEBASE mutation;
- equipment toggle;
- flags;
- direct messages.

### 7. applyGlobalSourceModifiers

Purpose:

- Apply shared modifiers after command-local source resolution.

Examples:

- sensitivity talents;
- love/pride modifiers;
- global equipment modifiers;
- relation modifiers;
- param/PALAM-derived modifiers.

Rule:

- Modifier order must be stable and documented.

### 8. applySourceCheck

Purpose:

- Convert SOURCE into PALAM and apply natural decay/threshold handling.

Current pilot:

- Basic SOURCE to PALAM mapping exists.
- Orgasm/fainting/secretions are not fully migrated.

### 9. applyPostEffects

Purpose:

- Run effects that depend on source/check results or command outcome.

Examples:

- ejaculation;
- pregnancy;
- virginity;
- first-contact;
- stain transfer;
- passive equipment effects;
- command-specific branch effects.

Current implementation:

- `TrainingCommandDefinition.postEffects` runs after optional SourceCheck conversion.
- `TrainingCommandDefinition.phaseSkips` can skip post effects when a condition set passes, which models legacy early-return branches such as `TEQUIP:89`.
- Post effects share the same effect applier as direct effects, so stain transfer and later domain hooks stay phase-separated.
- Passive equipment hooks can run before or after SourceCheck through engine-level `passiveEffectHooks`.
- Domain-specific hooks for ejaculation, pregnancy, and virginity are still pending.

### 10. updateChainState

Purpose:

- Store current command and trainer state for future remap logic.

Examples:

- previous command;
- previous-previous command;
- whether previous trainer was assistant;
- same-trainer markers.

### 11. collectMessages

Purpose:

- Produce messages after gameplay results are known.

Rule:

- Message generation should read result state but should not mutate gameplay state.

## Current Implementation Status

| Phase | Status |
| --- | --- |
| normalizeContext | partial actor-role binding in training contexts |
| preExecuteChecks | implemented at engine level and wired to the training UI decision provider |
| remapBeforeExecute | implemented for command remaps, including target availability validation |
| evaluateAvailability | partial condition evaluator plus formula gates and mode predicates |
| resolveSource | partial ordered source modifier pipeline for COMF0/1/6 |
| applyDirectEffects | partial effect applier with numeric, bitwise, equipment, stain, tag, and mode-bridge support |
| applyGlobalSourceModifiers | ordered but still embedded in source resolvers |
| applySourceCheck | partial pure SourceCheck conversion |
| applyPostEffects | implemented for command post effects, passive hooks, and conditional phase skips |
| updateChainState | implemented for previous command, previous-previous command, and previous trainer assistant/master marker |
| collectMessages | basic message effects only |

Actor-role support currently means:

- unqualified stat reads and effects still default to the target for COMF0/1/6 compatibility;
- `target` and `effectReceiver` default to the selected target character;
- `trainer`, `assistant`, `currentTrainer`, and `previousTrainer` can be bound by adapters;
- role-targeted conditions/effects are available for new focused migrations;
- command content should not be broadly rewritten to roles until assistant/player-side parity cases are covered.

## Design Constraint

Do not add broad command migration until the command family has all required phases either implemented or explicitly marked as unsupported with validation coverage.
