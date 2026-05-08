# M42. Training command effects 0-34

## Objective

Port and recheck this milestone by original erAV transaction/capability units, not by gate pass or owner-name transfer.

Old strict closure status: blocked
New split-review status: pending-new-method-recheck
Old closure title: Training command effects 0-34

## Original Source Scope

Canonical source scope is the machine manifest, plus direct review of original ERB/CSV/VariableSize/Chara CSV before any new closure.

Use this split document as navigation only. Do not duplicate the full source-unit row list here; the manifest remains canonical.

## Submilestones

### M42-A. Command 0-34 source/effect inventory
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

### M42-B. Success/failure/result state writes
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

### M42-C. EXP/ABL/TALENT/BASE effect mapping
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

### M42-D. Message/presentation handoff
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

### M42-E. Scenario trace and save roundtrip
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

## Current Machine Artifacts

- Source-unit manifest: web-port-next/data/coverage/manifests/M42-source-units.json
- Closure artifact: web-port-next/data/coverage/milestones/M42-closure.json
- Gap audit: web-port-next/data/coverage/audits/M42-gap-audit.json
- Phase index: web-port-next/docs/milestones/PHASE_5_M28_M49.ko.md

## Source Inventory Summary

- Total source units: 53
- Implemented-verified under old rules:
- Approved-excluded under old rules:
- Blocked under old rules: 53
- Open gaps under old gap audit: 35

Status counts from manifest:
- blocked: 53

Source kind counts from manifest:
- training-command-effect: 35
- session-address: 9
- csv-row: 9

Top source paths from manifest:
- original-game/CSV/Item.csv: 18
- original-game/ERB/指導関係/COMF23.ERB: 1
- original-game/ERB/指導関係/COMF22.ERB: 1
- original-game/ERB/指導関係/COMF21.ERB: 1
- original-game/ERB/指導関係/COMF16.ERB: 1
- original-game/ERB/指導関係/COMF15.ERB: 1
- original-game/ERB/指導関係/COMF29.ERB: 1
- original-game/ERB/指導関係/COMF17.ERB: 1
- original-game/ERB/指導関係/COMF1.ERB: 1
- original-game/ERB/指導関係/COMF31.ERB: 1
- original-game/ERB/指導関係/COMF5.ERB: 1
- original-game/ERB/指導関係/COMF25.ERB: 1
- original-game/ERB/指導関係/COMF6.ERB: 1
- original-game/ERB/指導関係/COMF26.ERB: 1
- original-game/ERB/指導関係/COMF12.ERB: 1
- original-game/ERB/指導関係/COMF11.ERB: 1
- original-game/ERB/指導関係/COMF34.ERB: 1
- original-game/ERB/指導関係/COMF18.ERB: 1
- original-game/ERB/指導関係/COMF24.ERB: 1
- original-game/ERB/指導関係/COMF30.ERB: 1

## Transfer Contracts

Do not treat approved-excluded as completion. Every transfer must identify:

| sourceUnitId | source effect | from | to | receiver evidence | sender obligation | status |
|---|---|---|---|---|---|---|
| TODO | TODO | M42 | TODO | TODO | TODO | open |

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

- Implement original command 0-34 source calculation behavior.
- Implement param/body/resource/experience result owner behavior.
- Verify success, unavailable, cancel, result application, session cleanup, and save boundary per command.

## Do Not Count As Complete

- Gate pass alone.
- Closure count equality.
- mapped or source-file-review rows.
- Owner-name transfer without receiver evidence.
- UI route existence without original state effects.
- Smoke pass without source-level runtime trace.