import {
  TrainingEngine,
  type TrainingCommandDefinition,
} from '../domain/training';
import type { EffectHandlerRegistry } from '../core/effects';

export interface ContentPack {
  readonly id: string;
  readonly name?: string;
  readonly version?: string;
  readonly experimental?: boolean;
  readonly enabledByDefault?: boolean;
  register(registry: ContentRegistry): void;
}

export interface ContentRegistryOptions {
  readonly packs?: readonly ContentPack[];
  readonly enabledPackIds?: readonly string[];
  readonly disabledPackIds?: readonly string[];
}

export interface ContentTrainingEngineOptions {
  readonly convertSourceToPalamAfterEffects?: boolean;
  readonly clearMappedSourceAfterConversion?: boolean;
  readonly effectHandlers?: EffectHandlerRegistry;
}

export interface ContentRegistryQueryOptions {
  readonly includeDisabledPacks?: boolean;
}

export interface RegisteredTrainingCommand {
  readonly packId: string;
  readonly command: TrainingCommandDefinition;
}

export class ContentRegistry {
  private readonly packsById = new Map<string, ContentPack>();
  private readonly enabledPackIds = new Set<string>();
  private readonly trainingCommandsById = new Map<string, RegisteredTrainingCommand>();
  private readonly trainingCommandsByOriginalId = new Map<number, RegisteredTrainingCommand>();
  private registeringPackId: string | undefined;

  constructor(options: ContentRegistryOptions = {}) {
    for (const pack of options.packs ?? []) {
      this.registerPack(pack);
    }

    for (const packId of options.enabledPackIds ?? []) {
      this.setPackEnabled(packId, true);
    }

    for (const packId of options.disabledPackIds ?? []) {
      this.setPackEnabled(packId, false);
    }
  }

  registerPack(pack: ContentPack): void {
    if (!pack.id.trim()) {
      throw new Error('Content pack id is required.');
    }

    if (this.packsById.has(pack.id)) {
      throw new Error(`Duplicate content pack id: ${pack.id}`);
    }

    this.packsById.set(pack.id, pack);

    if (pack.enabledByDefault ?? !pack.experimental) {
      this.enabledPackIds.add(pack.id);
    }

    const previousPackId = this.registeringPackId;
    this.registeringPackId = pack.id;
    try {
      pack.register(this);
    } finally {
      this.registeringPackId = previousPackId;
    }
  }

  getRegisteredPackIds(): string[] {
    return Array.from(this.packsById.keys());
  }

  getEnabledPackIds(): string[] {
    return Array.from(this.enabledPackIds);
  }

  isPackEnabled(packId: string): boolean {
    return this.enabledPackIds.has(packId);
  }

  setPackEnabled(packId: string, enabled: boolean): void {
    if (!this.packsById.has(packId)) {
      throw new Error(`Unknown content pack id: ${packId}`);
    }

    if (enabled) {
      this.enabledPackIds.add(packId);
    } else {
      this.enabledPackIds.delete(packId);
    }
  }

  registerTrainingCommand(command: TrainingCommandDefinition): void {
    if (this.trainingCommandsById.has(command.id)) {
      throw new Error(`Duplicate training command id: ${command.id}`);
    }

    const record: RegisteredTrainingCommand = {
      packId: this.registeringPackId ?? 'manual',
      command,
    };

    this.trainingCommandsById.set(command.id, record);

    if (command.originalId !== undefined) {
      if (this.trainingCommandsByOriginalId.has(command.originalId)) {
        throw new Error(`Duplicate original training command id: ${command.originalId}`);
      }
      this.trainingCommandsByOriginalId.set(command.originalId, record);
    }
  }

  registerTrainingCommands(commands: readonly TrainingCommandDefinition[]): void {
    for (const command of commands) {
      this.registerTrainingCommand(command);
    }
  }

  getTrainingCommand(commandId: string): TrainingCommandDefinition | undefined {
    const record = this.trainingCommandsById.get(commandId);
    if (!record || !this.isRecordEnabled(record)) return undefined;
    return record.command;
  }

  getTrainingCommandByOriginalId(originalId: number): TrainingCommandDefinition | undefined {
    const record = this.trainingCommandsByOriginalId.get(originalId);
    if (!record || !this.isRecordEnabled(record)) return undefined;
    return record.command;
  }

  getAllTrainingCommands(options: ContentRegistryQueryOptions = {}): TrainingCommandDefinition[] {
    return this.getAllTrainingCommandRecords(options).map((record) => record.command);
  }

  getAllTrainingCommandRecords(options: ContentRegistryQueryOptions = {}): RegisteredTrainingCommand[] {
    return Array.from(this.trainingCommandsById.values())
      .filter((record) => options.includeDisabledPacks || this.isRecordEnabled(record));
  }

  createTrainingEngine(options: ContentTrainingEngineOptions = {}): TrainingEngine {
    return new TrainingEngine({
      commands: this.getAllTrainingCommands(),
      convertSourceToPalamAfterEffects: options.convertSourceToPalamAfterEffects,
      clearMappedSourceAfterConversion: options.clearMappedSourceAfterConversion,
      effectHandlers: options.effectHandlers,
    });
  }

  private isRecordEnabled(record: RegisteredTrainingCommand): boolean {
    return record.packId === 'manual' || this.enabledPackIds.has(record.packId);
  }
}

export function createContentRegistry(options: ContentRegistryOptions = {}): ContentRegistry {
  return new ContentRegistry(options);
}
