Return JSON only. Do not use Markdown fences.

Task: produce one `training-worker-report-shard/v1` for area `engineGaps`.

Output exactly these top-level keys:
`schemaVersion`, `command`, `area`, `checklist`, `canonicalDecision`, `engineGaps`, `validationScenarios`, `unresolvedConflicts`, `notes`.

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
- `canonicalDecision` should usually be `{}` for this shard unless a readiness document is cited.
- Do not repeat all command behavior. List only gaps needed to implement this command safely.
- If readiness evidence says the family is `design-ready` or `blocked`, list concrete blockers in `notes[]` and mark `gaps.design-ready-blockers-listed` completed.
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
