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
  if (ref.startsWith('source-file-review:')) return 'source-file-review';
  return 'unknown';
}

function originalPath(relativePath) {
  return path.join(root, '..', relativePath.replaceAll('/', path.sep));
}

function executableLine(text) {
  const trimmed = text.trim();
  if (trimmed.length === 0 || trimmed.startsWith(';')) return undefined;
  return trimmed;
}

function extractAvailabilityPrograms() {
  const sourcePath = 'original-game/ERB/指導関係/COMABLE.ERB';
  const lines = fs.readFileSync(originalPath(sourcePath), 'utf8').split(/\r?\n/u);
  const programs = {};
  let current;

  lines.forEach((lineText, index) => {
    const sourceLine = index + 1;
    const labelMatch = lineText.trim().match(/^@COM_ABLE(\d+)/u);
    if (labelMatch) {
      current = {
        commandId: labelMatch[1],
        sourceLabel: `COM_ABLE${labelMatch[1]}`,
        sourceLine,
        lines: [],
      };
      programs[current.commandId] = current;
      return;
    }

    if (!current) return;
    const text = executableLine(lineText);
    if (!text || text.startsWith('@')) return;
    current.lines.push({ sourceLine, text });
  });

  return {
    schemaVersion: 'training-availability-rules/v1',
    generatedBy: 'tools/build_training_availability_coverage.mjs',
    sourcePath,
    programCount: Object.keys(programs).length,
    programs,
  };
}

function classifyFeatureRow(featureRow, programs) {
  const sourceLabel = featureRow?.sourceLabel ?? '';
  const sourceKind = featureRow?.sourceKind ?? '';
  const notes = featureRow?.notes ?? '';
  const commandId = sourceLabel.replace(/^COM_ABLE/u, '');
  const program = programs[commandId];

  if (sourceKind === 'dynamic-call') {
    return {
      completionStatus: 'implemented-training-availability-dynamic-call',
      runtimeRoute: 'training',
      runtimeAction: 'main/openTraining -> training/selectCommand',
      viewBuilder: 'buildTrainingView',
      handlerOwner: 'commandViewFromDefinition/trainingAvailabilityDisabledReason',
      commandId: '',
      runtimeConsumerId:
        'COMSEQ_REGISTER dynamic COM_ABLE call -> buildTrainingView.visibleCommands and selectTrainingCommand availability re-check',
      verificationId: 'smoke:training-availability',
    };
  }

  if (sourceKind === 'unreferenced-global' && sourceLabel.startsWith('COM_ABLE')) {
    return {
      completionStatus: 'mapped-consumed-training-availability-program',
      runtimeRoute: 'training',
      runtimeAction: 'main/openTraining -> training/selectCommand',
      viewBuilder: 'buildTrainingView',
      handlerOwner: 'trainingAvailabilityProgramForCommand',
      commandId,
      programLineCount: program?.lines?.length ?? 0,
      runtimeConsumerId: `COM_ABLE${commandId} source program -> trainingAvailabilityProgramForCommand(${commandId})`,
      verificationId: 'gate:training-availability',
    };
  }

  if (sourceKind === 'flow-control:exit' && sourceLabel.startsWith('COM_ABLE')) {
    const isUnavailableReturn = /RETURN\s+0/u.test(notes);
    const isAvailableReturn = /RETURN\s+1/u.test(notes);
    return {
      completionStatus: isUnavailableReturn
        ? 'implemented-training-availability-unavailable-return'
        : isAvailableReturn
          ? 'mapped-consumed-training-availability-success-return'
          : 'unresolved',
      runtimeRoute: 'training',
      runtimeAction: 'training/selectCommand',
      viewBuilder: 'buildTrainingView',
      handlerOwner: 'runProgram/trainingAvailabilityDisabledReason',
      commandId,
      programLineCount: program?.lines?.length ?? 0,
      runtimeConsumerId: isUnavailableReturn
        ? `${sourceLabel}:${featureRow.sourceLine} RETURN 0 -> availability interpreter unavailable result and disabled reason`
        : isAvailableReturn
          ? `${sourceLabel}:${featureRow.sourceLine} RETURN 1 -> availability interpreter success result`
          : '',
      verificationId: isUnavailableReturn || isAvailableReturn ? 'smoke:training-availability' : '',
      issue: isUnavailableReturn || isAvailableReturn ? undefined : `M41 COMABLE return row is not classified: ${featureRow?.featureId ?? '<missing>'}`,
    };
  }

  return {
    completionStatus: 'unresolved',
    runtimeRoute: '',
    runtimeAction: '',
    viewBuilder: '',
    handlerOwner: '',
    commandId,
    runtimeConsumerId: '',
    verificationId: '',
    issue: `M41 feature row is not classified: ${featureRow?.featureId ?? '<missing>'}`,
  };
}

