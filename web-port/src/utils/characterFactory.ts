// 캐릭터 생성 유틸리티

import type {
  Character,
  CharacterBase,
  CharacterAbilities,
  CharacterParameters,
  CharacterTalents,
  CharacterFlags,
  CharacterStrings,
  CharacterExperience,
  CharacterMarks,
  CharacterJuel,
  CharacterCreateData,
} from '../types/character';

import {
  randomInt,
  chance,
  randomPick,
  hasTalent,
  scaleByAge,
  calculateBodyMeasurements,
  calculateCharm,
  getBloodTypeString,
  calculatePrice,
  assignGuaranteed,
  type TalentCategory,
} from './characterGeneratorHelpers';

import {
  ASSIGNABLE_TALENTS,
  getExclusiveTalents,
} from '../constants/assignableTalents';

// ============================================================================
// 랜덤 생성 함수들
// ============================================================================

/**
 * BASE 랜덤 생성
 */
function generateRandomBase(age: number): CharacterBase {
  const height = randomInt(145, 180);
  const weight = randomInt(40, 70);
  const breastCup = randomInt(1, 7);
  const { bust, waist, hips } = calculateBodyMeasurements(height, breastCup);

  const birthMonth = randomInt(1, 12);
  const birthDay = randomInt(1, 28);
  const bloodType = randomInt(0, 3);

  return {
    0: randomInt(1000, 2000),           // 체력
    1: randomInt(1000, 2000),           // 기력
    2: 0,                               // 사정게이지
    3: 0,                               // 출연료
    7: age + randomInt(-3, 3),          // 외견연령
    8: age + randomInt(-2, 2),          // 어림연령
    9: age,                             // 진짜연령
    10: randomInt(60, 100),             // 수명
    11: birthMonth,                     // 탄생월
    12: birthDay,                       // 탄생일
    13: bloodType,                      // 혈액형
    20: height,                         // 키
    21: weight,                         // 체중
    22: bust,                           // 가슴
    23: waist,                          // 허리
    24: hips,                           // 엉덩이
    30: 0,                              // 출연료
    31: 0,                              // 매력치 (나중 계산)
    32: randomInt(0, 99),               // 가슴(소수)
    33: randomInt(0, 99),               // 허리(소수)
    34: randomInt(0, 99),               // 엉덩이(소수)
    40: 0,                              // 마력
    50: 0,                              // 자지사이즈 (여성)
  };
}

/**
 * Abilities 랜덤 생성
 */
function generateRandomAbilities(age: number): CharacterAbilities {
  return {
    // 감각 (0-3)
    0: randomInt(0, 3),
    1: randomInt(0, 2),
    2: randomInt(0, 3),
    3: randomInt(0, 2),

    // 기술 (10-17)
    10: randomInt(0, 3),
    11: randomInt(0, 2),
    12: randomInt(0, 3),
    13: randomInt(0, 3),
    14: randomInt(0, 2),
    15: randomInt(0, 3),
    16: randomInt(0, 2),
    17: randomInt(0, 1),

    // 성벽 (20-23) - 낮은 확률
    20: chance(0.1) ? 1 : 0,
    21: chance(0.1) ? 1 : 0,
    22: chance(0.05) ? 1 : 0,
    23: chance(0.02) ? 1 : 0,

    // 중독 (30-41) - 초기 0
    30: 0, 31: 0, 32: 0, 33: 0, 37: 0, 38: 0, 39: 0, 40: 0, 41: 0,

    // 스펙 (50-52)
    50: randomInt(0, 5),
    51: randomInt(0, 5),
    52: scaleByAge(randomInt(0, 10), age, 18, 35),

    // 특수기능 (70-73)
    70: chance(0.2) ? randomInt(0, 3) : 0,
    71: chance(0.3) ? randomInt(0, 3) : 0,
    72: chance(0.2) ? randomInt(0, 3) : 0,
    73: chance(0.4) ? randomInt(0, 3) : 0,

    // 지식 (80-81)
    80: chance(0.1) ? randomInt(0, 2) : 0,
    81: chance(0.15) ? randomInt(0, 3) : 0,
  };
}

/**
 * Talents 랜덤 생성
 */
interface TalentConfig {
  age: number;
  isVirgin: boolean;
  breastSize: number;
  height: number;
}

