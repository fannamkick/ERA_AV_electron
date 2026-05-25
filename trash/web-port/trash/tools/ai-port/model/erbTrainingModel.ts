import * as fs from 'fs';
import * as path from 'path';

export type ErbModelResidence =
  | 'character'
  | 'relationship'
  | 'commandSession'
  | 'equipmentSession'
  | 'globalEnvironment'
  | 'lookup'
  | 'localScratch';

export type ErbModelMutability = 'mutable' | 'readOnly' | 'generated';

export type ErbModelOwnerPolicy =
  | 'implicitTargetOrExplicitRole'
  | 'explicitRelationshipSubjectAndObject'
  | 'sessionScoped'
  | 'globalScoped'
  | 'localScoped'
  | 'readOnlyLookup';

export interface ErbStateDomainDefinition {
  readonly domain: string;
  readonly residence: ErbModelResidence;
  readonly mutability: ErbModelMutability;
  readonly ownerPolicy: ErbModelOwnerPolicy;
  readonly lowering: 'existingEngine' | 'structuredIr' | 'needsAdapter' | 'needsEngineCapability' | 'readOnlyOnly';
  readonly notes: string;
}

export interface ErbFlowConstructDefinition {
  readonly construct: string;
  readonly lowering: 'existingEngine' | 'structuredIr' | 'needsEngineCapability';
  readonly notes: string;
}

export interface ErbCallPolicyDefinition {
  readonly pattern: RegExp;
  readonly kind:
    | 'message'
    | 'formulaGate'
    | 'availability'
    | 'confirmation'
    | 'postEffect'
    | 'interactiveDisplay'
    | 'domainEffect'
    | 'unknownHelper';
  readonly lowering: 'existingEngine' | 'needsHelperCatalog' | 'needsEngineCapability' | 'manualDesign';
  readonly notes: string;
}

export type ErbActorRole = 'target' | 'player' | 'master' | 'assistant';

export type ErbRefIndex =
  | { readonly kind: 'literal'; readonly value: number }
  | { readonly kind: 'identifier'; readonly name: string }
  | { readonly kind: 'expression'; readonly expression: ErbExpression; readonly raw: string };

export interface ErbStateRefNode {
  readonly kind: 'stateRef';
  readonly domain: string;
  readonly residence: ErbModelResidence;
  readonly role?: ErbActorRole;
  readonly indices: readonly ErbRefIndex[];
  readonly raw: string;
}

export type ErbExpression =
  | { readonly kind: 'number'; readonly value: number }
  | { readonly kind: 'string'; readonly value: string }
  | { readonly kind: 'identifier'; readonly name: string }
  | { readonly kind: 'stateRef'; readonly ref: ErbStateRefNode }
  | { readonly kind: 'unary'; readonly op: 'not' | 'negate'; readonly value: ErbExpression }
  | {
      readonly kind: 'binary';
      readonly op:
        | 'add'
        | 'subtract'
        | 'multiply'
        | 'divide'
        | 'eq'
        | 'neq'
        | 'gt'
        | 'gte'
        | 'lt'
        | 'lte'
        | 'and'
        | 'or'
        | 'bitAnd'
        | 'bitOr';
      readonly left: ErbExpression;
      readonly right: ErbExpression;
    }
  | { readonly kind: 'interpolation'; readonly raw: string; readonly parts: readonly ErbExpression[] };

export interface ErbStatementEvidence {
  readonly file: string;
  readonly lineStart: number;
  readonly lineEnd: number;
  readonly raw: string;
}

export type ErbMutationOp = 'assign' | 'add' | 'subtract' | 'multiply' | 'divide' | 'bitOr';

