import type { LegacyVariableFamily } from './familyOwnership';

export type LegacyIndexFamily = LegacyVariableFamily;

export type LegacyIndexMapping = {
  readonly family: LegacyIndexFamily;
  readonly index: string;
  readonly originalName?: string;
  readonly ownerDomain: string;
  readonly valueKind: 'boolean' | 'number' | 'text' | 'enum' | 'reference' | 'collection' | 'unknown';
  readonly meaning: string;
  readonly persistence: 'save' | 'session' | 'derived' | 'temporary' | 'unknown';
  readonly evidence: readonly string[];
  readonly status: 'mapped' | 'implemented' | 'needsDecision' | 'missingMapping' | 'needs-review' | 'blocker' | 'approved-excluded';
};

export function missingMapping(family: LegacyIndexFamily, index: string, evidence: readonly string[]): LegacyIndexMapping {
  return {
    family,
    index,
    ownerDomain: 'unknown',
    valueKind: 'unknown',
    meaning: 'No approved web-port-next domain mapping exists yet.',
    persistence: 'unknown',
    evidence,
    status: 'missingMapping',
  };
}

export const legacyIndexMappings: readonly LegacyIndexMapping[] = [];
