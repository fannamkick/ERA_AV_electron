/**
 * Game Constants - Central Export
 *
 * CSV 데이터에서 자동 생성된 게임 상수들을 중앙에서 관리
 */

export * from '../../data/abilities';
export * from '../../data/parameters';
export * from '../../data/talents';
export * from '../../data/base';
export * from '../../data/experience';
export * from '../../data/training';
export * from '../../data/items';
export * from '../../data/marks';

// Re-export with grouped namespace for easier access
import { ABILITIES_MAP, ABILITIES_LIST, ABILITIES_CATEGORIES } from '../../data/abilities';
import { PARAMETERS_MAP, PARAMETERS_LIST } from '../../data/parameters';
import { TALENTS_MAP, TALENTS_LIST, TALENTS_CATEGORIES } from '../../data/talents';
import { BASE_MAP, BASE_LIST } from '../../data/base';
import { EXPERIENCE_MAP, EXPERIENCE_LIST, EXPERIENCE_CATEGORIES } from '../../data/experience';
import { TRAINING_MAP, TRAINING_LIST, TRAINING_CATEGORIES } from '../../data/training';
import { ITEMS_MAP, ITEMS_LIST, ITEMS_CATEGORIES } from '../../data/items';
import { MARKS_MAP, MARKS_LIST } from '../../data/marks';

export const GameData = {
  abilities: {
    map: ABILITIES_MAP,
    list: ABILITIES_LIST,
    categories: ABILITIES_CATEGORIES,
    getName: (id: number) => ABILITIES_MAP[id] || '알 수 없음',
  },
  parameters: {
    map: PARAMETERS_MAP,
    list: PARAMETERS_LIST,
    getName: (id: number) => PARAMETERS_MAP[id] || '알 수 없음',
  },
  talents: {
    map: TALENTS_MAP,
    list: TALENTS_LIST,
    categories: TALENTS_CATEGORIES,
    getName: (id: number) => TALENTS_MAP[id] || '알 수 없음',
  },
  base: {
    map: BASE_MAP,
    list: BASE_LIST,
    getName: (id: number) => BASE_MAP[id] || '알 수 없음',
  },
  experience: {
    map: EXPERIENCE_MAP,
    list: EXPERIENCE_LIST,
    categories: EXPERIENCE_CATEGORIES,
    getName: (id: number) => EXPERIENCE_MAP[id] || '알 수 없음',
  },
  training: {
    map: TRAINING_MAP,
    list: TRAINING_LIST,
    categories: TRAINING_CATEGORIES,
    getName: (id: number) => TRAINING_MAP[id] || '알 수 없음',
  },
  items: {
    map: ITEMS_MAP,
    list: ITEMS_LIST,
    categories: ITEMS_CATEGORIES,
    getName: (id: number) => ITEMS_MAP[id] || '알 수 없음',
  },
  marks: {
    map: MARKS_MAP,
    list: MARKS_LIST,
    getName: (id: number) => MARKS_MAP[id] || '알 수 없음',
  },
};

/**
 * 사용 예시:
 *
 * import { GameData } from '@/constants';
 *
 * // 능력치 이름 가져오기
 * const abilityName = GameData.abilities.getName(50); // "미용감각"
 *
 * // 특성 이름 가져오기
 * const talentName = GameData.talents.getName(153); // "임신"
 *
 * // 카테고리별 조회
 * const sensingAbilities = GameData.abilities.categories['감각 (0-3)'];
 */
