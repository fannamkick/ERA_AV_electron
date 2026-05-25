import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GameState, GamePhase, LeagueState, EconomyState, WeeklyStats } from '../types/game';
import type { Character } from '../types/character';
import type { MasterCharacter } from '../types/master';
import { createMasterCharacter } from '../types/master';
import type { SaveData } from '../utils/saveSystem';
import { saveGame } from '../utils/saveSystem';
import { applyDailyDecay, applyConditionChanges } from '../core/condition';
import { applyWeeklyInterest } from '../core/economy';
import { runBrothelShift } from '../gameplay/brothel';
import { weeklyEvaluation, endSeason, createNewSeasonState } from '../gameplay/league';

// 시간대 타입 (0: 오전, 1: 오후) - 레거시 호환
export type TimeOfDay = 0 | 1;

// 난이도 타입 (FLAG:5)
export type Difficulty = 1 | 2 | 3 | 4 | 9;
// 1: EASY, 2: NORMAL, 3: HARD, 4: POWERFUL, 9: EXTRA

interface GameStore extends GameState {
  // 시간 시스템
  time: TimeOfDay; // 0: 오전, 1: 오후 (레거시)
  phase: GamePhase; // 새 페이즈 시스템

  // 경제 시스템
  economy: EconomyState;

  // 리그 시스템
  league: LeagueState;

  // 주간 통계
  weeklyStats: WeeklyStats;

  // 게임 설정
  difficulty: Difficulty; // 난이도 (FLAG:5)
  weekLimit: number; // 주 제한 (FLAG:3)
  targetMoney: number; // 목표 금액 (FLAG:4)

  // 마스터 (주인공/조교자) 데이터
  master: MasterCharacter;

  // 마스터 특성 (TALENT:MASTER:XX) - 하위 호환용, deprecated
  /** @deprecated Use master.talent instead */
  masterTalents: Record<number, number>;

  // 마스터 능력치 (ABL:MASTER:XX) - 하위 호환용, deprecated
  /** @deprecated Use master.abl instead */
  masterAbilities: Record<number, number>;

  // 조수 ID 목록 (CFLAG:X:1 >= 1인 캐릭터들)
  assistantIds: number[];

  // 전체 캐릭터 풀 (노예 시장에서 구매 가능한 캐릭터들)
  availableCharacters: Character[];
  // 소유한 캐릭터들
  ownedCharacters: Character[];

  // 다음 부여할 ID (10000번부터 시작, 랜덤 캐릭터용)
  nextCharacterId: number;

  // 메타데이터
  playTime: number; // 총 플레이 시간 (초)
  saveCount: number; // 저장 횟수
  dayReached: number; // 최대 도달 일수
  achievements: number[]; // 달성한 업적 ID
  clearedEndings: number[]; // 클리어한 엔딩 ID

  // 액션
  resetGame: () => void;
  setDifficulty: (difficulty: Difficulty) => void;
  setCurrentCharacter: (id: number | null) => void;
  addMoney: (amount: number) => void;
  nextDay: () => void;
  advanceTime: () => void; // 시간 진행 (오전→오후→저녁→다음날)
  endTurn: () => void; // 턴 종료 처리 (TURNEND 로직)

  // 아이템 관리
  buyItem: (itemId: number, price: number) => boolean;
  sellItem: (itemId: number, sellPrice: number) => boolean;
  getItemCount: (itemId: number) => number;
  hasItem: (itemId: number) => boolean;

  loadAvailableCharacters: (characters: Character[]) => void;
  purchaseCharacter: (id: number, price: number) => boolean;
  sellCharacter: (id: number, price: number) => void;
  addCharacter: (character: Character) => void; // ADDCHARA
  getNextCharacterId: () => number; // 다음 캐릭터 ID 반환 및 증가
  getCharacter: (id: number) => Character | undefined; // ID로 캐릭터 조회
  updateCharacter: (id: number, updates: Partial<Character>) => void; // 캐릭터 정보 업데이트
  setAssistant: (id: number, isAssistant: boolean) => void; // 조수 설정/해제

  // 새 시스템 액션
  advancePhase: () => void;           // 페이즈 진행
  addReputation: (amount: number) => void;
  addDebt: (amount: number) => void;
  payDebtAction: (amount: number) => void;
  resetWeeklyStats: () => void;
  addWeeklyStat: (key: keyof WeeklyStats, amount: number) => void;
  setFlag: (key: number, value: number) => void; // 플래그 설정

