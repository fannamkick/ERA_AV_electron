/**
 * COM39 - 레즈플레이
 * 봉사 카테고리 - 레즈비언 플레이
 */

import { TrainingCommand, SourceResult } from '../CommandBase';
import { TrainingContext } from '../../types';
import { Character } from '../../../../types/game';

export class Com39Command extends TrainingCommand {
  getName(): string {
    return '레즈플레이';
  }

  getDescription(): string {
    return '레즈비언 플레이를 합니다';
  }

  isAvailable(): boolean {
    if (this.character.cflags[16] === -1) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[0] = source.pleasureC || 0;
    this.character.source[17] = source.pleasureB || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[0] += 20;
    this.ctx.base[1] += 20;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pleasureC = 300;
    source.pleasureB = 300;
    source.lust = 120;
    source.affection = 80;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('서로의 몸을 애무한다...');
  }

  private gainExperience(): void {
    this.addExperience(16, 2);
  }
}

export async function com39(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com39Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}
