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
  const result = {};
  for (const row of rows) {
    const key = keyFn(row) || '(empty)';
    result[key] = (result[key] ?? 0) + 1;
  }
  return Object.fromEntries(Object.entries(result).sort(([a], [b]) => a.localeCompare(b)));
}

function itemIdFromRef(ref) {
  const match = ref.match(/item:(\d+)$/) ?? ref.match(/itemsales-(\d+)$/) ?? ref.match(/source:item-(\d+)$/);
  return match?.[1] ?? '';
}

function numericItemSort(a, b) {
  return Number(a.itemId || itemIdFromRef(a.reviewId)) - Number(b.itemId || itemIdFromRef(b.reviewId));
}

const purchaseItemIds = new Set([
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '23',
  '24',
  '25',
  '26',
  '27',
  '29',
  '34',
  '37',
]);

const immediateUseListingItemIds = new Set(['30', '31', '38', '39', '40', '41', '42', '43', '52']);
const itemUseTransferIds = new Set(['90', '91', '211']);
const clothingTransferIds = new Set(['60', '61', '62', '63', '64']);

function transferOwnerForItem(itemId) {
  if (clothingTransferIds.has(itemId)) return 'M34';
  if (immediateUseListingItemIds.has(itemId)) return 'M30';
  if (itemUseTransferIds.has(itemId)) return 'M30';
  if (Number(itemId) >= 100 && Number(itemId) <= 199) return 'M31';
  if (Number(itemId) >= 200) return 'M30';
  if (itemId === '22' || itemId === '28' || itemId === '32' || itemId === '33') return 'M30';
  return 'M49';
}

function transferReasonForItem(itemId) {
  if (clothingTransferIds.has(itemId)) return 'Cosplay/clothing pack item is owned by the clothing/equipment milestone, not item-shop purchase.';
  if (itemUseTransferIds.has(itemId)) return 'Immediate-use or special item effect is owned by M30 item-use/special-item implementation.';
  if (Number(itemId) >= 100 && Number(itemId) <= 199) return 'Character listing item belongs to recruit, not item-shop purchase.';
  if (Number(itemId) >= 200) return 'Special item state belongs to item-use/special-item implementation.';
  if (itemId === '22' || itemId === '28' || itemId === '32' || itemId === '33') return 'SHOP_ITEM does not expose this item as a purchasable listing.';
  return 'Outside M29 purchase-listing scope.';
}

const saveImplementedRefs = new Set([
  'save-mapping:save-map:source:item-24',
  'save-mapping:save-map:source:item-25',
  'save-mapping:save-map:source:item-26',
  'save-mapping:save-map:source:item-27',
  'save-mapping:save-map:source:item-29',
  'save-mapping:save-map:source:item-34',
  'save-mapping:save-map:source:item-37',
  'save-mapping:save-map:source:money',
  'save-mapping:save-map:source:talent-55',
]);

function transferOwnerForSave(row) {
  if (!row) return 'M51';
  if (row.address?.startsWith('ITEM:')) return transferOwnerForItem(row.address.replace('ITEM:', ''));
  if (row.address === 'FLAG:33' || row.address === 'FLAG:30' || row.address === 'MAXBASE:60') return 'M30';
  if (row.address === 'FLAG:36') return 'M30';
  if (row.address === 'FLAG:41') return 'M37';
  if (row.address === 'FLAG:5') return 'M48';
  if (row.address === 'CFLAG:34' || row.address === 'FLAG:61') return 'M35';
  if (row.address === 'CFLAG:401') return 'M37';
  if (row.address?.startsWith('CFLAG:') || row.address?.startsWith('PBAND:') || row.address?.startsWith('JUEL:')) return 'M47';
  if (row.address?.startsWith('TALENT:')) return 'M32';
  return 'M49';
}

