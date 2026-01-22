/**
 * 캐릭터 랜덤 생성을 위한 헬퍼 함수 모음
 */

import type { CharacterTalents, CharacterAbilities, CharacterBase } from '../types/character';

/**
 * 범위 내 랜덤 실수 (min 이상 max 이하)
 */
export function randomRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/**
 * 범위 내 랜덤 정수 (min 이상 max 이하)
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 확률 체크 (0.0 ~ 1.0)
 */
export function chance(probability: number): boolean {
  return Math.random() < probability;
}

/**
 * 배열에서 랜덤 선택
 */
export function randomPick<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * 배열에서 n개 랜덤 선택 (중복 없음)
 */
export function randomPickMultiple<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, array.length));
}

/**
 * 가중치 기반 랜덤 선택
 */
export function weightedRandom<T>(items: Array<{ item: T; weight: number }>): T {
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
  let random = Math.random() * totalWeight;

  for (const item of items) {
    random -= item.weight;
    if (random <= 0) {
      return item.item;
    }
  }

  return items[items.length - 1].item;
}

/**
 * 특성 ID 범위에서 n개 랜덤 선택
 */
export function selectRandomTalents(
  minId: number,
  maxId: number,
  count: number,
  excludeIds: number[] = []
): number[] {
  const availableIds: number[] = [];

  for (let i = minId; i <= maxId; i++) {
    if (!excludeIds.includes(i)) {
      availableIds.push(i);
    }
  }

  return randomPickMultiple(availableIds, count);
}

/**
 * 특성 보유 여부 체크
 */
export function hasTalent(talents: CharacterTalents, talentId: number): boolean {
  return talents[talentId] !== undefined && talents[talentId] !== 0;
}

/**
 * 나이 기반 스케일링 (나이가 높을수록 값 증가)
 */
export function scaleByAge(
  baseValue: number,
  age: number,
  minAge: number = 18,
  maxAge: number = 35
): number {
  const ageFactor = (age - minAge) / (maxAge - minAge);
  const scaledValue = baseValue * (0.5 + ageFactor * 0.5); // 50% ~ 100%
  return Math.floor(scaledValue);
}

/**
 * 신체 수치 계산 (가슴, 허리, 엉덩이)
 */
export interface BodyMeasurements {
  bust: number;
  waist: number;
  hips: number;
}

export function calculateBodyMeasurements(
  height: number,
  breastCup: number
): BodyMeasurements {
  // 키 기반 기본 사이즈 계산
  const heightFactor = height / 160; // 160cm 기준

  // 가슴 (브래지어 컵 사이즈 반영)
  const baseBust = 75 + (breastCup - 1) * 5; // 1컵=75, 2컵=80, ..., 7컵=105
  const bust = Math.floor(baseBust * heightFactor);

  // 허리 (가슴의 70-80%)
  const waist = Math.floor(bust * randomRange(0.7, 0.8));

  // 엉덩이 (가슴의 90-110%)
  const hips = Math.floor(bust * randomRange(0.9, 1.1));

  return { bust, waist, hips };
}

/**
 * 매력치 계산 (능력치 기반)
 */
export function calculateCharm(
  abl: CharacterAbilities,
  talents: CharacterTalents,
  base: CharacterBase
): number {
  let charm = 50; // 기본값

  // 능력치 기여
  charm += (abl[50] || 0) * 5;  // 미용감각
  charm += (abl[15] || 0) * 3;  // 화술
  charm += (abl[51] || 0) * 2;  // 운동능력

  // 특성 기여
  if (hasTalent(talents, 113)) charm += 20; // 매력
  if (hasTalent(talents, 91)) charm += 15;  // 매혹
  if (hasTalent(talents, 110)) charm += 10; // 거유
  if (hasTalent(talents, 114)) charm += 15; // 폭유
  if (hasTalent(talents, 109)) charm -= 5;  // 빈유
  if (hasTalent(talents, 115)) charm -= 10; // 비만

  // 신체 사이즈 기여 (키, 가슴)
  if (base[20]) {
    const height = base[20];
    if (height >= 165 && height <= 175) charm += 5; // 적당한 키
  }

  return Math.max(0, Math.min(100, charm));
}

/**
 * 혈액형 문자열
 */
export function getBloodTypeString(bloodType: number): string {
  const types = ['A', 'B', 'O', 'AB'];
  return types[bloodType] || 'A';
}

/**
 * 가격 계산 (능력치 총합 기반)
 */
export function calculatePrice(
  abl: CharacterAbilities,
  talents: CharacterTalents,
  exp: Record<number, number | undefined>,
  base: CharacterBase
): number {
  let price = 5000; // 기본가

  // 능력치 보너스
  const ablSum = Object.values(abl).reduce((sum, v) => (sum || 0) + (v || 0), 0);
  price += (ablSum || 0) * 300;

  // 특성 보너스
  const talentCount = Object.keys(talents).length;
  price += talentCount * 500;

  // 경험치 보너스
  const expSum = Object.values(exp).reduce((sum, v) => (sum || 0) + (v || 0), 0);
  price += (expSum || 0) * 50;

  // 매력치 보너스
  price += (base[31] || 0) * 100;

  // 처녀 보너스
  if (hasTalent(talents, 0)) {
    price += 10000;
  }

  // 랜덤 변동 (±20%)
  const variation = randomRange(-price * 0.2, price * 0.2);
  price += variation;

  return Math.floor(Math.max(1000, price));
}

/**
 * 특성 카테고리 타입 (talentProbabilities.ts와 호환)
 */
export interface TalentCategory {
  ids: number[];
  probability: number;
  maxCount: number;
  minCount?: number;
}

/**
 * 배타적 특성 체크 함수 타입
 */
export type ExclusiveChecker = (talentId: number) => number[];

/**
 * 특성 보장 할당 (minCount ~ maxCount 범위 내에서 반드시 부여)
 */
export function assignGuaranteed(
  talents: CharacterTalents,
  category: TalentCategory,
  getExclusives: ExclusiveChecker
): void {
  const { ids, probability, minCount = 0, maxCount } = category;

  // 이미 부여된 특성 개수
  let assignedCount = 0;

  // 사용 가능한 특성 필터링
  const getAvailable = (): number[] => {
    return ids.filter(id => {
      // 이미 부여됨
      if (talents[id]) return false;

      // 배타적 쌍 체크
      const exclusives = getExclusives(id);
      const hasExclusive = exclusives.some(exId => talents[exId]);
      if (hasExclusive) return false;

      return true;
    });
  };

  // minCount 보장
  while (assignedCount < minCount) {
    const available = getAvailable();
    if (available.length === 0) break;

    const selectedId = randomPick(available);
    talents[selectedId] = 1;
    assignedCount++;
  }

  // minCount ~ maxCount 사이에서 확률 기반 추가
  while (assignedCount < maxCount && chance(probability)) {
    const available = getAvailable();
    if (available.length === 0) break;

    const selectedId = randomPick(available);
    talents[selectedId] = 1;
    assignedCount++;
  }
}
