/**
 * COMF14 - 클리캡 (Clitoral Cap / Electric Clitoral Stimulator)
 * 원본: ERB/指導關係/COMF14.ERB
 *
 * 조교 대상의 클리토리스를 클리캡으로 자극하는 도구 사용 커맨드
 * 착탈 토글 시스템: 실행 시마다 장착/해제 토글
 * 장착 중에는 다른 커맨드 실행 시 추가 SOURCE 적용 (@EQUIP_COM14)
 */

import type { CommandPlugin, TrainingContext } from '../../../../types/training';
import { SourceModifier } from '../../systems/SourceModifier';

/**
 * SOURCE 계산 헬퍼 함수
 * 원본: COMF14.ERB 라인 16-48
 */
function calculateClitCapSource(context: TrainingContext): number[] {
  const { target } = context;
  const abilities = target.abl;

  // C감각 (인덱스 0)
  const cSense = abilities[0] || 0;

  // 기본 SOURCE 설정
  const source: number[] = new Array(19).fill(0);

  // LOSEBASE
  let loseBase0 = 10; // 체력
  let loseBase1 = 80; // 기력

  // C감각에 따른 쾌C 계산
  // 원본: COMF14.ERB 라인 25-38
  const cSenseValues = [
    200,  // 0
    400,  // 1
    900,  // 2
    1600, // 3
    2400, // 4
    3000, // 5
  ];

  source[0] = cSenseValues[Math.min(cSense, 5)];

  // ITEM:204 (고급 클리캡) 소지 시 보정
  // 원본: COMF14.ERB 라인 40-48 (슬라임 패치)
  const items = context.items || {};
  if (items[204] && items[204] >= 1 && !context.equipment?.[90]) {
    loseBase0 *= 0.80;
    loseBase1 *= 0.80;
    source[0] *= 1.20;
    source[10] *= 1.20;
    source[11] *= 0.80;
  }

  context.loseBase = context.loseBase || [];
  context.loseBase[0] = (context.loseBase[0] || 0) + Math.floor(loseBase0);
  context.loseBase[1] = (context.loseBase[1] || 0) + Math.floor(loseBase1);

  // SourceModifier로 소질/능력 보정 적용
  return SourceModifier.applyAll(source, context);
}

/**
 * 클리캡 장착 중 추가 SOURCE 계산
 * 원본: COMF14.ERB @EQUIP_COM14 (라인 80-156)
 *
 * 다른 커맨드 실행 중에 클리캡이 장착되어 있으면 호출됨
 */
