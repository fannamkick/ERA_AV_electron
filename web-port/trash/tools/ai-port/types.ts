export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue };

export type Confidence = 'canonical' | 'temporary' | 'conflicted' | 'unsafe';
export type FamilyStatus = 'blocked' | 'design-ready' | 'migration-ready' | 'verified' | 'unknown';
export type AutopilotClassification =
  | 'approval-candidate'
  | 'draft-only'
  | 'report-only'
  | 'blocked'
  | 'failed';

export interface LegacyReference {
  file: string;
  symbol?: string;
  confidence: Confidence;
  notes?: string;
}

export interface WorkerConflict {
  area: 'availability' | 'source' | 'effects' | 'chain' | 'state' | 'messages' | 'unknown';
  sources: LegacyReference[];
  decisionNeeded: string;
  blocksMigration: boolean;
}

export interface WorkerReport {
  schemaVersion: 'training-worker-report/v1';
  command: {
    id: string;
    originalId: number;
    name?: string;
  };
  category: string;
  canonicalDecision: {
    availability?: LegacyReference;
    sourceFormula?: LegacyReference;
    directEffects?: LegacyReference;
    sideEffects?: LegacyReference;
    chainRemap?: LegacyReference;
    messages?: LegacyReference;
  };
  availability: {
    hardBlockers: JsonValue[];
    formulaGates: JsonValue[];
    unresolvedConflicts: WorkerConflict[];
  };
  sourceFormula: {
    writes: JsonValue[];
    modifiers: JsonValue[];
    rounding: 'none' | 'floor' | 'ceil' | 'round' | string;
    indexPolicy: 'named-key' | 'numeric-index' | 'mixed' | string;
    unresolvedConflicts: WorkerConflict[];
  };
  sideEffects: {
    effects: JsonValue[];
    postEffects: JsonValue[];
    messages: JsonValue[];
  };
  chainRemap: {
    dependencies: JsonValue[];
    unresolvedConflicts: WorkerConflict[];
  };
  engineGaps: {
    conditionPredicatesNeeded: string[];
    effectTypesNeeded: string[];
    phaseHooksNeeded: string[];
    stateAdapterFieldsNeeded: string[];
  };
  validationScenarios: JsonValue[];
  notes?: string[];
}

export type WorkerReportShardArea = 'availability' | 'sourceFormula' | 'sideEffects' | 'engineGaps';

export interface WorkerReportShard {
  schemaVersion: 'training-worker-report-shard/v1';
  command: {
    id: string;
    originalId: number;
    name?: string;
  };
  area: WorkerReportShardArea;
  checklist?: {
    completed: string[];
    missing: string[];
    conflictsRecorded: string[];
  };
  canonicalDecision?: Partial<WorkerReport['canonicalDecision']>;
  availability?: WorkerReport['availability'];
  sourceFormula?: WorkerReport['sourceFormula'];
  sideEffects?: WorkerReport['sideEffects'];
  chainRemap?: WorkerReport['chainRemap'];
  engineGaps?: WorkerReport['engineGaps'];
  validationScenarios?: JsonValue[];
  unresolvedConflicts?: WorkerConflict[];
  notes?: string[];
}

export interface DraftFile {
  path: string;
  operation: 'create' | 'update';
  content: string;
  reason: string;
}

export interface CommandDraft {
  schemaVersion: 'training-command-draft/v1';
  commandId: string;
  sourceReport: string;
  files: DraftFile[];
  requiredChecks: string[];
  unresolvedConflicts: WorkerConflict[];
  notes?: string[];
}

export interface AiReview {
  schemaVersion: 'ai-port-review/v1';
  approved: boolean;
  riskLevel: 'low' | 'medium' | 'high';
  findings: Array<{
    severity: 'info' | 'warning' | 'error';
    area: string;
    message: string;
  }>;
  missingEvidence: string[];
  suggestedFixes: string[];
}

export type ErbFactConfidence = 'canonical' | 'inferred' | 'uncertain' | 'unparsed';

