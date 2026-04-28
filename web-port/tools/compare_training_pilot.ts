#!/usr/bin/env ts-node

import * as fs from 'fs';
import * as path from 'path';
import {
  firstDefined,
  isJsonObject,
  readObjectKey,
  shallowJsonSummary,
  stableStringify,
  summarizeDenseStatArray,
  toDenseStatArray,
} from './training_pilot_common';

interface PilotEntry {
  commandId?: unknown;
  originalId?: unknown;
  source: number[];
  palamAfterSourceCheck: number[];
  exp: number[];
  base: number[];
  sourceCheck: {
    changes?: unknown;
    decays?: unknown;
    warnings?: unknown;
  };
}

interface Mismatch {
  path: string;
  kind: string;
  expected: unknown;
  actual: unknown;
}

interface SectionPair {
  name: string;
  expected: unknown[];
  actual: unknown[];
}

const STAT_TOLERANCE = 1e-9;

function usage(): void {
  const script = path.basename(process.argv[1] ?? 'compare_training_pilot.ts');
  console.log(`Usage: ts-node tools/${script} <expected.json> <actual.json>`);
}

function readJson(filePath: string): unknown {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8').replace(/^\uFEFF/, ''));
}

function collectSections(value: unknown): Record<string, unknown[]> {
  if (Array.isArray(value)) {
    return { root: value };
  }

  if (!isJsonObject(value)) {
    return {};
  }

  if (looksLikePilotEntry(value)) {
    return { root: [value] };
  }

  const sections: Record<string, unknown[]> = {};
  for (const key of Object.keys(value).sort()) {
    const section = value[key];
    if (Array.isArray(section)) {
      sections[key] = section;
    }
  }

  return sections;
}

function looksLikePilotEntry(value: unknown): boolean {
  return (
    firstDefined(value, ['commandId', 'sourceAfterCommand', 'source', 'expAfterCommand', 'exp']) !==
    undefined
  );
}

function normalizeEntry(value: unknown): PilotEntry {
  const sourceCheck = readObjectKey(value, 'sourceCheck');

  return {
    commandId: readObjectKey(value, 'commandId'),
    originalId: readObjectKey(value, 'originalId'),
    source: toDenseStatArray(firstDefined(value, ['sourceAfterCommand', 'source'])),
    palamAfterSourceCheck: toDenseStatArray(readObjectKey(value, 'palamAfterSourceCheck')),
    exp: toDenseStatArray(firstDefined(value, ['expAfterCommand', 'exp'])),
    base: toDenseStatArray(firstDefined(value, ['baseAfterCommand', 'base'])),
    sourceCheck: {
      changes: firstDefined(sourceCheck, ['changes']),
      decays: firstDefined(sourceCheck, ['decays', 'decayChanges']),
      warnings: firstDefined(sourceCheck, ['warnings']),
    },
  };
}

function fillFlatSourceCheckAliases(entry: PilotEntry, value: unknown): PilotEntry {
  return {
    ...entry,
    sourceCheck: {
      changes:
        entry.sourceCheck.changes ??
        readObjectKey(value, 'sourceCheckChanges') ??
        readObjectKey(value, 'changes'),
      decays:
        entry.sourceCheck.decays ??
        readObjectKey(value, 'sourceCheckDecayChanges') ??
        readObjectKey(value, 'decays'),
      warnings:
        entry.sourceCheck.warnings ??
        readObjectKey(value, 'sourceCheckWarnings') ??
        readObjectKey(value, 'warnings'),
    },
  };
}

function compareStatArray(
  mismatches: Mismatch[],
  pathName: string,
  expected: readonly number[],
  actual: readonly number[],
): void {
  const length = Math.max(expected.length, actual.length);
  const differingIndices: Array<{ index: number; expected: number; actual: number }> = [];

  for (let index = 0; index < length; index += 1) {
    const expectedValue = expected[index] ?? 0;
    const actualValue = actual[index] ?? 0;
    if (Math.abs(expectedValue - actualValue) > STAT_TOLERANCE) {
      differingIndices.push({ index, expected: expectedValue, actual: actualValue });
    }
  }

  if (differingIndices.length > 0) {
    mismatches.push({
      path: pathName,
      kind: 'stat-array',
      expected: summarizeDenseStatArray(expected),
      actual: summarizeDenseStatArray(actual),
    });

    differingIndices.slice(0, 20).forEach((diff) => {
      mismatches.push({
        path: `${pathName}[${diff.index}]`,
        kind: 'stat-value',
        expected: diff.expected,
        actual: diff.actual,
      });
    });
  }
}

