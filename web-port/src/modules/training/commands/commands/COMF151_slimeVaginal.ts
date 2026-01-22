import { CommandPlugin, TrainingContext } from '../../types';

/**
 * COMF151 - 슬라임 질내진입 (Slime Vaginal Entry)
 * 원본: ERB/指導関係/COMF151.ERB (285 lines)
 *
 * Slime vaginal insertion with toggle and active state.
 * - @COM151: Toggle vaginal insertion
 * - @EQUIP_COM151: Active vaginal insertion state
 */
export const COMF151_slimeVaginal: CommandPlugin = {
  id: 151,
  name: '슬라임 질내진입',
  category: '특수',
  staminaCost: 15,

  isAvailable(context: TrainingContext): boolean {
    // 원본: COMF151.ERB @COM151 (implicit availability)
    return true;
  },

  async execute(context: TrainingContext): Promise<void> {
    // 원본: COMF151.ERB @COM151 (라인 1-142)

    context.showMessage('슬라임 질내진입');
    context.saveStr[0] = '슬라임 질내진입';
    // CALL TRAIN_MESSAGE_B

    // -------------------------------------------------
    // ソースの計算 (라인 12-127)
    // -------------------------------------------------
    context.loseBase = context.loseBase || [];
    context.loseBase[0] = (context.loseBase[0] || 0) + 15;
    context.loseBase[1] = (context.loseBase[1] || 0) + 70;

    const source: Record<string, number> = {};

    // ABL:V感覚をみる (라인 17-30)
    const abl2 = context.abilities[2] || 0;
    if (abl2 === 0) {
      source[1] = 40;
    } else if (abl2 === 1) {
      source[1] = 125;
    } else if (abl2 === 2) {
      source[1] = 300;
    } else if (abl2 === 3) {
      source[1] = 500;
    } else if (abl2 === 4) {
      source[1] = 650;
    } else {
      source[1] = 850;
    }

    // EXP:V경험をみる (라인 32-51)
    const exp0 = context.exp[0] || 0;
    const explv1 = context.explv?.[1] || 1000;
    const explv2 = context.explv?.[2] || 3000;
    const explv3 = context.explv?.[3] || 10000;
    const explv4 = context.explv?.[4] || 30000;
    const explv5 = context.explv?.[5] || 100000;

    if (exp0 < explv1) {
      source[1] = Math.floor(source[1] * 0.20);
      source[6] = 5500;
    } else if (exp0 < explv2) {
      source[1] = Math.floor(source[1] * 0.60);
      source[6] = 300;
    } else if (exp0 < explv3) {
      source[1] = Math.floor(source[1] * 1.00);
      source[6] = 50;
    } else if (exp0 < explv4) {
      source[1] = Math.floor(source[1] * 1.20);
      source[6] = 10;
    } else if (exp0 < explv5) {
      source[1] = Math.floor(source[1] * 1.40);
      source[6] = 0;
    } else {
      source[1] = Math.floor(source[1] * 1.60);
      source[6] = 0;
    }

    // PALAM:윤활をみる (라인 53-71)
    const palam3 = context.params[3] || 0;
    const palamlv1 = context.palamlv?.[1] || 1000;
    const palamlv2 = context.palamlv?.[2] || 3000;
    const palamlv3 = context.palamlv?.[3] || 10000;
    const palamlv4 = context.palamlv?.[4] || 30000;

    if (palam3 < palamlv1) {
      source[1] = Math.floor(source[1] * 0.10);
      source[6] = (source[6] || 0) + 1000;
      source[6] = Math.floor(source[6] * 3.00);
    } else if (palam3 < palamlv2) {
      source[1] = Math.floor(source[1] * 0.40);
      source[6] = (source[6] || 0) + 400;
      source[6] = Math.floor(source[6] * 1.00);
    } else if (palam3 < palamlv3) {
      source[1] = Math.floor(source[1] * 1.00);
      source[6] = Math.floor(source[6] * 0.50);
    } else if (palam3 < palamlv4) {
      source[1] = Math.floor(source[1] * 1.40);
      source[6] = Math.floor(source[6] * 0.20);
    } else {
      source[1] = Math.floor(source[1] * 1.80);
      source[6] = Math.floor(source[6] * 0.10);
    }

    // PALAM:욕정をみる (라인 73-84)
    const palam5 = context.params[5] || 0;
    if (palam5 < palamlv1) {
      source[1] = Math.floor(source[1] * 0.80);
    } else if (palam5 < palamlv2) {
      source[1] = Math.floor(source[1] * 0.90);
    } else if (palam5 < palamlv3) {
      source[1] = Math.floor(source[1] * 1.00);
    } else if (palam5 < palamlv4) {
      source[1] = Math.floor(source[1] * 1.10);
    } else {
      source[1] = Math.floor(source[1] * 1.20);
    }

    // ABL:従順をみる (라인 86-99)
    const abl10 = context.abilities[10] || 0;
    if (abl10 === 0) {
      source[1] = Math.floor(source[1] * 0.80);
    } else if (abl10 === 1) {
      source[1] = Math.floor(source[1] * 0.90);
    } else if (abl10 === 2) {
      source[1] = Math.floor(source[1] * 1.00);
    } else if (abl10 === 3) {
      source[1] = Math.floor(source[1] * 1.10);
    } else if (abl10 === 4) {
      source[1] = Math.floor(source[1] * 1.20);
    } else {
      source[1] = Math.floor(source[1] * 1.30);
    }

    // 큰체구 (라인 101-103)
    if (context.talents[99] === 1) {
      source[6] = Math.floor(source[6] * 0.80);
    }

    // 작은체형 (라인 104-106)
    if (context.talents[100] === 1) {
      source[6] = Math.floor(source[6] * 2.00);
    }

    // 미숙함 (라인 107-109)
    if (context.talents[135] === 1) {
      source[6] = Math.floor(source[6] * 4.00);
    }

    // -------------------------------------------------
    // 経験上昇 (라인 112-127)
    // -------------------------------------------------
    let expGain = 0;

    // V감각が高いほどV경험が入る (라인 115-124)
    if (abl2 <= 1) {
      expGain = 1;
    } else if (abl2 <= 4) {
      expGain = 2;
    } else if (abl2 <= 7) {
      expGain = 3;
    } else {
      expGain = 4;
    }

    context.exp = context.exp || [];
    context.exp[0] = (context.exp[0] || 0) + expGain;
    context.showMessage(`V경험 +${expGain}`);

    // 레즈경험 (라인 129-134)
    if (context.talents[122] === 0 && context.playerTalents[122] === 0) {
      context.showMessage('레즈경험 +1');
      context.exp[40] = (context.exp[40] || 0) + 1;
    }

    // -------------------------------------------------
    // 바이브の착脱 (라인 136-139)
    // -------------------------------------------------
    const tequip = context.equipment || [];
    tequip[151] = 1 - (tequip[151] || 0);
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
 * @EQUIP_COM151 - 바이브 삽입중 (Active Vaginal Insertion)
 * 원본: ERB/指導關係/COMF151.ERB @EQUIP_COM151 (라인 144-285)
 */
export const COMF151_activeSlimeVaginal = {
  async execute(context: TrainingContext): Promise<void> {
    // 원본: COMF151.ERB @EQUIP_COM151

    context.showMessage('＜슬라임 질내 진입중＞');

    context.loseBase = context.loseBase || [];
    context.loseBase[0] = (context.loseBase[0] || 0) + 5;
    context.loseBase[1] = (context.loseBase[1] || 0) + 25;

    // -------------------------------------------------
    // ソースの計算 (라인 154-303)
    // -------------------------------------------------
    const source: Record<string, number> = {};

    // ABL:V感覚をみる (라인 157-170)
    const abl2 = context.abilities[2] || 0;
    let a = 0;
    if (abl2 === 0) {
      a = 20;
    } else if (abl2 === 1) {
      a = 60;
    } else if (abl2 === 2) {
      a = 150;
    } else if (abl2 === 3) {
      a = 250;
    } else if (abl2 === 4) {
      a = 325;
    } else {
      a = 425;
    }

    // EXP:V경험をみる (라인 172-191)
    const exp0 = context.exp[0] || 0;
    const explv1 = context.explv?.[1] || 1000;
    const explv2 = context.explv?.[2] || 3000;
    const explv3 = context.explv?.[3] || 10000;
    const explv4 = context.explv?.[4] || 30000;
    const explv5 = context.explv?.[5] || 100000;

    let b = 0;
    if (exp0 < explv1) {
      a = Math.floor(a * 0.40);
      b = 100;
    } else if (exp0 < explv2) {
      a = Math.floor(a * 0.60);
      b = 75;
    } else if (exp0 < explv3) {
      a = Math.floor(a * 1.00);
      b = 10;
    } else if (exp0 < explv4) {
      a = Math.floor(a * 1.20);
      b = 0;
    } else if (exp0 < explv5) {
      a = Math.floor(a * 1.40);
      b = 0;
    } else {
      a = Math.floor(a * 1.60);
      b = 0;
    }

    // PALAM:윤활をみる (라인 193-214)
    const palam3 = context.params[3] || 0;
    const palamlv1 = context.palamlv?.[1] || 1000;
    const palamlv2 = context.palamlv?.[2] || 3000;
    const palamlv3 = context.palamlv?.[3] || 10000;
    const palamlv4 = context.palamlv?.[4] || 30000;

    let c = 0;
    if (palam3 < palamlv1) {
      a = Math.floor(a * 0.10);
      b += 200;
      b = Math.floor(b * 3.00);
      c += 500;
    } else if (palam3 < palamlv2) {
      a = Math.floor(a * 0.40);
      b += 75;
      b = Math.floor(b * 1.00);
      c += 100;
    } else if (palam3 < palamlv3) {
      a = Math.floor(a * 1.00);
      b = Math.floor(b * 0.50);
      c += 40;
    } else if (palam3 < palamlv4) {
      a = Math.floor(a * 1.40);
      b = Math.floor(b * 0.20);
    } else {
      a = Math.floor(a * 1.80);
      b = Math.floor(b * 0.10);
    }

    // PALAM:욕정をみる (라인 216-227)
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

    // ABL:従順をみる (라인 229-242)
    const abl10 = context.abilities[10] || 0;
    if (abl10 === 0) {
      a = Math.floor(a * 0.80);
    } else if (abl10 === 1) {
      a = Math.floor(a * 0.90);
    } else if (abl10 === 2) {
      a = Math.floor(a * 1.00);
    } else if (abl10 === 3) {
      a = Math.floor(a * 1.10);
    } else if (abl10 === 4) {
      a = Math.floor(a * 1.20);
    } else {
      a = Math.floor(a * 1.30);
    }

    // 큰체구 (라인 245-247)
    if (context.talents[99] === 1) {
      b = Math.floor(b * 0.80);
    }

    // 작은체형 (라인 248-250)
    if (context.talents[100] === 1) {
      b = Math.floor(b * 2.00);
    }

    // 미숙함 (라인 251-253)
    if (context.talents[135] === 1) {
      b = Math.floor(b * 4.00);
    }

    // 정조관념 (라인 255-258)
    if (exp0 > 0 && context.talents[30] === 1) {
      b = Math.floor(b * 3.00);
    }

    source[1] = (source[1] || 0) + a;
    source[6] = (source[6] || 0) + b;

    // -------------------------------------------------
    // 経験上昇 (라인 263-282)
    // -------------------------------------------------
    let expGain = 0;

    // 자위実行時は経験 +1 (라인 267-269)
    const selectCom = context.selectCom || 0;
    if (selectCom === 3) {
      expGain = 1;
    }

    // V감각が高いほどV경험が入る (라인 270-279)
    if (abl2 <= 1) {
      expGain += 1;
    } else if (abl2 <= 4) {
      expGain += 2;
    } else if (abl2 <= 7) {
      expGain += 3;
    } else {
      expGain += 4;
    }

    context.exp = context.exp || [];
    context.exp[0] = (context.exp[0] || 0) + expGain;
    context.showMessage(`V경험 +${expGain}`);

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
