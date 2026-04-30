import type { ModuleDiagnostic } from '../../kernel/module';

export const legacyVariableFamilies = [
  'ITEMNAME',
  'ABLNAME',
  'TALENTNAME',
  'EXPNAME',
  'MARKNAME',
  'PALAMNAME',
  'TRAINNAME',
  'BASENAME',
  'SOURCENAME',
  'EXNAME',
  'EQUIPNAME',
  'TEQUIPNAME',
  'FLAGNAME',
  'CFLAGNAME',
  'TFLAGNAME',
  'STR',
  'DAY',
  'MONEY',
  'ITEM',
  'FLAG',
  'TFLAG',
  'UP',
  'PALAMLV',
  'EXPLV',
  'EJAC',
  'DOWN',
  'RESULT',
  'COUNT',
  'TARGET',
  'ASSI',
  'MASTER',
  'NOITEM',
  'LOSEBASE',
  'SELECTCOM',
  'ASSIPLAY',
  'PREVCOM',
  'TIME',
  'ITEMSALES',
  'PLAYER',
  'NEXTCOM',
  'PBAND',
  'BOUGHT',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  'SAVESTR',
  'RESULTS',
  'BASE',
  'MAXBASE',
  'ABL',
  'TALENT',
  'EXP',
  'MARK',
  'PALAM',
  'SOURCE',
  'EX',
  'CFLAG',
  'JUEL',
  'RELATION',
  'EQUIP',
  'TEQUIP',
  'STAIN',
  'GOTJUEL',
  'NOWEX',
  'CSTR',
  'CUP',
  'CDOWN',
  'DOWNBASE',
  'TSTR',
  'TCVAR',
  'LOCAL',
  'LOCALS',
  'ARG',
  'ARGS',
  'GLOBAL',
  'GLOBALS',
  'DITEMTYPE',
  'DA',
  'DB',
  'DC',
  'DD',
  'DE',
  'TA',
  'TB',
] as const;

export type LegacyVariableFamily = (typeof legacyVariableFamilies)[number];

export type LegacyFamilyOwnershipStatus = 'mapped' | 'needsIndexMapping' | 'reserved' | 'excluded';

export type LegacyFamilyOwnership = {
  readonly family: LegacyVariableFamily;
  readonly ownerDomain: string;
  readonly ownerPath: string;
  readonly persistence: 'catalog' | 'save' | 'session' | 'temporary' | 'reserved';
  readonly status: LegacyFamilyOwnershipStatus;
  readonly notes: string;
};

type LegacyFamilyGroup = {
  readonly families: readonly LegacyVariableFamily[];
  readonly ownerDomain: string;
  readonly ownerPath: string;
  readonly persistence: LegacyFamilyOwnership['persistence'];
  readonly status: LegacyFamilyOwnershipStatus;
  readonly notes: string;
};

