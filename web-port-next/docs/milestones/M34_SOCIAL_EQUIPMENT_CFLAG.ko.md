# M34. Social, equipment, and CFLAG split responsibility

## Objective

Port and recheck this milestone by original erAV transaction/capability units, not by gate pass or owner-name transfer.

Old strict closure status: completed
New split-review status: old-rechecked
Old closure title: Relationship, CFLAG, equipment, and clothing ownership

## Original Source Scope

Canonical source scope is the machine manifest, plus direct review of original ERB/CSV/VariableSize/Chara CSV before any new closure.

Use this split document as navigation only. Do not duplicate the full source-unit row list here; the manifest remains canonical.

## Submilestones

### M34-A. CFLAG alias and source-family decomposition
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

### M34-B. Social/contact/relationship seed application
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

### M34-C. Equipment/wardrobe availability seed
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

### M34-D. Save/load split and route consumers
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

### M34-E. Inbound M33/M31 CFLAG transfer closure
- Status: open-under-new-split-review
- Original entrypoints/source units: to be filled from canonical manifest and direct original review.
- Required runtime effects: to be filled before implementation/reclosure.
- Implementation claim: none recorded in this split doc yet.
- Runtime trace: none recorded in this split doc yet.
- Transfer contracts: list only source effects that have receiver evidence.

## Current Machine Artifacts

- Source-unit manifest: web-port-next/data/coverage/manifests/M34-source-units.json
- Closure artifact: web-port-next/data/coverage/milestones/M34-closure.json
- Gap audit: web-port-next/data/coverage/audits/M34-gap-audit.json
- Phase index: web-port-next/docs/milestones/PHASE_5_M28_M49.ko.md

## Source Inventory Summary

- Total source units: 2241
- Implemented-verified under old rules: 2241
- Approved-excluded under old rules: 0
- Blocked under old rules: 0
- Open gaps under old gap audit: 0

Status counts from manifest:
- implemented-verified: 2241

Source kind counts from manifest:
- csv-row: 2148
- save-mapping-row: 82
- csv-definition-row: 5
- session-mapping-row: 5
- feature-route: 1

Top source paths from manifest:
- original-game/CSV/VariableSize.CSV: 151
- (blank): 67
- original-game/CSV/Chara95_桐生エレン.csv: 33
- original-game/CSV/Chara85_雛見まゆ.csv: 30
- original-game/CSV/Chara91_宮間かなで.csv: 29
- original-game/CSV/Chara25_三上聖佳.csv: 26
- original-game/CSV/Chara107_赤坂姫乃.csv: 26
- original-game/CSV/Chara09_レイチェル・パラディスス.csv: 25
- original-game/CSV/Chara36_川岸あさひ.csv: 25
- original-game/CSV/Chara29_蒼井遙.csv: 25
- original-game/CSV/Chara152_新堂あゆみ.csv: 25
- original-game/CSV/Chara06_神田ひより.csv: 25
- original-game/CSV/Chara120_操辻蜂香.csv: 24
- original-game/CSV/Chara10_桐生歌音.csv: 24
- original-game/CSV/Chara94_羽瀬川みこと.csv: 24
- original-game/CSV/Chara01_宮間かなで.csv: 23
- original-game/CSV/Chara12_後藤光希.csv: 23
- original-game/CSV/Chara86_ユーニス・パラディスス.csv: 23
- original-game/CSV/Chara121_ミスティ・ブラウン.csv: 23
- original-game/CSV/Chara103_椎名海静.csv: 23

## Transfer Contracts

Do not treat approved-excluded as completion. Every transfer must identify:

| sourceUnitId | source effect | from | to | receiver evidence | sender obligation | status |
|---|---|---|---|---|---|---|
| TODO | TODO | M34 | TODO | TODO | TODO | open |

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

- CFLAG definition labels and legacy split behavior used by runtime wardrobe/social state.
- Character CFLAG and RELATION initial seeds consumed into runtime people, body, equipment, and social state.
- Equipment and clothing save fields consumed through splitLegacyCharacterFlags and wardrobe actions.
- Clothing pack item definitions consumed by wardrobe availability and inventory behavior.
- Item 211 apron definition, save field, and visibility behavior consumed by wardrobe costume selection.
- Wardrobe route, toggle action, costume selection action, save roundtrip, and session-free view behavior.

## Do Not Count As Complete

- Gate pass alone.
- Closure count equality.
- mapped or source-file-review rows.
- Owner-name transfer without receiver evidence.
- UI route existence without original state effects.
- Smoke pass without source-level runtime trace.