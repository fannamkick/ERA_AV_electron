import { immediateItemUseIds, specialTrainingItemIds } from '../src/catalog/itemUseIds';
import { buildItemShopView, isSpecialTrainingItemId } from '../src/features/itemShop';
import type { GameAction } from '../src/game/actions';
import { validateActionResultBoundary, validateSavePayloadBoundary, validateStateSessionBoundary } from '../src/game/boundaries';
import { dispatchGameAction } from '../src/game/dispatch';
import type { GameActionContext, GameActionResult } from '../src/game/results';
import { createGameSavePayload, parseGameSavePayload, serializeGameSavePayload } from '../src/game/savePayload';
import { createInitialGameData, type GameSession, type GameState } from '../src/game/state';

type SmokeContext = {
  readonly state: GameState;
  readonly session: GameSession;
  readonly catalog: ReturnType<typeof createInitialGameData>['definitions'];
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

function actionContext(context: SmokeContext): GameActionContext {
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
  const before = actionContext(context);
  const result = dispatchGameAction(before, action);
  assertNoBoundaryErrors(action.type, validateActionResultBoundary(before, result));
  return {
    context: nextContext(context, result),
    result,
  };
}

function playerId(context: SmokeContext): string {
  const player = Object.values(context.state.people.characters).find((character) => character.roles.includes('trainer'));
  assert(player, 'M30 smoke requires trainer character.');
  return player.id;
}

function targetId(context: SmokeContext): string {
  const target = Object.values(context.state.people.characters).find((character) => !character.roles.includes('trainer'));
  assert(target, 'M30 smoke requires non-trainer target character.');
  return target.id;
}

function withMoney(context: SmokeContext, money: number): SmokeContext {
  return {
    ...context,
    state: {
      ...context.state,
      economy: {
        ...context.state.economy,
        account: { currentMoney: money },
      },
    },
  };
}

function withPlayerAbility(context: SmokeContext, abilityId: string, value: number): SmokeContext {
  const id = playerId(context);
  const character = context.state.people.characters[id];
  return {
    ...context,
    state: {
      ...context.state,
      people: {
        ...context.state.people,
        characters: {
          ...context.state.people.characters,
          [id]: {
            ...character,
            attributes: {
              ...character.attributes,
              abilities: {
                ...character.attributes.abilities,
                [abilityId]: value,
              },
            },
          },
        },
      },
    },
  };
}

function withTargetBase(context: SmokeContext, characterId: string, current: number, maximum: number): SmokeContext {
  const character = context.state.people.characters[characterId];
  return {
    ...context,
    state: {
      ...context.state,
      people: {
        ...context.state.people,
        characters: {
          ...context.state.people.characters,
          [characterId]: {
            ...character,
            attributes: {
              ...character.attributes,
              baseStats: {
                ...character.attributes.baseStats,
                current: { ...character.attributes.baseStats.current, '0': current },
                maximum: { ...character.attributes.baseStats.maximum, '0': maximum },
              },
            },
          },
        },
      },
    },
  };
}

function withTargetResource(context: SmokeContext, characterId: string, resourceId: string, value: number): SmokeContext {
  const body = context.state.body.byCharacterId[characterId];
  return {
    ...context,
    state: {
      ...context.state,
      body: {
        ...context.state.body,
        byCharacterId: {
          ...context.state.body.byCharacterId,
          [characterId]: {
            ...body,
            trainingResources: {
              ...body.trainingResources,
              [resourceId]: value,
            },
          },
        },
      },
    },
  };
}

function visibleUseIds(context: SmokeContext): readonly string[] {
  return buildItemShopView(context.catalog, context.state, context.session).visibleUseItems.map((item) => item.itemId);
}

function main() {
  const initialData = createInitialGameData();
  let context: SmokeContext = {
    catalog: initialData.definitions,
    state: initialData.save,
    session: initialData.session,
  };

  for (const itemId of immediateItemUseIds) {
    assert(context.catalog.items[itemId], `immediate item ${itemId} must exist in definitions.`);
    assert(!context.catalog.shopListings[`item:${itemId}`], `immediate item ${itemId} must not be an M29 purchase listing.`);
  }

  for (const itemId of specialTrainingItemIds) {
    assert(context.catalog.items[itemId], `special item ${itemId} must exist in definitions.`);
    assert(isSpecialTrainingItemId(itemId), `special item ${itemId} must be classified as M30 special training item.`);
    assert(!context.catalog.shopListings[`item:${itemId}`], `special item ${itemId} must not be a purchase listing.`);
  }

  let step = dispatchChecked(context, { type: 'game/new', input: { modeId: 'easy' } });
  assert(step.result.status === 'success', 'easy new game should create a target character.');
  context = withMoney(step.context, 500000);
  context = withPlayerAbility(context, '12', 0);

  assertNoBoundaryErrors('M30 initial state/session', validateStateSessionBoundary(context.state, context.session));

  step = dispatchChecked(context, { type: 'main/openItemShop' });
  assert(step.result.status === 'success', 'item shop entry should succeed for M30 item use.');
  context = step.context;

  let useIds = visibleUseIds(context);
  assert(useIds.includes('42'), 'combination knowledge item should be visible before it is learned.');
  assert(!useIds.includes('30'), 'target-use medicine should be hidden before combination knowledge.');

  step = dispatchChecked(context, { type: 'shop/selectUseItem', itemId: '42' });
  assert(step.result.status === 'success', 'selecting combination knowledge should succeed.');
  context = step.context;
  const moneyBeforeCombination = context.state.economy.account.currentMoney;
  step = dispatchChecked(context, { type: 'shop/confirmUseItem' });
  assert(step.result.status === 'success', 'using combination knowledge should succeed.');
  context = step.context;
  const trainerId = playerId(context);
  assert(context.state.people.characters[trainerId].attributes.traits['55'] === true, 'item 42 should set trainer trait 55.');
  assert(context.state.economy.account.currentMoney === moneyBeforeCombination - 50000, 'item 42 should subtract its price.');
  assert(context.session.shop.selectedUseItemId === undefined, 'item use success should clear selected use item.');

  useIds = visibleUseIds(context);
  for (const itemId of ['30', '31', '40', '41', '43']) {
    assert(useIds.includes(itemId), `target-use item ${itemId} should be visible after combination knowledge.`);
  }
  assert(!useIds.includes('42'), 'combination knowledge item should hide after learned.');

  const target = targetId(context);
  context = withTargetBase(context, target, 100, 1000);
  step = dispatchChecked(context, { type: 'shop/selectUseItem', itemId: '30' });
  assert(step.result.status === 'success', 'nutrition item selection should succeed.');
  context = step.context;
  step = dispatchChecked(context, { type: 'shop/selectUseTarget', characterId: target });
  assert(step.result.status === 'success', 'nutrition target selection should succeed.');
  context = step.context;
  const moneyBeforeNutrition = context.state.economy.account.currentMoney;
  step = dispatchChecked(context, { type: 'shop/confirmUseItem' });
  assert(step.result.status === 'success', 'nutrition item use should succeed.');
  context = step.context;
  assert(context.state.people.characters[target].attributes.baseStats.current['0'] === 600, 'item 30 should restore target stamina by 500.');
  assert(context.state.economy.account.currentMoney === moneyBeforeNutrition - 1000, 'item 30 should subtract its price.');

  context = withTargetBase(context, target, 1000, 1000);
  step = dispatchChecked(context, { type: 'shop/selectUseItem', itemId: '30' });
  assert(step.result.status === 'success', 'nutrition item can be selected before target-specific validation.');
  context = step.context;
  step = dispatchChecked(context, { type: 'shop/selectUseTarget', characterId: target });
  assert(step.result.status === 'success', 'max stamina target can be selected before confirm validation.');
  context = step.context;
  const beforeMaxFailure = context.state;
  step = dispatchChecked(context, { type: 'shop/confirmUseItem' });
  assert(step.result.status === 'failure', 'nutrition item should fail at max stamina.');
  assert(step.result.failure?.code === 'item-use-condition-unmet', 'max stamina failure should use item-use-condition-unmet.');
  assert(step.result.state === beforeMaxFailure, 'failed item use should preserve save state reference.');
  context = step.context;

  context = withTargetResource(context, target, '100', 9);
  step = dispatchChecked(context, { type: 'shop/selectUseItem', itemId: '31' });
  assert(step.result.status === 'success', 'incense item selection should succeed.');
  context = step.context;
  step = dispatchChecked(context, { type: 'shop/selectUseTarget', characterId: target });
  assert(step.result.status === 'success', 'incense target selection should succeed.');
  context = step.context;
  step = dispatchChecked(context, { type: 'shop/confirmUseItem' });
  assert(step.result.status === 'success', 'incense item use should succeed.');
  context = step.context;
  assert(context.state.body.byCharacterId[target].trainingResources['100'] === 4, 'item 31 should halve negative juel by integer division.');
  assert(context.state.run.runFlags.incenseUsesToday === 1, 'item 31 should count daily incense use.');

  step = dispatchChecked(context, { type: 'shop/selectUseItem', itemId: '40' });
  assert(step.result.status === 'success', 'ovulation promotion item selection should succeed.');
  context = step.context;
  step = dispatchChecked(context, { type: 'shop/selectUseTarget', characterId: target });
  assert(step.result.status === 'success', 'ovulation promotion target selection should succeed.');
  context = step.context;
  step = dispatchChecked(context, { type: 'shop/confirmUseItem' });
  assert(step.result.status === 'success', 'ovulation promotion item use should succeed.');
  context = step.context;
  assert(context.state.body.byCharacterId[target].reproduction.ovulationControl === 'promote', 'item 40 should write reproduction owner.');

  step = dispatchChecked(context, { type: 'shop/selectUseItem', itemId: '41' });
  assert(step.result.status === 'success', 'hair growth item selection should succeed.');
  context = step.context;
  step = dispatchChecked(context, { type: 'shop/selectUseTarget', characterId: target });
  assert(step.result.status === 'success', 'hair growth target selection should succeed.');
  context = step.context;
  step = dispatchChecked(context, { type: 'shop/confirmUseItem' });
  assert(step.result.status === 'success', 'hair growth item use should succeed.');
  context = step.context;
  assert(context.state.body.byCharacterId[target].appearance.pubicHairGrowthBoost === true, 'item 41 should write appearance owner.');

  step = dispatchChecked(context, { type: 'shop/selectUseItem', itemId: '43' });
  assert(step.result.status === 'success', 'ovulation suppression item selection should succeed.');
  context = step.context;
  step = dispatchChecked(context, { type: 'shop/selectUseTarget', characterId: target });
  assert(step.result.status === 'success', 'ovulation suppression target selection should succeed.');
  context = step.context;
  step = dispatchChecked(context, { type: 'shop/confirmUseItem' });
  assert(step.result.status === 'success', 'ovulation suppression item use should succeed.');
  context = step.context;
  assert(context.state.body.byCharacterId[target].reproduction.ovulationControl === 'suppress', 'item 43 should write reproduction owner.');

  step = dispatchChecked(context, { type: 'shop/selectUseItem', itemId: '38' });
  assert(step.result.status === 'success', 'love dynamics item selection should succeed.');
  context = step.context;
  step = dispatchChecked(context, { type: 'shop/confirmUseItem' });
  assert(step.result.status === 'success', 'love dynamics item use should succeed.');
  context = step.context;
  assert(context.state.people.characters[trainerId].attributes.traits['91'] === true, 'item 38 should set trainer trait 91.');

  step = dispatchChecked(context, { type: 'shop/selectUseItem', itemId: '39' });
  assert(step.result.status === 'success', 'secret knowledge item selection should succeed.');
  context = step.context;
  step = dispatchChecked(context, { type: 'shop/confirmUseItem' });
  assert(step.result.status === 'success', 'secret knowledge item use should succeed.');
  context = step.context;
  assert(context.state.people.characters[trainerId].attributes.traits['325'] === true, 'item 39 should set trainer trait 325.');

  const techniqueBefore = context.state.people.characters[trainerId].attributes.abilities['12'] ?? 0;
  const filmingCapacityBefore = context.state.people.characters[trainerId].attributes.baseStats.maximum['60'] ?? 0;
  step = dispatchChecked(context, { type: 'shop/selectUseItem', itemId: '52' });
  assert(step.result.status === 'success', 'technique item selection should succeed.');
  context = step.context;
  step = dispatchChecked(context, { type: 'shop/confirmUseItem' });
  assert(step.result.status === 'success', 'technique item use should succeed.');
  context = step.context;
  assert(context.state.people.characters[trainerId].attributes.abilities['12'] === techniqueBefore + 1, 'item 52 should raise technique in EASY mode.');
  assert(
    context.state.people.characters[trainerId].attributes.baseStats.maximum['60'] === filmingCapacityBefore + 4,
    'item 52 should increase filming scene capacity.',
  );

  step = dispatchChecked(context, { type: 'shop/selectUseItem', itemId: '52' });
  assert(step.result.status === 'success', 'technique item can be selected for cancel path.');
  context = step.context;
  step = dispatchChecked(context, { type: 'shop/cancelUseItem' });
  assert(step.result.status === 'success', 'item use cancel should succeed.');
  context = step.context;
  assert(context.session.shop.selectedUseItemId === undefined, 'item use cancel should clear item selection.');
  assert(context.session.shop.selectedUseTargetCharacterId === undefined, 'item use cancel should clear target selection.');

  const savePayload = createGameSavePayload(context.state, new Date('2026-05-01T00:00:00.000Z'));
  assertNoBoundaryErrors('M30 save payload', validateSavePayloadBoundary(savePayload));
  const serialized = serializeGameSavePayload(savePayload);
  const parsed = parseGameSavePayload(serialized);
  assert(parsed.ok, 'M30 item use result should roundtrip through save payload.');
  for (const forbidden of ['selectedUseItemId', 'selectedUseTargetCharacterId', 'visibleUseItemIds', 'ITEMSALES', 'BOUGHT']) {
    assert(!serialized.includes(forbidden), `save payload must not contain ${forbidden}.`);
  }

  console.log(
    `M30 item use smoke passed: ${JSON.stringify({
      visibleUseItems: visibleUseIds(context).length,
      money: context.state.economy.account.currentMoney,
      targetStamina: context.state.people.characters[target].attributes.baseStats.current['0'],
      technique: context.state.people.characters[trainerId].attributes.abilities['12'],
      specialTrainingItems: specialTrainingItemIds.length,
    })}`,
  );
}

main();
