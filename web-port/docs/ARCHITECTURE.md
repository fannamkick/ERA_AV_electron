# erAV_Ho Web Port - 아키텍처 문서

## 프로젝트 구조

```
web-port/
├── src/
│   ├── components/           # React 컴포넌트
│   │   ├── GameLayout.tsx              # 메인 레이아웃 (화면 라우팅)
│   │   ├── MainMenu.tsx                # 메인 메뉴
│   │   ├── TrainingCommandMenu.tsx     # 조교 커맨드 메뉴
│   │   ├── TrainingScreen.tsx          # 조교 화면
│   │   ├── CharacterSelectScreen.tsx   # 캐릭터 선택
│   │   ├── SlaveMarketScreen.tsx       # 배우 모집
│   │   ├── BrothelScreen.tsx           # 창관 관리
│   │   ├── FilmingScreen.tsx           # AV 촬영
│   │   ├── ShopScreen.tsx              # 상점
│   │   ├── VisitScreen.tsx             # 방문
│   │   ├── InfoScreen.tsx              # 정보
│   │   ├── SaveLoadScreen.tsx          # 저장/불러오기
│   │   ├── InfoPanel.tsx               # 정보 패널
│   │   └── CommandTestScreen.tsx       # 커맨드 테스트
│   │
│   ├── stores/               # Zustand 상태 관리
│   │   └── gameStore.ts                # 게임 전역 상태
│   │
│   ├── hooks/                # 커스텀 훅
│   │   ├── useGameHandlers.ts          # 게임 핸들러 (새게임, 턴종료, 휴식)
│   │   └── useGameData.ts              # 게임 데이터 로딩
│   │
│   ├── utils/                # 유틸리티 함수
│   │   ├── timeSystem.ts               # 시간 시스템 헬퍼
│   │   └── saveSystem.ts               # 저장/불러오기
│   │
│   ├── modules/              # 게임 로직 모듈
│   │   ├── training/                   # 조교 시스템
│   │   │   ├── TrainingModule.ts
│   │   │   ├── TrainingRuntime.ts
│   │   │   ├── commands/               # 93개 커맨드
│   │   │   └── events/                 # 이벤트
│   │   ├── brothel/                    # 창관 시스템
│   │   ├── filming/                    # AV 촬영 시스템
│   │   └── system/                     # 시스템 모듈
│   │
│   ├── data/                 # 게임 데이터
│   │   ├── json/                       # JSON 데이터
│   │   │   ├── characters.json
│   │   │   ├── abilities.json
│   │   │   ├── talents.json
│   │   │   └── parameters.json
│   │   └── loaderJSON.ts               # 데이터 로더
│   │
│   └── types/                # TypeScript 타입 정의
│       └── game.ts
│
├── docs/                     # 문서
│   ├── ARCHITECTURE.md                 # 아키텍처 문서 (이 파일)
│   └── BACKEND_SYSTEMS.md              # 백엔드 시스템 현황
│
└── public/                   # 정적 파일
```

## 핵심 시스템

### 1. 상태 관리 (Zustand)

**파일**: `src/stores/gameStore.ts`

게임의 모든 상태를 중앙에서 관리합니다.

**주요 상태**:
```typescript
interface GameStore {
  // 기본 상태
  day: number;              // 현재 날짜
  time: TimeOfDay;          // 시간 (0: 오전, 1: 오후)
  money: number;            // 소지금
  playerName: string;       // 플레이어 이름

  // 캐릭터
  availableCharacters: Character[];  // 구매 가능한 캐릭터 풀
  ownedCharacters: Character[];      // 소유한 캐릭터
  currentCharacter: number | null;   // 현재 선택된 캐릭터

  // 플래그 & 아이템
  flags: Record<number, number>;     // 게임 플래그
  items: Record<number, number>;     // 아이템

  // 메타데이터
  playTime: number;         // 플레이 시간
  saveCount: number;        // 저장 횟수
  dayReached: number;       // 최대 도달 일수
  achievements: number[];   // 달성 업적
  clearedEndings: number[]; // 클리어한 엔딩
}
```

