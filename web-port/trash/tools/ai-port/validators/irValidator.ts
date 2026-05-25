import type {
  ErbCommandIr,
  ErbIrCondition,
  ErbIrDomain,
  ErbIrFormulaFailWhen,
  ErbIrNumericValue,
  ErbIrOperation,
  ErbIrRef,
  ValidationResult,
} from '../types';
import { legacyRefLabel, resolveLegacyRef, type MappingResult } from '../ir/mapping';

const DOMAINS: readonly ErbIrDomain[] = [
  'ABL',
  'TALENT',
  'TEQUIP',
  'CFLAG',
  'TFLAG',
  'FLAG',
  'SOURCE',
  'EXP',
  'PALAM',
  'LOSEBASE',
  'BASE',
  'STAIN',
  'MARK',
  'ITEM',
];

const OPERATION_KINDS = new Set([
  'requirement',
  'formulaGate',
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
  'phaseSkip',
  'returnSuccess',
  'returnFailure',
  'message',
  'unsupported',
]);

export interface IrSemanticIssues {
  readonly mappingIssues: MappingResult[];
  readonly unsupportedOperations: ErbIrOperation[];
}

function isObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function pushIfMissing(errors: string[], condition: unknown, message: string): void {
  if (!condition) errors.push(message);
}

function validateAllowedKeys(errors: string[], value: Record<string, unknown>, label: string, allowedKeys: readonly string[]): void {
  const allowed = new Set(allowedKeys);
  const unexpected = Object.keys(value).filter((key) => !allowed.has(key));
  if (unexpected.length > 0) errors.push(`${label} has unsupported field(s): ${unexpected.join(', ')}.`);
}

function validateEvidence(errors: string[], evidence: unknown, label: string): void {
  if (!isObject(evidence)) {
    errors.push(`${label}.evidence is required.`);
    return;
  }
  validateAllowedKeys(errors, evidence, `${label}.evidence`, ['file', 'lineStart', 'lineEnd', 'raw']);
  pushIfMissing(errors, typeof evidence.file === 'string' && evidence.file.trim().length > 0, `${label}.evidence.file is required.`);
  pushIfMissing(errors, typeof evidence.lineStart === 'number', `${label}.evidence.lineStart is required.`);
  pushIfMissing(errors, typeof evidence.lineEnd === 'number', `${label}.evidence.lineEnd is required.`);
  pushIfMissing(errors, typeof evidence.raw === 'string' && evidence.raw.trim().length > 0, `${label}.evidence.raw is required.`);
  if (typeof evidence.lineStart === 'number' && typeof evidence.lineEnd === 'number' && evidence.lineEnd < evidence.lineStart) {
    errors.push(`${label}.evidence.lineEnd must be >= lineStart.`);
  }
}

function validateRef(errors: string[], ref: unknown, label: string): void {
  if (!isObject(ref)) {
    errors.push(`${label} must be a legacy reference object.`);
    return;
  }
  validateAllowedKeys(errors, ref, label, ['domain', 'index', 'role']);
  pushIfMissing(errors, DOMAINS.includes(String(ref.domain) as ErbIrDomain), `${label}.domain is invalid.`);
  pushIfMissing(errors, Number.isInteger(ref.index), `${label}.index must be an integer.`);
  if (ref.role !== undefined) {
    pushIfMissing(
      errors,
      ['target', 'trainer', 'assistant', 'master', 'player', 'global'].includes(String(ref.role)),
      `${label}.role is invalid.`,
    );
  }
}

function validateCompareValue(errors: string[], value: unknown, label: string): void {
  if (typeof value === 'number') return;
  if (!isObject(value)) {
    errors.push(`${label} must be a number or static level threshold object.`);
    return;
  }
  if (value.kind === 'literal') {
    pushIfMissing(errors, typeof value.value === 'number', `${label}.value must be a number.`);
    return;
  }
  if (value.kind === 'levelThreshold') {
    validateNumericValue(errors, value, label);
    return;
  }
  errors.push(`${label} only supports literal numbers or levelThreshold objects; dynamic RHS values must be represented as unsupported until codegen supports them.`);
}

