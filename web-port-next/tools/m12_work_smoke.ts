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

const workId = 'work:reception.basic';
const rewardMoney = 200;

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

function firstCharacterId(context: SmokeContext): string {
  const characterId = Object.keys(context.state.people.characters).sort()[0];
  assert(characterId, 'M12 smoke needs at least one character.');
  return characterId;
}

function main() {
  const initialData = createInitialGameData();
  let context: SmokeContext = {
    catalog: initialData.definitions,
    state: initialData.save,
    session: initialData.session,
  };

  assert(context.catalog.workDefinitions[workId], 'M12 smoke work definition should exist.');
  assertNoBoundaryErrors('initial state/session', validateStateSessionBoundary(context.state, context.session));

  let step = dispatchChecked(context, { type: 'game/new', input: { modeId: 'normal' } });
  assert(step.result.status === 'success', 'normal new game should succeed.');
  context = step.context;
  const characterId = firstCharacterId(context);

  step = dispatchChecked(context, { type: 'main/openWork' });
  assert(step.result.status === 'success', 'work entry should succeed.');
  context = step.context;
  assert(context.session.ui.route === 'work', 'work entry should route to work.');
  assert(context.session.work.visibleWorkIds.includes(workId), 'work screen should include M12 work.');
  assert(context.session.work.eligibleCharacterIds.includes(characterId), 'work screen should include starting character.');

  const beforeInvalidSelect = context.state;
  step = dispatchChecked(context, { type: 'work/select', workId: 'missing-work' });
  assert(step.result.status === 'failure', 'missing work selection should fail.');
  assert(step.result.failure?.code === 'definition-not-found', 'missing work selection should use definition-not-found.');
  assert(step.result.state === beforeInvalidSelect, 'missing work selection should preserve save state reference.');
  context = step.context;

  const beforeNoWorkExecute = context.state;
  step = dispatchChecked(context, { type: 'work/execute' });
  assert(step.result.status === 'failure', 'executing without work selection should fail.');
  assert(step.result.failure?.code === 'work-selection-required', 'missing work selection should use work-selection-required.');
  assert(step.result.state === beforeNoWorkExecute, 'missing work selection failure should preserve save state reference.');
  context = step.context;

  step = dispatchChecked(context, { type: 'work/select', workId });
  assert(step.result.status === 'success', 'work selection should succeed.');
  context = step.context;
  assert(context.session.work.selectedWorkId === workId, 'work selection should be session state.');

  const beforeNoCharacterExecute = context.state;
  step = dispatchChecked(context, { type: 'work/execute' });
  assert(step.result.status === 'failure', 'executing without character should fail.');
  assert(step.result.failure?.code === 'work-character-required', 'missing work character should use work-character-required.');
  assert(step.result.state === beforeNoCharacterExecute, 'missing character failure should preserve save state reference.');
  context = step.context;

  step = dispatchChecked(context, { type: 'work/selectCharacter', characterId: 'missing-character' });
  assert(step.result.status === 'failure', 'missing work character selection should fail.');
  assert(step.result.failure?.code === 'work-character-not-found', 'missing work character should use work-character-not-found.');
  assert(step.result.state === beforeNoCharacterExecute, 'missing work character selection should preserve save state reference.');
  context = step.context;

  step = dispatchChecked(context, { type: 'work/selectCharacter', characterId });
  assert(step.result.status === 'success', 'work character selection should succeed.');
  context = step.context;
  assert(context.session.work.selectedCharacterId === characterId, 'work character selection should be session state.');

  step = dispatchChecked(context, { type: 'work/cancel' });
  assert(step.result.status === 'success', 'work cancel should succeed.');
  context = step.context;
  assert(context.session.ui.route === 'mainMenu', 'work cancel should return to mainMenu.');
  assert(context.session.work.visibleWorkIds.length === 0, 'work cancel should clear visible work session state.');
  assert(context.state.work.assignments[characterId] === undefined, 'work cancel should not write assignment.');

  step = dispatchChecked(context, { type: 'main/openWork' });
  assert(step.result.status === 'success', 'work re-entry should succeed.');
  context = step.context;
  step = dispatchChecked(context, { type: 'work/select', workId });
  assert(step.result.status === 'success', 'work reselection should succeed.');
  context = step.context;
  step = dispatchChecked(context, { type: 'work/selectCharacter', characterId });
  assert(step.result.status === 'success', 'work character reselection should succeed.');
  context = step.context;

  const moneyBeforeWork = context.state.economy.account.currentMoney;
  const dayBeforeWork = context.state.run.clock.day;
  const turnBeforeWork = context.state.run.clock.turn;
  const staminaBeforeWork = context.state.body.byCharacterId[characterId]?.bodyStats.stamina ?? 0;
  const energyBeforeWork = context.state.body.byCharacterId[characterId]?.bodyStats.energy ?? 0;
  const experienceBeforeWork = context.state.people.characters[characterId].attributes.experiences['work.reception'] ?? 0;

  step = dispatchChecked(context, { type: 'work/execute' });
  assert(step.result.status === 'success', 'selected work should execute.');
  context = step.context;
  assert(context.session.ui.route === 'mainMenu', 'completed work should return to mainMenu through turn end.');
  assert(context.state.economy.account.currentMoney === moneyBeforeWork + rewardMoney, 'work should add reward money.');
  assert(context.state.run.clock.day === dayBeforeWork + 7, 'completed work should advance day by turn end.');
  assert(context.state.run.clock.turn === turnBeforeWork + 1, 'completed work should advance turn.');
  assert(context.state.run.clock.phase === 'freeAction', 'completed work should return phase to freeAction.');
  assert(context.session.work.visibleWorkIds.length === 0, 'completed work should clear work session state.');
  assert(context.session.work.selectedWorkId === undefined, 'completed work should clear selected work.');
  assert(context.state.body.byCharacterId[characterId].bodyStats.stamina === staminaBeforeWork - 8, 'work should apply stamina delta.');
  assert(context.state.body.byCharacterId[characterId].bodyStats.energy === energyBeforeWork - 5, 'work should apply energy delta.');
  assert(
    context.state.people.characters[characterId].attributes.experiences['work.reception'] === experienceBeforeWork + 1,
    'work should apply experience delta.',
  );
  assert(context.state.work.assignments[characterId]?.workTypeId === workId, 'work should persist latest assignment.');
  assert(context.state.work.assignments[characterId]?.active === false, 'completed work assignment should be inactive.');
  assert(
    context.state.work.careerFlagsByCharacterId[characterId]?.[`${workId}.completedCount`] === 1,
    'work should persist career completion count.',
  );

  const savePayload = createGameSavePayload(context.state, new Date('2026-04-30T00:00:00.000Z'));
  assertNoBoundaryErrors('save payload', validateSavePayloadBoundary(savePayload));
  assert(savePayload.state.work.assignments[characterId]?.workTypeId === workId, 'save payload should include work assignment.');
  assert(
    savePayload.state.people.characters[characterId].attributes.experiences['work.reception'] === experienceBeforeWork + 1,
    'save payload should include work experience result.',
  );
  assertHasBoundaryError('save payload with top-level work session', validateSavePayloadBoundary({ ...savePayload, session: context.session }));

  const summary = {
    route: context.session.ui.route,
    currentMoney: context.state.economy.account.currentMoney,
    day: context.state.run.clock.day,
    turn: context.state.run.clock.turn,
    workTypeId: context.state.work.assignments[characterId]?.workTypeId,
    completedCount: context.state.work.careerFlagsByCharacterId[characterId]?.[`${workId}.completedCount`],
  };
  console.log(`M12 work smoke passed: ${JSON.stringify(summary)}`);
}

main();
