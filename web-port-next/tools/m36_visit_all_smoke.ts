import type { GameAction } from '../src/game/actions';
import { validateActionResultBoundary, validateSavePayloadBoundary, validateStateSessionBoundary } from '../src/game/boundaries';
import { dispatchGameAction } from '../src/game/dispatch';
import type { GameActionContext, GameActionResult } from '../src/game/results';
import { createGameSavePayload, parseGameSavePayload, serializeGameSavePayload } from '../src/game/savePayload';
import { createInitialGameData, type GameSession, type GameState } from '../src/game/state';
import type { GameDefinitions } from '../src/catalog/types';
import { buildVisitView, visitActionDefinitions, visitPlaceDefinitions } from '../src/features/visit';

type SmokeContext = {
  readonly catalog: GameDefinitions;
  readonly state: GameState;
  readonly session: GameSession;
};

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
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

function withMoney(context: SmokeContext, currentMoney: number): SmokeContext {
  return {
    ...context,
    state: {
      ...context.state,
      economy: {
        ...context.state.economy,
        account: {
          currentMoney,
        },
      },
    },
  };
}

function main() {
  const initialData = createInitialGameData();
  let context: SmokeContext = {
    catalog: initialData.definitions,
    state: initialData.save,
    session: initialData.session,
  };

  assert(visitPlaceDefinitions.length === 7, 'M36 smoke expects seven visit places.');
  assert(visitActionDefinitions.length === 86, 'M36 smoke expects 86 source-label visit actions.');
  assertNoBoundaryErrors('initial state/session', validateStateSessionBoundary(context.state, context.session));

  let step = dispatchChecked(context, { type: 'game/new', input: { modeId: 'normal' } });
  assert(step.result.status === 'success', 'normal new game should succeed.');
  context = withMoney(step.context, 100000);

  step = dispatchChecked(context, { type: 'main/openVisit' });
  assert(step.result.status === 'success', 'visit entry should succeed.');
  context = step.context;
  assert(context.session.ui.route === 'visit', 'visit entry should route to visit.');
  assert(context.session.visit.visiblePlaceIds.length === 7, 'visit entry should expose all seven places.');

  const beforeInvalidPlace = context.state;
  step = dispatchChecked(context, { type: 'visit/selectPlace', placeId: 'missing-place' });
  assert(step.result.status === 'failure', 'missing visit place should fail.');
  assert(step.result.failure?.code === 'visit-place-not-found', 'missing visit place should use visit-place-not-found.');
  assert(step.result.state === beforeInvalidPlace, 'missing visit place should preserve save state reference.');
  context = step.context;

  step = dispatchChecked(context, { type: 'visit/confirmAction' });
  assert(step.result.status === 'failure', 'confirm without action should fail.');
  assert(step.result.failure?.code === 'visit-action-selection-required', 'confirm without action should use selection-required.');
  context = step.context;

  for (const place of visitPlaceDefinitions) {
    step = dispatchChecked(context, { type: 'visit/selectPlace', placeId: place.id });
    assert(step.result.status === 'success', `place selection should succeed: ${place.id}`);
    context = step.context;

    const view = buildVisitView(context.state, context.session);
    const expectedActions = visitActionDefinitions.filter((action) => action.placeId === place.id);
    assert(view.visibleActions.length === expectedActions.length, `visible action count mismatch for ${place.id}`);

    if (place.id === 'organizationOffice') {
      const otherPlaceAction = visitActionDefinitions.find((action) => action.placeId !== place.id);
      assert(otherPlaceAction, 'M36 smoke needs an action from another place.');
      const beforeWrongAction = context.state;
      step = dispatchChecked(context, { type: 'visit/selectAction', actionId: otherPlaceAction.id });
      assert(step.result.status === 'failure', 'selecting an action outside the selected place should fail.');
      assert(step.result.failure?.code === 'visit-action-not-in-session', 'wrong-place action should use not-in-session.');
      assert(step.result.state === beforeWrongAction, 'wrong-place action should preserve save state reference.');
      context = step.context;
    }

    for (const action of expectedActions) {
      step = dispatchChecked(context, { type: 'visit/selectAction', actionId: action.id });
      assert(step.result.status === 'success', `action selection should succeed: ${action.id}`);
      context = step.context;
      const beforeMoney = context.state.economy.account.currentMoney;
      step = dispatchChecked(context, { type: 'visit/confirmAction' });
      assert(step.result.status === 'success', `action confirm should succeed: ${action.id}`);
      context = step.context;
      assert(context.state.featureState.visits[action.visitProgressKey] === 1, `visit progress should be saved: ${action.id}`);
      assert(context.state.world.eventFlags[`visit:${action.id}:source`] === action.sourceLabel, `event source should be saved: ${action.id}`);
      assert(context.state.economy.account.currentMoney === beforeMoney - action.cost, `money cost mismatch: ${action.id}`);
      if (action.unlockKey) {
        assert(context.state.world.unlocks[action.unlockKey] === true, `facility unlock should be saved: ${action.unlockKey}`);
      }
      assert(context.session.visit.selectedActionId === undefined, `confirmed action should clear selection: ${action.id}`);
    }
  }

  const basicRoomAction = visitActionDefinitions.find((action) => action.id === 'organizationOffice.basicRoomPermit');
  assert(basicRoomAction, 'M36 smoke requires the M10 basic room action to remain stable.');
  step = dispatchChecked(context, { type: 'visit/selectPlace', placeId: basicRoomAction.placeId });
  assert(step.result.status === 'success', 'basic room place selection should still succeed.');
  context = step.context;
  step = dispatchChecked(context, { type: 'visit/selectAction', actionId: basicRoomAction.id });
  assert(step.result.status === 'success', 'completed basic room action can still be selected for duplicate validation.');
  context = step.context;
  const beforeDuplicate = context.state;
  step = dispatchChecked(context, { type: 'visit/confirmAction' });
  assert(step.result.status === 'failure', 'duplicate basic room action should fail.');
  assert(step.result.failure?.code === 'visit-action-already-complete', 'duplicate should use already-complete code.');
  assert(step.result.state === beforeDuplicate, 'duplicate failure should preserve save state reference.');
  context = step.context;

  const costlyAction = visitActionDefinitions.find((action) => action.cost > 0 && action.id !== basicRoomAction.id);
  assert(costlyAction, 'M36 smoke needs a non-basic costly action.');
  context = {
    ...withMoney(context, costlyAction.cost - 1),
    state: {
      ...context.state,
      economy: {
        ...context.state.economy,
        account: { currentMoney: costlyAction.cost - 1 },
      },
      featureState: {
        ...context.state.featureState,
        visits: {
          ...context.state.featureState.visits,
          [costlyAction.visitProgressKey]: undefined,
        },
      },
      world: {
        ...context.state.world,
        unlocks: costlyAction.unlockKey
          ? {
              ...context.state.world.unlocks,
              [costlyAction.unlockKey]: false,
            }
          : context.state.world.unlocks,
      },
    },
  };
  step = dispatchChecked(context, { type: 'visit/selectPlace', placeId: costlyAction.placeId });
  assert(step.result.status === 'success', 'costly action place selection should succeed.');
  context = step.context;
  step = dispatchChecked(context, { type: 'visit/selectAction', actionId: costlyAction.id });
  assert(step.result.status === 'success', 'costly action selection should succeed before money validation.');
  context = step.context;
  const beforeMoneyFailure = context.state;
  step = dispatchChecked(context, { type: 'visit/confirmAction' });
  assert(step.result.status === 'failure', 'costly action should fail with insufficient money.');
  assert(step.result.failure?.code === 'not-enough-money', 'costly failure should use not-enough-money.');
  assert(step.result.state === beforeMoneyFailure, 'money failure should preserve save state reference.');
  context = step.context;

  context = withMoney(context, costlyAction.cost);
  step = dispatchChecked(context, { type: 'visit/confirmAction' });
  assert(step.result.status === 'success', 'costly action should succeed after money is restored.');
  context = step.context;
  assert(context.state.featureState.visits[costlyAction.visitProgressKey] === 1, 'restored costly action should save progress.');

  step = dispatchChecked(context, { type: 'visit/cancelSelection' });
  assert(step.result.status === 'success', 'visit selection cancel should succeed.');
  context = step.context;
  assert(context.session.visit.selectedPlaceId === undefined, 'visit selection cancel should clear selected place.');
  assert(context.session.visit.selectedActionId === undefined, 'visit selection cancel should clear selected action.');

  step = dispatchChecked(context, { type: 'visit/cancel' });
  assert(step.result.status === 'success', 'visit cancel should succeed.');
  context = step.context;
  assert(context.session.ui.route === 'mainMenu', 'visit cancel should return to mainMenu.');
  assert(context.session.visit.visiblePlaceIds.length === 0, 'visit cancel should clear visible places.');
  assert(context.session.visit.visibleActionIds.length === 0, 'visit cancel should clear visible actions.');

  const savePayload = createGameSavePayload(context.state, new Date('2026-05-01T00:00:00.000Z'));
  assertNoBoundaryErrors('M36 save payload', validateSavePayloadBoundary(savePayload));
  const serialized = serializeGameSavePayload(savePayload);
  const parsed = parseGameSavePayload(serialized);
  assert(parsed.ok, 'M36 save payload should parse after roundtrip.');
  assert(!('session' in JSON.parse(serialized)), 'M36 save payload must not include session.');
  assert(parsed.payload.state.featureState.visits[basicRoomAction.visitProgressKey] === 1, 'save roundtrip should keep visit progress.');
  assert(parsed.payload.state.world.unlocks['facility.basicRoom'] === true, 'save roundtrip should keep facility unlock.');

  const summary = {
    route: context.session.ui.route,
    places: visitPlaceDefinitions.length,
    actions: visitActionDefinitions.length,
    visitProgressRows: Object.keys(context.state.featureState.visits).filter(
      (key) => context.state.featureState.visits[key] !== undefined,
    ).length,
    unlocks: Object.values(context.state.world.unlocks).filter(Boolean).length,
    money: context.state.economy.account.currentMoney,
  };
  console.log(`M36 visit-all smoke passed: ${JSON.stringify(summary)}`);
}

main();
