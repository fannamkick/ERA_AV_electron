import * as fs from 'fs';
import type { ValidationResult } from '../types';
import { classifyAutopilotResult } from '../validators/gateValidator';
import { validateErbCommandFactsShape, validateErbFactReview } from '../validators/factValidator';
import { validateErbCommandIrShape } from '../validators/irValidator';
import { validateAiReview, validateCommandDraft, validateWorkerReport } from '../validators/reportValidator';

function readJson(filePath: string): unknown {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8').replace(/^\uFEFF/, ''));
}

export function validateArtifact(filePath: string): ValidationResult {
  const value = readJson(filePath);
  const version = typeof value === 'object' && value !== null && 'schemaVersion' in value
    ? String((value as { schemaVersion?: unknown }).schemaVersion)
    : '';

  if (version === 'training-worker-report/v1') return validateWorkerReport(value);
  if (version === 'training-command-draft/v1') return validateCommandDraft(value);
  if (version === 'ai-port-review/v1') return validateAiReview(value);
  if (version === 'erb-command-facts/v1') return validateErbCommandFactsShape(value);
  if (version === 'erb-fact-review/v1') return validateErbFactReview(value);
  if (version === 'erb-command-ir/v1') return validateErbCommandIrShape(value);

  return {
    ok: false,
    errors: [`Unsupported artifact schemaVersion: ${version || '<missing>'}`],
    warnings: [],
  };
}

export function validateReportDraftReview(reportPath: string, draftPath?: string, reviewPath?: string): unknown {
  const report = readJson(reportPath);
  const draft = draftPath ? readJson(draftPath) : undefined;
  const review = reviewPath ? readJson(reviewPath) : undefined;
  const reportValidation = validateWorkerReport(report);
  const draftValidation = draft ? validateCommandDraft(draft) : undefined;
  const reviewValidation = review ? validateAiReview(review) : undefined;

  if (!reportValidation.ok) {
    return { reportValidation, draftValidation, reviewValidation };
  }

  return {
    ...classifyAutopilotResult(
      report as never,
      reportValidation,
      draft as never,
      draftValidation,
      review as never,
      reviewValidation,
    ),
    reportValidation,
    draftValidation,
    reviewValidation,
  };
}
