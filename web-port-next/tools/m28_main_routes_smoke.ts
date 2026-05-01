import { buildMainMenuView } from '../src/features/mainMenu';
import type { GameAction } from '../src/game/actions';
import { validateActionResultBoundary, validateSavePayloadBoundary, validateStateSessionBoundary } from '../src/game/boundaries';
import { dispatchGameAction } from '../src/game/dispatch';
import type { GameActionContext, GameActionResult } from '../src/game/results';
import { createGameSavePayload } from '../src/game/savePayload';
import { createInitialGameData, type GameSession, type GameState } from '../src/game/state';
import type { UiRoute } from '../src/game/routes';
import type { GameDefinitions } from '../src/catalog/types';

type SmokeContext = {
  readonly catalog: GameDefinitions;
  readonly state: GameState;
  readonly session: GameSession;
};

type MainRouteCase = {
  readonly menuCode: string;
  readonly action: GameAction;
  readonly expectedRoute: UiRoute;
  readonly cancelAction?: GameAction;
  readonly mutatesSave?: boolean;
};

const expectedMenuCodes = [
  '100',
  '101',
  '102',
  '103',
  '104',
  '105',
  '108',
  '109',
  '111',
  '112',
  '113',
  '115',
  '116',
  '120',
  '150',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '750',
  '888',
  '8826',
] as const;

const enabledRouteCases: readonly MainRouteCase[] = [
  { menuCode: '100', action: { type: 'main/openTraining' }, expectedRoute: 'training', cancelAction: { type: 'training/cancel' } },
  { menuCode: '101', action: { type: 'main/openRecruit' }, expectedRoute: 'recruit', cancelAction: { type: 'recruit/cancel' } },
  { menuCode: '102', action: { type: 'main/openItemShop' }, expectedRoute: 'itemShop', cancelAction: { type: 'shop/cancel' } },
  { menuCode: '103', action: { type: 'main/openWork' }, expectedRoute: 'work', cancelAction: { type: 'work/cancel' } },
  { menuCode: '104', action: { type: 'main/openShooting' }, expectedRoute: 'shooting', cancelAction: { type: 'shooting/cancel' } },
  { menuCode: '105', action: { type: 'turn/end' }, expectedRoute: 'mainMenu', mutatesSave: true },
  { menuCode: '108', action: { type: 'main/openWardrobe' }, expectedRoute: 'wardrobe', cancelAction: { type: 'wardrobe/cancel' } },
  { menuCode: '109', action: { type: 'main/openVisit' }, expectedRoute: 'visit', cancelAction: { type: 'visit/cancel' } },
  { menuCode: '111', action: { type: 'main/openRoster' }, expectedRoute: 'roster', cancelAction: { type: 'route/change', route: 'mainMenu' } },
  { menuCode: '120', action: { type: 'main/openMission' }, expectedRoute: 'mission', cancelAction: { type: 'mission/cancel' } },
  { menuCode: '200', action: { type: 'main/openSaveLoad' }, expectedRoute: 'saveLoad', cancelAction: { type: 'save/cancel' } },
  { menuCode: '300', action: { type: 'main/openSaveLoad' }, expectedRoute: 'saveLoad', cancelAction: { type: 'save/cancel' } },
  { menuCode: '700', action: { type: 'main/openRoster' }, expectedRoute: 'roster', cancelAction: { type: 'route/change', route: 'mainMenu' } },
];

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function assertNoBoundaryErrors(label: string, diagnostics: readonly { readonly severity: string; readonly message: string }[]) {
  const errors = diagnostics.filter((diagnostic) => diagnostic.severity === 'error');
  assert(errors.length === 0, `${label} boundary failed:\n${errors.map((error) => error.message).join('\n')}`);
}

function toActionContext(context: SmokeContext): GameActionContext {
  return {
    catalog: context.catalog,
    state: context.state,
    session: context.session,
  };
}

function nextContext(context: SmokeContext, result: GameActionResult): SmokeContext {
  return {
    catalog: context.catalog,
    state: result.state,
    session: result.session,
  };
}

function dispatchChecked(context: SmokeContext, action: GameAction): { readonly context: SmokeContext; readonly result: GameActionResult } {
  const actionContext = toActionContext(context);
  const result = dispatchGameAction(actionContext, action);
  assertNoBoundaryErrors(action.type, validateActionResultBoundary(actionContext, result));
  return {
    context: nextContext(context, result),
    result,
  };
}

