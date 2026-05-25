/**
 * COM44 - 니플클램프
 * SM 카테고리 - 유두 집게
 */

import { TrainingCommand, SourceResult } from '../CommandBase';
import { TrainingContext } from '../../types';
import { Character } from '../../../../types/game';

export class Com44Command extends TrainingCommand {
  getName(): string {
    return '니플클램프';
  }

  getDescription(): string {
    return '유두에 집게를 물립니다';
  }

  isAvailable(): boolean {
    // 밧줄 아이템 보유 필요 (ITEM:14)
    if (!this.ctx.items || this.ctx.items[14] === undefined || this.ctx.items[14] <= 0) {
      return false;
    }
    if (this.character.cflags[16] === -1) return false;
    if (!this.topNaked()) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[17] = source.pleasureB || 0;
    this.character.source[6] = source.pain || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[1] += 20;
    this.ctx.base[3] += 20;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pleasureB = 300;
    source.pain = 200;
    source.submission = 100;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('유두에 집게를 물린다...');
  }

  private gainExperience(): void {
    this.addExperience(18, 2);
  }
}

export async function com44(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com44Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}
