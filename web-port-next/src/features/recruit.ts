import { getRecruitListingDefinition } from '../catalog/lookup';
import { recruitAdvertisementMaxCount, recruitAdvertisementTemplateId } from '../catalog/recruitListingIds';
import type { CatalogId, GameDefinitions, RecruitListingDefinition } from '../catalog/types';
import type { RecruitInterviewDraft, RecruitSessionState } from '../domains/recruit/types';
import type { GameSession, GameState } from '../game/state';
import type { RecruitListingView, RecruitView } from '../game/views';
import { characterIdForTemplate, createCharacterBundleFromSpecs, getCharacterTemplate } from './characterCreation';

export const DEFAULT_RECRUIT_ROSTER_LIMIT = 99;

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
  if (state.shop.progress.hiddenListingIds.includes(listing.id)) return false;
  if (state.shop.progress.unlockedListingIds.includes(listing.id)) return true;
  return listing.defaultAvailable;
}

function recruitRosterLimit(state: GameState): number {
  const value = state.run.runFlags.recruitRosterLimit;
  return typeof value === 'number' && Number.isFinite(value) ? value : DEFAULT_RECRUIT_ROSTER_LIMIT;
}

function recruitTemplateCount(state: GameState, templateId: CatalogId): number {
  return Object.values(state.people.characters).filter((character) => character.identity.templateId === templateId).length;
}

function maxRecruitCount(listing: RecruitListingDefinition): number {
  if (listing.maxRecruitCount !== undefined) return listing.maxRecruitCount;
  return listing.repeatable ? recruitAdvertisementMaxCount : 1;
}

function isRepeatableRecruitListing(listing: RecruitListingDefinition): boolean {
  return listing.repeatable === true || listing.characterTemplateId === recruitAdvertisementTemplateId;
}

function hasRemainingRecruitCount(state: GameState, listing: RecruitListingDefinition): boolean {
  if (!listing.characterTemplateId) return false;
  return recruitTemplateCount(state, listing.characterTemplateId) < maxRecruitCount(listing);
}

function recruitCharacterId(listing: RecruitListingDefinition, state: GameState): string | undefined {
  if (!listing.characterTemplateId) return undefined;
  if (!isRepeatableRecruitListing(listing)) return characterIdForTemplate(listing.characterTemplateId);
  return `${characterIdForTemplate(listing.characterTemplateId)}:${recruitTemplateCount(state, listing.characterTemplateId) + 1}`;
}

function createRecruitInterviewDraft(listing: RecruitListingDefinition, state: GameState): RecruitInterviewDraft | undefined {
  if (!listing.characterTemplateId || !isRepeatableRecruitListing(listing)) return undefined;

  const instanceIndex = recruitTemplateCount(state, listing.characterTemplateId) + 1;
  const commandFlags: Record<string, number> = {
    '400': 0,
    '401': 18 + instanceIndex,
    '402': ((instanceIndex - 1) % 12) + 1,
    '403': ((instanceIndex * 3) % 28) + 1,
    '404': ((instanceIndex - 1) % 4) + 1,
    '405': instanceIndex <= 2 ? 0 : ((instanceIndex - 1) % 9) + 1,
    '406': (instanceIndex * 2) % 21,
    '407': (instanceIndex * 17) % 100,
    '408': instanceIndex % 5,
    '409': instanceIndex % 10,
    '410': 100 + instanceIndex * 10,
    '411': instanceIndex % 2,
    '412': instanceIndex % 2,
    '413': instanceIndex % 3 === 0 ? 1 : 0,
    '414': instanceIndex % 19,
    '415': instanceIndex % 20,
    '416': 23 + (instanceIndex % 15),
    '417': instanceIndex % 5 === 0 ? 40 : 0,
    '418': instanceIndex % 5 === 1 ? 42 : 0,
    '419': instanceIndex % 5 === 2 ? 99 : 0,
    '420': listing.basePrice ?? 300,
    '421': 0,
    '430': 0,
    '431': 1500,
  };
  const scratchTexts = {
    '50': 'Interview',
    '51': `Candidate ${instanceIndex}`,
  };

  return {
    sourceListingId: listing.id,
    templateId: listing.characterTemplateId,
    instanceIndex,
    displayName: `${scratchTexts['50']} ${scratchTexts['51']}`,
    commandFlags,
    scratchTexts,
  };
}

function commandFlagsForSession(session: GameSession, draft?: RecruitInterviewDraft): Record<string, number> {
  return {
    ...session.recruit.commandFlags,
    '100': session.recruit.pageIndex,
    ...(draft?.commandFlags ?? {}),
  };
}

function scratchTextsForSession(session: GameSession, draft?: RecruitInterviewDraft): Record<string, string> {
  return {
    ...session.recruit.scratchTexts,
    ...(draft?.scratchTexts ?? {}),
  };
}

