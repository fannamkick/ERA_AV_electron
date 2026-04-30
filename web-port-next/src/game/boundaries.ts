import type { GameActionContext, GameActionResult } from './results';
import { GAME_SAVE_SCHEMA_VERSION, type GameSavePayload } from './savePayload';
import type { GameSession, GameState } from './state';

export type BoundaryDiagnostic = {
  readonly severity: 'ok' | 'error';
  readonly message: string;
};

const forbiddenSavePayloadKeys = ['catalog', 'definitions', 'initialCatalog', 'session', 'view', 'views'] as const;
const allowedSavePayloadKeys = ['schemaVersion', 'state', 'metadata'] as const;
const requiredStateKeys = [
  'runtime',
  'save',
  'settings',
  'meta',
  'run',
  'world',
  'mission',
  'people',
  'social',
  'body',
  'text',
  'economy',
  'inventory',
  'equipment',
  'shop',
  'work',
  'featureState',
] as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function hasOwnKey(value: Record<string, unknown>, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(value, key);
}

function okIfEmpty(diagnostics: readonly BoundaryDiagnostic[], message: string): readonly BoundaryDiagnostic[] {
  if (diagnostics.length > 0) {
    return diagnostics;
  }

  return [{ severity: 'ok', message }];
}

function collectForbiddenKeys(
  value: unknown,
  path: string,
  diagnostics: BoundaryDiagnostic[],
  seen: WeakSet<object> = new WeakSet(),
): void {
  if (Array.isArray(value)) {
    if (seen.has(value)) return;
    seen.add(value);
    value.forEach((entry, index) => collectForbiddenKeys(entry, `${path}[${index}]`, diagnostics, seen));
    return;
  }

  if (!isRecord(value)) {
    return;
  }

  if (seen.has(value)) {
    return;
  }
  seen.add(value);

  for (const [key, entry] of Object.entries(value)) {
    if (forbiddenSavePayloadKeys.includes(key as (typeof forbiddenSavePayloadKeys)[number])) {
      diagnostics.push({ severity: 'error', message: `Save payload must not include runtime-only key: ${path}.${key}.` });
    }
    collectForbiddenKeys(entry, `${path}.${key}`, diagnostics, seen);
  }
}

function isValidDateString(value: unknown): boolean {
  return typeof value === 'string' && value.length > 0 && !Number.isNaN(Date.parse(value));
}

export function validateStateSessionBoundary(state: GameState, session: GameSession): readonly BoundaryDiagnostic[] {
  const diagnostics: BoundaryDiagnostic[] = [];

  if (!isRecord(state.inventory.itemCounts)) {
    diagnostics.push({ severity: 'error', message: 'GameState.inventory.itemCounts must be an itemId -> count record.' });
  }

  if (!isRecord(state.shop.progress)) {
    diagnostics.push({ severity: 'error', message: 'GameState.shop.progress must own only persistent shop progress.' });
  }

  if (!Array.isArray(session.shop.visibleListingIds)) {
    diagnostics.push({ severity: 'error', message: 'GameSession.shop.visibleListingIds must remain session/view state.' });
  }

  if (!Array.isArray(session.shop.visibleUseItemIds)) {
    diagnostics.push({ severity: 'error', message: 'GameSession.shop.visibleUseItemIds must remain session/view state.' });
  }

  if (typeof session.shop.quantity !== 'number') {
    diagnostics.push({ severity: 'error', message: 'GameSession.shop.quantity must remain a numeric session selection.' });
  }

  if (!Array.isArray(session.recruit.visibleListingIds)) {
    diagnostics.push({ severity: 'error', message: 'GameSession.recruit.visibleListingIds must remain session/view state.' });
  }

  if (!Array.isArray(session.mission.visibleMissionIds)) {
    diagnostics.push({ severity: 'error', message: 'GameSession.mission.visibleMissionIds must remain session/view state.' });
  }

  if (typeof session.saveLoad.snapshotText !== 'string' || typeof session.saveLoad.loadText !== 'string') {
    diagnostics.push({ severity: 'error', message: 'GameSession.saveLoad must own only transient save/load text.' });
  }

  if (!Array.isArray(session.visit.visiblePlaceIds) || !Array.isArray(session.visit.visibleActionIds)) {
    diagnostics.push({ severity: 'error', message: 'GameSession.visit must own only current visit selection and visible choices.' });
  }

  if (!Array.isArray(session.work.visibleWorkIds) || !Array.isArray(session.work.eligibleCharacterIds)) {
    diagnostics.push({ severity: 'error', message: 'GameSession.work must own only current work selection and visible choices.' });
  }

  if (!Array.isArray(session.shooting.visibleCharacterIds) || !Array.isArray(session.shooting.visibleSceneIds)) {
    diagnostics.push({ severity: 'error', message: 'GameSession.shooting must own only current filming selection and visible choices.' });
  }

  if (typeof session.shooting.filmingAmount !== 'number') {
    diagnostics.push({ severity: 'error', message: 'GameSession.shooting.filmingAmount must remain a session calculation buffer.' });
  }

  if (!isRecord(session.interaction.sources) || !isRecord(session.interaction.paramDeltas) || !isRecord(session.interaction.baseLoss)) {
    diagnostics.push({ severity: 'error', message: 'GameSession.interaction must own training calculation buffers.' });
  }

  if (!isRecord(session.interaction.commandFlow) || !isRecord(session.interaction.participants)) {
    diagnostics.push({ severity: 'error', message: 'GameSession.interaction must own current training command flow and participants.' });
  }

  return okIfEmpty(diagnostics, 'GameState and GameSession boundaries are structurally separated.');
}

