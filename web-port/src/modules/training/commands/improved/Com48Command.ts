/**
 * COM48 - 목줄
 * SM 카테고리 - 목줄 착용
 */

import { TrainingCommand, SourceResult } from '../CommandBase';
import { TrainingContext } from '../../types';
import { Character } from '../../../../types/game';

export class Com48Command extends TrainingCommand {
  getName(): string {
    return '목줄';
  }

  getDescription(): string {
    return '목줄을 채웁니다';
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

    this.ctx.base[4] += 40;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.submission = 250;
    source.shame = 200;
    source.fear = 80;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('목에 목줄을 채운다...');
  }

  private gainExperience(): void {
    this.addExperience(18, 2);
  }
}

export async function com48(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com48Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}
