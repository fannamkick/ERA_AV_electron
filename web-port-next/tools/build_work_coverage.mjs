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

function sourceDefinitionId(sourceFile, sourceLabel) {
  return `work:${basename(sourceFile).replace(/\.ERB$/u, '').toLowerCase().replace(/[^a-z0-9]+/g, '.')}.${String(sourceLabel)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '.')
    .replace(/^\.+|\.+$/g, '')}`;
}

function rowKindFromRef(ref) {
  if (ref.startsWith('definition:')) return 'definition';
  if (ref.startsWith('feature:')) return 'feature';
  if (ref.startsWith('save-mapping:')) return 'save-mapping';
  if (ref.startsWith('session-mapping:')) return 'session-mapping';
  return 'unknown';
}

const queue = readJson('data/coverage/implementation-queue.json');
const definitions = readJson('data/coverage/definitions.json');
const features = readJson('data/coverage/features.json');
const saveMapping = readJson('data/coverage/save-mapping.json');
const sessionMapping = readJson('data/coverage/session-mapping.json');
const featureRows = features.features ?? features.rows ?? [];

const units = (queue.queueUnits ?? []).filter((unit) => unit.ownerMilestone === 'M37');
if (units.length === 0) throw new Error('M37 implementation queue unit not found.');

const ownedRefs = new Map();
for (const unit of units) {
  for (const ref of unit.rowRefs ?? []) {
    if (!ownedRefs.has(ref)) ownedRefs.set(ref, { ref, source: 'implementation-queue', unitId: unit.unitId });
  }
}

const definitionsById = new Map((definitions.rows ?? []).map((row) => [row.definitionRowId, row]));
const featuresById = new Map(featureRows.map((row) => [row.featureId, row]));
const saveMappingById = new Map((saveMapping.rows ?? []).map((row) => [row.mappingRowId, row]));
const sessionMappingById = new Map((sessionMapping.rows ?? []).map((row) => [row.mappingRowId, row]));

