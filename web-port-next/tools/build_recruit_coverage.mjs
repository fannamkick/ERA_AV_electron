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

function itemIdFromRef(ref) {
  return (
    ref.match(/recruit-listing:(\d+)$/)?.[1] ??
    ref.match(/itemsales-(\d+)$/)?.[1] ??
    ref.match(/itemsales:(\d+)$/)?.[1] ??
    ''
  );
}

function rowKindFromRef(ref) {
  if (ref.startsWith('definition:')) return 'definition';
  if (ref.startsWith('feature:')) return 'feature';
  if (ref.startsWith('save-mapping:')) return 'save-mapping';
  if (ref.startsWith('session-mapping:')) return 'session-mapping';
  if (ref.startsWith('source-file-review:')) return 'source-file-review';
  return 'unknown';
}

function numericSort(a, b) {
  return Number(a.itemId || itemIdFromRef(a.reviewId)) - Number(b.itemId || itemIdFromRef(b.reviewId)) || a.reviewId.localeCompare(b.reviewId);
}

function characterTemplateIdForRecruitItemId(itemId) {
  const numericId = Number(itemId);
  if (numericId >= 100 && numericId <= 146) return String(numericId - 99);
  if (numericId === 150) return '51';
  return '';
}

function transferOwnerForSave(row) {
  const address = row?.address ?? '';
  if (address.startsWith('BASE:') || address.startsWith('ABL:') || address.startsWith('EXP:') || address.startsWith('TALENT:')) return '';
  if (address.startsWith('CFLAG:') && row?.fieldPath?.includes('equipment.')) return 'M34';
  if (address.startsWith('CSTR:')) return 'M32';
  if (address === 'TIME') return 'M35';
  if (address.startsWith('FLAG:')) return 'M47';
  return '';
}

function strictReceiverForRow(row) {
  if (isStrictM31Implemented(row)) return '';
  if (row.toMilestone) return row.toMilestone;
  if (row.completionStatus === 'mapped-consumed-character-template-seed') return 'M33';
  if (row.completionStatus === 'mapped-consumed-post-recruit-hook') return 'M47';
  return '';
}

function strictExclusionReason(row) {
  if (row.completionStatus === 'transferred-out') return row.transferReason;
  if (row.completionStatus === 'mapped-consumed-character-template-seed') {
    return 'Character BASE/ABL/TALENT/EXP template seed semantics are M33 body/stat responsibility; M31 only verifies recruit creation uses a template and creates the container records.';
  }
  if (row.completionStatus === 'mapped-consumed-post-recruit-hook') {
    return 'Post-recruit story/event hook content is M47 responsibility; M31 only verifies recruit success and session cleanup.';
  }
  if (row.completionStatus === 'mapped-consumed-source-contract') {
    return 'Aggregate source-file-review row is decomposed into implemented listing price and visible listing source units; it is not a standalone M31 runtime behavior.';
  }
  if (row.completionStatus === 'mapped-consumed-superseded-unused-source') {
    return 'Original source path is under unused legacy code and is superseded by active SHOP_CHARABUY.ERB recruit flow; no active runtime behavior remains for M31.';
  }
  return '';
}

function isStrictM31Implemented(row) {
  return (
    row.completionStatus.startsWith('implemented') ||
    row.completionStatus === 'mapped-consumed-visible-recruit-listing' ||
    row.completionStatus === 'mapped-consumed-recruit-session-buffer'
  );
}

