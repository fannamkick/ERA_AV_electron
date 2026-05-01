import type { GameDefinitions } from '../src/catalog/types';
import type { GameAction } from '../src/game/actions';
import { validateActionResultBoundary, validateSavePayloadBoundary, validateStateSessionBoundary } from '../src/game/boundaries';
import { dispatchGameAction } from '../src/game/dispatch';
import type { GameActionContext, GameActionResult } from '../src/game/results';
import { createGameSavePayload, parseGameSavePayload, serializeGameSavePayload } from '../src/game/savePayload';
import { createInitialGameData, type GameSession, type GameState } from '../src/game/state';
import { buildShootingView } from '../src/features/shooting';

type SmokeContext = {
  readonly catalog: GameDefinitions;
  readonly state: GameState;
  readonly session: GameSession;
};

const m38SceneIds = [
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
  assert(characterId, 'M38 smoke needs at least one character.');
  return characterId;
}

function withoutBodyRecord(context: SmokeContext, characterId: string): SmokeContext {
  const { [characterId]: _removed, ...remainingBody } = context.state.body.byCharacterId;
  return {
    ...context,
    state: {
      ...context.state,
      body: {
        ...context.state.body,
        byCharacterId: remainingBody,
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

  for (const sceneId of m38SceneIds) {
    const scene = context.catalog.filmingSceneDefinitions[sceneId];
    assert(scene, `M38 filming scene definition should exist: ${sceneId}`);
    assert(scene.source.path.includes('撮影シーン関連'), `M38 scene should keep original scene source path: ${sceneId}`);
    assert(scene.defaultAvailable === true, `M38 scene should be visible by default: ${sceneId}`);
    assert(scene.filmingAmount > 0, `M38 scene should define expected filming amount: ${sceneId}`);
  }
  assertNoBoundaryErrors('initial state/session', validateStateSessionBoundary(context.state, context.session));

  let step = dispatchChecked(context, { type: 'game/new', input: { modeId: 'normal' } });
  assert(step.result.status === 'success', 'normal new game should succeed.');
  context = step.context;
  const characterId = firstCharacterId(context);

  step = dispatchChecked(context, { type: 'main/openShooting' });
  assert(step.result.status === 'success', 'shooting entry should succeed.');
  context = step.context;
  assert(context.session.ui.route === 'shooting', 'shooting entry should route to shooting.');
  for (const sceneId of m38SceneIds) {
    assert(context.session.shooting.visibleSceneIds.includes(sceneId), `shooting session should expose ${sceneId}.`);
  }

  const view = buildShootingView(context.catalog, context.state, context.session);
  for (const sceneId of m38SceneIds) {
    const sceneView = view.visibleScenes.find((scene) => scene.sceneId === sceneId);
    assert(sceneView, `shooting view should expose scene ${sceneId}.`);
    assert(sceneView.available === true, `M38 scene should be selectable: ${sceneId}.`);
    assert(sceneView.filmingAmount > 0, `shooting view should expose expected amount for ${sceneId}.`);
  }

  const beforeInvalidScene = context.state;
  step = dispatchChecked(context, { type: 'shooting/selectScene', sceneId: 'missing-scene' });
  assert(step.result.status === 'failure', 'missing scene selection should fail.');
  assert(step.result.failure?.code === 'definition-not-found', 'missing scene should use definition-not-found.');
  assert(step.result.state === beforeInvalidScene, 'missing scene should preserve save state reference.');
  context = step.context;

  const missingBodyContext = withoutBodyRecord(context, characterId);
  step = dispatchChecked(missingBodyContext, { type: 'shooting/selectTarget', characterId });
  assert(step.result.status === 'failure', 'target without body state should fail.');
  assert(step.result.failure?.code === 'shooting-target-unavailable', 'target without body should use unavailable code.');

  step = dispatchChecked(context, { type: 'shooting/selectTarget', characterId });
  assert(step.result.status === 'success', 'target selection should succeed.');
  context = step.context;

  for (const sceneId of m38SceneIds) {
    const beforeSelect = context.state;
    const definition = context.catalog.filmingSceneDefinitions[sceneId];
    step = dispatchChecked(context, { type: 'shooting/selectScene', sceneId });
    assert(step.result.status === 'success', `scene selection should succeed: ${sceneId}`);
    context = step.context;
    assert(context.state === beforeSelect, `scene selection should not write save state: ${sceneId}`);
    assert(context.session.shooting.selectedSceneId === sceneId, `scene selection should be session state: ${sceneId}`);
    assert(context.session.shooting.filmingAmount === definition.filmingAmount, `scene selection should copy filming amount: ${sceneId}`);
  }

  const beforeCancelSelection = context.state;
  step = dispatchChecked(context, { type: 'shooting/cancelSelection' });
  assert(step.result.status === 'success', 'shooting selection cancel should succeed.');
  context = step.context;
  assert(context.state === beforeCancelSelection, 'selection cancel should not write save state.');
  assert(context.session.shooting.selectedCharacterId === undefined, 'selection cancel should clear target.');
  assert(context.session.shooting.selectedSceneId === undefined, 'selection cancel should clear scene.');
  assert(context.session.shooting.filmingAmount === 0, 'selection cancel should clear amount buffer.');

  step = dispatchChecked(context, { type: 'shooting/cancel' });
  assert(step.result.status === 'success', 'shooting cancel should succeed.');
  context = step.context;
  assert(context.session.ui.route === 'mainMenu', 'shooting cancel should return to main menu.');
  assert(context.session.shooting.visibleSceneIds.length === 0, 'shooting cancel should clear visible scenes.');

  const savePayload = createGameSavePayload(context.state, new Date('2026-05-01T00:00:00.000Z'));
  assertNoBoundaryErrors('M38 save payload', validateSavePayloadBoundary(savePayload));
  const serialized = serializeGameSavePayload(savePayload);
  const parsed = parseGameSavePayload(serialized);
  assert(parsed.ok, 'M38 save payload should parse after roundtrip.');
  assert(!('session' in JSON.parse(serialized)), 'M38 save payload must not include session.');
  assert(!serialized.includes('visibleSceneIds'), 'M38 save payload must not include visible scene session rows.');

  const summary = {
    route: context.session.ui.route,
    scenes: m38SceneIds.length,
    visibleAfterCancel: context.session.shooting.visibleSceneIds.length,
  };
  console.log(`M38 filming-scene smoke passed: ${JSON.stringify(summary)}`);
}

main();
