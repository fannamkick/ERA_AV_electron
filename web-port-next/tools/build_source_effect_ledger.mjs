import fs from 'node:fs';
import path from 'node:path';
import {
  classificationPath,
  countBy,
  effectLedgerPath,
  normalizeSourcePath,
  readJson,
  sha256,
  sourceEffectStatuses,
  writeJson,
} from './source_effect_utils.mjs';

const root = process.cwd();
const requestedMilestone = process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : '';
const scopesPath = 'data/coverage/source-effects/scopes.json';

function slug(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9가-힣ぁ-んァ-ン一-龥_:-]+/g, '-')
    .replace(/^-|-$/g, '');
}

function stripInlineComment(raw) {
  const index = raw.indexOf(';');
  return index === -1 ? raw : raw.slice(0, index);
}

function isComment(raw) {
  return raw.trimStart().startsWith(';');
}

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

function splitStateTarget(rawTarget) {
  const [family, ...indices] = rawTarget.trim().split(':');
  return { family, indices };
}

function hasDynamicIndex(indices) {
  return indices.some((index) => index && !/^-?\d+$/.test(index) && index !== 'MASTER');
}

function detectEffects({ lineNumber, raw, milestone, sourcePath, canonicalPath, sourceSha256, currentLabel }) {
  const trimmed = raw.trim();
  const commentOnly = isComment(raw);
  const text = commentOnly ? raw.trimStart().replace(/^;+\s?/, '') : stripInlineComment(raw);
  if (!text.trim()) return [];

  const rows = [];
  const base = {
    milestone,
    sourcePath: canonicalPath ?? normalizeSourcePath(sourcePath),
    sourceDiskPath: sourcePath,
    sourceLine: lineNumber,
    sourceSha256,
    raw,
    currentLabel,
    status: 'unclassified',
    ownerMilestone: '',
    transferId: '',
    exclusionReason: '',
    implementationEvidence: [],
    runtimeTraceEvidence: [],
    reviewNotes: '',
    needsReviewReasons: commentOnly ? ['commented-source-candidate'] : [],
  };

  const add = (kind, detail) => {
    const effectId = [
      milestone,
      slug(path.basename(canonicalPath ?? sourcePath, path.extname(sourcePath))),
      String(lineNumber).padStart(5, '0'),
      slug(kind),
      String(rows.length + 1).padStart(2, '0'),
    ].join(':');
    rows.push({ effectId, kind, ...base, ...detail });
  };

  const label = text.match(labelRegex);
  if (label) {
    add('label', {
      label: label[1],
      reads: [],
      writes: [],
      calls: [],
    });
  }

  const call = text.match(callRegex);
  if (call) {
    add('call-edge', {
      callKind: call[1],
      callTarget: call[2],
      reads: [],
      writes: [],
      calls: [call[2]],
      needsReviewReasons: [
        ...base.needsReviewReasons,
        ...(call[1] === 'CALLFORM' || call[1] === 'TRYCALLFORM' ? ['dynamic-call'] : []),
      ],
    });
  }

  const assignment = text.match(assignmentRegex);
  if (assignment) {
    const rawTarget = text.slice(0, text.indexOf(assignment[2])).trim();
    const target = splitStateTarget(rawTarget);
    add('state-write', {
      stateFamily: target.family,
      stateAddress: rawTarget,
      operator: assignment[2],
      expression: assignment[3].trim(),
      reads: [],
      writes: [rawTarget],
      calls: [],
      needsReviewReasons: [
        ...base.needsReviewReasons,
        ...(hasDynamicIndex(target.indices) ? ['computed-state-address'] : []),
      ],
    });
  }

  const primitive = text.match(primitiveRegex);
  if (primitive) {
    add('primitive-effect', {
      primitive: primitive[1],
      expression: primitive[2].trim(),
      reads: [],
      writes: [],
      calls: [],
      needsReviewReasons: [...base.needsReviewReasons, 'primitive-side-effect'],
    });
  }

  const begin = text.match(beginRegex);
  if (begin) {
    add('control-transfer', {
      controlKind: 'BEGIN',
      target: begin[1].trim(),
      reads: [],
      writes: [],
      calls: [],
    });
  }

  const ret = text.match(returnRegex);
  if (ret) {
    add('control-transfer', {
      controlKind: 'RETURN',
      target: ret[1].trim(),
      reads: [],
      writes: [],
      calls: [],
    });
  }

  const branch = text.match(branchRegex);
  if (branch) {
    add('branch-or-loop', {
      controlKind: branch[1],
      condition: branch[2].trim(),
      reads: [],
      writes: [],
      calls: [],
    });
  }

  return rows;
}

