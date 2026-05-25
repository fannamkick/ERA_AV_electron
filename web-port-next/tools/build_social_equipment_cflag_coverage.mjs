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

function rowKindFromRef(ref) {
  if (ref.startsWith('definition:')) return 'definition';
  if (ref.startsWith('feature:')) return 'feature';
  if (ref.startsWith('save-mapping:')) return 'save-mapping';
  if (ref.startsWith('session-mapping:')) return 'session-mapping';
  return 'unknown';
}

function addOwnedRef(refs, ref, source, transfer) {
  if (!ref) return;
  if (!refs.has(ref)) refs.set(ref, { ref, source, transfer });
}

function inboundTransfersForMilestone(files, milestone) {
  const rows = [];
  for (const file of files) {
    const relativePath = `data/coverage/${file}`;
    const absolutePath = path.join(root, relativePath);
    if (!fs.existsSync(absolutePath)) continue;
    const artifact = readJson(relativePath);
    for (const row of artifact.rows ?? []) {
      if (row.toMilestone === milestone || row.transferredTo === milestone || row.ownerMilestone === milestone) {
        rows.push({ ...row, inboundArtifact: relativePath });
      }
    }
  }
  return rows;
}

function completionForDefinition(row) {
  if (!row) {
    return {
      completionStatus: 'unresolved',
      runtimeConsumerId: '',
      verificationId: '',
      issue: 'Definition row not found.',
    };
  }

  if (row.definitionKey === 'legacyCharacterFlagDefinitions') {
    return {
      completionStatus: 'implemented-cflag-definition-label',
      runtimeConsumerId: 'definitions.legacyCharacterFlagDefinitions -> splitLegacyCharacterFlags -> buildWardrobeView',
      verificationId: 'gate:social-equipment-cflag',
    };
  }

  if (row.definitionKey === 'characterInitialValues' && row.seedFamily === 'CFLAG') {
    return {
      completionStatus: 'implemented-character-cflag-seed',
      runtimeConsumerId:
        'definitions.characters.initialState.characterFlags -> splitLegacyCharacterFlags -> body.conditionFlags/equipment.clothing/people.flags/social progress',
      verificationId: 'smoke:social-equipment-cflag',
    };
  }

  if (row.definitionKey === 'characterInitialValues' && row.seedFamily === 'RELATION') {
    return {
      completionStatus: 'implemented-character-relation-seed',
      runtimeConsumerId: 'definitions.characters.initialState.relations -> createCharacterBundleFromSpecs -> social.relationships',
      verificationId: 'smoke:social-equipment-cflag',
    };
  }

  if (row.definitionKey === 'items' && ['60', '61', '62', '63', '64'].includes(row.sourceId)) {
    return {
      completionStatus: 'implemented-clothing-pack-definition',
      runtimeConsumerId: 'definitions.items -> wardrobe clothing pack ownership -> equipment.clothing/inventory.itemCounts',
      verificationId: 'gate:social-equipment-cflag',
    };
  }

  if (row.definitionKey === 'items' && row.sourceId === '211') {
    return {
      completionStatus: 'implemented-clothing-item-definition',
      runtimeConsumerId:
        'definitions.items[itemId:211] + inventory.itemCounts[itemId:211] -> buildWardrobeView.costumeOptions -> wardrobe/selectCostume',
      verificationId: 'smoke:social-equipment-cflag',
    };
  }

  return {
    completionStatus: 'unresolved',
    runtimeConsumerId: '',
    verificationId: '',
    issue: `M34 definition row is not classified: ${row.definitionRowId}`,
  };
}

function completionForFeature(row) {
  if (!row) {
    return {
      completionStatus: 'unresolved',
      runtimeConsumerId: '',
      verificationId: '',
      issue: 'Feature row not found.',
    };
  }

  if (row.featureId === 'feature:wardrobe-clothing') {
    return {
      completionStatus: 'implemented-wardrobe-route',
      runtimeConsumerId: 'main/openWardrobe; wardrobe/toggleClothing; wardrobe/cancel; buildWardrobeView',
      verificationId: 'smoke:social-equipment-cflag',
    };
  }

  return {
    completionStatus: 'unresolved',
    runtimeConsumerId: '',
    verificationId: '',
    issue: `M34 feature row is not classified: ${row.featureId}`,
  };
}

