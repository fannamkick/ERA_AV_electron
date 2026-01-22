# 조교 시스템 상세 플로우

## 사용자 액션부터 결과까지 전체 흐름

### 0. 초기 상태 (조교 시작 전)

**UI 상태**:
- 캐릭터 선택됨: `selectedCharacter = Character` (예: 호시미야 케이트)
- 조교 화면 진입: `TrainingScreen.tsx` 렌더링
- 93개 커맨드 버튼 표시 (예: "애무", "커닐링구스", "자위" 등)

**데이터 상태**:
```typescript
TrainingContext = {
  abilities: [0, 0, 0, 0, ...],  // ABL:0~299 (C감각=0, B감각=0, V감각=0, A감각=0, 순응=0 등)
  params: [0, 0, 0, ...],        // PALAM:0~299 (쾌C=0, 쾌V=0, 욕정=0 등)
  talents: [74, 76, ...],        // TALENT 목록 (74=처녀, 76=애널처녀)
  equipment: {},                 // TEQUIP (장비 없음)
  flags: {},                     // FLAG (전역 플래그)
  exp: [0, 0, ...],             // EXP (경험치)
  source: [0, 0, ...],          // SOURCE (이번 턴 증가량)
  prevCom: -1,                   // 이전 커맨드
  day: 1                         // 현재 일자
}

Character = {
  name: "호시미야 케이트",
  flags: {
    16: 0,      // CFLAG:16 (키스경험: -1=미경험, 0=경험있음)
    40: 0,      // CFLAG:40 (의상: 0=전라, 1=팬티, 2=브라, 4=상의, 8=치마, 16=하의, 64=특수의상)
    42: 0,      // CFLAG:42 (코스튬 번호)
    110: 0      // CFLAG:110 (출산일)
  },
  talent: [74, 76, 135],  // 74=처녀, 76=애널처녀, 135=미숙함
  abilities: {...},
  source: [0, 0, ...]     // 이번 턴 SOURCE 누적
}
```

---

## 1단계: 유저가 "애무" 버튼 클릭

### 1.1 버튼 클릭 이벤트
**위치**: `TrainingScreen.tsx` → `TrainingCommandMenu.tsx`

```typescript
<button onClick={() => handleCommandClick(0)}>
  애무  // commandRegistry[0].name
</button>
```

### 1.2 가용성 체크 (COMABLE 로직)
**위치**: `improved.ts` → `Com0Command.isAvailable()`

**체크 조건**:
```typescript
// ① 하반신 노출 체크
const clothing = character.flags[40] || 0;
const bottomNaked = (clothing & 17) === 0;  // 하의(16) + 팬티(1) = 0
if (!bottomNaked) return false;  // ❌ "하반신을 노출시켜 주십시오"

// ② 의식 체크
if (character.flags[16] === -1) return false;  // ❌ "의식이 없습니다"

// ③ 정조대 체크
if (character.flags[42] === 79) return false;  // ❌ "정조대를 해제해 주십시오"

return true;  // ✅ 실행 가능
```

**결과**:
- ✅ 가능 → 2단계로 진행
- ❌ 불가능 → 에러 메시지 표시하고 종료

---

## 2단계: 커맨드 실행 (Com0Command.execute())

### 2.1 커맨드 이름 표시
```typescript
this.message(this.getName());  // "애무"
ctx.saveStr[0] = this.getName();  // SAVESTR:0 = "애무"
```

**화면 출력**: `"애무"`

---

### 2.2 SOURCE 계산 (calculateSource())

#### 2.2.1 쾌C(SOURCE:0) 계산
```typescript
const cSense = ctx.abilities[0];  // ABL:0 (C감각)

// 능력치별 SOURCE 값
const cValues = [20, 100, 500, 1200, 2000, 2800];

if (cSense === 0) {
  source.pleasureC = 20;      // 초심자
} else if (cSense === 1) {
  source.pleasureC = 100;     // 약간 개발됨
} else if (cSense === 2) {
  source.pleasureC = 500;     // 어느정도 개발됨
} else if (cSense === 3) {
  source.pleasureC = 1200;    // 잘 개발됨
} else if (cSense === 4) {
  source.pleasureC = 2000;    // 상당히 개발됨
} else {  // cSense >= 5
  source.pleasureC = 2800;    // 완전 개발됨
}
```

