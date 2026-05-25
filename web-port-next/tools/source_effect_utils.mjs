import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

export const sourceEffectStatuses = new Set([
  'unclassified',
  'owned',
  'implemented',
  'transferred',
  'excluded',
  'blocked',
]);

export function readJson(root, relativePath, fallback = undefined) {
  const absolutePath = path.join(root, relativePath);
  if (!fs.existsSync(absolutePath)) return fallback;
  return JSON.parse(fs.readFileSync(absolutePath, 'utf8'));
}

export function writeJson(root, relativePath, value) {
  const absolutePath = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
  fs.writeFileSync(absolutePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

export function countBy(rows, keyFn) {
  const counts = {};
  for (const row of rows) {
    const key = keyFn(row) || '(empty)';
    counts[key] = (counts[key] ?? 0) + 1;
  }
  return Object.fromEntries(Object.entries(counts).sort(([a], [b]) => a.localeCompare(b)));
}

export function sha256(text) {
  return crypto.createHash('sha256').update(text).digest('hex');
}

export function fail(gateName, message, detail) {
  console.error(`${gateName} failed: ${message}`);
  if (detail) console.error(JSON.stringify(detail, null, 2));
  process.exit(1);
}

export function assertGate(gateName, condition, message, detail) {
  if (!condition) fail(gateName, message, detail);
}

export function normalizeSourcePath(value) {
  return String(value).replaceAll('\\', '/').replace(/^\.\.\//, '');
}

export function effectLedgerPath(milestone) {
  return `data/coverage/source-effects/${milestone}.effects.json`;
}

export function classificationPath(milestone) {
  return `data/coverage/source-effects/classifications/${milestone}.classification.json`;
}
