import { getWorkDefinition } from '../catalog/lookup';
import type { CatalogId, GameDefinitions, WorkDefinition } from '../catalog/types';
import type { CharacterBodyState } from '../domains/body/types';
import { initialWorkSessionState } from '../domains/workSession/types';
import { logEffect, type GameEffect } from '../game/effects';
import type { GameSession, GameState } from '../game/state';
import type { WorkCharacterCandidateView, WorkListingView, WorkView } from '../game/views';
import { endTurn } from './turnEnd';

export type WorkFailure = {
  readonly code: string;
  readonly message: string;
};

export type WorkCalculatedResult = {
  readonly workId: CatalogId;
  readonly characterId: string;
  readonly rewardMoney: number;
  readonly bodyStatDeltas: Record<string, number>;
  readonly experienceDeltas: Record<CatalogId, number>;
};

export type WorkUpdateResult =
  | {
      readonly ok: true;
      readonly state: GameState;
      readonly session: GameSession;
      readonly message: string;
      readonly effects?: readonly GameEffect[];
    }
  | {
      readonly ok: false;
      readonly failure: WorkFailure;
    };

function workDisabledReason(state: GameState, work: WorkDefinition): string | undefined {
  if (!work.defaultAvailable) {
    return '아직 표시 조건을 만족하지 않았습니다.';
  }

  if (Object.keys(state.people.characters).length === 0) {
    return '참여 가능한 인물이 없습니다.';
  }

  return undefined;
}

function eligibleCharacterIds(state: GameState): readonly string[] {
  return Object.values(state.people.characters)
    .filter((character) => !character.flags.lifecycle.retired)
    .map((character) => character.id)
    .sort();
}

export function computeVisibleWorkIds(definitions: GameDefinitions, state: GameState): readonly CatalogId[] {
  return Object.values(definitions.workDefinitions)
    .filter((work) => work.defaultAvailable || state.work.brothelFlags[`visible:${work.id}`] === true)
    .map((work) => work.id)
    .sort();
}

function workViewFromDefinition(state: GameState, work: WorkDefinition): WorkListingView {
  const disabledReason = workDisabledReason(state, work);

  return {
    workId: work.id,
    label: work.label,
    rewardMoney: work.rewardMoney,
    completesTimeBlock: work.completesTimeBlock,
    available: disabledReason === undefined,
    disabledReason,
  };
}

function characterViewFromState(state: GameState, characterId: string): WorkCharacterCandidateView | undefined {
  const character = state.people.characters[characterId];
  if (!character) {
    return undefined;
  }

  const available = !character.flags.lifecycle.retired;

  return {
    characterId,
    label: character.identity.displayName,
    available,
    disabledReason: available ? undefined : '은퇴한 인물입니다.',
  };
}

export function buildWorkView(definitions: GameDefinitions, state: GameState, session: GameSession): WorkView {
  const visibleWorkIds = session.work.visibleWorkIds.length > 0 ? session.work.visibleWorkIds : computeVisibleWorkIds(definitions, state);
  const visibleWorks = visibleWorkIds
    .map((workId) => getWorkDefinition(definitions, workId))
    .filter((result): result is { readonly ok: true; readonly definition: WorkDefinition } => result.ok)
    .map((result) => workViewFromDefinition(state, result.definition));
  const selectedWork =
    session.work.selectedWorkId !== undefined
      ? visibleWorks.find((work) => work.workId === session.work.selectedWorkId)
      : undefined;
  const candidateIds =
    session.work.eligibleCharacterIds.length > 0 ? session.work.eligibleCharacterIds : eligibleCharacterIds(state);
  const eligibleCharacters = candidateIds
    .map((characterId) => characterViewFromState(state, characterId))
    .filter((candidate): candidate is WorkCharacterCandidateView => Boolean(candidate));
  const selectedCharacter =
    session.work.selectedCharacterId !== undefined
      ? eligibleCharacters.find((candidate) => candidate.characterId === session.work.selectedCharacterId)
      : undefined;

  return {
    kind: 'work',
    route: 'work',
    currentMoney: state.economy.account.currentMoney,
    visibleWorks,
    selectedWorkId: session.work.selectedWorkId,
    selectedWork,
    eligibleCharacters,
    selectedCharacterId: session.work.selectedCharacterId,
    selectedCharacter,
  };
}

