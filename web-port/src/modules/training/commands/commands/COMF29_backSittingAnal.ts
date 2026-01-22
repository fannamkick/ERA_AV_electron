/**
 * COMF29 - 배면좌위애널 (Back-Sitting Anal)
 * 원본: ERB/指導関係/COMF29.ERB
 *
 * 조교 대상의 항문에 배면좌위 자세로 삽입
 */

import type { CommandPlugin } from '../../types';
import type { TrainingContext, SourceValues } from '../../types';
import { SourceModifier } from '../../systems/SourceModifier';
import { AnalSexHandler } from '../common/AnalSexHandler';
import { PlayerEjaculationHandler } from '../../systems/PlayerEjaculation';

export const COMF29_backSittingAnal: CommandPlugin = {
  id: 29,
  name: '배면좌위애널',
  category: '삽입',
  staminaCost: 70,

  /**
   * 가용성 판정
   * 원본: COMABLE.ERB @COM_ABLE29
   */
  isAvailable: (context: TrainingContext) => {
    // 촉수 지도중 불가
    if (context.equipment[90]) return false;

    // 슬라임 지도중 불가
    if (context.equipment[150]) return false;

    // 삼각목마 기승중 불가
    if (context.equipment[70]) return false;

    return true;
  },

  /**
   * SOURCE 계산
   * 원본: COMF29.ERB 라인 22-273
   */
  // TODO: Move calculateSource logic to execute
  // calculateSource: (context: TrainingContext): SourceValues => {
    const { target } = context;
    const abilities = target.abl;
    const talents = context.talents;
    const playerAbilities = context.playerAbilities || {};

    // A감각
    const aSense = abilities['A감각'] || 0;
    // B감각
    const bSense = abilities['B감각'] || 0;
    // C감각
    const cSense = abilities['C감각'] || 0;
    // 종순
    const submission = abilities['종순'] || 0;
    // 플레이어 기교
    const playerTech = playerAbilities['기교'] || 0;

    // 기본 SOURCE 설정
    const source: number[] = new Array(19).fill(0);

    // LOSEBASE 계산 (A감각에 따라 감소)
    // 원본: COMF29.ERB 라인 24-42
    // 주의: 원본 라인 28-29에 오타 있음 (LOCAL:2를 LOCAL:3으로 설정해야 하는데 LOCAL:3 = 1로 먼저 설정)
    let local2 = aSense * 3;
    if (local2 <= 0) local2 = 1;
    let local3 = aSense * 2; // 원본에서는 ABL:2로 되어 있으나 ABL:3의 오타로 추정
    if (local3 <= 0) local3 = 1;

    let loseBase0 = 70 - local2;
    if (loseBase0 <= 10) loseBase0 = 10;

    let loseBase1 = 120 - local3;
    if (loseBase1 <= 10) loseBase1 = 10;

    context.loseBase[0] += Math.floor(loseBase0);
    context.loseBase[1] += Math.floor(loseBase1);

    // A감각에 따른 쾌A, 윤활, 반감 계산
    // 원본: COMF29.ERB 라인 46-71
    if (aSense === 0) {
      source[2] += 10;
      source[6] += 10;
      source[14] += 80;
    } else if (aSense === 1) {
      source[2] += 30;
      source[6] += 130;
      source[14] += 300;
    } else if (aSense === 2) {
      source[2] += 200;
      source[6] += 500;
      source[14] += 700;
    } else if (aSense === 3) {
      source[2] += 500;
      source[6] += 1000;
      source[14] += 1500;
    } else if (aSense === 4) {
      source[2] += 900;
      source[6] += 1500;
      source[14] += 2600;
    } else {
      source[2] += 1400;
      source[6] += 2000;
      source[14] += 4000;
    }

    // A경험 레벨에 따른 쾌A 배율, 고통, LOSEBASE 추가
    // 원본: COMF29.ERB 라인 73-104
    const aExpLevel = context.getExpLevel(context.exp[1] || 0);
    if (aExpLevel < 1) {
      source[2] *= 0.10;
      source[12] = 18000;
      context.loseBase[0] += 40;
      context.loseBase[1] += 60;
    } else if (aExpLevel < 2) {
      source[2] *= 0.30;
      source[12] = 10000;
      context.loseBase[0] += 30;
      context.loseBase[1] += 50;
    } else if (aExpLevel < 3) {
      source[2] *= 0.50;
      source[12] = 4500;
      context.loseBase[0] += 20;
      context.loseBase[1] += 40;
    } else if (aExpLevel < 4) {
      source[2] *= 1.00;
      source[12] = 1500;
      context.loseBase[0] += 10;
      context.loseBase[1] += 30;
    } else if (aExpLevel < 5) {
      source[2] *= 1.40;
      source[12] = 700;
      context.loseBase[0] += 0;
      context.loseBase[1] += 20;
    } else {
      source[2] *= 1.60;
      source[12] = 300;
      context.loseBase[0] += 0;
      context.loseBase[1] += 0;
    }

    // B감각에 따른 쾌B, 윤활 계산
    // 원본: COMF29.ERB 라인 106-125
    if (bSense === 0) {
      source[3] = 50;
      source[6] += 50;
    } else if (bSense === 1) {
      source[3] = 200;
      source[6] += 200;
    } else if (bSense === 2) {
      source[3] = 500;
      source[6] += 400;
    } else if (bSense === 3) {
      source[3] = 800;
      source[6] += 600;
    } else if (bSense === 4) {
      source[3] = 1300;
      source[6] += 1000;
    } else {
      source[3] = 1800;
      source[6] += 1400;
    }

    // C감각에 따른 쾌C 계산
    // 원본: COMF29.ERB 라인 127-140
    if (cSense === 0) {
      source[0] = 40;
    } else if (cSense === 1) {
      source[0] = 160;
    } else if (cSense === 2) {
      source[0] = 500;
    } else if (cSense === 3) {
      source[0] = 900;
    } else if (cSense === 4) {
      source[0] = 1400;
    } else {
      source[0] = 2100;
    }

    // 윤활도 레벨에 따른 쾌A 배율 및 고통 추가
    // 원본: COMF29.ERB 라인 142-158
    const lubLevel = context.getParamLevel(context.params[3] || 0);
    if (lubLevel < 1) {
      source[2] *= 0.40;
      source[12] += 10000;
    } else if (lubLevel < 2) {
      source[2] *= 0.80;
      source[12] += 3600;
    } else if (lubLevel < 3) {
      source[2] *= 1.00;
      source[12] += 1200;
    } else if (lubLevel < 4) {
      source[2] *= 1.40;
      source[12] += 200;
    } else {
      source[2] *= 1.80;
      source[12] += 100;
    }

    // 후타나리 조수
    // 원본: COMF29.ERB 라인 160-164
    if (context.assiPlay === 1 && context.assiTalents?.[121] === 1) {
      source[1] *= 2.50;
    }

    // 체격 소질
    // 원본: COMF29.ERB 라인 166-174
    if (talents[99]) source[12] *= 0.80; // 큰 체구
    if (talents[100]) source[12] *= 2.00; // 소체형
    if (talents[135]) source[12] *= 2.00; // 미숙함

    // 정조관념
    // 원본: COMF29.ERB 라인 176-187
    if (talents[30]) {
      if ((context.exp[1] || 0) === 0) {
        source[6] *= 1.20;
        source.반발심 *= 1.10;
        source[16] = 500;
      } else {
        source[6] *= 1.20;
        source.반발심 *= 1.10;
        source[16] = 0;
      }
    }

    // 욕정 레벨에 따른 쾌A, 쾌C, 윤활 배율
    // 원본: COMF29.ERB 라인 189-210
    const lustLevel = context.getParamLevel(context.params[5] || 0);
    if (lustLevel < 1) {
      source[2] *= 0.80;
      source[0] *= 0.80;
      source[6] *= 0.60;
    } else if (lustLevel < 2) {
      source[2] *= 1.00;
      source[0] *= 1.00;
      source[6] *= 1.00;
    } else if (lustLevel < 3) {
      source[2] *= 1.20;
      source[0] *= 1.10;
      source[6] *= 1.50;
    } else if (lustLevel < 4) {
      source[2] *= 1.40;
      source[0] *= 1.20;
      source[6] *= 2.00;
    } else {
      source[2] *= 1.60;
      source[0] *= 1.30;
      source[6] *= 2.60;
    }

    // 종순에 따른 쾌A, 윤활, 억울 배율
    // 원본: COMF29.ERB 라인 212-237
    if (submission === 0) {
      source[2] *= 1.50;
      source[6] *= 1.00;
      source[16] *= 2.00;
    } else if (submission === 1) {
      source[2] *= 1.50;
      source[6] *= 1.30;
      source[16] *= 1.80;
    } else if (submission === 2) {
      source[2] *= 1.50;
      source[6] *= 1.50;
      source[16] *= 1.60;
    } else if (submission === 3) {
      source[2] *= 1.80;
      source[6] *= 1.90;
      source[16] *= 1.40;
    } else if (submission === 4) {
      source[2] *= 2.10;
      source[6] *= 2.20;
      source[16] *= 1.20;
    } else {
      source[2] *= 2.50;
      source[6] *= 2.60;
      source[16] *= 1.00;
    }

    // 플레이어 기교에 따른 윤활, 습득, 쾌C 보정
    // 원본: COMF29.ERB 라인 239-266
    let techBonus = 0;
    if (playerTech === 0) {
      source[6] += 100;
      source[10] = 0;
      techBonus = 0;
    } else if (playerTech === 1) {
      source[6] += 150;
      source[10] += 50;
      techBonus = 0;
    } else if (playerTech === 2) {
      source[6] += 200;
      source[10] += 100;
      techBonus = 0;
    } else if (playerTech === 3) {
      source[6] += 300;
      source[10] += 150;
      techBonus = 50;
    } else if (playerTech === 4) {
      source[6] += 500;
      source[10] += 250;
      techBonus = 100;
    } else {
      source[6] += 800;
      source[10] += 400;
      techBonus = 300;
    }

    source[0] += techBonus;

    // A경험 레벨 3 이상이면 쾌A에도 기교 보너스
    // 원본: COMF29.ERB 라인 268-269
    if (aExpLevel >= 3) {
      source[2] += techBonus;
    }

    // 애정 소질
    // 원본: COMF29.ERB 라인 271-273
    if (talents[85]) {
      source[6] *= 1.50;
    }

    // SourceModifier로 소질/능력 보정 적용
    source = SourceModifier.applyAll(source, context);

    return source;
  },

  /**
   * 커맨드 실행
   * 원본: COMF29.ERB 전체
   */
  async execute(context: TrainingContext): Promise<void> {
    // 1. 애널처녀 확인
    // 원본: COMF29.ERB 라인 6-9
    if (context.talents[76] === 1) {
      const confirmed = await AnalSexHandler.handleVirginity(context);
      if (!confirmed) return;
    }

    // 2. 커맨드명 표시
    // 원본: COMF29.ERB 라인 11-13
    context.showMessage('배면좌위애널');

    // 3. TODO: TRAIN_MESSAGE_B 호출

    // 4. A경험 플래그 설정
    // 원본: COMF29.ERB 라인 15-16
    context.flags[101] = 1; // TFLAG:101 (A경험 플래그)

    // 5. 사정 처리
    // 원본: COMF29.ERB 라인 18-19
    const ejacResult = await PlayerEjaculationHandler.checkAnal(context);
    if (ejacResult.ejaculated) {
      await AnalSexHandler.handleEjaculation(context, ejacResult);
    }

    // 6. SOURCE 계산 및 적용
    const source = this.calculateSource(context);
    // TODO: applySource 메서드 호출

    // 7. 애널섹스 후 처리
    // 원본: COMF29.ERB 라인 276
    // TODO: CALL COM_AFTER_ANAL_SEX

    // 8. PREVCOM/TFLAG 업데이트
    context.flags[59] = context.flags[50] || 0;
    context.flags[50] = context.assiPlay === 1 ? 1 : 0;
    context.prevCom = 29;

    // 9. 더럽힘 처리
    if (ejacResult.ejaculated) {
      context.stain[4] |= 4; // STAIN:4 |= 4 (A에 정액)
    } else {
      context.stain[4] |= 2; // STAIN:4 |= 2 (A에 애액)
    }
  },

  /**
   * 메시지 생성
   * 원본: TRAIN_MESSAGE_B.ERB (배면좌위애널 관련 부분)
   */
  // TODO: Move generateMessage logic to execute
  // generateMessage: (context: TrainingContext) => {
    const targetName = context.target.name;

    let msg = `${targetName}이(가) 뒤를 보며 앉아 배면좌위 자세로 항문에 삽입했다.`;

    // 종순에 따른 반응
    const submission = context.target.abl['종순'] || 0;
    if (submission >= 4) {
      msg += ` ${targetName}은(는) 스스로 허리를 흔들며 조였다.`;
    } else if (submission === 0) {
      msg += ` ${targetName}은(는) 거부감을 보였다.`;
    }

    return msg;
  },
};
