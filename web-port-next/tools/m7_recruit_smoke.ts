import { getRecruitListingDefinition } from '../src/catalog/lookup';
import type { CatalogId, GameDefinitions, RecruitListingDefinition } from '../src/catalog/types';
import type { GameAction } from '../src/game/actions';
import { validateActionResultBoundary, validateSavePayloadBoundary, validateStateSessionBoundary } from '../src/game/boundaries';
import { dispatchGameAction } from '../src/game/dispatch';
import type { GameActionContext, GameActionResult } from '../src/game/results';
import { createGameSavePayload } from '../src/game/savePayload';
import { createInitialGameData, type GameSession, type GameState } from '../src/game/state';

type SmokeContext = {
  readonly catalog: GameDefinitions;
  readonly state: GameState;
  readonly session: GameSession;
};

type RecruitCandidate = {
  readonly listing: RecruitListingDefinition;
  readonly price: number;
  readonly characterId: string;
};

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
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

function recruitCandidate(definitions: GameDefinitions, listingId: CatalogId): RecruitCandidate {
  const listing = getRecruitListingDefinition(definitions, listingId);
  assert(listing.ok, `missing recruit listing: ${listingId}`);
  assert(listing.definition.characterTemplateId, `missing character template id: ${listingId}`);
  assert(definitions.characters[listing.definition.characterTemplateId], `missing character template: ${listing.definition.characterTemplateId}`);
  assert(listing.definition.basePrice !== undefined, `missing recruit price: ${listingId}`);

  return {
    listing: listing.definition,
    price: listing.definition.basePrice,
    characterId: `character:${listing.definition.characterTemplateId}`,
  };
}

function visibleRecruitCandidates(context: SmokeContext): readonly RecruitCandidate[] {
  return context.session.recruit.visibleListingIds.map((listingId) => recruitCandidate(context.catalog, listingId));
}

function main() {
  const initialData = createInitialGameData();
  let context: SmokeContext = {
    catalog: initialData.definitions,
    state: initialData.save,
    session: initialData.session,
  };

  assertNoBoundaryErrors('initial state/session', validateStateSessionBoundary(context.state, context.session));

  let step = dispatchChecked(context, { type: 'game/new', input: { modeId: 'normal' } });
  assert(step.result.status === 'success', 'normal new game should succeed.');
  context = step.context;

  step = dispatchChecked(context, { type: 'main/openRecruit' });
  assert(step.result.status === 'success', 'recruit entry should succeed.');
  context = step.context;
  assert(context.session.ui.route === 'recruit', 'recruit entry should route to recruit.');
  assert(context.session.recruit.visibleListingIds.length > 0, 'recruit screen should have visible listings.');

  const candidates = visibleRecruitCandidates(context);
  const expensive = candidates.find((candidate) => candidate.price > context.state.economy.account.currentMoney);
  assert(expensive, 'M7 smoke needs at least one unaffordable recruit candidate.');

  step = dispatchChecked(context, { type: 'recruit/selectListing', listingId: expensive.listing.id });
  assert(step.result.status === 'success', 'unaffordable recruit candidate selection should succeed before confirm.');
  context = step.context;

  const beforeMoneyFailure = context.state;
  step = dispatchChecked(context, { type: 'recruit/confirm' });
  assert(step.result.status === 'failure', 'unaffordable recruit should fail at confirm.');
  assert(step.result.failure?.code === 'not-enough-money', 'unaffordable recruit should fail with not-enough-money.');
  assert(step.result.state === beforeMoneyFailure, 'failed recruit must preserve save state reference.');
  context = step.context;

  const affordable = candidates.find((candidate) => candidate.price <= context.state.economy.account.currentMoney);
  assert(affordable, 'M7 smoke needs at least one affordable recruit candidate.');

  step = dispatchChecked(context, { type: 'recruit/selectListing', listingId: affordable.listing.id });
  assert(step.result.status === 'success', 'affordable recruit candidate selection should succeed.');
  context = step.context;

  const moneyBeforeRecruit = context.state.economy.account.currentMoney;
  const characterCountBeforeRecruit = Object.keys(context.state.people.characters).length;
  const relationshipCountBeforeRecruit = Object.keys(context.state.social.relationships).length;
  step = dispatchChecked(context, { type: 'recruit/confirm' });
  assert(step.result.status === 'success', 'affordable recruit should succeed.');
  context = step.context;
  assert(
    context.state.economy.account.currentMoney === moneyBeforeRecruit - affordable.price,
    'successful recruit should subtract money.',
  );
  assert(
    Object.keys(context.state.people.characters).length === characterCountBeforeRecruit + 1,
    'successful recruit should add one character.',
  );
  assert(context.state.people.characters[affordable.characterId], 'successful recruit should create people state.');
  assert(context.state.body.byCharacterId[affordable.characterId], 'successful recruit should create body state.');
  assert(context.state.equipment.byCharacterId[affordable.characterId], 'successful recruit should create equipment state.');
  assert(
    Object.keys(context.state.social.relationships).length > relationshipCountBeforeRecruit,
    'successful recruit should merge character relationship seed into social state.',
  );
  assert(context.session.recruit.selectedListingId === undefined, 'successful recruit should clear recruit selection.');

  const beforeDuplicateFailure = context.state;
  step = dispatchChecked(context, { type: 'recruit/selectListing', listingId: affordable.listing.id });
  assert(step.result.status === 'failure', 'duplicate recruit selection should fail.');
  assert(step.result.failure?.code === 'recruit-duplicate-character', 'duplicate recruit should use recruit-duplicate-character failure code.');
  assert(step.result.state === beforeDuplicateFailure, 'duplicate recruit failure must preserve save state reference.');
  context = step.context;

  step = dispatchChecked(context, { type: 'recruit/cancel' });
  assert(step.result.status === 'success', 'recruit cancel should succeed.');
  context = step.context;
  assert(context.session.ui.route === 'mainMenu', 'recruit cancel should route back to mainMenu.');
  assert(context.session.recruit.visibleListingIds.length === 0, 'recruit cancel should clear visible listing session state.');

  const savePayload = createGameSavePayload(context.state, new Date('2026-04-30T00:00:00.000Z'));
  assertNoBoundaryErrors('save payload', validateSavePayloadBoundary(savePayload));

  const summary = {
    route: context.session.ui.route,
    currentMoney: context.state.economy.account.currentMoney,
    characters: Object.keys(context.state.people.characters).length,
    bodyRecords: Object.keys(context.state.body.byCharacterId).length,
    equipmentRecords: Object.keys(context.state.equipment.byCharacterId).length,
    recruitListings: Object.keys(context.catalog.recruitListings).length,
  };
  console.log(`M7 recruit smoke passed: ${JSON.stringify(summary)}`);
}

main();
