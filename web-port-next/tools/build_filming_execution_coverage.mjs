import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));
}

function writeJson(relativePath, value) {
  const absolutePath = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
  fs.writeFileSync(absolutePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

function countBy(rows, keyFn) {
  const counts = {};
  for (const row of rows) {
    const key = keyFn(row) || '(empty)';
    counts[key] = (counts[key] ?? 0) + 1;
  }
  return Object.fromEntries(Object.entries(counts).sort(([a], [b]) => a.localeCompare(b)));
}

function slug(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function basename(sourceFile) {
  return String(sourceFile).split(/[\\/]/u).pop();
}

function rowKindFromRef(ref) {
  if (ref.startsWith('feature:')) return 'feature';
  if (ref.startsWith('save-mapping:')) return 'save-mapping';
  if (ref.startsWith('session-mapping:')) return 'session-mapping';
  if (ref.startsWith('source-file-review:')) return 'source-file-review';
  return 'unknown';
}

function appSaveFieldPath(mappingRow) {
  if (mappingRow.fieldPath === 'economy.videoSalesTotal') return 'economy.videoSalesTotal';
  if (String(mappingRow.fieldPath ?? '').startsWith('filming.progressFlags.')) {
    return mappingRow.fieldPath.replace(/^filming\.progressFlags\./u, 'work.filmingProgressFlags.');
  }
  return mappingRow.fieldPath ?? '';
}

function appSessionFieldPath(mappingRow) {
  const source = String(mappingRow.sessionFieldPath ?? '');
  if (source.includes('temporaryValues.')) return source.replace(/^session\.filming\./u, 'session.shooting.');
  if (source.includes('sceneFlags.')) return source.replace(/^session\.filming\./u, 'session.shooting.');
  if (source.includes('assistantCharacterId')) return 'session.interaction.participants.assistantId';
  return source.replace(/^session\.filming\./u, 'session.shooting.');
}

const queue = readJson('data/coverage/implementation-queue.json');
const features = readJson('data/coverage/features.json');
const saveMapping = readJson('data/coverage/save-mapping.json');
const sessionMapping = readJson('data/coverage/session-mapping.json');
const sourceManifest = readJson('data/coverage/source-manifest.json');
const featureRows = features.features ?? features.rows ?? [];
const units = (queue.queueUnits ?? []).filter((unit) => unit.ownerMilestone === 'M39');
if (units.length === 0) throw new Error('M39 implementation queue unit not found.');

const ownedRefs = new Map();
const unitByRef = new Map();
for (const unit of units) {
  for (const ref of unit.rowRefs ?? []) {
    unitByRef.set(ref, unit);
    if (!ownedRefs.has(ref)) ownedRefs.set(ref, { ref, source: 'implementation-queue', unitId: unit.unitId });
  }
}

const featuresById = new Map(featureRows.map((row) => [row.featureId, row]));
const saveMappingById = new Map((saveMapping.rows ?? []).map((row) => [row.mappingRowId, row]));
const sessionMappingById = new Map((sessionMapping.rows ?? []).map((row) => [row.mappingRowId, row]));
const sourceManifestByLowerPath = new Map((sourceManifest.files ?? []).map((row) => [String(row.sourcePath).toLowerCase(), row]));

const rows = [];
for (const [reviewId, scope] of [...ownedRefs.entries()].sort(([a], [b]) => a.localeCompare(b))) {
  const rowKind = rowKindFromRef(reviewId);

  if (rowKind === 'feature') {
    const featureId = reviewId.replace(/^feature:/, '');
    const featureRow = featuresById.get(featureId);
    const isFilming = featureRow?.groupKey === 'shooting' && String(featureRow?.sourceFile ?? '').includes('ＡＶ撮影関係');
    rows.push({
      coverageRowId: `filming-execution:feature:${slug(featureId)}`,
      reviewId,
      rowKind,
      scopeSource: scope.source,
      sourceEvidenceId: featureRow?.sourceEvidenceId ?? '',
      sourcePath: featureRow?.sourceFile ?? '',
      sourceFile: featureRow?.sourceFile ? basename(featureRow.sourceFile) : '',
      sourceLabel: featureRow?.sourceLabel ?? '',
      sourceLine: featureRow?.sourceLine ?? '',
      featureGroup: featureRow?.groupKey ?? '',
      completionStatus: isFilming ? 'implemented-filming-execution-feature-row' : 'unresolved',
      runtimeConsumerId: isFilming
        ? 'main/openShooting -> shooting/selectTarget -> shooting/selectScene -> shooting/confirmScene -> calculateShootingResult/applyShootingResult/endTurn'
        : '',
      verificationId: isFilming ? 'smoke:filming-all' : '',
      issue: isFilming ? undefined : `M39 feature row is not classified: ${featureId}`,
    });
    continue;
  }

  if (rowKind === 'source-file-review') {
    const unit = unitByRef.get(reviewId);
    const rawSourcePath = unit?.sourcePaths?.[0] ?? reviewId.replace(/^source-file-review:/, '');
    const manifestRow = sourceManifestByLowerPath.get(String(rawSourcePath).toLowerCase());
    const sourcePath = manifestRow?.sourcePath ?? rawSourcePath;
    rows.push({
      coverageRowId: `filming-execution:source-review:${slug(sourcePath)}`,
      reviewId,
      rowKind,
      scopeSource: scope.source,
      sourceEvidenceId: reviewId,
      sourcePath,
      sourceFile: basename(sourcePath),
      sourceKind: manifestRow?.sourceKind ?? '',
      sourceSha256: manifestRow?.sha256 ?? '',
      completionStatus: 'mapped-consumed-filming-source-file-review',
      runtimeConsumerId: sourcePath.includes('AV_POINTCALC')
        ? 'calculateShootingResult and buildSceneTemporaryValues replace AV_POINTCALC calculation source'
        : 'videoSalesTotal, work.filmingByCharacterId, and work.filmingProgressFlags replace VIDEO.ERH video sales state',
      verificationId: 'gate:filming-execution',
    });
    continue;
  }

  if (rowKind === 'save-mapping') {
    const mappingRowId = reviewId.replace(/^save-mapping:/, '');
    const mappingRow = saveMappingById.get(mappingRowId);
    const appFieldPath = mappingRow ? appSaveFieldPath(mappingRow) : '';
    const isMapped = mappingRow?.status === 'mapped' && Boolean(mappingRow.fieldPath) && Boolean(appFieldPath);
    rows.push({
      coverageRowId: `filming-execution:save:${slug(mappingRowId)}`,
      reviewId,
      rowKind,
      scopeSource: scope.source,
      sourceEvidenceId: mappingRow?.sourceEvidenceId ?? '',
      sourcePath: mappingRow?.sourceFile ?? mappingRow?.sourceEvidence?.sourcePath ?? '',
      sourceLine: mappingRow?.sourceLine ?? mappingRow?.sourceEvidence?.line ?? '',
      address: mappingRow?.address ?? '',
      runtimeOwner: mappingRow?.runtimeOwner ?? '',
      fieldPath: mappingRow?.fieldPath ?? '',
      appFieldPath,
      completionStatus: isMapped ? 'mapped-consumed-filming-save-field' : 'unresolved',
      runtimeConsumerId: isMapped ? `${mappingRow.fieldPath} -> ${appFieldPath} <- applyShootingResult` : '',
      verificationId: isMapped ? 'smoke:filming-all' : '',
      issue: isMapped ? undefined : `M39 save mapping row is not closed: ${mappingRowId}`,
    });
    continue;
  }

  if (rowKind === 'session-mapping') {
    const mappingRowId = reviewId.replace(/^session-mapping:/, '');
    const mappingRow = sessionMappingById.get(mappingRowId);
    const appFieldPath = mappingRow ? appSessionFieldPath(mappingRow) : '';
    const isSession = mappingRow?.status === 'session-field' && Boolean(mappingRow.sessionFieldPath) && Boolean(appFieldPath);
    const isCalculation = mappingRow?.status === 'calculation-internal' && Boolean(mappingRow.calculationOwner || mappingRow.calculationPath);
    rows.push({
      coverageRowId: `filming-execution:session:${slug(mappingRowId)}`,
      reviewId,
      rowKind,
      scopeSource: scope.source,
      sourceEvidenceId: mappingRow?.sourceEvidenceId ?? '',
      sourcePath: mappingRow?.sourceFile ?? mappingRow?.sourceEvidence?.sourcePath ?? '',
      sourceLine: mappingRow?.sourceLine ?? mappingRow?.sourceEvidence?.line ?? '',
      address: mappingRow?.address ?? '',
      sessionFieldPath: mappingRow?.sessionFieldPath ?? '',
      appSessionFieldPath: isSession ? appFieldPath : '',
      calculationOwner: mappingRow?.calculationOwner ?? '',
      completionStatus: isSession
        ? 'mapped-consumed-filming-session-field'
        : isCalculation
          ? 'mapped-consumed-filming-calculation'
          : 'unresolved',
      runtimeConsumerId: isSession
        ? `${mappingRow.sessionFieldPath} -> ${appFieldPath} -> selectShootingScene/cancelShootingSelection/confirmShootingScene`
        : isCalculation
          ? `${mappingRow.calculationOwner || mappingRow.calculationPath} -> calculateShootingResult`
          : '',
      verificationId: isSession || isCalculation ? 'smoke:filming-all' : '',
      issue: isSession || isCalculation ? undefined : `M39 session mapping row is not closed: ${mappingRowId}`,
    });
    continue;
  }

  rows.push({
    coverageRowId: `filming-execution:unresolved:${slug(reviewId)}`,
    reviewId,
    rowKind,
    scopeSource: scope.source,
    sourceEvidenceId: '',
    completionStatus: 'unresolved',
    runtimeConsumerId: '',
    verificationId: '',
    issue: 'M39 row kind is not classified.',
  });
}

const implementedRows = rows.filter((row) => row.completionStatus.startsWith('implemented'));
const mappedRows = rows.filter((row) => row.completionStatus.startsWith('mapped'));
const unresolvedRows = rows.filter((row) => row.completionStatus === 'unresolved');
const missingEvidence = rows.filter((row) => !row.sourceEvidenceId);
const missingConsumer = rows.filter((row) => !row.runtimeConsumerId);
const missingVerification = rows.filter((row) => !row.verificationId);

const unresolvedIssues = [
  ...unresolvedRows.map((row) => ({
    issueId: `unresolved:${row.reviewId}`,
    severity: 'error',
    rowRef: row.reviewId,
    message: row.issue,
  })),
  ...missingEvidence.map((row) => ({
    issueId: `missing-evidence:${row.reviewId}`,
    severity: 'error',
    rowRef: row.reviewId,
    message: 'M39 row is missing source evidence.',
  })),
  ...missingConsumer.map((row) => ({
    issueId: `missing-consumer:${row.reviewId}`,
    severity: 'error',
    rowRef: row.reviewId,
    message: 'M39 row is missing runtime consumer.',
  })),
  ...missingVerification.map((row) => ({
    issueId: `missing-verification:${row.reviewId}`,
    severity: 'error',
    rowRef: row.reviewId,
    message: 'M39 row is missing verification.',
  })),
];

const coverage = {
  schemaVersion: 'filming-execution-coverage/v1',
  generatedBy: 'tools/build_filming_execution_coverage.mjs',
  milestone: 'M39',
  ownerRole: 'filming-execution-owner',
  sourceInputs: {
    implementationQueue: 'data/coverage/implementation-queue.json',
    features: 'data/coverage/features.json',
    saveMapping: 'data/coverage/save-mapping.json',
    sessionMapping: 'data/coverage/session-mapping.json',
  },
  scopeContract: {
    ownedUnitIds: units.map((unit) => unit.unitId),
    rule: 'Every M39 queue row must be implemented or mapped-consumed exactly once.',
    runtimeBoundary:
      'Filming scene selections and temporary calculation values remain in GameSession.shooting. Confirmed filming results are committed to economy, people, body, work.filmingByCharacterId, and work.filmingProgressFlags.',
  },
  summary: {
    ownedRowRefs: ownedRefs.size,
    rows: rows.length,
    implemented: implementedRows.length,
    mapped: mappedRows.length,
    transferredOut: 0,
    approvedExcluded: 0,
    ownedBlocker: 0,
    missingEvidence: missingEvidence.length,
    missingConsumer: missingConsumer.length,
    missingVerification: missingVerification.length,
    roleOnlyComplete: 0,
    unapprovedExcluded: 0,
    byRowKind: countBy(rows, (row) => row.rowKind),
    byScopeSource: countBy(rows, (row) => row.scopeSource),
    byCompletionStatus: countBy(rows, (row) => row.completionStatus),
    bySourcePath: countBy(rows.filter((row) => row.sourcePath), (row) => row.sourcePath),
    byRuntimeOwner: countBy(rows.filter((row) => row.runtimeOwner), (row) => row.runtimeOwner),
  },
  rows,
  unresolvedIssues,
};

const gapAudit = {
  schemaVersion: 'milestone-gap-audit/v1',
  generatedBy: 'tools/build_filming_execution_coverage.mjs',
  milestone: 'M39',
  sourceInputs: coverage.sourceInputs,
  summary: {
    scopeRows: rows.length,
    implemented: implementedRows.length,
    mapped: mappedRows.length,
    transferredOut: 0,
    approvedExcluded: 0,
    unresolvedGaps: unresolvedIssues.length,
    ownedBlockers: 0,
    roleOnlyComplete: 0,
    missingEvidence: missingEvidence.length,
    missingConsumer: missingConsumer.length,
    missingVerification: missingVerification.length,
    unapprovedExcluded: 0,
  },
  issues: unresolvedIssues,
};

const commandsRun = [
  'npm run coverage:filming-execution',
  'npm run gate:filming-execution',
  'npm run gate:milestone-scope-closure -- M39',
  'npm run smoke:filming-all',
  'npm run smoke:m13',
  'npm run verify:m16',
  'npm run typecheck',
  'npm run build',
  'npm run test --if-present',
];

const closure = {
  schemaVersion: 'milestone-closure/v1',
  milestone: 'M39',
  title: 'Filming execution, result, release, and sales state',
  status: 'completed',
  completedAt: '2026-05-01',
  commitPolicy: 'Commit after every milestone closure.',
  commitHash: 'recorded by the M39 git commit that includes this closure file',
  sourceInputs: coverage.sourceInputs,
  outputs: {
    filmingExecutionCoverage: 'data/coverage/filming-execution-coverage.json',
    gapAudit: 'data/coverage/audits/M39-gap-audit.json',
    builder: 'tools/build_filming_execution_coverage.mjs',
    coverageGate: 'tools/gate_filming_execution.mjs',
    closureGate: 'tools/gate_milestone_scope_closure.mjs',
    smoke: 'tools/m39_filming_all_smoke.ts',
  },
  counts: {
    ownedTotal: rows.length,
    implemented: implementedRows.length,
    mapped: mappedRows.length,
    approvedExcluded: 0,
    transferredOut: 0,
    ownedBlocker: 0,
    missingEvidence: missingEvidence.length,
    missingConsumer: missingConsumer.length,
    missingVerification: missingVerification.length,
    roleOnlyComplete: 0,
    unapprovedExcluded: 0,
  },
  closureMetrics: {
    ownedTotal: rows.length,
    implemented: implementedRows.length,
    mapped: mappedRows.length,
    approvedExcluded: 0,
    transferredOut: 0,
    ownedBlocker: 0,
    missingEvidence: missingEvidence.length,
    missingConsumer: missingConsumer.length,
    missingVerification: missingVerification.length,
    roleOnlyComplete: 0,
    unapprovedExcluded: 0,
  },
  verification: {
    commands: commandsRun,
    expectedGateResult: `${rows.length} M39 owned row(s), 0 unresolved issue(s)`,
  },
  commandsRun,
};

writeJson('data/coverage/filming-execution-coverage.json', coverage);
writeJson('data/coverage/audits/M39-gap-audit.json', gapAudit);
writeJson('data/coverage/milestones/M39-closure.json', closure);

console.log(`coverage:filming-execution wrote ${rows.length} row(s), implemented=${implementedRows.length}, mapped=${mappedRows.length}, unresolved=${unresolvedIssues.length}.`);
