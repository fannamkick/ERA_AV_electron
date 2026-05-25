/**
 * COM54 - 노출
 * 특수 카테고리 - 공개 노출
 */

import { TrainingCommand, SourceResult } from '../CommandBase';
import { TrainingContext } from '../../types';
import { Character } from '../../../../types/game';

export class Com54Command extends TrainingCommand {
  getName(): string {
    return '노출';
  }

  getDescription(): string {
    return '공공장소에서 노출시킵니다';
  }

  isAvailable(): boolean {
    if (this.character.cflags[16] === -1) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[5] = source.shame || 0;
    this.character.source[8] = source.lust || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[4] += 40;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.shame = 300;
    source.lust = 150;
    source.submission = 120;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('공공장소에서 노출시킨다...');
  }

  private gainExperience(): void {
    this.addExperience(19, 3);
  }
}

export async function com54(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com54Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}
