import { initialRecruitSessionState } from '../domains/recruit/types';
import { initialShopSessionState } from '../domains/shop/types';
import { changeShopQuantity, createShopSession, purchaseSelectedShopItem, selectShopItem, selectShopListing } from '../features/itemShop';
import { acceptSelectedMission, cancelMission, createMissionSession, reportSelectedMission, selectMission } from '../features/mission';
import { createNewGame } from '../features/newGame';
import { createRecruitSession, recruitSelectedCharacter, selectRecruitListing } from '../features/recruit';
import { cancelSaveLoad, createSaveSnapshot, loadSaveSnapshot, openSaveLoadSession, updateSaveLoadText } from '../features/saveLoad';
import {
  cancelShooting,
  cancelShootingSelection,
  confirmShootingScene,
  createShootingSession,
  selectShootingScene,
  selectShootingTarget,
} from '../features/shooting';
import {
  cancelTraining,
  cancelTrainingSelection,
  createTrainingSession,
  executeSelectedTraining,
  selectTrainingAssistant,
  selectTrainingCommand,
  selectTrainingExecutor,
  selectTrainingTarget,
} from '../features/training';
import { endTurn } from '../features/turnEnd';
import {
  cancelVisit,
  cancelVisitSelection,
  confirmVisitAction,
  createVisitSession,
  selectVisitAction,
  selectVisitPlace,
} from '../features/visit';
import { cancelWork, createWorkSession, executeSelectedWork, selectWork, selectWorkCharacter } from '../features/work';
import type { GameAction } from './actions';
import { logEffect } from './effects';
import {
  failureResult,
  routeResult,
  successResult,
  type GameActionContext,
  type GameActionResult,
} from './results';
import { phaseOneRoutes, phaseTwoRoutes } from './routes';

function unknownActionType(action: unknown): string {
  if (typeof action === 'object' && action !== null && 'type' in action) {
    const type = (action as { readonly type?: unknown }).type;
    if (typeof type === 'string' && type.length > 0) {
      return type;
    }
  }

  return '<missing>';
}

function enterItemShop(context: GameActionContext): GameActionResult {
  const shopSession = createShopSession(context.catalog, context.state);

  if (shopSession.visibleListingIds.length === 0) {
    return failureResult(context, {
      code: 'no-visible-shop-listings',
      message: '현재 구매 가능한 아이템이 없습니다.',
    });
  }

  return successResult(context, {
    route: phaseOneRoutes.itemShop,
    session: {
      ...context.session,
      shop: shopSession,
    },
    effects: [logEffect('아이템 상점 화면으로 이동합니다.')],
  });
}

function enterMission(context: GameActionContext): GameActionResult {
  const missionSession = createMissionSession(context.catalog, context.state);

  if (missionSession.visibleMissionIds.length === 0) {
    return failureResult(context, {
      code: 'no-visible-missions',
      message: '현재 표시 가능한 미션이 없습니다.',
    });
  }

  return successResult(context, {
    route: phaseTwoRoutes.mission,
    session: {
      ...context.session,
      mission: missionSession,
    },
    effects: [logEffect('미션 화면으로 이동합니다.')],
  });
}

function cancelShop(context: GameActionContext): GameActionResult {
  return successResult(context, {
    route: phaseOneRoutes.mainMenu,
    session: {
      ...context.session,
      shop: initialShopSessionState,
    },
    effects: [logEffect('아이템 상점을 닫고 메인 화면으로 돌아갑니다.')],
  });
}

function enterRecruit(context: GameActionContext): GameActionResult {
  const recruitSession = createRecruitSession(context.catalog, context.state);

  if (recruitSession.visibleListingIds.length === 0) {
    return failureResult(context, {
      code: 'no-visible-recruit-listings',
      message: '현재 영입 가능한 후보가 없습니다.',
    });
  }

  return successResult(context, {
    route: phaseTwoRoutes.recruit,
    session: {
      ...context.session,
      recruit: recruitSession,
    },
    effects: [logEffect('인물 영입 화면으로 이동합니다.')],
  });
}

