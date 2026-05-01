import { createCharacterBundle, characterIdForTemplate, type CharacterCreationBundle } from '../src/features/characterCreation';
import {
  canRetireCharacter,
  isCharacterActive,
  isCharacterAssistantEligible,
} from '../src/features/characterLifecycle';
import { buildRosterView } from '../src/features/roster';
import { validateSavePayloadBoundary, validateStateSessionBoundary } from '../src/game/boundaries';
import { dispatchGameAction } from '../src/game/dispatch';
import { createGameSavePayload, parseGameSavePayload, serializeGameSavePayload } from '../src/game/savePayload';
import { createInitialGameData, type GameState } from '../src/game/state';

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function assertNoBoundaryErrors(label: string, diagnostics: readonly { readonly severity: string; readonly message: string }[]) {
  const errors = diagnostics.filter((diagnostic) => diagnostic.severity === 'error');
  assert(errors.length === 0, `${label} boundary failed:\n${errors.map((error) => error.message).join('\n')}`);
}

function normalizeOptional(value: string | undefined): string | undefined {
  return value && value.length > 0 ? value : undefined;
}

function assertProfileTextSlots(
  actual: Record<string, string>,
  expected: Record<string, string>,
  templateId: string,
) {
  const actualEntries = Object.entries(actual).sort(([a], [b]) => Number(a) - Number(b) || a.localeCompare(b));
  const expectedEntries = Object.entries(expected).sort(([a], [b]) => Number(a) - Number(b) || a.localeCompare(b));
  assert(actualEntries.length === expectedEntries.length, `profileTextSlots count mismatch for template ${templateId}`);
  for (const [index, [expectedSlot, expectedValue]] of expectedEntries.entries()) {
    const [actualSlot, actualValue] = actualEntries[index];
    assert(actualSlot === expectedSlot, `profileTextSlots key mismatch for template ${templateId}: ${expectedSlot}`);
    assert(actualValue === expectedValue, `profileTextSlots value mismatch for template ${templateId}: ${expectedSlot}`);
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

function main() {
  const initialData = createInitialGameData();
  const definitions = initialData.definitions;
  const templateIds = Object.keys(definitions.characters).sort((a, b) => Number(a) - Number(b) || a.localeCompare(b));

  assert(templateIds.length === 109, 'M32 must see all 109 character templates.');

  const bundleResult = createCharacterBundle(definitions, templateIds);
  assert(bundleResult.ok, 'all character templates should create instances.');

  let state = makeStateWithAllCharacters(initialData.save, bundleResult.bundle);
  assertNoBoundaryErrors('all-character state/session', validateStateSessionBoundary(state, initialData.session));

  for (const templateId of templateIds) {
    const template = definitions.characters[templateId];
    const characterId = characterIdForTemplate(templateId);
    const character = state.people.characters[characterId];
    assert(character, `missing created character for template ${templateId}`);
    assert(character.identity.templateId === templateId, `template id mismatch for ${templateId}`);
    assert(character.identity.displayName === template.displayName, `displayName mismatch for ${templateId}`);
    assert(character.identity.callName === normalizeOptional(template.callName), `callName mismatch for ${templateId}`);
    assert(character.identity.nickname === normalizeOptional(template.nickname), `nickname mismatch for ${templateId}`);
    assert(character.identity.firstPerson === template.initialState.characterTexts['9'], `firstPerson mismatch for ${templateId}`);
    assertProfileTextSlots(character.identity.profileTextSlots, template.initialState.characterTexts, templateId);

    if (templateId === '0') {
      assert(character.flags.lifecycle.sellable === false, 'player template must not be sellable.');
      assert(character.flags.lifecycle.assistantEligible === false, 'player template must not be assistant eligible.');
      assert(character.flags.lifecycle.recruitmentStatus === 'notRecruitable', 'player template must not be recruitable.');
      assert(!canRetireCharacter(character), 'player template must not be retirable.');
    } else {
      assert(character.flags.lifecycle.sellable === true, `template ${templateId} should start sellable.`);
      assert(character.flags.lifecycle.assistantEligible === true, `template ${templateId} should start assistant eligible.`);
      assert(character.flags.lifecycle.recruitmentStatus === 'recruited', `template ${templateId} should be a recruited instance.`);
      assert(canRetireCharacter(character), `template ${templateId} should be retirable before lifecycle changes.`);
    }

    assert(character.flags.lifecycle.retired === false, `template ${templateId} should start not retired.`);
    assert(character.flags.lifecycle.deleted === false, `template ${templateId} should start not deleted.`);
  }

  const roster = buildRosterView(state, definitions);
  assert(roster.entries.length === 109, 'roster should expose all created character identities.');
  const kanade = roster.entries.find((entry) => entry.templateId === '1');
  assert(kanade?.displayName === definitions.characters['1'].displayName, 'roster displayName should come from identity.');
  assert(kanade.callName === normalizeOptional(definitions.characters['1'].callName), 'roster callName should come from identity.');
  assert(kanade.firstPerson === '私', 'roster firstPerson should expose CSTR:9.');
  assert(kanade.profileTextSlots['42'] === 'おちんちん', 'roster should expose copied CSTR profile slots.');
  assert(kanade.profileTextLabels['9'] === 'CSTR:9', 'roster should keep explicit fallback labels for CSTR slots without definitions.');
  const yukimi = roster.entries.find((entry) => entry.templateId === '6');
  assert(yukimi?.profileTextLabels['0'] === definitions.characterTextDefinitions['0'].label, 'roster should expose CSTR label definitions.');

  let runtime = { catalog: definitions, state, session: initialData.session };
  let actionResult = dispatchGameAction(runtime, { type: 'roster/retireCharacter', characterId: 'character:1' });
  assert(actionResult.status === 'success', 'retiring a sellable non-player character should dispatch successfully.');
  state = actionResult.state;
  runtime = { ...runtime, state, session: actionResult.session };
  assert(state.people.characters['character:1'].flags.lifecycle.retired === true, 'retired flag should persist.');
  assert(!isCharacterActive(state.people.characters['character:1']), 'retired character should not be active.');
  assert(!isCharacterAssistantEligible(state.people.characters['character:1']), 'retired character should not remain assistant eligible.');
  actionResult = dispatchGameAction(runtime, { type: 'roster/retireCharacter', characterId: 'character:1' });
  assert(actionResult.status === 'failure', 'retiring twice should fail through dispatch.');

  actionResult = dispatchGameAction(runtime, { type: 'roster/deleteCharacter', characterId: 'character:2' });
  assert(actionResult.status === 'success', 'deleting a non-player character should dispatch successfully.');
  state = actionResult.state;
  runtime = { ...runtime, state, session: actionResult.session };
  assert(state.people.characters['character:2'].flags.lifecycle.deleted === true, 'deleted flag should persist.');
  assert(state.people.characters['character:2'].flags.lifecycle.retired === true, 'deleted character should also be retired.');
  assert(!isCharacterActive(state.people.characters['character:2']), 'deleted character should not be active.');
  actionResult = dispatchGameAction(runtime, { type: 'roster/deleteCharacter', characterId: 'character:0' });
  assert(actionResult.status === 'failure', 'player character must not be deletable through dispatch.');

  actionResult = dispatchGameAction(runtime, { type: 'roster/setAssistantEligible', characterId: 'character:3', assistantEligible: false });
  assert(actionResult.status === 'success', 'assistant eligibility update should dispatch successfully.');
  state = actionResult.state;
  assert(state.people.characters['character:3'].flags.lifecycle.assistantEligible === false, 'assistant eligibility should be stored.');

  const savePayload = createGameSavePayload(state, new Date('2026-05-01T00:00:00.000Z'));
  assertNoBoundaryErrors('M32 save payload', validateSavePayloadBoundary(savePayload));
  const parseResult = parseGameSavePayload(serializeGameSavePayload(savePayload));
  assert(parseResult.ok, 'M32 save payload should parse after serialization.');
  assert(
    parseResult.payload.state.people.characters['character:1'].identity.profileTextSlots['42'] === 'おちんちん',
    'profileTextSlots should survive save roundtrip.',
  );
  assert(
    parseResult.payload.state.people.characters['character:2'].flags.lifecycle.deleted === true,
    'deleted lifecycle state should survive save roundtrip.',
  );

  const summary = {
    templates: templateIds.length,
    rosterEntries: roster.entries.length,
    cstrSeedCharacters: templateIds.filter((templateId) => Object.keys(definitions.characters[templateId].initialState.characterTexts).length > 0)
      .length,
    retiredCharacter: state.people.characters['character:1'].flags.lifecycle.retired,
    deletedCharacter: state.people.characters['character:2'].flags.lifecycle.deleted,
  };
  console.log(`M32 character identity smoke passed: ${JSON.stringify(summary)}`);
}

main();