**주요 액션**:
- `resetGame()`: 게임 초기화
- `advanceTime()`: 시간 진행 (오전→오후→다음날)
- `endTurn()`: 턴 종료 처리 (TURNEND)
- `addCharacter()`: 캐릭터 추가 (ADDCHARA)
- `addMoney()`: 소지금 증감
- `nextDay()`: 다음날로 이동

### 2. 시간 시스템 (TIME)

**파일**: `src/utils/timeSystem.ts`

**시간 진행 흐름**:
```
오전 (time=0) → 오후 (time=1) → 다음날 오전 (time=0, day+1)
```

**헬퍼 함수**:
- `getTimeName(time)`: 시간대 이름 반환 ("오전", "오후")
- `getNextTimeName(time)`: 다음 시간대 이름
- `getTimeAdvanceMessage(time)`: 시간 진행 확인 메시지
- `getNewDayMessage(day)`: 새 날 시작 메시지

### 3. 게임 핸들러 (Hooks)

**파일**: `src/hooks/useGameHandlers.ts`

게임의 주요 액션을 캡슐화한 커스텀 훅입니다.

**제공 함수**:
- `handleNewGame()`: 새 게임 시작
- `handleEndTurn()`: 턴 종료
- `handleRest()`: 휴식 (다음날 이동)

**사용 예시**:
```typescript
const { handleNewGame, handleEndTurn, handleRest } = useGameHandlers();

// 새 게임 버튼
<button onClick={() => {
  if (handleNewGame()) {
    setCurrentScene('main');
  }
}}>새로 시작</button>
```

### 4. 데이터 로딩 (Hooks)

**파일**: `src/hooks/useGameData.ts`

게임 시작 시 필요한 데이터를 자동으로 로드합니다.

**로드 데이터**:
- `characters.json`: 전체 캐릭터 풀 (107명)

**사용 예시**:
```typescript
function GameLayout() {
  useGameData(); // 컴포넌트 마운트 시 자동 로드
  // ...
}
```

### 5. 컴포넌트 구조

#### GameLayout (메인 레이아웃)
**역할**:
- 화면 라우팅 (SceneType 기반)
- 헤더 표시 (날짜, 시간, 소지금)
- 정보 패널, 메인 컨텐츠, 메뉴 패널 배치

**화면 타입** (`SceneType`):
```typescript
type SceneType =
  | 'title'           // 타이틀 화면
  | 'main'            // 메인 메뉴
  | 'character-select'// 캐릭터 선택
  | 'training'        // 조교
  | 'brothel'         // 창관
  | 'filming'         // AV 촬영
  | 'visit'           // 방문
  | 'shop'            // 상점
  | 'slave-market'    // 배우 모집
  | 'info'            // 정보
  | 'save'            // 저장/불러오기
  | 'command-test';   // 커맨드 테스트
```

#### MainMenu
**역할**:
- 메인 메뉴 버튼 표시
- 턴 종료, 휴식 버튼

#### TrainingCommandMenu
**역할**:
- 조교 커맨드 목록 표시
- 커맨드 가용성 체크 (0.5초마다)
- 커맨드 실행
- 돌아가기 버튼

#### SlaveMarketScreen (배우 모집)
**특징**:
- 페이지네이션 (60명/페이지)
- 캐릭터 카드 확장 (클릭 시 능력치/소질 표시)
- 실시간 가격 표시 (price[1001])
- 계약 한도 체크 (FLAG:23, 기본 10명)
- ADDCHARA 함수 사용

**주요 기능**:
```typescript
handlePurchase(char) {
  // 1. 계약 한도 체크
  if (ownedCharacters.length >= maxCharacters) { ... }

  // 2. 가격 확인
  const price = charData?.price?.[1001] || 50000;

  // 3. 소지금 확인
  if (money < price) { ... }

  // 4. 구매
  addMoney(-price);
  addCharacter(char);
}
```

