/**
 * COMF39 - 오나홀잡 (Onahole Job)
 * 원본: ERB/指導関係/COMF39.ERB
 *
 * 봉사계 커맨드: 조교 대상이 조교자의 성기를 손으로 자극 (오나홀 사용)
 * 가학쾌락경험이 상승
 */

import type { CommandPlugin } from '../../types';
import type { TrainingContext, SourceValues } from '../../types';
import { SourceModifier } from '../../systems/SourceModifier';
import { PlayerEjaculationHandler } from '../../systems/PlayerEjaculation';

export const COMF39_onahole: CommandPlugin = {
  id: 39,
  name: '오나홀잡',
  category: '봉사',
  staminaCost: 10,

  /**
   * 가용성 판정
   * 원본: COMABLE.ERB @COM_ABLE39
   */
  isAvailable: (context: TrainingContext) => {
    return true;
  },

  /**
   * SOURCE 계산
   * 원본: COMF39.ERB 라인 233-503
   */
  // TODO: Move calculateSource logic to execute
  // calculateSource: (context: TrainingContext): SourceValues => {
    const { target, player } = context;
    const abilities = target.abl;
    const talents = context.talents;
    const playerTalents = context.playerTalents || {};

    // 더럽힘 계산 (라인 158-203)
    let dirtyValue = 0;
    if (context.stain?.player?.[2] & 1) dirtyValue += 1;
    if (context.stain?.player?.[2] & 4) dirtyValue += 3;
    if (context.stain?.player?.[2] & 8) dirtyValue += 7;
    if (context.stain?.player?.[2] & 16) dirtyValue += 1;
    if (context.stain?.player?.[4] & 32) dirtyValue += 3;

    if (context.equipment?.[89]) dirtyValue = 7;
    if (talents[61]) dirtyValue = Math.floor(dirtyValue / 3);
    if (talents[62]) dirtyValue = Math.floor(dirtyValue * 2);

    // 수음에서는 더러움이 적게 영향
    dirtyValue = Math.floor(dirtyValue / 3);

    // 기본 SOURCE 설정
    const source: number[] = new Array(19).fill(0);

    // LOSEBASE
    context.loseBase[0] += 10;
    context.loseBase[1] += 100;

    // 봉사정신에 따른 SOURCE
    // 원본: 라인 244-269
    const service = abilities['봉사정신'] || 0;
    const serviceSettings = [
      [250, 50, 4.00],
      [300, 100, 2.50],
      [350, 200, 1.50],
      [400, 300, 1.00],
      [450, 500, 0.50],
      [500, 750, 0.10]
    ][service] || [250, 50, 4.00];

    source[0] = serviceSettings[0];
    source[8] = serviceSettings[1];
    source[11] *= serviceSettings[2];

    // 기교에 따른 배율
    // 원본: 라인 272-291
    const technique = abilities['기교'] || 0;
    const techMult = [0.50, 0.80, 1.00, 1.20, 1.50, 2.00][technique] || 1.00;
    source[0] = Math.floor(source[0] * techMult);
    source[8] = Math.floor(source[8] * techMult);

    // 수간의 경우 여기서 종료
    if (context.equipment?.[89]) {
      return source;
    }

    // 사정 게이지 체크
    // 원본: 라인 300-360
    let ejacGauge = [450, 1000, 1600, 2200, 2700, 3200][technique] || 1000;

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
    // 원본: 라인 366-409
    const ejacLevel = PlayerEjaculationHandler.checkLevel(context);

    if (ejacLevel > 0) {
      source[0] *= 3.00;

      const cumAddiction = abilities['정액중독'] || 0;
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
    // 원본: 라인 411-434
    if (ejacLevel === 2) {
      // 대량사정시 경험치 없음 (원본과 동일)
      context.flags[1] = 4; // TFLAG:1 = 4
    } else if (ejacLevel === 1) {
      context.flags[1] = 3; // TFLAG:1 = 3
    }

    // 후타나리라면 굴종 반감
    // 원본: 라인 501-503
    if (playerTalents[121]) {
      source[7] = Math.floor(source[7] / 2);
    }

    return source;
  },

  /**
   * 커맨드 실행
   * 원본: COMF39.ERB 전체
   */
  async execute(context: TrainingContext): Promise<void> {
    // 1. 커맨드명 표시
    context.showMessage('오나홀잡');

    // 2. TODO: TRAIN_MESSAGE_B
    // 원본: 라인 226-227

    // 3. SOURCE 계산 및 적용
    const source = this.calculateSource(context);
    // TODO: applySource

    // 4. 더럽힘 처리
    // 원본: 라인 439-447
    if (context.playerTalents?.[119] || context.playerTalents?.[122] || context.playerTalents?.[121]) {
      // 노예의 손 ↔ 조교자의 P 더러움 이동
      context.stain[1] |= context.stain.player?.[2] || 0;
      if (context.stain.player) context.stain.player[2] |= context.stain[1] || 0;
    } else {
      // 노예의 손 ↔ 조교자의 V 더러움 이동
      context.stain[3] |= context.stain.player?.[2] || 0;
      if (context.stain.player) context.stain.player[2] |= context.stain[3] || 0;
    }

    // 5. 경험 상승
    // 원본: 라인 451-487

    // 레즈경험/호모경험
    const isMale = context.talents[122] || 0;
    const isPlayerMale = context.playerTalents?.[122] || 0;

    if (!isMale && !isPlayerMale) {
      context.addExp(40, 4);
    } else if (isMale && isPlayerMale) {
      context.addExp(41, 4);
    }

    // 가학쾌락경험 (복잡한 계산)
    // 원본: 라인 462-486
    const sadism = context.target.abl['새드끼'] || 0;
    let sadisticExp = 0;
    const flag600 = context.flags[600] || 0;

    if (sadism <= 1) {
      sadisticExp = flag600 === 1 ? 8 : 1;
    } else if (sadism <= 2) {
      sadisticExp = flag600 === 1 ? 16 : 2;
    } else if (sadism <= 3) {
      sadisticExp = flag600 === 1 ? 32 : 3;
    } else if (sadism <= 4) {
      sadisticExp = flag600 === 1 ? 64 : 4;
    } else {
      sadisticExp = flag600 === 1 ? 128 : 5;
    }

    context.addExp(33, sadisticExp);

    // 애정경험
    const assiPlay = context.assiPlay || 0;
    if ((context.cflag?.[2] || 0) >= 1000 && !assiPlay) {
      context.addExp(23, 1);
    }

    // 6. 플래그 설정
    context.flags[100] = 1;
    context.flags[200] = 1; // 굴복각인1
  },

  /**
   * 메시지 생성
   */
  // TODO: Move generateMessage logic to execute
  // generateMessage: (context: TrainingContext) => {
    const targetName = context.target.name;
    return `${targetName}이(가) 오나홀로 당신의 성기를 자극했다.`;
  },
};
