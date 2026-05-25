import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const repoRoot = path.resolve(root, '..');
const defaultOutputDir = 'data/implementation-packets';

function usage() {
  console.error(
    [
      'Usage: node tools/build_feature_packet.mjs <MILESTONE|PACKET_ID> [--source <sourcePath>] [--label <label>] [--review-group <id>] [--effect-id <id>] [--effect-id-file <path>] [--risk-id <riskId>] [--max-effects <n>] [--require-source-effects] [--id <packetId>] [--out <relativePath>]',
      '',
      'Examples:',
      '  node tools/build_feature_packet.mjs M35',
      '  node tools/build_feature_packet.mjs M35 --label EVENT_NEXTDAY --max-effects 50',
      '  node tools/build_feature_packet.mjs M35 --review-group M35:review:event-aftertrain:charadead-check --max-effects 50',
      '  node tools/build_feature_packet.mjs turnend --source original-game/ERB/.../EVENT_TURNEND.ERB --label EVENTTURNEND',
    ].join('\n'),
  );
  process.exit(1);
}

function parseArgs(argv) {
  const args = {
    id: '',
    milestone: '',
    sources: [],
    labels: [],
    riskIds: [],
    reviewGroupIds: [],
    effectIds: [],
    effectIdFiles: [],
    maxEffects: 0,
    requireSourceEffects: false,
    out: '',
    idExplicit: false,
  };

  const positional = [];
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--source') {
      args.sources.push(requireValue(argv, (index += 1), arg));
    } else if (arg === '--label') {
      args.labels.push(requireValue(argv, (index += 1), arg));
    } else if (arg === '--risk-id') {
      args.riskIds.push(requireValue(argv, (index += 1), arg));
    } else if (arg === '--review-group') {
      args.reviewGroupIds.push(requireValue(argv, (index += 1), arg));
    } else if (arg === '--effect-id') {
      args.effectIds.push(requireValue(argv, (index += 1), arg));
    } else if (arg === '--effect-id-file') {
      args.effectIdFiles.push(requireValue(argv, (index += 1), arg));
    } else if (arg === '--max-effects') {
      args.maxEffects = Number(requireValue(argv, (index += 1), arg));
      if (!Number.isInteger(args.maxEffects) || args.maxEffects < 1) {
        throw new Error('--max-effects requires a positive integer');
      }
    } else if (arg === '--require-source-effects') {
      args.requireSourceEffects = true;
    } else if (arg === '--id') {
      args.id = requireValue(argv, (index += 1), arg);
      args.idExplicit = true;
    } else if (arg === '--out') {
      args.out = requireValue(argv, (index += 1), arg);
    } else if (arg === '--help' || arg === '-h') {
      usage();
    } else if (arg.startsWith('--')) {
      throw new Error(`Unknown option: ${arg}`);
    } else {
      positional.push(arg);
    }
  }

  if (positional.length > 1) usage();
  const primary = positional[0] ?? args.id;
  if (!primary) usage();

  if (/^M\d+(?:\.\d+)?$/iu.test(primary)) {
    args.milestone = primary.toUpperCase();
    args.id = args.id || args.milestone;
  } else {
    args.id = args.id || primary;
  }

  if (
    args.milestone &&
    !args.idExplicit &&
    (args.labels.length > 0 || args.reviewGroupIds.length > 0 || args.effectIds.length > 0 || args.riskIds.length > 0)
  ) {
    args.id = [args.milestone, ...args.labels, ...args.reviewGroupIds, ...args.effectIds, ...args.riskIds].join('-');
  }

  return args;
}

function requireValue(argv, index, option) {
  const value = argv[index];
  if (!value || value.startsWith('--')) throw new Error(`${option} requires a value`);
  return value;
}

