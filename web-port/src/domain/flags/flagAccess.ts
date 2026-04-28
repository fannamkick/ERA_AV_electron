import { CFLAG_KEYS, FLAG_KEYS, TFLAG_KEYS, type NumericKeyDefinition } from './flagKeys';

type KeyMap = Record<string, NumericKeyDefinition>;

const FLAG_KEY_MAPS: Record<'flag' | 'cflag' | 'tflag', KeyMap> = {
  flag: { ...FLAG_KEYS },
  cflag: { ...CFLAG_KEYS },
  tflag: { ...TFLAG_KEYS },
};

function requireKey(map: KeyMap, key: string): number {
  const found = map[key];
  if (!found) {
    throw new Error(`Unknown numeric key: ${key}`);
  }
  return found.index;
}

export function hasFlagKey(scope: 'flag' | 'cflag' | 'tflag', key: string): boolean {
  return FLAG_KEY_MAPS[scope][key] !== undefined;
}

export function getFlagKeyDefinition(
  scope: 'flag' | 'cflag' | 'tflag',
  key: string,
): NumericKeyDefinition | undefined {
  return FLAG_KEY_MAPS[scope][key];
}

export function requireFlagKeyDefinition(
  scope: 'flag' | 'cflag' | 'tflag',
  key: string,
): NumericKeyDefinition {
  const found = getFlagKeyDefinition(scope, key);
  if (!found) {
    throw new Error(`Unknown ${scope} key: ${key}`);
  }
  return found;
}

export function flagIndex(key: keyof typeof FLAG_KEYS): number {
  return requireKey(FLAG_KEY_MAPS.flag, key);
}

export function cflagIndex(key: keyof typeof CFLAG_KEYS): number {
  return requireKey(FLAG_KEY_MAPS.cflag, key);
}

export function tflagIndex(key: keyof typeof TFLAG_KEYS): number {
  return requireKey(FLAG_KEY_MAPS.tflag, key);
}

export function registerFlagKey(scope: 'flag' | 'cflag' | 'tflag', definition: NumericKeyDefinition): void {
  const existing = FLAG_KEY_MAPS[scope][definition.key];
  if (existing && existing.index !== definition.index) {
    throw new Error(`Conflicting ${scope} key registration: ${definition.key}`);
  }

  FLAG_KEY_MAPS[scope][definition.key] = definition;
}

export function registerFlagKeys(scope: 'flag' | 'cflag' | 'tflag', definitions: readonly NumericKeyDefinition[]): void {
  for (const definition of definitions) {
    registerFlagKey(scope, definition);
  }
}

export function getFlagKeyDefinitions(scope: 'flag' | 'cflag' | 'tflag'): NumericKeyDefinition[] {
  return Object.values(FLAG_KEY_MAPS[scope]);
}

export function readNumericRecord(record: Record<number, number> | undefined, index: number): number {
  return record?.[index] ?? 0;
}

export function writeNumericRecord(
  record: Record<number, number>,
  index: number,
  value: number,
): Record<number, number> {
  return { ...record, [index]: value };
}
