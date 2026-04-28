/**
 * COMF24 - 역강간 (Reverse Rape)
 * 원본: ERB/指導関係/COMF24.ERB
 *
 * 조교자(플레이어/조수)가 조교 대상의 페니스를 자신의 질에 삽입하는 체위
 * 일반 삽입 체위와 달리 플레이어가 받는 쪽이 됨
 * 플레이어의 처녀 여부 확인 필요
 * 대상이 남성 or 후타나리일 때만 가능
 */

import type { CommandPlugin } from '../../types';
import type { TrainingContext, SourceValues } from '../../types';
import { SourceModifier } from '../../systems/SourceModifier';

export const COMF24_reverseRape: CommandPlugin = {
  id: 24,
  name: '역강간',
  category: '삽입',
  staminaCost: 40,

  /**
   * 가용성 판정
   * 원본: COMABLE.ERB @COM_ABLE24
   */
  isAvailable: (context: TrainingContext) => {
    // 대상이 남성 OR 후타나리여야 함
    const isMale = context.talents[122] === 1;
    const isFutanari = context.talents[121] === 1;
    if (!isMale && !isFutanari) return false;

    // 조교자가 여성이어야 함
    const isPlayerFemale = context.playerTalents[122] === 0;
    if (!isPlayerFemale) return false;

    return true;
  },

  /**
   * SOURCE 계산
   * 원본: COMF24.ERB 라인 171-253
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
    const playerVSense = context.playerAbilities['V감각'] || 0;

    // 기본 SOURCE 설정
    const source: number[] = new Array(19).fill(0);

    // LOSEBASE
    let loseBase0 = 40; // 체력
    let loseBase1 = 75; // 기력

    context.loseBase[0] += Math.floor(loseBase0);
    context.loseBase[1] += Math.floor(loseBase1);

    // C감각에 따른 쾌C 및 수치심 배율
    // 원본: COMF24.ERB 라인 181-200
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
    // 원본: COMF24.ERB 라인 202-224
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

    // 플레이어 V감각에 따른 쾌C 배율
    // 원본: COMF24.ERB 라인 226-241
    if (playerVSense === 0) {
      source[0] *= 0.50;
    } else if (playerVSense === 1) {
      source[0] *= 0.80;
    } else if (playerVSense === 2) {
      source[0] *= 1.00;
    } else if (playerVSense === 3) {
      source[0] *= 1.20;
    } else if (playerVSense === 4) {
      source[0] *= 1.50;
    } else if (playerVSense === 5) {
      source[0] *= 2.00;
    } else {
      source[0] *= 3.00;
    }

    // 대상이 여성이 아닌 경우 (남성/후타나리)
    // 원본: COMF24.ERB 라인 243-247
    if (talents[122] === 0) { // 여성이 아님
      source[10] = 1200;
      source[11] *= 6.00;
    }

    // 플레이어가 처녀인 경우
    // 원본: COMF24.ERB 라인 249-253
    if (context.playerTalents[0] === 1) { // 플레이어 처녀
      source[14] *= 20.00;
      source[11] *= 3.00;
    }

    // SourceModifier로 소질/능력 보정 적용
    source = SourceModifier.applyAll(source, context);

    return source;
  },

  /**
   * 커맨드 실행
   * 원본: COMF24.ERB 전체
   */
  async execute(context: TrainingContext): Promise<void> {
    const targetName = context.target.name;
    const playerName = context.player?.name || '플레이어';

    // 1. 커맨드명 표시
    context.showMessage('역강간');

    // 2. 메시지 출력
    // 원본: COMF24.ERB 라인 13-30
    const prevCom = context.prevCom || 0;
    const prevTrainer = context.flags[50] || 0;
    const isSameTrainer = (context.assiPlay === 1 && prevTrainer === 1) ||
                          (context.assiPlay === 0 && prevTrainer === 0);

    if (context.flags[60] === 1 && prevCom === 24 && isSameTrainer) {
      // 뽑지 않고 연속
      context.showMessage(`${playerName}은 ${targetName}의 페니스를 꽉 잡은채 집요하게 허리를 흔들었다…`);
    } else {
      let msg = `${playerName}은 `;
      if (context.equipment[44]) msg += '단단히 묶인 ';
      msg += `${targetName}의 몸 위에 올라타 ${targetName}의 페니스를 강제로 `;
      if ((context.playerExp?.[0] || 0) === 0) msg += '남자를 모르는 ';
      msg += '질내에 삽입했다…';
      context.showMessage(msg);
    }

    // 3. 플레이어 처녀 확인
    // 원본: COMF24.ERB 라인 32-44
    if (context.playerTalents[0] === 1) {
      // TODO: 사용자 입력으로 처녀를 줄 것인지 확인
      // 지금은 자동으로 처녀 상실 처리
      context.showMessage(`[확인] ${playerName}의 처녀를 ${targetName}에게 줍니까? -> 예`);
    }

    // 4. 콘돔 사용 확인
    // 원본: COMF24.ERB 라인 45-71
    if (context.equipment[37] === 0 && // 콘돔 미착용
        context.items[24] && // 콘돔 소지
        (context.talents[121] === 1 || context.talents[122] === 1) && // 대상이 남성/후타나리
        context.charFlags[26] !== 2) { // 콘돔 확인 안함 플래그 아님
      // TODO: 사용자 입력으로 콘돔 사용 확인
      // 지금은 자동으로 콘돔 미사용
      context.showMessage('[확인] 콘돔을 끼웁니까? -> 그냥 한다');
    }

    // 5. 대상의 사정 게이지 계산 (플레이어가 아닌 대상이 사정함)
    // 원본: COMF24.ERB 라인 73-169
    const targetEjacGauge = this.calculateTargetEjaculationGauge(context);
    if (context.talents[121] === 1 || context.talents[122] === 1) { // 대상이 남성/후타나리
      context.playerBase[2] += targetEjacGauge;
    }

    // 6. SOURCE 계산 및 적용
    const source = this.calculateSource(context);
    // TODO: applySource 메서드 호출

    // 7. 더럽힘 처리
    // 원본: COMF24.ERB 라인 255-260
    // 대상의 P ↔ 플레이어의 V 더럽힘 이동
    const targetPStain = context.stain[2] || 0;
    const playerVStain = context.playerStain?.[3] || 0;
    context.stain[2] |= playerVStain;
    if (context.playerStain) context.playerStain[3] |= targetPStain;

    // 8. 경험치 획득
    // 원본: COMF24.ERB 라인 262-350

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

    // 플레이어 V경험 (플레이어 V감각에 따라)
    // 원본: COMF24.ERB 라인 280-293
    const playerVSense = context.playerAbilities['V감각'] || 0;
    let playerVExpGain = 0;
    if (playerVSense <= 1) playerVExpGain = 2;
    else if (playerVSense <= 4) playerVExpGain = 3;
    else if (playerVSense <= 7) playerVExpGain = 4;
    else playerVExpGain = 5;

    if (context.playerExp) context.playerExp[0] += playerVExpGain;
    context.showMessage(`V경험 +${playerVExpGain} (${playerName})`);

    // 플레이어 성교경험
    if (context.playerExp) context.playerExp[5] += 1;
    context.showMessage(`성교경험 +1 (${playerName})`);

    // TODO: EVENT_SEITSU_REVRAPE 호출 (정통 이벤트)

    // 이상경험 (대상이 동정일 경우)
    // 원본: COMF24.ERB 라인 300-320
    let abnormalExp = 0;
    if (context.talents[1] === 1) { // 동정
      abnormalExp += 1;
      // TODO: INCEST 체크 (근친상간 여부)
    }
    if (abnormalExp > 0) {
      context.exp[50] += abnormalExp;
      context.showMessage(`이상경험 +${abnormalExp}`);
    }

    // 플레이어 이상경험 (플레이어가 처녀일 경우)
    // 원본: COMF24.ERB 라인 322-329
    if (context.playerTalents[0] === 1) { // 플레이어 처녀
      if (context.playerExp) context.playerExp[50] += 1;
      context.showMessage(`이상경험 +1 (${playerName})`);
    }

    // 애정경험
    // 원본: COMF24.ERB 라인 333-350
    let affectionExp = 0;
    if (context.playerTalents[0] === 1 && context.talents[1] === 1) {
      affectionExp = 100; // 플레이어 처녀 & 대상 동정
    } else if (context.talents[1] === 1) {
      affectionExp = 50; // 대상 동정
    } else if (context.talents[122] === 1) {
      affectionExp = 4; // 대상이 남성
    } else {
      affectionExp = 3;
    }
    if ((context.charFlags[2] || 0) >= 1000 && context.assiPlay === 0) {
      context.exp[23] += affectionExp;
      context.showMessage(`애정경험 +${affectionExp}`);
    }

    // 9. 대상 동정 상실
    // 원본: COMF24.ERB 라인 356-379
    if (context.talents[1] === 1) {
      context.talents[1] = 0;
      context.showMessage('【동정상실】');
      // TODO: CSTR, CFLAG 설정
      context.flags[133] = 1; // TFLAG:133
      if (context.charFlags[18] === 0) {
        context.charFlags[18] = 1;
      }
    }

    // 10. 플레이어 처녀 상실
    // 원본: COMF24.ERB 라인 381-396
    if (context.playerTalents[0] === 1) {
      context.playerTalents[0] = 0;
      context.showMessage(`【처녀상실(${playerName})】`);
      // TODO: CFLAG:PLAYER 설정
    }

    // 11. PREVCOM/TFLAG 업데이트
    context.flags[59] = context.flags[50] || 0;
    context.flags[50] = context.assiPlay === 1 ? 1 : 0;
    context.prevCom = 24;
  },

  /**
   * 대상의 사정 게이지 계산
   * 원본: COMF24.ERB 라인 73-169
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

    // 플레이어 V감각
    const playerVSense = context.playerAbilities['V감각'] || 0;
    // 플레이어 V경험 레벨
    const playerVExpLevel = context.getExpLevel(context.playerExp?.[0] || 0);

    let gauge = 0;

    // 기교에 따른 기본 게이지
    // 원본: COMF24.ERB 라인 78-91
    if (technique === 0) gauge = 50;
    else if (technique === 1) gauge = 300;
    else if (technique === 2) gauge = 800;
    else if (technique === 3) gauge = 1500;
    else if (technique === 4) gauge = 2000;
    else gauge = 3200;

    // 종순 보정
    // 원본: COMF24.ERB 라인 93-106
    if (submission === 0) gauge *= 0.80;
    else if (submission === 1) gauge *= 0.90;
    else if (submission === 2) gauge *= 1.00;
    else if (submission === 3) gauge *= 1.10;
    else if (submission === 4) gauge *= 1.20;
    else gauge *= 1.30;

    // 봉사정신 보정
    // 원본: COMF24.ERB 라인 108-121
    if (service === 0) gauge *= 0.50;
    else if (service === 1) gauge *= 0.80;
    else if (service === 2) gauge *= 1.20;
    else if (service === 3) gauge *= 1.50;
    else if (service === 4) gauge *= 1.80;
    else gauge *= 2.40;

    // 플레이어 V감각 보정
    // 원본: COMF24.ERB 라인 123-136
    if (playerVSense === 0) gauge *= 0.50;
    else if (playerVSense === 1) gauge *= 0.80;
    else if (playerVSense === 2) gauge *= 1.00;
    else if (playerVSense === 3) gauge *= 1.20;
    else if (playerVSense === 4) gauge *= 1.50;
    else gauge *= 2.00;

    // 플레이어 V경험 보정
    // 원본: COMF24.ERB 라인 138-151
    if (playerVExpLevel < 1) gauge *= 0.20;
    else if (playerVExpLevel < 2) gauge *= 0.50;
    else if (playerVExpLevel < 3) gauge *= 0.80;
    else if (playerVExpLevel < 4) gauge *= 1.00;
    else if (playerVExpLevel < 5) gauge *= 1.20;
    else gauge *= 1.40;

    // C감각 보정
    // 원본: COMF24.ERB 라인 153-166
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
   * 원본: TRAIN_MESSAGE_B.ERB (역강간 관련 부분)
   */
  // TODO: Move generateMessage logic to execute
  // generateMessage: (context: TrainingContext) => {
    const targetName = context.target.name;
    const playerName = context.player?.name || '플레이어';

    let msg = `${playerName}은 ${targetName}의 몸 위에 올라타 강제로 삽입했다.`;

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