function normalizeSourcePath(value) {
  return String(value ?? '')
    .replaceAll('\\', '/')
    .replace(/^\.\.\//u, '')
    .replace(/^\.\//u, '');
}

function slug(value) {
  return (
    String(value || 'packet')
      .replace(/\\/gu, '/')
      .replace(/[^A-Za-z0-9]+/gu, '-')
      .replace(/^-+|-+$/gu, '')
      .toLowerCase()
      .slice(0, 120) || 'packet'
  );
}

function readText(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8').replace(/^\uFEFF/u, '');
}

function readJson(relativePath, fallback = null) {
  const absolutePath = path.join(root, relativePath);
  if (!fs.existsSync(absolutePath)) return fallback;
  return JSON.parse(fs.readFileSync(absolutePath, 'utf8'));
}

function readLines(relativePath) {
  const absolutePath = path.join(root, relativePath);
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Missing input file: ${relativePath}`);
  }
  return fs
    .readFileSync(absolutePath, 'utf8')
    .replace(/^\uFEFF/u, '')
    .split(/\r?\n/u)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'));
}

function writeJson(relativePath, value) {
  const absolutePath = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
  fs.writeFileSync(absolutePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

function readTsv(relativePath) {
  const absolutePath = path.join(root, relativePath);
  if (!fs.existsSync(absolutePath)) return [];
  const lines = readText(relativePath).split(/\r?\n/u).filter((line) => line.length > 0);
  if (lines.length === 0) return [];
  const headers = lines[0].split('\t');
  return lines.slice(1).map((line) => {
    const cells = line.split('\t');
    return Object.fromEntries(headers.map((header, index) => [header, cells[index] ?? '']));
  });
}

function countBy(rows, keyFn) {
  const counts = {};
  for (const row of rows) {
    const key = keyFn(row) || '(empty)';
    counts[key] = (counts[key] ?? 0) + 1;
  }
  return Object.fromEntries(Object.entries(counts).sort(([a], [b]) => a.localeCompare(b)));
}

function sumBy(rows, key) {
  return rows.reduce((total, row) => total + (Number(row[key]) || 0), 0);
}

function indexBy(rows, keyFn) {
  const map = new Map();
  for (const row of rows) {
    const key = keyFn(row);
    if (!key) continue;
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(row);
  }
  return map;
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function stableSortRows(rows, selectors) {
  return [...rows].sort((a, b) => {
    for (const selector of selectors) {
      const left = String(typeof selector === 'function' ? selector(a) : a[selector] ?? '');
      const right = String(typeof selector === 'function' ? selector(b) : b[selector] ?? '');
      const comparison = left.localeCompare(right, undefined, { numeric: true });
      if (comparison !== 0) return comparison;
    }
    return 0;
  });
}

function walkFiles(startDir) {
  if (!fs.existsSync(startDir)) return [];
  const stack = [startDir];
  const files = [];
  while (stack.length > 0) {
    const current = stack.pop();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const absolutePath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(absolutePath);
      } else if (entry.isFile()) {
        files.push(absolutePath);
      }
    }
  }
  return files.sort((a, b) => a.localeCompare(b));
}

function buildActualSourceIndex() {
  const roots = [path.join(repoRoot, 'original-game')];
  const byNormalized = new Map();
  const byBasename = new Map();

  for (const file of roots.flatMap((item) => walkFiles(item))) {
    const relativePath = normalizeSourcePath(path.relative(repoRoot, file));
    byNormalized.set(relativePath, file);
    const basename = path.basename(relativePath).toUpperCase();
    if (!byBasename.has(basename)) byBasename.set(basename, []);
    byBasename.get(basename).push({ relativePath, absolutePath: file });
  }

  return { byNormalized, byBasename };
}

function resolveActualSourcePath(sourcePath, actualSourceIndex) {
  const normalized = normalizeSourcePath(sourcePath);
  const directAbsolute = path.join(repoRoot, normalized);
  if (fs.existsSync(directAbsolute)) {
    return {
      sourcePath: normalized,
      resolvedSourcePath: normalized,
      absolutePath: directAbsolute,
      resolution: 'exact',
      candidates: [],
    };
  }

  const indexed = actualSourceIndex.byNormalized.get(normalized);
  if (indexed) {
    return {
      sourcePath: normalized,
      resolvedSourcePath: normalized,
      absolutePath: indexed,
      resolution: 'indexed-exact',
      candidates: [],
    };
  }

  const basename = path.basename(normalized).toUpperCase();
  const candidates = actualSourceIndex.byBasename.get(basename) ?? [];
  if (candidates.length === 1) {
    return {
      sourcePath: normalized,
      resolvedSourcePath: candidates[0].relativePath,
      absolutePath: candidates[0].absolutePath,
      resolution: 'basename-unique',
      candidates: candidates.map((candidate) => candidate.relativePath),
    };
  }

  return {
    sourcePath: normalized,
    resolvedSourcePath: '',
    absolutePath: '',
    resolution: candidates.length > 1 ? 'basename-ambiguous' : 'unresolved',
    candidates: candidates.map((candidate) => candidate.relativePath),
  };
}

function fileSha256(absolutePath) {
  if (!absolutePath || !fs.existsSync(absolutePath)) return '';
  return crypto.createHash('sha256').update(fs.readFileSync(absolutePath)).digest('hex');
}

function deriveSourcesFromMilestone(milestone) {
  const sources = [];
  const sourceScopes = readJson('data/coverage/source-effects/scopes.json', { scopes: [] });
  const scope = sourceScopes.scopes?.find((row) => row.milestone === milestone);
  if (scope) {
    sources.push(...(scope.sources ?? []).map((row) => row.canonicalPath || row.sourcePath));
  }

  const manifest = readJson(`data/coverage/manifests/${milestone}-source-units.json`, null);
  if (manifest) {
    sources.push(...(manifest.originalSourceRoots ?? []));
    for (const unit of manifest.units ?? []) {
      if (unit.sourcePath) sources.push(unit.sourcePath);
    }
  }

  const effectLedger = readJson(`data/coverage/source-effects/${milestone}.effects.json`, null);
  if (effectLedger) {
    sources.push(...(effectLedger.sources ?? []).map((row) => row.sourcePath));
  }

  return unique(sources.map(normalizeSourcePath));
}

function sourceLabelsForPaths(labels, sourcePaths, labelFilters) {
  const sourceSet = new Set(sourcePaths);
  const labelFilterSet = new Set(labelFilters);
  return stableSortRows(
    labels.filter((row) => sourceSet.has(normalizeSourcePath(row.path)) && (labelFilterSet.size === 0 || labelFilterSet.has(row.label))),
    ['path', 'line', 'label'],
  );
}

function buildLabelRanges(allLabels, sourcePaths, labelFilters, sourceFiles) {
  if (labelFilters.length === 0) return [];

  const sourceSet = new Set(sourcePaths);
  const labelSet = new Set(labelFilters);
  const labelsByPath = indexBy(
    stableSortRows(
      allLabels.filter((row) => sourceSet.has(normalizeSourcePath(row.path))),
      ['path', 'line', 'label'],
    ),
    (row) => normalizeSourcePath(row.path),
  );
  const lineCountByPath = new Map(sourceFiles.map((row) => [normalizeSourcePath(row.sourcePath), Number(row.lineCount) || 0]));
  const ranges = [];

  for (const [sourcePath, rows] of labelsByPath.entries()) {
    for (const row of rows) {
      if (!labelSet.has(row.label)) continue;
      const startLine = Number(row.line) || 0;
      const nextRows =
        row.kind === 'global'
          ? rows.filter((candidate) => candidate.kind === 'global' && Number(candidate.line) > startLine)
          : rows.filter((candidate) => Number(candidate.line) > startLine);
      const nextLine = nextRows.length > 0 ? Number(nextRows[0].line) : (lineCountByPath.get(sourcePath) ?? 0) + 1;
      ranges.push({
        sourcePath,
        labelId: row.labelId,
        label: row.label,
        labelKind: row.kind,
        startLine,
        endLine: Math.max(startLine, nextLine - 1),
      });
    }
  }

  return stableSortRows(ranges, ['sourcePath', 'startLine', 'label']);
}

function rowInRanges(row, ranges) {
  if (ranges.length === 0) return true;
  const sourcePath = normalizeSourcePath(row.sourcePath ?? row.path);
  const line = Number(row.sourceLine ?? row.line) || 0;
  return ranges.some((range) => range.sourcePath === sourcePath && line >= range.startLine && line <= range.endLine);
}

function rowInSourceScope(row, sourceSet, ranges) {
  const sourcePath = normalizeSourcePath(row.sourcePath ?? row.path);
  return sourceSet.has(sourcePath) && rowInRanges(row, ranges);
}

function rowLineInRanges(sourcePath, sourceLine, sourceLabel, ranges) {
  if (ranges.length === 0) return true;
  const normalizedSourcePath = normalizeSourcePath(sourcePath);
  const line = Number(sourceLine) || 0;
  return ranges.some((range) => {
    if (range.sourcePath !== normalizedSourcePath) return false;
    if (line > 0 && line >= range.startLine && line <= range.endLine) return true;
    return Boolean(sourceLabel) && sourceLabel === range.label;
  });
}

function compactFileSummary(row, resolution) {
  return {
    sourcePath: normalizeSourcePath(row?.path ?? resolution.sourcePath),
    resolvedSourcePath: resolution.resolvedSourcePath,
    pathResolution: resolution.resolution,
    pathResolutionCandidates: resolution.candidates,
    sourceSha256: fileSha256(resolution.absolutePath),
    encoding: row?.encoding ?? '',
    lineCount: Number(row?.lineCount) || 0,
    labelCount: Number(row?.labelCount) || 0,
    callCount: Number(row?.callCount) || 0,
    inputCount: Number(row?.inputCount) || 0,
    stateReadCount: Number(row?.stateReadCount) || 0,
    stateWriteCount: Number(row?.stateWriteCount) || 0,
    coreStateReadCount: Number(row?.coreStateReadCount) || 0,
    coreStateWriteCount: Number(row?.coreStateWriteCount) || 0,
    labels: row?.labels ?? '',
    topWrittenFamilies: row?.topWrittenFamilies ?? '',
    topReadFamilies: row?.topReadFamilies ?? '',
    topCoreWrittenFamilies: row?.topCoreWrittenFamilies ?? '',
    topCoreReadFamilies: row?.topCoreReadFamilies ?? '',
  };
}

function compactLabel(row) {
  return {
    labelId: row.labelId,
    label: row.label,
    rawLabel: row.rawLabel,
    scope: row.scope,
    kind: row.kind,
    sourcePath: normalizeSourcePath(row.path),
    line: Number(row.line) || 0,
    incomingStaticCalls: Number(row.incomingStaticCalls) || 0,
    outgoingCalls: Number(row.outgoingCalls) || 0,
    entryKind: row.entryKind,
  };
}

function compactCall(row) {
  return {
    sourcePath: normalizeSourcePath(row.path),
    line: Number(row.line) || 0,
    sourceLabelId: row.sourceLabelId,
    sourceLabel: row.sourceLabel,
    kind: row.kind,
    targetRaw: row.targetRaw,
    targetLabel: row.targetLabel,
    resolution: row.resolution,
    resolvedTargetIds: row.resolvedTargetIds ? row.resolvedTargetIds.split('|').filter(Boolean) : [],
    resolvedTargets: row.resolvedTargets,
    dynamicPattern: row.dynamicPattern,
    dynamicCandidateCount: Number(row.dynamicCandidateCount) || 0,
    text: row.text,
  };
}

function compactDynamicCall(row) {
  return {
    sourcePath: normalizeSourcePath(row.path),
    line: Number(row.line) || 0,
    sourceLabel: row.sourceLabel,
    kind: row.kind,
    targetRaw: row.targetRaw,
    pattern: row.pattern,
    candidateCount: Number(row.candidateCount) || 0,
    candidateLabels: row.candidateLabels,
  };
}

function compactFlowAction(row) {
  return {
    sourcePath: normalizeSourcePath(row.path),
    line: Number(row.line) || 0,
    sourceLabelId: row.sourceLabelId,
    sourceLabel: row.sourceLabel,
    action: row.action,
    actionKind: row.actionKind,
    text: row.text,
  };
}

function compactStateAccess(row) {
  return {
    sourcePath: normalizeSourcePath(row.path),
    area: row.area,
    family: row.family,
    reads: Number(row.reads) || 0,
    writes: Number(row.writes) || 0,
  };
}

function rowTouchesSource(row, sourceSet) {
  const sourceFields = [row.sourcePath, row.sourceFile, row.path].filter(Boolean).map(normalizeSourcePath);
  if (sourceFields.some((item) => sourceSet.has(item))) return true;
  for (const sample of row.samples ?? []) {
    if (sample.file && sourceSet.has(normalizeSourcePath(sample.file))) return true;
  }
  for (const [file] of row.topFiles ?? []) {
    if (file && sourceSet.has(normalizeSourcePath(file))) return true;
  }
  return false;
}

function compactLegacyAddress(row) {
  return {
    address: row.address,
    family: row.family,
    index: row.index,
    addressKind: row.addressKind,
    mappingAction: row.mappingAction,
    sourceKinds: row.sourceKinds ?? [],
    readCount: Number(row.readCount) || 0,
    writeCount: Number(row.writeCount) || 0,
    charaSeedCount: Number(row.charaSeedCount) || 0,
    topFiles: (row.topFiles ?? []).slice(0, 5),
    sampleCount: (row.samples ?? []).length,
  };
}

function compactSourceEffect(row) {
  return {
    effectId: row.effectId,
    kind: row.kind,
    milestone: row.milestone,
    sourcePath: normalizeSourcePath(row.sourcePath),
    sourceLine: Number(row.sourceLine) || 0,
    currentLabel: row.currentLabel,
    status: row.status,
    ownerMilestone: row.ownerMilestone,
    transferId: row.transferId,
    exclusionReason: row.exclusionReason,
    raw: row.raw,
    label: row.label,
    controlKind: row.controlKind,
    condition: row.condition,
    callKind: row.callKind,
    callTarget: row.callTarget,
    primitive: row.primitive,
    stateFamily: row.stateFamily,
    stateAddress: row.stateAddress,
    operator: row.operator,
    expression: row.expression,
    reads: row.reads ?? [],
    writes: row.writes ?? [],
    calls: row.calls ?? [],
    needsReviewReasons: row.needsReviewReasons ?? [],
    implementationEvidence: row.implementationEvidence ?? [],
    runtimeTraceEvidence: row.runtimeTraceEvidence ?? [],
  };
}

function compactSourceUnit(row) {
  return {
    unitId: row.unitId,
    milestone: row.milestone,
    ownerMilestone: row.ownerMilestone,
    ownerRole: row.ownerRole,
    sourceKind: row.sourceKind,
    sourcePath: normalizeSourcePath(row.sourcePath),
    sourceLine: row.sourceLine,
    sourceLabel: row.sourceLabel,
    legacyReviewId: row.legacyReviewId,
    rowKind: row.rowKind,
    legacyId: row.legacyId,
    requiredBehavior: row.requiredBehavior,
    runtimeConsumerId: row.runtimeConsumerId,
    verificationId: row.verificationId,
    manifestStatus: row.manifestStatus,
    sourceCoverageRowId: row.sourceCoverageRowId,
    acceptedByOwner: Boolean(row.acceptedByOwner),
  };
}

function compactCoverageRow(row, artifactPath) {
  return {
    artifactPath,
    coverageRowId: row.coverageRowId,
    unitId: row.unitId,
    reviewId: row.reviewId,
    rowKind: row.rowKind,
    sourcePath: normalizeSourcePath(row.sourcePath),
    sourceLabel: row.sourceLabel,
    legacyId: row.legacyId,
    requiredBehavior: row.requiredBehavior,
    runtimeConsumerId: row.runtimeConsumerId,
    verificationId: row.verificationId,
    completionStatus: row.completionStatus,
    manifestStatus: row.manifestStatus,
    acceptedByOwner: row.acceptedByOwner,
    sourceCoverageRowIds: row.sourceCoverageRowIds ?? [],
  };
}

function sourceEffectFamilies(rows) {
  const families = new Set();
  for (const row of rows) {
    if (row.stateFamily) families.add(row.stateFamily);
    for (const read of row.reads ?? []) {
      if (read.family) families.add(read.family);
      if (typeof read === 'string') families.add(read.split(':')[0]);
    }
    for (const write of row.writes ?? []) {
      if (write.family) families.add(write.family);
      if (typeof write === 'string') families.add(write.split(':')[0]);
    }
  }
  return families;
}

function sourceEffectAddresses(rows) {
  const addresses = new Set();
  for (const row of rows) {
    if (row.stateAddress) addresses.add(row.stateAddress);
    for (const read of row.reads ?? []) {
      if (read.address) addresses.add(read.address);
      if (typeof read === 'string') addresses.add(read);
    }
    for (const write of row.writes ?? []) {
      if (write.address) addresses.add(write.address);
      if (typeof write === 'string') addresses.add(write);
    }
  }
  return addresses;
}

function legacyRowMatchesSelectedEffects(row, selectedFamilies, selectedAddresses) {
  if (selectedAddresses.has(row.address)) return true;
  return selectedFamilies.has(row.family);
}

function refFor(row) {
  return {
    effectId: row.effectId,
    sourcePath: row.sourcePath,
    sourceLine: row.sourceLine,
    currentLabel: row.currentLabel,
    kind: row.kind,
  };
}

function rowRef(row) {
  return {
    sourcePath: row.sourcePath,
    line: row.line,
    label: row.sourceLabel ?? row.label,
    kind: row.kind ?? row.action ?? row.family,
    id: row.effectId ?? row.labelId ?? row.targetRaw ?? row.family,
  };
}

function limitedRefs(rows, limit = 25) {
  return rows.slice(0, limit).map((row) => (row.effectId ? refFor(row) : rowRef(row)));
}

function effectCrosswalkRows(sourceEffects, sourceUnits, coverageRows) {
  const sourceUnitsByCoverageId = new Map(sourceUnits.map((row) => [row.sourceCoverageRowId, row]));
  return sourceEffects.map((effect) => {
    const matchingUnits = sourceUnits.filter((unit) => {
      if (unit.sourcePath !== effect.sourcePath) return false;
      if (unit.sourceLine && Number(unit.sourceLine) === Number(effect.sourceLine)) return true;
      if (unit.sourceLabel && unit.sourceLabel === effect.currentLabel) return true;
      return false;
    });
    const matchingCoverageRows = coverageRows.filter((row) => {
      if (row.sourcePath !== effect.sourcePath) return false;
      if (row.sourceLabel && row.sourceLabel === effect.currentLabel) return true;
      const unit = sourceUnitsByCoverageId.get(row.coverageRowId);
      return unit ? matchingUnits.some((candidate) => candidate.unitId === unit.unitId) : false;
    });
    return {
      effectId: effect.effectId,
      sourcePath: effect.sourcePath,
      sourceLine: effect.sourceLine,
      currentLabel: effect.currentLabel,
      matchingSourceUnitIds: matchingUnits.map((row) => row.unitId),
      matchingCoverageRowIds: matchingCoverageRows.map((row) => row.coverageRowId).filter(Boolean),
      hasImplementationClaim: matchingUnits.length > 0 || matchingCoverageRows.length > 0,
      claimGranularity: matchingUnits.length > 0 || matchingCoverageRows.length > 0 ? 'candidate-direct-or-label-match' : 'none',
    };
  });
}

function collectCoverageRows(manifest, sourceSet) {
  const rows = [];
  const sourceInputs = unique((manifest?.sourceInputs ?? []).filter((item) => String(item).startsWith('data/coverage/')));
  const manifestUnitIds = new Set((manifest?.units ?? []).map((unit) => unit.unitId).filter(Boolean));
  const manifestReviewIds = new Set((manifest?.units ?? []).map((unit) => unit.legacyReviewId).filter(Boolean));
  const manifestCoverageIds = new Set((manifest?.units ?? []).map((unit) => unit.sourceCoverageRowId).filter(Boolean));

  for (const artifactPath of sourceInputs) {
    const artifact = readJson(artifactPath, null);
    for (const row of artifact?.rows ?? []) {
      const rowSourcePath = normalizeSourcePath(row.sourcePath);
      const matches =
        sourceSet.has(rowSourcePath) ||
        manifestUnitIds.has(row.unitId) ||
        manifestReviewIds.has(row.reviewId) ||
        manifestCoverageIds.has(row.coverageRowId);
      if (matches) rows.push(compactCoverageRow(row, artifactPath));
    }
  }

  return stableSortRows(rows, ['artifactPath', 'coverageRowId', 'unitId', 'reviewId']);
}

function readExplicitEffectIds(args, reviewQueue) {
  const ids = new Set(args.effectIds);
  for (const relativePath of args.effectIdFiles) {
    for (const id of readLines(relativePath)) ids.add(id);
  }

  const reviewGroups = reviewQueue?.reviewGroups ?? [];
  const groupsById = new Map(reviewGroups.map((row) => [row.reviewGroupId, row]));
  for (const groupId of args.reviewGroupIds) {
    const group = groupsById.get(groupId);
    if (!group) {
      throw new Error(`Unknown review group: ${groupId}`);
    }
    for (const id of group.effectIds ?? []) ids.add(id);
  }
  return ids;
}

function compactReviewGroup(row) {
  return {
    reviewGroupId: row.reviewGroupId,
    milestone: row.milestone,
    sourcePath: normalizeSourcePath(row.sourcePath),
    currentLabel: row.currentLabel,
    sourceLineStart: Number(row.sourceLineStart) || 0,
    sourceLineEnd: Number(row.sourceLineEnd) || 0,
    effectCount: Number(row.effectCount) || 0,
    statusCounts: row.statusCounts ?? {},
    kindCounts: row.kindCounts ?? {},
    stateFamilies: row.stateFamilies ?? [],
    callTargets: row.callTargets ?? [],
    riskReasons: row.riskReasons ?? [],
    effectIds: row.effectIds ?? [],
  };
}

function reviewGroupRanges(rows) {
  return rows.map((row) => ({
    sourcePath: row.sourcePath,
    labelId: row.reviewGroupId,
    label: row.currentLabel,
    labelKind: 'review-group',
    startLine: row.sourceLineStart,
    endLine: row.sourceLineEnd,
  }));
}

function directSourceUnitRows(manifest, activeSourceSet, ranges) {
  return stableSortRows(
    (manifest?.units ?? [])
      .filter((row) => activeSourceSet.has(normalizeSourcePath(row.sourcePath)))
      .filter((row) => rowLineInRanges(row.sourcePath, row.sourceLine, row.sourceLabel, ranges))
      .map(compactSourceUnit),
    ['sourcePath', 'sourceLine', 'unitId'],
  );
}

function relatedSourceUnitRows(manifest, activeSourceSet, directUnitIds) {
  return stableSortRows(
    (manifest?.units ?? [])
      .filter((row) => activeSourceSet.has(normalizeSourcePath(row.sourcePath)))
      .filter((row) => !directUnitIds.has(row.unitId))
      .map(compactSourceUnit),
    ['sourcePath', 'unitId'],
  );
}

function directCoverageRows(rows, directUnits, ranges) {
  const directUnitIds = new Set(directUnits.map((row) => row.unitId));
  const directCoverageIds = new Set(directUnits.map((row) => row.sourceCoverageRowId).filter(Boolean));
  return stableSortRows(
    rows.filter((row) => {
      if (directUnitIds.has(row.unitId) || directCoverageIds.has(row.coverageRowId)) return true;
      return rowLineInRanges(row.sourcePath, 0, row.sourceLabel, ranges);
    }),
    ['artifactPath', 'coverageRowId', 'unitId', 'reviewId'],
  );
}

function sourceSnippetRanges(sourceEffects, labelRanges) {
  if (labelRanges.length > 0) return labelRanges.map((range) => ({ ...range }));
  const byPath = new Map();
  for (const row of sourceEffects) {
    if (!row.sourceLine) continue;
    const current = byPath.get(row.sourcePath) ?? { sourcePath: row.sourcePath, startLine: row.sourceLine, endLine: row.sourceLine };
    current.startLine = Math.min(current.startLine, row.sourceLine);
    current.endLine = Math.max(current.endLine, row.sourceLine);
    byPath.set(row.sourcePath, current);
  }
  return [...byPath.values()].map((range) => ({
    ...range,
    startLine: Math.max(1, range.startLine - 2),
    endLine: range.endLine + 2,
  }));
}

function buildSourceSnippets(ranges, resolutions) {
  return ranges
    .map((range) => {
      const resolution = resolutions.get(range.sourcePath);
      if (!resolution?.absolutePath || !fs.existsSync(resolution.absolutePath)) return null;
      const lines = fs.readFileSync(resolution.absolutePath, 'utf8').replace(/^\uFEFF/u, '').split(/\r?\n/u);
      const startLine = Math.max(1, Number(range.startLine) || 1);
      const endLine = Math.min(lines.length, Number(range.endLine) || startLine);
      return {
        sourcePath: range.sourcePath,
        label: range.label ?? '',
        startLine,
        endLine,
        text: lines
          .slice(startLine - 1, endLine)
          .map((line, index) => `${String(startLine + index).padStart(5, ' ')}: ${line}`)
          .join('\n'),
      };
    })
    .filter(Boolean);
}

function readPacketRecipe(packetId) {
  return readJson(`data/implementation-packets/recipes/${packetId}.recipe.json`, {});
}

function buildDefaultWorkerResultTemplate(sourceEffects) {
  return {
    implementedEffects: [],
    remainingEffects: sourceEffects.map((row) => ({
      effectId: row.effectId,
      reason: 'Not pre-classified by packet recipe.',
    })),
    transferredEffects: [],
    excludedEffects: [],
    changedFiles: [],
    tests: [],
  };
}

function mergeWorkerResultTemplate(defaultTemplate, recipeTemplate) {
  if (!recipeTemplate || Object.keys(recipeTemplate).length === 0) return defaultTemplate;
  return {
    implementedEffects: recipeTemplate.implementedEffects ?? defaultTemplate.implementedEffects,
    remainingEffects: recipeTemplate.remainingEffects ?? defaultTemplate.remainingEffects,
    transferredEffects: recipeTemplate.transferredEffects ?? defaultTemplate.transferredEffects,
    excludedEffects: recipeTemplate.excludedEffects ?? defaultTemplate.excludedEffects,
    changedFiles: recipeTemplate.changedFiles ?? defaultTemplate.changedFiles,
    tests: recipeTemplate.tests ?? defaultTemplate.tests,
  };
}

function riskRows({ labels, calls, dynamicCalls, flowActions, stateAccessRows, sourceEffects, sourceFiles }) {
  const ambiguousFamilies = new Set(['FLAG', 'CFLAG', 'GLOBAL', 'GLOBALS', 'PBAND', 'TFLAG', 'TEQUIP']);
  const risks = [];

  const unreferencedGlobalLabels = labels.filter((row) => row.entryKind === 'unreferenced-global');
  if (unreferencedGlobalLabels.length > 0) {
    risks.push({
      riskId: 'unreferenced-global-label',
      severity: 'scope-review-required',
      count: unreferencedGlobalLabels.length,
      reason: 'Global labels with no static incoming calls may still be engine entries, dynamic-call targets, or feature entrypoints.',
      rowRefs: limitedRefs(unreferencedGlobalLabels),
    });
  }

  const unresolvedCalls = calls.filter((row) => row.resolution === 'unresolved' || row.resolution === 'multiple');
  if (unresolvedCalls.length > 0) {
    risks.push({
      riskId: 'call-resolution-risk',
      severity: 'blocker-for-auto-implementation',
      count: unresolvedCalls.length,
      reason: 'Some static call edges are unresolved or resolve to multiple labels.',
      rowRefs: limitedRefs(unresolvedCalls),
    });
  }

  const unresolvedDynamicCalls = dynamicCalls.filter((row) => row.candidateCount === 0);
  if (unresolvedDynamicCalls.length > 0) {
    risks.push({
      riskId: 'dynamic-call-unresolved',
      severity: 'manual-review-required',
      count: unresolvedDynamicCalls.length,
      reason: 'Dynamic call patterns have no static candidate labels in the current analysis.',
      rowRefs: limitedRefs(unresolvedDynamicCalls),
    });
  }

  const inputActions = flowActions.filter((row) => row.action === 'INPUT');
  if (inputActions.length > 0) {
    risks.push({
      riskId: 'input-flow',
      severity: 'implementation-path-required',
      count: inputActions.length,
      reason: 'INPUT creates selectable, cancel, invalid-input, or retry behavior that cannot be reduced to state writes.',
      rowRefs: limitedRefs(inputActions),
    });
  }

  const persistenceActions = flowActions.filter((row) => row.actionKind === 'persistence');
  if (persistenceActions.length > 0) {
    risks.push({
      riskId: 'persistence-primitive',
      severity: 'primitive-semantics-required',
      count: persistenceActions.length,
      reason: 'Persistence primitives need explicit web save/global semantics.',
      rowRefs: limitedRefs(persistenceActions),
    });
  }

  const ambiguousStateRows = stateAccessRows.filter((row) => ambiguousFamilies.has(row.family));
  if (ambiguousStateRows.length > 0) {
    risks.push({
      riskId: 'ambiguous-state-family',
      severity: 'alias-required-before-auto-completion',
      count: ambiguousStateRows.length,
      reason: 'FLAG/CFLAG/GLOBAL/TFLAG-like families require semantic aliasing before implementation can be trusted.',
      rowRefs: limitedRefs(ambiguousStateRows),
    });
  }

  const unclassifiedEffects = sourceEffects.filter((row) => row.status === 'unclassified' || row.status === 'blocked');
  if (unclassifiedEffects.length > 0) {
    risks.push({
      riskId: 'unclosed-source-effects',
      severity: 'packet-review-required',
      count: unclassifiedEffects.length,
      reason: 'Source-effect rows are not implementation evidence, but unclassified/blocked rows identify work that cannot be silently ignored.',
      rowRefs: limitedRefs(unclassifiedEffects),
    });
  }

  const unresolvedPaths = sourceFiles.filter((row) => !['exact', 'indexed-exact', 'basename-unique'].includes(row.pathResolution));
  if (unresolvedPaths.length > 0) {
    risks.push({
      riskId: 'source-path-resolution',
      severity: 'tooling-blocker',
      count: unresolvedPaths.length,
      reason: 'Some artifact source paths could not be resolved back to actual original-game files.',
      rowRefs: unresolvedPaths.map((row) => ({ sourcePath: row.sourcePath, resolution: row.pathResolution })),
    });
  }

  return risks;
}

function buildPacket(args) {
  const actualSourceIndex = buildActualSourceIndex();
  const fileSummaryRows = readTsv('data/game-system-analysis/file-summary.tsv');
  const labelRows = readTsv('data/game-system-analysis/label-index.tsv');
  const callRows = readTsv('data/game-system-analysis/resolved-call-edges.tsv');
  const dynamicCallRows = readTsv('data/game-system-analysis/dynamic-call-patterns.tsv');
  const flowActionRows = readTsv('data/game-system-analysis/flow-control-actions.tsv');
  const stateAccessRows = readTsv('data/game-system-analysis/state-access-summary.tsv');
  const legacyMapping = readJson('data/legacy-mapping/source-addresses.json', { addresses: [] });
  const manifest = args.milestone ? readJson(`data/coverage/manifests/${args.milestone}-source-units.json`, null) : null;
  const effectLedger = args.milestone ? readJson(`data/coverage/source-effects/${args.milestone}.effects.json`, null) : null;
  const reviewQueue = args.milestone ? readJson(`data/coverage/source-effects/${args.milestone}.review-queue.json`, null) : null;

  const derivedSources = args.milestone ? deriveSourcesFromMilestone(args.milestone) : [];
  const sourcePaths = unique([...args.sources, ...derivedSources].map(normalizeSourcePath));
  if (sourcePaths.length === 0) {
    throw new Error('No source paths were supplied or derived. Use --source or a milestone with scope data.');
  }
  if (args.requireSourceEffects && !effectLedger) {
    throw new Error(`--require-source-effects was set, but no source-effect ledger exists for ${args.milestone || args.id}.`);
  }

  const fileSummaryByPath = indexBy(fileSummaryRows, (row) => normalizeSourcePath(row.path));
  const resolutions = new Map(sourcePaths.map((sourcePath) => [sourcePath, resolveActualSourcePath(sourcePath, actualSourceIndex)]));
  const allSourceFiles = sourcePaths.map((sourcePath) => {
    const row = fileSummaryByPath.get(sourcePath)?.[0];
    return compactFileSummary(row, resolutions.get(sourcePath));
  });

  const labelRanges = buildLabelRanges(labelRows, sourcePaths, args.labels, allSourceFiles);
  if (args.labels.length > 0 && labelRanges.length === 0) {
    throw new Error(`No labels matched: ${args.labels.join(', ')}`);
  }
  const explicitEffectIds = readExplicitEffectIds(args, reviewQueue);
  const selectedReviewGroups = (reviewQueue?.reviewGroups ?? [])
    .filter((row) => args.reviewGroupIds.includes(row.reviewGroupId))
    .map(compactReviewGroup);
  const packetRanges = labelRanges.length > 0 ? labelRanges : reviewGroupRanges(selectedReviewGroups);
  const selectedSourceEffectRows = stableSortRows(
    (effectLedger?.effects ?? [])
      .filter((row) => rowInSourceScope(row, new Set(sourcePaths), packetRanges))
      .filter((row) => explicitEffectIds.size === 0 || explicitEffectIds.has(row.effectId)),
    ['sourcePath', 'sourceLine', 'effectId'],
  );
  if (explicitEffectIds.size > 0) {
    const selectedIds = new Set(selectedSourceEffectRows.map((row) => row.effectId));
    const missingIds = [...explicitEffectIds].filter((id) => !selectedIds.has(id));
    if (missingIds.length > 0) {
      throw new Error(`Some requested effect ids are outside the packet scope or missing from the ledger: ${missingIds.slice(0, 10).join(', ')}`);
    }
  }
  const activeSourcePaths =
    packetRanges.length > 0
      ? unique(packetRanges.map((range) => range.sourcePath))
      : explicitEffectIds.size > 0
        ? unique(selectedSourceEffectRows.map((row) => normalizeSourcePath(row.sourcePath)))
        : sourcePaths;
  const activeSourceSet = new Set(activeSourcePaths);
  const sourceFiles = allSourceFiles.filter((row) => activeSourceSet.has(row.sourcePath));

  const labels = sourceLabelsForPaths(labelRows, activeSourceSet, [])
    .filter((row) => rowInRanges({ ...row, sourcePath: normalizeSourcePath(row.path), line: row.line }, packetRanges))
    .map(compactLabel);
  const labelIds = new Set(labels.map((row) => row.labelId));
  const calls = stableSortRows(
    callRows
      .filter((row) => rowInSourceScope(row, activeSourceSet, packetRanges))
      .map(compactCall),
    ['sourcePath', 'line', 'kind', 'targetRaw'],
  );
  const incomingCalls = stableSortRows(
    callRows
      .filter((row) =>
        String(row.resolvedTargetIds ?? '')
          .split('|')
          .some((targetId) => labelIds.has(targetId)),
      )
      .filter((row) => !activeSourceSet.has(normalizeSourcePath(row.path)))
      .map(compactCall),
    ['sourcePath', 'line', 'kind', 'targetRaw'],
  );
  const dynamicCalls = stableSortRows(
    dynamicCallRows.filter((row) => rowInSourceScope(row, activeSourceSet, packetRanges)).map(compactDynamicCall),
    ['sourcePath', 'line', 'kind', 'targetRaw'],
  );
  const flowActions = stableSortRows(
    flowActionRows.filter((row) => rowInSourceScope(row, activeSourceSet, packetRanges)).map(compactFlowAction),
    ['sourcePath', 'line', 'action'],
  );
  if (args.maxEffects && selectedSourceEffectRows.length > args.maxEffects) {
    throw new Error(
      `Selected packet has ${selectedSourceEffectRows.length} source-effect rows, above --max-effects ${args.maxEffects}. Use a narrower --label/--source selection.`,
    );
  }
  const selectedFamilies = sourceEffectFamilies(selectedSourceEffectRows);
  const selectedAddresses = sourceEffectAddresses(selectedSourceEffectRows);
  const stateAccesses = stableSortRows(
    stateAccessRows
      .filter((row) => activeSourceSet.has(normalizeSourcePath(row.path)))
      .filter((row) => packetRanges.length === 0 || selectedFamilies.has(row.family))
      .map(compactStateAccess),
    ['sourcePath', 'family'],
  );

  const legacyAddressRows = stableSortRows(
    (legacyMapping.addresses ?? [])
      .filter((row) => rowTouchesSource(row, activeSourceSet))
      .filter((row) => packetRanges.length === 0 || legacyRowMatchesSelectedEffects(row, selectedFamilies, selectedAddresses))
      .map(compactLegacyAddress),
    ['family', 'address'],
  );

  const sourceEffects = selectedSourceEffectRows.map(compactSourceEffect);
  const sourceUnits = directSourceUnitRows(manifest, activeSourceSet, packetRanges);
  const directUnitIds = new Set(sourceUnits.map((row) => row.unitId));
  const relatedSourceUnits = relatedSourceUnitRows(manifest, activeSourceSet, directUnitIds);
  const allCoverageRows = collectCoverageRows(manifest, activeSourceSet);
  const coverageRows = directCoverageRows(allCoverageRows, sourceUnits, packetRanges);
  const directCoverageIds = new Set(coverageRows.map((row) => row.coverageRowId));
  const relatedCoverageRows = allCoverageRows.filter((row) => !directCoverageIds.has(row.coverageRowId));
  const effectCrosswalk = effectCrosswalkRows(sourceEffects, sourceUnits, coverageRows);
  const sourceSnippets =
    packetRanges.length > 0 || explicitEffectIds.size > 0 ? buildSourceSnippets(sourceSnippetRanges(sourceEffects, packetRanges), resolutions) : [];

  const missingFileSummaryRows = sourceFiles.filter((row) => row.lineCount === 0).map((row) => row.sourcePath);
  const sourceEffectPaths = new Set(sourceEffects.map((row) => row.sourcePath));
  const sourcePathsWithoutEffects = effectLedger ? activeSourcePaths.filter((sourcePath) => !sourceEffectPaths.has(sourcePath)) : [];
  let risks = riskRows({ labels, calls, dynamicCalls, flowActions, stateAccessRows: stateAccesses, sourceEffects, sourceFiles });
  if (args.riskIds.length > 0) {
    const riskSet = new Set(args.riskIds);
    risks = risks.filter((row) => riskSet.has(row.riskId));
  }

  const packetId = slug(args.id);
  const recipe = readPacketRecipe(packetId);
  const workerResultTemplate = mergeWorkerResultTemplate(buildDefaultWorkerResultTemplate(sourceEffects), recipe.prefilledWorkerResult);
  return {
    schemaVersion: 'feature-implementation-packet/v1',
    generatedBy: 'tools/build_feature_packet.mjs',
    generatedAt: new Date().toISOString(),
    packetId,
    milestone: args.milestone,
    purpose:
      'Implementation packet built from existing original-source analysis artifacts. This packet reduces repeated source reading; it is not completion evidence by itself.',
    trustRules: [
      'original-game ERB/CSV files remain authoritative',
      'packet rows must preserve sourcePath and sourceLine/label references where available',
      'mapped/classified rows are implementation inputs, not implementation proof',
      'workers may propose patches from packets, but main Codex must review and integrate',
      'runtime tests/traces are still required to claim implementation parity',
    ],
    scope: {
      inputMilestone: args.milestone,
      inputSources: args.sources.map(normalizeSourcePath),
      derivedSources,
      sourcePaths,
      activeSourcePaths,
      labelFilters: args.labels,
      labelRanges,
      packetRanges,
      reviewGroupFilters: args.reviewGroupIds,
      selectedReviewGroups,
      effectIdFilters: args.effectIds,
      effectIdFileFilters: args.effectIdFiles,
      riskFilters: args.riskIds,
      maxEffects: args.maxEffects || null,
      granularity:
        args.reviewGroupIds.length > 0 || explicitEffectIds.size > 0
          ? 'effect-id-subpacket'
          : packetRanges.length > 0
            ? 'label-range-subpacket'
            : 'milestone-or-source-packet',
    },
    sourceFiles,
    sourceOutline: {
      labels,
      outgoingCalls: calls,
      incomingCalls,
      dynamicCalls,
      flowActions,
      stateAccesses,
      sourceSnippets,
    },
    legacyStateAndMapping: {
      rows: legacyAddressRows,
      summary: {
        rows: legacyAddressRows.length,
        byFamily: countBy(legacyAddressRows, (row) => row.family),
        byMappingAction: countBy(legacyAddressRows, (row) => row.mappingAction),
        reads: sumBy(legacyAddressRows, 'readCount'),
        writes: sumBy(legacyAddressRows, 'writeCount'),
      },
    },
    sourceEffects: {
      available: Boolean(effectLedger),
      ledgerPath: args.milestone ? `data/coverage/source-effects/${args.milestone}.effects.json` : '',
      rows: sourceEffects,
      summary: {
        rows: sourceEffects.length,
        byKind: countBy(sourceEffects, (row) => row.kind),
        byStatus: countBy(sourceEffects, (row) => row.status),
        bySourcePath: countBy(sourceEffects, (row) => row.sourcePath),
        byCurrentLabel: countBy(sourceEffects, (row) => row.currentLabel),
        sourcePathsWithoutEffects,
      },
      effectCrosswalk,
      effectCrosswalkSummary: {
        rows: effectCrosswalk.length,
        withImplementationClaim: effectCrosswalk.filter((row) => row.hasImplementationClaim).length,
        withoutImplementationClaim: effectCrosswalk.filter((row) => !row.hasImplementationClaim).length,
      },
    },
    existingImplementationClaims: {
      manifestPath: manifest ? `data/coverage/manifests/${args.milestone}-source-units.json` : '',
      sourceUnits,
      coverageRows,
      relatedSourceUnits,
      relatedCoverageRows,
      summary: {
        sourceUnits: sourceUnits.length,
        coverageRows: coverageRows.length,
        relatedSourceUnits: relatedSourceUnits.length,
        relatedCoverageRows: relatedCoverageRows.length,
        sourceUnitsByStatus: countBy(sourceUnits, (row) => row.manifestStatus),
        coverageRowsByStatus: countBy(coverageRows, (row) => row.completionStatus),
      },
    },
    implementationWorkOrder: {
      recommendedWorkerInput:
        recipe.recommendedWorkerInput ??
        'Use only this packet scope to propose bounded web code/test patches. Do not expand the source scope unless main asks. Do not infer completion from packet inclusion.',
      recipePath: Object.keys(recipe).length > 0 ? `data/implementation-packets/recipes/${packetId}.recipe.json` : '',
      runtimeTargetHints: recipe.runtimeTargetHints ?? {},
      stateAliasRecipe: recipe.stateAliasRecipe ?? [],
      implementationRecipe: recipe.implementationRecipe ?? {},
      requiredWorkerResultShape: {
        implementedEffects: [
          {
            effectId: 'source effect id from this packet only',
            implementation: 'changed runtime file/function',
            test: 'test or smoke evidence to add/run, or empty if not yet testable',
            notes: 'short reason the effect is covered',
          },
        ],
        remainingEffects: [
          {
            effectId: 'source effect id from this packet only',
            reason: 'why not implemented in this patch proposal',
          },
        ],
        transferredEffects: [],
        excludedEffects: [],
        changedFiles: [],
        tests: [],
      },
      requiredPatchReviewQuestions: [
        'Which original labels/effects does the patch implement?',
        'Which web feature/domain files are changed?',
        'Which state/session/view effects are observable?',
        'Which input/cancel/failure/retry paths are covered?',
        'Which source effects remain unimplemented or require transfer/exclusion?',
      ],
      highRiskRows: risks,
      workerEditableGlobs: recipe.workerEditableGlobs ?? [
        'src/**/*.ts',
        'tools/*smoke*.ts',
        'tools/vite.*smoke*.config.ts',
        'data/coverage/source-effects/classifications/*.json',
      ],
      suggestedReadOnlyInputs: recipe.suggestedReadOnlyInputs ?? [
        `data/implementation-packets/${packetId}.json`,
        ...activeSourcePaths,
        ...(args.milestone ? [`data/coverage/source-effects/${args.milestone}.effects.json`] : []),
      ],
      allowedCommands: recipe.allowedCommands ?? [],
      prefilledWorkerResult: workerResultTemplate,
      packetBudget: {
        sourceEffects: sourceEffects.length,
        sourceFiles: sourceFiles.length,
        labels: labels.length,
        outgoingCalls: calls.length,
        sourceSnippetBytes: sourceSnippets.reduce((total, row) => total + row.text.length, 0),
      },
      packetAccountingRule:
        'Every sourceEffects.rows effectId must appear exactly once in implementedEffects, remainingEffects, transferredEffects, or excludedEffects in worker output.',
    },
    assertions: {
      completeness: {
        ok: missingFileSummaryRows.length === 0 && sourceFiles.every((row) => ['exact', 'indexed-exact', 'basename-unique'].includes(row.pathResolution)),
        missingFileSummaryRows,
        unresolvedSourcePaths: sourceFiles.filter((row) => row.pathResolution === 'unresolved').map((row) => row.sourcePath),
        ambiguousSourcePaths: sourceFiles.filter((row) => row.pathResolution === 'basename-ambiguous').map((row) => row.sourcePath),
      },
      analysisJoin: {
        sourceFileCount: sourceFiles.length,
        labelCount: labels.length,
        outgoingCallCount: calls.length,
        incomingCallCount: incomingCalls.length,
        dynamicCallCount: dynamicCalls.length,
        flowActionCount: flowActions.length,
        stateAccessFamilyRows: stateAccesses.length,
        legacyAddressRows: legacyAddressRows.length,
        sourceEffectRows: sourceEffects.length,
        sourceEffectCrosswalkRows: effectCrosswalk.length,
        sourceEffectRowsWithoutImplementationClaim: effectCrosswalk.filter((row) => !row.hasImplementationClaim).length,
        sourceUnitRows: sourceUnits.length,
        coverageRows: coverageRows.length,
      },
    },
  };
}

try {
  const args = parseArgs(process.argv.slice(2));
  const packet = buildPacket(args);
  const outputPath = args.out || path.join(defaultOutputDir, `${packet.packetId}.json`).replaceAll('\\', '/');
  writeJson(outputPath, packet);
  console.log(
    `coverage:feature-packet wrote ${outputPath} (${packet.sourceFiles.length} source file(s), ${packet.sourceOutline.labels.length} label(s), ${packet.sourceEffects.summary.rows} source-effect row(s), ${packet.implementationWorkOrder.highRiskRows.length} risk group(s)).`,
  );
} catch (error) {
  console.error(`coverage:feature-packet failed: ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
}
