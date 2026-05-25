import { handleCoreAction, isCoreAction } from './actionHandlers/coreActions';
import { handleMissionAction, isMissionAction } from './actionHandlers/missionActions';
import { handleRecruitAction, isRecruitAction } from './actionHandlers/recruitActions';
import { handleRosterAction, isRosterAction } from './actionHandlers/rosterActions';
import { handleSaveAction, isSaveAction } from './actionHandlers/saveActions';
import { handleShootingAction, isShootingAction } from './actionHandlers/shootingActions';
import { handleShopAction, isShopAction } from './actionHandlers/shopActions';
import { handleTrainingAction, isTrainingAction } from './actionHandlers/trainingActions';
import { handleVisitAction, isVisitAction } from './actionHandlers/visitActions';
import { handleWardrobeAction, isWardrobeAction } from './actionHandlers/wardrobeActions';
import { handleWorkAction, isWorkAction } from './actionHandlers/workActions';
import type { GameAction } from './actions';
import { failureResult, type GameActionContext, type GameActionResult } from './results';

function unknownActionType(action: unknown): string {
  if (typeof action === 'object' && action !== null && 'type' in action) {
    const type = (action as { readonly type?: unknown }).type;
    if (typeof type === 'string' && type.length > 0) {
      return type;
    }
  }

  return '<missing>';
}

export function dispatchGameAction(context: GameActionContext, action: GameAction): GameActionResult {
  if (isCoreAction(action)) return handleCoreAction(context, action);
  if (isSaveAction(action)) return handleSaveAction(context, action);
  if (isShopAction(action)) return handleShopAction(context, action);
  if (isRecruitAction(action)) return handleRecruitAction(context, action);
  if (isVisitAction(action)) return handleVisitAction(context, action);
  if (isMissionAction(action)) return handleMissionAction(context, action);
  if (isWorkAction(action)) return handleWorkAction(context, action);
  if (isShootingAction(action)) return handleShootingAction(context, action);
  if (isTrainingAction(action)) return handleTrainingAction(context, action);
  if (isRosterAction(action)) return handleRosterAction(context, action);
  if (isWardrobeAction(action)) return handleWardrobeAction(context, action);

  return failureResult(context, {
    code: 'unknown-action',
    message: `알 수 없는 action입니다: ${unknownActionType(action)}`,
  });
}
