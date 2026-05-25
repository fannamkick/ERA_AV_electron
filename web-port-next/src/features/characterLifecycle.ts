import type { CharacterId, CharacterRole, CharacterState } from '../domains/people/types';
import type { GameState } from '../game/state';

export type SaleEligibilityRank = 0 | 1 | 2;

export type CharacterLifecycleFailure = {
  readonly code: string;
  readonly message: string;
};

export type CharacterLifecycleResult =
  | {
      readonly ok: true;
      readonly state: GameState;
    }
  | {
      readonly ok: false;
      readonly failure: CharacterLifecycleFailure;
    };

function numericRecordValue(record: Record<string, number> | undefined, id: string): number {
  return record?.[id] ?? 0;
}

function mixedRecordNumber(record: Record<string, boolean | number | string> | undefined, id: string): number {
  const value = record?.[id];
  if (typeof value === 'number') return value;
  if (value === true) return 1;
  return 0;
}

function hasTrait(character: CharacterState, traitId: string): boolean {
  const value = character.attributes.traits[traitId];
  return value === true || (typeof value === 'number' && value !== 0);
}

function ability(character: CharacterState, abilityId: string): number {
  return numericRecordValue(character.attributes.abilities, abilityId);
}

function experience(character: CharacterState, experienceId: string): number {
  return numericRecordValue(character.attributes.experiences, experienceId);
}

function currentBase(character: CharacterState, baseId: string): number {
  return numericRecordValue(character.attributes.baseStats.current, baseId);
}

function legacyFeatureFlag(character: CharacterState, owner: string, flagId: string): number {
  return mixedRecordNumber(character.flags.featureProgress, `${owner}.flag_${flagId}`);
}

export function legacySaleEligibilityRank(character: CharacterState): SaleEligibilityRank {
  return Math.max(0, Math.min(2, legacyFeatureFlag(character, 'mission', '1'))) as SaleEligibilityRank;
}

export function computeSellAssistantEligibilityRank(character: CharacterState): SaleEligibilityRank {
  if (character.identity.templateId === '0') return 0;
  if (hasTrait(character, '199')) return 0;
  if (ability(character, '10') + ability(character, '11') < 6) return 0;
  if (ability(character, '0') < 3 && ability(character, '1') < 3 && ability(character, '2') < 3 && ability(character, '3') < 3) return 0;
  if (ability(character, '10') < 4 && (hasTrait(character, '11') || hasTrait(character, '12'))) return 0;
  if (ability(character, '11') < 4 && (hasTrait(character, '20') || hasTrait(character, '32') || hasTrait(character, '34'))) return 0;

  const canRetire =
    ((ability(character, '12') >= 3 && ability(character, '16') >= 3) ||
      (ability(character, '17') >= 3 && ability(character, '31') >= 2) ||
      ability(character, '21') >= 3 ||
      ability(character, '0') + ability(character, '1') + ability(character, '2') + ability(character, '3') >= 13 ||
      ability(character, '10') >= 5 ||
      ability(character, '11') >= 5) &&
    hasTrait(character, '400');

  if (!canRetire) return 0;

  const canAssist =
    (((ability(character, '10') >= 3 &&
      ability(character, '11') >= 3 &&
      ability(character, '12') >= 3 &&
      ability(character, '0') >= 3 &&
      (ability(character, '22') >= 3 || ability(character, '23') >= 3)) ||
      (ability(character, '10') >= 5 && ability(character, '11') >= 4)) &&
      hasTrait(character, '400') &&
      experience(character, '76') >= 3);

  return canAssist ? 2 : 1;
}

export function refreshCharacterSaleEligibility(character: CharacterState): CharacterState {
  if (isCharacterDeleted(character) || isCharacterRetired(character)) {
    return {
      ...character,
      flags: {
        ...character.flags,
        lifecycle: {
          ...character.flags.lifecycle,
          sellable: false,
          assistantEligible: false,
        },
      },
    };
  }

  const saleEligibilityRank = Math.max(
    character.flags.lifecycle.saleEligibilityRank,
    legacySaleEligibilityRank(character),
    computeSellAssistantEligibilityRank(character),
  ) as SaleEligibilityRank;

  return {
    ...character,
    flags: {
      ...character.flags,
      lifecycle: {
        ...character.flags.lifecycle,
        saleEligibilityRank,
        sellable: saleEligibilityRank >= 1 && character.identity.templateId !== '0' && !hasTrait(character, '199'),
        assistantEligible: saleEligibilityRank >= 2,
      },
    },
  };
}

export function isCharacterDeleted(character: CharacterState): boolean {
  return character.flags.lifecycle.deleted;
}

export function isCharacterRetired(character: CharacterState): boolean {
  return character.flags.lifecycle.retired;
}

export function isCharacterActive(character: CharacterState): boolean {
  return !isCharacterDeleted(character) && !isCharacterRetired(character);
}

export function isCharacterAssistantEligible(character: CharacterState): boolean {
  return isCharacterActive(character) && character.flags.lifecycle.assistantEligible;
}

export function canRetireCharacter(character: CharacterState): boolean {
  return isCharacterActive(character) && character.flags.lifecycle.sellable;
}

