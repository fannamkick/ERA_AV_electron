import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));
}

function fail(message, detail) {
  console.error(`gate:definition-consumption failed: ${message}`);
  if (detail) {
    console.error(JSON.stringify(detail, null, 2));
  }
  process.exit(1);
}

function assert(condition, message, detail) {
  if (!condition) fail(message, detail);
}

function count(rows, predicate) {
  return rows.filter(predicate).length;
}

const coverage = readJson('data/coverage/definitions.json');
const blockers = readJson('data/coverage/blockers.json');

assert(coverage.schemaVersion === 'definition-coverage/v1', 'invalid definition coverage schema version');
assert(Array.isArray(coverage.rows), 'definition coverage rows must be an array');
assert(blockers.schemaVersion === 'blocker-registry/v1', 'invalid blocker registry schema version');
assert(Array.isArray(blockers.blockers), 'blocker registry rows must be an array');

const rows = coverage.rows;
const blockerIds = new Set(blockers.blockers.map((blocker) => blocker.blockerId));
const ids = new Set();
const duplicateIds = [];

for (const row of rows) {
  if (ids.has(row.definitionRowId)) duplicateIds.push(row.definitionRowId);
  ids.add(row.definitionRowId);
}

assert(duplicateIds.length === 0, 'duplicate definition row ids', duplicateIds.slice(0, 20));

const allowedStatuses = new Set([
  'used',
  'display-only',
  'calculation-only',
  'template',
  'listing',
  'blocker',
  'approved-excluded',
]);
const invalidStatuses = rows.filter((row) => !allowedStatuses.has(row.status));
assert(invalidStatuses.length === 0, 'invalid definition status exists', invalidStatuses.slice(0, 10));

const forbiddenStatuses = new Set(['unused', 'loaded-only', 'unknown', 'planned', 'partial', 'needsDecision', 'missingMapping']);
const forbidden = rows.filter((row) => forbiddenStatuses.has(row.status));
assert(forbidden.length === 0, 'forbidden completion status exists', forbidden.slice(0, 10));

const missingIdentity = rows.filter(
  (row) =>
    !row.definitionRowId ||
    !row.sourceKind ||
    !row.definitionKey ||
    !row.sourceFile ||
    !row.sourceId ||
    !row.runtimeOwner ||
    !row.role ||
    !row.consumerKind ||
    !row.status ||
    !row.ownerMilestone,
);
assert(missingIdentity.length === 0, 'rows with missing required fields', missingIdentity.slice(0, 10));

const nonBlockerWithoutConsumer = rows.filter(
  (row) =>
    row.status !== 'blocker' &&
    row.status !== 'approved-excluded' &&
    !row.consumingFeature &&
    !row.consumingView &&
    !row.consumingCalculation &&
    !row.saveInitPath,
);
assert(nonBlockerWithoutConsumer.length === 0, 'non-blocker definitions require a consumer', nonBlockerWithoutConsumer.slice(0, 10));

const blockerRowsMissingRegistry = rows.filter((row) => row.status === 'blocker' && (!row.blockerId || !blockerIds.has(row.blockerId)));
assert(blockerRowsMissingRegistry.length === 0, 'blocker rows must reference blocker registry', blockerRowsMissingRegistry.slice(0, 10));

const approvedWithoutEvidence = rows.filter((row) => row.status === 'approved-excluded' && !row.approvedExclusionId);
assert(approvedWithoutEvidence.length === 0, 'approved-excluded rows require approvedExclusionId', approvedWithoutEvidence.slice(0, 10));

const rawDefinitionRows = count(rows, (row) => row.sourceKind === 'raw-catalog-definition' || row.sourceKind === 'character-template');
const characterSeedRows = count(rows, (row) => row.sourceKind === 'character-seed');

assert(rawDefinitionRows === coverage.expectedCounts.rawDefinitions, 'raw definition count mismatch', {
  expected: coverage.expectedCounts.rawDefinitions,
  actual: rawDefinitionRows,
});
assert(characterSeedRows === coverage.expectedCounts.characterSeedRows, 'character seed row count mismatch', {
  expected: coverage.expectedCounts.characterSeedRows,
  actual: characterSeedRows,
});

const expectedDefinitionKeyCounts = {
  characters: 109,
  baseStats: 23,
  abilities: 34,
  talents: 261,
  experiences: 82,
  marks: 4,
  trainingParams: 17,
  trainingCommands: 105,
  sourceDefinitions: 18,
  characterTextDefinitions: 5,
  legacyCharacterFlagDefinitions: 151,
  items: 109,
};

for (const [definitionKey, expected] of Object.entries(expectedDefinitionKeyCounts)) {
  const actual = count(rows, (row) => row.sourceKind !== 'character-seed' && row.definitionKey === definitionKey);
  assert(actual === expected, `definition key count mismatch: ${definitionKey}`, { expected, actual });
}

const expectedSeedFamilyCounts = {
  ABL: 660,
  BASE: 1408,
  CFLAG: 1465,
  CSTR: 157,
  EXP: 265,
  RELATION: 532,
  TALENT: 2435,
};

for (const [family, expected] of Object.entries(expectedSeedFamilyCounts)) {
  const actual = count(rows, (row) => row.sourceKind === 'character-seed' && row.seedFamily === family);
  assert(actual === expected, `character seed family count mismatch: ${family}`, { expected, actual });
}

const itemRows = rows.filter((row) => row.definitionKey === 'items');
assert(count(itemRows, (row) => row.status === 'listing' && row.runtimeOwner.includes('shopListings')) === 46, 'shop item count mismatch');
assert(count(itemRows, (row) => row.status === 'listing' && row.runtimeOwner.includes('recruitListings')) === 48, 'recruit listing count mismatch');
assert(count(itemRows, (row) => row.status === 'blocker' && row.blockerId === 'blocker:m20:item-special') === 15, 'special item blocker count mismatch');

const trainingRows = rows.filter((row) => row.definitionKey === 'trainingCommands');
assert(count(trainingRows, (row) => row.status === 'used') === 1, 'M20 should have exactly one currently implemented training command');
assert(count(trainingRows, (row) => row.status === 'blocker') === 104, 'M20 should block the remaining 104 training commands for M42/M43/M44');

console.log(
  `gate:definition-consumption passed: ${rows.length} row(s), ${rawDefinitionRows} raw definition row(s), ${characterSeedRows} character seed row(s).`,
);
