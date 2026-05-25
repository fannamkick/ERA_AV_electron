import type {
  AiReview,
  AutopilotClassification,
  CommandDraft,
  FamilyStatus,
  ValidationResult,
  WorkerConflict,
  WorkerReport,
} from '../types';

const BLOCKED_PATTERNS = [
  /from\s+['"][^'"]*react[^'"]*['"]/i,
  /from\s+['"][^'"]*zustand[^'"]*['"]/i,
  /from\s+['"][^'"]*src\/legacy/i,
  /from\s+['"][^'"]*\.\.\/\.\.\/legacy/i,
  /\.\s*(cflag|tflag|source|palam|exp|base|stain|equipment)\s*\[[^\]]+\]\s*=/i,
  /\[[0-9]+\]\s*(\+\+|--|[+\-*/]?=)/,
  /window\./i,
  /document\./i,
  /localStorage\./i,
];

export function inferFamilyStatus(originalId: number): FamilyStatus {
  if (originalId >= 0 && originalId <= 6) return 'migration-ready';
  if (originalId >= 7 && originalId <= 19) return 'design-ready';
  if (originalId >= 20 && originalId <= 39) return 'blocked';
  if ([40, 41, 42, 48, 50, 51, 52, 55, 56, 72, 81, 82, 83, 84, 85, 92].includes(originalId)) {
    return 'design-ready';
  }
  if (
    (originalId >= 43 && originalId <= 47) ||
    originalId === 49 ||
    (originalId >= 53 && originalId <= 54) ||
    (originalId >= 57 && originalId <= 59)
  ) {
    return 'design-ready';
  }
  if ((originalId >= 60 && originalId <= 71) || originalId === 73 || originalId === 80) return 'blocked';
  if (originalId === 87 || originalId === 88) return 'blocked';
  if (originalId === 90 || originalId === 91) return 'design-ready';
  if ((originalId >= 74 && originalId <= 79) || originalId === 86 || (originalId >= 93 && originalId <= 99)) {
    return 'blocked';
  }
  if (originalId === 89) return 'design-ready';
  if (originalId >= 100) return 'blocked';
  return 'unknown';
}

function collectConflicts(report: WorkerReport, draft?: CommandDraft): WorkerConflict[] {
  const dynamicReport = report as unknown as {
    sideEffects?: { unresolvedConflicts?: WorkerConflict[] };
    unresolvedConflicts?: WorkerConflict[];
  };
  return [
    ...(report.availability.unresolvedConflicts ?? []),
    ...(report.sourceFormula.unresolvedConflicts ?? []),
    ...(report.chainRemap.unresolvedConflicts ?? []),
    ...(dynamicReport.sideEffects?.unresolvedConflicts ?? []),
    ...(dynamicReport.unresolvedConflicts ?? []),
    ...(draft?.unresolvedConflicts ?? []),
  ];
}

function conflictBlocksMigration(conflict: WorkerConflict): boolean {
  const record = conflict as unknown as Record<string, unknown>;
  return conflict.blocksMigration === true ||
    record.blocking === true ||
    ['blocking', 'blocker', 'blocked'].includes(String(record.severity ?? '').toLowerCase());
}

function reviewIsApproved(review: AiReview | undefined): boolean | undefined {
  if (!review) return undefined;
  const value = (review as unknown as Record<string, unknown>).approved;
  if (typeof value === 'boolean') return value;
  if (typeof value === 'number' && (value === 0 || value === 1)) return value === 1;
  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();
    if (normalized === 'true') return true;
    if (normalized === 'false') return false;
  }
  return false;
}

function scanDraftContent(draft: CommandDraft | undefined): string[] {
  if (!draft) return [];
  const violations: string[] = [];

  for (const file of draft.files) {
    const isSpecOnly = file.path.startsWith('docs/ai-port/spec-drafts/') && file.path.endsWith('.spec.md');
    if (isSpecOnly) {
      if (/```(?:ts|typescript)|import\s+|export\s+const\s+|defineTrainingCommand\s*\(/i.test(file.content)) {
        violations.push(`${file.path}: spec-only draft contains executable TypeScript.`);
      }
      continue;
    }

    for (const pattern of BLOCKED_PATTERNS) {
      if (pattern.test(file.content)) {
        violations.push(`${file.path}: blocked pattern ${pattern}`);
      }
    }
  }

  return violations;
}

export function classifyAutopilotResult(
  report: WorkerReport,
  reportValidation: ValidationResult,
  draft?: CommandDraft,
  draftValidation?: ValidationResult,
  review?: AiReview,
  reviewValidation?: ValidationResult,
): {
  familyStatus: FamilyStatus;
  classification: AutopilotClassification;
  gateReasons: string[];
  localValidation: ValidationResult;
} {
  const familyStatus = inferFamilyStatus(report.command.originalId);
  const errors = [
    ...reportValidation.errors,
    ...(draftValidation?.errors ?? []),
    ...(reviewValidation?.errors ?? []),
  ];
  const warnings = [
    ...reportValidation.warnings,
    ...(draftValidation?.warnings ?? []),
    ...(reviewValidation?.warnings ?? []),
  ];
  const gateReasons: string[] = [];
  const blockingConflicts = collectConflicts(report, draft).filter(conflictBlocksMigration);
  const draftViolations = scanDraftContent(draft);
  const approved = reviewIsApproved(review);

  if (familyStatus === 'blocked') gateReasons.push('Family readiness is blocked; implementation drafts cannot be approval candidates.');
  if (familyStatus === 'design-ready') gateReasons.push('Family is design-ready only; report/spec drafts are allowed but auto approval is blocked.');
  if (familyStatus === 'unknown') gateReasons.push('Family readiness is unknown.');
  if (blockingConflicts.length > 0) gateReasons.push('Blocking unresolved conflicts are present.');
  if (draftViolations.length > 0) gateReasons.push(...draftViolations);
  if (review && approved !== true) gateReasons.push('AI reviewer did not approve the draft.');
  if (review?.riskLevel === 'high') gateReasons.push('AI reviewer marked the draft as high risk.');

  let classification: AutopilotClassification;
  if (errors.length > 0) {
    classification = 'failed';
  } else if (familyStatus === 'migration-ready' && draft && approved === true && draftViolations.length === 0 && blockingConflicts.length === 0) {
    classification = 'approval-candidate';
  } else if (draft && familyStatus !== 'blocked') {
    classification = 'draft-only';
  } else if (familyStatus === 'blocked' || blockingConflicts.length > 0) {
    classification = 'blocked';
  } else {
    classification = 'report-only';
  }

  return {
    familyStatus,
    classification,
    gateReasons,
    localValidation: {
      ok: errors.length === 0 && gateReasons.length === 0,
      errors,
      warnings,
    },
  };
}
