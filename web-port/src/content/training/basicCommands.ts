import { compareStat, minStat } from '../../core/conditions';
import { addBase, addExp, addLoseBase, addMessage } from '../../core/effects';
import {
  blocksAssistantDirtyMouthContact,
  requiresMouthAccessible,
} from '../../domain/contact';
import {
  requiresFemaleTarget,
  requiresLowerExposed,
  requiresNoEquipments,
} from '../../domain/person';
import {
  comf69AvailabilityRequirements,
  comf128AvailabilityRequirements,
  comf133AvailabilityRequirements,
  comf6OrderGateTerms,
  defineTrainingCommand,
  defineScoreFormulaGate,
  requiresNoTrainingModes,
} from '../../domain/training';
import {
  comf0ExperiencePostEffects,
  comf1ExperiencePostEffects,
  comf6ExperiencePostEffects,
} from '../../domain/training/experienceEffectResolvers';
import {
  comf0SourceEffects,
  comf1SourceEffects,
  comf6SourceEffects,
  comf6DirtyMouthPenalty,
} from '../../domain/training/sourceEffectResolvers';
import {
  comf0StainPostEffects,
  comf1StainPostEffects,
  comf6StainPostEffects,
} from '../../domain/training/stainEffectResolvers';
import type { TrainingCommandRemapResolver, TrainingCommandPreExecuteResolver } from '../../domain/training';

const ASSISTANT_PLAY_TAG = 'training.assistantPlay';

function sameTrainerAsPrevious(context: Parameters<TrainingCommandRemapResolver>[0]): boolean {
  const assistantPlay = context.hasTag?.(ASSISTANT_PLAY_TAG) ?? false;
  const previousTrainerWasAssistant = context.getNumericStat('tflag', 'previousTrainerWasAssistant') !== 0;
  return assistantPlay === previousTrainerWasAssistant;
}

function previousCommandIs(
  context: Parameters<TrainingCommandRemapResolver>[0],
  originalIds: readonly number[],
): boolean {
  return originalIds.includes(context.getNumericStat('tflag', 'previousCommand'));
}

const comf1RemapToCom69: TrainingCommandRemapResolver = (context) => {
  if (!sameTrainerAsPrevious(context)) return undefined;
  if (!previousCommandIs(context, [31, 61, 69])) return undefined;
  if (context.getNumericStat('equipment', 'rope') !== 0) return undefined;
  if (context.getNumericStat('equipment', 'bestialityPlay') !== 0) return undefined;
  return {
    commandId: 'training.chain.sixty_nine',
    reason: 'COMF1 chains into COM69 after compatible previous oral command.',
    requireTargetAvailable: true,
  };
};

const comf6RemapToInsertionKiss: TrainingCommandRemapResolver = (context) => {
  if (!sameTrainerAsPrevious(context)) return undefined;
  if (previousCommandIs(context, [20, 129, 130])) {
    return {
      commandId: 'training.chain.missionary_kiss',
      reason: 'COMF6 chains into COM128 after compatible missionary command.',
      requireTargetAvailable: true,
    };
  }

  if (previousCommandIs(context, [131, 132, 134])) {
    return {
      commandId: 'training.chain.standing_insertion',
      reason: 'COMF6 chains into COM133 after compatible standing/back command.',
      requireTargetAvailable: true,
    };
  }

  return undefined;
};

const confirmFirstKiss: TrainingCommandPreExecuteResolver = (context) => {
  if (context.getNumericStat('flag', 'firstKissConfirmBypass') !== 0) return undefined;
  if (context.getNumericStat('cflag', 'firstKissLegacy') !== -1) return undefined;
  return {
    id: 'comf6.firstKiss',
    prompt: 'This command may take the target first-kiss flag. Continue?',
    cancelReason: 'COMF6 first-kiss confirmation was rejected.',
  };
};

