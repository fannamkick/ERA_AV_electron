/**
 * COM40 - 스팽킹
 * SM 카테고리 - 엉덩이 때리기
 */

import { TrainingCommand, SourceResult } from '../CommandBase';
import { TrainingContext } from '../../types';
import { Character } from '../../../../types/game';

export class Com40Command extends TrainingCommand {
  getName(): string {
    return '스팽킹';
  }

  getDescription(): string {
    return '엉덩이를 때립니다';
  }

  isAvailable(): boolean {
    // 하반신 노출 필수
    if (!this.bottomNaked()) {
      return false;
    }

    // 의식 필수
    if (this.character.cflags[16] === -1) {
      return false;
    }

    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();

    const source = this.calculateSource();

    this.character.source[6] = source.pain || 0;
    this.character.source[12] = 200;
    this.character.source[14] = 500;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[0] += 80;
    this.ctx.base[1] += 40;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};

    const painLevel = this.ctx.params[9] || 0;
    const painLevels = [200, 500, 1000, 1500];

    if (painLevel < painLevels[0]) {
      source.pain = 300;
    } else if (painLevel < painLevels[1]) {
      source.pain = 500;
    } else if (painLevel < painLevels[2]) {
      source.pain = 800;
    } else if (painLevel < painLevels[3]) {
      source.pain = 1200;
    } else {
      source.pain = 1800;
    }

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);

    if (this.hasTalent(85)) { // M기질
      source.pain! *= 0.7;
    }

    if (this.hasTalent(86)) { // S기질
      source.pain! *= 1.5;
    }

    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('손바닥으로 엉덩이를 때린다!');
    this.message('"으앗...!!"');

    if (this.hasTalent(85)) {
      this.message('고통 속에서도 쾌감을 느끼고 있다...');
    }
  }

  private gainExperience(): void {
    this.addExperience(56, 5);

    const playerVirgin = this.ctx.getTalent?.(122) === 0;
    const charVirgin = this.hasTalent(122);

    if (!charVirgin && !playerVirgin) {
      this.addExperience(40, 2);
    } else if (charVirgin && playerVirgin) {
      this.addExperience(41, 2);
    }

    if (this.character.cflags[2] >= 1000 && !this.isAssiPlay()) {
      this.addExperience(23, 1);
    }
  }
}

export async function com40(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  const command = new Com40Command(ctx, character);

  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }

  await command.execute();
}
