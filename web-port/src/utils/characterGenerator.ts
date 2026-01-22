/**
 * 랜덤 캐릭터 생성 시스템
 * ERB의 ADDCHARA 랜덤 생성 로직을 재현
 */

import type { Character } from '../types/game';

// 랜덤 범위 헬퍼
const random = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randomChoice = <T>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};

// 일본 이름 풀 (예시)
const FAMILY_NAMES = [
  '사토', '스즈키', '타카하시', '타나카', '이토', '와타나베', '야마모토', '나카무라',
  '코바야시', '카토', '요시다', '야마다', '사사키', '야마구치', '마츠모토', '이노우에',
  '키무라', '하야시', '시미즈', '야마자키', '모리', '아베', '이케다', '하시모토',
  '야마시타', '이시카와', '나카지마', '마에다', '후지타', '오가와', '고토', '오카다',
  '하세가와', '무라카미', '콘도', '이시이', '사이토', '사카모토', '엔도', '아오키'
];

const GIVEN_NAMES_FEMALE = [
  '사쿠라', '하나', '아이', '유이', '리나', '미사키', '나나', '아야카', '미유', '카나',
  '레이', '사키', '마이', '아카네', '유키', '에미', '히나', '모모', '카오리', '치히로',
  '메이', '아오이', '리카', '마나', '노조미', '유리', '아스카', '하루카', '미사토', '카나코',
  '아키', '마리나', '나츠키', '레나', '사야', '토모코', '에리', '유카', '사오리', '아미'
];

// 능력치 ID (ABL) - CSV/Abl.csv 참조
const ABL_IDS = {
  욕망: 0,
  기교: 1,
  봉사정신: 2,
  C감각: 3,
  V감각: 4,
  A감각: 5,
  B감각: 6,
  M감각: 7,
  매력: 8,
  요리: 9,
  노래: 10,
  댄스: 11,
  연기: 12,
  지식: 13,
  // ... 더 많은 능력치
};

// 소질 ID (TALENT) - CSV/Talent.csv 참조
const TALENT_IDS = {
  처녀: 0,
  동정: 1,
  음란: 2,
  겁쟁이: 3,
  호기심왕성: 4,
  습득빠름: 5,
  습득느림: 6,
  감정풍부: 7,
  쿨: 8,
  성실: 9,
  반항적: 10,
  // 신체 관련
  풍만한가슴: 20,
  작은가슴: 21,
  민감한클리토리스: 22,
  민감한유두: 23,
  민감한질: 24,
  // 성격 관련
  순종적: 30,
  도S: 31,
  도M: 32,
  승부사: 33,
  // ... 더 많은 소질
};

// 파라미터 ID (PALAM)
const PALAM_IDS = {
  쾌C: 0,
  쾌V: 1,
  쾌A: 2,
  쾌B: 3,
  쾌M: 4,
  쾌락: 5,
  욕정: 6,
  반감: 7,
  // ...
};

/**
 * 랜덤 캐릭터 생성 설정
 */
interface RandomCharacterConfig {
  minId?: number;        // 최소 ID (스페셜 캐릭터 제외용)
  maxId?: number;        // 최대 ID
  basePrice?: number;    // 기본 가격
  priceVariation?: number; // 가격 변동 범위
}

/**
 * 랜덤 능력치 생성 (모두 0으로 시작)
 */
function generateRandomAbilities(): Record<number, number> {
  const abilities: Record<number, number> = {};

  // 모든 능력치 0으로 초기화
  for (let i = 0; i <= 20; i++) {
    abilities[i] = 0;
  }

  return abilities;
}

/**
 * 랜덤 소질 생성
 */