function generateRandomTalents(config: TalentConfig): CharacterTalents {
  const { age, isVirgin, breastSize, height } = config;
  const talents: CharacterTalents = {};

  // ========================================
  // CONDITIONAL 티어 (조건부 특성)
  // ========================================

  // 처녀성 (나이/경험 기반)
  if (isVirgin) {
    talents[0] = 1;  // 처녀
    talents[2] = 1;  // 애널처녀
  }

  // 학생 (18-22세만)
  if (age >= 18 && age <= 22) {
    assignGuaranteed(talents, ASSIGNABLE_TALENTS.CONDITIONAL.students, getExclusiveTalents);
  }

  // 직업 (낮은 확률)
  if (chance(0.15)) {
    assignGuaranteed(talents, ASSIGNABLE_TALENTS.CONDITIONAL.jobs, getExclusiveTalents);
  }

  // 신분/특성 (낮은 확률)
  if (chance(0.2)) {
    assignGuaranteed(talents, ASSIGNABLE_TALENTS.CONDITIONAL.identity, getExclusiveTalents);
  }

  // AV 관련 직업 (경험에 따라)
  if (chance(0.3)) {
    assignGuaranteed(talents, ASSIGNABLE_TALENTS.CONDITIONAL.avJobs, getExclusiveTalents);
  }

  // ========================================
  // COMMON 티어 (실제 데이터 기반 확률 적용)
  // ========================================

  // 기본 성격 (80% 확률, 1-2개)
  assignGuaranteed(talents, ASSIGNABLE_TALENTS.COMMON.personality, getExclusiveTalents);

  // 기본 성향 (70% 확률, 1-2개)
  assignGuaranteed(talents, ASSIGNABLE_TALENTS.COMMON.sexualInterest, getExclusiveTalents);

  // 기본 체질 (70% 확률, 1-2개)
  assignGuaranteed(talents, ASSIGNABLE_TALENTS.COMMON.constitution, getExclusiveTalents);

  // 기본 정결도 (50% 확률, 0-1개)
  assignGuaranteed(talents, ASSIGNABLE_TALENTS.COMMON.cleanliness, getExclusiveTalents);

  // 기본 솔직도 (70% 확률, 0-1개)
  assignGuaranteed(talents, ASSIGNABLE_TALENTS.COMMON.honesty, getExclusiveTalents);

  // 음모 상태 (30% 확률, 0-1개)
  assignGuaranteed(talents, ASSIGNABLE_TALENTS.COMMON.pubicHair, getExclusiveTalents);

  // ========================================
  // UNCOMMON 티어 (실제 데이터 기반)
  // ========================================

  // 특수 성격 (30% 확률)
  assignGuaranteed(talents, ASSIGNABLE_TALENTS.UNCOMMON.personality, getExclusiveTalents);

  // 성적 태도 (35% 확률)
  assignGuaranteed(talents, ASSIGNABLE_TALENTS.UNCOMMON.sexualAttitude, getExclusiveTalents);

  // 처녀성 관련 (처녀만, 50% 확률)
  if (isVirgin) {
    assignGuaranteed(talents, ASSIGNABLE_TALENTS.UNCOMMON.chastity, getExclusiveTalents);
  }

  // 체질 (30% 확률)
  assignGuaranteed(talents, ASSIGNABLE_TALENTS.UNCOMMON.constitution, getExclusiveTalents);

  // 기술 (50% 확률)
  assignGuaranteed(talents, ASSIGNABLE_TALENTS.UNCOMMON.skills, getExclusiveTalents);

  // 특수 솔직도 (25% 확률)
  assignGuaranteed(talents, ASSIGNABLE_TALENTS.UNCOMMON.addiction, getExclusiveTalents);

  // 성벽 (30% 확률)
  assignGuaranteed(talents, ASSIGNABLE_TALENTS.UNCOMMON.perversion, getExclusiveTalents);

  // 민감도 (40% 확률, 0-2개)
  assignGuaranteed(talents, ASSIGNABLE_TALENTS.UNCOMMON.sensitivity, getExclusiveTalents);

  // 신체 특징 (55% 확률, 0-2개)
  assignGuaranteed(talents, ASSIGNABLE_TALENTS.UNCOMMON.bodyTraits, getExclusiveTalents);

  // 정신 (30% 확률)
  assignGuaranteed(talents, ASSIGNABLE_TALENTS.UNCOMMON.mental, getExclusiveTalents);

  // 실제로 초기 부여되는 특성들 (30% 확률)
  assignGuaranteed(talents, ASSIGNABLE_TALENTS.UNCOMMON.trainedTraits, getExclusiveTalents);

  // ========================================
  // RARE 티어 (실제 데이터 기반)
  // ========================================

  // 겁쟁이 (15% 확률)
  assignGuaranteed(talents, ASSIGNABLE_TALENTS.RARE.timid, getExclusiveTalents);

  // 특수 성향 (35% 확률)
  assignGuaranteed(talents, ASSIGNABLE_TALENTS.RARE.special, getExclusiveTalents);

  // 관계 (20% 확률)
  assignGuaranteed(talents, ASSIGNABLE_TALENTS.RARE.relationship, getExclusiveTalents);

  // 신체 사이즈 (15% 확률)
  assignGuaranteed(talents, ASSIGNABLE_TALENTS.RARE.bodySize, getExclusiveTalents);

  // 특수 신체 (15% 확률)
  assignGuaranteed(talents, ASSIGNABLE_TALENTS.RARE.specialBody, getExclusiveTalents);

  // 동물 선호도 (20% 확률)
  assignGuaranteed(talents, ASSIGNABLE_TALENTS.RARE.animalPreference, getExclusiveTalents);

  // 저항력 (20% 확률)
  assignGuaranteed(talents, ASSIGNABLE_TALENTS.RARE.resistance, getExclusiveTalents);

  // 특수 성격 (10% 확률)
  assignGuaranteed(talents, ASSIGNABLE_TALENTS.RARE.complexes, getExclusiveTalents);

  // 조교/이벤트로도 획득 가능하지만 초기 부여도 있음 (8% 확률)
  assignGuaranteed(talents, ASSIGNABLE_TALENTS.RARE.trainedRare, getExclusiveTalents);

  // ========================================
  // 자동 설정 특성 (키, 가슴 크기 기반)
  // ========================================

  // 키 기반
  if (height > 170 && !talents[99]) talents[99] = 1;   // 큰체구
  if (height < 150 && !talents[100]) talents[100] = 1;  // 작은체형

  // 가슴 크기 기반 (배타적)
  if (breastSize === 1) talents[109] = 1;        // 빈유
  else if (breastSize === 2) talents[116] = 1;   // 절벽
  else if (breastSize >= 7) talents[114] = 1;    // 폭유
  else if (breastSize >= 6) talents[110] = 1;    // 거유

  return talents;
}