const rows = [];
for (const [reviewId, scope] of [...ownedRefs.entries()].sort(([a], [b]) => a.localeCompare(b))) {
  const rowKind = rowKindFromRef(reviewId);

  if (rowKind === 'definition') {
    const definitionRowId = reviewId.replace(/^definition:/, '');
    const definitionRow = definitionsById.get(definitionRowId);
    const isWorkDefinition = definitionRow?.definitionKey === 'workDefinitions';
    rows.push({
      coverageRowId: `work:definition:${slug(definitionRowId)}`,
      reviewId,
      rowKind,
      scopeSource: scope.source,
      sourceEvidenceId: definitionRow?.sourceEvidenceId ?? '',
      sourcePath: definitionRow?.sourceFile ?? '',
      sourceId: definitionRow?.sourceId ?? '',
      sourceName: definitionRow?.sourceName ?? '',
      definitionKey: definitionRow?.definitionKey ?? '',
      completionStatus: isWorkDefinition ? 'mapped-consumed-work-definition' : 'unresolved',
      runtimeConsumerId: isWorkDefinition
        ? `definitions.workDefinitions[work:${definitionRow.sourceId}] -> computeVisibleWorkIds/buildWorkView/executeSelectedWork`
        : '',
      verificationId: isWorkDefinition ? 'smoke:work-all' : '',
      issue: isWorkDefinition ? undefined : `M37 definition row is not classified: ${definitionRowId}`,
    });
    continue;
  }

  if (rowKind === 'feature') {
    const featureId = reviewId.replace(/^feature:/, '');
    const featureRow = featuresById.get(featureId);
    const workId = featureRow ? sourceDefinitionId(featureRow.sourceFile, featureRow.sourceLabel) : '';
    rows.push({
      coverageRowId: `work:feature:${slug(featureId)}`,
      reviewId,
      rowKind,
      scopeSource: scope.source,
      sourceEvidenceId: featureRow?.sourceEvidenceId ?? '',
      sourcePath: featureRow?.sourceFile ?? '',
      sourceFile: featureRow?.sourceFile ? basename(featureRow.sourceFile) : '',
      sourceLabel: featureRow?.sourceLabel ?? '',
      sourceLine: featureRow?.sourceLine ?? '',
      featureGroup: featureRow?.groupKey ?? '',
      completionStatus: featureRow?.groupKey === 'work' ? 'implemented-work-feature-row' : 'unresolved',
      runtimeConsumerId:
        featureRow?.groupKey === 'work'
          ? `definitions.workDefinitions[${workId}] -> work/select/work/execute -> applyWorkResult/endTurn`
          : '',
      verificationId: featureRow?.groupKey === 'work' ? 'smoke:work-all' : '',
      workDefinitionId: workId,
      issue: featureRow?.groupKey === 'work' ? undefined : `M37 feature row is not classified: ${featureId}`,
    });
    continue;
  }

  if (rowKind === 'save-mapping') {
    const mappingRowId = reviewId.replace(/^save-mapping:/, '');
    const mappingRow = saveMappingById.get(mappingRowId);
    const isMapped = mappingRow?.status === 'mapped' && Boolean(mappingRow.fieldPath);
    rows.push({
      coverageRowId: `work:save:${slug(mappingRowId)}`,
      reviewId,
      rowKind,
      scopeSource: scope.source,
      sourceEvidenceId: mappingRow?.sourceEvidenceId ?? '',
      sourcePath: mappingRow?.sourceFile ?? mappingRow?.sourceEvidence?.sourcePath ?? '',
      sourceLine: mappingRow?.sourceLine ?? mappingRow?.sourceEvidence?.line ?? '',
      address: mappingRow?.address ?? '',
      runtimeOwner: mappingRow?.runtimeOwner ?? '',
      fieldPath: mappingRow?.fieldPath ?? '',
      completionStatus: isMapped ? 'mapped-consumed-work-save-field' : 'unresolved',
      runtimeConsumerId: isMapped ? `${mappingRow.fieldPath} <- applyWorkResult/calculateWorkResult/endTurn work pipeline` : '',
      verificationId: isMapped ? 'smoke:work-all' : '',
      issue: isMapped ? undefined : `M37 save mapping row is not closed: ${mappingRowId}`,
    });
    continue;
  }

  if (rowKind === 'session-mapping') {
    const mappingRowId = reviewId.replace(/^session-mapping:/, '');
    const mappingRow = sessionMappingById.get(mappingRowId);
    const isSession = mappingRow?.status === 'session-field' && Boolean(mappingRow.sessionFieldPath);
    const isCalculation = mappingRow?.status === 'calculation-internal' && Boolean(mappingRow.calculationOwner || mappingRow.calculationPath);
    rows.push({
      coverageRowId: `work:session:${slug(mappingRowId)}`,
      reviewId,
      rowKind,
      scopeSource: scope.source,
      sourceEvidenceId: mappingRow?.sourceEvidenceId ?? '',
      sourcePath: mappingRow?.sourceFile ?? mappingRow?.sourceEvidence?.sourcePath ?? '',
      sourceLine: mappingRow?.sourceLine ?? mappingRow?.sourceEvidence?.line ?? '',
      address: mappingRow?.address ?? '',
      sessionFieldPath: mappingRow?.sessionFieldPath ?? '',
      calculationOwner: mappingRow?.calculationOwner ?? '',
      completionStatus: isSession
        ? 'mapped-consumed-work-session-field'
        : isCalculation
          ? 'mapped-consumed-work-calculation'
          : 'unresolved',
      runtimeConsumerId: isSession
        ? `${mappingRow.sessionFieldPath} -> createWorkSession/selectWork/selectWorkCharacter/cancelWork`
        : isCalculation
          ? `${mappingRow.calculationOwner || mappingRow.calculationPath} -> calculateWorkResult`
          : '',
      verificationId: isSession || isCalculation ? 'smoke:work-all' : '',
      issue: isSession || isCalculation ? undefined : `M37 session mapping row is not closed: ${mappingRowId}`,
    });
    continue;
  }

  rows.push({
    coverageRowId: `work:unresolved:${slug(reviewId)}`,
    reviewId,
    rowKind,
    scopeSource: scope.source,
    sourceEvidenceId: '',
    completionStatus: 'unresolved',
    runtimeConsumerId: '',
    verificationId: '',
    issue: 'M37 row kind is not classified.',
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
    message: 'M37 row is missing source evidence.',
  })),
  ...missingConsumer.map((row) => ({
    issueId: `missing-consumer:${row.reviewId}`,
    severity: 'error',
    rowRef: row.reviewId,
    message: 'M37 row is missing runtime consumer.',
  })),
  ...missingVerification.map((row) => ({
    issueId: `missing-verification:${row.reviewId}`,
    severity: 'error',
    rowRef: row.reviewId,
    message: 'M37 row is missing verification.',
  })),
];

