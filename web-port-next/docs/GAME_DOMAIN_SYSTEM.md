# 게임 데이터 관리 설계

## 플로우 기반 데이터 역설계 v1

이 절의 기준은 “원본에 어떤 배열이 있었는가”가 아니라 “게임 플로우를 끝까지 실행하려면 어떤 데이터가 필요한가”다.

새 구현의 데이터는 다음 네 덩어리면 충분하다.

```ts
type GameData = {
  definitions: GameDefinitions;
  save: GameState;
  session: GameSession;
  views: BuiltWhenNeeded;
};
```

| 덩어리 | 의미 | 저장 여부 |
| --- | --- | --- |
| `definitions` | 아이템, 인물 원형, 훈련 커맨드, 촬영 장면, 미션, 업무 같은 정적 표 | 세이브에 저장하지 않음 |
| `save` | 현재 회차를 이어가기 위해 필요한 실제 상태 | 저장 |
| `session` | 현재 화면/행동 중에만 필요한 선택값과 계산 버퍼 | 보통 저장하지 않음 |
| `views` | 화면을 그리기 위해 매번 계산하는 객체 | 저장하지 않음 |

원본 자료는 이 네 덩어리에 들어가지 않는다. 원본 자료는 빠진 기능이 없는지 검증하거나 세이브/변수 변환을 할 때만 쓴다.

### 저장 상태의 큰 모양

저장 상태는 DB 테이블처럼 생각한다. 각 객체는 “무엇에 종속되는가”로 나눈다.

```ts
type GameState = {
  run: RunState;
  economy: EconomyState;
  people: PeopleState;
  body: BodyState;
  social: SocialState;
  inventory: InventoryState;
  equipment: EquipmentState;
  shop: ShopState;
  mission: MissionState;
  work: WorkState;
  world: WorldState;
  text: TextState;
  settings: SettingsState;
  meta: MetaState;
};
```

| 객체 | 들어가는 데이터 | 들어가지 않는 데이터 |
| --- | --- | --- |
| `run` | 현재 주차, 월, 월 안의 주차, 연도, 전반/후반, 게임 목표, 현재 진행 단계, 예약 이벤트 | 돈, 아이템, 인물 능력치 |
| `economy` | 현재 자금과 회계 결과 | 아이템 수량, 현재 상점 선택값 |
| `people` | 현재 회차에 존재하는 인물 목록과 인물별 기본 상태 | 현재 훈련 대상/촬영 대상 선택값 |
| `body` | 인물별 신체 기초치, 결과용 신체 수치, 자원, 상태 파라미터, 각인, 오염, 생식/성적 이력, body owner 조건 플래그 | 현재 커맨드 계산 버퍼 |
| `social` | 인물 간 관계와 관계 역할 | 일회성 대화 선택값 |
| `inventory` | 보유 아이템 수량, 아이템별 영구 제한 | 현재 판매 가능 목록 |
| `equipment` | 인물별 지속 장비/의복 상태 | 훈련 중 임시 장비 |
| `shop` | 상점 해금, 영구 제한, 판매/노출 진행 상태 | 현재 판매 가능 목록, 현재 선택 상품 |
| `mission` | 미션별 수락/진행/성공/실패/보상 수령 상태 | 목록 페이지, 현재 선택한 미션 |
| `work` | 업무 배정, 창관/촬영/아르바이트 경력과 누적 진행 | 업무 한 번의 중간 계산값 |
| `world` | 스토리 진행, 전역 이벤트, 장소 해금 | 캐릭터별 신체 상태 |
| `text` | 저장해야 하는 호칭, 이름 변경, 지속 문장 설정 | 현재 화면 출력 로그 |
| `settings` | 시스템 설정, 표시 옵션, 디버그/테스트 옵션 | 게임 진행 상태 |
| `meta` | 회차 밖 업적, 클리어 보너스, 전역 해금 | 현재 회차의 돈/날짜 |

### 인물 데이터

인물은 하나의 거대한 변수 묶음이 아니라 여러 하위 객체가 같은 `characterId`를 참조하는 구조가 맞다.

