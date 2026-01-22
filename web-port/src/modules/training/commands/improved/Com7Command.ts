/**
 * COM7 - 조개벌리기
 * 스스로 음부를 벌려 보이게 합니다
 */

import { TrainingCommand, SourceResult } from '../CommandBase';
import { TrainingContext } from '../../types';
import { Character } from '../../../../types/game';

export class Com7Command extends TrainingCommand {
  getName(): string {
    return '조개벌리기';
  }

  getDescription(): string {
    return '스스로 음부를 벌려 보이게 합니다';
  }

  isAvailable(): boolean {
    // 실신중 불가 (TFLAG:899 > 0)
    if ((this.ctx.tflags[899] || 0) > 0) {
      return false;
    }

    // 남성이면 불가 (TALENT:122)
    if (this.hasTalent(122)) {
      return false;
    }

    // 従順2 미만이면 불가 (ABL:10 < 2)
    if (this.getAbility(10) < 2) {
      return false;
    }

    // 처녀이면서 従順3 미만이고 노출벽3 미만이면 불가 (TALENT:0 && ABL:10 < 3 && ABL:17 < 3)
    if (this.hasTalent(0) && this.getAbility(10) < 3 && this.getAbility(17) < 3) {
      return false;
    }

    // 바이브 사용중 불가 (TEQUIP:11)
    if (this.hasEquipment(11)) {
      return false;
    }

    // 밧줄 사용중 불가 (TEQUIP:44)
    if (this.hasEquipment(44)) {
      return false;
    }

    // 촉수 지도중 불가 (TEQUIP:90)
    if (this.hasEquipment(90)) {
      return false;
    }

    // 슬라임 지도중 불가 (TEQUIP:150)
    if (this.hasEquipment(150)) {
      return false;
    }

    // 삼각목마 기승 중 불가 (TEQUIP:70)
    if (this.hasEquipment(70)) {
      return false;
    }

    // 안면기승 플레이중 불가 (TEQUIP:55)
    if (this.hasEquipment(55)) {
      return false;
    }

    // 팬티(1) 또는 하의(16) 착용시 불가 (CFLAG:40 & 17)
    if ((this.character.cflags[40] & 17) !== 0) {
      return false;
    }

    // 검은 스타킹 착용시 불가 (CFLAG:170 == 6 && CFLAG:173 == 0)
    if (this.character.cflags[170] === 6 && this.character.cflags[173] === 0) {
      return false;
    }

    // 기저귀 착용시 불가 (CFLAG:42 == 69 && CFLAG:40 & 64)
    if (this.character.cflags[42] === 69 && (this.character.cflags[40] & 64)) {
      return false;
    }

    // 즈코 인형 착용시 불가 (CFLAG:42 == 11 && CFLAG:40 & 64)
    if (this.character.cflags[42] === 11 && (this.character.cflags[40] & 64)) {
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
    this.character.source[12] = source.sensitivity || 0;
    this.character.source[13] = source.terror || 0;
    this.character.source[14] = source.depression || 0;
    this.character.source[4] = source.submission || 0;
    this.character.source[5] = source.lust || 0;
    this.character.source[7] = source.exposure || 0;

    // 메시지 표시
    await this.showTrainMessage();

    // 경험치 획득
    this.gainExperience();

    // BASE 업데이트
    this.ctx.base[0] += 10;  // V감각
    this.ctx.base[1] += 50;  // 욕망

    // 얼룩 처리
    this.handleStains();
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};

    // V감각에 따른 기본 값
    const vSense = this.getAbility(2);
    const sensitivityValues = [1500, 1800, 2100, 2400, 2700, 3000];
    const terrorValues = [300, 600, 1000, 1500, 2100, 2800];

    source.sensitivity = sensitivityValues[Math.min(vSense, 5)];
    source.terror = terrorValues[Math.min(vSense, 5)];

    // 봉사정신에 따른 값
    const serviceSpirit = this.getAbility(16);
    const submissionValues = [100, 150, 200, 250, 300, 350];
    const lustValues = [50, 100, 200, 300, 500, 750];

    source.submission = submissionValues[Math.min(serviceSpirit, 5)];
    source.lust = lustValues[Math.min(serviceSpirit, 5)];

    // 노출벽에 따른 값
    const exhibitionism = this.getAbility(17);
    const exposureValues = [0, 100, 300, 800, 1500, 2500];
    const sensMultipliers = [1.0, 1.2, 1.4, 1.6, 2.0, 3.0];
    const lustMultipliers = [1.0, 1.2, 1.4, 1.6, 2.0, 3.0];

    source.exposure = exposureValues[Math.min(exhibitionism, 5)];
    source.sensitivity! *= sensMultipliers[Math.min(exhibitionism, 5)];
    source.lust! *= lustMultipliers[Math.min(exhibitionism, 5)];

    source.depression = 400;

    // 소질 기반 수정
    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);

    // 노출광
    if (this.hasTalent(89)) {
      source.exposure! += 500;
      source.sensitivity! *= 1.5;
      source.lust! *= 1.5;
    }

    return source;
  }

  private async showTrainMessage(): Promise<void> {
    const vSense = this.getAbility(2);
    const exhibitionism = this.getAbility(17);

    if (exhibitionism === 0 && vSense === 0) {
      this.message('"이, 이런 짓...너무 부끄러워..."');
    } else if (exhibitionism <= 2) {
      this.message('떨리는 손으로 조심스럽게 음부를 벌린다...');
    } else if (exhibitionism <= 4) {
      this.message('"이렇게...보여드릴게요..."');
    } else {
      this.message('"제 음부...잘 보이시나요...?"');
    }

    // 반응 메시지
    if (this.character.source[7] >= 1000) {
      this.message('부끄러움을 느끼면서도 흥분하고 있는 것 같다...');
    }
  }

  private gainExperience(): void {
    // 노출벽 Lv3 이상이면 자위 경험치
    const exhibitionism = this.getAbility(17);
    if (exhibitionism >= 3) {
      this.addExperience(10, 1); // 자위 경험
      this.addExperience(11, 1); // 지도자위 경험
    }

    // 레즈 경험
    if (this.hasTalent(122) === false && this.ctx.getTalent?.(122) === 0) {
      this.addExperience(40, 2);
    }
  }

  private handleStains(): void {
    // 얼룩 처리: 손가락 <-> 음부
    this.ctx.stain[1] = (this.ctx.stain[1] || 0) | (this.ctx.stain[3] || 0);
    this.ctx.stain[3] = (this.ctx.stain[3] || 0) | (this.ctx.stain[1] || 0);
  }
}

/**
 * Factory function
 */
export async function com7(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  const command = new Com7Command(ctx, character);

  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }

  await command.execute();
}