const legacyFamilyGroups: readonly LegacyFamilyGroup[] = [
  {
    families: [
      'ITEMNAME',
      'ABLNAME',
      'TALENTNAME',
      'EXPNAME',
      'MARKNAME',
      'PALAMNAME',
      'TRAINNAME',
      'BASENAME',
      'SOURCENAME',
      'EXNAME',
      'EQUIPNAME',
      'TEQUIPNAME',
      'FLAGNAME',
      'CFLAGNAME',
      'TFLAGNAME',
    ],
    ownerDomain: 'catalog',
    ownerPath: 'catalog.*Definitions',
    persistence: 'catalog',
    status: 'mapped',
    notes: 'Name/label tables. Never treated as runtime state.',
  },
  {
    families: ['PALAMLV', 'EXPLV'],
    ownerDomain: 'catalog',
    ownerPath: 'catalog.thresholds',
    persistence: 'catalog',
    status: 'mapped',
    notes: 'Static level threshold tables.',
  },
  {
    families: ['STR'],
    ownerDomain: 'text',
    ownerPath: 'text.displayRules',
    persistence: 'save',
    status: 'needsIndexMapping',
    notes: 'Mostly text/static string usage. Legacy index review decides catalog vs persistent text.',
  },
  {
    families: ['DAY', 'TIME'],
    ownerDomain: 'run',
    ownerPath: 'run.clock',
    persistence: 'save',
    status: 'mapped',
    notes: 'Current run calendar and phase progression.',
  },
  {
    families: ['MONEY'],
    ownerDomain: 'economy',
    ownerPath: 'economy.account',
    persistence: 'save',
    status: 'mapped',
    notes: 'Current money only. Objectives, debt, reputation, and lifetime counters require separate use-site evidence before modeling.',
  },
  {
    families: ['ITEM'],
    ownerDomain: 'inventory',
    ownerPath: 'inventory.itemCounts',
    persistence: 'save',
    status: 'needsIndexMapping',
    notes: 'ITEM is itemId -> quantity.',
  },
  {
    families: ['NOITEM'],
    ownerDomain: 'settings',
    ownerPath: 'settings.legacySettingsFlagsNeedingMapping',
    persistence: 'save',
    status: 'needsIndexMapping',
    notes: 'Global item requirement bypass checked in COMABLE. No writer was found, so keep behind legacy mapping until source is identified.',
  },
  {
    families: ['ITEMSALES'],
    ownerDomain: 'shop',
    ownerPath: 'session.shop.visibleListingIds',
    persistence: 'session',
    status: 'needsIndexMapping',
    notes: 'Current shop listing visibility/availability cache. Persist only explicit unlock or permanent restriction evidence in GameState.shop.',
  },
  {
    families: ['BOUGHT'],
    ownerDomain: 'shop',
    ownerPath: 'session.shop.selectedItemId',
    persistence: 'session',
    status: 'mapped',
    notes: 'Current shop selection/display state, not purchase history.',
  },
  {
    families: ['DITEMTYPE'],
    ownerDomain: 'legacy-adapter',
    ownerPath: 'legacy.DITEMTYPE',
    persistence: 'reserved',
    status: 'reserved',
    notes: 'Declared in VariableSize.CSV but no active ERB use was found. Do not model until a use-site exists.',
  },
  {
    families: ['FLAG'],
    ownerDomain: 'legacy-adapter',
    ownerPath: 'legacy.FLAG',
    persistence: 'save',
    status: 'needsIndexMapping',
    notes: 'Split by legacy index into settings, run, world, shop, work, mission, meta, or economy.',
  },
  {
    families: ['PBAND'],
    ownerDomain: 'legacy-adapter',
    ownerPath: 'legacy.PBAND',
    persistence: 'save',
    status: 'needsIndexMapping',
    notes: 'Split by legacy index into mission, meta clear bonus, character progress, or featureState unlocks.',
  },
  {
    families: ['GLOBAL', 'GLOBALS'],
    ownerDomain: 'meta',
    ownerPath: 'meta',
    persistence: 'save',
    status: 'needsIndexMapping',
    notes: 'LOADGLOBAL/SAVEGLOBAL backed meta progress. GLOBALS text indexes need legacy index review.',
  },
  {
    families: ['TARGET', 'ASSI', 'MASTER', 'PLAYER', 'ASSIPLAY'],
    ownerDomain: 'interaction',
    ownerPath: 'session.interaction.participants',
    persistence: 'session',
    status: 'mapped',
    notes: 'Current interaction role bindings.',
  },
  {
    families: ['SELECTCOM', 'PREVCOM', 'NEXTCOM'],
    ownerDomain: 'interaction',
    ownerPath: 'session.interaction.commandFlow',
    persistence: 'session',
    status: 'mapped',
    notes: 'Current, previous, and next command ids.',
  },
  {
    families: ['TFLAG'],
    ownerDomain: 'interaction',
    ownerPath: 'session.interaction.temporaryFlags',
    persistence: 'session',
    status: 'needsIndexMapping',
    notes: 'Training/session flags. Legacy index ranges have different meanings.',
  },
  {
    families: ['TEQUIP'],
    ownerDomain: 'interaction',
    ownerPath: 'session.interaction.temporaryEquipment',
    persistence: 'session',
    status: 'needsIndexMapping',
    notes: 'Temporary training equipment/mode state, distinct from persistent EQUIP.',
  },
  {
    families: ['SOURCE', 'UP', 'DOWN', 'LOSEBASE', 'EJAC', 'GOTJUEL', 'NOWEX', 'TCVAR', 'TSTR', 'SAVESTR'],
    ownerDomain: 'interaction',
    ownerPath: 'session.interaction',
    persistence: 'session',
    status: 'needsIndexMapping',
    notes: 'Training result and message pipeline buffers.',
  },
  {
    families: ['CUP', 'CDOWN', 'DOWNBASE'],
    ownerDomain: 'legacy-adapter',
    ownerPath: 'legacy.reservedTrainingBuffers',
    persistence: 'reserved',
    status: 'reserved',
    notes: 'Declared in VariableSize.CSV but no active ERB use was found. Do not model until a use-site exists.',
  },
  {
    families: ['EX'],
    ownerDomain: 'interaction',
    ownerPath: 'session.interaction.resultBuffers.climaxCounters',
    persistence: 'session',
    status: 'needsIndexMapping',
    notes: 'Used like current climax counters before JUEL calculation; verify if any index is persistent.',
  },
  {
    families: ['ABL'],
    ownerDomain: 'people',
    ownerPath: 'people.characters.*.attributes.abilities',
    persistence: 'save',
    status: 'needsIndexMapping',
    notes: 'Character persistent abilities.',
  },
  {
    families: ['BASE', 'MAXBASE'],
    ownerDomain: 'legacy-adapter',
    ownerPath: 'legacy.BASE',
    persistence: 'save',
    status: 'needsIndexMapping',
    notes: 'Split by index into people attributes, body stats, and character work/economy values.',
  },
  {
    families: ['TALENT', 'EXP'],
    ownerDomain: 'legacy-adapter',
    ownerPath: 'legacy.characterAttributes',
    persistence: 'save',
    status: 'needsIndexMapping',
    notes: 'Split by index into people attributes, body milestones, social/work history, or feature progress.',
  },
  {
    families: ['CFLAG'],
    ownerDomain: 'legacy-adapter',
    ownerPath: 'legacy.CFLAG',
    persistence: 'save',
    status: 'needsIndexMapping',
    notes: 'Split by legacy index into people, body, equipment, social, work, mission, settings, and featureState.',
  },
  {
    families: ['CSTR'],
    ownerDomain: 'text',
    ownerPath: 'text.characterTextEntries',
    persistence: 'save',
    status: 'needsIndexMapping',
    notes: 'Character string legacy indexes. Some entries are identity, body slang, partner names, or job text.',
  },
  {
    families: ['MARK', 'PALAM', 'JUEL', 'STAIN'],
    ownerDomain: 'body',
    ownerPath: 'body.byCharacterId',
    persistence: 'save',
    status: 'needsIndexMapping',
    notes: 'Character body/training result state.',
  },
  {
    families: ['RELATION'],
    ownerDomain: 'social',
    ownerPath: 'social.relationships',
    persistence: 'save',
    status: 'mapped',
    notes: 'Character-to-character relationship values.',
  },
  {
    families: ['EQUIP'],
    ownerDomain: 'equipment',
    ownerPath: 'equipment.byCharacterId',
    persistence: 'save',
    status: 'reserved',
    notes: 'Persistent equipment array is declared but direct ERB use is weak. Keep separate from TEQUIP.',
  },
  {
    families: ['RESULT', 'RESULTS', 'COUNT', 'LOCAL', 'LOCALS', 'ARG', 'ARGS', 'DA', 'DB', 'DC', 'DD', 'DE', 'TA', 'TB'],
    ownerDomain: 'script',
    ownerPath: 'session.script',
    persistence: 'temporary',
    status: 'excluded',
    notes: 'Function return, local, argument, loop, or scratch frame variables.',
  },
  {
    families: [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
    ],
    ownerDomain: 'script',
    ownerPath: 'session.script.numericLocals',
    persistence: 'temporary',
    status: 'excluded',
    notes: 'ERB scratch numeric variables.',
  },
];

