import type { CatalogId, CharacterTemplate, GameDefinitions } from '../catalog/types';
import type { CharacterBodyState } from '../domains/body/types';
import type { CharacterEquipmentState } from '../domains/equipment/types';
import type { CharacterId, CharacterRole, CharacterState } from '../domains/people/types';
import type { RelationshipState } from '../domains/social/types';

export type CharacterCreationFailure = {
  readonly code: string;
  readonly message: string;
};

export type CharacterCreationBundle = {
  readonly characters: Record<CharacterId, CharacterState>;
  readonly bodies: Record<CharacterId, CharacterBodyState>;
  readonly equipment: Record<CharacterId, CharacterEquipmentState>;
  readonly relationships: Record<string, RelationshipState>;
  readonly createdCharacterIds: readonly CharacterId[];
};

export type CharacterCreationResult =
  | {
      readonly ok: true;
      readonly bundle: CharacterCreationBundle;
    }
  | {
      readonly ok: false;
      readonly failure: CharacterCreationFailure;
    };

export function characterIdForTemplate(templateId: CatalogId): CharacterId {
  return `character:${templateId}`;
}

function createCharacterRoles(templateId: CatalogId): readonly CharacterRole[] {
  if (templateId === '0') {
    return ['trainer', 'owned'];
  }

  return ['owned'];
}

function createCharacterFromTemplate(template: CharacterTemplate): CharacterState {
  return {
    id: characterIdForTemplate(template.id),
    identity: {
      templateId: template.id,
      displayName: template.displayName,
      callName: template.callName || undefined,
      nickname: template.nickname || undefined,
    },
    attributes: {
      baseStats: {
        current: { ...template.initialState.baseStats },
        maximum: { ...template.initialState.baseStats },
      },
      abilities: { ...template.initialState.abilities },
      traits: Object.fromEntries(template.initialState.talents.map((talentId) => [talentId, true])),
      experiences: { ...template.initialState.experiences },
    },
    flags: {
      lifecycle: {
        sellable: template.id !== '0',
        assistantEligible: template.id !== '0',
        retired: false,
        specialTags: [],
      },
      affection: {},
      family: {
        relativeCharacterIds: [],
        legacyRelationIndexes: {},
      },
      settings: {},
      featureProgress: {},
      legacyFlagsNeedingMapping: { ...template.initialState.characterFlags },
    },
    roles: createCharacterRoles(template.id),
  };
}

function createCharacterBody(): CharacterBodyState {
  return {
    anatomyTags: [],
    bodyStats: {},
    reproduction: {},
    sexualHistory: {},
    appearance: {},
    conditionParams: {},
    trainingResources: {},
    imprints: {},
    contamination: {},
    milestones: {},
    legacyBodyFlagsNeedingMapping: {},
  };
}

function createCharacterEquipment(): CharacterEquipmentState {
  return {
    persistentEquipmentItemIds: [],
    clothing: {},
    piercings: [],
    restrictions: [],
    legacyEquipmentIndexesNeedingMapping: {},
  };
}

function createRelationship(affinity: number): RelationshipState {
  return {
    affinity,
    roles: [],
    historyTags: [],
    legacyRelationIndexesNeedingMapping: {},
  };
}

export function getCharacterTemplate(
  definitions: GameDefinitions,
  templateId: CatalogId,
): CharacterTemplate | undefined {
  return definitions.characters[templateId];
}

export function createCharacterBundle(
  definitions: GameDefinitions,
  templateIds: readonly CatalogId[],
): CharacterCreationResult {
  const characters: Record<CharacterId, CharacterState> = {};
  const bodies: Record<CharacterId, CharacterBodyState> = {};
  const equipment: Record<CharacterId, CharacterEquipmentState> = {};
  const relationships: Record<string, RelationshipState> = {};
  const createdCharacterIds: CharacterId[] = [];

  for (const templateId of templateIds) {
    const template = getCharacterTemplate(definitions, templateId);
    if (!template) {
      return {
        ok: false,
        failure: {
          code: 'missing-character-template',
          message: `캐릭터 원형을 찾을 수 없습니다: ${templateId}`,
        },
      };
    }

    const character = createCharacterFromTemplate(template);
    characters[character.id] = character;
    bodies[character.id] = createCharacterBody();
    equipment[character.id] = createCharacterEquipment();
    createdCharacterIds.push(character.id);

    for (const [targetTemplateId, affinity] of Object.entries(template.initialState.relations)) {
      const targetCharacterId = characterIdForTemplate(targetTemplateId);
      relationships[`${character.id}->${targetCharacterId}`] = createRelationship(affinity);
    }
  }

  return {
    ok: true,
    bundle: {
      characters,
      bodies,
      equipment,
      relationships,
      createdCharacterIds,
    },
  };
}
