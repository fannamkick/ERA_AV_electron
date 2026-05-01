import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));
}

function fail(message, detail) {
  console.error(`gate:body-stat-mapping failed: ${message}`);
  if (detail) console.error(JSON.stringify(detail, null, 2));
  process.exit(1);
}

function assert(condition, message, detail) {
  if (!condition) fail(message, detail);
}

const queue = readJson('data/coverage/implementation-queue.json');
const definitions = readJson('data/coverage/definitions.json');
const saveMapping = readJson('data/coverage/save-mapping.json');
const coverage = readJson('data/coverage/body-stat-coverage.json');
const gapAudit = readJson('data/coverage/audits/M33-gap-audit.json');

assert(coverage.schemaVersion === 'body-stat-coverage/v1', 'invalid schema version');
assert(coverage.milestone === 'M33', 'coverage milestone must be M33');
assert(Array.isArray(coverage.rows), 'coverage rows missing');
assert(Array.isArray(coverage.unresolvedIssues), 'unresolvedIssues missing');
assert(gapAudit.schemaVersion === 'milestone-gap-audit/v1', 'invalid M33 gap audit schema version');
assert(gapAudit.milestone === 'M33', 'M33 gap audit milestone mismatch');

const expectedRefs = new Set();
for (const unit of (queue.queueUnits ?? []).filter((item) => item.ownerMilestone === 'M33')) {
  for (const ref of unit.rowRefs ?? []) expectedRefs.add(ref);
}
for (const row of (definitions.rows ?? []).filter((item) => item.definitionKey === 'trainingParams')) {
  expectedRefs.add(`definition:${row.definitionRowId}`);
}

const accountedRefs = new Map();
for (const row of coverage.rows) {
  assert(row.reviewId, 'coverage row missing reviewId', row);
  accountedRefs.set(row.reviewId, (accountedRefs.get(row.reviewId) ?? 0) + 1);
}

const missingRefs = [...expectedRefs].filter((ref) => !accountedRefs.has(ref)).sort();
const extraRefs = [...accountedRefs.keys()].filter((ref) => !expectedRefs.has(ref)).sort();
const duplicateRefs = [...accountedRefs.entries()].filter(([, count]) => count !== 1);
assert(missingRefs.length === 0, 'M33 owned refs missing from body stat coverage', missingRefs.slice(0, 50));
assert(extraRefs.length === 0, 'body stat coverage includes refs outside M33 owned scope', extraRefs.slice(0, 50));
assert(duplicateRefs.length === 0, 'body stat coverage refs are duplicated', duplicateRefs.slice(0, 50));
assert(coverage.rows.length === expectedRefs.size, 'coverage row count must match M33 owned scope', coverage.summary);
assert(coverage.unresolvedIssues.length === 0, 'M33 coverage has unresolved issues', coverage.unresolvedIssues);
assert(Number(gapAudit.summary?.unresolvedGaps ?? -1) === 0, 'M33 gap audit has unresolved gaps', gapAudit.summary);

const badClosedRows = coverage.rows.filter(
  (row) => !row.sourceEvidenceId || !row.runtimeConsumerId || !row.verificationId || !row.completionStatus,
);
assert(badClosedRows.length === 0, 'closed rows missing evidence, consumer, or verification', badClosedRows.slice(0, 20));

const badTransfers = coverage.rows.filter(
  (row) =>
    row.completionStatus === 'transferred-out' &&
    (!row.fromMilestone || !row.toMilestone || !row.transferReason || !row.sourceEvidenceId || !row.acceptedByOwner),
);
assert(badTransfers.length === 0, 'transferred rows missing required transfer evidence', badTransfers.slice(0, 20));