```ts
type CharacterRecord = {
  id: CharacterId;
  templateId: CharacterTemplateId;
  identity: CharacterIdentity;
  lifecycle: CharacterLifecycle;
  growth: CharacterGrowth;
};

type CharacterBodyRecord = {
  characterId: CharacterId;
  baseStats: Record<BaseStatId, number>;
  maxBaseStats: Record<BaseStatId, number>;
  bodyStats: Record<string, number>;
  reproduction: ReproductionState;
  sexualHistory: SexualHistory;
  imprints: Record<MarkId, number>;
  conditionParams: Record<ParamId, number>;
  trainingResources: Record<ResourceId, number>;
  conditionFlags: Record<string, boolean | number | string>;
};

type RelationshipRecord = {
  fromCharacterId: CharacterId;
  toCharacterId: CharacterId;
  affinity: number;
  roles: readonly RelationshipRole[];
};
```

| 하위 객체 | 종속 기준 | 이유 |
| --- | --- | --- |
| 인물 기본 정보 | 인물 자신 | 이름, 원형, 소속, 은퇴/영입 여부는 인물의 정체성 |
| 성장/능력 | 인물 자신 | 능력, 소질, 경험은 인물의 성장 상태 |
| 신체/생식/성적 이력 | 인물 자신 | 훈련/촬영/업무 결과로 바뀌지만 소유자는 신체 상태 |
| 관계 | 인물 쌍 | A가 B에게 갖는 관계는 단일 인물 필드가 아니라 방향성 관계 |
| 장비/의복 | 인물 자신 | 지속 착용 상태는 인물에게 붙지만, 임시 장비는 실행 중 데이터 |
| 업무 경력 | 업무 시스템이 인물 id 참조 | 업무별 누적과 배정은 업무 플로우에서 관리 |

현재 대상, 현재 조수, 현재 촬영 대상은 인물 저장 데이터가 아니다. 그것은 `session`의 역할 배정이다.

### 플로우별 필요한 데이터

| 플로우 | 읽는 데이터 | 실행 중 데이터 | 저장 결과 |
| --- | --- | --- | --- |
| 새 게임 | 게임 모드 정의, 인물 원형, 초기 아이템/자금 규칙 | 모드 선택값 | `run`, `economy`, `people`, `body`, `inventory`, `world` 초기화 |
| 메인 화면 | 날짜, 목표, 돈, 인물 수, 해금, 현재 상태 | 현재 메뉴 선택 | 저장 변경 없음. 다음 기능으로 이동 |
| 아이템 구매 | 아이템 정의, 판매 규칙, 돈, 보유 수량, 시설/해금 | 현재 판매 목록, 선택 상품, 수량, 확인 단계 | 돈 감소, 보유 수량 증가, 필요 시 시설/해금 갱신 |
| 인물 영입 | 인물 원형, 영입 목록, 돈, 인원 제한 | 선택 인물, 확인 단계 | 돈 감소, 인물 생성, 신체/관계/장비 기본값 생성 |
| 방문/시설 | 장소 정의, 시설 진행, 돈, 대상 인물 상태 | 선택 장소, 선택 메뉴, 확인 단계 | 돈/시설/인물/신체/세계 진행 변경 |
| 미션 | 미션 정의, 진행 상태, 인물/돈/세계 조건 | 목록 페이지, 선택 미션, 보고 확인 | 미션 상태, 돈, 보상, 인물/세계 효과 변경 |
| 업무/창관 | 업무 정의, 인물 상태, 시설, 시간대 | 업무 선택, 참여 인물, 중간 결과 | 돈, 인물 경험, 신체 상태, 업무 경력, 시간 진행 |
| 촬영 | 장면 정의, 대상 조건, 장비/시설, 시간대 | 촬영 대상, 선택 장면 목록, 남은 촬영량, 장면별 결과 버퍼 | 돈, 인물 경험/피로, 촬영 경력, 시간 진행 |
| 훈련 | 훈련 커맨드 정의, 대상/조수 상태, 아이템/장비 | 대상/조수/실행자, 선택 커맨드, 자극/증감/결과 버퍼 | 인물 성장, 신체 상태, 관계, 아이템/돈, 시간 진행 |
| 턴 종료 | 날짜, 시간대, 예약 이벤트, 미션 기한, 월말 비용 규칙 | 처리 중 이벤트 큐 | 날짜/시간대, 월말 비용, 미션 기한, 세계/인물 자동 이벤트 |
| 저장/로드 | 저장 상태 전체 | 저장 슬롯 선택 | 파일 저장 또는 상태 교체 |

