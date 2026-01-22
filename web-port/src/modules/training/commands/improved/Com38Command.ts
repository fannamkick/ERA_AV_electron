/**
 * COM38 - 역강간
 * 봉사 카테고리 - 역강간 플레이
 */

import { TrainingCommand, SourceResult } from '../CommandBase';
import { TrainingContext } from '../../types';
import { Character } from '../../../../types/game';

export class Com38Command extends TrainingCommand {
  getName(): string {
    return '역강간';
  }

  getDescription(): string {
    return '역강간 플레이를 합니다';
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

    this.character.source[1] = source.pleasureV || 0;
    this.character.source[8] = source.lust || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[1] += 40;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pleasureV = 1000;
    source.lust = 200;
    source.submission = 50;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('강제로 삽입당한다...');
  }

  private gainExperience(): void {
    this.addExperience(14, 3);
  }
}

export async function com38(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com38Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}
