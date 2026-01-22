/**
 * COMF11 - 바이브 (Vibrator)
 * 원본: ERB/指導關係/COMF11.ERB
 *
 * 조교 대상의 질에 바이브를 삽입하는 도구 사용 커맨드
 * 착탈 시스템: 실행 시마다 장착/해제 토글
 * 장착 중에는 다른 커맨드 실행 시 추가 SOURCE 적용 (@EQUIP_COM11)
 */

import type { CommandPlugin, TrainingContext } from '../../../../types/training';
import { SourceModifier } from '../../systems/SourceModifier';
import { VaginaSexHandler } from '../common/VaginaSexHandler';

/**
 * V경험 레벨 계산
 * 원본: COMF11.ERB 라인 96-104
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
 * 원본: COMF11.ERB 라인 62-80 참조
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
 * 원본: COMF11.ERB 라인 20-127
 */
function calculateVibratorSource(context: TrainingContext): number[] {
  const { target } = context;
  const abilities = target.abl;
  const talents = context.talents || [];

  // V감각
  const vSense = abilities[2] || 0;

  // EXP levels
  const vExpLevel = getExpLevel(context.exp?.[0] || 0); // EXP:0 = V경험

  // PALAM levels
  const lubLevel = getParamLevel(context.params?.[3] || 0); // 윤활
  const lustLevel = getParamLevel(context.params?.[5] || 0); // 욕정

  // 종순
  const submission = abilities[10] || 0;

  // 기본 SOURCE 설정
  const source: number[] = new Array(19).fill(0);

  // LOSEBASE
  let loseBase0 = 30; // 체력
  let loseBase1 = 100; // 기력

  // V감각에 따른 쾌V 계산
  // 원본: COMF11.ERB 라인 26-39
  const vSenseValues = [
    80,   // 0
    250,  // 1
    600,  // 2
    1000, // 3
    1300, // 4
    1700, // 5
  ];

  source[1] = vSenseValues[Math.min(vSense, 5)];

  // V경험에 따른 보정
  // 원본: COMF11.ERB 라인 41-60
  const vExpModifiers = [
    { mult: 0.20, pain: 5500 }, // < EXPLV:1 (처녀)
    { mult: 0.60, pain: 300 },  // < EXPLV:2
    { mult: 1.00, pain: 50 },   // < EXPLV:3
    { mult: 1.20, pain: 10 },   // < EXPLV:4
    { mult: 1.40, pain: 0 },    // < EXPLV:5
    { mult: 1.60, pain: 0 },    // >= EXPLV:5
  ];

  const vExpMod = vExpModifiers[Math.min(vExpLevel, 5)];
  source[1] *= vExpMod.mult;
  source[12] = vExpMod.pain;

  // PALAM:윤활 레벨에 따른 보정
  // 원본: COMF11.ERB 라인 62-80
  const lubModifiers = [
    { vMult: 0.10, painAdd: 1000, painMult: 3.00 }, // < PALAMLV:1
    { vMult: 0.40, painAdd: 400, painMult: 1.00 },  // < PALAMLV:2
    { vMult: 1.00, painAdd: 0, painMult: 0.50 },    // < PALAMLV:3
    { vMult: 1.40, painAdd: 0, painMult: 0.20 },    // < PALAMLV:4
    { vMult: 1.80, painAdd: 0, painMult: 0.10 },    // >= PALAMLV:4
  ];

  const lubMod = lubModifiers[Math.min(lubLevel, 4)];
  source[1] *= lubMod.vMult;
  source[12] += lubMod.painAdd;
  source[12] *= lubMod.painMult;

  // PALAM:욕정 레벨에 따른 보정
  // 원본: COMF11.ERB 라인 82-93
  const lustModifiers = [0.80, 0.90, 1.00, 1.10, 1.20];
  const lustMult = lustModifiers[Math.min(lustLevel, 4)];
  source[1] *= lustMult;

  // ABL:종순에 따른 보정
  // 원본: COMF11.ERB 라인 95-108
  const subModifiers = [0.80, 0.90, 1.00, 1.10, 1.20, 1.30];
  const subMult = subModifiers[Math.min(submission, 5)];
  source[1] *= subMult;

  // 소질 보정
  // 원본: COMF11.ERB 라인 110-118
  if (talents[99]) source[12] *= 0.80; // 큰체구
  if (talents[100]) source[12] *= 2.00; // 작은체형
  if (talents[135]) source[12] *= 4.00; // 미숙함

  // ITEM:201 (고급 바이브) 소지 시 보정
  // 원본: COMF11.ERB 라인 120-127 (슬라임 패치)
  const items = context.items || {};
  if (items[201] && items[201] >= 1 && !context.equipment?.[90]) {
    loseBase0 *= 0.80;
    loseBase1 *= 0.80;
    source[1] *= 1.20;
    source[12] *= 0.80;
  }

  context.loseBase = context.loseBase || [];
  context.loseBase[0] = (context.loseBase[0] || 0) + Math.floor(loseBase0);
  context.loseBase[1] = (context.loseBase[1] || 0) + Math.floor(loseBase1);

  // SourceModifier로 소질/능력 보정 적용
  return SourceModifier.applyAll(source, context);
}

