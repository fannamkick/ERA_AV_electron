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

function isObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function pushIfMissing(errors: string[], condition: unknown, message: string): void {
  if (!condition) errors.push(message);
}

function hasBlockingConflict(conflicts: readonly WorkerConflict[] | undefined): boolean {
  return (conflicts ?? []).some((conflict) => conflict.blocksMigration);
}

function collectConflicts(report: Partial<WorkerReport>): WorkerConflict[] {
  return [
    ...(report.availability?.unresolvedConflicts ?? []),
    ...(report.sourceFormula?.unresolvedConflicts ?? []),
    ...(report.chainRemap?.unresolvedConflicts ?? []),
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
    for (const required of REQUIRED_SHARD_CHECKS[area]) {
      if (!completed.has(required) && !missing.has(required)) {
        warnings.push(`Shard checklist does not account for ${required}.`);
      }
    }

    if (area === 'availability' && !isObject(value.availability)) warnings.push('Availability shard omitted availability object.');
    if (area === 'sourceFormula' && !isObject(value.sourceFormula)) warnings.push('Source shard omitted sourceFormula object.');
    if (area === 'sideEffects' && !isObject(value.sideEffects)) warnings.push('Side-effects shard omitted sideEffects object.');
    if (area === 'engineGaps' && !isObject(value.engineGaps)) warnings.push('Engine-gaps shard omitted engineGaps object.');
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
