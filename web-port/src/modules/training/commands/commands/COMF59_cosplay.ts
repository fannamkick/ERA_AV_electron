// COMF59: 코스프레 (Cosplay)

import { TrainingCommand } from '../command-interface';
import { TrainingContext } from '../training-context';

export const COMF59_Cosplay: TrainingCommand = {
  id: 59,
  name: '코스프레',

  async execute(context: TrainingContext): Promise<number> {
    const { target, savestr, flags, printFn } = context;

    printFn('코스프레');
    savestr[0] = '코스프레';
    await context.callTrainMessageB();

    // 에이프런のセット
    // 終了時は修正なし
    if (flags.TEQUIP[59]) {
      flags.TEQUIP[59] = 0;
      return 1;
    }

    context.loseBase[0] += 0;
    context.loseBase[1] += 30;

    let a = 500;
    let b = 100;

    // PALAM:욕정をみる
    if (target.palam[5] < target.paramlv[1]) {
      a = Math.floor(a * 1.00);
    } else if (target.palam[5] < target.paramlv[2]) {
      a = Math.floor(a * 1.10);
    } else if (target.palam[5] < target.paramlv[3]) {
      a = Math.floor(a * 1.20);
    } else if (target.palam[5] < target.paramlv[4]) {
      a = Math.floor(a * 1.30);
    } else if (target.palam[5] >= target.paramlv[4]) {
      a = Math.floor(a * 1.40);
    }

    // ABL:노출벽をみる
    if (target.abl[17] === 0) {
      context.source[11] += 0;
      context.source[10] += 0;
      context.source[12] += 100;
      context.source[14] += 100;
      context.source[15] += 100;
      a = Math.floor(a * 0.60);
    } else if (target.abl[17] === 1) {
      context.source[11] += 50;
      context.source[10] += 150;
      context.source[12] += 500;
      context.source[14] += 300;
      a = Math.floor(a * 1.00);
    } else if (target.abl[17] === 2) {
      context.source[11] += 100;
      context.source[10] += 300;
      context.source[12] += 100;
      context.source[14] += 50;
      a = Math.floor(a * 1.60);
    } else if (target.abl[17] === 3) {
      context.source[11] += 150;
      context.source[10] += 600;
      context.source[12] += 50;
      context.source[14] += 0;
      a = Math.floor(a * 2.00);
    } else if (target.abl[17] === 4) {
      context.source[11] += 200;
      context.source[10] += 1000;
      context.source[12] += 0;
      context.source[14] += 0;
      a = Math.floor(a * 2.60);
    } else {
      context.source[11] += 300;
      context.source[10] += 2000;
      context.source[12] += 0;
      context.source[14] += 0;
      a = Math.floor(a * 3.80);
    }

    // ABL:従順をみる
    if (target.abl[10] === 0) {
      a = Math.floor(a * 1.00);
    } else if (target.abl[10] === 1) {
      a = Math.floor(a * 1.20);
    } else if (target.abl[10] === 2) {
      a = Math.floor(a * 1.40);
    } else if (target.abl[10] === 3) {
      a = Math.floor(a * 1.60);
    } else if (target.abl[10] === 4) {
      a = Math.floor(a * 1.80);
    } else {
      a = Math.floor(a * 2.00);
    }

    // ABL:봉사정신をみる
    if (target.abl[16] === 0) {
      a = Math.floor(a * 1.00);
    } else if (target.abl[16] === 1) {
      a = Math.floor(a * 1.20);
    } else if (target.abl[16] === 2) {
      a = Math.floor(a * 1.40);
    } else if (target.abl[16] === 3) {
      a = Math.floor(a * 1.60);
    } else if (target.abl[16] === 4) {
      a = Math.floor(a * 1.80);
    } else {
      a = Math.floor(a * 2.00);
    }

    // 무관심
    if (target.talent[21]) {
      a = Math.floor(a * 0.80);
    }
    // 감정부족
    if (target.talent[22]) {
      a = Math.floor(a * 0.80);
    }
    // 호기심
    if (target.talent[23]) {
      a = Math.floor(a * 1.50);
    }
    // 헌신적
    if (target.talent[63]) {
      a = Math.floor(a * 1.50);
    }
    // 겁쟁이
    if (target.talent[10]) {
      b = Math.floor(b * 1.50);
    }
    // 수줍음
    if (target.talent[35]) {
      b = Math.floor(b * 1.20);
    }
    // 정조관념
    if (target.talent[33]) {
      a = Math.floor(a * 0.50);
    }
    // 프라이드 높음
    if (target.talent[15]) {
      b = Math.floor(b * 2.00);
    }
    // 연심
    if (target.talent[85]) {
      a = Math.floor(a * 2.50);
    }
    // 음란
    if (target.talent[76]) {
      a = Math.floor(a * 1.80);
    }
    // 미망인
    if (target.talent[206]) {
      a = Math.floor(a * 0.50);
    }

    context.source[3] += a;
    context.source[14] += b;
    context.source[16] += a;

    flags.TEQUIP[59] = 1;

    if (flags.ASSIPLAY === 0 && target.abl[10] >= 3) {
      flags.TFLAG[30] += 10;
    }
    if (flags.ASSIPLAY === 0 && target.talent[85]) {
      flags.TFLAG[30] += 20;
    }
    if (flags.ASSIPLAY === 0 && target.talent[76]) {
      flags.TFLAG[30] += 5;
    }
    if (flags.ASSIPLAY === 0 && target.talent[88]) {
      flags.TFLAG[30] += 30;
    }

    // 애정경험
    let e = 2;
    target.exp[102] += e;
    // ****슬라임パッチ追加ここから****
    if (flags.TFLAG[180] === 28) {
      if (target.cflag[2] >= 1000 && (target.abl[21] >= 3 || target.talent[88]) && flags.ASSIPLAY === 0) {
        printFn(`${context.getExpName(23)}+${e}`);
        target.exp[23] += e;
      }
    }
    // ****슬라임パッチ追加ここまで****
    e = 0;

    return 1;
  },

  async executeEquipped(context: TrainingContext): Promise<void> {
    const { target, player, flags, printFn } = context;

    printFn('＜코스프레중＞');

    context.loseBase[0] += 0;
    context.loseBase[1] += 0;

    let a = 500;
    let b = 100;

    // PALAM:욕정をみる
    if (target.palam[5] < target.paramlv[1]) {
      a = Math.floor(a * 1.00);
    } else if (target.palam[5] < target.paramlv[2]) {
      a = Math.floor(a * 1.10);
    } else if (target.palam[5] < target.paramlv[3]) {
      a = Math.floor(a * 1.20);
    } else if (target.palam[5] < target.paramlv[4]) {
      a = Math.floor(a * 1.30);
    } else if (target.palam[5] >= target.paramlv[4]) {
      a = Math.floor(a * 1.40);
    }

    // ABL:노출벽をみる
    if (target.abl[17] === 0) {
      context.source[11] += 0;
      context.source[10] += 0;
      context.source[12] += 100;
      context.source[14] += 100;
      context.source[15] += 100;
      a = Math.floor(a * 0.60);
    } else if (target.abl[17] === 1) {
      context.source[11] += 50;
      context.source[10] += 150;
      context.source[12] += 500;
      context.source[14] += 300;
      a = Math.floor(a * 1.00);
    } else if (target.abl[17] === 2) {
      context.source[11] += 100;
      context.source[10] += 300;
      context.source[12] += 100;
      context.source[14] += 50;
      a = Math.floor(a * 1.60);
    } else if (target.abl[17] === 3) {
      context.source[11] += 150;
      context.source[10] += 600;
      context.source[12] += 50;
      context.source[14] += 0;
      a = Math.floor(a * 2.00);
    } else if (target.abl[17] === 4) {
      context.source[11] += 200;
      context.source[10] += 1000;
      context.source[12] += 0;
      context.source[14] += 0;
      a = Math.floor(a * 2.60);
    } else if (target.abl[17] >= 5) {
      context.source[11] += 300;
      context.source[10] += 2000;
      context.source[12] += 0;
      context.source[14] += 0;
      a = Math.floor(a * 3.80);
    }

    // ABL:従順をみる
    if (target.abl[10] === 0) {
      a = Math.floor(a * 1.00);
    } else if (target.abl[10] === 1) {
      a = Math.floor(a * 1.20);
    } else if (target.abl[10] === 2) {
      a = Math.floor(a * 1.40);
    } else if (target.abl[10] === 3) {
      a = Math.floor(a * 1.60);
    } else if (target.abl[10] === 4) {
      a = Math.floor(a * 1.80);
    } else if (target.abl[10] >= 5) {
      a = Math.floor(a * 2.00);
    }

    // ABL:봉사정신をみる
    if (target.abl[16] === 0) {
      a = Math.floor(a * 1.00);
    } else if (target.abl[16] === 1) {
      a = Math.floor(a * 1.20);
    } else if (target.abl[16] === 2) {
      a = Math.floor(a * 1.40);
    } else if (target.abl[16] === 3) {
      a = Math.floor(a * 1.60);
    } else if (target.abl[16] === 4) {
      a = Math.floor(a * 1.80);
    } else if (target.abl[16] >= 5) {
      a = Math.floor(a * 2.00);
    }

    // 무관심
    if (target.talent[21]) {
      a = Math.floor(a * 0.80);
    }
    // 감정부족
    if (target.talent[22]) {
      a = Math.floor(a * 0.80);
    }
    // 호기심
    if (target.talent[23]) {
      a = Math.floor(a * 1.50);
    }
    // 헌신적
    if (target.talent[63]) {
      a = Math.floor(a * 1.50);
    }
    // 겁쟁이
    if (target.talent[10]) {
      b = Math.floor(b * 1.50);
    }
    // 수줍음
    if (target.talent[35]) {
      b = Math.floor(b * 1.20);
    }
    // 정조관념
    if (target.talent[33]) {
      a = Math.floor(a * 0.50);
    }
    // 프라이드 높음
    if (target.talent[15]) {
      b = Math.floor(b * 2.00);
    }
    // 연심
    if (target.talent[85]) {
      a = Math.floor(a * 2.50);
    }
    // 음란
    if (target.talent[76]) {
      a = Math.floor(a * 1.80);
    }

    context.source[3] += a;
    context.source[14] += b;
    context.source[16] += a;

    if (target.talent[122] === 0 && player.talent[122] === 0) {
      printFn(`${context.getExpName(40)} +1`);
      target.exp[40] += 1;
    } else if (target.talent[122] === 1 && player.talent[122] === 1) {
      printFn(`${context.getExpName(41)} +1`);
      target.exp[41] += 1;
    }

    if (flags.ASSIPLAY === 0 && target.abl[10] >= 3) {
      flags.TFLAG[30] += 10;
    }
    if (flags.ASSIPLAY === 0 && target.talent[85]) {
      flags.TFLAG[30] += 20;
    }
    if (flags.ASSIPLAY === 0 && target.talent[76]) {
      flags.TFLAG[30] += 5;
    }
    if (flags.ASSIPLAY === 0 && target.talent[88]) {
      flags.TFLAG[30] += 30;
    }
    let e = 1;
    target.exp[102] += e;
    // ****슬라임パッチ追加ここから****
    if (flags.TFLAG[180] === 28) {
      if (target.cflag[2] >= 1000 && (target.abl[21] >= 3 || target.talent[88]) && flags.ASSIPLAY === 0) {
        printFn(`${context.getExpName(23)}+${e}`);
        target.exp[23] += e;
      }
    }
    // ****슬라임パッチ追加ここまで****
    e = 0;
  }
};