export function validateActionResultBoundary(
  context: GameActionContext,
  result: GameActionResult,
): readonly BoundaryDiagnostic[] {
  const diagnostics: BoundaryDiagnostic[] = [];

  if (result.route !== result.session.ui.route) {
    diagnostics.push({ severity: 'error', message: 'GameActionResult.route must match next session.ui.route.' });
  }

  if (result.status === 'failure' && result.state !== context.state) {
    diagnostics.push({ severity: 'error', message: 'Failed actions must preserve the previous save state reference.' });
  }

  return okIfEmpty(diagnostics, 'GameActionResult keeps state, session, route, and effects separated.');
}

export function validateSavePayloadBoundary(payload: GameSavePayload | unknown): readonly BoundaryDiagnostic[] {
  const diagnostics: BoundaryDiagnostic[] = [];

  if (!isRecord(payload)) {
    return [{ severity: 'error', message: 'Save payload must be an object.' }];
  }

  for (const key of forbiddenSavePayloadKeys) {
    if (hasOwnKey(payload, key)) {
      diagnostics.push({ severity: 'error', message: `Save payload must not include runtime-only key: ${key}.` });
    }
  }

  for (const key of Object.keys(payload)) {
    if (!allowedSavePayloadKeys.includes(key as (typeof allowedSavePayloadKeys)[number])) {
      diagnostics.push({ severity: 'error', message: `Save payload contains unknown top-level key: ${key}.` });
    }
  }

  if (!hasOwnKey(payload, 'state')) {
    diagnostics.push({ severity: 'error', message: 'Save payload must include GameState under the state key.' });
  }

  if (payload.schemaVersion !== GAME_SAVE_SCHEMA_VERSION) {
    diagnostics.push({ severity: 'error', message: `Save payload schemaVersion must be ${GAME_SAVE_SCHEMA_VERSION}.` });
  }

  const metadata = payload.metadata;
  if (!isRecord(metadata)) {
    diagnostics.push({ severity: 'error', message: 'Save payload metadata must be an object.' });
  } else {
    if (metadata.source !== 'web-port-next') {
      diagnostics.push({ severity: 'error', message: 'Save payload metadata.source must be web-port-next.' });
    }

    if (!isValidDateString(metadata.savedAt)) {
      diagnostics.push({ severity: 'error', message: 'Save payload metadata.savedAt must be a valid date string.' });
    }
  }

  const state = payload.state;
  if (isRecord(state)) {
    for (const key of requiredStateKeys) {
      if (!hasOwnKey(state, key)) {
        diagnostics.push({ severity: 'error', message: `GameState is missing required key: ${key}.` });
      }
    }

    for (const key of forbiddenSavePayloadKeys) {
      if (hasOwnKey(state, key)) {
        diagnostics.push({ severity: 'error', message: `GameState must not include runtime-only key: ${key}.` });
      }
    }

    collectForbiddenKeys(state, 'state', diagnostics);
  } else if (hasOwnKey(payload, 'state')) {
    diagnostics.push({ severity: 'error', message: 'Save payload state must be an object.' });
  }

  return okIfEmpty(diagnostics, 'Save payload contains state and metadata only.');
}
