# 도메인 인벤토리

## 근거 자료

| 근거 | 분류 용도 |
| --- | --- |
| `original-game/CSV/*.csv` | 이름, 가격, 능력치, 커맨드 같은 정적 정의 |
| `original-game/ERB/**/*.ERB` | 실제 읽기/쓰기, 계산, 화면 흐름 |
| `original-game/ERH/**/*.ERH` | 상수, 매크로, 선언 보조 자료 |
| `Ho版資料（作成中途）/*.csv` | `cflag.csv`, `source.csv` 같은 보조 정의 |
| `ERB_STATE_SCAN.ko.md`, `ERB_STATE_AUDIT.ko.md`, `data/legacy-state-scan/*` | 원본 위치 확인용 보조 색인/교차검증 자료 |

## 생명주기 분류

| 생명주기 | 소유권 단위 | 분류 기준 |
| --- | --- | --- |
| 정의 데이터 | `GameDefinitions.*` | 원본 CSV/Chara CSV에서 온 읽기 전용 표 |
| 저장 상태 | `GameState.<domain>` | 세이브에 들어가는 지속 상태 |
| 세션 상태 | `GameSession.<domain>` | 현재 화면/기능 실행 중에만 필요한 임시 상태 |
| 어댑터 | `adapters.legacy` | 원본 ERB 주소와 새 도메인 사이의 검증 경계 |

## 명칭 확정표

