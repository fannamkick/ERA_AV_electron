/**
 * COMF34 - 기승위 (Cowgirl)
 * 원본: ERB/指導関係/COMF34.ERB
 *
 * 봉사계 커맨드: 조교 대상이 조교자의 성기를 질로 자극
 */

import type { CommandPlugin } from '../../types';
import type { TrainingContext, SourceValues } from '../../types';
import { SourceModifier } from '../../systems/SourceModifier';
import { PlayerEjaculationHandler } from '../../systems/PlayerEjaculation';
import { VaginaSexHandler } from '../common/VaginaSexHandler';

export const COMF34_cowgirl: CommandPlugin = {
  id: 34,
  name: '기승위',
  category: '봉사',
  staminaCost: 60,

  /**
   * 가용성 판정
   * 원본: COMABLE.ERB @COM_ABLE34
   */
  isAvailable: (context: TrainingContext) => {
    return true;
  },

  /**
   * SOURCE 계산
   * 원본: COMF34.ERB 라인 304-589
   */
  // TODO: Move calculateSource logic to execute
  // calculateSource: (context: TrainingContext): SourceValues => {
    const { target, player } = context;
    const abilities = target.abl;
    const talents = context.talents;
    const playerTalents = context.playerTalents || {};

    // 더럽힘 계산 (라인 219-264)
    let dirtyValue = 0;
    if (context.stain?.player?.[2] & 1) dirtyValue += 1;
    if (context.stain?.player?.[2] & 4) dirtyValue += 3;
    if (context.stain?.player?.[2] & 8) dirtyValue += 7;
    if (context.stain?.player?.[2] & 16) dirtyValue += 1;
    if (context.stain?.player?.[4] & 32) dirtyValue += 3;

    if (context.equipment?.[89]) dirtyValue = 7;
    if (talents[61]) dirtyValue = Math.floor(dirtyValue / 3);
    if (talents[62]) dirtyValue = Math.floor(dirtyValue * 2);

    // 기승위에서는 더러움 영향 적음
    dirtyValue = Math.floor(dirtyValue / 3);

    // 기본 SOURCE 설정
    const source: number[] = new Array(19).fill(0);

    // LOSEBASE 계산 (V감각에 따라 감소)
    // 원본: 라인 306-324
    const vSense = abilities['V감각'] || 0;
    let local2 = vSense * 3;
    if (local2 <= 0) local2 = 1;
    let local3 = vSense * 2;
    if (local3 <= 0) local3 = 1;

    let loseBase0 = 60 - local2;
    if (loseBase0 <= 10) loseBase0 = 10;
    let loseBase1 = 150 - local3;
    if (loseBase1 <= 10) loseBase1 = 10;

    context.loseBase[0] += loseBase0;
    context.loseBase[1] += loseBase1;

    // 봉사정신에 따른 SOURCE
    // 원본: 라인 331-362
    const service = abilities['봉사정신'] || 0;
    const serviceSettings = [
      [200, 50, 300, 4.00],
      [250, 200, 100, 2.50],
      [350, 550, 30, 1.50],
      [450, 900, 0, 1.00],
      [600, 1500, 0, 0.50],
      [750, 2200, 0, 0.10]
    ][service] || [200, 50, 300, 4.00];

    source[0] = serviceSettings[0];
    source[8] = serviceSettings[1];
    source[15] = serviceSettings[2];
    source[11] *= serviceSettings[3];

    // V감각에 따른 쾌V, 윤활
    // 원본: 라인 364-389
    const vSettings = [
      [20, 25, 0.50],
      [75, 75, 0.80],
      [200, 125, 1.00],
      [500, 175, 1.20],
      [850, 300, 1.50],
      [1100, 425, 2.00]
    ][vSense] || [20, 25, 0.50];

    source[1] = vSettings[0];
    source[6] = vSettings[1];
    source[0] = Math.floor(source[0] * vSettings[2]);

    // V경험 레벨에 따른 쾌V 배율, 고통
    // 원본: 라인 391-410
    const vExpLevel = context.getExpLevel(context.exp[0] || 0);
    const vExpSettings = [
      [0.20, 5000, 12000, 120000],
      [0.60, 220, 0, 0],
      [1.00, 30, 0, 0],
      [1.20, 5, 0, 0],
      [1.40, 0, 0, 0],
      [1.50, 0, 0, 0]
    ][vExpLevel] || [0.20, 5000, 12000, 120000];

    source[1] = Math.floor(source[1] * vExpSettings[0]);
    source[12] = vExpSettings[1];
    if (vExpLevel === 0) {
      source[9] = vExpSettings[2];
      source[15] = vExpSettings[3];
    }

    // 윤활도에 따른 배율
    // 원본: 라인 414-436
    const lubLevel = context.getParamLevel(context.params[3] || 0);
    const lubSettings = [
      [0.20, 900, 3.00, 2000],
      [0.60, 250, 1.00, 400],
      [1.00, 0, 0.50, 0],
      [1.30, 0, 0.30, 0],
      [1.60, 0, 0.20, 0],
      [2.00, 0, 0.10, 0]
    ][lubLevel] || [1.00, 0, 0.50, 0];

    source[1] = Math.floor(source[1] * lubSettings[0]);
    let painAdd = lubSettings[1];
    let painMult = lubSettings[2];
    if (lubLevel === 0 || lubLevel === 1) {
      source[12] += painAdd;
      source[12] *= painMult;
      source[9] += lubSettings[3];
    }

    // 체격 소질
    if (talents[99]) source[12] *= 0.80; // 큰 체구
    if (talents[100]) source[12] *= 2.00; // 소체형
    if (talents[135]) source[12] *= 4.00; // 미숙함

    // 정조관념
    // 원본: 라인 448-471
    if (talents[30]) {
      if ((context.exp[0] || 0) === 0) {
        source[6] *= 0.60;
        source[15] *= 15.00;
        source[16] = 10000;
      } else {
        source[6] *= 0.60;
        source[15] *= 15.00;
        source[16] = 1000;
      }
    } else if (talents[31]) { // 정조무관심
      if ((context.exp[0] || 0) === 0) {
        source[15] *= 0.50;
        source[16] = 300;
      } else {
        source[15] *= 0.50;
      }
    } else {
      if ((context.exp[0] || 0) === 0) {
        source[16] = 3000;
      }
    }

    // 욕정 레벨에 따른 배율
    // 원본: 라인 473-492
    const lustLevel = context.getParamLevel(context.params[5] || 0);
    const lustMults = [
      [0.60, 0.30],
      [0.80, 0.60],
      [1.00, 1.00],
      [1.20, 1.50],
      [1.40, 1.80],
      [1.60, 2.20]
    ][lustLevel] || [1.00, 1.00];

    source[1] = Math.floor(source[1] * lustMults[0]);
    source[6] = Math.floor(source[6] * lustMults[1]);

    // 종순에 따른 배율
    // 원본: 라인 494-525
    const submission = abilities['종순'] || 0;
    const submissionSettings = [
      [0.50, 0.60, 2.00, 700],
      [0.80, 0.80, 1.50, 500],
      [1.00, 1.00, 1.00, 300],
      [1.30, 1.20, 0.80, 100],
      [1.60, 1.40, 0.60, 30],
      [2.00, 1.60, 0.30, 0]
    ][submission] || [1.00, 1.00, 1.00, 300];

    source[1] = Math.floor(source[1] * submissionSettings[0]);
    source[6] = Math.floor(source[6] * submissionSettings[1]);
    source[16] = Math.floor((source[16] || 0) * submissionSettings[2]);
    source[7] += submissionSettings[3];

    // 기교에 따른 배율
    // 원본: 라인 527-546
    const technique = abilities['기교'] || 0;
    const techSettings = [
      [0.50, 0.60],
      [0.80, 0.80],
      [1.00, 1.00],
      [1.30, 1.20],
      [1.60, 1.40],
      [2.00, 1.60]
    ][technique] || [1.00, 1.00];

    source[1] = Math.floor(source[1] * techSettings[0]);
    source[6] = Math.floor(source[6] * techSettings[1]);

    return source;
  },

  /**
   * 커맨드 실행
   * 원본: COMF34.ERB 전체
   */
  async execute(context: TrainingContext): Promise<void> {
    const prevCom = context.prevCom || 0;
    const assiPlay = context.assiPlay || 0;
    const prevTrainer = context.flags[50] || 0;
    const sameTrainer = (assiPlay && prevTrainer) || (!assiPlay && !prevTrainer);

    // 1. 파생 체크 (승마G스팟고문/승마자궁구고문)
    // 원본: 라인 6-38
    if (!context.flags[71] && prevCom === 34 && (context.player?.abilities?.['기교'] || 0) > 2 && sameTrainer) {
      const vSense = context.target.abl[2] || 0;
      const lustLevel = context.getParamLevel(context.params[5] || 0);
      let derivScore = [1, 2, 3, 4, 5][lustLevel] || 1;
      derivScore *= Math.floor(Math.random() * 11);
      derivScore += Math.floor(Math.random() * 11) * vSense;

      if (derivScore >= 50) {
        // TODO: COM121 (승마자궁구고문)
        context.showMessage('[파생] 승마자궁구고문 가능');
      } else {
        // TODO: COM120 (승마G스팟고문)
        context.showMessage('[파생] 승마G스팟고문 가능');
      }
    }

    // 2. 커맨드명 표시
    context.showMessage('기승위');

    // 3. 처녀 확인
    if (context.talents[0] === 1) {
      // TODO: CONFIRM_LOST_VIRGIN
      await VaginaSexHandler.handleVirginity(context);
    }

    // 4. TODO: TRAIN_MESSAGE_B
    // 원본: 라인 295-296

    // 5. V경험 플래그
    // 원본: 라인 298-301
    context.flags[19] = 1; // TFLAG:19 (V경험 플래그)
    if (context.talents[85] && assiPlay === 0 && (context.exp[0] || 0) === 0) {
      context.flags[20] = 1;
    }

    // 6. SOURCE 계산 및 적용
    const source = this.calculateSource(context);
    // TODO: applySource

    // 7. 사정 체크
    // 원본: 라인 548-571
    const ejacResult = await PlayerEjaculationHandler.checkVagina(context);
    if (ejacResult.ejaculated) {
      source[0] *= 3.00;
      source[8] *= 5.00;
      source[7] *= 1.50;

      const cumAddiction = context.target.abl['정액중독'] || 0;
      source.정애 = [0, 300, 1000, 1500, 2200, 3000][cumAddiction] || 0;

      await VaginaSexHandler.handleEjaculation(context, ejacResult);
    }

    // 8. 질 섹스 후 처리
    // 원본: 라인 573-574
    // TODO: CALL COM_AFTER_VAGINA_SEX

    // 9. 플래그 설정
    context.flags[100] = 1;

    // V경험에 따른 굴복각인
    if ((context.exp[0] || 0) <= 1) {
      context.flags[200] = 3;
    } else {
      context.flags[200] = 2;
    }

    // 후타나리라면 굴종 반감
    if (context.playerTalents?.[121]) {
      source[7] = Math.floor(source[7] / 2);
    }
  },

  /**
   * 메시지 생성
   */
  // TODO: Move generateMessage logic to execute
  // generateMessage: (context: TrainingContext) => {
    const targetName = context.target.name;
    return `${targetName}이(가) 기승위 자세로 당신의 성기를 질로 자극했다.`;
  },
};
