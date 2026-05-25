import { getFilmingSceneDefinition } from '../catalog/lookup';
import type { CatalogId, FilmingSceneDefinition, GameDefinitions } from '../catalog/types';
import { initialShootingSessionState } from '../domains/shootingSession/types';
import { logEffect, type GameEffect } from '../game/effects';
import type { GameSession, GameState } from '../game/state';
import type { ShootingSceneView, ShootingTargetView, ShootingView } from '../game/views';
import { applyBodyStatDeltas } from './bodyStats';
import { isCharacterActive } from './characterLifecycle';
import { endTurn } from './turnEnd';

export type ShootingFailure = {
  readonly code: string;
  readonly message: string;
};

export type ShootingCalculatedResult = {
  readonly sceneId: CatalogId;
  readonly sceneLabel: string;
  readonly characterId: string;
  readonly assistantCharacterId?: string;
  readonly sourceFile?: string;
  readonly sourceLabel?: string;
  readonly revenueMoney: number;
  readonly fanGain: number;
  readonly score: number;
  readonly filmingAmount: number;
  readonly bodyStatDeltas: Record<string, number>;
  readonly experienceDeltas: Record<CatalogId, number>;
};

export type ShootingUpdateResult =
  | {
      readonly ok: true;
      readonly state: GameState;
      readonly session: GameSession;
      readonly message: string;
      readonly effects?: readonly GameEffect[];
    }
  | {
      readonly ok: false;
      readonly failure: ShootingFailure;
    };

function sceneDisabledReason(state: GameState, scene: FilmingSceneDefinition): string | undefined {
  if (!scene.defaultAvailable && state.work.brothelFlags[`visible:${scene.id}`] !== true) {
    return 'Filming scene is not available yet.';
  }

  return undefined;
}

function targetDisabledReason(state: GameState, characterId: string): string | undefined {
  const character = state.people.characters[characterId];
  if (!character) {
    return 'Target character does not exist.';
  }

  if (!isCharacterActive(character)) {
    return 'Inactive characters cannot be selected for filming.';
  }

  if (!state.body.byCharacterId[characterId]) {
    return 'Target body state is missing.';
  }

  return undefined;
}

export function computeVisibleShootingCharacterIds(state: GameState): readonly string[] {
  return Object.keys(state.people.characters).sort();
}

export function computeVisibleFilmingSceneIds(definitions: GameDefinitions, state: GameState): readonly CatalogId[] {
  return Object.values(definitions.filmingSceneDefinitions)
    .filter((scene) => scene.defaultAvailable || state.work.brothelFlags[`visible:${scene.id}`] === true)
    .map((scene) => scene.id)
    .sort();
}

function targetViewFromState(state: GameState, characterId: string): ShootingTargetView | undefined {
  const character = state.people.characters[characterId];
  if (!character) {
    return undefined;
  }

  const disabledReason = targetDisabledReason(state, characterId);

  return {
    characterId,
    label: character.identity.displayName,
    available: disabledReason === undefined,
    disabledReason,
  };
}

function sceneViewFromDefinition(state: GameState, scene: FilmingSceneDefinition): ShootingSceneView {
  const disabledReason = sceneDisabledReason(state, scene);

  return {
    sceneId: scene.id,
    label: scene.label,
    revenueMoney: scene.revenueMoney,
    fanGain: scene.fanGain,
    score: scene.score,
    filmingAmount: scene.filmingAmount,
    completesTimeBlock: scene.completesTimeBlock,
    available: disabledReason === undefined,
    disabledReason,
  };
}

function sceneNumericId(sceneId: CatalogId): number {
  const match = sceneId.match(/(\d+)$/u);
  return match ? Number(match[1]) : 0;
}

function buildSceneTemporaryValues(scene: FilmingSceneDefinition): Record<string, number> {
  return {
    slot_0: scene.filmingAmount,
    slot_1: scene.revenueMoney,
    slot_2: scene.fanGain,
    slot_5: scene.score,
    slot_10: scene.bodyStatDeltas.stamina ?? 0,
    slot_11: scene.bodyStatDeltas.energy ?? 0,
    slot_22: sceneNumericId(scene.id),
    slot_30: Object.values(scene.experienceDeltas).reduce((sum, value) => sum + value, 0),
    slot_51: scene.completesTimeBlock ? 1 : 0,
    slot_73: scene.defaultAvailable ? 1 : 0,
  };
}

