import type {
  CommandDraft,
  ErbCommandIr,
  ErbIrCondition,
  ErbIrNumericValue,
  ErbIrOperation,
  ErbIrRef,
  WorkerConflict,
} from '../types';
import { collectIrSemanticIssues, validateErbCommandIrShape } from '../validators/irValidator';
import { legacyRefLabel, resolveLegacyRef } from './mapping';

function conflict(area: WorkerConflict['area'], decisionNeeded: string): WorkerConflict {
  return {
    area,
    sources: [],
    decisionNeeded,
    blocksMigration: true,
  };
}

function commandNumber(commandId: string): string {
  return commandId.replace(/^COMF/i, '');
}

function statRef(ref: ErbIrRef): { stat: string; key: string; targetRole?: string } {
  const resolved = resolveLegacyRef(ref);
  if (!resolved.ok || !resolved.stat || !resolved.key) {
    throw new Error(resolved.message ?? `Missing mapping for ${legacyRefLabel(ref)}.`);
  }

  const role = ref.role && !['target', 'global'].includes(ref.role)
    ? ref.role === 'player' || ref.role === 'master'
      ? 'trainer'
      : ref.role
    : undefined;

  return { stat: resolved.stat, key: resolved.key, targetRole: role };
}

function q(value: string): string {
  return JSON.stringify(value);
}

function isBitConditionStat(stat: string): boolean {
  return ['cflag', 'tflag', 'flag', 'equipment', 'stain'].includes(stat);
}

function conditionValueCode(value: number | ErbIrNumericValue): string {
  if (typeof value === 'number') return String(value);
  if (value.kind === 'literal' || value.kind === 'levelThreshold') return valueCode(value);
  throw new Error(`statCompare RHS cannot be lowered to a static condition value: ${value.kind}`);
}

function conditionCode(condition: ErbIrCondition): string {
  switch (condition.kind) {
    case 'statCompare': {
      const mapped = statRef(condition.ref);
      const args = [q(mapped.stat), q(mapped.key), q(condition.op), conditionValueCode(condition.value)];
      if (mapped.targetRole) args.push('undefined', 'undefined', q(mapped.targetRole));
      return `compareStat(${args.join(', ')})`;
    }
    case 'statBit': {
      const mapped = statRef(condition.ref);
      if (!isBitConditionStat(mapped.stat)) {
        const op = condition.op === 'none' ? 'eq' : 'gte';
        return `compareStat(${q(mapped.stat)}, ${q(mapped.key)}, ${q(op)}, ${condition.op === 'none' ? 0 : 1}${mapped.targetRole ? `, undefined, undefined, ${q(mapped.targetRole)}` : ''})`;
      }
      const args = [q(mapped.stat), q(mapped.key), String(condition.mask)];
      if (mapped.targetRole) args.push('undefined', 'undefined', q(mapped.targetRole));
      if (condition.op === 'all') {
        return `{ kind: 'stat.bit', stat: ${q(mapped.stat)}, key: ${q(mapped.key)}, mask: ${condition.mask}, op: 'all'${mapped.targetRole ? `, targetRole: ${q(mapped.targetRole)}` : ''} }`;
      }
      return `${condition.op === 'none' ? 'bitNone' : 'bitAny'}(${args.join(', ')})`;
    }
    case 'all':
      return `all([${condition.conditions.map(conditionCode).join(', ')}])`;
    case 'any':
      return `any([${condition.conditions.map(conditionCode).join(', ')}])`;
    case 'not':
      return `not(${conditionCode(condition.condition)})`;
    case 'tag':
      return condition.present ? `hasTag(${q(condition.tag)})` : `missingTag(${q(condition.tag)})`;
  }
}

function runtimeConditionCode(condition: ErbIrCondition): string {
  switch (condition.kind) {
    case 'statCompare': {
      const mapped = statRef(condition.ref);
      const read = `readStat(context, ${q(mapped.stat)}, ${q(mapped.key)}${mapped.targetRole ? `, ${q(mapped.targetRole)}` : ''})`;
      const op = condition.op === 'eq'
        ? '==='
        : condition.op === 'neq'
          ? '!=='
          : condition.op === 'gte'
            ? '>='
            : condition.op === 'lte'
              ? '<='
              : condition.op === 'gt'
                ? '>'
                : '<';
      return `${read} ${op} ${conditionValueCode(condition.value)}`;
    }
    case 'statBit': {
      const mapped = statRef(condition.ref);
      const read = `readStat(context, ${q(mapped.stat)}, ${q(mapped.key)}${mapped.targetRole ? `, ${q(mapped.targetRole)}` : ''})`;
      if (condition.op === 'none') return `((${read} & ${condition.mask}) === 0)`;
      if (condition.op === 'all') return `((${read} & ${condition.mask}) === ${condition.mask})`;
      return `((${read} & ${condition.mask}) !== 0)`;
    }
    case 'all':
      return condition.conditions.map((child) => `(${runtimeConditionCode(child)})`).join(' && ') || 'true';
    case 'any':
      return condition.conditions.map((child) => `(${runtimeConditionCode(child)})`).join(' || ') || 'false';
    case 'not':
      return `!(${runtimeConditionCode(condition.condition)})`;
    case 'tag':
      return condition.present
        ? `(context.hasTag?.(${q(condition.tag)}) ?? false)`
        : `!(context.hasTag?.(${q(condition.tag)}) ?? false)`;
  }
}

