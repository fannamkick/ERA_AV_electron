/**
 * 특성 확률 설정 (실제 캐릭터 데이터 기반)
 *
 * 50명 샘플 분석 결과:
 * - 평균 특성 개수: 22.6개
 * - 처녀 비율: 76%
 * - 가장 흔한 특성: 애널처녀(94%), 처녀(76%), 쾌감에솔직(64%)
 */

export interface TalentCategory {
  ids: number[];
  probability: number;  // 카테고리 확률
  maxCount: number;     // 최대 선택 개수
  minCount?: number;    // 최소 선택 개수 (선택사항)
}

export interface TalentProbabilityConfig {
  [key: string]: TalentCategory;
}

/**
 * COMMON 티어 - 50-80% 보유율
 * 대부분의 캐릭터가 보유
 */
export const COMMON_TALENTS: TalentProbabilityConfig = {
  // 기본 성격 (건방짐, 얌전함, 활발함, 츤데레 등)
  personality: {
    ids: [10, 11, 12, 14, 16, 18],
    probability: 0.8,
    minCount: 1,
    maxCount: 2,
  },

  // 기본 성향 (호기심 50%, 보수적, 포지티브, 튀고싶어함)
  sexualInterest: {
    ids: [23, 24, 25, 28],
    probability: 0.7,
    minCount: 1,
    maxCount: 2,
  },

  // 기본 체질 (아픔에 약함/강함 46%, 울보/안울음)
  constitution: {
    ids: [40, 41, 44, 45],
    probability: 0.7,
    minCount: 1,
    maxCount: 2,
  },

  // 기본 정결도 (악취둔감/민감, 자위하기쉬움)
  cleanliness: {
    ids: [60, 61, 62],
    probability: 0.5,
    maxCount: 1,
  },

  // 기본 솔직도 (쾌감에 솔직 64%, 부정)
  honesty: {
    ids: [70, 71],
    probability: 0.7,
    maxCount: 1,
  },

  // 음모 상태 (없음만, 빽빽함은 0명)
  pubicHair: {
    ids: [125],
    probability: 0.3,
    maxCount: 1,
  },
};

/**
 * UNCOMMON 티어 - 20-50% 보유율
 * 일부 캐릭터가 보유
 */
export const UNCOMMON_TALENTS: TalentProbabilityConfig = {
  // 특수 성격 (프라이드 높음/낮음)
  personality: {
    ids: [15, 17],
    probability: 0.3,
    maxCount: 1,
  },

  // 성적 태도 (자제심, 쿨, 일선을넘지않음)
  sexualAttitude: {
    ids: [20, 21, 27],
    probability: 0.35,
    maxCount: 1,
  },

  // 처녀성 관련 (정조관념, 억압, 해방, 수줍음 46%, 부끄럼없음)
  // 약점(37)은 0명이라 제외
  chastity: {
    ids: [30, 32, 33, 34, 35, 36],
    probability: 0.5,
    maxCount: 2,
  },

  // 체질 (젖기힘듬)
  constitution: {
    ids: [43],
    probability: 0.3,
    maxCount: 1,
  },

  // 기술 (소질있음 46%, 습득느림, 조합지식, 약독내성)
  skills: {
    ids: [50, 51, 55, 56],
    probability: 0.5,
    maxCount: 2,
  },

  // 특수 솔직도 (중독되기쉬움)
  // 즉각함락(73)은 0명이라 제외
  addiction: {
    ids: [72],
    probability: 0.25,
    maxCount: 1,
  },

  // 성벽 (보이시, 도착적)
  perversion: {
    ids: [79, 80],
    probability: 0.3,
    maxCount: 1,
  },

  // 민감도 (C/V/A/B 둔감/민감)
  sensitivity: {
    ids: [101, 102, 103, 104, 105, 106, 107, 108],
    probability: 0.4,
    maxCount: 2,
  },

  // 신체 특징 (회복빠름/느림, 매력 52%)
  // 통통함(119)은 0명이라 제외
  bodyTraits: {
    ids: [111, 112, 113],
    probability: 0.55,
    maxCount: 2,
  },

  // 정신 (유치, 유리멘탈)
  // 조루(133), 미숙함(135)은 0명이라 제외
  mental: {
    ids: [132, 134],
    probability: 0.3,
    maxCount: 1,
  },

  // 실제로는 초기 부여됨 (분석 결과 추가)
  trainedTraits: {
    ids: [13, 42, 52, 81, 87, 31, 126],  // 솔직함46%, 젖기쉬움34%, 혀놀림14%, 바이26%, 소악마26%, 정조무관심16%, 인기인24%
    probability: 0.3,
    maxCount: 2,
  },
};

/**
 * RARE 티어 - 5-20% 보유율
 * 소수 캐릭터만 보유
 */
