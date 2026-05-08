# 레거시 역할 확정표

## 확인 범위

| 근거 | 확인 범위 |
| --- | --- |
| `original-game/CSV/VariableSize.CSV` | 107개 변수 family 선언 전체 |
| `original-game/CSV/Item.csv`, `Abl.csv`, `BASE.csv`, `Talent.csv`, `exp.csv`, `Mark.csv`, `Palam.csv`, `Train.csv` | 정적 정의 CSV |
| `Ho版資料（作成中途）/source.csv`, `Ho版資料（作成中途）/cflag.csv` | 보조 의미 자료 |
| `original-game/ERB/**/*.ERB`, `*.ERH` | 372개 ERB 파일의 실제 사용처 |

## 판정 단계

| 단계 | 의미 | 처리 |
| --- | --- | --- |
| 확정 | family 역할과 생명주기가 원본 사용처로 확인됨 | 코드와 문서에서 해당 도메인으로 고정 |
| 분해 확정 | family 자체가 여러 의미를 담는 것이 확인됨 | family는 `legacy-adapter`, index별로만 도메인 승격 |
| 예약 | `VariableSize.CSV`에는 있으나 현재 ERB 사용처가 없거나 약함 | 런타임 모델에 넣지 않고 보류 |
| 제외 | 함수 지역값, 입력 결과, 루프 카운터 같은 계산 scratch | `GameSession.script` 또는 도메인 상태 제외 |

## 확정된 역할