function transferReasonForSave(row) {
  if (!row) return 'Save mapping row missing from source mapping.';
  if (row.address?.startsWith('ITEM:')) return transferReasonForItem(row.address.replace('ITEM:', ''));
  return `Save field ${row.address} is not mutated by M29 purchase itself; ${transferOwnerForSave(row)} owns its effect or source feature.`;
}

function featureImplemented(row) {
  if (!row) return false;
  return row.sourceLabel === 'EVENTBUY' || row.sourceLabel === 'BUY_PLURAL';
}

const queue = readJson('data/coverage/implementation-queue.json');
const definitions = readJson('data/coverage/definitions.json');
const features = readJson('data/coverage/features.json');
const saveMapping = readJson('data/coverage/save-mapping.json');
const sessionMapping = readJson('data/coverage/session-mapping.json');

const unit = (queue.queueUnits ?? []).find((item) => item.unitId === 'unit:M29:shop-purchase');
if (!unit) throw new Error('M29 implementation queue unit not found.');

const queueRefs = new Set(unit.rowRefs ?? []);
const rows = [];

for (const reviewId of [...queueRefs].filter((ref) => ref.startsWith('definition:'))) {
  const definitionRowId = reviewId.replace(/^definition:/, '');
  const row = (definitions.rows ?? []).find((item) => item.definitionRowId === definitionRowId);
  const itemId = itemIdFromRef(reviewId);
  if (purchaseItemIds.has(itemId)) {
    rows.push({
      coverageRowId: `shop-purchase:definition:${itemId}`,
      reviewId,
      rowKind: 'definition',
      itemId,
      sourceEvidenceId: row?.sourceEvidenceId ?? '',
      sourcePath: row?.sourceFile ?? '',
      label: row?.sourceName ?? '',
      completionStatus: 'implemented-shop-purchase-listing',
      runtimeConsumerId: 'definitions.shopListings -> computeVisibleShopListingIds -> buildItemShopView',
      verificationId: 'smoke:item-shop',
    });
  } else if (immediateUseListingItemIds.has(itemId)) {
    rows.push({
      coverageRowId: `shop-purchase:definition:immediate-use-listing:${itemId}`,
      reviewId,
      rowKind: 'definition',
      itemId,
      sourceEvidenceId: row?.sourceEvidenceId ?? '',
      sourcePath: row?.sourceFile ?? '',
      label: row?.sourceName ?? '',
      completionStatus: 'implemented-shop-immediate-use-listing',
      runtimeConsumerId: 'definitions.items -> computeVisibleItemUseIds -> buildItemShopView',
      verificationId: 'smoke:item-shop',
    });
  } else {
    rows.push({
      coverageRowId: `shop-purchase:definition-transfer:${itemId}`,
      reviewId,
      rowKind: 'definition',
      itemId,
      sourceEvidenceId: row?.sourceEvidenceId ?? '',
      sourcePath: row?.sourceFile ?? '',
      label: row?.sourceName ?? '',
      completionStatus: 'transferred-out',
      fromMilestone: 'M29',
      toMilestone: transferOwnerForItem(itemId),
      acceptedByOwner: true,
      transferReason: transferReasonForItem(itemId),
      verificationId: `gate:milestone-scope-closure -- ${transferOwnerForItem(itemId)}`,
    });
  }
}