이 표가 실제 구현의 기준이다. 원본에서 어떤 변수가 쓰였는지는 이 표의 각 칸을 검증할 때만 본다.

### 정적 정의 데이터

정적 정의 데이터는 “게임 규칙 표”다. 플레이 중 바뀌는 값은 절대 넣지 않는다.

| 정의 | 키 | 포함 데이터 |
| --- | --- | --- |
| `ItemDefinition` | `itemId` | 이름, 기본 가격, 분류, 사용 가능 조건, 사용 효과 핸들러 |
| `RecruitDefinition` | `recruitId` | 영입 가능한 인물 원형, 가격, 표시 조건 |
| `CharacterTemplate` | `templateId` | 초기 이름, 초기 능력/소질/경험/신체/관계 seed |
| `TrainingCommandDefinition` | `commandId` | 커맨드 이름, 분류, 가능 조건, 계산 핸들러 |
| `ShootingSceneDefinition` | `sceneId` | 장면 이름, 비용/촬영량, 표시 조건, 결과 핸들러 |
| `MissionDefinition` | `missionId` | 제목, 표시 조건, 수락 조건, 성공 판정, 보상 |
| `WorkDefinition` | `workId` | 업무 이름, 참여 조건, 결과 계산, 시간 소모 |
| `FacilityDefinition` | `facilityId` | 장소/시설 이름, 해금 조건, 메뉴 항목 |
| `StatDefinition` | `statId` | 표시 이름, 성장/레벨 규칙, 화면 표시 규칙 |

### 실행 중 데이터

실행 중 데이터는 화면이나 행동이 끝나면 버릴 수 있어야 한다.

```ts
type GameSession = {
  ui: UiSession;
  shop?: ShopSession;
  recruit?: RecruitSession;
  visit?: VisitSession;
  mission?: MissionSession;
  work?: WorkSession;
  shooting?: ShootingSession;
  training?: TrainingSession;
};
```

| 세션 | 포함 데이터 | 끝나면 |
| --- | --- | --- |
| `shop` | 선택 상품, 수량, 확인 단계 | 구매 결과만 저장하고 폐기 |
| `recruit` | 선택한 영입 후보, 확인 단계 | 생성된 인물만 저장하고 폐기 |
| `visit` | 선택 장소, 선택 메뉴, 임시 확인값 | 효과만 저장하고 폐기 |
| `mission` | 목록 페이지, 선택 미션, 보고 확인 | 진행 상태/보상만 저장하고 폐기 |
| `work` | 선택 업무, 참여 인물, 중간 결과 | 업무 결과만 저장하고 폐기 |
| `shooting` | 대상, 선택 장면 목록, 장면별 계산 버퍼 | 촬영 결과만 저장하고 폐기 |
| `training` | 대상/조수/실행자, 선택 커맨드, 계산 버퍼 | 훈련 결과만 저장하고 폐기 |

현재 화면에서 보이는 목록은 세션 또는 화면 계산 객체다. 세이브에 넣지 않는다.

### 화면 계산 객체

화면 계산 객체는 매번 다시 만들 수 있어야 한다.

| 화면 객체 | 재료 |
| --- | --- |
| `MainMenuView` | `run`, `economy`, `people`, `shop`, `mission`, `work`, `world` |
| `ItemShopView` | 아이템 정의, 판매 규칙, `economy.account.currentMoney`, `inventory`, `shop`, `world` |
| `RecruitView` | 영입 정의, 돈, 인원 제한, 해금 상태 |
| `MissionListView` | 미션 정의, 미션 진행, 조건 판단 |
| `ShootingPlanView` | 장면 정의, 대상 상태, 장비/시설, 시간대 |
| `TrainingCommandView` | 커맨드 정의, 대상/조수 상태, 보유 아이템, 임시 장비 |
| `CharacterProfileView` | 인물 저장 상태, 신체 상태, 관계, 표시 규칙 |

이 객체들은 저장하지 않는다. 저장하면 조건 변경과 화면 표시가 어긋난다.

## 핵심 결론

데이터는 다섯 종류로 나눈다.