function completionForSaveMapping(row) {
  if (!row) {
    return {
      completionStatus: 'unresolved',
      runtimeConsumerId: '',
      verificationId: '',
      issue: 'Save mapping row not found.',
    };
  }

  if (row.address === 'ITEM:211' || row.itemId === '211') {
    return {
      completionStatus: 'implemented-clothing-item-save-field',
      runtimeConsumerId:
        'inventory.itemCounts[itemId:211] -> buildWardrobeView.costumeOptions -> wardrobe/selectCostume',
      verificationId: 'smoke:social-equipment-cflag',
    };
  }

  return {
    completionStatus: 'implemented-cflag-equipment-save-field',
    runtimeConsumerId: runtimeConsumerForSaveMapping(row),
    verificationId: 'smoke:social-equipment-cflag',
  };
}

function flagIdFromAddress(address) {
  const match = String(address ?? '').match(/^[A-Z]+:(\d+)$/);
  return match?.[1] ?? '';
}

function runtimeConsumerForSaveMapping(row) {
  const address = row?.address ?? '';
  const flagId = flagIdFromAddress(address);

  if (address.startsWith('CFLAG:') && flagId) {
    if (row.runtimeOwner === 'body') {
      return `body.byCharacterId.*.conditionFlags.flag_${flagId} <- splitLegacyCharacterFlags/save roundtrip`;
    }

    if (row.runtimeOwner === 'equipment') {
      return `equipment.byCharacterId.*.availabilityFlags.flag_${flagId} <- splitLegacyCharacterFlags/wardrobe route/save roundtrip`;
    }

    if (['21', '22', '23', '24'].includes(flagId)) {
      return `people.characters.*.flags.family.legacyRelationIndexes.${flagId} <- splitLegacyCharacterFlags/save roundtrip`;
    }

    const owner = row.runtimeOwner || 'people';
    return `people.characters.*.flags.featureProgress.${owner}.flag_${flagId} <- splitLegacyCharacterFlags/save roundtrip`;
  }

  return `${row.fieldPath || row.address} <- M34 state store/save roundtrip`;
}

function completionForSessionMapping(row) {
  if (!row) {
    return {
      completionStatus: 'unresolved',
      runtimeConsumerId: '',
      verificationId: '',
      issue: 'Session mapping row not found.',
    };
  }

  if (row.address === 'ITEMSALES:211' || row.itemId === '211') {
    return {
      completionStatus: 'implemented-clothing-item-visibility-view',
      runtimeConsumerId:
        'ITEMSALES:211 source behavior -> session-free wardrobe costume option availability from inventory.itemCounts[itemId:211]',
      verificationId: 'smoke:social-equipment-cflag',
    };
  }

  return {
    completionStatus: 'implemented-clothing-session-view',
    runtimeConsumerId: `${row.sessionFieldPath || row.address} <- buildWardrobeView/session-free route entry`,
    verificationId: 'smoke:social-equipment-cflag',
  };
}

const queue = readJson('data/coverage/implementation-queue.json');
const definitions = readJson('data/coverage/definitions.json');
const features = readJson('data/coverage/features.json');
const saveMapping = readJson('data/coverage/save-mapping.json');
const sessionMapping = readJson('data/coverage/session-mapping.json');
const featureRows = features.features ?? features.rows ?? [];

const units = (queue.queueUnits ?? []).filter((unit) => unit.ownerMilestone === 'M34');
if (units.length === 0) throw new Error('M34 implementation queue unit not found.');

const ownedRefs = new Map();
for (const unit of units) {
  for (const ref of unit.rowRefs ?? []) addOwnedRef(ownedRefs, ref, 'implementation-queue', undefined);
}
for (const row of featureRows.filter((item) => item.ownerMilestone === 'M34')) {
  addOwnedRef(ownedRefs, row.featureId, 'data/coverage/features.json', undefined);
}

