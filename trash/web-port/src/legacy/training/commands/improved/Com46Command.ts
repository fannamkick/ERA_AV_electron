/**
 * COM46 - 전기자극
 * SM 카테고리 - 전기 충격
 */

import { TrainingCommand, SourceResult } from '../CommandBase';
import { TrainingContext } from '../../types';
import { Character } from '../../../../types/game';

export class Com46Command extends TrainingCommand {
  getName(): string {
    return '전기자극';
  }

  getDescription(): string {
    return '전기 충격을 가합니다';
  }

  isAvailable(): boolean {
    // 관장기+플러그 아이템 보유 필요 (ITEM:15)
    if (!this.ctx.items || this.ctx.items[15] === undefined || this.ctx.items[15] <= 0) {
      return false;
    }
    if (this.character.cflags[16] === -1) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[6] = source.pain || 0;
    this.character.source[4] = source.submission || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[3] += 35;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pain = 350;
    source.submission = 180;
    source.fear = 150;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('전기 충격이 몸을 관통한다...');
  }

  private gainExperience(): void {
    this.addExperience(18, 3);
  }
}

export async function com46(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com46Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}