export type ErbFlowStatement =
  | { readonly kind: 'label'; readonly name: string; readonly evidence: ErbStatementEvidence }
  | { readonly kind: 'assign'; readonly target: ErbExpression; readonly op: ErbMutationOp; readonly value: ErbExpression; readonly evidence: ErbStatementEvidence }
  | { readonly kind: 'times'; readonly target: ErbExpression; readonly factor: ErbExpression; readonly evidence: ErbStatementEvidence }
  | { readonly kind: 'if'; readonly condition: ErbExpression; readonly then: readonly ErbFlowStatement[]; readonly elseIf?: ReadonlyArray<{ readonly condition: ErbExpression; readonly body: readonly ErbFlowStatement[] }>; readonly otherwise?: readonly ErbFlowStatement[]; readonly evidence: ErbStatementEvidence }
  | { readonly kind: 'sif'; readonly condition: ErbExpression; readonly statement: ErbFlowStatement; readonly evidence: ErbStatementEvidence }
  | { readonly kind: 'call'; readonly target: string; readonly args?: readonly ErbExpression[]; readonly resultPolicy: 'none' | 'writesResult' | 'writesResults' | 'mutatesState' | 'unknown'; readonly evidence: ErbStatementEvidence }
  | { readonly kind: 'input'; readonly resultTarget: 'RESULT'; readonly evidence: ErbStatementEvidence }
  | { readonly kind: 'selectCase'; readonly value: ErbExpression; readonly cases: ReadonlyArray<{ readonly matches: readonly ErbExpression[]; readonly body: readonly ErbFlowStatement[] }>; readonly evidence: ErbStatementEvidence }
  | { readonly kind: 'goto'; readonly label: string; readonly evidence: ErbStatementEvidence }
  | { readonly kind: 'jump'; readonly commandId: string; readonly evidence: ErbStatementEvidence }
  | { readonly kind: 'return'; readonly value?: ErbExpression; readonly evidence: ErbStatementEvidence }
  | { readonly kind: 'print'; readonly value: ErbExpression; readonly evidence: ErbStatementEvidence }
  | { readonly kind: 'wait'; readonly evidence: ErbStatementEvidence }
  | { readonly kind: 'unsupported'; readonly reason: string; readonly evidence: ErbStatementEvidence };

export type ErbEntryKind =
  | 'commandEntry'
  | 'equipmentEntry'
  | 'rejectEntry'
  | 'eventEntry'
  | 'availabilityEntry'
  | 'subroutineEntry';

export interface ErbTrainingFlowEntry {
  readonly kind: ErbEntryKind;
  readonly name: string;
  readonly statements: readonly ErbFlowStatement[];
  readonly evidence: ErbStatementEvidence;
}

export interface ErbTrainingFlowIr {
  readonly schemaVersion: 'erb-training-flow-ir/v1';
  readonly commandId: string;
  readonly sourceFiles: readonly string[];
  readonly entries: readonly ErbTrainingFlowEntry[];
  readonly unresolved: ReadonlyArray<{
    readonly kind: 'unknownDomain' | 'unknownCall' | 'unsupportedSyntax' | 'missingMapping' | 'missingLowering';
    readonly message: string;
    readonly evidence: ErbStatementEvidence;
  }>;
}

