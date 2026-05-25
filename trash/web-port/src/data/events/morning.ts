/**
 * 아침 이벤트 풀 (data/events/morning.ts)
 */

import type { GameEvent } from '../../core/eventEngine';

export const MORNING_EVENTS: GameEvent[] = [
  {
    id: 'morning_good_weather',
    name: '좋은 날씨',
    description: '쾌청한 아침, 모두의 기분이 좋다',
    phase: 'morning',
    category: 'positive',
    weight: 30,
    execute: () => ({
      message: '오늘은 날씨가 좋다. 캐릭터들의 기분이 좋아졌다.',
      effects: { mood: 5 },
    }),
  },
  {
    id: 'morning_bad_dream',
    name: '악몽',
    description: '누군가 악몽을 꿨다',
    phase: 'morning',
    category: 'negative',
    weight: 15,
    execute: () => ({
      message: '한 캐릭터가 악몽을 꿔 기분이 나빠졌다.',
      effects: { mood: -10 },
    }),
  },
  {
    id: 'morning_donation',
    name: '익명 후원',
    description: '익명의 후원자가 돈을 보냈다',
    phase: 'morning',
    category: 'positive',
    weight: 10,
    conditions: { minDay: 3 },
    execute: () => ({
      message: '익명의 후원자로부터 돈이 도착했다!',
      effects: { money: 2000 },
    }),
  },
  {
    id: 'morning_inspection',
    name: '감시관 방문',
    description: '감시관이 시설을 점검한다',
    phase: 'morning',
    category: 'neutral',
    weight: 8,
    conditions: { minDay: 7 },
    execute: (ctx) => ({
      message: '감시관이 방문하여 시설을 점검했다. 평판에 영향을 받았다.',
      effects: { reputation: ctx.reputation > 50 ? 3 : -3 },
    }),
  },
  {
    id: 'morning_runaway_attempt',
    name: '도주 소동',
    description: '캐릭터가 도주를 시도했다',
    phase: 'morning',
    category: 'negative',
    weight: 10,
    conditions: { minCharacters: 2 },
    execute: () => ({
      message: '캐릭터 한 명이 도주를 시도했다! 다행히 막았지만...',
      effects: { mood: -15, reputation: -2 },
    }),
  },
  {
    id: 'morning_calm',
    name: '평온한 아침',
    description: '특별한 일 없이 하루가 시작됐다',
    phase: 'morning',
    category: 'neutral',
    weight: 40,
    execute: () => ({
      message: '평온한 아침이다.',
      effects: {},
    }),
  },
];
