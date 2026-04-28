/**
 * COM45 - 긴박
 * SM 카테고리 - 로프 긴박
 */

import { TrainingCommand, SourceResult } from '../CommandBase';
import { TrainingContext } from '../../types';
import { Character } from '../../../../types/game';

export class Com45Command extends TrainingCommand {
  getName(): string {
    return '긴박';
  }

  getDescription(): string {
    return '로프로 묶습니다';
  }

  isAvailable(): boolean {
    // 볼개그 아이템 보유 필요 (ITEM:9)
    if (!this.ctx.items || this.ctx.items[9] === undefined || this.ctx.items[9] <= 0) {
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

    this.ctx.base[3] += 25;
    this.ctx.base[4] += 20;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pain = 180;
    source.submission = 200;
    source.fear = 120;
    source.shame = 150;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('로프로 몸을 단단히 묶는다...');
  }

  private gainExperience(): void {
    this.addExperience(18, 2);
  }
}

export async function com45(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com45Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}
