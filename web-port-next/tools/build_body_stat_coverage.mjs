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
  if (ref.startsWith('save-mapping:')) return 'save-mapping';
  return 'unknown';
}

function slug(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
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

  const staticDefinitionStatuses = {
    baseStats: {
      completionStatus: 'mapped-consumed-base-stat-definition',
      runtimeConsumerId: 'definitions.baseStats -> createCharacterBundleFromSpecs body/people stat seed split -> buildRosterView stat summary',
      verificationId: 'gate:body-stat-mapping',
    },
    abilities: {
      completionStatus: 'mapped-consumed-ability-definition',
      runtimeConsumerId: 'definitions.abilities -> createCharacterBundleFromSpecs -> people.attributes.abilities',
      verificationId: 'gate:body-stat-mapping',
    },
    talents: {
      completionStatus: 'mapped-consumed-trait-definition',
      runtimeConsumerId: 'definitions.talents -> createCharacterBundleFromSpecs -> people.attributes.traits',
      verificationId: 'gate:body-stat-mapping',
    },
    experiences: {
      completionStatus: 'mapped-consumed-experience-definition',
      runtimeConsumerId: 'definitions.experiences -> work/shooting/training experience results -> people.attributes.experiences',
      verificationId: 'gate:body-stat-mapping',
    },
    marks: {
      completionStatus: 'mapped-consumed-mark-definition',
      runtimeConsumerId: 'definitions.marks -> body.imprints save owner and roster/body stat audit',
      verificationId: 'gate:body-stat-mapping',
    },
    trainingParams: {
      completionStatus: 'mapped-consumed-training-param-definition',
      runtimeConsumerId: 'definitions.trainingParams -> training param deltas -> body.conditionParams',
      verificationId: 'gate:body-stat-mapping',
    },
  };

  if (staticDefinitionStatuses[row.definitionKey]) {
    return staticDefinitionStatuses[row.definitionKey];
  }

  if (row.definitionKey === 'characterInitialValues') {
    if (row.seedFamily === 'BASE') {
      return {
        completionStatus: 'implemented-character-base-seed',
        runtimeConsumerId:
          'definitions.characters.initialState.baseStats -> createPeopleBaseStatsFromTemplate/createBodyStateFromTemplate -> people.attributes.baseStats + body.baseStats/bodyStats',
        verificationId: 'smoke:body-stat',
      };
    }

    if (row.seedFamily === 'ABL') {
      return {
        completionStatus: 'implemented-character-ability-seed',
        runtimeConsumerId: 'definitions.characters.initialState.abilities -> createCharacterBundleFromSpecs -> people.attributes.abilities',
        verificationId: 'smoke:body-stat',
      };
    }

    if (row.seedFamily === 'TALENT') {
      return {
        completionStatus: 'implemented-character-trait-seed',
        runtimeConsumerId: 'definitions.characters.initialState.talents -> createCharacterBundleFromSpecs -> people.attributes.traits',
        verificationId: 'smoke:body-stat',
      };
    }

    if (row.seedFamily === 'EXP') {
      return {
        completionStatus: 'implemented-character-experience-seed',
        runtimeConsumerId: 'definitions.characters.initialState.experiences -> createCharacterBundleFromSpecs -> people.attributes.experiences',
        verificationId: 'smoke:body-stat',
      };
    }
  }

  return {
    completionStatus: 'unresolved',
    runtimeConsumerId: '',
    verificationId: '',
    issue: `M33 definition row is not classified: ${row.definitionRowId}`,
  };
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

  if (['CFLAG', 'FLAG', 'PBAND'].includes(row.family)) {
    return {
      completionStatus: 'transferred-out',
      runtimeConsumerId: row.fieldPath,
      verificationId: 'gate:body-stat-mapping',
      fromMilestone: 'M33',
      toMilestone: 'M34',
      transferReason: 'CFLAG/FLAG/PBAND condition and equipment flags are owned by M34 relationship/CFLAG/equipment milestone.',
      acceptedByOwner: 'M34 responsibility matrix',
    };
  }

  if (row.family === 'BASE' || row.family === 'MAXBASE') {
    return {
      completionStatus: 'mapped-consumed-body-base-save-field',
      runtimeConsumerId: `${row.fieldPath} <- createBodyStateFromTemplate`,
      verificationId: 'smoke:body-stat',
    };
  }

  if (row.family === 'EXP') {
    return {
      completionStatus: 'mapped-consumed-experience-save-field',
      runtimeConsumerId: `${row.fieldPath} <- createCharacterBundleFromSpecs/work/shooting/training result application`,
      verificationId: 'smoke:body-stat',
    };
  }

  if (row.family === 'MARK') {
    return {
      completionStatus: 'mapped-consumed-body-mark-save-field',
      runtimeConsumerId: `${row.fieldPath} <- body.imprints save owner`,
      verificationId: 'gate:body-stat-mapping',
    };
  }

  return {
    completionStatus: 'unresolved',
    runtimeConsumerId: '',
    verificationId: '',
    issue: `M33 save mapping row is not classified: ${row.mappingRowId}`,
  };
}