| 원본 | 확정 위치 | 역할 | 근거 |
| --- | --- | --- | --- |
| `ITEMNAME`, `ITEMPRICE`, `Item.csv` | `Catalog.items` | 아이템 정의, 이름, 정적 가격 | `Item.csv`; `SHOP_ITEM.ERB`에서 `ITEMNAME:BOUGHT` 표시 |
| `ABLNAME`, `BASENAME`, `TALENTNAME`, `EXPNAME`, `MARKNAME`, `PALAMNAME`, `TRAINNAME`, `SOURCENAME` | `Catalog.*` | 정적 이름/정의 테이블 | 각 CSV와 `VariableSize.CSV` 이름 family |
| `PALAMLV`, `EXPLV` | `Catalog.thresholds` | 레벨/임계치 테이블 | `TRAIN_MAIN.ERB`, `SYSTEM_SOURCE.ERB`에서 계산 기준으로 사용 |
| `DAY`, `TIME` | `GameState.run.clock` | 회차 내부 날짜/시간대/턴 phase | `TRAIN_MAIN.ERB` 상태 표시, `EVENT_NEXTDAY.ERB`, `ENDING.ERB` |
| `MONEY` | `GameState.economy.account` | 소지금과 지출/수입 결과 | `EVENT_NEXTDAY.ERB` 유지비 차감, `ENDING.ERB` 자금 판정 |
| `ITEM` | `GameState.inventory.itemCounts[itemId]` | 실제 보유 아이템 수량/보유 여부 | `COMABLE.ERB` 아이템 요구 체크, `SHOP_ITEM.ERB` 구매/사용 후 증감 |
| `ITEMSALES` | `ItemShopView.availableListings` 같은 view 계산값 | 현재 상점 진입 시 계산되는 판매/노출 목록. 저장 상태가 아니며, 지속 해금/숨김만 `GameState.shop` | `SHOP_ITEM.ERB`의 `@SALEITEM_CHECK`에서 조건별 0/1 갱신 |
| `BOUGHT` | `GameSession.shop.selectedItemId` | 현재 상점 구매 화면의 선택 아이템 | `SHOP_ITEM.ERB`에서 `ITEMNAME:BOUGHT`, `ITEM:BOUGHT`, 취소/완료 후 `BOUGHT = 0` |
| `TARGET`, `ASSI`, `MASTER`, `PLAYER`, `ASSIPLAY` | `GameSession.interaction.participants` | 현재 상호작용의 대상/조수/조교자/실행자 역할 바인딩 | `TRAIN_MAIN.ERB`에서 `PLAYER = MASTER` 또는 `ASSI`, 표시와 판정에 사용 |
| `SELECTCOM`, `PREVCOM`, `NEXTCOM` | `GameSession.interaction.commandFlow` | 현재/직전/다음 커맨드 흐름 | 훈련 커맨드 실행 흐름 |
| `TFLAG` | `GameSession.interaction.temporaryFlags` 또는 `GameSession.featureSession.status/commandSequences` | 현재 훈련/상호작용 판정 플래그 | `TRAIN_MAIN.ERB`에서 0~30 매 커맨드 초기화, `TFLAG:860/899/900/901`은 상태/시퀀스 |
| `TEQUIP` | `GameSession.interaction.temporaryEquipment` | 현재 훈련 중 장착/삽입/모드 상태 | `COMABLE.ERB`, `TRAIN_MAIN.ERB`, `EVENT_TRAIN_MESSAGE_A.ERB`; 지속 장비 `EQUIP`와 분리 |
| `SOURCE` | `GameSession.interaction.sources[sourceId]` | 커맨드가 만든 자극 원천 값 | `source.csv`, `SYSTEM_SOURCE.ERB`에서 SOURCE를 계산해 PALAM으로 변환 |
| `UP`, `DOWN` | `GameSession.interaction.paramDeltas[paramId]` | PALAM 적용 전 증가/감소 예정치 | `SYSTEM_SOURCE.ERB`에서 `PALAM:C += UP:C`, `PALAM:C -= DOWN:C` |
| `LOSEBASE` | `GameSession.interaction.baseLoss[baseId]` | BASE 감소 예정치 | `SYSTEM_SOURCE.ERB`에서 누적 후 `BASE:0/1 -= LOSEBASE:0/1` |
| `EJAC` | `GameSession.interaction.resultBuffers.ejaculationThresholds` | 사정 게이지 판정용 중간값 | `SYSTEM_SOURCE_SUB1.ERB`의 `TARGET_EJAC_CHECK` |
| `EX` | `GameSession.interaction.resultBuffers.climaxCounters` | 현재 훈련의 절정/분유/사정 횟수 버퍼 | `SYSTEM_SOURCE.ERB`에서 증가, `TRAIN_MAIN.ERB`에서 표시 및 `GOTJUEL` 계산 |
| `NOWEX` | `GameSession.interaction.resultBuffers.nowEx` | 방금 발생한 절정 이벤트 버퍼 | `SYSTEM_SOURCE.ERB`에서 구상 표시용으로 `NOWEX:0~3 = C/V/A/B` |
| `GOTJUEL` | `GameSession.interaction.resultBuffers.gotJuel` | 이번 훈련에서 얻을 구슬 계산 결과 | `TRAIN_MAIN.ERB`에서 계산 후 `JUEL`에 더함 |
| `JUEL` | `GameState.body.byCharacterId[id].trainingResources` | 최종 보유 구슬/훈련 자원 | `TRAIN_MAIN.ERB`에서 `JUEL += GOTJUEL`, `ABLUP*.ERB`에서 소비 |
| `PALAM` | `GameState.body.byCharacterId[id].conditionParams` | 누적 쾌감/욕정/반감 등 상태 파라미터 | `Palam.csv`, `SYSTEM_SOURCE.ERB`에서 UP/DOWN 적용 |
| `MARK` | `GameState.body.byCharacterId[id].imprints` | 고통/쾌락/굴복/반발 각인 | `Mark.csv`, 각인 판정 ERB |
| `STAIN` | `GameState.body.byCharacterId[id].contamination` | 신체 부위별 오염/액체 부착 상태 | `COMF*.ERB` 비트 병합, `INFO.ERB` 표시 |
| `RELATION` | `GameState.social.relationships[pairKey]` | 캐릭터 간 방향성 관계값 | Chara CSV `相性` |
| `GLOBAL` | `GameState.meta` | 회차 밖 업적/클리어 보너스/누적 상태 | `LOADGLOBAL`/`SAVEGLOBAL`, `CLEARBONUS.ERB`, `EVENT_TURNEND.ERB` |
| `SAVESTR`, `TSTR`, `TCVAR` | `GameSession.interaction.messageBuffers` 또는 `GameSession.script` | 현재 커맨드 문장/임시 문자열/임시 변수 | `EVENT_TRAIN_MESSAGE_A.ERB`, `INTERVIEW.ERB`, `NAME.ERB` |
| `RESULT`, `RESULTS`, `COUNT`, `LOCAL`, `LOCALS`, `ARG`, `ARGS`, `A`~`Z`, `DA`~`DE`, `TA`, `TB` | `GameSession.script` | 입력 결과, 함수 인자, 지역 변수, 계산 scratch | ERB 공통 지역/입력/루프 사용 |

