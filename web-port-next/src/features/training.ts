import { getTrainingCommandDefinition } from '../catalog/lookup';
import type { CatalogId, GameDefinitions, TrainingCommandDefinition } from '../catalog/types';
import type { CharacterBodyState } from '../domains/body/types';
import { initialInteractionSessionState, type InteractionSessionState } from '../domains/interaction/types';
import { logEffect, type GameEffect } from '../game/effects';
import type { GameSession, GameState } from '../game/state';
import type { TrainingCommandView, TrainingParticipantView, TrainingView } from '../game/views';
import { applyBodyStatDeltas, applyConditionParamDeltas, applyTrainingResourceDeltas } from './bodyStats';
import { isCharacterActive } from './characterLifecycle';
import { trainingAvailabilityDisabledReason } from './trainingAvailability';
import { endTurn } from './turnEnd';

export type TrainingFailure = {
  readonly code: string;
  readonly message: string;
};

export type TrainingCalculatedResult = {
  readonly commandId: CatalogId;
  readonly commandLabel: string;
  readonly targetId: string;
  readonly executorId: string;
  readonly assistantId?: string;
  readonly stimulusDeltas: Record<CatalogId, number>;
  readonly paramDeltas: Record<CatalogId, { readonly up: number; readonly down: number }>;
  readonly bodyStatDeltas: Record<string, number>;
  readonly resourceDeltas: Record<CatalogId, number>;
  readonly experienceDeltas: Record<CatalogId, number>;
};

export type TrainingUpdateResult =
  | {
      readonly ok: true;
      readonly state: GameState;
      readonly session: GameSession;
      readonly message: string;
      readonly effects?: readonly GameEffect[];
    }
  | {
      readonly ok: false;
      readonly failure: TrainingFailure;
    };

const staminaBaseStatId = '0';
const lifespanBaseStatId = '10';
const obedienceAbilityId = '10';
const abnormalExperienceId = '50';
const loveTraitId = '85';
const charismaTraitId = '93';
const deathReviveTraitIds = ['310', '312', '313'] as const;
const delayedReviveTraitIds = ['315', '316', '199'] as const;
const ntrProgressFlagId = '619';
const deathTalkTemporaryFlagId = '13';
const globalKillCountFlag = 'flag_31';

function participantDisabledReason(state: GameState, characterId: string): string | undefined {
  const character = state.people.characters[characterId];
  if (!character) {
    return 'Training participant does not exist.';
  }

  if (!isCharacterActive(character)) {
    return 'Inactive characters cannot participate in training.';
  }

  if (!state.body.byCharacterId[characterId]) {
    return 'Training participant body state is missing.';
  }

  return undefined;
}

