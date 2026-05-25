import { getItemDefinition, getShopListingDefinition } from '../catalog/lookup';
import {
  immediateItemUseIds,
  immediateMasterUseItemIdSet,
  immediateTargetUseItemIdSet,
  specialTrainingItemIdSet,
} from '../catalog/itemUseIds';
import { itemShopPluralInventoryItemIdSet, itemShopSingleInventoryItemIdSet } from '../catalog/shopItemIds';
import type { CatalogId, GameDefinitions, ShopListingDefinition } from '../catalog/types';
import type { ShopSessionState } from '../domains/shop/types';
import type { GameSession, GameState } from '../game/state';
import type { ItemShopView, ItemUseOptionView, ItemUseTargetView, ShopListingView } from '../game/views';

export const MAX_PHASE_ONE_PURCHASE_QUANTITY = 100;
const MAX_ITEM_SHOP_STACK_COUNT = 100;
const ITEM_SHOP_PLURAL_LISTING_HIDE_THRESHOLD = 99;
const ITEM_USE_TARGET_STAT_ID = '0';
const ITEM_USE_TECHNIQUE_ABILITY_ID = '12';
const ITEM_USE_NEGATIVE_JUEL_ID = '100';

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

function playerHasTrait(state: GameState, traitId: string): boolean {
  return playerCharacter(state)?.attributes.traits[traitId] === true;
}

function characterHasAssistantExperienceTrait(state: GameState, traitId: string): boolean {
  return Object.values(state.people.characters).some(
    (character) =>
      (character.roles.includes('assistant') || character.roles.includes('previousAssistant')) &&
      character.attributes.traits[traitId] === true,
  );
}

function isNormalOrEasyMode(state: GameState): boolean {
  const modeId = state.run.runFlags.modeId;
  return modeId === 'normal' || modeId === 'easy' || modeId === 'extra' || modeId === undefined;
}

function hasCombinationKnowledge(state: GameState): boolean {
  return playerHasTrait(state, '55') || characterHasAssistantExperienceTrait(state, '55');
}

function playerCharacterId(state: GameState): string | undefined {
  return playerCharacter(state)?.id;
}

function isHardLikeMode(state: GameState): boolean {
  const modeId = state.run.runFlags.modeId;
  return modeId === 'hard' || modeId === 'powerful';
}

function getTechniqueLevel(state: GameState): number {
  return playerCharacter(state)?.attributes.abilities[ITEM_USE_TECHNIQUE_ABILITY_ID] ?? 0;
}

function getTechniqueClearLimit(state: GameState): number {
  const playerId = playerCharacterId(state);
  return state.meta.clearBonuses.characterClearCounts[playerId ?? ''] ?? 0;
}

function isPubicHairSystemEnabled(state: GameState): boolean {
  const flagValue = state.run.runFlags.pubicHairSystemEnabled;
  return flagValue === true || flagValue === 1;
}

function incenseUseListingLimitReached(state: GameState): boolean {
  const modeId = state.run.runFlags.modeId;
  const usesToday = Number(state.run.runFlags.incenseUsesToday ?? 0);
  return (modeId === 'hard' && usesToday >= 3) || (modeId === 'powerful' && usesToday >= 1);
}

