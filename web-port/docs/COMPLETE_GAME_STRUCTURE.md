# erAV_Ho 완전 게임 구조 문서

**생성 일시**: 2026-01-17
**분석 대상**: erAV_Ho v0.022 (간편개조)
**분석 방법**: TypeScript 변환 파일 정적 분석

---

## 📊 전체 통계

- **총 함수**: 1,511개
- **총 호출 관계**: 1,461개
- **추적된 변수**: 1,270개
- **TypeScript 파일**: 389개
- **ERB 원본 파일**: 372개

---

## 🎮 게임 전체 흐름도

```
프로그램 시작
  ↓
@EVENTFIRST (system_gamestart.ts)
  ├─ 경고 메시지
  ├─ 난이도 선택 (EASY/NORMAL)
  ├─ NTR 설정
  ├─ 클리어 보너스 적용
  ├─ opening() 또는 simple_opening()
  └─ BEGIN SHOP
  ↓
┌──────────────────────────────────┐
│   메인 게임 루프 (SHOP Phase)      │
│                                  │
│  메인 메뉴 (shop_main.ts)         │
│  ┌────────────────────────────┐ │
│  │ [100] 지도한다             │ │ → TRAIN Phase
│  │ [101] 인재 확보            │ │
│  │ [102] 자재 조달            │ │
│  │ [103] 창관 영업            │ │
│  │ [104] AV촬영               │ │
│  │ [105] 아무것도 안한다      │ │ → TURNEND Phase
│  │ [108] 스타일리스트         │ │
│  │ [109] 방문                 │ │
│  │ [111] 능력 표시            │ │
│  │ [112] 능력치업             │ │ → ABLUP Phase
│  │ [113] 캐릭터 정렬          │ │
│  │ [115] 부탁한다             │ │
│  │ [116] 기숙사로 간다        │ │
│  │ [120] 미션                 │ │
│  │ [150] 엔딩으로             │ │ → ENDING
│  │ [200] 세이브               │ │
│  │ [300] 로드                 │ │
│  │ [400] 설정                 │ │
│  │ [500] 실적                 │ │
│  │ [600] 정보                 │ │
│  │ [700] 여배우명부           │ │
│  │ [750] TIPS                 │ │
│  │ [888] 치트                 │ │
│  └────────────────────────────┘ │
└──────────────────────────────────┘
   ↓ (루프)
게임 종료 또는 엔딩
```

---

## 🔀 핵심 시스템 트리

### 1. 훈련 시스템 [100]

```
before_train (shop_main.ts:262)
  ├─ change_target() - 대상 선택
  └─ select_assi() - 조수 선택
  ↓
┌─────────────────────────────────────────┐
│        TRAIN Phase 시작                  │
├─────────────────────────────────────────┤
│                                         │
│ @EVENTTRAIN (train_main.ts:9)           │
│  ├─ 파라미터 초기화                      │
│  └─ pritrain_message()                  │
│                                         │
│ @SHOW_STATUS (train_main.ts:37)         │
│  ├─ 주차/시간 표시                       │
│  ├─ life_bar() - 체력                   │
│  ├─ vital_bar() - 바이탈                │
│  ├─ new_print_palam() - 파라미터        │
│  └─ 절정 횟수                           │
│                                         │
│ @COM_ABLE (comable.ts - 148KB)          │
│  ├─ com_able0() - com0 가능?            │
│  ├─ com_able1() - com1 가능?            │
│  ├─ ...                                 │
│  └─ com_able92() - com92 가능?          │
│    │                                    │
│    │ (각 com_able 함수 내부)             │
│    ├─ abilities 체크                    │
│    ├─ talents 체크                      │
│    ├─ params 체크                       │
│    ├─ cflags 체크                       │
│    └─ return true/false                │
│                                         │
│ @SHOW_USERCOM                           │
│  ├─ 가능한 커맨드 표시                   │
│  └─ 유저 입력                           │
│                                         │
│ ┌───────────────────────────────┐      │
│ │ 유저 선택: com{번호}           │      │
│ └───────────────────────────────┘      │
│  ↓                                      │
│ @COM{번호} (comf0.ts ~ comf92.ts)       │
│  ├─ READ: abilities, talents, params   │
│  ├─ 조건 판정                           │
│  ├─ WRITE: params (쾌감 증가)           │
│  ├─ WRITE: exp (경험치)                │
│  ├─ train_message_a/b()                │
│  └─ WRITE: flags                       │
│                                         │
│ @SOURCE_CHECK (source.ts)               │
│  ├─ params 임계값 체크                  │
│  ├─ 절정 판정                           │
│  ├─ source 업데이트 (애액/사정)         │
│  └─ 메시지                              │
│                                         │
│ @EVENTCOMEND                            │
│  └─ 커맨드 후 처리                      │
│                                         │
└─────────────────────────────────────────┘
  ↓
@AFTERTRAIN Phase
  ├─ charadead_check() - 사망 체크
  ├─ self_check() - 자위 체크
  ├─ aftertrain_sex_check() - 섹스 후
  └─ aftertrain_analsex_check() - 항문 후
  ↓
ABLUP Phase (선택 시)
  ↓
TURNEND Phase
```

