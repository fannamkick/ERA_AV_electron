import type { AnyCondition, ConditionOperator } from './types';

export function compareStat(
  stat: 'base' | 'loseBase' | 'up' | 'palam' | 'source' | 'talent' | 'ability' | 'exp' | 'juel' | 'mark' | 'equipment' | 'stain' | 'cflag' | 'tflag' | 'flag' | 'item' | 'relation',
  key: string,
  op: ConditionOperator,
  value: number,
  reason?: string,
  targetId?: number,
  targetRole?: string,
): AnyCondition {
  return { kind: 'stat.compare', stat, key, op, value, reason, targetId, targetRole };
}

export function minStat(
  stat: 'base' | 'loseBase' | 'up' | 'palam' | 'source' | 'talent' | 'ability' | 'exp' | 'juel' | 'mark' | 'equipment' | 'stain' | 'cflag' | 'tflag' | 'flag' | 'item' | 'relation',
  key: string,
  value: number,
  reason?: string,
  targetId?: number,
  targetRole?: string,
): AnyCondition {
  return compareStat(stat, key, 'gte', value, reason, targetId, targetRole);
}

export function hasTalent(key: string, reason?: string, targetId?: number, targetRole?: string): AnyCondition {
  return compareStat('talent', key, 'gte', 1, reason, targetId, targetRole);
}

export function missingTalent(key: string, reason?: string, targetId?: number, targetRole?: string): AnyCondition {
  return compareStat('talent', key, 'eq', 0, reason, targetId, targetRole);
}

export function missingEquipment(key: string, reason?: string, targetId?: number, targetRole?: string): AnyCondition {
  return compareStat('equipment', key, 'eq', 0, reason, targetId, targetRole);
}

export function bitAny(
  stat: 'cflag' | 'tflag' | 'flag' | 'equipment' | 'stain',
  key: string,
  mask: number,
  reason?: string,
  targetId?: number,
  targetRole?: string,
): AnyCondition {
  return { kind: 'stat.bit', stat, key, mask, op: 'any', reason, targetId, targetRole };
}

export function bitNone(
  stat: 'cflag' | 'tflag' | 'flag' | 'equipment' | 'stain',
  key: string,
  mask: number,
  reason?: string,
  targetId?: number,
  targetRole?: string,
): AnyCondition {
  return { kind: 'stat.bit', stat, key, mask, op: 'none', reason, targetId, targetRole };
}

export function all(conditions: readonly AnyCondition[], reason?: string): AnyCondition {
  return { kind: 'all', conditions, reason };
}

export function any(conditions: readonly AnyCondition[], reason?: string): AnyCondition {
  return { kind: 'any', conditions, reason };
}

export function not(condition: AnyCondition, reason?: string): AnyCondition {
  return { kind: 'not', condition, reason };
}

export function hasTag(tag: string, reason?: string, targetId?: number, targetRole?: string): AnyCondition {
  return { kind: 'tag.has', tag, reason, targetId, targetRole };
}

export function missingTag(tag: string, reason?: string, targetId?: number, targetRole?: string): AnyCondition {
  return { kind: 'tag.missing', tag, reason, targetId, targetRole };
}
