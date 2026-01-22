/**
 * COMF13 - 애널바이브 (Anal Vibrator)
 * 원본: ERB/指導関係/COMF13.ERB
 *
 * 조교 대상의 항문에 애널바이브를 삽입하는 도구 사용 커맨드
 * 착탈 시스템: 실행 시마다 장착/해제 토글
 * 장착 중에는 다른 커맨드 실행 시 추가 SOURCE 적용 (@EQUIP_COM13)
 */

import type { CommandPlugin, TrainingContext } from '../../../../types/training';
import { SourceModifier } from '../../systems/SourceModifier';
import { AnalSexHandler } from '../common/AnalSexHandler';

/**
 * EXP 레벨 계산
 */
function getExpLevel(exp: number): number {
  if (exp >= 10000) return 5;
  if (exp >= 5000) return 4;
  if (exp >= 2000) return 3;
  if (exp >= 1000) return 2;
  if (exp >= 500) return 1;
  return 0;
}

/**
 * PALAM 레벨 계산
 */
function getParamLevel(value: number): number {
  if (value >= 40000) return 4;
  if (value >= 30000) return 3;
  if (value >= 10000) return 2;
  if (value >= 1000) return 1;
  return 0;
}

/**
 * SOURCE 계산 헬퍼 함수
 * 원본: COMF13.ERB 라인 20-156
 */