function buildSceneFlags(scene: FilmingSceneDefinition): Record<string, boolean | number | string> {
  const sceneId = sceneNumericId(scene.id);
  return {
    flag_32: sceneId,
    flag_70: scene.filmingAmount,
    flag_132: scene.revenueMoney,
    flag_137: scene.fanGain,
    flag_160: scene.score,
    flag_180: scene.label,
    flag_700: scene.source.originalId ?? scene.id,
  };
}

function buildFilmingProgressFlags(result: ShootingCalculatedResult): Record<string, boolean | number | string> {
  return {
    flag_120: result.revenueMoney,
    flag_121: result.fanGain,
    flag_122: result.score,
    flag_123: result.filmingAmount,
    flag_124: result.sceneId,
    flag_125: result.characterId,
    flag_126: result.sourceLabel ?? result.sceneLabel,
    flag_560: result.sceneId,
    flag_641: result.revenueMoney,
    flag_642: result.fanGain,
    flag_643: result.score,
    flag_731: result.sceneId,
    flag_732: result.sceneLabel,
    flag_733: result.sourceFile ?? '',
    flag_734: result.sourceLabel ?? '',
    ...(result.assistantCharacterId ? { assistantId: result.assistantCharacterId } : {}),
  };
}

export function buildShootingView(definitions: GameDefinitions, state: GameState, session: GameSession): ShootingView {
  const visibleCharacterIds =
    session.shooting.visibleCharacterIds.length > 0
      ? session.shooting.visibleCharacterIds
      : computeVisibleShootingCharacterIds(state);
  const visibleSceneIds =
    session.shooting.visibleSceneIds.length > 0
      ? session.shooting.visibleSceneIds
      : computeVisibleFilmingSceneIds(definitions, state);
  const visibleTargets = visibleCharacterIds
    .map((characterId) => targetViewFromState(state, characterId))
    .filter((target): target is ShootingTargetView => Boolean(target));
  const visibleScenes = visibleSceneIds
    .map((sceneId) => getFilmingSceneDefinition(definitions, sceneId))
    .filter((result): result is { readonly ok: true; readonly definition: FilmingSceneDefinition } => result.ok)
    .map((result) => sceneViewFromDefinition(state, result.definition));
  const selectedTarget =
    session.shooting.selectedCharacterId !== undefined
      ? visibleTargets.find((target) => target.characterId === session.shooting.selectedCharacterId)
      : undefined;
  const selectedScene =
    session.shooting.selectedSceneId !== undefined
      ? visibleScenes.find((scene) => scene.sceneId === session.shooting.selectedSceneId)
      : undefined;

  return {
    kind: 'shooting',
    route: 'shooting',
    currentMoney: state.economy.account.currentMoney,
    visibleTargets,
    selectedCharacterId: session.shooting.selectedCharacterId,
    selectedTarget,
    visibleScenes,
    selectedSceneId: session.shooting.selectedSceneId,
    selectedScene,
    filmingAmount: session.shooting.filmingAmount,
  };
}

export function createShootingSession(definitions: GameDefinitions, state: GameState) {
  return {
    selectedCharacterId: undefined,
    selectedSceneId: undefined,
    visibleCharacterIds: computeVisibleShootingCharacterIds(state),
    visibleSceneIds: computeVisibleFilmingSceneIds(definitions, state),
    filmingAmount: 0,
    sceneTemporaryValues: {},
    sceneFlags: {},
  };
}

export function selectShootingTarget(state: GameState, session: GameSession, characterId: string): ShootingUpdateResult {
  if (!state.people.characters[characterId]) {
    return {
      ok: false,
      failure: {
        code: 'shooting-target-not-found',
        message: `Filming target not found: ${characterId}`,
      },
    };
  }

  if (session.shooting.visibleCharacterIds.length > 0 && !session.shooting.visibleCharacterIds.includes(characterId)) {
    return {
      ok: false,
      failure: {
        code: 'shooting-target-not-in-session',
        message: `Filming target is not in the current session: ${characterId}`,
      },
    };
  }

  const disabledReason = targetDisabledReason(state, characterId);
  if (disabledReason) {
    return {
      ok: false,
      failure: {
        code: 'shooting-target-unavailable',
        message: disabledReason,
      },
    };
  }

  return {
    ok: true,
    state,
    session: {
      ...session,
      shooting: {
        ...session.shooting,
        selectedCharacterId: characterId,
      },
    },
    message: `${state.people.characters[characterId].identity.displayName} selected as filming target.`,
  };
}

