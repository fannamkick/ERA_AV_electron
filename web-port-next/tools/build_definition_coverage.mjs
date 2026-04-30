import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const coverageDir = path.join(root, 'data', 'coverage');

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));
}

function readTsv(relativePath) {
  const raw = fs.readFileSync(path.join(root, relativePath), 'utf8').replace(/^\uFEFF/, '');
  const [headerLine, ...lines] = raw.split(/\r?\n/).filter((line) => line.length > 0);
  const headers = headerLine.split('\t');
  return lines.map((line) => {
    const cells = line.split('\t');
    return Object.fromEntries(headers.map((header, index) => [header, cells[index] ?? '']));
  });
}

function numericId(id) {
  const value = Number(id);
  return Number.isInteger(value) ? value : undefined;
}

function slug(value) {
  return String(value || 'unknown')
    .replace(/\\/g, '/')
    .replace(/[^A-Za-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
    .slice(0, 140) || 'unknown';
}

function normalizeSourcePath(value) {
  return String(value || '').replace(/\\/g, '/');
}

function definitionSourceKind(partial, sourcePath) {
  if (partial.sourceKind === 'erb-derived-definition') {
    return sourcePath.toLowerCase().endsWith('.erh') ? 'erh-label' : 'erb-label';
  }

  if (partial.sourceKind === 'character-template' || partial.sourceKind === 'character-seed') {
    return 'chara-csv-row';
  }

  if (sourcePath.toLowerCase().endsWith('/variablesize.csv')) {
    return 'variable-size-row';
  }

  if (sourcePath.toLowerCase().endsWith('.csv')) {
    return 'csv-row';
  }

  return 'unknown';
}

function sourceEvidenceForDefinition(partial) {
  if (partial.sourceEvidence) {
    return partial.sourceEvidence;
  }

  const sourcePath = normalizeSourcePath(partial.sourceFile);
  const isPrimary = sourcePath.startsWith('original-game/');
  return {
    evidenceId: `source:definition:${slug(partial.definitionRowId)}`,
    sourceTier: isPrimary ? 'primary' : 'auxiliary',
    sourceKind: definitionSourceKind(partial, sourcePath),
    sourcePath,
    label: partial.sourceLabel ?? '',
    line: partial.sourceLine ?? '',
    csvRow: partial.sourceKind === 'erb-derived-definition' ? '' : partial.sourceId ?? '',
    family: partial.seedFamily ?? '',
    index: partial.seedIndex ?? partial.sourceId ?? '',
    accessDirection: 'definition',
    sourceRole: isPrimary ? 'original' : 'auxiliary',
  };
}

function itemRole(id) {
  const value = numericId(id);

  if (value === undefined) return 'unknown-item';
  if (value >= 100 && value <= 199) return 'recruit-listing';
  if (value >= 200 && value <= 214) return 'special-item';
  if (value >= 0 && value <= 99) return 'shop-item';
  return 'unknown-item';
}

function baseRow(partial) {
  const sourceEvidence = sourceEvidenceForDefinition(partial);
  const row = {
    definitionRowId: partial.definitionRowId,
    sourceKind: partial.sourceKind,
    definitionKey: partial.definitionKey ?? '',
    sourceFile: partial.sourceFile ?? '',
    sourceId: partial.sourceId ?? '',
    sourceName: partial.sourceName ?? '',
    runtimeId: partial.runtimeId ?? '',
    runtimeOwner: partial.runtimeOwner ?? '',
    role: partial.role ?? '',
    consumerKind: partial.consumerKind ?? '',
    consumingFeature: partial.consumingFeature ?? '',
    consumingView: partial.consumingView ?? '',
    consumingCalculation: partial.consumingCalculation ?? '',
    saveInitPath: partial.saveInitPath ?? '',
    handlerPath: partial.handlerPath ?? '',
    viewPath: partial.viewPath ?? '',
    calculationPath: partial.calculationPath ?? '',
    status: partial.status,
    ownerMilestone: partial.ownerMilestone,
    blockerId: partial.blockerId ?? '',
    sourceEvidenceId: sourceEvidence.evidenceId,
    sourceEvidence,
    characterId: partial.characterId ?? '',
    seedFamily: partial.seedFamily ?? '',
    seedIndex: partial.seedIndex ?? '',
    rawValue: partial.rawValue ?? '',
    notes: partial.notes ?? '',
  };

  const optionalFields = [
    'sourceLabel',
    'sourceLine',
    'derivedDefinitionId',
    'classification',
    'menuCode',
    'displayText',
    'actionTarget',
    'actionCondition',
    'componentCoverage',
    'conflictStatus',
    'conflictWith',
  ];

  for (const field of optionalFields) {
    if (partial[field]) row[field] = partial[field];
  }

  if (Array.isArray(partial.componentLabels) && partial.componentLabels.length > 0) {
    row.componentLabels = partial.componentLabels;
  }
  if (Array.isArray(partial.requiredComponents) && partial.requiredComponents.length > 0) {
    row.requiredComponents = partial.requiredComponents;
  }

  return row;
}

function blocker(partial) {
  return baseRow({
    status: 'blocker',
    ...partial,
  });
}

function catalogDefinitionRow(row) {
  const common = {
    sourceKind: 'raw-catalog-definition',
    definitionKey: row.catalogKey,
    sourceFile: row.sourcePath,
    sourceId: row.originalId || row.id,
    sourceName: row.originalName || row.label,
    runtimeId: row.id,
  };

  switch (row.catalogKey) {
    case 'items': {
      const role = itemRole(row.id);

      if (role === 'shop-item') {
        return baseRow({
          ...common,
          definitionRowId: `definition:item:${row.id}`,
          runtimeOwner: 'definitions.items + definitions.shopListings',
          role: 'listing',
          consumerKind: 'feature',
          consumingFeature: 'feature:item-shop:purchase-basic',
          consumingView: 'buildItemShopView',
          handlerPath: 'src/features/itemShop.ts',
          viewPath: 'src/ui/RouteScreens.tsx',
          status: 'listing',
          ownerMilestone: 'M24',
          notes: 'Item.csv 0~99 purchase candidate. M24 must complete item-by-item behavior.',
        });
      }

      if (role === 'recruit-listing') {
        return baseRow({
          ...common,
          definitionRowId: `definition:recruit-listing:${row.id}`,
          runtimeOwner: 'definitions.recruitListings',
          role: 'listing',
          consumerKind: 'feature',
          consumingFeature: 'feature:recruit:basic',
          consumingView: 'buildRecruitView',
          handlerPath: 'src/features/recruit.ts',
          viewPath: 'src/ui/RouteScreens.tsx',
          status: 'listing',
          ownerMilestone: 'M24',
          notes: 'Item.csv 100~199 recruit listing candidate. M24 must verify every linked character template.',
        });
      }

      return blocker({
        ...common,
        definitionRowId: `definition:item-special:${row.id}`,
        runtimeOwner: 'pending feature owner',
        role: 'blocker',
        consumerKind: 'blocker',
        status: 'blocker',
        ownerMilestone: 'M24',
        blockerId: 'blocker:m20:item-special',
        notes: 'Item.csv 200~214 special item. It must not be treated as a normal shop item without owner decision.',
      });
    }

    case 'trainingCommands': {
      if (row.id === '0') {
        return baseRow({
          ...common,
          definitionRowId: `definition:training-command:${row.id}`,
          runtimeOwner: 'definitions.trainingCommands',
          role: 'rule',
          consumerKind: 'feature',
          consumingFeature: 'feature:training:basic-command',
          consumingView: 'buildTrainingView',
          consumingCalculation: 'training command result calculation',
          handlerPath: 'src/features/training.ts',
          viewPath: 'src/ui/RouteScreens.tsx',
          calculationPath: 'src/features/training.ts',
          status: 'used',
          ownerMilestone: 'M14',
          notes: 'M14 minimum command. M28 must still complete full command coverage.',
        });
      }

      return blocker({
        ...common,
        definitionRowId: `definition:training-command:${row.id}`,
        runtimeOwner: 'definitions.trainingCommands',
        role: 'blocker',
        consumerKind: 'blocker',
        ownerMilestone: 'M28',
        blockerId: 'blocker:m20:training-command-effect',
        notes: 'Train.csv command requires command-specific availability/effect/session cleanup in M28.',
      });
    }

    case 'sourceDefinitions':
      return baseRow({
        ...common,
        definitionRowId: `definition:source:${row.id}`,
        runtimeOwner: 'definitions.sourceDefinitions',
        role: 'calculation',
        consumerKind: 'calculation',
        consumingFeature: 'feature:training:basic-command',
        consumingCalculation: 'training source calculation',
        calculationPath: 'M28 training calculation pipeline',
        status: 'calculation-only',
        ownerMilestone: 'M28',
        notes: 'Source definition is a calculation input, not a save/session field.',
      });

    case 'trainingParams':
      return baseRow({
        ...common,
        definitionRowId: `definition:training-param:${row.id}`,
        runtimeOwner: 'definitions.trainingParams',
        role: 'calculation',
        consumerKind: 'calculation',
        consumingFeature: 'feature:training:basic-command',
        consumingCalculation: 'training parameter display/result calculation',
        calculationPath: 'src/features/training.ts; M28 full pipeline',
        status: 'calculation-only',
        ownerMilestone: 'M28',
      });

    case 'legacyCharacterFlagDefinitions':
      return blocker({
        ...common,
        definitionRowId: `definition:cflag:${row.id}`,
        runtimeOwner: 'pending CFLAG owner domain',
        role: 'blocker',
        consumerKind: 'blocker',
        ownerMilestone: 'M21',
        blockerId: 'blocker:m20:legacy-character-flag-definition',
        notes: 'CFLAG definitions must be split by meaning in M21 instead of copied as one domain.',
      });

    case 'baseStats':
      return baseRow({
        ...common,
        definitionRowId: `definition:base-stat:${row.id}`,
        runtimeOwner: 'definitions.baseStats',
        role: 'display',
        consumerKind: 'view-and-save-init',
        consumingFeature: 'feature:game:new;feature:recruit:basic',
        consumingView: 'character status views in M25',
        saveInitPath: 'src/features/characterCreation.ts',
        status: 'display-only',
        ownerMilestone: 'M25',
      });

    case 'abilities':
      return baseRow({
        ...common,
        definitionRowId: `definition:ability:${row.id}`,
        runtimeOwner: 'definitions.abilities',
        role: 'display',
        consumerKind: 'view-and-save-init',
        consumingFeature: 'feature:game:new;feature:recruit:basic;feature:ability-up',
        consumingView: 'character/ability views in M23/M25',
        saveInitPath: 'src/features/characterCreation.ts',
        status: 'display-only',
        ownerMilestone: 'M25',
      });

    case 'talents':
      return baseRow({
        ...common,
        definitionRowId: `definition:talent:${row.id}`,
        runtimeOwner: 'definitions.talents',
        role: 'display',
        consumerKind: 'view-and-save-init',
        consumingFeature: 'feature:game:new;feature:recruit:basic;feature:training:basic-command',
        consumingView: 'character trait views in M25',
        saveInitPath: 'src/features/characterCreation.ts',
        status: 'display-only',
        ownerMilestone: 'M25',
      });

    case 'experiences':
      return baseRow({
        ...common,
        definitionRowId: `definition:experience:${row.id}`,
        runtimeOwner: 'definitions.experiences',
        role: 'display',
        consumerKind: 'view-and-save-init',
        consumingFeature: 'feature:game:new;feature:recruit:basic;feature:work:basic;feature:shooting:basic;feature:training:basic-command',
        consumingView: 'character experience views in M25',
        saveInitPath: 'src/features/characterCreation.ts',
        status: 'display-only',
        ownerMilestone: 'M25',
      });

    case 'marks':
      return baseRow({
        ...common,
        definitionRowId: `definition:mark:${row.id}`,
        runtimeOwner: 'definitions.marks',
        role: 'display',
        consumerKind: 'view-and-calculation',
        consumingFeature: 'feature:training:basic-command',
        consumingView: 'character mark views in M25',
        consumingCalculation: 'training/event condition calculations in M27/M28',
        status: 'display-only',
        ownerMilestone: 'M25',
      });

    case 'characterTextDefinitions':
      return baseRow({
        ...common,
        definitionRowId: `definition:character-text:${row.id}`,
        runtimeOwner: 'definitions.characterTextDefinitions',
        role: 'display',
        consumerKind: 'view-and-template',
        consumingFeature: 'feature:game:new;feature:recruit:basic',
        consumingView: 'character text views in M25',
        saveInitPath: 'src/features/characterCreation.ts',
        status: 'display-only',
        ownerMilestone: 'M25',
      });

    default:
      return blocker({
        ...common,
        definitionRowId: `definition:${row.catalogKey}:${row.id}`,
        runtimeOwner: `definitions.${row.catalogKey}`,
        role: 'blocker',
        consumerKind: 'blocker',
        ownerMilestone: 'M20',
        blockerId: 'blocker:m20:unknown-catalog-definition',
        notes: `No M20 classification rule for catalogKey=${row.catalogKey}.`,
      });
  }
}

function characterTemplateRow(row) {
  return baseRow({
    definitionRowId: `definition:character-template:${row.id}`,
    sourceKind: 'character-template',
    definitionKey: 'characters',
    sourceFile: row.sourcePath,
    sourceId: row.id,
    sourceName: row.displayName,
    runtimeId: row.id,
    runtimeOwner: 'definitions.characters',
    role: 'template',
    consumerKind: 'save-init',
    consumingFeature: 'feature:game:new;feature:recruit:basic',
    saveInitPath: 'src/features/characterCreation.ts',
    handlerPath: 'src/features/characterCreation.ts',
    status: 'template',
    ownerMilestone: 'M25',
    characterId: row.id,
    notes: `base=${row.baseStatCount}, ability=${row.abilityCount}, talent=${row.talentCount}, exp=${row.experienceCount}, cflag=${row.characterFlagCount}, relation=${row.relationCount}`,
  });
}

function seedClassification(row) {
  switch (row.family) {
    case 'BASE':
      return {
        runtimeOwner: 'definitions.characters.initialState.baseStats -> GameState.people.characters.attributes.baseStats',
        role: 'template',
        consumerKind: 'save-init',
        status: 'template',
        ownerMilestone: 'M25',
        saveInitPath: 'src/features/characterCreation.ts:createCharacterFromTemplate',
      };
    case 'ABL':
      return {
        runtimeOwner: 'definitions.characters.initialState.abilities -> GameState.people.characters.attributes.abilities',
        role: 'template',
        consumerKind: 'save-init',
        status: 'template',
        ownerMilestone: 'M25',
        saveInitPath: 'src/features/characterCreation.ts:createCharacterFromTemplate',
      };
    case 'TALENT':
      return {
        runtimeOwner: 'definitions.characters.initialState.talents -> GameState.people.characters.attributes.traits',
        role: 'template',
        consumerKind: 'save-init',
        status: 'template',
        ownerMilestone: 'M25',
        saveInitPath: 'src/features/characterCreation.ts:createCharacterFromTemplate',
      };
    case 'EXP':
      return {
        runtimeOwner: 'definitions.characters.initialState.experiences -> GameState.people.characters.attributes.experiences',
        role: 'template',
        consumerKind: 'save-init',
        status: 'template',
        ownerMilestone: 'M25',
        saveInitPath: 'src/features/characterCreation.ts:createCharacterFromTemplate',
      };
    case 'RELATION':
      return {
        runtimeOwner: 'definitions.characters.initialState.relations -> GameState.social.relationships',
        role: 'template',
        consumerKind: 'save-init',
        status: 'template',
        ownerMilestone: 'M25',
        saveInitPath: 'src/features/characterCreation.ts:createCharacterBundle',
      };
    case 'CSTR':
      return {
        runtimeOwner: 'definitions.characters.initialState.characterTexts -> character text views',
        role: 'template',
        consumerKind: 'view-and-save-init',
        status: 'template',
        ownerMilestone: 'M25',
        saveInitPath: 'src/features/characterCreation.ts',
      };
    case 'CFLAG':
      return {
        runtimeOwner: 'pending CFLAG owner domain',
        role: 'blocker',
        consumerKind: 'blocker',
        status: 'blocker',
        ownerMilestone: 'M21',
        blockerId: 'blocker:m20:chara-cflag-seed',
        notes: 'Chara CFLAG seed is preserved as legacyFlagsNeedingMapping until M21 splits it by meaning.',
      };
    default:
      return {
        runtimeOwner: 'pending character seed owner',
        role: 'blocker',
        consumerKind: 'blocker',
        status: 'blocker',
        ownerMilestone: 'M20',
        blockerId: 'blocker:m20:unknown-character-seed',
        notes: `Unknown seed family ${row.family}.`,
      };
  }
}

function characterSeedRow(row) {
  const classification = seedClassification(row);
  const common = {
    definitionRowId: `definition:character-seed:${row.characterId}:${row.family}:${row.index}:${row.line}`,
    sourceKind: 'character-seed',
    definitionKey: 'characterInitialValues',
    sourceFile: row.sourcePath,
    sourceId: `${row.family}:${row.index}`,
    sourceName: `${row.family}:${row.index}`,
    runtimeId: `character:${row.characterId}:${row.family}:${row.index}`,
    consumingFeature: classification.status === 'blocker' ? '' : 'feature:game:new;feature:recruit:basic',
    characterId: row.characterId,
    seedFamily: row.family,
    seedIndex: row.index,
    rawValue: row.value,
    notes: classification.notes ?? '',
  };

  if (classification.status === 'blocker') {
    return blocker({
      ...common,
      ...classification,
    });
  }

  return baseRow({
    ...common,
    ...classification,
  });
}

function readErbDerivedRows() {
  const derivedPath = path.join(coverageDir, 'erb-derived-definitions.json');

  if (!fs.existsSync(derivedPath)) {
    return [];
  }

  const artifact = JSON.parse(fs.readFileSync(derivedPath, 'utf8'));
  if (artifact.schemaVersion !== 'erb-derived-definitions/v1' || !Array.isArray(artifact.rows)) {
    throw new Error('Invalid data/coverage/erb-derived-definitions.json; run npm run coverage:erb-definitions');
  }

  return artifact.rows.map((row) =>
    baseRow({
      definitionRowId: `definition:${row.derivedDefinitionId}`,
      sourceKind: 'erb-derived-definition',
      definitionKey: row.definitionKey,
      sourceFile: row.sourceFile,
      sourceLabel: row.sourceLabel,
      sourceLine: row.sourceLine,
      sourceId: row.sourceId,
      sourceName: row.sourceName,
      runtimeId: row.runtimeId,
      runtimeOwner: row.runtimeOwner,
      role: row.role,
      consumerKind: row.consumerKind,
      consumingFeature: row.consumingFeature,
      consumingView: row.consumingView,
      consumingCalculation: row.consumingCalculation,
      saveInitPath: row.saveInitPath,
      handlerPath: row.handlerPath,
      viewPath: row.viewPath,
      calculationPath: row.calculationPath,
      status: row.statusForDefinitionCoverage,
      ownerMilestone: row.ownerMilestone,
      blockerId: row.blockerId,
      sourceEvidenceId: row.sourceEvidenceId,
      sourceEvidence: row.sourceEvidence,
      notes: row.notes,
      derivedDefinitionId: row.derivedDefinitionId,
      classification: row.classification,
      menuCode: row.menuCode,
      displayText: row.displayText,
      actionTarget: row.actionTarget,
      actionCondition: row.actionCondition,
      componentLabels: row.componentLabels,
      componentCoverage: row.componentCoverage,
      requiredComponents: row.requiredComponents,
      conflictStatus: row.conflictStatus,
      conflictWith: row.conflictWith,
    }),
  );
}

function countBy(rows, keyFn) {
  const result = {};
  for (const row of rows) {
    const key = keyFn(row);
    result[key] = (result[key] ?? 0) + 1;
  }
  return Object.fromEntries(Object.entries(result).sort(([a], [b]) => a.localeCompare(b)));
}

function readExistingExternalBlockers() {
  const blockersPath = path.join(coverageDir, 'blockers.json');

  if (!fs.existsSync(blockersPath)) {
    return [];
  }

  const existing = JSON.parse(fs.readFileSync(blockersPath, 'utf8'));
  if (!Array.isArray(existing.blockers)) {
    return [];
  }

  return existing.blockers.filter((blocker) => !String(blocker.blockerId ?? '').startsWith('blocker:m20:'));
}

function blockerRegistryRows(rows) {
  const blockers = new Map();

  for (const row of rows) {
    if (row.status !== 'blocker') continue;
    if (blockers.has(row.blockerId)) continue;

    blockers.set(row.blockerId, {
      blockerId: row.blockerId,
      ownerMilestone: row.ownerMilestone,
      sourceLocation: row.sourceFile,
      sourceEvidenceId: row.sourceEvidenceId,
      sourceEvidence: row.sourceEvidence,
      blockedTarget: row.definitionKey || row.seedFamily,
      status: 'blocker',
      reason: row.role || 'definition coverage not complete',
      requiredDecision: 'Resolve the definition owner/consumer with M18 templates, or record an approved exclusion with user approval.',
      temporaryRuntimeBehavior: row.notes || 'Not completed in runtime definition coverage.',
      completionBlocked: true,
      unblocksWhen: 'Definition row gains runtime owner, consumer, status, and verification evidence, or approved-excluded with user approval.',
      verificationToClose: 'npm run gate:definition-consumption',
    });
  }

  return [...blockers.values()].sort((a, b) => a.blockerId.localeCompare(b.blockerId));
}

function mergeBlockers(...groups) {
  const merged = new Map();

  for (const group of groups) {
    for (const blocker of group) {
      merged.set(blocker.blockerId, blocker);
    }
  }

  return [...merged.values()].sort((a, b) => a.blockerId.localeCompare(b.blockerId));
}

const catalogArtifact = readJson('data/catalog/legacy-catalog.json');
const rawDefinitions = readTsv('data/catalog/legacy-catalog-definitions.tsv');
const characterTemplates = readTsv('data/catalog/legacy-character-templates.tsv');
const characterSeeds = readTsv('data/catalog/legacy-character-initial-values.tsv');

const rows = [
  ...rawDefinitions.map(catalogDefinitionRow),
  ...characterTemplates.map(characterTemplateRow),
  ...characterSeeds.map(characterSeedRow),
  ...readErbDerivedRows(),
];

const rawDefinitionCount = rawDefinitions.length + characterTemplates.length;
const characterSeedCount = characterSeeds.length;
const expectedRawDefinitionCount = catalogArtifact.diagnostics?.totalDefinitions ?? catalogArtifact.summary?.totalDefinitions ?? 918;
const expectedCharacterSeedCount = catalogArtifact.characterDiagnostics?.initialValueRows ?? characterSeedCount;

const coverage = {
  schemaVersion: 'definition-coverage/v1',
  generatedBy: 'tools/build_definition_coverage.mjs',
  sourceCatalog: {
    catalogJson: 'data/catalog/legacy-catalog.json',
    definitionsTsv: 'data/catalog/legacy-catalog-definitions.tsv',
    characterTemplatesTsv: 'data/catalog/legacy-character-templates.tsv',
    characterInitialValuesTsv: 'data/catalog/legacy-character-initial-values.tsv',
  },
  expectedCounts: {
    rawDefinitions: expectedRawDefinitionCount,
    characterSeedRows: expectedCharacterSeedCount,
  },
  rowSchema: {
    definitionRowId: 'Stable definition coverage id.',
    sourceKind: 'raw-catalog-definition, character-template, character-seed, or erb-derived-definition.',
    definitionKey: 'Runtime definition collection or seed collection.',
    sourceFile: 'Original CSV/Chara file.',
    sourceLabel: 'Original ERB/ERH label when sourceKind is erb-derived-definition.',
    sourceLine: 'Original ERB/ERH line when sourceKind is erb-derived-definition.',
    sourceId: 'Original id, row key, or family:index.',
    sourceName: 'Original display name or source key.',
    runtimeId: 'Runtime definition id.',
    runtimeOwner: 'definitions/save/view/calculation owner.',
    role: 'rule, display, calculation, template, listing, blocker, approved-excluded.',
    consumerKind: 'feature, view, calculation, save-init, view-and-save-init, blocker.',
    consumingFeature: 'Feature coverage id(s), if applicable.',
    consumingView: 'View owner, if applicable.',
    consumingCalculation: 'Calculation owner, if applicable.',
    saveInitPath: 'Instantiation or save init owner, if applicable.',
    status: 'used, display-only, calculation-only, template, listing, blocker, or approved-excluded.',
    blockerId: 'Blocker registry id for blocker rows.',
    sourceEvidenceId: 'Common source evidence id shared by coverage/gate rows.',
    sourceEvidence: 'Common source evidence object with source path, CSV row, family/index, and access direction.',
    derivedDefinitionId: 'ERB-derived definition id when sourceKind is erb-derived-definition.',
    componentLabels: 'ERB component labels such as title, visible, fee, calc, report, or text pieces.',
  },
  summary: {
    totalRows: rows.length,
    rawDefinitionRows: rawDefinitionCount,
    characterSeedRows: characterSeedCount,
    byStatus: countBy(rows, (row) => row.status),
    bySourceKind: countBy(rows, (row) => row.sourceKind),
    byDefinitionKey: countBy(rows, (row) => row.definitionKey),
    byOwnerMilestone: countBy(rows, (row) => row.ownerMilestone),
    bySeedFamily: countBy(
      rows.filter((row) => row.sourceKind === 'character-seed'),
      (row) => row.seedFamily,
    ),
  },
  rows,
};

const blockers = {
  schemaVersion: 'blocker-registry/v1',
  generatedBy: 'coverage scripts',
  blockers: mergeBlockers(readExistingExternalBlockers(), blockerRegistryRows(rows)),
};

fs.mkdirSync(coverageDir, { recursive: true });
fs.writeFileSync(path.join(coverageDir, 'definitions.json'), `${JSON.stringify(coverage, null, 2)}\n`, 'utf8');
fs.writeFileSync(path.join(coverageDir, 'blockers.json'), `${JSON.stringify(blockers, null, 2)}\n`, 'utf8');

console.log(
  JSON.stringify(
    {
      definitions: coverage.summary,
      blockers: blockers.blockers.length,
      output: ['data/coverage/definitions.json', 'data/coverage/blockers.json'],
    },
    null,
    2,
  ),
);
