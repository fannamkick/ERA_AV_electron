/**
 * 이벤트 엔진 (core/eventEngine.ts)
 *
 * 림월드 스타일 랜덤 이벤트 시스템.
 * 의존성: dice.ts (확률 체크 + 가중치 선택)
 */

import type { GamePhase } from '../types/game';
import { percentCheck, rollTable } from './dice';

// === 이벤트 타입 ===

export type EventPhase = 'morning' | 'midday' | 'night';
export type EventCategory = 'positive' | 'negative' | 'neutral';

export interface EventConditions {
  minDay?: number;
  maxDay?: number;
  minReputation?: number;
  maxReputation?: number;
  minMoney?: number;
  maxMoney?: number;
  minCharacters?: number;
  requiredFlags?: string[];
  /** 커스텀 조건 체크 */
  custom?: (context: EventContext) => boolean;
}

export interface EventResult {
  message: string;
  effects: {
    money?: number;
    reputation?: number;
    mood?: number;          // 전체 캐릭터 mood
    characterId?: number;   // 특정 캐릭터 대상
    flags?: Record<string, number>;
  };
}

export interface GameEvent {
  id: string;
  name: string;
  description: string;
  phase: EventPhase;
  category: EventCategory;
  weight: number;           // 가중치 (높을수록 자주 발생)
  conditions?: EventConditions;
  execute: (context: EventContext) => EventResult;
}

/** 이벤트 평가에 필요한 게임 상태 snapshot */
export interface EventContext {
  day: number;
  money: number;
  reputation: number;
  characterCount: number;
  flags: Record<string, number>;
  phase: GamePhase;
}

// === 이벤트 레지스트리 ===

const eventRegistry: GameEvent[] = [];

/** 이벤트 등록 */
export function registerEvents(events: GameEvent[]): void {
  eventRegistry.push(...events);
}

/** 이벤트 등록 해제 */
export function unregisterEvent(eventId: string): void {
  const idx = eventRegistry.findIndex((e) => e.id === eventId);
  if (idx !== -1) eventRegistry.splice(idx, 1);
}

/** 전체 이벤트 초기화 */
export function clearEvents(): void {
  eventRegistry.length = 0;
}

// === 이벤트 실행 ===

/** GamePhase → EventPhase 변환 */
function toEventPhase(phase: GamePhase): EventPhase | null {
  switch (phase) {
    case 'morning_check': return 'morning';
    case 'midday_check': return 'midday';
    case 'night_check': return 'night';
    default: return null;  // 행동 페이즈에서는 이벤트 없음
  }
}

/** 조건 체크 */
function checkConditions(event: GameEvent, ctx: EventContext): boolean {
  const c = event.conditions;
  if (!c) return true;

  if (c.minDay !== undefined && ctx.day < c.minDay) return false;
  if (c.maxDay !== undefined && ctx.day > c.maxDay) return false;
  if (c.minReputation !== undefined && ctx.reputation < c.minReputation) return false;
  if (c.maxReputation !== undefined && ctx.reputation > c.maxReputation) return false;
  if (c.minMoney !== undefined && ctx.money < c.minMoney) return false;
  if (c.maxMoney !== undefined && ctx.money > c.maxMoney) return false;
  if (c.minCharacters !== undefined && ctx.characterCount < c.minCharacters) return false;
  if (c.requiredFlags) {
    for (const flag of c.requiredFlags) {
      if (!ctx.flags[flag]) return false;
    }
  }
  if (c.custom && !c.custom(ctx)) return false;

  return true;
}

/** 이벤트 발생 시도 (체크포인트마다 호출) */
export function rollEvent(
  context: EventContext,
  eventChance = 30,
): GameEvent | null {
  const eventPhase = toEventPhase(context.phase);
  if (!eventPhase) return null;

  // 이벤트 발생 확률 체크
  if (!percentCheck(eventChance)) return null;

  // 해당 페이즈 + 조건 만족하는 이벤트 필터
  const eligible = eventRegistry.filter(
    (e) => e.phase === eventPhase && checkConditions(e, context),
  );

  if (eligible.length === 0) return null;

  // 가중치 기반 선택
  return rollTable(eligible.map((e) => ({ item: e, weight: e.weight })));
}

/** 특정 이벤트 강제 실행 */
export function forceEvent(
  eventId: string,
  context: EventContext,
): EventResult | null {
  const event = eventRegistry.find((e) => e.id === eventId);
  if (!event) return null;
  return event.execute(context);
}

/** 등록된 이벤트 수 */
export function getEventCount(): number {
  return eventRegistry.length;
}

/** 특정 페이즈 이벤트 목록 */
export function getEventsForPhase(phase: EventPhase): GameEvent[] {
  return eventRegistry.filter((e) => e.phase === phase);
}
