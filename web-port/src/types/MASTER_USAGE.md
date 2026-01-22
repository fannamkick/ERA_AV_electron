# Master Character 타입 사용 가이드

## 개요

`MasterCharacter` 타입은 주인공(조교자/프로듀서)의 데이터를 관리하기 위한 전용 타입입니다.

일반 `Character` 타입과 달리 게임 진행자로서 필요한 **최소한의 데이터만** 포함하여:
- 타입 안정성 향상
- 메모리 효율성 개선
- 명확한 의도 표현

## 기본 구조

```typescript
interface MasterCharacter {
  name: string;              // 마스터 이름
  base: MasterBase;          // 기본 정보 (7개 항목)
  abl: MasterAbilities;      // 능력치 (2개 항목)
  exp: MasterExperience;     // 경험치 (6개 항목)
  talent: MasterTalents;     // 특성 (17개 가능)
  cflag: MasterFlags;        // 플래그 (30개 이상)
}
```

## 사용 예시

### 1. 마스터 생성

```typescript
import { createMasterCharacter } from '@/types/master';

// 기본 생성 (NORMAL 난이도)
const master = createMasterCharacter();

// 난이도 지정
const easyMaster = createMasterCharacter(1, '홍길동');
const hardMaster = createMasterCharacter(3, '프로듀서');
```

### 2. GameStore에서 사용

```typescript
// zustand store에서 접근
const { master } = useGameStore();

// 기교 레벨 확인
console.log(`기교: Lv ${master.abl[12]}`);

// 공헌도 확인
console.log(`공헌도: ${master.exp[90]}`);

// 특성 확인
if (master.talent[55]) {
  console.log('조합지식 보유');
}
```

### 3. 능력치 업데이트

```typescript
import { MasterHelpers } from '@/types/master';

// 기교 레벨 증가 (상점에서 구매 시)
const newMaster = MasterHelpers.increaseTechnique(master, 1);

// 공헌도 증가 (캐릭터 판매 시)
const updatedMaster = MasterHelpers.increaseContribution(master, 100);

// 인기 증가 (창관/AV 성공 시)
const popularMaster = MasterHelpers.increasePopularity(master, 50);
```

### 4. 특성 관리

```typescript
import { MasterHelpers } from '@/types/master';

// 특성 추가
const masterWithTalent = MasterHelpers.addTalent(master, 55); // 조합지식

// 특성 제거
const masterWithoutTalent = MasterHelpers.removeTalent(master, 55);

// 특성 보유 확인
if (MasterHelpers.hasTalent(master, 93)) {
  console.log('EXTRA 모드 해금됨');
}
```

### 5. 플래그 관리

```typescript
import { MasterHelpers } from '@/types/master';

// 플래그 설정
const updatedMaster = MasterHelpers.setFlag(master, 65, 1); // 서큐버스 활성화

// 플래그 읽기
const succubusFlag = MasterHelpers.getFlag(master, 65);
if (succubusFlag > 0) {
  console.log('서큐버스 모드 활성화');
}

// 첫 키스 상태 확인
const firstKiss = MasterHelpers.getFlag(master, 16);
if (firstKiss === -1) {
  console.log('아직 첫 키스 경험 없음');
}
```

## 원본 ERB 대응표

### BASE:MASTER 매핑

| TypeScript | ERB | 설명 | 사용처 |
|------------|-----|------|--------|
| `master.base[0]` | `BASE:MASTER:0` | 체력 | PASSOUT.ERB |
| `master.base[1]` | `BASE:MASTER:1` | 기력 | PASSOUT.ERB |
| `master.base[2]` | `BASE:MASTER:2` | 사정게이지 | 조교 커맨드 |
| `master.base[4]` | `BASE:MASTER:4` | 사정량 | COMF89, TRAIN_MAIN |
| `master.base[9]` | `BASE:MASTER:9` | 나이 | VIDEO_TITLE |
| `master.base[60]` | `BASE:MASTER:60` | 금액 관련 | SHOP_AV, SHOP_ITEM |
| `master.base[61]` | `BASE:MASTER:61` | 금액 관련 | ITEM_AV |

### ABL:MASTER 매핑

| TypeScript | ERB | 설명 | 중요도 |
|------------|-----|------|--------|
| `master.abl[0]` | `ABL:MASTER:0` | C감각 | 보통 |
| `master.abl[12]` | `ABL:MASTER:12` | 기교 | **매우 중요** |

### EXP:MASTER 매핑

| TypeScript | ERB | 설명 | 중요도 |
|------------|-----|------|--------|
| `master.exp[3]` | `EXP:MASTER:3` | 사정경험 | 보통 |
| `master.exp[9]` | `EXP:MASTER:9` | 특정 경험 | 보통 |
| `master.exp[90]` | `EXP:MASTER:90` | 공헌도 | **매우 중요** |
| `master.exp[91]` | `EXP:MASTER:91` | 인기 | **중요** |
| `master.exp[107]` | `EXP:MASTER:107` | 판매 관련 | 보통 |
| `master.exp[109]` | `EXP:MASTER:109` | C클럽 관련 | 보통 |

