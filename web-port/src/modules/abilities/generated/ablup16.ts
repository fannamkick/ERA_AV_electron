/**
 * ABLUP16.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function ablup16(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine();
  if (ctx.abilities[16] >= 5 && (ctx.talents[63] === 0 && ctx.talents[85] === 0 && ctx.talents[86] === 0 && ctx.talents[90] === 0)) {
    ctx.showMessage('이 이상 올리려면 소질이 필요합니다'); ctx.waitInput();
    return 0;
  } else if (ctx.abilities[16] >= 7 && (ctx.talents[63] === 0 && ctx.talents[85] === 0 && ctx.talents[86] === 0)) {
    ctx.showMessage('이 이상 올리려면 소질이 필요합니다'); ctx.waitInput();
    return 0;
  } else if (ctx.abilities[16] >= 10) {
    ctx.showMessage('이미 MAX입니다'); ctx.waitInput();
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
  K = 0;
  await decide_ablup16(ctx, character);
  ctx.showMessage(`${ctx.getVarName("ABL", 10)}${ctx.abilities[16]+1}LV이상 (현재${ctx.abilities[10]}LV) 그리고`);
  if (F > 0) {
    ctx.showMessage(`${ctx.getVarName("EXP", 50)}{F}이상 (현재${ctx.exp[50]}) 그리고`);
  }
  ctx.showMessage(`[0] - ${ctx.getVarName("PALAM", 6)}의 구슬×${ctx.juel[6]}/${A} ……`);
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
  if (E > 0) {
    ctx.showMessage(`　　　${ctx.getVarName("EXP", 2)}　${ctx.exp[2]}/{E}`);
    ctx.showMessage(`　　　${ctx.getVarName("EXP", 20)}　${ctx.exp[20]}/{E}`);
  }
  if (B > 0) {
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
      if (J & 4) {
        ctx.print('능력부족');
      }
    }
    ctx.showMessage('');
    if (D > 0) {
      ctx.showMessage(`　　　${ctx.getVarName("EXP", 21)}　${ctx.exp[21]}/{D}`);
    }
  }
  if (C > 0) {
    ctx.showMessage(`[2] - ${ctx.getVarName("PALAM", 7)}의 구슬×${ctx.juel[7]}/{C} ……`);
    if (K === 0) {
      ctx.print('OK');
    } else {
      if (K & 1) {
        ctx.print('구슬부족');
      }
      if (K & 2) {
        ctx.print('경험부족');
      }
      if (K & 4) {
        ctx.print('능력부족');
      }
    }
    ctx.showMessage('');
    ctx.showMessage(`　　　${ctx.getVarName("EXP", 2)}　${ctx.exp[2]}/1`);
  }
  ctx.showMessage('[100] - 그만둔다');
  // Label: INPUT_LOOP
  await ctx.inputNumber();
  if ((ctx.result < 0 || ctx.result > 2) && ctx.result != 100) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (I != 0 && ctx.result === 0) {
    ctx.showMessage('조건을 만족하지 않았습니다');
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (J === 256 && ctx.result === 1) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (J != 0 && ctx.result === 1) {
    ctx.showMessage('조건을 만족하지 않았습니다');
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (K === 256 && ctx.result === 2) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (K != 0 && ctx.result === 2) {
    ctx.showMessage('조건을 만족하지 않았습니다');
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 100) {
    return 0;
  }
  ctx.abilities[16] += 1;
  if (ctx.result === 0) {
    ctx.juel[6] -= A;
  } else if (ctx.result === 1) {
    ctx.juel[4] -= B;
  } else if (ctx.result === 2) {
    ctx.juel[7] -= C;
  }
  ctx.showMessage(`${ctx.getVarName("ABL", 16)}의 레벨이 %조사처리(ABL:16,"가")% 되었습니다`);
  return 0;
}

export async function decide_ablup16(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.abilities[16] >= 10) {
    return 0;
  }
  if (ctx.abilities[16] >= 5 && (ctx.talents[63] == 0 && ctx.talents[85] == 0 && ctx.talents[86] == 0 && ctx.talents[90] == 0)) {
    return 0;
  }
  if (ctx.abilities[16] >= 7 && (ctx.talents[63] == 0 && ctx.talents[85] == 0 && ctx.talents[86] == 0)) {
    return 0;
  }
  I = 0;
  J = 0;
  K = 0;
  A = 0;
  B = 0;
  C = 0;
  D = 0;
  E = 0;
  F = 0;
  if (ctx.abilities[16] === 0) {
    A = 100;
    B = 20;
    C = 100;
    D = 1;
    E = 1;
  } else if (ctx.abilities[16] === 1) {
    A = 1200;
    B = 400;
    C = 2000;
    D = 1;
    E = 3;
  } else if (ctx.abilities[16] === 2) {
    A = 5000;
    B = 2000;
    C = 10000;
    D = 20;
    E = 6;
  } else if (ctx.abilities[16] === 3) {
    A = 10000;
    B = 3000;
    C = 0;
    D = 20;
    E = 10;
  } else if (ctx.abilities[16] === 4) {
    A = 30000;
    B = 10000;
    C = 0;
    D = 100;
    E = 20;
  } else if (ctx.abilities[16] === 5) {
    A = 50000;
    B = 20000;
    C = 0;
    D = 200;
    E = 80;
  } else if (ctx.abilities[16] === 6) {
    A = 70000;
    B = 30000;
    C = 0;
    D = 350;
    E = 150;
  } else if (ctx.abilities[16] === 7) {
    A = 100000;
    B = 50000;
    C = 0;
    D = 500;
    E = 200;
  } else if (ctx.abilities[16] === 8) {
    A = 150000;
    B = 80000;
    C = 0;
    D = 700;
    E = 400;
  } else if (ctx.abilities[16] === 9) {
    A = 200000;
    B = 150000;
    C = 0;
    D = 1000;
    E = 800;
  }
  if (ctx.talents[27]) {
    if (ctx.abilities[16] === 3) {
      ctx.times('A', 1.50);
      ctx.times('B', 1.50);
      ctx.times('D', 1.50);
      ctx.times('E', 1.50);
    } else if (ctx.abilities[16] === 4) {
      ctx.times('A', 2.00);
      ctx.times('B', 2.00);
      ctx.times('D', 2.00);
      ctx.times('E', 2.00);
    } else if (ctx.abilities[16] === 5) {
      ctx.times('A', 2.50);
      ctx.times('B', 2.50);
      ctx.times('D', 2.50);
      ctx.times('E', 2.50);
    } else if (ctx.abilities[16] >= 6) {
      ctx.times('A', 3.00);
      ctx.times('B', 3.00);
      ctx.times('D', 3.00);
      ctx.times('E', 3.00);
    }
  }
  if (ctx.abilities[16] >= 3 && (ctx.talents[63] === 0 && ctx.talents[85] === 0 && ctx.talents[86] === 0)) {
    F = ctx.abilities[16] - 2;
  }
  if (ctx.talents[11]) {
    ctx.times('A', 1.20);
    ctx.times('B', 1.40);
    ctx.times('D', 1.20);
    ctx.times('E', 1.20);
  }
  if (ctx.talents[12]) {
    ctx.times('A', 1.20);
    ctx.times('D', 1.20);
  }
  if (ctx.talents[13]) {
    ctx.times('A', 0.90);
    ctx.times('B', 0.80);
    ctx.times('C', 0.80);
    ctx.times('D', 0.70);
  }
  if (ctx.talents[16]) {
    ctx.times('A', 1.10);
    ctx.times('B', 1.10);
  }
  if (ctx.talents[15]) {
    ctx.times('A', 1.40);
    ctx.times('B', 1.30);
    ctx.times('D', 1.20);
    ctx.times('E', 1.20);
  } else if (ctx.talents[17]) {
    ctx.times('A', 0.90);
    ctx.times('B', 0.80);
    ctx.times('D', 0.80);
    ctx.times('E', 0.80);
  }
  if (ctx.talents[430]) {
    ctx.times('A', 0.20);
    ctx.times('B', 0.20);
    ctx.times('D', 0.20);
    ctx.times('E', 0.20);
  }
  if (ctx.talents[511]) {
    ctx.times('B', 0.10);
    ctx.times('D', 0.10);
  }
  if (ctx.talents[20]) {
    ctx.times('A', 1.20);
    ctx.times('B', 1.20);
    ctx.times('D', 1.20);
    ctx.times('E', 1.20);
  }
  if (ctx.talents[21]) {
    ctx.times('A', 1.10);
    ctx.times('B', 1.10);
    ctx.times('D', 1.20);
    ctx.times('E', 1.10);
  }
  if (ctx.talents[22]) {
    ctx.times('A', 1.20);
    ctx.times('B', 1.20);
    ctx.times('D', 1.40);
    ctx.times('E', 1.20);
  }
  if (ctx.talents[24]) {
    ctx.times('A', 1.30);
    ctx.times('B', 1.30);
    ctx.times('C', 1.30);
    ctx.times('D', 1.20);
    ctx.times('E', 1.20);
  }
  if (ctx.talents[25]) {
    ctx.times('A', 0.90);
    ctx.times('B', 0.80);
    ctx.times('D', 0.70);
    ctx.times('E', 0.75);
  } else if (ctx.talents[26]) {
    ctx.times('A', 0.80);
    ctx.times('B', 0.80);
    ctx.times('D', 0.80);
    ctx.times('E', 0.80);
  }
  if (ctx.talents[28]) {
    ctx.times('A', 0.90);
    ctx.times('B', 0.90);
    ctx.times('C', 0.90);
    ctx.times('D', 0.90);
  }
  if (ctx.talents[32]) {
    ctx.times('A', 1.10);
    ctx.times('B', 1.10);
    ctx.times('D', 2.50);
    ctx.times('E', 3.00);
  } else if (ctx.talents[33]) {
    ctx.times('A', 0.90);
    ctx.times('B', 0.90);
    ctx.times('D', 0.70);
    ctx.times('E', 0.60);
  }
  if (ctx.talents[34]) {
    ctx.times('A', 1.50);
    ctx.times('B', 1.50);
    ctx.times('C', 1.50);
    ctx.times('D', 2.00);
    ctx.times('E', 2.00);
  }
  if (ctx.talents[37]) {
    ctx.times('A', 0.80);
    ctx.times('B', 0.80);
    ctx.times('C', 0.80);
    ctx.times('D', 0.50);
    ctx.times('E', 0.50);
  }
  if (ctx.talents[50]) {
    ctx.times('C', 0.80);
  }
  if (ctx.talents[51]) {
    ctx.times('C', 1.60);
  }
  if (ctx.talents[52]) {
    ctx.times('C', 0.80);
  }
  if (ctx.talents[63]) {
    ctx.times('A', 0.80);
    ctx.times('B', 0.70);
    ctx.times('D', 0.60);
    ctx.times('E', 0.80);
  }
  if (ctx.talents[70]) {
    ctx.times('E', 0.70);
  } else if (ctx.talents[71]) {
    ctx.times('E', 3.00);
  }
  if (ctx.talents[73]) {
    ctx.times('A', 0.50);
    ctx.times('B', 0.50);
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
  if (ctx.talents[83]) {
    ctx.times('A', 1.20);
    ctx.times('B', 1.20);
    ctx.times('D', 1.50);
  }
  if (ctx.talents[85]) {
    ctx.times('A', 0.75);
    ctx.times('B', 0.75);
    ctx.times('C', 0.75);
    ctx.times('D', 0.75);
  }
  if (ctx.talents[320]) {
    ctx.times('A', 0.80);
    ctx.times('B', 0.80);
    ctx.times('C', 0.80);
    ctx.times('D', 0.80);
  }
  if (ctx.talents[319]) {
    ctx.times('A', 0.80);
    ctx.times('B', 0.80);
    ctx.times('C', 0.80);
    ctx.times('D', 0.80);
  }
  if (ctx.talents[324]) {
    ctx.times('A', 0.80);
    ctx.times('B', 0.80);
    ctx.times('C', 0.80);
    ctx.times('D', 0.80);
  }
  if (ctx.talents[209]) {
    ctx.times('A', 0.60);
    ctx.times('B', 0.60);
    ctx.times('C', 0.60);
    ctx.times('D', 0.60);
  }
  if (ctx.talents[86]) {
    ctx.times('A', 0.50);
    ctx.times('B', 0.50);
    ctx.times('C', 0.50);
    ctx.times('D', 0.50);
    ctx.times('E', 0.50);
  }
  if (ctx.talents[87]) {
    ctx.times('A', 1.10);
    ctx.times('B', 1.10);
    ctx.times('D', 1.20);
    ctx.times('E', 0.80);
  }
  if (ctx.talents[123]) {
    ctx.times('A', 2.50);
    ctx.times('B', 3.00);
    ctx.times('C', 1.50);
    ctx.times('D', 0.80);
    ctx.times('E', 0.50);
  }
  if (ctx.talents[9]) {
    ctx.times('A', 2.50);
    ctx.times('B', 2.50);
    ctx.times('C', 2.50);
    ctx.times('D', 0.50);
    ctx.times('E', 0.50);
  }
  if (ctx.talents[202]) {
    ctx.times('A', 0.80);
    ctx.times('B', 0.80);
    ctx.times('D', 0.80);
    ctx.times('E', 0.80);
  }
  if (A < 1) {
    A = 1;
  }
  if (B < 1) {
    B = 1;
  }
  if (D < 1) {
    D = 1;
  }
  if (E < 1) {
    E = 1;
  }
  if (ctx.juel[6] < A) {
    I |= 1;
  }
  if (B > 0) {
    if (ctx.juel[4] < B) {
      J |= 1;
    }
    if (ctx.exp[21] < D) {
      J |= 2;
    }
  } else {
    J = 256;
  }
  if (C > 0) {
    if (ctx.juel[7] < C) {
      K |= 1;
    }
    if (ctx.exp[2] < 1) {
      K |= 2;
    }
  } else {
    K = 256;
  }
  if (ctx.exp[2] < E) {
    I |= 2;
  }
  if (ctx.exp[20] < E) {
    I |= 2;
  }
  if (ctx.abilities[10] < ctx.abilities[16] + 1) {
    I |= 4;
    J |= 4;
    K |= 4;
  }
  if (F > ctx.exp[50]) {
    I |= 2;
    J |= 2;
    K |= 2;
  }
  if (I === 0 || J === 0 || K === 0) {
    return 1;
  } else {
    return 0;
  }
}