export function isCharacterSaleBusy(character: CharacterState, timeSlot: 0 | 1): boolean {
  return timeSlot === 1 && legacyFeatureFlag(character, 'work', '12') !== 0;
}

export function canListCharacterForSale(character: CharacterState, timeSlot: 0 | 1 = 0): boolean {
  const refreshed = refreshCharacterSaleEligibility(character);
  if (refreshed.identity.templateId === '0') return false;
  if (hasTrait(refreshed, '199')) return false;
  if (refreshed.flags.lifecycle.saleEligibilityRank < 1) return false;
  if (currentBase(refreshed, '0') < 1) return false;
  if (isCharacterSaleBusy(refreshed, timeSlot)) return false;
  return isCharacterActive(refreshed);
}

export function listSaleEligibleCharacterIds(state: GameState, timeSlot: 0 | 1 = 0): readonly CharacterId[] {
  return Object.values(state.people.characters)
    .filter((character) => canListCharacterForSale(character, timeSlot))
    .map((character) => character.id)
    .sort();
}

function characterNotFound(characterId: CharacterId): CharacterLifecycleFailure {
  return {
    code: 'character-not-found',
    message: `Character does not exist: ${characterId}`,
  };
}

function updateCharacter(state: GameState, character: CharacterState): GameState {
  return {
    ...state,
    people: {
      ...state.people,
      characters: {
        ...state.people.characters,
        [character.id]: character,
      },
    },
  };
}

export function setCharacterAssistantEligible(
  state: GameState,
  characterId: CharacterId,
  assistantEligible: boolean,
): CharacterLifecycleResult {
  const character = state.people.characters[characterId];
  if (!character) {
    return {
      ok: false,
      failure: characterNotFound(characterId),
    };
  }

  const refreshed = refreshCharacterSaleEligibility(character);

  if (assistantEligible && refreshed.flags.lifecycle.saleEligibilityRank < 2) {
    return {
      ok: false,
      failure: {
        code: 'character-not-assistant-eligible',
        message: `Character cannot be set assistant eligible: ${characterId}`,
      },
    };
  }

  const nextRoles = assistantEligible
    ? [...refreshed.roles.filter((r) => r !== 'assistant'), 'assistant'] as readonly CharacterRole[]
    : refreshed.roles.filter((r) => r !== 'assistant');

  return {
    ok: true,
    state: updateCharacter(state, {
      ...refreshed,
      flags: {
        ...refreshed.flags,
        lifecycle: {
          ...refreshed.flags.lifecycle,
          assistantEligible,
        },
      },
      roles: nextRoles,
    }),
  };
}

export function markCharacterRetired(state: GameState, characterId: CharacterId): CharacterLifecycleResult {
  const character = state.people.characters[characterId];
  if (!character) {
    return {
      ok: false,
      failure: characterNotFound(characterId),
    };
  }

  const refreshed = refreshCharacterSaleEligibility(character);
  if (!canRetireCharacter(refreshed)) {
    return {
      ok: false,
      failure: {
        code: 'character-not-retirable',
        message: `Character cannot be retired: ${characterId}`,
      },
    };
  }

  return {
    ok: true,
    state: updateCharacter(state, {
      ...refreshed,
      flags: {
        ...refreshed.flags,
        lifecycle: {
          ...refreshed.flags.lifecycle,
          retired: true,
          assistantEligible: false,
          sellable: false,
        },
      },
      roles: refreshed.roles.filter((role) => role !== 'assistant'),
    }),
  };
}

export function markCharacterDeleted(state: GameState, characterId: CharacterId): CharacterLifecycleResult {
  const character = state.people.characters[characterId];
  if (!character) {
    return {
      ok: false,
      failure: characterNotFound(characterId),
    };
  }

  if (character.identity.templateId === '0') {
    return {
      ok: false,
      failure: {
        code: 'player-character-not-deletable',
        message: `Player character cannot be deleted: ${characterId}`,
      },
    };
  }

  return {
    ok: true,
    state: updateCharacter(state, {
      ...character,
      flags: {
        ...character.flags,
        lifecycle: {
          ...character.flags.lifecycle,
          deleted: true,
          retired: true,
          assistantEligible: false,
          sellable: false,
        },
      },
      roles: character.roles.filter((role) => role !== 'owned' && role !== 'assistant'),
    }),
  };
}

export function sellCharacterForLifecycle(
  state: GameState,
  characterId: CharacterId,
  timeSlot: 0 | 1 = 0,
): CharacterLifecycleResult {
  const character = state.people.characters[characterId];
  if (!character) {
    return {
      ok: false,
      failure: characterNotFound(characterId),
    };
  }

  const refreshed = refreshCharacterSaleEligibility(character);
  const refreshedState = updateCharacter(state, refreshed);

  if (!canListCharacterForSale(refreshed, timeSlot)) {
    return {
      ok: false,
      failure: {
        code: isCharacterSaleBusy(refreshed, timeSlot) ? 'character-busy-until-turn-end' : 'character-not-sale-eligible',
        message: `Character cannot be sold through lifecycle: ${characterId}`,
      },
    };
  }

  return markCharacterDeleted(refreshedState, characterId);
}
