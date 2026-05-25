import { characterIdForTemplate, createCharacterBundle, type CharacterCreationBundle } from '../src/features/characterCreation';
import { createBodyStateFromTemplate, createPeopleBaseStatsFromTemplate } from '../src/features/bodyStats';
import { buildRosterView } from '../src/features/roster';
import { buildShootingView } from '../src/features/shooting';
import { buildTrainingView } from '../src/features/training';
import { buildWorkView } from '../src/features/work';
import type { GameAction } from '../src/game/actions';
import { validateActionResultBoundary, validateSavePayloadBoundary, validateStateSessionBoundary } from '../src/game/boundaries';
import { dispatchGameAction } from '../src/game/dispatch';
import type { GameActionContext, GameActionResult } from '../src/game/results';
import { createGameSavePayload, parseGameSavePayload, serializeGameSavePayload } from '../src/game/savePayload';
import { createInitialGameData, type GameSession, type GameState } from '../src/game/state';

type SmokeContext = {
  readonly state: GameState;
  readonly session: GameSession;
};

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function assertNoBoundaryErrors(label: string, diagnostics: readonly { readonly severity: string; readonly message: string }[]) {
  const errors = diagnostics.filter((diagnostic) => diagnostic.severity === 'error');
  assert(errors.length === 0, `${label} boundary failed:\n${errors.map((error) => error.message).join('\n')}`);
}

function assertNumberRecordEquals(actual: Record<string, number>, expected: Record<string, number>, label: string) {
  const actualEntries = Object.entries(actual).sort(([a], [b]) => Number(a) - Number(b) || a.localeCompare(b));
  const expectedEntries = Object.entries(expected).sort(([a], [b]) => Number(a) - Number(b) || a.localeCompare(b));
  assert(actualEntries.length === expectedEntries.length, `${label} entry count mismatch`);
  for (const [index, [expectedKey, expectedValue]] of expectedEntries.entries()) {
    const [actualKey, actualValue] = actualEntries[index];
    assert(actualKey === expectedKey, `${label} key mismatch at ${index}: expected ${expectedKey}, got ${actualKey}`);
    assert(actualValue === expectedValue, `${label} value mismatch for ${expectedKey}`);
  }
}

function makeStateWithAllCharacters(initial: GameState, bundle: CharacterCreationBundle): GameState {
  return {
    ...initial,
    people: {
      characters: bundle.characters,
    },
    body: {
      byCharacterId: bundle.bodies,
    },
    equipment: {
      byCharacterId: bundle.equipment,
    },
    social: {
      relationships: bundle.relationships,
      ntrProgress: {},
      partnerProgress: {},
    },
  };
}

function toActionContext(context: SmokeContext): GameActionContext {
  return {
    catalog: createInitialGameData().definitions,
    state: context.state,
    session: context.session,
  };
}

function nextContext(context: SmokeContext, result: GameActionResult): SmokeContext {
  return {
    state: result.state,
    session: result.session,
  };
}

function dispatchChecked(context: SmokeContext, action: GameAction): { readonly context: SmokeContext; readonly result: GameActionResult } {
  const actionContext = toActionContext(context);
  const result = dispatchGameAction(actionContext, action);
  assertNoBoundaryErrors(action.type, validateActionResultBoundary(actionContext, result));
  return {
    context: nextContext(context, result),
    result,
  };
}

function firstCharacterId(context: SmokeContext): string {
  const characterId = Object.keys(context.state.people.characters).sort()[0];
  assert(characterId, 'M33 smoke needs at least one character.');
  return characterId;
}

