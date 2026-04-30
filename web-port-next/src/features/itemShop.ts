import { getItemDefinition, getShopListingDefinition } from '../catalog/lookup';
import { itemShopPluralInventoryItemIdSet, itemShopSingleInventoryItemIdSet } from '../catalog/shopItemIds';
import type { CatalogId, GameDefinitions, ShopListingDefinition } from '../catalog/types';
import type { ShopSessionState } from '../domains/shop/types';
import type { GameSession, GameState } from '../game/state';
import type { ItemShopView, ShopListingView } from '../game/views';

export const MAX_PHASE_ONE_PURCHASE_QUANTITY = 99;
const MAX_ITEM_SHOP_STACK_COUNT = 99;

export type ShopFailure = {
  readonly code: string;
  readonly message: string;
};

export type ShopUpdateResult =
  | {
      readonly ok: true;
      readonly state: GameState;
      readonly session: GameSession;
      readonly message: string;
    }
  | {
      readonly ok: false;
      readonly failure: ShopFailure;
      readonly session?: GameSession;
    };

function playerCharacter(state: GameState) {
  return Object.values(state.people.characters).find((character) => character.roles.includes('trainer'));
}

function hasTrait(state: GameState, traitId: string): boolean {
  return Object.values(state.people.characters).some((character) => character.attributes.traits[traitId] === true);
}

function isNormalOrEasyMode(state: GameState): boolean {
  const modeId = state.run.runFlags.modeId;
  return modeId === 'normal' || modeId === 'easy' || modeId === undefined;
}

function hasCombinationKnowledge(state: GameState): boolean {
  return hasTrait(state, '55');
}

function originalShopVisibilityFailure(state: GameState, itemId: CatalogId): ShopFailure | undefined {
  const currentCount = state.inventory.itemCounts[itemId] ?? 0;
  const player = playerCharacter(state);
  const playerAbility = player?.attributes.abilities['12'] ?? 0;
  const clearCount = state.meta.clearBonuses.characterClearCounts[player?.id ?? ''] ?? 0;

  if (itemShopSingleInventoryItemIdSet.has(itemId) && currentCount > 0) {
    return {
      code: 'shop-listing-already-owned',
      message: 'Already owned non-consumable item.',
    };
  }

  if (itemShopPluralInventoryItemIdSet.has(itemId) && currentCount >= MAX_ITEM_SHOP_STACK_COUNT) {
    return {
      code: 'shop-inventory-limit',
      message: 'Item stack limit reached.',
    };
  }

  if ((itemId === '21' || itemId === '23') && !hasTrait(state, '93')) {
    return {
      code: 'shop-visibility-condition-unmet',
      message: 'Requires charisma trait.',
    };
  }

  if ((itemId === '17' || itemId === '20') && !isNormalOrEasyMode(state)) {
    return {
      code: 'shop-visibility-condition-unmet',
      message: 'Requires NORMAL/EASY or EXTRA-equivalent mode.',
    };
  }

  if ((itemId === '26' || itemId === '27') && !hasCombinationKnowledge(state)) {
    return {
      code: 'shop-visibility-condition-unmet',
      message: 'Requires combination knowledge.',
    };
  }

  if (itemId === '52' && (playerAbility >= 10 || playerAbility > clearCount + 1)) {
    return {
      code: 'shop-visibility-condition-unmet',
      message: 'Technique level item cap reached.',
    };
  }

  return undefined;
}

function inventoryLimitForItem(itemId: CatalogId): number {
  if (itemShopPluralInventoryItemIdSet.has(itemId)) return MAX_ITEM_SHOP_STACK_COUNT;
  return 1;
}

function isVisibleListing(definitions: GameDefinitions, state: GameState, listing: ShopListingDefinition): boolean {
  if (state.shop.progress.hiddenListingIds.includes(listing.id)) {
    return false;
  }

  const itemResult = getItemDefinition(definitions, listing.itemId);
  if (!itemResult.ok) {
    return false;
  }

  if (originalShopVisibilityFailure(state, itemResult.definition.id)) {
    return false;
  }

  if (state.shop.progress.unlockedListingIds.includes(listing.id)) {
    return true;
  }

  return listing.defaultAvailable;
}

export function computeVisibleShopListingIds(definitions: GameDefinitions, state: GameState): readonly CatalogId[] {
  return Object.values(definitions.shopListings)
    .filter((listing) => listing.listingKind === 'item')
    .filter((listing) => isVisibleListing(definitions, state, listing))
    .map((listing) => listing.id)
    .sort((left, right) => Number(left.split(':')[1]) - Number(right.split(':')[1]));
}

