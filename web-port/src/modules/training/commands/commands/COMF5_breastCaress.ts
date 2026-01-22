/**
 * COMF5 - 가슴애무 (Breast Caress)
 * 원본: ERB/指導関係/COMF5.ERB
 *
 * 조교자가 대상의 유방을 손과 입으로 자극하는 애무
 * 새 구조 (SafeContext + CaressCommand) 적용
 */

import type { CommandPlugin, TrainingContext } from '../../../../types/training';
import { SafeContext } from '../../context/SafeContext';
import { generateMessage } from '../base/CaressCommand';
import { checkBasicAvailability, checkTopNakedRequired } from '../../utils/sourceCalculator';
import { STAIN_PART } from '../../../../types/training';

/**
 * B감각별 기본 SOURCE 테이블
 */
const B_SENSE_VALUES = [
  { 쾌B: 20, 욕정: 50 },
  { 쾌B: 100, 욕정: 100 },
  { 쾌B: 500, 욕정: 160 },
  { 쾌B: 1200, 욕정: 200 },
  { 쾌B: 2000, 욕정: 230 },
  { 쾌B: 2800, 욕정: 250 },
];

/**
 * 메시지 생성
 */
function generateBreastCaressMessage(safe: SafeContext): string {
  const bSense = safe.getAbility('B감각');

  return generateMessage(safe, {
    baseMessage: `{name}의 가슴을 손과 입으로 자극했다.`,
    conditionalMessages: [
      {
        condition: (s) => s.hasTalentByIndex(114), // 폭유
        message: `풍만한 유방이 손에 넘치도록 크다.`,
      },
      {
        condition: (s) => !s.hasTalentByIndex(114) && s.hasTalentByIndex(110), // 거유
        message: `큰 유방이 손 안에서 흔들린다.`,
      },
      {
        condition: (s) => s.hasTalentByIndex(109), // 빈유
        message: `작은 유방이 손 안에 들어온다.`,
      },
      {
        condition: () => bSense >= 4,
        message: `{name}의 젖꼭지가 민감하게 반응한다.`,
      },
      {
        condition: () => bSense === 0,
        message: `{name}은(는) 아직 가슴의 쾌감을 잘 느끼지 못하는 것 같다.`,
      },
      {
        condition: (s) => s.hasTalentByIndex(130), // 모유체질
        message: `자극하자 유두에서 모유가 흘러나온다.`,
      },
      {
        condition: (s) => s.hasPlayerTalent('혀놀림'),
        message: `능숙한 혀놀림에 {name}이(가) 몸을 떨었다.`,
      },
    ],
  });
}

/**
 * 모유체질 이벤트 체크
 * 원본: COMF5.ERB @EVENT_JUNYU (라인 135-152)
 */
async function checkLactationEvent(safe: SafeContext, context: TrainingContext): Promise<void> {
  // 모유체질 이미 보유
  if (safe.hasTalentByIndex(130)) return;

  // 작은체형
  if (safe.hasTalentByIndex(100)) return;

  // 빈유
  if (safe.hasTalentByIndex(109)) return;

  // 남성
  if (safe.hasTalent('남성')) return;

  // B감각 5 미만
  if (safe.getAbility('B감각') < 5) return;

  // 거유 또는 폭유가 아님
  if (!safe.hasTalentByIndex(110) && !safe.hasTalentByIndex(114)) return;

  // 촉수 또는 수간
  if (safe.hasEquipment('촉수') || safe.hasEquipment('수간')) return;

  // 조교자가 유치, 유아퇴행, 미숙함 중 하나가 아님
  if (!safe.hasPlayerTalentByIndex(132) && !safe.hasPlayerTalentByIndex(131) && !safe.hasPlayerTalentByIndex(135)) {
    return;
  }

  // 관계도 체크: 대상→조교자 관계 150 이상 또는 (주인 플레이 && 애인)
  const isLover = safe.hasTalentByIndex(85);
  const isMainPlay = !safe.isAssistantPlay;

  // 임시로 관계도 체크 생략 (관계도 시스템 구현 필요)
  const relation = 0;
  if (relation < 150 && !(isMainPlay && isLover)) return;

  // 모든 조건 만족 - 모유체질 획득
  const playerName = context.master?.name || '플레이어';
  safe.message(`${playerName}에게 유방을 빨리는 사이에, ${safe.targetName}은(는) 모유가 나오게 됐다…`);
  safe.setTalentByIndex(130, 1);
}