**93개 커맨드 카테고리**:
- **0-10**: 기본 애무 (C/B/V/A감각, 전신, 키스 등)
- **11-30**: 성행위 (정상위, 후배위, 기승위, 입으로, 파이즈리 등)
- **31-60**: 특수/도구/BDSM
- **61-92**: 3P/난교/수간/촉수/극단적 플레이

### 2. 창관 영업 시스템 [103]

```
yuukaku_top (shop_yuukaku.ts:9)
  ├─ READ: character.cflags[COUNT]
  ├─ WRITE: ctx.flags[546]
  │
  ├─ chara_sale() - 여배우 판매
  │  ├─ estimate_chara() - 가격 산정
  │  ├─ sale_chara() - 판매 실행
  │  └─ event_sell_after() - 판매 후
  │
  ├─ work_reception() - 접객 업무
  │  └─ reception_main()
  │     └─ reception_main2()
  │        ├─ 손님 타입 결정
  │        ├─ 수익 계산
  │        └─ 경험치 증가
  │
  ├─ work_normal() - 일반 매춘
  │  └─ soup_work() - 스프 업소
  │     ├─ 손님 상대
  │     ├─ params 변화
  │     └─ 수익 발생
  │
  ├─ work_special() - 특수 업무
  │  ├─ lunch_stall() - 도시락 판매
  │  ├─ concert() - 콘서트
  │  ├─ orgy() - 난교
  │  ├─ strip() - 스트립
  │  └─ v_auction() - 처녀 경매
  │
  └─ yuukaku_labo() - 시설 관리
     └─ facilities_check()
```

### 3. AV 촬영 시스템 [104]

```
av_top (shop_av.ts:9)
  ├─ READ: ctx.masterBase[60]
  ├─ READ: ctx.abilities[COUNT]
  │
  ├─ av_calc() - 촬영 수익 계산
  │  ├─ 캐릭터 능력 평가
  │  ├─ 장르별 가산점
  │  └─ WRITE: ctx.flags[505,506]
  │
  ├─ videosale_print() - 판매량 표시
  │  └─ WRITE: ctx.flags[560]
  │
  └─ chara_select_av() - 촬영 캐릭터 선택
     └─ av_list()
        └─ av_choose() - 장르 선택
           ├─ 정상 플레이
           ├─ 하드 플레이
           ├─ 레즈비언
           ├─ 3P/난교
           ├─ 수간
           └─ 촉수
```

### 4. 능력치업 시스템 [112]

