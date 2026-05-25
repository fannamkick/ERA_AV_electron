// COMF56: 대화한다 (Talk/Conversation)

import { TrainingCommand } from '../command-interface';
import { TrainingContext } from '../training-context';

export const COMF56_Talk: TrainingCommand = {
  id: 56,
  name: '대화한다',

  async execute(context: TrainingContext): Promise<number> {
    const { target, player, assi, savestr, flags, printFn } = context;

    // 비디오 촬영중なら자기소개에
    if (flags.TEQUIP[53]) {
      printFn('자기소개');
    } else {
      printFn('대화한다');
    }
    savestr[0] = '대화한다';
    await context.callTrainMessageB();

    // -------------------------------------------------
    // ソースの計算
    // -------------------------------------------------
    // 愛の有無と従順のLvによって変化
    if (target.talent[85] === 1 && target.abl[10] >= 5) {
      context.loseBase[0] += 10;
      context.loseBase[1] += 50;
    } else if (target.talent[85] === 1) {
      context.loseBase[0] += 10;
      context.loseBase[1] += 50;
    } else if (target.abl[10] >= 3) {
      context.loseBase[0] += 50;
      context.loseBase[1] += 100;
    } else {
      context.loseBase[0] += 100;
      context.loseBase[1] += 200;
    }

    // 愛の有無と従順のLvによって上昇するソースが変化
    if (target.talent[85]) {
      context.source[16] = 60;
    } else if (target.abl[10] >= 5) {
      context.source[15] = 10;
      context.source[16] = 50;
    } else if (target.abl[10] >= 4) {
      context.source[15] = 20;
      context.source[16] = 40;
    } else if (target.abl[10] >= 3) {
      context.source[15] = 30;
      context.source[16] = 30;
    } else if (target.abl[10] >= 2) {
      context.source[15] = 40;
      context.source[16] = 20;
    } else {
      context.source[15] = 50;
      context.source[16] = 10;
    }

    // PALAM:온순をみる
    if (target.palam[4] < target.paramlv[1]) {
      context.source[16] += 10;
    } else if (target.palam[4] < target.paramlv[2]) {
      context.source[16] += 30;
    } else if (target.palam[4] < target.paramlv[3]) {
      context.source[16] += 60;
    } else if (target.palam[4] < target.paramlv[4]) {
      context.source[16] += 100;
    } else if (target.palam[4] >= target.paramlv[4]) {
      context.source[16] += 150;
    }

    // 봉사정신をみる
    if (target.abl[16] === 0) {
      context.source[16] += 0;
    } else if (target.abl[16] === 1) {
      context.source[16] += 20;
    } else if (target.abl[16] === 2) {
      context.source[16] += 40;
    } else if (target.abl[16] === 3) {
      context.source[16] += 70;
    } else if (target.abl[16] === 4) {
      context.source[16] += 110;
    } else {
      context.source[16] += 150;
    }

    // 화술をみる
    if (target.abl[15] === 0) {
      context.source[16] = Math.floor(context.source[16] * 0.90);
    } else if (target.abl[15] === 1) {
      context.source[16] = Math.floor(context.source[16] * 1.00);
    } else if (target.abl[15] === 2) {
      context.source[16] = Math.floor(context.source[16] * 1.10);
    } else if (target.abl[15] === 3) {
      context.source[16] = Math.floor(context.source[16] * 1.20);
    } else if (target.abl[15] === 4) {
      context.source[16] = Math.floor(context.source[16] * 1.30);
    } else {
      context.source[16] = Math.floor(context.source[16] * 1.40);
    }

    // 비디오 촬영중だと자기소개に
    if (flags.TEQUIP[53]) {
      context.source[12] = 1000;

      // 노출벽をみる
      if (target.abl[17] === 0) {
        context.source[4] = 0;
      } else if (target.abl[17] === 1) {
        context.source[4] = 10;
      } else if (target.abl[17] === 2) {
        context.source[4] = 50;
      } else if (target.abl[17] === 3) {
        context.source[4] = 100;
      } else if (target.abl[17] === 4) {
        context.source[4] = 200;
        context.source[10] += 50;
      } else if (target.abl[17] >= 5) {
        context.source[4] = 400;
        context.source[10] += 100;
      }

      // 튀고 싶어함
      if (target.talent[28]) {
        context.source[4] = Math.floor(context.source[4] * 1.20);
        context.source[12] = Math.floor(context.source[12] * 1.20);
      }

      // 노출광
      if (target.talent[89]) {
        context.source[4] = Math.floor(context.source[4] * 1.60);
        context.source[12] = Math.floor(context.source[12] * 1.60);
        context.source[10] = Math.floor(context.source[10] * 1.60);
      }

      // 자기소개成功フラグを立てる
      if (target.talent[89] || target.talent[85] || target.abl[10] >= 3 || target.abl[11] >= 4 || target.abl[17] >= 2) {
        flags.TFLAG[32] |= 2;
      }
    }

    // -------------------------------------------------
    // 経験の処理
    // -------------------------------------------------
    // 調教会화경험
    // PALAM:온순をみる
    let e: number;
    if (target.palam[4] < target.paramlv[1]) {
      e = 1;
    } else if (target.palam[4] < target.paramlv[2]) {
      e = 1;
    } else if (target.palam[4] < target.paramlv[3]) {
      e = 1;
    } else if (target.palam[4] < target.paramlv[4]) {
      e = 1;
    } else {
      e = 1;
    }

    // 愛
    if (target.talent[85] && flags.ASSIPLAY === 0) {
      e *= 2;
    }

    // 話し手の화술をみる
    if (player.abl[15] === 0) {
      e += 0;
    } else if (player.abl[15] === 1) {
      e += 1;
    } else if (player.abl[15] === 2) {
      e += 1;
    } else if (player.abl[15] === 3) {
      e += 1;
    } else if (player.abl[15] === 4) {
      e += 1;
    } else if (player.abl[15] >= 5) {
      e += 1;
    }

    printFn(`${context.getExpName(73)} +${e}`);
    target.exp[73] += e;

    // 歌唱技術を見る
    if (target.abl[71] > 1 && e > 2) {
      printFn(`${context.getExpName(71)}+${e + target.abl[71] - 2}`);
      target.exp[71] += (e + target.abl[71] - 3);
    }
    // 무용技術を見る
    if (target.abl[72] > 1 && flags.TEQUIP[54] && e > 2) {
      printFn(`${context.getExpName(72)}+${e + target.abl[72] - 2}`);
      target.exp[72] += (e + target.abl[72] - 3);
    }

    // 애정경험
    if (target.cflag[2] >= 1000 && flags.ASSIPLAY === 0) {
      printFn(`${context.getExpName(23)}+${e}`);
      target.exp[23] += e;
    }

    e = 0;

    return 1;
  }
};
