/**
 * EventBus - 모듈 간 통신을 위한 이벤트 버스 시스템
 *
 * 각 모듈은 EventBus를 통해서만 서로 통신하며,
 * 이를 통해 모듈 간 느슨한 결합(loose coupling)을 유지합니다.
 */

type EventHandler = (data?: any) => void | Promise<void>;

interface EventSubscription {
  event: string;
  handler: EventHandler;
}

class EventBus {
  private listeners: Map<string, EventHandler[]>;
  private subscriptions: EventSubscription[];

  constructor() {
    this.listeners = new Map();
    this.subscriptions = [];
  }

  /**
   * 이벤트 리스너 등록
   */
  on(event: string, handler: EventHandler): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }

    this.listeners.get(event)!.push(handler);
    this.subscriptions.push({ event, handler });
  }

  /**
   * 이벤트 리스너 제거
   */
  off(event: string, handler: EventHandler): void {
    const handlers = this.listeners.get(event);
    if (!handlers) return;

    const index = handlers.indexOf(handler);
    if (index !== -1) {
      handlers.splice(index, 1);
    }

    // subscriptions에서도 제거
    const subIndex = this.subscriptions.findIndex(
      (s) => s.event === event && s.handler === handler
    );
    if (subIndex !== -1) {
      this.subscriptions.splice(subIndex, 1);
    }
  }

  /**
   * 이벤트 발생
   */
  async emit(event: string, data?: any): Promise<void> {
    const handlers = this.listeners.get(event);
    if (!handlers || handlers.length === 0) return;

    // 모든 핸들러 실행 (순차적)
    for (const handler of handlers) {
      try {
        await handler(data);
      } catch (error) {
        console.error(`Error in event handler for "${event}":`, error);
      }
    }
  }

  /**
   * 이벤트 즉시 발생 (동기)
   */
  emitSync(event: string, data?: any): void {
    const handlers = this.listeners.get(event);
    if (!handlers || handlers.length === 0) return;

    for (const handler of handlers) {
      try {
        handler(data);
      } catch (error) {
        console.error(`Error in sync event handler for "${event}":`, error);
      }
    }
  }

  /**
   * 특정 이벤트의 모든 리스너 제거
   */
  removeAllListeners(event?: string): void {
    if (event) {
      this.listeners.delete(event);
      this.subscriptions = this.subscriptions.filter((s) => s.event !== event);
    } else {
      this.listeners.clear();
      this.subscriptions = [];
    }
  }

  /**
   * 현재 등록된 이벤트 목록
   */
  getRegisteredEvents(): string[] {
    return Array.from(this.listeners.keys());
  }

  /**
   * 디버깅용: 이벤트별 리스너 개수
   */
  getListenerCount(event: string): number {
    return this.listeners.get(event)?.length || 0;
  }
}

// 싱글톤 인스턴스
export const eventBus = new EventBus();

// 이벤트 타입 정의 (타입 안정성)
export const GameEvents = {
  // Training 이벤트
  TRAINING_START: 'training:start',
  TRAINING_COMMAND: 'training:command',
  TRAINING_END: 'training:end',

  // Brothel 이벤트
  BROTHEL_ASSIGN: 'brothel:assign',
  BROTHEL_EXECUTE: 'brothel:execute',
  BROTHEL_RESULT: 'brothel:result',

  // Filming 이벤트
  FILMING_SHOOT: 'filming:shoot',
  FILMING_RESULT: 'filming:result',

  // Turn 이벤트
  TURNEND_START: 'turnend:start',
  TURNEND_NEXTDAY: 'turnend:nextday',
  TURNEND_COMPLETE: 'turnend:complete',

  // Growth 이벤트
  GROWTH_LEVELUP: 'growth:levelup',
  GROWTH_AUTO: 'growth:auto',

  // Event 이벤트
  EVENT_SPECIAL: 'event:special',
  EVENT_ENDING: 'event:ending',

  // System 이벤트
  SYSTEM_SAVE: 'system:save',
  SYSTEM_LOAD: 'system:load',

  // === 신규 시스템 이벤트 ===

  // Checkpoint 이벤트
  CHECKPOINT_MORNING: 'checkpoint:morning',
  CHECKPOINT_MIDDAY: 'checkpoint:midday',
  CHECKPOINT_NIGHT: 'checkpoint:night',

  // Phase 이벤트
  PHASE_ADVANCE: 'phase:advance',
  DAY_START: 'day:start',
  DAY_END: 'day:end',

  // Dice 이벤트
  DICE_ROLL: 'dice:roll',
  DICE_CHECK: 'dice:check',

  // Economy 이벤트
  ECONOMY_INCOME: 'economy:income',
  ECONOMY_EXPENSE: 'economy:expense',
  ECONOMY_DEBT_CHANGE: 'economy:debtChange',
  ECONOMY_BANKRUPT: 'economy:bankrupt',

  // League 이벤트
  LEAGUE_WEEKLY: 'league:weekly',
  LEAGUE_PROMOTION: 'league:promotion',
  LEAGUE_RELEGATION: 'league:relegation',
  LEAGUE_SEASON_END: 'league:seasonEnd',

  // Market 이벤트
  MARKET_SALE: 'market:sale',
  MARKET_COMMISSION: 'market:commission',

  // Condition 이벤트
  CONDITION_ESCAPE: 'condition:escape',
  CONDITION_COLLAPSE: 'condition:collapse',

  // Random Event 이벤트
  RANDOM_EVENT: 'event:random',
} as const;

export type GameEventType = typeof GameEvents[keyof typeof GameEvents];
