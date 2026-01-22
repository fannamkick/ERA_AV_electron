import { CommandPlugin, TrainingContext } from '../../types';

/**
 * COMF141 - 나이즈리 (Naizuri - Breast Sex)
 * 원본: ERB/指導関係/COMF141.ERB (508 lines)
 *
 * 奉仕系コマンド: 調教対象が調教者의 페니스를 乳房で刺激
 */
export const COMF141_naizuri: CommandPlugin = {
  id: 141,
  name: '나이즈리',
  category: '봉사',
  staminaCost: 10,

  isAvailable(context: TrainingContext): boolean {
    // 원본: COMF141.ERB 라인 22-217
    // @COM_ABLE141이 원본에 없으므로 직접 isAvailable 체크 구현

    let A = 0;
    let S = 0;

    // CALL COM_ORDER (라인 27)

    // ABL:욕망 (라인 30-37)
    const abl11 = context.abilities[11] || 0;
    if (abl11) {
      A += abl11 * 1;
      S = 1;
    }

    // ABL:봉사정신 (라인 39-46)
    const abl16 = context.abilities[16] || 0;
    if (abl16) {
      A += abl16 * 4;
      S = 1;
    }

    // ABL:정액중독 (라인 48-55)
    const abl32 = context.abilities[32] || 0;
    if (abl32) {
      A += abl32 * 3;
      S = 1;
    }

    // 쾌락각인 (라인 58-65)
    const mark1 = context.marks?.[1] || 0;
    if (mark1) {
      A += mark1 * 1;
      S = 1;
    }

    // PALAM:욕정 (라인 69-89)
    const palam5 = context.params[5] || 0;
    const palamlv1 = context.palamlv?.[1] || 1000;
    const palamlv2 = context.palamlv?.[2] || 3000;
    const palamlv3 = context.palamlv?.[3] || 10000;
    const palamlv4 = context.palamlv?.[4] || 30000;
    const palamlv5 = context.palamlv?.[5] || 100000;

    let L = 0;
    if (palam5 < palamlv1) {
      L = 0;
    } else if (palam5 < palamlv2) {
      L = 1;
    } else if (palam5 < palamlv3) {
      L = 2;
    } else if (palam5 < palamlv4) {
      L = 3;
    } else if (palam5 < palamlv5) {
      L = 4;
    } else {
      L = 5;
    }
    if (L) {
      A += L * 1;
      S = 1;
    }

    // 수줍음 (라인 92-98)
    if (context.talents[35] === 1) {
      A -= 3;
      S = 1;
    }

    // 악취둔감 (라인 100-107)
    if (context.talents[61] === 1) {
      A += 1;
      S = 1;
    }

    // 악취민감 (라인 109-115)
    if (context.talents[62] === 1) {
      A -= 3;
      S = 1;
    }

    // 헌신적 (라인 117-124)
    if (context.talents[63] === 1) {
      A += 6;
      S = 1;
    }

    // 쾌감을 부정 (라인 126-132)
    if (context.talents[71] === 1) {
      A -= 3;
      S = 1;
    }

    // 남성혐오 (라인 134-140)
    if (context.talents[82] === 1 && context.playerTalents?.[122] === 1) {
      A -= 12;
      S = 1;
    }

    // 愛 (라인 142-149)
    if (context.talents[85] === 1 && (context.assiPlay || 0) === 0) {
      A += 5;
      S = 1;
    }

    // 調教者が후타나리 (라인 151-158)
    if (context.playerTalents?.[121] === 1) {
      A += 8;
      S = 1;
    }

    // 더러움 계산 (라인 160-197)
    let Y = 0;
    const playerStain2 = context.playerStain?.[2] || 0;
    const playerStain4 = context.playerStain?.[4] || 0;

    // 愛液の汚れ
    if (playerStain2 & 1) Y += 1;
    // 精液の汚れ
    if (playerStain2 & 4) Y += 3;
    // アナルの汚れ
    if (playerStain2 & 8) Y += 7;
    // 모유の汚れ
    if (playerStain2 & 16) Y += 1;
    // 尿の汚れ
    if (playerStain4 & 32) Y += 3;

    if (context.talents[61] === 1) {
      Y = Math.floor(Y / 3);
    }
    if (context.talents[62] === 1) {
      Y *= 2;
    }

    // 汚れあり
    if (Y) {
      A -= Y;
      S = 1;
    }

    // 合計を表示(30以상で実行) (라인 199-217)
    const V = 30;
    if (A < V) {
      return false;
    }

    return true;
  },

  async execute(context: TrainingContext): Promise<void> {
    // 원본: COMF141.ERB @COM141 (라인 1-508)

    // 前回と今回の調教者が同じ (라인 8-15)
    const assiPlay = context.assiPlay || 0;
    const tflag50 = context.tflags?.[50] || 0;
    const prevCom = context.prevCom || 0;

    if ((assiPlay === 1 && tflag50 !== 0) || (assiPlay === 0 && tflag50 === 0)) {
      // 前回の調교がフェラか딥스로트か수음펠라か펠라자위か바큠펠라だと파이즈리펠라に
      if (prevCom === 31 || prevCom === 124 || prevCom === 125 || prevCom === 126 || prevCom === 127) {
        // CALL COM_ABLE123
        // SIF RESULT == 1
        //   JUMP COM123
        context.showMessage('[COM123으로 파생 체크]');
        // 실제로는 COM_ABLE123을 호출하여 RESULT가 1이면 COM123으로 점프
        // 여기서는 표시만
      }
    }

    context.showMessage('나이즈리');
    context.saveStr = context.saveStr || [];
    context.saveStr[0] = '나이즈리';
    // CALL TRAIN_MESSAGE_B

    // -------------------------------------------------
    // ソースの計算 (라인 222-308)
    // -------------------------------------------------

    // LOSEBASE (라인 225-231)
    context.loseBase = context.loseBase || [];
    if (context.talents[47] === 1) {
      context.loseBase[0] = (context.loseBase[0] || 0) + 20;
      context.loseBase[1] = (context.loseBase[1] || 0) + 80;
    } else {
      context.loseBase[0] = (context.loseBase[0] || 0) + 10;
      context.loseBase[1] = (context.loseBase[1] || 0) + 150;
    }

    const source: Record<number, number> = {};

    source[13] = 1800;
    source[14] = 900;

    // ABL:봉사정신をみる (라인 236-261)
    const abl16 = context.abilities[16] || 0;
    if (abl16 === 0) {
      source[4] = 420;
      source[5] = 150;
      source[8] = 400;
    } else if (abl16 === 1) {
      source[4] = 500;
      source[5] = 300;
      source[8] = 300;
    } else if (abl16 === 2) {
      source[4] = 580;
      source[5] = 600;
      source[8] = 150;
    } else if (abl16 === 3) {
      source[4] = 660;
      source[5] = 900;
      source[8] = 50;
    } else if (abl16 === 4) {
      source[4] = 740;
      source[5] = 1500;
      source[8] = 20;
    } else {
      source[4] = 820;
      source[5] = 2200;
      source[8] = 0;
    }

    // ABL:B感覚をみる (라인 263-276)
    const abl1 = context.abilities[1] || 0;
    let A = 0;
    if (abl1 === 0) {
      A = 100;
    } else if (abl1 === 1) {
      A = 200;
    } else if (abl1 === 2) {
      A = 400;
    } else if (abl1 === 3) {
      A = 800;
    } else if (abl1 === 4) {
      A = 1200;
    } else {
      A = 1500;
    }

    // 절벽 (라인 278-281)
    if (context.talents[116] === 1) {
      A = Math.floor(A * 1.20);
    }

    // TALENT:108 (절벽) / TALENT:107 (빈유) (라인 282-286)
    if (context.talents[108] === 1) {
      A = Math.floor(A * 1.20);
    } else if (context.talents[107] === 1) {
      A = Math.floor(A * 0.70);
    }

    source[17] = (source[17] || 0) + A;

    // ABL:기교をみる (라인 289-308)
    const abl12 = context.abilities[12] || 0;
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
    // 사정게이지チェック (라인 310-395)
    // -------------------------------------------------
    let B = 0;

    // ABL:기교をみる (라인 315-328)
    if (abl12 === 0) {
      B = 1500;
    } else if (abl12 === 1) {
      B = 2100;
    } else if (abl12 === 2) {
      B = 2900;
    } else if (abl12 === 3) {
      B = 3500;
    } else if (abl12 === 4) {
      B = 4500;
    } else {
      B = 6000;
    }

    // ABL:従順をみる (라인 330-343)
    const abl10 = context.abilities[10] || 0;
    if (abl10 === 0) {
      B = Math.floor(B * 0.80);
    } else if (abl10 === 1) {
      B = Math.floor(B * 0.90);
    } else if (abl10 === 2) {
      B = Math.floor(B * 1.00);
    } else if (abl10 === 3) {
      B = Math.floor(B * 1.10);
    } else if (abl10 === 4) {
      B = Math.floor(B * 1.20);
    } else {
      B = Math.floor(B * 1.30);
    }

    // ABL:봉사기술をみる (라인 345-358)
    const abl13 = context.abilities[13] || 0;
    if (abl13 === 0) {
      B = Math.floor(B * 0.50);
    } else if (abl13 === 1) {
      B = Math.floor(B * 0.80);
    } else if (abl13 === 2) {
      B = Math.floor(B * 1.20);
    } else if (abl13 === 3) {
      B = Math.floor(B * 1.50);
    } else if (abl13 === 4) {
      B = Math.floor(B * 1.80);
    } else {
      B = Math.floor(B * 2.40);
    }

    // ABL:정액중독をみる (라인 360-373)
    const abl32 = context.abilities[32] || 0;
    if (abl32 === 0) {
      B = Math.floor(B * 0.80);
    } else if (abl32 === 1) {
      B = Math.floor(B * 0.90);
    } else if (abl32 === 2) {
      B = Math.floor(B * 1.00);
    } else if (abl32 === 3) {
      B = Math.floor(B * 1.10);
    } else if (abl32 === 4) {
      B = Math.floor(B * 1.20);
    } else {
      B = Math.floor(B * 1.30);
    }

    // TALENT:혀놀림をみる (라인 375-377)
    if (context.talents[52] === 1) {
      B = Math.floor(B * 2.00);
    }

    // プレイヤーのABL:C感覚をみる (라인 379-392)
    const playerAbl0 = context.playerAbilities?.[0] || 0;
    if (playerAbl0 === 0) {
      B = Math.floor(B * 1.00);
    } else if (playerAbl0 === 1) {
      B = Math.floor(B * 1.50);
    } else if (playerAbl0 === 2) {
      B = Math.floor(B * 2.00);
    } else if (playerAbl0 === 3) {
      B = Math.floor(B * 2.50);
    } else if (playerAbl0 === 4) {
      B = Math.floor(B * 3.50);
    } else {
      B = Math.floor(B * 5.00);
    }

    // BASE:PLAYER:2에 추가 (라인 394-395)
    if (context.playerTalents?.[121] === 1 || context.playerTalents?.[122] === 1) {
      if (!context.playerBase) {
        context.playerBase = [];
      }
      context.playerBase[2] = (context.playerBase[2] || 0) + B;
    }

    // -------------------------------------------------
    // 사정チェック (라인 397-460)
    // -------------------------------------------------
    const S = context.playerBase?.[2] || 0;
    const EJAC = context.playerMaxBase?.[2] || 10000;

    let E = 0;
    if (S > EJAC * 2) {
      E = 2;
    } else if (S > EJAC) {
      E = 1;
    } else {
      E = 0;
    }

    if (E) {
      // 사정している (라인 412-441)
      source[4] = Math.floor(source[4] * 3.00);

      // ABL:정액중독をみる (라인 416-440)
      if (abl32 === 0) {
        source[7] = 0;
        source[5] = Math.floor(source[5] * 2.00);
        source[13] = Math.floor(source[13] * 6.00);
      } else if (abl32 === 1) {
        source[7] = 500;
        source[5] = Math.floor(source[5] * 3.00);
        source[13] = Math.floor(source[13] * 4.50);
      } else if (abl32 === 2) {
        source[7] = 1200;
        source[5] = Math.floor(source[5] * 4.00);
        source[13] = Math.floor(source[13] * 3.50);
      } else if (abl32 === 3) {
        source[7] = 3000;
        source[5] = Math.floor(source[5] * 6.00);
        source[13] = Math.floor(source[13] * 3.00);
      } else if (abl32 === 4) {
        source[7] = 6000;
        source[5] = Math.floor(source[5] * 9.00);
        source[13] = Math.floor(source[13] * 2.00);
      } else {
        source[7] = 12000;
        source[5] = Math.floor(source[5] * 15.00);
        source[13] = Math.floor(source[13] * 1.50);
      }
    }

    // 대량사정 (라인 443-460)
    if (E === 2) {
      source[7] = Math.floor(source[7] * 2.00);
      source[5] = Math.floor(source[5] * 1.50);

      if (!context.playerExp) {
        context.playerExp = [];
      }
      context.playerExp[3] = (context.playerExp[3] || 0) + 2;

      context.exp = context.exp || [];
      context.exp[20] = (context.exp[20] || 0) + 9;

      context.showMessage('대량사정⚡');
      context.showMessage('정액경험 +9');

      // 精液汚れ
      context.playerStain = context.playerStain || [];
      context.playerStain[2] = (context.playerStain[2] || 0) | 4;

      if (!context.playerBase) {
        context.playerBase = [];
      }
      context.playerBase[2] = (context.playerBase[2] || 0) - EJAC * 2;
      if (context.playerBase[2] >= EJAC) {
        context.playerBase[2] = EJAC - 1;
      }
    }

    // -------------------------------------------------
    // 汚れ (라인 462-467)
    // -------------------------------------------------
    // 奴隷のB⇔調教者のPの汚れが移動
    context.stain = context.stain || [];
    context.playerStain = context.playerStain || [];
    context.stain[5] = (context.stain[5] || 0) | (context.playerStain[2] || 0);
    context.playerStain[2] = (context.playerStain[2] || 0) | (context.stain[5] || 0);

    // -------------------------------------------------
    // 経験上昇 (라인 469-491)
    // -------------------------------------------------
    if (context.talents[122] === 0 && context.playerTalents?.[122] === 0) {
      context.showMessage('이성애경험 +7');
      context.exp = context.exp || [];
      context.exp[40] = (context.exp[40] || 0) + 7;
    } else if (context.talents[122] === 1 && context.playerTalents?.[122] === 1) {
      context.showMessage('동성애경험 +7');
      context.exp = context.exp || [];
      context.exp[41] = (context.exp[41] || 0) + 7;
    }

    if ((context.assiPlay || 0) === 0 && (context.exp[22] || 0) >= (context.explv?.[3] || 10000)) {
      context.tflags = context.tflags || [];
      context.tflags[30] = (context.tflags[30] || 0) + 1;
    }

    // 애정경험 (라인 486-490)
    E = 1;
    if ((context.charFlags[2] || 0) >= 1000 && (context.assiPlay || 0) === 0) {
      context.showMessage(`애정경험+${E}`);
      context.exp = context.exp || [];
      context.exp[23] = (context.exp[23] || 0) + E;
    }
    E = 0;

    // -------------------------------------------------
    // その他の処理 (라인 493-504)
    // -------------------------------------------------
    context.tflags = context.tflags || [];
    context.tflags[100] = 1;

    // 굴복각인2に相当
    context.tflags[200] = 2;

    // 調教者が후타나리
    if (context.playerTalents?.[121] === 1) {
      source[13] = Math.floor(source[13] / 2);
    }

    // SOURCE 적용
    for (const [key, value] of Object.entries(source)) {
      const numKey = parseInt(key);
      if (!isNaN(numKey)) {
        context.source = context.source || [];
        context.source[numKey] = (context.source[numKey] || 0) + value;
      }
    }

    context.showMessage('나이즈리 완료');
  }
};
