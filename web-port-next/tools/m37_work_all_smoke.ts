import type { GameAction } from '../src/game/actions';
import { validateActionResultBoundary, validateSavePayloadBoundary, validateStateSessionBoundary } from '../src/game/boundaries';
import { dispatchGameAction } from '../src/game/dispatch';
import type { GameActionContext, GameActionResult } from '../src/game/results';
import { createGameSavePayload, parseGameSavePayload, serializeGameSavePayload } from '../src/game/savePayload';
import { createInitialGameData, type GameSession, type GameState } from '../src/game/state';
import type { GameDefinitions } from '../src/catalog/types';
import { workSourceLabelCount } from '../src/catalog/workSourceGroups';
import { buildWorkView } from '../src/features/work';

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

function firstCharacterId(context: SmokeContext): string {
  const characterId = Object.keys(context.state.people.characters).sort()[0];
  assert(characterId, 'M37 smoke needs at least one character.');
  return characterId;
}

function workIdsForM37(catalog: GameDefinitions): readonly string[] {
  const ids = Object.values(catalog.workDefinitions)
    .filter((work) => work.tags.includes('source-label') || work.tags.includes('erb-derived'))
    .map((work) => work.id)
    .sort();
  assert(ids.length === workSourceLabelCount + 8, `M37 smoke expected ${workSourceLabelCount + 8} source-backed work definitions.`);
  return ids;
}