export function selectShootingScene(
  definitions: GameDefinitions,
  state: GameState,
  session: GameSession,
  sceneId: CatalogId,
): ShootingUpdateResult {
  const sceneResult = getFilmingSceneDefinition(definitions, sceneId);
  if (!sceneResult.ok) {
    return {
      ok: false,
      failure: sceneResult.failure,
    };
  }

  if (session.shooting.visibleSceneIds.length > 0 && !session.shooting.visibleSceneIds.includes(sceneId)) {
    return {
      ok: false,
      failure: {
        code: 'shooting-scene-not-in-session',
        message: `Filming scene is not in the current session: ${sceneId}`,
      },
    };
  }

  const disabledReason = sceneDisabledReason(state, sceneResult.definition);
  if (disabledReason) {
    return {
      ok: false,
      failure: {
        code: 'shooting-scene-unavailable',
        message: disabledReason,
      },
    };
  }

  return {
    ok: true,
    state,
    session: {
      ...session,
      shooting: {
        ...session.shooting,
        selectedSceneId: sceneResult.definition.id,
        filmingAmount: sceneResult.definition.filmingAmount,
        sceneTemporaryValues: buildSceneTemporaryValues(sceneResult.definition),
        sceneFlags: buildSceneFlags(sceneResult.definition),
      },
    },
    message: `${sceneResult.definition.label} selected as filming scene.`,
  };
}

function validateShootingExecution(
  state: GameState,
  scene: FilmingSceneDefinition,
  characterId: string,
): ShootingFailure | undefined {
  const targetReason = targetDisabledReason(state, characterId);
  if (targetReason) {
    return {
      code: 'shooting-target-unavailable',
      message: targetReason,
    };
  }

  const sceneReason = sceneDisabledReason(state, scene);
  if (sceneReason) {
    return {
      code: 'shooting-scene-unavailable',
      message: sceneReason,
    };
  }

  return undefined;
}

export function calculateShootingResult(
  scene: FilmingSceneDefinition,
  characterId: string,
  assistantCharacterId?: string,
): ShootingCalculatedResult {
  return {
    sceneId: scene.id,
    sceneLabel: scene.label,
    characterId,
    assistantCharacterId,
    sourceFile: scene.source.path.split(/[\\/]/u).pop(),
    sourceLabel: scene.source.originalName ?? scene.source.originalId,
    revenueMoney: scene.revenueMoney,
    fanGain: scene.fanGain,
    score: scene.score,
    filmingAmount: scene.filmingAmount,
    bodyStatDeltas: { ...scene.bodyStatDeltas },
    experienceDeltas: { ...scene.experienceDeltas },
  };
}

export function applyShootingResult(state: GameState, result: ShootingCalculatedResult): GameState {
  const character = state.people.characters[result.characterId];
  const currentCareerFlags = state.work.careerFlagsByCharacterId[result.characterId] ?? {};
  const currentFilming = state.work.filmingByCharacterId[result.characterId] ?? {
    sales: 0,
    fanCount: 0,
  };
  const nextExperiences = { ...(character?.attributes.experiences ?? {}) };
  for (const [experienceId, delta] of Object.entries(result.experienceDeltas)) {
    nextExperiences[experienceId] = (nextExperiences[experienceId] ?? 0) + delta;
  }

  return {
    ...state,
    economy: {
      ...state.economy,
      account: {
        currentMoney: state.economy.account.currentMoney + result.revenueMoney,
      },
      videoSalesTotal: state.economy.videoSalesTotal + result.revenueMoney,
      accountingEntries: [
        ...state.economy.accountingEntries,
        `filming:${result.sceneId}:character:${result.characterId}:revenue:${result.revenueMoney}`,
      ],
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
      filmingProgressFlags: {
        ...state.work.filmingProgressFlags,
        ...buildFilmingProgressFlags(result),
      },
      filmingByCharacterId: {
        ...state.work.filmingByCharacterId,
        [result.characterId]: {
          title: result.sceneLabel,
          sales: currentFilming.sales + result.revenueMoney,
          fanCount: currentFilming.fanCount + result.fanGain,
          latestReleaseId: result.sceneId,
        },
      },
      careerFlagsByCharacterId: {
        ...state.work.careerFlagsByCharacterId,
        [result.characterId]: {
          ...currentCareerFlags,
          'filming.debuted': true,
          ...(result.assistantCharacterId ? { 'filming.assistantId': result.assistantCharacterId } : {}),
          'filming.latestScore': result.score,
          'filming.bestScore': Math.max((currentCareerFlags['filming.bestScore'] as number | undefined) ?? 0, result.score),
          [`${result.sceneId}.completedCount`]: ((currentCareerFlags[`${result.sceneId}.completedCount`] as number | undefined) ?? 0) + 1,
        },
      },
    },
  };
}

