/**
 * ImprovedTrainingModule - improved 커맨드를 사용하는 조교 시스템
 */

import { useGameStore } from '../../stores/gameStore';
import { useTrainingStore } from './stores/trainingStore';
import { TrainingContext, TrainingParameters } from './types';
import { gameData } from '../../data/loaderJSON';
import { executeSourceCheck } from './systems/SourceCheck';

// improved 커맨드 임포트 (통합 파일)
import * as improvedCommands from './commands/improved';

// 타입 정의
interface CommandExecutor {
  execute(): Promise<void>;
  isAvailable(): boolean;
  getName(): string;
}

// improved 커맨드 함수 맵핑 (executeCommand용)
const commandMap: Record<number, any> = {
  0: improvedCommands.com0,
  1: improvedCommands.com1,
  2: improvedCommands.com2,
  3: improvedCommands.com3,
  4: improvedCommands.com4,
  5: improvedCommands.com5,
  6: improvedCommands.com6,
  7: improvedCommands.com7,
  8: improvedCommands.com8,
  9: improvedCommands.com9,
  10: improvedCommands.com10,
  11: improvedCommands.com11,
  12: improvedCommands.com12,
  13: improvedCommands.com13,
  14: improvedCommands.com14,
  15: improvedCommands.com15,
  16: improvedCommands.com16,
  17: improvedCommands.com17,
  18: improvedCommands.com18,
  19: improvedCommands.com19,
  20: improvedCommands.com20,
  21: improvedCommands.com21,
  22: improvedCommands.com22,
  23: improvedCommands.com23,
  24: improvedCommands.com24,
  25: improvedCommands.com25,
  26: improvedCommands.com26,
  27: improvedCommands.com27,
  28: improvedCommands.com28,
  29: improvedCommands.com29,
  30: improvedCommands.com30,
  31: improvedCommands.com31,
  32: improvedCommands.com32,
  33: improvedCommands.com33,
  34: improvedCommands.com34,
  35: improvedCommands.com35,
  36: improvedCommands.com36,
  37: improvedCommands.com37,
  38: improvedCommands.com38,
  39: improvedCommands.com39,
  40: improvedCommands.com40,
  41: improvedCommands.com41,
  42: improvedCommands.com42,
  43: improvedCommands.com43,
  44: improvedCommands.com44,
  45: improvedCommands.com45,
  46: improvedCommands.com46,
  47: improvedCommands.com47,
  48: improvedCommands.com48,
  49: improvedCommands.com49,
  50: improvedCommands.com50,
  51: improvedCommands.com51,
  52: improvedCommands.com52,
  53: improvedCommands.com53,
  54: improvedCommands.com54,
  55: improvedCommands.com55,
  56: improvedCommands.com56,
  57: improvedCommands.com57,
  58: improvedCommands.com58,
  59: improvedCommands.com59,
  60: improvedCommands.com60,
  61: improvedCommands.com61,
  62: improvedCommands.com62,
  63: improvedCommands.com63,
  64: improvedCommands.com64,
  65: improvedCommands.com65,
  66: improvedCommands.com66,
  67: improvedCommands.com67,
  68: improvedCommands.com68,
  69: improvedCommands.com69,
  70: improvedCommands.com70,
  71: improvedCommands.com71,
  72: improvedCommands.com72,
  73: improvedCommands.com73,
  74: improvedCommands.com74,
  75: improvedCommands.com75,
  76: improvedCommands.com76,
  77: improvedCommands.com77,
  78: improvedCommands.com78,
  79: improvedCommands.com79,
  80: improvedCommands.com80,
  81: improvedCommands.com81,
  82: improvedCommands.com82,
  83: improvedCommands.com83,
  84: improvedCommands.com84,
  85: improvedCommands.com85,
  86: improvedCommands.com86,
  87: improvedCommands.com87,
  88: improvedCommands.com88,
  89: improvedCommands.com89,
  90: improvedCommands.com90,
  91: improvedCommands.com91,
  92: improvedCommands.com92,
};

