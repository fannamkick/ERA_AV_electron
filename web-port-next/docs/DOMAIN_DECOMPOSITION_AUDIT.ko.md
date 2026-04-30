# 도메인 분해 전수 감사

## 기준

| 항목 | 기준 |
| --- | --- |
| 전수 기준 | `original-game/CSV/VariableSize.CSV`의 선언 패밀리 |
| 슬롯 크기 | `1000`, `9999`, `10000`은 예약 용량이지 실제 상태 종류 수가 아님 |
| 슬롯 항목 | `ITEM:24`, `CFLAG:621` 같은 값은 상태 종류가 아니라 특정 패밀리의 항목 |
| 모델 단위 | `GameState.inventory.itemCounts`, `GameState.people.traits`, `GameSession.interaction.sources` 같은 생명주기가 명시된 도메인 상태 패밀리 |

## 전체 패밀리 배정표

| 범주 | ERB 패밀리 | 우리 소유권 | 처리 |
| --- | --- | --- | --- |
| 정적 정의 이름 | `ITEMNAME`, `ABLNAME`, `TALENTNAME`, `EXPNAME`, `MARKNAME`, `PALAMNAME`, `TRAINNAME`, `BASENAME`, `SOURCENAME`, `EXNAME`, `EQUIPNAME`, `TEQUIPNAME`, `FLAGNAME`, `CFLAGNAME`, `TFLAGNAME` | 정의 데이터 | 런타임 상태 아님. 이름/라벨/설명 테이블 |
| 정적 레벨 기준 | `PALAMLV`, `EXPLV` | `definitions.thresholds` | 훈련 파라미터/경험 레벨 경계값 |
| 월드/진행/메타 | `DAY`, `TIME`, `MONEY`, `FLAG`, `PBAND`, `GLOBAL`, `GLOBALS` | `world`, `economy`, `run`, `meta` | 지속 상태. 사용 파일 기준으로 하위 분해 필요 |
| 인벤토리/상점 | `ITEM`, `ITEMSALES`, `BOUGHT`, `NOITEM`, `DITEMTYPE` | `inventory`, `shop`, `settings/legacy` | `ITEM`은 소지 수량, `ITEMSALES`는 `ItemShopView.availableListings` 같은 view 계산값, `BOUGHT`는 상점 세션 선택값. 지속 해금/숨김만 `GameState.shop` |
| 상호작용 참여자/흐름 | `TARGET`, `ASSI`, `MASTER`, `PLAYER`, `ASSIPLAY`, `SELECTCOM`, `PREVCOM`, `NEXTCOM` | `interaction.participants`, `interaction.commandFlow` | 현재 상호작용 세션 상태 |
| 훈련 세션/결과 버퍼 | `TFLAG`, `TEQUIP`, `SOURCE`, `UP`, `DOWN`, `LOSEBASE`, `EJAC`, `EX`, `GOTJUEL`, `NOWEX`, `TCVAR`, `TSTR`, `SAVESTR` | `interaction` | 저장 후보가 아니라 계산 파이프라인. `EQUIP`, `CUP`, `CDOWN`, `DOWNBASE`는 현재 사용 근거가 약하거나 없음 |
| 인물 지속 상태 | `BASE`, `MAXBASE`, `ABL`, `TALENT`, `EXP`, `MARK`, `PALAM`, `JUEL`, `RELATION`, `CFLAG`, `CSTR`, `STAIN` | `people`, `body`, `social` | 캐릭터에 종속되는 상태. `CFLAG`는 하위 도메인 분해 필수 |
| 문자열/출력 버퍼 | `STR`, `RESULTS` | `text`, `scriptScratch` | 대부분 출력/결과 문자열 버퍼. 저장 도메인으로 보지 않음 |
| 지역/계산 변수 | `RESULT`, `COUNT`, `A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`, `Q`, `R`, `S`, `T`, `U`, `V`, `W`, `X`, `Y`, `Z`, `LOCAL`, `LOCALS`, `ARG`, `ARGS`, `DA`, `DB`, `DC`, `DD`, `DE`, `TA`, `TB` | 없음 | 도메인 상태에서 제외 |

## 정의 데이터로 분리할 것