function compareJsonValue(
  mismatches: Mismatch[],
  pathName: string,
  expected: unknown,
  actual: unknown,
): void {
  if (stableStringify(expected) === stableStringify(actual)) {
    return;
  }

  mismatches.push({
    path: pathName,
    kind: 'json',
    expected: shallowJsonSummary(expected),
    actual: shallowJsonSummary(actual),
  });
}

function compareEntry(pathName: string, expectedRaw: unknown, actualRaw: unknown): Mismatch[] {
  const expected = fillFlatSourceCheckAliases(normalizeEntry(expectedRaw), expectedRaw);
  const actual = fillFlatSourceCheckAliases(normalizeEntry(actualRaw), actualRaw);
  const mismatches: Mismatch[] = [];

  if (expected.originalId !== undefined || actual.originalId !== undefined) {
    compareJsonValue(mismatches, `${pathName}.originalId`, expected.originalId, actual.originalId);
  } else {
    compareJsonValue(mismatches, `${pathName}.commandId`, expected.commandId, actual.commandId);
  }
  compareStatArray(mismatches, `${pathName}.source`, expected.source, actual.source);
  compareStatArray(
    mismatches,
    `${pathName}.palamAfterSourceCheck`,
    expected.palamAfterSourceCheck,
    actual.palamAfterSourceCheck,
  );
  compareStatArray(mismatches, `${pathName}.exp`, expected.exp, actual.exp);
  compareStatArray(mismatches, `${pathName}.base`, expected.base, actual.base);
  compareJsonValue(mismatches, `${pathName}.sourceCheck.changes`, expected.sourceCheck.changes, actual.sourceCheck.changes);
  compareJsonValue(mismatches, `${pathName}.sourceCheck.decays`, expected.sourceCheck.decays, actual.sourceCheck.decays);
  compareJsonValue(mismatches, `${pathName}.sourceCheck.warnings`, expected.sourceCheck.warnings, actual.sourceCheck.warnings);

  return mismatches;
}

function buildPairs(expected: unknown, actual: unknown): SectionPair[] {
  const expectedSections = collectSections(expected);
  const actualSections = collectSections(actual);
  const names = Array.from(
    new Set([...Object.keys(expectedSections), ...Object.keys(actualSections)]),
  ).sort();

  return names.map((name) => ({
    name,
    expected: expectedSections[name] ?? [],
    actual: actualSections[name] ?? [],
  }));
}

function comparePilot(expected: unknown, actual: unknown): { matched: boolean; mismatches: Mismatch[] } {
  const mismatches: Mismatch[] = [];

  for (const pair of buildPairs(expected, actual)) {
    if (pair.expected.length !== pair.actual.length) {
      mismatches.push({
        path: pair.name,
        kind: 'entry-count',
        expected: pair.expected.length,
        actual: pair.actual.length,
      });
    }

    const length = Math.max(pair.expected.length, pair.actual.length);
    for (let index = 0; index < length; index += 1) {
      const pathName = `${pair.name}[${index}]`;
      if (pair.expected[index] === undefined || pair.actual[index] === undefined) {
        mismatches.push({
          path: pathName,
          kind: 'missing-entry',
          expected: shallowJsonSummary(pair.expected[index]),
          actual: shallowJsonSummary(pair.actual[index]),
        });
        continue;
      }

      mismatches.push(...compareEntry(pathName, pair.expected[index], pair.actual[index]));
    }
  }

  return { matched: mismatches.length === 0, mismatches };
}

function main(): void {
  const args = process.argv.slice(2);
  if (args.length !== 2) {
    usage();
    return;
  }

  const [expectedPath, actualPath] = args;
  let result: ReturnType<typeof comparePilot>;

  try {
    result = comparePilot(readJson(expectedPath), readJson(actualPath));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Failed to compare training pilot JSON: ${message}`);
    process.exitCode = 1;
    return;
  }

  console.log(
    JSON.stringify(
      {
        expected: path.resolve(expectedPath),
        actual: path.resolve(actualPath),
        matched: result.matched,
        mismatchCount: result.mismatches.length,
        mismatches: result.mismatches,
      },
      null,
      2,
    ),
  );
}

main();
