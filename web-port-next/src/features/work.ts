import { getWorkDefinition } from '../catalog/lookup';
import type { CatalogId, GameDefinitions, WorkDefinition } from '../catalog/types';
import { initialWorkSessionState } from '../domains/workSession/types';
import { logEffect, type GameEffect } from '../game/effects';
import type { GameSession, GameState } from '../game/state';
import type { WorkCharacterCandidateView, WorkListingView, WorkView } from '../game/views';
import { applyBodyStatDeltas } from './bodyStats';
import { isCharacterActive } from './characterLifecycle';
import { endTurn } from './turnEnd';

export type WorkFailure = {
  readonly code: string;
  readonly message: string;
};

export type WorkCalculatedResult = {
  readonly workId: CatalogId;
  readonly characterId: string;
  readonly assistantId?: string;
  readonly workKind: string;
  readonly sourceFile?: string;
  readonly sourceLabel?: string;
  readonly rewardMoney: number;
  readonly bodyStatDeltas: Record<string, number>;
  readonly experienceDeltas: Record<CatalogId, number>;
  readonly traitFlags: Record<CatalogId, boolean | number>;
  readonly workFlagValues: Record<string, boolean | number | string>;
  readonly workFlagDeltas: Record<string, number>;
  readonly economyFlagValues: Record<string, boolean | number | string>;
};

export type WorkUpdateResult =
  | {
      readonly ok: true;
      readonly state: GameState;
      readonly session: GameSession;
      readonly message: string;
      readonly effects?: readonly GameEffect[];
    }
  | {
      readonly ok: false;
      readonly failure: WorkFailure;
    };

function workSourceFileName(work: WorkDefinition): string {
  return work.source.path.split(/[\\/]/u).pop() ?? '';
}

function workSourceLabel(work: WorkDefinition): string {
  return work.source.originalName ?? work.source.originalId ?? work.id;
}

function isSourceWork(work: WorkDefinition, sourceFile: string, sourceLabel?: string): boolean {
  return workSourceFileName(work) === sourceFile && (sourceLabel === undefined || workSourceLabel(work) === sourceLabel);
}

function requiredBrothelFlagsSatisfied(state: GameState, work: WorkDefinition): boolean {
  return Object.entries(work.requiredBrothelFlags ?? {}).every(([flagId, expected]) => state.work.brothelFlags[flagId] === expected);
}

function workVisible(state: GameState, work: WorkDefinition): boolean {
  if (state.work.brothelFlags[`visible:${work.id}`] === true) {
    return true;
  }

  return work.defaultAvailable && requiredBrothelFlagsSatisfied(state, work);
}

function workDisabledReason(state: GameState, work: WorkDefinition): string | undefined {
  if (!work.defaultAvailable) {
    return '아직 표시 조건을 만족하지 않았습니다.';
  }

  if (!requiredBrothelFlagsSatisfied(state, work)) {
    return '원본 업무 공개 조건이 아직 충족되지 않았습니다.';
  }

  if (Object.keys(state.people.characters).length === 0) {
    return '참여 가능한 인물이 없습니다.';
  }

  return undefined;
}

function eligibleCharacterIds(state: GameState): readonly string[] {
  return Object.values(state.people.characters)
    .filter((character) => isCharacterActive(character))
    .map((character) => character.id)
    .sort();
}

export function computeVisibleWorkIds(definitions: GameDefinitions, state: GameState): readonly CatalogId[] {
  return Object.values(definitions.workDefinitions)
    .filter((work) => workVisible(state, work))
    .map((work) => work.id)
    .sort();
}

function workViewFromDefinition(state: GameState, work: WorkDefinition): WorkListingView {
  const disabledReason = workDisabledReason(state, work);

  return {
    workId: work.id,
    label: work.label,
    rewardMoney: work.rewardMoney,
    completesTimeBlock: work.completesTimeBlock,
    available: disabledReason === undefined,
    disabledReason,
  };
}

function characterViewFromState(state: GameState, characterId: string): WorkCharacterCandidateView | undefined {
  const character = state.people.characters[characterId];
  if (!character) {
    return undefined;
  }

  const available = isCharacterActive(character);

  return {
    characterId,
    label: character.identity.displayName,
    available,
    disabledReason: available ? undefined : '은퇴한 인물입니다.',
  };
}