function calculateAnalVibratorSource(context: TrainingContext): number[] {
  const { target } = context;
  const abilities = target.abl;
  const talents = context.talents || {};

  // A감각 (인덱스 3)
  const aSense = abilities[3] || 0;

  // EXP levels
  const aExpLevel = getExpLevel(context.exp?.[1] || 0); // EXP:1 = A경험
  const vExpLevel = getExpLevel(context.exp?.[0] || 0); // EXP:0 = V경험

  // PALAM levels
  const lubLevel = getParamLevel(context.params?.[3] || 0); // 윤활
  const lustLevel = getParamLevel(context.params?.[5] || 0); // 욕정

  // 종순 (인덱스 10)
  const submission = abilities[10] || 0;

  // 기본 SOURCE 설정
  const source: number[] = new Array(19).fill(0);

  // LOSEBASE
  let loseBase0 = 60; // 체력
  let loseBase1 = 150; // 기력

  // A감각에 따른 쾌A, 불쾌 계산
  // 원본: COMF13.ERB 라인 28-47
  const aSenseValues = [
    { pleasure: 80, unpleasant: 300 },    // 0
    { pleasure: 250, unpleasant: 800 },   // 1
    { pleasure: 600, unpleasant: 1400 },  // 2
    { pleasure: 1000, unpleasant: 1800 }, // 3
    { pleasure: 1300, unpleasant: 2100 }, // 4
    { pleasure: 1700, unpleasant: 2400 }, // 5
  ];

  const senseData = aSenseValues[Math.min(aSense, 5)];
  source[2] = senseData.pleasure;
  source[15] = senseData.unpleasant;

  // A경험에 따른 보정
  // 원본: COMF13.ERB 라인 49-71
  const aExpModifiers = [
    { mult: 0.50, pain: 2000, shameAdd: 200 }, // < EXPLV:1
    { mult: 1.00, pain: 300, shameAdd: 100 },  // < EXPLV:2
    { mult: 1.10, pain: 50, shameAdd: 50 },    // < EXPLV:3
    { mult: 1.20, pain: 10, shameAdd: 0 },     // < EXPLV:4
    { mult: 1.40, pain: 0, shameAdd: 0 },      // < EXPLV:5
    { mult: 1.60, pain: 0, shameAdd: 0 },      // >= EXPLV:5
  ];

  const aExpMod = aExpModifiers[Math.min(aExpLevel, 5)];
  source[2] *= aExpMod.mult;
  source[12] = aExpMod.pain;
  source[11] += aExpMod.shameAdd;

  // PALAM:윤활 레벨에 따른 보정
  // 원본: COMF13.ERB 라인 73-89
  const lubModifiers = [
    { aMult: 0.40, painAdd: 800 },  // < PALAMLV:1
    { aMult: 0.80, painAdd: 500 },  // < PALAMLV:2
    { aMult: 1.00, painAdd: 300 },  // < PALAMLV:3
    { aMult: 1.40, painAdd: 120 },  // < PALAMLV:4
    { aMult: 1.80, painAdd: 100 },  // >= PALAMLV:4
  ];

  const lubMod = lubModifiers[Math.min(lubLevel, 4)];
  source[2] *= lubMod.aMult;
  source[12] += lubMod.painAdd;

  // PALAM:욕정 레벨에 따른 보정
  // 원본: COMF13.ERB 라인 91-102
  const lustModifiers = [0.80, 0.90, 1.00, 1.10, 1.20];
  const lustMult = lustModifiers[Math.min(lustLevel, 4)];
  source[2] *= lustMult;

  // ABL:종순에 따른 보정
  // 원본: COMF13.ERB 라인 104-119
  const subModifiers = [
    { aMult: 0.80, shameMult: 2.00 },
    { aMult: 0.90, shameMult: 1.50 },
    { aMult: 1.00, shameMult: 1.00 },
    { aMult: 1.00, shameMult: 0.80 },
    { aMult: 1.00, shameMult: 0.60 },
    { aMult: 1.00, shameMult: 0.30 },
  ];
  const subMod = subModifiers[Math.min(submission, 5)];
  source[2] *= subMod.aMult;
  source[11] *= subMod.shameMult;

  // 소질 보정
  // 원본: COMF13.ERB 라인 121-141
  if (talents[99]) source[12] *= 0.80;   // 큰체구
  if (talents[100]) source[12] *= 2.00;  // 작은체형
  if (talents[135]) source[12] *= 2.00;  // 미숙함

  // A민감/둔감
  if (talents[105]) { // A둔감
    source[12] *= 1.50;
    source[15] *= 1.50;
    source[11] *= 1.50;
  } else if (talents[106]) { // A민감
    source[12] *= 0.60;
    source[15] *= 0.60;
    source[11] *= 0.60;
  }

  // 처녀 + 정조관념
  // 원본: COMF13.ERB 라인 143-145
  if (vExpLevel === 0 && talents[30]) {
    source[15] = Math.floor(source[15] / 3);
  }

  // ITEM:203 (고급 애널바이브) 소지 시 보정
  // 원본: COMF13.ERB 라인 147-156 (슬라임 패치)
  const items = context.items || {};
  if (items[203] && items[203] >= 1 && !context.equipment?.[90]) {
    loseBase0 *= 0.80;
    loseBase1 *= 0.80;
    source[2] *= 1.20;
    source[12] *= 0.80;
    source[15] *= 1.20;
    source[11] *= 0.80;
  }

  context.loseBase = context.loseBase || [];
  context.loseBase[0] = (context.loseBase[0] || 0) + Math.floor(loseBase0);
  context.loseBase[1] = (context.loseBase[1] || 0) + Math.floor(loseBase1);

  // SourceModifier로 소질/능력 보정 적용
  return SourceModifier.applyAll(source, context);
}

/**
 * 애널바이브 장착 중 추가 SOURCE 계산
 * 원본: COMF13.ERB @EQUIP_COM13 (라인 206-384)
 */