function itemUseVisibilityFailure(state: GameState, itemId: CatalogId): ShopFailure | undefined {
  if ((itemId === '30' || itemId === '31' || itemId === '40' || itemId === '41' || itemId === '43') && !hasCombinationKnowledge(state)) {
    return {
      code: 'item-use-condition-unmet',
      message: 'Requires combination knowledge before this item can be used.',
    };
  }

  if (itemId === '31' && incenseUseListingLimitReached(state)) {
    return {
      code: 'item-use-condition-unmet',
      message: 'Incense daily listing limit reached for this difficulty.',
    };
  }

  if (itemId === '41' && !isPubicHairSystemEnabled(state)) {
    return {
      code: 'item-use-condition-unmet',
      message: 'The pubic hair system is disabled.',
    };
  }

  if (itemId === '38' && (playerHasTrait(state, '91') || isHardLikeMode(state))) {
    return {
      code: 'item-use-condition-unmet',
      message: 'Love dynamics is already learned or blocked by difficulty.',
    };
  }

  if (itemId === '39' && playerHasTrait(state, '325')) {
    return {
      code: 'item-use-condition-unmet',
      message: 'Secret knowledge is already learned.',
    };
  }

  if (itemId === '42' && playerHasTrait(state, '55')) {
    return {
      code: 'item-use-condition-unmet',
      message: 'Combination knowledge is already learned.',
    };
  }

  if (itemId === '52' && (getTechniqueLevel(state) >= 10 || getTechniqueLevel(state) > getTechniqueClearLimit(state) + 1)) {
    return {
      code: 'item-use-condition-unmet',
      message: 'Technique level item cap reached.',
    };
  }

  return undefined;
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

  if (itemShopPluralInventoryItemIdSet.has(itemId) && currentCount >= ITEM_SHOP_PLURAL_LISTING_HIDE_THRESHOLD) {
    return {
      code: 'shop-inventory-limit',
      message: 'Item stack limit reached.',
    };
  }

  if ((itemId === '21' || itemId === '23') && !playerHasTrait(state, '93')) {
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

export function isSpecialTrainingItemId(itemId: CatalogId): boolean {
  return specialTrainingItemIdSet.has(itemId);
}

export function computeVisibleItemUseIds(definitions: GameDefinitions, state: GameState): readonly CatalogId[] {
  return immediateItemUseIds
    .filter((itemId) => definitions.items[itemId] !== undefined)
    .filter((itemId) => itemUseVisibilityFailure(state, itemId) === undefined)
    .sort((left, right) => Number(left) - Number(right));
}

function itemUseTargetViewFromState(state: GameState, characterId: string): ItemUseTargetView | undefined {
  const character = state.people.characters[characterId];
  if (!character || character.roles.includes('trainer')) {
    return undefined;
  }

  const available = (character.attributes.baseStats.current[ITEM_USE_TARGET_STAT_ID] ?? 0) > 0;
  return {
    characterId,
    label: character.identity.displayName,
    available,
    disabledReason: available ? undefined : 'Target is unavailable.',
  };
}

export function buildItemUseTargetViews(state: GameState): readonly ItemUseTargetView[] {
  return Object.keys(state.people.characters)
    .map((characterId) => itemUseTargetViewFromState(state, characterId))
    .filter((target): target is ItemUseTargetView => Boolean(target));
}

function itemUseDescription(itemId: CatalogId): string {
  const descriptions: Record<CatalogId, string> = {
    '30': 'Restore target stamina by 500, capped by maximum stamina.',
    '31': 'Halve target negative juel and count the incense use for the day.',
    '38': 'Teach the trainer Love Dynamics.',
    '39': 'Teach the trainer Secret Knowledge.',
    '40': 'Make the target more likely to become pregnant.',
    '41': 'Enable faster pubic hair growth for the target.',
    '42': 'Teach the trainer Combination Knowledge.',
    '43': 'Make the target less likely to become pregnant.',
    '52': 'Advance trainer technique level and filming scene capacity.',
  };

  return descriptions[itemId] ?? 'Special item effect.';
}

function itemUseOptionViewFromDefinition(
  definitions: GameDefinitions,
  state: GameState,
  itemId: CatalogId,
): ItemUseOptionView | undefined {
  const itemResult = getItemDefinition(definitions, itemId);
  if (!itemResult.ok) {
    return undefined;
  }

  const item = itemResult.definition;
  const unitPrice = item.basePrice ?? 0;
  const affordable = state.economy.account.currentMoney >= unitPrice;

  return {
    itemId,
    label: item.label,
    unitPrice,
    targetRequired: immediateTargetUseItemIdSet.has(itemId),
    available: affordable,
    disabledReason: affordable ? undefined : 'Not enough money.',
    description: item.description ?? itemUseDescription(itemId),
  };
}

function buildItemUseOptionViews(definitions: GameDefinitions, state: GameState, session: GameSession): readonly ItemUseOptionView[] {
  const visibleUseItemIds =
    session.shop.visibleUseItemIds.length > 0 ? session.shop.visibleUseItemIds : computeVisibleItemUseIds(definitions, state);
  return visibleUseItemIds
    .map((itemId) => itemUseOptionViewFromDefinition(definitions, state, itemId))
    .filter((item): item is ItemUseOptionView => Boolean(item));
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
  const visibleUseItems = buildItemUseOptionViews(definitions, state, session);
  const eligibleUseTargets = buildItemUseTargetViews(state);
  const selectedUseItem =
    session.shop.selectedUseItemId !== undefined
      ? visibleUseItems.find((item) => item.itemId === session.shop.selectedUseItemId)
      : undefined;
  const selectedUseTarget =
    session.shop.selectedUseTargetCharacterId !== undefined
      ? eligibleUseTargets.find((target) => target.characterId === session.shop.selectedUseTargetCharacterId)
      : undefined;

  return {
    kind: 'itemShop',
    route: 'itemShop',
    currentMoney: state.economy.account.currentMoney,
    visibleListings,
    visibleUseItems,
    eligibleUseTargets,
    selectedListingId: session.shop.selectedListingId,
    selectedItemId: session.shop.selectedItemId,
    selectedUseItemId: session.shop.selectedUseItemId,
    selectedUseTargetCharacterId: session.shop.selectedUseTargetCharacterId,
    selectedUseItem,
    selectedUseTarget,
    quantity: session.shop.quantity,
    totalPrice: selectedListing ? selectedListing.unitPrice * session.shop.quantity : undefined,
    useTotalPrice: selectedUseItem?.unitPrice,
  };
}

export function createShopSession(definitions: GameDefinitions, state: GameState): ShopSessionState {
  return {
    selectedItemId: undefined,
    selectedListingId: undefined,
    selectedUseItemId: undefined,
    selectedUseTargetCharacterId: undefined,
    visibleListingIds: computeVisibleShopListingIds(definitions, state),
    visibleUseItemIds: computeVisibleItemUseIds(definitions, state),
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

export function selectShopUseItem(
  definitions: GameDefinitions,
  state: GameState,
  session: GameSession,
  itemId: CatalogId,
): ShopUpdateResult {
  const itemResult = getItemDefinition(definitions, itemId);
  if (!itemResult.ok) {
    return {
      ok: false,
      failure: {
        code: itemResult.failure.code,
        message: itemResult.failure.message,
      },
    };
  }

  const visibleUseItemIds = session.shop.visibleUseItemIds.length > 0 ? session.shop.visibleUseItemIds : computeVisibleItemUseIds(definitions, state);
  if (!visibleUseItemIds.includes(itemId) || itemUseVisibilityFailure(state, itemId)) {
    return {
      ok: false,
      failure: {
        code: 'item-use-not-visible',
        message: `현재 사용할 수 있는 아이템이 아닙니다: ${itemId}`,
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
        selectedUseItemId: itemId,
        selectedUseTargetCharacterId: immediateMasterUseItemIdSet.has(itemId) ? undefined : session.shop.selectedUseTargetCharacterId,
      },
    },
    message: `${itemResult.definition.label} 사용을 선택했습니다.`,
  };
}

export function selectShopUseTarget(state: GameState, session: GameSession, characterId: string): ShopUpdateResult {
  const target = itemUseTargetViewFromState(state, characterId);
  if (!target || !target.available) {
    return {
      ok: false,
      failure: {
        code: 'item-use-target-unavailable',
        message: `아이템 사용 대상이 아닙니다: ${characterId}`,
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
        selectedUseTargetCharacterId: characterId,
      },
    },
    message: `${target.label}을 사용 대상으로 선택했습니다.`,
  };
}

export function cancelShopUseSelection(state: GameState, session: GameSession): ShopUpdateResult {
  return {
    ok: true,
    state,
    session: {
      ...session,
      shop: {
        ...session.shop,
        selectedUseItemId: undefined,
        selectedUseTargetCharacterId: undefined,
      },
    },
    message: '아이템 사용 선택을 취소했습니다.',
  };
}

function withItemUseCost(state: GameState, itemId: CatalogId, price: number): GameState {
  return {
    ...state,
    economy: {
      ...state.economy,
      account: {
        currentMoney: state.economy.account.currentMoney - price,
      },
      accountingEntries: [...state.economy.accountingEntries, `use-item:${itemId}:total:${price}`],
    },
  };
}

function withTargetBaseCurrent(state: GameState, characterId: string, statId: CatalogId, value: number): GameState {
  const character = state.people.characters[characterId];
  if (!character) return state;

  return {
    ...state,
    people: {
      ...state.people,
      characters: {
        ...state.people.characters,
        [characterId]: {
          ...character,
          attributes: {
            ...character.attributes,
            baseStats: {
              ...character.attributes.baseStats,
              current: {
                ...character.attributes.baseStats.current,
                [statId]: value,
              },
            },
          },
        },
      },
    },
  };
}

function withPlayerTrait(state: GameState, traitId: CatalogId): GameState {
  const player = playerCharacter(state);
  if (!player) return state;

  return {
    ...state,
    people: {
      ...state.people,
      characters: {
        ...state.people.characters,
        [player.id]: {
          ...player,
          attributes: {
            ...player.attributes,
            traits: {
              ...player.attributes.traits,
              [traitId]: true,
            },
          },
        },
      },
    },
  };
}

function withPlayerAbilityDelta(state: GameState, abilityId: CatalogId, delta: number): GameState {
  const player = playerCharacter(state);
  if (!player) return state;

  const current = player.attributes.abilities[abilityId] ?? 0;
  return {
    ...state,
    people: {
      ...state.people,
      characters: {
        ...state.people.characters,
        [player.id]: {
          ...player,
          attributes: {
            ...player.attributes,
            abilities: {
              ...player.attributes.abilities,
              [abilityId]: current + delta,
            },
          },
        },
      },
    },
  };
}

function withPlayerBaseMaximumDelta(state: GameState, statId: CatalogId, delta: number): GameState {
  const player = playerCharacter(state);
  if (!player) return state;

  return {
    ...state,
    people: {
      ...state.people,
      characters: {
        ...state.people.characters,
        [player.id]: {
          ...player,
          attributes: {
            ...player.attributes,
            baseStats: {
              ...player.attributes.baseStats,
              maximum: {
                ...player.attributes.baseStats.maximum,
                [statId]: (player.attributes.baseStats.maximum[statId] ?? 0) + delta,
              },
            },
          },
        },
      },
    },
  };
}

function withBodyTrainingResource(state: GameState, characterId: string, resourceId: string, value: number): GameState {
  const body = state.body.byCharacterId[characterId];
  if (!body) return state;

  return {
    ...state,
    body: {
      ...state.body,
      byCharacterId: {
        ...state.body.byCharacterId,
        [characterId]: {
          ...body,
          trainingResources: {
            ...body.trainingResources,
            [resourceId]: value,
          },
        },
      },
    },
  };
}

function withBodyReproduction(state: GameState, characterId: string, control: 'promote' | 'suppress'): GameState {
  const body = state.body.byCharacterId[characterId];
  if (!body) return state;

  return {
    ...state,
    body: {
      ...state.body,
      byCharacterId: {
        ...state.body.byCharacterId,
        [characterId]: {
          ...body,
          reproduction: {
            ...body.reproduction,
            ovulationControl: control,
            pregnancyModifierApplied: true,
          },
        },
      },
    },
  };
}

function withBodyAppearanceFlag(state: GameState, characterId: string, key: string, value: boolean | number | string): GameState {
  const body = state.body.byCharacterId[characterId];
  if (!body) return state;

  return {
    ...state,
    body: {
      ...state.body,
      byCharacterId: {
        ...state.body.byCharacterId,
        [characterId]: {
          ...body,
          appearance: {
            ...body.appearance,
            [key]: value,
          },
        },
      },
    },
  };
}

function withRunFlag(state: GameState, key: string, value: boolean | number | string): GameState {
  return {
    ...state,
    run: {
      ...state.run,
      runFlags: {
        ...state.run.runFlags,
        [key]: value,
      },
    },
  };
}

function itemUseTargetFailure(state: GameState, itemId: CatalogId, characterId?: string): ShopFailure | undefined {
  if (!immediateTargetUseItemIdSet.has(itemId)) {
    return undefined;
  }

  if (!characterId) {
    return {
      code: 'item-use-target-required',
      message: '대상 인물이 필요한 아이템입니다.',
    };
  }

  const character = state.people.characters[characterId];
  if (!character || character.roles.includes('trainer')) {
    return {
      code: 'item-use-target-unavailable',
      message: `아이템 사용 대상이 아닙니다: ${characterId}`,
    };
  }

  if ((character.attributes.baseStats.current[ITEM_USE_TARGET_STAT_ID] ?? 0) < 1) {
    return {
      code: 'item-use-target-unavailable',
      message: `사용 대상의 체력이 없습니다: ${characterId}`,
    };
  }

  if (itemId === '30') {
    const current = character.attributes.baseStats.current[ITEM_USE_TARGET_STAT_ID] ?? 0;
    const maximum = character.attributes.baseStats.maximum[ITEM_USE_TARGET_STAT_ID] ?? current;
    if (current >= maximum) {
      return {
        code: 'item-use-condition-unmet',
        message: '대상의 체력이 이미 최대입니다.',
      };
    }
  }

  if (itemId === '31') {
    const negativeJuel = state.body.byCharacterId[characterId]?.trainingResources[ITEM_USE_NEGATIVE_JUEL_ID] ?? 0;
    if (negativeJuel < 1) {
      return {
        code: 'item-use-condition-unmet',
        message: '대상이 부정의 구슬을 가지고 있지 않습니다.',
      };
    }
  }

  if ((itemId === '40' || itemId === '43') && (character.attributes.traits['153'] || character.attributes.traits['154'])) {
    return {
      code: 'item-use-condition-unmet',
      message: '대상이 이미 임신 또는 육아 중입니다.',
    };
  }

  return undefined;
}

function applyTargetItemUse(state: GameState, itemId: CatalogId, characterId: string): GameState {
  const character = state.people.characters[characterId];
  if (!character) return state;

  if (itemId === '30') {
    const current = character.attributes.baseStats.current[ITEM_USE_TARGET_STAT_ID] ?? 0;
    const maximum = character.attributes.baseStats.maximum[ITEM_USE_TARGET_STAT_ID] ?? current;
    return withTargetBaseCurrent(state, characterId, ITEM_USE_TARGET_STAT_ID, Math.min(maximum, current + 500));
  }

  if (itemId === '31') {
    const current = state.body.byCharacterId[characterId]?.trainingResources[ITEM_USE_NEGATIVE_JUEL_ID] ?? 0;
    const incenseUsesToday = Number(state.run.runFlags.incenseUsesToday ?? 0);
    return withRunFlag(
      withBodyTrainingResource(state, characterId, ITEM_USE_NEGATIVE_JUEL_ID, Math.floor(current / 2)),
      'incenseUsesToday',
      incenseUsesToday + 1,
    );
  }

  if (itemId === '40') {
    return withBodyReproduction(state, characterId, 'promote');
  }

  if (itemId === '41') {
    return withBodyAppearanceFlag(state, characterId, 'pubicHairGrowthBoost', true);
  }

  if (itemId === '43') {
    return withBodyReproduction(state, characterId, 'suppress');
  }

  return state;
}

function techniqueItemUseRequirement(state: GameState): number {
  const level = getTechniqueLevel(state);
  const modeId = state.run.runFlags.modeId;
  if (modeId === 'easy') return 1;
  if (modeId === 'normal' || modeId === 'extra' || modeId === undefined) return level >= 3 ? Math.max(1, level - 1) : 1;
  if (modeId === 'hard') return level >= 2 ? Math.max(1, level * 2) : 1;
  if (modeId === 'powerful') return level >= 1 ? Math.max(1, level * 5) : 1;
  return Math.max(1, level * 100);
}

function applyTechniqueItemUse(state: GameState): GameState {
  const required = techniqueItemUseRequirement(state);
  const currentProgress = Number(state.run.runFlags.techniqueItemProgress ?? 0);
  if (currentProgress + 1 >= required) {
    return withRunFlag(withPlayerAbilityDelta(state, ITEM_USE_TECHNIQUE_ABILITY_ID, 1), 'techniqueItemProgress', 0);
  }

  return withRunFlag(state, 'techniqueItemProgress', currentProgress + 1);
}

function applyMasterItemUse(state: GameState, itemId: CatalogId): GameState {
  if (itemId === '38') return withPlayerTrait(state, '91');
  if (itemId === '39') return withPlayerTrait(state, '325');
  if (itemId === '42') return withPlayerTrait(state, '55');
  if (itemId === '52') return withPlayerBaseMaximumDelta(applyTechniqueItemUse(state), '60', 4);
  return state;
}

export function useSelectedShopItem(
  definitions: GameDefinitions,
  state: GameState,
  session: GameSession,
): ShopUpdateResult {
  const itemId = session.shop.selectedUseItemId;
  if (!itemId) {
    return {
      ok: false,
      failure: {
        code: 'item-use-selection-required',
        message: '사용할 아이템을 먼저 선택해야 합니다.',
      },
    };
  }

  const itemResult = getItemDefinition(definitions, itemId);
  if (!itemResult.ok) {
    return {
      ok: false,
      failure: {
        code: itemResult.failure.code,
        message: itemResult.failure.message,
      },
    };
  }

  const visibilityFailure = itemUseVisibilityFailure(state, itemId);
  if (visibilityFailure) {
    return {
      ok: false,
      failure: visibilityFailure,
    };
  }

  const targetFailure = itemUseTargetFailure(state, itemId, session.shop.selectedUseTargetCharacterId);
  if (targetFailure) {
    return {
      ok: false,
      failure: targetFailure,
    };
  }

  const unitPrice = itemResult.definition.basePrice ?? 0;
  if (state.economy.account.currentMoney < unitPrice) {
    return {
      ok: false,
      failure: {
        code: 'not-enough-money',
        message: `돈이 부족합니다. 필요 금액: ${unitPrice} Pt`,
      },
    };
  }

  const paidState = withItemUseCost(state, itemId, unitPrice);
  const effectState = immediateTargetUseItemIdSet.has(itemId)
    ? applyTargetItemUse(paidState, itemId, session.shop.selectedUseTargetCharacterId ?? '')
    : applyMasterItemUse(paidState, itemId);
  const visibleUseItemIds = computeVisibleItemUseIds(definitions, effectState);
  const shouldContinueTargetUse =
    immediateTargetUseItemIdSet.has(itemId) && effectState.economy.account.currentMoney >= unitPrice && visibleUseItemIds.includes(itemId);

  return {
    ok: true,
    state: effectState,
    session: {
      ...session,
      shop: {
        ...session.shop,
        selectedUseItemId: shouldContinueTargetUse ? itemId : undefined,
        selectedUseTargetCharacterId: undefined,
        visibleUseItemIds,
      },
    },
    message: `${itemResult.definition.label}을 사용했습니다.`,
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
