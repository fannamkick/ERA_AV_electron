import { validateActionResultBoundary, validateSavePayloadBoundary, validateStateSessionBoundary } from '../src/game/boundaries';
import { dispatchGameAction } from '../src/game/dispatch';
import type { GameActionContext, GameActionResult } from '../src/game/results';
import { createGameSavePayload } from '../src/game/savePayload';
import { createInitialGameData, type GameSession, type GameState } from '../src/game/state';
import { gameRuntime } from '../src/runtime';
import type { GameDefinitions } from '../src/catalog/types';
import type { GameAction } from '../src/game/actions';

type GateContext = {
  readonly catalog: GameDefinitions;
  readonly state: GameState;
  readonly session: GameSession;
};

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function assertNoErrors(label: string, diagnostics: readonly { readonly severity: string; readonly message: string }[]) {
  const errors = diagnostics.filter((diagnostic) => diagnostic.severity === 'error');
  assert(errors.length === 0, `${label} failed:\n${errors.map((error) => error.message).join('\n')}`);
}

function assertHasError(label: string, diagnostics: readonly { readonly severity: string; readonly message: string }[]) {
  assert(
    diagnostics.some((diagnostic) => diagnostic.severity === 'error'),
    `${label} should produce at least one boundary error.`,
  );
}

function toActionContext(context: GateContext): GameActionContext {
  return {
    catalog: context.catalog,
    state: context.state,
    session: context.session,
  };
}

function nextContext(context: GateContext, result: GameActionResult): GateContext {
  return {
    catalog: context.catalog,
    state: result.state,
    session: result.session,
  };
}

function dispatchChecked(context: GateContext, action: GameAction): { readonly context: GateContext; readonly result: GameActionResult } {
  const actionContext = toActionContext(context);
  const result = dispatchGameAction(actionContext, action);
  assertNoErrors(action.type, validateActionResultBoundary(actionContext, result));
  return {
    context: nextContext(context, result),
    result,
  };
}

function main() {
  assertNoErrors('runtime diagnostics', gameRuntime.diagnostics);

  const initialData = createInitialGameData();
  let context: GateContext = {
    catalog: initialData.definitions,
    state: initialData.save,
    session: initialData.session,
  };

  assertNoErrors('initial state/session', validateStateSessionBoundary(context.state, context.session));

  let step = dispatchChecked(context, { type: 'game/new', input: { modeId: 'normal' } });
  assert(step.result.status === 'success', 'new game should succeed.');
  context = step.context;

  step = dispatchChecked(context, { type: 'main/openItemShop' });
  assert(step.result.status === 'success', 'item shop entry should succeed.');
  context = step.context;

  step = dispatchChecked(context, { type: 'shop/cancel' });
  assert(step.result.status === 'success', 'shop cancel should succeed.');
  context = step.context;

  const failureContext = toActionContext(context);
  const failure = dispatchGameAction(failureContext, { type: 'shop/changeQuantity', quantity: -1 });
  assert(failure.status === 'failure', 'invalid quantity should fail.');
  assert(failure.state === context.state, 'failed action must preserve save state reference.');
  assertNoErrors('failed action boundary', validateActionResultBoundary(failureContext, failure));

  const savePayload = createGameSavePayload(context.state, new Date('2026-04-30T00:00:00.000Z'));
  assertNoErrors('save payload', validateSavePayloadBoundary(savePayload));
  assertHasError('payload with top-level session', validateSavePayloadBoundary({ ...savePayload, session: context.session }));
  assertHasError('payload with top-level definitions', validateSavePayloadBoundary({ ...savePayload, definitions: context.catalog }));
  assertHasError('payload with top-level views', validateSavePayloadBoundary({ ...savePayload, views: {} }));
  assertHasError(
    'payload with nested session',
    validateSavePayloadBoundary({ ...savePayload, state: { ...savePayload.state, session: context.session } }),
  );
  assertHasError('payload with unknown key', validateSavePayloadBoundary({ ...savePayload, extra: true }));

  console.log(
    `M16 boundary gate passed: ${JSON.stringify({
      route: context.session.ui.route,
      diagnostics: gameRuntime.diagnostics.length,
      saveKeys: Object.keys(savePayload).length,
    })}`,
  );
}

main();
