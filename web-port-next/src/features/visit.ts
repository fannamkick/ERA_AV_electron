import type { VisitSessionState } from '../domains/visit/types';
import { initialVisitSessionState } from '../domains/visit/types';
import type { GameSession, GameState } from '../game/state';
import type { VisitActionView, VisitPlaceView, VisitView } from '../game/views';

export type VisitPlaceDefinition = {
  readonly id: string;
  readonly label: string;
  readonly source: string;
};

export type VisitActionDefinition = {
  readonly id: string;
  readonly placeId: string;
  readonly label: string;
  readonly cost: number;
  readonly unlockKey: string;
  readonly visitProgressKey: string;
  readonly accountingId: string;
  readonly source: string;
};

export type VisitFailure = {
  readonly code: string;
  readonly message: string;
};

export type VisitUpdateResult =
  | {
      readonly ok: true;
      readonly state: GameState;
      readonly session: GameSession;
      readonly message: string;
    }
  | {
      readonly ok: false;
      readonly failure: VisitFailure;
    };

export const visitPlaceDefinitions: readonly VisitPlaceDefinition[] = [
  {
    id: 'organizationOffice',
    label: '조직 사무소',
    source: 'HOUMON.ERB/HOUMON -> KIRYU_GUMI',
  },
];

export const visitActionDefinitions: readonly VisitActionDefinition[] = [
  {
    id: 'organizationOffice.basicRoomPermit',
    placeId: 'organizationOffice',
    label: '기본 방 사용 허가',
    cost: 300,
    unlockKey: 'facility.basicRoom',
    visitProgressKey: 'organizationOffice.basicRoomPermit',
    accountingId: 'visit:organizationOffice:basicRoomPermit',
    source: 'KIRYU_GUMI facility purchase branch',
  },
];

function findPlace(placeId: string): VisitPlaceDefinition | undefined {
  return visitPlaceDefinitions.find((place) => place.id === placeId);
}

function findAction(actionId: string): VisitActionDefinition | undefined {
  return visitActionDefinitions.find((action) => action.id === actionId);
}

function actionDisabledReason(state: GameState, action: VisitActionDefinition): string | undefined {
  if (state.world.unlocks[action.unlockKey]) {
    return '이미 해금된 시설입니다.';
  }

  if (state.economy.account.currentMoney < action.cost) {
    return '돈 부족';
  }

  return undefined;
}

export function computeVisibleVisitPlaceIds(_state: GameState): readonly string[] {
  return visitPlaceDefinitions.map((place) => place.id);
}

function computeVisibleVisitActionIds(state: GameState, placeId: string | undefined): readonly string[] {
  if (!placeId || !findPlace(placeId)) {
    return [];
  }

  return visitActionDefinitions
    .filter((action) => action.placeId === placeId)
    .filter((action) => !state.world.unlocks[action.unlockKey] || state.featureState.visits[action.visitProgressKey] !== undefined)
    .map((action) => action.id);
}

function placeViewFromDefinition(state: GameState, place: VisitPlaceDefinition): VisitPlaceView {
  return {
    placeId: place.id,
    label: place.label,
    source: place.source,
    available: true,
  };
}

function actionViewFromDefinition(state: GameState, action: VisitActionDefinition): VisitActionView {
  const disabledReason = actionDisabledReason(state, action);

  return {
    actionId: action.id,
    placeId: action.placeId,
    label: action.label,
    cost: action.cost,
    source: action.source,
    completed: state.world.unlocks[action.unlockKey] === true,
    available: disabledReason === undefined,
    disabledReason,
  };
}

export function buildVisitView(state: GameState, session: GameSession): VisitView {
  const visiblePlaceIds =
    session.visit.visiblePlaceIds.length > 0 ? session.visit.visiblePlaceIds : computeVisibleVisitPlaceIds(state);
  const visiblePlaces = visiblePlaceIds
    .map((placeId) => findPlace(placeId))
    .filter((place): place is VisitPlaceDefinition => Boolean(place))
    .map((place) => placeViewFromDefinition(state, place));
  const selectedPlace =
    session.visit.selectedPlaceId !== undefined
      ? visiblePlaces.find((place) => place.placeId === session.visit.selectedPlaceId)
      : undefined;
  const visibleActionIds =
    session.visit.visibleActionIds.length > 0
      ? session.visit.visibleActionIds
      : computeVisibleVisitActionIds(state, session.visit.selectedPlaceId);
  const visibleActions = visibleActionIds
    .map((actionId) => findAction(actionId))
    .filter((action): action is VisitActionDefinition => Boolean(action))
    .map((action) => actionViewFromDefinition(state, action));
  const selectedAction =
    session.visit.selectedActionId !== undefined
      ? visibleActions.find((action) => action.actionId === session.visit.selectedActionId)
      : undefined;

  return {
    kind: 'visit',
    route: 'visit',
    currentMoney: state.economy.account.currentMoney,
    visiblePlaces,
    selectedPlaceId: session.visit.selectedPlaceId,
    selectedPlace,
    visibleActions,
    selectedActionId: session.visit.selectedActionId,
    selectedAction,
  };
}

