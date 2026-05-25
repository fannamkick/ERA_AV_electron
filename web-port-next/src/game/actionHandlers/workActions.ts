import { cancelWork, executeSelectedWork, selectWork, selectWorkAssistant, selectWorkCharacter } from '../../features/work';
import type { GameAction } from '../actions';
import { logEffect } from '../effects';
import { failureResult, successResult, type GameActionContext, type GameActionResult } from '../results';
import { phaseOneRoutes } from '../routes';

export type WorkAction = Extract<GameAction, { readonly type: `work/${string}` }>;

export function isWorkAction(action: GameAction): action is WorkAction {
  return action.type.startsWith('work/');
}

export function handleWorkAction(context: GameActionContext, action: WorkAction): GameActionResult {
  switch (action.type) {
    case 'work/select': {
      const selection = selectWork(context.catalog, context.state, context.session, action.workId);
      if (!selection.ok) {
        return failureResult(context, selection.failure);
      }

      return successResult(context, {
        state: selection.state,
        session: selection.session,
        effects: [logEffect(selection.message)],
      });
    }
    case 'work/selectCharacter': {
      const selection = selectWorkCharacter(context.state, context.session, action.characterId);
      if (!selection.ok) {
        return failureResult(context, selection.failure);
      }

      return successResult(context, {
        state: selection.state,
        session: selection.session,
        effects: [logEffect(selection.message)],
      });
    }
    case 'work/selectAssistant': {
      const selection = selectWorkAssistant(context.state, context.session, action.characterId);
      if (!selection.ok) {
        return failureResult(context, selection.failure);
      }

      return successResult(context, {
        state: selection.state,
        session: selection.session,
        effects: [logEffect(selection.message)],
      });
    }
    case 'work/execute': {
      const work = executeSelectedWork(context.catalog, context.state, context.session);
      if (!work.ok) {
        return failureResult(context, work.failure);
      }

      return successResult(context, {
        state: work.state,
        session: work.session,
        route: work.session.ui.route,
        effects: work.effects ?? [logEffect(work.message, 'success')],
      });
    }
    case 'work/cancel':
      return successResult(context, {
        route: phaseOneRoutes.mainMenu,
        session: cancelWork(context.session),
        effects: [logEffect('창관/업무 화면을 닫고 메인 화면으로 돌아갑니다.')],
      });
  }
}