function calculateEquippedAnalVibratorSource(context: TrainingContext): number[] {
  const abilities = context.target.abl;
  const talents = context.talents || {};

  // A감각 (인덱스 3)
  const aSense = abilities[3] || 0;

  // EXP levels
  const aExpLevel = getExpLevel(context.exp?.[1] || 0);

  // PALAM levels
  const lubLevel = getParamLevel(context.params?.[3] || 0);
  const lustLevel = getParamLevel(context.params?.[5] || 0);

  // 종순 (인덱스 10)
  const submission = abilities[10] || 0;

  // LOSEBASE 추가
  let addLoseBase0 = 30;
  let addLoseBase1 = 80;

  // 임시 변수
  let aPleasure = 0;
  let displeasure = 0;
  let pain = 0;
  let shame = 200;

  // A감각에 따른 쾌A, 불쾌
  // 원본: COMF13.ERB 라인 222-241
  const aSenseValues = [
    { pleasure: 40, displ: 300 },
    { pleasure: 120, displ: 800 },
    { pleasure: 300, displ: 1400 },
    { pleasure: 500, displ: 1800 },
    { pleasure: 650, displ: 2100 },
    { pleasure: 850, displ: 2400 },
  ];
  const senseData = aSenseValues[Math.min(aSense, 5)];
  aPleasure = senseData.pleasure;
  displeasure = senseData.displ;

  // A경험 보정
  // 원본: COMF13.ERB 라인 243-262
  const aExpModifiers = [
    { mult: 0.50, pain: 2000 },
    { mult: 1.00, pain: 300 },
    { mult: 1.10, pain: 50 },
    { mult: 1.20, pain: 10 },
    { mult: 1.40, pain: 0 },
    { mult: 1.60, pain: 0 },
  ];
  const aExpMod = aExpModifiers[Math.min(aExpLevel, 5)];
  aPleasure *= aExpMod.mult;
  pain = aExpMod.pain;

  // 윤활 보정
  // 원본: COMF13.ERB 라인 264-280
  const lubModifiers = [
    { aMult: 0.40, painAdd: 800 },
    { aMult: 0.80, painAdd: 500 },
    { aMult: 1.00, painAdd: 300 },
    { aMult: 1.40, painAdd: 120 },
    { aMult: 1.80, painAdd: 100 },
  ];
  const lubMod = lubModifiers[Math.min(lubLevel, 4)];
  aPleasure *= lubMod.aMult;
  pain += lubMod.painAdd;

  // 욕정 보정
  // 원본: COMF13.ERB 라인 282-293
  const lustModifiers = [0.80, 0.90, 1.00, 1.10, 1.20];
  const lustMult = lustModifiers[Math.min(lustLevel, 4)];
  aPleasure *= lustMult;

  // 종순 보정
  // 원본: COMF13.ERB 라인 295-310
  const subModifiers = [
    { aMult: 0.80, shameMult: 2.00 },
    { aMult: 0.90, shameMult: 1.50 },
    { aMult: 1.00, shameMult: 1.00 },
    { aMult: 1.00, shameMult: 0.80 },
    { aMult: 1.00, shameMult: 0.60 },
    { aMult: 1.00, shameMult: 0.30 },
  ];
  const subMod = subModifiers[Math.min(submission, 5)];
  aPleasure *= subMod.aMult;
  shame *= subMod.shameMult;

  // 소질 보정
  // 원본: COMF13.ERB 라인 312-332
  if (talents[99]) pain *= 0.80;
  if (talents[100]) pain *= 2.00;
  if (talents[135]) pain *= 2.00;

  // A민감/둔감
  if (talents[105]) {
    pain *= 1.50;
    displeasure *= 1.50;
    shame *= 1.50;
  } else if (talents[106]) {
    pain *= 0.60;
    displeasure *= 0.60;
    shame *= 0.60;
  }

  // 처녀 + 정조관념
  // 원본: COMF13.ERB 라인 338-342
  if (context.exp?.[0] === 0 && talents[30]) {
    displeasure *= 0.80;
    shame *= 0.50;
  }

  // ITEM:203 (고급 애널바이브)
  // 원본: COMF13.ERB 라인 344-353
  const items = context.items || {};
  if (items[203] && items[203] >= 1 && !context.equipment?.[90]) {
    addLoseBase0 -= 6;
    addLoseBase1 -= 16;
    aPleasure *= 1.20;
    pain *= 0.80;
    displeasure *= 1.20;
    shame *= 0.80;
  }

  context.loseBase = context.loseBase || [];
  context.loseBase[0] = (context.loseBase[0] || 0) + addLoseBase0;
  context.loseBase[1] = (context.loseBase[1] || 0) + addLoseBase1;

  // 경험치 획득
  // 원본: COMF13.ERB 라인 354-372
  let aExpGain = 0;

  // 자위 실행 시 경험 +1
  // 원본: COMF13.ERB 라인 358-360
  // if (currentCommandId === 3) { // SELECTCOM == 3 (자위)
  //   aExpGain = 1;
  // }

  // A감각에 따른 A경험
  // 원본: COMF13.ERB 라인 361-370
  if (aSense <= 1) {
    aExpGain += 1;
  } else if (aSense <= 4) {
    aExpGain += 2;
  } else if (aSense <= 7) {
    aExpGain += 3;
  } else {
    aExpGain += 4;
  }

  context.exp = context.exp || [];
  context.exp[1] = (context.exp[1] || 0) + aExpGain;
  context.showMessage(`A경험 +${aExpGain}`);

  // 애널 삽입 플래그
  // 원본: COMF13.ERB 라인 374-375
  context.flags = context.flags || {};
  context.flags[101] = 1; // TFLAG:101

  const source: number[] = new Array(19).fill(0);
  source[2] = Math.floor(aPleasure);
  source[8] = 0;
  source[11] = Math.floor(shame);
  source[12] = Math.floor(pain);
  source[15] = Math.floor(displeasure);

  return source;
}