| 원본/이전 이름 | 확정 런타임 이름 | 역할 | 근거 |
| --- | --- | --- | --- |
| `ITEMNAME`, `ITEMPRICE`, `Item.csv` | `GameDefinitions.items`, `GameDefinitions.recruitListings` | 실제 아이템 정의와 인원 구매 listing 정의. `Item.csv`가 순수 아이템 테이블이 아니므로 분리 | `Item.csv` 이름/가격 행, 캐릭터 구매 ERB |
| `ITEM` | `GameState.inventory.itemCounts` | 실제 보유 수량 | `COMABLE.ERB`에서 보유 여부 체크, `SHOP_ITEM.ERB`에서 구매 후 증감 |
| `ITEMSALES` | `ShopView.visibleListings` 또는 `GameSession.shop.visibleListingIds` | 현재 상점 진입 시 계산되는 판매 가능/노출 목록. 저장 상태가 아니며, 지속 해금/숨김만 `GameState.shop` | `SHOP_MAIN.ERB`에서 초기화, `SHOP_ITEM.ERB`의 `SALEITEM_CHECK`에서 재계산 |
| `BOUGHT` | `GameSession.shop.selectedItemId`, `quantity` | 현재 상점 화면의 임시 선택값 | `SHOP_ITEM.ERB`에서 `ITEMNAME:BOUGHT`, `ITEM:BOUGHT`, 취소/구매 후 `BOUGHT = 0` |
| `DITEMTYPE` | 예약, 의미 확정 전 런타임 모델 금지 | `VariableSize.CSV` 선언은 있으나 현재 확인한 원본 ERB 검색 범위에서는 직접 사용처 미확인 | 원본 ERB 직접 검색 결과 기준. 미사용 확정이 아니라 런타임 모델 보류 근거 |
| `ABL` | `GameState.people.characters[id].attributes.abilities` | 캐릭터 능력치 | `Abl.csv`, Chara CSV `能力` |
| `BASE`, `MAXBASE` | `GameState.people.characters[id].attributes.baseStats` 또는 `GameState.body.byCharacterId[id].baseStats/maxBaseStats/bodyStats` | 일반 기초치는 `people`, 신체형 기초치와 업무/촬영/훈련 결과 공유 필드는 `body`. M33에서 body owner BASE/MAXBASE를 분리 | `BASE.csv`, Chara CSV `基礎` |
| `TALENT` | `GameState.people.characters[id].attributes.traits` 또는 `GameState.body` | 일반 소질/특성. 신체/생식 특성은 body로 분리 | `Talent.csv`, Chara CSV `素質` |
| `EXP` | `GameState.people.characters[id].attributes.experiences` 또는 `GameState.body.milestones` | 일반 경험과 신체/성적 이정표. index별 의미 확정 필요 | `exp.csv`, Chara CSV `経験` |
| `PALAM` | `GameState.body.byCharacterId[id].conditionParams` | 쾌감, 윤활, 욕정, 공포, 반감 같은 현재 상태 파라미터 | `Palam.csv`, `COMABLE.ERB` 조건식 |
| `JUEL` | `GameState.body.byCharacterId[id].trainingResources` | 훈련 결과로 얻고 능력 상승에 소비하는 구슬/자원 | `ABLUP*.ERB`에서 `JUEL` 소비 |
| `MARK` | `GameState.body.byCharacterId[id].imprints` | 고통/쾌락/굴복/반발 각인 | `Mark.csv`, `ABL.ERB`, 미션 조건 |
| `STAIN` | `GameState.body.byCharacterId[id].contamination` | 신체 부위별 오염/액체 부착 상태 | `COMF*.ERB`에서 비트 병합, `INFO.ERB` 표시 |
| `RELATION` | `GameState.social.relationships` | 캐릭터 간 방향성 관계값 | Chara CSV `相性` |
| `MONEY` | `GameState.economy.account.currentMoney` | 현재 소지금. 목표 금액은 run/new-game 목표값으로 별도 보관하고, 부채/평판/누적 매출은 근거 확인 전 필드 생성 금지 | 상점/업무/판매 ERB |
| `EQUIP` | 예약. 지속 장비로 확인된 슬롯만 `GameState.equipment.byCharacterId` | 현재 확인한 원본 ERB 검색 범위에서는 직접 사용처가 불충분하다. `TEQUIP`과 혼동 금지 | `VariableSize.CSV`, 원본 ERB 직접 검색 |
| `TEQUIP` | `GameSession.interaction.temporaryEquipment` | 현재 상호작용 중 임시 장비/모드 | `COMABLE.ERB`, `INFO.ERB`에서 현재 상태로 조회 |
| `TFLAG` | `GameSession.interaction.temporaryFlags` | 현재 상호작용 중 판정/분기 임시 플래그 | `PASSOUT.ERB`, `TRAIN_MAIN.ERB`, `COMSEQ_REGISTER.ERB` |
| `SOURCE` | `GameSession.interaction.sources` | 커맨드가 만든 자극 원천 | `SYSTEM_SOURCE*.ERB`, `source.csv` |
| `UP`, `DOWN` | `GameSession.interaction.paramDeltas` | PALAM 적용 전 증가/감소 예정치 | 훈련 결과 계산 ERB |
| `LOSEBASE` | `GameSession.interaction.baseLoss` | 체력/기력 등 BASE 감소 예정치 | `SYSTEM_SOURCE.ERB`에서 누적 후 `BASE:0/1`에 적용 |
| `DOWNBASE` | 예약, 의미 확정 전 런타임 모델 금지 | `VariableSize.CSV` 선언은 있으나 현재 확인한 원본 ERB 검색 범위에서는 직접 사용처 미확인 | 원본 ERB 직접 검색 결과 기준. 미사용 확정이 아니라 런타임 모델 보류 근거 |
| `SAVESTR`, `TSTR`, `TCVAR` | `GameSession.interaction.messageBuffers` 또는 `GameSession.script` | 현재 커맨드 문장/임시 문자열. 저장 근거가 있으면 text 검토 | 커맨드/문장 생성 ERB |
| `LOCAL`, `ARG`, `RESULT`, `A`~`Z` | `GameSession.script` | 함수 지역 변수, 인자, 결과, 계산 scratch | ERB 지역/계산 변수 |
| `RosterState` | `PeopleState` | 인물 도메인 저장 상태 타입 | 코드 명칭 정리 |
| `CharacterProgress` | `CharacterAttributesState` | BASE/ABL/TALENT/EXP를 담는 캐릭터 속성 묶음 | 코드 명칭 정리 |
| `TextIdentityState` | `TextState` | 텍스트 도메인 전체 저장 상태 | 코드 명칭 정리 |
| `FeatureProgressState` | `FeatureState` | 구체 도메인으로 승격 전인 기능 진행 임시 저장 상태 | 코드 명칭 정리 |

## 분류 기준

| 범주 | 런타임 위치 | 분류 기준 |
| --- | --- | --- |
| `definitions` | `GameDefinitions.*` | 원본 CSV에서 온 정적 정의. 플레이 중 변하는 값 금지 |
| `save` | `GameState.<domain>` | 저장 파일에 들어가는 지속 상태 |
| `session` | `GameSession.<domain>` | 현재 실행 중인 화면, 기능, 스크립트 프레임의 임시 상태 |
| `adapter` | `adapters.legacy` | 원본 ERB 주소와 새 도메인 사이의 검증 경계 |
| `missingMapping` | `legacy*NeedingMapping` | 의미를 모르는 legacy index. 임의 이름 생성 금지 |

