import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const outputPath = 'data/coverage/audits/pre-implementation-gap-audit.json';

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));
}

function fileExists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
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

function normalizePath(value) {
  return String(value || '').replace(/\\/g, '/').toLowerCase();
}

function hasSourceEvidence(row) {
  return Boolean(row.sourceEvidenceId && row.sourceEvidence && row.sourceEvidence.evidenceId === row.sourceEvidenceId);
}

function hasConsumer(row) {
  return Boolean(
    row.runtimeRoute ||
      row.runtimeAction ||
      row.viewBuilder ||
      row.handlerOwner ||
      row.consumingFeature ||
      row.consumingView ||
      row.consumingCalculation ||
      row.saveInitPath ||
      row.handlerPath ||
      row.viewPath ||
      row.calculationPath ||
      row.fieldPath ||
      row.sessionFieldPath ||
      row.calculationOwner,
  );
}

function sample(rows, limit = 20) {
  return rows.slice(0, limit);
}

function numericId(value) {
  const numeric = Number(value);
  return Number.isInteger(numeric) ? numeric : undefined;
}

function sourceEvidenceFile(row) {
  return normalizePath(row.sourceEvidence?.sourcePath || row.sourceFile || '');
}

const milestonePlan = {
  M28: {
    role: 'main-route-connector',
    responsibility: 'Close main menu routes and direct actions before feature-specific implementation.',
  },
  M29: {
    role: 'shop-purchase-implementer',
    responsibility: 'Close purchase listings, prices, visibility, success/failure/cancel, and inventory/economy results.',
  },
  M30: {
    role: 'item-use-implementer',
    responsibility: 'Close usable and special item effects without no-op placeholders.',
  },
  M31: {
    role: 'recruit-implementer',
    responsibility: 'Close recruit listings, costs, conditions, character creation, and duplicate/failure paths.',
  },
  M32: {
    role: 'character-identity-owner',
    responsibility: 'Close character templates, names, call names, display identity, and identity roundtrip.',
  },
  M33: {
    role: 'body-stat-owner',
    responsibility: 'Close base stats, abilities, talents, experiences, marks, parameters, and stat display.',
  },
  M34: {
    role: 'social-equipment-cflag-owner',
    responsibility: 'Close CFLAG meaning split, relationships, equipment, clothing, and related roundtrip.',
  },
  M35: {
    role: 'turn-time-owner',
    responsibility: 'Close turn end, time progression, hooks, automatic updates, and session cleanup.',
  },
  M36: {
    role: 'visit-facility-owner',
    responsibility: 'Close visit places, facilities, visit actions, unlocks, costs, and result owners.',
  },
  M37: {
    role: 'work-owner',
    responsibility: 'Close work, brothel, part-time, and special work conditions, calculations, and results.',
  },
  M38: {
    role: 'filming-definition-owner',
    responsibility: 'Close filming scene definitions, candidate conditions, descriptions, and expected result definitions.',
  },
  M39: {
    role: 'filming-execution-owner',
    responsibility: 'Close filming execution, point calculation, release/sales, result state, and roundtrip.',
  },
  M40: {
    role: 'training-session-owner',
    responsibility: 'Close training screen, participant/command selection, candidate view, and session lifecycle.',
  },
  M41: {
    role: 'training-availability-owner',
    responsibility: 'Close command availability, unavailable reasons, and non-mutating candidate calculations.',
  },
  M42: {
    role: 'training-effect-0-34-owner',
    responsibility: 'Close command 0-34 effects, source calculations, save result owners, and cleanup.',
  },
  M43: {
    role: 'training-effect-35-69-owner',
    responsibility: 'Close command 35-69 effects, source calculations, save result owners, and cleanup.',
  },
  M44: {
    role: 'training-effect-70-104-and-post-owner',
    responsibility: 'Close command 70-104, training post-processing, raw-name gates, and all-command summary.',
  },
  M45: {
    role: 'common-maintenance-owner',
    responsibility: 'Close ability-up, rest/recovery, common maintenance, and shared system handlers.',
  },
  M46: {
    role: 'mission-owner',
    responsibility: 'Close mission definitions, accept/progress/report/fail/expire/reward, and turn hooks.',
  },
  M47: {
    role: 'world-event-owner',
    responsibility: 'Close world progression, event/story flags, event display, hooks, and save owners.',
  },
  M48: {
    role: 'ending-meta-owner',
    responsibility: 'Close endings, inheritance, global/meta state, achievements, and game completion flow.',
  },
  M49: {
    role: 'info-settings-catchall-owner',
    responsibility: 'Close info/help/settings/debug/text and explicitly owned remaining features.',
  },
  M50: {
    role: 'save-roundtrip-owner',
    responsibility: 'Close full save/load payload, migrations, corruption/future schema handling, and runtime pollution gates.',
  },
};

