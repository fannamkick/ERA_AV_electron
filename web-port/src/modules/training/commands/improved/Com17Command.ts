/**
 * COM17 - 오나홀
 * 도구 카테고리 - 오나홀로 페니스 자극
 */

import { TrainingCommand, SourceResult } from '../CommandBase';
import { TrainingContext } from '../../types';
import { Character } from '../../../../types/game';

export class Com17Command extends TrainingCommand {
  getName(): string {
    return this.character.equipment[90] ? '촉수 페니스자극' : '오나홀';
  }

  getDescription(): string {
    return '오나홀로 페니스를 자극합니다';
  }

  isAvailable(): boolean {
    // 오나홀 아이템 보유 필요 (ITEM:12)
    if (!this.ctx.items || this.ctx.items[12] === undefined || this.ctx.items[12] <= 0) {
      return false;
    }

    // 하반신 노출 필수
    if (!this.bottomNaked()) {
      return false;
    }

    // 페니스 필수 (남성 또는 후타나리)
    if (!this.hasTalent(121) && !this.hasTalent(122)) {
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
    this.character.source[0] = source.pleasureC || 0;  // 쾌C
    this.character.source[12] = 120;
    this.character.source[14] = 70;

    // 메시지 표시
    await this.showTrainMessage();

    // 경험치 획득
    this.gainExperience();

    // BASE 업데이트
    this.ctx.base[0] += 10;   // C감각
    this.ctx.base[1] += 80;   // 욕망

    // 오나홀 장착/해제 토글
    this.character.equipment[17] = this.character.equipment[17] ? 0 : 1;

    // 촉수 자극 시 더러움
    if (this.character.equipment[90] && this.character.equipment[17]) {
      this.ctx.stain[3] |= 2;
      this.ctx.stain[3] |= 4;
    }
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};

    // 쾌C 계산 (C감각 기반)
    const cValues = [200, 400, 900, 1600, 2400, 3000];
    source.pleasureC = this.calculateAbilitySource(0, cValues);

    // 슬라임 아이템 효과
    if (this.ctx.items?.[214] >= 1 && !this.character.equipment[90]) {
      this.ctx.base[0] *= 0.8;
      this.ctx.base[1] *= 0.8;
      source.pleasureC! *= 1.2;
    }

    return source;
  }

  private async showTrainMessage(): Promise<void> {
    const cSense = this.getAbility(0);

    if (this.character.equipment[90]) {
      this.message('촉수가 페니스를 감싸며 자극한다...');
    } else {
      this.message('오나홀을 페니스에 장착한다...');
    }

    if (cSense === 0) {
      this.message('"으...조이는 느낌이..."');
    } else if (cSense <= 2) {
      this.message('"아...생각보다...강해..."');
    } else if (cSense <= 4) {
      this.message('"으앗...! 너무...자극적이야...!!"');
    } else {
      this.message('"안돼...이렇게 계속하면...!!"');
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
export async function com17(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  const command = new Com17Command(ctx, character);

  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }

  await command.execute();
}
