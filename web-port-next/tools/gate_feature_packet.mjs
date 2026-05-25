import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

function usage() {
  console.error('Usage: node tools/gate_feature_packet.mjs <packetId|relativePacketPath>');
  process.exit(1);
}

function readJson(relativePath) {
  const absolutePath = path.join(root, relativePath);
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Missing packet: ${relativePath}`);
  }
  return JSON.parse(fs.readFileSync(absolutePath, 'utf8'));
}

function packetPath(input) {
  if (input.endsWith('.json') || input.includes('/') || input.includes('\\')) return input.replaceAll('\\', '/');
  const slug = String(input)
    .replace(/[^A-Za-z0-9]+/gu, '-')
    .replace(/^-+|-+$/gu, '')
    .toLowerCase();
  return `data/implementation-packets/${slug}.json`;
}

function fail(message, detail) {
  console.error(`gate:feature-packet failed: ${message}`);
  if (detail) console.error(JSON.stringify(detail, null, 2));
  process.exit(1);
}

function assert(condition, message, detail) {
  if (!condition) fail(message, detail);
}

const input = process.argv[2];
if (!input || input === '--help' || input === '-h') usage();

try {
  const relativePath = packetPath(input);
  const packet = readJson(relativePath);

  assert(packet.schemaVersion === 'feature-implementation-packet/v1', 'Unexpected packet schema.', {
    path: relativePath,
    schemaVersion: packet.schemaVersion,
  });

  assert(Array.isArray(packet.sourceFiles) && packet.sourceFiles.length > 0, 'Packet has no source files.', {
    path: relativePath,
  });

  assert(packet.assertions?.completeness?.ok === true, 'Packet source path/file-summary completeness failed.', {
    missingFileSummaryRows: packet.assertions?.completeness?.missingFileSummaryRows ?? [],
    unresolvedSourcePaths: packet.assertions?.completeness?.unresolvedSourcePaths ?? [],
    ambiguousSourcePaths: packet.assertions?.completeness?.ambiguousSourcePaths ?? [],
  });

  const activeSourcePaths = new Set(packet.scope?.activeSourcePaths ?? packet.scope?.sourcePaths ?? []);
  const missingSourceFiles = [...activeSourcePaths].filter((sourcePath) => !packet.sourceFiles.some((row) => row.sourcePath === sourcePath));
  assert(missingSourceFiles.length === 0, 'Some active scoped source paths are missing sourceFiles rows.', { missingSourceFiles });

  const outline = packet.sourceOutline ?? {};
  for (const [name, rows] of Object.entries({
    labels: outline.labels,
    outgoingCalls: outline.outgoingCalls,
    incomingCalls: outline.incomingCalls,
    dynamicCalls: outline.dynamicCalls,
    flowActions: outline.flowActions,
    stateAccesses: outline.stateAccesses,
    sourceSnippets: outline.sourceSnippets,
  })) {
    assert(Array.isArray(rows), `sourceOutline.${name} must be an array.`);
  }

  if (packet.sourceEffects?.available) {
    const pathsWithoutEffects = packet.sourceEffects?.summary?.sourcePathsWithoutEffects ?? [];
    assert(pathsWithoutEffects.length === 0, 'Source-effect ledger exists, but some active scoped source paths have no source-effect rows.', {
      pathsWithoutEffects,
    });
  }

  const rowsMissingSourcePath = [
    ...(packet.sourceOutline?.labels ?? []),
    ...(packet.sourceOutline?.outgoingCalls ?? []),
    ...(packet.sourceOutline?.incomingCalls ?? []),
    ...(packet.sourceOutline?.dynamicCalls ?? []),
    ...(packet.sourceOutline?.flowActions ?? []),
    ...(packet.sourceOutline?.stateAccesses ?? []),
    ...(packet.sourceEffects?.rows ?? []),
    ...(packet.existingImplementationClaims?.sourceUnits ?? []),
    ...(packet.existingImplementationClaims?.coverageRows ?? []),
  ].filter((row) => 'sourcePath' in row && !row.sourcePath);
  assert(rowsMissingSourcePath.length === 0, 'Some packet rows have empty sourcePath.', {
    count: rowsMissingSourcePath.length,
  });

  console.log(
    `gate:feature-packet passed ${relativePath} (${packet.sourceFiles.length} source file(s), ${packet.sourceOutline.labels.length} label(s), ${packet.sourceEffects.summary.rows} source-effect row(s)).`,
  );
} catch (error) {
  fail(error instanceof Error ? error.message : String(error));
}
