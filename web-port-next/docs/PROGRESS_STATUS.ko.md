# 진행 상태

기준 날짜: 2026-04-30

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
| 페이즈 구분 | `NEW_PORT_MILESTONES.ko.md`에 Phase 1~4 범위와 근거 명시 |
| M0 기준 동결 | Phase 1 범위, 포함/제외 기능, 대상 파일, blocker 가능 지점 확인 |
| M1 공통 실행 계약 | `UiRoute`, `GameAction`, `GameEffect`, `GameActionResult`, result helper, `dispatchGameAction()` 구현. 알 수 없는 action은 실패 result로 처리 |
| M2 데이터 구조 v1 | `GameData`, view 모델 타입, save payload 타입, 상태/action result/save payload 경계 helper 작성 및 Phase 1 smoke에서 실행 |
| M3 정의 데이터 연결 | `legacy-catalog.json`을 runtime 정의 데이터로 연결하고 `GameDefinitions` bridge, item/recruit/shop listing 분류, 조회 실패 helper 추가. M6 상점에는 구매형 listing만 노출 |
| M4 새 게임 생성 | `game/new` handler, EASY/NORMAL 입력, 초기 날짜/목표/자금/시작 인물/시작 아이템, 실패 불변 처리 구현 |
| M5 메인 화면 view | `mainMenu` route, 메인 메뉴 view 계산, enabled/disabled 사유, effect 로그, unknown route 경로 구현 |
| M6 아이템 구매 1차 | 상점 진입, 판매 listing 계산, 선택/수량 변경, 구매 성공/실패/취소, 돈/인벤토리 반영 구현 |
| M7 고용/영입 1차 | 영입 listing view, 후보 선택, 돈 부족 실패, 영입 성공, 중복 실패, 취소, `people/body/social/equipment` 생성 경계 구현 |
| M8 턴 종료/시간 진행 | `turn/end` action, 주차/월 롤오버, phase 복귀, 예약 이벤트 소비, session 임시 상태 폐기, 미션/월말 hook stub 경계 구현 |
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

## 미완료

| 항목 | 상태 |
| --- | --- |
| 저장/로드 완성 | M9 최소 roundtrip은 완료. 모든 주요 기능 후 저장 roundtrip, migration, corrupted/future/old schema 전체 처리는 M50에서 완성하고 M52에서 최종 검증 |
| 방문/시설 완성 | M10 최소 장소/행동 1개는 완료. 모든 방문 장소/시설/특수 행동 전수 구현은 M36에서 완성 |
| 미션 완성 | M11 최소 미션 1개는 완료. 미션 전체 정의/기한/성공/실패/보상/이벤트 연동은 M46에서 완성 |
| 업무 완성 | M12 최소 업무 1개는 완료. 업무/창관/특수 업무 전체와 각 업무 후처리는 M37에서 완성 |
| 촬영 완성 | M13 최소 촬영 장면 1개는 완료. 촬영 정의와 조건은 M38, 실행/결과/후처리는 M39에서 완성 |
| 훈련 완성 | M14 최소 command 1개는 완료. 훈련 세션은 M40, 가능 조건은 M41, command 효과 0~34는 M42, 35~69는 M43, 70~104와 후처리는 M44에서 완성 |
| 자동 테스트 | M16 기준 범용 검증 묶음은 `npm run verify:m16`. Phase 1 dispatch smoke, M7 영입 smoke, M8 턴 종료 smoke, M9 저장/로드 smoke, M10 방문 smoke, M11 미션 smoke, M12 업무 smoke, M13 촬영 smoke, M14 훈련 smoke, 저장 roundtrip, boundary gate, raw-name gate, stub gate, build를 포함 |
| 확정 변환표 | M17에서 상태값/증거/차단 정책은 확정됨. M24에서 저장 mapping 장부를 만들었고 M25에서 세션/계산 mapping 장부를 만들었다 |
| 기능 전수 구현 | M19에서 기능 row 5,344개를 만들었고 11개만 현재 구현 완료 근거를 가진다. 나머지 5,333개는 M28~M49에서 구현 또는 사용자 승인 제외로 닫아야 할 blocker다 |
| 정의 전수 구현 | 아직 완료 아님. M20/M23 기준 definition row 8,000개를 만들고 역할/소비 책임을 배정했다. 실제 구현 완료 근거가 있는 row는 현재 `used` 1개뿐이며, 특수 item/훈련 command/CFLAG 계열 1,735개는 M30/M34/M41~M44 blocker로 남아 있다. `template`/`listing`/`display-only`/`calculation-only`는 역할 판정이지 최종 구현 완료가 아니다 |

## 데이터 완성도 판단

데이터는 “몇 줄을 JSON에 넣었는가”가 아니라 실제 게임 구성에서 맡은 역할 기준으로 판정한다.

원본 기준:

- 변수, 정의 데이터, 기능 흐름, 저장/세션 판정의 1차 기준은 작업 루트의 `original-game/CSV`, `original-game/ERB`, `original-game/CSV/Chara*.csv`, `original-game/CSV/VariableSize.CSV`이다.
- `source.csv`, `cflag.csv`처럼 원본 CSV 폴더 밖에 있는 보조 정의는 수집 스크립트가 찾은 작업 루트의 보조 CSV를 기준으로 삼는다.
- `docs/*` 문서는 원본을 읽기 쉽게 정리한 파생 해석이다. 문서만 보고 `implemented`, `used`, `mapped`를 부여하지 않는다.
- M21~M27에서는 source evidence, feature, definition, save mapping, session mapping을 서로 대조하는 gate를 추가한다. 같은 gate는 M51/M52 최종 판정에서도 다시 실행한다.
- 누락 전수 감사는 구현 전, 기능군 중간, 최종 직전 세 번 필요하다. 산출물은 `data/coverage/audits/pre-implementation-gap-audit.json`, `data/coverage/audits/Mxx-gap-audit.json`, `data/coverage/audits/final-gap-audit.json`이며, 미등록 원본 컨텐츠/role-only 완료/orphan coverage가 있으면 다음 단계로 넘어가지 않는다.

