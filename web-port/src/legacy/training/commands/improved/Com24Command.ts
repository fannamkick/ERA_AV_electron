/**
 * COM24 - 역강간
 * 삽입 카테고리 - 대상이 플레이어를 역강간
 */

import { TrainingCommand, SourceResult } from '../CommandBase';
import { TrainingContext } from '../../types';
import { Character } from '../../../../types/game';

export class Com24Command extends TrainingCommand {
  getName(): string {
    return '역강간';
  }

  getDescription(): string {
    return '대상이 플레이어의 질에 삽입합니다';
  }

  isAvailable(): boolean {
    // 대상이 페니스를 가지고 있어야 함
    if (!this.hasTalent(121) && !this.hasTalent(122)) {
      return false;
    }

    // 플레이어가 여성이어야 함 (또는 후타나리)
    if (this.ctx.getTalent?.(119)) { // 플레이어가 무성
      return false;
    }

    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();

    const source = this.calculateSource();

    this.character.source[0] = source.pleasureC || 0;
    this.character.source[3] = 550;
    this.character.source[4] = source.submission || 0;
    this.character.source[12] = 1200;
    this.character.source[13] = 1000;
    this.character.source[14] = 800;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[0] += 40;
    this.ctx.base[1] += 75;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};

    // C감각 기반
    const cValues = [800, 1400, 2000, 2500, 2900, 3200];
    source.pleasureC = this.calculateAbilitySource(0, cValues);

    // 플레이어 기교에 따른 수정
    const playerSkill = this.ctx.getAbility?.(12) || 0;
    const skillMultipliers = [0.5, 0.8, 1.0, 1.5, 2.5, 3.0];
    const subValues = [1600, 1900, 2300, 2700, 3100, 3500];

    source.pleasureC! *= skillMultipliers[Math.min(playerSkill, 5)];
    source.submission = subValues[Math.min(playerSkill, 5)];

    // 플레이어 V감각에 따른 수정
    const playerVSense = this.ctx.getAbility?.(4) || 0;
    const vMultipliers = [0.5, 0.8, 1.0, 1.2, 1.5, 2.0];
    source.pleasureC! *= vMultipliers[Math.min(playerVSense, 5)];

    // 대상이 남성이 아닌 경우
    if (!this.hasTalent(122)) {
      source.fear = 1200;
    }

    // 플레이어가 처녀인 경우
    if (this.ctx.getTalent?.(0)) {
      source.antipathy = (source.antipathy || 0) * 20;
      source.fear = (source.fear || 800) * 3;
    }

    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('플레이어의 몸 위에 올라탄다...');

    const cSense = this.getAbility(0);

    if (cSense === 0) {
      this.message('"...조이는 느낌이..."');
    } else if (cSense <= 2) {
      this.message('"...기분 좋아..."');
    } else if (cSense <= 4) {
      this.message('"으...질 안이...느껴져...!!"');
    } else {
      this.message('"너무...조여와...!!"');
    }
  }

  private gainExperience(): void {
    // 레즈/호모 경험
    const playerVirgin = this.ctx.getTalent?.(122) === 0;
    const charVirgin = this.hasTalent(122);

    if (!charVirgin && !playerVirgin) {
      this.addExperience(40, 4);
    } else if (charVirgin && playerVirgin) {
      this.addExperience(41, 4);
    }

    // 성교 경험
    this.addExperience(5, 1);

    // 애정 경험
    if (this.character.cflags[2] >= 1000 && !this.isAssiPlay()) {
      const affAmount = this.hasTalent(1) ? 50 : 4;
      this.addExperience(23, affAmount);
    }
  }
}

export async function com24(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  const command = new Com24Command(ctx, character);

  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }

  await command.execute();
}
