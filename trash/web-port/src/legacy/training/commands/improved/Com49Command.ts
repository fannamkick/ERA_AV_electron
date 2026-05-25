/**
 * COM49 - 개플레이
 * SM 카테고리 - 애완동물 플레이
 */

import { TrainingCommand, SourceResult } from '../CommandBase';
import { TrainingContext } from '../../types';
import { Character } from '../../../../types/game';

export class Com49Command extends TrainingCommand {
  getName(): string {
    return '개플레이';
  }

  getDescription(): string {
    return '애완동물처럼 대합니다';
  }

  isAvailable(): boolean {
    // 애널전극 아이템 보유 필요 (ITEM:21)
    if (!this.ctx.items || this.ctx.items[21] === undefined || this.ctx.items[21] <= 0) {
      return false;
    }
    if (this.character.cflags[16] === -1) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[4] = source.submission || 0;
    this.character.source[5] = source.shame || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[4] += 50;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.submission = 300;
    source.shame = 250;
    source.lust = 100;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('개처럼 행동하게 한다...');
  }

  private gainExperience(): void {
    this.addExperience(18, 3);
  }
}

export async function com49(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com49Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}
