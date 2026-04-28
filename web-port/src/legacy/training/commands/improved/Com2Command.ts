/**
 * COM2 - 애널애무
 * 애무 카테고리 - 손으로 항문 자극
 */

import { TrainingCommand, SourceResult } from '../CommandBase';
import { TrainingContext } from '../../types';
import { Character } from '../../../../types/game';

export class Com2Command extends TrainingCommand {
  getName(): string {
    return '애널애무';
  }

  getDescription(): string {
    return '손으로 항문을 자극합니다';
  }

  isAvailable(): boolean {
    // 수간 플레이중 불가 (TEQUIP:89)
    if (this.hasEquipment(89)) {
      return false;
    }

    // 삼각목마 기승 중 불가 (TEQUIP:70)
    if (this.hasEquipment(70)) {
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

    // 주인 플레이는 자동 성공
    if (!this.isAssiPlay()) {
      return true;
    }

    // 조수 플레이의 경우
    // 윤활 부족 시 조건 체크
    const lubrication = this.ctx.params[3] || 0;
    const lubLevel = this.getPalamLevel(3, 2); // PALAMLV:2

    if (lubrication < lubLevel) {
      // 조수가 새드면 OK (TALENT:ASSI:83)
      if (this.ctx.getTalent?.(83)) {
        return true;
      }

      // 조수가 従順4 이상 AND 레즈끼4 이상이면 OK
      const assiSubmission = this.ctx.getAbility?.(10) || 0;
      const assiLesbian = this.ctx.getAbility?.(22) || 0;

      if (assiSubmission >= 4 && assiLesbian >= 4) {
        return true;
      }

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
    this.character.source[3] = source.lubrication || 0; // 윤활
    this.character.source[4] = source.submission || 0;  // 굴복
    this.character.source[5] = source.lust || 0;       // 욕정
    this.character.source[6] = source.pain || 0;       // 고통
    this.character.source[12] = 850;
    this.character.source[13] = source.terror || 0;    // 공포
    this.character.source[14] = source.depression || 0; // 우울

    // 메시지 표시
    await this.showTrainMessage();

    // 경험치 획득
    this.gainExperience();

    // BASE 업데이트
    this.ctx.base[0] += 20;  // A감각
    this.ctx.base[1] += 100; // 욕망
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};

    // 쾌A 계산 (A감각 레벨에 따라)
    const aValues = [20, 75, 300, 700, 1100, 1500];
    source.pleasureA = this.calculateAbilitySource(3, aValues);

    // 공포 (A감각에 따라)
    const terrorValues = [300, 350, 400, 650, 1000, 1500];
    source.terror = this.calculateAbilitySource(3, terrorValues);

    // A경험에 따른 수정
    const aExp = this.ctx.exp[1] || 0;
    const aExpLevels = [100, 300, 700, 1500, 3000];

    if (aExp < aExpLevels[0]) {
      source.pleasureA! *= 0.2;
      source.terror! *= 0.2;
      source.pain = 500;
      source.depression = 200;
    } else if (aExp < aExpLevels[1]) {
      source.pleasureA! *= 0.5;
      source.terror! *= 0.5;
      source.pain = 400;
      source.depression = 100;
    } else if (aExp < aExpLevels[2]) {
      source.pleasureA! *= 1.0;
      source.terror! *= 1.0;
      source.pain = 300;
      source.depression = 50;
    } else if (aExp < aExpLevels[3]) {
      source.pleasureA! *= 1.2;
      source.terror! *= 1.2;
      source.pain = 200;
    } else if (aExp < aExpLevels[4]) {
      source.pleasureA! *= 1.6;
      source.terror! *= 1.6;
      source.pain = 100;
    } else {
      source.pleasureA! *= 1.8;
      source.terror! *= 1.8;
      source.pain = 50;
    }

    // 윤활에 따른 수정
    const lubrication = this.ctx.params[3] || 0;
    const lubLevels = [200, 500, 1000, 1500];

    if (lubrication < lubLevels[0]) {
      source.pleasureA! *= 0.1;
      source.terror! *= 0.1;
      source.pain! *= 3.0;
    } else if (lubrication < lubLevels[1]) {
      source.pleasureA! *= 0.2;
      source.terror! *= 0.2;
      source.pain! *= 2.0;
    } else if (lubrication < lubLevels[2]) {
      source.pleasureA! *= 0.6;
      source.terror! *= 0.6;
      source.pain! *= 1.0;
    } else if (lubrication < lubLevels[3]) {
      source.pleasureA! *= 1.0;
      source.terror! *= 1.0;
      source.pain! *= 0.5;
    } else {
      source.pleasureA! *= 2.0;
      source.terror! *= 2.0;
      source.pain! *= 0.1;
    }

    // 욕정에 따른 수정
    const lust = this.ctx.params[5] || 0;
    const lustLevels = [200, 500, 1000, 1500];

    if (lust < lustLevels[0]) {
      source.pleasureA! *= 0.3;
      source.terror! *= 0.3;
    } else if (lust < lustLevels[1]) {
      source.pleasureA! *= 0.6;
      source.terror! *= 0.6;
    } else if (lust < lustLevels[2]) {
      source.pleasureA! *= 1.0;
      source.terror! *= 1.0;
    } else if (lust < lustLevels[3]) {
      source.pleasureA! *= 1.3;
      source.terror! *= 1.3;
    } else {
      source.pleasureA! *= 1.6;
      source.terror! *= 1.6;
    }

    source.submission = 120;
    source.lust = 100;
    source.lubrication = 150;
    source.depression = source.depression || 0;

    // 소질 기반 수정
    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);

    // M기질
    if (this.hasTalent(85)) {
      source.submission! *= 1.5;
      source.pleasureA! *= 1.2;
    }

    // 애널개발
    if (this.hasTalent(76)) {
      source.pleasureA! *= 1.5;
      source.pain! *= 0.5;
    }

    return source;
  }

  private async showTrainMessage(): Promise<void> {
    const aSense = this.getAbility(3);
    const aExp = this.ctx.exp[1] || 0;

    this.message('손가락을 항문에 밀어넣는다...');

    if (aExp < 100) {
      this.message('"안돼...! 거기는...!!"');
    } else if (aSense === 0) {
      this.message('"으...! 이상한 느낌..."');
    } else if (aSense <= 2) {
      this.message('"아...! 항문이...자극받아..."');
    } else if (aSense <= 4) {
      this.message('"으아앗...! 거기...느껴져...!!"');
    } else {
      this.message('"안돼...항문만으로...느껴져...!!"');
    }

    // 반응 메시지
    if (this.character.source[2] >= 1000) {
      this.message('항문이 손가락을 조이며 반응한다...');
    }
  }

  private gainExperience(): void {
    // 애무 경험치
    this.addExperience(14, 2);

    // 애널애무 경험치
    this.addExperience(50, 5);

    // A경험치
    this.addExperience(1, 3);

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
export async function com2(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  const command = new Com2Command(ctx, character);

  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }

  await command.execute();
}