export const legacyFamilyOwnership: readonly LegacyFamilyOwnership[] = legacyFamilyGroups.flatMap((group) =>
  group.families.map((family) => ({
    family,
    ownerDomain: group.ownerDomain,
    ownerPath: group.ownerPath,
    persistence: group.persistence,
    status: group.status,
    notes: group.notes,
  })),
);

function getDuplicateFamilies(): readonly LegacyVariableFamily[] {
  const seen = new Set<LegacyVariableFamily>();
  const duplicates = new Set<LegacyVariableFamily>();

  for (const entry of legacyFamilyOwnership) {
    if (seen.has(entry.family)) {
      duplicates.add(entry.family);
    }
    seen.add(entry.family);
  }

  return [...duplicates];
}

export function getMissingLegacyFamilyOwnership(): readonly LegacyVariableFamily[] {
  const owned = new Set(legacyFamilyOwnership.map((entry) => entry.family));
  return legacyVariableFamilies.filter((family) => !owned.has(family));
}

export function validateLegacyFamilyOwnership(): readonly ModuleDiagnostic[] {
  const diagnostics: ModuleDiagnostic[] = [];
  const missing = getMissingLegacyFamilyOwnership();
  const duplicates = getDuplicateFamilies();

  if (missing.length > 0) {
    diagnostics.push({
      severity: 'error',
      message: `Legacy family ownership is missing ${missing.length} families: ${missing.join(', ')}`,
    });
  }

  if (duplicates.length > 0) {
    diagnostics.push({
      severity: 'error',
      message: `Legacy family ownership has duplicate families: ${duplicates.join(', ')}`,
    });
  }

  if (missing.length === 0 && duplicates.length === 0) {
    diagnostics.push({
      severity: 'ok',
      message: `Legacy family ownership covers all ${legacyVariableFamilies.length} VariableSize.CSV families.`,
    });
  }

  return diagnostics;
}
