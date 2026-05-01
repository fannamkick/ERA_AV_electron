import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));
}

function fail(message, detail) {
  console.error(`gate:filming-execution failed: ${message}`);
  if (detail) console.error(JSON.stringify(detail, null, 2));
  process.exit(1);
}

function assert(condition, message, detail) {
  if (!condition) fail(message, detail);
}

function terminalPathSegment(fieldPath) {
  const parts = String(fieldPath).split('.');
  return parts[parts.length - 1] ?? '';
}

const queue = readJson('data/coverage/implementation-queue.json');
const coverage = readJson('data/coverage/filming-execution-coverage.json');
const gapAudit = readJson('data/coverage/audits/M39-gap-audit.json');
const shootingText = fs.readFileSync(path.join(root, 'src/features/shooting.ts'), 'utf8');
const workTypesText = fs.readFileSync(path.join(root, 'src/domains/work/types.ts'), 'utf8');
const economyTypesText = fs.readFileSync(path.join(root, 'src/domains/economy/types.ts'), 'utf8');
const shootingSessionText = fs.readFileSync(path.join(root, 'src/domains/shootingSession/types.ts'), 'utf8');
const sourceGroupText = fs.readFileSync(path.join(root, 'src/catalog/filmingExecutionSourceGroups.ts'), 'utf8');
const runtimeText = [shootingText, workTypesText, economyTypesText, shootingSessionText].join('\n');

assert(coverage.schemaVersion === 'filming-execution-coverage/v1', 'invalid schema version');
assert(coverage.milestone === 'M39', 'coverage milestone must be M39');
assert(Array.isArray(coverage.rows), 'coverage rows missing');
assert(Array.isArray(coverage.unresolvedIssues), 'unresolvedIssues missing');
assert(gapAudit.schemaVersion === 'milestone-gap-audit/v1', 'invalid M39 gap audit schema version');
assert(gapAudit.milestone === 'M39', 'M39 gap audit milestone mismatch');

