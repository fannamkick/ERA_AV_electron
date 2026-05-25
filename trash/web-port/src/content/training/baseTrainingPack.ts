import { TrainingEngine } from '../../domain/training/TrainingEngine';
import type { EffectHandlerRegistry } from '../../core/effects';
import { ContentRegistry, type ContentPack } from '../ContentRegistry';
import { basicTrainingCommands } from './basicCommands';

export const baseTrainingCommands = [
  ...basicTrainingCommands,
] as const;

export const baseTrainingPack: ContentPack = {
  id: 'training.base',
  name: 'Base Training Commands',
  version: '0.1.0',
  register(registry) {
    registry.registerTrainingCommands(baseTrainingCommands);
  },
};

export interface BaseTrainingEngineOptions {
  readonly convertSourceToPalamAfterEffects?: boolean;
  readonly clearMappedSourceAfterConversion?: boolean;
  readonly effectHandlers?: EffectHandlerRegistry;
}

export function createBaseContentRegistry(): ContentRegistry {
  return new ContentRegistry({ packs: [baseTrainingPack] });
}

export function createBaseTrainingEngine(options: BaseTrainingEngineOptions = {}): TrainingEngine {
  return createBaseContentRegistry().createTrainingEngine({
    convertSourceToPalamAfterEffects: options.convertSourceToPalamAfterEffects,
    clearMappedSourceAfterConversion: options.clearMappedSourceAfterConversion,
    effectHandlers: options.effectHandlers,
  });
}
