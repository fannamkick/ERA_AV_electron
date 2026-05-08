# Agent Startup Docs

This folder contains thin startup docs for Codex and subagents. These docs reduce token use; they do not replace original-source verification.

## Current Rule

The active workflow is M35 split-method original-logic recheck.

- Do not jump to M37.
- Do not rely on old strict closure status.
- Use `../milestones/M35_TURN_PIPELINE.ko.md` as the current working surface.
- Use `../milestones/MILESTONE_DOCUMENTATION_RULES.ko.md` for worker and document rules.

## Read Order

1. `CODEX_BOOTSTRAP.ko.md`
2. `NEXT_MILESTONE.ko.md`
3. `../SESSION_HANDOFF.ko.md`
4. `../milestones/MILESTONE_DOCUMENTATION_RULES.ko.md`
5. current milestone split doc
6. original ERB/CSV and machine artifacts as needed

## Authority Boundary

Agent docs are dashboards and starting points. Completion requires original source evidence, source inventory, implementation claim, runtime trace, and transfer ledger evidence.

## Worker Policy

Workers may collect evidence, compare manifests, and produce omission candidates. Workers must not declare completion or decide final owner boundaries.