function main() {
  const initialData = createInitialGameData();
  let context: SmokeContext = {
    catalog: initialData.definitions,
    state: initialData.save,
    session: initialData.session,
  };

  assertNoBoundaryErrors('initial state/session', validateStateSessionBoundary(context.state, context.session));
  const m37WorkIds = workIdsForM37(context.catalog);

  let step = dispatchChecked(context, { type: 'game/new', input: { modeId: 'normal' } });
  assert(step.result.status === 'success', 'normal new game should succeed.');
  context = step.context;
  const characterId = firstCharacterId(context);

  step = dispatchChecked(context, { type: 'main/openWork' });
  assert(step.result.status === 'success', 'work entry should succeed.');
  context = step.context;
  assert(context.session.ui.route === 'work', 'work entry should route to work.');
  const firstView = buildWorkView(context.catalog, context.state, context.session);
  for (const workId of m37WorkIds) {
    assert(firstView.visibleWorks.some((work) => work.workId === workId), `work screen should expose ${workId}.`);
  }

  const beforeInvalid = context.state;
  step = dispatchChecked(context, { type: 'work/select', workId: 'missing-work' });
  assert(step.result.status === 'failure', 'missing work should fail.');
  assert(step.result.failure?.code === 'definition-not-found', 'missing work should use definition-not-found.');
  assert(step.result.state === beforeInvalid, 'missing work should preserve save state reference.');
  context = step.context;

  step = dispatchChecked(context, { type: 'work/execute' });
  assert(step.result.status === 'failure', 'executing without selected work should fail.');
  assert(step.result.failure?.code === 'work-selection-required', 'missing selection should use work-selection-required.');
  context = step.context;

  const firstWorkId = m37WorkIds[0];
  step = dispatchChecked(context, { type: 'work/select', workId: firstWorkId });
  assert(step.result.status === 'success', 'first work selection should succeed.');
  context = step.context;
  step = dispatchChecked(context, { type: 'work/execute' });
  assert(step.result.status === 'failure', 'executing without selected character should fail.');
  assert(step.result.failure?.code === 'work-character-required', 'missing character should use work-character-required.');
  context = step.context;

  step = dispatchChecked(context, { type: 'work/selectCharacter', characterId: 'missing-character' });
  assert(step.result.status === 'failure', 'missing character selection should fail.');
  assert(step.result.failure?.code === 'work-character-not-found', 'missing character should use work-character-not-found.');
  context = step.context;

  step = dispatchChecked(context, { type: 'work/selectCharacter', characterId });
  assert(step.result.status === 'success', 'character selection should succeed before cancel.');
  context = step.context;
  step = dispatchChecked(context, { type: 'work/cancel' });
  assert(step.result.status === 'success', 'work cancel should succeed.');
  context = step.context;
  assert(context.session.ui.route === 'mainMenu', 'work cancel should return to main menu.');
  assert(context.session.work.visibleWorkIds.length === 0, 'work cancel should clear visible work ids.');
  assert(context.state.work.assignments[characterId] === undefined, 'work cancel should not persist assignment.');

  let executed = 0;
  let expectedMoney = context.state.economy.account.currentMoney;
  let expectedTurn = context.state.run.clock.turn;
  for (const workId of m37WorkIds) {
    const definition = context.catalog.workDefinitions[workId];
    assert(definition, `work definition missing from catalog: ${workId}`);
    step = dispatchChecked(context, { type: 'main/openWork' });
    assert(step.result.status === 'success', `work entry should succeed for ${workId}.`);
    context = step.context;
    assert(context.session.work.visibleWorkIds.includes(workId), `work session should include ${workId}.`);
    step = dispatchChecked(context, { type: 'work/select', workId });
    assert(step.result.status === 'success', `work selection should succeed for ${workId}.`);
    context = step.context;
    step = dispatchChecked(context, { type: 'work/selectCharacter', characterId });
    assert(step.result.status === 'success', `character selection should succeed for ${workId}.`);
    context = step.context;

    const staminaBefore = context.state.body.byCharacterId[characterId]?.bodyStats.stamina ?? 0;
    expectedMoney += definition.rewardMoney;
    expectedTurn += definition.completesTimeBlock ? 1 : 0;
    step = dispatchChecked(context, { type: 'work/execute' });
    assert(step.result.status === 'success', `work execution should succeed for ${workId}.`);
    context = step.context;
    assert(context.session.ui.route === 'mainMenu', `completed work should return to main menu for ${workId}.`);
    assert(context.state.economy.account.currentMoney === expectedMoney, `work reward mismatch for ${workId}.`);
    assert(context.state.run.clock.turn === expectedTurn, `turn count mismatch for ${workId}.`);
    assert(context.session.work.visibleWorkIds.length === 0, `completed work should clear work session for ${workId}.`);
    assert(context.state.work.assignments[characterId]?.workTypeId === workId, `assignment should persist latest work ${workId}.`);
    assert(
      context.state.work.careerFlagsByCharacterId[characterId]?.[`${workId}.completedCount`] === 1,
      `career completion count should persist for ${workId}.`,
    );
    assert(
      (context.state.body.byCharacterId[characterId]?.bodyStats.stamina ?? 0) < staminaBefore,
      `work should apply body stat delta for ${workId}.`,
    );
    executed += 1;
  }

  const savePayload = createGameSavePayload(context.state, new Date('2026-05-01T00:00:00.000Z'));
  assertNoBoundaryErrors('M37 save payload', validateSavePayloadBoundary(savePayload));
  const serialized = serializeGameSavePayload(savePayload);
  const parsed = parseGameSavePayload(serialized);
  assert(parsed.ok, 'M37 save payload should parse after roundtrip.');
  assert(!('session' in JSON.parse(serialized)), 'M37 save payload must not include session.');
  assert(parsed.payload.state.work.assignments[characterId]?.workTypeId === m37WorkIds[m37WorkIds.length - 1], 'save roundtrip should keep latest work assignment.');

  const summary = {
    route: context.session.ui.route,
    executed,
    sourceLabelDefinitions: workSourceLabelCount,
    currentMoney: context.state.economy.account.currentMoney,
    turn: context.state.run.clock.turn,
    latestWork: context.state.work.assignments[characterId]?.workTypeId,
  };
  console.log(`M37 work-all smoke passed: ${JSON.stringify(summary)}`);
}

main();
