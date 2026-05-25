# Next Milestone

## 2026-05-08 next: M35 split-method original-logic recheck

Phase 5 has been split into per-milestone docs. Do not use the old long PHASE_5_M28_M49 narrative as the working surface anymore.

Active docs:

- web-port-next/docs/milestones/PHASE_5_M28_M49.ko.md: lightweight index only.
- web-port-next/docs/GAME_FEATURE_MAP.ko.md: canonical feature-first map and required inventory row shape.
- web-port-next/docs/milestones/MILESTONE_DOCUMENTATION_RULES.ko.md: worker/documentation rules.
- web-port-next/docs/milestones/M35_TURN_PIPELINE.ko.md: next concrete recheck surface.

## Next Work

1. Start M35 from the feature map and its submilestones, not from the old closure count.
2. Reduce the feature group to concrete entries: turn boundary, clock rollover, scheduled hooks, maintenance hooks, cleanup, and downstream handoffs.
3. Generate the source-effect ledger first: `npm run coverage:source-effects -- M35`.
4. Validate only ledger identity with `npm run gate:source-effect-inventory -- M35`.
5. Build and attack original inventory: ERB entrypoints, CALL/CALLFORM/TRYCALLFORM, state reads/writes, primitive effects, success/failure/cancel/repeat paths.
6. Classify every source-effect row as implemented, transferred, excluded, or blocked with evidence.
7. Use workers only for bounded evidence tasks: inventory omission attack, dynamic call/CSV/state-family attack, and transfer/receiver evidence checks.
8. Do not let workers declare completion.
9. Treat old gate/closure as historical evidence only.

## M35 Closure Rule

A M35 submilestone closes only with:

- original inventory
- source-effect ledger with no unclassified rows
- inventory-quality attack
- implementation claim
- runtime trace
- save/session/global roundtrip evidence when relevant
- transfer ledger evidence

## Hard Stop

Do not start M37 until M35 and then M36 have been handled under the split-method recheck, unless the user explicitly redirects.
