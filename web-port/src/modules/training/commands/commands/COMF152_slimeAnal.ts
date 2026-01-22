import { CommandPlugin, TrainingContext } from '../../types';

/**
 * COMF152 - 슬라임 항문진입 (Slime Anal Entry)
 * 원본: ERB/指導関係/COMF152.ERB (336 lines)
 *
 * Slime anal insertion with toggle and active state.
 * - @COM152: Toggle anal insertion
 * - @EQUIP_COM152: Active anal insertion state
 */
export const COMF152_slimeAnal: CommandPlugin = {
  id: 152,
  name: '슬라임 항문진입',
  category: '특수',
  staminaCost: 30,

  isAvailable(context: TrainingContext): boolean {
    // 원본: COMF152.ERB @COM152 (implicit availability)
    return true;
  },

  async execute(context: TrainingContext): Promise<void> {
    // 원본: COMF152.ERB @COM152 (라인 1-172)

    context.showMessage('슬라임 항문진입');
    context.saveStr[0] = '슬라임 항문진입';
    // CALL TRAIN_MESSAGE_B

    // -------------------------------------------------
    // ソースの計算 (라인 12-133)
    // -------------------------------------------------
    context.loseBase = context.loseBase || [];
    context.loseBase[0] = (context.loseBase[0] || 0) + 30;
    context.loseBase[1] = (context.loseBase[1] || 0) + 90;

    const source: Record<string, number> = {};

    source[14] = 300;

    // ABL:A感覚をみる (라인 19-38)
    const abl3 = context.abilities[3] || 0;
    if (abl3 === 0) {
      source[2] = 40;
      source[13] = 150;
    } else if (abl3 === 1) {
      source[2] = 125;
      source[13] = 400;
    } else if (abl3 === 2) {
      source[2] = 300;
      source[13] = 700;
    } else if (abl3 === 3) {
      source[2] = 500;
      source[13] = 900;
    } else if (abl3 === 4) {
      source[2] = 650;
      source[13] = 1050;
    } else {
      source[2] = 850;
      source[13] = 1200;
    }

    // EXP:A경험をみる (라인 40-62)
    const exp1 = context.exp[1] || 0;
    const explv1 = context.explv?.[1] || 1000;
    const explv2 = context.explv?.[2] || 3000;
    const explv3 = context.explv?.[3] || 10000;
    const explv4 = context.explv?.[4] || 30000;
    const explv5 = context.explv?.[5] || 100000;

    if (exp1 < explv1) {
      source[2] = Math.floor(source[2] * 0.50);
      source[6] = 1000;
      source[14] = (source[14] || 0) + 200;
    } else if (exp1 < explv2) {
      source[2] = Math.floor(source[2] * 1.00);
      source[6] = 150;
      source[14] = (source[14] || 0) + 100;
    } else if (exp1 < explv3) {
      source[2] = Math.floor(source[2] * 1.10);
      source[6] = 25;
      source[14] = (source[14] || 0) + 50;
    } else if (exp1 < explv4) {
      source[2] = Math.floor(source[2] * 1.20);
      source[6] = 5;
    } else if (exp1 < explv5) {
      source[2] = Math.floor(source[2] * 1.40);
      source[6] = 0;
    } else {
      source[2] = Math.floor(source[2] * 1.60);
      source[6] = 0;
    }

    // PALAM:윤활をみる (라인 64-80)
    const palam3 = context.params[3] || 0;
    const palamlv1 = context.palamlv?.[1] || 1000;
    const palamlv2 = context.palamlv?.[2] || 3000;
    const palamlv3 = context.palamlv?.[3] || 10000;
    const palamlv4 = context.palamlv?.[4] || 30000;

    if (palam3 < palamlv1) {
      source[2] = Math.floor(source[2] * 0.40);
      source[6] = (source[6] || 0) + 400;
    } else if (palam3 < palamlv2) {
      source[2] = Math.floor(source[2] * 0.80);
      source[6] = (source[6] || 0) + 250;
    } else if (palam3 < palamlv3) {
      source[2] = Math.floor(source[2] * 1.00);
      source[6] = (source[6] || 0) + 150;
    } else if (palam3 < palamlv4) {
      source[2] = Math.floor(source[2] * 1.40);
      source[6] = (source[6] || 0) + 60;
    } else {
      source[2] = Math.floor(source[2] * 1.80);
      source[6] = (source[6] || 0) + 50;
    }

    // PALAM:욕정をみる (라인 82-93)
    const palam5 = context.params[5] || 0;
    if (palam5 < palamlv1) {
      source[2] = Math.floor(source[2] * 0.80);
    } else if (palam5 < palamlv2) {
      source[2] = Math.floor(source[2] * 0.90);
    } else if (palam5 < palamlv3) {
      source[2] = Math.floor(source[2] * 1.00);
    } else if (palam5 < palamlv4) {
      source[2] = Math.floor(source[2] * 1.10);
    } else {
      source[2] = Math.floor(source[2] * 1.20);
    }

    // ABL:従順をみる (라인 95-110)
    const abl10 = context.abilities[10] || 0;
    if (abl10 === 0) {
      source[2] = Math.floor(source[2] * 0.80);
      source[14] = Math.floor((source[14] || 0) * 2.00);
    } else if (abl10 === 1) {
      source[2] = Math.floor(source[2] * 0.90);
      source[14] = Math.floor((source[14] || 0) * 1.50);
    } else if (abl10 === 2) {
      source[14] = Math.floor((source[14] || 0) * 1.00);
    } else if (abl10 === 3) {
      source[14] = Math.floor((source[14] || 0) * 0.80);
    } else if (abl10 === 4) {
      source[14] = Math.floor((source[14] || 0) * 0.60);
    } else {
      source[14] = Math.floor((source[14] || 0) * 0.30);
    }

    // 큰체구 (라인 112-114)
    if (context.talents[99] === 1) {
      source[6] = Math.floor((source[6] || 0) * 0.80);
    }

    // 작은체형 (라인 115-117)
    if (context.talents[100] === 1) {
      source[6] = Math.floor((source[6] || 0) * 2.00);
    }

    // 미숙함 (라인 118-120)
    if (context.talents[135] === 1) {
      source[6] = Math.floor((source[6] || 0) * 2.00);
    }

    // A민감, 鈍感をみる (라인 122-132)
    if (context.talents[105] === 1) {
      source[6] = Math.floor((source[6] || 0) * 1.50);
      source[13] = Math.floor((source[13] || 0) * 1.50);
      source[14] = Math.floor((source[14] || 0) * 1.50);
    } else if (context.talents[106] === 1) {
      source[6] = Math.floor((source[6] || 0) * 0.60);
      source[13] = Math.floor((source[13] || 0) * 0.60);
      source[14] = Math.floor((source[14] || 0) * 0.60);
    }

    // 처녀で정조관념 (라인 134-136)
    const exp0 = context.exp[0] || 0;
    if (exp0 === 0 && context.talents[30] === 1) {
      source[13] = Math.floor((source[13] || 0) / 3);
    }

    // -------------------------------------------------
    // 経験上昇 (라인 138-164)
    // -------------------------------------------------
    let expGain = 0;

    // A감각が高いほどA경험が入る (라인 142-151)
    if (abl3 <= 1) {
      expGain = 1;
    } else if (abl3 <= 4) {
      expGain = 2;
    } else if (abl3 <= 7) {
      expGain = 3;
    } else {
      expGain = 4;
    }

    context.exp = context.exp || [];
    context.exp[1] = (context.exp[1] || 0) + expGain;
    context.showMessage(`A경험 +${expGain}`);

    // 레즈・호모경험 (라인 155-164)
    if (context.talents[122] === 0 && context.playerTalents[122] === 0) {
      context.showMessage('레즈경험 +1');
      context.exp[40] = (context.exp[40] || 0) + 1;
    } else if (context.talents[122] === 1 && context.playerTalents[122] === 1) {
      context.showMessage('호모경험 +1');
      context.exp[41] = (context.exp[41] || 0) + 1;
    }

    // -------------------------------------------------
    // 애널바이브の착脱 (라인 166-169)
    // -------------------------------------------------
    const tequip = context.equipment || [];
    tequip[152] = 1 - (tequip[152] || 0);
    context.equipment = tequip;

    // SOURCE 적용
    for (const [key, value] of Object.entries(source)) {
      const numKey = parseInt(key);
      if (!isNaN(numKey)) {
        context.source = context.source || [];
        context.source[numKey] = (context.source[numKey] || 0) + value;
      }
    }
  }
};

