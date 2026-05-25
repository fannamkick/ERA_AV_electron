# M33. Body, ability, talent, and experience seed

## Objective

Port and recheck this milestone by original erAV transaction/capability units, not by gate pass or owner-name transfer.

Old strict closure status: completed
New split-review status: old-rechecked
Old closure title: Body, stat, ability, talent, experience coverage

## Original Source Scope

Canonical source scope is the machine manifest, plus direct review of original ERB/CSV/VariableSize/Chara CSV before any new closure.

Use this split document as navigation only. Do not duplicate the full source-unit row list here; the manifest remains canonical.

## Submilestones

### M33-A. BASE/MAXBASE seed and overwrite rules
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

### M33-B. ABL/TALENT/EXP seed application
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

### M33-C. Generated character stat pipeline
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

### M33-D. Save/load and character bundle consistency
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

### M33-E. CFLAG/equipment/social handoff boundaries
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

## Current Machine Artifacts

- Source-unit manifest: web-port-next/data/coverage/manifests/M33-source-units.json
- Closure artifact: web-port-next/data/coverage/milestones/M33-closure.json
- Gap audit: web-port-next/data/coverage/audits/M33-gap-audit.json
- Phase index: web-port-next/docs/milestones/PHASE_5_M28_M49.ko.md

## Source Inventory Summary

- Total source units: 5357
- Implemented-verified under old rules: 5281
- Approved-excluded under old rules: 76
- Blocked under old rules: 0
- Open gaps under old gap audit: 0

Status counts from manifest:
- implemented-verified: 5281
- approved-excluded: 76

Source kind counts from manifest:
- csv-row: 4768
- csv-definition-row: 421
- save-address: 168

Top source paths from manifest:
- original-game/CSV/Talent.csv: 261
- (blank): 111
- original-game/CSV/exp.csv: 82
- original-game/CSV/Chara120_操辻蜂香.csv: 78
- original-game/CSV/Chara109_マルチナ・パラディスス.csv: 75
- original-game/CSV/Chara230_リーゼロッテ・パラディスス.csv: 60
- original-game/CSV/Chara240_鉢堂陽菜.csv: 59
- original-game/CSV/Chara121_ミスティ・ブラウン.csv: 59
- original-game/CSV/Chara95_桐生エレン.csv: 59
- original-game/CSV/Chara106_槇原さち.csv: 58
- original-game/CSV/Chara86_ユーニス・パラディスス.csv: 57
- original-game/CSV/Chara84_アイリス.csv: 57
- original-game/CSV/Chara80_新島みひろ.csv: 57
- original-game/CSV/Chara82_リリス.csv: 55
- original-game/CSV/Chara24_寺本祐香里.csv: 55
- original-game/CSV/Chara91_宮間かなで.csv: 55
- original-game/CSV/Chara20_赤羽真理.csv: 54
- original-game/CSV/Chara207_両島みちる..csv: 53
- original-game/CSV/Chara17_宮間未依.csv: 53
- original-game/CSV/Chara150_佐倉由希.csv: 52

## Transfer Contracts

Do not treat approved-excluded as completion. Every transfer must identify:

| sourceUnitId | source effect | from | to | receiver evidence | sender obligation | status |
|---|---|---|---|---|---|---|
| TODO | TODO | M33 | TODO | TODO | TODO | open |

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

- M33 owns BASE/ABL/TALENT/EXP/MARK/PALAM definitions, Chara BASE/ABL/TALENT/EXP seeds, and body/stat/trait/experience save fields.
- M33 does not own CFLAG/FLAG/PBAND condition, relationship, mission, or equipment semantics; those rows are approved exclusions with M34 receiver responsibility.
- Mapped-consumed rows and transferred-out rows are not completion. Every source unit is represented in M33-source-units as implemented-verified or approved-excluded.

## Do Not Count As Complete

- Gate pass alone.
- Closure count equality.
- mapped or source-file-review rows.
- Owner-name transfer without receiver evidence.
- UI route existence without original state effects.
- Smoke pass without source-level runtime trace.