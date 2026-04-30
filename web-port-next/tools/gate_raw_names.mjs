import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const targets = ['src/game', 'src/domains', 'src/features', 'src/ui'];
const forbidden = /\b(?:CFLAG|TFLAG|SOURCE|TEQUIP|ITEMSALES|BOUGHT|COMF|SCENE_|LOSEBASE)\b/;
const extensions = new Set(['.ts', '.tsx']);

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

const matches = [];

for (const target of targets) {
  for (const file of walk(join(root, target))) {
    const text = readFileSync(file, 'utf8');
    text.split(/\r?\n/).forEach((line, index) => {
      if (forbidden.test(line)) {
        matches.push(`${relative(root, file)}:${index + 1}: ${line.trim()}`);
      }
    });
  }
}

if (matches.length > 0) {
  console.error('gate:raw-names failed. Runtime code must not use legacy variable names directly.');
  console.error(matches.join('\n'));
  process.exit(1);
}

console.log('gate:raw-names passed: no direct legacy variable names in runtime paths.');
