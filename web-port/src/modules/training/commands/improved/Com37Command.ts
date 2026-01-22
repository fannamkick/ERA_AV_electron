/**
 * COM37 - 애액음용
 * 봉사 카테고리 - 애액 마시기
 */

import { TrainingCommand, SourceResult } from '../CommandBase';
import { TrainingContext } from '../../types';
import { Character } from '../../../../types/game';

export class Com37Command extends TrainingCommand {
  getName(): string {
    return '애액음용';
  }

  getDescription(): string {
    return '애액을 마십니다';
  }

  isAvailable(): boolean {
    if (this.character.cflags[16] === -1) return false;
    if (!this.bottomNaked()) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[0] = source.pleasureC || 0;
    this.character.source[4] = source.submission || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[0] += 15;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pleasureC = 200;
    source.submission = 100;
    source.lust = 90;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('흘러나온 애액을 핥아 마신다...');
  }

  private gainExperience(): void {
    this.addExperience(16, 2);
  }
}

export async function com37(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com37Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}
