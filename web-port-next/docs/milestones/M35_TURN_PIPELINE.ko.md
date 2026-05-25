# M35. Turn end, time progression, and automatic hooks

## Objective

Port and recheck this milestone by original erAV transaction/capability units, not by gate pass or owner-name transfer.

Old strict closure status: completed
New split-review status: next-new-method-recheck
Old closure title: Turn end, time progression, and automatic hook pipeline
Trial recheck status: opened-by-2026-05-08-split-method-test

## Original Source Scope

Canonical source scope is the machine manifest, plus direct review of original ERB/CSV/VariableSize/Chara CSV before any new closure.

Use this split document as navigation only. Do not duplicate the full source-unit row list here; the manifest remains canonical.

## Submilestones

### M35-A. Turn boundary entry/exit transaction
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

### M35-B. Clock/day/week/month/year rollover
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

### M35-C. Scheduled event and mission deadline hooks
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

### M35-D. Weekly/monthly maintenance hooks
- Status: in-progress-under-new-split-review
- Original entrypoints/source units: `EVENT_TURNEND.ERB` / `AUTO_BUYING`; `EVENT_TURNEND.ERB` / `AUTO_ITEMUSE`; `EVENT_NEXTDAY.ERB` / `RUNNING_COST`
- Required runtime effects: `FLAG:34` bit 1 lotion auto-buy, bit 8 condom auto-buy loop, commented video-tape block excluded; `FLAG:76` bit 1 nutrition, bit 8 incense source no-op under `VARSET LOCAL,0`, bit 2 ovulation inducer, bit 4 ovulation suppressor; `RUNNING_COST` source formula for `DAY`, `FLAG:48`, `FLAG:40`, `EXP:MASTER:90/91`, `CHARANUM`, `FLAG:5`, and conditional `MONEY -= A`.
- Implementation claim: `src/features/turnEnd.ts` `applyAutomaticBuying` implements `ITEM:25`, `ITEM:24`, and `MONEY` mutations for `AUTO_BUYING`; `applyAutomaticItemUse` implements `AUTO_ITEMUSE`; `computeRunningCost`/`applyRunningCost` implement `RUNNING_COST`.
- Runtime trace: `tools/m35_turn_long_smoke.ts` asserts item counts, money, accounting entries, AUTO_ITEMUSE early return, nutrition/ovulation branches, incense no-op, first-turn RUNNING_COST no-charge, second-turn charge, and rollover charge.
- Transfer contracts: list only source effects that have receiver evidence.

### M35-E. Transient session cleanup and save boundary
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

### M35-F. Downstream event/world/economy handoff ledger
- Status: in-progress-under-new-split-review
- Original entrypoints/source units: `EVENT_NEXTDAY.ERB` / `EVENT_NEWDAY`
- Required runtime effects: record ordered reachability for active calls `MORNING_COWGIRL`, `HAPPY_BIRTHDAY`, `ONESHO`, `PARTICULAR_DATE`, `START_COOCKING`; keep commented `SOMETIMES_SHE_COMES_BACK` excluded.
- Implementation claim: `src/features/turnEnd.ts` records `newDayHookLastTurn` and `newDayHookOrder`.
- Runtime trace: `tools/m35_turn_long_smoke.ts` asserts hook order, effect log, and save roundtrip.
- Transfer contracts: list only source effects that have receiver evidence.

## Current Machine Artifacts

- Source-effect ledger: web-port-next/data/coverage/source-effects/M35.effects.json
- Source-effect review queue: web-port-next/data/coverage/source-effects/M35.review-queue.json
- Source-effect classification overlay: web-port-next/data/coverage/source-effects/classifications/M35.classification.json
- Source-effect transfer contracts: web-port-next/data/coverage/source-effects/transfers.json
- Source-unit manifest: web-port-next/data/coverage/manifests/M35-source-units.json
- Closure artifact: web-port-next/data/coverage/milestones/M35-closure.json
- Gap audit: web-port-next/data/coverage/audits/M35-gap-audit.json
- Phase index: web-port-next/docs/milestones/PHASE_5_M28_M49.ko.md

## Source Effect Ledger Summary

The source-effect ledger is generated from original source lines and is only a verifiable index. It does not replace direct original ERB review.

Run:

- `npm run coverage:source-effects -- M35`
- `npm run gate:source-effect-inventory -- M35`
- `npm run coverage:source-effect-review -- M35`
- `npm run gate:source-effect-review -- M35`
- `npm run gate:source-effect-closure -- M35`
- `npm run gate:transfer-contracts -- M35`

