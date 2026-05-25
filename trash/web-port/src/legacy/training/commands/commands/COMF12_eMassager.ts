/**
 * COMF12 - E마사지기 (Electric Massager)
 * 원본: ERB/指導關係/COMF12.ERB
 *
 * 조교 대상의 클리토리스를 E마사지기로 자극하는 도구 사용 커맨드
 * 로터보다 체력/기력 소모가 크지만, 저레벨에서 훨씬 효율적으로 쾌C 상승
 */

import type { CommandPlugin, TrainingContext } from '../../../../types/training';
import { SourceModifier } from '../../systems/SourceModifier';

/**
 * SOURCE 계산 헬퍼 함수
 * 원본: COMF12.ERB 라인 12-45
 */
function calculateEMassagerSource(context: TrainingContext): number[] {
  const { target } = context;
  const abilities = target.abl;

  // C감각
  const cSense = abilities[0] || 0;

  // 기본 SOURCE 설정
  const source: number[] = new Array(19).fill(0);

  // LOSEBASE
  let loseBase0 = 30; // 체력
  let loseBase1 = 150; // 기력

  // C감각에 따른 쾌C 계산
  // 원본: COMF12.ERB 라인 22-35
  const cSenseValues = [
    2000, // 0
    2500, // 1
    3000, // 2
    3300, // 3
    3600, // 4
    3800, // 5
  ];

  source[0] = cSenseValues[Math.min(cSense, 5)];

  // ITEM:202 (고급 E마사지기) 소지 시 보정
  // 원본: COMF12.ERB 라인 37-45 (슬라임 패치)
  const items = context.items || {};
  if (items[202] && items[202] >= 1) {
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
 * 메시지 생성 헬퍼 함수
 * 원본: TRAIN_MESSAGE_B.ERB (E마사지기 관련 부분)
 */
function generateEMassagerMessage(context: TrainingContext): string {
  const targetName = context.target.name;

  // 기본 메시지
  let msg = `${targetName}의 클리토리스에 E마사지기를 대고 전기 자극을 주었다.`;

  // 고급 E마사지기 사용
  const items = context.items || {};
  if (items[202] && items[202] >= 1) {
    msg += ` 강력한 전기 자극이 ${targetName}의 몸을 관통한다.`;
  }

  // C감각에 따른 반응
  const cSense = context.target.abl[0] || 0;
  if (cSense >= 4) {
    msg += ` ${targetName}은(는) 강렬한 자극에 전신을 경련시키며 신음을 흘린다.`;
  } else if (cSense === 0) {
    msg += ` ${targetName}은(는) 처음 느껴보는 전기 자극에 당황하고 있다.`;
  }

  return msg;
}

export const COMF12_eMassager: CommandPlugin = {
  id: 12,
  name: 'E마사지기',
  category: '도구',
  staminaCost: 30,

  /**
   * 가용성 판정
   * 원본: COMABLE.ERB @COM_ABLE12
   */
  isAvailable: (context: TrainingContext) => {
    const items = context.items || {};
    const equipment = context.equipment || {};
    const charFlags = context.charFlags || {};

    // E마사지기 소지 필요 (ITEM:12)
    if (!items[12]) return false;

    // 촉수 지도중 불가
    if (equipment[90]) return false;

    // 슬라임 지도중 불가
    if (equipment[150]) return false;

    // 삼각목마 기승중 불가
    if (equipment[70]) return false;

    // 팬티 or 하의 착용 불가
    if (charFlags[40] & 17) return false;

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
   * 원본: COMF12.ERB 전체
   */
  async execute(context: TrainingContext): Promise<void> {
    const targetName = context.target.name;

    // 커맨드명 표시
    context.showMessage('E마사지기');

    // 메시지 생성 및 표시
    const message = generateEMassagerMessage(context);
    context.showMessage(message);

    // SOURCE 계산
    const source = calculateEMassagerSource(context);

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
    // 원본: COMF12.ERB 라인 46-58
    context.exp = context.exp || [];

    // 레즈/호모 경험
    // 원본: COMF12.ERB 라인 49-58
    if (context.talents?.[122] === 0 && context.playerTalents?.[122] === 0) {
      // 양쪽 다 여성
      context.exp[40] = (context.exp[40] || 0) + 1;
      context.showMessage('레즈경험 +1');
    } else if (context.talents?.[122] === 1 && context.playerTalents?.[122] === 1) {
      // 양쪽 다 남성
      context.exp[41] = (context.exp[41] || 0) + 1;
      context.showMessage('호모경험 +1');
    }
  },
};
