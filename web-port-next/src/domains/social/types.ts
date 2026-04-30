export type RelationshipKey = string;

export type RelationshipState = {
  readonly affinity: number;
  readonly roles: readonly string[];
  readonly historyTags: readonly string[];
  readonly legacyRelationIndexesNeedingMapping: Record<string, number>;
};

export type SocialState = {
  readonly relationships: Record<RelationshipKey, RelationshipState>;
  readonly ntrProgress: Record<string, boolean | number | string>;
  readonly partnerProgress: Record<string, boolean | number | string>;
};

export const initialSocialState: SocialState = {
  relationships: {},
  ntrProgress: {},
  partnerProgress: {},
};
