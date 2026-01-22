/**
 * COM0 - C감각 애무
 * 클리토리스를 집중적으로 애무하여 C쾌감을 올립니다
 */

import { TrainingCommand, SourceResult } from '../CommandBase';
import { TrainingContext } from '../../types';
import { Character } from '../../../../types/game';
import { checkCommandAvailable } from '../commandConditions';

export class Com0Command extends TrainingCommand {
  getName(): string {
    return 'C감각 애무';
  }

  getDescription(): string {
    return '클리토리스를 애무하여 C쾌감을 올립니다';
  }

  isAvailable(): boolean {
    // commandConditions.ts에서 중앙화된 조건 체크 사용
    return checkCommandAvailable(0, this.ctx, this.character);
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();

    // === SOURCE 계산 ===
    const source = this.calculateSource();

    // Character source에 적용
    this.character.source[0] = source.pleasureC;      // 쾌C
    this.character.source[17] = source.pleasureB;     // 쾌B
    this.character.source[3] = source.lubrication;    // 윤활
    this.character.source[4] = source.submission;     // 굴복 (성행동)
    this.character.source[8] = source.comfort || 30;  // 안심 (불결)
    this.character.source[12] = 100;                  // 반감 (노출)

    // 메시지 표시 (train_message_b 호출 필요)
    await this.showTrainMessage();

    // === 경험치 획득 ===
    this.gainExperience();

    // === BASE 업데이트 ===
    this.ctx.base[0] += 5;   // C감각 BASE 증가
    this.ctx.base[1] += 50;  // 욕망 BASE 증가
  }

  /**
   * SOURCE 값 계산
   */
  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};

    // === 쾌C 계산 (능력치 기반) ===
    const cSense = this.getAbility(0); // C감각
    const cValues = [20, 100, 500, 1200, 2000, 2800]; // 레벨별 쾌C
    source.pleasureC = this.calculateAbilitySource(0, cValues);

    // === 윤활 계산 (C감각 기반) ===
    const lubValues = [25, 50, 80, 100, 115, 125];
    source.lubrication = this.calculateAbilitySource(0, lubValues);

    // === 쾌B 계산 (B감각 기반) ===
    const bSense = this.getAbility(1); // B감각
    const bValues = [15, 50, 300, 700, 1100, 1600];
    source.pleasureB = this.calculateAbilitySource(1, bValues);

    // B감각에 의한 윤활 추가
    const bLubValues = [25, 50, 80, 100, 115, 125];
    source.lubrication! += this.calculateAbilitySource(1, bLubValues);

    // === 기본 값 설정 ===
    source.submission = 60;  // 굴복
    source.lust = 30;        // 욕정

    // === 특수 조건 처리 ===

    // 볼개그 착용 시
    if (this.character.equipment[45]) {
      source.lust = 0;
      source.pleasureC! /= 2;
      source.lubrication! /= 4;
      source.pleasureB! /= 2;
    }
    // 기절 상태 (실제로는 isAvailable에서 막히지만 방어적 코딩)
    else if (this.character.cflags[16] === -1) {
      source.lust = 0;
      source.pleasureC! /= 2;
      source.lubrication! /= 4;
      source.pleasureB! /= 2;
    }
    // 정상 상태
    else {
      // 소질 기반 수정
      const modified = this.applySourceModifiers(source);
      Object.assign(source, modified);

      // 플레이어 얼룩 (stain) 처리
      if (this.ctx.playerStain[0]) {
        source.lust! *= 1.5;
      }

      // 얼룩 동기화
      this.ctx.stain[0] |= this.ctx.playerStain[0];
      this.ctx.playerStain[0] |= this.ctx.stain[0];
    }

    // === 장비 효과 ===

    // 바이브레이터 (equipment[89])
    if (this.character.equipment[89]) {
      // 바이브 장착 시 효과 증폭
      source.pleasureC! *= 1.5;
    }

    // 로터 (equipment[90])
    if (this.character.equipment[90]) {
      this.ctx.stain[1] |= 2;
      this.ctx.stain[1] |= 4;
      this.ctx.stain[5] |= 2;
      this.ctx.stain[5] |= 4;
    } else {
      this.ctx.stain[3] |= this.ctx.playerStain[1];
      this.ctx.playerStain[1] |= this.ctx.stain[3];
      this.ctx.stain[5] |= this.ctx.playerStain[1];
      this.ctx.playerStain[1] |= this.ctx.stain[5];
    }

    return source;
  }

  /**
   * 훈련 메시지 표시
   */
  private async showTrainMessage(): Promise<void> {
    // TODO: train_message_b 호출
    // 현재는 간단한 메시지만 표시

    const cSense = this.getAbility(0);
    const bSense = this.getAbility(1);

    if (cSense === 0) {
      this.message('서투른 손길이지만 클리토리스를 조심스럽게 애무한다...');
    } else if (cSense <= 2) {
      this.message('클리토리스를 능숙하게 자극한다.');
    } else if (cSense <= 4) {
      this.message('숙련된 애무에 몸이 반응한다!');
    } else {
      this.message('완벽한 테크닉으로 클리토리스를 자극한다!!');
    }

    if (bSense >= 3) {
      this.message('가슴도 함께 애무하여 쾌감이 배가된다...');
    }
  }

  /**
   * 경험치 획득
   */
  private gainExperience(): void {
    // 순결 경험치
    const playerVirgin = this.ctx.getTalent?.(122) === 0; // 플레이어 순결
    const charVirgin = this.hasTalent(122); // 캐릭터 순결

    if (!charVirgin && !playerVirgin) {
      this.addExperience(40, 5); // 상호 비순결
    } else if (charVirgin && playerVirgin) {
      this.addExperience(41, 5); // 상호 순결
    }

    // 애무 경험치
    this.addExperience(14, 1);

    // 페로몬 경험치 (호감도 1000 이상)
    if (this.character.cflags[2] >= 1000 && !this.isAssiPlay()) {
      this.addExperience(23, 2);
    }
  }
}

/**
 * Factory function for backward compatibility
 */
export async function com0(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  const command = new Com0Command(ctx, character);

  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }

  await command.execute();
}
