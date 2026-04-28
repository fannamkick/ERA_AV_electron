/**
 * 낮 이벤트 풀 (data/events/midday.ts)
 */

import type { GameEvent } from '../../core/eventEngine';

export const MIDDAY_EVENTS: GameEvent[] = [
  {
    id: 'midday_visitor',
    name: '방문객',
    description: '누군가가 시설을 방문했다',
    phase: 'midday',
    category: 'neutral',
    weight: 20,
    execute: () => ({
      message: '상인이 방문하여 물건을 팔고 갔다.',
      effects: {},
    }),
  },
  {
    id: 'midday_tip',
    name: '큰 팁',
    description: '단골이 큰 팁을 남겼다',
    phase: 'midday',
    category: 'positive',
    weight: 12,
    conditions: { minReputation: 20 },
    execute: () => ({
      message: '단골 손님이 큰 팁을 남겼다!',
      effects: { money: 1500 },
    }),
  },
  {
    id: 'midday_fight',
    name: '캐릭터 다툼',
    description: '캐릭터들이 다투었다',
    phase: 'midday',
    category: 'negative',
    weight: 10,
    conditions: { minCharacters: 3 },
    execute: () => ({
      message: '캐릭터들 사이에 다툼이 벌어졌다. 분위기가 나빠졌다.',
      effects: { mood: -8 },
    }),
  },
  {
    id: 'midday_rumor_good',
    name: '좋은 소문',
    description: '시설의 좋은 평판이 퍼졌다',
    phase: 'midday',
    category: 'positive',
    weight: 10,
    conditions: { minReputation: 30 },
    execute: () => ({
      message: '시설에 대한 좋은 소문이 퍼지고 있다!',
      effects: { reputation: 3 },
    }),
  },
  {
    id: 'midday_rumor_bad',
    name: '나쁜 소문',
    description: '부정적 소문이 퍼졌다',
    phase: 'midday',
    category: 'negative',
    weight: 8,
    conditions: { maxReputation: 40 },
    execute: () => ({
      message: '나쁜 소문이 퍼지고 있다...',
      effects: { reputation: -5 },
    }),
  },
  {
    id: 'midday_peaceful',
    name: '평화로운 오후',
    description: '특별한 일 없는 오후',
    phase: 'midday',
    category: 'neutral',
    weight: 35,
    execute: () => ({
      message: '평화로운 오후가 지나간다.',
      effects: {},
    }),
  },
];
