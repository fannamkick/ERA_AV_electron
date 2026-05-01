import type { GameDefinitions } from '../src/catalog/types';
import { buildTrainingView } from '../src/features/training';
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
  assert(characterId, 'M42 smoke needs at least one character.');
  return characterId;
}

function freshPreparedContext(commandId: string): SmokeContext {
  const initialData = createInitialGameData();
  let context: SmokeContext = {
    catalog: initialData.definitions,
    state: initialData.save,
    session: initialData.session,
  };
  assert(context.catalog.trainingCommands[commandId], `M42 command ${commandId} must exist in catalog.`);
  assertNoBoundaryErrors('initial state/session', validateStateSessionBoundary(context.state, context.session));

  let step = dispatchChecked(context, { type: 'game/new', input: { modeId: 'normal' } });
  assert(step.result.status === 'success', 'normal new game should succeed.');
  context = step.context;
  const characterId = firstCharacterId(context);

  step = dispatchChecked(context, { type: 'main/openTraining' });
  assert(step.result.status === 'success', 'training entry should succeed.');
  context = step.context;
  step = dispatchChecked(context, { type: 'training/selectTarget', characterId });
  assert(step.result.status === 'success', 'training target selection should succeed.');
  context = step.context;
  step = dispatchChecked(context, { type: 'training/selectExecutor', characterId });
  assert(step.result.status === 'success', 'training executor selection should succeed.');
  return step.context;
}

function hasAnyNumericValue(record: Record<string, number | { readonly up: number; readonly down: number }>): boolean {
  return Object.values(record).some((value) => (typeof value === 'number' ? value !== 0 : value.up !== 0 || value.down !== 0));
}

