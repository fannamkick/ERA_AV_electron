Return JSON only. Do not use Markdown fences.

Task: produce one `training-worker-report-shard/v1` for area `engineGaps`.

Output exactly these top-level keys:
`schemaVersion`, `command`, `area`, `checklist`, `canonicalDecision`, `engineGaps`, `validationScenarios`, `unresolvedConflicts`, `notes`.

Output invariants:
- Do not add any top-level keys outside the exact list above.
- Every `checklist.completed` and `checklist.missing` item must be one of the required checklist ids below.
- Do not put the same checklist id in both `completed` and `missing`.
- `checklist.conflictsRecorded` is for conflict ids or required checklist ids that were resolved by recording a conflict.
- Every conflict object must include at least `id`, `description`, `severity`, and `blocksMigration`.
- Use `"blocksMigration": true` when a missing engine/domain/schema helper prevents safe executable code.
- Use `"blocksMigration": false` for implementation notes that do not require a new helper.

Required checklist ids. Copy every id into either `checklist.completed` or `checklist.missing`:
- `identity.command-id-checked`
- `identity.original-id-checked`
- `canonical.generated-command-file-checked`
- `canonical.improved-command-file-checked`
- `canonical.conflicts-recorded-or-ruled-out`
- `gaps.condition-predicates-checked`
- `gaps.effect-types-checked`
- `gaps.phase-hooks-checked`
- `gaps.state-adapters-checked`
- `gaps.design-ready-blockers-listed`

Rules:
- Analyze only missing engine/domain/schema support.
- Treat `ai-port://current-implementation-policy`, current command definitions, current resolver slices, and current verification slices as web-port implementation status.
- If current implementation already provides the needed helper/schema support, do not list it as a gap.
- If current implementation exists but no verification slice is present, list a validation scenario rather than inventing an engine gap.
- If `ai-port://current-implementation-summary` says command definition, resolver slices, and verification slice exist, all gap checklist ids must be completed unless you cite a concrete missing helper from evidence.
- Do not list a gap just because generated/improved legacy files use raw arrays; the web-port is allowed to use named helpers/resolvers instead.
- `canonicalDecision` should usually be `{}` for this shard unless a readiness document is cited.
- Do not repeat all command behavior. List only gaps needed to implement this command safely.
- If readiness evidence says the family is `design-ready` or `blocked`, list concrete blockers in `notes[]` and mark `gaps.design-ready-blockers-listed` completed.
- If readiness evidence says `design-ready` but no engine helper is missing, keep gap arrays empty and explain that the blocker is canonical/content resolution, not engine support.
- If no gap is needed in a category, leave that array empty and explain briefly in `notes[]`.
- Do not claim no gaps just because a legacy file implements behavior directly.

JSON shape:
{
  "schemaVersion": "training-worker-report-shard/v1",
  "command": { "id": "COMF<number>", "originalId": 0, "name": "" },
  "area": "engineGaps",
  "checklist": { "completed": [], "missing": [], "conflictsRecorded": [] },
  "canonicalDecision": {},
  "engineGaps": {
    "conditionPredicatesNeeded": [],
    "effectTypesNeeded": [],
    "phaseHooksNeeded": [],
    "stateAdapterFieldsNeeded": []
  },
  "validationScenarios": [],
  "unresolvedConflicts": [],
  "notes": []
}
