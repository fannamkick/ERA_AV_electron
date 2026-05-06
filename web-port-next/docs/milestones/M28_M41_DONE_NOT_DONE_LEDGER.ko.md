# M28~M41 완료/미완료 사실 장부

## 2026-05-06 M28/M29/M31 source-owner corrections complete

M28/M29/M31 correction pass is complete under the strict source-unit manifest rule.

- M28 remains strict-closed. Its 3 BOYFRIEND event-local rows are exact blocked inbound units in M47.
- M29 is strict-closed: total 206, implemented-verified 101, approved-excluded 105, blocked 0, completedAllowedNow true.
- M31 is strict-closed: total 237, implemented-verified 153, approved-excluded 84, blocked 0, completedAllowedNow true.
- M47 is now total 13, blocked 13.
- Next strict target: M37, then M38~M41. M42 is not resumed yet.

## 2026-05-06 M36 strict closure complete

M36 is now complete under the strict source-unit manifest rule.

- Manifest: `data/coverage/manifests/M36-source-units.json`
- Closure: `data/coverage/milestones/M36-closure.json`
- Coverage: `data/coverage/visit-facility-coverage.json`
- Summary: total 93, implemented-verified 93, approved-excluded 0, blocked 0, scope-redesign-required 0, completedAllowedNow true.
- M36 ownedTotal is 93 visit/facility source units: 86 visit action groups and 7 visit place definitions.
- The old mixed row closure is corrected: 559 coverage rows remain row evidence, and mapped visit place definitions are no longer completion evidence.
- `npm run gate:visit-facility` passes with 93 strict source units and 559 row-evidence rows.
- `npm run gate:milestone-scope-closure -- M36` passes with `responsibilityIntegrity`.
- Next strict target: M37.

## 2026-05-06 M34.5 strict closure complete

M34.5 is now closed under the strict source-unit manifest rule.

- Manifest: `data/coverage/manifests/M34.5-source-units.json`
- Closure: `data/coverage/milestones/M34.5-closure.json`
- Summary: total 188, implemented-verified 188, approved-excluded 0, blocked 0, scope-redesign-required 0, `completedAllowedNow: true`.
- M34.5 ownedTotal is 188 substantive hardening units: 169 evidence corrections and 19 registry contracts. The closure responsibilityIntegrity check is mandatory but is not counted as a source unit.
- This closes verification/hardening scope only. It does not implement M35-M52 feature runtime behavior.
- Next strict target: M35 turn/time/hook/session cleanup closure correction.

## 2026-05-06 M34 strict closure complete

M34 is now closed under the strict source-unit manifest rule.

- Manifest: `data/coverage/manifests/M34-source-units.json`
- Closure: `data/coverage/milestones/M34-closure.json`
- Coverage: `data/coverage/social-equipment-cflag-coverage.json`
- Summary: total 2,247, implemented-verified 2,247, approved-excluded 0, blocked 0, scope-redesign-required 0, `completedAllowedNow: true`.
- M34 ownedTotal is 2,247 social/equipment/CFLAG source units: CFLAG definitions, CFLAG/RELATION seeds, equipment/clothing save rows, clothing session view rows, wardrobe route behavior, and item 211 apron costume behavior.
- M33 CFLAG/FLAG/PBAND 79 rows and M30/M29/M31 inbound clothing/equipment rows are no longer blocked inbound; they are accepted and closed by M34 implementation evidence.
- M34 gate forbids `mapped`, `transferred`, and `source-file-review` statuses as completion evidence.
- Next strict target: M37~M41 before M42 resumes.

## 2026-05-05 책임 명시/freeze 우선

M32~M34.5 are strict-closed. M28 has exact M47 inbound correction, and M31 has self-exclusion correction. Next work stays inside the existing `PHASE_5_M28_M49.ko.md` milestone sections; do not create a replacement ledger.

각 남은 마일스톤은 구현 전에 아래를 먼저 남긴다.

- owned runtime responsibility
- source-unit manifest path
- owned unit count
- approved-excluded 후보와 이유
- other-owner 후보와 receiver manifest 상태
- 완료 금지 상태: `mapped`, `source-file-review`, `transferredOut`, owner-only row, 예정 verification only

작업 중 책임 이관으로 완료 범위를 줄이지 않는다. 이관이 필요해 보이면 구현을 멈추고 `scope-redesign-required`로 막은 뒤 책임 지도와 receiver manifest를 먼저 고친다.

## 2026-05-05 M31 strict closure update

M31 is now closed under the strict source-unit manifest rule after source-owner correction.

- Manifest: `data/coverage/manifests/M31-source-units.json`
- Closure: `data/coverage/milestones/M31-closure.json`
- Summary: total 237, implemented-verified 153, approved-excluded 84, blocked 0, scope-redesign-required 0, completedAllowedNow true.
- M31 ownedTotal is now 153: recruit listing/flow/session rows plus M31-owned recruit creation integration rows.
- 84 non-M31 lifecycle/event/downstream rows remain approved-excluded. Creation result integration rows are M31-owned and are now verified through generated character initial field application.
- Receiver-owned excluded rows remain visible, but M33/M34/M35 seed rows are no longer enough to close M31 without M31 integration verification.
- `npm run gate:recruit-coverage` and `npm run gate:milestone-scope-closure -- M31` pass under the corrected closure.
- `npm run gate:recruit-coverage` now fails if an M31 receiver-owned exclusion is missing from the receiver manifest.
- `npm run gate:milestone-scope-closure -- M31` passes because M31 closure status is `completed`.

