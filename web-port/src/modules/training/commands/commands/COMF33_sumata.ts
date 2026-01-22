/**
 * COMF33 - 스마타 (Sumata)
 * 원본: ERB/指導関係/COMF33.ERB
 *
 * 봉사계 커맨드: 조교 대상이 조교자의 성기를 클리토리스로 자극
 */

import type { CommandPlugin } from '../../types';
import type { TrainingContext, SourceValues } from '../../types';
import { SourceModifier } from '../../systems/SourceModifier';
import { PlayerEjaculationHandler } from '../../systems/PlayerEjaculation';

export const COMF33_sumata: CommandPlugin = {
  id: 33,
  name: '스마타',
  category: '봉사',
  staminaCost: 40,

  /**
   * 가용성 판정
   * 원본: COMABLE.ERB @COM_ABLE33
   */
  isAvailable: (context: TrainingContext) => {
    return true;
  },

  /**
   * SOURCE 계산
   * 원본: COMF33.ERB 라인 213-520
   */
  // TODO: Move calculateSource logic to execute
  // calculateSource: (context: TrainingContext): SourceValues => {
    const { target, player } = context;
    const abilities = target.abl;
    const talents = context.talents;
    const playerTalents = context.playerTalents || {};

    // 더럽힘 계산 (라인 142-184)
    let dirtyValue = 0;
    if (context.stain?.player?.[2] & 1) dirtyValue += 1;
    if (context.stain?.player?.[2] & 4) dirtyValue += 3;
    if (context.stain?.player?.[2] & 8) dirtyValue += 7;
    if (context.stain?.player?.[2] & 16) dirtyValue += 1;
    if (context.stain?.player?.[4] & 32) dirtyValue += 3;

    if (talents[61]) dirtyValue = Math.floor(dirtyValue / 3);
    if (talents[62]) dirtyValue = Math.floor(dirtyValue * 2);

    // 스마타에서는 더러움 영향 적음
    dirtyValue = Math.floor(dirtyValue / 3);

    // 기본 SOURCE 설정
    const source: number[] = new Array(19).fill(0);

    // LOSEBASE
    context.loseBase[0] += 40;
    context.loseBase[1] += 130;

    // 봉사정신에 따른 SOURCE
    // 원본: 라인 224-249
    const service = abilities['봉사정신'] || 0;
    const serviceSettings = [
      [200, 100, 4.00],
      [250, 180, 2.50],
      [300, 250, 1.50],
      [350, 350, 1.00],
      [400, 500, 0.50],
      [450, 800, 0.10]
    ][service] || [200, 100, 4.00];

    source[0] = serviceSettings[0];
    source[8] = serviceSettings[1];
    source[11] *= serviceSettings[2];

    // 기교에 따른 배율
    // 원본: 라인 252-271
    const technique = abilities['기교'] || 0;
    const techMult = [0.70, 0.90, 1.00, 1.20, 1.40, 1.60][technique] || 1.00;
    source[0] = Math.floor(source[0] * techMult);
    source[8] = Math.floor(source[8] * techMult);

    // C감각에 따른 쾌C
    // 원본: 라인 273-286
    const cSense = abilities['C감각'] || 0;
    source[1] = [0, 10, 50, 200, 600, 2000][cSense] || 0;

    // 윤활도에 따른 쾌C 및 배율
    // 원본: 라인 288-307
    const lubLevel = context.getParamLevel(context.params[3] || 0);
    const lubMultipliers = [
      [0.30, 0.60],
      [0.60, 0.80],
      [1.00, 1.00],
      [1.50, 1.20],
      [2.00, 1.40],
      [2.50, 1.60]
    ][lubLevel] || [1.00, 1.00];

    source[1] = Math.floor(source[1] * lubMultipliers[0]);
    source[0] = Math.floor(source[0] * lubMultipliers[1]);

    // 사정 게이지 체크
    // 원본: 라인 312-387
    let ejacGauge = [500, 1100, 2000, 3000, 3900, 4600][technique] || 1100;

    // 윤활도 추가
    const lubBonus = [0, 0, 0, 300, 600, 1000][lubLevel] || 0;
    ejacGauge += lubBonus;

    const submission = abilities['종순'] || 0;
    ejacGauge *= [0.80, 0.90, 1.00, 1.10, 1.20, 1.30][submission] || 1.00;

    const serviceTech = abilities['봉사기술'] || 0;
    ejacGauge *= [0.50, 0.80, 1.20, 1.50, 1.80, 2.40][serviceTech] || 1.00;

    const playerCSense = context.player?.abilities?.['C감각'] || 0;
    ejacGauge *= [1.00, 1.50, 2.00, 2.50, 3.50, 5.00][playerCSense] || 1.00;

    if (playerTalents[122] || playerTalents[121]) {
      context.player.base[2] += Math.floor(ejacGauge);
    }

    // 사정 체크
    // 원본: 라인 393-436
    const ejacLevel = PlayerEjaculationHandler.checkLevel(context);

    if (ejacLevel > 0) {
      source[0] *= 2.00;

      const cumAddiction = abilities['정액중독'] || 0;
      const cumSources = [
        [0, 1.50, 1.40],
        [200, 2.00, 1.00],
        [400, 2.50, 0.80],
        [700, 3.00, 0.50],
        [1000, 4.00, 0.20],
        [1500, 5.00, 0.00]
      ][cumAddiction] || [0, 1.50, 1.40];

      source.정애 = cumSources[0];
      source[8] *= cumSources[1];
      source[7] *= cumSources[2];
    }

    // 대량 사정
    // 원본: 라인 438-475
    if (ejacLevel === 2) {
      source.정애 = Math.floor((source.정애 || 0) * 1.50);
      source[8] *= 1.20;
      context.flags[9] = 2; // TFLAG:9 (스마타로 사정)
    } else if (ejacLevel === 1) {
      context.flags[9] = 1;
    }

    // 후타나리라면 굴종 반감
    // 원본: 라인 516-519
    if (playerTalents[121]) {
      source[7] = Math.floor(source[7] / 2);
    }

    return source;
  },

  /**
   * 커맨드 실행
   * 원본: COMF33.ERB 전체
   */
  async execute(context: TrainingContext): Promise<void> {
    const prevCom = context.prevCom || 0;
    const assiPlay = context.assiPlay || 0;

    // 1. 파생 체크
    // 원본: 라인 7-12
    if (assiPlay === 0 && (prevCom === 70 || (context.flags[50] && prevCom === 63))) {
      // TODO: COM70 (더블 스마타)
      context.showMessage('[파생] 더블 스마타 가능');
    }

    // 2. 커맨드명 표시
    context.showMessage('스마타');

    // 3. TODO: TRAIN_MESSAGE_B
    // 원본: 라인 206-207

    // 4. SOURCE 계산 및 적용
    const source = this.calculateSource(context);
    // TODO: applySource

    // 5. 더럽힘 처리
    // 원본: 라인 480-482
    context.stain[3] |= context.stain.player?.[2] || 0;
    if (context.stain.player) context.stain.player[2] |= context.stain[3] || 0;

    // 6. 경험 상승
    // 원본: 라인 487-505
    const isMale = context.talents[122] || 0;
    const isPlayerMale = context.playerTalents?.[122] || 0;

    if (!isMale && !isPlayerMale) {
      context.addExp(40, 7);
    } else if (isMale && isPlayerMale) {
      context.addExp(41, 7);
    }

    if (!assiPlay) {
      context.flags[30] += 1;
    }

    // 애정경험
    if ((context.cflag?.[2] || 0) >= 1000 && !assiPlay) {
      context.addExp(23, 1);
    }

    // 7. 플래그 설정
    context.flags[100] = 1;
    context.flags[200] = 1; // 굴복각인1
  },

  /**
   * 메시지 생성
   */
  // TODO: Move generateMessage logic to execute
  // generateMessage: (context: TrainingContext) => {
    const targetName = context.target.name;
    return `${targetName}이(가) 클리토리스로 당신의 성기를 자극했다.`;
  },
};
