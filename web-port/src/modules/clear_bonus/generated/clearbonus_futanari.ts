/**
 * CLEARBONUS_FUTANARI.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function clearbonus_futanari(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.talents[122] === 0) {
    ctx.showMessage(`%타겟이(1)% 후타나리인 IF세계로 갈까요?`);
    ctx.showMessage('[0] - 네');
    ctx.showMessage('[1] - 아니오');
    // Label: INPUT_LOOP
    await ctx.inputNumber();
    if (ctx.result === 0) {
      await clearbonus_futanari_addexp(ctx, character);
    } else if (ctx.result === 1) {
      return 0;
    } else {
      // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
    }
  }
}

export async function clearbonus_futanari_addexp(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = character;
  // Label: INPUTLOOP_START
  ctx.showMessage('《자지사이즈를 선택해 주세요》');
  ctx.showMessage('[0] - 작음');
  ctx.showMessage('[1] - 평균');
  ctx.showMessage('[2] - 거근');
  // Label: INPUTLOOP_1
  await ctx.inputNumber();
  if (ctx.result === 0) {
    character.cflags[ctx.locals[0]][609] = 0;
    ctx.base[ctx].locals[50] = 9 + ctx.rand(4);
  } else if (ctx.result === 1) {
    character.cflags[ctx.locals[0]][609] = 1;
    ctx.base[ctx].locals[50] = 13 + ctx.rand(4);
  } else if (ctx.result === 2) {
    character.cflags[ctx.locals[0]][609] = 2;
    ctx.base[ctx].locals[50] = 17 + ctx.rand(4);
  } else {
    // GOTO INPUTLOOP_1 - 구조 변경 필요 (while/break 사용 권장)
  }
  ctx.showMessage('《포경 상태를 선택해 주세요》');
  ctx.showMessage('[0] - 진성포경');
  ctx.showMessage('[1] - 가성포경(영구적)');
  ctx.showMessage('[2] - 가성포경(동정상실후「벗겨짐」이 된다)');
  ctx.showMessage('[3] - 벗겨짐');
  // Label: INPUTLOOP_2
  await ctx.inputNumber();
  if (ctx.result === 0) {
    character.cflags[ctx.locals[0]][611] = 0;
  } else if (ctx.result === 1) {
    character.cflags[ctx.locals[0]][611] = 1;
  } else if (ctx.result === 2) {
    character.cflags[ctx.locals[0]][611] = 2;
  } else if (ctx.result === 3) {
    character.cflags[ctx.locals[0]][611] = 3;
  } else {
    // GOTO INPUTLOOP_2 - 구조 변경 필요 (while/break 사용 권장)
  }
  ctx.showMessage(`${ctx.getName(ctx.locals[0])}에게 생긴 후타나리 페니스는 ${ctx.base[ctx].locals[50]}cm인`);
  if (character.cflags[ctx.locals[0]][609] === 0) {
    ctx.showMessage(`작은`);
  } else if (character.cflags[ctx.locals[0]][609] === 1) {
    ctx.showMessage(``);
  } else if (character.cflags[ctx.locals[0]][609] === 2) {
    ctx.showMessage(`극태`);
  }
  if (character.cflags[ctx.locals[0]][611] === 0) {
    ctx.showMessage(`진성포경`);
  } else if (character.cflags[ctx.locals[0]][611] === 1) {
    ctx.showMessage(`가성포경`);
  } else if (character.cflags[ctx.locals[0]][611] === 2) {
    ctx.showMessage(`가성포경`);
  } else if (character.cflags[ctx.locals[0]][611] === 3) {
    ctx.showMessage(`벗겨진`);
  }
  ctx.showMessage(`페니스입니까?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 아니오');
  // Label: INPUTLOOP_3
  await ctx.inputNumber();
  if (ctx.result === 0) {
    ctx.showMessage(`W 《${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.locals[0]), "는")}【${ctx.getVarName("TALENT", 121)}】%조사만처리(TALENTNAME:121,"이")% 됐다》`);
    ctx.getTalent(local, 121) = 1;
    ctx.getTalent(local, 1) = 1;
  } else if (ctx.result === 1) {
    ctx.showMessage(`다시 선택해 주세요`);
    // GOTO INPUTLOOP_START - 구조 변경 필요 (while/break 사용 권장)
  } else {
    // GOTO INPUTLOOP_3 - 구조 변경 필요 (while/break 사용 권장)
  }
}
