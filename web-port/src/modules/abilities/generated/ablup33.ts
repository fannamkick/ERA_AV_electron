/**
 * ABLUP33.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function ablup33(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.talents[122]) {
    return 0;
  }
  ctx.drawLine();
  if (ctx.abilities[33] >= 5 && (ctx.talents[80] === 0 && ctx.talents[81] === 0 && ctx.talents[82] === 0 && ctx.talents[505] === 0 && ctx.talents[407] === 0 && character.no != 1 && character.no != 91)) {
    ctx.showMessage('이 이상 올리려면 소질이 필요합니다'); ctx.waitInput();
    return 0;
  } else if (ctx.abilities[33] >= 10) {
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
  await decide_ablup33(ctx, character);
  if (D > 0) {
    ctx.showMessage(`${ctx.getVarName("EXP", 50)}{D}이상 (현재${ctx.exp[50]}) 그리고`);
  }
  ctx.showMessage(`${ctx.getVarName("ABL", 22)}${ctx.abilities[33] + 1}LV이상 (현재${ctx.abilities[22]}LV) 그리고`);
  ctx.showMessage(`[0] - ${ctx.getVarName("PALAM", 0)}의 구슬×${ctx.juel[0]}/{B} ……`);
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
  ctx.showMessage(`　　　${ctx.getVarName("PALAM", 5)}의 구슬×${ctx.juel[5]}/${A}`);
  ctx.showMessage(`　　　${ctx.getVarName("PALAM", 6)}의 구슬×${ctx.juel[6]}/${A}`);
  ctx.showMessage(`　　　${ctx.getVarName("EXP", 40)}　${ctx.exp[40]}/{C}`);
  ctx.showMessage('[100] - 그만둔다');
  await ctx.inputNumber();
  if ((ctx.result < 0 || ctx.result > 0) && ctx.result != 100) {
    ctx.restart();
  } else if (I != 0 && ctx.result === 0) {
    ctx.showMessage('조건을 만족하지 않았습니다');
    ctx.restart();
  } else if (ctx.result === 100) {
    return 0;
  }
  ctx.abilities[33] += 1;
  if (ctx.result === 0) {
    ctx.juel[0] -= B;
    ctx.juel[5] -= A;
    ctx.juel[6] -= A;
  }
  ctx.showMessage(`${ctx.getVarName("ABL", 33)}의 레벨이 %조사처리(ABL:33,"가")% 되었습니다`);
  return 0;
}

export async function decide_ablup33(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.talents[122]) {
    return 0;
  }
  if (ctx.abilities[33] >= 10) {
    return 0;
  }
  if (ctx.abilities[33] >= 5 && (ctx.talents[76] == 0 && ctx.talents[80] == 0 && ctx.talents[81] == 0 && ctx.talents[82] == 0 && ctx.talents[505] == 0 && ctx.talents[505] == 0 && character.no != 1 && character.no != 91)) {
    return 0;
  }
  if (ctx.abilities[32] + ctx.abilities[33] + ctx.abilities[40] >= 10 && ctx.talents[47] == 0 && ctx.talents[80] == 0 && ctx.talents[81] == 0 && ctx.talents[82] == 0 && ctx.talents[140] == 0 && ctx.talents[136] == 0) {
    return 0;
  }
  I = 0;
  A = 0;
  B = 0;
  C = 0;
  D = 0;
  if (ctx.abilities[33] === 0) {
    A = 1200;
    B = 5000;
    C = 300;
  } else if (ctx.abilities[33] === 1) {
    A = 3900;
    B = 15000;
    C = 600;
  } else if (ctx.abilities[33] === 2) {
    A = 6000;
    B = 23000;
    C = 1000;
  } else if (ctx.abilities[33] === 3) {
    A = 18000;
    B = 50000;
    C = 1400;
  } else if (ctx.abilities[33] === 4) {
    A = 30000;
    B = 70000;
    C = 2100;
  } else if (ctx.abilities[33] === 5) {
    A = 55000;
    B = 120000;
    C = 3000;
  } else if (ctx.abilities[33] === 6) {
    A = 70000;
    B = 200000;
    C = 4000;
  } else if (ctx.abilities[33] === 7) {
    A = 100000;
    B = 350000;
    C = 5200;
  } else if (ctx.abilities[33] === 8) {
    A = 150000;
    B = 500000;
    C = 6500;
  } else if (ctx.abilities[33] === 9) {
    A = 300000;
    B = 800000;
    C = 8000;
  }
  if (ctx.talents[27]) {
    if (ctx.abilities[33] === 3) {
      ctx.times('A', 1.50);
      ctx.times('B', 1.50);
      ctx.times('C', 1.50);
    } else if (ctx.abilities[33] === 4) {
      ctx.times('A', 2.00);
      ctx.times('B', 2.00);
      ctx.times('C', 2.00);
    } else if (ctx.abilities[33] === 5) {
      ctx.times('A', 2.50);
      ctx.times('B', 2.50);
      ctx.times('C', 2.50);
    } else if (ctx.abilities[33] >= 6) {
      ctx.times('A', 3.00);
      ctx.times('B', 3.00);
      ctx.times('C', 3.00);
    }
  }
  if (ctx.abilities[33] >= 2 && ( ctx.talents[72] == 0 && ctx.talents[80] == 0 && ctx.talents[81] == 0 && ctx.talents[82] == 0 &&ctx.talents[123] == 0 && ctx.talents[505] == 0 && ctx.talents[407] == 0 && character.no != 1 && character.no != 91)) {
    D = ctx.abilities[33] - 1;
  }
  if (ctx.talents[11]) {
    ctx.times('A', 1.50);
    ctx.times('B', 1.50);
    ctx.times('C', 1.50);
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
    ctx.times('A', 1.50);
    ctx.times('B', 1.50);
    ctx.times('C', 1.50);
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
  if (ctx.talents[52]) {
    ctx.times('A', 0.90);
    ctx.times('B', 0.90);
    ctx.times('C', 0.90);
  }
  if (ctx.talents[61]) {
    ctx.times('A', 0.95);
    ctx.times('B', 0.95);
    ctx.times('C', 0.95);
  }
  if (ctx.talents[63]) {
    ctx.times('A', 0.90);
    ctx.times('B', 0.90);
    ctx.times('C', 0.90);
  }
  if (ctx.talents[64]) {
    ctx.times('A', 0.95);
    ctx.times('B', 0.95);
    ctx.times('C', 0.95);
  }
  if (ctx.talents[70]) {
    ctx.times('A', 0.90);
    ctx.times('B', 0.90);
    ctx.times('C', 0.90);
  } else if (ctx.talents[71]) {
    ctx.times('A', 1.10);
    ctx.times('B', 1.10);
    ctx.times('C', 1.10);
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
    ctx.times('A', 0.75);
    ctx.times('B', 0.75);
    ctx.times('C', 0.75);
  }
  if (ctx.talents[79]) {
    ctx.times('A', 2.00);
    ctx.times('B', 2.00);
    ctx.times('C', 2.00);
  }
  if (ctx.talents[80]) {
    ctx.times('A', 0.75);
    ctx.times('B', 0.75);
    ctx.times('C', 0.75);
  }
  if (ctx.talents[81]) {
    ctx.times('A', 0.50);
    ctx.times('B', 0.50);
    ctx.times('C', 0.50);
  }
  if (ctx.talents[82]) {
    ctx.times('A', 0.50);
    ctx.times('B', 0.50);
    ctx.times('C', 0.50);
  }
  if (ctx.talents[87]) {
    ctx.times('A', 0.90);
    ctx.times('B', 0.90);
    ctx.times('C', 0.90);
  }
  if (ctx.talents[123]) {
    ctx.times('A', 0.50);
    ctx.times('B', 0.50);
    ctx.times('C', 0.50);
  }
  if (ctx.talents[407]) {
    ctx.times('A', 0.75);
    ctx.times('B', 0.75);
    ctx.times('C', 0.75);
  }
  if (ctx.talents[76]) {
    ctx.times('A', 0.70);
    ctx.times('B', 0.70);
    ctx.times('C', 0.70);
  }
  if (ctx.talents[440]) {
    ctx.times('A', 0.20);
    ctx.times('B', 0.20);
    ctx.times('C', 0.20);
  }
  if (character.no === 1 || character.no === 91) {
    ctx.times('A', 0.75);
    ctx.times('B', 0.75);
    ctx.times('C', 0.50);
  }
  if (ctx.talents[9]) {
    ctx.times('A', 0.80);
    ctx.times('B', 0.80);
    ctx.times('C', 0.80);
  }
  if (ctx.talents[505]) {
    ctx.times('A', 0.10);
    ctx.times('B', 0.10);
    ctx.times('C', 0.10);
    ctx.times('D', 0.10);
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
  if (ctx.abilities[22] < ctx.abilities[33] + 1) {
    I |= 4;
    J |= 4;
  }
  if (ctx.juel[0] < B) {
    I |= 1;
  }
  if (ctx.juel[5] < A) {
    I |= 1;
  }
  if (ctx.juel[6] < A) {
    I |= 1;
  }
  if (ctx.exp[40] < C) {
    I |= 2;
  }
  if (I === 0) {
    return 1;
  } else {
    return 0;
  }
}
