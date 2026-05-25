/**
 * COM58 - 착유
 * 특수 카테고리 - 모유 착유
 */

import { TrainingCommand, SourceResult } from '../CommandBase';
import { TrainingContext } from '../../types';
import { Character } from '../../../../types/game';

export class Com58Command extends TrainingCommand {
  getName(): string {
    return '착유';
  }

  getDescription(): string {
    return '모유를 짜냅니다';
  }

  isAvailable(): boolean {
    if (this.character.cflags[16] === -1) return false;
    if (!this.topNaked()) return false;
    if (!this.hasTalent(108)) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[17] = source.pleasureB || 0;
    this.character.source[5] = source.shame || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[1] += 30;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pleasureB = 500;
    source.shame = 150;
    source.lust = 120;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('가슴에서 모유를 짜낸다...');
  }

  private gainExperience(): void {
    this.addExperience(16, 3);
  }
}

export async function com58(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com58Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}