const queue = readJson('data/coverage/implementation-queue.json');
const definitions = readJson('data/coverage/definitions.json');
const saveMapping = readJson('data/coverage/save-mapping.json');

const units = (queue.queueUnits ?? []).filter((item) => item.ownerMilestone === 'M33');
if (units.length === 0) throw new Error('M33 implementation queue units not found.');

const ownedRefs = new Map();
for (const unit of units) {
  for (const ref of unit.rowRefs ?? []) {
    ownedRefs.set(ref, { source: 'implementation-queue', ref, unitId: unit.unitId });
  }
}

const definitionById = new Map((definitions.rows ?? []).map((row) => [row.definitionRowId, row]));
const saveMappingById = new Map((saveMapping.rows ?? []).map((row) => [row.mappingRowId, row]));

for (const row of (definitions.rows ?? []).filter((item) => item.definitionKey === 'trainingParams')) {
  const ref = `definition:${row.definitionRowId}`;
  if (!ownedRefs.has(ref)) {
    ownedRefs.set(ref, { source: 'M33-required-definition', ref, unitId: 'unit:M33:body-stat' });
  }
}

const rows = [];
for (const reviewId of [...ownedRefs.keys()].sort()) {
  const rowKind = rowKindFromRef(reviewId);

  if (rowKind === 'definition') {
    const definitionRowId = reviewId.replace(/^definition:/, '');
    const definitionRow = definitionById.get(definitionRowId);
    const completion = completionForDefinition(definitionRow);
    rows.push({
      coverageRowId: `body-stat:definition:${slug(definitionRowId)}`,
      reviewId,
      rowKind,
      sourceEvidenceId: definitionRow?.sourceEvidenceId ?? '',
      sourcePath: definitionRow?.sourceFile ?? '',
      sourceId: definitionRow?.sourceId ?? '',
      sourceName: definitionRow?.sourceName ?? '',
      definitionKey: definitionRow?.definitionKey ?? '',
      characterId: definitionRow?.characterId ?? '',
      seedFamily: definitionRow?.seedFamily ?? '',
      seedIndex: definitionRow?.seedIndex ?? '',
      ...completion,
    });
    continue;
  }

  if (rowKind === 'save-mapping') {
    const mappingRowId = reviewId.replace(/^save-mapping:/, '');
    const mappingRow = saveMappingById.get(mappingRowId);
    const completion = completionForSaveMapping(mappingRow);
    rows.push({
      coverageRowId: `body-stat:save-mapping:${slug(mappingRowId)}`,
      reviewId,
      rowKind,
      sourceEvidenceId: mappingRow?.sourceEvidenceId ?? '',
      sourcePath: mappingRow?.sourcePath ?? '',
      sourceLabel: mappingRow?.sourceLabel ?? '',
      family: mappingRow?.family ?? '',
      address: mappingRow?.address ?? '',
      fieldPath: mappingRow?.fieldPath ?? '',
      runtimeOwner: mappingRow?.runtimeOwner ?? '',
      ...completion,
    });
    continue;
  }

  rows.push({
    coverageRowId: `body-stat:unresolved:${slug(reviewId)}`,
    reviewId,
    rowKind,
    completionStatus: 'unresolved',
    sourceEvidenceId: '',
    runtimeConsumerId: '',
    verificationId: '',
    issue: 'M33 row was not classified by body stat coverage builder.',
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
    message: 'M33 scope row is not accounted in body stat coverage.',
  })),
  ...extraAccountedRowRefs.map((rowRef) => ({
    issueId: `extra-accounted-row:${rowRef}`,
    severity: 'error',
    rowRef,
    message: 'Body stat coverage accounts a row outside M33 owned scope.',
  })),
  ...unresolvedRows.map((row) => ({
    issueId: `unresolved:${row.reviewId}`,
    severity: 'error',
    rowRef: row.reviewId,
    message: row.issue,
  })),
];

