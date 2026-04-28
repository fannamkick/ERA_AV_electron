/**
 * 시간 시스템 (core/time.ts)
 *
 * 게임 내 시간 흐름 (오전/오후 + 3 체크포인트).
 * 외부 의존성 없음.
 */

import type { GamePhase, TimeOfDay } from '../types/game';

// === 상수 ===

/** 시즌 길이 (주) */
export const SEASON_LENGTH = 12;

/** 하루 페이즈 순서 */
const PHASE_ORDER: GamePhase[] = [
  'morning_check',
  'morning_action',
  'midday_check',
  'afternoon_action',
  'night_check',
];

// === 페이즈 진행 ===

/** 다음 페이즈 반환 */
export function nextPhase(current: GamePhase): GamePhase {
  const idx = PHASE_ORDER.indexOf(current);
  if (idx === -1 || idx >= PHASE_ORDER.length - 1) {
    return PHASE_ORDER[0]; // 다음 날 시작
  }
  return PHASE_ORDER[idx + 1];
}

/** 하루의 마지막 페이즈인지 */
export function isDayEnd(phase: GamePhase): boolean {
  return phase === 'night_check';
}

/** 체크포인트 페이즈인지 (이벤트 발생 가능) */
export function isCheckpoint(phase: GamePhase): boolean {
  return phase.endsWith('_check');
}

/** 행동 페이즈인지 (플레이어 입력 가능) */
export function isActionPhase(phase: GamePhase): boolean {
  return phase.endsWith('_action');
}

/** 현재 시간대 */
export function getTimeOfDay(phase: GamePhase): TimeOfDay {
  if (phase === 'morning_check' || phase === 'morning_action') {
    return 'morning';
  }
  return 'afternoon';
}

/** 페이즈 한글명 */
export function getPhaseName(phase: GamePhase): string {
  const names: Record<GamePhase, string> = {
    morning_check: '기상',
    morning_action: '오전',
    midday_check: '점심',
    afternoon_action: '오후',
    night_check: '취침',
  };
  return names[phase];
}

/** 페이즈 인덱스 (순서 비교용) */
export function getPhaseIndex(phase: GamePhase): number {
  return PHASE_ORDER.indexOf(phase);
}

// === 주차/시즌 ===

/** 현재 주차 (1-based) */
export function getWeek(day: number): number {
  return day;
}

/** 현재 시즌 번호 (1-based) */
export function getSeason(day: number): number {
  return Math.floor((day - 1) / SEASON_LENGTH) + 1;
}

/** 시즌 내 주차 (1~SEASON_LENGTH) */
export function getSeasonWeek(day: number): number {
  return ((day - 1) % SEASON_LENGTH) + 1;
}

/** 주말인지 (매 7일마다, 필요시 사용) */
export function isWeekEnd(day: number): boolean {
  return day % 7 === 0;
}

/** 시즌 종료 주인지 */
export function isSeasonEnd(day: number): boolean {
  return day % SEASON_LENGTH === 0;
}

/** 오전에만 가능한 행동인지 */
export function isMorningOnly(phase: GamePhase): boolean {
  return phase === 'morning_action';
}

/** 오후에만 가능한 행동인지 (예: 영업) */
export function isAfternoonOnly(phase: GamePhase): boolean {
  return phase === 'afternoon_action';
}
