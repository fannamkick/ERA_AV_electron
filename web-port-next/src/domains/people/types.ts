import type { CatalogId } from '../../catalog/types';

export type CharacterId = string;

export type CharacterRole = 'target' | 'assistant' | 'previousAssistant' | 'trainer' | 'owned' | 'visitor';

export type CharacterIdentity = {
  readonly templateId: CatalogId;
  readonly displayName: string;
  readonly callName?: string;
  readonly nickname?: string;
  readonly firstPerson?: string;
  readonly profileTextSlots: Record<CatalogId, string>;
};

export type CharacterBaseStats = {
  readonly current: Record<CatalogId, number>;
  readonly maximum: Record<CatalogId, number>;
};

export type CharacterAttributesState = {
  readonly baseStats: CharacterBaseStats;
  readonly abilities: Record<CatalogId, number>;
  readonly traits: Record<CatalogId, boolean | number>;
  readonly experiences: Record<CatalogId, number>;
};

export type CharacterFamilyState = {
  readonly relativeCharacterIds: readonly string[];
  readonly legacyRelationIndexes: Record<string, number>;
};

export type CharacterLifecycleState = {
  readonly sellable: boolean;
  readonly assistantEligible: boolean;
  readonly retired: boolean;
  readonly deleted: boolean;
  readonly recruitmentStatus: 'notRecruitable' | 'recruitable' | 'recruited';
  readonly specialTags: readonly string[];
};

export type CharacterFlagState = {
  readonly lifecycle: CharacterLifecycleState;
  readonly affection: Record<string, number>;
  readonly family: CharacterFamilyState;
  readonly settings: Record<string, boolean | number | string>;
  readonly featureProgress: Record<string, boolean | number | string>;
  readonly legacyFlagsNeedingMapping: Record<string, boolean | number | string>;
};

export type CharacterState = {
  readonly id: CharacterId;
  readonly identity: CharacterIdentity;
  readonly attributes: CharacterAttributesState;
  readonly flags: CharacterFlagState;
  readonly roles: readonly CharacterRole[];
};

export type PeopleState = {
  readonly characters: Record<CharacterId, CharacterState>;
};

export const initialPeopleState: PeopleState = {
  characters: {},
};
