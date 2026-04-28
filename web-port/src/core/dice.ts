/**
 * 주사위 시스템 (core/dice.ts)
 *
 * D&D 스타일 다이스 롤링 + 판정 시스템.
 * 외부 의존성 없음 (완전 독립 모듈).
 */

import type {
  DieType,
  RollResult,
  D20Result,
  CheckResult,
  CheckGrade,
} from '../types/game';

// === 다이 면수 매핑 ===

const DIE_FACES: Record<DieType, number> = {
  d4: 4,
  d6: 6,
  d8: 8,
  d10: 10,
  d12: 12,
  d20: 20,
  d100: 100,
};

// === 기본 롤 ===

/** 단일 주사위 굴리기 */
export function roll(die: DieType): number {
  return Math.floor(Math.random() * DIE_FACES[die]) + 1;
}

/** 여러 개 주사위 굴리기 */
export function rollMultiple(
  count: number,
  die: DieType,
  modifier = 0,
): RollResult {
  const rolls: number[] = [];
  for (let i = 0; i < count; i++) {
    rolls.push(roll(die));
  }
  const total = rolls.reduce((sum, r) => sum + r, 0);
  return {
    die,
    count,
    rolls,
    total,
    modifier,
    finalTotal: total + modifier,
  };
}

/**
 * 주사위 공식 파싱 및 실행
 * 형식: "2d6+3", "1d20", "3d8-2", "1d100"
 */
export function rollFormula(formula: string): RollResult {
  const match = formula.match(/^(\d+)d(\d+)([+-]\d+)?$/);
  if (!match) {
    throw new Error(`Invalid dice formula: ${formula}`);
  }

  const count = parseInt(match[1], 10);
  const faces = parseInt(match[2], 10);
  const modifier = match[3] ? parseInt(match[3], 10) : 0;

  // 면수를 DieType으로 매핑 (없으면 커스텀 롤)
  const dieKey = `d${faces}` as DieType;
  if (DIE_FACES[dieKey]) {
    return rollMultiple(count, dieKey, modifier);
  }

  // 커스텀 면수 (d3, d7 등 비표준)
  const rolls: number[] = [];
  for (let i = 0; i < count; i++) {
    rolls.push(Math.floor(Math.random() * faces) + 1);
  }
  const total = rolls.reduce((sum, r) => sum + r, 0);
  return {
    die: dieKey,
    count,
    rolls,
    total,
    modifier,
    finalTotal: total + modifier,
  };
}

// === d20 판정 ===

interface D20Options {
  advantage?: boolean;
  disadvantage?: boolean;
  modifier?: number;
}

/** d20 굴리기 (어드밴티지/디스어드밴티지 지원) */
export function rollD20(options: D20Options = {}): D20Result {
  const { advantage = false, disadvantage = false, modifier = 0 } = options;

  let rolls: number[];
  let chosen: number;

  if (advantage && !disadvantage) {
    // 어드밴티지: 2번 굴려서 높은 값
    const r1 = roll('d20');
    const r2 = roll('d20');
    chosen = Math.max(r1, r2);
    rolls = [r1, r2];
  } else if (disadvantage && !advantage) {
    // 디스어드밴티지: 2번 굴려서 낮은 값
    const r1 = roll('d20');
    const r2 = roll('d20');
    chosen = Math.min(r1, r2);
    rolls = [r1, r2];
  } else {
    // 일반 또는 둘 다 있으면 상쇄
    chosen = roll('d20');
    rolls = [chosen];
  }

  return {
    die: 'd20',
    count: 1,
    rolls,
    total: chosen,
    modifier,
    finalTotal: chosen + modifier,
    isCritical: chosen === 20,
    isFumble: chosen === 1,
    advantage,
    disadvantage,
  };
}

/** d20 판정 (DC 체크) */
export function check(
  dc: number,
  modifier = 0,
  options: D20Options = {},
): CheckResult {
  const d20 = rollD20({ ...options, modifier });

  // 크리티컬/펌블은 DC 무관
  let grade: CheckGrade;
  let success: boolean;

  if (d20.isCritical) {
    grade = 'critical';
    success = true;
  } else if (d20.isFumble) {
    grade = 'fumble';
    success = false;
  } else if (d20.finalTotal >= dc) {
    grade = 'success';
    success = true;
  } else {
    grade = 'fail';
    success = false;
  }

  return {
    roll: d20,
    dc,
    success,
    margin: d20.finalTotal - dc,
    grade,
  };
}

// === 유틸리티 ===

/** 퍼센트 확률 체크 (0~100) */
export function percentCheck(chance: number): boolean {
  return Math.random() * 100 < chance;
}

/** 가중치 테이블에서 랜덤 선택 */
export function rollTable<T>(table: { item: T; weight: number }[]): T {
  const totalWeight = table.reduce((sum, entry) => sum + entry.weight, 0);
  let rand = Math.random() * totalWeight;

  for (const entry of table) {
    rand -= entry.weight;
    if (rand <= 0) return entry.item;
  }

  // fallback (부동소수점 오차 대비)
  return table[table.length - 1].item;
}

/** min~max 범위 정수 랜덤 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** 배열에서 랜덤 1개 선택 */
export function randomPick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
