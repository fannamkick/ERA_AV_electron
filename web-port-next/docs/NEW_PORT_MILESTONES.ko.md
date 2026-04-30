# 신규 포트 마일스톤

## 공통 완료 기준

- [ ] `npm run build` 통과
- [ ] 저장 상태, 세션 상태, view 계산 객체 경계가 섞이지 않음
- [ ] UI와 flow가 공통 action/result 계약을 사용함
- [ ] 새 소유권이 생기면 기준 문서 갱신
- [ ] 원본 변수명을 앱 모델명으로 직접 복사하지 않음
- [ ] 미정 항목을 기능 완료로 처리하지 않음
- [ ] 보류 항목은 원본 위치, 보류 사유, 해소 마일스톤을 가진 blocker로 남김
- [ ] 구현 제외는 사용자 승인 없이는 완료 처리하지 않음
- [ ] `.env.local` 접근 없음
- [ ] 유료 AI/OpenRouter 호출 없음
- [ ] 마일스톤 하나를 완료할 때마다 검증 결과를 확인한 뒤 별도 커밋을 남김

## 완전 이식 완료 기준

- [ ] 원본 메인 화면 선택지 전체가 구현 또는 사용자 승인 제외로 분류됨
- [ ] 원본 정의 데이터 전체가 사용 또는 사용자 승인 제외로 분류됨
- [ ] 저장 상태로 판정된 원본 주소가 새 저장 모델 필드로 연결됨
- [ ] 세션/계산 버퍼로 판정된 원본 주소가 새 실행 중 데이터 또는 계산 함수로 연결됨
- [ ] 미해소 blocker 0개
- [ ] `missingMapping`, `needsDecision`, `needs-review` 항목이 기능 완료 상태에 남아 있지 않음
- [ ] 기능별 성공/실패/취소/저장 roundtrip 검증이 있음
- [ ] 최종 coverage 산출물에 미구현 기능 0개, 미분류 원본 주소 0개가 기록됨

## blocker 기록 형식

- [ ] 원본 위치: 파일, 라벨, 주소 또는 CSV 행
- [ ] 차단 사유: 의미 불명, 근거 충돌, 구현 범위 밖, 사용자 승인 필요 중 하나
- [ ] 해소 마일스톤: M19~M30 중 하나
- [ ] 완료 차단 범위: 어떤 기능/데이터/주소 완료를 막는지 명시

## 페이즈 구분

| Phase | 범위 | 목표 | 완료 기준 |
| --- | --- | --- | --- |
| Phase 1. 최소 세로 루프 | M0~M6 | 공통 실행 계약, 저장/세션/view 경계, 정의 데이터 입력, 새 게임, 메인 화면, 아이템 구매 1차를 연결한다 | 새 게임 -> 메인 화면 -> 아이템 상점 -> 상품 선택/수량 변경 -> 구매 성공/실패/취소 -> 돈/인벤토리 반영 -> `npm run build` 통과 |
| Phase 2. 핵심 골격 확장 | M7~M16 | 주요 기능을 한 단위씩 얇게 붙이고 저장/로드, 턴 진행, 검증 체계를 만든다 | 영입, 턴 종료, 저장/로드, 방문, 미션, 업무, 촬영, 훈련이 각각 최소 성공/실패/취소 또는 예외 경로를 갖고 build가 통과 |
| Phase 3. 원본 대조 체계 | M17~M22 | 완성 여부를 셀 수 있도록 원본 기능, 정의 데이터, 저장 상태, 세션/계산 상태의 전수표와 mapping 정책을 고정한다 | feature/definition/save/session coverage 산출물의 컬럼과 상태값이 확정되고, 미정 항목을 완료로 처리하지 않는 차단 규칙이 문서화됨 |
| Phase 4. 전수표 기반 완성 | M23~M30 | 전수표를 기준으로 기능군별 누락을 제거하고 최종 누락 0 검증을 닫는다 | 미구현 기능 0개, 미분류 정의 0개, 미분류 저장/세션 주소 0개, 미해소 blocker 0개, 전체 smoke flow와 검증 명령 통과 |

## 페이즈 근거

- `GAME_FLOW_MAP.ko.md`의 최상위 흐름은 `새 게임/로드 -> 메인 화면 -> 기능 실행 -> 훈련 또는 턴 종료 -> 메인 화면`이다. Phase 1은 이 중 가장 작은 실행 가능한 세로 절편인 새 게임, 메인 화면, 아이템 상점, 구매 결과 반영까지만 닫는다.
- `GAME_DOMAIN_SYSTEM.md`는 데이터를 `definitions`, `save`, `session`, `views`로 나눈다. Phase 1은 이 경계가 실제 UI/action 흐름에서 지켜지는지 먼저 검증해야 하므로 M0~M6을 한 묶음으로 둔다.
- `DOMAIN_INVENTORY.ko.md`와 `DOMAIN_REINTERPRETATION.ko.md`는 `ITEM`을 `inventory.itemCounts`, `ITEMSALES`를 view/session 판매 목록, `BOUGHT`를 `session.shop` 선택값으로 판정한다. Phase 1의 아이템 구매 루프는 이 핵심 분리를 검증하기에 충분하고, 아이템 사용/의복/시설/영입까지 넓히지 않는다.
- M7~M16은 각 주요 기능을 1차 골격으로 세우는 구간이다. 이 구간의 완료는 완전 이식이 아니라, 기능별 성공/실패/취소 경로와 저장/로드/턴 진행/진단 체계를 갖추는 것을 뜻한다.
- M17~M22는 구현량을 늘리는 구간이 아니라 원본 대조 정책과 전수표를 확정하는 구간이다. `needsDecision`, `missingMapping`, `needs-review`가 남은 항목은 기능 완료로 처리하지 않는다.
- M23~M30은 전수표를 기준으로 완성도를 닫는 구간이다. M1~M18이 모두 끝나도 완전 이식 완료가 아니며, 완전 이식은 M30의 누락 0 검증으로만 판정한다.

