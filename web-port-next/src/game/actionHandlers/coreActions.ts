import { markMainMenuRestBeforeTurnEnd, syncMainMenuRuntimeState } from '../../features/mainMenu';
import { createNewGame } from '../../features/newGame';
import { endTurn } from '../../features/turnEnd';
import type { GameAction } from '../actions';
import { logEffect } from '../effects';
import {
  enterItemShop,
  enterMission,
  enterRecruit,
  enterSaveLoad,
  enterShooting,
  enterTraining,
  enterVisit,
  enterWork,
  mainMenuGuard,
} from '../navigation';
import { failureResult, routeResult, successResult, type GameActionContext, type GameActionResult } from '../results';
import { phaseOneRoutes, phaseTwoRoutes } from '../routes';

export type CoreAction = Extract<
  GameAction,
  { readonly type: 'route/change' | 'game/new' | 'turn/end' | `main/${string}` }
>;

export function isCoreAction(action: GameAction): action is CoreAction {
  return action.type === 'route/change' || action.type === 'game/new' || action.type === 'turn/end' || action.type.startsWith('main/');
}

export function handleCoreAction(context: GameActionContext, action: CoreAction): GameActionResult {
  switch (action.type) {
    case 'route/change':
      return action.route === phaseOneRoutes.mainMenu
        ? successResult(context, {
            state: syncMainMenuRuntimeState(context.state),
            route: action.route,
            effects: [logEffect(`Route changed: ${action.route}`)],
          })
        : routeResult(context, action.route, `Route changed: ${action.route}`);
    case 'game/new': {
      const newGame = createNewGame(context.catalog, action.input);
      if (!newGame.ok) {
        return failureResult(context, newGame.failure);
      }

      return successResult(context, {
        state: syncMainMenuRuntimeState(newGame.state),
        session: newGame.session,
        route: phaseOneRoutes.mainMenu,
        effects: [
          logEffect(`${newGame.mode.label} 새 게임을 시작했습니다.`, 'success'),
          logEffect(`초기 인물 ${newGame.createdCharacterIds.length}명을 생성했습니다.`),
        ],
      });
    }
    case 'main/openItemShop':
      return enterItemShop(context);
    case 'main/openMission':
      return mainMenuGuard(context, action.type) ?? enterMission(context);
    case 'main/openRecruit':
      return enterRecruit(context);
    case 'main/openAbilityRoster':
      return mainMenuGuard(context, action.type) ?? routeResult(context, phaseTwoRoutes.roster, 'Moving to the roster screen.');
    case 'main/openActressList':
      return routeResult(context, phaseTwoRoutes.roster, 'Moving to the roster screen.');
    case 'main/openRoster':
      return routeResult(context, phaseTwoRoutes.roster, 'Moving to the roster screen.');
    case 'main/openSave':
      return enterSaveLoad(context, 'save');
    case 'main/openLoad':
      return enterSaveLoad(context, 'load');
    case 'main/openWardrobe':
      return mainMenuGuard(context, action.type) ?? routeResult(context, phaseTwoRoutes.wardrobe, 'Moving to the wardrobe screen.');
    case 'main/openVisit':
      return enterVisit(context);
    case 'main/openWork':
      return mainMenuGuard(context, action.type) ?? enterWork(context);
    case 'main/openShooting':
      return enterShooting(context);
    case 'main/openTraining':
      return mainMenuGuard(context, action.type) ?? enterTraining(context);
    case 'turn/end': {
      const turn = endTurn(markMainMenuRestBeforeTurnEnd(context.state), context.session);
      return successResult(context, {
        state: syncMainMenuRuntimeState(turn.state),
        session: turn.session,
        route: phaseOneRoutes.mainMenu,
        effects: turn.effects,
      });
    }
  }
}
