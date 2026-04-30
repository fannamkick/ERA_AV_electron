import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const outputPath = path.join(root, 'data/coverage/coverage-crosscheck.json');

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));
}

function fileExists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function writeJson(relativePath, value) {
  fs.writeFileSync(path.join(root, relativePath), `${JSON.stringify(value, null, 2)}\n`);
}

function countBy(rows, key) {
  const result = {};
  for (const row of rows) {
    const value = row[key] || '(empty)';
    result[value] = (result[value] ?? 0) + 1;
  }
  return Object.fromEntries(Object.entries(result).sort(([a], [b]) => a.localeCompare(b)));
}

function hasSourceEvidence(row) {
  return Boolean(row.sourceEvidenceId && row.sourceEvidence && row.sourceEvidence.evidenceId === row.sourceEvidenceId);
}

function isAuxiliaryCompletion(row, completeStatuses) {
  return completeStatuses.has(row.status) && row.sourceEvidence?.sourceTier === 'auxiliary';
}

function hasAnyConsumer(row) {
  return Boolean(
    row.consumingFeature ||
      row.consumingView ||
      row.consumingCalculation ||
      row.saveInitPath ||
      row.handlerPath ||
      row.viewPath ||
      row.calculationPath,
  );
}

function hasRuntimeConsumer(row) {
  return Boolean(row.runtimeRoute && row.runtimeAction && row.viewBuilder && row.handlerOwner && row.successSmokeId);
}

function completionFlag(row) {
  return row.completionStatus === 'complete' || row.isComplete === true || row.implemented === true;
}

function normalizeRead(read) {
  return String(read || '').trim();
}

function readMatchesDefinition(read, definitions) {
  const normalized = normalizeRead(read);
  if (!normalized) return true;
  if (normalized === 'definitions') return definitions.some((row) => row.runtimeOwner?.startsWith('definitions.'));

  const lower = normalized.toLowerCase();
  const suffix = lower.startsWith('definitions.') ? lower.slice('definitions.'.length) : lower;

  return definitions.some((row) => {
    const runtimeOwner = String(row.runtimeOwner || '').toLowerCase();
    const definitionKey = String(row.definitionKey || '').toLowerCase();
    const runtimeId = String(row.runtimeId || '').toLowerCase();
    return (
      runtimeOwner === lower ||
      runtimeOwner.includes(lower) ||
      definitionKey === suffix ||
      runtimeId === suffix ||
      runtimeOwner.includes(`definitions.${suffix}`)
    );
  });
}

function sample(rows, idSelector, limit = 20) {
  return rows.slice(0, limit).map(idSelector);
}

const features = readJson('data/coverage/features.json');
const definitions = readJson('data/coverage/definitions.json');
const blockers = readJson('data/coverage/blockers.json');
const approvedExclusions = readJson('data/coverage/approved-exclusions.json');
const saveMapping = fileExists('data/coverage/save-mapping.json') ? readJson('data/coverage/save-mapping.json') : null;

const featureRows = features.rows ?? [];
const definitionRows = definitions.rows ?? [];
const blockerRows = blockers.blockers ?? [];
const approvedRows = approvedExclusions.exclusions ?? [];
const saveMappingRows = saveMapping?.rows ?? [];
const persistentCandidateRows = saveMapping?.persistentCandidateCoverage ?? [];

const blockerIds = new Set(blockerRows.map((row) => row.blockerId));
const approvedIds = new Set(approvedRows.map((row) => row.approvedExclusionId));
const roleOnlyStatuses = new Set(['template', 'listing', 'display-only', 'calculation-only']);
const roleOnlyRoles = new Set(['template', 'listing', 'display-only', 'calculation-only']);
const featureCompleteStatuses = new Set(['implemented', 'approved-excluded']);
const definitionCompleteStatuses = new Set(['used', 'approved-excluded']);

const featureMissingSourceEvidence = featureRows.filter((row) => !hasSourceEvidence(row));
const definitionMissingSourceEvidence = definitionRows.filter((row) => !hasSourceEvidence(row));
const blockerMissingSourceEvidence = blockerRows.filter((row) => !hasSourceEvidence(row));

const featureBlockerMissingRegistry = featureRows.filter(
  (row) => row.status === 'blocker' && (!row.blockerId || !blockerIds.has(row.blockerId)),
);
const definitionBlockerMissingRegistry = definitionRows.filter(
  (row) => row.status === 'blocker' && (!row.blockerId || !blockerIds.has(row.blockerId)),
);

const approvedExcludedRows = [
  ...featureRows
    .filter((row) => row.status === 'approved-excluded')
    .map((row) => ({ rowKind: 'feature', rowId: row.featureId, approvedExclusionId: row.approvedExclusionId })),
  ...definitionRows
    .filter((row) => row.status === 'approved-excluded')
    .map((row) => ({ rowKind: 'definition', rowId: row.definitionRowId, approvedExclusionId: row.approvedExclusionId })),
];
const approvedExcludedMissingRegistry = approvedExcludedRows.filter(
  (row) => !row.approvedExclusionId || !approvedIds.has(row.approvedExclusionId),
);

