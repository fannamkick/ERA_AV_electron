import type { GameState } from './state';

export const GAME_SAVE_SCHEMA_VERSION = 1;

export type GameSavePayload = {
  readonly schemaVersion: typeof GAME_SAVE_SCHEMA_VERSION;
  readonly state: GameState;
  readonly metadata: {
    readonly source: 'web-port-next';
    readonly savedAt: string;
  };
};

export function createGameSavePayload(state: GameState, savedAt: Date = new Date()): GameSavePayload {
  return {
    schemaVersion: GAME_SAVE_SCHEMA_VERSION,
    state,
    metadata: {
      source: 'web-port-next',
      savedAt: savedAt.toISOString(),
    },
  };
}

export type GameSavePayloadFailure = {
  readonly code: string;
  readonly message: string;
};

export type ParseGameSavePayloadResult =
  | {
      readonly ok: true;
      readonly payload: GameSavePayload;
    }
  | {
      readonly ok: false;
      readonly failure: GameSavePayloadFailure;
    };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isValidDateString(value: unknown): boolean {
  return typeof value === 'string' && value.length > 0 && !Number.isNaN(Date.parse(value));
}

export function serializeGameSavePayload(payload: GameSavePayload): string {
  return JSON.stringify(payload, null, 2);
}

export function serializeGameState(state: GameState, savedAt: Date = new Date()): string {
  return serializeGameSavePayload(createGameSavePayload(state, savedAt));
}

export function parseGameSavePayload(serializedPayload: string): ParseGameSavePayloadResult {
  if (serializedPayload.trim().length === 0) {
    return {
      ok: false,
      failure: {
        code: 'empty-save-payload',
        message: '저장 데이터가 비어 있습니다.',
      },
    };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(serializedPayload);
  } catch {
    return {
      ok: false,
      failure: {
        code: 'invalid-save-json',
        message: '저장 데이터를 JSON으로 읽을 수 없습니다.',
      },
    };
  }

  if (!isRecord(parsed)) {
    return {
      ok: false,
      failure: {
        code: 'invalid-save-payload',
        message: '저장 payload는 객체여야 합니다.',
      },
    };
  }

  if (parsed.schemaVersion !== GAME_SAVE_SCHEMA_VERSION) {
    return {
      ok: false,
      failure: {
        code: typeof parsed.schemaVersion === 'number' && parsed.schemaVersion > GAME_SAVE_SCHEMA_VERSION
          ? 'unsupported-future-save-schema'
          : 'invalid-save-schema',
        message: `지원하지 않는 저장 schemaVersion입니다: ${String(parsed.schemaVersion)}`,
      },
    };
  }

  if (!isRecord(parsed.metadata)) {
    return {
      ok: false,
      failure: {
        code: 'invalid-save-metadata',
        message: '저장 metadata가 없습니다.',
      },
    };
  }

  if (parsed.metadata.source !== 'web-port-next') {
    return {
      ok: false,
      failure: {
        code: 'invalid-save-source',
        message: '저장 metadata.source가 web-port-next가 아닙니다.',
      },
    };
  }

  if (!isValidDateString(parsed.metadata.savedAt)) {
    return {
      ok: false,
      failure: {
        code: 'invalid-save-date',
        message: '저장 metadata.savedAt이 유효한 날짜가 아닙니다.',
      },
    };
  }

  if (!isRecord(parsed.state)) {
    return {
      ok: false,
      failure: {
        code: 'invalid-save-state',
        message: '저장 payload.state가 없습니다.',
      },
    };
  }

  const stateObj = parsed.state;
  const requiredStateKeys = ['people', 'body', 'economy', 'run', 'inventory', 'work', 'social', 'equipment', 'featureState'];
  for (const key of requiredStateKeys) {
    if (!isRecord(stateObj[key])) {
      return {
        ok: false,
        failure: {
          code: 'invalid-save-state-domain',
          message: `저장 payload.state 내에 유효한 '${key}' 도메인이 누락되었거나 객체가 아닙니다.`,
        },
      };
    }
  }

  return {
    ok: true,
    payload: parsed as GameSavePayload,
  };
}
