import { addExp, type Effect } from '../../core/effects';
import { readNumericStat, type DomainRuntimeContext } from '../shared';

export function sameSexExperienceEffects(
  context: DomainRuntimeContext,
  amount: number,
  options: { readonly allowMalePair: boolean },
): Effect[] {
  const targetIsMale = readNumericStat(context, 'talent', 'male') !== 0;
  const trainerIsMale = readNumericStat(context, 'talent', 'male', 'trainer') !== 0;

  if (!targetIsMale && !trainerIsMale) {
    return [addExp('lesbianExperience', amount)];
  }

  if (options.allowMalePair && targetIsMale && trainerIsMale) {
    return [addExp('gayExperience', amount)];
  }

  return [];
}

export function affectionExperienceEffects(
  context: DomainRuntimeContext,
  amount: number,
  options: { readonly assistantPlay: boolean },
): Effect[] {
  if (options.assistantPlay) return [];
  if (readNumericStat(context, 'cflag', 'affection') < 1000) return [];
  return [addExp('affectionExperience', amount)];
}
