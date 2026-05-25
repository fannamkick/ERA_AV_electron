import type {
  AiReview,
  CommandDraft,
  LegacyReference,
  ValidationResult,
  WorkerConflict,
  WorkerReport,
  WorkerReportShard,
  WorkerReportShardArea,
} from '../types';
import * as ts from 'typescript';

function isObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function pushIfMissing(errors: string[], condition: unknown, message: string): void {
  if (!condition) errors.push(message);
}

function hasBlockingConflict(conflicts: readonly WorkerConflict[] | undefined): boolean {
  return (conflicts ?? []).some((conflict) => {
    const record = conflict as unknown as Record<string, unknown>;
    return conflict.blocksMigration === true ||
      record.blocking === true ||
      ['blocking', 'blocker', 'blocked'].includes(String(record.severity ?? '').toLowerCase());
  });
}

function collectConflicts(report: Partial<WorkerReport>): WorkerConflict[] {
  const dynamicReport = report as unknown as {
    sideEffects?: { unresolvedConflicts?: WorkerConflict[] };
    unresolvedConflicts?: WorkerConflict[];
  };
  return [
    ...(report.availability?.unresolvedConflicts ?? []),
    ...(report.sourceFormula?.unresolvedConflicts ?? []),
    ...(report.chainRemap?.unresolvedConflicts ?? []),
    ...(dynamicReport.sideEffects?.unresolvedConflicts ?? []),
    ...(dynamicReport.unresolvedConflicts ?? []),
  ];
}

function includesGeneratedAndImproved(report: Partial<WorkerReport>): boolean {
  const refs = Object.values(report.canonicalDecision ?? {})
    .filter((ref): ref is LegacyReference => Boolean(ref));
  const canonicalFiles = refs
    .filter((ref) => ref.confidence === 'canonical' && typeof ref.file === 'string')
    .map((ref) => String(ref.file));
  return canonicalFiles.some((file) => file.includes('/commands/commands/') || file.includes('\\commands\\commands\\')) &&
    canonicalFiles.some((file) => file.includes('/commands/improved/') || file.includes('\\commands\\improved\\'));
}

function reportHasConcreteSourceEvidence(report: Partial<WorkerReport>): boolean {
  const writes = report.sourceFormula?.writes ?? [];
  if (writes.length === 0) return true;
  return writes.every((write) => {
    if (!isObject(write)) return false;
    if (typeof write.sourceIndex !== 'number') return false;
    const evidence = write.evidence;
    if (!isObject(evidence)) return false;
    return typeof evidence.file === 'string' && typeof evidence.symbol === 'string';
  });
}

function hasVagueExpectedValues(report: Partial<WorkerReport>): boolean {
  return JSON.stringify(report.validationScenarios ?? []).match(
    /calculated with modifiers|source values calculated|effects? gained|shown/i,
  ) !== null;
}

function typeScriptSyntaxErrors(fileName: string, content: string): string[] {
  if (!/\.[cm]?tsx?$/.test(fileName)) return [];

  const result = ts.transpileModule(content, {
    fileName,
    reportDiagnostics: true,
    compilerOptions: {
      target: ts.ScriptTarget.ES2020,
      module: ts.ModuleKind.ESNext,
      jsx: ts.JsxEmit.ReactJSX,
    },
  });

  return (result.diagnostics ?? [])
    .filter((diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error)
    .map((diagnostic) => {
      const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
      const position = diagnostic.file && diagnostic.start !== undefined
        ? diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start)
        : undefined;
      return position
        ? `${fileName}:${position.line + 1}:${position.character + 1} ${message}`
        : `${fileName}: ${message}`;
    });
}

