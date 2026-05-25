import type { CatalogId } from '../catalog/types';
import type { UiRoute } from './routes';

export type NewGameActionInput = {
  readonly modeId?: 'easy' | 'normal';
  readonly seed?: string;
  readonly playerTemplateId?: CatalogId;
};

export type GameAction =
  | { readonly type: 'route/change'; readonly route: UiRoute }
  | { readonly type: 'game/new'; readonly input?: NewGameActionInput }
  | { readonly type: 'main/openItemShop' }
  | { readonly type: 'main/openMission' }
  | { readonly type: 'main/openRecruit' }
  | { readonly type: 'main/openRoster' }
  | { readonly type: 'main/openAbilityRoster' }
  | { readonly type: 'main/openActressList' }
  | { readonly type: 'main/openSave' }
  | { readonly type: 'main/openLoad' }
  | { readonly type: 'main/openWardrobe' }
  | { readonly type: 'main/openVisit' }
  | { readonly type: 'main/openWork' }
  | { readonly type: 'main/openShooting' }
  | { readonly type: 'main/openTraining' }
  | { readonly type: 'turn/end' }
  | { readonly type: 'save/createSnapshot' }
  | { readonly type: 'save/updateLoadText'; readonly text: string }
  | { readonly type: 'save/loadSnapshot' }
  | { readonly type: 'save/cancel' }
  | { readonly type: 'shop/selectListing'; readonly listingId: CatalogId }
  | { readonly type: 'shop/selectItem'; readonly itemId: CatalogId }
  | { readonly type: 'shop/changeQuantity'; readonly quantity: number }
  | { readonly type: 'shop/confirmPurchase' }
  | { readonly type: 'shop/selectUseItem'; readonly itemId: CatalogId }
  | { readonly type: 'shop/selectUseTarget'; readonly characterId: string }
  | { readonly type: 'shop/confirmUseItem' }
  | { readonly type: 'shop/cancelUseItem' }
  | { readonly type: 'shop/cancel' }
  | { readonly type: 'recruit/selectListing'; readonly listingId: CatalogId; readonly interviewGender?: number }
  | { readonly type: 'recruit/previousPage' }
  | { readonly type: 'recruit/nextPage' }
  | { readonly type: 'recruit/rerollInterview' }
  | { readonly type: 'recruit/confirm' }
  | { readonly type: 'recruit/cancel' }
  | { readonly type: 'visit/selectPlace'; readonly placeId: string }
  | { readonly type: 'visit/selectAction'; readonly actionId: string }
  | { readonly type: 'visit/confirmAction' }
  | { readonly type: 'visit/cancelSelection' }
  | { readonly type: 'visit/cancel' }
  | { readonly type: 'mission/select'; readonly missionId: CatalogId }
  | { readonly type: 'mission/accept' }
  | { readonly type: 'mission/report' }
  | { readonly type: 'mission/cancel' }
  | { readonly type: 'work/select'; readonly workId: CatalogId }
  | { readonly type: 'work/selectCharacter'; readonly characterId: string }
  | { readonly type: 'work/selectAssistant'; readonly characterId?: string }
  | { readonly type: 'work/execute' }
  | { readonly type: 'work/cancel' }
  | { readonly type: 'shooting/selectTarget'; readonly characterId: string }
  | { readonly type: 'shooting/selectScene'; readonly sceneId: CatalogId }
  | { readonly type: 'shooting/confirmScene' }
  | { readonly type: 'shooting/cancelSelection' }
  | { readonly type: 'shooting/cancel' }
  | { readonly type: 'training/selectTarget'; readonly characterId: string }
  | { readonly type: 'training/selectExecutor'; readonly characterId: string }
  | { readonly type: 'training/selectAssistant'; readonly characterId?: string }
  | { readonly type: 'training/selectCommand'; readonly commandId: CatalogId }
  | { readonly type: 'training/execute' }
  | { readonly type: 'training/cancelSelection' }
  | { readonly type: 'training/cancel' }
  | { readonly type: 'roster/retireCharacter'; readonly characterId: string }
  | { readonly type: 'roster/deleteCharacter'; readonly characterId: string }
  | { readonly type: 'roster/sellCharacter'; readonly characterId: string; readonly timeSlot?: 0 | 1 }
  | { readonly type: 'roster/setAssistantEligible'; readonly characterId: string; readonly assistantEligible: boolean }
  | { readonly type: 'wardrobe/toggleClothing'; readonly characterId: string; readonly flagId: string }
  | { readonly type: 'wardrobe/selectCostume'; readonly characterId: string; readonly costumeId: CatalogId }
  | { readonly type: 'wardrobe/cancel' };
