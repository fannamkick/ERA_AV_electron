/**
 * COM42 - 왁스
 * SM 카테고리 - 촛농 떨어뜨리기
 */

import { TrainingCommand, SourceResult } from '../CommandBase';
import { TrainingContext } from '../../types';
import { Character } from '../../../../types/game';

export class Com42Command extends TrainingCommand {
  getName(): string {
    return '왁스';
  }

  getDescription(): string {
    return '촛농을 떨어뜨립니다';
  }

  isAvailable(): boolean {
    // 왁스 아이템 보유 필요 (ITEM:11)
    if (!this.ctx.items || this.ctx.items[11] === undefined || this.ctx.items[11] <= 0) {
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
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pain = 250;
    source.submission = 120;
    source.fear = 80;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('뜨거운 촛농이 피부에 떨어진다...');
  }

  private gainExperience(): void {
    this.addExperience(18, 2);
  }
}

export async function com42(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com42Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}
