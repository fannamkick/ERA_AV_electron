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
import { executeTrainingCommand } from './training/engine';
import { executeKojoMatching } from './kojo/engine';
import { trainingCommandRegistry } from './training/registry';

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
    
    // bodyStats.stamina 도 100으로 확실하게 업데이트
    const body = nextState.body.byCharacterId[targetId];
    if (body) {
      nextState = {
        ...nextState,
        body: {
          ...nextState.body,
          byCharacterId: {
            ...nextState.body.byCharacterId,
            [targetId]: {
              ...body,
              bodyStats: {
                ...body.bodyStats,
                stamina: 100,
              },
            },
          },
        },
      };
    }
    
    effects.push(logEffect('M35 CHARADEAD_CHECK revived the target from false death.', 'success'));
  } else if (delayedReviveTraitIds.some((traitId) => hasTrait(nextState, targetId, traitId))) {
    let nextStaminaValue = 0;
    if ((hasTrait(nextState, targetId, '315') || hasTrait(nextState, targetId, '316')) && characterBaseCurrent(nextState, targetId, lifespanBaseStatId) > 0) {
      nextState = withCharacterBaseCurrent(nextState, targetId, lifespanBaseStatId, Math.max(1, characterBaseCurrent(nextState, targetId, lifespanBaseStatId) - 14));
    }
    nextState = withCharacterAbilityDelta(nextState, targetId, obedienceAbilityId, -3);
    if (characterAbility(nextState, targetId, obedienceAbilityId) < 0) {
      const current = characterAbility(nextState, targetId, obedienceAbilityId);
      nextState = withCharacterAbilityDelta(nextState, targetId, obedienceAbilityId, -current);
    }
    nextState = withCharacterBaseCurrent(nextState, targetId, staminaBaseStatId, 0);

    // bodyStats.stamina 도 0으로 업데이트
    const body = nextState.body.byCharacterId[targetId];
    if (body) {
      nextState = {
        ...nextState,
        body: {
          ...nextState.body,
          byCharacterId: {
            ...nextState.body.byCharacterId,
            [targetId]: {
              ...body,
              bodyStats: {
                ...body.bodyStats,
                stamina: 0,
              },
            },
          },
        },
      };
    }

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

    // bodyStats.stamina 도 -1로 업데이트
    const body = nextState.body.byCharacterId[targetId];
    if (body) {
      nextState = {
        ...nextState,
        body: {
          ...nextState.body,
          byCharacterId: {
            ...nextState.body.byCharacterId,
            [targetId]: {
              ...body,
              bodyStats: {
                ...body.bodyStats,
                stamina: -1,
              },
            },
          },
        },
      };
    }

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

  const character = state.people.characters[characterId];
  if (character?.roles.includes('trainer')) {
    return {
      ok: false,
      failure: {
        code: 'training-target-unavailable',
        message: '마스터는 조교 대상이 될 수 없습니다.',
      },
    };
  }

  if (session.interaction.participants.assistantId === characterId) {
    return {
      ok: false,
      failure: {
        code: 'training-target-unavailable',
        message: '현재 지원 조수로 임명된 여배우는 조교 대상으로 지정할 수 없습니다.',
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

  const character = state.people.characters[characterId];
  const hasExecutorRole = character?.roles.includes('trainer') || character?.roles.includes('assistant');
  if (!hasExecutorRole) {
    return {
      ok: false,
      failure: {
        code: 'training-executor-unavailable',
        message: '조교사 역할(마스터 또는 조수)이 없는 캐릭터는 실행자가 될 수 없습니다.',
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

    const character = state.people.characters[characterId];
    if (!character?.roles.includes('assistant')) {
      return {
        ok: false,
        failure: {
          code: 'training-assistant-unavailable',
          message: '승인된 조수(Assistant) 역할이 부여되지 않은 캐릭터는 조수로 지정할 수 없습니다.',
        },
      };
    }

    if (session.interaction.participants.targetId === characterId) {
      return {
        ok: false,
        failure: {
          code: 'training-assistant-unavailable',
          message: '현재 조교 대상을 조수로 겸임 지정할 수 없습니다.',
        },
      };
    }

    if (session.interaction.participants.masterId === characterId) {
      return {
        ok: false,
        failure: {
          code: 'training-assistant-unavailable',
          message: '현재 조교사를 조수로 겸임 지정할 수 없습니다.',
        },
      };
    }

    if (characterId === 'character:0' || characterId === '0') {
      return {
        ok: false,
        failure: {
          code: 'training-assistant-unavailable',
          message: '마스터 자신은 조수 역할을 맡을 수 없습니다.',
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

  const targetId = session.interaction.participants.targetId;
  const targetFailure = selectedParticipantFailure(state, 'target', targetId);
  if (targetFailure) {
    return {
      ok: false,
      failure: targetFailure,
    };
  }

  const executorId = session.interaction.participants.masterId;
  const executorFailure = selectedParticipantFailure(state, 'executor', executorId);
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

  // 1. 범용 조교 계산 엔진 또는 정적 카탈로그 계산 실행 (미구현 방어용 가드 결합)
  const isImplemented = trainingCommandRegistry[commandId] !== undefined;

  let stateAfterTraining: GameState;
  const engineEffects: string[] = [];

  if (isImplemented) {
    // 구현된 커맨드: 공용 조교 엔진 실행 (실시간 기력/체력/구슬/경험 정산)
    const trainingEngineResult = executeTrainingCommand(state, session, commandId);
    stateAfterTraining = trainingEngineResult.state;
    engineEffects.push(...trainingEngineResult.effects);
  } else {
    // 미구현 커맨드: 카탈로그 명세 델타를 활용하여 Mock 적용
    const calculatedResult = calculateTrainingResult(
      commandResult.definition,
      targetId!,
      executorId!,
      session.interaction.participants.assistantId,
    );
    stateAfterTraining = applyTrainingResult(state, calculatedResult);
    engineEffects.push(`${commandResult.definition.label} 집행.`);
  }

  // 2. 처녀막 상실 V절정(isVirginVOrgasm) 여부 판정
  const targetBefore = state.people.characters[targetId!];
  const targetAfter = stateAfterTraining.people.characters[targetId!];

  const hadVirgin = targetBefore?.attributes.traits['0'] === true || (typeof targetBefore?.attributes.traits['0'] === 'number' && targetBefore.attributes.traits['0'] !== 0);
  const vExpBefore = targetBefore?.attributes.experiences['0'] ?? 0;
  const vExpAfter = targetAfter?.attributes.experiences['0'] ?? 0;
  const isVirginVOrgasm = hadVirgin && vExpAfter > vExpBefore;

  // 3. 구상 대사 매칭 엔진 실행
  stateAfterTraining = executeKojoMatching(stateAfterTraining, session, targetId!, { commandId, isVirginVOrgasm });

  // 4. 사망/부활 상태 체크
  const afterTrainDeathCheck = applyAfterTrainCharacterDeathCheck(
    stateAfterTraining,
    session,
    targetId!,
    executorId!,
  );

  // 5. 결과 요약 브리핑(Report) 데이터 조립
  const commandLabel = commandResult.definition.label;
  const targetBody = afterTrainDeathCheck.state.body.byCharacterId[targetId!];
  const specObj = trainingCommandRegistry[commandId];
  const staminaCost = specObj ? specObj.staminaCost : Math.abs(commandResult.definition.bodyStatDeltas?.stamina ?? 0);

  const juelGainsList: string[] = [];
  const expGainsList: string[] = [];
  if (targetBefore && targetAfter) {
    const beforeJuel = state.body.byCharacterId[targetId!]?.trainingResources ?? {};
    const afterJuel = targetBody?.trainingResources ?? {};
    for (const juelId of ['0', '1', '2', '17']) {
      const diff = (afterJuel[juelId] ?? 0) - (beforeJuel[juelId] ?? 0);
      if (diff > 0) juelGainsList.push(`[주얼:${juelId}] +${diff}`);
    }
    for (const [expId, valAfter] of Object.entries(targetAfter.attributes.experiences)) {
      const valBefore = targetBefore.attributes.experiences[expId] ?? 0;
      const diff = valAfter - valBefore;
      if (diff > 0) expGainsList.push(`[경험:${expId}] +${diff}`);
    }
  }

  const juelGains = juelGainsList.join(', ');
  const expGains = expGainsList.join(', ');
  const orgasmsText = engineEffects.filter((eff) => eff.includes('절정 발생')).join('\n');

  const reportText = `[조교 보고서] ${commandLabel} 완료 (소모 체력: ${staminaCost})` +
    (orgasmsText ? `\n- 발생: ${orgasmsText}` : '') +
    (juelGains ? `\n- 획득: ${juelGains}` : '') +
    (expGains ? `\n- 경험: ${expGains}` : '') +
    (afterTrainDeathCheck.returnValue === 1 ? '\n※ 대상 여배우가 체력 고갈로 인해 쓰러졌습니다! ※' : '');

  // 캐릭터 말풍선 대사 뒤에 브리핑 결과 합산하여 기록
  let finalState = afterTrainDeathCheck.state;
  const currentKojo = finalState.text.characterTextEntries[targetId!]?.current ?? '';
  const mergedText = currentKojo ? `${currentKojo}\n\n${reportText}` : reportText;

  const targetCharaObj = finalState.people.characters[targetId!];
  const targetBodyObj = finalState.body.byCharacterId[targetId!];

  finalState = {
    ...finalState,
    people: targetCharaObj
      ? {
          ...finalState.people,
          characters: {
            ...finalState.people.characters,
            [targetId!]: {
              ...targetCharaObj,
              flags: {
                ...targetCharaObj.flags,
                featureProgress: {
                  ...targetCharaObj.flags.featureProgress,
                  'training.latestCommandId': commandId,
                },
              },
            },
          },
        }
      : finalState.people,
    body: targetBodyObj
      ? {
          ...finalState.body,
          byCharacterId: {
            ...finalState.body.byCharacterId,
            [targetId!]: {
              ...targetBodyObj,
              milestones: {
                ...targetBodyObj.milestones,
                'training.latestCommandId': commandId,
              },
            },
          },
        }
      : finalState.body,
    text: {
      ...finalState.text,
      characterTextEntries: {
        ...finalState.text.characterTextEntries,
        [targetId!]: {
          ...(finalState.text.characterTextEntries[targetId!] ?? {}),
          current: mergedText,
        },
      },
    },
  };

  // 6. 조교 시퀀스 지속 및 퇴실 처리 제어
  const targetBodyAfter = finalState.body.byCharacterId[targetId!];
  const staminaCur = targetBodyAfter ? Number(targetBodyAfter.bodyStats.stamina) : 0;

  // 대상 캐릭터가 체력 고갈로 쓰러졌거나 기절(체력 < 500)했는지 체크
  const forceExit = afterTrainDeathCheck.returnValue === 1 || staminaCur < 500;
  const completesTimeBlock = commandResult.definition.completesTimeBlock === true;

  // 이번 커맨드 또는 기존 이력 중 시간 소모가 있었는지 판별
  const didSpendTime = session.interaction.commandFlow.timeSpent === true || completesTimeBlock;
  const currentExecCount = session.interaction.commandFlow.executionCount ?? 0;

  let sessionAfterTraining: GameSession = {
    ...afterTrainDeathCheck.session,
    interaction: {
      ...initialInteractionSessionState,
      participants: session.interaction.participants, // 참가자 유지
      commandFlow: {
        ...session.interaction.commandFlow,
        timeSpent: didSpendTime,
        executionCount: currentExecCount + 1,
      },
      temporaryFlags: {
        ...session.interaction.temporaryFlags, // 기존 임시 플래그 보존
        ...(didSpendTime ? { 'TFLAG:timeSpent': true } : {}), // 하위 호환성 유지
      },
    },
  };

  if (didSpendTime) {
    const turn = endTurn(finalState, {
      ...sessionAfterTraining,
      interaction: initialInteractionSessionState,
    });
    const exitReason = forceExit
      ? '대상 여배우가 체력 고갈로 기절하여 조교가 강제 종료되었습니다.'
      : '시간 소모 커맨드가 완료되어 조교를 종료합니다.';

    return {
      ok: true,
      state: turn.state,
      session: {
        ...turn.session,
        ui: { ...turn.session.ui, route: 'mainMenu' },
      },
      message: `${commandLabel} 완료. ${exitReason}`,
      effects: [
        logEffect(`${commandLabel} training completed.`, 'success'),
        ...afterTrainDeathCheck.effects,
        ...turn.effects,
      ],
    };
  }

  if (forceExit) {
    return {
      ok: true,
      state: finalState,
      session: {
        ...sessionAfterTraining,
        interaction: initialInteractionSessionState,
        ui: { ...sessionAfterTraining.ui, route: 'mainMenu' },
      },
      message: `${commandLabel} 완료. 대상 여배우가 체력 고갈로 기절하여 조교가 강제 종료되었습니다. (시간 소모 없음)`,
      effects: [
        logEffect(`${commandLabel} training completed.`, 'success'),
        ...afterTrainDeathCheck.effects,
      ],
    };
  }

  // 강제퇴실이 아니면 조교방에 그대로 대기
  return {
    ok: true,
    state: finalState,
    session: sessionAfterTraining,
    message: `${commandLabel} 완료.`,
    effects: afterTrainDeathCheck.effects,
  };
}

export function cancelTrainingSelection(session: GameSession): GameSession {
  return {
    ...session,
    interaction: {
      ...initialInteractionSessionState,
      participants: session.interaction.participants, // 참가자(여배우, 조교사, 조수)는 유지!
    },
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
