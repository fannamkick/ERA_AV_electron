import { characterIdForTemplate, createCharacterBundle } from '../src/features/characterCreation';
import { buildWardrobeView, splitLegacyCharacterFlags } from '../src/features/socialEquipmentCflag';
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

function makeStateWithAllCharacters(initial: GameState): GameState {
  const definitions = createInitialGameData().definitions;
  const templateIds = Object.keys(definitions.characters).sort((left, right) => Number(left) - Number(right) || left.localeCompare(right));
  const bundle = createCharacterBundle(definitions, templateIds);
  assert(bundle.ok, 'M34 smoke should create every character template.');

  return {
    ...initial,
    people: {
      characters: bundle.bundle.characters,
    },
    body: {
      byCharacterId: bundle.bundle.bodies,
    },
    equipment: {
      byCharacterId: bundle.bundle.equipment,
    },
    social: {
      relationships: bundle.bundle.relationships,
      ntrProgress: {},
      partnerProgress: {},
    },
  };
}

function actionContext(context: SmokeContext): GameActionContext {
  return {
    catalog: createInitialGameData().definitions,
    state: context.state,
    session: context.session,
  };
}

function nextContext(result: GameActionResult): SmokeContext {
  return {
    state: result.state,
    session: result.session,
  };
}

function dispatchChecked(context: SmokeContext, action: GameAction): { readonly context: SmokeContext; readonly result: GameActionResult } {
  const before = actionContext(context);
  const result = dispatchGameAction(before, action);
  assertNoBoundaryErrors(action.type, validateActionResultBoundary(before, result));
  return {
    context: nextContext(result),
    result,
  };
}

function assertCflagSeedsSplit() {
  const data = createInitialGameData();
  const templateIds = Object.keys(data.definitions.characters).sort((left, right) => Number(left) - Number(right) || left.localeCompare(right));
  const state = makeStateWithAllCharacters(data.save);

  for (const templateId of templateIds) {
    const template = data.definitions.characters[templateId];
    const characterId = characterIdForTemplate(templateId);
    const character = state.people.characters[characterId];
    const body = state.body.byCharacterId[characterId];
    const equipment = state.equipment.byCharacterId[characterId];
    const split = splitLegacyCharacterFlags(template);

    assert(character, `missing M34 character ${templateId}`);
    assert(body, `missing M34 body ${templateId}`);
    assert(equipment, `missing M34 equipment ${templateId}`);
    assert(Object.keys(character.flags.legacyFlagsNeedingMapping).length === 0, `CFLAG seed left unmapped for ${templateId}`);
    assert(Object.keys(equipment.legacyEquipmentIndexesNeedingMapping).length === 0, `equipment seed left unmapped for ${templateId}`);
    assert(Object.keys(body.conditionFlags).length === Object.keys(split.bodyConditionFlags).length, `body flag count mismatch ${templateId}`);
    assert(Object.keys(equipment.availabilityFlags).length === Object.keys(split.equipmentAvailabilityFlags).length, `equipment flag count mismatch ${templateId}`);
  }

  const relationCount = Object.keys(state.social.relationships).length;
  assert(relationCount === 532, `RELATION seeds should create 532 social relationship rows, got ${relationCount}`);
  const sampleRelation = state.social.relationships[Object.keys(state.social.relationships)[0]];
  assert(sampleRelation, 'M34 smoke needs a relationship sample.');
  assert(Object.keys(sampleRelation.legacyRelationIndexesNeedingMapping).length > 0, 'RELATION index evidence should remain attached to social rows.');
}

function assertWardrobeRouteAndRoundtrip() {
  const data = createInitialGameData();
  let context: SmokeContext = {
    state: makeStateWithAllCharacters(data.save),
    session: {
      ...data.session,
      ui: {
        ...data.session.ui,
        route: 'mainMenu',
      },
    },
  };

  let step = dispatchChecked(context, { type: 'main/openWardrobe' });
  assert(step.result.status === 'success', 'wardrobe route entry should succeed.');
  context = step.context;
  assert(context.session.ui.route === 'wardrobe', 'main/openWardrobe should route to wardrobe.');

  const view = buildWardrobeView(context.state);
  const entry = view.entries.find((candidate) => Object.keys(candidate.clothing).length > 0);
  assert(entry, 'M34 smoke needs at least one character with clothing flags.');
  const flagId = Object.keys(entry.clothing).sort((left, right) => Number(left) - Number(right))[0];
  const beforeValue = context.state.equipment.byCharacterId[entry.characterId].clothing[flagId];

  step = dispatchChecked(context, { type: 'wardrobe/toggleClothing', characterId: entry.characterId, flagId });
  assert(step.result.status === 'success', 'wardrobe clothing toggle should succeed.');
  context = step.context;
  assert(context.state.equipment.byCharacterId[entry.characterId].clothing[flagId] !== beforeValue, 'wardrobe toggle should update equipment.clothing.');

  const savePayload = createGameSavePayload(context.state, new Date('2026-05-01T00:00:00.000Z'));
  assertNoBoundaryErrors('M34 save payload', validateSavePayloadBoundary(savePayload));
  const serialized = serializeGameSavePayload(savePayload);
  assert(!serialized.includes('CFLAG'), 'save payload should not expose raw CFLAG model names.');
  const parsed = parseGameSavePayload(serialized);
  assert(parsed.ok, 'M34 save payload should parse after serialization.');
  assert(
    parsed.payload.state.equipment.byCharacterId[entry.characterId].clothing[flagId] ===
      context.state.equipment.byCharacterId[entry.characterId].clothing[flagId],
    'wardrobe clothing state should survive save roundtrip.',
  );

  step = dispatchChecked(context, { type: 'wardrobe/cancel' });
  assert(step.result.status === 'success', 'wardrobe cancel should succeed.');
  context = step.context;
  assert(context.session.ui.route === 'mainMenu', 'wardrobe/cancel should return to mainMenu.');
  assertNoBoundaryErrors('M34 final state/session', validateStateSessionBoundary(context.state, context.session));
}

function main() {
  assertCflagSeedsSplit();
  assertWardrobeRouteAndRoundtrip();
  console.log('M34 social/equipment/CFLAG smoke passed: CFLAG seeds split, wardrobe route, clothing roundtrip verified.');
}

main();