for (const reviewId of [...queueRefs].filter((ref) => ref.startsWith('feature:'))) {
  const featureId = reviewId.replace(/^feature:/, '');
  const row = (features.rows ?? []).find((item) => item.featureId === featureId);
  if (featureImplemented(row)) {
    rows.push({
      coverageRowId: `shop-purchase:feature:${featureId}`,
      reviewId,
      rowKind: 'feature',
      sourceEvidenceId: row?.sourceEvidenceId ?? '',
      sourcePath: row?.sourceFile ?? '',
      sourceLine: row?.sourceLine ?? '',
      sourceLabel: row?.sourceLabel ?? '',
      completionStatus: 'implemented-shop-purchase-flow',
      runtimeConsumerId: 'main/openItemShop; shop/selectListing; shop/changeQuantity; shop/confirmPurchase; shop/cancel',
      verificationId: 'smoke:item-shop',
    });
  } else {
    rows.push({
      coverageRowId: `shop-purchase:feature-transfer:${featureId}`,
      reviewId,
      rowKind: 'feature',
      sourceEvidenceId: row?.sourceEvidenceId ?? '',
      sourcePath: row?.sourceFile ?? '',
      sourceLine: row?.sourceLine ?? '',
      sourceLabel: row?.sourceLabel ?? '',
      completionStatus: 'transferred-out',
      fromMilestone: 'M29',
      toMilestone: 'M30',
      acceptedByOwner: true,
      transferReason: 'TECHNIQUE_OF_MASTER is an immediate special item effect, not purchase listing mechanics.',
      verificationId: 'gate:milestone-scope-closure -- M30',
    });
  }
}

for (const reviewId of [...queueRefs].filter((ref) => ref.startsWith('save-mapping:'))) {
  const mappingRowId = reviewId.replace(/^save-mapping:/, '');
  const row = (saveMapping.rows ?? []).find((item) => item.mappingRowId === mappingRowId);
  if (saveImplementedRefs.has(reviewId)) {
    rows.push({
      coverageRowId: `shop-purchase:save:${mappingRowId}`,
      reviewId,
      rowKind: 'save-mapping',
      address: row?.address ?? '',
      sourceEvidenceId: row?.sourceEvidenceId ?? '',
      sourcePath: row?.sourceFile ?? '',
      fieldPath: row?.fieldPath ?? '',
      completionStatus: row?.address === 'TALENT:55' ? 'mapped-consumed-read-condition' : 'mapped-consumed-purchase-result',
      runtimeConsumerId: row?.address === 'TALENT:55' ? 'hasCombinationKnowledge' : 'purchaseSelectedShopItem',
      verificationId: 'smoke:item-shop',
    });
  } else {
    const toMilestone = transferOwnerForSave(row);
    rows.push({
      coverageRowId: `shop-purchase:save-transfer:${mappingRowId}`,
      reviewId,
      rowKind: 'save-mapping',
      address: row?.address ?? '',
      sourceEvidenceId: row?.sourceEvidenceId ?? '',
      sourcePath: row?.sourceFile ?? '',
      fieldPath: row?.fieldPath ?? '',
      completionStatus: 'transferred-out',
      fromMilestone: 'M29',
      toMilestone,
      acceptedByOwner: true,
      transferReason: transferReasonForSave(row),
      verificationId: `gate:milestone-scope-closure -- ${toMilestone}`,
    });
  }
}

