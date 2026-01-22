/**
 * COM52 - 낙서
 * 특수 카테고리 - 몸에 낙서
 */

import { TrainingCommand, SourceResult } from '../CommandBase';
import { TrainingContext } from '../../types';
import { Character } from '../../../../types/game';

export class Com52Command extends TrainingCommand {
  getName(): string {
    return '낙서';
  }

  getDescription(): string {
    return '몸에 낙서를 합니다';
  }

  isAvailable(): boolean {
    // 이뇨제 아이템 보유 필요 (ITEM:27)
    if (!this.ctx.items || this.ctx.items[27] === undefined || this.ctx.items[27] <= 0) {
      return false;
    }
    if (this.character.cflags[16] === -1) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[5] = source.shame || 0;
    this.character.source[4] = source.submission || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[4] += 30;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.shame = 200;
    source.submission = 130;
    source.lust = 60;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('몸에 낙서를 한다...');
  }

  private gainExperience(): void {
    this.addExperience(19, 2);
  }
}

export async function com52(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com52Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}
