/**
 * COMF15 - 니플캡 (Nipple Cap / Electric Nipple Stimulator)
 * 원본: ERB/指導関係/COMF15.ERB
 *
 * 조교 대상의 유두를 니플캡으로 자극하는 도구 사용 커맨드
 * 착탈 토글 시스템: 실행 시마다 장착/해제 토글
 * 장착 중에는 다른 커맨드 실행 시 추가 SOURCE 적용 및 경험치 획득 (@EQUIP_COM15)
 */

import type { CommandPlugin, TrainingContext } from '../../../../types/training';
import { SourceModifier } from '../../systems/SourceModifier';

/**
 * SOURCE 계산 헬퍼 함수
 * 원본: COMF15.ERB 라인 16-77
 */
function calculateNippleCapSource(context: TrainingContext): number[] {
  const { target } = context;
  const abilities = target.abl;
  const talents = context.talents || {};

  // B감각 (인덱스 1)
  const bSense = abilities[1] || 0;

  // 기본 SOURCE 설정
  const source: number[] = new Array(19).fill(0);

  // LOSEBASE
  let loseBase0 = 20; // 체력
  let loseBase1 = 70; // 기력

  // B감각에 따른 쾌B 계산
  // 원본: COMF15.ERB 라인 25-38
  const bSenseValues = [
    100,  // 0
    300,  // 1
    800,  // 2
    1500, // 3
    2300, // 4
    2900, // 5
  ];
  let bPleasure = bSenseValues[Math.min(bSense, 5)];

  // 조교자 소질 보정
  // 원본: COMF15.ERB 라인 40-46
  const playerTalents = context.playerTalents || {};
  if (playerTalents[131]) { // 유아퇴행
    source[3] *= 1.20;
  }
  if (playerTalents[132]) { // 유치
    source[3] *= 1.20;
  }

  // 대상 가슴 크기 보정
  // 원본: COMF15.ERB 라인 48-55
  if (talents[110]) { // 거유
    bPleasure *= 1.50;
  }
  if (talents[108]) { // 폭유
    bPleasure *= 1.50;
  } else if (talents[107]) { // 빈유
    bPleasure *= 0.60;
  }

  source[3] = bPleasure;

  // ITEM:205 (고급 니플캡) 소지 시 보정
  // 원본: COMF15.ERB 라인 69-77 (슬라임 패치)
  const items = context.items || {};
  if (items[205] && items[205] >= 1 && !context.equipment?.[90]) {
    loseBase0 *= 0.80;
    loseBase1 *= 0.80;
    source[10] *= 1.20;
    source[11] *= 0.80;
    source[3] *= 1.20;
  }

  context.loseBase = context.loseBase || [];
  context.loseBase[0] = (context.loseBase[0] || 0) + Math.floor(loseBase0);
  context.loseBase[1] = (context.loseBase[1] || 0) + Math.floor(loseBase1);

  // SourceModifier로 소질/능력 보정 적용
  return SourceModifier.applyAll(source, context);
}

/**
 * 니플캡 장착 중 추가 SOURCE 계산
 * 원본: COMF15.ERB @EQUIP_COM15 (라인 99-190)
 *
 * 다른 커맨드 실행 중에 니플캡이 장착되어 있으면 호출됨
 */
