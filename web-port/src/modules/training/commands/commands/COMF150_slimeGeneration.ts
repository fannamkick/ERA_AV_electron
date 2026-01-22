import { CommandPlugin, TrainingContext } from '../../types';

/**
 * COMF150 - 슬라임 생성 (Slime Generation)
 * 원본: ERB/指導関係/COMF150.ERB (399 lines)
 *
 * Slime command system with 5 functions:
 * - @COM150: Toggle slime generation
 * - @EQUIP_COM150: Active slime state
 * - @COM153: Slime masturbation (jumps to COM3)
 * - @COM154: Slime oral play
 * - @EQUIP_COM154: Active slime oral state
 */
export const COMF150_slimeGeneration: CommandPlugin = {
  id: 150,
  name: '슬라임 생성',
  category: '특수',
  staminaCost: 10,

  isAvailable(context: TrainingContext): boolean {
    // 원본: COMF150.ERB @COM150 (availability check implicit)
    return true;
  },

  async execute(context: TrainingContext): Promise<void> {
    // 원본: COMF150.ERB @COM150 (라인 1-78)

    context.showMessage('슬라임 생성');
    context.saveStr[0] = '슬라임 생성';
    // CALL TRAIN_MESSAGE_B

    const tequip = context.equipment || [];

    // TEQUIP:150 토글 (라인 8-17)
    if (tequip[150] === 1) {
      // 슬라임 제거
      tequip[150] = 0;

      // 슬라임 질내진입
      tequip[151] = 0;
      // 슬라임 항문진입
      tequip[152] = 0;
      // 슬라임 구욕
      tequip[154] = 0;

      // UP:3 -= 8000
      context.up = context.up || [];
      context.up[3] = (context.up[3] || 0) - 8000;
    } else {
      // 슬라임 생성 (라인 18-76)
      tequip[150] = 1;

      context.loseBase = context.loseBase || [];
      context.loseBase[0] = 10;
      context.loseBase[1] = 70;

      const source: Record<string, number> = {};

      // ABL:C感覚をみる (라인 24-43)
      const abl0 = context.abilities[0] || 0;
      if (abl0 === 0) {
        source[0] = 20;
        source[3] = 25;
      } else if (abl0 === 1) {
        source[0] = 100;
        source[3] = 50;
      } else if (abl0 === 2) {
        source[0] = 500;
        source[3] = 80;
      } else if (abl0 === 3) {
        source[0] = 1200;
        source[3] = 100;
      } else if (abl0 === 4) {
        source[0] = 2000;
        source[3] = 115;
      } else {
        source[0] = 2800;
        source[3] = 125;
      }

      // ABL:B感覚をみる (라인 45-64)
      const abl1 = context.abilities[1] || 0;
      if (abl1 === 0) {
        source[17] = 15;
        source[3] = (source[3] || 0) + 25;
      } else if (abl1 === 1) {
        source[17] = 50;
        source[3] = (source[3] || 0) + 50;
      } else if (abl1 === 2) {
        source[17] = 300;
        source[3] = (source[3] || 0) + 80;
      } else if (abl1 === 3) {
        source[17] = 700;
        source[3] = (source[3] || 0) + 100;
      } else if (abl1 === 4) {
        source[17] = 1100;
        source[3] = (source[3] || 0) + 115;
      } else {
        source[17] = 1600;
        source[3] = (source[3] || 0) + 125;
      }

      source[9] = 5000;
      source[14] = 200;

      // 겁쟁이 (라인 69-71)
      if (context.talents[10] === 1) {
        source[14] = Math.floor(source[14] * 2.00);
      }

      // 감정부족 (라인 72-74)
      if (context.talents[22] === 1) {
        source[14] = Math.floor(source[14] * 0.60);
      }

      // SOURCE 적용
      for (const [key, value] of Object.entries(source)) {
        const numKey = parseInt(key);
        if (!isNaN(numKey)) {
          context.source = context.source || [];
          context.source[numKey] = (context.source[numKey] || 0) + value;
        }
      }
    }

    context.equipment = tequip;
  }
};

/**
 * @EQUIP_COM150 - 슬라임지도중 (Active Slime Training)
 * 원본: ERB/指導関係/COMF150.ERB @EQUIP_COM150 (라인 80-265)
 */
