/**
 * COM55 - 윤간
 * 특수 카테고리 - 다수 상대 플레이
 */

import { TrainingCommand, SourceResult } from '../CommandBase';
import { TrainingContext } from '../../types';
import { Character } from '../../../../types/game';

export class Com55Command extends TrainingCommand {
  getName(): string {
    return '윤간';
  }

  getDescription(): string {
    return '여러 명에게 당하게 합니다';
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
    this.character.source[2] = source.pleasureA || 0;
    this.character.source[18] = source.pleasureM || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[1] += 50;
    this.ctx.base[4] += 50;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pleasureV = 1200;
    source.pleasureA = 900;
    source.pleasureM = 600;
    source.submission = 300;
    source.shame = 350;
    source.lust = 250;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('여러 명에게 동시에 범해진다...');
  }

  private gainExperience(): void {
    this.addExperience(14, 5);
    this.addExperience(19, 4);
  }
}

export async function com55(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com55Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}
