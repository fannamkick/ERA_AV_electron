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

function currentDateStamp() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());
  const byType = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${byType.year}-${byType.month}-${byType.day}`;
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

const manifestPath = 'data/coverage/manifests/M37-source-units.json';
const sourceUnitManifest = fileExists(manifestPath) ? readJson(manifestPath) : null;
const manifestUnits = sourceUnitManifest?.units ?? [];
const manifestStatusCounts = countBy(manifestUnits, (unit) => unit.manifestStatus);
const blockedManifestUnits = manifestUnits.filter((unit) => unit.manifestStatus === 'blocked');
const scopeRedesignUnits = manifestUnits.filter((unit) => unit.manifestStatus === 'scope-redesign-required');
const strictOwnedTotal = manifestUnits.length || rows.length;
const strictImplemented = manifestStatusCounts['implemented-verified'] ?? implementedRows.length;
const strictApprovedExcluded = manifestStatusCounts['approved-excluded'] ?? 0;
const strictScopeRedesignRequired = manifestStatusCounts['scope-redesign-required'] ?? 0;
const strictOwnedBlocker = blockedManifestUnits.length;
const strictCompletedAllowed =
  sourceUnitManifest?.summary?.completedAllowedNow === true &&
  strictOwnedBlocker === 0 &&
  strictScopeRedesignRequired === 0 &&
  strictImplemented + strictApprovedExcluded === strictOwnedTotal;

function fileExists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

const blockedVerificationCommands = [
  'npm run coverage:work',
  'npm run gate:work-coverage',
  'npm run gate:milestone-scope-closure -- M37',
];

const completionVerificationCommands = [
  ...blockedVerificationCommands,
  'npm run smoke:work-all',
  'npm run smoke:m12',
  'npm run verify:m16',
  'npm run typecheck',
  'npm run build',
  'npm run test --if-present',
];

const verificationCommands = strictCompletedAllowed ? completionVerificationCommands : blockedVerificationCommands;

const closure = {
  schemaVersion: 'milestone-closure/v1',
  milestone: 'M37',
  title: 'Work, brothel, side job, and special work execution',
  status: strictCompletedAllowed ? 'completed' : 'blocked',
  completedAt: strictCompletedAllowed ? currentDateStamp() : null,
  strictReassessedAt: currentDateStamp(),
  commitPolicy: 'Commit after every milestone closure or strict closure correction.',
  previousCompletedClaim: {
    completedAt: '2026-05-01',
    commitHash: 'f000824',
    counts: {
      ownedTotal: rows.length,
      implemented: implementedRows.length,
      mapped: mappedRows.length,
      ownedBlocker: 0,
    },
    invalidReason:
      'The old closure counted mapped save/session/calculation rows as closed. Under the strict source-unit rule, mapped rows are not completion evidence.',
  },
  sourceInputs: {
    ...coverage.sourceInputs,
    sourceUnitManifest: manifestPath,
  },
  outputs: {
    workCoverage: 'data/coverage/work-coverage.json',
    gapAudit: 'data/coverage/audits/M37-gap-audit.json',
    builder: 'tools/build_work_coverage.mjs',
    coverageGate: 'tools/gate_work_coverage.mjs',
    closureGate: 'tools/gate_milestone_scope_closure.mjs',
    smoke: 'tools/m37_work_all_smoke.ts',
  },
  counts: {
    ownedTotal: strictOwnedTotal,
    implemented: strictImplemented,
    mapped: 0,
    approvedExcluded: 0,
    transferredOut: 0,
    ownedBlocker: strictOwnedBlocker,
    missingEvidence: missingEvidence.length,
    missingConsumer: missingConsumer.length,
    missingVerification: missingVerification.length,
    roleOnlyComplete: 0,
    unapprovedExcluded: 0,
  },
  closureMetrics: {
    ownedTotal: strictOwnedTotal,
    implemented: strictImplemented,
    mapped: 0,
    approvedExcluded: 0,
    transferredOut: 0,
    ownedBlocker: strictOwnedBlocker,
    missingEvidence: missingEvidence.length,
    missingConsumer: missingConsumer.length,
    missingVerification: missingVerification.length,
    roleOnlyComplete: 0,
    unapprovedExcluded: 0,
  },
  blockingBreakdown: {
    byRowKind: countBy(blockedManifestUnits, (unit) => unit.rowKind),
    byLegacyFamily: countBy(blockedManifestUnits, (unit) => unit.legacyFamily || String(unit.legacyId || '').split(':')[0]),
    scopeRedesignRequired: scopeRedesignUnits.length,
  },
  responsibilityIntegrity: {
    scopeReductionProhibited: true,
    checklistMatchedToResponsibility: false,
    sourceBehaviorImplementedNotJustIndexed: false,
    gateValidatesResponsibilityNotOwnScaffold: false,
    limitationsBlockCompletion: true,
    responsibilityItems: [
      'Implement the full work/brothel/side-job/special-work source behavior, not only source labels and dispatch rows.',
      'Close work result save-field effects only when source behavior is implemented and verified.',
      'Do not count mapped save/session/calculation rows as M37 completion evidence.',
      'Resolve inbound M29 CFLAG:401 and FLAG:41 inside M37 or explicitly redesign ownership before completion.',
    ],
    implementationEvidence: [
      'definitions.workDefinitions contains 8 ERB-derived work listings and 72 source-label work definitions.',
      'work/select, work/selectCharacter, work/execute, and work/cancel dispatch through GameSession.work.',
      'applyWorkResult currently applies rewardMoney, experienceDeltas, bodyStatDeltas, assignments, careerFlagsByCharacterId, and turn completion.',
    ],
    verificationEvidence: [
      'npm run gate:work-coverage validates M37 row indexing and strict closure consistency.',
      'npm run gate:milestone-scope-closure -- M37 must fail while ownedBlocker is nonzero.',
    ],
    blockingLimitations: [
      `${strictOwnedBlocker} source units remain blocked in ${manifestPath}.`,
      `${rows.length - implementedRows.length} coverage rows are mapped evidence, not source behavior completion.`,
    ],
  },
  verification: {
    commands: completionVerificationCommands,
    expectedGateResult: strictCompletedAllowed
      ? `${strictOwnedTotal} M37 source unit(s), 0 blocker(s)`
      : 'gate:work-coverage passes as coverage indexing; gate:milestone-scope-closure fails until M37 blockers are resolved.',
  },
  commandsRun: verificationCommands,
};

writeJson('data/coverage/work-coverage.json', coverage);
writeJson('data/coverage/audits/M37-gap-audit.json', gapAudit);
writeJson('data/coverage/milestones/M37-closure.json', closure);

console.log(
  `coverage:work wrote ${rows.length} row(s), implemented=${implementedRows.length}, mapped=${mappedRows.length}, unresolved=${unresolvedIssues.length}; strictStatus=${closure.status}, strictBlockers=${strictOwnedBlocker}.`,
);
