# 도메인 상태 패밀리 검토

## 핵심 정정

| 항목 | 정정 |
| --- | --- |
| `VariableSize.CSV`의 `1000`, `9999`, `10000` | 실제 변수가 1000개라는 뜻이 아니라 엔진이 각 배열형 변수에 예약한 슬롯 수 |
| `ITEM:24` 같은 슬롯 | 모델 단위가 아니라 특정 패밀리의 항목 |
| 도메인 상태 패밀리 | `GameState.inventory.itemCounts`, `GameState.people.attributes.abilities`, `GameSession.interaction.temporaryEquipment`처럼 생명주기가 명시된 단위 |

## 확인한 근거

| 근거 | 확인 내용 |
| --- | --- |
| `original-game/CSV/VariableSize.CSV` | ERB 엔진 변수 패밀리와 배열 크기 |
| `original-game/CSV/Item.csv` | 아이템/상점 정의 데이터 |
| `original-game/CSV/Abl.csv`, `BASE.csv`, `Talent.csv`, `exp.csv`, `Mark.csv`, `Palam.csv`, `Train.csv`, `CSTR.csv` | 이름이 붙은 정의 데이터 |
| `original-game/CSV/Chara*.csv` | 캐릭터별 초기 상태 |
| `Ho版資料（作成中途）/cflag.csv`, `source.csv` | CFLAG/SOURCE 의미 일부를 설명하는 보조 자료 |
| `original-game/ERB/**/*.ERB` | 실제 읽기/쓰기 사용처 |

## 정의 데이터

| 원본 | 우리 모델 | 근거 |
| --- | --- | --- |
| `Item.csv` | `definitions.items`, `definitions.shopListings` | 이름/가격/주석이 있는 판매 대상 정의 |
| `Abl.csv` | `definitions.abilityDefinitions` | 능력 이름 |
| `BASE.csv` | `definitions.baseStatDefinitions` | 체력, 기력, 외견연령, 신체 수치 등 |
| `Talent.csv` | `definitions.traitDefinitions` | 소질/특성/상태 플래그 이름 |
| `exp.csv` | `definitions.experienceDefinitions` | 경험 종류 |
| `Mark.csv` | `definitions.markDefinitions` | 각인 종류 |
| `Palam.csv` | `definitions.trainingParamDefinitions` | 쾌감, 윤활, 온순, 욕정 등 |
| `Train.csv` | `definitions.trainingCommands` | 훈련 커맨드 이름 |
| `source.csv` | `definitions.sourceDefinitions` | SOURCE 슬롯 의미 |

## 인물 도메인

| 원본 | 우리 모델 | 성격 |
| --- | --- | --- |
| `番号`, `名前`, `呼び名`, `あだ名` | `people.identity` | 캐릭터 식별/표시명 |
| `BASE`, `MAXBASE` | `people.baseStats` | 체력, 기력, 연령, 신체 수치, 출연료 등 |
| `ABL` | `people.abilities` | 감각, 신뢰, 욕망, 기교, 지식 등 |
| `TALENT` | `people.traits` | 처녀/성격/상태/특수 소질 |
| `EXP` | `people.experiences` | 누적 경험 |
| `RELATION` | `people.relationships` | 대상 캐릭터별 호감/상성 계열 |
| `CFLAG` | `people.characterFlags` | 인물별 진행/상태 플래그. 단일 플래그 백으로 두면 안 되고 하위 도메인 분해 필요 |
| `CSTR` | `people.characterTexts` | 인물별 문자열 상태 |

## 신체/훈련 결과 도메인

| 원본 | 우리 모델 | 성격 |
| --- | --- | --- |
| `PALAM` | `body.conditionParams` | 현재 누적된 쾌감/욕정/반감 등 상태 파라미터 |
| `JUEL` | `body.trainingResources` | 훈련 후 획득/소비되는 구슬류 자원 |
| `MARK` | `body.imprints` | 고통각인, 쾌락각인 등 |
| `STAIN` | `body.contamination` | 신체 부위별 오염/액체 부착 비트셋 |

## 인벤토리/상점 도메인

