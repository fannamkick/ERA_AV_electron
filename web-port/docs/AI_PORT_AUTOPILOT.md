# AI Port Autopilot

This tool uses OpenRouter as a parallel analysis and draft-generation worker for training command migration.

The goal is to remove the human bottleneck from repetitive command reading and first-pass implementation while keeping local validation in control.

## Safety Model

OpenRouter is not trusted as the final authority.

The pipeline is:

```txt
analyze legacy evidence
-> synthesize draft files
-> independent AI review
-> local schema/gate validation
-> approval-candidate classification
-> explicit materialize step
```

The tool does not automatically merge changes into source files during `autopilot`.

`materialize` refuses to write anything unless the saved result is classified as `approval-candidate`.

## Commands

Create `web-port/.env.local` for local credentials:

```powershell
OPENROUTER_API_KEY=...
OPENROUTER_MODEL=openai/gpt-4.1-mini
```

The CLI automatically loads `.env.local` first, then `.env`. Existing shell environment variables win over file values.

Do not commit `.env.local`. Use `.env.example` as the template.

Analyze, synthesize, review, and classify a batch:

```powershell
npm run ai-port -- autopilot --range COMF7-19 --concurrency 5
```

Run a single command:

```powershell
npm run ai-port -- autopilot --command COMF7
```

Validate an artifact without network access:

```powershell
npm run ai-port -- validate artifacts/ai-port/COMF7/COMF7.report.json
```

Re-run local gate classification:

```powershell
npm run ai-port -- gate artifacts/ai-port/COMF7/COMF7.report.json --draft artifacts/ai-port/COMF7/COMF7.draft.json --review artifacts/ai-port/COMF7/COMF7.review.json
```

Materialize only an approval candidate:

```powershell
npm run ai-port -- materialize artifacts/ai-port/COMF7/COMF7.result.json
```

## Classifications

- `approval-candidate`: migration-ready family, draft exists, AI review approved, no blocking conflicts, no local gate violations.
- `draft-only`: draft exists, but the family/status/gates do not permit automatic approval.
- `report-only`: useful analysis exists but no draft was generated.
- `blocked`: family readiness or unresolved conflicts block implementation.
- `failed`: schema or local validation failed.

## Report Quality Gate

The analysis prompt is checklist-driven. A worker report should not simply summarize a command; it must separate evidence, conflicts, source writes, engine gaps, and validation scenarios.

The local validator warns when:

- generated and improved sources are both treated as canonical without an explicit conflict;
- source writes omit concrete `sourceIndex` or evidence metadata;
- validation scenarios use vague expected values instead of concrete deltas;
- unresolved conflicts block migration.

These warnings do not always mean the report is useless. They mean the result must not be materialized automatically.

## Current Limits

- The first version generates approval candidates; it does not auto-commit.
- `blocked` and `design-ready` families cannot become approval candidates.
- Self-fix loops are intentionally deferred until approval-candidate quality is measured on COMF7-19.
- Generated artifacts are written under `artifacts/ai-port/`, which is ignored by git.
