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
  readonly unlockKey?: string;
  readonly visitProgressKey: string;
  readonly accountingId: string;
  readonly source: string;
  readonly sourceFile: string;
  readonly sourceLabel: string;
  readonly resultOwner: 'featureState.visits' | 'world.unlocks' | 'world.eventFlags';
  readonly repeatable?: boolean;
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

type VisitSourceGroup = {
  readonly placeId: string;
  readonly labels: readonly string[];
};

export const visitPlaceDefinitions: readonly VisitPlaceDefinition[] = [
  { id: 'organizationOffice', label: 'Kiryu organization office', source: 'HOUMON.ERB visit-place:10' },
  { id: 'secretLaboratory', label: 'Secret laboratory', source: 'HOUMON.ERB visit-place:11' },
  { id: 'rachelWorkshop', label: 'Rachel workshop', source: 'HOUMON.ERB visit-place:12' },
  { id: 'ikumiLaboratory', label: 'Ikumi laboratory', source: 'HOUMON.ERB visit-place:13' },
  { id: 'sakuraHideout', label: 'RB hideout', source: 'HOUMON.ERB visit-place:14' },
  { id: 'miyakoHouse', label: 'Tomoyoshi house', source: 'HOUMON.ERB visit-place:15' },
  { id: 'akashaHeadquarters', label: 'Akasha headquarters', source: 'HOUMON.ERB visit-place:16' },
];

const visitSourceGroups: Record<string, VisitSourceGroup> = {
  'AYANO_ORDER.ERB': {
    placeId: 'akashaHeadquarters',
    labels: ['AYANO_ORDER'],
  },
  'AYANO_ORDER_DETAIL.ERB': {
    placeId: 'akashaHeadquarters',
    labels: ['SECURITY_UP', 'SECURITY_DOWN', 'ADD_FUMIKA'],
  },
  'ELLEN_MISSION.ERB': {
    placeId: 'akashaHeadquarters',
    labels: ['ELLEN_MISSION'],
  },
  'ELLEN_MISSION_DETAIL.ERB': {
    placeId: 'akashaHeadquarters',
    labels: ['MISSION_START', 'KOISORA_ADD', 'ELLEN_EXTRAACTRESS'],
  },
  'EUNICE_LABO.ERB': {
    placeId: 'secretLaboratory',
    labels: ['EUNICE_LABO'],
  },
  'EUNICE_LABO_DETAIL.ERB': {
    placeId: 'secretLaboratory',
    labels: [
      'BREAK_PRIDE_HIGH',
      'BREAK_PRIDE_LOW',
      'BREAK_PRIDE_NEUTRAL',
      'BREAK_XTC_POSITIVE',
      'BREAK_XTC_NEGATIVE',
      'BREAK_XTC_NEUTRAL',
      'BREAK_SM_SADIST',
      'BREAK_SM_MASOCHIST',
      'BREAK_SM_NEUTRAL',
      'CHANGE_WORK',
      'CHANGE_VIRGINITY',
      'CHANGE_FALLEN',
    ],
  },
  'HOUMON.ERB': {
    placeId: 'organizationOffice',
    labels: ['HOUMON'],
  },
  'IKUMI_LABO.ERB': {
    placeId: 'ikumiLaboratory',
    labels: ['IKUMI_LABO'],
  },
  'IKUMI_LABO_CALC.ERB': {
    placeId: 'ikumiLaboratory',
    labels: ['ADD_IKUMI_ANDROID'],
  },
  'IKUMI_LABO_DETAIL.ERB': {
    placeId: 'ikumiLaboratory',
    labels: ['KILL_PREGNANCY', 'ABLCHANGE', 'ABLCHANGE_DATAIL', 'SUCCUBUS_CHANGE', 'ADD_ANDROID', 'BOOST_ITEM40'],
  },
  'KANON_ORDER.ERB': {
    placeId: 'akashaHeadquarters',
    labels: ['KANON_ORDER'],
  },
  'KANON_ORDER_DETAIL.ERB': {
    placeId: 'akashaHeadquarters',
    labels: ['BOYFRIEND_LOST', 'TATTO', 'BODYGUARD', 'ADD_IDOL', 'ADD_VA', 'ADD_SHISETU'],
  },
  'KIRYU_GUMI.ERB': {
    placeId: 'organizationOffice',
    labels: ['KIRYU_GUMI', 'BOUGHT_ROOM', 'BOUGHT_LYCEE', 'BOUGHT_DOG'],
  },
  'MIYAKO_LABO.ERB': {
    placeId: 'miyakoHouse',
    labels: ['MIYAKO_LABO_OP', 'MIYAKO_LABO', 'MIYAKO_LABO_VIDEOSELL', 'MIYAKO_VIDEOSALE_PRINT'],
  },
  'MIYAKO_LABO2.ERB': {
    placeId: 'miyakoHouse',
    labels: ['MIYAKO_LABO_SYMPHOGEAR'],
  },
  'RACHEL_LABO.ERB': {
    placeId: 'rachelWorkshop',
    labels: ['RACHEL_LABO'],
  },
  'RACHEL_LABO_DETAIL.ERB': {
    placeId: 'rachelWorkshop',
    labels: ['BASEHP_UP', 'BASESP_UP', 'ADD_LOVE', 'ADD_LEWD', 'ANTIAGING', 'ADD_SUCCUBUS', 'ADD_REENA', 'ADD_TENTACLE'],
  },
  'SAKURA_AZITO.ERB': {
    placeId: 'sakuraHideout',
    labels: ['SAKURA_AZITO'],
  },
  'SAKURA_AZITO_DETAIL.ERB': {
    placeId: 'sakuraHideout',
    labels: [
      'CHASTITY_UP',
      'CHASTITY_DOWN',
      'CHASTITY_NEUTRAL',
      'SHAME_UP',
      'SHAME_DOWN',
      'SHAME_NEUTRAL',
      'PERSONALITY_GENTLE',
      'PERSONALITY_BRAZEN',
      'PERSONALITY_QUIET',
      'PERSONALITY_LIVELY',
      'PERSONALITY_NEUTRAL',
      'PERSONALITY_GAL',
      'GAL_NEUTRAL',
      'KICKINGHORSE',
    ],
  },
  'SHOP_LABO.ERB': {
    placeId: 'secretLaboratory',
    labels: [
      'SECRET_LABO',
      'MODIFY_BUSTUP',
      'MODIFY_BUSTDOWN',
      'MODIFY_BONYU',
      'MODIFY_FUTANARI',
      'MODIFY_FUTANARI_ERASE',
      'MODIFY_ANIMAL',
      'MODIFY_ANIMAL_ERASE',
      'MODIFY_REMOVEHAIR',
      'MODIFY_DEIMMATURITY',
      'MODIFY_AMNESIA',
      'MODIFY_BONYU_ERASE',
      'MODIFY_OMORASHI_ERASE',
      'SHOJO_SAISEI',
      'TRANS_SEX',
      'BRAIN_WASHING',
    ],
  },
};