function listingViewFromDefinition(
  definitions: GameDefinitions,
  state: GameState,
  listingId: CatalogId,
): ShopListingView | undefined {
  const listingResult = getShopListingDefinition(definitions, listingId);
  if (!listingResult.ok) {
    return undefined;
  }

  const itemResult = getItemDefinition(definitions, listingResult.definition.itemId);
  if (!itemResult.ok) {
    return undefined;
  }

  const item = itemResult.definition;
  const unitPrice = item.basePrice ?? 0;
  const affordable = state.economy.account.currentMoney >= unitPrice;

  return {
    listingId: listingResult.definition.id,
    itemId: item.id,
    label: item.label,
    unitPrice,
    available: affordable,
    disabledReason: affordable ? undefined : '돈 부족',
  };
}

export function buildItemShopView(definitions: GameDefinitions, state: GameState, session: GameSession): ItemShopView {
  const visibleListingIds =
    session.shop.visibleListingIds.length > 0 ? session.shop.visibleListingIds : computeVisibleShopListingIds(definitions, state);
  const visibleListings = visibleListingIds
    .map((listingId) => listingViewFromDefinition(definitions, state, listingId))
    .filter((listing): listing is ShopListingView => Boolean(listing));
  const selectedListing =
    session.shop.selectedListingId !== undefined
      ? visibleListings.find((listing) => listing.listingId === session.shop.selectedListingId)
      : undefined;

  return {
    kind: 'itemShop',
    route: 'itemShop',
    currentMoney: state.economy.account.currentMoney,
    visibleListings,
    selectedListingId: session.shop.selectedListingId,
    selectedItemId: session.shop.selectedItemId,
    quantity: session.shop.quantity,
    totalPrice: selectedListing ? selectedListing.unitPrice * session.shop.quantity : undefined,
  };
}

export function createShopSession(definitions: GameDefinitions, state: GameState): ShopSessionState {
  return {
    selectedItemId: undefined,
    selectedListingId: undefined,
    visibleListingIds: computeVisibleShopListingIds(definitions, state),
    quantity: 1,
  };
}

function invalidQuantity(quantity: number): ShopFailure | undefined {
  if (!Number.isInteger(quantity)) {
    return {
      code: 'invalid-purchase-quantity',
      message: '구매 수량은 정수여야 합니다.',
    };
  }

  if (quantity < 1) {
    return {
      code: 'invalid-purchase-quantity',
      message: '구매 수량은 1 이상이어야 합니다.',
    };
  }

  if (quantity > MAX_PHASE_ONE_PURCHASE_QUANTITY) {
    return {
      code: 'purchase-quantity-too-large',
      message: `Phase 1 구매 수량 한도는 ${MAX_PHASE_ONE_PURCHASE_QUANTITY}개입니다.`,
    };
  }

  return undefined;
}

export function selectShopListing(
  definitions: GameDefinitions,
  state: GameState,
  session: GameSession,
  listingId: CatalogId,
): ShopUpdateResult {
  const listingResult = getShopListingDefinition(definitions, listingId);
  if (!listingResult.ok) {
    return {
      ok: false,
      failure: {
        code: listingResult.failure.code,
        message: listingResult.failure.message,
      },
    };
  }

  if (!isVisibleListing(definitions, state, listingResult.definition)) {
    return {
      ok: false,
      failure: {
        code: 'shop-listing-not-visible',
        message: `현재 표시 가능한 상품이 아닙니다: ${listingId}`,
      },
    };
  }

  if (session.shop.visibleListingIds.length > 0 && !session.shop.visibleListingIds.includes(listingId)) {
    return {
      ok: false,
      failure: {
        code: 'shop-listing-not-in-session',
        message: `현재 상점 화면의 표시 목록에 없는 상품입니다: ${listingId}`,
      },
    };
  }

  const itemResult = getItemDefinition(definitions, listingResult.definition.itemId);
  if (!itemResult.ok) {
    return {
      ok: false,
      failure: {
        code: itemResult.failure.code,
        message: itemResult.failure.message,
      },
    };
  }

  return {
    ok: true,
    state,
    session: {
      ...session,
      shop: {
        ...session.shop,
        selectedListingId: listingResult.definition.id,
        selectedItemId: itemResult.definition.id,
        quantity: session.shop.quantity > 0 ? session.shop.quantity : 1,
      },
    },
    message: `${itemResult.definition.label}을 선택했습니다.`,
  };
}

