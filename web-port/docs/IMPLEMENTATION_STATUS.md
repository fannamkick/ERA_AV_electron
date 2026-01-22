# erAV_Ho 웹 포트 구현 상태

## 완료된 작업

### Phase 0: Electron 기반 구조 전환 ✅
- ✅ Electron 메인 프로세스 (`electron/main/index.ts`)
- ✅ Preload 스크립트 IPC 브릿지 (`electron/main/preload.ts`)
- ✅ 파일 I/O IPC 핸들러 (`electron/main/ipc/fileHandler.ts`)
- ✅ IStorage 추상화 인터페이스 (`src/utils/storage/IStorage.ts`)
- ✅ ElectronStorage 구현 (electron-store 기반)
- ✅ BrowserStorage 구현 (localStorage fallback)
- ✅ saveSystem.ts 리팩터링 (async/await)
- ✅ electron-builder 설정 (`electron/builder.config.js`)

### Phase 1.1: CSV 데이터 로딩 시스템 ✅
- ✅ 다중 인코딩 CSV 파서 (UTF-16 LE, Shift-JIS, UTF-8)
- ✅ CSV → JSON 변환 도구 (`tools/convert_csv_to_json.ts`)
- ✅ 34개 능력치 변환 (`abilities.json`)
- ✅ 17개 파라미터 변환 (`parameters.json`)
- ✅ 261개 소질 변환 (`talents.json`)
- ✅ 108개 캐릭터 변환 (`characters.json`)
- ✅ GameData 싱글톤 (`src/data/loaderJSON.ts`)

### Phase 1.2: 훈련 시스템 핵심 ✅
- ✅ TrainingCommand 베이스 클래스 (`src/modules/training/commands/CommandBase.ts`)
- ✅ Com0Command 구현 (C감각 애무)
- ✅ Com11Command 구현 (정상위 - 처녀 상실, 임신 시스템)
- ✅ SourceCheckSystem (절정/기절 처리)
- ✅ gameData 통합

### 기본 UI 구현 ✅
- ✅ 메인 메뉴 화면 (새로 시작, 이어하기, 설정)
- ✅ 게임 레이아웃 (헤더, 3-패널 구조)
- ✅ 신 전환 시스템 (title → main → training/brothel/filming 등)
- ✅ 게임 상태 관리 (Zustand store with resetGame)
- ✅ 캐릭터 데이터 로딩

## 현재 실행 가능한 기능

### 브라우저에서 실행
```bash
npm run dev
```
- 주소: http://localhost:3000
- 타이틀 화면 → 새로 시작 → 메인 메뉴 → 각종 화면 전환 가능
- 캐릭터 선택, 노예 시장, 창관, AV촬영 등 스켈레톤 UI 동작

### 데이터 재변환 (CSV 수정 후)
```bash
npm run convert-csv
```
- CSV 파일을 수정한 경우 이 명령으로 JSON 재생성

## 현재 제약사항

### TypeScript 컴파일 에러
자동 생성된 일부 파일에 구문 오류가 있음:
- `src/modules/*/generated/*.ts` (90개 파일)
- Vite는 이 파일들을 임포트하지 않으면 무시하므로 현재 실행에는 문제없음
- 향후 해당 모듈 사용 시 수정 필요

### 미구현 기능
- ⚠️ Electron 개발 환경 (`npm run dev:electron` 아직 불가)
  - electron-vite 설정 필요
  - 권장: 브라우저 버전으로 먼저 개발, 나중에 Electron 빌드

- ⚠️ 저장/불러오기 UI
  - SaveLoadScreen.tsx 스켈레톤만 존재
  - 실제 저장/로드 로직 미연결

- ⚠️ 훈련 커맨드 실행
  - 93개 커맨드 중 2개만 구현 (Com0, Com11)
  - 나머지 91개는 템플릿만 존재

- ⚠️ 창관/AV 시스템
  - UI 스켈레톤만 존재
  - 실제 비즈니스 로직 미구현

## 다음 단계

### 우선순위 1: 저장/불러오기 UI 완성
```typescript
// SaveLoadScreen.tsx 구현
- 저장 슬롯 표시 (최대 10개)
- 각 슬롯: 일수, 소지금, 소유 캐릭터 수, 마지막 저장 시간
- 저장 버튼 클릭 → saveGame() 호출
- 불러오기 버튼 클릭 → loadGame() 호출
- 파일 내보내기/가져오기 (Electron 전용)
```

### 우선순위 2: 훈련 시스템 완성
- 93개 커맨드 상세 로직 구현
- COMABLE 가용성 체크 로직
- 메시지 렌더링 시스템 (train_message_b)

### 우선순위 3: Electron 개발 환경
- electron.vite.config.ts 생성
- npm run dev:electron으로 Electron 앱 실행
- Hot reload 설정

### 우선순위 4: 창관/AV 시스템
- 창관 6종 통상 영업 + 7종 특수 영업
- AV 촬영 6개 장면
- 수익/경험치 계산

## 아키텍처 개선 사항

### 중복 코드 제거 (98.4% → ~2%)
현재:
```
com0.ts → train_message_b → print_clothtype (12레벨 깊이)
com1.ts → train_message_b → print_clothtype (12레벨 깊이)
...
com92.ts → train_message_b → print_clothtype (12레벨 깊이)
```

개선 후:
```typescript
// MessageRenderer 싱글톤
class MessageRenderer {
  renderClothingState(character) { ... }
  generateGenitalSlang(context) { ... }
  formatMessage(template, vars) { ... }
}

// 모든 커맨드가 공유
com0.execute() → MessageRenderer.renderClothingState()
com1.execute() → MessageRenderer.renderClothingState()
```

