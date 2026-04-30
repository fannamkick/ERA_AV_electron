# 세션 인수인계

새 세션은 아래 요약만 읽고 Phase 3의 M21부터 진행한다. 완전 이식 여부는 M19~M30 전수 게이트로만 닫는다.

## 작업 위치

- 루트: `e:\ERA\AV간편개조\erAV_Ho_0.022(간편개조) - 복사본`
- 활성 구현 폴더: `web-port-next`

## 강한 제약

- `.env.local`을 읽거나 출력하지 않는다.
- 유료 AI/OpenRouter 호출을 실행하지 않는다.
- 기존 `web-port`의 AI-assisted 산출물은 참고 자료로만 본다.
- unrelated dirty files는 되돌리지 않는다.
- 원본 ERB/CSV 구조를 그대로 앱 아키텍처로 복사하지 않는다.
- 원본 주소 변환표는 M19~M22 coverage 산출물 없이 대량 작성하지 않는다.

## 현재 상태

- Vite/React/TypeScript 기본 골격이 있다.
- `GameState`와 `GameSession`은 분리되어 있다.
- 정의 데이터는 저장 상태에서 분리하는 방향으로 정리되어 있다.
- Phase 1~4 구분과 근거는 `NEW_PORT_MILESTONES.ko.md`에 명시되어 있다.
- M0 기준 동결과 M1 공통 실행 계약은 완료되어 있다.
- M1에서 `routes/actions/effects/results/dispatch` 계약이 추가되었고, 실패 result는 저장 상태를 바꾸지 않는다. M1의 action 계약은 Phase 1 범위 안으로 제한되어 있으며, 알 수 없는 action은 실패 result로 처리된다.
- M2에서 `GameData`, view 모델 타입, save payload 타입, 상태/action result/save payload 경계 helper가 추가되었고 Phase 1 smoke에서 실행된다.
- M3에서 `legacy-catalog.json`이 runtime 정의 데이터로 연결되었고 `GameDefinitions` bridge, item/recruit/shop listing 분류, 조회 실패 helper가 추가되었다. Runtime bridge 기준은 `items=61`, `recruitListings=48`, `shopListings=46`이다.
- M4에서 `game/new` handler, EASY/NORMAL 입력, 초기 날짜/목표/자금/시작 인물/시작 아이템, 실패 불변 처리가 구현되었다.
- M5에서 `mainMenu` route, 메인 메뉴 view 계산, enabled/disabled 사유, effect 로그, unknown route 경로가 구현되었다.
- M6에서 상점 진입, 판매 listing 계산, 선택/수량 변경, 구매 성공/실패/취소, 돈/인벤토리 반영이 구현되었다.
- M7에서 영입 listing view, 후보 선택, 돈 부족 실패, 영입 성공, 중복 실패, 취소, `people/body/social/equipment` 생성 경계가 구현되었다.
- M8에서 `turn/end` action, 주차/월 롤오버, `phase=freeAction` 복귀, 예약 이벤트 소비, session 임시 상태 폐기, 미션/월말 hook stub 경계가 구현되었다.
- M9에서 저장 payload schema v1, 직렬화/역직렬화, 손상 JSON/future schema/runtime 오염 payload 실패, 저장 roundtrip, `saveLoad` session 폐기가 구현되었다.
- M10에서 방문 장소/행동 view, 조직 사무소 기본 방 사용 허가, 돈 부족/중복/취소 실패 경로, `world.unlocks`와 `featureState.visits` 저장 경계, `visit` session 폐기가 구현되었다.
- M11에서 미션 정의 1개, 미션 목록/선택 view, 수락/보고 action, 조건 미충족 실패, 방문 해금 조건 연동, 보상 지급, `mission` 저장 상태와 `mission-session` 경계가 구현되었다.
- M12에서 업무 정의 1개, 업무/참여 인물 선택 view, 결과 계산/저장 반영 분리, 돈/경험/신체 피로/업무 이력 저장 반영, 완료 후 턴 종료, `work-session` 폐기가 구현되었다.
- M13에서 촬영 장면 정의 1개, 촬영 대상/장면 선택 view, 대상/장면 누락 실패, 선택/화면 취소, 촬영량 session 계산, 수익/팬/점수/경험/신체 피로/촬영 이력 저장 반영, 완료 후 턴 종료, `shooting-session` 폐기가 구현되었다.
- M14에서 훈련 command 1개, 대상/실행자/조수 선택 상태, command 후보 view, 불가 사유, 자극/파라미터/체력 소모/session 계산 버퍼, 파라미터/자원/경험/신체 피로 저장 반영, 완료 후 턴 종료, interaction session 폐기가 구현되었다.
- M15에서 `AppLayout`을 runtime state/session과 action dispatch 소유자로 축소하고, route별 renderer를 `RouteScreens.tsx`로 분리했다. `ScreenPrimitives.tsx`에 공통 선택지/요약 UI를 추가했고, `DiagnosticsPanel.tsx`에 현재 route, state 요약, session 요약, boundary diagnostics, effect log를 읽기 전용으로 표시한다.
- M16에서 새 테스트 framework는 추가하지 않고 기존 Vite smoke와 Node gate script를 묶었다. `test:roundtrip`, `gate:boundaries`, `gate:raw-names`, `gate:stubs`, `verify:m16`이 추가되었고 build 단독 완료를 차단한다.
- `gate:stubs`는 기존 M8 stub과 `legacy*NeedingMapping` 계열 보류 marker를 `tools/m16_stub_allowlist.json`에 기록된 사유/해소 마일스톤이 있을 때만 허용한다. 미등록 marker는 실패한다.
- M17에서 `LEGACY_MAPPING_POLICY.ko.md`를 추가해 mapping 상태값, M30 허용/차단 의미, evidence 요구사항, 불명확 주소 처리, `approved-excluded` 승인 조건, adapter import 금지 경계를 확정했다.
- M17에서 `src/game/runtime.ts`는 core 정의만 소유하고, legacy adapter 결합은 `src/runtime.ts`에서 수행하도록 경계를 옮겼다. `src/game`, `src/domains`, `src/catalog`에서는 `src/adapters/legacy`를 직접 import하지 않는다.
- M17은 원본 주소를 대량으로 `mapped` 처리하지 않았다. 실제 전수 mapping은 M19~M22의 coverage 산출물 기준으로 진행한다.
- M18에서 `IMPLEMENTATION_UNIT_RULES.ko.md`를 추가했다. 이후 구현은 unit 1개씩만 진행하고, 구현 전 template, 구현 후 template, blocker template, 완료 차단 규칙을 따라야 한다.
- M23~M29는 M18 template 없이 구현 완료 체크를 할 수 없다. 성공 경로만 있거나 coverage/blocker 갱신이 없으면 완료가 아니다.
- M19에서 `data/coverage/features.json`과 `data/coverage/blockers.json`을 생성했다. feature row는 5,344개이고, `implemented` 11개, `blocker` 5,333개다.
- M19 coverage에는 dynamic call 66개, persistence 134개, exit 3,536개, pause 931개, engine entry 9개, unreferenced global 652개가 포함된다. 원본 분석 count와 gate count가 일치한다.
- M19는 구현 완료 수를 늘리는 단계가 아니다. M23~M29가 `groupKey`와 `ownerMilestone` 기준으로 feature blocker를 줄여야 한다.
- M20에서 `data/coverage/definitions.json`을 생성했다. definition row는 7,840개이고, raw 정의 918개와 Chara seed 6,922행이 모두 source evidence, 역할, runtime owner 후보, 실제/예정 consumer, status 또는 blocker를 가진다.
- M20은 정의 데이터 전수 분류와 소비 책임 배정이다. 실제 컨텐츠 효과 구현 완료가 아니다.
- M20 definition status는 `template` 5,566개, `display-only` 409개, `calculation-only` 35개, `listing` 94개, `used` 1개, `blocker` 1,735개다. 이 중 실제 구현 완료 근거가 있는 row는 현재 `used` 1개뿐이고, `template`/`listing`/`display-only`/`calculation-only`는 M24~M28에서 실제 소비 검증으로 승격해야 한다.
- M20 blocker는 특수 item 15개, 미구현 훈련 command 104개, CFLAG 정의 151개, Chara CFLAG seed 1,465개가 중심이다. CFLAG 계열은 M21에서 의미별 저장 owner로 분해해야 하며 완료 처리하지 않았다.
- 데이터 완성도는 수집 수량이 아니라 실제 게임 구성 역할 기준으로 판정한다. 현재 feature coverage와 definition coverage는 v1로 생성되었지만, 전체 게임 완료 기준의 save/session coverage는 M21~M22와 M30에서 닫는다.
- 변수, 정의 데이터, 기능 흐름, 저장/세션 판정의 1차 기준은 문서가 아니라 작업 루트의 `original-game/CSV`, `original-game/ERB`, `original-game/CSV/Chara*.csv`, `original-game/CSV/VariableSize.CSV`이다. 문서는 파생 해석이므로 문서만 보고 `implemented`, `used`, `mapped`를 부여하지 않는다.
- M30 전에는 `gate:coverage-crosscheck`와 `gate:source-evidence`를 추가해야 한다. 전자는 M19 feature, M20 definition, M21 save mapping, M22 session mapping, blocker/approved exclusion registry를 대조하고, 후자는 coverage의 source evidence가 실제 원본 또는 재생성 산출물에 존재하는지 확인한다. 같은 gate는 M30 최종 판정에서도 다시 실행한다.
- 누락 전수 감사 마일스톤은 세 종류로 둔다: 구현 전 `pre-implementation-gap-audit.json`, 기능군 종료 `Mxx-gap-audit.json`, 최종 `final-gap-audit.json`. 감사에서 `discovered-gap`, `orphan-coverage`, `role-only`가 남으면 다음 단계로 넘어가지 않는다.
- 현재 미정 mapping 규모는 `map-save-state` 1,215개 중 persistent missing mapping 724개, `map-session-state` 365개 중 session missing mapping 164개다. 이 값이 기능 완료 범위에 남으면 해당 기능을 완료 처리하지 않는다.
- 원본 흐름 기준은 `GAME_FLOW_MAP.ko.md`가 소유한다.
- 데이터/상태 소유권 기준은 `GAME_DOMAIN_SYSTEM.md`가 소유한다.
- 모듈 경계와 import 방향은 `MODULE_SYSTEM.ko.md`가 소유한다.
- 실행 순서와 체크박스는 `NEW_PORT_MILESTONES.ko.md`가 소유한다.
- 현재 완료/미완료와 다음 작업은 `PROGRESS_STATUS.ko.md`가 소유한다.
- 미정 항목은 완료가 아니라 blocker로 기록한다.

