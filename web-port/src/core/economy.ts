/**
 * 경제 시스템 (core/economy.ts)
 *
 * 수입/지출/이자/파산 계산.
 * 외부 의존성 없음.
 */

import type { EconomyState } from '../types/game';

// === 상수 ===

/** 기본 유지비 (주간, 캐릭터당) */
const BASE_UPKEEP_PER_CHAR = 500;

/** 파산 임계값 */
const BANKRUPTCY_THRESHOLD = -100000;

/** 기본 이자율 */
export const DEFAULT_INTEREST_RATE = 0.05; // 5% 주간

// === 수입 계산 ===

/** 수입 계산 (기본 × 배율들) */
export function calculateIncome(
  base: number,
  multipliers: number[] = [],
): number {
  let total = base;
  for (const mult of multipliers) {
    total *= mult;
  }
  return Math.floor(total);
}

/** 평판 기반 수입 보너스 배율 */
export function reputationMultiplier(reputation: number): number {
  // 평판 0~100 → 배율 0.5~2.0
  return 0.5 + (reputation / 100) * 1.5;
}

// === 지출 계산 ===

/** 주간 유지비 계산 */
export function calculateUpkeep(characterCount: number): number {
  return BASE_UPKEEP_PER_CHAR * characterCount;
}

/** 총 지출 계산 */
export function calculateExpense(
  characterCount: number,
  extraCosts: number[] = [],
): number {
  const upkeep = calculateUpkeep(characterCount);
  const extra = extraCosts.reduce((sum, c) => sum + c, 0);
  return upkeep + extra;
}

// === 이자 ===

/** 빚에 대한 이자 계산 */
export function calculateInterest(debt: number, rate: number): number {
  if (debt <= 0) return 0;
  return Math.floor(debt * rate);
}

/** 주간 이자 계산 (순수 함수 - 상태 변경 없음) */
export function applyWeeklyInterest(economy: EconomyState): number {
  const interest = calculateInterest(economy.debt, economy.interestRate);
  // Store의 addDebt()로 반영해야 함
  return interest;
}

// === 일일 정산 ===

export interface SettlementResult {
  income: number;
  expense: number;
  net: number;
  newBalance: number;
}

/** 일일 정산 */
export function dailySettlement(
  currentMoney: number,
  income: number,
  expense: number,
): SettlementResult {
  const net = income - expense;
  return {
    income,
    expense,
    net,
    newBalance: currentMoney + net,
  };
}

// === 파산 체크 ===

/** 파산 여부 (빚이 임계값 초과) */
export function checkBankruptcy(money: number, debt: number): boolean {
  return (money - debt) < BANKRUPTCY_THRESHOLD;
}

// === 빚 상환 ===

/** 빚 상환 (가능한 만큼) */
export function payDebt(
  currentMoney: number,
  debt: number,
  amount: number,
): { newMoney: number; newDebt: number; paid: number } {
  const paid = Math.min(amount, debt, currentMoney);
  return {
    newMoney: currentMoney - paid,
    newDebt: debt - paid,
    paid,
  };
}

// === 평판 ===

/** 평판 변경 (0~100 클램프) */
export function adjustReputation(
  current: number,
  change: number,
): number {
  return Math.max(0, Math.min(100, current + change));
}