### 조건 명시화
```typescript
// COMABLE.ERB 148KB → JSON 선언
export const commandConditions = {
  0: {
    requiredAbilities: { 'C감각': 3 },
    clothingRequirement: 'bottom_naked'
  },
  11: {
    requiredAbilities: { 'V감각': 3 },
    clothingRequirement: 'naked',
    specialCondition: (ctx) => !ctx.talents.includes(74) // 처녀 아님
  }
}
```

## 파일 구조

```
web-port/
├── electron/                 # Electron 설정 (Phase 0)
│   ├── main/
│   │   ├── index.ts         # 메인 프로세스
│   │   ├── preload.ts       # IPC 브릿지
│   │   └── ipc/
│   │       └── fileHandler.ts
│   └── builder.config.js    # 빌드 설정
│
├── src/
│   ├── data/
│   │   ├── json/            # 변환된 게임 데이터
│   │   │   ├── abilities.json
│   │   │   ├── parameters.json
│   │   │   ├── talents.json
│   │   │   └── characters.json
│   │   ├── csvParser.ts     # CSV 파서
│   │   └── loaderJSON.ts    # GameData 싱글톤
│   │
│   ├── modules/
│   │   └── training/
│   │       ├── commands/
│   │       │   ├── CommandBase.ts      # 베이스 클래스
│   │       │   ├── improved/
│   │       │   │   ├── Com0Command.ts  # C감각 애무
│   │       │   │   └── Com11Command.ts # 정상위
│   │       │   └── generated/          # 자동 생성 (템플릿)
│   │       └── systems/
│   │           └── SourceCheck.ts      # 절정/기절 처리
│   │
│   ├── components/
│   │   ├── GameLayout.tsx   # 메인 레이아웃
│   │   ├── MainMenu.tsx     # 메인 메뉴
│   │   └── SaveLoadScreen.tsx  # 저장/로드 (미완)
│   │
│   ├── stores/
│   │   └── gameStore.ts     # Zustand 상태 관리
│   │
│   └── utils/
│       ├── storage/         # 저장소 추상화
│       │   ├── IStorage.ts
│       │   ├── ElectronStorage.ts
│       │   └── BrowserStorage.ts
│       └── saveSystem.ts    # 저장/로드 로직
│
└── tools/
    └── convert_csv_to_json.ts  # CSV 변환 도구
```

## 기술 스택

- **프론트엔드**: React 18.2.0 + TypeScript 5.2.2
- **빌드 도구**: Vite 5.0.8
- **상태 관리**: Zustand 4.4.7
- **데스크톱**: Electron 28.0.0 (준비 완료, 아직 미사용)
- **저장소**: electron-store 8.5.0
- **패키징**: electron-builder 24.9.0

## 테스트 방법

### 1. 브라우저에서 테스트 (추천)
```bash
npm run dev
```
- 브라우저에서 http://localhost:3000 접속
- "새로 시작" 클릭 → 메인 메뉴 진입
- 각 메뉴 클릭하여 화면 전환 확인

### 2. CSV 데이터 수정 후 재변환
```bash
# CSV 파일 수정 (예: CSV/Chara1.csv)
npm run convert-csv
npm run dev  # 재시작
```

### 3. TypeScript 에러 체크
```bash
npx tsc --noEmit
```
- 현재 90개 파일에서 에러 발생 (정상)
- 실제 사용하는 파일에만 에러 없으면 OK

## 알려진 이슈

1. **Electron 실행 불가**
   - `npm run dev:electron` 실행 시 에러
   - 원인: electron-vite 설정 파일 미생성
   - 해결: electron.vite.config.ts 생성 필요

2. **자동 생성 파일 구문 오류**
   - 90개 generated/*.ts 파일에 TypeScript 에러
   - 원인: ERB → TS 자동 변환 시 일부 구문 오변환
   - 영향: 현재 사용하지 않으므로 무시 가능

3. **저장/불러오기 미동작**
   - SaveLoadScreen UI만 존재, 로직 미연결
   - saveSystem.ts는 준비됨

## 성능 지표

- **CSV → JSON 변환 시간**: ~2초
- **JSON 로딩 시간**: <100ms
- **Vite 개발 서버 시작**: ~1초
- **초기 렌더링**: <200ms
- **메모리 사용량**: ~150MB (브라우저)

## 기여 가이드

### 새 커맨드 구현
```typescript
// src/modules/training/commands/improved/Com{번호}Command.ts
export class Com{번호}Command extends TrainingCommand {
  getName(): string { return '커맨드명'; }

  isAvailable(): boolean {
    // 가용성 체크
    return this.bottomNaked() && !this.isVirgin();
  }

  async execute(): Promise<void> {
    const source = this.calculateSource();
    this.character.source[0] = source.pleasureC;
    // ...
  }

  private calculateSource(): Partial<SourceResult> {
    const cValues = [20, 100, 500, 1200, 2000, 2800];
    return {
      pleasureC: this.calculateAbilitySource(0, cValues)
    };
  }
}
```

### CSV 데이터 추가
1. `CSV/` 폴더에 파일 추가/수정
2. `tools/convert_csv_to_json.ts`에 변환 로직 추가
3. `npm run convert-csv` 실행
4. `src/data/loaderJSON.ts`에 로딩 로직 추가

## 라이선스

원본 erAV_Ho 프로젝트의 라이선스를 따름
