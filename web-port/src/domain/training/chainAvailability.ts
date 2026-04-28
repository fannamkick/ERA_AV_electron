import {
  all,
  any,
  compareStat,
  hasTag,
  minStat,
  missingTag,
  missingTalent,
  not,
  type AnyCondition,
} from '../../core/conditions';
import {
  requiresFemaleTarget,
  requiresLowerExposed,
  requiresNoEquipments,
} from '../person';

const ASSISTANT_PLAY_TAG = 'training.assistantPlay';

export function comf69AvailabilityRequirements(): readonly AnyCondition[] {
  return [
    compareStat('tflag', 'fainted', 'lte', 0, 'COM69 cannot run while the target is fainted.'),
    any([
      missingTag(ASSISTANT_PLAY_TAG),
      minStat('ability', 'desire', 4, 'COM69 assistant needs desire above 3.', undefined, 'assistant'),
      minStat('ability', 'lesbian', 4, 'COM69 assistant needs lesbian interest above 3.', undefined, 'assistant'),
      minStat('talent', 'compatibilityGood', 1, 'COM69 assistant compatibility allows the chain.', undefined, 'assistant'),
    ], 'COM69 assistant chain gate failed.'),
    any([
      hasTag(ASSISTANT_PLAY_TAG),
      all([
        minStat('ability', 'obedience', 3, 'COM69 requires obedience 3 or higher.'),
        minStat('ability', 'mouthService', 3, 'COM69 requires mouth service 3 or higher.'),
      ]),
    ], 'COM69 non-assistant chain gate failed.'),
    ...requiresNoEquipments(['rope', 'bestialityPlay', 'tentacleTraining', 'slime', 'singleWoodenHorse']),
    ...requiresLowerExposed({
      reason: 'COM69 requires lower clothing to be removed.',
      blockedStockingState: { type: 6, state: 0 },
      blockedSpecialLowerItems: [69, 11],
    }),
  ];
}

export function comf128AvailabilityRequirements(): readonly AnyCondition[] {
  return penetrationChainAvailabilityRequirements({
    commandName: 'COM128',
    trainerTechnique: 3,
    targetSex: 2,
    blocksBestiality: true,
  });
}

export function comf133AvailabilityRequirements(): readonly AnyCondition[] {
  return penetrationChainAvailabilityRequirements({
    commandName: 'COM133',
    trainerTechnique: 4,
    targetSex: 3,
    blocksBestiality: false,
  });
}

function penetrationChainAvailabilityRequirements(options: {
  readonly commandName: string;
  readonly trainerTechnique: number;
  readonly targetSex: number;
  readonly blocksBestiality: boolean;
}): readonly AnyCondition[] {
  const blockedEquipments = [
    'vibrator',
    'tentacleTraining',
    'slime',
    'singleWoodenHorse',
    'mask',
    ...(options.blocksBestiality ? ['bestialityPlay'] : []),
  ];

  return [
    compareStat('flag', 'additionalCommandsDisabled', 'eq', 0, `${options.commandName} is disabled by FLAG:71.`),
    any([
      minStat('ability', 'technique', options.trainerTechnique, `${options.commandName} requires trainer technique.`, undefined, 'trainer'),
      minStat('ability', 'sex', options.targetSex, `${options.commandName} requires target sex skill.`),
    ], `${options.commandName} technique/sex gate failed.`),
    requiresFemaleTarget(`${options.commandName} cannot target a male character.`),
    any([
      missingTalent('inexperienced'),
      minStat('talent', 'sadistLegacy', 1, `${options.commandName} allows inexperienced target when trainer is sadist.`, undefined, 'trainer'),
    ], `${options.commandName} is blocked by inexperienced target.`),
    any([
      minStat('talent', 'futanari', 1, `${options.commandName} requires trainer genital compatibility.`, undefined, 'trainer'),
      minStat('talent', 'male', 1, `${options.commandName} requires trainer genital compatibility.`, undefined, 'trainer'),
      minStat('item', 'penisBand', 1, `${options.commandName} requires penis band if trainer has no penis.`),
    ], `${options.commandName} trainer genital/item gate failed.`),
    any([
      missingTag(ASSISTANT_PLAY_TAG),
      not(all([
        compareStat('exp', 'vaginalSex', 'eq', 0),
        any([
          compareStat('ability', 'obedience', 'lte', 4, undefined, undefined, 'assistant'),
          compareStat('ability', 'lesbian', 'lte', 4, undefined, undefined, 'assistant'),
        ]),
        compareStat('talent', 'sadistLegacy', 'eq', 0, undefined, undefined, 'assistant'),
      ]), `${options.commandName} assistant virgin gate failed.`),
    ]),
    any([
      missingTag(ASSISTANT_PLAY_TAG),
      not(all([
        compareStat('palam', 'arousal', 'lt', 500),
        any([
          compareStat('ability', 'obedience', 'lte', 3, undefined, undefined, 'assistant'),
          compareStat('ability', 'lesbian', 'lte', 3, undefined, undefined, 'assistant'),
        ]),
        compareStat('talent', 'sadistLegacy', 'eq', 0, undefined, undefined, 'assistant'),
      ]), `${options.commandName} assistant lubrication gate failed.`),
    ]),
    ...requiresNoEquipments(blockedEquipments),
    any([
      compareStat('equipment', 'bathPlay', 'eq', 0),
      minStat('item', 'playMat', 1, `${options.commandName} bath play requires a play mat.`),
    ]),
    ...requiresLowerExposed({
      reason: `${options.commandName} requires lower clothing to be removed.`,
      blockedStockingState: { type: 6, state: 0 },
      blockedSpecialLowerItems: [69, 79, 11],
    }),
  ];
}
