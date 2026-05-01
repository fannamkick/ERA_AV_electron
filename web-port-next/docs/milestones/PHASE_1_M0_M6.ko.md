# Phase 1. M0~M6 상세 마일스톤

최소 세로 루프: 기준 동결, 공통 실행 계약, 데이터 구조, 정의 데이터, 새 게임, 메인 화면, 아이템 구매 1차.

완료 판정은 이 문서만으로 하지 않는다. 원본 파일, coverage/gap/closure JSON, 전용 gate/smoke/build가 최종 권위다.

## 상세 마일스톤

## M0. 기준 동결

책임 선언:
- 역할: 신규 포트 작업의 첫 실행 범위를 동결한다.
- 범위: M1~M6에 필요한 원본 흐름, 데이터 경계, 모듈 경계, 제외 기능만 다룬다.
- 방식: 기준 문서와 현재 진행 상태를 대조해 Phase 1의 포함/제외와 blocker 가능 지점을 확정한다.
- 완료 결과: M1이 바로 실행 가능한 상태가 되고, Phase 1 밖 기능은 완료로 착각되지 않는다.
- 누락 차단: M1~M6 범위, 제외 기능, blocker 지점 중 하나라도 비어 있으면 완료하지 않는다.

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
rg "^## M[0-9]+" docs/milestones/PHASE_*.ko.md
```

## M1. 공통 실행 계약

책임 선언:
- 역할: 게임 실행을 UI 직접 조작이 아니라 action/result/effect 계약으로 통일한다.
- 범위: route, action, effect, result, dispatch의 최소 공통 계약과 M6까지 필요한 action만 포함한다.
- 방식: 성공, 실패, no-op, route 전환을 result로 표현하고 UI는 dispatch만 호출하게 한다.
- 완료 결과: 이후 모든 기능이 같은 실행 계약 위에서 구현될 수 있다.
- 누락 차단: 실패 action이 저장 상태를 바꾸거나 UI에 기능 로직이 남으면 완료하지 않는다.

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

책임 선언:
- 역할: 새 게임과 상점 1차 루프에 필요한 저장 상태, 세션 상태, 화면 계산 객체의 경계를 세운다.
- 범위: `run`, `economy`, `people`, `inventory`, `shop`, `session.shop`, `views`, save payload helper의 최소 구조다.
- 방식: 저장할 데이터와 화면/행동 중에만 필요한 데이터를 타입과 helper로 분리한다.
- 완료 결과: M4~M6이 같은 상태 구조를 쓰며 save payload에 session/views가 들어가지 않는다.
- 누락 차단: 저장, 세션, view 계산값 중 하나라도 owner가 불명확하면 완료하지 않는다.

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

책임 선언:
- 역할: 원본 CSV 기반 정의 데이터를 runtime 입력으로 연결하되 저장 상태와 분리한다.
- 범위: M6까지 필요한 item, shop listing, recruit listing, character template 조회와 실패 처리를 포함한다.
- 방식: 원본 정의를 앱에서 조회 가능한 `GameDefinitions` 경계로 변환하고 기능 로직에 직접 CSV 구조를 노출하지 않는다.
- 완료 결과: 정의 데이터는 runtime에서 읽히지만 `GameState`에는 저장되지 않는다.
- 누락 차단: 정의 조회 실패 처리, item/listing 분류, 저장 상태 분리 중 하나라도 빠지면 완료하지 않는다.

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

책임 선언:
- 역할: 새 게임을 시작 가능한 저장 상태와 첫 route로 초기화한다.
- 범위: 난이도 입력, 초기 날짜/목표/자금/시작 인물/시작 아이템, 실패 불변 처리를 포함한다.
- 방식: 캐릭터 원형에서 시작 인스턴스를 만들고 신체/관계/장비 기본값 생성 지점을 분리한다.
- 완료 결과: 새 게임 성공 후 메인 화면으로 이동하며 실패 시 저장 상태가 남지 않는다.
- 누락 차단: 초기 상태 owner가 불명확하거나 실패 경로가 상태를 오염시키면 완료하지 않는다.

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

책임 선언:
- 역할: 메인 화면을 저장 상태에서 계산되는 view와 action 진입점으로 만든다.
- 범위: 메인 route, 메뉴 view model, enabled/disabled 사유, 로그/effect, unknown route/action 처리다.
- 방식: UI는 저장 상태를 직접 수정하지 않고 action만 dispatch한다.
- 완료 결과: 새 게임 직후 사용자가 메인 화면에서 다음 기능으로 이동할 수 있다.
- 누락 차단: 메뉴가 표시만 되고 action이 없거나 UI 직접 상태 변경이 남으면 완료하지 않는다.

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

책임 선언:
- 역할: 아이템 구매의 최소 세로 루프를 실제 상태 변화까지 닫는다.
- 범위: 상점 진입, 판매 listing 계산, 상품 선택, 수량 변경, 구매 성공/실패/취소, 돈/인벤토리 반영이다.
- 방식: 판매 목록과 선택값은 session/view로 두고 보유 수량과 돈만 save에 반영한다.
- 완료 결과: 구매 성공, 돈 부족 실패, 취소가 모두 동작하고 save payload 경계가 유지된다.
- 누락 차단: 현재 선택값이 저장되거나 구매 실패가 돈/인벤토리를 바꾸면 완료하지 않는다.

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