function assertAllTemplateSeeds() {
  const initialData = createInitialGameData();
  const definitions = initialData.definitions;
  const templateIds = Object.keys(definitions.characters).sort((a, b) => Number(a) - Number(b) || a.localeCompare(b));

  assert(Object.keys(definitions.baseStats).length === 23, 'M33 should load all 23 BASE definitions.');
  assert(Object.keys(definitions.abilities).length === 34, 'M33 should load all 34 ABL definitions.');
  assert(Object.keys(definitions.talents).length === 261, 'M33 should load all 261 TALENT definitions.');
  assert(Object.keys(definitions.experiences).length === 82, 'M33 should load all 82 EXP definitions.');
  assert(Object.keys(definitions.marks).length === 4, 'M33 should load all 4 MARK definitions.');
  assert(Object.keys(definitions.trainingParams).length === 17, 'M33 should load all 17 PALAM definitions.');

  const bundleResult = createCharacterBundle(definitions, templateIds);
  assert(bundleResult.ok, 'all character templates should create body/stat instances.');

  const state = makeStateWithAllCharacters(initialData.save, bundleResult.bundle);
  const roster = buildRosterView(state);
  assert(roster.entries.length === 109, 'roster should expose all created character stat summaries.');

  for (const templateId of templateIds) {
    const template = definitions.characters[templateId];
    const characterId = characterIdForTemplate(templateId);
    const character = state.people.characters[characterId];
    const body = state.body.byCharacterId[characterId];
    assert(character, `missing character for template ${templateId}`);
    assert(body, `missing body state for template ${templateId}`);

    assertNumberRecordEquals(
      character.attributes.baseStats.current,
      createPeopleBaseStatsFromTemplate(template),
      `people base stats ${templateId}`,
    );
    assertNumberRecordEquals(body.baseStats, createBodyStateFromTemplate(template).baseStats, `body base stats ${templateId}`);

    for (const [abilityId, value] of Object.entries(template.initialState.abilities)) {
      assert(character.attributes.abilities[abilityId] === value, `ability seed mismatch ${templateId}:${abilityId}`);
    }

    for (const talentId of template.initialState.talents) {
      assert(character.attributes.traits[talentId] === true, `talent seed mismatch ${templateId}:${talentId}`);
    }

    for (const [experienceId, value] of Object.entries(template.initialState.experiences)) {
      assert(character.attributes.experiences[experienceId] === value, `experience seed mismatch ${templateId}:${experienceId}`);
    }
  }

  const playerRoster = roster.entries.find((entry) => entry.templateId === '0');
  assert(playerRoster, 'roster should include player template stat summary.');
  assert(playerRoster.abilityCount > 0, 'roster should summarize ability seed count.');
  assert(playerRoster.traitCount > 0, 'roster should summarize talent seed count.');
  assert(playerRoster.bodyBaseStatCount > 0, 'roster should summarize body base stat seed count.');
}

