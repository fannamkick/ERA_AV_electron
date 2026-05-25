import type {
  ErbCommandFacts,
  ErbFactReview,
  ErbFactRow,
  ErbUnparsedLine,
  EvidenceFile,
  ValidationResult,
} from '../types';

interface BehaviorToken {
  label: string;
  pattern: RegExp;
}

const BEHAVIOR_TOKENS: readonly BehaviorToken[] = [
  { label: 'SOURCE', pattern: /\bSOURCE(?::|:PLAYER:)/i },
  { label: 'BASE', pattern: /\bBASE(?::|:PLAYER:)/i },
  { label: 'LOSEBASE', pattern: /\bLOSEBASE(?::|:PLAYER:)/i },
  { label: 'EXP', pattern: /\bEXP(?::|:PLAYER:)/i },
  { label: 'FLAG', pattern: /\bFLAG:/i },
  { label: 'CFLAG', pattern: /\bCFLAG(?::|:PLAYER:)/i },
  { label: 'TFLAG', pattern: /\bTFLAG:/i },
  { label: 'TEQUIP', pattern: /\bTEQUIP:/i },
  { label: 'STAIN', pattern: /\bSTAIN(?::|:PLAYER:)/i },
  { label: 'CALL', pattern: /\bCALL\b/i },
  { label: 'CALLFORM', pattern: /\bCALLFORM\b/i },
  { label: 'RETURN', pattern: /\bRETURN\b/i },
  { label: 'TIMES', pattern: /\bTIMES\b/i },
  { label: 'IF', pattern: /^\s*IF\b/i },
  { label: 'ELSEIF', pattern: /^\s*ELSEIF\b/i },
  { label: 'ELSE', pattern: /^\s*ELSE\b/i },
  { label: 'SIF', pattern: /^\s*SIF\b/i },
];

const FACT_ARRAY_KEYS = [
  'availability',
  'sourceWrites',
  'baseWrites',
  'loseBaseWrites',
  'expWrites',
  'flagWrites',
  'equipmentWrites',
  'stainWrites',
  'formulaGates',
  'calls',
  'earlyReturns',
  'messages',
] as const;

type FactArrayKey = typeof FACT_ARRAY_KEYS[number];

function isObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function pushIfMissing(errors: string[], condition: unknown, message: string): void {
  if (!condition) errors.push(message);
}

function factRows(value: ErbCommandFacts): ErbFactRow[] {
  return FACT_ARRAY_KEYS.flatMap((key) => value[key] ?? []);
}

function rowCoversLine(row: Pick<ErbFactRow | ErbUnparsedLine, 'file' | 'lineStart' | 'lineEnd'>, file: EvidenceFile, line: number): boolean {
  const filePath = file.originalPath ?? file.path.split('#')[0];
  const rowFile = row.file.replace(/\\/g, '/');
  const normalizedFilePath = filePath.replace(/\\/g, '/');
  const normalizedEvidencePath = file.path.replace(/\\/g, '/');
  const sameFile = rowFile === normalizedEvidencePath ||
    rowFile === normalizedFilePath ||
    normalizedEvidencePath.startsWith(`${rowFile}#`) ||
    normalizedFilePath.endsWith(rowFile) ||
    pathBasename(normalizedFilePath).toLowerCase() === pathBasename(rowFile).toLowerCase();

  return sameFile &&
    row.lineStart <= line &&
    row.lineEnd >= line;
}

function pathBasename(filePath: string): string {
  const normalized = filePath.replace(/\\/g, '/');
  return normalized.slice(normalized.lastIndexOf('/') + 1);
}

function lineHasBehaviorToken(line: string): string[] {
  const trimmed = line.trim();
  if (trimmed.length === 0 || trimmed.startsWith(';')) return [];
  return BEHAVIOR_TOKENS
    .filter((token) => token.pattern.test(line))
    .map((token) => token.label);
}

function validateFactRow(errors: string[], warnings: string[], row: unknown, label: string): void {
  if (!isObject(row)) {
    errors.push(`${label} is not an object.`);
    return;
  }
  pushIfMissing(errors, typeof row.id === 'string' && row.id.trim().length > 0, `${label}.id is required.`);
  pushIfMissing(errors, typeof row.file === 'string' && row.file.trim().length > 0, `${label}.file is required.`);
  pushIfMissing(errors, typeof row.lineStart === 'number', `${label}.lineStart is required.`);
  pushIfMissing(errors, typeof row.lineEnd === 'number', `${label}.lineEnd is required.`);
  pushIfMissing(errors, typeof row.raw === 'string' && row.raw.trim().length > 0, `${label}.raw is required.`);
  pushIfMissing(errors, typeof row.summary === 'string' && row.summary.trim().length > 0, `${label}.summary is required.`);
  pushIfMissing(errors, typeof row.mustImplement === 'boolean', `${label}.mustImplement is required.`);
  pushIfMissing(errors, ['canonical', 'inferred', 'uncertain', 'unparsed'].includes(String(row.confidence)), `${label}.confidence is invalid.`);
  if (typeof row.lineStart === 'number' && typeof row.lineEnd === 'number' && row.lineEnd < row.lineStart) {
    errors.push(`${label}.lineEnd must be >= lineStart.`);
  }
  if (row.mustImplement === true && row.confidence === 'uncertain') {
    warnings.push(`${label} must be implemented but confidence is uncertain.`);
  }
}

