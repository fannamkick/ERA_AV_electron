import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const milestone = process.argv[2];

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));
}

function fileExists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function fail(message, detail) {
  console.error(`gate:milestone-scope-closure failed: ${message}`);
  if (detail) {
    console.error(JSON.stringify(detail, null, 2));
  }
  process.exit(1);
}

function assert(condition, message, detail) {
  if (!condition) fail(message, detail);
}

assert(
  /^M\d+(?:\.5)?$/.test(milestone ?? ''),
  'milestone argument is required, for example: npm run gate:milestone-scope-closure -- M28',
);

const closure = readJson(`data/coverage/milestones/${milestone}-closure.json`);
assert(closure.schemaVersion === 'milestone-closure/v1', 'invalid closure schema version');
assert(closure.milestone === milestone, 'closure milestone does not match requested milestone', {
  requested: milestone,
  actual: closure.milestone,
});
assert(closure.status === 'completed', 'closure status must be completed before gate passes', closure.status);
assert(closure.commitPolicy, 'closure must record commit policy');
assert(closure.outputs && Object.keys(closure.outputs).length > 0, 'closure must record output artifacts');

const metrics = closure.closureMetrics ?? closure.counts;
assert(metrics, 'closure must include closureMetrics or counts');

const requiredNumericFields = [
  'ownedTotal',
  'implemented',
  'mapped',
  'approvedExcluded',
  'transferredOut',
  'ownedBlocker',
  'missingEvidence',
  'missingConsumer',
  'missingVerification',
  'roleOnlyComplete',
  'unapprovedExcluded',
];

for (const field of requiredNumericFields) {
  assert(Number.isInteger(metrics[field]), `closure metric ${field} must be an integer`, metrics);
}

const closedTotal = metrics.implemented + metrics.mapped + metrics.approvedExcluded + metrics.transferredOut;
assert(metrics.ownedTotal === closedTotal, 'ownedTotal must equal implemented + mapped + approvedExcluded + transferredOut', {
  ownedTotal: metrics.ownedTotal,
  closedTotal,
  metrics,
});

const blockers = [
  'ownedBlocker',
  'missingEvidence',
  'missingConsumer',
  'missingVerification',
  'roleOnlyComplete',
  'unapprovedExcluded',
].filter((field) => metrics[field] !== 0);
assert(blockers.length === 0, 'closure has blocking metrics above zero', {
  blockingFields: blockers,
  metrics,
});

const commands = closure.commandsRun ?? closure.verification?.commands;
assert(Array.isArray(commands) && commands.length > 0, 'closure must list commandsRun or verification.commands');
assert(commands.includes('npm run build'), 'closure verification must include npm run build', commands);

if (fileExists('data/coverage/coverage-gate-registry.json')) {
  const registry = readJson('data/coverage/coverage-gate-registry.json');
  const packageJson = readJson('package.json');
  const contract = registry.milestoneContracts?.find((row) => row.milestone === milestone);
  if (contract) {
    const missingScripts = (contract.requiredScripts ?? []).filter((scriptName) => !packageJson.scripts?.[scriptName]);
    assert(missingScripts.length === 0, 'closure registry contract has missing package scripts', {
      milestone,
      missingScripts,
    });
    const missingRequiredGate = (contract.blockingGates ?? []).filter((gateCommand) => {
      if (gateCommand.startsWith('gate:milestone-scope-closure')) return false;
      return !commands.some((command) => command === `npm run ${gateCommand}` || command.startsWith(`npm run ${gateCommand} `));
    });
    assert(missingRequiredGate.length === 0, 'closure commandsRun missing registry blocking gates', {
      milestone,
      missingRequiredGate,
      commands,
    });
  }
}

console.log(
  `gate:milestone-scope-closure passed: ${milestone} owned=${metrics.ownedTotal}, implemented=${metrics.implemented}, transferredOut=${metrics.transferredOut}.`,
);
