import type { CharacterTemplate } from '../catalog/types';
import type { CharacterBodyState } from '../domains/body/types';

const bodyBaseStatIds = new Set(['7', '8', '9', '11', '12', '13', '30', '32', '33', '34', '35', '50', '60', '61']);
const bodyMaxBaseStatIds = new Set(['11', '12']);
const bodyConditionFlagIds = new Set([
  '20',
  '30',
  '32',
  '36',
  '38',
  '60',
  '70',
  '74',
  '97',
  '99',
  '100',
  '101',
  '102',
  '106',
  '115',
  '121',
  '122',
  '123',
  '124',
  '136',
  '138',
  '165',
  '166',
  '580',
  '604',
  '610',
  '617',
  '618',
  '620',
  '623',
  '624',
  '627',
  '628',
  '629',
  '630',
  '651',
  '672',
  '690',
  '700',
  '701',
  '703',
  '709',
  '712',
  '720',
  '722',
  '760',
  '825',
  '826',
  '835',
  '836',
]);

export const equipmentAvailabilityFlagIds = new Set([
  '48',
  '54',
  '56',
  '68',
  '83',
  '84',
  '146',
  '174',
  '175',
  '176',
  '177',
  '178',
  '179',
  '180',
  '304',
  '305',
  '614',
]);

function pickNumberRecord(
  source: Record<string, number>,
  include: ReadonlySet<string>,
): Record<string, number> {
  return Object.fromEntries(Object.entries(source).filter(([id]) => include.has(id)));
}

export function createPeopleBaseStatsFromTemplate(template: CharacterTemplate): Record<string, number> {
  return Object.fromEntries(Object.entries(template.initialState.baseStats).filter(([id]) => !bodyBaseStatIds.has(id)));
}

export function createBodyStateFromTemplate(template: CharacterTemplate): CharacterBodyState {
  const baseStats = pickNumberRecord(template.initialState.baseStats, bodyBaseStatIds);

  return {
    anatomyTags: [],
    baseStats,
    maxBaseStats: pickNumberRecord(baseStats, bodyMaxBaseStatIds),
    bodyStats: {
      ...baseStats,
      stamina: template.initialState.baseStats['0'] ?? 0,
      energy: template.initialState.baseStats['1'] ?? 0,
    },
    reproduction: {},
    sexualHistory: {},
    appearance: {},
    conditionParams: {},
    trainingResources: {},
    imprints: {},
    conditionFlags: pickNumberRecord(template.initialState.characterFlags, bodyConditionFlagIds),
    contamination: {},
    milestones: {},
    legacyBodyFlagsNeedingMapping: {},
  };
}

export function createBodyLegacyFlagsFromTemplate(template: CharacterTemplate): Record<string, number> {
  return pickNumberRecord(template.initialState.characterFlags, bodyConditionFlagIds);
}

export function createEquipmentAvailabilityFlagsFromTemplate(template: CharacterTemplate): Record<string, number> {
  return pickNumberRecord(template.initialState.characterFlags, equipmentAvailabilityFlagIds);
}

export function createUnmappedLegacyCharacterFlags(template: CharacterTemplate): Record<string, number> {
  return Object.fromEntries(
    Object.entries(template.initialState.characterFlags).filter(
      ([id]) => !bodyConditionFlagIds.has(id) && !equipmentAvailabilityFlagIds.has(id),
    ),
  );
}

export function applyBodyStatDeltas(
  body: CharacterBodyState | undefined,
  deltas: Record<string, number>,
): CharacterBodyState | undefined {
  if (!body) {
    return body;
  }

  const nextBodyStats = { ...body.bodyStats };
  for (const [statId, delta] of Object.entries(deltas)) {
    nextBodyStats[statId] = (nextBodyStats[statId] ?? 0) + delta;
  }

  return {
    ...body,
    bodyStats: nextBodyStats,
  };
}

export function applyConditionParamDeltas(
  body: CharacterBodyState,
  deltas: Record<string, { readonly up: number; readonly down: number }>,
): CharacterBodyState {
  const nextConditionParams = { ...body.conditionParams };
  for (const [paramId, delta] of Object.entries(deltas)) {
    nextConditionParams[paramId] = (nextConditionParams[paramId] ?? 0) + delta.up - delta.down;
  }

  return {
    ...body,
    conditionParams: nextConditionParams,
  };
}

export function applyTrainingResourceDeltas(
  body: CharacterBodyState,
  deltas: Record<string, number>,
): CharacterBodyState {
  const nextTrainingResources = { ...body.trainingResources };
  for (const [resourceId, delta] of Object.entries(deltas)) {
    nextTrainingResources[resourceId] = (nextTrainingResources[resourceId] ?? 0) + delta;
  }

  return {
    ...body,
    trainingResources: nextTrainingResources,
  };
}
