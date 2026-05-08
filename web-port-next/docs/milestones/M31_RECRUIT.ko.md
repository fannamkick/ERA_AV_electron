# M31. Recruit listing, purchase, and generated character transaction

## Objective

Port and recheck this milestone by original erAV transaction/capability units, not by gate pass or owner-name transfer.

Old strict closure status: completed
New split-review status: old-rechecked-with-known-residual-risk
Old closure title: Recruit listing and character creation coverage

## Original Source Scope

Canonical source scope is the machine manifest, plus direct review of original ERB/CSV/VariableSize/Chara CSV before any new closure.

Use this split document as navigation only. Do not duplicate the full source-unit row list here; the manifest remains canonical.

## Submilestones

### M31-A. General recruit listing/selection transaction
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

### M31-B. Purchase failure/cancel/roster/money/duplicate paths
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

### M31-C. Purchase success character bundle creation
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

### M31-D. Interview advertisement draft/next-person/confirm flow
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

### M31-E. Recruit flags/GLOBAL/history/save roundtrip
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

### M31-F. Post-recruit event and downstream domain contracts
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

## Current Machine Artifacts

- Source-unit manifest: web-port-next/data/coverage/manifests/M31-source-units.json
- Closure artifact: web-port-next/data/coverage/milestones/M31-closure.json
- Gap audit: web-port-next/data/coverage/audits/M31-gap-audit.json
- Phase index: web-port-next/docs/milestones/PHASE_5_M28_M49.ko.md

## Source Inventory Summary

- Total source units: 237
- Implemented-verified under old rules: 153
- Approved-excluded under old rules: 84
- Blocked under old rules: 0
- Open gaps under old gap audit: 0

Status counts from manifest:
- implemented-verified: 153
- approved-excluded: 84

Source kind counts from manifest:
- save-address: 85
- session-address: 75
- csv-row: 48
- erb-flow: 27
- source-file-review: 2

Top source paths from manifest:
- original-game/CSV/Item.csv: 96
- original-game/ERB/システム関係/面接/INTERVIEW.ERB: 26
- original-game/ERB/システム関係/SELL_CHARA.ERB: 22
- original-game/CSV/Chara01_宮間かなで.csv: 11
- original-game/ERB/イベント関係/EVENT_AFTERTRAIN.ERB: 10
- original-game/ERB/システム関係/SELL_CHARA_ESTIMATE.ERB: 7
- original-game/ERB/イベント関係/ADD_ANGEL.ERB: 7
- original-game/ERB/システム関係/未使用/SHOP_SLAVE1.ERB: 6
- original-game/ERB/システム関係/SHOP_CHARABUY.ERB: 5
- original-game/ERB/イベント関係/EVENT_PREGNANCY.ERB: 4
- original-game/ERB/イベント関係/EVENT_NEXTDAY.ERB: 3
- original-game/CSV/Chara0.csv: 3
- original-game/CSV/Chara07_多々良ひな.csv: 2
- original-game/ERB/イベント関係/CALC_COOKING.ERB: 2
- original-game/ERB/イベント関係/EVENT_TRAIN_MESSAGE_B.ERB: 2
- original-game/ERB/イベント関係/NTR関係/BADBOY_RAPE.ERB: 2
- original-game/CSV/Chara09_レイチェル・パラディスス.csv: 2
- original-game/ERB/イベント関係/EVENT_ADDICT.ERB: 2
- original-game/ERB/イベント関係/GET_SPECIALTALENT.ERB: 2
- original-game/CSV/Chara06_神田ひより.csv: 2

## Transfer Contracts

Do not treat approved-excluded as completion. Every transfer must identify:

| sourceUnitId | source effect | from | to | receiver evidence | sender obligation | status |
|---|---|---|---|---|---|---|
| TODO | TODO | M31 | TODO | TODO | TODO | open |

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

- M31 owns recruit listing definitions, visible recruit listing session state, listing-to-template mapping, price/money checks, duplicate/repeat/roster failure, cancel, recruit session buffers, and creation of people/body/social/equipment containers.
- M31 owns character-template initial values when recruit creation consumes CSV/Chara source rows into the generated character bundle.
- Downstream field semantics, character sale/lifecycle, event hooks, unused source paths, and aggregate source-file-review rows are not counted as M31 implementation unless recruit creation directly consumes a CSV/Chara initial row into the generated bundle.
- Every approved exclusion remains visible in the source-unit manifest; receiver-owned exclusions must be present in the receiving owner manifest.

## Do Not Count As Complete

- Gate pass alone.
- Closure count equality.
- mapped or source-file-review rows.
- Owner-name transfer without receiver evidence.
- UI route existence without original state effects.
- Smoke pass without source-level runtime trace.