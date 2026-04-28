import { statIndex, type PalamKey, type SourceKey } from '../stats';

export type SourceIndex = number;
export type PalamIndex = number;

type SourceProgressionPalamKey = PalamKey | 'lust' | 'secondaryPleasureB';

const LOCAL_PALAM_INDEXES = {
  lust: 5,
  secondaryPleasureB: 14,
} as const satisfies Record<string, PalamIndex>;

export interface SourceToPalamMapping {
  readonly sourceKey: SourceKey;
  readonly palamKey: SourceProgressionPalamKey;
  readonly meaning: string;
}

export interface SourceToPalamChange {
  readonly sourceIndex: SourceIndex;
  readonly palamIndex: PalamIndex;
  readonly sourceValue: number;
  readonly palamBefore: number;
  readonly palamAfter: number;
  readonly sourceBefore: number;
  readonly sourceAfter: number;
}

export interface PalamNaturalDecayChange {
  readonly palamIndex: PalamIndex;
  readonly decay: number;
  readonly palamBefore: number;
  readonly palamAfter: number;
}

export interface PalamNaturalDecay {
  readonly palamIndex: PalamIndex;
  readonly decay: number;
}

export interface IgnoredSourceWarning {
  readonly sourceIndex: SourceIndex;
  readonly sourceValue: number;
  readonly message: string;
}

export interface SourceConversionResult {
  readonly palam: number[];
  readonly source: number[];
  readonly changes: readonly SourceToPalamChange[];
  readonly decayChanges: readonly PalamNaturalDecayChange[];
  readonly warnings: readonly IgnoredSourceWarning[];
}

export interface ConvertSourceToPalamOptions {
  readonly palam: readonly number[];
  readonly source: readonly number[];
  readonly clearMappedSource?: boolean;
}

export const SOURCE_TO_PALAM_MAPPINGS: readonly SourceToPalamMapping[] = [
  { sourceKey: 'pleasureC', palamKey: 'pleasureC', meaning: 'C pleasure' },
  { sourceKey: 'pleasureV', palamKey: 'pleasureB', meaning: 'V/B-related pleasure in current legacy code' },
  { sourceKey: 'pleasureA', palamKey: 'pleasureV', meaning: 'A-related pleasure' },
  { sourceKey: 'pleasureB', palamKey: 'secondaryPleasureB', meaning: 'B secondary pleasure' },
  { sourceKey: 'arousal', palamKey: 'arousal', meaning: 'arousal/lubrication' },
  { sourceKey: 'submission', palamKey: 'submission', meaning: 'submission' },
  { sourceKey: 'lust', palamKey: 'lust', meaning: 'lust' },
  { sourceKey: 'obedience', palamKey: 'obedience', meaning: 'pain' },
  { sourceKey: 'pain', palamKey: 'pain', meaning: 'pain-related secondary value' },
  { sourceKey: 'fear', palamKey: 'fear', meaning: 'fear' },
] as const;

export const PALAM_NATURAL_DECAYS: readonly PalamNaturalDecay[] = [
  { palamIndex: 5, decay: 10 },
  { palamIndex: 9, decay: 20 },
  { palamIndex: 10, decay: 15 },
] as const;

const SOURCE_TO_PALAM_BY_SOURCE = new Map<SourceIndex, SourceToPalamMapping>(
  SOURCE_TO_PALAM_MAPPINGS.map((mapping) => [sourceIndexForKey(mapping.sourceKey), mapping]),
);

function sourceIndexForKey(sourceKey: SourceKey): SourceIndex {
  return statIndex('source', sourceKey);
}

function palamIndexForKey(palamKey: SourceProgressionPalamKey): PalamIndex {
  if (palamKey in LOCAL_PALAM_INDEXES) {
    return LOCAL_PALAM_INDEXES[palamKey as keyof typeof LOCAL_PALAM_INDEXES];
  }

  return statIndex('palam', palamKey);
}

function arrayValue(values: readonly number[], index: number): number {
  return values[index] ?? 0;
}

function setArrayValue(values: number[], index: number, value: number): void {
  values[index] = value;
}

function numericSourceEntries(source: readonly number[]): Array<[SourceIndex, number]> {
  const entries: Array<[SourceIndex, number]> = [];

  for (let index = 0; index < source.length; index += 1) {
    const value = source[index] ?? 0;
    if (value !== 0) {
      entries.push([index, value]);
    }
  }

  return entries;
}

export function convertSourceToPalam(options: ConvertSourceToPalamOptions): SourceConversionResult {
  const palam = [...options.palam];
  const source = [...options.source];
  const changes: SourceToPalamChange[] = [];
  const warnings: IgnoredSourceWarning[] = [];

  for (const [sourceIndex, sourceValue] of numericSourceEntries(source)) {
    const mapping = SOURCE_TO_PALAM_BY_SOURCE.get(sourceIndex);

    if (!mapping) {
      warnings.push({
        sourceIndex,
        sourceValue,
        message: `SOURCE ${sourceIndex} is ignored by legacy SourceCheck mapping.`,
      });
      continue;
    }

    const mappedSourceIndex = sourceIndexForKey(mapping.sourceKey);
    const mappedPalamIndex = palamIndexForKey(mapping.palamKey);
    const palamBefore = arrayValue(palam, mappedPalamIndex);
    const palamAfter = palamBefore + sourceValue;
    const sourceAfter = options.clearMappedSource ? 0 : sourceValue;
    setArrayValue(palam, mappedPalamIndex, palamAfter);

    changes.push({
      sourceIndex: mappedSourceIndex,
      palamIndex: mappedPalamIndex,
      sourceValue,
      palamBefore,
      palamAfter,
      sourceBefore: sourceValue,
      sourceAfter,
    });

    if (options.clearMappedSource) {
      setArrayValue(source, sourceIndex, sourceAfter);
    }
  }

  const decayChanges = PALAM_NATURAL_DECAYS.map(({ palamIndex, decay }) => {
    const palamBefore = arrayValue(palam, palamIndex);
    const palamAfter = Math.max(0, palamBefore - decay);
    setArrayValue(palam, palamIndex, palamAfter);

    return {
      palamIndex,
      decay,
      palamBefore,
      palamAfter,
    };
  });

  return {
    palam,
    source,
    changes,
    decayChanges,
    warnings,
  };
}