/**
 * 메시지 생성 헬퍼 함수
 * 원본: TRAIN_MESSAGE_B.ERB (애널바이브 관련 부분)
 */
function generateAnalVibratorMessage(context: TrainingContext): string {
  const targetName = context.target.name;
  const equipment = context.equipment || {};

  // 촉수
  if (equipment[90]) {
    return `${targetName}의 항문에 촉수가 침입했다. 촉수가 꿈틀거리며 내부를 자극한다.`;
  }

  // 애널바이브
  let msg = `${targetName}의 항문에 애널바이브를 삽입했다.`;

  // 고급 애널바이브
  const items = context.items || {};
  if (items[203] && items[203] >= 1) {
    msg += ` 강력한 진동이 ${targetName}의 항문을 자극한다.`;
  }

  // A감각에 따른 반응
  const aSense = context.target.abl[3] || 0;
  if (aSense >= 4) {
    msg += ` ${targetName}은(는) 애널바이브의 진동에 즉시 반응하며 신음을 흘린다.`;
  } else if (aSense === 0) {
    msg += ` ${targetName}은(는) 항문의 이물감에 얼굴을 찡그렸다.`;
  }

  // 윤활도
  const lubLevel = Math.floor((context.params?.[3] || 0) / 10000);
  if (lubLevel === 0) {
    msg += ` 윤활이 부족해 애널바이브가 들어가기 어렵다.`;
  } else if (lubLevel >= 4) {
    msg += ` 충분히 준비된 항문이 애널바이브를 부드럽게 받아들인다.`;
  }

  return msg;
}

/**
 * 장착 중 상태 메시지
 * 원본: COMF13.ERB @EQUIP_COM13 라인 208-212
 */
function getEquippedStatusMessage(context: TrainingContext): string {
  const equipment = context.equipment || {};
  if (equipment[90]) {
    return '＜애널촉수 삽입중＞';
  } else {
    return '＜애널바이브 삽입중＞';
  }
}

