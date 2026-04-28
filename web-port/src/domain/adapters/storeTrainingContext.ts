import type { EffectTarget } from '../../core/effects';
import type { BitwiseEffectOperation } from '../../core/effects';
import type { StainModifyOperation, StainSlot, StainTransferOperation } from '../../core/effects';
import type { Character } from '../../types/character';
import { cflagIndex, flagIndex, tflagIndex } from '../flags';
import { statIndex } from '../stats';
import type { TrainingEngineContext } from '../training/TrainingEngine';
import type { ActorBindings } from '../training/trainingTypes';

type NumericRecord = Record<number, number>;
type NumericRecordStat = 'base' | 'palam' | 'talent' | 'exp' | 'juel' | 'mark' | 'cflag' | 'tflag';
type NumericArrayStat = 'source' | 'loseBase' | 'up' | 'stain';

/**
 * Mutable draft shape used by the training engine adapter.
 *
 * Do not pass live Zustand state directly unless the caller owns the commit path.
 * Build a draft/snapshot, execute training effects against it, then commit through
 * store actions such as updateCharacter so React state changes stay observable.
 */
export interface StoreTrainingStateSnapshot {
  flags: Record<number | string, number>;
  items?: Record<number | string, number>;
  characters: Character[];
  tags?: Set<string>;
  actorIds?: ActorBindings;
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

function requireCharacter(
  state: StoreTrainingStateSnapshot,
  characterId: number,
): Character {
  const character = state.characters.find((item) => item.id === characterId);
  if (!character) {
    throw new Error(`Unknown character id: ${characterId}`);
  }
  return character;
}

function ensureRecord(character: Character, stat: NumericRecordStat): NumericRecord {
  const mutable = character as unknown as Record<string, unknown>;

  if (stat === 'cflag') {
    character.cflag ??= {};
    return character.cflag as NumericRecord;
  }

  if (stat === 'tflag') {
    mutable.tflag ??= {};
    return mutable.tflag as NumericRecord;
  }

  if (stat === 'talent') return character.talent as NumericRecord;
  if (stat === 'base') return character.base as NumericRecord;
  if (stat === 'palam') return character.palam as NumericRecord;
  if (stat === 'exp') return character.exp as NumericRecord;
  if (stat === 'juel') return character.juel as NumericRecord;
  if (stat === 'mark') return character.mark as NumericRecord;

  throw new Error(`Unsupported record stat: ${stat}`);
}

function readAbility(character: Character, index: number): number {
  return character.abilities?.[index] ?? character.abl?.[index] ?? 0;
}

function writeAbility(character: Character, index: number, value: number): void {
  character.abilities ??= [];
  character.abilities[index] = value;
  character.abl[index] = value;
}

function readStat(character: Character, stat: string, index: number): number {
  if (stat === 'ability') return readAbility(character, index);
  if (stat === 'source') return character.source?.[index] ?? 0;
  if (stat === 'loseBase') return readArrayLikeStat(character, stat, index);
  if (stat === 'up') return readArrayLikeStat(character, stat, index);
  if (stat === 'equipment') return character.equipment?.[index] ?? 0;
  if (stat === 'stain') return character.stain?.[index] ?? 0;
  if (stat === 'relation') return character.relation?.[index] ?? 0;

  return ensureRecord(character, stat as NumericRecordStat)[index] ?? 0;
}

function readArrayLikeStat(character: Character, stat: NumericArrayStat, index: number): number {
  const values = (character as unknown as Record<string, number[] | undefined>)[stat];
  return values?.[index] ?? 0;
}

function writeArrayLikeStat(character: Character, stat: NumericArrayStat, index: number, value: number): void {
  const mutable = character as unknown as Record<string, number[] | undefined>;
  mutable[stat] ??= [];
  mutable[stat][index] = value;
}

function writeStat(character: Character, stat: string, index: number, value: number): void {
  if (stat === 'ability') {
    writeAbility(character, index, value);
    return;
  }

  if (stat === 'source') {
    character.source ??= [];
    character.source[index] = value;
    return;
  }

  if (stat === 'loseBase' || stat === 'up') {
    writeArrayLikeStat(character, stat, index, value);
    return;
  }

  if (stat === 'equipment') {
    character.equipment ??= {};
    character.equipment[index] = value;
    return;
  }

  if (stat === 'stain') {
    character.stain ??= [];
    character.stain[index] = value;
    return;
  }

  ensureRecord(character, stat as NumericRecordStat)[index] = value;
}

function denseRecord(record: NumericRecord | undefined): number[] {
  if (!record) return [];
  const indexes = Object.keys(record).map(Number).filter(Number.isInteger);
  const lastIndex = Math.max(-1, ...indexes);
  if (lastIndex < 0) return [];
  return Array.from({ length: lastIndex + 1 }, (_, index) => record[index] ?? 0);
}

function recordFromDense(values: readonly number[]): NumericRecord {
  return values.reduce<NumericRecord>((record, value, index) => {
    record[index] = value ?? 0;
    return record;
  }, {});
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
  throw new Error('Master stat effects need actor-role context support before store application.');
}

function readStainSlot(
  state: StoreTrainingStateSnapshot,
  slot: StainSlot,
  defaultCharacterId: number,
  actorIds: ActorBindings,
): number {
  const character = requireCharacter(state, resolveCharacterTarget(slot.target, defaultCharacterId, actorIds));
  return readStat(character, 'stain', resolveStatIndex('stain', slot.part));
}

function writeStainSlot(
  state: StoreTrainingStateSnapshot,
  slot: StainSlot,
  value: number,
  defaultCharacterId: number,
  actorIds: ActorBindings,
): void {
  const character = requireCharacter(state, resolveCharacterTarget(slot.target, defaultCharacterId, actorIds));
  writeStat(character, 'stain', resolveStatIndex('stain', slot.part), value);
}

export function createStoreTrainingContext(
  state: StoreTrainingStateSnapshot,
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
        return state.items?.[statIndex('item', key)] ?? 0;
      }

