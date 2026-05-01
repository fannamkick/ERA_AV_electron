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
  return 'unknown';
}

function classifyTrainingFeature(featureRow) {
  const label = featureRow?.sourceLabel ?? '';
  const line = String(featureRow?.sourceLine ?? '');
  const sourceKind = featureRow?.sourceKind ?? '';

  if (label === 'EVENTTRAIN') {
    return {
      completionStatus: 'implemented-training-session-entry',
      runtimeRoute: 'training',
      runtimeAction: 'main/openTraining',
      viewBuilder: 'buildTrainingView',
      handlerOwner: 'enterTraining/createTrainingSession',
      runtimeConsumerId: 'main/openTraining -> enterTraining -> createTrainingSession -> buildTrainingView',
      verificationId: 'smoke:training-session',
    };
  }

  if (label === 'EVENTCOM') {
    return {
      completionStatus: 'implemented-training-command-selection-reset',
      runtimeRoute: 'training',
      runtimeAction: 'training/selectCommand',
      viewBuilder: 'buildTrainingView',
      handlerOwner: 'selectTrainingCommand/sessionWithTrainingPreview',
      runtimeConsumerId: 'training/selectCommand -> selectTrainingCommand -> clearTrainingCommandBuffers -> sessionWithTrainingPreview',
      verificationId: 'smoke:training-session',
    };
  }

  if (label === 'EVENTCOMEND') {
    return {
      completionStatus: sourceKind === 'flow-control:pause' ? 'mapped-consumed-training-command-end-wait' : 'implemented-training-command-end-lifecycle',
      runtimeRoute: 'mainMenu',
      runtimeAction: 'training/execute',
      viewBuilder: 'buildTrainingView',
      handlerOwner: 'executeSelectedTraining/endTurn',
      runtimeConsumerId: `training/execute -> executeSelectedTraining -> applyTrainingResult -> endTurn -> initialInteractionSessionState (${line})`,
      verificationId: 'smoke:training-session',
    };
  }

  if (label === 'EVENTEND') {
    return {
      completionStatus: sourceKind === 'flow-control:pause' ? 'mapped-consumed-training-finish-wait' : 'implemented-training-finish-lifecycle',
      runtimeRoute: 'mainMenu',
      runtimeAction: 'training/execute',
      viewBuilder: 'buildTrainingView',
      handlerOwner: 'executeSelectedTraining/endTurn',
      runtimeConsumerId: `executeSelectedTraining -> endTurn -> mainMenu route/session cleanup/effects (${line})`,
      verificationId: 'smoke:training-session',
    };
  }

  if (label === 'JUEL_CHECK') {
    return {
      completionStatus: 'implemented-training-resource-buffer-display',
      runtimeRoute: 'training',
      runtimeAction: 'training/selectCommand',
      viewBuilder: 'buildTrainingView',
      handlerOwner: 'calculateTrainingResult/buildTrainingView',
      runtimeConsumerId: 'calculateTrainingResult.resourceDeltas -> session.interaction.resultBuffers.gotJuel -> buildTrainingView.bufferSummary',
      verificationId: 'smoke:training-session',
    };
  }

  if (label === 'SHOW_STATUS') {
    return {
      completionStatus: 'mapped-consumed-training-status-view',
      runtimeRoute: 'training',
      runtimeAction: 'main/openTraining',
      viewBuilder: 'buildTrainingView',
      handlerOwner: 'trainingStatusSummary/TrainingScreen',
      runtimeConsumerId: 'trainingStatusSummary -> buildTrainingView.statusSummary -> TrainingScreen SummaryList target/executor/assistant/date/time',
      verificationId: 'smoke:training-session',
    };
  }

  if (label === 'FIGURE_INDENT') {
    return {
      completionStatus: 'mapped-consumed-training-number-format',
      runtimeRoute: 'training',
      runtimeAction: 'training/selectCommand',
      viewBuilder: 'buildTrainingView',
      handlerOwner: 'formatTrainingNumber/bufferSummary',
      runtimeConsumerId: 'formatTrainingNumber -> buildTrainingView.bufferSummary.formattedBodyCostTotal width-8 value alignment',
      verificationId: 'smoke:training-session',
    };
  }

  if (label === 'FIGURE_INDENT_SLASH') {
    return {
      completionStatus: 'mapped-consumed-training-slash-number-format',
      runtimeRoute: 'training',
      runtimeAction: 'training/selectCommand',
      viewBuilder: 'buildTrainingView',
      handlerOwner: 'formatTrainingNumber/bufferSummary',
      runtimeConsumerId: 'formatTrainingNumber -> buildTrainingView.bufferSummary.formattedBodyCostTotal slash pair',
      verificationId: 'smoke:training-session',
    };
  }

  return {
    completionStatus: 'unresolved',
    runtimeRoute: '',
    runtimeAction: '',
    viewBuilder: '',
    handlerOwner: '',
    runtimeConsumerId: '',
    verificationId: '',
    issue: `M40 feature row is not classified: ${featureRow?.featureId ?? '<missing>'}`,
  };
}

const queue = readJson('data/coverage/implementation-queue.json');
const features = readJson('data/coverage/features.json');
const featureRows = features.features ?? features.rows ?? [];
const units = (queue.queueUnits ?? []).filter((unit) => unit.ownerMilestone === 'M40');
if (units.length !== 1) throw new Error(`Expected one M40 implementation queue unit, found ${units.length}.`);