function cancelRecruit(context: GameActionContext): GameActionResult {
  return successResult(context, {
    route: phaseOneRoutes.mainMenu,
    session: {
      ...context.session,
      recruit: initialRecruitSessionState,
    },
    effects: [logEffect('인물 영입을 닫고 메인 화면으로 돌아갑니다.')],
  });
}

function enterSaveLoad(context: GameActionContext): GameActionResult {
  return successResult(context, {
    route: phaseTwoRoutes.saveLoad,
    session: openSaveLoadSession(context.session),
    effects: [logEffect('저장/로드 화면으로 이동합니다.')],
  });
}

function enterVisit(context: GameActionContext): GameActionResult {
  const visitSession = createVisitSession(context.state);

  if (visitSession.visiblePlaceIds.length === 0) {
    return failureResult(context, {
      code: 'no-visible-visit-places',
      message: '현재 방문 가능한 장소가 없습니다.',
    });
  }

  return successResult(context, {
    route: phaseTwoRoutes.visit,
    session: {
      ...context.session,
      visit: visitSession,
    },
    effects: [logEffect('방문 화면으로 이동합니다.')],
  });
}

function enterWork(context: GameActionContext): GameActionResult {
  const workSession = createWorkSession(context.catalog, context.state);

  if (workSession.visibleWorkIds.length === 0) {
    return failureResult(context, {
      code: 'no-visible-work',
      message: '현재 실행 가능한 업무가 없습니다.',
    });
  }

  return successResult(context, {
    route: phaseTwoRoutes.work,
    session: {
      ...context.session,
      work: workSession,
    },
    effects: [logEffect('창관/업무 화면으로 이동합니다.')],
  });
}

function enterShooting(context: GameActionContext): GameActionResult {
  const shootingSession = createShootingSession(context.catalog, context.state);

  if (shootingSession.visibleCharacterIds.length === 0) {
    return failureResult(context, {
      code: 'no-visible-shooting-targets',
      message: 'No filming targets are currently visible.',
    });
  }

  if (shootingSession.visibleSceneIds.length === 0) {
    return failureResult(context, {
      code: 'no-visible-filming-scenes',
      message: 'No filming scenes are currently visible.',
    });
  }

  return successResult(context, {
    route: phaseTwoRoutes.shooting,
    session: {
      ...context.session,
      shooting: shootingSession,
    },
    effects: [logEffect('Moving to the filming screen.')],
  });
}

function enterTraining(context: GameActionContext): GameActionResult {
  const visibleCommandIds = Object.values(context.catalog.trainingCommands).filter(
    (command) => command.defaultAvailable === true || context.state.featureState.unlocks[`training:${command.id}`] === true,
  );

  if (visibleCommandIds.length === 0) {
    return failureResult(context, {
      code: 'no-visible-training-commands',
      message: 'No training commands are currently visible.',
    });
  }

  if (Object.keys(context.state.people.characters).length === 0) {
    return failureResult(context, {
      code: 'no-visible-training-participants',
      message: 'No training participants are currently visible.',
    });
  }

  return successResult(context, {
    route: phaseTwoRoutes.training,
    session: {
      ...context.session,
      interaction: createTrainingSession(),
    },
    effects: [logEffect('Moving to the training screen.')],
  });
}

