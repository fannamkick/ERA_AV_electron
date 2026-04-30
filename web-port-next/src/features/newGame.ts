import type { CatalogId, GameDefinitions } from '../catalog/types';
import type { CharacterId } from '../domains/people/types';
import { initialGameSession, initialGameState, type GameSession, type GameState } from '../game/state';
import { createCharacterBundle } from './characterCreation';

export type NewGameModeId = 'easy' | 'normal';

export type NewGameModeDefinition = {
  readonly id: NewGameModeId;
  readonly label: string;
  readonly weekLimit: number;
  readonly targetMoney: number;
  readonly initialMoney: number;
  readonly startingItemCounts: Record<CatalogId, number>;
  readonly extraCharacterTemplateIds: readonly CatalogId[];
};

export type NewGameInput = {
  readonly modeId?: NewGameModeId;
  readonly seed?: string;
  readonly playerTemplateId?: CatalogId;
};

export type NewGameFailure = {
  readonly code: string;
  readonly message: string;
};

export type NewGameResult =
  | {
      readonly ok: true;
      readonly state: GameState;
      readonly session: GameSession;
      readonly mode: NewGameModeDefinition;
      readonly createdCharacterIds: readonly CharacterId[];
    }
  | {
      readonly ok: false;
      readonly failure: NewGameFailure;
    };

export const phaseOneNewGameModes: Record<NewGameModeId, NewGameModeDefinition> = {
  easy: {
    id: 'easy',
    label: 'EASY',
    weekLimit: 120,
    targetMoney: 3000000,
    initialMoney: 2000,
    startingItemCounts: { '6': 1 },
    extraCharacterTemplateIds: ['151'],
  },
  normal: {
    id: 'normal',
    label: 'NORMAL',
    weekLimit: 100,
    targetMoney: 5000000,
    initialMoney: 1000,
    startingItemCounts: { '6': 1 },
    extraCharacterTemplateIds: [],
  },
};

function validateStartingItems(definitions: GameDefinitions, mode: NewGameModeDefinition): NewGameFailure | undefined {
  for (const itemId of Object.keys(mode.startingItemCounts)) {
    if (!definitions.items[itemId]) {
      return {
        code: 'missing-starting-item-definition',
        message: `시작 아이템 정의를 찾을 수 없습니다: ${itemId}`,
      };
    }
  }

  return undefined;
}

export function createNewGame(definitions: GameDefinitions, input: NewGameInput = {}): NewGameResult {
  const mode = phaseOneNewGameModes[input.modeId ?? 'normal'];
  if (!mode) {
    return {
      ok: false,
      failure: {
        code: 'unknown-new-game-mode',
        message: `새 게임 모드를 알 수 없습니다: ${input.modeId}`,
      },
    };
  }

  const itemFailure = validateStartingItems(definitions, mode);
  if (itemFailure) {
    return {
      ok: false,
      failure: itemFailure,
    };
  }

  const playerTemplateId = input.playerTemplateId ?? '0';
  const characterResult = createCharacterBundle(definitions, [playerTemplateId, ...mode.extraCharacterTemplateIds]);
  if (!characterResult.ok) {
    return characterResult;
  }
  const characters = characterResult.bundle;

  return {
    ok: true,
    mode,
    createdCharacterIds: characters.createdCharacterIds,
    state: {
      ...initialGameState,
      run: {
        ...initialGameState.run,
        clock: {
          day: 0,
          month: 1,
          week: 1,
          turn: 0,
          phase: 'freeAction',
        },
        actorMemory: {},
        rngSeed: input.seed,
        runFlags: {
          modeId: mode.id,
          weekLimit: mode.weekLimit,
          targetMoney: mode.targetMoney,
        },
      },
      economy: {
        ...initialGameState.economy,
        account: {
          currentMoney: mode.initialMoney,
        },
      },
      inventory: {
        ...initialGameState.inventory,
        itemCounts: { ...mode.startingItemCounts },
      },
      people: { characters: characters.characters },
      body: { byCharacterId: characters.bodies },
      equipment: { byCharacterId: characters.equipment },
      social: {
        relationships: characters.relationships,
        ntrProgress: {},
        partnerProgress: {},
      },
    },
    session: {
      ...initialGameSession,
      ui: {
        ...initialGameSession.ui,
        route: 'mainMenu',
      },
    },
  };
}