## 2026-05-02 M30 strict closure update

M30 is now complete under the strict source-unit manifest rule.

- Manifest: `data/coverage/manifests/M30-source-units.json`
- Closure: `data/coverage/milestones/M30-closure.json`
- Summary: total 74, implemented-verified 37, approved-excluded 37, blocked 0, scope-redesign-required 0, completedAllowedNow true.
- M30 ownedTotal is 37 immediate item-use flow/effect rows, not the old mixed 74-row queue total.
- The 37 non-M30 special training, clothing/cosplay, and training availability rows are excluded from M30 ownership and remain assigned to receiving owner milestones.
- All 37 excluded rows now have explicit blocked inbound responsibility in receiver manifests: M34 3, M41 6, M42 18, M43 8, M44 2.
- `npm run gate:item-use-coverage` passes with source 74, M30-owned 37, implemented-verified 37, approved-excluded 37.
- `npm run gate:item-use-coverage` now fails if an M30 transfer row is missing from the receiver manifest.
- `npm run gate:milestone-scope-closure -- M30` passes with `responsibilityIntegrity`.

## 2026-05-02 M29 strict closure update

M29 is now closed under the strict source-unit manifest rule after source-owner correction.

- Manifest: `data/coverage/manifests/M29-source-units.json`
- Closure: `data/coverage/milestones/M29-closure.json`
- Summary: total 206, implemented-verified 101, approved-excluded 105, blocked 0, scope-redesign-required 0, completedAllowedNow true.
- M29 ownedTotal is now 101: 83 existing purchase rows plus 18 reclaimed immediate-use purchasable listing/ITEMSALES rows.
- The remaining 105 non-purchase/equipment/recruit/event/downstream rows are excluded from M29 ownership and remain assigned to receiving owner milestones.
- Immediate-use item effects transfer to M30, but item 30/31/38/39/40/41/42/43/52 definition/ITEMSALES listing rows are M29-owned implemented-verified.
- Newly added receiver rows are blocked, not completed: M32 +4, M37 +2, M47 +4, M48 +1, M49 +1.
- `npm run gate:shop-purchase-coverage` verifies the 18 reclaimed M29-owned rows.
- `npm run gate:shop-purchase-coverage` now fails if an M29 transfer row is missing from the receiver manifest.
- `npm run gate:milestone-scope-closure -- M29` passes because M29 closure status is `completed`.

## 2026-05-02 M28 strict closure update

M28 is now complete under the strict source-unit manifest rule.

- Manifest: `data/coverage/manifests/M28-source-units.json`
- Closure: `data/coverage/milestones/M28-closure.json`
- Summary: total 27, implemented-verified 24, approved-excluded 3, blocked 0, scope-redesign-required 0, completedAllowedNow true.
- M28 ownedTotal is 24 route contract rows, not the old mixed 27-row queue total.
- BOYFRIEND event-local session rows are excluded from M28 ownership and remain M47 responsibility.
- `npm run gate:milestone-scope-closure -- M28` passes with `responsibilityIntegrity`.

## 2026-05-02 M35-M41 source-unit manifest pass 1

Artifacts:
- `data/coverage/manifests/M35-source-units.json`
- `data/coverage/manifests/M36-source-units.json`
- `data/coverage/manifests/M37-source-units.json`
- `data/coverage/manifests/M38-source-units.json`
- `data/coverage/manifests/M39-source-units.json`
- `data/coverage/manifests/M40-source-units.json`
- `data/coverage/manifests/M41-source-units.json`

| M | manifest total | `implemented-verified` | `blocked` | `scope-redesign-required` | completable now | strict finding |
| --- | ---: | ---: | ---: | ---: | --- | --- |
| M35 | 8 | 8 | 0 | 0 | yes | Strict closure complete. The old 7 save-field mapped rows are supporting evidence only; 8 functional turn pipeline units are implemented-verified. |
| M36 | 93 | 93 | 0 | 0 | yes | Strict closure complete. The old 559 row coverage is row evidence only; 86 visit action groups and 7 visit place definitions are implemented-verified. |
| M37 | 463 | 316 | 147 | 0 | no | 286 work feature rows, 8 work definitions, 21 work result write-effect rows, and 1 LUNCH_STALL ABL:74 reward read row are implemented-verified. Remaining save/session/calculation/source-address rows remain blocked. |
| M38 | 6 | 0 | 6 | 0 | no | All six filming scene definitions are mapped-only, so none are completed under the strict rule. |
| M39 | 174 | 135 | 39 | 0 | no | 135 filming execution feature rows are completion candidates. Save/session/calculation/source-file-review mapped rows remain blocked. |
| M40 | 11 | 5 | 6 | 0 | no | Five training session lifecycle rows are completion candidates. Six wait/format/status mapped rows remain blocked. |
| M41 | 1,631 | 4 | 1,626 | 1 | no | Only four COMSEQ dynamic-call rows are completion candidates. COM_ABLE branch conditions, success returns, source programs, M30 inbound training availability rows, and COMORDER review remain unresolved. |