export const COMF150_activeSlime = {
  async execute(context: TrainingContext): Promise<void> {
    // 원본: COMF150.ERB @EQUIP_COM150

    context.showMessage('＜슬라임지도중＞');

    let a = 100;

    // 겁쟁이 (라인 85-87)
    if (context.talents[10] === 1) {
      a = Math.floor(a * 2.00);
    }

    // 감정부족 (라인 89-91)
    if (context.talents[22] === 1) {
      a = Math.floor(a * 0.60);
    }

    // 음란 (라인 93-95)
    if (context.talents[76] === 1) {
      a = Math.floor(a * 0.50);
    }

    context.loseBase = context.loseBase || [];
    context.loseBase[0] = (context.loseBase[0] || 0) + 20;
    context.loseBase[1] = (context.loseBase[1] || 0) + 80;

    const source: Record<string, number> = {};

    // ABL:C感覚をみる (라인 100-119)
    const abl0 = context.abilities[0] || 0;
    if (abl0 === 0) {
      source[0] = (source[0] || 0) + 20;
      source[3] = 25;
    } else if (abl0 === 1) {
      source[0] = (source[0] || 0) + 100;
      source[3] = (source[3] || 0) + 50;
    } else if (abl0 === 2) {
      source[0] = (source[0] || 0) + 500;
      source[3] = (source[3] || 0) + 80;
    } else if (abl0 === 3) {
      source[0] = (source[0] || 0) + 1200;
      source[3] = (source[3] || 0) + 100;
    } else if (abl0 === 4) {
      source[0] = (source[0] || 0) + 2000;
      source[3] = (source[3] || 0) + 115;
    } else {
      source[0] = (source[0] || 0) + 2800;
      source[3] = (source[3] || 0) + 125;
    }

    // ABL:B感覚をみる (라인 121-140)
    const abl1 = context.abilities[1] || 0;
    if (abl1 === 0) {
      source[17] = (source[17] || 0) + 15;
      source[3] = (source[3] || 0) + 25;
    } else if (abl1 === 1) {
      source[17] = (source[17] || 0) + 50;
      source[3] = (source[3] || 0) + 50;
    } else if (abl1 === 2) {
      source[17] = (source[17] || 0) + 300;
      source[3] = (source[3] || 0) + 80;
    } else if (abl1 === 3) {
      source[17] = (source[17] || 0) + 700;
      source[3] = (source[3] || 0) + 100;
    } else if (abl1 === 4) {
      source[17] = (source[17] || 0) + 1100;
      source[3] = (source[3] || 0) + 115;
    } else {
      source[17] = (source[17] || 0) + 1600;
      source[3] = (source[3] || 0) + 125;
    }

    context.up = context.up || [];
    context.up[10] = (context.up[10] || 0) + a * 20;
    source[8] = (source[8] || 0) + a * 10;
    source[14] = (source[14] || 0) + a * 5;

    source[9] = (source[9] || 0) + 2000;

    source[13] = Math.floor((source[13] || 0) * 1.80);

    // -------------------------------------------------
    // 사정チェック (라인 150-262)
    // -------------------------------------------------
    const maxBasePlayer4 = context.playerMaxBase?.[4] || 0;
    let basePlayer4 = context.playerBase?.[4] || 0;

    if (maxBasePlayer4 !== 0) {
      let b = 0;

      // ABL:기교をみる (라인 156-169)
      const abl12 = context.abilities[12] || 0;
      if (abl12 === 0) {
        b = 500;
      } else if (abl12 === 1) {
        b = 600;
      } else if (abl12 === 2) {
        b = 800;
      } else if (abl12 === 3) {
        b = 1000;
      } else if (abl12 === 4) {
        b = 1400;
      } else {
        b = 2000;
      }

      // ABL:従順をみる (라인 171-184)
      const abl10 = context.abilities[10] || 0;
      if (abl10 === 0) {
        b = Math.floor(b * 0.80);
      } else if (abl10 === 1) {
        b = Math.floor(b * 0.90);
      } else if (abl10 === 2) {
        b = Math.floor(b * 1.00);
      } else if (abl10 === 3) {
        b = Math.floor(b * 1.10);
      } else if (abl10 === 4) {
        b = Math.floor(b * 1.20);
      } else {
        b = Math.floor(b * 1.30);
      }

      // PALAM:욕정をみる (라인 186-199)
      const palam5 = context.params[5] || 0;
      const palamlv1 = context.palamlv?.[1] || 1000;
      const palamlv2 = context.palamlv?.[2] || 3000;
      const palamlv3 = context.palamlv?.[3] || 10000;
      const palamlv4 = context.palamlv?.[4] || 30000;
      const palamlv5 = context.palamlv?.[5] || 100000;

      if (palam5 < palamlv1) {
        b = Math.floor(b * 1.00);
      } else if (palam5 < palamlv2) {
        b = Math.floor(b * 1.10);
      } else if (palam5 < palamlv3) {
        b = Math.floor(b * 1.20);
      } else if (palam5 < palamlv4) {
        b = Math.floor(b * 1.30);
      } else if (palam5 < palamlv5) {
        b = Math.floor(b * 1.40);
      } else {
        b = Math.floor(b * 1.50);
      }

      // 슬라임 질내진입 (라인 201-203)
      const tequip = context.equipment || [];
      if (tequip[151] === 1) {
        b = Math.floor(b * 1.50);
      }

      // 슬라임 항문진입 (라인 204-206)
      if (tequip[152] === 1) {
        b = Math.floor(b * 1.50);
      }

      // 슬라임 구욕 (라인 207-209)
      if (tequip[154] === 1) {
        b = Math.floor(b * 1.50);
      }

      basePlayer4 += b;

      const s = basePlayer4;
      const ejac = maxBasePlayer4;

      let e = 0;
      if (s > ejac * 2) {
        e = 2;
      } else if (s > ejac) {
        e = 1;
      }

      // 강절정 (라인 231-240)
      if (e === 2) {
        if (tequip[151] === 1) {
          context.charFlags = context.charFlags || {};
          context.charFlags[112] = (context.charFlags[112] || 0) + 3;
        }
        context.showMessage('슬라임강절정');

        basePlayer4 -= ejac * 2;
        if (basePlayer4 >= ejac) {
          basePlayer4 = ejac - 1;
        }

        source[0] = Math.floor((source[0] || 0) * 2.00);
        source[1] = Math.floor((source[1] || 0) * 2.00);
        source[2] = Math.floor((source[2] || 0) * 2.00);
        source[17] = Math.floor((source[17] || 0) * 2.00);
      }
      // 通常の절정 (라인 245-258)
      else if (e === 1) {
        if (tequip[151] === 1) {
          context.charFlags = context.charFlags || {};
          context.charFlags[112] = (context.charFlags[112] || 0) + 1;
        }
        context.showMessage('슬라임절정');

        basePlayer4 -= ejac;
        if (basePlayer4 >= ejac) {
          basePlayer4 = ejac - 1;
        }

        source[0] = Math.floor((source[0] || 0) * 1.50);
        source[1] = Math.floor((source[1] || 0) * 1.50);
        source[2] = Math.floor((source[2] || 0) * 1.50);
        source[17] = Math.floor((source[17] || 0) * 1.50);
      }

      // BASE:PLAYER:4 업데이트
      if (!context.playerBase) {
        context.playerBase = {};
      }
      context.playerBase[4] = basePlayer4;
    }

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
 * @COM153 - 슬라임자위 (Slime Masturbation)
 * 원본: ERB/指導関係/COMF150.ERB @COM153 (라인 267-270)
 */
export const COMF153_slimeMasturbation: CommandPlugin = {
  id: 153,
  name: '슬라임자위',
  category: '특수',
  staminaCost: 0,

  isAvailable(context: TrainingContext): boolean {
    return true;
  },

  async execute(context: TrainingContext): Promise<void> {
    // JUMP COM3 (자위 커맨드로 이동)
    context.showMessage('[COM3으로 파생됨]');
    context.tflags = context.tflags || [];
    context.tflags[59] = 3;
  }
};

/**
 * @COM154 - 슬라임 구욕 (Slime Oral Play)
 * 원본: ERB/指導関係/COMF150.ERB @COM154 (라인 272-341)
 */
export const COMF154_slimeOral: CommandPlugin = {
  id: 154,
  name: '슬라임 구욕',
  category: '특수',
  staminaCost: 60,

  isAvailable(context: TrainingContext): boolean {
    return true;
  },

  async execute(context: TrainingContext): Promise<void> {
    // 원본: COMF150.ERB @COM154 (라인 272-341)

    context.showMessage('슬라임 구욕');
    context.saveStr[0] = '슬라임 구욕';
    // CALL TRAIN_MESSAGE_B

    context.loseBase = context.loseBase || [];
    context.loseBase[0] = (context.loseBase[0] || 0) + 60;
    context.loseBase[1] = (context.loseBase[1] || 0) + 80;

    // 첫 키스 (라인 281-289)
    if ((context.charFlags[16] || 0) === -1) {
      context.charFlags = context.charFlags || {};
      context.charFlags[16] = 1;
      context.showMessage('첫 키스');
      context.cstr = context.cstr || [];
      context.cstr[1] = '슬라임';
      context.tflags = context.tflags || [];
      context.tflags[135] = 1;
    }

    const source: Record<string, number> = {};

    // ABL:봉사정신をみる (라인 291-310)
    const abl16 = context.abilities[16] || 0;
    let a = 0;
    if (abl16 === 0) {
      source[4] = 200;
      a = 100;
    } else if (abl16 === 1) {
      source[4] = 300;
      a = 200;
    } else if (abl16 === 2) {
      source[4] = 400;
      a = 400;
    } else if (abl16 === 3) {
      source[4] = 500;
      a = 600;
    } else if (abl16 === 4) {
      source[4] = 600;
      a = 800;
    } else {
      source[4] = 800;
      a = 1100;
    }

    // ABL:기교をみる (라인 312-326)
    const abl12 = context.abilities[12] || 0;
    if (abl12 === 0) {
      source[4] = Math.floor(source[4] * 0.50);
    } else if (abl12 === 1) {
      source[4] = Math.floor(source[4] * 0.80);
    } else if (abl12 === 2) {
      source[4] = Math.floor(source[4] * 1.00);
    } else if (abl12 === 3) {
      source[4] = Math.floor(source[4] * 1.20);
    } else if (abl12 === 4) {
      source[4] = Math.floor(source[4] * 1.50);
    } else {
      source[4] = Math.floor(source[4] * 2.00);
    }

    source[13] = (source[13] || 0) + a;
    source[16] = (source[16] || 0) + a;

    // 촉수の抜き挿し (라인 330-336)
    const tequip = context.equipment || [];
    if (tequip[154] === 1) {
      tequip[154] = 0;
    } else {
      tequip[154] = 1;
    }
    context.equipment = tequip;

    // SOURCE 적용
    for (const [key, value] of Object.entries(source)) {
      const numKey = parseInt(key);
      if (!isNaN(numKey)) {
        context.source = context.source || [];
        context.source[numKey] = (context.source[numKey] || 0) + value;
      }
    }

    // EXP:22 (펠라경험) +1 (라인 338-339)
    context.exp = context.exp || [];
    context.exp[22] = (context.exp[22] || 0) + 1;
    context.showMessage('펠라경험 +1');
  }
};

/**
 * @EQUIP_COM154 - 슬라임 구욕중 (Active Slime Oral)
 * 원본: ERB/指導関係/COMF150.ERB @EQUIP_COM154 (라인 343-397)
 */
export const COMF154_activeSlimeOral = {
  async execute(context: TrainingContext): Promise<void> {
    // 원본: COMF150.ERB @EQUIP_COM154

    context.showMessage('＜슬라임 구욕중＞');

    // TALENT:47 (라인 346-352)
    if (context.talents[47] === 1) {
      context.loseBase = context.loseBase || [];
      context.loseBase[0] = (context.loseBase[0] || 0) + 30;
      context.loseBase[1] = (context.loseBase[1] || 0) + 45;
    } else {
      context.loseBase = context.loseBase || [];
      context.loseBase[0] = (context.loseBase[0] || 0) + 60;
      context.loseBase[1] = (context.loseBase[1] || 0) + 75;
    }

    const source: Record<string, number> = {};

    // ABL:봉사정신をみる (라인 354-373)
    const abl16 = context.abilities[16] || 0;
    let a = 0;
    if (abl16 === 0) {
      source[4] = 200;
      a = 100;
    } else if (abl16 === 1) {
      source[4] = 300;
      a = 200;
    } else if (abl16 === 2) {
      source[4] = 400;
      a = 400;
    } else if (abl16 === 3) {
      source[4] = 500;
      a = 600;
    } else if (abl16 === 4) {
      source[4] = 600;
      a = 800;
    } else {
      source[4] = 800;
      a = 1100;
    }

    // ABL:기교をみる (라인 375-389)
    const abl12 = context.abilities[12] || 0;
    if (abl12 === 0) {
      source[4] = Math.floor(source[4] * 0.50);
    } else if (abl12 === 1) {
      source[4] = Math.floor(source[4] * 0.80);
    } else if (abl12 === 2) {
      source[4] = Math.floor(source[4] * 1.00);
    } else if (abl12 === 3) {
      source[4] = Math.floor(source[4] * 1.20);
    } else if (abl12 === 4) {
      source[4] = Math.floor(source[4] * 1.50);
    } else {
      source[4] = Math.floor(source[4] * 2.00);
    }

    source[13] = (source[13] || 0) + a;
    source[16] = (source[16] || 0) + a;

    // SOURCE 적용
    for (const [key, value] of Object.entries(source)) {
      const numKey = parseInt(key);
      if (!isNaN(numKey)) {
        context.source = context.source || [];
        context.source[numKey] = (context.source[numKey] || 0) + value;
      }
    }

    // EXP:22 (펠라경험) +1 (라인 393-395)
    context.exp = context.exp || [];
    context.exp[22] = (context.exp[22] || 0) + 1;
    context.showMessage('펠라경험 +1');
  }
};