  // 자동화 액션
  processDailyEnd: () => void;        // 일일 종료 처리
  processWeeklyEnd: () => void;       // 주간 종료 처리
  processSeasonEnd: () => void;       // 시즌 종료 처리

  // 저장/불러오기
  getSaveData: () => SaveData['gameState'];
  loadSaveData: (data: SaveData['gameState']) => void;
  getMetadata: () => SaveData['metadata'];
  updatePlayTime: (seconds: number) => void;
  incrementSaveCount: () => void;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
  // 초기 상태
  day: 1,
  time: 0, // 오전부터 시작 (레거시)
  phase: 'morning_check' as GamePhase,
  money: 100000,

  // 경제
  economy: {
    debt: 0,
    interestRate: 0.05,
    reputation: 10,
    weeklyIncome: 0,
    weeklyExpense: 0,
  },

  // 리그
  league: {
    division: 'bronze' as const,
    rank: 1,
    points: 0,
    weeklyPoints: 0,
    seasonWeek: 1,
    season: 1,
  },

  // 주간 통계
  weeklyStats: {
    income: 0,
    expense: 0,
    trainingPoints: 0,
    brothelCustomers: 0,
    charactersSold: 0,
  },
  playerName: '프로듀서',
  characters: [], // 소유 캐릭터 (GameState 호환용)
  currentCharacter: null,
  flags: {},
  items: {},

  // 게임 설정 (기본값: NORMAL)
  difficulty: 2,
  weekLimit: 100,
  targetMoney: 5000000,

  // 마스터 캐릭터 (새로운 타입)
  master: createMasterCharacter(2, '프로듀서'),

  // 마스터 시스템 (하위 호환용 - deprecated)
  masterTalents: {}, // 특성 없이 시작
  masterAbilities: { 12: 0 }, // 기교 Lv 0
  assistantIds: [], // 조수 없음

  // 추가 상태
  availableCharacters: [], // 구매 가능한 전체 캐릭터 (스페셜만)
  ownedCharacters: [], // 실제 소유한 캐릭터
  nextCharacterId: 10000, // 랜덤 캐릭터용 ID (10000번부터)

  // 메타데이터
  playTime: 0,
  saveCount: 0,
  dayReached: 1,
  achievements: [],
  clearedEndings: [],

  // 액션
  resetGame: () => set({
    day: 1,
    time: 0,
    phase: 'morning_check' as GamePhase,
    money: 1000, // NORMAL 기본값
    playerName: '프로듀서',
    characters: [],
    currentCharacter: null,
    flags: {},
    items: {},
    difficulty: 2,
    weekLimit: 100,
    targetMoney: 5000000,
    master: createMasterCharacter(2, '프로듀서'),
    masterTalents: {},
    masterAbilities: { 12: 0 },
    assistantIds: [],
    ownedCharacters: [],
    economy: { debt: 0, interestRate: 0.05, reputation: 10, weeklyIncome: 0, weeklyExpense: 0 },
    league: { division: 'bronze' as const, rank: 1, points: 0, weeklyPoints: 0, seasonWeek: 1, season: 1 },
    weeklyStats: { income: 0, expense: 0, trainingPoints: 0, brothelCustomers: 0, charactersSold: 0 },
    playTime: 0,
    saveCount: 0,
    dayReached: 1,
    achievements: [],
    clearedEndings: []
  }),

  setDifficulty: (difficulty) => {
    // ERB SYSTEM_GAMESTART.ERB 기반 난이도별 설정
    let weekLimit = 100;
    let targetMoney = 5000000;
    let startMoney = 1000;

    if (difficulty === 1) { // EASY
      weekLimit = 120;
      targetMoney = 3000000;
      startMoney = 2000;
    } else if (difficulty === 2) { // NORMAL
      weekLimit = 100;
      targetMoney = 5000000;
      startMoney = 1000;
    }
    // TODO: HARD, POWERFUL, EXTRA 추가

    const state = get();
    const newMaster = createMasterCharacter(difficulty, state.master.name);

    set({
      difficulty,
      weekLimit,
      targetMoney,
      money: startMoney,
      master: newMaster,
      masterAbilities: { 12: newMaster.abl[12] }, // 하위 호환
      flags: {
        5: difficulty, // FLAG:5 = 난이도
        3: weekLimit,  // FLAG:3 = 주 제한
        4: targetMoney // FLAG:4 = 목표 금액
      }
    });
  },

