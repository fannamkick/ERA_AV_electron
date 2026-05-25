import { itemShopPurchaseItemIds } from '../src/catalog/shopItemIds';
import type { GameDefinitions } from '../src/catalog/types';
import { buildItemShopView } from '../src/features/itemShop';
import type { GameAction } from '../src/game/actions';
import { validateActionResultBoundary, validateSavePayloadBoundary, validateStateSessionBoundary } from '../src/game/boundaries';
import { dispatchGameAction } from '../src/game/dispatch';
import type { GameActionContext, GameActionResult } from '../src/game/results';
import { createGameSavePayload, parseGameSavePayload, serializeGameSavePayload } from '../src/game/savePayload';
import { createInitialGameData, type GameSession, type GameState } from '../src/game/state';
import type { CharacterRole } from '../src/domains/people/types';

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

function visibleListingIds(context: SmokeContext): readonly string[] {
  return buildItemShopView(context.catalog, context.state, context.session).visibleListings.map((listing) => listing.listingId);
}

function visibleUseItemIds(context: SmokeContext): readonly string[] {
  return buildItemShopView(context.catalog, context.state, context.session).visibleUseItems.map((item) => item.itemId);
}

function withPlayerTrait(context: SmokeContext, traitId: string): SmokeContext {
  const player = Object.values(context.state.people.characters).find((character) => character.roles.includes('trainer'));
  assert(player, 'M29 smoke needs a trainer character.');

  return {
    ...context,
    state: {
      ...context.state,
      people: {
        ...context.state.people,
        characters: {
          ...context.state.people.characters,
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
    },
  };
}

function withFirstNonTrainerTraitAndRoles(context: SmokeContext, traitId: string, roles: readonly CharacterRole[]): SmokeContext {
  const character = Object.values(context.state.people.characters).find((candidate) => !candidate.roles.includes('trainer'));
  assert(character, 'M29 smoke needs a non-trainer character.');

  return {
    ...context,
    state: {
      ...context.state,
      people: {
        ...context.state.people,
        characters: {
          ...context.state.people.characters,
          [character.id]: {
            ...character,
            roles,
            attributes: {
              ...character.attributes,
              traits: {
                ...character.attributes.traits,
                [traitId]: true,
              },
            },
          },
        },
      },
    },
  };
}

function withPlayerAbility(context: SmokeContext, abilityId: string, value: number): SmokeContext {
  const player = Object.values(context.state.people.characters).find((character) => character.roles.includes('trainer'));
  assert(player, 'M29 smoke needs a trainer character.');

  return {
    ...context,
    state: {
      ...context.state,
      people: {
        ...context.state.people,
        characters: {
          ...context.state.people.characters,
          [player.id]: {
            ...player,
            attributes: {
              ...player.attributes,
              abilities: {
                ...player.attributes.abilities,
                [abilityId]: value,
              },
            },
          },
        },
      },
    },
  };
}

function withPlayerClearCount(context: SmokeContext, count: number): SmokeContext {
  const player = Object.values(context.state.people.characters).find((character) => character.roles.includes('trainer'));
  assert(player, 'M29 smoke needs a trainer character.');

  return {
    ...context,
    state: {
      ...context.state,
      meta: {
        ...context.state.meta,
        clearBonuses: {
          ...context.state.meta.clearBonuses,
          characterClearCounts: {
            ...context.state.meta.clearBonuses.characterClearCounts,
            [player.id]: count,
          },
        },
      },
    },
  };
}

function withRunFlags(context: SmokeContext, flags: Record<string, boolean | number | string>): SmokeContext {
  return {
    ...context,
    state: {
      ...context.state,
      run: {
        ...context.state.run,
        runFlags: {
          ...context.state.run.runFlags,
          ...flags,
        },
      },
    },
  };
}

function withInventoryAndMoney(context: SmokeContext, itemId: string, count: number, money: number): SmokeContext {
  return {
    ...context,
    state: {
      ...context.state,
      economy: {
        ...context.state.economy,
        account: {
          currentMoney: money,
        },
      },
      inventory: {
        ...context.state.inventory,
        itemCounts: {
          ...context.state.inventory.itemCounts,
          [itemId]: count,
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

  const expectedListingIds = itemShopPurchaseItemIds.map((itemId) => `item:${itemId}`).sort((a, b) => Number(a.split(':')[1]) - Number(b.split(':')[1]));
  const actualListingIds = Object.keys(context.catalog.shopListings).sort((a, b) => Number(a.split(':')[1]) - Number(b.split(':')[1]));
  assert(actualListingIds.length === expectedListingIds.length, 'M29 should only define SHOP_ITEM purchase listings.');
  for (const listingId of expectedListingIds) {
    assert(actualListingIds.includes(listingId), `shop listing ${listingId} should exist.`);
  }
  for (const listingId of [
    'item:22',
    'item:28',
    'item:30',
    'item:31',
    'item:33',
    'item:38',
    'item:39',
    'item:40',
    'item:41',
    'item:42',
    'item:43',
    'item:52',
    'item:60',
    'item:90',
  ]) {
    assert(!actualListingIds.includes(listingId), `${listingId} should not be a normal purchase listing.`);
  }

  assertNoBoundaryErrors('initial state/session', validateStateSessionBoundary(context.state, context.session));

  let step = dispatchChecked(context, { type: 'game/new', input: { modeId: 'normal' } });
  assert(step.result.status === 'success', 'normal new game should succeed.');
  context = withPlayerAbility(step.context, '12', 0);

  step = dispatchChecked(context, { type: 'main/openItemShop' });
  assert(step.result.status === 'success', 'item shop entry should succeed.');
  context = step.context;
  assert(context.session.ui.route === 'itemShop', 'item shop entry should route to itemShop.');

  let visible = visibleListingIds(context);
  let visibleUse = visibleUseItemIds(context);
  assert(visible.includes('item:0'), 'basic item 0 should be visible.');
  assert(visible.includes('item:24'), 'condom item 24 should be visible.');
  assert(visible.includes('item:37'), 'lovescope item 37 should be visible before purchase.');
  assert(!visible.includes('item:6'), 'starting non-consumable item 6 should be hidden when already owned.');
  assert(!visible.includes('item:21'), 'trait-gated item 21 should be hidden without trait 93.');
  assert(!visible.includes('item:23'), 'trait-gated item 23 should be hidden without trait 93.');
  assert(!visible.includes('item:26'), 'combination-knowledge item 26 should be hidden without trait 55.');
  assert(!visible.includes('item:27'), 'combination-knowledge item 27 should be hidden without trait 55.');
  assert(!visibleUse.includes('30'), 'trait-gated immediate-use item 30 should be hidden before trait 55.');
  assert(!visibleUse.includes('31'), 'trait-gated immediate-use item 31 should be hidden before trait 55.');
  assert(visibleUse.includes('38'), 'immediate-use item 38 should be visible through the item shop use listing.');
  assert(visibleUse.includes('39'), 'immediate-use item 39 should be visible through the item shop use listing.');
  assert(visibleUse.includes('42'), 'immediate-use item 42 should be visible through the item shop use listing.');
  assert(visibleUse.includes('52'), 'immediate-use item 52 should be visible through the item shop use listing.');

  context = withInventoryAndMoney(context, '24', context.state.inventory.itemCounts['24'] ?? 0, 10000);
  const playerBeforeTechniqueItem = Object.values(context.state.people.characters).find((character) => character.roles.includes('trainer'));
  assert(playerBeforeTechniqueItem, 'M29 smoke needs a trainer before item 52 use.');
  const techniqueBefore = playerBeforeTechniqueItem.attributes.abilities['12'] ?? 0;
  const filmingCapacityBefore = playerBeforeTechniqueItem.attributes.baseStats.maximum['60'] ?? 0;
  const moneyBeforeTechniqueItem = context.state.economy.account.currentMoney;
  step = dispatchChecked(context, { type: 'shop/selectUseItem', itemId: '52' });
  assert(step.result.status === 'success', 'technique item 52 selection should succeed inside item shop.');
  context = step.context;
  step = dispatchChecked(context, { type: 'shop/confirmUseItem' });
  assert(step.result.status === 'success', 'technique item 52 use should succeed inside item shop.');
  context = step.context;
  const playerAfterTechniqueItem = Object.values(context.state.people.characters).find((character) => character.roles.includes('trainer'));
  assert(playerAfterTechniqueItem, 'M29 smoke needs a trainer after item 52 use.');
  assert(playerAfterTechniqueItem.attributes.abilities['12'] === techniqueBefore + 1, 'item 52 should increase master technique ability.');
  assert(
    playerAfterTechniqueItem.attributes.baseStats.maximum['60'] === filmingCapacityBefore + 4,
    'item 52 should increase master filming capacity maximum.',
  );
  assert(context.state.economy.account.currentMoney === moneyBeforeTechniqueItem - 5000, 'item 52 should subtract original purchase/use price.');

  context = withPlayerTrait(context, '93');
  step = dispatchChecked(context, { type: 'main/openItemShop' });
  assert(step.result.status === 'success', 'item shop re-entry after master charisma trait mutation should succeed.');
  context = step.context;
  assert(visibleListingIds(context).includes('item:21'), 'master trait 93 should unlock item 21.');
  assert(visibleListingIds(context).includes('item:23'), 'master trait 93 should unlock item 23.');

  context = withRunFlags(context, { modeId: 'hard' });
  step = dispatchChecked(context, { type: 'main/openItemShop' });
  assert(step.result.status === 'success', 'hard item shop re-entry for love dynamics check should succeed.');
  context = step.context;
  assert(!visibleListingIds(context).includes('item:17'), 'hard mode should hide item 17 like original FLAG:5 == 3.');
  assert(!visibleListingIds(context).includes('item:20'), 'hard mode should hide item 20 like original FLAG:5 == 3.');
  assert(!visibleUseItemIds(context).includes('38'), 'hard mode should hide love dynamics item 38.');
  context = withRunFlags(context, { modeId: 'powerful' });
  step = dispatchChecked(context, { type: 'main/openItemShop' });
  assert(step.result.status === 'success', 'powerful item shop re-entry for mode visibility check should succeed.');
  context = step.context;
  assert(!visibleListingIds(context).includes('item:17'), 'powerful mode should hide item 17 like original FLAG:5 == 4.');
  assert(!visibleListingIds(context).includes('item:20'), 'powerful mode should hide item 20 like original FLAG:5 == 4.');
  context = withRunFlags(context, { modeId: 'normal' });
  context = withPlayerClearCount(withPlayerAbility(context, '12', 2), 0);
  step = dispatchChecked(context, { type: 'main/openItemShop' });
  assert(step.result.status === 'success', 'item shop re-entry after technique cap mutation should succeed.');
  context = step.context;
  assert(!visibleUseItemIds(context).includes('52'), 'technique item 52 should hide when ABL:MASTER:12 > FLAG:30 + 1.');

  const beforeHiddenSelection = context.state;
  step = dispatchChecked(context, { type: 'shop/selectListing', listingId: 'item:26' });
  assert(step.result.status === 'failure', 'hidden listing selection should fail.');
  assert(step.result.failure?.code === 'shop-listing-not-visible', 'hidden listing should use shop-listing-not-visible.');
  assert(step.result.state === beforeHiddenSelection, 'hidden listing failure should preserve save state.');
  context = step.context;

  step = dispatchChecked(context, { type: 'shop/selectUseItem', itemId: '42' });
  assert(step.result.status === 'success', 'immediate-use listing selection should succeed inside item shop.');
  context = step.context;
  assert(context.session.shop.selectedUseItemId === '42', 'immediate-use selection should use selectedUseItemId.');
  step = dispatchChecked(context, { type: 'shop/cancelUseItem' });
  assert(step.result.status === 'success', 'immediate-use selection cancel should succeed.');
  context = step.context;
  assert(context.session.shop.selectedUseItemId === undefined, 'immediate-use cancel should clear selectedUseItemId.');

  step = dispatchChecked(context, { type: 'shop/selectListing', listingId: 'item:0' });
  assert(step.result.status === 'success', 'single inventory item selection should succeed.');
  context = step.context;
  const moneyBeforeItem0 = context.state.economy.account.currentMoney;
  step = dispatchChecked(context, { type: 'shop/confirmPurchase' });
  assert(step.result.status === 'success', 'single inventory item purchase should succeed.');
  context = step.context;
  assert(context.state.inventory.itemCounts['0'] === 1, 'single inventory item purchase should set item count.');
  assert(context.state.economy.account.currentMoney === moneyBeforeItem0 - 200, 'single inventory item purchase should subtract price.');
  visible = visibleListingIds(context);
  assert(!visible.includes('item:0'), 'single inventory item 0 should hide after purchase.');

  step = dispatchChecked(context, { type: 'shop/selectListing', listingId: 'item:24' });
  assert(step.result.status === 'success', 'plural item 24 selection should succeed.');
  context = step.context;
  step = dispatchChecked(context, { type: 'shop/changeQuantity', quantity: 2 });
  assert(step.result.status === 'success', 'plural quantity 2 should be accepted.');
  context = step.context;
  const moneyBeforeItem24 = context.state.economy.account.currentMoney;
  step = dispatchChecked(context, { type: 'shop/confirmPurchase' });
  assert(step.result.status === 'success', 'plural item purchase should succeed.');
  context = step.context;
  assert(context.state.inventory.itemCounts['24'] === 2, 'plural item purchase should increment item count.');
  assert(context.state.economy.account.currentMoney === moneyBeforeItem24 - 20, 'plural item purchase should subtract quantity total.');
  assert(context.session.shop.selectedItemId === undefined, 'purchase success should clear BOUGHT-equivalent selectedItemId.');

  context = withInventoryAndMoney(context, '24', 98, 1000);
  step = dispatchChecked(context, { type: 'shop/selectListing', listingId: 'item:24' });
  assert(step.result.status === 'success', 'near-cap plural item should still be selectable.');
  context = step.context;
  step = dispatchChecked(context, { type: 'shop/changeQuantity', quantity: 2 });
  assert(step.result.status === 'success', 'near-cap plural quantity 2 should pass input validation before inventory cap.');
  context = step.context;
  step = dispatchChecked(context, { type: 'shop/confirmPurchase' });
  assert(step.result.status === 'success', 'original BUY_PLURAL should allow 98 + 2 to reach 100.');
  context = step.context;
  assert(context.state.inventory.itemCounts['24'] === 100, 'plural item purchase should allow original 100-count cap.');
  assert(!visibleListingIds(context).includes('item:24'), 'plural item 24 should hide after reaching the original >=99 listing threshold.');

  context = withInventoryAndMoney(context, '24', 0, 1000);
  step = dispatchChecked(context, { type: 'main/openItemShop' });
  assert(step.result.status === 'success', 'item shop re-entry for quantity 100 should succeed.');
  context = step.context;
  step = dispatchChecked(context, { type: 'shop/selectListing', listingId: 'item:24' });
  assert(step.result.status === 'success', 'fresh plural item 24 selection should succeed.');
  context = step.context;
  step = dispatchChecked(context, { type: 'shop/changeQuantity', quantity: 100 });
  assert(step.result.status === 'success', 'original BUY_PLURAL should accept quantity 100 from zero stock.');
  context = step.context;
  step = dispatchChecked(context, { type: 'shop/changeQuantity', quantity: 101 });
  assert(step.result.status === 'failure', 'quantity above original BUY_PLURAL cap should fail input validation.');

  step = dispatchChecked(context, { type: 'shop/selectListing', listingId: 'item:16' });
  assert(step.result.status === 'success', 'expensive item selection should succeed.');
  context = step.context;
  step = dispatchChecked(context, { type: 'shop/changeQuantity', quantity: 1 });
  assert(step.result.status === 'success', 'quantity 1 should be accepted.');
  context = step.context;
  const beforeMoneyFailure = context.state;
  step = dispatchChecked(context, { type: 'shop/confirmPurchase' });
  assert(step.result.status === 'failure', 'not enough money should fail purchase.');
  assert(step.result.failure?.code === 'not-enough-money', 'money failure should use not-enough-money.');
  assert(step.result.state === beforeMoneyFailure, 'money failure should preserve save state.');
  context = step.context;

  step = dispatchChecked(context, { type: 'shop/cancel' });
  assert(step.result.status === 'success', 'shop cancel should succeed.');
  context = step.context;
  assert(context.session.ui.route === 'mainMenu', 'shop cancel should return to main menu.');
  assert(context.session.shop.visibleListingIds.length === 0, 'shop cancel should clear ITEMSALES-equivalent visible listing session.');

  step = dispatchChecked(context, { type: 'game/new', input: { modeId: 'easy' } });
  assert(step.result.status === 'success', 'easy new game should create a non-trainer for assistant knowledge checks.');
  context = step.context;
  step = dispatchChecked(context, { type: 'main/openItemShop' });
  assert(step.result.status === 'success', 'item shop entry for assistant knowledge checks should succeed.');
  context = withFirstNonTrainerTraitAndRoles(step.context, '93', ['owned']);
  step = dispatchChecked(context, { type: 'main/openItemShop' });
  assert(step.result.status === 'success', 'item shop re-entry after owned charisma trait mutation should succeed.');
  context = step.context;
  assert(!visibleListingIds(context).includes('item:21'), 'owned non-master trait 93 should not unlock item 21.');
  assert(!visibleListingIds(context).includes('item:23'), 'owned non-master trait 93 should not unlock item 23.');

  context = withFirstNonTrainerTraitAndRoles(context, '55', ['owned']);
  step = dispatchChecked(context, { type: 'main/openItemShop' });
  assert(step.result.status === 'success', 'item shop re-entry after owned trait mutation should succeed.');
  context = step.context;
  assert(!visibleListingIds(context).includes('item:26'), 'owned non-assistant trait 55 should not unlock combination-knowledge purchase items.');
  assert(!visibleUseItemIds(context).includes('30'), 'owned non-assistant trait 55 should not unlock immediate-use purchase rows.');
  context = withFirstNonTrainerTraitAndRoles(context, '55', ['owned', 'previousAssistant']);
  step = dispatchChecked(context, { type: 'main/openItemShop' });
  assert(step.result.status === 'success', 'item shop re-entry after previous assistant trait mutation should succeed.');
  context = step.context;
  assert(visibleListingIds(context).includes('item:26'), 'previous assistant trait 55 should unlock combination-knowledge purchase items.');
  assert(visibleUseItemIds(context).includes('30'), 'previous assistant trait 55 should unlock immediate-use purchase rows.');

  context = withRunFlags(context, { modeId: 'hard', incenseUsesToday: 2 });
  step = dispatchChecked(context, { type: 'main/openItemShop' });
  assert(step.result.status === 'success', 'hard item shop re-entry before incense limit should succeed.');
  context = step.context;
  assert(visibleUseItemIds(context).includes('31'), 'hard mode should keep incense visible before 3 daily uses.');
  context = withRunFlags(context, { modeId: 'hard', incenseUsesToday: 3 });
  step = dispatchChecked(context, { type: 'main/openItemShop' });
  assert(step.result.status === 'success', 'hard item shop re-entry at incense limit should succeed.');
  context = step.context;
  assert(!visibleUseItemIds(context).includes('31'), 'hard mode should hide incense after 3 daily uses.');
  context = withRunFlags(context, { modeId: 'powerful', incenseUsesToday: 1 });
  step = dispatchChecked(context, { type: 'main/openItemShop' });
  assert(step.result.status === 'success', 'powerful item shop re-entry at incense limit should succeed.');
  context = step.context;
  assert(!visibleUseItemIds(context).includes('31'), 'powerful mode should hide incense after 1 daily use.');
  context = withRunFlags(context, { modeId: 'extra', incenseUsesToday: 99 });
  step = dispatchChecked(context, { type: 'main/openItemShop' });
  assert(step.result.status === 'success', 'extra item shop re-entry should succeed.');
  context = step.context;
  assert(visibleListingIds(context).includes('item:17'), 'extra-equivalent mode should keep item 17 visible like FLAG:5 == 9.');
  assert(visibleListingIds(context).includes('item:20'), 'extra-equivalent mode should keep item 20 visible like FLAG:5 == 9.');

  context = withPlayerTrait(context, '55');
  step = dispatchChecked(context, { type: 'main/openItemShop' });
  assert(step.result.status === 'success', 'item shop re-entry with trait should succeed.');
  context = step.context;
  visible = visibleListingIds(context);
  visibleUse = visibleUseItemIds(context);
  assert(visible.includes('item:26'), 'combination-knowledge item 26 should become visible with trait 55.');
  assert(visible.includes('item:27'), 'combination-knowledge item 27 should become visible with trait 55.');
  assert(visibleUse.includes('30'), 'immediate-use item 30 should become visible with trait 55.');
  assert(visibleUse.includes('31'), 'immediate-use item 31 should become visible with trait 55.');
  assert(visibleUse.includes('40'), 'immediate-use item 40 should become visible with trait 55.');
  assert(visibleUse.includes('41'), 'immediate-use item 41 should be visible when original FLAG:36 equivalent is enabled.');
  assert(visibleUse.includes('43'), 'immediate-use item 43 should become visible with trait 55.');
  assert(!visibleUse.includes('42'), 'combination-knowledge immediate-use item 42 should hide after trait 55 is present.');

  context = withRunFlags(context, { pubicHairSystemEnabled: false });
  step = dispatchChecked(context, { type: 'main/openItemShop' });
  assert(step.result.status === 'success', 'item shop re-entry with pubic hair system disabled should succeed.');
  context = step.context;
  visibleUse = visibleUseItemIds(context);
  assert(!visibleUse.includes('41'), 'immediate-use item 41 should hide when original FLAG:36 equivalent is disabled.');

  const savePayload = createGameSavePayload(context.state, new Date('2026-05-01T00:00:00.000Z'));
  assertNoBoundaryErrors('save payload', validateSavePayloadBoundary(savePayload));
  const serialized = serializeGameSavePayload(savePayload);
  const parsed = parseGameSavePayload(serialized);
  assert(parsed.ok, 'purchase result save payload should roundtrip.');
  assert(!serialized.includes('BOUGHT'), 'save payload must not contain raw BOUGHT session name.');
  assert(!serialized.includes('ITEMSALES'), 'save payload must not contain raw ITEMSALES session name.');
  assert(!serialized.includes('selectedItemId'), 'save payload must not contain shop selectedItemId session state.');
  assert(!serialized.includes('visibleListingIds'), 'save payload must not contain shop visibleListingIds session state.');

  const summary = {
    shopListings: actualListingIds.length,
    visibleAfterTrait: visible.length,
    item0: context.state.inventory.itemCounts['0'],
    item24: context.state.inventory.itemCounts['24'],
    money: context.state.economy.account.currentMoney,
  };
  console.log(`M29 item shop smoke passed: ${JSON.stringify(summary)}`);
}

main();