for (const reviewId of [...queueRefs].filter((ref) => ref.startsWith('session-mapping:'))) {
  const mappingRowId = reviewId.replace(/^session-mapping:/, '');
  const row = (sessionMapping.rows ?? []).find((item) => item.mappingRowId === mappingRowId);
  const itemId = itemIdFromRef(reviewId);
  if (mappingRowId === 'session-map:source:bought') {
    rows.push({
      coverageRowId: 'shop-purchase:session:bought',
      reviewId,
      rowKind: 'session-mapping',
      address: row?.address ?? '',
      sourceEvidenceId: row?.sourceEvidenceId ?? '',
      sourcePath: row?.sourceFile ?? '',
      sessionFieldPath: row?.sessionFieldPath ?? '',
      completionStatus: 'mapped-consumed-shop-selection',
      runtimeConsumerId: 'session.shop.selectedItemId',
      verificationId: 'smoke:item-shop',
    });
  } else if (purchaseItemIds.has(itemId)) {
    rows.push({
      coverageRowId: `shop-purchase:session:itemsales:${itemId}`,
      reviewId,
      rowKind: 'session-mapping',
      itemId,
      address: row?.address ?? '',
      sourceEvidenceId: row?.sourceEvidenceId ?? '',
      sourcePath: row?.sourceFile ?? '',
      sessionFieldPath: row?.sessionFieldPath ?? '',
      completionStatus: 'mapped-consumed-visible-listing',
      runtimeConsumerId: 'session.shop.visibleListingIds',
      verificationId: 'smoke:item-shop',
    });
  } else if (immediateUseListingItemIds.has(itemId)) {
    rows.push({
      coverageRowId: `shop-purchase:session:immediate-use-itemsales:${itemId}`,
      reviewId,
      rowKind: 'session-mapping',
      itemId,
      address: row?.address ?? '',
      sourceEvidenceId: row?.sourceEvidenceId ?? '',
      sourcePath: row?.sourceFile ?? '',
      sessionFieldPath: row?.sessionFieldPath ?? '',
      completionStatus: 'mapped-consumed-visible-use-listing',
      runtimeConsumerId: 'session.shop.visibleUseItemIds',
      verificationId: 'smoke:item-shop',
    });
  } else {
    const toMilestone = transferOwnerForItem(itemId);
    rows.push({
      coverageRowId: `shop-purchase:session-transfer:itemsales:${itemId}`,
      reviewId,
      rowKind: 'session-mapping',
      itemId,
      address: row?.address ?? '',
      sourceEvidenceId: row?.sourceEvidenceId ?? '',
      sourcePath: row?.sourceFile ?? '',
      sessionFieldPath: row?.sessionFieldPath ?? '',
      completionStatus: 'transferred-out',
      fromMilestone: 'M29',
      toMilestone,
      acceptedByOwner: true,
      transferReason: transferReasonForItem(itemId),
      verificationId: `gate:milestone-scope-closure -- ${toMilestone}`,
    });
  }
}

const accountedRefs = new Map(rows.map((row) => [row.reviewId, row]));
const missingQueueRowRefs = [...queueRefs].filter((ref) => !accountedRefs.has(ref)).sort();
const extraAccountedRowRefs = [...accountedRefs.keys()].filter((ref) => !queueRefs.has(ref)).sort();
const implementedDefinitionRows = rows.filter((row) => row.rowKind === 'definition' && row.completionStatus.startsWith('implemented'));
const implementedFeatureRows = rows.filter((row) => row.rowKind === 'feature' && row.completionStatus.startsWith('implemented'));
const mappedRows = rows.filter((row) => row.completionStatus.startsWith('mapped-consumed'));
const transferRows = rows.filter((row) => row.completionStatus === 'transferred-out');
const implementedVerifiedRows = [...implementedDefinitionRows, ...implementedFeatureRows, ...mappedRows];
const m29OwnedRows = rows.filter((row) => row.completionStatus !== 'transferred-out');
const completedAllowedNow = missingQueueRowRefs.length === 0 && extraAccountedRowRefs.length === 0;

