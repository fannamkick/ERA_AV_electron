import type {
  Effect,
  EffectResult,
} from './types';
import type { EffectApplierContext } from './EffectApplier';

export interface EffectHandlerOutcome {
  readonly applied: boolean;
  readonly message?: string;
  readonly warning?: string;
}

export type EffectHandler<T extends Effect = Effect> = (
  effect: T,
  context: EffectApplierContext,
) => EffectHandlerOutcome;

export type EffectHandlerRegistry = {
  readonly [K in Effect['kind']]?: EffectHandler<Extract<Effect, { kind: K }>>;
};

export const defaultEffectHandlers: EffectHandlerRegistry = {
  'message.add': (effect) => ({
    applied: true,
    message: effect.text,
  }),

  'flag.numeric': (effect, context) => {
    context.applyNumericFlag(effect.key, effect.value, effect.op);
    return { applied: true };
  },

  'flag.bit': (effect, context) => {
    if (!context.applyBitwiseFlag) {
      return {
        applied: false,
        warning: `Bitwise flag effect ignored because applyBitwiseFlag is not available: ${effect.key}`,
      };
    }
    context.applyBitwiseFlag(effect.key, effect.mask, effect.op);
    return { applied: true };
  },

  'stat.numeric': (effect, context) => {
    context.applyNumericStat(
      effect.stat,
      effect.key,
      effect.value,
      effect.op,
      effect.target,
    );
    return { applied: true };
  },

  'stat.bit': (effect, context) => {
    if (!context.applyBitwiseStat) {
      return {
        applied: false,
        warning: `Bitwise stat effect ignored because applyBitwiseStat is not available: ${effect.stat}.${effect.key}`,
      };
    }
    context.applyBitwiseStat(
      effect.stat,
      effect.key,
      effect.mask,
      effect.op,
      effect.target,
    );
    return { applied: true };
  },

  'tag.add': (effect, context) => {
    if (!context.applyTag) {
      return {
        applied: false,
        warning: `Tag effect ignored because applyTag is not available: ${effect.tag}`,
      };
    }

    const roleTargetId = effect.target?.scope === 'role'
      ? context.resolveTargetId?.(effect.target.role)
      : undefined;

    if (effect.target?.scope === 'role' && roleTargetId === undefined) {
      return {
        applied: false,
        warning: `Tag effect ignored because target role is not bound: ${effect.target.role}`,
      };
    }

    context.applyTag(
      effect.tag,
      true,
      effect.target?.scope === 'character' ? effect.target.characterId : roleTargetId,
    );
    return { applied: true };
  },

  'tag.remove': (effect, context) => {
    if (!context.applyTag) {
      return {
        applied: false,
        warning: `Tag effect ignored because applyTag is not available: ${effect.tag}`,
      };
    }

    const roleTargetId = effect.target?.scope === 'role'
      ? context.resolveTargetId?.(effect.target.role)
      : undefined;

    if (effect.target?.scope === 'role' && roleTargetId === undefined) {
      return {
        applied: false,
        warning: `Tag effect ignored because target role is not bound: ${effect.target.role}`,
      };
    }

    context.applyTag(
      effect.tag,
      false,
      effect.target?.scope === 'character' ? effect.target.characterId : roleTargetId,
    );
    return { applied: true };
  },
};

export function applyEffectWithHandlers(
  effect: Effect,
  context: EffectApplierContext,
  handlers: EffectHandlerRegistry = defaultEffectHandlers,
): EffectResult {
  const handler = handlers[effect.kind] as EffectHandler | undefined;

  if (!handler) {
    return {
      applied: [],
      messages: [],
      warnings: [`Effect ignored because no handler is registered: ${effect.kind}`],
    };
  }

  try {
    const outcome = handler(effect, context);
    return {
      applied: outcome.applied ? [effect] : [],
      messages: outcome.message ? [outcome.message] : [],
      warnings: outcome.warning ? [outcome.warning] : [],
    };
  } catch (error) {
    return {
      applied: [],
      messages: [],
      warnings: [error instanceof Error ? error.message : String(error)],
    };
  }
}
