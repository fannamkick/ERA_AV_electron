import type { Effect } from '../../core/effects';
import { assertKnownEquipmentKey, isEquipmentActive } from '../equipment';
import type {
  TrainingCommandDefinition,
  TrainingCommandRuntimeContext,
  TrainingPassiveEffectHook,
  TrainingPassiveHookPhase,
} from './trainingTypes';

export interface PassiveEquipmentHookDefinition {
  readonly id: string;
  readonly equipmentKey: string;
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

export function definePassiveEquipmentHook(
  definition: PassiveEquipmentHookDefinition,
): TrainingPassiveEffectHook {
  if (!definition.id.trim()) {
    throw new Error('Passive equipment hook id is required.');
  }

  assertKnownEquipmentKey(definition.equipmentKey, `Passive equipment hook ${definition.id}`);

  return (context, command, phase) => {
    if (phase !== definition.phase) return [];
    if (!isEquipmentActive(context, definition.equipmentKey)) return [];
    if (definition.when && !definition.when(context, command)) return [];
    return definition.effects(context, command);
  };
}