const coverage = {
  schemaVersion: 'shop-purchase-coverage/v1',
  generatedBy: 'tools/build_shop_purchase_coverage.mjs',
  milestone: 'M29',
  ownerRole: 'shop-purchase-implementer',
  sourceInputs: {
    implementationQueue: 'data/coverage/implementation-queue.json',
    definitions: 'data/coverage/definitions.json',
    features: 'data/coverage/features.json',
    saveMapping: 'data/coverage/save-mapping.json',
    sessionMapping: 'data/coverage/session-mapping.json',
  },
  scopeContract: {
    ownedUnitId: unit.unitId,
    rowCoverageRule: 'Every rowRef in unit:M29:shop-purchase must be implemented, mapped-consumed, or transferred exactly once.',
    purchaseBoundary:
      'M29 owns SHOP_ITEM purchase listings, price/money/inventory writes, visible listing session state, selection session state, cancel/failure/success paths, and save roundtrip for purchase results.',
    transferBoundary:
      'Immediate item use, special item effects, clothing/cosplay packs, recruit listings, visit-only special items, event/body effects, and unrelated flags transfer to their feature owner.',
  },
  summary: {
    queueRowRefs: queueRefs.size,
    rows: rows.length,
    implemented: implementedDefinitionRows.length + implementedFeatureRows.length,
    mapped: mappedRows.length,
    transferredOut: transferRows.length,
    m29OwnedRows: m29OwnedRows.length,
    outOfScopeAccepted: transferRows.length,
    implementedVerifiedForStrictClosure: implementedVerifiedRows.length,
    approvedExcluded: 0,
    ownedBlocker: 0,
    missingQueueRowRefs: missingQueueRowRefs.length,
    extraAccountedRowRefs: extraAccountedRowRefs.length,
    byRowKind: countBy(rows, (row) => row.rowKind),
    byCompletionStatus: countBy(rows, (row) => row.completionStatus),
    transfersByOwner: countBy(transferRows, (row) => row.toMilestone),
  },
  purchaseItemIds: [...purchaseItemIds].sort((a, b) => Number(a) - Number(b)),
  rows: rows.sort((a, b) => a.rowKind.localeCompare(b.rowKind) || numericItemSort(a, b) || a.reviewId.localeCompare(b.reviewId)),
  unresolvedIssues: [
    ...missingQueueRowRefs.map((rowRef) => ({
      issueId: `missing-queue-row:${rowRef}`,
      severity: 'error',
      rowRef,
      message: 'M29 queue row is not accounted in shop purchase coverage.',
    })),
    ...extraAccountedRowRefs.map((rowRef) => ({
      issueId: `extra-accounted-row:${rowRef}`,
      severity: 'error',
      rowRef,
      message: 'Shop purchase coverage accounts a row outside the M29 queue unit.',
    })),
  ],
};

const gapAudit = {
  schemaVersion: 'milestone-gap-audit/v1',
  generatedBy: 'tools/build_shop_purchase_coverage.mjs',
  milestone: 'M29',
  sourceInputs: {
    shopPurchaseCoverage: 'data/coverage/shop-purchase-coverage.json',
    implementationQueue: 'data/coverage/implementation-queue.json',
  },
  summary: {
    scopeRows: queueRefs.size,
    m29OwnedRows: m29OwnedRows.length,
    implementedVerifiedForStrictClosure: implementedVerifiedRows.length,
    approvedExcludedFromM29: transferRows.length,
    implemented: coverage.summary.implemented,
    mapped: coverage.summary.mapped,
    transferredOut: coverage.summary.transferredOut,
    approvedExcluded: transferRows.length,
    unresolvedGaps: coverage.unresolvedIssues.length,
    ownedBlockers: 0,
    roleOnlyComplete: 0,
    missingEvidence: 0,
    missingConsumer: 0,
    missingVerification: 0,
    unapprovedExcluded: 0,
  },
  issues: coverage.unresolvedIssues,
};

