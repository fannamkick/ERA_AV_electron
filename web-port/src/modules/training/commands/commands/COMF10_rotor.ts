/**
 * COMF10 - 로터 (Rotor)
 * 원본: ERB/指導関係/COMF10.ERB
 *
 * 조교 대상의 클리토리스를 로터로 자극하는 도구 사용 커맨드
 */

import type { CommandPlugin, TrainingContext } from '../../../../types/training';
import { SourceModifier } from '../../systems/SourceModifier';

/**
 * SOURCE 계산 헬퍼 함수
 * 원본: COMF10.ERB 라인 12-43
 */
function calculateRotorSource(context: TrainingContext): number[] {
  const { target } = context;
  const abilities = target.abl;

  // C감각
  const cSense = abilities[0] || 0;

  // 기본 SOURCE 설정
  const source: number[] = new Array(19).fill(0);

  // LOSEBASE
  context.loseBase = context.loseBase || [];
  context.loseBase[0] = (context.loseBase[0] || 0) + 10; // 체력
  context.loseBase[1] = (context.loseBase[1] || 0) + 80; // 기력

  // C감각에 따른 쾌C 계산
  // 원본: COMF10.ERB 라인 21-34
  const cSenseValues = [
    200,  // 0
    400,  // 1
    900,  // 2
    1600, // 3
    2400, // 4
    3000, // 5
  ];

  source[0] = cSenseValues[Math.min(cSense, 5)];

  // ITEM:200 (전동 로터 / 고급 로터) 소지 시 보정
  // 원본: COMF10.ERB 라인 35-42 (슬라임 패치)
  const items = context.items || {};
  if (items[200] && items[200] >= 1) {
    let loseBase0Adjust = 10 * 0.80;
    let loseBase1Adjust = 80 * 0.80;
    context.loseBase[0] = (context.loseBase[0] || 0) - 10 + Math.floor(loseBase0Adjust);
    context.loseBase[1] = (context.loseBase[1] || 0) - 80 + Math.floor(loseBase1Adjust);
    source[0] *= 1.20;
    source[10] *= 1.20;
    source[11] *= 0.80;
  }

  // SourceModifier로 소질/능력 보정 적용
  return SourceModifier.applyAll(source, context);
}

/**
 * 메시지 생성 헬퍼 함수
 * 원본: TRAIN_MESSAGE_B.ERB (로터 관련 부분)
 */
function generateRotorMessage(context: TrainingContext): string {
  const targetName = context.target.name;
  const items = context.items || {};

  // 기본 메시지
  let msg = `${targetName}의 클리토리스에 로터를 대고 진동시켰다.`;

  // 고급 로터 사용
  if (items[200] && items[200] >= 1) {
    msg += ` 강력한 진동이 ${targetName}의 몸을 흔든다.`;
  }

  // C감각에 따른 반응
  const cSense = context.target.abl[0] || 0;
  if (cSense >= 4) {
    msg += ` ${targetName}은(는) 로터의 자극에 즉시 반응하며 신음을 흘린다.`;
  } else if (cSense === 0) {
    msg += ` ${targetName}은(는) 아직 미숙하지만 점차 자극을 느끼기 시작했다.`;
  }

  return msg;
}

export const COMF10_rotor: CommandPlugin = {
  id: 10,
  name: '로터',
  category: '도구',
  staminaCost: 10,

  /**
   * 가용성 판정
   * 원본: COMABLE.ERB @COM_ABLE10
   */
  isAvailable: (context: TrainingContext) => {
    const items = context.items || {};
    const equipment = context.equipment || {};
    const charFlags = context.charFlags || {};

    // 로터 소지 필요 (ITEM:10)
    if (!items[10]) return false;

    // 촉수 지도중 불가
    if (equipment[90]) return false;

    // 슬라임 지도중 불가
    if (equipment[150]) return false;

    // 삼각목마 기승중 불가
    if (equipment[70]) return false;

    // 팬티 or 하의 착용 불가
    if (charFlags[40] && (charFlags[40] & 17)) return false;

    // 검은 스타킹 불가
    if (charFlags[170] === 6 && charFlags[173] === 0) return false;

    // 기저귀 불가
    if (charFlags[42] === 69 && charFlags[40] && (charFlags[40] & 64)) return false;

    // 즈코 인형 불가
    if (charFlags[42] === 11 && charFlags[40] && (charFlags[40] & 64)) return false;

    return true;
  },

  /**
   * 커맨드 실행
   * 원본: COMF10.ERB 전체
   */
  async execute(context: TrainingContext): Promise<void> {
    const targetName = context.target.name;

    // 커맨드명 표시
    context.showMessage('로터');

    // 메시지 생성 및 표시
    const message = generateRotorMessage(context);
    context.showMessage(message);

    // SOURCE 계산
    const source = calculateRotorSource(context);

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
    // 원본: COMF10.ERB 라인 45-57
    context.exp = context.exp || [];
    const playerTalents = context.playerTalents || [];

    // 레즈/호모 경험
    if (context.talents[122] === 0 && playerTalents[122] === 0) {
      // 양쪽 다 여성
      context.exp[40] = (context.exp[40] || 0) + 1;
      context.showMessage('레즈경험 +1');
    } else if (context.talents[122] === 1 && playerTalents[122] === 1) {
      // 양쪽 다 남성
      context.exp[41] = (context.exp[41] || 0) + 1;
      context.showMessage('호모경험 +1');
    }

    // 주의: 원본 ERB에는 TEQUIP:10 설정이 없음
    // 로터는 착탈 토글이 없는 즉시 자극 커맨드
  },
};
