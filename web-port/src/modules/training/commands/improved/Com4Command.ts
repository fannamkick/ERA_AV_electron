/**
 * COM4 - 펠라
 * 구강으로 성기를 자극합니다
 */

import { TrainingCommand, SourceResult } from '../CommandBase';
import { TrainingContext } from '../../types';
import { Character } from '../../../../types/game';

export class Com4Command extends TrainingCommand {
  getName(): string {
    return '펠라';
  }

  getDescription(): string {
    return '입으로 성기를 자극합니다';
  }

  isAvailable(): boolean {
    // 조수 플레이 시: 성기가 더러우면서 악취민감+従順3 이하인 경우 불가
    if (this.isAssiPlay()) {
      const stain2 = this.ctx.stain?.[2] || 0;
      const stain0 = this.ctx.stain?.[0] || 0;
      const assiSubmission = this.ctx.getAbility?.(10) || 0;
      const assiSmellSensitive = this.ctx.getTalent?.(62) || false;
      const assiIgnoreDirt = this.ctx.getTalent?.(64) || false;

      // 성기가 애액, 정액, 항문, 소변으로 더러움
      if ((stain2 & 1) || (stain2 & 4) || (stain2 & 8) || (stain0 & 32)) {
        // 악취민감 AND 従順3 이하 AND 불결무시 아님
        if (assiSmellSensitive && assiSubmission <= 3 && !assiIgnoreDirt) {
          return false;
        }
      }
    }

    // 대상이 남성 또는 후타나리가 아니면 불가 (TALENT:121 == 0 && TALENT:122 == 0)
    const isFutanari = this.hasTalent(121);
    const isMale = this.hasTalent(122);
    if (!isFutanari && !isMale) {
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

    // 수간 플레이중 불가 (TEQUIP:89)
    if (this.hasEquipment(89)) {
      return false;
    }

    // 삼각목마 기승 중 불가 (TEQUIP:70)
    if (this.hasEquipment(70)) {
      return false;
    }

    // 안면기승 플레이중 불가 (TEQUIP:55)
    if (this.hasEquipment(55)) {
      return false;
    }

    // 팬티(1) 또는 하의(16) 착용시 불가 (CFLAG:40 & 1 or & 16)
    if ((this.character.cflags[40] & 1) || (this.character.cflags[40] & 16)) {
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

    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();

    // SOURCE 계산
    const source = this.calculateSource();

    // Character source에 적용
    this.character.source[0] = source.pleasureC || 0;  // 쾌C
    this.character.source[12] = 220;
    this.character.source[14] = source.depression || 0;

    // 메시지 표시
    await this.showTrainMessage();

    // 경험치 획득
    this.gainExperience();

    // BASE 업데이트
    this.ctx.base[0] += 5;   // C감각
    this.ctx.base[1] += 50;  // 욕망

    // 얼룩 처리
    this.handleStains();
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};

    // 쾌C 계산 (C감각 기반)
    const cValues = [50, 200, 800, 1600, 2400, 3200];
    source.pleasureC = this.calculateAbilitySource(0, cValues);

    source.depression = 50;

    // 소질 기반 수정
    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);

    // 혀놀림 소질 (플레이어) - TALENT:52
    if (this.ctx.getTalent?.(52)) {
      source.pleasureC! *= 2.0;
    }

    return source;
  }

  private async showTrainMessage(): Promise<void> {
    const cSense = this.getAbility(0);

    if (cSense === 0) {
      this.message('서투른 입놀림으로 조심스럽게 자극한다...');
    } else if (cSense <= 2) {
      this.message('부드럽게 입으로 자극한다.');
    } else if (cSense <= 4) {
      this.message('숙련된 구강 테크닉으로 쾌감을 준다!');
    } else {
      this.message('완벽한 구강 기술로 극한의 쾌감을 선사한다!!');
    }
  }

  private gainExperience(): void {
    // 레즈/호모 경험치
    const playerVirgin = this.ctx.getTalent?.(122) === 0;
    const charVirgin = this.hasTalent(122);

    if (!charVirgin && !playerVirgin) {
      this.addExperience(40, 3);
    } else if (charVirgin && playerVirgin) {
      this.addExperience(41, 3);
    }

    // 애정 경험치
    const e = charVirgin ? 2 : 1;
    if (this.character.cflags[2] >= 1000 && !this.isAssiPlay()) {
      this.addExperience(23, e);
    }
  }

  private handleStains(): void {
    // 얼룩 처리: 캐릭터의 성기 <-> 플레이어의 입
    this.ctx.stain[2] = (this.ctx.stain[2] || 0) | (this.ctx.playerStain[0] || 0);
    this.ctx.playerStain[0] = (this.ctx.playerStain[0] || 0) | (this.ctx.stain[2] || 0);
  }
}

/**
 * Factory function
 */
export async function com4(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  const command = new Com4Command(ctx, character);

  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }

  await command.execute();
}
