# Next Milestone

## 2026-05-08 next: M35 split-method original-logic recheck

Phase 5 has been split into per-milestone docs. Do not use the old long PHASE_5_M28_M49 narrative as the working surface anymore.

Active docs:

- web-port-next/docs/milestones/PHASE_5_M28_M49.ko.md: lightweight index only.
- web-port-next/docs/milestones/MILESTONE_DOCUMENTATION_RULES.ko.md: worker/documentation rules.
- web-port-next/docs/milestones/M35_TURN_PIPELINE.ko.md: next concrete recheck surface.

## Next Work

1. Start M35 from its submilestones, not from the old closure count.
2. Build and attack original inventory first: ERB entrypoints, CALL/CALLFORM/TRYCALLFORM, state reads/writes, primitive effects, success/failure/cancel/repeat paths.
3. Use workers only for bounded evidence tasks: inventory omission attack, dynamic call/CSV/state-family attack, and transfer/receiver evidence checks.
4. Do not let workers declare completion.
5. Treat old gate/closure as historical evidence only.

## M35 Closure Rule

A M35 submilestone closes only with:

- original inventory
- inventory-quality attack
- implementation claim
- runtime trace
- save/session/global roundtrip evidence when relevant
- transfer ledger evidence

## Hard Stop

Do not start M37 until M35 and then M36 have been handled under the split-method recheck, unless the user explicitly redirects.