/**
 * COM12 - E마사지기
 * 도구 카테고리 - 전동 마사지기로 클리토리스 자극
 */

import { TrainingCommand, SourceResult } from '../CommandBase';
import { TrainingContext } from '../../types';
import { Character } from '../../../../types/game';

export class Com12Command extends TrainingCommand {
  getName(): string {
    return 'E마사지기';
  }

  getDescription(): string {
    return '전동 마사지기로 클리토리스를 강하게 자극합니다';
  }

  isAvailable(): boolean {
    // E마사지기 아이템 보유 필요 (ITEM:2)
    if (!this.ctx.items || this.ctx.items[2] === undefined || this.ctx.items[2] <= 0) {
      return false;
    }

    // 하반신 노출 필수
    if (!this.bottomNaked()) {
      return false;
    }

    // 의식 필수
    if (this.character.cflags[16] === -1) {
      return false;
    }

    // 정조대 착용 시 불가
    if (this.character.cflags[42] === 79) {
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
    this.character.source[0] = source.pleasureC || 0;
    this.character.source[12] = 120;
    this.character.source[14] = 400;

    // 메시지 표시
    await this.showTrainMessage();

    // 경험치 획득
    this.gainExperience();

    // BASE 업데이트
    this.ctx.base[0] += 30;  // C감각
    this.ctx.base[1] += 150; // 욕망
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};

    // 쾌C 계산 (E마사지기는 모든 레벨에서 강력)
    const cValues = [2000, 2500, 3000, 3300, 3600, 3800];
    source.pleasureC = this.calculateAbilitySource(0, cValues);

    // 소질 기반 수정
    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);

    // M기질
    if (this.hasTalent(85)) {
      source.pleasureC! *= 1.3;
    }

    // 감도가 높음
    if (this.hasTalent(62)) {
      source.pleasureC! *= 1.5;
    }

    // 조루 체질
    if (this.hasTalent(80)) {
      source.pleasureC! *= 1.4;
    }

    return source;
  }

  private async showTrainMessage(): Promise<void> {
    const cSense = this.getAbility(0);

    this.message('강력한 진동의 마사지기를 클리토리스에 밀착시킨다!');

    if (cSense === 0) {
      this.message('"으아앗...! 뭐...뭔가...엄청나...!!"');
    } else if (cSense <= 2) {
      this.message('"안돼...! 진동이...너무 강해...!!"');
    } else if (cSense <= 4) {
      this.message('"으아아아...!! 클리가...완전히...!!"');
    } else {
      this.message('"안돼안돼안돼...!! 이거...미쳐버려...!!"');
    }

    // 반응 메시지
    if (this.character.source[0] >= 3000) {
      this.message('강렬한 쾌감에 전신을 떨며 경련한다!!');
    } else if (this.character.source[0] >= 2000) {
      this.message('클리토리스가 크게 부풀어 올라 있다...');
    }
  }

  private gainExperience(): void {
    // 도구 사용 경험치
    this.addExperience(15, 3);

    // 애무 경험치
    this.addExperience(14, 2);

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
export async function com12(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  const command = new Com12Command(ctx, character);

  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }

  await command.execute();
}
