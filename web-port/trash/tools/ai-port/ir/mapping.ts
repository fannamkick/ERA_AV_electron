import {
  ABILITY_KEYS,
  BASE_KEYS,
  EQUIPMENT_KEYS,
  EXP_KEYS,
  ITEM_KEYS,
  LOSEBASE_KEYS,
  MARK_KEYS,
  PALAM_KEYS,
  SOURCE_KEYS,
  STAIN_PART_KEYS,
  TALENT_KEYS,
  type StatKeyDefinition,
} from '../../../src/domain/stats/statKeys';
import { CFLAG_KEYS, FLAG_KEYS, TFLAG_KEYS, type NumericKeyDefinition } from '../../../src/domain/flags/flagKeys';
import type { ErbIrDomain, ErbIrRef } from '../types';

export interface MappingResult {
  readonly ok: boolean;
  readonly legacy: ErbIrRef;
  readonly stat?: string;
  readonly key?: string;
  readonly issue?: 'missingMapping' | 'ambiguousMapping' | 'unsupportedDomain';
  readonly candidates?: readonly string[];
  readonly message?: string;
}

type Definition = StatKeyDefinition | NumericKeyDefinition;

const DOMAIN_KEY_MAPS: Partial<Record<ErbIrDomain, { readonly stat: string; readonly definitions: Record<string, Definition> }>> = {
  ABL: { stat: 'ability', definitions: ABILITY_KEYS },
  TALENT: { stat: 'talent', definitions: TALENT_KEYS },
  TEQUIP: { stat: 'equipment', definitions: EQUIPMENT_KEYS },
  CFLAG: { stat: 'cflag', definitions: CFLAG_KEYS },
  TFLAG: { stat: 'tflag', definitions: TFLAG_KEYS },
  FLAG: { stat: 'flag', definitions: FLAG_KEYS },
  SOURCE: { stat: 'source', definitions: SOURCE_KEYS },
  EXP: { stat: 'exp', definitions: EXP_KEYS },
  PALAM: { stat: 'palam', definitions: PALAM_KEYS },
  LOSEBASE: { stat: 'loseBase', definitions: LOSEBASE_KEYS },
  BASE: { stat: 'base', definitions: BASE_KEYS },
  STAIN: { stat: 'stain', definitions: STAIN_PART_KEYS },
  MARK: { stat: 'mark', definitions: MARK_KEYS },
  ITEM: { stat: 'item', definitions: ITEM_KEYS },
};

const LEGACY_REF_OVERRIDES: Partial<Record<ErbIrDomain, Record<number, { readonly stat: string; readonly key: string }>>> = {
  PALAM: {
    3: { stat: 'palam', key: 'lubrication' },
  },
  EXP: {
    40: { stat: 'exp', key: 'lesbianExperience' },
  },
};

export function resolveLegacyRef(ref: ErbIrRef): MappingResult {
  const override = LEGACY_REF_OVERRIDES[ref.domain]?.[ref.index];
  if (override) {
    return {
      ok: true,
      legacy: ref,
      stat: override.stat,
      key: override.key,
    };
  }

  const map = DOMAIN_KEY_MAPS[ref.domain];
  if (!map) {
    return {
      ok: false,
      legacy: ref,
      issue: 'unsupportedDomain',
      message: `Unsupported legacy domain ${ref.domain}:${ref.index}.`,
    };
  }

  const candidates = Object.values(map.definitions)
    .filter((definition) => definition.index === ref.index)
    .map((definition) => definition.key);

  const uniqueCandidates = Array.from(new Set(candidates));
  if (uniqueCandidates.length === 0) {
    return {
      ok: false,
      legacy: ref,
      stat: map.stat,
      issue: 'missingMapping',
      message: `No approved web-port key for ${legacyRefLabel(ref)}.`,
    };
  }

  if (uniqueCandidates.length > 1) {
    return {
      ok: false,
      legacy: ref,
      stat: map.stat,
      issue: 'ambiguousMapping',
      candidates: uniqueCandidates,
      message: `Multiple approved web-port keys for ${legacyRefLabel(ref)}: ${uniqueCandidates.join(', ')}.`,
    };
  }

  return {
    ok: true,
    legacy: ref,
    stat: map.stat,
    key: uniqueCandidates[0],
  };
}

export function legacyRefLabel(ref: ErbIrRef): string {
  const role = ref.role && ref.role !== 'target' ? `${ref.role}:` : '';
  return `${ref.domain}:${role}${ref.index}`;
}
