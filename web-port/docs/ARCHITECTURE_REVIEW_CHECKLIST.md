# Architecture Review Checklist

Use this checklist before accepting architecture, domain, or content migration changes.

## Dependency Direction

- Components may call application/domain APIs, but domain code must not import React or UI components.
- Content definitions must not import Zustand stores or mutate UI state.
- Domain code must not import legacy generated files directly.
- Core code must remain gameplay-agnostic.

## State Access

- New code should use named stat and flag keys, not raw numeric indices.
- Any new numeric key must record its original legacy index.
- Unknown keys should fail through guard helpers or explicit validation.
- Actor-specific state access must state whether it targets `target`, `trainer`, `assistant`, `session`, or `global`.

## Training Migration

- Do not migrate a command with unresolved canonical-source conflicts.
- Do not hide legacy behavior behind opaque `custom` condition strings unless a typed predicate is planned.
- Source formulas must record rounding and source-index policy.
- Equipment, stain, chain, and post-effect behavior must use schema phases, not command-local one-off branches.

## Validation

- Behavior changes need a repeatable verification command or documented manual-review reason.
- Pilot training changes should run the training pilot verification tools.
- Build artifacts should be regenerated, not hand-edited.

## Review Outcome

Record one of:

- `approved`: follows architecture contract;
- `approved-with-followup`: safe now, tracked follow-up exists;
- `blocked`: violates dependency, state, schema, or validation rules.
