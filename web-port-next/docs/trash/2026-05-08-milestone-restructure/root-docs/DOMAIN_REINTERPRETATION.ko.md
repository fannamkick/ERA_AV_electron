# 우리식 도메인 재해석

## 용어 정리

| 원본 관점 | 우리 관점 |
| --- | --- |
| ERB family | 원본 증거의 변수 묶음. 예: `CFLAG`, `ITEM`, `TFLAG` |
| ERB index | 원본 family 안의 항목 번호. 예: `ITEM:24`, `CFLAG:109` |
| legacy index mapping | 원본 `family + index`를 우리 도메인 필드로 연결하는 어댑터 사전 |
| 도메인 | 상태 소유권의 최상위 경계. 예: `people`, `body`, `inventory`, `interaction` |
| 하위 도메인 | 한 도메인 안의 의미 단위. 예: `body.reproduction`, `people.lifecycle` |
| 상태 필드 | 실제 코드가 읽고 쓰는 필드. 예: `inventory.itemCounts`, `interaction.sources` |
| 컬렉션 항목 | `itemId`, `characterId`, `sourceId`처럼 정의 데이터 키로 접근하는 개별 데이터 |

`slot`이라는 말은 새 모델의 개념으로 쓰지 않는다. 원본 설명에서 필요한 경우도 의미는 항상 `legacy family + index entry`다.

## 변환 원칙

1. ERB 변수명은 저장 방식일 뿐 의미가 아니다.
2. 의미는 CSV 이름표, 캐릭터 CSV seed, ERB read/write 위치, 호출 흐름을 같이 보고 정한다.
3. 의미가 확정된 항목만 도메인 필드로 승격한다.
4. 의미가 불확실한 항목은 `missingMapping` 또는 `needsDecision`으로 남긴다.
5. 기능 코드는 legacy index를 직접 읽거나 쓰지 않는다.

## 전체 레이어

| 레이어 | 역할 |
| --- | --- |
| 정의 데이터 | CSV에서 온 정적 정의. 이름, 설명, 가격, 커맨드, 아이템, 능력, 소질, source 정의 |
| `GameState` 도메인 | 저장 가능한 실제 게임 상태. 인물, 신체, 관계, 세계, 경제, 인벤토리 등 |
| `GameSession` 도메인 | 현재 화면/기능/훈련 중에만 존재하는 상태. 대상, 조수, 선택 커맨드, 결과 버퍼 등 |
| `feature` | 도메인 상태를 조합하는 플레이 단위. 훈련, 상점, 방문, 업무, 촬영 등 |
| `ui` | 화면, 선택지, 로그, 입력 상태. 저장 상태를 직접 소유하지 않음 |
| `legacy-adapter` | 원본 ERB 주소와 우리 도메인 필드 사이의 검증 경계 |

## ERB 묶음별 재해석

| 원본 묶음 | 우리식 해석 | 최종 위치 |
| --- | --- | --- |
| `ITEMNAME`, `ABLNAME`, `TALENTNAME`, 이름 CSV | 런타임 상태가 아니라 정의 데이터 | `definitions.*Definitions` |
| `Item.csv` | 아이템 정의, 상점 listing, 캐릭터 listing 후보 | `definitions.items`, `definitions.shopListings` |
| `ITEM` | 개별 아이템 소지 수량 | `inventory.itemCounts[itemId]` |
| `ITEMSALES` | 현재 상점에서 아이템을 팔 수 있는지, 노출되는지 계산한 목록 | `ItemShopView.availableListings` 같은 화면 계산 결과. 지속 해금/숨김만 `shop.progress` |
| `BOUGHT` | 현재 상점 화면에서 선택 중인 항목 | `session.shop` |
| `DITEMTYPE` | 선언은 있으나 현재 확인한 원본 ERB 검색 범위에서는 직접 사용처 미확인 | 예약, mapping 전 모델링 금지 |
| `MONEY` | 소지금, 목표 금액, 회계 결과 | `economy.account`, `economy.accountingEntries` |
| `DAY`, `TIME` | 날짜와 진행 phase | `run.clock` |
| `FLAG` | 전역 주소 묶음일 뿐 한 도메인이 아님. 의미에 따라 설정, 세계, 상점, 업무, 미션, 메타로 분배 | `settings`, `world`, `shop`, `work`, `mission`, `meta` |
| `PBAND` | 미션/클리어 보너스/캐릭터 진행/기능 해금 후보 | `mission`, `meta`, `featureState` |
| `GLOBAL`, `GLOBALS` | 회차 공용 진행, 업적, 전역 텍스트 | `meta` |
| `BASE`, `MAXBASE` | 캐릭터의 기초 수치와 최대치 | `people.characters[id].attributes.baseStats` |
| `ABL` | 캐릭터 능력 | `people.characters[id].attributes.abilities` |
| `TALENT` | 캐릭터 소질/특성. 신체성 특성은 `body` 판단 근거가 될 수 있음 | `people.characters[id].attributes.traits`, 필요 시 `body` |
| `EXP` | 캐릭터 지속 경험 | `people.characters[id].attributes.experiences` |
| `RELATION` | 캐릭터 사이의 관계값 | `social.relationships[pairKey]` |
| `CFLAG` | 캐릭터 지속 주소 묶음. 하나의 플래그 백으로 두지 않고 의미별로 분해 | `people`, `body`, `equipment`, `social`, `work`, `mission`, `settings`, `featureState` |
| `CSTR` | 캐릭터별 문자열 항목 | `text.characterTextEntries` 또는 `people.identity` |
| `MARK`, `PALAM`, `JUEL`, `STAIN` | 신체/훈련 결과로 누적되는 상태 | `body.byCharacterId[id]` |
| `EQUIP` | 지속 장비 후보이나 현재 확인한 원본 ERB 검색 범위에서는 직접 사용처가 불충분함 | 예약. 지속 장비로 확인된 슬롯만 `equipment.byCharacterId[id]` |
| `TARGET`, `ASSI`, `MASTER`, `PLAYER`, `ASSIPLAY` | 현재 상호작용 역할 바인딩 | `session.interaction.participants` |
| `SELECTCOM`, `PREVCOM`, `NEXTCOM` | 현재 커맨드 흐름 | `session.interaction.commandFlow` |
| `TFLAG` | 현재 훈련/상호작용 중의 임시 판정 상태 | `session.interaction.temporaryFlags`, 필요 시 구체 필드 |
| `TEQUIP` | 현재 훈련 중의 임시 장비/모드 | `session.interaction.temporaryEquipment` |
| `SOURCE`, `UP`, `DOWN`, `LOSEBASE` | 훈련 결과 계산 파이프라인 | `session.interaction.sources`, `paramDeltas`, `baseLoss` |
| `EJAC`, `EX`, `GOTJUEL`, `NOWEX` | 결과 계산 중간값과 절정/쥬얼 계산 버퍼 | `session.interaction.resultBuffers` |
| `CUP`, `CDOWN`, `DOWNBASE` | 선언은 있으나 현재 확인한 원본 ERB 검색 범위에서는 직접 사용처 미확인 | 예약, mapping 전 모델링 금지 |
| `SAVESTR`, `TSTR`, `TCVAR`, `RESULTS` | 표시/결과 문자열과 임시 변수 | `session.interaction.messageBuffers` 또는 `script` |
| `LOCAL`, `ARG`, `RESULT`, `A`~`Z`, `DA`~`DE`, `TA`, `TB` | 함수 지역 변수와 계산 scratch | `session.script`, 도메인 상태에서 제외 |

