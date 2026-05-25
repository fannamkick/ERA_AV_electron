# M32. Character archetype and identity seed

## Objective

Port and recheck this milestone by original erAV transaction/capability units, not by gate pass or owner-name transfer.

Old strict closure status: completed
New split-review status: old-rechecked
Old closure title: Character identity and lifecycle coverage

## Original Source Scope

Canonical source scope is the machine manifest, plus direct review of original ERB/CSV/VariableSize/Chara CSV before any new closure.

Use this split document as navigation only. Do not duplicate the full source-unit row list here; the manifest remains canonical.

## Submilestones

### M32-A. Fixed character identity CSV seed
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

### M32-B. Generated/recruited identity application
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

### M32-C. Profile text/CSTR and naming roundtrip
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

### M32-D. New-game/carryover identity interaction
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

### M32-E. Downstream lifecycle/display contracts
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

## Current Machine Artifacts

- Source-unit manifest: web-port-next/data/coverage/manifests/M32-source-units.json
- Closure artifact: web-port-next/data/coverage/milestones/M32-closure.json
- Gap audit: web-port-next/data/coverage/audits/M32-gap-audit.json
- Phase index: web-port-next/docs/milestones/PHASE_5_M28_M49.ko.md

## Source Inventory Summary

- Total source units: 296
- Implemented-verified under old rules: 289
- Approved-excluded under old rules: 7
- Blocked under old rules: 0
- Open gaps under old gap audit: 0

Status counts from manifest:
- implemented-verified: 289
- approved-excluded: 7

Source kind counts from manifest:
- csv-row: 157
- csv-definition-row: 114
- erb-flow: 16
- save-address: 6
- source-file-review: 3

Top source paths from manifest:
- original-game/ERB/システム関係/SELL_CHARA.ERB: 16
- original-game/CSV/Chara230_リーゼロッテ・パラディスス.csv: 7
- original-game/CSV/Chara06_神田ひより.csv: 6
- original-game/CSV/Chara109_マルチナ・パラディスス.csv: 5
- original-game/CSV/Chara40_庄野そら.csv: 5
- original-game/CSV/Chara24_寺本祐香里.csv: 5
- original-game/CSV/CSTR.csv: 5
- original-game/CSV/Chara207_両島みちる..csv: 5
- original-game/CSV/Chara01_宮間かなで.csv: 5
- original-game/CSV/Chara84_アイリス.csv: 5
- original-game/CSV/Chara95_桐生エレン.csv: 4
- original-game/CSV/Chara210_碧野乃衣瑠.csv: 4
- original-game/CSV/Chara208_春日律花.csv: 4
- original-game/CSV/Chara12_後藤光希.csv: 4
- original-game/CSV/Chara202_小野原あんず.csv: 4
- original-game/CSV/Chara82_リリス.csv: 4
- original-game/CSV/Chara89_西方杏子.csv: 4
- original-game/CSV/Chara206_鏑木紫苑.csv: 4
- original-game/CSV/Chara08_多々良ゆな.csv: 3
- original-game/CSV/Chara07_多々良ひな.csv: 3

## Transfer Contracts

Do not treat approved-excluded as completion. Every transfer must identify:

| sourceUnitId | source effect | from | to | receiver evidence | sender obligation | status |
|---|---|---|---|---|---|---|
| TODO | TODO | M32 | TODO | TODO | TODO | open |

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

- M32 owns character templates, identity fields, CSTR profile text slots and labels, lifecycle flags, and CSTR identity save fields.
- M32 lifecycle includes SELL_CHARA CHECK_SELLASSIABLE CFLAG:1 rank, sale listing filters, and sale-success lifecycle deletion. It does not own sale price formulas, money mutation, event prose, or downstream relationship/body/social side effects.
- M32 does not own TALENT/body trait save semantics, Korean particle/text formatting, or event-generated name behavior; those rows are approved exclusions with receiver milestones.
- Mapped-consumed rows are not completion. Every source unit is represented in M32-source-units as implemented-verified or approved-excluded.

## Do Not Count As Complete

- Gate pass alone.
- Closure count equality.
- mapped or source-file-review rows.
- Owner-name transfer without receiver evidence.
- UI route existence without original state effects.
- Smoke pass without source-level runtime trace.