export const ERB_STATE_DOMAINS: Partial<Record<string, ErbStateDomainDefinition>> = {
  ABL: {
    domain: 'ABL',
    residence: 'character',
    mutability: 'mutable',
    ownerPolicy: 'implicitTargetOrExplicitRole',
    lowering: 'needsAdapter',
    notes: 'Ability level on target/player/master/assistant. Bare ABL:n means implicit target.',
  },
  TALENT: {
    domain: 'TALENT',
    residence: 'character',
    mutability: 'mutable',
    ownerPolicy: 'implicitTargetOrExplicitRole',
    lowering: 'needsAdapter',
    notes: 'Character trait/talent flags. Bare TALENT:n means implicit target.',
  },
  EXP: {
    domain: 'EXP',
    residence: 'character',
    mutability: 'mutable',
    ownerPolicy: 'implicitTargetOrExplicitRole',
    lowering: 'needsAdapter',
    notes: 'Character experience counters. Writes can target player/assistant/master as well as target.',
  },
  PALAM: {
    domain: 'PALAM',
    residence: 'character',
    mutability: 'mutable',
    ownerPolicy: 'implicitTargetOrExplicitRole',
    lowering: 'needsAdapter',
    notes: 'Character parameter accumulators, usually written by SourceCheck.',
  },
  BASE: {
    domain: 'BASE',
    residence: 'character',
    mutability: 'mutable',
    ownerPolicy: 'implicitTargetOrExplicitRole',
    lowering: 'needsAdapter',
    notes: 'Current base values such as stamina. Direct player/master/assistant writes exist.',
  },
  MAXBASE: {
    domain: 'MAXBASE',
    residence: 'character',
    mutability: 'mutable',
    ownerPolicy: 'implicitTargetOrExplicitRole',
    lowering: 'needsAdapter',
    notes: 'Maximum base values. Used by ejaculation and tentacle/mode flows.',
  },
  MARK: {
    domain: 'MARK',
    residence: 'character',
    mutability: 'mutable',
    ownerPolicy: 'implicitTargetOrExplicitRole',
    lowering: 'needsAdapter',
    notes: 'Character mark levels used by formula gates and post effects.',
  },
  STAIN: {
    domain: 'STAIN',
    residence: 'character',
    mutability: 'mutable',
    ownerPolicy: 'implicitTargetOrExplicitRole',
    lowering: 'needsAdapter',
    notes: 'Character stain bitfields. Requires bitwise set/clear/merge semantics.',
  },
  CFLAG: {
    domain: 'CFLAG',
    residence: 'character',
    mutability: 'mutable',
    ownerPolicy: 'implicitTargetOrExplicitRole',
    lowering: 'needsAdapter',
    notes: 'Character flags. Bare CFLAG:n means implicit target; role-qualified writes exist.',
  },
  CSTR: {
    domain: 'CSTR',
    residence: 'character',
    mutability: 'mutable',
    ownerPolicy: 'implicitTargetOrExplicitRole',
    lowering: 'needsAdapter',
    notes: 'Character string state. Must be kept out of numeric effect lowering.',
  },
  RELATION: {
    domain: 'RELATION',
    residence: 'relationship',
    mutability: 'mutable',
    ownerPolicy: 'explicitRelationshipSubjectAndObject',
    lowering: 'needsAdapter',
    notes: 'Relationship value between subject role and another character id/expression.',
  },
  NO: {
    domain: 'NO',
    residence: 'character',
    mutability: 'readOnly',
    ownerPolicy: 'implicitTargetOrExplicitRole',
    lowering: 'readOnlyOnly',
    notes: 'Character numeric id lookup, e.g. NO:PLAYER.',
  },
  NAME: {
    domain: 'NAME',
    residence: 'character',
    mutability: 'readOnly',
    ownerPolicy: 'implicitTargetOrExplicitRole',
    lowering: 'readOnlyOnly',
    notes: 'Display name lookup.',
  },
  CALLNAME: {
    domain: 'CALLNAME',
    residence: 'character',
    mutability: 'readOnly',
    ownerPolicy: 'implicitTargetOrExplicitRole',
    lowering: 'readOnlyOnly',
    notes: 'Display call-name lookup.',
  },
  SOURCE: {
    domain: 'SOURCE',
    residence: 'commandSession',
    mutability: 'mutable',
    ownerPolicy: 'sessionScoped',
    lowering: 'existingEngine',
    notes: 'Command-local source buffer consumed by SourceCheck.',
  },
  LOSEBASE: {
    domain: 'LOSEBASE',
    residence: 'commandSession',
    mutability: 'mutable',
    ownerPolicy: 'sessionScoped',
    lowering: 'existingEngine',
    notes: 'Command-local base-loss buffer. It is not a direct character BASE write.',
  },
  UP: {
    domain: 'UP',
    residence: 'commandSession',
    mutability: 'mutable',
    ownerPolicy: 'sessionScoped',
    lowering: 'needsEngineCapability',
    notes: 'Legacy mode/pressure buffer used in tentacle-like flows.',
  },
  DOWN: {
    domain: 'DOWN',
    residence: 'commandSession',
    mutability: 'mutable',
    ownerPolicy: 'sessionScoped',
    lowering: 'needsEngineCapability',
    notes: 'Legacy negative/down buffer; reserved even when absent in the current COMF sample.',
  },
  JUEL: {
    domain: 'JUEL',
    residence: 'commandSession',
    mutability: 'mutable',
    ownerPolicy: 'sessionScoped',
    lowering: 'needsEngineCapability',
    notes: 'Legacy secretion/juice buffer; reserved for broader ERB coverage.',
  },
  TFLAG: {
    domain: 'TFLAG',
    residence: 'commandSession',
    mutability: 'mutable',
    ownerPolicy: 'sessionScoped',
    lowering: 'needsAdapter',
    notes: 'Training-session flags including previous trainer/chain state.',
  },
  TEQUIP: {
    domain: 'TEQUIP',
    residence: 'equipmentSession',
    mutability: 'mutable',
    ownerPolicy: 'sessionScoped',
    lowering: 'needsEngineCapability',
    notes: 'Equipped tools and legacy mode bridges. Not all TEQUIP values are ordinary equipment.',
  },
  SAVESTR: {
    domain: 'SAVESTR',
    residence: 'commandSession',
    mutability: 'mutable',
    ownerPolicy: 'sessionScoped',
    lowering: 'needsAdapter',
    notes: 'Legacy saved strings used for command labels/messages.',
  },
  FLAG: {
    domain: 'FLAG',
    residence: 'globalEnvironment',
    mutability: 'mutable',
    ownerPolicy: 'globalScoped',
    lowering: 'needsAdapter',
    notes: 'Global flags. Dynamic index expressions exist.',
  },
  ITEM: {
    domain: 'ITEM',
    residence: 'globalEnvironment',
    mutability: 'mutable',
    ownerPolicy: 'globalScoped',
    lowering: 'needsAdapter',
    notes: 'Global inventory/item counts.',
  },
  DAY: {
    domain: 'DAY',
    residence: 'globalEnvironment',
    mutability: 'readOnly',
    ownerPolicy: 'globalScoped',
    lowering: 'needsAdapter',
    notes: 'Calendar/day environment.',
  },
  TIME: {
    domain: 'TIME',
    residence: 'globalEnvironment',
    mutability: 'readOnly',
    ownerPolicy: 'globalScoped',
    lowering: 'needsAdapter',
    notes: 'Time environment.',
  },
  NOITEM: {
    domain: 'NOITEM',
    residence: 'globalEnvironment',
    mutability: 'readOnly',
    ownerPolicy: 'globalScoped',
    lowering: 'needsAdapter',
    notes: 'Legacy no-item/mode environment flag.',
  },
  RAND: {
    domain: 'RAND',
    residence: 'globalEnvironment',
    mutability: 'generated',
    ownerPolicy: 'globalScoped',
    lowering: 'needsAdapter',
    notes: 'Random number expression source. It must be captured as nondeterministic input.',
  },
  PALAMLV: {
    domain: 'PALAMLV',
    residence: 'lookup',
    mutability: 'readOnly',
    ownerPolicy: 'readOnlyLookup',
    lowering: 'readOnlyOnly',
    notes: 'PALAM level threshold table.',
  },
  EXPLV: {
    domain: 'EXPLV',
    residence: 'lookup',
    mutability: 'readOnly',
    ownerPolicy: 'readOnlyLookup',
    lowering: 'readOnlyOnly',
    notes: 'EXP level threshold table.',
  },
  TALENTNAME: {
    domain: 'TALENTNAME',
    residence: 'lookup',
    mutability: 'readOnly',
    ownerPolicy: 'readOnlyLookup',
    lowering: 'readOnlyOnly',
    notes: 'Display lookup.',
  },
  EXPNAME: {
    domain: 'EXPNAME',
    residence: 'lookup',
    mutability: 'readOnly',
    ownerPolicy: 'readOnlyLookup',
    lowering: 'readOnlyOnly',
    notes: 'Display lookup.',
  },
  ABLNAME: {
    domain: 'ABLNAME',
    residence: 'lookup',
    mutability: 'readOnly',
    ownerPolicy: 'readOnlyLookup',
    lowering: 'readOnlyOnly',
    notes: 'Display lookup.',
  },
  MARKNAME: {
    domain: 'MARKNAME',
    residence: 'lookup',
    mutability: 'readOnly',
    ownerPolicy: 'readOnlyLookup',
    lowering: 'readOnlyOnly',
    notes: 'Display lookup.',
  },
  PALAMNAME: {
    domain: 'PALAMNAME',
    residence: 'lookup',
    mutability: 'readOnly',
    ownerPolicy: 'readOnlyLookup',
    lowering: 'readOnlyOnly',
    notes: 'Display lookup.',
  },
  ITEMNAME: {
    domain: 'ITEMNAME',
    residence: 'lookup',
    mutability: 'readOnly',
    ownerPolicy: 'readOnlyLookup',
    lowering: 'readOnlyOnly',
    notes: 'Display lookup.',
  },
  LOCAL: {
    domain: 'LOCAL',
    residence: 'localScratch',
    mutability: 'mutable',
    ownerPolicy: 'localScoped',
    lowering: 'structuredIr',
    notes: 'Legacy local scratch array.',
  } as ErbStateDomainDefinition & { lowering: 'structuredIr' },
  T: {
    domain: 'T',
    residence: 'localScratch',
    mutability: 'mutable',
    ownerPolicy: 'localScoped',
    lowering: 'structuredIr',
    notes: 'Legacy local scratch array used by clothing commands.',
  } as ErbStateDomainDefinition & { lowering: 'structuredIr' },
  W: {
    domain: 'W',
    residence: 'localScratch',
    mutability: 'mutable',
    ownerPolicy: 'localScoped',
    lowering: 'structuredIr',
    notes: 'Legacy local scratch array used by clothing commands.',
  } as ErbStateDomainDefinition & { lowering: 'structuredIr' },
  L: {
    domain: 'L',
    residence: 'localScratch',
    mutability: 'mutable',
    ownerPolicy: 'localScoped',
    lowering: 'structuredIr',
    notes: 'Legacy local scratch array used by clothing commands.',
  } as ErbStateDomainDefinition & { lowering: 'structuredIr' },
};

