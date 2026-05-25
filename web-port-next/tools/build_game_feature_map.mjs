import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

function readJson(relativePath, fallback = undefined) {
  const absolutePath = path.join(root, relativePath);
  if (!fs.existsSync(absolutePath)) {
    if (fallback !== undefined) return fallback;
    throw new Error(`Missing required JSON: ${relativePath}`);
  }
  return JSON.parse(fs.readFileSync(absolutePath, 'utf8'));
}

function writeJson(relativePath, value) {
  const absolutePath = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
  fs.writeFileSync(`${absolutePath}.tmp`, `${JSON.stringify(value, null, 2)}\n`);
  fs.renameSync(`${absolutePath}.tmp`, absolutePath);
}

function byNumericId(a, b) {
  const left = Number(String(a.id ?? a.sourceId ?? '').replace(/^[^:]+:/, ''));
  const right = Number(String(b.id ?? b.sourceId ?? '').replace(/^[^:]+:/, ''));
  if (Number.isFinite(left) && Number.isFinite(right) && left !== right) return left - right;
  return String(a.id ?? a.sourceId ?? '').localeCompare(String(b.id ?? b.sourceId ?? ''));
}

function compactSource(source) {
  if (!source) return undefined;
  return {
    path: source.path ?? source.sourceFile ?? '',
    id: source.originalId ?? source.sourceId ?? '',
    name: source.originalName ?? source.sourceName ?? '',
    label: source.sourceLabel ?? '',
    line: source.sourceLine ?? '',
  };
}

function catalogEntries(catalog, key) {
  return Object.values(catalog[key] ?? {})
    .sort(byNumericId)
    .map((entry) => ({
      id: String(entry.id),
      name: entry.label ?? entry.displayName ?? '',
      source: compactSource(entry.source),
      tags: entry.tags ?? [],
      category: entry.category ?? undefined,
      basePrice: entry.basePrice ?? undefined,
    }));
}

function derivedEntries(rows, key) {
  return rows
    .filter((row) => row.definitionKey === key)
    .sort(byNumericId)
    .map((row) => ({
      id: String(row.sourceId),
      name: row.sourceName ?? '',
      source: compactSource(row),
      runtimeId: row.runtimeId ?? '',
      ownerMilestone: row.ownerMilestone ?? '',
      handlerPath: row.handlerPath ?? '',
      viewPath: row.viewPath ?? '',
      role: row.role ?? '',
      status: row.statusForDefinitionCoverage ?? row.status ?? '',
    }));
}

function coverageRows(relativePath) {
  const coverage = readJson(relativePath, { rows: [], summary: {} });
  return {
    path: relativePath,
    summary: coverage.summary ?? {},
    rows: (coverage.rows ?? []).map((row) => ({
      id: row.coverageRowId ?? row.definitionRowId ?? row.reviewId ?? '',
      rowKind: row.rowKind ?? row.sourceKind ?? '',
      entryId:
        row.itemId ??
        row.commandId ??
        row.missionId ??
        row.sceneId ??
        row.sourceId ??
        row.definitionKey ??
        '',
      sourcePath: row.sourcePath ?? row.sourceFile ?? '',
      sourceLine: row.sourceLine ?? '',
      label: row.label ?? row.sourceLabel ?? row.sourceName ?? '',
      status: row.completionStatus ?? row.status ?? row.statusForDefinitionCoverage ?? '',
      ownerMilestone: row.ownerMilestone ?? '',
      runtimeConsumerId: row.runtimeConsumerId ?? '',
      verificationId: row.verificationId ?? '',
      transferTarget: row.toMilestone ?? '',
    })),
  };
}

function countRows(entries) {
  return Array.isArray(entries) ? entries.length : 0;
}

function featureNode({ id, name, milestone, kind, depth, entries = [], children = [], artifacts = [], notes = [] }) {
  return {
    id,
    name,
    milestone,
    kind,
    depth,
    entryCount: countRows(entries),
    entries,
    children,
    artifacts,
    notes,
  };
}

