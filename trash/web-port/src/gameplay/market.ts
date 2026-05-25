/**
 * 시장 시스템 (gameplay/market.ts)
 *
 * 캐릭터 가치 평가, 구매자 생성, 판매.
 * Store를 직접 import하지 않음.
 */

import type { Character, CharacterTier } from '../types/character';
import { rollFormula, randomInt, rollTable, percentCheck } from '../core/dice';

// === 타입 ===

export interface Buyer {
  id: number;
  name: string;
  budget: number;
  preferences: {
    preferredTier?: CharacterTier[];
    preferredTraits?: string[];
    bonusMultiplier: number;  // 선호 일치 시 추가 배율
  };
}

export interface SaleResult {
  character: Character;
  buyer: Buyer;
  basePrice: number;
  bonusPrice: number;
  finalPrice: number;
  messages: string[];
}

export interface Commission {
  id: string;
  description: string;
  targetTier: CharacterTier;
  targetTraits?: string[];
  minStars: number;
  reward: number;
  deadline: number;           // 남은 주 수
}

// === 가치 평가 ===

/** 캐릭터 시장 가치 계산 */
export function calculateMarketValue(char: Character): number {
  let value = char.baseValue;

  // 티어 배율
  const tierMultiplier: Record<CharacterTier, number> = {
    N: 1.0,
    R: 1.5,
    SR: 2.5,
    SSR: 5.0,
  };
  value *= tierMultiplier[char.tier];

  // 성장 단계 보정 (stars)
  value *= 1 + char.stars * 0.3;

  // 주요 능력치 반영
  const keyAbilities = [0, 1, 2, 3, 10, 12, 13, 14]; // C/B/V/A감각, 신뢰, 기교, 봉사, 성교
  for (const key of keyAbilities) {
    const ablValue = char.abl[key] ?? 0;
    value += ablValue * 100;
  }

  // 특성 보너스
  if (char.traits.length > 0) {
    value *= 1 + char.traits.length * 0.05;
  }

  // 충성도 보정 (높을수록 가치 +)
  value *= 0.8 + (char.loyalty / 100) * 0.4;

  // 컨디션 보정 (HP 낮으면 감가)
  value *= 0.5 + (char.condition.hp / 100) * 0.5;

  return Math.floor(value);
}

// === 구매자 생성 ===

const BUYER_NAMES = [
  '귀족', '부호', '사업가', '콜렉터', '외국인 바이어',
  '경쟁 업체', '단골 고객', '비밀 조직',
];

/** 구매자 생성 */
export function generateBuyers(count = 3): Buyer[] {
  const buyers: Buyer[] = [];

  for (let i = 0; i < count; i++) {
    const budget = randomInt(5000, 50000) * (1 + Math.random());

    const preferredTiers: CharacterTier[] | undefined =
      percentCheck(50)
        ? [(['R', 'SR', 'SSR'] as CharacterTier[])[randomInt(0, 2)]]
        : undefined;

    buyers.push({
      id: Date.now() + i,
      name: BUYER_NAMES[randomInt(0, BUYER_NAMES.length - 1)],
      budget: Math.floor(budget),
      preferences: {
        preferredTier: preferredTiers,
        bonusMultiplier: 1.1 + Math.random() * 0.4,
      },
    });
  }

  return buyers;
}

// === 판매 ===

/** 캐릭터 판매 실행 */
export function executeSale(char: Character, buyer: Buyer): SaleResult {
  const basePrice = calculateMarketValue(char);
  const messages: string[] = [];

  // 선호도 보너스
  let bonusPrice = 0;
  const prefs = buyer.preferences;

  if (prefs.preferredTier?.includes(char.tier)) {
    bonusPrice += Math.floor(basePrice * (prefs.bonusMultiplier - 1));
    messages.push(`구매자가 ${char.tier}급을 원했습니다! 보너스 +₩${bonusPrice}`);
  }

  if (prefs.preferredTraits) {
    const matchCount = char.traits.filter((t) =>
      prefs.preferredTraits!.includes(t),
    ).length;
    if (matchCount > 0) {
      const traitBonus = Math.floor(basePrice * matchCount * 0.1);
      bonusPrice += traitBonus;
      messages.push(`특성 일치 ${matchCount}건! 보너스 +₩${traitBonus}`);
    }
  }

  // 예산 초과 시 조정
  let finalPrice = basePrice + bonusPrice;
  if (finalPrice > buyer.budget) {
    finalPrice = buyer.budget;
    messages.push(`구매자 예산 한도로 가격 조정: ₩${finalPrice}`);
  }

  messages.push(`${char.name} 판매 완료: ₩${finalPrice}`);

  return {
    character: char,
    buyer,
    basePrice,
    bonusPrice,
    finalPrice,
    messages,
  };
}

// === 의뢰 (주 1회) ===

const COMMISSION_DESCRIPTIONS = [
  '특별한 캐릭터를 원합니다',
  '고급 인재를 찾고 있습니다',
  '특정 조건의 캐릭터가 필요합니다',
];

/** 의뢰 생성 (주 1회, 30% 확률) */
export function generateCommission(currentDay: number): Commission | null {
  if (!percentCheck(30)) return null;

  const tiers: CharacterTier[] = ['R', 'SR', 'SSR'];
  const targetTier = tiers[randomInt(0, 2)];

  const rewardBase: Record<CharacterTier, number> = {
    N: 5000,
    R: 15000,
    SR: 40000,
    SSR: 100000,
  };

  return {
    id: `commission_${currentDay}_${randomInt(1000, 9999)}`,
    description: COMMISSION_DESCRIPTIONS[randomInt(0, COMMISSION_DESCRIPTIONS.length - 1)],
    targetTier,
    minStars: randomInt(1, 3),
    reward: rewardBase[targetTier] + randomInt(0, rewardBase[targetTier]),
    deadline: randomInt(2, 4),
  };
}

/** 의뢰 조건 충족 여부 */
export function checkCommission(char: Character, commission: Commission): boolean {
  if (char.tier !== commission.targetTier && getTierRank(char.tier) < getTierRank(commission.targetTier)) {
    return false;
  }
  if (char.stars < commission.minStars) return false;
  return true;
}

function getTierRank(tier: CharacterTier): number {
  const ranks: Record<CharacterTier, number> = { N: 0, R: 1, SR: 2, SSR: 3 };
  return ranks[tier];
}