export function selectShopItem(
  definitions: GameDefinitions,
  state: GameState,
  session: GameSession,
  itemId: CatalogId,
): ShopUpdateResult {
  const listing = Object.values(definitions.shopListings).find((candidate) => candidate.itemId === itemId);
  if (!listing) {
    return {
      ok: false,
      failure: {
        code: 'definition-not-found',
        message: `item에 연결된 shopListing을 찾을 수 없습니다: ${itemId}`,
      },
    };
  }

  return selectShopListing(definitions, state, session, listing.id);
}

export function changeShopQuantity(state: GameState, session: GameSession, quantity: number): ShopUpdateResult {
  const failure = invalidQuantity(quantity);
  if (failure) {
    return {
      ok: false,
      failure,
    };
  }

  return {
    ok: true,
    state,
    session: {
      ...session,
      shop: {
        ...session.shop,
        quantity,
      },
    },
    message: `구매 수량을 ${quantity}개로 변경했습니다.`,
  };
}

export function purchaseSelectedShopItem(
  definitions: GameDefinitions,
  state: GameState,
  session: GameSession,
): ShopUpdateResult {
  const selectedListingId = session.shop.selectedListingId;
  if (!selectedListingId) {
    return {
      ok: false,
      failure: {
        code: 'shop-selection-required',
        message: '구매할 상품을 먼저 선택해야 합니다.',
      },
    };
  }

  const quantityFailure = invalidQuantity(session.shop.quantity);
  if (quantityFailure) {
    return {
      ok: false,
      failure: quantityFailure,
    };
  }

  const listingResult = getShopListingDefinition(definitions, selectedListingId);
  if (!listingResult.ok) {
    return {
      ok: false,
      failure: {
        code: listingResult.failure.code,
        message: listingResult.failure.message,
      },
    };
  }

  if (!isVisibleListing(definitions, state, listingResult.definition)) {
    return {
      ok: false,
      failure: {
        code: 'shop-listing-not-visible',
        message: `현재 구매 가능한 상품이 아닙니다: ${selectedListingId}`,
      },
    };
  }

  if (session.shop.visibleListingIds.length > 0 && !session.shop.visibleListingIds.includes(selectedListingId)) {
    return {
      ok: false,
      failure: {
        code: 'shop-listing-not-in-session',
        message: `현재 상점 화면의 표시 목록에 없는 상품입니다: ${selectedListingId}`,
      },
    };
  }

  const itemResult = getItemDefinition(definitions, listingResult.definition.itemId);
  if (!itemResult.ok) {
    return {
      ok: false,
      failure: {
        code: itemResult.failure.code,
        message: itemResult.failure.message,
      },
    };
  }

  const unitPrice = itemResult.definition.basePrice;
  if (unitPrice === undefined) {
    return {
      ok: false,
      failure: {
        code: 'shop-item-price-missing',
        message: `상품 가격 정의가 없습니다: ${itemResult.definition.id}`,
      },
    };
  }

  const totalPrice = unitPrice * session.shop.quantity;
  if (state.economy.account.currentMoney < totalPrice) {
    return {
      ok: false,
      failure: {
        code: 'not-enough-money',
        message: `돈이 부족합니다. 필요 금액: ${totalPrice}Pt`,
      },
    };
  }

  const currentCount = state.inventory.itemCounts[itemResult.definition.id] ?? 0;
  const inventoryLimit = inventoryLimitForItem(itemResult.definition.id);
  if (currentCount + session.shop.quantity > inventoryLimit) {
    return {
      ok: false,
      failure: {
        code: 'shop-inventory-limit',
        message: `Cannot hold more than ${inventoryLimit} of item ${itemResult.definition.id}.`,
      },
    };
  }

  const nextCount = currentCount + session.shop.quantity;

  const nextState: GameState = {
    ...state,
    economy: {
      ...state.economy,
      account: {
        currentMoney: state.economy.account.currentMoney - totalPrice,
      },
      accountingEntries: [
        ...state.economy.accountingEntries,
        `purchase:item:${itemResult.definition.id}:quantity:${session.shop.quantity}:total:${totalPrice}`,
      ],
    },
    inventory: {
      ...state.inventory,
      itemCounts: {
        ...state.inventory.itemCounts,
        [itemResult.definition.id]: nextCount,
      },
    },
  };

  return {
    ok: true,
    state: nextState,
    session: {
      ...session,
      shop: {
        ...session.shop,
        selectedItemId: undefined,
        selectedListingId: undefined,
        visibleListingIds: computeVisibleShopListingIds(definitions, nextState),
        quantity: 1,
      },
    },
    message: `${itemResult.definition.label} ${session.shop.quantity}개를 구매했습니다.`,
  };
}
