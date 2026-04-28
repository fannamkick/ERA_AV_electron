import type {
  BitwiseEffectOperation,
  Effect,
  EffectTarget,
  NumericEffectOperation,
  StainSlot,
} from './types';

export const globalTarget: EffectTarget = { scope: 'global' };

export function characterTarget(characterId: number): EffectTarget {
  return { scope: 'character', characterId };
}

export function roleTarget(role: string): EffectTarget {
  return { scope: 'role', role };
}

export function addMessage(text: string): Effect {
  return { kind: 'message.add', text };
}

export function addTag(tag: string, target?: EffectTarget): Effect {
  return { kind: 'tag.add', tag, target };
}

export function removeTag(tag: string, target?: EffectTarget): Effect {
  return { kind: 'tag.remove', tag, target };
}

export function numericFlag(key: string, value: number, op: NumericEffectOperation = 'set'): Effect {
  return { kind: 'flag.numeric', key, value, op, target: globalTarget };
}

export function bitwiseFlag(key: string, mask: number, op: BitwiseEffectOperation): Effect {
  return { kind: 'flag.bit', key, mask, op, target: globalTarget };
}

export function numericStat(
  stat: 'base' | 'loseBase' | 'up' | 'palam' | 'source' | 'talent' | 'ability' | 'exp' | 'juel' | 'mark' | 'equipment' | 'cflag' | 'tflag',
  key: string,
  value: number,
  op: NumericEffectOperation = 'add',
  target?: EffectTarget,
): Effect {
  return { kind: 'stat.numeric', stat, key, value, op, target };
}

export function bitwiseStat(
  stat: 'equipment' | 'cflag' | 'tflag',
  key: string,
  mask: number,
  op: BitwiseEffectOperation,
  target?: EffectTarget,
): Effect {
  return { kind: 'stat.bit', stat, key, mask, op, target };
}

export function setFlagBits(key: string, mask: number): Effect {
  return bitwiseFlag(key, mask, 'set');
}

export function clearFlagBits(key: string, mask: number): Effect {
  return bitwiseFlag(key, mask, 'clear');
}

export function toggleFlagBits(key: string, mask: number): Effect {
  return bitwiseFlag(key, mask, 'toggle');
}

export function setStatBits(
  stat: 'equipment' | 'cflag' | 'tflag',
  key: string,
  mask: number,
  target?: EffectTarget,
): Effect {
  return bitwiseStat(stat, key, mask, 'set', target);
}

export function clearStatBits(
  stat: 'equipment' | 'cflag' | 'tflag',
  key: string,
  mask: number,
  target?: EffectTarget,
): Effect {
  return bitwiseStat(stat, key, mask, 'clear', target);
}

export function toggleStatBits(
  stat: 'equipment' | 'cflag' | 'tflag',
  key: string,
  mask: number,
  target?: EffectTarget,
): Effect {
  return bitwiseStat(stat, key, mask, 'toggle', target);
}

export function toggleEquipment(
  key: string,
  options: {
    readonly enabled?: boolean;
    readonly conflicts?: readonly string[];
    readonly target?: EffectTarget;
  } = {},
): Effect {
  return {
    kind: 'equipment.toggle',
    key,
    enabled: options.enabled,
    conflicts: options.conflicts,
    target: options.target,
  };
}

export function stainSlot(part: string, target?: EffectTarget): StainSlot {
  return { part, target };
}

export function setStainBits(part: string, mask: number, target?: EffectTarget): Effect {
  return { kind: 'stain.modify', part, op: 'setBits', value: mask, target };
}

export function clearStainBits(part: string, mask: number, target?: EffectTarget): Effect {
  return { kind: 'stain.modify', part, op: 'clearBits', value: mask, target };
}

export function assignStain(part: string, value: number, target?: EffectTarget): Effect {
  return { kind: 'stain.modify', part, op: 'assign', value, target };
}

export function mergeStains(
  from: StainSlot,
  to: StainSlot,
  op: 'bidirectionalMerge' | 'mergeIntoTo' | 'mergeIntoFrom' = 'bidirectionalMerge',
): Effect {
  return { kind: 'stain.transfer', from, to, op };
}

export function addSource(key: string, value: number, target?: EffectTarget): Effect {
  return numericStat('source', key, value, 'add', target);
}

export function multiplySource(key: string, factor: number, target?: EffectTarget): Effect {
  return numericStat('source', key, factor, 'multiply', target);
}

export function addPalam(key: string, value: number, target?: EffectTarget): Effect {
  return numericStat('palam', key, value, 'add', target);
}

export function addExp(key: string, value: number, target?: EffectTarget): Effect {
  return numericStat('exp', key, value, 'add', target);
}

export function addBase(key: string, value: number, target?: EffectTarget): Effect {
  return numericStat('base', key, value, 'add', target);
}

export function addLoseBase(key: string, value: number, target?: EffectTarget): Effect {
  return numericStat('loseBase', key, value, 'add', target);
}

export function addUp(key: string, value: number, target?: EffectTarget): Effect {
  return numericStat('up', key, value, 'add', target);
}