## 데이터 흐름

### 1. 게임 시작 흐름
```
GameLayout 마운트
  → useGameData() 실행
  → characters.json 로드
  → gameStore.loadAvailableCharacters() 호출
  → 상태 업데이트
```

### 2. 턴 종료 흐름
```
사용자 "턴 종료" 클릭
  → handleEndTurn() 호출
  → confirm 다이얼로그 표시
  → 승인 시 gameStore.advanceTime() 호출
  → time === 0이면 time = 1 (오전→오후)
  → time === 1이면 gameStore.endTurn() 호출
    → day + 1
    → time = 0
    → TURNEND 로직 실행 (TODO)
    → 알림 표시
```

### 3. 캐릭터 구매 흐름
```
사용자 "계약" 버튼 클릭
  → handlePurchase() 호출
  → 유효성 체크 (한도, 가격, 중복)
  → confirm 다이얼로그
  → 승인 시:
    → gameStore.addMoney(-price)
    → gameStore.addCharacter(char)
      → ownedCharacters에 추가
      → characters에도 추가 (GameState 호환)
  → 알림 표시
```

## ERB → TypeScript 변환 패턴

### 변수 매핑

| ERB 변수 | TypeScript | 설명 |
|----------|-----------|------|
| `DAY` | `gameStore.day` | 날짜 |
| `TIME` | `gameStore.time` | 시간 (0: 오전, 1: 오후) |
| `MONEY` | `gameStore.money` | 소지금 |
| `FLAG:n` | `gameStore.flags[n]` | 플래그 |
| `ITEM:n` | `gameStore.items[n]` | 아이템 |
| `CHARANUM` | `gameStore.ownedCharacters.length` | 소유 캐릭터 수 |

### 함수 매핑

| ERB 함수 | TypeScript | 설명 |
|----------|-----------|------|
| `ADDCHARA n` | `gameStore.addCharacter(char)` | 캐릭터 추가 |
| `NEXTDAY` | `gameStore.nextDay()` | 다음날 |
| `TURNEND` | `gameStore.endTurn()` | 턴 종료 |
| `SIF(cond, a, b)` | `cond ? a : b` | 삼항 연산자 |
| `SETCOLOR` | CSS 클래스 | 색상 설정 |

## 주요 개선사항

### 1. 모듈화
- ✅ 컴포넌트 분리 (TrainingCommandMenu 독립)
- ✅ 로직 분리 (useGameHandlers, useGameData)
- ✅ 유틸리티 분리 (timeSystem)

### 2. 타입 안정성
- ✅ TimeOfDay 타입 정의 (0 | 1)
- ✅ SceneType 타입 정의
- ✅ GameStore 인터페이스 정의

### 3. 재사용성
- ✅ 커스텀 훅으로 로직 캡슐화
- ✅ 유틸리티 함수로 공통 기능 추출
- ✅ 컴포넌트 간 props 인터페이스 명확화

### 4. 유지보수성
- ✅ 단일 책임 원칙 (각 파일이 하나의 역할)
- ✅ 의존성 명확화 (import 구조)
- ✅ 주석과 문서화

## 다음 단계

### Phase 1: 백엔드 시스템 완성
- [ ] TURNEND 로직 구현 (판매가능, 임신, 위험일 등)
- [ ] CSV 데이터 로딩 (abilities, talents, parameters)
- [ ] 캐릭터 상태 관리 시스템

### Phase 2: 조교 시스템 완성
- [ ] 93개 커맨드 상세 로직
- [ ] 메시지 렌더링 완성
- [ ] 파라미터 계산 정확도 향상

### Phase 3: 기타 시스템
- [ ] 창관 시스템
- [ ] AV 촬영 시스템
- [ ] 저장/불러오기 완성

## 참고 문서

- [BACKEND_SYSTEMS.md](./BACKEND_SYSTEMS.md) - 백엔드 시스템 현황
- [../CLAUDE.md](../CLAUDE.md) - 프로젝트 개요 및 ERB 구조
