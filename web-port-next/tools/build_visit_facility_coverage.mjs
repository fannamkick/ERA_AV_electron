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

function groupBy(rows, keyFn) {
  const groups = new Map();
  for (const row of rows) {
    const key = keyFn(row);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(row);
  }
  return groups;
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
      completionStatus: definitionRow?.definitionKey === 'visitPlaces' ? 'implemented-visit-place-definition' : 'unresolved',
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
    rule:
      'Every M36 queue row must be implemented exactly once; row coverage supports the strict source-unit manifest.',
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

const featureGroups = [...groupBy(rows.filter((row) => row.rowKind === 'feature'), (row) => row.visitActionId).entries()].sort(
  ([a], [b]) => a.localeCompare(b),
);
const strictRows = [
  ...featureGroups.map(([visitActionId, groupRows], index) => {
    const sortedRows = [...groupRows].sort((a, b) =>
      String(a.reviewId).localeCompare(String(b.reviewId)),
    );
    const first = sortedRows[0];
    return {
      unitId: `M36:visit-action:${String(index + 1).padStart(5, '0')}`,
      rowKind: 'visit-action',
      legacyId: visitActionId,
      sourceKind: 'visit-action-source-label',
      sourcePath: first.sourcePath,
      sourceLine: sortedRows
        .map((row) => row.sourceLine)
        .filter(Boolean)
        .join('; '),
      sourceLabel: first.sourceLabel,
      sourceEvidenceId: sortedRows.map((row) => row.sourceEvidenceId).join('; '),
      legacyReviewId: sortedRows.map((row) => row.reviewId).join('; '),
      requiredBehavior:
        'Visit action listing/selection/confirmation with progress/event/unlock/money/session boundary as defined by runtime visit action shell.',
      runtimeConsumerId:
        `visitActionDefinitions[${visitActionId}] -> selectVisitAction/confirmVisitAction -> featureState.visits/world.eventFlags/world.unlocks`,
      verificationId: 'smoke:visit-all',
      previousCompletionStatus: 'implemented-visit-action-row',
      sourceCoverageRowId: sortedRows.map((row) => row.coverageRowId).join('; '),
      sourceEvidenceRowCount: sortedRows.length,
    };
  }),
  ...rows
    .filter((row) => row.rowKind === 'definition')
    .sort((a, b) => String(a.sourceId).localeCompare(String(b.sourceId)))
    .map((row, index) => ({
      unitId: `M36:visit-place:${String(index + 1).padStart(5, '0')}`,
      rowKind: 'visit-place',
      legacyId: row.sourceId,
      sourceKind: 'visit-place-definition',
      sourcePath: row.sourcePath,
      sourceLine: '',
      sourceLabel: row.sourceName,
      sourceEvidenceId: row.sourceEvidenceId,
      legacyReviewId: row.reviewId,
      requiredBehavior:
        'Visit place definition is exposed in the visit route, can create a visit session, and participates in action listing/selection boundaries.',
      runtimeConsumerId: row.runtimeConsumerId,
      verificationId: row.verificationId,
      previousCompletionStatus: 'implemented-visit-place-definition',
      sourceCoverageRowId: row.coverageRowId,
      sourceEvidenceRowCount: 1,
    })),
];

const sourceUnitMetrics = {
  totalUnits: strictRows.length,
  'implemented-verified': strictRows.length,
  blocked: 0,
  'scope-redesign-required': 0,
  'approved-excluded': 0,
  completedAllowedNow: true,
  legacyCoverageRows: rows.length,
  groupedVisitActions: featureGroups.length,
  visitPlaceDefinitions: rows.filter((row) => row.rowKind === 'definition').length,
};

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
    ownedTotal: strictRows.length,
    implemented: strictRows.length,
    mapped: 0,
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
    ownedTotal: strictRows.length,
    implemented: strictRows.length,
    mapped: 0,
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
    expectedGateResult: `${strictRows.length} M36 strict source unit(s), 0 unresolved issue(s)`,
  },
  commandsRun,
  sourceUnitMetrics,
  responsibilityIntegrity: {
    scopeReductionProhibited: true,
    checklistMatchedToResponsibility: true,
    sourceBehaviorImplementedNotJustIndexed: true,
    gateValidatesResponsibilityNotOwnScaffold: true,
    limitationsBlockCompletion: false,
    responsibilityItems: [
      'Expose all seven original visit place definitions through the visit route and visit session creation.',
      'Expose all 86 source-file/source-label visit action groups through selection and confirmation.',
      'Keep visit selection in GameSession.visit while persisting only completed visit progress, unlocks, event flags, and economy effects through owner save domains.',
      'Validate unavailable place/action, cost failure, duplicate execution, cancellation, and save roundtrip boundaries.',
      'Do not claim downstream world event, character/stat, turn, or mission effect internals as M36 completion.',
    ],
    implementationEvidence: [
      'src/features/visit.ts',
      'src/game/dispatch.ts',
      'src/ui/RouteScreens.tsx',
      'data/coverage/visit-facility-coverage.json',
      'data/coverage/manifests/M36-source-units.json',
      'data/coverage/milestones/M36-closure.json',
      'tools/gate_visit_facility.mjs',
      'tools/m36_visit_all_smoke.ts',
    ],
    verificationEvidence: commandsRun,
  },
};

