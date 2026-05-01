import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));
}

function fail(message, detail) {
  console.error(`gate:main-route-coverage failed: ${message}`);
  if (detail) {
    console.error(JSON.stringify(detail, null, 2));
  }
  process.exit(1);
}

function assert(condition, message, detail) {
  if (!condition) fail(message, detail);
}

const validRoutes = new Set([
  'boot',
  'newGame',
  'mainMenu',
  'itemShop',
  'mission',
  'recruit',
  'visit',
  'work',
  'shooting',
  'roster',
  'wardrobe',
  'training',
  'result',
  'saveLoad',
]);

const expectedMenuCodes = [
  '100',
  '101',
  '102',
  '103',
  '104',
  '105',
  '108',
  '109',
  '111',
  '112',
  '113',
  '115',
  '116',
  '120',
  '150',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '750',
  '888',
  '8826',
];

const queue = readJson('data/coverage/implementation-queue.json');
const coverage = readJson('data/coverage/main-route-coverage.json');
const gapAudit = readJson('data/coverage/audits/M28-gap-audit.json');

assert(coverage.schemaVersion === 'main-route-coverage/v1', 'invalid schema version');
assert(coverage.milestone === 'M28', 'coverage milestone must be M28');
assert(Array.isArray(coverage.menuRows), 'menuRows missing');
assert(Array.isArray(coverage.sessionRows), 'sessionRows missing');
assert(Array.isArray(coverage.unresolvedIssues), 'unresolvedIssues missing');
assert(gapAudit.schemaVersion === 'milestone-gap-audit/v1', 'invalid M28 gap audit schema version');
assert(gapAudit.milestone === 'M28', 'M28 gap audit milestone mismatch');

const m28Unit = (queue.queueUnits ?? []).find((unit) => unit.unitId === 'unit:M28:main-route');
assert(m28Unit, 'M28 implementation queue unit not found');

const expectedRowRefs = new Set(m28Unit.rowRefs ?? []);
const accountedRowRefs = new Map();
for (const row of [...coverage.menuRows, ...coverage.sessionRows]) {
  assert(row.reviewId, 'coverage row missing reviewId', row);
  accountedRowRefs.set(row.reviewId, (accountedRowRefs.get(row.reviewId) ?? 0) + 1);
}

const missingRowRefs = [...expectedRowRefs].filter((rowRef) => !accountedRowRefs.has(rowRef)).sort();
const extraRowRefs = [...accountedRowRefs.keys()].filter((rowRef) => !expectedRowRefs.has(rowRef)).sort();
const duplicateRowRefs = [...accountedRowRefs.entries()].filter(([, count]) => count !== 1);
assert(missingRowRefs.length === 0, 'M28 queue rowRefs missing from main route coverage', missingRowRefs);
assert(extraRowRefs.length === 0, 'main route coverage includes rowRefs outside M28 queue', extraRowRefs);
assert(duplicateRowRefs.length === 0, 'main route coverage rowRefs are duplicated', duplicateRowRefs);

assert(coverage.menuRows.length === 24, 'M28 must account 24 main menu option rows', coverage.summary);
assert(coverage.sessionRows.length === 3, 'M28 must account 3 session mapping rows', coverage.summary);
assert(coverage.unresolvedIssues.length === 0, 'M28 coverage has unresolved issues', coverage.unresolvedIssues);
assert(Number(gapAudit.summary?.unresolvedGaps ?? -1) === 0, 'M28 gap audit has unresolved gaps', gapAudit.summary);

const actualMenuCodes = coverage.menuRows.map((row) => row.menuCode);
const missingMenuCodes = expectedMenuCodes.filter((code) => !actualMenuCodes.includes(code));
const extraMenuCodes = actualMenuCodes.filter((code) => !expectedMenuCodes.includes(code));
assert(missingMenuCodes.length === 0, 'expected main menu codes missing', missingMenuCodes);
assert(extraMenuCodes.length === 0, 'unexpected main menu codes present', extraMenuCodes);

const badEnabledRows = coverage.menuRows.filter(
  (row) =>
    row.defaultEnabled !== true ||
    row.completionStatus !== 'implemented-enabled-route' ||
    !row.actionId ||
    !row.routeId ||
    !validRoutes.has(row.routeId) ||
    !row.runtimeConsumerId ||
    !row.viewConsumer ||
    !row.actionConsumer ||
    !row.routeConsumer ||
    !row.verificationId,
);
const badDisabledRows = coverage.menuRows.filter(
  (row) =>
    row.defaultEnabled === false &&
    (row.completionStatus !== 'implemented-disabled-route-contract' ||
      row.actionId ||
      row.routeId ||
      !row.disabledReason ||
      !row.destinationOwnerMilestone ||
      !row.runtimeConsumerId ||
      !row.viewConsumer ||
      !row.verificationId),
);
const incorrectlyClassifiedEnabled = badEnabledRows.filter((row) => row.defaultEnabled === true);
assert(incorrectlyClassifiedEnabled.length === 0, 'enabled menu rows are missing action/route/consumer/verification', incorrectlyClassifiedEnabled);
assert(badDisabledRows.length === 0, 'disabled menu rows are missing future owner or disabled reason', badDisabledRows);

const missingEvidenceRows = coverage.menuRows.filter((row) => !row.sourceEvidenceId || !row.sourcePath || !row.sourceDefinitionRowId);
assert(missingEvidenceRows.length === 0, 'menu rows missing source evidence', missingEvidenceRows.slice(0, 20));

const badSessionTransfers = coverage.sessionRows.filter(
  (row) =>
    row.completionStatus !== 'transferred-out' ||
    row.fromMilestone !== 'M28' ||
    !row.toMilestone ||
    row.acceptedByOwner !== true ||
    !row.transferReason ||
    !row.sourceEvidenceId ||
    !row.sourceMappingRowId ||
    !row.verificationId,
);
assert(badSessionTransfers.length === 0, 'session transfer rows are incomplete', badSessionTransfers);

const summary = coverage.summary ?? {};
assert(Number(summary.queueRowRefs) === expectedRowRefs.size, 'summary queue row count mismatch', summary);
assert(Number(summary.menuRows) === coverage.menuRows.length, 'summary menu row count mismatch', summary);
assert(Number(summary.sessionRows) === coverage.sessionRows.length, 'summary session row count mismatch', summary);
assert(Number(summary.ownedBlocker) === 0, 'M28 must not close with owned blockers', summary);

console.log(
  `gate:main-route-coverage passed: ${coverage.menuRows.length} menu row(s), ${coverage.sessionRows.length} transferred session row(s), ${coverage.unresolvedIssues.length} unresolved issue(s).`,
);