function loadClassification(milestone) {
  const artifact = readJson(root, classificationPath(milestone), { milestone, rows: [] });
  const rowClassifications = new Map((artifact.rows ?? []).map((row) => [row.effectId, row]));
  const groupBlocks = artifact.groupBlocks ?? [];
  for (const groupBlock of groupBlocks) {
    if (groupBlock.status !== 'blocked') {
      throw new Error(`groupBlocks may only set blocked status: ${groupBlock.reviewGroupId ?? '(unnamed)'}`);
    }
    if (!groupBlock.sourcePath || typeof groupBlock.currentLabel !== 'string') {
      throw new Error(`groupBlock requires sourcePath and currentLabel: ${groupBlock.reviewGroupId ?? '(unnamed)'}`);
    }
  }
  return { rowClassifications, groupBlocks };
}

function applyClassification(row, classifications) {
  const classification =
    classifications.rowClassifications.get(row.effectId) ??
    classifications.groupBlocks.find(
      (groupBlock) =>
        groupBlock.sourcePath === row.sourcePath && groupBlock.currentLabel === (row.currentLabel || ''),
    );
  if (!classification) return row;
  if (!sourceEffectStatuses.has(classification.status)) {
    throw new Error(`Invalid source effect status for ${row.effectId}: ${classification.status}`);
  }
  return {
    ...row,
    status: classification.status,
    ownerMilestone: classification.ownerMilestone ?? row.ownerMilestone,
    transferId: classification.transferId ?? row.transferId,
    exclusionReason: classification.exclusionReason ?? row.exclusionReason,
    implementationEvidence: classification.implementationEvidence ?? row.implementationEvidence,
    runtimeTraceEvidence: classification.runtimeTraceEvidence ?? row.runtimeTraceEvidence,
    reviewNotes: classification.reviewNotes ?? row.reviewNotes,
  };
}

function buildForScope(scope) {
  const classifications = loadClassification(scope.milestone);
  const effects = [];
  const sources = [];

  for (const source of scope.sources ?? []) {
    const sourcePath = source.sourcePath;
    const absolutePath = path.resolve(root, sourcePath);
    if (!fs.existsSync(absolutePath)) {
      throw new Error(`Source file not found for ${scope.milestone}: ${sourcePath}`);
    }

    const text = fs.readFileSync(absolutePath, 'utf8');
    const sourceSha256 = sha256(text);
    const canonicalPath = source.canonicalPath ?? normalizeSourcePath(sourcePath);
    const lines = text.split(/\r?\n/);
    let currentLabel = '';

    sources.push({
      sourcePath: canonicalPath,
      sourceDiskPath: sourcePath,
      sourceSha256,
      lineCount: lines.length,
    });

    for (let index = 0; index < lines.length; index += 1) {
      const raw = lines[index];
      const label = stripInlineComment(raw).match(labelRegex);
      if (label) currentLabel = label[1];
      for (const effect of detectEffects({
        lineNumber: index + 1,
        raw,
        milestone: scope.milestone,
        sourcePath,
        canonicalPath,
        sourceSha256,
        currentLabel,
      })) {
        effects.push(applyClassification(effect, classifications));
      }
    }
  }

  return {
    schemaVersion: 'source-effect-ledger/v1',
    generatedAt: new Date().toISOString(),
    milestone: scope.milestone,
    purpose:
      'Generated inventory of original-source effects. This is a verifiable source index, not completion evidence.',
    trustRules: [
      'original-game ERB/CSV files remain the source of truth',
      'every row must keep sourcePath, sourceLine, raw, and sourceSha256',
      'unclassified or blocked rows prevent source-effect closure',
      'transferred rows require sender and receiver evidence in transfer contracts',
      'excluded rows require explicit original-source justification',
    ],
    sources,
    summary: {
      totalEffects: effects.length,
      byKind: countBy(effects, (row) => row.kind),
      byStatus: countBy(effects, (row) => row.status),
      bySourcePath: countBy(effects, (row) => row.sourcePath),
      needsReview: effects.filter((row) => row.needsReviewReasons.length > 0).length,
    },
    effects,
  };
}

const scopes = readJson(root, scopesPath, { scopes: [] }).scopes ?? [];
const selectedScopes = requestedMilestone ? scopes.filter((scope) => scope.milestone === requestedMilestone) : scopes;
if (selectedScopes.length === 0) {
  throw new Error(`No source-effect scope configured${requestedMilestone ? ` for ${requestedMilestone}` : ''}.`);
}

for (const scope of selectedScopes) {
  const ledger = buildForScope(scope);
  writeJson(root, effectLedgerPath(scope.milestone), ledger);
  console.log(
    `coverage:source-effects wrote ${scope.milestone}: ${ledger.summary.totalEffects} effect(s), unclassified=${ledger.summary.byStatus.unclassified ?? 0}.`,
  );
}
