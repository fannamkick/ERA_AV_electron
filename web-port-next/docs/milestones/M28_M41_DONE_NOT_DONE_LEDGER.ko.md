# M28~M41 완료/미완료 사실 장부

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

M28~M34.5 are strict-closed. Next work starts at M34.5 inside the existing `PHASE_5_M28_M49.ko.md` milestone sections; do not create a replacement ledger.

각 남은 마일스톤은 구현 전에 아래를 먼저 남긴다.

- owned runtime responsibility
- source-unit manifest path
- owned unit count
- approved-excluded 후보와 이유
- other-owner 후보와 receiver manifest 상태
- 완료 금지 상태: `mapped`, `source-file-review`, `transferredOut`, owner-only row, 예정 verification only

작업 중 책임 이관으로 완료 범위를 줄이지 않는다. 이관이 필요해 보이면 구현을 멈추고 `scope-redesign-required`로 막은 뒤 책임 지도와 receiver manifest를 먼저 고친다.

## 2026-05-05 M31 strict closure update

M31 is now complete under the strict source-unit manifest rule.

- Manifest: `data/coverage/manifests/M31-source-units.json`
- Closure: `data/coverage/milestones/M31-closure.json`
- Summary: total 237, implemented-verified 127, approved-excluded 110, blocked 0, scope-redesign-required 0, completedAllowedNow true.
- M31 ownedTotal is 127 recruit listing, flow, visible listing session, and recruit session buffer rows, not the old mixed 237-row queue total.
- The 110 non-M31 character seed, lifecycle, event hook, unused source, and aggregate source-review rows are excluded from M31 ownership and remain assigned to receiving owner milestones or approved non-runtime source review.
- Receiver-owned excluded rows are explicit blocked inbound responsibility: M32 20, M33 74, M34 4, M35 1, M47 3.
- `npm run gate:recruit-coverage` passes with source 237, M31-owned 127, implemented-verified 127, approved-excluded 110.
- `npm run gate:recruit-coverage` now fails if an M31 receiver-owned exclusion is missing from the receiver manifest.
- `npm run gate:milestone-scope-closure -- M31` passes with `responsibilityIntegrity`.

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

M29 is now complete under the strict source-unit manifest rule.

- Manifest: `data/coverage/manifests/M29-source-units.json`
- Closure: `data/coverage/milestones/M29-closure.json`
- Summary: total 206, implemented-verified 83, approved-excluded 123, blocked 0, scope-redesign-required 0, completedAllowedNow true.
- M29 ownedTotal is 83 purchase/listing/result rows, not the old mixed 206-row queue total.
- The 123 non-purchase/use/equipment/recruit/event/downstream rows are excluded from M29 ownership and remain assigned to receiving owner milestones.
- All 123 excluded rows now have explicit inbound responsibility in receiver manifests: M30 49, M31 48, M34 12, M35 2, M32 4, M37 2, M47 4, M48 1, M49 1.
- Newly added receiver rows are blocked, not completed: M32 +4, M37 +2, M47 +4, M48 +1, M49 +1.
- `npm run gate:shop-purchase-coverage` passes with source 206, M29-owned 83, implemented-verified 83, approved-excluded 123.
- `npm run gate:shop-purchase-coverage` now fails if an M29 transfer row is missing from the receiver manifest.
- `npm run gate:milestone-scope-closure -- M29` passes with `responsibilityIntegrity`.

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
| M37 | 463 | 294 | 169 | 0 | no | 286 work feature rows and 8 work definitions are implemented-verified. Save/session/calculation mapped rows plus M29 inbound CFLAG:401/FLAG:41 remain blocked. |
| M38 | 6 | 0 | 6 | 0 | no | All six filming scene definitions are mapped-only, so none are completed under the strict rule. |
| M39 | 174 | 135 | 39 | 0 | no | 135 filming execution feature rows are completion candidates. Save/session/calculation/source-file-review mapped rows remain blocked. |
| M40 | 11 | 5 | 6 | 0 | no | Five training session lifecycle rows are completion candidates. Six wait/format/status mapped rows remain blocked. |
| M41 | 1,631 | 4 | 1,626 | 1 | no | Only four COMSEQ dynamic-call rows are completion candidates. COM_ABLE branch conditions, success returns, source programs, M30 inbound training availability rows, and COMORDER review remain unresolved. |

