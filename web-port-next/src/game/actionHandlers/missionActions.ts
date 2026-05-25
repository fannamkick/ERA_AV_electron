import { acceptSelectedMission, cancelMission, reportSelectedMission, selectMission } from '../../features/mission';
import type { GameAction } from '../actions';
import { logEffect } from '../effects';
import { failureResult, successResult, type GameActionContext, type GameActionResult } from '../results';
import { phaseOneRoutes } from '../routes';

export type MissionAction = Extract<GameAction, { readonly type: `mission/${string}` }>;

export function isMissionAction(action: GameAction): action is MissionAction {
  return action.type.startsWith('mission/');
}

export function handleMissionAction(context: GameActionContext, action: MissionAction): GameActionResult {
  switch (action.type) {
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
  }
}
