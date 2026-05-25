/**
 * COM19 - 애널비즈
 * 도구 카테고리 - 애널비즈로 항문 자극
 */

import { TrainingCommand, SourceResult } from '../CommandBase';
import { TrainingContext } from '../../types';
import { Character } from '../../../../types/game';

export class Com19Command extends TrainingCommand {
  getName(): string {
    return '애널비즈';
  }

  getDescription(): string {
    return '애널비즈로 항문을 자극합니다';
  }

  isAvailable(): boolean {
    // 애널비즈 아이템 보유 필요 (ITEM:20) - ERB COM_ABLE19에서 확인됨
    if (!this.ctx.items || this.ctx.items[20] === undefined || this.ctx.items[20] <= 0) {
      return false;
    }

    // 하반신 노출 필수
    if (!this.bottomNaked()) {
      return false;
    }

    // 의식 필수
    if (this.character.cflags[16] === -1) {
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
    this.character.source[2] = source.pleasureA || 0;   // 쾌A
    this.character.source[6] = source.pain || 0;        // 고통
    this.character.source[13] = source.submission || 0; // 굴복

    // 메시지 표시
    await this.showTrainMessage();

    // 경험치 획득
    this.gainExperience();

    // BASE 업데이트
    this.ctx.base[0] += 60;   // C감각
    this.ctx.base[1] += 150;  // 욕망

    // 애널비즈 장착/해제 토글
    const wasEquipped = this.character.equipment[19] || 0;
    this.character.equipment[19] = wasEquipped ? 0 : 1;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};

    // 쾌A 계산 (A감각 기반)
    const aValues = [80, 250, 600, 1000, 1300, 1700];
    source.pleasureA = this.calculateAbilitySource(3, aValues);

    // 굴복 계산 (A감각 기반)
    const subValues = [300, 800, 1400, 1800, 2100, 2400];
    source.submission = this.calculateAbilitySource(3, subValues);

    // A경험에 따른 수정
    const aExp = this.ctx.exp[1] || 0;
    const expLevels = [100, 300, 700, 1500, 3000];

    if (aExp < expLevels[0]) {
      source.pleasureA! *= 0.5;
      source.pain = 2000;
    } else if (aExp < expLevels[1]) {
      source.pleasureA! *= 1.0;
      source.pain = 300;
    } else if (aExp < expLevels[2]) {
      source.pleasureA! *= 1.1;
      source.pain = 50;
    } else if (aExp < expLevels[3]) {
      source.pleasureA! *= 1.2;
      source.pain = 10;
    } else if (aExp < expLevels[4]) {
      source.pleasureA! *= 1.4;
      source.pain = 0;
    } else {
      source.pleasureA! *= 1.6;
      source.pain = 0;
    }

    // 윤활에 따른 수정
    const lubrication = this.ctx.params[3] || 0;
    const lubLevels = [200, 500, 1000, 1500];

    if (lubrication < lubLevels[0]) {
      source.pleasureA! *= 0.4;
      source.pain! += 1200;
    } else if (lubrication < lubLevels[1]) {
      source.pleasureA! *= 0.8;
      source.pain! += 700;
    } else if (lubrication < lubLevels[2]) {
      source.pleasureA! *= 1.0;
      source.pain! += 400;
    } else if (lubrication < lubLevels[3]) {
      source.pleasureA! *= 1.4;
      source.pain! += 150;
    } else {
      source.pleasureA! *= 1.8;
      source.pain! += 100;
    }

    // 욕정에 따른 수정
    const lust = this.ctx.params[5] || 0;
    const lustMultipliers = [0.8, 0.9, 1.0, 1.1, 1.2];
    const lustLevel = Math.min(4, Math.floor(lust / 200));
    source.pleasureA! *= lustMultipliers[lustLevel];

    // 종순에 따른 수정
    const obedience = this.getAbility(10);
    const obedienceMultipliers = [0.8, 0.9, 1.0, 1.1, 1.2, 1.3];
    source.pleasureA! *= obedienceMultipliers[Math.min(obedience, 5)];

    // 체구 소질
    if (this.hasTalent(99)) { // 큰 체구
      source.pain! *= 0.8;
    }

    if (this.hasTalent(100)) { // 작은 체형
      source.pain! *= 2.0;
    }

    if (this.hasTalent(135)) { // 미숙함
      source.pain! *= 2.0;
    }

    // A민감/둔감
    if (this.hasTalent(105)) { // A민감
      source.pain! *= 1.5;
      source.submission! *= 1.5;
    } else if (this.hasTalent(106)) { // A둔감
      source.pain! *= 0.6;
      source.submission! *= 0.6;
    }

    // 정조관념
    if (this.ctx.exp[0] === 0 && this.hasTalent(30)) {
      source.submission! /= 3;
    }

    // 장착 상태에 따른 보정
    const wasEquipped = this.character.equipment[19] || 0;
    if (!wasEquipped) {
      source.pleasureA! *= 0.8;
    } else {
      source.pleasureA! *= 3.0;
    }

    // 슬라임 아이템 효과
    if (this.ctx.items?.[212] >= 1 && !this.character.equipment[90]) {
      this.ctx.base[0] *= 0.8;
      this.ctx.base[1] *= 0.8;
      source.pleasureA! *= 1.2;
      source.pain! *= 0.8;
      source.submission! *= 1.2;
    }

    return source;
  }

  private async showTrainMessage(): Promise<void> {
    const aSense = this.getAbility(3);
    const aExp = this.ctx.exp[1] || 0;
    const wasEquipped = this.character.equipment[19] || 0;

    if (wasEquipped) {
      this.message('애널비즈를 천천히 뽑아낸다...');
    } else {
      this.message('애널비즈를 천천히 삽입한다...');
    }

    if (aExp === 0) {
      this.message('"으윽...! 아파...!!"');
    } else if (aSense === 0) {
      this.message('"으음...이상한 느낌..."');
    } else if (aSense <= 2) {
      this.message('"아...항문이...느껴져..."');
    } else if (aSense <= 4) {
      this.message('"으앗...! 뒤가...꽉 차...!!"');
    } else {
      this.message('"안돼...항문이...너무 민감해...!!"');
    }
  }

  private gainExperience(): void {
    // A경험
    const wasEquipped = this.character.equipment[19] || 0;
    if (!wasEquipped) {
      this.addExperience(1, 1);
    } else {
      this.addExperience(1, 2);
    }

    // 순결 경험치
    const playerVirgin = this.ctx.getTalent?.(122) === 0;
    const charVirgin = this.hasTalent(122);

    if (!charVirgin && !playerVirgin) {
      this.addExperience(40, 1);
    } else if (charVirgin && playerVirgin) {
      this.addExperience(41, 1);
    }
  }
}

/**
 * Factory function
 */
export async function com19(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  const command = new Com19Command(ctx, character);

  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }

  await command.execute();
}
