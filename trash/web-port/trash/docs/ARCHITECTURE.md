# 프로젝트 구조

erAV_Ho 웹 포트 프로젝트의 아키텍처 문서입니다.

## 📁 전체 구조

```
프로젝트 루트/
├── original-game/          # 원본 게임 (읽기 전용)
│   ├── CSV/                # 게임 데이터
│   ├── ERB/                # erabasic 스크립트
│   └── Emuera*.exe         # 원본 게임 실행 파일
│
└── web-port/               # 웹 포트 프로젝트 (개발 중)
    ├── data/               # CSV → TypeScript 변환 결과
    ├── src/                # 게임 구현
    ├── scripts/            # 개발 도구
    ├── tools/              # 분석 도구
    └── docs/               # 문서
```

---

## 📊 web-port/ 상세 구조

### 데이터 계층
```
web-port/
├── data/                   # 정적 상수 (빌드 타임)
│   ├── abilities.ts        # ABL 상수 (34개)
│   ├── parameters.ts       # PALAM 상수 (17개)
│   ├── talents.ts          # TALENT 상수 (261개)
│   ├── base.ts             # BASE 상수 (23개)
│   ├── experience.ts       # EXP 상수 (92개)
│   ├── items.ts            # ITEM 상수
│   ├── marks.ts            # MARK 상수 (15개)
│   └── training.ts         # TRAIN 상수
│
└── src/data/               # 런타임 데이터
    ├── json/               # JSON 데이터 파일
    │   ├── abilities.json
    │   ├── characters.json # 155개 캐릭터
    │   └── ...
    └── loaderJSON.ts       # JSON 로더
```

**역할 구분**:
- `data/*.ts`: 컴파일 타임 상수 (import 가능)
- `src/data/json/*.json`: 런타임 동적 로드

### 소스 코드 계층
```
web-port/src/
├── components/             # React 컴포넌트
│   ├── CommandTestScreen.tsx
│   ├── SlaveMarketScreen.tsx
│   └── ...
│
├── modules/                # 게임 기능 모듈
│   ├── training/           # 조교 시스템 ⭐
│   │   ├── commands/
│   │   │   ├── improved/   # ✅ 프로덕션 (94개)
│   │   │   │   └── Com0-92.ts
│   │   │   ├── commands/   # 🚧 개발 중 (117개)
│   │   │   │   └── COMF0-152.ts (SafeContext)
│   │   │   ├── base/       # 베이스 클래스
│   │   │   └── common/     # 공통 유틸
│   │   │
│   │   ├── context/        # SafeContext
│   │   ├── message/        # 메시지 생성
│   │   ├── systems/        # 절정, SOURCE 계산
│   │   └── stores/         # 조교 상태 관리
│   │
│   ├── abilities/          # 능력치 시스템
│   ├── events/             # 이벤트 시스템
│   ├── brothel/            # 매춘 시스템
│   ├── missions/           # 미션 시스템
│   └── ...
│
├── stores/                 # Zustand 전역 상태
│   └── gameStore.ts        # 게임 상태 (돈, 날짜, 캐릭터)
│
├── types/                  # TypeScript 타입
│   ├── character.ts        # Character 인터페이스
│   ├── training.ts         # TrainingContext, SOURCE, PALAM
│   ├── master.ts           # MasterCharacter
│   └── game.ts             # GameState
│
└── utils/                  # 유틸리티
    └── saveSystem.ts       # 저장/로드
```

---

## 🎯 조교 시스템 아키텍처

### 커맨드 구조 (이중 시스템)

```
src/modules/training/commands/
├── improved/ (프로덕션)        ← ImprovedTrainingModule에서 사용
│   ├── Com0Command.ts
│   ├── Com1Command.ts
│   └── ... (94개)
│   특징: 직접 인덱스 접근
│
└── commands/ (개발 중)         ← 미연결
    ├── COMF0_caress.ts      ✅ SafeContext 적용
    ├── COMF1_cunnilingus.ts ✅ SafeContext 적용
    ├── COMF2_analCaress.ts  ✅ SafeContext 적용
    ├── COMF3_masturbation.ts ✅ SafeContext 적용
    ├── COMF4_fellatio2.ts   ✅ SafeContext 적용
    ├── COMF5_breastCaress.ts ✅ SafeContext 적용
    └── COMF6-152.ts         ⬜ 예정 (111개)
    특징: SafeContext 타입 안전
```

