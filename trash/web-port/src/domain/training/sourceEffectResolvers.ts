import type { TrainingCommandRuntimeContext, TrainingEffectResolver } from './trainingTypes';
import { numericStat } from '../../core/effects';
import { assistantAvoidsDirtyMouthContact } from '../contact';
import {
  applySourceModifiers,
  defineSourceModifier,
  sourceEffectsFromValues,
  type SourceModifier,
  type SourceValues,
} from './sourceModifierPipeline';

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

function tableValue(context: TrainingCommandRuntimeContext, abilityKey: string, values: readonly number[]): number {
  const level = Math.trunc(stat(context, 'ability', abilityKey));
  const index = Math.max(0, Math.min(level, values.length - 1));
  return values[index];
}

function tableValueForRole(
  context: TrainingCommandRuntimeContext,
  abilityKey: string,
  values: readonly number[],
  role?: string,
): number {
  const level = Math.trunc(stat(context, 'ability', abilityKey, role));
  const index = Math.max(0, Math.min(level, values.length - 1));
  return values[index];
}

function comf6DirtyMouthPenalty(context: TrainingCommandRuntimeContext): number {
  const trainerMouthStain = stat(context, 'stain', 'mouth', 'trainer');
  let dirt = 0;
  if (trainerMouthStain & 1) dirt += 1;
  if (trainerMouthStain & 4) dirt += 3;
  if (trainerMouthStain & 8) dirt += 7;
  if (trainerMouthStain & 16) dirt += 1;
  if (trainerMouthStain & 32) dirt += 3;
  if (hasStat(context, 'equipment', 'bestialityPlay')) dirt = 7;
  if (hasStat(context, 'talent', 'sensitivityLow')) dirt /= 3;
  if (hasStat(context, 'talent', 'sensitivityHigh')) dirt *= 2;
  return dirt / 2;
}

const commonSourceModifiers: readonly SourceModifier[] = [
  defineSourceModifier({
    id: 'common.sensitivityLow',
    when: (context, source) => hasStat(context, 'talent', 'sensitivityLow') && source.lust !== undefined,
    apply: (_context, source) => ({ ...source, lust: (source.lust ?? 0) / 4 }),
  }),
  defineSourceModifier({
    id: 'common.sensitivityHigh',
    when: (context, source) => hasStat(context, 'talent', 'sensitivityHigh') && source.lust !== undefined,
    apply: (_context, source) => ({ ...source, lust: (source.lust ?? 0) * 3 }),
  }),
  defineSourceModifier({
    id: 'common.prideHigh',
    when: (context, source) => hasStat(context, 'talent', 'prideHigh') && source.lust !== undefined,
    apply: (_context, source) => ({ ...source, lust: (source.lust ?? 0) * 2 }),
  }),
  defineSourceModifier({
    id: 'common.loveNotAssistant',
    when: (context) => hasStat(context, 'talent', 'love') && !isAssistantPlay(context),
    apply: (_context, source) => ({
      ...source,
      arousal: source.arousal !== undefined ? source.arousal * 2 : source.arousal,
      lust: source.lust !== undefined ? source.lust / 10 : source.lust,
    }),
  }),
];

export function comf0SourceEffects(): TrainingEffectResolver {
  return (context) => {
    const reducedByGagOrFaint =
      hasStat(context, 'equipment', 'gag') || stat(context, 'cflag', 'firstKissLegacy') === -1;
    const reducedByAssistantDirtyMouth = assistantAvoidsDirtyMouthContact(context, {
      assistantPlay: isAssistantPlay(context),
    });

    const cPleasure = tableValue(context, 'sensitivityC', [20, 100, 500, 1200, 2000, 2800]);
    const bPleasure = tableValue(context, 'sensitivityB', [15, 50, 300, 700, 1100, 1600]);
    const arousal =
      tableValue(context, 'sensitivityC', [25, 50, 80, 100, 115, 125]) +
      tableValue(context, 'sensitivityB', [25, 50, 80, 100, 115, 125]);

    const source: SourceValues = {
      pleasureC: cPleasure,
      pleasureB: bPleasure,
      arousal,
      submission: 60,
      comfort: 30,
      semen: 100,
    };

    const modifiers: SourceModifier[] = [
      defineSourceModifier({
        id: 'comf0.gagOrFaintReduction',
        when: () => reducedByGagOrFaint || reducedByAssistantDirtyMouth,
        apply: (_context, current) => ({
          ...current,
          pleasureC: cPleasure / 2,
          pleasureB: bPleasure / 2,
          arousal: arousal / 4,
          comfort: 0,
          fear: current.fear !== undefined ? current.fear / 2 : current.fear,
        }),
      }),
      ...(!reducedByGagOrFaint && !reducedByAssistantDirtyMouth ? commonSourceModifiers : []),
      defineSourceModifier({
        id: 'comf0.trainerMouthStainComfort',
        when: (currentContext, current) =>
          !reducedByGagOrFaint &&
          !reducedByAssistantDirtyMouth &&
          (current.comfort ?? 0) !== 0 &&
          hasStat(currentContext, 'stain', 'mouth', 'trainer'),
        apply: (_context, current) => ({
          ...current,
          comfort: ((current.comfort ?? 0) * 3) / 2,
        }),
      }),
      defineSourceModifier({
        id: 'comf0.vibratorCModifier',
        when: (currentContext) => hasStat(currentContext, 'equipment', 'vibrator'),
        apply: (_context, current) => ({
          ...current,
          pleasureC: (current.pleasureC ?? 0) * 1.5,
        }),
      }),
    ];

    return sourceEffectsFromValues(applySourceModifiers(context, source, modifiers));
  };
}