function unavailableReason(
  definitions: GameDefinitions,
  state: GameState,
  listing: RecruitListingDefinition,
): string | undefined {
  if (!isUnlockedOrDefault(state, listing)) return 'Recruit listing is currently hidden.';

  if (!listing.characterTemplateId || !getCharacterTemplate(definitions, listing.characterTemplateId)) {
    return 'Recruit listing is missing a character template.';
  }

  if (!hasRemainingRecruitCount(state, listing)) {
    return isRepeatableRecruitListing(listing) ? 'Recruitment limit reached for this listing.' : 'Character already recruited.';
  }

  const characterId = recruitCharacterId(listing, state);
  if (characterId && state.people.characters[characterId]) return 'Character already recruited.';
  if (Object.keys(state.people.characters).length >= recruitRosterLimit(state)) return 'Roster limit reached.';
  if (state.economy.account.currentMoney < (listing.basePrice ?? 0)) return 'Not enough money.';

  return undefined;
}

function canEnterRecruitList(definitions: GameDefinitions, state: GameState, listing: RecruitListingDefinition): boolean {
  return (
    isUnlockedOrDefault(state, listing) &&
    listing.characterTemplateId !== undefined &&
    getCharacterTemplate(definitions, listing.characterTemplateId) !== undefined &&
    hasRemainingRecruitCount(state, listing)
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
  if (!listingResult.ok) return undefined;

  const listing = listingResult.definition;
  const disabledReason = unavailableReason(definitions, state, listing);

  return {
    listingId: listing.id,
    characterTemplateId: listing.characterTemplateId,
    characterId: recruitCharacterId(listing, state),
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
    pageIndex: 0,
    commandFlags: { '100': 0 },
    scratchTexts: {},
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
      message: `Recruit listing is currently hidden: ${listing.id}`,
    };
  }

  if (!listing.characterTemplateId || !getCharacterTemplate(definitions, listing.characterTemplateId)) {
    return {
      code: 'recruit-template-missing',
      message: `Recruit listing is missing a character template: ${listing.id}`,
    };
  }

  if (!hasRemainingRecruitCount(state, listing)) {
    return {
      code: isRepeatableRecruitListing(listing) ? 'recruit-repeat-limit' : 'recruit-duplicate-character',
      message: isRepeatableRecruitListing(listing)
        ? `Recruit listing reached its repeat limit: ${listing.id}`
        : `Character already recruited: ${listing.label}`,
    };
  }

  const characterId = recruitCharacterId(listing, state);
  if (characterId && state.people.characters[characterId]) {
    return {
      code: 'recruit-duplicate-character',
      message: `Character already recruited: ${listing.label}`,
    };
  }

  if (Object.keys(state.people.characters).length >= recruitRosterLimit(state)) {
    return {
      code: 'recruit-roster-limit',
      message: 'Recruit roster limit reached.',
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

  const failure = selectableRecruitFailure(definitions, state, listingResult.definition);
  if (failure) {
    return {
      ok: false,
      failure,
    };
  }

  if (session.recruit.visibleListingIds.length > 0 && !session.recruit.visibleListingIds.includes(listingId)) {
    return {
      ok: false,
      failure: {
        code: 'recruit-listing-not-in-session',
        message: `Recruit listing is not visible in the current session: ${listingId}`,
      },
    };
  }

  const draft = createRecruitInterviewDraft(listingResult.definition, state);

  return {
    ok: true,
    state,
    session: {
      ...session,
      recruit: {
        ...session.recruit,
        selectedListingId: listingResult.definition.id,
        commandFlags: commandFlagsForSession(session, draft),
        scratchTexts: scratchTextsForSession(session, draft),
        interviewDraft: draft,
      },
    },
    message: `${listingResult.definition.label} selected for recruitment.`,
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
        message: 'Select a recruit listing first.',
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
        message: `Recruit listing is missing a price: ${listing.id}`,
      },
    };
  }

  if (state.economy.account.currentMoney < price) {
    return {
      ok: false,
      failure: {
        code: 'not-enough-money',
        message: `Not enough money. Required: ${price}Pt`,
      },
    };
  }

  const draft = session.recruit.interviewDraft ?? createRecruitInterviewDraft(listing, state);
  const characterId = recruitCharacterId(listing, state);
  const characterResult = createCharacterBundleFromSpecs(definitions, [
    {
      templateId: listing.characterTemplateId!,
      characterId,
      identityOverrides: draft
        ? {
            displayName: draft.displayName,
            callName: draft.displayName,
            nickname: draft.displayName,
          }
        : undefined,
      featureProgress: draft
        ? {
            recruitInterviewInstance: draft.instanceIndex,
          }
        : undefined,
    },
  ]);
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
        `recruit:template:${listing.characterTemplateId}:character:${characterId}:total:${price}`,
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
      recruit: createRecruitSession(definitions, nextState),
    },
    message: `${listing.label} recruited.`,
  };
}
