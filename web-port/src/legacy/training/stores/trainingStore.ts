import { create } from 'zustand';
import type {
  TrainingParameters,
  TrainingContext,
  CommandResult,
  TrainingResult,
  ParameterKey,
} from '../types';
import { eventBus, GameEvents } from '../../../core/EventBus';

interface TrainingState {
  // ========== 조교 상태 ==========
  isTraining: boolean;
  targetId: number | null;
  assistantId: number | null;

  // ========== 파라미터 (PALAM) ==========
  parameters: TrainingParameters;

  // ========== 임시 플래그 (TFLAG) ==========
  flags: Record<number, number>;

  // ========== 커맨드 히스토리 ==========
  commandHistory: Array<{
    commandId: number;
    commandName: string;
    result: CommandResult;
    timestamp: number;
  }>;

  // ========== 액션 ==========

  /**
   * 조교 시작
   */
  startTraining: (targetId: number, assistantId?: number) => void;

  /**
   * 조교 종료
   */
  endTraining: () => TrainingResult;

  /**
   * 파라미터 업데이트
   */
  updateParameter: (key: ParameterKey, value: number) => void;
  updateParameters: (params: Partial<TrainingParameters>) => void;

  /**
   * 플래그 설정
   */
  setFlag: (flagId: number, value: number) => void;
  getFlag: (flagId: number) => number;

  /**
   * 커맨드 기록 추가
   */
  addCommandHistory: (commandId: number, commandName: string, result: CommandResult) => void;

  /**
   * 초기화
   */
  reset: () => void;
}

const initialParameters: TrainingParameters = {
  쾌C: 0,
  쾌V: 0,
  쾌A: 0,
  쾌B: 0,
  윤활: 0,
  굴종: 0,
  욕정: 0,
  굴복: 0,
  습득: 0,
  수치심: 0,
  고통: 0,
  공포: 0,
  반감: 0,
  불쾌: 0,
  억울: 0,
};

export const useTrainingStore = create<TrainingState>((set, get) => ({
  // ========== 초기 상태 ==========
  isTraining: false,
  targetId: null,
  assistantId: null,
  parameters: { ...initialParameters },
  flags: {},
  commandHistory: [],

  // ========== 액션 구현 ==========

  startTraining: (targetId: number, assistantId?: number) => {
    set({
      isTraining: true,
      targetId,
      assistantId: assistantId ?? null,
      parameters: { ...initialParameters },
      flags: {},
      commandHistory: [],
    });

    // 이벤트 발생
    eventBus.emit(GameEvents.TRAINING_START, { targetId, assistantId });
  },

  endTraining: () => {
    const state = get();

    // 구슬 계산
    const juelGained = calculateJuel(state.parameters);
    const totalJuel = Object.values(juelGained).reduce((sum, val) => sum + val, 0);

    // 부정의 구슬 계산 (부정적 파라미터의 합)
    const negativeParams = ['고통', '공포', '반감', '불쾌', '억울'] as ParameterKey[];
    const negativeOffset = negativeParams.reduce(
      (sum, key) => sum + (juelGained[key] || 0),
      0
    );

    const result: TrainingResult = {
      juelGained,
      totalJuel,
      negativeOffset,
      expGained: {}, // TODO: 경험치 계산
      판매가능: false, // TODO: 판정 로직
      조수화가능: false, // TODO: 판정 로직
      summary: [],
    };

    // 상태 초기화
    set({
      isTraining: false,
      targetId: null,
      assistantId: null,
      parameters: { ...initialParameters },
      flags: {},
    });

    // 이벤트 발생
    eventBus.emit(GameEvents.TRAINING_END, result);

    return result;
  },

  updateParameter: (key: ParameterKey, value: number) => {
    set((state) => ({
      parameters: {
        ...state.parameters,
        [key]: Math.max(0, value), // 음수 방지
      },
    }));
  },

  updateParameters: (params: Partial<TrainingParameters>) => {
    set((state) => ({
      parameters: {
        ...state.parameters,
        ...params,
      },
    }));
  },

  setFlag: (flagId: number, value: number) => {
    set((state) => ({
      flags: {
        ...state.flags,
        [flagId]: value,
      },
    }));
  },

  getFlag: (flagId: number) => {
    return get().flags[flagId] || 0;
  },

  addCommandHistory: (commandId: number, commandName: string, result: CommandResult) => {
    set((state) => ({
      commandHistory: [
        ...state.commandHistory,
        {
          commandId,
          commandName,
          result,
          timestamp: Date.now(),
        },
      ],
    }));
  },

  reset: () => {
    set({
      isTraining: false,
      targetId: null,
      assistantId: null,
      parameters: { ...initialParameters },
      flags: {},
      commandHistory: [],
    });
  },
}));

// ============================================================================
// 유틸리티: 구슬 계산 (JUEL)
// ============================================================================

function calculateJuel(params: TrainingParameters): Partial<Record<ParameterKey, number>> {
  const juel: Partial<Record<ParameterKey, number>> = {};

  // PALAMLV 레벨 기준
  const L1 = 500_000;
  const L2 = 1_000_000;
  const L3 = 5_000_000;
  const L4 = 10_000_000;

  Object.entries(params).forEach(([key, value]) => {
    const paramKey = key as ParameterKey;
    let count = 0;

    // 레벨별 구슬 개수 계산
    if (value >= L4) count = 4;
    else if (value >= L3) count = 3;
    else if (value >= L2) count = 2;
    else if (value >= L1) count = 1;

    if (count > 0) {
      juel[paramKey] = count;
    }
  });

  return juel;
}