function validateCondition(errors: string[], condition: unknown, label: string): void {
  if (!isObject(condition)) {
    errors.push(`${label} must be a condition AST object; strings are not allowed.`);
    return;
  }

  switch (condition.kind) {
    case 'statCompare':
      validateAllowedKeys(errors, condition, label, ['kind', 'ref', 'op', 'value']);
      validateRef(errors, condition.ref, `${label}.ref`);
      pushIfMissing(errors, ['eq', 'neq', 'gt', 'gte', 'lt', 'lte'].includes(String(condition.op)), `${label}.op is invalid.`);
      validateCompareValue(errors, condition.value, `${label}.value`);
      return;
    case 'statBit':
      validateAllowedKeys(errors, condition, label, ['kind', 'ref', 'op', 'mask']);
      validateRef(errors, condition.ref, `${label}.ref`);
      pushIfMissing(errors, ['any', 'all', 'none'].includes(String(condition.op)), `${label}.op is invalid.`);
      pushIfMissing(errors, Number.isInteger(condition.mask) && Number(condition.mask) > 0, `${label}.mask must be a positive integer.`);
      return;
    case 'all':
    case 'any':
      validateAllowedKeys(errors, condition, label, ['kind', 'conditions']);
      pushIfMissing(errors, Array.isArray(condition.conditions), `${label}.conditions must be an array.`);
      if (Array.isArray(condition.conditions)) {
        condition.conditions.forEach((child, index) => validateCondition(errors, child, `${label}.conditions[${index}]`));
      }
      return;
    case 'not':
      validateAllowedKeys(errors, condition, label, ['kind', 'condition']);
      validateCondition(errors, condition.condition, `${label}.condition`);
      return;
    case 'tag':
      validateAllowedKeys(errors, condition, label, ['kind', 'tag', 'present']);
      pushIfMissing(errors, typeof condition.tag === 'string' && condition.tag.trim().length > 0, `${label}.tag is required.`);
      pushIfMissing(errors, typeof condition.present === 'boolean', `${label}.present must be boolean.`);
      return;
    default:
      errors.push(`${label}.kind is invalid: ${String(condition.kind)}.`);
  }
}

function validateNumericValue(errors: string[], value: unknown, label: string): void {
  if (!isObject(value)) {
    errors.push(`${label} must be a numeric value AST object; literals must use { kind: "literal", value }. `);
    return;
  }

  switch (value.kind) {
    case 'literal':
      validateAllowedKeys(errors, value, label, ['kind', 'value']);
      pushIfMissing(errors, typeof value.value === 'number', `${label}.value must be a number.`);
      return;
    case 'levelThreshold':
      validateAllowedKeys(errors, value, label, ['kind', 'domain', 'level']);
      pushIfMissing(errors, ['PALAMLV', 'EXPLV'].includes(String(value.domain)), `${label}.domain is invalid.`);
      pushIfMissing(errors, Number.isInteger(value.level) && Number(value.level) >= 0, `${label}.level must be a non-negative integer.`);
      return;
    case 'table':
      validateAllowedKeys(errors, value, label, ['kind', 'by', 'values', 'clamp']);
      validateRef(errors, value.by, `${label}.by`);
      pushIfMissing(errors, Array.isArray(value.values), `${label}.values must be an array.`);
      if (Array.isArray(value.values)) {
        value.values.forEach((entry, index) => pushIfMissing(errors, typeof entry === 'number', `${label}.values[${index}] must be a number.`));
      }
      if (value.clamp !== undefined) pushIfMissing(errors, typeof value.clamp === 'boolean', `${label}.clamp must be boolean.`);
      return;
    case 'conditional':
      validateAllowedKeys(errors, value, label, ['kind', 'cases', 'otherwise']);
      pushIfMissing(errors, Array.isArray(value.cases) && value.cases.length > 0, `${label}.cases must be a non-empty array.`);
      if (Array.isArray(value.cases)) {
        value.cases.forEach((entry, index) => {
          if (!isObject(entry)) {
          errors.push(`${label}.cases[${index}] must be an object.`);
          return;
        }
          validateAllowedKeys(errors, entry, `${label}.cases[${index}]`, ['when', 'value']);
          validateCondition(errors, entry.when, `${label}.cases[${index}].when`);
          validateNumericValue(errors, entry.value, `${label}.cases[${index}].value`);
        });
      }
      pushIfMissing(errors, value.otherwise !== undefined, `${label}.otherwise is required; implicit codegen defaults are not allowed.`);
      if (value.otherwise !== undefined) validateNumericValue(errors, value.otherwise, `${label}.otherwise`);
      return;
    case 'stat':
      validateAllowedKeys(errors, value, label, ['kind', 'ref']);
      validateRef(errors, value.ref, `${label}.ref`);
      return;
    case 'binary':
      validateAllowedKeys(errors, value, label, ['kind', 'op', 'left', 'right']);
      pushIfMissing(errors, ['add', 'subtract', 'multiply', 'divide'].includes(String(value.op)), `${label}.op is invalid.`);
      validateNumericValue(errors, value.left, `${label}.left`);
      validateNumericValue(errors, value.right, `${label}.right`);
      return;
    default:
      errors.push(`${label}.kind is invalid: ${String(value.kind)}.`);
  }
}

