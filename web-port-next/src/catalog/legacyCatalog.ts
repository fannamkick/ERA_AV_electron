import rawLegacyCatalog from '../../data/catalog/legacy-catalog.json';
import { itemShopPurchaseItemIdSet } from './shopItemIds';
import {
  characterTemplateIdForRecruitListingItemId,
  isRepeatableRecruitListingItemId,
  recruitAdvertisementMaxCount,
} from './recruitListingIds';
import rawErbDerivedDefinitions from '../../data/coverage/erb-derived-definitions.json';
import type {
  CatalogId,
  FilmingSceneDefinition,
  GameDefinitions,
  ItemCategory,
  ItemDefinition,
  MainMenuOptionDefinition,
  MissionDefinition,
  RecruitListingDefinition,
  ShopListingDefinition,
  TrainingCommandDefinition,
  WorkDefinition,
} from './types';
import { workSourceDefinitionId, workSourceGroups } from './workSourceGroups';

type LegacyCatalogArtifact = {
  readonly schemaVersion: string;
  readonly catalog: Omit<
    GameDefinitions,
    'recruitListings' | 'missionDefinitions' | 'workDefinitions' | 'filmingSceneDefinitions' | 'mainMenuOptions'
  > & {
    readonly recruitListings?: GameDefinitions['recruitListings'];
    readonly missionDefinitions?: GameDefinitions['missionDefinitions'];
    readonly workDefinitions?: GameDefinitions['workDefinitions'];
    readonly filmingSceneDefinitions?: GameDefinitions['filmingSceneDefinitions'];
    readonly mainMenuOptions?: GameDefinitions['mainMenuOptions'];
  };
};

type ErbDerivedDefinitionsArtifact = {
  readonly rows: readonly {
    readonly definitionKey: string;
    readonly sourceId: string;
    readonly sourceName: string;
    readonly sourceFile: string;
    readonly sourceLine?: number;
    readonly sourceEvidenceId: string;
    readonly menuCode?: string;
    readonly displayText?: string;
    readonly actionTarget?: string;
    readonly actionCondition?: string;
  }[];
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
  return itemShopPurchaseItemIdSet.has(item.id);
}

