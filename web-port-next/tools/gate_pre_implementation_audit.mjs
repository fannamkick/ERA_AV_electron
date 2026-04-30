import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));
}

function fail(message, detail) {
  console.error(`gate:pre-implementation-audit failed: ${message}`);
  if (detail) {
    console.error(JSON.stringify(detail, null, 2));
  }
  process.exit(1);
}

function assert(condition, message, detail) {
  if (!condition) fail(message, detail);
}

const report = readJson('data/coverage/audits/pre-implementation-gap-audit.json');

assert(report.schemaVersion === 'pre-implementation-gap-audit/v1', 'invalid audit schema version');
assert(report.summary, 'summary is missing');
assert(report.issues, 'issues are missing');
assert(Array.isArray(report.sourceFileReviewRows), 'source file review rows are missing');
assert(Array.isArray(report.implementationReviewRows), 'implementation review rows are missing');
assert(Array.isArray(report.ownerMilestonePlan), 'owner milestone plan is missing');

const unresolvedIssues = report.summary.unresolvedIssues ?? {};
const unresolved = Object.entries(unresolvedIssues).filter(([key, value]) => key !== 'total' && Number(value) > 0);
assert(unresolved.length === 0, 'unresolved audit issues exist', {
  unresolvedIssues,
  samples: report.issues,
});
assert(Number(unresolvedIssues.total ?? 0) === 0, 'unresolved issue total is not zero', unresolvedIssues);

const allowedOwnerMilestones = new Set([
  'M27',
  'M28',
  'M29',
  'M30',
  'M31',
  'M32',
  'M33',
  'M34',
  'M35',
  'M36',
  'M37',
  'M38',
  'M39',
  'M40',
  'M41',
  'M42',
  'M43',
  'M44',
  'M45',
  'M46',
  'M47',
  'M48',
  'M49',
  'M50',
]);

const reviewRows = report.implementationReviewRows;
const badOwnerRows = reviewRows.filter((row) => !allowedOwnerMilestones.has(row.implementationOwnerMilestone));
assert(badOwnerRows.length === 0, 'review rows have invalid implementation owner milestones', badOwnerRows.slice(0, 20));

const missingVerificationRows = reviewRows.filter((row) => !row.verificationCommand || !row.closureRule);
assert(missingVerificationRows.length === 0, 'review rows are missing closure rule or verification command', missingVerificationRows.slice(0, 20));

const sourceFileRowsWithoutQueue = report.sourceFileReviewRows.filter(
  (row) => !row.implementationOwnerMilestone || !row.closureRule || !row.verificationCommand,
);
assert(
  sourceFileRowsWithoutQueue.length === 0,
  'source files without direct coverage rows must be queued for M27 review or an implementation owner',
  sourceFileRowsWithoutQueue.slice(0, 20),
);

const expectedReviewRows =
  Number(report.summary.sourceFilesWithoutDirectCoverageRows ?? 0) +
  Number(report.summary.implementationReviewByKind?.feature ?? 0) +
  Number(report.summary.implementationReviewByKind?.definition ?? 0) +
  Number(report.summary.implementationReviewByKind?.['save-mapping'] ?? 0) +
  Number(report.summary.implementationReviewByKind?.['session-mapping'] ?? 0);
assert(
  expectedReviewRows === Number(report.summary.implementationReviewRows ?? -1),
  'implementation review count summary is inconsistent',
  { expectedReviewRows, summaryReviewRows: report.summary.implementationReviewRows },
);

console.log(
  `gate:pre-implementation-audit passed: ${report.summary.implementationReviewRows} review row(s), ${report.summary.sourceFilesWithoutDirectCoverageRows} source file review row(s), 0 unresolved issue(s).`,
);
