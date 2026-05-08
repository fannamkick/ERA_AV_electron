# M38. Shooting definitions and screen conditions

## Objective

Port and recheck this milestone by original erAV transaction/capability units, not by gate pass or owner-name transfer.

Old strict closure status: blocked
New split-review status: pending-new-method-recheck
Old closure title: Filming scene definitions and scene conditions

## Original Source Scope

Canonical source scope is the machine manifest, plus direct review of original ERB/CSV/VariableSize/Chara CSV before any new closure.

Use this split document as navigation only. Do not duplicate the full source-unit row list here; the manifest remains canonical.

## Submilestones

### M38-A. Shooting definition source inventory
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

### M38-B. Screen/listing condition transaction
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

### M38-C. Dynamic scene dispatch registry
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

### M38-D. Definition-to-runtime mapping
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

### M38-E. Downstream shooting execution contracts
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

## Current Machine Artifacts

- Source-unit manifest: web-port-next/data/coverage/manifests/M38-source-units.json
- Closure artifact: web-port-next/data/coverage/milestones/M38-closure.json
- Gap audit: web-port-next/data/coverage/audits/M38-gap-audit.json
- Phase index: web-port-next/docs/milestones/PHASE_5_M28_M49.ko.md

## Source Inventory Summary

- Total source units: 6
- Implemented-verified under old rules:
- Approved-excluded under old rules:
- Blocked under old rules: 6
- Open gaps under old gap audit: 0

Status counts from manifest:
- blocked: 6

Source kind counts from manifest:
- definition: 6

Top source paths from manifest:
- original-game/ERB/ＡＶ撮影関係/撮影シーン関連/SCENE03_FELLATIO.ERB: 1
- original-game/ERB/ＡＶ撮影関係/撮影シーン関連/SCENE01_INTERVIEW.ERB: 1
- original-game/ERB/ＡＶ撮影関係/撮影シーン関連/SCENE02_MUSTERBATION.ERB: 1
- original-game/ERB/ＡＶ撮影関係/撮影シーン関連/SCENE04_AV_HARDSEX.ERB: 1
- original-game/ERB/ＡＶ撮影関係/撮影シーン関連/SCENE05_AV_HARDANALSEX.ERB: 1
- original-game/ERB/ＡＶ撮影関係/撮影シーン関連/SCENE10_AV_SM.ERB: 1

## Transfer Contracts

Do not treat approved-excluded as completion. Every transfer must identify:

| sourceUnitId | source effect | from | to | receiver evidence | sender obligation | status |
|---|---|---|---|---|---|---|
| TODO | TODO | M38 | TODO | TODO | TODO | open |

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