import { type Effect } from '../../core/effects';
import type {
  TrainingCommandDefinition,
  TrainingCommandRuntimeContext,
  TrainingPassiveEffectHook,
  TrainingPassiveHookPhase,
} from './trainingTypes';
import {
  getTrainingModeDefinition,
  isTrainingModeActive,
  type TrainingModeKey,
} from './trainingModes';

export interface PassiveTrainingModeHookDefinition {
  readonly id: string;
  readonly mode: TrainingModeKey;
  readonly phase: TrainingPassiveHookPhase;
  readonly when?: (
    context: TrainingCommandRuntimeContext,
    command: TrainingCommandDefinition,
  ) => boolean;
  readonly effects: (
    context: TrainingCommandRuntimeContext,
    command: TrainingCommandDefinition,
  ) => readonly Effect[];
}

export function definePassiveTrainingModeHook(
  definition: PassiveTrainingModeHookDefinition,
): TrainingPassiveEffectHook {
  if (!definition.id.trim()) {
    throw new Error('Passive training mode hook id is required.');
  }

  getTrainingModeDefinition(definition.mode);

  return (context, command, phase) => {
    if (phase !== definition.phase) return [];
    if (!isTrainingModeActive(context, definition.mode)) return [];
    if (definition.when && !definition.when(context, command)) return [];
    return definition.effects(context, command);
  };
}