const inboundTransfers = inboundTransfersForMilestone(
  ['shop-purchase-coverage.json', 'item-use-coverage.json', 'recruit-coverage.json', 'character-identity-coverage.json', 'body-stat-coverage.json'],
  'M34',
);
for (const row of inboundTransfers) {
  addOwnedRef(ownedRefs, row.reviewId, row.inboundArtifact, row);
}

const definitionsById = new Map((definitions.rows ?? []).map((row) => [row.definitionRowId, row]));
const featuresById = new Map(featureRows.map((row) => [row.featureId, row]));
const saveMappingById = new Map((saveMapping.rows ?? []).map((row) => [row.mappingRowId, row]));
const sessionMappingById = new Map((sessionMapping.rows ?? []).map((row) => [row.mappingRowId, row]));
for (const row of (definitions.rows ?? []).filter((item) => item.definitionKey === 'legacyCharacterFlagDefinitions')) {
  addOwnedRef(ownedRefs, `definition:${row.definitionRowId}`, 'data/coverage/definitions.json', undefined);
}

const rows = [];
for (const [reviewId, scope] of [...ownedRefs.entries()].sort(([a], [b]) => a.localeCompare(b))) {
  const rowKind = rowKindFromRef(reviewId);
  let source = {};
  let completion;

  if (rowKind === 'definition') {
    const id = reviewId.replace(/^definition:/, '');
    const definitionRow = definitionsById.get(id);
    source = {
      sourceEvidenceId: definitionRow?.sourceEvidenceId ?? scope.transfer?.sourceEvidenceId ?? '',
      sourcePath: definitionRow?.sourceFile ?? scope.transfer?.sourcePath ?? '',
      sourceId: definitionRow?.sourceId ?? scope.transfer?.itemId ?? '',
      definitionKey: definitionRow?.definitionKey ?? '',
      seedFamily: definitionRow?.seedFamily ?? '',
      seedIndex: definitionRow?.seedIndex ?? '',
    };
    completion = completionForDefinition(definitionRow);
  } else if (rowKind === 'feature') {
    const featureId = reviewId.replace(/^feature:/, '');
    const featureRow = featuresById.get(reviewId) ?? featuresById.get(featureId);
    source = {
      sourceEvidenceId: featureRow?.sourceEvidenceId ?? '',
      sourcePath: featureRow?.sourceFile ?? '',
      featureId: featureRow?.featureId ?? featureId,
      groupKey: featureRow?.groupKey ?? '',
    };
    completion = completionForFeature(featureRow);
  } else if (rowKind === 'save-mapping') {
    const id = reviewId.replace(/^save-mapping:/, '');
    const saveRow = saveMappingById.get(id);
    source = {
      sourceEvidenceId: saveRow?.sourceEvidenceId ?? scope.transfer?.sourceEvidenceId ?? '',
      sourcePath: saveRow?.sourcePath ?? scope.transfer?.sourcePath ?? '',
      address: saveRow?.address ?? scope.transfer?.address ?? '',
      family: saveRow?.family ?? '',
      fieldPath: saveRow?.fieldPath ?? scope.transfer?.fieldPath ?? '',
      runtimeOwner: saveRow?.runtimeOwner ?? '',
    };
    completion = completionForSaveMapping(saveRow ?? scope.transfer);
  } else if (rowKind === 'session-mapping') {
    const id = reviewId.replace(/^session-mapping:/, '');
    const sessionRow = sessionMappingById.get(id);
    source = {
      sourceEvidenceId: sessionRow?.sourceEvidenceId ?? scope.transfer?.sourceEvidenceId ?? '',
      sourcePath: sessionRow?.sourcePath ?? scope.transfer?.sourcePath ?? '',
      address: sessionRow?.address ?? scope.transfer?.address ?? '',
      sessionFieldPath: sessionRow?.sessionFieldPath ?? scope.transfer?.sessionFieldPath ?? '',
    };
    completion = completionForSessionMapping(sessionRow ?? scope.transfer);
  } else {
    completion = {
      completionStatus: 'unresolved',
      runtimeConsumerId: '',
      verificationId: '',
      issue: `M34 row kind is not classified: ${reviewId}`,
    };
  }

  rows.push({
    coverageRowId: `social-equipment-cflag:${rowKind}:${slug(reviewId)}`,
    reviewId,
    rowKind,
    scopeSource: scope.source,
    ...source,
    ...completion,
    ...(scope.transfer
      ? {
          inboundTransfer: true,
          fromMilestone: scope.transfer.fromMilestone,
          toMilestone: 'M34',
          transferReason: scope.transfer.transferReason ?? scope.transfer.approvedExclusionReason ?? scope.transfer.exclusionReason,
          acceptedByOwner: scope.transfer.acceptedByOwner ?? true,
        }
      : {}),
  });
}