  setCurrentCharacter: (id) => set({ currentCharacter: id }),

  addMoney: (amount) => set((state) => ({
    money: state.money + amount
  })),

  // 아이템 구매
  buyItem: (itemId, price) => {
    let success = false;
    set((state) => {
      if (state.money >= price) {
        success = true;
        return {
          money: state.money - price,
          items: {
            ...state.items,
            [itemId]: (state.items[itemId] || 0) + 1
          }
        };
      }
      return state;
    });
    return success;
  },

  // 아이템 판매
  sellItem: (itemId, sellPrice) => {
    let success = false;
    set((state) => {
      const currentCount = state.items[itemId] || 0;
      if (currentCount > 0) {
        success = true;
        const newItems = { ...state.items };
        newItems[itemId] = currentCount - 1;
        if (newItems[itemId] === 0) {
          delete newItems[itemId];
        }
        return {
          money: state.money + sellPrice,
          items: newItems
        };
      }
      return state;
    });
    return success;
  },

  // 아이템 수량 확인
  getItemCount: (itemId) => {
    const state = get();
    return state.items[itemId] || 0;
  },

  // 아이템 보유 여부
  hasItem: (itemId) => {
    const state = get();
    return (state.items[itemId] || 0) > 0;
  },

  nextDay: () => set((state) => ({
    day: state.day + 1,
    time: 0, // 다음날 오전으로 리셋
    dayReached: Math.max(state.dayReached, state.day + 1)
  })),

  // 시간 진행 (오전→오후→다음날)
  advanceTime: () => {
    const state = get();
    if (state.time === 0) {
      // 오전 → 오후
      set({ time: 1 });
    } else {
      // 오후 → 다음날 오전 (TURNEND 처리)
      get().endTurn();
    }
  },

  // 턴 종료 처리 (간소화된 TURNEND)
  /**
   * 레거시 호환 액션: advancePhase()로 래핑
   * @deprecated 새 코드는 advancePhase() 직접 사용
   */
  endTurn: () => {
    console.log(`[TURNEND] 레거시 호출 → advancePhase로 전환`);
    get().advancePhase();
  },

  // === 새 시스템 액션 ===

  advancePhase: () => {
    const state = get();
    const phaseOrder: GamePhase[] = [
      'morning_check', 'morning_action', 'midday_check', 'afternoon_action', 'night_check'
    ];
    const idx = phaseOrder.indexOf(state.phase);

    if (idx >= phaseOrder.length - 1) {
      // night_check → 다음날 morning_check

      // 일일 처리 (TURNEND 로직)
      get().processDailyEnd();

      set({
        phase: 'morning_check',
        day: state.day + 1,
        time: 0,
        dayReached: Math.max(state.dayReached, state.day + 1),
      });
    } else {
      const nextPhase = phaseOrder[idx + 1];
      // 레거시 time 동기화
      const time: TimeOfDay = (nextPhase === 'afternoon_action' || nextPhase === 'night_check') ? 1 : 0;
      set({ phase: nextPhase, time });
    }
  },

  addReputation: (amount) => set((state) => ({
    economy: {
      ...state.economy,
      reputation: Math.max(0, Math.min(100, state.economy.reputation + amount)),
    },
  })),

  addDebt: (amount) => set((state) => ({
    economy: {
      ...state.economy,
      debt: state.economy.debt + amount,
    },
  })),

  payDebtAction: (amount) => set((state) => {
    const paid = Math.min(amount, state.economy.debt, state.money);
    return {
      money: state.money - paid,
      economy: { ...state.economy, debt: state.economy.debt - paid },
    };
  }),

  resetWeeklyStats: () => set({
    weeklyStats: { income: 0, expense: 0, trainingPoints: 0, brothelCustomers: 0, charactersSold: 0 },
  }),

  addWeeklyStat: (key, amount) => set((state) => ({
    weeklyStats: { ...state.weeklyStats, [key]: state.weeklyStats[key] + amount },
  })),

  setFlag: (key, value) => set((state) => ({
    flags: { ...state.flags, [key]: value },
  })),

  // === 자동화 액션 ===

