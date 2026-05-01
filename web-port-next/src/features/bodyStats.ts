import type { CharacterTemplate } from '../catalog/types';
import type { CharacterBodyState } from '../domains/body/types';
import { splitLegacyCharacterFlags } from './socialEquipmentCflag';

const bodyBaseStatIds = new Set(['7', '8', '9', '11', '12', '13', '30', '32', '33', '34', '35', '50', '60', '61']);
const bodyMaxBaseStatIds = new Set(['11', '12']);

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
    conditionFlags: splitLegacyCharacterFlags(template).bodyConditionFlags,
    contamination: {},
    milestones: {},
    legacyBodyFlagsNeedingMapping: {},
  };
}

export function createBodyLegacyFlagsFromTemplate(template: CharacterTemplate): Record<string, number> {
  return splitLegacyCharacterFlags(template).bodyConditionFlags;
}

export function createEquipmentAvailabilityFlagsFromTemplate(template: CharacterTemplate): Record<string, number> {
  return splitLegacyCharacterFlags(template).equipmentAvailabilityFlags;
}

export function createUnmappedLegacyCharacterFlags(template: CharacterTemplate): Record<string, number> {
  void template;
  return {};
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
