# 2026-05-08 Active Process Update

Phase 5 is now split into per-milestone docs. Use `docs/milestones/PHASE_5_M28_M49.ko.md` as an index, `docs/milestones/MILESTONE_DOCUMENTATION_RULES.ko.md` as rules, and `docs/milestones/M35_TURN_PIPELINE.ko.md` as the next recheck surface.

Old gate/closure counts are historical evidence only. Do not start M37 until M35 and then M36 are rechecked under the split-method process unless explicitly redirected.

---
# 진행 상태

## 2026-05-08 M34 original-logic recheck complete

M34는 M33 receiver refresh 뒤 생긴 CFLAG/FLAG/PBAND blocked 76을 원본 save-field 책임과 현재 runtime store 기준으로 다시 닫았다.

- 현재 closure: total 2,241, implemented-verified 2,241, approved-excluded 0, blocked 0.
- 닫은 책임: CFLAG definitions 151, Chara CFLAG seed 1,465, RELATION seed 532, save-mapping 82, session-mapping 5, wardrobe route 1.
- M33 inbound 76개는 `CFLAG 65 / FLAG 3 / PBAND 8` save rows이며, `smoke:social-equipment-cflag`가 artifact에서 76개를 읽어 sentinel save roundtrip으로 전부 검증한다.
- 보정: M34 builder completion evidence를 현재 runtime store 경로로 수정했다. 존재하지 않는 `mission.characterProgress`/`people.characters.byId.*.progressFlags` 경로를 완료 근거로 쓰지 않는다.
- 검증 완료: `npm run coverage:social-equipment-cflag`, `npm run gate:social-equipment-cflag`, `npm run gate:milestone-scope-closure -- M34`, `npm run smoke:social-equipment-cflag`.
- 다음 재검 대상: M35. M37로 바로 넘어가지 않는다.

## 2026-05-08 M33 original-logic recheck complete

M33은 원본 CSV seed/display/save와 원본 ERB effect boundary 기준으로 재검했고, stale closure를 보정했다.

- 현재 closure: source 5,357, M33-owned implemented-verified 5,281, approved-excluded 76, blocked 0.
- M32에서 넘어온 `TALENT:91/153/154/325` save rows 4개는 `implemented-trait-save-field`로 회수해 닫았다.
- CFLAG/FLAG/PBAND 76개는 M33 완료가 아니라 M34 receiver responsibility로 넘겼고, M34 재검에서 닫았다.
- 검증 완료: `npm run coverage:body-stat`, `npm run gate:body-stat-mapping`, `npm run gate:milestone-scope-closure -- M33`, `npm run smoke:body-stat`, `npm run smoke:character-identity`, `npm run typecheck`, `npm run build`.
## 2026-05-06 M28/M29/M31 source-owner corrections complete

M28/M29/M31 correction is now closed under the strict source-unit manifest rule.

- M28 remains strict-closed. Its 3 BOYFRIEND event-local rows are exact blocked inbound units in M47.
- M29 is strict-closed after reclaim implementation: total 206, implemented-verified 101, approved-excluded 105, blocked 0, `completedAllowedNow: true`.
- M31 is strict-closed after reclaim implementation: total 237, implemented-verified 153, approved-excluded 84, blocked 0, `completedAllowedNow: true`.
- M47 is now total 13, blocked 13.
- Aggregate M28~M52: total 11,250; implemented-verified 8,888; approved-excluded 315; blocked 2,016; scope-redesign-required 31; completedAllowedNow true 10 / false 16.
- Next strict target: M37, then M38~M41. M42 is still not resumed.

## 2026-05-06 M36 strict closure complete

M36 is now closed under the strict source-unit manifest rule.

- Manifest: `data/coverage/manifests/M36-source-units.json`
- Closure: `data/coverage/milestones/M36-closure.json`
- Coverage: `data/coverage/visit-facility-coverage.json`
- Summary: total 93, implemented-verified 93, approved-excluded 0, blocked 0, scope-redesign-required 0, `completedAllowedNow: true`.
- Correction: the old M36 `mapped 7` visit place definition closure is no longer used as completion. Those 7 place definitions are now implemented-verified source units with runtime consumer and smoke verification.
- Row evidence: 559 coverage rows remain tracked as source evidence, grouped into 86 visit action units and 7 visit place definition units.
- Next strict target: M37 work/job closure correction.

## 2026-05-06 M35 strict closure complete

M35 is now closed under the strict source-unit manifest rule.

- Manifest: `data/coverage/manifests/M35-source-units.json`
- Closure: `data/coverage/milestones/M35-closure.json`
- Coverage: `data/coverage/turn-pipeline-coverage.json`
- Summary: total 8, implemented-verified 8, approved-excluded 0, blocked 0, scope-redesign-required 0, `completedAllowedNow: true`.
- Correction: the old M35 `mapped 7` closure is no longer used as completion. The 7 save-field rows are supporting evidence for 8 functional turn pipeline units.
- Next strict target: M37 work/job closure correction.

## 2026-05-06 M34.5 strict closure complete

M34.5 is now closed under the strict source-unit manifest rule.

- Manifest: `data/coverage/manifests/M34.5-source-units.json`
- Closure: `data/coverage/milestones/M34.5-closure.json`
- Summary: total 188, implemented-verified 188, approved-excluded 0, blocked 0, scope-redesign-required 0, `completedAllowedNow: true`.
- M34.5 ownedTotal is 188 substantive hardening units: 169 evidence corrections and 19 registry contracts. The closure responsibilityIntegrity check is mandatory but is not counted as a source unit.
- This closes verification/hardening scope only. It does not implement M35-M52 feature runtime behavior.
- Next strict target: M37 work/job closure correction.

## 2026-05-06 M34 strict closure complete

M34 is now closed under the strict source-unit manifest rule.

- Manifest: `data/coverage/manifests/M34-source-units.json`
- Closure: `data/coverage/milestones/M34-closure.json`
- Coverage: `data/coverage/social-equipment-cflag-coverage.json`
- Summary: total 2,241, implemented-verified 2,241, approved-excluded 0, blocked 0, scope-redesign-required 0, `completedAllowedNow: true`.
- M34 ownedTotal is 2,241 social/equipment/CFLAG source units: CFLAG definitions, CFLAG/RELATION seeds, equipment/clothing save rows, clothing session view rows, wardrobe route behavior, and item 211 apron costume behavior.
- M33 CFLAG/FLAG/PBAND 79 rows and M30/M29/M31 inbound clothing/equipment rows are no longer blocked inbound; they are accepted and closed by M34 implementation evidence.
- M34 gate forbids `mapped`, `transferred`, and `source-file-review` statuses as completion evidence.
- Next strict target: M37~M41 before M42 resumes.

## 2026-05-05 책임 명시/freeze 우선

M28~M36 are strict-closed after the M28/M29/M31 source-owner corrections. Next work starts with M37~M41 source-unit closure inside the existing phase/milestone documents.

- 중앙 기준: `docs/milestones/PORT_RESPONSIBILITY_MAP.ko.md`
- 판정 기준: `docs/milestones/RESPONSIBILITY_SEPARATION_RULES.ko.md`
- 시작 문서: `docs/agent/CODEX_BOOTSTRAP.ko.md`, `docs/agent/NEXT_MILESTONE.ko.md`
- 원칙: 구현 중 책임을 이관하며 완료 범위를 줄이지 않는다. 다른 owner 후보가 보이면 구현을 멈추고 `scope-redesign-required`로 막은 뒤 책임 지도와 receiver manifest를 먼저 고친다.
- 각 남은 M32~M52는 기존 `PHASE_5_M28_M49.ko.md`와 `PHASE_6_M50_M52.ko.md`의 자기 체크 항목에 `[HERE]`, `[LATER]`, `[EXCLUDED]`, `[BLOCKED]`, `[REDESIGN]`, `[VERIFY]`, `[DOC-ONLY]`를 직접 붙인다.
- Processing order: M37~M41, M42~M44, M45~M49, M50~M52.

## 2026-05-02 M30 strict closure complete

M30 is now closed under the source-unit manifest rule.

| item | result |
| --- | --- |
| Manifest | `data/coverage/manifests/M30-source-units.json` |
| Closure | `data/coverage/milestones/M30-closure.json` |
| Source units tracked | 74 |
| M30-owned item-use units | 37 |
| Implemented-verified | 37 |
| Approved-excluded from M30 ownership | 37 |
| Blocked | 0 |
| Scope-redesign-required | 0 |
| `completedAllowedNow` | true |

The 37 non-M30 rows are not counted as M30 implementation. They remain visible in the manifest with receiving owner milestones.

Follow-up responsibility check:
- All 37 M30 approved exclusions now have explicit blocked inbound responsibility in receiving manifests.
- Receiver distribution: M34 3, M41 6, M42 18, M43 8, M44 2.
- `gate:item-use-coverage` now fails if an M30 transfer row is missing from the receiver manifest.

Verification:
- `npm run coverage:item-use`
- `npm run gate:item-use-coverage`
- `npm run gate:milestone-scope-closure -- M30`
- `npm run smoke:item-use`
- `npm run smoke:item-shop`
- `npm run build`
- `npm run test --if-present`
- `npm run gate:coverage-hardening`

