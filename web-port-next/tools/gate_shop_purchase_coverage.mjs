import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));
}

function fileExists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function fail(message, detail) {
  console.error(`gate:shop-purchase-coverage failed: ${message}`);
  if (detail) {
    console.error(JSON.stringify(detail, null, 2));
  }
  process.exit(1);
}

function assert(condition, message, detail) {
  if (!condition) fail(message, detail);
}

const expectedPurchaseItemIds = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '23',
  '24',
  '25',
  '26',
  '27',
  '29',
  '34',
  '37',
];

const queue = readJson('data/coverage/implementation-queue.json');
const coverage = readJson('data/coverage/shop-purchase-coverage.json');
const gapAudit = readJson('data/coverage/audits/M29-gap-audit.json');

assert(coverage.schemaVersion === 'shop-purchase-coverage/v1', 'invalid schema version');
assert(coverage.milestone === 'M29', 'coverage milestone must be M29');
assert(Array.isArray(coverage.rows), 'coverage rows missing');
assert(Array.isArray(coverage.unresolvedIssues), 'unresolvedIssues missing');
assert(gapAudit.schemaVersion === 'milestone-gap-audit/v1', 'invalid M29 gap audit schema version');
assert(gapAudit.milestone === 'M29', 'M29 gap audit milestone mismatch');

const unit = (queue.queueUnits ?? []).find((item) => item.unitId === 'unit:M29:shop-purchase');
assert(unit, 'M29 implementation queue unit not found');

const expectedRefs = new Set(unit.rowRefs ?? []);
const accountedRefs = new Map();
for (const row of coverage.rows) {
  assert(row.reviewId, 'coverage row missing reviewId', row);
  accountedRefs.set(row.reviewId, (accountedRefs.get(row.reviewId) ?? 0) + 1);
}

const missingRefs = [...expectedRefs].filter((ref) => !accountedRefs.has(ref)).sort();
const extraRefs = [...accountedRefs.keys()].filter((ref) => !expectedRefs.has(ref)).sort();
const duplicateRefs = [...accountedRefs.entries()].filter(([, count]) => count !== 1);
assert(missingRefs.length === 0, 'M29 queue rowRefs missing from shop purchase coverage', missingRefs.slice(0, 50));
assert(extraRefs.length === 0, 'shop purchase coverage includes rowRefs outside M29 queue', extraRefs.slice(0, 50));
assert(duplicateRefs.length === 0, 'shop purchase coverage rowRefs are duplicated', duplicateRefs.slice(0, 50));
assert(coverage.rows.length === expectedRefs.size, 'coverage row count must match M29 queue row count', coverage.summary);
assert(coverage.unresolvedIssues.length === 0, 'M29 coverage has unresolved issues', coverage.unresolvedIssues);
assert(Number(gapAudit.summary?.unresolvedGaps ?? -1) === 0, 'M29 gap audit has unresolved gaps', gapAudit.summary);

const purchaseIds = coverage.purchaseItemIds ?? [];
const missingPurchaseIds = expectedPurchaseItemIds.filter((itemId) => !purchaseIds.includes(itemId));
const extraPurchaseIds = purchaseIds.filter((itemId) => !expectedPurchaseItemIds.includes(itemId));
assert(missingPurchaseIds.length === 0, 'purchase item id set missing expected SHOP_ITEM ids', missingPurchaseIds);
assert(extraPurchaseIds.length === 0, 'purchase item id set includes non-SHOP_ITEM ids', extraPurchaseIds);

const badImplementedRows = coverage.rows.filter(
  (row) =>
    row.completionStatus !== 'transferred-out' &&
    (!row.sourceEvidenceId || !row.runtimeConsumerId || !row.verificationId || !row.completionStatus),
);
assert(badImplementedRows.length === 0, 'implemented/mapped rows missing evidence, consumer, or verification', badImplementedRows.slice(0, 20));