const invalidApprovedRegistryRows = approvedRows.filter(
  (row) =>
    !row.approvedExclusionId ||
    !row.rowKind ||
    !row.rowId ||
    !row.ownerMilestone ||
    !row.sourceEvidenceId ||
    !row.approvalId ||
    !row.approvedBy ||
    !row.approvedAt ||
    !row.approvalScope ||
    !row.reason ||
    !row.replacementBehavior ||
    !row.verificationCommand,
);

const implementedFeatures = featureRows.filter((row) => row.status === 'implemented');
const implementedFeatureMissingRuntimeConsumer = implementedFeatures.filter((row) => !hasRuntimeConsumer(row));
const implementedFeatureDefinitionReads = implementedFeatures.flatMap((row) =>
  (row.definitionReads ?? []).map((read) => ({ featureId: row.featureId, read: normalizeRead(read) })).filter((row) => row.read),
);
const implementedFeatureDefinitionReadUnmatched = implementedFeatureDefinitionReads.filter(
  (row) => !readMatchesDefinition(row.read, definitionRows),
);

const nonBlockerDefinitionMissingConsumer = definitionRows.filter(
  (row) => row.status !== 'blocker' && row.status !== 'approved-excluded' && !hasAnyConsumer(row),
);
const roleOnlyMarkedComplete = definitionRows.filter(
  (row) =>
    (roleOnlyStatuses.has(row.status) && completionFlag(row)) || (row.status === 'used' && roleOnlyRoles.has(row.role)),
);
const sourceEvidenceAuxiliaryCompleted = [
  ...featureRows.filter((row) => isAuxiliaryCompletion(row, featureCompleteStatuses)),
  ...definitionRows.filter((row) => isAuxiliaryCompletion(row, definitionCompleteStatuses)),
];

const saveMappingMissingSourceEvidence = saveMappingRows.filter((row) => !hasSourceEvidence(row));
const saveMappingForbiddenStatus = saveMappingRows.filter((row) =>
  ['blocker', 'needsDecision', 'missingMapping'].includes(row.status),
);
const saveMappingMappedMissingPath = saveMappingRows.filter(
  (row) => row.status === 'mapped' && (!row.runtimeOwner || !row.fieldPath),
);
const saveMappingMappedWithoutCoverageLinks = saveMappingRows.filter(
  (row) =>
    row.status === 'mapped' &&
    (!Array.isArray(row.relatedFeatureGroups) || row.relatedFeatureGroups.length === 0) &&
    (!Array.isArray(row.relatedDefinitionKeys) || row.relatedDefinitionKeys.length === 0),
);
const persistentCandidateUnresolved = persistentCandidateRows.filter((row) =>
  ['blocker', 'needsDecision', 'missingMapping'].includes(row.status),
);
const saveMappingSemanticFlagNotSplit = saveMappingRows.filter((row) => {
  if (row.status !== 'mapped') return false;
  if (!['CFLAG', 'FLAG', 'GLOBAL', 'GLOBALS', 'PBAND'].includes(row.family)) return false;
  return row.index === '' || row.semanticOwnerSource !== 'index-evidence-rule';
});

const hardFailures = {
  featureMissingSourceEvidence: featureMissingSourceEvidence.length,
  definitionMissingSourceEvidence: definitionMissingSourceEvidence.length,
  blockerMissingSourceEvidence: blockerMissingSourceEvidence.length,
  featureBlockerMissingRegistry: featureBlockerMissingRegistry.length,
  definitionBlockerMissingRegistry: definitionBlockerMissingRegistry.length,
  approvedExcludedMissingRegistry: approvedExcludedMissingRegistry.length,
  invalidApprovedRegistryRows: invalidApprovedRegistryRows.length,
  implementedFeatureMissingRuntimeConsumer: implementedFeatureMissingRuntimeConsumer.length,
  nonBlockerDefinitionMissingConsumer: nonBlockerDefinitionMissingConsumer.length,
  roleOnlyMarkedComplete: roleOnlyMarkedComplete.length,
  sourceEvidenceAuxiliaryCompleted: sourceEvidenceAuxiliaryCompleted.length,
  saveMappingMissingSourceEvidence: saveMappingMissingSourceEvidence.length,
  saveMappingForbiddenStatus: saveMappingForbiddenStatus.length,
  saveMappingMappedMissingPath: saveMappingMappedMissingPath.length,
  saveMappingMappedWithoutCoverageLinks: saveMappingMappedWithoutCoverageLinks.length,
  saveMappingSemanticFlagNotSplit: saveMappingSemanticFlagNotSplit.length,
  persistentCandidateUnresolved: persistentCandidateUnresolved.length
};

hardFailures.total = Object.entries(hardFailures)
  .filter(([key]) => key !== 'total')
  .reduce((sum, [, value]) => sum + value, 0);

