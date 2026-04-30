import rawLegacyCatalog from '../../data/catalog/legacy-catalog.json';
import type {
  CatalogId,
  FilmingSceneDefinition,
  GameDefinitions,
  ItemCategory,
  ItemDefinition,
  MissionDefinition,
  RecruitListingDefinition,
  ShopListingDefinition,
  TrainingCommandDefinition,
  WorkDefinition,
} from './types';

type LegacyCatalogArtifact = {
  readonly schemaVersion: string;
  readonly catalog: Omit<GameDefinitions, 'recruitListings' | 'missionDefinitions' | 'workDefinitions' | 'filmingSceneDefinitions'> & {
    readonly recruitListings?: GameDefinitions['recruitListings'];
    readonly missionDefinitions?: GameDefinitions['missionDefinitions'];
    readonly workDefinitions?: GameDefinitions['workDefinitions'];
    readonly filmingSceneDefinitions?: GameDefinitions['filmingSceneDefinitions'];
  };
};

function classifyItemCsvId(itemId: CatalogId): ItemCategory {
  const numericId = Number(itemId);

  if (!Number.isInteger(numericId)) {
    return 'unknown';
  }

  if (numericId >= 100 && numericId <= 199) {
    return 'characterListing';
  }

  if (numericId >= 200 && numericId <= 214) {
    return 'special';
  }

  if (numericId >= 0 && numericId <= 99) {
    return 'tool';
  }

  return 'unknown';
}

function createShopListing(item: ItemDefinition): ShopListingDefinition {
  return {
    id: `item:${item.id}`,
    itemId: item.id,
    listingKind: 'item',
    source: item.source,
    defaultAvailable: true,
  };
}

function isPhaseOneShopItem(item: ItemDefinition): boolean {
  return item.category === 'tool' || item.category === 'consumable';
}

function createRecruitListing(item: ItemDefinition): RecruitListingDefinition {
  return {
    id: `recruit:${item.id}`,
    label: item.label,
    source: item.source,
    basePrice: item.basePrice,
    characterTemplateId: item.source.originalId,
    defaultAvailable: true,
  };
}

const phaseTwoMissionDefinitions: Record<CatalogId, MissionDefinition> = {
  'mission:facility.basicRoom': {
    id: 'mission:facility.basicRoom',
    label: '기본 방 사용 허가 보고',
    source: {
      path: 'docs/GAME_FLOW_MAP.ko.md',
      originalName: '미션 수락/보고 최소 루프',
    },
    description: '조직 사무소에서 기본 방 사용 허가를 받은 뒤 보고한다.',
    tags: ['phase2', 'mission', 'visit', 'facility'],
    defaultAvailable: true,
    rewardMoney: 500,
    requiredWorldUnlockKey: 'facility.basicRoom',
    deadlineWeeks: 4,
  },
};

const phaseTwoWorkDefinitions: Record<CatalogId, WorkDefinition> = {
  'work:reception.basic': {
    id: 'work:reception.basic',
    label: '접객 업무',
    source: {
      path: 'docs/GAME_FLOW_MAP.ko.md',
      originalName: 'RECEPTION_MAIN',
    },
    description: '선택한 인물이 기본 접객 업무를 수행한다.',
    tags: ['phase2', 'work', 'reception'],
    defaultAvailable: true,
    rewardMoney: 200,
    bodyStatDeltas: {
      stamina: -8,
      energy: -5,
    },
    experienceDeltas: {
      'work.reception': 1,
    },
    completesTimeBlock: true,
  },
};

const phaseTwoFilmingSceneDefinitions: Record<CatalogId, FilmingSceneDefinition> = {
  'filming:debut.basic': {
    id: 'filming:debut.basic',
    label: 'Basic debut filming',
    source: {
      path: 'docs/GAME_FLOW_MAP.ko.md',
      originalName: 'AV_LIST / AV_RESULT minimum filming loop',
    },
    description: 'Runs the first filming pass with target selection, scene selection, result calculation, and turn end.',
    tags: ['phase2', 'filming', 'debut'],
    defaultAvailable: true,
    revenueMoney: 300,
    fanGain: 5,
    score: 10,
    filmingAmount: 1,
    bodyStatDeltas: {
      stamina: -12,
      energy: -8,
    },
    experienceDeltas: {
      'filming.basic': 1,
    },
    completesTimeBlock: true,
  },
};

const phaseTwoTrainingCommandDefinitions: Record<CatalogId, TrainingCommandDefinition> = {
  '0': {
    id: '0',
    label: '애무',
    source: {
      path: 'original-game/CSV/Train.csv',
      originalId: '0',
      originalName: '애무',
    },
    description: 'Minimum training command used to connect target/executor selection, calculation buffers, result application, and turn end.',
    tags: ['phase2', 'training', 'minimum-command'],
    defaultAvailable: true,
    requiresTarget: true,
    requiresExecutor: true,
    allowsAssistant: true,
    stimulusDeltas: {
      '0': 12,
    },
    paramDeltas: {
      '0': { up: 10, down: 0 },
      '5': { up: 3, down: 0 },
    },
    bodyStatDeltas: {
      stamina: -4,
      energy: -3,
    },
    resourceDeltas: {
      '0': 1,
    },
    experienceDeltas: {
      '13': 1,
    },
    completesTimeBlock: true,
  },
};

export function normalizeLegacyCatalog(artifact: LegacyCatalogArtifact): GameDefinitions {
  const items: Record<CatalogId, ItemDefinition> = {};
  const recruitListings: Record<CatalogId, RecruitListingDefinition> = {};
  const shopListings: Record<CatalogId, ShopListingDefinition> = {};

  for (const item of Object.values(artifact.catalog.items)) {
    const normalizedItem: ItemDefinition = {
      ...item,
      category: classifyItemCsvId(item.id),
    };

    if (normalizedItem.category === 'characterListing') {
      recruitListings[`recruit:${normalizedItem.id}`] = createRecruitListing(normalizedItem);
    } else {
      items[normalizedItem.id] = normalizedItem;

      if (isPhaseOneShopItem(normalizedItem)) {
        shopListings[`item:${normalizedItem.id}`] = createShopListing(normalizedItem);
      }
    }
  }

  return {
    ...artifact.catalog,
    items,
    recruitListings,
    shopListings: {
      ...artifact.catalog.shopListings,
      ...shopListings,
    },
    trainingCommands: {
      ...artifact.catalog.trainingCommands,
      ...phaseTwoTrainingCommandDefinitions,
    },
    missionDefinitions: {
      ...phaseTwoMissionDefinitions,
      ...(artifact.catalog.missionDefinitions ?? {}),
    },
    workDefinitions: {
      ...phaseTwoWorkDefinitions,
      ...(artifact.catalog.workDefinitions ?? {}),
    },
    filmingSceneDefinitions: {
      ...phaseTwoFilmingSceneDefinitions,
      ...(artifact.catalog.filmingSceneDefinitions ?? {}),
    },
  };
}

export const legacyCatalogArtifact = rawLegacyCatalog as LegacyCatalogArtifact;

export const legacyGameDefinitions: GameDefinitions = normalizeLegacyCatalog(legacyCatalogArtifact);
