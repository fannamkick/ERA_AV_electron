// COMF54: 야외 플레이 (Outdoor Play)
// 奴隷を야외に連れて行く

import { TrainingCommand } from '../command-interface';
import { TrainingContext } from '../training-context';

export const COMF54_Outdoor: TrainingCommand = {
  id: 54,
  name: '촬영세트 변경',

  async execute(context: TrainingContext): Promise<number> {
    const { target, player, savestr, flags, printFn, variables } = context;

    printFn('촬영세트 변경');
    savestr[0] = '촬영세트 변경';

    // 屋外への出入り
    // 終了時は修正なし
    if (flags.TEQUIP[54]) {
      flags.TEQUIP[54] = 0;
      return 1;
    }

    if (target.abl[17] <= 4) {
      context.loseBase[1] += 50;
    } else if (target.abl[17] === 5) {
      context.loseBase[1] += 40;
    } else if (target.abl[17] === 6) {
      context.loseBase[1] += 30;
    } else if (target.abl[17] === 7) {
      context.loseBase[1] += 20;
    } else if (target.abl[17] === 8) {
      context.loseBase[1] += 10;
    } else if (target.abl[17] >= 9) {
      context.loseBase[1] += 0;
    }

    let a = 500;
    let b = 500;

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
      a = Math.floor(a * 1.20);
    } else if (target.abl[17] === 2) {
      context.source[7] += 150;
      context.source[10] += 150;
      a = Math.floor(a * 1.40);
    } else if (target.abl[17] === 3) {
      context.source[7] += 400;
      context.source[10] += 400;
      a = Math.floor(a * 1.60);
    } else if (target.abl[17] === 4) {
      context.source[7] += 750;
      context.source[10] += 750;
      a = Math.floor(a * 2.00);
    } else {
      context.source[7] += 1300;
      context.source[10] += 1300;
      a = Math.floor(a * 3.00);
    }

    // ABL:마조끼をみる
    if (target.abl[21] === 0) {
      a = Math.floor(a * 0.80);
    } else if (target.abl[21] === 1) {
      a = Math.floor(a * 1.00);
    } else if (target.abl[21] === 2) {
      a = Math.floor(a * 1.30);
    } else if (target.abl[21] === 3) {
      a = Math.floor(a * 1.60);
    } else if (target.abl[21] === 4) {
      a = Math.floor(a * 2.00);
    } else {
      a = Math.floor(a * 3.00);
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
      b = Math.floor(b * 2.00);
    }
    // 수줍음
    if (target.talent[35]) {
      b = Math.floor(b * 2.00);
    }

    // 노출광
    if (target.talent[89]) {
      a = Math.floor(a * 2.00);
      b = Math.floor(b * 0.50);
    }

    context.source[12] += a;
    context.source[14] += b;
    context.source[16] += Math.floor(a / 2);

    // $INPUT_LOOP_00
    if (flags.TEQUIP[54] === 0) {
      printFn('어디로 갑니까?');
      printFn(' [1] - 야외');
      printFn(' [2] - 교실 세트');
      printFn(' [3] - 수영장');

      const result = await context.getInput();
      if (result === 1) {
        flags.TEQUIP[54] = 1;
      } else if (result === 2) {
        flags.TEQUIP[54] = 2;
      } else if (result === 3) {
        flags.TEQUIP[54] = 3;
      } else {
        // GOTO INPUT_LOOP_00 - recursion handled by re-execution
        return await this.execute(context);
      }
    }

    await context.callTrainMessageB();

    target.exp[12] += 1;
    printFn('야외노출경험 +1');

    // 야외 플레이が始めての場合
    if (flags.TEQUIP[54] && target.cflag[5] === 0) {
      printFn('이상경험 +1');
      target.exp[50] += 1;
      target.cflag[5] = 1;
    }

    return 1;
  },

  // 야외 플레이
  async executeEquipped(context: TrainingContext): Promise<void> {
    const { target, player, flags, printFn, variables } = context;

    if (flags.TEQUIP[54] === 1) {
      printFn('＜야외 플레이중＞');
    } else if (flags.TEQUIP[54] === 2) {
      if (variables.TIME === 0) {
        printFn('＜교실 플레이중(낮)＞');
      } else {
        printFn('＜교실 플레이중(방과후)＞');
      }
    } else if (flags.TEQUIP[54] === 3) {
      printFn('＜야외 플레이중(수영장)＞');
    }

    if (target.abl[17] <= 4) {
      context.loseBase[1] += 50;
    } else if (target.abl[17] === 5) {
      context.loseBase[1] += 40;
    } else if (target.abl[17] === 6) {
      context.loseBase[1] += 30;
    } else if (target.abl[17] === 7) {
      context.loseBase[1] += 20;
    } else if (target.abl[17] === 8) {
      context.loseBase[1] += 10;
    } else if (target.abl[17] >= 9) {
      context.loseBase[1] += 0;
    }

    if (flags.TEQUIP[54] === 1) {
      target.exp[12] += 1;
      printFn('야외노출경험 +1');
    }

    let a = 500;
    let b = 500;

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
      a = Math.floor(a * 1.20);
    } else if (target.abl[17] === 2) {
      context.source[7] += 150;
      context.source[10] += 150;
      a = Math.floor(a * 1.40);
    } else if (target.abl[17] === 3) {
      context.source[7] += 400;
      context.source[10] += 400;
      a = Math.floor(a * 1.60);
    } else if (target.abl[17] === 4) {
      context.source[7] += 750;
      context.source[10] += 750;
      a = Math.floor(a * 2.00);
    } else {
      context.source[7] += 1300;
      context.source[10] += 1300;
      a = Math.floor(a * 3.00);
    }

    // ABL:마조끼をみる
    if (target.abl[21] === 0) {
      a = Math.floor(a * 0.80);
    } else if (target.abl[21] === 1) {
      a = Math.floor(a * 1.00);
    } else if (target.abl[21] === 2) {
      a = Math.floor(a * 1.30);
    } else if (target.abl[21] === 3) {
      a = Math.floor(a * 1.60);
    } else if (target.abl[21] === 4) {
      a = Math.floor(a * 2.00);
    } else {
      a = Math.floor(a * 3.00);
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
      b = Math.floor(b * 2.00);
    }
    // 수줍음
    if (target.talent[35]) {
      b = Math.floor(b * 2.00);
    }
    // 노출광
    if (target.talent[89]) {
      a = Math.floor(a * 2.00);
      b = Math.floor(b * 0.50);
    }

    context.source[12] += a;
    context.source[14] += b;
    context.source[16] += Math.floor(a / 2);

    // ---------------------------------------------
    // レズ・ホモ経験の追加
    // ---------------------------------------------
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
