/**
 * COMF30 - 수음 (Handjob)
 * 원본: ERB/指導関係/COMF30.ERB
 *
 * 봉사계 커맨드: 조교 대상이 조교자의 성기를 손으로 자극
 */

import type { CommandPlugin } from '../../types';
import type { TrainingContext, SourceValues } from '../../types';
import { SourceModifier } from '../../systems/SourceModifier';
import { PlayerEjaculationHandler } from '../../systems/PlayerEjaculation';

export const COMF30_handjob: CommandPlugin = {
  id: 30,
  name: '수음',
  category: '봉사',
  staminaCost: 10,

  /**
   * 가용성 판정
   * 원본: COMABLE.ERB @COM_ABLE30
   */
  isAvailable: (context: TrainingContext) => {
    return true; // 기본 가용
  },

  /**
   * SOURCE 계산
   * 원본: COMF30.ERB 라인 250-513
   */
  // TODO: Move calculateSource logic to execute
  // calculateSource: (context: TrainingContext): SourceValues => {
    const { target, player } = context;
    const abilities = target.abl;
    const talents = context.talents;
    const playerTalents = context.playerTalents || {};

    // 더럽힘 계산 (라인 176-221)
    let dirtyValue = 0;
    if (context.stain?.player?.[2] & 1) dirtyValue += 1; // 애액
    if (context.stain?.player?.[2] & 4) dirtyValue += 3; // 정액
    if (context.stain?.player?.[2] & 8) dirtyValue += 7; // 항문
    if (context.stain?.player?.[2] & 16) dirtyValue += 1; // 모유
    if (context.stain?.player?.[4] & 32) dirtyValue += 3; // 오줌

    // 수간
    if (context.equipment?.[89]) dirtyValue = 7;

    // 악취 둔감/민감
    if (talents[61]) dirtyValue = Math.floor(dirtyValue / 3);
    if (talents[62]) dirtyValue = Math.floor(dirtyValue * 2);

    // 수음에서는 더러움이 적게 영향
    dirtyValue = Math.floor(dirtyValue / 3);

    // 기본 SOURCE 설정
    const source: number[] = new Array(19).fill(0);

    // LOSEBASE
    context.loseBase[0] += 10;
    context.loseBase[1] += 100;

    // 봉사정신에 따른 SOURCE 설정
    // 원본: 라인 262-287
    const service = abilities['봉사정신'] || 0;
    if (service === 0) {
      source[0] = 250;
      source[8] = 50;
      source[11] *= 4.00;
    } else if (service === 1) {
      source[0] = 300;
      source[8] = 100;
      source[11] *= 2.50;
    } else if (service === 2) {
      source[0] = 350;
      source[8] = 200;
      source[11] *= 1.50;
    } else if (service === 3) {
      source[0] = 400;
      source[8] = 300;
      source[11] *= 1.00;
    } else if (service === 4) {
      source[0] = 450;
      source[8] = 500;
      source[11] *= 0.50;
    } else {
      source[0] = 500;
      source[8] = 750;
      source[11] *= 0.10;
    }

    // 기교에 따른 배율
    // 원본: 라인 290-309
    const technique = abilities['기교'] || 0;
    const techMult = [0.50, 0.80, 1.00, 1.20, 1.50, 2.00][technique] || 1.00;
    source[0] = Math.floor(source[0] * techMult);
    source[8] = Math.floor(source[8] * techMult);

    // 수간의 경우 여기서 종료
    if (context.equipment?.[89]) {
      return source;
    }

    // 플레이어 사정 게이지 계산
    // 원본: 라인 317-378
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
    // 원본: 라인 384-427
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
    // 원본: 라인 429-468
    if (ejacLevel === 2) {
      source.정애 = Math.floor((source.정애 || 0) * 2.00);
      source[8] *= 1.50;

      context.flags[1] = 2; // TFLAG:1 = 2 (손으로 사정 플래그)
    } else if (ejacLevel === 1) {
      context.flags[1] = 1; // TFLAG:1 = 1
    }

    // 후타나리라면 굴종 반감
    // 원본: 라인 510-511
    if (playerTalents[121]) {
      source[7] = Math.floor(source[7] / 2);
    }

    return source;
  },

  /**
   * 커맨드 실행
   * 원본: COMF30.ERB 전체
   */
  async execute(context: TrainingContext): Promise<void> {
    const prevCom = context.prevCom || 0;
    const assiPlay = context.assiPlay || 0;
    const prevTrainer = context.flags[50] || 0;

    // 1. 파생 체크
    // 원본: 라인 8-20
    const sameTrainer = (assiPlay && prevTrainer) || (!assiPlay && !prevTrainer);

    if (sameTrainer) {
      // 펠라치오 등에서 수음펠라로 파생
      if ([31, 123, 124, 125, 127].includes(prevCom)) {
        // TODO: COM126 파생
        context.showMessage('[파생] 수음펠라 가능');
      }

      // 애널봉사에서 파생
      if (prevCom === 37) {
        // TODO: COM138 파생
        context.showMessage('[파생] 애널봉사수음 가능');
      }
    }

    // 2. 커맨드명 표시
    // 원본: 라인 21-25
    const flags42 = context.flags[42] || 0;
    if ([83, 85].includes(flags42)) {
      context.showMessage('장갑훑기');
    } else {
      context.showMessage('수음');
    }

    // 3. TODO: TRAIN_MESSAGE_B 호출
    // 원본: 라인 244-245

    // 4. SOURCE 계산 및 적용
    const source = this.calculateSource(context);
    // TODO: applySource

    // 5. 더럽힘 처리
    // 원본: 라인 472-481
    if (context.playerTalents?.[119] || context.playerTalents?.[122] || context.playerTalents?.[121]) {
      // 노예의 손 ↔ 조교자의 P 더러움 이동
      context.stain[1] |= context.stain.player?.[2] || 0;
      if (context.stain.player) context.stain.player[2] |= context.stain[1] || 0;
    } else {
      // 노예의 손 ↔ 조교자의 V 더러움 이동
      context.stain[3] |= context.stain.player?.[2] || 0;
      if (context.stain.player) context.stain.player[2] |= context.stain[3] || 0;
    }

    // 6. 경험 상승
    // 원본: 라인 486-502
    const isMale = context.talents[122] || 0;
    const isPlayerMale = context.playerTalents?.[122] || 0;

    if (isMale === 0 && isPlayerMale === 0) {
      context.addExp(40, 4); // 레즈경험 +4
    } else if (isMale === 1 && isPlayerMale === 1) {
      context.addExp(41, 4); // 호모경험 +4
    }

    // 애정경험
    if ((context.cflag?.[2] || 0) >= 1000 && assiPlay === 0) {
      context.addExp(23, 1);
    }

    // 7. 플래그 설정
    context.flags[100] = 1; // TFLAG:100
    context.flags[200] = 1; // 굴복각인1
  },

  /**
   * 메시지 생성
   */
  // TODO: Move generateMessage logic to execute
  // generateMessage: (context: TrainingContext) => {
    const targetName = context.target.name;
    return `${targetName}이(가) 손으로 당신의 성기를 자극했다.`;
  },
};
