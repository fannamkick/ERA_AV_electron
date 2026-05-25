/**
 * COMF6 - 키스한다
 * 원본: ERB/指導関係/COMF6.ERB
 *
 * 조교자가 대상의 입을 입으로 자극
 */

import type { CommandPlugin, TrainingContext } from '../../../../types/training';
import { KissHandler } from '../common/KissHandler';
import { SourceModifier } from '../../systems/SourceModifier';

/**
 * 파라미터 레벨 계산
 */
function getParamLevel(value: number): number {
  const thresholds = [0, 10000, 30000, 100000, 300000, 1000000, 3000000, 10000000];
  for (let i = thresholds.length - 1; i >= 0; i--) {
    if (value >= thresholds[i]) return i;
  }
  return 0;
}

/**
 * 더럽힘 계산 헬퍼 함수
 */
function calculateDirtiness(context: TrainingContext): number {
  let dirtiness = 0;

  const playerStain = context.playerStain || [];

  // 애액 (+1)
  if (playerStain[0] & 1) {
    dirtiness += 1;
  }
  // 정액 (+3)
  if (playerStain[0] & 4) {
    dirtiness += 3;
  }
  // 항문 (+7)
  if (playerStain[0] & 8) {
    dirtiness += 7;
  }
  // 모유 (+1)
  if (playerStain[0] & 16) {
    dirtiness += 1;
  }
  // 소변 (+3)
  if (playerStain[0] & 32) {
    dirtiness += 3;
  }

  // 수간이면 더럽힘 7 고정
  const equipment = context.equipment || {};
  if (equipment[89]) {
    dirtiness = 7;
  }

  // 악취둔감 (1/3)
  if (context.talents[61]) {
    dirtiness = Math.floor(dirtiness / 3);
  }

  // 악취민감 (2배)
  if (context.talents[62]) {
    dirtiness *= 2;
  }

  // 키스는 더럽힘 영향 절반
  dirtiness = Math.floor(dirtiness / 2);

  return dirtiness;
}

/**
 * 명령 실행 가능 여부 판정 (복잡한 계산식)
 * 원본: COMF6.ERB 라인 36-230
 */
function canExecute(context: TrainingContext): { canExecute: boolean; score: number; threshold: number; details: string[] } {
  let score = 0;
  const details: string[] = [];

  const dirtiness = calculateDirtiness(context);

  // 자동 성공 조건: 종순≥2 OR 봉사정신≥3 OR 애인
  const submission = context.abilities[10] || 0;
  const devotion = context.abilities[16] || 0;
  const isLover = context.talents[85];

  if (submission >= 2 || devotion >= 3 || isLover) {
    return { canExecute: true, score: 999, threshold: 15, details: ['자동 성공'] };
  }

  // === 점수 계산 시작 ===

  // COM_ORDER 공통 요소 (종순 기반)
  const orderBonus = submission * 3;
  if (orderBonus > 0) {
    score += orderBonus;
    details.push(`종순 LV${submission} (+${orderBonus})`);
  }

  // ABL:욕망
  const desire = context.abilities[11] || 0;
  if (desire > 0) {
    score += desire * 1;
    details.push(`욕망 LV${desire} (+${desire * 1})`);
  }

  // ABL:봉사정신
  if (devotion > 0) {
    score += devotion * 4;
    details.push(`봉사정신 LV${devotion} (+${devotion * 4})`);
  }

  // MARK:쾌락각인
  const marks = context.marks || [];
  const pleasureMark = marks[1] || 0;
  if (pleasureMark > 0) {
    score += pleasureMark * 2;
    details.push(`쾌락각인 LV${pleasureMark} (+${pleasureMark * 2})`);
  }

  // PALAM:욕정
  const params = context.params || [];
  const lustLevel = getParamLevel(params[5] || 0);
  if (lustLevel > 0) {
    score += lustLevel * 1;
    details.push(`욕정 LV${lustLevel} (+${lustLevel * 1})`);
  }

  // TALENT:수줍음 (-1)
  if (context.talents[35]) {
    score -= 1;
    details.push(`수줍음 (-1)`);
  }

  // TALENT:악취둔감 (+1)
  if (context.talents[61]) {
    score += 1;
    details.push(`악취둔감 (+1)`);
  }

  // TALENT:악취민감 (-1)
  if (context.talents[62]) {
    score -= 1;
    details.push(`악취민감 (-1)`);
  }

  // TALENT:헌신적 (+6)
  if (context.talents[63]) {
    score += 6;
    details.push(`헌신적 (+6)`);
  }

  // TALENT:쾌감을 부정 (-1)
  if (context.talents[71]) {
    score -= 1;
    details.push(`쾌감을 부정 (-1)`);
  }

  // TALENT:애인 주인 플레이 (+5)
  if (isLover && context.assiPlay === 0) {
    score += 5;
    details.push(`애인 (+5)`);
  }

  // 수간 (수간애호 없으면 -15)
  const equipment = context.equipment || {};
  if (equipment[89] && !context.talents[136]) {
    score -= 15;
    details.push(`수간 (-15)`);
  }

  // 더럽힘 페널티
  if (dirtiness > 0) {
    score -= dirtiness;
    details.push(`더러움 있음 (-${dirtiness})`);
  }

  const threshold = 15;
  const canExecute = score >= threshold;

  return { canExecute, score, threshold, details };
}

