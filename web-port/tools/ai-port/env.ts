import * as fs from 'fs';
import * as path from 'path';

function unquote(value: string): string {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

export function loadLocalEnv(webPortRoot: string): string[] {
  const loaded: string[] = [];
  const envFiles = [
    path.join(webPortRoot, '.env.local'),
    path.join(webPortRoot, '.env'),
  ];

  for (const envPath of envFiles) {
    if (!fs.existsSync(envPath)) continue;
    const content = fs.readFileSync(envPath, 'utf-8').replace(/^\uFEFF/, '');

    for (const line of content.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const separatorIndex = trimmed.indexOf('=');
      if (separatorIndex <= 0) continue;

      const key = trimmed.slice(0, separatorIndex).trim();
      const value = unquote(trimmed.slice(separatorIndex + 1));
      if (!/^[A-Z_][A-Z0-9_]*$/.test(key)) continue;
      if (process.env[key] === undefined) {
        process.env[key] = value;
      }
    }

    loaded.push(envPath.replace(/\\/g, '/'));
  }

  return loaded;
}