function commandEffectOwner(row) {
  const commandId = numericId(row.sourceId ?? row.runtimeId ?? row.sourceName);
  if (commandId === undefined) return 'M44';
  if (commandId <= 34) return 'M42';
  if (commandId <= 69) return 'M43';
  return 'M44';
}

function ownerForFeature(row) {
  const group = row.groupKey || '';
  const text = `${row.sourceFile || ''} ${row.sourceLabel || ''} ${row.classification || ''} ${row.notes || ''}`.toUpperCase();

  if (group === 'main-menu') return 'M28';
  if (group === 'item-shop') return text.includes('USE_ITEM') || text.includes('ITEM-USE') ? 'M30' : 'M29';
  if (group === 'recruit') return 'M31';
  if (group === 'wardrobe-clothing') return 'M34';
  if (group === 'turn-end') return 'M35';
  if (group === 'visit') return 'M36';
  if (group === 'work') return 'M37';
  if (group === 'shooting') return text.includes('POINT') || text.includes('VIDEO') ? 'M39' : 'M39';
  if (group === 'training') {
    if (text.includes('TRAIN_MAIN') || text.includes('BEFORE_TRAIN') || text.includes('EVENTCOM')) return 'M40';
    if (text.includes('COMABLE') || text.includes('COM_ORDER')) return 'M41';
    return 'M44';
  }
  if (group === 'ability-up') return 'M45';
  if (group === 'common-system') return 'M45';
  if (group === 'mission') return 'M46';
  if (group === 'event-world') return 'M47';
  if (group === 'ending-event-meta') return 'M48';
  if (group === 'info-help-debug') return 'M49';
  if (group === 'persistence') return 'M50';
  if (group === 'new-game') return 'M32';
  return 'M49';
}

function ownerForDefinition(row) {
  const key = row.definitionKey || '';
  const family = row.seedFamily || row.sourceEvidence?.family || '';
  const sourceId = row.sourceId ?? row.runtimeId ?? '';

  if (key === 'mainMenuOptions') return 'M28';
  if (key === 'items') {
    const itemId = numericId(sourceId);
    if (itemId !== undefined && itemId >= 100 && itemId <= 199) return 'M31';
    if (itemId !== undefined && itemId >= 200) return 'M30';
    return 'M29';
  }
  if (key === 'characters') return 'M32';
  if (key === 'characterTextDefinitions') return 'M32';
  if (key === 'characterInitialValues') {
    if (family === 'CSTR') return 'M32';
    if (['BASE', 'MAXBASE', 'ABL', 'TALENT', 'EXP', 'MARK', 'PALAM', 'JUEL', 'STAIN'].includes(family)) return 'M33';
    if (['CFLAG', 'RELATION', 'EQUIP', 'ISASSI', 'CHARASALES'].includes(family)) return 'M34';
    return 'M32';
  }
  if (['baseStats', 'abilities', 'talents', 'experiences', 'marks'].includes(key)) return 'M33';
  if (key === 'legacyCharacterFlagDefinitions') return 'M34';
  if (key === 'visitPlaces') return 'M36';
  if (key === 'workDefinitions') return 'M37';
  if (key === 'filmingSceneDefinitions') return 'M38';
  if (key === 'missionDefinitions') return 'M46';
  if (key === 'eventDefinitions') return 'M47';
  if (key === 'endingDefinitions') return 'M48';
  if (key === 'achievementDefinitions') return 'M48';
  if (key === 'helpTextDefinitions') return 'M49';
  if (key === 'trainingCommands') return commandEffectOwner(row);
  if (key === 'sourceDefinitions') return 'M42';
  if (key === 'trainingParams') return 'M42';
  return 'M49';
}

