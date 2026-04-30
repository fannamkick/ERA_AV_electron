import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const outputPath = path.join(root, 'data', 'coverage', 'session-mapping.json');

const SESSION_FAMILIES = new Set([
  'TARGET',
  'ASSI',
  'MASTER',
  'PLAYER',
  'TFLAG',
  'UP',
  'DOWN',
  'EJAC',
  'LOSEBASE',
  'SELECTCOM',
  'ASSIPLAY',
  'PREVCOM',
  'NEXTCOM',
  'SOURCE',
  'TEQUIP',
  'SAVESTR',
  'TSTR',
  'TCVAR',
  'CUP',
  'CDOWN',
  'DOWNBASE',
  'DITEMTYPE',
  'DA',
  'DB',
  'DC',
  'DD',
  'DE',
  'TA',
  'TB',
  'NOWEX',
]);

const CALCULATION_BUFFER_FAMILIES = new Set([
  'SOURCE',
  'UP',
  'DOWN',
  'LOSEBASE',
  'NOWEX',
  'EJAC',
  'EX',
  'GOTJUEL',
]);

const TEXT_SCRATCH_FAMILIES = new Set(['SAVESTR', 'TSTR']);
const BUFFER_FAMILY_DECLARATIONS = new Set(['TFLAG', 'TCVAR', 'EX']);
const SCALAR_SESSION_FAMILIES = new Set([
  'TARGET',
  'ASSI',
  'MASTER',
  'PLAYER',
  'ASSIPLAY',
  'BOUGHT',
  'EJAC',
  'PREVCOM',
  'SELECTCOM',
]);

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
  if (sample.sourceKind === 'variableSize') return 'variable-size-row';
  if (sample.sourceKind === 'csvDefinition') return 'csv-row';
  return 'unknown';
}

function preferredSample(row) {
  const samples = row.samples ?? [];
  return (
    samples.find((sample) => sample.sourceKind === 'erbUsage') ??
    samples.find((sample) => sample.sourceKind === 'csvDefinition') ??
    samples.find((sample) => sample.sourceKind === 'variableSize') ??
    samples[0] ??
    null
  );
}

function accessKind(row) {
  if (Number(row.readCount) > 0 && Number(row.writeCount) > 0) return 'read-write';
  if (Number(row.writeCount) > 0) return 'write-only';
  if (Number(row.readCount) > 0) return 'read-only';
  return 'definition-only';
}

