/**
 * COM31 - 펠라치오
 * 봉사 카테고리 - 입으로 남성기 자극
 */

import { TrainingCommand, SourceResult } from '../CommandBase';
import { TrainingContext } from '../../types';
import { Character } from '../../../../types/game';

export class Com31Command extends TrainingCommand {
  getName(): string {
    return '펠라치오';
  }

  getDescription(): string {
    return '입으로 남성기를 자극합니다';
  }

  isAvailable(): boolean {
    // 의식 필수
    if (this.character.cflags[16] === -1) {
      return false;
    }

    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();

    // SOURCE 계산
    const source = this.calculateSource();

    // Character source에 적용
    this.character.source[4] = source.submission || 0;
    this.character.source[5] = source.lust || 0;
    this.character.source[12] = 100;

    // 메시지 표시
    await this.showTrainMessage();

    // 경험치 획득
    this.gainExperience();

    // BASE 업데이트
    this.ctx.base[1] += 60;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};

    source.submission = 150;
    source.lust = 100;

    const serviceLevel = this.getAbility(16);
    if (serviceLevel > 0) {
      source.submission += serviceLevel * 25;
      source.lust += serviceLevel * 15;
    }

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);

    if (this.hasTalent(73)) {
      source.submission! *= 1.4;
    }

    if (this.hasTalent(78)) { // 펠라테크
      source.lust! *= 1.5;
    }

    return source;
  }

  private async showTrainMessage(): Promise<void> {
    const serviceLevel = this.getAbility(16);

    if (serviceLevel <= 1) {
      this.message('"으음...음..."');
      this.message('서투르게 입으로 받아들인다...');
    } else if (serviceLevel <= 3) {
      this.message('입술과 혀를 사용해 자극한다.');
    } else {
      this.message('숙련된 테크닉으로 완벽하게 봉사한다!!');
    }

    if (this.hasTalent(78)) {
      this.message('놀라운 혀놀림을 선보인다!');
    }
  }

  private gainExperience(): void {
    this.addExperience(45, 5);
    this.addExperience(16, 3);

    const playerVirgin = this.ctx.getTalent?.(122) === 0;
    const charVirgin = this.hasTalent(122);

    if (!charVirgin && !playerVirgin) {
      this.addExperience(40, 5);
    } else if (charVirgin && playerVirgin) {
      this.addExperience(41, 5);
    }
  }
}

export async function com31(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  const command = new Com31Command(ctx, character);

  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }

  await command.execute();
}
