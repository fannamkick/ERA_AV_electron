/**
 * COMF9 - 애널핥기 (Anal Licking / Rimming)
 * 원본: ERB/指導関係/COMF9.ERB
 *
 * 조교자가 대상의 항문을 입으로 자극하는 애무
 */

import type { CommandPlugin, TrainingContext } from '../../../../types/training';
import { SourceModifier } from '../../systems/SourceModifier';

/**
 * 경험치 레벨 계산
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
 * SOURCE 계산 헬퍼 함수
 * 원본: COMF9.ERB 라인 11-50
 */
function calculateAnalLickingSource(context: TrainingContext): number[] {
  const { target } = context;
  const abilities = target.abl;

  // A감각
  const aSense = abilities[3] || 0; // A감각

  // 기본 SOURCE 설정
  const source: number[] = new Array(19).fill(0);

  // A감각에 따른 쾌A 계산
  const aSenseValues = [
    5,    // 0
    50,   // 1
    200,  // 2
    500,  // 3
    1000, // 4
    1800, // 5
  ];

  source[2] = aSenseValues[Math.min(aSense, 5)];

  // LOSEBASE
  context.loseBase = context.loseBase || [];
  context.loseBase[0] = (context.loseBase[0] || 0) + 5; // 체력
  context.loseBase[1] = (context.loseBase[1] || 0) + 50; // 기력

  // 수간인 경우 여기서 종료 (SourceModifier 적용 전)
  const equipment = context.equipment || {};
  if (equipment[89]) {
    return source;
  }

  // 조교자의 혀놀림 소질 (TALENT:PLAYER:52) 또는 수간 - 2배
  const playerTalents = context.playerTalents || [];
  if (playerTalents[52] || equipment[89]) {
    source[2] *= 2.00;
    source[10] += Math.floor(source[2] / 20);
  }

  // SourceModifier로 소질/능력 보정 적용
  return SourceModifier.applyAll(source, context);
}

/**
 * 메시지 생성 헬퍼 함수
 * 원본: TRAIN_MESSAGE_B.ERB (애널핥기 관련 부분)
 */
function generateAnalLickingMessage(context: TrainingContext): string {
  const targetName = context.target.name;

  // 기본 메시지
  let msg = `${targetName}의 항문을 입으로 자극했다.`;

  // A경험에 따른 추가 메시지
  const exp = context.exp || [];
  const aExpLevel = getExpLevel(exp[1] || 0);
  if (aExpLevel === 0) {
    msg += ` ${targetName}은(는) 극심한 수치심으로 몸을 떨고 있다.`;
  } else if (aExpLevel >= 3) {
    msg += ` ${targetName}의 항문이 혀를 받아들이며 경련하고 있다.`;
  }

  // 혀놀림 소질
  const playerTalents = context.playerTalents || [];
  if (playerTalents[52]) {
    msg += ` 능숙한 혀놀림에 ${targetName}이(가) 신음을 흘렸다.`;
  }

  // 더러움 상태
  const stain = context.stain || [];
  const anusStain = stain[4] || 0;
  if (anusStain & 4) { // 정액
    msg += ` 항문에 묻은 정액이 혀에 닿는다.`;
  } else if (anusStain & 8) { // 항문 오염
    msg += ` 항문이 더럽혀져 있다.`;
  }

  return msg;
}

export const COMF9_analLicking: CommandPlugin = {
  id: 9,
  name: '애널핥기',
  category: '애무',
  staminaCost: 5,

  /**
   * 가용성 판정
   * 원본: COMABLE.ERB @COM_ABLE9
   */
  isAvailable: (context: TrainingContext) => {
    const equipment = context.equipment || {};
    const charFlags = context.charFlags || {};
    const stain = context.stain || [];
    const assiAbilities = context.assiAbilities || [];
    const assiTalents = context.assiTalents || [];

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

    // 항문이 정액/항문오염/소변으로 더러워져있고, 악취민감이며 종순3이하인 조수는 불가
    const dirtyAnus = (stain[4] && ((stain[4] & 4) || (stain[4] & 8) || (stain[4] & 32)));
    if (dirtyAnus && context.assiPlay) {
      const assiSubmission = assiAbilities[10] || 0;
      const assiSmellSensitive = assiTalents[62];
      const assiIgnoreDirty = assiTalents[64];

      if (assiSubmission <= 3 && assiSmellSensitive && !assiIgnoreDirty) {
        return false;
      }
    }

    return true;
  },

  /**
   * 커맨드 실행
   * 원본: COMF9.ERB 전체
   */
  async execute(context: TrainingContext): Promise<void> {
    const targetName = context.target.name;

    // 커맨드명 표시
    context.showMessage('애널핥기');

    // 메시지 생성 및 표시
    const message = generateAnalLickingMessage(context);
    context.showMessage(message);

    // 수간인 경우 A경험만 획득하고 종료
    const equipment = context.equipment || {};
    if (equipment[89]) {
      context.exp = context.exp || [];
      context.exp[1] = (context.exp[1] || 0) + 1;
      context.showMessage('A경험 +1');
      return;
    }

    // SOURCE 계산
    const source = calculateAnalLickingSource(context);

    // 더럽힘 처리: A ⇔ 조교자의 입
    context.stain = context.stain || [];
    context.playerStain = context.playerStain || [];
    context.stain[4] = (context.stain[4] || 0) | (context.playerStain[0] || 0); // 입 → A
    context.playerStain[0] = (context.playerStain[0] || 0) | (context.stain[4] || 0); // A → 입

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
    context.exp = context.exp || [];
    const playerTalents = context.playerTalents || [];

    // 레즈/호모 경험
    if (context.talents[122] === 0 && playerTalents[122] === 0) {
      // 양쪽 다 여성
      context.exp[40] = (context.exp[40] || 0) + 3;
      context.showMessage('레즈경험 +3');
    }

    // A경험
    context.exp[1] = (context.exp[1] || 0) + 1;
    context.showMessage('A경험 +1');

    // 첫 키스 기록 (항문 접촉도 포함)
    context.flags = context.flags || {};
    context.flags[620] = (context.flags[620] || 0) | 1; // TFLAG:620 비트 1 (첫 키스)
    context.flags[620] = (context.flags[620] || 0) | 4; // TFLAG:620 비트 4 (항문 키스)
  },
};
