import type { CharacterTemplate } from '../catalog/types';
import type { GameState } from '../game/state';
import type { WardrobeCharacterView, WardrobeView } from '../game/views';

type LegacyFlagOwner =
  | 'body'
  | 'equipment'
  | 'people'
  | 'social'
  | 'mission'
  | 'work'
  | 'meta'
  | 'run'
  | 'economy'
  | 'filming'
  | 'definition';

const cflagOwnerIds: Record<LegacyFlagOwner, readonly string[]> = {
  mission: ['1', '17', '18', '25', '111', '167', '606', '619', '621', '633', '644', '660', '661', '662', '663', '664', '669', '704', '750', '758', '761', '770', '801', '827', '837'],
  body: ['7', '8', '10', '20', '30', '31', '32', '33', '36', '70', '74', '81', '82', '97', '99', '100', '101', '102', '106', '107', '109', '110', '112', '115', '121', '122', '123', '124', '136', '138', '165', '166', '580', '604', '608', '610', '617', '618', '620', '623', '624', '627', '628', '629', '630', '645', '651', '670', '672', '690', '700', '701', '703', '709', '712', '720', '722', '760', '825', '826', '835', '836'],
  work: ['12', '13', '28', '47', '50', '51', '52', '53', '54', '55', '103', '104', '105', '130', '131', '133', '602', '607'],
  meta: ['2', '6', '15', '16', '132', '150', '151', '152', '153', '154', '155', '156', '157', '158', '160', '161', '162', '163', '164', '609', '611', '616', '622', '631', '730', '820', '821', '822', '823', '824', '830', '831', '832', '833', '834', '850', '900'],
  run: ['14', '34', '140', '141', '613', '634', '635', '680', '681', '682', '683', '691', '692', '694'],
  equipment: ['3', '4', '5', '26', '40', '41', '42', '43', '44', '45', '46', '48', '49', '170', '171', '173', '174', '175', '176', '177', '178', '179', '180', '600', '601', '603', '614'],
  definition: ['172', '625', '650'],
  people: ['21', '22', '23', '24', '60', '65', '71', '671', '684'],
  economy: ['401'],
  filming: ['641', '642', '643', '731', '732', '733', '734'],
  social: [],
};

export const legacyCflagOwnerById: ReadonlyMap<string, LegacyFlagOwner> = new Map(
  Object.entries(cflagOwnerIds).flatMap(([owner, ids]) => ids.map((id) => [id, owner as LegacyFlagOwner])),
);

const clothingFlagIds = new Set(['40', '41', '42', '43', '44', '45', '46', '48', '49', '170', '171', '173', '174', '175', '176', '177', '600', '601', '603']);
const affectionFlagIds = new Set(['2']);
const familyFlagIds = new Set(['21', '22', '23', '24']);
const settingsFlagIds = new Set(['8', '20', '26']);
const socialProgressFlagIds = new Set(['619', '620', '621', '622', '623', '624']);

export type SplitLegacyCharacterFlags = {
  readonly bodyConditionFlags: Record<string, number>;
  readonly equipmentAvailabilityFlags: Record<string, number>;
  readonly equipmentClothing: Record<string, number>;
  readonly peopleAffection: Record<string, number>;
  readonly peopleFamilyRelations: Record<string, number>;
  readonly peopleSettings: Record<string, boolean | number | string>;
  readonly peopleFeatureProgress: Record<string, boolean | number | string>;
  readonly socialNtrProgress: Record<string, boolean | number | string>;
  readonly socialPartnerProgress: Record<string, boolean | number | string>;
};

function ownerForFlag(flagId: string): LegacyFlagOwner {
  return legacyCflagOwnerById.get(flagId) ?? 'people';
}

function prefixedFlag(owner: LegacyFlagOwner, flagId: string): string {
  return `${owner}.flag_${flagId}`;
}

export function splitLegacyCharacterFlags(template: CharacterTemplate): SplitLegacyCharacterFlags {
  const result: SplitLegacyCharacterFlags = {
    bodyConditionFlags: {},
    equipmentAvailabilityFlags: {},
    equipmentClothing: {},
    peopleAffection: {},
    peopleFamilyRelations: {},
    peopleSettings: {},
    peopleFeatureProgress: {},
    socialNtrProgress: {},
    socialPartnerProgress: {},
  };

  for (const [flagId, value] of Object.entries(template.initialState.characterFlags)) {
    const owner = ownerForFlag(flagId);

    if (owner === 'body') {
      result.bodyConditionFlags[flagId] = value;
      continue;
    }

    if (owner === 'equipment') {
      result.equipmentAvailabilityFlags[flagId] = value;
      if (clothingFlagIds.has(flagId)) result.equipmentClothing[flagId] = value;
      continue;
    }

    if (affectionFlagIds.has(flagId)) {
      result.peopleAffection[flagId] = value;
      continue;
    }

    if (familyFlagIds.has(flagId)) {
      result.peopleFamilyRelations[flagId] = value;
      continue;
    }

    if (settingsFlagIds.has(flagId)) {
      result.peopleSettings[flagId] = value;
      continue;
    }

    if (socialProgressFlagIds.has(flagId)) {
      result.socialNtrProgress[flagId] = value;
      result.socialPartnerProgress[flagId] = value;
      continue;
    }

    if (owner !== 'definition') {
      result.peopleFeatureProgress[prefixedFlag(owner, flagId)] = value;
    }
  }

  return result;
}

export function buildWardrobeView(state: GameState): WardrobeView {
  const characters = Object.values(state.people.characters).sort((left, right) => left.id.localeCompare(right.id));
  const entries: WardrobeCharacterView[] = characters.map((character) => {
    const equipment = state.equipment.byCharacterId[character.id];
    return {
      characterId: character.id,
      label: character.identity.displayName,
      clothing: equipment?.clothing ?? {},
      availabilityFlags: equipment?.availabilityFlags ?? {},
      clothingFlagCount: Object.keys(equipment?.clothing ?? {}).length,
      availabilityFlagCount: Object.keys(equipment?.availabilityFlags ?? {}).length,
    };
  });

  return {
    kind: 'wardrobe',
    route: 'wardrobe',
    entries,
  };
}

export type WardrobeToggleResult =
  | { readonly ok: true; readonly state: GameState; readonly message: string }
  | { readonly ok: false; readonly failure: { readonly code: string; readonly message: string } };

export function toggleWardrobeClothing(state: GameState, characterId: string, flagId: string): WardrobeToggleResult {
  const character = state.people.characters[characterId];
  const equipment = state.equipment.byCharacterId[characterId];

  if (!character || !equipment) {
    return {
      ok: false,
      failure: {
        code: 'wardrobe-character-missing',
        message: `Wardrobe character is missing: ${characterId}`,
      },
    };
  }

  if (!(flagId in equipment.clothing) && !(flagId in equipment.availabilityFlags)) {
    return {
      ok: false,
      failure: {
        code: 'wardrobe-flag-missing',
        message: `Wardrobe flag is not owned by equipment/clothing: ${flagId}`,
      },
    };
  }

  const current = equipment.clothing[flagId] ?? equipment.availabilityFlags[flagId] ?? 0;
  const nextValue = current === 0 || current === false ? 1 : 0;

  return {
    ok: true,
    state: {
      ...state,
      equipment: {
        byCharacterId: {
          ...state.equipment.byCharacterId,
          [characterId]: {
            ...equipment,
            clothing: {
              ...equipment.clothing,
              [flagId]: nextValue,
            },
          },
        },
      },
    },
    message: `${character.identity.displayName} wardrobe flag ${flagId} set to ${nextValue}.`,
  };
}
