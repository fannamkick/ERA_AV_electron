import type { GameAction } from '../src/game/actions';
import { validateActionResultBoundary, validateSavePayloadBoundary, validateStateSessionBoundary } from '../src/game/boundaries';
import { dispatchGameAction } from '../src/game/dispatch';
import type { GameActionContext, GameActionResult } from '../src/game/results';
import { createGameSavePayload } from '../src/game/savePayload';
import { createInitialGameData, type GameSession, type GameState } from '../src/game/state';
import type { GameDefinitions } from '../src/catalog/types';

type SmokeContext = {
  readonly catalog: GameDefinitions;
  readonly state: GameState;
  readonly session: GameSession;
};

const officePlaceId = 'organizationOffice';
const basicRoomActionId = 'organizationOffice.basicRoomPermit';
const basicRoomUnlockKey = 'facility.basicRoom';
const basicRoomVisitProgressKey = 'organizationOffice.basicRoomPermit';
const basicRoomCost = 300;

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function assertNoBoundaryErrors(label: string, diagnostics: readonly { readonly severity: string; readonly message: string }[]) {
  const errors = diagnostics.filter((diagnostic) => diagnostic.severity === 'error');
  assert(errors.length === 0, `${label} boundary failed:\n${errors.map((error) => error.message).join('\n')}`);
}

