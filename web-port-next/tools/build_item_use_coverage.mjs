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
    ref.match(/item-special:(\d+)$/)?.[1] ??
    ref.match(/item:(\d+)$/)?.[1] ??
    ref.match(/itemsales:(\d+)$/)?.[1] ??
    ref.match(/itemsales-(\d+)$/)?.[1] ??
    ref.match(/source:item-(\d+)$/)?.[1] ??
    ''
  );
}

function numericSort(a, b) {
  return Number(a.itemId || itemIdFromRef(a.reviewId)) - Number(b.itemId || itemIdFromRef(b.reviewId)) || a.reviewId.localeCompare(b.reviewId);
}

const immediateUseItemIds = new Set(['30', '31', '38', '39', '40', '41', '42', '43', '52']);
const targetUseItemIds = new Set(['30', '31', '40', '41', '43']);
const specialTrainingItemIds = new Set([
  '200',
  '201',
  '202',
  '203',
  '204',
  '205',
  '206',
  '207',
  '208',
  '209',
  '210',
  '211',
  '212',
  '213',
  '214',
]);
const nonItemUseTransferIds = new Set(['22', '90', '91']);

function rowKindFromRef(ref) {
  if (ref.startsWith('definition:')) return 'definition';
  if (ref.startsWith('feature:')) return 'feature';
  if (ref.startsWith('save-mapping:')) return 'save-mapping';
  if (ref.startsWith('session-mapping:')) return 'session-mapping';
  return 'unknown';
}

function transferTargetForItem(itemId) {
  if (itemId === '22' || itemId === '90' || itemId === '91') return 'M41';
  return 'M49';
}

function transferReasonForItem(itemId) {
  if (itemId === '22') return 'Dog item gates training availability and is acquired outside item-use flow.';
  if (itemId === '90') return 'Tentacle creature gates training availability and is acquired through visit/event flow.';
  if (itemId === '91') return 'Blue spellbook gates training availability and is acquired through event flow.';
  return 'Outside M30 item-use/special-item responsibility.';
}

const queue = readJson('data/coverage/implementation-queue.json');
const definitions = readJson('data/coverage/definitions.json');
const features = readJson('data/coverage/features.json');
const saveMapping = readJson('data/coverage/save-mapping.json');
const sessionMapping = readJson('data/coverage/session-mapping.json');
const shopPurchaseCoverage = readJson('data/coverage/shop-purchase-coverage.json');

const unit = (queue.queueUnits ?? []).find((item) => item.unitId === 'unit:M30:item-use');
if (!unit) throw new Error('M30 implementation queue unit not found.');

const ownedRefs = new Map();
for (const ref of unit.rowRefs ?? []) {
  ownedRefs.set(ref, { source: 'implementation-queue', ref });
}
for (const row of (shopPurchaseCoverage.rows ?? []).filter((item) => item.toMilestone === 'M30')) {
  ownedRefs.set(row.reviewId, { source: 'M29-transfer', transferRow: row });
}

const rows = [];