function ownerFromFeatureGroups(groups) {
  const values = Array.isArray(groups) ? groups : [];
  if (values.includes('item-shop')) return 'M29';
  if (values.includes('recruit')) return 'M31';
  if (values.includes('visit')) return 'M36';
  if (values.includes('work')) return 'M37';
  if (values.includes('shooting')) return 'M39';
  if (values.includes('training')) return 'M44';
  if (values.includes('mission')) return 'M46';
  if (values.includes('event-world')) return 'M47';
  if (values.includes('ending-event-meta')) return 'M48';
  if (values.includes('common-system') || values.includes('ability-up')) return 'M45';
  if (values.includes('persistence')) return 'M50';
  return '';
}

function ownerForSaveMapping(row) {
  const pathText = `${row.runtimeOwner || ''} ${row.fieldPath || ''}`.toLowerCase();
  const groupOwner = ownerFromFeatureGroups(row.relatedFeatureGroups);
  if (groupOwner) return groupOwner;

  if (pathText.includes('inventory') || pathText.includes('shop')) return 'M29';
  if (pathText.includes('identity') || pathText.includes('callname') || pathText.includes('name')) return 'M32';
  if (
    pathText.includes('body') ||
    pathText.includes('base') ||
    pathText.includes('ability') ||
    pathText.includes('talent') ||
    pathText.includes('experience') ||
    pathText.includes('mark') ||
    pathText.includes('param')
  ) {
    return 'M33';
  }
  if (pathText.includes('social') || pathText.includes('relationship') || pathText.includes('equipment') || pathText.includes('clothing')) {
    return 'M34';
  }
  if (pathText.includes('clock') || pathText.includes('turn') || pathText.includes('time')) return 'M35';
  if (pathText.includes('visit') || pathText.includes('facility')) return 'M36';
  if (pathText.includes('work')) return 'M37';
  if (pathText.includes('filming') || pathText.includes('shooting') || pathText.includes('video')) return 'M39';
  if (pathText.includes('training')) return 'M44';
  if (pathText.includes('mission')) return 'M46';
  if (pathText.includes('event') || pathText.includes('world')) return 'M47';
  if (pathText.includes('ending') || pathText.includes('achievement') || pathText.includes('meta') || pathText.includes('global')) return 'M48';
  if (pathText.includes('economy') || pathText.includes('money')) return 'M29';
  return 'M50';
}

function ownerForSessionMapping(row) {
  const text = `${row.featureLifecycleOwner || ''} ${row.sessionOwner || ''} ${row.calculationOwner || ''} ${row.classification || ''}`.toLowerCase();
  if (text.includes('shop')) return 'M29';
  if (text.includes('recruit')) return 'M31';
  if (text.includes('visit')) return 'M36';
  if (text.includes('work')) return 'M37';
  if (text.includes('filming') || text.includes('shooting')) return 'M39';
  if (text.includes('training') || text.includes('interaction')) return 'M44';
  if (text.includes('mission')) return 'M46';
  if (text.includes('event') || text.includes('world')) return 'M47';
  if (text.includes('screen')) return 'M28';
  if (text.includes('scratch') || text.includes('message') || text.includes('name')) return 'M49';
  return 'M49';
}

function ownerForSourceFile(sourcePath) {
  const text = sourcePath.toUpperCase();
  if (text.includes('GAMEBASE')) return 'M48';
  if (text.includes('VARIABLESIZE') || text.includes('#DIM')) return 'M27';
  if (text.includes('COMORDER')) return 'M41';
  if (text.includes('AV_POINTCALC') || text.includes('VIDEO')) return 'M39';
  if (text.includes('ZNAME') || text.includes('GIRLNAME') || text.includes('BOYFRIENDNAME')) return 'M32';
  if (text.includes('LIFELIST')) return 'M49';
  if (text.includes('SHOP_SLAVE') || text.includes('SHOP.ERH')) return 'M31';
  if (text.includes('SYSTEM_OTHERS')) return 'M45';
  if (text.includes('SYSTEM_SOURCE')) return 'M44';
  return 'M49';
}

function verificationFor(milestone) {
  if (milestone === 'M27') return 'npm run gate:implementation-queue';
  if (milestone === 'M50') return 'npm run gate:milestone-scope-closure -- M50';
  return `npm run gate:milestone-scope-closure -- ${milestone}`;
}