## 마일스톤 내부 단계

- M0~M3: 구조와 데이터 입력 경계 확정
- M4~M16: 실제로 도는 최소 게임 골격과 검증 체계 작성
- M17~M18: 원본 대조 정책과 반복 구현 규칙 고정
- M19~M22: 원본 기능, 정의 데이터, 저장 상태, 세션/계산 상태 전수표 작성
- M23~M29: 전수표를 기준으로 기능군별 구현 완료
- M30: 누락 0 검증
- M1~M18 완료는 완전 이식 완료가 아님

## 세부도 기준

- [ ] 각 마일스톤은 생성/수정할 파일 또는 산출물을 가진다.
- [ ] 각 마일스톤은 성공, 실패, 취소 또는 예외 경로 중 해당되는 경로를 검증한다.
- [ ] 각 마일스톤은 저장 상태, 세션 상태, view 계산 객체 중 어느 것을 바꾸는지 명시한다.
- [ ] 각 마일스톤은 “아직 정의하지 않음”을 완료 사유로 쓰지 않는다.
- [ ] 각 마일스톤에서 원본 근거가 필요한 항목은 원본 파일/라벨/주소를 남긴다.
- [ ] 체크박스가 5개 미만이면 구현 가능한 작업 단위인지 재검토한다.

## M0~M20 진행 근거 보강

이 절은 기존 체크리스트를 대체하지 않는다. 이미 진행된 M0~M20의 책임, 산출물, 완료선, 남은 한계를 한눈에 보기 위한 보강 기록이다.

| 마일스톤 | 책임 | 산출물/검증 근거 | 완료선과 한계 |
| --- | --- | --- | --- |
| M0 | Phase 1의 범위와 제외 범위를 고정한다 | `GAME_FLOW_MAP.ko.md`, `GAME_DOMAIN_SYSTEM.md`, `MODULE_SYSTEM.ko.md`, `PROGRESS_STATUS.ko.md` 대조 | M1~M6만 최소 세로 루프로 닫는다. 이후 기능은 포함하지 않는다 |
| M1 | UI가 직접 상태를 바꾸지 않도록 action/result/effect 계약을 만든다 | `routes`, `actions`, `effects`, `results`, `dispatch`, `npm run build` | 성공/실패/no-op/route 전환 계약을 만든 단계이며, 기능별 상세 로직 완성은 아니다 |
| M2 | 저장 상태, 세션 상태, 화면 계산 객체의 기본 경계를 만든다 | `GameState`, `GameSession`, save payload 경계 helper, `npm run build` | M6까지 필요한 최소 구조만 확정한다. 전수 저장 mapping은 M21에서 닫는다 |
| M3 | 원본 CSV 기반 정의 데이터를 runtime 입력으로 연결한다 | 정의 데이터 bridge, item/recruit/shop listing 분류, `npm run collect:catalog`, `npm run build` | 정의 데이터를 저장 상태에 넣지 않는 경계를 검증한다. 모든 정의의 실제 소비 완료는 M20/M24~M28에서 닫는다 |
| M4 | 새 게임 생성이 저장 상태를 초기화하고 메인 화면으로 이어지게 한다 | `game/new` handler, EASY/NORMAL 입력, 초기 날짜/자금/인물/아이템, `npm run smoke:phase1` | 시작 상태 생성만 닫는다. 캐릭터 seed 전수 연결은 M25에서 닫는다 |
| M5 | 메인 화면을 저장 상태 기반 view로 계산하고 action으로만 이동하게 한다 | `mainMenu` route, menu view, enabled/disabled reason, unknown route/action 처리, `npm run smoke:phase1` | 메인 화면 최소 선택지만 닫는다. 원본 메인 메뉴 전수 구현은 M23에서 닫는다 |
| M6 | 아이템 구매 최소 루프를 성공/실패/취소까지 동작시킨다 | 상점 진입, listing view, 수량 선택, 돈 부족 실패, 구매 성공, 취소, `npm run smoke:phase1` | 구매형 listing 1차 루프만 닫는다. 아이템 사용/특수 효과/전체 상점은 M24에서 닫는다 |
| M7 | 영입 1차 루프를 정의 데이터, 돈, 인물 생성 경계와 연결한다 | `npm run smoke:m7`, 영입 listing, 돈 부족 실패, 영입 성공, 중복 실패, 취소 | 영입 성공 시 `people/body/social/equipment` 생성 경계를 닫는다. 전체 영입 listing 완성은 M24/M25에서 닫는다 |
| M8 | 턴 종료와 시간 진행의 최소 실행 계약을 만든다 | `npm run smoke:m8`, 주차/월 롤오버, phase 복귀, 예약 이벤트 소비, session 폐기 | 턴 종료 골격과 hook 위치를 닫는다. 원본 월말/주말/이벤트 전수 처리는 M27에서 닫는다 |
| M9 | 저장/로드 최소 roundtrip과 오염 payload 차단을 만든다 | `npm run smoke:m9`, schema v1, 직렬화/역직렬화, 손상/future/runtime 오염 실패 | 최소 저장/로드는 닫는다. 전체 기능 후 roundtrip과 migration은 M29에서 닫는다 |
| M10 | 방문/시설 1차 루프를 장소, 행동, 해금 저장 상태와 연결한다 | `npm run smoke:m10`, 방문 view, 기본 방 사용 허가, 돈 부족/중복/취소, `visit` session 폐기 | 장소/행동 1개만 닫는다. 방문/시설 전체는 M26에서 닫는다 |
| M11 | 미션 1차 루프를 정의, 진행 저장 상태, 보상과 연결한다 | `npm run smoke:m11`, 미션 수락/보고, 조건 미충족, 방문 해금 조건, 보상 지급 | 미션 1개만 닫는다. 전체 미션, 기한, 실패, 이벤트 연동은 M27에서 닫는다 |
| M12 | 업무 1차 루프를 결과 계산과 저장 반영으로 분리한다 | `npm run smoke:m12`, 업무/인물 선택, 누락 실패, 돈/경험/피로/이력 반영, 턴 종료 | 업무 1개만 닫는다. 업무/창관/특수 업무 전체는 M26에서 닫는다 |
| M13 | 촬영 1차 루프를 대상/장면 선택, 촬영량 계산, 결과 반영으로 분리한다 | `npm run smoke:m13`, 대상/장면 누락 실패, 취소, 수익/팬/점수/경험/피로/이력 반영 | 촬영 장면 1개만 닫는다. 촬영 장면 전체와 후처리는 M26에서 닫는다 |
| M14 | 훈련 1차 command를 session 계산과 저장 결과 반영으로 분리한다 | `npm run smoke:m14`, 대상/실행자/command 선택, 누락 실패, 계산 버퍼, 결과 반영, session 폐기 | command 1개만 닫는다. 105개 command 전체와 후처리는 M28에서 닫는다 |
| M15 | 화면 렌더링을 route별로 정리하고 진단 패널을 읽기 전용으로 둔다 | `RouteScreens`, `ScreenPrimitives`, `DiagnosticsPanel`, UI 직접 상태 변경 검색, `npm run build` | UI가 상태를 직접 바꾸지 않는 경계를 닫는다. UX 완성이나 전체 화면 구현 완료는 아니다 |
| M16 | smoke/gate 검증 묶음으로 build 단독 완료를 차단한다 | `verify:m16`, `test:roundtrip`, `gate:boundaries`, `gate:raw-names`, `gate:stubs` | M6~M14 최소 루프와 경계 검증을 자동화한다. M21 이후 coverage gate는 별도다 |
| M17 | 원본 근거 대조 정책과 adapter 경계를 확정한다 | `LEGACY_MAPPING_POLICY.ko.md`, `inventory:legacy-mapping`, adapter import 검색, `npm run build` | mapping 상태값과 승인/차단 규칙을 닫는다. 대량 mapping 자체는 M21/M22에서 한다 |
| M18 | 이후 구현을 1개 단위씩 진행하는 규칙과 template을 고정한다 | `IMPLEMENTATION_UNIT_RULES.ko.md`, template 검색, `npm run build`, `npm run test --if-present` | M23~M29의 작업 방식만 닫는다. 기능 구현량을 늘리는 마일스톤이 아니다 |
| M19 | 원본 기능 커버리지 전수표를 만들고 blocker 장부를 시작한다 | `data/coverage/features.json`, `data/coverage/blockers.json`, `coverage:features`, `gate:feature-coverage` | feature row 5,344개와 blocker 5,333개를 장부화한다. 구현 완료가 아니라 구현 대상을 셀 수 있게 만든 단계다 |
| M20 | 원본 정의 데이터와 Chara seed를 역할/소비 책임으로 분류한다 | `data/coverage/definitions.json`, `coverage:definitions`, `gate:definition-consumption`, `npm run build` | definition row 7,840개를 장부화한다. `template/listing/display-only/calculation-only`는 역할 판정이며 실제 소비 완료가 아니다 |

