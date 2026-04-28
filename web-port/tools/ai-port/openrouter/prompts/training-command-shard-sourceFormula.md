Return JSON only. Do not use Markdown fences.

Task: produce one `training-worker-report-shard/v1` for area `sourceFormula`.

Output exactly these top-level keys:
`schemaVersion`, `command`, `area`, `checklist`, `canonicalDecision`, `sourceFormula`, `validationScenarios`, `unresolvedConflicts`, `notes`.

Required checklist ids. Copy every id into either `checklist.completed` or `checklist.missing`:
- `identity.command-id-checked`
- `identity.original-id-checked`
- `canonical.generated-command-file-checked`
- `canonical.improved-command-file-checked`
- `canonical.conflicts-recorded-or-ruled-out`
- `source.generated-source-writes-listed`
- `source.improved-source-writes-listed`
- `source.source-index-map-checked`
- `source.index-disagreements-recorded`
- `source.modifiers-listed`
- `source.rounding-policy-checked`
- `source.base-vs-losebase-conflict-checked`

Rules:
- Analyze only source formulas and source-related direct base/losebase conflict.
- Keep output compact. No prose paragraphs.
- Limit `notes` to at most 8 entries.
- `canonicalDecision` may only contain `sourceFormula`.
- `canonicalDecision.sourceFormula` must be `{ "file": "...", "symbol": "...", "confidence": "canonical|temporary|conflicted|unsafe", "notes": "..." }`.
- Every `sourceFormula.writes[]` entry must include `target`, `sourceIndex`, `sourceKey`, `formula`, `evidence`.
- `evidence` must include `file`, `symbol`, and `lines`.
- List generated writes and improved writes separately when both exist. Use `sourceFamily: "generated"` or `"improved"` on each write.
- If many writes share the same evidence, keep each row short and put shared details in `modifiers[]`.
- If generated and improved source indexes, meanings, formulas, or BASE/LOSEBASE behavior differ, add `sourceFormula.unresolvedConflicts[]`.
- If a disagreement is detected, `source.index-disagreements-recorded` belongs in `completed`, not `missing`.
- Do not invent sourceKey when unknown; use `null`.
- Do not hide numeric indexes in prose.

JSON shape:
{
  "schemaVersion": "training-worker-report-shard/v1",
  "command": { "id": "COMF<number>", "originalId": 0, "name": "" },
  "area": "sourceFormula",
  "checklist": { "completed": [], "missing": [], "conflictsRecorded": [] },
  "canonicalDecision": {
    "sourceFormula": { "file": "", "symbol": "", "confidence": "temporary", "notes": "" }
  },
  "sourceFormula": {
    "writes": [],
    "modifiers": [],
    "rounding": "none",
    "indexPolicy": "numeric-index",
    "unresolvedConflicts": []
  },
  "validationScenarios": [],
  "unresolvedConflicts": [],
  "notes": []
}
