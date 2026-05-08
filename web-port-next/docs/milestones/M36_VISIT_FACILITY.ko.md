# M36. Visit and facility flow

## Objective

Port and recheck this milestone by original erAV transaction/capability units, not by gate pass or owner-name transfer.

Old strict closure status: completed
New split-review status: pending-new-method-recheck
Old closure title: Visit places, facilities, and visit actions

## Original Source Scope

Canonical source scope is the machine manifest, plus direct review of original ERB/CSV/VariableSize/Chara CSV before any new closure.

Use this split document as navigation only. Do not duplicate the full source-unit row list here; the manifest remains canonical.

## Submilestones

### M36-A. Visit/facility entrypoint and listing
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

### M36-B. Selection/availability/failure/cancel paths
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

### M36-C. Facility state effects and session trace
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

### M36-D. Save/global side effects
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

### M36-E. Downstream event/story/economy contracts
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

## Current Machine Artifacts

- Source-unit manifest: web-port-next/data/coverage/manifests/M36-source-units.json
- Closure artifact: web-port-next/data/coverage/milestones/M36-closure.json
- Gap audit: web-port-next/data/coverage/audits/M36-gap-audit.json
- Phase index: web-port-next/docs/milestones/PHASE_5_M28_M49.ko.md

## Source Inventory Summary

- Total source units: 93
- Implemented-verified under old rules: 93
- Approved-excluded under old rules: 0
- Blocked under old rules: 0
- Open gaps under old gap audit: 0

Status counts from manifest:
- implemented-verified: 93

Source kind counts from manifest:
- visit-action-source-label: 86
- visit-place-definition: 7

Top source paths from manifest:
- original-game/ERB/訪問関係/SHOP_LABO.ERB: 16
- original-game/ERB/訪問関係/SAKURA_AZITO_DETAIL.ERB: 14
- original-game/ERB/訪問関係/EUNICE_LABO_DETAIL.ERB: 12
- original-game/ERB/訪問関係/HOUMON.ERB: 8
- original-game/ERB/訪問関係/RACHEL_LABO_DETAIL.ERB: 8
- original-game/ERB/訪問関係/KANON_ORDER_DETAIL.ERB: 6
- original-game/ERB/訪問関係/IKUMI_LABO_DETAIL.ERB: 6
- original-game/ERB/訪問関係/MIYAKO_LABO.ERB: 4
- original-game/ERB/訪問関係/KIRYU_GUMI.ERB: 4
- original-game/ERB/訪問関係/AYANO_ORDER_DETAIL.ERB: 3
- original-game/ERB/訪問関係/ELLEN_MISSION_DETAIL.ERB: 3
- original-game/ERB/訪問関係/RACHEL_LABO.ERB: 1
- original-game/ERB/訪問関係/SAKURA_AZITO.ERB: 1
- original-game/ERB/訪問関係/IKUMI_LABO.ERB: 1
- original-game/ERB/訪問関係/KANON_ORDER.ERB: 1
- original-game/ERB/訪問関係/ELLEN_MISSION.ERB: 1
- original-game/ERB/訪問関係/EUNICE_LABO.ERB: 1
- original-game/ERB/訪問関係/IKUMI_LABO_CALC.ERB: 1
- original-game/ERB/訪問関係/MIYAKO_LABO2.ERB: 1
- original-game/ERB/訪問関係/AYANO_ORDER.ERB: 1

## Transfer Contracts

Do not treat approved-excluded as completion. Every transfer must identify:

| sourceUnitId | source effect | from | to | receiver evidence | sender obligation | status |
|---|---|---|---|---|---|---|
| TODO | TODO | M36 | TODO | TODO | TODO | open |

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

- Expose all seven original visit place definitions through the visit route and visit session creation.
- Expose all 86 source-file/source-label visit action groups through selection and confirmation.
- Keep visit selection in GameSession.visit while persisting only completed visit progress, unlocks, event flags, and economy effects through owner save domains.
- Validate unavailable place/action, cost failure, duplicate execution, cancellation, and save roundtrip boundaries.
- Do not claim downstream world event, character/stat, turn, or mission effect internals as M36 completion.

## Do Not Count As Complete

- Gate pass alone.
- Closure count equality.
- mapped or source-file-review rows.
- Owner-name transfer without receiver evidence.
- UI route existence without original state effects.
- Smoke pass without source-level runtime trace.