## M0. 기준 동결

- [x] `GAME_FLOW_MAP.ko.md`에서 M1~M6에 필요한 기능 흐름만 확인
- [x] `GAME_DOMAIN_SYSTEM.md`에서 `definitions/save/session/views` 경계 확인
- [x] `MODULE_SYSTEM.ko.md`에서 import 방향 확인
- [x] M1~M6 포함/제외 범위 확정
- [x] M1~M6에서 만들 파일 목록 확정
- [x] M1~M6에서 의도적으로 만들지 않을 기능 목록 확정
- [x] M1~M6 중 blocker가 생길 수 있는 지점 표시
- [x] `PROGRESS_STATUS.ko.md`의 다음 작업이 M1과 일치하는지 확인

검증:

```bash
rg "^## M[0-9]+" docs/NEW_PORT_MILESTONES.ko.md
```

## M1. 공통 실행 계약

- [x] `src/game/routes.ts`에 `UiRoute` 정의
- [x] `src/game/effects.ts`에 `GameEffect` 정의
- [x] `src/game/results.ts`에 `GameActionContext`, `GameActionResult`, result helper 정의
- [x] `src/game/actions.ts`에 M6까지 필요한 action 정의
- [x] `src/game/dispatch.ts`에 `dispatchGameAction(context, action)` 골격 작성
- [x] `GameAction`이 route 변경, 새 게임, 상점 진입, 선택 변경, 구매, 취소를 표현할 수 있음
- [x] `GameActionResult`가 다음 state, 다음 session, effects, route를 분리해서 반환함
- [x] result helper가 성공, 실패, no-op, route 전환을 구분함
- [x] `GameEffect`가 UI 로그, 경고, 저장 요청 같은 부수효과를 상태 변경과 분리함
- [x] dispatch가 action별 handler로 분기하되 UI 컴포넌트에 구현 로직을 두지 않음
- [x] 실패 action이 저장 상태를 바꾸지 않도록 처리
- [x] 실패 action이 세션 상태를 바꾸는 경우와 바꾸지 않는 경우를 구분
- [x] M1 범위 밖 기능 action은 타입만 만들거나 blocker로 남기지 않음
- [x] 기존 UI/runtime import 영향 확인
- [x] `npm run build` 실행

검증:

```bash
npm run build
```

## M2. 데이터 구조 v1