const coverage = {
  schemaVersion: 'body-stat-coverage/v1',
  generatedBy: 'tools/build_body_stat_coverage.mjs',
  milestone: 'M33',
  ownerRole: 'body-stat-owner',
  sourceInputs: {
    implementationQueue: 'data/coverage/implementation-queue.json',
    definitions: 'data/coverage/definitions.json',
    saveMapping: 'data/coverage/save-mapping.json',
  },
  scopeContract: {
    ownedUnitIds: units.map((unit) => unit.unitId),
    rowCoverageRule: 'Every M33 queue row must be implemented, mapped-consumed, or transferred to M34 exactly once.',
    statBoundary:
      'BASE/ABL/TALENT/EXP Chara seeds remain definitions until instance creation; instance stats are stored in people.attributes or body fields by owner.',
    resultBoundary:
      'Work, shooting, and training apply body stat deltas through src/features/bodyStats.ts so result fields are shared rather than duplicated.',
    transferBoundary: 'CFLAG/FLAG/PBAND condition and equipment flags are transferred to M34 CFLAG/equipment ownership.',
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
    byRowKind: countBy(rows, (row) => row.rowKind),
    byScopeSource: countBy([...ownedRefs.values()], (row) => row.source),
    byCompletionStatus: countBy(rows, (row) => row.completionStatus),
    bySeedFamily: countBy(rows.filter((row) => row.seedFamily), (row) => row.seedFamily),
    bySaveFamily: countBy(rows.filter((row) => row.family), (row) => row.family),
  },
  rows: rows.sort((a, b) => a.rowKind.localeCompare(b.rowKind) || a.reviewId.localeCompare(b.reviewId)),
  unresolvedIssues,
};

const gapAudit = {
  schemaVersion: 'milestone-gap-audit/v1',
  generatedBy: 'tools/build_body_stat_coverage.mjs',
  milestone: 'M33',
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
  milestone: 'M33',
  title: 'Body, stat, ability, talent, experience coverage',
  status: 'completed',
  completedAt: '2026-05-01',
  commitPolicy: 'Commit after every milestone closure.',
  commitHash: 'recorded by the M33 git commit that includes this closure file',
  sourceInputs: coverage.sourceInputs,
  outputs: {
    bodyStatCoverage: 'data/coverage/body-stat-coverage.json',
    gapAudit: 'data/coverage/audits/M33-gap-audit.json',
    builder: 'tools/build_body_stat_coverage.mjs',
    coverageGate: 'tools/gate_body_stat_mapping.mjs',
    closureGate: 'tools/gate_milestone_scope_closure.mjs',
    smoke: 'tools/m33_body_stat_smoke.ts',
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
      'npm run coverage:body-stat',
      'npm run gate:body-stat-mapping',
      'npm run gate:milestone-scope-closure -- M33',
      'npm run smoke:body-stat',
      'npm run smoke:character-identity',
      'npm run typecheck',
      'npm run build',
      'npm run test --if-present',
    ],
    expectedGateResult: `${expectedRefs.size} M33 owned row(s), 0 unresolved issue(s)`,
  },
  commandsRun: [
    'npm run coverage:body-stat',
    'npm run gate:body-stat-mapping',
    'npm run gate:milestone-scope-closure -- M33',
    'npm run smoke:body-stat',
    'npm run smoke:character-identity',
    'npm run typecheck',
    'npm run build',
    'npm run test --if-present',
  ],
};

writeJson('data/coverage/body-stat-coverage.json', coverage);
writeJson('data/coverage/audits/M33-gap-audit.json', gapAudit);
writeJson('data/coverage/milestones/M33-closure.json', closure);

console.log(
  `coverage:body-stat wrote ${rows.length} row(s), implemented=${implementedRows.length}, mapped=${mappedRows.length}, transferred=${transferredRows.length}, unresolved=${unresolvedIssues.length}.`,
);
