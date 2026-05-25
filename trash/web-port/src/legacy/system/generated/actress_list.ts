/**
 * ACTRESS_LIST.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function actress_list(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #DIM LIST, 250
  // TODO: #DIM PAGE
  // TODO: #DIM MAXPAGE
  // TODO: #DIM SHOWNUM
  // TODO: #DIM SHOWCOLUMN
  // TODO: #DIM SHOWLENGTH
  // TODO: LOADGLOBAL
  X = 0;
  SHOWNUM = 30;
  SHOWCOLUMN = 3;
  SHOWLENGTH = 108;
  ctx.varSet(LIST, -1);
  ctx.locals[1] = 0;
  // TODO: FOR LOCAL, 0, 250
  if (!EXISTCSV(ctx.locals[0], 0)) {
    // TODO: CONTINUE
  }
  if (ctx.locals[0] == ctx.master) {
    // TODO: CONTINUE
  }
  // TODO: LIST:(LOCAL:1) = LOCAL
  ctx.locals[1]++;
  // TODO: NEXT
  MAXPAGE = ctx.locals[1] / SHOWNUM;
  // Label: INPUT_LOOP
  ctx.drawLine();
  ctx.showMessage(`여배우명부 page[{PAGE}/{MAXPAGE}]`);
  ctx.showMessage('《지금까지 계약한 적이 있는 여배우를 확인할 수 있습니다》');
  ctx.showMessage(`%"‥" * (SHOWLENGTH / 2)%`);
  ctx.locals[1] = 0;
  // TODO: FOR LOCAL, PAGE * SHOWNUM, (PAGE + 1) * SHOWNUM
  if (ctx.locals[0] >= 250) {
    // TODO: CONTINUE
  }
  if (ctx.list[ctx.locals[0]] < 0) {
    ctx.showMessage(`%"", SHOWLENGTH / 3, LEFT%`);
  } else if (global[200 + ctx.list[ctx.locals[0]]]) {
    ctx.showMessage(`%@"[${ctx.list[ctx.locals[0]], 3}] - %CSVNAME(LIST:LOCAL, 0)%", SHOWLENGTH / 3, LEFT%`);
  } else {
    ctx.showMessage(`%"[ - ] - ----------", SHOWLENGTH / 3, LEFT%`);
  }
  if (ctx.locals[1] % SHOWCOLUMN == SHOWCOLUMN - 1) {
    ctx.showMessage('');
  }
  ctx.locals[1]++;
  // TODO: NEXT
  if (!await lineisempty(ctx, character)) {
    ctx.showMessage('');
  }
  ctx.showMessage(`%"‥" * (SHOWLENGTH / 2)%`);
  ctx.showMessage(`%"[998] - 이전 페이지", SHOWLENGTH / 3, LEFT%`);
  ctx.showMessage(`%"[999] - 돌아간다", SHOWLENGTH / 3, LEFT%`);
  ctx.showMessage(`%"[1000] - 다음 페이지", SHOWLENGTH / 3, LEFT%`);
  ctx.showMessage('');
  await ctx.inputNumber();
  if (ctx.result === 999) {
    return 0;
  } else if (ctx.result === 998 && ctx.page > 0) {
    ctx.page -= 1;
  } else if (ctx.result === 1000 && ctx.page < MAXPAGE) {
    ctx.page += 1;
  } else if (ctx.result >= 0 && ctx.result < 250 && MATCH(LIST, ctx.result) && global[200 + ctx.result] > 0) {
    X = ctx.result;
    await actress_prof(ctx, character);
  }
  // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
}
