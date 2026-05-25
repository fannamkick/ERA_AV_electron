/**
 * 캐릭터 생성 시 초기 부여 가능한 특성(TALENT) 목록
 *
 * 🔴 조교/이벤트로만 획득 가능한 특성은 제외됨
 * ✅ 초기 부여 가능한 특성만 포함
 *
 * 실제 캐릭터 데이터(50명) 분석 결과 기반:
 * - 평균 특성 개수: 22.6개
 * - 처녀 비율: 76%
 */

import {
  COMMON_TALENTS,
  UNCOMMON_TALENTS,
  RARE_TALENTS,
  CONDITIONAL_TALENTS,
  FORBIDDEN_TALENTS,
  type TalentProbabilityConfig,
} from './talentProbabilities';

/**
 * 초기 부여 가능한 특성 ID 목록 (확률 티어별 분류)
 */
export const ASSIGNABLE_TALENTS = {
  COMMON: COMMON_TALENTS,
  UNCOMMON: UNCOMMON_TALENTS,
  RARE: RARE_TALENTS,
  CONDITIONAL: CONDITIONAL_TALENTS,
} as const;

/**
 * 서로 배타적인 특성 쌍 (동시에 가질 수 없음)
 */
export const EXCLUSIVE_TALENT_PAIRS: ReadonlyArray<readonly number[]> = [
  // 성격
  [11, 14],   // 건방짐 vs 얌전함
  [15, 17],   // 프라이드 높음 vs 낮음

  // 성적 관심
  [20, 21],   // 자제심 vs 쿨
  [23, 24],   // 호기심 vs 보수적
  [25, 26],   // 포지티브 vs 네거티브

  // 처녀성
  [30, 31],   // 정조관념 vs 무관심
  [32, 33],   // 억압 vs 해방
  [35, 36],   // 수줍음 vs 부끄럼 없음

  // 체질
  [40, 41],   // 아픔에 약함 vs 강함
  [42, 43],   // 젖기쉬움 vs 힘듬
  [44, 45],   // 울보 vs 울지 않음
  [50, 51],   // 소질있음 vs 습득느림
  [61, 62],   // 악취둔감 vs 민감
  [70, 71],   // 쾌감에 솔직 vs 부정

  // 민감도
  [101, 102], // C둔감 vs 민감
  [103, 104], // V둔감 vs 민감
  [105, 106], // A둔감 vs 민감
  [107, 108], // B둔감 vs 민감

  // 신체
  [109, 110, 114, 116], // 빈유/거유/폭유/절벽 (4-way exclusive)
  [111, 112], // 회복 빠름 vs 느림
  [125, 128], // 음모 없음 vs 빽빽함
  [140, 141], // 동물 좋아함 vs 싫어함
] as const;

/**
 * 절대 초기 부여하면 안 되는 특성 ID 목록
 */
export { FORBIDDEN_TALENTS };

/**
 * 모든 초기 부여 가능한 특성 ID를 평탄화한 배열
 */
export const ALL_ASSIGNABLE_TALENT_IDS = (() => {
  const ids: number[] = [];

  // Helper to extract IDs from config
  const extractIds = (config: TalentProbabilityConfig) => {
    Object.values(config).forEach(category => {
      ids.push(...category.ids);
    });
  };

  extractIds(COMMON_TALENTS);
  extractIds(UNCOMMON_TALENTS);
  extractIds(RARE_TALENTS);
  extractIds(CONDITIONAL_TALENTS);

  return [...new Set(ids)]; // 중복 제거
})();

/**
 * 특성 ID가 초기 부여 가능한지 확인
 */
export function isAssignableTalent(talentId: number): boolean {
  return ALL_ASSIGNABLE_TALENT_IDS.includes(talentId);
}

/**
 * 특성 ID가 부여 금지인지 확인
 */
export function isForbiddenTalent(talentId: number): boolean {
  return FORBIDDEN_TALENTS.includes(talentId as any);
}

/**
 * 두 특성이 서로 배타적인지 확인
 */
export function areExclusiveTalents(talentId1: number, talentId2: number): boolean {
  return EXCLUSIVE_TALENT_PAIRS.some(pair =>
    pair.includes(talentId1) && pair.includes(talentId2)
  );
}

/**
 * 특정 특성과 배타적인 모든 특성 ID 반환
 */
export function getExclusiveTalents(talentId: number): number[] {
  const exclusives: number[] = [];

  for (const pair of EXCLUSIVE_TALENT_PAIRS) {
    if (pair.includes(talentId)) {
      exclusives.push(...pair.filter(id => id !== talentId));
    }
  }

  return exclusives;
}

/**
 * UI에 특성 태그로 표시하지 않는 특성 ID 목록
 *
 * 기준:
 * - 처녀성 관련 (0, 2, 3): "초체험 기록" 섹션으로 별도 표시
 * - 가슴 크기 (109, 110, 114, 116): 3사이즈 수치로 표시
 * - 키 관련 (99, 100): 키 수치로 표시
 */
export const UI_HIDDEN_TALENTS = [
  0, 2, 3,              // 처녀성
  109, 110, 114, 116,   // 가슴 크기
  99, 100,              // 키 관련
] as const;

/**
 * 특성이 UI에 표시되어야 하는지 확인
 */
export function shouldShowTalentInUI(talentId: number): boolean {
  return !UI_HIDDEN_TALENTS.includes(talentId as any);
}
