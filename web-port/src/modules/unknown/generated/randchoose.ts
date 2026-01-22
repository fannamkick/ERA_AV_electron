/**
 * RANDCHOOSE.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function addrandchoose_arg_(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #DIM HOGE
  if (ctx.args[0] < 0) {
    ctx.showMessage('ERROR 후보로 음수를 지정할 수 없습니다'); ctx.waitInput();
    return;
  }
  RANDCHOOSE_NUM[0] += 1;
  HOGE = RANDCHOOSE_NUM[0];
  // Label: LOOP
  if (RANDCHOOSE_NUM:HOGE === 0) {
    RANDCHOOSE_NUM:HOGE = ctx.args[0] + 1;
  } else if (HOGE < RANDCHOOSE_MAX) {
    // TODO: HOGE ++
    // GOTO LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else {
    ctx.showMessage('ERROR ADDRANDCHOOSE 후보가 너무 많습니다'); ctx.waitInput();
  }
  RANDCHOOSE_NUM[0] = HOGE;
}

export async function randchoose(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = ctx.rand(RANDCHOOSE_NUM:0);
  ctx.locals[0] += 1;
  ctx.result = RANDCHOOSE_NUM:ctx.locals[0] - 1;
  return ctx.result;
}

export async function randchoose_f__(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #FUNCTION
  ctx.locals[0] = ctx.rand(RANDCHOOSE_NUM:0);
  ctx.locals[0] += 1;
  ctx.locals[1] = RANDCHOOSE_NUM:ctx.locals[0] - 1;
  return;
}

export async function clearrandchoose_arg(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.args[0] <= -1) {
    ctx.arrayShift(RANDCHOOSE_NUM,-1,0,RANDCHOOSE_NUM:0);
    RANDCHOOSE_NUM[0] -= 1;
  } else if (ctx.args[0] === 0) {
    ctx.varSet(RANDCHOOSE_NUM);
  } else if (ctx.args[0] != 0 && ctx.args[0] <= RANDCHOOSE_MAX - 1) {
    ctx.arrayShift(RANDCHOOSE_NUM,-1,0,ARG);
    RANDCHOOSE_NUM[0] -= 1;
  }
}

export async function clearspecificchoose_arg_(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[1] = 0;
  // TODO: FOR LOCAL,1,RANDCHOOSE_NUM:0 + 1
  if (RANDCHOOSE_NUM:ctx.locals[0] === (ctx.args[0] + 1)) {
    // TODO: ARRAYREMOVE RANDCHOOSE_NUM, LOCAL, 1
    ctx.locals[0] -= 1;
    ctx.locals[1] += 1;
  }
  // TODO: NEXT
  RANDCHOOSE_NUM[0] -= ctx.locals[1];
}

export async function choicecount_f__(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #FUNCTION
  ctx.locals[0] = RANDCHOOSE_NUM[0];
  return;
}
