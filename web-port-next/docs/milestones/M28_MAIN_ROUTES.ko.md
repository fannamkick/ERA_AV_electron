# M28. Main routes and required screen connections

## Objective

Port and recheck this milestone by original erAV transaction/capability units, not by gate pass or owner-name transfer.

Old strict closure status: completed
New split-review status: old-rechecked
Old closure title: Main screen route coverage

## Original Source Scope

Canonical source scope is the machine manifest, plus direct review of original ERB/CSV/VariableSize/Chara CSV before any new closure.

Use this split document as navigation only. Do not duplicate the full source-unit row list here; the manifest remains canonical.

## Submilestones

### M28-A. Entry route/menu transaction inventory
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

### M28-B. Route transition success/failure/cancel matrix
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

### M28-C. Session/view state trace
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

### M28-D. Save boundary and roundtrip checks
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

### M28-E. Downstream route handoff ledger
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

## Current Machine Artifacts

- Source-unit manifest: web-port-next/data/coverage/manifests/M28-source-units.json
- Closure artifact: web-port-next/data/coverage/milestones/M28-closure.json
- Gap audit: web-port-next/data/coverage/audits/M28-gap-audit.json
- Phase index: web-port-next/docs/milestones/PHASE_5_M28_M49.ko.md

## Source Inventory Summary

- Total source units: 27
- Implemented-verified under old rules: 24
- Approved-excluded under old rules: 3
- Blocked under old rules: 0
- Open gaps under old gap audit: 0

Status counts from manifest:
- implemented-verified: 24
- approved-excluded: 3

Source kind counts from manifest:
- erb-label: 24
- session-address: 3

Top source paths from manifest:
- original-game/ERB/システム関係/SHOP_MAIN.ERB: 24
- original-game/ERB/イベント関係/NTR関係/BOYFRIEND.ERB: 3

## Transfer Contracts

Do not treat approved-excluded as completion. Every transfer must identify:

| sourceUnitId | source effect | from | to | receiver evidence | sender obligation | status |
|---|---|---|---|---|---|---|
| TODO | TODO | M28 | TODO | TODO | TODO | open |

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

- All 24 original SHOP_MAIN main-menu option rows are accounted.
- Enabled rows have runtime definitions, action ids, route ids, dispatch consumers, route consumers, and smoke verification.
- Disabled rows remain visible as disabled route contracts with explicit future owner milestones and disabled reasons.
- BOYFRIEND event-local TCVAR rows are excluded from M28 ownership and recorded as M47 event/world responsibility.

## Do Not Count As Complete

- Gate pass alone.
- Closure count equality.
- mapped or source-file-review rows.
- Owner-name transfer without receiver evidence.
- UI route existence without original state effects.
- Smoke pass without source-level runtime trace.