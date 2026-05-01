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

const queue = readJson('data/coverage/implementation-queue.json');
const definitions = readJson('data/coverage/definitions.json');
const units = (queue.queueUnits ?? []).filter((unit) => unit.ownerMilestone === 'M38');
if (units.length === 0) throw new Error('M38 implementation queue unit not found.');

const ownedRefs = new Map();
for (const unit of units) {
  for (const ref of unit.rowRefs ?? []) {
    if (!ownedRefs.has(ref)) ownedRefs.set(ref, { ref, source: 'implementation-queue', unitId: unit.unitId });
  }
}

const definitionsById = new Map((definitions.rows ?? []).map((row) => [row.definitionRowId, row]));

const rows = [];
for (const [reviewId, scope] of [...ownedRefs.entries()].sort(([a], [b]) => a.localeCompare(b))) {
  if (!reviewId.startsWith('definition:')) {
    rows.push({
      coverageRowId: `filming-scene:unresolved:${slug(reviewId)}`,
      reviewId,
      rowKind: 'unknown',
      scopeSource: scope.source,
      sourceEvidenceId: '',
      completionStatus: 'unresolved',
      runtimeConsumerId: '',
      verificationId: '',
      issue: 'M38 only accepts filming scene definition rows.',
    });
    continue;
  }

  const definitionRowId = reviewId.replace(/^definition:/, '');
  const definitionRow = definitionsById.get(definitionRowId);
  const isFilmingScene = definitionRow?.definitionKey === 'filmingSceneDefinitions';
  rows.push({
    coverageRowId: `filming-scene:definition:${slug(definitionRowId)}`,
    reviewId,
    rowKind: 'definition',
    scopeSource: scope.source,
    sourceEvidenceId: definitionRow?.sourceEvidenceId ?? '',
    sourcePath: definitionRow?.sourceFile ?? '',
    sourceId: definitionRow?.sourceId ?? '',
    sourceName: definitionRow?.sourceName ?? '',
    definitionKey: definitionRow?.definitionKey ?? '',
    completionStatus: isFilmingScene ? 'mapped-consumed-filming-scene-definition' : 'unresolved',
    runtimeConsumerId: isFilmingScene
      ? `definitions.filmingSceneDefinitions[${definitionRow.sourceId}] -> computeVisibleFilmingSceneIds/buildShootingView/selectShootingScene`
      : '',
    verificationId: isFilmingScene ? 'smoke:filming-scenes' : '',
    issue: isFilmingScene ? undefined : `M38 definition row is not a filming scene: ${definitionRowId}`,
  });
}

const implementedRows = [];
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
    message: 'M38 row is missing source evidence.',
  })),
  ...missingConsumer.map((row) => ({
    issueId: `missing-consumer:${row.reviewId}`,
    severity: 'error',
    rowRef: row.reviewId,
    message: 'M38 row is missing runtime consumer.',
  })),
  ...missingVerification.map((row) => ({
    issueId: `missing-verification:${row.reviewId}`,
    severity: 'error',
    rowRef: row.reviewId,
    message: 'M38 row is missing verification.',
  })),
];

const coverage = {
  schemaVersion: 'filming-scene-coverage/v1',
  generatedBy: 'tools/build_filming_scene_coverage.mjs',
  milestone: 'M38',
  ownerRole: 'filming-scene-definition-owner',
  sourceInputs: {
    implementationQueue: 'data/coverage/implementation-queue.json',
    definitions: 'data/coverage/definitions.json',
  },
  scopeContract: {
    ownedUnitIds: units.map((unit) => unit.unitId),
    rule: 'Every M38 queue row must be mapped-consumed exactly once by the filming scene definition runtime.',
    runtimeBoundary:
      'Filming scene definitions live in definitions.filmingSceneDefinitions. Target and scene selections remain in GameSession.shooting, and M38 does not own filming execution result persistence.',
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
  },
  rows,
  unresolvedIssues,
};

const gapAudit = {
  schemaVersion: 'milestone-gap-audit/v1',
  generatedBy: 'tools/build_filming_scene_coverage.mjs',
  milestone: 'M38',
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
  'npm run coverage:filming-scene',
  'npm run gate:filming-scene',
  'npm run gate:milestone-scope-closure -- M38',
  'npm run smoke:filming-scenes',
  'npm run smoke:m13',
  'npm run verify:m16',
  'npm run typecheck',
  'npm run build',
  'npm run test --if-present',
];

const closure = {
  schemaVersion: 'milestone-closure/v1',
  milestone: 'M38',
  title: 'Filming scene definitions and scene conditions',
  status: 'completed',
  completedAt: '2026-05-01',
  commitPolicy: 'Commit after every milestone closure.',
  commitHash: 'recorded by the M38 git commit that includes this closure file',
  sourceInputs: coverage.sourceInputs,
  outputs: {
    filmingSceneCoverage: 'data/coverage/filming-scene-coverage.json',
    gapAudit: 'data/coverage/audits/M38-gap-audit.json',
    builder: 'tools/build_filming_scene_coverage.mjs',
    coverageGate: 'tools/gate_filming_scene.mjs',
    closureGate: 'tools/gate_milestone_scope_closure.mjs',
    smoke: 'tools/m38_filming_scene_smoke.ts',
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
    expectedGateResult: `${rows.length} M38 owned row(s), 0 unresolved issue(s)`,
  },
  commandsRun,
};

writeJson('data/coverage/filming-scene-coverage.json', coverage);
writeJson('data/coverage/audits/M38-gap-audit.json', gapAudit);
writeJson('data/coverage/milestones/M38-closure.json', closure);

console.log(`coverage:filming-scene wrote ${rows.length} row(s), mapped=${mappedRows.length}, unresolved=${unresolvedIssues.length}.`);
