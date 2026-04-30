import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

const PERSISTENT_FAMILIES = new Set([
  'DAY',
  'TIME',
  'MONEY',
  'FLAG',
  'GLOBAL',
  'GLOBALS',
  'PBAND',
  'BASE',
  'MAXBASE',
  'ABL',
  'TALENT',
  'EXP',
  'MARK',
  'PALAM',
  'EX',
  'CFLAG',
  'JUEL',
  'STAIN',
  'GOTJUEL',
  'CSTR',
  'RELATION',
  'ITEM',
  'ITEMSALES',
  'BOUGHT',
  'NOITEM',
  'EQUIP',
  'ISASSI',
  'CHARASALES',
]);

const SEMANTIC_FLAG_FAMILIES = new Set(['CFLAG', 'FLAG', 'GLOBAL', 'GLOBALS', 'PBAND']);

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));
}

function readTsv(relativePath) {
  const raw = fs.readFileSync(path.join(root, relativePath), 'utf8').replace(/^\uFEFF/, '');
  const [headerLine, ...lines] = raw.split(/\r?\n/).filter((line) => line.length > 0);
  const headers = headerLine.split('\t');
  return lines.map((line) => {
    const cells = line.split('\t');
    return Object.fromEntries(headers.map((header, index) => [header, cells[index] ?? '']));
  });
}

function fail(message, detail) {
  console.error(`gate:state-family-index-coverage failed: ${message}`);
  if (detail) console.error(JSON.stringify(detail, null, 2));
  process.exit(1);
}

function assert(condition, message, detail) {
  if (!condition) fail(message, detail);
}

function countBy(rows, keyFn) {
  const result = {};
  for (const row of rows) {
    const key = keyFn(row) || '(empty)';
    result[key] = (result[key] ?? 0) + 1;
  }
  return Object.fromEntries(Object.entries(result).sort(([a], [b]) => a.localeCompare(b)));
}

const sourceInventory = readJson('data/legacy-mapping/source-addresses.json');
const audit = readJson('data/legacy-state-scan/erb-state-audit.json');
const slotCandidates = readTsv('data/legacy-state-scan/erb-slot-candidates.tsv');
const saveMapping = readJson('data/coverage/save-mapping.json');

const sourceSaveRows = sourceInventory.addresses.filter((row) => row.mappingAction === 'map-save-state');
const sourceSaveAddresses = new Set(sourceSaveRows.map((row) => row.address));
const mappedSourceAddresses = new Set(saveMapping.rows.map((row) => row.address));

const missingSourceRows = sourceSaveRows.filter((row) => !mappedSourceAddresses.has(row.address));
const extraMappedRows = saveMapping.rows.filter((row) => !sourceSaveAddresses.has(row.address));
assert(missingSourceRows.length === 0, 'map-save-state source rows missing from save mapping', missingSourceRows.slice(0, 20));
assert(extraMappedRows.length === 0, 'save mapping has rows outside map-save-state source action', extraMappedRows.slice(0, 20));

const duplicateAddresses = saveMapping.rows
  .map((row) => row.address)
  .filter((address, index, values) => values.indexOf(address) !== index);
assert(duplicateAddresses.length === 0, 'duplicate source addresses in save mapping', duplicateAddresses.slice(0, 20));

const persistentCandidates = slotCandidates.filter((row) => PERSISTENT_FAMILIES.has(row.family));
const persistentCandidateIds = new Set(persistentCandidates.map((row) => row.candidate));
const mappedPersistentIds = new Set(saveMapping.persistentCandidateCoverage.map((row) => row.candidate));

const missingPersistent = persistentCandidates.filter((row) => !mappedPersistentIds.has(row.candidate));
const extraPersistent = saveMapping.persistentCandidateCoverage.filter((row) => !persistentCandidateIds.has(row.candidate));
assert(missingPersistent.length === 0, 'persistent ERB candidates missing from save mapping coverage', missingPersistent.slice(0, 20));
assert(extraPersistent.length === 0, 'save mapping persistent coverage has extra candidates', extraPersistent.slice(0, 20));
assert(persistentCandidates.length === audit.summary.runtimePersistentNumericSlots, 'persistent candidate count must match audit summary', {
  expected: audit.summary.runtimePersistentNumericSlots,
  actual: persistentCandidates.length,
});

