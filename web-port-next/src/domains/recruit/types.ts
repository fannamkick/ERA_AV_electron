export type RecruitInterviewDraft = {
  readonly sourceListingId: string;
  readonly templateId: string;
  readonly instanceIndex: number;
  readonly displayName: string;
  readonly commandFlags: Record<string, number>;
  readonly scratchTexts: Record<string, string>;
};

export type RecruitSessionState = {
  readonly selectedListingId?: string;
  readonly visibleListingIds: readonly string[];
  readonly pageIndex: number;
  readonly commandFlags: Record<string, number>;
  readonly scratchTexts: Record<string, string>;
  readonly interviewDraft?: RecruitInterviewDraft;
};

export const initialRecruitSessionState: RecruitSessionState = {
  visibleListingIds: [],
  pageIndex: 0,
  commandFlags: {},
  scratchTexts: {},
};
