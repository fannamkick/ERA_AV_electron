/**
 * COM56 - 최면
 * 특수 카테고리 - 최면 플레이
 */

import { TrainingCommand, SourceResult } from '../CommandBase';
import { TrainingContext } from '../../types';
import { Character } from '../../../../types/game';

export class Com56Command extends TrainingCommand {
  getName(): string {
    return '최면';
  }

  getDescription(): string {
    return '최면을 겁니다';
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
    this.character.source[8] = source.lust || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[4] += 45;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.submission = 350;
    source.lust = 200;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('최면을 건다...');
  }

  private gainExperience(): void {
    this.addExperience(20, 3);
  }
}

export async function com56(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com56Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}
