import type { TrainingCommandSpec } from './types';

export const trainingCommandRegistry: Record<string, TrainingCommandSpec> = {
  '0': {
    id: '0',
    name: '애무',
    staminaCost: 5,
    energyCost: 50,
    baseSources: {
      '22': 60,  // 성행위 (원작 SOURCE:4)
      '24': 30,  // 불결 (원작 SOURCE:8)
      '23': 100, // 노출 (원작 SOURCE:12)
    },
    availability: {},
    postEffects: [
      { op: 'add_experience', id: '14', value: 1 } // 애정경험 (원작 EXP:14)
    ]
  },
  '1': {
    id: '1',
    name: '커닐링구스',
    staminaCost: 5,
    energyCost: 50,
    baseSources: {
      '10': 100, // 액정 (액체분비 - 원작 SOURCE:9)
      '11': 100, // 접촉 (원작 SOURCE:10)
      '23': 220, // 노출 (원작 SOURCE:12)
      '14': 50,  // 아픔 (통증 - 원작 SOURCE:14)
    },
    availability: {
      excludeTraits: ['122'] // 남성 제외 (TALENT:122)
    },
    postEffects: []
  },
  '2': {
    id: '2',
    name: '애널애무',
    staminaCost: 10,
    energyCost: 60,
    baseSources: {
      '11': 50,  // 접촉
      '14': 20,  // 아픔
      '16': 10,  // 반감 (원작 SOURCE:16)
    },
    availability: {},
    postEffects: []
  },
  '3': {
    id: '3',
    name: '자위',
    staminaCost: 10,
    energyCost: 80,
    baseSources: {
      '22': 200, // 성행위 (원작 SOURCE:4)
      '23': 300, // 노출 (원작 SOURCE:12)
      '13': 200, // 수치 (원작 SOURCE:13)
    },
    availability: {},
    postEffects: [
      { op: 'add_experience', id: '10', value: 1 } // 자위경험 (원작 EXP:10)
    ]
  },
  '8': {
    id: '8',
    name: '손가락삽입',
    staminaCost: 20,
    energyCost: 10,
    baseSources: {
      '1': 0,    // 쾌V (ABL에 따라 가중치 가산)
      '11': 50,  // 접촉
      '14': 30,  // 아픔
      '16': 10,  // 반감
    },
    availability: {
      excludeTraits: ['122'] // 남성 제외
    },
    postEffects: []
  },
  '10': {
    id: '10',
    name: '로터',
    staminaCost: 5,
    energyCost: 5,
    baseSources: {
      '23': 150, // 노출
    },
    availability: {
      requiresItem: '20' // 로터 도구 아이템 필요
    },
    postEffects: []
  },
  '20': {
    id: '20',
    name: '정상위',
    staminaCost: 30,
    energyCost: 20,
    baseSources: {
      '22': 200, // 성행위
      '11': 100, // 접촉
    },
    availability: {
      excludeTraits: ['122'] // 남성 제외
    },
    postEffects: [
      { op: 'add_experience', id: '0', value: 1 }, // V경험
      { op: 'add_experience', id: '4', value: 1 }  // 성교경험
    ]
  },
  '50': {
    id: '50',
    name: '로션',
    staminaCost: 0,
    energyCost: 0,
    baseSources: {},
    availability: {
      requiresItem: '25' // 로션 아이템 소지 필수
    },
    postEffects: [
      { op: 'set_condition_flag', id: '100', value: 1 } // 로션 플래그(TEQUIP:25) 설정
    ]
  },
  '51': {
    id: '51',
    name: '미약',
    staminaCost: 0,
    energyCost: 0,
    baseSources: {},
    availability: {
      requiresItem: '26' // 미약 아이템 소지 필수
    },
    postEffects: [
      { op: 'set_condition_flag', id: '101', value: 1 } // 미약 플래그(TEQUIP:26) 설정
    ]
  },
  '55': {
    id: '55',
    name: '아무것도 안한다',
    staminaCost: 0,
    energyCost: 0,
    baseSources: {},
    availability: {},
    postEffects: []
  }
};