function createRecruitListing(item: ItemDefinition): RecruitListingDefinition {
  const repeatable = isRepeatableRecruitListingItemId(item.source.originalId ?? item.id);

  return {
    id: `recruit:${item.id}`,
    label: item.label,
    source: item.source,
    basePrice: item.basePrice,
    characterTemplateId: characterTemplateIdForRecruitListingItemId(item.source.originalId ?? item.id),
    defaultAvailable: true,
    repeatable,
    maxRecruitCount: repeatable ? recruitAdvertisementMaxCount : 1,
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

function workRewardForIndex(index: number, kind: string): number {
  const base = kind === 'special' ? 420 : kind === 'brothel' || kind === 'brothel-menu' ? 320 : 240;
  return base + index * 5;
}

function createErbWorkDefinitions(): Record<CatalogId, WorkDefinition> {
  const artifact = rawErbDerivedDefinitions as ErbDerivedDefinitionsArtifact;
  const rows = artifact.rows.filter((row) => row.definitionKey === 'workDefinitions');
  const result: Record<CatalogId, WorkDefinition> = {};

  for (const [index, row] of rows.entries()) {
    const id = `work:${row.sourceId}`;
    result[id] = {
      id,
      label: row.displayText ?? row.sourceName,
      source: {
        path: row.sourceFile,
        originalId: row.sourceId,
        originalName: row.sourceName,
      },
      description: `ERB-derived work listing ${row.sourceId}.`,
      tags: ['work', 'arbeit', 'erb-derived', `source-evidence:${row.sourceEvidenceId}`],
      defaultAvailable: true,
      rewardMoney: workRewardForIndex(index, 'arbeit'),
      bodyStatDeltas: {
        stamina: -6,
        energy: -4,
      },
      experienceDeltas: {
        'work.arbeit': 1,
      },
      completesTimeBlock: true,
    };
  }

  return result;
}

function createSourceLabelWorkDefinitions(): Record<CatalogId, WorkDefinition> {
  const result: Record<CatalogId, WorkDefinition> = {};
  let index = 0;

  for (const group of workSourceGroups) {
    for (const label of group.labels) {
      const id = workSourceDefinitionId(group.sourceFile, label);
      result[id] = {
        id,
        label: `${group.sourceFile.replace(/\.ERB$/u, '')} ${label}`,
        source: {
          path: group.sourcePath,
          originalId: label,
          originalName: label,
        },
        description: `Source-label work branch from ${group.sourceFile}.`,
        tags: ['work', group.kind, 'source-label', group.sourceFile, label],
        defaultAvailable: true,
        rewardMoney: workRewardForIndex(index, group.kind),
        bodyStatDeltas: {
          stamina: group.kind === 'special' ? -10 : -7,
          energy: group.kind === 'special' ? -7 : -5,
        },
        experienceDeltas: {
          [`work.${group.kind}`]: 1,
        },
        completesTimeBlock: true,
      };
      index += 1;
    }
  }

  return result;
}

function createErbFilmingSceneDefinitions(): Record<CatalogId, FilmingSceneDefinition> {
  const artifact = rawErbDerivedDefinitions as ErbDerivedDefinitionsArtifact;
  const rows = artifact.rows.filter((row) => row.definitionKey === 'filmingSceneDefinitions');
  const result: Record<CatalogId, FilmingSceneDefinition> = {};

  for (const [index, row] of rows.entries()) {
    const id = row.sourceId;
    result[id] = {
      id,
      label: row.displayText ?? row.sourceName,
      source: {
        path: row.sourceFile,
        originalId: row.sourceId,
        originalName: row.sourceName,
      },
      description: `ERB-derived filming scene ${row.sourceId}.`,
      tags: ['filming', 'scene-definition', 'erb-derived', `source-evidence:${row.sourceEvidenceId}`],
      defaultAvailable: true,
      revenueMoney: 280 + index * 40,
      fanGain: 4 + index,
      score: 8 + index * 2,
      filmingAmount: 1 + Math.floor(index / 2),
      bodyStatDeltas: {
        stamina: -8 - index,
        energy: -5 - index,
      },
      experienceDeltas: {
        'filming.scene': 1,
      },
      completesTimeBlock: true,
    };
  }

  return result;
}

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

const mainMenuRouteContracts: Record<
  string,
  Pick<MainMenuOptionDefinition, 'actionId' | 'routeId' | 'defaultEnabled' | 'disabledReason' | 'ownerMilestone'>
> = {
  '100': { actionId: 'main/openTraining', routeId: 'training', defaultEnabled: true, ownerMilestone: 'M40' },
  '101': { actionId: 'main/openRecruit', routeId: 'recruit', defaultEnabled: true, ownerMilestone: 'M31' },
  '102': { actionId: 'main/openItemShop', routeId: 'itemShop', defaultEnabled: true, ownerMilestone: 'M29' },
  '103': { actionId: 'main/openWork', routeId: 'work', defaultEnabled: true, ownerMilestone: 'M37' },
  '104': { actionId: 'main/openShooting', routeId: 'shooting', defaultEnabled: true, ownerMilestone: 'M39' },
  '105': { actionId: 'turn/end', routeId: 'mainMenu', defaultEnabled: true, ownerMilestone: 'M35' },
  '108': { actionId: 'main/openWardrobe', routeId: 'wardrobe', defaultEnabled: true, ownerMilestone: 'M34' },
  '109': { actionId: 'main/openVisit', routeId: 'visit', defaultEnabled: true, ownerMilestone: 'M36' },
  '111': { actionId: 'main/openRoster', routeId: 'roster', defaultEnabled: true, ownerMilestone: 'M32' },
  '112': { defaultEnabled: false, disabledReason: 'M45 ability-up owner must implement this route.', ownerMilestone: 'M45' },
  '113': { defaultEnabled: false, disabledReason: 'M32 character identity owner must implement sorting.', ownerMilestone: 'M32' },
  '115': { defaultEnabled: false, disabledReason: 'M49 remaining-feature owner must classify and implement this route.', ownerMilestone: 'M49' },
  '116': { defaultEnabled: false, disabledReason: 'M47 world/event owner must implement this route.', ownerMilestone: 'M47' },
  '120': { actionId: 'main/openMission', routeId: 'mission', defaultEnabled: true, ownerMilestone: 'M46' },
  '150': { defaultEnabled: false, disabledReason: 'M48 ending/meta owner must implement this route.', ownerMilestone: 'M48' },
  '200': { actionId: 'main/openSaveLoad', routeId: 'saveLoad', defaultEnabled: true, ownerMilestone: 'M50' },
  '300': { actionId: 'main/openSaveLoad', routeId: 'saveLoad', defaultEnabled: true, ownerMilestone: 'M50' },
  '400': { defaultEnabled: false, disabledReason: 'M49 settings owner must implement this route.', ownerMilestone: 'M49' },
  '500': { defaultEnabled: false, disabledReason: 'M48 achievement/meta owner must implement this route.', ownerMilestone: 'M48' },
  '600': { defaultEnabled: false, disabledReason: 'M49 information owner must implement this route.', ownerMilestone: 'M49' },
  '700': { actionId: 'main/openRoster', routeId: 'roster', defaultEnabled: true, ownerMilestone: 'M32' },
  '750': { defaultEnabled: false, disabledReason: 'M49 tips/help owner must implement this route.', ownerMilestone: 'M49' },
  '888': { defaultEnabled: false, disabledReason: 'M49 debug owner must implement this route.', ownerMilestone: 'M49' },
  '8826': { defaultEnabled: false, disabledReason: 'M49 debug owner must implement this hidden route.', ownerMilestone: 'M49' },
};

function createMainMenuOptions(): Record<CatalogId, MainMenuOptionDefinition> {
  const artifact = rawErbDerivedDefinitions as ErbDerivedDefinitionsArtifact;
  const result: Record<CatalogId, MainMenuOptionDefinition> = {};

  for (const row of artifact.rows.filter((item) => item.definitionKey === 'mainMenuOptions')) {
    const menuCode = row.menuCode ?? row.sourceId.replace(/^main-menu:/, '');
    const contract = mainMenuRouteContracts[menuCode] ?? {
      defaultEnabled: false,
      disabledReason: 'M49 remaining-feature owner must classify this route.',
      ownerMilestone: 'M49',
    };
    result[menuCode] = {
      id: menuCode,
      label: row.displayText ?? row.sourceName,
      source: {
        path: row.sourceFile,
        originalId: row.sourceId,
        originalName: row.sourceName,
      },
      tags: ['main-menu', `M28:${contract.ownerMilestone}`],
      menuCode,
      actionTarget: row.actionTarget ?? '',
      actionCondition: row.actionCondition,
      sourceEvidenceId: row.sourceEvidenceId,
      ...contract,
    };
  }

  return Object.fromEntries(Object.entries(result).sort(([a], [b]) => Number(a) - Number(b)));
}

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
      ...createErbWorkDefinitions(),
      ...createSourceLabelWorkDefinitions(),
      ...(artifact.catalog.workDefinitions ?? {}),
    },
    filmingSceneDefinitions: {
      ...phaseTwoFilmingSceneDefinitions,
      ...createErbFilmingSceneDefinitions(),
      ...(artifact.catalog.filmingSceneDefinitions ?? {}),
    },
    mainMenuOptions: {
      ...createMainMenuOptions(),
      ...(artifact.catalog.mainMenuOptions ?? {}),
    },
  };
}

export const legacyCatalogArtifact = rawLegacyCatalog as LegacyCatalogArtifact;

export const legacyGameDefinitions: GameDefinitions = normalizeLegacyCatalog(legacyCatalogArtifact);
