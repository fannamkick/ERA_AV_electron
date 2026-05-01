import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));
}

function fileExists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function fail(message, detail) {
  console.error(`gate:coverage-hardening failed: ${message}`);
  if (detail) {
    console.error(JSON.stringify(detail, null, 2));
  }
  process.exit(1);
}

function assert(condition, message, detail) {
  if (!condition) fail(message, detail);
}

const hardCompletionStatuses = new Set([
  'implemented',
  'used',
  'template',
  'listing',
  'display-only',
  'calculation-only',
  'mapped',
  'non-save',
  'save-field',
  'session-field',
  'calculation-internal',
  'script-scratch',
  'training-calculation',
  'filming-session',
  'approved-excluded',
]);

const coverageCompletionStatuses = [
  /^mapped-/,
  /^implemented-/,
  /^consumed-/,
  /^verified-/,
  /^session-/,
  /^save-/,
  /^non-save/,
  /^transferred-/,
  /^approved-excluded/,
];

function isHardComplete(row) {
  const status = row.status ?? row.completionStatus ?? '';
  if (hardCompletionStatuses.has(status)) return true;
  if (coverageCompletionStatuses.some((pattern) => pattern.test(status))) return true;
  return row.isComplete === true || row.implemented === true;
}

function sourcePathFor(row, evidenceById = new Map()) {
  return (
    row.sourceEvidence?.sourcePath ||
    row.sourcePath ||
    row.sourceFile ||
    row.sourceLocation ||
    evidenceById.get(row.sourceEvidenceId)?.sourcePath ||
    ''
  );
}

function sourceTierFor(row, manifestFiles, evidenceById = new Map()) {
  if (row.sourceEvidence?.sourceTier) return row.sourceEvidence.sourceTier;
  if (evidenceById.get(row.sourceEvidenceId)?.sourceTier) return evidenceById.get(row.sourceEvidenceId).sourceTier;
  const sourcePath = sourcePathFor(row, evidenceById);
  return manifestFiles.get(sourcePath)?.sourceTier ?? '';
}

function collectRows(file, data) {
  const rows = [];
  if (Array.isArray(data.rows)) rows.push(...data.rows.map((row) => ({ file, row })));
  if (Array.isArray(data.blockers)) rows.push(...data.blockers.map((row) => ({ file, row })));
  if (Array.isArray(data.exclusions)) rows.push(...data.exclusions.map((row) => ({ file, row })));
  return rows;
}

function commandReferencesExistingTool(command) {
  const match = command.match(/\bnode\s+(tools\/[^ ]+\.mjs)\b/);
  if (!match) return true;
  return fileExists(match[1]);
}

const packageJson = readJson('package.json');
const scripts = packageJson.scripts ?? {};
const registry = readJson('data/coverage/coverage-gate-registry.json');
const manifest = readJson('data/coverage/source-manifest.json');
const manifestFiles = new Map((manifest.files ?? []).map((file) => [file.sourcePath, file]));
const evidenceById = new Map();

assert(registry.schemaVersion === 'coverage-gate-registry/v1', 'invalid registry schema version');
assert(Array.isArray(registry.milestoneContracts), 'registry must include milestoneContracts');
assert(registry.milestoneContracts.some((row) => row.milestone === 'M34.5'), 'registry must include M34.5 hardening contract');

const futureMilestones = Array.from({ length: 18 }, (_, index) => `M${35 + index}`);
const registeredMilestones = new Set(registry.milestoneContracts.map((row) => row.milestone));
for (const milestone of futureMilestones) {
  assert(registeredMilestones.has(milestone), 'registry missing future milestone contract', { milestone });
}

const missingScripts = [];
const missingToolFiles = [];
for (const contract of registry.milestoneContracts) {
  assert(contract.ownerRole, 'contract missing ownerRole', contract);
  assert(contract.ownedScope, 'contract missing ownedScope', contract);
  assert(Array.isArray(contract.requiredScripts) && contract.requiredScripts.length > 0, 'contract missing requiredScripts', {
    milestone: contract.milestone,
  });
  assert(Array.isArray(contract.blockingGates) && contract.blockingGates.length > 0, 'contract missing blockingGates', {
    milestone: contract.milestone,
  });

  for (const scriptName of contract.requiredScripts) {
    if (!scripts[scriptName]) missingScripts.push({ milestone: contract.milestone, scriptName });
    else if (!commandReferencesExistingTool(scripts[scriptName])) {
      missingToolFiles.push({ milestone: contract.milestone, scriptName, command: scripts[scriptName] });
    }
  }
}

assert(missingScripts.length === 0, 'registry required scripts are missing from package.json', missingScripts.slice(0, 50));
assert(missingToolFiles.length === 0, 'registry scripts reference missing tool files', missingToolFiles.slice(0, 50));

const requiredFinalScripts = [
  'audit:final-gap',
  'gate:final-gap-audit',
  'gate:final-content-zero-gap',
  'coverage:view-text',
  'gate:view-and-text-coverage',
  'test:roundtrip:all',
  'report:full-port',
  'gate:complete-port-verdict',
  'verify:complete',
];
const missingFinalScripts = requiredFinalScripts.filter((scriptName) => !scripts[scriptName]);
assert(missingFinalScripts.length === 0, 'final audit/complete scripts are missing', missingFinalScripts);

const coverageFiles = [
  'data/coverage/features.json',
  'data/coverage/definitions.json',
  'data/coverage/blockers.json',
  'data/coverage/approved-exclusions.json',
  'data/coverage/save-mapping.json',
  'data/coverage/session-mapping.json',
  ...fs
    .readdirSync(path.join(root, 'data', 'coverage'))
    .filter((file) => file.endsWith('-coverage.json'))
    .map((file) => `data/coverage/${file}`),
].filter(fileExists);

for (const file of coverageFiles) {
  const data = readJson(file);
  for (const { row } of collectRows(file, data)) {
    if (row.sourceEvidenceId && row.sourceEvidence?.sourcePath) {
      evidenceById.set(row.sourceEvidenceId, row.sourceEvidence);
    }
  }
}

const auxiliaryCompletionRows = [];
for (const file of coverageFiles) {
  const data = readJson(file);
  for (const { row } of collectRows(file, data)) {
    if (!isHardComplete(row)) continue;
    if (sourceTierFor(row, manifestFiles, evidenceById) !== 'auxiliary') continue;
    auxiliaryCompletionRows.push({
      file,
      rowId:
        row.coverageRowId ??
        row.definitionRowId ??
        row.featureId ??
        row.mappingRowId ??
        row.blockerId ??
        row.approvedExclusionId ??
        row.reviewId ??
        '(unknown)',
      status: row.status ?? row.completionStatus,
      sourcePath: sourcePathFor(row, evidenceById),
    });
  }
}

assert(
  auxiliaryCompletionRows.length === 0,
  'auxiliary evidence is still being used as completion evidence',
  auxiliaryCompletionRows.slice(0, 50),
);

const placeholderCommandFailures = Object.entries(scripts).filter(
  ([scriptName, command]) =>
    scriptName !== 'coverage:gate-registry' &&
    /future_milestone_placeholder\.mjs/.test(command) &&
    !/node tools\/future_milestone_placeholder\.mjs/.test(command),
);
assert(placeholderCommandFailures.length === 0, 'future placeholders must be explicit node tool commands', placeholderCommandFailures);

console.log(
  `gate:coverage-hardening passed: ${registry.milestoneContracts.length} contract(s), ${coverageFiles.length} coverage file(s), ${requiredFinalScripts.length} final script(s).`,
);
