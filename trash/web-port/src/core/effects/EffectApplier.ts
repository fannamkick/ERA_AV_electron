import type { Effect, EffectResult, EffectTarget, StainModifyOperation, StainSlot, StainTransferOperation } from './types';
import type { BitwiseEffectOperation } from './types';
import { applyEffectWithHandlers, type EffectHandlerRegistry } from './EffectHandlers';

export interface EffectApplierContext {
  applyNumericFlag(key: string, value: number, op: string): void;
  applyNumericStat(stat: string, key: string, value: number, op: string, target?: EffectTarget): void;
  applyBitwiseFlag?(key: string, mask: number, op: BitwiseEffectOperation): void;
  applyBitwiseStat?(stat: string, key: string, mask: number, op: BitwiseEffectOperation, target?: EffectTarget): void;
  applyEquipmentToggle?(key: string, enabled?: boolean, conflicts?: readonly string[], target?: EffectTarget): void;
  applyStainModify?(part: string, op: StainModifyOperation, value: number, target?: EffectTarget): void;
  applyStainTransfer?(from: StainSlot, to: StainSlot, op: StainTransferOperation): void;
  applyTag?(tag: string, enabled: boolean, targetId?: number): void;
  resolveTargetId?(role: string): number | undefined;
}

export interface ApplyEffectsOptions {
  readonly handlers?: EffectHandlerRegistry;
}

export function applyEffects(
  effects: readonly Effect[],
  context: EffectApplierContext,
  options: ApplyEffectsOptions = {},
): EffectResult {
  const messages: string[] = [];
  const warnings: string[] = [];
  const applied: Effect[] = [];

  for (const effect of effects) {
    const result = applyEffectWithHandlers(effect, context, options.handlers);
    applied.push(...result.applied);
    messages.push(...result.messages);
    warnings.push(...result.warnings);
  }

  return { applied, messages, warnings };
}