## 2026-05-06 M29 source-owner correction complete

M29 is now closed under the source-unit manifest rule.

| item | result |
| --- | --- |
| Manifest | `data/coverage/manifests/M29-source-units.json` |
| Closure | `data/coverage/milestones/M29-closure.json` |
| Source units tracked | 206 |
| M29-owned purchase units | 101 |
| Implemented-verified | 101 |
| Approved-excluded from M29 ownership | 105 |
| Blocked | 0 |
| Scope-redesign-required | 0 |
| `completedAllowedNow` | true |

The 105 non-purchase/use/equipment/recruit/event/downstream rows are not counted as M29 implementation. They remain visible in the manifest with receiving owner milestones. The 18 purchasable immediate-use listing/ITEMSALES rows were reclaimed into M29 and implemented-verified.

Follow-up responsibility check:
- All 105 M29 approved exclusions now have explicit matching inbound responsibility in receiving manifests.
- Existing matches: M30 49, M31 48, M34 12, M35 2.
- Added blocked inbound units: M32 4, M37 2, M47 4, M48 1, M49 1.
- `gate:shop-purchase-coverage` now fails if an M29 transfer row is missing from the receiver manifest.

Verification:
- `npm run coverage:shop-purchase`
- `npm run gate:shop-purchase-coverage`
- `npm run gate:milestone-scope-closure -- M29`
- `npm run smoke:item-shop`
- `npm run smoke:phase1`
- `npm run build`
- `npm run test --if-present`

## 2026-05-02 M28-M52 registry gap closed

The criteria baseline and registry enforcement are complete for M28~M52.

| item | result |
| --- | --- |
| Registry generator | `tools/build_coverage_gate_registry.mjs` |
| Registry output | `data/coverage/coverage-gate-registry.json` |
| Contract count | 26 |
| Missing registry contracts | 0 |
| Hardening gate | `npm run gate:coverage-hardening` passed |
| Consistency report | `data/coverage/manifests/M28-M52-criteria-consistency.json` |

Next work is closing manifest units through real implementation evidence, approved exclusion, or explicit scope redesign. Do not create new ad hoc checklist criteria for M28~M52.

## 2026-05-02 M28 strict closure complete

M28 is now closed under the source-unit manifest rule.

| item | result |
| --- | --- |
| Manifest | `data/coverage/manifests/M28-source-units.json` |
| Closure | `data/coverage/milestones/M28-closure.json` |
| Implemented-verified | 24 |
| Approved-excluded | 3 |
| Blocked | 0 |
| Scope-redesign-required | 0 |
| `completedAllowedNow` | true |

The 24 SHOP_MAIN menu rows are M28-owned route contracts. The 3 BOYFRIEND event-local session rows are excluded from M28 ownership and remain M47 event/world responsibility.

Verification:
- `npm run coverage:main-routes`
- `npm run gate:main-route-coverage`
- `npm run gate:milestone-scope-closure -- M28`
- `npm run smoke:main-routes`
- `npm run build`
- `npm run test --if-present`

## 2026-05-02 M28-M52 criteria consistency complete

The criteria-side baseline is complete.

| item | result |
| --- | --- |
| Consistency report | `data/coverage/manifests/M28-M52-criteria-consistency.json` |
| Summary doc | `docs/milestones/M28_M52_CRITERIA_CONSISTENCY.ko.md` |
| Manifests present | M28~M52 all present |
| `completedAllowedNow: true` | 8 |
| `completedAllowedNow: false` | 16 |
| Total units | 11,250 |
| Implemented-verified | 8,879 |
| Blocked | 2,016 |
| Scope-redesign-required | 31 |
| Approved-excluded | 315 |
| Known criteria gap | none; M28~M52 registry contracts exist |

Next work is closure/implementation evidence, not more checklist invention.

## 2026-05-02 M50-M52 criteria manifests added

First-pass criteria manifests were added for M50-M52.

| milestone | manifest | criteria units | queued source rows | blocked | scope-redesign-required | completedAllowedNow |
| --- | --- | ---: | ---: | ---: | ---: | --- |
| M50 | `data/coverage/manifests/M50-source-units.json` | 9 | 193 | 9 | 0 | false |
| M51 | `data/coverage/manifests/M51-source-units.json` | 8 | 1 | 7 | 1 | false |
| M52 | `data/coverage/manifests/M52-source-units.json` | 10 | 0 | 10 | 0 | false |

This closes criteria call 3 only. The only remaining criteria task is the full M28-M52 consistency pass.

## 2026-05-02 M45-M49 criteria skeleton added

First-pass criteria skeleton manifests were added for M45-M49.

| milestone | manifest | criteria units | queued source rows | blocked | scope-redesign-required | completedAllowedNow |
| --- | --- | ---: | ---: | ---: | ---: | --- |
| M45 | `data/coverage/manifests/M45-source-units.json` | 2 | 1122 | 1 | 1 | false |
| M46 | `data/coverage/manifests/M46-source-units.json` | 1 | 432 | 1 | 0 | false |
| M47 | `data/coverage/manifests/M47-source-units.json` | 8 | 358 | 8 | 0 | false |
| M48 | `data/coverage/manifests/M48-source-units.json` | 2 | 325 | 1 | 1 | false |
| M49 | `data/coverage/manifests/M49-source-units.json` | 2 | 150 | 1 | 1 | false |

This closes criteria call 2 only. Common system, mission, event/world, ending/meta, and view/text/settings are still not implemented.

## 2026-05-02 M42-M44 criteria pass added

First-pass source-unit criteria manifests were added for M42-M44.

| milestone | manifest | total | implemented-verified | blocked | scope-redesign-required | completedAllowedNow |
| --- | --- | ---: | ---: | ---: | ---: | --- |
| M42 | `data/coverage/manifests/M42-source-units.json` | 35 | 0 | 35 | 0 | false |
| M43 | `data/coverage/manifests/M43-source-units.json` | 35 | 0 | 32 | 3 | false |
| M44 | `data/coverage/manifests/M44-source-units.json` | 61 | 0 | 38 | 23 | false |

This closes criteria call 1 only. Training effects are still not implemented.

## 2026-05-02 M36-M41 reassessment added

Parallel agent review was incorporated into first-pass source-unit manifests for M36-M41. None of these milestones can keep `completed` under the strict rule.

| milestone | manifest | total | implemented-verified | blocked | scope-redesign-required | completedAllowedNow |
| --- | --- | ---: | ---: | ---: | ---: | --- |
| M35 | `data/coverage/manifests/M35-source-units.json` | 8 | 0 | 7 | 1 | false |
| M36 | `data/coverage/manifests/M36-source-units.json` | 93 | 93 | 0 | 0 | true |
| M37 | `data/coverage/manifests/M37-source-units.json` | 463 | 333 | 130 | 0 | false |
| M38 | `data/coverage/manifests/M38-source-units.json` | 6 | 0 | 6 | 0 | false |
| M39 | `data/coverage/manifests/M39-source-units.json` | 174 | 135 | 39 | 0 | false |
| M40 | `data/coverage/manifests/M40-source-units.json` | 11 | 5 | 6 | 0 | false |
| M41 | `data/coverage/manifests/M41-source-units.json` | 1625 | 4 | 1620 | 1 | false |

Main follow-up: M41 availability cannot be complete without branch-level verification. M35 and M38 mapped-only closures need full re-verification.


## 2026-05-02 M31~M34.5 재판정 추가

M31~M34.5에 대해 병렬 에이전트 비판 검토 결과를 반영해 source-unit manifest 1차 산출물을 만들었다. 새 기준에서는 이 구간도 `completed` 유지가 불가하다.

| milestone | manifest | total | implemented-verified | blocked | scope-redesign-required | completedAllowedNow |
| --- | --- | ---: | ---: | ---: | ---: | --- |
| M31 | `data/coverage/manifests/M31-source-units.json` | 237 | 127 | 0 | 0 | true |
| M32 | `data/coverage/manifests/M32-source-units.json` | 298 | 291 | 0 | 0 | true |
| M33 | `data/coverage/manifests/M33-source-units.json` | 5378 | 5299 | 0 | 0 | true |
| M34 | `data/coverage/manifests/M34-source-units.json` | 2241 | 2241 | 0 | 0 | true |
| M34.5 | `data/coverage/manifests/M34.5-source-units.json` | 188 | 188 | 0 | 0 | true |

구체적 후속 처리:

- M31: strict-closed. recruit listing/price/condition/generation/session과 creation result integration이 implemented-verified 153개로 닫혔다.
- M32: strict closure 완료. source-file-review 3개는 M47/M49 approved-excluded 및 blocked inbound로 남겼고, CSTR label 5개는 구현 검증으로 승격했다.
| Character/CFLAG owner status | M34 is strict-closed after 2026-05-08 recheck: total 2,241, implemented-verified 2,241, blocked 0. M33 inbound CFLAG/FLAG/PBAND 76 rows and item 211 apron behavior are closed in M34. | M50/M52 must still re-verify full save/load roundtrip. |
- M34: strict closure complete. Item 211 apron flow and M33 inbound CFLAG/FLAG/PBAND are implemented-verified in M34.
- M34.5: closure에 `responsibilityIntegrity`를 추가하지 않으면 hardening 완료로 보지 않는다.