/**
 * 바이브 장착 중 추가 SOURCE 계산
 * 원본: COMF11.ERB @EQUIP_COM11 (라인 174-336)
 * 다른 커맨드 실행 중에 바이브가 장착되어 있으면 호출됨
 */
function calculateEquippedVibratorSource(context: TrainingContext, currentCommandId?: number): number[] {
  const abilities = context.target.abl;
  const talents = context.talents || [];

  // V감각
  const vSense = abilities[2] || 0;

  // EXP levels
  const vExpLevel = getExpLevel(context.exp?.[0] || 0);

  // PALAM levels
  const lubLevel = getParamLevel(context.params?.[3] || 0);
  const lustLevel = getParamLevel(context.params?.[5] || 0);

  // 종순
  const submission = abilities[10] || 0;

  // LOSEBASE 추가
  let addLoseBase0 = 10;
  let addLoseBase1 = 50;

  // 임시 변수
  let vPleasure = 0;
  let pain = 0;
  let lubBonus = 0;

  // V감각에 따른 쾌V
  // 원본: COMF11.ERB 라인 195-208
  const vSenseValues = [40, 120, 300, 500, 650, 850];
  vPleasure = vSenseValues[Math.min(vSense, 5)];

  // V경험 보정 (처녀는 있을 수 없음)
  // 원본: COMF11.ERB 라인 210-227
  const vExpModifiers = [
    { mult: 0.60, pain: 150 }, // < EXPLV:2
    { mult: 1.00, pain: 20 },  // < EXPLV:3
    { mult: 1.20, pain: 0 },   // < EXPLV:4
    { mult: 1.40, pain: 0 },   // < EXPLV:5
    { mult: 1.60, pain: 0 },   // >= EXPLV:5
  ];

  const vExpMod = vExpModifiers[Math.min(Math.max(vExpLevel - 1, 0), 4)];
  vPleasure *= vExpMod.mult;
  pain = vExpMod.pain;

  // 윤활 보정
  // 원본: COMF11.ERB 라인 229-250
  const lubModifiers = [
    { vMult: 0.10, painAdd: 400, painMult: 3.00, lubAdd: 1000 },
    { vMult: 0.40, painAdd: 150, painMult: 1.00, lubAdd: 200 },
    { vMult: 1.00, painAdd: 0, painMult: 0.50, lubAdd: 80 },
    { vMult: 1.40, painAdd: 0, painMult: 0.20, lubAdd: 0 },
    { vMult: 1.80, painAdd: 0, painMult: 0.10, lubAdd: 0 },
  ];

  const lubMod = lubModifiers[Math.min(lubLevel, 4)];
  vPleasure *= lubMod.vMult;
  pain += lubMod.painAdd;
  pain *= lubMod.painMult;
  lubBonus += lubMod.lubAdd;

  // 욕정 보정
  // 원본: COMF11.ERB 라인 252-263
  const lustModifiers = [0.80, 0.90, 1.00, 1.10, 1.20];
  const lustMult = lustModifiers[Math.min(lustLevel, 4)];
  vPleasure *= lustMult;

  // 종순 보정
  // 원본: COMF11.ERB 라인 265-278
  const subModifiers = [0.80, 0.90, 1.00, 1.10, 1.20, 1.30];
  const subMult = subModifiers[Math.min(submission, 5)];
  vPleasure *= subMult;

  // 소질 보정
  // 원본: COMF11.ERB 라인 280-294
  if (talents[99]) pain *= 0.80;   // 큰체구
  if (talents[100]) pain *= 2.00;  // 작은체형
  if (talents[135]) pain *= 4.00;  // 미숙함
  if (talents[30]) pain *= 3.00;   // 정조관념

  // ITEM:201 (고급 바이브)
  // 원본: COMF11.ERB 라인 300-307
  const items = context.items || {};
  if (items[201] && items[201] >= 1 && !context.equipment?.[90]) {
    addLoseBase0 -= 2;
    addLoseBase1 -= 10;
    vPleasure *= 1.20;
    pain *= 0.80;
  }

  context.loseBase = context.loseBase || [];
  context.loseBase[0] = (context.loseBase[0] || 0) + addLoseBase0;
  context.loseBase[1] = (context.loseBase[1] || 0) + addLoseBase1;

  // 경험치 획득
  // 원본: COMF11.ERB 라인 308-327
  let vExpGain = 0;

  // 자위 실행 시 경험 +1
  // 원본: COMF11.ERB 라인 312-314
  if (currentCommandId === 3) { // SELECTCOM == 3 (자위)
    vExpGain = 1;
  }

  // V감각에 따른 V경험
  // 원본: COMF11.ERB 라인 315-324
  if (vSense <= 1) {
    vExpGain += 1;
  } else if (vSense <= 4) {
    vExpGain += 2;
  } else if (vSense <= 7) {
    vExpGain += 3;
  } else {
    vExpGain += 4;
  }

  context.exp = context.exp || [];
  context.exp[0] = (context.exp[0] || 0) + vExpGain;
  context.showMessage(`V경험 +${vExpGain}`);

  // 결과 SOURCE 반환
  const source: number[] = new Array(19).fill(0);
  source[1] = Math.floor(vPleasure);
  source[3] = lubBonus;
  source[12] = Math.floor(pain);

  return source;
}