function reviewRow(partial) {
  const implementationOwnerMilestone = partial.implementationOwnerMilestone;
  return {
    reviewId: `${partial.rowKind}:${partial.rowId}`,
    rowKind: partial.rowKind,
    rowId: partial.rowId,
    sourceStatus: partial.sourceStatus || '',
    sourceOwnerMilestone: partial.sourceOwnerMilestone || '',
    implementationOwnerMilestone,
    ownerRole: milestonePlan[implementationOwnerMilestone]?.role || 'queue-review-owner',
    sourceEvidenceId: partial.sourceEvidenceId || '',
    sourcePath: partial.sourcePath || '',
    groupKey: partial.groupKey || '',
    definitionKey: partial.definitionKey || '',
    runtimeOwner: partial.runtimeOwner || '',
    closureRule: partial.closureRule,
    verificationCommand: verificationFor(implementationOwnerMilestone),
  };
}

const features = readJson('data/coverage/features.json');
const definitions = readJson('data/coverage/definitions.json');
const blockers = readJson('data/coverage/blockers.json');
const approvedExclusions = readJson('data/coverage/approved-exclusions.json');
const sourceManifest = readJson('data/coverage/source-manifest.json');
const crosscheck = readJson('data/coverage/coverage-crosscheck.json');
const saveMapping = readJson('data/coverage/save-mapping.json');
const sessionMapping = readJson('data/coverage/session-mapping.json');

const featureRows = features.rows ?? [];
const definitionRows = definitions.rows ?? [];
const blockerRows = blockers.blockers ?? [];
const approvedRows = approvedExclusions.exclusions ?? [];
const saveRows = saveMapping.rows ?? [];
const sessionRows = sessionMapping.rows ?? [];

const approvedIds = new Set(approvedRows.map((row) => row.approvedExclusionId));
const blockerIds = new Set(blockerRows.map((row) => row.blockerId));
const hardFailures = crosscheck.assertions?.hardFailures ?? {};

const coveredEvidenceFiles = new Set();
for (const collection of [featureRows, definitionRows, blockerRows, approvedRows, saveRows, sessionRows]) {
  for (const row of collection) {
    const evidencePath = sourceEvidenceFile(row);
    if (evidencePath) coveredEvidenceFiles.add(evidencePath);
  }
}

const primarySourceFiles = (sourceManifest.files ?? []).filter((row) => row.sourceTier === 'primary');
const sourceFilesWithoutDirectCoverageRows = primarySourceFiles.filter((row) => !coveredEvidenceFiles.has(normalizePath(row.sourcePath)));

const sourceFileReviewRows = sourceFilesWithoutDirectCoverageRows.map((row) =>
  reviewRow({
    rowKind: 'source-file-review',
    rowId: normalizePath(row.sourcePath),
    sourceStatus: 'manifest-primary-file-without-direct-row',
    implementationOwnerMilestone: ownerForSourceFile(row.sourcePath),
    sourcePath: row.sourcePath,
    closureRule:
      'M27 must either attach this source file to an implementation queue item, convert it into source evidence rows, or request an approved exclusion.',
  }),
);

const featureReviewRows = featureRows
  .filter((row) => row.status === 'blocker')
  .map((row) =>
    reviewRow({
      rowKind: 'feature',
      rowId: row.featureId,
      sourceStatus: row.status,
      sourceOwnerMilestone: row.ownerMilestone,
      implementationOwnerMilestone: ownerForFeature(row),
      sourceEvidenceId: row.sourceEvidenceId,
      sourcePath: row.sourceFile,
      groupKey: row.groupKey,
      closureRule:
        'Owning implementation milestone must implement route/action/view/handler/smoke evidence or record an approved exclusion.',
    }),
  );

const definitionReviewRows = definitionRows
  .filter((row) => row.status !== 'used')
  .map((row) =>
    reviewRow({
      rowKind: 'definition',
      rowId: row.definitionRowId,
      sourceStatus: row.status,
      sourceOwnerMilestone: row.ownerMilestone,
      implementationOwnerMilestone: ownerForDefinition(row),
      sourceEvidenceId: row.sourceEvidenceId,
      sourcePath: row.sourceFile,
      definitionKey: row.definitionKey,
      runtimeOwner: row.runtimeOwner,
      closureRule:
        'Owning implementation milestone must consume the definition in runtime behavior/view/calculation/save init, keep it as blocker, or record approved exclusion.',
    }),
  );

const saveReviewRows = saveRows
  .filter((row) => row.status === 'mapped')
  .map((row) =>
    reviewRow({
      rowKind: 'save-mapping',
      rowId: row.mappingRowId,
      sourceStatus: row.status,
      sourceOwnerMilestone: row.ownerMilestone,
      implementationOwnerMilestone: ownerForSaveMapping(row),
      sourceEvidenceId: row.sourceEvidenceId,
      sourcePath: row.sourceFile,
      runtimeOwner: row.runtimeOwner,
      closureRule:
        'Owning implementation milestone must read/write this save path through domain actions and verify save roundtrip when mutated.',
    }),
  );