Next actions:
- M35: split `turn/end` into clock advance, mission deadline, scheduled event, weekly/monthly hook, world hook, and save boundary source units.
- M36: complete. The seven visit place definitions were promoted with source evidence, runtime consumer evidence, and `smoke:visit-all`.
- M37: implement or explicitly redesign 147 blocked units with owner-specific runtime/save verification. Do not promote mapped save/session/calculation rows without source behavior evidence.
- M38: re-verify the six scene definitions as source-unit definitions, not mapped rows.
- M39: decompose two source-file-review rows and verify 37 save/session/calculation mapped rows row-by-row.
- M40: close six mapped wait/format/status rows with source-unit evidence and responsibilityIntegrity.
- M41: do not complete COM_ABLE availability until branch/AST/state-reference verification exists.


이 문서는 gate가 아니다. 목적은 각 마일스톤에서 "완료했다고 처리한 것"과 "하지 않았거나 다른 마일스톤으로 넘긴 것"을 사람이 바로 보게 만드는 것이다.

완료/차단/책임 재설계 판정은 `RESPONSIBILITY_SEPARATION_RULES.ko.md`를 따른다.

작성 기준:
- `완료로 처리한 것`: runtime consumer와 coverage/gate/smoke 근거가 있는 것.
- `안 했거나 넘긴 것`: `transferredOut`, `mapped` 중 실제 기능 구현이 아닌 분류/owner 확정, 명시적으로 다음 마일스톤 소유로 남긴 것.
- `재확인 필요`: 문서 책임과 산출물 표현이 어긋나거나, 완료 판정이 너무 넓게 보이는 것.

현재 공통 상태:
- M28은 2026-05-02 strict closure 재검증 기준으로 통과했다.
- M29와 M30은 2026-05-02 strict closure 재검증 기준으로 통과했고, approved-excluded row는 수신 manifest inbound로 명시했다.
- M37~M41의 closure는 `responsibilityIntegrity` 보강 또는 blocked/scope-redesign-required 정정이 필요하다. M35와 M36은 2026-05-06 strict closure로 닫혔다.
- 따라서 이 장부는 "기능 검증 결과가 존재한다"와 "현재 완료 판정은 보강 필요하다"를 분리해서 읽어야 한다.
- 2026-05-02 기준, `[구현]` 마일스톤의 `transferredOut`은 완료가 아니라 미완료 또는 책임 재설계 신호로 본다.

## 2026-05-02 원본 단위 매니페스트 기준 재판정

재판정 기준:
- `PORT_RESPONSIBILITY_MAP.ko.md`의 `스킵 방지 계약`에 따라 원본 단위 매니페스트가 없으면 완료 유지가 불가능하다.
- `[구현]` 마일스톤의 `mapped`, `source-file-review`, `transferredOut`, 예정 consumer/verification은 완료 근거가 아니다.
- 아래 판정은 "기존 구현이 모두 무효"라는 뜻이 아니라, "새 완료 기준으로 completed를 유지할 수 없음"을 뜻한다.

