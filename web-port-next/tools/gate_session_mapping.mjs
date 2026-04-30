import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const workspaceRoot = path.resolve(root, '..');

const RAW_SESSION_NAMES = /\b(TFLAG|TEQUIP|SOURCE|UP|DOWN|LOSEBASE|NOWEX|EJAC|ITEMSALES|BOUGHT|GOTJUEL)\b/;
const SCALAR_SESSION_FAMILIES = new Set([
  'TARGET',
  'ASSI',
  'MASTER',
  'PLAYER',
  'ASSIPLAY',
  'BOUGHT',
  'EJAC',
  'PREVCOM',
  'SELECTCOM',
]);

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));
}

function readTsv(relativePath) {
  const raw = fs.readFileSync(path.join(root, relativePath), 'utf8').replace(/^\uFEFF/, '');
  const [headerLine, ...lines] = raw.split(/\r?\n/).filter((line) => line.length > 0);
  const headers = headerLine.split('\t');
  return lines.map((line) => {
    const cells = line.split('\t');
    return Object.fromEntries(headers.map((header, index) => [header, cells[index] ?? '']));
  });
}

function fail(message, detail) {
  console.error(`gate:session-mapping failed: ${message}`);
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
  if (sourcePath.endsWith('/variablesize.csv')) return kind === 'variable-size-row' || kind === 'csv-row';
  if (sourcePath.endsWith('.csv')) return kind === 'csv-row';
  return kind === 'unknown';
}

function pathFields(row) {
  return [
    row.sessionOwner,
    row.sessionFieldPath,
    row.calculationOwner,
    row.calculationPath,
    row.classification,
    row.featureLifecycleOwner,
  ].filter(Boolean);
}

const sourceInventory = readJson('data/legacy-mapping/source-addresses.json');
const audit = readJson('data/legacy-state-scan/erb-state-audit.json');
const slotCandidates = readTsv('data/legacy-state-scan/erb-slot-candidates.tsv');
const mapping = readJson('data/coverage/session-mapping.json');

assert(mapping.schemaVersion === 'session-mapping/v1', 'invalid session mapping schema version');
assert(Array.isArray(mapping.rows), 'session mapping rows must be an array');
assert(Array.isArray(mapping.runtimeSessionCandidateCoverage), 'runtime session candidate coverage must be an array');

const sourceSessionRows = sourceInventory.addresses.filter((row) => row.mappingAction === 'map-session-state');
assert(mapping.rows.length === mapping.expectedCounts.mapSessionStateRows, 'map-session-state source row count mismatch', {
  expected: mapping.expectedCounts.mapSessionStateRows,
  actual: mapping.rows.length,
});
assert(sourceSessionRows.length === mapping.expectedCounts.mapSessionStateRows, 'source inventory map-session-state count mismatch', {
  expected: mapping.expectedCounts.mapSessionStateRows,
  actual: sourceSessionRows.length,
});
assert(
  mapping.runtimeSessionCandidateCoverage.length === mapping.expectedCounts.runtimeSessionNumericSlots,
  'runtime session candidate count mismatch',
  {
    expected: mapping.expectedCounts.runtimeSessionNumericSlots,
    actual: mapping.runtimeSessionCandidateCoverage.length,
  },
);
assert(
  audit.summary.runtimeSessionNumericSlots === mapping.expectedCounts.runtimeSessionNumericSlots,
  'audit runtime session summary count mismatch',
  {
    expected: audit.summary.runtimeSessionNumericSlots,
    actual: mapping.expectedCounts.runtimeSessionNumericSlots,
  },
);

const sourceAddresses = new Set(sourceSessionRows.map((row) => row.address));
const mappedAddresses = new Set(mapping.rows.map((row) => row.address));
const missingSourceRows = sourceSessionRows.filter((row) => !mappedAddresses.has(row.address));
const extraRows = mapping.rows.filter((row) => !sourceAddresses.has(row.address));
assert(missingSourceRows.length === 0, 'source map-session-state rows missing from mapping', missingSourceRows.slice(0, 20));
assert(extraRows.length === 0, 'session mapping rows outside source map-session-state', extraRows.slice(0, 20));

const duplicateIds = mapping.rows
  .map((row) => row.mappingRowId)
  .filter((id, index, values) => values.indexOf(id) !== index);
assert(duplicateIds.length === 0, 'duplicate session mapping ids', duplicateIds.slice(0, 20));

const allowedStatuses = new Set(['session-field', 'calculation-internal']);
const invalidStatuses = mapping.rows.filter((row) => !allowedStatuses.has(row.status));
assert(invalidStatuses.length === 0, 'invalid source row status', invalidStatuses.slice(0, 20));

const forbiddenStatuses = mapping.rows.filter((row) => ['save-field', 'blocker', 'needsDecision', 'missingMapping'].includes(row.status));
assert(forbiddenStatuses.length === 0, 'forbidden session mapping status exists', forbiddenStatuses.slice(0, 20));
assert(mapping.summary.ownerBlockers === 0, 'owner blockers remain', mapping.assertions.ownerBlockers.slice(0, 20));
assert(mapping.summary.runtimeSessionCandidatesUnclassifiedAfterM25 === 0, 'runtime session candidates remain unclassified');