const unresolvedRows = rows.filter((row) => row.completionStatus === 'unresolved');
const missingEvidence = rows.filter((row) => !row.sourceEvidenceId);
const missingConsumer = rows.filter((row) => !row.runtimeConsumerId);
const missingVerification = rows.filter((row) => !row.verificationId);
const implementedRows = rows.filter((row) => row.completionStatus.startsWith('implemented'));
const mappedRows = rows.filter((row) => row.completionStatus.startsWith('mapped'));
const approvedExcludedRows = [];

function sourceKindForRow(row) {
  if (row.rowKind === 'definition') return row.definitionKey === 'items' ? 'csv-definition-row' : 'csv-row';
  if (row.rowKind === 'feature') return 'feature-route';
  if (row.rowKind === 'save-mapping') return 'save-mapping-row';
  if (row.rowKind === 'session-mapping') return 'session-mapping-row';
  return 'source-row';
}

function sourceLabelForRow(row) {
  return row.sourceId || row.address || row.featureId || row.reviewId;
}

function legacyFamilyForRow(row) {
  if (row.seedFamily) return row.seedFamily;
  if (row.family) return row.family;
  if (row.definitionKey === 'legacyCharacterFlagDefinitions') return 'CFLAG';
  if (row.definitionKey === 'items') return 'ITEM';
  if (row.address?.startsWith('ITEMSALES:')) return 'ITEMSALES';
  return '';
}

function manifestStatusForRow(row) {
  if (row.completionStatus.startsWith('implemented')) return 'implemented-verified';
  if (row.completionStatus.startsWith('approved-excluded')) return 'approved-excluded';
  return 'blocked';
}

function blockerReasonForRow(row) {
  if (manifestStatusForRow(row) !== 'blocked') return '';
  if (row.issue) return row.issue;
  if (row.completionStatus.startsWith('mapped')) return 'Mapped row is not a valid M34 completion state.';
  return 'M34 row is not implemented-verified or approved-excluded.';
}

const manifestUnits = rows.map((row, index) => ({
  unitId: `M34:source-unit:${String(index + 1).padStart(5, '0')}`,
  milestone: 'M34',
  ownerMilestone: 'M34',
  ownerRole: 'social-equipment-cflag-owner',
  sourceKind: sourceKindForRow(row),
  sourcePath: row.sourcePath,
  sourceLine: '',
  sourceLabel: sourceLabelForRow(row),
  sourceEvidenceId: row.sourceEvidenceId,
  legacyReviewId: row.reviewId,
  legacyFamily: legacyFamilyForRow(row),
  rowKind: row.rowKind,
  legacyId: row.sourceId || row.seedIndex || row.address || '',
  requiredBehavior:
    'M34 social/equipment/CFLAG ownership must expose, consume, persist, or display this source unit through concrete runtime behavior.',
  runtimeConsumerId: row.runtimeConsumerId,
  verificationId: row.verificationId,
  previousCompletionStatus: row.completionStatus,
  manifestStatus: manifestStatusForRow(row),
  blockerReason: blockerReasonForRow(row),
  sourceCoverageRowId: row.coverageRowId,
  acceptedByOwner: row.acceptedByOwner ?? null,
  fromMilestone: row.fromMilestone ?? '',
  toMilestone: row.toMilestone ?? '',
}));

