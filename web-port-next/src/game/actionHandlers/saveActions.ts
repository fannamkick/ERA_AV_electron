import { cancelSaveLoad, createSaveSnapshot, loadSaveSnapshot, updateSaveLoadText } from '../../features/saveLoad';
import type { GameAction } from '../actions';
import { logEffect } from '../effects';
import { syncMainMenuRuntimeState } from '../../features/mainMenu';
import { failureResult, successResult, type GameActionContext, type GameActionResult } from '../results';
import { phaseOneRoutes } from '../routes';

export type SaveAction = Extract<GameAction, { readonly type: `save/${string}` }>;

export function isSaveAction(action: GameAction): action is SaveAction {
  return action.type.startsWith('save/');
}

export function handleSaveAction(context: GameActionContext, action: SaveAction): GameActionResult {
  switch (action.type) {
    case 'save/createSnapshot': {
      const snapshot = createSaveSnapshot(context.state, context.session);
      return successResult(context, {
        session: snapshot.session,
        effects: snapshot.effects,
      });
    }
    case 'save/updateLoadText':
      return successResult(context, {
        session: updateSaveLoadText(context.session, action.text),
      });
    case 'save/loadSnapshot': {
      const load = loadSaveSnapshot(context.session);
      if (!load.ok) {
        return failureResult(context, load.failure);
      }

      return successResult(context, {
        state: syncMainMenuRuntimeState(load.state),
        session: load.session,
        route: phaseOneRoutes.mainMenu,
        effects: load.effects,
      });
    }
    case 'save/cancel':
      return successResult(context, {
        route: phaseOneRoutes.mainMenu,
        session: cancelSaveLoad(context.session),
        effects: [logEffect('저장/로드 화면을 닫고 메인 화면으로 돌아갑니다.')],
      });
  }
}
