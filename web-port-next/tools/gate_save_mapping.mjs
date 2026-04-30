import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const workspaceRoot = path.resolve(root, '..');
const SEMANTIC_FLAG_FAMILIES = new Set(['CFLAG', 'FLAG', 'GLOBAL', 'GLOBALS', 'PBAND']);
const SCALAR_SAVE_FAMILIES = new Set(['DAY', 'TIME', 'MONEY', 'NOITEM']);

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));
}

function fail(message, detail) {
  console.error(`gate:save-mapping failed: ${message}`);
  if (detail) console.error(JSON.stringify(detail, null, 2));
  process.exit(1);
}

function assert(condition, message, detail) {
  if (!condition) fail(message, detail);
}

function existsSourcePath(sourcePath) {
  return Boolean(sourcePath) && fs.existsSync(path.join(workspaceRoot, sourcePath));
}

function sourceKindMatchesPath(evidence) {
  const sourcePath = String(evidence.sourcePath || '').toLowerCase().replace(/\\/g, '/');
  const kind = evidence.sourceKind;
  if (sourcePath.endsWith('.erb')) return kind === 'erb-file' || kind === 'erb-label';
  if (sourcePath.endsWith('.erh')) return kind === 'erh-file' || kind === 'erh-label';
  if (/\/chara[^/]*\.csv$/i.test(sourcePath)) return kind === 'chara-csv-row';
  if (sourcePath.endsWith('/variablesize.csv')) return kind === 'variable-size-row' || kind === 'csv-row';
  if (sourcePath.endsWith('.csv')) return kind === 'csv-row';
  return kind === 'unknown';
}

function hasRuntimeUse(row) {
  return Number(row.readCount) > 0 || Number(row.writeCount) > 0;
}

function isCharacterSeedOnly(row) {
  const sourceKinds = new Set(row.sourceKinds ?? []);
  return !hasRuntimeUse(row) && sourceKinds.has('charaSeed');
}

function isDefinitionOnly(row) {
  const sourceKinds = new Set(row.sourceKinds ?? []);
  return !hasRuntimeUse(row) && sourceKinds.has('csvDefinition') && !sourceKinds.has('charaSeed');
}

const coverage = readJson('data/coverage/save-mapping.json');

assert(coverage.schemaVersion === 'save-mapping/v1', 'invalid save mapping schema version');
assert(Array.isArray(coverage.rows), 'save mapping rows must be an array');
assert(Array.isArray(coverage.persistentCandidateCoverage), 'persistent candidate coverage must be an array');
assert(coverage.rows.length === coverage.expectedCounts.mapSaveStateRows, 'map-save-state source row count mismatch', {
  expected: coverage.expectedCounts.mapSaveStateRows,
  actual: coverage.rows.length,
});
assert(
  coverage.persistentCandidateCoverage.length === coverage.expectedCounts.runtimePersistentNumericSlots,
  'persistent candidate row count mismatch',
  {
    expected: coverage.expectedCounts.runtimePersistentNumericSlots,
    actual: coverage.persistentCandidateCoverage.length,
  },
);
assert(coverage.summary.ownerBlockers === 0, 'owner blockers remain', coverage.assertions.ownerBlockers.slice(0, 20));
assert(
  coverage.summary.persistentCandidatesUnclassifiedAfterM24 === 0,
  'persistent candidates remain unclassified after M24',
);
assert(coverage.assertions.noNeedsDecisionOrMissingMapping === true, 'needsDecision/missingMapping still exists');
assert(coverage.assertions.cflagFlagGlobalPbandAreIndexSplit === true, 'semantic flag families are not index split');

const allowedStatuses = new Set(['mapped', 'non-save', 'approved-excluded']);
const allowedCandidateStatuses = new Set([
  'save-field',
  'session-state',
  'character-template-seed-only',
  'definition-only',
  'definition-display-text',
  'variable-size-declaration',
  'approved-excluded',
]);

const ids = new Set();
const duplicateIds = [];
for (const row of coverage.rows) {
  if (ids.has(row.mappingRowId)) duplicateIds.push(row.mappingRowId);
  ids.add(row.mappingRowId);
}
assert(duplicateIds.length === 0, 'duplicate save mapping row ids', duplicateIds.slice(0, 20));

const invalidStatuses = coverage.rows.filter((row) => !allowedStatuses.has(row.status));
assert(invalidStatuses.length === 0, 'invalid save mapping statuses', invalidStatuses.slice(0, 20));

const forbiddenStatuses = coverage.rows.filter((row) => ['needsDecision', 'missingMapping', 'blocker'].includes(row.status));
assert(forbiddenStatuses.length === 0, 'forbidden save mapping statuses exist', forbiddenStatuses.slice(0, 20));

const mappedMissingPath = coverage.rows.filter((row) => row.status === 'mapped' && (!row.runtimeOwner || !row.fieldPath));
assert(mappedMissingPath.length === 0, 'mapped rows require runtimeOwner and fieldPath', mappedMissingPath.slice(0, 20));