function evidenceLooksConditional(evidence: unknown): boolean {
  return isObject(evidence) &&
    typeof evidence.raw === 'string' &&
    /\b(?:IF|SIF|ELSEIF|ELSE)\b/i.test(evidence.raw);
}

function valueContainsConditionalNoop(value: unknown): boolean {
  if (!isObject(value)) return false;
  if (value.kind === 'conditional') return true;
  if (value.kind === 'table') return true;
  if (value.kind === 'binary') {
    return valueContainsConditionalNoop(value.left) || valueContainsConditionalNoop(value.right);
  }
  return false;
}

function conditionalOtherwiseNumber(value: unknown): number | undefined {
  if (!isObject(value) || value.kind !== 'conditional') return undefined;
  return staticNumberValue(value.otherwise);
}

function validateConditionalWriteCoverage(errors: string[], op: Record<string, unknown>, label: string): void {
  if (op.kind === 'flagSet' && op.when === undefined && valueContainsConditionalNoop(op.value)) {
    errors.push(`${label} is a conditional flag assignment without when; flag writes must not be converted to conditional set values.`);
    return;
  }
  if (op.kind === 'sourceMultiply' && op.when === undefined && isObject(op.value) && op.value.kind === 'conditional' && conditionalOtherwiseNumber(op.value) !== 1) {
    errors.push(`${label} is a conditional sourceMultiply without when; otherwise must be literal 1.`);
  }
  if (['sourceAdd', 'loseBaseAdd', 'baseAdd', 'expAdd'].includes(String(op.kind)) &&
    op.when === undefined &&
    isObject(op.value) &&
    op.value.kind === 'conditional' &&
    conditionalOtherwiseNumber(op.value) !== 0) {
    errors.push(`${label} is a conditional additive write without when; otherwise must be literal 0.`);
  }
  if (!evidenceLooksConditional(op.evidence)) return;
  if (op.kind === 'flagSet' && op.when === undefined) {
    errors.push(`${label} is a flag assignment inside conditional ERB evidence, but it has no when condition; flag writes must not be converted to unconditional set operations.`);
    return;
  }
  if (op.when === undefined && !valueContainsConditionalNoop(op.value)) {
    errors.push(`${label} is inside conditional ERB evidence, but has neither when nor a conditional/table no-op value.`);
  }
}

function conditionPrimaryRef(condition: unknown): string | undefined {
  if (!isObject(condition)) return undefined;
  if ((condition.kind === 'statCompare' || condition.kind === 'statBit') && isObject(condition.ref)) {
    return `${String(condition.ref.domain)}:${String(condition.ref.role ?? 'target')}:${String(condition.ref.index)}`;
  }
  return undefined;
}

function conditionMentionsRef(condition: unknown, domain: ErbIrDomain, index: number): boolean {
  if (!isObject(condition)) return false;
  if ((condition.kind === 'statCompare' || condition.kind === 'statBit') && isObject(condition.ref)) {
    return condition.ref.domain === domain && condition.ref.index === index;
  }
  if ((condition.kind === 'all' || condition.kind === 'any') && Array.isArray(condition.conditions)) {
    return condition.conditions.some((child) => conditionMentionsRef(child, domain, index));
  }
  if (condition.kind === 'not') return conditionMentionsRef(condition.condition, domain, index);
  return false;
}

function conditionExcludesRef(condition: unknown, domain: ErbIrDomain, index: number): boolean {
  if (!isObject(condition)) return false;
  if (condition.kind === 'not') return conditionMentionsRef(condition.condition, domain, index);
  if (condition.kind === 'statCompare' && isObject(condition.ref) && condition.ref.domain === domain && condition.ref.index === index) {
    if (condition.op === 'eq' && staticNumberValue(condition.value) === 0) return true;
    if (condition.op === 'lt' && staticNumberValue(condition.value) === 1) return true;
  }
  if ((condition.kind === 'all' || condition.kind === 'any') && Array.isArray(condition.conditions)) {
    return condition.conditions.some((child) => conditionExcludesRef(child, domain, index));
  }
  return false;
}

