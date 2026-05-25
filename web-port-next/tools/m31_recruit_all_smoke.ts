import { getRecruitListingDefinition } from '../src/catalog/lookup';
import { recruitBuyEventDefinitions, recruitBuyEventLineCount } from '../src/catalog/recruitBuyEvents';
import { recruitManualEntries, recruitManualsByListingId } from '../src/catalog/recruitManuals';
import type { CatalogId, GameDefinitions } from '../src/catalog/types';
import type { GameAction } from '../src/game/actions';
import { validateActionResultBoundary, validateSavePayloadBoundary, validateStateSessionBoundary } from '../src/game/boundaries';
import { dispatchGameAction } from '../src/game/dispatch';
import type { GameActionContext, GameActionResult } from '../src/game/results';
import { createGameSavePayload } from '../src/game/savePayload';
import { createInitialGameData, type GameSession, type GameState } from '../src/game/state';
import {
  buildRecruitView,
  recruitInterviewFamilyNameJapan,
  recruitInterviewFemaleGivenNameJapan,
  recruitInterviewOriginalHistoryLabels,
} from '../src/features/recruit';
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
          '23': recruitRosterLimit,
        },
      },
    },
  };
}

function withInterviewFlags(context: SmokeContext, flags: Record<string, number>): SmokeContext {
  const draft = context.session.recruit.interviewDraft;
  assert(draft, 'interview draft should be present before overriding source TFLAG values.');
  const commandFlags = {
    ...draft.commandFlags,
    ...flags,
  };
  return {
    ...context,
    session: {
      ...context.session,
      recruit: {
        ...context.session.recruit,
        commandFlags: {
          ...context.session.recruit.commandFlags,
          ...commandFlags,
        },
        interviewDraft: {
          ...draft,
          commandFlags,
        },
      },
    },
  };
}

function expectedTemplateForItem(itemId: CatalogId): CatalogId {
  if (itemId === '150') return '51';
  return String(Number(itemId) - 99);
}

function assertNameErbTables() {
  assert(recruitInterviewFamilyNameJapan.length === 100, 'FAMILY_NAME_JAPAN should keep all 100 original entries.');
  assert(recruitInterviewFemaleGivenNameJapan.length === 110, 'LAST_NAME_JAPAN_FEMALE should keep all 110 original entries.');
  assert(recruitInterviewFamilyNameJapan[0] === '사토', 'FAMILY_NAME_JAPAN index 0 mismatch.');
  assert(recruitInterviewFamilyNameJapan[4] === '와타나베', 'FAMILY_NAME_JAPAN index 4 mismatch.');
  assert(recruitInterviewFamilyNameJapan[69] === '오노', 'FAMILY_NAME_JAPAN duplicate index 69 mismatch.');
  assert(recruitInterviewFamilyNameJapan[94] === '와타나베', 'FAMILY_NAME_JAPAN duplicate index 94 mismatch.');
  assert(recruitInterviewFamilyNameJapan[99] === '하마다', 'FAMILY_NAME_JAPAN index 99 mismatch.');
  assert(recruitInterviewFemaleGivenNameJapan[0] === '아이', 'LAST_NAME_JAPAN_FEMALE index 0 mismatch.');
  assert(recruitInterviewFemaleGivenNameJapan[74] === '마이', 'LAST_NAME_JAPAN_FEMALE index 74 mismatch.');
  assert(recruitInterviewFemaleGivenNameJapan[109] === '와카바', 'LAST_NAME_JAPAN_FEMALE index 109 mismatch.');
  assert(
    recruitInterviewFamilyNameJapan.filter((name) => name === '오노').length === 2,
    'FAMILY_NAME_JAPAN should preserve both original 오노 entries.',
  );
  assert(
    recruitInterviewFamilyNameJapan.filter((name) => name === '와타나베').length === 2,
    'FAMILY_NAME_JAPAN should preserve both original 와타나베 entries.',
  );
}

function assertInterviewHistoryLabelTable() {
  const labels = new Set(recruitInterviewOriginalHistoryLabels);
  assert(recruitInterviewOriginalHistoryLabels.length === 73, 'INTERVIEW_ADD CSTR:0/1/2/3 label table should keep all 73 original source labels.');
  assert(labels.size === 73, 'INTERVIEW_ADD CSTR:0/1/2/3 label table should preserve unique original source labels.');
  for (const label of ['남편의 자지', '여자친구의 가슴', '필기도구', '의료기구', '강호사', '망상속 여친(사실 미경험)', '애널바이브']) {
    assert(labels.has(label), `INTERVIEW_ADD original history label missing: ${label}`);
  }
}

