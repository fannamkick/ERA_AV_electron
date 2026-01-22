/**
 * COM11 - 바이브
 * 도구 카테고리 - 바이브레이터로 질 자극
 */

import { TrainingCommand, SourceResult } from '../CommandBase';
import { TrainingContext } from '../../types';
import { Character } from '../../../../types/game';

export class Com11Command extends TrainingCommand {
  getName(): string {
    return this.hasEquipment(90) ? '촉수 삽입' : '바이브';
  }

  getDescription(): string {
    return '바이브레이터로 질을 자극합니다';
  }

  isAvailable(): boolean {
    // 바이브 아이템 보유 필요 (ITEM:1)
    if (!this.ctx.items || this.ctx.items[1] === undefined || this.ctx.items[1] <= 0) {
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

    // 정조대 착용 시 불가
    if (this.character.cflags[42] === 79) {
      return false;
    }

    return true;
  }

  async execute(): Promise<void> {
    // 처녀 체크
    const wasVirgin = this.isVirgin();

    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();

    // SOURCE 계산
    const source = this.calculateSource();

    // Character source에 적용
    this.character.source[1] = source.pleasureV || 0;  // 쾌V
    this.character.source[3] = source.lubrication || 0;
    this.character.source[6] = source.pain || 0;
    this.character.source[12] = 180;

    // 장비 플래그 설정 (바이브 장착)
    this.character.equipment[11] = 1;

    // 메시지 표시
    await this.showTrainMessage(wasVirgin);

    // 처녀 상실
    if (wasVirgin) {
      this.loseVirginity();
    }

    // 경험치 획득
    this.gainExperience(wasVirgin);

    // BASE 업데이트
    this.ctx.base[0] += 30;  // V감각
    this.ctx.base[1] += 100; // 욕망
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};

    // 쾌V 계산 (V감각 기반)
    const vValues = [80, 250, 600, 1000, 1300, 1700];
    source.pleasureV = this.calculateAbilitySource(2, vValues);

    // 윤활
    source.lubrication = 200;

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

    // 욕정에 따른 수정
    const lust = this.ctx.params[5] || 0;
    const lustLevels = [200, 500, 1000, 1500];

    if (lust < lustLevels[0]) {
      source.pleasureV! *= 0.6;
    } else if (lust < lustLevels[1]) {
      source.pleasureV! *= 0.8;
    } else if (lust < lustLevels[2]) {
      source.pleasureV! *= 1.0;
    } else if (lust < lustLevels[3]) {
      source.pleasureV! *= 1.2;
    } else {
      source.pleasureV! *= 1.5;
    }

    // 종순에 따른 수정
    const obedience = this.getAbility(10);
    const obedienceMultipliers = [0.5, 0.8, 1.0, 1.3, 1.6, 2.0];

    source.pleasureV! *= obedienceMultipliers[Math.min(obedience, 5)];

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

    // 정조관념
    if (this.hasTalent(30)) {
      if (this.isVirgin()) {
        source.pain! *= 2.0;
      }
    }

    return source;
  }

  private async showTrainMessage(wasVirgin: boolean): Promise<void> {
    const vSense = this.getAbility(2);

    if (this.hasEquipment(90)) {
      this.message('촉수가 질 안으로 파고들어간다...');
    } else {
      this.message('바이브를 천천히 삽입한다...');
    }

    if (wasVirgin) {
      this.message('"아...! 아파...!!"');
      this.message('처녀막이 찢어진다...');
    } else if (vSense === 0) {
      this.message('"으음...! 뭔가...들어와..."');
    } else if (vSense <= 2) {
      this.message('"아...! 진동이...느껴져...!!"');
    } else if (vSense <= 4) {
      this.message('"으아앗...! 안쪽까지...자극받아...!!"');
    } else {
      this.message('"안돼...이대로면...완전히...!!"');
    }

    // 반응 메시지
    if (this.character.source[1] >= 1500) {
      this.message('진동이 질 안을 자극하며 몸을 떨게 한다...');
    } else if (this.character.source[1] >= 800) {
      this.message('질벽이 바이브에 밀착되어 있다.');
    }
  }

  private gainExperience(wasVirgin: boolean): void {
    // V경험
    this.addExperience(0, wasVirgin ? 30 : 5);

    // 도구 사용 경험치
    this.addExperience(15, 3);

    // 레즈/호모 경험
    const playerMale = this.ctx.getTalent?.(122) === 1;
    const charMale = this.hasTalent(122);

    if (!charMale && !playerMale) {
      this.addExperience(40, 5);
    } else if (charMale && playerMale) {
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
export async function com11(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  const command = new Com11Command(ctx, character);

  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }

  await command.execute();
}
