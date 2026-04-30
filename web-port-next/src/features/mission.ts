import { getMissionDefinition } from '../catalog/lookup';
import type { CatalogId, GameDefinitions, MissionDefinition } from '../catalog/types';
import type { MissionProgress, MissionStatus } from '../domains/mission/types';
import { initialMissionSessionState } from '../domains/missionSession/types';
import type { GameSession, GameState } from '../game/state';
import type { MissionListingView, MissionView } from '../game/views';

export type MissionFailure = {
  readonly code: string;
  readonly message: string;
};

export type MissionUpdateResult =
  | {
      readonly ok: true;
      readonly state: GameState;
      readonly session: GameSession;
      readonly message: string;
    }
  | {
      readonly ok: false;
      readonly failure: MissionFailure;
    };

function missionProgress(state: GameState, missionId: CatalogId): MissionProgress | undefined {
  return state.mission.byMissionId[missionId];
}

function missionStatus(state: GameState, mission: MissionDefinition): MissionStatus {
  const progress = missionProgress(state, mission.id);
  if (progress) {
    return progress.status;
  }

  return mission.defaultAvailable ? 'available' : 'locked';
}

function missionDisabledReason(state: GameState, mission: MissionDefinition): string | undefined {
  const status = missionStatus(state, mission);
  if (status === 'locked') return '아직 표시 조건을 만족하지 않았습니다.';
  if (status === 'completed') return '이미 완료한 미션입니다.';
  if (status === 'failed') return '이미 실패한 미션입니다.';
  return undefined;
}

export function computeVisibleMissionIds(definitions: GameDefinitions, state: GameState): readonly CatalogId[] {
  return Object.values(definitions.missionDefinitions)
    .filter((mission) => mission.defaultAvailable || missionProgress(state, mission.id) !== undefined)
    .map((mission) => mission.id)
    .sort();
}

function missionViewFromDefinition(state: GameState, mission: MissionDefinition): MissionListingView {
  const progress = missionProgress(state, mission.id);
  const status = missionStatus(state, mission);
  const disabledReason = missionDisabledReason(state, mission);

  return {
    missionId: mission.id,
    label: mission.label,
    status,
    rewardMoney: mission.rewardMoney,
    remainingWeeks: progress?.remainingWeeks ?? mission.deadlineWeeks,
    available: disabledReason === undefined,
    disabledReason,
  };
}

export function buildMissionView(definitions: GameDefinitions, state: GameState, session: GameSession): MissionView {
  const visibleMissionIds =
    session.mission.visibleMissionIds.length > 0 ? session.mission.visibleMissionIds : computeVisibleMissionIds(definitions, state);
  const visibleMissions = visibleMissionIds
    .map((missionId) => getMissionDefinition(definitions, missionId))
    .filter((result): result is { readonly ok: true; readonly definition: MissionDefinition } => result.ok)
    .map((result) => missionViewFromDefinition(state, result.definition));
  const selectedMission =
    session.mission.selectedMissionId !== undefined
      ? visibleMissions.find((mission) => mission.missionId === session.mission.selectedMissionId)
      : undefined;

  return {
    kind: 'mission',
    route: 'mission',
    currentMoney: state.economy.account.currentMoney,
    visibleMissions,
    selectedMissionId: session.mission.selectedMissionId,
    selectedMission,
  };
}

export function createMissionSession(definitions: GameDefinitions, state: GameState) {
  return {
    selectedMissionId: undefined,
    visibleMissionIds: computeVisibleMissionIds(definitions, state),
  };
}

function firstCharacterId(state: GameState): string | undefined {
  return Object.keys(state.people.characters).sort()[0];
}

export function selectMission(
  definitions: GameDefinitions,
  state: GameState,
  session: GameSession,
  missionId: CatalogId,
): MissionUpdateResult {
  const missionResult = getMissionDefinition(definitions, missionId);
  if (!missionResult.ok) {
    return {
      ok: false,
      failure: missionResult.failure,
    };
  }

  if (session.mission.visibleMissionIds.length > 0 && !session.mission.visibleMissionIds.includes(missionId)) {
    return {
      ok: false,
      failure: {
        code: 'mission-not-in-session',
        message: `현재 미션 목록에 없는 미션입니다: ${missionId}`,
      },
    };
  }

  return {
    ok: true,
    state,
    session: {
      ...session,
      mission: {
        ...session.mission,
        selectedMissionId: missionResult.definition.id,
      },
    },
    message: `${missionResult.definition.label} 미션을 선택했습니다.`,
  };
}

