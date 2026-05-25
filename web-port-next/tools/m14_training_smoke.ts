import type { GameDefinitions } from '../src/catalog/types';
import { buildMainMenuView } from '../src/features/mainMenu';
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

const commandId = '0';
const stimulusId = '0';
const pleasureParamId = '0';
const desireParamId = '5';
const resourceId = '0';
const experienceId = '14';

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

function firstTrainableCharacterId(context: SmokeContext): string {
  const characterId = Object.keys(context.state.people.characters)
    .sort()
    .find((candidateId) => candidateId !== '0' && candidateId !== 'character:0');
  assert(characterId, 'M14 smoke needs at least one trainable non-master character.');
  return characterId;
}

function masterCharacterId(context: SmokeContext): string {
  const characterId = Object.keys(context.state.people.characters)
    .sort()
    .find((candidateId) => candidateId === '0' || candidateId === 'character:0');
  assert(characterId, 'M14 smoke needs a master character.');
  return characterId;
}

function main() {
  const initialData = createInitialGameData();
  let context: SmokeContext = {
    catalog: initialData.definitions,
    state: initialData.save,
    session: initialData.session,
  };

  assert(context.catalog.trainingCommands[commandId]?.defaultAvailable === true, 'M14 smoke training command should be executable.');
  assertNoBoundaryErrors('initial state/session', validateStateSessionBoundary(context.state, context.session));

  let step = dispatchChecked(context, { type: 'game/new', input: { modeId: 'easy' } });
  assert(step.result.status === 'success', 'easy new game should succeed.');
  context = step.context;
  const targetCharacterId = firstTrainableCharacterId(context);
  const executorCharacterId = masterCharacterId(context);

  const menu = buildMainMenuView(context.state, context.catalog);
  const trainingMenuItem = menu.menuItems.find((item) => item.id === '100');
  assert(trainingMenuItem?.enabled === true, 'M14 should enable training from the main menu.');
  assert(trainingMenuItem.route === 'training', 'training menu item should route to training.');

  step = dispatchChecked(context, { type: 'main/openTraining' });
  assert(step.result.status === 'success', 'training entry should succeed.');
  context = step.context;
  assert(context.session.ui.route === 'training', 'training entry should route to training.');

  let trainingView = buildTrainingView(context.catalog, context.state, context.session);
  assert(trainingView.participants.some((participant) => participant.characterId === targetCharacterId), 'training view should include starting character.');
  assert(trainingView.visibleCommands.some((command) => command.commandId === commandId), 'training view should include M14 command.');
  assert(
    trainingView.visibleCommands.find((command) => command.commandId === commandId)?.available === false,
    'training command should be unavailable before target/executor selection.',
  );

  const beforeNoCommandExecute = context.state;
  step = dispatchChecked(context, { type: 'training/execute' });
  assert(step.result.status === 'failure', 'executing without command should fail.');
  assert(step.result.failure?.code === 'training-command-required', 'executing without command should use training-command-required.');
  assert(step.result.state === beforeNoCommandExecute, 'missing command execution should preserve save state reference.');
  context = step.context;

  const beforeNoTargetCommand = context.state;
  step = dispatchChecked(context, { type: 'training/selectCommand', commandId });
  assert(step.result.status === 'failure', 'selecting command without target should fail.');
  assert(step.result.failure?.code === 'training-target-required', 'selecting command without target should use training-target-required.');
  assert(step.result.state === beforeNoTargetCommand, 'missing target command selection should preserve save state reference.');
  context = step.context;

  step = dispatchChecked(context, { type: 'training/selectTarget', characterId: 'missing-character' });
  assert(step.result.status === 'failure', 'missing training target selection should fail.');
  assert(step.result.failure?.code === 'training-target-not-found', 'missing training target should use training-target-not-found.');
  assert(step.result.state === beforeNoTargetCommand, 'missing target selection should preserve save state reference.');
  context = step.context;

  step = dispatchChecked(context, { type: 'training/selectTarget', characterId: targetCharacterId });
  assert(step.result.status === 'success', 'training target selection should succeed.');
  context = step.context;
  assert(context.session.interaction.participants.targetId === targetCharacterId, 'training target selection should be session state.');

  const beforeNoExecutorCommand = context.state;
  const contextWithoutExecutor: SmokeContext = {
    ...context,
    session: {
      ...context.session,
      interaction: {
        ...context.session.interaction,
        participants: {
          ...context.session.interaction.participants,
          masterId: undefined,
        },
      },
    },
  };
  step = dispatchChecked(contextWithoutExecutor, { type: 'training/selectCommand', commandId });
  assert(step.result.status === 'failure', 'selecting command without executor should fail.');
  assert(step.result.failure?.code === 'training-executor-required', 'selecting command without executor should use training-executor-required.');
  assert(step.result.state === beforeNoExecutorCommand, 'missing executor command selection should preserve save state reference.');

  step = dispatchChecked(context, { type: 'training/selectExecutor', characterId: 'missing-character' });
  assert(step.result.status === 'failure', 'missing training executor selection should fail.');
  assert(step.result.failure?.code === 'training-executor-not-found', 'missing training executor should use training-executor-not-found.');
  assert(step.result.state === beforeNoExecutorCommand, 'missing executor selection should preserve save state reference.');
  context = step.context;

  step = dispatchChecked(context, { type: 'training/selectExecutor', characterId: executorCharacterId });
  assert(step.result.status === 'success', 'training executor selection should succeed.');
  context = step.context;
  assert(context.session.interaction.participants.masterId === executorCharacterId, 'training executor selection should be session state.');

  step = dispatchChecked(context, { type: 'training/selectCommand', commandId: 'missing-command' });
  assert(step.result.status === 'failure', 'missing training command selection should fail.');
  assert(step.result.failure?.code === 'definition-not-found', 'missing training command should use definition-not-found.');
  assert(step.result.state === beforeNoExecutorCommand, 'missing command selection should preserve save state reference.');
  context = step.context;

  step = dispatchChecked(context, { type: 'training/selectCommand', commandId });
  assert(step.result.status === 'success', 'training command selection should succeed.');
  context = step.context;
  assert(context.session.interaction.commandFlow.selectedCommandId === commandId, 'training command selection should be session state.');
  assert(context.session.interaction.sources[stimulusId] === 12, 'training stimulus calculation should stay in session.');
  assert(context.session.interaction.paramDeltas[pleasureParamId]?.up === 10, 'training param increase should stay in session.');
  assert(context.session.interaction.paramDeltas[desireParamId]?.up === 3, 'training secondary param increase should stay in session.');
  assert(context.session.interaction.baseLoss.stamina === 4, 'training stamina cost buffer should stay in session.');
  assert(context.session.interaction.baseLoss.energy === 3, 'training energy cost buffer should stay in session.');
  assert(context.session.interaction.resultBuffers.gotJuel[resourceId] === 1, 'training resource buffer should stay in session.');

  trainingView = buildTrainingView(context.catalog, context.state, context.session);
  assert(trainingView.selectedCommand?.available === true, 'selected training command should be executable after participant selection.');
  assert(trainingView.bufferSummary.stimulusTotal === 12, 'training view should summarize stimulus buffer.');
  assert(trainingView.bufferSummary.paramUpTotal === 13, 'training view should summarize param buffer.');

  const beforeCancel = context.state;
  step = dispatchChecked(context, { type: 'training/cancelSelection' });
  assert(step.result.status === 'success', 'training selection cancel should succeed.');
  context = step.context;
  assert(context.state === beforeCancel, 'training selection cancel should not write save state.');
  assert(context.session.ui.route === 'training', 'training selection cancel should stay on training route.');
  assert(context.session.interaction.participants.targetId === targetCharacterId, 'training selection cancel should keep target.');
  assert(context.session.interaction.participants.masterId === executorCharacterId, 'training selection cancel should keep executor.');
  assert(context.session.interaction.commandFlow.selectedCommandId === undefined, 'training selection cancel should clear command.');
  assert(Object.keys(context.session.interaction.sources).length === 0, 'training selection cancel should clear stimulus buffers.');

  step = dispatchChecked(context, { type: 'training/cancel' });
  assert(step.result.status === 'success', 'training screen cancel should succeed.');
  context = step.context;
  assert(context.session.ui.route === 'mainMenu', 'training screen cancel should return to main menu.');
  assert(context.state.body.byCharacterId[targetCharacterId].conditionParams[pleasureParamId] === undefined, 'training cancel should not write params.');

  step = dispatchChecked(context, { type: 'main/openTraining' });
  assert(step.result.status === 'success', 'training re-entry should succeed.');
  context = step.context;
  step = dispatchChecked(context, { type: 'training/selectTarget', characterId: targetCharacterId });
  assert(step.result.status === 'success', 'training target reselection should succeed.');
  context = step.context;
  step = dispatchChecked(context, { type: 'training/selectExecutor', characterId: executorCharacterId });
  assert(step.result.status === 'success', 'training executor reselection should succeed.');
  context = step.context;
  step = dispatchChecked(context, { type: 'training/selectCommand', commandId });
  assert(step.result.status === 'success', 'training command reselection should succeed.');
  context = step.context;

  const dayBeforeTraining = context.state.run.clock.day;
  const turnBeforeTraining = context.state.run.clock.turn;
  const timeSlotBeforeTraining = context.state.run.clock.currentTimeSlot;
  const staminaBeforeTraining = context.state.body.byCharacterId[targetCharacterId]?.bodyStats.stamina ?? 0;
  const energyBeforeTraining = context.state.body.byCharacterId[targetCharacterId]?.bodyStats.energy ?? 0;
  const pleasureBeforeTraining = context.state.body.byCharacterId[targetCharacterId]?.conditionParams[pleasureParamId] ?? 0;
  const desireBeforeTraining = context.state.body.byCharacterId[targetCharacterId]?.conditionParams[desireParamId] ?? 0;
  const resourceBeforeTraining = context.state.body.byCharacterId[targetCharacterId]?.trainingResources[resourceId] ?? 0;
  const experienceBeforeTraining = context.state.people.characters[targetCharacterId].attributes.experiences[experienceId] ?? 0;

  step = dispatchChecked(context, { type: 'training/execute' });
  assert(step.result.status === 'success', 'selected training command should execute.');
  context = step.context;
  assert(context.session.ui.route === 'mainMenu', 'completed training should return to main menu through turn end.');
  const expectedDay = timeSlotBeforeTraining === 1 ? dayBeforeTraining + 1 : dayBeforeTraining;
  assert(context.state.run.clock.day === expectedDay, 'completed training should advance the half-day clock.');
  assert(context.state.run.clock.turn === turnBeforeTraining + 1, 'completed training should advance turn.');
  assert(context.state.run.clock.phase === 'freeAction', 'completed training should return phase to freeAction.');
  assert(Object.keys(context.session.interaction.sources).length === 0, 'completed training should clear stimulus buffers.');
  assert(Object.keys(context.session.interaction.paramDeltas).length === 0, 'completed training should clear param buffers.');
  assert(context.session.interaction.commandFlow.selectedCommandId === undefined, 'completed training should clear command flow.');
  assert(
    context.state.body.byCharacterId[targetCharacterId].bodyStats.stamina === staminaBeforeTraining - 5,
    'training should apply stamina delta.',
  );
  assert(
    context.state.body.byCharacterId[targetCharacterId].bodyStats.energy === energyBeforeTraining - 50,
    'training should apply energy delta.',
  );
  assert(
    (context.state.body.byCharacterId[targetCharacterId].conditionParams[pleasureParamId] ?? 0) > pleasureBeforeTraining,
    'training should apply primary param increase.',
  );
  assert(
    (context.state.body.byCharacterId[targetCharacterId].conditionParams[desireParamId] ?? 0) === desireBeforeTraining,
    'training should preserve unrelated secondary param when the engine command does not alter it.',
  );
  assert(
    (context.state.body.byCharacterId[targetCharacterId].trainingResources[resourceId] ?? 0) === resourceBeforeTraining,
    'training should preserve resources when no orgasm threshold is crossed.',
  );
  assert(
    context.state.people.characters[targetCharacterId].attributes.experiences[experienceId] === experienceBeforeTraining + 1,
    'training should apply experience gain.',
  );
  assert(
    context.state.people.characters[targetCharacterId].flags.featureProgress['training.latestCommandId'] === commandId,
    'training should persist latest command progress.',
  );

  const savePayload = createGameSavePayload(context.state, new Date('2026-04-30T00:00:00.000Z'));
  assertNoBoundaryErrors('save payload', validateSavePayloadBoundary(savePayload));
  const pleasureAfterTraining = context.state.body.byCharacterId[targetCharacterId].conditionParams[pleasureParamId] ?? 0;
  assert(
    savePayload.state.body.byCharacterId[targetCharacterId].conditionParams[pleasureParamId] === pleasureAfterTraining,
    'save payload should include training param result.',
  );
  assert(
    (savePayload.state.body.byCharacterId[targetCharacterId].trainingResources[resourceId] ?? 0) === resourceBeforeTraining,
    'save payload should preserve unchanged training resources.',
  );
  assert(!JSON.stringify(savePayload).includes('commandFlow'), 'save payload should not include training command flow.');
  assert(!JSON.stringify(savePayload).includes('paramDeltas'), 'save payload should not include training calculation buffers.');
  assertHasBoundaryError('save payload with top-level interaction session', validateSavePayloadBoundary({ ...savePayload, session: context.session }));

  const summary = {
    route: context.session.ui.route,
    day: context.state.run.clock.day,
    turn: context.state.run.clock.turn,
    commandId: context.state.people.characters[targetCharacterId].flags.featureProgress['training.latestCommandId'],
    pleasure: context.state.body.byCharacterId[targetCharacterId].conditionParams[pleasureParamId],
    resource: context.state.body.byCharacterId[targetCharacterId].trainingResources[resourceId],
  };
  console.log(`M14 training smoke passed: ${JSON.stringify(summary)}`);
}

main();