const sessionReviewRows = sessionRows.map((row) =>
  reviewRow({
    rowKind: 'session-mapping',
    rowId: row.mappingRowId,
    sourceStatus: row.status,
    sourceOwnerMilestone: row.ownerMilestone,
    implementationOwnerMilestone: ownerForSessionMapping(row),
    sourceEvidenceId: row.sourceEvidenceId,
    sourcePath: row.sourceFile,
    runtimeOwner: row.sessionOwner || row.calculationOwner,
    closureRule:
      'Owning implementation milestone must create/consume/dispose the session or calculation value and keep it out of save payloads.',
  }),
);

const implementationReviewRows = [
  ...sourceFileReviewRows,
  ...featureReviewRows,
  ...definitionReviewRows,
  ...saveReviewRows,
  ...sessionReviewRows,
];

const missingEvidenceRows = [
  ...featureRows
    .filter((row) => !hasSourceEvidence(row))
    .map((row) => ({ rowKind: 'feature', rowId: row.featureId, sourceEvidenceId: row.sourceEvidenceId || '' })),
  ...definitionRows
    .filter((row) => !hasSourceEvidence(row))
    .map((row) => ({ rowKind: 'definition', rowId: row.definitionRowId, sourceEvidenceId: row.sourceEvidenceId || '' })),
  ...saveRows
    .filter((row) => !hasSourceEvidence(row))
    .map((row) => ({ rowKind: 'save-mapping', rowId: row.mappingRowId, sourceEvidenceId: row.sourceEvidenceId || '' })),
  ...sessionRows
    .filter((row) => !hasSourceEvidence(row))
    .map((row) => ({ rowKind: 'session-mapping', rowId: row.mappingRowId, sourceEvidenceId: row.sourceEvidenceId || '' })),
  ...blockerRows
    .filter((row) => !hasSourceEvidence(row))
    .map((row) => ({ rowKind: 'blocker', rowId: row.blockerId, sourceEvidenceId: row.sourceEvidenceId || '' })),
];

const orphanCoverageRows = [
  ...featureRows
    .filter((row) => row.status === 'implemented' && !hasConsumer(row))
    .map((row) => ({ rowKind: 'feature', rowId: row.featureId, status: row.status })),
  ...definitionRows
    .filter((row) => row.status !== 'blocker' && row.status !== 'approved-excluded' && !hasConsumer(row))
    .map((row) => ({ rowKind: 'definition', rowId: row.definitionRowId, status: row.status })),
  ...saveRows
    .filter((row) => row.status === 'mapped' && !row.runtimeOwner && !row.fieldPath)
    .map((row) => ({ rowKind: 'save-mapping', rowId: row.mappingRowId, status: row.status })),
  ...sessionRows
    .filter((row) => !row.sessionOwner && !row.sessionFieldPath && !row.calculationOwner && !row.calculationPath)
    .map((row) => ({ rowKind: 'session-mapping', rowId: row.mappingRowId, status: row.status })),
];

const roleOnlyRowsWithoutImplementationOwner = definitionReviewRows.filter((row) => !row.implementationOwnerMilestone);
const unknownOwnerRows = implementationReviewRows.filter((row) => !row.implementationOwnerMilestone || !row.verificationCommand);

const unapprovedExclusionRows = [
  ...featureRows
    .filter((row) => row.status === 'approved-excluded' && (!row.approvedExclusionId || !approvedIds.has(row.approvedExclusionId)))
    .map((row) => ({ rowKind: 'feature', rowId: row.featureId, approvedExclusionId: row.approvedExclusionId || '' })),
  ...definitionRows
    .filter((row) => row.status === 'approved-excluded' && (!row.approvedExclusionId || !approvedIds.has(row.approvedExclusionId)))
    .map((row) => ({ rowKind: 'definition', rowId: row.definitionRowId, approvedExclusionId: row.approvedExclusionId || '' })),
];

const blockerMissingRegistryRows = [
  ...featureRows
    .filter((row) => row.status === 'blocker' && (!row.blockerId || !blockerIds.has(row.blockerId)))
    .map((row) => ({ rowKind: 'feature', rowId: row.featureId, blockerId: row.blockerId || '' })),
  ...definitionRows
    .filter((row) => row.status === 'blocker' && (!row.blockerId || !blockerIds.has(row.blockerId)))
    .map((row) => ({ rowKind: 'definition', rowId: row.definitionRowId, blockerId: row.blockerId || '' })),
];

