import type {
  CatalogId,
  FilmingSceneDefinition,
  GameDefinitions,
  ItemDefinition,
  MissionDefinition,
  RecruitListingDefinition,
  ShopListingDefinition,
  TrainingCommandDefinition,
  WorkDefinition,
} from './types';

export type DefinitionLookupFailure = {
  readonly code: 'definition-not-found';
  readonly id: CatalogId;
  readonly definitionKind: 'item' | 'shopListing' | 'recruitListing' | 'mission' | 'work' | 'filmingScene' | 'trainingCommand';
  readonly message: string;
};

export type DefinitionLookupResult<TDefinition> =
  | {
      readonly ok: true;
      readonly definition: TDefinition;
    }
  | {
      readonly ok: false;
      readonly failure: DefinitionLookupFailure;
    };

function missingDefinition(
  definitionKind: DefinitionLookupFailure['definitionKind'],
  id: CatalogId,
): DefinitionLookupFailure {
  return {
    code: 'definition-not-found',
    definitionKind,
    id,
    message: `${definitionKind} definition not found: ${id}`,
  };
}

export function getItemDefinition(
  definitions: GameDefinitions,
  itemId: CatalogId,
): DefinitionLookupResult<ItemDefinition> {
  const definition = definitions.items[itemId];

  if (!definition) {
    return {
      ok: false,
      failure: missingDefinition('item', itemId),
    };
  }

  return {
    ok: true,
    definition,
  };
}

export function getShopListingDefinition(
  definitions: GameDefinitions,
  listingId: CatalogId,
): DefinitionLookupResult<ShopListingDefinition> {
  const definition = definitions.shopListings[listingId];

  if (!definition) {
    return {
      ok: false,
      failure: missingDefinition('shopListing', listingId),
    };
  }

  return {
    ok: true,
    definition,
  };
}

export function getRecruitListingDefinition(
  definitions: GameDefinitions,
  listingId: CatalogId,
): DefinitionLookupResult<RecruitListingDefinition> {
  const definition = definitions.recruitListings[listingId];

  if (!definition) {
    return {
      ok: false,
      failure: missingDefinition('recruitListing', listingId),
    };
  }

  return {
    ok: true,
    definition,
  };
}

export function getMissionDefinition(
  definitions: GameDefinitions,
  missionId: CatalogId,
): DefinitionLookupResult<MissionDefinition> {
  const definition = definitions.missionDefinitions[missionId];

  if (!definition) {
    return {
      ok: false,
      failure: missingDefinition('mission', missionId),
    };
  }

  return {
    ok: true,
    definition,
  };
}

export function getWorkDefinition(
  definitions: GameDefinitions,
  workId: CatalogId,
): DefinitionLookupResult<WorkDefinition> {
  const definition = definitions.workDefinitions[workId];

  if (!definition) {
    return {
      ok: false,
      failure: missingDefinition('work', workId),
    };
  }

  return {
    ok: true,
    definition,
  };
}

export function getFilmingSceneDefinition(
  definitions: GameDefinitions,
  sceneId: CatalogId,
): DefinitionLookupResult<FilmingSceneDefinition> {
  const definition = definitions.filmingSceneDefinitions[sceneId];

  if (!definition) {
    return {
      ok: false,
      failure: missingDefinition('filmingScene', sceneId),
    };
  }

  return {
    ok: true,
    definition,
  };
}

export function getTrainingCommandDefinition(
  definitions: GameDefinitions,
  commandId: CatalogId,
): DefinitionLookupResult<TrainingCommandDefinition> {
  const definition = definitions.trainingCommands[commandId];

  if (!definition) {
    return {
      ok: false,
      failure: missingDefinition('trainingCommand', commandId),
    };
  }

  return {
    ok: true,
    definition,
  };
}