Next actions:
- M35: split `turn/end` into clock advance, mission deadline, scheduled event, weekly/monthly hook, world hook, and save boundary source units.
- M36: complete. The seven visit place definitions were promoted with source evidence, runtime consumer evidence, and `smoke:visit-all`.
- M37: implement or explicitly redesign 169 blocked units with owner-specific runtime/save verification. Do not promote mapped save/session/calculation rows without source behavior evidence.
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
| M29 | completed, implemented 83, approved-excluded 123 | completed | 아니오 | strict closure 완료. 수신 manifest inbound도 명시됨 | 구매형 listing/구매 결과 83개만 M29 완료로 세고 123개 비구매 row는 실제 owner manifest에서 blocked inbound로 추적 |
| M30 | completed, implemented 37, approved-excluded 37 | completed | 아니오 | strict closure 완료. 수신 manifest inbound도 명시됨 | 즉시 사용 item 9개 flow/effect 37개만 M30 완료로 세고 특수 item/availability/clothing 37개는 실제 owner manifest에서 blocked inbound로 추적 |
| M31 | completed, implemented 127, approved-excluded 110 | completed | 아니오 | strict closure 완료. 수신 manifest inbound도 명시됨 | 영입 listing/flow/session 127개만 M31 완료로 세고 identity/body-stat/lifecycle/event/source-review 110개는 M31 완료가 아닌 approved-excluded로 추적 |
| M32 | completed, source 298 / M32-owned 291 / approved-excluded 7 | strict 완료 | 아니오 | mapped row를 완료로 세던 문제를 제거함 | 수신 owner M33 4, M47 2, M49 1이 각 manifest에서 blocked inbound로 남음 |
| M33 | completed, source 5,378, M33-owned implemented-verified 5,299, approved-excluded 79 | completed | 아니오 | seed/stat owner와 CFLAG/FLAG/PBAND 후속 owner가 strict manifest에서 분리됨 | 완료. CFLAG/FLAG/PBAND 79개는 M34에서 이후 implemented-verified로 닫힘 |
| M34 | completed, total 2,247, implemented-verified 2,247 | completed | no | All mapped/blocked rows were promoted to implementation evidence, including item 211 apron behavior. | Complete. Next strict target is M34.5. |
| M34.5 | completed, total 188, implemented-verified 188 | completed | no | responsibilityIntegrity blocker was closed with explicit hardening evidence. | Complete. Next strict target is M35. |
| M35 | completed, implemented 8, mapped 0 | completed | no | 8개 functional turn pipeline unit으로 재분해했고 mapped save rows는 supporting evidence로만 남김 | M35 완료. M36으로 진행 |
| M36 | completed, source units 93, implemented-verified 93 | completed | 아니오 | mapped 7개 완료 처리 문제를 strict source-unit manifest로 정정 | 완료. 559 row는 evidence로 유지하고 86 visit action group + 7 visit place definition만 완료 단위로 센다 |
| M37 | old completed, implemented 286, mapped 175 | blocked | 예 | 업무 실행, 업무 정의, save-field owner, session/calculation owner가 섞임. strict 재판정 후 total 463, implemented-verified 294, blocked 169 | M37이 닫을 업무 실행 단위와 save/session/calculation 결과 단위를 분리하고, blocked 169를 구현 또는 scope redesign |
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
| M29 | 206 | 83 | 0 | 123 | 예 | 구매형 listing/flow/result 83개는 implemented-verified. 비구매/사용/장비/영입/이벤트 123개는 M29 approved-excluded이며 수신 manifest에 blocked inbound로 명시됐다. |
| M30 | 74 | 37 | 0 | 37 | 예 | 즉시 사용 item flow/effect 37개는 implemented-verified. 특수 item 200~214 및 item 22/90/91 plus item 211 계열 37개는 M30 approved-excluded이며 수신 manifest에 blocked inbound로 명시됐다. |

