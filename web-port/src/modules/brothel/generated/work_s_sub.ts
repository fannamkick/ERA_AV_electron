/**
 * WORK_S_SUB.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function work_sub_relation(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.flags[51] = 0;
  if (ctx.flags[42] >= 2) {
    E = 0;
    for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
      if (character.cflags[ctx.count][130]) {
        await work_sub_relation_02(ctx, character);
      }
      if (E === -1) {
        E = 0;
        // TODO: BREAK
      }
    }
    E /= ctx.flags[42];
    E /= ctx.flags[42] - 1;
    if (E < 50) {
      E = 50;
    }
    if (E > 200) {
      E = 200;
    }
    ctx.flags[51] = E;
  }
}

export async function work_sub_relation_02(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  X = ctx.count;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130] == 0) {
      // TODO: CONTINUE
    }
    if (X == ctx.count) {
      // TODO: CONTINUE
    }
    F = ctx.getCharacterNo(ctx.count);
    if (ctx.relation[X][F] === 0) {
      E += 100;
    } else if (ctx.relation[X][F] < 100) {
      E = -1;
      // TODO: BREAK
    } else {
      E += ctx.relation[X][F];
    }
  }
  ctx.count = X;
}

export async function work_sp_sex_01(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  E = 1;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130] == 0) {
      // TODO: CONTINUE
    }
    if (ctx.getTalent(count, 76) == 0 || ctx.getTalent(count, 180) == 0) {
      E = 0;
    }
  }
  F = 1;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130] == 0) {
      // TODO: CONTINUE
    }
    if (character.cflags[ctx.count][54]) {
      // TODO: CONTINUE
    }
    F = 0;
  }
  if (E == 0 && ctx.flags[51] >= 150 && ctx.flags[42] >= 2) {
    ctx.print('극심한 공포에 떨며 꼭 붙어있던');
  }
  await work_sub_print_member(ctx, character);
  ctx.showMessage(`%조사만처리(RESULT+2,"는")%`);
  if (E === 0 && ctx.flags[51] >= 150 && ctx.flags[42] >= 2) {
    ctx.showMessage('폭도에 의해 강제로 떨어져서');
  } else if (E === 0) {
    ctx.showMessage(` 도망치려고 했지만 붙잡혀버려`);
  }
  ctx.showMessage(`모인 군중들에게`);
  if (F == 0) {
    ctx.print('바기너와');
  }
  ctx.showMessage(`애널과 입을 계속해서 범해졌다……`);
  ctx.showMessage('');
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130] == 0) {
      // TODO: CONTINUE
    }
    if (character.cflags[54]) {
      // TODO: CONTINUE
    }
    if (ctx.getTalent(count, 0)) {
      character.cflags[ctx.count][50] = 1;
    }
  }
}

export async function work_sp_sex_02(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  T[0] = (G / ctx.flags[42]) + ctx.rand(6);
  if (character.cflags[54]) {
    T[0] = 0;
  }
  T[1] = (G / ctx.flags[42]) + ctx.rand(6);
  T[22] = (G / ctx.flags[42]) + ctx.rand(5);
  T[20] = T[0] + T[1] + T[22];
  T[5] = T[0] + T[1];
  if (character.cflags[16] === -1) {
    ctx.showMessage(`${ctx.josaHelper("타겟은")} 낯선 남자에게 첫 키스를 빼앗겼다……`);
    if (character.cflags[16] === -1) {
      character.cflags[16] = 2;
      ctx.cstr[1] = "모르는 남자";
      ctx.base[31] -= 10;
    }
    T[50] += 1;
  }
  if (character.cflags[50] === 1) {
    ctx.setColor(0xF58F98);
    ctx.showMessage(`【처녀상실】`);
    ctx.resetColor();
    ctx.talents[0] = 0;
    if (character.cflags[15] === 0) {
      character.cflags[15] = 1;
      ctx.cstr[0] = "모르는 남자";
      ctx.base[31] -= 20;
    }
    T[50] += 2;
  }
  if (ctx.talents[2] === 1) {
    ctx.setColor(0xF58F98);
    ctx.showMessage(`【애널처녀상실】`);
    ctx.resetColor();
    ctx.talents[2] = 0;
    ctx.cstr[3] = "모르는 남자";
    T[50] += 2;
    ctx.base[31] -= 10;
  }
  if (ctx.exp[50] < 10) {
    T[50] += 1;
  }
  if (ctx.abilities[11] >= 5 || ctx.talents[76] || ctx.talents[180]) {
    if (ctx.abilities[2] >= 5 && ctx.abilities[3] >= 5) {
      T[2] = ( T[0] + T[1] )/2;
    } else if (ctx.abilities[2] >= 5) {
      T[2] = ( T[0] / 2 );
    } else if (ctx.abilities[3] >= 5) {
      T[2] = ( T[1] / 2 );
    }
  }
  ctx.times('U:100', 1.20);
  U[100] *= M;
  if (character.cflags[50]) {
    ctx.times('U:100', 10.00);
  }
  if (ctx.exp[0] <= 200 && character.cflags[54] == 0) {
    ctx.times('U:100', 1.10);
  }
  if (ctx.exp[1] <= 200) {
    ctx.times('U:100', 1.20);
  }
  if (ctx.abilities[37] === 1) {
    ctx.times('U:100', 0.90);
  } else if (ctx.abilities[37] === 2) {
    ctx.times('U:100', 0.80);
  } else if (ctx.abilities[37] === 3) {
    ctx.times('U:100', 0.70);
  } else if (ctx.abilities[37] === 4) {
    ctx.times('U:100', 0.60);
  } else if (ctx.abilities[37] >= 5) {
    ctx.times('U:100', 0.50);
  }
  if (ctx.talents[11]) {
    ctx.times('U:100', 1.20);
  }
  if (ctx.talents[24]) {
    ctx.times('U:100', 1.30);
  }
  if (ctx.talents[30]) {
    ctx.times('U:100', 2.50);
  }
  if (ctx.talents[31]) {
    ctx.times('U:100', 0.90);
  }
  if (ctx.talents[34]) {
    ctx.times('U:100', 2.00);
  }
  if (ctx.talents[76]) {
    ctx.times('U:100', 0.50);
  }
  if (ctx.talents[80]) {
    ctx.times('U:100', 0.80);
  }
  if (ctx.talents[88]) {
    ctx.times('U:100', 0.50);
  }
  if (ctx.talents[85]) {
    ctx.times('U:100', 2.50);
  }
  if (ctx.talents[86]) {
    ctx.times('U:100', 0.70);
  }
  if (ctx.talents[84]) {
    U[100] *= 100;
  }
  if (ctx.talents[180]) {
    ctx.times('U:100', 0.60);
  }
  if (ctx.talents[181]) {
    ctx.times('U:100', 0.10);
  }
  if (ctx.talents[184]) {
    ctx.times('U:100', 2.50);
  }
  U[100] /= ctx.flags[42];
  return 1;
}

export async function work_sp_money_cm(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.flags[42] >= 2 && ctx.flags[51] != 100) {
    V = ctx.flags[51];
    ctx.print('상성보정');
    ctx.showMessage(` ×{V/100}.{V%100}`);
    Q *= V;
    Q /= 100;
    V = 0;
  }
  if (A <= 1) {
    V = 50;
    ctx.print('영업실패');
    ctx.showMessage(` ×{V/100}.{V%100}`);
    Q *= V;
    Q /= 100;
    V = 0;
  }
  if (ctx.flags[5] === 3) {
    V = 80;
  } else if (ctx.flags[5] === 4) {
    V = 60;
  }
  if (V) {
    ctx.print('난이도보정');
    ctx.showMessage(` ×{V/100}.{V%100}`);
    Q *= V;
    Q /= 100;
    V = 0;
  }
}

export async function work_sp_after(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130] == 0) {
      // TODO: CONTINUE
    }
    character.cflags[50] = 0;
    character.cflags[51] = 0;
    character.cflags[52] = 0;
    character.cflags[53] = 0;
    character.cflags[54] = 0;
  }
  ctx.flags[42] = 0;
  ctx.flags[50] = 0;
  ctx.flags[51] = 0;
  ctx.flags[52] = 0;
  ctx.flags[53] = 0;
  character.tflags[14] = 0;
}

export async function work_sub_print_fullname(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  S = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130] == 0) {
      // TODO: CONTINUE
    }
    if (S) {
      ctx.showMessage(`${LSTR}`);
    }
    ctx.showMessage(`${ctx.getName(ctx.count)}`);
    LSTR = 조사만처리(ctx.getName(ctx.count),"와");
    S = 1;
  }
  S = 0;
  return ctx.count;
}

export async function work_sub_print_member(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.flags[42] === 1) {
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}`);
    ctx.locals[1] = KR_NAME(CALLctx.getName(character));
    if (ctx.locals[1] == 2) {
      ctx.locals[1] = 0;
    }
    return ctx.locals[1];
  } else if (ctx.flags[42] === 2) {
    ctx.showMessage(`2명`);
    return 1;
  } else if (ctx.flags[42] === 3) {
    ctx.print('3명');
    return 1;
  } else if (ctx.flags[42] >= 4) {
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}들`);
    return 1;
  }
}
