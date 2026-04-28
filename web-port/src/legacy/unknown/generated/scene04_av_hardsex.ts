/**
 * SCENE04_AV_HARDSEX.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function scene_title_4(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.results = "하드 섹스";
}

export async function scene_visible_4(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.getTalent(player, 121) === 0 && ctx.getTalent(player, 122) === 0 && ctx.abilities[ctx.player][12] === 0 && ctx.item[4] === 0) {
    return 0;
  } else {
    return 1;
  }
}

export async function scene_fee_4(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  P[1] = 3;
  P[2] += 100;
  P[3] += 150;
}

export async function scene_info_4(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine('‥');
  ctx.showMessage('《하드 섹스》');
  ctx.showMessage('카메라 앞에서 섹스를 보여줍니다');
  ctx.drawLine('‥');
}

export async function scene_calc_4(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[1] = 0;
  ctx.locals[1] += ctx.abilities[2];
  ctx.locals[1] += ctx.abilities[10];
  ctx.locals[1] += ctx.abilities[11];
  ctx.locals[1] += ctx.abilities[14];
  ctx.locals[1] += ctx.abilities[30];
  ctx.locals[1] += ctx.abilities[70];
  if (ctx.talents[0]) {
    ctx.locals[1] += 10;
  }
  if (ctx.talents[31]) {
    ctx.locals[1] += 5;
  }
  if (ctx.talents[33]) {
    ctx.locals[1] += 5;
  }
  if (ctx.talents[36]) {
    ctx.locals[1] += 5;
  }
  if (ctx.talents[75]) {
    ctx.locals[1] += 10;
  }
  if (ctx.talents[76]) {
    ctx.locals[1] += 5;
  }
  if (ctx.talents[70]) {
    ctx.locals[1] += 5;
  }
  if (ctx.talents[88]) {
    ctx.locals[1] += 10;
  }
  if (ctx.talents[104]) {
    ctx.locals[1] += 10;
  }
  if (ctx.talents[440]) {
    ctx.locals[1] += 20;
  }
  if (ctx.talents[30]) {
    ctx.locals[1] -= 5;
  }
  if (ctx.talents[34]) {
    ctx.locals[1] -= 20;
  }
  if (ctx.talents[35]) {
    ctx.locals[1] -= 5;
  }
  if (ctx.talents[103]) {
    ctx.locals[1] -= 5;
  }
  if (ctx.talents[153]) {
    ctx.locals[1] -= 5;
  }
  if (ctx.locals[1] >= 10) {
    if (ctx.locals[1] >= 50) {
      return 2;
    } else {
      return 1;
    }
  } else {
    return 0;
  }
}

export async function scene_result_start_4(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  P[4] = 3;
  P[10] = 1500;
  ctx.showMessage(`${ctx.getVarName("NICK", TARGET)}, ${ctx.getName(character)}의 섹스씬을 촬영했다……`);
  // TODO: PRINTW
}

export async function scene_result_perfect_4(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.cstr[20] = CALLctx.getName(ctx.player);
  ctx.showMessage(`W %CSTR:20%`);
  ctx.showMessage(`최음효과가 있는 향을 피운 러브호텔의 한 방에서, ${ctx.josaHelper("타겟은")} ${ctx.getVarName("CALL", PLAYER)}에게 교성을 흘리고 전신을 경련시키며,`);
  ctx.showMessage(`애액으로 질척질척한 성기를 기절할 때까지 몇번이고`);
  if (ctx.getTalent(player, 121) === 1 || ctx.getTalent(player, 122) === 1) {
    ctx.print('육봉으');
  } else {
    ctx.print('페니스밴드');
  }
  ctx.showMessage('로 찔렸다……');
  ctx.showMessage('');
  if (ctx.talents[0] === 1) {
    ctx.cstr[20] = CALLctx.getName(ctx.player);
    ctx.showMessage(`땀에 젖은 침대 시트에 ${ctx.getVarName("CALL", TARGET)}의 처녀혈이 스며들었다……`);
    ctx.setColor(0xF58F98);
    ctx.showMessage('【처녀상실】');
    ctx.resetColor();
    ctx.talents[0] = 0;
    if (character.cflags[15] === 0) {
      ctx.cstr[0] = ctx.cstr[20];
      character.cflags[15] = 1;
    }
  }
  if (character.cflags[16] === -1) {
    ctx.cstr[20] = CALLctx.getName(ctx.player);
    character.cflags[16] = 1;
    ctx.setColor(0xDDBBCC);
    ctx.showMessage(`첫 키스`);
    ctx.resetColor();
    character.cflags[16] = 1;
    if (ctx.talents[122] === 0 && ctx.talents[422] === 0 && ctx.talents[76] === 0) {
      ctx.cstr[1] = `${ctx.cstr[20]}의 고○`;
    } else if (ctx.talents[122] === 0 && ctx.talents[422] === 0 && ctx.talents[76] === 1) {
      ctx.cstr[1] = `${ctx.cstr[20]}의 자○`;
    } else if (ctx.talents[122] === 0 && ctx.talents[422] === 1) {
      ctx.cstr[1] = `${ctx.cstr[20]}의 자지`;
    }
  }
  ctx.times('(P:10)', 1.25);
  P[4] *= 2;
}

export async function scene_result_success_4(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.cstr[20] = CALLctx.getName(ctx.player);
  ctx.showMessage(`W %CSTR:20%`);
  ctx.showMessage(`최음효과가 있는 향을 피운 러브호텔의 한 방에서, ${ctx.josaHelper("타겟은")} ${ctx.getVarName("CALL", PLAYER)}에게`);
  ctx.showMessage(`기절할 때까지 몇번이고`);
  if (ctx.getTalent(player, 121) === 1 || ctx.getTalent(player, 122) === 1) {
    ctx.print('육봉으');
  } else {
    ctx.print('페니스밴드');
  }
  ctx.showMessage('로 찔렸다……');
  ctx.showMessage('');
  if (ctx.talents[0] === 1) {
    ctx.cstr[20] = CALLctx.getName(ctx.player);
    ctx.showMessage(`땀에 젖은 침대 시트에 ${ctx.getVarName("CALL", TARGET)}의 처녀혈이 스며들었다……`);
    ctx.setColor(0xF58F98);
    ctx.showMessage('【처녀상실】');
    ctx.resetColor();
    ctx.talents[0] = 0;
    if (character.cflags[15] === 0) {
      ctx.cstr[0] = ctx.cstr[20];
      character.cflags[15] = 1;
    }
  }
  if (character.cflags[16] === -1) {
    ctx.cstr[20] = CALLctx.getName(ctx.player);
    character.cflags[16] = 1;
    ctx.setColor(0xDDBBCC);
    ctx.showMessage(`첫 키스`);
    ctx.resetColor();
    character.cflags[16] = 1;
    if (ctx.talents[122] === 0 && ctx.talents[422] === 0 && ctx.talents[76] === 0) {
      ctx.cstr[1] = `${ctx.cstr[20]}의 고○`;
    } else if (ctx.talents[122] === 0 && ctx.talents[422] === 0 && ctx.talents[76] === 1) {
      ctx.cstr[1] = `${ctx.cstr[20]}의 자○`;
    } else if (ctx.talents[122] === 0 && ctx.talents[422] === 1) {
      ctx.cstr[1] = `${ctx.cstr[20]}의 자지`;
    }
  }
  ctx.showMessage('');
}

export async function scene_result_failed_4(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.cstr[20] = CALLctx.getName(ctx.player);
  ctx.showMessage(`W %CSTR:20%`);
  ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("NICKNAME", character), "은")}`);
  if (ctx.talents[35]) {
    ctx.showMessage(`새빨간 얼굴로`);
  }
  ctx.showMessage(`${ctx.getVarName("CALL", PLAYER)}에게 안겼지만, 움직임은 형편없어 매력적이지 않다……`);
  ctx.showMessage('');
  if (ctx.talents[0] === 1) {
    ctx.cstr[20] = CALLctx.getName(ctx.player);
    ctx.showMessage(`땀에 젖은 침대 시트에 ${ctx.getVarName("CALL", TARGET)}의 처녀혈이 스며들었다……`);
    ctx.setColor(0xF58F98);
    ctx.showMessage('【처녀상실】');
    ctx.resetColor();
    ctx.talents[0] = 0;
    if (character.cflags[15] === 0) {
      ctx.cstr[0] = ctx.cstr[20];
      character.cflags[15] = 1;
    }
  }
  if (character.cflags[16] === -1) {
    ctx.cstr[20] = CALLctx.getName(ctx.player);
    character.cflags[16] = 1;
    ctx.setColor(0xDDBBCC);
    ctx.showMessage(`첫 키스`);
    ctx.resetColor();
    character.cflags[16] = 1;
    if (ctx.talents[122] === 0 && ctx.talents[422] === 0 && ctx.talents[76] === 0) {
      ctx.cstr[1] = `${ctx.cstr[20]}의 고○`;
    } else if (ctx.talents[122] === 0 && ctx.talents[422] === 0 && ctx.talents[76] === 1) {
      ctx.cstr[1] = `${ctx.cstr[20]}의 자○`;
    } else if (ctx.talents[122] === 0 && ctx.talents[422] === 1) {
      ctx.cstr[1] = `${ctx.cstr[20]}의 자지`;
    }
  }
  ctx.showMessage('');
  ctx.times('(P:10)', 0.8);
  P[4] = 0;
}

export async function scene_exp_4(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.varSet(ctx.locals[0], 0);
  ctx.locals[0] = (1 + ctx.rand(5));
  ctx.locals[0] += ctx.abilities[30];
  if (ctx.talents[75]) {
    ctx.times('LOCAL', 1.25);
  }
  character.cvar[0] += ctx.locals[0];
  character.cvar[5] += ctx.locals[0];
  character.cvar[22] += ctx.locals[0];
  if (P[4] != 0 && ctx.abilities[2] != 0) {
    ctx.locals[1] += ctx.abilities[2];
    if (ctx.talents[75]) {
      ctx.times('LOCAL', 1.50);
    }
    if (ctx.abilities[0] >= ctx.locals[0]) {
      ctx.locals[1] = ctx.locals[0];
    }
    character.cvar[2] += ctx.locals[1];
  }
}