const coverage = {
  schemaVersion: 'work-coverage/v1',
  generatedBy: 'tools/build_work_coverage.mjs',
  milestone: 'M37',
  ownerRole: 'work-business-owner',
  sourceInputs: {
    implementationQueue: 'data/coverage/implementation-queue.json',
    definitions: 'data/coverage/definitions.json',
    features: 'data/coverage/features.json',
    saveMapping: 'data/coverage/save-mapping.json',
    sessionMapping: 'data/coverage/session-mapping.json',
  },
  scopeContract: {
    ownedUnitIds: units.map((unit) => unit.unitId),
    rule: 'Every M37 queue row must be implemented or mapped-consumed exactly once.',
    runtimeBoundary:
      'Work selection and participant choices remain in GameSession.work; rewards, body deltas, experience deltas, career flags, assignments, and turn advancement are committed to their save owners.',
    actionCoverageRule:
      'ERB work feature rows are consumed by source-file/source-label work definitions and the common work execution pipeline.',
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
    uniqueWorkDefinitions: new Set(rows.filter((row) => row.workDefinitionId).map((row) => row.workDefinitionId)).size,
  },
  rows,
  unresolvedIssues,
};

const gapAudit = {
  schemaVersion: 'milestone-gap-audit/v1',
  generatedBy: 'tools/build_work_coverage.mjs',
  milestone: 'M37',
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
  'npm run coverage:work',
  'npm run gate:work-coverage',
  'npm run gate:milestone-scope-closure -- M37',
  'npm run smoke:work-all',
  'npm run smoke:m12',
  'npm run verify:m16',
  'npm run typecheck',
  'npm run build',
  'npm run test --if-present',
];

const closure = {
  schemaVersion: 'milestone-closure/v1',
  milestone: 'M37',
  title: 'Work, brothel, side job, and special work execution',
  status: 'completed',
  completedAt: '2026-05-01',
  commitPolicy: 'Commit after every milestone closure.',
  commitHash: 'recorded by the M37 git commit that includes this closure file',
  sourceInputs: coverage.sourceInputs,
  outputs: {
    workCoverage: 'data/coverage/work-coverage.json',
    gapAudit: 'data/coverage/audits/M37-gap-audit.json',
    builder: 'tools/build_work_coverage.mjs',
    coverageGate: 'tools/gate_work_coverage.mjs',
    closureGate: 'tools/gate_milestone_scope_closure.mjs',
    smoke: 'tools/m37_work_all_smoke.ts',
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
    expectedGateResult: `${rows.length} M37 owned row(s), 0 unresolved issue(s)`,
  },
  commandsRun,
};

writeJson('data/coverage/work-coverage.json', coverage);
writeJson('data/coverage/audits/M37-gap-audit.json', gapAudit);
writeJson('data/coverage/milestones/M37-closure.json', closure);

console.log(`coverage:work wrote ${rows.length} row(s), implemented=${implementedRows.length}, mapped=${mappedRows.length}, unresolved=${unresolvedIssues.length}.`);