const statuses = new Set(coverage.rows.map((row) => row.completionStatus));
for (const status of [
  'implemented-character-base-seed',
  'implemented-character-ability-seed',
  'implemented-character-trait-seed',
  'implemented-character-experience-seed',
  'mapped-consumed-base-stat-definition',
  'mapped-consumed-ability-definition',
  'mapped-consumed-trait-definition',
  'mapped-consumed-experience-definition',
  'mapped-consumed-mark-definition',
  'mapped-consumed-training-param-definition',
  'mapped-consumed-body-base-save-field',
  'mapped-consumed-experience-save-field',
  'mapped-consumed-body-mark-save-field',
  'transferred-out',
]) {
  assert(statuses.has(status), `required M33 completion status missing: ${status}`, coverage.summary);
}

const definitionRows = coverage.rows.filter((row) => row.rowKind === 'definition');
const byDefinitionKey = Object.fromEntries(
  ['baseStats', 'abilities', 'talents', 'experiences', 'marks', 'trainingParams'].map((key) => [
    key,
    definitionRows.filter((row) => row.definitionKey === key).length,
  ]),
);
assert(byDefinitionKey.baseStats === 23, 'M33 must account all 23 BASE display definitions', byDefinitionKey);
assert(byDefinitionKey.abilities === 34, 'M33 must account all 34 ABL display definitions', byDefinitionKey);
assert(byDefinitionKey.talents === 261, 'M33 must account all 261 TALENT definitions', byDefinitionKey);
assert(byDefinitionKey.experiences === 82, 'M33 must account all 82 EXP definitions', byDefinitionKey);
assert(byDefinitionKey.marks === 4, 'M33 must account all 4 MARK definitions', byDefinitionKey);
assert(byDefinitionKey.trainingParams === 17, 'M33 must account all 17 PALAM definitions', byDefinitionKey);

const bySeedFamily = Object.fromEntries(
  ['BASE', 'ABL', 'TALENT', 'EXP'].map((family) => [
    family,
    definitionRows.filter((row) => row.seedFamily === family).length,
  ]),
);
assert(bySeedFamily.BASE === 1408, 'M33 must account all Chara BASE seed rows', bySeedFamily);
assert(bySeedFamily.ABL === 660, 'M33 must account all Chara ABL seed rows', bySeedFamily);
assert(bySeedFamily.TALENT === 2435, 'M33 must account all Chara TALENT seed rows', bySeedFamily);
assert(bySeedFamily.EXP === 265, 'M33 must account all Chara EXP seed rows', bySeedFamily);

const expectedSaveRefs = new Set(
  (saveMapping.rows ?? [])
    .filter((row) => ['BASE', 'MAXBASE', 'EXP', 'MARK', 'CFLAG', 'FLAG', 'PBAND'].includes(row.family))
    .filter((row) => expectedRefs.has(`save-mapping:${row.mappingRowId}`))
    .map((row) => `save-mapping:${row.mappingRowId}`),
);
const saveRows = coverage.rows.filter((row) => row.rowKind === 'save-mapping');
assert(saveRows.length === expectedSaveRefs.size, 'M33 save-mapping row count mismatch', {
  coverage: saveRows.length,
  expected: expectedSaveRefs.size,
});

const transferredFamilies = new Set(
  saveRows.filter((row) => row.completionStatus === 'transferred-out').map((row) => row.family),
);
for (const family of ['CFLAG', 'FLAG', 'PBAND']) {
  assert(transferredFamilies.has(family), `M33 must transfer ${family} rows to M34`, coverage.summary);
}

const summary = coverage.summary ?? {};
assert(Number(summary.ownedRowRefs) === expectedRefs.size, 'summary owned row count mismatch', summary);
assert(Number(summary.rows) === coverage.rows.length, 'summary rows count mismatch', summary);
assert(Number(summary.ownedBlocker) === 0, 'M33 must not close with owned blockers', summary);
assert(
  Number(summary.implemented) + Number(summary.mapped) + Number(summary.transferredOut) === expectedRefs.size,
  'summary implemented + mapped + transferredOut must close all rows',
  summary,
);

console.log(
  `gate:body-stat-mapping passed: ${coverage.rows.length} M33 row(s), implemented=${summary.implemented}, mapped=${summary.mapped}, transferred=${summary.transferredOut}.`,
);
