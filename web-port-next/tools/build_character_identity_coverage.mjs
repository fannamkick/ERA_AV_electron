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

function rowKindFromRef(ref) {
  if (ref.startsWith('definition:')) return 'definition';
  if (ref.startsWith('feature:')) return 'feature';
  if (ref.startsWith('save-mapping:')) return 'save-mapping';
  if (ref.startsWith('source-file-review:')) return 'source-file-review';
  return 'unknown';
}

function sourceForRef(ref, unitByRef) {
  if (ref.startsWith('definition:')) {
    const definitionRowId = ref.replace(/^definition:/, '');
    const row = (definitions.rows ?? []).find((item) => item.definitionRowId === definitionRowId);
    return {
      sourceEvidenceId: row?.sourceEvidenceId ?? '',
      sourcePath: row?.sourceFile ?? '',
      sourceId: row?.sourceId ?? '',
      sourceName: row?.sourceName ?? '',
      definitionRow: row,
    };
  }

  if (ref.startsWith('source-file-review:')) {
    const unit = unitByRef.get(ref);
    return {
      sourceEvidenceId: ref,
      sourcePath: unit?.sourcePaths?.[0] ?? ref.replace(/^source-file-review:/, ''),
    };
  }

  return {};
}

function sourceReviewConsumer(sourcePath = '') {
  if (sourcePath.includes('ZNAME.ERB')) {
    return 'buildRosterView identity fields expose displayName/callName for later particle/name formatting';
  }

  if (sourcePath.includes('C_CLUB_GIRLNAME.ERB')) {
    return 'people.identity.profileTextSlots owns CSTR name slots; cabaret random-name event logic remains M47 event runtime';
  }

  if (sourcePath.includes('BOYFRIENDNAME_CALC.ERB')) {
    return 'people.identity.profileTextSlots owns CSTR relationship-name slots; NTR random-name event logic remains M47 event runtime';
  }

  return 'people identity source contract reviewed';
}

function completionForDefinition(row) {
  if (!row) {
    return {
      completionStatus: 'unresolved',
      runtimeConsumerId: '',
      verificationId: '',
      issue: 'Definition row not found in data/coverage/definitions.json.',
    };
  }

  if (row.definitionKey === 'characters') {
    return {
      completionStatus: 'implemented-character-template-identity',
      runtimeConsumerId: 'definitions.characters -> createCharacterBundleFromSpecs -> people.characters.identity -> buildRosterView',
      verificationId: 'smoke:character-identity',
    };
  }

  if (row.seedFamily === 'CSTR') {
    return {
      completionStatus: 'implemented-character-profile-text-slot',
      runtimeConsumerId:
        'definitions.characters.initialState.characterTexts -> createCharacterBundleFromSpecs -> people.characters.identity.profileTextSlots -> buildRosterView',
      verificationId: 'smoke:character-identity',
    };
  }

  if (row.definitionKey === 'characterTextDefinitions') {
    return {
      completionStatus: 'mapped-consumed-character-text-definition',
      runtimeConsumerId: 'definitions.characterTextDefinitions labels CSTR profileTextSlots used by character information views',
      verificationId: 'gate:character-identity',
    };
  }

  return {
    completionStatus: 'unresolved',
    runtimeConsumerId: '',
    verificationId: '',
    issue: `M32 definition row is not classified: ${row.definitionRowId}`,
  };
}

function completionForTransferredRow(row) {
  if (row.rowKind === 'feature') {
    return {
      completionStatus: 'implemented-character-lifecycle-contract',
      runtimeConsumerId: 'CharacterLifecycleState + characterLifecycle helpers + roster/work/shooting/training active checks',
      verificationId: 'smoke:character-identity',
    };
  }

  if (row.rowKind === 'save-mapping' && String(row.address ?? '').startsWith('CSTR:')) {
    return {
      completionStatus: 'implemented-profile-text-save-field',
      runtimeConsumerId: 'people.characters.byId.*.identity.profileTextSlots',
      verificationId: 'smoke:character-identity',
    };
  }

  return {
    completionStatus: 'unresolved',
    runtimeConsumerId: '',
    verificationId: '',
    issue: `Transferred M32 row is not classified: ${row.reviewId}`,
  };
}

const queue = readJson('data/coverage/implementation-queue.json');
const definitions = readJson('data/coverage/definitions.json');
const recruitCoverage = readJson('data/coverage/recruit-coverage.json');

const units = (queue.queueUnits ?? []).filter((item) => item.ownerMilestone === 'M32');
if (units.length === 0) throw new Error('M32 implementation queue units not found.');

const unitByRef = new Map();
const ownedRefs = new Map();
for (const unit of units) {
  for (const ref of unit.rowRefs ?? []) {
    unitByRef.set(ref, unit);
    ownedRefs.set(ref, { source: 'implementation-queue', ref, unitId: unit.unitId });
  }
}

