# Documentation Index

## Current Active Rule

The active workflow is the split-method original-logic recheck.

- Do not use old strict closure status as final proof.
- Do not jump to M37.
- The next concrete target is M35 through `milestones/M35_TURN_PIPELINE.ko.md`.
- Phase 5 is now indexed by `milestones/PHASE_5_M28_M49.ko.md`; per-milestone detail lives in `milestones/Mxx_*.ko.md`.
- Worker/documentation rules live in `milestones/MILESTONE_DOCUMENTATION_RULES.ko.md`.

## Read Order For Codex And Workers

1. `agent/CODEX_BOOTSTRAP.ko.md`
2. `agent/NEXT_MILESTONE.ko.md`
3. `SESSION_HANDOFF.ko.md`
4. `milestones/MILESTONE_DOCUMENTATION_RULES.ko.md`
5. Current milestone split doc, currently `milestones/M35_TURN_PIPELINE.ko.md`
6. Machine artifacts only as needed: source-unit manifest, gap audit, closure JSON, runtime code, original ERB/CSV

## Authority Boundary

Instruction docs are navigation. Completion authority comes from:

- original ERB/CSV/VariableSize/Chara CSV evidence
- source inventory and inventory-quality attack
- implementation claim linked to source effects
- executable runtime trace
- save/session/global roundtrip evidence when relevant
- transfer ledger evidence for downstream responsibility

## Active Document Roles

| Document | Role |
|---|---|
| `SESSION_HANDOFF.ko.md` | Minimal session handoff and current workflow. |
| `agent/CODEX_BOOTSTRAP.ko.md` | Startup rules and hard prohibitions. |
| `agent/NEXT_MILESTONE.ko.md` | Immediate next task. |
| `agent/CURRENT_STATUS.ko.md` | Compact status dashboard. |
| `milestones/PHASE_5_M28_M49.ko.md` | Lightweight Phase 5 index. |
| `milestones/Mxx_*.ko.md` | Per-milestone split surfaces. |
| `milestones/MILESTONE_DOCUMENTATION_RULES.ko.md` | Required document shape and worker rules. |
| `PROGRESS_STATUS.ko.md` | Historical progress log; do not use alone for completion. |

## Worker Rule

OpenRouter workers may gather evidence and omission candidates. They must not declare completion, change closure status, or decide final owner boundaries.