Expected current state under the new method:

- generated effects: 1555
- review groups: 32
- by kind: branch-or-loop 1054, state-write 270, call-edge 107, control-transfer 87, label 34, primitive-effect 3
- by status after first closure-start pass: blocked 176, unclassified 1379
- inventory gate should pass after ledger generation
- review queue gate should pass only if every effect appears in exactly one review group
- closure gate should fail until every generated effect is classified and evidenced
- transfer gate should pass only for accepted sender/receiver contracts

Largest current review groups:

- `EVENT_TURNEND.ERB` / `EVENTTURNEND`: 176 effects, high risk. First closure-start pass marks this group as `blocked` under M35 ownership, not complete. It must be split mentally into pre-turnend calls, global/kill/clamp cleanup, TIME branch, day rollover, auto hooks, actor cleanup, and `BEGIN SHOP`.
- `EVENT_NEXTDAY.ERB` / `MORNING_COWGIRL`: 120 effects, likely receiver-owned unless M35 owns morning-event execution semantics.
- `EVENT_NEXTDAY.ERB` / `NIGHT_STALKING_CHECK`: 112 effects, likely receiver-owned unless M35 owns daily-event execution semantics.
- `EVENT_AFTERTRAIN.ERB` / `AFTERTRAIN_LESBIANSEX_CHECK`: 109 effects. Its old M35 source reference must be re-justified or transferred; do not use it as generic clock/save evidence.
- `EVENT_PARTICULAR_DAY.ERB` / `SUMMER_VACATION1`: 103 effects, likely event-world receiver candidate.
- `EVENT_PARTICULAR_DAY.ERB` / `VALENTINE_DAY`: 86 effects, likely event-world receiver candidate.
- `EVENT_TURNEND.ERB` / `AUTO_ITEMUSE`: 81 effects, direct M35-D/M35-E closure blocker unless explicitly transferred with receiver evidence.

## Source Inventory Summary

- Total source units: 8
- Implemented-verified under old rules: 8
- Approved-excluded under old rules: 0
- Blocked under old rules: 0
- Open gaps under old gap audit: 0
- 2026-05-08 split-method test result: do not treat these counts as closure evidence. Direct original review found multiple source effects that are not represented as discrete M35 closure items yet.

Status counts from manifest:
- implemented-verified: 8

Source kind counts from manifest:
- functional-turn-unit: 8

Top source paths from manifest:
- original-game/ERB/イベント関係/EVENT_TURNEND.ERB: 3
- original-game/ERB/イベント関係/EVENT_AFTERTRAIN.ERB: 2
- original-game/ERB/イベント関係/EVENT_NEXTDAY.ERB: 2
- original-game/ERB/イベント関係/EVENT_PARTICULAR_DAY.ERB: 1

## 2026-05-08 Split-Method Trial Findings

This section is not a closure. It records the first test pass of the new process and the items that must be classified as M35-owned, receiver-owned with evidence, or out-of-scope with explicit source reason.

Direct original source checked:
- `original-game/ERB/イベント関係/EVENT_TURNEND.ERB`
- `original-game/ERB/イベント関係/EVENT_NEXTDAY.ERB`
- `original-game/ERB/イベント関係/EVENT_PARTICULAR_DAY.ERB`
- `original-game/ERB/イベント関係/EVENT_AFTERTRAIN.ERB`

Confirmed old-manifest risk:
- The old manifest has only 8 abstract units. `EVENT_TURNEND` alone contains many concrete source effects and call edges that are not itemized.
- `src/features/turnEnd.ts` currently implements a simplified turn boundary: clock advance, scheduled-event consumption, mission deadline decrement, weekly/monthly markers, a monthlyMaintenanceCost placeholder, processed-event flags, and session cleanup.
- The smoke `tools/m35_turn_long_smoke.ts` verifies that simplified model, not the full original `EVENT_TURNEND` transaction.
- Worker transfer review found no formal receiver contract for mission/world/economy/event handoffs. M35 closure says transferredOut 0, while its runtimeConsumerId fields touch mission, world, and economy. This remains open.

