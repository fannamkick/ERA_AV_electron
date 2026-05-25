/**
 * 리그 시스템 (gameplay/league.ts)
 *
 * FM 스타일 리그 (4디비전, 12주 시즌).
 * Store를 직접 import하지 않음.
 */

import type { LeagueState, LeagueDivision, SeasonResult, WeeklyStats } from '../types/game';

// === 상수 ===

const DIVISIONS: LeagueDivision[] = ['bronze', 'silver', 'gold', 'platinum'];

/** 디비전별 승격/강등 기준 */
const DIVISION_THRESHOLDS: Record<LeagueDivision, {
  promotionRank: number;   // 이 순위 이내면 승격
  relegationRank: number;  // 이 순위 이하면 강등
  totalTeams: number;      // 디비전 내 총 팀 수
}> = {
  bronze:   { promotionRank: 3, relegationRank: 999, totalTeams: 12 },   // 강등 없음
  silver:   { promotionRank: 3, relegationRank: 10, totalTeams: 12 },
  gold:     { promotionRank: 3, relegationRank: 10, totalTeams: 12 },
  platinum: { promotionRank: 999, relegationRank: 10, totalTeams: 12 },  // 승격 없음
};

/** 디비전 한글명 */
export function getDivisionName(div: LeagueDivision): string {
  const names: Record<LeagueDivision, string> = {
    bronze: '브론즈',
    silver: '실버',
    gold: '골드',
    platinum: '플래티넘',
  };
  return names[div];
}

/** 디비전 인덱스 */
function getDivisionIndex(div: LeagueDivision): number {
  return DIVISIONS.indexOf(div);
}

// === 포인트 계산 ===

/** 주간 포인트 계산 (주간 통계 기반) */
export function calculateWeeklyPoints(stats: WeeklyStats): number {
  let points = 0;

  // 수입 기반 (1000원당 1포인트)
  points += Math.floor(stats.income / 1000);

  // 조교 포인트 (직접 반영)
  points += stats.trainingPoints;

  // 영업 성과 (손님 수 × 5)
  points += stats.brothelCustomers * 5;

  // 판매 보너스 (건당 20)
  points += stats.charactersSold * 20;

  // 지출 감점 (5000원당 -1)
  points -= Math.floor(stats.expense / 5000);

  return Math.max(0, points);
}

// === 주간 평가 ===

export interface WeeklyLeagueResult {
  pointsEarned: number;
  newTotalPoints: number;
  rankChange: number;
  newRank: number;
  message: string;
}

/** 주간 평가 실행 */
export function weeklyEvaluation(
  league: LeagueState,
  stats: WeeklyStats,
): WeeklyLeagueResult {
  const pointsEarned = calculateWeeklyPoints(stats);
  const newTotalPoints = league.points + pointsEarned;

  // 순위 계산 (간이 - NPC 경쟁자 시뮬레이션)
  const threshold = DIVISION_THRESHOLDS[league.division];
  const avgNpcPoints = getAverageNpcPoints(league.division, league.seasonWeek);

  // 포인트가 NPC 평균 이상이면 순위 상승
  let newRank = league.rank;
  if (pointsEarned > avgNpcPoints * 1.2) {
    newRank = Math.max(1, newRank - 1);
  } else if (pointsEarned < avgNpcPoints * 0.8) {
    newRank = Math.min(threshold.totalTeams, newRank + 1);
  }

  const rankChange = league.rank - newRank; // 양수 = 순위 상승

  let message = `이번 주 ${pointsEarned}pt 획득 (총 ${newTotalPoints}pt)`;
  if (rankChange > 0) message += ` | 순위 ${rankChange}단계 상승!`;
  else if (rankChange < 0) message += ` | 순위 ${-rankChange}단계 하락...`;

  return {
    pointsEarned,
    newTotalPoints: newTotalPoints,
    rankChange,
    newRank,
    message,
  };
}

/** NPC 평균 포인트 (디비전별, 시뮬레이션) */
function getAverageNpcPoints(division: LeagueDivision, week: number): number {
  const basePoints: Record<LeagueDivision, number> = {
    bronze: 30,
    silver: 60,
    gold: 100,
    platinum: 150,
  };
  // 주가 진행될수록 NPC도 약간 성장
  return basePoints[division] + week * 2;
}

// === 시즌 종료 ===

/** 승격/강등 판정 */
export function checkPromotion(
  league: LeagueState,
): 'promote' | 'relegate' | null {
  const threshold = DIVISION_THRESHOLDS[league.division];

  if (league.rank <= threshold.promotionRank) return 'promote';
  if (league.rank >= threshold.relegationRank) return 'relegate';
  return null;
}

/** 시즌 종료 처리 */
export function endSeason(league: LeagueState): SeasonResult {
  const promotion = checkPromotion(league);
  const divIdx = getDivisionIndex(league.division);

  let newDivision = league.division;
  let isPromotion = false;
  let isRelegation = false;

  if (promotion === 'promote' && divIdx < DIVISIONS.length - 1) {
    newDivision = DIVISIONS[divIdx + 1];
    isPromotion = true;
  } else if (promotion === 'relegate' && divIdx > 0) {
    newDivision = DIVISIONS[divIdx - 1];
    isRelegation = true;
  }

  // 시즌 보상
  const rewardMoney = getSeasonReward(league.division, league.rank);
  const rewardReputation = isPromotion ? 10 : isRelegation ? -5 : 2;

  return {
    finalRank: league.rank,
    totalPoints: league.points,
    promotion: isPromotion,
    relegation: isRelegation,
    rewards: {
      money: rewardMoney,
      reputation: rewardReputation,
    },
  };
}

/** 시즌 보상 금액 */
function getSeasonReward(division: LeagueDivision, rank: number): number {
  const baseReward: Record<LeagueDivision, number> = {
    bronze: 5000,
    silver: 15000,
    gold: 40000,
    platinum: 100000,
  };
  // 순위가 높을수록 보상 증가
  const rankBonus = Math.max(0, 13 - rank) * 1000;
  return baseReward[division] + rankBonus;
}

/** 새 시즌 리그 상태 생성 */
export function createNewSeasonState(
  prevLeague: LeagueState,
  seasonResult: SeasonResult,
): LeagueState {
  const divIdx = getDivisionIndex(prevLeague.division);
  let newDivision = prevLeague.division;

  if (seasonResult.promotion && divIdx < DIVISIONS.length - 1) {
    newDivision = DIVISIONS[divIdx + 1];
  } else if (seasonResult.relegation && divIdx > 0) {
    newDivision = DIVISIONS[divIdx - 1];
  }

  const threshold = DIVISION_THRESHOLDS[newDivision];

  return {
    division: newDivision,
    rank: seasonResult.promotion
      ? threshold.totalTeams - 2  // 승격하면 하위권에서 시작
      : seasonResult.relegation
        ? 3                        // 강등하면 상위권에서 시작
        : Math.ceil(threshold.totalTeams / 2), // 잔류면 중간
    points: 0,
    weeklyPoints: 0,
    seasonWeek: 1,
    season: prevLeague.season + 1,
  };
}
