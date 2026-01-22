import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GameState } from '../types/game';
import type { Character } from '../types/character';
import type { MasterCharacter } from '../types/master';
import { createMasterCharacter, MasterHelpers } from '../types/master';
import type { SaveData } from '../utils/saveSystem';
import { saveGame } from '../utils/saveSystem';

// 시간대 타입 (0: 오전, 1: 오후)
export type TimeOfDay = 0 | 1;

// 난이도 타입 (FLAG:5)
export type Difficulty = 1 | 2 | 3 | 4 | 9;
// 1: EASY, 2: NORMAL, 3: HARD, 4: POWERFUL, 9: EXTRA

interface GameStore extends GameState {
  // 시간 시스템
  time: TimeOfDay; // 0: 오전, 1: 오후

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
  time: 0, // 오전부터 시작
  money: 100000,
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
  endTurn: () => {
    const state = get();

    // ERB EVENT_TURNEND.ERB 기반
    // TIME == 1 (오후)면 다음날, TIME == 0 (오전)이면 오후로

    if (state.time === 1) {
      // 오후 → 다음날 오전
      console.log(`[TURNEND] Day ${state.day} 오후 → Day ${state.day + 1} 오전`);

      // TODO: 여기에 일일 이벤트 추가
      // - 창관 영업 결과 (YUUKAKU_RESULT)
      // - 임신 판정 (IN_VAGINA_EXTRA, CONCEPTION_CHECK_EXTRA)
      // - 일일 이벤트 (EVENT_NEXTDAY, EVENT_SCOUT)
      // - NTR 이벤트 (FLAG:540 체크)
      // - 아이돌/모델/클럽 이벤트
      // - 경험치 → 능력치 변환 (ADD_EXABL)
      // - 아르바이트/직업 처리

      set({
        day: state.day + 1,
        time: 0,
        dayReached: Math.max(state.dayReached, state.day + 1),
        flags: {
          ...state.flags,
          0: 0, // 휴식 플래그 해제 (FLAG:0)
        }
      });
    } else {
      // 오전 → 오후
      console.log(`[TURNEND] Day ${state.day} 오전 → Day ${state.day} 오후`);
      set({ time: 1 });
    }

    // 공통 처리 (오전/오후 모두)
    // - TARGET, ASSI 초기화 (게임 컨텍스트에서 처리)
    // - 체력/기력 회복 (RESTTIME)
    // - 판매가능/조수화 판정 (CHECK_SELLASSIABLE)
    // - 특수소질 획득 (CHECK_SPECIALSKIL)
    // - 임신 판정 (IN_VAGINA_ALL, CONCEPTION_CHECK_ALL)
    // - 위험일 계산 (OVULATION_CALC)
    // - 질 형상 변화 (VAGINAFORM_CHANGE)
    // - 음모 처리 (PUBLIC_HAIR)
    // - 자동 아이템 구매 (AUTO_BUYING)
    // - 엔딩 체크 (ENDING_CHECK)
    // - 실적 판정 (CHECK_ACHIEVEMENT)

    // 자동저장 (슬롯 0번을 자동저장 전용으로 사용)
    const updatedState = get();
    const gameState = updatedState.getSaveData();
    const metadata = updatedState.getMetadata();

    saveGame(0, gameState, metadata).then((success) => {
      if (success) {
        console.log('[AUTO-SAVE] 자동저장 완료 (슬롯 0)');
      } else {
        console.error('[AUTO-SAVE] 자동저장 실패');
      }
    }).catch((error) => {
      console.error('[AUTO-SAVE] 자동저장 오류:', error);
    });
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
      money: state.money,
      ownedCharacters: state.ownedCharacters,
      availableCharacters: state.availableCharacters,
      currentCharacter: state.currentCharacter,
      globalFlags: state.flags,
      items: state.items,
      achievements: state.achievements,
      clearedEndings: state.clearedEndings,
    };
  },

  loadSaveData: (data) => set({
    day: data.day,
    time: (data as any).time || 0, // 하위 호환성
    money: data.money,
    ownedCharacters: data.ownedCharacters,
    availableCharacters: data.availableCharacters,
    currentCharacter: data.currentCharacter,
    characters: data.ownedCharacters, // GameState 호환
    flags: data.globalFlags,
    items: data.items,
    achievements: data.achievements,
    clearedEndings: data.clearedEndings,
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