export interface ErbSourceFile {
  path: string;
  kind: 'command-erb' | 'comable-erb';
  lineStart: number;
  lineEnd: number;
}

export interface ErbFactRow {
  id: string;
  file: string;
  lineStart: number;
  lineEnd: number;
  raw: string;
  summary: string;
  target?: string | null;
  domain?: string | null;
  index?: number | null;
  key?: string | null;
  operation?: string | null;
  value?: JsonValue;
  condition?: string | null;
  phase?: string | null;
  mustImplement: boolean;
  confidence: ErbFactConfidence;
}

export interface ErbUnparsedLine {
  file: string;
  lineStart: number;
  lineEnd: number;
  raw: string;
  reason: string;
  mayAffectBehavior: boolean;
}

export interface ErbCommandFacts {
  schemaVersion: 'erb-command-facts/v1';
  command: {
    id: string;
    originalId: number;
    name?: string;
  };
  sourceFiles: ErbSourceFile[];
  availability: ErbFactRow[];
  sourceWrites: ErbFactRow[];
  baseWrites: ErbFactRow[];
  loseBaseWrites: ErbFactRow[];
  expWrites: ErbFactRow[];
  flagWrites: ErbFactRow[];
  equipmentWrites: ErbFactRow[];
  stainWrites: ErbFactRow[];
  formulaGates: ErbFactRow[];
  calls: ErbFactRow[];
  earlyReturns: ErbFactRow[];
  messages: ErbFactRow[];
  unparsedLines: ErbUnparsedLine[];
  notes?: string[];
}

export interface ErbFactReview {
  schemaVersion: 'erb-fact-review/v1';
  approved: boolean;
  riskLevel: 'low' | 'medium' | 'high';
  findings: Array<{
    severity: 'info' | 'warning' | 'error';
    area: string;
    message: string;
  }>;
  missingFacts: string[];
  suggestedFixes: string[];
}

export type ErbIrDomain =
  | 'ABL'
  | 'TALENT'
  | 'TEQUIP'
  | 'CFLAG'
  | 'TFLAG'
  | 'FLAG'
  | 'SOURCE'
  | 'EXP'
  | 'PALAM'
  | 'LOSEBASE'
  | 'BASE'
  | 'STAIN'
  | 'MARK'
  | 'ITEM';

export interface ErbIrEvidence {
  file: string;
  lineStart: number;
  lineEnd: number;
  raw: string;
}

export interface ErbIrRef {
  domain: ErbIrDomain;
  index: number;
  role?: 'target' | 'trainer' | 'assistant' | 'master' | 'player' | 'global';
}

export type ErbIrCompareOp = 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte';

export type ErbIrCondition =
  | {
      kind: 'statCompare';
      ref: ErbIrRef;
      op: ErbIrCompareOp;
      value: number | ErbIrNumericValue;
    }
  | {
      kind: 'statBit';
      ref: ErbIrRef;
      op: 'any' | 'all' | 'none';
      mask: number;
    }
  | {
      kind: 'all' | 'any';
      conditions: ErbIrCondition[];
    }
  | {
      kind: 'not';
      condition: ErbIrCondition;
    }
  | {
      kind: 'tag';
      tag: string;
      present: boolean;
    };

export type ErbIrNumericValue =
  | { kind: 'literal'; value: number }
  | { kind: 'levelThreshold'; domain: 'PALAMLV' | 'EXPLV'; level: number }
  | { kind: 'table'; by: ErbIrRef; values: number[]; clamp?: boolean }
  | { kind: 'conditional'; cases: Array<{ when: ErbIrCondition; value: ErbIrNumericValue }>; otherwise?: ErbIrNumericValue }
  | { kind: 'stat'; ref: ErbIrRef }
  | { kind: 'binary'; op: 'add' | 'subtract' | 'multiply' | 'divide'; left: ErbIrNumericValue; right: ErbIrNumericValue };

