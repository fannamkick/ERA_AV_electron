# 게임 시스템

erAV_Ho의 핵심 게임 시스템 설명서입니다.

## 목차
1. [조교 시스템](#조교-시스템)
2. [저장 시스템](#저장-시스템)
3. [캐릭터 시스템](#캐릭터-시스템)
4. [마스터 시스템](#마스터-시스템)

---

## 조교 시스템

### 전체 플로우

```
1. 유저 액션 (커맨드 선택)
   ↓
2. 커맨드 실행 (SOURCE 계산)
   ↓
3. 메시지 생성 (반응 표시)
   ↓
4. SOURCE → PALAM 변환
   ↓
5. 경험치 획득 (EXP 증가)
   ↓
6. 절정 체크 (SOURCE 임계값)
   ↓
7. 능력치 상승 (ABL 레벨업)
```

### 1단계: 커맨드 선택
```typescript
// 사용 가능한 커맨드 목록 표시
const availableCommands = commands.filter(cmd => cmd.isAvailable(ctx));

// 유저 선택
executeCommand(selectedCommandId);
```

### 2단계: SOURCE 계산
```typescript
// 예: COMF0 - 애무
safe.addSource('쾌C', cData.c * sensitivity);  // 쾌C 증가
safe.addSource('쾌V', vData.v * sensitivity);  // 쾌V 증가
safe.addSource('욕정', lustValue);             // 욕정 증가 (SOURCE)
```

**SOURCE 종류** (총 18개):
- `쾌C`, `쾌V`, `쾌A`, `쾌B`: 쾌락 증가량
- `욕정추가`, `윤활`: 상태 변화
- `통각`, `불결`: 부정적 반응
- `달성`: 성공 판정

### 3단계: 메시지 생성
```typescript
// 반응 메시지 생성
const messages = MessageGenerator.generate(ctx, {
  pleasureC: source[0],
  pleasureV: source[1],
  lust: params[5],
  // ...
});

// 출력 예:
// "...음♥ 기분 좋아요..."
// "아...거기는..."
```

### 4단계: SOURCE → PALAM
```typescript
// SOURCE 누적량을 실제 PALAM에 반영
ctx.params[5] += ctx.source[11];  // 욕정추가 → 욕정
ctx.params[3] += ctx.source[10];  // 윤활 → 윤활
ctx.params[0] += ctx.source[0];   // 쾌C → 쾌C
```

### 5단계: 경험치 획득
```typescript
// EXP 증가
if (source[0] > 0) {
  ctx.exp[0] += 1;  // C경험
}
if (hadOrgasm) {
  ctx.exp[10] += 1; // 절정 횟수
}
```

### 6단계: 절정 체크
```typescript
// 임계값 도달 시 절정
if (params[0] >= 10000) {  // 쾌C
  triggerOrgasm('C');
  params[0] = 0;  // 리셋
}
```

### 7단계: 능력치 상승
```typescript
// 경험치 → 능력치 변환
if (exp[0] >= 100) {
  abilities[0] += 1;  // 욕망 상승
  exp[0] = 0;
}
```

---

## 저장 시스템

### 자동 저장
```typescript
// 턴 종료 시 자동 저장
function endTurn() {
  const saveData = getSaveData();
  saveToFile('autosave', saveData);
  advanceTime();
}
```

### 수동 저장 (10슬롯)
```typescript
// 사용자 요청 시
function saveGame(slotNumber: number) {
  const saveData = {
    gameState: {
      day: currentDay,
      money: currentMoney,
      characters: ownedCharacters,
      // ...
    },
    metadata: {
      savedAt: new Date().toISOString(),
      playTime: totalPlayTime,
    }
  };

  saveToFile(`save_${slotNumber}`, saveData);
}
```

### 저장 위치
- **Electron**: `%APPDATA%/erAV_Ho/saves/`
- **Browser**: `localStorage`

### 저장 데이터 구조
```typescript
interface SaveData {
  version: string;
  gameState: {
    day: number;
    time: TimeOfDay;
    money: number;
    difficulty: Difficulty;
    master: MasterCharacter;
    characters: Character[];
    globalFlags: Record<number, number>;
  };
  metadata: {
    savedAt: string;
    playTime: number;
    dayReached: number;
  };
}
```

---

## 캐릭터 시스템

### 캐릭터 데이터 구조
```typescript
interface Character {
  id: number;
  name: string;

  // 핵심 능력치
  base: number[];      // BASE (체력, 기력 등 23개)
  abl: number[];       // ABL (능력치 34개)
  talent: number[];    // TALENT (특성 261개)
  palam: number[];     // PALAM (파라미터 17개)
  exp: number[];       // EXP (경험치 92개)
  mark: number[];      // MARK (각인 15개)

  // 플래그
  cflag: Record<number, number>;  // 캐릭터 플래그
  juel: Record<number, number>;   // 보석 플래그
}
```

### 변수 분류

#### 고정값 (캐릭터 생성 시 설정, 변경 없음)
```typescript
// BASE (체력, 매력 등)
base[0]   // 체력 최대치
base[2]   // 매력
base[6]   // 가슴 크기

// TALENT (타고난 특성)
talent[0]   // 처녀
talent[121] // 후타나리
talent[122] // 남성
```

#### 조교 중 변동 (게임 진행 중 증감)
```typescript
// PALAM (일시적 상태)
palam[0]  // 쾌C (조교 중 증가 → 턴 종료 시 감소)
palam[5]  // 욕정 (조교 중 증가)
palam[9]  // 고통 (조교 중 증가)

// ABL (영구 능력치)
abl[0]    // 욕망 (경험치로 상승)
abl[10]   // 신뢰 (조교 성공 시 증가)

// EXP (누적 경험)
exp[0]    // C경험 (C계 조교 시 증가)
exp[10]   // 절정 횟수
```

### 특성(TALENT) 할당 규칙

#### 초기 부여 가능 (캐릭터 생성 시)
```typescript
// 순결계
talent[0]   // 처녀
talent[1]   // 동정
talent[2]   // 애널처녀

// 민감도계
talent[101] // C둔감
talent[102] // C민감
talent[103] // V둔감
talent[104] // V민감

// 신체계
talent[121] // 후타나리
talent[130] // 모유체질
```

#### 획득계 (게임 중 획득, 초기 부여 ❌)
```typescript
// 절정계
talent[20]  // 처녀상실
talent[50]  // C개발
talent[51]  // V개발

// 중독계
talent[80]  // 쾌락중독
talent[81]  // 정액중독

// 상태계
talent[153] // 임신
talent[140] // 출산경험
```

**⚠️ 주의**: 획득계 특성을 초기에 부여하면 게임 밸런스 붕괴!

---

## 마스터 시스템

### MasterCharacter 타입
```typescript
interface MasterCharacter {
  // 기본 정보
  name: string;

  // 마스터 전용 능력치
  abl: Record<number, number>;      // ABL:MASTER:XX
  talent: Record<number, number>;   // TALENT:MASTER:XX

  // 마스터 전용 특성
  특수능력: {
    정력: number;        // 성행위 가능 횟수
    사정회복: number;    // 사정 후 회복 속도
    조교숙련도: number;  // 조교 효율
  };
}
```

### 마스터 능력치 (ABL:MASTER)
```typescript
master.abl = {
  0: 50,   // 조교 레벨
  1: 100,  // 정력
  2: 30,   // 테크닉
  // ...
};
```

### 마스터 특성 (TALENT:MASTER)
```typescript
master.talent = {
  0: 1,   // 조교자
  1: 0,   // 남성
  2: 1,   // 경험 풍부
  // ...
};
```

### 사용 예시
```typescript
// 마스터 정력 체크
if (master.abl[1] > 0) {
  // 성행위 가능
  master.abl[1] -= 1;
}

// 마스터 특성 확인
if (master.talent[2] === 1) {
  // 경험 풍부 → 조교 효율 +20%
  efficiency *= 1.2;
}
```

---

## 📚 관련 문서
- [개발 가이드](./DEVELOPMENT.md)
- [프로젝트 구조](./ARCHITECTURE.md)
- [ERB 참고 자료](./REFERENCE.md)
