import { createBaseTrainingEngine } from '../src/content/training';
import {
  createEmptyTrainingState,
  createEmptyTrainingCharacterState,
  createInMemoryTrainingContext,
  type InMemoryTrainingCharacterState,
} from '../src/domain/adapters';
import { ABILITY_KEYS } from '../src/domain/stats';

const CHARACTER_ID = 1;
const PILOT_COMMAND_IDS = [
  'training.basic.caress',
  'training.basic.cunnilingus',
  'training.basic.kiss',
] as const;

function dense(values: readonly number[]): number[] {
  const lastDefinedIndex = values.reduce(
    (last, value, index) => (value === undefined ? last : index),
    -1,
  );

  if (lastDefinedIndex < 0) {
    return [];
  }

  return Array.from({ length: lastDefinedIndex + 1 }, (_, index) => values[index] ?? 0);
}

function snapshot(character: InMemoryTrainingCharacterState) {
  return {
    source: dense(character.source),
    palamAfterSourceCheck: dense(character.palam),
    exp: dense(character.exp),
    base: dense(character.base),
    stain: dense(character.stain),
  };
}

function executeCommands(commandIds: readonly string[]) {
  const state = createEmptyTrainingState();
  state.characters[CHARACTER_ID] = createEmptyTrainingCharacterState();
  state.characters[CHARACTER_ID].ability[ABILITY_KEYS.obedience.index] = 2;

  const context = createInMemoryTrainingContext(state, CHARACTER_ID, { trainer: 2 });
  const engine = createBaseTrainingEngine({ convertSourceToPalamAfterEffects: true });

  return commandIds.map((commandId) => {
    const result = engine.execute(commandId, context);
    const character = state.characters[CHARACTER_ID];

    return {
      commandId: result.commandId,
      originalId: result.originalId,
      success: result.success,
      appliedEffects: result.appliedEffects,
      messages: result.messages,
      warnings: result.warnings,
      sourceAfterCommand: dense(result.sourceAfterEffects ?? []),
      sourceCheckChanges: result.sourceConversion?.changes ?? [],
      sourceCheckDecayChanges: result.sourceConversion?.decayChanges ?? [],
      sourceCheckWarnings: result.sourceConversion?.warnings ?? [],
      ...(character ? snapshot(character) : { source: [], exp: [], base: [], stain: [] }),
    };
  });
}

function executeIsolatedCommands() {
  return PILOT_COMMAND_IDS.map((commandId) => executeCommands([commandId])[0]);
}

function main(): void {
  const results = {
    isolated: executeIsolatedCommands(),
    cumulative: executeCommands(PILOT_COMMAND_IDS),
  };

  console.log(JSON.stringify(results, null, 2));
}

main();
