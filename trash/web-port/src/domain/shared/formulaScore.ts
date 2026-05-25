import type { DomainRuntimeContext } from './domainRuntime';

export interface FormulaScoreTerm {
  readonly id: string;
  readonly label?: string;
  readonly when?: (
    context: DomainRuntimeContext,
    command: unknown,
  ) => boolean;
  readonly value: (
    context: DomainRuntimeContext,
    command: unknown,
  ) => number;
}

export interface NumericStatScoreTermOptions {
  readonly id: string;
  readonly stat: string;
  readonly key: string;
  readonly weight?: number;
  readonly role?: string;
  readonly label?: string;
  readonly when?: FormulaScoreTerm['when'];
}

export interface ConstantScoreTermOptions {
  readonly id: string;
  readonly value: number;
  readonly label?: string;
  readonly when?: FormulaScoreTerm['when'];
}

export interface PalamLevelScoreTermOptions {
  readonly id: string;
  readonly key: string;
  readonly thresholds: readonly number[];
  readonly weight?: number;
  readonly role?: string;
  readonly label?: string;
  readonly when?: FormulaScoreTerm['when'];
}

export function numericStatScoreTerm(options: NumericStatScoreTermOptions): FormulaScoreTerm {
  return {
    id: options.id,
    label: options.label,
    when: options.when,
    value: (context) => {
      const targetId = options.role ? context.resolveTargetId?.(options.role) : undefined;
      return context.getNumericStat(options.stat, options.key, targetId) * (options.weight ?? 1);
    },
  };
}

export function constantScoreTerm(options: ConstantScoreTermOptions): FormulaScoreTerm {
  return {
    id: options.id,
    label: options.label,
    when: options.when,
    value: () => options.value,
  };
}

export function palamLevelScoreTerm(options: PalamLevelScoreTermOptions): FormulaScoreTerm {
  return {
    id: options.id,
    label: options.label,
    when: options.when,
    value: (context) => palamLevel(
      readRoleStat(context, 'palam', options.key, options.role),
      options.thresholds,
    ) * (options.weight ?? 1),
  };
}

export function palamLevel(value: number, thresholds: readonly number[]): number {
  let level = 0;
  for (const threshold of thresholds) {
    if (!Number.isFinite(threshold)) {
      throw new Error(`PALAM threshold must be finite: ${threshold}`);
    }
    if (value < threshold) return level;
    level += 1;
  }
  return level;
}

function readRoleStat(
  context: DomainRuntimeContext,
  stat: string,
  key: string,
  role?: string,
): number {
  const targetId = role ? context.resolveTargetId?.(role) : undefined;
  return context.getNumericStat(stat, key, targetId);
}
