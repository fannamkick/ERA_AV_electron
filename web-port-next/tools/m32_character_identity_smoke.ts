import {
  createCharacterBundle,
  createCharacterBundleFromSpecs,
  characterIdForTemplate,
  type CharacterCreationBundle,
} from '../src/features/characterCreation';
import {
  canRetireCharacter,
  computeSellAssistantEligibilityRank,
  isCharacterActive,
  isCharacterAssistantEligible,
  listSaleEligibleCharacterIds,
  refreshCharacterSaleEligibility,
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
  for (const slotId of ['0', '1', '2', '3', '90']) {
    assert(definitions.characterTextDefinitions[slotId]?.label, `CSTR label definition missing for ${slotId}`);
  }

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
      assert(character.flags.lifecycle.saleEligibilityRank === 0, 'player template must have sale eligibility rank 0.');
      assert(character.flags.lifecycle.recruitmentStatus === 'notRecruitable', 'player template must not be recruitable.');
      assert(!canRetireCharacter(character), 'player template must not be retirable.');
    } else {
      const expectedRank = Math.max(
        Number(template.initialState.characterFlags['1'] ?? 0),
        computeSellAssistantEligibilityRank(character),
      );
      const expectedSellable = expectedRank >= 1 && !character.attributes.traits['199'];
      assert(character.flags.lifecycle.saleEligibilityRank === expectedRank, `template ${templateId} sale rank mismatch.`);
      assert(character.flags.lifecycle.sellable === expectedSellable, `template ${templateId} sellable should follow CFLAG:1 and TALENT:199.`);
      assert(
        character.flags.lifecycle.assistantEligible === (expectedRank >= 2),
        `template ${templateId} assistant eligibility should follow CFLAG:1.`,
      );
      assert(character.flags.lifecycle.recruitmentStatus === 'recruited', `template ${templateId} should be a recruited instance.`);
      assert(canRetireCharacter(character) === expectedSellable, `template ${templateId} retirable should follow sale listing eligibility.`);
    }

    assert(character.flags.lifecycle.retired === false, `template ${templateId} should start not retired.`);
    assert(character.flags.lifecycle.deleted === false, `template ${templateId} should start not deleted.`);
  }

  const roster = buildRosterView(state, definitions);
  assert(roster.entries.length === 109, 'roster should expose all created character identities.');
  const android = roster.entries.find((entry) => entry.templateId === '92');
  assert(android?.displayName === '', 'Chara92 static displayName must preserve the original blank NAME field.');
  assert(android.callName === undefined, 'Chara92 static callName must preserve the original blank CALLNAME field.');
  assert(android.nickname === undefined, 'Chara92 static nickname must preserve the original blank NICKNAME field.');

  const androidOverride = createCharacterBundleFromSpecs(definitions, [
    {
      templateId: '92',
      characterId: 'character:android-runtime',
      identityOverrides: {
        displayName: 'MII',
        callName: 'MII',
        nickname: 'MII',
      },
    },
  ]);
  assert(androidOverride.ok, 'Chara92 dynamic identity override should be creatable for ADD_IKUMI_ANDROID ownership.');
  assert(
    androidOverride.bundle.characters['character:android-runtime'].identity.displayName === 'MII',
    'Chara92 dynamic displayName override should be persisted into identity.',
  );

  const kanade = roster.entries.find((entry) => entry.templateId === '1');
  assert(kanade?.displayName === definitions.characters['1'].displayName, 'roster displayName should come from identity.');
  assert(kanade.callName === normalizeOptional(definitions.characters['1'].callName), 'roster callName should come from identity.');
  assert(kanade.firstPerson === definitions.characters['1'].initialState.characterTexts['9'], 'roster firstPerson should expose CSTR:9.');
  assert(
    kanade.profileTextSlots['42'] === definitions.characters['1'].initialState.characterTexts['42'],
    'roster should expose copied CSTR profile slots.',
  );
  assert(kanade.profileTextLabels['9'] === 'CSTR:9', 'roster should keep explicit fallback labels for CSTR slots without definitions.');
  const yukimi = roster.entries.find((entry) => entry.templateId === '6');
  assert(yukimi?.profileTextLabels['0'] === definitions.characterTextDefinitions['0'].label, 'roster should expose CSTR label definitions.');

  const initialSaleEligibleCharacterIds = listSaleEligibleCharacterIds(state, 0);
  assert(
    JSON.stringify(initialSaleEligibleCharacterIds) === JSON.stringify(['character:10']),
    `initial sale listing should follow original CFLAG:1 values only: ${JSON.stringify(initialSaleEligibleCharacterIds)}`,
  );
  const busyState: GameState = {
    ...state,
    people: {
      characters: {
        ...state.people.characters,
        'character:10': {
          ...state.people.characters['character:10'],
          flags: {
            ...state.people.characters['character:10'].flags,
            featureProgress: {
              ...state.people.characters['character:10'].flags.featureProgress,
              'work.flag_12': 1,
            },
          },
        },
      },
    },
  };
  assert(!listSaleEligibleCharacterIds(busyState, 1).includes('character:10'), 'TIME==1 business flag should exclude sale listing.');

  const trainedForSale = refreshCharacterSaleEligibility({
    ...state.people.characters['character:1'],
    attributes: {
      ...state.people.characters['character:1'].attributes,
      abilities: {
        ...state.people.characters['character:1'].attributes.abilities,
        '0': 3,
        '10': 5,
        '11': 4,
        '12': 3,
      },
      traits: {
        ...state.people.characters['character:1'].attributes.traits,
        '400': true,
      },
      experiences: {
        ...state.people.characters['character:1'].attributes.experiences,
        '76': 3,
      },
    },
  });
  assert(trainedForSale.flags.lifecycle.saleEligibilityRank === 2, 'CHECK_SELLASSIABLE assistant threshold should raise CFLAG:1 equivalent to 2.');

  let runtime = { catalog: definitions, state, session: initialData.session };
  let actionResult = dispatchGameAction(runtime, { type: 'roster/retireCharacter', characterId: 'character:1' });
  assert(actionResult.status === 'failure', 'retiring a CFLAG:1 < 1 character should fail.');

  actionResult = dispatchGameAction(runtime, { type: 'roster/retireCharacter', characterId: 'character:10' });
  assert(actionResult.status === 'success', 'retiring a sellable non-player character should dispatch successfully.');
  state = actionResult.state;
  runtime = { ...runtime, state, session: actionResult.session };
  assert(state.people.characters['character:10'].flags.lifecycle.retired === true, 'retired flag should persist.');
  assert(!isCharacterActive(state.people.characters['character:10']), 'retired character should not be active.');
  assert(!isCharacterAssistantEligible(state.people.characters['character:10']), 'retired character should not remain assistant eligible.');
  actionResult = dispatchGameAction(runtime, { type: 'roster/retireCharacter', characterId: 'character:10' });
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

  actionResult = dispatchGameAction(runtime, { type: 'roster/setAssistantEligible', characterId: 'character:3', assistantEligible: true });
  assert(actionResult.status === 'failure', 'assistant eligibility cannot be enabled when CFLAG:1 < 2.');

  actionResult = dispatchGameAction(runtime, { type: 'roster/setAssistantEligible', characterId: 'character:19', assistantEligible: false });
  assert(actionResult.status === 'success', 'assistant eligibility update should dispatch successfully.');
  state = actionResult.state;
  runtime = { ...runtime, state, session: actionResult.session };
  assert(state.people.characters['character:19'].flags.lifecycle.assistantEligible === false, 'assistant eligibility should be stored.');

  state = {
    ...state,
    people: {
      characters: {
        ...state.people.characters,
        'character:1': trainedForSale,
      },
    },
  };
  runtime = { ...runtime, state };
  actionResult = dispatchGameAction(runtime, { type: 'roster/sellCharacter', characterId: 'character:1', timeSlot: 0 });
  assert(actionResult.status === 'success', 'selling a CFLAG:1 >= 1 character should dispatch through lifecycle deletion.');
  state = actionResult.state;
  runtime = { ...runtime, state, session: actionResult.session };
  assert(state.people.characters['character:1'].flags.lifecycle.deleted === true, 'sold character should be deleted through lifecycle.');
  assert(!listSaleEligibleCharacterIds(state, 0).includes('character:1'), 'sold character should leave sale listings.');

  const savePayload = createGameSavePayload(state, new Date('2026-05-01T00:00:00.000Z'));
  assertNoBoundaryErrors('M32 save payload', validateSavePayloadBoundary(savePayload));
  const parseResult = parseGameSavePayload(serializeGameSavePayload(savePayload));
  assert(parseResult.ok, 'M32 save payload should parse after serialization.');
  assert(
    parseResult.payload.state.people.characters['character:1'].identity.profileTextSlots['42'] ===
      definitions.characters['1'].initialState.characterTexts['42'],
    'profileTextSlots should survive save roundtrip.',
  );
  assert(
    parseResult.payload.state.people.characters['character:2'].flags.lifecycle.deleted === true,
    'deleted lifecycle state should survive save roundtrip.',
  );
  assert(
    parseResult.payload.state.people.characters['character:1'].flags.lifecycle.deleted === true,
    'sold lifecycle state should survive save roundtrip.',
  );

  const summary = {
    templates: templateIds.length,
    rosterEntries: roster.entries.length,
    cstrSeedCharacters: templateIds.filter((templateId) => Object.keys(definitions.characters[templateId].initialState.characterTexts).length > 0)
      .length,
    saleEligibleCharacters: listSaleEligibleCharacterIds(makeStateWithAllCharacters(initialData.save, bundleResult.bundle), 0).length,
    retiredCharacter: state.people.characters['character:10'].flags.lifecycle.retired,
    deletedCharacter: state.people.characters['character:2'].flags.lifecycle.deleted,
    soldCharacter: state.people.characters['character:1'].flags.lifecycle.deleted,
  };
  console.log(`M32 character identity smoke passed: ${JSON.stringify(summary)}`);
}

main();