## 하위 도메인 배치표

### GameDefinitions

| 위치 | 들어가는 것 | 원본 근거 |
| --- | --- | --- |
| `GameDefinitions.items` | 실제 아이템 ID, 이름, 정적 가격, 원본 경로 | `Item.csv`, `ITEMNAME`, `ITEMPRICE` |
| `GameDefinitions.recruitListings` | 인원 구매 listing ID, 가격, 연결 캐릭터/조건 후보 | `Item.csv` 100번대, `SHOP_CHARABUY.ERB` |
| `GameDefinitions.shopListings` | 상점 listing 후보. 실제 표시 가능 여부는 저장하지 않고 진입 시 계산 | `SHOP_ITEM.ERB`, `SALEITEM_CHECK` |
| `GameDefinitions.abilities` | 능력 정의 | `Abl.csv`, `ABLNAME` |
| `GameDefinitions.baseStats` | 기초 수치 정의 | `BASE.csv`, `BASENAME` |
| `GameDefinitions.talents` | 소질/특성 정의 | `Talent.csv`, `TALENTNAME` |
| `GameDefinitions.experiences` | 경험 정의 | `exp.csv`, `EXPNAME` |
| `GameDefinitions.marks` | 각인 정의 | `Mark.csv`, `MARKNAME` |
| `GameDefinitions.trainingParams` | PALAM/훈련 파라미터 정의 | `Palam.csv`, `PALAMNAME` |
| `GameDefinitions.trainingCommands` | 훈련 커맨드 정의 | `Train.csv`, `TRAINNAME` |
| `GameDefinitions.sourceDefinitions` | SOURCE 정의 | `source.csv`, `SOURCENAME` |
| `GameDefinitions.characterTextDefinitions` | 캐릭터 문자열 슬롯 정의 후보 | `CSTR.csv`, `CSTR` 이름 근거 |
| `GameDefinitions.thresholds` | 레벨/임계치 테이블 | `PALAMLV`, `EXPLV` |

### GameState

