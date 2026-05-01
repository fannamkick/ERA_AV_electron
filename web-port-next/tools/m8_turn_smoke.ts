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

function withDirtyTurnSession(context: SmokeContext): SmokeContext {
  const firstShopListingId = Object.keys(context.catalog.shopListings)[0];
  const firstRecruitListingId = Object.keys(context.catalog.recruitListings)[0];
  assert(firstShopListingId, 'M8 smoke needs at least one shop listing.');
  assert(firstRecruitListingId, 'M8 smoke needs at least one recruit listing.');

  return {
    ...context,
    state: {
      ...context.state,
      run: {
        ...context.state.run,
        scheduledEvents: [
          { id: 'smoke:immediate', trigger: 'immediate', reason: 'smoke immediate event' },
          { id: 'smoke:end-of-day', trigger: 'endOfDay', reason: 'smoke end-of-day event' },
          { id: 'smoke:next-day', trigger: 'nextDay', reason: 'smoke next-day event' },
        ],
      },
    },
    session: {
      ...context.session,
      featureSession: {
        commandSequences: {
          activeSequenceId: 'smoke-sequence',
          progress: { smoke: 1 },
        },
        status: {
          passoutLevel: 2,
          deferredUserCommand: 'smoke-command',
        },
      },
      interaction: {
        ...context.session.interaction,
        temporaryFlags: { smoke: true },
        pendingEvents: [{ id: 'smoke-event', kind: 'smoke', actorIds: [], payload: {} }],
      },
      recruit: {
        selectedListingId: firstRecruitListingId,
        visibleListingIds: [firstRecruitListingId],
      },
      shop: {
        selectedListingId: firstShopListingId,
        selectedItemId: context.catalog.shopListings[firstShopListingId].itemId,
        visibleListingIds: [firstShopListingId],
        quantity: 3,
      },
      script: {
        numericLocals: { smoke: 1 },
        stringLocals: { smoke: 'dirty' },
        args: ['smoke'],
        results: ['dirty'],
        listFrames: { smoke: 'dirty' },
      },
      ui: {
        ...context.session.ui,
        route: 'itemShop',
        choices: [{ id: 'smoke-choice', label: 'smoke', actionType: 'smoke/action' }],
      },
    },
  };
}

function assertTurnSessionCleared(context: SmokeContext) {
  assert(context.session.ui.route === 'mainMenu', 'turn end should return to mainMenu.');
  assert(context.session.ui.choices.length === 0, 'turn end should clear UI choices.');
  assert(context.session.shop.visibleListingIds.length === 0, 'turn end should clear shop visible listings.');
  assert(context.session.shop.selectedListingId === undefined, 'turn end should clear shop selection.');
  assert(context.session.shop.quantity === 0, 'turn end should reset shop quantity.');
  assert(context.session.recruit.visibleListingIds.length === 0, 'turn end should clear recruit visible listings.');
  assert(context.session.recruit.selectedListingId === undefined, 'turn end should clear recruit selection.');
  assert(context.session.featureSession.status.passoutLevel === 0, 'turn end should reset feature session status.');
  assert(
    Object.keys(context.session.featureSession.commandSequences.progress).length === 0,
    'turn end should reset command sequence progress.',
  );
  assert(Object.keys(context.session.interaction.temporaryFlags).length === 0, 'turn end should reset interaction flags.');
  assert(context.session.interaction.pendingEvents.length === 0, 'turn end should clear interaction pending events.');
  assert(Object.keys(context.session.script.numericLocals).length === 0, 'turn end should clear script numeric locals.');
  assert(context.session.script.args.length === 0, 'turn end should clear script args.');
}

function assertEffectMessage(result: GameActionResult, messagePart: string) {
  assert(
    result.effects.some((effect) => {
      if (effect.type === 'ui/log') return effect.message.includes(messagePart);
      if (effect.type === 'ui/warning') return effect.message.includes(messagePart);
      return false;
    }),
    `missing effect message containing: ${messagePart}`,
  );
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
  context = withDirtyTurnSession(step.context);

  step = dispatchChecked(context, { type: 'turn/end' });
  assert(step.result.status === 'success', 'turn end should succeed.');
  context = step.context;

  assert(context.state.run.clock.day === 7, 'first turn end should move day from 0 to 7.');
  assert(context.state.run.clock.week === 2, 'first turn end should move week from 1 to 2.');
  assert(context.state.run.clock.month === 1, 'first turn end should keep month at 1 before rollover.');
  assert(context.state.run.clock.turn === 1, 'first turn end should increment turn to 1.');
  assert(context.state.run.clock.phase === 'freeAction', 'turn end should return phase to freeAction.');
  assert(context.state.run.scheduledEvents.length === 0, 'turn end should consume M8-supported scheduled events.');
  assertTurnSessionCleared(context);
  assertEffectMessage(step.result, 'smoke:immediate');
  assertEffectMessage(step.result, 'mission deadline');
  assertEffectMessage(step.result, 'month/week automatic events');

  context = {
    ...context,
    state: {
      ...context.state,
      run: {
        ...context.state.run,
        clock: {
          day: 21,
          month: 1,
          week: 4,
          year: 1,
          turn: 3,
          currentTimeSlot: 0,
          dayCounters: {},
          timeCounters: {},
          phase: 'endOfDay',
        },
      },
    },
  };

  step = dispatchChecked(context, { type: 'turn/end' });
  assert(step.result.status === 'success', 'turn end rollover should succeed.');
  context = step.context;
  assert(context.state.run.clock.day === 28, 'week rollover should advance day by 7.');
  assert(context.state.run.clock.week === 1, 'week 4 should roll over to week 1.');
  assert(context.state.run.clock.month === 2, 'week 4 should advance the month.');
  assert(context.state.run.clock.year === 1, 'month 2 should keep year at 1.');
  assert(context.state.run.clock.turn === 4, 'week rollover should increment turn.');
  assert(context.state.run.clock.phase === 'freeAction', 'week rollover should return phase to freeAction.');

  const savePayload = createGameSavePayload(context.state, new Date('2026-04-30T00:00:00.000Z'));
  assertNoBoundaryErrors('save payload', validateSavePayloadBoundary(savePayload));

  const summary = {
    route: context.session.ui.route,
    day: context.state.run.clock.day,
    month: context.state.run.clock.month,
    week: context.state.run.clock.week,
    turn: context.state.run.clock.turn,
    phase: context.state.run.clock.phase,
    scheduledEvents: context.state.run.scheduledEvents.length,
  };
  console.log(`M8 turn smoke passed: ${JSON.stringify(summary)}`);
}

main();
