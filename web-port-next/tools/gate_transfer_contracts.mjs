import fs from 'node:fs';
import path from 'node:path';
import { assertGate, effectLedgerPath, readJson } from './source_effect_utils.mjs';

const root = process.cwd();
const gateName = 'gate:transfer-contracts';
const milestone = process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : '';

const contracts = readJson(root, 'data/coverage/source-effects/transfers.json', {
  schemaVersion: 'source-effect-transfers/v1',
  transfers: [],
});
assertGate(gateName, contracts.schemaVersion === 'source-effect-transfers/v1', 'invalid transfer schema');
assertGate(gateName, Array.isArray(contracts.transfers), 'transfer list missing');

const transferById = new Map();
for (const transfer of contracts.transfers) {
  assertGate(gateName, transfer.transferId, 'transfer missing transferId', transfer);
  assertGate(gateName, !transferById.has(transfer.transferId), 'duplicate transferId', transfer);
  transferById.set(transfer.transferId, transfer);
}

const ledgerDir = path.join(root, 'data/coverage/source-effects');
const ledgers = milestone
  ? [readJson(root, effectLedgerPath(milestone))]
  : fs.existsSync(ledgerDir)
    ? fs
        .readdirSync(ledgerDir)
        .filter((file) => file.endsWith('.effects.json'))
        .map((file) => readJson(root, `data/coverage/source-effects/${file}`))
    : [];

if (milestone) {
  assertGate(gateName, ledgers[0], `source-effect ledger missing for ${milestone}`);
}

const badTransfers = [];
for (const ledger of ledgers.filter(Boolean)) {
  for (const row of ledger.effects ?? []) {
    if (row.status !== 'transferred') continue;
    const transfer = transferById.get(row.transferId);
    if (
      !transfer ||
      transfer.fromMilestone !== ledger.milestone ||
      transfer.sourceEffectId !== row.effectId ||
      !transfer.toMilestone ||
      !transfer.receiverEvidence ||
      !transfer.senderObligation ||
      transfer.status !== 'accepted'
    ) {
      badTransfers.push({ effectId: row.effectId, transferId: row.transferId, transfer });
    }
  }
}

assertGate(gateName, badTransfers.length === 0, 'transferred source effects lack accepted sender/receiver contract', {
  count: badTransfers.length,
  sample: badTransfers.slice(0, 30),
});

console.log(`${gateName} passed: checked ${ledgers.filter(Boolean).length} source-effect ledger(s).`);
