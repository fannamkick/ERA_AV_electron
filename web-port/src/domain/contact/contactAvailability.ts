import {
  all,
  bitAny,
  compareStat,
  hasTag,
  missingTalent,
  not,
  type AnyCondition,
} from '../../core/conditions';
import { requiresNoEquipment } from '../equipment';
import { CONTACT_STAIN_MASKS } from './contactEffects';

const ASSISTANT_PLAY_TAG = 'training.assistantPlay';

export function requiresMouthAccessible(reason = 'Command requires the mouth to be accessible.'): AnyCondition[] {
  return [
    missingTalent('noMouthService', reason),
    requiresNoEquipment('gag', 'Command cannot be used while gag equipment is active.'),
    requiresNoEquipment('mask', 'Command cannot be used while mask equipment is active.'),
  ];
}

export function blocksAssistantDirtyMouthContact(
  reason = 'Assistant refuses dirty-mouth contact.',
): AnyCondition {
  return not(
    all([
      hasTag(ASSISTANT_PLAY_TAG),
      bitAny('stain', 'mouth', CONTACT_STAIN_MASKS.dirtyMouth),
      compareStat('ability', 'obedience', 'lte', 3, undefined, undefined, 'assistant'),
      compareStat('talent', 'sensitivityHigh', 'gte', 1, undefined, undefined, 'assistant'),
      compareStat('talent', 'filthIgnore', 'eq', 0, undefined, undefined, 'assistant'),
    ]),
    reason,
  );
}
