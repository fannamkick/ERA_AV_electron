import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));
}

function fail(message, detail) {
  console.error(`gate:filming-scene failed: ${message}`);
  if (detail) console.error(JSON.stringify(detail, null, 2));
  process.exit(1);
}

function assert(condition, message, detail) {
  if (!condition) fail(message, detail);
}

const queue = readJson('data/coverage/implementation-queue.json');
const coverage = readJson('data/coverage/filming-scene-coverage.json');
const gapAudit = readJson('data/coverage/audits/M38-gap-audit.json');
const erbDefinitions = readJson('data/coverage/erb-derived-definitions.json');
const legacyCatalogText = fs.readFileSync(path.join(root, 'src/catalog/legacyCatalog.ts'), 'utf8');
const shootingText = fs.readFileSync(path.join(root, 'src/features/shooting.ts'), 'utf8');

assert(coverage.schemaVersion === 'filming-scene-coverage/v1', 'invalid schema version');
assert(coverage.milestone === 'M38', 'coverage milestone must be M38');
assert(Array.isArray(coverage.rows), 'coverage rows missing');
assert(Array.isArray(coverage.unresolvedIssues), 'unresolvedIssues missing');
assert(gapAudit.schemaVersion === 'milestone-gap-audit/v1', 'invalid M38 gap audit schema version');
assert(gapAudit.milestone === 'M38', 'M38 gap audit milestone mismatch');

const expectedRefs = new Set();
for (const unit of (queue.queueUnits ?? []).filter((unit) => unit.ownerMilestone === 'M38')) {
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
assert(missingRefs.length === 0, 'M38 owned refs missing from filming scene coverage', missingRefs);
assert(extraRefs.length === 0, 'filming scene coverage includes refs outside M38 owned scope', extraRefs);
assert(duplicateRefs.length === 0, 'filming scene coverage refs are duplicated', duplicateRefs);
assert(coverage.rows.length === expectedRefs.size, 'coverage row count must match M38 owned scope', coverage.summary);
assert(coverage.unresolvedIssues.length === 0, 'M38 coverage has unresolved issues', coverage.unresolvedIssues);
assert(Number(gapAudit.summary?.unresolvedGaps ?? -1) === 0, 'M38 gap audit has unresolved gaps', gapAudit.summary);

const badClosedRows = coverage.rows.filter(
  (row) => !row.sourceEvidenceId || !row.runtimeConsumerId || !row.verificationId || !row.completionStatus,
);
assert(badClosedRows.length === 0, 'closed rows missing evidence, consumer, or verification', badClosedRows);

const definitionRows = coverage.rows.filter((row) => row.rowKind === 'definition');
assert(definitionRows.length === 6, 'M38 must account six ERB-derived filming scene definition rows', coverage.summary);
assert(Number(coverage.summary?.mapped ?? -1) === 6, 'M38 rows must be mapped-consumed definitions', coverage.summary);

for (const requiredText of [
  'createErbFilmingSceneDefinitions',
  'filmingSceneDefinitions',
  'computeVisibleFilmingSceneIds',
  'computeVisibleShootingCharacterIds',
  'buildShootingView',
  'selectShootingTarget',
  'selectShootingScene',
  'cancelShootingSelection',
]) {
  assert(legacyCatalogText.includes(requiredText) || shootingText.includes(requiredText), `filming scene runtime missing required consumer: ${requiredText}`);
}

const erbRows = new Map(
  (erbDefinitions.rows ?? [])
    .filter((row) => row.definitionKey === 'filmingSceneDefinitions')
    .map((row) => [row.sourceId, row]),
);
for (const row of definitionRows) {
  const erbRow = erbRows.get(row.sourceId);
  assert(erbRow, `ERB-derived definitions missing filming scene id: ${row.sourceId}`);
  assert(erbRow.sourceName === row.sourceName, `ERB-derived scene name mismatch: ${row.sourceId}`, {
    expected: row.sourceName,
    actual: erbRow.sourceName,
  });
  assert(erbRow.sourceFile === row.sourcePath, `ERB-derived scene source path mismatch: ${row.sourceId}`, {
    expected: row.sourcePath,
    actual: erbRow.sourceFile,
  });
}

const summary = coverage.summary ?? {};
assert(Number(summary.ownedRowRefs) === expectedRefs.size, 'summary owned row count mismatch', summary);
assert(Number(summary.rows) === coverage.rows.length, 'summary row count mismatch', summary);
assert(Number(summary.implemented) + Number(summary.mapped) === expectedRefs.size, 'implemented + mapped must close M38 scope', summary);
assert(Number(summary.ownedBlocker) === 0, 'M38 must not close with owned blockers', summary);
assert(Number(summary.missingEvidence) === 0, 'M38 must not close with missing evidence', summary);
assert(Number(summary.missingConsumer) === 0, 'M38 must not close with missing consumer', summary);
assert(Number(summary.missingVerification) === 0, 'M38 must not close with missing verification', summary);

console.log(`gate:filming-scene passed: ${coverage.rows.length} M38 row(s), mapped=${summary.mapped}.`);
