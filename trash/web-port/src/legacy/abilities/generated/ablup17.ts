/**
 * ABLUP17.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function ablup17(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine();
  if (ctx.abilities[17] >= 5 && (ctx.talents[13] === 0 && ctx.talents[33] === 0 && ctx.talents[28] === 0 && ctx.talents[89] === 0 && ctx.talents[70] === 0)) {
    ctx.showMessage('이 이상 올리려면 소질이 필요합니다'); ctx.waitInput();
    return 0;
  } else if (ctx.abilities[17] >= 10) {
    ctx.showMessage('이미 MAX입니다'); ctx.waitInput();
    return 0;
  }
  A = 0;
  B = 0;
  C = 0;
  D = 0;
  E = 0;
  I = 0;
  await decide_ablup17(ctx, character);
  if (ctx.talents[85] === 0) {
    ctx.showMessage(`${ctx.getVarName("ABL", 11)}${ctx.abilities[17]+1}LV이상 (현재${ctx.abilities[11]}LV) 그리고`);
    ctx.showMessage('');
  } else if (ctx.talents[85] === 1) {
    ctx.showMessage(`${ctx.getVarName("ABL", 10)}${ctx.abilities[17]+1}LV이상 (현재${ctx.abilities[10]}LV) 그리고`);
    ctx.showMessage('');
  }
  if (B > 0) {
    ctx.showMessage(`${ctx.getVarName("EXP", 50)}{B}이상 (현재${ctx.exp[50]}) 그리고`);
  }
  ctx.showMessage(`[0] - ${ctx.getVarName("PALAM", 8)}의 구슬×${ctx.juel[8]}/${A} ……`);
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
    ctx.showMessage(`　　　${ctx.getVarName("EXP", 2)}　${ctx.exp[2]}/{C}`);
  }
  if (D > 0) {
    ctx.showMessage(`　　　${ctx.getVarName("EXP", 11)}　${ctx.exp[11]}/{D}`);
  }
  if (E > 0) {
    ctx.showMessage(`　　　${ctx.getVarName("EXP", 12)}　${ctx.exp[12]}/{E}`);
  }
  ctx.showMessage('[100] - 그만둔다');
  await ctx.inputNumber();
  if ((ctx.result < 0 || ctx.result > 0) && ctx.result != 100) {
    ctx.restart();
  } else if (I != 0 && ctx.result === 0) {
    ctx.showMessage('조건을 만족하지 않았습니다。');
    ctx.restart();
  } else if (ctx.result === 100) {
    return 0;
  }
  ctx.abilities[17] += 1;
  if (ctx.result === 0) {
    ctx.juel[8] -= A;
  }
  ctx.showMessage(`${ctx.getVarName("ABL", 17)}의 레벨이 %조사처리(ABL:17,"가")% 되었습니다`);
  return 0;
}

export async function decide_ablup17(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.abilities[17] >= 10) {
    return 0;
  }
  if (ctx.abilities[17] >= 5 && (ctx.talents[13] == 0 && ctx.talents[33] == 0 && ctx.talents[28] == 0 && ctx.talents[89] == 0 && ctx.talents[70] == 0)) {
    return 0;
  }
  A = 0;
  B = 0;
  C = 0;
  D = 0;
  E = 0;
  I = 0;
  J = 0;
  if (ctx.abilities[17] === 0) {
    A = 100;
    C = 1;
  } else if (ctx.abilities[17] === 1) {
    A = 1000;
    D = 1;
  } else if (ctx.abilities[17] === 2) {
    A = 3000;
    D = 10;
  } else if (ctx.abilities[17] === 3) {
    A = 6000;
    D = 30;
  } else if (ctx.abilities[17] === 4) {
    A = 12000;
    D = 50;
    E = 5;
  } else if (ctx.abilities[17] === 5) {
    A = 25000;
    D = 75;
    E = 10;
  } else if (ctx.abilities[17] === 6) {
    A = 50000;
    D = 100;
    E = 20;
  } else if (ctx.abilities[17] === 7) {
    A = 80000;
    D = 200;
    E = 40;
  } else if (ctx.abilities[17] === 8) {
    A = 120000;
    D = 300;
    E = 50;
  } else if (ctx.abilities[17] === 9) {
    A = 150000;
    D = 500;
    E = 100;
  }
  if (ctx.talents[27]) {
    if (ctx.abilities[17] == 3) {
      ctx.times('A', 1.50);
    }
    if (ctx.abilities[17] == 4) {
      ctx.times('A', 2.00);
    }
    if (ctx.abilities[17] == 5) {
      ctx.times('A', 2.50);
    }
    if (ctx.abilities[17] >= 6) {
      ctx.times('A', 3.00);
    }
  }
  if (ctx.abilities[17] >= 3 && (ctx.talents[28] === 0 && ctx.talents[33] === 0 && ctx.talents[70] === 0 && ctx.talents[76] === 0 && ctx.talents[80] === 0 && ctx.talents[88] === 0 && ctx.talents[123] === 0)) {
    B = ctx.abilities[17] - 2;
  }
  if (ctx.talents[10]) {
    ctx.times('A', 1.20);
  }
  if (ctx.talents[11]) {
    ctx.times('A', 1.50);
  }
  if (ctx.talents[12]) {
    ctx.times('A', 1.10);
  }
  if (ctx.talents[20]) {
    ctx.times('A', 1.10);
  }
  if (ctx.talents[21]) {
    ctx.times('A', 1.10);
  }
  if (ctx.talents[22]) {
    ctx.times('A', 1.50);
  }
  if (ctx.talents[28]) {
    ctx.times('A', 0.50);
    ctx.times('D', 0.50);
    ctx.times('E', 0.50);
  }
  if (ctx.talents[30]) {
    ctx.times('A', 1.20);
    ctx.times('D', 1.20);
    ctx.times('E', 1.20);
  }
  if (ctx.talents[31]) {
    ctx.times('A', 0.80);
    ctx.times('D', 0.80);
    ctx.times('E', 0.80);
  }
  if (ctx.talents[32]) {
    ctx.times('A', 1.20);
    ctx.times('D', 1.20);
    ctx.times('E', 1.20);
  } else if (ctx.talents[33]) {
    ctx.times('A', 0.80);
    ctx.times('D', 0.80);
    ctx.times('E', 0.80);
  }
  if (ctx.talents[34]) {
    ctx.times('A', 1.50);
    ctx.times('D', 1.50);
    ctx.times('E', 1.50);
  }
  if (ctx.talents[35]) {
    ctx.times('A', 1.10);
    ctx.times('D', 1.10);
    ctx.times('E', 1.10);
  } else if (ctx.talents[36]) {
    ctx.times('A', 0.90);
    ctx.times('D', 0.90);
    ctx.times('E', 0.90);
  }
  if (ctx.talents[37]) {
    ctx.times('A', 0.80);
  }
  if (ctx.talents[60]) {
    ctx.times('A', 0.90);
    ctx.times('D', 0.90);
    ctx.times('E', 0.90);
  }
  if (ctx.talents[70]) {
    ctx.times('A', 0.90);
    ctx.times('D', 0.90);
    ctx.times('E', 0.90);
  } else if (ctx.talents[71]) {
    ctx.times('A', 1.20);
    ctx.times('D', 1.20);
    ctx.times('E', 1.20);
  }
  if (ctx.talents[72]) {
    ctx.times('A', 0.80);
    ctx.times('D', 0.80);
    ctx.times('E', 0.80);
  }
  if (ctx.talents[73]) {
    ctx.times('A', 0.90);
    ctx.times('D', 0.90);
    ctx.times('E', 0.90);
  }
  if (ctx.talents[76]) {
    ctx.times('A', 0.75);
    ctx.times('D', 0.75);
    ctx.times('E', 0.75);
  }
  if (ctx.talents[440]) {
    ctx.times('A', 0.40);
    ctx.times('D', 0.40);
    ctx.times('E', 0.40);
  }
  if (ctx.talents[80]) {
    ctx.times('A', 0.75);
  }
  ctx.times('D', 0.75);
  ctx.times('E', 0.75);
  if (ctx.talents[83]) {
    ctx.times('A', 1.20);
  }
  if (ctx.talents[88]) {
    ctx.times('A', 0.75);
  }
  if (ctx.talents[89]) {
    ctx.times('A', 0.10);
    ctx.times('D', 0.10);
    ctx.times('E', 0.10);
  }
  if (ctx.talents[123]) {
    ctx.times('A', 0.50);
  }
  if (ctx.talents[9]) {
    ctx.times('A', 0.80);
  }
  if (ctx.talents[203]) {
    ctx.times('A', 0.80);
  }
  if (ctx.talents[209]) {
    ctx.times('A', 1.25);
    ctx.times('D', 1.25);
    ctx.times('E', 1.25);
  }
  if (ctx.talents[505]) {
    ctx.times('A', 0.10);
    ctx.times('D', 0.10);
    ctx.times('E', 0.10);
  }
  if (ctx.talents[85] === 0) {
    if (ctx.abilities[11] < ctx.abilities[17]+1) {
      I |= 4;
    }
  } else if (ctx.talents[85] === 1) {
    if (ctx.abilities[10] < ctx.abilities[17]+1) {
      I |= 4;
    }
  }
  if (A < 1) {
    A = 1;
  }
  if (ctx.exp[50] < B) {
    I |= 2;
  }
  if (ctx.exp[2] < C) {
    I |= 2;
  }
  if (ctx.exp[11] < D) {
    I |= 2;
  }
  if (ctx.exp[12] < E) {
    I |= 2;
  }
  if (ctx.juel[8] < A) {
    I |= 1;
  }
  if (I === 0) {
    return 1;
  } else {
    return 0;
  }
}
