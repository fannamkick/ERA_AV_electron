# M44. Training command effects 70+ and post-processing

## Objective

Port and recheck this milestone by original erAV transaction/capability units, not by gate pass or owner-name transfer.

Old strict closure status: no-closure-artifact
New split-review status: pending-new-method-recheck
Old closure title: Training command effects 70+ and post-processing

## Original Source Scope

Canonical source scope is the machine manifest, plus direct review of original ERB/CSV/VariableSize/Chara CSV before any new closure.

Use this split document as navigation only. Do not duplicate the full source-unit row list here; the manifest remains canonical.

## Submilestones

### M44-A. Command 70+ source/effect inventory
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

### M44-B. Shared post-processing transaction
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

### M44-C. Scope-redesign candidates and primitive effects
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

### M44-D. Message/presentation handoff
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

### M44-E. Scenario trace and save roundtrip
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

## Current Machine Artifacts

- Source-unit manifest: web-port-next/data/coverage/manifests/M44-source-units.json
- Closure artifact: web-port-next/data/coverage/milestones/M44-closure.json
- Gap audit: web-port-next/data/coverage/audits/M44-gap-audit.json
- Phase index: web-port-next/docs/milestones/PHASE_5_M28_M49.ko.md

## Source Inventory Summary

- Total source units: 63
- Implemented-verified under old rules:
- Approved-excluded under old rules:
- Blocked under old rules: 40
- Open gaps under old gap audit:

Status counts from manifest:
- blocked: 40
- scope-redesign-required: 23

Source kind counts from manifest:
- training-command-effect: 58
- named-training-effect-source: 3
- session-address: 1
- csv-row: 1

Top source paths from manifest:
- (blank): 11
- original-game/CSV/Item.csv: 2
- original-game\\ERB\\指導関係\\COMF92.ERB: 1
- original-game\\ERB\\指導関係\\COMF132.ERB: 1
- original-game\\ERB\\指導関係\\COMF72.ERB: 1
- original-game\\ERB\\指導関係\\COMF130.ERB: 1
- original-game\\ERB\\指導関係\\COMF140.ERB: 1
- original-game\\ERB\\指導関係\\COMF71.ERB: 1
- original-game\\ERB\\指導関係\\COMF128.ERB: 1
- original-game\\ERB\\指導関係\\COMF82.ERB: 1
- original-game\\ERB\\指導関係\\COMF_VAGINASEX.ERB: 1
- original-game\\ERB\\指導関係\\COMF143.ERB: 1
- original-game\\ERB\\指導関係\\COMF136.ERB: 1
- original-game\\ERB\\指導関係\\COMF138.ERB: 1
- original-game\\ERB\\指導関係\\COMF121.ERB: 1
- original-game\\ERB\\指導関係\\COMF129.ERB: 1
- original-game\\ERB\\指導関係\\COMF152.ERB: 1
- original-game\\ERB\\指導関係\\COMF90.ERB: 1
- original-game\\ERB\\指導関係\\COMF122.ERB: 1
- original-game\\ERB\\指導関係\\COMF84.ERB: 1

## Transfer Contracts

Do not treat approved-excluded as completion. Every transfer must identify:

| sourceUnitId | source effect | from | to | receiver evidence | sender obligation | status |
|---|---|---|---|---|---|---|
| TODO | TODO | M44 | TODO | TODO | TODO | open |

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