import {
  numericStatScoreTerm,
  palamLevelScoreTerm,
  type FormulaScoreTerm,
} from '../shared';
import type { DomainRuntimeContext } from '../shared';

export function commonOrderGateTerms(options: {
  readonly palamThresholds: readonly number[];
}): readonly FormulaScoreTerm[] {
  return [
    numericStatScoreTerm({
      id: 'comOrder.obedience',
      label: 'COM_ORDER ABL:10 obedience',
      stat: 'ability',
      key: 'obedience',
      weight: 4,
    }),
    numericStatScoreTerm({
      id: 'comOrder.masochism',
      label: 'COM_ORDER ABL:21 masochism',
      stat: 'ability',
      key: 'masochism',
      weight: 2,
    }),
    {
      id: 'comOrder.lesbian',
      label: 'COM_ORDER ABL:22 lesbian',
      when: (context) => isFemalePair(context),
      value: (context) => readStat(context, 'ability', 'lesbian') * 3,
    },
    {
      id: 'comOrder.lesbianAddiction',
      label: 'COM_ORDER ABL:33 lesbian addiction',
      when: (context) => isFemalePair(context),
      value: (context) => readStat(context, 'ability', 'lesbianAddiction') * 3,
    },
    talentTerm('comOrder.bisexual', 'COM_ORDER TALENT:81 bisexual', 'bisexual', 10, isFemalePair),
    talentTerm('comOrder.curiosityFemalePair', 'COM_ORDER TALENT:23 curiosity', 'curiosity', 7, isFemalePair),
    talentTerm('comOrder.conservativeFemalePair', 'COM_ORDER TALENT:24 conservative', 'conservative', -13, isFemalePair),
    talentTerm('comOrder.curiosity', 'COM_ORDER TALENT:23 curiosity', 'curiosity', 5, (context) => !isFemalePair(context)),
    talentTerm('comOrder.conservative', 'COM_ORDER TALENT:24 conservative', 'conservative', -10, (context) => !isFemalePair(context)),
    numericStatScoreTerm({
      id: 'comOrder.painMark',
      label: 'COM_ORDER MARK:0 pain',
      stat: 'mark',
      key: 'pain',
      weight: 5,
    }),
    {
      id: 'comOrder.submissionMark',
      label: 'COM_ORDER MARK:2 submission',
      value: (context) => readStat(context, 'mark', 'submission') * 3 * prideScale(context),
    },
    {
      id: 'comOrder.resistanceMark',
      label: 'COM_ORDER MARK:3 resistance',
      value: (context) => readStat(context, 'mark', 'resistance') * -2 * prideScale(context),
    },
    palamLevelScoreTerm({
      id: 'comOrder.submissionPalam',
      label: 'COM_ORDER PALAM:4 submission',
      key: 'submission',
      thresholds: options.palamThresholds,
      weight: 3,
    }),
    palamLevelScoreTerm({
      id: 'comOrder.fearPalam',
      label: 'COM_ORDER PALAM:10 fear',
      key: 'fear',
      thresholds: options.palamThresholds,
      weight: 3,
    }),
    talentTerm('comOrder.rebellious', 'COM_ORDER TALENT:11 rebellious', 'rebellious', -5),
    talentTerm('comOrder.tough', 'COM_ORDER TALENT:12 tough', 'tough', -5),
    {
      id: 'comOrder.menstrual',
      label: 'COM_ORDER CFLAG:644 menstrual',
      when: (context) => readStat(context, 'cflag', 'menstrualStatus') === 3,
      value: () => -10,
    },
    talentTerm('comOrder.honest', 'COM_ORDER TALENT:13 honest', 'honest', 5),
    talentTerm('comOrder.prideHighPenalty', 'COM_ORDER TALENT:15 pride high', 'prideHigh', -15),
    talentTerm('comOrder.prideLowBonus', 'COM_ORDER TALENT:17 pride low', 'prideLow', 5),
    talentTerm('comOrder.showOff', 'COM_ORDER TALENT:28 show-off', 'showOff', 2),
    talentTerm('comOrder.suppressed', 'COM_ORDER TALENT:32 suppressed', 'suppressed', -10),
    talentTerm('comOrder.resisting', 'COM_ORDER TALENT:34 resisting', 'resisting', -10),
    talentTerm('comOrder.weakPoint', 'COM_ORDER TALENT:37 weak point', 'weakPoint', 12),
    talentTerm('comOrder.instantFall', 'COM_ORDER TALENT:73 instant fall', 'instantFall', 10),
    talentTerm('comOrder.lewd', 'COM_ORDER TALENT:76 lewd', 'lewd', 5),
    talentTerm('comOrder.sadist', 'COM_ORDER TALENT:86 sadist', 'sadist', 8),
    talentTerm('comOrder.specialAppeal', 'COM_ORDER TALENT:505 special appeal', 'specialAppeal', 10),
    talentTerm('comOrder.trainerCharm', 'COM_ORDER TALENT:PLAYER:91 charm', 'charm', 6, undefined, 'trainer'),
    talentTerm('comOrder.trainerMysteriousCharm', 'COM_ORDER TALENT:PLAYER:92 mysterious charm', 'mysteriousCharm', 6, undefined, 'trainer'),
    talentTerm('comOrder.trainerIntimidating', 'COM_ORDER TALENT:PLAYER:93 intimidating', 'intimidating', 6, undefined, 'trainer'),
    talentTerm('comOrder.trainerSadist', 'COM_ORDER TALENT:PLAYER:83 sadist', 'sadistLegacy', 3, undefined, 'trainer'),
    talentTerm('comOrder.trainerRubber', 'COM_ORDER TALENT:PLAYER:118 rubber', 'rubber', 1, undefined, 'trainer'),
    talentTerm('comOrder.trainerTeacher', 'COM_ORDER TALENT:PLAYER:201 teacher', 'teacher', 2, undefined, 'trainer'),
    {
      id: 'comOrder.relation',
      label: 'COM_ORDER RELATION:NO:PLAYER',
      value: (context) => relationScore(context),
    },
    {
      id: 'comOrder.zeroStamina',
      label: 'COM_ORDER BASE:1 stamina zero',
      when: (context) => readStat(context, 'base', 'stamina') <= 0,
      value: () => 5,
    },
  ];
}