/**
 * Experience 랜덤 생성
 */
interface ExpConfig {
  age: number;
  isVirgin: boolean;
  talents: CharacterTalents;
  abl: CharacterAbilities;
}

function generateRandomExperience(config: ExpConfig): CharacterExperience {
  const { age, isVirgin, talents, abl } = config;
  const exp: CharacterExperience = {};

  // 기본경험 (0-9)
  if (!isVirgin) {
    exp[0] = scaleByAge(randomInt(1, 50), age);  // V경험
    exp[1] = randomInt(0, 20);                   // A경험
    exp[4] = scaleByAge(randomInt(1, 30), age);  // 삽입경험
    exp[5] = scaleByAge(randomInt(1, 40), age);  // 성교경험
  }
  exp[2] = scaleByAge(randomInt(1, 10), age);    // 절정경험
  exp[3] = randomInt(0, 10);                     // 사정경험

  // 자위/개발 (10-19)
  exp[10] = scaleByAge(randomInt(1, 20), age);   // 자위경험
  if (chance(0.3)) exp[11] = randomInt(1, 5);    // 지도자위
  if (chance(0.2)) exp[12] = randomInt(1, 5);    // 야외노출

  // 개발경험 (능력치 연동)
  if (abl[0] && abl[0] >= 2) exp[13] = randomInt(1, 10); // C개발
  if (abl[1] && abl[1] >= 2) exp[14] = randomInt(1, 10); // B개발
  if (abl[2] && abl[2] >= 2) exp[15] = randomInt(1, 10); // V개발
  if (abl[3] && abl[3] >= 2) exp[16] = randomInt(1, 10); // A개발

  // 봉사 (20-29)
  if (!isVirgin) {
    exp[20] = randomInt(1, 20);                  // 정액경험
    exp[22] = randomInt(1, 15);                  // 펠라경험
  }
  exp[21] = randomInt(0, 10);                    // 봉사쾌락경험
  exp[23] = scaleByAge(randomInt(0, 10), age);   // 애정경험

  // 특수플레이 (30-39)
  if (hasTalent(talents, 88)) exp[30] = randomInt(1, 10); // 피학쾌락
  if (hasTalent(talents, 83)) exp[33] = randomInt(1, 10); // 가학쾌락
  exp[34] = randomInt(0, 5); // C경험
  exp[35] = randomInt(0, 5); // B경험

  // 성벽 (40-49)
  if (hasTalent(talents, 81) || hasTalent(talents, 22)) {
    exp[40] = randomInt(1, 10); // 레즈경험
  }

  // 이상/확장 (50-60)
  if (chance(0.1)) exp[50] = randomInt(1, 5);    // 이상경험
  if (chance(0.05)) exp[51] = randomInt(1, 3);   // 긴박경험

  // 특수능력 (61-84) - 능력치 연동
  if (abl[73] && abl[73] >= 1) {
    exp[61] = scaleByAge(randomInt(10, 50), age); // 요리경험
  }
  if (abl[70] && abl[70] >= 1) {
    exp[70] = randomInt(5, 30); // 피사경험
  }
  if (abl[71] && abl[71] >= 1) {
    exp[71] = randomInt(5, 30); // 가창경험
  }
  if (abl[72] && abl[72] >= 1) {
    exp[72] = randomInt(5, 30); // 무용경험
  }

  // 대화 경험
  exp[73] = scaleByAge(randomInt(5, 30), age);

  // AV/모델/매춘 경험 (중요!)
  if (chance(0.2)) {
    exp[74] = randomInt(1, 10); // 매춘경험
  }
  if (chance(0.15)) {
    exp[76] = scaleByAge(randomInt(1, 15), age); // AV출연
  }
  if (chance(0.25)) {
    exp[79] = scaleByAge(randomInt(1, 20), age); // 모델경험
  }

  // 아르바이트 경험
  if (chance(0.3)) {
    exp[77] = scaleByAge(randomInt(5, 40), age); // 아르바이트경험
  }

  // 기타 (90-99)
  exp[90] = randomInt(0, 100);  // 공헌도
  exp[91] = randomInt(0, 100);  // 인기

  // 특별 (100+)
  if (chance(0.3)) exp[102] = randomInt(1, 10); // 코스프레경험
  if (chance(0.15)) exp[103] = randomInt(1, 5); // 치한경험

  // 트레이닝경험
  if (abl[50] && abl[50] >= 3) exp[120] = randomInt(5, 20); // 미용트레이닝
  if (abl[51] && abl[51] >= 3) exp[121] = randomInt(5, 20); // 운동트레이닝
  if (abl[52] && abl[52] >= 5) exp[122] = randomInt(5, 20); // 학업트레이닝

  return exp;
}