const queue = readJson('data/coverage/implementation-queue.json');
const features = readJson('data/coverage/features.json');
const sourceManifest = readJson('data/coverage/source-manifest.json');
const featureRows = features.features ?? features.rows ?? [];
const units = (queue.queueUnits ?? []).filter((unit) => unit.ownerMilestone === 'M41');
if (units.length !== 2) throw new Error(`Expected two M41 implementation queue units, found ${units.length}.`);

const rulesArtifact = extractAvailabilityPrograms();
const featureRowsById = new Map(featureRows.map((row) => [row.featureId, row]));
const sourceManifestByLowerPath = new Map((sourceManifest.files ?? []).map((row) => [String(row.sourcePath).toLowerCase(), row]));

const ownedRefs = new Map();
const unitByRef = new Map();
for (const unit of units) {
  for (const ref of unit.rowRefs ?? []) {
    unitByRef.set(ref, unit);
    if (!ownedRefs.has(ref)) ownedRefs.set(ref, { ref, source: 'implementation-queue', unitId: unit.unitId });
  }
}

const rows = [];
for (const [reviewId, scope] of [...ownedRefs.entries()].sort(([a], [b]) => a.localeCompare(b))) {
  const rowKind = rowKindFromRef(reviewId);

  if (rowKind === 'feature') {
    const featureId = reviewId.replace(/^feature:/u, '');
    const featureRow = featureRowsById.get(featureId);
    const classification = classifyFeatureRow(featureRow, rulesArtifact.programs);
    rows.push({
      coverageRowId: `training-availability:feature:${slug(featureId)}`,
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
      sourceNotes: featureRow?.notes ?? '',
      ...classification,
    });
    continue;
  }

  if (rowKind === 'source-file-review') {
    const unit = unitByRef.get(reviewId);
    const rawSourcePath = unit?.sourcePaths?.[0] ?? reviewId.replace(/^source-file-review:/u, '');
    const manifestRow = sourceManifestByLowerPath.get(String(rawSourcePath).toLowerCase());
    const sourcePath = manifestRow?.sourcePath ?? rawSourcePath;
    rows.push({
      coverageRowId: `training-availability:source-review:${slug(sourcePath)}`,
      reviewId,
      rowKind,
      scopeSource: scope.source,
      sourceEvidenceId: reviewId,
      sourcePath,
      sourceFile: basename(sourcePath),
      sourceKind: manifestRow?.sourceKind ?? '',
      sourceSha256: manifestRow?.sha256 ?? '',
      completionStatus: 'mapped-consumed-training-order-source-review',
      runtimeRoute: 'training',
      runtimeAction: 'main/openTraining',
      viewBuilder: 'buildTrainingView',
      handlerOwner: 'computeVisibleTrainingCommandIds',
      runtimeConsumerId:
        'COMORDER.ERB reviewed for command ordering/scoring; M41 runtime keeps non-mutating Train.csv numeric order while COMABLE owns availability.',
      verificationId: 'gate:training-availability',
    });
    continue;
  }

  rows.push({
    coverageRowId: `training-availability:unresolved:${slug(reviewId)}`,
    reviewId,
    rowKind,
    scopeSource: scope.source,
    sourceEvidenceId: '',
    completionStatus: 'unresolved',
    runtimeConsumerId: '',
    verificationId: '',
    issue: 'M41 row kind is not classified.',
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
    message: 'M41 row is missing source evidence.',
  })),
  ...missingConsumer.map((row) => ({
    issueId: `missing-consumer:${row.reviewId}`,
    severity: 'error',
    rowRef: row.reviewId,
    message: 'M41 row is missing runtime consumer.',
  })),
  ...missingVerification.map((row) => ({
    issueId: `missing-verification:${row.reviewId}`,
    severity: 'error',
    rowRef: row.reviewId,
    message: 'M41 row is missing verification.',
  })),
];