function numeric(value: unknown): number {
  if (typeof value === 'number') return value;
  if (value === true) return 1;
  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

function randomInt(maxExclusive: number): number {
  return Math.floor(Math.random() * maxExclusive);
}

function hasTrait(state: GameState, characterId: string, traitId: string): boolean {
  const value = state.people.characters[characterId]?.attributes.traits[traitId];
  return value === true || (typeof value === 'number' && value !== 0);
}

function characterBaseCurrent(state: GameState, characterId: string, baseId: string): number {
  return state.people.characters[characterId]?.attributes.baseStats.current[baseId] ?? 0;
}

function characterAbility(state: GameState, characterId: string, abilityId: string): number {
  return state.people.characters[characterId]?.attributes.abilities[abilityId] ?? 0;
}

function withCharacterBaseCurrent(state: GameState, characterId: string, baseId: string, value: number): GameState {
  const character = state.people.characters[characterId];
  const body = state.body.byCharacterId[characterId];
  if (!character) return state;

  return {
    ...state,
    people: {
      ...state.people,
      characters: {
        ...state.people.characters,
        [characterId]: {
          ...character,
          attributes: {
            ...character.attributes,
            baseStats: {
              ...character.attributes.baseStats,
              current: {
                ...character.attributes.baseStats.current,
                [baseId]: value,
              },
            },
          },
        },
      },
    },
    body: body
      ? {
          ...state.body,
          byCharacterId: {
            ...state.body.byCharacterId,
            [characterId]: {
              ...body,
              baseStats: {
                ...body.baseStats,
                [baseId]: value,
              },
            },
          },
        }
      : state.body,
  };
}

function withCharacterAbilityDelta(state: GameState, characterId: string, abilityId: string, delta: number): GameState {
  const character = state.people.characters[characterId];
  if (!character) return state;
  const nextValue = (character.attributes.abilities[abilityId] ?? 0) + delta;

  return {
    ...state,
    people: {
      ...state.people,
      characters: {
        ...state.people.characters,
        [characterId]: {
          ...character,
          attributes: {
            ...character.attributes,
            abilities: {
              ...character.attributes.abilities,
              [abilityId]: nextValue,
            },
          },
        },
      },
    },
  };
}

function withCharacterExperienceDelta(state: GameState, characterId: string, experienceId: string, delta: number): GameState {
  const character = state.people.characters[characterId];
  if (!character) return state;
  const nextValue = (character.attributes.experiences[experienceId] ?? 0) + delta;

  return {
    ...state,
    people: {
      ...state.people,
      characters: {
        ...state.people.characters,
        [characterId]: {
          ...character,
          attributes: {
            ...character.attributes,
            experiences: {
              ...character.attributes.experiences,
              [experienceId]: nextValue,
            },
          },
        },
      },
    },
  };
}

function withCharacterTrait(state: GameState, characterId: string, traitId: string): GameState {
  const character = state.people.characters[characterId];
  if (!character) return state;

  return {
    ...state,
    people: {
      ...state.people,
      characters: {
        ...state.people.characters,
        [characterId]: {
          ...character,
          attributes: {
            ...character.attributes,
            traits: {
              ...character.attributes.traits,
              [traitId]: true,
            },
          },
        },
      },
    },
  };
}

function withNtrProgressFlag(state: GameState, characterId: string, flagId: string, value: number): GameState {
  return {
    ...state,
    social: {
      ...state.social,
      ntrProgress: {
        ...state.social.ntrProgress,
        [`${characterId}.flag_${flagId}`]: value,
      },
      partnerProgress: {
        ...state.social.partnerProgress,
        [`${characterId}.flag_${flagId}`]: value,
      },
    },
  };
}

function ntrProgressFlag(state: GameState, characterId: string, flagId: string): number {
  return numeric(state.social.ntrProgress[`${characterId}.flag_${flagId}`]);
}

function withRunFlag(state: GameState, flagKey: string, value: number): GameState {
  return {
    ...state,
    run: {
      ...state.run,
      runFlags: {
        ...state.run.runFlags,
        [flagKey]: value,
      },
    },
  };
}

function characterLegacyNo(state: GameState, characterId: string): number {
  const templateNo = Number(state.people.characters[characterId]?.identity.templateId);
  if (Number.isFinite(templateNo)) return templateNo;
  const match = /(\d+)$/u.exec(characterId);
  return match ? Number(match[1]) : 0;
}

function trainerCharacterId(state: GameState, fallbackId: string): string {
  return Object.values(state.people.characters).find((character) => character.roles.includes('trainer'))?.id ?? fallbackId;
}

export function applyAfterTrainCharacterDeathCheck(
  state: GameState,
  session: GameSession,
  targetId: string,
  masterId: string,
): { readonly state: GameState; readonly session: GameSession; readonly effects: readonly GameEffect[]; readonly returnValue: 0 | 1 } {
  if (!state.people.characters[targetId]) {
    return { state, session, effects: [], returnValue: 0 };
  }

  let nextState = state;
  let nextSession = session;
  const effects: GameEffect[] = [];

  if (hasTrait(nextState, targetId, loveTraitId)) {
    const nextProgress = Math.max(0, ntrProgressFlag(nextState, targetId, ntrProgressFlagId) - randomInt(5));
    nextState = withNtrProgressFlag(nextState, targetId, ntrProgressFlagId, nextProgress);
  }

  if (characterBaseCurrent(nextState, targetId, staminaBaseStatId) > 0) {
    return { state: nextState, session: nextSession, effects, returnValue: 0 };
  }

  const reviveRollThreshold = randomInt(7) + 3;
  const obedience = characterAbility(nextState, targetId, obedienceAbilityId);
  const revivesByBody =
    deathReviveTraitIds.some((traitId) => hasTrait(nextState, targetId, traitId)) && obedience > reviveRollThreshold;

  if (revivesByBody) {
    nextState = withCharacterExperienceDelta(nextState, targetId, abnormalExperienceId, 1);
    nextState = withCharacterAbilityDelta(nextState, targetId, obedienceAbilityId, -3);
    nextState = withCharacterBaseCurrent(nextState, targetId, staminaBaseStatId, 100);
    effects.push(logEffect('M35 CHARADEAD_CHECK revived the target from false death.', 'success'));
  } else if (delayedReviveTraitIds.some((traitId) => hasTrait(nextState, targetId, traitId))) {
    if ((hasTrait(nextState, targetId, '315') || hasTrait(nextState, targetId, '316')) && characterBaseCurrent(nextState, targetId, lifespanBaseStatId) > 0) {
      nextState = withCharacterBaseCurrent(nextState, targetId, lifespanBaseStatId, Math.max(1, characterBaseCurrent(nextState, targetId, lifespanBaseStatId) - 14));
    }
    nextState = withCharacterAbilityDelta(nextState, targetId, obedienceAbilityId, -3);
    if (characterAbility(nextState, targetId, obedienceAbilityId) < 0) {
      const current = characterAbility(nextState, targetId, obedienceAbilityId);
      nextState = withCharacterAbilityDelta(nextState, targetId, obedienceAbilityId, -current);
    }
    nextState = withCharacterBaseCurrent(nextState, targetId, staminaBaseStatId, 0);
    effects.push(logEffect('M35 CHARADEAD_CHECK marked delayed revive death state.'));
  } else {
    const targetNo = characterLegacyNo(nextState, targetId);
    const killCount = numeric(nextState.run.runFlags[globalKillCountFlag]) + 1;
    nextSession = {
      ...nextSession,
      interaction: {
        ...nextSession.interaction,
        temporaryFlags: {
          ...nextSession.interaction.temporaryFlags,
          [deathTalkTemporaryFlagId]: 999,
        },
      },
    };
    nextState = withCharacterBaseCurrent(nextState, targetId, staminaBaseStatId, -1);
    nextState = withRunFlag(nextState, `flag_${targetNo + 999}`, -2);
    nextState = withRunFlag(nextState, globalKillCountFlag, killCount);
    effects.push(logEffect('M35 CHARADEAD_CHECK marked target death and kill count.', 'warning'));
  }

  const trainerId = trainerCharacterId(nextState, masterId);
  if (numeric(nextState.run.runFlags[globalKillCountFlag]) >= 3 && !hasTrait(nextState, trainerId, charismaTraitId)) {
    nextState = withCharacterTrait(nextState, trainerId, charismaTraitId);
    effects.push(logEffect('M35 CHARADEAD_CHECK granted trainer charisma trait 93.', 'success'));
  }

  return {
    state: nextState,
    session: nextSession,
    effects,
    returnValue: 1,
  };
}

function trainingCommandDisabledReason(
  state: GameState,
  session: GameSession,
  command: TrainingCommandDefinition,
): string | undefined {
  const targetId = session.interaction.participants.targetId;
  if (command.requiresTarget !== false && !targetId) {
    return 'Select a training target first.';
  }

  if (targetId) {
    const targetReason = participantDisabledReason(state, targetId);
    if (targetReason) {
      return targetReason;
    }
  }

  const executorId = session.interaction.participants.masterId;
  if (command.requiresExecutor !== false && !executorId) {
    return 'Select a training executor first.';
  }

  if (executorId) {
    const executorReason = participantDisabledReason(state, executorId);
    if (executorReason) {
      return executorReason;
    }
  }

  const assistantId = session.interaction.participants.assistantId;
  if (assistantId) {
    if (command.allowsAssistant === false) {
      return 'This training command does not allow an assistant.';
    }

    const assistantReason = participantDisabledReason(state, assistantId);
    if (assistantReason) {
      return assistantReason;
    }
  }

  return trainingAvailabilityDisabledReason(state, session, command);
}

export function computeVisibleTrainingParticipantIds(state: GameState): readonly string[] {
  return Object.keys(state.people.characters).sort();
}

export function computeVisibleTrainingCommandIds(definitions: GameDefinitions): readonly CatalogId[] {
  return Object.values(definitions.trainingCommands)
    .map((command) => command.id)
    .sort((left, right) => Number(left) - Number(right));
}

function participantViewFromState(state: GameState, characterId: string): TrainingParticipantView | undefined {
  const character = state.people.characters[characterId];
  if (!character) {
    return undefined;
  }

  const disabledReason = participantDisabledReason(state, characterId);

  return {
    characterId,
    label: character.identity.displayName,
    available: disabledReason === undefined,
    disabledReason,
  };
}

function commandViewFromDefinition(
  state: GameState,
  session: GameSession,
  command: TrainingCommandDefinition,
): TrainingCommandView {
  const disabledReason = trainingCommandDisabledReason(state, session, command);

  return {
    commandId: command.id,
    label: command.label,
    available: disabledReason === undefined,
    disabledReason,
    completesTimeBlock: command.completesTimeBlock === true,
    stimulusPreview: { ...(command.stimulusDeltas ?? {}) },
    paramPreview: { ...(command.paramDeltas ?? {}) },
  };
}

export function formatTrainingNumber(value: number): string {
  return String(value).padStart(8, ' ');
}

function bufferSummary(session: GameSession): TrainingView['bufferSummary'] {
  const stimulusTotal = Object.values(session.interaction.sources).reduce((total, value) => total + value, 0);
  const paramUpTotal = Object.values(session.interaction.paramDeltas).reduce((total, value) => total + value.up, 0);
  const bodyCostTotal = Object.values(session.interaction.baseLoss).reduce((total, value) => total + value, 0);

  return {
    stimulusTotal,
    paramUpTotal,
    bodyCostTotal,
    formattedBodyCostTotal: `${formatTrainingNumber(bodyCostTotal)}/${formatTrainingNumber(paramUpTotal)}`,
  };
}

function trainingStatusSummary(state: GameState): TrainingView['statusSummary'] {
  return {
    day: state.run.clock.day,
    month: state.run.clock.month,
    week: state.run.clock.week,
    turn: state.run.clock.turn,
    timeSlotLabel: state.run.clock.currentTimeSlot === 0 ? '전반' : '후반',
  };
}

export function buildTrainingView(definitions: GameDefinitions, state: GameState, session: GameSession): TrainingView {
  const participantIds = computeVisibleTrainingParticipantIds(state);
  const participants = participantIds
    .map((characterId) => participantViewFromState(state, characterId))
    .filter((participant): participant is TrainingParticipantView => Boolean(participant));
  const visibleCommandIds = computeVisibleTrainingCommandIds(definitions);
  const visibleCommands = visibleCommandIds
    .map((commandId) => getTrainingCommandDefinition(definitions, commandId))
    .filter((result): result is { readonly ok: true; readonly definition: TrainingCommandDefinition } => result.ok)
    .map((result) => commandViewFromDefinition(state, session, result.definition));
  const selectedTarget =
    session.interaction.participants.targetId !== undefined
      ? participants.find((participant) => participant.characterId === session.interaction.participants.targetId)
      : undefined;
  const selectedExecutor =
    session.interaction.participants.masterId !== undefined
      ? participants.find((participant) => participant.characterId === session.interaction.participants.masterId)
      : undefined;
  const selectedAssistant =
    session.interaction.participants.assistantId !== undefined
      ? participants.find((participant) => participant.characterId === session.interaction.participants.assistantId)
      : undefined;
  const selectedCommand =
    session.interaction.commandFlow.selectedCommandId !== undefined
      ? visibleCommands.find((command) => command.commandId === session.interaction.commandFlow.selectedCommandId)
      : undefined;

  return {
    kind: 'training',
    route: 'training',
    currentMoney: state.economy.account.currentMoney,
    participants,
    selectedTargetId: session.interaction.participants.targetId,
    selectedTarget,
    selectedExecutorId: session.interaction.participants.masterId,
    selectedExecutor,
    selectedAssistantId: session.interaction.participants.assistantId,
    selectedAssistant,
    visibleCommands,
    selectedCommandId: session.interaction.commandFlow.selectedCommandId,
    selectedCommand,
    bufferSummary: bufferSummary(session),
    statusSummary: trainingStatusSummary(state),
  };
}

export function createTrainingSession(): InteractionSessionState {
  return initialInteractionSessionState;
}

function clearTrainingCommandBuffers(interaction: InteractionSessionState): InteractionSessionState {
  return {
    ...interaction,
    commandFlow: {},
    temporaryFlags: {},
    sources: {},
    paramDeltas: {},
    baseLoss: {},
    resultBuffers: initialInteractionSessionState.resultBuffers,
    pendingEvents: [],
    counters: {},
  };
}

export function selectTrainingTarget(state: GameState, session: GameSession, characterId: string): TrainingUpdateResult {
  const disabledReason = participantDisabledReason(state, characterId);
  if (disabledReason) {
    return {
      ok: false,
      failure: {
        code: state.people.characters[characterId] ? 'training-target-unavailable' : 'training-target-not-found',
        message: disabledReason,
      },
    };
  }

  const interaction = clearTrainingCommandBuffers(session.interaction);

  return {
    ok: true,
    state,
    session: {
      ...session,
      interaction: {
        ...interaction,
        participants: {
          ...interaction.participants,
          targetId: characterId,
        },
      },
    },
    message: `${state.people.characters[characterId].identity.displayName} selected as training target.`,
  };
}

export function selectTrainingExecutor(state: GameState, session: GameSession, characterId: string): TrainingUpdateResult {
  const disabledReason = participantDisabledReason(state, characterId);
  if (disabledReason) {
    return {
      ok: false,
      failure: {
        code: state.people.characters[characterId] ? 'training-executor-unavailable' : 'training-executor-not-found',
        message: disabledReason,
      },
    };
  }

  const interaction = clearTrainingCommandBuffers(session.interaction);

  return {
    ok: true,
    state,
    session: {
      ...session,
      interaction: {
        ...interaction,
        participants: {
          ...interaction.participants,
          masterId: characterId,
        },
      },
    },
    message: `${state.people.characters[characterId].identity.displayName} selected as training executor.`,
  };
}

export function selectTrainingAssistant(
  state: GameState,
  session: GameSession,
  characterId?: string,
): TrainingUpdateResult {
  if (characterId !== undefined) {
    const disabledReason = participantDisabledReason(state, characterId);
    if (disabledReason) {
      return {
        ok: false,
        failure: {
          code: state.people.characters[characterId] ? 'training-assistant-unavailable' : 'training-assistant-not-found',
          message: disabledReason,
        },
      };
    }
  }

  const interaction = clearTrainingCommandBuffers(session.interaction);

  return {
    ok: true,
    state,
    session: {
      ...session,
      interaction: {
        ...interaction,
        participants: {
          ...interaction.participants,
          assistantId: characterId,
          assistantPlay: characterId !== undefined,
        },
      },
    },
    message: characterId ? `${state.people.characters[characterId].identity.displayName} selected as assistant.` : 'Training assistant cleared.',
  };
}

export function calculateStimulusDeltas(command: TrainingCommandDefinition): Record<CatalogId, number> {
  return { ...(command.stimulusDeltas ?? {}) };
}

export function calculateParamDeltas(
  command: TrainingCommandDefinition,
): Record<CatalogId, { readonly up: number; readonly down: number }> {
  return { ...(command.paramDeltas ?? {}) };
}

export function calculateBodyStatDeltas(command: TrainingCommandDefinition): Record<string, number> {
  return { ...(command.bodyStatDeltas ?? {}) };
}

export function calculateTrainingResult(
  command: TrainingCommandDefinition,
  targetId: string,
  executorId: string,
  assistantId?: string,
): TrainingCalculatedResult {
  return {
    commandId: command.id,
    commandLabel: command.label,
    targetId,
    executorId,
    assistantId,
    stimulusDeltas: calculateStimulusDeltas(command),
    paramDeltas: calculateParamDeltas(command),
    bodyStatDeltas: calculateBodyStatDeltas(command),
    resourceDeltas: { ...(command.resourceDeltas ?? {}) },
    experienceDeltas: { ...(command.experienceDeltas ?? {}) },
  };
}

function baseLossFromBodyDeltas(deltas: Record<string, number>): Record<string, number> {
  return Object.fromEntries(
    Object.entries(deltas)
      .filter(([, delta]) => delta < 0)
      .map(([statId, delta]) => [statId, Math.abs(delta)]),
  );
}

function sessionWithTrainingPreview(session: GameSession, result: TrainingCalculatedResult): GameSession {
  const interaction = clearTrainingCommandBuffers(session.interaction);

  return {
    ...session,
    interaction: {
      ...interaction,
      commandFlow: {
        selectedCommandId: result.commandId,
      },
      sources: result.stimulusDeltas,
      paramDeltas: result.paramDeltas,
      baseLoss: baseLossFromBodyDeltas(result.bodyStatDeltas),
      resultBuffers: {
        ...interaction.resultBuffers,
        nowEx: result.experienceDeltas,
        gotJuel: result.resourceDeltas,
      },
    },
  };
}

function selectedParticipantFailure(
  state: GameState,
  codePrefix: 'target' | 'executor' | 'assistant',
  characterId: string | undefined,
): TrainingFailure | undefined {
  if (!characterId) {
    return {
      code: `training-${codePrefix}-required`,
      message: `Select a training ${codePrefix} first.`,
    };
  }

  const disabledReason = participantDisabledReason(state, characterId);
  if (disabledReason) {
    return {
      code: `training-${codePrefix}-unavailable`,
      message: disabledReason,
    };
  }

  return undefined;
}

function validateTrainingCommand(
  state: GameState,
  session: GameSession,
  command: TrainingCommandDefinition,
): TrainingFailure | undefined {
  const disabledReason = trainingCommandDisabledReason(state, session, command);
  if (!disabledReason) {
    return undefined;
  }

  if (disabledReason.includes('target')) {
    return {
      code: 'training-target-required',
      message: disabledReason,
    };
  }

  if (disabledReason.includes('executor')) {
    return {
      code: 'training-executor-required',
      message: disabledReason,
    };
  }

  return {
    code: 'training-command-unavailable',
    message: disabledReason,
  };
}

export function selectTrainingCommand(
  definitions: GameDefinitions,
  state: GameState,
  session: GameSession,
  commandId: CatalogId,
): TrainingUpdateResult {
  const commandResult = getTrainingCommandDefinition(definitions, commandId);
  if (!commandResult.ok) {
    return {
      ok: false,
      failure: commandResult.failure,
    };
  }

  const failure = validateTrainingCommand(state, session, commandResult.definition);
  if (failure) {
    return {
      ok: false,
      failure,
    };
  }

  const targetId = session.interaction.participants.targetId!;
  const executorId = session.interaction.participants.masterId!;
  const calculatedResult = calculateTrainingResult(
    commandResult.definition,
    targetId,
    executorId,
    session.interaction.participants.assistantId,
  );

  return {
    ok: true,
    state,
    session: sessionWithTrainingPreview(session, calculatedResult),
    message: `${commandResult.definition.label} training command selected.`,
  };
}

function applyBodyTrainingResult(body: CharacterBodyState | undefined, result: TrainingCalculatedResult): CharacterBodyState | undefined {
  if (!body) {
    return body;
  }

  const withParams = applyConditionParamDeltas(body, result.paramDeltas);
  const withBodyStats = applyBodyStatDeltas(withParams, result.bodyStatDeltas)!;
  const withResources = applyTrainingResourceDeltas(withBodyStats, result.resourceDeltas);

  return {
    ...withResources,
    milestones: {
      ...body.milestones,
      'training.latestCommandId': result.commandId,
    },
  };
}

export function applyTrainingResult(state: GameState, result: TrainingCalculatedResult): GameState {
  const target = state.people.characters[result.targetId];
  const nextExperiences = { ...(target?.attributes.experiences ?? {}) };
  for (const [experienceId, delta] of Object.entries(result.experienceDeltas)) {
    nextExperiences[experienceId] = (nextExperiences[experienceId] ?? 0) + delta;
  }

  return {
    ...state,
    people: target
      ? {
          characters: {
            ...state.people.characters,
            [result.targetId]: {
              ...target,
              attributes: {
                ...target.attributes,
                experiences: nextExperiences,
              },
              flags: {
                ...target.flags,
                featureProgress: {
                  ...target.flags.featureProgress,
                  'training.latestCommandId': result.commandId,
                },
              },
            },
          },
        }
      : state.people,
    body: {
      byCharacterId: {
        ...state.body.byCharacterId,
        ...(state.body.byCharacterId[result.targetId]
          ? {
              [result.targetId]: applyBodyTrainingResult(state.body.byCharacterId[result.targetId], result)!,
            }
          : {}),
      },
    },
  };
}

export function executeSelectedTraining(
  definitions: GameDefinitions,
  state: GameState,
  session: GameSession,
): TrainingUpdateResult {
  const commandId = session.interaction.commandFlow.selectedCommandId;
  if (!commandId) {
    return {
      ok: false,
      failure: {
        code: 'training-command-required',
        message: 'Select a training command before execution.',
      },
    };
  }

  const targetFailure = selectedParticipantFailure(state, 'target', session.interaction.participants.targetId);
  if (targetFailure) {
    return {
      ok: false,
      failure: targetFailure,
    };
  }

  const executorFailure = selectedParticipantFailure(state, 'executor', session.interaction.participants.masterId);
  if (executorFailure) {
    return {
      ok: false,
      failure: executorFailure,
    };
  }

  if (session.interaction.participants.assistantId) {
    const assistantFailure = selectedParticipantFailure(state, 'assistant', session.interaction.participants.assistantId);
    if (assistantFailure) {
      return {
        ok: false,
        failure: assistantFailure,
      };
    }
  }

  const commandResult = getTrainingCommandDefinition(definitions, commandId);
  if (!commandResult.ok) {
    return {
      ok: false,
      failure: commandResult.failure,
    };
  }

  const commandFailure = validateTrainingCommand(state, session, commandResult.definition);
  if (commandFailure) {
    return {
      ok: false,
      failure: commandFailure,
    };
  }

  const calculatedResult = calculateTrainingResult(
    commandResult.definition,
    session.interaction.participants.targetId!,
    session.interaction.participants.masterId!,
    session.interaction.participants.assistantId,
  );
  const stateAfterTraining = applyTrainingResult(state, calculatedResult);
  const afterTrainDeathCheck = applyAfterTrainCharacterDeathCheck(
    stateAfterTraining,
    session,
    calculatedResult.targetId,
    calculatedResult.executorId,
  );
  const sessionAfterTraining: GameSession = {
    ...afterTrainDeathCheck.session,
    interaction: initialInteractionSessionState,
  };
  const turn = commandResult.definition.completesTimeBlock === true ? endTurn(afterTrainDeathCheck.state, sessionAfterTraining) : undefined;

  if (turn) {
    return {
      ok: true,
      state: turn.state,
      session: turn.session,
      message: `${commandResult.definition.label} training completed.`,
      effects: [
        logEffect(`${commandResult.definition.label} training result applied.`, 'success'),
        ...afterTrainDeathCheck.effects,
        ...turn.effects,
      ],
    };
  }

  return {
    ok: true,
    state: afterTrainDeathCheck.state,
    session: sessionAfterTraining,
    message: `${commandResult.definition.label} training completed.`,
    effects: afterTrainDeathCheck.effects,
  };
}

export function cancelTrainingSelection(session: GameSession): GameSession {
  return {
    ...session,
    interaction: initialInteractionSessionState,
  };
}

export function cancelTraining(session: GameSession): GameSession {
  return {
    ...session,
    interaction: initialInteractionSessionState,
    ui: {
      ...session.ui,
      route: 'mainMenu',
      choices: [],
    },
  };
}
