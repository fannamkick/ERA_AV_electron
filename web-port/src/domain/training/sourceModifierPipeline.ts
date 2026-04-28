import { addSource, type Effect } from '../../core/effects';
import type { TrainingCommandRuntimeContext, TrainingEffectResolver } from './trainingTypes';

export type SourceValues = Partial<Record<string, number>>;

export interface SourceModifier {
  readonly id: string;
  readonly apply: (
    context: TrainingCommandRuntimeContext,
    source: Readonly<SourceValues>,
  ) => SourceValues;
  readonly when?: (
    context: TrainingCommandRuntimeContext,
    source: Readonly<SourceValues>,
  ) => boolean;
}

export interface SourcePipelineSpec {
  readonly initial: (context: TrainingCommandRuntimeContext) => SourceValues;
  readonly modifiers: readonly SourceModifier[];
}

export function defineSourceModifier(modifier: SourceModifier): SourceModifier {
  if (!modifier.id.trim()) {
    throw new Error('Source modifier id is required.');
  }

  return modifier;
}

export function applySourceModifiers(
  context: TrainingCommandRuntimeContext,
  initialSource: Readonly<SourceValues>,
  modifiers: readonly SourceModifier[],
): SourceValues {
  const seenIds = new Set<string>();

  return modifiers.reduce<SourceValues>((source, modifier) => {
    if (seenIds.has(modifier.id)) {
      throw new Error(`Duplicate source modifier id in pipeline: ${modifier.id}`);
    }
    seenIds.add(modifier.id);

    if (modifier.when && !modifier.when(context, source)) {
      return source;
    }

    return modifier.apply(context, source);
  }, { ...initialSource });
}

export function defineSourcePipeline(spec: SourcePipelineSpec): TrainingEffectResolver {
  return (context) =>
    sourceEffectsFromValues(applySourceModifiers(context, spec.initial(context), spec.modifiers));
}

export function sourceEffectsFromValues(source: Readonly<SourceValues>): readonly Effect[] {
  return Object.entries(source)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => {
      if (!Number.isFinite(value)) {
        throw new Error(`Source value must be finite: ${key}=${String(value)}`);
      }
      return addSource(key, value ?? 0);
    });
}
