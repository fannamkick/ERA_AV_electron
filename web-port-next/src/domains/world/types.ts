export type WorldState = {
  readonly eventFlags: Record<string, boolean | number | string>;
  readonly unlocks: Record<string, boolean>;
  readonly storyFlags: Record<string, boolean | number | string>;
  readonly legacyWorldFlagsNeedingMapping: Record<string, boolean | number | string>;
};

export const initialWorldState: WorldState = {
  eventFlags: {},
  unlocks: {},
  storyFlags: {},
  legacyWorldFlagsNeedingMapping: {},
};
