// COMF57: 수치 플레이 (Shame Play)

import { TrainingCommand } from '../command-interface';
import { TrainingContext } from '../training-context';

export const COMF57_ShamePlay: TrainingCommand = {
  id: 57,
  name: '수치 플레이',

  async execute(context: TrainingContext): Promise<number> {
    const { target, savestr, flags, printFn } = context;

    printFn('수치 플레이');
    savestr[0] = '수치 플레이';
    await context.callTrainMessageB();

    // 鏡のセット
    // 終了時は修正なし
    if (flags.TEQUIP[57]) {
      flags.TEQUIP[57] = 0;
      return 1;
    }

    context.loseBase[0] += 0;
    context.loseBase[1] += 200;

    let a = 500;
    let b = 500;

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
      context.source[7] += 0;
      context.source[10] += 0;
      context.source[13] += 600;
      context.source[14] += 1000;
      context.source[15] += 1000;
      a = Math.floor(a * 0.60);
    } else if (target.abl[17] === 1) {
      context.source[7] += 150;
      context.source[10] += 150;
      context.source[13] += 500;
      a = Math.floor(a * 1.00);
    } else if (target.abl[17] === 2) {
      context.source[7] += 300;
      context.source[10] += 300;
      context.source[13] += 400;
      a = Math.floor(a * 1.60);
    } else if (target.abl[17] === 3) {
      context.source[7] += 600;
      context.source[10] += 600;
      context.source[13] += 300;
      a = Math.floor(a * 2.00);
    } else if (target.abl[17] === 4) {
      context.source[7] += 1000;
      context.source[10] += 1000;
      context.source[13] += 200;
      a = Math.floor(a * 2.60);
    } else {
      context.source[7] += 1800;
      context.source[10] += 1800;
      context.source[13] += 100;
      a = Math.floor(a * 3.80);
    }

    // ABL:마조끼をみる
    if (target.abl[21] === 0) {
      a = Math.floor(a * 1.00);
    } else if (target.abl[21] === 1) {
      a = Math.floor(a * 1.20);
    } else if (target.abl[21] === 2) {
      a = Math.floor(a * 1.40);
    } else if (target.abl[21] === 3) {
      a = Math.floor(a * 1.60);
    } else if (target.abl[21] === 4) {
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
      a = Math.floor(a * 2.50);
    }
    // 해방
    if (target.talent[33]) {
      a = Math.floor(a * 1.50);
    }

    // 겁쟁이
    if (target.talent[10]) {
      b = Math.floor(b * 1.50);
    }
    // 수줍음
    if (target.talent[35]) {
      b = Math.floor(b * 3.00);
    }

    // 도착적
    if (target.talent[80]) {
      a = Math.floor(a * 1.50);
      b = Math.floor(b * 1.20);
    }
    // 매력
    if (target.talent[113]) {
      context.source[3] += 500;
      context.source[16] += 500;
      a = Math.floor(a * 1.50);
      b = Math.floor(b * 1.20);
    }

    context.source[12] += a;
    context.source[14] += b;
    context.source[16] += Math.floor(a / 2);

    flags.TEQUIP[57] = 1;

    // 애정경험
    let e = 1;
    if (target.cflag[2] >= 1000 && target.abl[17] >= 3 && flags.ASSIPLAY === 0) {
      printFn(`${context.getExpName(23)}+${e}`);
      target.exp[23] += e;
    }
    e = 0;

    return 1;
  },

  async executeEquipped(context: TrainingContext): Promise<void> {
    const { target, player, flags, printFn } = context;

    printFn('＜수치 플레이중＞');

    context.loseBase[0] += 10;
    context.loseBase[1] += 100;

    let a = 500;
    let b = 500;

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
      context.source[7] += 0;
      context.source[10] += 0;
      context.source[13] += 600;
      context.source[14] += 1000;
      context.source[15] += 1000;
      a = Math.floor(a * 0.30);
    } else if (target.abl[17] === 1) {
      context.source[7] += 150;
      context.source[10] += 150;
      context.source[13] += 500;
      a = Math.floor(a * 1.00);
    } else if (target.abl[17] === 2) {
      context.source[7] += 300;
      context.source[10] += 300;
      context.source[13] += 400;
      a = Math.floor(a * 2.00);
    } else if (target.abl[17] === 3) {
      context.source[7] += 600;
      context.source[10] += 600;
      context.source[13] += 300;
      a = Math.floor(a * 3.60);
    } else if (target.abl[17] === 4) {
      context.source[7] += 1000;
      context.source[10] += 1000;
      context.source[13] += 200;
      a = Math.floor(a * 4.60);
    } else {
      context.source[7] += 1800;
      context.source[10] += 1800;
      context.source[13] += 100;
      a = Math.floor(a * 5.80);
    }

    // ABL:마조끼をみる
    if (target.abl[21] === 0) {
      a = Math.floor(a * 1.10);
    } else if (target.abl[21] === 1) {
      a = Math.floor(a * 1.20);
    } else if (target.abl[21] === 2) {
      a = Math.floor(a * 1.30);
    } else if (target.abl[21] === 3) {
      a = Math.floor(a * 1.40);
    } else if (target.abl[21] === 4) {
      a = Math.floor(a * 1.60);
    } else {
      a = Math.floor(a * 1.80);
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
      a = Math.floor(a * 2.50);
    }
    // 해방
    if (target.talent[33]) {
      a = Math.floor(a * 1.50);
    }

    // 겁쟁이
    if (target.talent[10]) {
      b = Math.floor(b * 1.50);
    }
    // 수줍음
    if (target.talent[35]) {
      b = Math.floor(b * 3.00);
    }

    // 도착적
    if (target.talent[80]) {
      a = Math.floor(a * 1.50);
      b = Math.floor(b * 1.20);
    }
    // 매력
    if (target.talent[113]) {
      context.source[3] += 500;
      context.source[16] += 500;
      a = Math.floor(a * 1.50);
      b = Math.floor(b * 1.20);
    }

    context.source[12] += a;
    context.source[14] += b;
    context.source[16] += Math.floor(a / 2);

    if (target.talent[122] === 0 && player.talent[122] === 0) {
      printFn(`${context.getExpName(40)} +1`);
      target.exp[40] += 1;
    } else if (target.talent[122] === 1 && player.talent[122] === 1) {
      printFn(`${context.getExpName(41)} +1`);
      target.exp[41] += 1;
    }

    if (flags.ASSIPLAY === 0 && target.abl[17] >= 3) {
      flags.TFLAG[30] += 1;
    }
  }
};