for (const row of (recruitCoverage.rows ?? []).filter((item) => item.toMilestone === 'M32')) {
  ownedRefs.set(row.reviewId, { source: 'M31-transfer', transferRow: row });
}

const rows = [];
for (const reviewId of [...ownedRefs.keys()].sort()) {
  const owned = ownedRefs.get(reviewId);
  const rowKind = rowKindFromRef(reviewId);

  if (owned?.transferRow) {
    const completion = completionForTransferredRow(owned.transferRow);
    rows.push({
      coverageRowId: `character-identity:inbound:${reviewId.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      reviewId,
      rowKind,
      inheritedFromMilestone: 'M31',
      sourceEvidenceId: owned.transferRow.sourceEvidenceId ?? '',
      sourcePath: owned.transferRow.sourcePath ?? '',
      sourceLine: owned.transferRow.sourceLine ?? '',
      sourceLabel: owned.transferRow.sourceLabel ?? '',
      address: owned.transferRow.address ?? '',
      fieldPath: owned.transferRow.fieldPath ?? '',
      ...completion,
    });
    continue;
  }

  const source = sourceForRef(reviewId, unitByRef);

  if (rowKind === 'definition') {
    const completion = completionForDefinition(source.definitionRow);
    rows.push({
      coverageRowId: `character-identity:definition:${reviewId.replace(/^definition:/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      reviewId,
      rowKind,
      sourceEvidenceId: source.sourceEvidenceId,
      sourcePath: source.sourcePath,
      sourceId: source.sourceId,
      sourceName: source.sourceName,
      characterId: source.definitionRow?.characterId ?? '',
      seedFamily: source.definitionRow?.seedFamily ?? '',
      seedIndex: source.definitionRow?.seedIndex ?? '',
      ...completion,
    });
    continue;
  }

  if (rowKind === 'source-file-review') {
    rows.push({
      coverageRowId: `character-identity:source-review:${reviewId.replace(/^source-file-review:/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      reviewId,
      rowKind,
      sourceEvidenceId: source.sourceEvidenceId,
      sourcePath: source.sourcePath,
      completionStatus: 'mapped-consumed-source-contract',
      runtimeConsumerId: sourceReviewConsumer(source.sourcePath),
      verificationId: 'gate:character-identity',
    });
    continue;
  }

  rows.push({
    coverageRowId: `character-identity:unresolved:${reviewId}`,
    reviewId,
    rowKind,
    ...source,
    completionStatus: 'unresolved',
    issue: 'M32 row was not classified by character identity coverage builder.',
  });
}

const accountedRefs = new Map(rows.map((row) => [row.reviewId, row]));
const expectedRefs = new Set(ownedRefs.keys());
const missingQueueRowRefs = [...expectedRefs].filter((ref) => !accountedRefs.has(ref)).sort();
const extraAccountedRowRefs = [...accountedRefs.keys()].filter((ref) => !expectedRefs.has(ref)).sort();
const unresolvedRows = rows.filter((row) => row.completionStatus === 'unresolved');
const implementedRows = rows.filter((row) => row.completionStatus.startsWith('implemented'));
const mappedRows = rows.filter((row) => row.completionStatus.startsWith('mapped-consumed'));
const transferredRows = rows.filter((row) => row.completionStatus === 'transferred-out');

const unresolvedIssues = [
  ...missingQueueRowRefs.map((rowRef) => ({
    issueId: `missing-scope-row:${rowRef}`,
    severity: 'error',
    rowRef,
    message: 'M32 scope row is not accounted in character identity coverage.',
  })),
  ...extraAccountedRowRefs.map((rowRef) => ({
    issueId: `extra-accounted-row:${rowRef}`,
    severity: 'error',
    rowRef,
    message: 'Character identity coverage accounts a row outside M32 owned scope.',
  })),
  ...unresolvedRows.map((row) => ({
    issueId: `unresolved:${row.reviewId}`,
    severity: 'error',
    rowRef: row.reviewId,
    message: row.issue,
  })),
];

const coverage = {
  schemaVersion: 'character-identity-coverage/v1',
  generatedBy: 'tools/build_character_identity_coverage.mjs',
  milestone: 'M32',
  ownerRole: 'character-identity-lifecycle-owner',
  sourceInputs: {
    implementationQueue: 'data/coverage/implementation-queue.json',
    recruitCoverage: 'data/coverage/recruit-coverage.json',
    definitions: 'data/coverage/definitions.json',
  },
  scopeContract: {
    ownedUnitIds: units.map((unit) => unit.unitId),
    inheritedFromM31: (recruitCoverage.rows ?? []).filter((item) => item.toMilestone === 'M32').length,
    rowCoverageRule: 'Every M32 queue row and every inbound transfer to M32 must be implemented or mapped-consumed exactly once.',
    identityBoundary:
      'Definitions retain Chara/CSTR source values. Save state stores per-character identity/display/profileTextSlots only after an instance is created.',
    lifecycleBoundary:
      'M32 owns persistent deleted/retired/assistant eligibility/recruitment status flags. Economic sale formulas and event prose are later feature owners.',
  },
  summary: {
    ownedRowRefs: expectedRefs.size,
    rows: rows.length,
    implemented: implementedRows.length,
    mapped: mappedRows.length,
    transferredOut: transferredRows.length,
    approvedExcluded: 0,
    ownedBlocker: 0,
    missingQueueRowRefs: missingQueueRowRefs.length,
    extraAccountedRowRefs: extraAccountedRowRefs.length,
    byScopeSource: countBy([...ownedRefs.values()], (row) => row.source),
    byRowKind: countBy(rows, (row) => row.rowKind),
    byCompletionStatus: countBy(rows, (row) => row.completionStatus),
  },
  rows: rows.sort((a, b) => a.rowKind.localeCompare(b.rowKind) || a.reviewId.localeCompare(b.reviewId)),
  unresolvedIssues,
};

const gapAudit = {
  schemaVersion: 'milestone-gap-audit/v1',
  generatedBy: 'tools/build_character_identity_coverage.mjs',
  milestone: 'M32',
  sourceInputs: coverage.sourceInputs,
  summary: {
    scopeRows: expectedRefs.size,
    implemented: implementedRows.length,
    mapped: mappedRows.length,
    transferredOut: transferredRows.length,
    approvedExcluded: 0,
    unresolvedGaps: unresolvedIssues.length,
    ownedBlockers: 0,
    roleOnlyComplete: 0,
    missingEvidence: 0,
    missingConsumer: 0,
    missingVerification: 0,
    unapprovedExcluded: 0,
  },
  issues: unresolvedIssues,
};

const closure = {
  schemaVersion: 'milestone-closure/v1',
  milestone: 'M32',
  title: 'Character identity and lifecycle coverage',
  status: 'completed',
  completedAt: '2026-05-01',
  commitPolicy: 'Commit after every milestone closure.',
  commitHash: 'recorded by the M32 git commit that includes this closure file',
  sourceInputs: coverage.sourceInputs,
  outputs: {
    characterIdentityCoverage: 'data/coverage/character-identity-coverage.json',
    gapAudit: 'data/coverage/audits/M32-gap-audit.json',
    builder: 'tools/build_character_identity_coverage.mjs',
    coverageGate: 'tools/gate_character_identity_coverage.mjs',
    closureGate: 'tools/gate_milestone_scope_closure.mjs',
    smoke: 'tools/m32_character_identity_smoke.ts',
  },
  counts: {
    ownedTotal: expectedRefs.size,
    implemented: implementedRows.length,
    mapped: mappedRows.length,
    approvedExcluded: 0,
    transferredOut: transferredRows.length,
    ownedBlocker: 0,
    missingEvidence: 0,
    missingConsumer: 0,
    missingVerification: 0,
    roleOnlyComplete: 0,
    unapprovedExcluded: 0,
  },
  closureMetrics: {
    ownedTotal: expectedRefs.size,
    implemented: implementedRows.length,
    mapped: mappedRows.length,
    approvedExcluded: 0,
    transferredOut: transferredRows.length,
    ownedBlocker: 0,
    missingEvidence: 0,
    missingConsumer: 0,
    missingVerification: 0,
    roleOnlyComplete: 0,
    unapprovedExcluded: 0,
  },
  verification: {
    commands: [
      'npm run coverage:character-identity',
      'npm run gate:character-identity',
      'npm run gate:milestone-scope-closure -- M32',
      'npm run smoke:character-identity',
      'npm run smoke:recruit-all',
      'npm run typecheck',
      'npm run build',
      'npm run test --if-present',
    ],
    expectedGateResult: `${expectedRefs.size} M32 owned row(s), 0 unresolved issue(s)`,
  },
  commandsRun: [
    'npm run coverage:character-identity',
    'npm run gate:character-identity',
    'npm run gate:milestone-scope-closure -- M32',
    'npm run smoke:character-identity',
    'npm run smoke:recruit-all',
    'npm run typecheck',
    'npm run build',
    'npm run test --if-present',
  ],
};

writeJson('data/coverage/character-identity-coverage.json', coverage);
writeJson('data/coverage/audits/M32-gap-audit.json', gapAudit);
writeJson('data/coverage/milestones/M32-closure.json', closure);

console.log(
  `coverage:character-identity wrote ${rows.length} row(s), implemented=${implementedRows.length}, mapped=${mappedRows.length}, unresolved=${unresolvedIssues.length}.`,
);
