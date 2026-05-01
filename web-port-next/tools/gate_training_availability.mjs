import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));
}

function readText(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

function fail(message, detail) {
  console.error(`gate:training-availability failed: ${message}`);
  if (detail) console.error(JSON.stringify(detail, null, 2));
  process.exit(1);
}

function assert(condition, message, detail) {
  if (!condition) fail(message, detail);
}

const queue = readJson('data/coverage/implementation-queue.json');
const coverage = readJson('data/coverage/training-availability-coverage.json');
const gapAudit = readJson('data/coverage/audits/M41-gap-audit.json');
const rules = readJson('data/coverage/training-availability-rules.json');
const catalog = readJson('data/catalog/legacy-catalog.json');
const packageJson = readJson('package.json');
const trainingText = readText('src/features/training.ts');
const availabilityText = readText('src/features/trainingAvailability.ts');
const smokeText = fs.existsSync(path.join(root, 'tools/m41_training_availability_smoke.ts'))
  ? readText('tools/m41_training_availability_smoke.ts')
  : '';
const runtimeText = [trainingText, availabilityText].join('\n');

assert(coverage.schemaVersion === 'training-availability-coverage/v1', 'invalid schema version');
assert(coverage.milestone === 'M41', 'coverage milestone must be M41');
assert(Array.isArray(coverage.rows), 'coverage rows missing');
assert(Array.isArray(coverage.unresolvedIssues), 'unresolvedIssues missing');
assert(gapAudit.schemaVersion === 'milestone-gap-audit/v1', 'invalid M41 gap audit schema version');
assert(gapAudit.milestone === 'M41', 'M41 gap audit milestone mismatch');
assert(rules.schemaVersion === 'training-availability-rules/v1', 'invalid availability rules schema');
assert(Number(rules.programCount) === 125, 'COMABLE source program count must be 125', rules.programCount);

const m41Units = (queue.queueUnits ?? []).filter((unit) => unit.ownerMilestone === 'M41');
assert(m41Units.length === 2, 'M41 must have exactly two implementation units', m41Units.map((unit) => unit.unitId));

const expectedRefs = new Set();
for (const unit of m41Units) {
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
assert(missingRefs.length === 0, 'M41 owned refs missing from training availability coverage', missingRefs.slice(0, 50));
assert(extraRefs.length === 0, 'training availability coverage includes refs outside M41 owned scope', extraRefs.slice(0, 50));
assert(duplicateRefs.length === 0, 'training availability coverage refs are duplicated', duplicateRefs.slice(0, 50));
assert(coverage.rows.length === expectedRefs.size, 'coverage row count must match M41 owned scope', coverage.summary);
assert(coverage.rows.length === 1625, 'M41 must account 1625 training availability rows', coverage.summary);
assert(coverage.unresolvedIssues.length === 0, 'M41 coverage has unresolved issues', coverage.unresolvedIssues);
assert(Number(gapAudit.summary?.unresolvedGaps ?? -1) === 0, 'M41 gap audit has unresolved gaps', gapAudit.summary);

const badClosedRows = coverage.rows.filter(
  (row) => !row.sourceEvidenceId || !row.runtimeConsumerId || !row.verificationId || !row.completionStatus,
);
assert(badClosedRows.length === 0, 'closed rows missing evidence, consumer, or verification', badClosedRows.slice(0, 20));

const featureRows = coverage.rows.filter((row) => row.rowKind === 'feature');
const sourceReviewRows = coverage.rows.filter((row) => row.rowKind === 'source-file-review');
assert(featureRows.length === 1624, 'M41 must account 1624 feature rows', coverage.summary);
assert(sourceReviewRows.length === 1, 'M41 must account one COMORDER source-file-review row', coverage.summary);
assert(
  featureRows.filter((row) => row.sourcePath === 'original-game/ERB/指導関係/COMABLE.ERB').length === 1620,
  'M41 must account 1620 COMABLE rows',
  coverage.summary,
);
assert(
  featureRows.filter((row) => row.sourcePath === 'original-game/ERB/指導関係/COMSEQ_REGISTER.ERB').length === 4,
  'M41 must account 4 COMSEQ_REGISTER rows',
  coverage.summary,
);
assert(
  sourceReviewRows[0]?.sourcePath === 'original-game/ERB/指導関係/COMORDER.ERB' && sourceReviewRows[0]?.sourceSha256,
  'M41 source review must keep COMORDER manifest evidence',
  sourceReviewRows,
);

const commandIds = Object.keys(catalog.catalog.trainingCommands).sort((left, right) => Number(left) - Number(right));
assert(commandIds.length === 105, 'legacy Train.csv catalog must expose 105 training commands', commandIds.length);
const missingPrograms = commandIds.filter((commandId) => !rules.programs?.[commandId]);
assert(missingPrograms.length === 0, 'every catalog training command must have a COMABLE source program', missingPrograms);

const programsWithoutReturn = Object.values(rules.programs).filter(
  (program) => !program.lines.some((line) => /^RETURN\s+[01]/u.test(line.text)),
);
assert(programsWithoutReturn.length === 0, 'every COMABLE source program must include a return path', programsWithoutReturn.slice(0, 20));

for (const requiredText of [
  'trainingAvailabilityDisabledReason',
  'trainingAvailabilityProgramForCommand',
  'runProgram',
  'evaluateExpression',
  'temporaryEquipment',
  'temporaryFlags',
  'itemCounts',
  'conditionParams',
  'clothing',
  'availabilityFlags',
  'assistantPlay',
  'Original availability rule',
]) {
  assert(runtimeText.includes(requiredText), `training availability runtime missing required consumer: ${requiredText}`);
}

assert(!trainingText.includes('Training command is not available yet.'), 'M41 must replace placeholder defaultAvailable gating');
assert(
  packageJson.scripts['coverage:training-availability'] === 'node tools/build_training_availability_coverage.mjs',
  'coverage:training-availability script must be real',
);
assert(
  packageJson.scripts['gate:training-availability'] === 'node tools/gate_training_availability.mjs',
  'gate:training-availability script must be real',
);
assert(
  String(packageJson.scripts['smoke:training-availability'] ?? '').includes('m41-training-availability-smoke'),
  'smoke:training-availability script must be real',
);

for (const requiredSmokeText of [
  'visibleCommands.length === 105',
  'Original availability rule',
  'itemCounts',
  'temporaryEquipment',
  'training-command-unavailable',
  'should not write save state',
]) {
  assert(smokeText.includes(requiredSmokeText), `M41 smoke missing required assertion: ${requiredSmokeText}`);
}

const summary = coverage.summary ?? {};
assert(Number(summary.ownedRowRefs) === expectedRefs.size, 'summary owned row count mismatch', summary);
assert(Number(summary.rows) === coverage.rows.length, 'summary row count mismatch', summary);
assert(Number(summary.implemented) + Number(summary.mapped) === expectedRefs.size, 'implemented + mapped must close M41 scope', summary);
assert(Number(summary.ownedBlocker) === 0, 'M41 must not close with owned blockers', summary);
assert(Number(summary.missingEvidence) === 0, 'M41 must not close with missing evidence', summary);
assert(Number(summary.missingConsumer) === 0, 'M41 must not close with missing consumer', summary);
assert(Number(summary.missingVerification) === 0, 'M41 must not close with missing verification', summary);
assert(Number(summary.roleOnlyComplete) === 0, 'M41 must not close with role-only rows', summary);
assert(Number(summary.unapprovedExcluded) === 0, 'M41 must not close with unapproved exclusions', summary);

console.log(`gate:training-availability passed: ${coverage.rows.length} M41 row(s), implemented=${summary.implemented}, mapped=${summary.mapped}, programs=${rules.programCount}.`);
