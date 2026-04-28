Return JSON only. Do not use Markdown fences.

Task: produce one `training-worker-report-shard/v1` for area `sideEffects`.

Output exactly these top-level keys:
`schemaVersion`, `command`, `area`, `checklist`, `canonicalDecision`, `sideEffects`, `chainRemap`, `validationScenarios`, `unresolvedConflicts`, `notes`.

Required checklist ids. Copy every id into either `checklist.completed` or `checklist.missing`:
- `identity.command-id-checked`
- `identity.original-id-checked`
- `canonical.generated-command-file-checked`
- `canonical.improved-command-file-checked`
- `canonical.conflicts-recorded-or-ruled-out`
- `effects.direct-effects-listed`
- `effects.post-effects-listed`
- `effects.exp-effects-listed`
- `effects.stain-effects-listed`
- `effects.flag-effects-listed`
- `effects.messages-classified`
- `effects.chain-remap-checked`
- `effects.phase-order-checked`
- `effects.base-vs-losebase-conflict-recorded`

Rules:
- Analyze only direct effects, post effects, messages, and command-specific chain/remap.
- Keep output compact. No prose paragraphs.
- Limit `notes` to at most 8 entries.
- `canonicalDecision` may contain only `directEffects`, `sideEffects`, `chainRemap`, and `messages`.
- Each canonicalDecision value must be `{ "file": "...", "symbol": "...", "confidence": "canonical|temporary|conflicted|unsafe", "notes": "..." }`.
- Do not put effect rows under `canonicalDecision`.
- Put immediate base/losebase/message effects under `sideEffects.effects[]`.
- Put exp/stain/flag/after-execution effects under `sideEffects.postEffects[]` when evidence shows post timing.
- Use one compact row per effect family when evidence clearly describes repeated effects.
- Put message text under `sideEffects.messages[]`; garbled or encoding-dependent text must be temporary.
- If no command-specific chain remap exists, set `chainRemap.dependencies` to [] and explain in `notes`.
- If generated and improved disagree on BASE vs LOSEBASE, record a conflict and mark `effects.base-vs-losebase-conflict-recorded` completed.

JSON shape:
{
  "schemaVersion": "training-worker-report-shard/v1",
  "command": { "id": "COMF<number>", "originalId": 0, "name": "" },
  "area": "sideEffects",
  "checklist": { "completed": [], "missing": [], "conflictsRecorded": [] },
  "canonicalDecision": {
    "sideEffects": { "file": "", "symbol": "", "confidence": "temporary", "notes": "" }
  },
  "sideEffects": { "effects": [], "postEffects": [], "messages": [] },
  "chainRemap": { "dependencies": [], "unresolvedConflicts": [] },
  "validationScenarios": [],
  "unresolvedConflicts": [],
  "notes": []
}