- [x] `GameState`와 `GameSession` 경계 정리
- [x] `run`, `economy`, `people`, `inventory`, `shop`의 최소 저장 상태 확정
- [x] `session.shop`, `session.ui` 등 실행 중 상태 확정
- [x] `views`는 저장 구조가 아니라 계산 결과라는 경계 확인
- [x] `GameState` 초기값 생성 함수 또는 상수 정리
- [x] `GameSession` 초기값 생성 함수 또는 상수 정리
- [x] `run.clock`에 새 게임 직후 필요한 날짜/시간대 필드 확정
- [x] `economy.account.currentMoney` 초기값 필드 확정
- [x] `inventory.itemCounts`를 `itemId -> count` 구조로 확정
- [x] `shop.progress`에는 영구 해금/숨김/시설 진행만 둠
- [x] `session.shop`에는 선택 상품, 수량, 현재 표시 목록만 둠
- [x] M6 이전 불필요 도메인은 빈 상태 또는 최소 계약만 유지
- [x] 상태 경계 검증 helper 초안 작성
- [x] action result 검증 helper 초안 작성
- [x] save payload 검증 helper 초안 작성
- [x] 저장 payload에 `GameSession`과 view 계산 객체가 들어가지 않는 검증 추가
- [x] `npm run build` 실행

검증:

```bash
npm run build
```

## M3. 정의 데이터 연결

- [x] 생성된 정의 데이터 산출물을 runtime 정의 데이터 입력으로 연결
- [x] 아이템 정의와 모집 listing 정의를 구분
- [x] 정의 데이터 JSON schema 또는 타입 변환 경계 확정
- [x] `GameDefinitions.items`와 현재 코드의 `GameCatalog.items` 명칭 차이를 정리 또는 bridge 추가
- [x] `Item.csv` 0~99, 100~199, 200~214 분류를 코드에서 표현할 방법 확정
- [x] `CharacterTemplate` 109개를 runtime에서 조회할 수 있게 연결
- [x] 정의 데이터 id는 원본 index 문자열을 그대로 노출할지 앱 id로 변환할지 결정
- [x] 정의 데이터가 `GameState`에 저장되지 않도록 확인
- [x] 정의 데이터 조회 실패 처리 추가
- [x] M6에 필요한 최소 정의 데이터만 연결
- [x] M6에 쓰지 않는 정의 데이터는 로드만 하고 기능 로직에 섞지 않음
- [x] `npm run collect:catalog` 실행
- [x] `npm run build` 실행

검증:

```bash
npm run collect:catalog
npm run build
```

## M4. 새 게임 생성

- [x] 새 게임 action 구현
- [x] 새 게임 action 입력값 타입 정의
- [x] 새 게임 전용 handler 작성
- [x] 초기 날짜/주차/목표 상태 생성
- [x] 초기 자금 생성
- [x] 시작 인물/보유 아이템 생성
- [x] 캐릭터 원형에서 시작 인물 인스턴스를 만드는 최소 변환 작성
- [x] 신체/관계/장비 기본값 생성 지점 분리
- [x] 초기 session route 설정
- [x] 새 게임 성공 effect 작성
- [x] 새 게임 실패 effect 작성
- [x] 생성 실패가 저장 상태를 남기지 않도록 처리
- [x] 새 게임 직후 메인 화면으로 이동하는 smoke 경로 확인
- [x] `npm run build` 실행

검증:

```bash
npm run build
```

## M5. 메인 화면 view

- [x] 메인 화면 route 구현
- [x] 저장 상태를 읽어 선택지 view 계산
- [x] 메인 화면 view model 타입 정의
- [x] 메뉴 항목 id와 표시 label 분리
- [x] 메뉴 항목의 enabled/disabled 사유 표현
- [x] `GAME_FLOW_MAP.ko.md`의 메인 화면 기능 목록과 메뉴 id 대조
- [x] UI가 저장 상태를 직접 수정하지 않도록 action만 dispatch
- [x] 로그/effect 표시 최소 구현
- [x] route 전환이 저장 상태 변경 없이 동작하는지 확인
- [x] 알 수 없는 route/action 처리 경로 작성
- [x] 새 게임에서 메인 화면까지 smoke 확인
- [x] `npm run build` 실행

검증:

```bash
npm run build
```

## M6. 아이템 구매 1차

- [x] 상점 진입 action 구현
- [x] 판매 가능 listing view 계산
- [x] `ShopView.visibleListings` 계산 함수 작성
- [x] `GameSession.shop.visibleListingIds`를 저장 payload에서 제외
- [x] 상품 상세 view 계산 작성
- [x] 상품 선택/수량 변경 action 구현
- [x] 수량 0, 음수, 재고/제한 초과 입력 처리
- [x] 구매 성공 시 자금 감소와 아이템 증가 처리
- [x] 구매 실패 시 저장 상태 불변 확인
- [x] 돈 부족 실패 처리
- [x] 정의 데이터에 없는 item/listing 실패 처리
- [x] 취소/메인 복귀 처리
- [x] 구매 성공/실패/취소 effect 메시지 분리
- [x] M6 범위 밖 기능을 붙이지 않음
- [x] `npm run build` 실행

검증:

```bash
npm run build
```

## M7. 고용/영입 1차

- [x] 모집 listing view 계산
- [x] 영입 후보 정의와 캐릭터 원형 연결
- [x] 영입 가격 계산
- [x] 영입 가능 조건 계산
- [x] 영입 action 구현
- [x] 영입 성공 시 자금 감소 처리
- [x] 영입 성공 시 `people`, `body`, `social`, `equipment` 기본 상태 생성
- [x] `people/body/social/equipment` 생성 경계 확인
- [x] 중복 영입 또는 인원 제한 실패 처리
- [x] 실패/취소 처리
- [x] 영입 성공/실패/취소 effect 메시지 분리
- [x] `npm run build` 실행

