import { CommandPlugin, TrainingContext } from '../../types';

/**
 * COMF143 - 가슴구멍 (Breast Hole)
 * 원본: ERB/指導関係/COMF143.ERB (460 lines)
 *
 * 가슴구멍 insertion command with conditional availability.
 * Requires TALENT:PLAYER:160 == 0 (player not having breast hole) OR TALENT:151 (target having breast hole).
 */
export const COMF143_breastHole: CommandPlugin = {
  id: 143,
  name: '가슴구멍',
  category: '특수',
  staminaCost: 200,

  isAvailable(context: TrainingContext): boolean {
    // 원본: COMF143.ERB @COM143 (라인 11-194)

    // 조건: TALENT:PLAYER:160 == 0 || TALENT:151
    // (플레이어가 가슴구멍이 없거나 타겟이 가슴구멍을 가진 경우)
    const playerBreastHole = context.playerTalents[160] || 0;
    const targetBreastHole = context.talents[151] || 0;

    if (playerBreastHole !== 0 && targetBreastHole !== 1) {
      return false; // "가슴구멍이 필요합니다"
    }

    let score = 0;

    // CALL COM_ORDER (공통 명령 체크)
    // 여기서는 간소화하여 생략

    // ABL:욕망 (라인 19-27)
    const abl11 = context.abilities[11] || 0;
    score += abl11 * 1;

    // ABL:봉사정신 (라인 28-36)
    const abl16 = context.abilities[16] || 0;
    score += abl16 * 4;

    // ABL:정액중독 (라인 37-45)
    const abl32 = context.abilities[32] || 0;
    score += abl32 * 3;

    // MARK:1 (라인 47-54)
    const mark1 = context.marks?.[1] || 0;
    score += mark1 * 1;

    // PALAM:욕정 (라인 57-78)
    const palam5 = context.params[5] || 0;
    const palamlv1 = context.palamlv?.[1] || 1000;
    const palamlv2 = context.palamlv?.[2] || 3000;
    const palamlv3 = context.palamlv?.[3] || 10000;
    const palamlv4 = context.palamlv?.[4] || 30000;
    const palamlv5 = context.palamlv?.[5] || 100000;

    let palamLevel = 0;
    if (palam5 < palamlv1) {
      palamLevel = 0;
    } else if (palam5 < palamlv2) {
      palamLevel = 1;
    } else if (palam5 < palamlv3) {
      palamLevel = 2;
    } else if (palam5 < palamlv4) {
      palamLevel = 3;
    } else if (palam5 < palamlv5) {
      palamLevel = 4;
    } else {
      palamLevel = 5;
    }
    score += palamLevel * 1;

    // 수줍음 (라인 80-87)
    if (context.talents[35] === 1) {
      score -= 1;
    }

    // 악취둔감 (라인 88-96)
    if (context.talents[61] === 1) {
      score += 1;
    }

    // 악취민감 (라인 97-104)
    if (context.talents[62] === 1) {
      score -= 3;
    }

    // 헌신적 (라인 105-113)
    if (context.talents[63] === 1) {
      score += 6;
    }

    // 쾌감을 부정 (라인 114-121)
    if (context.talents[71] === 1) {
      score -= 1;
    }

    // 愛 (라인 122-130)
    const assiPlay = context.assiPlay || 0;
    if (context.talents[85] === 1 && assiPlay === 0) {
      score += 5;
    }

    // 調教者が후타나리 (라인 132-140)
    if (context.playerTalents[121] === 1) {
      score += 8;
    }

    // 더러움 계산 (라인 142-173)
    let dirty = 0;
    const playerStain = context.playerStain || [];

    // 愛液の汚れ (비트 0)
    if ((playerStain[2] || 0) & 1) {
      dirty += 1;
    }

    // 精液の汚れ (비트 2)
    if ((playerStain[2] || 0) & 4) {
      dirty += 3;
    }

    // アナルの汚れ (비트 3, 4)
    if ((playerStain[2] || 0) & 8) {
      dirty += 7;
    }
    if ((playerStain[2] || 0) & 16) {
      dirty += 15;
    }

    // 汚れあり
    if (dirty > 0) {
      score -= dirty;
    }

    // 실행치 45 이상 필요 (라인 179-193)
    const threshold = 45;
    if (score < threshold) {
      return false; // "실행치가 부족합니다"
    }

    return true;
  },

  async execute(context: TrainingContext): Promise<void> {
    // 원본: COMF143.ERB @COM143 (라인 195-460)

    context.showMessage('가슴구멍');
    context.saveStr[0] = '가슴구멍';
    // CALL TRAIN_MESSAGE_B

    // -------------------------------------------------
    // 사정게이지チェック (라인 203-283)
    // -------------------------------------------------
    let ejacGauge = 0;

    // ABL:기교をみる (라인 207-220)
    const abl12 = context.abilities[12] || 0;
    if (abl12 === 0) {
      ejacGauge = 1200;
    } else if (abl12 === 1) {
      ejacGauge = 1700;
    } else if (abl12 === 2) {
      ejacGauge = 2300;
    } else if (abl12 === 3) {
      ejacGauge = 3000;
    } else if (abl12 === 4) {
      ejacGauge = 3600;
    } else {
      ejacGauge = 4200;
    }

    // ABL:従順をみる (라인 222-235)
    const abl10 = context.abilities[10] || 0;
    if (abl10 === 0) {
      ejacGauge = Math.floor(ejacGauge * 0.80);
    } else if (abl10 === 1) {
      ejacGauge = Math.floor(ejacGauge * 0.90);
    } else if (abl10 === 2) {
      ejacGauge = Math.floor(ejacGauge * 1.00);
    } else if (abl10 === 3) {
      ejacGauge = Math.floor(ejacGauge * 1.10);
    } else if (abl10 === 4) {
      ejacGauge = Math.floor(ejacGauge * 1.20);
    } else {
      ejacGauge = Math.floor(ejacGauge * 1.30);
    }

    // ABL:봉사정신をみる (라인 237-250)
    const abl16 = context.abilities[16] || 0;
    if (abl16 === 0) {
      ejacGauge = Math.floor(ejacGauge * 0.50);
    } else if (abl16 === 1) {
      ejacGauge = Math.floor(ejacGauge * 0.80);
    } else if (abl16 === 2) {
      ejacGauge = Math.floor(ejacGauge * 1.20);
    } else if (abl16 === 3) {
      ejacGauge = Math.floor(ejacGauge * 1.50);
    } else if (abl16 === 4) {
      ejacGauge = Math.floor(ejacGauge * 1.80);
    } else {
      ejacGauge = Math.floor(ejacGauge * 2.40);
    }

    // ABL:정액중독をみる (라인 252-265)
    const abl32 = context.abilities[32] || 0;
    if (abl32 === 0) {
      ejacGauge = Math.floor(ejacGauge * 1.00);
    } else if (abl32 === 1) {
      ejacGauge = Math.floor(ejacGauge * 1.20);
    } else if (abl32 === 2) {
      ejacGauge = Math.floor(ejacGauge * 1.30);
    } else if (abl32 === 3) {
      ejacGauge = Math.floor(ejacGauge * 1.50);
    } else if (abl32 === 4) {
      ejacGauge = Math.floor(ejacGauge * 1.70);
    } else {
      ejacGauge = Math.floor(ejacGauge * 2.00);
    }

    // プレイヤーのABL:C感覚をみる (라인 267-280)
    const playerAbl0 = context.playerAbilities?.[0] || 0;
    if (playerAbl0 === 0) {
      ejacGauge = Math.floor(ejacGauge * 1.00);
    } else if (playerAbl0 === 1) {
      ejacGauge = Math.floor(ejacGauge * 1.50);
    } else if (playerAbl0 === 2) {
      ejacGauge = Math.floor(ejacGauge * 2.00);
    } else if (playerAbl0 === 3) {
      ejacGauge = Math.floor(ejacGauge * 2.50);
    } else if (playerAbl0 === 4) {
      ejacGauge = Math.floor(ejacGauge * 3.50);
    } else {
      ejacGauge = Math.floor(ejacGauge * 5.00);
    }

    // BASE:PLAYER:2 업데이트 (라인 282-283)
    if (context.playerTalents[121] === 1 || context.playerTalents[122] === 1) {
      if (!context.playerBase) {
        context.playerBase = [];
      }
      context.playerBase[2] = (context.playerBase[2] || 0) + ejacGauge;
    }

    // -------------------------------------------------
    // ソースの計算 (라인 286-353)
    // -------------------------------------------------
    const source: Record<string, number> = {};

    // TALENT:78에 따라 LOSEBASE 다름 (라인 289-295)
    if (context.talents[78] === 1) {
      context.loseBase = context.loseBase || [];
      context.loseBase[1] = (context.loseBase[1] || 0) + 100;
      context.loseBase[1] = (context.loseBase[1] || 0) + 70; // 라인 291 중복 (원본 버그)
    } else {
      context.loseBase = context.loseBase || [];
      context.loseBase[0] = (context.loseBase[0] || 0) + 200;
      context.loseBase[1] = (context.loseBase[1] || 0) + 150;
    }

    source[6] = 200;
    source[13] = 1500;
    source[14] = 500;
    source[16] = 500;

    // 더러움 계산 (라인 303-304)
    let dirty = 0;
    const playerStain = context.playerStain || [];

    // 愛液の汚れ
    if ((playerStain[2] || 0) & 1) {
      dirty += 1;
    }
    // 精液の汚れ
    if ((playerStain[2] || 0) & 4) {
      dirty += 3;
    }
    // アナルの汚れ
    if ((playerStain[2] || 0) & 8) {
      dirty += 7;
    }
    if ((playerStain[2] || 0) & 16) {
      dirty += 15;
    }

    source[8] = dirty * 40 + 100;

    // ABL:봉사정신をみる (라인 306-331)
    if (abl16 === 0) {
      source[4] = 420;
      source[5] = 150;
      source[8] = Math.floor(source[8] * 4.00);
    } else if (abl16 === 1) {
      source[4] = 500;
      source[5] = 300;
      source[8] = Math.floor(source[8] * 2.50);
    } else if (abl16 === 2) {
      source[4] = 580;
      source[5] = 600;
      source[8] = Math.floor(source[8] * 1.50);
    } else if (abl16 === 3) {
      source[4] = 660;
      source[5] = 900;
      source[8] = Math.floor(source[8] * 1.00);
    } else if (abl16 === 4) {
      source[4] = 740;
      source[5] = 1500;
      source[8] = Math.floor(source[8] * 0.50);
    } else {
      source[4] = 820;
      source[5] = 2200;
      source[8] = Math.floor(source[8] * 0.10);
    }

    // ABL:기교をみる (라인 334-353)
    if (abl12 === 0) {
      source[4] = Math.floor(source[4] * 0.50);
      source[5] = Math.floor(source[5] * 0.50);
    } else if (abl12 === 1) {
      source[4] = Math.floor(source[4] * 0.80);
      source[5] = Math.floor(source[5] * 0.80);
    } else if (abl12 === 2) {
      source[4] = Math.floor(source[4] * 1.00);
      source[5] = Math.floor(source[5] * 1.00);
    } else if (abl12 === 3) {
      source[4] = Math.floor(source[4] * 1.20);
      source[5] = Math.floor(source[5] * 1.20);
    } else if (abl12 === 4) {
      source[4] = Math.floor(source[4] * 1.50);
      source[5] = Math.floor(source[5] * 1.50);
    } else {
      source[4] = Math.floor(source[4] * 2.00);
      source[5] = Math.floor(source[5] * 2.00);
    }

    // -------------------------------------------------
    // 사정チェック (라인 356-434)
    // -------------------------------------------------
    const basePlayer2 = context.playerBase?.[2] || 0;
    const maxBasePlayer2 = context.playerMaxBase?.[2] || 10000;

    let ejacLevel = 0;
    if (basePlayer2 > maxBasePlayer2 * 2) {
      ejacLevel = 2;
    } else if (basePlayer2 > maxBasePlayer2) {
      ejacLevel = 1;
    }

    if (ejacLevel >= 1) {
      // 사정している (라인 371-400)
      source[4] = Math.floor(source[4] * 3.00);

      // ABL:정액중독をみる (라인 374-399)
      if (abl32 === 0) {
        source[7] = 0;
        source[5] = Math.floor(source[5] * 2.00);
        source[13] = Math.floor(source[13] * 4.00);
      } else if (abl32 === 1) {
        source[7] = 500;
        source[5] = Math.floor(source[5] * 3.00);
        source[13] = Math.floor(source[13] * 3.00);
      } else if (abl32 === 2) {
        source[7] = 1200;
        source[5] = Math.floor(source[5] * 4.00);
        source[13] = Math.floor(source[13] * 2.50);
      } else if (abl32 === 3) {
        source[7] = 3000;
        source[5] = Math.floor(source[5] * 6.00);
        source[13] = Math.floor(source[13] * 2.00);
      } else if (abl32 === 4) {
        source[7] = 6000;
        source[5] = Math.floor(source[5] * 9.00);
        source[13] = Math.floor(source[13] * 1.50);
      } else {
        source[7] = 12000;
        source[5] = Math.floor(source[5] * 15.00);
        source[13] = Math.floor(source[13] * 1.00);
      }
    }

    // 대량사정 (라인 402-418)
    if (ejacLevel === 2) {
      source[7] = Math.floor(source[7] * 2.00);
      source[5] = Math.floor(source[5] * 1.50);

      context.exp = context.exp || [];
      if (!context.playerExp) {
        context.playerExp = [];
      }
      context.playerExp[3] = (context.playerExp[3] || 0) + 2;
      context.exp[20] = (context.exp[20] || 0) + 9;

      context.showMessage('대량사정⚡');
      context.showMessage('정액경험 +9');

      // 精液汚れ
      context.playerStain = context.playerStain || [];
      context.playerStain[2] = (context.playerStain[2] || 0) | 4;

      if (!context.playerBase) {
        context.playerBase = [];
      }
      context.playerBase[2] = (context.playerBase[2] || 0) - maxBasePlayer2 * 2;
      if (context.playerBase[2] >= maxBasePlayer2) {
        context.playerBase[2] = maxBasePlayer2 - 1;
      }
    }
    // 通常の사정 (라인 419-433)
    else if (ejacLevel === 1) {
      if (!context.playerExp) {
        context.playerExp = [];
      }
      context.playerExp[3] = (context.playerExp[3] || 0) + 1;
      context.exp = context.exp || [];
      context.exp[20] = (context.exp[20] || 0) + 3;

      context.showMessage('사정⚡');
      context.showMessage('정액경험 +3');

      // 精液汚れ
      context.playerStain = context.playerStain || [];
      context.playerStain[2] = (context.playerStain[2] || 0) | 4;

      if (!context.playerBase) {
        context.playerBase = [];
      }
      context.playerBase[2] = (context.playerBase[2] || 0) - maxBasePlayer2;
      if (context.playerBase[2] >= maxBasePlayer2) {
        context.playerBase[2] = maxBasePlayer2 - 1;
      }
    }

    // 레즈/호모 경험 (라인 436-444)
    if (context.talents[122] === 0 && context.playerTalents[122] === 0) {
      context.showMessage('레즈경험 +7');
      context.exp = context.exp || [];
      context.exp[40] = (context.exp[40] || 0) + 7;
    } else if (context.talents[122] === 1 && context.playerTalents[122] === 1) {
      context.showMessage('호모경험 +7');
      context.exp = context.exp || [];
      context.exp[41] = (context.exp[41] || 0) + 7;
    }

    // TFLAG:30 업데이트 (라인 446-447)
    const assiPlay = context.assiPlay || 0;
    const exp0 = context.exp[0] || 0;
    const explv3 = context.explv?.[3] || 10000;
    if (assiPlay === 0 && exp0 >= explv3) {
      context.tflags = context.tflags || [];
      context.tflags[30] = (context.tflags[30] || 0) + 1;
    }

    // 調教者が후타나리 (라인 449-452)
    if (context.playerTalents[121] === 1) {
      source[13] = Math.floor(source[13] / 2);
    }

    // TFLAG:100 = 1 (라인 454)
    context.tflags = context.tflags || [];
    context.tflags[100] = 1;

    // 굴복각인2に相当 (라인 456-457)
    context.tflags[200] = 2;

    // SOURCE 적용
    for (const [key, value] of Object.entries(source)) {
      const numKey = parseInt(key);
      if (!isNaN(numKey)) {
        context.source = context.source || [];
        context.source[numKey] = (context.source[numKey] || 0) + value;
      }
    }

    context.showMessage('가슴구멍 완료');
  }
};