| 도메인 | 하위 도메인/필드 | 들어가는 것 | 원본 근거 |
| --- | --- | --- | --- |
| `runtime` | `saveVersion`, `createdBy` | 런타임 세이브 메타데이터 | 새 런타임 자체 정보 |
| `save` | `slots`, `autosave`, `migration` | 저장 슬롯, 자동저장, 마이그레이션 | `SAVEGAME`, `LOADGAME`, `SAVEDATA` |
| `settings` | `system` | 시스템 설정 | `CONFIG`, `FLAG` 중 설정 슬롯 |
| `settings` | `characterDefaults` | 캐릭터별 기본 옵션, 대사 옵션, 콘돔 거부 같은 설정 | `CFLAG:8`, `CFLAG:26`, `CFLAG:60` 후보 |
| `settings` | `debug`, `testMode` | 디버그/치트/테스트 모드 | `CHEAT`, `TESTMODE` |
| `meta` | `achievements` | 업적 진행 | `ACHIEVEMENT`, `GLOBAL` 후보 |
| `meta` | `clearBonuses` | 클리어 보너스, 캐릭터별 클리어 카운트 | `CLEARBONUS`, `GLOBAL`, 일부 `PBAND` |
| `meta` | `globalCounters`, `globalFlags`, `globalTexts` | 회차 밖 누적 값과 전역 텍스트 | `GLOBAL`, `GLOBALS` |
| `run` | `clock` | 일수, 월, 주, 턴, phase | `DAY`, `TIME` |
| `run` | `scheduledEvents` | 다음날/월말/턴 종료 예약 | `EVENT_NEXTDAY`, `EVENT_NEXTMONTH`, `EVENT_TURNEND` |
| `run` | `actorMemory` | 마지막 대상/조수 기억 | `FLAG:1`, `FLAG:2` |
| `run` | `rngSeed` | 재현 가능한 랜덤 seed | `RAND`, `RANDCHOOSE`, `RANDCHOOSE_NUM` |
| `world` | `eventFlags` | 세계 이벤트 진행 | `FLAG`, 방문/이벤트 ERB |
| `world` | `unlocks` | 전역 해금 | `FLAG`, `PBAND` 중 해금 슬롯 |
| `world` | `storyFlags` | 스토리/장소/방문 플래그 | `FLAG`, `GLOBAL` 후보 |
| `mission` | `byMissionId` | 미션별 상태, 진행 band, 보상 수령 | `MISSION`, `PBAND`, 미션 관련 `FLAG` |
| `mission` | `acceptedCountsByCharacterId` | 캐릭터별 수주/완료 수 | 미션/캐릭터 진행 ERB |
| `people` | `characters[id].identity` | template id, 표시 이름, 호칭, 별명, 1인칭 | `NO`, `NAME`, `CALLNAME`, `NICKNAME`, Chara CSV |
| `people` | `characters[id].attributes.baseStats` | 일반 기초치와 최대치 | `BASE`, `MAXBASE`, Chara CSV `基礎` |
| `people` | `characters[id].attributes.abilities` | 일반 능력치 | `ABL`, Chara CSV `能力` |
| `people` | `characters[id].attributes.traits` | 일반 소질/특성 | `TALENT`, Chara CSV `素質` |
| `people` | `characters[id].attributes.experiences` | 일반 경험 | `EXP`, Chara CSV `経験` |
| `people` | `characters[id].flags.lifecycle` | 매각 가능, 조수 가능, 은퇴, 특수 태그 | `ISASSI`, `CFLAG:0`, `CFLAG:1`, `CFLAG:28`, `CFLAG:70`, `CFLAG:720` 후보 |
| `people` | `characters[id].flags.affection` | 호감도, 조교 횟수처럼 인물 자체에 붙는 값 | `CFLAG:2`, `CFLAG:10` 후보 |
| `people` | `characters[id].flags.family` | 친족 관계 캐릭터 번호 | `CFLAG:21`~`CFLAG:24` 후보 |
| `people` | `characters[id].roles` | 소속, 방문자, 조수 가능 같은 지속 역할 | `ISASSI`, `ADDCHARA`, `DELCHARA`, `GETCHARA` |
| `social` | `relationships[pairKey]` | 방향성 관계값, 호감, 관계 역할, 이력 태그 | `RELATION`, Chara CSV `相性` |
| `social` | `ntrProgress`, `partnerProgress` | NTR/연인/파트너 진행 | boyfriend/NTR ERB, `CFLAG:619`, `CFLAG:620` 후보 |
| `body` | `byCharacterId[id].anatomyTags` | 신체 구조 태그 | 신체성 `TALENT`, `CFLAG` |
| `body` | `byCharacterId[id].baseStats`, `maxBaseStats` | body owner로 판정된 신체형 기초값과 최대치 | `BASE`, `MAXBASE` 중 신체 값 |
| `body` | `byCharacterId[id].bodyStats` | 업무/촬영/훈련 결과가 공유하는 체력/기력/신체 변화 필드 | `BASE`, `LOSEBASE`, 업무/촬영/훈련 결과 |
| `body` | `byCharacterId[id].reproduction` | 임신, 출산일, 부친, 배란/수정, 약물 사용 | `CFLAG:101`~`CFLAG:124`, `CFLAG:109`~`CFLAG:112` 후보 |
| `body` | `byCharacterId[id].sexualHistory` | 처녀성, 상실 상대/나이/월/주/장소/상황 | `CFLAG:15`, `CFLAG:16`, `CFLAG:160`~`CFLAG:167`, `CFLAG:820`~`CFLAG:836` 후보 |
| `body` | `byCharacterId[id].appearance` | 음모, 컵, 머리색/머리형, 외형 | `CFLAG:6`, `CFLAG:36`, `CFLAG:600`~`CFLAG:611` 후보 |
| `body` | `byCharacterId[id].conditionParams` | 지속 감각/욕정/반감/고통 등 현재 상태 파라미터 | `PALAM` |
| `body` | `byCharacterId[id].trainingResources` | 훈련 결과로 획득/소비되는 구슬/자원 | `JUEL` |
| `body` | `byCharacterId[id].imprints` | 각인 | `MARK` |
| `body` | `byCharacterId[id].conditionFlags` | body owner로 판정된 조건/상태 플래그. CFLAG/FLAG/PBAND 전체 의미 분해는 M34에서 닫음 | `CFLAG`, `FLAG` 중 body owner 후보 |
| `body` | `byCharacterId[id].contamination` | 오염/액체 부착 상태 | `STAIN` |
| `body` | `byCharacterId[id].milestones` | 신체/성적 이정표 | 신체성 `EXP`, `TALENT`, `CFLAG` |
| `text` | `displayRules`, `particleRules`, `addressRules` | 표시 이름, 조사, 호칭 렌더링 규칙 | `STR`, 호칭 처리 ERB |
| `text` | `characterTextEntries` | 캐릭터별 저장 문자열 | `CSTR` 중 텍스트 슬롯 |
| `text` | `generatedNames`, `persistentJournal` | 생성 이름, 저장해야 하는 텍스트 이력 | `SAVESTR`, `RESULTS` 중 저장 근거가 있는 항목 |
| `economy` | `account` | 현재 소지금. 부채/평판/누적 매출은 원본 쓰기 근거 확인 뒤에만 추가 | `MONEY`, 매출/부채 ERB |
| `economy` | `accountingEntries` | 수입/지출 회계 | 구매/판매/업무/촬영 결과 |
| `economy` | `transactionFlags` | 거래 관련 진행/제한 | `FLAG`, `CHARASALES` 후보 |
| `inventory` | `itemCounts` | 아이템 보유 수량 | `ITEM` |
| `inventory` | `itemRestrictions` | 아이템별 보유/사용 제한. `NOITEM`은 전역 요구 우회 플래그라 여기 넣지 않음 | `ITEM`, use-site rule |
| `equipment` | `byCharacterId[id].persistentEquipmentItemIds` | 캐릭터별 지속 장비 | `EQUIP` |
| `equipment` | `byCharacterId[id].clothing` | 착의, 속옷, 신발, 색, 상태 | `CFLAG:40`~`CFLAG:49`, `CFLAG:170`~`CFLAG:177` 후보 |
| `equipment` | `byCharacterId[id].piercings`, `restrictions` | 피어싱/장비 제한 | `EQUIP`, 관련 `CFLAG` |
| `shop` | `progress.unlocks`, `progress.permanentRestrictions`, `progress.facilityFlags` | 세이브에 남는 상점 해금/영구 제한/시설 진행만 보관 | 상점 관련 `FLAG`, `CFLAG`, `PBAND` 후보 |
| `shop` | `progress.unlockedListingIds`, `hiddenListingIds` | listing 해금/숨김 | `Item.csv`, 상점 ERB |
| `shop` | `progress.facilityFlags` | 상점 시설/표시 진행 | 상점 관련 `FLAG`, `CFLAG`, `PBAND` 후보 |
| `work` | `assignments` | 업무 배정 | `WORK`, `ARBEIT`, `SCOUT`, `INTERVIEW` |
| `work` | `brothelFlags` | 노역, 매춘, 영업 진행 | `CFLAG:12`, `CFLAG:13`, `CFLAG:17`, `CFLAG:50`~`CFLAG:54` 후보 |
| `work` | `filmingByCharacterId` | AV 촬영, 영상 제목, 판매, 팬 수 | `SCENE`, `AV`, `SELL_VIDEO`, `VIDEO_TITLE`, `CFLAG:130`, `CFLAG:730`~`CFLAG:734` 후보 |
| `work` | `careerFlagsByCharacterId` | 캐릭터별 경력/아르바이트/업무 이력 | `CFLAG:801` 등 업무 계열 |
| `featureState` | `eventProgress`, `visits`, `tips`, `unlocks` | 아직 `world`, `mission`, `work`, `shop`, `meta`로 승격하지 않은 기능 진행 | 방문/이벤트/팁/해금 관련 `FLAG`, `PBAND`, `CFLAG` |

