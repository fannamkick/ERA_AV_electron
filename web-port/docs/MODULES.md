# erAV_Ho 웹 포트 - 모듈별 설계서

> 원본 ERB 게임 플로우 분석을 기반으로 각 메뉴를 독립 모듈로 설계

---

## 전체 게임 구조

```
GameEngine (코어)
    ├─ TimeSystem (시간/턴 관리)
    ├─ MenuRouter (메뉴 라우팅)
    │
    └─ Modules (독립 모듈들)
        ├─ 1. TrainingModule (조교)
        ├─ 2. BrothelModule (창관)
        ├─ 3. FilmingModule (AV촬영)
        ├─ 4. ShopModule (상점)
        ├─ 5. VisitModule (방문)
        ├─ 6. GrowthModule (능력성장)
        ├─ 7. EventModule (이벤트)
        └─ 8. SaveLoadModule (저장/로드)
```

---

## 모듈 1: 조교 시스템 (TrainingModule)

### 📋 메뉴 경로
```
메인 메뉴 [100] 지도한다
    ↓
@CHANGE_TARGET (캐릭터 선택)
    ↓
@SELECT_ASSI (조수 선택)
    ↓
BEGIN TRAIN (조교 루프)
    ↓
BEGIN AFTERTRAIN (조교 종료)
    ↓
BEGIN TURNEND
```

### 🎯 핵심 기능
1. **조교 대상 선택**: 보유 캐릭터 중 선택
2. **조수 선택**: 조수 가능 캐릭터 선택 (CFLAG:1 == 2)
3. **커맨드 실행**: 152개 COMF 커맨드
4. **파라미터 계산**: SOURCE → PALAM 변환
5. **구슬 획득**: PALAM → JUEL 변환
6. **조교 종료**: 결과 표시, 판매/조수화 판정

### 📁 파일 구조
```
src/modules/training/
├─ index.ts                     # 모듈 엔트리
├─ TrainingModule.ts            # 메인 로직
├─ types.ts                     # 타입 정의
│
├─ stores/
│   └─ trainingStore.ts         # Zustand 상태관리
│
├─ commands/                    # 커맨드 시스템
│   ├─ index.ts                 # 커맨드 레지스트리
│   ├─ types.ts                 # 커맨드 타입
│   ├─ availability.ts          # COMABLE 로직
│   ├─ calculator.ts            # SOURCE 계산
│   └─ commands/                # 개별 커맨드
│       ├─ COMF0_caress.ts
│       ├─ COMF1_cunnilingus.ts
│       ├─ COMF3_talk.ts
│       └─ ... (152개)
│
├─ components/                  # UI 컴포넌트
│   ├─ TrainingScreen.tsx       # 메인 화면
│   ├─ CharacterSelector.tsx    # 대상 선택
│   ├─ AssistantSelector.tsx    # 조수 선택
│   ├─ CommandList.tsx          # 커맨드 목록
│   ├─ StatusDisplay.tsx        # 상태 표시
│   ├─ ParameterBar.tsx         # PALAM 바
│   └─ ResultScreen.tsx         # 결과 화면
│
└─ utils/
    ├─ juelCalculator.ts        # 구슬 계산
    ├─ messageGenerator.ts      # 메시지 생성
    └─ conditions.ts            # 조건 판정
```

### 🔗 의존성
- **gameStore**: day, money, currentCharacter
- **characterStore**: ownedCharacters, abilities, parameters
- **GrowthModule**: ABLUP 호출
- **EventModule**: 조교 전/후 이벤트

### 📊 상태 관리 (trainingStore)
```typescript
interface TrainingState {
  // 조교 중 상태
  target: number | null;          // 조교 대상
  assistant: number | null;       // 조수
  isTraining: boolean;

  // 파라미터 (PALAM)
  parameters: {
    쾌C: number;
    쾌V: number;
    쾌A: number;
    쾌B: number;
    윤활: number;
    굴종: number;
    욕정: number;
    굴복: number;
    습득: number;
    수치심: number;
    고통: number;
    공포: number;
    반감: number;
    불쾌: number;
    억울: number;
  };

  // 임시 플래그 (TFLAG)
  flags: Record<number, number>;

  // 액션
  startTraining: (targetId: number, assistantId?: number) => void;
  executeCommand: (commandId: number) => Promise<CommandResult>;
  endTraining: () => TrainingResult;
  updateParameter: (key: string, value: number) => void;
}
```

