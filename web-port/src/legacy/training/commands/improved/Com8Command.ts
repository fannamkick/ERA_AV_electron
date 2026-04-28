/**
 * COM8 - 손가락삽입
 * 손가락으로 질 내부를 자극합니다
 */

import { TrainingCommand, SourceResult } from '../CommandBase';
import { TrainingContext } from '../../types';
import { Character } from '../../../../types/game';

export class Com8Command extends TrainingCommand {
  getName(): string {
    return '손가락삽입';
  }

  getDescription(): string {
    return '손가락으로 질 내부를 자극합니다';
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
    this.character.source[1] = source.pleasureV || 0;  // 쾌V
    this.character.source[13] = source.terror || 0;    // 공포
    this.character.source[6] = source.pain || 0;       // 고통
    this.character.source[12] = 300;
    this.character.source[14] = 200;

    // 메시지 표시
    await this.showTrainMessage();

    // 경험치 획득
    this.gainExperience();

    // BASE 업데이트
    this.ctx.base[0] += 30;  // V감각
    this.ctx.base[1] += 80;  // 욕망

    // 얼룩 처리
    this.handleStains();
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};

    // 쾌V 계산 (V감각 기반)
    const vValues = [10, 50, 250, 600, 1200, 1800];
    source.pleasureV = this.calculateAbilitySource(2, vValues);

    // 공포 계산 (V감각 기반)
    const terrorValues = [150, 250, 400, 700, 1300, 2000];
    source.terror = this.calculateAbilitySource(2, terrorValues);

    // V경험에 따른 수정
    const vExp = this.ctx.exp[0] || 0;
    const vExpLevels = [100, 300, 700, 1500, 3000];

    if (vExp < vExpLevels[0]) {
      source.pleasureV! *= 0.2;
      source.terror! *= 0.2;
      source.pain = 300;
    } else if (vExp < vExpLevels[1]) {
      source.pleasureV! *= 0.5;
      source.terror! *= 0.5;
      source.pain = 180;
    } else if (vExp < vExpLevels[2]) {
      source.pleasureV! *= 1.0;
      source.terror! *= 0.8;
      source.pain = 80;
    } else if (vExp < vExpLevels[3]) {
      source.pleasureV! *= 1.2;
      source.terror! *= 1.0;
      source.pain = 30;
    } else if (vExp < vExpLevels[4]) {
      source.pleasureV! *= 1.6;
      source.terror! *= 1.2;
      source.pain = 0;
    } else {
      source.pleasureV! *= 1.8;
      source.terror! *= 1.5;
      source.pain = 0;
    }

    // 윤활에 따른 수정
    const lubrication = this.ctx.params[3] || 0;
    const lubLevels = [200, 500, 1000, 1500];

    if (lubrication < lubLevels[0]) {
      source.pleasureV! *= 0.1;
      source.pain! += 700;
      source.pain! *= 3.0;
    } else if (lubrication < lubLevels[1]) {
      source.pleasureV! *= 0.2;
      source.pain! += 200;
      source.pain! *= 1.0;
    } else if (lubrication < lubLevels[2]) {
      source.pleasureV! *= 0.6;
      source.pain! *= 0.8;
    } else if (lubrication < lubLevels[3]) {
      source.pleasureV! *= 1.0;
      source.pain! *= 0.5;
    } else {
      source.pleasureV! *= 2.0;
      source.pain! *= 0.1;
    }

    // 욕정에 따른 수정
    const lust = this.ctx.params[5] || 0;
    const lustLevels = [200, 500, 1000, 1500];

    if (lust < lustLevels[0]) {
      source.pleasureV! *= 0.5;
    } else if (lust < lustLevels[1]) {
      source.pleasureV! *= 0.8;
    } else if (lust < lustLevels[2]) {
      source.pleasureV! *= 1.2;
    } else if (lust < lustLevels[3]) {
      source.pleasureV! *= 1.5;
    } else {
      source.pleasureV! *= 1.8;
    }

    // 소질 기반 수정
    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);

    // V민감
    if (this.hasTalent(103)) {
      source.pain! *= 1.5;
      source.terror! *= 1.5;
    } else if (this.hasTalent(104)) {
      // V둔감
      source.pain! *= 0.6;
      source.terror! *= 0.6;
    }

    // 처녀 + 정조관념
    if (this.ctx.exp[0] === 0 && this.hasTalent(30)) {
      source.terror! *= 2.0;
    }

    // 미숙함
    if (this.hasTalent(135)) {
      source.pain! *= 2.0;
    }

    return source;
  }

  private async showTrainMessage(): Promise<void> {
    const vSense = this.getAbility(2);
    const vExp = this.ctx.exp[0] || 0;

    if (vExp < 100) {
      this.message('"아...아파요...!"');
    } else if (vSense === 0) {
      this.message('손가락이 천천히 질 내부로 들어간다...');
    } else if (vSense <= 2) {
      this.message('"으음...안에서...느껴져..."');
    } else if (vSense <= 4) {
      this.message('"아...! 안쪽이...자극받아...!!"');
    } else {
      this.message('"안돼...손가락만으로도...이렇게...!!"');
    }

    // 반응 메시지
    if (this.character.source[1] >= 1000) {
      this.message('질 내부가 손가락을 조이며 반응한다...');
    }
  }

  private gainExperience(): void {
    // 레즈 경험
    if (this.hasTalent(122) === false && this.ctx.getTalent?.(122) === 0) {
      this.addExperience(40, 4);
    }

    // 처녀가 아니면 V경험
    if (this.hasTalent(0) === false) {
      this.addExperience(0, 1);
    }

    // 애정 경험
    if (this.character.cflags[2] >= 1000 && !this.isAssiPlay()) {
      this.addExperience(23, 1);
    }
  }

  private handleStains(): void {
    // 얼룩 처리: 손가락 <-> 음부
    this.ctx.stain[3] = (this.ctx.stain[3] || 0) | (this.ctx.playerStain[1] || 0);
    this.ctx.playerStain[1] = (this.ctx.playerStain[1] || 0) | (this.ctx.stain[3] || 0);
  }
}

/**
 * Factory function
 */
export async function com8(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  const command = new Com8Command(ctx, character);

  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }

  await command.execute();
}
