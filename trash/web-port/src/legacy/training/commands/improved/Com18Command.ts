/**
 * COM18 - 샤워
 * 도구 카테고리 - 샤워로 더러움 제거 및 자극
 */

import { TrainingCommand, SourceResult } from '../CommandBase';
import { TrainingContext } from '../../types';
import { Character } from '../../../../types/game';

export class Com18Command extends TrainingCommand {
  getName(): string {
    return '샤워';
  }

  getDescription(): string {
    return '샤워로 몸을 씻으며 자극합니다';
  }

  isAvailable(): boolean {
    // 샤워기 아이템 보유 필요 (ITEM:20) - ERB COM_ABLE18에서 확인됨
    if (!this.ctx.items || this.ctx.items[20] === undefined || this.ctx.items[20] <= 0) {
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
    this.character.source[3] = source.lubrication || 0;  // 윤활
    this.character.source[5] = 400;   // 욕정
    this.character.source[12] = source.sensation || 0;
    this.character.source[14] = 50;
    this.character.source[16] = 200;

    // 메시지 표시
    await this.showTrainMessage();

    // 경험치 획득
    this.gainExperience();

    // BASE 업데이트
    this.ctx.base[0] += 0;    // C감각
    this.ctx.base[1] += 10;   // 욕망

    // 샤워 장착/해제 토글
    this.character.equipment[18] = this.character.equipment[18] ? 0 : 1;

    // 샤워로 더러움 리셋
    this.resetStains();
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};

    // 욕정에 따른 감각 자극
    const lust = this.ctx.params[5] || 0;
    const lustLevels = [200, 500, 1000, 1500];

    if (lust < lustLevels[0]) {
      source.sensation = 10;
    } else if (lust < lustLevels[1]) {
      source.sensation = 30;
    } else if (lust < lustLevels[2]) {
      source.sensation = 60;
    } else if (lust < lustLevels[3]) {
      source.sensation = 100;
    } else {
      source.sensation = 150;
    }

    // 봉사정신에 따른 윤활
    const serviceValues = [0, 20, 40, 70, 110, 150];
    source.lubrication = this.calculateAbilitySource(16, serviceValues);

    // 종순에 따른 욕정 수정
    const obedience = this.getAbility(10);
    const obedienceMultipliers = [0.8, 0.9, 1.0, 1.1, 1.2, 1.3];
    source.lust = 400 * obedienceMultipliers[Math.min(obedience, 5)];

    // 동물귀 특수 효과
    if (this.hasTalent(124)) {
      source.fear = (source.fear || 0) * 1.6;
      source.antipathy = (source.antipathy || 0) * 1.5;
      source.depression = (source.depression || 0) * 2.0;
    }

    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('따뜻한 물이 온몸을 적신다...');

    const lust = this.ctx.params[5] || 0;

    if (lust < 200) {
      this.message('"...기분 좋네..."');
    } else if (lust < 1000) {
      this.message('"물이...살갗에 닿는 느낌이..."');
    } else {
      this.message('"물줄기가...민감한 곳을...!!"');
    }

    if (this.hasTalent(124)) { // 동물귀
      this.message('물을 싫어하는 것 같다...');
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

  private resetStains(): void {
    // 더러움 상태 리셋
    if (this.ctx.stain) {
      this.ctx.stain[0] = 0;
      this.ctx.stain[1] = 0;
      this.ctx.stain[2] = 2;
      this.ctx.stain[3] = 1;
      this.ctx.stain[4] = 8;
      this.ctx.stain[5] = 0;
    }

    // 윤활 반감
    if (this.ctx.params[3]) {
      this.ctx.params[3] = Math.floor(this.ctx.params[3] / 2);
    }
    if (this.ctx.params[12]) {
      this.ctx.params[12] = Math.floor(this.ctx.params[12] / 2);
    }
  }
}

/**
 * Factory function
 */
export async function com18(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  const command = new Com18Command(ctx, character);

  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }

  await command.execute();
}
