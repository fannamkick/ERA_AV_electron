/**
 * COM47 - 스팽킹
 * SM 카테고리 - 엉덩이 때리기
 */

import { TrainingCommand, SourceResult } from '../CommandBase';
import { TrainingContext } from '../../types';
import { Character } from '../../../../types/game';

export class Com47Command extends TrainingCommand {
  getName(): string {
    return '스팽킹';
  }

  getDescription(): string {
    return '엉덩이를 때립니다';
  }

  isAvailable(): boolean {
    // 본디지 아이템 보유 필요 (ITEM:23)
    if (!this.ctx.items || this.ctx.items[23] === undefined || this.ctx.items[23] <= 0) {
      return false;
    }
    if (this.character.cflags[16] === -1) return false;
    if (!this.bottomNaked()) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[6] = source.pain || 0;
    this.character.source[4] = source.submission || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[3] += 20;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pain = 200;
    source.submission = 130;
    source.shame = 100;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('엉덩이를 손바닥으로 때린다...');
  }

  private gainExperience(): void {
    this.addExperience(18, 2);
  }
}

export async function com47(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com47Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}
