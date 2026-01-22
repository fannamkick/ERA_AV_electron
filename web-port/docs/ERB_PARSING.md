# ERB → TypeScript 변환 문서

## 개요

erAV_Ho의 ERB 파일들을 TypeScript로 자동 변환하여 로직을 이해하고 참고할 수 있도록 합니다.

**목적**:
- ERB 원본 로직을 TypeScript 형태로 변환하여 가독성 향상
- 게임 재구현 시 참고 자료로 활용
- 완벽한 실행 가능한 코드가 아닌, **로직 이해를 위한 변환**

## 변환 현황

### 전체 통계
- **변환된 파일**: 372개 ERB → 389개 TypeScript
- **초기 컴파일 에러**: 31,901개
- **현재 컴파일 에러**: 95개 (99.7% 감소)
- **상태**: 대부분의 로직 읽기 가능, 일부 특수 구문 미완성

### 파일 구조

```
web-port/src/modules/
├── abilities/generated/       # 능력 상승 (ABLUP*.ERB)
├── achievements/generated/    # 업적 시스템
├── brothel/generated/         # 매춘관/일 시스템
├── builtin/generated/         # 내장 함수들
├── clear_bonus/generated/     # 클리어 보너스
├── events/generated/          # 이벤트 (오프닝, 엔딩, 턴 등)
├── filming/generated/         # AV 촬영 시스템
├── missions/generated/        # 캐릭터별 미션
├── system/generated/          # 시스템 (상점, 세이브, 캐릭터 정보 등)
├── tips/generated/            # 게임 내 팁
├── training/                  # 훈련 시스템
│   └── commands/generated/    # 92개 훈련 커맨드 (COMF0~92)
├── unknown/generated/         # 미분류 (아르바이트, 아이돌 등)
└── visits/generated/          # 방문/상담 시스템
```

## 변환 도구

### 메인 변환기: `tools/convert_all.py`

핵심 클래스: `CompleteERBConverter`

#### 주요 변환 패턴

##### 1. 2D 배열
```erb
; ERB
EXP:COUNT:K
ABL:LOCAL:22
CFLAG:TARGET:1

; TypeScript
ctx.exp[ctx.count][K]
ctx.abilities[ctx.locals[0]][22]
character.cflags[ctx.target][1]
```

##### 2. 1D 배열
```erb
; ERB
TALENT:74
FLAG:100
PALAM:0
ITEM:5

; TypeScript
ctx.talents[74]
ctx.flags[100]
ctx.params[0]
ctx.item[5]
```

##### 3. 단일 변수
```erb
; ERB
COUNT
MASTER
MONEY
BOUGHT

; TypeScript
ctx.count
ctx.master
ctx.money
ctx.bought
```

##### 4. 문자열 보간
```erb
; ERB - %VAR% 패턴
PRINTFORM %NAME:TARGET%는 기분이 좋다

; TypeScript
ctx.showMessage(`${ctx.getName(ctx.target)}는 기분이 좋다`);
```

```erb
; ERB - {VAR} 패턴
PRINTFORM 경험치: {EXP:COUNT:K}

; TypeScript
ctx.showMessage(`경험치: ${ctx.exp[ctx.count][K]}`);
```

```erb
; ERB - 혼합 패턴
CSTR:COUNT:1 = %VAR1% %VAR2%(한글)%VAR3%

; TypeScript
character.cstr[ctx.count][1] = `${ctx.var1} ${ctx.var2}(한글)${ctx.var3}`;
```

##### 5. @"문자열" 리터럴
```erb
; ERB
RESULTS:0 += @"{DAY+1}주차・전반"

; TypeScript
ctx.results[0] += `${ctx.day + 1}주차・전반`;
```

##### 6. 조건문
```erb
; ERB
IF FLAG:100 == 1
    PRINTL 성공
ELSEIF FLAG:100 == 0
    PRINTL 실패
ENDIF

; TypeScript
if (ctx.flags[100] === 1) {
  ctx.printLine('성공');
} else if (ctx.flags[100] === 0) {
  ctx.printLine('실패');
}
```

##### 7. 반복문
```erb
; ERB
FOR LOCAL, 0, 10
    PRINTL {LOCAL}번째
NEXT

; TypeScript
for (let ctx.locals[0] = 0; ctx.locals[0] < 10; ctx.locals[0]++) {
  ctx.printLine(`${ctx.locals[0]}번째`);
}
```

##### 8. 함수 정의
```erb
; ERB
@OPENING
    PRINTL 오프닝 시작
    RETURN

; TypeScript
export async function opening(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.printLine('오프닝 시작');
  return;
}
```

##### 9. 연산자 변환
```erb
; ERB
삼항 연산자: ? #
XOR: ^^
증감: VAR++, VAR--

; TypeScript
삼항 연산자: ? :
XOR: ^
증감: var++, var--
```

##### 10. 특수 함수
```erb
; ERB
VARSET TCVAR:TARGET, 0
ARRAYSET LOCAL, 1, 2, 3

; TypeScript
ctx.varSet(character.cvar[ctx.target], 0);
ctx.arraySet(ctx.locals[0], 1, 2, 3);
```

## 변환 실행 방법

### 전체 파일 변환
```bash
cd web-port/tools
python convert_all_erb.py
```

### 단일 파일 변환
```bash
python convert_all.py "경로\파일.ERB"
```

### 빌드 확인
```bash
cd web-port
npm run build
```

## 주요 변환 규칙

### 변수명 매핑

