import { getRecruitListingDefinition } from '../src/catalog/lookup';
import type { CatalogId, GameDefinitions } from '../src/catalog/types';
import type { GameAction } from '../src/game/actions';
import { validateActionResultBoundary, validateSavePayloadBoundary, validateStateSessionBoundary } from '../src/game/boundaries';
import { dispatchGameAction } from '../src/game/dispatch';
import type { GameActionContext, GameActionResult } from '../src/game/results';
import { createGameSavePayload } from '../src/game/savePayload';
import { createInitialGameData, type GameSession, type GameState } from '../src/game/state';
import { splitLegacyCharacterFlags } from '../src/features/socialEquipmentCflag';

type SmokeContext = {
  readonly catalog: GameDefinitions;
  readonly state: GameState;
  readonly session: GameSession;
};

const expectedRecruitItemIds = [...Array.from({ length: 47 }, (_, index) => String(index + 100)), '150'];
const interviewFlagIds = [
  '400',
  '401',
  '402',
  '403',
  '404',
  '405',
  '406',
  '407',
  '408',
  '409',
  '410',
  '411',
  '412',
  '413',
  '414',
  '415',
  '416',
  '417',
  '418',
  '419',
  '420',
  '421',
  '430',
  '431',
];

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function assertNoBoundaryErrors(label: string, diagnostics: readonly { readonly severity: string; readonly message: string }[]) {
  const errors = diagnostics.filter((diagnostic) => diagnostic.severity === 'error');
  assert(errors.length === 0, `${label} boundary failed:\n${errors.map((error) => error.message).join('\n')}`);
}

function toActionContext(context: SmokeContext): GameActionContext {
  return {
    catalog: context.catalog,
    state: context.state,
    session: context.session,
  };
}

