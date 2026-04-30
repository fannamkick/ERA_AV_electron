export type AchievementState = {
  readonly unlocked: boolean;
  readonly progress: number;
};

export type ClearBonusState = {
  readonly points: number;
  readonly unlockedBonusIds: readonly string[];
  readonly characterClearCounts: Record<string, number>;
};

export type MetaState = {
  readonly achievements: Record<string, AchievementState>;
  readonly clearBonuses: ClearBonusState;
  readonly globalCounters: Record<string, number>;
  readonly globalFlags: Record<string, boolean>;
  readonly globalTexts: Record<string, string>;
  readonly legacyGlobalsNeedingMapping: Record<string, boolean | number | string>;
};

export const initialMetaState: MetaState = {
  achievements: {},
  clearBonuses: {
    points: 0,
    unlockedBonusIds: [],
    characterClearCounts: {},
  },
  globalCounters: {},
  globalFlags: {},
  globalTexts: {},
  legacyGlobalsNeedingMapping: {},
};
