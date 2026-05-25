import { countBy, effectLedgerPath, readJson, writeJson } from './source_effect_utils.mjs';

const root = process.cwd();
const milestone = process.argv[2];

if (!/^M\d+(?:\.5)?$/.test(milestone ?? '')) {
  throw new Error('milestone argument is required, for example: npm run coverage:source-effect-review -- M35');
}

const ledger = readJson(root, effectLedgerPath(milestone));
if (!ledger) throw new Error(`source-effect ledger missing for ${milestone}`);

function groupKey(row) {
  return [row.sourcePath, row.currentLabel || '(preamble)'].join('|');
}

function groupIdFor(row) {
  const pathPart = row.sourcePath
    .split('/')
    .pop()
    .replace(/\.[^.]+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  const labelPart = (row.currentLabel || 'preamble')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return `${milestone}:review:${pathPart}:${labelPart}`;
}

function riskReasons(rows) {
  const reasons = new Set();
  if (rows.some((row) => row.kind === 'state-write')) reasons.add('contains-state-writes');
  if (rows.some((row) => row.kind === 'primitive-effect')) reasons.add('contains-primitive-effects');
  if (rows.some((row) => row.kind === 'call-edge')) reasons.add('contains-call-edges');
  if (rows.some((row) => row.controlKind === 'INPUT' || row.controlKind === 'GOTO' || row.controlKind === 'BEGIN')) {
    reasons.add('contains-interactive-or-control-transfer');
  }
  if (rows.some((row) => (row.needsReviewReasons ?? []).length > 0)) reasons.add('contains-needs-review-rows');
  if (rows.length >= 80) reasons.add('large-group-risk');
  return [...reasons].sort();
}

const grouped = new Map();
for (const row of ledger.effects ?? []) {
  const key = groupKey(row);
  if (!grouped.has(key)) grouped.set(key, []);
  grouped.get(key).push(row);
}

const reviewGroups = [...grouped.values()]
  .map((rows) => {
    const first = rows[0];
    const sortedRows = [...rows].sort((a, b) => a.sourceLine - b.sourceLine || a.effectId.localeCompare(b.effectId));
    return {
      reviewGroupId: groupIdFor(first),
      milestone,
      sourcePath: first.sourcePath,
      currentLabel: first.currentLabel || '',
      sourceLineStart: sortedRows[0].sourceLine,
      sourceLineEnd: sortedRows[sortedRows.length - 1].sourceLine,
      effectCount: sortedRows.length,
      statusCounts: countBy(sortedRows, (row) => row.status),
      kindCounts: countBy(sortedRows, (row) => row.kind),
      stateFamilies: [...new Set(sortedRows.map((row) => row.stateFamily).filter(Boolean))].sort(),
      callTargets: [...new Set(sortedRows.map((row) => row.callTarget).filter(Boolean))].sort(),
      riskReasons: riskReasons(sortedRows),
      effectIds: sortedRows.map((row) => row.effectId),
      sampleRows: sortedRows.slice(0, 12).map((row) => ({
        effectId: row.effectId,
        sourceLine: row.sourceLine,
        kind: row.kind,
        raw: row.raw,
        status: row.status,
      })),
    };
  })
  .sort((a, b) => a.sourcePath.localeCompare(b.sourcePath) || a.sourceLineStart - b.sourceLineStart);

const queue = {
  schemaVersion: 'source-effect-review-queue/v1',
  generatedAt: new Date().toISOString(),
  milestone,
  sourceLedger: effectLedgerPath(milestone),
  purpose:
    'Review queue over generated source effects. Groups are classification work packets, not closure evidence.',
  rules: [
    'Every source effect must appear in exactly one review group.',
    'A review group can guide classification, but individual effect rows still require evidence.',
    'Large or high-risk groups should be split mentally during review rather than bulk-closed.',
  ],
  summary: {
    totalEffects: ledger.effects?.length ?? 0,
    reviewGroups: reviewGroups.length,
    bySourcePath: countBy(reviewGroups, (row) => row.sourcePath),
    byRiskReason: countBy(
      reviewGroups.flatMap((row) => row.riskReasons),
      (reason) => reason,
    ),
    largestGroups: [...reviewGroups]
      .sort((a, b) => b.effectCount - a.effectCount)
      .slice(0, 20)
      .map((row) => ({
        reviewGroupId: row.reviewGroupId,
        sourcePath: row.sourcePath,
        currentLabel: row.currentLabel,
        sourceLineStart: row.sourceLineStart,
        sourceLineEnd: row.sourceLineEnd,
        effectCount: row.effectCount,
        riskReasons: row.riskReasons,
      })),
  },
  reviewGroups,
};

writeJson(root, `data/coverage/source-effects/${milestone}.review-queue.json`, queue);
console.log(
  `coverage:source-effect-review wrote ${milestone}: ${queue.summary.reviewGroups} group(s), effects=${queue.summary.totalEffects}.`,
);
