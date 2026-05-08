# 모듈 시스템 규칙

## 층위 고정

정의 데이터, `GameState`, `GameSession`, `Systems`, `UI`, `legacy-adapter`는 같은 종류가 아니다. 이 층위를 섞으면 원본 ERB처럼 상태와 임시 변수가 다시 엉킨다.

```text
Runtime
├─ definitions: 원본 CSV에서 온 읽기 전용 정의 데이터
├─ state: 세이브에 들어가는 GameState
├─ session: 저장하지 않는 현재 실행 상태 GameSession
├─ systems: state/session을 바꾸는 규칙과 액션
└─ ui: 표시와 입력
```

도메인은 위 Runtime과 같은 층위가 아니다. 도메인은 정의 데이터, `GameState`, `GameSession` 안에서 데이터를 객체처럼 나누는 소유권 단위다.

예시:

- `GameState.people`: 인물 자체에 종속되는 저장 상태
- `GameState.body`: 인물의 신체/축적 수치에 종속되는 저장 상태
- `GameState.inventory`: 소유 물품 수량 상태
- `GameState.shop`: 상점 해금/판매 진행 상태
- `GameSession.shop`: 현재 상점 화면의 임시 선택 상태
- `GameSession.interaction`: 현재 상호작용/훈련 계산 중 임시 상태
- 정의 데이터의 `items`: 아이템 정의표. 보유 수량이 아니다.

같은 도메인 이름이 저장 상태와 세션 상태에 모두 있을 수 있다. 이때 둘은 같은 층위가 아니라 같은 관심사를 서로 다른 생명주기에서 관리하는 객체다.

## 레이어

| 레이어 | 경로 | 책임 |
| --- | --- | --- |
| Kernel | `src/kernel/` | 모듈 타입, registry 검증, 런타임 생성기 |
| Game Composition | `src/game/` | 실제 게임 상태 타입과 도메인/기능 조립. legacy adapter를 직접 import하지 않는 core 정의 |
| App Runtime Composition | `src/runtime.ts` | 앱 실행에 필요한 game core와 legacy adapter 검증 모듈을 최종 조립 |
| Definition Data | `src/catalog/` | 원본 CSV를 정규화한 읽기 전용 데이터 |
| Domains | `src/domains/` | `GameState`와 `GameSession` 안의 도메인 객체 타입과 초기 상태 |
| Features | `src/features/` | 여러 도메인을 사용하는 플레이 가능 기능 단위 |
| UI | `src/ui/` | 화면 레이아웃과 사용자 상호작용 표시 |
| Legacy Adapter | `src/adapters/legacy/` | ERB family/index와 새 도메인 사이의 검증 경계 |

## Import 방향

허용:

- `src/game/`은 도메인, 기능, 정의 데이터를 조립할 수 있다.
- `src/runtime.ts`는 `src/game/` core 정의와 `src/adapters/legacy/` 검증 모듈을 최종 조립할 수 있다.
- `src/features/`는 필요한 도메인 타입과 커널 타입을 참조할 수 있다.
- `src/ui/`는 game runtime을 읽고 화면을 그릴 수 있다.
- `src/adapters/legacy/`는 legacy index 사전과 검증 도구만 제공한다.

금지:

- `src/kernel/`이 구체 도메인이나 UI를 import하면 안 된다.
- `src/domains/`가 React, UI 컴포넌트, feature 구현을 import하면 안 된다.
- `src/catalog/`가 런타임 저장 상태를 import하면 안 된다.
- 기능 코드가 legacy index를 직접 수정하면 안 된다.
- UI가 도메인 내부 상태를 직접 변경하면 안 된다.
- `src/game/`, `src/domains/`, `src/catalog/`는 `src/adapters/legacy/`를 직접 import하면 안 된다. 원본 근거는 coverage/source metadata와 최상위 runtime composition을 통해서만 연결한다.
