import { getItemDefinition, getRecruitListingDefinition, getShopListingDefinition } from '../src/catalog/lookup';
import type { CatalogId, GameDefinitions, ItemDefinition, RecruitListingDefinition, ShopListingDefinition } from '../src/catalog/types';
import type { GameAction } from '../src/game/actions';
import { validateActionResultBoundary, validateSavePayloadBoundary } from '../src/game/boundaries';
import { dispatchGameAction } from '../src/game/dispatch';
import type { GameActionContext, GameActionResult } from '../src/game/results';
import { parseGameSavePayload } from '../src/game/savePayload';
import { createInitialGameData, type GameSession, type GameState } from '../src/game/state';

type RoundtripContext = {
  readonly catalog: GameDefinitions;
  readonly state: GameState;
  readonly session: GameSession;
};

type ShopCandidate = {
  readonly listing: ShopListingDefinition;
  readonly item: ItemDefinition;
  readonly price: number;
};

type RecruitCandidate = {
  readonly listing: RecruitListingDefinition;
  readonly price: number;
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

function toActionContext(context: RoundtripContext): GameActionContext {
  return {
    catalog: context.catalog,
    state: context.state,
    session: context.session,
  };
}

function nextContext(context: RoundtripContext, result: GameActionResult): RoundtripContext {
  return {
    catalog: context.catalog,
    state: result.state,
    session: result.session,
  };
}

function dispatchChecked(
  context: RoundtripContext,
  action: GameAction,
): { readonly context: RoundtripContext; readonly result: GameActionResult } {
  const actionContext = toActionContext(context);
  const result = dispatchGameAction(actionContext, action);
  assertNoErrors(action.type, validateActionResultBoundary(actionContext, result));
  return {
    context: nextContext(context, result),
    result,
  };
}

function stateText(state: GameState): string {
  return JSON.stringify(state);
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

function recruitCandidate(definitions: GameDefinitions, listingId: CatalogId): RecruitCandidate {
  const listing = getRecruitListingDefinition(definitions, listingId);
  assert(listing.ok, `missing recruit listing: ${listingId}`);
  assert(listing.definition.characterTemplateId, `missing character template id: ${listingId}`);
  assert(definitions.characters[listing.definition.characterTemplateId], `missing character template: ${listing.definition.characterTemplateId}`);
  assert(listing.definition.basePrice !== undefined, `missing recruit price: ${listingId}`);

  return {
    listing: listing.definition,
    price: listing.definition.basePrice,
  };
}

function visibleShopCandidates(context: RoundtripContext): readonly ShopCandidate[] {
  return context.session.shop.visibleListingIds.map((listingId) => shopCandidate(context.catalog, listingId));
}

function visibleRecruitCandidates(context: RoundtripContext): readonly RecruitCandidate[] {
  return context.session.recruit.visibleListingIds.map((listingId) => recruitCandidate(context.catalog, listingId));
}

function createRoundtripSnapshot(context: RoundtripContext): { readonly context: RoundtripContext; readonly snapshotText: string; readonly expectedState: string } {
  let step = dispatchChecked(context, { type: 'main/openSave' });
  assert(step.result.status === 'success', 'save/load entry should succeed.');
  let next = step.context;

  step = dispatchChecked(next, { type: 'save/createSnapshot' });
  assert(step.result.status === 'success', 'snapshot creation should succeed.');
  next = step.context;

  const snapshotText = next.session.saveLoad.snapshotText;
  assert(snapshotText.length > 0, 'snapshot text should be populated.');

  const parsed = parseGameSavePayload(snapshotText);
  assert(parsed.ok, 'snapshot should parse as save payload.');
  assertNoErrors('roundtrip snapshot payload', validateSavePayloadBoundary(parsed.payload));

  return {
    context: next,
    snapshotText,
    expectedState: stateText(parsed.payload.state),
  };
}

function loadSnapshot(context: RoundtripContext, snapshotText: string): RoundtripContext {
  const contextWithLoadText: RoundtripContext = {
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

  const step = dispatchChecked(contextWithLoadText, { type: 'save/loadSnapshot' });
  assert(step.result.status === 'success', 'loading snapshot should succeed.');
  assert(step.context.session.ui.route === 'mainMenu', 'loading snapshot should return to main menu.');
  assert(step.context.session.saveLoad.loadText === '', 'loading snapshot should clear load text.');
  return step.context;
}

function roundtrip(context: RoundtripContext, label: string): RoundtripContext {
  const snapshot = createRoundtripSnapshot(context);
  let next = snapshot.context;

  const turn = dispatchChecked(next, { type: 'turn/end' });
  assert(turn.result.status === 'success', `${label}: mutation after snapshot should succeed.`);
  next = turn.context;
  assert(stateText(next.state) !== snapshot.expectedState, `${label}: mutation should change state before load.`);

  next = loadSnapshot(next, snapshot.snapshotText);
  assert(stateText(next.state) === snapshot.expectedState, `${label}: load should restore snapshot state exactly.`);
  return next;
}

function main() {
  const initialData = createInitialGameData();
  let context: RoundtripContext = {
    catalog: initialData.definitions,
    state: initialData.save,
    session: initialData.session,
  };

  let step = dispatchChecked(context, { type: 'game/new', input: { modeId: 'easy' } });
  assert(step.result.status === 'success', 'easy new game should succeed.');
  context = step.context;
  context = roundtrip(context, 'new game');

  step = dispatchChecked(context, { type: 'main/openItemShop' });
  assert(step.result.status === 'success', 'item shop entry should succeed.');
  context = step.context;

  const purchasable = visibleShopCandidates(context).find(
    (candidate) => candidate.price > 0 && candidate.price <= context.state.economy.account.currentMoney,
  );
  assert(purchasable, 'roundtrip needs an affordable item.');

  step = dispatchChecked(context, { type: 'shop/selectListing', listingId: purchasable.listing.id });
  assert(step.result.status === 'success', 'item selection should succeed.');
  context = step.context;
  step = dispatchChecked(context, { type: 'shop/changeQuantity', quantity: 1 });
  assert(step.result.status === 'success', 'item quantity should update.');
  context = step.context;
  step = dispatchChecked(context, { type: 'shop/confirmPurchase' });
  assert(step.result.status === 'success', 'item purchase should succeed.');
  context = step.context;
  step = dispatchChecked(context, { type: 'shop/cancel' });
  assert(step.result.status === 'success', 'item shop cancel should succeed.');
  context = step.context;
  context = roundtrip(context, 'item purchase');

  step = dispatchChecked(context, { type: 'main/openRecruit' });
  assert(step.result.status === 'success', 'recruit entry should succeed.');
  context = step.context;

  const recruit = visibleRecruitCandidates(context).find((candidate) => candidate.price <= context.state.economy.account.currentMoney);
  assert(recruit, 'roundtrip needs an affordable recruit listing.');

  step = dispatchChecked(context, { type: 'recruit/selectListing', listingId: recruit.listing.id });
  assert(step.result.status === 'success', 'recruit selection should succeed.');
  context = step.context;
  step = dispatchChecked(context, { type: 'recruit/confirm' });
  assert(step.result.status === 'success', 'recruit confirm should succeed.');
  context = step.context;
  step = dispatchChecked(context, { type: 'recruit/cancel' });
  assert(step.result.status === 'success', 'recruit cancel should succeed.');
  context = step.context;
  context = roundtrip(context, 'recruit');

  step = dispatchChecked(context, { type: 'turn/end' });
  assert(step.result.status === 'success', 'explicit turn end should succeed.');
  context = step.context;
  assert(context.state.run.clock.turn > 0, 'turn end should increment turn.');
  context = roundtrip(context, 'turn end');

  const summary = {
    route: context.session.ui.route,
    money: context.state.economy.account.currentMoney,
    characters: Object.keys(context.state.people.characters).length,
    turn: context.state.run.clock.turn,
  };
  console.log(`M16 roundtrip passed: ${JSON.stringify(summary)}`);
}

main();
