/**
 * COM51 - 방뇨
 * 특수 카테고리 - 배뇨 플레이
 */

import { TrainingCommand, SourceResult } from '../CommandBase';
import { TrainingContext } from '../../types';
import { Character } from '../../../../types/game';

export class Com51Command extends TrainingCommand {
  getName(): string {
    return '방뇨';
  }

  getDescription(): string {
    return '소변을 보게 합니다';
  }

  isAvailable(): boolean {
    // 미약 아이템 보유 필요 (ITEM:26)
    if (!this.ctx.items || this.ctx.items[26] === undefined || this.ctx.items[26] <= 0) {
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

    this.ctx.base[4] += 35;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.shame = 250;
    source.submission = 150;
    source.lust = 80;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('소변을 보게 한다...');
  }

  private gainExperience(): void {
    this.addExperience(19, 2);
  }
}

export async function com51(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com51Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}
