import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));
}

function readText(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

function fail(message, detail) {
  console.error(`gate:training-session failed: ${message}`);
  if (detail) console.error(JSON.stringify(detail, null, 2));
  process.exit(1);
}

function assert(condition, message, detail) {
  if (!condition) fail(message, detail);
}

const queue = readJson('data/coverage/implementation-queue.json');
const coverage = readJson('data/coverage/training-session-coverage.json');
const gapAudit = readJson('data/coverage/audits/M40-gap-audit.json');
const trainingText = readText('src/features/training.ts');
const dispatchText = readText('src/game/dispatch.ts');
const actionsText = readText('src/game/actions.ts');
const viewsText = readText('src/game/views.ts');
const interactionTypesText = readText('src/domains/interaction/types.ts');
const routeScreensText = readText('src/ui/RouteScreens.tsx');
const smokeText = readText('tools/m40_training_session_smoke.ts');
const runtimeText = [trainingText, dispatchText, actionsText, viewsText, interactionTypesText, routeScreensText].join('\n');

assert(coverage.schemaVersion === 'training-session-coverage/v1', 'invalid schema version');
assert(coverage.milestone === 'M40', 'coverage milestone must be M40');
assert(Array.isArray(coverage.rows), 'coverage rows missing');
assert(Array.isArray(coverage.unresolvedIssues), 'unresolvedIssues missing');
assert(gapAudit.schemaVersion === 'milestone-gap-audit/v1', 'invalid M40 gap audit schema version');
assert(gapAudit.milestone === 'M40', 'M40 gap audit milestone mismatch');

const m40Units = (queue.queueUnits ?? []).filter((unit) => unit.ownerMilestone === 'M40');
assert(m40Units.length === 1, 'M40 must have exactly one implementation unit', m40Units.map((unit) => unit.unitId));

const expectedRefs = new Set();
for (const unit of m40Units) {
  for (const ref of unit.rowRefs ?? []) expectedRefs.add(ref);
}

const accountedRefs = new Map();
for (const row of coverage.rows) {
  assert(row.reviewId, 'coverage row missing reviewId', row);
  accountedRefs.set(row.reviewId, (accountedRefs.get(row.reviewId) ?? 0) + 1);
}

const missingRefs = [...expectedRefs].filter((ref) => !accountedRefs.has(ref)).sort();
const extraRefs = [...accountedRefs.keys()].filter((ref) => !expectedRefs.has(ref)).sort();
const duplicateRefs = [...accountedRefs.entries()].filter(([, count]) => count !== 1);
assert(missingRefs.length === 0, 'M40 owned refs missing from training session coverage', missingRefs);
assert(extraRefs.length === 0, 'training session coverage includes refs outside M40 owned scope', extraRefs);
assert(duplicateRefs.length === 0, 'training session coverage refs are duplicated', duplicateRefs);
assert(coverage.rows.length === expectedRefs.size, 'coverage row count must match M40 owned scope', coverage.summary);
assert(coverage.rows.length === 11, 'M40 must account 11 TRAIN_MAIN.ERB session rows', coverage.summary);
assert(coverage.unresolvedIssues.length === 0, 'M40 coverage has unresolved issues', coverage.unresolvedIssues);
assert(Number(gapAudit.summary?.unresolvedGaps ?? -1) === 0, 'M40 gap audit has unresolved gaps', gapAudit.summary);

const badClosedRows = coverage.rows.filter(
  (row) => !row.sourceEvidenceId || !row.runtimeConsumerId || !row.verificationId || !row.completionStatus,
);
assert(badClosedRows.length === 0, 'closed rows missing evidence, consumer, or verification', badClosedRows);

const featureRows = coverage.rows.filter((row) => row.rowKind === 'feature');
assert(featureRows.length === 11, 'M40 scope must only contain 11 feature rows', coverage.summary);
assert(
  featureRows.every((row) => row.sourcePath === 'original-game/ERB/指導関係/TRAIN_MAIN.ERB'),
  'M40 rows must be sourced from original TRAIN_MAIN.ERB',
  featureRows.map((row) => ({ reviewId: row.reviewId, sourcePath: row.sourcePath })),
);

for (const requiredLabel of [
  'EVENTTRAIN',
  'EVENTCOM',
  'EVENTCOMEND',
  'EVENTEND',
  'JUEL_CHECK',
  'SHOW_STATUS',
  'FIGURE_INDENT',
  'FIGURE_INDENT_SLASH',
]) {
  assert(featureRows.some((row) => row.sourceLabel === requiredLabel), `M40 coverage missing source label ${requiredLabel}`);
}

for (const requiredText of [
  'enterTraining',
  'createTrainingSession',
  'buildTrainingView',
  'computeVisibleTrainingCommandIds',
  'selectTrainingTarget',
  'selectTrainingExecutor',
  'selectTrainingAssistant',
  'selectTrainingCommand',
  'executeSelectedTraining',
  'cancelTrainingSelection',
  'cancelTraining',
  'clearTrainingCommandBuffers',
  'formatTrainingNumber',
  'trainingStatusSummary',
  'initialInteractionSessionState',
  'temporaryFlags',
  'temporaryEquipment',
  'assistantId',
  'assistantPlay',
  'formattedBodyCostTotal',
  'statusSummary',
  'training/selectAssistant',
  'training-command-unavailable',
]) {
  assert(runtimeText.includes(requiredText), `training session runtime missing required consumer: ${requiredText}`);
}

assert(
  /Object\.values\(definitions\.trainingCommands\)[\s\S]*\.map\(\(command\) => command\.id\)/u.test(trainingText),
  'computeVisibleTrainingCommandIds must derive candidates from every catalog training command',
);
assert(
  !/computeVisibleTrainingCommandIds[\s\S]{0,500}\.filter\(\(command\) => command\.defaultAvailable/u.test(trainingText),
  'M40 command candidate list must not filter out locked commands; M41 owns availability details',
);
assert(trainingText.includes("padStart(8, ' ')"), 'FIGURE_INDENT width-8 formatting must be implemented');
assert(trainingText.includes("timeSlotLabel: state.run.clock.currentTimeSlot === 0 ? '전반' : '후반'"), 'SHOW_STATUS TIME branch must be implemented');
assert(trainingText.includes('...interaction.resultBuffers'), 'EVENTCOM preview should use cleared result buffers');
assert(routeScreensText.includes("type: 'training/selectAssistant'"), 'Training screen must expose assistant selection action');
assert(routeScreensText.includes('selectedAssistant'), 'Training screen must display assistant selection state');

for (const requiredSmokeText of [
  'visibleCommands.length === 105',
  "formattedBodyCostTotal === '       7/      13'",
  'training-assistant-not-found',
  'training-command-unavailable',
  'temporaryFlags',
  'temporaryEquipment',
  'save payload should not include interaction session state',
  'training screen cancel should return to main menu',
]) {
  assert(smokeText.includes(requiredSmokeText), `M40 smoke missing required assertion: ${requiredSmokeText}`);
}

const badVerification = coverage.rows.filter((row) => row.verificationId !== 'smoke:training-session');
assert(badVerification.length === 0, 'M40 rows must be verified by smoke:training-session', badVerification);

const summary = coverage.summary ?? {};
assert(Number(summary.ownedRowRefs) === expectedRefs.size, 'summary owned row count mismatch', summary);
assert(Number(summary.rows) === coverage.rows.length, 'summary row count mismatch', summary);
assert(Number(summary.implemented) + Number(summary.mapped) === expectedRefs.size, 'implemented + mapped must close M40 scope', summary);
assert(Number(summary.ownedBlocker) === 0, 'M40 must not close with owned blockers', summary);
assert(Number(summary.missingEvidence) === 0, 'M40 must not close with missing evidence', summary);
assert(Number(summary.missingConsumer) === 0, 'M40 must not close with missing consumer', summary);
assert(Number(summary.missingVerification) === 0, 'M40 must not close with missing verification', summary);
assert(Number(summary.roleOnlyComplete) === 0, 'M40 must not close with role-only rows', summary);
assert(Number(summary.unapprovedExcluded) === 0, 'M40 must not close with unapproved exclusions', summary);

console.log(`gate:training-session passed: ${coverage.rows.length} M40 row(s), implemented=${summary.implemented}, mapped=${summary.mapped}.`);