      const character = requireCharacter(state, targetId ?? defaultCharacterId);
      return readStat(character, stat, resolveStatIndex(stat, key));
    },

    getRelation(fromCharacterId, toCharacterId) {
      const character = requireCharacter(state, fromCharacterId);
      return character.relation?.[toCharacterId] ?? 0;
    },

    hasTag(tag) {
      return state.tags?.has(tag) ?? false;
    },

    applyTag(tag, enabled) {
      state.tags ??= new Set<string>();
      if (enabled) state.tags.add(tag);
      else state.tags.delete(tag);
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
      const character = requireCharacter(state, resolveCharacterTarget(target, defaultCharacterId, actorIds));
      const index = resolveStatIndex(stat, key);
      writeStat(character, stat, index, applyOperation(readStat(character, stat, index), value, op));
    },

    applyBitwiseStat(stat, key, mask, op, target) {
      if (stat !== 'cflag' && stat !== 'tflag' && stat !== 'equipment' && stat !== 'stain') {
        throw new Error(`Bitwise stat effects are not supported for stat: ${stat}`);
      }

      const character = requireCharacter(state, resolveCharacterTarget(target, defaultCharacterId, actorIds));
      const index = resolveStatIndex(stat, key);
      writeStat(character, stat, index, applyBitwiseOperation(readStat(character, stat, index), mask, op));
    },

    applyEquipmentToggle(key, enabled, conflicts, target) {
      const character = requireCharacter(state, resolveCharacterTarget(target, defaultCharacterId, actorIds));
      const index = resolveStatIndex('equipment', key);
      const next = enabled ?? (readStat(character, 'equipment', index) === 0);

      writeStat(character, 'equipment', index, next ? 1 : 0);

      if (next) {
        for (const conflictKey of conflicts ?? []) {
          writeStat(character, 'equipment', resolveStatIndex('equipment', conflictKey), 0);
        }
      }
    },

    applyStainModify(part, op, value, target) {
      const character = requireCharacter(state, resolveCharacterTarget(target, defaultCharacterId, actorIds));
      const index = resolveStatIndex('stain', part);
      writeStat(character, 'stain', index, applyStainModifyOperation(readStat(character, 'stain', index), value, op));
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

    getSourceSnapshot() {
      return [...(requireCharacter(state, defaultCharacterId).source ?? [])];
    },

    getPalamSnapshot() {
      return denseRecord(requireCharacter(state, defaultCharacterId).palam as NumericRecord);
    },

    applySourceSnapshot(source) {
      requireCharacter(state, defaultCharacterId).source = [...source];
    },

    applyPalamSnapshot(palam) {
      requireCharacter(state, defaultCharacterId).palam = recordFromDense(palam);
    },
  };
}