function generateRandomTalents(): number[] {
  const talents: number[] = [];

  // 처녀 소질 (80% 확률)
  if (Math.random() < 0.8) {
    talents.push(TALENT_IDS.처녀);
  }

  // 성격 소질 (1~2개)
  const personalityTalents = [
    TALENT_IDS.순종적, TALENT_IDS.반항적, TALENT_IDS.성실,
    TALENT_IDS.호기심왕성, TALENT_IDS.감정풍부, TALENT_IDS.쿨
  ];
  const numPersonality = random(1, 2);
  for (let i = 0; i < numPersonality; i++) {
    const talent = randomChoice(personalityTalents);
    if (!talents.includes(talent)) {
      talents.push(talent);
    }
  }

  // 신체 소질 (0~2개)
  const bodyTalents = [
    TALENT_IDS.풍만한가슴, TALENT_IDS.작은가슴,
    TALENT_IDS.민감한클리토리스, TALENT_IDS.민감한유두, TALENT_IDS.민감한질
  ];
  const numBody = random(0, 2);
  for (let i = 0; i < numBody; i++) {
    const talent = randomChoice(bodyTalents);
    if (!talents.includes(talent)) {
      talents.push(talent);
    }
  }

  // 성향 소질 (0~1개)
  if (Math.random() < 0.3) {
    const tendencyTalents = [TALENT_IDS.도S, TALENT_IDS.도M];
    talents.push(randomChoice(tendencyTalents));
  }

  return talents;
}

/**
 * 랜덤 파라미터 생성
 */
function generateRandomParameters(): Record<number, number> {
  const params: Record<number, number> = {};

  // 기본적으로 모두 0
  for (let i = 0; i <= 10; i++) {
    params[i] = 0;
  }

  return params;
}

/**
 * 랜덤 가격 생성
 */
function generateRandomPrice(config: RandomCharacterConfig): Record<number, number> {
  const base = config.basePrice || 50000;
  const variation = config.priceVariation || 30000;

  // 기본 가격에서 ±variation 범위
  const price = base + random(-variation, variation);

  return {
    1001: Math.max(10000, price) // 최소 10000엔
  };
}

/**
 * 랜덤 모집 캐릭터 생성 (계약 전, 임시 ID 사용)
 * 계약 시 실제 ID 부여됨
 */
export function generateRecruitableCharacter(config: RandomCharacterConfig = {}): Character {
  return generateRandomCharacter(-1, config); // 임시 ID -1
}

/**
 * 랜덤 캐릭터 생성
 */
export function generateRandomCharacter(id: number, config: RandomCharacterConfig = {}): Character {
  // 이름 생성
  const familyName = randomChoice(FAMILY_NAMES);
  const givenName = randomChoice(GIVEN_NAMES_FEMALE);
  const name = `${familyName} ${givenName}`;
  const callName = givenName; // 호칭은 이름만

  // 나이 (18~30)
  const age = random(18, 30);

  // 기본 스탯 생성
  const baseStats = {
    진짜연령: age,
    외견연령: age + random(-2, 2),
    키: random(150, 175),
    체중: random(40, 60),
    가슴: random(70, 95),
    허리: random(55, 70),
    엉덩이: random(80, 100),
  };

  return {
    id,
    name,
    callName,
    baseStats,
    abilities: generateRandomAbilities() as any,
    talent: generateRandomTalents(),
    mark: [],
    exp: [],
    relation: [],
    flags: {},
    price: generateRandomPrice(config), // 가격 정보 추가
  };
}

/**
 * 여러 랜덤 캐릭터 생성
 */
export function generateRandomCharacters(
  startId: number,
  count: number,
  config: RandomCharacterConfig = {}
): Character[] {
  const characters: Character[] = [];

  for (let i = 0; i < count; i++) {
    characters.push(generateRandomCharacter(startId + i, config));
  }

  return characters;
}

/**
 * 예시 캐릭터 생성 (테스트용)
 */
export function createSampleCharacter(): Character {
  return {
    id: 9999,
    name: '사토 사쿠라',
    callName: '사쿠라',
    baseStats: {
      진짜연령: 20,
      외견연령: 19,
      키: 165,
      체중: 48,
      가슴: 88,
      허리: 58,
      엉덩이: 86,
    },
    abilities: {
      [ABL_IDS.욕망]: 2,
      [ABL_IDS.기교]: 3,
      [ABL_IDS.봉사정신]: 4,
      [ABL_IDS.C감각]: 2,
      [ABL_IDS.V감각]: 1,
      [ABL_IDS.매력]: 5,
      [ABL_IDS.연기]: 3,
    } as any,
    talent: [
      TALENT_IDS.처녀,
      TALENT_IDS.순종적,
      TALENT_IDS.풍만한가슴,
      TALENT_IDS.민감한유두,
      TALENT_IDS.성실,
    ],
    mark: [],
    exp: [],
    relation: [],
    flags: {},
    price: {
      1001: 45000, // 계약금 45,000엔
    },
  };
}
