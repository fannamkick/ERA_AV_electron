// COMF42: 바늘 (Needle)
// SM系コマンド

import { TrainingCommand } from '../command-interface';
import { TrainingContext } from '../training-context';

export const COMF42_Needle: TrainingCommand = {
  id: 42,
  name: '바늘',

  async execute(context: TrainingContext): Promise<number> {
    const { target, player, savestr, flags, printFn, items } = context;

    printFn('바늘');
    savestr[0] = '바늘';
    await context.callTrainMessageB();

    // 実際には苦痛があるためもっと체력기력をもっていかれる
    context.loseBase[0] += 0;
    context.loseBase[1] += 20;

    // -------------------------------------------------
    // ソースの計算
    // -------------------------------------------------
    context.source[14] = 1000;

    // PALAM:苦痛をみる
    if (target.palam[9] < target.paramlv[1]) {
      context.source[6] = 3000;
    } else if (target.palam[9] < target.paramlv[2]) {
      context.source[6] = 3300;
    } else if (target.palam[9] < target.paramlv[3]) {
      context.source[6] = 3600;
    } else if (target.palam[9] < target.paramlv[4]) {
      context.source[6] = 4000;
    } else if (target.palam[9] >= target.paramlv[4]) {
      context.source[6] = 4500;
    }

    // ****슬라임パッチ追加ここから****
    if (items[207] >= 1 && flags.TEQUIP[90] === 0) {
      context.loseBase[0] = Math.floor(context.loseBase[0] * 0.80);
      context.loseBase[1] = Math.floor(context.loseBase[1] * 0.80);
      context.source[6] = Math.floor(context.source[6] * 1.50);
      context.source[14] = Math.floor(context.source[14] * 0.80);
    }
    // ****슬라임パッチ追加ここまで****

    // -------------------------------------------------
    // 経験上昇
    // -------------------------------------------------
    if (target.talent[122] === 0 && player.talent[122] === 0) {
      printFn(`${context.getExpName(40)} +2`);
      target.exp[40] += 2;
    } else if (target.talent[122] === 1 && player.talent[122] === 1) {
      printFn(`${context.getExpName(41)} +2`);
      target.exp[41] += 2;
    }

    if (flags.ASSIPLAY === 0 && target.abl[21] >= 3) {
      flags.TFLAG[30] += 1;
    }

    // 애정경험
    let e = 1;
    if (target.cflag[2] >= 1000 && (target.abl[21] >= 3 || target.talent[88]) && flags.ASSIPLAY === 0) {
      printFn(`${context.getExpName(23)}+${e}`);
      target.exp[23] += e;
    }
    e = 0;

    return 1;
  }
};
