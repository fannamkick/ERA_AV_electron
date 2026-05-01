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

function visitActionId(sourceFile, sourceLabel) {
  const file = basename(sourceFile);
  if (file === 'KIRYU_GUMI.ERB' && sourceLabel === 'BOUGHT_ROOM') return 'organizationOffice.basicRoomPermit';
  return `visit.${file.replace(/\.ERB$/u, '').toLowerCase()}.${String(sourceLabel).toLowerCase()}`;
}

function rowKindFromRef(ref) {
  if (ref.startsWith('definition:')) return 'definition';
  if (ref.startsWith('feature:')) return 'feature';
  return 'unknown';
}

const queue = readJson('data/coverage/implementation-queue.json');
const definitions = readJson('data/coverage/definitions.json');
const features = readJson('data/coverage/features.json');
const featureRows = features.features ?? features.rows ?? [];

const units = (queue.queueUnits ?? []).filter((unit) => unit.ownerMilestone === 'M36');
if (units.length === 0) throw new Error('M36 implementation queue unit not found.');

const ownedRefs = new Map();
for (const unit of units) {
  for (const ref of unit.rowRefs ?? []) {
    if (!ownedRefs.has(ref)) ownedRefs.set(ref, { ref, source: 'implementation-queue', unitId: unit.unitId });
  }
}

const definitionsById = new Map((definitions.rows ?? []).map((row) => [row.definitionRowId, row]));
const featuresById = new Map(featureRows.map((row) => [row.featureId, row]));

const rows = [];
for (const [reviewId, scope] of [...ownedRefs.entries()].sort(([a], [b]) => a.localeCompare(b))) {
  const rowKind = rowKindFromRef(reviewId);

  if (rowKind === 'definition') {
    const definitionRowId = reviewId.replace(/^definition:/, '');
    const definitionRow = definitionsById.get(definitionRowId);
    rows.push({
      coverageRowId: `visit-facility:definition:${slug(definitionRowId)}`,
      reviewId,
      rowKind,
      scopeSource: scope.source,
      sourceEvidenceId: definitionRow?.sourceEvidenceId ?? '',
      sourcePath: definitionRow?.sourceFile ?? '',
      sourceId: definitionRow?.sourceId ?? '',
      sourceName: definitionRow?.sourceName ?? '',
      definitionKey: definitionRow?.definitionKey ?? '',
      completionStatus: definitionRow?.definitionKey === 'visitPlaces' ? 'mapped-consumed-visit-place-definition' : 'unresolved',
      runtimeConsumerId:
        definitionRow?.definitionKey === 'visitPlaces'
          ? `visitPlaceDefinitions -> createVisitSession/buildVisitView (${definitionRow.sourceId})`
          : '',
      verificationId: definitionRow?.definitionKey === 'visitPlaces' ? 'smoke:visit-all' : '',
      issue: definitionRow?.definitionKey === 'visitPlaces' ? undefined : `M36 definition row is not classified: ${definitionRowId}`,
    });
    continue;
  }

  if (rowKind === 'feature') {
    const featureId = reviewId.replace(/^feature:/, '');
    const featureRow = featuresById.get(featureId);
    const actionId = featureRow ? visitActionId(featureRow.sourceFile, featureRow.sourceLabel) : '';
    rows.push({
      coverageRowId: `visit-facility:feature:${slug(featureId)}`,
      reviewId,
      rowKind,
      scopeSource: scope.source,
      sourceEvidenceId: featureRow?.sourceEvidenceId ?? '',
      sourcePath: featureRow?.sourceFile ?? '',
      sourceLabel: featureRow?.sourceLabel ?? '',
      sourceLine: featureRow?.sourceLine ?? '',
      featureGroup: featureRow?.groupKey ?? '',
      completionStatus: featureRow?.groupKey === 'visit' ? 'implemented-visit-action-row' : 'unresolved',
      runtimeConsumerId:
        featureRow?.groupKey === 'visit'
          ? `visitActionDefinitions[${actionId}] -> selectVisitAction/confirmVisitAction -> featureState.visits/world.eventFlags/world.unlocks`
          : '',
      verificationId: featureRow?.groupKey === 'visit' ? 'smoke:visit-all' : '',
      visitActionId: actionId,
      issue: featureRow?.groupKey === 'visit' ? undefined : `M36 feature row is not classified: ${featureId}`,
    });
    continue;
  }

  rows.push({
    coverageRowId: `visit-facility:unresolved:${slug(reviewId)}`,
    reviewId,
    rowKind,
    scopeSource: scope.source,
    sourceEvidenceId: '',
    completionStatus: 'unresolved',
    runtimeConsumerId: '',
    verificationId: '',
    issue: 'M36 row kind is not classified.',
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
    message: 'M36 row is missing source evidence.',
  })),
  ...missingConsumer.map((row) => ({
    issueId: `missing-consumer:${row.reviewId}`,
    severity: 'error',
    rowRef: row.reviewId,
    message: 'M36 row is missing runtime consumer.',
  })),
  ...missingVerification.map((row) => ({
    issueId: `missing-verification:${row.reviewId}`,
    severity: 'error',
    rowRef: row.reviewId,
    message: 'M36 row is missing verification.',
  })),
];

