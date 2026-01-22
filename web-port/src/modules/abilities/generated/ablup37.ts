/**
 * ABLUP37.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function ablup37(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine();
  if (ctx.abilities[37] >= 5 && (ctx.talents[76] === 0 && ctx.talents[31] === 0 && ctx.talents[180] === 0)) {
    ctx.showMessage('이 이상 올리려면 소질이 필요합니다'); ctx.waitInput();
    return 0;
  } else if (ctx.abilities[37] >= 10) {
    ctx.showMessage('이미 MAX입니다'); ctx.waitInput();
    return 0;
  }
  A = 0;
  B = 0;
  C = 0;
  D = 0;
  F = 0;
  I = 0;
  await decide_ablup37(ctx, character);
  if (F > 0) {
    ctx.showMessage(`${ctx.getVarName("EXP", 50)}{F}이상 (현재${ctx.exp[50]}) 그리고`);
  }
  ctx.showMessage(`${ctx.getVarName("ABL", 11)}${ctx.abilities[37] + 1}LV이상 (현재${ctx.abilities[11]}LV) 그리고`);
  ctx.showMessage(`[0] - ${ctx.getVarName("PALAM", 4)}의 구슬×${ctx.juel[4]}/${A} ……`);
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
  ctx.showMessage(`　　　${ctx.getVarName("PALAM", 5)}의 구슬×${ctx.juel[5]}/{B}`);
  ctx.showMessage(`　　　${ctx.getVarName("PALAM", 6)}의 구슬×${ctx.juel[6]}/{C}`);
  ctx.showMessage(`　　　${ctx.getVarName("EXP", 74)}　${ctx.exp[74]}/{D}`);
  ctx.showMessage('[100] - 그만둔다');
  await ctx.inputNumber();
  if (ctx.result != 0 && ctx.result != 100) {
    ctx.restart();
  } else if (I != 0 && ctx.result === 0) {
    ctx.showMessage('조건을 만족하지 않았습니다');
    ctx.restart();
  } else if (ctx.result === 100) {
    return 0;
  }
  ctx.abilities[37] += 1;
  if (ctx.result === 0) {
    ctx.juel[4] -= A;
    ctx.juel[5] -= B;
    ctx.juel[6] -= C;
  }
  ctx.showMessage(`${ctx.getVarName("ABL", 37)}의 레벨이 %조사처리(ABL:37,"가")% 되었습니다`);
  return 0;
}

export async function decide_ablup37(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.abilities[37] >= 5 && (ctx.talents[76] == 0 && ctx.talents[31] == 0 && ctx.talents[180] == 0)) {
    return 0;
  }
  I = 0;
  A = 0;
  B = 0;
  C = 0;
  D = 0;
  F = 0;
  if (ctx.abilities[37] === 0) {
    A = 2000;
    B = 3000;
    C = 1000;
    D = 50;
  } else if (ctx.abilities[37] === 1) {
    A = 5000;
    B = 8000;
    C = 2500;
    D = 100;
  } else if (ctx.abilities[37] === 2) {
    A = 8000;
    B = 15000;
    C = 5500;
    D = 150;
  } else if (ctx.abilities[37] === 3) {
    A = 14000;
    B = 30000;
    C = 10000;
    D = 250;
  } else if (ctx.abilities[37] === 4) {
    A = 22000;
    B = 50000;
    C = 20000;
    D = 400;
  } else if (ctx.abilities[37] === 5) {
    A = 34000;
    B = 80000;
    C = 30000;
    D = 500;
  } else if (ctx.abilities[37] === 6) {
    A = 55000;
    B = 120000;
    C = 50000;
    D = 800;
  } else if (ctx.abilities[37] === 7) {
    A = 80000;
    B = 180000;
    C = 60000;
    D = 1200;
  } else if (ctx.abilities[37] === 8) {
    A = 150000;
    B = 300000;
    C = 90000;
    D = 2000;
  } else if (ctx.abilities[37] === 9) {
    A = 300000;
    B = 600000;
    C = 150000;
    D = 3000;
  }
  if (ctx.talents[27]) {
    if (ctx.abilities[37] === 3) {
      ctx.times('A', 1.50);
      ctx.times('B', 1.50);
      ctx.times('C', 1.50);
      ctx.times('D', 1.50);
    } else if (ctx.abilities[37] === 4) {
      ctx.times('A', 2.00);
      ctx.times('B', 2.00);
      ctx.times('C', 2.00);
      ctx.times('D', 2.00);
    } else if (ctx.abilities[37] === 5) {
      ctx.times('A', 2.50);
      ctx.times('B', 2.50);
      ctx.times('C', 2.50);
      ctx.times('D', 2.50);
    } else if (ctx.abilities[37] >= 6) {
      ctx.times('A', 3.00);
      ctx.times('B', 3.00);
      ctx.times('C', 3.00);
      ctx.times('D', 3.00);
    }
  }
  if (ctx.talents[11]) {
    ctx.times('A', 1.50);
    ctx.times('B', 1.50);
    ctx.times('C', 1.50);
    ctx.times('D', 1.50);
  }
  if (ctx.talents[12]) {
    ctx.times('A', 1.20);
    ctx.times('B', 1.20);
    ctx.times('C', 1.20);
    ctx.times('D', 1.20);
  }
  if (ctx.talents[20]) {
    ctx.times('A', 1.50);
    ctx.times('B', 1.50);
    ctx.times('C', 1.50);
    ctx.times('D', 1.50);
  }
  if (ctx.talents[24]) {
    ctx.times('A', 1.50);
    ctx.times('B', 1.50);
    ctx.times('C', 1.50);
    ctx.times('D', 1.50);
  }
  if (ctx.talents[26]) {
    ctx.times('A', 0.90);
    ctx.times('B', 0.90);
    ctx.times('C', 0.90);
    ctx.times('D', 0.90);
  }
  if (ctx.talents[28]) {
    ctx.times('A', 0.90);
    ctx.times('B', 0.90);
    ctx.times('C', 0.90);
    ctx.times('D', 0.90);
  }
  if (ctx.talents[30]) {
    ctx.times('A', 2.00);
    ctx.times('B', 2.00);
    ctx.times('C', 2.00);
    ctx.times('D', 2.00);
  } else if (ctx.talents[31]) {
    ctx.times('A', 0.90);
    ctx.times('B', 0.90);
    ctx.times('C', 0.90);
    ctx.times('D', 0.90);
  }
  if (ctx.talents[32]) {
    ctx.times('A', 1.20);
    ctx.times('B', 1.20);
    ctx.times('C', 1.20);
    ctx.times('D', 1.20);
  } else if (ctx.talents[33]) {
    ctx.times('A', 0.80);
    ctx.times('B', 0.80);
    ctx.times('C', 0.80);
    ctx.times('D', 0.80);
  }
  if (ctx.talents[34]) {
    ctx.times('A', 2.00);
    ctx.times('B', 2.00);
    ctx.times('C', 2.00);
    ctx.times('D', 2.00);
  }
  if (ctx.talents[35]) {
    ctx.times('A', 1.10);
    ctx.times('B', 1.10);
    ctx.times('C', 1.10);
    ctx.times('D', 1.10);
  } else if (ctx.talents[36]) {
    ctx.times('A', 0.90);
    ctx.times('B', 0.90);
    ctx.times('C', 0.90);
    ctx.times('D', 0.90);
  }
  if (ctx.talents[63]) {
    ctx.times('A', 0.90);
    ctx.times('B', 0.90);
    ctx.times('C', 0.90);
    ctx.times('D', 0.90);
  }
  if (ctx.talents[72]) {
    ctx.times('A', 0.50);
    ctx.times('B', 0.50);
    ctx.times('C', 0.50);
    ctx.times('D', 0.50);
  }
  if (ctx.talents[76]) {
    ctx.times('A', 0.80);
    ctx.times('B', 0.50);
    ctx.times('C', 0.80);
    ctx.times('D', 0.80);
  }
  if (ctx.talents[82]) {
    ctx.times('A', 3.00);
    ctx.times('B', 3.00);
    ctx.times('C', 3.00);
    ctx.times('D', 3.00);
  }
  if (ctx.talents[85]) {
    ctx.times('A', 1.50);
    ctx.times('B', 1.50);
    ctx.times('C', 1.50);
    ctx.times('D', 1.50);
  }
  if (ctx.talents[153]) {
    ctx.times('A', 2.00);
    ctx.times('B', 2.00);
    ctx.times('C', 2.00);
    ctx.times('D', 2.00);
  }
  if (ctx.talents[123]) {
    ctx.times('A', 0.50);
    ctx.times('B', 0.50);
    ctx.times('C', 0.50);
    ctx.times('D', 0.50);
  }
  if (ctx.talents[9]) {
    ctx.times('A', 0.80);
    ctx.times('B', 0.80);
    ctx.times('C', 0.80);
    ctx.times('D', 0.80);
  }
  if (ctx.talents[180]) {
    ctx.times('A', 0.80);
    ctx.times('B', 0.80);
    ctx.times('C', 0.80);
    ctx.times('D', 0.80);
  }
  if (ctx.talents[181]) {
    ctx.times('A', 0.50);
    ctx.times('B', 0.50);
    ctx.times('C', 0.50);
    ctx.times('D', 0.50);
  }
  if (ctx.talents[183]) {
    ctx.times('A', 0.90);
    ctx.times('B', 0.90);
    ctx.times('C', 0.90);
    ctx.times('D', 0.90);
  }
  if (ctx.talents[184]) {
    ctx.times('A', 2.00);
    ctx.times('B', 2.00);
    ctx.times('C', 2.00);
    ctx.times('D', 2.00);
  }
  if (ctx.abilities[37] >= 2 && (ctx.talents[123] === 0 && ctx.talents[9] === 0)) {
    F = ctx.abilities[37] - 1;
    if (ctx.talents[33]) {
      F -= 1;
    }
    if (ctx.talents[70]) {
      F -= 1;
    }
    if (ctx.talents[72]) {
      F -= 2;
    }
    if (ctx.talents[73]) {
      F -= 1;
    }
    if (ctx.talents[76]) {
      F -= 1;
    }
    if (ctx.talents[80]) {
      F -= 1;
    }
    if (ctx.talents[180]) {
      F -= 1;
    }
    if (ctx.talents[181]) {
      F -= 2;
    }
    if (ctx.talents[11]) {
      F += 1;
    }
    if (ctx.talents[20]) {
      F += 1;
    }
    if (ctx.talents[32]) {
      F += 1;
    }
    if (ctx.talents[34]) {
      F += 1;
    }
    if (ctx.talents[71]) {
      F += 1;
    }
    if (ctx.talents[85]) {
      F += 1;
    }
    if (ctx.talents[184]) {
      F += 2;
    }
    if (F < 0) {
      F = 0;
    }
    if (ctx.exp[50] < F) {
      I |= 2;
      J |= 2;
    }
  }
  if (A < 1) {
    A = 1;
  }
  if (B < 1) {
    B = 1;
  }
  if (C < 1) {
    C = 1;
  }
  if (D < 1) {
    D = 1;
  }
  if (ctx.abilities[11] < ctx.abilities[37] + 1) {
    I |= 4;
    J |= 4;
  }
  if (ctx.juel[4] < A) {
    I |= 1;
  }
  if (ctx.juel[5] < B) {
    I |= 1;
  }
  if (ctx.juel[6] < C) {
    I |= 1;
  }
  if (ctx.exp[74] < D) {
    I |= 2;
  }
  if (I === 0) {
    return 1;
  } else {
    return 0;
  }
}
