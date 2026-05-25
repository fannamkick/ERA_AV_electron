import * as fs from 'fs';
import * as path from 'path';
import type { EvidenceBundle, EvidenceFile } from '../types';

const DEFAULT_MAX_CHARS_PER_FILE = 28000;
export type EvidenceMode = 'full' | 'sliced';

function normalizePath(filePath: string): string {
  return filePath.replace(/\\/g, '/');
}

function readIfExists(filePath: string, maxChars: number): EvidenceFile | undefined {
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) return undefined;
  const raw = fs.readFileSync(filePath, 'utf-8').replace(/^\uFEFF/, '');
  return {
    path: normalizePath(filePath),
    content: raw.length > maxChars ? raw.slice(0, maxChars) : raw,
    truncated: raw.length > maxChars,
  };
}

function readLinesIfExists(filePath: string): string[] | undefined {
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) return undefined;
  return fs.readFileSync(filePath, 'utf-8').replace(/^\uFEFF/, '').split(/\r?\n/);
}

function evidenceSlice(
  filePath: string,
  lines: readonly string[],
  startLine: number,
  endLine: number,
  label?: string,
): EvidenceFile {
  const safeStart = Math.max(1, startLine);
  const safeEnd = Math.min(lines.length, Math.max(safeStart, endLine));
  const suffix = label ? `#${label}` : `#L${safeStart}-L${safeEnd}`;
  return {
    path: `${normalizePath(filePath)}${suffix}`,
    originalPath: normalizePath(filePath),
    range: { startLine: safeStart, endLine: safeEnd },
    content: lines.slice(safeStart - 1, safeEnd).join('\n'),
    truncated: safeStart !== 1 || safeEnd !== lines.length,
  };
}

function findBraceBalancedEnd(lines: readonly string[], startIndex: number): number {
  let depth = 0;
  let sawBrace = false;

  for (let index = startIndex; index < lines.length; index += 1) {
    const line = lines[index];
    for (const char of line) {
      if (char === '{') {
        depth += 1;
        sawBrace = true;
      } else if (char === '}') {
        depth -= 1;
        if (sawBrace && depth <= 0) return index;
      }
    }
  }

  return Math.min(lines.length - 1, startIndex + 120);
}

function sliceAroundPattern(
  filePath: string,
  pattern: RegExp,
  beforeLines: number,
  afterLines: number,
  label?: string,
): EvidenceFile | undefined {
  const lines = readLinesIfExists(filePath);
  if (!lines) return undefined;
  const index = lines.findIndex((line) => pattern.test(line));
  if (index < 0) return undefined;
  return evidenceSlice(filePath, lines, index + 1 - beforeLines, index + 1 + afterLines, label);
}

function sliceExportedFunction(filePath: string, symbol: string): EvidenceFile | undefined {
  const lines = readLinesIfExists(filePath);
  if (!lines) return undefined;
  const pattern = new RegExp(`export\\s+(?:const|function)\\s+${symbol}\\b`);
  const startIndex = lines.findIndex((line) => pattern.test(line));
  if (startIndex < 0) return undefined;
  const endIndex = findBraceBalancedEnd(lines, startIndex);
  return evidenceSlice(filePath, lines, startIndex + 1, endIndex + 1, symbol);
}