function workKindFromDefinition(work: WorkDefinition): string {
  return work.tags.find((tag) => ['arbeit', 'brothel', 'brothel-menu', 'event', 'job', 'special', 'system'].includes(tag)) ?? 'work';
}

export function buildWorkView(definitions: GameDefinitions, state: GameState, session: GameSession): WorkView {
  const visibleWorkIds = session.work.visibleWorkIds.length > 0 ? session.work.visibleWorkIds : computeVisibleWorkIds(definitions, state);
  const visibleWorks = visibleWorkIds
    .map((workId) => getWorkDefinition(definitions, workId))
    .filter((result): result is { readonly ok: true; readonly definition: WorkDefinition } => result.ok)
    .map((result) => workViewFromDefinition(state, result.definition));
  const selectedWork =
    session.work.selectedWorkId !== undefined
      ? visibleWorks.find((work) => work.workId === session.work.selectedWorkId)
      : undefined;
  const candidateIds =
    session.work.eligibleCharacterIds.length > 0 ? session.work.eligibleCharacterIds : eligibleCharacterIds(state);
  const eligibleCharacters = candidateIds
    .map((characterId) => characterViewFromState(state, characterId))
    .filter((candidate): candidate is WorkCharacterCandidateView => Boolean(candidate));
  const selectedCharacter =
    session.work.selectedCharacterId !== undefined
      ? eligibleCharacters.find((candidate) => candidate.characterId === session.work.selectedCharacterId)
      : undefined;
  const selectedAssistant =
    session.work.selectedAssistantId !== undefined
      ? eligibleCharacters.find((candidate) => candidate.characterId === session.work.selectedAssistantId)
      : undefined;

  return {
    kind: 'work',
    route: 'work',
    currentMoney: state.economy.account.currentMoney,
    visibleWorks,
    selectedWorkId: session.work.selectedWorkId,
    selectedWork,
    eligibleCharacters,
    selectedCharacterId: session.work.selectedCharacterId,
    selectedCharacter,
    selectedAssistantId: session.work.selectedAssistantId,
    selectedAssistant,
  };
}

export function createWorkSession(definitions: GameDefinitions, state: GameState) {
  return {
    selectedWorkId: undefined,
    selectedCharacterId: undefined,
    selectedAssistantId: undefined,
    visibleWorkIds: computeVisibleWorkIds(definitions, state),
    eligibleCharacterIds: eligibleCharacterIds(state),
  };
}

export function selectWork(
  definitions: GameDefinitions,
  state: GameState,
  session: GameSession,
  workId: CatalogId,
): WorkUpdateResult {
  const workResult = getWorkDefinition(definitions, workId);
  if (!workResult.ok) {
    return {
      ok: false,
      failure: workResult.failure,
    };
  }

  if (session.work.visibleWorkIds.length > 0 && !session.work.visibleWorkIds.includes(workId)) {
    return {
      ok: false,
      failure: {
        code: 'work-not-in-session',
        message: `현재 업무 목록에 없는 업무입니다: ${workId}`,
      },
    };
  }

  return {
    ok: true,
    state,
    session: {
      ...session,
      work: {
        ...session.work,
        selectedWorkId: workResult.definition.id,
      },
    },
    message: `${workResult.definition.label} 업무를 선택했습니다.`,
  };
}

export function selectWorkCharacter(state: GameState, session: GameSession, characterId: string): WorkUpdateResult {
  if (!state.people.characters[characterId]) {
    return {
      ok: false,
      failure: {
        code: 'work-character-not-found',
        message: `업무 참여 인물을 찾을 수 없습니다: ${characterId}`,
      },
    };
  }

  if (session.work.eligibleCharacterIds.length > 0 && !session.work.eligibleCharacterIds.includes(characterId)) {
    return {
      ok: false,
      failure: {
        code: 'work-character-not-in-session',
        message: `현재 업무 화면의 참여 후보가 아닙니다: ${characterId}`,
      },
    };
  }

  return {
    ok: true,
    state,
    session: {
      ...session,
      work: {
        ...session.work,
        selectedCharacterId: characterId,
      },
    },
    message: `${state.people.characters[characterId].identity.displayName}을 업무 참여 인물로 선택했습니다.`,
  };
}