다음 조치:
- M28: 완료. closure에 `responsibilityIntegrity`를 추가했고, M28 ownedTotal은 main route contract 24개로 고정했다. BOYFRIEND session row 3개는 M47 책임으로 남긴다.
- M29: 구매형 listing/flow manifest로 closure를 재작성한다. mapped 40개는 listing/flow의 하위 검증으로 승격하거나 blocked로 둔다.
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
- M31: 완료. listing/가격/조건/생성 session 127개는 M31 소유 구현으로 고정했고 template seed, source-file-review, 후속 lifecycle/event row 110개는 M31 approved-excluded로 남겼다.
- M32: 완료. source-file-review 3개는 M32 완료가 아니라 M47/M49 approved-excluded로 고정했고, CSTR label 5개는 `smoke:character-identity`에서 구현 검증했다.
- M33: complete. Seed/display/save-field owner 5,299 rows were verified directly; CFLAG/FLAG/PBAND 79 rows were not counted as M33 completion and are now closed by M34.
- M34: complete. Item 211 missing rows, mapped rows, and M33 inbound rows are all implemented-verified.
- M34.5: hardening closure에 `responsibilityIntegrity`를 추가하거나 새 기준으로 blocked를 유지한다.

| M | 완료로 처리한 것 | 안 했거나 넘긴 것 | 재확인 필요 |
| --- | --- | --- | --- |
| M28 | 메인 메뉴 route/action/view 24개를 연결하고 `smoke:main-routes`로 확인했다. | BOYFRIEND event-local screen session row 3개는 M47로 넘겼고 M28에서는 approved-excluded로 닫았다. | strict closure 완료. `responsibilityIntegrity` 포함. |
| M29 | 구매형 상점 listing 30개, 가격/노출/구매 성공/실패/취소, 돈/인벤토리 반영을 구현했다. strict 기준 implemented-verified 83. | 123개 row는 구매가 아닌 사용/장비/영입/이벤트 등 다른 owner로 넘겼고, 전부 수신 manifest에 blocked inbound로 명시했다. | 수신 owner가 각 row를 구현/제외/재설계하기 전까지 해당 milestone은 완료되지 않는다. |
| M30 | 즉시 사용 아이템 30/31/38/39/40/41/42/43/52의 선택, 대상 지정, 성공/실패/취소, 저장 반영 경로를 구현했다. strict 기준 implemented-verified 37. | 특수 item 200~214 및 item 22/90/91 계열 37개는 M30 완료가 아니라 approved-excluded이며, M41/M42/M43/M44 수신 manifest에 blocked inbound로 남겼다. | strict closure 완료. `gate:item-use-coverage`는 source 74, M30-owned 37, implemented-verified 37, approved-excluded 37과 receiver manifest 매칭을 확인한다. item 213은 `COMF137.ERB`라 기존 M42~M44 range 설계도 재확인해야 한다. |
| M31 | 영입 listing 48개, 반복 영입 제한, 인물 생성 결과, visible listing session, recruit session buffer를 구현했다. strict 기준 implemented-verified 127. | 110개 row는 M31 완료가 아니라 approved-excluded다. M32 20, M33 74, M34 4, M35 1, M47 3은 수신 owner에서 blocked inbound로 남고, unused/source-review 8개는 non-runtime source review로 남긴다. | strict closure 완료. `gate:recruit-coverage`는 source 237, M31-owned 127, approved-excluded 110과 receiver manifest 매칭을 확인한다. |
| M32 | Chara template 109개, CSTR seed 157개, CSTR label definition 5개, M31 inbound lifecycle/CSTR save field 20개, retired/deleted/assistant lifecycle과 roster identity 표시를 구현 검증했다. strict 기준 M32-owned implemented-verified 291. | 7개 row는 M32 완료가 아니다. TALENT save field 4개는 M33, `C_CLUB_GIRLNAME.ERB`/`BOYFRIENDNAME_CALC.ERB`는 M47, `ZNAME.ERB`는 M49로 approved-excluded 및 blocked inbound 처리했다. | strict closure 완료. `gate:character-identity`는 source 298, implemented-verified 291, approved-excluded 7과 receiver manifest 반영을 확인한다. |
| M33 | BASE/ABL/TALENT/EXP/MARK/PALAM 계열 seed, 표시 정의, save field, M31/M32 inbound body/stat row를 직접 검증했다. strict 기준 M33-owned implemented-verified 5,299. | CFLAG/FLAG/PBAND 79개는 M33 완료가 아니다. approved-excluded로 남겼고 이후 M34에서 implemented-verified로 닫았다. | strict closure 완료. `gate:body-stat-mapping`은 source 5,378, implemented-verified 5,299, approved-excluded 79와 receiver manifest 반영을 확인한다. |
| M34 | Implemented social/equipment/wardrobe ownership for CFLAG, relationship, equipment, clothing, and item 211 apron behavior. Strict count: 2,247 implemented-verified. | No M34-owned rows transferred out. Event/training/mission effects remain later-owner responsibilities. | Strict closure complete. `gate:social-equipment-cflag` forbids mapped/transferred/source-file-review completion. |
| M34.5 | hardening용 registry와 final verify skeleton, auxiliary evidence 차단을 추가했다. coverage-hardening gate는 통과한다. 이후 M28~M34 registry contract도 추가되어 M28~M52 registry enforcement gap은 해소되었다. | 당시에는 M28~M34 registry contract가 없었지만 현재 기준에서는 해소됨. | hardening gate 자체가 새 `responsibilityIntegrity` closure 기준을 검증하지 않는다. |
| M35 | 턴 진행, 날짜/주차/월/년 갱신, hook 순서, session cleanup, save roundtrip을 strict 기준으로 닫았다. | 업무/미션/이벤트/경제 내부 효과는 M35 완료가 아니다. M35는 호출 순서와 lifecycle boundary만 닫는다. | strict closure 완료. `gate:turn-pipeline`과 `gate:milestone-scope-closure -- M35`는 owned 8, implemented 8을 확인한다. |
| M36 | 방문 장소 7개와 방문 action 86개, 비용/해금/진행 row를 구현했다. strict 기준 source units 93, implemented-verified 93, mapped 0. | 방문 이후 이벤트/세계 hook은 후속 owner가 소유한다. | closure에 `responsibilityIntegrity`가 있고 gate 통과. |
| M37 | 업무/창관/특수 업무 실행 80개와 업무 정의 8개는 구현 검증됐다. strict 기준 implemented-verified 294. | save mapping 161개, session/calculation mapping 6개, M29 inbound `CFLAG:401`/`FLAG:41` 2개는 M37 완료가 아니다. | M37 closure는 blocked 169로 정정했다. 업무 결과의 원본 save-field 효과를 구현하거나 명시적으로 scope redesign 해야 한다. |
| M38 | 촬영 장면 정의 6개와 장면 조건 table을 연결했다. coverage 기준 mapped 6. | 실제 촬영 실행/수익/판매는 M39가 소유한다. | implemented 0, mapped 6만으로 "촬영 정의 완성"을 닫았으므로 조건/예상 결과가 runtime에서 충분히 검증되는지 재확인 필요. registry에 smoke 필수도 빠져 있다. |
| M39 | 촬영 실행, 수익, 팬, 점수, 출시/판매 상태를 구현했다. coverage 기준 implemented 135, mapped 39. | source-file-review 2개가 파일 단위 mapped 완료로 남아 있다. | source-file-review는 라벨/row 수준으로 분해됐는지 재감사해야 한다. |
| M40 | 훈련 대상/실행자/조수/command 선택, session lifecycle, 완료 후 cleanup을 구현했다. coverage 기준 implemented 5, mapped 6. | command 효과와 availability는 M41~M44가 소유한다. | closure에 `responsibilityIntegrity`가 없다. |
| M41 | 훈련 command availability 105개와 불가 사유를 구현했다. coverage 기준 implemented 1,371, mapped 254. | command 효과 계산은 M42~M44가 소유한다. `COMORDER.ERB` source-file-review 1개가 mapped 완료로 남아 있다. | registry에 `smoke:training-availability` 필수가 빠져 있고, source-file-review 분해 재감사가 필요하다. |

## 즉시 보강할 항목

- Do not mechanically add `responsibilityIntegrity` to M37~M41 closures. Resolve the reassessment rows first or record them as blocked. M28~M36 are strict-closed.
- M30에서 excluded 처리한 특수 item 200~214 및 item 22/90/91 계열은 완료가 아니며, M41/M42/M43/M44 수신 owner가 각각 구현/제외/재설계를 끝내야 한다.
- M35의 넓은 책임을 save field mapping 7개가 아니라 runtime hook/cleanup별 사실로 풀어 적는다.
- M38/M41 registry에 smoke 필수 누락을 기록한다.
- M39/M41의 `source-file-review` mapped 완료 row를 분해하거나 미완료로 되돌릴지 결정한다.