export const basicTrainingCommands = [
  defineTrainingCommand({
    id: 'training.basic.caress',
    originalId: 0,
    name: 'Caress',
    category: 'basic',
    tags: ['pilot', 'comf0', 'legacy-baseline'],
    actors: [
      { role: 'target', required: true },
      { role: 'trainer', required: true },
    ],
    requirements: [
      minStat('ability', 'technique', 0, 'Technique stat is required.'),
    ],
    effects: [
      addExp('caress', 1),
      addBase('health', 5),
      addBase('stamina', 50),
      addMessage('COMF0 original-ERB source and post effects were applied.'),
    ],
    dynamicEffects: [
      comf0SourceEffects(),
    ],
    postEffects: [
      comf0StainPostEffects(),
      comf0ExperiencePostEffects(),
    ],
  }),
  defineTrainingCommand({
    id: 'training.basic.cunnilingus',
    originalId: 1,
    name: 'Cunnilingus',
    category: 'basic',
    tags: ['pilot', 'comf1', 'legacy-baseline'],
    actors: [
      { role: 'target', required: true },
      { role: 'trainer', required: true },
    ],
    requirements: [
      minStat('ability', 'technique', 0, 'Technique stat is required.'),
      requiresFemaleTarget('COMF1 cannot target a male character in the current improved-command baseline.'),
      ...requiresNoTrainingModes(['tentacle', 'slime']),
      ...requiresNoEquipments(['singleWoodenHorse']),
      ...requiresLowerExposed({
        reason: 'COMF1 requires lower clothing to be removed.',
        blockedStockingState: { type: 6, state: 0 },
        blockedSpecialLowerItems: [69, 11],
      }),
    ],
    remapBeforeExecute: [
      comf1RemapToCom69,
    ],
    effects: [
      addLoseBase('health', 5),
      addLoseBase('stamina', 50),
      addMessage('COMF1 original-ERB source and direct effects were applied.'),
    ],
    dynamicEffects: [
      comf1SourceEffects(),
    ],
    phaseSkips: [{
      phase: 'postEffects',
      when: [compareStat('equipment', 'bestialityPlay', 'gte', 1)],
      reason: 'COMF1 TEQUIP:89 returns before stain/EXP/TFLAG post effects.',
    }],
    postEffects: [
      comf1StainPostEffects(),
      comf1ExperiencePostEffects(),
    ],
  }),
  defineTrainingCommand({
    id: 'training.basic.kiss',
    originalId: 6,
    name: 'Kiss',
    category: 'basic',
    tags: ['pilot', 'comf6', 'legacy-baseline'],
    actors: [
      { role: 'target', required: true },
      { role: 'trainer', required: true },
    ],
    preExecuteChecks: [
      confirmFirstKiss,
    ],
    remapBeforeExecute: [
      comf6RemapToInsertionKiss,
    ],
    requirements: [
      minStat('ability', 'technique', 0, 'Technique stat is required.'),
      ...requiresMouthAccessible('COMF6 cannot be used on a target that forbids mouth service.'),
      blocksAssistantDirtyMouthContact('COMF6 is blocked by assistant dirty-mouth refusal.'),
      ...requiresNoTrainingModes(['tentacle', 'slime']),
    ],
    formulaGates: [
      defineScoreFormulaGate({
        id: 'comf6.originalOrder',
        threshold: 15,
        reason: 'COMF6 original COM_ORDER score is below 15.',
        autoPassWhen: (context) =>
          context.getNumericStat('ability', 'obedience') >= 2 ||
          context.getNumericStat('ability', 'mouthService') >= 3 ||
          context.getNumericStat('talent', 'love') !== 0,
        terms: comf6OrderGateTerms({
          palamThresholds: [100, 500, 1000, 3000, 10000],
          dirtyPenalty: comf6DirtyMouthPenalty,
        }),
      }),
    ],
    effects: [
      addLoseBase('health', 5),
      addLoseBase('stamina', 50),
      addMessage('COMF6 original-ERB source and direct effects were applied.'),
    ],
    dynamicEffects: [
      comf6SourceEffects(),
    ],
    phaseSkips: [{
      phase: 'postEffects',
      when: [compareStat('equipment', 'bestialityPlay', 'gte', 1)],
      reason: 'COMF6 TEQUIP:89 returns before normal stain/EXP/TFLAG post effects.',
    }],
    postEffects: [
      comf6StainPostEffects(),
      comf6ExperiencePostEffects(),
    ],
  }),
  defineTrainingCommand({
    id: 'training.chain.sixty_nine',
    name: 'Sixty-Nine',
    category: 'service',
    tags: ['chain-target', 'comf69', 'availability-only'],
    actors: [
      { role: 'target', required: true },
      { role: 'trainer', required: true },
      { role: 'assistant', required: false },
    ],
    requirements: comf69AvailabilityRequirements(),
    effects: [
      addMessage('COM69 chain availability passed. COM69 effects are pending full migration.'),
    ],
  }),
  defineTrainingCommand({
    id: 'training.chain.missionary_kiss',
    name: 'Missionary Kiss',
    category: 'insertion',
    tags: ['chain-target', 'comf128', 'availability-only'],
    actors: [
      { role: 'target', required: true },
      { role: 'trainer', required: true },
      { role: 'assistant', required: false },
    ],
    requirements: comf128AvailabilityRequirements(),
    effects: [
      addMessage('COM128 chain availability passed. COM128 effects are pending full migration.'),
    ],
  }),
  defineTrainingCommand({
    id: 'training.chain.standing_insertion',
    name: 'Standing Insertion',
    category: 'insertion',
    tags: ['chain-target', 'comf133', 'availability-only'],
    actors: [
      { role: 'target', required: true },
      { role: 'trainer', required: true },
      { role: 'assistant', required: false },
    ],
    requirements: comf133AvailabilityRequirements(),
    effects: [
      addMessage('COM133 chain availability passed. COM133 effects are pending full migration.'),
    ],
  }),
] as const;