const REQUIRED_SHARD_CHECKS: Record<WorkerReportShardArea, string[]> = {
  availability: [
    'identity.command-id-checked',
    'identity.original-id-checked',
    'canonical.generated-command-file-checked',
    'canonical.improved-command-file-checked',
    'canonical.conflicts-recorded-or-ruled-out',
    'availability.central-availability-checked',
    'availability.command-availability-checked',
    'availability.command-local-availability-checked',
    'availability.gender-gates-listed',
    'availability.clothing-gates-listed',
    'availability.equipment-gates-listed',
    'availability.formula-gates-listed',
    'availability.disagreements-recorded',
  ],
  sourceFormula: [
    'identity.command-id-checked',
    'identity.original-id-checked',
    'canonical.generated-command-file-checked',
    'canonical.improved-command-file-checked',
    'canonical.conflicts-recorded-or-ruled-out',
    'source.generated-source-writes-listed',
    'source.improved-source-writes-listed',
    'source.source-index-map-checked',
    'source.index-disagreements-recorded',
    'source.modifiers-listed',
    'source.rounding-policy-checked',
    'source.base-vs-losebase-conflict-checked',
  ],
  sideEffects: [
    'identity.command-id-checked',
    'identity.original-id-checked',
    'canonical.generated-command-file-checked',
    'canonical.improved-command-file-checked',
    'canonical.conflicts-recorded-or-ruled-out',
    'effects.direct-effects-listed',
    'effects.post-effects-listed',
    'effects.exp-effects-listed',
    'effects.stain-effects-listed',
    'effects.flag-effects-listed',
    'effects.messages-classified',
    'effects.chain-remap-checked',
    'effects.phase-order-checked',
    'effects.base-vs-losebase-conflict-recorded',
  ],
  engineGaps: [
    'identity.command-id-checked',
    'identity.original-id-checked',
    'canonical.generated-command-file-checked',
    'canonical.improved-command-file-checked',
    'canonical.conflicts-recorded-or-ruled-out',
    'gaps.condition-predicates-checked',
    'gaps.effect-types-checked',
    'gaps.phase-hooks-checked',
    'gaps.state-adapters-checked',
    'gaps.design-ready-blockers-listed',
  ],
};

function canonicalDecisionLooksLikeReferenceMap(value: unknown): boolean {
  if (!isObject(value)) return false;
  return Object.values(value).every((entry) => {
    if (!entry) return true;
    if (!isObject(entry)) return false;
    return typeof entry.file === 'string' &&
      typeof entry.confidence === 'string' &&
      !Array.isArray(entry);
  });
}

function isBooleanLike(value: unknown): boolean {
  if (typeof value === 'boolean') return true;
  if (typeof value === 'number') return value === 0 || value === 1;
  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();
    return normalized === 'true' || normalized === 'false';
  }
  return false;
}

function hasOnlyKeys(value: Record<string, unknown>, allowedKeys: readonly string[]): string[] {
  const allowed = new Set(allowedKeys);
  return Object.keys(value).filter((key) => !allowed.has(key));
}

function conflictHasReviewableShape(value: unknown): boolean {
  if (!isObject(value)) return false;
  if (typeof value.area === 'string' &&
    Array.isArray(value.sources) &&
    typeof value.decisionNeeded === 'string' &&
    typeof value.blocksMigration === 'boolean') {
    return true;
  }
  if (typeof value.id === 'string' || typeof value.type === 'string' || typeof value.description === 'string') {
    return true;
  }
  return false;
}

function validateConflictArray(
  warnings: string[],
  conflicts: unknown,
  label: string,
  requireReviewableShape: boolean,
): void {
  if (!Array.isArray(conflicts)) return;
  conflicts.forEach((conflict, index) => {
    if (!isObject(conflict)) {
      warnings.push(`${label}[${index}] is not an object.`);
      return;
    }
    const record = conflict as Record<string, unknown>;
    const blocks = record.blocksMigration === true ||
      record.blocking === true ||
      ['blocking', 'blocker', 'blocked'].includes(String(record.severity ?? '').toLowerCase());
    if (blocks && record.blocksMigration !== true) {
      warnings.push(`${label}[${index}] is blocking but does not set blocksMigration: true.`);
    }
    if (requireReviewableShape && !conflictHasReviewableShape(conflict)) {
      warnings.push(`${label}[${index}] lacks reviewable conflict fields.`);
    }
  });
}

