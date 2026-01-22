/**
 * COM16 - 착유기
 * 도구 카테고리 - 착유기로 가슴 자극
 */

import { TrainingCommand, SourceResult } from '../CommandBase';
import { TrainingContext } from '../../types';
import { Character } from '../../../../types/game';

export class Com16Command extends TrainingCommand {
  getName(): string {
    return this.character.equipment[90] ? '촉수 착유' : '착유기';
  }

  getDescription(): string {
    return '착유기로 가슴을 집중적으로 자극합니다';
  }

  isAvailable(): boolean {
    // 착유기 아이템 보유 필요 (ITEM:17)
    if (!this.ctx.items || this.ctx.items[17] === undefined || this.ctx.items[17] <= 0) {
      return false;
    }

    // 상반신 노출 필수
    if (!this.topNaked()) {
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
    this.character.source[17] = source.pleasureB || 0;  // 쾌B
    this.character.source[4] = 100;   // 굴복
    this.character.source[5] = 100;   // 욕정
    this.character.source[6] = 100;   // 고통
    this.character.source[7] = 100;   // 애정
    this.character.source[12] = 100;
    this.character.source[13] = 100;
    this.character.source[16] = 100;

    // 메시지 표시
    await this.showTrainMessage();

    // 경험치 획득
    this.gainExperience();

    // BASE 업데이트
    this.ctx.base[0] += 50;   // C감각
    this.ctx.base[1] += 100;  // 욕망

    // 착유기 장착/해제 토글
    this.character.equipment[16] = this.character.equipment[16] ? 0 : 1;

    // 촉수 착유 시 더러움
    if (this.character.equipment[90] && this.character.equipment[16]) {
      this.ctx.stain[5] |= 2;
      this.ctx.stain[5] |= 4;
    }
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};

    // 쾌B 계산 (B감각 기반)
    const bValues = [200, 400, 900, 1600, 2400, 3000];
    source.pleasureB = this.calculateAbilitySource(1, bValues);

    // 특수 소질 효과
    if (this.hasTalent(110)) { // 폭유
      source.pleasureB! *= 1.5;
    }

    if (this.hasTalent(108)) { // 모유체질
      source.pleasureB! *= 1.5;
    } else if (this.hasTalent(107)) { // 빈유
      source.pleasureB! *= 0.6;
    }

    // 절벽
    if (this.hasTalent(116)) {
      source.pain = (source.pain || 100) * 1.8;
    }

    // 빈유
    if (this.hasTalent(109)) {
      source.pain = (source.pain || 100) * 1.5;
    }

    // 슬라임 아이템 효과
    if (this.ctx.items?.[210] >= 1 && !this.character.equipment[90]) {
      this.ctx.base[0] *= 0.8;
      this.ctx.base[1] *= 0.8;
      source.pleasureB! *= 1.2;
    }

    return source;
  }

  private async showTrainMessage(): Promise<void> {
    const bSense = this.getAbility(1);

    if (this.character.equipment[90]) {
      this.message('촉수가 가슴을 감싸며 착유를 시작한다...');
    } else {
      this.message('착유기를 가슴에 장착한다...');
    }

    if (bSense === 0) {
      this.message('"으...가슴이...빨려들어가..."');
    } else if (bSense <= 2) {
      this.message('"아...유두가...너무 민감해..."');
    } else if (bSense <= 4) {
      this.message('"안돼...이렇게 강하게...!!"');
    } else {
      this.message('"으앗...!! 가슴만으로...느껴져...!!"');
    }

    if (this.hasTalent(70)) { // 모유체질
      this.message('착유기에서 모유가 추출되고 있다...');
    }
  }

  private gainExperience(): void {
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
export async function com16(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  const command = new Com16Command(ctx, character);

  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }

  await command.execute();
}