export function createVisitSession(state: GameState): VisitSessionState {
  return {
    selectedPlaceId: undefined,
    selectedActionId: undefined,
    visiblePlaceIds: computeVisibleVisitPlaceIds(state),
    visibleActionIds: [],
  };
}

export function selectVisitPlace(state: GameState, session: GameSession, placeId: string): VisitUpdateResult {
  const place = findPlace(placeId);
  if (!place) {
    return {
      ok: false,
      failure: {
        code: 'visit-place-not-found',
        message: `방문 장소를 찾을 수 없습니다: ${placeId}`,
      },
    };
  }

  if (session.visit.visiblePlaceIds.length > 0 && !session.visit.visiblePlaceIds.includes(placeId)) {
    return {
      ok: false,
      failure: {
        code: 'visit-place-not-in-session',
        message: `현재 방문 화면의 표시 목록에 없는 장소입니다: ${placeId}`,
      },
    };
  }

  return {
    ok: true,
    state,
    session: {
      ...session,
      visit: {
        ...session.visit,
        selectedPlaceId: place.id,
        selectedActionId: undefined,
        visibleActionIds: computeVisibleVisitActionIds(state, place.id),
      },
    },
    message: `${place.label}을 선택했습니다.`,
  };
}

export function selectVisitAction(state: GameState, session: GameSession, actionId: string): VisitUpdateResult {
  const action = findAction(actionId);
  if (!action) {
    return {
      ok: false,
      failure: {
        code: 'visit-action-not-found',
        message: `방문 행동을 찾을 수 없습니다: ${actionId}`,
      },
    };
  }

  if (session.visit.visibleActionIds.length > 0 && !session.visit.visibleActionIds.includes(actionId)) {
    return {
      ok: false,
      failure: {
        code: 'visit-action-not-in-session',
        message: `현재 방문 장소의 표시 목록에 없는 행동입니다: ${actionId}`,
      },
    };
  }

  if (session.visit.selectedPlaceId !== action.placeId) {
    return {
      ok: false,
      failure: {
        code: 'visit-place-selection-required',
        message: '방문 장소를 먼저 선택해야 합니다.',
      },
    };
  }

  return {
    ok: true,
    state,
    session: {
      ...session,
      visit: {
        ...session.visit,
        selectedActionId: action.id,
      },
    },
    message: `${action.label} 행동을 선택했습니다.`,
  };
}

export function confirmVisitAction(state: GameState, session: GameSession): VisitUpdateResult {
  const selectedActionId = session.visit.selectedActionId;
  if (!selectedActionId) {
    return {
      ok: false,
      failure: {
        code: 'visit-action-selection-required',
        message: '실행할 방문 행동을 먼저 선택해야 합니다.',
      },
    };
  }

  const action = findAction(selectedActionId);
  if (!action) {
    return {
      ok: false,
      failure: {
        code: 'visit-action-not-found',
        message: `방문 행동을 찾을 수 없습니다: ${selectedActionId}`,
      },
    };
  }

  if (state.world.unlocks[action.unlockKey]) {
    return {
      ok: false,
      failure: {
        code: 'visit-action-already-complete',
        message: `이미 처리한 방문 행동입니다: ${action.label}`,
      },
    };
  }

  if (state.economy.account.currentMoney < action.cost) {
    return {
      ok: false,
      failure: {
        code: 'not-enough-money',
        message: `돈이 부족합니다. 필요 금액: ${action.cost}Pt`,
      },
    };
  }

  const nextVisits = (state.featureState.visits[action.visitProgressKey] as number | undefined) ?? 0;
  const nextState: GameState = {
    ...state,
    economy: {
      ...state.economy,
      account: {
        currentMoney: state.economy.account.currentMoney - action.cost,
      },
      accountingEntries: [...state.economy.accountingEntries, `${action.accountingId}:total:${action.cost}`],
    },
    world: {
      ...state.world,
      unlocks: {
        ...state.world.unlocks,
        [action.unlockKey]: true,
      },
    },
    featureState: {
      ...state.featureState,
      visits: {
        ...state.featureState.visits,
        [action.visitProgressKey]: nextVisits + 1,
      },
    },
  };

  return {
    ok: true,
    state: nextState,
    session: {
      ...session,
      visit: {
        ...session.visit,
        selectedActionId: undefined,
        visibleActionIds: computeVisibleVisitActionIds(nextState, action.placeId),
      },
    },
    message: `${action.label}을 처리했습니다.`,
  };
}

export function cancelVisitSelection(state: GameState, session: GameSession): VisitUpdateResult {
  return {
    ok: true,
    state,
    session: {
      ...session,
      visit: {
        ...session.visit,
        selectedPlaceId: undefined,
        selectedActionId: undefined,
        visibleActionIds: [],
      },
    },
    message: '방문 장소 선택을 취소했습니다.',
  };
}

export function cancelVisit(session: GameSession): GameSession {
  return {
    ...session,
    visit: initialVisitSessionState,
    ui: {
      ...session.ui,
      route: 'mainMenu',
      choices: [],
    },
  };
}
