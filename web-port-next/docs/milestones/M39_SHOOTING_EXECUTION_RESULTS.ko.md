# M39. Shooting execution, result, and sales

## Objective

Port and recheck this milestone by original erAV transaction/capability units, not by gate pass or owner-name transfer.

Old strict closure status: blocked
New split-review status: pending-new-method-recheck
Old closure title: Filming execution, result, release, and sales state

## Original Source Scope

Canonical source scope is the machine manifest, plus direct review of original ERB/CSV/VariableSize/Chara CSV before any new closure.

Use this split document as navigation only. Do not duplicate the full source-unit row list here; the manifest remains canonical.

## Submilestones

### M39-A. Shooting execution transaction
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

### M39-B. Result calculation and failure/cancel paths
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

### M39-C. Sales/economy/reputation state effects
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

### M39-D. Scene/event hook ordering
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

### M39-E. Save/load and downstream contracts
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

## Current Machine Artifacts

- Source-unit manifest: web-port-next/data/coverage/manifests/M39-source-units.json
- Closure artifact: web-port-next/data/coverage/milestones/M39-closure.json
- Gap audit: web-port-next/data/coverage/audits/M39-gap-audit.json
- Phase index: web-port-next/docs/milestones/PHASE_5_M28_M49.ko.md

## Source Inventory Summary

- Total source units: 174
- Implemented-verified under old rules: 135
- Approved-excluded under old rules:
- Blocked under old rules: 39
- Open gaps under old gap audit: 0

Status counts from manifest:
- implemented-verified: 135
- blocked: 39

Source kind counts from manifest:
- feature: 135
- session-mapping: 21
- save-mapping: 16
- source-file-review: 2

Top source paths from manifest:
- original-game/ERB/ＡＶ撮影関係/SHOP_AV.ERB: 46
- original-game/ERB/ＡＶ撮影関係/撮影シーン関連/SCENE10_AV_SM.ERB: 17
- original-game/ERB/ＡＶ撮影関係/撮影シーン関連/SCENE02_MUSTERBATION.ERB: 16
- original-game/ERB/ＡＶ撮影関係/撮影シーン関連/SCENE04_AV_HARDSEX.ERB: 16
- original-game/ERB/ＡＶ撮影関係/撮影シーン関連/SCENE05_AV_HARDANALSEX.ERB: 15
- original-game/ERB/ＡＶ撮影関係/撮影シーン関連/SCENE03_FELLATIO.ERB: 15
- original-game/ERB/ＡＶ撮影関係/撮影シーン関連/SCENE01_INTERVIEW.ERB: 15
- original-game/ERB/システム関係/ビデオ周り/SET_VIDEOSALE.ERB: 7
- original-game/ERB/システム関係/SHOP_ACTRESS_INFO.ERB: 4
- original-game/ERB/イベント関係/NTR関係/BOYFRIEND.ERB: 4
- original-game/ERB/システム関係/ビデオ周り/SPECIAL_TITLE.ERB: 3
- original-game/ERB/システム関係/ビデオ周り/VIDEO_TITLE.ERB: 2
- original-game/ERB/システム関係/INFORMATION_MASTER.ERB: 2
- original-game/ERB/ＡＶ撮影関係/LIFELIST_AV.ERB: 1
- original-game/ERB/イベント関係/EVENT_AFTERTRAIN.ERB: 1
- original-game/ERB/システム関係/CALC_BEAUTY.ERB: 1
- original-game/ERB/システム関係/INFO.ERB: 1
- original-game/ERB/クリアボーナス関係/CLEARBONUS_BOYFRIEND.ERB: 1
- original-game/ERB/ＡＶ撮影関係/ITEM_AV.ERB: 1
- original-game/ERB/システム関係/SYSTEM_SOURCE_SUB1.ERB: 1

## Transfer Contracts

Do not treat approved-excluded as completion. Every transfer must identify:

| sourceUnitId | source effect | from | to | receiver evidence | sender obligation | status |
|---|---|---|---|---|---|---|
| TODO | TODO | M39 | TODO | TODO | TODO | open |

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

- no old closure responsibility notes available

## Do Not Count As Complete

- Gate pass alone.
- Closure count equality.
- mapped or source-file-review rows.
- Owner-name transfer without receiver evidence.
- UI route existence without original state effects.
- Smoke pass without source-level runtime trace.