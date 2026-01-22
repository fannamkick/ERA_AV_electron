/**
 * COM13 - 애널바이브
 * 애널바이브로 항문을 자극합니다
 */

import { TrainingCommand, SourceResult } from '../CommandBase';
import { TrainingContext } from '../../types';
import { Character } from '../../../../types/game';

export class Com13Command extends TrainingCommand {
  getName(): string {
    return '애널바이브';
  }

  getDescription(): string {
    return '애널바이브로 항문을 자극합니다';
  }

  isAvailable(): boolean {
    // 애널바이브 아이템 보유 필요 (ITEM:3)
    if (!this.ctx.items || this.ctx.items[3] === undefined || this.ctx.items[3] <= 0) {
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
    this.character.source[2] = source.pleasureA || 0;  // 쾌A
    this.character.source[13] = source.terror || 0;    // 공포
    this.character.source[6] = source.pain || 0;       // 고통
    this.character.source[14] = source.depression || 0;

    // 메시지 표시
    await this.showTrainMessage();

    // 경험치 획득
    this.gainExperience();

    // BASE 업데이트
    this.ctx.base[0] += 60;  // A감각
    this.ctx.base[1] += 150; // 욕망
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};

    // 쾌A 계산 (A감각 기반)
    const aValues = [80, 250, 600, 1000, 1300, 1700];
    source.pleasureA = this.calculateAbilitySource(3, aValues);

    // 공포 계산 (A감각 기반)
    const terrorValues = [300, 800, 1400, 1800, 2100, 2400];
    source.terror = this.calculateAbilitySource(3, terrorValues);

    source.depression = 300;

    // A경험에 따른 수정
    const aExp = this.ctx.exp[1] || 0;
    const aExpLevels = [100, 300, 700, 1500, 3000];

    if (aExp < aExpLevels[0]) {
      source.pleasureA! *= 0.5;
      source.pain = 2000;
      source.depression! += 200;
    } else if (aExp < aExpLevels[1]) {
      source.pleasureA! *= 1.0;
      source.pain = 300;
      source.depression! += 100;
    } else if (aExp < aExpLevels[2]) {
      source.pleasureA! *= 1.1;
      source.pain = 50;
      source.depression! += 50;
    } else if (aExp < aExpLevels[3]) {
      source.pleasureA! *= 1.2;
      source.pain = 10;
    } else if (aExp < aExpLevels[4]) {
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
      source.pain! += 800;
    } else if (lubrication < lubLevels[1]) {
      source.pleasureA! *= 0.8;
      source.pain! += 500;
    } else if (lubrication < lubLevels[2]) {
      source.pleasureA! *= 1.0;
      source.pain! += 300;
    } else if (lubrication < lubLevels[3]) {
      source.pleasureA! *= 1.4;
      source.pain! += 120;
    } else {
      source.pleasureA! *= 1.8;
      source.pain! += 100;
    }

    // 욕정에 따른 수정
    const lust = this.ctx.params[5] || 0;
    const lustLevels = [200, 500, 1000, 1500];

    if (lust < lustLevels[0]) {
      source.pleasureA! *= 0.8;
    } else if (lust < lustLevels[1]) {
      source.pleasureA! *= 0.9;
    } else if (lust < lustLevels[2]) {
      source.pleasureA! *= 1.0;
    } else if (lust < lustLevels[3]) {
      source.pleasureA! *= 1.1;
    } else {
      source.pleasureA! *= 1.2;
    }

    // 종순에 따른 수정
    const obedience = this.getAbility(10);
    const obedienceMultipliers = [0.8, 0.9, 1.0, 1.0, 1.0, 1.0];
    const depressionMultipliers = [2.0, 1.5, 1.0, 0.8, 0.6, 0.3];

    source.pleasureA! *= obedienceMultipliers[Math.min(obedience, 5)];
    source.depression! *= depressionMultipliers[Math.min(obedience, 5)];

    // 소질 기반 수정
    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);

    // 큰 체구
    if (this.hasTalent(99)) {
      source.pain! *= 0.8;
    }

    // 작은 체형
    if (this.hasTalent(100)) {
      source.pain! *= 2.0;
    }

    // 미숙함
    if (this.hasTalent(135)) {
      source.pain! *= 2.0;
    }

    // A민감
    if (this.hasTalent(105)) {
      source.pain! *= 1.5;
      source.terror! *= 1.5;
      source.depression! *= 1.5;
    } else if (this.hasTalent(106)) {
      // A둔감
      source.pain! *= 0.6;
      source.terror! *= 0.6;
      source.depression! *= 0.6;
    }

    return source;
  }

  private async showTrainMessage(): Promise<void> {
    const aSense = this.getAbility(3);
    const aExp = this.ctx.exp[1] || 0;

    this.message('애널바이브를 천천히 삽입한다...');

    if (aExp < 100) {
      this.message('"안돼...! 그건...너무...!!"');
    } else if (aSense === 0) {
      this.message('"으윽...! 이상해...!"');
    } else if (aSense <= 2) {
      this.message('"아...! 항문이...채워져..."');
    } else if (aSense <= 4) {
      this.message('"으아앗...! 안쪽까지...느껴져...!!"');
    } else {
      this.message('"안돼...항문만으로도...이렇게 느껴져...!!"');
    }

    // 반응 메시지
    if (this.character.source[2] >= 1500) {
      this.message('바이브레이션이 항문을 자극하며 몸을 떨게 한다...');
    }
  }

  private gainExperience(): void {
    // A감각에 따른 A경험
    const aSense = this.getAbility(3);
    let exp = 1;
    if (aSense <= 1) {
      exp = 1;
    } else if (aSense <= 4) {
      exp = 2;
    } else if (aSense <= 7) {
      exp = 3;
    } else {
      exp = 4;
    }
    this.addExperience(1, exp);

    // 레즈/호모 경험
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
export async function com13(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  const command = new Com13Command(ctx, character);

  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }

  await command.execute();
}