function main() {
  const initialData = createInitialGameData();
  let context: SmokeContext = {
    catalog: initialData.definitions,
    state: initialData.save,
    session: initialData.session,
  };

  assertNoBoundaryErrors('initial state/session', validateStateSessionBoundary(context.state, context.session));

  let step = dispatchChecked(context, { type: 'game/new', input: { modeId: 'normal' } });
  assert(step.result.status === 'success', 'normal new game should succeed.');
  context = step.context;
  assert(context.session.ui.route === 'mainMenu', 'new game should route to mainMenu.');

  const menu = buildMainMenuView(context.state, context.catalog);
  assert(menu.menuItems.length === expectedMenuCodes.length, 'M28 should render every original main menu option.');

  const actualMenuCodes = menu.menuItems.map((item) => item.id);
  for (const code of expectedMenuCodes) {
    assert(actualMenuCodes.includes(code), `main menu option ${code} should be present.`);
    const definition = context.catalog.mainMenuOptions[code];
    assert(definition, `main menu definition ${code} should exist.`);
    assert(definition.sourceEvidenceId, `main menu definition ${code} should keep source evidence.`);
    assert(definition.ownerMilestone, `main menu definition ${code} should keep destination owner.`);
  }

  const expectedEnabledCodes = new Set(enabledRouteCases.map((item) => item.menuCode));
  for (const item of menu.menuItems) {
    if (expectedEnabledCodes.has(item.id)) {
      assert(item.enabled === true, `main menu option ${item.id} should be enabled.`);
      assert(item.actionId, `enabled main menu option ${item.id} should expose actionId.`);
      assert(item.route, `enabled main menu option ${item.id} should expose route.`);
      assert(item.sourceEvidenceId, `enabled main menu option ${item.id} should expose source evidence.`);
    } else {
      assert(item.enabled === false, `main menu option ${item.id} should be disabled until its owner milestone implements it.`);
      assert(item.disabledReason, `disabled main menu option ${item.id} should explain its owner/blocker reason.`);
      assert(item.ownerMilestone, `disabled main menu option ${item.id} should expose future owner.`);
    }
  }

  for (const routeCase of enabledRouteCases) {
    const item = menu.menuItems.find((candidate) => candidate.id === routeCase.menuCode);
    assert(item?.enabled === true, `route case ${routeCase.menuCode} should start enabled.`);

    const beforeState = context.state;
    const dayBefore = context.state.run.clock.day;
    const turnBefore = context.state.run.clock.turn;
    step = dispatchChecked(context, routeCase.action);
    assert(step.result.status === 'success', `${routeCase.action.type} should succeed.`);
    context = step.context;
    assert(context.session.ui.route === routeCase.expectedRoute, `${routeCase.action.type} should route to ${routeCase.expectedRoute}.`);

    if (routeCase.mutatesSave) {
      assert(context.state !== beforeState, `${routeCase.action.type} should mutate save state by design.`);
      assert(context.state.run.clock.day === dayBefore + 7, 'turn/end should advance day.');
      assert(context.state.run.clock.turn === turnBefore + 1, 'turn/end should advance turn.');
    } else {
      assert(context.state === beforeState, `${routeCase.action.type} should not mutate save state on route entry.`);
    }

    if (routeCase.cancelAction) {
      const beforeCancelState = context.state;
      step = dispatchChecked(context, routeCase.cancelAction);
      assert(step.result.status === 'success', `${routeCase.cancelAction.type} should return from ${routeCase.expectedRoute}.`);
      context = step.context;
      assert(context.session.ui.route === 'mainMenu', `${routeCase.cancelAction.type} should return to mainMenu.`);
      assert(context.state === beforeCancelState, `${routeCase.cancelAction.type} should not mutate save state.`);
    }
  }

  const savePayload = createGameSavePayload(context.state, new Date('2026-05-01T00:00:00.000Z'));
  assertNoBoundaryErrors('save payload', validateSavePayloadBoundary(savePayload));
  const serializedSave = JSON.stringify(savePayload);
  assert(!serializedSave.includes('TCVAR'), 'save payload must not contain raw TCVAR session names.');
  assert(!serializedSave.includes('temporaryValues'), 'save payload must not contain screen temporary session values.');

  const summary = {
    menuRows: menu.menuItems.length,
    enabledRows: menu.menuItems.filter((item) => item.enabled).length,
    disabledRows: menu.menuItems.filter((item) => !item.enabled).length,
    route: context.session.ui.route,
    day: context.state.run.clock.day,
    turn: context.state.run.clock.turn,
  };
  console.log(`M28 main routes smoke passed: ${JSON.stringify(summary)}`);
}

main();
