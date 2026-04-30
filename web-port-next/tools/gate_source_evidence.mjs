import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const workspaceRoot = path.resolve(root, '..');

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));
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

function validateEvidence(row, rowId, rowKind, manifestPaths) {
  const evidence = row.sourceEvidence;
  const hardCompletionStatuses = new Set(['implemented', 'used', 'template', 'listing', 'approved-excluded']);

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
    evidence.sourceTier !== 'auxiliary' || !hardCompletionStatuses.has(row.status),
    `${rowKind} row cannot use auxiliary evidence as completion evidence`,
    { rowId, status: row.status, sourcePath: evidence.sourcePath },
  );
  assert(evidence.sourcePath && evidence.sourcePath === row.sourceFile, `${rowKind} source path must match sourceFile`, {
    rowId,
    sourceFile: row.sourceFile,
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
    assert(evidence.csvRow, 'definition row requires csvRow/source id evidence', { rowId });
    if (row.sourceKind === 'character-seed') {
      assert(evidence.family && evidence.index, 'character seed evidence requires family and index', { rowId });
    }
  }
}

const schema = readJson('data/coverage/source-evidence.schema.json');
const manifest = readJson('data/coverage/source-manifest.json');
const features = readJson('data/coverage/features.json');
const definitions = readJson('data/coverage/definitions.json');
const blockers = readJson('data/coverage/blockers.json');

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

for (const row of features.rows) {
  validateEvidence(row, row.featureId, 'feature', manifestPaths);
}

for (const row of definitions.rows) {
  validateEvidence(row, row.definitionRowId, 'definition', manifestPaths);
}

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

console.log(
  `gate:source-evidence passed: ${manifest.files.length} source file(s), ${features.rows.length} feature row(s), ${definitions.rows.length} definition row(s), ${blockers.blockers.length} blocker row(s).`,
);
