/**
 * COM28 - 2홀삽입
 * 삽입 카테고리 - 질과 항문 동시 삽입
 */

import { TrainingCommand, SourceResult } from '../CommandBase';
import { TrainingContext } from '../../types';
import { Character } from '../../../../types/game';

export class Com28Command extends TrainingCommand {
  getName(): string {
    return '2홀삽입';
  }

  getDescription(): string {
    return '질과 항문에 동시에 삽입합니다';
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
    this.character.source[6] = source.pain || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[1] += 30;
    this.ctx.base[2] += 30;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pleasureV = 900;
    source.pleasureA = 700;
    source.pain = 200;
    source.submission = 200;
    source.lust = 150;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('양쪽 구멍에 동시에 삽입한다...');
  }

  private gainExperience(): void {
    this.addExperience(14, 3);
    this.addExperience(15, 2);
  }
}

export async function com28(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com28Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}
