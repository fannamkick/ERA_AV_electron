/**
 * COMF38 - 풋잡 (Footjob)
 * 원본: ERB/指導關係/COMF38.ERB
 *
 * 봉사계 커맨드: 조교 대상이 조교자의 성기를 발로 자극
 * 가학쾌락경험이 상승하는 커맨드
 */

import type { CommandPlugin } from '../../types';
import type { TrainingContext, SourceValues } from '../../types';
import { SourceModifier } from '../../systems/SourceModifier';
import { PlayerEjaculationHandler } from '../../systems/PlayerEjaculation';

export const COMF38_footjob: CommandPlugin = {
  id: 38,
  name: '풋잡',
  category: '봉사',
  staminaCost: 10,

  /**
   * 가용성 판정
   * 원본: COMABLE.ERB @COM_ABLE38
   */
  isAvailable: (context: TrainingContext) => {
    return true;
  },

  /**
   * SOURCE 계산
   * 원본: COMF38.ERB 라인 258-557
   */
  // TODO: Move calculateSource logic to execute
  // calculateSource: (context: TrainingContext): SourceValues => {
    const { target, player } = context;
    const abilities = target.abl;
    const talents = context.talents;
    const playerTalents = context.playerTalents || {};

    // 더럽힘 계산 (라인 187-228)
    let dirtyValue = 0;
    if (context.stain?.player?.[2] & 1) dirtyValue += 1;
    if (context.stain?.player?.[2] & 4) dirtyValue += 3;
    if (context.stain?.player?.[2] & 8) dirtyValue += 7;
    if (context.stain?.player?.[2] & 16) dirtyValue += 1;
    if (context.stain?.player?.[4] & 32) dirtyValue += 3;

    if (talents[61]) dirtyValue = Math.floor(dirtyValue / 3);
    if (talents[62]) dirtyValue = Math.floor(dirtyValue * 2);

    // 풋잡에서는 더러움이 적게 영향
    dirtyValue = Math.floor(dirtyValue / 3);

    // 기본 SOURCE 설정
    const source: number[] = new Array(19).fill(0);

    // LOSEBASE
    context.loseBase[0] += 10;
    context.loseBase[1] += 150;

    // 봉사정신에 따른 SOURCE
    // 원본: 라인 269-294
    const service = abilities['봉사정신'] || 0;
    const serviceSettings = [
      [300, 50, 4.00],
      [350, 100, 2.50],
      [400, 150, 1.50],
      [450, 200, 1.00],
      [500, 250, 0.50],
      [580, 300, 0.10]
    ][service] || [300, 50, 4.00];

    source[0] = serviceSettings[0];
    source[8] = serviceSettings[1];
    source[11] *= serviceSettings[2];

    // 기교에 따른 배율
    // 원본: 라인 297-316
    const technique = abilities['기교'] || 0;
    const techMult = [0.50, 0.80, 1.00, 1.20, 1.50, 2.00][technique] || 1.00;
    source[0] = Math.floor(source[0] * techMult);
    source[8] = Math.floor(source[8] * techMult);

    // 새드끼에 따른 배율
    // 원본: 라인 318-337
    const sadism = abilities['새드끼'] || 0;
    const sadismMult = [1.00, 1.20, 1.40, 1.60, 1.80, 2.00][sadism] || 1.00;
    source[0] = Math.floor(source[0] * sadismMult);
    source[8] = Math.floor(source[8] * sadismMult);

    // 사정 게이지 체크
    // 원본: 라인 342-417
    let ejacGauge = [350, 700, 1300, 1800, 2600, 3500][technique] || 700;

    const submission = abilities['종순'] || 0;
    ejacGauge *= [0.80, 0.90, 1.00, 1.10, 1.20, 1.30][submission] || 1.00;

    const serviceTech = abilities['봉사기술'] || 0;
    ejacGauge *= [0.50, 0.80, 1.20, 1.50, 1.80, 2.40][serviceTech] || 1.00;

    const playerMaso = context.player?.abilities?.['마조끼'] || 0;
    ejacGauge *= [0.90, 1.00, 1.10, 1.20, 1.30, 1.40][playerMaso] || 1.00;

    const playerCSense = context.player?.abilities?.['C감각'] || 0;
    ejacGauge *= [1.00, 1.50, 2.00, 2.50, 3.50, 5.00][playerCSense] || 1.00;

    if (playerTalents[122] || playerTalents[121]) {
      context.player.base[2] += Math.floor(ejacGauge);
    }

    // 사정 체크
    // 원본: 라인 423-466
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
    // 원본: 라인 468-507
    if (ejacLevel === 2) {
      source.정애 = Math.floor((source.정애 || 0) * 2.00);
      source[8] *= 1.50;
      context.flags[18] = 2; // TFLAG:18 (발로 사정)
    } else if (ejacLevel === 1) {
      context.flags[18] = 1;
    }

    // 후타나리라면 굴종 반감
    // 원본: 라인 554-557
    if (playerTalents[121]) {
      source[7] = Math.floor(source[7] / 2);
    }

    return source;
  },

  /**
   * 커맨드 실행
   * 원본: COMF38.ERB 전체
   */
  async execute(context: TrainingContext): Promise<void> {
    // 1. 커맨드명 표시
    context.showMessage('풋잡');

    // 2. TODO: TRAIN_MESSAGE_B
    // 원본: 라인 251-252

    // 3. SOURCE 계산 및 적용
    const source = this.calculateSource(context);
    // TODO: applySource

    // 4. 더럽힘 처리는 별도 없음

    // 5. 경험 상승
    // 원본: 라인 518-547

    // 가학쾌락경험
    const desire = context.target.abl[11] || 0;
    const sadism = context.target.abl['새드끼'] || 0;
    const isSadist = context.talents[83] || 0;

    let sadisticExp = 0;
    if (isSadist || (desire >= 3 && sadism >= 3)) {
      sadisticExp = 3;
    } else if (desire >= 3 && sadism >= 1) {
      sadisticExp = 2;
    } else if (desire >= 3 || sadism >= 1) {
      sadisticExp = 1;
    }

    if (sadisticExp > 0) {
      context.addExp(33, sadisticExp);
    }

    // 레즈경험/호모경험
    const isMale = context.talents[122] || 0;
    const isPlayerMale = context.playerTalents?.[122] || 0;

    if (!isMale && !isPlayerMale) {
      context.addExp(40, 3);
    } else if (isMale && isPlayerMale) {
      context.addExp(41, 3);
    }

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
    return `${targetName}이(가) 발로 당신의 성기를 자극했다.`;
  },
};