기준 날짜: 2026-05-02

## 에이전트 시작점

Codex/서브에이전트는 토큰 누수 방지를 위해 `docs/agent/CODEX_BOOTSTRAP.ko.md`, `docs/agent/CURRENT_STATUS.ko.md`, `docs/agent/NEXT_MILESTONE.ko.md`를 먼저 읽는다. 이 문서들은 dashboard이며 완료 판정 권위가 아니다. 완료 판정은 원본 파일, coverage 원장, gate/smoke/build, gap audit, closure JSON으로만 한다.

전체 책임 구조는 `docs/milestones/PORT_RESPONSIBILITY_MAP.ko.md`와 각 phase 문서의 `페이즈 책임`에 둔다. 각 마일스톤은 원본 단위 매니페스트를 만들고 단위별로 `implemented-verified`, `approved-excluded`, `blocked`, `scope-redesign-required` 중 하나로 닫아야 한다. completed/blocked/scope-redesign-required의 공통 판정 기준은 `docs/milestones/RESPONSIBILITY_SEPARATION_RULES.ko.md`에 둔다. `[구현]` 마일스톤의 `transferredOut`, file-level `source-file-review`, owner-only `mapped`는 완료 근거가 아니라 재판정 신호다.

현재 완료 표에 남아 있는 과거 `mapped`/`transferredOut` 기반 완료 기록은 새 기준의 최종 완료 근거가 아니다. 해당 마일스톤을 재개하거나 최종 감사할 때 원본 단위 매니페스트 기준으로 다시 판정한다.

## 완료

| 항목 | 상태 |
| --- | --- |
| 작업 폴더 | `web-port-next` 생성 |
| 기본 프로젝트 | Vite/React/TypeScript 골격 구성 |
| 모듈 경계 | `kernel`, `game`, `catalog`, `domains`, `features`, `ui`, `adapters/legacy` 경계 생성 |
| 도메인 골격 | `people`, `body`, `social`, `text`, `economy`, `inventory`, `equipment`, `shop`, `work`, `mission`, `meta`, `world`, `run`, `settings`, `save`, `feature-state`, `feature-session`, `interaction`, `script`, `ui` 생성 |
| 상태 분리 | `GameState`와 `GameSession` 분리 |
| 정의 데이터 분리 | 정의 데이터를 저장 상태에서 분리하고 `GameRuntime.initialCatalog` 방향으로 관리 |
| 원본 흐름 분석 | ERB/ERH 분석 산출물 생성, 기능 흐름을 `GAME_FLOW_MAP.ko.md`에 정리 |
| 원본 상태 소유권 | `DOMAIN_INVENTORY.ko.md`에 하위 도메인 배치 정리 |
| 원본 변수 묶음 판정 | `LEGACY_ROLE_DECISIONS.ko.md`에 확정/보류 기록 |
| 원본 주소 수집 | `npm run inventory:legacy-mapping`과 관련 산출물 생성 |
| CSV 정의 데이터 수집 | `npm run collect:catalog`과 `data/catalog/legacy-catalog.json` 생성 |
| 문서 책임 분리 | `docs/README.md` 기준으로 운영 문서와 기준 문서 역할 분리 |
| 페이즈 구분 | `NEW_PORT_MILESTONES.ko.md`에 Phase 1~6 범위와 근거 명시 |
| M0 기준 동결 | Phase 1 범위, 포함/제외 기능, 대상 파일, blocker 가능 지점 확인 |
| M1 공통 실행 계약 | `UiRoute`, `GameAction`, `GameEffect`, `GameActionResult`, result helper, `dispatchGameAction()` 구현. 알 수 없는 action은 실패 result로 처리 |
| M2 데이터 구조 v1 | `GameData`, view 모델 타입, save payload 타입, 상태/action result/save payload 경계 helper 작성 및 Phase 1 smoke에서 실행 |
| M3 정의 데이터 연결 | `legacy-catalog.json`을 runtime 정의 데이터로 연결하고 `GameDefinitions` bridge, item/recruit/shop listing 분류, 조회 실패 helper 추가. M6 상점에는 구매형 listing만 노출 |
| M4 새 게임 생성 | `game/new` handler, EASY/NORMAL 입력, 초기 날짜/목표/자금/시작 인물/시작 아이템, 실패 불변 처리 구현 |
| M5 메인 화면 view | `mainMenu` route, 메인 메뉴 view 계산, enabled/disabled 사유, effect 로그, unknown route 경로 구현 |
| M6 아이템 구매 1차 | 상점 진입, 판매 listing 계산, 선택/수량 변경, 구매 성공/실패/취소, 돈/인벤토리 반영 구현 |
| M7 고용/영입 1차 | 영입 listing view, 후보 선택, 돈 부족 실패, 영입 성공, 중복 실패, 취소, `people/body/social/equipment` 생성 경계 구현 |
| M8 턴 종료/시간 진행 | `turn/end` action, 주차/월 롤오버, phase 복귀, 예약 이벤트 소비, session 임시 상태 폐기 경계 구현. 미션/월말 hook은 M35에서 실제 처리로 승격 |
| M9 저장/로드 | 저장 payload schema v1, 직렬화/역직렬화, 손상 JSON/future schema/runtime 오염 payload 실패, 저장 roundtrip, `saveLoad` session 폐기 구현 |
| M10 방문/시설 1차 | 방문 장소/행동 view, 조직 사무소 기본 방 사용 허가, 돈 부족/중복/취소 실패 경로, `world.unlocks`와 `featureState.visits` 저장 경계, `visit` session 폐기 구현 |
| M11 미션 1차 | 미션 정의 1개, 미션 목록/선택 view, 수락/보고 action, 조건 미충족 실패, 방문 해금 조건 연동, 보상 지급, `mission` 저장 상태와 `mission-session` 경계 구현 |
| M12 업무 1차 | 업무 정의 1개, 업무/참여 인물 선택 view, 결과 계산/저장 반영 분리, 돈/경험/신체 피로/업무 이력 저장 반영, 완료 후 턴 종료, `work-session` 폐기 구현 |
| M13 촬영 1차 | 촬영 장면 정의 1개, 촬영 대상/장면 선택 view, 대상/장면 누락 실패, 선택/화면 취소, 촬영량 session 계산, 수익/팬/점수/경험/신체 피로/촬영 이력 저장 반영, 완료 후 턴 종료, `shooting-session` 폐기 구현 |
| M14 훈련 1차 | 훈련 command 1개, 대상/실행자/조수 선택 상태, command 후보 view, 불가 사유, 자극/파라미터/체력 소모/session 계산 버퍼, 파라미터/자원/경험/신체 피로 저장 반영, 완료 후 턴 종료, interaction session 폐기 구현 |
| M15 화면 정리와 진단 패널 | `AppLayout`을 runtime state/session과 action dispatch 소유자로 축소하고, route별 renderer를 `RouteScreens.tsx`로 분리. 공통 선택지/요약 UI와 읽기 전용 진단 패널을 추가해 route/state/session/effect/boundary 요약 표시 |
| M16 테스트/검증 체계 확장 | `test:roundtrip`, `gate:boundaries`, `gate:raw-names`, `gate:stubs`, `verify:m16` 추가. 새 테스트 framework 없이 기존 Vite smoke와 Node gate script를 묶어 build 단독 완료를 차단 |
| M17 원본 근거 대조 정책 | `LEGACY_MAPPING_POLICY.ko.md` 추가. mapping 상태값, M52 허용/차단 의미, evidence 요구사항, 불명확 주소 처리, `approved-excluded` 승인 조건, adapter import 금지 경계를 확정. `src/game` core에서 legacy adapter import를 제거하고 `src/runtime.ts` 조립 경계로 이동 |
| M18 반복 구현 규칙 고정 | `IMPLEMENTATION_UNIT_RULES.ko.md` 추가. M28~M49 구현 단위를 1개 feature/item/scene/command 등으로 제한하고, 구현 전 template, 구현 후 template, blocker template, 완료 차단 규칙을 확정 |
| M19 원본 기능 커버리지 전수표 | `data/coverage/features.json`과 `data/coverage/blockers.json` 생성. dynamic call 66개, persistence 134개, exit 3,536개, pause 931개, engine entry 9개, unreferenced global 652개, 메인 흐름/메뉴 row를 feature id 또는 blocker로 분류. `gate:feature-coverage` 추가 |
| M20 정의 데이터 전수 분류와 소비 책임 배정 | `data/coverage/definitions.json` 생성. raw 정의 918개와 Chara seed 6,922행을 source evidence, 역할, runtime owner 후보, 실제/예정 consumer, status 또는 blocker로 분류. `gate:definition-consumption` 추가. M20 완료는 실제 컨텐츠 효과 구현 완료가 아니라 M28~M49 소비 책임 장부 완성 |
| M21 원본 근거 장부 확정 | `source-manifest.json`, `source-evidence.schema.json`, `coverage:source-manifest`, `gate:source-evidence` 기준으로 실제 원본 위치 없는 완료 row와 문서만 근거인 완료 row를 차단 |
| M22 coverage 교차 대조 gate | feature/definition/save/session/view/text/blocker/approved-exclusion 참조 규칙을 `coverage-crosscheck.json`, `gate:coverage-crosscheck`, `gate:approved-exclusions`로 검증 |
| M23 ERB 기반 정의 데이터 보강 | ERB 메뉴/장면/이벤트/미션/업무/촬영/훈련/엔딩/text 후보 160행을 정의 coverage에 병합하고 `gate:erb-definition-coverage`로 확인 |
| M24 저장 상태 원본 주소 전수 매핑 | `save-mapping.json` 생성. `map-save-state` 1,215행을 save-field 989개와 non-save 226개로 닫고 미판정 0개 확인 |
| M25 세션/계산 원본 주소 전수 매핑 | `session-mapping.json`과 calculation lifecycle을 생성. `map-session-state` 365행을 session-field 298개와 calculation-internal 67개로 닫고 save payload 경계를 확인 |
| M26 구현 전 누락 감사 | `pre-implementation-gap-audit.json` 생성. implementation review 14,546행과 source-file-review 13행을 검토하고 미해소 issue 0개로 닫음 |
| M27 구현 단위 큐와 blocker 동결 | `implementation-queue.json`, `blocker-freeze-list.json` 생성. queue unit 36개, review row 14,546개, frozen blocker 59개, approved exclusion request candidate 59개로 동결 |
| M28 메인 화면 route 전수 연결 | `unit:M28:main-route` 27행을 닫음. 메인 메뉴 정의 24개는 route/action/view/dispatch/smoke 근거를 갖고 BOYFRIEND event-local screen session row 3개는 M47로 이관 |
| M29 아이템 상점과 구매 | source-owner correction 후 strict-closed. source-unit manifest 기준 206행은 implemented-verified 101, approved-excluded 105, blocked 0이다. 즉시 사용 purchasable item listing/ITEMSALES 18개를 M29-owned로 회수해 구현 검증했다. |
| M29/M30 아이템 경계 | M30의 즉시 사용 효과 구현 이력은 남아 있다. | item 30/31/38/39/40/41/42/43/52의 효과는 M30이지만 listing/ITEMSALES/구매 선택은 M29가 닫았다. 특수 item 200~214, item 22/90/91, item 211 계열은 M30 완료가 아니며 M34-closed plus M41/M42/M43/M44 수신 manifest에 blocked inbound로 명시했다 |
| M31 영입 listing과 인물 생성 | source-owner correction 후 strict-closed. source 237행은 implemented-verified 153, approved-excluded 84, blocked 0이다. `Item.csv` 영입 listing 48개, `recruit:150` 반복 영입, creation result integration을 M31 책임으로 검증했다. |
| M32 인물 원형과 identity 완성 | implementation queue 274행, M31 inbound 20행, M29 inbound 4행, 총 298행을 M32-owned implemented-verified 291개와 approved-excluded 7개로 strict closure. Chara template 109개, identity, CSTR seed/label, lifecycle 상태를 정의/save 경계에 연결 |
| Character/CFLAG owner status | M34 is strict-closed after 2026-05-08 recheck: total 2,241, implemented-verified 2,241, blocked 0. M33 inbound CFLAG/FLAG/PBAND 76 rows and item 211 apron behavior are closed in M34. | M50/M52 must still re-verify full save/load roundtrip. |
| M34 relationship/CFLAG/equipment/clothing owner evidence | Strict closure complete after 2026-05-08 recheck: total 2,241, implemented-verified 2,241, approved-excluded 0, blocked 0. CFLAG definitions, Chara CFLAG seeds, RELATION seeds, clothing pack/equipment save/session rows, item 211 apron flow, and wardrobe route are covered by M34 implementation evidence. |
| M35 턴 종료와 시간 진행 완성 | M35 queue 4행과 M29/M31 inbound transfer 3행, 총 7행을 mapped 7, unresolved issue 0개로 닫음. day/week/month/year 진행, 시간 counter, 주/월 자동 hook, 미션 기한, 이벤트 hook, session cleanup, save roundtrip을 `smoke:turn-long`으로 검증 |
| M36 visit/facility complete | Strict closure complete: 93 source units implemented-verified, mapped 0, blocked 0. The 559 coverage rows remain row evidence; seven visit places and 86 source-label visit actions are verified by route/action/view/save consumers and `smoke:visit-all`. |

