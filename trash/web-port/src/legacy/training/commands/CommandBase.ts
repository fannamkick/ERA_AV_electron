/**
 * Training Command Base Class
 * Provides common functionality for all training commands
 */

import { TrainingContext } from '../runtime/types';
import { Character } from '../../../types/game';
import { gameData } from '../../../data/loaderJSON';
import { MessageGenerator } from '../message/MessageGenerator';

/**
 * Source calculation result
 */
export interface SourceResult {
  /** 쾌C 증가량 (SOURCE:0) */
  pleasureC: number;
  /** 쾌V 증가량 (SOURCE:1) */
  pleasureV: number;
  /** 쾌A 증가량 (SOURCE:2) */
  pleasureA: number;
  /** 쾌B 증가량 (SOURCE:17) */
  pleasureB: number;
  /** 윤활 증가량 (SOURCE:3) */
  lubrication: number;
  /** 욕정 증가량 (SOURCE:5) */
  lust: number;
  /** 굴복 증가량 (SOURCE:4) */
  submission: number;
  /** 반감 증가량 (SOURCE:12) */
  antipathy: number;
  /** 고통 증가량 (SOURCE:6) */
  pain: number;
  /** 공포 증가량 (SOURCE:11/13) */
  fear: number;
  /** 테러 증가량 (SOURCE:13) */
  terror: number;
  /** 우울 증가량 (SOURCE:14) */
  depression: number;
  /** 애정 증가량 (SOURCE:7) */
  love: number;
  /** 안심 증가량 (SOURCE:8) */
  comfort: number;
  /** 습관 증가량 (SOURCE:16) */
  habit: number;
  /** 감도 증가량 */
  sensitivity?: number;
  /** 노출 증가량 */
  exposure?: number;
  /** 감각 증가량 */
  sensation?: number;
  /** 애정 증가량 */
  affection?: number;
  /** 쾌M 증가량 */
  pleasureM?: number;
  /** 수치 증가량 */
  shame?: number;
}

/**
 * Experience gain result
 */
export interface ExperienceGain {
  /** 경험치 ID */
  id: number;
  /** 증가량 */
  amount: number;
  /** 경험치 이름 */
  name?: string;
}

/**
 * Base class for training commands
 */
export abstract class TrainingCommand {
  protected ctx: TrainingContext;
  protected character: Character;

  constructor(ctx: TrainingContext, character: Character) {
    this.ctx = ctx;
    this.character = character;
  }

  /**
   * Execute the command
   */
  abstract execute(): Promise<void>;

  /**
   * Check if command is available
   */
  abstract isAvailable(): boolean;

  /**
   * Get command name
   */
  abstract getName(): string;

  /**
   * Get command description
   */
  abstract getDescription(): string;

  // ============================================================================
  // Helper Methods
  // ============================================================================

  /**
   * Get ability value with name lookup
   */
  protected getAbility(id: number): number {
    return this.ctx.abilities[id] || 0;
  }

  /**
   * Get ability name
   */
  protected getAbilityName(id: number): string {
    const ability = gameData.getAbility(id);
    return ability?.name || `Ability[${id}]`;
  }

  /**
   * Get parameter value with name lookup
   */
  protected getParameter(id: number): number {
    return this.ctx.params[id] || 0;
  }

  /**
   * Get parameter name
   */
  protected getParameterName(id: number): string {
    const parameter = gameData.getParameter(id);
    return parameter?.name || `Parameter[${id}]`;
  }

  /**
   * Check if character has talent
   */
  protected hasTalent(id: number): boolean {
    return this.ctx.talents.includes(id);
  }

  /**
   * Get talent name
   */
  protected getTalentName(id: number): string {
    const talent = gameData.getTalent(id);
    return talent?.name || `Talent[${id}]`;
  }

  /**
   * Calculate ability-based source value
   * @param abilityId Ability ID
   * @param values Source values for each ability level [0, 1, 2, 3, 4, 5+]
   */
  protected calculateAbilitySource(abilityId: number, values: number[]): number {
    const level = this.getAbility(abilityId);
    if (level >= values.length) {
      return values[values.length - 1];
    }
    return values[level];
  }

