import { numericStat } from '../../core/effects';
import {
  kissFirstContactEffects,
  trainerFirstContactEffects,
} from '../contact';
import {
  affectionExperienceEffects,
  sameSexExperienceEffects,
} from '../person';
import type { TrainingCommandRuntimeContext, TrainingEffectResolver } from './trainingTypes';

const ASSISTANT_PLAY_TAG = 'training.assistantPlay';

function isAssistantPlay(context: TrainingCommandRuntimeContext): boolean {
  return context.hasTag?.(ASSISTANT_PLAY_TAG) ?? false;
}

export function comf0ExperiencePostEffects(): TrainingEffectResolver {
  return (context) => [
    ...sameSexExperienceEffects(context, 5, { allowMalePair: true }),
    ...affectionExperienceEffects(context, 2, { assistantPlay: isAssistantPlay(context) }),
  ];
}

export function comf1ExperiencePostEffects(): TrainingEffectResolver {
  return (context) => [
    ...sameSexExperienceEffects(context, 3, { allowMalePair: false }),
    ...affectionExperienceEffects(context, 1, { assistantPlay: isAssistantPlay(context) }),
    ...trainerFirstContactEffects(context),
  ];
}

export function comf6ExperiencePostEffects(): TrainingEffectResolver {
  return (context) => {
    const assistantPlay = isAssistantPlay(context);
    const affectionBase = context.getNumericStat('talent', 'love') !== 0 && !assistantPlay ? 3 : 1;
    return [
      ...sameSexExperienceEffects(context, 3, { allowMalePair: true }),
      ...affectionExperienceEffects(context, affectionBase, { assistantPlay }),
      ...kissFirstContactEffects(context),
      numericStat('tflag', 'sexualContact', 1, 'set'),
      ...(!assistantPlay ? [numericStat('tflag', 'loveContactCount', 1, 'add')] : []),
    ];
  };
}
