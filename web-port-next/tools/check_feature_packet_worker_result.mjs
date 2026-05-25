import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

function usage() {
  console.error('Usage: node tools/check_feature_packet_worker_result.mjs <packetId|packetPath> <workerResultJson>');
  process.exit(1);
}

function slug(value) {
  return String(value)
    .replace(/[^A-Za-z0-9]+/gu, '-')
    .replace(/^-+|-+$/gu, '')
    .toLowerCase();
}

function packetPath(input) {
  if (input.endsWith('.json') || input.includes('/') || input.includes('\\')) return input.replaceAll('\\', '/');
  return `data/implementation-packets/${slug(input)}.json`;
}

function readJson(relativePath) {
  const absolutePath = path.join(root, relativePath);
  if (!fs.existsSync(absolutePath)) throw new Error(`Missing file: ${relativePath}`);
  return JSON.parse(fs.readFileSync(absolutePath, 'utf8'));
}

function effectIdsFromSection(result, name) {
  const rows = result[name];
  if (!Array.isArray(rows)) throw new Error(`worker result ${name} must be an array`);
  return rows.map((row) => {
    if (typeof row === 'string') return row;
    return row?.effectId;
  });
}

function fail(message, detail) {
  console.error(`check:feature-packet-worker-result failed: ${message}`);
  if (detail) console.error(JSON.stringify(detail, null, 2));
  process.exit(1);
}

const [packetInput, resultInput] = process.argv.slice(2);
if (!packetInput || !resultInput || packetInput === '--help' || packetInput === '-h') usage();

try {
  const packetRelativePath = packetPath(packetInput);
  const packet = readJson(packetRelativePath);
  const result = readJson(resultInput.replaceAll('\\', '/'));

  const packetEffectIds = new Set((packet.sourceEffects?.rows ?? []).map((row) => row.effectId));
  if (packetEffectIds.size === 0) {
    throw new Error('packet has no sourceEffects.rows effect ids to account for');
  }

  const accountingSections = ['implementedEffects', 'remainingEffects', 'transferredEffects', 'excludedEffects'];
  const seen = new Map();
  for (const section of accountingSections) {
    for (const effectId of effectIdsFromSection(result, section)) {
      if (!effectId) {
        throw new Error(`${section} contains a row without effectId`);
      }
      if (!packetEffectIds.has(effectId)) {
        throw new Error(`${section} references effectId not present in packet: ${effectId}`);
      }
      if (!seen.has(effectId)) seen.set(effectId, []);
      seen.get(effectId).push(section);
    }
  }

  const missing = [...packetEffectIds].filter((effectId) => !seen.has(effectId));
  const duplicated = [...seen.entries()]
    .filter(([, sections]) => sections.length !== 1)
    .map(([effectId, sections]) => ({ effectId, sections }));

  if (missing.length > 0 || duplicated.length > 0) {
    fail('worker result does not account for packet effects exactly once', {
      packet: packetRelativePath,
      missing: missing.slice(0, 50),
      missingCount: missing.length,
      duplicated: duplicated.slice(0, 50),
      duplicatedCount: duplicated.length,
    });
  }

  console.log(
    `check:feature-packet-worker-result passed ${resultInput} for ${packetRelativePath} (${packetEffectIds.size} effect id(s) accounted exactly once).`,
  );
} catch (error) {
  fail(error instanceof Error ? error.message : String(error));
}
