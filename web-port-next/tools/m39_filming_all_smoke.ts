import { filmingExecutionSourceLabelCount } from '../src/catalog/filmingExecutionSourceGroups';
import type { GameDefinitions } from '../src/catalog/types';
import type { GameAction } from '../src/game/actions';
import { validateActionResultBoundary, validateSavePayloadBoundary, validateStateSessionBoundary } from '../src/game/boundaries';
import { dispatchGameAction } from '../src/game/dispatch';
import type { GameActionContext, GameActionResult } from '../src/game/results';
import { createGameSavePayload, parseGameSavePayload, serializeGameSavePayload } from '../src/game/savePayload';
import { createInitialGameData, type GameSession, type GameState } from '../src/game/state';

type SmokeContext = {
  readonly catalog: GameDefinitions;
  readonly state: GameState;
  readonly session: GameSession;
};

const m39SceneIds = [
  'filming-scene:1',
  'filming-scene:2',
  'filming-scene:3',
  'filming-scene:4',
  'filming-scene:5',
  'filming-scene:10',
] as const;

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
  assert(characterId, 'M39 smoke needs at least one character.');
  return characterId;
}

function numericSceneId(sceneId: string): number {
  const match = sceneId.match(/(\d+)$/u);
  return match ? Number(match[1]) : 0;
}

function assertShootingSessionCleared(context: SmokeContext, label: string) {
  assert(context.session.shooting.visibleCharacterIds.length === 0, `${label} should clear visible character session rows.`);
  assert(context.session.shooting.visibleSceneIds.length === 0, `${label} should clear visible scene session rows.`);
  assert(context.session.shooting.filmingAmount === 0, `${label} should clear filming amount.`);
  assert(Object.keys(context.session.shooting.sceneTemporaryValues).length === 0, `${label} should clear temporary scene values.`);
  assert(Object.keys(context.session.shooting.sceneFlags).length === 0, `${label} should clear scene flags.`);
}