function valueCode(value: ErbIrNumericValue): string {
  switch (value.kind) {
    case 'literal':
      return String(value.value);
    case 'levelThreshold':
      return `legacyLevelThreshold(${q(value.domain)}, ${value.level})`;
    case 'table': {
      const mapped = statRef(value.by);
      return `tableValue(context, ${q(mapped.stat)}, ${q(mapped.key)}, [${value.values.join(', ')}]${mapped.targetRole ? `, ${q(mapped.targetRole)}` : ''})`;
    }
    case 'conditional': {
      const otherwise = value.otherwise ? valueCode(value.otherwise) : '0';
      return value.cases.reduceRight(
        (next, entry) => `(${runtimeConditionCode(entry.when)} ? ${valueCode(entry.value)} : ${next})`,
        otherwise,
      );
    }
    case 'stat': {
      const mapped = statRef(value.ref);
      return `readStat(context, ${q(mapped.stat)}, ${q(mapped.key)}${mapped.targetRole ? `, ${q(mapped.targetRole)}` : ''})`;
    }
    case 'binary': {
      const op = value.op === 'add' ? '+' : value.op === 'subtract' ? '-' : value.op === 'multiply' ? '*' : '/';
      return `(${valueCode(value.left)} ${op} ${valueCode(value.right)})`;
    }
  }
}

type FormulaGateOperation = Extract<ErbIrOperation, { kind: 'formulaGate' }>;
type FormulaGateTerm = FormulaGateOperation['terms'][number];

function formulaTermCode(term: FormulaGateTerm): string {
  return `{
      id: ${q(term.id)},
      label: ${q(term.label ?? term.id)},
      ${term.when ? `when: (context) => ${runtimeConditionCode(term.when)},` : ''}
      value: (context) => ${valueCode(term.value)},
    }`;
}

function formulaGateThresholdCode(operation: FormulaGateOperation): string {
  const modifierExpressions = (operation.thresholdModifiers ?? [])
    .map((modifier) => `(${runtimeConditionCode(modifier.when)} ? ${modifier.delta} : 0)`);

  if (modifierExpressions.length === 0 && operation.threshold.kind === 'literal') {
    return String(operation.threshold.value);
  }

  const base = valueCode(operation.threshold);
  const expression = [base, ...modifierExpressions].join(' + ');
  return `(context) => ${expression}`;
}

function formulaGateCode(operation: FormulaGateOperation): string {
  const includesCommonOrder = /CALL\s+COM_ORDER/i.test(operation.evidence.raw);
  const terms = [
    ...(includesCommonOrder
      ? ['...commonOrderGateTerms({ palamThresholds: LEGACY_COM_ORDER_PALAM_THRESHOLDS })']
      : []),
    ...operation.terms
      .filter((term) => !(includesCommonOrder && /com[-_]?order[-_]?call/i.test(term.id)))
      .map(formulaTermCode),
  ];
  const threshold = formulaGateThresholdCode(operation);

  return `defineScoreFormulaGate({
      id: ${q(operation.id)},
      threshold: ${threshold},
      reason: ${q(`${operation.id} score is below threshold.`)},
      ${operation.autoPassWhen ? `autoPassWhen: (context) => ${runtimeConditionCode(operation.autoPassWhen)},` : ''}
      terms: [
        ${terms.join(',\n        ')}
      ],
    })`;
}