export const ERB_SESSION_VARIABLES = new Set([
  'ASSIPLAY',
  'ASSI',
  'MASTER',
  'PLAYER',
  'TARGET',
  'PREVCOM',
  'SELECTCOM',
  'RESULT',
  'RESULTS',
  'NOITEM',
  'TIME',
]);

export const ERB_ROLE_NAMES = new Set(['TARGET', 'PLAYER', 'MASTER', 'ASSI']);

export const ERB_FLOW_CONSTRUCTS: Record<string, ErbFlowConstructDefinition> = {
  IF: { construct: 'IF', lowering: 'structuredIr', notes: 'Structured conditional branch.' },
  ELSEIF: { construct: 'ELSEIF', lowering: 'structuredIr', notes: 'Structured conditional branch.' },
  ELSE: { construct: 'ELSE', lowering: 'structuredIr', notes: 'Structured conditional branch.' },
  ENDIF: { construct: 'ENDIF', lowering: 'structuredIr', notes: 'Structured conditional branch.' },
  SIF: { construct: 'SIF', lowering: 'structuredIr', notes: 'Single-line conditional.' },
  RETURN: { construct: 'RETURN', lowering: 'structuredIr', notes: 'Command/subroutine return.' },
  TIMES: { construct: 'TIMES', lowering: 'structuredIr', notes: 'Legacy multiply mutator; equivalent to assignment.' },
  CALL: { construct: 'CALL', lowering: 'structuredIr', notes: 'Captured as a call statement; target policy decides lowering.' },
  JUMP: { construct: 'JUMP', lowering: 'needsEngineCapability', notes: 'Can lower to remap only for simple command jumps.' },
  GOTO: { construct: 'GOTO', lowering: 'needsEngineCapability', notes: 'Requires structured loop/input lowering.' },
  INPUT: { construct: 'INPUT', lowering: 'needsEngineCapability', notes: 'Requires non-boolean command decision/input provider.' },
  WAIT: { construct: 'WAIT', lowering: 'needsEngineCapability', notes: 'UI pacing, not a training effect.' },
  PRINT: { construct: 'PRINT', lowering: 'structuredIr', notes: 'Message/output statement.' },
  SELECTCASE: { construct: 'SELECTCASE', lowering: 'needsEngineCapability', notes: 'Menu/multi-branch input flow.' },
  CASE: { construct: 'CASE', lowering: 'needsEngineCapability', notes: 'Menu/multi-branch input flow.' },
  ENDSELECT: { construct: 'ENDSELECT', lowering: 'needsEngineCapability', notes: 'Menu/multi-branch input flow.' },
  REPEAT: { construct: 'REPEAT', lowering: 'structuredIr', notes: 'Loop construct.' },
  REND: { construct: 'REND', lowering: 'structuredIr', notes: 'Loop construct.' },
  FOR: { construct: 'FOR', lowering: 'structuredIr', notes: 'Loop construct.' },
  NEXT: { construct: 'NEXT', lowering: 'structuredIr', notes: 'Loop construct.' },
  WHILE: { construct: 'WHILE', lowering: 'structuredIr', notes: 'Loop construct.' },
  WEND: { construct: 'WEND', lowering: 'structuredIr', notes: 'Loop construct.' },
};