export const COMF5_breastCaress: CommandPlugin = {
  id: 5,
  name: '가슴애무',
  category: '애무',
  staminaCost: 5,

  /**
   * 가용성 판정
   * 원본: COMABLE.ERB @COM_ABLE5
   */
  isAvailable: (context: TrainingContext) => {
    const safe = new SafeContext(context);

    // 기본 불가 조건 (촉수, 슬라임, 삼각목마)
    if (!checkBasicAvailability(safe)) return false;

    // 상의 벗김 필요
    if (!checkTopNakedRequired(safe)) return false;

    // 검은 스타킹 불가
    if (safe.getCharFlagByIndex(170) === 6 && safe.getCharFlagByIndex(173) === 0) {
      return false;
    }

    // 특수의상 착용 불가
    const cflag42 = safe.getCharFlagByIndex(42);
    const cflag40 = safe.getCharFlagByIndex(40);
    if (cflag42 > 0 && (cflag40 & 64)) {
      return false;
    }

    return true;
  },

  /**
   * 커맨드 실행
   * 원본: COMF5.ERB 전체
   */
  async execute(context: TrainingContext): Promise<void> {
    const safe = new SafeContext(context);

    // 커맨드명 표시
    safe.message('가슴애무');

    // 메시지 생성 및 표시
    safe.message(generateBreastCaressMessage(safe));

    // B감각 기반 SOURCE
    const bSense = safe.getAbility('B감각');
    const senseData = B_SENSE_VALUES[Math.min(bSense, B_SENSE_VALUES.length - 1)];
    safe.addSource('쾌B', senseData.쾌B);
    safe.addPalam('욕정', senseData.욕정);

    // LOSEBASE
    safe.addStaminaCost(5);
    safe.addWillpowerCost(50);

    // 수간인 경우 조기 종료
    if (safe.hasEquipment('수간')) {
      return;
    }

    // 조교자가 유아퇴행 - 1.2배
    if (safe.hasPlayerTalentByIndex(131)) {
      safe.multiplySource('쾌B', 1.2);
      safe.multiplyPalam('욕정', 1.2);
    }

    // 조교자가 유치 - 1.2배
    if (safe.hasPlayerTalentByIndex(132)) {
      safe.multiplySource('쾌B', 1.2);
      safe.multiplyPalam('욕정', 1.2);
    }

    // 더러움 처리
    if (safe.hasEquipment('촉수')) {
      // 촉수인 경우: B에 촉수의 더러움(애액, 정액) 부착
      safe.addStain('가슴', '애액');
      safe.addStain('가슴', '정액');
    } else {
      // B의 더러움이 없거나, 애액/모유만 있거나, 조수 조교이거나, 불결무시 소질이 있으면 입 사용
      const breastStain = safe.getStainByIndex(STAIN_PART.가슴);
      const cleanOrMild = breastStain < 2 || breastStain === 16 || breastStain === 17;
      const canUseMouth = cleanOrMild || safe.isAssistantPlay || safe.hasPlayerTalentByIndex(64);

      if (canUseMouth) {
        // 혀놀림 소질 - 습득 보너스
        if (safe.hasPlayerTalent('혀놀림')) {
          safe.addPalam('습득', Math.floor(safe.getSource('쾌B') / 20));
        }

        // B ⇔ 조교자의 입 더러움 이동
        safe.transferStainWithPlayer(STAIN_PART.가슴, 0); // 0 = 플레이어 입
      }

      // B ⇔ 조교자의 손 더러움 이동 (항상)
      safe.transferStainWithPlayer(STAIN_PART.가슴, 1); // 1 = 플레이어 손
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

    // 레즈/호모 경험치
    safe.handleSexualOrientationExp(5, 5);

    // 애무경험
    safe.addExperience('애무경험', 2);

    // 애정경험 판정
    safe.checkAffectionExp(1);

    // 모유체질 이벤트 체크
    await checkLactationEvent(safe, context);
  },
};