/**
 * 메시지 생성 헬퍼 함수
 * 원본: TRAIN_MESSAGE_B.ERB (바이브 관련 부분)
 */
function generateVibratorMessage(context: TrainingContext): string {
  const targetName = context.target.name;
  const equipment = context.equipment || {};

  // 촉수
  if (equipment[90]) {
    return `${targetName}의 질에 촉수가 침입했다. 촉수가 꿈틀거리며 내부를 자극한다.`;
  }

  // 바이브
  let msg = `${targetName}의 질에 바이브를 삽입했다.`;

  // 극태 바이브 (TALENT:76)
  if (context.talents?.[76] === 1) {
    msg = `${targetName}의 질에 극태 바이브를 삽입했다. ${targetName}의 질이 크게 확장된다.`;
  }

  // 고급 바이브
  const items = context.items || {};
  if (items[201] && items[201] >= 1) {
    msg += ` 강력한 진동이 ${targetName}의 질 내부를 자극한다.`;
  }

  // V감각에 따른 반응
  const vSense = context.target.abl[2] || 0;
  if (vSense >= 4) {
    msg += ` ${targetName}은(는) 바이브의 진동에 즉시 반응하며 몸을 떨었다.`;
  } else if (vSense === 0) {
    msg += ` ${targetName}은(는) 아직 미숙하지만 점차 질 내부의 쾌감을 느끼기 시작했다.`;
  }

  // 윤활도
  const lubLevel = Math.floor((context.params?.[3] || 0) / 10000);
  if (lubLevel === 0) {
    msg += ` 윤활이 부족해 바이브가 들어가기 어렵다.`;
  } else if (lubLevel >= 4) {
    msg += ` 충분히 젖은 질이 바이브를 부드럽게 받아들인다.`;
  }

  return msg;
}