| ERB | TypeScript | 설명 |
|-----|------------|------|
| `ARG:N` | `ctx.args[N]` | 함수 인자 |
| `LOCAL:N` | `ctx.locals[N]` | 로컬 변수 |
| `RESULT` | `ctx.result` | 결과값 |
| `TARGET` | `ctx.target` | 대상 캐릭터 |
| `MASTER` | `ctx.master` | 마스터 번호 |
| `PLAYER` | `ctx.player` | 플레이어 번호 |
| `COUNT` | `ctx.count` | 카운터 |
| `TALENT:N` | `ctx.talents[N]` | 소질 |
| `FLAG:N` | `ctx.flags[N]` | 플래그 |
| `ABL:N` | `ctx.abilities[N]` | 능력치 |
| `EXP:N` | `ctx.exp[N]` | 경험치 |
| `PALAM:N` | `ctx.params[N]` | 파라미터 |
| `JUEL:N` | `ctx.juel[N]` | 구슬 |
| `CFLAG:T:N` | `character.cflags[T][N]` | 캐릭터 플래그 |
| `TFLAG:T:N` | `character.tflags[T][N]` | 캐릭터 소질 플래그 |

### 함수 매핑

| ERB | TypeScript | 설명 |
|-----|------------|------|
| `PRINTL` | `ctx.printLine()` | 줄 출력 |
| `PRINTFORM` | `ctx.showMessage()` | 포맷 출력 |
| `INPUT` | `await ctx.input()` | 입력 대기 |
| `DRAWLINE` | `ctx.drawLine()` | 구분선 |
| `WAIT` | `await ctx.wait()` | 대기 |
| `RAND:N` | `ctx.random(N)` | 난수 생성 |
| `GETNUM` | `await ctx.getNumber()` | 숫자 입력 |

## 미완성 부분

다음 ERB 구문들은 TODO 주석으로 표시됩니다:

1. **CALL 문** - 함수 호출 (인자 처리 복잡)
   ```typescript
   // TODO: CALL FUNCTION,ARG1,ARG2
   await function(ctx, character);
   ```

2. **TRYCCALLFORM/CATCH** - 예외 처리
   ```typescript
   // TODO: TRYCCALLFORM FUNC_{NO:ARG},ARG:1
   // TODO: CATCH
   // TODO: ENDCATCH
   ```

3. **PRINTW** - 특수 출력
   ```typescript
   // TODO: PRINTW
   ```

4. **SIF/SKIPSTART** - 조건부 스킵
   ```typescript
   // TODO: SIF condition
   // TODO: SKIPSTART
   ```

## 사용 예시

### 오프닝 이벤트 참고
```typescript
// src/modules/events/generated/opening.ts
export async function opening(ctx: TrainingContext, character: Character) {
  ctx.drawLine();
  ctx.showMessage('교통사고로 부모를 잃고...');
  ctx.showMessage(`${ctx.getName(ctx.master)}의 집에...`);
  // ...
  await ctx.wait();
}
```

이를 참고하여 실제 게임 구현:
```typescript
// src/events/opening.ts (새로 작성)
export class OpeningEvent {
  async run(game: GameState) {
    await game.ui.showDialog([
      '교통사고로 부모를 잃고...',
      `${game.master.name}의 집에...`
    ]);
  }
}
```

### 훈련 커맨드 참고
```typescript
// src/modules/training/commands/generated/comf0.ts
export async function comf0(ctx: TrainingContext, character: Character) {
  if (character.cflags[0][25] === 0) {
    ctx.printLine('첫 경험입니다');
  }
  // 로직...
}
```

실제 구현 시 참고:
```typescript
// src/training/commands/command0.ts (새로 작성)
export class Command0 implements TrainingCommand {
  canExecute(char: Character): boolean {
    return char.flags.get('first_time') === false;
  }

  async execute(char: Character): Promise<void> {
    // comf0.ts의 로직 참고하여 구현
  }
}
```

## 변환기 개선 이력

### v1.0 (2025-01-16)
- ✅ 기본 변수/배열 패턴
- ✅ 조건문, 반복문
- ✅ 함수 정의

### v1.1
- ✅ 2D 배열 (EXP:COUNT:K, ABL:LOCAL:22)
- ✅ 문자열 템플릿 혼합 패턴
- ✅ @"문자열" 리터럴
- ✅ 단일 문자 배열 (T, N, A, I, U)
- ✅ 삼항/XOR/증감 연산자
- ✅ VARSET/ARRAYSET 인자 변환
- ✅ ISASSI, ITEM, MONEY, BOUGHT 변수

### 미완성 (실제 구현 시 수동 처리)
- ⏸️ CALL 문 완벽한 변환
- ⏸️ TRYCCALLFORM/CATCH
- ⏸️ PRINTW
- ⏸️ 일부 복잡한 매크로

## 주의사항

1. **컴파일 에러가 있어도 정상**
   - 95개 에러는 특수 구문 미완성
   - 대부분의 로직은 읽기 가능

2. **실행 불가능**
   - 변환된 코드는 참고용
   - 실제 게임은 새로운 구조로 구현

3. **수동 수정 금지**
   - generated/ 폴더는 자동 생성
   - 수정사항은 convert_all.py에 반영

4. **원본 ERB 우선**
   - 불확실한 경우 원본 ERB 확인
   - 변환 코드는 보조 자료

## 다음 단계

변환된 코드를 참고하여:
1. 게임 아키텍처 설계
2. 상태 관리 구조 정의
3. UI 컴포넌트 설계
4. 핵심 시스템부터 순차 구현

## 참고 파일

- `tools/convert_all.py` - 메인 변환기
- `tools/convert_all_erb.py` - 전체 파일 변환 스크립트
- `ERB/` - 원본 ERB 파일들
- `src/modules/*/generated/` - 변환된 TypeScript 파일들
