import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const root = process.cwd();
const targets = ['src/game', 'src/domains', 'src/features', 'src/ui', 'src/catalog'];
const allowlistPath = join(root, 'tools', 'm16_stub_allowlist.json');
const allowlist = JSON.parse(readFileSync(allowlistPath, 'utf8'));
const extensions = new Set(['.ts', '.tsx']);
const forbidden = /\b(?:TODO|FIXME|stub|placeholder|dummy|mock|notImplemented|needsDecision|missingMapping|needs-review|legacy[A-Za-z0-9_]*NeedingMapping)\b/i;

function normalize(path) {
  return path.split(sep).join('/');
}

function extension(path) {
  const index = path.lastIndexOf('.');
  return index >= 0 ? path.slice(index) : '';
}

function walk(dir) {
  if (!existsSync(dir)) return [];

  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    const stat = statSync(path);
    if (stat.isDirectory()) return walk(path);
    if (!stat.isFile() || !extensions.has(extension(path))) return [];
    return [path];
  });
}

function isAllowed(path, line) {
  return allowlist.some((entry) => entry.path === path && line.includes(entry.contains) && entry.reason && entry.milestone);
}

const blocked = [];
const allowed = [];

for (const target of targets) {
  for (const file of walk(join(root, target))) {
    const path = normalize(relative(root, file));
    const text = readFileSync(file, 'utf8');
    text.split(/\r?\n/).forEach((line, index) => {
      if (!forbidden.test(line)) return;

      const entry = `${path}:${index + 1}: ${line.trim()}`;
      if (isAllowed(path, line)) {
        allowed.push(entry);
      } else {
        blocked.push(entry);
      }
    });
  }
}

if (blocked.length > 0) {
  console.error('gate:stubs failed. Unregistered runtime placeholder/blocker markers were found.');
  console.error(blocked.join('\n'));
  console.error('\nKnown deferred markers must be registered in tools/m16_stub_allowlist.json with a reason and milestone.');
  process.exit(1);
}

console.log(`gate:stubs passed: ${allowed.length} documented deferred marker(s), 0 unregistered marker(s).`);
