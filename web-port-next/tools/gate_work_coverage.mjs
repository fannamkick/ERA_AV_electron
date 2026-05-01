import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));
}

function fail(message, detail) {
  console.error(`gate:work-coverage failed: ${message}`);
  if (detail) console.error(JSON.stringify(detail, null, 2));
  process.exit(1);
}

function assert(condition, message, detail) {
  if (!condition) fail(message, detail);
}

const queue = readJson('data/coverage/implementation-queue.json');
const coverage = readJson('data/coverage/work-coverage.json');
const gapAudit = readJson('data/coverage/audits/M37-gap-audit.json');
const legacyCatalogText = fs.readFileSync(path.join(root, 'src/catalog/legacyCatalog.ts'), 'utf8');
const sourceGroupText = fs.readFileSync(path.join(root, 'src/catalog/workSourceGroups.ts'), 'utf8');
const workRuntimeText = fs.readFileSync(path.join(root, 'src/features/work.ts'), 'utf8');

assert(coverage.schemaVersion === 'work-coverage/v1', 'invalid schema version');
assert(coverage.milestone === 'M37', 'coverage milestone must be M37');
assert(Array.isArray(coverage.rows), 'coverage rows missing');
assert(Array.isArray(coverage.unresolvedIssues), 'unresolvedIssues missing');
assert(gapAudit.schemaVersion === 'milestone-gap-audit/v1', 'invalid M37 gap audit schema version');
assert(gapAudit.milestone === 'M37', 'M37 gap audit milestone mismatch');

const expectedRefs = new Set();
for (const unit of (queue.queueUnits ?? []).filter((unit) => unit.ownerMilestone === 'M37')) {
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
assert(missingRefs.length === 0, 'M37 owned refs missing from work coverage', missingRefs.slice(0, 50));
assert(extraRefs.length === 0, 'work coverage includes refs outside M37 owned scope', extraRefs.slice(0, 50));
assert(duplicateRefs.length === 0, 'work coverage refs are duplicated', duplicateRefs.slice(0, 50));
assert(coverage.rows.length === expectedRefs.size, 'coverage row count must match M37 owned scope', coverage.summary);
assert(coverage.unresolvedIssues.length === 0, 'M37 coverage has unresolved issues', coverage.unresolvedIssues);
assert(Number(gapAudit.summary?.unresolvedGaps ?? -1) === 0, 'M37 gap audit has unresolved gaps', gapAudit.summary);

const badClosedRows = coverage.rows.filter(
  (row) => !row.sourceEvidenceId || !row.runtimeConsumerId || !row.verificationId || !row.completionStatus,
);
assert(badClosedRows.length === 0, 'closed rows missing evidence, consumer, or verification', badClosedRows.slice(0, 20));

const definitionRows = coverage.rows.filter((row) => row.rowKind === 'definition');
const featureRows = coverage.rows.filter((row) => row.rowKind === 'feature');
const saveRows = coverage.rows.filter((row) => row.rowKind === 'save-mapping');
const sessionRows = coverage.rows.filter((row) => row.rowKind === 'session-mapping');
assert(definitionRows.length === 8, 'M37 must account eight ERB-derived work definition rows', coverage.summary);
assert(featureRows.length === 286, 'M37 must account 286 work feature rows', coverage.summary);
assert(saveRows.length === 161, 'M37 must account 161 work save mapping rows', coverage.summary);
assert(sessionRows.length === 6, 'M37 must account six work session/calculation mapping rows', coverage.summary);
assert(Number(coverage.summary?.uniqueWorkDefinitions ?? 0) === 72, 'M37 must expose 72 source-label work definitions', coverage.summary);

for (const requiredText of [
  'createErbWorkDefinitions',
  'createSourceLabelWorkDefinitions',
  'workSourceGroups',
  'workSourceDefinitionId',
  'computeVisibleWorkIds',
  'buildWorkView',
  'selectWork',
  'selectWorkCharacter',
  'calculateWorkResult',
  'applyWorkResult',
  'executeSelectedWork',
  'cancelWork',
  'endTurn',
  'careerFlagsByCharacterId',
  'assignments',
]) {
  assert(
    legacyCatalogText.includes(requiredText) || sourceGroupText.includes(requiredText) || workRuntimeText.includes(requiredText),
    `work runtime missing required consumer: ${requiredText}`,
  );
}

for (const sourceFile of new Set(featureRows.map((row) => row.sourceFile))) {
  assert(sourceGroupText.includes(sourceFile), `work source groups missing source file: ${sourceFile}`);
}

const missingSourceLabels = featureRows.filter((row) => !sourceGroupText.includes(row.sourceLabel));
assert(missingSourceLabels.length === 0, 'work source groups missing feature source labels', missingSourceLabels.slice(0, 20));

const missingRuntimeDefinitions = featureRows.filter((row) => !row.workDefinitionId || !row.runtimeConsumerId.includes(row.workDefinitionId));
assert(missingRuntimeDefinitions.length === 0, 'work feature rows missing runtime work definition ids', missingRuntimeDefinitions.slice(0, 20));

const saveWithoutFieldPath = saveRows.filter((row) => !row.fieldPath || !row.runtimeConsumerId.includes(row.fieldPath));
assert(saveWithoutFieldPath.length === 0, 'work save rows missing mapped field path consumers', saveWithoutFieldPath.slice(0, 20));

const sessionWithoutLifecycle = sessionRows.filter((row) => !row.sessionFieldPath && !row.calculationOwner);
assert(sessionWithoutLifecycle.length === 0, 'work session rows missing session field or calculation owner', sessionWithoutLifecycle.slice(0, 20));

const summary = coverage.summary ?? {};
assert(Number(summary.ownedRowRefs) === expectedRefs.size, 'summary owned row count mismatch', summary);
assert(Number(summary.rows) === coverage.rows.length, 'summary row count mismatch', summary);
assert(Number(summary.implemented) + Number(summary.mapped) === expectedRefs.size, 'implemented + mapped must close M37 scope', summary);
assert(Number(summary.ownedBlocker) === 0, 'M37 must not close with owned blockers', summary);
assert(Number(summary.missingEvidence) === 0, 'M37 must not close with missing evidence', summary);
assert(Number(summary.missingConsumer) === 0, 'M37 must not close with missing consumer', summary);
assert(Number(summary.missingVerification) === 0, 'M37 must not close with missing verification', summary);

console.log(`gate:work-coverage passed: ${coverage.rows.length} M37 row(s), implemented=${summary.implemented}, mapped=${summary.mapped}.`);
