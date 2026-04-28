import {
  ABILITY_KEYS,
  BASE_KEYS,
  EQUIPMENT_KEYS,
  EXP_KEYS,
  ITEM_KEYS,
  JUEL_KEYS,
  LOSEBASE_KEYS,
  MARK_KEYS,
  PALAM_KEYS,
  SOURCE_KEYS,
  STAIN_PART_KEYS,
  TALENT_KEYS,
  UP_KEYS,
  type StatKeyDefinition,
} from './statKeys';

type StatKeyMap = Record<string, StatKeyDefinition>;

const STAT_KEY_MAPS: Record<string, StatKeyMap> = {
  palam: { ...PALAM_KEYS },
  base: { ...BASE_KEYS },
  loseBase: { ...LOSEBASE_KEYS },
  up: { ...UP_KEYS },
  source: { ...SOURCE_KEYS },
  talent: { ...TALENT_KEYS },
  ability: { ...ABILITY_KEYS },
  exp: { ...EXP_KEYS },
  juel: { ...JUEL_KEYS },
  mark: { ...MARK_KEYS },
  equipment: { ...EQUIPMENT_KEYS },
  stain: { ...STAIN_PART_KEYS },
  item: { ...ITEM_KEYS },
};

export function statIndex(stat: keyof typeof STAT_KEY_MAPS, key: string): number {
  const found = STAT_KEY_MAPS[stat]?.[key];
  if (!found) {
    throw new Error(`Unknown ${stat} key: ${key}`);
  }
  return found.index;
}

export function hasStatKey(stat: string, key: string): boolean {
  return STAT_KEY_MAPS[stat]?.[key] !== undefined;
}

export function getStatKeyDefinition(stat: string, key: string): StatKeyDefinition | undefined {
  return STAT_KEY_MAPS[stat]?.[key];
}

export function requireStatKeyDefinition(stat: string, key: string): StatKeyDefinition {
  const found = getStatKeyDefinition(stat, key);
  if (!found) {
    throw new Error(`Unknown ${stat} key: ${key}`);
  }
  return found;
}

export function registerStatKey(stat: string, definition: StatKeyDefinition): void {
  STAT_KEY_MAPS[stat] ??= {};

  const existing = STAT_KEY_MAPS[stat][definition.key];
  if (existing && existing.index !== definition.index) {
    throw new Error(`Conflicting ${stat} key registration: ${definition.key}`);
  }

  STAT_KEY_MAPS[stat][definition.key] = definition;
}

export function registerStatKeys(stat: string, definitions: readonly StatKeyDefinition[]): void {
  for (const definition of definitions) {
    registerStatKey(stat, definition);
  }
}

export function getStatKeyDefinitions(stat: string): StatKeyDefinition[] {
  return Object.values(STAT_KEY_MAPS[stat] ?? {});
}

export function readNumericArray(values: readonly number[] | undefined, index: number): number {
  return values?.[index] ?? 0;
}

export function writeNumericArray(values: readonly number[] | undefined, index: number, value: number): number[] {
  const next = [...(values ?? [])];
  next[index] = value;
  return next;
}
