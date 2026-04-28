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
- Treat `ai-port://current-implementation-policy`, `src/content/training/basicCommands.ts#current-command-*`, `stainEffectResolvers.ts#comf*StainPostEffects`, and `experienceEffectResolvers.ts#comf*ExperiencePostEffects` as current web-port status. Use them to identify already-migrated effects and avoid duplicate work.
- Current implementation evidence can prove implementation coverage, but original ERB/generated/improved evidence still decides canonical legacy behavior.
- If current implementation and canonical legacy evidence disagree, record a conflict and make canonical confidence `conflicted` or `temporary`.
- If `ai-port://current-implementation-summary` says command definition, resolver slices, and verification slice exist, and readiness evidence says the family is migration-ready, do not request duplicate implementation for already-covered effects.
- Put stale status strings or historical generated-vs-improved differences in `notes[]` unless they require code changes.
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
- Even when no command-specific chain remap exists, put `effects.chain-remap-checked` in `checklist.completed`.
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