| 종류 | 저장 여부 | 의미 | 예시 |
| --- | --- | --- | --- |
| 정의 데이터 | 세이브에 저장하지 않음 | 게임 실행 중 바뀌지 않는 표 | 아이템 정의, 능력 이름, 소질 이름, 훈련 커맨드 정의, 캐릭터 원형 |
| 저장 데이터 | 세이브에 저장 | 현재 회차의 지속 상태 | 날짜, 돈, 캐릭터, 보유 아이템, 미션 진행, 상점 해금 |
| 실행 중 데이터 | 보통 세이브하지 않음 | 현재 화면/행동 동안만 필요한 상태 | 현재 선택한 아이템, 촬영 장면 선택 목록, 훈련 대상/조수 |
| 계산/표시 데이터 | 저장하지 않음 | 저장 데이터와 정의 데이터에서 매번 계산하는 값 | 현재 판매 가능 목록, 커맨드 가능 여부, 캐릭터 표시 카드 |
| 원본 근거 | 게임 상태 아님 | 원본 주소와 새 구조를 대조하기 위한 자료 | `ITEM:6`, `CFLAG:734`, ERB 파일/라인 |

이 구분을 어기면 원본 ERB의 전역 변수 혼선이 그대로 재현된다.

## 정의 데이터

정의 데이터는 DB의 마스터 테이블에 가깝다. 원본 CSV/Chara CSV에서 읽어 오며, 플레이 중 바뀌지 않는다.

| 데이터 | 키 | 내용 | 원본 |
| --- | --- | --- | --- |
| 아이템 정의 | `itemId` | 이름, 가격, 분류, 설명 | `Item.csv` 중 실제 아이템 |
| 영입 목록 정의 | `listingId` | 영입 대상, 가격, 표시 조건 후보 | `Item.csv` 중 캐릭터 listing |
| 상점 listing 정의 | `listingId` | 판매 대상과 기본 표시 여부 | `Item.csv`, 상점 ERB |
| 능력 정의 | `abilityId` | 능력 이름 | `Abl.csv` |
| 기초치 정의 | `baseStatId` | 체력/기력/신체 수치 이름 | `BASE.csv` |
| 소질 정의 | `traitId` | 소질/특성 이름 | `Talent.csv` |
| 경험 정의 | `experienceId` | 경험 이름 | `exp.csv` |
| 각인 정의 | `markId` | 각인 이름 | `Mark.csv` |
| 상태 파라미터 정의 | `paramId` | 쾌감/윤활/욕정/반감 등 | `Palam.csv` |
| 훈련 커맨드 정의 | `commandId` | 커맨드 이름과 기본 분류 | `Train.csv` |
| 자극 원천 정의 | `sourceId` | 훈련 계산 원천 | `source.csv` |
| 캐릭터 원형 | `templateId` | 초기 이름, 능력, 소질, 경험, 관계, 초기 플래그 | Chara CSV |

주의:

- 정의 데이터에 현재 보유 수량을 넣지 않는다.
- 정의 데이터에 현재 판매 가능 여부를 넣지 않는다.
- 정의 데이터에 세이브별 캐릭터 상태를 넣지 않는다.

## 저장 데이터

저장 데이터는 세이브 파일에 들어가는 전체 상태다. 루트는 `GameState`이고, 그 아래를 도메인별로 나눈다.

