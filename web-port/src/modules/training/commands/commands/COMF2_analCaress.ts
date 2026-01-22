/**
 * COMF2 - 애널애무 (Anal Caress)
 * 원본: ERB/指導関係/COMF2.ERB
 *
 * 조교자가 대상의 항문을 손으로 자극하는 애무
 * 새 구조 (SafeContext + CaressCommand) 적용
 */

import type { CommandPlugin, TrainingContext } from '../../../../types/training';
import { SafeContext } from '../../context/SafeContext';
import { generateMessage } from '../base/CaressCommand';
import { checkBasicAvailability, checkBottomNakedRequired, getExpLevel } from '../../utils/sourceCalculator';
import { STAIN_PART, STAIN_BITS } from '../../../../types/training';

/**
 * A감각별 기본 SOURCE 테이블
 */
const A_SENSE_VALUES = [
  { 쾌A: 20, 불쾌: 300 },
  { 쾌A: 75, 불쾌: 350 },
  { 쾌A: 300, 불쾌: 400 },
  { 쾌A: 700, 불쾌: 650 },
  { 쾌A: 1100, 불쾌: 1000 },
  { 쾌A: 1500, 불쾌: 1500 },
];

/**
 * A경험 레벨별 보정 테이블
 */
const A_EXP_MODIFIERS = [
  { 쾌배율: 0.20, 불쾌배율: 0.20, 고통: 500, 수치심보너스: 200 },
  { 쾌배율: 0.50, 불쾌배율: 0.50, 고통: 400, 수치심보너스: 100 },
  { 쾌배율: 1.00, 불쾌배율: 1.00, 고통: 300, 수치심보너스: 50 },
  { 쾌배율: 1.20, 불쾌배율: 1.20, 고통: 200, 수치심보너스: 0 },
  { 쾌배율: 1.60, 불쾌배율: 1.60, 고통: 100, 수치심보너스: 0 },
  { 쾌배율: 1.80, 불쾌배율: 1.80, 고통: 50, 수치심보너스: 0 },
];

/**
 * 윤활 레벨별 보정 테이블
 */
const LUB_MODIFIERS = [
  { 쾌배율: 0.10, 불쾌배율: 0.10, 고통배율: 3.00 },
  { 쾌배율: 0.20, 불쾌배율: 0.20, 고통배율: 2.00 },
  { 쾌배율: 0.60, 불쾌배율: 0.60, 고통배율: 1.00 },
  { 쾌배율: 1.00, 불쾌배율: 1.00, 고통배율: 0.50 },
  { 쾌배율: 2.00, 불쾌배율: 2.00, 고통배율: 0.10 },
];

/**
 * 욕정 레벨별 보정 테이블
 */
const LUST_MODIFIERS = [
  { 쾌배율: 0.30, 불쾌배율: 0.30 },
  { 쾌배율: 0.60, 불쾌배율: 0.60 },
  { 쾌배율: 1.00, 불쾌배율: 1.00 },
  { 쾌배율: 1.30, 불쾌배율: 1.30 },
  { 쾌배율: 1.60, 불쾌배율: 1.60 },
];

/**
 * 메시지 생성
 */
function generateAnalCaressMessage(safe: SafeContext): string {
  const aExpLevel = safe.getExpLevelByIndex(1); // A경험

  return generateMessage(safe, {
    baseMessage: `{name}의 항문을 손가락으로 자극했다.`,
    conditionalMessages: [
      {
        condition: () => aExpLevel === 0,
        message: `{name}은(는) 미숙한 항문으로 불쾌감을 느끼고 있다.`,
      },
      {
        condition: () => aExpLevel >= 3,
        message: `{name}의 항문이 익숙하게 손가락을 받아들인다.`,
      },
      {
        condition: (s) => s.getParamLevel(3) >= 3,
        message: `{name}의 항문에서 윤활액이 흘러나온다.`,
      },
    ],
  });
}

