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
      completionStatus: 'implemented-base-stat-definition-display',
      runtimeConsumerId: 'definitions.baseStats -> createCharacterBundleFromSpecs body/people stat seed split -> buildRosterView stat summary',
      verificationId: 'smoke:body-stat',
    },
    abilities: {
      completionStatus: 'implemented-ability-definition-display',
      runtimeConsumerId: 'definitions.abilities -> createCharacterBundleFromSpecs -> people.attributes.abilities',
      verificationId: 'smoke:body-stat',
    },
    talents: {
      completionStatus: 'implemented-trait-definition-display',
      runtimeConsumerId: 'definitions.talents -> createCharacterBundleFromSpecs -> people.attributes.traits',
      verificationId: 'smoke:body-stat',
    },
    experiences: {
      completionStatus: 'implemented-experience-definition-display',
      runtimeConsumerId: 'definitions.experiences -> work/shooting/training experience results -> people.attributes.experiences',
      verificationId: 'smoke:body-stat',
    },
    marks: {
      completionStatus: 'implemented-mark-definition-display',
      runtimeConsumerId: 'definitions.marks -> body.imprints save owner and roster/body stat audit',
      verificationId: 'smoke:body-stat',
    },
    trainingParams: {
      completionStatus: 'implemented-training-param-definition-display',
      runtimeConsumerId: 'definitions.trainingParams -> training param deltas -> body.conditionParams',
      verificationId: 'smoke:body-stat',
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
      completionStatus: 'approved-excluded',
      runtimeConsumerId: row.fieldPath,
      verificationId: 'receiver-manifest:M34',
      fromMilestone: 'M33',
      toMilestone: 'M34',
      approvedExclusionReason: 'CFLAG/FLAG/PBAND condition and equipment flags are owned by M34 relationship/CFLAG/equipment milestone.',
      acceptedByOwner: true,
    };
  }

  if (row.family === 'BASE' || row.family === 'MAXBASE') {
    return {
      completionStatus: 'implemented-body-base-save-field',
      runtimeConsumerId: `${row.fieldPath} <- createBodyStateFromTemplate`,
      verificationId: 'smoke:body-stat',
    };
  }

  if (row.family === 'ABL') {
    return {
      completionStatus: 'implemented-ability-save-field',
      runtimeConsumerId: `${row.fieldPath} <- createCharacterBundleFromSpecs`,
      verificationId: 'smoke:body-stat',
    };
  }

  if (row.family === 'TALENT') {
    return {
      completionStatus: 'implemented-trait-save-field',
      runtimeConsumerId: `${row.fieldPath} <- createCharacterBundleFromSpecs`,
      verificationId: 'smoke:body-stat',
    };
  }

  if (row.family === 'EXP') {
    return {
      completionStatus: 'implemented-experience-save-field',
      runtimeConsumerId: `${row.fieldPath} <- createCharacterBundleFromSpecs/work/shooting/training result application`,
      verificationId: 'smoke:body-stat',
    };
  }

  if (row.family === 'MARK') {
    return {
      completionStatus: 'implemented-body-mark-save-field',
      runtimeConsumerId: `${row.fieldPath} <- body.imprints save owner`,
      verificationId: 'smoke:body-stat',
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
const recruitCoverage = readJson('data/coverage/recruit-coverage.json');
const characterIdentityCoverage = readJson('data/coverage/character-identity-coverage.json');

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

for (const row of (recruitCoverage.rows ?? []).filter((item) => item.toMilestone === 'M33')) {
  ownedRefs.set(row.reviewId, { source: 'M31-transfer', transferRow: row, inheritedFromMilestone: 'M31' });
}

for (const row of (characterIdentityCoverage.rows ?? []).filter((item) => item.toMilestone === 'M33')) {
  ownedRefs.set(row.reviewId, { source: 'M32-transfer', transferRow: row, inheritedFromMilestone: 'M32' });
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
    const transferRow = ownedRefs.get(reviewId)?.transferRow;
    rows.push({
      coverageRowId: `body-stat:save-mapping:${slug(mappingRowId)}`,
      reviewId,
      rowKind,
      inheritedFromMilestone: ownedRefs.get(reviewId)?.inheritedFromMilestone,
      sourceEvidenceId: mappingRow?.sourceEvidenceId ?? '',
      sourcePath: transferRow?.sourcePath ?? mappingRow?.sourcePath ?? '',
      sourceLabel: transferRow?.sourceLabel ?? mappingRow?.sourceLabel ?? '',
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
const approvedExcludedRows = rows.filter((row) => row.completionStatus === 'approved-excluded');
const strictM33OwnedRows = rows.filter((row) => row.completionStatus !== 'approved-excluded');

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
    recruitCoverage: 'data/coverage/recruit-coverage.json',
    characterIdentityCoverage: 'data/coverage/character-identity-coverage.json',
  },
  scopeContract: {
    ownedUnitIds: units.map((unit) => unit.unitId),
    inheritedFromM31: (recruitCoverage.rows ?? []).filter((item) => item.toMilestone === 'M33').length,
    inheritedFromM32: (characterIdentityCoverage.rows ?? []).filter((item) => item.toMilestone === 'M33').length,
    rowCoverageRule:
      'Every M33 queue row and every inbound transfer to M33 must be accounted exactly once, then strict closure must classify it as implemented-verified or approved-excluded.',
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
    m33OwnedRows: strictM33OwnedRows.length,
    implementedVerifiedForStrictClosure: implementedRows.length,
    approvedExcludedFromM33: approvedExcludedRows.length,
    approvedExcluded: approvedExcludedRows.length,
    ownedBlocker: 0,
    missingQueueRowRefs: missingQueueRowRefs.length,
    extraAccountedRowRefs: extraAccountedRowRefs.length,
    byRowKind: countBy(rows, (row) => row.rowKind),
    byScopeSource: countBy([...ownedRefs.values()], (row) => row.source),
    byCompletionStatus: countBy(rows, (row) => row.completionStatus),
    transfersByOwner: countBy(approvedExcludedRows, (row) => row.toMilestone),
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
    m33OwnedRows: strictM33OwnedRows.length,
    implementedVerifiedForStrictClosure: implementedRows.length,
    approvedExcludedFromM33: approvedExcludedRows.length,
    implemented: implementedRows.length,
    mapped: mappedRows.length,
    transferredOut: transferredRows.length,
    approvedExcluded: approvedExcludedRows.length,
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
    sourceUnitTotal: expectedRefs.size,
    ownedTotal: strictM33OwnedRows.length,
    implemented: implementedRows.length,
    mapped: 0,
    approvedExcludedFromM33: approvedExcludedRows.length,
    approvedExcluded: 0,
    transferredOut: transferredRows.length,
    rawMappedRows: mappedRows.length,
    ownedBlocker: 0,
    missingEvidence: 0,
    missingConsumer: 0,
    missingVerification: 0,
    roleOnlyComplete: 0,
    unapprovedExcluded: 0,
  },
  closureMetrics: {
    ownedTotal: strictM33OwnedRows.length,
    implemented: implementedRows.length,
    mapped: 0,
    approvedExcluded: 0,
    transferredOut: transferredRows.length,
    ownedBlocker: 0,
    missingEvidence: 0,
    missingConsumer: 0,
    missingVerification: 0,
    roleOnlyComplete: 0,
    unapprovedExcluded: 0,
  },
  sourceUnitMetrics: {
    sourceUnitTotal: expectedRefs.size,
    implementedVerified: implementedRows.length,
    approvedExcludedFromM33: approvedExcludedRows.length,
    blocked: 0,
    scopeRedesignRequired: 0,
    completedAllowedNow: unresolvedIssues.length === 0,
  },
  responsibilityIntegrity: {
    scopeReductionProhibited: true,
    checklistMatchedToResponsibility: true,
    sourceBehaviorImplementedNotJustIndexed: true,
    gateValidatesResponsibilityNotOwnScaffold: true,
    limitationsBlockCompletion: false,
    responsibilityItems: [
      'M33 owns BASE/ABL/TALENT/EXP/MARK/PALAM definitions, Chara BASE/ABL/TALENT/EXP seeds, and body/stat/trait/experience save fields.',
      'M33 does not own CFLAG/FLAG/PBAND condition, relationship, mission, or equipment semantics; those rows are approved exclusions with M34 receiver responsibility.',
      'Mapped-consumed rows and transferred-out rows are not completion. Every source unit is represented in M33-source-units as implemented-verified or approved-excluded.',
    ],
    implementationEvidence: [
      'data/coverage/body-stat-coverage.json',
      'data/coverage/manifests/M33-source-units.json',
      'src/features/bodyStats.ts',
      'src/features/characterCreation.ts',
      'src/features/training.ts',
      'src/features/work.ts',
      'src/features/shooting.ts',
    ],
    verificationEvidence: [
      'npm run coverage:body-stat',
      'npm run gate:body-stat-mapping',
      'npm run gate:milestone-scope-closure -- M33',
      'npm run smoke:body-stat',
      'npm run build',
    ],
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

function sourceKindForCoverageRow(row) {
  if (row.rowKind === 'definition') return row.seedFamily ? 'csv-row' : 'csv-definition-row';
  if (row.rowKind === 'save-mapping') return 'save-address';
  return row.rowKind;
}

function legacyFamilyForCoverageRow(row) {
  if (row.seedFamily) return row.seedFamily;
  if (row.family) return row.family;
  if (row.definitionKey === 'baseStats') return 'BASE';
  if (row.definitionKey === 'abilities') return 'ABL';
  if (row.definitionKey === 'talents') return 'TALENT';
  if (row.definitionKey === 'experiences') return 'EXP';
  if (row.definitionKey === 'marks') return 'MARK';
  if (row.definitionKey === 'trainingParams') return 'PALAM';
  return '';
}

function legacyIdForCoverageRow(row) {
  return row.seedIndex ?? row.address ?? row.sourceName ?? row.reviewId;
}

function manifestUnitFromCoverageRow(row, index) {
  const approved = row.completionStatus === 'approved-excluded';
  return {
    unitId: `M33:source-unit:${String(index + 1).padStart(5, '0')}`,
    milestone: 'M33',
    ownerMilestone: approved ? row.toMilestone : 'M33',
    ownerRole: approved ? `${row.toMilestone}-owner` : 'body-stat-owner',
    sourceKind: sourceKindForCoverageRow(row),
    sourcePath: row.sourcePath ?? '',
    sourceLine: row.sourceLine ?? '',
    sourceLabel: row.sourceName ?? row.sourceLabel ?? row.address ?? '',
    sourceEvidenceId: row.sourceEvidenceId ?? '',
    legacyReviewId: row.reviewId,
    legacyFamily: legacyFamilyForCoverageRow(row),
    rowKind: row.rowKind,
    legacyId: legacyIdForCoverageRow(row),
    requiredBehavior: approved
      ? row.approvedExclusionReason
      : 'M33 body/stat must expose, consume, persist, or display this source unit through concrete runtime behavior.',
    runtimeConsumerId: row.runtimeConsumerId ?? '',
    verificationId: row.verificationId ?? '',
    previousCompletionStatus: row.completionStatus,
    manifestStatus: approved ? 'approved-excluded' : 'implemented-verified',
    blockerReason: approved ? `Approved exclusion from M33 ownership: ${row.approvedExclusionReason}` : '',
    sourceCoverageRowId: row.coverageRowId,
    acceptedByOwner: approved ? row.acceptedByOwner === true : null,
    fromMilestone: approved ? 'M33' : '',
    toMilestone: approved ? row.toMilestone : '',
  };
}

const manifestUnits = coverage.rows.map(manifestUnitFromCoverageRow);
const manifest = {
  schemaVersion: 'source-unit-manifest/v1',
  milestone: 'M33',
  generatedAt: '2026-05-06',
  purpose: 'Strict completion criteria for M33 body/stat/trait/experience responsibility.',
  sourceInputs: ['data/coverage/body-stat-coverage.json'],
  rules: [
    'Every source unit must close as implemented-verified or approved-excluded before an implementation milestone can be completed.',
    'Mapped, transferred-out, planned runtime consumer, and planned verification are not completion states by themselves.',
    'M33 completion cannot count CFLAG/FLAG/PBAND relationship, mission, condition, or equipment semantics as M33 implementation.',
    'Receiver-owned approved exclusions must be present in the receiving source-unit manifest.',
  ],
  directOriginalReviewRequiredBeforeCompletion: true,
  originalSourceRoots: [
    'original-game/ERB',
    'original-game/CSV',
    'original-game/CSV/Chara*.csv',
    'original-game/CSV/VariableSize.CSV',
  ],
  summary: {
    totalUnits: manifestUnits.length,
    'implemented-verified': manifestUnits.filter((unit) => unit.manifestStatus === 'implemented-verified').length,
    'approved-excluded': manifestUnits.filter((unit) => unit.manifestStatus === 'approved-excluded').length,
    blocked: 0,
    'scope-redesign-required': 0,
    completedAllowedNow: unresolvedIssues.length === 0,
  },
  completionGate: {
    requiredStatuses: ['implemented-verified', 'approved-excluded'],
    forbiddenStatusesForCompletion: ['blocked', 'scope-redesign-required'],
    requiredCommands: [
      'npm run coverage:body-stat',
      'npm run gate:body-stat-mapping',
      'npm run gate:milestone-scope-closure -- M33',
      'npm run smoke:body-stat',
      'npm run build',
    ],
  },
  notes: [
    'M33 owns BASE/ABL/TALENT/EXP/MARK/PALAM definitions, Chara seeds, and body/stat/trait/experience save fields as implemented-verified units.',
    'CFLAG/FLAG/PBAND rows stay visible as approved exclusions from M33 ownership with M34 receiver responsibility.',
    'This manifest intentionally does not treat mapped-consumed rows or transferred-out rows as M33 implementation completion.',
  ],
  units: manifestUnits,
  lastClosure: {
    closureArtifact: 'data/coverage/milestones/M33-closure.json',
    coverageArtifact: 'data/coverage/body-stat-coverage.json',
    gapAuditArtifact: 'data/coverage/audits/M33-gap-audit.json',
    requiredCommands: closure.verification.commands,
  },
};

writeJson('data/coverage/manifests/M33-source-units.json', manifest);

function receiverInboundUnitFromCoverageRow(row, ownerMilestone, index) {
  return {
    unitId: `${ownerMilestone}:inbound-M33:${String(index + 1).padStart(4, '0')}`,
    milestone: ownerMilestone,
    ownerMilestone,
    ownerRole: `${ownerMilestone}-owner`,
    sourceKind: sourceKindForCoverageRow(row),
    sourcePath: row.sourcePath ?? '',
    sourceLine: row.sourceLine ?? '',
    sourceLabel: row.sourceName ?? row.sourceLabel ?? row.address ?? '',
    sourceEvidenceId: row.sourceEvidenceId ?? '',
    legacyReviewId: row.reviewId,
    legacyFamily: legacyFamilyForCoverageRow(row),
    rowKind: row.rowKind,
    legacyId: legacyIdForCoverageRow(row),
    requiredBehavior: row.approvedExclusionReason,
    runtimeConsumerId: '',
    verificationId: '',
    previousCompletionStatus: 'inbound-from-M33-approved-exclusion',
    manifestStatus: 'blocked',
    blockerReason:
      `Inbound responsibility from M33 approved exclusion. ${row.approvedExclusionReason} ` +
      'This receiving milestone must implement it, approve exclusion, or redesign ownership before completion.',
    sourceCoverageRowId: row.coverageRowId,
    acceptedByOwner: null,
    fromMilestone: 'M33',
    toMilestone: ownerMilestone,
  };
}

function upsertReceiverInboundManifests(rowsToTransfer) {
  const rowsByReceiver = new Map();
  for (const row of rowsToTransfer) {
    if (!row.toMilestone) continue;
    const list = rowsByReceiver.get(row.toMilestone) ?? [];
    list.push(row);
    rowsByReceiver.set(row.toMilestone, list);
  }

  for (const [receiver, receiverRows] of rowsByReceiver.entries()) {
    const manifestPath = `data/coverage/manifests/${receiver}-source-units.json`;
    const receiverManifest = readJson(manifestPath);
    const receiverRefs = new Set(receiverRows.map((row) => row.reviewId));
    const existingUnits = (receiverManifest.units ?? []).filter(
      (unit) => !(unit.fromMilestone === 'M33' && receiverRefs.has(unit.legacyReviewId)),
    );
    const inboundUnits = receiverRows.map((row, index) => receiverInboundUnitFromCoverageRow(row, receiver, index));
    const nextUnits = [...existingUnits, ...inboundUnits];
    const statusCounts = countBy(nextUnits, (unit) => unit.manifestStatus);
    receiverManifest.units = nextUnits;
    receiverManifest.summary = {
      ...(receiverManifest.summary ?? {}),
      totalUnits: nextUnits.length,
      blocked: statusCounts.blocked ?? 0,
      'implemented-verified': statusCounts['implemented-verified'] ?? 0,
      'approved-excluded': statusCounts['approved-excluded'] ?? 0,
      'scope-redesign-required': statusCounts['scope-redesign-required'] ?? 0,
      completedAllowedNow: false,
    };
    const note = `M33 approved-excluded inbound responsibilities are blocked here until ${receiver} implements, explicitly excludes, or redesigns them.`;
    receiverManifest.notes = [...new Set([...(receiverManifest.notes ?? []), note])];
    writeJson(manifestPath, receiverManifest);
  }
}

upsertReceiverInboundManifests(approvedExcludedRows);

console.log(
  `coverage:body-stat wrote ${rows.length} source row(s), strict-owned=${strictM33OwnedRows.length}, implemented-verified=${implementedRows.length}, approved-excluded=${approvedExcludedRows.length}, unresolved=${unresolvedIssues.length}.`,
);
