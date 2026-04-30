import type { GameDefinitions } from '../src/catalog/types';
import { buildMainMenuView } from '../src/features/mainMenu';
import type { GameAction } from '../src/game/actions';
import { validateActionResultBoundary, validateSavePayloadBoundary, validateStateSessionBoundary } from '../src/game/boundaries';
import { dispatchGameAction } from '../src/game/dispatch';
import type { GameActionContext, GameActionResult } from '../src/game/results';
import { createGameSavePayload } from '../src/game/savePayload';
import { createInitialGameData, type GameSession, type GameState } from '../src/game/state';

type SmokeContext = {
  readonly catalog: GameDefinitions;
  readonly state: GameState;
  readonly session: GameSession;
};

const sceneId = 'filming:debut.basic';
const revenueMoney = 300;
const fanGain = 5;
const score = 10;
const filmingAmount = 1;

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
  assert(characterId, 'M13 smoke needs at least one character.');
  return characterId;
}

function main() {
  const initialData = createInitialGameData();
  let context: SmokeContext = {
    catalog: initialData.definitions,
    state: initialData.save,
    session: initialData.session,
  };

  assert(context.catalog.filmingSceneDefinitions[sceneId], 'M13 smoke filming scene definition should exist.');
  assertNoBoundaryErrors('initial state/session', validateStateSessionBoundary(context.state, context.session));

  let step = dispatchChecked(context, { type: 'game/new', input: { modeId: 'normal' } });
  assert(step.result.status === 'success', 'normal new game should succeed.');
  context = step.context;
  const characterId = firstCharacterId(context);

  const menu = buildMainMenuView(context.state, context.catalog);
  const shootingMenuItem = menu.menuItems.find((item) => item.id === '104');
  assert(shootingMenuItem?.enabled === true, 'M13 should enable shooting from the main menu.');
  assert(shootingMenuItem.route === 'shooting', 'shooting menu item should route to shooting.');

  step = dispatchChecked(context, { type: 'main/openShooting' });
  assert(step.result.status === 'success', 'shooting entry should succeed.');
  context = step.context;
  assert(context.session.ui.route === 'shooting', 'shooting entry should route to shooting.');
  assert(context.session.shooting.visibleCharacterIds.includes(characterId), 'shooting screen should include the starting character.');
  assert(context.session.shooting.visibleSceneIds.includes(sceneId), 'shooting screen should include the M13 filming scene.');
  assert(context.session.shooting.filmingAmount === 0, 'shooting entry should not calculate amount before scene selection.');

  const beforeInvalidTarget = context.state;
  step = dispatchChecked(context, { type: 'shooting/selectTarget', characterId: 'missing-character' });
  assert(step.result.status === 'failure', 'missing shooting target selection should fail.');
  assert(step.result.failure?.code === 'shooting-target-not-found', 'missing shooting target should use shooting-target-not-found.');
  assert(step.result.state === beforeInvalidTarget, 'missing target selection should preserve save state reference.');
  context = step.context;

  const beforeNoTargetConfirm = context.state;
  step = dispatchChecked(context, { type: 'shooting/confirmScene' });
  assert(step.result.status === 'failure', 'confirming without target should fail.');
  assert(step.result.failure?.code === 'shooting-target-required', 'confirming without target should use shooting-target-required.');
  assert(step.result.state === beforeNoTargetConfirm, 'missing target confirm should preserve save state reference.');
  context = step.context;

  step = dispatchChecked(context, { type: 'shooting/selectTarget', characterId });
  assert(step.result.status === 'success', 'shooting target selection should succeed.');
  context = step.context;
  assert(context.session.shooting.selectedCharacterId === characterId, 'shooting target selection should be session state.');

  const beforeNoSceneConfirm = context.state;
  step = dispatchChecked(context, { type: 'shooting/confirmScene' });
  assert(step.result.status === 'failure', 'confirming without scene should fail.');
  assert(step.result.failure?.code === 'shooting-scene-required', 'confirming without scene should use shooting-scene-required.');
  assert(step.result.state === beforeNoSceneConfirm, 'missing scene confirm should preserve save state reference.');
  context = step.context;

  step = dispatchChecked(context, { type: 'shooting/selectScene', sceneId: 'missing-scene' });
  assert(step.result.status === 'failure', 'missing shooting scene selection should fail.');
  assert(step.result.failure?.code === 'definition-not-found', 'missing shooting scene should use definition-not-found.');
  assert(step.result.state === beforeNoSceneConfirm, 'missing scene selection should preserve save state reference.');
  context = step.context;

  step = dispatchChecked(context, { type: 'shooting/selectScene', sceneId });
  assert(step.result.status === 'success', 'shooting scene selection should succeed.');
  context = step.context;
  assert(context.session.shooting.selectedSceneId === sceneId, 'shooting scene selection should be session state.');
  assert(context.session.shooting.filmingAmount === filmingAmount, 'shooting scene selection should calculate filming amount in session.');

  const beforeCancel = context.state;
  step = dispatchChecked(context, { type: 'shooting/cancelSelection' });
  assert(step.result.status === 'success', 'shooting selection cancel should succeed.');
  context = step.context;
  assert(context.state === beforeCancel, 'shooting selection cancel should not write save state.');
  assert(context.session.ui.route === 'shooting', 'shooting selection cancel should stay on shooting route.');
  assert(context.session.shooting.selectedCharacterId === undefined, 'shooting selection cancel should clear target.');
  assert(context.session.shooting.selectedSceneId === undefined, 'shooting selection cancel should clear scene.');
  assert(context.session.shooting.filmingAmount === 0, 'shooting selection cancel should clear amount buffer.');

  step = dispatchChecked(context, { type: 'shooting/cancel' });
  assert(step.result.status === 'success', 'shooting screen cancel should succeed.');
  context = step.context;
  assert(context.session.ui.route === 'mainMenu', 'shooting screen cancel should return to main menu.');
  assert(context.session.shooting.visibleCharacterIds.length === 0, 'shooting screen cancel should clear target candidates.');
  assert(context.state.work.filmingByCharacterId[characterId] === undefined, 'shooting cancel should not write filming progress.');

  step = dispatchChecked(context, { type: 'main/openShooting' });
  assert(step.result.status === 'success', 'shooting re-entry should succeed.');
  context = step.context;
  step = dispatchChecked(context, { type: 'shooting/selectTarget', characterId });
  assert(step.result.status === 'success', 'shooting target reselection should succeed.');
  context = step.context;
  step = dispatchChecked(context, { type: 'shooting/selectScene', sceneId });
  assert(step.result.status === 'success', 'shooting scene reselection should succeed.');
  context = step.context;

  const moneyBeforeShooting = context.state.economy.account.currentMoney;
  const dayBeforeShooting = context.state.run.clock.day;
  const turnBeforeShooting = context.state.run.clock.turn;
  const staminaBeforeShooting = context.state.body.byCharacterId[characterId]?.bodyStats.stamina ?? 0;
  const energyBeforeShooting = context.state.body.byCharacterId[characterId]?.bodyStats.energy ?? 0;
  const experienceBeforeShooting = context.state.people.characters[characterId].attributes.experiences['filming.basic'] ?? 0;

  step = dispatchChecked(context, { type: 'shooting/confirmScene' });
  assert(step.result.status === 'success', 'selected shooting scene should confirm.');
  context = step.context;
  assert(context.session.ui.route === 'mainMenu', 'completed shooting should return to main menu through turn end.');
  assert(context.state.economy.account.currentMoney === moneyBeforeShooting + revenueMoney, 'shooting should add revenue money.');
  assert(context.state.run.clock.day === dayBeforeShooting + 7, 'completed shooting should advance day by turn end.');
  assert(context.state.run.clock.turn === turnBeforeShooting + 1, 'completed shooting should advance turn.');
  assert(context.state.run.clock.phase === 'freeAction', 'completed shooting should return phase to freeAction.');
  assert(context.session.shooting.visibleCharacterIds.length === 0, 'completed shooting should clear target session state.');
  assert(context.session.shooting.visibleSceneIds.length === 0, 'completed shooting should clear scene session state.');
  assert(context.session.shooting.filmingAmount === 0, 'completed shooting should clear amount buffer.');
  assert(
    context.state.body.byCharacterId[characterId].bodyStats.stamina === staminaBeforeShooting - 12,
    'shooting should apply stamina delta.',
  );
  assert(
    context.state.body.byCharacterId[characterId].bodyStats.energy === energyBeforeShooting - 8,
    'shooting should apply energy delta.',
  );
  assert(
    context.state.people.characters[characterId].attributes.experiences['filming.basic'] === experienceBeforeShooting + 1,
    'shooting should apply filming experience delta.',
  );
  assert(context.state.work.filmingByCharacterId[characterId]?.sales === revenueMoney, 'shooting should persist filming sales.');
  assert(context.state.work.filmingByCharacterId[characterId]?.fanCount === fanGain, 'shooting should persist fan gain.');
  assert(context.state.work.filmingByCharacterId[characterId]?.latestReleaseId === sceneId, 'shooting should persist latest release id.');
  assert(context.state.work.careerFlagsByCharacterId[characterId]?.['filming.debuted'] === true, 'shooting should persist debut flag.');
  assert(context.state.work.careerFlagsByCharacterId[characterId]?.['filming.latestScore'] === score, 'shooting should persist latest score.');
  assert(context.state.work.careerFlagsByCharacterId[characterId]?.['filming.bestScore'] === score, 'shooting should persist best score.');
  assert(
    context.state.work.careerFlagsByCharacterId[characterId]?.[`${sceneId}.completedCount`] === 1,
    'shooting should persist scene completion count.',
  );

  const savePayload = createGameSavePayload(context.state, new Date('2026-04-30T00:00:00.000Z'));
  assertNoBoundaryErrors('save payload', validateSavePayloadBoundary(savePayload));
  assert(savePayload.state.work.filmingByCharacterId[characterId]?.latestReleaseId === sceneId, 'save payload should include filming result.');
  assert(
    savePayload.state.people.characters[characterId].attributes.experiences['filming.basic'] === experienceBeforeShooting + 1,
    'save payload should include filming experience result.',
  );
  assert(!JSON.stringify(savePayload).includes('visibleSceneIds'), 'save payload should not include shooting session choices.');
  assertHasBoundaryError('save payload with top-level shooting session', validateSavePayloadBoundary({ ...savePayload, session: context.session }));

  const summary = {
    route: context.session.ui.route,
    currentMoney: context.state.economy.account.currentMoney,
    day: context.state.run.clock.day,
    turn: context.state.run.clock.turn,
    latestReleaseId: context.state.work.filmingByCharacterId[characterId]?.latestReleaseId,
    fanCount: context.state.work.filmingByCharacterId[characterId]?.fanCount,
  };
  console.log(`M13 shooting smoke passed: ${JSON.stringify(summary)}`);
}

main();
