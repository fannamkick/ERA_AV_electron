/**
 * 특성 데이터 (data/traits.ts)
 *
 * 림월드 스타일 특성 풀.
 * 캐릭터 생성 시 랜덤 부여.
 */

export interface TraitDef {
  id: string;
  name: string;
  description: string;
  category: 'positive' | 'negative' | 'neutral' | 'special';
  effects: {
    trainingBonus?: number;    // 조교 DC 보정 (음수 = 쉬워짐)
    brothelBonus?: number;     // 영업 수입 배율 보정
    moodDecay?: number;        // 기분 감소 배율
    escapeChance?: number;     // 도주 확률 보정
    valueMult?: number;        // 시장가치 배율
  };
  rarity: number;              // 가중치 (높을수록 자주)
}

export const TRAITS: TraitDef[] = [
  // === 긍정적 ===
  {
    id: 'obedient', name: '순종적', description: '지시에 잘 따른다',
    category: 'positive', rarity: 30,
    effects: { trainingBonus: -2, escapeChance: -10, valueMult: 1.1 },
  },
  {
    id: 'talented', name: '재능 있음', description: '배우는 속도가 빠르다',
    category: 'positive', rarity: 15,
    effects: { trainingBonus: -3, valueMult: 1.3 },
  },
  {
    id: 'charming', name: '매력적', description: '손님을 끌어당긴다',
    category: 'positive', rarity: 20,
    effects: { brothelBonus: 0.2, valueMult: 1.2 },
  },
  {
    id: 'resilient', name: '강인함', description: '체력 소모가 적다',
    category: 'positive', rarity: 20,
    effects: { moodDecay: 0.7 },
  },
  {
    id: 'loyal', name: '충성스러움', description: '도주하지 않는다',
    category: 'positive', rarity: 10,
    effects: { escapeChance: -50, valueMult: 1.15 },
  },
  {
    id: 'seductive', name: '유혹적', description: '영업 성과가 높다',
    category: 'positive', rarity: 15,
    effects: { brothelBonus: 0.3, valueMult: 1.25 },
  },
  {
    id: 'quicklearner', name: '빠른 학습', description: '조교 효과 증가',
    category: 'positive', rarity: 12,
    effects: { trainingBonus: -4, valueMult: 1.2 },
  },

  // === 부정적 ===
  {
    id: 'defiant', name: '반항적', description: '지시에 저항한다',
    category: 'negative', rarity: 25,
    effects: { trainingBonus: 3, escapeChance: 15 },
  },
  {
    id: 'fragile', name: '허약', description: '체력이 빨리 소모된다',
    category: 'negative', rarity: 20,
    effects: { moodDecay: 1.5 },
  },
  {
    id: 'shy', name: '수줍음', description: '영업 성과가 낮다',
    category: 'negative', rarity: 25,
    effects: { brothelBonus: -0.15 },
  },
  {
    id: 'slowlearner', name: '더딘 학습', description: '조교가 잘 안 먹힌다',
    category: 'negative', rarity: 15,
    effects: { trainingBonus: 4 },
  },
  {
    id: 'escape_prone', name: '도주벽', description: '틈만 나면 도망치려 한다',
    category: 'negative', rarity: 10,
    effects: { escapeChance: 25 },
  },
  {
    id: 'clumsy', name: '서투름', description: '서비스에 실수가 잦다',
    category: 'negative', rarity: 20,
    effects: { brothelBonus: -0.2 },
  },

  // === 중립 ===
  {
    id: 'masochist', name: '마조', description: '고통에 쾌감을 느낀다',
    category: 'neutral', rarity: 15,
    effects: { trainingBonus: -2, moodDecay: 0.8, brothelBonus: 0.1 },
  },
  {
    id: 'exhibitionist', name: '노출벽', description: '보여주는 것을 좋아한다',
    category: 'neutral', rarity: 10,
    effects: { brothelBonus: 0.15, escapeChance: -5 },
  },
  {
    id: 'innocent', name: '순진함', description: '순수한 매력이 있다',
    category: 'neutral', rarity: 20,
    effects: { valueMult: 1.1, trainingBonus: 2 },
  },
  {
    id: 'mature', name: '성숙함', description: '경험에서 나오는 능숙함',
    category: 'neutral', rarity: 15,
    effects: { brothelBonus: 0.1, trainingBonus: -1 },
  },

  // === 특수 ===
  {
    id: 'rare_beauty', name: '절세미인', description: '보는 것만으로 감탄',
    category: 'special', rarity: 3,
    effects: { brothelBonus: 0.5, valueMult: 2.0 },
  },
  {
    id: 'genius', name: '천재', description: '모든 것을 빠르게 습득',
    category: 'special', rarity: 2,
    effects: { trainingBonus: -6, valueMult: 1.8 },
  },
  {
    id: 'cursed', name: '저주받음', description: '불행이 따라다닌다',
    category: 'special', rarity: 5,
    effects: { moodDecay: 2.0, escapeChance: 20, valueMult: 0.5 },
  },
];

/** ID로 특성 조회 */
export function getTrait(id: string): TraitDef | undefined {
  return TRAITS.find((t) => t.id === id);
}

/** 카테고리별 특성 필터 */
export function getTraitsByCategory(category: TraitDef['category']): TraitDef[] {
  return TRAITS.filter((t) => t.category === category);
}
