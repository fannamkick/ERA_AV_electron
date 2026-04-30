export type RecruitSessionState = {
  readonly selectedListingId?: string;
  readonly visibleListingIds: readonly string[];
};

export const initialRecruitSessionState: RecruitSessionState = {
  visibleListingIds: [],
};
