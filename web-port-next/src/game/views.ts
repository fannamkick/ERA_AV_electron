import type { CatalogId } from '../catalog/types';
import type { UiRoute } from './routes';

export type MenuItemView = {
  readonly id: string;
  readonly label: string;
  readonly route?: UiRoute;
  readonly actionId?: string;
  readonly sourceId?: string;
  readonly sourceEvidenceId?: string;
  readonly ownerMilestone?: string;
  readonly enabled: boolean;
  readonly disabledReason?: string;
};

export type MainMenuView = {
  readonly kind: 'mainMenu';
  readonly route: 'mainMenu';
  readonly currentMoney: number;
  readonly menuItems: readonly MenuItemView[];
};

export type RosterEntryView = {
  readonly characterId: string;
  readonly displayName: string;
  readonly callName?: string;
  readonly nickname?: string;
  readonly firstPerson?: string;
  readonly templateId: CatalogId;
  readonly roleSummary: string;
  readonly lifecycleSummary: string;
  readonly profileTextSlotCount: number;
  readonly profileTextSlots: Record<CatalogId, string>;
  readonly peopleBaseStatCount: number;
  readonly bodyBaseStatCount: number;
  readonly bodyResultStatCount: number;
  readonly abilityCount: number;
  readonly traitCount: number;
  readonly experienceCount: number;
  readonly conditionParamCount: number;
  readonly trainingResourceCount: number;
  readonly imprintCount: number;
  readonly retired: boolean;
  readonly deleted: boolean;
  readonly assistantEligible: boolean;
  readonly recruitmentStatus: 'notRecruitable' | 'recruitable' | 'recruited';
};

export type RosterView = {
  readonly kind: 'roster';
  readonly route: 'roster';
  readonly entries: readonly RosterEntryView[];
};

export type WardrobeCharacterView = {
  readonly characterId: string;
  readonly label: string;
  readonly clothing: Record<string, boolean | number | string>;
  readonly availabilityFlags: Record<string, boolean | number | string>;
  readonly clothingFlagCount: number;
  readonly availabilityFlagCount: number;
};

export type WardrobeView = {
  readonly kind: 'wardrobe';
  readonly route: 'wardrobe';
  readonly entries: readonly WardrobeCharacterView[];
};

export type ShopListingView = {
  readonly listingId: CatalogId;
  readonly itemId: CatalogId;
  readonly label: string;
  readonly unitPrice: number;
  readonly available: boolean;
  readonly disabledReason?: string;
};

export type ItemUseOptionView = {
  readonly itemId: CatalogId;
  readonly label: string;
  readonly unitPrice: number;
  readonly targetRequired: boolean;
  readonly available: boolean;
  readonly disabledReason?: string;
  readonly description?: string;
};

export type ItemUseTargetView = {
  readonly characterId: string;
  readonly label: string;
  readonly available: boolean;
  readonly disabledReason?: string;
};

export type ItemShopView = {
  readonly kind: 'itemShop';
  readonly route: 'itemShop';
  readonly currentMoney: number;
  readonly visibleListings: readonly ShopListingView[];
  readonly visibleUseItems: readonly ItemUseOptionView[];
  readonly eligibleUseTargets: readonly ItemUseTargetView[];
  readonly selectedListingId?: CatalogId;
  readonly selectedItemId?: CatalogId;
  readonly selectedUseItemId?: CatalogId;
  readonly selectedUseTargetCharacterId?: string;
  readonly selectedUseItem?: ItemUseOptionView;
  readonly selectedUseTarget?: ItemUseTargetView;
  readonly quantity: number;
  readonly totalPrice?: number;
  readonly useTotalPrice?: number;
};

export type RecruitListingView = {
  readonly listingId: CatalogId;
  readonly characterTemplateId?: CatalogId;
  readonly characterId?: string;
  readonly label: string;
  readonly price: number;
  readonly available: boolean;
  readonly disabledReason?: string;
};

export type RecruitView = {
  readonly kind: 'recruit';
  readonly route: 'recruit';
  readonly currentMoney: number;
  readonly visibleListings: readonly RecruitListingView[];
  readonly selectedListingId?: CatalogId;
  readonly selectedListing?: RecruitListingView;
};

export type SaveLoadView = {
  readonly kind: 'saveLoad';
  readonly route: 'saveLoad';
  readonly schemaVersion: number;
  readonly currentMoney: number;
  readonly month: number;
  readonly week: number;
  readonly turn: number;
  readonly snapshotText: string;
  readonly loadText: string;
  readonly lastSnapshotAt?: string;
};

export type VisitPlaceView = {
  readonly placeId: string;
  readonly label: string;
  readonly source: string;
  readonly available: boolean;
  readonly disabledReason?: string;
};

export type VisitActionView = {
  readonly actionId: string;
  readonly placeId: string;
  readonly label: string;
  readonly cost: number;
  readonly source: string;
  readonly completed: boolean;
  readonly available: boolean;
  readonly disabledReason?: string;
};

