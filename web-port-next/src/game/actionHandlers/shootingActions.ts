import {
  cancelShooting,
  cancelShootingSelection,
  confirmShootingScene,
  selectShootingScene,
  selectShootingTarget,
} from '../../features/shooting';
import type { GameAction } from '../actions';
import { logEffect } from '../effects';
import { failureResult, successResult, type GameActionContext, type GameActionResult } from '../results';
import { phaseOneRoutes } from '../routes';

export type ShootingAction = Extract<GameAction, { readonly type: `shooting/${string}` }>;

export function isShootingAction(action: GameAction): action is ShootingAction {
  return action.type.startsWith('shooting/');
}

export function handleShootingAction(context: GameActionContext, action: ShootingAction): GameActionResult {
  switch (action.type) {
    case 'shooting/selectTarget': {
      const selection = selectShootingTarget(context.state, context.session, action.characterId);
      if (!selection.ok) {
        return failureResult(context, selection.failure);
      }

      return successResult(context, {
        state: selection.state,
        session: selection.session,
        effects: [logEffect(selection.message)],
      });
    }
    case 'shooting/selectScene': {
      const selection = selectShootingScene(context.catalog, context.state, context.session, action.sceneId);
      if (!selection.ok) {
        return failureResult(context, selection.failure);
      }

      return successResult(context, {
        state: selection.state,
        session: selection.session,
        effects: [logEffect(selection.message)],
      });
    }
    case 'shooting/confirmScene': {
      const shooting = confirmShootingScene(context.catalog, context.state, context.session);
      if (!shooting.ok) {
        return failureResult(context, shooting.failure);
      }

      return successResult(context, {
        state: shooting.state,
        session: shooting.session,
        route: shooting.session.ui.route,
        effects: shooting.effects ?? [logEffect(shooting.message, 'success')],
      });
    }
    case 'shooting/cancelSelection':
      return successResult(context, {
        session: cancelShootingSelection(context.session),
        effects: [logEffect('Filming target and scene selection cleared.')],
      });
    case 'shooting/cancel':
      return successResult(context, {
        route: phaseOneRoutes.mainMenu,
        session: cancelShooting(context.session),
        effects: [logEffect('Leaving the filming screen.')],
      });
  }
}
