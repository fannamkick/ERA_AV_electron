/**
 * COMF21 - 후배위 (Doggy Style)
 * 원본: ERB/指導関係/COMF21.ERB
 *
 * 조교자의 성기를 대상의 질에 후배위 체위로 삽입하는 섹스 커맨드
 * 정상위에 비해 노출도가 높고 정애가 낮음
 */

import type { CommandPlugin } from '../../types';
import type { TrainingContext, SourceValues } from '../../types';
import { SourceModifier } from '../../systems/SourceModifier';
import { VaginaSexHandler } from '../common/VaginaSexHandler';

export const COMF21_doggy: CommandPlugin = {
  id: 21,
  name: '후배위',
  category: '섹스',
  staminaCost: 50,

  /**
   * 가용성 판정
   * 원본: COMABLE.ERB @COM_ABLE21
   */
  isAvailable: (context: TrainingContext) => {
    // 조교자가 남성이거나 후타나리여야 함
    const trainerIsMale = !context.playerTalents[122];
    const trainerIsFuta = context.playerTalents[121];

    if (!trainerIsMale && !trainerIsFuta) {
      if (context.assiPlay) {
        const assiIsMale = !context.assiTalents.includes(122);
        const assiIsFuta = context.assiTalents.includes(121);
        if (!assiIsMale && !assiIsFuta) return false;
      } else {
        return false;
      }
    }

    // 대상이 여성이어야 함
    if (context.talents[122]) return false;

    // 삼각목마 기승중 불가
    if (context.equipment[70]) return false;

    // 팬티 or 하의 착용 불가
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
   * 원본: COMF21.ERB 라인 85-256
   */
  // TODO: Move calculateSource logic to execute
  // calculateSource: (context: TrainingContext): SourceValues => {
    const { target } = context;
    const abilities = target.abl;
    const talents = context.talents;

    // V감각
    const vSense = abilities['V감각'] || 0;

    // EXP levels
    const vExpLevel = context.getExpLevel(0);

    // PALAM levels
    const lubLevel = context.getParamLevel(context.params[3] || 0);
    const lustLevel = context.getParamLevel(context.params[5] || 0);

    // 종순
    const submission = abilities['종순'] || 0;

    // 기본 SOURCE 설정
    const source: number[] = new Array(19).fill(0);

    // LOSEBASE 계산
    // 원본: COMF21.ERB 라인 88-106
    let loseBase0 = 50; // 체력
    let loseBase1 = 100; // 기력

    // V감각에 따라 체력/기력 소모 감소
    const vSenseReduction0 = vSense * 3;
    const vSenseReduction1 = vSense * 2;
    loseBase0 -= vSenseReduction0;
    if (loseBase0 <= 10) loseBase0 = 10;
    loseBase1 -= vSenseReduction1;
    if (loseBase1 <= 10) loseBase1 = 10;

    context.loseBase[0] += loseBase0;
    context.loseBase[1] += loseBase1;

    // V감각에 따른 쾌V, 윤활 계산
    // 원본: COMF21.ERB 라인 110-129
    const vSenseValues = [
      { 쾌V: 40, 윤활: 50 },    // 0
      { 쾌V: 150, 윤활: 150 },  // 1
      { 쾌V: 400, 윤활: 250 },  // 2
      { 쾌V: 1000, 윤활: 350 }, // 3
      { 쾌V: 1700, 윤활: 600 }, // 4
      { 쾌V: 2200, 윤활: 850 }, // 5
    ];

    const senseData = vSenseValues[Math.min(vSense, 5)];
    source[1] = senseData.쾌V;
    source[6] = senseData.윤활;

    // V경험에 따른 보정
    // 원본: COMF21.ERB 라인 131-156
    const vExpModifiers = [
      { mult: 0.20, pain: 5000 }, // < EXPLV:1 (처녀)
      { mult: 0.60, pain: 220 },  // < EXPLV:2
      { mult: 1.00, pain: 30 },   // < EXPLV:3
      { mult: 1.20, pain: 5 },    // < EXPLV:4
      { mult: 1.30, pain: 0 },    // < EXPLV:5
      { mult: 1.80, pain: 0 },    // >= EXPLV:5
    ];

    const vExpMod = vExpModifiers[Math.min(vExpLevel, 5)];
    source[1] *= vExpMod.mult;
    source[12] = vExpMod.pain;

    // 처녀인 경우 조수 플레이 시 특수 경험치
    // 원본: COMF21.ERB 라인 136-139
    if (vExpLevel === 0 && context.assiPlay && context.playerTalents[122] === 0) {
      context.exp[50] += 1; // EXP:50 (C절정경험 - 원본 주석 확인 필요)
      context.showMessage('경험 +1');
    }

    // PALAM:윤활 레벨에 따른 보정
    // 원본: COMF21.ERB 라인 158-176
    const lubModifiers = [
      { vMult: 0.10, painAdd: 900, painMult: 3.00 }, // < PALAMLV:1
      { vMult: 0.40, painAdd: 250, painMult: 1.00 }, // < PALAMLV:2
      { vMult: 1.00, painAdd: 0, painMult: 0.50 },   // < PALAMLV:3
      { vMult: 1.40, painAdd: 0, painMult: 0.20 },   // < PALAMLV:4
      { vMult: 1.80, painAdd: 0, painMult: 0.10 },   // >= PALAMLV:4
    ];

    const lubMod = lubModifiers[Math.min(lubLevel, 4)];
    source[1] *= lubMod.vMult;
    source[12] += lubMod.painAdd;
    source[12] *= lubMod.painMult;

    // 조교자가 후타나리 (조수 플레이 시)
    // 원본: COMF21.ERB 라인 178-182
    if (context.assiPlay && context.assiTalents.includes(121)) {
      source[1] *= 2.50;
    }

    // 소질 보정
    // 원본: COMF21.ERB 라인 184-189
    if (talents[99]) source[12] *= 0.80;   // 큰체구
    if (talents[100]) source[12] *= 2.00;  // 작은체형

    // 정조관념 / 정조무관심
    // 원본: COMF21.ERB 라인 191-210
    if (talents[30]) { // 정조관념
      source[6] *= 0.60;
      if (vExpLevel === 0) {
        source[16] = 10000; // 처녀 상실 억울
      } else {
        source[16] = 1000;
      }
    } else if (talents[31]) { // 정조무관심
      if (vExpLevel === 0) {
        source[6] *= 0.60;
        source[16] = 300;
      }
    } else {
      // 보통
      if (vExpLevel === 0) {
        source[16] = 3000;
      }
    }

    // PALAM:욕정 레벨에 따른 보정
    // 원본: COMF21.ERB 라인 212-228
    const lustModifiers = [
      { vMult: 0.60, lubMult: 0.30 }, // < PALAMLV:1
      { vMult: 0.80, lubMult: 0.60 }, // < PALAMLV:2
      { vMult: 1.00, lubMult: 1.00 }, // < PALAMLV:3
      { vMult: 1.20, lubMult: 1.50 }, // < PALAMLV:4
      { vMult: 1.50, lubMult: 1.80 }, // >= PALAMLV:4
    ];

    const lustMod = lustModifiers[Math.min(lustLevel, 4)];
    source[1] *= lustMod.vMult;
    source[6] *= lustMod.lubMult;

    // ABL:종순에 따른 보정
    // 원본: COMF21.ERB 라인 230-255
    const subModifiers = [
      { vMult: 0.50, lubMult: 0.60, repulseMult: 2.00 },
      { vMult: 0.80, lubMult: 0.80, repulseMult: 1.50 },
      { vMult: 1.00, lubMult: 1.00, repulseMult: 1.00 },
      { vMult: 1.30, lubMult: 1.20, repulseMult: 0.80 },
      { vMult: 1.60, lubMult: 1.40, repulseMult: 0.60 },
      { vMult: 2.00, lubMult: 1.60, repulseMult: 0.30 },
    ];
    const subMod = subModifiers[Math.min(submission, 5)];
    source[1] *= subMod.vMult;
    source[6] *= subMod.lubMult;
    source[16] *= subMod.repulseMult;

    // SourceModifier로 소질/능력 보정 적용
    source = SourceModifier.applyAll(source, context);

    return source;
  },

  /**
   * 커맨드 실행
   * 원본: COMF21.ERB 전체
   */
  async execute(context: TrainingContext): Promise<void> {
    const targetName = context.target.name;
    const prevCom = context.prevCom;
    const prevPrevCom = context.flags[59] || 0;
    const prevTrainer = context.flags[50] || 0;
    const currentTrainer = context.assiPlay ? 1 : 0;
    const sameTrainer = prevTrainer === currentTrainer;
    const trainerChanged = prevTrainer !== currentTrainer;

    // 처녀 확인 (COMF21.ERB 라인 6-9)
    if (context.talents[74]) {
      const confirmed = await VaginaSexHandler.confirmVirginity(context);
      if (!confirmed) return;
    }

    // 연속 커맨드 파생 로직
    // 원본: COMF21.ERB 라인 11-71

    // 1. 후배위SP(134) 파생
    // 원본: COMF21.ERB 라인 11-19
    if (sameTrainer) {
      if (
        (prevPrevCom === 131 || prevPrevCom === 132 || prevPrevCom === 134) &&
        prevCom === 133
      ) {
        // TODO: COM_ABLE134 체크 + COM134 JUMP
        context.showMessage('[파생] 후배위SP로 파생합니다.');
        // return;
      }
    }

    // 2. 3P(64) 파생
    // 원본: COMF21.ERB 라인 21-37
    context.flags[42] = 0;

    if (prevCom === 64) {
      // TODO: COM_ABLE64 체크 + COM64 JUMP
      context.flags[42] = 1;
      context.showMessage('[파생] 3P로 파생합니다.');
      // return;
    } else if (trainerChanged) {
      if (prevCom === 27 || prevCom === 31 || prevCom === 80) {
        // TODO: COM_ABLE64 체크 + COM64 JUMP
        context.showMessage('[파생] 3P로 파생합니다.');
        // return;
      }
    }

    // 3. G스팟자극(120) 또는 자궁구자극(121) 파생
    // 원본: COMF21.ERB 라인 39-71
    const playerTechnique = context.assiPlay
      ? context.assiAbilities['기교'] || 0
      : context.playerAbilities['기교'] || 0;

    if (
      context.charFlags[71] === 0 &&
      prevCom === 21 &&
      playerTechnique > 2 &&
      sameTrainer
    ) {
      const lustLevel = context.getParamLevel(context.params[5] || 0);
      const vSense = context.target.abl[2] || 0;

      let derivationValue = 0;
      const lustBonus = lustLevel;
      derivationValue = lustBonus * (Math.floor(Math.random() * 11));
      derivationValue += (Math.floor(Math.random() * 11)) * vSense;

      // 후배위는 50 이상에서 자궁구자극
      if (derivationValue >= 50) {
        // TODO: COM_ABLE121 체크 + COM121 JUMP
        context.showMessage('[파생] 자궁구자극으로 파생합니다.');
        // return;
      } else {
        // TODO: COM_ABLE120 체크 + COM120 JUMP
        context.showMessage('[파생] G스팟자극으로 파생합니다.');
        // return;
      }
    }

    // 커맨드명 표시
    // 원본: COMF21.ERB 라인 73-75
    context.showMessage('후배위');

    // TODO: TRAIN_MESSAGE_B 호출 (행위 설명 메시지)

    // V경험 플래그 설정
    // 원본: COMF21.ERB 라인 77-80
    context.flags[19] = 1; // TFLAG:19 (V경험 커맨드)
    // 수간 중이 아닐 때만 애인 첫경험 플래그
    if (context.talents[85] && context.assiPlay === 0 && context.exp[0] === 0 && !context.equipment[89]) {
      context.flags[20] = 1; // TFLAG:20 (애인과 첫 경험)
    }

    // 조교자 사정 체크
    // 원본: COMF21.ERB 라인 82-83
    const ejacResult = await VaginaSexHandler.checkEjaculation(context, 21);
    if (ejacResult.ejaculated) {
      await VaginaSexHandler.handleEjaculation(context, ejacResult);
    }

    // 섹스 후 처리 (COM_AFTER_VAGINA_SEX)
    // 원본: COMF21.ERB 라인 257-258
    await VaginaSexHandler.execute(context, 21);

    // PREVCOM 업데이트
    context.flags[59] = context.prevCom;
    context.flags[50] = currentTrainer;
    context.prevCom = 21;
  },

  /**
   * 메시지 생성
   * 원본: TRAIN_MESSAGE_B.ERB (후배위 관련 부분)
   */
  // TODO: Move generateMessage logic to execute
  // generateMessage: (context: TrainingContext) => {
    const targetName = context.target.name;
    const talents = context.talents;

    // 기본 메시지
    let msg = `${targetName}을(를) 후배위로 안고 삽입했다.`;

    // 처녀
    if (talents[74]) {
      msg += ` ${targetName}의 처녀막이 찢어지는 감촉이 느껴진다.`;
    }

    // V감각에 따른 반응
    const vSense = context.target.abl[2] || 0;
    if (vSense >= 4) {
      msg += ` ${targetName}은(는) 삽입에 즉시 반응하며 질이 강하게 조여온다.`;
    } else if (vSense === 0) {
      msg += ` ${targetName}은(는) 아직 미숙하지만 점차 질의 쾌감을 느끼기 시작했다.`;
    }

    // 윤활도
    const lubLevel = Math.floor((context.params[3] || 0) / 10000);
    if (lubLevel === 0) {
      msg += ` 윤활이 부족해 삽입이 어렵다.`;
    } else if (lubLevel >= 4) {
      msg += ` 충분히 젖은 질이 성기를 부드럽게 받아들인다.`;
    }

    return msg;
  },
};
