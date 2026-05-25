/**
 * 영업 시스템 (gameplay/brothel.ts)
 *
 * 손님 생성, 매칭, 서비스 판정, 수입 계산.
 * Store를 직접 import하지 않음.
 */

import type { Character, CharacterCondition } from '../types/character';
import type { CheckResult } from '../types/game';
import { check, rollFormula, randomInt, rollTable, percentCheck } from '../core/dice';
import { checkAdvantage, applyActionCost } from '../core/condition';

// === 타입 ===

export interface Customer {
  id: number;
  name: string;
  tier: 'common' | 'rich' | 'vip';
  basePay: number;
  difficulty: number;        // 서비스 DC
  preference?: string;       // 선호 특성
  tipMultiplier: number;     // 팁 배율 (1.0~2.0)
}

export interface MatchResult {
  customer: Customer;
  character: Character;
  compatScore: number;       // 궁합 점수 (0~100)
  dcAdjust: number;          // DC 보정 (궁합 반영)
}

export interface ServiceResult {
  match: MatchResult;
  checkResult: CheckResult;
  income: number;
  tip: number;
  totalIncome: number;
  satisfactionChange: number; // 평판 변동
  messages: string[];
  newCondition: CharacterCondition | null; // 비용 적용 후 새 condition
}

// === 손님 생성 ===

const CUSTOMER_NAMES = [
  '신사', '회사원', '사업가', '학생', '관광객',
  '단골', '부자', 'VIP', '연예인', '정치인',
];

/** 평판 기반 손님 생성 */
export function generateCustomers(
  reputation: number,
  count?: number,
): Customer[] {
  // 평판에 따라 손님 수 결정
  const customerCount = count ?? Math.max(1, Math.floor(reputation / 20) + randomInt(1, 3));
  const customers: Customer[] = [];

  for (let i = 0; i < customerCount; i++) {
    // 평판 높을수록 고급 손님 확률 증가
    const tierRoll = randomInt(1, 100);
    let tier: Customer['tier'];
    let basePay: number;
    let difficulty: number;
    let tipMultiplier: number;

    if (tierRoll <= 10 + reputation * 0.3) {
      tier = 'vip';
      basePay = randomInt(3000, 8000);
      difficulty = randomInt(15, 20);
      tipMultiplier = 1.5 + Math.random() * 0.5;
    } else if (tierRoll <= 40 + reputation * 0.2) {
      tier = 'rich';
      basePay = randomInt(1500, 4000);
      difficulty = randomInt(12, 16);
      tipMultiplier = 1.2 + Math.random() * 0.3;
    } else {
      tier = 'common';
      basePay = randomInt(500, 1500);
      difficulty = randomInt(8, 13);
      tipMultiplier = 1.0 + Math.random() * 0.2;
    }

    customers.push({
      id: Date.now() + i,
      name: CUSTOMER_NAMES[randomInt(0, CUSTOMER_NAMES.length - 1)],
      tier,
      basePay,
      difficulty,
      tipMultiplier,
    });
  }

  return customers;
}

// === 매칭 ===

/** 캐릭터와 손님 매칭 */
export function matchCustomer(
  char: Character,
  customer: Customer,
): MatchResult {
  // 궁합 점수 (능력치 기반)
  let compatScore = 50; // 기본값

  // 봉사기술이 높으면 궁합 +
  const serviceSkill = char.abl[13] ?? 0; // 봉사기술
  compatScore += serviceSkill * 5;

  // 화술이 높으면 궁합 +
  const speechSkill = char.abl[15] ?? 0; // 화술
  compatScore += speechSkill * 3;

  // 티어 보정
  if (char.tier === 'SSR') compatScore += 15;
  else if (char.tier === 'SR') compatScore += 10;
  else if (char.tier === 'R') compatScore += 5;

  compatScore = Math.min(100, Math.max(0, compatScore));

  // DC 보정 (궁합 높으면 DC 낮아짐)
  const dcAdjust = -Math.floor((compatScore - 50) / 20);

  return {
    customer,
    character: char,
    compatScore,
    dcAdjust,
  };
}

// === 서비스 실행 ===

/** 서비스 판정 */
export function executeService(match: MatchResult): ServiceResult {
  const { customer, character, dcAdjust } = match;
  const messages: string[] = [];

  // MOOD 기반 어드밴티지
  const advantageState = checkAdvantage(character);
  const advantage = advantageState === 'advantage';
  const disadvantage = advantageState === 'disadvantage';

  // 서비스 스킬 보정치
  const serviceAbl = character.abl[13] ?? 0;
  const modifier = Math.floor(serviceAbl / 2);

  // DC = 손님 DC + 궁합 보정
  const finalDc = customer.difficulty + dcAdjust;

  // d20 판정
  const checkResult = check(finalDc, modifier, { advantage, disadvantage });

  // HP/MP 소비 (결과는 호출자가 Store에 반영)
  const newCondition = applyActionCost(character.condition, 5, 3);

  // 수입 계산
  let income = customer.basePay;
  let tip = 0;
  let satisfactionChange = 0;

  switch (checkResult.grade) {
    case 'critical':
      income = Math.floor(customer.basePay * 2);
      tip = Math.floor(income * customer.tipMultiplier);
      satisfactionChange = 3;
      messages.push(`${character.name}: 완벽한 서비스! 손님 대만족!`);
      break;
    case 'success':
      income = customer.basePay;
      tip = Math.floor(income * (customer.tipMultiplier - 1));
      satisfactionChange = 1;
      messages.push(`${character.name}: 서비스 성공 (₩${income + tip})`);
      break;
    case 'fail':
      income = Math.floor(customer.basePay * 0.5);
      tip = 0;
      satisfactionChange = -1;
      messages.push(`${character.name}: 서비스 미흡... 반액만 지불`);
      break;
    case 'fumble':
      income = 0;
      tip = 0;
      satisfactionChange = -3;
      messages.push(`${character.name}: 서비스 대실패! 손님이 화났다!`);
      break;
  }

  return {
    match,
    checkResult,
    income,
    tip,
    totalIncome: income + tip,
    satisfactionChange,
    messages,
    newCondition,
  };
}

/** 자동 영업 (배치된 캐릭터 일괄 처리) */
export function runBrothelShift(
  characters: Character[],
  reputation: number,
): { results: ServiceResult[]; totalIncome: number; reputationChange: number } {
  const brothelChars = characters.filter((c) => c.assignment === 'brothel');
  if (brothelChars.length === 0) {
    return { results: [], totalIncome: 0, reputationChange: 0 };
  }

  const customers = generateCustomers(reputation, brothelChars.length);
  const results: ServiceResult[] = [];
  let totalIncome = 0;
  let reputationChange = 0;

  for (let i = 0; i < brothelChars.length; i++) {
    const char = brothelChars[i];
    const customer = customers[i % customers.length];
    const match = matchCustomer(char, customer);
    const result = executeService(match);

    results.push(result);
    totalIncome += result.totalIncome;
    reputationChange += result.satisfactionChange;
  }

  return { results, totalIncome, reputationChange };
}