**예시 (C감각=0 인 경우)**: `pleasureC = 20`

#### 2.2.2 쾌B(SOURCE:17) 계산
```typescript
const bSense = ctx.abilities[1];  // ABL:1 (B감각)

const bValues = [15, 50, 300, 700, 1100, 1600];
// 동일한 로직으로 계산
```

**예시 (B감각=0 인 경우)**: `pleasureB = 15`

#### 2.2.3 윤활(SOURCE:3) 계산
```typescript
// C감각 기반
const lubValues = [25, 50, 80, 100, 115, 125];
let lubrication = lubValues[cSense];  // C감각=0 → 25

// B감각 기반 추가
const bLubValues = [25, 50, 80, 100, 115, 125];
lubrication += bLubValues[bSense];  // B감각=0 → 25

source.lubrication = 25 + 25 = 50;
```

#### 2.2.4 기본 값 설정
```typescript
source.submission = 60;   // 굴복
source.lust = 30;         // 불결
source.exposure = 100;    // 노출
```

#### 2.2.5 특수 조건 처리

**볼개그 착용 시**:
```typescript
if (character.equipment[45]) {  // TEQUIP:45 = 볼개그
  source.lust = 0;
  source.pleasureC /= 2;
  source.lubrication /= 4;
}
```

**첫 키스 미경험**:
```typescript
if (character.flags[16] === -1) {  // CFLAG:16 = -1 (키스 미경험)
  source.lust = 0;
  source.pleasureC /= 2;
  source.lubrication /= 4;
}
```

**소질 보정**:
```typescript
// TALENT:85 = 愛 (사랑)
if (talents.includes(85) && !assiPlay) {
  source.lubrication *= 2;
  source.lust /= 10;
}

// TALENT:62 = 악취민감
if (talents.includes(62)) {
  source.lust *= 3;
}

// TALENT:15 = 자존심
if (talents.includes(15)) {
  source.lust *= 2;
}
```

**최종 SOURCE 값 (예시)**:
```typescript
source = {
  pleasureC: 20,      // 쾌C
  pleasureB: 15,      // 쾌B
  lubrication: 50,    // 윤활
  submission: 60,     // 굴복
  lust: 30,          // 불결
  exposure: 100       // 노출
}
```

---

### 2.3 SOURCE를 Character에 적용
```typescript
character.source[0] = source.pleasureC;      // 20
character.source[17] = source.pleasureB;     // 15
character.source[3] = source.lubrication;    // 50
character.source[4] = source.submission;     // 60
character.source[8] = source.lust || 30;     // 30
character.source[12] = 100;                  // 노출
```

---

## 3단계: 메시지 생성 (MessageGenerator.generateCom0())

### 3.1 초기 메시지
```typescript
this.addMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
```

**화면 출력**:
```
애무
‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥
```

### 3.2 의상 상태 체크
```typescript
const cflag40 = character.flags[40] || 0;  // 의상
const cflag42 = character.flags[42] || 0;  // 코스튬

let msg = '';

// ① 특수 의상 착용 중
if ((cflag40 & 64) && cflag42 <= 50) {
  msg += getClothTypeSpecial() + ' 너머로 ';  // "메이드복 너머로 "
}
// ② 일반 의상 착용 중
else if (cflag40 & 28) {  // 상의(4) | 치마(8) | 하의(16)
  msg += getClothTypeMain2() + ' 너머로 ';  // "교복 너머로 "
}
// ③ 속옷만 착용
else if ((cflag40 & 1) || (cflag40 & 2)) {  // 팬티(1) | 브라(2)
  msg += '속옷 너머로 ';
}
// ④ 전라
else {
  msg += '';  // 아무것도 안붙임
}
```

