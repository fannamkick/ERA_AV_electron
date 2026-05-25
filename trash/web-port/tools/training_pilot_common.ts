export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue };
export type JsonObject = { [key: string]: JsonValue };

export interface DenseStatArraySummary {
  kind: 'dense-stat-array';
  length: number;
  nonZero: number;
  lastNonZeroIndex: number;
  total: number;
}

export interface ShallowJsonSummary {
  kind: 'null' | 'array' | 'object' | 'primitive' | 'unsupported';
  type: string;
  value?: JsonPrimitive;
  length?: number;
  keys?: string[];
}

export function isJsonObject(value: unknown): value is JsonObject {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function readObjectKey(source: unknown, key: string): unknown {
  return isJsonObject(source) && Object.prototype.hasOwnProperty.call(source, key)
    ? source[key]
    : undefined;
}

export function firstDefined(source: unknown, keys: readonly string[]): unknown {
  for (const key of keys) {
    const value = readObjectKey(source, key);
    if (value !== undefined) {
      return value;
    }
  }

  return undefined;
}

export function toDenseStatArray(value: unknown): number[] {
  if (!Array.isArray(value)) {
    return [];
  }

  let lastDefinedIndex = -1;
  const values = value.map((item, index) => {
    if (typeof item === 'number' && Number.isFinite(item)) {
      lastDefinedIndex = index;
      return item;
    }

    if (item !== undefined && item !== null) {
      lastDefinedIndex = index;
    }

    return 0;
  });

  return lastDefinedIndex < 0 ? [] : values.slice(0, lastDefinedIndex + 1);
}

export function summarizeDenseStatArray(value: readonly number[]): DenseStatArraySummary {
  let nonZero = 0;
  let lastNonZeroIndex = -1;
  let total = 0;

  value.forEach((item, index) => {
    if (item !== 0) {
      nonZero += 1;
      lastNonZeroIndex = index;
    }

    total += item;
  });

  return {
    kind: 'dense-stat-array',
    length: value.length,
    nonZero,
    lastNonZeroIndex,
    total,
  };
}

export function shallowJsonSummary(value: unknown): ShallowJsonSummary {
  if (value === null) {
    return { kind: 'null', type: 'null', value: null };
  }

  if (Array.isArray(value)) {
    return { kind: 'array', type: 'array', length: value.length };
  }

  if (isJsonObject(value)) {
    return { kind: 'object', type: 'object', keys: Object.keys(value).sort() };
  }

  const type = typeof value;
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return { kind: 'primitive', type, value };
  }

  return { kind: 'unsupported', type };
}

export function stableStringify(value: unknown): string {
  return JSON.stringify(sortJsonValue(value));
}

function sortJsonValue(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(sortJsonValue);
  }

  if (!isJsonObject(value)) {
    return value;
  }

  return Object.keys(value)
    .sort()
    .reduce<JsonObject>((sorted, key) => {
      sorted[key] = sortJsonValue(value[key]) as JsonValue;
      return sorted;
    }, {});
}
