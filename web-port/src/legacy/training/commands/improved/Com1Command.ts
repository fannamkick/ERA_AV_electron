/**
 * COM1 - 커닐링구스
 * 애액 애무 카테고리
 */

import { TrainingCommand, SourceResult } from '../CommandBase';
import { TrainingContext } from '../../types';
import { Character } from '../../../../types/game';

export class Com1Command extends TrainingCommand {
  getName(): string {
    return '커닐링구스';
  }

  getDescription(): string {
    return '혀로 음부를 애무합니다';
  }

  isAvailable(): boolean {
    // 대상이 남성이면 불가 (TALENT:122)
    if (this.hasTalent(122)) {
      return false;
    }

    // 촉수 지도중 불가 (TEQUIP:90)
    if (this.hasEquipment(90)) {
      return false;
    }

    // 슬라임 지도중 불가 (TEQUIP:150)
    if (this.hasEquipment(150)) {
      return false;
    }

    // 삼각목마 기승 중 불가 (TEQUIP:70)
    if (this.hasEquipment(70)) {
      return false;
    }

    // 팬티(1) 또는 하의(16) 착용시 불가 (CFLAG:40 & 17)
    if ((this.character.cflags[40] & 17) !== 0) {
      return false;
    }

    // 검은 스타킹 착용시 불가 (CFLAG:170 == 6 && CFLAG:173 == 0)
    if (this.character.cflags[170] === 6 && this.character.cflags[173] === 0) {
      return false;
    }

    // 기저귀 착용시 불가 (CFLAG:42 == 69 && CFLAG:40 & 64)
    if (this.character.cflags[42] === 69 && (this.character.cflags[40] & 64)) {
      return false;
    }

    // 즈코 인형 착용시 불가 (CFLAG:42 == 11 && CFLAG:40 & 64)
    if (this.character.cflags[42] === 11 && (this.character.cflags[40] & 64)) {
      return false;
    }

    // TODO: 조수 플레이 추가 조건 (나중에 구현)
    // IF (STAIN:2 & 4 || STAIN:2 & 8 || STAIN:2 & 32) && ASSIPLAY
    //   SIF ABL:ASSI:0 <= 3 && TALENT:ASSI:62 && TALENT:ASSI:64 == 0
    //     RETURN 0

    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();

    // SOURCE 계산
    const source = this.calculateSource();

    // Character source에 적용
    this.character.source[0] = source.pleasureC || 0;  // 쾌C
    this.character.source[1] = source.pleasureV || 0;  // 쾌V
    this.character.source[3] = source.lubrication || 0; // 윤활
    this.character.source[4] = source.submission || 0;  // 굴복
    this.character.source[5] = source.lust || 0;       // 욕정
    this.character.source[12] = 100;

    // 메시지 표시
    await this.showTrainMessage();

    // 경험치 획득
    this.gainExperience();

    // BASE 업데이트
    this.ctx.base[0] += 15;  // C감각
    this.ctx.base[2] += 15;  // V감각
    this.ctx.base[1] += 60;  // 욕망
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};

    // 쾌C 계산 (혀 테크닉이 중요)
    const cValues = [50, 200, 600, 1400, 2200, 3200];
    source.pleasureC = this.calculateAbilitySource(0, cValues);

    // 쾌V 계산
    const vValues = [30, 150, 500, 1200, 2000, 3000];
    source.pleasureV = this.calculateAbilitySource(2, vValues);

    // 윤활 (커닐링구스는 윤활 효과 높음)
    source.lubrication = 200;

    // 굴복
    source.submission = 120;

    // 욕정
    source.lust = 100;

    // 소질 기반 수정
    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);

    // 특수 소질 효과

    // M기질
    if (this.hasTalent(85)) {
      source.submission! *= 1.5;
    }

    // S기질
    if (this.hasTalent(86)) {
      source.submission! /= 2;
    }

    // 감도가 높음
    if (this.hasTalent(62)) {
      source.pleasureC! *= 1.3;
      source.pleasureV! *= 1.2;
    }

    return source;
  }

  private async showTrainMessage(): Promise<void> {
    const cSense = this.getAbility(0);
    const vSense = this.getAbility(2);

    if (cSense === 0 && vSense === 0) {
      this.message('서투르게 혀로 음부를 핥는다...');
    } else if (cSense <= 2 || vSense <= 2) {
      this.message('부드럽게 혀로 음부를 자극한다.');
    } else if (cSense <= 4 || vSense <= 4) {
      this.message('숙련된 혀놀림으로 클리토리스와 질을 동시에 자극한다!');
    } else {
      this.message('완벽한 테크닉으로 가장 민감한 곳만을 집중 공략한다!!');
    }

    // 반응 메시지
    const totalPleasure = (this.character.source[0] || 0) + (this.character.source[1] || 0);
    if (totalPleasure >= 3000) {
      this.message('\"아...하앗...!! 거기...너무...!!\"');
    } else if (totalPleasure >= 1500) {
      this.message('\"으음...느껴져...\"');
    }
  }

  private gainExperience(): void {
    // 애무 경험치
    this.addExperience(14, 2);

    // 커닐링구스 경험치
    this.addExperience(51, 5);

    // 순결 경험치
    const playerVirgin = this.ctx.getTalent?.(122) === 0;
    const charVirgin = this.hasTalent(122);

    if (!charVirgin && !playerVirgin) {
      this.addExperience(40, 5);
    } else if (charVirgin && playerVirgin) {
      this.addExperience(41, 5);
    }

    // 페로몬 (호감도 체크)
    if (this.character.cflags[2] >= 1000 && !this.isAssiPlay()) {
      this.addExperience(23, 3);
    }
  }
}

/**
 * Factory function
 */
export async function com1(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  const command = new Com1Command(ctx, character);

  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }

  await command.execute();
}
