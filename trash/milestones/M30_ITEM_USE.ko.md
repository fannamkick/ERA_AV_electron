# M30. Immediate item use and special item effects

## Objective

Port and recheck this milestone by original erAV transaction/capability units, not by gate pass or owner-name transfer.

Old strict closure status: completed
New split-review status: old-rechecked-with-fixes
Old closure title: Immediate item use implementation and special training item blocker

## Original Source Scope

Canonical source scope is the machine manifest, plus direct review of original ERB/CSV/VariableSize/Chara CSV before any new closure.

Use this split document as navigation only. Do not duplicate the full source-unit row list here; the manifest remains canonical.

## Submilestones

### M30-A. Immediate-use selection and repeat loop
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

### M30-B. Target-use item success/failure/cancel paths
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

### M30-C. Special item 52 progression and POWERFUL rules
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

### M30-D. State-family writes and save roundtrip
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

### M30-E. Downstream body/event/training effect handoffs
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

## Current Machine Artifacts

- Source-unit manifest: web-port-next/data/coverage/manifests/M30-source-units.json
- Closure artifact: web-port-next/data/coverage/milestones/M30-closure.json
- Gap audit: web-port-next/data/coverage/audits/M30-gap-audit.json
- Phase index: web-port-next/docs/milestones/PHASE_5_M28_M49.ko.md

## Source Inventory Summary

- Total source units: 56
- Implemented-verified under old rules: 19
- Approved-excluded under old rules: 37
- Blocked under old rules: 0
- Open gaps under old gap audit: 0

Status counts from manifest:
- approved-excluded: 37
- implemented-verified: 19

Source kind counts from manifest:
- csv-row: 18
- session-address: 18
- erb-flow: 12
- save-address: 8

Top source paths from manifest:
- original-game/CSV/Item.csv: 36
- original-game/ERB/システム関係/SHOP_ITEM.ERB: 14
- original-game/ERB/システム関係/CHEAT.ERB: 3
- original-game/ERB/イベント関係/GET_SPECIALTALENT.ERB: 1
- original-game/ERB/イベント関係/EVENT_TRAIN_MESSAGE_A.ERB: 1
- original-game/ERB/イベント関係/EGG_ITEM.ERB: 1

## Transfer Contracts

Do not treat approved-excluded as completion. Every transfer must identify:

| sourceUnitId | source effect | from | to | receiver evidence | sender obligation | status |
|---|---|---|---|---|---|---|
| TODO | TODO | M30 | TODO | TODO | TODO | open |

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

- Immediate use items 30/31/38/39/40/41/42/43/52 success, failure, target, cancel, and persistence behavior.
- Special training item 200~214, item 22/90/91 training availability gates, and item 211 clothing/cosplay flow are not M30 completion; they remain tracked as approved exclusions with receiving owner milestones.
- Mapped save/session rows are counted as implemented-verified only when they have runtime consumers and smoke verification inside the M30 item-use flow.

## Do Not Count As Complete

- Gate pass alone.
- Closure count equality.
- mapped or source-file-review rows.
- Owner-name transfer without receiver evidence.
- UI route existence without original state effects.
- Smoke pass without source-level runtime trace.