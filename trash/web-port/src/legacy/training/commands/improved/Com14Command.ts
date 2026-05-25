/**
 * COM14 - 클리캡
 * 클리토리스 캡으로 클리토리스를 집중 자극합니다
 */

import { TrainingCommand, SourceResult } from '../CommandBase';
import { TrainingContext } from '../../types';
import { Character } from '../../../../types/game';

export class Com14Command extends TrainingCommand {
  getName(): string {
    return '전동 클리캡';
  }

  getDescription(): string {
    return '클리토리스 캡으로 클리토리스를 집중 자극합니다';
  }

  isAvailable(): boolean {
    // 전동 클리캡 아이템 보유 필요 (ITEM:7)
    if (!this.ctx.items || this.ctx.items[7] === undefined || this.ctx.items[7] <= 0) {
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
    this.ctx.base[0] += 10;  // C감각
    this.ctx.base[1] += 80;  // 욕망
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};

    // 쾌C 계산 (C감각 기반)
    const cValues = [200, 400, 900, 1600, 2400, 3000];
    source.pleasureC = this.calculateAbilitySource(0, cValues);

    // 소질 기반 수정
    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);

    return source;
  }

  private async showTrainMessage(): Promise<void> {
    const cSense = this.getAbility(0);

    this.message('클리토리스에 전동 캡을 장착한다...');

    if (cSense === 0) {
      this.message('"으...! 진동이...!?"');
    } else if (cSense <= 2) {
      this.message('"아...클리토리스가...집중적으로..."');
    } else if (cSense <= 4) {
      this.message('"으아앗...! 클리토리스만...너무 강해...!!"');
    } else {
      this.message('"안돼...! 클리토리스만으로...절정에...!!"');
    }

    // 반응 메시지
    if (this.character.source[0] >= 2000) {
      this.message('강렬한 진동이 클리토리스를 끊임없이 자극한다...');
    }
  }

  private gainExperience(): void {
    // 레즈 경험
    if (this.hasTalent(122) === false && this.ctx.getTalent?.(122) === 0) {
      this.addExperience(40, 1);
    }
  }
}

/**
 * Factory function
 */
export async function com14(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  const command = new Com14Command(ctx, character);

  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }

  await command.execute();
}