export function comf6OrderGateTerms(options: {
  readonly palamThresholds: readonly number[];
  readonly dirtyPenalty?: (context: DomainRuntimeContext) => number;
}): readonly FormulaScoreTerm[] {
  return [
    ...commonOrderGateTerms(options),
    numericStatScoreTerm({
      id: 'comf6.desire',
      label: 'COMF6 ABL:11 desire',
      stat: 'ability',
      key: 'desire',
      weight: 1,
    }),
    numericStatScoreTerm({
      id: 'comf6.mouthService',
      label: 'COMF6 ABL:16 mouth service',
      stat: 'ability',
      key: 'mouthService',
      weight: 4,
    }),
    numericStatScoreTerm({
      id: 'comf6.pleasureMark',
      label: 'COMF6 MARK:1 pleasure',
      stat: 'mark',
      key: 'pleasure',
      weight: 2,
    }),
    palamLevelScoreTerm({
      id: 'comf6.lustPalam',
      label: 'COMF6 PALAM:5 lust',
      key: 'lust',
      thresholds: options.palamThresholds,
      weight: 1,
    }),
    talentTerm('comf6.shy', 'COMF6 TALENT:35 shy', 'shy', -1),
    talentTerm('comf6.filthInsensitive', 'COMF6 TALENT:61 filth insensitive', 'sensitivityLow', 1),
    talentTerm('comf6.filthSensitive', 'COMF6 TALENT:62 filth sensitive', 'sensitivityHigh', -1),
    talentTerm('comf6.devoted', 'COMF6 TALENT:63 devoted', 'devoted', 6),
    talentTerm('comf6.pleasureDeny', 'COMF6 TALENT:71 pleasure deny', 'pleasureDeny', -1),
    talentTerm('comf6.love', 'COMF6 TALENT:85 love', 'love', 5, (context) => !isAssistantPlay(context)),
    {
      id: 'comf6.bestialityPenalty',
      label: 'COMF6 TEQUIP:89 bestiality',
      when: (context) =>
        readStat(context, 'equipment', 'bestialityPlay') > 0 &&
        readStat(context, 'talent', 'bestialityTolerant') === 0,
      value: () => -15,
    },
    {
      id: 'comf6.dirtyMouthPenalty',
      label: 'COMF6 dirty-mouth penalty',
      when: (context) => (options.dirtyPenalty?.(context) ?? 0) > 0,
      value: (context) => -(options.dirtyPenalty?.(context) ?? 0),
    },
  ];
}

function readStat(
  context: DomainRuntimeContext,
  stat: string,
  key: string,
  role?: string,
): number {
  const targetId = role ? context.resolveTargetId?.(role) : undefined;
  return context.getNumericStat(stat, key, targetId);
}

function prideScale(context: DomainRuntimeContext): number {
  if (context.getNumericStat('talent', 'prideHigh') > 0) return 4;
  if (context.getNumericStat('talent', 'prideLow') > 0) return 1;
  return 2;
}

function talentTerm(
  id: string,
  label: string,
  key: string,
  score: number,
  when?: (context: DomainRuntimeContext) => boolean,
  role?: string,
): FormulaScoreTerm {
  return {
    id,
    label,
    when: (context) => readStat(context, 'talent', key, role) > 0 && (when?.(context) ?? true),
    value: () => score,
  };
}

function isAssistantPlay(context: DomainRuntimeContext): boolean {
  return context.hasTag?.('training.assistantPlay') ?? false;
}

function isFemalePair(context: DomainRuntimeContext): boolean {
  return readStat(context, 'talent', 'male') === 0 && readStat(context, 'talent', 'male', 'trainer') === 0;
}

function relationScore(context: DomainRuntimeContext): number {
  const targetId = context.resolveTargetId?.('target');
  const trainerId = context.resolveTargetId?.('trainer');
  if (targetId === undefined || trainerId === undefined) return 0;

  const relation = context.getRelation?.(targetId, trainerId) ?? readStat(context, 'relation', String(trainerId));
  if (relation <= 0) return 0;
  if (relation < 30) return -10;
  if (relation < 70) return -6;
  if (relation < 100) return -3;
  if (relation < 130) return 3;
  if (relation < 170) return 6;
  return 10;
}