const mappedLegacyPaths = coverage.rows.filter(
  (row) => row.status === 'mapped' && /(^|\.)(legacy|CFLAG|FLAG|GLOBAL|PBAND)(\.|$)/i.test(row.fieldPath),
);
assert(mappedLegacyPaths.length === 0, 'mapped rows cannot keep legacy/family array paths', mappedLegacyPaths.slice(0, 20));

const nonSaveMissingReason = coverage.rows.filter((row) => row.status === 'non-save' && !row.nonSaveReason);
assert(nonSaveMissingReason.length === 0, 'non-save rows require nonSaveReason', nonSaveMissingReason.slice(0, 20));

const nonScalarFamilyDeclarationMapped = coverage.rows.filter(
  (row) => row.status === 'mapped' && row.addressKind === 'family-declaration' && !SCALAR_SAVE_FAMILIES.has(row.family),
);
assert(
  nonScalarFamilyDeclarationMapped.length === 0,
  'non-scalar family declarations cannot be mapped as save fields',
  nonScalarFamilyDeclarationMapped.slice(0, 20),
);

const seedOnlyMapped = coverage.rows.filter((row) => row.status === 'mapped' && isCharacterSeedOnly(row));
assert(seedOnlyMapped.length === 0, 'character seed-only rows cannot be mapped as save fields', seedOnlyMapped.slice(0, 20));

const definitionOnlyMapped = coverage.rows.filter((row) => row.status === 'mapped' && isDefinitionOnly(row));
assert(definitionOnlyMapped.length === 0, 'definition-only rows cannot be mapped as save fields', definitionOnlyMapped.slice(0, 20));

const writeRowsMissingWriteSource = coverage.rows.filter(
  (row) => row.status === 'mapped' && (row.sourceAccess === 'write-only' || row.sourceAccess === 'read-write') && !row.writeSource,
);
assert(writeRowsMissingWriteSource.length === 0, 'write-capable mapped rows require writeSource', writeRowsMissingWriteSource.slice(0, 20));

const readOnlyRowsMissingDefault = coverage.rows.filter(
  (row) =>
    row.status === 'mapped' &&
    (row.sourceAccess === 'read-only' || row.sourceAccess === 'seed-only' || row.sourceAccess === 'definition-only') &&
    !row.defaultSource,
);
assert(readOnlyRowsMissingDefault.length === 0, 'read-only/default rows require defaultSource', readOnlyRowsMissingDefault.slice(0, 20));

const missingEvidence = coverage.rows.filter(
  (row) =>
    !row.sourceEvidenceId ||
    !row.sourceEvidence ||
    row.sourceEvidence.evidenceId !== row.sourceEvidenceId ||
    row.sourceEvidence.sourcePath !== row.sourceFile ||
    !existsSourcePath(row.sourceEvidence.sourcePath) ||
    !sourceKindMatchesPath(row.sourceEvidence),
);
assert(missingEvidence.length === 0, 'source evidence is missing or invalid', missingEvidence.slice(0, 20));

const semanticRowsInvalid = coverage.rows.filter(
  (row) =>
    row.status === 'mapped' &&
    SEMANTIC_FLAG_FAMILIES.has(row.family) &&
    (row.index === '' ||
      row.semanticOwnerSource !== 'index-evidence-rule' ||
      !row.fieldPath.includes(`flag_${String(row.index).replace(/[^A-Za-z0-9_-]/g, '_')}`)),
);
assert(semanticRowsInvalid.length === 0, 'CFLAG/FLAG/GLOBAL/PBAND rows require index-specific semantic paths', {
  examples: semanticRowsInvalid.slice(0, 20),
});

const invalidCandidateStatuses = coverage.persistentCandidateCoverage.filter((row) => !allowedCandidateStatuses.has(row.status));
assert(invalidCandidateStatuses.length === 0, 'invalid persistent candidate statuses', invalidCandidateStatuses.slice(0, 20));

const unresolvedCandidates = coverage.persistentCandidateCoverage.filter((row) =>
  ['blocker', 'needsDecision', 'missingMapping'].includes(row.status),
);
assert(unresolvedCandidates.length === 0, 'persistent candidates remain unresolved', unresolvedCandidates.slice(0, 20));

const saveFieldCandidatesMissingPath = coverage.persistentCandidateCoverage.filter(
  (row) => row.status === 'save-field' && (!row.saveMappingRowId || !row.runtimeOwner || !row.fieldPath),
);
assert(
  saveFieldCandidatesMissingPath.length === 0,
  'persistent save-field candidates require save row, owner, and field path',
  saveFieldCandidatesMissingPath.slice(0, 20),
);

const sessionCandidatesMissingReason = coverage.persistentCandidateCoverage.filter(
  (row) => row.status === 'session-state' && (!row.runtimeOwner || !row.nonSaveReason || row.fieldPath),
);
assert(sessionCandidatesMissingReason.length === 0, 'session-state persistent candidates require non-save reason', {
  examples: sessionCandidatesMissingReason.slice(0, 20),
});

console.log(
  `gate:save-mapping passed: ${coverage.rows.length} source row(s), ${coverage.summary.mappedRows} mapped, ${coverage.summary.nonSaveRows} non-save, ${coverage.persistentCandidateCoverage.length} persistent candidate row(s).`,
);