## M8. 턴 종료/시간 진행

- [x] `turn/end` action 구현
- [x] 일/주차/기간 진행 규칙 구현
- [x] 전반/후반 또는 phase 전환 규칙 구현
- [x] 턴 종료 전 실행할 hooks 배열 정의
- [x] 턴 종료 후 실행할 hooks 배열 정의
- [x] session 임시 상태 정리
- [x] 예약 이벤트 최소 처리
- [x] 미션 기한 감소는 stub 또는 명시 blocker로 분리
- [x] 월말/주말 처리는 stub 또는 명시 blocker로 분리
- [x] 턴 종료 후 메인 화면 route 복귀 확인
- [x] `npm run build` 실행

## M9. 저장/로드

- [x] 저장 payload 형식 확정
- [x] save schema version 필드 확정
- [x] `GameState`와 metadata만 저장
- [x] `GameSession`과 view 계산 객체가 저장 payload에 섞이지 않도록 검증
- [x] 정의 데이터가 저장 payload에 섞이지 않도록 검증
- [x] 저장 직렬화 함수 작성
- [x] 저장 역직렬화 함수 작성
- [x] 손상 payload 실패 처리 작성
- [x] 저장 roundtrip 확인
- [x] `npm run build` 실행

## M10. 방문/시설 1차

- [x] 방문 가능 장소 view 계산
- [x] 방문 장소 id와 표시 label 분리
- [x] 장소 진입 가능 조건 계산
- [x] 장소 1개와 행동 1개 구현
- [x] 장소 action 성공 결과 반영
- [x] 장소 action 실패 결과 반영
- [x] 장소 action 취소 결과 반영
- [x] 시설 해금/플래그 저장 경계 확인
- [x] 방문 세션 선택값이 저장 상태에 남지 않는지 확인
- [x] 실패/취소 처리
- [x] `npm run build` 실행

## M11. 미션 1차

- [x] 미션 정의와 진행 상태 분리
- [x] 미션 목록 view 계산
- [x] 미션 표시 조건 계산
- [x] 미션 1개 시작/완료 처리
- [x] 미션 수락 action 구현
- [x] 미션 보고 action 구현
- [x] 미션 실패 또는 조건 미충족 처리
- [x] 보상 지급 처리
- [x] 미션 진행 상태가 저장 payload에 포함되는지 확인
- [x] 미션 목록 선택 상태가 저장 payload에 들어가지 않는지 확인
- [x] 실패/취소 처리
- [x] `npm run build` 실행

## M12. 업무 1차

- [x] 업무 정의와 배정 상태 분리
- [x] 업무 목록 view 계산
- [x] 업무 참여 조건 계산
- [x] 업무 1개 실행 처리
- [x] 업무 성공 결과 계산
- [x] 업무 실패 또는 조건 미충족 처리
- [x] 결과 계산과 저장 반영 분리
- [x] 돈/경험/피로/시간 진행 반영 지점 분리
- [x] 업무 완료 후 턴 종료 연결
- [x] 실패/취소 처리
- [x] `npm run build` 실행

## M13. 촬영 1차

- [x] 촬영 정의와 session 상태 분리
- [x] 촬영 대상 후보 view 계산
- [x] 촬영 대상 조건 실패 사유 표현
- [x] 촬영 장면 후보 view 계산
- [x] 장면 1개 실행
- [x] 장면 선택/취소/확정 action 구현
- [x] 촬영량 또는 비용 계산
- [x] 촬영 결과 계산
- [x] 결과만 저장 상태에 반영
- [x] 턴 종료와 경계 확인
- [x] 촬영 세션 계산 버퍼가 저장 payload에 들어가지 않는지 확인
- [x] `npm run build` 실행

## M14. 훈련 1차

- [x] command 1개 availability 계산
- [x] 대상/조수/실행자 선택 상태 정의
- [x] command 후보 view 계산
- [x] command 불가 사유 표현
- [x] 훈련 계산 버퍼를 session에만 유지
- [x] 자극 원천 계산 함수 작성
- [x] 파라미터 증가/감소 계산 함수 작성
- [x] 체력/기력 감소 계산 함수 작성
- [x] 결과만 저장 상태에 반영
- [x] 훈련 종료 후 턴 종료 연결
- [x] 원본 `COMF`, `TFLAG`, `SOURCE` 등 직접 모델명 사용 차단
- [x] `npm run build` 실행

검증:

```bash
npm run build
rg "COMF|TFLAG|SOURCE|TEQUIP|LOSEBASE" src/game src/domains src/ui
```

## M15. 화면 정리와 진단 패널

- [x] runtime hook 정리
- [x] UI가 읽는 runtime 값 목록 정리
- [x] route별 화면 렌더러 정리
- [x] 선택지 컴포넌트 정리
- [x] 로그/effect 표시 정리
- [x] 읽기 전용 진단 패널 구현
- [x] 진단 패널에 현재 route, state 요약, session 요약 표시
- [x] 진단 패널이 action dispatch 외 상태 변경을 하지 않도록 확인
- [x] UI가 서비스나 저장 상태를 직접 수정하지 않도록 확인
- [x] `npm run build` 실행

## M16. 테스트/검증 체계 확장

- [x] 테스트 도구 추가 여부 결정
- [x] 테스트 도구를 추가하면 package script 추가
- [x] 테스트 도구를 추가하지 않으면 shell 기반 smoke 검증만 유지
- [x] M6 최소 루프 성공/실패 테스트 추가
- [x] 새 게임 생성 테스트 추가
- [x] 저장 roundtrip 테스트 추가
- [x] 상태 경계 검증 자동화
- [x] 원본명 차단 검색 추가
- [x] build 외 검증 명령을 `PROGRESS_STATUS.ko.md`에 반영
- [x] `npm run build` 실행
- [x] 테스트 도구가 있으면 `npm run test --if-present` 실행

