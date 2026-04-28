/**
 * COM36 - 정액음용
 * 봉사 카테고리 - 정액 마시기
 */

import { TrainingCommand, SourceResult } from '../CommandBase';
import { TrainingContext } from '../../types';
import { Character } from '../../../../types/game';

export class Com36Command extends TrainingCommand {
  getName(): string {
    return '정액음용';
  }

  getDescription(): string {
    return '정액을 마시게 합니다';
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
    this.character.source[5] = source.shame || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[4] += 20;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.submission = 120;
    source.shame = 150;
    source.lust = 80;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('정액을 삼키게 한다...');
  }

  private gainExperience(): void {
    this.addExperience(17, 2);
  }
}

export async function com36(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com36Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}