| 위치 | 소유 데이터 | 넣으면 안 되는 것 |
| --- | --- | --- |
| `run` | 날짜, 월, 주차, 시간대, 현재 진행 단계, 예약 이벤트, 마지막 대상/조수 기억 | 캐릭터 능력치, 현재 화면 선택값 |
| `economy` | 현재 자금, 확정된 거래 기록, 경제 관련 확정 플래그 | 목표 금액, 부채, 평판, 누적 매출처럼 근거가 확정되지 않은 값 |
| `people` | 캐릭터 인스턴스, 이름, 호칭, 일반 능력/소질/경험, 소속/역할 가능 상태 | 현재 훈련 대상/조수 선택값 |
| `body` | 캐릭터별 신체 기초치, 결과용 신체 수치, 생식, 성적 이력, 상태 파라미터, 훈련 자원, 각인, 오염, body owner 조건 플래그 | 훈련 중 증가 예정치 |
| `social` | 캐릭터 간 관계, 호감, 관계 역할, 관계 이력 | 캐릭터 기본 identity |
| `inventory` | 아이템 보유 수량, 확정된 사용 제한 | 현재 상점 선택값, 판매 가능 목록 |
| `equipment` | 지속 장비, 의복, 피어싱, 제한 | 훈련 중 임시 장비 모드 |
| `shop` | 상점 해금, 숨김, 영구 제한, 시설 진행 | 현재 판매 가능 목록, 현재 선택한 상품 |
| `work` | 업무 배정, 창관/촬영/아르바이트 진행, 업무 경력 | 업무 한 번의 계산 중간값 |
| `mission` | 미션별 수락/진행/성공/실패/보상 상태 | 미션 목록 화면의 페이지/선택값 |
| `world` | 장소 해금, 스토리 진행, 전역 이벤트 진행 | 캐릭터별 상태 |
| `meta` | 업적, 클리어 보너스, 회차 밖 진행 | 회차 안에서만 의미 있는 돈/날짜 |
| `settings` | 시스템 설정, 디버그/치트/테스트 옵션 | 게임 진행 플래그 |
| `text` | 저장해야 하는 호칭/문장 규칙/캐릭터별 문자열 | 현재 화면 로그 |
| `save` | 저장 슬롯, 자동저장, 마이그레이션 정보 | 게임 규칙 |

### 저장 데이터 설계 판단

`economy`는 지금은 현재 자금만 확정한다. 원본에서 목표 금액은 새 게임 목표/런 상태 성격이 강하고, 부채/평판/누적 매출은 쓰기 근거가 확정되기 전까지 필드로 만들지 않는다.

`shop`에는 현재 판매 가능 목록을 저장하지 않는다. 현재 판매 가능 목록은 상점에 들어갈 때 정의 데이터, 보유 상태, 해금 상태, 날짜, 캐릭터 상태를 보고 계산한다. 저장하는 것은 “영구 해금/숨김/시설 진행”뿐이다.

`people`에는 현재 대상/조수를 저장하지 않는다. 현재 대상/조수는 훈련, 촬영, 미션 같은 현재 행동의 역할 바인딩이다. 마지막 대상/조수 기억은 `run.actorMemory`에 둔다.

## 실행 중 데이터

실행 중 데이터는 현재 화면이나 행동이 끝나면 버려도 되는 값이다. 루트는 `GameSession`이다.

| 위치 | 소유 데이터 | 종료 시 처리 |
| --- | --- | --- |
| `ui` | 현재 화면, 선택지, 입력 대기, 표시 로그 | 화면 전환 시 교체 |
| `shop` | 현재 판매 가능 listing, 선택한 item/listing, 수량, 확인 단계 | 상점 종료 시 폐기 |
| `interaction` | 현재 대상/조수/실행자, 선택 커맨드, 임시 장비, 자극 원천, 증가/감소 예정치, 결과 버퍼 | 행동 결과 적용 뒤 초기화 |
| `featureSession` | 아직 구체 기능으로 분리하지 않은 임시 실행 프레임 | 기능 완료 뒤 초기화 |
| `script` | 원본 ERB 해석/변환 보조용 지역 변수, 인자, 결과값 | 함수/프레임 종료 시 폐기 |

실행 중 데이터의 목적은 저장 상태를 오염시키지 않는 것이다. 예를 들어 촬영 장면 선택 목록, 훈련 커맨드 계산값, 상점 구매 수량은 플레이 중에는 중요하지만 세이브 데이터의 핵심 구조가 아니다.

## 계산/표시 데이터

계산/표시 데이터는 매번 새로 만들 수 있어야 한다.

| 데이터 | 계산 재료 | 저장 금지 이유 |
| --- | --- | --- |
| 현재 판매 가능 목록 | 아이템 정의, 상점 해금, 보유 아이템, 돈, 날짜, 캐릭터 상태 | 조건이 바뀌면 즉시 다시 계산 가능 |
| 커맨드 가능 여부 | 훈련 커맨드 정의, 대상/조수 상태, 아이템, 장비 | 매 입력마다 달라질 수 있음 |
| 캐릭터 정보 화면 | 캐릭터 저장 상태, 정의 데이터, 표시 규칙 | 화면 출력용 조합값 |
| 촬영 가능 대상 목록 | 캐릭터 상태, 시간대, 장비, 촬영 조건 | 촬영 화면 진입 때 계산 가능 |
| 미션 표시 목록 | 미션 정의, 진행 상태, 해금 조건 | 목록 화면용 |