## 마지막 검증

마지막으로 기록된 통과 명령:

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

주요 결과:

- 정의 데이터 918개
- Chara CSV 109개
- Chara 초기값 6,922행
- `smoke:phase1` 통과: 새 게임, 상점 진입, 돈 부족 구매 실패, 구매 성공, 취소, unknown action 실패, save payload 경계 검증
- `smoke:m7` 통과: 영입 화면 진입, 돈 부족 실패, 영입 성공, 중복 실패, 취소, `people/body/social/equipment` 생성 경계 검증
- `smoke:m8` 통과: 턴 종료, 주차/월 롤오버, phase 복귀, 예약 이벤트 소비, session 임시 상태 폐기, save payload 경계 검증
- `smoke:m9` 통과: 저장 스냅샷 생성, JSON 역직렬화, runtime 오염 payload 차단, 손상 JSON/future schema 실패, 저장 roundtrip 검증
- `smoke:m10` 통과: 방문 화면 진입, 장소/행동 선택, 돈 부족 실패, 취소, 시설 해금 성공, 중복 실패, `visit` session 폐기, save payload 경계 검증
- `smoke:m11` 통과: 미션 선택, 수락 전 보고 실패, 수락 저장, 조건 미충족 보고 실패, 방문 조건 달성, 보고 완료/보상 지급, `mission-session` 폐기, save payload 경계 검증
- `smoke:m12` 통과: 업무 화면 진입, 업무/참여 인물 선택, 미선택/인물 누락 실패, 취소, 업무 실행, 돈/경험/신체 피로/업무 이력 저장 반영, 턴 종료, `work-session` 폐기, save payload 경계 검증
- `smoke:m13` 통과: 촬영 화면 진입, 대상/장면 선택, 대상/장면 누락 실패, 선택 취소, 화면 취소, 촬영 확정, 수익/팬/점수/경험/신체 피로/촬영 이력 저장 반영, 턴 종료, `shooting-session` 폐기, save payload 경계 검증
- `smoke:m14` 통과: 훈련 화면 진입, 대상/실행자/command 선택, command/대상/실행자 누락 실패, 선택 취소, 훈련 실행, 파라미터/자원/경험/신체 피로 저장 반영, 턴 종료, interaction session 폐기, save payload 경계 검증
- M15 UI 직접 상태 변경 검색 통과: `state.* =`, `session.* =`, `push`, `splice` 매칭 0개
- `test:roundtrip` 통과: 새 게임, 아이템 구매, 영입, 턴 종료 후 snapshot/load가 save state를 정확히 복원
- `gate:boundaries` 통과: runtime diagnostics error 0개, action result boundary, save payload boundary, session/definitions/views 오염 payload 실패 검증
- `gate:raw-names` 통과
- `gate:stubs` 통과: 문서화된 보류 marker 33개, 미등록 marker 0개
- `verify:m16` 통과
- `inventory:legacy-mapping` 통과: 원본 주소 수집 진단 0건
- core adapter import 경계 검색 통과: `src/game`, `src/domains`, `src/catalog`에서 `adapters/legacy|legacy/` 매칭 0개
- M18 반복 구현 규칙 검색 통과: 기준 문서, 구현 전/후 template, blocker template 참조 확인
- `coverage:features` 통과: feature row 5,344개, blocker group 59개 생성
- `gate:feature-coverage` 통과: dynamic 66 / persistence 134 / exit 3,536 / pause 931 / engine entry 9 / unreferenced global 652 count 일치
- `coverage:definitions` 통과: definition row 7,840개, blocker group 63개 생성
- `gate:definition-consumption` 통과: raw definition 918개와 Chara seed 6,922행 count 일치
- `analyze:game-system` 통과
- `tsc --noEmit` 통과
- `vite build` 통과
- 116 modules transformed
- 원본명 직접 사용 차단 검색 통과, 매칭 0개

