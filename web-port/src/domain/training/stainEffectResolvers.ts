import type { Effect } from '../../core/effects';
import {
  assistantAvoidsDirtyMouthContact,
  CONTACT_STAIN_MASKS,
  mergeContactStains,
  setContactStainBits,
} from '../contact';
import { isTrainingModeActive } from './trainingModes';
import type { TrainingCommandRuntimeContext, TrainingEffectResolver } from './trainingTypes';

const ASSISTANT_PLAY_TAG = 'training.assistantPlay';

function stat(
  context: TrainingCommandRuntimeContext,
  statName: string,
  key: string,
  role?: string,
): number {
  const targetId = role ? context.resolveTargetId?.(role) : undefined;
  return context.getNumericStat(statName, key, targetId);
}

function hasStat(context: TrainingCommandRuntimeContext, statName: string, key: string, role?: string): boolean {
  return stat(context, statName, key, role) !== 0;
}

function isAssistantPlay(context: TrainingCommandRuntimeContext): boolean {
  return context.hasTag?.(ASSISTANT_PLAY_TAG) ?? false;
}

export function comf0StainPostEffects(): TrainingEffectResolver {
  return (context) => {
    const effects: Effect[] = [];
    const mouthContactAvoided =
      hasStat(context, 'equipment', 'gag') ||
      stat(context, 'cflag', 'firstKissLegacy') === -1 ||
      assistantAvoidsDirtyMouthContact(context, { assistantPlay: isAssistantPlay(context) });

    if (!mouthContactAvoided) {
      effects.push(mergeContactStains(
        { part: 'mouth' },
        { part: 'mouth', role: 'trainer' },
      ));
    }

    if (isTrainingModeActive(context, 'bestiality')) {
      return effects;
    }

    if (isTrainingModeActive(context, 'tentacle')) {
      effects.push(
        setContactStainBits('hand', CONTACT_STAIN_MASKS.tentacleDirt),
        setContactStainBits('breast', CONTACT_STAIN_MASKS.tentacleDirt),
      );
      return effects;
    }

    effects.push(
      mergeContactStains(
        { part: 'vagina' },
        { part: 'hand', role: 'trainer' },
      ),
      mergeContactStains(
        { part: 'breast' },
        { part: 'hand', role: 'trainer' },
      ),
    );
    return effects;
  };
}

export function comf1StainPostEffects(): TrainingEffectResolver {
  return (context) => {
    if (isTrainingModeActive(context, 'bestiality')) return [];
    return [
      mergeContactStains(
        { part: 'vagina' },
        { part: 'mouth', role: 'trainer' },
      ),
    ];
  };
}

export function comf6StainPostEffects(): TrainingEffectResolver {
  return (context) => {
    if (isTrainingModeActive(context, 'bestiality')) return [];
    return [
      mergeContactStains(
        { part: 'mouth' },
        { part: 'mouth', role: 'trainer' },
      ),
    ];
  };
}
