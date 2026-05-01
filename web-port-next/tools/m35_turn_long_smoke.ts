import type { GameAction } from '../src/game/actions';
import { validateActionResultBoundary, validateSavePayloadBoundary, validateStateSessionBoundary } from '../src/game/boundaries';
import { dispatchGameAction } from '../src/game/dispatch';
import type { GameActionContext, GameActionResult } from '../src/game/results';
import { createGameSavePayload, parseGameSavePayload, serializeGameSavePayload } from '../src/game/savePayload';
import { createInitialGameData, type GameSession, type GameState } from '../src/game/state';
import type { GameDefinitions } from '../src/catalog/types';

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

function hasEffect(result: GameActionResult, text: string): boolean {
  return result.effects.some((effect) => {
    if (effect.type === 'ui/log') return effect.message.includes(text);
    if (effect.type === 'ui/warning') return effect.message.includes(text);
    return false;
  });
}

function withDirtySession(context: SmokeContext): SmokeContext {
  return {
    ...context,
    session: {
      ...context.session,
      featureSession: {
        commandSequences: {
          activeSequenceId: 'm35-sequence',
          progress: { active: 1 },
        },
        status: {
          passoutLevel: 3,
          deferredUserCommand: 'm35-command',
        },
      },
      interaction: {
        ...context.session.interaction,
        temporaryFlags: { turn: true },
        pendingEvents: [{ id: 'm35-pending', kind: 'turn', actorIds: [], payload: {} }],
      },
      mission: {
        selectedMissionId: 'mission:m35',
        visibleMissionIds: ['mission:m35'],
      },
      shop: {
        ...context.session.shop,
        selectedListingId: 'listing:m35',
        selectedItemId: 'item:m35',
        visibleListingIds: ['listing:m35'],
        visibleUseItemIds: ['item:m35'],
        quantity: 2,
      },
      shooting: {
        ...context.session.shooting,
        selectedCharacterId: 'character:0',
        selectedSceneId: 'scene:m35',
        visibleCharacterIds: ['character:0'],
        visibleSceneIds: ['scene:m35'],
        filmingAmount: 9,
      },
      script: {
        numericLocals: { turn: 1 },
        stringLocals: { turn: 'dirty' },
        args: ['turn'],
        results: ['dirty'],
        listFrames: { turn: 'dirty' },
      },
      ui: {
        ...context.session.ui,
        route: 'training',
        choices: [{ id: 'm35-choice', label: 'turn', actionType: 'turn/end' }],
      },
      visit: {
        ...context.session.visit,
        selectedPlaceId: 'visit:m35',
        selectedActionId: 'visit-action:m35',
        visiblePlaceIds: ['visit:m35'],
        visibleActionIds: ['visit-action:m35'],
      },
      work: {
        ...context.session.work,
        selectedWorkId: 'work:m35',
        selectedCharacterId: 'character:0',
        visibleWorkIds: ['work:m35'],
        eligibleCharacterIds: ['character:0'],
      },
    },
  };
}

function assertTurnSessionCleared(context: SmokeContext) {
  assert(context.session.ui.route === 'mainMenu', 'turn end should return to mainMenu.');
  assert(context.session.ui.choices.length === 0, 'turn end should clear UI choices.');
  assert(context.session.shop.visibleListingIds.length === 0, 'turn end should clear shop listing view.');
  assert(context.session.shop.visibleUseItemIds.length === 0, 'turn end should clear item-use view.');
  assert(context.session.mission.visibleMissionIds.length === 0, 'turn end should clear mission view.');
  assert(context.session.shooting.visibleSceneIds.length === 0, 'turn end should clear shooting scene view.');
  assert(context.session.visit.visiblePlaceIds.length === 0, 'turn end should clear visit place view.');
  assert(context.session.work.visibleWorkIds.length === 0, 'turn end should clear work view.');
  assert(Object.keys(context.session.interaction.temporaryFlags).length === 0, 'turn end should clear interaction flags.');
  assert(Object.keys(context.session.script.numericLocals).length === 0, 'turn end should clear script numeric locals.');
}

