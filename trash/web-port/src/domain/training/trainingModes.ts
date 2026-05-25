import { all, compareStat, missingTag, type AnyCondition } from '../../core/conditions';
import { addTag, removeTag, type Effect } from '../../core/effects';
import {
  assertKnownEquipmentKey,
  assertKnownEquipmentKeys,
  clearEquipmentEffects,
  setEquipmentEffect,
} from '../equipment';
import type { TrainingCommandRuntimeContext, TrainingEffectResolver } from './trainingTypes';

export type TrainingModeKey = 'bestiality' | 'tentacle' | 'slime';

export interface TrainingModeDefinition {
  readonly key: TrainingModeKey;
  readonly tag: string;
  readonly legacyEquipmentKey: string;
  readonly legacyOriginal: string;
  readonly cleanupEquipmentKeys?: readonly string[];
}

export const TRAINING_MODE_DEFINITIONS = {
  bestiality: {
    key: 'bestiality',
    tag: 'training.mode.bestiality',
    legacyEquipmentKey: 'bestialityPlay',
    legacyOriginal: 'TEQUIP:89',
  },
  tentacle: {
    key: 'tentacle',
    tag: 'training.mode.tentacle',
    legacyEquipmentKey: 'tentacleTraining',
    legacyOriginal: 'TEQUIP:90',
    cleanupEquipmentKeys: [
      'vibrator',
      'analVibrator',
      'clitCap',
      'nippleCap',
      'milker',
      'onahole',
      'rope',
      'enemaPlug',
      'tentacleMouth',
    ],
  },
  slime: {
    key: 'slime',
    tag: 'training.mode.slime',
    legacyEquipmentKey: 'slime',
    legacyOriginal: 'TEQUIP:150',
    cleanupEquipmentKeys: [
      'slimeVaginalEntry',
      'slimeAnalEntry',
      'slimeMouth',
    ],
  },
} as const satisfies Record<TrainingModeKey, TrainingModeDefinition>;

export function getTrainingModeDefinition(mode: TrainingModeKey): TrainingModeDefinition {
  return TRAINING_MODE_DEFINITIONS[mode];
}

export function isTrainingModeActive(
  context: TrainingCommandRuntimeContext,
  mode: TrainingModeKey,
): boolean {
  const definition = getTrainingModeDefinition(mode);
  return (
    (context.hasTag?.(definition.tag) ?? false) ||
    context.getNumericStat('equipment', definition.legacyEquipmentKey) !== 0
  );
}

export function requiresNoTrainingMode(
  mode: TrainingModeKey,
  reason = `Command cannot be used while ${mode} training mode is active.`,
): AnyCondition {
  const definition = getTrainingModeDefinition(mode);
  return all([
    missingTag(definition.tag),
    compareStat('equipment', definition.legacyEquipmentKey, 'eq', 0),
  ], reason);
}

export function requiresNoTrainingModes(modes: readonly TrainingModeKey[]): AnyCondition[] {
  return modes.map((mode) => requiresNoTrainingMode(mode));
}

export function setTrainingModeEffects(
  mode: TrainingModeKey,
  enabled: boolean,
): readonly Effect[] {
  const definition = getTrainingModeDefinition(mode);
  const effects: Effect[] = [
    enabled ? addTag(definition.tag) : removeTag(definition.tag),
    setEquipmentEffect(definition.legacyEquipmentKey, enabled),
  ];

  if (!enabled) {
    effects.push(...clearEquipmentEffects(definition.cleanupEquipmentKeys ?? []));
  }

  return effects;
}

export function defineTrainingModeToggle(options: {
  readonly mode: TrainingModeKey;
  readonly enabled?: boolean;
  readonly conflicts?: readonly TrainingModeKey[];
}): TrainingEffectResolver {
  const definition = getTrainingModeDefinition(options.mode);
  assertKnownEquipmentKey(definition.legacyEquipmentKey, `Training mode ${options.mode}`);

  for (const conflict of options.conflicts ?? []) {
    if (conflict === options.mode) {
      throw new Error(`Training mode ${options.mode} cannot conflict with itself.`);
    }

    const conflictDefinition = getTrainingModeDefinition(conflict);
    assertKnownEquipmentKey(conflictDefinition.legacyEquipmentKey, `Training mode ${conflict}`);
    assertKnownEquipmentKeys(conflictDefinition.cleanupEquipmentKeys ?? [], `Training mode ${conflict}`);
  }

  assertKnownEquipmentKeys(definition.cleanupEquipmentKeys ?? [], `Training mode ${options.mode}`);

  return (context) => {
    const nextEnabled = options.enabled ?? !isTrainingModeActive(context, options.mode);
    const effects: Effect[] = [...setTrainingModeEffects(options.mode, nextEnabled)];

    if (nextEnabled) {
      for (const conflict of options.conflicts ?? []) {
        effects.push(...setTrainingModeEffects(conflict, false));
      }
    }

    return effects;
  };
}