| 원본 | 확인 내용 | 우리 모델 |
| --- | --- | --- |
| `Item.csv` | 아이템 이름/가격/주석. 0~99는 물건/소모품/해금, 100~199는 캐릭터 판매/등장 목록, 200~214는 마술식 아이템 | `definitions.items`, `definitions.shopListings`, 필요하면 `definitions.characterListings` |
| `Abl.csv` | 능력 이름 | `definitions.abilityDefinitions` |
| `BASE.csv` | 체력, 기력, 신체 수치, 연령, 출연료 등 | `definitions.baseStatDefinitions` |
| `Talent.csv` | 소질/특성/상태 플래그 이름 | `definitions.traitDefinitions` |
| `exp.csv` | 경험 종류 | `definitions.experienceDefinitions` |
| `Mark.csv` | 각인 종류 | `definitions.markDefinitions` |
| `Palam.csv` | 쾌감, 윤활, 욕정, 반감 등 훈련 파라미터 | `definitions.trainingParamDefinitions` |
| `Train.csv` | 훈련 커맨드 이름 | `definitions.trainingCommandDefinitions` |
| `CSTR.csv` | 일부 캐릭터 문자열 슬롯 설명 | `definitions.characterTextDefinitions` |
| `source.csv` | SOURCE 의미. 快C, 快V, 情愛, 痛み, 屈従 등 | `definitions.sourceDefinitions` |

## 인물 도메인

| Chara CSV 필드 | ERB 패밀리 | 우리 모델 |
| --- | --- | --- |
| `番号`, `名前`, `呼び名`, `あだ名` | `NO`, `NAME`, `CALLNAME`, `NICKNAME` 조회와 연결 | `people.identity` |
| `基礎` | `BASE`, `MAXBASE` | `people.baseStats` |
| `能力` | `ABL` | `people.abilities` |
| `経験` | `EXP` | `people.experiences` |
| `素質` | `TALENT` | `people.traits` |
| `相性` | `RELATION` | `social.relationships` |
| `フラグ`, `CFLAG` | `CFLAG` | 아래 CFLAG 하위 도메인 |
| `CSTR` | `CSTR` | `people.characterTexts` |

## CFLAG 하위 도메인

| 하위 도메인 | 대표 슬롯 | 의미 |
| --- | --- | --- |
| `people.lifecycle` | `CFLAG:0`, `CFLAG:1`, `CFLAG:28`, `CFLAG:70`, `CFLAG:720` | 특수 캐릭터, 매각/조수 가능, 은퇴, 성전환, 변이 |
| `people.affection` | `CFLAG:2`, `CFLAG:10`, `CFLAG:619`, `CFLAG:620` | 호감도, 조교 횟수, NTR 진행 |
| `people.family` | `CFLAG:21`~`CFLAG:24` | 친족 관계 캐릭터 번호 |
| `body.sexualHistory` | `CFLAG:15`, `CFLAG:16`, `CFLAG:160`~`CFLAG:167`, `CFLAG:820`~`CFLAG:836` | 상실 상대/나이/월/주/장소/상황 |
| `body.reproduction` | `CFLAG:101`~`CFLAG:124`, `CFLAG:109`~`CFLAG:112` | 사정 카운트, 임신, 출산일, 부친, 약물 사용 |
| `body.appearance` | `CFLAG:6`, `CFLAG:36`, `CFLAG:600`~`CFLAG:611` | 음모, 컵, 머리색/머리형/성기/포경 등 |
| `equipment.clothing` | `CFLAG:40`~`CFLAG:49`, `CFLAG:170`~`CFLAG:177` | 착의 비트, 속옷/신발/색/상태 |
| `work.career` | `CFLAG:12`, `CFLAG:13`, `CFLAG:17`, `CFLAG:50`~`CFLAG:54`, `CFLAG:130`, `CFLAG:730`~`CFLAG:734`, `CFLAG:801` | 노역, 매춘/영업, 특수영업, 개인 비디오 실적, 바이트 |
| `feature.progress` | `CFLAG:25`, `CFLAG:613`, `CFLAG:655`, `CFLAG:660`~`CFLAG:684`, `CFLAG:700`~`CFLAG:770` | 미션, 합콘, 레즈/NTR/개인 이벤트, 고용/방문/습관 |
| `settings.character` | `CFLAG:8`, `CFLAG:26`, `CFLAG:60` | 음어 설정, 콘돔 사용 거부, 깨우러 오기 |

## 인벤토리/상점 도메인

