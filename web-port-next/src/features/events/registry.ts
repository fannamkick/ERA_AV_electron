import type { ScriptEventSpec } from './types';

// 전역 스크립트 이벤트 사양 사전
export const scriptEventRegistry: readonly ScriptEventSpec[] = [
  {
    id: 'pregnancy_confirmed',
    name: '임신 확정 이벤트',
    trigger: 'turnEnd',
    conditions: {
      // CFLAG:109가 배란(가임) 상태(1)일 때
      exactConditionFlags: { '109': 1 },
      // CFLAG:110(정액 오염도)가 1 이상일 때
      minConditionFlags: { '110': 1 },
      // 임신 중이 아닐 때 (소질 TALENT:130이 없을 때)
      excludeTraits: ['130'],
    },
    postEffects: [
      {
        op: 'set_condition_flag',
        characterId: 'character:1',
        id: '120', // 임신 상태 플래그 (CFLAG:120 = 1)
        value: 1,
      },
      {
        op: 'gain_trait',
        characterId: 'character:1',
        id: '130', // 임신 소질 (TALENT:130)
        value: true,
      },
      {
        op: 'set_relationship',
        characterId: 'character:1',
        id: 'character:0', // 트레이너와의 관계 업데이트
        value: '임신',
      },
    ],
  },
];
