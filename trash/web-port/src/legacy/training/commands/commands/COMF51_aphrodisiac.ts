// COMF51: 미약 (Aphrodisiac)
// しあわせ草(미약)
// 他のeraシリーズでは미약にあたるアイテム
// CFLAG:31=体内미약残留度
// CFLAG:32=しあわせ中毒の禁断症状判定

import { TrainingCommand } from '../command-interface';
import { TrainingContext } from '../training-context';

export const COMF51_Aphrodisiac: TrainingCommand = {
  id: 51,
  name: '미약',

  async execute(context: TrainingContext): Promise<number> {
    const { target, player, assi, master, savestr, flags, items, printFn } = context;

    printFn('미약');
    savestr[0] = '미약';
    await context.callTrainMessageB();

    // -------------------------------------------------
    // ソースの計算
    // -------------------------------------------------
    context.loseBase[0] += 300;
    context.loseBase[1] += 300;
    // 主人か助手に[조합지식]があれば체력・기력소비를抑える
    if (master.talent[55]) {
      context.loseBase[0] -= 150;
      context.loseBase[1] -= 150;
    } else if (assi && assi.no >= 0) {
      if (assi.talent[55]) {
        context.loseBase[0] -= 150;
        context.loseBase[1] -= 150;
      }
    }
    // 약물경험が多いほど消費체력は減っていく
    if (target.exp[57] < target.explv[1]) {
      context.loseBase[0] += 300;
    } else if (target.exp[57] < target.explv[2]) {
      context.loseBase[0] += 50;
    } else if (target.exp[57] < target.explv[3]) {
      context.loseBase[0] += 0;
    } else if (target.exp[57] < target.explv[5]) {
      context.loseBase[0] -= 50;
    } else {
      context.loseBase[0] -= 100;
    }

    context.source[14] = 2000;

    // しあわせ草中毒なら체력소비を抑えかつ効果も上げる
    if (target.talent[46]) {
      context.loseBase[0] -= 100;
      context.source[7] = 500;
      context.source[14] = 1000;
      // 미약効果で欲情のアップが2倍になるので実際には+20000
      context.source[11] = 10000;
    } else {
      context.source[14] = 2000;
      // 미약効果で欲情のアップが2倍になるので実際には+10000
      context.source[11] = 5000;
    }

    // 체력소비が0以下になるという事はない
    if (context.loseBase[0] < 0) {
      context.loseBase[0] = 0;
    }

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
    printFn(`${context.getExpName(57)} +1`);
    target.exp[57] += 1;

    // -------------------------------------------------
    // その他の処理
    // -------------------------------------------------
    // しあわせ草使用フラグ
    flags.TEQUIP[21] = 1;

    // 아이템消費
    if (flags.TEQUIP[90] === 0) {
      items[26] -= 1;
    }

    // しあわせ草残留濃度
    target.cflag[31] += 1;

    // しあわせ中毒なら禁断症状回避フラグを立てる
    if (target.talent[46]) {
      target.cflag[32] = 1;
    }

    return 1;
  }
};