검증:

```bash
npm run build
npm run test --if-present
rg "CFLAG|TFLAG|SOURCE|TEQUIP|ITEMSALES|BOUGHT|COMF|SCENE_" src/game src/domains src/ui
```

## M17. 원본 근거 대조 정책

- [x] M1~M16 완료 여부 확인
- [x] `npm run inventory:legacy-mapping` 실행
- [x] mapping 상태값과 작성 절차 확정
- [x] mapping 상태값 목록 문서화: mapped, needsDecision, missingMapping, blocker, excluded
- [x] mapping 승인 기준 문서화: CSV 이름, Chara seed, ERB read/write, 흐름 근거
- [x] 불명확한 주소를 `needsDecision` 또는 `missingMapping`으로 남기는 규칙 확정
- [x] M17에서 대량 확정 변환표를 작성하지 않음
- [x] 기능 구현 코드가 원본 주소를 직접 참조하지 않도록 경계 확인
- [x] core가 `src/adapters/legacy`를 import하지 않는지 확인
- [x] `npm run build` 실행

검증:

```bash
npm run inventory:legacy-mapping
npm run build
rg "adapters/legacy|legacy/" src/game src/domains src/catalog
```

## M18. 반복 구현 규칙 고정

- [x] 기능 구현은 항상 한 단위씩만 진행하도록 규칙 확정
- [x] 각 단위는 `GAME_FLOW_MAP.ko.md`의 입력/상태 변화/종료 조건을 먼저 가진다고 명시
- [x] 각 단위는 정의/저장/session/view 소유권을 먼저 정한다고 명시
- [x] 각 단위는 성공/실패/취소 검증을 가진다고 명시
- [x] 확정 가능한 원본 주소만 해당 기능 범위 안에서 mapping한다고 명시
- [x] 미정 항목이 있으면 해당 기능을 완료 처리하지 않고 blocker로 기록한다고 명시
- [x] 각 단위의 구현 전 checklist template 확정
- [x] 각 단위의 구현 후 검증 template 확정
- [x] 각 단위의 blocker 기록 template 확정
- [x] 기준 문서가 필요하면 갱신
- [x] `npm run build` 실행
- [x] 테스트 도구가 있으면 `npm run test --if-present` 실행

기능별 최대 단위:

| 기능 | 1회 최대 단위 |
| --- | --- |
| 아이템/상점 | 아이템 1개 또는 listing 1개 |
| 방문/시설 | 장소 1개와 행동 1개 |
| 미션 | 미션 1개 |
| 업무 | 업무 1개 |
| 촬영 | 장면 1개 |
| 훈련 | command 1개 |
| 엔딩 | 조건 1개 또는 결과 화면 1개 |

## M19. 원본 기능 커버리지 전수표

- [x] 메인 화면 선택지 전체를 `GAME_FLOW_MAP.ko.md` 기준으로 feature id로 분해
- [x] 각 feature id에 원본 라벨, 원본 파일, 입력, 저장 변경, 종료 조건을 연결
- [x] feature coverage 산출물 경로 확정
- [x] feature id, parent feature, source label, source file, end route, status 컬럼 확정
- [x] 동적 호출 66개를 feature id 또는 blocker로 분류
- [x] persistence 액션 134개를 저장/로드/전역 저장 기능에 연결
- [x] exit 액션 3,536개를 정상 종료, 취소, 오류 종료, 게임 종료 중 하나로 분류
- [x] pause 액션 931개를 입력 화면 또는 대기 화면으로 분류
- [x] 구현 제외가 필요한 항목은 제외 사유와 사용자 승인 필요 여부를 기록
- [x] 메인 화면에서 도달 불가능한 원본 라벨을 별도 분류
- [x] 기능별 구현 순서 후보를 기록하되 실행 일정으로 쓰지 않음
- [x] 미분류 feature id가 0개인지 확인
- [x] `npm run analyze:game-system` 실행
- [x] `npm run build` 실행

검증:

```bash
npm run analyze:game-system
npm run build
```

## M20. 정의 데이터 전수 연결

- [x] CSV/Chara 정의 데이터 918개를 runtime 정의 데이터로 로드
- [x] definition coverage 산출물 경로 확정
- [x] definition key, source file, source id, runtime owner, status 컬럼 확정
- [x] Chara 초기값 6,922행을 캐릭터 원형 또는 blocker로 분류
- [x] `Item.csv` 항목을 아이템, 영입 listing, 시설/해금, 특수 항목으로 분류
- [x] `Item.csv` 분류별 수량을 산출물에 기록
- [x] `Train.csv` 105개를 훈련 command 정의 또는 blocker로 분류
- [x] `source.csv` 항목을 훈련 계산 source 정의로 연결
- [x] `Abl.csv`, `BASE.csv`, `Talent.csv`, `exp.csv`, `Mark.csv`, `Palam.csv`를 표시/계산 정의로 연결
- [x] 정의 데이터 중 앱에서 참조되지 않는 항목을 unused로 남기지 않고 owner 또는 blocker를 부여
- [x] 중복 ID, 인코딩 실패, 무효 행 0개 확인
- [x] `npm run collect:catalog` 실행
- [x] `npm run build` 실행

검증:

```bash
npm run collect:catalog
npm run build
```

## M21. 저장 상태 원본 주소 전수 매핑

