import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const milestones = process.argv.slice(2).length > 0 ? process.argv.slice(2) : Array.from({ length: 14 }, (_, index) => `M${index + 36}`);

const stateFamilies = [
  'FLAG',
  'CFLAG',
  'TFLAG',
  'GLOBAL',
  'BASE',
  'MAXBASE',
  'ABL',
  'EXP',
  'JUEL',
  'PALAM',
  'TALENT',
  'MARK',
  'ITEM',
  'MONEY',
  'DAY',
  'TIME',
  'TARGET',
  'ASSI',
  'MASTER',
  'PBAND',
  'TCVAR',
  'LOCAL',
];

const assignmentOperators = ['\\+=', '-=', '\\*=', '/=', '%=', '\\|=', '&=', '='];
const assignmentRegex = new RegExp(
  `^\\s*(${stateFamilies.join('|')})(?::[^\\s=+\\-*/%|&]+){0,3}\\s*(${assignmentOperators.join('|')})\\s*(.+)$`,
);
const callRegex = /^\s*(CALLFORM|TRYCALLFORM|CALL)\s+([^\s;(]+)/;
const branchRegex = /^\s*(SIF|IF|ELSEIF|ELSE|ENDIF|SELECTCASE|CASE|ENDSELECT|REPEAT|REND|FOR|NEXT|WHILE|WEND|BREAK|CONTINUE|GOTO|INPUT)\b(.*)$/;
const beginRegex = /^\s*BEGIN\s+(.+)$/;
const returnRegex = /^\s*RETURN\b(.*)$/;
const labelRegex = /^\s*@([^\s;(]+)/;
const primitiveRegex = /^\s*(LOADGLOBAL|SAVEGLOBAL|ADDCHARA|DELCHARA|VARSET|SWAPCHARA|COPYCHARA|RESETDATA)\b(.*)$/;

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));
}

function writeJson(relativePath, value) {
  const absolutePath = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
  fs.writeFileSync(absolutePath, `${JSON.stringify(value, null, 2)}\n`);
}

function rowsFromManifest(manifest) {
  if (Array.isArray(manifest)) return manifest;
  for (const key of ['sourceUnits', 'units', 'rows', 'items', 'milestoneSourceUnits']) {
    if (Array.isArray(manifest[key])) return manifest[key];
  }
  return [];
}

function collectSourcePaths(value, out = new Set()) {
  if (typeof value === 'string') {
    const normalized = value.replaceAll('\\', '/');
    if (normalized.startsWith('original-game/')) out.add(normalized);
    return out;
  }
  if (Array.isArray(value)) {
    for (const entry of value) collectSourcePaths(entry, out);
    return out;
  }
  if (value && typeof value === 'object') {
    for (const entry of Object.values(value)) collectSourcePaths(entry, out);
  }
  return out;
}

function stripInlineComment(raw) {
  const index = raw.indexOf(';');
  return index === -1 ? raw : raw.slice(0, index);
}