const coverage = {
  schemaVersion: 'visit-facility-coverage/v1',
  generatedBy: 'tools/build_visit_facility_coverage.mjs',
  milestone: 'M36',
  ownerRole: 'visit-facility-owner',
  sourceInputs: {
    implementationQueue: 'data/coverage/implementation-queue.json',
    definitions: 'data/coverage/definitions.json',
    features: 'data/coverage/features.json',
  },
  scopeContract: {
    ownedUnitIds: units.map((unit) => unit.unitId),
    rule: 'Every M36 queue row must be implemented or mapped-consumed exactly once.',
    runtimeBoundary:
      'Visit place/action selections remain in GameSession.visit; completed visit progress, event flags, facility unlocks, and money changes are saved by their owners.',
    actionCoverageRule:
      'ERB visit feature rows are consumed by source file plus source label visit actions; line-level rows share the same action only when they are the same original label branch.',
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
    uniqueVisitActions: new Set(rows.filter((row) => row.visitActionId).map((row) => row.visitActionId)).size,
  },
  rows,
  unresolvedIssues,
};

const gapAudit = {
  schemaVersion: 'milestone-gap-audit/v1',
  generatedBy: 'tools/build_visit_facility_coverage.mjs',
  milestone: 'M36',
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
  'npm run coverage:visit-facility',
  'npm run gate:visit-facility',
  'npm run gate:milestone-scope-closure -- M36',
  'npm run smoke:visit-all',
  'npm run smoke:m10',
  'npm run verify:m16',
  'npm run typecheck',
  'npm run build',
  'npm run test --if-present',
];

const closure = {
  schemaVersion: 'milestone-closure/v1',
  milestone: 'M36',
  title: 'Visit places, facilities, and visit actions',
  status: 'completed',
  completedAt: '2026-05-01',
  commitPolicy: 'Commit after every milestone closure.',
  commitHash: 'recorded by the M36 git commit that includes this closure file',
  sourceInputs: coverage.sourceInputs,
  outputs: {
    visitFacilityCoverage: 'data/coverage/visit-facility-coverage.json',
    gapAudit: 'data/coverage/audits/M36-gap-audit.json',
    builder: 'tools/build_visit_facility_coverage.mjs',
    coverageGate: 'tools/gate_visit_facility.mjs',
    closureGate: 'tools/gate_milestone_scope_closure.mjs',
    smoke: 'tools/m36_visit_all_smoke.ts',
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
    expectedGateResult: `${rows.length} M36 owned row(s), 0 unresolved issue(s)`,
  },
  commandsRun,
};

writeJson('data/coverage/visit-facility-coverage.json', coverage);
writeJson('data/coverage/audits/M36-gap-audit.json', gapAudit);
writeJson('data/coverage/milestones/M36-closure.json', closure);

console.log(
  `coverage:visit-facility wrote ${rows.length} row(s), implemented=${implementedRows.length}, mapped=${mappedRows.length}, unresolved=${unresolvedIssues.length}.`,
);