export function createWorkSession(definitions: GameDefinitions, state: GameState) {
  return {
    selectedWorkId: undefined,
    selectedCharacterId: undefined,
    visibleWorkIds: computeVisibleWorkIds(definitions, state),
    eligibleCharacterIds: eligibleCharacterIds(state),
  };
}

export function selectWork(
  definitions: GameDefinitions,
  state: GameState,
  session: GameSession,
  workId: CatalogId,
): WorkUpdateResult {
  const workResult = getWorkDefinition(definitions, workId);
  if (!workResult.ok) {
    return {
      ok: false,
      failure: workResult.failure,
    };
  }

  if (session.work.visibleWorkIds.length > 0 && !session.work.visibleWorkIds.includes(workId)) {
    return {
      ok: false,
      failure: {
        code: 'work-not-in-session',
        message: `현재 업무 목록에 없는 업무입니다: ${workId}`,
      },
    };
  }

  return {
    ok: true,
    state,
    session: {
      ...session,
      work: {
        ...session.work,
        selectedWorkId: workResult.definition.id,
      },
    },
    message: `${workResult.definition.label} 업무를 선택했습니다.`,
  };
}

export function selectWorkCharacter(state: GameState, session: GameSession, characterId: string): WorkUpdateResult {
  if (!state.people.characters[characterId]) {
    return {
      ok: false,
      failure: {
        code: 'work-character-not-found',
        message: `업무 참여 인물을 찾을 수 없습니다: ${characterId}`,
      },
    };
  }

  if (session.work.eligibleCharacterIds.length > 0 && !session.work.eligibleCharacterIds.includes(characterId)) {
    return {
      ok: false,
      failure: {
        code: 'work-character-not-in-session',
        message: `현재 업무 화면의 참여 후보가 아닙니다: ${characterId}`,
      },
    };
  }

  return {
    ok: true,
    state,
    session: {
      ...session,
      work: {
        ...session.work,
        selectedCharacterId: characterId,
      },
    },
    message: `${state.people.characters[characterId].identity.displayName}을 업무 참여 인물로 선택했습니다.`,
  };
}

function validateWorkExecution(state: GameState, work: WorkDefinition, characterId: string | undefined): WorkFailure | undefined {
  const disabledReason = workDisabledReason(state, work);
  if (disabledReason) {
    return {
      code: 'work-unavailable',
      message: disabledReason,
    };
  }

  if (!characterId) {
    return {
      code: 'work-character-required',
      message: '업무에 참여할 인물을 먼저 선택해야 합니다.',
    };
  }

  const character = state.people.characters[characterId];
  if (!character) {
    return {
      code: 'work-character-not-found',
      message: `업무 참여 인물을 찾을 수 없습니다: ${characterId}`,
    };
  }

  if (character.flags.lifecycle.retired) {
    return {
      code: 'work-character-unavailable',
      message: `업무에 참여할 수 없는 인물입니다: ${character.identity.displayName}`,
    };
  }

  return undefined;
}

export function calculateWorkResult(work: WorkDefinition, characterId: string): WorkCalculatedResult {
  return {
    workId: work.id,
    characterId,
    rewardMoney: work.rewardMoney,
    bodyStatDeltas: { ...work.bodyStatDeltas },
    experienceDeltas: { ...work.experienceDeltas },
  };
}

function applyBodyStatDeltas(body: CharacterBodyState | undefined, deltas: Record<string, number>): CharacterBodyState | undefined {
  if (!body) {
    return body;
  }

  const nextBodyStats = { ...body.bodyStats };
  for (const [statId, delta] of Object.entries(deltas)) {
    nextBodyStats[statId] = (nextBodyStats[statId] ?? 0) + delta;
  }

  return {
    ...body,
    bodyStats: nextBodyStats,
  };
}