### 🎮 구현 우선순위

**Phase 1 (MVP)**: 기본 조교 시스템
- [ ] 캐릭터/조수 선택 UI
- [ ] 10개 기본 커맨드 (0, 1, 3, 10, 11, 30, 40, 50, 60, 70)
- [ ] PALAM 계산 및 표시
- [ ] 기본 구슬 획득

**Phase 2**: 커맨드 확장
- [ ] 50개 추가 커맨드
- [ ] COMABLE 가용성 판정
- [ ] 메시지 시스템

**Phase 3**: 완성
- [ ] 전체 152개 커맨드
- [ ] 특수 상황 처리 (사정, 절정, 실신)
- [ ] 판매/조수화 판정

---

## 모듈 2: 창관 시스템 (BrothelModule)

### 📋 메뉴 경로
```
메인 메뉴 [103] 창관 영업
    ↓
@YUUKAKU_TOP (창관 메뉴)
    ├─ [0] 은퇴시킨다 (판매)
    ├─ [1] 성 접대 (WORK_RECEPTION)
    ├─ [2] 통상 영업 변경 (WORK_NORMAL)
    ├─ [3] 특수 영업 (WORK_SPECIAL)
    └─ [4] 시설 확장
```

### 🎯 핵심 기능
1. **영업 할당**: 캐릭터별로 영업 타입 지정
2. **영업 실행**: TIME=1(후반)에 자동 실행
3. **결과 계산**: 만족도, 수익, 경험치
4. **부정의 구슬**: 부정적 파라미터 누적

### 📁 파일 구조
```
src/modules/brothel/
├─ index.ts
├─ BrothelModule.ts
├─ types.ts
│
├─ stores/
│   └─ brothelStore.ts
│
├─ workers/                     # 영업 타입별 로직
│   ├─ index.ts
│   ├─ types.ts
│   ├─ normal/                  # 통상 영업
│   │   ├─ conversation.ts      # 회화영업 (WORK_1ST)
│   │   ├─ service.ts           # 봉사영업 (WORK_2ND)
│   │   ├─ anal.ts              # A영업 (WORK_3RD)
│   │   ├─ vagina.ts            # V영업 (WORK_4TH)
│   │   ├─ sm.ts                # SM영업 (WORK_5TH)
│   │   └─ outcall.ts           # 출장영업 (WORK_6TH)
│   │
│   ├─ reception.ts             # 성 접대
│   │
│   └─ special/                 # 특수 영업
│       ├─ concert.ts           # 콘서트
│       ├─ kbplay.ts            # KAB 플레이
│       ├─ lunchstall.ts        # 점심 노점상
│       ├─ sexorgy.ts           # 섹스 난교
│       ├─ strip.ts             # 스트립쇼
│       └─ auction.ts           # 경매
│
├─ components/
│   ├─ BrothelScreen.tsx
│   ├─ WorkAssignment.tsx       # 영업 할당
│   ├─ WorkTypeSelector.tsx     # 영업 선택
│   ├─ ResultDisplay.tsx        # 결과 표시
│   └─ FacilityUpgrade.tsx      # 시설 확장
│
└─ utils/
    ├─ satisfactionCalc.ts      # 만족도 계산
    ├─ moneyCalc.ts             # 수익 계산
    └─ customerCalc.ts          # 고객 수 계산
```

### 🔗 의존성
- **gameStore**: money, time
- **characterStore**: abilities, parameters
- **EventModule**: YUUKAKU_RESULT 이벤트

### 📊 상태 관리 (brothelStore)
```typescript
interface BrothelState {
  // 캐릭터별 영업 할당
  assignments: Record<number, {
    workType: WorkType;         // 1~6 (통상) | 'reception' | 'special_*'
    isActive: boolean;
  }>;

  // 시설 레벨
  facilities: {
    concert: number;
    kbplay: number;
    // ... 기타
  };

  // 액션
  assignWork: (charId: number, workType: WorkType) => void;
  executeWork: () => Promise<WorkResult[]>;
  upgradeFacility: (type: string) => boolean;
}

type WorkType =
  | 'conversation'    // 회화영업
  | 'service'         // 봉사영업
  | 'anal'            // A영업
  | 'vagina'          // V영업
  | 'sm'              // SM영업
  | 'outcall'         // 출장영업
  | 'reception'       // 성 접대
  | 'concert'         // 콘서트
  | 'kbplay'          // KAB
  // ... 기타
```