| 원본 | 우리 모델 | 설명 |
| --- | --- | --- |
| `ITEMNAME`, `ITEMPRICE` | `definitions.items` | 이름/가격. 저장 상태 아님 |
| `ITEM` | `inventory.itemCounts` | 보유 수량 또는 보유 여부 |
| `ITEMSALES` | `ItemShopView.availableListings` 같은 view 계산값 | 현재 판매/노출 목록. 저장 상태가 아니며, 지속 해금/숨김만 `GameState.shop` |
| `BOUGHT` | `GameSession.shop.selectedItemId` | 구매/사용 중 임시 선택 |
| `NOITEM` | `settings` 또는 `legacy-adapter` | `COMABLE.ERB`에서 아이템 요구를 우회하는 전역 플래그처럼 읽힌다. 쓰기 근거가 없어 mapping 전 보류 |

## 훈련/상호작용 도메인

| 원본 | 우리 모델 | 설명 |
| --- | --- | --- |
| `SELECTCOM`, `PREVCOM`, `NEXTCOM` | `interaction.commandFlow` | 현재/이전/다음 커맨드 |
| `TARGET`, `ASSI`, `MASTER`, `PLAYER`, `ASSIPLAY` | `interaction.participants` | 대상, 조수, 마스터, 플레이어 역할 |
| `TEQUIP` | `interaction.temporaryEquipment` | 현재 장착/삽입/사용 중 장비 |
| `TFLAG` | `interaction.temporaryFlags` | 커맨드 결과, 판정, 메시지 선택 플래그 |
| `SOURCE` | `interaction.sources` | 커맨드가 만든 자극 원천 |
| `UP`, `DOWN` | `interaction.paramDeltas` | `PALAM`에 적용할 증가/감소 예정치 |
| `LOSEBASE` | `interaction.baseLoss` | 체력/기력 감소 예정치 |
| `NOWEX`, `GOTJUEL` | `interaction.resultBuffers` | 현재 훈련 결과 버퍼 |
| `TCVAR`, `TSTR`, `SAVESTR` | `interaction.messageBuffers` | 문장/연출/커맨드 메시지 임시값 |
| `EJAC` | `interaction.derivedThresholds` | 사정 게이지 판정용 계산값 |
| `EX` | `interaction.resultBuffers.climaxCounters` | `SOURCE` 처리에서 증가하고 `TRAIN_MAIN`에서 표시/구슬 계산에 쓰이는 현재 훈련 버퍼 |

## 월드/진행/메타 도메인

| 원본 | 우리 모델 | 설명 |
| --- | --- | --- |
| `DAY`, `TIME` | `run.clock` | 날짜/시간 |
| `MONEY` | `economy.account` | 소지금/부채/평판/누적 매출류 |
| `FLAG` | `run.flags`에서 시작 후 기능별 분해 | 게임 진행/설정/월드 이벤트가 섞임 |
| `PBAND` | `mission.progress`, `clearBonus.progress`, `feature.unlocks` | 미션, 캐릭터 밴드, 클리어 보너스가 섞임 |
| `GLOBAL`, `GLOBALS` | `meta.achievements`, `meta.clearBonuses` | `LOADGLOBAL`/`SAVEGLOBAL`로 회차 밖 상태 |

## 제외 또는 예약 처리

| 원본 | 처리 |
| --- | --- |
| `A`~`Z`, `LOCAL`, `LOCALS`, `ARG`, `ARGS`, `RESULT`, `RESULTS`, `COUNT` | 함수/루프/입력/계산 임시값. 도메인 상태 제외 |
| `STR` | 문자열 버퍼. 정의 데이터 텍스트와 분리 |
| `DA`, `DB`, `DC`, `DD`, `DE`, `TA`, `TB`, `DITEMTYPE` | `VariableSize.CSV`에는 있으나 현재 ERB 직접 사용 근거가 없다. 예약/미사용으로 둔다 |
| `EQUIP`, `CUP`, `CDOWN`, `DOWNBASE` | 선언은 있으나 현재 직접 사용 근거가 약하다. `TEQUIP`, `UP`, `DOWN`, `BASE/MAXBASE`와 혼동 금지 |

## 병렬 조사 교차검증 결과

### CFLAG