export function dispatchGameAction(context: GameActionContext, action: GameAction): GameActionResult {
  switch (action.type) {
    case 'route/change':
      return routeResult(context, action.route, `Route changed: ${action.route}`);
    case 'game/new': {
      const newGame = createNewGame(context.catalog, action.input);
      if (!newGame.ok) {
        return failureResult(context, newGame.failure);
      }

      return successResult(context, {
        state: newGame.state,
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
      return enterMission(context);
    case 'main/openRecruit':
      return enterRecruit(context);
    case 'main/openSaveLoad':
      return enterSaveLoad(context);
    case 'main/openVisit':
      return enterVisit(context);
    case 'main/openWork':
      return enterWork(context);
    case 'main/openShooting':
      return enterShooting(context);
    case 'main/openTraining':
      return enterTraining(context);
    case 'turn/end': {
      const turn = endTurn(context.state, context.session);
      return successResult(context, {
        state: turn.state,
        session: turn.session,
        route: phaseOneRoutes.mainMenu,
        effects: turn.effects,
      });
    }
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
        state: load.state,
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
    case 'shop/cancel':
      return cancelShop(context);
    case 'recruit/selectListing': {
      const selection = selectRecruitListing(context.catalog, context.state, context.session, action.listingId);
      if (!selection.ok) {
        return failureResult(context, selection.failure);
      }

      return successResult(context, {
        state: selection.state,
        session: selection.session,
        effects: [logEffect(selection.message)],
      });
    }
    case 'recruit/confirm': {
      const recruit = recruitSelectedCharacter(context.catalog, context.state, context.session);
      if (!recruit.ok) {
        return failureResult(context, recruit.failure);
      }

      return successResult(context, {
        state: recruit.state,
        session: recruit.session,
        effects: [logEffect(recruit.message, 'success')],
      });
    }
    case 'recruit/cancel':
      return cancelRecruit(context);
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
    case 'mission/select': {
      const selection = selectMission(context.catalog, context.state, context.session, action.missionId);
      if (!selection.ok) {
        return failureResult(context, selection.failure);
      }

      return successResult(context, {
        state: selection.state,
        session: selection.session,
        effects: [logEffect(selection.message)],
      });
    }
    case 'mission/accept': {
      const mission = acceptSelectedMission(context.catalog, context.state, context.session);
      if (!mission.ok) {
        return failureResult(context, mission.failure);
      }

      return successResult(context, {
        state: mission.state,
        session: mission.session,
        effects: [logEffect(mission.message, 'success')],
      });
    }
    case 'mission/report': {
      const mission = reportSelectedMission(context.catalog, context.state, context.session);
      if (!mission.ok) {
        return failureResult(context, mission.failure);
      }

      return successResult(context, {
        state: mission.state,
        session: mission.session,
        effects: [logEffect(mission.message, 'success')],
      });
    }
    case 'mission/cancel':
      return successResult(context, {
        route: phaseOneRoutes.mainMenu,
        session: cancelMission(context.session),
        effects: [logEffect('미션 화면을 닫고 메인 화면으로 돌아갑니다.')],
      });
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
    case 'training/selectTarget': {
      const selection = selectTrainingTarget(context.state, context.session, action.characterId);
      if (!selection.ok) {
        return failureResult(context, selection.failure);
      }

      return successResult(context, {
        state: selection.state,
        session: selection.session,
        effects: [logEffect(selection.message)],
      });
    }
    case 'training/selectExecutor': {
      const selection = selectTrainingExecutor(context.state, context.session, action.characterId);
      if (!selection.ok) {
        return failureResult(context, selection.failure);
      }

      return successResult(context, {
        state: selection.state,
        session: selection.session,
        effects: [logEffect(selection.message)],
      });
    }
    case 'training/selectAssistant': {
      const selection = selectTrainingAssistant(context.state, context.session, action.characterId);
      if (!selection.ok) {
        return failureResult(context, selection.failure);
      }

      return successResult(context, {
        state: selection.state,
        session: selection.session,
        effects: [logEffect(selection.message)],
      });
    }
    case 'training/selectCommand': {
      const selection = selectTrainingCommand(context.catalog, context.state, context.session, action.commandId);
      if (!selection.ok) {
        return failureResult(context, selection.failure);
      }

      return successResult(context, {
        state: selection.state,
        session: selection.session,
        effects: [logEffect(selection.message)],
      });
    }
    case 'training/execute': {
      const training = executeSelectedTraining(context.catalog, context.state, context.session);
      if (!training.ok) {
        return failureResult(context, training.failure);
      }

      return successResult(context, {
        state: training.state,
        session: training.session,
        route: training.session.ui.route,
        effects: training.effects ?? [logEffect(training.message, 'success')],
      });
    }
    case 'training/cancelSelection':
      return successResult(context, {
        session: cancelTrainingSelection(context.session),
        effects: [logEffect('Training selections and calculation buffers cleared.')],
      });
    case 'training/cancel':
      return successResult(context, {
        route: phaseOneRoutes.mainMenu,
        session: cancelTraining(context.session),
        effects: [logEffect('Leaving the training screen.')],
      });
    default: {
      return failureResult(context, {
        code: 'unknown-action',
        message: `알 수 없는 action입니다: ${unknownActionType(action)}`,
      });
    }
  }
}