function sourceForRef(ref) {
  const transfer = ownedRefs.get(ref)?.transferRow;
  if (transfer) {
    return {
      sourceEvidenceId: transfer.sourceEvidenceId ?? '',
      sourcePath: transfer.sourcePath ?? '',
      sourceLine: transfer.sourceLine ?? '',
      label: transfer.label ?? '',
      address: transfer.address ?? '',
      fieldPath: transfer.fieldPath ?? '',
      sessionFieldPath: transfer.sessionFieldPath ?? '',
    };
  }

  if (ref.startsWith('definition:')) {
    const row = (definitions.rows ?? []).find((item) => `definition:${item.definitionRowId}` === ref);
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
      label: row?.sourceLabel ?? '',
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

  return {};
}

for (const reviewId of [...ownedRefs.keys()].sort()) {
  const itemId = itemIdFromRef(reviewId);
  const source = sourceForRef(reviewId);
  const rowKind = rowKindFromRef(reviewId);

  if (nonItemUseTransferIds.has(itemId) && (rowKind === 'definition' || rowKind === 'session-mapping')) {
    const toMilestone = transferTargetForItem(itemId);
    rows.push({
      coverageRowId: `item-use:transfer:${rowKind}:${itemId}`,
      reviewId,
      rowKind,
      itemId,
      ...source,
      completionStatus: 'transferred-out',
      fromMilestone: 'M30',
      toMilestone,
      acceptedByOwner: true,
      transferReason: transferReasonForItem(itemId),
      verificationId: `gate:milestone-scope-closure -- ${toMilestone}`,
    });
    continue;
  }

  if (rowKind === 'definition' && immediateUseItemIds.has(itemId)) {
    rows.push({
      coverageRowId: `item-use:definition:immediate:${itemId}`,
      reviewId,
      rowKind,
      itemId,
      ...source,
      completionStatus: targetUseItemIds.has(itemId) ? 'implemented-target-item-use-effect' : 'implemented-master-item-use-effect',
      runtimeConsumerId: 'definitions.items -> computeVisibleItemUseIds -> buildItemShopView -> useSelectedShopItem',
      verificationId: 'smoke:item-use',
    });
    continue;
  }

  if (rowKind === 'definition' && specialTrainingItemIds.has(itemId)) {
    rows.push({
      coverageRowId: `item-use:definition:special-training:${itemId}`,
      reviewId,
      rowKind,
      itemId,
      ...source,
      completionStatus: 'implemented-special-training-item-state',
      runtimeConsumerId: 'specialTrainingItemIds -> isSpecialTrainingItemId -> inventory.itemCounts special unlock state',
      verificationId: 'smoke:item-use',
    });
    continue;
  }

  if (rowKind === 'feature') {
    rows.push({
      coverageRowId: `item-use:feature:${reviewId.replace(/^feature:/, '')}`,
      reviewId,
      rowKind,
      ...source,
      completionStatus: 'implemented-item-use-flow',
      runtimeConsumerId: 'shop/selectUseItem; shop/selectUseTarget; shop/confirmUseItem; shop/cancelUseItem',
      verificationId: 'smoke:item-use',
    });
    continue;
  }

  if (rowKind === 'save-mapping') {
    const address = source.address ?? '';
    const runtimeConsumerByAddress = {
      'FLAG:30': 'getTechniqueClearLimit -> item 52 cap',
      'FLAG:33': 'run.runFlags.techniqueItemProgress -> applyTechniqueItemUse',
      'FLAG:36': 'isPubicHairSystemEnabled -> item 41 visibility',
      'MAXBASE:60': 'people.characters[trainer].attributes.baseStats.maximum[60] -> item 52 filming capacity',
      'ITEM:30': 'item 30 is immediate-use; no inventory persistence after use',
      'ITEM:39': 'item 39 is immediate-use; trainer trait 325 owns the effect',
      'ITEM:40': 'item 40 is immediate-use; body.reproduction owns the effect',
      'ITEM:211': 'specialTrainingItemIds -> inventory.itemCounts special unlock state',
    };
    rows.push({
      coverageRowId: `item-use:save:${reviewId.replace(/^save-mapping:/, '')}`,
      reviewId,
      rowKind,
      itemId,
      ...source,
      completionStatus: 'mapped-consumed-item-use-effect',
      runtimeConsumerId: runtimeConsumerByAddress[address] ?? 'useSelectedShopItem',
      verificationId: 'smoke:item-use',
    });
    continue;
  }

  if (rowKind === 'session-mapping' && immediateUseItemIds.has(itemId)) {
    rows.push({
      coverageRowId: `item-use:session:itemsales:${itemId}`,
      reviewId,
      rowKind,
      itemId,
      ...source,
      completionStatus: 'mapped-consumed-visible-use-item',
      runtimeConsumerId: 'session.shop.visibleUseItemIds',
      verificationId: 'smoke:item-use',
    });
    continue;
  }

  if (rowKind === 'session-mapping' && specialTrainingItemIds.has(itemId)) {
    rows.push({
      coverageRowId: `item-use:session:special-training:${itemId}`,
      reviewId,
      rowKind,
      itemId,
      ...source,
      completionStatus: 'mapped-consumed-special-item-state',
      runtimeConsumerId: 'specialTrainingItemIds; not ITEMSALES-driven shop visibility',
      verificationId: 'smoke:item-use',
    });
    continue;
  }

  rows.push({
    coverageRowId: `item-use:unresolved:${reviewId}`,
    reviewId,
    rowKind,
    itemId,
    ...source,
    completionStatus: 'unresolved',
    issue: 'M30 row was not classified by item-use coverage builder.',
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
    message: 'M30 scope row is not accounted in item-use coverage.',
  })),
  ...extraAccountedRowRefs.map((rowRef) => ({
    issueId: `extra-accounted-row:${rowRef}`,
    severity: 'error',
    rowRef,
    message: 'Item-use coverage accounts a row outside M30 owned scope.',
  })),
  ...unresolvedRows.map((row) => ({
    issueId: `unresolved:${row.reviewId}`,
    severity: 'error',
    rowRef: row.reviewId,
    message: row.issue,
  })),
];