function isThresholdElseIfConditional(value: unknown): boolean {
  if (!isObject(value) || value.kind !== 'conditional' || !Array.isArray(value.cases) || value.cases.length <= 1) {
    return true;
  }

  const refs = value.cases.map((entry) => isObject(entry) ? conditionPrimaryRef(entry.when) : undefined);
  return refs.every((ref) => ref !== undefined && ref === refs[0]);
}

function validateFormulaTermValue(errors: string[], value: unknown, label: string): void {
  if (!isThresholdElseIfConditional(value)) {
    errors.push(`${label} looks like independent IF modifiers collapsed into one conditional chain; split independent IFs into separate formula terms, and reserve conditional values for ELSEIF/table chains.`);
  }
}

function collectRefObjects(value: unknown, refs: ErbIrRef[]): void {
  if (Array.isArray(value)) {
    value.forEach((entry) => collectRefObjects(entry, refs));
    return;
  }
  if (!isObject(value)) return;

  if (DOMAINS.includes(String(value.domain) as ErbIrDomain) && Number.isInteger(value.index)) {
    refs.push(value as unknown as ErbIrRef);
  }

  Object.values(value).forEach((entry) => collectRefObjects(entry, refs));
}

function refsContain(refs: readonly ErbIrRef[], domain: ErbIrDomain, index: number): boolean {
  return refs.some((ref) => ref.domain === domain && ref.index === index);
}

function staticNumberValue(value: unknown): number | undefined {
  if (typeof value === 'number') return value;
  if (!isObject(value)) return undefined;
  switch (value.kind) {
    case 'literal':
      return typeof value.value === 'number' ? value.value : undefined;
    case 'binary': {
      const left = staticNumberValue(value.left);
      const right = staticNumberValue(value.right);
      if (left === undefined || right === undefined) return undefined;
      if (value.op === 'add') return left + right;
      if (value.op === 'subtract') return left - right;
      if (value.op === 'multiply') return left * right;
      if (value.op === 'divide') return right === 0 ? undefined : left / right;
      return undefined;
    }
    default:
      return undefined;
  }
}

function validateFormulaThresholdMutation(errors: string[], op: Record<string, unknown>, label: string): void {
  if (!isObject(op.evidence) || typeof op.evidence.raw !== 'string' || !Array.isArray(op.terms)) return;
  const raw = op.evidence.raw;

  const mutationRefs = Array.from(raw.matchAll(/\+\s*(-?\d+(?:\.\d+)?)\s+if\s+([A-Z]+):(\d+)/gi))
    .map((match) => ({
      delta: Number(match[1]),
      domain: match[2] as ErbIrDomain,
      index: Number(match[3]),
    }))
    .filter((entry) => Number.isFinite(entry.delta) && DOMAINS.includes(entry.domain) && Number.isInteger(entry.index));
  if (mutationRefs.length === 0) return;

  const thresholdRefs: ErbIrRef[] = [];
  collectRefObjects(op.threshold, thresholdRefs);
  collectRefObjects(op.thresholdModifiers, thresholdRefs);

  const hasVideoScoreTerm = op.terms.some((term) => {
    if (!isObject(term)) return false;
    const refs: ErbIrRef[] = [];
    collectRefObjects(term.when, refs);
    const staticValue = staticNumberValue(term.value);
    return mutationRefs.some((mutationRef) =>
      staticValue === mutationRef.delta &&
      refsContain(refs, mutationRef.domain, mutationRef.index) &&
      !refsContain(thresholdRefs, mutationRef.domain, mutationRef.index),
    );
  });

  if (hasVideoScoreTerm) {
    errors.push(`${label} appears to encode an ERB V threshold mutation as a score term; encode V mutations in threshold or thresholdModifiers instead.`);
  }
}