## CFLAG 재해석

`CFLAG`는 "캐릭터 플래그"라는 이름 때문에 한 곳에 몰아넣으면 구조가 망가진다. 실제로는 여러 도메인의 오래된 저장 주소를 한 배열에 넣은 것이다.

| 의미 | 우리 위치 |
| --- | --- |
| 매각 가능, 조수 가능, 은퇴, 특수 캐릭터 | `people.flags.lifecycle` |
| 호감도, 조교 횟수, 캐릭터별 진행값 | `people.flags.affection`, `people.flags.featureProgress` |
| 친족 관계 캐릭터 번호 | `people.flags.family` 또는 `social.relationships` |
| 처녀성, 상실 상대/나이/장소/상황 | `body.sexualHistory` |
| 임신, 출산일, 부친, 배란/수정 관련 상태 | `body.reproduction` |
| 음모, 컵, 머리색, 머리형, 신체 외형 | `body.appearance` |
| 착의, 속옷, 신발, 색, 상태 | `equipment.clothing` |
| 노역, 매춘, 영업, 촬영, 아르바이트 | `work.careerFlagsByCharacterId` |
| 미션, 합콘, 방문, 이벤트, 해금 | `mission`, `featureState`, `world` |
| 캐릭터별 설정, 대사 옵션, 콘돔 거부 | `settings.characterDefaults` 또는 `people.flags.settings` |

따라서 `CFLAG:n`은 "CFLAG 하위 변수"가 아니다. `n`의 의미가 확정되면 위 도메인의 구체 필드로 이동한다.

## ITEM 재해석

`ITEM`도 변수 1000개가 아니다. 하나의 아이템 시스템이 원본에서 숫자 배열로 저장된 것이다.

| 원본 | 우리 모델 |
| --- | --- |
| `Item.csv`의 이름/가격/종류 | `definitions.items[itemId]` |
| `ITEM:n` | `inventory.itemCounts[itemId]` |
| `ITEMSALES:n` | `ItemShopView.availableListings` 같은 화면 계산 결과. 세이브 상태로 저장하지 않음 |
| 구매/판매로 돈이 변함 | `economy.accountingEntries`, `economy.account.money` |
| 현재 상점에서 선택한 물건 | `session.shop.selectedItemId` |

이렇게 나누면 아이템의 정의, 소지 수량, 판매 가능 상태, 거래 결과, UI 선택 상태가 섞이지 않는다.

## 훈련 세션 재해석

훈련은 하나의 거대한 도메인이 아니다. 훈련 기능이 여러 도메인의 상태를 조합한다.

| 단계 | 상태 위치 |
| --- | --- |
| 누가 대상이고 조수인지 정함 | `session.interaction.participants` |
| 어떤 커맨드를 골랐는지 | `session.interaction.commandFlow` |
| 커맨드 가능 조건과 순서 게이트 | `feature training`의 규칙, 필요 시 `session.interaction.temporaryFlags` |
| SOURCE 계산 | `session.interaction.sources` |
| 욕정/쾌감 등 파라미터 변화 | `session.interaction.paramDeltas` |
| 체력/기력 감소 | `session.interaction.baseLoss` |
| 오염/사정/삽입/첫 접촉 이벤트 | `session.interaction.pendingEvents`, `body` 반영 effect |
| 최종 지속 변화 | `people`, `body`, `social`, `economy` effect |
| 결과 텍스트 | `session.interaction.messageBuffers`, `ui.log` |

여기서 중요한 점은 `TFLAG`나 `TEQUIP`를 그대로 훈련 상태 모델로 삼지 않는다는 것이다. 그 값들은 원본 커맨드의 증거일 뿐이고, 최종 구현은 `participants`, `commandFlow`, `temporaryEquipment`, `sources`, `pendingEvents` 같은 의미 단위로 풀어쓴다.