| M | 기존 closure 상태 | 새 판정 | M42 전 차단 | 핵심 사유 | 다음 조치 |
| --- | --- | --- | --- | --- | --- |
| M28 | completed, implemented 24, approved-excluded 3 | completed | 아니오 | strict closure 완료. `responsibilityIntegrity` 있음 | route/action/view 24개는 M28 소유 완료, event-local row 3개는 M47 책임으로 M28에서 approved-excluded |
| M29 | completed, implemented 101, approved-excluded 105, blocked 0 | completed | 아니오 | source-owner correction에서 즉시 사용 purchasable item listing/ITEMSALES 18개를 M29-owned로 복구해 구현 검증함 | 효과는 M30이어도 상점 listing/구매 선택은 M29가 닫아야 함 |
| M30 | completed, implemented 37, approved-excluded 37 | completed | 아니오 | strict closure 완료. 수신 manifest inbound도 명시됨 | 즉시 사용 item 9개 flow/effect 37개만 M30 완료로 세고 특수 item/availability/clothing 37개는 실제 owner manifest에서 blocked inbound로 추적 |
| M31 | completed, implemented 153, approved-excluded 84, blocked 0 | completed | 아니오 | source-owner correction에서 recruit creation result integration을 M31-owned로 복구해 생성 결과 적용을 검증함 | downstream semantics는 후속 owner여도 생성 결과 적용 검증은 M31이 닫아야 함 |
| M32 | completed, source 298 / M32-owned 291 / approved-excluded 7 | strict 완료 | 아니오 | mapped row를 완료로 세던 문제를 제거함 | 수신 owner M33 4, M47 2, M49 1이 각 manifest에서 blocked inbound로 남음 |
| M33 | completed, source 5,378, M33-owned implemented-verified 5,299, approved-excluded 79 | completed | 아니오 | seed/stat owner와 CFLAG/FLAG/PBAND 후속 owner가 strict manifest에서 분리됨 | 완료. CFLAG/FLAG/PBAND 79개는 M34에서 이후 implemented-verified로 닫힘 |
| M34 | completed, total 2,247, implemented-verified 2,247 | completed | no | All mapped/blocked rows were promoted to implementation evidence, including item 211 apron behavior. | Complete. Next strict target is M34.5. |
| M34.5 | completed, total 188, implemented-verified 188 | completed | no | responsibilityIntegrity blocker was closed with explicit hardening evidence. | Complete. Next strict target is M35. |
| M35 | completed, implemented 8, mapped 0 | completed | no | 8개 functional turn pipeline unit으로 재분해했고 mapped save rows는 supporting evidence로만 남김 | M35 완료. M36으로 진행 |
| M36 | completed, source units 93, implemented-verified 93 | completed | 아니오 | mapped 7개 완료 처리 문제를 strict source-unit manifest로 정정 | 완료. 559 row는 evidence로 유지하고 86 visit action group + 7 visit place definition만 완료 단위로 센다 |
| M37 | old completed, implemented 286, mapped 175 | blocked | 예 | 업무 실행, 업무 정의, save-field owner, session/calculation owner가 섞임. strict 재판정 후 total 463, implemented-verified 316, blocked 147 | M37이 닫을 업무 실행 단위와 save/session/calculation 결과 단위를 분리하고, blocked 147을 구현 또는 scope redesign |
| M38 | completed, implemented 0, mapped 6 | scope-redesign-required | 예 | 촬영 장면 정의만 mapped이고 대상/장면 조건/불가 사유/예상 결과 책임이 분리되지 않음 | 장면 정의와 조건/불가 사유/예상 결과 단위를 분리한 매니페스트 작성 |
| M39 | completed, implemented 135, mapped 39 | blocked | 예 | `AV_POINTCALC.ERB`, `VIDEO.ERH` source-file-review 2개가 파일 단위 mapped로 남음 | 파일 단위 row를 label/read/write/계산 단위로 분해 |
| M40 | completed, implemented 5, mapped 6 | manifest-needed | 예 | training session mapped 6개와 원본 단위 매니페스트 없음 | `EVENTTRAIN`, `EVENTCOM`, `EVENTCOMEND`, `EVENTEND`, `JUEL_CHECK`, 표시 helper 단위를 재증명 |
| M41 | completed, implemented 1,371, mapped 254 | blocked | 예 | `COMORDER.ERB` source-file-review와 mapped availability row가 완료 근거로 남음 | `COMORDER.ERB`를 command/order 단위로 분해하고 254 mapped row를 재분류 |

재판정 결론:
- M28은 strict closure 완료 상태다.
- M42는 아직 시작하면 안 된다.
- `data/coverage/manifests/M32-source-units.json`

## 2026-05-02 M28~M30 source-unit manifest 1차 산출

산출물:
- `data/coverage/manifests/M28-source-units.json`
- `data/coverage/manifests/M29-source-units.json`
- `data/coverage/manifests/M30-source-units.json`

이 산출물은 완료 선언이 아니라 완료용 기준이다. 기존 coverage row를 원본 단위 후보로 옮기되, `mapped`, `transferred-out`, disabled route contract, 예정 verification은 완료 상태로 세지 않았다.

| M | manifest total | `implemented-verified` | `blocked` | `scope-redesign-required` | 현재 완료 가능 | 핵심 판정 |
| --- | ---: | ---: | ---: | ---: | --- | --- |
| M28 | 27 | 24 | 0 | 0 | 예 | strict closure 완료. SHOP_MAIN menu row 24개는 route contract로 구현 검증했고, BOYFRIEND session row 3개는 M28 approved-excluded 및 M47 책임으로 기록했다. |
| M29 | 206 | 101 | 0 | 105 | 예 | 구매형 listing/flow/result 83개와 immediate-use purchasable listing/ITEMSALES 18개는 implemented-verified. 비구매/사용/장비/영입/이벤트 105개는 approved-excluded이며 수신 manifest에 inbound로 명시됐다. |
| M30 | 74 | 37 | 0 | 37 | 예 | 즉시 사용 item flow/effect 37개는 implemented-verified. 특수 item 200~214 및 item 22/90/91 plus item 211 계열 37개는 M30 approved-excluded이며 수신 manifest에 blocked inbound로 명시됐다. |

다음 조치:
- M28: 완료. closure에 `responsibilityIntegrity`를 추가했고, M28 ownedTotal은 main route contract 24개로 고정했다. BOYFRIEND session row 3개는 M47 책임으로 남긴다.
- M29: 구매형 listing/flow manifest closure를 source-owner correction으로 닫았다. mapped/listing 하위 검증 중 M29-owned 101개는 implemented-verified다.
- M30: 완료. 즉시 사용 item 9개 flow/effect 37개는 M30 소유 구현으로 고정했고, 특수 item 200~214 및 item 22/90/91 계열 37개는 M41/M42/M43/M44 manifest의 blocked inbound로 남긴다.

## 2026-05-02 M31~M34.5 source-unit manifest 1차 산출

산출물:
- `data/coverage/manifests/M31-source-units.json`
- Next work is M37~M41 manifest closure correction before M42 resumes.
- `data/coverage/manifests/M33-source-units.json`
- `data/coverage/manifests/M34-source-units.json`
- `data/coverage/manifests/M34.5-source-units.json`

