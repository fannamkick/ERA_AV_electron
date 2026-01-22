/**
 * COM30 - 수음
 * 봉사 카테고리 - 손으로 남성기 자극
 */

import { TrainingCommand, SourceResult } from '../CommandBase';
import { TrainingContext } from '../../types';
import { Character } from '../../../../types/game';

export class Com30Command extends TrainingCommand {
  getName(): string {
    return '수음';
  }

  getDescription(): string {
    return '손으로 남성기를 자극합니다';
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
    this.character.source[4] = source.submission || 0;  // 굴복
    this.character.source[5] = source.lust || 0;       // 욕정
    this.character.source[12] = 100;

    // 메시지 표시
    await this.showTrainMessage();

    // 경험치 획득
    this.gainExperience();

    // BASE 업데이트
    this.ctx.base[1] += 40;  // 욕망
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};

    // 기본 굴복, 욕정
    source.submission = 100;
    source.lust = 80;

    // 봉사정신에 따른 보정
    const serviceLevel = this.getAbility(16);
    if (serviceLevel > 0) {
      source.submission += serviceLevel * 20;
      source.lust += serviceLevel * 10;
    }

    // 욕망 레벨
    const desireLevel = this.getAbility(11);
    if (desireLevel > 0) {
      source.lust += desireLevel * 5;
    }

    // 소질 기반 수정
    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);

    // 봉사정신 소질
    if (this.hasTalent(73)) {
      source.submission! *= 1.3;
    }

    return source;
  }

  private async showTrainMessage(): Promise<void> {
    const serviceLevel = this.getAbility(16);

    if (serviceLevel === 0) {
      this.message('"이...이렇게...?"');
      this.message('서투르게 손을 움직인다...');
    } else if (serviceLevel <= 2) {
      this.message('조심스럽게 손으로 자극한다.');
    } else if (serviceLevel <= 4) {
      this.message('능숙한 손놀림으로 자극한다!');
    } else {
      this.message('완벽한 테크닉으로 쾌감을 이끌어낸다!!');
    }
  }

  private gainExperience(): void {
    // 수음 경험치
    this.addExperience(44, 5);

    // 봉사 경험치
    this.addExperience(16, 3);

    // 순결 경험치
    const playerVirgin = this.ctx.getTalent?.(122) === 0;
    const charVirgin = this.hasTalent(122);

    if (!charVirgin && !playerVirgin) {
      this.addExperience(40, 5);
    } else if (charVirgin && playerVirgin) {
      this.addExperience(41, 5);
    }
  }
}

/**
 * Factory function
 */
export async function com30(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  const command = new Com30Command(ctx, character);

  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }

  await command.execute();
}
