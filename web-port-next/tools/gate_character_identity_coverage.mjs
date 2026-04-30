import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));
}

function fail(message, detail) {
  console.error(`gate:character-identity failed: ${message}`);
  if (detail) console.error(JSON.stringify(detail, null, 2));
  process.exit(1);
}

function assert(condition, message, detail) {
  if (!condition) fail(message, detail);
}

const queue = readJson('data/coverage/implementation-queue.json');
const recruitCoverage = readJson('data/coverage/recruit-coverage.json');
const coverage = readJson('data/coverage/character-identity-coverage.json');
const gapAudit = readJson('data/coverage/audits/M32-gap-audit.json');

assert(coverage.schemaVersion === 'character-identity-coverage/v1', 'invalid schema version');
assert(coverage.milestone === 'M32', 'coverage milestone must be M32');
assert(Array.isArray(coverage.rows), 'coverage rows missing');
assert(Array.isArray(coverage.unresolvedIssues), 'unresolvedIssues missing');
assert(gapAudit.schemaVersion === 'milestone-gap-audit/v1', 'invalid M32 gap audit schema version');
assert(gapAudit.milestone === 'M32', 'M32 gap audit milestone mismatch');

const expectedRefs = new Set();
for (const unit of (queue.queueUnits ?? []).filter((item) => item.ownerMilestone === 'M32')) {
  for (const ref of unit.rowRefs ?? []) expectedRefs.add(ref);
}
for (const row of (recruitCoverage.rows ?? []).filter((item) => item.toMilestone === 'M32')) {
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
assert(missingRefs.length === 0, 'M32 owned refs missing from character identity coverage', missingRefs.slice(0, 50));
assert(extraRefs.length === 0, 'character identity coverage includes refs outside M32 owned scope', extraRefs.slice(0, 50));
assert(duplicateRefs.length === 0, 'character identity coverage refs are duplicated', duplicateRefs.slice(0, 50));
assert(coverage.rows.length === expectedRefs.size, 'coverage row count must match M32 owned scope', coverage.summary);
assert(coverage.unresolvedIssues.length === 0, 'M32 coverage has unresolved issues', coverage.unresolvedIssues);
assert(Number(gapAudit.summary?.unresolvedGaps ?? -1) === 0, 'M32 gap audit has unresolved gaps', gapAudit.summary);

const badClosedRows = coverage.rows.filter(
  (row) => !row.sourceEvidenceId || !row.runtimeConsumerId || !row.verificationId || !row.completionStatus,
);
assert(badClosedRows.length === 0, 'closed rows missing evidence, consumer, or verification', badClosedRows.slice(0, 20));

const statuses = new Set(coverage.rows.map((row) => row.completionStatus));
for (const status of [
  'implemented-character-template-identity',
  'implemented-character-profile-text-slot',
  'implemented-profile-text-save-field',
  'implemented-character-lifecycle-contract',
  'mapped-consumed-character-text-definition',
  'mapped-consumed-source-contract',
]) {
  assert(statuses.has(status), `required M32 completion status missing: ${status}`, coverage.summary);
}

const definitionRows = coverage.rows.filter((row) => row.rowKind === 'definition');
const characterTemplates = definitionRows.filter((row) => row.completionStatus === 'implemented-character-template-identity');
const cstrSeedRows = definitionRows.filter((row) => row.completionStatus === 'implemented-character-profile-text-slot');
const cstrDefinitions = definitionRows.filter((row) => row.completionStatus === 'mapped-consumed-character-text-definition');
assert(characterTemplates.length === 109, 'M32 must account all 109 character templates', {
  actual: characterTemplates.length,
});
assert(cstrSeedRows.length === 157, 'M32 must account all character CSTR seed rows', {
  actual: cstrSeedRows.length,
});
assert(cstrDefinitions.length === 5, 'M32 must account all CSTR definition rows', {
  actual: cstrDefinitions.length,
});

const sourceReviewRows = coverage.rows.filter((row) => row.rowKind === 'source-file-review');
assert(sourceReviewRows.length === 3, 'M32 must account all identity source review files', sourceReviewRows);
for (const requiredPath of ['ZNAME.ERB', 'C_CLUB_GIRLNAME.ERB', 'BOYFRIENDNAME_CALC.ERB']) {
  assert(
    sourceReviewRows.some((row) => String(row.sourcePath).includes(requiredPath)),
    `required source review missing: ${requiredPath}`,
    sourceReviewRows,
  );
}

const inheritedRows = coverage.rows.filter((row) => row.inheritedFromMilestone === 'M31');
assert(inheritedRows.length === (recruitCoverage.rows ?? []).filter((item) => item.toMilestone === 'M32').length, 'M31 transfer count mismatch', {
  inherited: inheritedRows.length,
});

const summary = coverage.summary ?? {};
assert(Number(summary.ownedRowRefs) === expectedRefs.size, 'summary owned row count mismatch', summary);
assert(Number(summary.rows) === coverage.rows.length, 'summary rows count mismatch', summary);
assert(Number(summary.ownedBlocker) === 0, 'M32 must not close with owned blockers', summary);
assert(
  Number(summary.implemented) + Number(summary.mapped) + Number(summary.transferredOut) === expectedRefs.size,
  'summary implemented + mapped + transferredOut must close all rows',
  summary,
);

console.log(
  `gate:character-identity passed: ${coverage.rows.length} M32 row(s), implemented=${summary.implemented}, mapped=${summary.mapped}.`,
);
