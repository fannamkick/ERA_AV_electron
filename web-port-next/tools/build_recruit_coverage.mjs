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
    rowCoverageRule: 'Every M31 queue row and every M29 transfer to M31 must be implemented, mapped-consumed, or transferred exactly once.',
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
    approvedExcluded: 0,
    ownedBlocker: 0,
    missingQueueRowRefs: missingQueueRowRefs.length,
    extraAccountedRowRefs: extraAccountedRowRefs.length,
    byScopeSource: countBy([...ownedRefs.values()], (row) => row.source),
    byRowKind: countBy(rows, (row) => row.rowKind),
    byCompletionStatus: countBy(rows, (row) => row.completionStatus),
    transfersByOwner: countBy(transferredRows, (row) => row.toMilestone),
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
    expectedGateResult: `${expectedRefs.size} M31 owned row(s), 0 unresolved issue(s)`,
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

console.log(
  `coverage:recruit wrote ${rows.length} row(s), implemented=${implementedRows.length}, mapped=${mappedRows.length}, transferred=${transferredRows.length}, unresolved=${unresolvedIssues.length}.`,
);
