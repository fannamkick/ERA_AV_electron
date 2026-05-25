# M37. Work, creative, and special work flow

## Objective

Port and recheck this milestone by original erAV transaction/capability units, not by gate pass or owner-name transfer.

Old strict closure status: blocked
New split-review status: pending-new-method-recheck
Old closure title: Work, brothel, side job, and special work execution

## Original Source Scope

Canonical source scope is the machine manifest, plus direct review of original ERB/CSV/VariableSize/Chara CSV before any new closure.

Use this split document as navigation only. Do not duplicate the full source-unit row list here; the manifest remains canonical.

## Submilestones

### M37-A. Work command listing and availability
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

### M37-B. Creative/special work dispatch family
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

### M37-C. Success/failure/result state effects
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

### M37-D. Reward/economy/stat side effects
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

### M37-E. Downstream event/mission/story handoffs
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

## Current Machine Artifacts

- Source-unit manifest: web-port-next/data/coverage/manifests/M37-source-units.json
- Closure artifact: web-port-next/data/coverage/milestones/M37-closure.json
- Gap audit: web-port-next/data/coverage/audits/M37-gap-audit.json
- Phase index: web-port-next/docs/milestones/PHASE_5_M28_M49.ko.md

## Source Inventory Summary

- Total source units: 463
- Implemented-verified under old rules: 333
- Approved-excluded under old rules: 0
- Blocked under old rules: 130
- Open gaps under old gap audit: 0

Status counts from manifest:
- implemented-verified: 333
- blocked: 130

Source kind counts from manifest:
- feature: 286
- save-mapping: 161
- definition: 8
- session-mapping: 6
- save-address: 2

Top source paths from manifest:
- original-game/ERB/娼館関係/WORK_S_SEXORGY.ERB: 52
- original-game/ERB/娼館関係/WORK_S_LUNCHSTALL.ERB: 32
- original-game/ERB/システム関係/SHOP_YUUKAKU.ERB: 30
- original-game/ERB/娼館関係/WORK_RECEPTION.ERB: 29
- original-game/ERB/システム関係/アルバイト関係/ARBEIT.ERB: 22
- original-game/ERB/イベント関係/EVENT_WORK_MESSAGE_SP.ERB: 20
- original-game/ERB/娼館関係/WORK_S_STRIP.ERB: 18
- original-game/CSV/Chara01_宮間かなで.csv: 15
- original-game/ERB/娼館関係/WORK_S_CONCERT.ERB: 13
- original-game/ERB/イベント関係/ADD_ANGEL.ERB: 12
- original-game/ERB/システム関係/アルバイト関係/ARBEIT_01_KANON.ERB: 11
- original-game/ERB/システム関係/アルバイト関係/ARBEIT_07_OTOHA.ERB: 11
- original-game/ERB/システム関係/アルバイト関係/ARBEIT_06_AYESHA.ERB: 11
- original-game/ERB/システム関係/アルバイト関係/ARBEIT_03_YUKAKO.ERB: 10
- original-game/ERB/システム関係/アルバイト関係/ARBEIT_04_HARUNO.ERB: 10
- original-game/ERB/システム関係/アルバイト関係/ARBEIT_05_ELENA.ERB: 10
- original-game/ERB/システム関係/アルバイト関係/ARBEIT_08_MARI.ERB: 10
- original-game/ERB/システム関係/アルバイト関係/ARBEIT_02_SAORI.ERB: 10
- original-game/ERB/娼館関係/WORK_S_KBPLAY.ERB: 9
- original-game/ERB/イベント関係/BLACKGIRL.ERB: 9

## Transfer Contracts

Do not treat approved-excluded as completion. Every transfer must identify:

| sourceUnitId | source effect | from | to | receiver evidence | sender obligation | status |
|---|---|---|---|---|---|---|
| TODO | TODO | M37 | TODO | TODO | TODO | open |

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

- Implement the full work/brothel/side-job/special-work source behavior, not only source labels and dispatch rows.
- Close work result save-field effects only when source behavior is implemented and verified.
- Do not count mapped save/session/calculation rows as M37 completion evidence.
- Resolve inbound M29 CFLAG:401 and FLAG:41 inside M37 or explicitly redesign ownership before completion.

## Do Not Count As Complete

- Gate pass alone.
- Closure count equality.
- mapped or source-file-review rows.
- Owner-name transfer without receiver evidence.
- UI route existence without original state effects.
- Smoke pass without source-level runtime trace.