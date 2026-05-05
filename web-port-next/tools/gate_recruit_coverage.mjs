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
  console.error(`gate:recruit-coverage failed: ${message}`);
  if (detail) console.error(JSON.stringify(detail, null, 2));
  process.exit(1);
}

function assert(condition, message, detail) {
  if (!condition) fail(message, detail);
}

function expectedTemplateForItem(itemId) {
  const numericId = Number(itemId);
  if (numericId >= 100 && numericId <= 146) return String(numericId - 99);
  if (numericId === 150) return '51';
  return '';
}

const queue = readJson('data/coverage/implementation-queue.json');
const shopPurchaseCoverage = readJson('data/coverage/shop-purchase-coverage.json');
const coverage = readJson('data/coverage/recruit-coverage.json');
const gapAudit = readJson('data/coverage/audits/M31-gap-audit.json');

assert(coverage.schemaVersion === 'recruit-coverage/v1', 'invalid schema version');
assert(coverage.milestone === 'M31', 'coverage milestone must be M31');
assert(Array.isArray(coverage.rows), 'coverage rows missing');
assert(Array.isArray(coverage.unresolvedIssues), 'unresolvedIssues missing');
assert(gapAudit.schemaVersion === 'milestone-gap-audit/v1', 'invalid M31 gap audit schema version');
assert(gapAudit.milestone === 'M31', 'M31 gap audit milestone mismatch');

