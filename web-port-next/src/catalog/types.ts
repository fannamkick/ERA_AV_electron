export type CatalogId = string;

export type CatalogSource = {
  readonly path: string;
  readonly originalId?: string;
  readonly originalName?: string;
};

export type CatalogDefinition = {
  readonly id: CatalogId;
  readonly label: string;
  readonly source: CatalogSource;
  readonly description?: string;
  readonly tags: readonly string[];
};

export type StatDefinition = CatalogDefinition;

export type ItemCategory = 'tool' | 'consumable' | 'unlock' | 'characterListing' | 'service' | 'special' | 'unknown';

export type ItemDefinition = CatalogDefinition & {
  readonly category: ItemCategory;
  readonly basePrice?: number;
};

export type ShopListingDefinition = {
  readonly id: CatalogId;
  readonly itemId: CatalogId;
  readonly listingKind: 'item' | 'character' | 'service' | 'unlock';
  readonly source: CatalogSource;
  readonly defaultAvailable: boolean;
};

export type RecruitListingDefinition = {
  readonly id: CatalogId;
  readonly label: string;
  readonly source: CatalogSource;
  readonly basePrice?: number;
  readonly characterTemplateId?: CatalogId;
  readonly defaultAvailable: boolean;
  readonly repeatable?: boolean;
  readonly maxRecruitCount?: number;
};

export type MissionDefinition = CatalogDefinition & {
  readonly defaultAvailable: boolean;
  readonly rewardMoney: number;
  readonly requiredWorldUnlockKey?: string;
  readonly deadlineWeeks?: number;
};

export type WorkDefinition = CatalogDefinition & {
  readonly defaultAvailable: boolean;
  readonly rewardMoney: number;
  readonly bodyStatDeltas: Record<string, number>;
  readonly experienceDeltas: Record<CatalogId, number>;
  readonly traitFlags?: Record<CatalogId, boolean | number>;
  readonly workFlagValues?: Record<string, boolean | number | string>;
  readonly workFlagDeltas?: Record<string, number>;
  readonly economyFlagValues?: Record<string, boolean | number | string>;
  readonly completesTimeBlock: boolean;
};

export type FilmingSceneDefinition = CatalogDefinition & {
  readonly defaultAvailable: boolean;
  readonly revenueMoney: number;
  readonly fanGain: number;
  readonly score: number;
  readonly filmingAmount: number;
  readonly bodyStatDeltas: Record<string, number>;
  readonly experienceDeltas: Record<CatalogId, number>;
  readonly completesTimeBlock: boolean;
};

export type MainMenuOptionDefinition = CatalogDefinition & {
  readonly menuCode: string;
  readonly actionTarget: string;
  readonly actionCondition?: string;
  readonly sourceEvidenceId: string;
  readonly actionId?: string;
  readonly routeId?: string;
  readonly defaultEnabled: boolean;
  readonly disabledReason?: string;
  readonly ownerMilestone: string;
};

export type TrainingCommandDefinition = CatalogDefinition & {
  readonly defaultAvailable?: boolean;
  readonly requiresTarget?: boolean;
  readonly requiresExecutor?: boolean;
  readonly allowsAssistant?: boolean;
  readonly stimulusDeltas?: Record<CatalogId, number>;
  readonly paramDeltas?: Record<CatalogId, { readonly up: number; readonly down: number }>;
  readonly bodyStatDeltas?: Record<string, number>;
  readonly resourceDeltas?: Record<CatalogId, number>;
  readonly experienceDeltas?: Record<CatalogId, number>;
  readonly completesTimeBlock?: boolean;
};

export type ThresholdTable = {
  readonly id: CatalogId;
  readonly values: readonly number[];
  readonly source: CatalogSource;
};

export type CharacterTemplate = {
  readonly id: CatalogId;
  readonly displayName: string;
  readonly callName?: string;
  readonly nickname?: string;
  readonly source: CatalogSource;
  readonly baseStatIds: readonly CatalogId[];
  readonly abilityIds: readonly CatalogId[];
  readonly talentIds: readonly CatalogId[];
  readonly experienceIds: readonly CatalogId[];
  readonly initialState: {
    readonly baseStats: Record<CatalogId, number>;
    readonly abilities: Record<CatalogId, number>;
    readonly experiences: Record<CatalogId, number>;
    readonly talents: readonly CatalogId[];
    readonly characterFlags: Record<CatalogId, number>;
    readonly characterTexts: Record<CatalogId, string>;
    readonly relations: Record<CatalogId, number>;
  };
};

export type GameCatalog = {
  readonly characters: Record<CatalogId, CharacterTemplate>;
  readonly baseStats: Record<CatalogId, StatDefinition>;
  readonly abilities: Record<CatalogId, StatDefinition>;
  readonly talents: Record<CatalogId, StatDefinition>;
  readonly experiences: Record<CatalogId, StatDefinition>;
  readonly marks: Record<CatalogId, StatDefinition>;
  readonly trainingParams: Record<CatalogId, StatDefinition>;
  readonly trainingCommands: Record<CatalogId, TrainingCommandDefinition>;
  readonly sourceDefinitions: Record<CatalogId, StatDefinition>;
  readonly characterTextDefinitions: Record<CatalogId, StatDefinition>;
  readonly legacyCharacterFlagDefinitions: Record<CatalogId, StatDefinition>;
  readonly items: Record<CatalogId, ItemDefinition>;
  readonly recruitListings: Record<CatalogId, RecruitListingDefinition>;
  readonly shopListings: Record<CatalogId, ShopListingDefinition>;
  readonly missionDefinitions: Record<CatalogId, MissionDefinition>;
  readonly workDefinitions: Record<CatalogId, WorkDefinition>;
  readonly filmingSceneDefinitions: Record<CatalogId, FilmingSceneDefinition>;
  readonly mainMenuOptions: Record<CatalogId, MainMenuOptionDefinition>;
  readonly thresholds: Record<CatalogId, ThresholdTable>;
};

export type GameDefinitions = GameCatalog;

export const emptyCatalog: GameCatalog = {
  characters: {},
  baseStats: {},
  abilities: {},
  talents: {},
  experiences: {},
  marks: {},
  trainingParams: {},
  trainingCommands: {},
  sourceDefinitions: {},
  characterTextDefinitions: {},
  legacyCharacterFlagDefinitions: {},
  items: {},
  recruitListings: {},
  shopListings: {},
  missionDefinitions: {},
  workDefinitions: {},
  filmingSceneDefinitions: {},
  mainMenuOptions: {},
  thresholds: {},
};

export const emptyDefinitions: GameDefinitions = emptyCatalog;