| M | manifest total | `implemented-verified` | `blocked` | `scope-redesign-required` | 현재 완료 가능 | 핵심 판정 |
| --- | ---: | ---: | ---: | ---: | --- | --- |
| M31 | 237 | 127 | 0 | 0 | 예 | 영입 listing/flow/session 127개는 implemented-verified. character seed/lifecycle/event/source-review 110개는 M31 approved-excluded이며 수신 manifest 또는 non-runtime source review로 명시됐다. |
| M32 | 298 | 291 | 0 | 0 | 예 | strict closure 완료. Chara identity/lifecycle/CSTR label/save field 291개는 implemented-verified, TALENT save field 4개와 source-file-review 3개는 approved-excluded로 M33/M47/M49 수신 manifest에 blocked inbound로 남겼다. |
| M33 | 5,378 | 5,299 | 0 | 0 | 예 | strict closure 완료. M33-owned 5,299개는 implemented-verified이며, CFLAG/FLAG/PBAND 79개는 M33 완료가 아니라 approved-excluded였고 M34에서 이후 닫혔다. |
| M34 | 2,247 | 2,247 | 0 | 0 | yes | Strict closure complete. CFLAG/RELATION seeds, wardrobe route, M33 inbound 79 rows, and item 211 apron behavior are implemented-verified. |
| M34.5 | 188 | 188 | 0 | 0 | yes | Strict closure complete for 188 substantive hardening units. Closure responsibilityIntegrity is a separate mandatory gate check. |

다음 조치:
- M31: strict-closed. listing/가격/조건/생성 session과 creation result integration을 implemented-verified 153개로 닫았다.
- M32: 완료. source-file-review 3개는 M32 완료가 아니라 M47/M49 approved-excluded로 고정했고, CSTR label 5개는 `smoke:character-identity`에서 구현 검증했다.
- M33: complete. Seed/display/save-field owner 5,299 rows were verified directly; CFLAG/FLAG/PBAND 79 rows were not counted as M33 completion and are now closed by M34.
- M34: complete. Item 211 missing rows, mapped rows, and M33 inbound rows are all implemented-verified.
- M34.5: hardening closure에 `responsibilityIntegrity`를 추가하거나 새 기준으로 blocked를 유지한다.