/**
 * SOURCE 계산 헬퍼 함수
 * 원본: COMF6.ERB 라인 240-354
 */
function calculateKissSource(context: TrainingContext): number[] {
  // 더럽힘 계산
  const dirtiness = calculateDirtiness(context);

  const devotion = context.abilities[16] || 0;
  const technique = context.abilities[12] || 0;
  const playerAbilities = context.playerAbilities || [];
  const playerTechnique = playerAbilities[12] || 0;

  const source: number[] = new Array(19).fill(0);

  // LOSEBASE
  context.loseBase = context.loseBase || [];
  context.loseBase[0] = (context.loseBase[0] || 0) + 5;
  context.loseBase[1] = (context.loseBase[1] || 0) + 50;

  // ABL:봉사정신 기반 SOURCE
  const devotionValues = [
    { 굴종: 50, 욕정: 10, 수치심배율: 4.00 },    // 0
    { 굴종: 150, 욕정: 50, 수치심배율: 2.50 },   // 1
    { 굴종: 200, 욕정: 100, 수치심배율: 1.50 },  // 2
    { 굴종: 250, 욕정: 180, 수치심배율: 1.00 },  // 3
    { 굴종: 300, 욕정: 300, 수치심배율: 0.50 },  // 4
    { 굴종: 350, 욕정: 500, 수치심배율: 0.10 },  // 5
  ];

  const devValue = devotionValues[Math.min(devotion, 5)];
  source[7] = devValue.굴종;
  source[8] = devValue.욕정;
  source[11] *= devValue.수치심배율;

  // ABL:기교 보정
  const techniqueMultiplier = [0.50, 0.80, 1.00, 1.50, 2.50, 4.00][Math.min(technique, 5)] || 1.0;
  source[7] *= techniqueMultiplier;
  source[8] *= techniqueMultiplier;

  // 수간인 경우 수간중독 판정
  const equipment = context.equipment || {};
  if (equipment[89]) {
    const bestialityAddiction = context.abilities[39] || 0;

    if (bestialityAddiction === 0) {
      source[11] *= 2.00;
    } else if (bestialityAddiction === 1) {
      source[11] *= 1.00;
    } else if (bestialityAddiction === 2) {
      source[11] *= 0.80;
      context.flags = context.flags || {};
      context.flags[100] = 1; // TFLAG:100
    } else if (bestialityAddiction === 3) {
      source[6] = 100;
      source[11] *= 0.50;
      context.flags = context.flags || {};
      context.flags[100] = 1;
    } else if (bestialityAddiction === 4) {
      source[6] = 300;
      source[8] += 100;
      source[11] *= 0.30;
      context.flags = context.flags || {};
      context.flags[100] = 1;
    } else {
      source[6] = 800;
      source[8] += 200;
      source[11] *= 0.10;
      context.flags = context.flags || {};
      context.flags[100] = 1;
    }

    // 수간이면 여기서 SOURCE 반환
    return SourceModifier.applyAll(source, context);
  }

  // 플레이어 ABL:기교 기반 윤활/욕정
  const playerTechValues = [
    { 윤활: 100, 욕정: 0 },
    { 윤활: 150, 욕정: 0 },
    { 윤활: 200, 욕정: 0 },
    { 윤활: 300, 욕정: 50 },
    { 윤활: 500, 욕정: 100 },
    { 윤활: 800, 욕정: 200 },
  ];

  const playerValue = playerTechValues[Math.min(playerTechnique, 5)];
  source[6] = playerValue.윤활;
  source[8] += playerValue.욕정;

  // TALENT:애인 보정
  if (context.talents[85]) {
    source[6] *= 2.00;
  }

  // SourceModifier로 소질/능력 보정 적용
  return SourceModifier.applyAll(source, context);
}

/**
 * 메시지 생성 헬퍼 함수
 * 원본: TRAIN_MESSAGE_B.ERB (키스 관련 부분)
 */
