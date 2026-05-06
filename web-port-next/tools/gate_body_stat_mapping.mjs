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
const recruitCoverage = readJson('data/coverage/recruit-coverage.json');
const characterIdentityCoverage = readJson('data/coverage/character-identity-coverage.json');
const coverage = readJson('data/coverage/body-stat-coverage.json');
const gapAudit = readJson('data/coverage/audits/M33-gap-audit.json');
const sourceManifest = readJson('data/coverage/manifests/M33-source-units.json');

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
for (const row of (recruitCoverage.rows ?? []).filter((item) => item.toMilestone === 'M33')) {
  expectedRefs.add(row.reviewId);
}
for (const row of (characterIdentityCoverage.rows ?? []).filter((item) => item.toMilestone === 'M33')) {
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
assert(missingRefs.length === 0, 'M33 owned refs missing from body stat coverage', missingRefs.slice(0, 50));
assert(extraRefs.length === 0, 'body stat coverage includes refs outside M33 owned scope', extraRefs.slice(0, 50));
assert(duplicateRefs.length === 0, 'body stat coverage refs are duplicated', duplicateRefs.slice(0, 50));
assert(coverage.rows.length === expectedRefs.size, 'coverage row count must match M33 owned scope', coverage.summary);
assert(coverage.unresolvedIssues.length === 0, 'M33 coverage has unresolved issues', coverage.unresolvedIssues);
assert(Number(gapAudit.summary?.unresolvedGaps ?? -1) === 0, 'M33 gap audit has unresolved gaps', gapAudit.summary);

const implementedRows = coverage.rows.filter((row) => row.completionStatus.startsWith('implemented'));
const approvedExcludedRows = coverage.rows.filter((row) => row.completionStatus === 'approved-excluded');
const mappedRows = coverage.rows.filter((row) => row.completionStatus.startsWith('mapped-consumed'));
const transferredRows = coverage.rows.filter((row) => row.completionStatus === 'transferred-out');

const badClosedRows = implementedRows.filter(
  (row) => !row.sourceEvidenceId || !row.runtimeConsumerId || !row.verificationId || !row.completionStatus,
);
assert(badClosedRows.length === 0, 'closed rows missing evidence, consumer, or verification', badClosedRows.slice(0, 20));

const badApprovedExclusions = approvedExcludedRows.filter(
  (row) =>
    !row.fromMilestone ||
    !row.toMilestone ||
    !row.approvedExclusionReason ||
    !row.sourceEvidenceId ||
    row.acceptedByOwner !== true,
);
assert(
  badApprovedExclusions.length === 0,
  'approved-excluded rows require source, receiver owner, reason, and receiver acceptance',
  badApprovedExclusions.slice(0, 20),
);
assert(mappedRows.length === 0, 'mapped-consumed rows are not strict M33 completion states', mappedRows.slice(0, 20));
assert(transferredRows.length === 0, 'transferred-out rows are not strict M33 completion states', transferredRows.slice(0, 20));

const statuses = new Set(coverage.rows.map((row) => row.completionStatus));
for (const status of [
  'implemented-character-base-seed',
  'implemented-character-ability-seed',
  'implemented-character-trait-seed',
  'implemented-character-experience-seed',
  'implemented-base-stat-definition-display',
  'implemented-ability-definition-display',
  'implemented-trait-definition-display',
  'implemented-experience-definition-display',
  'implemented-mark-definition-display',
  'implemented-training-param-definition-display',
  'implemented-body-base-save-field',
  'implemented-ability-save-field',
  'implemented-trait-save-field',
  'implemented-experience-save-field',
  'implemented-body-mark-save-field',
  'approved-excluded',
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
    .filter((row) => ['BASE', 'MAXBASE', 'ABL', 'TALENT', 'EXP', 'MARK', 'CFLAG', 'FLAG', 'PBAND'].includes(row.family))
    .filter((row) => expectedRefs.has(`save-mapping:${row.mappingRowId}`))
    .map((row) => `save-mapping:${row.mappingRowId}`),
);
const saveRows = coverage.rows.filter((row) => row.rowKind === 'save-mapping');
assert(saveRows.length === expectedSaveRefs.size, 'M33 save-mapping row count mismatch', {
  coverage: saveRows.length,
  expected: expectedSaveRefs.size,
});

const approvedExcludedFamilies = new Set(
  saveRows.filter((row) => row.completionStatus === 'approved-excluded').map((row) => row.family),
);
for (const family of ['CFLAG', 'FLAG', 'PBAND']) {
  assert(approvedExcludedFamilies.has(family), `M33 must approve-exclude ${family} rows to M34`, coverage.summary);
}

const summary = coverage.summary ?? {};
assert(Number(summary.ownedRowRefs) === expectedRefs.size, 'summary owned row count mismatch', summary);
assert(Number(summary.rows) === coverage.rows.length, 'summary rows count mismatch', summary);
assert(Number(summary.ownedBlocker) === 0, 'M33 must not close with owned blockers', summary);
assert(Number(summary.mapped) === 0, 'summary mapped must be zero under strict M33 closure', summary);
assert(Number(summary.transferredOut) === 0, 'summary transferredOut must be zero under strict M33 closure', summary);
assert(Number(summary.implementedVerifiedForStrictClosure) === implementedRows.length, 'summary implemented strict count mismatch', summary);
assert(Number(summary.approvedExcludedFromM33) === approvedExcludedRows.length, 'summary approved exclusion count mismatch', summary);
assert(
  Number(summary.implementedVerifiedForStrictClosure) + Number(summary.approvedExcludedFromM33) === expectedRefs.size,
  'summary implemented-verified + approved-excluded must close all M33 source units',
  summary,
);

assert(sourceManifest.schemaVersion === 'source-unit-manifest/v1', 'invalid M33 source-unit manifest schema');
assert(sourceManifest.milestone === 'M33', 'M33 source-unit manifest milestone mismatch');
assert(sourceManifest.summary?.completedAllowedNow === true, 'M33 source-unit manifest must be completable', sourceManifest.summary);
const manifestUnits = sourceManifest.units ?? [];
assert(manifestUnits.length === expectedRefs.size, 'M33 source-unit manifest unit count mismatch', sourceManifest.summary);
const forbiddenManifestUnits = manifestUnits.filter((unit) => !['implemented-verified', 'approved-excluded'].includes(unit.manifestStatus));
assert(forbiddenManifestUnits.length === 0, 'M33 source-unit manifest has non-completion statuses', forbiddenManifestUnits.slice(0, 20));
assert(
  manifestUnits.filter((unit) => unit.manifestStatus === 'implemented-verified').length === implementedRows.length,
  'M33 source-unit manifest implemented count mismatch',
  sourceManifest.summary,
);
assert(
  manifestUnits.filter((unit) => unit.manifestStatus === 'approved-excluded').length === approvedExcludedRows.length,
  'M33 source-unit manifest approved exclusion count mismatch',
  sourceManifest.summary,
);

console.log(
  `gate:body-stat-mapping passed: ${coverage.rows.length} M33 source row(s), implemented-verified=${summary.implementedVerifiedForStrictClosure}, approved-excluded=${summary.approvedExcludedFromM33}.`,
);
