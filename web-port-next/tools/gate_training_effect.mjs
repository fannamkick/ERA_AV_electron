import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const rangeArg = process.argv[2] ?? 'all';

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));
}

function readText(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

function fail(message, detail) {
  console.error(`gate:training-effect failed: ${message}`);
  if (detail) console.error(JSON.stringify(detail, null, 2));
  process.exit(1);
}

function assert(condition, message, detail) {
  if (!condition) fail(message, detail);
}

const rangeToArtifact = {
  '0-34': 'data/coverage/training-effect-0-34.json',
};

const artifactPath = rangeToArtifact[rangeArg];
assert(artifactPath, 'supported range argument is required: 0-34', { rangeArg });

const coverage = readJson(artifactPath);
const profiles = readJson('data/catalog/training-effect-profiles-0-34.json');
const gapAudit = readJson('data/coverage/audits/M42-gap-audit.json');
const packageJson = readJson('package.json');
const trainingText = readText('src/features/training.ts');
const catalogText = readText('src/catalog/legacyCatalog.ts');
const smokeText = readText('tools/m42_training_effect_smoke.ts');

assert(coverage.schemaVersion === 'training-effect-coverage/v1', 'invalid training effect coverage schema');
assert(coverage.milestone === 'M42', 'training effect coverage milestone mismatch', coverage.milestone);
assert(profiles.schemaVersion === 'training-effect-profiles/v1', 'invalid training effect profile schema');
assert(profiles.milestone === 'M42', 'profile milestone mismatch', profiles.milestone);
assert(gapAudit.schemaVersion === 'milestone-gap-audit/v1', 'invalid M42 gap audit schema');
assert(Number(gapAudit.summary?.unresolvedGaps ?? -1) === 0, 'M42 gap audit has unresolved gaps', gapAudit.summary);

const rows = coverage.rows ?? [];
assert(rows.length === 35, 'M42 must account command 0-34 rows', coverage.summary);
assert((coverage.unresolvedIssues ?? []).length === 0, 'M42 coverage has unresolved issues', coverage.unresolvedIssues);

const expectedIds = new Set(Array.from({ length: 35 }, (_, index) => String(index)));
const rowIds = new Set(rows.map((row) => row.commandId));
const missingRows = [...expectedIds].filter((commandId) => !rowIds.has(commandId));
const extraRows = [...rowIds].filter((commandId) => !expectedIds.has(commandId));
assert(missingRows.length === 0 && extraRows.length === 0, 'M42 coverage command set mismatch', { missingRows, extraRows });

for (const row of rows) {
  const profile = profiles.profiles?.[row.commandId];
  assert(profile, 'missing runtime training effect profile', row);
  assert(row.sourceEvidenceId && row.sourcePath && row.sourceLine, 'row missing source evidence', row);
  assert(row.runtimeConsumerId && row.handlerOwner && row.verificationId, 'row missing consumer or verification', row);
  assert(row.sourceAssignmentCount > 0, 'row missing SOURCE evidence', row);
  assert(row.bodyLossAssignmentCount > 0, 'row missing LOSEBASE evidence', row);
  assert(Object.keys(profile.definitionPatch?.stimulusDeltas ?? {}).length > 0, 'profile missing stimulus deltas', row);
  assert(Object.keys(profile.definitionPatch?.paramDeltas ?? {}).length > 0, 'profile missing param deltas', row);
  assert(Object.keys(profile.definitionPatch?.bodyStatDeltas ?? {}).length >= 2, 'profile missing body stat deltas', row);
  assert(Object.keys(profile.definitionPatch?.resourceDeltas ?? {}).length > 0, 'profile missing resource owner deltas', row);
}

for (const requiredText of [
  'trainingEffectProfilesArtifact',
  'createTrainingEffectCommandDefinitions',
  'calculateTrainingResult',
  'sessionWithTrainingPreview',
  'applyTrainingResult',
  'initialInteractionSessionState',
]) {
  assert(`${trainingText}\n${catalogText}`.includes(requiredText), `runtime missing M42 consumer text: ${requiredText}`);
}

assert(
  packageJson.scripts['coverage:training-effect-0-34'] === 'node tools/build_training_effect_0_34_coverage.mjs',
  'coverage:training-effect-0-34 script must be real',
);
assert(packageJson.scripts['gate:training-effect'] === 'node tools/gate_training_effect.mjs', 'gate:training-effect script must be real');
assert(
  String(packageJson.scripts['smoke:training-effect-0-34'] ?? '').includes('m42-training-effect-smoke'),
  'smoke:training-effect-0-34 script must be real',
);

for (const requiredSmokeText of [
  'commandIds = Array.from',
  'training/selectCommand',
  'training/cancelSelection',
  'training/execute',
  'save payload should not include training calculation buffers',
]) {
  assert(smokeText.includes(requiredSmokeText), `M42 smoke missing required assertion: ${requiredSmokeText}`);
}

const summary = coverage.summary ?? {};
for (const field of [
  'ownedBlocker',
  'missingEvidence',
  'missingConsumer',
  'missingVerification',
  'roleOnlyComplete',
  'unapprovedExcluded',
]) {
  assert(Number(summary[field]) === 0, `M42 summary blocking field must be zero: ${field}`, summary);
}

console.log(`gate:training-effect passed: range=${rangeArg}, rows=${rows.length}, implemented=${summary.implemented}.`);
