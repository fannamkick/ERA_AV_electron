import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));
}

function fail(message, detail) {
  console.error(`gate:visit-facility failed: ${message}`);
  if (detail) console.error(JSON.stringify(detail, null, 2));
  process.exit(1);
}

function assert(condition, message, detail) {
  if (!condition) fail(message, detail);
}

const queue = readJson('data/coverage/implementation-queue.json');
const coverage = readJson('data/coverage/visit-facility-coverage.json');
const gapAudit = readJson('data/coverage/audits/M36-gap-audit.json');
const sourceText = fs.readFileSync(path.join(root, 'src/features/visit.ts'), 'utf8');

assert(coverage.schemaVersion === 'visit-facility-coverage/v1', 'invalid schema version');
assert(coverage.milestone === 'M36', 'coverage milestone must be M36');
assert(Array.isArray(coverage.rows), 'coverage rows missing');
assert(Array.isArray(coverage.unresolvedIssues), 'unresolvedIssues missing');
assert(gapAudit.schemaVersion === 'milestone-gap-audit/v1', 'invalid M36 gap audit schema version');
assert(gapAudit.milestone === 'M36', 'M36 gap audit milestone mismatch');

const expectedRefs = new Set();
for (const unit of (queue.queueUnits ?? []).filter((unit) => unit.ownerMilestone === 'M36')) {
  for (const ref of unit.rowRefs ?? []) expectedRefs.add(ref);
}

const accountedRefs = new Map();
for (const row of coverage.rows) {
  assert(row.reviewId, 'coverage row missing reviewId', row);
  accountedRefs.set(row.reviewId, (accountedRefs.get(row.reviewId) ?? 0) + 1);
}

const missingRefs = [...expectedRefs].filter((ref) => !accountedRefs.has(ref)).sort();
const extraRefs = [...accountedRefs.keys()].filter((ref) => !expectedRefs.has(ref)).sort();
const duplicateRefs = [...accountedRefs.entries()].filter(([, count]) => count !== 1);
assert(missingRefs.length === 0, 'M36 owned refs missing from visit facility coverage', missingRefs.slice(0, 50));
assert(extraRefs.length === 0, 'visit facility coverage includes refs outside M36 owned scope', extraRefs.slice(0, 50));
assert(duplicateRefs.length === 0, 'visit facility coverage refs are duplicated', duplicateRefs.slice(0, 50));
assert(coverage.rows.length === expectedRefs.size, 'coverage row count must match M36 owned scope', coverage.summary);
assert(coverage.unresolvedIssues.length === 0, 'M36 coverage has unresolved issues', coverage.unresolvedIssues);
assert(Number(gapAudit.summary?.unresolvedGaps ?? -1) === 0, 'M36 gap audit has unresolved gaps', gapAudit.summary);

const badClosedRows = coverage.rows.filter(
  (row) => !row.sourceEvidenceId || !row.runtimeConsumerId || !row.verificationId || !row.completionStatus,
);
assert(badClosedRows.length === 0, 'closed rows missing evidence, consumer, or verification', badClosedRows.slice(0, 20));

const definitionRows = coverage.rows.filter((row) => row.rowKind === 'definition');
const featureRows = coverage.rows.filter((row) => row.rowKind === 'feature');
assert(definitionRows.length === 7, 'M36 must account seven visit place definition rows', coverage.summary);
assert(featureRows.length === 552, 'M36 must account 552 visit feature rows', coverage.summary);
assert(Number(coverage.summary?.uniqueVisitActions ?? 0) === 86, 'M36 must expose 86 source-label visit actions', coverage.summary);

for (const placeId of [
  'organizationOffice',
  'secretLaboratory',
  'rachelWorkshop',
  'ikumiLaboratory',
  'sakuraHideout',
  'miyakoHouse',
  'akashaHeadquarters',
]) {
  assert(sourceText.includes(placeId), `visit runtime missing place id: ${placeId}`);
}

for (const requiredText of [
  'visitActionDefinitions',
  'computeVisibleVisitPlaceIds',
  'computeVisibleVisitActionIds',
  'selectVisitPlace',
  'selectVisitAction',
  'confirmVisitAction',
  'cancelVisitSelection',
  'cancelVisit',
  'featureState.visits',
  'world.unlocks',
  'world.eventFlags',
]) {
  assert(sourceText.includes(requiredText), `visit runtime missing required consumer: ${requiredText}`);
}

const sourceFiles = new Set(featureRows.map((row) => row.sourcePath.split(/[\\/]/u).pop()));
for (const sourceFile of sourceFiles) {
  assert(sourceText.includes(sourceFile), `visit runtime missing source file action group: ${sourceFile}`);
}

const missingActionConsumer = featureRows.filter((row) => {
  const sourceFile = row.sourcePath.split(/[\\/]/u).pop();
  return !sourceText.includes(sourceFile) || !sourceText.includes(row.sourceLabel);
});
assert(missingActionConsumer.length === 0, 'visit runtime missing source file or label used by coverage', missingActionConsumer.slice(0, 20));

const summary = coverage.summary ?? {};
assert(Number(summary.ownedRowRefs) === expectedRefs.size, 'summary owned row count mismatch', summary);
assert(Number(summary.rows) === coverage.rows.length, 'summary row count mismatch', summary);
assert(Number(summary.implemented) + Number(summary.mapped) === expectedRefs.size, 'implemented + mapped must close M36 scope', summary);
assert(Number(summary.ownedBlocker) === 0, 'M36 must not close with owned blockers', summary);
assert(Number(summary.missingEvidence) === 0, 'M36 must not close with missing evidence', summary);
assert(Number(summary.missingConsumer) === 0, 'M36 must not close with missing consumer', summary);
assert(Number(summary.missingVerification) === 0, 'M36 must not close with missing verification', summary);

console.log(
  `gate:visit-facility passed: ${coverage.rows.length} M36 row(s), implemented=${summary.implemented}, mapped=${summary.mapped}.`,
);