export function comf1SourceEffects(): TrainingEffectResolver {
  return (context) => {
    let pleasureC = tableValue(context, 'sensitivityC', [40, 160, 700, 1500, 2400, 3300]);
    const source: SourceValues = {
      pain: 100,
      fear: 100,
      semen: 220,
      aversion: 50,
    };

    if (hasStat(context, 'talent', 'tongueSkill', 'trainer') || hasStat(context, 'equipment', 'bestialityPlay')) {
      pleasureC *= 2;
      source.habit = pleasureC / 20;
    }

    source.pleasureC = pleasureC;

    return sourceEffectsFromValues(source);
  };
}

export function comf6SourceEffects(): TrainingEffectResolver {
  return (context) => {
    const source: SourceValues = {
      comfort: comf6DirtyMouthPenalty(context) * 20 + 10,
    };

    const mouthService = Math.trunc(stat(context, 'ability', 'mouthService'));
    const mouthServiceIndex = Math.max(0, Math.min(mouthService, 5));
    const submissionTable = [50, 150, 200, 250, 300, 350];
    const lustTable = [10, 50, 100, 180, 300, 500];
    const comfortMultipliers = [4, 2.5, 1.5, 1, 0.5, 0.1];
    source.submission = submissionTable[mouthServiceIndex];
    source.lust = lustTable[mouthServiceIndex];
    source.comfort = (source.comfort ?? 0) * comfortMultipliers[mouthServiceIndex];

    const targetTechniqueMultiplier = tableValueForRole(context, 'technique', [0.5, 0.8, 1, 1.5, 2.5, 4]);
    source.submission = (source.submission ?? 0) * targetTechniqueMultiplier;
    source.lust = (source.lust ?? 0) * targetTechniqueMultiplier;

    if (hasStat(context, 'equipment', 'bestialityPlay')) {
      const bestialityLevel = Math.max(0, Math.min(Math.trunc(stat(context, 'ability', 'bestiality')), 5));
      const comfortMultipliersByBestiality = [2, 1, 0.8, 0.5, 0.3, 0.1];
      source.comfort = (source.comfort ?? 0) * comfortMultipliersByBestiality[bestialityLevel];

      if (bestialityLevel === 3) source.arousal = 100;
      if (bestialityLevel === 4) {
        source.arousal = 300;
        source.fear = 100;
      }
      if (bestialityLevel >= 5) {
        source.arousal = 800;
        source.fear = 200;
      }

      const effects = sourceEffectsFromValues(source);
      return bestialityLevel >= 2
        ? [...effects, numericStat('tflag', 'sexualContact', 1, 'set')]
        : effects;
    }

    const trainerTechniqueLevel = Math.max(0, Math.min(Math.trunc(stat(context, 'ability', 'technique', 'trainer')), 5));
    const arousalTable = [100, 150, 200, 300, 500, 800];
    const fearTable = [0, 0, 0, 50, 100, 200];
    source.arousal = arousalTable[trainerTechniqueLevel];
    source.fear = fearTable[trainerTechniqueLevel];

    if (hasStat(context, 'talent', 'love')) {
      source.arousal = (source.arousal ?? 0) * 2;
    }

    return sourceEffectsFromValues(source);
  };
}

export { comf6DirtyMouthPenalty };
