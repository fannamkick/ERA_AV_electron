import { cancelVisit, cancelVisitSelection, confirmVisitAction, selectVisitAction, selectVisitPlace } from '../../features/visit';
import type { GameAction } from '../actions';
import { logEffect } from '../effects';
import { failureResult, successResult, type GameActionContext, type GameActionResult } from '../results';
import { phaseOneRoutes } from '../routes';

export type VisitAction = Extract<GameAction, { readonly type: `visit/${string}` }>;

export function isVisitAction(action: GameAction): action is VisitAction {
  return action.type.startsWith('visit/');
}

export function handleVisitAction(context: GameActionContext, action: VisitAction): GameActionResult {
  switch (action.type) {
    case 'visit/selectPlace': {
      const selection = selectVisitPlace(context.state, context.session, action.placeId);
      if (!selection.ok) {
        return failureResult(context, selection.failure);
      }

      return successResult(context, {
        state: selection.state,
        session: selection.session,
        effects: [logEffect(selection.message)],
      });
    }
    case 'visit/selectAction': {
      const selection = selectVisitAction(context.state, context.session, action.actionId);
      if (!selection.ok) {
        return failureResult(context, selection.failure);
      }

      return successResult(context, {
        state: selection.state,
        session: selection.session,
        effects: [logEffect(selection.message)],
      });
    }
    case 'visit/confirmAction': {
      const visit = confirmVisitAction(context.state, context.session);
      if (!visit.ok) {
        return failureResult(context, visit.failure);
      }

      return successResult(context, {
        state: visit.state,
        session: visit.session,
        effects: [logEffect(visit.message, 'success')],
      });
    }
    case 'visit/cancelSelection': {
      const cancel = cancelVisitSelection(context.state, context.session);
      if (!cancel.ok) {
        return failureResult(context, cancel.failure);
      }

      return successResult(context, {
        state: cancel.state,
        session: cancel.session,
        effects: [logEffect(cancel.message)],
      });
    }
    case 'visit/cancel':
      return successResult(context, {
        route: phaseOneRoutes.mainMenu,
        session: cancelVisit(context.session),
        effects: [logEffect('방문 화면을 닫고 메인 화면으로 돌아갑니다.')],
      });
  }
}
