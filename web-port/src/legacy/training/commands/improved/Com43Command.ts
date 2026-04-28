/**
 * COM43 - 관장
 * SM 카테고리 - 관장 플레이
 */

import { TrainingCommand, SourceResult } from '../CommandBase';
import { TrainingContext } from '../../types';
import { Character } from '../../../../types/game';

export class Com43Command extends TrainingCommand {
  getName(): string {
    return '관장';
  }

  getDescription(): string {
    return '관장을 합니다';
  }

  isAvailable(): boolean {
    // 아이마스크 아이템 보유 필요 (ITEM:5)
    if (!this.ctx.items || this.ctx.items[5] === undefined || this.ctx.items[5] <= 0) {
      return false;
    }
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
    this.character.source[4] = source.submission || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[2] += 20;
    this.ctx.base[4] += 30;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pleasureA = 200;
    source.pain = 180;
    source.submission = 150;
    source.shame = 200;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('항문에 관장액을 주입한다...');
  }

  private gainExperience(): void {
    this.addExperience(18, 2);
    this.addExperience(15, 1);
  }
}

export async function com43(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com43Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}