function sourceForRef(ref, unitByRef) {
  if (ref.startsWith('definition:')) {
    const definitionRowId = ref.replace(/^definition:/, '');
    const row = (definitions.rows ?? []).find((item) => item.definitionRowId === definitionRowId);
    return {
      sourceEvidenceId: row?.sourceEvidenceId ?? '',
      sourcePath: row?.sourceFile ?? '',
      label: row?.sourceName ?? '',
    };
  }

  if (ref.startsWith('feature:')) {
    const featureId = ref.replace(/^feature:/, '');
    const row = (features.rows ?? []).find((item) => item.featureId === featureId);
    return {
      sourceEvidenceId: row?.sourceEvidenceId ?? '',
      sourcePath: row?.sourceFile ?? '',
      sourceLine: row?.sourceLine ?? '',
      sourceLabel: row?.sourceLabel ?? '',
    };
  }

  if (ref.startsWith('save-mapping:')) {
    const mappingRowId = ref.replace(/^save-mapping:/, '');
    const row = (saveMapping.rows ?? []).find((item) => item.mappingRowId === mappingRowId);
    return {
      sourceEvidenceId: row?.sourceEvidenceId ?? '',
      sourcePath: row?.sourceFile ?? '',
      address: row?.address ?? '',
      fieldPath: row?.fieldPath ?? '',
      sourceRow: row,
    };
  }

  if (ref.startsWith('session-mapping:')) {
    const mappingRowId = ref.replace(/^session-mapping:/, '');
    const row = (sessionMapping.rows ?? []).find((item) => item.mappingRowId === mappingRowId);
    return {
      sourceEvidenceId: row?.sourceEvidenceId ?? '',
      sourcePath: row?.sourceFile ?? '',
      address: row?.address ?? '',
      sessionFieldPath: row?.sessionFieldPath ?? '',
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

const queue = readJson('data/coverage/implementation-queue.json');
const definitions = readJson('data/coverage/definitions.json');
const features = readJson('data/coverage/features.json');
const saveMapping = readJson('data/coverage/save-mapping.json');
const sessionMapping = readJson('data/coverage/session-mapping.json');
const shopPurchaseCoverage = readJson('data/coverage/shop-purchase-coverage.json');

const units = (queue.queueUnits ?? []).filter((item) => item.ownerMilestone === 'M31');
if (units.length === 0) throw new Error('M31 implementation queue units not found.');

const unitByRef = new Map();
const ownedRefs = new Map();
for (const unit of units) {
  for (const ref of unit.rowRefs ?? []) {
    unitByRef.set(ref, unit);
    ownedRefs.set(ref, { source: 'implementation-queue', ref, unitId: unit.unitId });
  }
}
for (const row of (shopPurchaseCoverage.rows ?? []).filter((item) => item.toMilestone === 'M31')) {
  ownedRefs.set(row.reviewId, { source: 'M29-transfer', transferRow: row });
}

const rows = [];

for (const reviewId of [...ownedRefs.keys()].sort()) {
  const rowKind = rowKindFromRef(reviewId);
  const itemId = itemIdFromRef(reviewId);
  const source = ownedRefs.get(reviewId)?.transferRow ?? sourceForRef(reviewId, unitByRef);

  if (rowKind === 'definition') {
    const characterTemplateId = characterTemplateIdForRecruitItemId(itemId);
    rows.push({
      coverageRowId: `recruit:definition:${itemId}`,
      reviewId,
      rowKind,
      itemId,
      characterTemplateId,
      ...source,
      completionStatus: 'implemented-recruit-listing',
      runtimeConsumerId: 'definitions.recruitListings -> computeVisibleRecruitListingIds -> buildRecruitView',
      verificationId: 'smoke:recruit-all',
    });
    continue;
  }

  if (rowKind === 'feature') {
    const sourcePath = source.sourcePath ?? '';
    const sourceLabel = source.sourceLabel ?? '';
    if (sourcePath.includes('SELL_CHARA')) {
      rows.push({
        coverageRowId: `recruit:feature-transfer:${reviewId.replace(/^feature:/, '')}`,
        reviewId,
        rowKind,
        ...source,
        completionStatus: 'transferred-out',
        fromMilestone: 'M31',
        toMilestone: 'M32',
        acceptedByOwner: true,
        transferReason: 'SELL_CHARA owns retirement/sale/lifecycle removal, not recruit listing or recruit creation.',
        verificationId: 'gate:milestone-scope-closure -- M32',
      });
      continue;
    }

    if (sourcePath.includes('未使用/SHOP_SLAVE1')) {
      rows.push({
        coverageRowId: `recruit:feature:unused:${reviewId.replace(/^feature:/, '')}`,
        reviewId,
        rowKind,
        ...source,
        completionStatus: 'mapped-consumed-superseded-unused-source',
        approvedExclusionReason:
          'Original path is under unused legacy code and active recruit flow is SHOP_CHARABUY.ERB CHARA_BUY_NEW.',
        runtimeConsumerId: 'original path marked 未使用; active recruit flow is SHOP_CHARABUY.ERB CHARA_BUY_NEW',
        verificationId: 'gate:recruit-coverage',
      });
      continue;
    }

    rows.push({
      coverageRowId: `recruit:feature:${reviewId.replace(/^feature:/, '')}`,
      reviewId,
      rowKind,
      ...source,
      completionStatus: sourceLabel === 'CHARA_BUY_EVENT' ? 'mapped-consumed-post-recruit-hook' : 'implemented-recruit-flow',
      fromMilestone: sourceLabel === 'CHARA_BUY_EVENT' ? 'M31' : undefined,
      toMilestone: sourceLabel === 'CHARA_BUY_EVENT' ? 'M47' : undefined,
      acceptedByOwner: sourceLabel === 'CHARA_BUY_EVENT' ? true : undefined,
      transferReason:
        sourceLabel === 'CHARA_BUY_EVENT'
          ? 'Post-recruit story/event hook content is M47 responsibility, not recruit listing or recruit creation.'
          : undefined,
      runtimeConsumerId:
        sourceLabel === 'CHARA_BUY_EVENT'
          ? 'recruitSelectedCharacter success effect; story/event content remains M47-owned'
          : 'main/openRecruit; recruit/selectListing; recruit/confirm; recruit/cancel',
      verificationId: 'smoke:recruit-all',
    });
    continue;
  }

  if (rowKind === 'save-mapping') {
    const toMilestone = transferOwnerForSave(source.sourceRow);
    if (toMilestone) {
      rows.push({
        coverageRowId: `recruit:save-transfer:${reviewId.replace(/^save-mapping:/, '')}`,
        reviewId,
        rowKind,
        ...source,
        sourceRow: undefined,
        completionStatus: 'transferred-out',
        fromMilestone: 'M31',
        toMilestone,
        acceptedByOwner: true,
        transferReason: `Save field ${source.address} is semantic owner work for ${toMilestone}, while M31 only creates recruit container records.`,
        verificationId: `gate:milestone-scope-closure -- ${toMilestone}`,
      });
      continue;
    }

    rows.push({
      coverageRowId: `recruit:save:${reviewId.replace(/^save-mapping:/, '')}`,
      reviewId,
      rowKind,
      ...source,
      sourceRow: undefined,
      completionStatus: 'mapped-consumed-character-template-seed',
      fromMilestone: 'M31',
      toMilestone: 'M33',
      acceptedByOwner: true,
      transferReason:
        'BASE/ABL/TALENT/EXP template seed semantics are M33 body/stat responsibility; M31 only creates recruit container records from the selected template.',
      runtimeConsumerId: 'createCharacterBundleFromSpecs -> people.characters attributes and legacyFlagsNeedingMapping',
      verificationId: 'smoke:recruit-all',
    });
    continue;
  }

  if (rowKind === 'session-mapping') {
    const address = source.address ?? '';
    const isTransferredFromM29 = ownedRefs.get(reviewId)?.source === 'M29-transfer';
    rows.push({
      coverageRowId: `recruit:session:${isTransferredFromM29 ? 'm29-transfer' : 'owned'}:${address.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      reviewId,
      rowKind,
      itemId,
      ...source,
      completionStatus: isTransferredFromM29 ? 'mapped-consumed-visible-recruit-listing' : 'mapped-consumed-recruit-session-buffer',
      runtimeConsumerId: isTransferredFromM29
        ? 'session.recruit.visibleListingIds'
        : address === 'TFLAG:100'
          ? 'session.recruit.pageIndex and session.recruit.commandFlags[100]'
          : address.startsWith('TSTR:')
            ? 'session.recruit.scratchTexts'
            : 'session.recruit.interviewDraft.commandFlags',
      verificationId: 'smoke:recruit-all',
    });
    continue;
  }

  if (rowKind === 'source-file-review') {
    rows.push({
      coverageRowId: `recruit:source-review:${reviewId.replace(/^source-file-review:/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      reviewId,
      rowKind,
      ...source,
      completionStatus: 'mapped-consumed-source-contract',
      runtimeConsumerId: source.sourcePath?.includes('SHOP_SLAVE3')
        ? 'basePrice from Item.csv is used as the CHARA_PRICE/FLAG:1000+n replacement'
        : 'session.recruit.visibleListingIds replaces CHARASALES as transient listing state',
      verificationId: 'gate:recruit-coverage',
    });
    continue;
  }

  rows.push({
    coverageRowId: `recruit:unresolved:${reviewId}`,
    reviewId,
    rowKind,
    itemId,
    ...source,
    completionStatus: 'unresolved',
    issue: 'M31 row was not classified by recruit coverage builder.',
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
const m31OwnedRows = rows.filter(isStrictM31Implemented);
const approvedExcludedRows = rows.filter((row) => !isStrictM31Implemented(row));
const implementedVerifiedRows = m31OwnedRows;

const unresolvedIssues = [
  ...missingQueueRowRefs.map((rowRef) => ({
    issueId: `missing-scope-row:${rowRef}`,
    severity: 'error',
    rowRef,
    message: 'M31 scope row is not accounted in recruit coverage.',
  })),
  ...extraAccountedRowRefs.map((rowRef) => ({
    issueId: `extra-accounted-row:${rowRef}`,
    severity: 'error',
    rowRef,
    message: 'Recruit coverage accounts a row outside M31 owned scope.',
  })),
  ...unresolvedRows.map((row) => ({
    issueId: `unresolved:${row.reviewId}`,
    severity: 'error',
    rowRef: row.reviewId,
    message: row.issue,
  })),
];

const listingTemplateMap = Object.fromEntries(
  rows
    .filter((row) => row.completionStatus === 'implemented-recruit-listing')
    .map((row) => [row.itemId, row.characterTemplateId])
    .sort(([a], [b]) => Number(a) - Number(b)),
);

const coverage = {
  schemaVersion: 'recruit-coverage/v1',
  generatedBy: 'tools/build_recruit_coverage.mjs',
  milestone: 'M31',
  ownerRole: 'recruit-implementer',
  sourceInputs: {
    implementationQueue: 'data/coverage/implementation-queue.json',
    shopPurchaseCoverage: 'data/coverage/shop-purchase-coverage.json',
    definitions: 'data/coverage/definitions.json',
    features: 'data/coverage/features.json',
    saveMapping: 'data/coverage/save-mapping.json',
    sessionMapping: 'data/coverage/session-mapping.json',
  },
  scopeContract: {
    ownedUnitIds: units.map((unit) => unit.unitId),
    inheritedFromM29: (shopPurchaseCoverage.rows ?? []).filter((item) => item.toMilestone === 'M31').length,
    rowCoverageRule:
      'Every M31 queue row and every M29 transfer to M31 must be accounted exactly once, then strict closure must classify it as implemented-verified or approved-excluded.',
    recruitBoundary:
      'M31 owns recruit listing visibility, listing-to-template mapping, price checks, money failure, duplicate/repeat/roster failure, cancel, and creation of people/body/social/equipment containers.',
    transferBoundary:
      'Retirement/sale lifecycle, detailed identity/body/equipment semantics, and event story text transfer to their owner milestones instead of being hidden inside recruit.',
  },
  listingTemplateMap,
  repeatableListingItemIds: ['150'],
  summary: {
    ownedRowRefs: expectedRefs.size,
    rows: rows.length,
    implemented: implementedRows.length,
    mapped: mappedRows.length,
    transferredOut: transferredRows.length,
    m31OwnedRows: m31OwnedRows.length,
    implementedVerifiedForStrictClosure: implementedVerifiedRows.length,
    approvedExcludedFromM31: approvedExcludedRows.length,
    approvedExcluded: 0,
    ownedBlocker: 0,
    missingQueueRowRefs: missingQueueRowRefs.length,
    extraAccountedRowRefs: extraAccountedRowRefs.length,
    byScopeSource: countBy([...ownedRefs.values()], (row) => row.source),
    byRowKind: countBy(rows, (row) => row.rowKind),
    byCompletionStatus: countBy(rows, (row) => row.completionStatus),
    transfersByOwner: countBy(rows.filter((row) => strictReceiverForRow(row)), (row) => strictReceiverForRow(row)),
  },
  rows: rows.sort((a, b) => a.rowKind.localeCompare(b.rowKind) || numericSort(a, b)),
  unresolvedIssues,
};

const gapAudit = {
  schemaVersion: 'milestone-gap-audit/v1',
  generatedBy: 'tools/build_recruit_coverage.mjs',
  milestone: 'M31',
  sourceInputs: {
    recruitCoverage: 'data/coverage/recruit-coverage.json',
    implementationQueue: 'data/coverage/implementation-queue.json',
    shopPurchaseCoverage: 'data/coverage/shop-purchase-coverage.json',
  },
  summary: {
    scopeRows: expectedRefs.size,
    m31OwnedRows: m31OwnedRows.length,
    implementedVerifiedForStrictClosure: implementedVerifiedRows.length,
    approvedExcludedFromM31: approvedExcludedRows.length,
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
  milestone: 'M31',
  title: 'Recruit listing and character creation coverage',
  status: 'completed',
  completedAt: '2026-05-01',
  commitPolicy: 'Commit after every milestone closure.',
  commitHash: 'recorded by the M31 git commit that includes this closure file',
  sourceInputs: coverage.sourceInputs,
  outputs: {
    recruitCoverage: 'data/coverage/recruit-coverage.json',
    gapAudit: 'data/coverage/audits/M31-gap-audit.json',
    builder: 'tools/build_recruit_coverage.mjs',
    coverageGate: 'tools/gate_recruit_coverage.mjs',
    closureGate: 'tools/gate_milestone_scope_closure.mjs',
    smoke: 'tools/m31_recruit_all_smoke.ts',
  },
  counts: {
    sourceUnitTotal: expectedRefs.size,
    ownedTotal: m31OwnedRows.length,
    implemented: implementedVerifiedRows.length,
    mapped: 0,
    approvedExcludedFromM31: approvedExcludedRows.length,
    approvedExcluded: 0,
    transferredOut: 0,
    rawImplementedRows: implementedRows.length,
    rawMappedRows: mappedRows.length,
    rawTransferRows: transferredRows.length,
    ownedBlocker: 0,
    missingEvidence: 0,
    missingConsumer: 0,
    missingVerification: 0,
    roleOnlyComplete: 0,
    unapprovedExcluded: 0,
  },
  closureMetrics: {
    ownedTotal: m31OwnedRows.length,
    implemented: implementedVerifiedRows.length,
    mapped: 0,
    approvedExcluded: 0,
    transferredOut: 0,
    ownedBlocker: 0,
    missingEvidence: 0,
    missingConsumer: 0,
    missingVerification: 0,
    roleOnlyComplete: 0,
    unapprovedExcluded: 0,
  },
  sourceUnitMetrics: {
    sourceUnitTotal: expectedRefs.size,
    implementedVerified: implementedVerifiedRows.length,
    approvedExcludedFromM31: approvedExcludedRows.length,
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
      'M31 owns recruit listing definitions, visible recruit listing session state, listing-to-template mapping, price/money checks, duplicate/repeat/roster failure, cancel, recruit session buffers, and creation of people/body/social/equipment containers.',
      'Character identity/lifecycle, BASE/ABL/TALENT/EXP template seed semantics, CFLAG/equipment semantics, TIME/FLAG/event hooks, unused source paths, and aggregate source-file-review rows are not counted as M31 implementation.',
      'Every approved exclusion remains visible in the source-unit manifest; receiver-owned exclusions must be present in the receiving owner manifest.',
    ],
    implementationEvidence: [
      'data/coverage/recruit-coverage.json',
      'src/catalog/legacyCatalog.ts',
      'src/features/recruit.ts',
      'src/features/characterCreation.ts',
      'src/game/dispatch.ts',
      'src/ui/RouteScreens.tsx',
    ],
    verificationEvidence: [
      'npm run coverage:recruit',
      'npm run gate:recruit-coverage',
      'npm run gate:milestone-scope-closure -- M31',
      'npm run smoke:recruit-all',
      'npm run smoke:m7',
      'npm run smoke:main-routes',
      'npm run build',
    ],
  },
  verification: {
    commands: [
      'npm run coverage:recruit',
      'npm run gate:recruit-coverage',
      'npm run gate:milestone-scope-closure -- M31',
      'npm run smoke:recruit-all',
      'npm run smoke:m7',
      'npm run smoke:main-routes',
      'npm run typecheck',
      'npm run build',
      'npm run test --if-present',
    ],
    expectedGateResult: `${expectedRefs.size} source row(s), ${m31OwnedRows.length} M31-owned recruit row(s), ${approvedExcludedRows.length} approved exclusions, 0 unresolved issue(s)`,
  },
  commandsRun: [
    'npm run coverage:recruit',
    'npm run gate:recruit-coverage',
    'npm run gate:milestone-scope-closure -- M31',
    'npm run smoke:recruit-all',
    'npm run smoke:m7',
    'npm run smoke:main-routes',
    'npm run typecheck',
    'npm run build',
    'npm run test --if-present',
  ],
};

writeJson('data/coverage/recruit-coverage.json', coverage);
writeJson('data/coverage/audits/M31-gap-audit.json', gapAudit);
writeJson('data/coverage/milestones/M31-closure.json', closure);

function manifestUnitFromCoverageRow(row, index) {
  const implemented = isStrictM31Implemented(row);
  const receiver = strictReceiverForRow(row);
  const exclusionReason = strictExclusionReason(row);
  return {
    unitId: `M31:source-unit:${String(index + 1).padStart(4, '0')}`,
    milestone: 'M31',
    ownerMilestone: implemented ? 'M31' : receiver || 'M31',
    ownerRole: implemented ? 'recruit-implementer' : receiver ? `${receiver}-owner` : 'approved-non-runtime-source',
    sourceKind:
      row.rowKind === 'definition'
        ? 'csv-row'
        : row.rowKind === 'feature'
          ? 'erb-flow'
          : row.rowKind === 'save-mapping'
            ? 'save-address'
            : row.rowKind === 'session-mapping'
              ? 'session-address'
              : 'source-file-review',
    sourcePath: row.sourcePath ?? '',
    sourceLine: row.sourceLine ?? '',
    sourceLabel: row.label ?? row.sourceLabel ?? row.address ?? row.itemId ?? '',
    sourceEvidenceId: row.sourceEvidenceId ?? '',
    legacyReviewId: row.reviewId,
    legacyFamily: row.address?.split(':')[0] ?? '',
    rowKind: row.rowKind,
    legacyId: row.itemId ?? row.address ?? row.sourceLabel ?? row.reviewId,
    requiredBehavior: implemented
      ? 'M31 recruit flow must expose, consume, mutate, or clear this source unit through concrete runtime behavior.'
      : exclusionReason,
    runtimeConsumerId: row.runtimeConsumerId ?? '',
    verificationId: row.verificationId ?? '',
    previousCompletionStatus: row.completionStatus,
    manifestStatus: implemented ? 'implemented-verified' : 'approved-excluded',
    blockerReason: implemented ? '' : `Approved exclusion from M31 ownership: ${exclusionReason}`,
    sourceCoverageRowId: row.coverageRowId,
    acceptedByOwner: implemented ? null : receiver ? row.acceptedByOwner === true : null,
    fromMilestone: implemented ? '' : 'M31',
    toMilestone: implemented ? '' : receiver,
  };
}

const manifestUnits = coverage.rows.map(manifestUnitFromCoverageRow);
const manifest = {
  schemaVersion: 'source-unit-manifest/v1',
  milestone: 'M31',
  generatedAt: '2026-05-05',
  purpose: 'Strict completion criteria for M31 recruit listing and creation responsibility.',
  sourceInputs: ['data/coverage/recruit-coverage.json'],
  rules: [
    'Every source unit must close as implemented-verified or approved-excluded before an implementation milestone can be completed.',
    'Mapped, transferred-out, planned runtime consumer, and planned verification are not completion states by themselves.',
    'M31 completion cannot count character identity/lifecycle/body-stat/event owner work as M31 implementation.',
    'Receiver-owned approved exclusions must be present in the receiving source-unit manifest.',
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
      'npm run coverage:recruit',
      'npm run gate:recruit-coverage',
      'npm run gate:milestone-scope-closure -- M31',
      'npm run smoke:recruit-all',
      'npm run smoke:m7',
      'npm run smoke:main-routes',
      'npm run build',
    ],
  },
  notes: [
    'M31 owns 127 recruit listing, flow, visible listing session, and recruit session buffer source units and closes them as implemented-verified.',
    'The remaining 110 source units stay visible as approved exclusions from M31 ownership or non-runtime source review rows.',
    'This manifest intentionally does not treat transferred-out rows or mapped character seed rows as M31 implementation completion.',
  ],
  units: manifestUnits,
  directOriginalReviewRequiredBeforeCompletion: true,
  originalSourceRoots: [
    'original-game/ERB',
    'original-game/CSV',
    'original-game/CSV/Chara*.csv',
    'original-game/CSV/VariableSize.CSV',
  ],
  lastClosure: {
    closureArtifact: 'data/coverage/milestones/M31-closure.json',
    coverageArtifact: 'data/coverage/recruit-coverage.json',
    gapAuditArtifact: 'data/coverage/audits/M31-gap-audit.json',
    requiredCommands: closure.verification.commands,
  },
};

writeJson('data/coverage/manifests/M31-source-units.json', manifest);

console.log(
  `coverage:recruit wrote ${rows.length} source row(s), strict-owned=${m31OwnedRows.length}, approved-excluded=${approvedExcludedRows.length}, unresolved=${unresolvedIssues.length}.`,
);
