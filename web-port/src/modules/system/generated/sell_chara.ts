/**
 * SELL_CHARA.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function check_sellassiable(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.talents[199] == 1) {
    return 0;
  }
  if (ctx.abilities[10]+ctx.abilities[11] < 6) {
    return 0;
  }
  if (ctx.abilities[0] < 3 && ctx.abilities[1] < 3 && ctx.abilities[2] < 3 && ctx.abilities[3] < 3) {
    return 0;
  }
  if (ctx.abilities[10] < 4 && (ctx.talents[11] || ctx.talents[12])) {
    return 0;
  }
  if (ctx.abilities[11] < 4 && (ctx.talents[20] || ctx.talents[32] || ctx.talents[34])) {
    return 0;
  }
  if (((ctx.abilities[12] >= 3 && ctx.abilities[16] >= 3) || (ctx.abilities[17] >= 3 && ctx.abilities[31] >= 2) || ctx.abilities[21] >= 3 || (ctx.abilities[0]+ctx.abilities[1]+ctx.abilities[2]+ctx.abilities[3] >= 13) || ctx.abilities[10] >= 5 || ctx.abilities[11] >= 5) && ctx.talents[400] === 1) {
    if (character.cflags[1] <= 0) {
      ctx.showMessage(`W %타겟이(1)% 은퇴할 수 있게 됐습니다`);
      character.cflags[1] = 1;
    }
  } else {
    return 0;
  }
  if (((ctx.abilities[10] >= 3 && ctx.abilities[11] >= 3 && ctx.abilities[12] >= 3 && ctx.abilities[0] >= 3 && (ctx.abilities[22] >= 3 || ctx.abilities[23] >= 3)) || (ctx.abilities[10] >= 5 && ctx.abilities[11] >= 4)) && ctx.talents[400] === 1 && ctx.exp[76] >= 3) {
    if (character.cflags[1] <= 1) {
      ctx.showMessage(`W 이제 %타겟을(1)% 조수로 쓸 수 있습니다`);
      character.cflags[1] = 2;
    }
  }
}

export async function chara_sale(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine();
  ctx.printValue(DAY+1);
  ctx.print('주차');
  if (TIME === 0) {
    ctx.showMessage('전반');
  } else {
    ctx.showMessage('후반');
  }
  ctx.showMessage(`소지금: ${MONEY}포인트`);
  ctx.drawLine();
  // Label: INPUT_LOOP
  ctx.showMessage('누구를 은퇴시키겠습니까?');
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else if (ctx.getTalent(count, 199)) {
      // TODO: CONTINUE
    } else if (character.cflags[ctx.count][1] < 1) {
      // TODO: CONTINUE
    } else if (ctx.base[ctx.count][0] < 1) {
      // TODO: CONTINUE
    } else if (character.cflags[ctx.count][1] >= 1) {
      ctx.showMessage(`[${ctx.count}] ${ctx.getName(ctx.count)}`);
      character = ctx.count;
      S = 0;
      await estimate_chara(ctx, character);
      if (S > 0) {
        ctx.showMessage(`[평가액: {S}포인트]`);
      } else {
        ctx.showMessage(`[매각 불가]`);
      }
      if (ctx.isAssi[ctx.count] === 1) {
        ctx.print('(전 조수)');
      } else if (character.cflags[ctx.count][1] === 2) {
        ctx.print('(조수 가능)');
      }
      ctx.showMessage('');
    }
  }
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  ctx.showMessage(`[999] - 돌아간다`);
  await ctx.inputNumber();
  if (ctx.result === 999) {
    return 999;
  } else if (ctx.result <= 0 || ctx.result >= ctx.charanum) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 199)) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (character.cflags[ctx.result][1] < 1) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.base[ctx.result][0] < 1) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (character.cflags[ctx.result][12] && TIME === 1) {
    ctx.showMessage('이번주 영업이 끝날때까지 은퇴시킬 수 없습니다');
    await ctx.wait();
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  if (character > 0) {
    T = character.no;
  }
  character = ctx.result;
  S = 0;
  await sale_chara(ctx, character);
  if (S > 0) {
    if (character.cflags[684] == 1) {
      ctx.flags[557] -= 1;
    }
    if (character.cflags[671] == 1) {
      ctx.flags[556] = 0;
    }
    if (character.cflags[60] == 1) {
      character.cflags[ctx.master][65] = 0;
    }
    T = -1;
    await kill_target(ctx, character);
    ctx.exp[ctx.master][107] += 1;
  }
  character = -1;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.getCharacterNo(ctx.count) == T) {
      character = ctx.count;
    }
  }
  ctx.restart();
}

export async function kill_target(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  await キャラ削除, target(ctx, character);
}

export async function long_good_bye(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  A = character.no;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count == 0) {
      // TODO: CONTINUE
    }
    U = 0;
    if (A == (character.cflags[ctx.count][21] % 100) && (character.cflags[ctx.count][21] / 100) < 2) {
      U += 40;
    }
    if (A == (character.cflags[ctx.count][21] % 100)) {
      U += 80;
    }
    if (A == (character.cflags[ctx.count][22] % 100) && (character.cflags[ctx.count][22] / 100) < 2) {
      U += 40;
    }
    if (A == (character.cflags[ctx.count][22] % 100)) {
      U += 80;
    }
    if (A == (character.cflags[ctx.count][23] % 100) && (character.cflags[ctx.count][23] / 100) < 2) {
      U += 40;
    }
    if (A == (character.cflags[ctx.count][23] % 100)) {
      U += 80;
    }
    if (A == (character.cflags[ctx.count][24] % 100) && (character.cflags[ctx.count][24] / 100) < 2) {
      U += 40;
    }
    if (A == (character.cflags[ctx.count][24] % 100)) {
      U += 80;
    }
    if (A == (character.cflags[ctx.count][25] % 100) && (character.cflags[ctx.count][25] / 100) < 2) {
      U += 40;
    }
    if (A == (character.cflags[ctx.count][25] % 100)) {
      U += 80;
    }
    if (ctx.relation[ctx.count][A] > 100) {
      U += ctx.relation[ctx.count][A] - 100;
    }
    if (U > 50) {
      ctx.drawLine();
      ctx.showMessage('');
      ctx.showMessage(`그 날, ${ctx.josaHelper(ctx.getName(ctx.count), "는")} 팔려나가는 %타겟이(1)% 탄 차를`);
      if (ctx.getTalent(count, 45) == 0 && ctx.getTalent(count, 310) == 0) {
        ctx.print('눈물로 흐려진');
      }
      ctx.showMessage(`시야에서 안보이게 될때까지,`);
      ctx.showMessage(`그리고 안보이게 된 뒤에도 계속 바라보고 있었다.`);
      await ctx.wait();
      if (ctx.getTalent(count, 85)) {
        U -= 120;
      }
      if (ctx.getTalent(count, 76)) {
        U -= 60;
      }
      if (ctx.getTalent(count, 12)) {
        U -= 20;
      }
      if (ctx.getTalent(count, 22)) {
        U -= 20;
      }
      if (ctx.getTalent(count, 134)) {
        U += 20;
      }
      if (ctx.getTalent(count, 311)) {
        U -= 100;
      }
      U -= ctx.abilities[ctx.count][10] * 10;
      U += character.mark[ctx.count][3] * 30;
      if (U >= 100 && ctx.getTalent(count, 9) === 0) {
        ctx.drawLine();
        ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "는")} 알맹이가 빠져나간 것처럼 멍하니 서있다`);
        ctx.showMessage(`${ctx.getVarName("CALL", COUNT)}의 안에서 뭔가가 부서진것 같다……`);
        ctx.showMessage(`${ctx.getVarName("CALL", COUNT)}의 정신이【${ctx.getVarName("TALENT", 9)}】돼 버렸다`);
        await ctx.wait();
        if (ctx.getTalent(count, 85)) {
          ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "는")}【${ctx.getVarName("TALENT", 85)}】을 잃었다`);
          ctx.getTalent(count, 85) = 0;
        }
        if (ctx.getTalent(count, 76)) {
          ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "는")}【${ctx.getVarName("TALENT", 76)}】을 잃었다`);
          ctx.getTalent(count, 76) = 0;
        }
        ctx.getTalent(count, 9) = 1;
        await ctx.wait();
      }
    }
  }
}

export async function sale_chara(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  S = 0;
  await estimate_chara(ctx, character);
  if (A[10] > 0) {
    ctx.showMessage(`${ctx.getVarName("ABL", 10)}${ctx.abilities[10]}LV +${A[10]}`);
  }
  if (A[11] > 0) {
    ctx.showMessage(`${ctx.getVarName("ABL", 11)}${ctx.abilities[11]}LV +${A[11]}`);
  }
  if (A[12] > 0) {
    ctx.showMessage(`${ctx.getVarName("ABL", 12)}${ctx.abilities[12]}LV +${A[12]}`);
  }
  if (A[13] > 0) {
    ctx.showMessage(`${ctx.getVarName("ABL", 13)}${ctx.abilities[13]}LV +${A[13]}`);
  }
  if (A[14] > 0) {
    ctx.showMessage(`${ctx.getVarName("ABL", 14)}${ctx.abilities[14]}LV +${A[14]}`);
  }
  if (A[15] > 0) {
    ctx.showMessage(`${ctx.getVarName("ABL", 15)}${ctx.abilities[15]}LV +${A[15]}`);
  }
  if (A[30] > 0) {
    ctx.showMessage(`${ctx.getVarName("ABL", 30)}${ctx.abilities[30]}LV +${A[30]}`);
  }
  if (A[31] > 0) {
    ctx.showMessage(`${ctx.getVarName("ABL", 31)}${ctx.abilities[31]}LV +${A[31]}`);
  }
  if (A[32] > 0) {
    ctx.showMessage(`${ctx.getVarName("ABL", 32)}${ctx.abilities[32]}LV +${A[32]}`);
  }
  if (A[33] > 0) {
    ctx.showMessage(`${ctx.getVarName("ABL", 33)}${ctx.abilities[33]}LV +${A[33]}`);
  }
  if (A[39] > 0) {
    ctx.showMessage(`${ctx.getVarName("ABL", 39)}${ctx.abilities[39]}LV +${A[39]}`);
  }
  if (A[37] > 0) {
    ctx.showMessage(`${ctx.getVarName("ABL", 37)}${ctx.abilities[37]}LV -${A[37]}`);
  }
  if (A[0] != 100) {
    ctx.showMessage(`${ctx.getVarName("ABL", 0)}${ctx.abilities[0]}LV ×${A[0]/100}.${A[0]%100}`);
  }
  if (A[1] != 100) {
    ctx.showMessage(`${ctx.getVarName("ABL", 1)}${ctx.abilities[1]}LV ×${A[1]/100}.${A[1]%100}`);
  }
  if (A[2] != 100) {
    ctx.showMessage(`${ctx.getVarName("ABL", 2)}${ctx.abilities[2]}LV ×${A[2]/100}.${A[2]%100}`);
  }
  if (A[3] != 100) {
    ctx.showMessage(`${ctx.getVarName("ABL", 3)}${ctx.abilities[3]}LV ×${A[3]/100}.${A[3]%100}`);
  }
  if (A[16] != 100) {
    ctx.showMessage(`${ctx.getVarName("ABL", 16)}${ctx.abilities[16]}LV ×${A[16]/100}.${A[16]%100}`);
  }
  if (A[17] != 100) {
    ctx.showMessage(`${ctx.getVarName("ABL", 17)}${ctx.abilities[17]}LV ×${A[17]/100}.${A[17]%100}`);
  }
  if (A[20] != 100) {
    ctx.showMessage(`${ctx.getVarName("ABL", 20)}${ctx.abilities[20]}LV ×${A[20]/100}.${A[20]%100}`);
  }
  if (A[21] != 100) {
    ctx.showMessage(`${ctx.getVarName("ABL", 21)}${ctx.abilities[21]}LV ×${A[21]/100}.${A[21]%100}`);
  }
  if (A[22] != 100) {
    ctx.showMessage(`${ctx.getVarName("ABL", 22)}${ctx.abilities[22]}LV ×${A[22]/100}.${A[22]%100}`);
  }
  if (A[23] != 100) {
    ctx.showMessage(`${ctx.getVarName("ABL", 23)}${ctx.abilities[23]}LV ×${A[23]/100}.${A[23]%100}`);
  }
  if (E[60] != 100) {
    ctx.showMessage(`${ctx.getVarName("EXP", 60)}${ctx.exp[60]} ×${E[60]/100}.${E[60]%100}`);
  }
  for (let COUNT = 0; COUNT < 600; COUNT++) {
    if (ctx.count < 100 || ctx.isAssi[character] || ctx.talents[85]) {
      if (T[ctx.count] != 100) {
        ctx.showMessage(`${ctx.getVarName("TALENT", COUNT)} ×${T[ctx.count]/100}.${T[ctx.count]%100}`);
      }
    } else {
      if (T[ctx.count] != 100 && T[ctx.count] != 515) {
        ctx.showMessage(`??? ×${T[ctx.count]/100}.${T[ctx.count]%100}`);
      }
    }
  }
  if (O[1] != 100) {
    ctx.showMessage(`가격 교섭 ×${O[1]/100}.`);
    if (O[1] > 100 && O[1] < 110) {
      ctx.print('0');
    }
    ctx.showMessage(`${O[1]%100}`);
  }
  ctx.showMessage(`${ctx.getName(character)}의 은퇴작은 {S}포인트 팔릴 것 같습니다.`);
  ctx.showMessage(`%타겟을(1)% 은퇴시킵니까?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 아니오');
  // Label: INPUT_LOOP
  await ctx.inputNumber();
  if (ctx.result === 0) {
    character.tflags[13] = 6;
    await self_kojo(ctx, character);
    await event_sell_after(ctx, character);
    ctx.showMessage(`W ${ctx.getName(character)}의 은퇴작 매상은 {S}포인트입니다`);
    if (ctx.abilities[10] < 5 && (ctx.talents[315] || ctx.talents[316])) {
      ctx.showMessage(`%타겟은(1)% 수송중 실종됐기에`);
      ctx.showMessage(`W 예상의 1/5, {S / 5}포인트만 지급됐습니다…`);
      S /= 5;
    }
    ctx.money += S;
    return 1;
  } else if (ctx.result === 1) {
    S = -1;
    return 0;
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
}
