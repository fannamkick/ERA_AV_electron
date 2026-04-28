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