function assertHasBoundaryError(label: string, diagnostics: readonly { readonly severity: string; readonly message: string }[]) {
  assert(
    diagnostics.some((diagnostic) => diagnostic.severity === 'error'),
    `${label} should fail boundary validation.`,
  );
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

  assertNoBoundaryErrors('initial state/session', validateStateSessionBoundary(context.state, context.session));

  let step = dispatchChecked(context, { type: 'game/new', input: { modeId: 'normal' } });
  assert(step.result.status === 'success', 'normal new game should succeed.');
  context = step.context;

  step = dispatchChecked(context, { type: 'main/openVisit' });
  assert(step.result.status === 'success', 'visit entry should succeed.');
  context = step.context;
  assert(context.session.ui.route === 'visit', 'visit entry should route to visit.');
  assert(context.session.visit.visiblePlaceIds.includes(officePlaceId), 'visit screen should expose organization office.');

  const beforeInvalidPlace = context.state;
  step = dispatchChecked(context, { type: 'visit/selectPlace', placeId: 'missing-place' });
  assert(step.result.status === 'failure', 'missing visit place should fail.');
  assert(step.result.failure?.code === 'visit-place-not-found', 'missing visit place should use visit-place-not-found.');
  assert(step.result.state === beforeInvalidPlace, 'missing visit place should preserve save state reference.');
  context = step.context;

  step = dispatchChecked(context, { type: 'visit/selectPlace', placeId: officePlaceId });
  assert(step.result.status === 'success', 'organization office selection should succeed.');
  context = step.context;
  assert(context.session.visit.selectedPlaceId === officePlaceId, 'visit place selection should be stored in session.');
  assert(context.session.visit.visibleActionIds.includes(basicRoomActionId), 'selected place should expose basic room action.');

  const insufficientContext = withMoney(context, basicRoomCost - 1);
  step = dispatchChecked(insufficientContext, { type: 'visit/selectAction', actionId: basicRoomActionId });
  assert(step.result.status === 'success', 'visit action selection should succeed before money validation.');
  let insufficientSelected = step.context;
  const beforeMoneyFailure = insufficientSelected.state;
  step = dispatchChecked(insufficientSelected, { type: 'visit/confirmAction' });
  assert(step.result.status === 'failure', 'visit action should fail when money is insufficient.');
  assert(step.result.failure?.code === 'not-enough-money', 'insufficient visit action should use not-enough-money.');
  assert(step.result.state === beforeMoneyFailure, 'failed visit action should preserve save state reference.');

  step = dispatchChecked(context, { type: 'visit/selectAction', actionId: basicRoomActionId });
  assert(step.result.status === 'success', 'basic room action selection should succeed.');
  context = step.context;
  assert(context.session.visit.selectedActionId === basicRoomActionId, 'visit action selection should be stored in session.');

  step = dispatchChecked(context, { type: 'visit/cancelSelection' });
  assert(step.result.status === 'success', 'visit action cancel should succeed.');
  context = step.context;
  assert(context.session.visit.selectedPlaceId === undefined, 'visit selection cancel should clear selected place.');
  assert(context.session.visit.selectedActionId === undefined, 'visit selection cancel should clear selected action.');
  assert(!context.state.world.unlocks[basicRoomUnlockKey], 'visit selection cancel should not unlock facility.');

  step = dispatchChecked(context, { type: 'visit/selectPlace', placeId: officePlaceId });
  assert(step.result.status === 'success', 'organization office reselection should succeed.');
  context = step.context;
  step = dispatchChecked(context, { type: 'visit/selectAction', actionId: basicRoomActionId });
  assert(step.result.status === 'success', 'basic room action reselection should succeed.');
  context = step.context;

  const moneyBeforeVisit = context.state.economy.account.currentMoney;
  step = dispatchChecked(context, { type: 'visit/confirmAction' });
  assert(step.result.status === 'success', 'basic room action should succeed.');
  context = step.context;
  assert(context.state.economy.account.currentMoney === moneyBeforeVisit - basicRoomCost, 'visit success should subtract money.');
  assert(context.state.world.unlocks[basicRoomUnlockKey] === true, 'visit success should set world facility unlock.');
  assert(context.state.featureState.visits[basicRoomVisitProgressKey] === 1, 'visit success should record visit progress.');
  assert(context.session.visit.selectedActionId === undefined, 'visit success should clear selected action.');

  step = dispatchChecked(context, { type: 'visit/selectAction', actionId: basicRoomActionId });
  assert(step.result.status === 'success', 'completed visit action can be selected to surface duplicate failure.');
  context = step.context;
  const beforeDuplicateFailure = context.state;
  step = dispatchChecked(context, { type: 'visit/confirmAction' });
  assert(step.result.status === 'failure', 'completed visit action should fail on confirm.');
  assert(step.result.failure?.code === 'visit-action-already-complete', 'duplicate visit action should use visit-action-already-complete.');
  assert(step.result.state === beforeDuplicateFailure, 'duplicate visit failure should preserve save state reference.');
  context = step.context;

  step = dispatchChecked(context, { type: 'visit/cancel' });
  assert(step.result.status === 'success', 'visit cancel should succeed.');
  context = step.context;
  assert(context.session.ui.route === 'mainMenu', 'visit cancel should route back to mainMenu.');
  assert(context.session.visit.visiblePlaceIds.length === 0, 'visit cancel should clear visible place session state.');
  assert(context.session.visit.visibleActionIds.length === 0, 'visit cancel should clear visible action session state.');

  const savePayload = createGameSavePayload(context.state, new Date('2026-04-30T00:00:00.000Z'));
  assertNoBoundaryErrors('save payload', validateSavePayloadBoundary(savePayload));
  assert(savePayload.state.world.unlocks[basicRoomUnlockKey] === true, 'save payload should include facility unlock state.');
  assert(savePayload.state.featureState.visits[basicRoomVisitProgressKey] === 1, 'save payload should include visit progress state.');
  assertHasBoundaryError('save payload with top-level visit session', validateSavePayloadBoundary({ ...savePayload, session: context.session }));

  const summary = {
    route: context.session.ui.route,
    currentMoney: context.state.economy.account.currentMoney,
    facilityUnlocked: context.state.world.unlocks[basicRoomUnlockKey],
    visitProgress: context.state.featureState.visits[basicRoomVisitProgressKey],
  };
  console.log(`M10 visit smoke passed: ${JSON.stringify(summary)}`);
}

main();