function validateFormulaGateEvidence(errors: string[], op: Record<string, unknown>, label: string): void {
  if (!isObject(op.evidence) || typeof op.evidence.raw !== 'string') return;
  const raw = op.evidence.raw;

  if (/CALL\s+COM_ORDER/i.test(raw) && !/SIF\s+A\s*<\s*V|A\s*<\s*V/i.test(raw)) {
    errors.push(`${label}.evidence.raw for a COM_ORDER formula gate must include the ERB score failure check, not only a summary.`);
  }
  if (/\.\.\.|\[\s*\.\.\./.test(raw)) {
    errors.push(`${label}.evidence.raw is lossy; strict IR evidence must include compact original ERB text without ellipses.`);
  }
}

function validateFormulaElseIfDependencies(errors: string[], op: Record<string, unknown>, label: string): void {
  if (!Array.isArray(op.terms)) return;

  const hasVirginTerm = op.terms.some((term) =>
    isObject(term) && conditionMentionsRef(term.when, 'TALENT', 0),
  );
  const exp0LowTerm = op.terms.find((term) =>
    isObject(term) && conditionMentionsRef(term.when, 'EXP', 0),
  );

  if (hasVirginTerm && isObject(exp0LowTerm) && !conditionExcludesRef(exp0LowTerm.when, 'TALENT', 0)) {
    errors.push(`${label} has an EXP:0 fallback formula term without excluding TALENT:0; ERB ELSEIF branches must preserve previous IF negation.`);
  }
}

function validateEvidenceRoles(errors: string[], op: Record<string, unknown>, label: string): void {
  if (!isObject(op.evidence) || typeof op.evidence.raw !== 'string') return;

  const raw = op.evidence.raw;
  const refs: ErbIrRef[] = [];
  collectRefObjects(op, refs);
  const roles = new Set(refs.map((ref) => ref.role).filter(Boolean));

  if (/:(PLAYER|MASTER):/i.test(raw) && ![...roles].some((role) => ['player', 'master', 'trainer'].includes(String(role)))) {
    errors.push(`${label}.evidence references PLAYER/MASTER state, but no ref has role "player", "master", or "trainer".`);
  }
  if (/:(ASSI|ASSISTANT):/i.test(raw) && !roles.has('assistant')) {
    errors.push(`${label}.evidence references assistant state, but no ref has role "assistant".`);
  }
}

function validateFormulaFailWhen(errors: string[], value: unknown, label: string): void {
  if (!isObject(value)) {
    errors.push(`${label} must be a formula fail condition object.`);
    return;
  }

  if (value.kind === 'scoreBelowThreshold') return;
  if (value.kind === 'condition') {
    validateCondition(errors, value.condition, `${label}.condition`);
    errors.push(`${label}.kind "condition" is not lowered by strict codegen yet; use a requirement/phaseSkip operation or emit unsupported.`);
    return;
  }
  errors.push(`${label}.kind is invalid: ${String(value.kind)}.`);
}

function validateOperation(errors: string[], op: unknown, label: string): void {
  if (!isObject(op)) {
    errors.push(`${label} must be an object.`);
    return;
  }
  pushIfMissing(errors, typeof op.id === 'string' && op.id.trim().length > 0, `${label}.id is required.`);
  pushIfMissing(errors, OPERATION_KINDS.has(String(op.kind)), `${label}.kind is invalid.`);
  validateEvidence(errors, op.evidence, label);
  validateEvidenceRoles(errors, op, label);

  switch (op.kind) {
    case 'requirement':
      validateAllowedKeys(errors, op, label, ['id', 'kind', 'evidence', 'note', 'condition']);
      validateCondition(errors, op.condition, `${label}.condition`);
      return;
    case 'formulaGate':
      validateAllowedKeys(errors, op, label, ['id', 'kind', 'evidence', 'note', 'threshold', 'thresholdModifiers', 'terms', 'failWhen', 'autoPassWhen']);
      validateNumericValue(errors, op.threshold, `${label}.threshold`);
      pushIfMissing(errors, Array.isArray(op.terms) && op.terms.length > 0, `${label}.terms must be a non-empty array.`);
      if (Array.isArray(op.terms)) {
        op.terms.forEach((term, index) => {
          if (!isObject(term)) {
            errors.push(`${label}.terms[${index}] must be an object.`);
            return;
          }
          validateAllowedKeys(errors, term, `${label}.terms[${index}]`, ['id', 'value', 'when', 'label']);
          pushIfMissing(errors, typeof term.id === 'string' && term.id.trim().length > 0, `${label}.terms[${index}].id is required.`);
          validateNumericValue(errors, term.value, `${label}.terms[${index}].value`);
          validateFormulaTermValue(errors, term.value, `${label}.terms[${index}].value`);
          if (term.when !== undefined) validateCondition(errors, term.when, `${label}.terms[${index}].when`);
        });
      }
      validateFormulaThresholdMutation(errors, op, label);
      validateFormulaGateEvidence(errors, op, label);
      validateFormulaElseIfDependencies(errors, op, label);
      if (Array.isArray(op.thresholdModifiers)) {
        op.thresholdModifiers.forEach((modifier, index) => {
          if (!isObject(modifier)) {
            errors.push(`${label}.thresholdModifiers[${index}] must be an object.`);
            return;
          }
          validateCondition(errors, modifier.when, `${label}.thresholdModifiers[${index}].when`);
          pushIfMissing(errors, typeof modifier.delta === 'number', `${label}.thresholdModifiers[${index}].delta must be a number.`);
        });
      }
      validateFormulaFailWhen(errors, op.failWhen, `${label}.failWhen`);
      if (op.autoPassWhen !== undefined) validateCondition(errors, op.autoPassWhen, `${label}.autoPassWhen`);
      return;
    case 'sourceSet':
    case 'sourceAdd':
    case 'sourceMultiply':
    case 'loseBaseAdd':
    case 'baseAdd':
    case 'expAdd':
    case 'flagSet':
      validateAllowedKeys(errors, op, label, ['id', 'kind', 'evidence', 'note', 'target', 'value', 'when']);
      validateConditionalWriteCoverage(errors, op, label);
      validateRef(errors, op.target, `${label}.target`);
      validateNumericValue(errors, op.value, `${label}.value`);
      if (op.when !== undefined) validateCondition(errors, op.when, `${label}.when`);
      return;
    case 'stainMerge':
      validateAllowedKeys(errors, op, label, ['id', 'kind', 'evidence', 'note', 'from', 'to', 'mode', 'when']);
      validateConditionalWriteCoverage(errors, op, label);
      validateRef(errors, op.from, `${label}.from`);
      validateRef(errors, op.to, `${label}.to`);
      pushIfMissing(errors, ['bidirectional', 'fromTo', 'toFrom'].includes(String(op.mode)), `${label}.mode is invalid.`);
      if (op.when !== undefined) validateCondition(errors, op.when, `${label}.when`);
      return;
    case 'stainSetBits':
    case 'stainClearBits':
      validateAllowedKeys(errors, op, label, ['id', 'kind', 'evidence', 'note', 'target', 'mask', 'when']);
      validateConditionalWriteCoverage(errors, op, label);
      validateRef(errors, op.target, `${label}.target`);
      pushIfMissing(errors, Number.isInteger(op.mask) && Number(op.mask) > 0, `${label}.mask must be a positive integer.`);
      if (op.when !== undefined) validateCondition(errors, op.when, `${label}.when`);
      return;
    case 'phaseSkip':
      validateAllowedKeys(errors, op, label, ['id', 'kind', 'evidence', 'note', 'phase', 'when']);
      pushIfMissing(errors, op.phase === 'postEffects', `${label}.phase must be "postEffects".`);
      validateCondition(errors, op.when, `${label}.when`);
      return;
    case 'returnSuccess':
    case 'returnFailure':
      validateAllowedKeys(errors, op, label, ['id', 'kind', 'evidence', 'note', 'when']);
      if (op.when !== undefined) validateCondition(errors, op.when, `${label}.when`);
      return;
    case 'message':
      validateAllowedKeys(errors, op, label, ['id', 'kind', 'evidence', 'note', 'text', 'when', 'behaviorAffecting']);
      pushIfMissing(errors, typeof op.text === 'string', `${label}.text is required.`);
      pushIfMissing(errors, typeof op.behaviorAffecting === 'boolean', `${label}.behaviorAffecting is required.`);
      if (op.when !== undefined) validateCondition(errors, op.when, `${label}.when`);
      return;
    case 'unsupported':
      validateAllowedKeys(errors, op, label, ['id', 'kind', 'evidence', 'note', 'reason']);
      pushIfMissing(errors, typeof op.reason === 'string' && op.reason.trim().length > 0, `${label}.reason is required.`);
      return;
  }
}

export function validateErbCommandIrShape(value: unknown): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!isObject(value)) {
    return { ok: false, errors: ['IR artifact is not an object.'], warnings };
  }

  pushIfMissing(errors, value.schemaVersion === 'erb-command-ir/v1', 'Invalid IR schemaVersion.');
  pushIfMissing(errors, isObject(value.command), 'Missing command object.');
  if (isObject(value.command)) {
    pushIfMissing(errors, typeof value.command.id === 'string', 'Missing command.id.');
    pushIfMissing(errors, typeof value.command.originalId === 'number', 'Missing command.originalId.');
  }
  pushIfMissing(errors, Array.isArray(value.sourceFiles), 'Missing sourceFiles array.');
  pushIfMissing(errors, Array.isArray(value.operations), 'Missing operations array.');
  if (Array.isArray(value.operations)) {
    value.operations.forEach((operation, index) => validateOperation(errors, operation, `operations[${index}]`));
  }

  return { ok: errors.length === 0, errors, warnings };
}

