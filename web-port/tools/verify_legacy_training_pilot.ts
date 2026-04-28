type CommandId = 'COMF0' | 'COMF1' | 'COMF6';

interface LegacyBaselineCommand {
  readonly commandId: CommandId;
  readonly originalId: number;
  readonly source: Record<number, number>;
  readonly exp: Record<number, number>;
  readonly base: Record<number, number>;
  readonly loseBase?: Record<number, number>;
  readonly messages: readonly string[];
  readonly warnings: readonly string[];
}

interface SourceToPalamMapping {
  readonly sourceIndex: number;
  readonly palamIndex: number;
  readonly meaning: string;
}

interface PalamDecay {
  readonly palamIndex: number;
  readonly decay: number;
}

interface SourceCheckChange {
  readonly sourceIndex: number;
  readonly palamIndex: number;
  readonly sourceValue: number;
  readonly palamBefore: number;
  readonly palamAfter: number;
  readonly sourceBefore: number;
  readonly sourceAfter: number;
}

interface SourceCheckDecayChange {
  readonly palamIndex: number;
  readonly decay: number;
  readonly palamBefore: number;
  readonly palamAfter: number;
}

interface SourceCheckWarning {
  readonly sourceIndex: number;
  readonly sourceValue: number;
  readonly message: string;
}

const MODE = 'documented-baseline' as const;

const SOURCE_TO_PALAM_MAPPINGS: readonly SourceToPalamMapping[] = [
  { sourceIndex: 0, palamIndex: 0, meaning: 'C pleasure' },
  { sourceIndex: 1, palamIndex: 1, meaning: 'V/B-related pleasure in current legacy code' },
  { sourceIndex: 2, palamIndex: 2, meaning: 'A-related pleasure' },
  { sourceIndex: 17, palamIndex: 14, meaning: 'B secondary pleasure' },
  { sourceIndex: 3, palamIndex: 3, meaning: 'arousal/lubrication' },
  { sourceIndex: 4, palamIndex: 4, meaning: 'submission' },
  { sourceIndex: 5, palamIndex: 5, meaning: 'lust' },
  { sourceIndex: 6, palamIndex: 6, meaning: 'pain' },
  { sourceIndex: 9, palamIndex: 9, meaning: 'pain-related secondary value' },
  { sourceIndex: 10, palamIndex: 10, meaning: 'fear' },
] as const;

const PALAM_NATURAL_DECAYS: readonly PalamDecay[] = [
  { palamIndex: 5, decay: 10 },
  { palamIndex: 9, decay: 20 },
  { palamIndex: 10, decay: 15 },
] as const;

const SOURCE_TO_PALAM_BY_SOURCE = new Map(
  SOURCE_TO_PALAM_MAPPINGS.map((mapping) => [mapping.sourceIndex, mapping]),
);

const LEGACY_IMPORT_WARNING =
  'Legacy ImprovedTrainingModule execution is not used: src/legacy is excluded from the app tsconfig and current legacy command sources contain malformed/garbled string syntax. Snapshot is generated from web-port/docs/TRAINING_MIGRATION_NOTES.md.';

const BASELINES: readonly LegacyBaselineCommand[] = [
  {
    commandId: 'COMF0',
    originalId: 0,
    source: {
      0: 20,
      17: 15,
      3: 50,
      4: 60,
      8: 30,
      12: 100,
    },
    exp: {
      14: 1,
    },
    base: {
      0: 5,
      1: 50,
    },
    messages: [],
    warnings: [
      LEGACY_IMPORT_WARNING,
      'Dynamic modifiers are not included: ABL tables, equipment 45/89/90, faint state, talents 15/61/62/85, stain modifiers, and conditional EXP 40/41/23.',
    ],
  },
  {
    commandId: 'COMF1',
    originalId: 1,
    source: {
      0: 40,
      9: 100,
      10: 100,
      12: 220,
      14: 50,
    },
    exp: {
      40: 3,
    },
    base: {},
    loseBase: {
      0: 5,
      1: 50,
    },
    messages: [],
    warnings: [
      LEGACY_IMPORT_WARNING,
      'Snapshot covers the default original-ERB COMF1 path. COM69 derived target effects are not included.',
    ],
  },
  {
    commandId: 'COMF6',
    originalId: 6,
    source: {
      3: 100,
      4: 25,
      5: 5,
      8: 40,
    },
    exp: {
      40: 3,
    },
    base: {},
    loseBase: {
      0: 5,
      1: 50,
    },
    messages: [],
    warnings: [
      LEGACY_IMPORT_WARNING,
      'Snapshot covers the default original-ERB COMF6 execution path with order-gate-pass state. COM128/COM133 derived target effects are not included.',
    ],
  },
] as const;

