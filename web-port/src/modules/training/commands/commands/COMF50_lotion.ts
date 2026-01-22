// COMF50: 로션 (Lotion)

import { TrainingCommand } from '../command-interface';
import { TrainingContext } from '../training-context';

export const COMF50_Lotion: TrainingCommand = {
  id: 50,
  name: '로션',

  async execute(context: TrainingContext): Promise<number> {
    const { target, player, savestr, items, printFn } = context;

    printFn('로션');
    savestr[0] = '로션';
    await context.callTrainMessageB();

    context.loseBase[0] += 0;
    context.loseBase[1] += 5;

    context.source[9] = 10000;
    context.source[12] = 300;

    items[25] -= 1;

    if (target.talent[122] === 0 && player.talent[122] === 0) {
      printFn(`${context.getExpName(40)} +1`);
      target.exp[40] += 1;
    } else if (target.talent[122] === 1 && player.talent[122] === 1) {
      printFn(`${context.getExpName(41)} +1`);
      target.exp[41] += 1;
    }

    return 1;
  }
};
