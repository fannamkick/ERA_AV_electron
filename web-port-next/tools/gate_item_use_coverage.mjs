import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));
}

function fail(message, detail) {
  console.error(`gate:item-use-coverage failed: ${message}`);
  if (detail) {
    console.error(JSON.stringify(detail, null, 2));
  }
  process.exit(1);
}

function assert(condition, message, detail) {
  if (!condition) fail(message, detail);
}

const expectedImmediateUseItemIds = ['30', '31', '38', '39', '40', '41', '42', '43', '52'];
const expectedSpecialTrainingItemIds = [
  '200',
  '201',
  '202',
  '203',
  '204',
  '205',
  '206',
  '207',
  '208',
  '209',
  '210',
  '211',
  '212',
  '213',
  '214',
];

const queue = readJson('data/coverage/implementation-queue.json');
const shopPurchaseCoverage = readJson('data/coverage/shop-purchase-coverage.json');
const coverage = readJson('data/coverage/item-use-coverage.json');
const gapAudit = readJson('data/coverage/audits/M30-gap-audit.json');

assert(coverage.schemaVersion === 'item-use-coverage/v1', 'invalid schema version');
assert(coverage.milestone === 'M30', 'coverage milestone must be M30');
assert(Array.isArray(coverage.rows), 'coverage rows missing');
assert(Array.isArray(coverage.unresolvedIssues), 'unresolvedIssues missing');
assert(gapAudit.schemaVersion === 'milestone-gap-audit/v1', 'invalid M30 gap audit schema version');
assert(gapAudit.milestone === 'M30', 'M30 gap audit milestone mismatch');

const unit = (queue.queueUnits ?? []).find((item) => item.unitId === 'unit:M30:item-use');
assert(unit, 'M30 implementation queue unit not found');

const expectedRefs = new Set(unit.rowRefs ?? []);
for (const row of (shopPurchaseCoverage.rows ?? []).filter((item) => item.toMilestone === 'M30')) {
  expectedRefs.add(row.reviewId);
}

const accountedRefs = new Map();
for (const row of coverage.rows) {
  assert(row.reviewId, 'coverage row missing reviewId', row);
  accountedRefs.set(row.reviewId, (accountedRefs.get(row.reviewId) ?? 0) + 1);
}

const missingRefs = [...expectedRefs].filter((ref) => !accountedRefs.has(ref)).sort();
const extraRefs = [...accountedRefs.keys()].filter((ref) => !expectedRefs.has(ref)).sort();
const duplicateRefs = [...accountedRefs.entries()].filter(([, count]) => count !== 1);
assert(missingRefs.length === 0, 'M30 owned refs missing from item use coverage', missingRefs.slice(0, 50));
assert(extraRefs.length === 0, 'item use coverage includes refs outside M30 owned scope', extraRefs.slice(0, 50));
assert(duplicateRefs.length === 0, 'item use coverage refs are duplicated', duplicateRefs.slice(0, 50));
assert(coverage.rows.length === expectedRefs.size, 'coverage row count must match M30 owned scope', coverage.summary);
assert(coverage.unresolvedIssues.length === 0, 'M30 coverage has unresolved issues', coverage.unresolvedIssues);
assert(Number(gapAudit.summary?.unresolvedGaps ?? -1) === 0, 'M30 gap audit has unresolved gaps', gapAudit.summary);

for (const itemId of expectedImmediateUseItemIds) {
  assert(coverage.immediateUseItemIds.includes(itemId), `immediate use item id missing: ${itemId}`);
}
for (const itemId of expectedSpecialTrainingItemIds) {
  assert(coverage.specialTrainingItemIds.includes(itemId), `special training item id missing: ${itemId}`);
}

const badImplementedRows = coverage.rows.filter(
  (row) =>
    row.completionStatus !== 'transferred-out' &&
    (!row.sourceEvidenceId || !row.runtimeConsumerId || !row.verificationId || !row.completionStatus),
);
assert(badImplementedRows.length === 0, 'implemented/mapped rows missing evidence, consumer, or verification', badImplementedRows.slice(0, 20));

const badTransfers = coverage.rows.filter(
  (row) =>
    row.completionStatus === 'transferred-out' &&
    (row.fromMilestone !== 'M30' ||
      !row.toMilestone ||
      row.acceptedByOwner !== true ||
      !row.transferReason ||
      !row.sourceEvidenceId ||
      !row.verificationId),
);
assert(badTransfers.length === 0, 'transfer rows are incomplete', badTransfers.slice(0, 20));

const requiredRuntimeConsumers = new Set([
  'definitions.items -> computeVisibleItemUseIds -> buildItemShopView -> useSelectedShopItem',
  'specialTrainingItemIds -> isSpecialTrainingItemId -> inventory.itemCounts special unlock state',
  'shop/selectUseItem; shop/selectUseTarget; shop/confirmUseItem; shop/cancelUseItem',
  'session.shop.visibleUseItemIds',
  'run.runFlags.techniqueItemProgress -> applyTechniqueItemUse',
  'people.characters[trainer].attributes.baseStats.maximum[60] -> item 52 filming capacity',
]);
const presentRuntimeConsumers = new Set(coverage.rows.map((row) => row.runtimeConsumerId).filter(Boolean));
for (const consumer of requiredRuntimeConsumers) {
  assert(presentRuntimeConsumers.has(consumer), `required runtime consumer missing: ${consumer}`);
}

const summary = coverage.summary ?? {};
assert(Number(summary.ownedRowRefs) === expectedRefs.size, 'summary owned row count mismatch', summary);
assert(Number(summary.rows) === coverage.rows.length, 'summary rows count mismatch', summary);
assert(Number(summary.ownedBlocker) === 0, 'M30 must not close with owned blockers', summary);
assert(
  Number(summary.implemented) + Number(summary.mapped) + Number(summary.transferredOut) === expectedRefs.size,
  'summary implemented + mapped + transferredOut must close all rows',
  summary,
);

console.log(
  `gate:item-use-coverage passed: ${coverage.rows.length} M30 row(s), implemented=${summary.implemented}, mapped=${summary.mapped}, transferred=${summary.transferredOut}.`,
);
