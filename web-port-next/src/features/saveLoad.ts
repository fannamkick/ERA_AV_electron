import { initialSaveLoadSessionState } from '../domains/save/types';
import { validateSavePayloadBoundary, validateStateSessionBoundary } from '../game/boundaries';
import { logEffect, type GameEffect } from '../game/effects';
import type { GameActionFailure } from '../game/results';
import { parseGameSavePayload, serializeGameState } from '../game/savePayload';
import { initialGameSession, type GameSession, type GameState } from '../game/state';
import type { SaveLoadView } from '../game/views';

export type SaveSnapshotResult = {
  readonly session: GameSession;
  readonly effects: readonly GameEffect[];
};

export type LoadSnapshotResult =
  | {
      readonly ok: true;
      readonly state: GameState;
      readonly session: GameSession;
      readonly effects: readonly GameEffect[];
    }
  | {
      readonly ok: false;
      readonly failure: GameActionFailure;
    };

function boundaryFailure(message: string): GameActionFailure {
  return {
    code: 'invalid-save-payload',
    message,
  };
}

function loadedGameSession(): GameSession {
  return {
    ...initialGameSession,
    saveLoad: initialSaveLoadSessionState,
    ui: {
      ...initialGameSession.ui,
      route: 'mainMenu',
    },
  };
}

export function buildSaveLoadView(state: GameState, session: GameSession): SaveLoadView {
  return {
    kind: 'saveLoad',
    route: 'saveLoad',
    mode: session.saveLoad.mode,
    schemaVersion: state.runtime.saveVersion,
    currentMoney: state.economy.account.currentMoney,
    month: state.run.clock.month,
    week: state.run.clock.week,
    turn: state.run.clock.turn,
    snapshotText: session.saveLoad.snapshotText,
    loadText: session.saveLoad.loadText,
    lastSnapshotAt: session.saveLoad.lastSnapshotAt,
  };
}

export function openSaveLoadSession(session: GameSession, mode: 'save' | 'load'): GameSession {
  return {
    ...session,
    saveLoad: {
      ...initialSaveLoadSessionState,
      mode,
    },
    ui: {
      ...session.ui,
      route: 'saveLoad',
      choices: [],
    },
  };
}

export function updateSaveLoadText(session: GameSession, text: string): GameSession {
  return {
    ...session,
    saveLoad: {
      ...session.saveLoad,
      loadText: text,
    },
  };
}

export function createSaveSnapshot(state: GameState, session: GameSession, savedAt: Date = new Date()): SaveSnapshotResult {
  const snapshotText = serializeGameState(state, savedAt);
  const savedAtText = savedAt.toISOString();

  return {
    session: {
      ...session,
      saveLoad: {
        snapshotText,
        loadText: snapshotText,
        lastSnapshotAt: savedAtText,
      },
    },
    effects: [logEffect(`저장 스냅샷을 생성했습니다: ${savedAtText}`, 'success')],
  };
}

export function loadSaveSnapshot(session: GameSession): LoadSnapshotResult {
  const parsed = parseGameSavePayload(session.saveLoad.loadText);
  if (!parsed.ok) {
    return {
      ok: false,
      failure: parsed.failure,
    };
  }

  const payloadDiagnostics = validateSavePayloadBoundary(parsed.payload);
  const payloadErrors = payloadDiagnostics.filter((diagnostic) => diagnostic.severity === 'error');
  if (payloadErrors.length > 0) {
    return {
      ok: false,
      failure: boundaryFailure(payloadErrors.map((error) => error.message).join(' ')),
    };
  }

  const nextSession = loadedGameSession();
  const stateDiagnostics = validateStateSessionBoundary(parsed.payload.state, nextSession);
  const stateErrors = stateDiagnostics.filter((diagnostic) => diagnostic.severity === 'error');
  if (stateErrors.length > 0) {
    return {
      ok: false,
      failure: boundaryFailure(stateErrors.map((error) => error.message).join(' ')),
    };
  }

  return {
    ok: true,
    state: parsed.payload.state,
    session: nextSession,
    effects: [logEffect(`저장 데이터를 불러왔습니다: ${parsed.payload.metadata.savedAt}`, 'success')],
  };
}

export function cancelSaveLoad(session: GameSession): GameSession {
  return {
    ...session,
    saveLoad: initialSaveLoadSessionState,
    ui: {
      ...session.ui,
      route: 'mainMenu',
      choices: [],
    },
  };
}
