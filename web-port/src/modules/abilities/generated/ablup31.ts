/**
 * ABLUP31.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function ablup31(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine();
  if (ctx.abilities[31] >= 5 && (ctx.talents[85] === 0 && ctx.talents[76] === 0 && ctx.talents[60] === 0 && ctx.talents[70] === 0 && ctx.talents[74] === 0 && ctx.talents[78] === 0)) {
    ctx.showMessage('이 이상 올리려면 소질이 필요합니다'); ctx.waitInput();
    return 0;
  } else if (ctx.abilities[31] >= 10) {
    ctx.showMessage('이미 MAX입니다'); ctx.waitInput();
    return 0;
  } else if (ctx.abilities[30] + ctx.abilities[31] >= 15 && ctx.talents[505] === 0 && ctx.talents[511] === 0) {
    ctx.showMessage(`W 성교중독(${ctx.abilities[30]})＋자위중독(${ctx.abilities[31]})의 상한은 15입니다`);
    return 0;
  }
  A = 0;
  B = 0;
  C = 0;
  D = 0;
  E = 0;
  F = 0;
  I = 0;
  J = 0;
  await decide_ablup31(ctx, character);
  if (F > 0) {
    ctx.showMessage(`${ctx.getVarName("EXP", 50)}{F}이상 (현재${ctx.exp[50]}) 그리고`);
  }
  ctx.showMessage(`${ctx.getVarName("ABL", 17)}${ctx.abilities[31] + 1}LV이상 (현재${ctx.abilities[17]}LV) 그리고`);
  ctx.showMessage(`${ctx.getVarName("ABL", 0)}${ctx.abilities[31] + 1}LV이상 (현재${ctx.abilities[0]}LV) 그리고`);
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
  ctx.showMessage(`　　　${ctx.getVarName("PALAM", 0)}의 구슬×${ctx.juel[0]}/{B}`);
  ctx.showMessage(`　　　${ctx.getVarName("PALAM", 8)}의 구슬×${ctx.juel[8]}/{C}`);
  ctx.showMessage(`　　　${ctx.getVarName("EXP", 10)}　${ctx.exp[10]}/{D}`);
  ctx.showMessage(`[1] - ${ctx.getVarName("PALAM", 5)}의 구슬×${ctx.juel[5]}/${A} ……`);
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
  ctx.showMessage(`　　　${ctx.getVarName("PALAM", 0)}의 구슬×${ctx.juel[0]}/{B}`);
  ctx.showMessage(`　　　${ctx.getVarName("PALAM", 8)}의 구슬×${ctx.juel[8]}/{C}`);
  ctx.showMessage(`　　　${ctx.getVarName("EXP", 11)}　${ctx.exp[11]}/{E}`);
  ctx.showMessage('[100] - 그만둔다');
  await ctx.inputNumber();
  if ((ctx.result < 0 || ctx.result > 1) && ctx.result != 100) {
    ctx.restart();
  } else if (I != 0 && ctx.result === 0) {
    ctx.showMessage('조건을 만족하지 않았습니다');
    ctx.restart();
  } else if (J != 0 && ctx.result === 1) {
    ctx.showMessage('조건을 만족하지 않았습니다');
    ctx.restart();
  } else if (ctx.result === 100) {
    return 0;
  }
  ctx.abilities[31] += 1;
  if (ctx.result === 0 || ctx.result === 1) {
    ctx.juel[5] -= A;
    ctx.juel[0] -= B;
    ctx.juel[8] -= C;
  }
  ctx.showMessage(`${ctx.getVarName("ABL", 31)}의 레벨이 %조사처리(ABL:31,"가")% 되었습니다`);
  return 0;
}

export async function decide_ablup31(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.abilities[31] >= 10) {
    return 0;
  }
  if (ctx.abilities[31] >= 5 && (ctx.talents[85] == 0 && ctx.talents[76] == 0 && ctx.talents[60] == 0 && ctx.talents[70] == 0 && ctx.talents[74] == 0 && ctx.talents[78] == 0)) {
    return 0;
  }
  if (ctx.abilities[30] + ctx.abilities[31] >= 15 && ctx.talents[505] == 0 && ctx.talents[511] == 0) {
    return 0;
  }
  I = 0;
  J = 0;
  A = 0;
  B = 0;
  C = 0;
  D = 0;
  E = 0;
  F = 0;
  if (ctx.abilities[31] === 0) {
    A = 3000;
    B = 10000;
    C = 1000;
    D = 100;
    E = 20;
  } else if (ctx.abilities[31] === 1) {
    A = 6000;
    B = 25000;
    C = 3000;
    D = 250;
    E = 40;
  } else if (ctx.abilities[31] === 2) {
    A = 12000;
    B = 50000;
    C = 6000;
    D = 500;
    E = 60;
  } else if (ctx.abilities[31] === 3) {
    A = 20000;
    B = 100000;
    C = 15000;
    D = 1000;
    E = 100;
  } else if (ctx.abilities[31] === 4) {
    A = 32000;
    B = 200000;
    C = 30000;
    D = 1500;
    E = 150;
  } else if (ctx.abilities[31] === 5) {
    A = 50000;
    B = 250000;
    C = 40000;
    D = 2000;
    E = 200;
  } else if (ctx.abilities[31] === 6) {
    A = 70000;
    B = 320000;
    C = 50000;
    D = 3000;
    E = 320;
  } else if (ctx.abilities[31] === 7) {
    A = 100000;
    B = 500000;
    C = 70000;
    D = 4000;
    E = 500;
  } else if (ctx.abilities[31] === 8) {
    A = 150000;
    B = 800000;
    C = 100000;
    D = 6000;
    E = 800;
  } else if (ctx.abilities[31] === 9) {
    A = 200000;
    B = 1000000;
    C = 150000;
    D = 8000;
    E = 1000;
  }
  if (ctx.talents[27]) {
    if (ctx.abilities[31] === 3) {
      ctx.times('A', 1.50);
      ctx.times('B', 1.50);
      ctx.times('C', 1.50);
      ctx.times('D', 1.50);
      ctx.times('E', 1.50);
    } else if (ctx.abilities[31] === 4) {
      ctx.times('A', 2.00);
      ctx.times('B', 2.00);
      ctx.times('C', 2.00);
      ctx.times('D', 2.00);
      ctx.times('E', 2.00);
    } else if (ctx.abilities[31] === 5) {
      ctx.times('A', 2.50);
      ctx.times('B', 2.50);
      ctx.times('C', 2.50);
      ctx.times('D', 2.50);
      ctx.times('E', 2.50);
    } else if (ctx.abilities[31] >= 6) {
      ctx.times('A', 3.00);
      ctx.times('B', 3.00);
      ctx.times('C', 3.00);
      ctx.times('D', 3.00);
      ctx.times('E', 3.00);
    }
  }
  if (ctx.abilities[31] === 2 && (ctx.talents[33] === 0 && ctx.talents[60] === 0 && ctx.talents[72] === 0 && ctx.talents[76] === 0 && ctx.talents[123] === 0)) {
    F = ctx.abilities[31] - 1;
    if (ctx.exp[50] < F) {
      I |= 2;
      J |= 2;
    }
  }
  if (ctx.talents[60]) {
    ctx.times('A', 0.25);
    ctx.times('B', 0.25);
    ctx.times('C', 0.25);
    ctx.times('D', 0.25);
    ctx.times('E', 0.25);
  }
  if (ctx.talents[72]) {
    ctx.times('A', 0.50);
    ctx.times('B', 0.50);
    ctx.times('C', 0.50);
    ctx.times('D', 0.50);
    ctx.times('E', 0.50);
  }
  if (ctx.talents[80]) {
    ctx.times('A', 0.75);
    ctx.times('B', 0.75);
    ctx.times('C', 0.75);
    ctx.times('D', 0.75);
    ctx.times('E', 0.75);
  }
  if (ctx.talents[76]) {
    ctx.times('A', 0.50);
    ctx.times('B', 0.50);
    ctx.times('C', 0.50);
    ctx.times('D', 0.50);
    ctx.times('E', 0.50);
  }
  if (ctx.talents[440]) {
    ctx.times('A', 0.10);
    ctx.times('B', 0.10);
    ctx.times('C', 0.10);
    ctx.times('D', 0.10);
    ctx.times('E', 0.10);
  }
  if (ctx.talents[505]) {
    ctx.times('A', 0.01);
    ctx.times('B', 0.01);
    ctx.times('C', 0.01);
    ctx.times('D', 0.01);
    ctx.times('E', 0.01);
  }
  if (F > ctx.exp[50]) {
    I |= 2;
    J |= 2;
  }
  if (ctx.abilities[17] < ctx.abilities[31] + 1) {
    I |= 4;
    J |= 4;
  }
  if (ctx.abilities[0] < ctx.abilities[31] + 1) {
    I |= 4;
    J |= 4;
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
  if (E < 1) {
    E = 1;
  }
  if (ctx.juel[5] < A) {
    I |= 1;
  }
  if (ctx.juel[0] < B) {
    I |= 1;
  }
  if (ctx.juel[8] < C) {
    I |= 1;
  }
  if (ctx.exp[10] < D) {
    I |= 2;
  }
  if (ctx.juel[5] < A) {
    J |= 1;
  }
  if (ctx.juel[0] < B) {
    J |= 1;
  }
  if (ctx.juel[8] < C) {
    J |= 1;
  }
  if (ctx.exp[11] < E) {
    J |= 2;
  }
  if (I === 0 || J === 0) {
    return 1;
  } else {
    return 0;
  }
}
