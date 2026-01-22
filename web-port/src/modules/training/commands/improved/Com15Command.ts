/**
 * COM15 - 니플캡
 * 니플캡으로 유두를 자극합니다
 */

import { TrainingCommand, SourceResult } from '../CommandBase';
import { TrainingContext } from '../../types';
import { Character } from '../../../../types/game';

export class Com15Command extends TrainingCommand {
  getName(): string {
    return '니플캡';
  }

  getDescription(): string {
    return '니플캡으로 유두를 자극합니다';
  }

  isAvailable(): boolean {
    // 니플캡 아이템 보유 필요 (ITEM:8)
    if (!this.ctx.items || this.ctx.items[8] === undefined || this.ctx.items[8] <= 0) {
      return false;
    }

    // 상반신 노출 필수
    if (!this.topNaked()) {
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
    this.character.source[17] = source.pleasureB || 0;  // 쾌B
    this.character.source[12] = 120;
    this.character.source[14] = 70;

    // 메시지 표시
    await this.showTrainMessage();

    // 경험치 획득
    this.gainExperience();

    // BASE 업데이트
    this.ctx.base[0] += 20;  // B감각
    this.ctx.base[1] += 70;  // 욕망
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};

    // 쾌B 계산 (B감각 기반)
    const bValues = [100, 300, 800, 1500, 2300, 2900];
    source.pleasureB = this.calculateAbilitySource(1, bValues);

    // 소질 기반 수정
    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);

    // 유두약함
    if (this.hasTalent(110)) {
      source.pleasureB! *= 1.5;
    }

    // B민감
    if (this.hasTalent(108)) {
      source.pleasureB! *= 1.5;
    } else if (this.hasTalent(107)) {
      // B둔감
      source.pleasureB! *= 0.6;
    }

    return source;
  }

  private async showTrainMessage(): Promise<void> {
    const bSense = this.getAbility(1);

    this.message('양쪽 유두에 니플캡을 장착한다...');

    if (bSense === 0) {
      this.message('"으...! 유두가...!?"');
    } else if (bSense <= 2) {
      this.message('"아...유두가...진동으로..."');
    } else if (bSense <= 4) {
      this.message('"으아앗...! 유두만...너무 자극적이야...!!"');
    } else {
      this.message('"안돼...! 유두만으로...이렇게 느껴져...!!"');
    }

    // 반응 메시지
    if (this.character.source[17] >= 2000) {
      this.message('니플캡의 진동이 유두를 끊임없이 자극한다...');
    }
  }

  private gainExperience(): void {
    // 레즈/호모 경험
    const playerVirgin = this.ctx.getTalent?.(122) === 0;
    const charVirgin = this.hasTalent(122);

    if (!charVirgin && !playerVirgin) {
      this.addExperience(40, 1);
    } else if (charVirgin && playerVirgin) {
      this.addExperience(41, 1);
    }
  }
}

/**
 * Factory function
 */
export async function com15(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  const command = new Com15Command(ctx, character);

  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }

  await command.execute();
}
