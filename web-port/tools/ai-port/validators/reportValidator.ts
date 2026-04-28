import type {
  AiReview,
  CommandDraft,
  ValidationResult,
  WorkerConflict,
  WorkerReport,
} from '../types';

function isObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function pushIfMissing(errors: string[], condition: unknown, message: string): void {
  if (!condition) errors.push(message);
}

function hasBlockingConflict(conflicts: readonly WorkerConflict[] | undefined): boolean {
  return (conflicts ?? []).some((conflict) => conflict.blocksMigration);
}

export function validateWorkerReport(value: unknown): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!isObject(value)) {
    return { ok: false, errors: ['Report is not an object.'], warnings };
  }

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
  const conflicts = [
    ...(report.availability?.unresolvedConflicts ?? []),
    ...(report.sourceFormula?.unresolvedConflicts ?? []),
    ...(report.chainRemap?.unresolvedConflicts ?? []),
  ];

  if (hasBlockingConflict(conflicts)) {
    warnings.push('Report contains blocking unresolved conflicts.');
  }

  if ((report.validationScenarios?.length ?? 0) < 2) {
    warnings.push('Report has fewer than two validation scenarios.');
  }

  return { ok: errors.length === 0, errors, warnings };
}

export function validateCommandDraft(value: unknown): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!isObject(value)) {
    return { ok: false, errors: ['Draft is not an object.'], warnings };
  }

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

  return { ok: errors.length === 0, errors, warnings };
}

export function validateAiReview(value: unknown): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!isObject(value)) {
    return { ok: false, errors: ['Review is not an object.'], warnings };
  }

  pushIfMissing(errors, value.schemaVersion === 'ai-port-review/v1', 'Invalid review schemaVersion.');
  pushIfMissing(errors, typeof value.approved === 'boolean', 'Missing approved boolean.');
  pushIfMissing(errors, ['low', 'medium', 'high'].includes(String(value.riskLevel)), 'Invalid riskLevel.');
  pushIfMissing(errors, Array.isArray(value.findings), 'Missing findings array.');
  pushIfMissing(errors, Array.isArray(value.missingEvidence), 'Missing missingEvidence array.');
  pushIfMissing(errors, Array.isArray(value.suggestedFixes), 'Missing suggestedFixes array.');

  const review = value as Partial<AiReview>;
  if (review.riskLevel === 'high') warnings.push('AI review classified the draft as high risk.');
  if (review.approved === false) warnings.push('AI review did not approve the draft.');

  return { ok: errors.length === 0, errors, warnings };
}