### 🎮 구현 우선순위

**Phase 1**: 기본 영업
- [ ] 영업 할당 UI
- [ ] 회화영업, 봉사영업, V영업 (3종)
- [ ] 기본 수익 계산

**Phase 2**: 확장
- [ ] 전체 6종 통상 영업
- [ ] 성 접대 시스템
- [ ] 부정의 구슬 계산

**Phase 3**: 특수 영업
- [ ] 7종 특수 영업
- [ ] 시설 확장 시스템

---

## 모듈 3: AV 촬영 시스템 (FilmingModule)

### 📋 메뉴 경로
```
메인 메뉴 [104] AV촬영
    ↓
@SHOP_AV (AV 촬영 메뉴)
    ↓
장면 선택 (SCENE01~10)
    ↓
포인트 소비 및 성공 판정
    ↓
수익 계산 및 결과
```

### 🎯 핵심 기능
1. **장면 선택**: 6가지 촬영 장면
2. **포인트 소비**: 각 장면별 필요 포인트
3. **성공 판정**: 능력치 기반 판정
4. **수익 계산**: AV_POINTCALC

### 📁 파일 구조
```
src/modules/filming/
├─ index.ts
├─ FilmingModule.ts
├─ types.ts
│
├─ stores/
│   └─ filmingStore.ts
│
├─ scenes/                      # 촬영 장면
│   ├─ index.ts
│   ├─ types.ts
│   ├─ SCENE01_interview.ts     # 인터뷰
│   ├─ SCENE02_masturbation.ts  # 자위
│   ├─ SCENE03_fellatio.ts      # 펠라치오
│   ├─ SCENE04_hardsex.ts       # 거친 성교
│   ├─ SCENE05_hardanal.ts      # 거친 애널
│   └─ SCENE10_sm.ts            # SM 플레이
│
├─ components/
│   ├─ FilmingScreen.tsx
│   ├─ SceneSelector.tsx
│   ├─ ActressSelector.tsx
│   ├─ PointDisplay.tsx
│   └─ ResultScreen.tsx
│
└─ utils/
    ├─ pointCalculator.ts       # 포인트 계산
    ├─ trendSystem.ts           # 유행 시스템
    └─ judgeSuccess.ts          # 성공 판정
```

### 🔗 의존성
- **gameStore**: money
- **characterStore**: abilities

### 📊 상태 관리 (filmingStore)
```typescript
interface FilmingState {
  currentActress: number | null;
  currentScene: SceneType | null;
  availablePoints: number;
  trend: SceneType | null;        // 이달의 유행

  // 액션
  selectScene: (sceneId: SceneType) => void;
  shoot: () => Promise<FilmingResult>;
  calculateRevenue: (result: FilmingResult) => number;
}

type SceneType =
  | 'interview'
  | 'masturbation'
  | 'fellatio'
  | 'hardsex'
  | 'hardanal'
  | 'sm'
```

### 🎮 구현 우선순위

**Phase 1**: 기본 촬영
- [ ] 3개 장면 (인터뷰, 자위, 펠라치오)
- [ ] 포인트 소비 시스템
- [ ] 기본 수익 계산

**Phase 2**: 확장
- [ ] 전체 6개 장면
- [ ] 유행 시스템
- [ ] 소질별 배수 적용

---

## 모듈 4: 상점 시스템 (ShopModule)

### 📋 메뉴 경로
```
메인 메뉴 [101] 인재 확보 → 노예 시장
메인 메뉴 [102] 자재 조달 → 아이템 상점
```

### 📁 파일 구조
```
src/modules/shop/
├─ index.ts
├─ ShopModule.ts
├─ types.ts
│
├─ stores/
│   └─ shopStore.ts
│
├─ slaves/
│   ├─ SlaveMarket.ts
│   └─ priceCalculator.ts
│
├─ items/
│   ├─ ItemShop.ts
│   ├─ categories.ts
│   └─ itemData.ts
│
└─ components/
    ├─ SlaveMarketScreen.tsx
    ├─ ItemShopScreen.tsx
    └─ PurchaseConfirm.tsx
```

