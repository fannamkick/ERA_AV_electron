import { getTrainingCommandDefinition } from '../catalog/lookup';
import type { CatalogId, GameDefinitions, TrainingCommandDefinition } from '../catalog/types';
import type { CharacterBodyState } from '../domains/body/types';
import { initialInteractionSessionState, type InteractionSessionState } from '../domains/interaction/types';
import { logEffect, type GameEffect } from '../game/effects';
import type { GameSession, GameState } from '../game/state';
import type { TrainingCommandView, TrainingParticipantView, TrainingView } from '../game/views';
import { isCharacterActive } from './characterLifecycle';
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

function trainingCommandDisabledReason(
  state: GameState,
  session: GameSession,
  command: TrainingCommandDefinition,
): string | undefined {
  if (command.defaultAvailable !== true && state.featureState.unlocks[`training:${command.id}`] !== true) {
    return 'Training command is not available yet.';
  }

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

  return undefined;
}

export function computeVisibleTrainingParticipantIds(state: GameState): readonly string[] {
  return Object.keys(state.people.characters).sort();
}

export function computeVisibleTrainingCommandIds(definitions: GameDefinitions, state: GameState): readonly CatalogId[] {
  return Object.values(definitions.trainingCommands)
    .filter((command) => command.defaultAvailable === true || state.featureState.unlocks[`training:${command.id}`] === true)
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

function bufferSummary(session: GameSession): TrainingView['bufferSummary'] {
  const stimulusTotal = Object.values(session.interaction.sources).reduce((total, value) => total + value, 0);
  const paramUpTotal = Object.values(session.interaction.paramDeltas).reduce((total, value) => total + value.up, 0);
  const bodyCostTotal = Object.values(session.interaction.baseLoss).reduce((total, value) => total + value, 0);

  return {
    stimulusTotal,
    paramUpTotal,
    bodyCostTotal,
  };
}

export function buildTrainingView(definitions: GameDefinitions, state: GameState, session: GameSession): TrainingView {
  const participantIds = computeVisibleTrainingParticipantIds(state);
  const participants = participantIds
    .map((characterId) => participantViewFromState(state, characterId))
    .filter((participant): participant is TrainingParticipantView => Boolean(participant));
  const visibleCommandIds = computeVisibleTrainingCommandIds(definitions, state);
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
  };
}

export function createTrainingSession(): InteractionSessionState {
  return initialInteractionSessionState;
}

function clearTrainingCommandBuffers(interaction: InteractionSessionState): InteractionSessionState {
  return {
    ...interaction,
    commandFlow: {},
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
  return {
    ...session,
    interaction: {
      ...session.interaction,
      commandFlow: {
        ...session.interaction.commandFlow,
        selectedCommandId: result.commandId,
      },
      sources: result.stimulusDeltas,
      paramDeltas: result.paramDeltas,
      baseLoss: baseLossFromBodyDeltas(result.bodyStatDeltas),
      resultBuffers: {
        ...session.interaction.resultBuffers,
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

  const nextConditionParams = { ...body.conditionParams };
  for (const [paramId, delta] of Object.entries(result.paramDeltas)) {
    nextConditionParams[paramId] = (nextConditionParams[paramId] ?? 0) + delta.up - delta.down;
  }

  const nextBodyStats = { ...body.bodyStats };
  for (const [statId, delta] of Object.entries(result.bodyStatDeltas)) {
    nextBodyStats[statId] = (nextBodyStats[statId] ?? 0) + delta;
  }

  const nextTrainingResources = { ...body.trainingResources };
  for (const [resourceId, delta] of Object.entries(result.resourceDeltas)) {
    nextTrainingResources[resourceId] = (nextTrainingResources[resourceId] ?? 0) + delta;
  }

  return {
    ...body,
    conditionParams: nextConditionParams,
    bodyStats: nextBodyStats,
    trainingResources: nextTrainingResources,
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
  const sessionAfterTraining: GameSession = {
    ...session,
    interaction: initialInteractionSessionState,
  };
  const turn = commandResult.definition.completesTimeBlock === true ? endTurn(stateAfterTraining, sessionAfterTraining) : undefined;

  if (turn) {
    return {
      ok: true,
      state: turn.state,
      session: turn.session,
      message: `${commandResult.definition.label} training completed.`,
      effects: [
        logEffect(`${commandResult.definition.label} training result applied.`, 'success'),
        ...turn.effects,
      ],
    };
  }

  return {
    ok: true,
    state: stateAfterTraining,
    session: sessionAfterTraining,
    message: `${commandResult.definition.label} training completed.`,
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