export function acceptSelectedMission(
  definitions: GameDefinitions,
  state: GameState,
  session: GameSession,
): MissionUpdateResult {
  const selectedMissionId = session.mission.selectedMissionId;
  if (!selectedMissionId) {
    return {
      ok: false,
      failure: {
        code: 'mission-selection-required',
        message: '수락할 미션을 먼저 선택해야 합니다.',
      },
    };
  }

  const missionResult = getMissionDefinition(definitions, selectedMissionId);
  if (!missionResult.ok) {
    return {
      ok: false,
      failure: missionResult.failure,
    };
  }

  const mission = missionResult.definition;
  const status = missionStatus(state, mission);
  if (status !== 'available') {
    return {
      ok: false,
      failure: {
        code: `mission-${status}`,
        message: `수락 가능한 미션이 아닙니다: ${mission.label}`,
      },
    };
  }

  const acceptedByCharacterId = firstCharacterId(state);
  if (!acceptedByCharacterId) {
    return {
      ok: false,
      failure: {
        code: 'mission-actor-required',
        message: '미션을 수락할 인물이 없습니다.',
      },
    };
  }

  const nextState: GameState = {
    ...state,
    mission: {
      ...state.mission,
      byMissionId: {
        ...state.mission.byMissionId,
        [mission.id]: {
          status: 'accepted',
          progressBand: 0,
          acceptedByCharacterId,
          rewardClaimed: false,
          remainingWeeks: mission.deadlineWeeks,
        },
      },
      acceptedCountsByCharacterId: {
        ...state.mission.acceptedCountsByCharacterId,
        [acceptedByCharacterId]: (state.mission.acceptedCountsByCharacterId[acceptedByCharacterId] ?? 0) + 1,
      },
    },
  };

  return {
    ok: true,
    state: nextState,
    session: {
      ...session,
      mission: {
        ...session.mission,
        visibleMissionIds: computeVisibleMissionIds(definitions, nextState),
      },
    },
    message: `${mission.label} 미션을 수락했습니다.`,
  };
}

export function reportSelectedMission(
  definitions: GameDefinitions,
  state: GameState,
  session: GameSession,
): MissionUpdateResult {
  const selectedMissionId = session.mission.selectedMissionId;
  if (!selectedMissionId) {
    return {
      ok: false,
      failure: {
        code: 'mission-selection-required',
        message: '보고할 미션을 먼저 선택해야 합니다.',
      },
    };
  }

  const missionResult = getMissionDefinition(definitions, selectedMissionId);
  if (!missionResult.ok) {
    return {
      ok: false,
      failure: missionResult.failure,
    };
  }

  const mission = missionResult.definition;
  const progress = missionProgress(state, mission.id);
  if (!progress || progress.status !== 'accepted') {
    return {
      ok: false,
      failure: {
        code: 'mission-not-accepted',
        message: `수락 중인 미션이 아닙니다: ${mission.label}`,
      },
    };
  }

  if (mission.requiredWorldUnlockKey && !state.world.unlocks[mission.requiredWorldUnlockKey]) {
    return {
      ok: false,
      failure: {
        code: 'mission-report-condition-unmet',
        message: `미션 보고 조건을 만족하지 않았습니다: ${mission.label}`,
      },
    };
  }

  const nextState: GameState = {
    ...state,
    economy: {
      ...state.economy,
      account: {
        currentMoney: state.economy.account.currentMoney + mission.rewardMoney,
      },
      accountingEntries: [...state.economy.accountingEntries, `mission:${mission.id}:reward:${mission.rewardMoney}`],
    },
    mission: {
      ...state.mission,
      byMissionId: {
        ...state.mission.byMissionId,
        [mission.id]: {
          ...progress,
          status: 'completed',
          progressBand: 100,
          rewardClaimed: true,
        },
      },
      missionFlags: {
        ...state.mission.missionFlags,
        [`${mission.id}.reportedAtTurn`]: state.run.clock.turn,
      },
    },
  };

  return {
    ok: true,
    state: nextState,
    session: {
      ...session,
      mission: {
        selectedMissionId: undefined,
        visibleMissionIds: computeVisibleMissionIds(definitions, nextState),
      },
    },
    message: `${mission.label} 미션을 보고하고 보상을 받았습니다.`,
  };
}

export function cancelMission(session: GameSession): GameSession {
  return {
    ...session,
    mission: initialMissionSessionState,
    ui: {
      ...session.ui,
      route: 'mainMenu',
      choices: [],
    },
  };
}
