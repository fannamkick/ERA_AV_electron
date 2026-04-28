/**
 * 커맨드 실행기
 * 변환된 ERB 커맨드를 실제로 실행
 */

import { TrainingRuntime, CharacterRuntime } from './TrainingRuntime';
import type { TrainingContext, Character } from './types';

export class CommandExecutor {
  private ctx: TrainingRuntime;
  private character: CharacterRuntime;

  constructor() {
    this.ctx = new TrainingRuntime();
    this.character = new CharacterRuntime(0, '테스트 캐릭터');
  }

  /**
   * 커맨드 실행
   */
  async executeCommand(commandFn: (ctx: TrainingContext, char: Character) => Promise<void>): Promise<CommandExecutionResult> {
    // 메시지 초기화
    this.ctx.clearMessages();
    this.ctx.clearButtons();
    this.character.resetSource();

    // 커맨드 실행
    try {
      await commandFn(this.ctx, this.character);

      return {
        success: true,
        messages: this.ctx.getMessages(),
        buttons: this.ctx.getButtons(),
        source: [...this.character.source],
        context: this.ctx,
        character: this.character,
      };
    } catch (error) {
      console.error('커맨드 실행 오류:', error);
      return {
        success: false,
        messages: [`오류 발생: ${error}`],
        buttons: [],
        source: [],
        context: this.ctx,
        character: this.character,
        error: error instanceof Error ? error : new Error(String(error)),
      };
    }
  }

  /**
   * 컨텍스트 초기화
   */
  resetContext(): void {
    this.ctx = new TrainingRuntime();
    this.character.resetSource();
  }

  /**
   * 컨텍스트 가져오기
   */
  getContext(): TrainingRuntime {
    return this.ctx;
  }

  /**
   * 캐릭터 가져오기
   */
  getCharacter(): CharacterRuntime {
    return this.character;
  }

  /**
   * 특정 능력치 설정 (테스트용)
   */
  setAbility(index: number, value: number): void {
    this.ctx.abilities[index] = value;
  }

  /**
   * 특정 재능 설정 (테스트용)
   */
  setTalent(index: number, value: number): void {
    this.ctx.talents[index] = value;
  }

  /**
   * 특정 플래그 설정 (테스트용)
   */
  setFlag(index: number, value: number): void {
    this.ctx.flags[index] = value;
  }
}

export interface CommandExecutionResult {
  success: boolean;
  messages: string[];
  buttons: Array<{ label: string; value: number }>;
  source: number[];
  context: TrainingRuntime;
  character: CharacterRuntime;
  error?: Error;
}
