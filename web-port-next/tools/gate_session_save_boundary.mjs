import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

const RESULT_BUFFER_FAMILIES = new Set(['SOURCE', 'UP', 'DOWN', 'LOSEBASE', 'NOWEX', 'EJAC', 'EX', 'GOTJUEL']);
const SCRATCH_ONLY_FAMILIES = new Set(['TFLAG', 'TCVAR', 'SAVESTR', 'TSTR']);
const RAW_SESSION_NAMES = /\b(TFLAG|TEQUIP|SOURCE|UP|DOWN|LOSEBASE|NOWEX|EJAC|ITEMSALES|BOUGHT|GOTJUEL)\b/;

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));
}

function fail(message, detail) {
  console.error(`gate:session-save-boundary failed: ${message}`);
  if (detail) console.error(JSON.stringify(detail, null, 2));
  process.exit(1);
}

function assert(condition, message, detail) {
  if (!condition) fail(message, detail);
}

const sessionMapping = readJson('data/coverage/session-mapping.json');
const saveMapping = readJson('data/coverage/save-mapping.json');

assert(sessionMapping.schemaVersion === 'session-mapping/v1', 'invalid session mapping schema version');
assert(saveMapping.schemaVersion === 'save-mapping/v1', 'invalid save mapping schema version');

const saveFieldPaths = new Set(saveMapping.rows.filter((row) => row.status === 'mapped').map((row) => row.fieldPath));
const saveMappedAddresses = new Set(saveMapping.rows.filter((row) => row.status === 'mapped').map((row) => row.address));
const sessionAddresses = new Set(sessionMapping.rows.map((row) => row.address));

const directSavePolicyRows = sessionMapping.rows.filter((row) => row.savePayloadPolicy !== 'never-save-directly');
assert(directSavePolicyRows.length === 0, 'all session rows must be never-save-directly', directSavePolicyRows.slice(0, 20));

const directSavePathRows = sessionMapping.rows.filter(
  (row) =>
    saveFieldPaths.has(row.sessionFieldPath) ||
    saveFieldPaths.has(row.calculationPath) ||
    /^(save|state|gameState|economy|inventory|people|body|social|mission|work|filming|world|meta)\./i.test(
      row.sessionFieldPath || '',
    ),
);
assert(directSavePathRows.length === 0, 'session/calculation paths cannot point at save domains', {
  examples: directSavePathRows.slice(0, 20),
});

const overlapMappedAddresses = sessionMapping.rows.filter((row) => saveMappedAddresses.has(row.address));
assert(overlapMappedAddresses.length === 0, 'same source address cannot be both mapped save field and session row', {
  examples: overlapMappedAddresses.slice(0, 20),
});

const m24TransferredSessionCandidates = saveMapping.persistentCandidateCoverage.filter((row) => row.status === 'session-state');
const missingTransferredCandidates = m24TransferredSessionCandidates.filter((row) => !sessionAddresses.has(row.candidate));
assert(missingTransferredCandidates.length === 0, 'M24 session-state transfers must be represented in M25 session mapping', {
  examples: missingTransferredCandidates.slice(0, 20),
});

const transferredStillSaveMapped = m24TransferredSessionCandidates.filter((row) => saveMappedAddresses.has(row.candidate));
assert(transferredStillSaveMapped.length === 0, 'M24 session-state transfers cannot remain save mapped', {
  examples: transferredStillSaveMapped.slice(0, 20),
});

const resultBuffersWithoutCommit = sessionMapping.rows.filter(
  (row) =>
    row.status === 'calculation-internal' &&
    RESULT_BUFFER_FAMILIES.has(row.family) &&
    !SCRATCH_ONLY_FAMILIES.has(row.family) &&
    (!Array.isArray(row.committedResultPaths) || row.committedResultPaths.length === 0),
);
assert(resultBuffersWithoutCommit.length === 0, 'result calculation buffers require committed result path documentation', {
  examples: resultBuffersWithoutCommit.slice(0, 20),
});

const scratchRowsWithSaveCommit = sessionMapping.rows.filter(
  (row) => SCRATCH_ONLY_FAMILIES.has(row.family) && Array.isArray(row.committedResultPaths) && row.committedResultPaths.length > 0,
);
assert(scratchRowsWithSaveCommit.length === 0, 'scratch-only rows cannot commit directly to save paths', {
  examples: scratchRowsWithSaveCommit.slice(0, 20),
});

const sessionFieldsNotCleared = sessionMapping.rows.filter(
  (row) => row.status === 'session-field' && !/clear|discard|leav|exit|return|completion|cancel|reset/i.test(row.disposedAt),
);
assert(sessionFieldsNotCleared.length === 0, 'session fields require explicit disposal lifecycle', {
  examples: sessionFieldsNotCleared.slice(0, 20),
});

const calculationRowsNotTemporary = sessionMapping.rows.filter(
  (row) =>
    row.status === 'calculation-internal' &&
    !/not retained|intermediate|scratch|temporary|returns/i.test(`${row.disposedAt} ${row.notes}`),
);
assert(calculationRowsNotTemporary.length === 0, 'calculation rows must state that intermediate values are discarded', {
  examples: calculationRowsNotTemporary.slice(0, 20),
});

const rawCopiedPaths = sessionMapping.rows.filter((row) =>
  [row.sessionFieldPath, row.calculationPath, row.sessionOwner, row.calculationOwner]
    .filter(Boolean)
    .some((value) => RAW_SESSION_NAMES.test(String(value))),
);
assert(rawCopiedPaths.length === 0, 'session/save boundary cannot use raw ERB names as runtime paths', {
  examples: rawCopiedPaths.slice(0, 20),
});

const candidateSaveLeaks = sessionMapping.runtimeSessionCandidateCoverage.filter(
  (row) => row.status === 'save-field' || row.savePayloadPolicy !== 'never-save-directly',
);
assert(candidateSaveLeaks.length === 0, 'runtime session candidates cannot be save-field rows', {
  examples: candidateSaveLeaks.slice(0, 20),
});

console.log(
  `gate:session-save-boundary passed: ${sessionMapping.rows.length} session row(s), ${m24TransferredSessionCandidates.length} M24 transfer row(s), ${saveMapping.rows.length} save row(s) crosschecked.`,
);
