import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));
}

function fail(message, detail) {
  console.error(`gate:social-equipment-cflag failed: ${message}`);
  if (detail) console.error(JSON.stringify(detail, null, 2));
  process.exit(1);
}

function assert(condition, message, detail) {
  if (!condition) fail(message, detail);
}

const queue = readJson('data/coverage/implementation-queue.json');
const features = readJson('data/coverage/features.json');
const definitions = readJson('data/coverage/definitions.json');
const coverage = readJson('data/coverage/social-equipment-cflag-coverage.json');
const gapAudit = readJson('data/coverage/audits/M34-gap-audit.json');
const sourceManifest = readJson('data/coverage/manifests/M34-source-units.json');

assert(coverage.schemaVersion === 'social-equipment-cflag-coverage/v1', 'invalid schema version');
assert(coverage.milestone === 'M34', 'coverage milestone must be M34');
assert(Array.isArray(coverage.rows), 'coverage rows missing');
assert(Array.isArray(coverage.unresolvedIssues), 'unresolvedIssues missing');
assert(gapAudit.schemaVersion === 'milestone-gap-audit/v1', 'invalid M34 gap audit schema version');
assert(gapAudit.milestone === 'M34', 'M34 gap audit milestone mismatch');
assert(sourceManifest.schemaVersion === 'source-unit-manifest/v1', 'invalid M34 source manifest schema version');
assert(sourceManifest.milestone === 'M34', 'M34 source manifest milestone mismatch');

const expectedRefs = new Set();
for (const unit of (queue.queueUnits ?? []).filter((item) => item.ownerMilestone === 'M34')) {
  for (const ref of unit.rowRefs ?? []) expectedRefs.add(ref);
}
for (const row of (features.features ?? features.rows ?? []).filter((item) => item.ownerMilestone === 'M34')) {
  expectedRefs.add(row.featureId);
}
for (const row of (definitions.rows ?? []).filter((item) => item.definitionKey === 'legacyCharacterFlagDefinitions')) {
  expectedRefs.add(`definition:${row.definitionRowId}`);
}

const inboundFiles = [
  'data/coverage/shop-purchase-coverage.json',
  'data/coverage/item-use-coverage.json',
  'data/coverage/recruit-coverage.json',
  'data/coverage/character-identity-coverage.json',
  'data/coverage/body-stat-coverage.json',
];
for (const file of inboundFiles) {
  const absolutePath = path.join(root, file);
  if (!fs.existsSync(absolutePath)) continue;
  const artifact = readJson(file);
  for (const row of artifact.rows ?? []) {
    if (row.toMilestone === 'M34' || row.transferredTo === 'M34' || row.ownerMilestone === 'M34') {
      expectedRefs.add(row.reviewId);
    }
  }
}

const accountedRefs = new Map();
for (const row of coverage.rows) {
  assert(row.reviewId, 'coverage row missing reviewId', row);
  accountedRefs.set(row.reviewId, (accountedRefs.get(row.reviewId) ?? 0) + 1);
}

const missingRefs = [...expectedRefs].filter((ref) => !accountedRefs.has(ref)).sort();
const extraRefs = [...accountedRefs.keys()].filter((ref) => !expectedRefs.has(ref)).sort();
const duplicateRefs = [...accountedRefs.entries()].filter(([, count]) => count !== 1);
assert(missingRefs.length === 0, 'M34 owned refs missing from social/equipment/CFLAG coverage', missingRefs.slice(0, 50));
assert(extraRefs.length === 0, 'coverage includes refs outside M34 owned scope', extraRefs.slice(0, 50));
assert(duplicateRefs.length === 0, 'coverage refs are duplicated', duplicateRefs.slice(0, 50));
assert(coverage.rows.length === expectedRefs.size, 'coverage row count must match M34 owned scope', coverage.summary);
assert(coverage.unresolvedIssues.length === 0, 'M34 coverage has unresolved issues', coverage.unresolvedIssues);
assert(Number(gapAudit.summary?.unresolvedGaps ?? -1) === 0, 'M34 gap audit has unresolved gaps', gapAudit.summary);

const badClosedRows = coverage.rows.filter(
  (row) => !row.sourceEvidenceId || !row.runtimeConsumerId || !row.verificationId || !row.completionStatus,
);
assert(badClosedRows.length === 0, 'closed rows missing evidence, consumer, or verification', badClosedRows.slice(0, 20));

const forbiddenClosedRows = coverage.rows.filter(
  (row) =>
    row.completionStatus.startsWith('mapped') ||
    row.completionStatus.startsWith('transferred') ||
    row.completionStatus === 'source-file-review',
);
assert(forbiddenClosedRows.length === 0, 'M34 completion contains non-implementation statuses', forbiddenClosedRows.slice(0, 20));