export function applyWorkResult(state: GameState, result: WorkCalculatedResult): GameState {
  const character = state.people.characters[result.characterId];
  const currentCareerFlags = state.work.careerFlagsByCharacterId[result.characterId] ?? {};
  const currentAssignments = state.work.assignments;
  const nextExperiences = { ...(character?.attributes.experiences ?? {}) };
  for (const [experienceId, delta] of Object.entries(result.experienceDeltas)) {
    nextExperiences[experienceId] = (nextExperiences[experienceId] ?? 0) + delta;
  }

  return {
    ...state,
    economy: {
      ...state.economy,
      account: {
        currentMoney: state.economy.account.currentMoney + result.rewardMoney,
      },
      accountingEntries: [...state.economy.accountingEntries, `work:${result.workId}:character:${result.characterId}:reward:${result.rewardMoney}`],
    },
    people: character
      ? {
          characters: {
            ...state.people.characters,
            [result.characterId]: {
              ...character,
              attributes: {
                ...character.attributes,
                experiences: nextExperiences,
              },
            },
          },
        }
      : state.people,
    body: {
      byCharacterId: {
        ...state.body.byCharacterId,
        ...(state.body.byCharacterId[result.characterId]
          ? {
              [result.characterId]: applyBodyStatDeltas(state.body.byCharacterId[result.characterId], result.bodyStatDeltas)!,
            }
          : {}),
      },
    },
    work: {
      ...state.work,
      assignments: {
        ...currentAssignments,
        [result.characterId]: {
          characterId: result.characterId,
          workTypeId: result.workId,
          active: false,
        },
      },
      careerFlagsByCharacterId: {
        ...state.work.careerFlagsByCharacterId,
        [result.characterId]: {
          ...currentCareerFlags,
          [`${result.workId}.completedCount`]: ((currentCareerFlags[`${result.workId}.completedCount`] as number | undefined) ?? 0) + 1,
        },
      },
    },
  };
}

export function executeSelectedWork(
  definitions: GameDefinitions,
  state: GameState,
  session: GameSession,
): WorkUpdateResult {
  const selectedWorkId = session.work.selectedWorkId;
  if (!selectedWorkId) {
    return {
      ok: false,
      failure: {
        code: 'work-selection-required',
        message: '실행할 업무를 먼저 선택해야 합니다.',
      },
    };
  }

  const workResult = getWorkDefinition(definitions, selectedWorkId);
  if (!workResult.ok) {
    return {
      ok: false,
      failure: workResult.failure,
    };
  }

  const failure = validateWorkExecution(state, workResult.definition, session.work.selectedCharacterId);
  if (failure) {
    return {
      ok: false,
      failure,
    };
  }

  const calculatedResult = calculateWorkResult(workResult.definition, session.work.selectedCharacterId!);
  const stateAfterWork = applyWorkResult(state, calculatedResult);
  const sessionAfterWork: GameSession = {
    ...session,
    work: initialWorkSessionState,
  };
  const turn = workResult.definition.completesTimeBlock ? endTurn(stateAfterWork, sessionAfterWork) : undefined;

  if (turn) {
    return {
      ok: true,
      state: turn.state,
      session: turn.session,
      message: `${workResult.definition.label} 업무를 완료했습니다.`,
      effects: [
        logEffect(`${workResult.definition.label} 업무 결과를 반영했습니다.`, 'success'),
        ...turn.effects,
      ],
    };
  }

  return {
    ok: true,
    state: stateAfterWork,
    session: sessionAfterWork,
    message: `${workResult.definition.label} 업무를 완료했습니다.`,
  };
}

export function cancelWork(session: GameSession): GameSession {
  return {
    ...session,
    work: initialWorkSessionState,
    ui: {
      ...session.ui,
      route: 'mainMenu',
      choices: [],
    },
  };
}
