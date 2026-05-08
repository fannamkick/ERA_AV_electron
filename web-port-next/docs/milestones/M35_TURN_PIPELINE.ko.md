# M35. Turn end, time progression, and automatic hooks

## Objective

Port and recheck this milestone by original erAV transaction/capability units, not by gate pass or owner-name transfer.

Old strict closure status: completed
New split-review status: next-new-method-recheck
Old closure title: Turn end, time progression, and automatic hook pipeline

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
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

### M35-E. Transient session cleanup and save boundary
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

### M35-F. Downstream event/world/economy handoff ledger
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

## Current Machine Artifacts

- Source-unit manifest: web-port-next/data/coverage/manifests/M35-source-units.json
- Closure artifact: web-port-next/data/coverage/milestones/M35-closure.json
- Gap audit: web-port-next/data/coverage/audits/M35-gap-audit.json
- Phase index: web-port-next/docs/milestones/PHASE_5_M28_M49.ko.md

## Source Inventory Summary

- Total source units: 8
- Implemented-verified under old rules: 8
- Approved-excluded under old rules: 0
- Blocked under old rules: 0
- Open gaps under old gap audit: 0

Status counts from manifest:
- implemented-verified: 8

Source kind counts from manifest:
- functional-turn-unit: 8

Top source paths from manifest:
- original-game/ERB/イベント関係/EVENT_TURNEND.ERB: 3
- original-game/ERB/イベント関係/EVENT_AFTERTRAIN.ERB: 2
- original-game/ERB/イベント関係/EVENT_NEXTDAY.ERB: 2
- original-game/ERB/イベント関係/EVENT_PARTICULAR_DAY.ERB: 1

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