const badInboundTransfers = coverage.rows.filter(
  (row) =>
    row.inboundTransfer === true &&
    (!row.fromMilestone || row.toMilestone !== 'M34' || !row.transferReason || !row.sourceEvidenceId || !row.acceptedByOwner),
);
assert(badInboundTransfers.length === 0, 'inbound transfer rows missing required transfer evidence', badInboundTransfers.slice(0, 20));

const statuses = new Set(coverage.rows.map((row) => row.completionStatus));
for (const status of [
  'implemented-wardrobe-route',
  'implemented-character-cflag-seed',
  'implemented-character-relation-seed',
  'implemented-cflag-definition-label',
  'implemented-clothing-pack-definition',
  'implemented-clothing-item-definition',
  'implemented-cflag-equipment-save-field',
  'implemented-clothing-item-save-field',
  'implemented-clothing-session-view',
  'implemented-clothing-item-visibility-view',
]) {
  assert(statuses.has(status), `required M34 completion status missing: ${status}`, coverage.summary);
}

const summary = coverage.summary ?? {};
assert(Number(summary.ownedRowRefs) === expectedRefs.size, 'summary owned row count mismatch', summary);
assert(Number(summary.rows) === coverage.rows.length, 'summary rows count mismatch', summary);
assert(Number(summary.ownedBlocker) === 0, 'M34 must not close with owned blockers', summary);
assert(Number(summary.missingEvidence) === 0, 'M34 must not close with missing evidence', summary);
assert(Number(summary.missingConsumer) === 0, 'M34 must not close with missing consumer', summary);
assert(Number(summary.missingVerification) === 0, 'M34 must not close with missing verification', summary);
assert(Number(summary.mapped) === 0, 'M34 strict closure must not count mapped rows as complete', summary);
assert(Number(summary.approvedExcluded ?? 0) === 0, 'M34 should not approve-exclude owned rows in this closure', summary);
assert(Number(summary.implemented) === expectedRefs.size, 'summary implemented must close all M34 rows', summary);

assert(Array.isArray(sourceManifest.units), 'M34 source manifest units missing');
const manifestSummary = sourceManifest.summary ?? {};
assert(Number(manifestSummary.totalUnits) === expectedRefs.size, 'M34 manifest totalUnits mismatch', manifestSummary);
assert(
  Number(manifestSummary['implemented-verified']) === expectedRefs.size,
  'M34 manifest implemented-verified mismatch',
  manifestSummary,
);
assert(Number(manifestSummary['approved-excluded']) === 0, 'M34 manifest approved-excluded must be zero', manifestSummary);
assert(Number(manifestSummary.blocked) === 0, 'M34 manifest must not contain blocked units', manifestSummary);
assert(
  Number(manifestSummary['scope-redesign-required']) === 0,
  'M34 manifest must not contain scope-redesign-required units',
  manifestSummary,
);
assert(manifestSummary.completedAllowedNow === true, 'M34 manifest must allow completion now', manifestSummary);

const manifestRefs = new Map();
for (const unit of sourceManifest.units) {
  assert(unit.legacyReviewId, 'M34 manifest unit missing legacyReviewId', unit);
  manifestRefs.set(unit.legacyReviewId, (manifestRefs.get(unit.legacyReviewId) ?? 0) + 1);
  assert(
    unit.manifestStatus === 'implemented-verified' || unit.manifestStatus === 'approved-excluded',
    'M34 manifest unit has forbidden completion status',
    unit,
  );
  assert(unit.sourceEvidenceId && unit.runtimeConsumerId && unit.verificationId, 'M34 manifest unit missing closure evidence', unit);
}
const missingManifestRefs = [...expectedRefs].filter((ref) => !manifestRefs.has(ref)).sort();
const extraManifestRefs = [...manifestRefs.keys()].filter((ref) => !expectedRefs.has(ref)).sort();
const duplicateManifestRefs = [...manifestRefs.entries()].filter(([, count]) => count !== 1);
assert(missingManifestRefs.length === 0, 'M34 manifest refs missing expected scope', missingManifestRefs.slice(0, 50));
assert(extraManifestRefs.length === 0, 'M34 manifest refs outside expected scope', extraManifestRefs.slice(0, 50));
assert(duplicateManifestRefs.length === 0, 'M34 manifest refs are duplicated', duplicateManifestRefs.slice(0, 50));

console.log(
  `gate:social-equipment-cflag passed: ${coverage.rows.length} M34 row(s), implemented=${summary.implemented}, mapped=${summary.mapped}.`,
);