function sliceTrainingCommandDefinition(filePath: string, originalId: number): EvidenceFile | undefined {
  const lines = readLinesIfExists(filePath);
  if (!lines) return undefined;

  for (let index = 0; index < lines.length; index += 1) {
    if (!/defineTrainingCommand\s*\(\s*\{/.test(lines[index])) continue;
    const endIndex = findBraceBalancedEnd(lines, index);
    const content = lines.slice(index, endIndex + 1).join('\n');
    if (new RegExp(`originalId\\s*:\\s*${originalId}\\b`).test(content)) {
      return evidenceSlice(filePath, lines, index + 1, endIndex + 1, `current-command-${originalId}`);
    }
  }

  return undefined;
}

function sliceObjectPropertyFunction(filePath: string, property: number, label: string): EvidenceFile | undefined {
  const lines = readLinesIfExists(filePath);
  if (!lines) return undefined;
  const pattern = new RegExp(`^\\s*${property}\\s*:\\s*\\(`);
  const startIndex = lines.findIndex((line) => pattern.test(line));
  if (startIndex < 0) return undefined;
  const endIndex = findBraceBalancedEnd(lines, startIndex);
  return evidenceSlice(filePath, lines, startIndex + 1, endIndex + 1, label);
}

function sliceMarkdownSection(filePath: string, headingPattern: RegExp, maxLines: number, label: string): EvidenceFile | undefined {
  const lines = readLinesIfExists(filePath);
  if (!lines) return undefined;
  const startIndex = lines.findIndex((line) => headingPattern.test(line));
  if (startIndex < 0) return undefined;
  let endIndex = Math.min(lines.length - 1, startIndex + maxLines - 1);
  for (let index = startIndex + 1; index <= endIndex; index += 1) {
    if (/^#{1,2}\s+/.test(lines[index])) {
      endIndex = index - 1;
      break;
    }
  }
  return evidenceSlice(filePath, lines, startIndex + 1, endIndex + 1, label);
}

function syntheticEvidence(pathLabel: string, content: string): EvidenceFile {
  return {
    path: pathLabel,
    content,
    truncated: false,
  };
}

function walkFiles(root: string): string[] {
  if (!fs.existsSync(root)) return [];
  const result: string[] = [];
  const stack = [root];

  while (stack.length > 0) {
    const current = stack.pop();
    if (!current) continue;
    const stat = fs.statSync(current);
    if (stat.isDirectory()) {
      for (const child of fs.readdirSync(current)) {
        stack.push(path.join(current, child));
      }
    } else if (stat.isFile()) {
      result.push(current);
    }
  }

  return result.sort();
}

function findCommandEvidence(webPortRoot: string, commandNumber: number): string[] {
  const legacyRoot = path.join(webPortRoot, 'src', 'legacy', 'training', 'commands');
  const exactPatterns = [
    new RegExp(`COMF${commandNumber}[_\\-.]`, 'i'),
    new RegExp(`COMF${commandNumber}\\.`, 'i'),
    new RegExp(`Com${commandNumber}Command\\.ts$`, 'i'),
  ];

  return walkFiles(legacyRoot).filter((file) => {
    const normalized = file.replace(/\\/g, '/');
    return exactPatterns.some((pattern) => pattern.test(normalized));
  });
}

function currentResolverNames(commandNumber: number): string[] {
  const prefixByCommand: Record<number, string> = {
    0: 'comf0',
    1: 'comf1',
    6: 'comf6',
  };
  const prefix = prefixByCommand[commandNumber];
  if (!prefix) return [];
  return [
    `${prefix}SourceEffects`,
    `${prefix}StainPostEffects`,
    `${prefix}ExperiencePostEffects`,
  ];
}

function findCurrentImplementationEvidence(webPortRoot: string, commandNumber: number): EvidenceFile[] {
  const basicCommandsPath = path.join(webPortRoot, 'src', 'content', 'training', 'basicCommands.ts');
  const sourceResolversPath = path.join(webPortRoot, 'src', 'domain', 'training', 'sourceEffectResolvers.ts');
  const stainResolversPath = path.join(webPortRoot, 'src', 'domain', 'training', 'stainEffectResolvers.ts');
  const experienceResolversPath = path.join(webPortRoot, 'src', 'domain', 'training', 'experienceEffectResolvers.ts');
  const verifyFoundationPath = path.join(webPortRoot, 'tools', 'verify_foundation.ts');

  const commandDefinition = sliceTrainingCommandDefinition(basicCommandsPath, commandNumber);
  const resolverNames = currentResolverNames(commandNumber);
  const resolverPaths = [sourceResolversPath, stainResolversPath, experienceResolversPath];
  const resolverSlices = resolverNames.flatMap((symbol) =>
    resolverPaths.map((filePath) => sliceExportedFunction(filePath, symbol)),
  ).filter((file): file is EvidenceFile => file !== undefined);
  const verificationSlice = sliceAroundPattern(
    verifyFoundationPath,
    new RegExp(`COMF${commandNumber}\\s+should`, 'i'),
    16,
    80,
    `current-verification-${commandNumber}`,
  ) ?? sliceAroundPattern(
    verifyFoundationPath,
    new RegExp(`COMF${commandNumber}\\b|comf${commandNumber}(?:Source|Stain|Experience)`, 'i'),
    10,
    80,
    `current-verification-${commandNumber}`,
  );

  const coverageNotes = [
    `Command: COMF${commandNumber}.`,
    `Current command definition found: ${commandDefinition ? 'yes' : 'no'}.`,
    `Current resolver slices found: ${resolverSlices.map((file) => file.path.split('#').pop()).join(', ') || 'none'}.`,
    `Current verification slice found: ${verificationSlice ? 'yes' : 'no'}.`,
    'If current command definition, current resolvers, and verification evidence exist, treat the command as already implemented unless legacy evidence shows a concrete unresolved mismatch.',
    'For already implemented commands, prefer a no-op/spec draft over duplicate executable code.',
  ];

  const slices: Array<EvidenceFile | undefined> = [
    syntheticEvidence('ai-port://current-implementation-policy', [
      'Current implementation evidence describes what the web port already implements.',
      'Use it to avoid duplicate drafts and to identify already-migrated behavior.',
      'Do not treat current implementation as the canonical legacy source when it conflicts with original ERB evidence.',
      'If current implementation and legacy evidence disagree, report the conflict and prefer a spec-only draft.',
    ].join('\n')),
    syntheticEvidence('ai-port://current-implementation-summary', coverageNotes.join('\n')),
    commandDefinition,
    ...resolverSlices,
    verificationSlice,
  ];

  return slices.filter((file): file is EvidenceFile => file !== undefined);
}

export function parseCommandId(commandId: string): { normalized: string; number: number } {
  const match = /^COMF?(\d+)$/i.exec(commandId.trim());
  if (!match) {
    throw new Error(`Expected command id like COMF7, got: ${commandId}`);
  }
  const number = Number(match[1]);
  if (!Number.isInteger(number) || number < 0) {
    throw new Error(`Invalid command number: ${commandId}`);
  }
  return { normalized: `COMF${number}`, number };
}

export function loadEvidenceBundle(
  webPortRoot: string,
  commandId: string,
  maxCharsPerFile = DEFAULT_MAX_CHARS_PER_FILE,
  mode: EvidenceMode = 'sliced',
): EvidenceBundle {
  const parsed = parseCommandId(commandId);
  if (mode === 'sliced') {
    return loadSlicedEvidenceBundle(webPortRoot, parsed.normalized, parsed.number, maxCharsPerFile);
  }

  const docs = [
    'docs/TRAINING_PORTING_SCHEMA.md',
    'docs/TRAINING_COMMAND_SPEC.md',
    'docs/TRAINING_MIGRATION_READINESS.md',
    'docs/TRAINING_CANONICAL_SOURCES.md',
    'docs/PORTING_ARCHITECTURE.md',
  ].map((relative) => path.join(webPortRoot, relative));

  const evidencePaths = [
    ...docs,
    ...findCommandEvidence(webPortRoot, parsed.number),
    ...findCurrentImplementationEvidence(webPortRoot, parsed.number).map((file) => file.originalPath ?? file.path),
    path.join(webPortRoot, 'src', 'legacy', 'training', 'commands', 'availability.ts'),
    path.join(webPortRoot, 'src', 'legacy', 'training', 'commands', 'commandAvailability.ts'),
    path.join(webPortRoot, 'src', 'legacy', 'training', 'systems', 'SourceCheck.ts'),
    path.join(webPortRoot, 'src', 'legacy', 'training', 'systems', 'CommandChainHandler.ts'),
  ];

  const seen = new Set<string>();
  const files = evidencePaths
    .filter((file) => {
      const key = path.resolve(file);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .map((file) => readIfExists(file, maxCharsPerFile))
    .filter((file): file is EvidenceFile => file !== undefined);

  return {
    commandId: parsed.normalized,
    commandNumber: parsed.number,
    mode: 'full',
    files,
  };
}

function loadSlicedEvidenceBundle(
  webPortRoot: string,
  normalizedCommandId: string,
  commandNumber: number,
  maxCharsPerFile: number,
): EvidenceBundle {
  const commandFiles = findCommandEvidence(webPortRoot, commandNumber)
    .map((file) => readIfExists(file, maxCharsPerFile))
    .filter((file): file is EvidenceFile => file !== undefined);
  const currentImplementationFiles = findCurrentImplementationEvidence(webPortRoot, commandNumber);

  const availabilityPath = path.join(webPortRoot, 'src', 'legacy', 'training', 'commands', 'availability.ts');
  const commandAvailabilityPath = path.join(webPortRoot, 'src', 'legacy', 'training', 'commands', 'commandAvailability.ts');
  const sourceCheckPath = path.join(webPortRoot, 'src', 'legacy', 'training', 'systems', 'SourceCheck.ts');
  const commandChainPath = path.join(webPortRoot, 'src', 'legacy', 'training', 'systems', 'CommandChainHandler.ts');
  const readinessPath = path.join(webPortRoot, 'docs', 'TRAINING_MIGRATION_READINESS.md');
  const canonicalPath = path.join(webPortRoot, 'docs', 'TRAINING_CANONICAL_SOURCES.md');
  const schemaPath = path.join(webPortRoot, 'docs', 'TRAINING_PORTING_SCHEMA.md');

  const slices: Array<EvidenceFile | undefined> = [
    syntheticEvidence('ai-port://evidence-slice-policy', [
      `Evidence mode: sliced.`,
      `Command: ${normalizedCommandId} (${commandNumber}).`,
      'Only command-specific blocks and short architecture/readiness excerpts are included.',
      'If a referenced source is absent from this bundle, record a missing-evidence note instead of guessing.',
    ].join('\n')),
    sliceMarkdownSection(readinessPath, /^##\s+Readiness Levels/i, 48, 'readiness-levels'),
    sliceMarkdownSection(canonicalPath, /^##\s+COMF0-19/i, 46, 'comf0-19-policy'),
    sliceMarkdownSection(schemaPath, /^##\s+Command Definition Contract/i, 70, 'command-contract'),
    sliceExportedFunction(availabilityPath, `COM_ABLE${commandNumber}`),
    sliceObjectPropertyFunction(commandAvailabilityPath, commandNumber, `COMMAND_AVAILABLE_${commandNumber}`),
    sliceAroundPattern(sourceCheckPath, /params\[[0-9]+\].*source\[[0-9]+\]|source\[[0-9]+\].*params\[[0-9]+\]/, 12, 70, 'source-index-map'),
    sliceAroundPattern(commandChainPath, new RegExp(`COMF?${commandNumber}\\b|case\\s+${commandNumber}\\b|previousCommand.*${commandNumber}\\b`, 'i'), 20, 80, `command-chain-${commandNumber}`),
    ...currentImplementationFiles,
    ...commandFiles,
  ];

  const files = slices.filter((file): file is EvidenceFile => file !== undefined);

  if (!files.some((file) => file.path.includes('CommandChainHandler.ts'))) {
    files.push(syntheticEvidence('ai-port://command-chain-search', `No command-specific CommandChainHandler evidence found for ${normalizedCommandId}. Do not infer remap behavior from generic chain infrastructure.`));
  }

  return {
    commandId: normalizedCommandId,
    commandNumber,
    mode: 'sliced',
    files,
  };
}

export function formatEvidenceForPrompt(bundle: EvidenceBundle): string {
  return bundle.files
    .map((file) => [
      `--- FILE: ${file.path}${file.truncated ? ' [TRUNCATED/SLICED]' : ''} ---`,
      file.content,
    ].join('\n'))
    .join('\n\n');
}