export const ERB_CALL_POLICIES: readonly ErbCallPolicyDefinition[] = [
  {
    pattern: /^TRAIN_MESSAGE_B$/,
    kind: 'message',
    lowering: 'existingEngine',
    notes: 'Standard command message helper.',
  },
  {
    pattern: /^COM_ORDER$/,
    kind: 'formulaGate',
    lowering: 'needsHelperCatalog',
    notes: 'Reusable order formula gate.',
  },
  {
    pattern: /^COM_ABLE\d+$/,
    kind: 'availability',
    lowering: 'needsHelperCatalog',
    notes: 'Availability helper returning RESULT.',
  },
  {
    pattern: /^COM\d+_ABLE\d+[A-Z]?$/,
    kind: 'availability',
    lowering: 'needsHelperCatalog',
    notes: 'Command-local availability helper returning RESULT.',
  },
  {
    pattern: /^CONFIRM_/,
    kind: 'confirmation',
    lowering: 'needsEngineCapability',
    notes: 'User decision helper returning RESULT.',
  },
  {
    pattern: /^COM_EJAC_|^COM_AFTER_/,
    kind: 'postEffect',
    lowering: 'needsHelperCatalog',
    notes: 'Domain post-effect helper.',
  },
  {
    pattern: /^PRINT_|^WEARING_/,
    kind: 'interactiveDisplay',
    lowering: 'needsEngineCapability',
    notes: 'Display/helper flow, often writes RESULT.',
  },
  {
    pattern: /^EVENT_|^INCEST$|^SOILING_|^SYOKUSYU_/,
    kind: 'domainEffect',
    lowering: 'needsHelperCatalog',
    notes: 'Domain-specific event/effect helper.',
  },
];