| 원본 | 우리 모델 | 성격 |
| --- | --- | --- |
| `ITEMNAME`, `ITEMPRICE` | `definitions.items` | 아이템 이름/가격 정의 |
| `ITEM` | `inventory.itemCounts` | 보유 수량 또는 보유 여부 |
| `ITEMSALES` | `ItemShopView.availableListings` 같은 view 계산값 | 현재 상점 진입 시 계산되는 판매/노출 목록. 저장 상태가 아니며, 지속 해금/숨김만 `GameState.shop` |
| `BOUGHT` | `GameSession.shop.selectedItemId` | 구매/사용 중인 임시 선택값 |
| `NOITEM` | `settings` 또는 `legacy-adapter` | 아이템 요구 우회 플래그처럼 읽힘. 쓰기 근거가 없어 mapping 전 보류 |

## 훈련/상호작용 세션 도메인

| 원본 | 우리 모델 | 성격 |
| --- | --- | --- |
| `SELECTCOM`, `PREVCOM`, `NEXTCOM` | `interaction.commandFlow` | 현재/이전/다음 커맨드 |
| `TARGET`, `ASSI`, `MASTER`, `PLAYER`, `ASSIPLAY` | `interaction.participants` | 역할/참여자 |
| `TEQUIP` | `interaction.temporaryEquipment` | 현재 장착/삽입/사용 중인 훈련 장비 |
| `TFLAG` | `interaction.temporaryFlags` | 커맨드 결과와 임시 판정 플래그 |
| `SOURCE` | `interaction.sources` | 커맨드가 만든 원천 자극 값 |
| `UP`, `DOWN` | `interaction.paramDeltas` | PALAM 증가/감소 예정치 |
| `LOSEBASE` | `interaction.baseLoss` | 훈련 결과 체력/기력 감소 예정치 |
| `NOWEX`, `GOTJUEL` | `interaction.resultBuffers` | 현재 훈련 결과 버퍼 |
| `TCVAR`, `SAVESTR`, `TSTR` | `interaction.messageBuffers` | 연출/문장 생성용 임시 상태 |

## 월드/진행/메타 도메인

| 원본 | 우리 모델 | 성격 |
| --- | --- | --- |
| `DAY`, `TIME` | `run.clock` | 날짜/시간 |
| `MONEY` | `economy.account` | 소지금/누적 매출 등 |
| `FLAG` | `run.flags` 또는 하위 기능 상태 | 게임 진행 플래그. 하위 분해 필요 |
| `PBAND` | `mission`, `meta`, `world` 중 슬롯별 결정 | 미션/클리어/해금/밴드 계열 진행값 |
| `GLOBAL` | `meta.achievements`, `meta.clearBonus` | 회차 밖 누적/업적/클리어 보너스 |

## 계산용/지역 변수로 제외할 것

| 원본 | 이유 |
| --- | --- |
| `A`~`Z` | 계산용 임시 변수 |
| `LOCAL`, `LOCALS`, `ARG`, `ARGS` | 함수 지역/인자 |
| `RESULT`, `RESULTS`, `COUNT` | 입력/루프/결과 임시값 |
| `STR` | 출력/문자열 버퍼 성격이 강함 |
| `NAME`, `CALLNAME`, `NICKNAME`, `NO` 접근 | 대부분 캐릭터 조회 뷰. 별도 저장 상태가 아니라 `people.identity`에서 파생 |

## 아직 확정하면 안 되는 패밀리

| 원본 | 문제 |
| --- | --- |
| `CFLAG` | 보조 문서가 있지만 범위가 넓다. 가족관계, 의복, 임신, 직업, 이벤트 진행, 호감도 등이 섞여 있다 |
| `FLAG` | 전역 진행 플래그라 기능별 분해가 필요하다 |
| `PBAND` | 미션/캐릭터 밴드/클리어 보너스가 섞여 보인다 |
| `TFLAG` | 훈련 세션 플래그지만 슬롯 의미표가 필요하다 |
| `TEQUIP` | 훈련 장비 상태지만 장비 정의 데이터와 슬롯 의미표가 필요하다 |
| `CSTR` | `CSTR.csv`보다 실제 캐릭터 CSV 사용 슬롯이 더 많다 |
| `NOITEM` | `COMABLE.ERB`에서만 읽히고 쓰기 근거가 없다. inventory가 아니라 settings/legacy 보류 |
