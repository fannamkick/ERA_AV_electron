/**
 * 시간 시스템 유틸리티
 * TIME 시스템 관련 헬퍼 함수들
 */

import type { TimeOfDay } from '../stores/gameStore';

/**
 * 시간대 이름 반환
 */
export const getTimeName = (time: TimeOfDay): string => {
  switch (time) {
    case 0: return '오전';
    case 1: return '오후';
    default: return '???';
  }
};

/**
 * 다음 시간대 이름 반환
 */
export const getNextTimeName = (time: TimeOfDay): string => {
  if (time === 1) {
    return '다음날 오전';
  }
  return getTimeName((time + 1) as TimeOfDay);
};

/**
 * 시간 진행 메시지 생성
 */
export const getTimeAdvanceMessage = (currentTime: TimeOfDay): string => {
  const current = getTimeName(currentTime);
  const next = getNextTimeName(currentTime);
  return `${current}을(를) 종료하고 ${next}으로 이동하시겠습니까?`;
};

/**
 * 새 날 시작 메시지 생성
 */
export const getNewDayMessage = (day: number): string => {
  return `Day ${day} 오전이 시작되었습니다.`;
};
