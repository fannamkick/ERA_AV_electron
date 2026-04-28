/**
 * COM32 - 파이즈리
 * 봉사 카테고리 - 가슴으로 봉사
 */

import { TrainingCommand, SourceResult } from '../CommandBase';
import { TrainingContext } from '../../types';
import { Character } from '../../../../types/game';

export class Com32Command extends TrainingCommand {
  getName(): string {
    return '파이즈리';
  }

  getDescription(): string {
    return '가슴으로 봉사합니다';
  }

  isAvailable(): boolean {
    if (this.character.cflags[16] === -1) return false;
    if (!this.topNaked()) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[17] = source.pleasureB || 0;
    this.character.source[4] = source.submission || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[1] += 20;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pleasureB = 300;
    source.submission = 80;
    source.lust = 60;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('가슴으로 부드럽게 감싼다...');
  }

  private gainExperience(): void {
    this.addExperience(16, 2);
  }
}

export async function com32(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com32Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}