| 구분 | 현재 상태 | 완료선 |
| --- | --- | --- |
| raw 정의 데이터 수집 | CSV/Chara 정의 918개 수집, Chara 초기값 6,922행 수집. 수집 진단 0건 | M20 coverage에서 raw 정의 918개와 Chara seed 6,922행이 모두 row를 가져야 함 |
| definition coverage | row 8,000개 생성. `template` 5,566개, `display-only` 456개, `calculation-only` 35개, `listing` 207개, `used` 1개, `blocker` 1,735개. 이 중 `template`/`listing`/`display-only`/`calculation-only`는 역할 판정과 소비 책임 배정이며, 실제 소비 검증은 아직 남아 있음 | M28~M49에서 실제 handler/view/calculation/save-init 소비 검증을 붙이고 M52에서 미분류/미소비/미검증 정의 0개 |
| runtime 보강 정의 | M23에서 ERB 기반 정의 160행을 추가했다. 메뉴/방문/미션/업무/촬영/이벤트/엔딩/업적/help text 정의 후보를 runtime definition row로 만들었지만 실제 소비 구현은 아직 남아 있음 | M36~M49에서 원본 근거 기반 정의 전체를 실제 소비 검증해야 함 |
| Item.csv 역할 분리 | 109개 중 구매형 listing 46개, 영입 listing 48개, 특수 item blocker 15개로 분류. 구매/영입 listing 판정은 소비 책임 배정이며 아이템별 사용 효과/특수 처리 완료가 아님 | M29~M31/M36에서 각 item/listing이 구매/사용/영입/시설/특수 handler 또는 blocker를 가져야 함 |
| 인물 원형/seed | 109개 template과 초기값 6,922행은 coverage row로 분류됨. Chara CFLAG seed 1,465개는 의미별 저장 owner blocker. template 분류는 실제 인물 생성/표시/저장 roundtrip 완료가 아님 | M31~M34에서 인물 identity/seed/CFLAG 분해를 실제 인물 인스턴스에 연결하고 M50/M52에서 저장 roundtrip까지 검증해야 함 |
| 저장 상태 mapping | M24에서 `map-save-state` 1,215행을 `mapped` 989개, `non-save` 226개로 닫았다. persistent 후보 1,016개는 save-field 985개, M25 session-state 이관 31개이며 M24 후 미판정 0개 | M28~M49에서 매핑된 save field를 실제 기능 구현과 roundtrip 검증에 소비하고 M52에서 미정 저장 주소 0개 |
| 세션/계산 mapping | M25에서 `map-session-state` 365행을 session-field 298개, calculation-internal 67개로 닫았다. runtime session 후보 234개는 화면/훈련/촬영/업무/script scratch 계열로 분류되었고 M25 후 미판정 0개 | M28~M49에서 매핑된 session/calculation row를 실제 기능 lifecycle에 소비하고 M52에서 미정 세션/계산 주소 0개 |
| 구현 전 누락 감사 | M26에서 implementation review 14,700행을 생성했다. source-file-review 14행은 M27 또는 구현 owner에 배정했고 missing evidence/orphan/role-only/unknown owner/unapproved exclusion 미해소 issue는 0개다 | M27에서 이 review row를 구현 큐로 동결하고 M28~M50에서 owner별로 닫아야 함 |
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
- `gate:stubs` 통과, 문서화된 보류 marker 33개와 미등록 marker 0개
- `verify:m16` 통과
- `inventory:legacy-mapping` 통과, 원본 주소 수집 진단 0건
- core adapter import 경계 검색 통과: `src/game`, `src/domains`, `src/catalog`에서 `adapters/legacy|legacy/` 매칭 0개
- M18 반복 구현 규칙 검색 통과: 기준 문서, 구현 전/후 template, blocker template 참조 확인
- `coverage:features` 통과, feature row 5,344개와 blocker group 59개 생성
- `gate:feature-coverage` 통과, dynamic 66 / persistence 134 / exit 3,536 / pause 931 / engine entry 9 / unreferenced global 652 count 일치
- `coverage:definitions` 통과, definition row 7,840개와 blocker group 63개 생성
- `gate:definition-consumption` 통과, raw definition 918개와 Chara seed 6,922행 count 일치
- `analyze:game-system` 통과
- `tsc --noEmit` 통과
- `vite build` 통과
- 116 modules transformed
- 원본명 직접 사용 차단 검색 통과, 매칭 0개

## 다음 작업

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
21. M26 구현 전 누락 감사는 `npm run audit:pre-implementation`, `npm run gate:pre-implementation-audit`, `npm run build`로 확인되었다. implementation review 14,700행, source-file-review 14행, 미해소 issue 0개로 닫았다.
22. 다음 작업은 M27 구현 단위 큐와 blocker 동결이다. M26 audit row를 기반으로 M28~M50 owner별 작업 큐를 만들고, blocker 해소 책임과 verification id를 고정한다.

## 주의

- `.env.local`은 읽지 않는다.
- 유료 AI/OpenRouter 호출은 실행하지 않는다.
- 기존 unrelated dirty files는 되돌리지 않는다.
- 기존 `web-port` 산출물은 참고 자료이며 구현 기준으로 승격하지 않는다.
