/**
 * COM10 - 로터
 * 도구 카테고리 - 전동 로터로 자극
 */

import { TrainingCommand, SourceResult } from '../CommandBase';
import { TrainingContext } from '../../types';
import { Character } from '../../../../types/game';

export class Com10Command extends TrainingCommand {
  getName(): string {
    return '로터';
  }

  getDescription(): string {
    return '전동 로터로 클리토리스를 자극합니다';
  }

  isAvailable(): boolean {
    // 로터 아이템 보유 필요 (ITEM:0)
    if (!this.ctx.items || this.ctx.items[0] === undefined || this.ctx.items[0] <= 0) {
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
    this.character.source[17] = source.pleasureB || 0;
    this.character.source[3] = source.lubrication || 0;
    this.character.source[4] = source.submission || 0;
    this.character.source[5] = source.lust || 0;
    this.character.source[12] = 100;

    // 장비 플래그 설정 (로터 장착)
    this.character.equipment[90] = 1;

    // 메시지 표시
    await this.showTrainMessage();

    // 경험치 획득
    this.gainExperience();

    // BASE 업데이트
    this.ctx.base[0] += 20;  // C감각
    this.ctx.base[1] += 40;  // 욕망
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};

    // 쾌C 계산 (로터는 강력한 C쾌감)
    const cValues = [150, 500, 1200, 2200, 3500, 5000];
    source.pleasureC = this.calculateAbilitySource(0, cValues);

    // 쾌B 계산
    const bValues = [20, 80, 300, 700, 1200, 1800];
    source.pleasureB = this.calculateAbilitySource(1, bValues);

    // 윤활
    source.lubrication = 180;

    // 굴복 (도구 사용의 굴욕감)
    source.submission = 140;

    // 욕정
    source.lust = 120;

    // 소질 기반 수정
    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);

    // 특수 소질 효과

    // M기질
    if (this.hasTalent(85)) {
      source.submission! *= 1.5;
      source.pleasureC! *= 1.2;
    }

    // 감도가 높음
    if (this.hasTalent(62)) {
      source.pleasureC! *= 1.5;  // 도구는 효과가 더 큼
    }

    // 조루 체질
    if (this.hasTalent(80)) {
      source.pleasureC! *= 1.3;
    }

    return source;
  }

  private async showTrainMessage(): Promise<void> {
    const cSense = this.getAbility(0);

    this.message('전동 로터를 클리토리스에 밀착시킨다...');

    if (cSense === 0) {
      this.message('\"으...윙윙...뭔가...이상해...\"');
    } else if (cSense <= 2) {
      this.message('\"아앗...! 진동이...느껴져...!!\"');
    } else if (cSense <= 4) {
      this.message('\"으아앗! 클리가...계속 자극받아...!!\"');
    } else {
      this.message('\"안돼...이거...너무 강해...이대로면...!!\"');
    }

    // 반응 메시지
    if (this.character.source[0] >= 3000) {
      this.message('온몸이 떨리며 쾌감에 몸을 맡긴다...');
    } else if (this.character.source[0] >= 1500) {
      this.message('클리토리스가 진동에 부풀어 오른다.');
    }
  }

  private gainExperience(): void {
    // 도구 사용 경험치
    this.addExperience(15, 3);

    // 로터 경험치
    this.addExperience(52, 5);

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

    // 페로몬
    if (this.character.cflags[2] >= 1000 && !this.isAssiPlay()) {
      this.addExperience(23, 3);
    }
  }
}

/**
 * Factory function
 */
export async function com10(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  const command = new Com10Command(ctx, character);

  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }

  await command.execute();
}