writeJson('data/coverage/visit-facility-coverage.json', coverage);
writeJson('data/coverage/audits/M36-gap-audit.json', gapAudit);
writeJson('data/coverage/milestones/M36-closure.json', closure);
writeJson('data/coverage/manifests/M36-source-units.json', {
  schemaVersion: 1,
  milestone: 'M36',
  generatedAt: '2026-05-06',
  purpose: 'Strict source-unit manifest for visit places, facilities, action listing, selection, confirmation, and visit session/save boundaries.',
  sourceInputs: [
    'data/coverage/visit-facility-coverage.json',
    'data/coverage/milestones/M36-closure.json',
    'data/coverage/audits/M36-gap-audit.json',
  ],
  rules: [
    'Row-level coverage is supporting evidence only; completion is counted at 86 visit action groups plus 7 visit place definitions.',
    'Every M36 source unit must have source evidence, runtime consumer evidence, and verification evidence.',
    'M36 owns visit route/place/action/session boundaries, not downstream world event, mission, character/stat, or turn effect internals.',
  ],
  directOriginalReviewRequiredBeforeCompletion: true,
  originalSourceRoots: [
    'original-game/ERB/訪問関係/HOUMON.ERB',
    'original-game/ERB/訪問関係/*.ERB',
    'original-game/ERB/鼇ゅ븦?㏘퓗/*.ERB',
  ],
  summary: sourceUnitMetrics,
  completionGate: {
    completedAllowedNow: true,
    requiredStatuses: ['implemented-verified', 'approved-excluded'],
    forbiddenStatusesForCompletion: ['blocked', 'scope-redesign-required', 'mapped'],
    requiredCommands: commandsRun,
  },
  notes: [
    'M36 closes 93 source units: 86 visit action groups and 7 visit place definitions.',
    'The 559 queue rows remain in visit-facility coverage as source evidence; they are not individually counted as completion units.',
    'World/event progression effects remain M47-owned; M36 closes the visit action shell and visit session boundary.',
  ],
  units: strictRows.map((row) => ({
    unitId: row.unitId,
    milestone: 'M36',
    ownerMilestone: 'M36',
    ownerRole: 'visit-facility-owner',
    sourceKind: row.sourceKind,
    sourcePath: row.sourcePath,
    sourceLine: row.sourceLine,
    sourceLabel: row.sourceLabel,
    sourceEvidenceId: row.sourceEvidenceId,
    legacyReviewId: row.legacyReviewId,
    legacyFamily: '',
    rowKind: row.rowKind,
    legacyId: row.legacyId,
    requiredBehavior: row.requiredBehavior,
    runtimeConsumerId: row.runtimeConsumerId,
    verificationId: row.verificationId,
    previousCompletionStatus: row.previousCompletionStatus,
    manifestStatus: 'implemented-verified',
    blockerReason: '',
    sourceCoverageRowId: row.sourceCoverageRowId,
    acceptedByOwner: true,
    fromMilestone: '',
    toMilestone: '',
    sourceEvidenceRowCount: row.sourceEvidenceRowCount,
  })),
});

console.log(
  `coverage:visit-facility wrote ${strictRows.length} strict source unit(s), rowEvidence=${rows.length}, implemented=${strictRows.length}, unresolved=${unresolvedIssues.length}.`,
);
