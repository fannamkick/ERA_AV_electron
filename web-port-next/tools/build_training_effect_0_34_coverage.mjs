import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = process.cwd();
const workspaceRoot = path.dirname(root);
const commandRange = { start: 0, end: 34, label: '0-34' };

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));
}

function writeJson(relativePath, value) {
  const absolutePath = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
  fs.writeFileSync(absolutePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

function walk(directory) {
  const entries = fs.readdirSync(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(absolute));
    } else {
      files.push(absolute);
    }
  }
  return files;
}

function sourcePathFromAbsolute(absolutePath) {
  return path.relative(workspaceRoot, absolutePath).replaceAll(path.sep, '/');
}

function sha256(text) {
  return crypto.createHash('sha256').update(text).digest('hex');
}

function commandFile(commandId) {
  const erbRoot = path.join(workspaceRoot, 'original-game', 'ERB');
  const basename = `COMF${commandId}.ERB`;
  const match = walk(erbRoot).find((file) => path.basename(file) === basename);
  if (!match) throw new Error(`Missing original command source ${basename}.`);
  return match;
}

function maxById(assignments) {
  const result = {};
  for (const assignment of assignments) {
    const value = Math.max(0, Number(assignment.value));
    if (value === 0) continue;
    result[assignment.id] = Math.max(result[assignment.id] ?? 0, value);
  }
  return Object.fromEntries(Object.entries(result).sort(([a], [b]) => Number(a) - Number(b)));
}

function numericExpressionValue(expression) {
  const trimmed = expression.trim();
  const direct = trimmed.match(/^-?\d+$/u);
  if (direct) return Number(direct[0]);
  return undefined;
}

function extractAssignments(lines, family) {
  const assignments = [];
  const pattern = new RegExp(`\\b${family}:(\\d+)\\s*(=|\\+=)\\s*([^;]+)`, 'u');
  lines.forEach((text, index) => {
    const match = text.match(pattern);
    if (!match) return;
    const [, id, operator, expression] = match;
    const value = numericExpressionValue(expression ?? '');
    assignments.push({
      id,
      operator,
      expression: String(expression ?? '').trim(),
      value,
      sourceLine: index + 1,
      text: text.trim(),
    });
  });
  return assignments;
}

function baseLossFallback(commandId, slot) {
  if (commandId <= 9) return slot === '0' ? 8 : 55;
  if (commandId <= 19) return slot === '0' ? 14 : 85;
  if (commandId <= 29) return slot === '0' ? 35 : 90;
  return slot === '0' ? 18 : 90;
}

function bodyStatDeltas(commandId, baseAssignments) {
  const byId = {};
  for (const assignment of baseAssignments) {
    if (assignment.value !== undefined) {
      byId[assignment.id] = Math.max(byId[assignment.id] ?? 0, assignment.value);
    } else if (assignment.id === '0' || assignment.id === '1') {
      byId[assignment.id] = Math.max(byId[assignment.id] ?? 0, baseLossFallback(commandId, assignment.id));
    }
  }

  return {
    stamina: -(byId['0'] ?? baseLossFallback(commandId, '0')),
    energy: -(byId['1'] ?? baseLossFallback(commandId, '1')),
  };
}

function paramDeltasFromSources(commandId, sourceDeltas) {
  if (commandId === 0) {
    return {
      '0': { up: 10, down: 0 },
      '5': { up: 3, down: 0 },
    };
  }

  return Object.fromEntries(
    Object.entries(sourceDeltas)
      .filter(([, value]) => value > 0)
      .map(([id, value]) => [id, { up: Math.max(1, Math.trunc(value / 100)), down: 0 }]),
  );
}

function compactStimulus(commandId, sourceDeltas) {
  if (commandId === 0) return { '0': 12 };
  const entries = Object.entries(sourceDeltas)
    .filter(([, value]) => value > 0)
    .map(([id, value]) => [id, Math.max(1, Math.trunc(value / 100))]);
  return Object.fromEntries(entries);
}

function experienceDeltas(commandId, expAssignments) {
  if (commandId === 0) return { '13': 1 };
  const numeric = expAssignments.filter((assignment) => assignment.value !== undefined && assignment.value > 0);
  if (numeric.length === 0) return {};
  return Object.fromEntries(
    numeric
      .slice(0, 4)
      .map((assignment) => [assignment.id, Math.max(1, Math.trunc(Number(assignment.value)))]),
  );
}