### 🎮 구현 우선순위

**Phase 1**: 기본 상점
- [x] 노예 시장 (완료)
- [x] 아이템 상점 (완료)

---

## 모듈 5: 방문 시스템 (VisitModule)

### 📋 메뉴 경로
```
메인 메뉴 [109] 방문
    ↓
NPC 선택
    ↓
NPC별 미션/의뢰
```

### 📁 파일 구조
```
src/modules/visit/
├─ index.ts
├─ VisitModule.ts
├─ types.ts
│
├─ stores/
│   └─ visitStore.ts
│
├─ npcs/                        # NPC별 미션
│   ├─ index.ts
│   ├─ ayano.ts                 # 아야노 의뢰
│   ├─ ellen.ts                 # 엘렌 미션
│   ├─ eunice.ts                # 유니스 연구실
│   ├─ ikumi.ts                 # 이쿠미 연구실
│   ├─ kanon.ts                 # 카논 의뢰
│   ├─ miyako.ts                # 미야코 연구실
│   ├─ rachel.ts                # 레이첼 연구실
│   └─ sakura.ts                # 사쿠라 아지토
│
└─ components/
    ├─ VisitScreen.tsx
    ├─ NPCList.tsx
    └─ MissionDisplay.tsx
```

### 🎮 구현 우선순위

**Phase 1**: 기본 방문
- [x] 방문 UI (완료)
- [ ] 3명 NPC 미션

**Phase 2**: 확장
- [ ] 전체 NPC 미션

---

## 모듈 6: 능력 성장 시스템 (GrowthModule)

### 📋 메뉴 경로
```
메인 메뉴 [112] 능력치업
    ↓
캐릭터 선택
    ↓
능력 선택
    ↓
ABLUP{N} 호출
```

### 📁 파일 구조
```
src/modules/growth/
├─ index.ts
├─ GrowthModule.ts
├─ types.ts
│
├─ stores/
│   └─ growthStore.ts
│
├─ ablup/                       # 능력별 레벨업
│   ├─ index.ts
│   ├─ types.ts
│   ├─ ABLUP0_cSense.ts         # C감각
│   ├─ ABLUP1_vSense.ts         # V감각
│   ├─ ABLUP10_submission.ts    # 굴종
│   ├─ ABLUP11_desire.ts        # 욕정
│   └─ ... (40+ 파일)
│
├─ components/
│   ├─ GrowthScreen.tsx
│   ├─ CharacterSelector.tsx
│   ├─ AbilityList.tsx
│   └─ LevelUpConfirm.tsx
│
└─ utils/
    ├─ requirementCheck.ts      # 필요 조건 체크
    └─ autoGrowth.ts            # 자동 성장
```

### 🔗 의존성
- **characterStore**: abilities, exp, juel
- **TrainingModule**: SOURCE → EXP 변환

### 📊 상태 관리 (growthStore)
```typescript
interface GrowthState {
  // 능력 레벨업 처리
  canLevelUp: (charId: number, abilityId: number) => boolean;
  levelUp: (charId: number, abilityId: number) => boolean;

  // 필요 조건 확인
  getRequirements: (abilityId: number, currentLevel: number) => {
    requiredJuel: number;
    requiredExp: number;
  };
}
```

### 🎮 구현 우선순위

**Phase 1**: 기본 능력
- [ ] 10개 주요 능력 (C감각, V감각, 굴종, 욕정 등)
- [ ] 경험치 시스템
- [ ] 구슬 소비 시스템

**Phase 2**: 확장
- [ ] 전체 40+ 능력
- [ ] 자동 성장 시스템

---

## 모듈 7: 이벤트 시스템 (EventModule)

### 📋 이벤트 타이밍
```
BEGIN TURNEND
    ├─ 조교 직후 이벤트
    │   ├─ 판매/조수화 판정
    │   ├─ 특수 소질 획득
    │   └─ 임신 판정
    │
    └─ TIME=1 (후반) 전용
        ├─ 영업 결과
        ├─ 다음날 이벤트
        │   ├─ 소질 변화
        │   ├─ 임신/출산
        │   ├─ 약물중독
        │   └─ 외모 변화
        │
        └─ 특수 이벤트
            ├─ NTR 이벤트
            ├─ 직업 이벤트
            └─ 엔딩 체크
```

