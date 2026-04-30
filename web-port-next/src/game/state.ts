import { legacyGameDefinitions } from '../catalog/legacyCatalog';
import type { GameCatalog } from '../catalog/types';
import { initialBodyState, type BodyState } from '../domains/body/types';
import { initialEconomyState, type EconomyState } from '../domains/economy/types';
import { initialEquipmentState, type EquipmentState } from '../domains/equipment/types';
import { initialFeatureState, type FeatureState } from '../domains/featureState/types';
import { initialFeatureSessionState, type FeatureSessionState } from '../domains/featureSession/types';
import { initialInteractionSessionState, type InteractionSessionState } from '../domains/interaction/types';
import { initialInventoryState, type InventoryState } from '../domains/inventory/types';
import { initialMetaState, type MetaState } from '../domains/meta/types';
import { initialMissionSessionState, type MissionSessionState } from '../domains/missionSession/types';
import { initialMissionState, type MissionState } from '../domains/mission/types';
import { initialPeopleState, type PeopleState } from '../domains/people/types';
import { initialRecruitSessionState, type RecruitSessionState } from '../domains/recruit/types';
import { initialRunState, type RunState } from '../domains/run/types';
import { initialSaveLoadSessionState, initialSaveState, type SaveLoadSessionState, type SaveState } from '../domains/save/types';
import { initialScriptFrameState, type ScriptFrameState } from '../domains/script/types';
import { initialSettingsState, type SettingsState } from '../domains/settings/types';
import { initialShopSessionState, initialShopState, type ShopSessionState, type ShopState } from '../domains/shop/types';
import { initialShootingSessionState, type ShootingSessionState } from '../domains/shootingSession/types';
import { initialSocialState, type SocialState } from '../domains/social/types';
import { initialTextState, type TextState } from '../domains/text/types';
import { initialUiSessionState, type UiSessionState } from '../domains/ui/types';
import { initialVisitSessionState, type VisitSessionState } from '../domains/visit/types';
import { initialWorldState, type WorldState } from '../domains/world/types';
import { initialWorkSessionState, type WorkSessionState } from '../domains/workSession/types';
import { initialWorkState, type WorkState } from '../domains/work/types';
import type { BuiltGameViews } from './views';

export type GameRuntimeMetaState = {
  readonly saveVersion: 1;
  readonly createdBy: 'web-port-next';
};

export type GameState = {
  readonly runtime: GameRuntimeMetaState;
  readonly save: SaveState;
  readonly settings: SettingsState;
  readonly meta: MetaState;
  readonly run: RunState;
  readonly world: WorldState;
  readonly mission: MissionState;
  readonly people: PeopleState;
  readonly social: SocialState;
  readonly body: BodyState;
  readonly text: TextState;
  readonly economy: EconomyState;
  readonly inventory: InventoryState;
  readonly equipment: EquipmentState;
  readonly shop: ShopState;
  readonly work: WorkState;
  readonly featureState: FeatureState;
};

export type GameSession = {
  readonly featureSession: FeatureSessionState;
  readonly interaction: InteractionSessionState;
  readonly mission: MissionSessionState;
  readonly recruit: RecruitSessionState;
  readonly saveLoad: SaveLoadSessionState;
  readonly shop: ShopSessionState;
  readonly shooting: ShootingSessionState;
  readonly script: ScriptFrameState;
  readonly ui: UiSessionState;
  readonly visit: VisitSessionState;
  readonly work: WorkSessionState;
};

export type GameData = {
  readonly definitions: GameCatalog;
  readonly save: GameState;
  readonly session: GameSession;
  readonly views: BuiltGameViews;
};

export const initialGameCatalog: GameCatalog = legacyGameDefinitions;

export const initialGameState: GameState = {
  runtime: {
    saveVersion: 1,
    createdBy: 'web-port-next',
  },
  save: initialSaveState,
  settings: initialSettingsState,
  meta: initialMetaState,
  run: initialRunState,
  world: initialWorldState,
  mission: initialMissionState,
  people: initialPeopleState,
  social: initialSocialState,
  body: initialBodyState,
  text: initialTextState,
  economy: initialEconomyState,
  inventory: initialInventoryState,
  equipment: initialEquipmentState,
  shop: initialShopState,
  work: initialWorkState,
  featureState: initialFeatureState,
};

export const initialGameSession: GameSession = {
  featureSession: initialFeatureSessionState,
  interaction: initialInteractionSessionState,
  mission: initialMissionSessionState,
  recruit: initialRecruitSessionState,
  saveLoad: initialSaveLoadSessionState,
  shop: initialShopSessionState,
  shooting: initialShootingSessionState,
  script: initialScriptFrameState,
  ui: initialUiSessionState,
  visit: initialVisitSessionState,
  work: initialWorkSessionState,
};

export function createInitialGameState(): GameState {
  return initialGameState;
}

export function createInitialGameSession(): GameSession {
  return initialGameSession;
}

export function createInitialGameData(): GameData {
  return {
    definitions: initialGameCatalog,
    save: createInitialGameState(),
    session: createInitialGameSession(),
    views: {},
  };
}