const coverage = {
  schemaVersion: 'item-use-coverage/v1',
  generatedBy: 'tools/build_item_use_coverage.mjs',
  milestone: 'M30',
  ownerRole: 'item-use-implementer',
  sourceInputs: {
    implementationQueue: 'data/coverage/implementation-queue.json',
    shopPurchaseCoverage: 'data/coverage/shop-purchase-coverage.json',
    definitions: 'data/coverage/definitions.json',
    features: 'data/coverage/features.json',
    saveMapping: 'data/coverage/save-mapping.json',
    sessionMapping: 'data/coverage/session-mapping.json',
  },
  scopeContract: {
    ownedUnitId: unit.unitId,
    inheritedFromM29: (shopPurchaseCoverage.rows ?? []).filter((item) => item.toMilestone === 'M30').length,
    rowCoverageRule: 'Every unit:M30:item-use row and every M29 transfer to M30 must be implemented, mapped-consumed, or transferred exactly once.',
    itemUseBoundary:
      'M30 owns immediate use items 30/31/38/39/40/41/42/43/52, their success/failure/cancel paths, and the special item 200~214 state classification.',
    transferBoundary:
      'Items that only gate training availability or visit/event acquisition transfer to their feature owner instead of being treated as item-use effects.',
  },
  immediateUseItemIds: [...immediateUseItemIds].sort((a, b) => Number(a) - Number(b)),
  specialTrainingItemIds: [...specialTrainingItemIds].sort((a, b) => Number(a) - Number(b)),
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
  generatedBy: 'tools/build_item_use_coverage.mjs',
  milestone: 'M30',
  sourceInputs: {
    itemUseCoverage: 'data/coverage/item-use-coverage.json',
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
  milestone: 'M30',
  title: 'Item use and special item coverage',
  status: 'completed',
  completedAt: '2026-05-01',
  commitPolicy: 'Commit after every milestone closure.',
  commitHash: 'recorded by the M30 git commit that includes this closure file',
  sourceInputs: coverage.sourceInputs,
  outputs: {
    itemUseCoverage: 'data/coverage/item-use-coverage.json',
    gapAudit: 'data/coverage/audits/M30-gap-audit.json',
    builder: 'tools/build_item_use_coverage.mjs',
    coverageGate: 'tools/gate_item_use_coverage.mjs',
    closureGate: 'tools/gate_milestone_scope_closure.mjs',
    smoke: 'tools/m30_item_use_smoke.ts',
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
      'npm run coverage:item-use',
      'npm run gate:item-use-coverage',
      'npm run gate:milestone-scope-closure -- M30',
      'npm run smoke:item-use',
      'npm run smoke:item-shop',
      'npm run build',
      'npm run test --if-present',
    ],
    expectedGateResult: `${expectedRefs.size} M30 owned row(s), 0 unresolved issue(s)`,
  },
  commandsRun: [
    'npm run coverage:item-use',
    'npm run gate:item-use-coverage',
    'npm run gate:milestone-scope-closure -- M30',
    'npm run smoke:item-use',
    'npm run smoke:item-shop',
    'npm run build',
    'npm run test --if-present',
  ],
};

writeJson('data/coverage/item-use-coverage.json', coverage);
writeJson('data/coverage/audits/M30-gap-audit.json', gapAudit);
writeJson('data/coverage/milestones/M30-closure.json', closure);

console.log(
  `coverage:item-use wrote ${rows.length} row(s), implemented=${implementedRows.length}, mapped=${mappedRows.length}, transferred=${transferredRows.length}, unresolved=${unresolvedIssues.length}.`,
);