function collectConditionRefs(condition: ErbIrCondition | undefined, refs: ErbIrRef[]): void {
  if (!condition) return;
  switch (condition.kind) {
    case 'statCompare':
      refs.push(condition.ref);
      if (typeof condition.value !== 'number') collectValueRefs(condition.value, refs);
      return;
    case 'statBit':
      refs.push(condition.ref);
      return;
    case 'all':
    case 'any':
      condition.conditions.forEach((child) => collectConditionRefs(child, refs));
      return;
    case 'not':
      collectConditionRefs(condition.condition, refs);
      return;
    case 'tag':
      return;
  }
}

function collectValueRefs(value: ErbIrNumericValue | undefined, refs: ErbIrRef[]): void {
  if (!value) return;
  switch (value.kind) {
    case 'literal':
    case 'levelThreshold':
      return;
    case 'table':
      refs.push(value.by);
      return;
    case 'conditional':
      value.cases.forEach((entry) => {
        collectConditionRefs(entry.when, refs);
        collectValueRefs(entry.value, refs);
      });
      collectValueRefs(value.otherwise, refs);
      return;
    case 'stat':
      refs.push(value.ref);
      return;
    case 'binary':
      collectValueRefs(value.left, refs);
      collectValueRefs(value.right, refs);
      return;
  }
}