```
ability_up (shop_main.ts:828)
  ├─ estimate_chara() - 캐릭터 평가
  ├─ show_info_exp() - 경험치 표시
  ├─ show_juel() - 구슬(재화) 표시
  │
  ├─ show_ablup_select() - 능력 선택
  │  └─ decide_ablup{번호}()
  │
  ├─ ablup{0-99}() - 능력별 업그레이드
  │  ├─ READ: abilities, talents
  │  ├─ 조건 체크
  │  ├─ WRITE: abilities[INDEX] += 1
  │  ├─ WRITE: juel[INDEX] -= cost
  │  └─ 메시지 출력
  │
  ├─ jujun_up_check() - 순종 상승 체크
  ├─ yokubo_up_check() - 욕망 상승 체크
  ├─ check_sellassiable() - 매각 가능 체크
  ├─ check_specialskil() - 특수 스킬 체크
  │
  └─ aut_lvupper() - 자동 레벨업
     ├─ aut_c_0() → decide_ablup0()
     ├─ aut_b_0() → decide_ablup1()
     ├─ aut_v_0() → decide_ablup2()
     ├─ aut_a_0() → decide_ablup3()
     └─ ... (각 능력별)
```

### 5. TURNEND Phase [105]

```
@EVENTTURNEND (event_turnend.ts:9)
  ├─ check_sellassiable() - 매각 체크
  ├─ check_specialskil() - 특수 스킬
  ├─ in_vagina_all() - 질내사정 처리
  ├─ conception_check_all() - 임신 체크
  ├─ characlear_calc() - 캐릭터 클리어 판정
  ├─ resttime() - 휴식/회복
  ├─ ovulation_calc() - 배란 계산
  ├─ vaginaform_change() - 질 변화
  ├─ public_hair() - 음모 처리
  ├─ kill_target() - 사망 캐릭터 처리
  │
  ├─ (TIME === 1일 때 - 후반)
  │  ├─ yuukaku_result() - 창관 결과
  │  ├─ event_nextday() → 다음 날
  │  ├─ event_scout() - 스카우트
  │  ├─ idol_produce_calc() - 아이돌 프로듀스
  │  │
  │  ├─ (NTR 이벤트 - flags[540] === 0)
  │  │  ├─ badboy_rape_calc() - 불량배 강간
  │  │  ├─ event_molester() - 치한
  │  │  ├─ compa_start() - 합동 컴파
  │  │  ├─ event_boyfriend() - 남자친구
  │  │  ├─ event_lookschange() - 외모 변화
  │  │  ├─ ntr_staff_begin() - 스태프 NTR
  │  │  └─ base_ntr_staff() - 베이스 NTR
  │  │
  │  ├─ blackgirl_event() - 흑인녀 이벤트
  │  ├─ event_bgsex() - BG 섹스
  │  ├─ auto_buying() - 자동 구매
  │  └─ auto_itemuse() - 자동 아이템 사용
  │
  └─ @NEXTDAY (event_nextday.ts)
     ├─ DAY += 1 - 날짜 증가
     ├─ TIME 토글 (전반 ↔ 후반)
     ├─ event_newday() - 새 날 이벤트
     ├─ running_cost() - 운영비
     ├─ event_morasi() - 요실금
     ├─ event_youji() - 유아화
     ├─ event_himan() - 비만
     ├─ event_yaseru() - 체중 감소
     ├─ event_juniorhighschool() - 중학생 이벤트
     ├─ event_highschool() - 고등학생 이벤트
     ├─ event_noroi() - 저주
     ├─ sometimes_she_comes_back() - 부활
     ├─ onesho() - 오줌싸개
     ├─ night_stalking_check() - 야간 강간
     ├─ morning_cowgirl() - 아침 기승위
     └─ event_nextmonth() - 다음 달
        ├─ 임신 진행
        ├─ 출산 체크
        └─ 특수 이벤트
```

---

## 📈 주요 변수 사용 통계

### Top 30 변수 (읽기 + 쓰기)

