/**
 * COM23 - 배면좌위
 * 삽입 카테고리 - 배면좌위 체위로 성교
 */

import { TrainingCommand, SourceResult } from '../CommandBase';
import { TrainingContext } from '../../types';
import { Character } from '../../../../types/game';

export class Com23Command extends TrainingCommand {
  getName(): string {
    return '배면좌위';
  }

  getDescription(): string {
    return '배면좌위 체위로 성교합니다';
  }

  isAvailable(): boolean {
    // 하반신 노출 필수
    if (!this.bottomNaked()) {
      return false;
    }

    // 의식 필수
    if (this.character.cflags[16] === -1) {
      return false;
    }

    // 정조대 착용 시 불가
    if (this.character.cflags[42] === 79) {
      return false;
    }

    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();

    // SOURCE 계산
    const source = this.calculateSource();

    // Character source에 적용
    this.character.source[0] = source.pleasureC || 0;   // 쾌C
    this.character.source[1] = source.pleasureV || 0;   // 쾌V
    this.character.source[17] = source.pleasureB || 0;  // 쾌B
    this.character.source[3] = source.lubrication || 0; // 윤활
    this.character.source[6] = source.pain || 0;        // 고통
    this.character.source[10] = source.affection || 0;  // 애정
    this.character.source[12] = 200;
    this.character.source[15] = source.depression || 0; // 반감

    // 메시지 표시
    await this.showTrainMessage();

    // 경험치 획득
    this.gainExperience();

    // BASE 업데이트
    const vSense = this.getAbility(2);
    const baseC = Math.max(10, 20 - vSense * 3);
    const baseV = Math.max(10, 150 - vSense * 2);

    this.ctx.base[0] += baseC;
    this.ctx.base[1] += baseV;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};

    // 쾌V 계산 (V감각 기반)
    const vValues = [50, 150, 300, 600, 1000, 1500];
    source.pleasureV = this.calculateAbilitySource(2, vValues);

    // 윤활 계산
    const lubValues = [50, 100, 200, 300, 500, 700];
    source.lubrication = this.calculateAbilitySource(2, lubValues);

    // 쾌B 계산 (B감각 기반)
    const bValues = [50, 200, 500, 800, 1300, 1800];
    source.pleasureB = this.calculateAbilitySource(1, bValues);

    // B감각에 의한 윤활 추가
    const bLubValues = [50, 200, 400, 600, 1000, 1400];
    source.lubrication! += this.calculateAbilitySource(1, bLubValues);

    // 쾌C 계산 (C감각 기반)
    const cValues = [40, 160, 500, 900, 1400, 2100];
    source.pleasureC = this.calculateAbilitySource(0, cValues);

    // V경험에 따른 수정
    const vExp = this.ctx.exp[0] || 0;
    const expLevels = [100, 300, 700, 1500, 3000];

    if (vExp < expLevels[0]) {
      source.pleasureV! *= 0.2;
      source.pain = 3000;
    } else if (vExp < expLevels[1]) {
      source.pleasureV! *= 0.6;
      source.pain = 240;
    } else if (vExp < expLevels[2]) {
      source.pleasureV! *= 1.0;
      source.pain = 30;
    } else if (vExp < expLevels[3]) {
      source.pleasureV! *= 1.2;
      source.pain = 5;
    } else if (vExp < expLevels[4]) {
      source.pleasureV! *= 1.4;
      source.pain = 0;
    } else {
      source.pleasureV! *= 1.6;
      source.pain = 0;
    }

    // 윤활에 따른 수정
    const lubrication = this.ctx.params[3] || 0;
    const lubLevels = [200, 500, 1000, 1500];

    if (lubrication < lubLevels[0]) {
      source.pleasureV! *= 0.4;
      source.pain! += 600;
      source.pain! *= 2.6;
    } else if (lubrication < lubLevels[1]) {
      source.pleasureV! *= 0.7;
      source.pain! += 180;
    } else if (lubrication < lubLevels[2]) {
      source.pleasureV! *= 1.0;
      source.pain! *= 0.5;
    } else if (lubrication < lubLevels[3]) {
      source.pleasureV! *= 1.2;
      source.pain! *= 0.2;
    } else {
      source.pleasureV! *= 1.6;
      source.pain! *= 0.1;
    }