export interface ModelExample {
  readonly file: string;
  readonly line: number;
  readonly raw: string;
}

interface CounterRecord {
  count: number;
  examples: ModelExample[];
}

interface RefHit {
  domain: string;
  role?: string;
  index: string;
  file: string;
  line: number;
  raw: string;
}

export interface ErbTrainingModelAudit {
  readonly schemaVersion: 'erb-training-model-audit/v1';
  readonly modelVersion: 'erb-training-model/v1';
  readonly sourceRoot: string;
  readonly fileCount: number;
  readonly domainCoverage: {
    readonly modeled: number;
    readonly unmodeled: number;
    readonly domains: Array<{
      readonly domain: string;
      readonly count: number;
      readonly residence: ErbModelResidence | 'unmodeled';
      readonly mutability: ErbModelMutability | 'unmodeled';
      readonly ownerPolicy: ErbModelOwnerPolicy | 'unmodeled';
      readonly lowering: string;
      readonly examples: readonly ModelExample[];
    }>;
  };
  readonly roleCoverage: Array<{
    readonly role: string;
    readonly count: number;
    readonly examples: readonly ModelExample[];
  }>;
  readonly dynamicIndexRefs: Array<RefHit>;
  readonly sessionVariableCoverage: Array<{
    readonly variable: string;
    readonly count: number;
    readonly examples: readonly ModelExample[];
  }>;
  readonly scalarLocalCoverage: Array<{
    readonly variable: string;
    readonly count: number;
    readonly examples: readonly ModelExample[];
  }>;
  readonly mutationOperators: Array<{
    readonly operator: string;
    readonly count: number;
    readonly examples: readonly ModelExample[];
  }>;
  readonly flowCoverage: Array<{
    readonly construct: string;
    readonly count: number;
    readonly lowering: string;
    readonly examples: readonly ModelExample[];
  }>;
  readonly callCoverage: {
    readonly targetCount: number;
    readonly unclassifiedTargetCount: number;
    readonly targets: Array<{
      readonly target: string;
      readonly count: number;
      readonly kind: string;
      readonly lowering: string;
      readonly examples: readonly ModelExample[];
    }>;
  };
  readonly entryCoverage: Array<{
    readonly kind: string;
    readonly count: number;
    readonly examples: readonly ModelExample[];
  }>;
  readonly fileBlockers: Record<string, string[]>;
  readonly verdict: {
    readonly losslessExtractionModel: 'covered' | 'blocked';
    readonly existingEngineLowering: 'covered' | 'blocked';
    readonly blockers: string[];
  };
}

function pushCounter(map: Map<string, CounterRecord>, key: string, example: ModelExample): void {
  const current = map.get(key) ?? { count: 0, examples: [] };
  current.count += 1;
  if (current.examples.length < 5) current.examples.push(example);
  map.set(key, current);
}

function sortedCounter(map: Map<string, CounterRecord>): Array<[string, CounterRecord]> {
  return [...map.entries()].sort((left, right) => right[1].count - left[1].count || left[0].localeCompare(right[0]));
}

function stripComment(line: string): string {
  return line.replace(/;.*$/, '');
}

function entryKind(entry: string): string {
  if (/^COM\d+$/.test(entry)) return 'commandEntry';
  if (/^EQUIP_/.test(entry)) return 'equipmentEntry';
  if (/^REJECT_/.test(entry)) return 'rejectEntry';
  if (/^EVENT_/.test(entry)) return 'eventEntry';
  if (/^COM_ABLE/.test(entry)) return 'availabilityEntry';
  return 'subroutineEntry';
}

function classifyCall(target: string): { kind: string; lowering: string } {
  const policy = ERB_CALL_POLICIES.find((entry) => entry.pattern.test(target));
  return policy
    ? { kind: policy.kind, lowering: policy.lowering }
    : { kind: 'unknownHelper', lowering: 'manualDesign' };
}

function addFileBlocker(blockers: Map<string, Set<string>>, file: string, blocker: string): void {
  const current = blockers.get(file) ?? new Set<string>();
  current.add(blocker);
  blockers.set(file, current);
}

function isDynamicIndex(index: string): boolean {
  return !/^\d+$/.test(index);
}

function isRoleOnlyLookup(domain: string, role: string | undefined, index: string): boolean {
  return role === undefined && ERB_ROLE_NAMES.has(index) && ['NO', 'NAME', 'CALLNAME'].includes(domain);
}

function defaultSourceRoot(webPortRoot: string): string {
  return path.resolve(webPortRoot, '..', 'original-game', 'ERB', '指導関係');
}