- [ ] `map-save-state` 대상 1,215개를 도메인 필드 또는 blocker로 분류
- [ ] save mapping coverage 산출물 경로 확정
- [ ] family, index, source evidence, runtime owner, field path, status 컬럼 확정
- [ ] persistent 후보 1,016개 숫자 슬롯을 저장 필드, 정의 데이터, 세션, script scratch, blocker 중 하나로 재판정
- [ ] `CFLAG`, `FLAG`, `GLOBAL`, `PBAND`를 family 단위가 아니라 index 의미 단위로 분해
- [ ] `CFLAG` index별 owner domain 분류표 작성
- [ ] `FLAG` index별 owner domain 분류표 작성
- [ ] `PBAND` index별 owner domain 분류표 작성
- [ ] 캐릭터 seed 근거가 있는 주소는 캐릭터 원형 초기값과 저장 인스턴스 필드를 구분
- [ ] write-only 주소는 실제 쓰기 위치를 근거로 소유 도메인을 확정
- [ ] read-only 주소는 실제 사용 기능과 기본값 근거를 확인
- [ ] 저장 roundtrip에서 사라지는 필드가 없는지 검증
- [ ] `needsDecision`, `missingMapping` 저장 주소가 기능 완료 상태에 남지 않도록 차단
- [ ] `npm run inventory:legacy-mapping` 실행
- [ ] `npm run audit:erb-states` 실행
- [ ] `npm run build` 실행

검증:

```bash
npm run inventory:legacy-mapping
npm run audit:erb-states
npm run build
```

## M22. 세션/계산 원본 주소 전수 매핑

- [ ] `map-session-state` 대상 365개를 session 필드 또는 계산 함수 내부값으로 분류
- [ ] session mapping coverage 산출물 경로 확정
- [ ] family, index, source evidence, session owner, calculation owner, status 컬럼 확정
- [ ] session/runtime buffer 후보 234개를 화면 세션, 훈련 세션, 촬영 세션, 업무 세션, script scratch, blocker 중 하나로 분류
- [ ] `TFLAG`, `TEQUIP`, `SOURCE`, `UP`, `DOWN`, `LOSEBASE`, `NOWEX`, `EJAC`를 원본명 그대로 모델명으로 쓰지 않도록 의미 단위로 재명명
- [ ] `TFLAG` index별 의미표 작성
- [ ] `TEQUIP` index별 의미표 작성
- [ ] `SOURCE` id별 계산 owner 작성
- [ ] 각 계산 버퍼가 기능 종료 후 저장 상태에 직접 남지 않는지 검증
- [ ] 저장해야 하는 결과와 버려야 하는 중간값을 테스트로 분리
- [ ] `npm run audit:erb-states` 실행
- [ ] `npm run build` 실행

검증:

```bash
npm run audit:erb-states
npm run build
rg "TFLAG|TEQUIP|SOURCE|LOSEBASE|NOWEX|EJAC" src/game src/domains src/features src/ui
```

## M23. 메인 화면 기능 전수 구현

- [ ] M19 feature coverage에서 메인 화면 직속 feature 목록을 읽음
- [ ] 훈련 시작 메뉴 구현
- [ ] 인물 영입 메뉴 구현
- [ ] 아이템 구매/사용 메뉴 구현
- [ ] 창관/업무 메뉴 구현
- [ ] 촬영 메뉴 구현
- [ ] 재단/의복 메뉴 구현
- [ ] 방문 메뉴 구현
- [ ] 휴식/시간 종료 메뉴 구현
- [ ] 능력 상승 메뉴 구현
- [ ] 미션 메뉴 구현
- [ ] 저장/로드 메뉴 구현
- [ ] 설정/정보/업적/도움말/디버그 메뉴를 구현 또는 승인된 제외로 분류
- [ ] 엔딩 체크 메뉴 구현
- [ ] 각 메뉴의 enabled/disabled 조건 구현
- [ ] 각 메뉴의 표시 이름과 설명 구현
- [ ] 각 메뉴의 route 전환 구현
- [ ] 모든 메뉴가 성공/취소 후 지정된 끝점으로 돌아가는지 검증
- [ ] M19 coverage의 메인 화면 feature status 갱신
- [ ] `npm run build` 실행

## M24. 상점/아이템/영입 완성

- [ ] M20 definition coverage에서 item/listing 전체 목록을 읽음
- [ ] 모든 아이템 정의의 표시 이름, 가격, 분류를 연결
- [ ] 아이템 분류별 handler owner 지정
- [ ] 모든 구매형 아이템의 구매 성공/실패/취소 처리 구현
- [ ] 모든 사용형 아이템의 사용 조건과 효과를 구현 또는 blocker로 분류
- [ ] 모든 영입 listing의 표시 조건, 가격, 생성 결과를 구현
- [ ] 영입 listing과 캐릭터 원형 연결 누락 0개 확인
- [ ] 돈 부족, 수량 제한, 해금 조건, 중복 구매 조건을 검증
- [ ] 상점 view 계산값이 저장 상태에 들어가지 않는지 검증
- [ ] 인벤토리 수량과 상점 진행 상태를 분리 검증
- [ ] M20/M21 coverage의 상점 관련 status 갱신
- [ ] `npm run build` 실행

## M25. 인물/신체/관계 완성

- [ ] M20 Chara seed coverage 전체를 읽음
- [ ] 모든 캐릭터 원형을 생성 가능한 캐릭터 인스턴스로 변환
- [ ] 이름, 호칭, 별명, 표시 이름을 저장/정의 데이터 경계에 맞게 연결
- [ ] 능력, 기초치, 소질, 경험, 각인, 파라미터 초기값을 연결
- [ ] 신체/생식/성적 이력/오염/자원 상태를 하위 객체로 분리
- [ ] 관계값과 방향성 관계를 `social`에 연결
- [ ] 캐릭터 삭제, 은퇴, 조수 가능, 영입 가능 상태를 검증
- [ ] 캐릭터 정보 화면과 저장 roundtrip을 검증
- [ ] M21 coverage의 people/body/social 관련 status 갱신
- [ ] `npm run build` 실행

