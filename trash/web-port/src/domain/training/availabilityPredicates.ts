import {
  blocksAssistantDirtyMouthContact,
  requiresMouthAccessible,
} from '../contact';
import type { AnyCondition } from '../../core/conditions';
import {
  blocksSpecialLowerClothing,
  blocksStockingState,
  blocksWhenEquipped,
  requiresFemaleTarget,
  requiresLowerClothingRemoved,
  requiresLowerExposed,
  requiresNoEquipment,
  requiresNoEquipments,
  toggleableEquipmentCommand,
} from '../person';
import { requiresNoTrainingMode, requiresNoTrainingModes, type TrainingModeKey } from './trainingModes';

export { requiresNoTrainingMode, requiresNoTrainingModes };
export {
  blocksAssistantDirtyMouthContact,
  blocksSpecialLowerClothing,
  blocksStockingState,
  blocksWhenEquipped,
  requiresFemaleTarget,
  requiresLowerClothingRemoved,
  requiresLowerExposed,
  requiresMouthAccessible,
  requiresNoEquipment,
  requiresNoEquipments,
  toggleableEquipmentCommand,
};

export function blocksWhenTrainingModeActive(modes: readonly TrainingModeKey[]): AnyCondition[] {
  return requiresNoTrainingModes(modes);
}