const expectedRefs = new Set();
for (const unit of (queue.queueUnits ?? []).filter((item) => item.ownerMilestone === 'M31')) {
  for (const ref of unit.rowRefs ?? []) expectedRefs.add(ref);
}
for (const row of (shopPurchaseCoverage.rows ?? []).filter((item) => item.toMilestone === 'M31')) {
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
assert(missingRefs.length === 0, 'M31 owned refs missing from recruit coverage', missingRefs.slice(0, 50));
assert(extraRefs.length === 0, 'recruit coverage includes refs outside M31 owned scope', extraRefs.slice(0, 50));
assert(duplicateRefs.length === 0, 'recruit coverage refs are duplicated', duplicateRefs.slice(0, 50));
assert(coverage.rows.length === expectedRefs.size, 'coverage row count must match M31 owned scope', coverage.summary);
assert(coverage.unresolvedIssues.length === 0, 'M31 coverage has unresolved issues', coverage.unresolvedIssues);
assert(Number(gapAudit.summary?.unresolvedGaps ?? -1) === 0, 'M31 gap audit has unresolved gaps', gapAudit.summary);

const listingTemplateMap = coverage.listingTemplateMap ?? {};
const expectedListingItemIds = [
  ...Array.from({ length: 47 }, (_, index) => String(index + 100)),
  '150',
];
for (const itemId of expectedListingItemIds) {
  assert(listingTemplateMap[itemId] === expectedTemplateForItem(itemId), `listing-template mapping mismatch for ${itemId}`, {
    expected: expectedTemplateForItem(itemId),
    actual: listingTemplateMap[itemId],
  });
}
assert(Object.keys(listingTemplateMap).length === expectedListingItemIds.length, 'listing-template map has unexpected size', listingTemplateMap);
assert((coverage.repeatableListingItemIds ?? []).includes('150'), 'recruit ad listing 150 must be repeatable');

const badImplementedRows = coverage.rows.filter(
  (row) =>
    row.completionStatus !== 'transferred-out' &&
    (!row.sourceEvidenceId || !row.runtimeConsumerId || !row.verificationId || !row.completionStatus),
);
assert(badImplementedRows.length === 0, 'implemented/mapped rows missing evidence, consumer, or verification', badImplementedRows.slice(0, 20));

const badTransfers = coverage.rows.filter(
  (row) =>
    row.completionStatus === 'transferred-out' &&
    (row.fromMilestone !== 'M31' ||
      !row.toMilestone ||
      row.acceptedByOwner !== true ||
      !row.transferReason ||
      !row.sourceEvidenceId ||
      !row.verificationId),
);
assert(badTransfers.length === 0, 'transfer rows are incomplete', badTransfers.slice(0, 20));

function strictReceiverForRow(row) {
  if (isStrictM31Implemented(row)) return '';
  if (row.toMilestone) return row.toMilestone;
  if (row.completionStatus === 'mapped-consumed-character-template-seed') return 'M33';
  if (row.completionStatus === 'mapped-consumed-post-recruit-hook') return 'M47';
  return '';
}

function isStrictM31Implemented(row) {
  return (
    row.completionStatus.startsWith('implemented') ||
    row.completionStatus === 'mapped-consumed-visible-recruit-listing' ||
    row.completionStatus === 'mapped-consumed-recruit-session-buffer'
  );
}

function receiverManifestContains(manifest, row) {
  const needles = [row.reviewId, row.coverageRowId, row.sourceEvidenceId].filter(Boolean);
  return (manifest.units ?? []).some((unit) => {
    const haystack = JSON.stringify({
      legacyReviewId: unit.legacyReviewId,
      reviewId: unit.reviewId,
      sourceCoverageRowId: unit.sourceCoverageRowId,
      sourceEvidenceId: unit.sourceEvidenceId,
      inboundFromMilestone: unit.inboundFromMilestone,
      fromMilestone: unit.fromMilestone,
    });
    return needles.some((needle) => haystack.includes(needle));
  });
}

const receiverRows = coverage.rows.filter((row) => strictReceiverForRow(row));
const missingReceiverRows = [];
for (const row of receiverRows) {
  const receiver = strictReceiverForRow(row);
  const manifestPath = `data/coverage/manifests/${receiver}-source-units.json`;
  if (!fileExists(manifestPath)) {
    missingReceiverRows.push({ reviewId: row.reviewId, receiver, reason: 'receiver manifest missing' });
    continue;
  }
  const manifest = readJson(manifestPath);
  if (!receiverManifestContains(manifest, row)) {
    missingReceiverRows.push({ reviewId: row.reviewId, coverageRowId: row.coverageRowId, sourceEvidenceId: row.sourceEvidenceId, receiver });
  }
}
assert(missingReceiverRows.length === 0, 'M31 approved exclusions are missing receiver manifest rows', missingReceiverRows.slice(0, 20));

const requiredRuntimeConsumers = new Set([
  'definitions.recruitListings -> computeVisibleRecruitListingIds -> buildRecruitView',
  'main/openRecruit; recruit/selectListing; recruit/confirm; recruit/cancel',
  'createCharacterBundleFromSpecs -> people.characters attributes and legacyFlagsNeedingMapping',
  'session.recruit.visibleListingIds',
  'session.recruit.pageIndex and session.recruit.commandFlags[100]',
  'session.recruit.interviewDraft.commandFlags',
  'session.recruit.scratchTexts',
]);
const presentRuntimeConsumers = new Set(coverage.rows.map((row) => row.runtimeConsumerId).filter(Boolean));
for (const consumer of requiredRuntimeConsumers) {
  assert(presentRuntimeConsumers.has(consumer), `required runtime consumer missing: ${consumer}`);
}

const summary = coverage.summary ?? {};
const strictOwnedRows = coverage.rows.filter(isStrictM31Implemented);
const approvedExcludedRows = coverage.rows.filter((row) => !isStrictM31Implemented(row));
assert(Number(summary.ownedRowRefs) === expectedRefs.size, 'summary owned row count mismatch', summary);
assert(Number(summary.rows) === coverage.rows.length, 'summary rows count mismatch', summary);
assert(Number(summary.ownedBlocker) === 0, 'M31 must not close with owned blockers', summary);
assert(Number(summary.m31OwnedRows) === strictOwnedRows.length, 'summary M31-owned strict count mismatch', summary);
assert(
  Number(summary.implementedVerifiedForStrictClosure) === strictOwnedRows.length,
  'strict implemented-verified count must equal M31-owned rows',
  summary,
);
assert(Number(summary.approvedExcludedFromM31) === approvedExcludedRows.length, 'approved exclusion count mismatch', summary);
assert(
  Number(summary.implemented) + Number(summary.mapped) + Number(summary.transferredOut) === expectedRefs.size,
  'summary implemented + mapped + transferredOut must close all rows',
  summary,
);

console.log(
  `gate:recruit-coverage passed: ${coverage.rows.length} source row(s), M31-owned=${strictOwnedRows.length}, implemented-verified=${strictOwnedRows.length}, approved-excluded=${approvedExcludedRows.length}.`,
);
