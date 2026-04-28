import { multiplySource, type Effect } from '../../core/effects';
import { hasStatKey } from '../stats';
import { definePassiveTrainingModeHook } from './passiveTrainingModeHooks';
import type {
  TrainingCommandDefinition,
  TrainingCommandRuntimeContext,
  TrainingPassiveEffectHook,
  TrainingPassiveHookPhase,
} from './trainingTypes';
import type { TrainingModeKey } from './trainingModes';

export interface SourceMultiplierDefinition {
  readonly sourceKey: string;
  readonly factor: number;
  readonly legacySourceIndex?: number;
  readonly notes?: string;
}

export interface PassiveTrainingModeProcessorDefinition {
  readonly id: string;
  readonly mode: TrainingModeKey;
  readonly phase?: TrainingPassiveHookPhase;
  readonly sourceMultipliers?: readonly SourceMultiplierDefinition[];
  readonly when?: (
    context: TrainingCommandRuntimeContext,
    command: TrainingCommandDefinition,
  ) => boolean;
  readonly effects?: (
    context: TrainingCommandRuntimeContext,
    command: TrainingCommandDefinition,
  ) => readonly Effect[];
}

export const STANDARD_TRAINING_MODE_SOURCE_MULTIPLIERS = {
  bestiality: [
    {
      sourceKey: 'shame',
      factor: 2,
      legacySourceIndex: 11,
      notes: 'Legacy SourceModifier multiplies SOURCE:11 by 2.00 while TEQUIP:89 is active; the buffer is named for parity but is not converted by current SourceCheck.',
    },
    {
      sourceKey: 'semen',
      factor: 1.3,
      legacySourceIndex: 12,
      notes: 'Legacy SourceModifier multiplies SOURCE:12 by 1.30 while TEQUIP:89 is active.',
    },
    {
      sourceKey: 'aversion',
      factor: 1.5,
      legacySourceIndex: 14,
      notes: 'Legacy SourceModifier multiplies SOURCE:14 by 1.50 while TEQUIP:89 is active; the buffer is named for parity but is not converted by current SourceCheck.',
    },
  ],
  tentacle: [
    {
      sourceKey: 'pleasureC',
      factor: 1.5,
      legacySourceIndex: 0,
      notes: 'Legacy SourceModifier multiplies SOURCE:0 by 1.50 while TEQUIP:90 is active.',
    },
    {
      sourceKey: 'pleasureV',
      factor: 1.5,
      legacySourceIndex: 1,
      notes: 'Legacy SourceModifier multiplies SOURCE:1 by 1.50 while TEQUIP:90 is active.',
    },
    {
      sourceKey: 'pleasureA',
      factor: 1.5,
      legacySourceIndex: 2,
      notes: 'Legacy SourceModifier multiplies SOURCE:2 by 1.50 while TEQUIP:90 is active.',
    },
    {
      sourceKey: 'aversion',
      factor: 1.3,
      legacySourceIndex: 14,
      notes: 'Legacy SourceModifier multiplies SOURCE:14 by 1.30 while TEQUIP:90 is active; the buffer is named for parity but is not converted by current SourceCheck.',
    },
  ],
  slime: [
    {
      sourceKey: 'pleasureC',
      factor: 1.3,
      legacySourceIndex: 0,
      notes: 'Legacy SourceModifier multiplies SOURCE:0 by 1.30 while TEQUIP:150 is active.',
    },
    {
      sourceKey: 'pleasureV',
      factor: 1.3,
      legacySourceIndex: 1,
      notes: 'Legacy SourceModifier multiplies SOURCE:1 by 1.30 while TEQUIP:150 is active.',
    },
    {
      sourceKey: 'pleasureA',
      factor: 1.3,
      legacySourceIndex: 2,
      notes: 'Legacy SourceModifier multiplies SOURCE:2 by 1.30 while TEQUIP:150 is active.',
    },
    {
      sourceKey: 'arousal',
      factor: 1.3,
      legacySourceIndex: 3,
      notes: 'Legacy SourceModifier multiplies SOURCE:3 by 1.30 while TEQUIP:150 is active.',
    },
    {
      sourceKey: 'obedience',
      factor: 2,
      legacySourceIndex: 6,
      notes: 'Legacy SourceModifier multiplies SOURCE:6 by 2.00 while TEQUIP:150 is active.',
    },
  ],
} as const satisfies Record<TrainingModeKey, readonly SourceMultiplierDefinition[]>;

export function definePassiveTrainingModeProcessor(
  definition: PassiveTrainingModeProcessorDefinition,
): TrainingPassiveEffectHook {
  if (!definition.id.trim()) {
    throw new Error('Passive training mode processor id is required.');
  }

  validateSourceMultipliers(definition.id, definition.sourceMultipliers ?? []);

  return definePassiveTrainingModeHook({
    id: definition.id,
    mode: definition.mode,
    phase: definition.phase ?? 'beforeSourceConversion',
    when: definition.when,
    effects: (context, command) => [
      ...sourceMultiplierEffects(definition.sourceMultipliers ?? []),
      ...(definition.effects?.(context, command) ?? []),
    ],
  });
}

export function createStandardTrainingModePassiveProcessors(): TrainingPassiveEffectHook[] {
  return [
    definePassiveTrainingModeProcessor({
      id: 'training.mode.bestiality.sourceMultipliers',
      mode: 'bestiality',
      sourceMultipliers: STANDARD_TRAINING_MODE_SOURCE_MULTIPLIERS.bestiality,
    }),
    definePassiveTrainingModeProcessor({
      id: 'training.mode.tentacle.sourceMultipliers',
      mode: 'tentacle',
      sourceMultipliers: STANDARD_TRAINING_MODE_SOURCE_MULTIPLIERS.tentacle,
    }),
    definePassiveTrainingModeProcessor({
      id: 'training.mode.slime.sourceMultipliers',
      mode: 'slime',
      sourceMultipliers: STANDARD_TRAINING_MODE_SOURCE_MULTIPLIERS.slime,
    }),
  ];
}

function sourceMultiplierEffects(multipliers: readonly SourceMultiplierDefinition[]): Effect[] {
  return multipliers.map((multiplier) => multiplySource(multiplier.sourceKey, multiplier.factor));
}

function validateSourceMultipliers(
  owner: string,
  multipliers: readonly SourceMultiplierDefinition[],
): void {
  for (const multiplier of multipliers) {
    if (!hasStatKey('source', multiplier.sourceKey)) {
      throw new Error(`${owner} references unknown source key: ${multiplier.sourceKey}`);
    }

    if (!Number.isFinite(multiplier.factor)) {
      throw new Error(`${owner} source multiplier must be finite: ${multiplier.sourceKey}`);
    }
  }
}
