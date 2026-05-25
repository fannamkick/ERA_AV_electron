import * as fs from 'fs';
import * as path from 'path';
import { parseCommandId } from './legacyEvidenceLoader';
import type { EvidenceFile } from '../types';

export interface OriginalErbEvidenceBundle {
  commandId: string;
  commandNumber: number;
  files: EvidenceFile[];
}

function normalizePath(filePath: string): string {
  return filePath.replace(/\\/g, '/');
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

function readLines(filePath: string): string[] {
  return fs.readFileSync(filePath, 'utf-8').replace(/^\uFEFF/, '').split(/\r?\n/);
}

function evidenceSlice(
  filePath: string,
  lines: readonly string[],
  startLine: number,
  endLine: number,
  label: string,
): EvidenceFile {
  const safeStart = Math.max(1, startLine);
  const safeEnd = Math.min(lines.length, Math.max(safeStart, endLine));
  return {
    path: `${normalizePath(filePath)}#${label}`,
    originalPath: normalizePath(filePath),
    range: { startLine: safeStart, endLine: safeEnd },
    content: lines.slice(safeStart - 1, safeEnd).join('\n'),
    truncated: safeStart !== 1 || safeEnd !== lines.length,
  };
}

function findOriginalGameRoot(webPortRoot: string): string {
  return path.resolve(webPortRoot, '..', 'original-game');
}

function findFileByName(root: string, fileName: string): string | undefined {
  const normalizedName = fileName.toLowerCase();
  return walkFiles(root).find((file) => path.basename(file).toLowerCase() === normalizedName);
}

function sliceComableBlock(filePath: string, commandNumber: number): EvidenceFile | undefined {
  const lines = readLines(filePath);
  const label = `COM_ABLE${commandNumber}`;
  const startIndex = lines.findIndex((line) => new RegExp(`^\\s*@${label}\\b`, 'i').test(line));
  if (startIndex < 0) return undefined;

  let endIndex = lines.length - 1;
  for (let index = startIndex + 1; index < lines.length; index += 1) {
    if (/^\s*@COM_ABLE\d+\b/i.test(lines[index])) {
      endIndex = index - 1;
      break;
    }
  }

  const commentStart = Math.max(0, startIndex - 2);
  return evidenceSlice(filePath, lines, commentStart + 1, endIndex + 1, label);
}

export function loadOriginalErbEvidenceBundle(
  webPortRoot: string,
  commandId: string,
): OriginalErbEvidenceBundle {
  const parsed = parseCommandId(commandId);
  const originalRoot = findOriginalGameRoot(webPortRoot);
  const commandFile = findFileByName(originalRoot, `${parsed.normalized}.ERB`);
  const comableFile = findFileByName(originalRoot, 'COMABLE.ERB');

  const files: EvidenceFile[] = [];
  if (commandFile) {
    const lines = readLines(commandFile);
    files.push(evidenceSlice(commandFile, lines, 1, lines.length, `${parsed.normalized}`));
  }
  if (comableFile) {
    const comableBlock = sliceComableBlock(comableFile, parsed.number);
    if (comableBlock) files.push(comableBlock);
  }

  if (!commandFile) {
    throw new Error(`Original ERB file not found for ${parsed.normalized} under ${originalRoot}.`);
  }
  if (!comableFile) {
    throw new Error(`COMABLE.ERB not found under ${originalRoot}.`);
  }

  return {
    commandId: parsed.normalized,
    commandNumber: parsed.number,
    files,
  };
}

export function formatOriginalErbEvidenceForPrompt(bundle: OriginalErbEvidenceBundle): string {
  return bundle.files
    .map((file) => [
      `--- FILE: ${file.path}${file.range ? ` [LINES ${file.range.startLine}-${file.range.endLine}]` : ''} ---`,
      file.content,
    ].join('\n'))
    .join('\n\n');
}
