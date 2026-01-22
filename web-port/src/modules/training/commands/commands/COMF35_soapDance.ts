/**
 * COMF35 - 거품춤 (Soap Dance)
 * 원본: ERB/指導関係/COMF35.ERB
 *
 * 봉사계 커맨드: 조교 대상이 조교자의 성기를 클리토리스와 질로 자극
 * 주로 굴종과 일탈을 올리는 커맨드
 */

import type { CommandPlugin } from '../../types';
import type { TrainingContext, SourceValues } from '../../types';
import { SourceModifier } from '../../systems/SourceModifier';
import { PlayerEjaculationHandler } from '../../systems/PlayerEjaculation';

export const COMF35_soapDance: CommandPlugin = {
  id: 35,
  name: '거품춤',
  category: '봉사',
  staminaCost: 30,

  /**
   * 가용성 판정
   * 원본: COMABLE.ERB @COM_ABLE35
   */
  isAvailable: (context: TrainingContext) => {
    return true;
  },

  /**
   * SOURCE 계산
   * 원본: COMF35.ERB 라인 217-537
   */
  // TODO: Move calculateSource logic to execute
  // calculateSource: (context: TrainingContext): SourceValues => {
    const { target, player } = context;
    const abilities = target.abl;
    const talents = context.talents;
    const playerTalents = context.playerTalents || {};

    // 더럽힘 계산 (라인 151-188)
    let dirtyValue = 0;
    if (context.stain?.player?.[2] & 1) dirtyValue += 1;
    if (context.stain?.player?.[2] & 4) dirtyValue += 3;
    if (context.stain?.player?.[2] & 8) dirtyValue += 7;
    if (context.stain?.player?.[2] & 16) dirtyValue += 1;
    if (context.stain?.player?.[4] & 32) dirtyValue += 3;

    if (talents[61]) dirtyValue = Math.floor(dirtyValue / 3);
    if (talents[62]) dirtyValue = Math.floor(dirtyValue * 2);

    // 기본 SOURCE 설정
    const source: number[] = new Array(19).fill(0);

    // LOSEBASE
    context.loseBase[0] += 30;
    context.loseBase[1] += 120;

    // 봉사정신에 따른 SOURCE
    // 원본: 라인 225-250
    const service = abilities['봉사정신'] || 0;
    const serviceSettings = [
      [500, 300, 200],
      [700, 500, 150],
      [900, 800, 100],
      [1100, 1200, 50],
      [1300, 1800, 20],
      [1500, 2500, 0]
    ][service] || [500, 300, 200];

    source[0] = serviceSettings[0];
    source[8] = serviceSettings[1];
    source[11] = serviceSettings[2];

    // C감각에 따른 쾌C
    // 원본: 라인 252-265
    const cSense = abilities['C감각'] || 0;
    source[1] = [0, 50, 200, 400, 1000, 2000][cSense] || 0;

    // B감각에 따른 쾌B
    // 원본: 라인 267-291
    const bSense = abilities['B감각'] || 0;
    let bPleasure = [200, 300, 500, 1000, 1500, 1800][bSense] || 200;

    if (talents[110]) bPleasure *= 1.20; // 거유
    if (talents[108]) bPleasure *= 1.20;
    else if (talents[107]) bPleasure *= 0.70;

    source[3] = Math.floor(bPleasure);

    // 기교에 따른 배율
    // 원본: 라인 292-311
    const technique = abilities['기교'] || 0;
    const techMults = [
      [0.80, 0.80],
      [1.00, 1.00],
      [1.30, 1.30],
      [1.60, 1.60],
      [1.90, 1.90],
      [2.30, 2.30]
    ][technique] || [1.00, 1.00];

    source[0] = Math.floor(source[0] * techMults[0]);
    source[8] = Math.floor(source[8] * techMults[1]);

    // 사정 게이지 체크
    // 원본: 라인 315-390
    let ejacGauge = [1500, 2100, 2900, 4000, 5000, 6000][technique] || 2100;

    const submission = abilities['종순'] || 0;
    ejacGauge *= [0.80, 0.90, 1.00, 1.10, 1.20, 1.30][submission] || 1.00;

    const serviceTech = abilities['봉사정신'] || 0;
    ejacGauge *= [0.50, 0.80, 1.20, 1.50, 1.80, 2.40][serviceTech] || 1.00;

    const cumAddiction = abilities['정액중독'] || 0;
    ejacGauge *= [0.80, 0.90, 1.00, 1.10, 1.20, 1.30][cumAddiction] || 1.00;

    const playerCSense = context.player?.abilities?.['C감각'] || 0;
    ejacGauge *= [1.00, 1.50, 2.00, 2.50, 3.50, 5.00][playerCSense] || 1.00;

    if (playerTalents[121] || playerTalents[122]) {
      context.player.base[2] += Math.floor(ejacGauge);
    }

    // 사정 체크
    // 원본: 라인 396-438
    const ejacLevel = PlayerEjaculationHandler.checkLevel(context);

    if (ejacLevel > 0) {
      source[0] *= 3.00;

      const cumSources = [
        [0, 2.00, 2.00],
        [200, 2.50, 1.60],
        [600, 3.00, 1.00],
        [1500, 4.00, 0.70],
        [3000, 5.00, 0.40],
        [6000, 6.00, 0.10]
      ][cumAddiction] || [0, 2.00, 2.00];

      source.정애 = cumSources[0];
      source[8] *= cumSources[1];
      source[7] *= cumSources[2];
    }

    // 대량 사정
    // 원본: 라인 441-479
    if (ejacLevel === 2) {
      source.정애 = Math.floor((source.정애 || 0) * 2.00);
      source[8] *= 1.50;
      context.flags[1] = 2; // TFLAG:1 (손으로 사정)
    } else if (ejacLevel === 1) {
      context.flags[1] = 1;
    }

    // 후타나리라면 굴종 반감
    // 원본: 라인 533-536
    if (playerTalents[121]) {
      source[7] = Math.floor(source[7] / 2);
    }

    return source;
  },

  /**
   * 커맨드 실행
   * 원본: COMF35.ERB 전체
   */
  async execute(context: TrainingContext): Promise<void> {
    // 1. 커맨드명 표시
    context.showMessage('거품춤');

    // 2. TODO: TRAIN_MESSAGE_B
    // 원본: 라인 210-211

    // 3. SOURCE 계산 및 적용
    const source = this.calculateSource(context);
    // TODO: applySource

    // 4. 더럽힘 처리
    // 원본: 라인 484-502
    context.stain[0] = 0;
    context.stain[1] = 0;
    context.stain[2] = 2;
    context.stain[3] = 1;
    context.stain[4] = 8;

    const assiPlay = context.assiPlay || 0;
    if (assiPlay === 0) {
      if (context.stain.master) {
        context.stain.master[0] = 0;
        context.stain.master[1] = 0;
        context.stain.master[2] = 2;
        context.stain.master[3] = 1;
        context.stain.master[4] = 8;
      }
    } else {
      if (context.stain.assi) {
        context.stain.assi[0] = 0;
        context.stain.assi[1] = 0;
        context.stain.assi[2] = 2;
        context.stain.assi[3] = 1;
        context.stain.assi[4] = 8;
      }
    }

    // 5. 경험 상승
    // 원본: 라인 506-526
    const isMale = context.talents[122] || 0;
    const isPlayerMale = context.playerTalents?.[122] || 0;

    if (!isMale && !isPlayerMale) {
      context.addExp(40, 7);
    } else if (isMale && isPlayerMale) {
      context.addExp(41, 7);
    }

    // TFLAG:30 (키스경험 체크)
    if (!assiPlay && (context.exp[22] || 0) >= context.getExpLevel(3)) {
      context.flags[30] += 1;
    }

    // 애정경험
    if ((context.cflag?.[2] || 0) >= 1000 && !assiPlay) {
      context.addExp(23, 2);
    }

    // 6. 플래그 설정
    context.flags[100] = 1;
    context.flags[200] = 3; // 굴복각인3
  },

  /**
   * 메시지 생성
   */
  // TODO: Move generateMessage logic to execute
  // generateMessage: (context: TrainingContext) => {
    const targetName = context.target.name;
    return `${targetName}이(가) 클리토리스와 질로 당신의 성기를 자극했다.`;
  },
};
