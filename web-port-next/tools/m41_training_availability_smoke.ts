import type { GameDefinitions } from '../src/catalog/types';
import { buildTrainingView } from '../src/features/training';
import { trainingAvailabilityProgramForCommand } from '../src/features/trainingAvailability';
import type { GameAction } from '../src/game/actions';
import { validateActionResultBoundary, validateStateSessionBoundary } from '../src/game/boundaries';
import { dispatchGameAction } from '../src/game/dispatch';
import type { GameActionContext, GameActionResult } from '../src/game/results';
import { createInitialGameData, type GameSession, type GameState } from '../src/game/state';

type SmokeContext = {
  readonly catalog: GameDefinitions;
  readonly state: GameState;
  readonly session: GameSession;
};

const defaultCommandId = '0';
const videoCommandId = '53';
const cameraItemId = '6';
const oralCommandId = '1';

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
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
  assert(characterId, 'M41 smoke needs at least one character.');
  return characterId;
}

function contextWithoutCamera(context: SmokeContext): SmokeContext {
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

function contextWithTemporaryEquipment(context: SmokeContext, equipmentId: string): SmokeContext {
  return {
    ...context,
    session: {
      ...context.session,
      interaction: {
        ...context.session.interaction,
        temporaryEquipment: {
          ...context.session.interaction.temporaryEquipment,
          activeEquipment: {
            ...context.session.interaction.temporaryEquipment.activeEquipment,
            [equipmentId]: 1,
          },
        },
      },
    },
  };
}

function commandAvailability(context: SmokeContext, commandId: string) {
  return buildTrainingView(context.catalog, context.state, context.session).visibleCommands.find(
    (command) => command.commandId === commandId,
  );
}

function main() {
  const initialData = createInitialGameData();
  let context: SmokeContext = {
    catalog: initialData.definitions,
    state: initialData.save,
    session: initialData.session,
  };

  const commandIds = Object.keys(context.catalog.trainingCommands);
  assert(commandIds.length === 105, 'M41 must keep all 105 Train.csv commands in the catalog.');
  for (const commandId of commandIds) {
    assert(trainingAvailabilityProgramForCommand(commandId), `M41 must have original COMABLE availability program for ${commandId}.`);
  }
  assertNoBoundaryErrors('initial state/session', validateStateSessionBoundary(context.state, context.session));

  let step = dispatchChecked(context, { type: 'game/new', input: { modeId: 'easy' } });
  assert(step.result.status === 'success', 'easy new game should succeed.');
  context = step.context;

  // 기숙사 가드 해제 FLAG:100 = 1 주입
  context = {
    ...context,
    state: {
      ...context.state,
      run: {
        ...context.state.run,
        runFlags: {
          ...context.state.run.runFlags,
          '100': 1,
        },
      },
    },
  };

  const targetCharaId = 'character:151';
  const executorCharaId = 'character:0';

  step = dispatchChecked(context, { type: 'main/openTraining' });
  assert(step.result.status === 'success', 'training entry should succeed.');
  context = step.context;
  step = dispatchChecked(context, { type: 'training/selectTarget', characterId: targetCharaId });
  assert(step.result.status === 'success', 'training target selection should succeed.');
  context = step.context;
  step = dispatchChecked(context, { type: 'training/selectExecutor', characterId: executorCharaId });
  assert(step.result.status === 'success', 'training executor selection should succeed.');
  context = step.context;

  const view = buildTrainingView(context.catalog, context.state, context.session);
  assert(view.visibleCommands.length === 105, 'M41 training view should still expose every command candidate.');
  assert(view.visibleCommands.find((command) => command.commandId === defaultCommandId)?.available === true, 'COM_ABLE0 should allow the base command.');
  assert(view.visibleCommands.find((command) => command.commandId === videoCommandId)?.available === true, 'starting camera item should allow video command 53.');

  const stateBeforeViewChecks = context.state;
  const sessionBeforeViewChecks = context.session;
  const noCameraContext = contextWithoutCamera(context);
  const noCameraCommand = commandAvailability(noCameraContext, videoCommandId);
  assert(noCameraCommand?.available === false, 'missing itemCounts camera item should make command 53 unavailable.');
  assert(
    noCameraCommand.disabledReason?.includes('Original availability rule'),
    'missing item unavailable reason should cite the original availability rule.',
  );
  assert(context.state === stateBeforeViewChecks, 'availability view calculation should not write save state.');
  assert(context.session === sessionBeforeViewChecks, 'availability view calculation should not write session state.');

  const temporaryEquipmentContext = contextWithTemporaryEquipment(context, '90');
  const oralCommand = commandAvailability(temporaryEquipmentContext, oralCommandId);
  assert(oralCommand?.available === false, 'temporaryEquipment tentacle state should make command 1 unavailable.');
  assert(
    oralCommand.disabledReason?.includes('Original availability rule'),
    'temporary equipment unavailable reason should cite the original availability rule.',
  );

  const beforeUnavailableSelect = noCameraContext.state;
  step = dispatchChecked(noCameraContext, { type: 'training/selectCommand', commandId: videoCommandId });
  assert(step.result.status === 'failure', 'selecting an unavailable training command should fail.');
  assert(step.result.failure?.code === 'training-command-unavailable', 'unavailable command should use training-command-unavailable.');
  assert(step.result.state === beforeUnavailableSelect, 'unavailable command selection should not write save state.');

  const summary = {
    commands: view.visibleCommands.length,
    command0: view.visibleCommands.find((command) => command.commandId === defaultCommandId)?.available,
    command53WithoutItem: noCameraCommand?.available,
    command1WithTemporaryEquipment: oralCommand?.available,
  };
  console.log(`M41 training availability smoke passed: ${JSON.stringify(summary)}`);
}

main();