/**
 * Parameters 랜덤 초기화
 */
function generateRandomParameters(talents: CharacterTalents): CharacterParameters {
  const palam: CharacterParameters = {
    0: 0, 1: 0, 2: 0, 3: 0, 14: 0,      // 쾌락 관련
    9: 0, 10: 0, 11: 0, 12: 0, 13: 0,   // 부정적 감정
    4: 0, 5: 0, 6: 0, 7: 0, 8: 0,       // 긍정적 감정
    15: 0, 100: 0,                      // 향락, 부정
  };

  // 성격 특성에 따라 초기값 설정
  if (hasTalent(talents, 14)) palam[4] = randomInt(20, 50);   // 얌전함 → 온순
  if (hasTalent(talents, 11)) palam[100] = randomInt(10, 30); // 건방짐 → 부정
  if (hasTalent(talents, 75)) palam[5] = randomInt(20, 40);   // 섹스광 → 욕정
  if (hasTalent(talents, 85)) palam[8] = randomInt(10, 30);   // 연심 → 치정
  if (hasTalent(talents, 63)) palam[4] = randomInt(15, 40);   // 헌신적 → 온순

  return palam;
}

/**
 * Juel 랜덤 초기화
 */
function generateRandomJuel(exp: CharacterExperience): CharacterJuel {
  const juel: CharacterJuel = {
    0: 0, 1: 0, 2: 0, 4: 0, 5: 0, 6: 0,
    7: 0, 8: 0, 9: 0, 10: 0, 14: 0, 100: 0,
  };

  // 절정경험이 많으면 쾌락 구슬 소량 부여
  if (exp[2] && exp[2] >= 10) {
    juel[0] = randomInt(1, 3); // 쾌C 구슬
    juel[1] = randomInt(1, 3); // 쾌V 구슬
  }

  // 애정경험이 많으면 치정 구슬
  if (exp[23] && exp[23] >= 10) {
    juel[8] = randomInt(1, 2); // 치정 구슬
  }

  // 봉사경험이 많으면 봉사 구슬
  if (exp[21] && exp[21] >= 10) {
    juel[4] = randomInt(1, 2); // 온순 구슬
  }

  return juel;
}