**예시 (전라인 경우)**: `msg = ""`

### 3.3 행위자 결정
```typescript
const equipment = ctx.equipment || {};

// 촉수/수간/슬라임이 없으면 플레이어가 직접
if (!equipment[89] && !equipment[90] && !equipment[150]) {
  msg += '플레이어는 ';  // "플레이어는 "

  // 키스 여부 체크
  const stain0 = ctx.stain?.[0] || 0;      // 입 더러움
  const kiss경험 = character.flags[16] !== -1;  // 키스 경험
  const 볼개그 = equipment[45];

  // 입이 깨끗하고 + 볼개그 없고 + 키스 경험 있으면
  if ((stain0 < 2 || stain0 == 16 || stain0 == 17) && !볼개그 && kiss경험) {
    msg += '키스하면서 ';  // "플레이어는 키스하면서 "
  }
}
```

**예시 (키스 경험 없는 경우)**: `msg = "플레이어는 "`

### 3.4 대상 캐릭터 설명
```typescript
msg += `${character.name}의 `;  // "호시미야 케이트의 "

const talents = character.talent || [];

// 소질에 따른 수식어
if (talents.includes(135)) {  // TALENT:135 = 미숙함
  msg += '미숙한 ';  // "미숙한 "
} else if (talents.includes(100)) {  // TALENT:100 = 미발달
  msg += '미발달된 ';
} else if (talents.includes(115)) {  // TALENT:115 = 포동포동
  msg += '포동포동하게 살찐 ';
}
```

**예시 (TALENT:135 보유)**: `msg = "플레이어는 호시미야 케이트의 미숙한 "`

### 3.5 행위 설명
```typescript
// 장비에 따라 다른 행위
if (equipment[150]) {  // TEQUIP:150 = 슬라임
  msg += '몸을 슬라임이 기어다녔다…';
} else if (equipment[90]) {  // TEQUIP:90 = 촉수
  msg += '몸을 촉수가 희롱했다…';
} else if (equipment[89]) {  // TEQUIP:89 = 수간
  msg += '몸을 개의 혀가 핥아댔다…';
} else {  // 일반
  msg += '몸을 열심히 애무했다…';
}
```

**예시 (장비 없음)**: `msg = "플레이어는 호시미야 케이트의 미숙한 몸을 열심히 애무했다…"`

### 3.6 메시지 추가
```typescript
this.addMessage(msg);
```

**화면 출력**:
```
애무
‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥
플레이어는 호시미야 케이트의 미숙한 몸을 열심히 애무했다…
```

### 3.7 임신 상태 추가 메시지
```typescript
if (talents.includes(153)) {  // TALENT:153 = 임신중
  const 출산일 = character.flags[110] || 0;
  const day = ctx.day || 0;

  // 출산 5일 전이고 + 특수의상 아님
  if (출산일 <= day + 5 && (cflag42 != 11 || (cflag40 & 64) == 0)) {
    this.addMessage(`${character.name}의 둥글게 부풀어오른 배 안에서, 아이의 발길질이 희미하게 느껴진다……`);
  }
}
```

**예시 (임신 아님)**: 추가 메시지 없음

---

## 4단계: 경험치 획득 (gainExperience())

### 4.1 레즈/호모 경험치
```typescript
// 플레이어와 대상 모두 여성
if (player.talent.includes(122) === false && character.talent.includes(122) === false) {
  this.addExperience(40, 5);  // EXP:40 (레즈경험) +5
  this.message('레즈경험 +5');
}
// 플레이어와 대상 모두 남성
else if (player.talent.includes(122) && character.talent.includes(122)) {
  this.addExperience(41, 5);  // EXP:41 (호모경험) +5
  this.message('호모경험 +5');
}
```

**화면 출력**:
```
애무
‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥
플레이어는 호시미야 케이트의 미숙한 몸을 열심히 애무했다…
레즈경험 +5
```

