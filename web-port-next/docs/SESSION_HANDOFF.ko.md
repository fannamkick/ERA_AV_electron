# Session Handoff

## Current Goal

The project goal is exact original erAV logic parity in the web port. Gate pass, coverage counts, manifest status, and closure prose are guardrails only. They are not the goal.

Final reference sources remain:

- original-game/ERB
- original-game/CSV
- original-game/CSV/VariableSize.CSV
- original-game/CSV/Chara*.csv

## Current Workflow

Do not move to M37 yet.

The current phase is a recheck of previously strict-closed M28-M36 against original game logic. M28-M34 have already been rechecked in this pass. The next concrete target is M35.

## Documentation Restructure

On 2026-05-08 Phase 5 docs were split to reduce token waste and make omission checks harder to bypass.

On 2026-05-08 a source-effect ledger layer was added so future rechecks start from original line/raw evidence instead of milestone prose or old gate counts. The ledger is a verifiable index only; original ERB/CSV remains authoritative.

Active docs:

- web-port-next/docs/milestones/PHASE_5_M28_M49.ko.md: lightweight Phase 5 index only.
- web-port-next/docs/milestones/MILESTONE_DOCUMENTATION_RULES.ko.md: documentation and worker rules.
- web-port-next/docs/milestones/M35_TURN_PIPELINE.ko.md: next recheck surface.

Legacy narrative docs were moved to:

- web-port-next/docs/trash/2026-05-08-milestone-restructure/

## Recheck State

- M28: original-logic recheck recorded complete.
- M29: original SHOP_ITEM.ERB purchase/listing recheck complete; real omissions fixed.
- M30: original SHOP_ITEM.ERB immediate item-use recheck complete; real omissions fixed.
- M31: recruit/listing/character generation recheck complete with fixes; old detailed recheck notes archived to trash.
- M32: identity/lifecycle/sale recheck complete with fixes.
- M33: body/stat/trait/experience recheck complete with M34 handoff refreshed.
- M34: social/equipment/CFLAG recheck complete; M33 inbound 76 CFLAG/FLAG/PBAND rows closed through actual runtime paths and save roundtrip.
- M35: next target under the new split-method process.

## New Closure Rule

Each milestone is split into transaction/capability submilestones.

A submilestone can be treated as closed only when all of these exist:

- original source inventory
- generated source-effect ledger with source line/raw/hash identity
- no unclassified or blocked source-effect rows
- inventory-quality attack
- implementation claim linked to source effects
- executable runtime trace
- save/session/global roundtrip evidence when relevant
- transfer ledger evidence for downstream responsibility

## Worker Policy

Use OpenRouter workers for bounded evidence tasks only:

- Worker A: attack original inventory completeness.
- Worker B: inspect dynamic calls, CSV roles, and state-family aliases.
- Worker C: verify transfers against receiver manifests.

Workers must not declare completion, change closure status, or make final owner decisions. Codex main makes the final responsibility judgment.

## Do Not Do

- Do not jump to M37.
- Do not treat gate pass as original parity.
- Do not count mapped, source-file-review, indexed, or static profile as implemented.
- Do not transfer responsibility by owner name alone.
- Do not accept approved-excluded without receiver evidence.
- Do not rely on the old long Phase 5 narrative as the working surface.
- Do not treat source-effect row existence as implementation evidence.
