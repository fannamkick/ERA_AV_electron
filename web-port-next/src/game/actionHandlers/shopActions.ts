import {
  cancelShopUseSelection,
  changeShopQuantity,
  purchaseSelectedShopItem,
  selectShopItem,
  selectShopListing,
  selectShopUseItem,
  selectShopUseTarget,
  useSelectedShopItem,
} from '../../features/itemShop';
import type { GameAction } from '../actions';
import { logEffect } from '../effects';
import { cancelShop } from '../navigation';
import { failureResult, successResult, type GameActionContext, type GameActionResult } from '../results';

export type ShopAction = Extract<GameAction, { readonly type: `shop/${string}` }>;

export function isShopAction(action: GameAction): action is ShopAction {
  return action.type.startsWith('shop/');
}

export function handleShopAction(context: GameActionContext, action: ShopAction): GameActionResult {
  switch (action.type) {
    case 'shop/selectListing': {
      const selection = selectShopListing(context.catalog, context.state, context.session, action.listingId);
      if (!selection.ok) {
        return failureResult(context, selection.failure);
      }

      return successResult(context, {
        state: selection.state,
        session: selection.session,
        effects: [logEffect(selection.message)],
      });
    }
    case 'shop/selectItem': {
      const selection = selectShopItem(context.catalog, context.state, context.session, action.itemId);
      if (!selection.ok) {
        return failureResult(context, selection.failure);
      }

      return successResult(context, {
        state: selection.state,
        session: selection.session,
        effects: [logEffect(selection.message)],
      });
    }
    case 'shop/changeQuantity': {
      const quantityChange = changeShopQuantity(context.state, context.session, action.quantity);
      if (!quantityChange.ok) {
        return failureResult(context, quantityChange.failure);
      }

      return successResult(context, {
        state: quantityChange.state,
        session: quantityChange.session,
        effects: [logEffect(quantityChange.message)],
      });
    }
    case 'shop/confirmPurchase': {
      const purchase = purchaseSelectedShopItem(context.catalog, context.state, context.session);
      if (!purchase.ok) {
        return failureResult(context, purchase.failure);
      }

      return successResult(context, {
        state: purchase.state,
        session: purchase.session,
        effects: [logEffect(purchase.message, 'success')],
      });
    }
    case 'shop/selectUseItem': {
      const selection = selectShopUseItem(context.catalog, context.state, context.session, action.itemId);
      if (!selection.ok) {
        return failureResult(context, selection.failure);
      }

      return successResult(context, {
        state: selection.state,
        session: selection.session,
        effects: [logEffect(selection.message)],
      });
    }
    case 'shop/selectUseTarget': {
      const selection = selectShopUseTarget(context.state, context.session, action.characterId);
      if (!selection.ok) {
        return failureResult(context, selection.failure);
      }

      return successResult(context, {
        state: selection.state,
        session: selection.session,
        effects: [logEffect(selection.message)],
      });
    }
    case 'shop/confirmUseItem': {
      const itemUse = useSelectedShopItem(context.catalog, context.state, context.session);
      if (!itemUse.ok) {
        return failureResult(context, itemUse.failure);
      }

      return successResult(context, {
        state: itemUse.state,
        session: itemUse.session,
        effects: [logEffect(itemUse.message, 'success')],
      });
    }
    case 'shop/cancelUseItem': {
      const cancel = cancelShopUseSelection(context.state, context.session);
      if (!cancel.ok) {
        return failureResult(context, cancel.failure);
      }

      return successResult(context, {
        state: cancel.state,
        session: cancel.session,
        effects: [logEffect(cancel.message)],
      });
    }
    case 'shop/cancel':
      return cancelShop(context);
  }
}
