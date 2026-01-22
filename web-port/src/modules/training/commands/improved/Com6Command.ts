/**
 * COM6 - 키스
 * 애무 카테고리 - 입술에 키스
 */

import { TrainingCommand, SourceResult } from '../CommandBase';
import { TrainingContext } from '../../types';
import { Character } from '../../../../types/game';

export class Com6Command extends TrainingCommand {
  getName(): string {
    return '키스한다';
  }

  getDescription(): string {
    return '입술에 키스합니다';
  }

  isAvailable(): boolean {
    // 조수 플레이 시: 입이 더러우면서 악취민감+従順3 이하인 경우 불가
    if (this.isAssiPlay()) {
      const stain0 = this.ctx.stain?.[0] || 0;
      const assiSubmission = this.ctx.getAbility?.(10) || 0;
      const assiSmellSensitive = this.ctx.getTalent?.(62) || false;
      const assiIgnoreDirt = this.ctx.getTalent?.(64) || false;

      // 입이 애액, 정액, 항문, 소변으로 더러움
      if ((stain0 & 1) || (stain0 & 4) || (stain0 & 8) || (stain0 & 32)) {
        // 악취민감 AND 従順3 이하 AND 불결무시 아님
        if (assiSmellSensitive && assiSubmission <= 3 && !assiIgnoreDirt) {
          return false;
        }
      }
    }

    // 봉사 안함 소질 보유 시 불가 (TALENT:151)
    if (this.hasTalent(151)) {
      return false;
    }

    // 볼개그 사용중 불가 (TEQUIP:45)
    if (this.hasEquipment(45)) {
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

    // 안면기승 플레이중 불가 (TEQUIP:55)
    if (this.hasEquipment(55)) {
      return false;
    }

    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = '키스';

    // SOURCE 계산
    const source = this.calculateSource();

    // Character source에 적용
    this.character.source[3] = source.lubrication || 0; // 윤활
    this.character.source[4] = source.submission || 0;  // 굴복
    this.character.source[5] = source.lust || 0;       // 욕정
    this.character.source[7] = source.love || 0;       // 애정
    this.character.source[8] = source.comfort || 0;    // 안심
    this.character.source[12] = 100;
    this.character.source[16] = source.habit || 0;     // 습관

    // 메시지 표시
    await this.showTrainMessage();

    // 경험치 획득
    this.gainExperience();

    // BASE 업데이트
    this.ctx.base[1] += 30;  // 욕망
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};

    // 키스 기본 효과
    source.lubrication = 100;
    source.submission = 80;
    source.lust = 100;
    source.love = 50;
    source.comfort = 30;
    source.habit = 20;

    // 소질 기반 수정
    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);

    // 특수 소질 효과

    // 키스마
    if (this.hasTalent(79)) {
      source.lust! *= 1.5;
      source.love! *= 1.3;
    }

    // 사랑
    if (this.hasTalent(85)) {
      source.love! *= 2.0;
      source.comfort! *= 1.5;
    }

    // 봉사정신
    const serviceLevel = this.getAbility(16);
    if (serviceLevel > 0) {
      source.submission! += serviceLevel * 10;
      source.comfort! += serviceLevel * 5;
    }

    // 키스숙련 (플레이어 소질)
    if (this.ctx.getTalent?.(53)) {
      source.lust! *= 1.4;
      source.love! *= 1.3;
      source.habit! += 30;
    }

    // 혀놀림 (플레이어 소질)
    if (this.ctx.getTalent?.(52)) {
      source.lust! *= 1.3;
      source.lubrication! *= 1.2;
    }

    // 욕망 레벨에 따른 보정
    const desireLevel = this.getAbility(11);
    if (desireLevel > 0) {
      source.lust! += desireLevel * 15;
      source.lubrication! += desireLevel * 10;
    }

    return source;
  }

  private async showTrainMessage(): Promise<void> {
    const desireLevel = this.getAbility(11);
    const hasLove = this.hasTalent(85);

    // 첫 키스 여부 확인
    const isFirstKiss = this.character.cflags[101] !== 1;

    if (isFirstKiss) {
      this.message('첫 키스를 빼앗는다...');
      this.character.cflags[101] = 1;  // 첫 키스 플래그
    }

    this.message('부드럽게 입술을 포갠다...');

    if (this.ctx.getTalent?.(53)) {
      this.message('능숙한 키스로 상대의 마음을 녹인다.');
    }

    if (hasLove) {
      this.message('"...좋아..."');
      this.message('애정이 담긴 눈빛으로 바라본다.');
    } else if (desireLevel === 0) {
      this.message('"음...음..."');
    } else if (desireLevel <= 2) {
      this.message('"하...키스...기분 좋아..."');
    } else if (desireLevel <= 4) {
      this.message('"음...더...키스해 줘..."');
    } else {
      this.message('"응...혀...넣어 줘..."');
      this.message('스스로 혀를 내밀어 깊은 키스를 요구한다...');
    }

    // 반응 메시지
    if (this.character.source[7] >= 100) {
      this.message('황홀한 표정으로 키스를 받아들인다.');
    }

    // 키스마 추가 메시지
    if (this.hasTalent(79)) {
      this.message('키스만으로도 크게 흥분하고 있다...');
    }
  }

  private gainExperience(): void {
    // 키스 경험치
    this.addExperience(47, 5);

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
export async function com6(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  const command = new Com6Command(ctx, character);

  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }

  await command.execute();
}