// improved 커맨드 클래스 맵핑 (isAvailable 체크용)
const commandClassMap: Record<number, any> = {
  0: improvedCommands.Com0Command,
  1: improvedCommands.Com1Command,
  2: improvedCommands.Com2Command,
  3: improvedCommands.Com3Command,
  4: improvedCommands.Com4Command,
  5: improvedCommands.Com5Command,
  6: improvedCommands.Com6Command,
  7: improvedCommands.Com7Command,
  8: improvedCommands.Com8Command,
  9: improvedCommands.Com9Command,
  10: improvedCommands.Com10Command,
  11: improvedCommands.Com11Command,
  12: improvedCommands.Com12Command,
  13: improvedCommands.Com13Command,
  14: improvedCommands.Com14Command,
  15: improvedCommands.Com15Command,
  16: improvedCommands.Com16Command,
  17: improvedCommands.Com17Command,
  18: improvedCommands.Com18Command,
  19: improvedCommands.Com19Command,
  20: improvedCommands.Com20Command,
  21: improvedCommands.Com21Command,
  22: improvedCommands.Com22Command,
  23: improvedCommands.Com23Command,
  24: improvedCommands.Com24Command,
  25: improvedCommands.Com25Command,
  26: improvedCommands.Com26Command,
  27: improvedCommands.Com27Command,
  28: improvedCommands.Com28Command,
  29: improvedCommands.Com29Command,
  30: improvedCommands.Com30Command,
  31: improvedCommands.Com31Command,
  32: improvedCommands.Com32Command,
  33: improvedCommands.Com33Command,
  34: improvedCommands.Com34Command,
  35: improvedCommands.Com35Command,
  36: improvedCommands.Com36Command,
  37: improvedCommands.Com37Command,
  38: improvedCommands.Com38Command,
  39: improvedCommands.Com39Command,
  40: improvedCommands.Com40Command,
  41: improvedCommands.Com41Command,
  42: improvedCommands.Com42Command,
  43: improvedCommands.Com43Command,
  44: improvedCommands.Com44Command,
  45: improvedCommands.Com45Command,
  46: improvedCommands.Com46Command,
  47: improvedCommands.Com47Command,
  48: improvedCommands.Com48Command,
  49: improvedCommands.Com49Command,
  50: improvedCommands.Com50Command,
  51: improvedCommands.Com51Command,
  52: improvedCommands.Com52Command,
  53: improvedCommands.Com53Command,
  54: improvedCommands.Com54Command,
  55: improvedCommands.Com55Command,
  56: improvedCommands.Com56Command,
  57: improvedCommands.Com57Command,
  58: improvedCommands.Com58Command,
  59: improvedCommands.Com59Command,
  60: improvedCommands.Com60Command,
  61: improvedCommands.Com61Command,
  62: improvedCommands.Com62Command,
  63: improvedCommands.Com63Command,
  64: improvedCommands.Com64Command,
  65: improvedCommands.Com65Command,
  66: improvedCommands.Com66Command,
  67: improvedCommands.Com67Command,
  68: improvedCommands.Com68Command,
  69: improvedCommands.Com69Command,
  70: improvedCommands.Com70Command,
  71: improvedCommands.Com71Command,
  72: improvedCommands.Com72Command,
  73: improvedCommands.Com73Command,
  74: improvedCommands.Com74Command,
  75: improvedCommands.Com75Command,
  76: improvedCommands.Com76Command,
  77: improvedCommands.Com77Command,
  78: improvedCommands.Com78Command,
  79: improvedCommands.Com79Command,
  80: improvedCommands.Com80Command,
  81: improvedCommands.Com81Command,
  82: improvedCommands.Com82Command,
  83: improvedCommands.Com83Command,
  84: improvedCommands.Com84Command,
  85: improvedCommands.Com85Command,
  86: improvedCommands.Com86Command,
  87: improvedCommands.Com87Command,
  88: improvedCommands.Com88Command,
  89: improvedCommands.Com89Command,
  90: improvedCommands.Com90Command,
  91: improvedCommands.Com91Command,
  92: improvedCommands.Com92Command,
};

/**
 * TrainingParameters를 숫자 인덱스 배열로 변환
 */
function convertParametersToArray(params: TrainingParameters): Record<number, number> {
  return {
    0: params.쾌C || 0,
    1: params.쾌V || 0,
    2: params.쾌A || 0,
    17: params.쾌B || 0,  // 쾌B는 17번
    3: params.윤활 || 0,
    4: params.굴복 || 0,
    5: params.욕정 || 0,
    6: params.고통 || 0,
    7: 0,  // 애정
    8: 0,  // 안심
    9: params.고통 || 0,  // 동일하게 사용
    10: 0, // 기타
    11: params.공포 || 0,
    12: 0, // 반감
    13: params.공포 || 0,  // terror
    14: params.억울 || 0,  // depression
    15: 0,
    16: 0, // habit
  };
}