### 4.2 애정경험
```typescript
this.addExperience(14, 1);  // EXP:14 (애정경험) +1
this.message('애정경험 +1');
```

### 4.3 페로몬 경험치
```typescript
// 호감도 1000 이상이고 조수 플레이 아님
if (character.flags[2] >= 1000 && !assiPlay) {
  this.addExperience(23, 2);  // EXP:23 (페로몬) +2
  this.message('페로몬 +2');
}
```

**최종 화면 출력**:
```
애무
‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥
플레이어는 호시미야 케이트의 미숙한 몸을 열심히 애무했다…
레즈경험 +5
애정경험 +1
```

---

## 5단계: BASE 업데이트

```typescript
ctx.base[0] += 5;   // C감각 BASE +5 (다음 턴에 ABL:0 상승 가능성)
ctx.base[1] += 50;  // 욕망 BASE +50
```

---

## 6단계: SOURCE_CHECK 시스템 (SourceCheckSystem.execute())

### 6.1 파라미터 업데이트
```typescript
// SOURCE를 PALAM에 누적
ctx.params[0] += character.source[0];   // 쾌C += 20 → 20
ctx.params[17] += character.source[17]; // 쾌B += 15 → 15
ctx.params[3] += character.source[3];   // 윤활 += 50 → 50
ctx.params[4] += character.source[4];   // 굴복 += 60 → 60
ctx.params[8] += character.source[8];   // 불결 += 30 → 30
ctx.params[12] += character.source[12]; // 반감 += 100 → 100
```

**결과**:
```typescript
ctx.params = {
  0: 20,    // 쾌C
  17: 15,   // 쾌B
  3: 50,    // 윤활
  4: 60,    // 굴복
  8: 30,    // 불결
  12: 100   // 반감
  // ... 기타 파라미터는 0
}
```

### 6.2 절정 체크
```typescript
const ORGASM_THRESHOLD = 10000;

let orgasms = [];

// 쾌C 절정 체크
if (ctx.params[0] >= ORGASM_THRESHOLD) {  // 20 < 10000 ❌
  orgasms.push('C');
}

// 쾌V 절정 체크
if (ctx.params[1] >= ORGASM_THRESHOLD) {  // 0 < 10000 ❌
  orgasms.push('V');
}

// 쾌A 절정 체크
if (ctx.params[2] >= ORGASM_THRESHOLD) {  // 0 < 10000 ❌
  orgasms.push('A');
}

// 쾌B 절정 체크
if (ctx.params[17] >= ORGASM_THRESHOLD) {  // 15 < 10000 ❌
  orgasms.push('B');
}
```

**결과**: `orgasms = []` (절정 없음)

### 6.3 분비액 처리
```typescript
// 절정이 없으므로 분비액 추가 없음
```

### 6.4 기절 체크
```typescript
// 절정이 없으므로 기절 체크 안함
```

### 6.5 상태 업데이트
```typescript
// SOURCE 초기화 (다음 커맨드를 위해)
character.source = [0, 0, 0, ...];
```

---

## 7단계: UI 업데이트

### 7.1 파라미터 디스플레이
```typescript
<div className="parameter-display">
  <div>쾌C: {ctx.params[0]}</div>      // 쾌C: 20
  <div>쾌V: {ctx.params[1]}</div>      // 쾌V: 0
  <div>쾌A: {ctx.params[2]}</div>      // 쾌A: 0
  <div>쾌B: {ctx.params[17]}</div>     // 쾌B: 15
  <div>윤활: {ctx.params[3]}</div>     // 윤활: 50
  <div>욕정: {ctx.params[5]}</div>     // 욕정: 0
  <div>굴복: {ctx.params[4]}</div>     // 굴복: 60
</div>
```

### 7.2 메시지 로그 자동 스크롤
```typescript
useEffect(() => {
  if (messageEndRef.current) {
    const container = messageEndRef.current.parentElement;
    if (container) {
      container.scrollTop = container.scrollHeight;  // 맨 아래로 스크롤
    }
  }
}, [messages]);
```

---

