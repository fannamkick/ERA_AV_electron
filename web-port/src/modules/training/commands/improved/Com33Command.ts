/**
 * COM33 - 풋잡
 * 봉사 카테고리 - 발로 봉사
 */

import { TrainingCommand, SourceResult } from '../CommandBase';
import { TrainingContext } from '../../types';
import { Character } from '../../../../types/game';

export class Com33Command extends TrainingCommand {
  getName(): string {
    return '풋잡';
  }

  getDescription(): string {
    return '발로 봉사합니다';
  }

  isAvailable(): boolean {
    if (this.character.cflags[16] === -1) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[4] = source.submission || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[1] += 15;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.submission = 100;
    source.lust = 50;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('발로 능숙하게 자극한다...');
  }

  private gainExperience(): void {
    this.addExperience(16, 1);
  }
}

export async function com33(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com33Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}
