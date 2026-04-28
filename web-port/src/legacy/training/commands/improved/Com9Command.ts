/**
 * COM9 - 애널핥기
 * 혀로 항문을 자극합니다
 */

import { TrainingCommand, SourceResult } from '../CommandBase';
import { TrainingContext } from '../../types';
import { Character } from '../../../../types/game';

export class Com9Command extends TrainingCommand {
  getName(): string {
    return '애널핥기';
  }

  getDescription(): string {
    return '혀로 항문을 자극합니다';
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

    // SOURCE 계산
    const source = this.calculateSource();

    // Character source에 적용
    this.character.source[2] = source.pleasureA || 0;  // 쾌A
    this.character.source[10] = 50;
    this.character.source[12] = 300;
    this.character.source[14] = 500;

    // 메시지 표시
    await this.showTrainMessage();

    // 경험치 획득
    this.gainExperience();

    // BASE 업데이트
    this.ctx.base[0] += 5;   // A감각
    this.ctx.base[1] += 50;  // 욕망

    // 얼룩 처리
    this.handleStains();
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};

    // 쾌A 계산 (A감각 기반)
    const aValues = [5, 50, 200, 500, 1000, 1800];
    source.pleasureA = this.calculateAbilitySource(3, aValues);

    // 소질 기반 수정
    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);

    // 혀놀림 소질 (플레이어)
    if (this.ctx.getTalent?.(52)) {
      source.pleasureA! *= 2.0;
    }

    return source;
  }

  private async showTrainMessage(): Promise<void> {
    const aSense = this.getAbility(3);

    this.message('혀로 항문을 핥는다...');

    if (aSense === 0) {
      this.message('"으...! 이상한 느낌..."');
    } else if (aSense <= 2) {
      this.message('"아...항문이...자극받아..."');
    } else if (aSense <= 4) {
      this.message('"으아앗...! 거기...느껴져...!!"');
    } else {
      this.message('"안돼...항문만으로...이렇게...!!"');
    }

    // 반응 메시지
    if (this.character.source[2] >= 800) {
      this.message('항문이 민감하게 반응한다...');
    }
  }

  private gainExperience(): void {
    // 레즈/호모 경험
    if (this.hasTalent(122) === false && this.ctx.getTalent?.(122) === 0) {
      this.addExperience(40, 3);
    }

    // A경험
    this.addExperience(1, 1);
  }

  private handleStains(): void {
    // 얼룩 처리: 항문 <-> 플레이어의 입
    this.ctx.stain[4] = (this.ctx.stain[4] || 0) | (this.ctx.playerStain[0] || 0);
    this.ctx.playerStain[0] = (this.ctx.playerStain[0] || 0) | (this.ctx.stain[4] || 0);
  }
}

/**
 * Factory function
 */
export async function com9(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  const command = new Com9Command(ctx, character);

  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }

  await command.execute();
}