function verifyExecutableCommand(commandId: string): 'success' | 'unavailable' {
  let context = freshPreparedContext(commandId);
  const characterId = firstCharacterId(context);
  const command = context.catalog.trainingCommands[commandId]!;
  const beforeSelectState = context.state;
  let step = dispatchChecked(context, { type: 'training/selectCommand', commandId });

  if (step.result.status === 'failure') {
    assert(step.result.failure?.code === 'training-command-unavailable', `command ${commandId} unavailable path should use training-command-unavailable.`);
    assert(step.result.state === beforeSelectState, `unavailable command ${commandId} should not write save state.`);
    return 'unavailable';
  }

  assert(step.result.status === 'success', `command ${commandId} selection should succeed or be unavailable.`);
  context = step.context;
  assert(context.session.interaction.commandFlow.selectedCommandId === commandId, `command ${commandId} should be selected in session.`);
  assert(hasAnyNumericValue(context.session.interaction.sources), `command ${commandId} should create source preview buffers.`);
  assert(hasAnyNumericValue(context.session.interaction.paramDeltas), `command ${commandId} should create param preview buffers.`);
  assert(hasAnyNumericValue(context.session.interaction.baseLoss), `command ${commandId} should create body cost preview buffers.`);
  assert(
    !JSON.stringify(context.state).includes('paramDeltas'),
    `command ${commandId} source calculation buffers should not be saved during selection.`,
  );

  const selectedView = buildTrainingView(context.catalog, context.state, context.session).selectedCommand;
  assert(selectedView?.commandId === commandId && selectedView.available === true, `command ${commandId} selected view should be executable.`);

  const beforeCancelState = context.state;
  step = dispatchChecked(context, { type: 'training/cancelSelection' });
  assert(step.result.status === 'success', `command ${commandId} cancelSelection should succeed.`);
  assert(step.result.state === beforeCancelState, `command ${commandId} cancelSelection should preserve save state.`);
  assert(Object.keys(step.result.session.interaction.sources).length === 0, `command ${commandId} cancelSelection should clear source buffers.`);

  context = freshPreparedContext(commandId);
  step = dispatchChecked(context, { type: 'training/selectCommand', commandId });
  assert(step.result.status === 'success', `command ${commandId} reselection should succeed.`);
  context = step.context;

  const bodyBefore = context.state.body.byCharacterId[characterId]!;
  const paramsBefore = { ...bodyBefore.conditionParams };
  const staminaBefore = bodyBefore.bodyStats.stamina ?? 0;
  const energyBefore = bodyBefore.bodyStats.energy ?? 0;
  const resourcesBefore = { ...bodyBefore.trainingResources };
  const experienceBefore = { ...context.state.people.characters[characterId].attributes.experiences };
  const expectedParamDelta = Object.entries(command.paramDeltas ?? {}).reduce((sum, [, delta]) => sum + delta.up - delta.down, 0);
  const expectedResourceDelta = Object.entries(command.resourceDeltas ?? {}).reduce((sum, [, delta]) => sum + delta, 0);
  const expectedExperienceDelta = Object.entries(command.experienceDeltas ?? {}).reduce((sum, [, delta]) => sum + delta, 0);
  const expectedStaminaDelta = command.bodyStatDeltas?.stamina ?? 0;
  const expectedEnergyDelta = command.bodyStatDeltas?.energy ?? 0;

  step = dispatchChecked(context, { type: 'training/execute' });
  assert(step.result.status === 'success', `command ${commandId} execution should succeed.`);
  context = step.context;
  assert(context.session.ui.route === 'mainMenu', `command ${commandId} should return to main menu after execution.`);
  assert(Object.keys(context.session.interaction.sources).length === 0, `command ${commandId} execution should clear source buffers.`);
  assert(Object.keys(context.session.interaction.paramDeltas).length === 0, `command ${commandId} execution should clear param buffers.`);
  assert(context.session.interaction.commandFlow.selectedCommandId === undefined, `command ${commandId} execution should clear command flow.`);

  const bodyAfter = context.state.body.byCharacterId[characterId]!;
  const paramAfterTotal = Object.values(bodyAfter.conditionParams).reduce((sum, value) => sum + value, 0);
  const paramBeforeTotal = Object.values(paramsBefore).reduce((sum, value) => sum + value, 0);
  const resourceAfterTotal = Object.values(bodyAfter.trainingResources).reduce((sum, value) => sum + value, 0);
  const resourceBeforeTotal = Object.values(resourcesBefore).reduce((sum, value) => sum + value, 0);
  const experienceAfterTotal = Object.values(context.state.people.characters[characterId].attributes.experiences).reduce((sum, value) => sum + value, 0);
  const experienceBeforeTotal = Object.values(experienceBefore).reduce((sum, value) => sum + value, 0);

  assert(bodyAfter.bodyStats.stamina === staminaBefore + expectedStaminaDelta, `command ${commandId} should apply stamina delta.`);
  assert(bodyAfter.bodyStats.energy === energyBefore + expectedEnergyDelta, `command ${commandId} should apply energy delta.`);
  assert(paramAfterTotal === paramBeforeTotal + expectedParamDelta, `command ${commandId} should apply param deltas.`);
  assert(resourceAfterTotal === resourceBeforeTotal + expectedResourceDelta, `command ${commandId} should apply resource deltas.`);
  assert(experienceAfterTotal === experienceBeforeTotal + expectedExperienceDelta, `command ${commandId} should apply experience deltas.`);
  assert(
    context.state.people.characters[characterId].flags.featureProgress['training.latestCommandId'] === commandId,
    `command ${commandId} should persist latest command progress.`,
  );

  const savePayload = createGameSavePayload(context.state, new Date('2026-05-01T00:00:00.000Z'));
  assertNoBoundaryErrors('save payload', validateSavePayloadBoundary(savePayload));
  assert(!JSON.stringify(savePayload).includes('commandFlow'), 'save payload should not include training command flow.');
  assert(!JSON.stringify(savePayload).includes('paramDeltas'), 'save payload should not include training calculation buffers.');
  assert(!JSON.stringify(savePayload).includes('resultBuffers'), 'save payload should not include training result buffers.');

  return 'success';
}

function main() {
  const commandIds = Array.from({ length: 35 }, (_, index) => String(index));
  let success = 0;
  let unavailable = 0;

  for (const commandId of commandIds) {
    const status = verifyExecutableCommand(commandId);
    if (status === 'success') success += 1;
    if (status === 'unavailable') unavailable += 1;
  }

  assert(success > 0, 'M42 smoke must execute at least one command successfully.');
  assert(success + unavailable === commandIds.length, 'M42 smoke must account every command 0-34.');
  console.log(`M42 training effect smoke passed: ${JSON.stringify({ commands: commandIds.length, success, unavailable })}`);
}

main();