/**
 * Strings 랜덤 생성
 */
interface StringsConfig {
  base: CharacterBase;
  hasBoyfriend: boolean;
}

function generateRandomStrings(config: StringsConfig): CharacterStrings {
  const { base, hasBoyfriend } = config;
  const cstr: CharacterStrings = {};

  // 혈액형 문자열
  if (base[13] !== undefined) {
    cstr[9] = getBloodTypeString(base[13]);
  }

  // 남자친구 관련 (TALENT[184] 있을 때)
  if (hasBoyfriend) {
    const lastNames = ['사토', '스즈키', '타카하시', '다나카', '와타나베', '이토', '야마모토', '나카무라', '코바야시', '카토'];
    const firstNames = ['켄타', '쇼타', '유우타', '하루토', '소타', '히로키', '타쿠야', '다이키', '류타', '케이스케'];
    const jobs = ['회사원', '프리랜서', '학생', '엔지니어', '영업사원', '디자이너', '강사', '공무원', '요리사', '의사'];

    cstr[7] = randomPick(lastNames);   // 남자친구 성
    cstr[8] = randomPick(firstNames);  // 남자친구 이름
    cstr[40] = randomPick(jobs);       // 남자친구 직업
  }

  // 성기 호칭 (한국어 표현)
  const penisTerms = ['자지', '성기', '페니스', '그것'];
  const vaginaTerms = ['보지', '성기', '질', '거기'];
  const anusTerms = ['항문', '뒷구멍', '애널', '엉덩이'];

  cstr[42] = randomPick(penisTerms);
  cstr[43] = randomPick(vaginaTerms);
  cstr[44] = randomPick(anusTerms);

  return cstr;
}

/**
 * Flags 랜덤 생성
 */
interface FlagsConfig {
  base: CharacterBase;
  breastCup: number;
  isVirgin: boolean;
  hasBoyfriend: boolean;
}

function generateRandomFlags(config: FlagsConfig): CharacterFlags {
  const { base, breastCup, isVirgin, hasBoyfriend } = config;
  const cflag: CharacterFlags = {
    16: -1,  // 첫 키스 미경험
    21: (base[11] || 1) * 100 + (base[12] || 1), // 생일
    22: new Date().getFullYear() - (base[9] || 20), // 생년
    41: base[9] || 20, // 나이
    100: 0, // 호감도
    170: breastCup, // B컵
    171: randomInt(1, 3), // B우유통
    174: randomInt(1, 7), // B유륜
    175: randomInt(1, 3), // B유두
    176: randomInt(1, 10), // V길이
    177: randomInt(1, 10), // V크기
    173: 0, // 임신 관련
    620: 0, // 가격 (나중 계산)
    621: 0, // 추가 가격
    622: 0, // 추가 가격2
    600: 0, // 처음조교일
    602: 0, // 처음조교주
    684: randomInt(0, 5), // 다니고 있는 곳
  };

  // 처녀가 아닐 경우 처녀상실 관련 데이터
  if (!isVirgin) {
    const age = base[9] || 20;
    const virginityLossAge = randomInt(Math.max(14, age - 10), age - 1);

    cflag[15] = hasBoyfriend ? randomInt(10, 50) : randomInt(1, 100); // 처녀상실 상대 ID
    cflag[160] = virginityLossAge;           // 처녀상실 나이
    cflag[161] = randomInt(1, 12);           // 처녀상실 월
    cflag[162] = randomInt(1, 28);           // 처녀상실 일
    cflag[163] = randomInt(0, 3);            // 처녀상실 장소 타입
    cflag[164] = randomInt(0, 5);            // 처녀상실 상황
    cflag[165] = randomInt(0, 2);            // 처녀상실 동의 여부
    cflag[166] = randomInt(0, 10);           // 처녀상실 쾌감
    cflag[167] = randomInt(0, 10);           // 처녀상실 고통
  }

  return cflag;
}