function assertRecruitManualTables() {
  assert(recruitManualEntries.length === 48, 'CHARA_MANUAL should preserve all 48 candidate blocks.');
  assert(recruitManualEntries.reduce((total, entry) => total + entry.lines.length, 0) === 736, 'CHARA_MANUAL should preserve all parsed PRINT lines.');
  assert(recruitManualEntries.reduce((total, entry) => total + entry.hints.length, 0) === 11, 'CHARA_MANUAL should preserve all HINT_CHARA calls.');
  assert(recruitManualsByListingId['recruit:100']?.lines[0] === '여배우 후보 번호 01', 'CHARA_MANUAL candidate number header should be preserved.');
  assert(recruitManualsByListingId['recruit:100']?.lines.includes('【미야마 카나데】'), 'CHARA_MANUAL candidate 1 title should be preserved.');
  assert(recruitManualsByListingId['recruit:108']?.hints.includes('신비한 힘'), 'CHARA_MANUAL HINT_CHARA text should be preserved.');
  assert(recruitManualsByListingId['recruit:146']?.lines.includes('【미즈모리 유키나】'), 'CHARA_MANUAL candidate 47 title should be preserved.');
  assert(recruitManualsByListingId['recruit:150']?.lines.includes('【구인광고】'), 'CHARA_MANUAL recruit ad title should be preserved.');
  assert(recruitManualsByListingId['recruit:150']?.resultItemId === '150', 'CHARA_MANUAL recruit ad RESULT:1 should be preserved.');
}

function assertRecruitBuyEventTables() {
  assert(recruitBuyEventDefinitions.length === 5, 'CHARA_BUY_EVENT should preserve all five printed event branches.');
  assert(recruitBuyEventLineCount === 89, 'CHARA_BUY_EVENT should preserve every PRINT line from the printed branches.');
  assert(
    recruitBuyEventDefinitions.some((event) => event.targetTemplateId === '1' && event.condition === 'kanade-opening'),
    'CHARA_BUY_EVENT should preserve Kanade opening-time branch.',
  );
  assert(
    recruitBuyEventDefinitions.some((event) => event.targetTemplateId === '1' && event.condition === 'kanade-default'),
    'CHARA_BUY_EVENT should preserve Kanade fallback branch.',
  );
  for (const templateId of ['3', '29', '40']) {
    assert(
      recruitBuyEventDefinitions.some((event) => event.targetTemplateId === templateId),
      `CHARA_BUY_EVENT printed branch missing for template ${templateId}.`,
    );
  }
}

