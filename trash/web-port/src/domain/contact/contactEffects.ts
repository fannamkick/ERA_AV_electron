import {
  mergeStains,
  roleTarget,
  setStainBits,
  setStatBits,
  stainSlot,
  type Effect,
  type EffectApplierContext,
  type EffectHandlerRegistry,
  type StainSlot,
} from '../../core/effects';
import { STAIN_BITS } from '../stats';
import { hasNumericStat, readNumericStat, type DomainRuntimeContext } from '../shared';

export type ContactActorRole = 'target' | 'trainer' | 'assistant' | 'master';

export const CONTACT_STAIN_MASKS = {
  dirtyMouth: STAIN_BITS.vaginalFluid | STAIN_BITS.semen | STAIN_BITS.anal | STAIN_BITS.urine,
  tentacleDirt: STAIN_BITS.penis | STAIN_BITS.semen,
} as const;

export function contactStainSlot(part: string, role: ContactActorRole = 'target'): StainSlot {
  return role === 'target' ? stainSlot(part) : stainSlot(part, roleTarget(role));
}

export function mergeContactStains(
  from: { readonly part: string; readonly role?: ContactActorRole },
  to: { readonly part: string; readonly role?: ContactActorRole },
): Effect {
  return mergeStains(
    contactStainSlot(from.part, from.role ?? 'target'),
    contactStainSlot(to.part, to.role ?? 'target'),
  );
}

export function setContactStainBits(
  part: string,
  mask: number,
  role: ContactActorRole = 'target',
): Effect {
  return setStainBits(part, mask, role === 'target' ? undefined : roleTarget(role));
}

export function assistantAvoidsDirtyMouthContact(
  context: DomainRuntimeContext,
  options: { readonly assistantPlay: boolean },
): boolean {
  if (!options.assistantPlay) return false;
  if ((readNumericStat(context, 'stain', 'mouth') & CONTACT_STAIN_MASKS.dirtyMouth) === 0) return false;
  if (readNumericStat(context, 'ability', 'obedience', 'assistant') > 3) return false;
  if (!hasNumericStat(context, 'talent', 'sensitivityHigh', 'assistant')) return false;
  return !hasNumericStat(context, 'talent', 'filthIgnore', 'assistant');
}

export function trainerFirstContactEffects(context: DomainRuntimeContext): Effect[] {
  if (readNumericStat(context, 'cflag', 'firstKissLegacy', 'trainer') !== -1) return [];

  const effects: Effect[] = [
    setStatBits('tflag', 'trainerFirstContact', 1),
  ];

  if (
    readNumericStat(context, 'talent', 'male') !== 0 ||
    readNumericStat(context, 'talent', 'futanari') !== 0
  ) {
    effects.push(setStatBits('tflag', 'trainerFirstContact', 2));
  } else {
    effects.push(setStatBits('tflag', 'trainerFirstContact', 8));
  }

  return effects;
}

export function kissFirstContactEffects(context: DomainRuntimeContext): Effect[] {
  const effects: Effect[] = [
    setStatBits('tflag', 'targetFirstContact', 1),
    setStatBits('tflag', 'trainerFirstContact', 1),
  ];

  if (
    readNumericStat(context, 'talent', 'male') !== 0 ||
    readNumericStat(context, 'talent', 'futanari') !== 0
  ) {
    effects.push(setStatBits('tflag', 'trainerFirstContact', 2));
  }

  return effects;
}

export const contactEffectHandlers: EffectHandlerRegistry = {
  'stain.modify': (effect, context: EffectApplierContext) => {
    if (!context.applyStainModify) {
      return {
        applied: false,
        warning: `Stain modify effect ignored because applyStainModify is not available: ${effect.part}`,
      };
    }

    context.applyStainModify(effect.part, effect.op, effect.value, effect.target);
    return { applied: true };
  },

  'stain.transfer': (effect, context: EffectApplierContext) => {
    if (!context.applyStainTransfer) {
      return {
        applied: false,
        warning: `Stain transfer effect ignored because applyStainTransfer is not available: ${effect.from.part}->${effect.to.part}`,
      };
    }

    context.applyStainTransfer(effect.from, effect.to, effect.op);
    return { applied: true };
  },
};