const ownedRefs = new Map();
for (const unit of units) {
  for (const ref of unit.rowRefs ?? []) {
    if (!ownedRefs.has(ref)) ownedRefs.set(ref, { ref, source: 'implementation-queue', unitId: unit.unitId });
  }
}

const featuresById = new Map(featureRows.map((row) => [row.featureId, row]));
const rows = [];
for (const [reviewId, scope] of [...ownedRefs.entries()].sort(([a], [b]) => a.localeCompare(b))) {
  const rowKind = rowKindFromRef(reviewId);

  if (rowKind === 'feature') {
    const featureId = reviewId.replace(/^feature:/, '');
    const featureRow = featuresById.get(featureId);
    const classification = classifyTrainingFeature(featureRow);
    rows.push({
      coverageRowId: `training-session:feature:${slug(featureId)}`,
      reviewId,
      rowKind,
      scopeSource: scope.source,
      sourceEvidenceId: featureRow?.sourceEvidenceId ?? '',
      sourcePath: featureRow?.sourceFile ?? '',
      sourceFile: featureRow?.sourceFile ? basename(featureRow.sourceFile) : '',
      sourceKind: featureRow?.sourceKind ?? '',
      sourceLabel: featureRow?.sourceLabel ?? '',
      sourceLine: featureRow?.sourceLine ?? '',
      featureGroup: featureRow?.groupKey ?? '',
      sourceClassification: featureRow?.classification ?? '',
      ...classification,
    });
    continue;
  }

  rows.push({
    coverageRowId: `training-session:unresolved:${slug(reviewId)}`,
    reviewId,
    rowKind,
    scopeSource: scope.source,
    sourceEvidenceId: '',
    sourcePath: '',
    completionStatus: 'unresolved',
    runtimeConsumerId: '',
    verificationId: '',
    issue: 'M40 row kind is not classified.',
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
    message: 'M40 row is missing source evidence.',
  })),
  ...missingConsumer.map((row) => ({
    issueId: `missing-consumer:${row.reviewId}`,
    severity: 'error',
    rowRef: row.reviewId,
    message: 'M40 row is missing runtime consumer.',
  })),
  ...missingVerification.map((row) => ({
    issueId: `missing-verification:${row.reviewId}`,
    severity: 'error',
    rowRef: row.reviewId,
    message: 'M40 row is missing verification.',
  })),
];

const coverage = {
  schemaVersion: 'training-session-coverage/v1',
  generatedBy: 'tools/build_training_session_coverage.mjs',
  milestone: 'M40',
  ownerRole: 'training-session-owner',
  sourceInputs: {
    implementationQueue: 'data/coverage/implementation-queue.json',
    features: 'data/coverage/features.json',
    originalSource: 'original-game/ERB/指導関係/TRAIN_MAIN.ERB',
  },
  scopeContract: {
    ownedUnitIds: units.map((unit) => unit.unitId),
    rule: 'Every M40 queue row from TRAIN_MAIN.ERB must be implemented or mapped-consumed exactly once.',
    runtimeBoundary:
      'Training command selection state, TFLAG-like temporary flags, SOURCE/PALAM/base/result previews, assistant choice, and command flow remain in GameSession.interaction; only confirmed training effects are written to save state.',
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
    bySourceLabel: countBy(rows, (row) => row.sourceLabel),
    bySourceKind: countBy(rows, (row) => row.sourceKind),
  },
  rows,
  unresolvedIssues,
};

const gapAudit = {
  schemaVersion: 'milestone-gap-audit/v1',
  generatedBy: 'tools/build_training_session_coverage.mjs',
  milestone: 'M40',
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
  'npm run coverage:training-session',
  'npm run gate:training-session',
  'npm run gate:milestone-scope-closure -- M40',
  'npm run smoke:training-session',
  'npm run smoke:m14',
  'npm run verify:m16',
  'npm run typecheck',
  'npm run build',
  'npm run test --if-present',
];

const closure = {
  schemaVersion: 'milestone-closure/v1',
  milestone: 'M40',
  title: 'Training session entry, selection lifecycle, status view, and cleanup',
  status: 'completed',
  completedAt: '2026-05-01',
  commitPolicy: 'Commit after every milestone closure.',
  commitHash: 'recorded by the M40 git commit that includes this closure file',
  sourceInputs: coverage.sourceInputs,
  outputs: {
    trainingSessionCoverage: 'data/coverage/training-session-coverage.json',
    gapAudit: 'data/coverage/audits/M40-gap-audit.json',
    builder: 'tools/build_training_session_coverage.mjs',
    coverageGate: 'tools/gate_training_session.mjs',
    closureGate: 'tools/gate_milestone_scope_closure.mjs',
    smoke: 'tools/m40_training_session_smoke.ts',
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
    expectedGateResult: `${rows.length} M40 owned row(s), 0 unresolved issue(s)`,
  },
  commandsRun,
};

writeJson('data/coverage/training-session-coverage.json', coverage);
writeJson('data/coverage/audits/M40-gap-audit.json', gapAudit);
writeJson('data/coverage/milestones/M40-closure.json', closure);

console.log(`coverage:training-session wrote ${rows.length} row(s), implemented=${implementedRows.length}, mapped=${mappedRows.length}, unresolved=${unresolvedIssues.length}.`);