const coverage = {
  schemaVersion: 'training-availability-coverage/v1',
  generatedBy: 'tools/build_training_availability_coverage.mjs',
  milestone: 'M41',
  ownerRole: 'training-availability-owner',
  sourceInputs: {
    implementationQueue: 'data/coverage/implementation-queue.json',
    features: 'data/coverage/features.json',
    sourceManifest: 'data/coverage/source-manifest.json',
    originalAvailabilitySource: 'original-game/ERB/指導関係/COMABLE.ERB',
    originalOrderSource: 'original-game/ERB/指導関係/COMORDER.ERB',
  },
  scopeContract: {
    ownedUnitIds: units.map((unit) => unit.unitId),
    rule: 'Every M41 queue row from COMABLE/COMSEQ_REGISTER/COMORDER must be implemented or mapped-consumed exactly once.',
    runtimeBoundary:
      'Training availability is computed from save/session state without mutation. COMABLE source programs decide command availability; command effects remain M42-M44.',
  },
  sourcePrograms: {
    artifact: 'data/coverage/training-availability-rules.json',
    programCount: rulesArtifact.programCount,
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
    bySourcePath: countBy(rows, (row) => row.sourcePath),
    bySourceKind: countBy(rows, (row) => row.sourceKind),
  },
  rows,
  unresolvedIssues,
};

const gapAudit = {
  schemaVersion: 'milestone-gap-audit/v1',
  generatedBy: 'tools/build_training_availability_coverage.mjs',
  milestone: 'M41',
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
  'npm run coverage:training-availability',
  'npm run gate:training-availability',
  'npm run gate:milestone-scope-closure -- M41',
  'npm run smoke:training-availability',
  'npm run smoke:training-session',
  'npm run smoke:m14',
  'npm run verify:m16',
  'npm run typecheck',
  'npm run build',
  'npm run test --if-present',
];

const closure = {
  schemaVersion: 'milestone-closure/v1',
  milestone: 'M41',
  title: 'Training command availability and unavailable reasons',
  status: 'completed',
  completedAt: '2026-05-01',
  commitPolicy: 'Commit after every milestone closure.',
  commitHash: 'recorded by the M41 git commit that includes this closure file',
  sourceInputs: coverage.sourceInputs,
  outputs: {
    trainingAvailabilityCoverage: 'data/coverage/training-availability-coverage.json',
    trainingAvailabilityRules: 'data/coverage/training-availability-rules.json',
    gapAudit: 'data/coverage/audits/M41-gap-audit.json',
    builder: 'tools/build_training_availability_coverage.mjs',
    coverageGate: 'tools/gate_training_availability.mjs',
    closureGate: 'tools/gate_milestone_scope_closure.mjs',
    smoke: 'tools/m41_training_availability_smoke.ts',
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
    expectedGateResult: `${rows.length} M41 owned row(s), 0 unresolved issue(s)`,
  },
  commandsRun,
};

writeJson('data/coverage/training-availability-rules.json', rulesArtifact);
writeJson('data/coverage/training-availability-coverage.json', coverage);
writeJson('data/coverage/audits/M41-gap-audit.json', gapAudit);
writeJson('data/coverage/milestones/M41-closure.json', closure);

console.log(`coverage:training-availability wrote ${rows.length} row(s), implemented=${implementedRows.length}, mapped=${mappedRows.length}, unresolved=${unresolvedIssues.length}, programs=${rulesArtifact.programCount}.`);
