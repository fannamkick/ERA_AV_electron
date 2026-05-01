export type CharacterBodyState = {
  readonly anatomyTags: readonly string[];
  readonly baseStats: Record<string, number>;
  readonly maxBaseStats: Record<string, number>;
  readonly bodyStats: Record<string, number>;
  readonly reproduction: Record<string, boolean | number | string>;
  readonly sexualHistory: Record<string, boolean | number | string>;
  readonly appearance: Record<string, boolean | number | string>;
  readonly conditionParams: Record<string, number>;
  readonly trainingResources: Record<string, number>;
  readonly imprints: Record<string, number>;
  readonly conditionFlags: Record<string, boolean | number | string>;
  readonly contamination: Record<string, readonly string[]>;
  readonly milestones: Record<string, boolean | number | string>;
};

export type BodyState = {
  readonly byCharacterId: Record<string, CharacterBodyState>;
};

export const initialBodyState: BodyState = {
  byCharacterId: {},
};