## M26. 방문/시설/업무/촬영 완성

- [ ] M19 feature coverage에서 방문/시설/업무/촬영 feature 목록을 읽음
- [ ] 방문 장소 전체를 장소 정의 또는 blocker로 분류
- [ ] 장소별 행동 전체를 구현 또는 blocker로 분류
- [ ] 업무 정의 전체를 구현 또는 blocker로 분류
- [ ] 창관/아르바이트/업무 결과가 돈, 인물, 신체, 시간 진행에 반영되는지 검증
- [ ] 촬영 장면 전체를 장면 정의 또는 blocker로 분류
- [ ] 촬영 대상 조건, 장면 선택, 촬영량, 결과 반영, 턴 종료를 검증
- [ ] 시설 해금과 현재 선택 세션을 분리 검증
- [ ] 방문/업무/촬영별 성공/실패/취소 smoke flow 추가
- [ ] M19/M21/M22 coverage의 관련 status 갱신
- [ ] `npm run build` 실행

## M27. 미션/세계/이벤트/엔딩 완성

- [ ] M19 feature coverage에서 미션/이벤트/엔딩 feature 목록을 읽음
- [ ] 미션 전체를 정의, 진행 상태, 보상, 실패 조건으로 분리
- [ ] 미션 기한과 턴 종료 처리를 연결
- [ ] 세계/장소/스토리 진행 플래그를 `world`에 연결
- [ ] 회차 밖 업적/클리어 보너스/전역 해금을 `meta`에 연결
- [ ] 엔딩 조건 전체를 조건 id와 결과 화면으로 분류
- [ ] 엔딩 후 계승 새 게임 흐름을 구현
- [ ] LOADGLOBAL/SAVEGLOBAL 관련 상태와 save 상태를 분리 검증
- [ ] M19/M21 coverage의 관련 status 갱신
- [ ] `npm run build` 실행

## M28. 훈련 커맨드 완성

- [ ] M20 `Train.csv` command coverage 전체를 읽음
- [ ] `Train.csv` 105개 command 전체를 구현 또는 blocker로 분류
- [ ] command별 가능 조건을 view 계산으로 구현
- [ ] command별 대상/조수/실행자 역할 조건을 구현
- [ ] command별 계산 source, 파라미터 증감, 체력/기력 감소를 구현
- [ ] command별 장비/임시 모드/결과 이벤트를 session 계산으로 구현
- [ ] command별 최종 결과가 `people`, `body`, `social`, `inventory`, `economy`, `run`에만 반영되는지 검증
- [ ] 훈련 중간값이 저장 payload에 섞이지 않는지 검증
- [ ] command별 성공/불가/취소 smoke 검증 추가
- [ ] M20/M21/M22 coverage의 훈련 관련 status 갱신
- [ ] `npm run build` 실행

검증:

```bash
npm run build
rg "COMF|TFLAG|SOURCE|TEQUIP|LOSEBASE" src/game src/domains src/features src/ui
```

## M29. 저장/로드/마이그레이션 완성

- [ ] 저장 payload schema 확정
- [ ] 저장 파일에 정의 데이터, view 계산 객체, session 계산 버퍼가 들어가지 않도록 검증
- [ ] 새 게임 저장 후 로드 roundtrip 검증
- [ ] 상점/영입/방문/업무/촬영/훈련 후 저장 roundtrip 검증
- [ ] 엔딩 후 계승 데이터 저장/로드 검증
- [ ] corrupted save 처리 검증
- [ ] unknown future schema 처리 검증
- [ ] old schema migration 검증
- [ ] schema version 변경 시 마이그레이션 경로 구현
- [ ] 손상된 저장 파일 처리 구현
- [ ] 저장/로드 실패 effect와 UI route 처리 검증
- [ ] `npm run build` 실행

## M30. 최종 누락 0 검증

- [ ] 기능 커버리지 전수표에서 미구현 기능 0개 확인
- [ ] 정의 데이터 전수표에서 미분류 정의 0개 확인
- [ ] 원본 주소 inventory에서 완료 기능 범위의 `needs-review`, `needsDecision`, `missingMapping` 0개 확인
- [ ] 미해소 blocker 0개 확인
- [ ] 사용자 승인 제외 항목은 승인 근거와 제외 범위를 확인
- [ ] M19 feature coverage 상태값이 모두 implemented 또는 approved-excluded인지 확인
- [ ] M20 definition coverage 상태값이 모두 used 또는 approved-excluded인지 확인
- [ ] M21 save mapping coverage 상태값이 모두 mapped 또는 approved-excluded인지 확인
- [ ] M22 session mapping coverage 상태값이 모두 mapped 또는 approved-excluded인지 확인
- [ ] 저장 상태와 세션 상태 경계 검사 통과
- [ ] 원본명 직접 사용 차단 검색 통과
- [ ] 전체 smoke flow 통과: 새 게임, 메인, 구매, 영입, 방문, 업무, 촬영, 훈련, 턴 종료, 저장, 로드, 엔딩 체크
- [ ] `npm run collect:catalog` 실행
- [ ] `npm run analyze:game-system` 실행
- [ ] `npm run inventory:legacy-mapping` 실행
- [ ] `npm run audit:erb-states` 실행
- [ ] `npm run build` 실행
- [ ] 테스트 도구가 있으면 `npm run test --if-present` 실행

검증:

```bash
npm run collect:catalog
npm run analyze:game-system
npm run inventory:legacy-mapping
npm run audit:erb-states
npm run build
npm run test --if-present
rg "CFLAG|TFLAG|SOURCE|TEQUIP|ITEMSALES|BOUGHT|COMF|SCENE_" src/game src/domains src/features src/ui
```


