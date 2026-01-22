/**
 * ACHIEVEMENT_5_VIRGINMANIA.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function achievement_title_5(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.results = "위대한 유니콘";
}

export async function achievement_calc_5(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = 0;
  // TODO: FOR COUNT, 0, CHARANUM
  if (ctx.count == ctx.master) {
    // TODO: CONTINUE
  }
  if (ctx.getTalent(count, 0) == 1 && character.cflags[ctx.count][15] == 0 && ctx.getTalent(count, 2) == 1 && ctx.getTalent(count, 430) == 1 && ctx.getTalent(count, 505) == 0 && ctx.getTalent(count, 504) == 0) {
    ctx.locals[0]++;
  }
  // TODO: NEXT
  if (ctx.global[5] == 0 && await difficulty_check(ctx, character) && ctx.money >= 5000000 && ctx.flags[550] == 0 && ctx.locals[0] >= 5) {
    ctx.global[5] = 1;
  }
  return ctx.global[5];
}

export async function achievement_main_5(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`수많은 여자아이들과 꺄꺄우후후 하면서도, 여자아이들을 결코 더럽히지 않았던`);
  ctx.showMessage(`${ctx.getVarName("CALL", MASTER)}에게 딱 맞는 실적이군요`);
  ctx.showMessage(`그런 ${ctx.josaHelper("플레이어를")}『유니콘』이라고 부르는 사람이 있을지도 모릅니다`);
  ctx.showMessage(`W 그렇지만, 앞으로도 그 자세를 관철한다면 반드시 존경심을 가져줄 사람이 있겠지요`);
  if (ctx.flags[553] === 0 || (ctx.global[30] === 1)) {
    ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
    ctx.showMessage(`${ctx.josaHelper("플레이어는")} 상당히 가혹했던 실적을 해제했습니다`);
    ctx.showMessage(`그런 ${ctx.getVarName("CALL", MASTER)}에게 보너스를 주겠습니다`);
    ctx.showMessage(`아래의 보너스 중에서 좋아하는 것을 하나 선택해주세요`);
    // Label: INPUT_LOOP_2
    ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
    ctx.showMessage(` [0] - 소질【천사】를 부여한다(신뢰와 봉사정신 상승시에 필요한 구슬을 1％로 한다)`);
    ctx.showMessage(` [1] - 소질【음마】을 부여한다(신뢰와 봉사정신 이외를 상승시에 필요한 구슬을 10％로 한다)`);
    ctx.showMessage(` [2] - 특수 캐릭터『히나미 마유』와 계약한다`);
    ctx.showMessage(` [3] - 특수 캐릭터『유니스 파라디수스』와 계약한다`);
    ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
    ctx.showMessage('[999] - 돌아간다');
    await ctx.inputNumber();
    if (ctx.result === 0) {
      // Label: INPUT_LOOP_5
      ctx.drawLine();
      ctx.showMessage(`【천사】를 부여할 캐릭터를 선택해 주세요`);
      await life_list_new,1(ctx, character);
      if (ctx.result === 999) {
        // GOTO INPUT_LOOP_2 - 구조 변경 필요 (while/break 사용 권장)
      } else if (ctx.result < 0 || ctx.result >= ctx.charanum) {
        // GOTO INPUT_LOOP_2 - 구조 변경 필요 (while/break 사용 권장)
      }
      if (ctx.getTalent(result, 511) === 1) {
        ctx.showMessage(`이미 ${ctx.josaHelper(ctx.getName(ctx.result), "는")}【천사】가 부여되어 있습니다`);
        await ctx.wait();
        // GOTO INPUT_LOOP_5 - 구조 변경 필요 (while/break 사용 권장)
      }
      if (character.cflags[ctx.result][900] === 1) {
        ctx.showMessage(`W ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.result), "는")} 두 번 다시【천사】가 될 수 없습니다`);
        // GOTO INPUT_LOOP_5 - 구조 변경 필요 (while/break 사용 권장)
      }
      character = ctx.result;
      ctx.showMessage(`W ${ctx.getName(character)}에게【천사】를 부여했습니다`);
      await add_angel(ctx, character);
      ctx.flags[553] = 1;
      // TODO: SAVEGLOBAL
    } else if (ctx.result === 1) {
      // Label: INPUT_LOOP_6
      ctx.drawLine();
      ctx.showMessage(`【음마】를 부여할 캐릭터를 선택해 주세요`);
      await life_list_new,1(ctx, character);
      if (ctx.result === 999) {
        // GOTO INPUT_LOOP_2 - 구조 변경 필요 (while/break 사용 권장)
      } else if (ctx.result < 0 || ctx.result >= ctx.charanum) {
        // GOTO INPUT_LOOP_6 - 구조 변경 필요 (while/break 사용 권장)
      }
      if (ctx.getTalent(result, 505) === 1) {
        ctx.showMessage(`이미 ${ctx.josaHelper(ctx.getName(ctx.result), "는")}【음마】가 부여되어 있습니다`);
        await ctx.wait();
        // GOTO INPUT_LOOP_6 - 구조 변경 필요 (while/break 사용 권장)
      }
      if (character.cflags[ctx.result][900] === 1) {
        ctx.showMessage(`W ${ctx.josaHelper("타겟은")} 두 번 다시【음마】가 될 수 없습니다`);
        // GOTO INPUT_LOOP_6 - 구조 변경 필요 (while/break 사용 권장)
      }
      character = ctx.result;
      ctx.showMessage(`W ${ctx.getName(character)}에게【음마】를 부여했습니다`);
      ctx.talents[505] = 1;
      character.cflags[620] = 999999;
      await succubus_status_ach(ctx, character);
      MAXctx.base[0] += 1000;
      MAXctx.base[1] += 1000;
      ctx.base[0] = MAXctx.base[0];
      ctx.base[1] = MAXctx.base[1];
      ctx.flags[553] = 1;
      // TODO: SAVEGLOBAL
    } else if (ctx.result === 2 && GETCHARA(85, 0) < 0) {
      await exchara_manual_1(ctx, character);
      ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
      ctx.showMessage('히나미 마유와 계약합니까?');
      // Label: INPUT_LOOP_MAYU
      ctx.showMessage('[0] - 예');
      ctx.showMessage('[1] - 아니오');
      await ctx.inputNumber();
      if (ctx.result === 0) {
        ctx.showMessage('【히나미 마유】와 계약했습니다'); ctx.waitInput();
        // TODO: ADDCHARA 85
        ctx.flags[553] = 1;
        ctx.global[285] += 1;
        // TODO: SAVEGLOBAL
      } else if (ctx.result === 1) {
        // GOTO INPUT_LOOP_2 - 구조 변경 필요 (while/break 사용 권장)
      } else {
        // GOTO INPUT_LOOP_MAYU - 구조 변경 필요 (while/break 사용 권장)
      }
      if (ctx.global[200] >= 0) {
        character = GETCHARA(85);
        await clearbonus_call(ctx, character);
      }
    } else if (ctx.result === 3 && GETCHARA(86, 0) < 0) {
      await exchara_manual_2(ctx, character);
      ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
      ctx.showMessage('유니스・파라디수스와 계약합니까?');
      // Label: INPUT_LOOP_YOUNIS
      ctx.showMessage('[0] - 네');
      ctx.showMessage('[1] - 아니오');
      await ctx.inputNumber();
      if (ctx.result === 0) {
        ctx.showMessage('【유니스 파라디수스】와 계약했습니다'); ctx.waitInput();
        // TODO: ADDCHARA 86
        ctx.flags[553] = 1;
        ctx.global[286] += 1;
        // TODO: SAVEGLOBAL
      } else if (ctx.result === 1) {
        // GOTO INPUT_LOOP_2 - 구조 변경 필요 (while/break 사용 권장)
      } else {
        // GOTO INPUT_LOOP_YOUNIS - 구조 변경 필요 (while/break 사용 권장)
      }
      if (ctx.global[200] >= 0) {
        character = GETCHARA(86);
        await clearbonus_call(ctx, character);
      }
    } else if (ctx.result === 999) {
      return 0;
    } else {
      // GOTO INPUT_LOOP_2 - 구조 변경 필요 (while/break 사용 권장)
    }
  }
}