export type VisitView = {
  readonly kind: 'visit';
  readonly route: 'visit';
  readonly currentMoney: number;
  readonly visiblePlaces: readonly VisitPlaceView[];
  readonly selectedPlaceId?: string;
  readonly selectedPlace?: VisitPlaceView;
  readonly visibleActions: readonly VisitActionView[];
  readonly selectedActionId?: string;
  readonly selectedAction?: VisitActionView;
};

export type MissionListingView = {
  readonly missionId: CatalogId;
  readonly label: string;
  readonly status: 'available' | 'accepted' | 'completed' | 'failed' | 'locked';
  readonly rewardMoney: number;
  readonly remainingWeeks?: number;
  readonly available: boolean;
  readonly disabledReason?: string;
};

export type MissionView = {
  readonly kind: 'mission';
  readonly route: 'mission';
  readonly currentMoney: number;
  readonly visibleMissions: readonly MissionListingView[];
  readonly selectedMissionId?: CatalogId;
  readonly selectedMission?: MissionListingView;
};

export type WorkListingView = {
  readonly workId: CatalogId;
  readonly label: string;
  readonly rewardMoney: number;
  readonly completesTimeBlock: boolean;
  readonly available: boolean;
  readonly disabledReason?: string;
};

export type WorkCharacterCandidateView = {
  readonly characterId: string;
  readonly label: string;
  readonly available: boolean;
  readonly disabledReason?: string;
};

export type WorkView = {
  readonly kind: 'work';
  readonly route: 'work';
  readonly currentMoney: number;
  readonly visibleWorks: readonly WorkListingView[];
  readonly selectedWorkId?: CatalogId;
  readonly selectedWork?: WorkListingView;
  readonly eligibleCharacters: readonly WorkCharacterCandidateView[];
  readonly selectedCharacterId?: string;
  readonly selectedCharacter?: WorkCharacterCandidateView;
};

export type ShootingTargetView = {
  readonly characterId: string;
  readonly label: string;
  readonly available: boolean;
  readonly disabledReason?: string;
};

export type ShootingSceneView = {
  readonly sceneId: CatalogId;
  readonly label: string;
  readonly revenueMoney: number;
  readonly fanGain: number;
  readonly score: number;
  readonly filmingAmount: number;
  readonly completesTimeBlock: boolean;
  readonly available: boolean;
  readonly disabledReason?: string;
};

export type ShootingView = {
  readonly kind: 'shooting';
  readonly route: 'shooting';
  readonly currentMoney: number;
  readonly visibleTargets: readonly ShootingTargetView[];
  readonly selectedCharacterId?: string;
  readonly selectedTarget?: ShootingTargetView;
  readonly visibleScenes: readonly ShootingSceneView[];
  readonly selectedSceneId?: CatalogId;
  readonly selectedScene?: ShootingSceneView;
  readonly filmingAmount: number;
};

export type TrainingParticipantView = {
  readonly characterId: string;
  readonly label: string;
  readonly available: boolean;
  readonly disabledReason?: string;
};

export type TrainingCommandView = {
  readonly commandId: CatalogId;
  readonly label: string;
  readonly available: boolean;
  readonly disabledReason?: string;
  readonly completesTimeBlock: boolean;
  readonly stimulusPreview: Record<CatalogId, number>;
  readonly paramPreview: Record<CatalogId, { readonly up: number; readonly down: number }>;
};

export type TrainingView = {
  readonly kind: 'training';
  readonly route: 'training';
  readonly currentMoney: number;
  readonly participants: readonly TrainingParticipantView[];
  readonly selectedTargetId?: string;
  readonly selectedTarget?: TrainingParticipantView;
  readonly selectedExecutorId?: string;
  readonly selectedExecutor?: TrainingParticipantView;
  readonly selectedAssistantId?: string;
  readonly selectedAssistant?: TrainingParticipantView;
  readonly visibleCommands: readonly TrainingCommandView[];
  readonly selectedCommandId?: CatalogId;
  readonly selectedCommand?: TrainingCommandView;
  readonly bufferSummary: {
    readonly stimulusTotal: number;
    readonly paramUpTotal: number;
    readonly bodyCostTotal: number;
  };
};

export type GameView =
  | MainMenuView
  | ItemShopView
  | RosterView
  | WardrobeView
  | RecruitView
  | SaveLoadView
  | VisitView
  | MissionView
  | WorkView
  | ShootingView
  | TrainingView;

export type BuiltGameViews = {
  readonly mainMenu?: MainMenuView;
  readonly itemShop?: ItemShopView;
  readonly mission?: MissionView;
  readonly roster?: RosterView;
  readonly wardrobe?: WardrobeView;
  readonly recruit?: RecruitView;
  readonly saveLoad?: SaveLoadView;
  readonly shooting?: ShootingView;
  readonly training?: TrainingView;
  readonly visit?: VisitView;
  readonly work?: WorkView;
};
