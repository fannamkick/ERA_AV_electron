import type {
  TrainingCommandDefinition,
  TrainingCommandRuntimeContext,
  TrainingFormulaGateResolver,
  TrainingFormulaGateResult,
} from './trainingTypes';
export {
  constantScoreTerm,
  numericStatScoreTerm,
  palamLevel,
  palamLevelScoreTerm,
  type ConstantScoreTermOptions,
  type FormulaScoreTerm,
  type NumericStatScoreTermOptions,
  type PalamLevelScoreTermOptions,
} from '../shared';
import type { FormulaScoreTerm } from '../shared';

export interface ScoreFormulaGateDefinition {
  readonly id: string;
  readonly threshold: number | ((
    context: TrainingCommandRuntimeContext,
    command: TrainingCommandDefinition,
  ) => number);
  readonly terms: readonly FormulaScoreTerm[];
  readonly reason?: string;
  readonly autoPassWhen?: (
    context: TrainingCommandRuntimeContext,
    command: TrainingCommandDefinition,
  ) => boolean;
}

export function defineFormulaGate(
  id: string,
  resolve: (
    context: TrainingCommandRuntimeContext,
    command: TrainingCommandDefinition,
  ) => Omit<TrainingFormulaGateResult, 'id'>,
): TrainingFormulaGateResolver {
  if (!id.trim()) {
    throw new Error('Formula gate id is required.');
  }

  return (context, command) => ({
    id,
    ...resolve(context, command),
  });
}

export function defineScoreFormulaGate(definition: ScoreFormulaGateDefinition): TrainingFormulaGateResolver {
  if (!definition.id.trim()) {
    throw new Error('Score formula gate id is required.');
  }

  if (definition.terms.length === 0) {
    throw new Error(`Score formula gate must include at least one term: ${definition.id}`);
  }

  return defineFormulaGate(definition.id, (context, command) => {
    const threshold = typeof definition.threshold === 'function'
      ? definition.threshold(context, command)
      : definition.threshold;

    if (!Number.isFinite(threshold)) {
      throw new Error(`Score formula gate threshold must be finite: ${definition.id}`);
    }

    if (definition.autoPassWhen?.(context, command)) {
      return {
        passed: true,
        score: threshold,
        threshold,
        details: ['auto-pass'],
      };
    }

    const details: string[] = [];
    const score = definition.terms.reduce((total, term) => {
      if (term.when && !term.when(context, command)) return total;

      const value = term.value(context, command);
      if (!Number.isFinite(value)) {
        throw new Error(`Score formula gate term must be finite: ${definition.id}.${term.id}`);
      }

      details.push(`${term.label ?? term.id}: ${value}`);
      return total + value;
    }, 0);

    const passed = score >= threshold;
    return {
      passed,
      score,
      threshold,
      reasons: passed ? [] : [definition.reason ?? `${definition.id} score ${score} is below ${threshold}.`],
      details,
    };
  });
}

export { commonOrderGateTerms, comf6OrderGateTerms } from '../person';
