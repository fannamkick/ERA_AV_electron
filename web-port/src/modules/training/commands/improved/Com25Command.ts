/**
 * COM25 - 대면좌위
 * 삽입 카테고리 - 대면좌위 체위
 */

import { TrainingCommand, SourceResult } from '../CommandBase';
import { TrainingContext } from '../../types';
import { Character } from '../../../../types/game';

export class Com25Command extends TrainingCommand {
  getName(): string {
    return '대면좌위';
  }

  getDescription(): string {
    return '대면좌위 체위로 삽입합니다';
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
    source.pleasureC = 200;
    source.pleasureV = 800;
    source.submission = 100;
    source.lust = 100;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('대면좌위로 천천히 삽입한다...');
  }

  private gainExperience(): void {
    this.addExperience(14, 2);
  }
}

export async function com25(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com25Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}
