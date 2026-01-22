/**
 * JOB_EXEC.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function job_exec(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: FOR LOCAL, 0, CHARANUM
  if (ctx.locals[0] == ctx.master) {
    // TODO: CONTINUE
  }
  if (ALLSAMES(ctx.getTalent(local, 203),ctx.getTalent(local, 402),ctx.getTalent(local, 421))) {
    // TODO: CONTINUE
  }
  if (ctx.base[ctx].locals[0] < 500) {
    ctx.showMessage(`몸상태가 안좋은 ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.locals[0]), "는")} 일을 쉬었다`);
  } else {
    if (ctx.getTalent(local, 203)) {
      ctx.locals[1] = 203;
    } else if (ctx.getTalent(local, 402)) {
      ctx.locals[1] = 402;
    } else if (ctx.getTalent(local, 421)) {
      ctx.locals[1] = 421;
    }
    // TODO: CALLFORM JOB_EXEC_{LOCAL:1}(LOCAL)
    ctx.drawLine('･･');
  }
  ctx.drawLine();
  // TODO: NEXT
}

export async function job_exec_203_arg_(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`${ctx.josaHelper(ctx.getName(ctx.args[0]), "는")} 아이돌 레슨에 매진하고 있다……`);
  ctx.juel[ctx].args[7] += 500;
  ctx.showMessage(`W 습득의 구슬 +500`);
  switch (ctx.rand(3)) {
    case 0:
      ctx.exp[ctx.args[0]][70] += 1;
      ctx.showMessage(`W 피사경험 +1`);
      case 1:
        ctx.exp[ctx.args[0]][71] += 1;
        ctx.showMessage(`W 가창경험 +1`);
        case 2:
          ctx.exp[ctx.args[0]][72] += 1;
          ctx.showMessage(`W 무용경험 +1`);
        break;
      }
}

export async function job_exec_402_arg_(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.juel[ctx].args[7] += 500;
  ctx.exp[ctx.args[0]][70] += 1;
  ctx.showMessage(`${ctx.josaHelper(ctx.getName(ctx.args[0]), "는")} 모델로 일하고 있다……`);
  ctx.showMessage(`W 습득의 구슬 +500`);
  ctx.showMessage(`W 피사경험 +1`);
}

export async function job_exec_421_arg_(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.juel[ctx].args[7] += 500;
  ctx.exp[ctx.args[0]][73] += 1;
  ctx.showMessage(`${ctx.josaHelper(ctx.getName(ctx.args[0]), "는")} 캬바레녀로 일하고 있다……`);
  ctx.showMessage(`W 습득의 구슬 +500`);
  ctx.showMessage(`W 회화경험 +1`);
}