| 순위 | 변수 | 읽기 | 쓰기 | 합계 | 용도 |
|------|------|------|------|------|------|
| 1 | `ctx.locals[0]` | 707 | 580 | 1287 | 로컬 변수 (범용) |
| 2 | `ctx.abilities[10]` | 258 | 652 | 910 | 순종 능력치 |
| 3 | `character.cflags[ctx.count]` | 724 | 0 | 724 | 캐릭터 플래그 (루프) |
| 4 | `ctx.params[5]` | 680 | 0 | 680 | 욕정 파라미터 |
| 5 | `ctx.params[0]` | 689 | 0 | 689 | 쾌C 파라미터 |
| 6 | `character.source[7]` | 236 | 113 | 349 | 애액 |
| 7 | `character.cflags[42]` | 48 | 298 | 346 | 임신 관련 |
| 8 | `character.cstr[character]` | 342 | 0 | 342 | 캐릭터 이름 |
| 9 | `ctx.params[3]` | 333 | 6 | 339 | 윤활 |
| 10 | `character.source[3]` | 190 | 141 | 331 | 정액 |
| 11 | `ctx.exp[0]` | 218 | 105 | 323 | C감각 경험치 |
| 12 | `ctx.abilities[2]` | 117 | 201 | 318 | V감각 능력치 |
| 13 | `ctx.abilities[0]` | 82 | 229 | 311 | C감각 능력치 |
| 14 | `ctx.base[1]` | 36 | 273 | 309 | 베이스 데이터 |
| 15 | `ctx.abilities[17]` | 132 | 161 | 293 | 노출벽 |
| 16 | `ctx.abilities[ctx.player]` | 289 | 0 | 289 | 플레이어 능력 |
| 17 | `character.cflags[170]` | 106 | 181 | 287 | 특수 플래그 |
| 18 | `ctx.abilities[3]` | 98 | 187 | 285 | A감각 능력치 |
| 19 | `ctx.abilities[11]` | 217 | 543 | 760 | 욕망 능력치 |
| 20 | `ctx.params[1]` | 680 | 0 | 680 | 쾌V 파라미터 |

### 변수 카테고리별 분류

#### 1. Context 변수 (ctx.*)

**능력치 (abilities)**:
- `abilities[0-3]`: C/B/V/A 감각 (4대 기본 감각)
- `abilities[10]`: 순종
- `abilities[11]`: 욕망
- `abilities[12]`: 기교
- `abilities[13-20]`: 특수 능력

**파라미터 (params)**:
- `params[0-2]`: 쾌C, 쾌V, 쾌A
- `params[3]`: 윤활
- `params[4]`: 온순
- `params[5]`: 욕정
- `params[6]`: 굴복
- `params[7-14]`: 기타 감정

**경험치 (exp)**:
- `exp[0-99]`: 각 능력의 경험치 (2D 배열)

**플래그 (flags)**:
- `flags[0-1000]`: 전역 게임 플래그

#### 2. Character 변수 (character.*)

**캐릭터 플래그 (cflags)**:
- `cflags[0-999]`: 캐릭터별 상태/이벤트 플래그
- `cflags[40]`: 의상
- `cflags[42]`: 임신 상태
- `cflags[170]`: 특수 상태

**소스 (source)**:
- `source[0-7]`: 체액 (정액, 애액, 모유 등)

**마크 (mark)**:
- `mark[0-5]`: 신체 마킹 (문신, 피어싱 등)

**소질 (talents)**:
- 캐릭터 고유 특성

---

## 🔍 데이터 흐름 추적

### 예시 1: 커맨드 실행 → 능력 상승

```
유저: com0 (C감각 애무) 선택
  ↓
com_able0()
  ├─ READ: abilities[0] (현재 C감각 레벨)
  ├─ READ: talents[74] (처녀 여부)
  ├─ READ: character.cflags[40] (의상)
  └─ return true (사용 가능)
  ↓
com0()
  ├─ READ: abilities[0] (애무 효과 계산)
  ├─ WRITE: params[0] += 100 (쾌C 증가)
  ├─ WRITE: params[5] += 50 (욕정 증가)
  └─ WRITE: exp[0][1] += 5 (C감각 경험치)
  ↓
source_check()
  ├─ READ: params[0] (절정 체크)
  ├─ if params[0] >= 1000:
  │  ├─ WRITE: params[0] = 0 (리셋)
  │  ├─ WRITE: character.source[7] += 50 (애액)
  │  └─ orgasmCount[0] += 1
  ↓
eventturnend()
  ├─ resttime()
  │  └─ WRITE: params[*] -= decay (파라미터 감소)
  ↓
ability_up() (유저가 선택 시)
  ├─ READ: exp[0][1] (현재 경험치)
  ├─ if exp[0][1] >= threshold:
  │  ├─ WRITE: abilities[0] += 1 (레벨업!)
  │  └─ WRITE: exp[0][1] = 0 (리셋)
```

