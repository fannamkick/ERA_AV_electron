import * as fs from 'fs';
import * as path from 'path';
import type { EvidenceBundle, EvidenceFile } from '../types';

const DEFAULT_MAX_CHARS_PER_FILE = 28000;

function readIfExists(filePath: string, maxChars: number): EvidenceFile | undefined {
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) return undefined;
  const raw = fs.readFileSync(filePath, 'utf-8').replace(/^\uFEFF/, '');
  return {
    path: filePath.replace(/\\/g, '/'),
    content: raw.length > maxChars ? raw.slice(0, maxChars) : raw,
    truncated: raw.length > maxChars,
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
): EvidenceBundle {
  const parsed = parseCommandId(commandId);
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
    files,
  };
}

export function formatEvidenceForPrompt(bundle: EvidenceBundle): string {
  return bundle.files
    .map((file) => [
      `--- FILE: ${file.path}${file.truncated ? ' [TRUNCATED]' : ''} ---`,
      file.content,
    ].join('\n'))
    .join('\n\n');
}