/**
 * 장착 중 상태 메시지 생성
 * 원본: COMF11.ERB @EQUIP_COM11 라인 174-187
 */
function getEquippedStatusMessage(context: TrainingContext): string {
  if (context.equipment?.[90]) {
    return '＜촉수 삽입중＞';
  } else if (context.talents?.[76] === 1) {
    return '＜극태 바이브 삽입중＞';
  } else {
    return '＜바이브 삽입중＞';
  }
}

export const COMF11_vibrator: CommandPlugin = {
  id: 11,
  name: '바이브',
  category: '도구',
  staminaCost: 30,

  /**
   * 가용성 판정
   * 원본: COMABLE.ERB @COM_ABLE11
   */
  isAvailable: (context: TrainingContext) => {
    const items = context.items || {};
    const equipment = context.equipment || {};
    const charFlags = context.charFlags || {};

    // 바이브 소지 필요 (ITEM:11)
    if (!items[11]) return false;

    // 남성 불가
    if (context.talents?.[122]) return false;

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
   * 원본: COMF11.ERB 전체
   */
  async execute(context: TrainingContext): Promise<void> {
    const targetName = context.target.name;

    // 처녀 확인 (COMF11.ERB 라인 6-9)
    if (context.talents?.[74]) { // 처녀
      const confirmed = await VaginaSexHandler.confirmVirginity(context);
      if (!confirmed) return;
    }

    // 커맨드명 표시
    if (context.equipment?.[90]) {
      context.showMessage('촉수 삽입');
    } else {
      context.showMessage('바이브');
    }

    // 메시지 생성 및 표시
    const message = generateVibratorMessage(context);
    context.showMessage(message);

    // SOURCE 계산
    const source = calculateVibratorSource(context);

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
    // 원본: COMF11.ERB 라인 129-151

    // V감각에 따른 V경험
    const vSense = context.target.abl[2] || 0;
    let vExpGain = 1;
    if (vSense <= 1) vExpGain = 1;
    else if (vSense <= 4) vExpGain = 2;
    else if (vSense <= 7) vExpGain = 3;
    else vExpGain = 4;

    context.exp = context.exp || [];
    context.exp[0] = (context.exp[0] || 0) + vExpGain;
    context.showMessage(`V경험 +${vExpGain}`);

    // 레즈 경험 (여성만)
    if (context.talents?.[122] === 0 && context.playerTalents?.[122] === 0) {
      context.exp[40] = (context.exp[40] || 0) + 3;
      context.showMessage('레즈경험 +3');
    }

    // 바이브 착탈 토글
    // 원본: COMF11.ERB 라인 153-158
    const equipment = context.equipment || {};
    const wasEquipped = equipment[11] === 1;
    equipment[11] = wasEquipped ? 0 : 1;

    if (equipment[11] === 1) {
      context.showMessage('바이브를 삽입했다.');
      // V경험 플래그 (처녀막 재생 대응)
      context.flags = context.flags || {};
      context.flags[19] = 1; // TFLAG:19
    } else {
      context.showMessage('바이브를 제거했다.');
    }

    // 촉수 중엔 토글하지 않음
    if (equipment[90]) {
      equipment[11] = 1; // 강제 장착 상태 유지
    }

    // 더럽힘 처리 (촉수)
    // 원본: COMF11.ERB 라인 160-166
    if (equipment[90] && equipment[11]) {
      context.stain = context.stain || [];
      context.stain[3] = (context.stain[3] || 0) | 2; // V에 애액
      context.stain[3] = (context.stain[3] || 0) | 4; // V에 정액
    }
  },
};
