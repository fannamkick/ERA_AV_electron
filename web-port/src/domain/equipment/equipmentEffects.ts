import { compareStat, missingEquipment, type AnyCondition } from '../../core/conditions';
import {
  numericStat,
  type Effect,
  type EffectApplierContext,
  type EffectHandlerRegistry,
} from '../../core/effects';
import { hasStatKey } from '../stats';
import type { DomainRuntimeContext } from '../shared';

export function assertKnownEquipmentKey(key: string, owner: string): void {
  if (!hasStatKey('equipment', key)) {
    throw new Error(`${owner} references unknown equipment key: ${key}`);
  }
}

export function assertKnownEquipmentKeys(keys: readonly string[], owner: string): void {
  for (const key of keys) {
    assertKnownEquipmentKey(key, owner);
  }
}

export function isEquipmentActive(context: DomainRuntimeContext, key: string): boolean {
  return context.getNumericStat('equipment', key) !== 0;
}

export function setEquipmentEffect(key: string, enabled: boolean): Effect {
  return numericStat('equipment', key, enabled ? 1 : 0, 'set');
}

export function clearEquipmentEffects(keys: readonly string[]): readonly Effect[] {
  return keys.map((key) => setEquipmentEffect(key, false));
}

export function requiresNoEquipment(
  equipmentKey: string,
  reason = `Command cannot be used while ${equipmentKey} equipment is active.`,
): AnyCondition {
  return missingEquipment(equipmentKey, reason);
}

export function requiresNoEquipments(equipmentKeys: readonly string[]): AnyCondition[] {
  return equipmentKeys.map((equipmentKey) => requiresNoEquipment(equipmentKey));
}

export function equipmentInactiveCondition(
  equipmentKey: string,
): AnyCondition {
  return compareStat('equipment', equipmentKey, 'eq', 0);
}

export const equipmentEffectHandlers: EffectHandlerRegistry = {
  'equipment.toggle': (effect, context: EffectApplierContext) => {
    if (!context.applyEquipmentToggle) {
      return {
        applied: false,
        warning: `Equipment toggle effect ignored because applyEquipmentToggle is not available: ${effect.key}`,
      };
    }

    context.applyEquipmentToggle(effect.key, effect.enabled, effect.conflicts, effect.target);
    return { applied: true };
  },
};