/**
 * 숫자 인덱스 배열을 TrainingParameters로 변환
 */
function convertArrayToParameters(arr: Record<number, number>): Partial<TrainingParameters> {
  return {
    쾌C: arr[0] || 0,
    쾌V: arr[1] || 0,
    쾌A: arr[2] || 0,
    쾌B: arr[17] || 0,
    윤활: arr[3] || 0,
    굴복: arr[4] || 0,
    욕정: arr[5] || 0,
    고통: arr[6] || 0,
    공포: arr[11] || 0,
    억울: arr[14] || 0,
  };
}

/**
 * items 객체를 숫자 인덱스 배열로 변환
 */
function convertItemsToArray(items: Record<string, number>): Record<number, number> {
  const result: Record<number, number> = {};
  Object.entries(items).forEach(([key, value]) => {
    const numKey = parseInt(key, 10);
    if (!isNaN(numKey)) {
      result[numKey] = value;
    }
  });
  return result;
}

export class ImprovedTrainingModule {
  /**
   * 조교 시작
   */
  static startTraining(targetId: number, assistantId?: number): boolean {
    const gameStore = useGameStore.getState();
    const trainingStore = useTrainingStore.getState();

    // 대상 캐릭터 확인
    const target = gameStore.ownedCharacters.find((c) => c.id === targetId);
    if (!target) {
      console.error('조교 대상을 찾을 수 없습니다:', targetId);
      return false;
    }

    // 조교 시작
    trainingStore.startTraining(targetId, assistantId);

    return true;
  }

  /**
   * 사용 가능한 커맨드 목록
   */
  static getAvailableCommands(): number[] {
    const trainingStore = useTrainingStore.getState();
    const gameStore = useGameStore.getState();

    if (!trainingStore.isTraining || !trainingStore.targetId) {
      return [];
    }

    const target = gameStore.ownedCharacters.find((c) => c.id === trainingStore.targetId);
    if (!target) {
      return [];
    }

    // Character에 ERB 스타일 변수 필드 초기화 (없으면 생성)
    if (!(target as any).cflags) (target as any).cflags = {};
    if (!(target as any).equipment) (target as any).equipment = {};
    if (!(target as any).source) (target as any).source = {};
    if (!(target as any).stain) (target as any).stain = {};
    if (!(target as any).talents) (target as any).talents = target.talent || [];
    if (!(target as any).abilities) (target as any).abilities = {};
    if (!(target as any).experience) (target as any).experience = {};
    if (!(target as any).base) (target as any).base = {};

    // TrainingContext 생성 (간소화 버전, isAvailable 체크용)
    // NOTE: training 모듈 리팩터링 전까지 타입 체크 완화
    const ctx = {
      target: target as any,
      targetId: target.id,
      params: convertParametersToArray(trainingStore.parameters),
      abilities: (target as any).abilities || [],
      talents: (target as any).talents || [],
      base: (target as any).base || [],
      exp: (target as any).experience || [],
      charFlags: (target as any).cflags || {},
      equipment: (target as any).equipment || {},
      items: convertItemsToArray(gameStore.items),
      flags: {},
      stain: (target as any).stain || [],
      playerStain: [],
      source: (target as any).source || [],
      saveStr: [],
      assiPlay: 0,
      assiAbilities: [],
      isAssistantPlay: false,
      day: gameStore.day,
      time: 0,
      showMessage: () => {},
      getTalent: (id: number) => ((target as any).talents?.includes(id) ? 1 : 0),
      getVarName: (type: string, id: number) => {
        if (type === 'EXP') {
          return gameData.getExperienceName(id);
        }
        return `${type}[${id}]`;
      },
      getString: (key: string) => key,
    } as unknown as TrainingContext;

    // 각 커맨드의 isAvailable() 체크
    const availableCommands: number[] = [];

    for (const [commandId, CommandClass] of Object.entries(commandClassMap)) {
      try {
        const command = new CommandClass(ctx, target);
        if (command.isAvailable && command.isAvailable()) {
          availableCommands.push(Number(commandId));
        }
      } catch (error) {
        console.warn(`커맨드 ${commandId} 가용성 체크 중 오류:`, error);
      }
    }

    return availableCommands;
  }