function shardArea(value: unknown): WorkerReportShardArea | undefined {
  return ['availability', 'sourceFormula', 'sideEffects', 'engineGaps'].includes(String(value))
    ? value as WorkerReportShardArea
    : undefined;
}

export function validateWorkerReport(value: unknown): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!isObject(value)) {
    return { ok: false, errors: ['Report is not an object.'], warnings };
  }

  const extraKeys = hasOnlyKeys(value, [
    'schemaVersion',
    'command',
    'category',
    'canonicalDecision',
    'availability',
    'sourceFormula',
    'sideEffects',
    'chainRemap',
    'engineGaps',
    'validationScenarios',
    'notes',
    'unresolvedConflicts',
  ]);
  if (extraKeys.length > 0) warnings.push(`Report has unexpected top-level keys: ${extraKeys.join(', ')}.`);

  pushIfMissing(errors, value.schemaVersion === 'training-worker-report/v1', 'Invalid report schemaVersion.');
  pushIfMissing(errors, isObject(value.command), 'Missing command object.');
  if (isObject(value.command)) {
    pushIfMissing(errors, typeof value.command.id === 'string', 'Missing command.id.');
    pushIfMissing(errors, typeof value.command.originalId === 'number', 'Missing command.originalId.');
  }
  pushIfMissing(errors, typeof value.category === 'string', 'Missing category.');
  pushIfMissing(errors, isObject(value.canonicalDecision), 'Missing canonicalDecision.');
  pushIfMissing(errors, isObject(value.availability), 'Missing availability.');
  pushIfMissing(errors, isObject(value.sourceFormula), 'Missing sourceFormula.');
  pushIfMissing(errors, isObject(value.sideEffects), 'Missing sideEffects.');
  pushIfMissing(errors, isObject(value.chainRemap), 'Missing chainRemap.');
  pushIfMissing(errors, isObject(value.engineGaps), 'Missing engineGaps.');
  pushIfMissing(errors, Array.isArray(value.validationScenarios), 'Missing validationScenarios array.');

  const report = value as Partial<WorkerReport>;
  const conflicts = collectConflicts(report);

  if (hasBlockingConflict(conflicts)) {
    warnings.push('Report contains blocking unresolved conflicts.');
  }
  validateConflictArray(warnings, report.availability?.unresolvedConflicts, 'availability.unresolvedConflicts', true);
  validateConflictArray(warnings, report.sourceFormula?.unresolvedConflicts, 'sourceFormula.unresolvedConflicts', true);
  validateConflictArray(warnings, report.chainRemap?.unresolvedConflicts, 'chainRemap.unresolvedConflicts', true);

  if (includesGeneratedAndImproved(report) && conflicts.length === 0) {
    warnings.push('Report marks generated and improved sources as canonical without recording a conflict.');
  }

  if (!reportHasConcreteSourceEvidence(report)) {
    warnings.push('One or more source writes lack concrete sourceIndex/evidence metadata.');
  }

  if (hasVagueExpectedValues(report)) {
    warnings.push('Validation scenarios contain vague expected values instead of concrete deltas.');
  }

  if ((report.validationScenarios?.length ?? 0) < 2) {
    warnings.push('Report has fewer than two validation scenarios.');
  }

  return { ok: errors.length === 0, errors, warnings };
}

