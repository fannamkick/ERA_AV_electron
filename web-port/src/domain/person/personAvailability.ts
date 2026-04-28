import {
  all,
  any,
  bitAny,
  bitNone,
  compareStat,
  missingTalent,
  not,
  type AnyCondition,
} from '../../core/conditions';
import { requiresNoEquipment, requiresNoEquipments } from '../equipment';
export { requiresNoEquipment, requiresNoEquipments } from '../equipment';

export function requiresFemaleTarget(reason = 'Command cannot target a male character.'): AnyCondition {
  return missingTalent('male', reason);
}

export function requiresLowerClothingRemoved(
  reason = 'Command requires lower clothing to be removed.',
): AnyCondition {
  return bitNone('cflag', 'clothing', 17, reason);
}

export function requiresLowerExposed(options: {
  readonly reason?: string;
  readonly blockedStockingState?: { readonly type: number; readonly state: number };
  readonly blockedSpecialLowerItems?: readonly number[];
  readonly specialLowerMask?: number;
} = {}): AnyCondition[] {
  const conditions: AnyCondition[] = [
    requiresLowerClothingRemoved(options.reason),
  ];

  if (options.blockedStockingState) {
    conditions.push(blocksStockingState(
      options.blockedStockingState.type,
      options.blockedStockingState.state,
    ));
  }

  if (options.blockedSpecialLowerItems && options.blockedSpecialLowerItems.length > 0) {
    conditions.push(blocksSpecialLowerClothing(
      options.blockedSpecialLowerItems,
      options.specialLowerMask ?? 64,
    ));
  }

  return conditions;
}

export function blocksStockingState(
  stockingType: number,
  stockingState: number,
  reason = 'Command cannot be used with the blocked stocking state.',
): AnyCondition {
  return not(
    all([
      compareStat('cflag', 'stockingType', 'eq', stockingType),
      compareStat('cflag', 'stockingState', 'eq', stockingState),
    ]),
    reason,
  );
}

export function blocksSpecialLowerClothing(
  lowerItemIds: readonly number[],
  clothingMask: number,
  reason = 'Command cannot be used with blocked special lower clothing.',
): AnyCondition {
  return not(
    all([
      any(lowerItemIds.map((itemId) => compareStat('cflag', 'lowerItem', 'eq', itemId))),
      bitAny('cflag', 'clothing', clothingMask),
    ]),
    reason,
  );
}

export function blocksWhenEquipped(equipmentKeys: readonly string[]): AnyCondition[] {
  return requiresNoEquipments(equipmentKeys);
}

export function toggleableEquipmentCommand(
  equipmentKey: string,
  normalConditions: readonly AnyCondition[],
  reason = `Command can run because ${equipmentKey} is already equipped or normal requirements pass.`,
): AnyCondition {
  return any([
    compareStat('equipment', equipmentKey, 'gte', 1),
    all(normalConditions),
  ], reason);
}
