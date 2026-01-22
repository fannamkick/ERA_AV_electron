/**
 * ABLUP23.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function ablup23(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.talents[122] == 0) {
    return 0;
  }
  ctx.drawLine();
  if (ctx.abilities[23] >= 5 && (ctx.talents[33] === 0 && ctx.talents[80] === 0 && ctx.talents[81] === 0 && ctx.talents[123] === 0)) {
    ctx.showMessage('이 이상 올리려면 소질이 필요합니다'); ctx.waitInput();
    return 0;
  } else if (ctx.abilities[23] >= 10) {
    ctx.showMessage('이미 MAX입니다'); ctx.waitInput();
    return 0;
  }
  A = 0;
  B = 0;
  C = 0;
  D = 0;
  E = 0;
  I = 0;
  J = 0;
  await decide_ablup23(ctx, character);
  if (E > 0) {
    ctx.showMessage(`${ctx.getVarName("EXP", 50)}{E}이상 (현재${ctx.exp[50]}) 그리고`);
  }
  ctx.showMessage(`[0] - ${ctx.getVarName("PALAM", 5)}의 구슬×${ctx.juel[5]}/${A} ……`);
  if (I === 0) {
    ctx.print('OK');
  } else {
    if (I & 1) {
      ctx.print('구슬부족');
    }
    if (I & 2) {
      ctx.print('경험부족');
    }
    if (I & 4) {
      ctx.print('능력부족');
    }
  }
  ctx.showMessage('');
  if (C > 0) {
    ctx.showMessage(`　　　${ctx.getVarName("PALAM", 6)}의 구슬×${ctx.juel[6]}/{C}`);
  }
  ctx.showMessage(`　　　${ctx.getVarName("EXP", 41)}　${ctx.exp[41]}/{B}`);
  if (D > 0) {
    ctx.showMessage(`[1] - ${ctx.getVarName("PALAM", 2)}의 구슬×${ctx.juel[2]}/{D} ……`);
    if (J === 0) {
      ctx.print('OK');
    } else {
      if (J & 1) {
        ctx.print('구슬부족');
      }
      if (J & 2) {
        ctx.print('경험부족');
      }
      if (J & 4) {
        ctx.print('능력부족');
      }
    }
    ctx.showMessage('');
    ctx.showMessage(`　　　${ctx.getVarName("EXP", 41)}　${ctx.exp[41]}/{B}`);
  }
  ctx.showMessage('[100] - 그만둔다');
  await ctx.inputNumber();
  if ((ctx.result < 0 || ctx.result > 1) && ctx.result != 100) {
    ctx.restart();
  } else if (I != 0 && ctx.result === 0) {
    ctx.showMessage('조건을 만족하지 않았습니다');
    ctx.restart();
  } else if (J === 256 && ctx.result === 1) {
    ctx.restart();
  } else if (J != 0 && ctx.result === 1) {
    ctx.showMessage('조건을 만족하지 않았습니다');
    ctx.restart();
  } else if (ctx.result === 100) {
    return 0;
  }
  ctx.abilities[23] += 1;
  if (ctx.result === 0) {
    ctx.juel[5] -= A;
    ctx.juel[6] -= C;
  } else if (ctx.result === 1) {
    ctx.juel[2] -= D;
  }
  ctx.showMessage(`${ctx.getVarName("ABL", 23)}의 레벨이 %조사처리(ABL:23,"가")% 되었습니다`);
  return 0;
}

export async function decide_ablup23(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.talents[122] == 0) {
    return 0;
  }
  if (ctx.abilities[23] >= 5 && (ctx.talents[33] == 0 && ctx.talents[80] == 0 && ctx.talents[81] == 0 && ctx.talents[123] == 0)) {
    return 0;
  }
  if (ctx.abilities[23] >= 10) {
    return 0;
  }
  I = 0;
  J = 0;
  A = 0;
  B = 0;
  C = 0;
  D = 0;
  E = 0;
  if (ctx.abilities[23] === 0) {
    A = 200;
    B = 50;
    C = 0;
    D = 1000;
  } else if (ctx.abilities[23] === 1) {
    A = 1000;
    B = 150;
    C = 0;
    D = 5000;
  } else if (ctx.abilities[23] === 2) {
    A = 3000;
    B = 300;
    C = 1000;
    D = 0;
  } else if (ctx.abilities[23] === 3) {
    A = 8000;
    B = 500;
    C = 2000;
    D = 0;
  } else if (ctx.abilities[23] === 4) {
    A = 20000;
    B = 800;
    C = 5000;
    D = 0;
  } else if (ctx.abilities[23] === 5) {
    A = 40000;
    B = 1200;
    C = 10000;
    D = 0;
  } else if (ctx.abilities[23] === 6) {
    A = 80000;
    B = 1800;
    C = 13000;
    D = 0;
  } else if (ctx.abilities[23] === 7) {
    A = 150000;
    B = 2600;
    C = 18000;
    D = 0;
  } else if (ctx.abilities[23] === 8) {
    A = 200000;
    B = 3600;
    C = 30000;
    D = 0;
  } else if (ctx.abilities[23] === 9) {
    A = 300000;
    B = 5000;
    C = 50000;
    D = 0;
  }
  if (ctx.talents[27]) {
    if (ctx.abilities[23] === 3) {
      ctx.times('A', 1.50);
      ctx.times('B', 1.50);
      ctx.times('C', 1.50);
    } else if (ctx.abilities[23] === 4) {
      ctx.times('A', 2.00);
      ctx.times('B', 2.00);
      ctx.times('C', 2.00);
    } else if (ctx.abilities[23] === 5) {
      ctx.times('A', 2.50);
      ctx.times('B', 2.50);
      ctx.times('C', 2.50);
    } else if (ctx.abilities[23] >= 6) {
      ctx.times('A', 3.00);
      ctx.times('B', 3.00);
      ctx.times('C', 3.00);
    }
  }
  if (ctx.abilities[23] >= 3 && (ctx.talents[33] == 0 && ctx.talents[80] == 0 && ctx.talents[81] == 0 && ctx.talents[123] == 0)) {
    E = ctx.abilities[23] - 2;
  }
  if (ctx.talents[13]) {
    ctx.times('A', 0.95);
    ctx.times('B', 0.95);
    ctx.times('C', 0.95);
    ctx.times('D', 0.95);
  }
  if (ctx.talents[21]) {
    ctx.times('A', 1.20);
    ctx.times('B', 1.20);
    ctx.times('C', 1.20);
    ctx.times('D', 1.20);
  }
  if (ctx.talents[23]) {
    ctx.times('A', 0.95);
    ctx.times('B', 0.95);
    ctx.times('C', 0.95);
    ctx.times('D', 0.95);
  }
  if (ctx.talents[24]) {
    ctx.times('A', 1.20);
    ctx.times('B', 1.20);
    ctx.times('C', 1.20);
    ctx.times('D', 1.20);
  }
  if (ctx.talents[30]) {
    ctx.times('A', 1.20);
    ctx.times('B', 1.20);
    ctx.times('C', 1.20);
    ctx.times('D', 1.20);
  } else if (ctx.talents[31]) {
    ctx.times('A', 0.95);
    ctx.times('B', 0.95);
    ctx.times('C', 0.95);
    ctx.times('D', 0.95);
  }
  if (ctx.talents[82]) {
    ctx.times('A', 3.00);
    ctx.times('B', 3.00);
    ctx.times('C', 3.00);
    ctx.times('D', 3.00);
  }
  if (ctx.talents[63]) {
    ctx.times('A', 0.95);
    ctx.times('B', 0.95);
    ctx.times('C', 0.95);
    ctx.times('D', 0.95);
  }
  if (ctx.talents[70]) {
    ctx.times('A', 0.95);
    ctx.times('B', 0.95);
    ctx.times('C', 0.95);
    ctx.times('D', 0.95);
  } else if (ctx.talents[71]) {
    ctx.times('A', 1.20);
    ctx.times('B', 1.20);
    ctx.times('C', 1.20);
    ctx.times('D', 1.20);
  }
  if (ctx.talents[80]) {
    ctx.times('A', 0.80);
    ctx.times('B', 0.80);
    ctx.times('C', 0.80);
    ctx.times('D', 0.80);
  }
  if (ctx.talents[81]) {
    ctx.times('A', 0.50);
    ctx.times('B', 0.50);
    ctx.times('C', 0.50);
    ctx.times('D', 0.50);
  }
  if (ctx.talents[123]) {
    ctx.times('A', 0.50);
    ctx.times('B', 0.50);
    ctx.times('C', 0.50);
    ctx.times('D', 0.50);
  }
  if (A < 1) {
    A = 1;
  }
  if (B < 1) {
    B = 1;
  }
  if (ctx.exp[50] < E) {
    I |= 2;
    J |= 2;
  }
  if (ctx.juel[5] < A) {
    I |= 1;
  }
  if (ctx.juel[6] < C) {
    I |= 1;
  }
  if (ctx.exp[41] < B) {
    I |= 2;
  }
  if (D > 0) {
    if (ctx.juel[2] < D) {
      J |= 1;
    }
    if (ctx.exp[41] < B) {
      J |= 2;
    }
  } else {
    J = 256;
  }
  if (I === 0 || J === 0) {
    return 1;
  } else {
    return 0;
  }
}
