# erAV_Ho Web Port

erAV_Ho v0.022의 웹 기반 이식 프로젝트입니다. 원본 erabasic 게임을 TypeScript + React로 재구현합니다.

## 🎯 프로젝트 목표

- 기존 Era 기반 게임을 모던한 웹 UI로 이식
- TypeScript 타입 안전성으로 버그 최소화
- Electron 데스크톱 앱 + 웹 브라우저 멀티 플랫폼
- UI/UX 개선 및 확장 가능한 아키텍처

## 🚀 빠른 시작

```bash
# 의존성 설치
npm install

# 웹 개발 서버 실행 (http://localhost:5173)
npm run dev

# Electron 데스크톱 앱 실행
npm run dev:electron

# 프로덕션 빌드
npm run build
```

## 📦 기술 스택

- **Frontend**: React 18, TypeScript 5, Vite
- **Desktop**: Electron 28
- **상태 관리**: Zustand
- **스타일링**: CSS Modules
- **빌드**: Vite + electron-builder

## 📁 프로젝트 구조

```
web-port/
├── data/                   # CSV → TypeScript 상수
│   ├── abilities.ts        # ABL (34개)
│   ├── parameters.ts       # PALAM (17개)
│   └── talents.ts          # TALENT (261개)
│
├── src/
│   ├── components/         # React 컴포넌트
│   ├── modules/            # 게임 기능 모듈
│   │   ├── training/       # 조교 시스템 (핵심)
│   │   ├── events/         # 이벤트 시스템
│   │   └── ...
│   ├── stores/             # Zustand 상태 관리
│   ├── types/              # TypeScript 타입
│   └── data/               # 런타임 JSON 데이터
│
├── scripts/                # 개발 도구
│   └── extractAllCSV.js    # CSV 파싱
│
└── docs/                   # 문서
    ├── ARCHITECTURE.md     # 프로젝트 구조
    ├── DEVELOPMENT.md      # 개발 가이드
    ├── GAME_SYSTEMS.md     # 게임 시스템
    └── REFERENCE.md        # ERB 참고 자료
```

## 📊 구현 상태

### ✅ Phase 0: 기반 구축 (완료)
- [x] Electron 데스크톱 앱 기본 구조
- [x] React + TypeScript + Vite 개발 환경
- [x] Zustand 상태 관리

### ✅ Phase 1: 데이터 로딩 (완료)
- [x] CSV 파일 파싱 시스템
- [x] TypeScript 상수 생성 (data/*.ts)
- [x] 캐릭터 데이터 로드 (155개)
- [x] 게임 상수 정의 (ABL, PALAM, TALENT)

### 🚧 Phase 2: 조교 시스템 (진행 중)
- [x] 조교 커맨드 기본 구조
- [x] improved/ 폴더: 94개 커맨드 (프로덕션)
- [x] SafeContext 타입 안전 래퍼
- [x] COMF0-5: SafeContext 적용 완료 (6개)
- [ ] COMF6-92: SafeContext 적용 예정 (87개)
- [x] 메시지 생성 시스템 (MessageGenerator 리팩터링 완료)
- [x] SOURCE → PALAM 변환
- [x] 절정 체크 시스템

### ✅ Phase 3: 저장 시스템 (완료)
- [x] 자동 저장 (턴 종료 시)
- [x] 수동 저장 (10개 슬롯)
- [x] Electron/Browser 환경 대응

### ⬜ Phase 4: 기타 시스템 (예정)
- [ ] 이벤트 시스템 (events/)
- [ ] 매춘 시스템 (brothel/)
- [ ] 미션 시스템 (missions/)
- [ ] AV 촬영 시스템

## 🔧 개발 도구

### CSV 데이터 재생성
원본 게임의 CSV가 변경되었을 때:

```bash
cd scripts
node extractAllCSV.js
```

### 타입 체크
```bash
npx tsc --noEmit
```

### Electron 빌드
```bash
npm run build:electron
```

## 📚 문서

- **[ARCHITECTURE.md](docs/ARCHITECTURE.md)** - 프로젝트 구조 및 설계 원칙
- **[DEVELOPMENT.md](docs/DEVELOPMENT.md)** - 개발 가이드 및 ERB 변환
- **[GAME_SYSTEMS.md](docs/GAME_SYSTEMS.md)** - 조교/저장/캐릭터 시스템
- **[REFERENCE.md](docs/REFERENCE.md)** - ERB 참고 자료 및 상수 매핑

## 🎮 조교 시스템 하이라이트

### SafeContext (타입 안전 래퍼)

**Before (직접 인덱스 접근)**:
```typescript
ctx.source[0] += 100;      // 0이 무엇인지 불명확
ctx.params[5] += 50;       // 5가 무엇인지 불명확
```

**After (SafeContext)**:
```typescript
safe.addSource('쾌C', 100);   // 명확한 이름
safe.addPalam('욕정', 50);    // 타입 안전
```

### MessageGenerator 리팩터링
- 코드 중복 87.5% 감소 (40% → 5%)
- 평균 함수 길이 67% 감소 (55줄 → 18줄)
- GameState 스냅샷 패턴으로 상태 관리 일원화

## 🏗️ 아키텍처 특징

### 이중 커맨드 시스템
```
src/modules/training/commands/
├── improved/  (프로덕션, 94개)   ← 현재 사용 중
└── commands/  (개발 중, 117개)   ← SafeContext 마이그레이션
```

### 데이터 계층 분리
```
data/*.ts          → 빌드 타임 상수 (import)
src/data/json/*.json → 런타임 데이터 (동적 로드)
```

### 단일 진실 공급원
- `data/*.ts`: CSV 파싱 결과가 유일한 상수 출처
- 중복 정의 금지, 타입 안전성 보장

## 🤝 기여 가이드

1. 이슈 또는 기능 제안 생성
2. 새 브랜치 생성 (`feature/기능명`)
3. 변경사항 커밋
4. Pull Request 생성

## 📝 라이선스

원본 erAV_Ho 게임의 라이선스를 따릅니다.

## 🔗 관련 링크

- 원본 게임: erAV_Ho v0.022
- 엔진: Emuera (erabasic 인터프리터)

---

**개발 중인 프로젝트입니다.** 많은 기능이 아직 구현되지 않았습니다.
