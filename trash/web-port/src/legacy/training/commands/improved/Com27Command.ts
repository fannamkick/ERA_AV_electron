/**
 * COM27 - 애널섹스
 * 삽입 카테고리 - 애널 삽입
 */

import { TrainingCommand, SourceResult } from '../CommandBase';
import { TrainingContext } from '../../types';
import { Character } from '../../../../types/game';

export class Com27Command extends TrainingCommand {
  getName(): string {
    return '애널섹스';
  }

  getDescription(): string {
    return '항문에 삽입합니다';
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

    this.character.source[2] = source.pleasureA || 0;
    this.character.source[6] = source.pain || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[2] += 20;
    this.ctx.base[1] += 30;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pleasureA = 600;
    source.pain = 150;
    source.submission = 150;
    source.lust = 80;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('항문에 천천히 삽입한다...');
  }

  private gainExperience(): void {
    this.addExperience(14, 2);
    this.addExperience(15, 1); // 애널 경험치
  }
}

export async function com27(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com27Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}