## M37 업데이트

- M37 업무/창관/특수 업무는 strict 기준으로 아직 완료가 아니다.
- source-unit manifest 기준 total 463, implemented-verified 333, blocked 130이다. old `mapped` 175는 완료 근거가 아니다.
- ERB-derived 업무 listing 8개와 원본 업무 source file + source label 기반 업무 정의 72개를 runtime `definitions.workDefinitions`로 연결했다.
- `work/select`, `work/selectCharacter`, `work/execute`, `work/cancel`이 성공/실패/대상 누락/취소/session cleanup/턴 종료/save roundtrip을 검증한다.
- `coverage:work`, `gate:work-coverage`, `smoke:work-all`은 placeholder가 아니라 실제 script다.
- 2026-05-07 정정: `coverage:work`는 더 이상 mapped 175개를 완료로 세어 M37 closure를 `completed`로 덮어쓰지 않는다. strict manifest 기준 total 463, implemented-verified 333, blocked 130이 유지되며 `gate:milestone-scope-closure -- M37`는 실패해야 정상이다.
- M38 촬영 정의와 장면 조건은 strict 기준 미완료다.
- `unit:M38:filming-definition` 6행은 mapped/indexing만으로는 완료가 아니어서 closure를 `blocked`로 정정했다. 현재 total 6, implemented-verified 0, blocked 6이다.
- ERB-derived 촬영 장면 6개를 runtime `definitions.filmingSceneDefinitions`로 연결했다.
- `smoke:filming-scenes`가 장면 표시, 대상 조건 실패, 장면 선택, 취소, session cleanup, save roundtrip을 검증한다.
- M39 촬영 실행/결과/판매는 strict 기준 미완료다.
- M39 owned scope 174행 중 135개 구현 검증은 남지만, save/session/calculation 39개가 blocked라 closure를 `blocked`로 정정했다.
- 촬영 실행 결과는 `economy.videoSalesTotal`, `work.filmingProgressFlags`, `work.filmingByCharacterId`, `work.careerFlagsByCharacterId`, `people`, `body` owner에만 반영된다.
- `session.shooting.sceneTemporaryValues`, `session.shooting.sceneFlags`, `session.interaction.participants.assistantId`는 촬영 실행 중 session/calculation 값으로만 소비되고 저장 payload에 남지 않는다.
- `coverage:filming-execution`, `gate:filming-execution`, `smoke:filming-all`은 placeholder가 아니라 실제 script다.
- M40 훈련 메뉴와 세션은 strict 기준 미완료다.
- M40 owned scope 11행 중 5개 구현 검증은 남지만, mapped training flow 6개가 blocked라 closure를 `blocked`로 정정했다.
- 원본 `TRAIN_MAIN.ERB`의 `EVENTTRAIN`, `EVENTCOM`, `EVENTCOMEND`, `EVENTEND`, `JUEL_CHECK`, `SHOW_STATUS`, `FIGURE_INDENT`, `FIGURE_INDENT_SLASH`를 runtime consumer와 smoke 검증에 연결했다.
- 105개 훈련 command 후보 전체 view, 대상/실행자/조수 선택, 조수 해제, command 선택 reset, 누락/불가 실패, 선택 취소, 화면 취소, 실행 후 턴 종료와 session cleanup을 `smoke:training-session`으로 검증했다.
- `coverage:training-session`, `gate:training-session`, `smoke:training-session`은 placeholder가 아니라 실제 script다.
- M41 훈련 가능 조건은 strict 기준 미완료다.
- M41은 기존 coverage에서 1,625행을 구현/매핑 근거로 닫았지만, strict manifest에는 M30 inbound 6개가 추가되어 total 1,631, implemented-verified 4, blocked 1,626, scope-redesign-required 1이며 closure를 `blocked`로 정정했다.
- 원본 `COMABLE.ERB`의 `COM_ABLE*` source program 125개를 추출했고, `Train.csv` active command 105개 전부가 대응 source program을 가진다.
- 원본 `COMSEQ_REGISTER.ERB` dynamic call row와 `COMORDER.ERB` source-file-review row를 coverage/audit/closure에 반영했다.
- availability는 저장 상태를 바꾸지 않는 view 계산으로 연결했고, 불가 command는 원본 availability rule 기반 사유를 표시한다. command 효과와 후처리는 M42~M44 소유로 남긴다.
- `coverage:training-availability`, `gate:training-availability`, `smoke:training-availability`는 placeholder가 아니라 실제 script다.
- Next work is M37~M41 source-unit closure. M42 resumes only after M37~M41 are actually closed or explicitly blocked/scope-redesign-required.
- M28~M36 recheck status: M28~M34 are rechecked in the current pass. M34 total is 2,241 implemented-verified, blocked 0; next recheck target is M35.

## 미완료