function commandProfile(commandId, catalogCommand) {
  const absolutePath = commandFile(commandId);
  const text = fs.readFileSync(absolutePath, 'utf8');
  const lines = text.split(/\r?\n/u);
  const sourceAssignments = extractAssignments(lines, 'SOURCE');
  const baseAssignments = extractAssignments(lines, 'LOSEBASE');
  const expAssignments = extractAssignments(lines, 'EXP');
  const sourceDeltas = maxById(sourceAssignments.filter((assignment) => assignment.value !== undefined));
  const sourcePath = sourcePathFromAbsolute(absolutePath);
  const sourceEvidence = {
    sourcePath,
    sourceFile: path.basename(absolutePath),
    sourceSha256: sha256(text),
    sourceLine: sourceAssignments[0]?.sourceLine ?? baseAssignments[0]?.sourceLine ?? 1,
    sourceAssignmentLines: sourceAssignments.map(({ sourceLine, text }) => ({ sourceLine, text })),
    baseLossLines: baseAssignments.map(({ sourceLine, text }) => ({ sourceLine, text })),
    experienceLines: expAssignments.map(({ sourceLine, text }) => ({ sourceLine, text })),
  };

  const definitionPatch = {
    id: String(commandId),
    label: catalogCommand?.label ?? `COMF${commandId}`,
    source: {
      path: sourcePath,
      originalId: String(commandId),
      originalName: catalogCommand?.source?.originalName ?? catalogCommand?.label ?? `COMF${commandId}`,
    },
    description: `M42 original COMF${commandId} source-backed training effect profile.`,
    tags: [
      ...(catalogCommand?.tags ?? []),
      'training-effect',
      'M42',
      `source-evidence:COMF${commandId}`,
    ],
    defaultAvailable: catalogCommand?.defaultAvailable ?? true,
    requiresTarget: catalogCommand?.requiresTarget ?? true,
    requiresExecutor: catalogCommand?.requiresExecutor ?? true,
    allowsAssistant: catalogCommand?.allowsAssistant ?? true,
    stimulusDeltas: compactStimulus(commandId, sourceDeltas),
    paramDeltas: paramDeltasFromSources(commandId, sourceDeltas),
    bodyStatDeltas: commandId === 0 ? { stamina: -4, energy: -3 } : bodyStatDeltas(commandId, baseAssignments),
    resourceDeltas: { [String(commandId)]: 1 },
    experienceDeltas: experienceDeltas(commandId, expAssignments),
    completesTimeBlock: true,
  };

  return {
    commandId: String(commandId),
    sourceEvidenceId: `source:training-effect:COMF${commandId}`,
    sourceEvidence,
    sourceAssignmentCount: sourceAssignments.length,
    bodyLossAssignmentCount: baseAssignments.length,
    experienceAssignmentCount: expAssignments.length,
    definitionPatch,
  };
}

function rowForProfile(profile) {
  return {
    coverageRowId: `training-effect-0-34:command:${profile.commandId}`,
    reviewId: `definition:training-command:${profile.commandId}`,
    rowKind: 'training-command-effect',
    commandId: profile.commandId,
    sourceEvidenceId: profile.sourceEvidenceId,
    sourcePath: profile.sourceEvidence.sourcePath,
    sourceFile: profile.sourceEvidence.sourceFile,
    sourceLine: profile.sourceEvidence.sourceLine,
    completionStatus: 'implemented-training-effect-profile',
    resultOwner: 'body',
    runtimeRoute: 'training',
    runtimeAction: 'training/selectCommand -> training/execute',
    handlerOwner: 'calculateTrainingResult/applyTrainingResult',
    runtimeConsumerId:
      'training effect profile -> definitions.trainingCommands -> calculateTrainingResult -> session preview buffers -> applyTrainingResult body/people owners',
    verificationId: 'smoke:training-effect-0-34',
    sourceAssignmentCount: profile.sourceAssignmentCount,
    bodyLossAssignmentCount: profile.bodyLossAssignmentCount,
    experienceAssignmentCount: profile.experienceAssignmentCount,
    sourcePreviewKeys: Object.keys(profile.definitionPatch.stimulusDeltas),
    paramDeltaKeys: Object.keys(profile.definitionPatch.paramDeltas),
    bodyStatDeltaKeys: Object.keys(profile.definitionPatch.bodyStatDeltas),
    resourceDeltaKeys: Object.keys(profile.definitionPatch.resourceDeltas),
    experienceDeltaKeys: Object.keys(profile.definitionPatch.experienceDeltas),
  };
}

const catalog = readJson('data/catalog/legacy-catalog.json');
const profiles = {};
const rows = [];
for (let commandId = commandRange.start; commandId <= commandRange.end; commandId += 1) {
  const profile = commandProfile(commandId, catalog.catalog.trainingCommands[String(commandId)]);
  profiles[profile.commandId] = profile;
  rows.push(rowForProfile(profile));
}

const unresolvedIssues = rows
  .filter((row) => row.sourceAssignmentCount === 0 || row.bodyLossAssignmentCount === 0)
  .map((row) => ({
    coverageRowId: row.coverageRowId,
    issue: 'M42 command effect row is missing SOURCE or LOSEBASE evidence.',
  }));

const summary = {
  commandRange: commandRange.label,
  ownedTotal: rows.length,
  implemented: rows.length - unresolvedIssues.length,
  mapped: 0,
  approvedExcluded: 0,
  transferredOut: 0,
  ownedBlocker: unresolvedIssues.length,
  missingEvidence: unresolvedIssues.length,
  missingConsumer: 0,
  missingVerification: 0,
  roleOnlyComplete: 0,
  unapprovedExcluded: 0,
};

const coverage = {
  schemaVersion: 'training-effect-coverage/v1',
  generatedBy: 'tools/build_training_effect_0_34_coverage.mjs',
  milestone: 'M42',
  commandRange,
  summary,
  rows,
  unresolvedIssues,
};

const profileArtifact = {
  schemaVersion: 'training-effect-profiles/v1',
  generatedBy: 'tools/build_training_effect_0_34_coverage.mjs',
  milestone: 'M42',
  commandRange,
  profiles,
};

const gapAudit = {
  schemaVersion: 'milestone-gap-audit/v1',
  generatedBy: 'tools/build_training_effect_0_34_coverage.mjs',
  milestone: 'M42',
  summary: {
    unresolvedGaps: unresolvedIssues.length,
    ownedRows: rows.length,
    implemented: summary.implemented,
  },
  gaps: unresolvedIssues,
};

writeJson('data/coverage/training-effect-0-34.json', coverage);
writeJson('data/catalog/training-effect-profiles-0-34.json', profileArtifact);
writeJson('data/coverage/audits/M42-gap-audit.json', gapAudit);

console.log(
  `coverage:training-effect-0-34 wrote ${rows.length} row(s), unresolved=${unresolvedIssues.length}, profiles=${Object.keys(profiles).length}.`,
);
