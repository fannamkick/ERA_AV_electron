import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));
}

function fail(message, detail) {
  console.error(`gate:approved-exclusions failed: ${message}`);
  if (detail) {
    console.error(JSON.stringify(detail, null, 2));
  }
  process.exit(1);
}

function assert(condition, message, detail) {
  if (!condition) fail(message, detail);
}

const registry = readJson('data/coverage/approved-exclusions.json');
const features = readJson('data/coverage/features.json');
const definitions = readJson('data/coverage/definitions.json');

assert(registry.schemaVersion === 'approved-exclusions/v1', 'invalid approved exclusion schema version');
assert(Array.isArray(registry.exclusions), 'approved exclusions must be an array');

const requiredFields = [
  'approvedExclusionId',
  'rowKind',
  'rowId',
  'ownerMilestone',
  'sourceEvidenceId',
  'approvalId',
  'approvedBy',
  'approvedAt',
  'approvalScope',
  'reason',
  'replacementBehavior',
  'verificationCommand'
];

const registryIds = new Set();
const duplicateIds = [];
const invalidRegistryRows = [];

for (const exclusion of registry.exclusions) {
  if (registryIds.has(exclusion.approvedExclusionId)) duplicateIds.push(exclusion.approvedExclusionId);
  registryIds.add(exclusion.approvedExclusionId);

  const missing = requiredFields.filter((field) => !exclusion[field]);
  if (missing.length > 0) invalidRegistryRows.push({ approvedExclusionId: exclusion.approvedExclusionId, missing });
}

assert(duplicateIds.length === 0, 'duplicate approved exclusion ids', duplicateIds.slice(0, 20));
assert(invalidRegistryRows.length === 0, 'approved exclusion registry rows are missing required fields', invalidRegistryRows.slice(0, 20));

const excludedRows = [
  ...features.rows
    .filter((row) => row.status === 'approved-excluded')
    .map((row) => ({ rowKind: 'feature', rowId: row.featureId, approvedExclusionId: row.approvedExclusionId })),
  ...definitions.rows
    .filter((row) => row.status === 'approved-excluded')
    .map((row) => ({ rowKind: 'definition', rowId: row.definitionRowId, approvedExclusionId: row.approvedExclusionId })),
];

const missingRegistry = excludedRows.filter((row) => !row.approvedExclusionId || !registryIds.has(row.approvedExclusionId));
assert(missingRegistry.length === 0, 'approved-excluded coverage rows require registry evidence', missingRegistry.slice(0, 20));

const registryTargets = new Set(registry.exclusions.map((row) => `${row.rowKind}:${row.rowId}`));
const referencedTargets = new Set(excludedRows.map((row) => `${row.rowKind}:${row.rowId}`));
const orphanRegistryRows = [...registryTargets].filter((target) => !referencedTargets.has(target));
assert(orphanRegistryRows.length === 0, 'approved exclusion registry rows must be referenced by coverage', orphanRegistryRows.slice(0, 20));

console.log(
  `gate:approved-exclusions passed: ${registry.exclusions.length} approved exclusion row(s), ${excludedRows.length} referenced coverage row(s).`,
);