| 항목 | 상태 |
| --- | --- |
| 저장/로드 완성 | M9 최소 roundtrip은 완료. 모든 주요 기능 후 저장 roundtrip, migration, corrupted/future/old schema 전체 처리는 M50에서 완성하고 M52에서 최종 검증 |
| 미션 완성 | M11 최소 미션 1개는 완료. 미션 전체 정의/기한/성공/실패/보상/이벤트 연동은 M46에서 완성 |
| 업무 완성 | M12 최소 업무 1개는 완료. 업무/창관/특수 업무 전체와 각 업무 후처리는 M37에서 완성 |
| 촬영 완성 | 아직 완료 아님. M38은 total 6 blocked 6, M39는 total 174 중 blocked 39라 strict closure가 `blocked`다. 이후 이벤트/세계 hook과 최종 저장/로드 재검증은 M47/M50/M52에서 다시 확인 |
| 훈련 완성 | 아직 완료 아님. M40은 total 11 중 blocked 6, M41은 total 1,631 중 blocked 1,626 및 redesign 1이라 strict closure가 `blocked`다. command 효과 0~34는 M42, 35~69는 M43, 70 이상 전체와 후처리는 M44에서 완성 |
| 자동 테스트 | M16 기준 범용 검증 묶음은 `npm run verify:m16`. Phase 1 dispatch smoke, M7 영입 smoke, M8 턴 종료 smoke, M9 저장/로드 smoke, M10 방문 smoke, M11 미션 smoke, M12 업무 smoke, M13 촬영 smoke, M14 훈련 smoke, 저장 roundtrip, boundary gate, raw-name gate, stub gate, build를 포함 |
| 확정 변환표 | M17에서 상태값/증거/차단 정책은 확정됨. M24에서 저장 mapping 장부를 만들었고 M25에서 세션/계산 mapping 장부를 만들었다 |
| 기능 전수 구현 | M19에서 기능 row 5,344개를 만들었고 11개만 현재 구현 완료 근거를 가진다. 나머지 5,333개는 M28~M49에서 구현 또는 사용자 승인 제외로 닫아야 할 blocker다 |
| 정의 전수 구현 | 아직 완료 아님. M20/M23 기준 definition row 8,000개를 만들고 역할/소비 책임을 배정했다. M31의 영입 listing, M30의 즉시 사용 item, M32~M41의 인물 identity, 신체/능력/소질/경험, CFLAG/장비/관계 일부, 턴/시간 진행, 방문/시설, 업무/창관/특수 업무, 촬영 장면 정의와 촬영 실행/판매, 훈련 세션 lifecycle과 훈련 가능 조건은 실제 소비 검증 근거가 있다. 단 M30에서 제외한 특수 item 200~214는 M42~M44 수신 blocked inbound로 남아 있다. 훈련 효과, 미션/이벤트/엔딩/정보 계열은 M42~M49에서 계속 닫아야 한다. `template`/`listing`/`display-only`/`calculation-only`는 실제 consumer와 verification이 붙기 전까지 최종 구현 완료가 아니다 |
| M34.5 전수 이식 gate hardening | 완료. auxiliary evidence 완료 근거 169개를 primary `VariableSize.CSV` evidence로 재연결했고, `gate:source-evidence`가 마일스톤별 coverage row까지 검사한다. M35~M52 전용 script registry와 최종 verify skeleton도 생성했다 | M37~M41은 일부 실제 script 이력이 있으나 strict closure는 blocked다. M42~M52 placeholder script는 실행 시 실패하므로 각 마일스톤에서 실제 coverage/gate/smoke 구현으로 교체해야 한다 |

## 데이터 완성도 판단

데이터는 “몇 줄을 JSON에 넣었는가”가 아니라 실제 게임 구성에서 맡은 역할 기준으로 판정한다.

원본 기준:

- 변수, 정의 데이터, 기능 흐름, 저장/세션 판정의 1차 기준은 작업 루트의 `original-game/CSV`, `original-game/ERB`, `original-game/CSV/Chara*.csv`, `original-game/CSV/VariableSize.CSV`이다.
- `source.csv`, `cflag.csv`처럼 원본 CSV 폴더 밖에 있는 보조 정의는 해석 보조로만 삼는다. primary 원본 근거 없이 `used`, `template`, `listing`, `display-only`, `calculation-only`, `mapped`, `non-save`, `session-field`, `calculation-internal`, `script-scratch`, `approved-excluded` 완료성 상태를 부여하지 않는다.
- `docs/*` 문서는 원본을 읽기 쉽게 정리한 파생 해석이다. 문서만 보고 `implemented`, `used`, `mapped`를 부여하지 않는다.
- M21~M27에서는 source evidence, feature, definition, save mapping, session mapping을 서로 대조하는 gate를 추가한다. 같은 gate는 M51/M52 최종 판정에서도 다시 실행한다.
- 누락 전수 감사는 구현 전, 기능군 중간, 최종 직전 세 번 필요하다. 산출물은 `data/coverage/audits/pre-implementation-gap-audit.json`, `data/coverage/audits/Mxx-gap-audit.json`, `data/coverage/audits/final-gap-audit.json`이며, 미등록 원본 컨텐츠/role-only 완료/orphan coverage가 있으면 다음 단계로 넘어가지 않는다.