function visitActionId(sourceFile: string, sourceLabel: string): string {
  if (sourceFile === 'KIRYU_GUMI.ERB' && sourceLabel === 'BOUGHT_ROOM') {
    return 'organizationOffice.basicRoomPermit';
  }

  return `visit.${sourceFile.replace(/\.ERB$/u, '').toLowerCase()}.${sourceLabel.toLowerCase()}`;
}

function visitActionCost(sourceFile: string, sourceLabel: string): number {
  if (sourceFile === 'KIRYU_GUMI.ERB' && sourceLabel === 'BOUGHT_ROOM') return 300;
  if (sourceFile === 'KIRYU_GUMI.ERB' && sourceLabel === 'BOUGHT_LYCEE') return 500;
  if (sourceFile === 'KIRYU_GUMI.ERB' && sourceLabel === 'BOUGHT_DOG') return 200;
  if (sourceFile === 'SHOP_LABO.ERB') return 100;
  return 0;
}

function visitActionUnlockKey(sourceFile: string, sourceLabel: string): string | undefined {
  if (sourceFile === 'KIRYU_GUMI.ERB' && sourceLabel === 'BOUGHT_ROOM') return 'facility.basicRoom';
  if (sourceFile === 'KIRYU_GUMI.ERB' && sourceLabel === 'BOUGHT_LYCEE') return 'facility.lycee';
  if (sourceFile === 'KIRYU_GUMI.ERB' && sourceLabel === 'BOUGHT_DOG') return 'facility.dog';
  if (sourceLabel === 'SECRET_LABO') return 'facility.secretLaboratory';
  if (sourceLabel === 'ADD_SHISETU') return 'facility.kanonOrder';
  return undefined;
}

function visitActionResultOwner(sourceFile: string, sourceLabel: string): VisitActionDefinition['resultOwner'] {
  if (visitActionUnlockKey(sourceFile, sourceLabel)) return 'world.unlocks';
  if (sourceFile.endsWith('_DETAIL.ERB') || sourceFile === 'IKUMI_LABO_CALC.ERB') return 'featureState.visits';
  return 'world.eventFlags';
}

function createVisitActionDefinition(sourceFile: string, sourceLabel: string, group: VisitSourceGroup): VisitActionDefinition {
  const id = visitActionId(sourceFile, sourceLabel);
  return {
    id,
    placeId: group.placeId,
    label: sourceLabel.replace(/_/gu, ' '),
    cost: visitActionCost(sourceFile, sourceLabel),
    unlockKey: visitActionUnlockKey(sourceFile, sourceLabel),
    visitProgressKey: id,
    accountingId: `visit:${id}`,
    source: `original-game/ERB/visit/${sourceFile}:${sourceLabel}`,
    sourceFile,
    sourceLabel,
    resultOwner: visitActionResultOwner(sourceFile, sourceLabel),
  };
}

