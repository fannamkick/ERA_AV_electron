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
const coverage = readJson('data/coverage/social-equipment-cflag-coverage.json');
const gapAudit = readJson('data/coverage/audits/M34-gap-audit.json');

assert(coverage.schemaVersion === 'social-equipment-cflag-coverage/v1', 'invalid schema version');
assert(coverage.milestone === 'M34', 'coverage milestone must be M34');
assert(Array.isArray(coverage.rows), 'coverage rows missing');
assert(Array.isArray(coverage.unresolvedIssues), 'unresolvedIssues missing');
assert(gapAudit.schemaVersion === 'milestone-gap-audit/v1', 'invalid M34 gap audit schema version');
assert(gapAudit.milestone === 'M34', 'M34 gap audit milestone mismatch');

const expectedRefs = new Set();
for (const unit of (queue.queueUnits ?? []).filter((item) => item.ownerMilestone === 'M34')) {
  for (const ref of unit.rowRefs ?? []) expectedRefs.add(ref);
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
  'mapped-consumed-cflag-definition',
  'mapped-consumed-clothing-pack-definition',
  'mapped-consumed-cflag-equipment-save-field',
  'mapped-consumed-clothing-session-view',
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
assert(
  Number(summary.implemented) + Number(summary.mapped) === expectedRefs.size,
  'summary implemented + mapped must close all M34 rows',
  summary,
);

console.log(
  `gate:social-equipment-cflag passed: ${coverage.rows.length} M34 row(s), implemented=${summary.implemented}, mapped=${summary.mapped}.`,
);