export function validateWorkerReportShard(value: unknown): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!isObject(value)) {
    return { ok: false, errors: ['Shard is not an object.'], warnings };
  }

  const areaForKeys = shardArea(value.area);
  const baseAllowedKeys = [
    'schemaVersion',
    'command',
    'area',
    'checklist',
    'canonicalDecision',
    'validationScenarios',
    'unresolvedConflicts',
    'notes',
  ];
  const areaAllowedKeys: Record<WorkerReportShardArea, string[]> = {
    availability: ['availability'],
    sourceFormula: ['sourceFormula'],
    sideEffects: ['sideEffects', 'chainRemap'],
    engineGaps: ['engineGaps'],
  };
  const shardExtraKeys = hasOnlyKeys(value, [
    ...baseAllowedKeys,
    ...(areaForKeys ? areaAllowedKeys[areaForKeys] : []),
  ]);
  if (shardExtraKeys.length > 0) warnings.push(`Shard has unexpected top-level keys: ${shardExtraKeys.join(', ')}.`);

  pushIfMissing(errors, value.schemaVersion === 'training-worker-report-shard/v1', 'Invalid shard schemaVersion.');
  pushIfMissing(errors, isObject(value.command), 'Missing shard command object.');
  if (isObject(value.command)) {
    pushIfMissing(errors, typeof value.command.id === 'string', 'Missing shard command.id.');
    pushIfMissing(errors, typeof value.command.originalId === 'number', 'Missing shard command.originalId.');
  }

  const area = shardArea(value.area);
  pushIfMissing(errors, area !== undefined, 'Invalid shard area.');
  pushIfMissing(errors, isObject(value.checklist), 'Missing shard checklist.');
  pushIfMissing(errors, Array.isArray(isObject(value.checklist) ? value.checklist.completed : undefined), 'Missing checklist.completed.');
  pushIfMissing(errors, Array.isArray(isObject(value.checklist) ? value.checklist.missing : undefined), 'Missing checklist.missing.');
  pushIfMissing(errors, Array.isArray(isObject(value.checklist) ? value.checklist.conflictsRecorded : undefined), 'Missing checklist.conflictsRecorded.');

  if (value.canonicalDecision !== undefined && !canonicalDecisionLooksLikeReferenceMap(value.canonicalDecision)) {
    warnings.push('Shard canonicalDecision contains non-reference data.');
  }

  if (area) {
    const shard = value as Partial<WorkerReportShard>;
    const completed = new Set(shard.checklist?.completed ?? []);
    const missing = new Set(shard.checklist?.missing ?? []);
    const conflictsRecorded = new Set(shard.checklist?.conflictsRecorded ?? []);
    const known = new Set(REQUIRED_SHARD_CHECKS[area]);
    for (const completedCheck of completed) {
      if (!known.has(completedCheck)) warnings.push(`Shard checklist completed unknown id ${completedCheck}.`);
    }
    for (const missingCheck of missing) {
      if (!known.has(missingCheck)) warnings.push(`Shard checklist missing unknown id ${missingCheck}.`);
    }
    for (const missingCheck of missing) {
      warnings.push(`Shard checklist marks ${missingCheck} missing.`);
    }
    for (const required of REQUIRED_SHARD_CHECKS[area]) {
      if (!completed.has(required) && !missing.has(required) && !conflictsRecorded.has(required)) {
        warnings.push(`Shard checklist does not account for ${required}.`);
      }
    }

    if (area === 'availability' && !isObject(value.availability)) warnings.push('Availability shard omitted availability object.');
    if (area === 'sourceFormula' && !isObject(value.sourceFormula)) warnings.push('Source shard omitted sourceFormula object.');
    if (area === 'sideEffects' && !isObject(value.sideEffects)) warnings.push('Side-effects shard omitted sideEffects object.');
    if (area === 'engineGaps' && !isObject(value.engineGaps)) warnings.push('Engine-gaps shard omitted engineGaps object.');
    validateConflictArray(warnings, value.unresolvedConflicts, 'shard.unresolvedConflicts', true);
  }

  return { ok: errors.length === 0, errors, warnings };
}