### GameSession

| 도메인 | 하위 도메인/필드 | 들어가는 것 | 원본 근거 |
| --- | --- | --- | --- |
| `featureSession` | `actors` | 구체 도메인 이전의 임시 역할 바인딩과 교체 이력. 기본은 `interaction.participants`로 이동 예정 | `TARGET`, `ASSI`, `MASTER`, `PLAYER` |
| `featureSession` | `commandSequences` | 커맨드 시퀀스 실행 프레임 | `COMSEQ_REGISTER`, `TFLAG:900/901` |
| `featureSession` | `status` | 기절/예약 커맨드 등 미분리 기능 상태 | `TFLAG:899`, `TFLAG:860` |
| `shop` | `selectedItemId`, `selectedListingId`, `quantity` | 현재 상점 화면 선택 상태. `DITEMTYPE`은 사용처가 없어 예약 | `BOUGHT` |
| `shop` | `visibleListingIds` | 현재 조건에서 계산된 판매 가능/노출 목록의 현재 화면 스냅샷. 세이브 모델 금지 | `ITEMSALES`, `SALEITEM_CHECK` |
| `interaction` | `participants` | 현재 대상, 조수, 조교자, 플레이어, 조수 플레이 여부 | `TARGET`, `ASSI`, `MASTER`, `PLAYER`, `ASSIPLAY` |
| `interaction` | `commandFlow` | 선택/이전/다음 커맨드 | `SELECTCOM`, `PREVCOM`, `NEXTCOM` |
| `interaction` | `temporaryFlags` | 현재 상호작용 판정/분기 임시 플래그 | `TFLAG` |
| `interaction` | `temporaryEquipment` | 현재 삽입/구속/촬영/콘돔/모드 상태 | `TEQUIP` |
| `interaction` | `sources` | 커맨드가 만든 자극 원천 | `SOURCE` |
| `interaction` | `paramDeltas` | PALAM 적용 전 증가/감소 예정치 | `UP`, `DOWN` |
| `interaction` | `baseLoss` | 체력/기력 감소 예정치 | `LOSEBASE` |
| `interaction` | `resultBuffers` | 절정/사정/쥬얼/EX 계산 중간값 | `EJAC`, `EX`, `GOTJUEL`, `NOWEX` |
| `interaction` | `messageBuffers` | 현재 커맨드 라벨, 문장 조각, 임시 문자열/변수 | `SAVESTR`, `TSTR`, `TCVAR` |
| `interaction` | `pendingEvents` | 오염, 삽입, 사정, 첫 접촉 등 적용 대기 이벤트 | `TFLAG`, `TEQUIP`, `EJAC` 조합 |
| `interaction` | `counters` | 현재 세션 카운터 | `TFLAG`, `EJAC` 계열 |
| `script` | `numericLocals`, `stringLocals` | 함수 지역 변수 | `LOCAL`, `LOCALS`, `A`~`Z`, `DA`~`DE`, `TA`, `TB`, `COUNT` |
| `script` | `args`, `results` | 함수 인자와 결과 | `ARG`, `ARGS`, `RESULT`, `RESULTS` |
| `script` | `listFrames` | 리스트/메뉴 프레임 지역 상태 | `#DIM LIST`, `PAGE`, `MAXPAGE`, `SHOWNUM` |
| `ui` | `route`, `choices`, `log` | 현재 화면, 선택지, 표시 로그 | `INPUT`, `WAIT`, `DRAWLINE`, `PRINT` |

