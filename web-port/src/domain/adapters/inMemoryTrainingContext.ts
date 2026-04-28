import type { EffectTarget } from '../../core/effects';
import type { BitwiseEffectOperation } from '../../core/effects';
import type { StainModifyOperation, StainSlot, StainTransferOperation } from '../../core/effects';
import type { TrainingEngineContext } from '../training/TrainingEngine';
import { cflagIndex, flagIndex, tflagIndex } from '../flags';
import { statIndex } from '../stats';
import type { ActorBindings } from '../training/trainingTypes';

type NumericArrayStat = 'base' | 'loseBase' | 'up' | 'palam' | 'source' | 'talent' | 'ability' | 'exp' | 'juel' | 'mark' | 'equipment' | 'stain' | 'relation';
type NumericRecordStat = 'cflag' | 'tflag';

export interface InMemoryTrainingCharacterState {
  palam: number[];
  base: number[];
  loseBase: number[];
  up: number[];
  source: number[];
  talent: number[];
  ability: number[];
  exp: number[];
  juel: number[];
  mark: number[];
  equipment: number[];
  stain: number[];
  relation: number[];
  cflag: Record<number, number>;
  tflag: Record<number, number>;
  tags: Set<string>;
}

export interface InMemoryTrainingState {
  flags: Record<number, number>;
  items: Record<number, number>;
  characters: Record<number, InMemoryTrainingCharacterState>;
  tags: Set<string>;
  actorIds: ActorBindings;
}

export function createEmptyTrainingCharacterState(): InMemoryTrainingCharacterState {
  return {
    palam: [],
    base: [],
    loseBase: [],
    up: [],
    source: [],
    talent: [],
    ability: [],
    exp: [],
    juel: [],
    mark: [],
    equipment: [],
    stain: [],
    relation: [],
    cflag: {},
    tflag: {},
    tags: new Set<string>(),
  };
}

export function createEmptyTrainingState(): InMemoryTrainingState {
  return {
    flags: {},
    items: {},
    characters: {},
    tags: new Set<string>(),
    actorIds: {},
  };
}

function applyOperation(current: number, value: number, op: string): number {
  switch (op) {
    case 'add': return current + value;
    case 'set': return value;
    case 'max': return Math.max(current, value);
    case 'min': return Math.min(current, value);
    case 'multiply': return current * value;
    default: throw new Error(`Unknown numeric operation: ${op}`);
  }
}

function applyBitwiseOperation(current: number, mask: number, op: BitwiseEffectOperation): number {
  switch (op) {
    case 'set': return current | mask;
    case 'clear': return current & ~mask;
    case 'toggle': return current ^ mask;
  }
}

function applyStainModifyOperation(current: number, value: number, op: StainModifyOperation): number {
  switch (op) {
    case 'setBits': return current | value;
    case 'clearBits': return current & ~value;
    case 'assign': return value;
  }
}

function getCharacter(
  state: InMemoryTrainingState,
  characterId: number,
): InMemoryTrainingCharacterState {
  state.characters[characterId] ??= createEmptyTrainingCharacterState();
  return state.characters[characterId];
}

function getArrayStat(character: InMemoryTrainingCharacterState, stat: NumericArrayStat): number[] {
  return character[stat];
}

function getRecordStat(character: InMemoryTrainingCharacterState, stat: NumericRecordStat): Record<number, number> {
  return character[stat];
}

function resolveStatIndex(stat: string, key: string): number {
  if (stat === 'cflag') return cflagIndex(key as never);
  if (stat === 'tflag') return tflagIndex(key as never);
  if (stat === 'relation') return Number(key);
  return statIndex(stat as never, key);
}

function resolveRoleTargetId(actorIds: ActorBindings, role: string, defaultCharacterId: number): number | undefined {
  if (role === 'target' || role === 'effectReceiver') {
    return actorIds[role] ?? defaultCharacterId;
  }

  if (role === 'currentTrainer') {
    return actorIds.currentTrainer ?? actorIds.trainer;
  }

  if (role === 'trainer') return actorIds.trainer;
  if (role === 'assistant') return actorIds.assistant;
  if (role === 'previousTrainer') return actorIds.previousTrainer;

  return undefined;
}

function resolveCharacterTarget(
  target: EffectTarget | undefined,
  defaultCharacterId: number,
  actorIds: ActorBindings,
): number {
  if (!target) return defaultCharacterId;
  if (target.scope === 'character') return target.characterId;
  if (target.scope === 'role') {
    const resolved = resolveRoleTargetId(actorIds, target.role, defaultCharacterId);
    if (resolved === undefined) {
      throw new Error(`Target role is not bound: ${target.role}`);
    }
    return resolved;
  }
  if (target.scope === 'global') {
    throw new Error('Global stat effects are not supported. Use flag.numeric for global state.');
  }
  throw new Error('Master stat effects need a dedicated master-state adapter.');
}

function readStainSlot(
  state: InMemoryTrainingState,
  slot: StainSlot,
  defaultCharacterId: number,
  actorIds: ActorBindings,
): number {
  const characterId = resolveCharacterTarget(slot.target, defaultCharacterId, actorIds);
  const character = getCharacter(state, characterId);
  return character.stain[resolveStatIndex('stain', slot.part)] ?? 0;
}

