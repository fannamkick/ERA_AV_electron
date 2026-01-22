/**
 * ABLUP30.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function ablup30(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine();
  if (ctx.abilities[30] >= 5 && (ctx.talents[85] === 0 && ctx.talents[76] === 0)) {
    ctx.showMessage('이 이상 올리려면 소질이 필요합니다'); ctx.waitInput();
    return 0;
  } else if (ctx.abilities[30] >= 10) {
    ctx.showMessage('이미 MAX입니다'); ctx.waitInput();
    return 0;
  } else if (ctx.abilities[30] + ctx.abilities[31] >= 15 && ctx.talents[505] === 0 && ctx.talents[511] === 0) {
    ctx.showMessage(`W 성교중독(${ctx.abilities[30]})＋자위중독(${ctx.abilities[31]})의 상한은 15입니다`);
    return 0;
  }
  A = 0;
  B = 0;
  C = 0;
  F = 0;
  await decide_ablup30(ctx, character);
  if (F > 0) {
    ctx.showMessage(`${ctx.getVarName("EXP", 50)}{F}이상 (현재${ctx.exp[50]}) 그리고`);
  }
  if (ctx.talents[85] === 0) {
    ctx.showMessage(`${ctx.getVarName("ABL", 11)}${ctx.abilities[30] + 1}LV이상(현재${ctx.abilities[11]}LV) 그리고`);
  } else if (ctx.talents[85] === 1) {
    ctx.showMessage(`${ctx.getVarName("ABL", 16)}${ctx.abilities[30] + 1}LV이상(현재${ctx.abilities[16]}LV) 그리고`);
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
  ctx.showMessage(`　　　${ctx.getVarName("PALAM", 6)}의 구슬×${ctx.juel[6]}/{B}`);
  ctx.showMessage(`　　　${ctx.getVarName("EXP", 5)}　${ctx.exp[5]}/{C}`);
  ctx.showMessage(`[1] - ${ctx.getVarName("PALAM", 5)}의 구슬×${ctx.juel[5]}/${A * 3} ……`);
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
  ctx.showMessage(`　　　${ctx.getVarName("PALAM", 6)}의 구슬×${ctx.juel[6]}/{B * 3}`);
  ctx.showMessage(`　　　${ctx.getVarName("EXP", 5)}　${ctx.exp[5]}/{C / 2}`);
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
  ctx.abilities[30] += 1;
  if (ctx.result === 0) {
    ctx.juel[5] -= A;
    ctx.juel[6] -= B;
  } else if (ctx.result === 1) {
    ctx.juel[5] -= A*3;
    ctx.juel[6] -= B*3;
  }
  ctx.showMessage(`${ctx.getVarName("ABL", 30)}의 레벨이 %조사처리(ABL:30,"가")% 되었습니다`);
  return 0;
}

export async function decide_ablup30(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.abilities[30] >= 10) {
    return 0;
  }
  if (ctx.abilities[30] >= 5 && (ctx.talents[85] == 0 && ctx.talents[76] == 0)) {
    return 0;
  }
  if (ctx.abilities[30] + ctx.abilities[31] >= 15 && ctx.talents[505] == 0 && ctx.talents[511] == 0) {
    return 0;
  }
  A = 0;
  B = 0;
  C = 0;
  F = 0;
  I = 0;
  J = 0;
  if (ctx.abilities[30] === 0) {
    A = 3000;
    B = 10000;
    C = 10;
  } else if (ctx.abilities[30] === 1) {
    A = 8000;
    B = 25000;
    C = 25;
  } else if (ctx.abilities[30] === 2) {
    A = 15000;
    B = 50000;
    C = 40;
  } else if (ctx.abilities[30] === 3) {
    A = 30000;
    B = 100000;
    C = 80;
  } else if (ctx.abilities[30] === 4) {
    A = 55000;
    B = 200000;
    C = 200;
  } else if (ctx.abilities[30] === 5) {
    A = 70000;
    B = 300000;
    C = 400;
  } else if (ctx.abilities[30] === 6) {
    A = 90000;
    B = 400000;
    C = 800;
  } else if (ctx.abilities[30] === 7) {
    A = 120000;
    B = 550000;
    C = 1200;
  } else if (ctx.abilities[30] === 8) {
    A = 150000;
    B = 700000;
    C = 1500;
  } else if (ctx.abilities[30] === 9) {
    A = 200000;
    B = 900000;
    C = 2000;
  }
  if (ctx.talents[27]) {
    if (ctx.abilities[30] === 3) {
      ctx.times('A', 1.50);
      ctx.times('B', 1.50);
      ctx.times('C', 1.50);
    } else if (ctx.abilities[30] === 4) {
      ctx.times('A', 2.00);
      ctx.times('B', 2.00);
      ctx.times('C', 2.00);
    } else if (ctx.abilities[30] === 5) {
      ctx.times('A', 2.50);
      ctx.times('B', 2.50);
      ctx.times('C', 2.50);
    } else if (ctx.abilities[30] >= 6) {
      ctx.times('A', 3.00);
      ctx.times('B', 3.00);
      ctx.times('C', 3.00);
    }
  }
  if (ctx.talents[12]) {
    ctx.times('A', 1.20);
    ctx.times('B', 1.20);
    ctx.times('C', 1.20);
  }
  if (ctx.talents[20]) {
    ctx.times('A', 1.20);
    ctx.times('B', 1.20);
    ctx.times('C', 1.20);
  }
  if (ctx.talents[21]) {
    ctx.times('A', 1.20);
    ctx.times('B', 1.20);
    ctx.times('C', 1.20);
  }
  if (ctx.talents[24]) {
    ctx.times('A', 1.20);
    ctx.times('B', 1.20);
    ctx.times('C', 1.20);
  }
  if (ctx.talents[30]) {
    ctx.times('A', 1.20);
    ctx.times('B', 1.20);
    ctx.times('C', 1.20);
  } else if (ctx.talents[31]) {
    ctx.times('A', 0.90);
    ctx.times('B', 0.90);
    ctx.times('C', 0.90);
  }
  if (ctx.talents[32]) {
    ctx.times('A', 1.20);
    ctx.times('B', 1.20);
    ctx.times('C', 1.20);
  } else if (ctx.talents[33]) {
    ctx.times('A', 0.80);
    ctx.times('B', 0.80);
    ctx.times('C', 0.80);
  }
  if (ctx.talents[34]) {
    ctx.times('A', 1.20);
    ctx.times('B', 1.20);
    ctx.times('C', 1.20);
  }
  if (ctx.talents[35]) {
    ctx.times('A', 1.10);
    ctx.times('B', 1.10);
    ctx.times('C', 1.10);
  } else if (ctx.talents[36]) {
    ctx.times('A', 0.95);
    ctx.times('B', 0.95);
    ctx.times('C', 0.95);
  }
  if (ctx.talents[70]) {
    ctx.times('A', 0.90);
    ctx.times('B', 0.90);
    ctx.times('C', 0.90);
  } else if (ctx.talents[71]) {
    ctx.times('A', 1.20);
    ctx.times('B', 1.20);
    ctx.times('C', 1.20);
  }
  if (ctx.talents[72]) {
    ctx.times('A', 0.60);
    ctx.times('B', 0.60);
    ctx.times('C', 0.60);
  }
  if (ctx.talents[73]) {
    ctx.times('A', 0.50);
    ctx.times('B', 0.50);
    ctx.times('C', 0.50);
  }
  if (ctx.talents[76]) {
    ctx.times('A', 0.80);
    ctx.times('B', 0.80);
    ctx.times('C', 0.80);
  }
  if (ctx.talents[440]) {
    ctx.times('A', 0.40);
    ctx.times('B', 0.40);
    ctx.times('C', 0.40);
  }
  if (ctx.talents[87]) {
    ctx.times('A', 0.90);
    ctx.times('B', 0.90);
    ctx.times('C', 0.90);
  }
  if (ctx.talents[123]) {
    ctx.times('A', 0.80);
    ctx.times('B', 0.80);
    ctx.times('C', 0.80);
  }
  if (ctx.talents[9]) {
    ctx.times('A', 0.80);
    ctx.times('B', 0.80);
    ctx.times('C', 0.80);
  }
  if (ctx.talents[432] === 1) {
    ctx.times('A', 0.50);
    ctx.times('B', 0.50);
    ctx.times('C', 0.50);
  }
  if (ctx.talents[422] === 1) {
    ctx.times('A', 0.80);
    ctx.times('B', 0.80);
    ctx.times('C', 0.80);
  }
  if (ctx.talents[505]) {
    ctx.times('A', 0.10);
    ctx.times('B', 0.10);
    ctx.times('C', 0.10);
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
  if (ctx.abilities[30] >= 2 && (ctx.talents[33] === 0 && ctx.talents[72] === 0 && ctx.talents[76] === 0 && ctx.talents[123] === 0 && ctx.talents[505] === 0)) {
    F = ctx.abilities[30] - 1;
    if (ctx.exp[50] < F) {
      I |= 2;
      J |= 2;
    }
  }
  if (ctx.talents[85] === 0) {
    if (ctx.abilities[11] < ctx.abilities[30] + 1) {
      I |= 4;
      J |= 4;
    }
  } else if (ctx.talents[85] === 1) {
    if (ctx.abilities[16] < ctx.abilities[30] + 1) {
      I |= 4;
      J |= 4;
    }
  }
  if (ctx.juel[5] < A) {
    I |= 1;
  }
  if (ctx.juel[6] < B) {
    I |= 1;
  }
  if (ctx.exp[5] < C) {
    I |= 2;
  }
  if (ctx.juel[5] < A * 3) {
    J |= 1;
  }
  if (ctx.juel[6] < B * 3) {
    J |= 1;
  }
  if (ctx.exp[5] < C / 2) {
    J |= 2;
  }
  if (I === 0 || J === 0) {
    return 1;
  } else {
    return 0;
  }
}