function collectFormulaFailWhenRefs(failWhen: ErbIrFormulaFailWhen | undefined, refs: ErbIrRef[]): void {
  if (!failWhen) return;
  if (failWhen.kind === 'condition') collectConditionRefs(failWhen.condition, refs);
}

function collectOperationRefs(operation: ErbIrOperation, refs: ErbIrRef[]): void {
  switch (operation.kind) {
    case 'requirement':
      collectConditionRefs(operation.condition, refs);
      return;
    case 'formulaGate':
      collectValueRefs(operation.threshold, refs);
      operation.thresholdModifiers?.forEach((modifier) => collectConditionRefs(modifier.when, refs));
      operation.terms.forEach((term) => {
        collectValueRefs(term.value, refs);
        collectConditionRefs(term.when, refs);
      });
      collectFormulaFailWhenRefs(operation.failWhen, refs);
      collectConditionRefs(operation.autoPassWhen, refs);
      return;
    case 'sourceSet':
    case 'sourceAdd':
    case 'sourceMultiply':
    case 'loseBaseAdd':
    case 'baseAdd':
    case 'expAdd':
    case 'flagSet':
      refs.push(operation.target);
      collectValueRefs(operation.value, refs);
      collectConditionRefs(operation.when, refs);
      return;
    case 'stainMerge':
      refs.push(operation.from, operation.to);
      collectConditionRefs(operation.when, refs);
      return;
    case 'stainSetBits':
    case 'stainClearBits':
      refs.push(operation.target);
      collectConditionRefs(operation.when, refs);
      return;
    case 'phaseSkip':
      collectConditionRefs(operation.when, refs);
      return;
    case 'returnSuccess':
    case 'returnFailure':
    case 'message':
      collectConditionRefs(operation.when, refs);
      return;
    case 'unsupported':
      return;
  }
}

export function collectIrSemanticIssues(ir: ErbCommandIr): IrSemanticIssues {
  const refs: ErbIrRef[] = [];
  ir.operations.forEach((operation) => collectOperationRefs(operation, refs));

  const seen = new Set<string>();
  const mappingIssues = refs
    .map(resolveLegacyRef)
    .filter((result) => !result.ok)
    .filter((result) => {
      const key = `${legacyRefLabel(result.legacy)}:${result.issue ?? ''}:${(result.candidates ?? []).join(',')}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

  return {
    mappingIssues,
    unsupportedOperations: ir.operations.filter((operation) => operation.kind === 'unsupported'),
  };
}