## 분해가 확정된 family

| 원본 | 분해 위치 | 확정된 판단 |
| --- | --- | --- |
| `BASE`, `MAXBASE` | `people.attributes.baseStats`, `body.bodyStats`, 일부 `work/economy` 후보 | `BASE.csv`가 체력/기력/사정게이지, 외견/실연령, 신체 치수, 출연료, 마력, 자지사이즈를 함께 담는다. index mapping 없이는 단일 필드 금지 |
| `TALENT` | `people.attributes.traits`, `body.anatomyTags/reproduction/appearance`, `work/social` 후보 | `Talent.csv`가 처녀/성격/상태/특수 소질을 함께 담는다. 신체성 소질은 `people`에 뭉치지 않는다 |
| `EXP` | `people.attributes.experiences`, `body.milestones`, `work.career`, `social` 후보 | `exp.csv`가 성적 경험, 업무 경험, 인기/공헌도, 관계 경험을 함께 담는다 |
| `CFLAG` | `people`, `body`, `equipment`, `social`, `work`, `mission`, `settings`, `featureState` | `cflag.csv`가 가족관계, 의복, 임신, 처녀성, 업무, NTR, 이벤트, 설정을 모두 담는다 |
| `FLAG` | `settings`, `run`, `world`, `shop`, `work`, `mission`, `meta`, `economy` | `ENDING.ERB`의 목표 금액/난이도, `EVENT_NEXTDAY.ERB` 유지비, 시스템 설정, 이벤트 진행이 섞인다 |
| `PBAND` | `mission`, `meta.clearBonuses`, `world/featureState unlocks` | 임신/해금, 클리어 보너스, 미션 진행에서 모두 사용된다 |
| `CSTR` | `text.characterTextEntries`, `people.identity`, `body` 라벨 후보 | Chara CSV에 1인칭/신체 호칭/문장 슬롯이 섞인다 |
| `STR`, `GLOBALS` | `Catalog` 또는 `text/meta` | 정적 문자열인지 저장 문자열인지 index별 근거 필요. `GLOBALS`는 현재 확인한 원본 ERB 검색 범위에서는 직접 사용처 미확인 |

## 예약 또는 보류

| 원본 | 현재 판단 | 근거 |
| --- | --- | --- |
| `DITEMTYPE` | 예약. `GameSession.shop.selectedListingId` 후보로만 남기고 모델링하지 않음 | `VariableSize.CSV`에는 있으나 현재 확인한 원본 ERB 검색 범위에서는 직접 사용처 미확인 |
| `EQUIP` | 예약. 지속 장비 도메인은 유지하되 현재 직접 ERB 사용 근거 없음 | 실제 사용은 대부분 `TEQUIP`; `EQUIP:` 직접 사용 0개 |
| `CUP`, `CDOWN`, `DOWNBASE` | 예약 | `VariableSize.CSV` 선언은 있으나 현재 확인한 원본 ERB 검색 범위에서는 직접 사용처 미확인 |
| `NOITEM` | 보류. 인벤토리가 아니라 아이템 요구 우회/규칙 플래그 | `COMABLE.ERB`에서 `ITEM:n == 0 && NOITEM == 0` 형태로만 읽힘. 쓰기 근거 0개 |

## 분류 경계

| 항목 | 분류 |
| --- | --- |
| `TARGET`/`ASSI` 배우 바인딩 | `GameSession.interaction.participants` |
| `TFLAG:860`, `TFLAG:899`, `TFLAG:900/901` | `GameSession.featureSession`의 커맨드 시퀀스/기능 실행 상태 |
| `BOUGHT` | `GameSession.shop`의 현재 상점 선택 상태 |
| `ITEMSALES` | `ItemShopView.availableListings` 같은 view 계산값. 저장 상태가 아니며, 지속 해금/숨김만 `GameState.shop` |
| `NOITEM` | `settings` 또는 legacy mapping 보류 대상 |