Open source-effect buckets found in this trial:
- `EVENT_TURNEND.ERB:6-87`: pre-turnend transaction calls and primitive effects are not split into closure items yet: `CHECK_SELLASSIABLE`, `CHECK_SPECIALSKIL`, `IN_VAGINA_ALL`, `CONCEPTION_CHECK_ALL`, `CHARACLEAR_CALC`, `RESTTIME`, `OVULATION_CALC`, `VAGINAFORM_CHANGE`, `PUBLIC_HAIR`, `LOADGLOBAL`/`SAVEGLOBAL` for `GLOBAL:51`, dead-character removal via `KILL_TARGET`, `BASE:COUNT:31` clamp, and `FLAG:0 = 0`.
- `EVENT_TURNEND.ERB:89-275`: the `TIME == 1` branch is much larger than "clock advance". It calls brothel, pregnancy, daily event, scout, idol, badboy, molester, compa, boyfriend, looks-change, staff NTR, black-gal, model, club, EXABL, sunburn, work/job/mission-day, lycee weekend, next-month, new-day, ending, auto-buying, auto-item-use, morning pickup, achievement, then `BEGIN SHOP`.
- `EVENT_TURNEND.ERB:217-251`: original time advance is `DAY += 1`, `DAY:2 += 1`, optional `EVENT_NEXTMONTH`, and `TIME = 0`; morning-to-afternoon is only `TIME = 1`. Current `advanceTurnClock` uses a weekly abstraction (`day += 7`, week/month/year counters), so exact source equivalence is unproven.
- `EVENT_TURNEND.ERB:220-238`: daily reset of `CFLAG:COUNT:109` ovulation drug state and `CFLAG:COUNT:34` hair-growth drug state is not represented by a verified M35 item.
- `EVENT_TURNEND.ERB:265-267`: `TARGET = -1` and `ASSI = -1` are concrete boundary cleanup effects. Current session cleanup is broader UI/session reset, but these original actor-slot effects need explicit state mapping or receiver contract.
- `RESTTIME` in `EVENT_TURNEND.ERB:280-389`: original health/will recovery formula uses `TIME`, `TARGET`, `CFLAG:12`, talents 419/501/505/511/504/111/112, `ABL:51`, healer counts, near-death throttling, jealousy masturbation side effect `EXP:10 += ABL:11 * 2`, `BASE:0` clamp, and `BASE:1 = MAXBASE:1`. Current M35 runtime does not implement this formula.
- `PUBLIC_HAIR` in `EVENT_TURNEND.ERB:420-464`: original pubic-hair growth mutates `CFLAG:6` and talents 125/128 under `FLAG:36`, hair-growth drug, age/body talents, and permanent-removal rules. It is not closed by the current M35 manifest.
- `AUTO_BUYING` in `EVENT_TURNEND.ERB:469-488`: original automatic purchase mutates `ITEM:25`, `ITEM:24`, and `MONEY` based on `FLAG:34`; current weekly hook only records checked flags.
- `AUTO_ITEMUSE` in `EVENT_TURNEND.ERB:493-606`: packet `m35-auto-itemuse` now implements `BASE:0`, `JUEL:100`, `CFLAG:109`, and `MONEY` behavior based on `FLAG:76`, `TALENT:MASTER:55`, `PBAND:303`, and per-character conditions.
- `EVENT_NEXTDAY.ERB:4-131`: daily event hook expands into talent changes, pregnancy/birth/child handling, washing clothes, previous-target restore, night stalking, running cost, and danger-day calculation. The current "world-event-hook" item does not itemize these source effects.
- `RUNNING_COST` in `EVENT_NEXTDAY.ERB:162-277`: packet `m35-running-cost` now implements the original formula and conditional `MONEY` write in `src/features/turnEnd.ts`; M35-B still owns the broader exact `DAY`/turn-boundary semantics question.
- `EVENT_NEWDAY` in `EVENT_NEXTDAY.ERB:135-158` and `PARTICULAR_DATE` in `EVENT_PARTICULAR_DAY.ERB:19-32`: morning events and date-specific dispatch (`VALENTINE_DAY`, `SUMMER_VACATION1`) need receiver evidence if not M35-owned.
- `EVENT_AFTERTRAIN.ERB` is listed in old manifest for clock/save evidence, but its visible labels are training-after effects such as `CHARADEAD_CHECK` and `SELF_CHECK`. Any M35 reliance on this file must be re-justified with exact source lines, not the old `source:save-map:time` label.