### 📁 파일 구조
```
src/modules/events/
├─ index.ts
├─ EventModule.ts
├─ types.ts
│
├─ stores/
│   └─ eventStore.ts
│
├─ daily/                       # 일일 이벤트
│   ├─ morning.ts
│   ├─ nextDay.ts
│   └─ turnEnd.ts
│
├─ special/                     # 특수 이벤트
│   ├─ pregnancy.ts             # 임신/출산
│   ├─ ntr/                     # NTR 이벤트
│   │   ├─ boyfriend.ts
│   │   ├─ staff.ts
│   │   └─ molester.ts
│   │
│   └─ career/                  # 직업 이벤트
│       ├─ idol.ts
│       ├─ model.ts
│       └─ club.ts
│
├─ components/
│   ├─ EventDisplay.tsx
│   └─ EventLog.tsx
│
└─ utils/
    ├─ eventQueue.ts
    └─ conditionCheck.ts
```

### 🎮 구현 우선순위

**Phase 1**: 턴 종료 이벤트
- [ ] 기본 턴 종료 처리
- [ ] 다음날 이벤트 (소질 변화)

**Phase 2**: 임신 시스템
- [ ] 임신 판정
- [ ] 출산 이벤트

**Phase 3**: 특수 이벤트
- [ ] NTR 이벤트
- [ ] 직업 이벤트

---

## 모듈 8: 저장/로드 시스템 (SaveLoadModule)

### 📁 파일 구조
```
src/modules/saveload/
├─ index.ts
├─ SaveLoadModule.ts
├─ types.ts
│
├─ stores/
│   └─ saveStore.ts
│
├─ components/
│   └─ SaveLoadScreen.tsx       # (이미 구현됨)
│
└─ utils/
    ├─ serializer.ts
    └─ validator.ts
```

### 🎮 구현 우선순위
- [x] 기본 저장/로드 (완료)

---

## 모듈 간 통신 구조

### EventBus 시스템
```typescript
// src/core/EventBus.ts
class EventBus {
  on(event: string, handler: Function): void;
  emit(event: string, data?: any): void;
  off(event: string, handler: Function): void;
}

// 사용 예시
eventBus.on('training:end', (result) => {
  growthModule.processExp(result);
  eventModule.checkSpecialTalent(result);
});

eventBus.on('turnend:start', () => {
  brothelModule.executeWork();
  eventModule.processDailyEvents();
});
```

### 주요 이벤트
```
training:start
training:command
training:end

brothel:assign
brothel:execute
brothel:result

filming:shoot
filming:result

turnend:start
turnend:nextday
turnend:complete

growth:levelup
growth:auto

event:special
event:ending
```

---

## 구현 순서 (전체)

### Week 1: 코어 시스템
- [ ] EventBus 구현
- [ ] TimeSystem 구현 (TIME, DAY 관리)
- [ ] 기본 타입 정의

### Week 2-3: TrainingModule (최우선)
- [ ] Phase 1: 10개 기본 커맨드
- [ ] PALAM 시스템
- [ ] 구슬 획득

### Week 4: GrowthModule
- [ ] 10개 주요 능력 ABLUP
- [ ] 경험치 → 레벨업 흐름

### Week 5: BrothelModule
- [ ] 3종 기본 영업
- [ ] 영업 결과 계산

### Week 6: FilmingModule
- [ ] 3개 장면 구현
- [ ] 포인트 시스템

### Week 7-8: EventModule
- [ ] 턴 종료 이벤트
- [ ] 다음날 이벤트
- [ ] 임신 시스템

### Week 9+: 확장 및 완성도
- [ ] 커맨드 확장 (152개)
- [ ] 영업 확장 (전체)
- [ ] 특수 이벤트
- [ ] UI/UX 개선

---

## 다음 단계

1. **EventBus 구현** - 모듈 간 통신 인프라
2. **TrainingModule Phase 1** - 10개 커맨드로 실제 작동하는 조교
3. **GrowthModule 연동** - 조교 → 경험치 → 레벨업 확인
4. **UI 통합** - 실제 게임 플레이 가능

각 모듈은 완전히 독립적으로 개발 가능하며, EventBus를 통해서만 통신합니다.
