// COMF40: 스팽킹 (Spanking)
// SM系コマンド

import { TrainingCommand } from '../command-interface';
import { TrainingContext } from '../training-context';
import { checkCommandAvailable } from '../command-availability';

export const COMF40_Spanking: TrainingCommand = {
  id: 40,
  name: '스팽킹',

  async execute(context: TrainingContext): Promise<number> {
    const { target, player, assi, savestr, prevcom, flags, printFn } = context;

    // 前回と今回の調教者が同じ
    if ((flags.ASSIPLAY && flags.TFLAG[50]) || (flags.ASSIPLAY === 0 && flags.TFLAG[50] === 0)) {
      // 前回の調教が후배위, 후배위・가슴애무, 서서삽입, 후배위SPだと후배위・스팽킹に
      if (prevcom === 21 || prevcom === 131 || prevcom === 133 || prevcom === 134) {
        const able132 = await checkCommandAvailable(context, 132);
        if (able132 === 1) {
          // JUMP COM132
          return 132;
        }
      }
    }

    printFn('스팽킹');
    savestr[0] = '스팽킹';
    await context.callTrainMessageB();

    // 実際には苦痛があるためもっと체력기력をもっていかれる
    context.loseBase[0] += 80;
    context.loseBase[1] += 40;

    // -------------------------------------------------
    // ソースの計算
    // -------------------------------------------------
    context.source[12] = 200;
    context.source[14] = 500;

    // PALAM:苦痛をみる
    if (target.palam[9] < target.paramlv[1]) {
      context.source[6] = 300;
    } else if (target.palam[9] < target.paramlv[2]) {
      context.source[6] = 500;
    } else if (target.palam[9] < target.paramlv[3]) {
      context.source[6] = 800;
    } else if (target.palam[9] < target.paramlv[4]) {
      context.source[6] = 1200;
    } else if (target.palam[9] >= target.paramlv[4]) {
      context.source[6] = 1800;
    }

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

    if (flags.ASSIPLAY === 0 && target.abl[21] >= 1) {
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
