/**
 * 조교 커맨드 데이터 (data/commands.ts)
 *
 * 핵심 커맨드 15개 정의.
 * 추후 확장 가능.
 */

import type { TrainingCommand } from '../gameplay/training';

export const TRAINING_COMMANDS: TrainingCommand[] = [
  // === Basic (DC 8~10) ===
  {
    id: 'caress', name: '애무', description: '가볍게 만져준다',
    category: 'basic', dc: 8, targetStat: '0', // C감각
    effectDice: '1d4+1', criticalDice: '2d4+2',
    hpCost: 5, mpCost: 2, modifierStat: '12', // 기교
  },
  {
    id: 'kiss', name: '키스', description: '키스한다',
    category: 'basic', dc: 8, targetStat: '0',
    effectDice: '1d4', criticalDice: '2d4',
    hpCost: 3, mpCost: 3, modifierStat: '12',
  },
  {
    id: 'talk', name: '대화', description: '이야기를 나눈다',
    category: 'basic', dc: 8, targetStat: '10', // 신뢰
    effectDice: '1d6', criticalDice: '2d6',
    hpCost: 2, mpCost: 5, modifierStat: '15', // 화술
  },
  {
    id: 'massage', name: '마사지', description: '몸을 풀어준다',
    category: 'basic', dc: 9, targetStat: '1', // B감각
    effectDice: '1d4+1', criticalDice: '2d4+2',
    hpCost: 5, mpCost: 2, modifierStat: '12',
  },
  {
    id: 'praise', name: '칭찬', description: '칭찬한다',
    category: 'basic', dc: 7, targetStat: '10', // 신뢰
    effectDice: '1d4+2', criticalDice: '2d6',
    hpCost: 1, mpCost: 3, modifierStat: '15',
  },

  // === Advanced (DC 12~15) ===
  {
    id: 'toy', name: '도구 사용', description: '도구를 사용한다',
    category: 'advanced', dc: 12, targetStat: '2', // V감각
    effectDice: '1d6+2', criticalDice: '2d6+4',
    fumblePenalty: '1d4',
    hpCost: 8, mpCost: 5, modifierStat: '12',
  },
  {
    id: 'service_train', name: '봉사 훈련', description: '봉사를 가르친다',
    category: 'advanced', dc: 13, targetStat: '13', // 봉사기술
    effectDice: '1d6+1', criticalDice: '2d6+3',
    fumblePenalty: '1d4',
    hpCost: 7, mpCost: 6, modifierStat: '12',
  },
  {
    id: 'expose', name: '노출', description: '노출시킨다',
    category: 'advanced', dc: 14, targetStat: '17', // 노출벽
    effectDice: '1d6+1', criticalDice: '2d8+2',
    fumblePenalty: '1d6',
    hpCost: 5, mpCost: 8, modifierStat: '12',
  },
  {
    id: 'discipline', name: '훈계', description: '엄하게 가르친다',
    category: 'advanced', dc: 12, targetStat: '10', // 신뢰 (또는 종순)
    effectDice: '1d8', criticalDice: '2d8',
    fumblePenalty: '1d6',
    hpCost: 6, mpCost: 7, modifierStat: '15',
  },
  {
    id: 'sex_train', name: '성교 훈련', description: '성교를 가르친다',
    category: 'advanced', dc: 14, targetStat: '14', // 성교기술
    effectDice: '1d8+2', criticalDice: '2d8+4',
    fumblePenalty: '1d4',
    hpCost: 10, mpCost: 5, modifierStat: '14',
  },

  // === Hard (DC 16~18) ===
  {
    id: 'hard_train', name: '강도 높은 조교', description: '한계를 넘는 조교',
    category: 'hard', dc: 16, targetStat: '11', // 욕망
    effectDice: '2d6+2', criticalDice: '3d6+6',
    fumblePenalty: '1d8',
    hpCost: 15, mpCost: 10, modifierStat: '12',
    requirements: { minStars: 2 },
  },
  {
    id: 'break', name: '굴복', description: '정신을 꺾는다',
    category: 'hard', dc: 18, targetStat: '11',
    effectDice: '2d8+3', criticalDice: '3d8+6',
    fumblePenalty: '2d6',
    hpCost: 12, mpCost: 15, modifierStat: '12',
    requirements: { minStars: 3 },
  },
  {
    id: 'special_service', name: '특수 봉사', description: '고급 서비스 훈련',
    category: 'hard', dc: 16, targetStat: '13',
    effectDice: '2d6+4', criticalDice: '3d8+4',
    fumblePenalty: '1d6',
    hpCost: 12, mpCost: 10, modifierStat: '14',
    requirements: { minStars: 2 },
  },

  // === Special ===
  {
    id: 'comfort', name: '위로', description: 'MP를 회복시켜준다',
    category: 'special', dc: 10, targetStat: 'mp_recovery',
    effectDice: '1d6+3', criticalDice: '2d6+6',
    hpCost: 5, mpCost: 0, modifierStat: '15',
  },
  {
    id: 'reward', name: '보상', description: '보상으로 기분을 올린다',
    category: 'special', dc: 10, targetStat: 'mood_recovery',
    effectDice: '1d8+2', criticalDice: '2d8+4',
    hpCost: 3, mpCost: 5, modifierStat: '15',
  },
];