계산/표시 데이터를 저장하면 세이브와 실제 조건이 어긋난다.

## 원본 근거 데이터

원본 근거 데이터는 게임 데이터가 아니다. 새 구조가 맞는지 검증하거나 원본 세이브/변수 주소를 변환할 때만 쓴다.

| 자료 | 용도 |
| --- | --- |
| 원본 CSV/Chara CSV | 정의 데이터 입력 |
| 원본 ERB 파일/라인 | 기능 흐름과 상태 변경 근거 |
| `data/game-system-analysis/*` | 호출 흐름, 동적 호출, 흐름 제어 대조 |
| 원본 주소 작업표 | 어떤 원본 주소를 아직 검토해야 하는지 추적 |
| 원본 주소 변환표 | 확정된 원본 주소를 새 데이터 위치에 연결 |

원본 주소 변환표는 게임 모델이 아니다. 예를 들어 `ITEM:6`은 저장 구조가 아니라 “원본에서 장비 보유 여부를 확인하던 주소”다. 새 구조는 `inventory.itemCounts[itemId]`처럼 의미 중심으로 둔다.

## 핵심 객체별 설계

### 시간과 진행

시간은 `run.clock`이 소유한다.

필요한 값:

| 필드 성격 | 이유 |
| --- | --- |
| 전체 경과 주차 | 목표 기간, 엔딩, 표시 |
| 월 | 월 변경, 급여/유지비, 이벤트 |
| 월 안의 주차 | 월별 표시/계산 |
| 연도 | 월 변경 누적 |
| 시간대 | 전반/후반 또는 훈련/이벤트 phase |

턴 종료 서비스가 시간 값을 바꾸고, 다른 도메인은 직접 날짜를 수정하지 않는다.

### 돈

돈은 `economy.account.currentMoney` 하나로 시작한다.

돈을 바꾸는 기능:

| 기능 | 변경 |
| --- | --- |
| 새 게임 | 초기 자금 설정 |
| 아이템 구매 | 감소 |
| 인물 영입 | 감소 |
| 미션 보상/페널티 | 증가 또는 감소 |
| 업무/촬영 | 증가 |
| 월말 유지비 | 감소 |

목표 금액은 돈 계좌가 아니라 게임 목표다. `run` 또는 별도 `objective` 성격으로 둔다.

### 캐릭터

캐릭터는 `people.characters[characterId]`가 루트다. 캐릭터 원형은 정의 데이터이고, 플레이 중 생성된 캐릭터 인스턴스는 저장 데이터다.

캐릭터에 직접 종속되는 것:

| 묶음 | 위치 |
| --- | --- |
| 이름/호칭/별명/원형 연결 | `people.characters[id].identity` |
| 일반 능력/소질/경험 | `people.characters[id].attributes` |
| 소속/영입/은퇴/조수 가능 | `people.characters[id].flags.lifecycle` |
| 신체/생식/성적 이력/오염 | `body.byCharacterId[id]` |
| 관계 | `social.relationships[pairKey]` |
| 지속 장비/의복 | `equipment.byCharacterId[id]` |
| 업무 배정/업무 경력 | `work`에서 캐릭터 id로 참조 |

현재 훈련 대상, 현재 촬영 대상, 현재 미션 선택 대상은 캐릭터 저장 데이터가 아니다. 그것은 실행 중 역할 바인딩이다.

M33 기준으로 Chara seed의 `BASE`, `ABL`, `TALENT`, `EXP`는 생성 시점에 정의 데이터에서 인스턴스 저장 상태로 복사된다. 일반 능력/소질/경험은 `people.characters[id].attributes`가 소유하고, body owner로 판정된 신체형 `BASE/MAXBASE`, 업무/촬영/훈련 결과가 공유하는 `bodyStats`, `PALAM` 결과인 `conditionParams`, `JUEL` 결과인 `trainingResources`, `MARK` 결과인 `imprints`는 `body.byCharacterId[id]`가 소유한다. CFLAG/FLAG/PBAND 조건 플래그의 최종 의미 분해는 M34가 owner이며, M33에서는 M34로 transfer 근거를 남긴다.