## 최종 화면 상태

```
┌─────────────────────────────────────┐
│ 조교 대상: 호시미야 케이트           │
│ C감각: 0  욕망: 0                   │
├─────────────────────────────────────┤
│ [메시지 표시 영역]                  │
│                                     │
│ 애무                                │
│ ‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥  │
│ 플레이어는 호시미야 케이트의         │
│ 미숙한 몸을 열심히 애무했다…        │
│ 레즈경험 +5                         │
│ 애정경험 +1                         │
│                                     │
├─────────────────────────────────────┤
│ [파라미터 상세]                     │
│ 쾌C: 20    쾌V: 0     쾌A: 0        │
│ 쾌B: 15    윤활: 50   욕정: 0       │
│ 굴복: 60   반감: 100  불결: 30      │
├─────────────────────────────────────┤
│         [계속] [조교 종료]          │
└─────────────────────────────────────┘
```

---

## 2회차: 다시 "애무" 클릭 (연속 실행)

### SOURCE 계산 (동일)
```typescript
source = {
  pleasureC: 20,
  pleasureB: 15,
  lubrication: 50,
  submission: 60,
  lust: 30,
  exposure: 100
}
```

### 파라미터 누적
```typescript
ctx.params[0] = 20 + 20 = 40;   // 쾌C
ctx.params[17] = 15 + 15 = 30;  // 쾌B
ctx.params[3] = 50 + 50 = 100;  // 윤활
// ... 계속 누적
```

### 500회 실행 후
```typescript
ctx.params[0] = 20 * 500 = 10000;  // 쾌C 절정!
```

**절정 메시지 출력**:
```
호시미야 케이트의 클리토리스가 경련하며 절정에 도달했다!!
쾌C절정 경험치 +100
절정 카운터: 1회
```

**파라미터 변화**:
```typescript
ctx.params[0] = 10000 - 10000 = 0;  // 쾌C 리셋
ctx.params[15] += 100;  // 애액 +100
ctx.exp[50] += 100;     // C절정 경험치
```

---

## 다른 커맨드 예시

### COM3: 자위 (순응도에 따라 다른 메시지)

#### 케이스 1: 순응도(ABL:10) = 0, 반감(PALAM:12) = 100
```typescript
if (A < V) {  // 0 < 100
  this.addMessage('호시미야 케이트에게 자위를 명령해보았지만 거부당했다. 좀 더 지도할 필요가 있다.');
}
```

**화면 출력**:
```
자위
‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥
호시미야 케이트에게 자위를 명령해보았지만 거부당했다. 좀 더 지도할 필요가 있다.
```

#### 케이스 2: 순응도 = 120, 반감 = 100, 소질:35(수치심)
```typescript
if (A > V && A < 50) {  // ❌
} else if (A >= 50 && A < 80) {  // ❌
} else if (A >= 80) {  // ✅ 120 >= 80
  this.addMessage('플레이어가 명령하자 기뻐하며, 호시미야 케이트은 완전히 사육된 암컷의 표정으로 자위를 시작했다.');
}
```

#### 케이스 3: 순응도 = 30, 반감 = 20, 소질:35(수치심), TEQUIP:53(비디오카메라)
```typescript
if (A > V && A < 50) {  // ✅ 30 > 20 && 30 < 50
  let msg = '플레이어가 자위를 명령하자 호시미야 케이트은 ';

  if (talents.includes(35)) {  // 수치심
    msg += '수치심에 귀까지 완전히 빨개져 ';
  }

  if (equipment[53]) {  // 비디오카메라
    msg += '비디오카메라 앞에서 ';
  }

  msg += '자위를 시작했다.';
  this.addMessage(msg);
}
```

**화면 출력**:
```
자위
‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥
플레이어가 자위를 명령하자 호시미야 케이트은 수치심에 귀까지 완전히 빨개져 비디오카메라 앞에서 자위를 시작했다.
```

