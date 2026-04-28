/**
 * COM20 - 정상위
 * 정상위 체위로 성교합니다
 */

import { TrainingCommand, SourceResult } from '../CommandBase';
import { TrainingContext } from '../../types';
import { Character } from '../../../../types/game';

export class Com20Command extends TrainingCommand {
  getName(): string {
    return '정상위';
  }

  getDescription(): string {
    return '정상위 체위로 성교합니다';
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
    this.character.source[1] = source.pleasureV || 0;   // 쾌V
    this.character.source[3] = source.lubrication || 0; // 윤활
    this.character.source[6] = source.pain || 0;        // 고통
    this.character.source[12] = 400;
    this.character.source[15] = source.depression || 0; // 반감

    // 메시지 표시
    await this.showTrainMessage();

    // 경험치 획득
    this.gainExperience();

    // BASE 업데이트
    const vSense = this.getAbility(2);
    const baseC = Math.max(10, 100 - vSense * 3);
    const baseV = Math.max(10, 50 - vSense * 2);

    this.ctx.base[0] += baseC;  // C감각 (V감각에 따라 감소)
    this.ctx.base[1] += baseV;  // 욕망
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};

    // 쾌V 계산 (V감각 기반)
    const vValues = [40, 150, 400, 1000, 1700, 2200];
    source.pleasureV = this.calculateAbilitySource(2, vValues);

    // 윤활 계산 (V감각 기반)
    const lubValues = [150, 250, 350, 500, 700, 1000];
    source.lubrication = this.calculateAbilitySource(2, lubValues);

    // V경험에 따른 수정
    const vExp = this.ctx.exp[0] || 0;
    const vExpLevels = [100, 300, 700, 1500, 3000];

    if (vExp < vExpLevels[0]) {
      source.pleasureV! *= 0.2;
      source.pain = 5500;
    } else if (vExp < vExpLevels[1]) {
      source.pleasureV! *= 0.6;
      source.pain = 300;
    } else if (vExp < vExpLevels[2]) {
      source.pleasureV! *= 1.0;
      source.pain = 50;
    } else if (vExp < vExpLevels[3]) {
      source.pleasureV! *= 1.2;
      source.pain = 10;
    } else if (vExp < vExpLevels[4]) {
      source.pleasureV! *= 1.3;
      source.pain = 0;
    } else {
      source.pleasureV! *= 1.8;
      source.pain = 0;
    }

    // 윤활에 따른 수정
    const lubrication = this.ctx.params[3] || 0;
    const lubLevels = [200, 500, 1000, 1500];

    if (lubrication < lubLevels[0]) {
      source.pleasureV! *= 0.1;
      source.pain! += 1000;
      source.pain! *= 3.0;
    } else if (lubrication < lubLevels[1]) {
      source.pleasureV! *= 0.4;
      source.pain! += 300;
      source.pain! *= 1.0;
    } else if (lubrication < lubLevels[2]) {
      source.pleasureV! *= 1.0;
      source.pain! *= 0.5;
    } else if (lubrication < lubLevels[3]) {
      source.pleasureV! *= 1.4;
      source.pain! *= 0.2;
    } else {
      source.pleasureV! *= 1.8;
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
      // 정조무관심
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
      source.pleasureV! *= 0.6;
      source.lubrication! *= 0.3;
    } else if (lust < lustLevels[1]) {
      source.pleasureV! *= 0.8;
      source.lubrication! *= 0.6;
    } else if (lust < lustLevels[2]) {
      source.pleasureV! *= 1.0;
      source.lubrication! *= 1.0;
    } else if (lust < lustLevels[3]) {
      source.pleasureV! *= 1.2;
      source.lubrication! *= 1.5;
    } else {
      source.pleasureV! *= 1.5;
      source.lubrication! *= 1.8;
    }

    // 종순에 따른 수정
    const obedience = this.getAbility(10);
    const obedienceVMultipliers = [0.5, 0.8, 1.0, 1.3, 1.6, 2.0];
    const obedienceLubMultipliers = [0.6, 0.8, 1.0, 1.2, 1.4, 1.6];
    const obedienceDepMultipliers = [2.0, 1.5, 1.0, 0.8, 0.6, 0.3];

    source.pleasureV! *= obedienceVMultipliers[Math.min(obedience, 5)];
    source.lubrication! *= obedienceLubMultipliers[Math.min(obedience, 5)];
    if (source.depression) {
      source.depression *= obedienceDepMultipliers[Math.min(obedience, 5)];
    }

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
      source.pain! *= 4.0;
    }

    return source;
  }

  private async showTrainMessage(): Promise<void> {
    const vSense = this.getAbility(2);
    const vExp = this.ctx.exp[0] || 0;

    this.message('정상위 체위로 천천히 삽입한다...');

    if (vExp === 0) {
      this.message('"아...아파...!!"');
      this.message('처음의 고통에 몸을 떤다...');
    } else if (vSense === 0) {
      this.message('"으음...가득 차는 느낌..."');
    } else if (vSense <= 2) {
      this.message('"아...안이...느껴져..."');
    } else if (vSense <= 4) {
      this.message('"으아앗...! 안쪽까지...꽉 차...!!"');
    } else {
      this.message('"안돼...이렇게 격렬하게...느껴져...!!"');
    }

    // 반응 메시지
    if (this.character.source[1] >= 1500) {
      this.message('질 내부가 격렬하게 조이며 쾌감을 느끼고 있다...');
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
      this.addExperience(23, 3);
    }
  }
}

/**
 * Factory function
 */
export async function com20(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  const command = new Com20Command(ctx, character);

  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }

  await command.execute();
}