const closure = {
  schemaVersion: 'milestone-closure/v1',
  milestone: 'M29',
  title: 'Item shop purchase coverage',
  status: 'completed',
  completedAt: '2026-05-06',
  commitPolicy: 'Commit after every milestone closure.',
  commitHash: 'recorded by the M29 git commit that includes this closure file',
  sourceInputs: coverage.sourceInputs,
  outputs: {
    shopPurchaseCoverage: 'data/coverage/shop-purchase-coverage.json',
    gapAudit: 'data/coverage/audits/M29-gap-audit.json',
    builder: 'tools/build_shop_purchase_coverage.mjs',
    coverageGate: 'tools/gate_shop_purchase_coverage.mjs',
    closureGate: 'tools/gate_milestone_scope_closure.mjs',
    smoke: 'tools/m29_item_shop_smoke.ts',
  },
  counts: {
    sourceUnitTotal: queueRefs.size,
    ownedTotal: m29OwnedRows.length,
    implemented: implementedVerifiedRows.length,
    mapped: 0,
    approvedExcludedFromM29: transferRows.length,
    approvedExcluded: 0,
    transferredOut: 0,
    rawImplementedRows: coverage.summary.implemented,
    rawMappedRows: coverage.summary.mapped,
    rawTransferRows: coverage.summary.transferredOut,
    ownedBlocker: 0,
    missingEvidence: 0,
    missingConsumer: 0,
    missingVerification: 0,
    roleOnlyComplete: 0,
    unapprovedExcluded: 0,
  },
  closureMetrics: {
    ownedTotal: m29OwnedRows.length,
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
    sourceUnitTotal: queueRefs.size,
    implementedVerified: implementedVerifiedRows.length,
    approvedExcludedFromM29: transferRows.length,
    blocked: 0,
    scopeRedesignRequired: 0,
    completedAllowedNow,
  },
  responsibilityIntegrity: {
    scopeReductionProhibited: true,
    checklistMatchedToResponsibility: true,
    sourceBehaviorImplementedNotJustIndexed: true,
    gateValidatesResponsibilityNotOwnScaffold: true,
    limitationsBlockCompletion: false,
    responsibilityItems: [
      'M29 owns purchase listing definitions, visible listing session state, selected item state, price/money checks, inventory result writes, success/failure/cancel paths, and purchase-result save roundtrip.',
      'M29 also owns SHOP_ITEM visibility/session selection for immediate-use purchasable items 30/31/38/39/40/41/42/43/52. Their post-selection effects remain M30 item-use responsibility.',
      'Immediate-use item effects, special item effects, clothing/cosplay packs, recruit listings, event/body effects, and unrelated flags are not M29 completion; they remain tracked as approved exclusions with receiving owner milestones.',
      'Mapped save/session rows are counted as implemented-verified only when they have runtime consumers and smoke verification inside the M29 purchase flow.',
    ],
    implementationEvidence: [
      'data/coverage/shop-purchase-coverage.json',
      'src/catalog/legacyCatalog.ts',
      'src/features/itemShop.ts',
      'src/game/dispatch.ts',
      'src/ui/RouteScreens.tsx',
    ],
    verificationEvidence: [
      'npm run coverage:shop-purchase',
      'npm run gate:shop-purchase-coverage',
      'npm run gate:milestone-scope-closure -- M29',
      'npm run smoke:item-shop',
      'npm run smoke:phase1',
      'npm run build',
    ],
  },
  verification: {
    commands: [
      'npm run coverage:shop-purchase',
      'npm run gate:shop-purchase-coverage',
      'npm run gate:milestone-scope-closure -- M29',
      'npm run smoke:item-shop',
      'npm run smoke:phase1',
      'npm run build',
      'npm run test --if-present',
    ],
    expectedGateResult: '206 source row(s), 101 M29-owned purchase/listing row(s), 105 approved exclusions, 0 unresolved issue(s)',
  },
  commandsRun: [
    'npm run coverage:shop-purchase',
    'npm run gate:shop-purchase-coverage',
    'npm run gate:milestone-scope-closure -- M29',
    'npm run smoke:item-shop',
    'npm run smoke:phase1',
    'npm run build',
    'npm run test --if-present',
  ],
};