export const COMF2_analCaress: CommandPlugin = {
  id: 2,
  name: '애널애무',
  category: '애무',
  staminaCost: 20,

  /**
   * 가용성 판정
   * 원본: COMABLE.ERB @COM_ABLE2
   */
  isAvailable: (context: TrainingContext) => {
    const safe = new SafeContext(context);

    // 기본 불가 조건 (촉수, 슬라임, 삼각목마)
    if (!checkBasicAvailability(safe)) return false;

    // 하의 벗김 필요
    if (!checkBottomNakedRequired(safe)) return false;

    // 검은 스타킹 불가
    if (safe.getCharFlagByIndex(170) === 6 && safe.getCharFlagByIndex(173) === 0) {
      return false;
    }

    // 기저귀/즈코 인형 불가
    const cflag42 = safe.getCharFlagByIndex(42);
    const cflag40 = safe.getCharFlagByIndex(40);
    if ((cflag42 === 69 || cflag42 === 11) && (cflag40 & 64)) {
      return false;
    }

    // 항문이 더러워져있고, 악취민감이며 종순3이하인 조수는 불가
    const stain = context.stain || [];
    const dirtyAnus = stain[STAIN_PART.A] && (
      (stain[STAIN_PART.A] & STAIN_BITS.정액) ||
      (stain[STAIN_PART.A] & STAIN_BITS.항문오염) ||
      (stain[STAIN_PART.A] & STAIN_BITS.오줌)
    );

    if (dirtyAnus && safe.isAssistantPlay) {
      const assiAbilities = context.assiAbilities || [];
      const assiTalents = context.assiTalents || [];
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
   * 원본: COMF2.ERB 전체
   */
  async execute(context: TrainingContext): Promise<void> {
    const safe = new SafeContext(context);

    // 커맨드명 표시
    safe.message('애널애무');

    // 메시지 생성 및 표시
    safe.message(generateAnalCaressMessage(safe));

    // A감각 기반 기본 SOURCE
    const aSense = safe.getAbility('A감각');
    const senseData = A_SENSE_VALUES[Math.min(aSense, 5)];
    let pleasureA = senseData.쾌A;
    let discomfort = senseData.불쾌;

    // A경험 레벨에 따른 보정
    const aExp = safe.getExperience('A경험') || context.exp?.[1] || 0;
    const aExpLevel = getExpLevel(aExp);
    const expMod = A_EXP_MODIFIERS[Math.min(aExpLevel, 5)];

    pleasureA *= expMod.쾌배율;
    discomfort *= expMod.불쾌배율;
    let pain = expMod.고통;
    const shameBonus = expMod.수치심보너스;

    // LOSEBASE
    safe.addStaminaCost(20);
    safe.addWillpowerCost(100);

    // 윤활 레벨에 따른 보정
    const lubLevel = safe.getParamLevel(3);
    const lubMod = LUB_MODIFIERS[Math.min(lubLevel, 4)];
    pleasureA *= lubMod.쾌배율;
    discomfort *= lubMod.불쾌배율;
    pain *= lubMod.고통배율;

    // 욕정 레벨에 따른 보정
    const lustLevel = safe.getParamLevel(5);
    const lustMod = LUST_MODIFIERS[Math.min(lustLevel, 4)];
    pleasureA *= lustMod.쾌배율;
    discomfort *= lustMod.불쾌배율;

    // SOURCE 설정
    safe.addSource('쾌A', Math.floor(pleasureA));
    safe.addSource('불쾌', Math.floor(discomfort));
    safe.addSource('고통', Math.floor(pain));
    safe.addSource('수치심', shameBonus);

    // 수간인 경우 조기 종료
    if (safe.hasEquipment('수간')) {
      // A경험만 획득하고 종료
      safe.addExperienceByIndex(1, 1, 'A경험');
      return;
    }

    // A민감/둔감 보정 (고통, 불쾌, 수치심에 영향)
    if (safe.hasTalent('A둔감')) {
      safe.multiplySource('고통', 1.5);
      safe.multiplySource('불쾌', 1.5);
      safe.multiplySource('수치심', 1.5);
    } else if (safe.hasTalent('A민감')) {
      safe.multiplySource('고통', 0.6);
      safe.multiplySource('불쾌', 0.6);
      safe.multiplySource('수치심', 0.6);
    }

    // 처녀 + 정조관념
    if (safe.hasTalent('처녀') && safe.hasTalentByIndex(30)) {
      safe.multiplySource('불쾌', 0.8);
      safe.multiplySource('수치심', 0.5);
    }

    // 미숙함
    if (safe.hasTalentByIndex(135)) {
      safe.multiplySource('고통', 2.0);
    }

    // 더러움 처리: A ⇔ 조교자의 손
    if (safe.hasEquipment('촉수')) {
      // 촉수인 경우: A에 촉수의 더러움(애액, 정액) 부착
      safe.addStain('A', '애액');
      safe.addStain('A', '정액');
    } else {
      // 일반: A ⇔ 조교자의 손 더러움 이동
      safe.transferStainWithPlayer(STAIN_PART.A, 1); // 1 = 플레이어 손
    }

    // SOURCE 적용
    if (context.applySource) {
      context.applySource(safe.getSourceArray());
    } else {
      const sourceArray = safe.getSourceArray();
      context.params = context.params || [];
      for (let i = 0; i < sourceArray.length && i < context.params.length; i++) {
        context.params[i] = (context.params[i] || 0) + sourceArray[i];
      }
    }

    // A경험 획득 (A감각에 따라 1-4)
    let aExpGain = 1;
    if (aSense <= 1) aExpGain = 1;
    else if (aSense <= 4) aExpGain = 2;
    else if (aSense <= 7) aExpGain = 3;
    else aExpGain = 4;
    safe.addExperienceByIndex(1, aExpGain, 'A경험');

    // 레즈/호모 경험치
    safe.handleSexualOrientationExp(2, 5);

    // 애정경험 판정
    safe.checkAffectionExp(1);
  },
};