export function auditErbTrainingModel(options: { webPortRoot: string; sourceRoot?: string }): ErbTrainingModelAudit {
  const sourceRoot = options.sourceRoot ? path.resolve(options.sourceRoot) : defaultSourceRoot(options.webPortRoot);
  const files = fs.readdirSync(sourceRoot)
    .filter((file) => /^COMF.*\.ERB$/i.test(file))
    .sort((left, right) => left.localeCompare(right));

  const domains = new Map<string, CounterRecord>();
  const roles = new Map<string, CounterRecord>();
  const sessionVariables = new Map<string, CounterRecord>();
  const scalarLocals = new Map<string, CounterRecord>();
  const operators = new Map<string, CounterRecord>();
  const flows = new Map<string, CounterRecord>();
  const calls = new Map<string, CounterRecord>();
  const entries = new Map<string, CounterRecord>();
  const dynamicIndexRefs: RefHit[] = [];
  const fileBlockers = new Map<string, Set<string>>();

  const refPattern = /\b([A-Z][A-Z0-9_]*)(?::([A-Z][A-Z0-9_]*))?:(\([^)]*\)|\{[^}]+\}|[A-Z][A-Z0-9_]*|\d+)/g;
  const flowPattern = /^\s*(IF|ELSEIF|ELSE|ENDIF|SIF|SELECTCASE|CASE|ENDSELECT|CALL|CALLFORM|TRYCCALLFORM|RETURN|JUMP|GOTO|INPUT|WAIT|TIMES|REPEAT|REND|FOR|NEXT|WHILE|WEND)\b/;
  const callPattern = /^\s*(?:TRYCCALLFORM|CALLFORM|CALL)\s+([A-Z0-9_{}]+)/;
  const assignmentPattern = /^\s*([A-Z][A-Z0-9_]*(?::[A-Z0-9_(){}]+){0,2})\s*(\+=|-=|\*=|\/=|\|=|=)\s*/;
  const scalarLocalPattern = /^\s*([A-Z][A-Z0-9_]*)\s*(?:\+=|-=|\*=|\/=|\|=|=)\s*/;
  const entryPattern = /^\s*@([A-Z0-9_]+)/;
  const printPattern = /^\s*PRINT[A-Z]*\b/;

  for (const file of files) {
    const fullPath = path.join(sourceRoot, file);
    const lines = fs.readFileSync(fullPath, 'utf-8').split(/\r?\n/);
    lines.forEach((raw, index) => {
      const lineNumber = index + 1;
      const line = stripComment(raw);
      if (line.trim().length === 0) return;

      const example = { file, line: lineNumber, raw: raw.trim() };

      const entryMatch = line.match(entryPattern);
      if (entryMatch) {
        const kind = entryKind(entryMatch[1]);
        pushCounter(entries, kind, example);
        if (kind !== 'commandEntry') addFileBlocker(fileBlockers, file, kind);
      }

      let refMatch: RegExpExecArray | null;
      refPattern.lastIndex = 0;
      while ((refMatch = refPattern.exec(line)) !== null) {
        const domain = refMatch[1];
        const role = refMatch[2];
        const indexValue = refMatch[3];
        pushCounter(domains, domain, example);
        if (role) pushCounter(roles, role, example);
        if (isRoleOnlyLookup(domain, role, indexValue)) {
          pushCounter(roles, indexValue, example);
        } else if (isDynamicIndex(indexValue)) {
          dynamicIndexRefs.push({
            domain,
            role,
            index: indexValue,
            file,
            line: lineNumber,
            raw: raw.trim(),
          });
          addFileBlocker(fileBlockers, file, 'dynamicIndexRef');
        }
      }

      for (const variable of ERB_SESSION_VARIABLES) {
        if (new RegExp(`\\b${variable}\\b`).test(line)) {
          pushCounter(sessionVariables, variable, example);
        }
      }

      const isPrintLine = printPattern.test(line);
      const assignmentMatch = isPrintLine ? null : line.match(assignmentPattern);
      if (assignmentMatch) {
        pushCounter(operators, assignmentMatch[2], example);
      }

      const scalarMatch = isPrintLine ? null : line.match(scalarLocalPattern);
      if (scalarMatch) {
        const variable = scalarMatch[1];
        if (!ERB_ROLE_NAMES.has(variable) && !ERB_SESSION_VARIABLES.has(variable) && !ERB_STATE_DOMAINS[variable]) {
          pushCounter(scalarLocals, variable, example);
        }
        if (ERB_ROLE_NAMES.has(variable)) {
          addFileBlocker(fileBlockers, file, 'roleRebinding');
        }
      }

      const flowMatch = line.match(flowPattern);
      if (flowMatch) {
        const construct = flowMatch[1] === 'TRYCCALLFORM' || flowMatch[1] === 'CALLFORM' ? 'CALLFORM' : flowMatch[1];
        pushCounter(flows, construct, example);
        const definition = ERB_FLOW_CONSTRUCTS[construct];
        if (definition?.lowering === 'needsEngineCapability') addFileBlocker(fileBlockers, file, `${construct.toLowerCase()}Flow`);
      }
      if (isPrintLine) {
        pushCounter(flows, 'PRINT', example);
      }

      const callMatch = line.match(callPattern);
      if (callMatch) {
        const target = callMatch[1];
        pushCounter(calls, target, example);
        const policy = classifyCall(target);
        if (policy.lowering !== 'existingEngine') addFileBlocker(fileBlockers, file, `call:${policy.kind}`);
      }
    });
  }

  const domainRows = sortedCounter(domains).map(([domain, record]) => {
    const definition = ERB_STATE_DOMAINS[domain];
    const residence: ErbModelResidence | 'unmodeled' = definition?.residence ?? 'unmodeled';
    const mutability: ErbModelMutability | 'unmodeled' = definition?.mutability ?? 'unmodeled';
    const ownerPolicy: ErbModelOwnerPolicy | 'unmodeled' = definition?.ownerPolicy ?? 'unmodeled';
    return {
      domain,
      count: record.count,
      residence,
      mutability,
      ownerPolicy,
      lowering: definition?.lowering ?? 'unmodeled',
      examples: record.examples,
    };
  });
  const unmodeledDomains = domainRows.filter((row) => row.residence === 'unmodeled');

  const callRows = sortedCounter(calls).map(([target, record]) => {
    const policy = classifyCall(target);
    return {
      target,
      count: record.count,
      kind: policy.kind,
      lowering: policy.lowering,
      examples: record.examples,
    };
  });
  const unclassifiedCalls = callRows.filter((row) => row.kind === 'unknownHelper');

  const blockers = [
    ...(unmodeledDomains.length > 0 ? [`Unmodeled state domains: ${unmodeledDomains.map((row) => row.domain).join(', ')}`] : []),
    ...(unclassifiedCalls.length > 0 ? [`Unclassified helper calls: ${unclassifiedCalls.map((row) => row.target).join(', ')}`] : []),
    ...(dynamicIndexRefs.length > 0 ? ['Dynamic index refs require expression-capable state refs.'] : []),
    ...(fileBlockers.size > 0 ? ['Some files require engine capabilities beyond static command slots.'] : []),
  ];

  return {
    schemaVersion: 'erb-training-model-audit/v1',
    modelVersion: 'erb-training-model/v1',
    sourceRoot,
    fileCount: files.length,
    domainCoverage: {
      modeled: domainRows.length - unmodeledDomains.length,
      unmodeled: unmodeledDomains.length,
      domains: domainRows,
    },
    roleCoverage: sortedCounter(roles).map(([role, record]) => ({
      role,
      count: record.count,
      examples: record.examples,
    })),
    dynamicIndexRefs,
    sessionVariableCoverage: sortedCounter(sessionVariables).map(([variable, record]) => ({
      variable,
      count: record.count,
      examples: record.examples,
    })),
    scalarLocalCoverage: sortedCounter(scalarLocals).map(([variable, record]) => ({
      variable,
      count: record.count,
      examples: record.examples,
    })),
    mutationOperators: sortedCounter(operators).map(([operator, record]) => ({
      operator,
      count: record.count,
      examples: record.examples,
    })),
    flowCoverage: sortedCounter(flows).map(([construct, record]) => ({
      construct,
      count: record.count,
      lowering: ERB_FLOW_CONSTRUCTS[construct]?.lowering ?? 'unmodeled',
      examples: record.examples,
    })),
    callCoverage: {
      targetCount: callRows.length,
      unclassifiedTargetCount: unclassifiedCalls.length,
      targets: callRows,
    },
    entryCoverage: sortedCounter(entries).map(([kind, record]) => ({
      kind,
      count: record.count,
      examples: record.examples,
    })),
    fileBlockers: Object.fromEntries(
      [...fileBlockers.entries()]
        .sort((left, right) => left[0].localeCompare(right[0]))
        .map(([file, values]) => [file, [...values].sort((left, right) => left.localeCompare(right))]),
    ),
    verdict: {
      losslessExtractionModel: unmodeledDomains.length === 0 ? 'covered' : 'blocked',
      existingEngineLowering: fileBlockers.size === 0 && unclassifiedCalls.length === 0 ? 'covered' : 'blocked',
      blockers,
    },
  };
}
