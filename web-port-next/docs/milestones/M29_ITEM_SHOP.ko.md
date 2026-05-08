# M29. Item shop listing and purchase transaction

## Objective

Port and recheck this milestone by original erAV transaction/capability units, not by gate pass or owner-name transfer.

Old strict closure status: completed
New split-review status: old-rechecked-with-fixes
Old closure title: Item shop purchase coverage

## Original Source Scope

Canonical source scope is the machine manifest, plus direct review of original ERB/CSV/VariableSize/Chara CSV before any new closure.

Use this split document as navigation only. Do not duplicate the full source-unit row list here; the manifest remains canonical.

## Submilestones

### M29-A. Shop listing and ITEMSALES/session buffer
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

### M29-B. Purchase confirm/cancel/failure transaction
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

### M29-C. Money/item/accounting persistence
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

### M29-D. Repeat purchase and quantity limits
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

### M29-E. Downstream item-use handoff ledger
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

## Current Machine Artifacts

- Source-unit manifest: web-port-next/data/coverage/manifests/M29-source-units.json
- Closure artifact: web-port-next/data/coverage/milestones/M29-closure.json
- Gap audit: web-port-next/data/coverage/audits/M29-gap-audit.json
- Phase index: web-port-next/docs/milestones/PHASE_5_M28_M49.ko.md

## Source Inventory Summary

- Total source units: 206
- Implemented-verified under old rules: 101
- Approved-excluded under old rules: 105
- Blocked under old rules: 0
- Open gaps under old gap audit: 0

Status counts from manifest:
- approved-excluded: 105
- implemented-verified: 101

Source kind counts from manifest:
- session-address: 111
- csv-row: 46
- save-address: 34
- erb-flow: 15

Top source paths from manifest:
- original-game/CSV/Item.csv: 134
- original-game/ERB/システム関係/SHOP_ITEM.ERB: 38
- original-game/ERB/システム関係/衣服/COSPLAY.ERB: 4
- original-game/ERB/システム関係/CHEAT.ERB: 4
- original-game/ERB/イベント関係/EGG_ITEM.ERB: 3
- original-game/ERB/イベント関係/EVENT_TRAIN_MESSAGE_A.ERB: 3
- original-game/ERB/イベント関係/EVENT_NEXTDAY.ERB: 3
- original-game/ERB/イベント関係/EVENT_PREGNANCY.ERB: 3
- original-game/ERB/イベント関係/EVENT_TURNEND.ERB: 2
- original-game/ERB/クリアボーナス関係/CLEARBONUS.ERB: 2
- original-game/ERB/イベント関係/BLACKGIRL.ERB: 2
- original-game/ERB/イベント関係/GET_SPECIALTALENT.ERB: 1
- original-game/ERB/システム関係/SHOP_MAIN.ERB: 1
- original-game/ERB/イベント関係/EVENT_ADDICT.ERB: 1
- original-game/CSV/Chara105_ミーナ・クレイン.csv: 1
- original-game/ERB/イベント関係/ENDING.ERB: 1
- original-game/ERB/システム関係/SHOP_YUUKAKU.ERB: 1
- original-game/ERB/イベント関係/SUCCUBUS_STATUS.ERB: 1
- original-game/ERB/システム関係/未使用/SHOP_SLAVE1.ERB: 1

## Transfer Contracts

Do not treat approved-excluded as completion. Every transfer must identify:

| sourceUnitId | source effect | from | to | receiver evidence | sender obligation | status |
|---|---|---|---|---|---|---|
| TODO | TODO | M29 | TODO | TODO | TODO | open |

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

- M29 owns purchase listing definitions, visible listing session state, selected item state, price/money checks, inventory result writes, success/failure/cancel paths, and purchase-result save roundtrip.
- M29 also owns SHOP_ITEM visibility/session selection for immediate-use purchasable items 30/31/38/39/40/41/42/43/52. Their post-selection effects remain M30 item-use responsibility.
- Immediate-use item effects, special item effects, clothing/cosplay packs, recruit listings, event/body effects, and unrelated flags are not M29 completion; they remain tracked as approved exclusions with receiving owner milestones.
- Mapped save/session rows are counted as implemented-verified only when they have runtime consumers and smoke verification inside the M29 purchase flow.

## Do Not Count As Complete

- Gate pass alone.
- Closure count equality.
- mapped or source-file-review rows.
- Owner-name transfer without receiver evidence.
- UI route existence without original state effects.
- Smoke pass without source-level runtime trace.