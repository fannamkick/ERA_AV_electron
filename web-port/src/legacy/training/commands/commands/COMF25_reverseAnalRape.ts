/**
 * COMF25 - 역애널강간 (Reverse Anal Rape)
 * 원본: ERB/指導関係/COMF25.ERB
 *
 * 조교자(플레이어/조수)가 조교 대상의 페니스를 자신의 항문에 삽입하는 체위
 * COMF24(역강간)의 애널 버전
 * 플레이어의 애널처녀 여부 확인 필요
 * 대상이 남성 or 후타나리일 때만 가능
 */

import type { CommandPlugin } from '../../types';
import type { TrainingContext, SourceValues } from '../../types';
import { SourceModifier } from '../../systems/SourceModifier';

export const COMF25_reverseAnalRape: CommandPlugin = {
  id: 25,
  name: '역애널강간',
  category: '삽입',
  staminaCost: 40,

  /**
   * 가용성 판정
   * 원본: COMABLE.ERB @COM_ABLE25
   */
  isAvailable: (context: TrainingContext) => {
    // 대상이 남성 OR 후타나리여야 함
    const isMale = context.talents[122] === 1;
    const isFutanari = context.talents[121] === 1;
    if (!isMale && !isFutanari) return false;

    return true;
  },

  /**
   * SOURCE 계산
   * 원본: COMF25.ERB 라인 144-221
   */
  // TODO: Move calculateSource logic to execute
  // calculateSource: (context: TrainingContext): SourceValues => {
    const { target } = context;
    const abilities = target.abl;
    const talents = context.talents;

    // 능력치
    const cSense = abilities['C감각'] || 0;

    // 플레이어 능력치
    const playerTechnique = context.playerAbilities['기교'] || 0;
    const playerASense = context.playerAbilities['A감각'] || 0;

    // 기본 SOURCE 설정
    const source: number[] = new Array(19).fill(0);

    // LOSEBASE
    let loseBase0 = 40; // 체력
    let loseBase1 = 75; // 기력

    context.loseBase[0] += Math.floor(loseBase0);
    context.loseBase[1] += Math.floor(loseBase1);

    // C감각에 따른 쾌C 및 수치심 배율
    // 원본: COMF25.ERB 라인 154-173
    if (cSense === 0) {
      source[0] = 800;
      source[11] *= 3.00;
    } else if (cSense === 1) {
      source[0] = 1400;
      source[11] *= 2.00;
    } else if (cSense === 2) {
      source[0] = 2000;
      source[11] *= 1.50;
    } else if (cSense === 3) {
      source[0] = 2500;
      source[11] *= 1.00;
    } else if (cSense === 4) {
      source[0] = 2900;
      source[11] *= 0.80;
    } else {
      source[0] = 3200;
      source[11] *= 0.60;
    }

    // 플레이어 기교에 따른 쾌C 배율 및 굴종
    // 원본: COMF25.ERB 라인 175-197
    if (playerTechnique === 0) {
      source[0] *= 0.50;
      source[7] = 1600;
    } else if (playerTechnique === 1) {
      source[0] *= 0.80;
      source[7] = 1900;
    } else if (playerTechnique === 2) {
      source[0] *= 1.00;
      source[7] = 2300;
    } else if (playerTechnique === 3) {
      source[0] *= 1.50;
      source[7] = 2700;
    } else if (playerTechnique === 4) {
      source[0] *= 2.50;
      source[7] = 3100;
    } else if (playerTechnique === 5) {
      source[0] *= 3.00;
      source[7] = 3500;
    } else {
      source[0] *= 4.00;
      source[7] = 4000;
    }

    // 플레이어 A감각에 따른 쾌C 배율
    // 원본: COMF25.ERB 라인 199-214
    if (playerASense === 0) {
      source[0] *= 0.50;
    } else if (playerASense === 1) {
      source[0] *= 0.80;
    } else if (playerASense === 2) {
      source[0] *= 1.00;
    } else if (playerASense === 3) {
      source[0] *= 1.20;
    } else if (playerASense === 4) {
      source[0] *= 1.50;
    } else if (playerASense === 5) {
      source[0] *= 2.00;
    } else {
      source[0] *= 3.00;
    }

    // 대상이 여성이 아닌 경우 (남성/후타나리)
    // 원본: COMF25.ERB 라인 216-220
    if (talents[122] === 0) { // 여성이 아님
      source[10] = 1200;
      source[11] *= 6.00;
    }

    // SourceModifier로 소질/능력 보정 적용
    source = SourceModifier.applyAll(source, context);

    return source;
  },

  /**
   * 커맨드 실행
   * 원본: COMF25.ERB 전체
   */
  async execute(context: TrainingContext): Promise<void> {
    const targetName = context.target.name;
    const playerName = context.player?.name || '플레이어';

    // 1. 커맨드명 표시
    context.showMessage('역애널강간');

    // 2. 메시지 출력
    // 원본: COMF25.ERB 라인 13-30
    const prevCom = context.prevCom || 0;
    const prevTrainer = context.flags[50] || 0;
    const isSameTrainer = (context.assiPlay === 1 && prevTrainer === 1) ||
                          (context.assiPlay === 0 && prevTrainer === 0);

    if (context.flags[60] === 1 && prevCom === 25 && isSameTrainer) {
      // 뽑지 않고 연속
      context.showMessage(`${playerName}은 ${targetName}의 육봉을 꽉 잡은채 집요하게 허리를 흔들었다…`);
    } else {
      let msg = `${playerName}은 `;
      if (context.equipment[44]) msg += '묶여진 ';
      msg += `${targetName}의 몸 위에 올라타 발기한 육봉을 강제로 `;
      if ((context.playerExp?.[2] || 0) === 0) msg += '남자를 모르는 ';
      msg += '항문 깊숙이 삽입했다…';
      context.showMessage(msg);
    }

    // 3. 플레이어 애널처녀 확인
    // 원본: COMF25.ERB 라인 32-44
    if (context.playerTalents[2] === 1) {
      // TODO: 사용자 입력으로 애널처녀를 줄 것인지 확인
      context.showMessage(`[확인] ${playerName}의 애널처녀를 ${targetName}에게 줍니까? -> 예`);
    }

    // 4. 대상의 사정 게이지 계산 (플레이어가 아닌 대상이 사정함)
    // 원본: COMF25.ERB 라인 46-142
    const targetEjacGauge = this.calculateTargetEjaculationGauge(context);
    if (context.talents[121] === 1 || context.talents[122] === 1) { // 대상이 남성/후타나리
      context.playerBase[2] += targetEjacGauge;
    }

    // 5. SOURCE 계산 및 적용
    const source = this.calculateSource(context);
    // TODO: applySource 메서드 호출

    // 6. 더럽힘 처리
    // 원본: COMF25.ERB 라인 223-228
    // 대상의 P ↔ 플레이어의 A 더럽힘 이동
    const targetPStain = context.stain[2] || 0;
    const playerAStain = context.playerStain?.[4] || 0;
    context.stain[2] |= playerAStain;
    if (context.playerStain) context.playerStain[4] |= targetPStain;

    // 7. 경험치 획득
    // 원본: COMF25.ERB 라인 230-298

    // 레즈/호모 경험
    if (context.talents[122] === 0 && context.playerTalents[122] === 0) {
      context.exp[40] += 4;
      context.showMessage('레즈경험 +4');
    } else if (context.talents[122] === 1 && context.playerTalents[122] === 1) {
      context.exp[41] += 4;
      context.showMessage('호모경험 +4');
    }

    // 성교경험
    context.exp[5] += 1;
    context.showMessage('성교경험 +1');

    // 플레이어 A경험 (플레이어 A감각에 따라)
    // 원본: COMF25.ERB 라인 248-261
    const playerASense = context.playerAbilities['A감각'] || 0;
    let playerAExpGain = 0;
    if (playerASense <= 1) playerAExpGain = 2;
    else if (playerASense <= 4) playerAExpGain = 3;
    else if (playerASense <= 7) playerAExpGain = 4;
    else playerAExpGain = 5;

    if (context.playerExp) context.playerExp[1] += playerAExpGain;
    context.showMessage(`A경험 +${playerAExpGain} (${playerName})`);

    // 플레이어 성교경험
    if (context.playerExp) context.playerExp[5] += 1;
    context.showMessage(`성교경험 +1 (${playerName})`);

    // TODO: EVENT_SEITSU_REVARAPE 호출 (정통 이벤트)

    // 이상경험
    // 원본: COMF25.ERB 라인 268-287
    let abnormalExp = 0;
    // TODO: INCEST 체크
    if (abnormalExp > 0) {
      context.exp[50] += abnormalExp;
      context.showMessage(`이상경험 +${abnormalExp}`);
    }

    // 플레이어 이상경험 (플레이어가 애널처녀일 경우)
    if (context.playerTalents[2] === 1) {
      if (context.playerExp) context.playerExp[50] += 1;
      context.showMessage(`이상경험 +1 (${playerName})`);
    }

    // 애정경험
    // 원본: COMF25.ERB 라인 289-298
    let affectionExp = 0;
    if (context.playerTalents[2] === 1) {
      affectionExp = 100; // 플레이어 애널처녀
    }
    if ((context.charFlags[2] || 0) >= 1000 && context.assiPlay === 0) {
      context.exp[23] += affectionExp;
      context.showMessage(`애정경험 +${affectionExp}`);
    }

    // 8. 플레이어 애널처녀 상실
    // 원본: COMF25.ERB 라인 304-317
    if (context.playerTalents[2] === 1) {
      context.playerTalents[2] = 0;
      context.showMessage(`【애널처녀상실(${playerName})】`);
      // TODO: CSTR:PLAYER:3, CFLAG:PLAYER 설정
      if (context.playerCharFlags) {
        context.playerCharFlags[830] = context.base[9];
        context.playerCharFlags[831] = context.day?.[1] || 0;
        context.playerCharFlags[832] = context.day?.[2] || 0;
        context.playerCharFlags[833] = 14;
        context.playerCharFlags[834] = 1;
        context.playerCharFlags[616] = 1;
      }
    }

    // 9. PREVCOM/TFLAG 업데이트
    context.flags[59] = context.flags[50] || 0;
    context.flags[50] = context.assiPlay === 1 ? 1 : 0;
    context.prevCom = 25;
  },

  /**
   * 대상의 사정 게이지 계산
   * 원본: COMF25.ERB 라인 46-142
   * (COMF24와 동일한 로직)
   */
  calculateTargetEjaculationGauge(context: TrainingContext): number {
    const abilities = context.target.abl;

    // 기교
    const technique = abilities['기교'] || 0;
    // 종순
    const submission = abilities['종순'] || 0;
    // 봉사정신
    const service = abilities['봉사정신'] || 0;
    // C감각
    const cSense = abilities['C감각'] || 0;

    // 플레이어 V감각 (원본 ERB에서는 V감각 사용)
    const playerVSense = context.playerAbilities['V감각'] || 0;
    // 플레이어 V경험 레벨
    const playerVExpLevel = context.getExpLevel(context.playerExp?.[0] || 0);

    let gauge = 0;

    // 기교에 따른 기본 게이지
    if (technique === 0) gauge = 50;
    else if (technique === 1) gauge = 300;
    else if (technique === 2) gauge = 800;
    else if (technique === 3) gauge = 1500;
    else if (technique === 4) gauge = 2000;
    else gauge = 3200;

    // 종순 보정
    if (submission === 0) gauge *= 0.80;
    else if (submission === 1) gauge *= 0.90;
    else if (submission === 2) gauge *= 1.00;
    else if (submission === 3) gauge *= 1.10;
    else if (submission === 4) gauge *= 1.20;
    else gauge *= 1.30;

    // 봉사정신 보정
    if (service === 0) gauge *= 0.50;
    else if (service === 1) gauge *= 0.80;
    else if (service === 2) gauge *= 1.20;
    else if (service === 3) gauge *= 1.50;
    else if (service === 4) gauge *= 1.80;
    else gauge *= 2.40;

    // 플레이어 V감각 보정
    if (playerVSense === 0) gauge *= 0.50;
    else if (playerVSense === 1) gauge *= 0.80;
    else if (playerVSense === 2) gauge *= 1.00;
    else if (playerVSense === 3) gauge *= 1.20;
    else if (playerVSense === 4) gauge *= 1.50;
    else gauge *= 2.00;

    // 플레이어 V경험 보정
    if (playerVExpLevel < 1) gauge *= 0.20;
    else if (playerVExpLevel < 2) gauge *= 0.50;
    else if (playerVExpLevel < 3) gauge *= 0.80;
    else if (playerVExpLevel < 4) gauge *= 1.00;
    else if (playerVExpLevel < 5) gauge *= 1.20;
    else gauge *= 1.40;

    // C감각 보정
    if (cSense === 0) gauge *= 1.00;
    else if (cSense === 1) gauge *= 1.50;
    else if (cSense === 2) gauge *= 2.00;
    else if (cSense === 3) gauge *= 2.50;
    else if (cSense === 4) gauge *= 3.50;
    else gauge *= 5.00;

    return Math.floor(gauge);
  },

  /**
   * 메시지 생성
   * 원본: TRAIN_MESSAGE_B.ERB (역애널강간 관련 부분)
   */
  // TODO: Move generateMessage logic to execute
  // generateMessage: (context: TrainingContext) => {
    const targetName = context.target.name;
    const playerName = context.player?.name || '플레이어';

    let msg = `${playerName}은 ${targetName}의 몸 위에 올라타 강제로 항문에 삽입했다.`;

    // 플레이어 기교에 따른 묘사
    const playerTechnique = context.playerAbilities['기교'] || 0;
    if (playerTechnique >= 4) {
      msg += ` ${playerName}의 숙련된 움직임에 ${targetName}은 저항할 수 없다.`;
    } else if (playerTechnique === 0) {
      msg += ` ${playerName}은 서툰 움직임으로 허리를 흔들고 있다.`;
    }

    return msg;
  },
};
