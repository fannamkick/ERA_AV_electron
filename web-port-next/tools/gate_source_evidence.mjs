import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const workspaceRoot = path.resolve(root, '..');

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));
}

function fileExists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function fail(message, detail) {
  console.error(`gate:source-evidence failed: ${message}`);
  if (detail) {
    console.error(JSON.stringify(detail, null, 2));
  }
  process.exit(1);
}

function assert(condition, message, detail) {
  if (!condition) fail(message, detail);
}

function existsSourcePath(sourcePath) {
  return fs.existsSync(path.join(workspaceRoot, sourcePath));
}

function sourceFileKind(sourcePath) {
  const lower = sourcePath.toLowerCase();
  if (lower.endsWith('.erb')) return 'erb';
  if (lower.endsWith('.erh')) return 'erh';
  if (/\/chara[^/]*\.csv$/i.test(sourcePath)) return 'chara-csv';
  if (lower.endsWith('/variablesize.csv')) return 'variable-size-csv';
  if (lower.endsWith('.csv')) return 'csv';
  if (lower.endsWith('.txt')) return 'source-note';
  return 'unknown';
}

function evidenceKindMatchesSourcePath(evidence, sourcePath) {
  const fileKind = sourceFileKind(sourcePath);
  const evidenceKind = evidence.sourceKind;

  if (fileKind === 'erb') return evidenceKind === 'erb-label' || evidenceKind === 'erb-file';
  if (fileKind === 'erh') return evidenceKind === 'erh-label' || evidenceKind === 'erh-file';
  if (fileKind === 'chara-csv') return evidenceKind === 'chara-csv-row';
  if (fileKind === 'variable-size-csv') return evidenceKind === 'variable-size-row' || evidenceKind === 'csv-row';
  if (fileKind === 'csv') return evidenceKind === 'csv-row';
  return evidenceKind === fileKind || evidenceKind === 'unknown';
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

function sourcePathFromEvidence(row, evidenceById = new Map()) {
  return (
    row.sourceEvidence?.sourcePath ||
    row.sourcePath ||
    row.sourceFile ||
    row.sourceLocation ||
    evidenceById.get(row.sourceEvidenceId)?.sourcePath ||
    ''
  );
}

function manifestFileByPath(manifest, sourcePath) {
  return manifest.files.find((file) => file.sourcePath === sourcePath);
}

function isAuxiliarySource(row, manifest, sourcePath, evidenceById = new Map()) {
  if (row.sourceEvidence?.sourceTier === 'auxiliary') return true;
  if (evidenceById.get(row.sourceEvidenceId)?.sourceTier === 'auxiliary') return true;
  const manifestFile = manifestFileByPath(manifest, sourcePath);
  return manifestFile?.sourceTier === 'auxiliary' || manifestFile?.sourceRole === 'auxiliary';
}

function rowSourceFile(row) {
  return row.sourceFile ?? row.sourcePath ?? row.sourceLocation ?? '';
}

function validateEvidence(row, rowId, rowKind, manifest) {
  const evidence = row.sourceEvidence;
  const manifestPaths = new Set(manifest.files.map((file) => file.sourcePath));

  assert(row.sourceEvidenceId, `${rowKind} row is missing sourceEvidenceId`, { rowId });
  assert(evidence && typeof evidence === 'object', `${rowKind} row is missing sourceEvidence`, { rowId });
  assert(evidence.evidenceId === row.sourceEvidenceId, `${rowKind} sourceEvidenceId mismatch`, {
    rowId,
    sourceEvidenceId: row.sourceEvidenceId,
    evidenceId: evidence.evidenceId,
  });
  assert(evidence.sourceTier === 'primary' || evidence.sourceTier === 'auxiliary', `${rowKind} row has invalid sourceTier`, {
    rowId,
    sourceTier: evidence.sourceTier,
  });
  assert(evidence.sourceRole === 'original' || evidence.sourceRole === 'auxiliary', `${rowKind} row has invalid sourceRole`, {
    rowId,
    sourceRole: evidence.sourceRole,
  });
  assert(
    evidence.sourceTier !== 'auxiliary' || !isHardComplete(row),
    `${rowKind} row cannot use auxiliary evidence as completion evidence`,
    { rowId, status: row.status, sourcePath: evidence.sourcePath },
  );
  assert(evidence.sourcePath && evidence.sourcePath === rowSourceFile(row), `${rowKind} source path must match sourceFile`, {
    rowId,
    sourceFile: rowSourceFile(row),
    evidencePath: evidence.sourcePath,
  });
  assert(manifestPaths.has(evidence.sourcePath), `${rowKind} source path is not in source manifest`, {
    rowId,
    sourcePath: evidence.sourcePath,
  });
  assert(existsSourcePath(evidence.sourcePath), `${rowKind} source path does not exist`, {
    rowId,
    sourcePath: evidence.sourcePath,
  });
  assert(evidenceKindMatchesSourcePath(evidence, evidence.sourcePath), `${rowKind} sourceKind does not match source path`, {
    rowId,
    sourcePath: evidence.sourcePath,
    sourceKind: evidence.sourceKind,
  });
  assert(evidence.accessDirection, `${rowKind} evidence must have accessDirection`, { rowId });

  if (rowKind === 'feature' && row.status === 'implemented') {
    assert(evidence.label, 'implemented feature row requires label evidence', { rowId });
  }

  if (rowKind === 'definition') {
    if (row.sourceKind === 'erb-derived-definition') {
      assert(evidence.label && evidence.line, 'ERB-derived definition row requires label and line evidence', { rowId });
    } else {
      assert(evidence.csvRow, 'definition row requires csvRow/source id evidence', { rowId });
    }
    if (row.sourceKind === 'character-seed') {
      assert(evidence.family && evidence.index, 'character seed evidence requires family and index', { rowId });
    }
  }
}

function validateSourceReference(row, rowId, rowKind, manifest, evidenceById) {
  if (row.sourceEvidence) {
    validateEvidence(row, rowId, rowKind, manifest);
    return;
  }

  const sourcePath = sourcePathFromEvidence(row, evidenceById);
  assert(row.sourceEvidenceId, `${rowKind} row is missing sourceEvidenceId`, { rowId });
  assert(sourcePath, `${rowKind} row is missing source path`, { rowId });
  assert(manifestFileByPath(manifest, sourcePath), `${rowKind} source path is not in source manifest`, {
    rowId,
    sourcePath,
  });
  assert(existsSourcePath(sourcePath), `${rowKind} source path does not exist`, { rowId, sourcePath });
  assert(
    !isAuxiliarySource(row, manifest, sourcePath, evidenceById) || !isHardComplete(row),
    `${rowKind} row cannot use auxiliary evidence as completion evidence`,
    { rowId, status: row.status ?? row.completionStatus, sourcePath },
  );
}

function validateRows(rows, rowKind, idSelector, manifest, evidenceById) {
  for (const row of rows) {
    validateSourceReference(row, idSelector(row), rowKind, manifest, evidenceById);
  }
}

function collectSourceEvidence(rows, evidenceById) {
  for (const row of rows) {
    if (row.sourceEvidenceId && row.sourceEvidence?.sourcePath) {
      evidenceById.set(row.sourceEvidenceId, row.sourceEvidence);
    }
  }
}

const schema = readJson('data/coverage/source-evidence.schema.json');
const manifest = readJson('data/coverage/source-manifest.json');
const features = readJson('data/coverage/features.json');
const definitions = readJson('data/coverage/definitions.json');
const blockers = readJson('data/coverage/blockers.json');
const saveMapping = fileExists('data/coverage/save-mapping.json') ? readJson('data/coverage/save-mapping.json') : null;
const sessionMapping = fileExists('data/coverage/session-mapping.json')
  ? readJson('data/coverage/session-mapping.json')
  : null;
const approvedExclusions = fileExists('data/coverage/approved-exclusions.json')
  ? readJson('data/coverage/approved-exclusions.json')
  : null;
const implementationQueue = fileExists('data/coverage/implementation-queue.json')
  ? readJson('data/coverage/implementation-queue.json')
  : null;
const milestoneCoverageFiles = fs
  .readdirSync(path.join(root, 'data', 'coverage'))
  .filter((file) => file.endsWith('-coverage.json'))
  .sort();

assert(schema.schemaVersion === 'source-evidence-schema/v1', 'invalid source evidence schema version');
assert(manifest.schemaVersion === 'source-manifest/v1', 'invalid source manifest schema version');
assert(Array.isArray(manifest.roots), 'source manifest roots must be an array');
assert(Array.isArray(manifest.files), 'source manifest files must be an array');

const rootIds = new Set(manifest.roots.filter((rootRow) => rootRow.exists).map((rootRow) => rootRow.rootId));
for (const requiredRoot of ['primary:csv', 'primary:erb', 'primary:chara-csv', 'primary:variable-size-csv']) {
  assert(rootIds.has(requiredRoot), 'required primary source root is missing', { requiredRoot });
}

const manifestPaths = new Set(manifest.files.map((file) => file.sourcePath));
const duplicateManifestPaths = manifest.files
  .map((file) => file.sourcePath)
  .filter((sourcePath, index, values) => values.indexOf(sourcePath) !== index);
assert(duplicateManifestPaths.length === 0, 'duplicate source manifest file paths', duplicateManifestPaths.slice(0, 10));

const charaCsvCount = manifest.files.filter((file) => file.sourceKind === 'chara-csv').length;
const variableSizeCount = manifest.files.filter((file) => file.sourceKind === 'variable-size-csv').length;
assert(charaCsvCount === 109, 'Chara CSV count mismatch', { expected: 109, actual: charaCsvCount });
assert(variableSizeCount === 1, 'VariableSize.CSV count mismatch', { expected: 1, actual: variableSizeCount });

const evidenceById = new Map();
collectSourceEvidence(features.rows ?? [], evidenceById);
collectSourceEvidence(definitions.rows ?? [], evidenceById);
collectSourceEvidence(saveMapping?.rows ?? [], evidenceById);
collectSourceEvidence(sessionMapping?.rows ?? [], evidenceById);

validateRows(features.rows, 'feature', (row) => row.featureId, manifest, evidenceById);
validateRows(definitions.rows, 'definition', (row) => row.definitionRowId, manifest, evidenceById);

for (const blocker of blockers.blockers) {
  assert(blocker.sourceEvidenceId, 'blocker row is missing sourceEvidenceId', { blockerId: blocker.blockerId });
  assert(blocker.sourceEvidence, 'blocker row is missing sourceEvidence', { blockerId: blocker.blockerId });
  assert(blocker.sourceEvidence.sourcePath === blocker.sourceLocation, 'blocker source evidence must match sourceLocation', {
    blockerId: blocker.blockerId,
    sourceLocation: blocker.sourceLocation,
    evidencePath: blocker.sourceEvidence.sourcePath,
  });
  assert(existsSourcePath(blocker.sourceEvidence.sourcePath), 'blocker source path does not exist', {
    blockerId: blocker.blockerId,
    sourcePath: blocker.sourceEvidence.sourcePath,
  });
}

if (saveMapping) {
  validateRows(saveMapping.rows ?? [], 'save-mapping', (row) => row.mappingRowId, manifest, evidenceById);
}

if (sessionMapping) {
  validateRows(sessionMapping.rows ?? [], 'session-mapping', (row) => row.mappingRowId, manifest, evidenceById);
}

if (approvedExclusions) {
  validateRows(approvedExclusions.exclusions ?? [], 'approved-exclusion', (row) => row.approvedExclusionId, manifest, evidenceById);
}

let implementationQueueUnitCount = 0;
if (implementationQueue) {
  for (const unit of implementationQueue.queueUnits ?? []) {
    implementationQueueUnitCount += 1;
    const isSourceFileReviewOnly =
      Object.keys(unit.rowCountsByKind ?? {}).length === 1 && Number(unit.rowCountsByKind?.['source-file-review'] ?? 0) > 0;
    assert(
      isSourceFileReviewOnly || (Array.isArray(unit.primarySourceEvidenceIds) && unit.primarySourceEvidenceIds.length > 0),
      'implementation queue unit must keep primary source evidence ids',
      { unitId: unit.unitId },
    );
    assert(
      !isSourceFileReviewOnly || unit.status !== 'completed',
      'source-file-review queue unit cannot be completed without direct row decomposition',
      { unitId: unit.unitId, status: unit.status },
    );
    assert(Array.isArray(unit.sourcePaths) && unit.sourcePaths.length > 0, 'implementation queue unit must keep source paths', {
      unitId: unit.unitId,
    });
    for (const sourcePath of unit.sourcePaths) {
      const manifestFile = manifestFileByPath(manifest, sourcePath);
      assert(manifestFile, 'implementation queue source path is not in source manifest', {
        unitId: unit.unitId,
        sourcePath,
      });
      assert(existsSourcePath(sourcePath), 'implementation queue source path does not exist', {
        unitId: unit.unitId,
        sourcePath,
      });
      assert(manifestFile.sourceTier !== 'auxiliary', 'implementation queue cannot be anchored only to auxiliary source paths', {
        unitId: unit.unitId,
        sourcePath,
      });
    }
  }
}

let milestoneCoverageRowCount = 0;
for (const file of milestoneCoverageFiles) {
  const coverage = readJson(`data/coverage/${file}`);
  const rows = coverage.rows ?? [];
  if (!Array.isArray(rows) || rows.length === 0) continue;
  validateRows(
    rows,
    file,
    (row) => row.coverageRowId ?? row.reviewId ?? row.definitionRowId ?? row.featureId,
    manifest,
    evidenceById,
  );
  milestoneCoverageRowCount += rows.length;
}

console.log(
  `gate:source-evidence passed: ${manifest.files.length} source file(s), ${features.rows.length} feature row(s), ${definitions.rows.length} definition row(s), ${blockers.blockers.length} blocker row(s), ${milestoneCoverageRowCount} milestone coverage row(s).`,
  implementationQueueUnitCount ? ` Implementation queue units checked: ${implementationQueueUnitCount}.` : '',
);
