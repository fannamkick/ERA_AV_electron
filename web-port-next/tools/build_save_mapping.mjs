import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const outputPath = path.join(root, 'data', 'coverage', 'save-mapping.json');

const PERSISTENT_FAMILIES = new Set([
  'DAY',
  'TIME',
  'MONEY',
  'FLAG',
  'GLOBAL',
  'GLOBALS',
  'PBAND',
  'BASE',
  'MAXBASE',
  'ABL',
  'TALENT',
  'EXP',
  'MARK',
  'PALAM',
  'EX',
  'CFLAG',
  'JUEL',
  'STAIN',
  'GOTJUEL',
  'CSTR',
  'RELATION',
  'ITEM',
  'ITEMSALES',
  'BOUGHT',
  'NOITEM',
  'EQUIP',
  'ISASSI',
  'CHARASALES',
]);

const SCALAR_SAVE_FAMILIES = new Set(['DAY', 'TIME', 'MONEY', 'NOITEM']);
const SEMANTIC_FLAG_FAMILIES = new Set(['CFLAG', 'FLAG', 'GLOBAL', 'GLOBALS', 'PBAND']);

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

function writeJson(relativePath, value) {
  fs.mkdirSync(path.dirname(path.join(root, relativePath)), { recursive: true });
  fs.writeFileSync(path.join(root, relativePath), `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

function slug(value) {
  return (
    String(value || 'unknown')
      .replace(/\\/g, '/')
      .replace(/[^A-Za-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .toLowerCase()
      .slice(0, 140) || 'unknown'
  );
}

function countBy(rows, keyFn) {
  const result = {};
  for (const row of rows) {
    const key = keyFn(row) || '(empty)';
    result[key] = (result[key] ?? 0) + 1;
  }
  return Object.fromEntries(Object.entries(result).sort(([a], [b]) => a.localeCompare(b)));
}

function indexToken(index) {
  if (index === undefined || index === null || String(index) === '') return 'scalar';
  return String(index).replace(/[^A-Za-z0-9_-]/g, '_');
}

function sourceKindForSample(sample) {
  if (!sample) return 'unknown';
  if (sample.sourceKind === 'erbUsage') {
    return String(sample.file || '').toLowerCase().endsWith('.erh') ? 'erh-file' : 'erb-file';
  }
  if (sample.sourceKind === 'charaSeed') return 'chara-csv-row';
  if (sample.sourceKind === 'variableSize') return 'variable-size-row';
  if (sample.sourceKind === 'csvDefinition') return 'csv-row';
  return 'unknown';
}

function preferredSample(row) {
  const samples = row.samples ?? [];
  return (
    samples.find((sample) => sample.sourceKind === 'erbUsage') ??
    samples.find((sample) => sample.sourceKind === 'charaSeed') ??
    samples.find((sample) => sample.sourceKind === 'csvDefinition') ??
    samples.find((sample) => sample.sourceKind === 'variableSize') ??
    samples[0] ??
    null
  );
}

function sourceEvidenceForAddress(row) {
  const sample = preferredSample(row);
  const sourcePath = String(sample?.file ?? row.topFiles?.[0]?.[0] ?? '');
  const evidence = {
    evidenceId: `source:save-map:${slug(row.address)}`,
    sourceTier: sourcePath.startsWith('original-game/') ? 'primary' : 'auxiliary',
    sourceKind: sourceKindForSample(sample),
    sourcePath,
    label: row.labels?.[0] ?? '',
    line: sample?.line ?? '',
    csvRow: row.address,
    family: row.family,
    index: row.index,
    accessDirection: accessKind(row),
    sourceRole: sourcePath.startsWith('original-game/') ? 'original' : 'auxiliary',
  };
  return evidence;
}

function accessKind(row) {
  if (Number(row.readCount) > 0 && Number(row.writeCount) > 0) return 'read-write';
  if (Number(row.writeCount) > 0) return 'write-only';
  if (Number(row.readCount) > 0) return 'read-only';
  if (Number(row.charaSeedCount) > 0) return 'seed-only';
  return 'definition-only';
}

function firstErbWriteSource(row) {
  const writeLike = (row.samples ?? []).find(
    (sample) => sample.sourceKind === 'erbUsage' && typeof sample.text === 'string' && sample.text.includes('='),
  );
  const sample = writeLike ?? (row.samples ?? []).find((item) => item.sourceKind === 'erbUsage');
  if (sample) return `${sample.file}${sample.line ? `:${sample.line}` : ''}`;
  return row.topFiles?.[0]?.[0] ?? '';
}

function defaultSource(row) {
  if ((row.sourceKinds ?? []).includes('charaSeed')) return 'character-template-seed';
  if ((row.sourceKinds ?? []).includes('csvDefinition')) return 'csv-definition';
  if ((row.sourceKinds ?? []).includes('variableSize')) return 'variable-size-zero-default';
  return 'era-zero-default';
}

function textForDomain(row) {
  const files = (row.topFiles ?? []).map(([file]) => file).join(' ');
  const samples = (row.samples ?? []).map((sample) => `${sample.file ?? ''} ${sample.text ?? ''}`).join(' ');
  return `${files} ${samples}`.toUpperCase();
}

function domainFromAuditDomains(auditRow, fallback) {
  const domains = String(auditRow?.domains ?? '')
    .split('|')
    .map((domain) => domain.trim())
    .filter((domain) => domain && domain !== 'missingMapping');

  const priority = [
    'mission',
    'work',
    'filming',
    'equipment',
    'social',
    'body',
    'people',
    'inventory',
    'economy',
    'settings',
    'run',
    'meta',
    'world',
    'feature-state',
    'text',
  ];

  for (const domain of priority) {
    if (domains.includes(domain)) return domain;
  }

  return fallback;
}

function semanticDomain(row, auditRow) {
  const family = row.family;
  const text = textForDomain(row);
  const fallback = domainFromAuditDomains(auditRow, row.familyOwnerDomain || 'world');

  if (family === 'ABL' || family === 'TALENT' || family === 'EXP') return 'people';
  if (family === 'BASE' || family === 'MAXBASE' || family === 'MARK' || family === 'PALAM' || family === 'JUEL') return 'body';
  if (family === 'STAIN') return 'body';
  if (family === 'RELATION') return 'social';
  if (family === 'ITEM') return 'inventory';
  if (family === 'CSTR') return 'people';
  if (family === 'MONEY') return 'economy';
  if (family === 'DAY' || family === 'TIME') return 'run';
  if (family === 'NOITEM') return 'settings';

  if (SEMANTIC_FLAG_FAMILIES.has(family)) {
    if (text.includes('ACHIEVEMENT') || text.includes('CLEARBONUS')) return 'meta';
    if (text.includes('MISSION') || text.includes('ORDER')) return 'mission';
    if (text.includes('ARBEIT') || text.includes('WORK_') || text.includes('RECEPTION') || text.includes('CONCERT') || text.includes('STRIP')) {
      return 'work';
    }
    if (text.includes('SHOP_TAILOR') || text.includes('EQUIP') || text.includes('CLOTH')) return 'equipment';
    if (text.includes('SELL_VIDEO') || text.includes('VIDEO') || text.includes('SCENE') || text.includes('AV_')) return 'filming';
    if (text.includes('PREGNANCY') || text.includes('EGG') || text.includes('ADDICT') || text.includes('COMF') || text.includes('COMABLE')) {
      return 'body';
    }
    if (text.includes('SELL_CHARA') || text.includes('DELCHARA') || text.includes('INTERVIEW') || text.includes('SHOP_SLAVE')) {
      return 'people';
    }
    if (text.includes('EVENT_TURNEND') || text.includes('SYSTEM_NEWGAME') || text.includes('EVENT_MORNING') || text.includes('EVENT_NEXTDAY')) {
      return 'run';
    }
    if (text.includes('SHOP_ITEM') || text.includes('SHOP_MAIN') || text.includes('SHOP_YUUKAKU')) return 'economy';
    return fallback === 'feature-state' ? 'world' : fallback;
  }

  return fallback;
}

function flagPath(domain, row) {
  const token = indexToken(row.index);
  switch (domain) {
    case 'body':
      return `body.byCharacterId.*.conditionFlags.flag_${token}`;
    case 'people':
      return `people.characters.byId.*.progressFlags.flag_${token}`;
    case 'social':
      return `social.relationships.byCharacterId.*.flags.flag_${token}`;
    case 'equipment':
      return `equipment.byCharacterId.*.availabilityFlags.flag_${token}`;
    case 'work':
      return `work.characterProgress.byCharacterId.*.flags.flag_${token}`;
    case 'mission':
      return `mission.characterProgress.byCharacterId.*.flags.flag_${token}`;
    case 'filming':
      return `filming.progressFlags.flag_${token}`;
    case 'economy':
      return `economy.shopProgressFlags.flag_${token}`;
    case 'run':
      return `run.progressFlags.flag_${token}`;
    case 'meta':
      return `meta.achievementAndBonusFlags.flag_${token}`;
    case 'settings':
      return `settings.progressFlags.flag_${token}`;
    default:
      return `world.progressFlags.flag_${token}`;
  }
}

function fieldPathForMapped(row, auditRow, domain) {
  const index = indexToken(row.index);
  switch (row.family) {
    case 'ABL':
      return `people.characters.byId.*.attributes.abilities[${index}]`;
    case 'BASE':
      return `body.byCharacterId.*.baseStats[${index}]`;
    case 'MAXBASE':
      return `body.byCharacterId.*.maxBaseStats[${index}]`;
    case 'TALENT':
      return `people.characters.byId.*.attributes.traits[${index}]`;
    case 'EXP':
      return `people.characters.byId.*.attributes.experiences[${index}]`;
    case 'MARK':
      return `body.byCharacterId.*.marks[${index}]`;
    case 'PALAM':
      return `body.byCharacterId.*.parameters[${index}]`;
    case 'JUEL':
      return `body.byCharacterId.*.jewels[${index}]`;
    case 'STAIN':
      return `body.byCharacterId.*.stains[${index}]`;
    case 'CSTR':
      return `people.characters.byId.*.profileTextSlots[${index}]`;
    case 'RELATION':
      return `social.relationships.byCharacterId.*.towardCharacterId[${index}]`;
    case 'ITEM':
      return `inventory.itemCounts[itemId:${index}]`;
    case 'DAY':
      return row.index ? `run.clock.dayCounters.counter_${index}` : 'run.clock.elapsedDays';
    case 'TIME':
      return row.index ? `run.clock.timeCounters.counter_${index}` : 'run.clock.currentTimeSlot';
    case 'MONEY':
      return row.index === '2' ? 'economy.videoSalesTotal' : row.index ? `economy.accounts.account_${index}` : 'economy.currentMoney';
    case 'NOITEM':
      return 'settings.itemRequirementBypass';
    case 'CFLAG':
    case 'FLAG':
    case 'GLOBAL':
    case 'GLOBALS':
    case 'PBAND':
      return flagPath(domain, row);
    default:
      return `${domain}.mappedState.${row.family.toLowerCase()}_${index}`;
  }
}

function relatedDefinitionKeys(row) {
  switch (row.family) {
    case 'ABL':
      return ['abilities'];
    case 'BASE':
    case 'MAXBASE':
      return ['baseStats'];
    case 'TALENT':
      return ['talents'];
    case 'EXP':
      return ['experiences'];
    case 'MARK':
      return ['marks'];
    case 'ITEM':
      return ['items'];
    case 'CSTR':
      return ['characterTextDefinitions'];
    case 'CFLAG':
      return ['legacyCharacterFlagDefinitions', 'characterInitialValues'];
    case 'PALAM':
      return ['trainingParams'];
    default:
      return [];
  }
}

function relatedFeatureGroups(row, domain) {
  const groups = new Set();
  const text = textForDomain(row);
  if (text.includes('SHOP_ITEM')) groups.add('item-shop');
  if (text.includes('SHOP_MAIN')) groups.add('main-menu');
  if (text.includes('MISSION') || domain === 'mission') groups.add('mission');
  if (text.includes('ARBEIT') || text.includes('WORK_') || domain === 'work') groups.add('work');
  if (text.includes('SELL_VIDEO') || text.includes('VIDEO') || text.includes('SCENE') || domain === 'filming') groups.add('filming');
  if (text.includes('COMF') || text.includes('COMABLE') || text.includes('TRAIN') || row.family === 'PALAM' || row.family === 'JUEL') {
    groups.add('training');
  }
  if (text.includes('INTERVIEW') || text.includes('SELL_CHARA')) groups.add('recruit');
  if (text.includes('ACHIEVEMENT')) groups.add('achievement');
  if (text.includes('EVENT_TURNEND') || row.family === 'DAY' || row.family === 'TIME') groups.add('turn');
  if (groups.size === 0) groups.add(domain);
  return [...groups].sort();
}

function sourceRowClassification(row) {
  const sourceKinds = new Set(row.sourceKinds ?? []);
  const hasRuntimeUse = Number(row.readCount) > 0 || Number(row.writeCount) > 0;

  if (row.addressKind === 'family-declaration' && !SCALAR_SAVE_FAMILIES.has(row.family)) {
    return {
      status: 'non-save',
      classification: 'variable-size-declaration',
      nonSaveReason: 'VariableSize declaration or debug family selector; runtime values are represented by indexed rows.',
    };
  }

  if (row.family === 'STR') {
    return {
      status: 'non-save',
      classification: 'definition-display-text',
      nonSaveReason: 'STR is a display text definition source and temporary string input, not a save payload field.',
    };
  }

  if (!hasRuntimeUse && sourceKinds.has('charaSeed')) {
    return {
      status: 'non-save',
      classification: 'character-template-seed-only',
      nonSaveReason: 'Only character template seed evidence exists; it initializes definitions.characters before save instances are created.',
    };
  }

  if (!hasRuntimeUse && sourceKinds.has('csvDefinition')) {
    return {
      status: 'non-save',
      classification: 'definition-only',
      nonSaveReason: 'Only static CSV definition evidence exists; no runtime read/write evidence for save state.',
    };
  }

  return {
    status: 'mapped',
    classification: 'save-field',
    nonSaveReason: '',
  };
}

function sourceMappingRow(row, auditRow) {
  const classification = sourceRowClassification(row);
  const domain = semanticDomain(row, auditRow);
  const evidence = sourceEvidenceForAddress(row);
  const mapped = classification.status === 'mapped';
  const sourceAccess = accessKind(row);
  const fieldPath = mapped ? fieldPathForMapped(row, auditRow, domain) : '';
  const semanticOwnerSource = SEMANTIC_FLAG_FAMILIES.has(row.family)
    ? 'index-evidence-rule'
    : auditRow
      ? 'audit-domain-rule'
      : 'source-owner-rule';

  return {
    mappingRowId: `save-map:source:${slug(row.address)}`,
    address: row.address,
    family: row.family,
    index: row.index,
    addressKind: row.addressKind,
    sourceKinds: row.sourceKinds ?? [],
    readCount: Number(row.readCount) || 0,
    writeCount: Number(row.writeCount) || 0,
    charaSeedCount: Number(row.charaSeedCount) || 0,
    sourceAccess,
    status: classification.status,
    classification: classification.classification,
    runtimeOwner: mapped ? domain : nonSaveOwner(row, classification.classification),
    fieldPath,
    nonSaveReason: classification.nonSaveReason,
    defaultSource: sourceAccess === 'read-only' || sourceAccess === 'seed-only' || sourceAccess === 'definition-only' ? defaultSource(row) : '',
    writeSource: sourceAccess === 'write-only' || sourceAccess === 'read-write' ? firstErbWriteSource(row) : '',
    semanticOwnerSource,
    relatedFeatureGroups: mapped ? relatedFeatureGroups(row, domain) : [],
    relatedDefinitionKeys: relatedDefinitionKeys(row),
    templateSeedPath: row.charaSeedCount ? `definitions.characters.initialState.${row.family.toLowerCase()}[${indexToken(row.index)}]` : '',
    roundtripRequirement: mapped ? 'required' : 'not-saved',
    ownerMilestone: 'M24',
    sourceFile: evidence.sourcePath,
    sourceLine: evidence.line,
    sourceEvidenceId: evidence.evidenceId,
    sourceEvidence: evidence,
    notes: mapped
      ? 'Mapped from original family/index evidence into a save-owned domain field. Later implementation milestones must consume this path.'
      : 'Closed as non-save so it cannot be silently copied into save payloads.',
  };
}

function nonSaveOwner(row, classification) {
  switch (classification) {
    case 'variable-size-declaration':
      return 'definitions.variableSizes';
    case 'definition-display-text':
      return 'definitions.displayText';
    case 'character-template-seed-only':
      return 'definitions.characters.initialState';
    case 'definition-only':
      return row.family === 'ITEM' ? 'definitions.items' : `definitions.${row.family.toLowerCase()}`;
    default:
      return 'nonSave';
  }
}

function persistentCandidateClassification(candidate, sourceRow, saveRow) {
  if (sourceRow?.mappingAction === 'map-save-state' && saveRow) {
    return {
      status: saveRow.status === 'mapped' ? 'save-field' : saveRow.classification,
      runtimeOwner: saveRow.runtimeOwner,
      fieldPath: saveRow.fieldPath,
      saveMappingRowId: saveRow.mappingRowId,
      nonSaveReason: saveRow.nonSaveReason,
      ownerMilestone: 'M24',
    };
  }

  if (candidate.family === 'ITEMSALES') {
    return {
      status: 'session-state',
      runtimeOwner: 'session.shop.visibleListingIds',
      fieldPath: '',
      saveMappingRowId: '',
      nonSaveReason: 'Shop sale/visibility rows are rebuilt for the current shop screen and are owned by M25 session mapping, not inventory save state.',
      ownerMilestone: 'M25',
    };
  }

  if (candidate.family === 'EX' || candidate.family === 'GOTJUEL') {
    return {
      status: 'session-state',
      runtimeOwner: 'session.interaction.resultBuffers',
      fieldPath: '',
      saveMappingRowId: '',
      nonSaveReason: 'Training result counters are interaction/session buffers and are committed through final body/result writes only.',
      ownerMilestone: 'M25',
    };
  }

  return {
    status: 'blocker',
    runtimeOwner: '',
    fieldPath: '',
    saveMappingRowId: '',
    nonSaveReason: 'Persistent audit candidate has no save/session classification.',
    ownerMilestone: 'M24',
  };
}

function persistentCandidateRow(candidate, sourceRow, saveRow) {
  const classification = persistentCandidateClassification(candidate, sourceRow, saveRow);
  return {
    candidate: candidate.candidate,
    family: candidate.family,
    index: candidate.candidate.includes(':') ? candidate.candidate.split(':').at(-1) : '',
    domains: candidate.domains,
    accessKeyCount: Number(candidate.accessKeyCount) || 0,
    totalCount: Number(candidate.totalCount) || 0,
    readCount: Number(candidate.readCount) || 0,
    writeCount: Number(candidate.writeCount) || 0,
    sourceMappingAction: sourceRow?.mappingAction ?? 'missing-source-address',
    status: classification.status,
    runtimeOwner: classification.runtimeOwner,
    fieldPath: classification.fieldPath,
    saveMappingRowId: classification.saveMappingRowId,
    nonSaveReason: classification.nonSaveReason,
    ownerMilestone: classification.ownerMilestone,
  };
}

const sourceInventory = readJson('data/legacy-mapping/source-addresses.json');
const audit = readJson('data/legacy-state-scan/erb-state-audit.json');
const slotCandidates = readTsv('data/legacy-state-scan/erb-slot-candidates.tsv');

const sourceRows = sourceInventory.addresses.filter((row) => row.mappingAction === 'map-save-state');
const sourceByAddress = new Map(sourceInventory.addresses.map((row) => [row.address, row]));
const auditByAddress = new Map(slotCandidates.map((row) => [row.candidate, row]));
const saveRows = sourceRows.map((row) => sourceMappingRow(row, auditByAddress.get(row.address)));
const saveRowByAddress = new Map(saveRows.map((row) => [row.address, row]));

const persistentCandidates = slotCandidates
  .filter((row) => PERSISTENT_FAMILIES.has(row.family))
  .map((candidate) => persistentCandidateRow(candidate, sourceByAddress.get(candidate.candidate), saveRowByAddress.get(candidate.candidate)));

const ownerBlockers = [
  ...saveRows.filter((row) => row.status === 'blocker' || row.status === 'needsDecision' || row.status === 'missingMapping'),
  ...persistentCandidates.filter((row) => row.status === 'blocker' || row.status === 'needsDecision' || row.status === 'missingMapping'),
];

const semanticFlagRows = saveRows.filter((row) => SEMANTIC_FLAG_FAMILIES.has(row.family));
const semanticFlagMappedRows = semanticFlagRows.filter((row) => row.status === 'mapped');

const artifact = {
  schemaVersion: 'save-mapping/v1',
  generatedBy: 'tools/build_save_mapping.mjs',
  sourceInputs: {
    sourceAddresses: 'data/legacy-mapping/source-addresses.json',
    erbStateAudit: 'data/legacy-state-scan/erb-state-audit.json',
    erbSlotCandidates: 'data/legacy-state-scan/erb-slot-candidates.tsv',
  },
  expectedCounts: {
    mapSaveStateRows: 1215,
    runtimePersistentNumericSlots: audit.summary.runtimePersistentNumericSlots,
  },
  rowSchema: {
    status: 'mapped, non-save, or approved-excluded. No needsDecision/missingMapping status is allowed.',
    classification: 'save-field, variable-size-declaration, character-template-seed-only, definition-only, definition-display-text, or session-state.',
    runtimeOwner: 'New domain owner responsible for the state or non-save source.',
    fieldPath: 'Required for mapped rows; empty for non-save rows.',
    semanticOwnerSource: 'How family/index was split into a domain owner.',
    persistentCandidateCoverage: 'Separate review of ERB persistent numeric slot candidates, including session reclassification.',
  },
  summary: {
    sourceRows: saveRows.length,
    sourceRowsByStatus: countBy(saveRows, (row) => row.status),
    sourceRowsByClassification: countBy(saveRows, (row) => row.classification),
    sourceRowsByFamily: countBy(saveRows, (row) => row.family),
    mappedRows: saveRows.filter((row) => row.status === 'mapped').length,
    nonSaveRows: saveRows.filter((row) => row.status === 'non-save').length,
    approvedExcludedRows: saveRows.filter((row) => row.status === 'approved-excluded').length,
    ownerBlockers: ownerBlockers.length,
    persistentCandidateRows: persistentCandidates.length,
    persistentCandidatesByStatus: countBy(persistentCandidates, (row) => row.status),
    persistentCandidatesBySourceMappingAction: countBy(persistentCandidates, (row) => row.sourceMappingAction),
    persistentCandidatesWithMissingMappingDomainBeforeM24: persistentCandidates.filter((row) =>
      String(row.domains).split('|').includes('missingMapping'),
    ).length,
    persistentCandidatesUnclassifiedAfterM24: persistentCandidates.filter((row) =>
      ['blocker', 'needsDecision', 'missingMapping'].includes(row.status),
    ).length,
    semanticFlagRows: semanticFlagRows.length,
    semanticFlagMappedRows: semanticFlagMappedRows.length,
    semanticFlagRowsByRuntimeOwner: countBy(semanticFlagMappedRows, (row) => row.runtimeOwner),
  },
  assertions: {
    ownerBlockers,
    noNeedsDecisionOrMissingMapping: ownerBlockers.length === 0,
    cflagFlagGlobalPbandAreIndexSplit: semanticFlagRows.every(
      (row) => row.status !== 'mapped' || (row.index !== '' && row.semanticOwnerSource === 'index-evidence-rule'),
    ),
  },
  rows: saveRows,
  persistentCandidateCoverage: persistentCandidates,
};

writeJson('data/coverage/save-mapping.json', artifact);

console.log(
  `coverage:save-mapping wrote ${path.relative(root, outputPath)} (${saveRows.length} source row(s), ${persistentCandidates.length} persistent candidate row(s), ${ownerBlockers.length} blocker(s)).`,
);
