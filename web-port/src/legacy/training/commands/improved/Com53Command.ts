/**
 * COM53 - 촬영
 * 특수 카테고리 - 사진/비디오 촬영
 */

import { TrainingCommand, SourceResult } from '../CommandBase';
import { TrainingContext } from '../../types';
import { Character } from '../../../../types/game';

export class Com53Command extends TrainingCommand {
  getName(): string {
    return '촬영';
  }

  getDescription(): string {
    return '사진이나 영상을 촬영합니다';
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

    this.ctx.base[4] += 25;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.shame = 180;
    source.lust = 100;
    source.submission = 100;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('카메라로 촬영한다...');
  }

  private gainExperience(): void {
    this.addExperience(19, 2);
  }
}

export async function com53(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com53Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}
