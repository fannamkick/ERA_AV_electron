/**
 * 밤 이벤트 풀 (data/events/night.ts)
 */

import type { GameEvent } from '../../core/eventEngine';

export const NIGHT_EVENTS: GameEvent[] = [
  {
    id: 'night_good_rest',
    name: '숙면',
    description: '모두가 잘 잤다',
    phase: 'night',
    category: 'positive',
    weight: 25,
    execute: () => ({
      message: '모두가 푹 쉬었다. 내일이 기대된다.',
      effects: { mood: 3 },
    }),
  },
  {
    id: 'night_theft',
    name: '도난',
    description: '도둑이 들었다',
    phase: 'night',
    category: 'negative',
    weight: 5,
    conditions: { minMoney: 5000 },
    execute: (ctx) => {
      const stolen = Math.min(Math.floor(ctx.money * 0.05), 3000);
      return {
        message: `밤에 도둑이 들었다! ₩${stolen}을 잃었다.`,
        effects: { money: -stolen },
      };
    },
  },
  {
    id: 'night_bonding',
    name: '유대 강화',
    description: '캐릭터와 친해졌다',
    phase: 'night',
    category: 'positive',
    weight: 15,
    conditions: { minCharacters: 1 },
    execute: () => ({
      message: '밤에 캐릭터와 이야기를 나누며 유대가 깊어졌다.',
      effects: { mood: 8 },
    }),
  },
  {
    id: 'night_expense',
    name: '긴급 수리',
    description: '시설 수리가 필요하다',
    phase: 'night',
    category: 'negative',
    weight: 8,
    conditions: { minDay: 5 },
    execute: () => ({
      message: '시설 일부가 고장났다. 수리비가 들었다.',
      effects: { money: -1000 },
    }),
  },
  {
    id: 'night_quiet',
    name: '조용한 밤',
    description: '아무 일 없는 밤',
    phase: 'night',
    category: 'neutral',
    weight: 40,
    execute: () => ({
      message: '조용한 밤이 지나간다.',
      effects: {},
    }),
  },
  {
    id: 'night_debt_collector',
    name: '빚쟁이',
    description: '빚쟁이가 찾아왔다',
    phase: 'night',
    category: 'negative',
    weight: 5,
    conditions: {
      custom: (ctx) => (ctx.flags['hasDebt'] ?? 0) > 0 || ctx.money < 0,
    },
    execute: () => ({
      message: '빚쟁이가 찾아와 독촉했다. 스트레스를 받았다.',
      effects: { mood: -15, reputation: -2 },
    }),
  },
];
