import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));
}

function fail(message, detail) {
  console.error(`gate:turn-pipeline failed: ${message}`);
  if (detail) console.error(JSON.stringify(detail, null, 2));
  process.exit(1);
}

function assert(condition, message, detail) {
  if (!condition) fail(message, detail);
}

function inboundTransfersForMilestone(files, milestone) {
  const rows = [];
  for (const file of files) {
    const relativePath = `data/coverage/${file}`;
    const absolutePath = path.join(root, relativePath);
    if (!fs.existsSync(absolutePath)) continue;
    const artifact = readJson(relativePath);
    for (const row of artifact.rows ?? []) {
      if (row.toMilestone === milestone || row.transferredTo === milestone || row.ownerMilestone === milestone) {
        rows.push({ ...row, inboundArtifact: relativePath });
      }
    }
  }
  return rows;
}

const queue = readJson('data/coverage/implementation-queue.json');
const coverage = readJson('data/coverage/turn-pipeline-coverage.json');
const gapAudit = readJson('data/coverage/audits/M35-gap-audit.json');
const sourceText = fs.readFileSync(path.join(root, 'src/features/turnEnd.ts'), 'utf8');

assert(coverage.schemaVersion === 'turn-pipeline-coverage/v1', 'invalid schema version');
assert(coverage.milestone === 'M35', 'coverage milestone must be M35');
assert(Array.isArray(coverage.rows), 'coverage rows missing');
assert(Array.isArray(coverage.unresolvedIssues), 'unresolvedIssues missing');
assert(gapAudit.schemaVersion === 'milestone-gap-audit/v1', 'invalid M35 gap audit schema version');
assert(gapAudit.milestone === 'M35', 'M35 gap audit milestone mismatch');

const expectedRefs = new Set();
for (const unit of (queue.queueUnits ?? []).filter((unit) => unit.ownerMilestone === 'M35')) {
  for (const ref of unit.rowRefs ?? []) expectedRefs.add(ref);
}
for (const row of inboundTransfersForMilestone(
  ['shop-purchase-coverage.json', 'recruit-coverage.json', 'social-equipment-cflag-coverage.json'],
  'M35',
)) {
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
assert(missingRefs.length === 0, 'M35 owned refs missing from turn pipeline coverage', missingRefs);
assert(extraRefs.length === 0, 'turn pipeline coverage includes refs outside M35 owned scope', extraRefs);
assert(duplicateRefs.length === 0, 'turn pipeline coverage refs are duplicated', duplicateRefs);
assert(coverage.rows.length === expectedRefs.size, 'coverage row count must match M35 owned scope', coverage.summary);
assert(coverage.unresolvedIssues.length === 0, 'M35 coverage has unresolved issues', coverage.unresolvedIssues);
assert(Number(gapAudit.summary?.unresolvedGaps ?? -1) === 0, 'M35 gap audit has unresolved gaps', gapAudit.summary);

const badClosedRows = coverage.rows.filter(
  (row) => !row.sourceEvidenceId || !row.runtimeConsumerId || !row.verificationId || !row.completionStatus,
);
assert(badClosedRows.length === 0, 'closed rows missing evidence, consumer, or verification', badClosedRows);

const expectedAddresses = new Set(['DAY:0', 'DAY:3', 'DAY:4', 'TIME', 'TIME:0', 'CFLAG:34', 'FLAG:61']);
const coverageAddresses = new Set(coverage.rows.map((row) => row.address));
for (const address of expectedAddresses) {
  assert(coverageAddresses.has(address), `M35 must account mapped save address ${address}`, coverage.summary);
}

for (const hookId of coverage.scopeContract?.hookOrder ?? []) {
  assert(sourceText.includes(hookId), `turnEnd source must contain hook id ${hookId}`);
}
for (const requiredText of [
  'decrementMissionDeadlines',
  'applyWeeklyAutomaticHooks',
  'applyMonthlyAutomaticHooks',
  'applyProcessedEventFlags',
  'clearTurnSession',
  'currentTimeSlot',
  'dayCounters',
  'timeCounters',
  'progressFlags',
]) {
  assert(sourceText.includes(requiredText), `turnEnd source missing required pipeline function or field: ${requiredText}`);
}

const summary = coverage.summary ?? {};
assert(Number(summary.ownedRowRefs) === expectedRefs.size, 'summary owned row count mismatch', summary);
assert(Number(summary.rows) === coverage.rows.length, 'summary row count mismatch', summary);
assert(Number(summary.mapped) === coverage.rows.length, 'all M35 rows must be mapped-consumed', summary);
assert(Number(summary.ownedBlocker) === 0, 'M35 must not close with owned blockers', summary);
assert(Number(summary.missingEvidence) === 0, 'M35 must not close with missing evidence', summary);
assert(Number(summary.missingConsumer) === 0, 'M35 must not close with missing consumer', summary);
assert(Number(summary.missingVerification) === 0, 'M35 must not close with missing verification', summary);

console.log(`gate:turn-pipeline passed: ${coverage.rows.length} M35 row(s), mapped=${summary.mapped}.`);
