/**
 * COM50 - 수음감상
 * 특수 카테고리 - 자위 감상
 */

import { TrainingCommand, SourceResult } from '../CommandBase';
import { TrainingContext } from '../../types';
import { Character } from '../../../../types/game';

export class Com50Command extends TrainingCommand {
  getName(): string {
    return '수음감상';
  }

  getDescription(): string {
    return '자위하는 것을 감상합니다';
  }

  isAvailable(): boolean {
    // 로션 아이템 보유 필요 (ITEM:25)
    if (!this.ctx.items || this.ctx.items[25] === undefined || this.ctx.items[25] <= 0) {
      return false;
    }
    if (this.character.cflags[16] === -1) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[0] = source.pleasureC || 0;
    this.character.source[5] = source.shame || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[0] += 15;
    this.ctx.base[4] += 30;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pleasureC = 300;
    source.shame = 200;
    source.lust = 150;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('자위하는 모습을 감상한다...');
  }

  private gainExperience(): void {
    this.addExperience(19, 2);
  }
}

export async function com50(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com50Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}