| 구분 | 현재 상태 | 완료선 |
| --- | --- | --- |
| raw 정의 데이터 수집 | CSV/Chara 정의 918개 수집, Chara 초기값 6,922행 수집. 수집 진단 0건 | M20 coverage에서 raw 정의 918개와 Chara seed 6,922행이 모두 row를 가져야 함 |
| definition coverage | row 8,000개 생성. `template` 5,566개, `display-only` 456개, `calculation-only` 35개, `listing` 207개, `used` 1개, `blocker` 1,735개. 이 중 `template`/`listing`/`display-only`/`calculation-only`는 역할 판정과 소비 책임 배정이며, 실제 소비 검증은 아직 남아 있음 | M28~M49에서 실제 handler/view/calculation/save-init 소비 검증을 붙이고 M52에서 미분류/미소비/미검증 정의 0개 |
| runtime 보강 정의 | M23에서 ERB 기반 정의 160행을 추가했다. 메뉴/방문/미션/업무/촬영/이벤트/엔딩/업적/help text 정의 후보를 runtime definition row로 만들었고, 방문 장소 7개는 M36, 업무 정의는 M37, 촬영 장면 정의는 M38에서 소비 검증을 붙였다 | M40~M49에서 남은 원본 근거 기반 정의 전체를 실제 소비 검증해야 함 |
| Item.csv 역할 분리 | 109개 중 구매형 listing은 M29, 즉시 사용 item은 M30, 영입 listing은 M31에서 실제 소비 검증을 붙였다. 특수 item 200~214는 M30에서 excluded 처리되어 M42~M44 blocked inbound로 남아 있고, item 22/90/91은 M41 훈련 가능 조건 owner에 명시했다. cosplay/clothing pack과 장비/의복 계열은 M34에서 닫았다 | 남은 item/listing row는 각 owner 마일스톤에서 handler, 실패/취소, 저장 roundtrip 또는 사용자 승인 제외 근거를 가져야 함 |
| Character/CFLAG owner status | M34 is strict-closed after 2026-05-08 recheck: total 2,241, implemented-verified 2,241, blocked 0. M33 inbound CFLAG/FLAG/PBAND 76 rows and item 211 apron behavior are closed in M34. | M50/M52 must still re-verify full save/load roundtrip. |
| 저장 상태 mapping | M24에서 `map-save-state` 1,215행을 `mapped` 989개, `non-save` 226개로 닫았다. persistent 후보 1,016개는 save-field 985개, M25 session-state 이관 31개이며 M24 후 미판정 0개 | M28~M49에서 매핑된 save field를 실제 기능 구현과 roundtrip 검증에 소비하고 M52에서 미정 저장 주소 0개 |
| 세션/계산 mapping | M25에서 `map-session-state` 365행을 session-field 298개, calculation-internal 67개로 닫았다. runtime session 후보 234개는 화면/훈련/촬영/업무/script scratch 계열로 분류되었고 M25 후 미판정 0개 | M28~M49에서 매핑된 session/calculation row를 실제 기능 lifecycle에 소비하고 M52에서 미정 세션/계산 주소 0개 |
| 구현 전 누락 감사 | M26에서 implementation review 14,546행을 생성했다. source-file-review 13행은 M27 또는 구현 owner에 배정했고 missing evidence/orphan/role-only/unknown owner/unapproved exclusion 미해소 issue는 0개다 | M27에서 이 review row를 구현 큐로 동결하고 M28~M50에서 owner별로 닫아야 함 |
| 구현 큐와 blocker 동결 | M27에서 queue unit 36개, queued review row 14,546개, frozen blocker 59개, approved exclusion request candidate 59개를 생성했다. M27 owner로 남은 source-file-review 2개는 M51로 이관했다 | M28부터 queue unit과 blocker freeze list를 기준으로 각 owner가 자기 범위를 닫아야 함 |
| 메인 route 전수 연결 | M28에서 `unit:M28:main-route` 27행을 닫았다. 메인 메뉴 정의 24개는 `definitions.mainMenuOptions` -> `buildMainMenuView` -> `dispatchGameAction` -> route로 연결했고, BOYFRIEND event-local screen session row 3개는 M47로 책임 이관했다 | M28 소유 route row는 unresolved issue 0개 |
| 아이템 상점 구매 legacy 구현 | M29에서 `SHOP_ITEM.ERB` 기준 실제 구매형 listing 30개를 구현했고, `ITEMSALES`는 session visible listing, `BOUGHT`는 session 선택값으로 처리했다. 과거 `unit:M29:shop-purchase` 206행 closure는 strict 완료가 아니며 즉시 사용/특수 효과/의복 pack/비상점 item의 책임 재분리가 필요하다 | M29 strict closure는 다음 작업 |
| 아이템 사용 strict 완료 | M30에서 즉시 사용 아이템 30/31/38/39/40/41/42/43/52는 `session.shop` 사용 선택 흐름으로 소비했다 | 특수 item 200~214는 M30 완료가 아니며 M42~M44 receiver manifest에서 blocked inbound로 추적한다. M30 gate는 receiver manifest 매칭까지 확인한다 |
| 영입 listing과 인물 생성 완성 | M31에서 `Item.csv` 영입 listing 48개를 캐릭터 원형과 생성 결과로 연결했다. `recruit:150`은 `FLAG:90 < 5` 반복 영입 흐름에 맞춰 5회 생성으로 닫았다 | 은퇴/매각 및 일부 lifecycle/identity row는 M32/M34/M35/M47로 이관. M31 소유 blocker 0개 |
| 인물 원형과 identity 완성 | M32에서 Chara template 109개, 이름/호칭/별명/표시명, CSTR identity seed, 삭제/은퇴/조수 가능/영입 상태를 정의와 save 경계에 연결했다 | M33에서 신체/능력/소질/경험 계열을 이어서 닫았다 |
| 관계/CFLAG/장비/의복 owner 완성 | M34에서 `splitLegacyCharacterFlags`, `buildWardrobeView`, `main/openWardrobe`, `wardrobe/toggleClothing`을 추가해 CFLAG seed와 의복/장비 route를 실제 소비 경로에 연결했다. raw `CFLAG`는 runtime 모델명으로 남기지 않는다 | M34.5에서 auxiliary evidence 완료 근거와 최종 gate 부재를 해소했다 |
| source evidence hard gate | `npm run gate:source-evidence` 통과. `legacyCharacterFlagDefinitions` 151개와 `sourceDefinitions` 18개는 auxiliary 해석 보조를 유지하되 primary `VariableSize.CSV` evidence를 완료 근거로 사용한다 | 완료성 row가 auxiliary evidence만 가지면 gate가 실패한다 |
| M34.5 전수 이식 gate hardening | 완료. auxiliary evidence 완료 근거 169개를 primary `VariableSize.CSV` evidence로 재연결했고, `gate:source-evidence`가 마일스톤별 coverage row까지 검사한다. M35~M52 전용 script registry와 최종 verify skeleton도 생성했다 | M37~M41은 일부 실제 script 이력이 있으나 strict closure는 blocked다. M42~M52 placeholder script는 실행 시 실패하므로 각 마일스톤에서 실제 coverage/gate/smoke 구현으로 교체해야 한다 |
| 턴/시간 진행 완성 | M35에서 `coverage:turn-pipeline`, `gate:turn-pipeline`, `smoke:turn-long`을 실제 script로 교체했다. `run.clock`의 day/week/month/year/currentTimeSlot/counter와 `run.progressFlags.flag_34/flag_61`을 turn pipeline에서 소비하고, weekly/monthly hook, mission deadline, world event hook, monthly maintenance, session cleanup을 검증한다 | 완료 |
| 방문/시설 완성 | M36에서 `coverage:visit-facility`, `gate:visit-facility`, `smoke:visit-all`을 실제 script로 교체했다. 방문 장소 7개, 방문 source-label action 86개, M36 feature row 552개, visitPlaces definition 7개를 소비하고, 비용 부족/중복/취소/session cleanup/save roundtrip을 검증한다 | M37부터는 업무/창관/특수 업무 기능군을 같은 방식으로 owner row, coverage, gate, smoke, closure로 닫아야 함 |
| 기능 소비 관계 | 구매, 영입, 턴 종료, 저장/로드, 방문, 미션, 업무, 촬영, 훈련 1차 루프는 smoke로 연결됨. M20의 예정 consumer 문자열만으로 실제 소비 완료를 주장하지 않음 | M22/M26/M28~M49에서 모든 feature가 읽는 definition/save/session/view 역할을 실제 handler/view/calculation/smoke와 교차 검증해야 함 |
| feature coverage | row 5,344개 생성. `implemented` 11개, `blocker` 5,333개. dynamic/persistence/exit/pause/unreferenced global count가 원본 분석과 일치함 | M28~M49에서 blocker row를 줄이며 M52에서 미구현 feature 0개 |

## 마지막 검증

마지막 확인 명령:

```bash
npm run collect:catalog
npm run inventory:legacy-mapping
npm run coverage:features
npm run gate:feature-coverage
npm run coverage:definitions
npm run gate:definition-consumption
npm run analyze:game-system
npm run typecheck
npm run smoke:phase1
npm run smoke:m7
npm run smoke:m8
npm run smoke:m9
npm run smoke:m10
npm run smoke:m11
npm run smoke:m12
npm run smoke:m13
npm run smoke:m14
npm run test:roundtrip
npm run gate:boundaries
npm run gate:raw-names
npm run gate:stubs
npm run verify:m16
npm run coverage:source-manifest
npm run gate:source-evidence
npm run coverage:crosscheck
npm run gate:coverage-crosscheck
npm run gate:approved-exclusions
npm run coverage:erb-definitions
npm run gate:erb-definition-coverage
npm run coverage:save-mapping
npm run gate:save-mapping
npm run gate:state-family-index-coverage
npm run coverage:session-mapping
npm run gate:session-mapping
npm run gate:session-save-boundary
npm run audit:pre-implementation
npm run gate:pre-implementation-audit
npm run coverage:implementation-queue
npm run gate:implementation-queue
npm run coverage:main-routes
npm run gate:main-route-coverage
npm run gate:milestone-scope-closure -- M28
npm run smoke:main-routes
npm run coverage:shop-purchase
npm run gate:shop-purchase-coverage
npm run gate:milestone-scope-closure -- M29
npm run smoke:item-shop
npm run coverage:item-use
npm run smoke:item-use
npm run coverage:recruit
npm run gate:recruit-coverage
npm run gate:milestone-scope-closure -- M31
npm run smoke:recruit-all
npm run coverage:character-identity
npm run gate:character-identity
npm run gate:milestone-scope-closure -- M32
npm run smoke:character-identity
npm run coverage:body-stat
npm run gate:body-stat-mapping
npm run gate:milestone-scope-closure -- M33
npm run smoke:body-stat
npm run smoke:character-identity
npm run coverage:social-equipment-cflag
npm run gate:social-equipment-cflag
npm run gate:milestone-scope-closure -- M34
npm run smoke:social-equipment-cflag
npm run coverage:gate-registry
npm run gate:source-evidence
npm run gate:coverage-hardening
npm run gate:milestone-scope-closure -- M34.5
npm run coverage:turn-pipeline
npm run gate:turn-pipeline
npm run gate:milestone-scope-closure -- M35
npm run smoke:turn-long
npm run smoke:m8
npm run coverage:visit-facility
npm run gate:visit-facility
npm run gate:milestone-scope-closure -- M36
npm run smoke:visit-all
npm run smoke:m10
npm run coverage:work
npm run gate:work-coverage
npm run gate:milestone-scope-closure -- M37
npm run smoke:work-all
npm run smoke:m12
npm run coverage:filming-scene
npm run gate:filming-scene
npm run gate:milestone-scope-closure -- M38
npm run smoke:filming-scenes
npm run smoke:m13
npm run coverage:filming-execution
npm run gate:filming-execution
npm run gate:milestone-scope-closure -- M39
npm run smoke:filming-all
npm run smoke:m13
npm run coverage:training-session
npm run gate:training-session
npm run gate:milestone-scope-closure -- M40
npm run smoke:training-session
npm run smoke:m14
npm run coverage:training-availability
npm run gate:training-availability
npm run gate:milestone-scope-closure -- M41
npm run smoke:training-availability
npm run smoke:training-session
npm run smoke:m14
npm run verify:m16
npm run smoke:main-routes
npm run gate:definition-consumption
npm run typecheck
npm run build
npm run test --if-present
rg "adapters/legacy|legacy/" src/game src/domains src/catalog
rg "IMPLEMENTATION_UNIT_RULES|구현 전 template|구현 후 template|blocker template|M18" docs
rg "\bstate\.[A-Za-z0-9_.$\[\]?]+\s*=|\bsession\.[A-Za-z0-9_.$\[\]?]+\s*=|\.push\(|\.splice\(" src/ui
rg "CFLAG|TFLAG|SOURCE|TEQUIP|ITEMSALES|BOUGHT|COMF|SCENE_|LOSEBASE" src/game src/domains src/features src/ui
```

결과:

