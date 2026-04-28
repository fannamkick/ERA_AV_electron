/**
 * COMF28 - 대면좌위애널 (Face-Sitting Anal)
 * 원본: ERB/指導関係/COMF28.ERB
 *
 * 조교 대상의 항문에 대면좌위 자세로 삽입
 */

import type { CommandPlugin } from '../../types';
import type { TrainingContext, SourceValues } from '../../types';
import { SourceModifier } from '../../systems/SourceModifier';
import { AnalSexHandler } from '../common/AnalSexHandler';
import { PlayerEjaculationHandler } from '../../systems/PlayerEjaculation';

export const COMF28_faceSittingAnal: CommandPlugin = {
  id: 28,
  name: '대면좌위애널',
  category: '삽입',
  staminaCost: 60,

  /**
   * 가용성 판정
   * 원본: COMABLE.ERB @COM_ABLE28
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
   * 원본: COMF28.ERB 라인 22-261
   */
  // TODO: Move calculateSource logic to execute
  // calculateSource: (context: TrainingContext): SourceValues => {
    const { target } = context;
    const abilities = target.abl;
    const talents = context.talents;
    const playerAbilities = context.playerAbilities || {};

    // A감각
    const aSense = abilities['A감각'] || 0;
    // 봉사정신
    const service = abilities['봉사정신'] || 0;
    // 종순
    const submission = abilities['종순'] || 0;
    // 플레이어 기교
    const playerTech = playerAbilities['기교'] || 0;

    // 기본 SOURCE 설정
    const source: number[] = new Array(19).fill(0);

    // LOSEBASE 계산 (A감각에 따라 감소)
    // 원본: COMF28.ERB 라인 24-42
    let local2 = aSense * 3;
    if (local2 <= 0) local2 = 1;
    let local3 = aSense * 2;
    if (local3 <= 0) local3 = 1;

    let loseBase0 = 60 - local2;
    if (loseBase0 <= 10) loseBase0 = 10;

    let loseBase1 = 120 - local3;
    if (loseBase1 <= 10) loseBase1 = 10;

    context.loseBase[0] += Math.floor(loseBase0);
    context.loseBase[1] += Math.floor(loseBase1);

    // A감각에 따른 쾌A, 윤활, 반감 계산
    // 원본: COMF28.ERB 라인 48-73
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
    // 원본: COMF28.ERB 라인 75-106
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

    // 윤활도 레벨에 따른 쾌A 배율 및 고통 추가
    // 원본: COMF28.ERB 라인 108-124
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

    // 봉사정신에 따른 굴복, 굴종, 반발심, 불쾌 계산
    // 원본: COMF28.ERB 라인 126-157
    if (service === 0) {
      source[9] = 50;
      source[7] = 10;
      source.반발심 = 100;
      source[15] *= 4.00;
    } else if (service === 1) {
      source[9] = 150;
      source[7] = 50;
      source.반발심 = 300;
      source[15] *= 2.50;
    } else if (service === 2) {
      source[9] = 300;
      source[7] = 100;
      source.반발심 = 700;
      source[15] *= 1.50;
    } else if (service === 3) {
      source[9] = 400;
      source[7] = 200;
      source.반발심 = 1200;
      source[15] *= 1.00;
    } else if (service === 4) {
      source[9] = 500;
      source[7] = 300;
      source.반발심 = 1800;
      source[15] *= 0.50;
    } else {
      source[9] = 800;
      source[7] = 500;
      source.반발심 = 2500;
      source[15] *= 0.10;
    }

    // 후타나리 조수
    // 원본: COMF28.ERB 라인 159-163
    if (context.assiPlay === 1 && context.assiTalents?.[121] === 1) {
      source[1] *= 2.50;
    }

    // 체격 소질
    // 원본: COMF28.ERB 라인 165-173
    if (talents[99]) source[12] *= 0.80; // 큰 체구
    if (talents[100]) source[12] *= 2.00; // 소체형
    if (talents[135]) source[12] *= 2.00; // 미숙함

    // 정조관념
    // 원본: COMF28.ERB 라인 175-186
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

    // 욕정 레벨에 따른 쾌A, 반감 배율
    // 원본: COMF28.ERB 라인 188-204
    const lustLevel = context.getParamLevel(context.params[5] || 0);
    if (lustLevel < 1) {
      source[2] *= 0.60;
      source[14] *= 0.60;
    } else if (lustLevel < 2) {
      source[2] *= 0.80;
      source[14] *= 0.80;
    } else if (lustLevel < 3) {
      source[2] *= 1.00;
      source[14] *= 1.00;
    } else if (lustLevel < 4) {
      source[2] *= 1.20;
      source[14] *= 1.20;
    } else {
      source[2] *= 1.40;
      source[14] *= 1.40;
    }

    // 종순에 따른 윤활, 억울 배율
    // 원본: COMF28.ERB 라인 206-225
    if (submission === 0) {
      source[6] *= 0.60;
      source[16] *= 2.00;
    } else if (submission === 1) {
      source[6] *= 0.80;
      source[16] *= 1.50;
    } else if (submission === 2) {
      source[6] *= 1.00;
      source[16] *= 1.00;
    } else if (submission === 3) {
      source[6] *= 1.20;
      source[16] *= 0.80;
    } else if (submission === 4) {
      source[6] *= 1.40;
      source[16] *= 0.60;
    } else {
      source[6] *= 1.60;
      source[16] *= 0.30;
    }

    // 플레이어 기교에 따른 윤활, 습득, 쾌C 보정
    // 원본: COMF28.ERB 라인 227-254
    let techBonus = 0;
    if (playerTech === 0) {
      source[6] += 100;
      source[10] += 0;
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

    // 애정 소질
    // 원본: COMF28.ERB 라인 256-261
    if (talents[85]) {
      source[6] *= 3.00;
      source[9] *= 2.00;
      source.반발심 *= 2.00;
    }

    // SourceModifier로 소질/능력 보정 적용
    source = SourceModifier.applyAll(source, context);

    return source;
  },

  /**
   * 커맨드 실행
   * 원본: COMF28.ERB 전체
   */
  async execute(context: TrainingContext): Promise<void> {
    // 1. 애널처녀 확인
    // 원본: COMF28.ERB 라인 6-9
    if (context.talents[76] === 1) {
      const confirmed = await AnalSexHandler.handleVirginity(context);
      if (!confirmed) return;
    }

    // 2. 커맨드명 표시
    // 원본: COMF28.ERB 라인 12-14
    context.showMessage('대면좌위애널');

    // 3. TODO: TRAIN_MESSAGE_B 호출

    // 4. A경험 플래그 설정
    // 원본: COMF28.ERB 라인 16-17
    context.flags[101] = 1; // TFLAG:101 (A경험 플래그)

    // 5. 사정 처리
    // 원본: COMF28.ERB 라인 18-19
    const ejacResult = await PlayerEjaculationHandler.checkAnal(context);
    if (ejacResult.ejaculated) {
      await AnalSexHandler.handleEjaculation(context, ejacResult);
    }

    // 6. SOURCE 계산 및 적용
    const source = this.calculateSource(context);
    // TODO: applySource 메서드 호출

    // 7. 애널섹스 후 처리
    // 원본: COMF28.ERB 라인 264
    // TODO: CALL COM_AFTER_ANAL_SEX

    // 8. PREVCOM/TFLAG 업데이트
    context.flags[59] = context.flags[50] || 0;
    context.flags[50] = context.assiPlay === 1 ? 1 : 0;
    context.prevCom = 28;

    // 9. 더럽힘 처리
    if (ejacResult.ejaculated) {
      context.stain[4] |= 4; // STAIN:4 |= 4 (A에 정액)
    } else {
      context.stain[4] |= 2; // STAIN:4 |= 2 (A에 애액)
    }
  },

  /**
   * 메시지 생성
   * 원본: TRAIN_MESSAGE_B.ERB (대면좌위애널 관련 부분)
   */
  // TODO: Move generateMessage logic to execute
  // generateMessage: (context: TrainingContext) => {
    const targetName = context.target.name;

    let msg = `${targetName}이(가) 위에 앉아 대면좌위 자세로 항문에 삽입했다.`;

    // 봉사정신에 따른 반응
    const service = context.target.abl[16] || 0;
    if (service >= 4) {
      msg += ` ${targetName}은(는) 자발적으로 허리를 움직였다.`;
    } else if (service === 0) {
      msg += ` ${targetName}은(는) 불쾌감을 드러냈다.`;
    }

    return msg;
  },
};