  processDailyEnd: () => {
    const state = get();

    // 1. 캐릭터 컨디션 감소 (core/condition.ts 사용)
    state.ownedCharacters.forEach(char => {
      const newCondition = applyDailyDecay(char.condition, char.assignment);
      get().updateCharacter(char.id, { condition: newCondition });
    });

    // 2. 영업 결산 (brothel.ts 사용)
    if (state.day % 1 === 0) {  // 매일
      const brothelResults = runBrothelShift(
        state.ownedCharacters.filter(c => c.assignment === 'brothel'),
        state.economy.reputation
      );
      get().addMoney(brothelResults.totalIncome);
      get().addReputation(brothelResults.reputationChange);
      get().addWeeklyStat('brothelCustomers', brothelResults.results.length);
      get().addWeeklyStat('income', brothelResults.totalIncome);

      // 각 캐릭터의 condition 업데이트
      brothelResults.results.forEach(result => {
        if (result.newCondition) {
          get().updateCharacter(result.match.character.id, {
            condition: result.newCondition
          });
        }
      });
    }

    // 3. 주간 처리 (7일마다)
    if (state.day % 7 === 0) {
      get().processWeeklyEnd();
    }

    // 4. 자동저장
    const updatedState = get();
    const gameState = updatedState.getSaveData();
    const metadata = updatedState.getMetadata();

    saveGame(0, gameState, metadata).then((success) => {
      if (success) {
        console.log('[AUTO-SAVE] 자동저장 완료 (슬롯 0)');
      }
    }).catch((error) => {
      console.error('[AUTO-SAVE] 자동저장 오류:', error);
    });
  },

  processWeeklyEnd: () => {
    const state = get();

    // 1. 이자 적용 (core/economy.ts)
    const interest = applyWeeklyInterest(state.economy);
    get().addDebt(interest);

    // 2. 리그 평가 (gameplay/league.ts)
    const leagueResult = weeklyEvaluation(state.league, state.weeklyStats);
    set({
      league: {
        ...state.league,
        points: state.league.points + leagueResult.pointsEarned,
        rank: leagueResult.newRank,
        weeklyPoints: leagueResult.pointsEarned,
        seasonWeek: state.league.seasonWeek + 1,
      }
    });

    // 3. 시즌 종료 체크 (12주)
    if (state.league.seasonWeek >= 12) {
      get().processSeasonEnd();
    }

    // 4. 주간 통계 리셋
    get().resetWeeklyStats();
  },

  processSeasonEnd: () => {
    const state = get();
    const seasonResult = endSeason(state.league);

    set({
      league: createNewSeasonState(state.league, seasonResult),
    });

    // 보상 지급
    get().addMoney(seasonResult.rewards.money);
    get().addReputation(seasonResult.rewards.reputation);
  },

  loadAvailableCharacters: (characters) => set((state) => ({
    availableCharacters: [...state.availableCharacters, ...characters]
  })),

  // 다음 캐릭터 ID 반환 및 증가
  getNextCharacterId: () => {
    const id = get().nextCharacterId;
    set((state) => ({ nextCharacterId: state.nextCharacterId + 1 }));
    return id;
  },

  purchaseCharacter: (id, price) => {
    let success = false;
    set((state) => {
      if (state.money >= price) {
        const character = state.availableCharacters.find(c => c.id === id);
        if (character && !state.ownedCharacters.find(c => c.id === id)) {
          success = true;
          return {
            money: state.money - price,
            ownedCharacters: [...state.ownedCharacters, character],
            characters: [...state.ownedCharacters, character] // GameState 호환
          };
        }
      }
      return state;
    });
    return success;
  },

  sellCharacter: (id, price) => set((state) => ({
    money: state.money + price,
    ownedCharacters: state.ownedCharacters.filter(c => c.id !== id),
    characters: state.ownedCharacters.filter(c => c.id !== id), // GameState 호환
    currentCharacter: state.currentCharacter === id ? null : state.currentCharacter
  })),

  // ADDCHARA - 캐릭터 추가 (ERB 함수)
  addCharacter: (character) => {
    set((state) => {
      // 이미 소유하고 있는지 확인
      if (state.ownedCharacters.find(c => c.id === character.id)) {
        console.warn(`[ADDCHARA] Character ${character.id} already owned`);
        return state;
      }

      const newOwned = [...state.ownedCharacters, { ...character, isOwned: true }];
      console.log(`[ADDCHARA] Added character ${character.id}: ${character.name}`);

      return {
        ownedCharacters: newOwned,
        characters: newOwned, // GameState 호환
      };
    });
  },