### TALENT:MASTER 주요 항목

| ID | 설명 | 획득 조건 |
|----|------|----------|
| 1 | 처녀 | 마스터가 여성인 경우 |
| 55 | 조합지식 | 아이템 구매/이벤트 |
| 93 | EXTRA 해금 | FLAG:31 >= 3 |
| 121, 122 | 조수 관련 | 조수 설정 시 |
| 153 | 임신 | 임신 이벤트 |

### CFLAG:MASTER 주요 항목

| ID | 설명 | 용도 |
|----|------|------|
| 16 | 첫 키스 | -1: 미경험, 1+: 경험 |
| 65 | 서큐버스 | 서큐버스 모드 플래그 |
| 102 | 임신 상태 | 2: 임신 중 (조수), 3: 임신 중 (TARGET) |
| 110 | 임신 예정일 | DAY + 10 + RAND:3 |
| 694 | NTR/상점 | NTR 관련 플래그 |

## 실전 예제

### 상점에서 기교 레벨업

```typescript
// ShopScreen.tsx
const handleBuyTechnique = () => {
  const { master, money } = useGameStore();

  // 현재 기교 레벨 확인
  const currentLevel = master.abl[12];
  if (currentLevel >= 10) {
    alert('이미 최대 레벨입니다');
    return;
  }

  // 가격 계산 (원본 SHOP_ITEM.ERB 로직)
  const price = 10000 * (currentLevel + 1);

  if (money < price) {
    alert('소지금이 부족합니다');
    return;
  }

  // 구매 처리
  const newMaster = MasterHelpers.increaseTechnique(master);
  useGameStore.setState({
    master: newMaster,
    money: money - price
  });

  console.log(`기교가 Lv${newMaster.abl[12]}이 되었다`);
};
```

### 캐릭터 판매 시 공헌도 증가

```typescript
// CharacterSellScreen.tsx
const handleSellCharacter = (char: Character) => {
  const { master } = useGameStore();

  // 공헌도 증가량 계산 (예: 매력치 / 100)
  const contribution = Math.floor(char.base[31] / 100);

  const newMaster = MasterHelpers.increaseContribution(master, contribution);
  useGameStore.setState({ master: newMaster });

  console.log(`공헌도 +${contribution} (총 ${newMaster.exp[90]})`);
};
```

### 조합지식 특성 확인 (상점)

```typescript
// ShopScreen.tsx
const isAlchemyItemAvailable = (itemId: number): boolean => {
  const { master } = useGameStore();

  // 조합지식이 필요한 아이템
  const alchemyItems = [26, 27, 30, 31, 40, 41, 43];

  if (alchemyItems.includes(itemId)) {
    // TALENT:MASTER:55 확인
    return MasterHelpers.hasTalent(master, 55);
  }

  return true;
};
```

## 하위 호환성

기존 코드와의 호환성을 위해 `masterTalents`와 `masterAbilities`를 deprecated로 유지합니다.

```typescript
// ❌ 구식 (deprecated)
const { masterAbilities } = useGameStore();
const technique = masterAbilities[12];

// ✅ 신식 (권장)
const { master } = useGameStore();
const technique = master.abl[12];
```

## 타입 안정성

TypeScript의 타입 체크 덕분에 잘못된 접근을 컴파일 시점에 방지합니다:

```typescript
// ❌ 컴파일 에러 - 존재하지 않는 능력치
master.abl[99]; // Type error!

// ✅ 정상 - 정의된 능력치만 접근 가능
master.abl[0];  // C감각
master.abl[12]; // 기교

// ❌ 컴파일 에러 - 잘못된 특성 ID
MasterHelpers.addTalent(master, 999); // Type error!

// ✅ 정상 - 정의된 특성만 추가 가능
MasterHelpers.addTalent(master, 55);  // 조합지식
```

## 마이그레이션 가이드

기존 코드를 새로운 Master 타입으로 변경하는 방법:

### Before (구식)
```typescript
const { masterAbilities, masterTalents } = useGameStore();
const technique = masterAbilities[12] || 0;
const hasAlchemy = masterTalents[55] === 1;
```

### After (신식)
```typescript
const { master } = useGameStore();
const technique = master.abl[12];
const hasAlchemy = MasterHelpers.hasTalent(master, 55);
```

## 참고 자료

- [master.ts](./master.ts) - 타입 정의 및 헬퍼 함수
- [gameStore.ts](../stores/gameStore.ts) - 실제 사용 예시
- [원본 ERB 파일](../../ERB/) - 원본 게임 로직 참조