export function selectWorkAssistant(state: GameState, session: GameSession, characterId: string | undefined): WorkUpdateResult {
  if (characterId === undefined) {
    return {
      ok: true,
      state,
      session: {
        ...session,
        work: {
          ...session.work,
          selectedAssistantId: undefined,
        },
      },
      message: '?낅Т 蹂댁“ ?몃Ъ ?좏깮???댁젣?덉뒿?덈떎.',
    };
  }

  if (!state.people.characters[characterId]) {
    return {
      ok: false,
      failure: {
        code: 'work-assistant-not-found',
        message: `?낅Т 蹂댁“ ?몃Ъ??李얠쓣 ???놁뒿?덈떎: ${characterId}`,
      },
    };
  }

  if (session.work.eligibleCharacterIds.length > 0 && !session.work.eligibleCharacterIds.includes(characterId)) {
    return {
      ok: false,
      failure: {
        code: 'work-assistant-not-in-session',
        message: `?꾩옱 ?낅Т ?붾㈃??蹂댁“ ?꾨낫媛 ?꾨떃?덈떎: ${characterId}`,
      },
    };
  }

  return {
    ok: true,
    state,
    session: {
      ...session,
      work: {
        ...session.work,
        selectedAssistantId: characterId,
      },
    },
    message: `${state.people.characters[characterId].identity.displayName}???낅Т 蹂댁“ ?몃Ъ濡??좏깮?덉뒿?덈떎.`,
  };
}

function validateWorkExecution(
  state: GameState,
  work: WorkDefinition,
  characterId: string | undefined,
  assistantId: string | undefined,
): WorkFailure | undefined {
  const disabledReason = workDisabledReason(state, work);
  if (disabledReason) {
    return {
      code: 'work-unavailable',
      message: disabledReason,
    };
  }

  if (!characterId) {
    return {
      code: 'work-character-required',
      message: '업무에 참여할 인물을 먼저 선택해야 합니다.',
    };
  }

  const character = state.people.characters[characterId];
  if (!character) {
    return {
      code: 'work-character-not-found',
      message: `업무 참여 인물을 찾을 수 없습니다: ${characterId}`,
    };
  }

  if (!isCharacterActive(character)) {
    return {
      code: 'work-character-unavailable',
      message: `업무에 참여할 수 없는 인물입니다: ${character.identity.displayName}`,
    };
  }

  if (assistantId !== undefined) {
    const assistant = state.people.characters[assistantId];
    if (!assistant) {
      return {
        code: 'work-assistant-not-found',
        message: `?낅Т 蹂댁“ ?몃Ъ??李얠쓣 ???놁뒿?덈떎: ${assistantId}`,
      };
    }

    if (!isCharacterActive(assistant)) {
      return {
        code: 'work-assistant-unavailable',
        message: `?낅Т 蹂댁“濡??ъ슜?????녿뒗 ?몃Ъ?낅땲?? ${assistant.identity.displayName}`,
      };
    }
  }

  return undefined;
}

function legacyLunchStallAbilityRewardBonus(state: GameState, work: WorkDefinition, characterId: string): number {
  if (work.source.path.split(/[\\/]/u).pop() !== 'WORK_S_LUNCHSTALL.ERB' || work.source.originalName !== 'LUNCH_STALL') {
    return 0;
  }

  return Object.values(state.people.characters)
    .filter((character) => isCharacterActive(character))
    .reduce((bonus, character) => {
      const flags = state.work.careerFlagsByCharacterId[character.id] ?? {};
      if (Number(flags.flag_130 ?? 0) === 0) {
        return bonus;
      }
      if (character.id === characterId && Number(flags.flag_42 ?? 0) >= 2) {
        return bonus;
      }
      return bonus + Number(character.attributes.abilities['74'] ?? 0);
    }, 0);
}

function legacyWorkResultSatisfactionBonus(state: GameState, work: WorkDefinition, characterId: string): number {
  if (!isSourceWork(work, 'WORK_RESULT.ERB', 'WORKING_MAIN')) {
    return 0;
  }

  const experience = state.people.characters[characterId]?.attributes.experiences['74'] ?? 0;
  if (experience > 10000) return 40;
  if (experience > 5000) return 35;
  if (experience > 3000) return 30;
  if (experience > 1000) return 25;
  if (experience > 500) return 20;
  if (experience > 100) return 15;
  if (experience > 50) return 10;
  return 0;
}