export function validateCommandDraft(value: unknown): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!isObject(value)) {
    return { ok: false, errors: ['Draft is not an object.'], warnings };
  }

  const extraKeys = hasOnlyKeys(value, [
    'schemaVersion',
    'commandId',
    'sourceReport',
    'files',
    'requiredChecks',
    'unresolvedConflicts',
    'notes',
  ]);
  if (extraKeys.length > 0) warnings.push(`Draft has unexpected top-level keys: ${extraKeys.join(', ')}.`);

  pushIfMissing(errors, value.schemaVersion === 'training-command-draft/v1', 'Invalid draft schemaVersion.');
  pushIfMissing(errors, typeof value.commandId === 'string', 'Missing commandId.');
  pushIfMissing(errors, typeof value.sourceReport === 'string', 'Missing sourceReport.');
  pushIfMissing(errors, Array.isArray(value.files), 'Missing files array.');
  pushIfMissing(errors, Array.isArray(value.requiredChecks), 'Missing requiredChecks array.');
  pushIfMissing(errors, Array.isArray(value.unresolvedConflicts), 'Missing unresolvedConflicts array.');

  const draft = value as Partial<CommandDraft>;
  if ((draft.files?.length ?? 0) === 0) warnings.push('Draft does not contain any file writes.');
  if (hasBlockingConflict(draft.unresolvedConflicts)) {
    warnings.push('Draft contains blocking unresolved conflicts.');
  }
  validateConflictArray(warnings, draft.unresolvedConflicts, 'draft.unresolvedConflicts', true);
  for (const file of draft.files ?? []) {
    if (!isObject(file)) continue;
    if (!['create', 'update'].includes(String(file.operation))) warnings.push(`Draft file has invalid operation: ${String(file.operation)}.`);
    if (typeof file.path !== 'string' || file.path.trim().length === 0) warnings.push('Draft file missing path.');
    if (typeof file.content !== 'string') warnings.push(`Draft file ${String(file.path)} missing string content.`);
    if (typeof file.reason !== 'string' || file.reason.trim().length === 0) warnings.push(`Draft file ${String(file.path)} missing reason.`);
    if (typeof file.path === 'string' && typeof file.content === 'string') {
      errors.push(...typeScriptSyntaxErrors(file.path, file.content));
    }
  }

  return { ok: errors.length === 0, errors, warnings };
}

export function validateAiReview(value: unknown): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!isObject(value)) {
    return { ok: false, errors: ['Review is not an object.'], warnings };
  }

  const extraKeys = hasOnlyKeys(value, [
    'schemaVersion',
    'approved',
    'riskLevel',
    'findings',
    'missingEvidence',
    'suggestedFixes',
  ]);
  if (extraKeys.length > 0) warnings.push(`Review has unexpected top-level keys: ${extraKeys.join(', ')}.`);

  pushIfMissing(errors, value.schemaVersion === 'ai-port-review/v1', 'Invalid review schemaVersion.');
  pushIfMissing(errors, isBooleanLike(value.approved), 'Missing approved boolean.');
  pushIfMissing(errors, ['low', 'medium', 'high'].includes(String(value.riskLevel)), 'Invalid riskLevel.');
  pushIfMissing(errors, Array.isArray(value.findings), 'Missing findings array.');
  pushIfMissing(errors, Array.isArray(value.missingEvidence), 'Missing missingEvidence array.');
  pushIfMissing(errors, Array.isArray(value.suggestedFixes), 'Missing suggestedFixes array.');

  const review = value as Partial<AiReview>;
  const approvedValue = (value as Record<string, unknown>).approved;
  const approved = typeof approvedValue === 'boolean'
    ? approvedValue
    : typeof approvedValue === 'number'
      ? approvedValue === 1
      : String(approvedValue).trim().toLowerCase() === 'true';
  if (review.riskLevel === 'high') warnings.push('AI review classified the draft as high risk.');
  if (approved === false) warnings.push('AI review did not approve the draft.');
  if (Array.isArray(value.findings)) {
    value.findings.forEach((finding, index) => {
      if (!isObject(finding)) {
        warnings.push(`Review finding[${index}] is not an object.`);
        return;
      }
      if (!['info', 'warning', 'error'].includes(String(finding.severity))) warnings.push(`Review finding[${index}] has invalid severity.`);
      if (typeof finding.area !== 'string') warnings.push(`Review finding[${index}] missing area.`);
      if (typeof finding.message !== 'string') warnings.push(`Review finding[${index}] missing message.`);
    });
  }

  return { ok: errors.length === 0, errors, warnings };
}
