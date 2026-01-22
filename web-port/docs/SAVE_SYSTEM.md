# 💾 저장 시스템 완벽 가이드

## 📋 개요

erAV_Ho 웹 포트는 **이중 저장 시스템**을 사용합니다:

1. **자동 저장** (Zustand persist) - 게임 상태 자동 백업
2. **수동 저장** (10개 슬롯) - 플레이어가 직접 관리

## 🔧 구현 상태

### ✅ 완료된 항목

- [x] `storage.ts` - Browser/Electron 추상화 레이어
- [x] `saveSystem.ts` - 10개 슬롯 저장/불러오기
- [x] `SaveLoadScreen.tsx` - UI 완성
- [x] Electron IPC 핸들러 (fileHandler.ts)
- [x] Zustand persist 자동 저장

## 🏗️ 시스템 구조

```
저장 시스템
├─ 자동 저장 (Zustand persist)
│  ├─ localStorage: 'erav-game-storage'
│  └─ 페이지 새로고침 시 자동 복원
│
└─ 수동 저장 (10개 슬롯)
   ├─ Browser: localStorage ('erAV_save_1' ~ 'erAV_save_10')
   └─ Electron: electron-store
```

## 📁 파일 구조

### 1. storage.ts (추상화 레이어)

**위치**: `src/utils/storage.ts`

**역할**: Browser와 Electron 환경을 자동 감지하여 적절한 스토리지 사용

```typescript
// Browser → localStorage 사용
// Electron → electron-store 사용

export const storage: IStorage = createStorage();
```

**API**:
```typescript
interface IStorage {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
  clear(): Promise<void>;
}
```

### 2. saveSystem.ts (슬롯 관리)

**위치**: `src/utils/saveSystem.ts`

**기능**:
- `saveGame(슬롯번호, 게임상태, 메타데이터)` - 저장
- `loadGame(슬롯번호)` - 불러오기
- `deleteSave(슬롯번호)` - 삭제
- `getAllSaveSlots()` - 모든 슬롯 정보 조회
- `exportSave(슬롯번호)` - JSON 파일로 내보내기
- `importSave(슬롯번호, file)` - JSON 파일에서 가져오기

**저장 데이터 형식**:
```typescript
interface SaveData {
  version: string;          // '0.1.0'
  timestamp: number;        // 저장 시각
  slotNumber: number;       // 1~10

  gameState: {
    day: number;
    money: number;
    ownedCharacters: Character[];
    availableCharacters: Character[];
    currentCharacter: number | null;
    globalFlags: Record<number, number>;
    items: Record<number, number>;
    achievements: number[];
    clearedEndings: number[];
  };

  metadata: {
    playTime: number;       // 총 플레이 시간 (초)
    saveCount: number;      // 저장 횟수
    dayReached: number;     // 최대 도달 일수
  };
}
```

### 3. SaveLoadScreen.tsx (UI)

**위치**: `src/components/SaveLoadScreen.tsx`

**기능**:
- 현재 게임 상태 표시
- 10개 슬롯 그리드 표시
- 저장/불러오기/삭제/내보내기/가져오기 버튼

**사용법**:
```tsx
<SaveLoadScreen onBack={() => setCurrentScene('main')} />
```

### 4. Electron IPC (파일 시스템)

**위치**: `electron/main/ipc/fileHandler.ts`

**제공 API**:
```typescript
window.electronAPI = {
  // 파일 다이얼로그
  saveFileDialog(options) → filepath
  openFileDialog(options) → filepath

  // 파일 I/O
  readFile(filepath) → content
  writeFile(filepath, content) → void

  // electron-store
  storageGet(key) → value
  storageSet(key, value) → void
  storageDelete(key) → void
  storageGetAll() → object
  storageClear() → void
}
```

## 🎮 사용 방법

### Browser 환경 (개발 모드)

```bash
npm run dev
```

**저장 위치**: `localStorage`
- 개발자 도구 → Application → Local Storage에서 확인 가능
- 키: `erav-game-storage` (자동 저장)
- 키: `erAV_save_1` ~ `erAV_save_10` (수동 저장)

### Electron 환경 (프로덕션)

```bash
npm run dev:electron
```

**저장 위치**:
- Windows: `%APPDATA%\erav-web-port\config.json`
- macOS: `~/Library/Application Support/erav-web-port/config.json`
- Linux: `~/.config/erav-web-port/config.json`

## 🧪 테스트 시나리오

### 1. 자동 저장 테스트

```
1. 게임 시작 (새로 시작)
2. 소지금 변경 (예: 상점 이용)
3. 캐릭터 추가
4. 페이지 새로고침 (F5)
5. ✅ 상태가 복원되어야 함
```

### 2. 수동 저장 테스트