| M | 완료로 처리한 것 | 안 했거나 넘긴 것 | 재확인 필요 |
| --- | --- | --- | --- |
| M28 | 메인 메뉴 route/action/view 24개를 연결하고 `smoke:main-routes`로 확인했다. | BOYFRIEND event-local screen session row 3개는 M47로 넘겼고 M28에서는 approved-excluded로 닫았다. | strict closure 완료. `responsibilityIntegrity` 포함. |
| M29 | 구매형 상점 listing 30개, 가격/노출/구매 성공/실패/취소, 돈/인벤토리 반영과 immediate-use purchasable listing/ITEMSALES를 strict 기준 implemented-verified 101개로 닫았다. | 105개 row는 구매가 아닌 사용/장비/영입/이벤트 등 다른 owner 책임으로 남긴다. | M29는 strict closure 완료다. item 효과와 별개로 상점 listing/구매 선택은 M29가 닫았다. |
| M30 | 즉시 사용 아이템 30/31/38/39/40/41/42/43/52의 선택, 대상 지정, 성공/실패/취소, 저장 반영 경로를 구현했다. strict 기준 implemented-verified 37. | 특수 item 200~214 및 item 22/90/91 계열 37개는 M30 완료가 아니라 approved-excluded이며, M41/M42/M43/M44 수신 manifest에 blocked inbound로 남겼다. | strict closure 완료. `gate:item-use-coverage`는 source 74, M30-owned 37, implemented-verified 37, approved-excluded 37과 receiver manifest 매칭을 확인한다. item 213은 `COMF137.ERB`라 기존 M42~M44 range 설계도 재확인해야 한다. |
| M31 | 영입 listing 48개, 반복 영입 제한, visible listing session, recruit session buffer와 creation result integration을 strict 기준 implemented-verified 153개로 닫았다. | 84개는 다른 owner 책임으로 approved-excluded 상태로 남긴다. | M31은 strict closure 완료다. `gate:milestone-scope-closure -- M31`은 통과해야 한다. |
| M32 | Chara template 109개, CSTR seed 157개, CSTR label definition 5개, M31 inbound lifecycle/CSTR save field 20개, retired/deleted/assistant lifecycle과 roster identity 표시를 구현 검증했다. strict 기준 M32-owned implemented-verified 291. | 7개 row는 M32 완료가 아니다. TALENT save field 4개는 M33, `C_CLUB_GIRLNAME.ERB`/`BOYFRIENDNAME_CALC.ERB`는 M47, `ZNAME.ERB`는 M49로 approved-excluded 및 blocked inbound 처리했다. | strict closure 완료. `gate:character-identity`는 source 298, implemented-verified 291, approved-excluded 7과 receiver manifest 반영을 확인한다. |
| M33 | BASE/ABL/TALENT/EXP/MARK/PALAM 계열 seed, 표시 정의, save field, M31/M32 inbound body/stat row를 직접 검증했다. strict 기준 M33-owned implemented-verified 5,299. | CFLAG/FLAG/PBAND 79개는 M33 완료가 아니다. approved-excluded로 남겼고 이후 M34에서 implemented-verified로 닫았다. | strict closure 완료. `gate:body-stat-mapping`은 source 5,378, implemented-verified 5,299, approved-excluded 79와 receiver manifest 반영을 확인한다. |
| M34 | Implemented social/equipment/wardrobe ownership for CFLAG, relationship, equipment, clothing, and item 211 apron behavior. Strict count: 2,247 implemented-verified. | No M34-owned rows transferred out. Event/training/mission effects remain later-owner responsibilities. | Strict closure complete. `gate:social-equipment-cflag` forbids mapped/transferred/source-file-review completion. |
| M34.5 | hardening용 registry와 final verify skeleton, auxiliary evidence 차단을 추가했다. coverage-hardening gate는 통과한다. 이후 M28~M34 registry contract도 추가되어 M28~M52 registry enforcement gap은 해소되었다. | 당시에는 M28~M34 registry contract가 없었지만 현재 기준에서는 해소됨. | hardening gate 자체가 새 `responsibilityIntegrity` closure 기준을 검증하지 않는다. |
| M35 | 턴 진행, 날짜/주차/월/년 갱신, hook 순서, session cleanup, save roundtrip을 strict 기준으로 닫았다. | 업무/미션/이벤트/경제 내부 효과는 M35 완료가 아니다. M35는 호출 순서와 lifecycle boundary만 닫는다. | strict closure 완료. `gate:turn-pipeline`과 `gate:milestone-scope-closure -- M35`는 owned 8, implemented 8을 확인한다. |
| M36 | 방문 장소 7개와 방문 action 86개, 비용/해금/진행 row를 구현했다. strict 기준 source units 93, implemented-verified 93, mapped 0. | 방문 이후 이벤트/세계 hook은 후속 owner가 소유한다. | closure에 `responsibilityIntegrity`가 있고 gate 통과. |
| M37 | 업무/창관/특수 업무 실행 80개, 업무 정의 8개, 업무 결과 write-effect 21개와 LUNCH_STALL ABL:74 보상 read 1개는 구현 검증됐다. strict 기준 implemented-verified 316. | 남은 save/session/calculation/source-address 147개는 M37 완료가 아니다. | M37 closure는 blocked 147이다. 업무 결과의 원본 save-field 효과를 구현하거나 명시적으로 scope redesign 해야 한다. |
| M38 | 촬영 장면 정의 6개와 장면 조건 table을 연결했다. coverage 기준 mapped 6. | 실제 촬영 실행/수익/판매는 M39가 소유한다. | implemented 0, mapped 6만으로 "촬영 정의 완성"을 닫았으므로 조건/예상 결과가 runtime에서 충분히 검증되는지 재확인 필요. registry에 smoke 필수도 빠져 있다. |
| M39 | 촬영 실행, 수익, 팬, 점수, 출시/판매 상태를 구현했다. coverage 기준 implemented 135, mapped 39. | source-file-review 2개가 파일 단위 mapped 완료로 남아 있다. | source-file-review는 라벨/row 수준으로 분해됐는지 재감사해야 한다. |
| M40 | 훈련 대상/실행자/조수/command 선택, session lifecycle, 완료 후 cleanup을 구현했다. coverage 기준 implemented 5, mapped 6. | command 효과와 availability는 M41~M44가 소유한다. | closure에 `responsibilityIntegrity`가 없다. |
| M41 | 훈련 command availability 105개와 불가 사유를 구현했다. coverage 기준 implemented 1,371, mapped 254. | command 효과 계산은 M42~M44가 소유한다. `COMORDER.ERB` source-file-review 1개가 mapped 완료로 남아 있다. | registry에 `smoke:training-availability` 필수가 빠져 있고, source-file-review 분해 재감사가 필요하다. |

## 즉시 보강할 항목

- Do not mechanically add `responsibilityIntegrity` to M37~M41 closures. Resolve the reassessment rows first or record them as blocked. M32~M36 are strict-closed; M28 and M31 have transfer/exclusion correction items.
- M30에서 excluded 처리한 특수 item 200~214 및 item 22/90/91 계열은 완료가 아니며, M41/M42/M43/M44 수신 owner가 각각 구현/제외/재설계를 끝내야 한다.
- M35의 넓은 책임을 save field mapping 7개가 아니라 runtime hook/cleanup별 사실로 풀어 적는다.
- M38/M41 registry에 smoke 필수 누락을 기록한다.
- M39/M41의 `source-file-review` mapped 완료 row를 분해하거나 미완료로 되돌릴지 결정한다.

## 2026-05-06 approved-excluded 이관 전수 감사

대상은 M28~M33 manifest의 `approved-excluded` 359개다. 단순 source path 포함이 아니라 `sourceEvidenceId` 또는 `legacyId`가 수신 milestone manifest에 정확히 존재하는지로 대조했다.

판정:
- 정확 수신 확인: 356 / 359
- 정확 수신 누락: 3 / 359
- 자기 자신에게 제외 처리된 항목: 8 / 359
- 수신은 됐지만 receiver가 아직 `blocked`로 들고 있는 항목: 48 / 359