const crosscheckFailureRows = Object.entries(hardFailures)
  .filter(([key, value]) => key !== 'total' && Number(value) > 0)
  .map(([failureKind, count]) => ({ failureKind, count }));

const unresolvedIssues = {
  discoveredGap: 0,
  missingEvidence: missingEvidenceRows.length,
  orphanCoverage: orphanCoverageRows.length,
  roleOnly: roleOnlyRowsWithoutImplementationOwner.length,
  unknownOwner: unknownOwnerRows.length,
  unapprovedExclusion: unapprovedExclusionRows.length,
  blockerMissingRegistry: blockerMissingRegistryRows.length,
  crosscheckHardFailure: crosscheckFailureRows.reduce((sum, row) => sum + row.count, 0),
};

unresolvedIssues.total = Object.values(unresolvedIssues).reduce((sum, count) => sum + count, 0);

const report = {
  schemaVersion: 'pre-implementation-gap-audit/v1',
  generatedBy: 'tools/build_pre_implementation_gap_audit.mjs',
  sourceInputs: {
    sourceManifest: 'data/coverage/source-manifest.json',
    features: 'data/coverage/features.json',
    definitions: 'data/coverage/definitions.json',
    saveMapping: 'data/coverage/save-mapping.json',
    sessionMapping: 'data/coverage/session-mapping.json',
    blockers: 'data/coverage/blockers.json',
    approvedExclusions: 'data/coverage/approved-exclusions.json',
    coverageCrosscheck: 'data/coverage/coverage-crosscheck.json',
  },
  auditContract: {
    purpose:
      'Block M28+ implementation until source evidence, coverage rows, save/session mappings, blockers, and owner assignments have no hidden unresolved gaps.',
    completionRule:
      'unresolvedIssues.total must be 0. Source files without direct row evidence are recorded as M27 review items, not ignored.',
    implementationBacklogRule:
      'Backlog rows may remain only when they have an implementationOwnerMilestone and verificationCommand.',
  },
  summary: {
    sourceManifestPrimaryFiles: primarySourceFiles.length,
    sourceFilesWithoutDirectCoverageRows: sourceFileReviewRows.length,
    featureRows: featureRows.length,
    definitionRows: definitionRows.length,
    saveMappingRows: saveRows.length,
    sessionMappingRows: sessionRows.length,
    blockerRows: blockerRows.length,
    approvedExclusionRows: approvedRows.length,
    implementationReviewRows: implementationReviewRows.length,
    implementationReviewByKind: countBy(implementationReviewRows, (row) => row.rowKind),
    implementationReviewByOwnerMilestone: countBy(implementationReviewRows, (row) => row.implementationOwnerMilestone),
    implementationReviewBySourceStatus: countBy(implementationReviewRows, (row) => row.sourceStatus),
    unresolvedIssues,
  },
  ownerMilestonePlan: Object.entries(milestonePlan).map(([milestone, plan]) => ({
    milestone,
    ...plan,
    reviewRowCount: implementationReviewRows.filter((row) => row.implementationOwnerMilestone === milestone).length,
  })),
  sourceFileReviewRows,
  implementationReviewRows,
  issues: {
    missingEvidence: missingEvidenceRows,
    orphanCoverage: orphanCoverageRows,
    roleOnly: roleOnlyRowsWithoutImplementationOwner,
    unknownOwner: unknownOwnerRows,
    unapprovedExclusion: unapprovedExclusionRows,
    blockerMissingRegistry: blockerMissingRegistryRows,
    crosscheckHardFailure: crosscheckFailureRows,
  },
  samples: {
    sourceFileReviewRows: sample(sourceFileReviewRows),
    featureReviewRows: sample(featureReviewRows),
    definitionReviewRows: sample(definitionReviewRows),
    saveReviewRows: sample(saveReviewRows),
    sessionReviewRows: sample(sessionReviewRows),
  },
};

writeJson(outputPath, report);

console.log(
  `audit:pre-implementation wrote ${outputPath} (${implementationReviewRows.length} review row(s), ${sourceFileReviewRows.length} source file review row(s), ${unresolvedIssues.total} unresolved issue(s)).`,
);
