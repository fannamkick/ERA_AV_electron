# 개발 가이드

erAV_Ho 웹 포트 프로젝트 개발 현황 및 가이드입니다.

## 📊 현재 구현 상태

### Phase 0: 기반 구축 ✅
- [x] Electron 데스크톱 애플리케이션 기본 구조
- [x] React + TypeScript + Vite 개발 환경
- [x] Zustand 상태 관리

### Phase 1: 데이터 로딩 ✅
- [x] CSV 파일 파싱 (`scripts/extractAllCSV.js`)
- [x] TypeScript 상수 생성 (`data/*.ts`)
- [x] 캐릭터 데이터 로드 (155개 캐릭터)
- [x] 게임 상수 (ABL 34개, PALAM 17개, TALENT 261개)

### Phase 2: 조교 시스템 🚧
- [x] 조교 커맨드 기본 구조
- [x] improved/ 폴더: 94개 커맨드 (프로덕션)
- [x] SafeContext 타입 안전 래퍼
- [x] COMF0-5: SafeContext 적용 완료 (6개)
- [ ] COMF6-92: SafeContext 적용 예정 (87개)
- [x] 메시지 생성 시스템
- [x] SOURCE → PALAM 변환
- [x] 절정 체크 시스템

### Phase 3: 저장 시스템 ✅
- [x] 자동 저장 (턴 종료 시)
- [x] 수동 저장 (10개 슬롯)
- [x] Electron/Browser 환경 대응

---

## 🏗️ 프로젝트 구조

### 핵심 디렉토리
```
web-port/
├── data/                    # CSV 파싱 결과 (TypeScript 상수)
│   ├── abilities.ts         # ABL 상수
│   ├── parameters.ts        # PALAM 상수
│   ├── talents.ts           # TALENT 상수
│   └── ...
│
├── src/
│   ├── modules/training/
│   │   └── commands/
│   │       ├── improved/    # ✅ 프로덕션 (94개)
│   │       │   └── Com0-92.ts
│   │       └── commands/    # 🚧 개발 중 (117개)
│   │           └── COMF0-152.ts (SafeContext 기반)
│   │
│   ├── stores/              # Zustand 상태 관리
│   │   └── gameStore.ts
│   │
│   └── types/               # TypeScript 타입 정의
│       ├── character.ts
│       ├── training.ts
│       └── master.ts
│
├── scripts/                 # 개발 도구
│   └── extractAllCSV.js     # CSV → TypeScript 변환
│
└── tools/                   # 분석 도구 (Python)
    ├── analyze_erb.py
    └── convert_erb_to_ts.py
```

---

## 🔧 개발 워크플로우

### 1. CSV 데이터 업데이트
원본 게임의 CSV가 변경되었을 때:

```bash
cd web-port/scripts
node extractAllCSV.js
```

출력: `web-port/data/*.ts` 파일 재생성

### 2. 조교 커맨드 개발

#### Option A: improved/ 폴더 (기존 방식)
```typescript
// improved/Com0Command.ts
export const com0 = (ctx: TrainingContext) => {
  ctx.source[0] += 100;  // 직접 인덱스 접근
  ctx.params[5] += 50;   // 욕정 증가
};
```

#### Option B: commands/ 폴더 (SafeContext 방식)
```typescript
// commands/COMF0_caress.ts
export class COMF0_caress extends BaseCommand {
  execute(safe: SafeContext) {
    safe.addSource('쾌C', 100);     // 타입 안전
    safe.addPalam('욕정', 50);      // 명명된 상수
  }
}
```

**현재 상태**:
- `improved/`: ImprovedTrainingModule에서 사용 중 (프로덕션)
- `commands/`: 미연결 (개발 중, COMF0-5만 완료)

---

## 📝 ERB → TypeScript 변환

### 변환 과정
```
원본 ERB 파일 (erabasic)
  ↓
[tools/convert_erb_to_ts.py] (자동 변환, 참고용)
  ↓
generated/ 폴더 (로직 이해용)
  ↓
[수동 리팩터링]
  ↓
improved/ 폴더 (실제 게임 로직)
```

### 변환 규칙
| ERB | TypeScript |
|-----|------------|
| `ABL:0` | `safe.getAbility('욕망')` |
| `PALAM:5` | `safe.getPalam('욕정')` |
| `TALENT:153` | `safe.hasTalent('임신')` |
| `SOURCE:0` | `safe.addSource('쾌C', value)` |
| `IF TALENT:0` | `if (safe.hasTalent('처녀'))` |
| `PRINTFORML` | `messages.push(...)` |

### 주의사항
⚠️ **자동 변환 코드는 참고용입니다**
- `generated/` 폴더: 로직 이해에 도움
- 실제 게임: `improved/` 폴더에서 수동 구현
- TypeScript 타입 시스템 + 현대적 패턴 적용 필요

---

## 🎯 SafeContext 마이그레이션

### 현재 진행 상황
```
COMF0-5:   ✅ 완료 (6개)
COMF6-92:  ⬜ 예정 (87개)
COMF93+:   ⬜ 예정 (24개)
```

### SafeContext 장점
1. **타입 안전성**: `'욕정'` 오타 시 컴파일 에러
2. **가독성**: `PALAM:5` → `'욕정'`
3. **유지보수**: 인덱스 변경 시 자동 반영

### 마이그레이션 예시
```typescript
// Before (improved/)
ctx.source[0] += cData.c;
ctx.params[5] += lustValue;
if (ctx.talents[153]) { ... }

// After (commands/ SafeContext)
safe.addSource('쾌C', cData.c);
safe.addPalam('욕정', lustValue);
if (safe.hasTalent('임신')) { ... }
```

---

## 🚀 다음 단계

### 우선순위 1: 조교 커맨드 완성
1. COMF6-19 구현 (14개 커맨드)
2. COMF20-29 구현 (10개 커맨드)
3. SafeContext 적용 확대

### 우선순위 2: 게임 시스템
1. 이벤트 시스템 (events/)
2. 매춘 시스템 (brothel/)
3. 미션 시스템 (missions/)

### 우선순위 3: UI/UX
1. 조교 화면 개선
2. 캐릭터 정보 화면
3. 저장/로드 UI

---

## 🛠️ 개발 명령어

```bash
# 개발 서버 (웹)
npm run dev

# 개발 서버 (Electron)
npm run dev:electron

# 빌드
npm run build

# 타입 체크
npx tsc --noEmit

# CSV 데이터 재생성
node scripts/extractAllCSV.js
```

---

## 📚 관련 문서
- [프로젝트 구조](./ARCHITECTURE.md)
- [게임 시스템](./GAME_SYSTEMS.md)
- [ERB 참고 자료](./REFERENCE.md)