function legacyConcertRewardMoney(state: GameState, work: WorkDefinition, characterId: string, rewardMoney: number): number {
  if (!isSourceWork(work, 'WORK_S_CONCERT.ERB', 'CONCERT')) {
    return rewardMoney;
  }

  const character = state.people.characters[characterId];
  const flags = state.work.careerFlagsByCharacterId[characterId] ?? {};
  const traitBonus = character?.attributes.traits['510'] === true ? 5 : 0;
  const compatibility = Number(flags.flag_51 ?? 0);
  const multiplier = compatibility >= 200 ? 2 : compatibility >= 150 ? 1.5 : compatibility >= 120 ? 1.2 : 1;
  return Math.round((rewardMoney + traitBonus) * multiplier);
}

function legacyWorkRewardMoney(state: GameState, work: WorkDefinition, characterId: string): number {
  const rewardMoney =
    work.rewardMoney +
    legacyLunchStallAbilityRewardBonus(state, work, characterId) +
    legacyWorkResultSatisfactionBonus(state, work, characterId);
  return legacyConcertRewardMoney(state, work, characterId, rewardMoney);
}

function resolveLegacyWorkCharacterId(
  work: WorkDefinition,
  state: GameState,
  characterId: string,
  assistantId: string | undefined,
): string {
  if (!isSourceWork(work, 'WORK_S_STRIP.ERB', 'STRIPTEASE') || assistantId === undefined) {
    return characterId;
  }

  const selectedExperience = state.people.characters[characterId]?.attributes.experiences['11'] ?? 0;
  const assistantExperience = state.people.characters[assistantId]?.attributes.experiences['11'] ?? 0;
  return assistantExperience > selectedExperience ? assistantId : characterId;
}

function workResultLoveEligible(state: GameState, characterId: string): boolean {
  const character = state.people.characters[characterId];
  if (!character) {
    return false;
  }

  const experiences = character.attributes.experiences;
  const traits = character.attributes.traits;
  return (
    (experiences['74'] ?? 0) >= 100 &&
    (experiences['75'] ?? 0) >= 300 &&
    traits['85'] !== true &&
    traits['183'] === true &&
    traits['184'] !== true &&
    (experiences['91'] ?? 0) >= 60
  );
}

function trainerMasterHasTrait(state: GameState, traitId: string): boolean {
  return Object.values(state.people.characters).some((character) => character.roles.includes('trainer') && character.attributes.traits[traitId] === true);
}

function legacyWorkSourceTraitFlags(state: GameState, work: WorkDefinition, characterId: string): Record<CatalogId, boolean | number> {
  if (isSourceWork(work, 'WORK_RESULT.ERB', 'WORKING_MAIN') && workResultLoveEligible(state, characterId)) {
    return {
      '184': true,
    };
  }

  return {};
}

function legacyWorkSourceBranchFlags(
  state: GameState,
  work: WorkDefinition,
  characterId: string,
  assistantId: string | undefined,
): Record<string, boolean | number | string> {
  const character = state.people.characters[characterId];
  const flags = state.work.careerFlagsByCharacterId[characterId] ?? {};
  const traits = character?.attributes.traits ?? {};

  if (isSourceWork(work, 'WORK_S_VAUCTION.ERB', 'V_AUCTION')) {
    return {
      'message.vAuction.retiredIdolAvActress': traits['401'] === true && Number(flags.flag_28 ?? 0) === 1,
    };
  }

  if (isSourceWork(work, 'WORK_S_STRIP.ERB', 'STRIPTEASE')) {
    return {
      'work.strip.selectedHighestCowgirlExperienceId': characterId,
      'work.strip.comparedAssistantCowgirlExperience': assistantId !== undefined,
    };
  }

  if (isSourceWork(work, 'WORK_RESULT.ERB', 'WORKING_MAIN')) {
    return {
      'work.result.satisfactionExperience74Tier': legacyWorkResultSatisfactionBonus(state, work, characterId),
      'message.workResult.uniformManiaCustomer': traits['184'] === true && (state.inventory.itemCounts['19'] ?? 0) > 0,
      'work.result.loveEligibleByExperience75': workResultLoveEligible(state, characterId),
    };
  }

  if (isSourceWork(work, 'WORK_S_CONCERT.ERB', 'CONCERT')) {
    const compatibility = Number(flags.flag_51 ?? 0);
    return {
      'work.concert.compatibilityFlag51': compatibility,
      'work.concert.talent510Bonus': traits['510'] === true,
    };
  }

  if (isSourceWork(work, 'WORK_S_SEXORGY.ERB')) {
    return {
      'work.sexOrgy.masterTalent133Branch': trainerMasterHasTrait(state, '133'),
    };
  }

  return {};
}