    // 정조관념
    if (this.hasTalent(30)) {
      if (vExp === 0) {
        source.lubrication! *= 0.6;
        source.depression = 10000;
      } else {
        source.lubrication! *= 0.6;
        source.depression = 1000;
      }
    } else if (this.hasTalent(31)) {
      if (vExp === 0) {
        source.lubrication! *= 0.6;
        source.depression = 300;
      }
    } else {
      if (vExp === 0) {
        source.depression = 3000;
      }
    }

    // 욕정에 따른 수정
    const lust = this.ctx.params[5] || 0;
    const lustLevels = [200, 500, 1000, 1500];

    if (lust < lustLevels[0]) {
      source.pleasureV! *= 0.8;
      source.pleasureC! *= 0.8;
      source.lubrication! *= 0.6;
    } else if (lust < lustLevels[1]) {
      source.pleasureV! *= 1.0;
      source.pleasureC! *= 1.0;
      source.lubrication! *= 1.0;
    } else if (lust < lustLevels[2]) {
      source.pleasureV! *= 1.2;
      source.pleasureC! *= 1.1;
      source.lubrication! *= 1.5;
    } else if (lust < lustLevels[3]) {
      source.pleasureV! *= 1.4;
      source.pleasureC! *= 1.2;
      source.lubrication! *= 2.0;
    } else {
      source.pleasureV! *= 1.6;
      source.pleasureC! *= 1.3;
      source.lubrication! *= 2.6;
    }

    // 종순에 따른 수정
    const obedience = this.getAbility(10);
    const obedienceVMultipliers = [1.5, 1.5, 1.5, 1.8, 2.1, 2.5];
    const obedienceLubMultipliers = [1.0, 1.3, 1.5, 1.9, 2.2, 2.6];
    const obedienceDepMultipliers = [2.0, 1.8, 1.6, 1.4, 1.2, 1.0];

    source.pleasureV! *= obedienceVMultipliers[Math.min(obedience, 5)];
    source.lubrication! *= obedienceLubMultipliers[Math.min(obedience, 5)];
    if (source.depression) {
      source.depression *= obedienceDepMultipliers[Math.min(obedience, 5)];
    }

    // 플레이어 기교에 따른 윤활 및 애정
    const playerSkill = this.ctx.getAbility?.(12) || 0;
    const skillLubValues = [100, 150, 200, 300, 500, 800];
    const skillAffValues = [0, 50, 100, 150, 250, 400];

    source.lubrication! += skillLubValues[Math.min(playerSkill, 5)];
    source.affection = skillAffValues[Math.min(playerSkill, 5)];

    // 소질 기반 수정
    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);

    // 체구 소질
    if (this.hasTalent(99)) {
      source.pain! *= 0.8;
    }

    if (this.hasTalent(100)) {
      source.pain! *= 2.0;
    }

    if (this.hasTalent(135)) {
      source.pain! *= 4.0;
    }

    // 애 소질
    if (this.hasTalent(85)) {
      source.lubrication! *= 2.0;
    }

    return source;
  }

  private async showTrainMessage(): Promise<void> {
    const vSense = this.getAbility(2);
    const vExp = this.ctx.exp[0] || 0;

    this.message('배면좌위 체위로 천천히 삽입한다...');

    if (vExp === 0) {
      this.message('"으윽...! 아파...!!"');
      this.message('처음의 고통에 몸을 떤다...');
    } else if (vSense === 0) {
      this.message('"으음...꽉 차는 느낌..."');
    } else if (vSense <= 2) {
      this.message('"아...안이...느껴져..."');
    } else if (vSense <= 4) {
      this.message('"으아앗...! 안쪽까지...!!"');
    } else {
      this.message('"안돼...너무 깊이...느껴져...!!"');
    }
  }

  private gainExperience(): void {
    // V경험
    const vExp = this.ctx.exp[0] || 0;
    if (vExp === 0) {
      this.addExperience(0, 5);
    } else {
      this.addExperience(0, 2);
    }

    // 레즈/호모 경험
    const playerVirgin = this.ctx.getTalent?.(122) === 0;
    const charVirgin = this.hasTalent(122);

    if (!charVirgin && !playerVirgin) {
      this.addExperience(40, 3);
    } else if (charVirgin && playerVirgin) {
      this.addExperience(41, 3);
    }

    // 애정 경험
    if (this.character.cflags[2] >= 1000 && !this.isAssiPlay()) {
      this.addExperience(23, 2);
    }
  }
}

/**
 * Factory function
 */
export async function com23(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  const command = new Com23Command(ctx, character);

  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }

  await command.execute();
}