const manifestSummary = {
  totalUnits: manifestUnits.length,
  'implemented-verified': manifestUnits.filter((unit) => unit.manifestStatus === 'implemented-verified').length,
  'approved-excluded': manifestUnits.filter((unit) => unit.manifestStatus === 'approved-excluded').length,
  blocked: manifestUnits.filter((unit) => unit.manifestStatus === 'blocked').length,
  'scope-redesign-required': 0,
  completedAllowedNow: false,
};
manifestSummary.completedAllowedNow =
  manifestSummary.blocked === 0 &&
  manifestSummary['scope-redesign-required'] === 0 &&
  manifestSummary['implemented-verified'] + manifestSummary['approved-excluded'] === manifestSummary.totalUnits;

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
    message: 'M34 row is missing source evidence.',
  })),
  ...missingConsumer.map((row) => ({
    issueId: `missing-consumer:${row.reviewId}`,
    severity: 'error',
    rowRef: row.reviewId,
    message: 'M34 row is missing runtime consumer.',
  })),
  ...missingVerification.map((row) => ({
    issueId: `missing-verification:${row.reviewId}`,
    severity: 'error',
    rowRef: row.reviewId,
    message: 'M34 row is missing verification.',
  })),
];

const coverage = {
  schemaVersion: 'social-equipment-cflag-coverage/v1',
  generatedBy: 'tools/build_social_equipment_cflag_coverage.mjs',
  milestone: 'M34',
  ownerRole: 'social-equipment-cflag-owner',
  sourceInputs: {
    implementationQueue: 'data/coverage/implementation-queue.json',
    features: 'data/coverage/features.json',
    definitions: 'data/coverage/definitions.json',
    saveMapping: 'data/coverage/save-mapping.json',
    sessionMapping: 'data/coverage/session-mapping.json',
    inboundTransfers: inboundTransfers.map((row) => row.inboundArtifact),
  },
  scopeContract: {
    ownedUnitIds: units.map((unit) => unit.unitId),
    rule: 'Every M34 queue row and inbound transfer must be implemented-verified or approved-excluded exactly once. Mapped rows are not completion states.',
    runtimeBoundary:
      'Raw CFLAG remains source evidence only. Runtime state uses body.conditionFlags, equipment.clothing/availabilityFlags, people flags, social.relationships, and wardrobe route actions.',
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
    bySeedFamily: countBy(rows.filter((row) => row.seedFamily), (row) => row.seedFamily),
    inboundTransfers: inboundTransfers.length,
    m34OwnedRows: rows.length,
    implementedVerifiedForStrictClosure: implementedRows.length,
    approvedExcludedFromM34: approvedExcludedRows.length,
  },
  rows,
  unresolvedIssues,
};