function effectCode(operation: ErbIrOperation): string | undefined {
  if (![
    'sourceSet',
    'sourceAdd',
    'sourceMultiply',
    'loseBaseAdd',
    'baseAdd',
    'expAdd',
    'flagSet',
    'stainMerge',
    'stainSetBits',
    'stainClearBits',
  ].includes(operation.kind)) {
    return undefined;
  }

  const prefix = 'when' in operation && operation.when ? `if (${runtimeConditionCode(operation.when)}) effects.push(` : 'effects.push(';
  const suffix = 'when' in operation && operation.when ? ');' : ');';

  switch (operation.kind) {
    case 'sourceSet':
    case 'sourceAdd':
    case 'sourceMultiply': {
      const mapped = statRef(operation.target);
      const op = operation.kind === 'sourceSet' ? 'set' : operation.kind === 'sourceMultiply' ? 'multiply' : 'add';
      return `${prefix}numericStat('source', ${q(mapped.key)}, ${valueCode(operation.value)}, ${q(op)})${suffix}`;
    }
    case 'loseBaseAdd': {
      const mapped = statRef(operation.target);
      return `${prefix}addLoseBase(${q(mapped.key)}, ${valueCode(operation.value)})${suffix}`;
    }
    case 'baseAdd': {
      const mapped = statRef(operation.target);
      return `${prefix}addBase(${q(mapped.key)}, ${valueCode(operation.value)})${suffix}`;
    }
    case 'expAdd': {
      const mapped = statRef(operation.target);
      return `${prefix}addExp(${q(mapped.key)}, ${valueCode(operation.value)})${suffix}`;
    }
    case 'flagSet': {
      const mapped = statRef(operation.target);
      const stat = mapped.stat === 'flag' ? undefined : mapped.stat;
      const code = stat
        ? `numericStat(${q(stat)}, ${q(mapped.key)}, ${valueCode(operation.value)}, 'set')`
        : `numericFlag(${q(mapped.key)}, ${valueCode(operation.value)}, 'set')`;
      return `${prefix}${code}${suffix}`;
    }
    case 'stainMerge': {
      const from = statRef(operation.from);
      const to = statRef(operation.to);
      const mode = operation.mode === 'fromTo' ? 'mergeIntoTo' : operation.mode === 'toFrom' ? 'mergeIntoFrom' : 'bidirectionalMerge';
      return `${prefix}mergeStains(stainSlot(${q(from.key)}), stainSlot(${q(to.key)}), ${q(mode)})${suffix}`;
    }
    case 'stainSetBits':
    case 'stainClearBits': {
      const mapped = statRef(operation.target);
      const fn = operation.kind === 'stainSetBits' ? 'setStainBits' : 'clearStainBits';
      return `${prefix}${fn}(${q(mapped.key)}, ${operation.mask})${suffix}`;
    }
  }
}

function buildSpecDraft(ir: ErbCommandIr, conflicts: WorkerConflict[]): CommandDraft {
  const rows = ir.operations.map((operation) =>
    `- ${operation.id}: ${operation.kind} (${operation.evidence.file}:${operation.evidence.lineStart}-${operation.evidence.lineEnd})`,
  );

  return {
    schemaVersion: 'training-command-draft/v1',
    commandId: ir.command.id,
    sourceReport: `${ir.command.id}.ir.json`,
    files: [{
      path: `docs/ai-port/spec-drafts/${ir.command.id}.spec.md`,
      operation: 'create',
      reason: 'Strict IR could not be lowered to executable TypeScript without unresolved mappings or unsupported operations.',
      content: [
        `# ${ir.command.id} Strict IR Draft`,
        '',
        'Executable TypeScript was not emitted because strict IR validation found blocking issues.',
        '',
        '## Blocking Issues',
        ...conflicts.map((item) => `- ${item.decisionNeeded}`),
        '',
        '## Operations',
        ...rows,
        '',
      ].join('\n'),
    }],
    requiredChecks: ['schema', 'strict-ir', 'mapping-resolution', 'typecheck'],
    unresolvedConflicts: conflicts,
    notes: [
      'Generated from erb-command-ir/v1.',
      'No registry or helper invention is allowed; unresolved mappings block executable codegen.',
    ],
  };
}

