import { assertGate, effectLedgerPath, readJson } from './source_effect_utils.mjs';

const root = process.cwd();
const gateName = 'gate:source-effect-closure';
const milestone = process.argv[2];

assertGate(gateName, /^M\d+(?:\.5)?$/.test(milestone ?? ''), 'milestone argument is required');

const ledger = readJson(root, effectLedgerPath(milestone));
assertGate(gateName, ledger, `source-effect ledger missing for ${milestone}`);
assertGate(gateName, ledger.schemaVersion === 'source-effect-ledger/v1', 'invalid source-effect schema', ledger?.schemaVersion);

const rows = ledger.effects ?? [];
const unclassified = rows.filter((row) => row.status === 'unclassified');
const blocked = rows.filter((row) => row.status === 'blocked');
const ownedWithoutEvidence = rows.filter(
  (row) =>
    (row.status === 'owned' || row.status === 'implemented') &&
    ((row.implementationEvidence ?? []).length === 0 || (row.runtimeTraceEvidence ?? []).length === 0),
);
const transferredWithoutContract = rows.filter((row) => row.status === 'transferred' && !row.transferId);
const excludedWithoutReason = rows.filter((row) => row.status === 'excluded' && !row.exclusionReason);

assertGate(gateName, unclassified.length === 0, 'unclassified source effects remain', unclassified.slice(0, 30));
assertGate(gateName, blocked.length === 0, 'blocked source effects remain', blocked.slice(0, 30));
assertGate(gateName, ownedWithoutEvidence.length === 0, 'owned effects lack implementation or runtime trace evidence', {
  count: ownedWithoutEvidence.length,
  sample: ownedWithoutEvidence.slice(0, 30),
});
assertGate(gateName, transferredWithoutContract.length === 0, 'transferred effects lack transferId', {
  count: transferredWithoutContract.length,
  sample: transferredWithoutContract.slice(0, 30),
});
assertGate(gateName, excludedWithoutReason.length === 0, 'excluded effects lack exclusionReason', {
  count: excludedWithoutReason.length,
  sample: excludedWithoutReason.slice(0, 30),
});

console.log(`${gateName} passed: ${milestone} source effects closed=${rows.length}.`);
