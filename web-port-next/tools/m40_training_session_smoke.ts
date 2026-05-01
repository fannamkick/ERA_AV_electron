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

const defaultCommandId = '0';
const unavailableCommandId = '53';
const cameraItemId = '6';
const stimulusId = '0';
const pleasureParamId = '0';
const desireParamId = '5';
const resourceId = '0';

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

function hasOwnKeyDeep(value: unknown, key: string): boolean {
  if (Array.isArray(value)) {
    return value.some((item) => hasOwnKeyDeep(item, key));
  }

  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const record = value as Record<string, unknown>;
  return Object.prototype.hasOwnProperty.call(record, key) || Object.values(record).some((item) => hasOwnKeyDeep(item, key));
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
  assert(characterId, 'M40 smoke needs at least one character.');
  return characterId;
}

function withStaleTrainingBuffers(context: SmokeContext): SmokeContext {
  return {
    ...context,
    session: {
      ...context.session,
      interaction: {
        ...context.session.interaction,
        temporaryFlags: {
          'TFLAG:0': 99,
          'TFLAG:100': 1,
        },
        sources: {
          stale: 99,
        },
        paramDeltas: {
          stale: { up: 99, down: 0 },
        },
        baseLoss: {
          stamina: 99,
        },
        resultBuffers: {
          ...context.session.interaction.resultBuffers,
          nowEx: {
            stale: 5,
          },
          gotJuel: {
            stale: 6,
          },
          climaxCounters: {
            stale: 1,
          },
        },
        pendingEvents: [
          {
            id: 'stale',
            kind: 'stale',
            actorIds: [],
            payload: {},
          },
        ],
        counters: {
          stale: 1,
        },
      },
    },
  };
}