### Adapter

| 위치 | 들어가는 것 | 원본 근거 |
| --- | --- | --- |
| `legacy-adapter.familyOwnership` | 원본 변수 묶음 단위 owner domain, owner path, persistence | `VariableSize.CSV` |
| `legacy-adapter.indexMapping` | 승인된 원본 주소 -> domain field 변환표 | ERB read/write 위치, CSV 이름, Chara seed |
| `legacy-adapter.missingMapping` | 의미 미승인 index 차단 정보 | `CFLAG`, `FLAG`, `PBAND`, `TFLAG`, `TEQUIP` 등 |

## VariableSize.CSV 변수 전수 분류

| 원본 변수 | 소유 도메인 | 저장 범위 | 처리 방식 |
| --- | --- | --- | --- |
| `ITEMNAME` | `definitions` | definitions | 아이템 이름 정의 |
| `ABLNAME` | `definitions` | definitions | 능력 이름 정의 |
| `TALENTNAME` | `definitions` | definitions | 소질 이름 정의 |
| `EXPNAME` | `definitions` | definitions | 경험 이름 정의 |
| `MARKNAME` | `definitions` | definitions | 각인/마크 이름 정의 |
| `PALAMNAME` | `definitions` | definitions | 파라미터 이름 정의 |
| `TRAINNAME` | `definitions` | definitions | 훈련/커맨드 이름 정의 |
| `BASENAME` | `definitions` | definitions | 기초치 이름 정의 |
| `SOURCENAME` | `definitions` | definitions | SOURCE 이름 정의 |
| `EXNAME` | `definitions` | definitions | EX 이름 정의 |
| `EQUIPNAME` | `definitions` | definitions | 지속 장비 이름 정의 |
| `TEQUIPNAME` | `definitions` | definitions | 임시 장비/모드 이름 정의 |
| `FLAGNAME` | `definitions` | definitions | FLAG 이름 정의. 의미는 `legacy-adapter`에서 별도 승인 |
| `CFLAGNAME` | `definitions` | definitions | CFLAG 이름 정의. 의미는 `legacy-adapter`에서 별도 승인 |
| `TFLAGNAME` | `definitions` | definitions | TFLAG 이름 정의. 의미는 `legacy-adapter`에서 별도 승인 |
| `STR` | `definitions` 또는 `text` | definitions/save | 원본 정적 문자열이면 `definitions`, 저장 텍스트면 `text` |
| `PALAMLV` | `definitions` | definitions | PALAM 임계치 테이블 |
| `EXPLV` | `definitions` | definitions | EXP 임계치 테이블 |
| `DAY` | `run` | save | 현재 일수 |
| `TIME` | `run` | save | 시간대/턴 진행. `run.clock.phase/turn` 계열 |
| `FLAG` | `world` 또는 개별 도메인 | save | 전역 플래그. 슬롯별 의미 확정 없으면 `missingMapping` |
| `GLOBAL` | `meta` | save | `LOADGLOBAL`/`SAVEGLOBAL` 기반 회차 밖 진행 값 |
| `GLOBALS` | `meta` 또는 `text` | save | 전역 문자열. 표시/저장 텍스트 성격이면 `text`. 현재 확인한 원본 ERB 검색 범위에서는 직접 사용처 미확인 |
| `PBAND` | `mission`, `meta`, `world`, `featureState` | save | 진행 밴드/해금 단계. 슬롯별 의미 확정 필수 |
| `BASE` | `body` 또는 `people` | save | 기초 상태. M33 기준 신체/체력성 값은 `body.baseStats/bodyStats`, 일반 성장값은 `people.attributes.baseStats` |
| `MAXBASE` | `body` 또는 `people` | save | M33 기준 신체형 최대치는 `body.maxBaseStats`, 일반 최대치는 `people.attributes.baseStats.maximum` |
| `ABL` | `people` | save | 캐릭터별 능력치 |
| `TALENT` | `people` 또는 `body` | save | 일반 소질은 `people`, 신체/생식 소질은 `body` |
| `EXP` | `people` 또는 `body` | save | 일반 경험은 `people`, 성적/신체 이정표는 `body` |
| `MARK` | `people` 또는 `body` | save | 정신/관계 각인은 `people`, 신체성 각인은 `body` |
| `PALAM` | `body` | save | 지속 상태 파라미터는 `body.conditionParams`. 훈련 중 증감 예정치는 `interaction.paramDeltas` |
| `EX` | `interaction` | session | 현재 훈련 중 절정/분유/사정 횟수 버퍼 |
| `CFLAG` | `people`, `body`, `feature-state`, `world` | save | 캐릭터 지속 플래그. 슬롯별 의미 확정 필수 |
| `JUEL` | `body` 또는 `people` | save | 캐릭터별 축적 수치. 의미별 확정 필요 |
| `STAIN` | `body` | save | 캐릭터 오염 상태 |
| `GOTJUEL` | `interaction` | session | 이번 실행 결과 구슬 버퍼. 적용 후 누적값은 `body.trainingResources` |
| `NOWEX` | `interaction` | session | 현재 실행 중 절정/EX 표시 버퍼 |
| `CSTR` | `text`, `people`, `body` | save | 캐릭터 문자열. 호칭/문체는 `text`, 정체성은 `people`, 신체 라벨은 `body` |
| `RELATION` | `social` | save | 방향성 관계와 호감 |
| `MONEY` | `economy` | save | 현재 자금 |
| `ITEM` | `inventory` | save | 아이템 수량 |
| `ITEMSALES` | `ShopView.visibleListings` 또는 `session.shop.visibleListingIds` | derived/session | 현재 상점 진입 시 재계산되는 판매 가능/노출 목록. 저장 상태가 아니며, 지속 해금/숨김만 `GameState.shop` |
| `BOUGHT` | `session.shop` | session | 현재 상점/구매 화면의 선택 상태. 구매 이력으로 보지 않음 |
| `NOITEM` | `settings` 또는 `legacy-adapter` | save/unknown | `COMABLE.ERB`의 아이템 요구 우회 플래그. 쓰기 근거가 없으므로 의미 확정 전까지 보류 |
| `EQUIP` | reserved 또는 `equipment` | reserved/save | 직접 ERB 사용 근거 없음. 지속 장비로 확인된 슬롯만 `equipment` |
| `TARGET` | `interaction` | session | 현재 기능의 대상 역할 바인딩 |
| `ASSI` | `interaction` | session | 현재 기능의 조수 역할 바인딩 |
| `MASTER` | `interaction` | session | 현재 기능의 조교자 역할 바인딩 |
| `PLAYER` | `interaction` | session | 현재 실행 주체 역할 바인딩 |
| `TFLAG` | `featureSession`, `interaction`, `legacy-adapter` | session | 임시 플래그. `TFLAG:899/860/900/901` 같은 확정 슬롯 외에는 슬롯별 의미 확정 필수 |
| `UP` | `interaction` | session | 현재 실행 중 증가 버퍼 |
| `DOWN` | `interaction` | session | 현재 실행 중 감소 버퍼 |
| `EJAC` | `interaction` | session | 사정/상호작용 판정 버퍼 |
| `LOSEBASE` | `interaction` | session | 현재 실행 감소량. 적용 후 상태는 `body` |
| `SELECTCOM` | `interaction` | session | 선택된 커맨드 |
| `ASSIPLAY` | `interaction` | session | 조수 플레이 모드 |
| `PREVCOM` | `interaction` | session | 직전 커맨드 |
| `NEXTCOM` | `interaction` | session | 다음 커맨드 |
| `SOURCE` | `interaction` | session | 현재 커맨드 원천 효과 버퍼 |
| `TEQUIP` | `interaction` | session | 현재 실행 임시 장비/모드. 지속 장비 `EQUIP`와 분리 |
| `SAVESTR` | `interaction`, `text`, `script` | session/save | 현재 커맨드 라벨/문장 조각은 interaction. 지속 텍스트면 `text`, 함수 임시면 `script` |
| `TSTR` | `interaction` 또는 `script` | session | 현재 실행 문자열 버퍼 |
| `TCVAR` | `interaction` | session | 현재 실행 임시 변수 |
| `CUP` | reserved | reserved | 현재 확인한 원본 ERB 검색 범위에서는 직접 사용처 미확인 |
| `CDOWN` | reserved | reserved | 현재 확인한 원본 ERB 검색 범위에서는 직접 사용처 미확인 |
| `DOWNBASE` | reserved | reserved | 현재 확인한 원본 ERB 검색 범위에서는 직접 사용처 미확인 |
| `DITEMTYPE` | reserved | reserved | 현재 확인한 원본 ERB 검색 범위에서는 직접 사용처 미확인 |
| `DA`, `DB`, `DC`, `DD`, `DE` | `feature-session` 또는 `script` | session | 기능 실행 임시 숫자. 의미 승격 전에는 script/session |
| `TA`, `TB` | `feature-session` 또는 `script` | session | 기능 실행 임시 숫자. 의미 승격 전에는 script/session |
| `RESULT`, `RESULTS` | `script` 또는 `ui-session` | session | 입력/함수 결과. 저장 라벨이면 `save` 검토 |
| `COUNT` | `script` | session | 루프 카운터 |
| `A`-`Z` | `script` | session | ERB 임시 숫자 |
| `LOCAL`, `LOCALS` | `script` | session | ERB 지역 변수 |
| `ARG`, `ARGS` | `script` | session | ERB 인자 |

## 분해 보류 항목

| 항목 | 현재 판단 |
| --- | --- |
| `CFLAG` 개별 index | 기본은 `people`, `body`, `feature-state`, `world` 중 하나. 슬롯별 검토 전에는 `missingMapping` |
| `TFLAG` 개별 index | 기본은 `featureSession` 또는 `interaction`. 슬롯별 검토 전에는 `missingMapping` |
| `TEQUIP` 개별 index | 지속 장비가 아니면 `equipment` 금지. 기본은 `feature-session` 또는 `interaction` |
| `SAVESTR` | 커맨드 라벨/문장 조각은 `feature-session`; 저장 텍스트는 `text`; 함수 임시는 `script` |
| `LOCAL/#DIM` | 의미 승격 전에는 무조건 `script` |
| 텍스트 identity | 기본 이름은 `people.identity`, 표시/조사/호칭 규칙은 `text` |
| 가격 정책 | 정적 가격은 정의 데이터, 현재 판매/노출 목록은 `session.shop` 또는 view model, 보유 수량은 `inventory`, 거래 결과는 `economy`, 지속 해금/제한만 `shop` |
| 이벤트 본문 | 예약은 `run`, 진행 플래그는 `world`/`feature-state`, 실제 효과는 각 도메인 액션 |
