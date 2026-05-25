import { assertGate, effectLedgerPath, readJson } from './source_effect_utils.mjs';

const root = process.cwd();
const gateName = 'gate:source-effect-inventory';
const milestone = process.argv[2];

assertGate(gateName, /^M\d+(?:\.5)?$/.test(milestone ?? ''), 'milestone argument is required');

const ledger = readJson(root, effectLedgerPath(milestone));
assertGate(gateName, ledger, `source-effect ledger missing for ${milestone}`);
assertGate(gateName, ledger.schemaVersion === 'source-effect-ledger/v1', 'invalid source-effect schema', ledger?.schemaVersion);
assertGate(gateName, ledger.milestone === milestone, 'ledger milestone mismatch', {
  requested: milestone,
  actual: ledger.milestone,
});
assertGate(gateName, Array.isArray(ledger.sources) && ledger.sources.length > 0, 'ledger has no source files');
assertGate(gateName, Array.isArray(ledger.effects), 'ledger effects missing');

const ids = new Set();
const badRows = [];
for (const row of ledger.effects) {
  if (
    !row.effectId ||
    ids.has(row.effectId) ||
    !row.sourcePath ||
    !Number.isInteger(row.sourceLine) ||
    row.sourceLine <= 0 ||
    typeof row.raw !== 'string' ||
    !/^[a-f0-9]{64}$/.test(row.sourceSha256 ?? '') ||
    !row.kind ||
    !row.status
  ) {
    badRows.push(row);
  }
  ids.add(row.effectId);
}

assertGate(gateName, badRows.length === 0, 'effect rows missing verifiable source identity', badRows.slice(0, 20));
assertGate(gateName, ids.size === ledger.effects.length, 'duplicate effectId values found');

const sourceHashes = new Map((ledger.sources ?? []).map((source) => [source.sourcePath, source.sourceSha256]));
const hashMismatches = ledger.effects.filter((row) => sourceHashes.get(row.sourcePath) !== row.sourceSha256);
assertGate(gateName, hashMismatches.length === 0, 'row sourceSha256 does not match source table', hashMismatches.slice(0, 20));

console.log(
  `${gateName} passed: ${milestone} effects=${ledger.effects.length}, unclassified=${ledger.summary?.byStatus?.unclassified ?? 0}.`,
);