Immediate closure blockers created by this trial:
- M35-B cannot close until the exact original `TIME`/`DAY`/`DAY:2` semantics are either ported or explicitly mapped to a justified web abstraction.
- M35-C/M35-F cannot close until every event/mission/world/economy call edge has either implementation evidence or a receiver contract.
- M35-D cannot close while original daily CFLAG resets are represented only as marker flags/placeholders; `AUTO_BUYING`, `AUTO_ITEMUSE`, and `RUNNING_COST` have packet-level implementation evidence.
- M35-E cannot close until original `TARGET`/`ASSI` cleanup and save/session boundary mapping are listed separately from web UI-session cleanup.

## 2026-05-08 Real Packet Progress

These are not whole-M35 closure claims. Each row records one bounded original source packet that has implementation evidence, runtime trace, and exact source-effect accounting.

| packet | source review group | effects accounted | implementation evidence | runtime/accounting evidence | status |
|---|---:|---:|---|---|---|
| `m35-event-newday` | `M35:review:event-nextday:event-newday` | 10/10 | `src/features/turnEnd.ts` `applyNewDayEventHooks` | `tools/m35_turn_long_smoke.ts`; `data/implementation-packets/m35-event-newday.worker-result.json` | packet-closed |
| `m35-auto-buying` | `M35:review:event-turnend:auto-buying` | 17/17 | `src/features/turnEnd.ts` `applyAutomaticBuying` | `tools/m35_turn_long_smoke.ts`; `data/implementation-packets/m35-auto-buying.worker-result.json` | packet-closed |
| `m35-auto-itemuse` | `M35:review:event-turnend:auto-itemuse` | 81/81 | `src/features/turnEnd.ts` `applyAutomaticItemUse` | `tools/m35_turn_long_smoke.ts`; `data/implementation-packets/m35-auto-itemuse.worker-result.json` | packet-closed |
| `m35-running-cost` | `M35:review:event-nextday:running-cost` | 52/52 | `src/features/turnEnd.ts` `computeRunningCost`/`applyRunningCost` | `tools/m35_turn_long_smoke.ts`; `data/implementation-packets/m35-running-cost.worker-result.json` | packet-closed |

Validated commands:

- `npm run typecheck`
- `npm run smoke:turn-long`
- `node tools/check_feature_packet_worker_result.mjs m35-event-newday data/implementation-packets/m35-event-newday.worker-result.json`
- `node tools/check_feature_packet_worker_result.mjs m35-auto-buying data/implementation-packets/m35-auto-buying.worker-result.json`
- `node tools/check_feature_packet_worker_result.mjs m35-auto-itemuse data/implementation-packets/m35-auto-itemuse.worker-result.json`
- `node tools/check_feature_packet_worker_result.mjs m35-running-cost data/implementation-packets/m35-running-cost.worker-result.json`

## Transfer Contracts

Do not treat approved-excluded as completion. Every transfer must identify:

| sourceUnitId | source effect | from | to | receiver evidence | sender obligation | status |
|---|---|---|---|---|---|---|
| TODO | TODO | M35 | TODO | TODO | TODO | open |

## Required Omission Attacks

- Dynamic CALL/CALLFORM/TRYCALLFORM expansion checked.
- CSV role checked as runtime behavior, not passive data.
- Computed FLAG/CFLAG/TFLAG/GLOBAL addresses resolved to semantic aliases.
- Success, failure, cancel, repeat, and limit paths listed.
- ADDCHARA/DELCHARA/LOADGLOBAL/SAVEGLOBAL/BEGIN/RETURN primitive effects listed.
- mapped, source-file-review, and static profile rows challenged.
- Receiver laundering and self-exclusion challenged.
- Runtime trace required; runtimeConsumerId text alone is not trace.

## Worker Instructions For This Milestone

Use workers only for bounded evidence tasks:

- Worker A: attack original inventory completeness.
- Worker B: inspect dynamic calls, CSV roles, and state-family aliases.
- Worker C: verify transfers against receiver manifests.

Workers must return structured candidates, not completion decisions.

## Responsibility Notes From Old Closure

- Advance day/week/month/year/currentTimeSlot and turn counters at the turn boundary.
- Run scheduled event and mission deadline hooks before returning control.
- Run weekly/monthly automatic hook markers and monthly maintenance at the correct rollover.
- Reflect processed event hooks into world event flags without owning downstream event behavior.
- Clear transient session state and keep session data out of save payload roundtrip.

## Do Not Count As Complete

- Gate pass alone.
- Closure count equality.
- mapped or source-file-review rows.
- Owner-name transfer without receiver evidence.
- UI route existence without original state effects.
- Smoke pass without source-level runtime trace.