export const RARE_TALENTS: TalentProbabilityConfig = {
  // 겁쟁이 (10은 COMMON.personality와 중복이지만 RARE로도 분류)
  timid: {
    ids: [10],
    probability: 0.15,
    maxCount: 1,
  },

  // 특수 성향 (헌신적 34%, 불결무시)
  special: {
    ids: [63, 64],
    probability: 0.35,
    maxCount: 1,
  },

  // 관계 (남성불신 12%, 질투, 망신)
  relationship: {
    ids: [82, 84, 86],
    probability: 0.2,
    maxCount: 1,
  },

  // 신체 사이즈 (큰체구, 작은체형) - 키에 따라 자동 설정됨
  bodySize: {
    ids: [99, 100],
    probability: 0.15,
    maxCount: 1,
  },

  // 특수 신체 (치료, 고무)
  specialBody: {
    ids: [117, 118],
    probability: 0.15,
    maxCount: 1,
  },

  // 동물 선호도 (좋아함/싫어함)
  animalPreference: {
    ids: [140, 141],
    probability: 0.2,
    maxCount: 1,
  },

  // 저항력 (자위안함, 세뇌안당함)
  // 봉사안함(151)은 0명이라 제외
  resistance: {
    ids: [150, 152],
    probability: 0.2,
    maxCount: 1,
  },

  // 특수 성격 (마더콘, 브라콘, 시스콘)
  // 로리콘(163)은 0명이라 제외
  complexes: {
    ids: [160, 161, 162],
    probability: 0.1,
    maxCount: 1,
  },

  // 분석 결과 추가된 RARE (조교/이벤트로도 획득 가능하지만 초기 부여도 있음)
  trainedRare: {
    ids: [83, 26, 57, 89, 127],  // 새드6%, 네거티브6%, 오줌싸개4%, 노출광2%, 역습4%
    probability: 0.08,
    maxCount: 1,
  },
};

/**
 * CONDITIONAL 티어 - 조건부 특성
 * 나이, 직업, 경험에 따라 부여
 */
export const CONDITIONAL_TALENTS: TalentProbabilityConfig = {
  // 처녀성 (나이/경험 기반)
  virginity: {
    ids: [0, 2],  // 처녀 76%, 애널처녀 94%
    probability: 1.0,  // isVirgin 조건
    maxCount: 2,
  },

  // 학생 (18-22세, 고등학생 60%, 대학생 10%)
  // 222, 225는 0명이라 제외
  students: {
    ids: [220, 221, 223, 224],
    probability: 0.7,  // 나이 조건부
    maxCount: 1,
  },

  // 직업 (특정 배경)
  // 208은 0명이라 제외
  jobs: {
    ids: [185, 186, 201, 202, 203, 204, 205, 206, 207, 209, 210, 211, 212],
    probability: 0.15,
    maxCount: 1,
  },

  // 신분/특성
  // 310, 321-323은 0명이라 제외
  identity: {
    ids: [311, 319, 320, 324, 325, 326, 330],
    probability: 0.2,
    maxCount: 1,
  },

  // AV/직업 (경험 기반, 423이 46%로 가장 높음, 414가 26%)
  // 400, 401, 404, 412, 421, 427, 429, 431, 433, 434는 0명이라 제외
  avJobs: {
    ids: [402, 403, 405, 406, 407, 408, 409, 410, 411, 413, 414, 415, 416, 417, 418, 422, 423, 426, 428],
    probability: 0.3,
    maxCount: 2,
  },
};

/**
 * FORBIDDEN 티어 - 절대 초기 부여 금지
 * 조교/이벤트로만 획득 가능
 */
export const FORBIDDEN_TALENTS = [
  // 조교로 획득되는 성감/성벽 특성
  // 13, 42, 52, 81, 87은 실제로 초기 부여되므로 제외
  47,   // 정애미각
  74, 75, 76, 77, 78,  // 자위광, 섹스광, 음란, 애널광, 가슴광
  85,   // 연심 (조교경험 1000+)
  88,   // 마조
  90,   // 섹프

  // 약물/정신 계열
  9,    // 붕괴
  22,   // 감정부족
  46,   // 약물중독
  123,  // 광기

  // 일상 이벤트 획득
  115,  // 비만
  131,  // 유아퇴행

  // 조교로 획득되는 특수 체질
  130,  // 모유체질
  136,  // 암캐
  137,  // 묘판

  // 업소/NTR 관련
  // 31은 실제로 초기 부여되므로 제외
  180, 181, 182, 183, 184,  // 업소여성, 고급창부, 요설스러움, 단골손님, 남친있음

  // 강화 소질 (절륜/음마 필요)
  230, 231, 232, 233,  // 음핵, 음유, 음호, 음항
  271,  // 항상발정
  272,  // 성호

  // 최상위 소질
  430,  // 영원한 사랑
  440,  // 절륜

  // 특수 상태
  425,  // 섹프있음

  // 주인공 전용
  156,  // 부성

  // 신체 변형 시스템
  251, 252, 253,  // 초유, 마유, 신유

  // 이벤트/연구소 전용 (0명)
  121, 124,  // 후타나리, 동물귀

  // 사용자 명시적 제외 요청
  91, 92, 93,  // 매혹, 수수께끼의 매력, 카리스마 (실제로는 사용되지만 사용자가 제외 요청)
  122,  // 남성 (사용자가 제외 원함)
] as const;