function calculateEquippedClitCapSource(context: TrainingContext): number[] {
  const abilities = context.target.abl;

  // C감각 (인덱스 0)
  const cSense = abilities[0] || 0;

  // PALAM levels
  const lustLevel = getParamLevel(context.params?.[5] || 0);

  // 종순 (인덱스 10)
  const submission = abilities[10] || 0;

  // LOSEBASE 추가
  let addLoseBase0 = 5;
  let addLoseBase1 = 20;

  // C감각에 따른 쾌C
  // 원본: COMF14.ERB 라인 93-106
  const cSenseValues = [40, 120, 250, 450, 600, 750];
  let cPleasure = cSenseValues[Math.min(cSense, 5)];

  // 욕정 보정
  // 원본: COMF14.ERB 라인 108-119
  const lustModifiers = [0.80, 0.90, 1.00, 1.10, 1.20];
  const lustMult = lustModifiers[Math.min(lustLevel, 4)];
  cPleasure *= lustMult;

  // 종순 보정
  // 원본: COMF14.ERB 라인 121-134
  const subModifiers = [0.80, 0.90, 1.00, 1.10, 1.20, 1.30];
  const subMult = subModifiers[Math.min(submission, 5)];
  cPleasure *= subMult;

  // ITEM:204 (고급 클리캡)
  // 원본: COMF14.ERB 라인 140-148
  const items = context.items || {};
  if (items[204] && items[204] >= 1 && !context.equipment?.[90]) {
    addLoseBase0 -= 1;
    addLoseBase1 -= 4;
    cPleasure *= 1.20;
  }

  context.loseBase = context.loseBase || [];
  context.loseBase[0] = (context.loseBase[0] || 0) + addLoseBase0;
  context.loseBase[1] = (context.loseBase[1] || 0) + addLoseBase1;

  const source: number[] = new Array(19).fill(0);
  source[0] = Math.floor(cPleasure);
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
 * 원본: TRAIN_MESSAGE_B.ERB (클리캡 관련 부분)
 */
function generateClitCapMessage(context: TrainingContext): string {
  const targetName = context.target.name;
  const equipment = context.equipment || {};

  // 촉수
  if (equipment[90]) {
    return `${targetName}의 클리토리스에 촉수가 달라붙어 흡입하기 시작했다.`;
  }

  // 클리캡
  let msg = `${targetName}의 클리토리스에 전동 클리캡을 장착했다.`;

  // 고급 클리캡
  const items = context.items || {};
  if (items[204] && items[204] >= 1) {
    msg += ` 강력한 진동과 흡입이 ${targetName}의 클리토리스를 자극한다.`;
  }

  // C감각에 따른 반응
  const cSense = context.target.abl[0] || 0;
  if (cSense >= 4) {
    msg += ` ${targetName}은(는) 클리캡의 자극에 즉시 반응하며 몸을 떨었다.`;
  } else if (cSense === 0) {
    msg += ` ${targetName}은(는) 아직 미숙하지만 점차 클리토리스의 쾌감을 느끼기 시작했다.`;
  }

  return msg;
}

/**
 * 장착 중 상태 메시지
 * 원본: COMF14.ERB @EQUIP_COM14 라인 80-85
 */
function getEquippedStatusMessage(context: TrainingContext): string {
  const equipment = context.equipment || {};
  if (equipment[90]) {
    return '＜촉수 클리자극중＞';
  } else {
    return '＜클리캡 장착중＞';
  }
}

export const COMF14_clitCap: CommandPlugin = {
  id: 14,
  name: '전동 클리캡',
  category: '도구',
  staminaCost: 10,

  /**
   * 가용성 판정
   * 원본: COMABLE.ERB @COM_ABLE14
   */
  isAvailable: (context: TrainingContext) => {
    const items = context.items || {};
    const equipment = context.equipment || {};
    const charFlags = context.charFlags || {};

    // 클리캡 소지 필요 (ITEM:14)
    if (!items[14]) return false;

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
   * 원본: COMF14.ERB 전체
   */
  async execute(context: TrainingContext): Promise<void> {
    const targetName = context.target.name;
    const talents = context.talents || {};
    const equipment = context.equipment || {};

    // 커맨드명 표시
    // 원본: COMF14.ERB 라인 7-14
    if (equipment[90]) {
      context.showMessage('촉수 클리자극');
    } else {
      context.showMessage('전동 클리캡');
    }

    // 메시지 생성 및 표시
    const message = generateClitCapMessage(context);
    context.showMessage(message);

    // SOURCE 계산
    const source = calculateClitCapSource(context);

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
    // 원본: COMF14.ERB 라인 49-57

    // 레즈 경험 (여성만)
    // 원본: COMF14.ERB 라인 52-57
    if (talents[122] === 0 && context.playerTalents?.[122] === 0) {
      context.exp = context.exp || [];
      context.exp[40] = (context.exp[40] || 0) + 1;
      context.showMessage('레즈경험 +1');
    }

    // 클리캡 착탈 토글
    // 원본: COMF14.ERB 라인 59-64
    equipment[14] = equipment[14] === 1 ? 0 : 1;

    if (equipment[14] === 1) {
      context.showMessage('클리캡을 장착했다.');
    } else {
      context.showMessage('클리캡을 제거했다.');
    }

    // 촉수 중엔 토글하지 않음
    if (equipment[90]) {
      equipment[14] = 1; // 강제 장착 상태 유지
    }

    // 더럽힘 처리 (촉수)
    // 원본: COMF14.ERB 라인 66-72
    if (equipment[90] && equipment[14]) {
      context.stain = context.stain || [];
      context.stain[3] = (context.stain[3] || 0) | 2; // V에 애액
      context.stain[3] = (context.stain[3] || 0) | 4; // V에 정액
    }
  },
};