const expectedRefs = new Set();
for (const unit of (queue.queueUnits ?? []).filter((unit) => unit.ownerMilestone === 'M39')) {
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
assert(missingRefs.length === 0, 'M39 owned refs missing from filming execution coverage', missingRefs.slice(0, 50));
assert(extraRefs.length === 0, 'filming execution coverage includes refs outside M39 owned scope', extraRefs.slice(0, 50));
assert(duplicateRefs.length === 0, 'filming execution coverage refs are duplicated', duplicateRefs.slice(0, 50));
assert(coverage.rows.length === expectedRefs.size, 'coverage row count must match M39 owned scope', coverage.summary);
assert(coverage.unresolvedIssues.length === 0, 'M39 coverage has unresolved issues', coverage.unresolvedIssues);
assert(Number(gapAudit.summary?.unresolvedGaps ?? -1) === 0, 'M39 gap audit has unresolved gaps', gapAudit.summary);

const badClosedRows = coverage.rows.filter(
  (row) => !row.sourceEvidenceId || !row.runtimeConsumerId || !row.verificationId || !row.completionStatus,
);
assert(badClosedRows.length === 0, 'closed rows missing evidence, consumer, or verification', badClosedRows.slice(0, 20));

const featureRows = coverage.rows.filter((row) => row.rowKind === 'feature');
const saveRows = coverage.rows.filter((row) => row.rowKind === 'save-mapping');
const sessionRows = coverage.rows.filter((row) => row.rowKind === 'session-mapping');
const sourceReviewRows = coverage.rows.filter((row) => row.rowKind === 'source-file-review');
assert(featureRows.length === 135, 'M39 must account 135 filming execution feature rows', coverage.summary);
assert(saveRows.length === 16, 'M39 must account 16 filming save mapping rows', coverage.summary);
assert(sessionRows.length === 21, 'M39 must account 21 filming session/calculation mapping rows', coverage.summary);
assert(sourceReviewRows.length === 2, 'M39 must account two filming source-file-review rows', coverage.summary);

for (const requiredText of [
  'filmingExecutionSourceGroups',
  'filmingExecutionSourceLabelCount',
  'calculateShootingResult',
  'applyShootingResult',
  'confirmShootingScene',
  'endTurn',
  'videoSalesTotal',
  'filmingProgressFlags',
  'filmingByCharacterId',
  'careerFlagsByCharacterId',
  'sceneTemporaryValues',
  'sceneFlags',
  'buildSceneTemporaryValues',
  'buildSceneFlags',
  'buildFilmingProgressFlags',
  'initialShootingSessionState',
]) {
  assert(
    runtimeText.includes(requiredText) || sourceGroupText.includes(requiredText),
    `filming execution runtime missing required consumer: ${requiredText}`,
  );
}

const featureLabelsMissingFromSourceGroups = featureRows.filter((row) => !sourceGroupText.includes(row.sourceLabel));
assert(
  featureLabelsMissingFromSourceGroups.length === 0,
  'filming source groups missing feature source labels',
  featureLabelsMissingFromSourceGroups.slice(0, 20),
);

const featureFilesMissingFromSourceGroups = featureRows.filter((row) => !sourceGroupText.includes(row.sourceFile));
assert(
  featureFilesMissingFromSourceGroups.length === 0,
  'filming source groups missing feature source files',
  featureFilesMissingFromSourceGroups.slice(0, 20),
);

const saveRowsWithoutAppPath = saveRows.filter((row) => !row.fieldPath || !row.appFieldPath || !row.runtimeConsumerId.includes(row.appFieldPath));
assert(saveRowsWithoutAppPath.length === 0, 'filming save rows missing mapped app field path consumers', saveRowsWithoutAppPath.slice(0, 20));

const saveRowsMissingRuntime = saveRows.filter((row) => {
  const terminal = terminalPathSegment(row.appFieldPath);
  return terminal.length > 0 && !runtimeText.includes(terminal);
});
assert(saveRowsMissingRuntime.length === 0, 'filming save app fields are not consumed by runtime code', saveRowsMissingRuntime.slice(0, 20));

const sessionRowsWithoutLifecycle = sessionRows.filter((row) => !row.appSessionFieldPath && !row.calculationOwner);
assert(sessionRowsWithoutLifecycle.length === 0, 'filming session rows missing session field or calculation owner', sessionRowsWithoutLifecycle.slice(0, 20));

const sessionRowsMissingRuntime = sessionRows.filter((row) => {
  if (row.appSessionFieldPath) {
    const terminal = terminalPathSegment(row.appSessionFieldPath);
    return terminal.length > 0 && !runtimeText.includes(terminal);
  }
  return row.calculationOwner && !runtimeText.includes('calculateShootingResult');
});
assert(sessionRowsMissingRuntime.length === 0, 'filming session/calculation rows are not consumed by runtime code', sessionRowsMissingRuntime.slice(0, 20));

const badSessionSaveBoundaryRows = sessionRows.filter((row) => String(row.appSessionFieldPath ?? '').startsWith('state.'));
assert(badSessionSaveBoundaryRows.length === 0, 'filming session rows must not map into save state', badSessionSaveBoundaryRows);

const sourceReviewMissingConsumer = sourceReviewRows.filter(
  (row) => !row.sourceEvidenceId || !row.sourcePath || !row.sourceSha256 || !row.runtimeConsumerId || !row.verificationId,
);
assert(sourceReviewMissingConsumer.length === 0, 'filming source review rows missing manifest evidence or consumer', sourceReviewMissingConsumer);

const summary = coverage.summary ?? {};
assert(Number(summary.ownedRowRefs) === expectedRefs.size, 'summary owned row count mismatch', summary);
assert(Number(summary.rows) === coverage.rows.length, 'summary row count mismatch', summary);
assert(Number(summary.implemented) + Number(summary.mapped) === expectedRefs.size, 'implemented + mapped must close M39 scope', summary);
assert(Number(summary.ownedBlocker) === 0, 'M39 must not close with owned blockers', summary);
assert(Number(summary.missingEvidence) === 0, 'M39 must not close with missing evidence', summary);
assert(Number(summary.missingConsumer) === 0, 'M39 must not close with missing consumer', summary);
assert(Number(summary.missingVerification) === 0, 'M39 must not close with missing verification', summary);

console.log(`gate:filming-execution passed: ${coverage.rows.length} M39 row(s), implemented=${summary.implemented}, mapped=${summary.mapped}.`);
