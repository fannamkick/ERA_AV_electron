/**
 * COMF37 - 애널봉사 (Anal Service/Rimjob)
 * 원본: ERB/指導関係/COMF37.ERB
 *
 * 봉사계 커맨드: 조교 대상이 조교자의 항문을 입으로 자극
 */

import type { CommandPlugin } from '../../types';
import type { TrainingContext, SourceValues } from '../../types';
import { SourceModifier } from '../../systems/SourceModifier';
import { PlayerEjaculationHandler } from '../../systems/PlayerEjaculation';

export const COMF37_analService: CommandPlugin = {
  id: 37,
  name: '애널봉사',
  category: '봉사',
  staminaCost: 10,

  /**
   * 가용성 판정
   * 원본: COMABLE.ERB @COM_ABLE37
   */
  isAvailable: (context: TrainingContext) => {
    return true;
  },

  /**
   * SOURCE 계산
   * 원본: COMF37.ERB 라인 265-515
   */
  // TODO: Move calculateSource logic to execute
  // calculateSource: (context: TrainingContext): SourceValues => {
    const { target, player } = context;
    const abilities = target.abl;
    const talents = context.talents;
    const playerTalents = context.playerTalents || {};

    // 더럽힘 계산 (라인 193-235)
    let dirtyValue = 0;
    if (context.stain?.player?.[4] & 1) dirtyValue += 1;
    if (context.stain?.player?.[4] & 4) dirtyValue += 3;
    if (context.stain?.player?.[4] & 8) dirtyValue += 7;
    if (context.stain?.player?.[4] & 16) dirtyValue += 1;
    if (context.stain?.player?.[4] & 32) dirtyValue += 3;

    if (context.equipment?.[89]) dirtyValue = 7;
    if (talents[61]) dirtyValue = Math.floor(dirtyValue / 3);
    if (talents[62]) dirtyValue = Math.floor(dirtyValue * 2);

    // 기본 SOURCE 설정
    const source: number[] = new Array(19).fill(0);

    // LOSEBASE
    context.loseBase[1] += 10;
    context.loseBase[1] += 100;

    // 봉사정신에 따른 SOURCE
    // 원본: 라인 276-301
    const service = abilities['봉사정신'] || 0;
    const serviceSettings = [
      [420, 150, 4.00],
      [500, 300, 2.50],
      [580, 600, 1.50],
      [660, 900, 1.00],
      [740, 1500, 0.50],
      [820, 2200, 0.10]
    ][service] || [420, 150, 4.00];

    source[0] = serviceSettings[0];
    source[8] = serviceSettings[1];
    source[11] *= serviceSettings[2];

    // 기교에 따른 배율
    // 원본: 라인 304-323
    const technique = abilities['기교'] || 0;
    const techMult = [0.50, 0.80, 1.00, 1.50, 2.50, 4.00][technique] || 1.00;
    source[0] = Math.floor(source[0] * techMult);
    source[8] = Math.floor(source[8] * techMult);

    // 수간의 경우 여기서 종료
    // 원본: 라인 325-337
    if (context.equipment?.[89]) {
      if ((context.cflag?.[16] || 0) === -1) {
        context.flags[13] = 1;
        context.cflag[16] = 1;
        context.cstr[1] = '犬のアナル';
        context.flags[200] = 3; // 굴복각인3
      }
      return source;
    }

    // 플레이어 사정 게이지 체크
    // 원본: 라인 342-406
    let ejacGauge = [100, 300, 500, 800, 1200, 1600][technique] || 300;

    const submission = abilities['종순'] || 0;
    ejacGauge *= [0.80, 0.90, 1.00, 1.10, 1.20, 1.30][submission] || 1.00;

    const serviceTech = abilities['봉사기술'] || 0;
    ejacGauge *= [0.50, 0.80, 1.20, 1.50, 1.80, 2.40][serviceTech] || 1.00;

    // 혀놀림
    if (talents[52]) ejacGauge *= 2.00;

    const playerASense = context.player?.abilities?.['A감각'] || 0;
    ejacGauge *= [1.00, 1.50, 2.00, 2.50, 3.50, 5.00][playerASense] || 1.00;

    if (playerTalents[122] || playerTalents[121]) {
      context.player.base[2] += Math.floor(ejacGauge);
    }

    // 사정 체크
    // 원본: 라인 412-455
    const ejacLevel = PlayerEjaculationHandler.checkLevel(context);

    if (ejacLevel > 0) {
      source[0] *= 3.00;

      const cumAddiction = abilities['정액중독'] || 0;
      const cumSources = [
        [0, 2.00, 2.00],
        [200, 2.50, 1.60],
        [600, 3.00, 1.00],
        [1200, 4.50, 0.70],
        [2500, 6.00, 0.40],
        [5000, 8.00, 0.10]
      ][cumAddiction] || [0, 2.00, 2.00];

      source.정애 = cumSources[0];
      source[8] *= cumSources[1];
      source[7] *= cumSources[2];
    }

    // 대량 사정
    // 원본: 라인 457-494
    if (ejacLevel === 2) {
      source.정애 = Math.floor((source.정애 || 0) * 2.00);
      source[8] *= 1.50;
      context.flags[5] = 2; // TFLAG:5 (커닐링구스로 사정)
    } else if (ejacLevel === 1) {
      context.flags[5] = 1;
    }

    return source;
  },

  /**
   * 커맨드 실행
   * 원본: COMF37.ERB 전체
   */
  async execute(context: TrainingContext): Promise<void> {
    const prevCom = context.prevCom || 0;
    const assiPlay = context.assiPlay || 0;
    const prevTrainer = context.flags[50] || 0;

    // 1. 파생 체크
    // 원본: 라인 7-13
    if ((assiPlay && prevTrainer) || (!assiPlay && !prevTrainer)) {
      if (prevCom === 30) {
        // TODO: COM138
        context.showMessage('[파생] 애널봉사수음 가능');
      }
    }

    // 2. 커맨드명 표시
    context.showMessage('애널봉사');

    // 3. TODO: TRAIN_MESSAGE_B
    // 원본: 라인 258-259

    // 4. SOURCE 계산 및 적용
    const source = this.calculateSource(context);
    // TODO: applySource

    // 5. 더럽힘 처리
    // 원본: 라인 499-501
    context.stain[0] |= context.stain.player?.[4] || 0;
    if (context.stain.player) context.stain.player[4] |= context.stain[0] || 0;

    // 6. 경험 상승
    // 원본: 라인 506-510
    const isMale = context.talents[122] || 0;
    const isPlayerMale = context.playerTalents?.[122] || 0;

    if (!isMale && !isPlayerMale) {
      context.addExp(40, 6);
    }

    // 7. 플래그 설정
    context.flags[100] = 1;
    context.flags[200] = 3; // 굴복각인3

    // 8. 첫 키스 처리
    // 원본: 라인 517-543
    if ((context.cflag?.[16] || 0) === -1) {
      context.cflag[16] = 1;
      context.showMessage('첫 키스', 0xDDBBCC);

      // 복잡한 이름 설정 로직
      const targetNo = context.target.no || 0;
      const playerNo = context.player?.no || 0;
      const talent432 = context.talents[432] || 0;
      const talent76 = context.talents[76] || 0;
      const talent122 = context.talents[122] || 0;
      const talent413 = context.talents[413] || 0;

      let kissTarget = '';
      if (targetNo === 1 && playerNo === 0 && !talent432 && !talent76) {
        kissTarget = '오빠のお尻の穴';
      } else if (targetNo === 1 && playerNo === 0 && !talent432 && talent76) {
        kissTarget = '오빠のアナル';
      } else if (targetNo === 1 && playerNo === 0 && talent432) {
        kissTarget = '형님のケツ穴';
      } else if (!talent122 && !talent432 && !talent76) {
        kissTarget = `${context.player?.callName || 'CALLNAME:PLAYER'}의 엉덩이 구멍`;
      } else if (!talent122 && !talent432 && talent76) {
        kissTarget = `${context.player?.callName || 'CALLNAME:PLAYER'}의 애널`;
      } else if (!talent122 && talent432) {
        kissTarget = `${context.player?.callName || 'CALLNAME:PLAYER'}의 항문`;
      } else if (talent122 && !talent413) {
        kissTarget = `${context.player?.callName || 'CALLNAME:PLAYER'}의 항문`;
      } else if (talent122 && talent413) {
        kissTarget = `${context.player?.callName || 'CALLNAME:PLAYER'}의 엉덩이 구멍`;
      } else {
        kissTarget = `${context.player?.callName || 'CALLNAME:PLAYER'}의 엉덩이 구멍`;
      }

      context.cstr[1] = kissTarget;
      context.flags[135] = 1;
    }
  },

  /**
   * 메시지 생성
   */
  // TODO: Move generateMessage logic to execute
  // generateMessage: (context: TrainingContext) => {
    const targetName = context.target.name;
    return `${targetName}이(가) 입으로 당신의 항문을 자극했다.`;
  },
};