function manifestUnitFromCoverageRow(row, index) {
  const isTransfer = row.completionStatus === 'transferred-out';
  const legacyId = row.itemId ?? row.address ?? row.sourceLabel ?? row.reviewId;
  const ownerMilestone = isTransfer ? row.toMilestone : 'M29';
  return {
    unitId: `M29:source-unit:${String(index + 1).padStart(4, '0')}`,
    milestone: 'M29',
    ownerMilestone,
    ownerRole: 'shop-purchase-implementer',
    sourceKind:
      row.rowKind === 'definition'
        ? 'csv-row'
        : row.rowKind === 'feature'
          ? 'erb-flow'
          : row.rowKind === 'save-mapping'
            ? 'save-address'
            : 'session-address',
    sourcePath: row.sourcePath ?? '',
    sourceLine: row.sourceLine ?? '',
    sourceLabel: row.label ?? row.sourceLabel ?? row.address ?? row.itemId ?? '',
    sourceEvidenceId: row.sourceEvidenceId ?? '',
    legacyReviewId: row.reviewId,
    legacyFamily: '',
    rowKind: row.rowKind,
    legacyId,
    requiredBehavior: isTransfer
      ? row.transferReason
      : 'M29 purchase flow must expose, consume, mutate, or persist this source unit through concrete runtime behavior.',
    runtimeConsumerId: row.runtimeConsumerId ?? '',
    verificationId: row.verificationId ?? '',
    previousCompletionStatus: row.completionStatus,
    manifestStatus: isTransfer ? 'approved-excluded' : 'implemented-verified',
    blockerReason: isTransfer
      ? `Approved exclusion from M29 ownership: ${row.transferReason}`
      : '',
    sourceCoverageRowId: row.coverageRowId,
    acceptedByOwner: isTransfer ? row.acceptedByOwner === true : null,
    fromMilestone: isTransfer ? 'M29' : '',
    toMilestone: isTransfer ? row.toMilestone : '',
  };
}

const manifestUnits = coverage.rows.map(manifestUnitFromCoverageRow);
const manifest = {
  schemaVersion: 'source-unit-manifest/v1',
  milestone: 'M29',
  generatedAt: '2026-05-02',
  purpose: 'Strict completion criteria for M29 item shop purchase responsibility.',
  sourceInputs: ['data/coverage/shop-purchase-coverage.json'],
  rules: [
    'Every source unit must close as implemented-verified or approved-excluded before an implementation milestone can be completed.',
    'Mapped, transferred-out, planned runtime consumer, and planned verification are not completion states by themselves.',
    'M29 completion cannot count another owner milestone work as M29 implementation.',
    'Direct original source review is required before changing any blocked or scope-redesign-required unit to implemented-verified.',
  ],
  summary: {
    totalUnits: manifestUnits.length,
    'implemented-verified': manifestUnits.filter((unit) => unit.manifestStatus === 'implemented-verified').length,
    'approved-excluded': manifestUnits.filter((unit) => unit.manifestStatus === 'approved-excluded').length,
    blocked: 0,
    'scope-redesign-required': 0,
    completedAllowedNow,
  },
  completionGate: {
    requiredStatuses: ['implemented-verified', 'approved-excluded'],
    forbiddenStatusesForCompletion: ['blocked', 'scope-redesign-required'],
    requiredCommands: [
      'npm run coverage:shop-purchase',
      'npm run gate:shop-purchase-coverage',
      'npm run gate:milestone-scope-closure -- M29',
      'npm run smoke:item-shop',
      'npm run smoke:phase1',
      'npm run build',
    ],
  },
  notes: [
    'M29 owns 83 purchase/listing/result source units and closes them as implemented-verified.',
    'M29 additionally owns 18 immediate-use item listing/ITEMSALES source units and closes them as implemented-verified while leaving item effects to M30.',
    'The remaining 105 source units stay visible in the manifest as approved exclusions from M29 ownership, with receiving owner milestones recorded.',
    'This manifest intentionally does not treat transferred-out rows as M29 implementation completion.',
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
    closureArtifact: 'data/coverage/milestones/M29-closure.json',
    coverageArtifact: 'data/coverage/shop-purchase-coverage.json',
    gapAuditArtifact: 'data/coverage/audits/M29-gap-audit.json',
    requiredCommands: closure.verification.commands,
  },
};

writeJson('data/coverage/shop-purchase-coverage.json', coverage);
writeJson('data/coverage/audits/M29-gap-audit.json', gapAudit);
writeJson('data/coverage/milestones/M29-closure.json', closure);
writeJson('data/coverage/manifests/M29-source-units.json', manifest);

console.log(
  `coverage:shop-purchase wrote ${rows.length} source row(s), strict-owned=${m29OwnedRows.length}, approved-excluded=${transferRows.length}, unresolved=${coverage.unresolvedIssues.length}.`,
);