const report = {
  schemaVersion: 'coverage-crosscheck/v1',
  generatedBy: 'tools/build_coverage_crosscheck.mjs',
  sourceInputs: {
    features: 'data/coverage/features.json',
    definitions: 'data/coverage/definitions.json',
    blockers: 'data/coverage/blockers.json',
    approvedExclusions: 'data/coverage/approved-exclusions.json',
    saveMapping: saveMapping ? 'data/coverage/save-mapping.json' : ''
  },
  summary: {
    featureRows: featureRows.length,
    definitionRows: definitionRows.length,
    blockerRows: blockerRows.length,
    approvedExclusionRows: approvedRows.length,
    saveMappingRows: saveMappingRows.length,
    persistentCandidateRows: persistentCandidateRows.length,
    featureStatus: countBy(featureRows, 'status'),
    definitionStatus: countBy(definitionRows, 'status'),
    saveMappingStatus: countBy(saveMappingRows, 'status'),
    persistentCandidateStatus: countBy(persistentCandidateRows, 'status'),
    roleOnlyDefinitionRows: definitionRows.filter((row) => roleOnlyStatuses.has(row.status)).length,
    implementedFeatureDefinitionReads: implementedFeatureDefinitionReads.length,
    implementedFeatureDefinitionReadMatched:
      implementedFeatureDefinitionReads.length - implementedFeatureDefinitionReadUnmatched.length
  },
  assertions: {
    hardFailures,
    trackedDeferredUntilOwnerMilestone: {
      implementedFeatureDefinitionReadUnmatched: {
        count: implementedFeatureDefinitionReadUnmatched.length,
        ownerMilestone: 'M23',
        reason:
          'Some implemented feature definitionReads point to runtime definitions first created from ERB-derived or local code definitions. M23 owns adding those definition rows to coverage.'
      },
      saveMappingCrosscheck: {
        count: saveMapping ? 0 : 1,
        ownerMilestone: 'M24',
        reason: saveMapping
          ? 'Save mapping exists and is included in hard failures from M24 onward.'
          : 'Save mapping rows do not exist before M24, so M22 records the rule and M24 must make this gate strict.'
      },
      sessionMappingCrosscheck: {
        ownerMilestone: 'M25',
        reason: 'Session/calculation mapping rows do not exist before M25, so M22 records the rule and M25 must make this gate strict.'
      }
    }
  },
  samples: {
    featureMissingSourceEvidence: sample(featureMissingSourceEvidence, (row) => row.featureId),
    definitionMissingSourceEvidence: sample(definitionMissingSourceEvidence, (row) => row.definitionRowId),
    blockerMissingSourceEvidence: sample(blockerMissingSourceEvidence, (row) => row.blockerId),
    featureBlockerMissingRegistry: sample(featureBlockerMissingRegistry, (row) => row.featureId),
    definitionBlockerMissingRegistry: sample(definitionBlockerMissingRegistry, (row) => row.definitionRowId),
    approvedExcludedMissingRegistry: sample(approvedExcludedMissingRegistry, (row) => `${row.rowKind}:${row.rowId}`),
    invalidApprovedRegistryRows: sample(invalidApprovedRegistryRows, (row) => row.approvedExclusionId || row.rowId),
    implementedFeatureMissingRuntimeConsumer: sample(implementedFeatureMissingRuntimeConsumer, (row) => row.featureId),
    implementedFeatureDefinitionReadUnmatched: sample(
      implementedFeatureDefinitionReadUnmatched,
      (row) => `${row.featureId} -> ${row.read}`,
    ),
    nonBlockerDefinitionMissingConsumer: sample(nonBlockerDefinitionMissingConsumer, (row) => row.definitionRowId),
    roleOnlyMarkedComplete: sample(roleOnlyMarkedComplete, (row) => row.definitionRowId),
    sourceEvidenceAuxiliaryCompleted: sample(
      sourceEvidenceAuxiliaryCompleted,
      (row) => row.featureId || row.definitionRowId || row.blockerId,
    ),
    saveMappingMissingSourceEvidence: sample(saveMappingMissingSourceEvidence, (row) => row.mappingRowId),
    saveMappingForbiddenStatus: sample(saveMappingForbiddenStatus, (row) => row.mappingRowId),
    saveMappingMappedMissingPath: sample(saveMappingMappedMissingPath, (row) => row.mappingRowId),
    saveMappingMappedWithoutCoverageLinks: sample(saveMappingMappedWithoutCoverageLinks, (row) => row.mappingRowId),
    saveMappingSemanticFlagNotSplit: sample(saveMappingSemanticFlagNotSplit, (row) => row.mappingRowId),
    persistentCandidateUnresolved: sample(persistentCandidateUnresolved, (row) => row.candidate)
  }
};

writeJson('data/coverage/coverage-crosscheck.json', report);

console.log(
  `coverage:crosscheck wrote ${path.relative(root, outputPath)} (${featureRows.length} feature row(s), ${definitionRows.length} definition row(s), ${saveMappingRows.length} save mapping row(s), ${hardFailures.total} hard failure(s)).`,
);