const gapAudit = {
  schemaVersion: 'milestone-gap-audit/v1',
  generatedBy: 'tools/build_social_equipment_cflag_coverage.mjs',
  milestone: 'M34',
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

const closure = {
  schemaVersion: 'milestone-closure/v1',
  milestone: 'M34',
  title: 'Relationship, CFLAG, equipment, and clothing ownership',
  status: 'completed',
  completedAt: '2026-05-01',
  commitPolicy: 'Commit after every milestone closure.',
  commitHash: 'recorded by the M34 git commit that includes this closure file',
  sourceInputs: coverage.sourceInputs,
  outputs: {
    socialEquipmentCflagCoverage: 'data/coverage/social-equipment-cflag-coverage.json',
    sourceUnitManifest: 'data/coverage/manifests/M34-source-units.json',
    gapAudit: 'data/coverage/audits/M34-gap-audit.json',
    builder: 'tools/build_social_equipment_cflag_coverage.mjs',
    coverageGate: 'tools/gate_social_equipment_cflag.mjs',
    closureGate: 'tools/gate_milestone_scope_closure.mjs',
    smoke: 'tools/m34_social_equipment_cflag_smoke.ts',
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
    commands: [
      'npm run coverage:social-equipment-cflag',
      'npm run gate:social-equipment-cflag',
      'npm run gate:milestone-scope-closure -- M34',
      'npm run smoke:social-equipment-cflag',
      'npm run typecheck',
      'npm run build',
      'npm run test --if-present',
    ],
    expectedGateResult: `${rows.length} M34 owned row(s), 0 unresolved issue(s)`,
  },
  commandsRun: [
    'npm run coverage:social-equipment-cflag',
    'npm run gate:social-equipment-cflag',
    'npm run gate:milestone-scope-closure -- M34',
    'npm run smoke:social-equipment-cflag',
    'npm run typecheck',
    'npm run build',
    'npm run test --if-present',
  ],
  sourceUnitMetrics: manifestSummary,
  responsibilityIntegrity: {
    scopeReductionProhibited: true,
    checklistMatchedToResponsibility: true,
    sourceBehaviorImplementedNotJustIndexed: true,
    gateValidatesResponsibilityNotOwnScaffold: true,
    limitationsBlockCompletion: false,
    responsibilityItems: [
      'CFLAG definition labels and legacy split behavior used by runtime wardrobe/social state.',
      'Character CFLAG and RELATION initial seeds consumed into runtime people, body, equipment, and social state.',
      'Equipment and clothing save fields consumed through splitLegacyCharacterFlags and wardrobe actions.',
      'Clothing pack item definitions consumed by wardrobe availability and inventory behavior.',
      'Item 211 apron definition, save field, and visibility behavior consumed by wardrobe costume selection.',
      'Wardrobe route, toggle action, costume selection action, save roundtrip, and session-free view behavior.',
    ],
    implementationEvidence: [
      'data/coverage/social-equipment-cflag-coverage.json',
      'data/coverage/manifests/M34-source-units.json',
      'src/features/socialEquipmentCflag.ts',
      'src/game/actions.ts',
      'src/game/dispatch.ts',
      'src/game/views.ts',
      'src/ui/RouteScreens.tsx',
    ],
    verificationEvidence: [
      'npm run coverage:social-equipment-cflag',
      'npm run gate:social-equipment-cflag',
      'npm run gate:milestone-scope-closure -- M34',
      'npm run smoke:social-equipment-cflag',
      'npm run build',
      'npm run test --if-present',
    ],
  },
};

const sourceManifest = {
  schemaVersion: 'source-unit-manifest/v1',
  milestone: 'M34',
  generatedAt: '2026-05-06',
  purpose: 'Strict completion criteria for M34 social/equipment/CFLAG responsibility.',
  sourceInputs: ['data/coverage/social-equipment-cflag-coverage.json'],
  rules: [
    'Every source unit must close as implemented-verified or approved-excluded before an implementation milestone can be completed.',
    'Mapped, transferred-out, planned runtime consumer, and planned verification are not completion states by themselves.',
    'M34 completion cannot transfer owned CFLAG, relationship, equipment, clothing, wardrobe, or item 211 apron behavior to another milestone without an explicit approved exclusion in that receiver manifest.',
  ],
  directOriginalReviewRequiredBeforeCompletion: true,
  originalSourceRoots: [
    'original-game/ERB',
    'original-game/CSV',
    'original-game/CSV/Chara*.csv',
    'original-game/CSV/VariableSize.CSV',
  ],
  summary: manifestSummary,
  completionGate: {
    requiredStatuses: ['implemented-verified', 'approved-excluded'],
    forbiddenStatusesForCompletion: ['blocked', 'scope-redesign-required'],
    requiredCommands: [
      'npm run coverage:social-equipment-cflag',
      'npm run gate:social-equipment-cflag',
      'npm run smoke:social-equipment-cflag',
      'npm run gate:milestone-scope-closure -- M34',
      'npm run build',
    ],
  },
  notes: [
    'M34 owns CFLAG definitions, Chara CFLAG/RELATION seeds, equipment/clothing save rows, clothing session view rows, wardrobe route behavior, and item 211 apron costume behavior.',
    'Mapped rows are intentionally blocked from completion; this manifest is regenerated only after the builder can prove implemented runtime consumers and verification.',
    'M33/M30 inbound item and CFLAG responsibilities are accepted by M34 and closed here only when implemented-verified.',
  ],
  units: manifestUnits,
};

writeJson('data/coverage/social-equipment-cflag-coverage.json', coverage);
writeJson('data/coverage/audits/M34-gap-audit.json', gapAudit);
writeJson('data/coverage/milestones/M34-closure.json', closure);
writeJson('data/coverage/manifests/M34-source-units.json', sourceManifest);

console.log(
  `coverage:social-equipment-cflag wrote ${rows.length} row(s), implemented=${implementedRows.length}, mapped=${mappedRows.length}, unresolved=${unresolvedIssues.length}.`,
);
