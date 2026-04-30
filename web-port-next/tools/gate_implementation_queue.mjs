import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));
}

function fail(message, detail) {
  console.error(`gate:implementation-queue failed: ${message}`);
  if (detail) {
    console.error(JSON.stringify(detail, null, 2));
  }
  process.exit(1);
}

function assert(condition, message, detail) {
  if (!condition) fail(message, detail);
}

const audit = readJson('data/coverage/audits/pre-implementation-gap-audit.json');
const queue = readJson('data/coverage/implementation-queue.json');
const freeze = readJson('data/coverage/blocker-freeze-list.json');
const requests = readJson('data/coverage/approved-exclusion-requests.json');

assert(queue.schemaVersion === 'implementation-queue/v1', 'invalid implementation queue schema version');
assert(freeze.schemaVersion === 'blocker-freeze-list/v1', 'invalid blocker freeze schema version');
assert(requests.schemaVersion === 'approved-exclusion-requests/v1', 'invalid approved exclusion request schema version');
assert(Array.isArray(queue.queueUnits), 'queue units are missing');
assert(Array.isArray(freeze.blockers), 'blocker freeze rows are missing');
assert(Array.isArray(requests.requests), 'approved exclusion requests are missing');

const expectedReviewIds = new Set((audit.implementationReviewRows ?? []).map((row) => row.reviewId));
const queuedReviewIdCounts = new Map();
for (const unit of queue.queueUnits) {
  assert(unit.unitId, 'queue unit is missing unitId', unit);
  assert(unit.ownerMilestone, 'queue unit is missing ownerMilestone', unit);
  assert(unit.ownerMilestone !== 'M27', 'M27 cannot remain a queue owner after M27 closure', unit);
  assert(unit.ownerRole, 'queue unit is missing ownerRole', unit);
  assert(unit.implementationArea, 'queue unit is missing implementationArea', unit);
  assert(Array.isArray(unit.rowRefs) && unit.rowRefs.length > 0, 'queue unit has no rowRefs', unit);
  assert(unit.requiredEvidenceTemplate, 'queue unit is missing requiredEvidenceTemplate', unit);
  assert(unit.verification?.ownerGate && unit.verification?.build, 'queue unit is missing verification gates', unit);
  assert(unit.closureRule, 'queue unit is missing closureRule', unit);
  for (const rowRef of unit.rowRefs) {
    queuedReviewIdCounts.set(rowRef, (queuedReviewIdCounts.get(rowRef) ?? 0) + 1);
  }
}

const missingRows = [...expectedReviewIds].filter((reviewId) => !queuedReviewIdCounts.has(reviewId));
const duplicateRows = [...queuedReviewIdCounts.entries()].filter(([, count]) => count !== 1);
const unknownRows = [...queuedReviewIdCounts.keys()].filter((reviewId) => !expectedReviewIds.has(reviewId));
assert(missingRows.length === 0, 'M26 review rows missing from implementation queue', missingRows.slice(0, 50));
assert(duplicateRows.length === 0, 'M26 review rows appear in more than one queue unit', duplicateRows.slice(0, 50));
assert(unknownRows.length === 0, 'queue contains review rows not present in M26 audit', unknownRows.slice(0, 50));

const invalidShared = (queue.sharedSourceOwnership ?? []).filter(
  (row) => !row.primaryOwnerMilestone || !Array.isArray(row.referenceOwnerMilestones) || !row.rule,
);
assert(invalidShared.length === 0, 'shared source ownership rows are incomplete', invalidShared.slice(0, 20));

const allowedBlockerOwners = new Set([
  'M28',
  'M29',
  'M30',
  'M31',
  'M32',
  'M33',
  'M34',
  'M35',
  'M36',
  'M37',
  'M38',
  'M39',
  'M40',
  'M41',
  'M42',
  'M43',
  'M44',
  'M45',
  'M46',
  'M47',
  'M48',
  'M49',
  'M50',
  'M51',
  'M52',
]);

const invalidBlockers = freeze.blockers.filter(
  (row) =>
    !row.blockerId ||
    !allowedBlockerOwners.has(row.frozenOwnerMilestone) ||
    !row.closureRule ||
    !row.verificationToClose ||
    !Array.isArray(row.linkedReviewRows),
);
assert(invalidBlockers.length === 0, 'frozen blocker rows are incomplete or have invalid owners', invalidBlockers.slice(0, 20));

const blockerRequestIds = new Set(freeze.blockers.map((row) => row.blockerId));
const invalidRequests = requests.requests.filter(
  (row) =>
    !row.requestId ||
    row.status !== 'not-requested' ||
    row.approvalRequired !== true ||
    row.existingApprovedExclusionId ||
    !blockerRequestIds.has(row.rowId) ||
    !allowedBlockerOwners.has(row.ownerMilestone),
);
assert(invalidRequests.length === 0, 'approved exclusion request rows are incomplete or pre-approved without registry entry', invalidRequests.slice(0, 20));

const summaryReviewRows = Number(queue.summary?.queueRows ?? -1);
assert(summaryReviewRows === expectedReviewIds.size, 'queue summary row count does not match M26 audit', {
  summaryReviewRows,
  expectedReviewRows: expectedReviewIds.size,
});
assert(
  Number(freeze.summary?.blockerRows ?? -1) === freeze.blockers.length,
  'blocker freeze summary count does not match rows',
  freeze.summary,
);
assert(
  Number(requests.summary?.requestRows ?? -1) === requests.requests.length,
  'approved exclusion request summary count does not match rows',
  requests.summary,
);

console.log(
  `gate:implementation-queue passed: ${queue.queueUnits.length} queue unit(s), ${expectedReviewIds.size} review row(s), ${freeze.blockers.length} frozen blocker(s), ${requests.requests.length} approval request candidate(s).`,
);