정확 수신 누락:
- M28 -> M47: `TCVAR:20`, `TCVAR:50`, `TCVAR:70`
- M47의 broad criteria unit은 `BOYFRIEND.ERB` 경로를 포함하지만, 위 3개 session row의 `sourceEvidenceId`/`legacyId`를 정확히 들고 있지 않다. 따라서 M28의 이관은 현재 기준으로 완전 수신이 아니다.

잘못된 이관 형태:
- M31 -> M31: 8개
- `SHOP_SLAVE1.ERB` unused flow 6개와 `SHOP_SLAVE3.ERB`/`SHOP.ERH` source-file-review 2개가 M31에서 M31로 approved-excluded 처리되어 있다.
- 이것은 책임 이관이 아니다. non-runtime 승인 제외로 닫으려면 "원본에서 미사용이며 runtime 미구현 승인 제외" 근거를 별도 상태로 남겨야 하고, 그렇지 않으면 M31 blocked 또는 scope-redesign-required로 되돌려야 한다.

수신됐지만 아직 닫히지 않은 receiver 책임:
- M29 -> M37: 2개
- M29 -> M47/M48/M49: 6개
- M30 -> M41/M42/M43/M44: 34개
- M31 -> M47: 3개
- M32 -> M47/M49: 3개

결론:
- "넘긴 항목이 모두 제대로 닫혔다"는 말은 틀리다.
- 정확 수신 누락 3개와 자기 자신 제외 8개는 즉시 correction 대상이다.
- receiver가 blocked로 들고 있는 48개는 이관 자체는 추적되지만 게임 포팅 완료가 아니다. 해당 receiver milestone이 구현, 승인 제외, 또는 scope redesign으로 직접 닫아야 한다.

## 2026-05-06 게임 기능 완결 기준 재판정

기준: `people`, `body`, `meta`, `mission`, `event` 같은 owner 이름이 보인다는 이유만으로 넘길 수 없다. 현재 마일스톤의 플레이어 기능이 끝나려면 필요한 동작, 저장 반영, 실패/취소/roundtrip 검증은 현재 마일스톤 또는 명시된 receiver milestone에서 실제로 닫혀야 한다.

| 범위 | 판정 | 이유 | correction |
| --- | --- | --- | --- |
| M28 -> M47 3개 | 무효/미완 | BOYFRIEND event-local `TCVAR:20/50/70`은 M47 broad criteria path에는 걸리지만 정확 sourceEvidenceId 수신이 없다. | M47 manifest에 세 row를 정확 inbound로 추가하거나 M28을 blocked로 되돌린다. |
| M29 -> M30/M31/M34 91개 | 조건부 유효 | 구매 listing 자체가 아니라 영입 listing, 의복/장비 소비, 비구매 사용/효과라서 구매 완료와 분리 가능하다. 단 immediate-use purchasable item listing/ITEMSALES 18개는 M29가 처리해야 했던 것으로 되돌렸다. | receiver closure가 blocked이면 전체 포팅 완료 아님. M30 특수 item chain은 M42~M44까지 따라가야 한다. |
| M29 -> M32/M35/M37/M47/M48/M49 14개 | 조건부/고위험 | "구매가 직접 mutate하지 않는다"는 근거만으로는 부족하다. 해당 save/event/info/turn 의미가 실제 어디서 발생하는지 receiver가 닫아야 한다. | receiver가 blocked이면 유지. implemented라고 된 row도 원본 발생 경로가 구매/사용/이벤트 중 어디인지 재확인한다. M29 approved-excluded 총계는 91+14=105다. |
| M30 -> M41/M42/M43/M44 34개 | 미완/blocked | 특수 item 200~214와 item 22/90/91은 item-use가 아니라 훈련 availability/effect에서 소비된다는 이관 자체는 가능하지만, 훈련 기능 완결 전에는 게임 기능이 닫힌 것이 아니다. | M41/M42/M43/M44가 각각 source 계산, 소비, 실패/취소, 결과 반영을 닫기 전까지 전체 포팅 blocker다. |
| M30 -> M34 3개 | 유효 | item 211은 `COSPLAY.ERB` 의복 흐름에서 소비되고 M34가 implemented-verified로 닫았다. | 추가 correction 없음. |
| M31 -> M32/M33/M34/M35 99개 | 조건부 유효 | 영입은 사람 container 생성까지 소유하고, identity/body/social/time 의미는 후속 owner가 seed/save/display로 닫을 수 있다. 단 "owner가 다르다"가 아니라 영입 성공 시 생성 결과가 실제 template/container에 연결되어야 한다. | M32/M33/M34/M35 implemented evidence 유지. 생성 직후 필요한 초기값 누락이 발견되면 M31/M32/M33 경계 재설계. |
| M31 -> M47 3개 | 미완/blocked | post-recruit story/event hook은 M31 listing/generation이 아니지만 이벤트 기능으로는 아직 닫히지 않았다. | M47에서 직접 구현/검증해야 한다. |
| M31 -> M31 8개 | 무효/상태 오류 | 자기 자신에게 approved-excluded한 것은 이관이 아니다. unused/source-file-review라면 non-runtime 승인 제외로 별도 증명해야 한다. | M31 closure를 correction하거나 해당 8개를 explicit non-runtime exclusion 상태로 바꾼다. |
| M32 -> M33 4개 | 유효 | TALENT save field semantics는 body/stat owner인 M33에서 implemented-verified로 닫혔다. | 추가 correction 없음. |
| M32 -> M47/M49 3개 | 미완/blocked | generated-name/text formatting은 identity field owner가 아니라 event/text owner일 수 있지만, 현재 receiver가 blocked다. | M47/M49에서 실제 이름 생성/표시 동작을 닫아야 한다. |
| M33 -> M34 79개 | 유효 | CFLAG/FLAG/PBAND/equipment semantics는 M34에서 implemented-verified로 닫혔다. | 추가 correction 없음. |
| M38~M41 closure | 무효 완료 선언 | manifest가 blocked인데 closure JSON이 completed였다. mapped/source-file-review를 기능 완결로 세던 구판정이다. | M38~M41 closure status를 `blocked`로 정정했다. M42는 이 blocker 해소 전 재개하지 않는다. |

