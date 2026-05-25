/**
 * 컨디션 시스템 (core/condition.ts)
 *
 * 캐릭터 HP/MP/MOOD 관리.
 * 의존성: dice.ts (회복량 주사위)
 *
 * 모든 함수는 새 condition 객체를 반환 (Zustand 불변성 보장).
 * 호출자가 store.updateCharacter()로 반영해야 함.
 */

import type { Character } from '../types/character';
import type { CharacterCondition } from '../types/character';
import { roll, percentCheck } from './dice';

// === 상수 ===

const HP_MAX = 100;
const MP_MAX = 100;
const MOOD_MIN = -100;
const MOOD_MAX = 100;

/** MOOD 임계값 */
const MOOD_ADVANTAGE_THRESHOLD = 50;   // 이상이면 어드밴티지
const MOOD_DISADVANTAGE_THRESHOLD = -50; // 이하면 디스어드밴티지

/** 도주 MP 임계값 */
const ESCAPE_MP_THRESHOLD = 20;

// === 클램프 유틸 ===

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

// === 컨디션 업데이트 (불변) ===

/** 컨디션 변경을 적용한 새 condition 객체 반환 */
export function applyConditionChanges(
  condition: CharacterCondition,
  changes: Partial<CharacterCondition>,
): CharacterCondition {
  return {
    hp: changes.hp !== undefined
      ? clamp(condition.hp + changes.hp, 0, HP_MAX)
      : condition.hp,
    mp: changes.mp !== undefined
      ? clamp(condition.mp + changes.mp, 0, MP_MAX)
      : condition.mp,
    mood: changes.mood !== undefined
      ? clamp(condition.mood + changes.mood, MOOD_MIN, MOOD_MAX)
      : condition.mood,
  };
}

/** 컨디션 직접 설정 (새 객체 반환) */
export function setConditionValues(
  condition: CharacterCondition,
  values: Partial<CharacterCondition>,
): CharacterCondition {
  return {
    hp: values.hp !== undefined ? clamp(values.hp, 0, HP_MAX) : condition.hp,
    mp: values.mp !== undefined ? clamp(values.mp, 0, MP_MAX) : condition.mp,
    mood: values.mood !== undefined ? clamp(values.mood, MOOD_MIN, MOOD_MAX) : condition.mood,
  };
}

// === 어드밴티지/디스어드밴티지 판단 ===

/** MOOD 기반 어드밴티지 판정 */
export function checkAdvantage(
  char: Character,
): 'advantage' | 'disadvantage' | null {
  if (char.condition.mood >= MOOD_ADVANTAGE_THRESHOLD) return 'advantage';
  if (char.condition.mood <= MOOD_DISADVANTAGE_THRESHOLD) return 'disadvantage';
  return null;
}

// === 휴식 회복 ===

/** 휴식 시 회복 (1d6+2 HP, 1d4+1 MP, 1d6 MOOD). 새 condition 반환. */
export function applyRestRecovery(condition: CharacterCondition): {
  newCondition: CharacterCondition;
  hpRecovered: number;
  mpRecovered: number;
  moodRecovered: number;
} {
  const hpRecovered = roll('d6') + 2;
  const mpRecovered = roll('d4') + 1;
  const moodRecovered = roll('d6');

  const newCondition = applyConditionChanges(condition, {
    hp: hpRecovered,
    mp: mpRecovered,
    mood: moodRecovered,
  });

  return { newCondition, hpRecovered, mpRecovered, moodRecovered };
}

// === 일일 감소 ===

/** 일일 자연 감소 (하루 끝). 새 condition 반환. */
export function applyDailyDecay(
  condition: CharacterCondition,
  assignment: string | null,
): CharacterCondition {
  const isWorking = assignment === 'training' || assignment === 'brothel';

  if (isWorking) {
    return applyConditionChanges(condition, {
      hp: -(roll('d4')),
      mp: -(roll('d4')),
      mood: -(roll('d6')),
    });
  } else {
    return applyConditionChanges(condition, { hp: -1 });
  }
}

// === 도주 체크 ===

/** 도주 시도 (MP가 낮으면 확률 증가) */
export function checkEscape(char: Character): boolean {
  if (char.condition.mp > ESCAPE_MP_THRESHOLD) return false;

  const escapeChance = ((ESCAPE_MP_THRESHOLD - char.condition.mp) / ESCAPE_MP_THRESHOLD) * 30;
  return percentCheck(escapeChance);
}

// === 행동 가능 여부 ===

/** 캐릭터가 행동 가능한지 체크 */
export function canAct(char: Character): boolean {
  return char.condition.hp > 0;
}

/** 행동 비용 적용. 새 condition 반환. null이면 비용 부족. */
export function applyActionCost(
  condition: CharacterCondition,
  hpCost: number,
  mpCost: number,
): CharacterCondition | null {
  if (condition.hp < hpCost) return null;

  return applyConditionChanges(condition, {
    hp: -hpCost,
    mp: -mpCost,
  });
}