function legacyEventWorkMessageBranchFlags(
  state: GameState,
  work: WorkDefinition,
  characterId: string,
  assistantId: string | undefined,
): Record<string, boolean | number | string> {
  if (work.source.path.split(/[\\/]/u).pop() !== 'EVENT_WORK_MESSAGE_SP.ERB') {
    return {};
  }

  const character = state.people.characters[characterId];
  const assistant = assistantId !== undefined ? state.people.characters[assistantId] : undefined;
  const flags = state.work.careerFlagsByCharacterId[characterId] ?? {};
  const assistantFlags = assistantId !== undefined ? state.work.careerFlagsByCharacterId[assistantId] ?? {} : {};
  const traits = character?.attributes.traits ?? {};
  const assistantTraits = assistant?.attributes.traits ?? {};
  const allActiveMembersLewdProstitutes = Object.values(state.people.characters)
    .filter((member) => isCharacterActive(member))
    .every((member) => {
      const memberFlags = state.work.careerFlagsByCharacterId[member.id] ?? {};
      return Number(memberFlags.flag_130 ?? 0) !== 0 && member.attributes.traits['76'] === true && member.attributes.traits['180'] === true;
    });

  return {
    'message.eventWork.publicMasturbation': (Number(flags.flag_53 ?? 0) & 1) !== 0,
    'message.eventWork.futanariPairVUse': traits['121'] === true && Number(flags.flag_54 ?? 0) === 0 && assistantTraits['121'] === true && Number(assistantFlags.flag_54 ?? 0) === 0,
    'message.eventWork.failureTargetMode': Number(flags.flag_42 ?? 0),
    'message.eventWork.printMemberOnStripEnd': Number(flags.flag_50 ?? 0) === 0,
    'message.eventWork.allActiveMembersLewdProstitutes': allActiveMembersLewdProstitutes,
    'message.eventWork.scatArmpitHairText': Number(flags.flag_607 ?? 0) === 1,
    'message.eventWork.talent509LewdBranch': traits['509'] === true && traits['76'] === true,
    'message.eventWork.talent519Branch': traits['519'] === true,
  };
}

export function calculateWorkResult(
  work: WorkDefinition,
  characterId: string,
  state: GameState,
  assistantId?: string,
): WorkCalculatedResult {
  const resolvedCharacterId = resolveLegacyWorkCharacterId(work, state, characterId, assistantId);
  return {
    workId: work.id,
    characterId: resolvedCharacterId,
    assistantId,
    workKind: workKindFromDefinition(work),
    sourceFile: workSourceFileName(work),
    sourceLabel: workSourceLabel(work),
    rewardMoney: legacyWorkRewardMoney(state, work, resolvedCharacterId),
    bodyStatDeltas: { ...work.bodyStatDeltas },
    experienceDeltas: { ...work.experienceDeltas },
    traitFlags: { ...(work.traitFlags ?? {}), ...legacyWorkSourceTraitFlags(state, work, resolvedCharacterId) },
    workFlagValues: {
      ...legacyEventWorkMessageBranchFlags(state, work, resolvedCharacterId, assistantId),
      ...legacyWorkSourceBranchFlags(state, work, resolvedCharacterId, assistantId),
      ...(work.workFlagValues ?? {}),
    },
    workFlagDeltas: { ...(work.workFlagDeltas ?? {}) },
    economyFlagValues: { ...(work.economyFlagValues ?? {}) },
  };
}