function nextContext(context: SmokeContext, result: GameActionResult): SmokeContext {
  return {
    catalog: context.catalog,
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

function withMoneyAndRosterLimit(context: SmokeContext, money: number, recruitRosterLimit = 200): SmokeContext {
  return {
    ...context,
    state: {
      ...context.state,
      economy: {
        ...context.state.economy,
        account: {
          currentMoney: money,
        },
      },
      run: {
        ...context.state.run,
        runFlags: {
          ...context.state.run.runFlags,
          recruitRosterLimit,
        },
      },
    },
  };
}

function expectedTemplateForItem(itemId: CatalogId): CatalogId {
  if (itemId === '150') return '51';
  return String(Number(itemId) - 99);
}

function assertRecruitDefinitions(definitions: GameDefinitions) {
  assert(Object.keys(definitions.recruitListings).length === expectedRecruitItemIds.length, 'all recruit listing definitions should be present.');

  for (const itemId of expectedRecruitItemIds) {
    const listing = getRecruitListingDefinition(definitions, `recruit:${itemId}`);
    assert(listing.ok, `missing recruit listing: ${itemId}`);
    assert(listing.definition.characterTemplateId === expectedTemplateForItem(itemId), `wrong character template for recruit listing ${itemId}`);
    assert(listing.definition.basePrice !== undefined, `missing recruit price for listing ${itemId}`);
    assert(definitions.characters[listing.definition.characterTemplateId], `missing character template for listing ${itemId}`);

    if (itemId !== '150') {
      assert(
        listing.definition.label === definitions.characters[listing.definition.characterTemplateId].displayName,
        `listing label should match character template name: ${itemId}`,
      );
    } else {
      assert(listing.definition.repeatable === true, 'recruit ad listing 150 must be repeatable.');
      assert(listing.definition.maxRecruitCount === 5, 'recruit ad listing 150 must allow five hires.');
    }
  }
}

function assertCharacterCreated(context: SmokeContext, characterId: string, templateId: CatalogId) {
  assert(context.state.people.characters[characterId], `people state missing for ${characterId}`);
  assert(context.state.people.characters[characterId].identity.templateId === templateId, `wrong template on ${characterId}`);
  assert(context.state.body.byCharacterId[characterId], `body state missing for ${characterId}`);
  assert(context.state.equipment.byCharacterId[characterId], `equipment state missing for ${characterId}`);
}

function assertTemplateInitialStateApplied(context: SmokeContext, characterId: string, templateId: CatalogId) {
  const template = context.catalog.characters[templateId];
  const character = context.state.people.characters[characterId];
  const body = context.state.body.byCharacterId[characterId];
  const equipment = context.state.equipment.byCharacterId[characterId];
  assert(template, `template missing for ${templateId}`);
  assert(character, `character missing for ${characterId}`);
  assert(body, `body missing for ${characterId}`);
  assert(equipment, `equipment missing for ${characterId}`);

  for (const [textId, text] of Object.entries(template.initialState.characterTexts)) {
    assert(character.identity.profileTextSlots[textId] === text, `CSTR ${textId} should be applied to ${characterId}`);
  }
  for (const [abilityId, value] of Object.entries(template.initialState.abilities)) {
    assert(character.attributes.abilities[abilityId] === value, `ABL ${abilityId} should be applied to ${characterId}`);
  }
  for (const [experienceId, value] of Object.entries(template.initialState.experiences)) {
    assert(character.attributes.experiences[experienceId] === value, `EXP ${experienceId} should be applied to ${characterId}`);
  }
  for (const talentId of template.initialState.talents) {
    assert(character.attributes.traits[talentId] === true, `TALENT ${talentId} should be applied to ${characterId}`);
  }
  for (const [baseId, value] of Object.entries(template.initialState.baseStats)) {
    const peopleValue = character.attributes.baseStats.current[baseId];
    const bodyValue = body.bodyStats[baseId] ?? body.baseStats[baseId];
    assert(peopleValue === value || bodyValue === value, `BASE ${baseId} should be applied to ${characterId}`);
  }

  const splitFlags = splitLegacyCharacterFlags(template);
  for (const [flagId, value] of Object.entries(splitFlags.bodyConditionFlags)) {
    assert(body.conditionFlags[flagId] === value, `body CFLAG ${flagId} should be applied to ${characterId}`);
  }
  for (const [flagId, value] of Object.entries(splitFlags.equipmentAvailabilityFlags)) {
    assert(equipment.availabilityFlags[flagId] === value, `equipment CFLAG ${flagId} should be applied to ${characterId}`);
  }
  for (const [flagId, value] of Object.entries(splitFlags.equipmentClothing)) {
    assert(equipment.clothing[flagId] === value, `clothing CFLAG ${flagId} should be applied to ${characterId}`);
  }
}

function main() {
  const initialData = createInitialGameData();
  let context: SmokeContext = {
    catalog: initialData.definitions,
    state: initialData.save,
    session: initialData.session,
  };

  assertRecruitDefinitions(context.catalog);
  assertNoBoundaryErrors('initial state/session', validateStateSessionBoundary(context.state, context.session));

  let step = dispatchChecked(context, { type: 'game/new', input: { modeId: 'normal' } });
  assert(step.result.status === 'success', 'normal new game should succeed.');
  context = withMoneyAndRosterLimit(step.context, 10_000_000);

  step = dispatchChecked(context, { type: 'main/openRecruit' });
  assert(step.result.status === 'success', 'recruit entry should succeed.');
  context = step.context;
  assert(context.session.ui.route === 'recruit', 'recruit route should be active.');
  assert(context.session.recruit.visibleListingIds.length === expectedRecruitItemIds.length, 'all recruit listings should be visible before hires.');
  for (const itemId of expectedRecruitItemIds) {
    assert(context.session.recruit.visibleListingIds.includes(`recruit:${itemId}`), `visible recruit listing missing: ${itemId}`);
  }

  const normalListing = 'recruit:100';
  const normalCandidate = getRecruitListingDefinition(context.catalog, normalListing);
  assert(normalCandidate.ok, 'normal recruit listing should exist.');
  const moneyBeforeNormalRecruit = context.state.economy.account.currentMoney;
  step = dispatchChecked(context, { type: 'recruit/selectListing', listingId: normalListing });
  assert(step.result.status === 'success', 'normal recruit selection should succeed.');
  context = step.context;
  step = dispatchChecked(context, { type: 'recruit/confirm' });
  assert(step.result.status === 'success', 'normal recruit confirm should succeed.');
  context = step.context;
  assertCharacterCreated(context, 'character:1', '1');
  assertTemplateInitialStateApplied(context, 'character:1', '1');
  assert(
    context.state.economy.account.currentMoney === moneyBeforeNormalRecruit - normalCandidate.definition.basePrice!,
    'normal recruit should subtract listing price.',
  );
  assert(!context.session.recruit.visibleListingIds.includes(normalListing), 'purchased unique recruit listing should be hidden.');

  const beforeDuplicate = context.state;
  step = dispatchChecked(context, { type: 'recruit/selectListing', listingId: normalListing });
  assert(step.result.status === 'failure', 'duplicate recruit selection should fail.');
  assert(step.result.failure?.code === 'recruit-duplicate-character', 'duplicate recruit should use recruit-duplicate-character.');
  assert(step.result.state === beforeDuplicate, 'duplicate failure should preserve save state reference.');
  context = step.context;

  context = withMoneyAndRosterLimit(context, 10_000_000, Object.keys(context.state.people.characters).length);
  step = dispatchChecked(context, { type: 'recruit/selectListing', listingId: 'recruit:101' });
  assert(step.result.status === 'failure', 'roster limit should block recruit selection.');
  assert(step.result.failure?.code === 'recruit-roster-limit', 'roster limit should use recruit-roster-limit.');
  context = withMoneyAndRosterLimit(step.context, 0, 200);

  step = dispatchChecked(context, { type: 'recruit/selectListing', listingId: 'recruit:101' });
  assert(step.result.status === 'success', 'candidate selection should succeed before money check.');
  context = step.context;
  const beforeMoneyFailure = context.state;
  step = dispatchChecked(context, { type: 'recruit/confirm' });
  assert(step.result.status === 'failure', 'money failure should happen on confirm.');
  assert(step.result.failure?.code === 'not-enough-money', 'money failure should use not-enough-money.');
  assert(step.result.state === beforeMoneyFailure, 'money failure should preserve save state reference.');
  context = withMoneyAndRosterLimit(step.context, 10_000_000, 200);

  for (let index = 1; index <= 5; index += 1) {
    step = dispatchChecked(context, { type: 'recruit/selectListing', listingId: 'recruit:150' });
    assert(step.result.status === 'success', `recruit ad selection ${index} should succeed.`);
    context = step.context;
    assert(context.session.recruit.interviewDraft?.instanceIndex === index, `interview draft index mismatch: ${index}`);
    for (const flagId of interviewFlagIds) {
      assert(
        typeof context.session.recruit.commandFlags[flagId] === 'number',
        `interview command flag should be present in session: ${flagId}`,
      );
    }
    assert(context.session.recruit.scratchTexts['50'], 'interview scratch text TSTR:50 should be present.');
    assert(context.session.recruit.scratchTexts['51'], 'interview scratch text TSTR:51 should be present.');

    step = dispatchChecked(context, { type: 'recruit/confirm' });
    assert(step.result.status === 'success', `recruit ad confirm ${index} should succeed.`);
    context = step.context;
    assertCharacterCreated(context, `character:51:${index}`, '51');
    assertTemplateInitialStateApplied(context, `character:51:${index}`, '51');
    assert(
      !Object.keys(context.state.people.characters[`character:51:${index}`].flags.legacyFlagsNeedingMapping).some((key) =>
        key.startsWith('TFLAG:'),
      ),
      'interview TFLAG buffers must not be persisted into character save state.',
    );
    assert(context.session.recruit.interviewDraft === undefined, 'recruit success should clear interview draft.');
  }

  assert(!context.session.recruit.visibleListingIds.includes('recruit:150'), 'recruit ad listing should hide after five hires.');
  step = dispatchChecked(context, { type: 'recruit/selectListing', listingId: 'recruit:150' });
  assert(step.result.status === 'failure', 'sixth recruit ad selection should fail.');
  assert(step.result.failure?.code === 'recruit-repeat-limit', 'sixth recruit ad should use repeat-limit failure.');
  context = step.context;

  step = dispatchChecked(context, { type: 'recruit/cancel' });
  assert(step.result.status === 'success', 'recruit cancel should succeed.');
  context = step.context;
  assert(context.session.ui.route === 'mainMenu', 'recruit cancel should return to main menu.');
  assert(context.session.recruit.visibleListingIds.length === 0, 'recruit cancel should clear visible listings.');
  assert(Object.keys(context.session.recruit.commandFlags).length === 0, 'recruit cancel should clear command flags.');

  step = dispatchChecked(context, { type: 'main/openRoster' });
  assert(step.result.status === 'success', 'roster route should open after recruit.');
  context = step.context;
  assert(context.session.ui.route === 'roster', 'roster route should be active.');

  const savePayload = createGameSavePayload(context.state, new Date('2026-05-01T00:00:00.000Z'));
  assertNoBoundaryErrors('save payload', validateSavePayloadBoundary(savePayload));

  const summary = {
    route: context.session.ui.route,
    currentMoney: context.state.economy.account.currentMoney,
    characters: Object.keys(context.state.people.characters).length,
    recruitListings: Object.keys(context.catalog.recruitListings).length,
    visibleAfterRepeatLimit: context.session.recruit.visibleListingIds.length,
  };
  console.log(`M31 recruit-all smoke passed: ${JSON.stringify(summary)}`);
}

main();
