import type { CharacterId, CharacterState } from '../domains/people/types';
import type { GameState } from '../game/state';

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

  return {
    ok: true,
    state: updateCharacter(state, {
      ...character,
      flags: {
        ...character.flags,
        lifecycle: {
          ...character.flags.lifecycle,
          assistantEligible,
        },
      },
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

  if (!canRetireCharacter(character)) {
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
      ...character,
      flags: {
        ...character.flags,
        lifecycle: {
          ...character.flags.lifecycle,
          retired: true,
          assistantEligible: false,
        },
      },
      roles: character.roles.filter((role) => role !== 'assistant'),
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