function calculateEquippedNippleCapSource(context: TrainingContext): number[] {
  const abilities = context.target.abl;

  // B감각 (인덱스 1)
  const bSense = abilities[1] || 0;

  // PALAM levels
  const lustLevel = getParamLevel(context.params?.[5] || 0);

  // 종순 (인덱스 10)
  const submission = abilities[10] || 0;

  // LOSEBASE 추가
  let addLoseBase0 = 5;
  let addLoseBase1 = 20;

  // B감각에 따른 쾌B
  // 원본: COMF15.ERB 라인 112-125
  const bSenseValues = [40, 120, 250, 450, 600, 750];
  let bPleasure = bSenseValues[Math.min(bSense, 5)];

  // 욕정 보정
  // 원본: COMF15.ERB 라인 127-138
  const lustModifiers = [0.80, 0.90, 1.00, 1.10, 1.20];
  const lustMult = lustModifiers[Math.min(lustLevel, 4)];
  bPleasure *= lustMult;

  // 종순 보정
  // 원본: COMF15.ERB 라인 140-153
  const subModifiers = [0.80, 0.90, 1.00, 1.10, 1.20, 1.30];
  const subMult = subModifiers[Math.min(submission, 5)];
  bPleasure *= subMult;

  // ITEM:205 (고급 니플캡)
  // 원본: COMF15.ERB 라인 159-167
  const items = context.items || {};
  if (items[205] && items[205] >= 1 && !context.equipment?.[90]) {
    addLoseBase0 -= 1;
    addLoseBase1 -= 4;
    bPleasure *= 1.20;
  }

  context.loseBase = context.loseBase || [];
  context.loseBase[0] = (context.loseBase[0] || 0) + addLoseBase0;
  context.loseBase[1] = (context.loseBase[1] || 0) + addLoseBase1;

  // 경험치 획득
  // 원본: COMF15.ERB 라인 168-184

  // 레즈/호모 경험
  // 원본: COMF15.ERB 라인 171-179
  const talents = context.talents || {};
  context.exp = context.exp || [];
  if (talents[122] === 0 && context.playerTalents?.[122] === 0) {
    context.exp[40] = (context.exp[40] || 0) + 1;
    context.showMessage('레즈경험 +1');
  } else if (talents[122] === 1 && context.playerTalents?.[122] === 1) {
    context.exp[41] = (context.exp[41] || 0) + 1;
    context.showMessage('호모경험 +1');
  }

  // 니플캡 장착 중이면 애정경험 +1
  // 원본: COMF15.ERB 라인 181-184
  const equipment = context.equipment || {};
  if (equipment[15]) {
    context.exp[14] = (context.exp[14] || 0) + 1;
    context.showMessage('애정경험 +1');
  }

  const source: number[] = new Array(19).fill(0);
  source[3] = Math.floor(bPleasure);
  source[7] = 50;
  source[9] = 50;

  return source;
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
 * 메시지 생성 헬퍼 함수
 * 원본: TRAIN_MESSAGE_B.ERB (니플캡 관련 부분)
 */
function generateNippleCapMessage(context: TrainingContext): string {
  const targetName = context.target.name;
  const equipment = context.equipment || {};

  // 촉수
  if (equipment[90]) {
    return `${targetName}의 유두에 촉수가 달라붙어 흡입하기 시작했다.`;
  }

  // 니플캡
  let msg = `${targetName}의 유두에 니플캡을 장착했다.`;

  // 고급 니플캡
  const items = context.items || {};
  if (items[205] && items[205] >= 1) {
    msg += ` 강력한 진동과 흡입이 ${targetName}의 유두를 자극한다.`;
  }

  // B감각에 따른 반응
  const bSense = context.target.abl[1] || 0;
  if (bSense >= 4) {
    msg += ` ${targetName}은(는) 니플캡의 자극에 즉시 반응하며 몸을 떨었다.`;
  } else if (bSense === 0) {
    msg += ` ${targetName}은(는) 아직 미숙하지만 점차 가슴의 쾌감을 느끼기 시작했다.`;
  }

  return msg;
}

/**
 * 장착 중 상태 메시지
 * 원본: COMF15.ERB @EQUIP_COM15 라인 99-104
 */
function getEquippedStatusMessage(context: TrainingContext): string {
  const equipment = context.equipment || {};
  if (equipment[90]) {
    return '＜촉수 유두자극중＞';
  } else {
    return '＜니플캡 장착중＞';
  }
}

export const COMF15_nippleCap: CommandPlugin = {
  id: 15,
  name: '니플캡',
  category: '도구',
  staminaCost: 20,

  /**
   * 가용성 판정
   * 원본: COMABLE.ERB @COM_ABLE15
   */
  isAvailable: (context: TrainingContext) => {
    const items = context.items || {};
    const equipment = context.equipment || {};
    const charFlags = context.charFlags || {};

    // 니플캡 소지 필요 (ITEM:15)
    if (!items[15]) return false;

    // 슬라임 지도중 불가
    if (equipment[150]) return false;

    // 촉수 중이 아닐 때: 상의 착용 불가
    if (!equipment[90] && (charFlags[40] & 8)) return false;

    return true;
  },

  /**
   * 커맨드 실행
   * 원본: COMF15.ERB 전체
   */
  async execute(context: TrainingContext): Promise<void> {
    const targetName = context.target.name;
    const talents = context.talents || {};
    const equipment = context.equipment || {};

    // 커맨드명 표시
    // 원본: COMF15.ERB 라인 7-14
    if (equipment[90]) {
      context.showMessage('촉수 유두자극');
    } else {
      context.showMessage('니플캡');
    }

    // 메시지 생성 및 표시
    const message = generateNippleCapMessage(context);
    context.showMessage(message);

    // SOURCE 계산
    const source = calculateNippleCapSource(context);

    // SOURCE 적용
    if (context.applySource) {
      context.applySource(source);
    } else {
      context.params = context.params || [];
      for (let i = 0; i < source.length && i < context.params.length; i++) {
        context.params[i] = (context.params[i] || 0) + source[i];
      }
    }

    // 경험치 획득
    // 원본: COMF15.ERB 라인 59-67

    // 레즈/호모 경험
    context.exp = context.exp || [];
    if (talents[122] === 0 && context.playerTalents?.[122] === 0) {
      context.exp[40] = (context.exp[40] || 0) + 1;
      context.showMessage('레즈경험 +1');
    } else if (talents[122] === 1 && context.playerTalents?.[122] === 1) {
      context.exp[41] = (context.exp[41] || 0) + 1;
      context.showMessage('호모경험 +1');
    }

    // 니플캡 착탈 토글
    // 원본: COMF15.ERB 라인 78-83
    equipment[15] = equipment[15] === 1 ? 0 : 1;

    if (equipment[15] === 1) {
      context.showMessage('니플캡을 장착했다.');
    } else {
      context.showMessage('니플캡을 제거했다.');
    }

    // 촉수 중엔 토글하지 않음
    if (equipment[90]) {
      equipment[15] = 1; // 강제 장착 상태 유지
    }

    // 더럽힘 처리 (촉수)
    // 원본: COMF15.ERB 라인 85-91
    if (equipment[90] && equipment[15]) {
      context.stain = context.stain || [];
      context.stain[5] = (context.stain[5] || 0) | 2; // 가슴에 애액
      context.stain[5] = (context.stain[5] || 0) | 4; // 가슴에 정액
    }
  },
};
