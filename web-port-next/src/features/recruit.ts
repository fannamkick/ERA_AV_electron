import { getRecruitListingDefinition } from '../catalog/lookup';
import type { CatalogId, GameDefinitions, RecruitListingDefinition } from '../catalog/types';
import type { RecruitSessionState } from '../domains/recruit/types';
import type { GameSession, GameState } from '../game/state';
import type { RecruitListingView, RecruitView } from '../game/views';
import { characterIdForTemplate, createCharacterBundle, getCharacterTemplate } from './characterCreation';

export const MAX_PHASE_TWO_RECRUITED_CHARACTERS = 99;

export type RecruitFailure = {
  readonly code: string;
  readonly message: string;
};

export type RecruitUpdateResult =
  | {
      readonly ok: true;
      readonly state: GameState;
      readonly session: GameSession;
      readonly message: string;
    }
  | {
      readonly ok: false;
      readonly failure: RecruitFailure;
    };

function isUnlockedOrDefault(state: GameState, listing: RecruitListingDefinition): boolean {
  if (state.shop.progress.hiddenListingIds.includes(listing.id)) {
    return false;
  }

  if (state.shop.progress.unlockedListingIds.includes(listing.id)) {
    return true;
  }

  return listing.defaultAvailable;
}

function recruitCharacterId(listing: RecruitListingDefinition): string | undefined {
  return listing.characterTemplateId ? characterIdForTemplate(listing.characterTemplateId) : undefined;
}

function unavailableReason(
  definitions: GameDefinitions,
  state: GameState,
  listing: RecruitListingDefinition,
): string | undefined {
  if (!isUnlockedOrDefault(state, listing)) {
    return '현재 표시 가능한 영입 후보가 아닙니다.';
  }

  if (!listing.characterTemplateId || !getCharacterTemplate(definitions, listing.characterTemplateId)) {
    return '연결된 캐릭터 원형이 없습니다.';
  }

  const characterId = recruitCharacterId(listing);
  if (characterId && state.people.characters[characterId]) {
    return '이미 영입한 인물입니다.';
  }

  if (Object.keys(state.people.characters).length >= MAX_PHASE_TWO_RECRUITED_CHARACTERS) {
    return '영입 가능한 인원 한도에 도달했습니다.';
  }

  const price = listing.basePrice ?? 0;
  if (state.economy.account.currentMoney < price) {
    return '돈 부족';
  }

  return undefined;
}

function canEnterRecruitList(definitions: GameDefinitions, state: GameState, listing: RecruitListingDefinition): boolean {
  return (
    isUnlockedOrDefault(state, listing) &&
    listing.characterTemplateId !== undefined &&
    getCharacterTemplate(definitions, listing.characterTemplateId) !== undefined
  );
}

export function computeVisibleRecruitListingIds(definitions: GameDefinitions, state: GameState): readonly CatalogId[] {
  return Object.values(definitions.recruitListings)
    .filter((listing) => canEnterRecruitList(definitions, state, listing))
    .map((listing) => listing.id)
    .sort((left, right) => Number(left.split(':')[1]) - Number(right.split(':')[1]));
}

function listingViewFromDefinition(
  definitions: GameDefinitions,
  state: GameState,
  listingId: CatalogId,
): RecruitListingView | undefined {
  const listingResult = getRecruitListingDefinition(definitions, listingId);
  if (!listingResult.ok) {
    return undefined;
  }

  const listing = listingResult.definition;
  const disabledReason = unavailableReason(definitions, state, listing);

  return {
    listingId: listing.id,
    characterTemplateId: listing.characterTemplateId,
    characterId: recruitCharacterId(listing),
    label: listing.label,
    price: listing.basePrice ?? 0,
    available: disabledReason === undefined,
    disabledReason,
  };
}

export function buildRecruitView(definitions: GameDefinitions, state: GameState, session: GameSession): RecruitView {
  const visibleListingIds =
    session.recruit.visibleListingIds.length > 0 ? session.recruit.visibleListingIds : computeVisibleRecruitListingIds(definitions, state);
  const visibleListings = visibleListingIds
    .map((listingId) => listingViewFromDefinition(definitions, state, listingId))
    .filter((listing): listing is RecruitListingView => Boolean(listing));
  const selectedListing =
    session.recruit.selectedListingId !== undefined
      ? visibleListings.find((listing) => listing.listingId === session.recruit.selectedListingId)
      : undefined;

  return {
    kind: 'recruit',
    route: 'recruit',
    currentMoney: state.economy.account.currentMoney,
    visibleListings,
    selectedListingId: session.recruit.selectedListingId,
    selectedListing,
  };
}

export function createRecruitSession(definitions: GameDefinitions, state: GameState): RecruitSessionState {
  return {
    selectedListingId: undefined,
    visibleListingIds: computeVisibleRecruitListingIds(definitions, state),
  };
}

