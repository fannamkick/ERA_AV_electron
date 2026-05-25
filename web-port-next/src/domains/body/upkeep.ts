import type { CharacterBodyState } from './types';

// 소질(Talent) 상수 매핑 (원작 ID)
const TALENT_IDS = {
  CHILD_BODY: '100',      // 유아체형
  BABY_BODY: '111',       // 유아/아기체형
  LITTLE_BODY: '112',     // 소인체형
  MALE: '122',            // 남성
  HAIRLESS: '125',        // 무모
  PERMANENT_BALD: '128',  // 영구 제모
  RECOVERY_FAST: '501',   // 회복 빠름
  RECOVERY_SLOW: '502',   // 회복 느림
  WEAK: '505',            // 약점
} as const;

// 1. 소질별 회복 가중치 테이블
const RECOVERY_TALENT_MODIFIERS: Record<string, number> = {
  [TALENT_IDS.RECOVERY_FAST]: 1.5,
  [TALENT_IDS.RECOVERY_SLOW]: 0.5,
  [TALENT_IDS.WEAK]: 0.7,
  [TALENT_IDS.BABY_BODY]: 1.1,
  [TALENT_IDS.LITTLE_BODY]: 1.1,
};

/**
 * 캐릭터의 자연 치유(RESTTIME) 공식을 1:1로 적용합니다.
 * 기력은 휴식 시 완치(Max)되며, 체력은 소질 및 환경 가중치에 따라 점진적으로 회복됩니다.
 */
export function applyNaturalRecovery(
  characterId: string,
  body: CharacterBodyState,
  charaStamina: number,
  charaMaxStamina: number,
  charaEnergy: number,
  charaMaxEnergy: number,
  traits: Record<string, boolean | number | string>,
  abilities: Record<string, number>,
  healerCount: number,
  isNearDeath: boolean
): CharacterBodyState {
  // 1. 기본 회복량 (체력 500)
  let baseHpRecovery = 500;
  
  // 2. 소질 가중치 곱셈 연산
  let multiplier = 1.0;
  for (const [talentId, val] of Object.entries(traits)) {
    if (val === true || Number(val) !== 0) {
      if (RECOVERY_TALENT_MODIFIERS[talentId]) {
        multiplier *= RECOVERY_TALENT_MODIFIERS[talentId];
      }
    }
  }

  // 3. 동료 중 힐러(치료 소질 보유자) 보너스 적용
  if (healerCount > 0) {
    multiplier += healerCount * 0.15; // 힐러 한 명당 +15%
  }

  // 4. 특수 엣지 케이스 (빈사 상태 등)
  if (isNearDeath) {
    multiplier = 0.1; // 빈사 상태면 회복 속도 90% 차단
  }

  // 999번 디버그 소질이 있으면 자연 회복 전면 차단 (테스트용)
  if (traits['999'] === true || traits['999'] === 1 || traits['999'] === '1') {
    multiplier = 0.0;
  }

  // 5. 최종 체력 회복량 계산 및 클램프
  const finalHp = Math.min(charaMaxStamina, Math.max(0, charaStamina + Math.trunc(baseHpRecovery * multiplier)));
  // 기력(willpower/energy)은 밤 휴식 시 100% 회복 (단, 999번 디버그 소질 활성화 시 회복 차단)
  const finalMp = multiplier === 0.0 ? charaEnergy : charaMaxEnergy;

  return {
    ...body,
    bodyStats: {
      ...body.bodyStats,
      stamina: finalHp,
      energy: finalMp,
    },
  };
}

/**
 * 캐릭터의 음모 성장(PUBLIC_HAIR) 공식을 선언적으로 매일 밤 진행합니다.
 * CFLAG:6 (hairStage) 값을 전이시킵니다.
 */
export function progressHairGrowth(
  body: CharacterBodyState,
  traits: Record<string, boolean | number | string>
): CharacterBodyState {
  const isPermanentBald = traits[TALENT_IDS.PERMANENT_BALD] === true || Number(traits[TALENT_IDS.PERMANENT_BALD]) !== 0;
  const isHairless = traits[TALENT_IDS.HAIRLESS] === true || Number(TALENT_IDS.HAIRLESS) !== 0;

  // 영구 제모 소질이 있으면 절대 자라지 않음
  if (isPermanentBald) {
    return {
      ...body,
      conditionFlags: {
        ...body.conditionFlags,
        '6': 0, // 0: 털 없음
      },
    };
  }

  // 현재 털 길이(conditionFlags.counter_hair_length) 및 헤어스테이지(conditionFlags.6)를 가져옴
  let currentLength = Number(body.conditionFlags['counter_hair_length'] ?? 0);
  let currentStage = Number(body.conditionFlags['6'] ?? 2); // 기본값 2 (송알송알)

  // 기본 일일 성장 속도 (+1)
  let growthRate = 1;

  // 헤어 성장제 복용 시 3배 가속
  const hasHairDrug = Number(body.conditionFlags['34'] ?? 0) > 0; // CFLAG:34가 약물 복용 상태를 의미
  if (hasHairDrug) {
    growthRate = 3;
  }

  // 유아체형 소질이 있으면 0.5배 속도
  const isChild = traits[TALENT_IDS.CHILD_BODY] === true || Number(traits[TALENT_IDS.CHILD_BODY]) !== 0;
  if (isChild) {
    growthRate *= 0.5;
  }

  // 무모(털 없음) 소질이 있으면 기본 성장 차단 (약물 효과가 없을 때만)
  if (isHairless && !hasHairDrug) {
    growthRate = 0;
  }

  const nextLength = currentLength + growthRate;
  let nextStage = currentStage;

  // 길이 임계값에 따른 헤어 스테이지 전이 공식
  // 0: 제모/털없음, 1: 솜털, 2: 보송보송, 3: 무성함, 4: 극도로 풍성함
  if (nextLength === 0) {
    nextStage = 0;
  } else if (nextLength > 0 && nextLength < 10) {
    nextStage = 1;
  } else if (nextLength >= 10 && nextLength < 30) {
    nextStage = 2;
  } else if (nextLength >= 30 && nextLength < 70) {
    nextStage = 3;
  } else {
    nextStage = 4;
  }

  return {
    ...body,
    conditionFlags: {
      ...body.conditionFlags,
      '6': nextStage,
      'counter_hair_length': nextLength,
    },
  };
}