function writeStainSlot(
  state: InMemoryTrainingState,
  slot: StainSlot,
  value: number,
  defaultCharacterId: number,
  actorIds: ActorBindings,
): void {
  const characterId = resolveCharacterTarget(slot.target, defaultCharacterId, actorIds);
  const character = getCharacter(state, characterId);
  character.stain[resolveStatIndex('stain', slot.part)] = value;
}

export function createInMemoryTrainingContext(
  state: InMemoryTrainingState,
  defaultCharacterId: number,
  actorBindings: ActorBindings = {},
): TrainingEngineContext {
  const actorIds: ActorBindings = {
    target: defaultCharacterId,
    effectReceiver: defaultCharacterId,
    ...state.actorIds,
    ...actorBindings,
  };
  state.actorIds = actorIds;

  return {
    resolveTargetId(role) {
      return resolveRoleTargetId(actorIds, role, defaultCharacterId);
    },

    getNumericStat(stat, key, targetId) {
      if (stat === 'flag') {
        return state.flags[flagIndex(key as never)] ?? 0;
      }

      if (stat === 'item') {
        return state.items[statIndex('item', key)] ?? 0;
      }

      const character = getCharacter(state, targetId ?? defaultCharacterId);
      const index = resolveStatIndex(stat, key);

      if (stat === 'cflag' || stat === 'tflag') {
        return getRecordStat(character, stat)[index] ?? 0;
      }

      return getArrayStat(character, stat as NumericArrayStat)[index] ?? 0;
    },

    getRelation(fromCharacterId, toCharacterId) {
      return getCharacter(state, fromCharacterId).relation[toCharacterId] ?? 0;
    },

    hasTag(tag, targetId) {
      if (targetId === undefined) return state.tags.has(tag);
      return getCharacter(state, targetId).tags.has(tag);
    },

    applyNumericFlag(key, value, op) {
      const index = flagIndex(key as never);
      state.flags[index] = applyOperation(state.flags[index] ?? 0, value, op);
    },

    applyBitwiseFlag(key, mask, op) {
      const index = flagIndex(key as never);
      state.flags[index] = applyBitwiseOperation(state.flags[index] ?? 0, mask, op);
    },

    applyNumericStat(stat, key, value, op, target) {
      const characterId = resolveCharacterTarget(target, defaultCharacterId, actorIds);
      const character = getCharacter(state, characterId);
      const index = resolveStatIndex(stat, key);

      if (stat === 'cflag' || stat === 'tflag') {
        const record = getRecordStat(character, stat);
        record[index] = applyOperation(record[index] ?? 0, value, op);
        return;
      }

      const values = getArrayStat(character, stat as NumericArrayStat);
      values[index] = applyOperation(values[index] ?? 0, value, op);
    },

    applyBitwiseStat(stat, key, mask, op, target) {
      const characterId = resolveCharacterTarget(target, defaultCharacterId, actorIds);
      const character = getCharacter(state, characterId);
      const index = resolveStatIndex(stat, key);

      if (stat === 'cflag' || stat === 'tflag') {
        const record = getRecordStat(character, stat);
        record[index] = applyBitwiseOperation(record[index] ?? 0, mask, op);
        return;
      }

      if (stat === 'equipment' || stat === 'stain') {
        const values = getArrayStat(character, stat);
        values[index] = applyBitwiseOperation(values[index] ?? 0, mask, op);
        return;
      }

      throw new Error(`Bitwise stat effects are not supported for stat: ${stat}`);
    },

    applyEquipmentToggle(key, enabled, conflicts, target) {
      const characterId = resolveCharacterTarget(target, defaultCharacterId, actorIds);
      const character = getCharacter(state, characterId);
      const equipment = getArrayStat(character, 'equipment');
      const index = resolveStatIndex('equipment', key);
      const next = enabled ?? ((equipment[index] ?? 0) === 0);

      equipment[index] = next ? 1 : 0;

      if (next) {
        for (const conflictKey of conflicts ?? []) {
          equipment[resolveStatIndex('equipment', conflictKey)] = 0;
        }
      }
    },

    applyStainModify(part, op, value, target) {
      const characterId = resolveCharacterTarget(target, defaultCharacterId, actorIds);
      const character = getCharacter(state, characterId);
      const index = resolveStatIndex('stain', part);
      character.stain[index] = applyStainModifyOperation(character.stain[index] ?? 0, value, op);
    },

    applyStainTransfer(from, to, op) {
      const fromValue = readStainSlot(state, from, defaultCharacterId, actorIds);
      const toValue = readStainSlot(state, to, defaultCharacterId, actorIds);
      const merged = fromValue | toValue;

      if (op === 'bidirectionalMerge' || op === 'mergeIntoTo') {
        writeStainSlot(state, to, merged, defaultCharacterId, actorIds);
      }

      if (op === 'bidirectionalMerge' || op === 'mergeIntoFrom') {
        writeStainSlot(state, from, merged, defaultCharacterId, actorIds);
      }
    },

    applyTag(tag, enabled, targetId) {
      const tags = targetId === undefined ? state.tags : getCharacter(state, targetId).tags;
      if (enabled) tags.add(tag);
      else tags.delete(tag);
    },

    getSourceSnapshot() {
      return [...getCharacter(state, defaultCharacterId).source];
    },

    getPalamSnapshot() {
      return [...getCharacter(state, defaultCharacterId).palam];
    },

    applySourceSnapshot(source) {
      getCharacter(state, defaultCharacterId).source = [...source];
    },

    applyPalamSnapshot(palam) {
      getCharacter(state, defaultCharacterId).palam = [...palam];
    },
  };
}
