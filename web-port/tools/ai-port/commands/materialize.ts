import * as fs from 'fs';
import * as path from 'path';
import type { AutopilotResult, CommandDraft } from '../types';
import { validateCommandDraft } from '../validators/reportValidator';

function readJson<T>(filePath: string): T {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8').replace(/^\uFEFF/, '')) as T;
}

function assertInsideWorkspace(workspaceRoot: string, targetPath: string): void {
  const resolvedRoot = path.resolve(workspaceRoot);
  const resolvedTarget = path.resolve(workspaceRoot, targetPath);
  if (resolvedTarget !== resolvedRoot && !resolvedTarget.startsWith(`${resolvedRoot}${path.sep}`)) {
    throw new Error(`Refusing to write outside workspace: ${targetPath}`);
  }
}

function normalizeDraftPath(filePath: string): string {
  return filePath.replace(/\\/g, '/').replace(/^web-port\//, '');
}

export interface MaterializeOptions {
  webPortRoot: string;
  resultPath: string;
  force?: boolean;
}

export function materializeApprovalCandidate(options: MaterializeOptions): {
  ok: boolean;
  written: string[];
} {
  const result = readJson<AutopilotResult>(options.resultPath);
  if (result.classification !== 'approval-candidate') {
    throw new Error(`Refusing to materialize non approval-candidate: ${result.classification}`);
  }
  if (!result.draftPath) {
    throw new Error('Autopilot result does not reference a draftPath.');
  }

  const draftPath = path.isAbsolute(result.draftPath)
    ? result.draftPath
    : path.resolve(options.webPortRoot, result.draftPath);
  const draft = readJson<CommandDraft>(draftPath);
  const validation = validateCommandDraft(draft);
  if (!validation.ok) {
    throw new Error(`Draft validation failed:\n${validation.errors.join('\n')}`);
  }

  const written: string[] = [];
  for (const file of draft.files) {
    const normalizedPath = normalizeDraftPath(file.path);
    assertInsideWorkspace(options.webPortRoot, normalizedPath);
    const absoluteTarget = path.resolve(options.webPortRoot, normalizedPath);
    const exists = fs.existsSync(absoluteTarget);

    if (file.operation === 'create' && exists && !options.force) {
      throw new Error(`Refusing to overwrite existing file without --force: ${normalizedPath}`);
    }

    if (file.operation === 'update' && !exists) {
      throw new Error(`Refusing to update missing file: ${normalizedPath}`);
    }

    fs.mkdirSync(path.dirname(absoluteTarget), { recursive: true });
    fs.writeFileSync(absoluteTarget, file.content, 'utf-8');
    written.push(normalizedPath);
  }

  return { ok: true, written };
}
