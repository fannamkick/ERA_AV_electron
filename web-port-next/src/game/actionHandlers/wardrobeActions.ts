import { selectWardrobeCostume, toggleWardrobeClothing } from '../../features/socialEquipmentCflag';
import type { GameAction } from '../actions';
import { logEffect } from '../effects';
import { failureResult, routeResult, successResult, type GameActionContext, type GameActionResult } from '../results';
import { phaseOneRoutes } from '../routes';

export type WardrobeAction = Extract<GameAction, { readonly type: `wardrobe/${string}` }>;

export function isWardrobeAction(action: GameAction): action is WardrobeAction {
  return action.type.startsWith('wardrobe/');
}

export function handleWardrobeAction(context: GameActionContext, action: WardrobeAction): GameActionResult {
  switch (action.type) {
    case 'wardrobe/toggleClothing': {
      const wardrobe = toggleWardrobeClothing(context.state, action.characterId, action.flagId);
      if (!wardrobe.ok) {
        return failureResult(context, wardrobe.failure);
      }

      return successResult(context, {
        state: wardrobe.state,
        effects: [logEffect(wardrobe.message, 'success')],
      });
    }
    case 'wardrobe/selectCostume': {
      const wardrobe = selectWardrobeCostume(context.state, action.characterId, action.costumeId);
      if (!wardrobe.ok) {
        return failureResult(context, wardrobe.failure);
      }

      return successResult(context, {
        state: wardrobe.state,
        effects: [logEffect(wardrobe.message, 'success')],
      });
    }
    case 'wardrobe/cancel':
      return routeResult(context, phaseOneRoutes.mainMenu, 'Leaving the wardrobe screen.');
  }
}
