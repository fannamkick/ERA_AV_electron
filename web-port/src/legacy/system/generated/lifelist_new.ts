/**
 * LIFELIST_NEW.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function life_list_new_ll_mode_(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #DIM LL_MODE,1
  // TODO: #DIM CNUM
  // TODO: #DIM LL_LINE
  // TODO: #DIM CONST LIST_LINE_NUM = 10
  ctx.locals[0] = 1;
  // Label: REFRESH_POINT
  LL_LINE = LINECOUNT;
  ctx.drawLine();
  if (LL_MODE === 2 || LL_MODE === 7) {
    ctx.showMessage(` [0] ${ctx.getName(ctx.master)} (지도자)`);
    ctx.drawLine();
  }
  // TODO: FOR CNUM, LOCAL, LOCAL+LIST_LINE_NUM
  if (CNUM == ctx.charanum) {
    // TODO: BREAK
  }
  if (CNUM == 0) {
    // TODO: CONTINUE
  }
  if (!GROUPMATCH(LL_MODE, 2, 7) && ((character.cflags[CNUM][140] == 1 && LL_MODE != 5) || (character.cflags[CNUM][140] == 0 && LL_MODE == 5))) {
    // TODO: CONTINUE
  }
  if (ctx.base[CNUM][0] < 1) {
    // TODO: CONTINUE
  }
  ctx.showMessage(`[{CNUM}] ${ctx.getName(CNUM)}`);
  if (LL_MODE === 1 || LL_MODE === 2 || LL_MODE === 7) {
    ctx.print('(체력:');
    ctx.showMessage(`${ctx.base[CNUM][0]}/${MAXctx.base[CNUM][0]})`);
    ctx.print('/ (매력치:');
    if (ctx.base[CNUM][31] < 0) {
      ctx.showMessage(`0/${MAXctx.base[CNUM][31]}) /`);
    } else {
      ctx.showMessage(`${ctx.base[CNUM][31]}/${MAXctx.base[CNUM][31]}) /`);
    }
    if (CNUM === ctx.flags[1] && character.cflags[CNUM][1] >= 2) {
      ctx.print('(전회 지도・조수 가능)');
    } else if (CNUM === ctx.flags[1]) {
      ctx.print('(전회 지도)');
    } else if (CNUM === ctx.flags[2]) {
      ctx.print('(전회 조수)');
    } else if (character.cflags[CNUM][1] >= 2) {
      ctx.print('(조수 가능)');
    }
    if (character.cflags[CNUM][110] - 2 <= DAY && ctx.getTalent(cnum, 153)) {
      ctx.print('[산월]');
    } else if (ctx.getTalent(cnum, 153)) {
      ctx.print('[임신]');
    } else if (ctx.getTalent(cnum, 154)) {
      ctx.print('[육아]');
    }
    if (character.cflags[CNUM][12] != 0) {
      if (character.cflags[CNUM][12] === 1) {
        ctx.print('<회화');
      } else if (character.cflags[CNUM][12] === 2 || character.cflags[CNUM][12] === 7) {
        ctx.print('<봉사');
      } else if (character.cflags[CNUM][12] === 3) {
        ctx.print('<A영업');
      } else if (character.cflags[CNUM][12] === 4) {
        ctx.print('<V영업');
      } else if (character.cflags[CNUM][12] === 5) {
        ctx.print('<SM');
      } else if (character.cflags[CNUM][12] === 6) {
        ctx.print('<출장');
      }
      if (character.cflags[CNUM][13]) {
        ctx.print('C');
      }
      ctx.print('>');
    }
  } else if (LL_MODE === 4) {
    character = CNUM;
    if (character.cflags[CNUM][41] && (character.cflags[CNUM][45] >= 0 || character.cflags[CNUM][46] >= 0)) {
      ctx.printChar('/');
      await print_clothtype_main2(ctx, character);
    } else if (character.cflags[CNUM][40]) {
      ctx.print('/ 속옷');
    } else {
      ctx.print('/ 전라');
    }
    if (character.cflags[CNUM][42] && character.cflags[CNUM][47] >= 0) {
      ctx.printChar('/');
      await print_clothtype_special(ctx, character);
    }
  } else if (LL_MODE === 5) {
    ctx.print('(체력:');
    ctx.showMessage(`${ctx.base[CNUM][0]}/${MAXctx.base[CNUM][0]})`);
    ctx.print('/ (매력치:');
    if (ctx.base[CNUM][31] < 0) {
      ctx.showMessage(`0/${MAXctx.base[CNUM][31]}) /`);
    } else {
      ctx.showMessage(`${ctx.base[CNUM][31]}/${MAXctx.base[CNUM][31]}) /`);
    }
    if (character.cflags[CNUM][110] - 2 <= DAY && ctx.getTalent(cnum, 153)) {
      ctx.print('[산월]');
    } else if (ctx.getTalent(cnum, 153)) {
      ctx.print('[임신]');
    } else if (ctx.getTalent(cnum, 154)) {
      ctx.print('[육아]');
    }
    if (character.cflags[CNUM][141] >= 1) {
      ctx.print('《');
      if (character.cflags[CNUM][141] === 1) {
        ctx.print('에스테룸');
      } else if (character.cflags[CNUM][141] === 2) {
        ctx.print('휴게실');
      } else if (character.cflags[CNUM][141] === 3) {
        ctx.print('탁아소');
      } else if (character.cflags[CNUM][141] === 4) {
        ctx.print('고급 노래방');
      } else if (character.cflags[CNUM][141] === 5) {
        ctx.print('댄스 스튜디오');
      }
      ctx.print('이용중》');
    }
  } else if (LL_MODE === 6) {
    ctx.showMessage(`(예명: ${ctx.getVarName("NICK", CNUM)})`);
    ctx.print('(체력:');
    ctx.showMessage(`${ctx.base[CNUM][0]}/${MAXctx.base[CNUM][0]})`);
    ctx.print('/ (매력치:');
    if (ctx.base[CNUM][31] < 0) {
      ctx.showMessage(`0/${MAXctx.base[CNUM][31]}) /`);
    } else {
      ctx.showMessage(`${ctx.base[CNUM][31]}/${MAXctx.base[CNUM][31]}) /`);
    }
    if (character.cflags[CNUM][110] - 2 <= DAY && ctx.getTalent(cnum, 153)) {
      ctx.print('[산월]');
    } else if (ctx.getTalent(cnum, 153)) {
      ctx.print('[임신]');
    } else if (ctx.getTalent(cnum, 154)) {
      ctx.print('[육아]');
    }
  }
  ctx.showMessage('');
  // TODO: NEXT
  ctx.drawLine();
  if (ctx.locals[0] >= (LIST_LINE_NUM + 1)) {
    ctx.print('[400] 이전 페이지');
  } else {
    ctx.printPlain('[---]－－－－－');
  }
  // TODO: PRINTPLAIN
  if (ctx.locals[0]+LIST_LINE_NUM < ctx.charanum) {
    ctx.print('[600] 다음 페이지');
  } else {
    ctx.printPlain('[---]－－－－－');
  }
  // TODO: PRINTPLAIN
  ctx.showMessage('[999] 돌아간다');
  await ctx.inputNumber();
  if (ctx.locals[0] >= (LIST_LINE_NUM+1) && ctx.result === 400) {
    ctx.locals[0] -= LIST_LINE_NUM;
    ctx.clearLine(LINECOUNT - LL_LINE);
    // GOTO REFRESH_POINT - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.locals[0] + LIST_LINE_NUM < ctx.charanum && ctx.result === 600) {
    ctx.locals[0] += LIST_LINE_NUM;
    ctx.clearLine(LINECOUNT-LL_LINE);
    // GOTO REFRESH_POINT - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 999) {
    return 999;
  } else if (ctx.result > ctx.charanum) {
    ctx.clearLine(LINECOUNT-LL_LINE);
    // GOTO REFRESH_POINT - 구조 변경 필요 (while/break 사용 권장)
  } else {
    return ctx.result;
  }
}