export type ErbIrFormulaFailWhen =
  | { kind: 'scoreBelowThreshold' }
  | { kind: 'condition'; condition: ErbIrCondition };

export interface ErbIrBaseOperation {
  id: string;
  evidence: ErbIrEvidence;
  note?: string;
}

export type ErbIrOperation =
  | (ErbIrBaseOperation & { kind: 'requirement'; condition: ErbIrCondition })
  | (ErbIrBaseOperation & {
      kind: 'formulaGate';
      threshold: ErbIrNumericValue;
      thresholdModifiers?: Array<{ when: ErbIrCondition; delta: number }>;
      terms: Array<{
        id: string;
        value: ErbIrNumericValue;
        when?: ErbIrCondition;
        label?: string;
      }>;
      failWhen: ErbIrFormulaFailWhen;
      autoPassWhen?: ErbIrCondition;
    })
  | (ErbIrBaseOperation & { kind: 'sourceSet' | 'sourceAdd' | 'sourceMultiply'; target: ErbIrRef; value: ErbIrNumericValue; when?: ErbIrCondition })
  | (ErbIrBaseOperation & { kind: 'loseBaseAdd' | 'baseAdd' | 'expAdd'; target: ErbIrRef; value: ErbIrNumericValue; when?: ErbIrCondition })
  | (ErbIrBaseOperation & { kind: 'flagSet'; target: ErbIrRef; value: ErbIrNumericValue; when?: ErbIrCondition })
  | (ErbIrBaseOperation & { kind: 'stainMerge'; from: ErbIrRef; to: ErbIrRef; mode: 'bidirectional' | 'fromTo' | 'toFrom'; when?: ErbIrCondition })
  | (ErbIrBaseOperation & { kind: 'stainSetBits' | 'stainClearBits'; target: ErbIrRef; mask: number; when?: ErbIrCondition })
  | (ErbIrBaseOperation & { kind: 'phaseSkip'; phase: 'postEffects'; when: ErbIrCondition })
  | (ErbIrBaseOperation & { kind: 'returnSuccess' | 'returnFailure'; when?: ErbIrCondition })
  | (ErbIrBaseOperation & { kind: 'message'; text: string; when?: ErbIrCondition; behaviorAffecting: boolean })
  | (ErbIrBaseOperation & { kind: 'unsupported'; reason: string });

export interface ErbCommandIr {
  schemaVersion: 'erb-command-ir/v1';
  command: {
    id: string;
    originalId: number;
    name?: string;
    category?: string;
  };
  sourceFiles: ErbSourceFile[];
  operations: ErbIrOperation[];
  notes?: string[];
}

export interface ValidationResult {
  ok: boolean;
  errors: string[];
  warnings: string[];
}

export interface AiPortTiming {
  stage: string;
  title?: string;
  model: string;
  ok: boolean;
  requestChars: number;
  responseChars?: number;
  contentChars?: number;
  fetchMs: number;
  responseParseMs?: number;
  contentParseMs?: number;
  totalMs: number;
  finishReason?: string;
  nativeFinishReason?: string;
  promptTokens?: number;
  completionTokens?: number;
  reasoningTokens?: number;
  totalTokens?: number;
  error?: string;
}

export interface AutopilotResult {
  schemaVersion: 'ai-port-autopilot-result/v1';
  commandId: string;
  familyStatus: FamilyStatus;
  classification: AutopilotClassification;
  reportPath?: string;
  draftPath?: string;
  reviewPath?: string;
  appliedPaths?: string[];
  localValidation: ValidationResult;
  gateReasons: string[];
  timings?: AiPortTiming[];
}

export interface EvidenceFile {
  path: string;
  content: string;
  truncated: boolean;
  originalPath?: string;
  range?: {
    startLine: number;
    endLine: number;
  };
}

export interface EvidenceBundle {
  commandId: string;
  commandNumber: number;
  mode?: 'full' | 'sliced';
  files: EvidenceFile[];
}
