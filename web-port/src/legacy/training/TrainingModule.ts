/**
 * TrainingModule - 조교 시스템의 메인 로직
 */

import { useGameStore } from '../../stores/gameStore';
import { useTrainingStore } from './stores/trainingStore';
import { commandRegistry } from './commands';
import type {
  TrainingContext,
  CommandResult,
  SourceValues,
  ParameterKey,
} from './types';
import { eventBus, GameEvents } from '../../core/EventBus';

export class TrainingModule {
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

    // 조수 확인 (옵션)
    if (assistantId !== undefined) {
      const assistant = gameStore.ownedCharacters.find((c) => c.id === assistantId);
      if (!assistant) {
        console.error('조수를 찾을 수 없습니다:', assistantId);
        return false;
      }
    }

    // 조교 시작
    trainingStore.startTraining(targetId, assistantId);

    return true;
  }

  /**
   * 커맨드 실행
   */
  static async executeCommand(commandId: number): Promise<CommandResult | null> {
    const gameStore = useGameStore.getState();
    const trainingStore = useTrainingStore.getState();

    if (!trainingStore.isTraining || !trainingStore.targetId) {
      console.error('조교 중이 아닙니다');
      return null;
    }

    // 커맨드 가져오기
    const command = commandRegistry[commandId];
    if (!command) {
      console.error('커맨드를 찾을 수 없습니다:', commandId);
      return null;
    }

    // 대상 캐릭터 가져오기
    const target = gameStore.ownedCharacters.find((c) => c.id === trainingStore.targetId);
    if (!target) {
      console.error('대상 캐릭터를 찾을 수 없습니다');
      return null;
    }

    // 조수 가져오기 (옵션)
    let assistant = undefined;
    if (trainingStore.assistantId) {
      assistant = gameStore.ownedCharacters.find((c) => c.id === trainingStore.assistantId);
    }

    // 컨텍스트 생성
    const context: TrainingContext = {
      target,
      targetId: target.id,
      assistant,
      assistantId: assistant?.id,
      parameters: { ...trainingStore.parameters },
      flags: { ...trainingStore.flags },
      equipment: {}, // TEQUIP - 토글 커맨드 상태
      charFlags: { 40: 0 }, // CFLAG - 의류 상태 (초기값: 벗은 상태)
      experience: {}, // EXP
      items: {}, // ITEM - TODO: gameStore에서 가져오기
      globalFlags: {}, // FLAG - TODO: gameStore에서 가져오기
      relation: 0, // RELATION - TODO: target에서 가져오기
      stain: {}, // STAIN - 오염 상태
      isAssistantPlay: false, // 조수 플레이 모드
      day: gameStore.day,
      time: 0, // TODO: 시간 시스템
    };

    // 가용성 체크
    if (!command.isAvailable(context)) {
      console.warn('커맨드를 실행할 수 없습니다:', command.name);
      return null;
    }

    // SOURCE 계산
    const source = command.calculateSource(context);

    // PALAM에 SOURCE 적용
    const parameterChanges = this.applySource(source, trainingStore.parameters);

    // 결과 생성
    const result: CommandResult = {
      success: true,
      source,
      parameterChanges,
      messages: [command.generateMessage?.(context) || `${command.name}을 실행했습니다.`],
      staminaLoss: command.staminaCost,
    };

    // PALAM 업데이트
    trainingStore.updateParameters(parameterChanges);

    // 히스토리 기록
    trainingStore.addCommandHistory(commandId, command.name, result);

    // 이벤트 발생
    eventBus.emit(GameEvents.TRAINING_COMMAND, { commandId, result });

    return result;
  }

  /**
   * SOURCE를 PALAM에 적용
   */
  private static applySource(
    source: SourceValues,
    currentParams: TrainingParameters
  ): Partial<TrainingParameters> {
    const changes: Partial<TrainingParameters> = {};

    Object.entries(source).forEach(([key, sourceValue]) => {
      const paramKey = key as ParameterKey;
      const currentValue = currentParams[paramKey] || 0;

      // SOURCE 값을 그대로 더함
      const newValue = Math.max(0, currentValue + sourceValue);

      if (newValue !== currentValue) {
        changes[paramKey] = newValue;
      }
    });

    return changes;
  }

  /**
   * 조교 종료
   */
  static endTraining(): TrainingResult {
    const trainingStore = useTrainingStore.getState();

    if (!trainingStore.isTraining) {
      throw new Error('조교 중이 아닙니다');
    }

    return trainingStore.endTraining();
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
    if (!target) return [];

    // 조수 가져오기 (옵션)
    let assistant = undefined;
    if (trainingStore.assistantId) {
      assistant = gameStore.ownedCharacters.find((c) => c.id === trainingStore.assistantId);
    }

    const context: TrainingContext = {
      target,
      targetId: target.id,
      assistant,
      assistantId: assistant?.id,
      parameters: trainingStore.parameters,
      flags: trainingStore.flags,
      equipment: {}, // TEQUIP
      charFlags: { 40: 0 }, // CFLAG
      experience: {}, // EXP
      items: {}, // ITEM
      globalFlags: {}, // FLAG
      relation: 0, // RELATION
      stain: {}, // STAIN
      isAssistantPlay: false,
      day: gameStore.day,
      time: 0,
    };

    return Object.keys(commandRegistry)
      .map(Number)
      .filter((id) => {
        const command = commandRegistry[id];
        return command && command.isAvailable(context);
      });
  }
}

// 타입 재export
export type { TrainingContext, CommandResult, TrainingResult } from './types';