function selectableRecruitFailure(
  definitions: GameDefinitions,
  state: GameState,
  listing: RecruitListingDefinition,
): RecruitFailure | undefined {
  if (!isUnlockedOrDefault(state, listing)) {
    return {
      code: 'recruit-listing-not-visible',
      message: `현재 표시 가능한 영입 후보가 아닙니다: ${listing.id}`,
    };
  }

  if (!listing.characterTemplateId || !getCharacterTemplate(definitions, listing.characterTemplateId)) {
    return {
      code: 'recruit-template-missing',
      message: `영입 후보에 연결된 캐릭터 원형이 없습니다: ${listing.id}`,
    };
  }

  const characterId = recruitCharacterId(listing);
  if (characterId && state.people.characters[characterId]) {
    return {
      code: 'recruit-duplicate-character',
      message: `이미 영입한 인물입니다: ${listing.label}`,
    };
  }

  if (Object.keys(state.people.characters).length >= MAX_PHASE_TWO_RECRUITED_CHARACTERS) {
    return {
      code: 'recruit-roster-limit',
      message: '영입 가능한 인원 한도에 도달했습니다.',
    };
  }

  return undefined;
}

export function selectRecruitListing(
  definitions: GameDefinitions,
  state: GameState,
  session: GameSession,
  listingId: CatalogId,
): RecruitUpdateResult {
  const listingResult = getRecruitListingDefinition(definitions, listingId);
  if (!listingResult.ok) {
    return {
      ok: false,
      failure: {
        code: listingResult.failure.code,
        message: listingResult.failure.message,
      },
    };
  }

  if (session.recruit.visibleListingIds.length > 0 && !session.recruit.visibleListingIds.includes(listingId)) {
    return {
      ok: false,
      failure: {
        code: 'recruit-listing-not-in-session',
        message: `현재 영입 화면의 표시 목록에 없는 후보입니다: ${listingId}`,
      },
    };
  }

  const failure = selectableRecruitFailure(definitions, state, listingResult.definition);
  if (failure) {
    return {
      ok: false,
      failure,
    };
  }

  return {
    ok: true,
    state,
    session: {
      ...session,
      recruit: {
        ...session.recruit,
        selectedListingId: listingResult.definition.id,
      },
    },
    message: `${listingResult.definition.label}을 영입 후보로 선택했습니다.`,
  };
}

export function recruitSelectedCharacter(
  definitions: GameDefinitions,
  state: GameState,
  session: GameSession,
): RecruitUpdateResult {
  const selectedListingId = session.recruit.selectedListingId;
  if (!selectedListingId) {
    return {
      ok: false,
      failure: {
        code: 'recruit-selection-required',
        message: '영입할 후보를 먼저 선택해야 합니다.',
      },
    };
  }

  const listingResult = getRecruitListingDefinition(definitions, selectedListingId);
  if (!listingResult.ok) {
    return {
      ok: false,
      failure: {
        code: listingResult.failure.code,
        message: listingResult.failure.message,
      },
    };
  }

  const listing = listingResult.definition;
  const precheckFailure = selectableRecruitFailure(definitions, state, listing);
  if (precheckFailure) {
    return {
      ok: false,
      failure: precheckFailure,
    };
  }

  const price = listing.basePrice;
  if (price === undefined) {
    return {
      ok: false,
      failure: {
        code: 'recruit-price-missing',
        message: `영입 가격 정의가 없습니다: ${listing.id}`,
      },
    };
  }

  if (state.economy.account.currentMoney < price) {
    return {
      ok: false,
      failure: {
        code: 'not-enough-money',
        message: `돈이 부족합니다. 필요 금액: ${price}Pt`,
      },
    };
  }

  const characterResult = createCharacterBundle(definitions, [listing.characterTemplateId!]);
  if (!characterResult.ok) {
    return {
      ok: false,
      failure: characterResult.failure,
    };
  }

  const nextState: GameState = {
    ...state,
    economy: {
      ...state.economy,
      account: {
        currentMoney: state.economy.account.currentMoney - price,
      },
      accountingEntries: [
        ...state.economy.accountingEntries,
        `recruit:template:${listing.characterTemplateId}:total:${price}`,
      ],
    },
    people: {
      characters: {
        ...state.people.characters,
        ...characterResult.bundle.characters,
      },
    },
    body: {
      byCharacterId: {
        ...state.body.byCharacterId,
        ...characterResult.bundle.bodies,
      },
    },
    social: {
      ...state.social,
      relationships: {
        ...state.social.relationships,
        ...characterResult.bundle.relationships,
      },
    },
    equipment: {
      byCharacterId: {
        ...state.equipment.byCharacterId,
        ...characterResult.bundle.equipment,
      },
    },
  };

  return {
    ok: true,
    state: nextState,
    session: {
      ...session,
      recruit: {
        selectedListingId: undefined,
        visibleListingIds: computeVisibleRecruitListingIds(definitions, nextState),
      },
    },
    message: `${listing.label}을 영입했습니다.`,
  };
}