  /**
   * Apply source modifiers based on talents and conditions
   */
  protected applySourceModifiers(source: Partial<SourceResult>): Partial<SourceResult> {
    const result = { ...source };

    // 감도 소질 체크
    if (this.hasTalent(61)) { // 감도가 낮음
      if (result.lust) result.lust /= 4;
    }
    if (this.hasTalent(62)) { // 감도가 높음
      if (result.lust) result.lust *= 3;
    }

    // 프라이드 높음
    if (this.hasTalent(15)) {
      if (result.lust) result.lust *= 2;
    }

    // M기질
    if (this.hasTalent(85) && !this.ctx.assiPlay) {
      if (result.lubrication) result.lubrication *= 2;
      if (result.lust) result.lust /= 10;
    }

    return result;
  }

  /**
   * Add experience with logging
   */
  protected addExperience(id: number, amount: number): void {
    const name = this.getExperienceName(id);
    this.ctx.exp[id] = (this.ctx.exp[id] || 0) + amount;
    this.ctx.showMessage(`${name} +${amount}`);
  }

  /**
   * Get experience name
   */
  protected getExperienceName(id: number): string {
    return gameData.getExperienceName(id);
  }

  /**
   * Update parameter with display
   */
  protected updateParameter(id: number, delta: number): void {
    const name = this.getParameterName(id);
    const oldValue = this.getParameter(id);
    const newValue = oldValue + delta;

    this.ctx.params[id] = newValue;

    if (delta > 0) {
      this.ctx.showMessage(`${name} +${delta}`);
    } else if (delta < 0) {
      this.ctx.showMessage(`${name} ${delta}`);
    }
  }

  /**
   * Check clothing state
   */
  protected isNaked(): boolean {
    const clothing = this.character.cflag[40] || 0;
    return clothing === 0;
  }

  protected hasTop(): boolean {
    const clothing = this.character.cflag[40] || 0;
    return (clothing & 4) !== 0;
  }

  protected hasBottom(): boolean {
    const clothing = this.character.cflag[40] || 0;
    return (clothing & 16) !== 0;
  }

  protected topNaked(): boolean {
    const clothing = this.character.cflag[40] || 0;
    return (clothing & 6) === 0; // 상의(4) + 브라(2) 모두 벗음
  }

  protected bottomNaked(): boolean {
    const clothing = this.character.cflag[40] || 0;
    return (clothing & 17) === 0; // 하의(16) + 팬티(1) 모두 벗음
  }

  /**
   * Check if using assistant
   */
  protected isAssiPlay(): boolean {
    return this.ctx.assiPlay === 1;
  }

  /**
   * Show message
   */
  protected message(text: string): void {
    this.ctx.showMessage(text);
  }

  /**
   * Check virgin status
   */
  protected isVirgin(): boolean {
    return this.hasTalent(74); // 처녀
  }

  protected isAnalVirgin(): boolean {
    return this.hasTalent(76); // 애널처녀
  }

  /**
   * Remove virgin status
   */
  protected loseVirginity(): void {
    const index = this.ctx.talents.indexOf(74);
    if (index > -1) {
      this.ctx.talents.splice(index, 1);
      this.message('처녀를 잃었습니다...');
    }
  }

  protected loseAnalVirginity(): void {
    const index = this.ctx.talents.indexOf(76);
    if (index > -1) {
      this.ctx.talents.splice(index, 1);
      this.message('애널처녀를 잃었습니다...');
    }
  }

  /**
   * Generate and display training messages using MessageGenerator
   * @param commandId Command ID (0-92)
   */
  protected async generateTrainMessage(commandId: number): Promise<void> {
    const generator = new MessageGenerator(this.ctx, this.character, commandId);
    const messages = generator.generate();

    messages.forEach(msg => {
      this.ctx.showMessage(msg);
    });
  }
}
