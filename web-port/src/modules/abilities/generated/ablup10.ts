/**
 * ABLUP10.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function ablup10(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine();
  if (ctx.abilities[10] >= 5 && (ctx.talents[85] === 0 && ctx.talents[86] === 0 && ctx.talents[90] === 0)) {
    ctx.showMessage('이 이상 올리려면 소질이 필요합니다'); ctx.waitInput();
    return 0;
  } else if (ctx.abilities[10] >= 7 && (ctx.talents[85] === 0 && ctx.talents[86] === 0)) {
    ctx.showMessage('이 이상 올리려면 소질이 필요합니다'); ctx.waitInput();
    return 0;
  } else if (ctx.abilities[10] >= 10) {
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
  K = 0;
  L = 0;
  await decide_ablup10(ctx, character);
  if (E > 0) {
    ctx.showMessage(`${ctx.getVarName("EXP", 50)}{E}이상 (현재${ctx.exp[50]}) 그리고`);
  }
  if (A > 0) {
    ctx.showMessage(`[0] - ${ctx.getVarName("PALAM", 10)}의 구슬×${ctx.juel[10]}/${A} ……`);
    if (I === 0) {
      ctx.print('OK');
    } else {
      if (I & 1) {
        ctx.print('구슬부족');
      }
      if (I & 2) {
        ctx.print('경험부족');
      }
    }
    ctx.showMessage('');
  }
  ctx.showMessage(`[1] - ${ctx.getVarName("PALAM", 4)}의 구슬×${ctx.juel[4]}/{B} ……`);
  if (J === 0) {
    ctx.print('OK');
  } else {
    if (J & 1) {
      ctx.print('구슬부족');
    }
    if (J & 2) {
      ctx.print('경험부족');
    }
  }
  ctx.showMessage('');
  if (C > 0) {
    ctx.showMessage(`[2] - ${ctx.getVarName("PALAM", 5)}의 구슬×${ctx.juel[5]}/{C} ……`);
    if (K === 0) {
      ctx.print('OK');
    } else {
      if (K & 1) {
        ctx.print('구슬부족');
      }
      if (K & 2) {
        ctx.print('경험부족');
      }
    }
    ctx.showMessage('');
  }
  if (D > 0) {
    ctx.showMessage(`[3] - ${ctx.getVarName("PALAM", 6)}의 구슬×${ctx.juel[6]}/{D} ……`);
    if (L === 0) {
      ctx.print('OK');
    } else {
      if (L & 1) {
        ctx.print('구슬부족');
      }
      if (L & 2) {
        ctx.print('경험부족');
      }
    }
    ctx.showMessage('');
  }
  ctx.showMessage('[100] - 그만둔다');
  await ctx.inputNumber();
  if ((ctx.result < 0 || ctx.result > 3) && ctx.result != 100) {
    ctx.restart();
  } else if (I != 0 && ctx.result === 0) {
    ctx.showMessage('조건을 만족하지 않았습니다');
    ctx.restart();
  } else if (J != 0 && ctx.result === 1) {
    ctx.showMessage('조건을 만족하지 않았습니다');
    ctx.restart();
  } else if (K === 256 && ctx.result === 2) {
    ctx.restart();
  } else if (K != 0 && ctx.result === 2) {
    ctx.showMessage('조건을 만족하지 않았습니다');
    ctx.restart();
  } else if (L === 256 && ctx.result === 3) {
    ctx.restart();
  } else if (L != 0 && ctx.result === 3) {
    ctx.showMessage('조건을 만족하지 않았습니다');
    ctx.restart();
  } else if (ctx.result === 100) {
    return 0;
  }
  ctx.abilities[10] += 1;
  if (ctx.result === 0) {
    ctx.juel[10] -= A;
  } else if (ctx.result === 1) {
    ctx.juel[4] -= B;
  } else if (ctx.result === 2) {
    ctx.juel[5] -= C;
  } else if (ctx.result === 3) {
    ctx.juel[6] -= D;
  }
  ctx.showMessage(`${ctx.getVarName("ABL", 10)}의 레벨이 %조사처리(ABL:10,"가")% 되었습니다`);
  return 0;
}

export async function decide_ablup10(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.abilities[10] >= 5 && (ctx.talents[85] == 0 && ctx.talents[86] == 0 && ctx.talents[90] == 0)) {
    return 0;
  }
  if (ctx.abilities[10] >= 7 && (ctx.talents[85] == 0 && ctx.talents[86] == 0)) {
    return 0;
  }
  if (ctx.abilities[10] >= 10) {
    return 0;
  }
  I = 0;
  J = 0;
  K = 0;
  L = 0;
  A = 0;
  B = 0;
  C = 0;
  D = 0;
  E = 0;
  if (ctx.abilities[10] === 0) {
    A = 10;
    B = 10;
    C = 300;
    D = 200;
  } else if (ctx.abilities[10] === 1) {
    A = 150;
    B = 100;
    C = 1000;
    D = 1200;
  } else if (ctx.abilities[10] === 2) {
    A = 1000;
    B = 800;
    C = 2000;
    D = 3000;
  } else if (ctx.abilities[10] === 3) {
    A = 3000;
    B = 3000;
    C = -10;
    D = 12000;
  } else if (ctx.abilities[10] === 4) {
    A = 8000;
    B = 5000;
    C = -10;
    D = -10;
  } else if (ctx.abilities[10] === 5) {
    A = 12000;
    B = 10000;
    C = -10;
    D = -10;
  } else if (ctx.abilities[10] === 6) {
    A = 25000;
    B = 20000;
    C = -10;
    D = -10;
  } else if (ctx.abilities[10] === 7) {
    A = -10;
    B = 40000;
    C = -10;
    D = -10;
  } else if (ctx.abilities[10] === 8) {
    A = -10;
    B = 80000;
    C = -10;
    D = -10;
  } else if (ctx.abilities[10] === 9) {
    A = -10;
    B = 150000;
    C = -10;
    D = -10;
  }
  if (ctx.abilities[10] === 4 && (ctx.talents[10] === 0 && ctx.talents[13] === 0 && ctx.talents[76] === 0 && ctx.talents[73] === 0 && ctx.talents[85] === 0 && ctx.talents[86] === 0)) {
    E = 1;
  } else if (ctx.abilities[10] === 7 && (ctx.talents[10] === 0 && ctx.talents[13] === 0 && ctx.talents[76] === 0 && ctx.talents[73] === 0 && ctx.talents[85] === 0 && ctx.talents[86] === 0)) {
    E = 2;
  }
  if (ctx.talents[10]) {
    ctx.times('A', 0.50);
    ctx.times('B', 0.90);
    ctx.times('D', 0.90);
  }
  if (ctx.talents[11]) {
    ctx.times('A', 2.00);
    ctx.times('B', 1.50);
    ctx.times('C', 1.20);
    ctx.times('D', 1.50);
  }
  if (ctx.talents[12]) {
    ctx.times('A', 3.00);
    ctx.times('B', 1.50);
    ctx.times('C', 1.20);
    ctx.times('D', 1.50);
  }
  if (ctx.talents[13]) {
    ctx.times('B', 0.80);
    ctx.times('D', 0.90);
  }
  if (ctx.talents[16]) {
    ctx.times('A', 1.20);
    ctx.times('B', 1.50);
    ctx.times('D', 1.20);
  }
  if (ctx.talents[15]) {
    ctx.times('A', 1.20);
    ctx.times('B', 1.50);
    ctx.times('D', 2.00);
  } else if (ctx.talents[17]) {
    ctx.times('B', 0.80);
    ctx.times('D', 0.80);
  }
  if (ctx.talents[32]) {
    ctx.times('A', 1.20);
    ctx.times('B', 1.20);
    ctx.times('C', 2.00);
    ctx.times('D', 1.20);
  } else if (ctx.talents[33]) {
    ctx.times('C', 0.50);
  }
  if (ctx.talents[34]) {
    ctx.times('A', 1.50);
    ctx.times('B', 1.50);
    ctx.times('C', 2.00);
    ctx.times('D', 2.00);
  }
  if (ctx.talents[76]) {
    ctx.times('C', 0.50);
  }
  if (ctx.talents[85]) {
    ctx.times('B', 0.75);
  }
  if (ctx.talents[320]) {
    ctx.times('B', 0.80);
  }
  if (ctx.talents[319]) {
    ctx.times('B', 0.80);
  }
  if (ctx.talents[324]) {
    ctx.times('B', 0.80);
  }
  if (ctx.talents[209]) {
    ctx.times('B', 0.90);
  }
  if (ctx.talents[86]) {
    ctx.times('B', 0.20);
  }
  if (ctx.talents[430]) {
    ctx.times('B', 0.20);
  }
  if (ctx.talents[504]) {
    ctx.times('B', 0.20);
  }
  if (ctx.talents[511]) {
    ctx.times('B', 0.10);
  }
  if (ctx.talents[511]) {
    ctx.times('B', 1.20);
  }
  if (ctx.talents[84]) {
    ctx.times('B', 5.00);
    ctx.times('C', 0.80);
    ctx.times('D', 2.00);
  }
  if (B < 1) {
    B = 1;
  }
  if (A > 0) {
    if (ctx.juel[10] < A) {
      I |= 1;
    }
  } else {
    I = 256;
  }
  if (ctx.juel[4] < B) {
    J |= 1;
  }
  if (C > 0) {
    if (ctx.juel[5] < C) {
      K |= 1;
    }
  } else {
    K = 256;
  }
  if (D > 0) {
    if (ctx.juel[6] < D) {
      L |= 1;
    }
  } else {
    L = 256;
  }
  if (E > ctx.exp[50]) {
    I |= 2;
    J |= 2;
    K |= 2;
    L |= 2;
  }
  if (I === 0 || J === 0 || K === 0 || L ==0) {
    return 1,I,J,K,L;
  } else {
    return 0;
  }
}