const badTransfers = coverage.rows.filter(
  (row) =>
    row.completionStatus === 'transferred-out' &&
    (row.fromMilestone !== 'M29' ||
      !row.toMilestone ||
      row.acceptedByOwner !== true ||
      !row.transferReason ||
      !row.sourceEvidenceId ||
      !row.verificationId),
);
assert(badTransfers.length === 0, 'transfer rows are incomplete', badTransfers.slice(0, 20));

const transferRows = coverage.rows.filter((row) => row.completionStatus === 'transferred-out');
const missingInboundTransferRows = [];
for (const row of transferRows) {
  const manifestPath = `data/coverage/manifests/${row.toMilestone}-source-units.json`;
  if (!fileExists(manifestPath)) {
    missingInboundTransferRows.push({ coverageRowId: row.coverageRowId, toMilestone: row.toMilestone, reason: 'receiver manifest missing' });
    continue;
  }
  const receiverManifestText = JSON.stringify(readJson(manifestPath));
  if (
    !receiverManifestText.includes(row.reviewId) &&
    !receiverManifestText.includes(row.coverageRowId) &&
    !receiverManifestText.includes(row.sourceEvidenceId)
  ) {
    missingInboundTransferRows.push({
      coverageRowId: row.coverageRowId,
      reviewId: row.reviewId,
      sourceEvidenceId: row.sourceEvidenceId,
      toMilestone: row.toMilestone,
      reason: 'receiver manifest has no matching inbound unit',
    });
  }
}
assert(
  missingInboundTransferRows.length === 0,
  'M29 transfer rows must be explicit inbound responsibility in receiving manifests',
  missingInboundTransferRows.slice(0, 20),
);

const implementedDefinitions = coverage.rows.filter(
  (row) => row.rowKind === 'definition' && row.completionStatus === 'implemented-shop-purchase-listing',
);
assert(implementedDefinitions.length === expectedPurchaseItemIds.length, 'implemented purchase definition count mismatch', {
  expected: expectedPurchaseItemIds.length,
  actual: implementedDefinitions.length,
});

const requiredRuntimeConsumers = new Set([
  'definitions.shopListings -> computeVisibleShopListingIds -> buildItemShopView',
  'main/openItemShop; shop/selectListing; shop/changeQuantity; shop/confirmPurchase; shop/cancel',
  'purchaseSelectedShopItem',
  'session.shop.selectedItemId',
  'session.shop.visibleListingIds',
]);
const presentRuntimeConsumers = new Set(coverage.rows.map((row) => row.runtimeConsumerId).filter(Boolean));
for (const consumer of requiredRuntimeConsumers) {
  assert(presentRuntimeConsumers.has(consumer), `required runtime consumer missing: ${consumer}`);
}

const summary = coverage.summary ?? {};
assert(Number(summary.queueRowRefs) === expectedRefs.size, 'summary queue row count mismatch', summary);
assert(Number(summary.rows) === coverage.rows.length, 'summary rows count mismatch', summary);
assert(Number(summary.ownedBlocker) === 0, 'M29 must not close with owned blockers', summary);
assert(
  Number(summary.m29OwnedRows) === Number(summary.implemented) + Number(summary.mapped),
  'strict M29 owned rows must equal implemented + mapped purchase evidence rows',
  summary,
);
assert(
  Number(summary.outOfScopeAccepted) === Number(summary.transferredOut),
  'out-of-scope accepted rows must match transfer accounting',
  summary,
);
assert(
  Number(summary.implementedVerifiedForStrictClosure) === Number(summary.m29OwnedRows),
  'strict closure evidence must cover every M29-owned purchase row',
  summary,
);
assert(
  Number(summary.implemented) + Number(summary.mapped) + Number(summary.transferredOut) === expectedRefs.size,
  'summary implemented + mapped + transferredOut must close all rows',
  summary,
);

console.log(
  `gate:shop-purchase-coverage passed: ${coverage.rows.length} source row(s), M29-owned=${summary.m29OwnedRows}, implemented-verified=${summary.implementedVerifiedForStrictClosure}, approved-excluded=${summary.outOfScopeAccepted}.`,
);
