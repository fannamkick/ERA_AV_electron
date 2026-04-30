import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));
}

function fail(message, detail) {
  console.error(`gate:coverage-crosscheck failed: ${message}`);
  if (detail) {
    console.error(JSON.stringify(detail, null, 2));
  }
  process.exit(1);
}

function assert(condition, message, detail) {
  if (!condition) fail(message, detail);
}

const report = readJson('data/coverage/coverage-crosscheck.json');

assert(report.schemaVersion === 'coverage-crosscheck/v1', 'invalid coverage crosscheck schema version');
assert(report.assertions?.hardFailures, 'hard failure summary is missing');

const hardFailures = report.assertions.hardFailures;
const failing = Object.entries(hardFailures).filter(([key, value]) => key !== 'total' && value > 0);

assert(failing.length === 0, 'crosscheck hard failures exist', {
  failures: Object.fromEntries(failing),
  samples: report.samples
});

console.log(
  `gate:coverage-crosscheck passed: ${report.summary.featureRows} feature row(s), ${report.summary.definitionRows} definition row(s), ${report.summary.blockerRows} blocker row(s). Deferred tracked read gaps: ${report.assertions.trackedDeferredUntilOwnerMilestone.implementedFeatureDefinitionReadUnmatched.count}.`,
);