function assertSharedBodyResultFields() {
  const initialData = createInitialGameData();
  let context: SmokeContext = {
    state: initialData.save,
    session: initialData.session,
  };

  let step = dispatchChecked(context, { type: 'game/new', input: { modeId: 'easy' } });
  assert(step.result.status === 'success', 'easy new game should succeed.');
  context = step.context;
  const characterId = firstCharacterId(context);

  const startBody = context.state.body.byCharacterId[characterId];
  assert(startBody, 'new game should create body state.');
  assert(Object.keys(startBody.baseStats).length > 0, 'new game body state should contain split BASE seed values.');
  assert(Object.keys(context.state.people.characters[characterId].attributes.abilities).length > 0, 'new game should contain ABL seed values.');

  step = dispatchChecked(context, { type: 'main/openWork' });
  assert(step.result.status === 'success', 'work entry should succeed.');
  context = step.context;
  const workView = buildWorkView(initialData.definitions, context.state, context.session);
  const work = workView.visibleWorks.find((entry) => entry.available);
  assert(work, 'M33 smoke needs an available work definition.');
  step = dispatchChecked(context, { type: 'work/select', workId: work.workId });
  assert(step.result.status === 'success', 'work selection should succeed.');
  context = step.context;
  step = dispatchChecked(context, { type: 'work/selectCharacter', characterId });
  assert(step.result.status === 'success', 'work character selection should succeed.');
  context = step.context;
  const staminaBeforeWork = context.state.body.byCharacterId[characterId].bodyStats.stamina ?? 0;
  step = dispatchChecked(context, { type: 'work/execute' });
  assert(step.result.status === 'success', 'work execution should succeed.');
  context = step.context;
  assert(
    context.state.body.byCharacterId[characterId].bodyStats.stamina < staminaBeforeWork,
    'work should write shared body.bodyStats result field.',
  );

  step = dispatchChecked(context, { type: 'main/openShooting' });
  assert(step.result.status === 'success', 'shooting entry should succeed.');
  context = step.context;
  const shootingView = buildShootingView(initialData.definitions, context.state, context.session);
  const scene = shootingView.visibleScenes.find((entry) => entry.available);
  assert(scene, 'M33 smoke needs an available shooting scene.');
  step = dispatchChecked(context, { type: 'shooting/selectTarget', characterId });
  assert(step.result.status === 'success', 'shooting target selection should succeed.');
  context = step.context;
  step = dispatchChecked(context, { type: 'shooting/selectScene', sceneId: scene.sceneId });
  assert(step.result.status === 'success', 'shooting scene selection should succeed.');
  context = step.context;
  const energyBeforeShooting = context.state.body.byCharacterId[characterId].bodyStats.energy ?? 0;
  step = dispatchChecked(context, { type: 'shooting/confirmScene' });
  assert(step.result.status === 'success', 'shooting execution should succeed.');
  context = step.context;
  assert(
    context.state.body.byCharacterId[characterId].bodyStats.energy < energyBeforeShooting,
    'shooting should write shared body.bodyStats result field.',
  );

  step = dispatchChecked(context, { type: 'main/openTraining' });
  assert(step.result.status === 'success', 'training entry should succeed.');
  context = step.context;
  step = dispatchChecked(context, { type: 'training/selectTarget', characterId });
  assert(step.result.status === 'success', 'training target selection should succeed.');
  context = step.context;
  step = dispatchChecked(context, { type: 'training/selectExecutor', characterId });
  assert(step.result.status === 'success', 'training executor selection should succeed.');
  context = step.context;
  const trainingView = buildTrainingView(initialData.definitions, context.state, context.session);
  const command = trainingView.visibleCommands.find((entry) => entry.commandId === '0');
  assert(command?.available === true, 'M33 smoke needs executable training command 0.');
  step = dispatchChecked(context, { type: 'training/selectCommand', commandId: '0' });
  assert(step.result.status === 'success', 'training command selection should succeed.');
  context = step.context;
  const resourceBeforeTraining = context.state.body.byCharacterId[characterId].trainingResources['0'] ?? 0;
  step = dispatchChecked(context, { type: 'training/execute' });
  assert(step.result.status === 'success', 'training execution should succeed.');
  context = step.context;
  assert(
    context.state.body.byCharacterId[characterId].trainingResources['0'] === resourceBeforeTraining + 1,
    'training should write shared body.trainingResources result field.',
  );
  assert(
    context.state.body.byCharacterId[characterId].conditionParams['0'] !== undefined,
    'training should write shared body.conditionParams result field.',
  );

  context = {
    ...context,
    state: {
      ...context.state,
      people: {
        characters: {
          ...context.state.people.characters,
          [characterId]: {
            ...context.state.people.characters[characterId],
            attributes: {
              ...context.state.people.characters[characterId].attributes,
              abilities: {
                ...context.state.people.characters[characterId].attributes.abilities,
                '1': context.state.people.characters[characterId].attributes.abilities['1'] ?? 1,
              },
              traits: {
                ...context.state.people.characters[characterId].attributes.traits,
                '91': true,
                '153': true,
                '154': true,
                '325': true,
              },
              experiences: {
                ...context.state.people.characters[characterId].attributes.experiences,
                '70': context.state.people.characters[characterId].attributes.experiences['70'] ?? 1,
              },
            },
          },
        },
      },
      body: {
        byCharacterId: {
          ...context.state.body.byCharacterId,
          [characterId]: {
            ...context.state.body.byCharacterId[characterId],
            imprints: {
              ...context.state.body.byCharacterId[characterId].imprints,
              '0': 1,
            },
          },
        },
      },
    },
  };

  const savePayload = createGameSavePayload(context.state, new Date('2026-05-01T00:00:00.000Z'));
  assertNoBoundaryErrors('M33 save payload', validateSavePayloadBoundary(savePayload));
  const parsed = parseGameSavePayload(serializeGameSavePayload(savePayload));
  assert(parsed.ok, 'M33 save payload should parse after serialization.');
  assert(
    parsed.payload.state.body.byCharacterId[characterId].trainingResources['0'] === resourceBeforeTraining + 1,
    'training resource should survive save roundtrip.',
  );
  assert(
    parsed.payload.state.people.characters[characterId].attributes.experiences['13'] !== undefined,
    'training/work/shooting experience owner should survive save roundtrip.',
  );
  assert(
    parsed.payload.state.people.characters[characterId].attributes.traits['153'] === true &&
      parsed.payload.state.people.characters[characterId].attributes.traits['154'] === true &&
      parsed.payload.state.people.characters[characterId].attributes.traits['325'] === true &&
      parsed.payload.state.people.characters[characterId].attributes.traits['91'] === true,
    'TALENT save fields should survive save roundtrip.',
  );
  assert(parsed.payload.state.body.byCharacterId[characterId].imprints['0'] === 1, 'MARK save field should survive save roundtrip.');
  assertNoBoundaryErrors('M33 final state/session', validateStateSessionBoundary(context.state, context.session));
}

function main() {
  assertAllTemplateSeeds();
  assertSharedBodyResultFields();
  console.log('M33 body/stat smoke passed: all Chara stat seeds, shared body result fields, and save roundtrip verified.');
}

main();