function dense(values: Readonly<Record<number, number>>): number[] {
  const indexes = Object.keys(values)
    .map((key) => Number(key))
    .filter((key) => Number.isInteger(key) && values[key] !== undefined);
  const lastIndex = Math.max(-1, ...indexes);

  if (lastIndex < 0) {
    return [];
  }

  return Array.from({ length: lastIndex + 1 }, (_, index) => values[index] ?? 0);
}

function toRecord(values: readonly number[]): Record<number, number> {
  const result: Record<number, number> = {};

  values.forEach((value, index) => {
    if (value !== 0) {
      result[index] = value;
    }
  });

  return result;
}

function applySourceCheck(sourceRecord: Readonly<Record<number, number>>): {
  readonly palamAfterSourceCheck: number[];
  readonly sourceCheckChanges: SourceCheckChange[];
  readonly sourceCheckDecayChanges: SourceCheckDecayChange[];
  readonly sourceCheckWarnings: SourceCheckWarning[];
} {
  const palam: number[] = [];
  const sourceCheckChanges: SourceCheckChange[] = [];
  const sourceCheckWarnings: SourceCheckWarning[] = [];

  for (const [sourceKey, sourceValue] of Object.entries(sourceRecord)) {
    if (!sourceValue) {
      continue;
    }

    const sourceIndex = Number(sourceKey);
    const mapping = SOURCE_TO_PALAM_BY_SOURCE.get(sourceIndex);

    if (!mapping) {
      sourceCheckWarnings.push({
        sourceIndex,
        sourceValue,
        message: `SOURCE ${sourceIndex} is ignored by legacy SourceCheck mapping.`,
      });
      continue;
    }

    const palamBefore = palam[mapping.palamIndex] ?? 0;
    const palamAfter = palamBefore + sourceValue;
    palam[mapping.palamIndex] = palamAfter;
    sourceCheckChanges.push({
      sourceIndex,
      palamIndex: mapping.palamIndex,
      sourceValue,
      palamBefore,
      palamAfter,
      sourceBefore: sourceValue,
      sourceAfter: 0,
    });
  }

  const sourceCheckDecayChanges = PALAM_NATURAL_DECAYS.map((decay) => {
    const palamBefore = palam[decay.palamIndex] ?? 0;
    const palamAfter = Math.max(0, palamBefore - decay.decay);
    palam[decay.palamIndex] = palamAfter;

    return {
      palamIndex: decay.palamIndex,
      decay: decay.decay,
      palamBefore,
      palamAfter,
    };
  });

  return {
    palamAfterSourceCheck: dense(toRecord(palam)),
    sourceCheckChanges,
    sourceCheckDecayChanges,
    sourceCheckWarnings,
  };
}

function snapshot(command: LegacyBaselineCommand) {
  const sourceCheck = applySourceCheck(command.source);

  return {
    mode: MODE,
    commandId: command.commandId,
    originalId: command.originalId,
    source: dense(command.source),
    sourceAfterCommand: dense(command.source),
    palamAfterSourceCheck: sourceCheck.palamAfterSourceCheck,
    exp: dense(command.exp),
    base: dense(command.base),
    loseBase: dense(command.loseBase ?? {}),
    messages: [...command.messages],
    warnings: [...command.warnings],
    sourceCheckChanges: sourceCheck.sourceCheckChanges,
    sourceCheckDecayChanges: sourceCheck.sourceCheckDecayChanges,
    sourceCheckWarnings: sourceCheck.sourceCheckWarnings,
  };
}

function main(): void {
  const result = {
    mode: MODE,
    generatedFrom: [
      'web-port/docs/TRAINING_MIGRATION_NOTES.md',
      'legacy SourceCheck mapping documented in web-port/src/legacy/training/systems/SourceCheck.ts',
    ],
    commands: BASELINES.map(snapshot),
  };

  console.log(JSON.stringify(result, null, 2));
}

main();