```
1. 메인 메뉴 → 저장/불러오기
2. 슬롯 1에 저장
3. 소지금 변경
4. 슬롯 1에서 불러오기
5. ✅ 이전 상태로 복원되어야 함
```

### 3. 내보내기/가져오기 테스트

```
1. 슬롯 1에 저장
2. "내보내기" 버튼 클릭
3. JSON 파일 다운로드
4. 슬롯 2에서 "가져오기" 클릭
5. 다운로드한 JSON 파일 선택
6. ✅ 슬롯 2에 동일한 데이터가 복사됨
```

### 4. Electron 파일 저장 테스트

```
1. Electron 앱 실행 (npm run dev:electron)
2. 슬롯 1에 저장
3. "내보내기" 클릭
4. Electron 파일 다이얼로그 열림
5. 원하는 위치에 저장
6. ✅ JSON 파일이 저장됨
```

## 🔍 디버깅

### Console 로그 확인

저장/불러오기 시 다음과 같은 로그가 출력됩니다:

```
[Storage] Browser 환경 감지 → LocalStorage 사용
게임 저장 완료 (슬롯 1)
[TURNEND] Day 1 오전 → Day 1 오후
```

Electron 환경:
```
[Storage] Electron 환경 감지 → ElectronStorage 사용
```

### localStorage 내용 확인 (Browser)

**개발자 도구 (F12) → Application → Local Storage**

```javascript
// Console에서 직접 확인
localStorage.getItem('erav-game-storage')
localStorage.getItem('erAV_save_1')
```

### electron-store 내용 확인 (Electron)

**개발자 도구 (F12) → Console**

```javascript
// Console에서 확인
await window.electronAPI.storageGetAll()
```

## ⚠️ 주의사항

### 1. 버전 호환성

현재 저장 버전: `0.1.0`

```typescript
const SAVE_VERSION = '0.1.0';
```

**향후 버전 업데이트 시**:
- `saveSystem.ts`의 `loadGame()`에서 버전 체크
- 필요시 마이그레이션 로직 추가

### 2. 저장 용량 제한

**Browser (localStorage)**:
- 브라우저마다 다름 (일반적으로 5-10MB)
- 캐릭터 데이터가 많아지면 용량 초과 가능

**Electron (electron-store)**:
- 제한 없음 (디스크 용량까지)

### 3. 데이터 손실 방지

**자동 저장**:
- Zustand persist는 상태 변경 시 자동 저장
- 브라우저 캐시 삭제 시 손실 가능

**권장 사항**:
- 중요한 진행 상황은 수동 저장 사용
- 주기적으로 JSON 파일로 백업

## 🚀 향후 개선 사항

### 1. 클라우드 동기화

`saveSystem.ts`에 인터페이스 준비됨:

```typescript
interface CloudSyncAdapter {
  upload(saveData: SaveData): Promise<boolean>;
  download(slotNumber: number): Promise<SaveData | null>;
  list(): Promise<SaveSlotInfo[]>;
  delete(slotNumber: number): Promise<boolean>;
}
```

**구현 가능한 서비스**:
- Google Drive API
- Firebase Storage
- 자체 서버

### 2. 자동 백업

```typescript
// 매 10분마다 자동 백업
setInterval(() => {
  const gameState = gameStore.getSaveData();
  const metadata = gameStore.getMetadata();
  saveGame(0, gameState, metadata); // 슬롯 0을 자동 백업용으로
}, 10 * 60 * 1000);
```

### 3. 저장 압축

대용량 데이터 압축:

```bash
npm install pako
```

```typescript
import pako from 'pako';

// 압축
const compressed = pako.deflate(JSON.stringify(saveData));
const base64 = btoa(String.fromCharCode(...compressed));

// 압축 해제
const decoded = atob(base64).split('').map(c => c.charCodeAt(0));
const decompressed = pako.inflate(new Uint8Array(decoded));
const saveData = JSON.parse(new TextDecoder().decode(decompressed));
```

## 📊 파일 크기 예상

**빈 세이브**: ~2KB
**캐릭터 10명**: ~50KB
**캐릭터 100명**: ~500KB

**10개 슬롯 전부 사용 시**: ~5MB (캐릭터 100명 기준)

## 🎯 결론

저장 시스템이 완벽하게 구현되었습니다:

✅ Browser와 Electron 모두 지원
✅ 자동 저장 + 수동 저장 이중 시스템
✅ JSON 파일 내보내기/가져오기
✅ 10개 슬롯 관리
✅ 메타데이터 (플레이 시간, 저장 횟수 등)

**테스트 방법**:
```bash
# Browser 모드
npm run dev

# Electron 모드
npm run dev:electron
```

메인 메뉴 → 저장/불러오기에서 바로 사용 가능합니다!