const missingSourceAddressCandidates = saveMapping.persistentCandidateCoverage.filter(
  (row) => row.sourceMappingAction === 'missing-source-address',
);
assert(missingSourceAddressCandidates.length === 0, 'persistent candidates missing source address inventory rows', {
  examples: missingSourceAddressCandidates.slice(0, 20),
});

const legacyMappedRows = saveMapping.rows.filter(
  (row) => row.status === 'mapped' && (row.runtimeOwner === 'legacy-adapter' || String(row.fieldPath).startsWith('legacy.')),
);
assert(legacyMappedRows.length === 0, 'mapped save rows cannot remain in legacy-adapter ownership', legacyMappedRows.slice(0, 20));

const sourceRowsWithNeedsIndexMapping = sourceSaveRows.filter((row) => row.familyStatus === 'needsIndexMapping');
const stillNeedsIndexMapping = saveMapping.rows.filter(
  (row) =>
    row.status === 'mapped' &&
    sourceRowsWithNeedsIndexMapping.some((sourceRow) => sourceRow.address === row.address) &&
    row.fieldPath.includes('legacy.'),
);
assert(stillNeedsIndexMapping.length === 0, 'needsIndexMapping rows still have unresolved owner paths', {
  examples: stillNeedsIndexMapping.slice(0, 20),
});

const semanticRows = saveMapping.rows.filter((row) => SEMANTIC_FLAG_FAMILIES.has(row.family) && row.status === 'mapped');
const semanticInvalid = semanticRows.filter(
  (row) =>
    !row.index ||
    row.semanticOwnerSource !== 'index-evidence-rule' ||
    !row.fieldPath.includes(`flag_${String(row.index).replace(/[^A-Za-z0-9_-]/g, '_')}`),
);
assert(semanticInvalid.length === 0, 'semantic flag family rows must be index-specific', semanticInvalid.slice(0, 20));

const semanticOwnerCounts = countBy(semanticRows, (row) => `${row.family}:${row.runtimeOwner}`);
const ownersByFamily = new Map();
for (const row of semanticRows) {
  if (!ownersByFamily.has(row.family)) ownersByFamily.set(row.family, new Set());
  ownersByFamily.get(row.family).add(row.runtimeOwner);
}

const minimumOwnerCounts = {
  CFLAG: 5,
  FLAG: 5,
  GLOBAL: 2,
  PBAND: 2,
};

const insufficientSemanticSplit = Object.entries(minimumOwnerCounts).filter(
  ([family, minimum]) => (ownersByFamily.get(family)?.size ?? 0) < minimum,
);
assert(insufficientSemanticSplit.length === 0, 'semantic flag families are not split across enough owners', {
  minimumOwnerCounts,
  actual: Object.fromEntries([...ownersByFamily].map(([family, owners]) => [family, owners.size])),
  semanticOwnerCounts,
});

const itemSalesCandidates = saveMapping.persistentCandidateCoverage.filter((row) => row.family === 'ITEMSALES');
const exCandidates = saveMapping.persistentCandidateCoverage.filter((row) => row.family === 'EX');
const gotJuelCandidates = saveMapping.persistentCandidateCoverage.filter((row) => row.family === 'GOTJUEL');
for (const [family, rows] of [
  ['ITEMSALES', itemSalesCandidates],
  ['EX', exCandidates],
  ['GOTJUEL', gotJuelCandidates],
]) {
  const invalid = rows.filter((row) => row.status !== 'session-state' || row.fieldPath);
  assert(invalid.length === 0, `${family} persistent-family candidates must be reclassified as session-state`, {
    examples: invalid.slice(0, 20),
  });
}

const unresolvedAfterM24 = saveMapping.persistentCandidateCoverage.filter((row) =>
  ['blocker', 'needsDecision', 'missingMapping'].includes(row.status),
);
assert(unresolvedAfterM24.length === 0, 'persistent candidates remain unresolved after M24', unresolvedAfterM24.slice(0, 20));

console.log(
  `gate:state-family-index-coverage passed: ${sourceSaveRows.length} source save row(s), ${persistentCandidates.length} persistent candidate row(s), semantic owners ${semanticRows.length} row(s).`,
);
