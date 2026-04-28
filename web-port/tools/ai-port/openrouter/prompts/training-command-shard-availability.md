Return JSON only. Do not use Markdown fences.

Task: produce one `training-worker-report-shard/v1` for area `availability`.

Output exactly these top-level keys:
`schemaVersion`, `command`, `area`, `checklist`, `canonicalDecision`, `availability`, `validationScenarios`, `unresolvedConflicts`, `notes`.

Required checklist ids. Copy every id into either `checklist.completed` or `checklist.missing`:
- `identity.command-id-checked`
- `identity.original-id-checked`
- `canonical.generated-command-file-checked`
- `canonical.improved-command-file-checked`
- `canonical.conflicts-recorded-or-ruled-out`
- `availability.central-availability-checked`
- `availability.command-availability-checked`
- `availability.command-local-availability-checked`
- `availability.gender-gates-listed`
- `availability.clothing-gates-listed`
- `availability.equipment-gates-listed`
- `availability.formula-gates-listed`
- `availability.disagreements-recorded`

Rules:
- Analyze only availability.
- `canonicalDecision` may only contain `availability`.
- `canonicalDecision.availability` must be `{ "file": "...", "symbol": "...", "confidence": "canonical|temporary|conflicted|unsafe", "notes": "..." }`.
- Do not put blockers or gates under `canonicalDecision`.
- `availability.hardBlockers[]` entries must include `source`, `raw`, `meaning`, and `evidence`.
- `availability.formulaGates[]` entries must include `source`, `raw`, `meaning`, and `evidence`.
- Compare central `COM_ABLE<number>`, commandAvailability entry, and command-local availability if present.
- If any source differs, add an entry to `availability.unresolvedConflicts[]` and copy its short id into `checklist.conflictsRecorded`.
- If evidence for a required check is absent, put that checklist id in `missing` and explain in `notes`.

JSON shape:
{
  "schemaVersion": "training-worker-report-shard/v1",
  "command": { "id": "COMF<number>", "originalId": 0, "name": "" },
  "area": "availability",
  "checklist": { "completed": [], "missing": [], "conflictsRecorded": [] },
  "canonicalDecision": {
    "availability": { "file": "", "symbol": "", "confidence": "temporary", "notes": "" }
  },
  "availability": { "hardBlockers": [], "formulaGates": [], "unresolvedConflicts": [] },
  "validationScenarios": [],
  "unresolvedConflicts": [],
  "notes": []
}