/**
 * 상성(Relation/Compatibility) 랜덤 생성
 */
function generateRandomRelation(): CharacterJuel {
  const relation: CharacterJuel = {};

  // 플레이어(0)와의 상성은 보통~좋음
  relation[0] = randomInt(200, 400);

  // 랜덤하게 2-5명의 다른 캐릭터와 상성 설정
  const numRelations = randomInt(2, 5);
  for (let i = 0; i < numRelations; i++) {
    const targetId = randomInt(1, 20);
    if (targetId !== 0 && !relation[targetId]) {
      relation[targetId] = randomInt(100, 500); // 100~500 상성값
    }
  }

  return relation;
}

// ============================================================================
// 공개 API
// ============================================================================

/**
 * 기본 캐릭터 생성 (데이터 기반)
 */
export function createCharacter(data: CharacterCreateData): Character {
  const defaultBase: CharacterBase = {
    0: 1500,
    1: 1500,
  };

  const defaultMaxBase: CharacterBase = {
    0: 1500,
    1: 1500,
  };

  const defaultCflag: CharacterFlags = {
    16: -1,
    41: 20,
    100: 0,
    170: 3,
    171: 2,
    174: 3,
    175: 2,
    176: 5,
    177: 5,
    684: 0,
  };

  return {
    id: data.id,
    name: data.name,
    callName: data.callName,
    nickname: data.nickname,

    base: { ...defaultBase, ...data.base },
    maxBase: { ...defaultMaxBase, ...data.base },
    abl: { ...data.abl },
    palam: { ...data.palam },
    talent: { ...data.talent },
    exp: { ...data.exp },
    mark: {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      ...data.mark
    },
    juel: {
      0: 0, 1: 0, 2: 0, 4: 0, 5: 0, 6: 0,
      7: 0, 8: 0, 9: 0, 10: 0, 14: 0, 100: 0,
      ...data.juel
    },

    cflag: { ...defaultCflag, ...data.cflag },
    cstr: { ...data.cstr },

    relation: data.relation || [],
    isOwned: false,
    isAssistant: false,
  };
}

/**
 * 기본 플레이어 캐릭터 생성
 */
export function createPlayerCharacter(): Character {
  const now = new Date();
  const birthYear = now.getFullYear() - 30;
  const birthDate = parseInt(`${now.getMonth() + 1}${now.getDate().toString().padStart(2, '0')}`);

  return createCharacter({
    id: 0,
    name: '플레이어',
    callName: '주인',
    base: {
      0: 3000,
      1: 3000,
      30: 0,
    },
    abl: {
      12: 2,
    },
    talent: {
      1: 1,
      2: 1,
      122: 1,
    },
    cflag: {
      16: -1,
      21: birthDate,
      22: birthYear,
      41: 30,
      100: -1,
      170: 1,
      171: 1,
      176: 10,
      177: 19,
      609: 1,
      611: 2,
      684: 0,
    },
  });
}

/**
 * 기본 초기 캐릭터 생성
 */
export function createStarterCharacter(): Character {
  return createCharacter({
    id: 1,
    name: '미야마 카나데',
    callName: '카나데',
    nickname: '카나데',
    base: {
      0: 1570,
      1: 1500,
      30: 0,
    },
    abl: {
      0: 1,
      1: 1,
      10: 3,
      16: 2,
      50: 5,
      51: 2,
      52: 7,
      71: 1,
      73: 2,
    },
    talent: {
      0: 1,
      2: 1,
      13: 1,
      14: 1,
      24: 1,
      27: 1,
      30: 1,
      35: 1,
      40: 1,
      60: 1,
      63: 1,
      70: 1,
      102: 1,
      105: 1,
      113: 1,
      118: 1,
      220: 1,
      224: 1,
      320: 1,
      326: 1,
      414: 1,
      423: 1,
    },
    exp: {
      2: 1,
      10: 10,
      61: 30,
      71: 10,
      122: 35,
    },
    cflag: {
      16: -1,
      21: 2000,
      22: 3091,
      41: 17,
      100: 0,
      170: 5,
      171: 2,
      174: 6,
      175: 2,
      176: 6,
      177: 2,
      620: 100,
      600: 0,
      602: 5,
      684: 0,
    },
    cstr: {
      9: 'A',
      42: 'かわいい',
      43: 'ともだち',
      44: 'おやこ',
    },
  });
}

