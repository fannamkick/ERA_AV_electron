/**
 * COMF20 - 정상위 (Missionary Position)
 * 원본: ERB/指導関係/COMF20.ERB
 *
 * 조교자의 성기를 대상의 질에 삽입하는 섹스 커맨드
 * 기본 삽입 체위 중 가장 핵심적인 커맨드
 */

import type { CommandPlugin } from '../../types';
import type { TrainingContext, SourceValues } from '../../types';
import { SourceModifier } from '../../systems/SourceModifier';
import { VaginaSexHandler } from '../common/VaginaSexHandler';

export const COMF20_missionary: CommandPlugin = {
  id: 20,
  name: '정상위',
  category: '섹스',
  staminaCost: 100,

  /**
   * 가용성 판정
   * 원본: COMABLE.ERB @COM_ABLE20
   */
  isAvailable: (context: TrainingContext) => {
    // 조교자가 남성이거나 후타나리여야 함
    const trainerIsMale = !context.playerTalents[122]; // 남성
    const trainerIsFuta = context.playerTalents[121];  // 후타나리

    if (!trainerIsMale && !trainerIsFuta) {
      // 조수 플레이 시 조수가 남성/후타나리여야 함
      if (context.assiPlay) {
        const assiIsMale = !context.assiTalents.includes(122);
        const assiIsFuta = context.assiTalents.includes(121);
        if (!assiIsMale && !assiIsFuta) return false;
      } else {
        return false;
      }
    }

    // 대상이 여성이어야 함
    if (context.talents[122]) return false; // 남성 불가

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
   * 원본: COMF20.ERB 라인 87-262
   */
  // TODO: Move calculateSource logic to execute
  // calculateSource: (context: TrainingContext): SourceValues => {
    const { target } = context;
    const abilities = target.abl;
    const talents = context.talents;

    // V감각
    const vSense = abilities['V감각'] || 0;

    // EXP levels
    const vExpLevel = context.getExpLevel(0); // EXP:0 = V경험

    // PALAM levels
    const lubLevel = context.getParamLevel(context.params[3] || 0); // 윤활
    const lustLevel = context.getParamLevel(context.params[5] || 0); // 욕정

    // 종순
    const submission = abilities['종순'] || 0;

    // 기본 SOURCE 설정
    const source: number[] = new Array(19).fill(0);

    // LOSEBASE 계산
    // 원본: COMF20.ERB 라인 90-115
    let loseBase0 = 100; // 체력
    let loseBase1 = 50;  // 기력

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
    // 원본: COMF20.ERB 라인 119-138
    const vSenseValues = [
      { 쾌V: 40, 윤활: 150 },    // 0
      { 쾌V: 150, 윤활: 250 },   // 1
      { 쾌V: 400, 윤활: 350 },   // 2
      { 쾌V: 1000, 윤활: 500 },  // 3
      { 쾌V: 1700, 윤활: 700 },  // 4
      { 쾌V: 2200, 윤활: 1000 }, // 5
    ];

    const senseData = vSenseValues[Math.min(vSense, 5)];
    source[1] = senseData.쾌V;
    source[6] = senseData.윤활;

    // V경험에 따른 보정
    // 원본: COMF20.ERB 라인 140-159
    const vExpModifiers = [
      { mult: 0.20, pain: 5500 }, // < EXPLV:1 (처녀)
      { mult: 0.60, pain: 300 },  // < EXPLV:2
      { mult: 1.00, pain: 50 },   // < EXPLV:3
      { mult: 1.20, pain: 10 },   // < EXPLV:4
      { mult: 1.30, pain: 0 },    // < EXPLV:5
      { mult: 1.80, pain: 0 },    // >= EXPLV:5
    ];

    const vExpMod = vExpModifiers[Math.min(vExpLevel, 5)];
    source[1] *= vExpMod.mult;
    source[12] = vExpMod.pain;

    // PALAM:윤활 레벨에 따른 보정
    // 원본: COMF20.ERB 라인 161-179
    const lubModifiers = [
      { vMult: 0.10, painAdd: 1000, painMult: 3.00 }, // < PALAMLV:1
      { vMult: 0.40, painAdd: 300, painMult: 1.00 },  // < PALAMLV:2
      { vMult: 1.00, painAdd: 0, painMult: 0.50 },    // < PALAMLV:3
      { vMult: 1.40, painAdd: 0, painMult: 0.20 },    // < PALAMLV:4
      { vMult: 1.80, painAdd: 0, painMult: 0.10 },    // >= PALAMLV:4
    ];

    const lubMod = lubModifiers[Math.min(lubLevel, 4)];
    source[1] *= lubMod.vMult;
    source[12] += lubMod.painAdd;
    source[12] *= lubMod.painMult;

    // 조교자가 후타나리 (조수 플레이 시)
    // 원본: COMF20.ERB 라인 181-185
    if (context.assiPlay && context.assiTalents.includes(121)) {
      source[1] *= 2.50;
    }

    // 소질 보정
    // 원본: COMF20.ERB 라인 187-195
    if (talents[99]) source[12] *= 0.80;   // 큰체구
    if (talents[100]) source[12] *= 2.00;  // 작은체형
    if (talents[135]) source[12] *= 4.00;  // 미숙함

    // 정조관념 / 정조무관심
    // 원본: COMF20.ERB 라인 197-216
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
    // 원본: COMF20.ERB 라인 218-234
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
    // 원본: COMF20.ERB 라인 236-261
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
   * 원본: COMF20.ERB 전체
   */
  async execute(context: TrainingContext): Promise<void> {
    const targetName = context.target.name;
    const prevCom = context.prevCom;
    const prevPrevCom = context.flags[59] || 0; // TFLAG:59 (전전회 커맨드)
    const prevTrainer = context.flags[50] || 0; // TFLAG:50 (전회 조교자: 0=주인, 1=조수)
    const currentTrainer = context.assiPlay ? 1 : 0;
    const sameTrainer = prevTrainer === currentTrainer;
    const trainerChanged = prevTrainer !== currentTrainer;

    // 연속 커맨드 파생 로직
    // 원본: COMF20.ERB 라인 6-72

    // 1. 정상위SP(130) 파생
    // 원본: COMF20.ERB 라인 6-14
    // 조건: 전회와 금회 조교자가 동일 + (정상위·키스(128)→정상위·가슴애무(129) 또는 역순)
    if (sameTrainer) {
      if (
        (prevPrevCom === 128 && prevCom === 129) ||
        (prevPrevCom === 129 && prevCom === 128) ||
        (prevPrevCom === 130 && (prevCom === 128 || prevCom === 129))
      ) {
        // COM_ABLE130 체크 필요 - 여기서는 간소화하여 바로 파생
        // TODO: COM_ABLE130 구현 후 체크 추가
        context.showMessage('[파생] 정상위SP로 파생합니다.');
        // return; // 실제로는 COM130으로 JUMP
      }
    }

    // 2. G스팟자극(120) 또는 자궁구자극(121) 파생
    // 원본: COMF20.ERB 라인 17-49
    // 조건: FLAG:71 == 0 + 전회가 정상위/정상위·키스/정상위·가슴애무 + 조교자 기교 3 이상 + 동일 조교자
    const playerTechnique = context.assiPlay
      ? context.assiAbilities['기교'] || 0
      : context.playerAbilities['기교'] || 0;

    if (
      context.charFlags[71] === 0 &&
      (prevCom === 20 || prevCom === 128 || prevCom === 129) &&
      playerTechnique > 2 &&
      sameTrainer
    ) {
      // 욕정 레벨에 따른 계산
      const lustLevel = context.getParamLevel(context.params[5] || 0);
      const vSense = context.target.abl[2] || 0;

      let derivationValue = 0;
      const lustBonus = lustLevel; // 1~5
      derivationValue = lustBonus * (Math.floor(Math.random() * 11)); // 0~50
      derivationValue += (Math.floor(Math.random() * 11)) * vSense; // +0~50

      // derivationValue: 0~100
      if (derivationValue >= 40) {
        // 자궁구자극(121)으로 파생
        // TODO: COM_ABLE121 체크 + COM121 JUMP
        context.showMessage('[파생] 자궁구자극으로 파생합니다.');
        // return;
      } else {
        // G스팟자극(120)으로 파생
        // TODO: COM_ABLE120 체크 + COM120 JUMP
        context.showMessage('[파생] G스팟자극으로 파생합니다.');
        // return;
      }
    }

    // 3. 3P(64) 파생
    // 원본: COMF20.ERB 라인 56-72
    context.flags[42] = 0; // TFLAG:42 초기화

    if (prevCom === 64) {
      // 전회가 3P였으면 3P로 파생
      // TODO: COM_ABLE64 체크 + COM64 JUMP
      context.flags[42] = 1;
      context.showMessage('[파생] 3P로 파생합니다.');
      // return;
    } else if (trainerChanged) {
      // 조교자가 교대한 경우
      if (prevCom === 27 || prevCom === 31 || prevCom === 80) {
        // 전회가 후배위애널(27) or 펠라치오(31) or 이라마치오(80)
        // TODO: COM_ABLE64 체크 + COM64 JUMP
        context.showMessage('[파생] 3P로 파생합니다.');
        // return;
      }
    }

    // 처녀 확인 (COMF20.ERB 라인 51-54)
    if (context.talents[74]) { // 처녀
      const confirmed = await VaginaSexHandler.confirmVirginity(context);
      if (!confirmed) return;
    }

    // 커맨드명 표시
    // 원본: COMF20.ERB 라인 74-76
    context.showMessage('정상위');

    // TODO: TRAIN_MESSAGE_B 호출 (행위 설명 메시지)

    // V경험 플래그 설정
    // 원본: COMF20.ERB 라인 78-81
    context.flags[19] = 1; // TFLAG:19 (V경험 커맨드)
    if (context.talents[85] && context.assiPlay === 0 && context.exp[0] === 0) {
      context.flags[20] = 1; // TFLAG:20 (애인과 첫 경험)
    }

    // 조교자 사정 체크
    // 원본: COMF20.ERB 라인 83-84
    const ejacResult = await VaginaSexHandler.checkEjaculation(context, 20);
    if (ejacResult.ejaculated) {
      await VaginaSexHandler.handleEjaculation(context, ejacResult);
    }

    // 섹스 후 처리 (COM_AFTER_VAGINA_SEX)
    // 원본: COMF20.ERB 라인 263-264 (원본 ERB 전체 라인 수에 따라 다를 수 있음)
    await VaginaSexHandler.execute(context, 20);

    // PREVCOM 업데이트 (다음 턴을 위해)
    // 원본 시스템에서 자동 처리되지만 여기서 명시적으로 설정
    context.flags[59] = context.prevCom; // TFLAG:59 = 전전회 커맨드
    context.flags[50] = currentTrainer; // TFLAG:50 = 전회 조교자
    context.prevCom = 20;
  },

  /**
   * 메시지 생성
   * 원본: TRAIN_MESSAGE_B.ERB (정상위 관련 부분)
   */
  // TODO: Move generateMessage logic to execute
  // generateMessage: (context: TrainingContext) => {
    const targetName = context.target.name;
    const talents = context.talents;

    // 기본 메시지
    let msg = `${targetName}을(를) 정상위로 안고 삽입했다.`;

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

    // 정조관념
    if (talents[30] && talents[74]) {
      msg += ` ${targetName}은(는) 처녀를 빼앗긴 굴욕으로 눈물을 흘린다.`;
    }

    // 애인
    if (talents[85] && context.assiPlay === 0) {
      msg += ` ${targetName}이(가) 사랑스러운 눈빛으로 올려다본다.`;
    }

    return msg;
  },
};