### improved/ (프로덕션) 구조
```typescript
// Com0Command.ts
export const com0 = (ctx: TrainingContext) => {
  // 직접 인덱스 접근
  ctx.source[0] += 100;       // SOURCE:0 (쾌C)
  ctx.params[5] += 50;        // PALAM:5 (욕정)
  ctx.abilities[10] += 1;     // ABL:10 (신뢰)

  return messages;
};
```

### commands/ (SafeContext) 구조
```typescript
// COMF0_caress.ts
export class COMF0_caress extends BaseCommand {
  execute(safe: SafeContext): string[] {
    // 명명된 상수 사용
    safe.addSource('쾌C', 100);
    safe.addPalam('욕정', 50);
    safe.addAbility('신뢰', 1);

    return this.generateMessages(safe);
  }
}
```

**SafeContext 장점**:
1. 타입 안전성 (오타 시 컴파일 에러)
2. 가독성 (인덱스 → 이름)
3. 유지보수성 (자동 완성)

---

## 🔄 데이터 흐름

### 게임 시작
```
1. CSV 로드
   original-game/CSV/*.csv
   ↓
2. 상수 변환 (개발 시)
   [scripts/extractAllCSV.js]
   ↓
3. TypeScript 상수
   data/*.ts
   ↓
4. 게임 코드 import
   src/types/training.ts
   ↓
5. 게임 실행
   ImprovedTrainingModule
```

### 조교 실행
```
1. 유저 입력
   커맨드 선택
   ↓
2. 커맨드 실행
   improved/Com0Command.ts
   ↓
3. SOURCE 계산
   ctx.source[0-17] 증가
   ↓
4. 메시지 생성
   MessageGenerator
   ↓
5. SOURCE → PALAM
   systems/SourceCheck.ts
   ↓
6. 상태 저장
   gameStore.updateCharacter()
```

---

## 🗂️ 상태 관리

### Zustand Store
```typescript
// src/stores/gameStore.ts
interface GameStore {
  // 게임 진행
  day: number;
  time: TimeOfDay;
  money: number;

  // 캐릭터
  master: MasterCharacter;
  ownedCharacters: Character[];
  currentCharacterId: number | null;

  // 액션
  nextDay: () => void;
  advanceTime: () => void;
  updateCharacter: (id, updates) => void;
}
```

### 컴포넌트에서 사용
```typescript
import { useGameStore } from '@/stores/gameStore';

function TrainingScreen() {
  const { currentCharacter, money } = useGameStore();

  return <div>소지금: {money}원</div>;
}
```

---

## 🛠️ 개발 도구

### scripts/ (현재 사용)
```
scripts/
├── extractAllCSV.js        # CSV → TS 변환 (핵심)
├── add-comments.js         # 주석 추가
├── fix-command-names.js    # 커맨드명 수정
└── package.json            # encoding-japanese
```

### tools/ (분석용)
```
tools/
├── analyze_erb.py          # ERB 구조 분석
├── convert_erb_to_ts.py    # ERB → TS 변환 (참고용)
├── analyze_characters.py   # 캐릭터 데이터 분석
└── trace_game_tree.py      # 게임 흐름 추적
```

---

## 📦 빌드 출력

```
web-port/
├── dist/               # 웹 빌드 (Vite)
│   ├── index.html
│   └── assets/
│
└── dist-electron/      # Electron 빌드
    └── main.js
```

**빌드 명령어**:
```bash
npm run build           # 전체 빌드
npm run build:web       # 웹만
npm run build:electron  # Electron만
```

---

## 🔧 환경별 설정

### Electron 환경
- **저장 위치**: `%APPDATA%/erAV_Ho/saves/`
- **파일 시스템**: Node.js fs 모듈
- **창 크기**: 1280x720

### Browser 환경
- **저장 위치**: `localStorage`
- **파일 시스템**: 불가 (JSON만)
- **반응형**: CSS media query

---

## 🎨 설계 원칙

### 1. 단일 진실 공급원
- **data/*.ts**: CSV 파싱 결과가 유일한 상수 출처
- 다른 곳에서 중복 정의 금지

### 2. 타입 안전성
- 모든 게임 데이터 TypeScript 타입 정의
- `any` 사용 최소화

### 3. 모듈화
- 기능별 모듈 분리 (training, events, brothel...)
- 순환 의존성 방지

### 4. 상태 불변성
- Zustand store를 통한 중앙화된 상태 관리
- 컴포넌트에서 직접 상태 변경 금지

---

## 📚 관련 문서
- [개발 가이드](./DEVELOPMENT.md)
- [게임 시스템](./GAME_SYSTEMS.md)
- [ERB 참고 자료](./REFERENCE.md)
