export type EffectTarget =
  | { scope: 'global' }
  | { scope: 'character'; characterId: number }
  | { scope: 'role'; role: string }
  | { scope: 'master' };

export type NumericEffectOperation = 'add' | 'set' | 'max' | 'min' | 'multiply';
export type BitwiseEffectOperation = 'set' | 'clear' | 'toggle';
export type StainModifyOperation = 'setBits' | 'clearBits' | 'assign';
export type StainTransferOperation = 'bidirectionalMerge' | 'mergeIntoTo' | 'mergeIntoFrom';

export interface BaseEffect {
  readonly kind: string;
  readonly target?: EffectTarget;
}

export interface MessageEffect extends BaseEffect {
  readonly kind: 'message.add';
  readonly text: string;
}

export interface FlagEffect extends BaseEffect {
  readonly kind: 'flag.numeric';
  readonly key: string;
  readonly value: number;
  readonly op: NumericEffectOperation;
}

export interface FlagBitEffect extends BaseEffect {
  readonly kind: 'flag.bit';
  readonly key: string;
  readonly mask: number;
  readonly op: BitwiseEffectOperation;
}

export interface StatEffect extends BaseEffect {
  readonly kind: 'stat.numeric';
  readonly stat: 'base' | 'loseBase' | 'up' | 'palam' | 'source' | 'talent' | 'ability' | 'exp' | 'juel' | 'mark' | 'equipment' | 'cflag' | 'tflag';
  readonly key: string;
  readonly value: number;
  readonly op: NumericEffectOperation;
}

export interface StatBitEffect extends BaseEffect {
  readonly kind: 'stat.bit';
  readonly stat: 'equipment' | 'cflag' | 'tflag';
  readonly key: string;
  readonly mask: number;
  readonly op: BitwiseEffectOperation;
}

export interface EquipmentToggleEffect extends BaseEffect {
  readonly kind: 'equipment.toggle';
  readonly key: string;
  readonly enabled?: boolean;
  readonly conflicts?: readonly string[];
}

export interface StainSlot {
  readonly target?: EffectTarget;
  readonly part: string;
}

export interface StainModifyEffect extends BaseEffect {
  readonly kind: 'stain.modify';
  readonly part: string;
  readonly op: StainModifyOperation;
  readonly value: number;
}

export interface StainTransferEffect extends BaseEffect {
  readonly kind: 'stain.transfer';
  readonly from: StainSlot;
  readonly to: StainSlot;
  readonly op: StainTransferOperation;
}

export interface TagAddEffect extends BaseEffect {
  readonly kind: 'tag.add';
  readonly tag: string;
}

export interface TagRemoveEffect extends BaseEffect {
  readonly kind: 'tag.remove';
  readonly tag: string;
}

export type TagEffect = TagAddEffect | TagRemoveEffect;

export type Effect =
  | MessageEffect
  | FlagEffect
  | FlagBitEffect
  | StatEffect
  | StatBitEffect
  | EquipmentToggleEffect
  | StainModifyEffect
  | StainTransferEffect
  | TagEffect;

export interface EffectResult {
  readonly applied: Effect[];
  readonly messages: string[];
  readonly warnings: string[];
}
