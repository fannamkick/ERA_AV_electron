/**
 * COM3 - 자위
 * 애무 카테고리 - 대상이 스스로 자위행위
 */

import { TrainingCommand, SourceResult } from '../CommandBase';
import { TrainingContext } from '../../types';
import { Character } from '../../../../types/game';

export class Com3Command extends TrainingCommand {
  getName(): string {
    return '자위';
  }

  getDescription(): string {
    return '스스로 자위하게 합니다';
  }

  isAvailable(): boolean {
    // 실신중 불가 (TFLAG:899 > 0)
    if ((this.ctx.tflags[899] || 0) > 0) {
      return false;
    }

    // 조수 플레이 시 조건 체크
    if (this.isAssiPlay()) {
      const assiSubmission = this.ctx.getAbility?.(10) || 0;
      const assiLesbian = this.ctx.getAbility?.(22) || 0;
      const assiDevil = this.ctx.getTalent?.(87) || false;

      // 従順3 이하 OR 레즈끼3 이하의 조수는 자위 불가 (소악마 제외)
      if ((assiSubmission <= 3 || assiLesbian <= 3) && !assiDevil) {
        return false;
      }
    }

    // 자위 안함 소질 보유 시 불가 (TALENT:150)
    if (this.hasTalent(150)) {
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

    // 수간 플레이중 불가 (TEQUIP:89)
    if (this.hasEquipment(89)) {
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
    let commandName = '';

    // 바이브 장착 여부 확인
    const hasVibrator = this.character.equipment[11] === 1;
    const hasAnalVibrator = this.character.equipment[13] === 1;

    if (hasVibrator && hasAnalVibrator) {
      commandName = '양구멍 바이브 자위';
    } else if (hasVibrator) {
      commandName = '바이브 자위';
    } else if (hasAnalVibrator) {
      commandName = '애널바이브 자위';
    } else {
      commandName = '자위';
    }

    this.message(commandName);
    this.ctx.saveStr[0] = commandName;

    // SOURCE 계산
    const source = this.calculateSource();

    // Character source에 적용
    this.character.source[0] = source.pleasureC || 0;  // 쾌C
    this.character.source[1] = source.pleasureV || 0;  // 쾌V
    this.character.source[2] = source.pleasureA || 0;  // 쾌A
    this.character.source[3] = source.lubrication || 0; // 윤활
    this.character.source[4] = source.submission || 0;  // 굴복
    this.character.source[5] = source.lust || 0;       // 욕정
    this.character.source[12] = 100;

    // 메시지 표시
    await this.showTrainMessage();

    // 경험치 획득
    this.gainExperience();

    // BASE 업데이트
    this.ctx.base[0] += 10;  // C감각
    this.ctx.base[2] += 10;  // V감각
    this.ctx.base[1] += 80;  // 욕망
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};

    // 바이브 장착 여부
    const hasVibrator = this.character.equipment[11] === 1;
    const hasAnalVibrator = this.character.equipment[13] === 1;

    // 쾌C 계산
    const cValues = hasVibrator
      ? [100, 400, 1000, 2000, 3200, 4500]  // 바이브 사용
      : [30, 150, 500, 1200, 2000, 3000];   // 일반 자위

    source.pleasureC = this.calculateAbilitySource(0, cValues);

    // 쾌V 계산
    const vValues = hasVibrator
      ? [50, 250, 700, 1500, 2500, 3800]
      : [20, 100, 400, 900, 1500, 2200];

    source.pleasureV = this.calculateAbilitySource(2, vValues);

    // 쾌A 계산 (애널바이브 사용 시)
    if (hasAnalVibrator) {
      const aValues = [50, 200, 600, 1300, 2100, 3200];
      source.pleasureA = this.calculateAbilitySource(3, aValues);
    } else {
      source.pleasureA = 0;
    }

    // 윤활
    source.lubrication = hasVibrator ? 250 : 180;

    // 굴복 (수치심)
    source.submission = 150;

    // 욕정
    source.lust = 120;

    // 소질 기반 수정
    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);

    // 특수 소질 효과

    // M기질
    if (this.hasTalent(85)) {
      source.submission! *= 1.5;
    }

    // 노출벽
    if (this.hasTalent(72)) {
      source.pleasureC! *= 1.2;
      source.pleasureV! *= 1.2;
      source.submission! *= 1.3;
    }

    // 자위중독
    if (this.hasTalent(81)) {
      source.pleasureC! *= 1.4;
      source.pleasureV! *= 1.4;
    }

    // 감도가 높음
    if (this.hasTalent(62)) {
      source.pleasureC! *= 1.3;
      source.pleasureV! *= 1.2;
    }

    return source;
  }

  private async showTrainMessage(): Promise<void> {
    const cSense = this.getAbility(0);
    const vSense = this.getAbility(2);
    const hasVibrator = this.character.equipment[11] === 1;

    if (hasVibrator) {
      this.message('바이브를 잡고 자신의 음부에 삽입한다...');
    } else {
      this.message('손가락으로 자신의 음부를 만지기 시작한다...');
    }

    if (cSense === 0 && vSense === 0) {
      this.message('"으...부끄러워..."');
    } else if (cSense <= 2 || vSense <= 2) {
      this.message('"아...느껴져..."');
    } else if (cSense <= 4 || vSense <= 4) {
      this.message('"하앗...! 혼자서도...이렇게...!!"');
    } else {
      this.message('"안돼...혼자서...너무 느껴져...!!"');
    }

    // 반응 메시지
    const totalPleasure = (this.character.source[0] || 0) + (this.character.source[1] || 0);
    if (totalPleasure >= 3000) {
      this.message('몸을 떨며 자위를 계속한다...');
    } else if (totalPleasure >= 1500) {
      this.message('부끄러워하면서도 손을 멈추지 못한다.');
    }

    // 노출벽 추가 메시지
    if (this.hasTalent(72)) {
      this.message('보여지는 것에 흥분하고 있다...');
    }
  }

  private gainExperience(): void {
    // 자위 경험치
    this.addExperience(49, 5);

    // 애무 경험치
    this.addExperience(14, 2);

    // 노출 경험치
    this.addExperience(22, 3);

    // 순결 경험치
    const playerVirgin = this.ctx.getTalent?.(122) === 0;
    const charVirgin = this.hasTalent(122);

    if (!charVirgin && !playerVirgin) {
      this.addExperience(40, 5);
    } else if (charVirgin && playerVirgin) {
      this.addExperience(41, 5);
    }

    // 페로몬
    if (this.character.cflags[2] >= 1000 && !this.isAssiPlay()) {
      this.addExperience(23, 3);
    }
  }
}

/**
 * Factory function
 */
export async function com3(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  const command = new Com3Command(ctx, character);

  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }

  await command.execute();
}