  /**
   * 커맨드 실행
   */
  static async executeCommand(commandId: number): Promise<{ messages: string[] } | null> {
    const gameStore = useGameStore.getState();
    const trainingStore = useTrainingStore.getState();

    if (!trainingStore.isTraining || !trainingStore.targetId) {
      console.error('조교 중이 아닙니다');
      return null;
    }

    // 커맨드 함수 가져오기
    const commandFunc = commandMap[commandId];
    if (!commandFunc) {
      console.warn(`커맨드 ${commandId}는 아직 구현되지 않았습니다`);
      return { messages: ['이 커맨드는 아직 구현되지 않았습니다.'] };
    }

    // 대상 캐릭터 가져오기
    const target = gameStore.ownedCharacters.find((c) => c.id === trainingStore.targetId);
    if (!target) {
      console.error('대상 캐릭터를 찾을 수 없습니다');
      return null;
    }

    // Character에 ERB 스타일 변수 필드 초기화 (없으면 생성)
    if (!(target as any).cflags) (target as any).cflags = {};
    if (!(target as any).equipment) (target as any).equipment = {};
    if (!(target as any).source) (target as any).source = {};
    if (!(target as any).stain) (target as any).stain = {};
    if (!(target as any).talents) (target as any).talents = target.talent || [];
    if (!(target as any).abilities) (target as any).abilities = {};
    if (!(target as any).experience) (target as any).experience = {};
    if (!(target as any).base) (target as any).base = {};

    // 메시지 수집용 배열
    const messages: string[] = [];

    // TrainingContext 생성
    // NOTE: training 모듈 리팩터링 전까지 타입 체크 완화
    const ctx = {
      // 기본 정보
      target: target as any,
      targetId: target.id,

      // 파라미터 (숫자 인덱스 배열로 변환)
      params: convertParametersToArray(trainingStore.parameters),
      abilities: (target as any).abilities || [],
      talents: (target as any).talents || [],
      base: (target as any).base || [],
      exp: (target as any).experience || [],

      // 플래그
      charFlags: (target as any).cflags || {},
      equipment: (target as any).equipment || {},
      items: convertItemsToArray(gameStore.items),
      flags: {},

      // 상태
      stain: (target as any).stain || [],
      playerStain: [],
      source: (target as any).source || [],

      // 메타
      saveStr: [],
      assiPlay: 0,
      assiAbilities: [],
      isAssistantPlay: false,
      day: gameStore.day,
      time: 0,

      // 메시지 수집
      showMessage: (msg: string) => {
        messages.push(msg);
      },

      // 유틸리티
      getTalent: (id: number) => ((target as any).talents?.includes(id) ? 1 : 0),
      getVarName: (type: string, id: number) => {
        if (type === 'EXP') {
          return gameData.getExperienceName(id);
        }
        return `${type}[${id}]`;
      },
      getString: (key: string) => key,
    } as unknown as TrainingContext;

    try {
      // 커맨드 실행
      await commandFunc(ctx, target);

      // SOURCE_CHECK 실행 (절정/기절 처리)
      await executeSourceCheck(ctx, target);

      // 파라미터 업데이트 (숫자 배열을 다시 TrainingParameters로 변환)
      const updatedParams = convertArrayToParameters(ctx.params);
      trainingStore.updateParameters(updatedParams);

      // 히스토리 기록
      trainingStore.addCommandHistory(commandId, `Command ${commandId}`, {
        success: true,
        source: ctx.source || {},
        parameterChanges: {},
        messages,
      } as any);

      return { messages };
    } catch (error) {
      console.error('커맨드 실행 중 오류:', error);
      return { messages: ['커맨드 실행 중 오류가 발생했습니다.'] };
    }
  }

  /**
   * 조교 종료
   */
  static endTraining(): { totalJuel: number; negativeOffset: number } {
    const trainingStore = useTrainingStore.getState();
    trainingStore.endTraining();

    // TODO: 구슬 계산 로직
    return {
      totalJuel: 0,
      negativeOffset: 0,
    };
  }
}