### 예시 2: 임신 시스템

```
com11() (정상위) 실행
  ├─ WRITE: character.tflags[NAKADASHI] = 1
  └─ WRITE: character.source[3] += 100 (정액)
  ↓
eventturnend()
  ├─ in_vagina_all()
  │  ├─ READ: character.tflags[NAKADASHI]
  │  └─ if tflags[NAKADASHI]:
  │     └─ WRITE: character.cflags[SEMEN_IN_VAGINA] = 1
  │
  ├─ conception_check_all()
  │  ├─ READ: character.cflags[SEMEN_IN_VAGINA]
  │  ├─ READ: character.cflags[OVULATION] (배란일 체크)
  │  ├─ READ: talents[74] (처녀는 임신 확률 낮음)
  │  ├─ if rand() < pregnancy_chance:
  │  │  └─ WRITE: character.cflags[42] = 1 (임신!)
  │
  └─ ovulation_calc()
     └─ WRITE: character.cflags[OVULATION] (배란 주기)
  ↓
event_nextmonth() (매달)
  ├─ READ: character.cflags[42]
  ├─ if cflags[42] === 1:
  │  ├─ WRITE: character.cflags[PREGNANCY_MONTH] += 1
  │  └─ if cflags[PREGNANCY_MONTH] >= 10:
  │     └─ child_birth()
  │        ├─ WRITE: character.cflags[42] = 0
  │        └─ WRITE: ctx.childCount += 1
```

### 예시 3: NTR 이벤트 발생

```
eventturnend() (TIME === 1, 후반)
  ├─ READ: ctx.flags[540] (NTR 설정)
  ├─ if flags[540] === 0: (NTR ON)
  │
  ├─ badboy_rape_calc()
  │  ├─ READ: character.cflags[COUNT]
  │  ├─ READ: ctx.talents[122] (순결)
  │  ├─ if rand() < chance && !talents[122]:
  │  │  ├─ WRITE: character.cflags[NTR_FLAG] = 1
  │  │  └─ event_rape()
  │
  ├─ event_boyfriend()
  │  ├─ READ: character.cflags[619] (남자친구 호감도)
  │  ├─ WRITE: character.cflags[619] += rand(5)
  │  ├─ if cflags[619] > threshold:
  │  │  └─ WRITE: character.cflags[BOYFRIEND] = 1
  │
  └─ ntr_staff_begin()
     ├─ READ: character.cflags[STAFF_TARGET]
     └─ if staff_interested:
        └─ WRITE: character.cflags[NTR_STAFF] = 1
```

---

## 🎯 엔딩 조건

```
메인 메뉴 [150] 엔딩으로
  ↓
ending_check_2()
  ├─ READ: ctx.flags[5] (난이도)
  ├─ READ: ctx.money (현재 포인트)
  ├─ READ: ctx.flags[4] (목표 금액)
  │
  ├─ if flags[5] != 9 && money >= flags[4]:
  │  ├─ 목표 달성!
  │  └─ normal_end_01() ~ normal_end_XX()
  │
  ├─ else if DAY > flags[3]: (기한 초과)
  │  └─ bad_end()
  │
  └─ else:
     └─ "아직 목표 미달성"
```

---

## 📝 핵심 파일 목록

