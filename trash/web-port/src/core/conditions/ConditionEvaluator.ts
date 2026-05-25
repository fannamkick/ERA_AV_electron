import type { AnyCondition, ConditionEvaluation, ConditionOperator } from './types';

export interface ConditionEvaluatorContext {
  getNumericStat(stat: string, key: string, targetId?: number): number;
  hasTag?(tag: string, targetId?: number): boolean;
  resolveTargetId?(role: string): number | undefined;
  runCustomCondition?(id: string): boolean;
}

function compare(current: number, op: ConditionOperator, expected: number): boolean {
  switch (op) {
    case 'eq': return current === expected;
    case 'neq': return current !== expected;
    case 'gt': return current > expected;
    case 'gte': return current >= expected;
    case 'lt': return current < expected;
    case 'lte': return current <= expected;
  }
}

function evaluateCondition(condition: AnyCondition, context: ConditionEvaluatorContext): boolean {
  if (condition.kind === 'stat.compare') {
    const targetId = resolveTargetId(condition.targetId, condition.targetRole, context);
    const current = context.getNumericStat(condition.stat, condition.key, targetId);
    return compare(current, condition.op, condition.value);
  }

  if (condition.kind === 'stat.bit') {
    const targetId = resolveTargetId(condition.targetId, condition.targetRole, context);
    const current = context.getNumericStat(condition.stat, condition.key, targetId);
    const masked = current & condition.mask;
    if (condition.op === 'any') return masked !== 0;
    if (condition.op === 'all') return masked === condition.mask;
    return masked === 0;
  }

  if (condition.kind === 'tag.has') {
    const targetId = resolveTargetId(condition.targetId, condition.targetRole, context);
    return context.hasTag?.(condition.tag, targetId) ?? false;
  }

  if (condition.kind === 'tag.missing') {
    const targetId = resolveTargetId(condition.targetId, condition.targetRole, context);
    return !(context.hasTag?.(condition.tag, targetId) ?? false);
  }

  if (condition.kind === 'all') {
    return condition.conditions.every((child) => evaluateCondition(child, context));
  }

  if (condition.kind === 'any') {
    return condition.conditions.some((child) => evaluateCondition(child, context));
  }

  if (condition.kind === 'not') {
    return !evaluateCondition(condition.condition, context);
  }

  if (condition.kind === 'custom') {
    return context.runCustomCondition?.(condition.id) ?? false;
  }

  return false;
}

function resolveTargetId(
  targetId: number | undefined,
  targetRole: string | undefined,
  context: ConditionEvaluatorContext,
): number | undefined {
  if (targetId !== undefined) return targetId;
  if (!targetRole) return undefined;

  const resolved = context.resolveTargetId?.(targetRole);
  if (resolved === undefined) {
    throw new Error(`Target role is not bound: ${targetRole}`);
  }
  return resolved;
}

export function evaluateConditions(
  conditions: readonly AnyCondition[],
  context: ConditionEvaluatorContext,
): ConditionEvaluation {
  const failed: AnyCondition[] = [];
  const reasons: string[] = [];

  for (const condition of conditions) {
    const passed = evaluateCondition(condition, context);

    if (!passed) {
      failed.push(condition);
      if (condition.reason) reasons.push(condition.reason);
    }
  }

  return { passed: failed.length === 0, failed, reasons };
}