### 아이템과 상점

아이템과 상점은 반드시 네 조각으로 나눈다.

| 조각 | 위치 | 설명 |
| --- | --- | --- |
| 아이템 정의 | 정의 데이터 | 이름, 가격, 분류 |
| 보유 수량 | `inventory.itemCounts` | 세이브에 남는 실제 보유량 |
| 상점 지속 진행 | `shop.progress` | 영구 해금, 숨김, 시설 진행 |
| 현재 판매/선택 상태 | `session.shop` 또는 화면 모델 | 현재 보이는 목록, 선택 item, 수량 |

`ITEMSALES` 같은 원본 값은 세이브 상태로 고정하지 않는다. 원본에서 계산 캐시처럼 쓰였다면 새 구현에서도 상점 진입 시 계산한다.

### 훈련

훈련은 저장 도메인이 아니다. 훈련은 기능이다.

훈련 중 필요한 실행 데이터:

| 데이터 | 위치 |
| --- | --- |
| 대상/조수/실행자 | `session.interaction.participants` |
| 현재/이전/다음 커맨드 | `session.interaction.commandFlow` |
| 임시 장비/모드 | `session.interaction.temporaryEquipment` |
| 자극 원천 | `session.interaction.sources` |
| 상태 증가/감소 예정치 | `session.interaction.paramDeltas` |
| 체력/기력 감소 예정치 | `session.interaction.baseLoss` |
| 절정/사정/구슬 결과 버퍼 | `session.interaction.resultBuffers` |

훈련 완료 후 결과만 저장 데이터에 적용한다.

| 결과 | 적용 위치 |
| --- | --- |
| 능력/경험 증가 | `people.characters[id].attributes` |
| 체력/기력/신체 변화 | `body.byCharacterId[id]` |
| 구슬/각인/오염 | `body.byCharacterId[id]` |
| 관계 변화 | `social.relationships` |
| 돈/아이템 변화 | `economy`, `inventory` |

### 촬영

촬영도 기능이다. 촬영 세션은 대상, 선택 장면, 남은 촬영량, 장면별 계산값을 갖는다. 완료하면 돈/경험/피로/촬영 진행만 저장 데이터에 반영하고 턴 종료로 간다.

저장할 것:

| 데이터 | 위치 |
| --- | --- |
| 촬영 수익 | `economy.account.currentMoney` |
| 대상 경험/상태 | `people`, `body` |
| 촬영 점수/진행 | `work` 또는 촬영 전용 하위 상태 |

저장하지 않을 것:

| 데이터 | 이유 |
| --- | --- |
| 현재 고른 장면 목록 | 현재 촬영 세션 선택값 |
| 장면별 중간 계산값 | 실행 중 결과 버퍼 |
| 표시 가능한 장면 목록 | 조건으로 다시 계산 가능 |

### 미션

미션은 정의와 진행 상태를 분리한다.

| 데이터 | 위치 |
| --- | --- |
| 미션 제목/조건/보상 정의 | 정의 데이터 또는 핸들러 테이블 |
| 수락/성공/실패/대성공 상태 | `mission.byMissionId` |
| 기한 | `mission` 또는 캐릭터별 미션 상태 |
| 보상 적용 | `economy`, `people`, `inventory`, `world` |
| 현재 목록 페이지/선택값 | `ui` 또는 `featureSession` |

## ID 설계

원본 index를 그대로 런타임 키로 쓰지 않는다. 단, 초기에는 원본 ID를 보존해서 추적 가능하게 한다.

| ID | 의미 |
| --- | --- |
| `itemId` | 새 구현의 아이템 정의 키. 원본 ID는 source metadata에 보존 |
| `listingId` | 상점/영입 표시 항목 키. itemId와 다를 수 있음 |
| `characterTemplateId` | 캐릭터 원형 키 |
| `characterId` | 세이브 안에서 생성된 캐릭터 인스턴스 키 |
| `missionId` | 미션 정의/진행 키 |
| `sceneId` | 촬영 장면 정의 키 |
| `relationshipId` | `fromCharacterId + toCharacterId` 방향성 관계 키 |

원본 `NO`, `ITEM:6`, `CFLAG:734` 같은 값은 새 키가 아니라 변환 근거다.
