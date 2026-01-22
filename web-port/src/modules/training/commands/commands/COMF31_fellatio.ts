/**
 * COMF31 - 펠라치오 (Fellatio)
 * 원본: ERB/指導関係/COMF31.ERB
 *
 * 봉사계 커맨드: 조교 대상이 조교자의 성기를 입으로 자극
 */

import type { CommandPlugin } from '../../types';
import type { TrainingContext, SourceValues } from '../../types';
import { SourceModifier } from '../../systems/SourceModifier';
import { PlayerEjaculationHandler } from '../../systems/PlayerEjaculation';

export const COMF31_fellatio: CommandPlugin = {
  id: 31,
  name: '펠라치오',
  category: '봉사',
  staminaCost: 10,

  /**
   * 가용성 판정
   * 원본: COMABLE.ERB @COM_ABLE31
   */
  isAvailable: (context: TrainingContext) => {
    return true;
  },

  /**
   * SOURCE 계산
   * 원본: COMF31.ERB 라인 311-611
   */
  // TODO: Move calculateSource logic to execute
  // calculateSource: (context: TrainingContext): SourceValues => {
    const { target, player } = context;
    const abilities = target.abl;
    const talents = context.talents;
    const playerTalents = context.playerTalents || {};

    // 더럽힘 계산 (라인 237-279)
    let dirtyValue = 0;
    if (context.stain?.player?.[2] & 1) dirtyValue += 1;
    if (context.stain?.player?.[2] & 4) dirtyValue += 3;
    if (context.stain?.player?.[2] & 8) dirtyValue += 7;
    if (context.stain?.player?.[2] & 16) dirtyValue += 1;
    if (context.stain?.player?.[4] & 32) dirtyValue += 3;

    if (context.equipment?.[89]) dirtyValue = 7;
    if (talents[61]) dirtyValue = Math.floor(dirtyValue / 3);
    if (talents[62]) dirtyValue = Math.floor(dirtyValue * 2);

    // 기본 SOURCE 설정
    const source: number[] = new Array(19).fill(0);

    // LOSEBASE
    if (talents[47]) { // 정액음용
      context.loseBase[0] += 10;
      context.loseBase[1] += 90;
    } else {
      context.loseBase[0] += 10;
      context.loseBase[1] += 150;
    }

    // 봉사정신에 따른 SOURCE
    // 원본: 라인 327-352
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
    // 원본: 라인 355-374
    const technique = abilities['기교'] || 0;
    const techMult = [0.50, 0.80, 1.00, 1.20, 1.50, 2.00][technique] || 1.00;
    source[0] = Math.floor(source[0] * techMult);
    source[8] = Math.floor(source[8] * techMult);

    // 수간의 경우 여기서 종료
    // 원본: 라인 376-388
    if (context.equipment?.[89]) {
      // 개의 성기와 첫 키스
      if ((context.cflag?.[16] || 0) === -1) {
        context.flags[13] = 1;
        context.cflag[16] = 1;
        context.cstr[1] = '犬의 %CSTR:80%';
        context.flags[200] = 3; // 굴복각인3
      }
      return source;
    }

    // 사정 게이지 체크
    // 원본: 라인 392-475
    let ejacGauge = [1200, 1700, 2300, 3000, 3600, 4200][technique] || 1700;

    const submission = abilities['종순'] || 0;
    ejacGauge *= [0.80, 0.90, 1.00, 1.10, 1.20, 1.30][submission] || 1.00;

    const serviceTech = abilities['봉사기술'] || 0;
    ejacGauge *= [0.50, 0.80, 1.20, 1.50, 1.80, 2.40][serviceTech] || 1.00;

    const cumAddiction = abilities['정액중독'] || 0;
    ejacGauge *= [1.00, 1.20, 1.30, 1.50, 1.70, 2.00][cumAddiction] || 1.00;

    // 혀놀림
    if (talents[52]) ejacGauge *= 2.00;

    const playerCSense = context.player?.abilities?.['C감각'] || 0;
    ejacGauge *= [1.00, 1.50, 2.00, 2.50, 3.50, 5.00][playerCSense] || 1.00;

    if (playerTalents[119] || playerTalents[122] || playerTalents[121]) {
      context.player.base[2] += Math.floor(ejacGauge);
    }

    // 사정 체크
    // 원본: 라인 479-521
    const ejacLevel = PlayerEjaculationHandler.checkLevel(context);

    if (ejacLevel > 0) {
      source[0] *= 3.00;

      const cumSources = [
        [0, 2.00, 4.00],
        [500, 3.00, 3.00],
        [1200, 4.00, 2.50],
        [3000, 6.00, 2.00],
        [6000, 9.00, 1.50],
        [12000, 15.00, 1.00]
      ][cumAddiction] || [0, 2.00, 4.00];

      source.정애 = cumSources[0];
      source[8] *= cumSources[1];
      source[7] *= cumSources[2];
    }

    // 대량 사정
    // 원본: 라인 523-560
    if (ejacLevel === 2) {
      source.정애 = Math.floor((source.정애 || 0) * 2.00);
      source[8] *= 1.50;
      context.flags[0] = 2; // TFLAG:0 = 2 (입으로 사정)
    } else if (ejacLevel === 1) {
      context.flags[0] = 1;
    }

    // 후타나리라면 굴종 반감
    // 원본: 라인 608-611
    if (playerTalents[121]) {
      source[7] = Math.floor(source[7] / 2);
    }

    return source;
  },

  /**
   * 커맨드 실행
   * 원본: COMF31.ERB 전체
   */
  async execute(context: TrainingContext): Promise<void> {
    // 1. 첫 키스 확인
    // 원본: 라인 6-9
    // TODO: CALL CONFIRM_FIRSTKISS

    const prevCom = context.prevCom || 0;
    const assiPlay = context.assiPlay || 0;
    const prevTrainer = context.flags[50] || 0;
    const sameTrainer = (assiPlay && prevTrainer) || (!assiPlay && !prevTrainer);

    // 2. 파생 체크
    // 원본: 라인 12-66
    if (sameTrainer) {
      // 커닐링구스/펠라한다/식스나인 → 식스나인
      if ([1, 4, 69].includes(prevCom)) {
        // TODO: COM69
        context.showMessage('[파생] 식스나인 가능');
      }
      // 파이즈리 → 파이즈리펠라
      if (prevCom === 32) {
        // TODO: COM123
        context.showMessage('[파생] 파이즈리펠라 가능');
      }
      // 자위 → 펠라자위
      if (prevCom === 3) {
        // TODO: COM125
        context.showMessage('[파생] 펠라자위 가능');
      }
      // 펠라/파이즈리펠라/펠라자위/수음펠라 → 딥스로트/바큠펠라
      if ([31, 123, 125, 126].includes(prevCom)) {
        const rand = Math.floor(Math.random() * 11);
        if (rand > 5) {
          // TODO: COM124 (딥스로트)
          context.showMessage('[파생] 딥스로트 가능');
        } else {
          // TODO: COM127 (바큠펠라)
          context.showMessage('[파생] 바큠펠라 가능');
        }
      }
      // 수음 → 수음펠라
      if (prevCom === 30) {
        // TODO: COM126
        context.showMessage('[파생] 수음펠라 가능');
      }
    }

    // 3P 파생
    // 원본: 라인 68-84
    context.flags[42] = 0;
    if (prevCom === 64) {
      // TODO: COM64
      context.showMessage('[파생] 3P 가능');
    } else {
      const trainerChanged = (assiPlay && !prevTrainer) || (!assiPlay && prevTrainer);
      if (trainerChanged && !context.equipment?.[89]) {
        if ([20, 21, 27].includes(prevCom)) {
          // TODO: COM64
          context.showMessage('[파생] 3P 가능');
        }
      }
    }

    // 3. 커맨드명 표시
    context.showMessage('펠라치오');

    // 4. TODO: TRAIN_MESSAGE_B
    // 원본: 라인 301-302

    // 5. 키스경험 증가
    // 원본: 라인 307-308
    context.addExp(22, 1);

    // 6. SOURCE 계산 및 적용
    const source = this.calculateSource(context);
    // TODO: applySource

    // 7. 더럽힘 처리
    // 원본: 라인 564-574
    context.stain[0] |= context.stain.player?.[2] || 0;
    if (context.stain.player) context.stain.player[2] |= context.stain[0] || 0;

    // 봉사정신LV2+ && 기교LV2+ 이면 더러움 제거
    const service = context.target.abl[16] || 0;
    const technique = context.target.abl[12] || 0;
    const ejacLevel = PlayerEjaculationHandler.checkLevel(context);
    if (service >= 2 && technique >= 2) {
      if (context.stain.player) context.stain.player[2] = 2;
      if (ejacLevel >= 1) context.flags[8] = 1;
    }

    // 8. 경험 상승
    // 원본: 라인 578-606
    const isMale = context.talents[122] || 0;
    const isPlayerMale = context.playerTalents?.[122] || 0;

    if (!isMale && !isPlayerMale) {
      context.addExp(40, 7);
    } else if (isMale && isPlayerMale) {
      context.addExp(41, 7);
    }

    // 첫 키스 플래그
    context.flags[621] |= 1;
    context.flags[621] |= 2;

    // 애정경험
    if ((context.cflag?.[2] || 0) >= 1000 && !assiPlay) {
      const loveMult = context.talents[122] ? 2 : 1;
      context.addExp(23, loveMult);
    }

    // TFLAG:30 (V조교 횟수)
    if (!assiPlay && (context.exp[0] || 0) >= context.getExpLevel(3)) {
      context.flags[30] += 1;
    }

    // 9. 플래그 설정
    context.flags[100] = 1;
    context.flags[200] = 2; // 굴복각인2
  },

  /**
   * 메시지 생성
   */
  // TODO: Move generateMessage logic to execute
  // generateMessage: (context: TrainingContext) => {
    const targetName = context.target.name;
    return `${targetName}이(가) 입으로 당신의 성기를 자극했다.`;
  },
};
