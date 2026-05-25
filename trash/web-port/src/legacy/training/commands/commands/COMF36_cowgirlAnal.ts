/**
 * COMF36 - 기승위애널 (Cowgirl Anal)
 * 원본: ERB/指導関係/COMF36.ERB
 *
 * 봉사계 커맨드: 조교 대상이 조교자의 성기를 항문으로 자극
 */

import type { CommandPlugin } from '../../types';
import type { TrainingContext, SourceValues } from '../../types';
import { SourceModifier } from '../../systems/SourceModifier';
import { PlayerEjaculationHandler } from '../../systems/PlayerEjaculation';
import { AnalSexHandler } from '../common/AnalSexHandler';

export const COMF36_cowgirlAnal: CommandPlugin = {
  id: 36,
  name: '기승위애널',
  category: '봉사',
  staminaCost: 90,

  /**
   * 가용성 판정
   * 원본: COMABLE.ERB @COM_ABLE36
   */
  isAvailable: (context: TrainingContext) => {
    return true;
  },

  /**
   * SOURCE 계산
   * 원본: COMF36.ERB 라인 238-520
   */
  // TODO: Move calculateSource logic to execute
  // calculateSource: (context: TrainingContext): SourceValues => {
    const { target, player } = context;
    const abilities = target.abl;
    const talents = context.talents;
    const playerTalents = context.playerTalents || {};

    // 더럽힘 계산 (라인 165-206)
    let dirtyValue = 0;
    if (context.stain?.player?.[2] & 1) dirtyValue += 1;
    if (context.stain?.player?.[2] & 4) dirtyValue += 3;
    if (context.stain?.player?.[2] & 8) dirtyValue += 7;
    if (context.stain?.player?.[2] & 16) dirtyValue += 1;
    if (context.stain?.player?.[4] & 32) dirtyValue += 3;

    if (talents[61]) dirtyValue = Math.floor(dirtyValue / 3);
    if (talents[62]) dirtyValue = Math.floor(dirtyValue * 2);

    // 기승위에서는 더러움 영향 적음
    dirtyValue = Math.floor(dirtyValue / 3);

    // 기본 SOURCE 설정
    const source: number[] = new Array(19).fill(0);

    // LOSEBASE 계산 (A감각에 따라 감소)
    // 원본: 라인 241-259
    const aSense = abilities['A감각'] || 0;
    let local2 = aSense * 3;
    if (local2 <= 0) local2 = 1;
    let local3 = aSense * 2;
    if (local3 <= 0) local3 = 1;

    let loseBase0 = 90 - local2;
    if (loseBase0 <= 10) loseBase0 = 10;
    let loseBase1 = 110 - local3;
    if (loseBase1 <= 10) loseBase1 = 10;

    context.loseBase[0] += loseBase0;
    context.loseBase[1] += loseBase1;

    // 봉사정신에 따른 SOURCE
    // 원본: 라인 266-297
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

    // A감각에 따른 쾌A, 윤활, 굴종
    // 원본: 라인 299-330
    const aSettings = [
      [10, 10, 80, 0.50],
      [20, 50, 300, 0.80],
      [200, 100, 700, 1.00],
      [450, 180, 1500, 1.20],
      [850, 300, 2600, 1.50],
      [1300, 450, 4000, 2.00]
    ][aSense] || [10, 10, 80, 0.50];

    source[2] = aSettings[0];
    source[6] = aSettings[1];
    source[7] += aSettings[2];
    source[0] = Math.floor(source[0] * aSettings[3]);

    // A경험 레벨에 따른 쾌A 배율, 고통, LOSEBASE
    // 원본: 라인 332-363
    const aExpLevel = context.getExpLevel(context.exp[1] || 0);
    const aExpSettings = [
      [0.10, 18000, 70, 80],
      [0.30, 10000, 60, 70],
      [0.50, 4500, 45, 55],
      [1.00, 1500, 25, 35],
      [1.40, 700, 10, 15],
      [1.60, 300, 0, 0]
    ][aExpLevel] || [0.10, 18000, 70, 80];

    source[2] = Math.floor(source[2] * aExpSettings[0]);
    source[12] = aExpSettings[1];
    loseBase0 += aExpSettings[2];
    loseBase1 += aExpSettings[3];

    context.loseBase[0] += aExpSettings[2];
    context.loseBase[1] += aExpSettings[3];

    // 윤활도에 따른 배율
    // 원본: 라인 366-382
    const lubLevel = context.getParamLevel(context.params[3] || 0);
    const lubSettings = [
      [0.40, 10000],
      [0.80, 3600],
      [1.00, 1200],
      [1.40, 200],
      [1.80, 100],
      [1.80, 100]
    ][lubLevel] || [1.00, 1200];

    source[2] = Math.floor(source[2] * lubSettings[0]);
    source[12] += lubSettings[1];

    // 체격 소질
    if (talents[99]) source[12] *= 0.80;
    if (talents[100]) source[12] *= 2.00;
    if (talents[135]) source[12] *= 2.00;

    // 정조관념
    // 원본: 라인 393-405
    if (talents[30]) {
      if ((context.exp[1] || 0) === 0) {
        source[6] *= 1.20;
        source.반발심 = (source.반발심 || 0) * 1.10;
        source[16] = 500;
      } else {
        source[6] *= 1.20;
        source.반발심 = (source.반발심 || 0) * 1.10;
        source[16] = 0;
      }
    }

    // 욕정 레벨에 따른 배율
    // 원본: 라인 407-423
    const lustLevel = context.getParamLevel(context.params[5] || 0);
    const lustMults = [
      [0.60, 0.60],
      [0.80, 0.80],
      [1.00, 1.00],
      [1.20, 1.20],
      [1.40, 1.40],
      [1.40, 1.40]
    ][lustLevel] || [1.00, 1.00];

    source[2] = Math.floor(source[2] * lustMults[0]);
    source[7] = Math.floor(source[7] * lustMults[1]);

    // 종순에 따른 배율
    // 원본: 라인 426-457
    const submission = abilities['종순'] || 0;
    const submissionSettings = [
      [0.50, 0.60, 2.00, 700],
      [0.80, 0.80, 1.50, 500],
      [1.00, 1.00, 1.00, 300],
      [1.30, 1.20, 0.80, 100],
      [1.60, 1.40, 0.60, 30],
      [2.00, 1.60, 0.30, 0]
    ][submission] || [1.00, 1.00, 1.00, 300];

    source[2] = Math.floor(source[2] * submissionSettings[0]);
    source[6] = Math.floor(source[6] * submissionSettings[1]);
    source[16] = Math.floor((source[16] || 0) * submissionSettings[2]);
    source[7] += submissionSettings[3];

    // 기교에 따른 배율
    // 원본: 라인 459-478
    const technique = abilities['기교'] || 0;
    const techSettings = [
      [0.50, 0.60],
      [0.80, 0.80],
      [1.00, 1.00],
      [1.30, 1.20],
      [1.60, 1.40],
      [2.00, 1.60]
    ][technique] || [1.00, 1.00];

    source[2] = Math.floor(source[2] * techSettings[0]);
    source[6] = Math.floor(source[6] * techSettings[1]);

    return source;
  },

  /**
   * 커맨드 실행
   * 원본: COMF36.ERB 전체
   */
  async execute(context: TrainingContext): Promise<void> {
    // 1. 애널처녀 확인
    // 원본: 라인 6-9
    if (context.talents[76] === 1) {
      // TODO: CONFIRM_LOST_ANALVIRGIN
      await AnalSexHandler.handleVirginity(context);
    }

    // 2. 커맨드명 표시
    context.showMessage('기승위애널');

    // 3. TODO: TRAIN_MESSAGE_B
    // 원본: 라인 233-234

    // 4. A경험 플래그
    context.flags[101] = 1; // TFLAG:101

    // 5. SOURCE 계산 및 적용
    const source = this.calculateSource(context);
    // TODO: applySource

    // 6. 사정 체크
    // 원본: 라인 480-503
    const ejacResult = await PlayerEjaculationHandler.checkAnal(context);
    if (ejacResult.ejaculated) {
      source[0] *= 3.00;
      source[8] *= 5.00;
      source[7] *= 1.50;

      const cumAddiction = context.target.abl['정액중독'] || 0;
      source.정애 = [0, 300, 1000, 1500, 2200, 3000][cumAddiction] || 0;

      await AnalSexHandler.handleEjaculation(context, ejacResult);
    }

    // 7. 항문 섹스 후 처리
    // 원본: 라인 505-506
    // TODO: CALL COM_AFTER_ANAL_SEX

    // 8. 플래그 설정
    context.flags[100] = 1;

    // A경험에 따른 굴복각인
    if ((context.exp[1] || 0) <= 1) {
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
    return `${targetName}이(가) 기승위 자세로 당신의 성기를 항문으로 자극했다.`;
  },
};
