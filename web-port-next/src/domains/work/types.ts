export type WorkAssignment = {
  readonly characterId: string;
  readonly workTypeId: string;
  readonly active: boolean;
};

export type FilmingProgress = {
  readonly title?: string;
  readonly sales: number;
  readonly fanCount: number;
  readonly latestReleaseId?: string;
};

export type WorkState = {
  readonly assignments: Record<string, WorkAssignment>;
  readonly brothelFlags: Record<string, boolean | number | string>;
  readonly filmingByCharacterId: Record<string, FilmingProgress>;
  readonly careerFlagsByCharacterId: Record<string, Record<string, boolean | number | string>>;
  readonly legacyWorkFlagsNeedingMapping: Record<string, boolean | number | string>;
};

export const initialWorkState: WorkState = {
  assignments: {},
  brothelFlags: {},
  filmingByCharacterId: {},
  careerFlagsByCharacterId: {},
  legacyWorkFlagsNeedingMapping: {},
};
