import { getItemDefinition, getShopListingDefinition } from '../src/catalog/lookup';
import type { CatalogId, GameDefinitions, ItemDefinition, ShopListingDefinition } from '../src/catalog/types';
import type { GameAction } from '../src/game/actions';
import { validateActionResultBoundary, validateSavePayloadBoundary, validateStateSessionBoundary } from '../src/game/boundaries';
import { dispatchGameAction } from '../src/game/dispatch';
import type { GameActionContext, GameActionResult } from '../src/game/results';
import { parseGameSavePayload } from '../src/game/savePayload';
import { createInitialGameData, type GameSession, type GameState } from '../src/game/state';

type SmokeContext = {
  readonly catalog: GameDefinitions;
  readonly state: GameState;
  readonly session: GameSession;
};

type ShopCandidate = {
  readonly listing: ShopListingDefinition;
  readonly item: ItemDefinition;
  readonly price: number;
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

function shopCandidate(definitions: GameDefinitions, listingId: CatalogId): ShopCandidate {
  const listing = getShopListingDefinition(definitions, listingId);
  assert(listing.ok, `missing shop listing: ${listingId}`);

  const item = getItemDefinition(definitions, listing.definition.itemId);
  assert(item.ok, `missing item for shop listing: ${listingId}`);
  assert(item.definition.basePrice !== undefined, `missing item price: ${item.definition.id}`);

  return {
    listing: listing.definition,
    item: item.definition,
    price: item.definition.basePrice,
  };
}

function visibleShopCandidates(context: SmokeContext): readonly ShopCandidate[] {
  return context.session.shop.visibleListingIds.map((listingId) => shopCandidate(context.catalog, listingId));
}

function parsedRecord(text: string): Record<string, unknown> {
  const parsed: unknown = JSON.parse(text);
  assert(typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed), 'serialized save should parse to object.');
  return parsed as Record<string, unknown>;
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

  step = dispatchChecked(context, { type: 'main/openItemShop' });
  assert(step.result.status === 'success', 'item shop entry should succeed.');
  context = step.context;

  const purchasable = visibleShopCandidates(context).find(
    (candidate) => candidate.price > 0 && candidate.price <= context.state.economy.account.currentMoney,
  );
  assert(purchasable, 'M9 smoke needs at least one affordable item.');

  step = dispatchChecked(context, { type: 'shop/selectListing', listingId: purchasable.listing.id });
  assert(step.result.status === 'success', 'shop listing selection should succeed.');
  context = step.context;

  step = dispatchChecked(context, { type: 'shop/changeQuantity', quantity: 1 });
  assert(step.result.status === 'success', 'shop quantity change should succeed.');
  context = step.context;

  step = dispatchChecked(context, { type: 'shop/confirmPurchase' });
  assert(step.result.status === 'success', 'purchase before save should succeed.');
  context = step.context;

  step = dispatchChecked(context, { type: 'shop/cancel' });
  assert(step.result.status === 'success', 'shop cancel before save should succeed.');
  context = step.context;

  const savedMoney = context.state.economy.account.currentMoney;
  const savedItemCount = context.state.inventory.itemCounts[purchasable.item.id] ?? 0;

  step = dispatchChecked(context, { type: 'main/openSave' });
  assert(step.result.status === 'success', 'save/load entry should succeed.');
  context = step.context;
  assert(context.session.ui.route === 'saveLoad', 'save/load entry should route to saveLoad.');

  step = dispatchChecked(context, { type: 'save/createSnapshot' });
  assert(step.result.status === 'success', 'save snapshot creation should succeed.');
  context = step.context;
  const snapshotText = context.session.saveLoad.snapshotText;
  assert(snapshotText.length > 0, 'save snapshot should produce serialized text.');
  assert(context.session.saveLoad.loadText === snapshotText, 'save snapshot should seed load text.');

  const parsedSnapshot = parseGameSavePayload(snapshotText);
  assert(parsedSnapshot.ok, 'serialized snapshot should parse.');
  assertNoBoundaryErrors('serialized snapshot', validateSavePayloadBoundary(parsedSnapshot.payload));

  const rawSnapshot = parsedRecord(snapshotText);
  assert(!('session' in rawSnapshot), 'serialized snapshot must not include session.');
  assert(!('views' in rawSnapshot), 'serialized snapshot must not include views.');
  assert(!('definitions' in rawSnapshot), 'serialized snapshot must not include definitions.');
  assertHasBoundaryError('payload with top-level session', validateSavePayloadBoundary({ ...parsedSnapshot.payload, session: context.session }));
  assertHasBoundaryError('payload with top-level definitions', validateSavePayloadBoundary({ ...parsedSnapshot.payload, definitions: context.catalog }));
  assertHasBoundaryError('payload with top-level views', validateSavePayloadBoundary({ ...parsedSnapshot.payload, views: {} }));
  assertHasBoundaryError('payload with unknown key', validateSavePayloadBoundary({ ...parsedSnapshot.payload, extra: true }));

  const beforeInvalidLoad = context.state;
  step = dispatchChecked(context, { type: 'save/updateLoadText', text: '{bad json' });
  assert(step.result.status === 'success', 'updating corrupt load text should succeed as session input.');
  context = step.context;
  step = dispatchChecked(context, { type: 'save/loadSnapshot' });
  assert(step.result.status === 'failure', 'corrupt JSON load should fail.');
  assert(step.result.failure?.code === 'invalid-save-json', 'corrupt JSON should use invalid-save-json.');
  assert(step.result.state === beforeInvalidLoad, 'corrupt load should preserve save state reference.');
  context = step.context;

  const futurePayload = JSON.stringify({ ...parsedSnapshot.payload, schemaVersion: 999 });
  step = dispatchChecked(context, { type: 'save/updateLoadText', text: futurePayload });
  assert(step.result.status === 'success', 'updating future schema load text should succeed as session input.');
  context = step.context;
  step = dispatchChecked(context, { type: 'save/loadSnapshot' });
  assert(step.result.status === 'failure', 'future schema load should fail.');
  assert(step.result.failure?.code === 'unsupported-future-save-schema', 'future schema should use unsupported-future-save-schema.');
  assert(step.result.state === beforeInvalidLoad, 'future schema failure should preserve save state reference.');
  context = step.context;

  const runtimePollutedPayload = JSON.stringify({ ...parsedSnapshot.payload, session: context.session });
  step = dispatchChecked(context, { type: 'save/updateLoadText', text: runtimePollutedPayload });
  assert(step.result.status === 'success', 'updating polluted load text should succeed as session input.');
  context = step.context;
  step = dispatchChecked(context, { type: 'save/loadSnapshot' });
  assert(step.result.status === 'failure', 'runtime-polluted payload load should fail.');
  assert(step.result.failure?.code === 'invalid-save-payload', 'runtime-polluted payload should use invalid-save-payload.');
  assert(step.result.state === beforeInvalidLoad, 'runtime-polluted failure should preserve save state reference.');
  context = step.context;

  step = dispatchChecked(context, { type: 'save/updateLoadText', text: snapshotText });
  assert(step.result.status === 'success', 'restoring valid load text should succeed.');
  context = step.context;

  step = dispatchChecked(context, { type: 'turn/end' });
  assert(step.result.status === 'success', 'turn end after snapshot should mutate state.');
  context = step.context;
  assert(context.state.run.clock.turn !== parsedSnapshot.payload.state.run.clock.turn, 'post-save mutation should change clock turn.');
  assert(
    context.state.run.clock.currentTimeSlot !== parsedSnapshot.payload.state.run.clock.currentTimeSlot ||
      context.state.run.clock.day !== parsedSnapshot.payload.state.run.clock.day,
    'post-save mutation should change clock slot or day.',
  );

  context = {
    ...context,
    session: {
      ...context.session,
      ui: {
        ...context.session.ui,
        route: 'saveLoad',
      },
      saveLoad: {
        ...context.session.saveLoad,
        loadText: snapshotText,
      },
    },
  };

  step = dispatchChecked(context, { type: 'save/loadSnapshot' });
  assert(step.result.status === 'success', 'valid save load should succeed.');
  context = step.context;
  assert(context.session.ui.route === 'mainMenu', 'successful load should return to mainMenu.');
  assert(context.session.saveLoad.loadText === '', 'successful load should discard save/load session text.');
  assert(context.state.run.clock.day === parsedSnapshot.payload.state.run.clock.day, 'load should restore saved clock day.');
  assert(context.state.economy.account.currentMoney === savedMoney, 'load should restore saved money.');
  assert(context.state.inventory.itemCounts[purchasable.item.id] === savedItemCount, 'load should restore saved item count.');

  const summary = {
    route: context.session.ui.route,
    currentMoney: context.state.economy.account.currentMoney,
    itemId: purchasable.item.id,
    itemCount: context.state.inventory.itemCounts[purchasable.item.id],
    savedDay: context.state.run.clock.day,
    snapshotLength: snapshotText.length,
  };
  console.log(`M9 save/load smoke passed: ${JSON.stringify(summary)}`);
}

main();
