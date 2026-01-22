/**
 * CALC_EXABL.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function add_exabl(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else if (character.cflags[ctx.count][680] === 1) {
      if (ctx.exp[ctx.count][120] <= 5 && ctx.abilities[ctx.count][50] === 1) {
        ctx.exp[ctx.count][120] = 5;
      } else if (ctx.exp[ctx.count][120] <= 10 && ctx.abilities[ctx.count][50] === 2) {
        ctx.exp[ctx.count][120] = 10;
      } else if (ctx.exp[ctx.count][120] <= 15 && ctx.abilities[ctx.count][50] === 3) {
        ctx.exp[ctx.count][120] = 15;
      } else if (ctx.exp[ctx.count][120] <= 20 && ctx.abilities[ctx.count][50] === 4) {
        ctx.exp[ctx.count][120] = 20;
      } else if (ctx.exp[ctx.count][120] <= 25 && ctx.abilities[ctx.count][50] === 5) {
        ctx.exp[ctx.count][120] = 25;
      } else if (ctx.exp[ctx.count][120] <= 30 && ctx.abilities[ctx.count][50] === 6 && (ctx.getTalent(count, 402) || ctx.getTalent(count, 203))) {
        ctx.exp[ctx.count][120] = 30;
      } else if (ctx.exp[ctx.count][120] <= 40 && ctx.abilities[ctx.count][50] === 7 && (ctx.getTalent(count, 402) || ctx.getTalent(count, 203))) {
        ctx.exp[ctx.count][120] = 40;
      } else if (ctx.exp[ctx.count][120] <= 50 && ctx.abilities[ctx.count][50] === 8 && (ctx.getTalent(count, 402) || ctx.getTalent(count, 203))) {
        ctx.exp[ctx.count][120] = 50;
      } else if (ctx.exp[ctx.count][120] <= 60 && ctx.abilities[ctx.count][50] === 9 && (ctx.getTalent(count, 509) || ctx.getTalent(count, 515) || ctx.getTalent(count, 518) || ctx.getTalent(count, 519) || ctx.getTalent(count, 522))) {
        ctx.exp[ctx.count][120] = 60;
      } else if (ctx.exp[ctx.count][120] <= 70 && ctx.abilities[ctx.count][50] === 10 && (ctx.getTalent(count, 509) || ctx.getTalent(count, 515) || ctx.getTalent(count, 518) || ctx.getTalent(count, 519) || ctx.getTalent(count, 522) || ctx.getTalent(count, 523))) {
        ctx.exp[ctx.count][120] = 70;
      }
      ctx.exp[ctx.count][120] += 1;
      if (ctx.getTalent(count, 402) || ctx.getTalent(count, 50)) {
        ctx.exp[ctx.count][120] += 1;
      }
      if (ctx.getTalent(count, 432)) {
        ctx.exp[ctx.count][120] += 2;
      }
      if (ctx.getTalent(count, 187)) {
        ctx.exp[ctx.count][120] += 3;
      }
    }
  }
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else if (character.cflags[ctx.count][681] === 1) {
      if (ctx.exp[ctx.count][121] <= 5 && ctx.abilities[ctx.count][51] === 1) {
        ctx.exp[ctx.count][121] = 5;
      } else if (ctx.exp[ctx.count][121] <= 10 && ctx.abilities[ctx.count][51] === 2) {
        ctx.exp[ctx.count][121] = 10;
      } else if (ctx.exp[ctx.count][121] <= 15 && ctx.abilities[ctx.count][51] === 3) {
        ctx.exp[ctx.count][121] = 15;
      } else if (ctx.exp[ctx.count][121] <= 20 && ctx.abilities[ctx.count][51] === 4) {
        ctx.exp[ctx.count][121] = 20;
      } else if (ctx.exp[ctx.count][121] <= 25 && ctx.abilities[ctx.count][51] === 5) {
        ctx.exp[ctx.count][121] = 25;
      } else if (ctx.exp[ctx.count][121] <= 30 && ctx.abilities[ctx.count][51] === 6 && (ctx.getTalent(count, 204) || ctx.getTalent(count, 16))) {
        ctx.exp[ctx.count][121] = 30;
      } else if (ctx.exp[ctx.count][121] <= 40 && ctx.abilities[ctx.count][51] === 7 && (ctx.getTalent(count, 204) || ctx.getTalent(count, 16))) {
        ctx.exp[ctx.count][121] = 40;
      } else if (ctx.exp[ctx.count][121] <= 50 && ctx.abilities[ctx.count][51] === 8 && (ctx.getTalent(count, 204) || ctx.getTalent(count, 16))) {
        ctx.exp[ctx.count][121] = 50;
      } else if (ctx.exp[ctx.count][121] <= 60 && ctx.abilities[ctx.count][51] === 9 && (ctx.getTalent(count, 204))) {
        ctx.exp[ctx.count][121] = 60;
      } else if (ctx.exp[ctx.count][121] <= 70 && ctx.abilities[ctx.count][51] === 10 && (ctx.getTalent(count, 204))) {
        ctx.exp[ctx.count][121] = 70;
      }
      ctx.exp[ctx.count][121] += 1;
      if (ctx.getTalent(count, 111)) {
        ctx.exp[ctx.count][121] += 1;
      }
      if (ctx.getTalent(count, 204)) {
        ctx.exp[ctx.count][121] += 2;
      }
      if (ctx.getTalent(count, 419)) {
        ctx.exp[ctx.count][121] += 3;
      }
    }
  }
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else if (character.cflags[ctx.count][682] === 1) {
      if (ctx.exp[ctx.count][122] <= 5 && ctx.abilities[ctx.count][52] === 1) {
        ctx.exp[ctx.count][122] = 5;
      } else if (ctx.exp[ctx.count][122] <= 10 && ctx.abilities[ctx.count][52] === 2) {
        ctx.exp[ctx.count][122] = 10;
      } else if (ctx.exp[ctx.count][122] <= 15 && ctx.abilities[ctx.count][52] === 3) {
        ctx.exp[ctx.count][122] = 15;
      } else if (ctx.exp[ctx.count][122] <= 20 && ctx.abilities[ctx.count][52] === 4) {
        ctx.exp[ctx.count][122] = 20;
      } else if (ctx.exp[ctx.count][122] <= 25 && ctx.abilities[ctx.count][52] === 5) {
        ctx.exp[ctx.count][122] = 25;
      } else if (ctx.exp[ctx.count][122] <= 30 && ctx.abilities[ctx.count][52] === 6 && (ctx.getTalent(count, 224) || ctx.getTalent(count, 50))) {
        ctx.exp[ctx.count][122] = 30;
      } else if (ctx.exp[ctx.count][122] <= 40 && ctx.abilities[ctx.count][52] === 7 && (ctx.getTalent(count, 224) || ctx.getTalent(count, 50))) {
        ctx.exp[ctx.count][122] = 40;
      } else if (ctx.exp[ctx.count][122] <= 50 && ctx.abilities[ctx.count][52] === 8 && (ctx.getTalent(count, 224) || ctx.getTalent(count, 50))) {
        ctx.exp[ctx.count][122] = 50;
      } else if (ctx.exp[ctx.count][122] <= 60 && ctx.abilities[ctx.count][52] === 9 && (ctx.getTalent(count, 224))) {
        ctx.exp[ctx.count][122] = 60;
      } else if (ctx.exp[ctx.count][122] <= 70 && ctx.abilities[ctx.count][52] === 10 && (ctx.getTalent(count, 224))) {
        ctx.exp[ctx.count][122] = 70;
      }
      ctx.exp[ctx.count][122] += 1;
      if (ctx.getTalent(count, 50)) {
        ctx.exp[ctx.count][224] += 1;
      }
      if (ctx.getTalent(count, 224)) {
        ctx.exp[ctx.count][122] += 2;
      }
    }
  }
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else if (character.cflags[ctx.count][683] === 1) {
      if (ctx.exp[ctx.count][123] <= 5 && ctx.abilities[ctx.count][81] === 1) {
        ctx.exp[ctx.count][123] = 5;
      } else if (ctx.exp[ctx.count][123] <= 10 && ctx.abilities[ctx.count][81] === 2) {
        ctx.exp[ctx.count][123] = 10;
      } else if (ctx.exp[ctx.count][123] <= 15 && ctx.abilities[ctx.count][81] === 3) {
        ctx.exp[ctx.count][123] = 15;
      } else if (ctx.exp[ctx.count][123] <= 20 && ctx.abilities[ctx.count][81] === 4) {
        ctx.exp[ctx.count][123] = 20;
      } else if (ctx.exp[ctx.count][123] <= 25 && ctx.abilities[ctx.count][81] === 5) {
        ctx.exp[ctx.count][123] = 25;
      } else if (ctx.exp[ctx.count][123] <= 30 && ctx.abilities[ctx.count][81] === 6 && (ctx.getTalent(count, 224) || ctx.getTalent(count, 50))) {
        ctx.exp[ctx.count][123] = 30;
      } else if (ctx.exp[ctx.count][123] <= 40 && ctx.abilities[ctx.count][81] === 7 && (ctx.getTalent(count, 224) || ctx.getTalent(count, 50))) {
        ctx.exp[ctx.count][123] = 40;
      } else if (ctx.exp[ctx.count][123] <= 50 && ctx.abilities[ctx.count][81] === 8 && (ctx.getTalent(count, 224) || ctx.getTalent(count, 50))) {
        ctx.exp[ctx.count][123] = 50;
      } else if (ctx.exp[ctx.count][123] <= 60 && ctx.abilities[ctx.count][81] === 9 && (ctx.getTalent(count, 224))) {
        ctx.exp[ctx.count][123] = 60;
      } else if (ctx.exp[ctx.count][123] <= 70 && ctx.abilities[ctx.count][81] === 10 && (ctx.getTalent(count, 224))) {
        ctx.exp[ctx.count][123] = 70;
      }
      ctx.exp[ctx.count][123] += 1;
      if (ctx.getTalent(count, 406) || ctx.getTalent(count, 50)) {
        ctx.exp[ctx.count][123] += 1;
      }
      if (ctx.getTalent(count, 405)) {
        ctx.exp[ctx.count][123] += 2;
      }
    }
  }
}

export async function exabl_b(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else if (ctx.exp[ctx.count][120] >= 5 && ctx.abilities[ctx.count][50] === 0) {
      ctx.abilities[ctx.count][50] += 1;
      ctx.showMessage(`《${ctx.getName(ctx.count)}의【${ctx.getVarName("ABL", 50)}】${ctx.josaHelper(ctx.getVarName("ABLNAME", 50), "가")} %조사처리(ABL:COUNT:50,"로")% 상승했다》`);
    } else if (ctx.exp[ctx.count][120] >= 10 && ctx.abilities[ctx.count][50] === 1) {
      ctx.abilities[ctx.count][50] += 1;
      ctx.showMessage(`《${ctx.getName(ctx.count)}의【${ctx.getVarName("ABL", 50)}】${ctx.josaHelper(ctx.getVarName("ABLNAME", 50), "가")} %조사처리(ABL:COUNT:50,"로")% 상승했다》`);
    } else if (ctx.exp[ctx.count][120] >= 15 && ctx.abilities[ctx.count][50] === 2) {
      ctx.abilities[ctx.count][50] += 1;
      ctx.showMessage(`《${ctx.getName(ctx.count)}의【${ctx.getVarName("ABL", 50)}】${ctx.josaHelper(ctx.getVarName("ABLNAME", 50), "가")} %조사처리(ABL:COUNT:50,"로")% 상승했다》`);
    } else if (ctx.exp[ctx.count][120] >= 20 && ctx.abilities[ctx.count][50] === 3) {
      ctx.abilities[ctx.count][50] += 1;
      ctx.showMessage(`《${ctx.getName(ctx.count)}의【${ctx.getVarName("ABL", 50)}】${ctx.josaHelper(ctx.getVarName("ABLNAME", 50), "가")} %조사처리(ABL:COUNT:50,"로")% 상승했다》`);
    } else if (ctx.exp[ctx.count][120] >= 25 && ctx.abilities[ctx.count][50] === 4) {
      ctx.abilities[ctx.count][50] += 1;
      ctx.showMessage(`《${ctx.getName(ctx.count)}의【${ctx.getVarName("ABL", 50)}】${ctx.josaHelper(ctx.getVarName("ABLNAME", 50), "가")} %조사처리(ABL:COUNT:50,"로")% 상승했다》`);
    } else if ((ctx.exp[ctx.count][120] >= 30 && ctx.abilities[ctx.count][50] === 5) && (ctx.getTalent(count, 402) || ctx.getTalent(count, 203))) {
      ctx.abilities[ctx.count][50] += 1;
      ctx.showMessage(`《${ctx.getName(ctx.count)}의【${ctx.getVarName("ABL", 50)}】${ctx.josaHelper(ctx.getVarName("ABLNAME", 50), "가")} %조사처리(ABL:COUNT:50,"로")% 상승했다》`);
    } else if ((ctx.exp[ctx.count][120] >= 40 && ctx.abilities[ctx.count][50] === 6) && (ctx.getTalent(count, 402) || ctx.getTalent(count, 203))) {
      ctx.abilities[ctx.count][50] += 1;
      ctx.showMessage(`《${ctx.getName(ctx.count)}의【${ctx.getVarName("ABL", 50)}】${ctx.josaHelper(ctx.getVarName("ABLNAME", 50), "가")} %조사처리(ABL:COUNT:50,"로")% 상승했다》`);
    } else if ((ctx.exp[ctx.count][120] >= 50 && ctx.abilities[ctx.count][50] === 7) && (ctx.getTalent(count, 402) || ctx.getTalent(count, 203))) {
      ctx.abilities[ctx.count][50] += 1;
      ctx.showMessage(`《${ctx.getName(ctx.count)}의【${ctx.getVarName("ABL", 50)}】${ctx.josaHelper(ctx.getVarName("ABLNAME", 50), "가")} %조사처리(ABL:COUNT:50,"로")% 상승했다》`);
    } else if ((ctx.exp[ctx.count][120] >= 60 && ctx.abilities[ctx.count][50] === 8) && (ctx.getTalent(count, 509) || ctx.getTalent(count, 515) || ctx.getTalent(count, 518) || ctx.getTalent(count, 519) || ctx.getTalent(count, 522) || ctx.getTalent(count, 523))) {
      ctx.abilities[ctx.count][50] += 1;
      ctx.showMessage(`《${ctx.getName(ctx.count)}의【${ctx.getVarName("ABL", 50)}】${ctx.josaHelper(ctx.getVarName("ABLNAME", 50), "가")} %조사처리(ABL:COUNT:50,"로")% 상승했다》`);
    } else if ((ctx.exp[ctx.count][120] >= 70 && ctx.abilities[ctx.count][50] === 9) && (ctx.getTalent(count, 509) || ctx.getTalent(count, 515) || ctx.getTalent(count, 518) || ctx.getTalent(count, 519) || ctx.getTalent(count, 522) || ctx.getTalent(count, 523))) {
      ctx.abilities[ctx.count][50] += 1;
      ctx.showMessage(`《${ctx.getName(ctx.count)}의【${ctx.getVarName("ABL", 50)}】${ctx.josaHelper(ctx.getVarName("ABLNAME", 50), "가")} %조사처리(ABL:COUNT:50,"로")% 상승했다》`);
    }
  }
}

export async function exabl_p(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else if (ctx.exp[ctx.count][121] >= 5 && ctx.abilities[ctx.count][51] === 0) {
      ctx.abilities[ctx.count][51] += 1;
      ctx.showMessage(`《${ctx.getName(ctx.count)}의【${ctx.getVarName("ABL", 51)}】${ctx.josaHelper(ctx.getVarName("ABLNAME", 51), "가")} %조사처리(ABL:COUNT:51,"로")% 상승했다》`);
    } else if (ctx.exp[ctx.count][121] >= 10 && ctx.abilities[ctx.count][51] === 1) {
      ctx.abilities[ctx.count][51] += 1;
      ctx.showMessage(`《${ctx.getName(ctx.count)}의【${ctx.getVarName("ABL", 51)}】${ctx.josaHelper(ctx.getVarName("ABLNAME", 51), "가")} %조사처리(ABL:COUNT:51,"로")% 상승했다》`);
    } else if (ctx.exp[ctx.count][121] >= 15 && ctx.abilities[ctx.count][51] === 2) {
      ctx.abilities[ctx.count][51] += 1;
      ctx.showMessage(`《${ctx.getName(ctx.count)}의【${ctx.getVarName("ABL", 51)}】${ctx.josaHelper(ctx.getVarName("ABLNAME", 51), "가")} %조사처리(ABL:COUNT:51,"로")% 상승했다》`);
    } else if (ctx.exp[ctx.count][121] >= 20 && ctx.abilities[ctx.count][51] === 3) {
      ctx.abilities[ctx.count][51] += 1;
      ctx.showMessage(`《${ctx.getName(ctx.count)}의【${ctx.getVarName("ABL", 51)}】${ctx.josaHelper(ctx.getVarName("ABLNAME", 51), "가")} %조사처리(ABL:COUNT:51,"로")% 상승했다》`);
    } else if (ctx.exp[ctx.count][121] >= 25 && ctx.abilities[ctx.count][51] === 4) {
      ctx.abilities[ctx.count][51] += 1;
      ctx.showMessage(`《${ctx.getName(ctx.count)}의【${ctx.getVarName("ABL", 51)}】${ctx.josaHelper(ctx.getVarName("ABLNAME", 51), "가")} %조사처리(ABL:COUNT:51,"로")% 상승했다》`);
    } else if ((ctx.exp[ctx.count][121] >= 30 && ctx.abilities[ctx.count][51] === 5) && (ctx.getTalent(count, 204) || ctx.getTalent(count, 16))) {
      ctx.abilities[ctx.count][51] += 1;
      ctx.showMessage(`《${ctx.getName(ctx.count)}의【${ctx.getVarName("ABL", 51)}】${ctx.josaHelper(ctx.getVarName("ABLNAME", 51), "가")} %조사처리(ABL:COUNT:51,"로")% 상승했다》`);
    } else if ((ctx.exp[ctx.count][121] >= 40 && ctx.abilities[ctx.count][51] === 6) && (ctx.getTalent(count, 204) || ctx.getTalent(count, 16))) {
      ctx.abilities[ctx.count][51] += 1;
      ctx.showMessage(`《${ctx.getName(ctx.count)}의【${ctx.getVarName("ABL", 51)}】${ctx.josaHelper(ctx.getVarName("ABLNAME", 51), "가")} %조사처리(ABL:COUNT:51,"로")% 상승했다》`);
    } else if ((ctx.exp[ctx.count][121] >= 50 && ctx.abilities[ctx.count][51] === 7) && (ctx.getTalent(count, 204) || ctx.getTalent(count, 16))) {
      ctx.abilities[ctx.count][51] += 1;
      ctx.showMessage(`《${ctx.getName(ctx.count)}의【${ctx.getVarName("ABL", 51)}】${ctx.josaHelper(ctx.getVarName("ABLNAME", 51), "가")} %조사처리(ABL:COUNT:51,"로")% 상승했다》`);
    } else if ((ctx.exp[ctx.count][121] >= 60 && ctx.abilities[ctx.count][51] === 8) && (ctx.getTalent(count, 204))) {
      ctx.abilities[ctx.count][51] += 1;
      ctx.showMessage(`《${ctx.getName(ctx.count)}의【${ctx.getVarName("ABL", 51)}】${ctx.josaHelper(ctx.getVarName("ABLNAME", 51), "가")} %조사처리(ABL:COUNT:51,"로")% 상승했다》`);
    } else if ((ctx.exp[ctx.count][121] >= 70 && ctx.abilities[ctx.count][51] === 9) && (ctx.getTalent(count, 204))) {
      ctx.abilities[ctx.count][51] += 1;
      ctx.showMessage(`《${ctx.getName(ctx.count)}의【${ctx.getVarName("ABL", 51)}】${ctx.josaHelper(ctx.getVarName("ABLNAME", 51), "가")} %조사처리(ABL:COUNT:51,"로")% 상승했다》`);
    }
  }
}

export async function exabl_s(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else if (ctx.exp[ctx.count][122] >= 5 && ctx.abilities[ctx.count][52] === 0) {
      ctx.abilities[ctx.count][52] += 1;
      ctx.showMessage(`《${ctx.getName(ctx.count)}의【${ctx.getVarName("ABL", 52)}】${ctx.josaHelper(ctx.getVarName("ABLNAME", 52), "가")} %조사처리(ABL:COUNT:52,"로")% 상승했다》`);
    } else if (ctx.exp[ctx.count][122] >= 10 && ctx.abilities[ctx.count][52] === 1) {
      ctx.abilities[ctx.count][52] += 1;
      ctx.showMessage(`《${ctx.getName(ctx.count)}의【${ctx.getVarName("ABL", 52)}】${ctx.josaHelper(ctx.getVarName("ABLNAME", 52), "가")} %조사처리(ABL:COUNT:52,"로")% 상승했다》`);
    } else if (ctx.exp[ctx.count][122] >= 15 && ctx.abilities[ctx.count][52] === 2) {
      ctx.abilities[ctx.count][52] += 1;
      ctx.showMessage(`《${ctx.getName(ctx.count)}의【${ctx.getVarName("ABL", 52)}】${ctx.josaHelper(ctx.getVarName("ABLNAME", 52), "가")} %조사처리(ABL:COUNT:52,"로")% 상승했다》`);
    } else if (ctx.exp[ctx.count][122] >= 20 && ctx.abilities[ctx.count][52] === 3) {
      ctx.abilities[ctx.count][52] += 1;
      ctx.showMessage(`《${ctx.getName(ctx.count)}의【${ctx.getVarName("ABL", 52)}】${ctx.josaHelper(ctx.getVarName("ABLNAME", 52), "가")} %조사처리(ABL:COUNT:52,"로")% 상승했다》`);
    } else if (ctx.exp[ctx.count][122] >= 25 && ctx.abilities[ctx.count][52] === 4) {
      ctx.abilities[ctx.count][52] += 1;
      ctx.showMessage(`《${ctx.getName(ctx.count)}의【${ctx.getVarName("ABL", 52)}】${ctx.josaHelper(ctx.getVarName("ABLNAME", 52), "가")} %조사처리(ABL:COUNT:52,"로")% 상승했다》`);
    } else if ((ctx.exp[ctx.count][122] >= 30 && ctx.abilities[ctx.count][52] === 5) && (ctx.getTalent(count, 224) || ctx.getTalent(count, 50))) {
      ctx.abilities[ctx.count][52] += 1;
      ctx.showMessage(`《${ctx.getName(ctx.count)}의【${ctx.getVarName("ABL", 52)}】${ctx.josaHelper(ctx.getVarName("ABLNAME", 52), "가")} %조사처리(ABL:COUNT:52,"로")% 상승했다》`);
    } else if ((ctx.exp[ctx.count][122] >= 40 && ctx.abilities[ctx.count][52] === 6) && (ctx.getTalent(count, 224) || ctx.getTalent(count, 50))) {
      ctx.abilities[ctx.count][52] += 1;
      ctx.showMessage(`《${ctx.getName(ctx.count)}의【${ctx.getVarName("ABL", 52)}】${ctx.josaHelper(ctx.getVarName("ABLNAME", 52), "가")} %조사처리(ABL:COUNT:52,"로")% 상승했다》`);
    } else if ((ctx.exp[ctx.count][122] >= 50 && ctx.abilities[ctx.count][52] === 7) && (ctx.getTalent(count, 224) || ctx.getTalent(count, 50))) {
      ctx.abilities[ctx.count][52] += 1;
      ctx.showMessage(`《${ctx.getName(ctx.count)}의【${ctx.getVarName("ABL", 52)}】${ctx.josaHelper(ctx.getVarName("ABLNAME", 52), "가")} %조사처리(ABL:COUNT:52,"로")% 상승했다》`);
    } else if ((ctx.exp[ctx.count][122] >= 60 && ctx.abilities[ctx.count][52] === 8) && (ctx.getTalent(count, 224))) {
      ctx.abilities[ctx.count][52] += 1;
      ctx.showMessage(`《${ctx.getName(ctx.count)}의【${ctx.getVarName("ABL", 52)}】${ctx.josaHelper(ctx.getVarName("ABLNAME", 52), "가")} %조사처리(ABL:COUNT:52,"로")% 상승했다》`);
    } else if ((ctx.exp[ctx.count][122] >= 70 && ctx.abilities[ctx.count][52] === 9) && (ctx.getTalent(count, 224))) {
      ctx.abilities[ctx.count][52] += 1;
      ctx.showMessage(`《${ctx.getName(ctx.count)}의【${ctx.getVarName("ABL", 52)}】${ctx.josaHelper(ctx.getVarName("ABLNAME", 52), "가")} %조사처리(ABL:COUNT:52,"로")% 상승했다》`);
    }
  }
}

export async function exabl_o(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else if (ctx.exp[ctx.count][123] >= 5 && ctx.abilities[ctx.count][81] === 0) {
      ctx.abilities[ctx.count][81] += 1;
      ctx.showMessage(`《${ctx.getName(ctx.count)}의【${ctx.getVarName("ABL", 81)}】이 %조사처리(ABL:COUNT:81,"로")% 상승했다》`);
    } else if (ctx.exp[ctx.count][123] >= 10 && ctx.abilities[ctx.count][81] === 1) {
      ctx.abilities[ctx.count][81] += 1;
      ctx.showMessage(`《${ctx.getName(ctx.count)}의【${ctx.getVarName("ABL", 81)}】이 %조사처리(ABL:COUNT:81,"로")% 상승했다》`);
    } else if (ctx.exp[ctx.count][123] >= 15 && ctx.abilities[ctx.count][81] === 2) {
      ctx.abilities[ctx.count][81] += 1;
      ctx.showMessage(`《${ctx.getName(ctx.count)}의【${ctx.getVarName("ABL", 81)}】이 %조사처리(ABL:COUNT:81,"로")% 상승했다》`);
    } else if (ctx.exp[ctx.count][123] >= 20 && ctx.abilities[ctx.count][81] === 3) {
      ctx.abilities[ctx.count][81] += 1;
      ctx.showMessage(`《${ctx.getName(ctx.count)}의【${ctx.getVarName("ABL", 81)}】이 %조사처리(ABL:COUNT:81,"로")% 상승했다》`);
    } else if (ctx.exp[ctx.count][123] >= 25 && ctx.abilities[ctx.count][81] === 4) {
      ctx.abilities[ctx.count][81] += 1;
      ctx.showMessage(`《${ctx.getName(ctx.count)}의【${ctx.getVarName("ABL", 81)}】이 %조사처리(ABL:COUNT:81,"로")% 상승했다》`);
    } else if ((ctx.exp[ctx.count][123] >= 30 && ctx.abilities[ctx.count][81] === 5) && (ctx.getTalent(count, 224) || ctx.getTalent(count, 50) || ctx.getTalent(count, 405) || ctx.getTalent(count, 406))) {
      ctx.abilities[ctx.count][81] += 1;
      ctx.showMessage(`《${ctx.getName(ctx.count)}의【${ctx.getVarName("ABL", 81)}】이 %조사처리(ABL:COUNT:81,"로")% 상승했다》`);
    } else if ((ctx.exp[ctx.count][123] >= 40 && ctx.abilities[ctx.count][81] === 6) && (ctx.getTalent(count, 224) || ctx.getTalent(count, 50) || ctx.getTalent(count, 405) || ctx.getTalent(count, 406))) {
      ctx.abilities[ctx.count][81] += 1;
      ctx.showMessage(`《${ctx.getName(ctx.count)}의【${ctx.getVarName("ABL", 81)}】이 %조사처리(ABL:COUNT:81,"로")% 상승했다》`);
    } else if ((ctx.exp[ctx.count][123] >= 50 && ctx.abilities[ctx.count][81] === 7) && (ctx.getTalent(count, 224) || ctx.getTalent(count, 50) || ctx.getTalent(count, 405) || ctx.getTalent(count, 406))) {
      ctx.abilities[ctx.count][81] += 1;
      ctx.showMessage(`《${ctx.getName(ctx.count)}의【${ctx.getVarName("ABL", 81)}】이 %조사처리(ABL:COUNT:81,"로")% 상승했다》`);
    } else if ((ctx.exp[ctx.count][123] >= 60 && ctx.abilities[ctx.count][81] === 8) && (ctx.getTalent(count, 224) || ctx.getTalent(count, 405) || ctx.getTalent(count, 406))) {
      ctx.abilities[ctx.count][81] += 1;
      ctx.showMessage(`《${ctx.getName(ctx.count)}의【${ctx.getVarName("ABL", 81)}】이 %조사처리(ABL:COUNT:81,"로")% 상승했다》`);
    } else if ((ctx.exp[ctx.count][123] >= 70 && ctx.abilities[ctx.count][81] === 9) && (ctx.getTalent(count, 224) || ctx.getTalent(count, 405) || ctx.getTalent(count, 406))) {
      ctx.abilities[ctx.count][81] += 1;
      ctx.showMessage(`《${ctx.getName(ctx.count)}의【${ctx.getVarName("ABL", 81)}】이 %조사처리(ABL:COUNT:81,"로")% 상승했다》`);
    }
  }
}
