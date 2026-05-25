import { assertGate, effectLedgerPath, readJson } from './source_effect_utils.mjs';

const root = process.cwd();
const gateName = 'gate:source-effect-review';
const milestone = process.argv[2];

assertGate(gateName, /^M\d+(?:\.5)?$/.test(milestone ?? ''), 'milestone argument is required');

const ledger = readJson(root, effectLedgerPath(milestone));
const queue = readJson(root, `data/coverage/source-effects/${milestone}.review-queue.json`);
assertGate(gateName, ledger, `source-effect ledger missing for ${milestone}`);
assertGate(gateName, queue, `source-effect review queue missing for ${milestone}`);
assertGate(gateName, queue.schemaVersion === 'source-effect-review-queue/v1', 'invalid review queue schema');
assertGate(gateName, queue.milestone === milestone, 'review queue milestone mismatch', queue.milestone);

const ledgerIds = new Set((ledger.effects ?? []).map((row) => row.effectId));
const groupCounts = new Map();
for (const group of queue.reviewGroups ?? []) {
  assertGate(gateName, group.reviewGroupId, 'review group missing id', group);
  assertGate(gateName, Array.isArray(group.effectIds) && group.effectIds.length > 0, 'review group missing effectIds', group);
  for (const effectId of group.effectIds) {
    groupCounts.set(effectId, (groupCounts.get(effectId) ?? 0) + 1);
  }
}

const missing = [...ledgerIds].filter((effectId) => !groupCounts.has(effectId));
const extra = [...groupCounts.keys()].filter((effectId) => !ledgerIds.has(effectId));
const duplicated = [...groupCounts.entries()].filter(([, count]) => count !== 1);

assertGate(gateName, missing.length === 0, 'source effects missing from review queue', missing.slice(0, 30));
assertGate(gateName, extra.length === 0, 'review queue contains unknown effect ids', extra.slice(0, 30));
assertGate(gateName, duplicated.length === 0, 'source effects appear in multiple review groups', duplicated.slice(0, 30));

console.log(
  `${gateName} passed: ${milestone} groups=${queue.reviewGroups.length}, effects=${ledger.effects.length}.`,
);
