import type { DomainResidency, DomainScope, GameDomainId } from './domainTypes';

export const LEGACY_VARIABLE_NAMES = [
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

export type LegacyVariableName = (typeof LEGACY_VARIABLE_NAMES)[number];

export interface DomainOwnershipRule {
  readonly concept: string;
  readonly owner: GameDomainId;
  readonly residency: DomainResidency;
  readonly scope: DomainScope;
  readonly examples: readonly string[];
  readonly rule: string;
}

export interface LegacyVariableOwnership {
  readonly variable: LegacyVariableName;
  readonly owner: GameDomainId;
  readonly residency: DomainResidency;
  readonly scope: DomainScope;
  readonly writable: boolean;
  readonly csvBacked: boolean;
  readonly notes: string;
}

export interface FeatureSystemOwnership {
  readonly id: string;
  readonly owner: GameDomainId;
  readonly sessionKind: string;
  readonly sourceFolders: readonly string[];
  readonly labelPrefixes: readonly string[];
  readonly ownedState: readonly string[];
  readonly readsDomains: readonly GameDomainId[];
  readonly writesDomains: readonly GameDomainId[];
}

const contentCatalogVariables = [
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
  'PALAMLV',
  'EXPLV',
] as const satisfies readonly LegacyVariableName[];

const runVariables = ['DAY', 'TIME'] as const satisfies readonly LegacyVariableName[];

const worldVariables = [
  'FLAG',
  'GLOBAL',
  'GLOBALS',
  'PBAND',
] as const satisfies readonly LegacyVariableName[];

const economyVariables = ['MONEY'] as const satisfies readonly LegacyVariableName[];

const inventoryVariables = [
  'ITEM',
  'ITEMSALES',
  'BOUGHT',
  'NOITEM',
] as const satisfies readonly LegacyVariableName[];

const roleBindingVariables = [
  'TARGET',
  'ASSI',
  'MASTER',
  'PLAYER',
] as const satisfies readonly LegacyVariableName[];

const commandSessionVariables = [
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
  'DITEMTYPE',
  'DA',
  'DB',
  'DC',
  'DD',
  'DE',
  'TA',
  'TB',
] as const satisfies readonly LegacyVariableName[];

const scriptScratchVariables = [
  'RESULT',
  'RESULTS',
  'COUNT',
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
  'LOCAL',
  'LOCALS',
  'ARG',
  'ARGS',
] as const satisfies readonly LegacyVariableName[];

const characterVariables = [
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
  'NOWEX',
  'CSTR',
] as const satisfies readonly LegacyVariableName[];

const characterDerivedVariables = [
  'CUP',
  'CDOWN',
  'DOWNBASE',
] as const satisfies readonly LegacyVariableName[];

const socialVariables = ['RELATION'] as const satisfies readonly LegacyVariableName[];
const equipmentVariables = ['EQUIP'] as const satisfies readonly LegacyVariableName[];

function own(
  names: readonly LegacyVariableName[],
  rule: Omit<LegacyVariableOwnership, 'variable'>,
): readonly LegacyVariableOwnership[] {
  return names.map((variable) => ({ variable, ...rule }));
}

const legacyVariableOwnershipEntries = [
  ...own(contentCatalogVariables, {
    owner: 'content',
    residency: 'catalog',
    scope: 'catalog',
    writable: false,
    csvBacked: true,
    notes: 'Read-only lookup data loaded from CSV or built-in string catalogs.',
  }),
  ...own(runVariables, {
    owner: 'run',
    residency: 'persistent',
    scope: 'run',
    writable: true,
    csvBacked: false,
    notes: 'Save-level calendar and turn progression state.',
  }),
  ...own(worldVariables, {
    owner: 'world',
    residency: 'persistent',
    scope: 'global',
    writable: true,
    csvBacked: false,
    notes: 'Global progression, configuration, mission, and unlock state.',
  }),
  ...own(economyVariables, {
    owner: 'economy',
    residency: 'persistent',
    scope: 'global',
    writable: true,
    csvBacked: false,
    notes: 'Global money/accounting state.',
  }),
  ...own(inventoryVariables, {
    owner: 'inventory',
    residency: 'persistent',
    scope: 'global',
    writable: true,
    csvBacked: false,
    notes: 'Global item counts, item transactions, and item-use restrictions.',
  }),
  ...own(roleBindingVariables, {
    owner: 'session',
    residency: 'session',
    scope: 'roleBinding',
    writable: true,
    csvBacked: false,
    notes: 'Mutable actor slots for the active ERB flow; they point to People but are not person state.',
  }),
  ...own(commandSessionVariables, {
    owner: 'session',
    residency: 'session',
    scope: 'featureSession',
    writable: true,
    csvBacked: false,
    notes: 'Feature execution buffers shared by training, work, AV, visits, events, and system flows.',
  }),
  ...own(scriptScratchVariables, {
    owner: 'script',
    residency: 'scratch',
    scope: 'scriptFrame',
    writable: true,
    csvBacked: false,
    notes: 'Interpreter/local-frame scratch values used by ERB control flow and helper calls.',
  }),
  ...own(characterVariables, {
    owner: 'people',
    residency: 'persistent',
    scope: 'character',
    writable: true,
    csvBacked: true,
    notes: 'Persistent per-character state seeded by Chara CSV rows and mutated by feature systems.',
  }),
  ...own(characterDerivedVariables, {
    owner: 'session',
    residency: 'derived',
    scope: 'characterDerived',
    writable: true,
    csvBacked: false,
    notes: 'Character-scoped calculation buffers; keep out of persistent CharacterState until evidence proves save ownership.',
  }),
  ...own(socialVariables, {
    owner: 'social',
    residency: 'persistent',
    scope: 'socialPair',
    writable: true,
    csvBacked: true,
    notes: 'Directed pairwise relationship values; not owned by either endpoint character alone.',
  }),
  ...own(equipmentVariables, {
    owner: 'equipment',
    residency: 'persistent',
    scope: 'character',
    writable: true,
    csvBacked: false,
    notes: 'Per-character equipment state. TEQUIP stays in session because legacy usage mixes devices and mode flags.',
  }),
] as const;

export const LEGACY_VARIABLE_OWNERSHIP = Object.freeze(
  Object.fromEntries(
    legacyVariableOwnershipEntries.map((entry) => [entry.variable, entry]),
  ),
) as Readonly<Record<LegacyVariableName, LegacyVariableOwnership>>;

export const GAME_DOMAIN_OWNERSHIP: readonly DomainOwnershipRule[] = [
  {
    concept: 'content catalogs',
    owner: 'content',
    residency: 'catalog',
    scope: 'catalog',
    examples: ['Train.csv', 'Item.csv', 'Talent.csv', 'Chara*.csv seeds'],
    rule: 'Content owns definitions and initial data only; runtime systems read it but do not mutate it.',
  },
  {
    concept: 'run progression',
    owner: 'run',
    residency: 'persistent',
    scope: 'run',
    examples: ['DAY', 'TIME', 'difficulty', 'phase'],
    rule: 'Run owns save-level progression through time and high-level game flow.',
  },
  {
    concept: 'world progression',
    owner: 'world',
    residency: 'persistent',
    scope: 'global',
    examples: ['FLAG', 'GLOBAL', 'GLOBALS', 'PBAND'],
    rule: 'World owns global facts and unlocks that are not attached to one character or one active feature session.',
  },
  {
    concept: 'people roster',
    owner: 'people',
    residency: 'persistent',
    scope: 'character',
    examples: ['ADDCHARA', 'GETCHARA', 'NO', 'NAME', 'CALLNAME'],
    rule: 'People owns who exists, identity, ownership, availability, and role resolution targets.',
  },
  {
    concept: 'character persistent state',
    owner: 'people',
    residency: 'persistent',
    scope: 'character',
    examples: ['BASE', 'MAXBASE', 'ABL', 'TALENT', 'EXP', 'PALAM', 'MARK', 'CFLAG', 'CSTR', 'STAIN'],
    rule: 'State that survives after a command or event ends belongs to the character aggregate.',
  },
  {
    concept: 'pairwise social state',
    owner: 'social',
    residency: 'persistent',
    scope: 'socialPair',
    examples: ['RELATION:TARGET:A', 'RELATION:ASSI:(NO:TARGET)'],
    rule: 'Directed relation values are owned by the social graph, not by one character object.',
  },
  {
    concept: 'economy',
    owner: 'economy',
    residency: 'persistent',
    scope: 'global',
    examples: ['MONEY', 'debt', 'reputation'],
    rule: 'Economy owns accounting; shops and feature systems request transactions.',
  },
  {
    concept: 'inventory',
    owner: 'inventory',
    residency: 'persistent',
    scope: 'global',
    examples: ['ITEM', 'ITEMSALES', 'BOUGHT', 'NOITEM'],
    rule: 'Inventory owns item quantities and item transaction state.',
  },
  {
    concept: 'equipment',
    owner: 'equipment',
    residency: 'persistent',
    scope: 'character',
    examples: ['EQUIP'],
    rule: 'Persistent equipment belongs to equipment/character equipment state. Active legacy TEQUIP mode flags remain session state.',
  },
  {
    concept: 'interaction semantics',
    owner: 'interaction',
    residency: 'derived',
    scope: 'featureSession',
    examples: ['kiss', 'insertion', 'ejaculation', 'pregnancyCheck', 'stainTransfer'],
    rule: 'Interaction owns reusable physical event semantics that can mutate People, Social, Equipment, or Session through explicit effects.',
  },
  {
    concept: 'feature execution session',
    owner: 'session',
    residency: 'session',
    scope: 'featureSession',
    examples: ['SOURCE', 'LOSEBASE', 'UP', 'DOWN', 'TFLAG', 'TEQUIP', 'SELECTCOM', 'PREVCOM'],
    rule: 'Execution buffers are shared by training, work, filming, visits, missions, events, and system flows; do not attach them to one feature domain.',
  },
  {
    concept: 'script frame',
    owner: 'script',
    residency: 'scratch',
    scope: 'scriptFrame',
    examples: ['A-Z', 'COUNT', 'RESULT', 'RESULTS', 'LOCAL', 'LOCALS', 'ARG', 'ARGS'],
    rule: 'Script scratch belongs to the active interpreter frame and must not be treated as persistent gameplay state.',
  },
  {
    concept: 'feature systems',
    owner: 'feature',
    residency: 'persistent',
    scope: 'global',
    examples: ['training', 'brothel', 'filming', 'visits', 'missions', 'achievements', 'clear bonuses'],
    rule: 'Feature systems own lifecycle and orchestration only; underlying state stays with Content, Run, World, People, Social, Economy, Inventory, Equipment, Session, or Script.',
  },
  {
    concept: 'legacy compatibility',
    owner: 'legacyCompatibility',
    residency: 'compatibility',
    scope: 'compatibility',
    examples: ['raw FLAG mirror', 'raw TFLAG mirror', 'raw ERB index bridge'],
    rule: 'Compatibility mirrors preserve numeric ERB access, but they are never the gameplay owner of a concept.',
  },
];

export const FEATURE_SYSTEM_OWNERSHIP: readonly FeatureSystemOwnership[] = [
  {
    id: 'training',
    owner: 'feature',
    sessionKind: 'training',
    sourceFolders: ['指導関係', '能力上昇関係'],
    labelPrefixes: ['COM', 'COMF', 'COMABLE', 'COMORDER', 'COMSEQ', 'TRAIN', 'ABLUP', 'SOURCE'],
    ownedState: ['command registry', 'availability rules', 'source conversion lifecycle'],
    readsDomains: ['content', 'run', 'world', 'people', 'social', 'inventory', 'equipment', 'session', 'script'],
    writesDomains: ['people', 'social', 'inventory', 'equipment', 'session', 'script'],
  },
  {
    id: 'system',
    owner: 'feature',
    sessionKind: 'system',
    sourceFolders: ['システム関係', '組み込み関数'],
    labelPrefixes: ['SYSTEM', 'CONFIG', 'INFO', 'SHOP', 'SELL', 'CHEAT', 'PASSOUT', 'CALC', 'FUNC'],
    ownedState: ['configuration flow', 'shops', 'debug/cheat flow', 'system calculations'],
    readsDomains: ['content', 'run', 'world', 'people', 'social', 'economy', 'inventory', 'equipment', 'session', 'script'],
    writesDomains: ['run', 'world', 'people', 'social', 'economy', 'inventory', 'equipment', 'session', 'script'],
  },
  {
    id: 'events',
    owner: 'feature',
    sessionKind: 'event',
    sourceFolders: ['イベント関係'],
    labelPrefixes: ['EVENT', 'ADD', 'GET', 'CONCEPTION', 'FIRSTKISS', 'PERSONALITY', 'JOB', 'IDOL'],
    ownedState: ['event scheduling', 'event completion ids', 'story triggers'],
    readsDomains: ['content', 'run', 'world', 'people', 'social', 'economy', 'inventory', 'equipment', 'session', 'script'],
    writesDomains: ['world', 'people', 'social', 'economy', 'inventory', 'equipment', 'session', 'script'],
  },
  {
    id: 'brothel',
    owner: 'feature',
    sessionKind: 'work',
    sourceFolders: ['娼館関係'],
    labelPrefixes: ['WORK', 'RECEPTION'],
    ownedState: ['work selection', 'customer/work result lifecycle'],
    readsDomains: ['content', 'run', 'world', 'people', 'social', 'economy', 'inventory', 'session', 'script'],
    writesDomains: ['world', 'people', 'social', 'economy', 'inventory', 'session', 'script'],
  },
  {
    id: 'filming',
    owner: 'feature',
    sessionKind: 'filming',
    sourceFolders: ['ＡＶ撮影関係'],
    labelPrefixes: ['AV', 'SCENE', 'ACTRESS'],
    ownedState: ['scene selection', 'video sales lifecycle', 'filming scoring'],
    readsDomains: ['content', 'run', 'world', 'people', 'economy', 'inventory', 'equipment', 'session', 'script'],
    writesDomains: ['world', 'people', 'economy', 'inventory', 'equipment', 'session', 'script'],
  },
  {
    id: 'visits',
    owner: 'feature',
    sessionKind: 'visit',
    sourceFolders: ['訪問関係'],
    labelPrefixes: ['HOU', 'ORDER', 'LABO', 'MISSION', 'AZITO'],
    ownedState: ['visit menu flow', 'visit-specific progress'],
    readsDomains: ['content', 'run', 'world', 'people', 'social', 'economy', 'inventory', 'session', 'script'],
    writesDomains: ['world', 'people', 'social', 'economy', 'inventory', 'session', 'script'],
  },
  {
    id: 'missions',
    owner: 'feature',
    sessionKind: 'mission',
    sourceFolders: ['ミッション関係'],
    labelPrefixes: ['MISSION'],
    ownedState: ['mission progress and rewards'],
    readsDomains: ['content', 'run', 'world', 'people', 'social', 'inventory', 'session', 'script'],
    writesDomains: ['world', 'people', 'social', 'inventory', 'session', 'script'],
  },
  {
    id: 'achievements',
    owner: 'feature',
    sessionKind: 'achievement',
    sourceFolders: ['実績関係', 'クリアボーナス関係'],
    labelPrefixes: ['ACHIEVEMENT', 'CLEARBONUS'],
    ownedState: ['achievement completion', 'clear bonus unlocks'],
    readsDomains: ['content', 'run', 'world', 'people', 'social', 'inventory', 'session', 'script'],
    writesDomains: ['world', 'people', 'social', 'inventory', 'session', 'script'],
  },
  {
    id: 'tips',
    owner: 'feature',
    sessionKind: 'system',
    sourceFolders: ['TIPS関係'],
    labelPrefixes: ['TIPS'],
    ownedState: ['tips display flow'],
    readsDomains: ['content', 'world', 'people', 'session', 'script'],
    writesDomains: ['session', 'script'],
  },
];

export function ownershipForConcept(concept: string): DomainOwnershipRule | undefined {
  return GAME_DOMAIN_OWNERSHIP.find((rule) => rule.concept === concept);
}

export function ownershipForLegacyVariable(
  variable: LegacyVariableName,
): LegacyVariableOwnership {
  return LEGACY_VARIABLE_OWNERSHIP[variable];
}

export function isCharacterPersistentVariable(variable: LegacyVariableName): boolean {
  return LEGACY_VARIABLE_OWNERSHIP[variable].owner === 'people'
    && LEGACY_VARIABLE_OWNERSHIP[variable].residency === 'persistent';
}

export function isFeatureSessionVariable(variable: LegacyVariableName): boolean {
  return LEGACY_VARIABLE_OWNERSHIP[variable].owner === 'session';
}

export function validateLegacyOwnershipCoverage(
  variableNames: readonly string[] = LEGACY_VARIABLE_NAMES,
): { readonly ok: boolean; readonly missing: readonly string[]; readonly extra: readonly string[] } {
  const expected = new Set(variableNames);
  const actual = new Set(Object.keys(LEGACY_VARIABLE_OWNERSHIP));
  const missing = [...expected].filter((name) => !actual.has(name));
  const extra = [...actual].filter((name) => !expected.has(name));

  return {
    ok: missing.length === 0 && extra.length === 0,
    missing,
    extra,
  };
}

export function assertCompleteLegacyOwnership(variableNames?: readonly string[]): void {
  const coverage = validateLegacyOwnershipCoverage(variableNames);

  if (!coverage.ok) {
    throw new Error(
      `Incomplete legacy variable ownership. Missing: ${coverage.missing.join(', ') || '(none)'}; extra: ${coverage.extra.join(', ') || '(none)'}`,
    );
  }
}