function withoutCameraItem(context: SmokeContext): SmokeContext {
  return {
    ...context,
    state: {
      ...context.state,
      inventory: {
        ...context.state.inventory,
        itemCounts: {
          ...context.state.inventory.itemCounts,
          [cameraItemId]: 0,
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

  assert(Object.keys(context.catalog.trainingCommands).length === 105, 'M40 must expose all 105 original training commands.');
  assert(context.catalog.trainingCommands[defaultCommandId]?.defaultAvailable === true, 'M40 default command should be available after selections.');
  assertNoBoundaryErrors('initial state/session', validateStateSessionBoundary(context.state, context.session));

  let step = dispatchChecked(context, { type: 'game/new', input: { modeId: 'normal' } });
  assert(step.result.status === 'success', 'normal new game should succeed.');
  context = step.context;
  const characterId = firstCharacterId(context);

  step = dispatchChecked(context, { type: 'main/openTraining' });
  assert(step.result.status === 'success', 'EVENTTRAIN entry should open training.');
  context = step.context;
  assert(context.session.ui.route === 'training', 'EVENTTRAIN should route to training.');
  assert(Object.keys(context.session.interaction.sources).length === 0, 'EVENTTRAIN should start with empty SOURCE buffers.');
  assert(Object.keys(context.session.interaction.temporaryFlags).length === 0, 'EVENTTRAIN should start with empty TFLAG buffers.');

  let trainingView = buildTrainingView(context.catalog, context.state, context.session);
  assert(trainingView.visibleCommands.length === 105, 'training view should list every original command candidate.');
  assert(trainingView.visibleCommands[0]?.commandId === '0', 'training commands should be sorted by original numeric id.');
  assert(trainingView.visibleCommands.some((command) => command.commandId === unavailableCommandId), 'locked command should still be visible.');
  assert(trainingView.visibleCommands.find((command) => command.commandId === defaultCommandId)?.available === false, 'default command needs participants before selection.');
  assert(trainingView.statusSummary.day === context.state.run.clock.day, 'SHOW_STATUS day should mirror run clock.');
  assert(trainingView.statusSummary.month === context.state.run.clock.month, 'SHOW_STATUS month should mirror run clock.');
  assert(trainingView.statusSummary.week === context.state.run.clock.week, 'SHOW_STATUS week should mirror run clock.');
  assert(trainingView.statusSummary.turn === context.state.run.clock.turn, 'SHOW_STATUS turn should mirror run clock.');
  assert(trainingView.statusSummary.timeSlotLabel === '전반', 'SHOW_STATUS TIME==0 should display first half.');
  assert(trainingView.bufferSummary.formattedBodyCostTotal === '       0/       0', 'FIGURE_INDENT_SLASH should format empty totals with width 8.');

  const beforeAssistantFailure = context.state;
  step = dispatchChecked(context, { type: 'training/selectAssistant', characterId: 'missing-character' });
  assert(step.result.status === 'failure', 'missing assistant selection should fail.');
  assert(step.result.failure?.code === 'training-assistant-not-found', 'missing assistant should use training-assistant-not-found.');
  assert(step.result.state === beforeAssistantFailure, 'missing assistant should preserve save state reference.');
  context = step.context;

  step = dispatchChecked(context, { type: 'training/selectTarget', characterId });
  assert(step.result.status === 'success', 'training target selection should succeed.');
  context = step.context;
  step = dispatchChecked(context, { type: 'training/selectExecutor', characterId });
  assert(step.result.status === 'success', 'training executor selection should succeed.');
  context = step.context;
  step = dispatchChecked(context, { type: 'training/selectAssistant', characterId });
  assert(step.result.status === 'success', 'training assistant selection should succeed.');
  context = step.context;
  assert(context.session.interaction.participants.assistantId === characterId, 'assistant should be session-only participant state.');
  assert(context.session.interaction.participants.assistantPlay === true, 'assistantPlay should track ASSIPLAY.');

  const beforeAssistantClear = context.state;
  step = dispatchChecked(context, { type: 'training/selectAssistant' });
  assert(step.result.status === 'success', 'assistant clear should succeed.');
  context = step.context;
  assert(context.state === beforeAssistantClear, 'assistant clear should not write save state.');
  assert(context.session.interaction.participants.assistantId === undefined, 'assistant clear should remove assistant id.');
  assert(context.session.interaction.participants.assistantPlay === false, 'assistant clear should clear assistantPlay.');

  step = dispatchChecked(context, { type: 'training/selectAssistant', characterId });
  assert(step.result.status === 'success', 'assistant reselection should succeed.');
  context = step.context;

  const unavailableContext = withoutCameraItem(context);
  trainingView = buildTrainingView(unavailableContext.catalog, unavailableContext.state, unavailableContext.session);
  const unavailableCommand = trainingView.visibleCommands.find((command) => command.commandId === unavailableCommandId);
  assert(unavailableCommand?.available === false, 'M40 should surface unavailable commands without mutating save state.');
  assert(unavailableCommand.disabledReason?.includes('Original availability rule'), 'unavailable command should cite original availability evidence.');

  const beforeUnavailableCommand = unavailableContext.state;
  step = dispatchChecked(unavailableContext, { type: 'training/selectCommand', commandId: unavailableCommandId });
  assert(step.result.status === 'failure', 'unavailable training command selection should fail.');
  assert(step.result.failure?.code === 'training-command-unavailable', 'unavailable training command should use training-command-unavailable.');
  assert(step.result.state === beforeUnavailableCommand, 'unavailable command should preserve save state reference.');

  context = withStaleTrainingBuffers(context);
  step = dispatchChecked(context, { type: 'training/selectCommand', commandId: defaultCommandId });
  assert(step.result.status === 'success', 'EVENTCOM default command selection should succeed.');
  context = step.context;
  assert(context.session.interaction.commandFlow.selectedCommandId === defaultCommandId, 'EVENTCOM should store selected command in session.');
  assert(Object.keys(context.session.interaction.temporaryFlags).length === 0, 'EVENTCOM should reset TFLAG buffers.');
  assert(Object.keys(context.session.interaction.pendingEvents).length === 0, 'EVENTCOM should reset pending command events.');
  assert(Object.keys(context.session.interaction.counters).length === 0, 'EVENTCOM should reset command counters.');
  assert(context.session.interaction.sources.stale === undefined, 'EVENTCOM should reset stale SOURCE buffers.');
  assert(context.session.interaction.resultBuffers.nowEx.stale === undefined, 'EVENTCOM should reset stale experience buffers.');
  assert(context.session.interaction.resultBuffers.gotJuel.stale === undefined, 'EVENTCOM should reset stale JUEL buffers.');
  assert(context.session.interaction.sources[stimulusId] === 12, 'EVENTCOM should calculate SOURCE preview into session.');
  assert(context.session.interaction.paramDeltas[pleasureParamId]?.up === 10, 'EVENTCOM should calculate primary param preview.');
  assert(context.session.interaction.paramDeltas[desireParamId]?.up === 3, 'EVENTCOM should calculate secondary param preview.');
  assert(context.session.interaction.baseLoss.stamina === 4, 'EVENTCOM should calculate stamina cost preview.');
  assert(context.session.interaction.baseLoss.energy === 3, 'EVENTCOM should calculate energy cost preview.');
  assert(context.session.interaction.resultBuffers.gotJuel[resourceId] === 1, 'JUEL_CHECK should be represented by resource gain preview.');

  trainingView = buildTrainingView(context.catalog, context.state, context.session);
  assert(trainingView.selectedCommand?.available === true, 'selected default command should be executable.');
  assert(trainingView.bufferSummary.stimulusTotal === 12, 'training view should summarize SOURCE buffers.');
  assert(trainingView.bufferSummary.paramUpTotal === 13, 'training view should summarize PALAM up buffers.');
  assert(trainingView.bufferSummary.bodyCostTotal === 7, 'training view should summarize BASE cost buffers.');
  assert(trainingView.bufferSummary.formattedBodyCostTotal === '       7/      13', 'FIGURE_INDENT_SLASH should format command totals with width 8.');

  const beforeCancelSelection = context.state;
  step = dispatchChecked(context, { type: 'training/cancelSelection' });
  assert(step.result.status === 'success', 'training selection cancel should succeed.');
  context = step.context;
  assert(context.state === beforeCancelSelection, 'training selection cancel should not write save state.');
  assert(context.session.ui.route === 'training', 'training selection cancel should stay on training route.');
  assert(context.session.interaction.participants.targetId === undefined, 'selection cancel should clear target.');
  assert(context.session.interaction.participants.masterId === undefined, 'selection cancel should clear executor.');
  assert(context.session.interaction.participants.assistantId === undefined, 'selection cancel should clear assistant.');
  assert(context.session.interaction.participants.assistantPlay === false, 'selection cancel should clear ASSIPLAY.');
  assert(context.session.interaction.commandFlow.selectedCommandId === undefined, 'selection cancel should clear selected command.');
  assert(Object.keys(context.session.interaction.sources).length === 0, 'selection cancel should clear SOURCE buffers.');
  assert(Object.keys(context.session.interaction.paramDeltas).length === 0, 'selection cancel should clear param buffers.');
  assert(Object.keys(context.session.interaction.temporaryFlags).length === 0, 'selection cancel should clear TFLAG buffers.');

  step = dispatchChecked(context, { type: 'training/selectTarget', characterId });
  assert(step.result.status === 'success', 'training target reselection should succeed.');
  context = step.context;
  step = dispatchChecked(context, { type: 'training/selectExecutor', characterId });
  assert(step.result.status === 'success', 'training executor reselection should succeed.');
  context = step.context;
  step = dispatchChecked(context, { type: 'training/selectAssistant', characterId });
  assert(step.result.status === 'success', 'training assistant reselection should succeed.');
  context = step.context;
  step = dispatchChecked(context, { type: 'training/selectCommand', commandId: defaultCommandId });
  assert(step.result.status === 'success', 'training command reselection should succeed.');
  context = step.context;

  const dayBeforeTraining = context.state.run.clock.day;
  const turnBeforeTraining = context.state.run.clock.turn;
  step = dispatchChecked(context, { type: 'training/execute' });
  assert(step.result.status === 'success', 'EVENTCOMEND/EVENTEND should execute selected training.');
  context = step.context;
  assert(context.session.ui.route === 'mainMenu', 'EVENTEND should return to main menu through turn end.');
  assert(context.state.run.clock.day === dayBeforeTraining + 7, 'EVENTEND should advance day by turn end.');
  assert(context.state.run.clock.turn === turnBeforeTraining + 1, 'EVENTEND should advance turn.');
  assert(context.session.interaction.commandFlow.selectedCommandId === undefined, 'EVENTCOMEND should clear command flow after execution.');
  assert(Object.keys(context.session.interaction.sources).length === 0, 'EVENTCOMEND should clear SOURCE buffers after execution.');
  assert(Object.keys(context.session.interaction.paramDeltas).length === 0, 'EVENTCOMEND should clear param buffers after execution.');
  assert(Object.keys(context.session.interaction.temporaryEquipment.activeEquipment).length === 0, 'EVENTCOMEND should not retain temporary equipment.');
  assert(Object.keys(context.session.interaction.temporaryFlags).length === 0, 'EVENTCOMEND should not retain TFLAG buffers.');

  const savePayload = createGameSavePayload(context.state, new Date('2026-05-01T00:00:00.000Z'));
  assertNoBoundaryErrors('save payload', validateSavePayloadBoundary(savePayload));
  assert(!hasOwnKeyDeep(savePayload, 'interaction'), 'save payload should not include interaction session state.');
  assert(!hasOwnKeyDeep(savePayload, 'commandFlow'), 'save payload should not include training command flow.');
  assert(!hasOwnKeyDeep(savePayload, 'sources'), 'save payload should not include SOURCE buffers.');
  assert(!hasOwnKeyDeep(savePayload, 'paramDeltas'), 'save payload should not include param buffers.');
  assert(!hasOwnKeyDeep(savePayload, 'temporaryEquipment'), 'save payload should not include TEQUIP buffers.');
  assert(!hasOwnKeyDeep(savePayload, 'temporaryFlags'), 'save payload should not include TFLAG buffers.');
  assertHasBoundaryError('save payload with top-level session', validateSavePayloadBoundary({ ...savePayload, session: context.session }));

  step = dispatchChecked(context, { type: 'main/openTraining' });
  assert(step.result.status === 'success', 'training re-entry after completion should succeed.');
  context = step.context;
  const beforeScreenCancel = context.state;
  step = dispatchChecked(context, { type: 'training/cancel' });
  assert(step.result.status === 'success', 'training screen cancel should succeed.');
  context = step.context;
  assert(context.state === beforeScreenCancel, 'training screen cancel should not write save state.');
  assert(context.session.ui.route === 'mainMenu', 'training screen cancel should return to main menu.');
  assert(Object.keys(context.session.interaction.sources).length === 0, 'training screen cancel should clear SOURCE buffers.');
  assert(Object.keys(context.session.interaction.temporaryFlags).length === 0, 'training screen cancel should clear TFLAG buffers.');

  const summary = {
    commands: Object.keys(context.catalog.trainingCommands).length,
    route: context.session.ui.route,
    day: context.state.run.clock.day,
    turn: context.state.run.clock.turn,
    latestCommandId: context.state.people.characters[characterId].flags.featureProgress['training.latestCommandId'],
  };
  console.log(`M40 training session smoke passed: ${JSON.stringify(summary)}`);
}

main();