export const visitActionDefinitions: readonly VisitActionDefinition[] = Object.entries(visitSourceGroups).flatMap(
  ([sourceFile, group]) => group.labels.map((sourceLabel) => createVisitActionDefinition(sourceFile, sourceLabel, group)),
);

function findPlace(placeId: string): VisitPlaceDefinition | undefined {
  return visitPlaceDefinitions.find((place) => place.id === placeId);
}

function findAction(actionId: string): VisitActionDefinition | undefined {
  return visitActionDefinitions.find((action) => action.id === actionId);
}

function actionCompleted(state: GameState, action: VisitActionDefinition): boolean {
  return state.featureState.visits[action.visitProgressKey] !== undefined || Boolean(action.unlockKey && state.world.unlocks[action.unlockKey]);
}

function actionDisabledReason(state: GameState, action: VisitActionDefinition): string | undefined {
  if (!action.repeatable && actionCompleted(state, action)) {
    return 'already completed';
  }

  if (state.economy.account.currentMoney < action.cost) {
    return 'not enough money';
  }

  return undefined;
}

export function computeVisibleVisitPlaceIds(_state: GameState): readonly string[] {
  return visitPlaceDefinitions.map((place) => place.id);
}

function computeVisibleVisitActionIds(_state: GameState, placeId: string | undefined): readonly string[] {
  if (!placeId || !findPlace(placeId)) {
    return [];
  }

  return visitActionDefinitions.filter((action) => action.placeId === placeId).map((action) => action.id);
}

function placeViewFromDefinition(_state: GameState, place: VisitPlaceDefinition): VisitPlaceView {
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
    completed: actionCompleted(state, action),
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
        message: `Visit place not found: ${placeId}`,
      },
    };
  }

  if (session.visit.visiblePlaceIds.length > 0 && !session.visit.visiblePlaceIds.includes(placeId)) {
    return {
      ok: false,
      failure: {
        code: 'visit-place-not-in-session',
        message: `Visit place is not visible in the current session: ${placeId}`,
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
    message: `Visit place selected: ${place.label}`,
  };
}

export function selectVisitAction(state: GameState, session: GameSession, actionId: string): VisitUpdateResult {
  const action = findAction(actionId);
  if (!action) {
    return {
      ok: false,
      failure: {
        code: 'visit-action-not-found',
        message: `Visit action not found: ${actionId}`,
      },
    };
  }

  if (session.visit.visibleActionIds.length > 0 && !session.visit.visibleActionIds.includes(actionId)) {
    return {
      ok: false,
      failure: {
        code: 'visit-action-not-in-session',
        message: `Visit action is not visible in the current session: ${actionId}`,
      },
    };
  }

  if (session.visit.selectedPlaceId !== action.placeId) {
    return {
      ok: false,
      failure: {
        code: 'visit-place-selection-required',
        message: 'Select a visit place before selecting an action.',
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
    message: `Visit action selected: ${action.label}`,
  };
}

export function confirmVisitAction(state: GameState, session: GameSession): VisitUpdateResult {
  const selectedActionId = session.visit.selectedActionId;
  if (!selectedActionId) {
    return {
      ok: false,
      failure: {
        code: 'visit-action-selection-required',
        message: 'Select a visit action before confirming.',
      },
    };
  }

  const action = findAction(selectedActionId);
  if (!action) {
    return {
      ok: false,
      failure: {
        code: 'visit-action-not-found',
        message: `Visit action not found: ${selectedActionId}`,
      },
    };
  }

  if (!action.repeatable && actionCompleted(state, action)) {
    return {
      ok: false,
      failure: {
        code: 'visit-action-already-complete',
        message: `Visit action is already complete: ${action.label}`,
      },
    };
  }

  if (state.economy.account.currentMoney < action.cost) {
    return {
      ok: false,
      failure: {
        code: 'not-enough-money',
        message: `Not enough money. Required: ${action.cost}Pt`,
      },
    };
  }

  const nextVisits = (state.featureState.visits[action.visitProgressKey] as number | undefined) ?? 0;
  const nextEventFlags = {
    ...state.world.eventFlags,
    [`visit:${action.id}:lastTurn`]: state.run.clock.turn,
    [`visit:${action.id}:source`]: action.sourceLabel,
  };
  const nextUnlocks = action.unlockKey
    ? {
        ...state.world.unlocks,
        [action.unlockKey]: true,
      }
    : state.world.unlocks;

  const nextState: GameState = {
    ...state,
    economy: {
      ...state.economy,
      account: {
        currentMoney: state.economy.account.currentMoney - action.cost,
      },
      accountingEntries:
        action.cost > 0
          ? [...state.economy.accountingEntries, `${action.accountingId}:total:${action.cost}`]
          : state.economy.accountingEntries,
    },
    world: {
      ...state.world,
      unlocks: nextUnlocks,
      eventFlags: nextEventFlags,
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
    message: `Visit action completed: ${action.label}`,
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
    message: 'Visit selection canceled.',
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