const sessionFieldMissingPath = mapping.rows.filter(
  (row) =>
    row.status === 'session-field' &&
    (!row.sessionOwner ||
      !row.sessionOwner.startsWith('session.') ||
      !row.sessionFieldPath ||
      !row.sessionFieldPath.startsWith(row.sessionOwner)),
);
assert(sessionFieldMissingPath.length === 0, 'session-field rows require matching session owner/path', {
  examples: sessionFieldMissingPath.slice(0, 20),
});

const calculationRowsMissingPath = mapping.rows.filter(
  (row) =>
    row.status === 'calculation-internal' &&
    (!row.calculationOwner || !row.calculationPath || row.sessionOwner || row.sessionFieldPath),
);
assert(calculationRowsMissingPath.length === 0, 'calculation-internal rows require calculation owner/path only', {
  examples: calculationRowsMissingPath.slice(0, 20),
});

const missingLifecycle = mapping.rows.filter((row) => !row.createdAt || !row.consumedAt || !row.disposedAt);
assert(missingLifecycle.length === 0, 'rows require createdAt/consumedAt/disposedAt lifecycle', missingLifecycle.slice(0, 20));

const invalidSavePolicy = mapping.rows.filter((row) => row.savePayloadPolicy !== 'never-save-directly');
assert(invalidSavePolicy.length === 0, 'session mapping rows must never serialize directly to save', invalidSavePolicy.slice(0, 20));

const rawNameInPaths = mapping.rows.filter((row) => pathFields(row).some((value) => RAW_SESSION_NAMES.test(String(value))));
assert(rawNameInPaths.length === 0, 'session/calculation paths must not copy raw ERB array names', {
  examples: rawNameInPaths.slice(0, 20),
});

const familyDeclarationMappedAsSession = mapping.rows.filter(
  (row) => row.status === 'session-field' && row.addressKind === 'family-declaration' && !SCALAR_SESSION_FAMILIES.has(row.family),
);
assert(
  familyDeclarationMappedAsSession.length === 0,
  'non-scalar family declarations cannot be direct session fields',
  familyDeclarationMappedAsSession.slice(0, 20),
);

const writeRowsMissingWriteSource = mapping.rows.filter(
  (row) => Number(row.writeCount) > 0 && !row.writeSource,
);
assert(writeRowsMissingWriteSource.length === 0, 'write-capable session rows require writeSource', {
  examples: writeRowsMissingWriteSource.slice(0, 20),
});

const missingEvidence = mapping.rows.filter(
  (row) =>
    !row.sourceEvidenceId ||
    !row.sourceEvidence ||
    row.sourceEvidence.evidenceId !== row.sourceEvidenceId ||
    row.sourceEvidence.sourcePath !== row.sourceFile ||
    !existsSourcePath(row.sourceEvidence.sourcePath) ||
    !sourceKindMatchesPath(row.sourceEvidence),
);
assert(missingEvidence.length === 0, 'source evidence is missing or invalid', {
  examples: missingEvidence.slice(0, 20),
});

const allowedCandidateStatusPattern =
  /^(shop|training|filming|work|recruit|mission|screen|interaction)-(session|calculation)$|^script-scratch$/;
const invalidCandidateStatuses = mapping.runtimeSessionCandidateCoverage.filter(
  (row) => !allowedCandidateStatusPattern.test(row.status),
);
assert(invalidCandidateStatuses.length === 0, 'invalid runtime session candidate statuses', {
  examples: invalidCandidateStatuses.slice(0, 20),
});

const candidateMissingSource = mapping.runtimeSessionCandidateCoverage.filter(
  (row) => row.sourceMappingAction !== 'map-session-state' || !row.sessionMappingRowId,
);
assert(candidateMissingSource.length === 0, 'runtime session candidates require source mapping row', {
  examples: candidateMissingSource.slice(0, 20),
});

const runtimeSessionCandidates = slotCandidates.filter((row) => {
  const families = new Set([
    'TFLAG',
    'TEQUIP',
    'SOURCE',
    'UP',
    'DOWN',
    'LOSEBASE',
    'NOWEX',
    'SAVESTR',
    'TSTR',
    'TCVAR',
  ]);
  return families.has(row.family);
});
const candidateIds = new Set(runtimeSessionCandidates.map((row) => row.candidate));
const mappedCandidateIds = new Set(mapping.runtimeSessionCandidateCoverage.map((row) => row.candidate));
const missingCandidates = runtimeSessionCandidates.filter((row) => !mappedCandidateIds.has(row.candidate));
const extraCandidates = mapping.runtimeSessionCandidateCoverage.filter((row) => !candidateIds.has(row.candidate));
assert(missingCandidates.length === 0, 'runtime session candidates missing from coverage', missingCandidates.slice(0, 20));
assert(extraCandidates.length === 0, 'extra runtime session candidates in coverage', extraCandidates.slice(0, 20));

console.log(
  `gate:session-mapping passed: ${mapping.rows.length} source row(s), ${mapping.summary.sessionFieldRows} session field row(s), ${mapping.summary.calculationInternalRows} calculation row(s), ${mapping.runtimeSessionCandidateCoverage.length} runtime candidate row(s).`,
);