export const COMF13_analVibrator: CommandPlugin = {
  id: 13,
  name: '애널바이브',
  category: '도구',
  staminaCost: 60,

  /**
   * 가용성 판정
   * 원본: COMABLE.ERB @COM_ABLE13
   */
  isAvailable: (context: TrainingContext) => {
    const items = context.items || {};
    const equipment = context.equipment || {};
    const charFlags = context.charFlags || {};

    // 애널바이브 소지 필요 (ITEM:13)
    if (!items[13]) return false;

    // 슬라임 지도중 불가
    if (equipment[150]) return false;

    // 삼각목마 기승중 불가
    if (equipment[70]) return false;

    // 촉수 중이 아닐 때: 팬티 or 하의 착용 불가
    if (!equipment[90] && (charFlags[40] & 17)) return false;

    // 검은 스타킹 불가
    if (charFlags[170] === 6 && charFlags[173] === 0) return false;

    // 기저귀 불가
    if (charFlags[42] === 69 && (charFlags[40] & 64)) return false;

    // 즈코 인형 불가
    if (charFlags[42] === 11 && (charFlags[40] & 64)) return false;

    return true;
  },

  /**
   * 커맨드 실행
   * 원본: COMF13.ERB 전체
   */
  async execute(context: TrainingContext): Promise<void> {
    const talents = context.talents || {};
    const equipment = context.equipment || {};

    // 애널처녀 확인 (COMF13.ERB 라인 6-9)
    if (talents[76]) { // 애널처녀
      const confirmed = await AnalSexHandler.confirmAnalVirginity(context);
      if (!confirmed) return;
    }

    // 커맨드명 표시
    if (equipment[90]) {
      context.showMessage('애널촉수');
    } else {
      context.showMessage('애널바이브');
    }

    // 메시지 생성 및 표시
    const message = generateAnalVibratorMessage(context);
    context.showMessage(message);

    // SOURCE 계산
    const source = calculateAnalVibratorSource(context);

    // SOURCE 적용
    if (context.applySource) {
      context.applySource(source);
    } else {
      context.params = context.params || [];
      for (let i = 0; i < source.length && i < context.params.length; i++) {
        context.params[i] = (context.params[i] || 0) + source[i];
      }
    }

    // 경험치 획득 (삽입 시)
    // 원본: COMF13.ERB 라인 157-183

    // A감각에 따른 A경험
    const aSense = context.target.abl[3] || 0;
    let aExpGain = 1;
    if (aSense <= 1) aExpGain = 1;
    else if (aSense <= 4) aExpGain = 2;
    else if (aSense <= 7) aExpGain = 3;
    else aExpGain = 4;

    context.exp = context.exp || [];
    context.exp[1] = (context.exp[1] || 0) + aExpGain;
    context.showMessage(`A경험 +${aExpGain}`);

    // 레즈/호모 경험
    if (talents[122] === 0 && context.playerTalents?.[122] === 0) {
      context.exp[40] = (context.exp[40] || 0) + 1;
      context.showMessage('레즈경험 +1');
    } else if (talents[122] === 1 && context.playerTalents?.[122] === 1) {
      context.exp[41] = (context.exp[41] || 0) + 1;
      context.showMessage('호모경험 +1');
    }

    // 애널바이브 착탈 토글
    // 원본: COMF13.ERB 라인 185-190
    equipment[13] = equipment[13] === 1 ? 0 : 1;

    if (equipment[13] === 1) {
      context.showMessage('애널바이브를 삽입했다.');
    } else {
      context.showMessage('애널바이브를 제거했다.');
    }

    // 촉수 중엔 토글하지 않음
    if (equipment[90]) {
      equipment[13] = 1; // 강제 장착 상태 유지
    }

    // 더럽힘 처리 (촉수)
    // 원본: COMF13.ERB 라인 192-198
    if (equipment[90] && equipment[13]) {
      context.stain = context.stain || [];
      context.stain[4] = (context.stain[4] || 0) | 2; // A에 애액
      context.stain[4] = (context.stain[4] || 0) | 4; // A에 정액
    }
  },
};
