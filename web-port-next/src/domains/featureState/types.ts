export type FeatureState = {
  readonly eventProgress: Record<string, boolean | number | string>;
  readonly visits: Record<string, boolean | number | string>;
  readonly tips: Record<string, boolean | number | string>;
  readonly unlocks: Record<string, boolean>;
  readonly legacyFeatureFlagsNeedingMapping: Record<string, boolean | number | string>;
};

export const initialFeatureState: FeatureState = {
  eventProgress: {},
  visits: {},
  tips: {},
  unlocks: {},
  legacyFeatureFlagsNeedingMapping: {},
};
