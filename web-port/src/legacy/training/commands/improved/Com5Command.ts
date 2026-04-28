/**
 * COM5 - 가슴애무
 * 애무 카테고리 - 손과 입으로 가슴 자극
 */

import { TrainingCommand, SourceResult } from '../CommandBase';
import { TrainingContext } from '../../types';
import { Character } from '../../../../types/game';

export class Com5Command extends TrainingCommand {
  getName(): string {
    return '가슴애무';
  }

  getDescription(): string {
    return '손과 입으로 가슴을 애무합니다';
  }

  isAvailable(): boolean {
    // 남성이면 불가 (TALENT:122)
    if (this.hasTalent(122)) {
      return false;
    }

    // 즈코 인형 착용시 불가 (CFLAG:42 == 11 && CFLAG:40 & 64)
    if (this.character.cflags[42] === 11 && (this.character.cflags[40] & 64)) {
      return false;
    }

    // FLAG:37 (착의 시스템) ON인 경우
    if (this.ctx.flags?.[37]) {
      // 상의가 벗겨지거나, 상반신이 드러난 경우가 아니면 안됨
      // CFLAG:40 & 128 (상의 벗겨짐) OR !(CFLAG:40 & 4) (상의 미착용)
      if (!((this.character.cflags[40] & 128) || !(this.character.cflags[40] & 4))) {
        return false;
      }

      // 브라를 장착하고 있으면 안됨 (CFLAG:40 & 2)
      if (this.character.cflags[40] & 2) {
        return false;
      }
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
    this.character.source[3] = source.lubrication || 0; // 윤활
    this.character.source[4] = source.submission || 0;  // 굴복
    this.character.source[5] = source.lust || 0;       // 욕정
    this.character.source[8] = source.comfort || 0;    // 안심
    this.character.source[12] = 100;

    // 메시지 표시
    await this.showTrainMessage();

    // 경험치 획득
    this.gainExperience();

    // BASE 업데이트
    this.ctx.base[0] += 5;   // C감각
    this.ctx.base[1] += 50;  // 욕망
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};

    // 쾌B 계산 (B감각 레벨에 따라)
    const bValues = [20, 100, 500, 1200, 2000, 2800];
    source.pleasureB = this.calculateAbilitySource(1, bValues);

    // 윤활
    const lubValues = [50, 100, 160, 200, 230, 250];
    source.lubrication = this.calculateAbilitySource(1, lubValues);

    // 안심
    source.comfort = 20;

    // 굴복
    source.submission = 60;

    // 욕정
    source.lust = 80;

    // 소질 기반 수정
    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);

    // 특수 소질 효과

    // 유아퇴행 (플레이어 소질)
    if (this.ctx.getTalent?.(131)) {
      source.pleasureB! *= 1.2;
      source.lubrication! *= 1.2;
    }

    // 유치 (플레이어 소질)
    if (this.ctx.getTalent?.(132)) {
      source.pleasureB! *= 1.2;
      source.lubrication! *= 1.2;
    }

    // 혀놀림 (플레이어 소질)
    if (this.ctx.getTalent?.(52)) {
      source.pleasureB! *= 1.4;
      source.comfort! += Math.floor(source.pleasureB! / 20);
    }

    // M기질
    if (this.hasTalent(85)) {
      source.submission! *= 1.5;
    }

    // 감도가 높음
    if (this.hasTalent(62)) {
      source.pleasureB! *= 1.3;
    }

    // 모유체질
    if (this.hasTalent(70)) {
      source.pleasureB! *= 1.2;
    }

    return source;
  }

  private async showTrainMessage(): Promise<void> {
    const bSense = this.getAbility(1);

    this.message('부드럽게 가슴을 주물러 자극한다...');

    // 가슴 더러움 상태 확인 후 입 사용 여부 결정
    const chestStain = this.character.stain?.[5] || 0;
    const canUseMouth = chestStain < 2 || chestStain === 16 || chestStain === 17;

    if (canUseMouth && this.ctx.getTalent?.(52)) {
      this.message('숙련된 혀놀림으로 유두를 자극한다!');
    }

    if (bSense === 0) {
      this.message('"으...가슴이...간지러워..."');
    } else if (bSense <= 2) {
      this.message('"아...유두가...느껴져..."');
    } else if (bSense <= 4) {
      this.message('"으앗...! 가슴만으로...이렇게...!!"');
    } else {
      this.message('"안돼...유두...너무 민감해져...!!"');
    }

    // 반응 메시지
    if (this.character.source[17] >= 2000) {
      this.message('유두가 완전히 발기해 있다...');
    } else if (this.character.source[17] >= 1000) {
      this.message('가슴이 붉게 물들어 있다.');
    }

    // 모유체질 추가 메시지
    if (this.hasTalent(70)) {
      this.message('가슴에서 젖이 흘러나온다...');
    }
  }

  private gainExperience(): void {
    // 애무 경험치
    this.addExperience(14, 2);

    // 가슴애무 경험치
    this.addExperience(48, 5);

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
export async function com5(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  const command = new Com5Command(ctx, character);

  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }

  await command.execute();
}
