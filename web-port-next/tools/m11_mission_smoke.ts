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

const missionId = 'mission:facility.basicRoom';
const officePlaceId = 'organizationOffice';
const basicRoomActionId = 'organizationOffice.basicRoomPermit';
const basicRoomUnlockKey = 'facility.basicRoom';
const missionReward = 500;

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

function withMissionAccessFlag(state: GameState): GameState {
  return {
    ...state,
    run: {
      ...state.run,
      progressFlags: {
        ...state.run.progressFlags,
        flag_570: 1,
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

  assert(context.catalog.missionDefinitions[missionId], 'M11 smoke mission definition should exist.');
  assertNoBoundaryErrors('initial state/session', validateStateSessionBoundary(context.state, context.session));

  let step = dispatchChecked(context, { type: 'game/new', input: { modeId: 'normal' } });
  assert(step.result.status === 'success', 'normal new game should succeed.');
  context = {
    ...step.context,
    state: withMissionAccessFlag(step.context.state),
  };

  step = dispatchChecked(context, { type: 'main/openMission' });
  assert(step.result.status === 'success', 'mission entry should succeed.');
  context = step.context;
  assert(context.session.ui.route === 'mission', 'mission entry should route to mission.');
  assert(context.session.mission.visibleMissionIds.includes(missionId), 'mission list should include M11 mission.');

  const beforeInvalidSelect = context.state;
  step = dispatchChecked(context, { type: 'mission/select', missionId: 'missing-mission' });
  assert(step.result.status === 'failure', 'missing mission selection should fail.');
  assert(step.result.failure?.code === 'definition-not-found', 'missing mission selection should use definition-not-found.');
  assert(step.result.state === beforeInvalidSelect, 'missing mission selection should preserve save state reference.');
  context = step.context;

  step = dispatchChecked(context, { type: 'mission/select', missionId });
  assert(step.result.status === 'success', 'mission selection should succeed.');
  context = step.context;
  assert(context.session.mission.selectedMissionId === missionId, 'mission selection should be session state.');

  const beforeUnacceptedReport = context.state;
  step = dispatchChecked(context, { type: 'mission/report' });
  assert(step.result.status === 'failure', 'report before accept should fail.');
  assert(step.result.failure?.code === 'mission-not-accepted', 'report before accept should use mission-not-accepted.');
  assert(step.result.state === beforeUnacceptedReport, 'report before accept should preserve save state reference.');
  context = step.context;

  step = dispatchChecked(context, { type: 'mission/accept' });
  assert(step.result.status === 'success', 'mission accept should succeed.');
  context = step.context;
  const acceptedProgress = context.state.mission.byMissionId[missionId];
  assert(acceptedProgress?.status === 'accepted', 'mission accept should persist accepted status.');
  assert(acceptedProgress.remainingWeeks === 4, 'mission accept should persist deadline weeks.');
  assert(acceptedProgress.acceptedByCharacterId !== undefined, 'mission accept should persist accepting character.');
  assert(
    context.state.mission.acceptedCountsByCharacterId[acceptedProgress.acceptedByCharacterId] === 1,
    'mission accept should increment accepted count for character.',
  );

  const beforeConditionFailure = context.state;
  step = dispatchChecked(context, { type: 'mission/report' });
  assert(step.result.status === 'failure', 'mission report should fail before required world unlock.');
  assert(
    step.result.failure?.code === 'mission-report-condition-unmet',
    'mission report before unlock should use mission-report-condition-unmet.',
  );
  assert(step.result.state === beforeConditionFailure, 'condition failure should preserve save state reference.');
  context = step.context;

  step = dispatchChecked(context, { type: 'main/openVisit' });
  assert(step.result.status === 'success', 'visit entry for mission condition should succeed.');
  context = step.context;
  step = dispatchChecked(context, { type: 'visit/selectPlace', placeId: officePlaceId });
  assert(step.result.status === 'success', 'visit place selection for mission condition should succeed.');
  context = step.context;
  step = dispatchChecked(context, { type: 'visit/selectAction', actionId: basicRoomActionId });
  assert(step.result.status === 'success', 'visit action selection for mission condition should succeed.');
  context = step.context;
  const moneyBeforeVisit = context.state.economy.account.currentMoney;
  step = dispatchChecked(context, { type: 'visit/confirmAction' });
  assert(step.result.status === 'success', 'visit condition action should succeed.');
  context = step.context;
  assert(context.state.world.unlocks[basicRoomUnlockKey] === true, 'visit condition should unlock required world flag.');
  assert(context.state.economy.account.currentMoney === moneyBeforeVisit - 300, 'visit condition action should subtract cost.');

  step = dispatchChecked(context, { type: 'main/openMission' });
  assert(step.result.status === 'success', 'mission re-entry should succeed.');
  context = step.context;
  step = dispatchChecked(context, { type: 'mission/select', missionId });
  assert(step.result.status === 'success', 'accepted mission reselection should succeed.');
  context = step.context;

  const moneyBeforeReward = context.state.economy.account.currentMoney;
  step = dispatchChecked(context, { type: 'mission/report' });
  assert(step.result.status === 'success', 'mission report should succeed after required world unlock.');
  context = step.context;
  const completedProgress = context.state.mission.byMissionId[missionId];
  assert(completedProgress?.status === 'completed', 'mission report should persist completed status.');
  assert(completedProgress.rewardClaimed === true, 'mission report should persist reward claimed.');
  assert(completedProgress.progressBand === 100, 'mission report should persist progress band.');
  assert(
    context.state.economy.account.currentMoney === moneyBeforeReward + missionReward,
    'mission report should pay reward.',
  );
  assert(context.session.mission.selectedMissionId === undefined, 'mission report should clear selected mission.');

  step = dispatchChecked(context, { type: 'mission/select', missionId });
  assert(step.result.status === 'success', 'completed mission selection should still allow inspecting status.');
  context = step.context;
  const beforeCompletedReport = context.state;
  step = dispatchChecked(context, { type: 'mission/report' });
  assert(step.result.status === 'failure', 'completed mission report should fail.');
  assert(step.result.failure?.code === 'mission-not-accepted', 'completed mission report should use mission-not-accepted.');
  assert(step.result.state === beforeCompletedReport, 'completed report failure should preserve save state reference.');
  context = step.context;

  step = dispatchChecked(context, { type: 'mission/cancel' });
  assert(step.result.status === 'success', 'mission cancel should succeed.');
  context = step.context;
  assert(context.session.ui.route === 'mainMenu', 'mission cancel should return to mainMenu.');
  assert(context.session.mission.visibleMissionIds.length === 0, 'mission cancel should clear visible mission session state.');

  const savePayload = createGameSavePayload(context.state, new Date('2026-04-30T00:00:00.000Z'));
  assertNoBoundaryErrors('save payload', validateSavePayloadBoundary(savePayload));
  assert(savePayload.state.mission.byMissionId[missionId]?.status === 'completed', 'save payload should include mission progress.');
  assertHasBoundaryError('save payload with top-level mission session', validateSavePayloadBoundary({ ...savePayload, session: context.session }));

  const summary = {
    route: context.session.ui.route,
    currentMoney: context.state.economy.account.currentMoney,
    missionStatus: context.state.mission.byMissionId[missionId]?.status,
    rewardClaimed: context.state.mission.byMissionId[missionId]?.rewardClaimed,
    facilityUnlocked: context.state.world.unlocks[basicRoomUnlockKey],
  };
  console.log(`M11 mission smoke passed: ${JSON.stringify(summary)}`);
}

main();
