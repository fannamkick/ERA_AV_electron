import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));
}

function fail(message, detail) {
  console.error(`gate:feature-coverage failed: ${message}`);
  if (detail) {
    console.error(JSON.stringify(detail, null, 2));
  }
  process.exit(1);
}

function assert(condition, message, detail) {
  if (!condition) fail(message, detail);
}

function countRows(rows, predicate) {
  return rows.filter(predicate).length;
}

const coverage = readJson('data/coverage/features.json');
const blockers = readJson('data/coverage/blockers.json');

assert(coverage.schemaVersion === 'feature-coverage/v1', 'invalid feature coverage schema version');
assert(Array.isArray(coverage.rows), 'feature coverage rows must be an array');
assert(blockers.schemaVersion === 'blocker-registry/v1', 'invalid blocker registry schema version');
assert(Array.isArray(blockers.blockers), 'blocker registry rows must be an array');

const rows = coverage.rows;
const blockerIds = new Set(blockers.blockers.map((blocker) => blocker.blockerId));
const ids = new Set();
const duplicateIds = [];

for (const row of rows) {
  if (ids.has(row.featureId)) duplicateIds.push(row.featureId);
  ids.add(row.featureId);
}

assert(duplicateIds.length === 0, 'duplicate feature ids', duplicateIds.slice(0, 20));

const allowedStatuses = new Set(['implemented', 'blocker', 'approved-excluded']);
const invalidStatuses = rows.filter((row) => !allowedStatuses.has(row.status));
assert(invalidStatuses.length === 0, 'unclassified or invalid feature status exists', invalidStatuses.slice(0, 10));

const missingRequired = rows.filter((row) => !row.featureId || !row.sourceKind || !row.groupKey || !row.ownerMilestone || !row.status);
assert(missingRequired.length === 0, 'rows with missing required identity fields', missingRequired.slice(0, 10));

const implementedMissingRuntime = rows.filter(
  (row) =>
    row.status === 'implemented' &&
    (!row.runtimeRoute || !row.runtimeAction || !row.viewBuilder || !row.handlerOwner || !row.successSmokeId),
);
assert(
  implementedMissingRuntime.length === 0,
  'implemented rows must have route/action/view/handler/success smoke',
  implementedMissingRuntime.slice(0, 10),
);

const implementedSaveWithoutRoundtrip = rows.filter(
  (row) => row.status === 'implemented' && Array.isArray(row.stateWrites) && row.stateWrites.length > 0 && !row.saveRoundtripId,
);
assert(
  implementedSaveWithoutRoundtrip.length === 0,
  'implemented rows with state writes must have save roundtrip or boundary assertion id',
  implementedSaveWithoutRoundtrip.slice(0, 10),
);

const blockersMissingRegistry = rows.filter((row) => row.status === 'blocker' && (!row.blockerId || !blockerIds.has(row.blockerId)));
assert(blockersMissingRegistry.length === 0, 'blocker rows must reference blocker registry', blockersMissingRegistry.slice(0, 10));

const approvedWithoutEvidence = rows.filter((row) => row.status === 'approved-excluded' && !row.approvedExclusionId);
assert(approvedWithoutEvidence.length === 0, 'approved-excluded rows require approvedExclusionId', approvedWithoutEvidence.slice(0, 10));

const expected = coverage.expectedCounts;
assert(countRows(rows, (row) => row.sourceKind === 'dynamic-call') === expected.dynamicCalls, 'dynamic call count mismatch', {
  expected: expected.dynamicCalls,
  actual: countRows(rows, (row) => row.sourceKind === 'dynamic-call'),
});
assert(
  countRows((rows), (row) => row.sourceKind.startsWith('flow-control:')) === expected.flowControlActions,
  'flow-control action count mismatch',
  {
    expected: expected.flowControlActions,
    actual: countRows(rows, (row) => row.sourceKind.startsWith('flow-control:')),
  },
);
assert(countRows(rows, (row) => row.sourceKind === 'flow-control:exit') === expected.exitActions, 'exit action count mismatch', {
  expected: expected.exitActions,
  actual: countRows(rows, (row) => row.sourceKind === 'flow-control:exit'),
});
assert(countRows(rows, (row) => row.sourceKind === 'flow-control:pause') === expected.pauseActions, 'pause action count mismatch', {
  expected: expected.pauseActions,
  actual: countRows(rows, (row) => row.sourceKind === 'flow-control:pause'),
});
assert(
  countRows(rows, (row) => row.sourceKind === 'flow-control:persistence') === expected.persistenceActions,
  'persistence action count mismatch',
  {
    expected: expected.persistenceActions,
    actual: countRows(rows, (row) => row.sourceKind === 'flow-control:persistence'),
  },
);
assert(countRows(rows, (row) => row.sourceKind === 'engine-entry') === expected.engineEntries, 'engine entry count mismatch', {
  expected: expected.engineEntries,
  actual: countRows(rows, (row) => row.sourceKind === 'engine-entry'),
});
assert(
  countRows(rows, (row) => row.sourceKind === 'unreferenced-global') === expected.unreferencedGlobalEntries,
  'unreferenced global label count mismatch',
  {
    expected: expected.unreferencedGlobalEntries,
    actual: countRows(rows, (row) => row.sourceKind === 'unreferenced-global'),
  },
);

const requiredMainFeatureIds = [
  'feature:game:new',
  'feature:main-menu',
  'feature:item-shop:purchase-basic',
  'feature:item-shop:use-effects',
  'feature:recruit:basic',
  'feature:turn:end-basic',
  'feature:persistence:save-load-basic',
  'feature:visit:office-room-basic',
  'feature:mission:basic',
  'feature:work:basic',
  'feature:shooting:basic',
  'feature:training:basic-command',
  'feature:wardrobe-clothing',
  'feature:ability-up',
  'feature:info-settings-achievement-help-debug',
  'feature:ending-check',
];

const missingMainFeatures = requiredMainFeatureIds.filter((id) => !ids.has(id));
assert(missingMainFeatures.length === 0, 'main menu feature coverage rows missing', missingMainFeatures);

const groupKeys = new Set(rows.map((row) => row.groupKey));
const requiredGroups = ['item-shop', 'recruit', 'turn-end', 'persistence', 'visit', 'mission', 'work', 'shooting', 'training'];
const missingGroups = requiredGroups.filter((group) => !groupKeys.has(group));
assert(missingGroups.length === 0, 'required owner group keys missing', missingGroups);

const flowRowsWithoutClassification = rows.filter((row) => row.sourceKind.startsWith('flow-control:') && !row.classification);
assert(flowRowsWithoutClassification.length === 0, 'flow control rows must be classified', flowRowsWithoutClassification.slice(0, 10));

const dynamicRowsWithoutClassification = rows.filter((row) => row.sourceKind === 'dynamic-call' && !row.classification);
assert(dynamicRowsWithoutClassification.length === 0, 'dynamic call rows must be classified', dynamicRowsWithoutClassification.slice(0, 10));

console.log(
  `gate:feature-coverage passed: ${rows.length} row(s), ${blockers.blockers.length} blocker group(s), ${coverage.summary.byStatus.implemented ?? 0} implemented row(s).`,
);