function buildExecutableDraft(ir: ErbCommandIr): CommandDraft {
  const commandNumberValue = commandNumber(ir.command.id);
  const exportName = `comf${commandNumberValue}Command`;
  const requirements = ir.operations
    .filter((operation): operation is Extract<ErbIrOperation, { kind: 'requirement' }> => operation.kind === 'requirement')
    .map((operation) => conditionCode(operation.condition));
  const phaseSkips = ir.operations
    .filter((operation): operation is Extract<ErbIrOperation, { kind: 'phaseSkip' }> => operation.kind === 'phaseSkip')
    .map((operation) => `{
      phase: 'postEffects',
      when: [${conditionCode(operation.when)}],
      reason: ${q(operation.note ?? operation.id)},
    }`);
  const effectLines = ir.operations
    .map(effectCode)
    .filter((line): line is string => Boolean(line));
  const formulaGates = ir.operations
    .filter((operation): operation is FormulaGateOperation => operation.kind === 'formulaGate')
    .map(formulaGateCode);
  const messages = ir.operations
    .filter((operation): operation is Extract<ErbIrOperation, { kind: 'message' }> => operation.kind === 'message' && operation.behaviorAffecting)
    .map((operation) => `addMessage(${q(operation.text)})`);

  const content = `import { all, any, bitAny, bitNone, compareStat, hasTag, missingTag, not } from '../../../core/conditions';
import { addBase, addExp, addLoseBase, addMessage, clearStainBits, mergeStains, numericFlag, numericStat, setStainBits, stainSlot, type Effect } from '../../../core/effects';
import { commonOrderGateTerms, defineScoreFormulaGate, defineTrainingCommand, type TrainingEffectResolver } from '../../../domain/training';

const LEGACY_COM_ORDER_PALAM_THRESHOLDS = [100, 500, 1000, 3000, 10000] as const;
const LEGACY_PALAM_LEVEL_THRESHOLDS = [0, 100, 500, 1000, 3000, 10000] as const;
const LEGACY_EXP_LEVEL_THRESHOLDS = [0, 500, 1000, 2000, 5000, 10000] as const;

function legacyLevelThreshold(domain: 'PALAMLV' | 'EXPLV', level: number): number {
  const thresholds = domain === 'PALAMLV' ? LEGACY_PALAM_LEVEL_THRESHOLDS : LEGACY_EXP_LEVEL_THRESHOLDS;
  return thresholds[level] ?? thresholds[thresholds.length - 1] ?? 0;
}

function readStat(context: Parameters<TrainingEffectResolver>[0], stat: string, key: string, role?: string): number {
  const targetId = role ? context.resolveTargetId?.(role) : undefined;
  return context.getNumericStat(stat, key, targetId);
}

function tableValue(
  context: Parameters<TrainingEffectResolver>[0],
  stat: string,
  key: string,
  values: readonly number[],
  role?: string,
): number {
  const level = Math.trunc(readStat(context, stat, key, role));
  const index = Math.max(0, Math.min(level, values.length - 1));
  return values[index] ?? 0;
}

const ${exportName}Effects: TrainingEffectResolver = (context) => {
  const effects: Effect[] = [];
  ${effectLines.join('\n  ')}
  return effects;
};

const ${exportName}FormulaGates = [
  ${formulaGates.join(',\n  ')}
] as const satisfies readonly ReturnType<typeof defineScoreFormulaGate>[];

export const ${exportName} = defineTrainingCommand({
  id: 'training.ai.${ir.command.id.toLowerCase()}',
  originalId: ${ir.command.originalId},
  name: ${q(ir.command.name ?? ir.command.id)},
  category: 'basic',
  tags: ['ai-port', ${q(ir.command.id.toLowerCase())}],
  actors: [
    { role: 'target', required: true },
    { role: 'trainer', required: true },
  ],
  requirements: [
    ${requirements.join(',\n    ')}
  ],
  formulaGates: ${exportName}FormulaGates,
  effects: [
    ${messages.join(',\n    ')}
  ],
  dynamicEffects: [${exportName}Effects],
  phaseSkips: [
    ${phaseSkips.join(',\n    ')}
  ],
});
`;

  return {
    schemaVersion: 'training-command-draft/v1',
    commandId: ir.command.id,
    sourceReport: `${ir.command.id}.ir.json`,
    files: [{
      path: `src/content/training/aiGenerated/${ir.command.id}.ts`,
      operation: 'create',
      content,
      reason: 'Generated from strict ERB command IR.',
    }],
    requiredChecks: ['schema', 'strict-ir', 'mapping-resolution', 'typecheck'],
    unresolvedConflicts: [],
    notes: ir.operations.map((operation) => `implemented:${operation.id}`),
  };
}

export function buildDraftFromIr(ir: ErbCommandIr): CommandDraft {
  const shape = validateErbCommandIrShape(ir);
  const semanticIssues = collectIrSemanticIssues(ir);
  const conflicts = [
    ...shape.errors.map((error) =>
      conflict('unknown', error),
    ),
    ...semanticIssues.mappingIssues.map((issue) =>
      conflict('state', issue.message ?? `Mapping issue for ${legacyRefLabel(issue.legacy)}.`),
    ),
    ...semanticIssues.unsupportedOperations.map((operation) =>
      conflict('unknown', `${operation.id}: ${operation.kind === 'unsupported' ? operation.reason : 'Unsupported operation.'}`),
    ),
  ];

  if (conflicts.length > 0) return buildSpecDraft(ir, conflicts);
  return buildExecutableDraft(ir);
}