export function applyWorkResult(state: GameState, result: WorkCalculatedResult): GameState {
  const character = state.people.characters[result.characterId];
  const currentCareerFlags = state.work.careerFlagsByCharacterId[result.characterId] ?? {};
  const currentAssignments = state.work.assignments;
  const nextExperiences = { ...(character?.attributes.experiences ?? {}) };
  const nextTraits = { ...(character?.attributes.traits ?? {}) };
  const nextCareerFlags: Record<string, boolean | number | string> = { ...currentCareerFlags };
  for (const [experienceId, delta] of Object.entries(result.experienceDeltas)) {
    nextExperiences[experienceId] = (nextExperiences[experienceId] ?? 0) + delta;
  }
  for (const [traitId, value] of Object.entries(result.traitFlags)) {
    nextTraits[traitId] = value;
  }
  for (const [flagId, value] of Object.entries(result.workFlagValues)) {
    nextCareerFlags[flagId] = value;
  }
  for (const [flagId, delta] of Object.entries(result.workFlagDeltas)) {
    nextCareerFlags[flagId] = ((nextCareerFlags[flagId] as number | undefined) ?? 0) + delta;
  }
  nextCareerFlags[`${result.workId}.completedCount`] = ((nextCareerFlags[`${result.workId}.completedCount`] as number | undefined) ?? 0) + 1;
  nextCareerFlags[`${result.workKind}.completedCount`] = ((nextCareerFlags[`${result.workKind}.completedCount`] as number | undefined) ?? 0) + 1;
  nextCareerFlags.lastWorkSourceFile = result.sourceFile ?? '';
  nextCareerFlags.lastWorkSourceLabel = result.sourceLabel ?? '';

  return {
    ...state,
    economy: {
      ...state.economy,
      account: {
        currentMoney: state.economy.account.currentMoney + result.rewardMoney,
      },
      accountingEntries: [...state.economy.accountingEntries, `work:${result.workId}:character:${result.characterId}:reward:${result.rewardMoney}`],
      transactionFlags: {
        ...state.economy.transactionFlags,
        ...result.economyFlagValues,
      },
    },
    people: character
      ? {
          characters: {
            ...state.people.characters,
            [result.characterId]: {
              ...character,
              attributes: {
                ...character.attributes,
                experiences: nextExperiences,
                traits: nextTraits,
              },
            },
          },
        }
      : state.people,
    body: {
      byCharacterId: {
        ...state.body.byCharacterId,
        ...(state.body.byCharacterId[result.characterId]
          ? {
              [result.characterId]: applyBodyStatDeltas(state.body.byCharacterId[result.characterId], result.bodyStatDeltas)!,
            }
          : {}),
      },
    },
    work: {
      ...state.work,
      assignments: {
        ...currentAssignments,
        [result.characterId]: {
          characterId: result.characterId,
          workTypeId: result.workId,
          active: false,
        },
      },
      careerFlagsByCharacterId: {
        ...state.work.careerFlagsByCharacterId,
        [result.characterId]: nextCareerFlags,
      },
    },
  };
}

export function executeSelectedWork(
  definitions: GameDefinitions,
  state: GameState,
  session: GameSession,
): WorkUpdateResult {
  const selectedWorkId = session.work.selectedWorkId;
  if (!selectedWorkId) {
    return {
      ok: false,
      failure: {
        code: 'work-selection-required',
        message: '실행할 업무를 먼저 선택해야 합니다.',
      },
    };
  }

  const workResult = getWorkDefinition(definitions, selectedWorkId);
  if (!workResult.ok) {
    return {
      ok: false,
      failure: workResult.failure,
    };
  }

  const failure = validateWorkExecution(state, workResult.definition, session.work.selectedCharacterId, session.work.selectedAssistantId);
  if (failure) {
    return {
      ok: false,
      failure,
    };
  }

  const calculatedResult = calculateWorkResult(workResult.definition, session.work.selectedCharacterId!, state, session.work.selectedAssistantId);
  const stateAfterWork = applyWorkResult(state, calculatedResult);
  const sessionAfterWork: GameSession = {
    ...session,
    work: initialWorkSessionState,
  };
  const turn = workResult.definition.completesTimeBlock ? endTurn(stateAfterWork, sessionAfterWork) : undefined;

  if (turn) {
    return {
      ok: true,
      state: turn.state,
      session: turn.session,
      message: `${workResult.definition.label} 업무를 완료했습니다.`,
      effects: [
        logEffect(`${workResult.definition.label} 업무 결과를 반영했습니다.`, 'success'),
        ...turn.effects,
      ],
    };
  }

  return {
    ok: true,
    state: stateAfterWork,
    session: sessionAfterWork,
    message: `${workResult.definition.label} 업무를 완료했습니다.`,
  };
}

export function cancelWork(session: GameSession): GameSession {
  return {
    ...session,
    work: initialWorkSessionState,
    ui: {
      ...session.ui,
      route: 'mainMenu',
      choices: [],
    },
  };
}