/**
 * @EQUIP_COM152 - 애널바이브 삽입중 (Active Anal Insertion)
 * 원본: ERB/指導關係/COMF152.ERB @EQUIP_COM152 (라인 177-336)
 */
export const COMF152_activeSlimeAnal = {
  async execute(context: TrainingContext): Promise<void> {
    // 원본: COMF152.ERB @EQUIP_COM152

    context.showMessage('＜슬라임 항문 진입중＞');

    // -------------------------------------------------
    // ソースの計算 (라인 182-303)
    // -------------------------------------------------
    context.loseBase = context.loseBase || [];
    context.loseBase[0] = (context.loseBase[0] || 0) + 15;
    context.loseBase[1] = (context.loseBase[1] || 0) + 40;

    const source: Record<string, number> = {};

    source[14] = 100;

    // ABL:A感覚をみる (라인 189-208)
    const abl3 = context.abilities[3] || 0;
    let a = 0;
    let b = 0;
    if (abl3 === 0) {
      a = 20;
      b = 150;
    } else if (abl3 === 1) {
      a = 60;
      b = 400;
    } else if (abl3 === 2) {
      a = 150;
      b = 700;
    } else if (abl3 === 3) {
      a = 250;
      b = 900;
    } else if (abl3 === 4) {
      a = 325;
      b = 1050;
    } else {
      a = 425;
      b = 1200;
    }

    // EXP:A경험をみる (라인 210-229)
    const exp1 = context.exp[1] || 0;
    const explv1 = context.explv?.[1] || 1000;
    const explv2 = context.explv?.[2] || 3000;
    const explv3 = context.explv?.[3] || 10000;
    const explv4 = context.explv?.[4] || 30000;
    const explv5 = context.explv?.[5] || 100000;

    let c = 0;
    if (exp1 < explv1) {
      a = Math.floor(a * 0.50);
      c = 1000;
    } else if (exp1 < explv2) {
      a = Math.floor(a * 1.00);
      c = 150;
    } else if (exp1 < explv3) {
      a = Math.floor(a * 1.10);
      c = 25;
    } else if (exp1 < explv4) {
      a = Math.floor(a * 1.20);
      c = 5;
    } else if (exp1 < explv5) {
      a = Math.floor(a * 1.40);
      c = 0;
    } else {
      a = Math.floor(a * 1.60);
      c = 0;
    }

    // PALAM:윤활をみる (라인 231-247)
    const palam3 = context.params[3] || 0;
    const palamlv1 = context.palamlv?.[1] || 1000;
    const palamlv2 = context.palamlv?.[2] || 3000;
    const palamlv3 = context.palamlv?.[3] || 10000;
    const palamlv4 = context.palamlv?.[4] || 30000;

    if (palam3 < palamlv1) {
      a = Math.floor(a * 0.40);
      c += 400;
    } else if (palam3 < palamlv2) {
      a = Math.floor(a * 0.80);
      c += 250;
    } else if (palam3 < palamlv3) {
      a = Math.floor(a * 1.00);
      c += 150;
    } else if (palam3 < palamlv4) {
      a = Math.floor(a * 1.40);
      c += 60;
    } else {
      a = Math.floor(a * 1.80);
      c += 50;
    }

    // PALAM:욕정をみる (라인 249-260)
    const palam5 = context.params[5] || 0;
    if (palam5 < palamlv1) {
      a = Math.floor(a * 0.80);
    } else if (palam5 < palamlv2) {
      a = Math.floor(a * 0.90);
    } else if (palam5 < palamlv3) {
      a = Math.floor(a * 1.00);
    } else if (palam5 < palamlv4) {
      a = Math.floor(a * 1.10);
    } else {
      a = Math.floor(a * 1.20);
    }

    // ABL:從順をみる (라인 262-277)
    const abl10 = context.abilities[10] || 0;
    if (abl10 === 0) {
      a = Math.floor(a * 0.80);
      source[14] = Math.floor(source[14] * 2.00);
    } else if (abl10 === 1) {
      a = Math.floor(a * 0.90);
      source[14] = Math.floor(source[14] * 1.50);
    } else if (abl10 === 2) {
      source[14] = Math.floor(source[14] * 1.00);
    } else if (abl10 === 3) {
      source[14] = Math.floor(source[14] * 0.80);
    } else if (abl10 === 4) {
      source[14] = Math.floor(source[14] * 0.60);
    } else {
      source[14] = Math.floor(source[14] * 0.30);
    }

    // 큰체구 (라인 279-281)
    if (context.talents[99] === 1) {
      c = Math.floor(c * 0.80);
    }

    // 작은체형 (라인 282-284)
    if (context.talents[100] === 1) {
      c = Math.floor(c * 2.00);
    }

    // 미숙함 (라인 285-287)
    if (context.talents[135] === 1) {
      source[6] = Math.floor((source[6] || 0) * 2.00);
    }

    // A민감, 鈍感をみる (라인 289-299)
    if (context.talents[105] === 1) {
      source[6] = Math.floor((source[6] || 0) * 1.50);
      source[13] = Math.floor((source[13] || 0) * 1.50);
      source[14] = Math.floor(source[14] * 1.50);
    } else if (context.talents[106] === 1) {
      source[6] = Math.floor((source[6] || 0) * 0.60);
      source[13] = Math.floor((source[13] || 0) * 0.60);
      source[14] = Math.floor(source[14] * 0.60);
    }

    source[2] = (source[2] || 0) + a;
    source[13] = (source[13] || 0) + b;
    source[6] = (source[6] || 0) + c;

    // 처녀で정조관념 (라인 305-309)
    const exp0 = context.exp[0] || 0;
    if (context.talents[0] === 1 && context.talents[30] === 1) {
      source[13] = Math.floor(source[13] * 0.80);
      source[14] = Math.floor(source[14] * 0.50);
    }

    // -------------------------------------------------
    // 経験上昇 (라인 311-332)
    // -------------------------------------------------
    let expGain = 0;

    // 자위実行時は経験 +1 (라인 315-317)
    const selectCom = context.selectCom || 0;
    if (selectCom === 3) {
      expGain = 1;
    }

    // A감각が高いほどA경험が入る (라인 318-327)
    if (abl3 <= 1) {
      expGain += 1;
    } else if (abl3 <= 4) {
      expGain += 2;
    } else if (abl3 <= 7) {
      expGain += 3;
    } else {
      expGain += 4;
    }

    context.exp = context.exp || [];
    context.exp[1] = (context.exp[1] || 0) + expGain;
    context.showMessage(`A경험 +${expGain}`);

    // SOURCE 적용
    for (const [key, value] of Object.entries(source)) {
      const numKey = parseInt(key);
      if (!isNaN(numKey)) {
        context.source = context.source || [];
        context.source[numKey] = (context.source[numKey] || 0) + value;
      }
    }
  }
};
