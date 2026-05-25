/**
 * ABLUP32.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function ablup32(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine();
  if (ctx.abilities[32] >= 5 && (ctx.talents[76] === 0 && ctx.talents[50] === 0 && ctx.talents[61] === 0 && ctx.talents[64] === 0 && ctx.talents[47] === 0)) {
    ctx.showMessage('이 이상 올리려면 소질이 필요합니다'); ctx.waitInput();
    return 0;
  } else if (ctx.abilities[32] >= 10) {
    ctx.showMessage('이미 MAX입니다'); ctx.waitInput();
    return 0;
  } else if (ctx.abilities[32] + ctx.abilities[33] + ctx.abilities[40] >= 10 && ctx.talents[47] === 0 && ctx.talents[80] === 0 && ctx.talents[81] === 0 && ctx.talents[82] === 0 && ctx.talents[140] === 0 && ctx.talents[136] === 0) {
    ctx.showMessage(`W 정액중독(${ctx.abilities[32]})＋레즈중독(${ctx.abilities[33]})＋수간중독(${ctx.abilities[40]})의 상한은 10입니다`);
    return 0;
  }
  A = 0;
  B = 0;
  C = 0;
  D = 0;
  I = 0;
  J = 0;
  await decide_ablup32(ctx, character);
  if (D > 0) {
    ctx.showMessage(`${ctx.getVarName("EXP", 50)}{D}이상 (현재${ctx.exp[50]}) 그리고`);
  }
  if (ctx.talents[76] === 0) {
    ctx.showMessage(`${ctx.getVarName("ABL", 16)}${ctx.abilities[32] + 1}LV이상 (현재${ctx.abilities[16]}LV) 그리고`);
  } else if (ctx.talents[76] === 1) {
    ctx.showMessage(`${ctx.getVarName("ABL", 11)}${ctx.abilities[32] + 1}LV이상 (현재${ctx.abilities[11]}LV) 그리고`);
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
  ctx.showMessage(`　　　${ctx.getVarName("EXP", 20)}　${ctx.exp[20]}/{C}`);
  ctx.showMessage(`[1] - ${ctx.getVarName("PALAM", 5)}의 구슬×${ctx.juel[5]}/${A*3} ……`);
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
  ctx.showMessage(`　　　${ctx.getVarName("PALAM", 6)}의 구슬×${ctx.juel[6]}/{B*3}`);
  ctx.showMessage(`　　　${ctx.getVarName("EXP", 20)}　${ctx.exp[20]}/{C/2}`);
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
  ctx.abilities[32] += 1;
  if (ctx.result === 0) {
    ctx.juel[5] -= A;
    ctx.juel[6] -= B;
  } else if (ctx.result === 1) {
    ctx.juel[5] -= A*3;
    ctx.juel[6] -= B*3;
  }
  ctx.showMessage(`${ctx.getVarName("ABL", 32)}의 레벨이 %조사처리(ABL:32,"가")% 되었습니다`);
  return 0;
}

export async function decide_ablup32(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.abilities[32] >= 10) {
    return 0;
  }
  if (ctx.abilities[32] >= 5 && (ctx.talents[76] == 0 && ctx.talents[50] == 0 && ctx.talents[61] == 0 && ctx.talents[64] == 0 && ctx.talents[47] == 0)) {
    return 0;
  }
  if (ctx.abilities[32] + ctx.abilities[33] + ctx.abilities[40] >= 10 && ctx.talents[47] == 0 && ctx.talents[80] == 0 && ctx.talents[81] == 0 && ctx.talents[82] == 0 && ctx.talents[140] == 0 && ctx.talents[136] == 0) {
    return 0;
  }
  I = 0;
  J = 0;
  A = 0;
  B = 0;
  C = 0;
  D = 0;
  if (ctx.abilities[32] === 0) {
    A = 3000;
    B = 10000;
    C = 10;
  } else if (ctx.abilities[32] === 1) {
    A = 8000;
    B = 20000;
    C = 25;
  } else if (ctx.abilities[32] === 2) {
    A = 15000;
    B = 35000;
    C = 40;
  } else if (ctx.abilities[32] === 3) {
    A = 30000;
    B = 60000;
    C = 80;
  } else if (ctx.abilities[32] === 4) {
    A = 50000;
    B = 130000;
    C = 200;
  } else if (ctx.abilities[32] === 5) {
    A = 65000;
    B = 190000;
    C = 500;
  } else if (ctx.abilities[32] === 6) {
    A = 90000;
    B = 300000;
    C = 800;
  } else if (ctx.abilities[32] === 7) {
    A = 120000;
    B = 500000;
    C = 1200;
  } else if (ctx.abilities[32] === 8) {
    A = 200000;
    B = 800000;
    C = 1500;
  } else if (ctx.abilities[32] === 9) {
    A = 500000;
    B = 1500000;
    C = 2000;
  }
  if (ctx.talents[27]) {
    if (ctx.abilities[32] === 3) {
      ctx.times('A', 1.50);
      ctx.times('B', 1.50);
      ctx.times('C', 1.50);
    } else if (ctx.abilities[32] === 4) {
      ctx.times('A', 2.00);
      ctx.times('B', 2.00);
      ctx.times('C', 2.00);
    } else if (ctx.abilities[32] === 5) {
      ctx.times('A', 2.50);
      ctx.times('B', 2.50);
      ctx.times('C', 2.50);
    } else if (ctx.abilities[32] >= 6) {
      ctx.times('A', 3.00);
      ctx.times('B', 3.00);
      ctx.times('C', 3.00);
    }
  }
  if (ctx.abilities[32] >= 2 && (ctx.talents[61] == 0 && ctx.talents[72] == 0 && ctx.talents[80] == 0 && ctx.talents[123] == 0 && ctx.talents[47] == 0)) {
    D = ctx.abilities[32] - 1;
  }
  if (ctx.talents[11]) {
    ctx.times('A', 1.50);
    ctx.times('B', 1.50);
    ctx.times('C', 1.50);
  }
  if (ctx.talents[22]) {
    ctx.times('A', 0.95);
    ctx.times('B', 0.95);
    ctx.times('C', 0.95);
  }
  if (ctx.talents[24]) {
    ctx.times('A', 1.20);
    ctx.times('B', 1.20);
    ctx.times('C', 1.20);
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
    ctx.times('A', 2.00);
    ctx.times('B', 2.00);
    ctx.times('C', 2.00);
  }
  if (ctx.talents[47]) {
    ctx.times('A', 0.50);
    ctx.times('B', 0.50);
    ctx.times('C', 0.50);
  }
  if (ctx.talents[52]) {
    ctx.times('A', 0.95);
    ctx.times('B', 0.95);
    ctx.times('C', 0.95);
  }
  if (ctx.talents[61]) {
    ctx.times('A', 0.90);
    ctx.times('B', 0.90);
    ctx.times('C', 0.90);
  } else if (ctx.talents[62]) {
    ctx.times('A', 2.00);
    ctx.times('B', 2.00);
    ctx.times('C', 2.00);
  }
  if (ctx.talents[64]) {
    ctx.times('A', 0.90);
    ctx.times('B', 0.90);
    ctx.times('C', 0.90);
  }
  if (ctx.talents[72]) {
    ctx.times('A', 0.50);
    ctx.times('B', 0.50);
    ctx.times('C', 0.50);
  }
  if (ctx.talents[73]) {
    ctx.times('A', 0.50);
    ctx.times('B', 0.50);
    ctx.times('C', 0.50);
  }
  if (ctx.talents[76]) {
    ctx.times('A', 0.90);
    ctx.times('B', 0.90);
    ctx.times('C', 0.90);
  }
  if (ctx.talents[440]) {
    ctx.times('A', 0.40);
    ctx.times('B', 0.40);
    ctx.times('C', 0.40);
  }
  if (ctx.talents[80]) {
    ctx.times('A', 0.75);
    ctx.times('B', 0.75);
    ctx.times('C', 0.75);
  }
  if (ctx.talents[87]) {
    ctx.times('A', 0.95);
    ctx.times('B', 0.95);
    ctx.times('C', 0.95);
  }
  if (ctx.talents[123]) {
    ctx.times('A', 0.90);
    ctx.times('B', 0.90);
    ctx.times('C', 0.90);
  }
  if (ctx.talents[9]) {
    ctx.times('A', 0.90);
    ctx.times('B', 0.90);
    ctx.times('C', 0.90);
  }
  if (ctx.talents[505]) {
    ctx.times('A', 0.01);
    ctx.times('B', 0.01);
    ctx.times('C', 0.01);
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
  if (D > ctx.exp[50]) {
    I |= 2;
    J |= 2;
  }
  if (ctx.talents[76] === 0) {
    if (ctx.abilities[16] < ctx.abilities[32] + 1) {
      I |= 4;
      J |= 4;
    }
  } else if (ctx.talents[76] === 1) {
    if (ctx.abilities[11] < ctx.abilities[32] + 1) {
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
  if (ctx.exp[20] < C) {
    I |= 2;
  }
  if (ctx.juel[5] < A*3) {
    J |= 1;
  }
  if (ctx.juel[6] < B*3) {
    J |= 1;
  }
  if (ctx.exp[20] < C/2) {
    J |= 2;
  }
  if (I === 0 || J === 0) {
    return 1;
  } else {
    return 0;
  }
}