#### 케이스 4: 연속 자위 중 + 바이브 + 고레벨 능력치
```typescript
const prevcom = ctx.prevCom;  // 3 (이전 커맨드가 자위)
const equipment = ctx.equipment;  // {11: 1} (바이브 장착)
const palam5 = ctx.params[5];  // 6000 (욕정 높음)
const abl0 = ctx.abilities[0];  // 5 (C감각 5)
const abl1 = ctx.abilities[1];  // 5 (B감각 5)
const abl2 = ctx.abilities[2];  // 5 (V감각 5)

if (equipment[11] && abl2 >= 5 && abl0 >= 5 && abl1 >= 5 && palam5 >= 5000 && prevcom === 3) {
  this.addMessage('호시미야 케이트은 애액이 흩날리는 것도 신경쓰지 않고, 바이브를 격렬하게 움직이고 있다.');
  this.addMessage('이제는 다른 일을 신경쓸 여유도 없는 것 같다…');
}
```

**화면 출력**:
```
자위
‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥
플레이어가 명령하자 기뻐하며, 호시미야 케이트은 완전히 사육된 암컷의 표정으로 자위를 시작했다.
호시미야 케이트은 애액이 흩날리는 것도 신경쓰지 않고, 바이브를 격렬하게 움직이고 있다.
이제는 다른 일을 신경쓸 여유도 없는 것 같다…
```

---

## 정리: 메시지가 달라지는 조건들

### COM0 (애무)
1. **의상 상태** (CFLAG:40, CFLAG:42)
   - 특수의상 → "메이드복 너머로"
   - 일반의상 → "교복 너머로"
   - 속옷 → "속옷 너머로"
   - 전라 → 수식어 없음

2. **장비** (TEQUIP)
   - 슬라임(150) → "슬라임이 기어다녔다"
   - 촉수(90) → "촉수가 희롱했다"
   - 수간(89) → "개의 혀가 핥아댔다"
   - 없음 → "열심히 애무했다"

3. **키스 경험** (CFLAG:16)
   - 미경험(-1) → "키스하면서" 문구 제외
   - 경험있음 → "키스하면서" 추가

4. **소질** (TALENT)
   - 미숙함(135) → "미숙한"
   - 미발달(100) → "미발달된"
   - 포동포동(115) → "포동포동하게 살찐"

5. **임신 상태** (TALENT:153, CFLAG:110)
   - 임신중 + 출산 5일 전 → 태동 메시지 추가

### COM3 (자위)
1. **순응도 vs 반감** (ABL:10 vs PALAM:12)
   - A < V → 거부
   - A >= 80 → 완전 사육
   - 50 <= A < 80 → 복종
   - V < A < 50 → 소질별 태도

2. **소질** (TALENT) - V < A < 50 구간
   - 무표정(22) → "무표정한 얼굴로 묵묵히"
   - 겁쟁이(10)/소심(14) → "떨리는 손 끝으로"
   - 반항적(11) → "반항적으로 노려봤지만"
   - 굴욕(12) → "굴욕으로 입술을 깨물고"
   - 수치심(35) → "수치심에 귀까지 완전히 빨개져"

3. **장비** (TEQUIP)
   - 비디오카메라(53) → "비디오카메라 앞에서" 추가

4. **연속 자위 + 고조 상태** (PREVCOM=3 + PALAM:5>=5000 + ABL 높음)
   - 바이브+애널바이브 → "절정이 멈추지 않아"
   - 바이브만 → "애액이 흩날리는"
   - 애널바이브만 → "아누스에 바이브를"
   - 없음 → "손이 멋대로 움직여"

---

## 핵심 포인트

1. **메시지는 단일 문자열이 아니라 조건별로 조합된 결과물**
2. **동일 커맨드도 상태에 따라 완전히 다른 메시지 출력**
3. **여러 줄의 메시지가 순차적으로 추가됨** (`addMessage()` 여러번 호출)
4. **SOURCE 계산과 메시지 생성은 독립적** (SOURCE는 수치, 메시지는 연출)
5. **경험치는 메시지 표시 후 추가로 출력됨**
