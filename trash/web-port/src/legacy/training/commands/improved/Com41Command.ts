/**
 * COM41 - 채찍
 * SM 카테고리 - 채찍질
 */

import { TrainingCommand, SourceResult } from '../CommandBase';
import { TrainingContext } from '../../types';
import { Character } from '../../../../types/game';

export class Com41Command extends TrainingCommand {
  getName(): string {
    return '채찍';
  }

  getDescription(): string {
    return '채찍으로 때립니다';
  }

  isAvailable(): boolean {
    // 채찍 아이템 보유 필요 (ITEM:10)
    if (!this.ctx.items || this.ctx.items[10] === undefined || this.ctx.items[10] <= 0) {
      return false;
    }
    if (this.character.cflags[16] === -1) return false;
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

    this.ctx.base[3] += 30;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pain = 300;
    source.submission = 150;
    source.fear = 100;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('채찍이 피부를 때린다...');
  }

  private gainExperience(): void {
    this.addExperience(18, 2);
  }
}

export async function com41(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com41Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}