  // 캐릭터 조회
  getCharacter: (id) => {
    const state = get();
    return state.ownedCharacters.find(c => c.id === id);
  },

  // 캐릭터 업데이트
  updateCharacter: (id, updates) => {
    set((state) => {
      const updated = state.ownedCharacters.map(c =>
        c.id === id ? { ...c, ...updates } : c
      );
      return {
        ownedCharacters: updated,
        characters: updated,
      };
    });
  },

  // 조수 설정/해제
  setAssistant: (id, isAssistant) => {
    set((state) => {
      const updated = state.ownedCharacters.map(c =>
        c.id === id ? { ...c, isAssistant } : c
      );

      const newAssistantIds = isAssistant
        ? [...state.assistantIds, id]
        : state.assistantIds.filter(aid => aid !== id);

      return {
        ownedCharacters: updated,
        characters: updated,
        assistantIds: newAssistantIds,
      };
    });
  },

  // 저장/불러오기
  getSaveData: () => {
    const state = get();
    return {
      day: state.day,
      time: state.time,
      phase: state.phase,
      money: state.money,
      ownedCharacters: state.ownedCharacters,
      availableCharacters: state.availableCharacters,
      currentCharacter: state.currentCharacter,
      globalFlags: state.flags,
      items: state.items,
      achievements: state.achievements,
      clearedEndings: state.clearedEndings,
      economy: state.economy,
      league: state.league,
      weeklyStats: state.weeklyStats,
      difficulty: state.difficulty,
      weekLimit: state.weekLimit,
      targetMoney: state.targetMoney,
      nextCharacterId: state.nextCharacterId,
    };
  },

  loadSaveData: (data) => set({
    day: data.day,
    time: (data as any).time || 0,
    phase: (data as any).phase || 'morning_check',
    money: data.money,
    ownedCharacters: data.ownedCharacters,
    availableCharacters: data.availableCharacters,
    currentCharacter: data.currentCharacter,
    characters: data.ownedCharacters,
    flags: data.globalFlags,
    items: data.items,
    achievements: data.achievements,
    clearedEndings: data.clearedEndings,
    economy: (data as any).economy || { debt: 0, interestRate: 0.05, reputation: 10, weeklyIncome: 0, weeklyExpense: 0 },
    league: (data as any).league || { division: 'bronze' as const, rank: 1, points: 0, weeklyPoints: 0, seasonWeek: 1, season: 1 },
    weeklyStats: (data as any).weeklyStats || { income: 0, expense: 0, trainingPoints: 0, brothelCustomers: 0, charactersSold: 0 },
    difficulty: (data as any).difficulty || 2,
    weekLimit: (data as any).weekLimit || 100,
    targetMoney: (data as any).targetMoney || 5000000,
    nextCharacterId: (data as any).nextCharacterId || 10000,
  }),

  getMetadata: () => {
    const state = get();
    return {
      playTime: state.playTime,
      saveCount: state.saveCount,
      dayReached: state.dayReached,
    };
  },

  updatePlayTime: (seconds) => set((state) => ({
    playTime: state.playTime + seconds
  })),

  incrementSaveCount: () => set((state) => ({
    saveCount: state.saveCount + 1
  })),
}),
    {
      name: 'erav-game-storage', // localStorage key
      partialize: (state) => ({
        // 저장할 상태만 선택
        day: state.day,
        time: state.time,
        phase: state.phase,
        money: state.money,
        playerName: state.playerName,
        currentCharacter: state.currentCharacter,
        flags: state.flags,
        items: state.items,
        difficulty: state.difficulty,
        weekLimit: state.weekLimit,
        targetMoney: state.targetMoney,
        masterTalents: state.masterTalents,
        masterAbilities: state.masterAbilities,
        assistantIds: state.assistantIds,
        ownedCharacters: state.ownedCharacters,
        nextCharacterId: state.nextCharacterId,
        economy: state.economy,
        league: state.league,
        weeklyStats: state.weeklyStats,
        playTime: state.playTime,
        saveCount: state.saveCount,
        dayReached: state.dayReached,
        achievements: state.achievements,
        clearedEndings: state.clearedEndings,
        // availableCharacters는 제외 (CSV에서 로드)
      }),
    }
  )
);
