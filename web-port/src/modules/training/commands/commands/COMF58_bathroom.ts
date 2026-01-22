// COMF58: 목욕탕 플레이 (Bathroom Play)

import { TrainingCommand } from '../command-interface';
import { TrainingContext } from '../training-context';

export const COMF58_Bathroom: TrainingCommand = {
  id: 58,
  name: '목욕탕 플레이',

  async execute(context: TrainingContext): Promise<number> {
    const { target, savestr, flags, items, printFn } = context;

    printFn('목욕탕 플레이');
    savestr[0] = '목욕탕 플레이';
    await context.callTrainMessageB();

    // 風呂場への出入り
    // 終了時は修正なし
    if (flags.TEQUIP[58]) {
      if (flags.TEQUIP[18]) {
        flags.TEQUIP[18] = 0;
      }
      flags.TEQUIP[58] = 0;
      return 1;
    }

    context.loseBase[0] += 0;
    context.loseBase[1] += 30;

    let a = 100;
    let b = 50;

    // PALAM:욕정をみる
    if (target.palam[5] < target.paramlv[1]) {
      a = Math.floor(a * 0.80);
    } else if (target.palam[5] < target.paramlv[2]) {
      a = Math.floor(a * 0.90);
    } else if (target.palam[5] < target.paramlv[3]) {
      a = Math.floor(a * 1.00);
    } else if (target.palam[5] < target.paramlv[4]) {
      a = Math.floor(a * 1.10);
    } else if (target.palam[5] >= target.paramlv[4]) {
      a = Math.floor(a * 1.20);
    }

    // ABL:노출벽をみる
    if (target.abl[17] === 0) {
      context.source[7] += 0;
      context.source[10] += 0;
      a = Math.floor(a * 1.00);
    } else if (target.abl[17] === 1) {
      context.source[7] += 50;
      context.source[10] += 50;
      a = Math.floor(a * 1.10);
    } else if (target.abl[17] === 2) {
      context.source[7] += 80;
      context.source[10] += 80;
      a = Math.floor(a * 1.20);
    } else if (target.abl[17] === 3) {
      context.source[7] += 100;
      context.source[10] += 100;
      a = Math.floor(a * 1.30);
    } else if (target.abl[17] === 4) {
      context.source[7] += 200;
      context.source[10] += 200;
      a = Math.floor(a * 1.40);
    } else {
      context.source[7] += 300;
      context.source[10] += 300;
      a = Math.floor(a * 1.50);
    }

    // ABL:마조끼をみる
    if (target.abl[21] === 0) {
      a = Math.floor(a * 1.00);
    } else if (target.abl[21] === 1) {
      a = Math.floor(a * 1.10);
    } else if (target.abl[21] === 2) {
      a = Math.floor(a * 1.20);
    } else if (target.abl[21] === 3) {
      a = Math.floor(a * 1.30);
    } else if (target.abl[21] === 4) {
      a = Math.floor(a * 1.40);
    } else {
      a = Math.floor(a * 1.50);
    }

    // 튀고 싶어함
    if (target.talent[28]) {
      a = Math.floor(a * 1.50);
    }
    // 해방
    if (target.talent[33]) {
      a = Math.floor(a * 1.50);
    }

    // 겁쟁이
    if (target.talent[10]) {
      b = Math.floor(b * 1.10);
    }
    // 수줍음
    if (target.talent[35]) {
      b = Math.floor(b * 1.20);
    }

    context.source[12] += a;
    context.source[14] += b;
    context.source[16] += Math.floor(a / 2);

    // ****슬라임パッチ追加ここから****
    if (items[208] >= 1) {
      context.loseBase[0] = Math.floor(context.loseBase[0] * 0.60);
      context.loseBase[1] = Math.floor(context.loseBase[1] * 0.60);
    }
    // ****슬라임パッチ追加ここまで****

    // 정조대は直接選ばないと外せない
    if (target.cflag[42] === 79 && target.cflag[49] === 1 && (target.cflag[40] & 64)) {
      // 정조대만 남기고 알몸으로 만들었다
      target.cflag[40] = 64;
      target.cflag[173] = -1;
    } else {
      // 알몸으로 만들었다
      target.cflag[40] = 0;
      target.cflag[173] = -1;
    }
    flags.TEQUIP[58] = 1;

    return 1;
  },

  async executeEquipped(context: TrainingContext): Promise<void> {
    const { target, player, flags, items, printFn } = context;

    printFn('＜목욕탕 플레이중＞');

    context.loseBase[0] += 20;
    context.loseBase[1] += 50;

    let a = 70;
    let b = 50;

    // PALAM:욕정をみる
    if (target.palam[5] < target.paramlv[1]) {
      a = Math.floor(a * 0.80);
    } else if (target.palam[5] < target.paramlv[2]) {
      a = Math.floor(a * 0.90);
    } else if (target.palam[5] < target.paramlv[3]) {
      a = Math.floor(a * 1.00);
    } else if (target.palam[5] < target.paramlv[4]) {
      a = Math.floor(a * 1.10);
    } else if (target.palam[5] >= target.paramlv[4]) {
      a = Math.floor(a * 1.20);
    }

    // ABL:노출벽をみる
    if (target.abl[17] === 0) {
      context.source[7] += 0;
      context.source[10] += 0;
      a = Math.floor(a * 1.00);
    } else if (target.abl[17] === 1) {
      context.source[7] += 50;
      context.source[10] += 50;
      a = Math.floor(a * 1.10);
    } else if (target.abl[17] === 2) {
      context.source[7] += 80;
      context.source[10] += 80;
      a = Math.floor(a * 1.20);
    } else if (target.abl[17] === 3) {
      context.source[7] += 100;
      context.source[10] += 100;
      a = Math.floor(a * 1.30);
    } else if (target.abl[17] === 4) {
      context.source[7] += 200;
      context.source[10] += 20;
      a = Math.floor(a * 1.40);
    } else {
      context.source[7] += 300;
      context.source[10] += 300;
      a = Math.floor(a * 1.50);
    }

    // ABL:마조끼をみる
    if (target.abl[21] === 0) {
      a = Math.floor(a * 1.00);
    } else if (target.abl[21] === 1) {
      a = Math.floor(a * 1.10);
    } else if (target.abl[21] === 2) {
      a = Math.floor(a * 1.20);
    } else if (target.abl[21] === 3) {
      a = Math.floor(a * 1.30);
    } else if (target.abl[21] === 4) {
      a = Math.floor(a * 1.40);
    } else {
      a = Math.floor(a * 1.50);
    }

    // 튀고 싶어함
    if (target.talent[28]) {
      a = Math.floor(a * 1.50);
    }
    // 해방
    if (target.talent[33]) {
      a = Math.floor(a * 1.50);
    }

    // 겁쟁이
    if (target.talent[10]) {
      b = Math.floor(b * 1.10);
    }
    // 수줍음
    if (target.talent[35]) {
      b = Math.floor(b * 1.20);
    }

    context.source[12] += a;
    context.source[14] += b;
    context.source[16] += Math.floor(a / 2);

    // ****슬라임パッチ追加ここから****
    if (items[208] >= 1) {
      context.loseBase[0] = Math.floor(context.loseBase[0] * 0.60);
      context.loseBase[1] = Math.floor(context.loseBase[1] * 0.60);
    }
    // ****슬라임パッチ追加ここまで****

    if (target.talent[122] === 0 && player.talent[122] === 0) {
      printFn(`${context.getExpName(40)} +1`);
      target.exp[40] += 1;
    } else if (target.talent[122] === 1 && player.talent[122] === 1) {
      printFn(`${context.getExpName(41)} +1`);
      target.exp[41] += 1;
    }

    if (flags.ASSIPLAY === 0 && target.abl[10] >= 1) {
      flags.TFLAG[30] += 1;
    }
    if (flags.ASSIPLAY === 0 && target.abl[16] >= 3) {
      flags.TFLAG[30] += 1;
    }
  }
};
