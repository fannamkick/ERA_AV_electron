/**
 * FUNC_TATTO.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function print_tatto(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.print('');
  if ((character.cflags[606] & 1)) {
    ctx.showMessage(`%CSTR:70%에 %CSTR:71%`);
    ctx.locals[0] = 1;
  }
  if ((character.cflags[606] & 2)) {
    if (ctx.locals[0]) {
      ctx.showMessage('문신과,');
      ctx.print('');
    }
    ctx.showMessage(`%CSTR:72%에 %CSTR:73%`);
    ctx.locals[0] = 1;
  }
  if ((character.cflags[606] & 4)) {
    if (ctx.locals[0]) {
      ctx.showMessage('문신과,');
      ctx.print('');
    }
    ctx.showMessage(`%CSTR:74%에 %CSTR:75%`);
    ctx.locals[0] = 1;
  }
  if ((character.cflags[606] & 8)) {
    if (ctx.locals[0]) {
      ctx.showMessage('문신과,');
      ctx.print('');
    }
    ctx.showMessage(`%CSTR:76%에 %CSTR:77%`);
    ctx.locals[0] = 1;
  }
  if ((character.cflags[606] & 16)) {
    if (ctx.locals[0]) {
      ctx.showMessage('문신과,');
      ctx.print('');
    }
    ctx.showMessage(`%CSTR:78%에 %CSTR:79%`);
    ctx.locals[0] = 1;
  }
}