현재 우선 correction 순서:
1. M31 self-exclusion 8개 상태 correction.
2. M28 -> M47 3개 정확 inbound 추가 또는 M28 blocked 정정.
3. M38~M41 blocked closure에 맞춰 progress/handoff 문구 정리.
4. 그 뒤 M37, M38, M39, M40, M41을 하나씩 실제 기능 완결 기준으로 닫는다.

## 2026-05-06 source owner reclaim 감사

이번 기준은 "receiver owner가 보이는가"가 아니라 "원래 마일스톤이 자기 기능을 끝내려면 처리했어야 했는가"다.

판정:
- M29는 completed가 아니다. 즉시 사용 아이템의 효과는 M30이지만, 원본 `SHOP_ITEM.ERB`에서 30/31/38/39/40/41/42/43/52는 `ITEMSALES`로 노출되고 `BOUGHT`로 구매 선택/결제를 탄다. 따라서 listing/가격/노출/선택/구매/취소는 M29가 처리했어야 한다.
- M29 reclaim 대상 18개는 item 30/31/38/39/40/41/42/43/52의 definition 9개와 `ITEMSALES` session row 9개이며, source-owner correction에서 implemented-verified로 닫았다. M29 closure는 `completed`, total 206, implemented-verified 101, approved-excluded 105, blocked 0이다.
- M31은 completed가 아니다. M31은 "영입 listing과 인물 생성 결과"를 맡았으므로 downstream field semantics는 M32/M33/M34/M35가 소유하더라도, recruit creation이 initial identity/body/social/time fields를 실제 생성 결과에 적용하는 통합 검증은 M31 책임이다.
- M31 reclaim 대상은 recruit creation integration 검증으로 회수했고, source-owner correction에서 implemented-verified로 닫았다. M31 closure는 `completed`, total 237, implemented-verified 153, approved-excluded 84, blocked 0이다.

정리:
- M29/M31에서 문제였던 것은 "넘긴 대상이 있느냐"가 아니라, 현재 마일스톤의 기능 완결에 필요한 listing/생성 결과 통합을 owner 이름만 보고 제외했다는 점이다.
- M30/M32/M33/M34/M35가 field/effect semantics를 닫더라도 M29의 구매 listing과 M31의 생성 결과 integration은 해당 마일스톤에서 증명해야 한다.
- 이후 순서는 M37~M41 blocked closure다.

## 2026-05-06 추가 source-owner 재확인

대상: M28~M41 source-unit manifest의 approved-excluded, blocked 항목.

판정 기준: 받는 owner 이름이 있는지가 아니라, 원래 마일스톤이 자기 gameplay 기능을 완결하려면 직접 처리해야 했던 동작인지 확인했다.

결과:
- M29/M31은 source-owner reclaim 대상이 맞았고, correction에서 M29 implemented 101 / M31 implemented 153으로 닫았다.
- M28의 M47 3개는 route 기능 자체가 아니라 BOYFRIEND event-local screen state라서 source-owner reclaim은 아니다. 다만 정확한 receiver inbound가 부족하므로 M28 exact inbound correction은 남아 있다.
- M30의 M41/M42/M43/M44 34개는 item-use confirmation이 아니라 training availability/effect consumption이라서 M30 source-owner reclaim은 아니다. 단 receiver가 blocked이므로 전체 포팅 완료도 아니다.
- M32의 M33/M47/M49 7개는 identity/lifecycle 자체가 아니라 TALENT semantics, generated event name, text formatting이라서 M32 source-owner reclaim은 아니다.
- M33의 M34 79개는 CFLAG/FLAG/PBAND/equipment semantics이고 M34에서 implemented-verified로 닫혔으므로 추가 reclaim 대상이 아니다.
- M34/M35/M36은 approved-excluded가 없고 현재 manifest 상 자기 책임 단위가 implemented-verified다.
- M37/M38/M39/M40/M41은 이미 blocked 또는 scope-redesign-required를 포함하므로 완료 상태가 아니다. 여기서는 transfer reclaim이 아니라 실제 기능 구현/검증으로 닫아야 한다.

따라서 "본인이 처리해야 했던 걸 owner 이름만 보고 넘긴" 대표 correction은 현재 M29와 M31이다. 다음 실제 작업은 이 blocker를 구현 또는 scope redesign으로 닫는 것이다.