function main() {
  const initialData = createInitialGameData();
  let context: SmokeContext = {
    catalog: initialData.definitions,
    state: initialData.save,
    session: initialData.session,
  };

  assertNoBoundaryErrors('initial state/session', validateStateSessionBoundary(context.state, context.session));

  let step = dispatchChecked(context, { type: 'game/new', input: { modeId: 'normal' } });
  assert(step.result.status === 'success', 'normal new game should succeed.');
  context = step.context;

  context = withDirtySession({
    ...context,
    state: {
      ...context.state,
      economy: {
        ...context.state.economy,
        account: { currentMoney: 5000 },
      },
      mission: {
        ...context.state.mission,
        byMissionId: {
          'mission:m35': {
            status: 'accepted',
            progressBand: 0,
            rewardClaimed: false,
            remainingWeeks: 2,
          },
        },
      },
      run: {
        ...context.state.run,
        runFlags: {
          ...context.state.run.runFlags,
          monthlyMaintenanceCost: 125,
        },
        scheduledEvents: [
          { id: 'm35:immediate', trigger: 'immediate', reason: 'due now' },
          { id: 'm35:weekly', trigger: 'weekStart', reason: 'new week hook' },
          { id: 'm35:monthly', trigger: 'monthStart', reason: 'new month hook' },
        ],
      },
    },
  });

  step = dispatchChecked(context, { type: 'turn/end' });
  assert(step.result.status === 'success', 'first M35 turn should succeed.');
  context = step.context;
  assert(context.state.run.clock.day === 7, 'first M35 turn should advance day to 7.');
  assert(context.state.run.clock.week === 2, 'first M35 turn should advance week.');
  assert(context.state.run.clock.month === 1, 'first M35 turn should not advance month.');
  assert(context.state.run.clock.year === 1, 'first M35 turn should keep year.');
  assert(context.state.run.clock.currentTimeSlot === 0, 'turn end should reset current time slot.');
  assert(context.state.run.clock.dayCounters.counter_0 === 7, 'day counter 0 should mirror elapsed day.');
  assert(context.state.run.clock.dayCounters.counter_4 === 1, 'day counter 4 should mirror turn count.');
  assert(context.state.run.clock.timeCounters.counter_0 === 0, 'time counter 0 should mirror current time slot.');
  assert(context.state.mission.byMissionId['mission:m35'].remainingWeeks === 1, 'mission deadline should decrement.');
  assert(context.state.mission.byMissionId['mission:m35'].status === 'accepted', 'mission should still be accepted before expiry.');
  assert(context.state.run.scheduledEvents.length === 1, 'monthly event should wait for month rollover.');
  assert(context.state.world.eventFlags['processed:m35:immediate'] === true, 'immediate event should update world event flags.');
  assert(context.state.world.eventFlags['processed:m35:weekly'] === true, 'weekly event should update world event flags.');
  assert(context.state.run.progressFlags.autoPurchaseCheckedAtTurn === 1, 'weekly auto purchase hook should be recorded.');
  assert(context.state.run.progressFlags.autoItemUseCheckedAtTurn === 1, 'weekly auto item-use hook should be recorded.');
  assert(context.state.run.progressFlags.flag_61 === 1, 'M35 transferred run progress flag 61 should be consumed.');
  assertTurnSessionCleared(context);
  assert(hasEffect(step.result, 'mission deadline hook'), 'turn result should log mission deadline processing.');
  assert(hasEffect(step.result, 'month/week automatic events'), 'turn result should log automatic hook processing.');

  step = dispatchChecked(context, { type: 'turn/end' });
  assert(step.result.status === 'success', 'second M35 turn should succeed.');
  context = step.context;
  assert(context.state.mission.byMissionId['mission:m35'].status === 'failed', 'mission should fail at deadline expiry.');
  assert(context.state.mission.byMissionId['mission:m35'].remainingWeeks === 0, 'expired mission should keep zero remaining weeks.');

  context = {
    ...context,
    state: {
      ...context.state,
      run: {
        ...context.state.run,
        clock: {
          ...context.state.run.clock,
          day: 21,
          month: 12,
          week: 4,
          year: 1,
          turn: 47,
          phase: 'endOfDay',
        },
        scheduledEvents: [{ id: 'm35:monthly', trigger: 'monthStart', reason: 'year rollover hook' }],
      },
    },
  };

  step = dispatchChecked(context, { type: 'turn/end' });
  assert(step.result.status === 'success', 'M35 year rollover turn should succeed.');
  context = step.context;
  assert(context.state.run.clock.day === 28, 'rollover should advance day by one turn.');
  assert(context.state.run.clock.week === 1, 'week 4 should roll to week 1.');
  assert(context.state.run.clock.month === 1, 'month 12 should roll to month 1.');
  assert(context.state.run.clock.year === 2, 'month 12 rollover should advance year.');
  assert(context.state.run.clock.turn === 48, 'rollover should increment turn.');
  assert(context.state.run.clock.dayCounters.counter_3 >= 1, 'month counter should increment on rollover.');
  assert(context.state.run.progressFlags.flag_34 === 48, 'M35 transferred run progress flag 34 should be consumed.');
  assert(context.state.world.eventFlags.monthlyHookLastTurn === 48, 'monthly event hook should be recorded.');
  assert(context.state.world.eventFlags.yearHookLastTurn === 2, 'year hook should be recorded.');
  assert(context.state.world.eventFlags['processed:m35:monthly'] === true, 'monthly scheduled event should be processed.');
  assert(context.state.economy.account.currentMoney === 4875, 'monthly maintenance should charge exactly once.');
  assert(
    context.state.economy.accountingEntries.includes('turn:48:monthly-maintenance:-125'),
    'monthly maintenance entry should be recorded.',
  );

  const savePayload = createGameSavePayload(context.state, new Date('2026-05-01T00:00:00.000Z'));
  assertNoBoundaryErrors('M35 save payload', validateSavePayloadBoundary(savePayload));
  const parsed = parseGameSavePayload(serializeGameSavePayload(savePayload));
  assert(parsed.ok, 'M35 save payload should parse after roundtrip.');
  assert(parsed.payload.state.run.clock.year === 2, 'M35 save roundtrip should keep year.');
  assert(parsed.payload.state.run.clock.currentTimeSlot === 0, 'M35 save roundtrip should keep current time slot.');
  assert(parsed.payload.state.run.progressFlags.flag_34 === 48, 'M35 save roundtrip should keep run progress flag 34.');
  assert(!('session' in JSON.parse(serializeGameSavePayload(savePayload))), 'M35 save payload must not include session.');

  const summary = {
    year: context.state.run.clock.year,
    month: context.state.run.clock.month,
    week: context.state.run.clock.week,
    day: context.state.run.clock.day,
    turn: context.state.run.clock.turn,
    money: context.state.economy.account.currentMoney,
    scheduledEvents: context.state.run.scheduledEvents.length,
  };
  console.log(`M35 turn-long smoke passed: ${JSON.stringify(summary)}`);
}

main();