## 바로 다음 작업

1. Phase 1 구현은 M0~M6 기준으로 완료되었고, `npm run smoke:phase1`와 `npm run build`를 통과했다.
2. M7 고용/영입 1차는 완료되었고 `npm run smoke:m7`와 `npm run build`를 통과했다.
3. M8 턴 종료/시간 진행은 완료되었고 `npm run smoke:m8`와 `npm run build`를 통과했다.
4. M9 저장/로드는 완료되었고 `npm run smoke:m9`와 `npm run build`를 통과했다.
5. M10 방문/시설 1차는 완료되었고 `npm run smoke:m10`와 `npm run build`를 통과했다.
6. M11 미션 1차는 완료되었고 `npm run smoke:m11`와 `npm run build`를 통과했다.
7. M12 업무 1차는 완료되었고 `npm run smoke:m12`와 `npm run build`를 통과했다.
8. M13 촬영 1차는 완료되었고 `npm run smoke:m13`와 `npm run build`를 통과했다.
9. M14 훈련 1차는 완료되었고 `npm run smoke:m14`와 `npm run build`를 통과했다.
10. M15 화면 정리와 진단 패널은 완료되었고 `npm run typecheck`, 기존 smoke 전체, `npm run build`, UI 직접 변경 검색을 통과했다.
11. M16 테스트/검증 체계 확장은 완료되었고 `npm run verify:m16`을 통과했다.
12. M17 원본 근거 대조 정책은 완료되었고 `npm run inventory:legacy-mapping`, adapter import 경계 검색, `npm run typecheck`, `npm run build`, `npm run verify:m16`을 통과했다.
13. M18 반복 구현 규칙 고정은 완료되었고 `IMPLEMENTATION_UNIT_RULES.ko.md`, `npm run build`, `npm run test --if-present`, template 참조 검색으로 확인되었다.
14. M19 원본 기능 커버리지 전수표는 완료되었고 `npm run coverage:features`, `npm run gate:feature-coverage`, `npm run analyze:game-system`, `npm run build`로 확인되었다.
15. M20 정의 데이터 전수 분류와 소비 책임 배정은 완료되었고 `npm run collect:catalog`, `npm run coverage:definitions`, `npm run gate:definition-consumption`, `npm run build`로 확인되었다. 이것은 실제 컨텐츠 효과 구현 완료가 아니라 M24~M28의 실제 소비 검증을 위한 장부 완료다.
16. 다음 작업은 M21 저장 상태 원본 주소 전수 매핑이다.

## 읽을 문서

| 문서 | 용도 |
| --- | --- |
| `docs/README.md` | 문서 책임 분리 |
| `docs/NEW_PORT_MILESTONES.ko.md` | 실행 순서와 체크박스 |
| `docs/PROGRESS_STATUS.ko.md` | 현재 완료/미완료와 다음 작업 |
| `docs/GAME_FLOW_MAP.ko.md` | 기능 흐름 기준 |
| `docs/GAME_DOMAIN_SYSTEM.md` | 데이터 소유권 기준 |
| `docs/MODULE_SYSTEM.ko.md` | 모듈 경계 |
| `docs/LEGACY_MAPPING_POLICY.ko.md` | 원본 근거 대조 상태값, evidence, 승인/차단 정책 |
| `docs/IMPLEMENTATION_UNIT_RULES.ko.md` | 구현 전/후 template, blocker template, 1회 최대 구현 단위 |
