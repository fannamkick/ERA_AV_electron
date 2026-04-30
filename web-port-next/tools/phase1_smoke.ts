import { getItemDefinition, getShopListingDefinition } from '../src/catalog/lookup';
import type { CatalogId, GameDefinitions, ItemDefinition, ShopListingDefinition } from '../src/catalog/types';
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

function diagnosticsText(diagnostics: readonly { readonly severity: string; readonly message: string }[]): string {
  return diagnostics.map((diagnostic) => `${diagnostic.severity}: ${diagnostic.message}`).join('\n');
}

function assertNoBoundaryErrors(label: string, diagnostics: readonly { readonly severity: string; readonly message: string }[]) {
  const errors = diagnostics.filter((diagnostic) => diagnostic.severity === 'error');
  assert(errors.length === 0, `${label} boundary failed:\n${diagnosticsText(errors)}`);
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

function assertPhaseOneCatalogBoundary(definitions: GameDefinitions) {
  const disallowedShopListings = Object.values(definitions.shopListings).filter((listing) => {
    const item = definitions.items[listing.itemId];
    return item === undefined || (item.category !== 'tool' && item.category !== 'consumable');
  });

  assert(
    disallowedShopListings.length === 0,
    `Phase 1 shopListings must not include non-purchase item categories: ${disallowedShopListings
      .map((listing) => listing.id)
      .join(', ')}`,
  );
}

function main() {
  const initialData = createInitialGameData();
  let context: SmokeContext = {
    catalog: initialData.definitions,
    state: initialData.save,
    session: initialData.session,
  };

  assertPhaseOneCatalogBoundary(context.catalog);
  assertNoBoundaryErrors('initial state/session', validateStateSessionBoundary(context.state, context.session));

  let step = dispatchChecked(context, { type: 'game/new', input: { modeId: 'normal' } });
  assert(step.result.status === 'success', 'normal new game should succeed.');
  context = step.context;
  assert(context.session.ui.route === 'mainMenu', 'new game should route to mainMenu.');
  assert(context.state.economy.account.currentMoney === 1000, 'normal new game should start with 1000 Pt.');
  assert(context.state.inventory.itemCounts['6'] === 1, 'new game should seed starting item 6.');

  step = dispatchChecked(context, { type: 'main/openItemShop' });
  assert(step.result.status === 'success', 'item shop entry should succeed.');
  context = step.context;
  assert(context.session.ui.route === 'itemShop', 'item shop entry should route to itemShop.');
  assert(context.session.shop.visibleListingIds.length > 0, 'item shop should have visible listings.');

  const candidates = visibleShopCandidates(context);
  const expensiveByQuantity = candidates.find((candidate) => candidate.price > 0 && candidate.price * 99 > context.state.economy.account.currentMoney);
  assert(expensiveByQuantity, 'Phase 1 smoke needs at least one listing that can fail by total price.');

  step = dispatchChecked(context, { type: 'shop/selectListing', listingId: expensiveByQuantity.listing.id });
  assert(step.result.status === 'success', 'shop listing selection should succeed.');
  context = step.context;

  step = dispatchChecked(context, { type: 'shop/changeQuantity', quantity: 99 });
  assert(step.result.status === 'success', 'quantity 99 should be accepted before money validation.');
  context = step.context;

  const beforeMoneyFailure = context.state;
  step = dispatchChecked(context, { type: 'shop/confirmPurchase' });
  assert(step.result.status === 'failure', 'oversized total price should fail purchase.');
  assert(step.result.failure?.code === 'not-enough-money', 'oversized total price should fail with not-enough-money.');
  assert(step.result.state === beforeMoneyFailure, 'failed purchase must keep the save state reference.');
  context = step.context;

  const purchasable = candidates.find((candidate) => candidate.price > 0 && candidate.price <= context.state.economy.account.currentMoney);
  assert(purchasable, 'Phase 1 smoke needs at least one affordable listing.');

  step = dispatchChecked(context, { type: 'shop/selectListing', listingId: purchasable.listing.id });
  assert(step.result.status === 'success', 'affordable shop listing selection should succeed.');
  context = step.context;

  step = dispatchChecked(context, { type: 'shop/changeQuantity', quantity: 1 });
  assert(step.result.status === 'success', 'quantity 1 should be accepted.');
  context = step.context;

  const moneyBeforePurchase = context.state.economy.account.currentMoney;
  const countBeforePurchase = context.state.inventory.itemCounts[purchasable.item.id] ?? 0;
  step = dispatchChecked(context, { type: 'shop/confirmPurchase' });
  assert(step.result.status === 'success', 'affordable purchase should succeed.');
  context = step.context;
  assert(
    context.state.economy.account.currentMoney === moneyBeforePurchase - purchasable.price,
    'successful purchase should subtract money.',
  );
  assert(
    context.state.inventory.itemCounts[purchasable.item.id] === countBeforePurchase + 1,
    'successful purchase should increment inventory count.',
  );
  assert(context.session.shop.selectedListingId === undefined, 'successful purchase should clear shop selection.');

  step = dispatchChecked(context, { type: 'shop/cancel' });
  assert(step.result.status === 'success', 'shop cancel should succeed.');
  context = step.context;
  assert(context.session.ui.route === 'mainMenu', 'shop cancel should route back to mainMenu.');
  assert(context.session.shop.visibleListingIds.length === 0, 'shop cancel should clear visible listing session state.');

  const badActionResult = dispatchGameAction(toActionContext(context), { type: 'debug/not-real' } as unknown as GameAction);
  assert(badActionResult.status === 'failure', 'unknown action should fail at runtime.');
  assert(badActionResult.failure?.code === 'unknown-action', 'unknown action should use unknown-action failure code.');
  assertNoBoundaryErrors('unknown action', validateActionResultBoundary(toActionContext(context), badActionResult));

  const savePayload = createGameSavePayload(context.state, new Date('2026-04-30T00:00:00.000Z'));
  assertNoBoundaryErrors('save payload', validateSavePayloadBoundary(savePayload));
  assertHasBoundaryError('save payload with top-level session', validateSavePayloadBoundary({ ...savePayload, session: context.session }));
  assertHasBoundaryError(
    'save payload with nested session',
    validateSavePayloadBoundary({ ...savePayload, state: { ...savePayload.state, session: context.session } }),
  );

  const summary = {
    items: Object.keys(context.catalog.items).length,
    recruitListings: Object.keys(context.catalog.recruitListings).length,
    shopListings: Object.keys(context.catalog.shopListings).length,
    route: context.session.ui.route,
    currentMoney: context.state.economy.account.currentMoney,
  };
  console.log(`Phase 1 smoke passed: ${JSON.stringify(summary)}`);
}

main();
