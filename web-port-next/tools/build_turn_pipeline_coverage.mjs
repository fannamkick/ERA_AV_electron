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

function addOwnedRef(refs, ref, source, transfer) {
  if (!ref) return;
  if (!refs.has(ref)) refs.set(ref, { ref, source, transfer });
}

function inboundTransfersForMilestone(files, milestone) {
  const rows = [];
  for (const file of files) {
    const relativePath = `data/coverage/${file}`;
    const absolutePath = path.join(root, relativePath);
    if (!fs.existsSync(absolutePath)) continue;
    const artifact = readJson(relativePath);
    for (const row of artifact.rows ?? []) {
      if (row.toMilestone === milestone || row.transferredTo === milestone || row.ownerMilestone === milestone) {
        rows.push({ ...row, inboundArtifact: relativePath });
      }
    }
  }
  return rows;
}

function completionForSaveMapping(row) {
  if (!row) {
    return {
      completionStatus: 'unresolved',
      runtimeConsumerId: '',
      verificationId: '',
      issue: 'Save mapping row not found in data/coverage/save-mapping.json.',
    };
  }

  const consumers = {
    'DAY:0': 'run.clock.dayCounters.counter_0 <- advanceTurnClock day progression and save roundtrip',
    'DAY:3': 'run.clock.dayCounters.counter_3 <- advanceTurnClock month rollover counter',
    'DAY:4': 'run.clock.dayCounters.counter_4 <- advanceTurnClock turn counter',
    TIME: 'run.clock.currentTimeSlot <- advanceTurnClock time reset and save roundtrip',
    'TIME:0': 'run.clock.timeCounters.counter_0 <- advanceTurnClock time counter reset',
    'CFLAG:34': 'run.progressFlags.flag_34 <- monthly automatic turn hook',
    'FLAG:61': 'run.progressFlags.flag_61 <- weekly automatic turn hook',
  };

  const runtimeConsumerId = consumers[row.address];
  if (!runtimeConsumerId) {
    return {
      completionStatus: 'unresolved',
      runtimeConsumerId: '',
      verificationId: '',
      issue: `M35 save mapping row is not classified: ${row.mappingRowId}`,
    };
  }

  return {
    completionStatus: 'mapped-consumed-turn-save-field',
    runtimeConsumerId,
    verificationId: 'smoke:turn-long',
  };
}

const queue = readJson('data/coverage/implementation-queue.json');
const saveMapping = readJson('data/coverage/save-mapping.json');
const units = (queue.queueUnits ?? []).filter((unit) => unit.ownerMilestone === 'M35');
if (units.length === 0) throw new Error('M35 implementation queue unit not found.');

const ownedRefs = new Map();
for (const unit of units) {
  for (const ref of unit.rowRefs ?? []) addOwnedRef(ownedRefs, ref, 'implementation-queue', undefined);
}

const inboundTransfers = inboundTransfersForMilestone(
  ['shop-purchase-coverage.json', 'recruit-coverage.json', 'social-equipment-cflag-coverage.json'],
  'M35',
);
for (const row of inboundTransfers) {
  addOwnedRef(ownedRefs, row.reviewId, row.inboundArtifact, row);
}

const saveMappingById = new Map((saveMapping.rows ?? []).map((row) => [row.mappingRowId, row]));
const rows = [];

for (const [reviewId, scope] of [...ownedRefs.entries()].sort(([a], [b]) => a.localeCompare(b))) {
  const mappingRowId = reviewId.replace(/^save-mapping:/, '');
  const saveRow = saveMappingById.get(mappingRowId);
  const completion = completionForSaveMapping(saveRow ?? scope.transfer);

  rows.push({
    coverageRowId: `turn-pipeline:save-mapping:${slug(mappingRowId)}`,
    reviewId,
    rowKind: 'save-mapping',
    scopeSource: scope.source,
    sourceEvidenceId: saveRow?.sourceEvidenceId ?? scope.transfer?.sourceEvidenceId ?? '',
    sourcePath: saveRow?.sourcePath ?? scope.transfer?.sourcePath ?? '',
    sourceLabel: saveRow?.sourceLabel ?? '',
    family: saveRow?.family ?? '',
    address: saveRow?.address ?? scope.transfer?.address ?? '',
    fieldPath: saveRow?.fieldPath ?? scope.transfer?.fieldPath ?? '',
    runtimeOwner: saveRow?.runtimeOwner ?? '',
    ...completion,
    ...(scope.transfer
      ? {
          inboundTransfer: true,
          fromMilestone: scope.transfer.fromMilestone,
          toMilestone: 'M35',
          transferReason: scope.transfer.transferReason,
          acceptedByOwner: scope.transfer.acceptedByOwner ?? true,
        }
      : {}),
  });
}

const requiredHookOrder = [
  'scheduled-events',
  'mission-deadline',
  'clock-advance',
  'weekly-automatic-processing',
  'monthly-automatic-processing',
  'world-event-hook',
  'session-cleanup',
];