const legacyCatalog = readJson('data/catalog/legacy-catalog.json');
const catalog = legacyCatalog.catalog ?? {};
const derivedDefinitionFile = 'data/coverage/erb-derived-definitions.json';
const derivedDefinitions = readJson(derivedDefinitionFile, { rows: [], summary: {} });
const derivedRows = derivedDefinitions.rows ?? [];

const coverage = {
  itemUse: coverageRows('data/coverage/item-use-coverage.json'),
  recruit: coverageRows('data/coverage/recruit-coverage.json'),
  visit: coverageRows('data/coverage/visit-facility-coverage.json'),
  work: coverageRows('data/coverage/work-coverage.json'),
  trainingSession: coverageRows('data/coverage/training-session-coverage.json'),
  trainingAvailability: coverageRows('data/coverage/training-availability-coverage.json'),
  trainingEffect0To34: coverageRows('data/coverage/training-effect-0-34.json'),
  definitions: coverageRows('data/coverage/definitions.json'),
};

const mainMenuEntries = derivedEntries(derivedRows, 'mainMenuOptions');
const itemEntries = catalogEntries(catalog, 'items');
const trainingCommandEntries = catalogEntries(catalog, 'trainingCommands');
const characterEntries = catalogEntries(catalog, 'characters');

const map = {
  schemaVersion: 'game-feature-map/v1',
  purpose:
    'Exhaustive hierarchical game-feature map generated from existing catalog, ERB-derived definitions, and coverage artifacts. Markdown docs should link here instead of hand-shortening entry lists.',
  sourceOfTruth: ['original-game/ERB', 'original-game/CSV', 'VariableSize.CSV', 'Chara CSV files'],
  generatedBy: 'tools/build_game_feature_map.mjs',
  sources: {
    legacyCatalog: 'data/catalog/legacy-catalog.json',
    erbDerivedDefinitions: derivedDefinitionFile,
    coverage: Object.fromEntries(Object.entries(coverage).map(([key, value]) => [key, value.path])),
  },
  summary: {
    mainMenuOptions: mainMenuEntries.length,
    items: itemEntries.length,
    recruitCoverageRows: coverage.recruit.rows.length,
    visitPlaces: derivedEntries(derivedRows, 'visitPlaces').length,
    visitCoverageRows: coverage.visit.rows.length,
    workDefinitions: derivedEntries(derivedRows, 'workDefinitions').length,
    workCoverageRows: coverage.work.rows.length,
    shootingScenes: derivedEntries(derivedRows, 'filmingSceneDefinitions').length,
    trainingCommands: trainingCommandEntries.length,
    trainingAvailabilityRows: coverage.trainingAvailability.rows.length,
    trainingEffect0To34Rows: coverage.trainingEffect0To34.rows.length,
    missions: derivedEntries(derivedRows, 'missionDefinitions').length,
    events: derivedEntries(derivedRows, 'eventDefinitions').length,
    endings: derivedEntries(derivedRows, 'endingDefinitions').length,
    helpTexts: derivedEntries(derivedRows, 'helpTextDefinitions').length,
    achievements: derivedEntries(derivedRows, 'achievementDefinitions').length,
    characters: characterEntries.length,
    baseStats: countRows(catalogEntries(catalog, 'baseStats')),
    abilities: countRows(catalogEntries(catalog, 'abilities')),
    talents: countRows(catalogEntries(catalog, 'talents')),
    experiences: countRows(catalogEntries(catalog, 'experiences')),
    marks: countRows(catalogEntries(catalog, 'marks')),
    trainingParams: countRows(catalogEntries(catalog, 'trainingParams')),
    legacyCharacterFlags: countRows(catalogEntries(catalog, 'legacyCharacterFlagDefinitions')),
  },
  hierarchy: [
    featureNode({
      id: 'boot-new-game-load',
      name: 'Boot / New Game / Load',
      milestone: 'M28/M32-M34/M50',
      kind: 'route-root',
      depth: 'shallow route plus seed/save handoff',
      children: [
        featureNode({ id: 'boot', name: 'Boot screen', milestone: 'M28', kind: 'screen', depth: 'shallow' }),
        featureNode({ id: 'new-game', name: 'New game initialization', milestone: 'M32-M34', kind: 'seed pipeline', depth: 'seed pipeline' }),
        featureNode({ id: 'load', name: 'Load saved state', milestone: 'M50', kind: 'save/load', depth: 'state restore' }),
      ],
    }),
    featureNode({
      id: 'main-menu',
      name: 'Main Menu',
      milestone: 'M28',
      kind: 'menu',
      depth: 'shallow entry tree',
      entries: mainMenuEntries,
      artifacts: [derivedDefinitionFile, 'src/features/mainMenu.ts', 'src/ui/RouteScreens.tsx'],
    }),
    featureNode({
      id: 'item-shop-and-use',
      name: 'Item Shop / Immediate Item Use',
      milestone: 'M29/M30',
      kind: 'item flow',
      depth: 'shallow entries with state effects',
      entries: itemEntries,
      children: [
        featureNode({
          id: 'item-shop-purchase',
          name: 'Shop purchase transaction',
          milestone: 'M29',
          kind: 'transaction',
          depth: 'listing/price/money/inventory',
          artifacts: ['data/coverage/shop-purchase-coverage.json'],
        }),
        featureNode({
          id: 'immediate-item-use',
          name: 'Immediate item use',
          milestone: 'M30',
          kind: 'item effects',
          depth: 'target/effect/repeat',
          entries: coverage.itemUse.rows,
          artifacts: [coverage.itemUse.path],
        }),
      ],
      artifacts: ['data/catalog/legacy-catalog.json', coverage.itemUse.path],
    }),
    featureNode({
      id: 'recruit',
      name: 'Recruit',
      milestone: 'M31/M32-M34',
      kind: 'listing plus generated character bundle',
      depth: 'shallow menu, bundle result',
      entries: coverage.recruit.rows,
      artifacts: [coverage.recruit.path],
    }),
    featureNode({
      id: 'character-seed',
      name: 'Character Identity / Body / Social Seed',
      milestone: 'M32-M34',
      kind: 'seed pipeline',
      depth: 'seed pipeline',
      children: [
        featureNode({ id: 'characters', name: 'Characters', milestone: 'M32', kind: 'CSV definitions', depth: 'definition list', entries: characterEntries }),
        featureNode({ id: 'base-stats', name: 'BASE/MAXBASE', milestone: 'M33', kind: 'CSV definitions', depth: 'definition list', entries: catalogEntries(catalog, 'baseStats') }),
        featureNode({ id: 'abilities', name: 'ABL', milestone: 'M33', kind: 'CSV definitions', depth: 'definition list', entries: catalogEntries(catalog, 'abilities') }),
        featureNode({ id: 'talents', name: 'TALENT', milestone: 'M33', kind: 'CSV definitions', depth: 'definition list', entries: catalogEntries(catalog, 'talents') }),
        featureNode({ id: 'experiences', name: 'EXP', milestone: 'M33', kind: 'CSV definitions', depth: 'definition list', entries: catalogEntries(catalog, 'experiences') }),
        featureNode({ id: 'legacy-cflags', name: 'Legacy CFLAG definitions', milestone: 'M34', kind: 'aux definitions', depth: 'definition list', entries: catalogEntries(catalog, 'legacyCharacterFlagDefinitions') }),
      ],
      artifacts: ['data/catalog/legacy-catalog.json', coverage.definitions.path],
    }),
    featureNode({
      id: 'visit',
      name: 'Visit / Facility',
      milestone: 'M36',
      kind: 'facility flow',
      depth: 'mostly shallow',
      entries: derivedEntries(derivedRows, 'visitPlaces'),
      children: [
        featureNode({
          id: 'visit-actions',
          name: 'Visit action/effect rows',
          milestone: 'M36',
          kind: 'coverage rows',
          depth: 'place/action/effect',
          entries: coverage.visit.rows,
          artifacts: [coverage.visit.path],
        }),
      ],
      artifacts: [derivedDefinitionFile, coverage.visit.path],
    }),
    featureNode({
      id: 'work',
      name: 'Work / Creative / Special Work',
      milestone: 'M37',
      kind: 'work flow',
      depth: 'medium dynamic',
      entries: derivedEntries(derivedRows, 'workDefinitions'),
      children: [
        featureNode({
          id: 'work-effects',
          name: 'Work calculation/effect rows',
          milestone: 'M37',
          kind: 'coverage rows',
          depth: 'work/result/reward/effect',
          entries: coverage.work.rows,
          artifacts: [coverage.work.path],
        }),
      ],
      artifacts: [derivedDefinitionFile, coverage.work.path],
    }),
    featureNode({
      id: 'shooting',
      name: 'Shooting / Filming',
      milestone: 'M38/M39',
      kind: 'scene definition and execution',
      depth: 'definition plus result calculation',
      entries: derivedEntries(derivedRows, 'filmingSceneDefinitions'),
      artifacts: [derivedDefinitionFile, 'data/coverage/filming-scene-coverage.json', 'data/coverage/filming-execution-coverage.json'],
    }),
    featureNode({
      id: 'training',
      name: 'Training',
      milestone: 'M40-M44',
      kind: 'menu plus command availability/effects',
      depth: 'deep repetitive',
      entries: trainingCommandEntries,
      children: [
        featureNode({
          id: 'training-session',
          name: 'Training menu/session shell',
          milestone: 'M40',
          kind: 'session shell',
          depth: 'shallow shell',
          entries: coverage.trainingSession.rows,
          artifacts: [coverage.trainingSession.path],
        }),
        featureNode({
          id: 'training-availability',
          name: 'COM_ABLE availability',
          milestone: 'M41',
          kind: 'availability programs',
          depth: 'deep repetitive',
          entries: coverage.trainingAvailability.rows,
          artifacts: [coverage.trainingAvailability.path, 'data/coverage/training-availability-rules.json'],
        }),
        featureNode({
          id: 'training-effects-0-34',
          name: 'COMF effects 0-34',
          milestone: 'M42',
          kind: 'command effect programs',
          depth: 'deep repetitive',
          entries: coverage.trainingEffect0To34.rows,
          artifacts: [coverage.trainingEffect0To34.path],
        }),
        featureNode({
          id: 'training-effects-35-69',
          name: 'COMF effects 35-69',
          milestone: 'M43',
          kind: 'command effect programs',
          depth: 'deep repetitive',
          notes: ['coverage script is currently a placeholder and must be replaced before closure'],
        }),
        featureNode({
          id: 'training-effects-70-plus',
          name: 'COMF effects 70+ and post-processing',
          milestone: 'M44',
          kind: 'command effect programs',
          depth: 'deep repetitive',
          notes: ['coverage script is currently a placeholder and must be replaced before closure'],
        }),
      ],
      artifacts: ['data/catalog/legacy-catalog.json', coverage.trainingSession.path, coverage.trainingAvailability.path, coverage.trainingEffect0To34.path],
    }),
    featureNode({
      id: 'mission',
      name: 'Mission',
      milestone: 'M46',
      kind: 'mission flow',
      depth: 'medium dynamic',
      entries: derivedEntries(derivedRows, 'missionDefinitions'),
      artifacts: [derivedDefinitionFile],
    }),
    featureNode({
      id: 'roster-wardrobe-display',
      name: 'Roster / Wardrobe / Character Display',
      milestone: 'M34/M49',
      kind: 'character management/display',
      depth: 'shallow actions plus CFLAG/equipment effects',
      children: [
        featureNode({ id: 'roster', name: 'Roster retire/delete/sell/assistant actions', milestone: 'M49', kind: 'screen actions', depth: 'shallow' }),
        featureNode({ id: 'wardrobe', name: 'Wardrobe clothing/costume actions', milestone: 'M34', kind: 'CFLAG/equipment flow', depth: 'shallow effects' }),
        featureNode({ id: 'ability-display', name: 'Ability/actress display', milestone: 'M49', kind: 'display', depth: 'definition display' }),
      ],
    }),
    featureNode({
      id: 'turn-pipeline',
      name: 'Turn Pipeline / Hidden Automatic Hooks',
      milestone: 'M35',
      kind: 'hidden automatic hook chain',
      depth: 'hidden hooks',
      entries: [
        { id: 'EVENTTURNEND', name: 'turn-end entry', source: { path: 'original-game/ERB/イベント関係/EVENT_TURNEND.ERB' } },
        { id: 'RESTTIME', name: 'rest/time handling', source: { path: 'original-game/ERB/イベント関係/EVENT_TURNEND.ERB' } },
        { id: 'RESTLIFE', name: 'life recovery', source: { path: 'original-game/ERB/イベント関係/EVENT_TURNEND.ERB' } },
        { id: 'PUBLIC_HAIR', name: 'public hair hook', source: { path: 'original-game/ERB/イベント関係/EVENT_TURNEND.ERB' } },
        { id: 'AUTO_BUYING', name: 'automatic buying', source: { path: 'original-game/ERB/イベント関係/EVENT_TURNEND.ERB' } },
        { id: 'AUTO_ITEMUSE', name: 'automatic item use', source: { path: 'original-game/ERB/イベント関係/EVENT_TURNEND.ERB' } },
        { id: 'EVENT_NEXTDAY', name: 'next day entry', source: { path: 'original-game/ERB/イベント関係/EVENT_NEXTDAY.ERB' } },
        { id: 'EVENT_NEWDAY', name: 'new day hook', source: { path: 'original-game/ERB/イベント関係/EVENT_NEXTDAY.ERB' } },
        { id: 'RUNNING_COST', name: 'running cost', source: { path: 'original-game/ERB/イベント関係/EVENT_NEXTDAY.ERB' } },
      ],
      artifacts: ['data/coverage/source-effects/M35.effects.json', 'data/coverage/source-effects/M35.review-queue.json'],
    }),
    featureNode({
      id: 'event-story-ending-info-config',
      name: 'Event / Story / Ending / Info / Config / Misc',
      milestone: 'M47-M49',
      kind: 'mixed event/config/display',
      depth: 'catchall to split',
      children: [
        featureNode({ id: 'events', name: 'Event definitions', milestone: 'M47', kind: 'event labels', depth: 'dynamic/catchall', entries: derivedEntries(derivedRows, 'eventDefinitions') }),
        featureNode({ id: 'endings', name: 'Ending definitions', milestone: 'M48', kind: 'ending labels', depth: 'condition/result', entries: derivedEntries(derivedRows, 'endingDefinitions') }),
        featureNode({ id: 'help-texts', name: 'Help/TIPS definitions', milestone: 'M49', kind: 'help text', depth: 'display', entries: derivedEntries(derivedRows, 'helpTextDefinitions') }),
        featureNode({ id: 'achievements', name: 'Achievement definitions', milestone: 'M49', kind: 'achievement', depth: 'condition/display', entries: derivedEntries(derivedRows, 'achievementDefinitions') }),
      ],
      artifacts: [derivedDefinitionFile],
    }),
  ],
  allDefinitions: {
    baseStats: catalogEntries(catalog, 'baseStats'),
    abilities: catalogEntries(catalog, 'abilities'),
    talents: catalogEntries(catalog, 'talents'),
    experiences: catalogEntries(catalog, 'experiences'),
    marks: catalogEntries(catalog, 'marks'),
    trainingParams: catalogEntries(catalog, 'trainingParams'),
    sourceDefinitions: catalogEntries(catalog, 'sourceDefinitions'),
    characterTextDefinitions: catalogEntries(catalog, 'characterTextDefinitions'),
    legacyCharacterFlagDefinitions: catalogEntries(catalog, 'legacyCharacterFlagDefinitions'),
  },
  coverageRows: coverage,
};

writeJson('data/coverage/game-feature-map.json', map);
console.log(
  `coverage:game-feature-map wrote data/coverage/game-feature-map.json (${map.hierarchy.length} top-level node(s), ${map.summary.mainMenuOptions} main menu option(s), ${map.summary.items} item(s), ${map.summary.trainingCommands} training command(s)).`,
);
