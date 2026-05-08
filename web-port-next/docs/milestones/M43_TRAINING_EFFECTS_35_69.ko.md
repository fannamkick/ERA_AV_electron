# M43. Training command effects 35-69

## Objective

Port and recheck this milestone by original erAV transaction/capability units, not by gate pass or owner-name transfer.

Old strict closure status: no-closure-artifact
New split-review status: pending-new-method-recheck
Old closure title: Training command effects 35-69

## Original Source Scope

Canonical source scope is the machine manifest, plus direct review of original ERB/CSV/VariableSize/Chara CSV before any new closure.

Use this split document as navigation only. Do not duplicate the full source-unit row list here; the manifest remains canonical.

## Submilestones

### M43-A. Command 35-69 source/effect inventory
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

### M43-B. Success/failure/result state writes
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

### M43-C. EXP/ABL/TALENT/BASE effect mapping
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

### M43-D. Message/presentation handoff
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

### M43-E. Scenario trace and save roundtrip
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

## Current Machine Artifacts

- Source-unit manifest: web-port-next/data/coverage/manifests/M43-source-units.json
- Closure artifact: web-port-next/data/coverage/milestones/M43-closure.json
- Gap audit: web-port-next/data/coverage/audits/M43-gap-audit.json
- Phase index: web-port-next/docs/milestones/PHASE_5_M28_M49.ko.md

## Source Inventory Summary

- Total source units: 43
- Implemented-verified under old rules:
- Approved-excluded under old rules:
- Blocked under old rules: 40
- Open gaps under old gap audit:

Status counts from manifest:
- blocked: 40
- scope-redesign-required: 3

Source kind counts from manifest:
- training-command-effect: 35
- session-address: 4
- csv-row: 4

Top source paths from manifest:
- original-game/CSV/Item.csv: 8
- original-game\\ERB\\指導関係\\COMF62.ERB: 1
- original-game\\ERB\\指導関係\\COMF64.ERB: 1
- original-game\\ERB\\指導関係\\COMF53.ERB: 1
- original-game\\ERB\\指導関係\\COMF69.ERB: 1
- original-game\\ERB\\指導関係\\COMF38.ERB: 1
- original-game\\ERB\\指導関係\\COMF49.ERB: 1
- original-game\\ERB\\指導関係\\COMF47.ERB: 1
- original-game\\ERB\\指導関係\\COMF43.ERB: 1
- original-game\\ERB\\指導関係\\COMF61.ERB: 1
- original-game\\ERB\\指導関係\\COMF51.ERB: 1
- original-game\\ERB\\指導関係\\COMF59.ERB: 1
- original-game\\ERB\\指導関係\\COMF60.ERB: 1
- original-game\\ERB\\指導関係\\COMF57.ERB: 1
- original-game\\ERB\\指導関係\\COMF58.ERB: 1
- original-game\\ERB\\指導関係\\COMF67.ERB: 1
- original-game\\ERB\\指導関係\\COMF56.ERB: 1
- original-game\\ERB\\指導関係\\COMF48.ERB: 1
- original-game\\ERB\\指導関係\\COMF66.ERB: 1
- original-game\\ERB\\指導関係\\COMF35.ERB: 1

## Transfer Contracts

Do not treat approved-excluded as completion. Every transfer must identify:

| sourceUnitId | source effect | from | to | receiver evidence | sender obligation | status |
|---|---|---|---|---|---|---|
| TODO | TODO | M43 | TODO | TODO | TODO | open |

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