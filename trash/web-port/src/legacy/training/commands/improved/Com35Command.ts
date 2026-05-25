/**
 * COM35 - 모유음용
 * 봉사 카테고리 - 모유 마시기
 */

import { TrainingCommand, SourceResult } from '../CommandBase';
import { TrainingContext } from '../../types';
import { Character } from '../../../../types/game';

export class Com35Command extends TrainingCommand {
  getName(): string {
    return '모유음용';
  }

  getDescription(): string {
    return '모유를 마십니다';
  }

  isAvailable(): boolean {
    if (this.character.cflags[16] === -1) return false;
    if (!this.topNaked()) return false;
    if (!this.hasTalent(108)) return false; // 모유체질 필요
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[17] = source.pleasureB || 0;
    this.character.source[7] = source.affection || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[1] += 25;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pleasureB = 400;
    source.affection = 100;
    source.lust = 70;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('가슴에서 흘러나오는 모유를 마신다...');
  }

  private gainExperience(): void {
    this.addExperience(16, 2);
  }
}

export async function com35(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com35Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}