function sourceDiskPath(canonicalPath) {
  return path.join(root, '..', canonicalPath.replace(/^original-game\//, 'original-game/'));
}

function parseLineRefs(value) {
  return String(value ?? '')
    .split(/[^0-9]+/g)
    .filter(Boolean)
    .map((entry) => Number(entry))
    .filter((entry) => Number.isInteger(entry) && entry > 0);
}

function effectRowsForErb(milestone, canonicalPath) {
  const absolutePath = sourceDiskPath(canonicalPath);
  if (!fs.existsSync(absolutePath)) return { missing: true, rows: [] };
  const text = fs.readFileSync(absolutePath, 'utf8');
  const lines = text.split(/\r?\n/);
  const rows = [];
  let currentLabel = '';

  for (let index = 0; index < lines.length; index += 1) {
    const raw = lines[index];
    const activeText = raw.trimStart().startsWith(';') ? raw.trimStart().replace(/^;+\s?/, '') : stripInlineComment(raw);
    const label = activeText.match(labelRegex);
    if (label) currentLabel = label[1];
    if (!activeText.trim()) continue;

    const line = index + 1;
    const base = { milestone, sourcePath: canonicalPath, sourceLine: line, currentLabel, raw };
    const add = (kind, detail = {}) => rows.push({ ...base, kind, ...detail });

    const call = activeText.match(callRegex);
    const assignment = activeText.match(assignmentRegex);
    const primitive = activeText.match(primitiveRegex);
    const begin = activeText.match(beginRegex);
    const ret = activeText.match(returnRegex);
    const branch = activeText.match(branchRegex);

    if (label) add('label', { label: label[1] });
    if (call) add('call-edge', { callKind: call[1], callTarget: call[2], dynamic: call[1] !== 'CALL' });
    if (assignment) {
      const rawTarget = activeText.slice(0, activeText.indexOf(assignment[2])).trim();
      add('state-write', { stateFamily: assignment[1], stateAddress: rawTarget, operator: assignment[2] });
    }
    if (primitive) add('primitive-effect', { primitive: primitive[1] });
    if (begin) add('control-transfer', { controlKind: 'BEGIN', target: begin[1].trim() });
    if (ret) add('control-transfer', { controlKind: 'RETURN', target: ret[1].trim() });
    if (branch) add('branch-or-loop', { controlKind: branch[1], condition: branch[2].trim() });
  }

  return { missing: false, rows, lineCount: lines.length };
}

function effectRowsForErbLines(milestone, canonicalPath, lineRefs) {
  const absolutePath = sourceDiskPath(canonicalPath);
  if (!fs.existsSync(absolutePath)) return { missing: true, rows: [] };
  const text = fs.readFileSync(absolutePath, 'utf8');
  const lines = text.split(/\r?\n/);
  const wanted = new Set(lineRefs);
  const rows = [];
  let currentLabel = '';

  for (let index = 0; index < lines.length; index += 1) {
    const raw = lines[index];
    const activeText = raw.trimStart().startsWith(';') ? raw.trimStart().replace(/^;+\s?/, '') : stripInlineComment(raw);
    const label = activeText.match(labelRegex);
    if (label) currentLabel = label[1];
    const line = index + 1;
    if (!wanted.has(line) || !activeText.trim()) continue;

    const base = { milestone, sourcePath: canonicalPath, sourceLine: line, currentLabel, raw };
    const add = (kind, detail = {}) => rows.push({ ...base, kind, ...detail });

    const call = activeText.match(callRegex);
    const assignment = activeText.match(assignmentRegex);
    const primitive = activeText.match(primitiveRegex);
    const begin = activeText.match(beginRegex);
    const ret = activeText.match(returnRegex);
    const branch = activeText.match(branchRegex);

    if (label) add('label', { label: label[1] });
    if (call) add('call-edge', { callKind: call[1], callTarget: call[2], dynamic: call[1] !== 'CALL' });
    if (assignment) {
      const rawTarget = activeText.slice(0, activeText.indexOf(assignment[2])).trim();
      add('state-write', { stateFamily: assignment[1], stateAddress: rawTarget, operator: assignment[2] });
    }
    if (primitive) add('primitive-effect', { primitive: primitive[1] });
    if (begin) add('control-transfer', { controlKind: 'BEGIN', target: begin[1].trim() });
    if (ret) add('control-transfer', { controlKind: 'RETURN', target: ret[1].trim() });
    if (branch) add('branch-or-loop', { controlKind: branch[1], condition: branch[2].trim() });
  }

  return { missing: false, rows };
}

function countBy(rows, fn) {
  const result = {};
  for (const row of rows) {
    const key = fn(row);
    result[key] = (result[key] ?? 0) + 1;
  }
  return result;
}

function classify(summary) {
  const scopeRows = summary.manifestSourceRowCount || summary.manifestRows;
  const commandAssignments = summary.commandMetricAssignments ?? 0;
  const evidenceEffects = summary.lineBoundedEffectCount ?? 0;
  if (
    summary.hasQueuedOwnerScope &&
    (scopeRows >= 700 || summary.blastRadius.totalEffects >= 9000 || summary.blastRadius.callEdges >= 450)
  ) {
    return 'extreme-dispatcher';
  }
  if (
    summary.hasQueuedOwnerScope ||
    scopeRows >= 800 ||
    commandAssignments >= 2500 ||
    summary.manifestRows >= 500 ||
    summary.commandMetricLineCount >= 15000
  ) {
    return 'huge-dispatcher';
  }
  if (
    scopeRows >= 250 ||
    commandAssignments >= 1000 ||
    summary.manifestRows >= 120 ||
    evidenceEffects >= 250 ||
    summary.commandMetricLineCount >= 6000
  ) {
    return 'large';
  }
  if (
    scopeRows >= 60 ||
    commandAssignments >= 250 ||
    summary.manifestRows >= 30 ||
    evidenceEffects >= 80 ||
    summary.commandMetricLineCount >= 1500
  ) {
    return 'medium';
  }
  return 'small';
}

function callBand(classification) {
  if (classification === 'extreme-dispatcher') return '15-25+';
  if (classification === 'huge-dispatcher') return '10-18';
  if (classification === 'large') return '6-10';
  if (classification === 'medium') return '3-6';
  return '1-3';
}

function analyzeMilestone(milestone) {
  const manifestPath = `data/coverage/manifests/${milestone}-source-units.json`;
  const manifest = readJson(manifestPath);
  const manifestRows = rowsFromManifest(manifest);
  const paths = [...collectSourcePaths(manifestRows)].sort();
  const erbPaths = paths.filter((sourcePath) => /\.erb$/i.test(sourcePath));
  const csvPaths = paths.filter((sourcePath) => /\.csv$/i.test(sourcePath));
  const allRows = [];
  const lineBoundedRows = [];
  const missingSources = [];
  const fileSummaries = [];

  for (const sourcePath of erbPaths) {
    const result = effectRowsForErb(milestone, sourcePath);
    if (result.missing) {
      missingSources.push(sourcePath);
      continue;
    }
    allRows.push(...result.rows);
    fileSummaries.push({
      sourcePath,
      lineCount: result.lineCount,
      effectCount: result.rows.length,
      callEdges: result.rows.filter((row) => row.kind === 'call-edge').length,
      stateWrites: result.rows.filter((row) => row.kind === 'state-write').length,
    });
  }

  const sourceLineRefsByPath = new Map();
  for (const row of manifestRows) {
    const sourcePath = String(row.sourcePath ?? '').replaceAll('\\', '/');
    if (!sourcePath.startsWith('original-game/') || !/\.erb$/i.test(sourcePath)) continue;
    const refs = parseLineRefs(row.sourceLine);
    if (refs.length === 0) continue;
    if (!sourceLineRefsByPath.has(sourcePath)) sourceLineRefsByPath.set(sourcePath, new Set());
    const set = sourceLineRefsByPath.get(sourcePath);
    for (const ref of refs) set.add(ref);
  }

  for (const [sourcePath, refs] of sourceLineRefsByPath.entries()) {
    const result = effectRowsForErbLines(milestone, sourcePath, [...refs]);
    if (!result.missing) lineBoundedRows.push(...result.rows);
  }

  const groups = new Map();
  for (const row of allRows) {
    const key = `${row.sourcePath}|${row.currentLabel || '(preamble)'}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(row);
  }

  const reviewGroups = [...groups.values()]
    .map((rows) => {
      const first = rows[0];
      const calls = rows.filter((row) => row.kind === 'call-edge');
      const writes = rows.filter((row) => row.kind === 'state-write');
      return {
        sourcePath: first.sourcePath,
        currentLabel: first.currentLabel || '',
        sourceLineStart: Math.min(...rows.map((row) => row.sourceLine)),
        sourceLineEnd: Math.max(...rows.map((row) => row.sourceLine)),
        effectCount: rows.length,
        kindCounts: countBy(rows, (row) => row.kind),
        stateFamilies: [...new Set(writes.map((row) => row.stateFamily))].sort(),
        callTargets: [...new Set(calls.map((row) => row.callTarget))].sort(),
      };
    })
    .sort((left, right) => right.effectCount - left.effectCount || left.sourcePath.localeCompare(right.sourcePath));

  const manifestSourceRowCount = manifestRows.reduce((sum, row) => sum + (Number(row.sourceRowCount) || 0), 0);
  const commandMetricRows = manifestRows.filter((row) => row.metrics && typeof row.metrics === 'object');
  const commandMetricAssignments = commandMetricRows.reduce((sum, row) => sum + (Number(row.metrics.assignmentCount ?? row.metrics.sourceAssignmentCount) || 0), 0);
  const commandMetricCalls = commandMetricRows.reduce((sum, row) => sum + (Number(row.metrics.callCount) || 0), 0);
  const commandMetricReturns = commandMetricRows.reduce((sum, row) => sum + (Number(row.metrics.returnCount) || 0), 0);
  const commandMetricLineCount = commandMetricRows.reduce((sum, row) => sum + (Number(row.metrics.lineCount) || 0), 0);
  const hasQueuedOwnerScope = manifestRows.some((row) => row.sourceKind === 'queued-owner-scope');
  const rowKindCounts = countBy(manifestRows, (row) => row.rowKind ?? row.sourceKind ?? '(unknown)');
  const manifestStatusCounts = countBy(manifestRows, (row) => row.manifestStatus ?? '(unknown)');
  const sourceKindCounts = countBy(manifestRows, (row) => row.sourceKind ?? '(unknown)');
  const lineBoundedKindCounts = countBy(lineBoundedRows, (row) => row.kind);
  const lineBoundedStateFamilyCounts = countBy(
    lineBoundedRows.filter((row) => row.kind === 'state-write'),
    (row) => row.stateFamily,
  );

  const summary = {
    milestone,
    manifestRows: manifestRows.length,
    manifestSourceRowCount,
    hasQueuedOwnerScope,
    rowKindCounts,
    sourceKindCounts,
    manifestStatusCounts,
    sourcePaths: paths.length,
    erbFiles: erbPaths.length,
    csvFiles: csvPaths.length,
    missingSources,
    lineRefCount: [...sourceLineRefsByPath.values()].reduce((sum, refs) => sum + refs.size, 0),
    lineBoundedEffectCount: lineBoundedRows.length,
    lineBoundedCallEdges: lineBoundedRows.filter((row) => row.kind === 'call-edge').length,
    lineBoundedDynamicCalls: lineBoundedRows.filter((row) => row.kind === 'call-edge' && row.dynamic).length,
    lineBoundedStateWrites: lineBoundedRows.filter((row) => row.kind === 'state-write').length,
    lineBoundedKindCounts,
    lineBoundedStateFamilyCounts,
    commandMetricRows: commandMetricRows.length,
    commandMetricAssignments,
    commandMetricCalls,
    commandMetricReturns,
    commandMetricLineCount,
    blastRadius: {
      totalEffects: allRows.length,
      reviewGroups: reviewGroups.length,
      largestGroupEffectCount: reviewGroups[0]?.effectCount ?? 0,
      callEdges: allRows.filter((row) => row.kind === 'call-edge').length,
      dynamicCalls: allRows.filter((row) => row.kind === 'call-edge' && row.dynamic).length,
      stateWrites: allRows.filter((row) => row.kind === 'state-write').length,
      controlTransfers: allRows.filter((row) => row.kind === 'control-transfer').length,
      primitiveEffects: allRows.filter((row) => row.kind === 'primitive-effect').length,
      kindCounts: countBy(allRows, (row) => row.kind),
      stateFamilyCounts: countBy(allRows.filter((row) => row.kind === 'state-write'), (row) => row.stateFamily),
    },
    topReviewGroups: reviewGroups.slice(0, 15),
    topFiles: fileSummaries.sort((left, right) => right.effectCount - left.effectCount).slice(0, 15),
  };
  const classification = classify(summary);
  return {
    ...summary,
    classification,
    estimatedClosureCalls: callBand(classification),
  };
}

const results = milestones.map(analyzeMilestone);
const report = {
  schemaVersion: 'future-milestone-risk-report/v1',
  generatedAt: new Date().toISOString(),
  purpose: 'Preflight source-effect risk classification. This is planning evidence, not implementation closure.',
  milestones: results,
};

writeJson('data/coverage/source-effects/M36-M49-risk-report.json', report);
console.log(JSON.stringify(results.map((row) => ({
  milestone: row.milestone,
  classification: row.classification,
  estimatedClosureCalls: row.estimatedClosureCalls,
  manifestRows: row.manifestRows,
  manifestSourceRowCount: row.manifestSourceRowCount,
  lineRefCount: row.lineRefCount,
  lineBoundedEffectCount: row.lineBoundedEffectCount,
  commandMetricRows: row.commandMetricRows,
  commandMetricAssignments: row.commandMetricAssignments,
  commandMetricLineCount: row.commandMetricLineCount,
  blastRadiusEffects: row.blastRadius.totalEffects,
  blastRadiusLargestGroup: row.blastRadius.largestGroupEffectCount,
  sourcePaths: row.sourcePaths,
  hasQueuedOwnerScope: row.hasQueuedOwnerScope,
  missingSources: row.missingSources.length,
})), null, 2));
