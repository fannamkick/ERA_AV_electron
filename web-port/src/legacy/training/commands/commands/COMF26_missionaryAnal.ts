/**
 * COMF26 - 정상위애널 (Missionary Anal)
 * 원본: ERB/指導関係/COMF26.ERB
 *
 * 조교 대상의 항문에 정상위 자세로 삽입
 * 통상의 질 정상위에 비해 정애는 낮지만 굴종이 상승
 */

import type { CommandPlugin } from '../../types';
import type { TrainingContext, SourceValues } from '../../types';
import { SourceModifier } from '../../systems/SourceModifier';
import { AnalSexHandler } from '../common/AnalSexHandler';
import { PlayerEjaculationHandler } from '../../systems/PlayerEjaculation';

export const COMF26_missionaryAnal: CommandPlugin = {
  id: 26,
  name: '정상위애널',
  category: '삽입',
  staminaCost: 80,

  /**
   * 가용성 판정
   * 원본: COMABLE.ERB @COM_ABLE26
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
   * 원본: COMF26.ERB 라인 41-223
   */
  // TODO: Move calculateSource logic to execute
  // calculateSource: (context: TrainingContext): SourceValues => {
    const { target } = context;
    const abilities = target.abl;
    const talents = context.talents;

    // A감각
    const aSense = abilities['A감각'] || 0;
    // 종순 (원본에서는 ABL:0으로 참조되어 있으나, 문맥상 종순으로 추정)
    const submission = abilities['종순'] || 0;

    // 기본 SOURCE 설정
    const source: number[] = new Array(19).fill(0);

    // LOSEBASE 계산 (A감각에 따라 감소)
    // 원본: COMF26.ERB 라인 44-62
    let local2 = aSense * 3;
    if (local2 <= 0) local2 = 1;
    let local3 = aSense * 2;
    if (local3 <= 0) local3 = 1;

    let loseBase0 = 80 - local2;
    if (loseBase0 <= 10) loseBase0 = 10;

    let loseBase1 = 120 - local3;
    if (loseBase1 <= 10) loseBase1 = 10;

    // A감각에 따른 쾌A, 윤활, 반감 계산
    // 원본: COMF26.ERB 라인 66-91
    if (aSense === 0) {
      source[2] = 10;
      source[6] = 10;
      source[14] = 100;
    } else if (aSense === 1) {
      source[2] = 30;
      source[6] = 30;
      source[14] = 500;
    } else if (aSense === 2) {
      source[2] = 400;
      source[6] = 150;
      source[14] = 1200;
    } else if (aSense === 3) {
      source[2] = 900;
      source[6] = 300;
      source[14] = 2400;
    } else if (aSense === 4) {
      source[2] = 1600;
      source[6] = 500;
      source[14] = 3600;
    } else {
      source[2] = 2100;
      source[6] = 900;
      source[14] = 5000;
    }

    // A경험 레벨에 따른 쾌A 배율, 고통, LOSEBASE 추가
    // 원본: COMF26.ERB 라인 93-124
    const aExpLevel = context.getExpLevel(context.exp[1] || 0);
    if (aExpLevel < 1) {
      source[2] *= 0.10;
      source[12] = 20000;
      loseBase0 += 50;
      loseBase1 += 100;
    } else if (aExpLevel < 2) {
      source[2] *= 0.30;
      source[12] = 12000;
      loseBase0 += 40;
      loseBase1 += 80;
    } else if (aExpLevel < 3) {
      source[2] *= 0.50;
      source[12] = 5000;
      loseBase0 += 30;
      loseBase1 += 60;
    } else if (aExpLevel < 4) {
      source[2] *= 1.00;
      source[12] = 1800;
      loseBase0 += 20;
      loseBase1 += 40;
    } else if (aExpLevel < 5) {
      source[2] *= 1.40;
      source[12] = 1000;
      loseBase0 += 10;
      loseBase1 += 20;
    } else {
      source[2] *= 1.60;
      source[12] = 600;
      loseBase0 += 0;
      loseBase1 += 0;
    }

    context.loseBase[0] += Math.floor(loseBase0);
    context.loseBase[1] += Math.floor(loseBase1);

    // 윤활도 레벨에 따른 쾌A 배율 및 고통 추가
    // 원본: COMF26.ERB 라인 126-142
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
    // 원본: COMF26.ERB 라인 144-148
    if (context.assiPlay === 1 && context.assiTalents?.[121] === 1) {
      source[1] *= 2.50;
    }

    // 체격 소질
    // 원본: COMF26.ERB 라인 150-158
    if (talents[99]) source[12] *= 0.80; // 큰 체구
    if (talents[100]) source[12] *= 2.00; // 소체형
    if (talents[135]) source[12] *= 2.00; // 미숙함

    // 정조관념
    // 원본: COMF26.ERB 라인 160-171
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
    // 원본: COMF26.ERB 라인 173-189
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
    // 원본: COMF26.ERB 라인 191-210
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

    // A민감/둔감 소질
    // 원본: COMF26.ERB 라인 212-222
    if (talents[105]) { // A민감
      source[12] *= 1.50;
      source[14] *= 1.50;
      source[11] *= 1.50;
    } else if (talents[106]) { // 둔감
      source[12] *= 0.60;
      source[14] *= 0.60;
      source[11] *= 0.60;
    }

    // SourceModifier로 소질/능력 보정 적용
    source = SourceModifier.applyAll(source, context);

    return source;
  },

  /**
   * 커맨드 실행
   * 원본: COMF26.ERB 전체
   */
  async execute(context: TrainingContext): Promise<void> {
    // 1. 3P 파생 체크
    // 원본: COMF26.ERB 라인 13-29
    const prevCom = context.prevCom || 0;
    context.flags[42] = 0; // TFLAG:42 (3P플래그) 초기화

    if (prevCom === 64) {
      // TODO: COM_ABLE64 체크 및 COM64로 점프
      context.showMessage('[파생] 3P로 파생 가능');
    } else {
      const prevTrainer = context.flags[50] || 0;
      const trainerChanged = (context.assiPlay === 1 && prevTrainer === 0) ||
                             (context.assiPlay === 0 && prevTrainer === 1);
      if (trainerChanged && (prevCom === 31 || prevCom === 80)) {
        // TODO: COM_ABLE64 체크 및 COM64로 점프
        context.showMessage('[파생] 펠라치오/이라마치오 후 3P로 파생 가능');
      }
    }

    // 2. 애널처녀 확인
    if (context.talents[76] === 1) {
      await AnalSexHandler.handleVirginity(context);
    }

    // 3. 커맨드명 표시
    context.showMessage('정상위애널');

    // 4. TODO: TRAIN_MESSAGE_B 호출

    // 5. A경험 플래그 설정
    // 원본: COMF26.ERB 라인 35-36
    context.flags[101] = 1; // TFLAG:101 (A경험 플래그)

    // 6. 사정 처리
    // 원본: COMF26.ERB 라인 38-39
    const ejacResult = await PlayerEjaculationHandler.checkAnal(context);
    if (ejacResult.ejaculated) {
      await AnalSexHandler.handleEjaculation(context, ejacResult);
    }

    // 7. SOURCE 계산 및 적용
    const source = this.calculateSource(context);
    // TODO: applySource 메서드 호출

    // 8. 애널섹스 후 처리
    // 원본: COMF26.ERB 라인 224-225
    // TODO: CALL COM_AFTER_ANAL_SEX

    // 9. PREVCOM/TFLAG 업데이트
    context.flags[59] = context.flags[50] || 0;
    context.flags[50] = context.assiPlay === 1 ? 1 : 0;
    context.prevCom = 26;

    // 10. 더럽힘 처리
    if (ejacResult.ejaculated) {
      context.stain[4] |= 4; // STAIN:4 |= 4 (A에 정액)
    } else {
      context.stain[4] |= 2; // STAIN:4 |= 2 (A에 애액)
    }
  },

  /**
   * 메시지 생성
   * 원본: TRAIN_MESSAGE_B.ERB (정상위애널 관련 부분)
   */
  // TODO: Move generateMessage logic to execute
  // generateMessage: (context: TrainingContext) => {
    const targetName = context.target.name;

    let msg = `${targetName}의 항문에 정상위 자세로 삽입했다.`;

    // A감각에 따른 반응
    const aSense = context.target.abl[3] || 0;
    if (aSense >= 4) {
      msg += ` ${targetName}의 항문이 조여오며 몸을 떨었다.`;
    } else if (aSense === 0) {
      msg += ` ${targetName}은(는) 항문의 이물감에 신음을 흘렸다.`;
    }

    return msg;
  },
};
