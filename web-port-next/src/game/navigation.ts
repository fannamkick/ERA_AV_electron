import { initialRecruitSessionState } from '../domains/recruit/types';
import { initialShopSessionState } from '../domains/shop/types';
import { createShopSession } from '../features/itemShop';
import { createMissionSession } from '../features/mission';
import { mainMenuActionDisabledReason } from '../features/mainMenu';
import { createRecruitSession } from '../features/recruit';
import { openSaveLoadSession } from '../features/saveLoad';
import { createShootingSession } from '../features/shooting';
import { createTrainingSession } from '../features/training';
import { createVisitSession } from '../features/visit';
import { createWorkSession } from '../features/work';
import { logEffect } from './effects';
import { failureResult, successResult, type GameActionContext, type GameActionResult } from './results';
import { phaseOneRoutes, phaseTwoRoutes } from './routes';

export function enterItemShop(context: GameActionContext): GameActionResult {
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

export function enterMission(context: GameActionContext): GameActionResult {
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

export function cancelShop(context: GameActionContext): GameActionResult {
  return successResult(context, {
    route: phaseOneRoutes.mainMenu,
    session: {
      ...context.session,
      shop: initialShopSessionState,
    },
    effects: [logEffect('아이템 상점을 닫고 메인 화면으로 돌아갑니다.')],
  });
}

export function enterRecruit(context: GameActionContext): GameActionResult {
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

export function cancelRecruit(context: GameActionContext): GameActionResult {
  return successResult(context, {
    route: phaseOneRoutes.mainMenu,
    session: {
      ...context.session,
      recruit: initialRecruitSessionState,
    },
    effects: [logEffect('인물 영입을 닫고 메인 화면으로 돌아갑니다.')],
  });
}

export function enterSaveLoad(context: GameActionContext, mode: 'save' | 'load'): GameActionResult {
  return successResult(context, {
    route: phaseTwoRoutes.saveLoad,
    session: openSaveLoadSession(context.session, mode),
    effects: [logEffect('저장/로드 화면으로 이동합니다.')],
  });
}

export function enterVisit(context: GameActionContext): GameActionResult {
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

export function enterWork(context: GameActionContext): GameActionResult {
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

export function enterShooting(context: GameActionContext): GameActionResult {
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

export function enterTraining(context: GameActionContext): GameActionResult {
  const visibleCommandIds = Object.values(context.catalog.trainingCommands);

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

  const masterChara = Object.values(context.state.people.characters).find((c) => c.roles.includes('trainer'));
  const masterId = masterChara?.id ?? 'character:0';

  const session = createTrainingSession();

  return successResult(context, {
    route: phaseTwoRoutes.training,
    session: {
      ...context.session,
      interaction: {
        ...session,
        participants: {
          ...session.participants,
          masterId,
        },
      },
    },
    effects: [logEffect('Moving to the training screen.')],
  });
}

export function mainMenuGuard(context: GameActionContext, actionType: string): GameActionResult | undefined {
  const disabledReason = mainMenuActionDisabledReason(context.state, context.catalog, actionType);
  if (!disabledReason) return undefined;

  return failureResult(context, {
    code: 'main-menu-condition-unmet',
    message: disabledReason,
  });
}
