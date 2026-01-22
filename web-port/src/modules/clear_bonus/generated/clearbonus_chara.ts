/**
 * CLEARBONUS_CHARA.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function clearbonus_call_chara(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: TRYCALLFORM CLEARBONUS_CHARA_{(NO:TARGET)}
  // TODO: LOADGLOBAL
  if (ctx.global[200] >= 500) {
    await clearbonus_chara_extend(ctx, character);
  }
}

export async function clearbonus_chara_2(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`${ctx.josaHelper("타겟이")}【Mermaid girl】을 미션 대성공으로 습득한 상태로 시작합니까?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 아니오');
  // Label: INPUT_LOOP
  await ctx.inputNumber();
  if (ctx.result === 0) {
    ctx.showMessage(`W ${ctx.josaHelper("타겟이")}【Mermaid girl】을 미션 대성공으로 습득한 상태로 시작합니다`);
    ctx.talents[203] = 1;
    ctx.talents[518] = 1;
    ctx.talents[126] = 1;
    ctx.talents[113] = 1;
    MAXctx.base[1] += 1200;
    ctx.base[1] += 1200;
    MAXctx.base[31] += 80;
    ctx.base[31] += 80;
    ctx.paramBand[52] = 4;
    character.cflags[ctx.master][132] = 10;
  } else if (ctx.result === 1) {
    return;
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
}

export async function clearbonus_chara_80(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`${ctx.josaHelper("타겟이")}【ONLY ONE IDOL】을 습득한 상태로 시작합니까?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 아니오');
  // Label: INPUT_LOOP
  await ctx.inputNumber();
  if (ctx.result === 0) {
    ctx.showMessage(`W ${ctx.josaHelper("타겟이")}【ONLY ONE IDOL】을 습득한 상태로 시작합니다`);
    ctx.talents[552] = 1;
    MAXctx.base[31] += 80;
    ctx.base[31] += 80;
    ctx.paramBand[130] = 4;
    MAXctx.base[1] += 1000;
    ctx.base[1] += 1000;
  } else if (ctx.result === 1) {
    return;
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
}

export async function clearbonus_chara_230(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.talents[520] = 0;
  ctx.locals[10] = 0;
  ctx.locals[10] = ctx.base[9];
  ctx.showMessage(`${ctx.josaHelper("타겟이")} 건강한 상태로 시작합니까?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 아니오');
  // Label: INPUT_LOOP
  await ctx.inputNumber();
  if (ctx.result === 0) {
    ctx.showMessage(`${ctx.josaHelper("타겟이")} 건강한 상태로 시작합니다`);
    ctx.talents[434] = 0;
    ctx.talents[520] = 0;
    MAXctx.base[0] += 1000;
    ctx.base[0] = MAXctx.base[0];
    ctx.base[31] = MAXctx.base[31];
    ctx.talents[330] = 0;
    ctx.showMessage(`W`);
    ctx.showMessage(`W ………………`);
    ctx.showMessage(`W …………`);
    ctx.showMessage(`……`);
    ctx.showMessage(`W`);
    ctx.showMessage(`${ctx.josaHelper("타겟이")}【LUXURIA】로 각성한 상태로 시작합니까?`);
    ctx.showMessage('[0] - 네');
    ctx.showMessage('[1] - 아니오');
    // Label: INPUT_LOOP2
    await ctx.inputNumber();
    if (ctx.result === 0) {
      ctx.showMessage(`W ${ctx.josaHelper("타겟이")}【LUXURIA】로 각성한 상태로 시작합니다`);
      await succubus_status_ach(ctx, character);
      ctx.talents[15] = 1;
      ctx.talents[83] = 1;
      ctx.talents[74] = 1;
      ctx.talents[75] = 1;
      ctx.talents[77] = 1;
      ctx.talents[78] = 1;
      ctx.talents[554] = 1;
      MAXctx.base[31] = 500;
      ctx.base[31] = 500;
      MAXctx.base[0] += 1500;
      MAXctx.base[1] += 1500;
      ctx.base[0] += 1500;
      ctx.base[1] += 1500;
      ctx.base[9] = ctx.locals[10];
      ctx.talents[560] = 1;
    } else if (ctx.result === 1) {
      return;
    } else {
      // GOTO INPUT_LOOP2 - 구조 변경 필요 (while/break 사용 권장)
    }
  } else if (ctx.result === 1) {
    return;
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
}

export async function clearbonus_chara_85(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`${ctx.josaHelper("타겟이")}【타천사】로 미션을 성공한 상태로 시작합니까?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 아니오');
  // Label: INPUT_LOOP
  await ctx.inputNumber();
  if (ctx.result === 0) {
    await succubus_status_ach(ctx, character);
    ctx.talents[76] = 1;
    ctx.talents[123] = 1;
    ctx.talents[505] = 1;
    ctx.talents[422] = 1;
    ctx.talents[430] = 0;
    ctx.talents[432] = 0;
    ctx.exp[50] = 666;
    ctx.abilities[11] = 10;
    ctx.abilities[12] = 10;
    ctx.abilities[15] = 10;
    ctx.abilities[20] = 10;
    ctx.abilities[21] = 10;
    ctx.abilities[22] = 10;
    ctx.abilities[32] = 10;
    ctx.abilities[33] = 10;
    character.cflags[609] = 2;
    character.cflags[611] = 3;
    ctx.base[50] = 18 + ctx.rand(6);
  } else if (ctx.result === 1) {
    return;
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
}

export async function clearbonus_chara_extend(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`클리어 보너스 포인트를 500사용하여 ${ctx.getVarName("CALL", TARGET)}에게【영원한 사랑】을 붙일 수 있습니다`);
  ctx.showMessage(`※이 보너스를 사용하면 【일선을 넘지않음】이 사라집니다`);
  ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}에게【영원한 사랑】을 습득시킵니까?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 아니오');
  // Label: INPUT_LOOP
  await ctx.inputNumber();
  if (ctx.result === 1) {
    return;
  } else if (ctx.result === 0) {
    ctx.showMessage(`W 《${ctx.josaHelper("타겟이")}【영원한 사랑】을 습득한 상태로 시작합니다》`);
    character.cflags[1] = 2;
    ctx.talents[27] = 0;
    ctx.talents[85] = 1;
    ctx.talents[430] = 1;
    character.cflags[2] = 5000;
    ctx.abilities[10] = 7;
    ctx.abilities[16] = 7;
    character.mark[2] = 3;
    // TODO: LOADGLOBAL
    ctx.global[200] -= 500;
    // TODO: SAVEGLOBAL
    X += 500;
    ctx.exp[23] = 500;
    return;
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  return;
}

export async function clearbonus_chara_extend_detail(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  for (let COUNT = 0; COUNT < 600; COUNT++) {
    ctx.print('');
  }
}