function generateKissMessage(context: TrainingContext): string {
  const targetName = context.target.name;

  let msg = `${targetName}에게 키스했다.`;

  // 플레이어 기교에 따른 메시지
  const playerAbilities = context.playerAbilities || [];
  const playerTechnique = playerAbilities[12] || 0;
  if (playerTechnique >= 3) {
    msg += ` 능숙한 키스에 ${targetName}의 몸이 녹아내린다.`;
  }

  // 애인 소질
  if (context.talents[85] && context.assiPlay === 0) {
    msg += ` ${targetName}이(가) 행복한 표정으로 키스에 응했다.`;
  }

  // 수간
  const equipment = context.equipment || {};
  if (equipment[89]) {
    msg += ` 개의 혀가 ${targetName}의 입 안을 휘젓는다.`;
  }

  return msg;
}

export const COMF6_kiss: CommandPlugin = {
  id: 6,
  name: '키스한다',
  category: '애무',
  staminaCost: 5,

  /**
   * 가용성 판정
   * 원본: COMABLE.ERB @COM_ABLE6
   */
  isAvailable: (context: TrainingContext) => {
    const stain = context.stain || [];
    const assiAbilities = context.assiAbilities || [];
    const assiTalents = context.assiTalents || [];
    const equipment = context.equipment || {};

    // 입이 애액/정액/항문/소변으로 더러워져있고, 악취민감이며 종순3이하인 조수는 불가
    const dirtyMouth = (stain[0] & 1) || (stain[0] & 4) ||
                       (stain[0] & 8) || (stain[0] & 32);
    if (dirtyMouth && context.assiPlay) {
      const assiSubmission = assiAbilities[10] || 0;
      const assiSmellSensitive = assiTalents[62];
      const assiIgnoreDirty = assiTalents[64];

      if (assiSubmission <= 3 && assiSmellSensitive && !assiIgnoreDirty) {
        return false;
      }
    }

    // 봉사 안함 소질
    if (context.talents[151]) return false;

    // 볼개그 착용중
    if (equipment[45]) return false;

    // 촉수 지도중
    if (equipment[90]) return false;

    // 슬라임 지도중
    if (equipment[150]) return false;

    // 안면기승 플레이중
    if (equipment[55]) return false;

    return true;
  },

  /**
   * 커맨드 실행
   * 원본: COMF6.ERB 전체
   */
  async execute(context: TrainingContext): Promise<void> {
    const targetName = context.target.name;

    // 첫 키스 확인
    const shouldProceed = await KissHandler.confirmFirstKiss(context);
    if (!shouldProceed) {
      return;
    }

    // 커맨드명 표시
    context.showMessage('키스한다');

    // 명령 실행 판정
    const execution = canExecute(context);

    // 판정 결과 표시
    context.showMessage(`실행 판정: ${execution.score} ${execution.score >= execution.threshold ? '≥' : '<'} ${execution.threshold}`);
    execution.details.forEach(detail => {
      context.showMessage(`  ${detail}`);
    });

    if (!execution.canExecute) {
      context.showMessage('실행할 수 없습니다.');
      return;
    }

    // 메시지 생성 및 표시
    const message = generateKissMessage(context);
    context.showMessage(message);

    // SOURCE 계산
    const source = calculateKissSource(context);

    // 더럽힘 처리: 입 ⇔ 조교자의 입
    context.stain = context.stain || [];
    context.playerStain = context.playerStain || [];
    context.stain[0] = (context.stain[0] || 0) | (context.playerStain[0] || 0);
    context.playerStain[0] = (context.playerStain[0] || 0) | (context.stain[0] || 0);

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
    } else if (context.talents[122] === 1 && playerTalents[122] === 1) {
      // 양쪽 다 남성
      context.exp[41] = (context.exp[41] || 0) + 3;
      context.showMessage('호모경험 +3');
    }

    // 애정경험
    let affectionExp = 1;

    // 애인이고 주인과의 키스면 +2
    if (context.talents[85] && context.assiPlay === 0) {
      affectionExp += 2;
    }

    const charFlags = context.charFlags || {};
    if (charFlags[2] >= 1000 && context.assiPlay === 0) {
      context.exp[23] = (context.exp[23] || 0) + affectionExp;
      context.showMessage(`애정경험 +${affectionExp}`);
    }

    // 첫 키스 플래그
    context.flags = context.flags || {};
    context.flags[621] = (context.flags[621] || 0) | 1; // TFLAG:621
    context.flags[620] = (context.flags[620] || 0) | 1; // TFLAG:620

    if (context.talents[122] || context.talents[121]) {
      context.flags[620] = (context.flags[620] || 0) | 2; // 남성 또는 후타나리
    }

    // 기타 플래그
    context.flags[100] = 1; // TFLAG:100

    // 호감도 상승 (주인 플레이)
    if (context.assiPlay === 0) {
      context.flags[30] = (context.flags[30] || 0) + 1;
    }
  },
};