| 근거 | 분류 |
| --- | --- |
| `cflag.csv` | 의미가 붙은 슬롯 약 150개 |
| ERB 숫자 `CFLAG` 슬롯 | 보조 문서에 없는 슬롯 포함 |
| 캐릭터 CSV seed와 ERB 전용 슬롯 | 출처가 섞인 패밀리 |
| 도메인 배정 | `people.lifecycle`, `people.affection`, `people.family`, `body.sexualHistory`, `body.reproduction`, `body.appearance`, `equipment.clothing`, `work.career`, `feature.progress`, `settings.character`; 미문서 슬롯은 `needsMapping` |

| 슬롯 | 문제 |
| --- | --- |
| `CFLAG:33` | 보조 문서 설명이 없지만 특수 복장/상태처럼 쓰임 |
| `CFLAG:130` | 특수영업 참가와 강하게 뉴게임 인계가 섞인 혼합 슬롯 |
| `CFLAG:178`~`179` | 의복 교체/복장 백업 계열로 보이나 보조 문서 미기재 |
| `CFLAG:200`~`579` | 구상/대사 영역으로 보이나 세부 슬롯 사전 부족 |
| `CFLAG:627` | 남친 이름 생성 계열로 보이나 별도 확인 필요 |

### FLAG, PBAND, GLOBAL

| 원본 | 분류 |
| --- | --- |
| `FLAG` | `settings`, `run`, `worldEvent`, `shop`, `mission`, `economy`, `clearBonus`가 섞인 패밀리 |
| `PBAND` | 미션 상태, 클리어 보너스, 캐릭터 진행, 임신/해금 게이트 |
| `GLOBAL` | `LOADGLOBAL`/`SAVEGLOBAL` 기반 메타 저장 |
| `GLOBAL:200` 계열 | 클리어 포인트와 캐릭터별 클리어 카운트가 인덱스상 겹치는 `meta.clearBonuses` 후보 |

| 하위 도메인 | 원본 |
| --- | --- |
| `run.calendar` | `DAY`, `TIME`, 일부 `FLAG:1`~`5`, `FLAG:10`, `FLAG:200`~`201` |
| `settings.system` | `FLAG:6`, `7`, `34`~`39`, `60`, `70`~`76`, `80`~`82`, `85`, `140`, `160`, `540`, `549` |
| `economy` | `MONEY`, `MONEY:2`, 목표/매출 관련 `FLAG` |
| `mission.progress` | `PBAND`, `CFLAG:MASTER:770`, 미션 보상 관련 `FLAG` |
| `meta.achievements` | `GLOBAL:achievementId` |
| `meta.clearBonuses` | `GLOBAL:200`, `GLOBAL:(200+characterNo)`, `FLAG:567`~`570`, 일부 `PBAND` |
| `shop.eventProgress` | 시설/접객/유곽/특수영업/캐릭터 구매/AV 판매 관련 `FLAG` |

### TFLAG, TEQUIP, SOURCE 파이프라인

| 원본 | 우리 모델 | 저장 여부 |
| --- | --- | --- |
| `TFLAG` | `interaction.temporaryFlags` | 세션 |
| `TEQUIP` | `interaction.temporaryEquipment` | 세션 |
| `SOURCE` | `interaction.sources` | 세션 계산 |
| `UP`, `DOWN` | `interaction.paramDeltas` | 세션 계산 |
| `LOSEBASE` | `interaction.baseLoss` | 세션 계산 |
| `NOWEX`, `GOTJUEL` | `interaction.resultBuffers` | 적용 전 버퍼 |
| `SAVESTR`, `TSTR`, `TCVAR` | `interaction.messageBuffers` | 메시지 버퍼 |

### Item, Shop, Text

| 원본 | 분류 |
| --- | --- |
| `ITEM` | `itemId -> quantity` 저장 상태 |
| `ITEMNAME`, `ITEMPRICE` | `definitions.items` |
| `ITEMSALES` | `ItemShopView.availableListings` 같은 view 계산값. 저장 상태가 아니며, 지속 해금/숨김만 `GameState.shop` |
| `BOUGHT` | 구매 이력이 아니라 `GameSession.shop`의 현재 상점 선택 상태 |
| `NOITEM` | 아이템 요구 우회 플래그 후보. 쓰기 근거가 없어 `settings`/`legacy-adapter` 보류 |
| `NAME`, `CALLNAME`, `NICKNAME`, `NO`, `CHARANUM`, `SAVEDATA` | 대부분 조회/뷰. 저장 결과만 `people.identity` |
