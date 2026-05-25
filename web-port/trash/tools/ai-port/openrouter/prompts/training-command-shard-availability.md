Return JSON only. Do not use Markdown fences.

Task: produce one `training-worker-report-shard/v1` for area `availability`.

Output exactly these top-level keys:
`schemaVersion`, `command`, `area`, `checklist`, `canonicalDecision`, `availability`, `validationScenarios`, `unresolvedConflicts`, `notes`.

Output invariants:
- Do not add any top-level keys outside the exact list above.
- Every `checklist.completed` and `checklist.missing` item must be one of the required checklist ids below.
- Do not put the same checklist id in both `completed` and `missing`.
- `checklist.conflictsRecorded` is for conflict ids or required checklist ids that were resolved by recording a conflict.
- Every conflict object must include at least `id`, `description`, `severity`, and `blocksMigration`.
- Use `"blocksMigration": true` for blocking, blocker, unsafe, unresolved canonical, or implementation-preventing conflicts.
- Use `"blocksMigration": false` only for historical/non-blocking differences that do not prevent a spec or implementation decision.

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
- Keep output compact. No prose paragraphs.
- Limit `notes` to at most 8 entries.
- Limit `validationScenarios` to at most 6 entries.
- Treat `ai-port://current-implementation-policy` and `src/content/training/basicCommands.ts#current-command-*` as current web-port status. Use it to mark already-implemented availability/requirements, not as a replacement for canonical legacy evidence.
- If current implementation already covers the legacy availability and no conflict exists, state that in `notes[]` and keep conflicts empty.
- If `ai-port://current-implementation-summary` says command definition and verification slice exist, treat equivalent current requirements as coverage, not as a missing gate.
- If current implementation and legacy evidence disagree, record the disagreement instead of silently choosing one.
- `canonicalDecision` may only contain `availability`.
- `canonicalDecision.availability` must be `{ "file": "...", "symbol": "...", "confidence": "canonical|temporary|conflicted|unsafe", "notes": "..." }`.
- Do not put blockers or gates under `canonicalDecision`.
- `availability.hardBlockers[]` entries must include `source`, `raw`, `meaning`, and `evidence`.
- `availability.formulaGates[]` entries must include `source`, `raw`, `meaning`, and `evidence`.
- Compare central `COM_ABLE<number>`, commandAvailability entry, and command-local availability if present.
- If any source differs, add an entry to `availability.unresolvedConflicts[]` and copy its short id into `checklist.conflictsRecorded`.
- If `checklist.conflictsRecorded` contains a required checklist id, it is still best to also include that id in `checklist.completed`.
- If no command-local availability evidence exists, mark `availability.command-local-availability-checked` completed and explain "absent evidence" in `notes[]`; do not omit the checklist id.
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