function main() {
  const initialData = createInitialGameData();
  let context: SmokeContext = {
    catalog: initialData.definitions,
    state: initialData.save,
    session: initialData.session,
  };

  assert(filmingExecutionSourceLabelCount === 68, 'M39 should keep 68 filming execution source labels under coverage.');
  for (const sceneId of m39SceneIds) {
    const scene = context.catalog.filmingSceneDefinitions[sceneId];
    assert(scene, `M39 filming scene definition should exist: ${sceneId}`);
    assert(scene.revenueMoney > 0, `M39 scene should define revenue: ${sceneId}`);
    assert(scene.fanGain > 0, `M39 scene should define fan gain: ${sceneId}`);
    assert(scene.score > 0, `M39 scene should define score: ${sceneId}`);
  }
  assertNoBoundaryErrors('initial state/session', validateStateSessionBoundary(context.state, context.session));

  let step = dispatchChecked(context, { type: 'game/new', input: { modeId: 'normal' } });
  assert(step.result.status === 'success', 'normal new game should succeed.');
  context = step.context;
  const characterId = firstCharacterId(context);

  step = dispatchChecked(context, { type: 'main/openShooting' });
  assert(step.result.status === 'success', 'shooting entry should succeed.');
  context = step.context;

  const beforeNoTarget = context.state;
  step = dispatchChecked(context, { type: 'shooting/selectScene', sceneId: m39SceneIds[0] });
  assert(step.result.status === 'success', 'scene selection without target should still create scene session buffers.');
  context = step.context;
  step = dispatchChecked(context, { type: 'shooting/confirmScene' });
  assert(step.result.status === 'failure', 'confirming without target should fail.');
  assert(step.result.failure?.code === 'shooting-target-required', 'confirming without target should use shooting-target-required.');
  assert(step.result.state === beforeNoTarget, 'confirming without target should preserve save state reference.');
  context = step.context;

  const beforeSelectionCancel = context.state;
  step = dispatchChecked(context, { type: 'shooting/cancelSelection' });
  assert(step.result.status === 'success', 'shooting selection cancel should succeed.');
  context = step.context;
  assert(context.state === beforeSelectionCancel, 'selection cancel should not write save state.');
  assert(context.session.shooting.selectedCharacterId === undefined, 'selection cancel should clear target.');
  assert(context.session.shooting.selectedSceneId === undefined, 'selection cancel should clear scene.');
  assert(Object.keys(context.session.shooting.sceneTemporaryValues).length === 0, 'selection cancel should clear temporary values.');
  assert(Object.keys(context.session.shooting.sceneFlags).length === 0, 'selection cancel should clear scene flags.');

  let expectedMoney = context.state.economy.account.currentMoney;
  let expectedVideoSales = context.state.economy.videoSalesTotal;
  let expectedFanCount = 0;
  let expectedSales = 0;

  for (const sceneId of m39SceneIds) {
    const scene = context.catalog.filmingSceneDefinitions[sceneId];
    assert(scene, `scene must exist for execution smoke: ${sceneId}`);

    step = dispatchChecked(context, { type: 'main/openShooting' });
    assert(step.result.status === 'success', `shooting re-entry should succeed for ${sceneId}.`);
    context = step.context;

    step = dispatchChecked(context, { type: 'shooting/selectTarget', characterId });
    assert(step.result.status === 'success', `target selection should succeed for ${sceneId}.`);
    context = step.context;

    const stateBeforeSceneSelect = context.state;
    step = dispatchChecked(context, { type: 'shooting/selectScene', sceneId });
    assert(step.result.status === 'success', `scene selection should succeed: ${sceneId}`);
    context = step.context;
    assert(context.state === stateBeforeSceneSelect, `scene selection should not write save state: ${sceneId}`);
    assert(context.session.shooting.sceneTemporaryValues.slot_0 === scene.filmingAmount, `temporary slot_0 should hold amount: ${sceneId}`);
    assert(context.session.shooting.sceneTemporaryValues.slot_1 === scene.revenueMoney, `temporary slot_1 should hold revenue: ${sceneId}`);
    assert(context.session.shooting.sceneTemporaryValues.slot_2 === scene.fanGain, `temporary slot_2 should hold fan gain: ${sceneId}`);
    assert(context.session.shooting.sceneTemporaryValues.slot_5 === scene.score, `temporary slot_5 should hold score: ${sceneId}`);
    assert(context.session.shooting.sceneTemporaryValues.slot_22 === numericSceneId(sceneId), `temporary slot_22 should hold scene number: ${sceneId}`);
    assert(context.session.shooting.sceneFlags.flag_32 === numericSceneId(sceneId), `scene flag_32 should hold scene number: ${sceneId}`);
    assert(context.session.shooting.sceneFlags.flag_132 === scene.revenueMoney, `scene flag_132 should hold revenue: ${sceneId}`);
    assert(context.session.shooting.sceneFlags.flag_160 === scene.score, `scene flag_160 should hold score: ${sceneId}`);

    const staminaBefore = context.state.body.byCharacterId[characterId]?.bodyStats.stamina ?? 0;
    const energyBefore = context.state.body.byCharacterId[characterId]?.bodyStats.energy ?? 0;
    const experienceBefore = context.state.people.characters[characterId].attributes.experiences['filming.scene'] ?? 0;
    const dayBefore = context.state.run.clock.day;
    const turnBefore = context.state.run.clock.turn;

    step = dispatchChecked(context, { type: 'shooting/confirmScene' });
    assert(step.result.status === 'success', `scene confirmation should succeed: ${sceneId}`);
    context = step.context;

    expectedMoney += scene.revenueMoney;
    expectedVideoSales += scene.revenueMoney;
    expectedFanCount += scene.fanGain;
    expectedSales += scene.revenueMoney;

    assert(context.session.ui.route === 'mainMenu', `completed filming should return to main menu: ${sceneId}`);
    assertShootingSessionCleared(context, `completed filming ${sceneId}`);
    assert(context.state.economy.account.currentMoney === expectedMoney, `filming should add current money: ${sceneId}`);
    assert(context.state.economy.videoSalesTotal === expectedVideoSales, `filming should add video sales total: ${sceneId}`);
    assert(context.state.run.clock.day === dayBefore + 7, `filming should advance day: ${sceneId}`);
    assert(context.state.run.clock.turn === turnBefore + 1, `filming should advance turn: ${sceneId}`);
    assert(
      context.state.body.byCharacterId[characterId].bodyStats.stamina === staminaBefore + scene.bodyStatDeltas.stamina,
      `filming should apply stamina delta: ${sceneId}`,
    );
    assert(
      context.state.body.byCharacterId[characterId].bodyStats.energy === energyBefore + scene.bodyStatDeltas.energy,
      `filming should apply energy delta: ${sceneId}`,
    );
    assert(
      context.state.people.characters[characterId].attributes.experiences['filming.scene'] === experienceBefore + 1,
      `filming should apply scene experience: ${sceneId}`,
    );
    assert(context.state.work.filmingByCharacterId[characterId]?.sales === expectedSales, `filming sales should accumulate: ${sceneId}`);
    assert(context.state.work.filmingByCharacterId[characterId]?.fanCount === expectedFanCount, `fan count should accumulate: ${sceneId}`);
    assert(context.state.work.filmingByCharacterId[characterId]?.latestReleaseId === sceneId, `latest release should persist: ${sceneId}`);
    assert(context.state.work.careerFlagsByCharacterId[characterId]?.['filming.debuted'] === true, `debut flag should persist: ${sceneId}`);
    assert(
      context.state.work.careerFlagsByCharacterId[characterId]?.[`${sceneId}.completedCount`] === 1,
      `scene completion count should persist: ${sceneId}`,
    );
    assert(context.state.work.filmingProgressFlags.flag_120 === scene.revenueMoney, `progress flag_120 should hold latest revenue: ${sceneId}`);
    assert(context.state.work.filmingProgressFlags.flag_124 === sceneId, `progress flag_124 should hold latest scene id: ${sceneId}`);
    assert(context.state.work.filmingProgressFlags.flag_641 === scene.revenueMoney, `progress flag_641 should hold latest revenue: ${sceneId}`);
    assert(context.state.work.filmingProgressFlags.flag_642 === scene.fanGain, `progress flag_642 should hold latest fan gain: ${sceneId}`);
    assert(context.state.work.filmingProgressFlags.flag_643 === scene.score, `progress flag_643 should hold latest score: ${sceneId}`);
    assert(context.state.work.filmingProgressFlags.flag_731 === sceneId, `progress flag_731 should hold latest release id: ${sceneId}`);
  }

  step = dispatchChecked(context, { type: 'main/openShooting' });
  assert(step.result.status === 'success', 'shooting entry before full cancel should succeed.');
  context = step.context;
  step = dispatchChecked(context, { type: 'shooting/selectTarget', characterId });
  assert(step.result.status === 'success', 'target selection before full cancel should succeed.');
  context = step.context;
  step = dispatchChecked(context, { type: 'shooting/selectScene', sceneId: m39SceneIds[0] });
  assert(step.result.status === 'success', 'scene selection before full cancel should succeed.');
  context = step.context;
  const beforeFullCancelState = context.state;
  step = dispatchChecked(context, { type: 'shooting/cancel' });
  assert(step.result.status === 'success', 'shooting full cancel should succeed.');
  context = step.context;
  assert(context.state === beforeFullCancelState, 'shooting full cancel should not write save state.');
  assert(context.session.ui.route === 'mainMenu', 'shooting full cancel should return to main menu.');
  assertShootingSessionCleared(context, 'shooting full cancel');

  const savePayload = createGameSavePayload(context.state, new Date('2026-05-01T00:00:00.000Z'));
  assertNoBoundaryErrors('M39 save payload', validateSavePayloadBoundary(savePayload));
  assert(savePayload.state.economy.videoSalesTotal === expectedVideoSales, 'save payload should persist video sales total.');
  assert(savePayload.state.work.filmingProgressFlags.flag_731 === m39SceneIds[m39SceneIds.length - 1], 'save payload should persist latest filming progress flag.');
  assert(savePayload.state.work.filmingByCharacterId[characterId]?.sales === expectedSales, 'save payload should persist accumulated filming sales.');
  const serialized = serializeGameSavePayload(savePayload);
  const parsed = parseGameSavePayload(serialized);
  assert(parsed.ok, 'M39 save payload should parse after roundtrip.');
  assert(!('session' in JSON.parse(serialized)), 'M39 save payload must not include session.');
  assert(!serialized.includes('sceneTemporaryValues'), 'M39 save payload must not include temporary scene values.');
  assert(!serialized.includes('sceneFlags'), 'M39 save payload must not include scene flags.');
  assert(!serialized.includes('visibleSceneIds'), 'M39 save payload must not include visible scene session rows.');

  const summary = {
    route: context.session.ui.route,
    scenes: m39SceneIds.length,
    currentMoney: context.state.economy.account.currentMoney,
    videoSalesTotal: context.state.economy.videoSalesTotal,
    latestReleaseId: context.state.work.filmingByCharacterId[characterId]?.latestReleaseId,
  };
  console.log(`M39 filming-all smoke passed: ${JSON.stringify(summary)}`);
}

main();