function validateUnparsedLine(errors: string[], line: unknown, label: string): void {
  if (!isObject(line)) {
    errors.push(`${label} is not an object.`);
    return;
  }
  pushIfMissing(errors, typeof line.file === 'string' && line.file.trim().length > 0, `${label}.file is required.`);
  pushIfMissing(errors, typeof line.lineStart === 'number', `${label}.lineStart is required.`);
  pushIfMissing(errors, typeof line.lineEnd === 'number', `${label}.lineEnd is required.`);
  pushIfMissing(errors, typeof line.raw === 'string' && line.raw.trim().length > 0, `${label}.raw is required.`);
  pushIfMissing(errors, typeof line.reason === 'string' && line.reason.trim().length > 0, `${label}.reason is required.`);
  pushIfMissing(errors, typeof line.mayAffectBehavior === 'boolean', `${label}.mayAffectBehavior is required.`);
}

export function validateErbCommandFactsShape(value: unknown): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!isObject(value)) {
    return { ok: false, errors: ['Facts artifact is not an object.'], warnings };
  }

  pushIfMissing(errors, value.schemaVersion === 'erb-command-facts/v1', 'Invalid facts schemaVersion.');
  pushIfMissing(errors, isObject(value.command), 'Missing command object.');
  if (isObject(value.command)) {
    pushIfMissing(errors, typeof value.command.id === 'string', 'Missing command.id.');
    pushIfMissing(errors, typeof value.command.originalId === 'number', 'Missing command.originalId.');
  }
  pushIfMissing(errors, Array.isArray(value.sourceFiles), 'Missing sourceFiles array.');
  for (const key of FACT_ARRAY_KEYS) {
    pushIfMissing(errors, Array.isArray(value[key]), `Missing ${key} array.`);
    if (Array.isArray(value[key])) {
      value[key].forEach((row, index) => validateFactRow(errors, warnings, row, `${key}[${index}]`));
    }
  }
  pushIfMissing(errors, Array.isArray(value.unparsedLines), 'Missing unparsedLines array.');
  if (Array.isArray(value.unparsedLines)) {
    value.unparsedLines.forEach((line, index) => validateUnparsedLine(errors, line, `unparsedLines[${index}]`));
  }

  return { ok: errors.length === 0, errors, warnings };
}

export function validateErbCommandFactsCompleteness(
  facts: ErbCommandFacts,
  evidenceFiles: readonly EvidenceFile[],
): ValidationResult {
  const shape = validateErbCommandFactsShape(facts);
  const errors = [...shape.errors];
  const warnings = [...shape.warnings];
  const rows = factRows(facts);
  const unparsed = facts.unparsedLines ?? [];

  for (const file of evidenceFiles) {
    const start = file.range?.startLine ?? 1;
    const lines = file.content.split(/\r?\n/);
    for (let offset = 0; offset < lines.length; offset += 1) {
      const absoluteLine = start + offset;
      const tokens = lineHasBehaviorToken(lines[offset]);
      if (tokens.length === 0) continue;
      const covered = rows.some((row) => rowCoversLine(row, file, absoluteLine)) ||
        unparsed.some((line) => rowCoversLine(line, file, absoluteLine));
      if (!covered) {
        errors.push(`${file.path}:${absoluteLine} has behavior token(s) ${tokens.join(', ')} but is missing from fact rows and unparsedLines.`);
      }
    }
  }

  const requiredBehaviorRows = rows.filter((row) => row.mustImplement && row.confidence === 'unparsed');
  for (const row of requiredBehaviorRows) {
    errors.push(`${row.id} is marked mustImplement but confidence is unparsed.`);
  }

  return { ok: errors.length === 0, errors, warnings };
}

export function validateErbFactReview(value: unknown): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!isObject(value)) {
    return { ok: false, errors: ['Fact review is not an object.'], warnings };
  }

  pushIfMissing(errors, value.schemaVersion === 'erb-fact-review/v1', 'Invalid fact review schemaVersion.');
  pushIfMissing(errors, typeof value.approved === 'boolean', 'Missing approved boolean.');
  pushIfMissing(errors, ['low', 'medium', 'high'].includes(String(value.riskLevel)), 'Invalid riskLevel.');
  pushIfMissing(errors, Array.isArray(value.findings), 'Missing findings array.');
  pushIfMissing(errors, Array.isArray(value.missingFacts), 'Missing missingFacts array.');
  pushIfMissing(errors, Array.isArray(value.suggestedFixes), 'Missing suggestedFixes array.');

  const review = value as Partial<ErbFactReview>;
  if (review.approved === false) warnings.push('AI fact review did not approve the facts.');
  if (review.riskLevel === 'high') warnings.push('AI fact review classified the facts as high risk.');
  if ((review.missingFacts?.length ?? 0) > 0) warnings.push('AI fact review reported missing facts.');

  return { ok: errors.length === 0, errors, warnings };
}
