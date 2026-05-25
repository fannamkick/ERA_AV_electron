/**
 * COM69 - 조합커맨드11
 * 조합 카테고리 - 특수 조합 커맨드
 */

import { TrainingCommand, SourceResult } from '../CommandBase';
import { TrainingContext } from '../../types';
import { Character } from '../../../../types/game';

export class Com69Command extends TrainingCommand {
  getName(): string {
    return '조합커맨드11';
  }

  getDescription(): string {
    return '특수 조합 커맨드를 실행합니다';
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
    this.character.source[1] = source.pleasureV || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[0] += 10;
    this.ctx.base[1] += 50;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pleasureC = 100;
    source.pleasureV = 100;
    source.submission = 100;
    source.lust = 100;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('조합 커맨드 실행 중...');
  }

  private gainExperience(): void {
    this.addExperience(14, 2);
  }
}

export async function com69(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com69Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}