/**
 * 랜덤 캐릭터 생성 (배우 모집용)
 */
export function createRandomCharacter(id: number): Character {
  // 1. 기본 정보
  const femaleNames = [
    '사쿠라', '유이', '미나미', '아야', '하루카',
    '나나', '히나', '레이', '아이', '마이',
    '리사', '에리', '미사키', '치히로', '노조미',
    '모모', '카나', '유키', '리나', '사키',
  ];
  const name = randomPick(femaleNames);
  const age = randomInt(18, 35);

  // 2. BASE 생성
  const base = generateRandomBase(age);
  const breastCup = Math.floor((base[22] || 75) / 15); // 75~105 -> 1~7컵
  const height = base[20] || 160;

  // 3. 처녀 여부 (나이별 확률 - 보수적)
  const virginChance = age <= 22 ? 0.9 : (age <= 27 ? 0.7 : 0.5);
  const isVirgin = chance(virginChance);

  // 4. 남자친구 여부 (비처녀 + 20세 이상, 15% 확률)
  const hasBoyfriend = !isVirgin && age >= 20 && chance(0.15);

  // 5. Talents 생성
  const talents = generateRandomTalents({ age, isVirgin, breastSize: breastCup, height });

  // 남자친구 특성 추가
  if (hasBoyfriend) {
    talents[184] = 1; // TALENT[184]: 남친있음
  }

  // 6. Abilities 생성
  const abl = generateRandomAbilities(age);

  // 7. Experience 생성
  const exp = generateRandomExperience({ age, isVirgin, talents, abl });

  // 8. Parameters 생성
  const palam = generateRandomParameters(talents);

  // 9. Marks (초기 0)
  const mark: CharacterMarks = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
  };

  // 10. Juel 생성
  const juel = generateRandomJuel(exp);

  // 11. Strings 생성
  const cstr = generateRandomStrings({ base, hasBoyfriend });

  // 12. Flags 생성
  const cflag = generateRandomFlags({ base, breastCup, isVirgin, hasBoyfriend });

  // 13. 상성(Relation) 생성
  const relation = generateRandomRelation();

  // 14. 매력치 계산
  base[31] = calculateCharm(abl, talents, base);

  // 15. 가격 계산
  cflag[620] = calculatePrice(abl, talents, exp, base);

  // 16. 캐릭터 생성 (별명은 비워둠)
  return createCharacter({
    id,
    name,
    callName: name,
    nickname: undefined,
    base,
    abl,
    palam,
    talent: talents,
    exp,
    mark,
    juel,
    cflag,
    cstr,
    relation: Object.keys(relation).map(k => parseInt(k)),
  });
}

// ============================================================================
// 캐릭터 수정 유틸리티
// ============================================================================

export function increaseAbility(
  char: Character,
  abilityId: number,
  amount: number
): Character {
  const current = char.abl[abilityId] || 0;
  const max = 10;
  const newValue = Math.min(current + amount, max);

  return {
    ...char,
    abl: {
      ...char.abl,
      [abilityId]: newValue,
    },
  };
}

export function modifyParameter(
  char: Character,
  paramId: number,
  amount: number
): Character {
  const current = char.palam[paramId] || 0;
  const newValue = Math.max(0, current + amount);

  return {
    ...char,
    palam: {
      ...char.palam,
      [paramId]: newValue,
    },
  };
}

export function addTalent(
  char: Character,
  talentId: number,
  value: number = 1
): Character {
  return {
    ...char,
    talent: {
      ...char.talent,
      [talentId]: value,
    },
  };
}

export function removeTalent(
  char: Character,
  talentId: number
): Character {
  const newTalent = { ...char.talent };
  delete newTalent[talentId];

  return {
    ...char,
    talent: newTalent,
  };
}
