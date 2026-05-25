// COMF52: 이뇨제 (Diuretic)

import { TrainingCommand } from '../command-interface';
import { TrainingContext } from '../training-context';

export const COMF52_Diuretic: TrainingCommand = {
  id: 52,
  name: '이뇨제',

  async execute(context: TrainingContext): Promise<number> {
    const { target, player, assi, master, savestr, flags, items, printFn } = context;

    printFn('이뇨제');
    savestr[0] = '이뇨제';
    await context.callTrainMessageB();

    // -------------------------------------------------
    // ソースの計算
    // -------------------------------------------------
    context.loseBase[0] += 120;
    context.loseBase[1] += 120;
    // 主人か助手に[조합지식]があれば체력・기력소비를抑える
    if (master.talent[55]) {
      context.loseBase[0] -= 50;
      context.loseBase[1] -= 50;
    } else if (assi && assi.no >= 0) {
      if (assi.talent[55]) {
        context.loseBase[0] -= 50;
        context.loseBase[1] -= 50;
      }
    }
    // 약물경험が多いほど消費체력は減っていく
    if (target.exp[57] < target.explv[1]) {
      context.loseBase[0] += 120;
    } else if (target.exp[57] < target.explv[2]) {
      context.loseBase[0] += 30;
    } else if (target.exp[57] < target.explv[3]) {
      context.loseBase[0] += 0;
    } else if (target.exp[57] < target.explv[5]) {
      context.loseBase[0] -= 30;
    } else {
      context.loseBase[0] -= 40;
    }

    context.source[14] = 2000;
    // 이뇨제効果で軽く変動
    context.source[15] = 150;

    // -------------------------------------------------
    // 経験上昇
    // -------------------------------------------------
    // レズ・ホモ経験
    if (target.talent[122] === 0 && player.talent[122] === 0) {
      printFn(`${context.getExpName(40)} +1`);
      target.exp[40] += 1;
    } else if (target.talent[122] === 1 && player.talent[122] === 1) {
      printFn(`${context.getExpName(41)} +1`);
      target.exp[41] += 1;
    }

    // 약물경험
    printFn(`${context.getExpName(57)}+1`);
    target.exp[57] += 1;

    // -------------------------------------------------
    // その他の処理
    // -------------------------------------------------
    // 이뇨제使用フラグ
    flags.TEQUIP[22] = 1;

    // 아이템消費
    if (flags.TEQUIP[90] === 0) {
      items[27] -= 1;
    }

    return 1;
  }
};