### System (시스템)
- `shop_main.ts` - 메인 메뉴 (usershop, before_train, ability_up)
- `shop_charabuy.ts` - 캐릭터 고용
- `shop_yuukaku.ts` - 창관 영업
- `system_gamestart.ts` - 게임 시작 (eventfirst)
- `system_source*.ts` - 결과 처리 (source_check)
- `info.ts` - 정보 표시
- `sell_chara.ts` - 캐릭터 매각

### Training (훈련)
- `train_main.ts` - 훈련 메인 (eventtrain, show_status)
- `comable.ts` (148KB) - 커맨드 가용성 체크 (93개)
- `comf0.ts ~ comf92.ts` - 커맨드 구현 (93개)
- `train_auto.ts` - 자동 훈련
- `comseq_register.ts` - 커맨드 시퀀스

### Events (이벤트)
- `opening.ts` - 오프닝
- `ending.ts` - 엔딩
- `event_beforetrain.ts` - 훈련 전 (pritrain_message)
- `event_aftertrain.ts` - 훈련 후 (charadead_check, sex_check)
- `event_turnend.ts` - 턴 종료 (eventturnend, resttime)
- `event_nextday.ts` - 다음 날 (event_nextday, nextmonth)
- `event_pregnancy.ts` - 임신 시스템
- `event_train_message_a/b.ts` - 훈련 메시지 (~200KB)

### Abilities (능력)
- `abl.ts` - 능력 표시 (show_juel, show_ablup_select)
- `ablup0.ts ~ ablup99.ts` - 능력 업그레이드 (100개)
- `abl_auto.ts` - 자동 레벨업

### Filming (촬영)
- `shop_av.ts` - AV 촬영 메인
- `other_calc.ts` - 수익 계산 (av_calc)

### Brothel (창관)
- `work_reception.ts` - 접객
- `work_s_*.ts` - 특수 업무 (strip, orgy, concert, auction)

### Visits (방문)
- `houmon.ts` - 캐릭터 방문
- `*_mission_detail.ts` - 미션
- `*_labo.ts` - 시설

---

## 🔧 확장 가이드

### 새 커맨드 추가하기

1. **커맨드 파일 생성**: `comf93.ts`
```typescript
export async function com93(ctx: TrainingContext, character: Character): Promise<void> {
  // 로직 구현
  ctx.params[0] += 100;
  await train_message_a(ctx, character);
}
```

2. **가용성 체크 추가**: `comable.ts`
```typescript
export async function com_able93(ctx: TrainingContext, character: Character): Promise<boolean> {
  if (ctx.abilities[0] < 5) return false;
  return true;
}
```

3. **메뉴에 등록**: `train_main.ts` - SHOW_USERCOM
```typescript
ctx.showMessage('[93] - 새 커맨드');
```

4. **CSV 데이터 추가**: 커맨드 설명

### 새 능력 추가하기

1. **능력 업그레이드 파일**: `ablup100.ts`
```typescript
export async function ablup100(ctx: TrainingContext, character: Character): Promise<void> {
  if (ctx.juel[100] < cost) return;

  ctx.abilities[100] += 1;
  ctx.juel[100] -= cost;
  ctx.showMessage('새 능력이 상승했습니다!');
}
```

2. **CSV 추가**: `Abl.csv`
```
100,새능력
```

3. **능력 선택 메뉴**: `show_ablup_select`에 등록

---

## 📚 참고 문서

- [GAME_TREE.md](GAME_TREE.md) - 전체 함수 호출 트리
- [TRAINING_SYSTEM_TREE.md](TRAINING_SYSTEM_TREE.md) - 훈련 시스템 상세
- [GAME_ARCHITECTURE.md](GAME_ARCHITECTURE.md) - 모듈 구조
- [ERB_PARSING.md](ERB_PARSING.md) - 파싱 규칙
- `game_structure.json` - 분석 원본 데이터 (1511 함수, 1461 호출, 1270 변수)

---

**생성 방법**: Python 정적 분석 (`trace_game_tree.py`)
**완전성**: 100% (모든 TS 파일 분석 완료)
**정확도**: 정적 분석 기반, 동적 호출 일부 제외
**업데이트**: 코드 변경 시 재분석 권장