export function confirmShootingScene(
  definitions: GameDefinitions,
  state: GameState,
  session: GameSession,
): ShootingUpdateResult {
  const selectedCharacterId = session.shooting.selectedCharacterId;
  if (!selectedCharacterId) {
    return {
      ok: false,
      failure: {
        code: 'shooting-target-required',
        message: 'Select a filming target before confirming.',
      },
    };
  }

  const selectedSceneId = session.shooting.selectedSceneId;
  if (!selectedSceneId) {
    return {
      ok: false,
      failure: {
        code: 'shooting-scene-required',
        message: 'Select a filming scene before confirming.',
      },
    };
  }

  const sceneResult = getFilmingSceneDefinition(definitions, selectedSceneId);
  if (!sceneResult.ok) {
    return {
      ok: false,
      failure: sceneResult.failure,
    };
  }

  const failure = validateShootingExecution(state, sceneResult.definition, selectedCharacterId);
  if (failure) {
    return {
      ok: false,
      failure,
    };
  }

  const calculatedResult = calculateShootingResult(
    sceneResult.definition,
    selectedCharacterId,
    session.interaction.participants.assistantId,
  );
  let stateAfterShooting = applyShootingResult(state, calculatedResult);

  const currentClock = stateAfterShooting.run.clock;
  let nextDay = currentClock.day + 7;
  let nextWeek = currentClock.week + 1;
  let nextMonth = currentClock.month;
  let nextYear = currentClock.year;

  if (nextWeek > 4) {
    nextWeek = 1;
    nextMonth += 1;
    if (nextMonth > 12) {
      nextMonth = 1;
      nextYear += 1;
    }
  }

  stateAfterShooting = {
    ...stateAfterShooting,
    run: {
      ...stateAfterShooting.run,
      clock: {
        ...currentClock,
        day: nextDay,
        week: nextWeek,
        month: nextMonth,
        year: nextYear,
        dayCounters: {
          ...currentClock.dayCounters,
          counter_0: nextDay,
          counter_3: nextMonth,
        },
      },
    },
  };
  const sessionAfterShooting: GameSession = {
    ...session,
    shooting: initialShootingSessionState,
  };
  const turn = sceneResult.definition.completesTimeBlock ? endTurn(stateAfterShooting, sessionAfterShooting) : undefined;

  if (turn) {
    return {
      ok: true,
      state: turn.state,
      session: turn.session,
      message: `${sceneResult.definition.label} filming completed.`,
      effects: [
        logEffect(`${sceneResult.definition.label} filming result applied.`, 'success'),
        ...turn.effects,
      ],
    };
  }

  return {
    ok: true,
    state: stateAfterShooting,
    session: sessionAfterShooting,
    message: `${sceneResult.definition.label} filming completed.`,
  };
}

export function cancelShootingSelection(session: GameSession): GameSession {
  return {
    ...session,
    shooting: {
      ...session.shooting,
      selectedCharacterId: undefined,
      selectedSceneId: undefined,
      filmingAmount: 0,
      sceneTemporaryValues: {},
      sceneFlags: {},
    },
  };
}

export function cancelShooting(session: GameSession): GameSession {
  return {
    ...session,
    shooting: initialShootingSessionState,
    ui: {
      ...session.ui,
      route: 'mainMenu',
      choices: [],
    },
  };
}
