export type ConditionOperator = 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte';

export interface Condition {
  readonly kind: string;
  readonly reason?: string;
}

export interface StatCondition extends Condition {
  readonly kind: 'stat.compare';
  readonly stat: 'base' | 'loseBase' | 'up' | 'palam' | 'source' | 'talent' | 'ability' | 'exp' | 'juel' | 'mark' | 'equipment' | 'stain' | 'cflag' | 'tflag' | 'flag' | 'item' | 'relation';
  readonly key: string;
  readonly op: ConditionOperator;
  readonly value: number;
  readonly targetId?: number;
  readonly targetRole?: string;
}

export type BitConditionOperator = 'any' | 'all' | 'none';

export interface StatBitCondition extends Condition {
  readonly kind: 'stat.bit';
  readonly stat: 'cflag' | 'tflag' | 'flag' | 'equipment' | 'stain';
  readonly key: string;
  readonly mask: number;
  readonly op: BitConditionOperator;
  readonly targetId?: number;
  readonly targetRole?: string;
}

export interface TagCondition extends Condition {
  readonly kind: 'tag.has' | 'tag.missing';
  readonly tag: string;
  readonly targetId?: number;
  readonly targetRole?: string;
}

export interface CompositeCondition extends Condition {
  readonly kind: 'all' | 'any';
  readonly conditions: readonly AnyCondition[];
}

export interface NotCondition extends Condition {
  readonly kind: 'not';
  readonly condition: AnyCondition;
}

export interface CustomCondition extends Condition {
  readonly kind: 'custom';
  readonly id: string;
}

export type AnyCondition =
  | StatCondition
  | StatBitCondition
  | TagCondition
  | CompositeCondition
  | NotCondition
  | CustomCondition;

export interface ConditionEvaluation {
  readonly passed: boolean;
  readonly failed: AnyCondition[];
  readonly reasons: string[];
}