function assertRecruitDefinitions(definitions: GameDefinitions) {
  assert(Object.keys(definitions.recruitListings).length === expectedRecruitItemIds.length, 'all recruit listing definitions should be present.');

  for (const itemId of expectedRecruitItemIds) {
    const listing = getRecruitListingDefinition(definitions, `recruit:${itemId}`);
    assert(listing.ok, `missing recruit listing: ${itemId}`);
    assert(listing.definition.characterTemplateId === expectedTemplateForItem(itemId), `wrong character template for recruit listing ${itemId}`);
    assert(listing.definition.basePrice !== undefined, `missing recruit price for listing ${itemId}`);
    assert(definitions.characters[listing.definition.characterTemplateId], `missing character template for listing ${itemId}`);
    assert(recruitManualsByListingId[`recruit:${itemId}`], `missing CHARA_MANUAL entry for recruit listing ${itemId}`);

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

function characterBaseValue(context: SmokeContext, characterId: string, baseId: string): number | undefined {
  const character = context.state.people.characters[characterId];
  const body = context.state.body.byCharacterId[characterId];
  return character?.attributes.baseStats.current[baseId] ?? body?.bodyStats[baseId] ?? body?.baseStats[baseId];
}

function assertRecruitSuccessPersistentState(context: SmokeContext, characterId: string, templateId: CatalogId, listingFlagKey: string) {
  const globalCounterId = String(Number(templateId) + 200);
  const legacyListingFlagId = String(Number(templateId) + 999);
  assert(context.state.run.runFlags[listingFlagKey] === -1, `${listingFlagKey} should be set to -1 after recruit success.`);
  assert(context.state.run.runFlags[legacyListingFlagId] === -1, `FLAG:${legacyListingFlagId} should be mirrored after recruit success.`);
  assert(context.state.meta.globalCounters[globalCounterId] === 1, `GLOBAL:${globalCounterId} should increment after recruit success.`);
  assert(
    context.state.meta.legacyGlobalsNeedingMapping[`GLOBAL:${globalCounterId}`] === 1,
    `GLOBAL:${globalCounterId} should be mirrored for legacy mapping.`,
  );
}

function assertInterviewAddApplied(context: SmokeContext, characterId: string, expectedDisplayName: string) {
  const character = context.state.people.characters[characterId];
  const body = context.state.body.byCharacterId[characterId];
  const equipment = context.state.equipment.byCharacterId[characterId];
  assert(character, `interview character missing: ${characterId}`);
  assert(body, `interview body missing: ${characterId}`);
  assert(equipment, `interview equipment missing: ${characterId}`);

  assert(character.identity.displayName === expectedDisplayName, 'INTERVIEW_ADD name should be persisted.');
  assert(character.identity.callName && character.identity.callName !== expectedDisplayName, 'INTERVIEW_ADD call name should use generated given name.');
  assert(recruitInterviewFamilyNameJapan.includes(character.identity.displayName.split(' ')[0]), 'INTERVIEW_ADD family name should come from NAME.ERB table.');
  assert(recruitInterviewFemaleGivenNameJapan.includes(character.identity.callName), 'INTERVIEW_ADD given name should come from NAME.ERB table.');
  assert(typeof characterBaseValue(context, characterId, '9') === 'number', 'INTERVIEW_ADD BASE:9 age should be persisted.');
  assert(typeof characterBaseValue(context, characterId, '20') === 'number', 'INTERVIEW_ADD BASE:20 height should be persisted.');
  assert(typeof characterBaseValue(context, characterId, '30') === 'number', 'INTERVIEW_ADD BASE:30 requested fee should be persisted.');
  assert(typeof characterBaseValue(context, characterId, '0') === 'number', 'INTERVIEW_ADD BASE:0 stamina should be persisted.');
  assert(typeof characterBaseValue(context, characterId, '1') === 'number', 'INTERVIEW_ADD BASE:1 energy should be persisted.');
  assert(Object.keys(character.attributes.traits).length > 0, 'INTERVIEW_ADD TALENT results should be present.');
  assert('0' in character.attributes.experiences || character.attributes.traits['0'] === true, 'INTERVIEW_ADD sex experience or virgin trait should be present.');
  assert(Object.keys(body.conditionFlags).some((flagId) => ['6', '15', '16', '620', '621', '622'].includes(flagId)), 'INTERVIEW_ADD CFLAG body/social fields should be present.');
  assert(Object.keys(equipment.availabilityFlags).some((flagId) => ['41', '42', '600', '601', '602', '603'].includes(flagId)), 'INTERVIEW_ADD CFLAG equipment fields should be present.');
  for (const [textId, text] of Object.entries(character.identity.profileTextSlots)) {
    if (['0', '1', '2', '3'].includes(textId)) {
      assert(recruitInterviewOriginalHistoryLabels.includes(text as (typeof recruitInterviewOriginalHistoryLabels)[number]), `INTERVIEW_ADD CSTR:${textId} should use an original source label.`);
    }
  }
  assert(character.identity.profileTextSlots['80'], 'DEFOLT_GENITALCALL CSTR:80 should be persisted.');
}

function assertOriginalHistoryScenario(context: SmokeContext, characterId: string, scenario: 'taboo-anal' | 'inexperienced') {
  const character = context.state.people.characters[characterId];
  const body = context.state.body.byCharacterId[characterId];
  assert(character, `history scenario character missing: ${characterId}`);
  assert(body, `history scenario body missing: ${characterId}`);
  if (scenario === 'taboo-anal') {
    assert(character.identity.profileTextSlots['1'], 'taboo interview first kiss should write CSTR:1.');
    assert(character.identity.profileTextSlots['0'], 'taboo interview sex should write CSTR:0.');
    assert(character.identity.profileTextSlots['3'], 'taboo interview anal should write CSTR:3.');
    assert(character.identity.profileTextSlots['2'] === undefined, 'taboo interview anal should not incorrectly mirror to CSTR:2.');
    assert(body.conditionFlags['15'] === 1, 'sex history should set CFLAG:15.');
    assert(body.conditionFlags['16'] === 1 || body.conditionFlags['16'] === -1, 'first kiss history should set CFLAG:16.');
  } else {
    assert(body.conditionFlags['16'] === -1, 'no first kiss should set CFLAG:16 to -1.');
    assert(character.attributes.traits['0'] === true, 'no sex history should set TALENT:0.');
    assert(character.attributes.traits['2'] === true, 'no anal history should set TALENT:2.');
  }
}

function assertInterviewDisplay(context: SmokeContext, expectedPrice: number) {
  const view = buildRecruitView(context.catalog, context.state, context.session);
  assert(view.interview, 'recruit interview display should be present for the recruit ad candidate.');
  assert(view.interview.promptLines.includes('이번 면접 상대는……'), 'INTERVIEW prompt line should be displayed.');
  assert(view.interview.promptLines.includes('[0] - 여자'), 'INTERVIEW gender selection line should be displayed.');
  assert(view.interview.descriptionLines.some((line) => line.startsWith('약속했던 카페에 ')), 'INTERVIEW appearance line should be displayed.');
  assert(view.interview.descriptionLines.some((line) => line.includes('머리를') && line.endsWith('하고 있다.')), 'INTERVIEW hair line should be displayed.');
  assert(view.interview.descriptionLines.some((line) => line.startsWith('직업은 ')), 'INTERVIEW occupation/relationship line should be displayed.');
  assert(
    view.interview.descriptionLines.includes(`AV데뷔를 한다면 출연료로 ${context.session.recruit.commandFlags['420']}를 요구했다.`),
    'INTERVIEW fee demand line should use TFLAG:420.',
  );
  assert(view.interview.contractPrompt === `${expectedPrice}P로 계약합니까?`, 'SHOP_SLAVE2 contract prompt should be displayed.');
  assert(view.interview.confirmLabel === '[0] - 네', 'SHOP_SLAVE2 confirm option should match original.');
  assert(view.interview.rejectLabel === '[1] - 아니오', 'SHOP_SLAVE2 reject option should match original.');
  assert(view.interview.rerollLabel === '[8] - 다음 사람', 'SHOP_SLAVE2 reroll option should match original.');
}

function effectMessages(result: GameActionResult): readonly string[] {
  return result.effects
    .filter((effect) => effect.type === 'ui/log')
    .map((effect) => (effect.type === 'ui/log' ? effect.message : ''));
}

function assertRecruitBuyEvent(result: GameActionResult, expectedFragments: readonly string[]) {
  const joinedEffects = effectMessages(result).join('\n');
  for (const fragment of expectedFragments) {
    assert(joinedEffects.includes(fragment), `CHARA_BUY_EVENT output missing: ${fragment}`);
  }
}

function main() {
  const initialData = createInitialGameData();
  let context: SmokeContext = {
    catalog: initialData.definitions,
    state: initialData.save,
    session: initialData.session,
  };

  assertNameErbTables();
  assertInterviewHistoryLabelTable();
  assertRecruitManualTables();
  assertRecruitBuyEventTables();
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
  let pageView = buildRecruitView(context.catalog, context.state, context.session);
  assert(pageView.pageIndex === 0, 'CHARA_BUY_NEW should start with TFLAG:100 page 0.');
  assert(pageView.maxPageIndex === 3, 'CHARA_BUY_NEW should clamp to max page 3.');
  assert(pageView.pageSize === 60, 'CHARA_BUY_NEW should use 60 candidates per page.');
  assert(pageView.totalVisibleListingCount === expectedRecruitItemIds.length, 'recruit page view should retain the full compressed TFLAG:2xx list count.');
  assert(pageView.visibleListings.length === expectedRecruitItemIds.length, 'page 0 should show all current 48 recruit candidates.');
  assert(pageView.previousPageLabel === '[1] 이전 페이지', 'CHARA_BUY_SHOW_NEW should expose previous page input label.');
  assert(pageView.nextPageLabel === '[9] 다음 페이지', 'CHARA_BUY_SHOW_NEW should expose next page input label.');
  assert(pageView.returnLabel === '[999] - 돌아간다', 'CHARA_BUY_SHOW_NEW should expose return input label.');

  step = dispatchChecked(context, { type: 'recruit/previousPage' });
  assert(step.result.status === 'success', 'previous page input should be accepted at page 0.');
  context = step.context;
  assert(context.session.recruit.pageIndex === 0, 'previous page should clamp at TFLAG:100 page 0.');
  assert(context.session.recruit.commandFlags['100'] === 0, 'previous page clamp should mirror TFLAG:100 in command flags.');

  step = dispatchChecked(context, { type: 'recruit/nextPage' });
  assert(step.result.status === 'success', 'next page input should be accepted.');
  context = step.context;
  pageView = buildRecruitView(context.catalog, context.state, context.session);
  assert(context.session.recruit.pageIndex === 1, 'next page should increment TFLAG:100 to page 1.');
  assert(context.session.recruit.commandFlags['100'] === 1, 'next page should mirror TFLAG:100 in command flags.');
  assert(context.session.recruit.visibleListingIds.length === expectedRecruitItemIds.length, 'page turn should preserve the full compressed recruit list.');
  assert(pageView.visibleListings.length === 0, 'page 1 should be empty with only 48 current candidates.');
  const pageOneState = context.state;
  step = dispatchChecked(context, { type: 'recruit/selectListing', listingId: 'recruit:100' });
  assert(step.result.status === 'failure', 'page 1 should reject selecting a page 0 recruit candidate.');
  assert(step.result.failure?.code === 'recruit-listing-not-in-session', 'off-page recruit selection should use session visibility failure.');
  assert(step.result.state === pageOneState, 'off-page selection failure should preserve save state reference.');
  context = step.context;

  for (let index = 0; index < 3; index += 1) {
    step = dispatchChecked(context, { type: 'recruit/nextPage' });
    assert(step.result.status === 'success', `next page clamp input ${index + 1} should succeed.`);
    context = step.context;
  }
  assert(context.session.recruit.pageIndex === 3, 'next page should clamp at TFLAG:100 page 3.');
  assert(context.session.recruit.commandFlags['100'] === 3, 'max page clamp should mirror TFLAG:100 in command flags.');
  for (let index = 0; index < 3; index += 1) {
    step = dispatchChecked(context, { type: 'recruit/previousPage' });
    assert(step.result.status === 'success', `previous page input ${index + 1} should succeed.`);
    context = step.context;
  }
  assert(context.session.recruit.pageIndex === 0, 'previous page should return TFLAG:100 to page 0.');
  pageView = buildRecruitView(context.catalog, context.state, context.session);
  assert(pageView.visibleListings.length === expectedRecruitItemIds.length, 'page 0 should show recruit candidates again after returning from page 3.');

  const beforeInvalidInterviewGender = context.state;
  step = dispatchChecked(context, { type: 'recruit/selectListing', listingId: 'recruit:150', interviewGender: 3 });
  assert(step.result.status === 'failure', 'INTERVIEW should reject gender input outside RESULT 0/1/2.');
  assert(step.result.failure?.code === 'recruit-interview-gender-invalid', 'invalid INTERVIEW gender should use a source-specific failure.');
  assert(step.result.state === beforeInvalidInterviewGender, 'invalid INTERVIEW gender should preserve save state reference.');
  context = step.context;

  step = dispatchChecked(context, { type: 'recruit/selectListing', listingId: 'recruit:150', interviewGender: 2 });
  assert(step.result.status === 'success', 'hidden INTERVIEW RESULT:2 recruit ad selection should succeed.');
  context = step.context;
  assert(context.session.recruit.interviewDraft?.commandFlags['400'] === 2, 'INTERVIEW hidden RESULT:2 should persist TFLAG:400.');
  assert(context.session.recruit.commandFlags['400'] === 2, 'INTERVIEW hidden RESULT:2 should mirror TFLAG:400 in session flags.');
  step = dispatchChecked(context, { type: 'recruit/rerollInterview' });
  assert(step.result.status === 'success', 'INTERVIEW reroll should preserve hidden gender selection.');
  context = step.context;
  assert(context.session.recruit.interviewDraft?.commandFlags['400'] === 2, 'INTERVIEW reroll should keep TFLAG:400.');

  const normalListing = 'recruit:100';
  const normalCandidate = getRecruitListingDefinition(context.catalog, normalListing);
  assert(normalCandidate.ok, 'normal recruit listing should exist.');
  const moneyBeforeNormalRecruit = context.state.economy.account.currentMoney;
  step = dispatchChecked(context, { type: 'recruit/selectListing', listingId: normalListing });
  assert(step.result.status === 'success', 'normal recruit selection should succeed.');
  context = step.context;
  let recruitView = buildRecruitView(context.catalog, context.state, context.session);
  assert(recruitView.selectedManual?.lines.includes('【미야마 카나데】'), 'normal recruit detail should show CHARA_MANUAL title.');
  assert(recruitView.selectedManual?.lines.some((line) => line.includes('연령: 15세')), 'normal recruit detail should show CHARA_MANUAL stat line.');
  step = dispatchChecked(context, { type: 'recruit/confirm' });
  assert(step.result.status === 'success', 'normal recruit confirm should succeed.');
  assert(effectMessages(step.result).some((message) => message.includes('계약했습니다')), 'CHARA_BUY_NEW success message should use original contract text.');
  assertRecruitBuyEvent(step.result, [
    '오빠 혼자 괴롭게 만들기 싫어',
    '카논이 그 말을 남기고 떠나고서',
    '카논에게 받은 계약서를 카나데에게 전달했다',
  ]);
  context = step.context;
  assertCharacterCreated(context, 'character:1', '1');
  assertTemplateInitialStateApplied(context, 'character:1', '1');
  assertRecruitSuccessPersistentState(context, 'character:1', '1', 'recruitListingFlag_1000');
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

  for (const eventCase of [
    {
      listingId: 'recruit:102',
      characterId: 'character:3',
      templateId: '3',
      fragments: ['뭐야, 아까 거는 계약금이고 출연료가 아니었구나', '동생들한테 좋은 걸 먹여줄 순 있단 거야'],
    },
    {
      listingId: 'recruit:128',
      characterId: 'character:29',
      templateId: '29',
      fragments: ['유지조차 곤란해진 교회와 복지시설', '부디 지도를 부탁드립니다'],
    },
    {
      listingId: 'recruit:139',
      characterId: 'character:40',
      templateId: '40',
      fragments: ['부부금슬의 비결을 알고 있니', '내게 토노를 기쁘게 해주는 방법을  가르쳐줬으면 해'],
    },
  ] as const) {
    step = dispatchChecked(context, { type: 'recruit/selectListing', listingId: eventCase.listingId });
    assert(step.result.status === 'success', `CHARA_BUY_EVENT recruit selection should succeed: ${eventCase.listingId}`);
    context = step.context;
    step = dispatchChecked(context, { type: 'recruit/confirm' });
    assert(step.result.status === 'success', `CHARA_BUY_EVENT recruit confirm should succeed: ${eventCase.listingId}`);
    assertRecruitBuyEvent(step.result, eventCase.fragments);
    context = step.context;
    assertCharacterCreated(context, eventCase.characterId, eventCase.templateId);
  }

  context = withMoneyAndRosterLimit(context, 10_000_000, Object.keys(context.state.people.characters).length - 1);
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
    assertInterviewDisplay(context, 300);
    const firstDraftName = context.session.recruit.interviewDraft.displayName;
    step = dispatchChecked(context, { type: 'recruit/rerollInterview' });
    assert(step.result.status === 'success', `recruit ad reroll ${index} should succeed.`);
    context = step.context;
    assert(context.session.recruit.interviewDraft?.instanceIndex === index, `rerolled interview draft index mismatch: ${index}`);
    assert(context.session.recruit.interviewDraft.displayName !== firstDraftName, 'recruit ad reroll should replace the interview candidate.');
    assertInterviewDisplay(context, 300);
    if (index === 1) {
      context = withInterviewFlags(context, { '400': 0, '409': 7, '411': 1, '412': 1, '413': 1 });
    } else if (index === 2) {
      context = withInterviewFlags(context, { '411': 0, '412': 0, '413': 0 });
    }
    const acceptedDraftName = context.session.recruit.interviewDraft.displayName;

    step = dispatchChecked(context, { type: 'recruit/confirm' });
    assert(step.result.status === 'success', `recruit ad confirm ${index} should succeed.`);
    context = step.context;
    assertCharacterCreated(context, `character:51:${index}`, '51');
    assertInterviewAddApplied(context, `character:51:${index}`, acceptedDraftName);
    if (index === 1) assertOriginalHistoryScenario(context, `character:51:${index}`, 'taboo-anal');
    if (index === 2) assertOriginalHistoryScenario(context, `character:51:${index}`, 'inexperienced');
    assert(context.state.meta.globalCounters['251'] === index, 'GLOBAL:251 should count Chara 51 recruit successes.');
    assert(context.state.run.runFlags.recruitAdvertisementCount === index, 'FLAG:90 equivalent should count recruit advertisements.');
    assert(context.state.run.runFlags['90'] === index, 'FLAG:90 should be mirrored for recruit advertisement count.');
    assert(
      context.state.run.runFlags['1050'] === (index < 5 ? 300 : -1),
      'FLAG:1050 equivalent should relist recruit ad until five hires, then close.',
    );
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
