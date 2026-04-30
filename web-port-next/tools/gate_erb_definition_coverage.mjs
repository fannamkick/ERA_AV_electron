import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const workspaceRoot = path.resolve(root, '..');

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));
}

function fail(message, detail) {
  console.error(`gate:erb-definition-coverage failed: ${message}`);
  if (detail) {
    console.error(JSON.stringify(detail, null, 2));
  }
  process.exit(1);
}

function assert(condition, message, detail) {
  if (!condition) fail(message, detail);
}

function sourceExists(sourcePath) {
  return fs.existsSync(path.join(workspaceRoot, sourcePath));
}

function hasConsumer(row) {
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

function missingRequiredComponents(row) {
  const required = row.requiredComponents ?? [];
  const actual = new Set((row.componentLabels ?? []).map((component) => component.component));
  return required.filter((component) => !actual.has(component));
}

const artifact = readJson('data/coverage/erb-derived-definitions.json');
const definitions = readJson('data/coverage/definitions.json');

assert(artifact.schemaVersion === 'erb-derived-definitions/v1', 'invalid ERB-derived definition schema version');
assert(Array.isArray(artifact.rows), 'ERB-derived definition rows must be an array');
assert(Array.isArray(artifact.conflicts), 'ERB-derived definition conflicts must be an array');
assert(definitions.schemaVersion === 'definition-coverage/v1', 'invalid definition coverage schema version');
assert(Array.isArray(definitions.rows), 'definition coverage rows must be an array');

const rows = artifact.rows;
const ids = new Set();
const duplicateIds = [];

for (const row of rows) {
  if (ids.has(row.derivedDefinitionId)) duplicateIds.push(row.derivedDefinitionId);
  ids.add(row.derivedDefinitionId);
}

assert(duplicateIds.length === 0, 'duplicate ERB-derived definition ids', duplicateIds.slice(0, 20));

const requiredDefinitionKeys = [
  'mainMenuOptions',
  'visitPlaces',
  'missionDefinitions',
  'workDefinitions',
  'filmingSceneDefinitions',
  'eventDefinitions',
  'endingDefinitions',
  'achievementDefinitions',
  'helpTextDefinitions',
];
const keys = new Set(rows.map((row) => row.definitionKey));
const missingDefinitionKeys = requiredDefinitionKeys.filter((key) => !keys.has(key));
assert(missingDefinitionKeys.length === 0, 'required ERB-derived definition keys missing', missingDefinitionKeys);

const allowedClassifications = new Set(['runtime-definition', 'blocker', 'approved-excluded']);
const invalidClassification = rows.filter((row) => !allowedClassifications.has(row.classification));
assert(invalidClassification.length === 0, 'invalid ERB-derived classification', invalidClassification.slice(0, 20));

const unresolvedConflicts = artifact.conflicts.filter((conflict) => conflict.status !== 'resolved' && conflict.status !== 'none');
assert(unresolvedConflicts.length === 0, 'ERB/CSV definition conflicts must be resolved or absent', unresolvedConflicts.slice(0, 20));

const missingIdentity = rows.filter(
  (row) =>
    !row.derivedDefinitionId ||
    !row.definitionKey ||
    !row.sourceFile ||
    !row.sourceLabel ||
    !row.sourceLine ||
    !row.sourceId ||
    !row.runtimeId ||
    !row.runtimeOwner ||
    !row.role ||
    !row.consumerKind ||
    !row.statusForDefinitionCoverage ||
    !row.ownerMilestone,
);
assert(missingIdentity.length === 0, 'ERB-derived rows are missing required identity fields', missingIdentity.slice(0, 20));

const missingSource = rows.filter(
  (row) =>
    !row.sourceEvidenceId ||
    !row.sourceEvidence ||
    row.sourceEvidence.evidenceId !== row.sourceEvidenceId ||
    row.sourceEvidence.sourceTier !== 'primary' ||
    !['erb-label', 'erh-label'].includes(row.sourceEvidence.sourceKind) ||
    row.sourceEvidence.sourcePath !== row.sourceFile ||
    row.sourceEvidence.label !== row.sourceLabel ||
    String(row.sourceEvidence.line) !== String(row.sourceLine) ||
    !sourceExists(row.sourceFile),
);
assert(missingSource.length === 0, 'ERB-derived rows require primary ERB label evidence', missingSource.slice(0, 20));

const runtimeRowsWithoutConsumer = rows.filter((row) => row.classification === 'runtime-definition' && !hasConsumer(row));
assert(runtimeRowsWithoutConsumer.length === 0, 'runtime ERB definitions require consumer owner evidence', runtimeRowsWithoutConsumer.slice(0, 20));

const approvedWithoutEvidence = rows.filter((row) => row.classification === 'approved-excluded' && !row.approvedExclusionId);
assert(approvedWithoutEvidence.length === 0, 'approved-excluded ERB definitions require approvedExclusionId', approvedWithoutEvidence.slice(0, 20));

const blockerWithoutRegistry = rows.filter((row) => row.classification === 'blocker' && !row.blockerId);
assert(blockerWithoutRegistry.length === 0, 'blocker ERB definitions require blockerId', blockerWithoutRegistry.slice(0, 20));

const componentRows = rows.filter((row) => (row.requiredComponents ?? []).length > 0);
const rowsMissingComponents = componentRows
  .map((row) => ({ derivedDefinitionId: row.derivedDefinitionId, missing: missingRequiredComponents(row) }))
  .filter((row) => row.missing.length > 0);
assert(rowsMissingComponents.length === 0, 'component definition rows are missing required ERB labels', rowsMissingComponents.slice(0, 20));

const menuRowsMissingAction = rows.filter(
  (row) => ['mainMenuOptions', 'visitPlaces'].includes(row.definitionKey) && (!row.menuCode || !row.displayText || !row.actionTarget),
);
assert(menuRowsMissingAction.length === 0, 'menu/visit definitions require menu code, display text, and action target', menuRowsMissingAction.slice(0, 20));

const definitionCoverageRows = new Set(
  definitions.rows
    .filter((row) => row.sourceKind === 'erb-derived-definition')
    .map((row) => row.derivedDefinitionId),
);
const notMergedIntoDefinitionCoverage = rows.filter((row) => !definitionCoverageRows.has(row.derivedDefinitionId));
assert(
  notMergedIntoDefinitionCoverage.length === 0,
  'ERB-derived rows must be merged into definition coverage',
  notMergedIntoDefinitionCoverage.slice(0, 20),
);

const missingM22ReadClosures = ['visitPlaces', 'missionDefinitions', 'workDefinitions', 'filmingSceneDefinitions'].filter(
  (definitionKey) => !definitions.rows.some((row) => row.sourceKind === 'erb-derived-definition' && row.definitionKey === definitionKey),
);
assert(missingM22ReadClosures.length === 0, 'M22 deferred definition reads are still missing', missingM22ReadClosures);

const hasDisplayOnly = rows.some((row) => row.role === 'display' || row.statusForDefinitionCoverage === 'display-only');
const hasCalculationInput = rows.some(
  (row) => row.consumingCalculation || Object.values(row.componentCoverage ?? {}).some((count) => count > 0),
);
assert(hasDisplayOnly, 'display-only ERB definitions must be separated from rules/calculations');
assert(hasCalculationInput, 'calculation input ERB definitions must be separated from display-only rows');

console.log(
  `gate:erb-definition-coverage passed: ${rows.length} ERB-derived row(s), ${artifact.summary.componentLabels} component label(s), ${definitions.rows.filter((row) => row.sourceKind === 'erb-derived-definition').length} merged definition row(s).`,
);