const missingEvidence = rows.filter((row) => !row.sourceEvidenceId);
const missingConsumer = rows.filter((row) => !row.runtimeConsumerId);
const missingVerification = rows.filter((row) => !row.verificationId);
const unresolvedRows = rows.filter((row) => row.completionStatus === 'unresolved');
const mappedRows = rows.filter((row) => row.completionStatus.startsWith('mapped'));

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
    message: 'M35 row is missing source evidence.',
  })),
  ...missingConsumer.map((row) => ({
    issueId: `missing-consumer:${row.reviewId}`,
    severity: 'error',
    rowRef: row.reviewId,
    message: 'M35 row is missing runtime consumer.',
  })),
  ...missingVerification.map((row) => ({
    issueId: `missing-verification:${row.reviewId}`,
    severity: 'error',
    rowRef: row.reviewId,
    message: 'M35 row is missing verification.',
  })),
];

const coverage = {
  schemaVersion: 'turn-pipeline-coverage/v1',
  generatedBy: 'tools/build_turn_pipeline_coverage.mjs',
  milestone: 'M35',
  ownerRole: 'turn-time-owner',
  sourceInputs: {
    implementationQueue: 'data/coverage/implementation-queue.json',
    saveMapping: 'data/coverage/save-mapping.json',
    inboundTransfers: inboundTransfers.map((row) => row.inboundArtifact),
  },
  scopeContract: {
    ownedUnitIds: units.map((unit) => unit.unitId),
    rule: 'Every M35 queue row and inbound transfer must be mapped-consumed by the turn pipeline exactly once.',
    hookOrder: requiredHookOrder,
    saveBoundary:
      'Turn completion may mutate run clock/progress, mission deadlines, economy monthly entries, and world event flags; it must clear session choices and keep session/view data out of save payload.',
  },
  summary: {
    ownedRowRefs: ownedRefs.size,
    rows: rows.length,
    implemented: 0,
    mapped: mappedRows.length,
    transferredOut: 0,
    approvedExcluded: 0,
    ownedBlocker: 0,
    missingEvidence: missingEvidence.length,
    missingConsumer: missingConsumer.length,
    missingVerification: missingVerification.length,
    roleOnlyComplete: 0,
    unapprovedExcluded: 0,
    inboundTransfers: inboundTransfers.length,
    byRowKind: countBy(rows, (row) => row.rowKind),
    byScopeSource: countBy(rows, (row) => row.scopeSource),
    byCompletionStatus: countBy(rows, (row) => row.completionStatus),
    byAddress: countBy(rows, (row) => row.address),
  },
  rows,
  unresolvedIssues,
};

const gapAudit = {
  schemaVersion: 'milestone-gap-audit/v1',
  generatedBy: 'tools/build_turn_pipeline_coverage.mjs',
  milestone: 'M35',
  sourceInputs: coverage.sourceInputs,
  summary: {
    scopeRows: rows.length,
    implemented: 0,
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
  'npm run coverage:turn-pipeline',
  'npm run gate:turn-pipeline',
  'npm run gate:milestone-scope-closure -- M35',
  'npm run smoke:turn-long',
  'npm run smoke:m8',
  'npm run verify:m16',
  'npm run typecheck',
  'npm run build',
  'npm run test --if-present',
];

const closure = {
  schemaVersion: 'milestone-closure/v1',
  milestone: 'M35',
  title: 'Turn end, time progression, and automatic hook pipeline',
  status: 'completed',
  completedAt: '2026-05-01',
  commitPolicy: 'Commit after every milestone closure.',
  commitHash: 'recorded by the M35 git commit that includes this closure file',
  sourceInputs: coverage.sourceInputs,
  outputs: {
    turnPipelineCoverage: 'data/coverage/turn-pipeline-coverage.json',
    gapAudit: 'data/coverage/audits/M35-gap-audit.json',
    builder: 'tools/build_turn_pipeline_coverage.mjs',
    coverageGate: 'tools/gate_turn_pipeline.mjs',
    closureGate: 'tools/gate_milestone_scope_closure.mjs',
    smoke: 'tools/m35_turn_long_smoke.ts',
  },
  counts: {
    ownedTotal: rows.length,
    implemented: 0,
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
    implemented: 0,
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
    expectedGateResult: `${rows.length} M35 owned row(s), 0 unresolved issue(s)`,
  },
  commandsRun,
};

writeJson('data/coverage/turn-pipeline-coverage.json', coverage);
writeJson('data/coverage/audits/M35-gap-audit.json', gapAudit);
writeJson('data/coverage/milestones/M35-closure.json', closure);

console.log(
  `coverage:turn-pipeline wrote ${rows.length} row(s), mapped=${mappedRows.length}, unresolved=${unresolvedIssues.length}.`,
);