- `collect:catalog` 통과
- 정의 데이터 918개 수집
- Chara CSV 109개, Chara 초기값 6,922행 수집
- `smoke:phase1` 통과
- runtime bridge 기준 `items=61`, `recruitListings=48`, `shopListings=46`
- smoke에서 새 게임, 상점 진입, 돈 부족 구매 실패, 구매 성공, 취소, unknown action 실패, save payload 경계 검증 통과
- `smoke:m7` 통과
- M7 smoke에서 영입 화면 진입, 돈 부족 실패, 영입 성공, 중복 실패, 취소, `people/body/social/equipment` 생성 경계 검증 통과
- `smoke:m8` 통과
- M8 smoke에서 턴 종료, `day + 7`, `week 1~4` 롤오버, `month` 증가, `phase=freeAction` 복귀, 예약 이벤트 3종 소비, `shop/recruit/featureSession/interaction/script/ui choices` 임시 상태 폐기, save payload 경계 검증 통과
- `smoke:m9` 통과
- M9 smoke에서 저장/로드 화면 진입, 저장 스냅샷 생성, JSON 역직렬화, `session/views/definitions` payload 오염 차단, 손상 JSON 실패, future schema 실패, runtime 오염 실패, 저장 roundtrip으로 clock/money/item 복원 검증 통과
- `smoke:m10` 통과
- M10 smoke에서 방문 화면 진입, 조직 사무소 장소 선택, 기본 방 사용 허가 선택, 돈 부족 실패, 선택 취소, 성공 시 자금 감소와 `world.unlocks`/`featureState.visits` 저장 반영, 중복 실패, 메인 복귀와 `visit` session 폐기, save payload 경계 검증 통과
- `smoke:m11` 통과
- M11 smoke에서 미션 화면 진입, 미션 선택, 수락 전 보고 실패, 수락 상태 저장, 조건 미충족 보고 실패, 방문 해금 조건 달성, 보고 완료와 보상 지급, 완료 후 중복 보고 실패, 메인 복귀와 `mission-session` 폐기, save payload 경계 검증 통과
- `smoke:m12` 통과
- M12 smoke에서 업무 화면 진입, 업무/참여 인물 선택, 미선택/인물 누락 실패, 취소, 업무 실행, 돈/경험/신체 피로/업무 이력 저장 반영, 완료 후 턴 종료, `work-session` 폐기, save payload 경계 검증 통과
- `smoke:m13` 통과
- M13 smoke에서 촬영 화면 진입, 대상/장면 선택, 대상/장면 누락 실패, 선택 취소, 화면 취소, 촬영 확정, 수익/팬/점수/경험/신체 피로/촬영 이력 저장 반영, 완료 후 턴 종료, `shooting-session` 폐기, save payload 경계 검증 통과
- `smoke:m14` 통과
- M14 smoke에서 훈련 화면 진입, 대상/실행자/command 선택, command/대상/실행자 누락 실패, 선택 취소, 훈련 실행, 파라미터/자원/경험/신체 피로 저장 반영, 완료 후 턴 종료, interaction session 폐기, save payload 경계 검증 통과
- M15 UI 직접 상태 변경 검색 통과, `state.* =`, `session.* =`, `push`, `splice` 매칭 0개
- `test:roundtrip` 통과
- M16 roundtrip에서 새 게임, 아이템 구매, 영입, 턴 종료 후 snapshot/load가 save state를 정확히 복원함
- `gate:boundaries` 통과
- M16 boundary gate에서 runtime diagnostics error 0개, action result boundary, save payload boundary, session/definitions/views 오염 payload 실패 검증 통과
- `gate:raw-names` 통과
- `gate:stubs` 통과, 문서화된 보류 marker 28개와 미등록 marker 0개
- `verify:m16` 통과
- `inventory:legacy-mapping` 통과, 원본 주소 수집 진단 0건
- core adapter import 경계 검색 통과: `src/game`, `src/domains`, `src/catalog`에서 `adapters/legacy|legacy/` 매칭 0개
- M18 반복 구현 규칙 검색 통과: 기준 문서, 구현 전/후 template, blocker template 참조 확인
- `coverage:features` 통과, feature row 5,344개와 blocker group 59개 생성
- `gate:feature-coverage` 통과, dynamic 66 / persistence 134 / exit 3,536 / pause 931 / engine entry 9 / unreferenced global 652 count 일치
- `coverage:definitions` 통과, 현재 definition row 8,000개와 blocker group 59개 생성. auxiliary source/cflag row 169개는 primary `VariableSize.CSV` evidence로 재연결됨
- `gate:definition-consumption` 통과, raw definition 918개와 Chara seed 6,922행 count 일치
- M21~M27 coverage/gate 통과, source evidence, crosscheck, ERB definition, save/session mapping, pre-implementation audit, implementation queue 산출물 생성
- M28 main route coverage/gate/smoke/closure 통과, owned route contract 24개와 approved-excluded event-local session row 3개, unresolved issue 0개
- M29 shop purchase is strict-closed after source-owner correction: source row 206, implemented-verified 101, approved-excluded 105, blocked 0.
- M30 item use strict closure: source row 74개, M30-owned 37개, implemented-verified 37, approved-excluded 37. `gate:item-use-coverage`와 `gate:milestone-scope-closure -- M30`은 통과한다.
- M31 recruit is strict-closed after source-owner correction: source 237개, implemented-verified 153개, approved-excluded 84개, blocked 0개
- M32 character identity strict closure 통과, source row 298개, M32-owned implemented-verified 291개, approved-excluded 7개, unresolved issue 0개
- M33 body/stat strict closure 통과, source 5,378개, M33-owned implemented-verified 5,299개, approved-excluded 79개와 unresolved issue 0개
| M34 relationship/CFLAG/equipment/clothing owner evidence | Strict closure complete after 2026-05-08 recheck: total 2,241, implemented-verified 2,241, approved-excluded 0, blocked 0. CFLAG definitions, Chara CFLAG seeds, RELATION seeds, clothing pack/equipment save/session rows, item 211 apron flow, and wardrobe route are covered by M34 implementation evidence. |
- M34.5에서 `npm run gate:source-evidence` 실패 원인이던 auxiliary evidence 완료성 row 169개를 primary source evidence로 재연결했고, M35~M52 gate registry와 final verify skeleton을 추가했다.
- M35 turn pipeline coverage/gate/smoke 통과, owned row 7개와 unresolved issue 0개
- M36 visit facility coverage/gate/smoke 통과, owned row 559개와 unresolved issue 0개
- M37 work coverage/gate/smoke는 통과하지만 strict closure는 blocked 130 때문에 미완료다.
- M38 filming scene coverage/gate/smoke 통과, owned row 6개와 unresolved issue 0개
- M39 filming execution coverage/gate/smoke 통과, owned row 174개와 unresolved issue 0개
- M40 training session coverage/gate/smoke 통과, owned row 11개와 unresolved issue 0개
- M41 training availability coverage/gate/smoke 통과 이력은 있으나 strict manifest 기준 현재 total 1,631, implemented-verified 4, blocked 1,626, scope-redesign-required 1이다. 원본 `COMABLE.ERB` source program 125개와 active command 105개 대응은 재검증 대상이다.
- `smoke:main-routes` 통과, 메인 메뉴 108 wardrobe route 활성화 확인
- `analyze:game-system` 통과
- `tsc --noEmit` 통과
- `vite build` 통과
- 123 modules transformed
- 원본명 직접 사용 차단 검색 통과, 매칭 0개

## 다음 작업

- Next work is M37~M41 source-unit manifest closure correction. M42 resumes only after those gates are closed or explicitly blocked/scope-redesign-required.
2. 그 뒤 M42 훈련 command 효과 0~34 구현을 재개한다. M42가 닫히기 전에는 M43으로 넘어가지 않는다.

## 이전 완료 요약

