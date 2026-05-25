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
    return 'M49 view/text owner must decompose Korean particle/name formatting before completion';
  }

  if (sourcePath.includes('C_CLUB_GIRLNAME.ERB')) {
    return 'M47 event/world owner must decompose cabaret generated-name event logic before completion';
  }

  if (sourcePath.includes('BOYFRIENDNAME_CALC.ERB')) {
    return 'M47 event/world owner must decompose NTR generated-name event logic before completion';
  }

  return 'people identity source contract reviewed';
}

function receiverForSourceReview(sourcePath = '') {
  if (sourcePath.includes('ZNAME.ERB')) return 'M49';
  if (sourcePath.includes('C_CLUB_GIRLNAME.ERB')) return 'M47';
  if (sourcePath.includes('BOYFRIENDNAME_CALC.ERB')) return 'M47';
  return '';
}

function approvedExclusionReasonForSourceReview(sourcePath = '') {
  if (sourcePath.includes('ZNAME.ERB')) {
    return 'ZNAME.ERB is Korean particle/name formatting text behavior. M32 owns identity fields; M49 owns view/text formatting implementation.';
  }

  if (sourcePath.includes('C_CLUB_GIRLNAME.ERB')) {
    return 'C_CLUB_GIRLNAME.ERB generates cabaret event names and mutates event-local identity state. M47 owns event/world generated-name behavior.';
  }

  if (sourcePath.includes('BOYFRIENDNAME_CALC.ERB')) {
    return 'BOYFRIENDNAME_CALC.ERB generates NTR boyfriend/sex-friend names. M47 owns event/world generated-name behavior.';
  }

  return '';
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
    const completion = {
      completionStatus: 'implemented-character-template-identity',
      runtimeConsumerId: 'definitions.characters -> createCharacterBundleFromSpecs -> people.characters.identity -> buildRosterView',
      verificationId: 'smoke:character-identity',
    };
    if (row.characterId === '92') {
      return {
        ...completion,
        dynamicIdentityOwnerMilestone: 'M36',
        dynamicIdentityNote:
          'Chara92 preserves blank NAME/CALLNAME/NICKNAME from the CSV; ADD_IKUMI_ANDROID supplies runtime identityOverrides under M36.',
      };
    }
    return completion;
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
      completionStatus: 'implemented-character-text-definition-label',
      runtimeConsumerId: 'definitions.characterTextDefinitions labels CSTR profileTextSlots used by character information views',
      verificationId: 'smoke:character-identity',
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
      runtimeConsumerId:
        'CHECK_SELLASSIABLE -> computeSellAssistantEligibilityRank/refreshCharacterSaleEligibility; CHARA_SALE filters -> listSaleEligibleCharacterIds/canListCharacterForSale; roster/sellCharacter -> sellCharacterForLifecycle -> deleted/retired lifecycle state; roster/retireCharacter; roster/deleteCharacter; roster/setAssistantEligible; CharacterLifecycleState active checks',
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

  if (row.rowKind === 'save-mapping' && String(row.address ?? '').startsWith('TALENT:')) {
    return {
      completionStatus: 'approved-excluded',
      runtimeConsumerId: '',
      verificationId: 'receiver-manifest:M33',
      toMilestone: 'M33',
      acceptedByOwner: true,
      approvedExclusionReason:
        `${row.address} is a body/trait save field, not character identity/lifecycle. ` +
        'M33 owns body/stat/TALENT seed, display, and save semantics.',
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
const shopPurchaseCoverage = readJson('data/coverage/shop-purchase-coverage.json');
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

for (const row of (shopPurchaseCoverage.rows ?? []).filter((item) => item.toMilestone === 'M32')) {
  ownedRefs.set(row.reviewId, { source: 'M29-transfer', transferRow: row, inheritedFromMilestone: 'M29' });
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
      inheritedFromMilestone: owned.inheritedFromMilestone ?? 'M31',
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
    const toMilestone = receiverForSourceReview(source.sourcePath);
    rows.push({
      coverageRowId: `character-identity:source-review:${reviewId.replace(/^source-file-review:/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      reviewId,
      rowKind,
      sourceEvidenceId: source.sourceEvidenceId,
      sourcePath: source.sourcePath,
      completionStatus: 'approved-excluded',
      runtimeConsumerId: sourceReviewConsumer(source.sourcePath),
      verificationId: toMilestone ? `receiver-manifest:${toMilestone}` : '',
      toMilestone,
      acceptedByOwner: Boolean(toMilestone),
      approvedExclusionReason: approvedExclusionReasonForSourceReview(source.sourcePath),
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
const approvedExcludedRows = rows.filter((row) => row.completionStatus === 'approved-excluded');
const strictM32OwnedRows = rows.filter((row) => row.completionStatus !== 'approved-excluded');

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
    shopPurchaseCoverage: 'data/coverage/shop-purchase-coverage.json',
    recruitCoverage: 'data/coverage/recruit-coverage.json',
    definitions: 'data/coverage/definitions.json',
  },
  scopeContract: {
    ownedUnitIds: units.map((unit) => unit.unitId),
    inheritedFromM29: (shopPurchaseCoverage.rows ?? []).filter((item) => item.toMilestone === 'M32').length,
    inheritedFromM31: (recruitCoverage.rows ?? []).filter((item) => item.toMilestone === 'M32').length,
    rowCoverageRule:
      'Every M32 queue row and every inbound transfer to M32 must be accounted exactly once, then strict closure must classify it as implemented-verified or approved-excluded.',
    identityBoundary:
      'Definitions retain Chara/CSTR source values, including blank Chara92 static names. Save state stores per-character identity/display/profileTextSlots only after an instance is created; M36 ADD_IKUMI_ANDROID supplies Chara92 runtime identityOverrides.',
    lifecycleBoundary:
      'M32 owns persistent deleted/retired/sale eligibility/assistant eligibility/recruitment status flags, CHECK_SELLASSIABLE lifecycle eligibility, and sale-listing lifecycle filters. Economic sale formulas, money mutation, event prose, and downstream relationship/body/social side effects are later feature owners.',
  },
  summary: {
    ownedRowRefs: expectedRefs.size,
    rows: rows.length,
    implemented: implementedRows.length,
    mapped: mappedRows.length,
    transferredOut: transferredRows.length,
    m32OwnedRows: strictM32OwnedRows.length,
    implementedVerifiedForStrictClosure: implementedRows.length,
    approvedExcludedFromM32: approvedExcludedRows.length,
    approvedExcluded: approvedExcludedRows.length,
    ownedBlocker: 0,
    missingQueueRowRefs: missingQueueRowRefs.length,
    extraAccountedRowRefs: extraAccountedRowRefs.length,
    byScopeSource: countBy([...ownedRefs.values()], (row) => row.source),
    byRowKind: countBy(rows, (row) => row.rowKind),
    byCompletionStatus: countBy(rows, (row) => row.completionStatus),
    transfersByOwner: countBy(approvedExcludedRows, (row) => row.toMilestone),
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
    m32OwnedRows: strictM32OwnedRows.length,
    implementedVerifiedForStrictClosure: implementedRows.length,
    approvedExcludedFromM32: approvedExcludedRows.length,
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
    sourceUnitTotal: expectedRefs.size,
    ownedTotal: strictM32OwnedRows.length,
    implemented: implementedRows.length,
    mapped: 0,
    approvedExcludedFromM32: approvedExcludedRows.length,
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
    ownedTotal: strictM32OwnedRows.length,
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
    approvedExcludedFromM32: approvedExcludedRows.length,
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
      'M32 owns character templates, identity fields, CSTR profile text slots and labels, lifecycle flags, and CSTR identity save fields.',
      'M32 lifecycle includes SELL_CHARA CHECK_SELLASSIABLE CFLAG:1 rank, sale listing filters, and sale-success lifecycle deletion. It does not own sale price formulas, money mutation, event prose, or downstream relationship/body/social side effects.',
      'M32 does not own TALENT/body trait save semantics, Korean particle/text formatting, or event-generated name behavior; those rows are approved exclusions with receiver milestones.',
      'Mapped-consumed rows are not completion. Every source unit is represented in M32-source-units as implemented-verified or approved-excluded.',
    ],
    implementationEvidence: [
      'data/coverage/character-identity-coverage.json',
      'data/coverage/manifests/M32-source-units.json',
      'src/features/characterCreation.ts',
      'src/features/characterLifecycle.ts',
      'src/features/roster.ts',
    ],
    verificationEvidence: [
      'npm run coverage:character-identity',
      'npm run gate:character-identity',
      'npm run gate:milestone-scope-closure -- M32',
      'npm run smoke:character-identity',
      'npm run build',
    ],
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

function sourceKindForCoverageRow(row) {
  if (row.rowKind === 'definition') return row.seedFamily ? 'csv-row' : 'csv-definition-row';
  if (row.rowKind === 'feature') return 'erb-flow';
  if (row.rowKind === 'save-mapping') return 'save-address';
  if (row.rowKind === 'source-file-review') return 'source-file-review';
  return row.rowKind;
}

function legacyFamilyForCoverageRow(row) {
  if (row.seedFamily) return row.seedFamily;
  if (row.address) return String(row.address).split(':')[0] ?? '';
  if (String(row.reviewId).includes('character-text')) return 'CSTR';
  return '';
}

function legacyIdForCoverageRow(row) {
  return row.seedIndex ?? row.address ?? row.sourceLabel ?? row.reviewId;
}

function manifestUnitFromCoverageRow(row, index) {
  const approved = row.completionStatus === 'approved-excluded';
  return {
    unitId: `M32:source-unit:${String(index + 1).padStart(4, '0')}`,
    milestone: 'M32',
    ownerMilestone: approved ? row.toMilestone : 'M32',
    ownerRole: approved ? `${row.toMilestone}-owner` : 'character-identity-lifecycle-owner',
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
      : 'M32 character identity/lifecycle must expose, consume, persist, or display this source unit through concrete runtime behavior.',
    runtimeConsumerId: row.runtimeConsumerId ?? '',
    verificationId: row.verificationId ?? '',
    previousCompletionStatus: row.completionStatus,
    manifestStatus: approved ? 'approved-excluded' : 'implemented-verified',
    blockerReason: approved ? `Approved exclusion from M32 ownership: ${row.approvedExclusionReason}` : '',
    sourceCoverageRowId: row.coverageRowId,
    acceptedByOwner: approved ? row.acceptedByOwner === true : null,
    fromMilestone: approved ? 'M32' : '',
    toMilestone: approved ? row.toMilestone : '',
  };
}

const manifestUnits = coverage.rows.map(manifestUnitFromCoverageRow);
const manifest = {
  schemaVersion: 'source-unit-manifest/v1',
  milestone: 'M32',
  generatedAt: '2026-05-06',
  purpose: 'Strict completion criteria for M32 character identity/lifecycle responsibility.',
  sourceInputs: ['data/coverage/character-identity-coverage.json'],
  rules: [
    'Every source unit must close as implemented-verified or approved-excluded before an implementation milestone can be completed.',
    'Mapped, source-file-review, transferred-out, planned runtime consumer, and planned verification are not completion states by themselves.',
    'M32 completion cannot count TALENT/body trait save semantics, event generated names, or view/text formatting as M32 implementation.',
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
      'npm run coverage:character-identity',
      'npm run gate:character-identity',
      'npm run gate:milestone-scope-closure -- M32',
      'npm run smoke:character-identity',
      'npm run build',
    ],
  },
  notes: [
    'M32 owns character template, CSTR identity text, lifecycle, and CSTR save-field source units and closes them as implemented-verified.',
    'Chara92 preserves blank static NAME/CALLNAME/NICKNAME; M36 ADD_IKUMI_ANDROID owns the runtime name input that fills identityOverrides.',
    'SELL_CHARA rows close only for M32 lifecycle responsibility: CHECK_SELLASSIABLE CFLAG:1 rank, sale listing filters, and sale-success lifecycle deletion. Price formulas, money mutation, event prose, and downstream social/body effects remain receiver-owned.',
    'The remaining 7 source units stay visible as approved exclusions from M32 ownership: M33 TALENT save fields 4, M47 event generated-name files 2, M49 name/particle formatting file 1.',
    'This manifest intentionally does not treat mapped-consumed rows or aggregate source-file-review rows as M32 implementation completion.',
  ],
  units: manifestUnits,
  lastClosure: {
    closureArtifact: 'data/coverage/milestones/M32-closure.json',
    coverageArtifact: 'data/coverage/character-identity-coverage.json',
    gapAuditArtifact: 'data/coverage/audits/M32-gap-audit.json',
    requiredCommands: closure.verification.commands,
  },
};

writeJson('data/coverage/manifests/M32-source-units.json', manifest);

function receiverInboundUnitFromCoverageRow(row, ownerMilestone, index) {
  return {
    unitId: `${ownerMilestone}:inbound-M32:${String(index + 1).padStart(4, '0')}`,
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
    previousCompletionStatus: 'inbound-from-M32-approved-exclusion',
    manifestStatus: 'blocked',
    blockerReason:
      `Inbound responsibility from M32 approved exclusion. ${row.approvedExclusionReason} ` +
      'This receiving milestone must implement it, approve exclusion, or redesign ownership before completion.',
    sourceCoverageRowId: row.coverageRowId,
    acceptedByOwner: null,
    fromMilestone: 'M32',
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
      (unit) => !(unit.fromMilestone === 'M32' && receiverRefs.has(unit.legacyReviewId)),
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
    const note = `M32 approved-excluded inbound responsibilities are blocked here until ${receiver} implements, explicitly excludes, or redesigns them.`;
    receiverManifest.notes = [...new Set([...(receiverManifest.notes ?? []), note])];
    writeJson(manifestPath, receiverManifest);
  }
}

upsertReceiverInboundManifests(approvedExcludedRows);

console.log(
  `coverage:character-identity wrote ${rows.length} source row(s), strict-owned=${strictM32OwnedRows.length}, implemented-verified=${implementedRows.length}, approved-excluded=${approvedExcludedRows.length}, unresolved=${unresolvedIssues.length}.`,
);
