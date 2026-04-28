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
  return [
    ...(report.availability.unresolvedConflicts ?? []),
    ...(report.sourceFormula.unresolvedConflicts ?? []),
    ...(report.chainRemap.unresolvedConflicts ?? []),
    ...(draft?.unresolvedConflicts ?? []),
  ];
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
  const blockingConflicts = collectConflicts(report, draft).filter((conflict) => conflict.blocksMigration);
  const draftViolations = scanDraftContent(draft);

  if (familyStatus === 'blocked') gateReasons.push('Family readiness is blocked; implementation drafts cannot be approval candidates.');
  if (familyStatus === 'design-ready') gateReasons.push('Family is design-ready only; report/spec drafts are allowed but auto approval is blocked.');
  if (familyStatus === 'unknown') gateReasons.push('Family readiness is unknown.');
  if (blockingConflicts.length > 0) gateReasons.push('Blocking unresolved conflicts are present.');
  if (draftViolations.length > 0) gateReasons.push(...draftViolations);
  if (review && !review.approved) gateReasons.push('AI reviewer did not approve the draft.');
  if (review?.riskLevel === 'high') gateReasons.push('AI reviewer marked the draft as high risk.');

  let classification: AutopilotClassification;
  if (errors.length > 0) {
    classification = 'failed';
  } else if (familyStatus === 'migration-ready' && draft && review?.approved && draftViolations.length === 0 && blockingConflicts.length === 0) {
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