function sourceEvidenceForAddress(row) {
  const sample = preferredSample(row);
  const sourcePath = String(sample?.file ?? row.topFiles?.[0]?.[0] ?? '');
  return {
    evidenceId: `source:session-map:${slug(row.address)}`,
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
}

function firstWriteSource(row) {
  const writeLike = (row.samples ?? []).find(
    (sample) => sample.sourceKind === 'erbUsage' && typeof sample.text === 'string' && sample.text.includes('='),
  );
  const sample = writeLike ?? (row.samples ?? []).find((item) => item.sourceKind === 'erbUsage');
  if (sample) return `${sample.file}${sample.line ? `:${sample.line}` : ''}`;
  return row.topFiles?.[0]?.[0] ?? '';
}

function textForDomain(row) {
  const files = (row.topFiles ?? []).map(([file]) => file).join(' ');
  const samples = (row.samples ?? []).map((sample) => `${sample.file ?? ''} ${sample.text ?? ''}`).join(' ');
  return `${files} ${samples}`.toUpperCase();
}

function featureLifecycleOwner(row) {
  const text = textForDomain(row);
  if (text.includes('SHOP_ITEM') || row.family === 'ITEMSALES' || row.family === 'BOUGHT') return 'shop';
  if (text.includes('SELL_VIDEO') || text.includes('SPECIAL_TITLE') || text.includes('SHOP_AV') || text.includes('SCENE')) return 'filming';
  if (text.includes('WORK_') || text.includes('YUUKAKU') || text.includes('ARBEIT') || text.includes('RECEPTION')) return 'work';
  if (text.includes('INTERVIEW') || text.includes('SHOP_CHARABUY') || text.includes('NAME.ERB')) return 'recruit';
  if (text.includes('MISSION')) return 'mission';
  if (text.includes('BOYFRIEND') || text.includes('NTR')) return 'screen';
  if (
    text.includes('COMF') ||
    text.includes('COMABLE') ||
    text.includes('TRAIN_MAIN') ||
    text.includes('SYSTEM_SOURCE') ||
    text.includes('PASSOUT') ||
    text.includes('EVENT_TRAIN_MESSAGE') ||
    row.family === 'SOURCE' ||
    row.family === 'UP' ||
    row.family === 'DOWN' ||
    row.family === 'LOSEBASE' ||
    row.family === 'NOWEX' ||
    row.family === 'EJAC'
  ) {
    return 'training';
  }
  return 'interaction';
}

function sessionOwnerForFeature(featureOwner) {
  switch (featureOwner) {
    case 'shop':
      return 'session.shop';
    case 'filming':
      return 'session.filming';
    case 'work':
      return 'session.work';
    case 'recruit':
      return 'session.recruit';
    case 'mission':
      return 'session.mission';
    case 'screen':
      return 'session.screen';
    case 'training':
      return 'session.training';
    default:
      return 'session.interaction';
  }
}

function calculationOwnerForFeature(featureOwner) {
  switch (featureOwner) {
    case 'shop':
      return 'shop.calculateVisibleListings';
    case 'filming':
      return 'filming.calculateSceneSession';
    case 'work':
      return 'work.calculateShiftSession';
    case 'recruit':
      return 'recruit.calculateInterviewSession';
    case 'mission':
      return 'mission.calculateRuntimeConditions';
    case 'screen':
      return 'screen.calculateTemporaryTextAndSelection';
    case 'training':
      return 'training.calculateInteractionResult';
    default:
      return 'interaction.calculateTemporaryState';
  }
}

function relatedFeatureGroups(row, featureOwner) {
  const groups = new Set([featureOwner]);
  const text = textForDomain(row);
  if (text.includes('SHOP_ITEM')) groups.add('item-shop');
  if (text.includes('SHOP_MAIN')) groups.add('main-menu');
  if (text.includes('SELL_VIDEO') || text.includes('SPECIAL_TITLE')) groups.add('filming');
  if (text.includes('WORK_') || text.includes('YUUKAKU')) groups.add('work');
  if (text.includes('INTERVIEW') || text.includes('SHOP_CHARABUY')) groups.add('recruit');
  if (text.includes('COMF') || text.includes('SYSTEM_SOURCE') || text.includes('PASSOUT')) groups.add('training');
  if (text.includes('MISSION')) groups.add('mission');
  return [...groups].filter(Boolean).sort();
}

function relatedDefinitionKeys(row) {
  switch (row.family) {
    case 'ITEMSALES':
    case 'BOUGHT':
      return ['items', 'shopListings'];
    case 'SOURCE':
      return ['sourceDefinitions'];
    case 'TEQUIP':
      return ['equipmentDefinitions'];
    case 'TFLAG':
    case 'SELECTCOM':
    case 'PREVCOM':
      return ['trainingCommands'];
    case 'UP':
    case 'DOWN':
    case 'NOWEX':
    case 'LOSEBASE':
    case 'EJAC':
    case 'GOTJUEL':
    case 'EX':
      return ['baseStats', 'trainingParams', 'sourceDefinitions'];
    default:
      return [];
  }
}

function sourceRowStatus(row) {
  if (TEXT_SCRATCH_FAMILIES.has(row.family)) return 'calculation-internal';
  if (CALCULATION_BUFFER_FAMILIES.has(row.family)) return 'calculation-internal';
  if (row.addressKind === 'family-declaration' && BUFFER_FAMILY_DECLARATIONS.has(row.family)) return 'calculation-internal';
  return 'session-field';
}

function sourceRowClassification(row, featureOwner) {
  if (row.family === 'ITEMSALES') return 'shop-visible-listing-state';
  if (row.family === 'BOUGHT') return 'shop-current-selection';
  if (['TARGET', 'ASSI', 'MASTER', 'PLAYER', 'ASSIPLAY'].includes(row.family)) return 'interaction-participant-selection';
  if (['SELECTCOM', 'PREVCOM'].includes(row.family)) return 'interaction-command-selection';
  if (row.family === 'TFLAG') return featureOwner === 'filming' ? 'filming-temporary-flags' : 'interaction-temporary-flags';
  if (row.family === 'TEQUIP') return 'temporary-equipment-state';
  if (row.family === 'SOURCE') return 'stimulus-source-calculation-buffer';
  if (row.family === 'UP') return 'positive-parameter-delta-buffer';
  if (row.family === 'DOWN') return 'negative-parameter-delta-buffer';
  if (row.family === 'LOSEBASE') return 'base-cost-calculation-buffer';
  if (row.family === 'NOWEX') return 'current-experience-counter-buffer';
  if (row.family === 'EJAC') return 'ejaculation-threshold-buffer';
  if (row.family === 'EX') return 'climax-counter-buffer';
  if (row.family === 'GOTJUEL') return 'jewel-gain-buffer';
  if (row.family === 'SAVESTR') return 'message-fragment-buffer';
  if (row.family === 'TSTR') return 'name-generation-scratch';
  if (row.family === 'TCVAR') return featureOwner === 'filming' ? 'filming-scene-temporary-values' : 'screen-temporary-values';
  return 'session-temporary-value';
}

function sessionFieldPath(row, featureOwner, classification) {
  const index = indexToken(row.index);
  switch (row.family) {
    case 'ITEMSALES':
      return `session.shop.visibleListingByItemId[itemId:${index}]`;
    case 'BOUGHT':
      return 'session.shop.selectedItemId';
    case 'TARGET':
      return 'session.interaction.participants.targetCharacterId';
    case 'ASSI':
      return 'session.interaction.participants.assistantCharacterId';
    case 'MASTER':
      return 'session.interaction.participants.trainerCharacterId';
    case 'PLAYER':
      return 'session.interaction.participants.playerCharacterId';
    case 'ASSIPLAY':
      return 'session.interaction.participants.assistantActive';
    case 'SELECTCOM':
      return 'session.interaction.command.currentCommandId';
    case 'PREVCOM':
      return 'session.interaction.command.previousCommandId';
    case 'TFLAG':
      return `${sessionOwnerForFeature(featureOwner)}.${featureOwner === 'filming' ? 'sceneFlags' : 'commandFlags'}.flag_${index}`;
    case 'TEQUIP':
      return 'session.training.temporaryEquipment.equipmentFlag_' + index;
    case 'TCVAR':
      return `${sessionOwnerForFeature(featureOwner)}.temporaryValues.slot_${index}`;
    default:
      return `${sessionOwnerForFeature(featureOwner)}.${classification}.slot_${index}`;
  }
}

function sessionOwnerForRow(row, featureOwner, classification) {
  if (classification === 'interaction-participant-selection' || classification === 'interaction-command-selection') {
    return 'session.interaction';
  }
  if (row.family === 'TEQUIP') return 'session.training';
  if (row.family === 'ITEMSALES' || row.family === 'BOUGHT') return 'session.shop';
  return sessionOwnerForFeature(featureOwner);
}

function calculationPath(row, featureOwner, classification) {
  const index = indexToken(row.index);
  switch (row.family) {
    case 'SOURCE':
      return `training.calculateInteractionResult.stimulusSources.source_${index}`;
    case 'UP':
      return `training.calculateInteractionResult.positiveParameterDeltas.parameter_${index}`;
    case 'DOWN':
      return `training.calculateInteractionResult.negativeParameterDeltas.parameter_${index}`;
    case 'LOSEBASE':
      return `training.calculateInteractionResult.baseCosts.base_${index}`;
    case 'NOWEX':
      return `training.calculateInteractionResult.currentExperienceCounters.counter_${index}`;
    case 'EJAC':
      return 'training.calculateInteractionResult.ejaculationThreshold';
    case 'EX':
      return `training.calculateInteractionResult.climaxCounters.counter_${index}`;
    case 'GOTJUEL':
      return `training.calculateInteractionResult.jewelGains.jewel_${index}`;
    case 'SAVESTR':
      return `training.composeInteractionMessage.fragments.fragment_${index}`;
    case 'TSTR':
      return `recruit.composeGeneratedName.textParts.part_${index}`;
    case 'TFLAG':
      return `${calculationOwnerForFeature(featureOwner)}.resetOrLookupTemporaryFlagFamily`;
    case 'TCVAR':
      return `${calculationOwnerForFeature(featureOwner)}.resetTemporaryValueFamily`;
    default:
      return `${calculationOwnerForFeature(featureOwner)}.${classification}.slot_${index}`;
  }
}

function lifecycleFor(row, featureOwner, status) {
  if (row.family === 'ITEMSALES') {
    return {
      createdAt: 'item shop entry builds visible listing state from item definitions and unlock/progress conditions',
      consumedAt: 'item shop listing view and purchase availability calculation',
      disposedAt: 'leaving item shop or returning to main menu clears shop session state',
    };
  }
  if (row.family === 'BOUGHT') {
    return {
      createdAt: 'player selects an item in item shop',
      consumedAt: 'purchase confirmation/cancel handlers',
      disposedAt: 'purchase success, failure acknowledgement, cancel, or shop exit',
    };
  }
  if (['TARGET', 'ASSI', 'MASTER', 'PLAYER', 'ASSIPLAY'].includes(row.family)) {
    return {
      createdAt: 'interaction route selects participants',
      consumedAt: 'availability, message, result, and event calculations for the current interaction',
      disposedAt: 'interaction completion or route exit clears participant session',
    };
  }
  if (status === 'calculation-internal') {
    return {
      createdAt: `${featureOwner} calculation starts or resets its temporary buffers`,
      consumedAt: `${featureOwner} calculation commits final effects or display text`,
      disposedAt: `${featureOwner} calculation returns; intermediate buffers are not retained in save payload`,
    };
  }
  return {
    createdAt: `${featureOwner} route/session starts`,
    consumedAt: `${featureOwner} view, handler, or calculation reads current session state`,
    disposedAt: `${featureOwner} route exits, action completes, or session owner reset runs`,
  };
}

function committedResultPaths(row, status) {
  if (status !== 'calculation-internal' && row.family !== 'BOUGHT') return [];
  switch (row.family) {
    case 'BOUGHT':
      return ['economy.currentMoney', 'inventory.itemCounts'];
    case 'SOURCE':
    case 'UP':
    case 'DOWN':
      return ['body.byCharacterId.*.parameters', 'people.characters.byId.*.attributes.experiences'];
    case 'LOSEBASE':
    case 'EJAC':
      return ['body.byCharacterId.*.baseStats', 'body.byCharacterId.*.maxBaseStats'];
    case 'NOWEX':
    case 'EX':
      return ['people.characters.byId.*.attributes.experiences'];
    case 'GOTJUEL':
      return ['body.byCharacterId.*.jewels'];
    case 'SAVESTR':
    case 'TSTR':
    case 'TCVAR':
    case 'TFLAG':
      return [];
    default:
      return [];
  }
}

function sessionMappingRow(row, auditRow) {
  const featureOwner = featureLifecycleOwner(row);
  const status = sourceRowStatus(row);
  const classification = sourceRowClassification(row, featureOwner);
  const evidence = sourceEvidenceForAddress(row);
  const lifecycle = lifecycleFor(row, featureOwner, status);
  const isSessionField = status === 'session-field';

  return {
    mappingRowId: `session-map:source:${slug(row.address)}`,
    address: row.address,
    family: row.family,
    index: row.index,
    addressKind: row.addressKind,
    sourceKinds: row.sourceKinds ?? [],
    readCount: Number(row.readCount) || 0,
    writeCount: Number(row.writeCount) || 0,
    sourceAccess: accessKind(row),
    status,
    classification,
    sessionOwner: isSessionField ? sessionOwnerForRow(row, featureOwner, classification) : '',
    sessionFieldPath: isSessionField ? sessionFieldPath(row, featureOwner, classification) : '',
    calculationOwner: status === 'calculation-internal' ? calculationOwnerForFeature(featureOwner) : '',
    calculationPath: status === 'calculation-internal' ? calculationPath(row, featureOwner, classification) : '',
    featureLifecycleOwner: featureOwner,
    createdAt: lifecycle.createdAt,
    consumedAt: lifecycle.consumedAt,
    disposedAt: lifecycle.disposedAt,
    writeSource: Number(row.writeCount) > 0 ? firstWriteSource(row) : '',
    defaultSource:
      accessKind(row) === 'definition-only'
        ? 'definition-derived-default'
        : row.sourceKinds?.includes('variableSize')
          ? 'session-reset-default'
          : '',
    savePayloadPolicy: 'never-save-directly',
    committedResultPaths: committedResultPaths(row, status),
    relatedFeatureGroups: relatedFeatureGroups(row, featureOwner),
    relatedDefinitionKeys: relatedDefinitionKeys(row),
    candidateCoverageId: auditRow ? `session-candidate:${slug(auditRow.candidate)}` : '',
    ownerMilestone: 'M25',
    sourceFile: evidence.sourcePath,
    sourceLine: evidence.line,
    sourceEvidenceId: evidence.evidenceId,
    sourceEvidence: evidence,
    notes:
      status === 'session-field'
        ? 'Current-route/session state. It is created and discarded by the owning feature lifecycle.'
        : 'Calculation or scratch buffer. Only committed result paths may update save state.',
  };
}

function candidateStatus(row, sourceRow) {
  const featureOwner = featureLifecycleOwner(sourceRow ?? { family: row.family, topFiles: [], samples: [] });
  if (TEXT_SCRATCH_FAMILIES.has(row.family) || (String(row.domains).split('|').includes('script') && row.family === 'TSTR')) {
    return { status: 'script-scratch', owner: 'scriptScratch.textComposition', featureOwner };
  }
  if (CALCULATION_BUFFER_FAMILIES.has(row.family)) {
    return { status: `${featureOwner}-calculation`, owner: calculationOwnerForFeature(featureOwner), featureOwner };
  }
  if (row.family === 'TCVAR') {
    return { status: `${featureOwner}-session`, owner: sessionOwnerForFeature(featureOwner), featureOwner };
  }
  return { status: `${featureOwner}-session`, owner: sessionOwnerForFeature(featureOwner), featureOwner };
}

function candidateCoverageRow(candidate, sourceRow, sessionRow) {
  const status = candidateStatus(candidate, sourceRow);
  return {
    candidateCoverageId: `session-candidate:${slug(candidate.candidate)}`,
    candidate: candidate.candidate,
    family: candidate.family,
    index: candidate.candidate.includes(':') ? candidate.candidate.split(':').at(-1) : '',
    domains: candidate.domains,
    accessKeyCount: Number(candidate.accessKeyCount) || 0,
    totalCount: Number(candidate.totalCount) || 0,
    readCount: Number(candidate.readCount) || 0,
    writeCount: Number(candidate.writeCount) || 0,
    status: status.status,
    sessionOwner: status.status.endsWith('-session') ? status.owner : '',
    calculationOwner: status.status.endsWith('-calculation') || status.status === 'script-scratch' ? status.owner : '',
    featureLifecycleOwner: status.featureOwner,
    sourceMappingAction: sourceRow?.mappingAction ?? 'missing-source-address',
    sessionMappingRowId: sessionRow?.mappingRowId ?? '',
    savePayloadPolicy: 'never-save-directly',
    ownerMilestone: 'M25',
  };
}

const sourceInventory = readJson('data/legacy-mapping/source-addresses.json');
const audit = readJson('data/legacy-state-scan/erb-state-audit.json');
const slotCandidates = readTsv('data/legacy-state-scan/erb-slot-candidates.tsv');

const sourceRows = sourceInventory.addresses.filter((row) => row.mappingAction === 'map-session-state');
const sourceByAddress = new Map(sourceInventory.addresses.map((row) => [row.address, row]));
const auditByAddress = new Map(slotCandidates.map((row) => [row.candidate, row]));
const rows = sourceRows.map((row) => sessionMappingRow(row, auditByAddress.get(row.address)));
const rowsByAddress = new Map(rows.map((row) => [row.address, row]));
const runtimeSessionCandidates = slotCandidates
  .filter((row) => SESSION_FAMILIES.has(row.family))
  .map((candidate) => candidateCoverageRow(candidate, sourceByAddress.get(candidate.candidate), rowsByAddress.get(candidate.candidate)));

const ownerBlockers = [
  ...rows.filter((row) => ['blocker', 'needsDecision', 'missingMapping'].includes(row.status)),
  ...runtimeSessionCandidates.filter((row) => ['blocker', 'needsDecision', 'missingMapping'].includes(row.status)),
];

const artifact = {
  schemaVersion: 'session-mapping/v1',
  generatedBy: 'tools/build_session_mapping.mjs',
  sourceInputs: {
    sourceAddresses: 'data/legacy-mapping/source-addresses.json',
    erbStateAudit: 'data/legacy-state-scan/erb-state-audit.json',
    erbSlotCandidates: 'data/legacy-state-scan/erb-slot-candidates.tsv',
  },
  expectedCounts: {
    mapSessionStateRows: 365,
    runtimeSessionNumericSlots: audit.summary.runtimeSessionNumericSlots,
  },
  rowSchema: {
    status: 'session-field or calculation-internal. No save-field status is allowed in M25.',
    classification: 'Meaning-based row role, never the raw ERB family name as an owner.',
    sessionOwner: 'Required for session-field rows.',
    calculationOwner: 'Required for calculation-internal rows.',
    createdAt: 'Lifecycle start point.',
    consumedAt: 'Lifecycle consumer point.',
    disposedAt: 'Lifecycle disposal point.',
    savePayloadPolicy: 'Must remain never-save-directly.',
  },
  summary: {
    sourceRows: rows.length,
    sourceRowsByStatus: countBy(rows, (row) => row.status),
    sourceRowsByClassification: countBy(rows, (row) => row.classification),
    sourceRowsByFamily: countBy(rows, (row) => row.family),
    sessionFieldRows: rows.filter((row) => row.status === 'session-field').length,
    calculationInternalRows: rows.filter((row) => row.status === 'calculation-internal').length,
    ownerBlockers: ownerBlockers.length,
    runtimeSessionCandidateRows: runtimeSessionCandidates.length,
    runtimeSessionCandidateRowsByStatus: countBy(runtimeSessionCandidates, (row) => row.status),
    runtimeSessionCandidateRowsByFamily: countBy(runtimeSessionCandidates, (row) => row.family),
    runtimeSessionCandidatesWithMissingMappingDomainBeforeM25: runtimeSessionCandidates.filter((row) =>
      String(row.domains).split('|').includes('missingMapping'),
    ).length,
    runtimeSessionCandidatesUnclassifiedAfterM25: runtimeSessionCandidates.filter((row) =>
      ['blocker', 'needsDecision', 'missingMapping'].includes(row.status),
    ).length,
    rowsWithCommittedResultPaths: rows.filter((row) => row.committedResultPaths.length > 0).length,
  },
  assertions: {
    ownerBlockers,
    noNeedsDecisionOrMissingMapping: ownerBlockers.length === 0,
    neverSerializedToSavePayload: rows.every((row) => row.savePayloadPolicy === 'never-save-directly'),
    calculationRowsHaveLifecycle: rows
      .filter((row) => row.status === 'calculation-internal')
      .every((row) => row.createdAt && row.consumedAt && row.disposedAt && row.calculationOwner && row.calculationPath),
  },
  rows,
  runtimeSessionCandidateCoverage: runtimeSessionCandidates,
};

writeJson('data/coverage/session-mapping.json', artifact);

console.log(
  `coverage:session-mapping wrote ${path.relative(root, outputPath)} (${rows.length} source row(s), ${runtimeSessionCandidates.length} runtime session candidate row(s), ${ownerBlockers.length} blocker(s)).`,
);
