/**
 * COMF23 - 배면좌위 (Back-to-Back Sitting Position)
 * 원본: ERB/指導関係/COMF23.ERB
 *
 * 조교 대상이 플레이어에게 등을 대고 앉는 체위
 * 정상위에 비해 노출과 정애가 낮지만, 조교 대상의 체력 소모가 적음
 * V감각이 높을수록 체력/기력 소모 감소
 * 파생: G스팟자극(120), 자궁구자극(121) - 임계값 60
 */

import type { CommandPlugin } from '../../types';
import type { TrainingContext, SourceValues } from '../../types';
import { SourceModifier } from '../../systems/SourceModifier';
import { VaginaSexHandler } from '../common/VaginaSexHandler';
import { PlayerEjaculationHandler } from '../../systems/PlayerEjaculation';

export const COMF23_backSitting: CommandPlugin = {
  id: 23,
  name: '배면좌위',
  category: '삽입',
  staminaCost: 20,

  /**
   * 가용성 판정
   * 원본: COMABLE.ERB @COM_ABLE23
   */
  isAvailable: (context: TrainingContext) => {
    // 촉수 지도중 불가
    if (context.equipment[90]) return false;

    // 슬라임 지도중 불가
    if (context.equipment[150]) return false;

    // 삼각목마 기승중 불가
    if (context.equipment[70]) return false;

    // 하의 OR 팬티 착용 불가
    if (context.charFlags[40] & 17) return false;

    // 검은 스타킹 불가
    if (context.charFlags[170] === 6 && context.charFlags[173] === 0) return false;

    // 기저귀 불가
    if (context.charFlags[42] === 69 && (context.charFlags[40] & 64)) return false;

    // 즈코 인형 불가
    if (context.charFlags[42] === 11 && (context.charFlags[40] & 64)) return false;

    return true;
  },

  /**
   * SOURCE 계산
   * 원본: COMF23.ERB 라인 59-310
   */
  // TODO: Move calculateSource logic to execute
  // calculateSource: (context: TrainingContext): SourceValues => {
    const { target } = context;
    const abilities = target.abl;
    const talents = context.talents;

    // 능력치
    const vSense = abilities['V감각'] || 0;
    const bSense = abilities['B감각'] || 0;
    const cSense = abilities['C감각'] || 0;
    const submission = abilities['종순'] || 0;

    // 플레이어 기교
    const playerTechnique = context.playerAbilities['기교'] || 0;

    // 후타나리 조수
    const isAssiFutanari = context.assiPlay === 1 && (context.assiTalents?.[121] === 1);

    // 기본 SOURCE 설정
    const source: number[] = new Array(19).fill(0);

    // LOSEBASE 계산 (V감각에 따라 감소)
    // 원본: COMF23.ERB 라인 62-77
    let local2 = vSense * 3;
    if (local2 <= 0) local2 = 1;
    let local3 = vSense * 2;
    if (local3 <= 0) local3 = 1;

    let loseBase0 = 20 - local2;
    if (loseBase0 <= 10) loseBase0 = 10;

    let loseBase1 = 150 - local3;
    if (loseBase1 <= 10) loseBase1 = 10;

    context.loseBase[0] += Math.floor(loseBase0);
    context.loseBase[1] += Math.floor(loseBase1);

    // 습득
    // 원본: COMF23.ERB 라인 82
    source[10] = 200;

    // V감각에 따른 쾌V, 윤활 계산
    // 원본: COMF23.ERB 라인 84-104
    if (vSense === 0) {
      source[1] = 50;
      source[6] = 50;
    } else if (vSense === 1) {
      source[1] = 150;
      source[6] = 100;
    } else if (vSense === 2) {
      source[1] = 300;
      source[6] = 200;
    } else if (vSense === 3) {
      source[1] = 600;
      source[6] = 300;
    } else if (vSense === 4) {
      source[1] = 1000;
      source[6] = 500;
    } else {
      source[1] = 1500;
      source[6] = 700;
    }

    // V경험(EXP:0) 레벨에 따른 쾌V 배율 및 고통
    // 원본: COMF23.ERB 라인 106-130
    const vExpLevel = context.getExpLevel(context.exp[0] || 0);
    if (vExpLevel < 1) {
      source[1] *= 0.20;
      source[12] = 3000;

      // 조수 플레이 && 조수가 여성이면 V절정경험 +1
      // 원본: COMF23.ERB 라인 111-114
      if (context.assiPlay === 1 && context.playerTalents[122] === 0) {
        context.exp[50] += 1;
        context.showMessage('V절정경험 +1');
      }
    } else if (vExpLevel < 2) {
      source[1] *= 0.60;
      source[12] = 240;
    } else if (vExpLevel < 3) {
      source[1] *= 1.00;
      source[12] = 30;
    } else if (vExpLevel < 4) {
      source[1] *= 1.20;
      source[12] = 5;
    } else if (vExpLevel < 5) {
      source[1] *= 1.40;
      source[12] = 0;
    } else {
      source[1] *= 1.60;
      source[12] = 0;
    }

    // B감각에 따른 쾌B 및 윤활 추가
    // 원본: COMF23.ERB 라인 132-151
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
    // 원본: COMF23.ERB 라인 153-166
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

    // 윤활도(PALAM:3) 레벨에 따른 쾌V, 고통 배율
    // 원본: COMF23.ERB 라인 168-186
    const lubLevel = context.getParamLevel(context.params[3] || 0);
    if (lubLevel < 1) {
      source[1] *= 0.40;
      source[12] += 600;
      source[12] *= 2.60;
    } else if (lubLevel < 2) {
      source[1] *= 0.70;
      source[12] += 180;
      source[12] *= 1.00;
    } else if (lubLevel < 3) {
      source[1] *= 1.00;
      source[12] *= 0.50;
    } else if (lubLevel < 4) {
      source[1] *= 1.20;
      source[12] *= 0.20;
    } else {
      source[1] *= 1.60;
      source[12] *= 0.10;
    }

    // 후타나리 조수
    // 원본: COMF23.ERB 라인 188-192
    if (isAssiFutanari) {
      source[1] *= 2.50;
    }

    // 체격 소질
    // 원본: COMF23.ERB 라인 194-202
    if (talents[99]) { // 큰 체구
      source[12] *= 0.80;
    }
    if (talents[100]) { // 소체형
      source[12] *= 2.00;
    }
    if (talents[135]) { // 미숙함
      source[12] *= 4.00;
    }

    // 정조관념 소질
    // 원본: COMF23.ERB 라인 204-223
    const vExp = context.exp[0] || 0;
    if (talents[30]) { // 정조관념
      if (vExp === 0) {
        source[6] *= 0.60;
        source[16] = 10000;
      } else {
        source[6] *= 0.60;
        source[16] = 1000;
      }
    } else if (talents[31]) { // 정조무관심
      if (vExp === 0) {
        source[6] *= 0.60;
        source[16] = 300;
      }
    } else {
      if (vExp === 0) {
        source[16] = 3000;
      }
    }

    // 욕정(PALAM:5) 레벨에 따른 배율
    // 원본: COMF23.ERB 라인 225-246
    const lustLevel = context.getParamLevel(context.params[5] || 0);
    if (lustLevel < 1) {
      source[1] *= 0.80;
      source[0] *= 0.80;
      source[6] *= 0.60;
    } else if (lustLevel < 2) {
      source[1] *= 1.00;
      source[0] *= 1.00;
      source[6] *= 1.00;
    } else if (lustLevel < 3) {
      source[1] *= 1.20;
      source[0] *= 1.10;
      source[6] *= 1.50;
    } else if (lustLevel < 4) {
      source[1] *= 1.40;
      source[0] *= 1.20;
      source[6] *= 2.00;
    } else {
      source[1] *= 1.60;
      source[0] *= 1.30;
      source[6] *= 2.60;
    }

    // 종순(ABL:10) 레벨에 따른 배율
    // 원본: COMF23.ERB 라인 248-273
    if (submission === 0) {
      source[1] *= 1.50;
      source[6] *= 1.00;
      source[16] *= 2.00;
    } else if (submission === 1) {
      source[1] *= 1.50;
      source[6] *= 1.30;
      source[16] *= 1.80;
    } else if (submission === 2) {
      source[1] *= 1.50;
      source[6] *= 1.50;
      source[16] *= 1.60;
    } else if (submission === 3) {
      source[1] *= 1.80;
      source[6] *= 1.90;
      source[16] *= 1.40;
    } else if (submission === 4) {
      source[1] *= 2.10;
      source[6] *= 2.20;
      source[16] *= 1.20;
    } else {
      source[1] *= 2.50;
      source[6] *= 2.60;
      source[16] *= 1.00;
    }

    // 플레이어 기교(ABL:PLAYER:2) 보정
    // 원본: COMF23.ERB 라인 275-306
    let techniqueBonus = 0;
    if (playerTechnique === 0) {
      source[6] += 100;
      source.욕망 = 0;
      techniqueBonus = 0;
    } else if (playerTechnique === 1) {
      source[6] += 150;
      source.욕망 += 50;
      techniqueBonus = 0;
    } else if (playerTechnique === 2) {
      source[6] += 200;
      source.욕망 += 100;
      techniqueBonus = 0;
    } else if (playerTechnique === 3) {
      source[6] += 300;
      source.욕망 += 150;
      techniqueBonus = 50;
    } else if (playerTechnique === 4) {
      source[6] += 500;
      source.욕망 += 250;
      techniqueBonus = 100;
    } else {
      source[6] += 800;
      source.욕망 += 400;
      techniqueBonus = 300;
    }

    // 기교 보너스를 쾌C에 추가
    source[0] += techniqueBonus;

    // EXPLV:10 >= 3이면 기교 보너스를 쾌V에도 추가
    // 원본: COMF23.ERB 라인 304-305
    const jExpLevel = context.getExpLevel(context.exp[10] || 0);
    if (jExpLevel >= 3) {
      source[1] += techniqueBonus;
    }

    // TALENT:85 (애인) 보정
    // 원본: COMF23.ERB 라인 307-309
    if (talents[85] === 1) {
      source[6] *= 2.00;
    }

    // SourceModifier로 소질/능력 보정 적용
    source = SourceModifier.applyAll(source, context);

    return source;
  },

  /**
   * 커맨드 실행
   * 원본: COMF23.ERB 전체
   */
  async execute(context: TrainingContext): Promise<void> {
    const targetName = context.target.name;

    // 1. 커맨드 파생 확인 (전회 커맨드가 배면좌위이고 기교 3 이상)
    // 원본: COMF23.ERB 라인 6-39
    if (context.flags[71] === 0) { // FLAG:71 == 0 (파생 설정 유효)
      const prevCom = context.prevCom || 0;
      const playerTechnique = context.playerAbilities['기교'] || 0;
      const prevTrainer = context.flags[50] || 0; // TFLAG:50 (전회 조교자)

      // 전회가 배면좌위(23)이고, 기교 > 2이고, 조교자가 동일한 경우
      const isSameTrainer = (context.assiPlay === 1 && prevTrainer === 1) ||
                             (context.assiPlay === 0 && prevTrainer === 0);

      if (prevCom === 23 && playerTechnique > 2 && isSameTrainer) {
        await this.handleCommandDerivation(context);
        return; // 파생했으면 여기서 종료
      }
    }

    // 2. 처녀 확인 및 처리
    if (context.talents[74] === 1) {
      await VaginaSexHandler.handleVirginity(context);
    }

    // 3. 커맨드명 표시
    context.showMessage('배면좌위');

    // 4. TODO: TRAIN_MESSAGE_B 호출 (행위 설명 메시지)

    // 5. V경험 플래그 설정
    // 원본: COMF23.ERB 라인 51-54
    context.flags[19] = 1; // TFLAG:19 (V경험 플래그)

    // 애인이고 조수 아니고 삽입경험 0이면
    if (context.talents[85] === 1 && context.assiPlay === 0 && (context.exp[0] || 0) === 0) {
      context.flags[20] = 1; // TFLAG:20 (애인 첫경험)
    }

    // 6. 트레이너 사정 처리
    const ejacResult = await PlayerEjaculationHandler.check(context);
    if (ejacResult.ejaculated) {
      await VaginaSexHandler.handleEjaculation(context, ejacResult);

      // 임신 판정 (콘돔 없을 시)
      if (!context.equipment[30]) {
        await VaginaSexHandler.handlePregnancy(context);
      }
    }

    // 7. SOURCE 계산 및 적용
    const source = this.calculateSource(context);
    // TODO: applySource 메서드 호출

    // 8. 경험치 획득 (VaginaSexHandler.handleAfterSex에서 처리)
    // 원본: COMF23.ERB 라인 312 (CALL COM_AFTER_VAGINA_SEX)

    // 9. PREVCOM/TFLAG 업데이트
    context.flags[59] = context.flags[50] || 0; // TFLAG:59 = 전전회 커맨드 = 전회 조교자
    context.flags[50] = context.assiPlay === 1 ? 1 : 0; // TFLAG:50 = 현재 조교자
    context.prevCom = 23;

    // 10. 더럽힘 처리
    if (ejacResult.ejaculated) {
      context.stain[3] |= 4; // STAIN:3 |= 4 (V에 정액)
    } else {
      context.stain[3] |= 2; // STAIN:3 |= 2 (V에 애액)
    }
  },

  /**
   * 커맨드 파생 처리
   * 원본: COMF23.ERB 라인 6-39
   */
  async handleCommandDerivation(context: TrainingContext): Promise<void> {
    const vSense = context.target.abl[2] || 0;
    const lustLevel = context.getParamLevel(context.params[5] || 0); // 욕정 레벨

    // 욕정 레벨 보너스
    // 원본: COMF23.ERB 라인 11-22
    let lustBonus = 0;
    if (lustLevel >= 4) lustBonus = 5;
    else if (lustLevel >= 3) lustBonus = 4;
    else if (lustLevel >= 2) lustBonus = 3;
    else if (lustLevel >= 1) lustBonus = 2;
    else lustBonus = 1;

    // 파생값 계산
    // 원본: COMF23.ERB 라인 23-26
    let derivationValue = lustBonus * (Math.floor(Math.random() * 11));
    derivationValue += (Math.floor(Math.random() * 11)) * vSense;

    // 파생 판정 (배면좌위는 60 이상에서 자궁구자극)
    // 원본: COMF23.ERB 라인 28-37
    if (derivationValue >= 60) {
      // 자궁구자극(121)으로 파생
      context.showMessage('[파생] 자궁구자극으로 파생합니다.');
      // TODO: COMF121 실행
      context.prevCom = 121;
    } else {
      // G스팟자극(120)으로 파생
      context.showMessage('[파생] G스팟자극으로 파생합니다.');
      // TODO: COMF120 실행
      context.prevCom = 120;
    }
  },

  /**
   * 메시지 생성
   * 원본: TRAIN_MESSAGE_B.ERB (배면좌위 관련 부분)
   */
  // TODO: Move generateMessage logic to execute
  // generateMessage: (context: TrainingContext) => {
    const targetName = context.target.name;

    let msg = `${targetName}은(는) 플레이어에게 등을 대고 앉아 결합했다.`;

    // V감각에 따른 반응
    const vSense = context.target.abl[2] || 0;
    if (vSense >= 4) {
      msg += ` 질 내부가 조여오며 ${targetName}의 몸이 떨린다.`;
    } else if (vSense === 0) {
      msg += ` ${targetName}은(는) 아직 미숙하지만 점차 쾌감을 느끼기 시작했다.`;
    }

    return msg;
  },
};