1. Phase 1 구현은 M0~M6 기준으로 완료되었고, `npm run smoke:phase1`와 `npm run build`로 다시 확인되었다.
2. 기존 M7 고용/영입 1차는 `npm run smoke:m7`와 `npm run build`로 확인되었다.
3. 기존 M8 턴 종료/시간 진행은 `npm run smoke:m8`와 `npm run build`로 확인되었다.
4. 기존 M9 저장/로드는 `npm run smoke:m9`와 `npm run build`로 확인되었다.
5. 기존 M10 방문/시설 1차는 `npm run smoke:m10`와 `npm run build`로 확인되었다.
6. 기존 M11 미션 1차는 `npm run smoke:m11`와 `npm run build`로 확인되었다.
7. 기존 M12 업무 1차는 `npm run smoke:m12`와 `npm run build`로 확인되었다.
8. 기존 M13 촬영 1차는 `npm run smoke:m13`와 `npm run build`로 확인되었다.
9. 기존 M14 훈련 1차는 `npm run smoke:m14`와 `npm run build`로 확인되었다.
10. 기존 M15 화면 정리와 진단 패널은 `npm run typecheck`, `npm run build`, 기존 smoke 전부, UI 직접 변경 검색으로 확인되었다.
11. 기존 M16 테스트/검증 체계 확장은 `npm run verify:m16`로 확인되었다.
12. 기존 M17 원본 근거 대조 정책은 `npm run inventory:legacy-mapping`, adapter import 경계 검색, `npm run typecheck`, `npm run build`, `npm run verify:m16`로 확인되었다.
13. 기존 M18 반복 구현 규칙 고정은 `IMPLEMENTATION_UNIT_RULES.ko.md`, `npm run build`, `npm run test --if-present`, template 참조 검색으로 확인되었다.
14. 기존 M19 원본 기능 커버리지 전수표는 `npm run coverage:features`, `npm run gate:feature-coverage`, `npm run analyze:game-system`, `npm run build`로 확인되었다.
15. M20 정의 데이터 전수 분류와 소비 책임 배정은 `npm run collect:catalog`, `npm run coverage:definitions`, `npm run gate:definition-consumption`, `npm run build`로 확인되었다. 이것은 실제 컨텐츠 효과 구현 완료가 아니라 M28~M49의 실제 소비 검증을 위한 장부 완료다.
16. M21 원본 근거 장부 확정은 `npm run coverage:source-manifest`, `npm run gate:source-evidence`, `npm run build`로 확인되었다.
17. M22 coverage 교차 대조 gate는 `npm run coverage:crosscheck`, `npm run gate:coverage-crosscheck`, `npm run gate:approved-exclusions`, `npm run build`로 확인되었다.
18. M23 ERB 기반 정의 데이터 보강은 `npm run coverage:erb-definitions`, `npm run coverage:definitions`, `npm run gate:erb-definition-coverage`, `npm run gate:coverage-crosscheck`, `npm run build`로 확인되었다.
19. M24 저장 상태 원본 주소 전수 매핑은 `npm run coverage:save-mapping`, `npm run gate:save-mapping`, `npm run gate:state-family-index-coverage`, `npm run gate:coverage-crosscheck`, `npm run build`로 확인되었다.
20. M25 세션/계산 원본 주소 전수 매핑은 `npm run coverage:session-mapping`, `npm run gate:session-mapping`, `npm run gate:session-save-boundary`, `npm run gate:coverage-crosscheck`, `npm run build`로 확인되었다.
21. M26 구현 전 누락 감사는 `npm run audit:pre-implementation`, `npm run gate:pre-implementation-audit`, `npm run build`로 확인되었다. implementation review 14,546행, source-file-review 13행, 미해소 issue 0개로 닫았다.
22. M27 구현 단위 큐와 blocker 동결은 `npm run coverage:implementation-queue`, `npm run gate:implementation-queue`, `npm run build`, `npm run test --if-present`로 확인되었다. queue unit 36개, review row 14,546개, frozen blocker 59개, 승인 제외 요청 후보 59개로 닫았다.
23. M28 메인 화면과 route 전수 연결은 `npm run coverage:main-routes`, `npm run gate:main-route-coverage`, `npm run gate:milestone-scope-closure -- M28`, `npm run smoke:main-routes`, `npm run build`로 확인되었다. menu row 24개, enabled route 13개, disabled owner contract 11개, M47 approved-excluded session row 3개, unresolved issue 0개로 닫았다.
24. M29 아이템 상점과 구매는 source-owner correction 후 strict-closed다. total 206, implemented-verified 101, approved-excluded 105, blocked 0이다. `gate:milestone-scope-closure -- M29`는 통과해야 한다.
25. M30 아이템 사용은 strict closure 기준으로 완료되었다. `npm run coverage:item-use`, `npm run gate:item-use-coverage`, `npm run gate:milestone-scope-closure -- M30`, `npm run smoke:item-use`, `npm run smoke:item-shop`, `npm run build`, `npm run test --if-present`로 확인했다. source 74행은 M30-owned 37 implemented-verified와 M30 approved-excluded 37로 재정리했고, 37개는 수신 manifest에 blocked inbound 책임으로 명시했다.
26. M31 영입 listing과 인물 생성은 source-owner correction 후 strict-closed다. source 237행 중 implemented-verified 153, approved-excluded 84, blocked 0이다. `gate:milestone-scope-closure -- M31`은 통과해야 한다.
27. M32 인물 원형과 identity 완성은 `npm run coverage:character-identity`, `npm run gate:character-identity`, `npm run gate:milestone-scope-closure -- M32`, `npm run smoke:character-identity`, `npm run build`, `npm run test --if-present`로 확인되었다. source 298행 중 M32-owned implemented-verified 291개, approved-excluded 7개, unresolved issue 0개로 strict closure했다. approved-excluded 7개는 M33 4, M47 2, M49 1 blocked inbound로 남는다.
| Character/CFLAG owner status | M34 is strict-closed after 2026-05-08 recheck: total 2,241, implemented-verified 2,241, blocked 0. M33 inbound CFLAG/FLAG/PBAND 76 rows and item 211 apron behavior are closed in M34. | M50/M52 must still re-verify full save/load roundtrip. |
| M34 relationship/CFLAG/equipment/clothing owner evidence | Strict closure complete after 2026-05-08 recheck: total 2,241, implemented-verified 2,241, approved-excluded 0, blocked 0. CFLAG definitions, Chara CFLAG seeds, RELATION seeds, clothing pack/equipment save/session rows, item 211 apron flow, and wardrobe route are covered by M34 implementation evidence. |
30. M34 이후 전수 검토에서 M35 진입 전 hardening 필요가 확인되었다.
31. M34.5 전수 이식 gate hardening은 완료되었다. `gate:source-evidence`, `gate:coverage-hardening`, `gate:coverage-crosscheck`, `gate:pre-implementation-audit`, `gate:implementation-queue`, `build`, `test --if-present`가 통과했다.
32. M35 ? ??? ?? ??? strict closure ??. total 8, implemented-verified 8, blocked 0, scope-redesign-required 0?? ?? mapped 7 row? supporting evidence?? ???.
33. M36 visit/facility is strict-closed: `npm run coverage:visit-facility`, `npm run gate:visit-facility`, `npm run gate:milestone-scope-closure -- M36`, `npm run smoke:visit-all`, `npm run smoke:m10`, `npm run verify:m16`, `npm run typecheck`, `npm run build`, `npm run test --if-present` verified 93 source units implemented-verified, mapped 0, blocked 0; 559 rows remain evidence.
34. M37 업무/창관/특수 업무는 strict 재판정 결과 아직 완료가 아니다. `coverage:work`, `gate:work-coverage`, `smoke:work-all`은 업무 dispatch/정의 실행 및 일부 업무 결과 write-effect 증거지만, `gate:milestone-scope-closure -- M37`는 strict 기준에서 실패해야 한다. 현재 M37은 total 463, implemented-verified 333, blocked 130이다.
35. M38 촬영 정의와 장면 조건은 strict 기준 미완료다. 기존 coverage/gate/smoke는 장면 정의 indexing 근거지만 closure는 `blocked`이고 manifest는 total 6, implemented-verified 0, blocked 6이다.
36. M39 촬영 실행/결과/판매는 strict 기준 미완료다. 구현 검증 135개는 남지만 save/session/calculation 39개가 blocked라 closure는 `blocked`이다.
37. M40 훈련 메뉴와 세션은 strict 기준 미완료다. 구현 검증 5개는 남지만 mapped training flow 6개가 blocked라 closure는 `blocked`이다.
38. M41 훈련 가능 조건은 strict 기준 미완료다. total 1,631, implemented-verified 4, blocked 1,626, scope-redesign-required 1이며 closure는 `blocked`이다.
39. 다음 작업은 M37~M41 실제 기능 closure, 그 다음 M42 훈련 command 효과 0~34 구현이다.

## 주의

- `.env.local`은 읽지 않는다.
- OpenRouter worker MCP는 적극 사용한다. 원본 대조, manifest 분류, blocked row 원인 분석, gate 실패 로그 요약, patch proposal처럼 병렬화 가능한 bounded subtask는 worker에 위임한다.
- worker 결과는 완료 판정 권위가 아니다. Codex 본체가 원본 row, coverage/gap/closure, gate/smoke/build를 재검토한 뒤 반영한다.
- 기존 unrelated dirty files는 되돌리지 않는다.
- 기존 `web-port` 산출물은 참고 자료이며 구현 기준으로 승격하지 않는다.
- 마일스톤 완료 시 `NEW_PORT_MILESTONES.ko.md`의 "마일스톤 완료 운영 의무"를 모두 지킨다. `PROGRESS_STATUS.ko.md`, `SESSION_HANDOFF.ko.md`, 필요한 기준 문서, coverage/audit/closure 산출물, 검증 명령, 별도 커밋이 빠지면 완료 처리하지 않는다.

## M42 정정: blocked

- M42는 완료가 아니다. 이전 M42 산출물은 원본 효과 계산 구현이 아니라 원본 `SOURCE/LOSEBASE/EXP` 라인 인덱싱과 static profile 생성에 머물렀다.
- M42 책임은 command 0~34의 원본 효과 계산, 분기, 배율, 결과 owner, 성공/불가/취소/session cleanup/save boundary 검증이다. 이 책임은 산출물 생성이나 자체 gate 통과로 축소할 수 없다.
- `data/coverage/training-effect-0-34.json`은 현재 ownedTotal 35, implemented 0, ownedBlocker 35, missingVerification 35를 기록한다.
- `data/coverage/milestones/M42-closure.json`은 `status: blocked`다.
- `npm run gate:training-effect -- 0-34`는 현재 실패해야 정상이다.
- `npm run coverage:definitions`와 `npm run gate:definition-consumption` 기준으로 M20 definition coverage는 command 1~34를 다시 M42 blocker로 유지한다. command 0은 M14 최소 훈련 1차 consumer만으로 used다.
- 다음 작업은 M37~M41 원본 단위 기능 closure 후 M42 재개다. M43로 넘어가지 않는다.
