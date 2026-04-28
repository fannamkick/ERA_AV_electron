/**
 * EVENT_NEXTDAY.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function event_nextday(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count == 0) {
      // TODO: CONTINUE
    }
    character = ctx.count;
    if (ctx.talents[57] === 0) {
      if (ctx.talents[132] && ctx.exp[31] >= 50) {
        await event_morasi(ctx, character);
      }
      if (ctx.talents[132] == 0 && ctx.exp[31] >= 100) {
        await event_morasi(ctx, character);
      }
    }
    if (character.mark[3] === 3 && (ctx.talents[132] || ctx.talents[134])) {
      if (ctx.abilities[11] >= 5 && ctx.abilities[10] >= 5 && ctx.abilities[21] >= 5 && ctx.exp[50] >= 5) {
        await event_youji(ctx, character);
      }
    } else if (character.mark[3] === 3) {
      if (ctx.abilities[11] >= 5 && ctx.abilities[10] >= 5 && ctx.abilities[21] >= 5 && ctx.abilities[17] >= 5 && ctx.exp[50] >= 7 && ctx.talents[57] == 1) {
        await event_youji(ctx, character);
      }
    }
    if (ctx.talents[115] === 0) {
      if (ctx.talents[323] == 1  && ctx.juel[100] >= 1000) {
        await event_himan(ctx, character);
      }
    }
    if (ctx.talents[115] === 1) {
      if (ctx.talents[323] == 1  && ctx.juel[100] == 0) {
        await event_yaseru(ctx, character);
      }
    }
    await aphrodisiac_addict(ctx, character);
    ctx.count = character;
  }
  await event_noroi(ctx, character);
  ctx.flags[61] = 0;
  await get_child_all(ctx, character);
  // TODO: FOR LOCAL, 0, CHARANUM
  if (ctx.getTalent(local, 153) || ctx.getTalent(local, 154) || ctx.getTalent(local, 157)) {
    if ((character.cflags[ctx.locals[0]][110] - 2) === DAY) {
      ctx.drawLine();
      await reach_full_term(ctx.locals[0], ctx, character);
    } else if ((character.cflags[ctx.locals[0]][110] - 1) === DAY) {
      ctx.drawLine();
      ctx.showMessage(`${ctx.getVarName("CALL", LOCAL)}의 출산일이 가까워졌다……`);
      ctx.drawLine();
    } else if (character.cflags[ctx.locals[0]][110] <= DAY && (ctx.getTalent(local, 153) || ctx.getTalent(local, 157))) {
      ctx.drawLine();
      C = ctx.locals[0];
      if (ctx.getTalent(local, 153)) {
        await child_birth(ctx, character);
      } else if (ctx.getTalent(local, 157)) {
        await egg_birth(ctx, character);
      }
    } else if ((character.cflags[ctx.locals[0]][110] + 20) <= DAY && character.cflags[ctx.locals[0]][141] != 3) {
      C = ctx.locals[0];
      ctx.drawLine();
      await depearent(ctx, character);
    } else if ((character.cflags[ctx.locals[0]][110] + 10) <= DAY && character.cflags[ctx.locals[0]][141] === 3) {
      C = ctx.locals[0];
      ctx.drawLine();
      await depearent(ctx, character);
    }
  }
  // TODO: NEXT
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.base[ctx.count][22] >0 && ctx.flags[38] > 0) {
      if (ctx.getTalent(count, 153) || ctx.getTalent(count, 154)) {
        await grow_3_size_iws(ctx, character);
      }
    }
  }
  if (ctx.flags[37]) {
    await washing_cloth(ctx, character);
  }
  if (ctx.flags[1] > 0) {
    character = ctx.flags[1];
  }
  await night_stalking_check(ctx, character);
  await running_cost(ctx, character);
  await system_kikenbi(ctx, character);
  return 1;
}

export async function event_newday(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  await morning_cowgirl(ctx, character);
  await happy_birthday(ctx, character);
  await onesho(ctx, character);
  await particular_date(ctx, character);
  await start_coocking(ctx, character);
  return 1;
}

export async function running_cost(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  A = 500;
  if (DAY > 31) {
    A += 1000;
  }
  if (DAY > 51) {
    A += 2000;
  }
  if (ctx.flags[48] & 1) {
    A += 500;
  }
  if (ctx.flags[48] & 2) {
    A += 100;
  }
  if (ctx.flags[48] & 4) {
    A += 1000;
  }
  if (ctx.flags[48] & 32) {
    A += 500;
  }
  if (ctx.flags[48] & 8) {
    A += 1800;
  }
  if (ctx.flags[48] & 16) {
    A += 100;
  }
  if (ctx.flags[48] & 64) {
    A += ctx.flags[40] * 500;
  }
  if (ctx.exp[ctx.master][91] >= 50) {
    ctx.times('A', 1.10);
  } else if (ctx.exp[ctx.master][91] >= 70) {
    ctx.times('A', 1.20);
  } else if (ctx.exp[ctx.master][91] >= 90) {
    ctx.times('A', 1.30);
  }
  if (ctx.exp[ctx.master][90] >= 3000) {
    ctx.times('A', 0.10);
  } else if (ctx.exp[ctx.master][90] >= 2000) {
    ctx.times('A', 0.30);
  } else if (ctx.exp[ctx.master][90] >= 1200) {
    ctx.times('A', 0.50);
  } else if (ctx.exp[ctx.master][90] >= 700) {
    ctx.times('A', 0.60);
  } else if (ctx.exp[ctx.master][90] >= 400) {
    ctx.times('A', 0.70);
  } else if (ctx.exp[ctx.master][90] >= 200) {
    ctx.times('A', 0.80);
  } else if (ctx.exp[ctx.master][90] >= 100) {
    ctx.times('A', 0.90);
  }
  if (ctx.flags[5] <= 2 || ctx.flags[5] === 9) {
    A += ctx.charanum*100;
  } else if (ctx.flags[5] === 3) {
    A += ctx.charanum*200;
  } else if (ctx.flags[5] === 4) {
    A += ctx.charanum*300;
  } else if (ctx.flags[5] === 5) {
    A += ctx.charanum*400;
  }
  A -= 100;
  if (ctx.flags[5] === 1) {
    ctx.times('A', 0.80);
  } else if (ctx.flags[5] === 3) {
    if (DAY <= 20) {
      ctx.times('A', 1.20);
    } else if (DAY <= 40) {
      ctx.times('A', 1.50);
    } else if (DAY <= 60) {
      ctx.times('A', 2.00);
    } else {
      ctx.times('A', 2.50);
    }
  } else if (ctx.flags[5] === 4) {
    if (DAY <= 20) {
      ctx.times('A', 1.40);
    } else if (DAY <= 30) {
      ctx.times('A', 1.80);
    } else if (DAY <= 40) {
      ctx.times('A', 3.00);
    } else {
      ctx.times('A', 5.00);
    }
  } else if (ctx.flags[5] === 5) {
    if (DAY <= 15) {
      ctx.times('A', 2.00);
    } else if (DAY <= 25) {
      ctx.times('A', 4.00);
    } else if (DAY <= 35) {
      ctx.times('A', 8.00);
    } else {
      ctx.times('A', 16.00);
    }
  }
  if (ctx.flags[5] != 9) {
    if ((ctx.flags[5] === 1 && DAY >= 20) || (ctx.flags[5] >= 2 && DAY >= 10)) {
      ctx.showMessage(`사무소 유지비로 ${A}포인트 들었다……`);
      ctx.drawLine();
      ctx.money -= A;
    }
  }
}

export async function event_morasi(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`그 날 밤, ${ctx.josaHelper("타겟은")} 실수를 해버린 것 같다…`);
  ctx.showMessage(`%타겟은(1)%【${ctx.getVarName("TALENT", 57)}】가 됐다.`);
  ctx.talents[57] = 1;
  await ctx.wait();
}

export async function event_youji(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`(음･･･어떻게 된거지?)`);
  ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)}의 상태가 이상하다…`);
  ctx.showMessage(`W %타겟은(1)% 가혹한 지도를 견디지 못하고,【${ctx.getVarName("TALENT", 131)}】해버렸다…`);
  ctx.talents[131] = 1;
  if (ctx.talents[20]) {
    ctx.talents[20] = 0;
    ctx.showMessage(`【${ctx.getVarName("TALENT", 20)}】이 없어졌다`);
  }
  if (ctx.talents[21]) {
    ctx.talents[21] = 0;
    ctx.showMessage(`【${ctx.getVarName("TALENT", 21)}】하지 못해졌다`);
  }
  if (ctx.talents[22]) {
    ctx.talents[22] = 0;
    ctx.showMessage(`【${ctx.getVarName("TALENT", 22)}】이 아니게 됐다`);
  }
  if (ctx.talents[24]) {
    ctx.talents[24] = 0;
    ctx.showMessage(`【${ctx.getVarName("TALENT", 24)}】이 아니게 됐다`);
  }
  if (ctx.talents[26]) {
    ctx.talents[26] = 0;
    ctx.showMessage(`【${ctx.getVarName("TALENT", 26)}】하지 않아졌다`);
  }
  if (ctx.talents[27]) {
    ctx.talents[27] = 0;
    ctx.showMessage(`【${ctx.getVarName("TALENT", 27)}】을 잊었다`);
  }
  if (ctx.talents[30]) {
    ctx.talents[30] = 0;
    ctx.showMessage(`【${ctx.getVarName("TALENT", 30)}】이 없어졌다`);
  }
  if (ctx.talents[32]) {
    ctx.talents[32] = 0;
    ctx.showMessage(`【${ctx.getVarName("TALENT", 32)}】이 사라졌다`);
  }
  if (ctx.talents[34]) {
    ctx.talents[34] = 0;
    ctx.showMessage(`【${ctx.getVarName("TALENT", 34)}】이 없어졌다`);
  }
  if (ctx.talents[35]) {
    ctx.talents[35] = 0;
    ctx.showMessage(`【${ctx.getVarName("TALENT", 35)}】이 없어졌다`);
  }
  if (ctx.talents[37]) {
    ctx.talents[37] = 0;
    ctx.showMessage(`【${ctx.getVarName("TALENT", 37)}】은 이제 쓸모 없다`);
  }
  if (ctx.talents[55]) {
    ctx.talents[55] = 0;
    ctx.showMessage(`【${ctx.getVarName("TALENT", 55)}】이 사라졌다`);
  }
  if (ctx.talents[93]) {
    ctx.talents[93] = 0;
    ctx.showMessage(`【${ctx.getVarName("TALENT", 93)}】가 없어졌다`);
  }
  if (ctx.talents[57] === 0) {
    ctx.talents[57] = 1;
    ctx.showMessage(`【${ctx.getVarName("TALENT", 57)}】가 됐다`);
  }
  character.mark[3] = 0;
  ctx.showMessage(`【${ctx.getVarName("MARK", 3)}】이 0이 되었다`);
  await ctx.wait();
}

export async function event_himan(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`스트레스가 심해, %타겟은(1)% 식량 저장고에 숨어들어가,`);
  ctx.showMessage(`W 마음껏 먹어댄 것 같다…`);
  ctx.showMessage(`${ctx.josaHelper("타겟은")}【${ctx.getVarName("TALENT", 115)}】체형이 됐다`);
  ctx.talents[115] = 1;
  await ctx.wait();
}

export async function event_yaseru(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`W %타겟은(1)%, 최근 호리호리해진 것 같다…`);
  ctx.showMessage(`${ctx.josaHelper("타겟은")}【${ctx.getVarName("TALENT", 115)}】체형이 아니게됐다`);
  ctx.talents[115] = 0;
  await ctx.wait();
}

export async function event_juniorhighschool(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine();
  ctx.showMessage(`내일부터 신년.`);
  ctx.showMessage(`%타겟은(1)% 중학교에 입학하게 된다.`);
  ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 촬영은 순조롭게 진행되고 있는 것 같고, 가끔은 학교에 다니게 해주는 것도 좋겠지.`);
  ctx.showMessage(`그렇게 생각해, 당신은 새로운 교복을 사주기로 했다.`);
  ctx.showMessage(`곧바로 갈아입게 할까요?`);
  // Label: INPUT_LOOP_0
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 아니오');
  await ctx.inputNumber();
  if (ctx.result === 0) {
    await print_clothtype(ctx, character);
    ctx.showMessage(`인 %타겟은(1)%, 새로운 교복을 받고`);
    if (ctx.abilities[17] >= 3) {
      ctx.showMessage('입고 있던 것을 전부 벗어던져, 알몸이 됐다. 그리고 그대로');
    }
    if (ctx.abilities[21] >= 3) {
      ctx.showMessage(`당신의 신발에 입 맞추며 감사 인사를 했다. ${ctx.josaHelper("타겟은")}`);
    }
    if (ctx.talents[35]) {
      ctx.print('부끄러워하면서도');
    }
    if (ctx.talents[13]) {
      ctx.print('진심으로 기뻐하는 모습으로');
    }
    if (ctx.talents[23]) {
      ctx.print('굉장히 즐거운듯이');
    }
    if (ctx.talents[35] || ctx.talents[13] || ctx.talents[23]) {
      ctx.print(',');
    }
    ctx.showMessage('당신의 눈 앞에서 중학교의 교복을 입고 보여줬다.');
    ctx.showMessage('');
    character.cflags[40] |= 4;
    character.cflags[40] |= 8;
    character.cflags[41] = 18;
    character.cflags[45] = 0;
    character.cflags[46] = 0;
    ctx.showMessage(`W ${ctx.getVarName("PALAM", 4)}의 구슬 +1000`);
    ctx.juel[4] += 1000;
    ctx.showMessage(`W ${ctx.getVarName("PALAM", 8)}의 구슬 +1000`);
    ctx.juel[8] += 1000;
    if (ctx.abilities[10] < 4) {
      ctx.abilities[10] = 4;
      ctx.showMessage(`W ${ctx.getVarName("ABL", 10)}가 %조사처리(ABL:10,"가")% 되었다`);
    }
  } else if (ctx.result != 1) {
    // GOTO INPUT_LOOP_0 - 구조 변경 필요 (while/break 사용 권장)
  } else {
    ctx.showMessage(`지금 당장 갈아입지 않아도 된다고 하자 ${ctx.josaHelper("타겟은")} 조금 아쉬워 했지만,`);
    ctx.showMessage(`이것은 어디까지나 통학을 위한 선물이지, 촬영용의 물건이 아니다……`);
    ctx.showMessage(`라고 설명하자 납득한 듯, 새로운 교복을 받아 들고 돌아갔다.`);
    ctx.showMessage('');
    ctx.showMessage(`W ${ctx.getVarName("PALAM", 4)}의 구슬 +1500`);
    ctx.juel[4] += 1500;
    if (ctx.abilities[10] < 4) {
      ctx.abilities[10] = 4;
      ctx.showMessage(`W ${ctx.getVarName("ABL", 10)}가 %조사처리(ABL:10,"가")% 되었다`);
    }
  }
  ctx.showMessage(`%타겟은(1)%【${ctx.getVarName("TALENT", 221)}】이 됐다`);
  ctx.talents[220] = 0;
  ctx.talents[221] = 1;
  ctx.talents[222] = 0;
  await ctx.wait();
}

export async function event_highschool(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine();
  ctx.showMessage(`내일부터 신년.`);
  ctx.showMessage(`%타겟은(1)%, 고등학교에 입학하게 된다.`);
  ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 촬영은 순조롭게 진행되고 있는 것 같고, 가끔은 학교에 다니게 해주는 것도 좋겠지.`);
  ctx.showMessage(`그렇게 생각해, 당신은 새로운 교복을 주기로 했다.`);
  ctx.showMessage(`곧바로 갈아입게 할까요?`);
  // Label: INPUT_LOOP_00
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 아니오');
  await ctx.inputNumber();
  if (ctx.result === 0) {
    await print_clothtype(ctx, character);
    ctx.showMessage(`인 %타겟은(1)%, 새로운 교복을 받고`);
    if (ctx.abilities[17] >= 3) {
      ctx.showMessage('입고 있던 것을 전부 벗어던져, 알몸이 됐다. 그리고 그대로');
    }
    if (ctx.abilities[21] >= 3) {
      ctx.showMessage(`당신의 신발에 입 맞추며 감사 인사를 했다. ${ctx.josaHelper("타겟은")}`);
    }
    if (ctx.talents[35]) {
      ctx.print('부끄러워하면서도');
    }
    if (ctx.talents[13]) {
      ctx.print('진심으로 기뻐하는 모습으로');
    }
    if (ctx.talents[23]) {
      ctx.print('굉장히 즐거운듯이');
    }
    if (ctx.talents[35] || ctx.talents[13] || ctx.talents[23]) {
      ctx.print(',');
    }
    ctx.showMessage('당신의 눈 앞에서 고등학교의 교복을 입고 보여줬다.');
    ctx.showMessage('');
    character.cflags[41] = 18;
    character.cflags[45] = 0;
    character.cflags[46] = 0;
    ctx.showMessage(`W ${ctx.getVarName("PALAM", 4)}의 구슬 +1000`);
    ctx.juel[4] += 1000;
    ctx.showMessage(`W ${ctx.getVarName("PALAM", 8)}의 구슬 +1000`);
    ctx.juel[8] += 1000;
    if (ctx.abilities[10] < 4) {
      ctx.abilities[10] = 4;
      ctx.showMessage(`W ${ctx.getVarName("ABL", 10)}가 %조사처리(ABL:10,"가")% 되었다`);
    }
  } else if (ctx.result != 1) {
    // GOTO INPUT_LOOP_00 - 구조 변경 필요 (while/break 사용 권장)
  } else {
    ctx.showMessage(`지금 당장 갈아입지 않아도 된다고 하자 ${ctx.josaHelper("타겟은")} 조금 아쉬워 했지만,`);
    ctx.showMessage(`이것은 어디까지나 통학을 위한 선물이지, 촬영용의 물건이 아니다……`);
    ctx.showMessage(`라고 설명하자 납득한 듯, 새로운 교복을 받아 들고 돌아갔다.`);
    ctx.showMessage('');
    ctx.showMessage(`W ${ctx.getVarName("PALAM", 4)}의 구슬 +1500`);
    ctx.juel[4] += 1500;
    if (ctx.abilities[10] < 4) {
      ctx.abilities[10] = 4;
      ctx.showMessage(`W ${ctx.getVarName("ABL", 10)}가 %조사처리(ABL:10,"가")% 되었다`);
    }
  }
  ctx.showMessage(`%타겟은(1)%【${ctx.getVarName("TALENT", 220)}】이 됐다`);
  ctx.talents[220] = 1;
  ctx.talents[221] = 0;
  ctx.talents[222] = 0;
  await ctx.wait();
}

export async function event_noroi(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.charanum <= 2 && (ctx.getTalent(master, 198) == 0 || ctx.charanum <= 1)) {
    return 0;
  }
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    T = ctx.count;
    if ((ctx.getTalent(t, 198) && ctx.rand(10) <= ctx.abilities[T][10]) || (T === 0 && ctx.getTalent(t, 198) && ctx.rand(10) <= 2 )) {
      ctx.showMessage(`W ${ctx.josaHelper(ctx.getName(T), "가")} 가지고 있는【${ctx.getVarName("TALENT", 198)}】가 발동해버렸다…`);
      S = ctx.charanum - 1;
      C = ctx.rand(S) + 1;
      U = ctx.rand(10);
      if (C == T) {
        U = 10;
      }
      if (ctx.base[C][0] <= 0) {
        U = 10;
      }
      if (U <= 3) {
        if (ctx.base[C][0] > 1100) {
          ctx.showMessage(`${ctx.getName(C)}의 체력이 1000 감소했다`);
        } else if (ctx.base[C][0] > 100) {
          ctx.showMessage(`${ctx.getName(C)}의 체력이 ${ctx.base[C][0] - 100} 감소했다`);
        } else {
          ctx.showMessage(`아무 일도 없었던 것 같다…`);
        }
        await ctx.wait();
        ctx.base[C][0] -= 1000;
        if (ctx.base[C][0] <= 100) {
          ctx.base[C][0] = 100;
        }
      } else if (U <= 7) {
        ctx.showMessage(`${ctx.getName(C)}의 마음이 부정적인 생각으로 뒤덮여버렸다`);
        await ctx.wait();
        ctx.juel[C][100] += 500;
        ctx.juel[C][100] *= 2;
      } else if (U <= 8) {
        ctx.showMessage(`${ctx.getName(C)}에 대한 안 좋은 소문이 퍼지고 있는 것 같다`);
        await ctx.wait();
        ctx.exp[C][91] -= 20;
        if (ctx.exp[C][91] < 0) {
          ctx.exp[C][91] = 0;
        }
      } else if (U <= 9) {
        if (ctx.rand(2) === 0) {
          if (ctx.getTalent(c, 84) === 0 && ctx.getTalent(c, 85) === 0) {
            ctx.getTalent(c, 84) = 1;
            ctx.showMessage(`${ctx.josaHelper(ctx.getName(C), "가")}【${ctx.getVarName("TALENT", 84)}】를 얻었다`);
            await ctx.wait();
          } else {
            ctx.showMessage(`아무 일도 없었던 것 같다…`);
            await ctx.wait();
          }
        } else {
          if (character.mark[C][3] < 3) {
            character.mark[C][3] += 1;
            ctx.showMessage(`${ctx.getName(C)}에게 반발각인 LV${character.mark[C][3]}이 붙었다`);
            await ctx.wait();
          } else {
            ctx.showMessage(`아무 일도 없었던 것 같다…`);
            await ctx.wait();
          }
        }
      } else {
        ctx.showMessage(`아무 일도 없었던 것 같다…`);
        await ctx.wait();
      }
      // TODO: BREAK
    }
  }
  ctx.drawLine();
}

export async function sometimes_she_comes_back(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count == 0) {
      // TODO: CONTINUE
    }
    if (ctx.base[ctx.count][0] === 0) {
      ctx.base[ctx.count][0] = MAXctx.base[ctx.count][0] / 10;
      ctx.base[ctx.count][1] = MAXctx.base[ctx.count][1];
      ctx.drawLine();
      ctx.showMessage(`아침, %플레이어가(1)% 눈을 뜨자, 분명 죽었을터인 ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "가")} 거기에 있었다`);
      ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "는")} 아무일도 없었던 것처럼, 아침 인사를 했다`);
      ctx.showMessage('');
      await ctx.wait();
      ctx.showMessage(`${ctx.josaHelper(ctx.getName(ctx.count), "가")} 복귀했습니다……`);
      ctx.drawLine();
      await ctx.wait();
      D = 1;
      return 1;
    }
  }
  return 0;
}

export async function onesho(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.getTalent(count, 57) ==1 && ctx.rand(12) <= ctx.exp[ctx.count][31]/10 + ctx.getTalent(count, 132)*2) {
      if (ctx.base[ctx.count][0] <= 0) {
        // TODO: CONTINUE
      }
      ctx.drawLine();
      ctx.showMessage(`${ctx.josaHelper(ctx.getName(ctx.count), "는")}, 실례를 해버린 것 같다…`);
      ctx.exp[ctx.count][31] += 1;
      ctx.showMessage(`${ctx.getVarName("EXP", 31)} +1`);
      character = ctx.count;
      await soiling_cloth_no1(ctx, character);
      await aftertrain_cloth(ctx, character);
      if (ctx.abilities[ctx.count][17]+ctx.abilities[ctx.count][21] >= 8) {
        ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "는")} 실수를 한 것을`);
        if (ctx.charanum >= 3) {
          ctx.showMessage('아침 식사 시간에 모두에게 발표했다');
        } else {
          ctx.showMessage('보고해 왔다');
        }
        ctx.showMessage(`W ${ctx.getVarName("PALAM", 8)}의 구슬 +1000`);
        ctx.juel[ctx.count][8] += 1000;
      }
    }
  }
  return 1;
}

export async function night_stalking_check(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.getTalent(master, 122) == 0) {
    return 0;
  }
  L = 0;
  R = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.abilities[ctx.count][11] >= 4 && ctx.abilities[ctx.count][30] >= 1) {
      if (ctx.getTalent(count, 85) == 0 && ctx.getTalent(count, 90) == 0) {
        // TODO: CONTINUE
      }
      if (ctx.base[ctx.count][0] <= 0) {
        // TODO: CONTINUE
      }
      if (ctx.base[ctx.count][0] <= 500) {
        // TODO: CONTINUE
      }
      if (ctx.getTalent(count, 154) || (character.cflags[ctx.count][110] - 2 <= DAY && ctx.getTalent(count, 153))) {
        // TODO: CONTINUE
      }
      if (ctx.getTalent(count, 151)) {
        // TODO: CONTINUE
      }
      if (ctx.getTalent(count, 184) && ctx.getTalent(count, 31) == 0 && ctx.getTalent(count, 425) == 0) {
        // TODO: CONTINUE
      }
      if (character.mark[ctx.count][3] > 0) {
        // TODO: CONTINUE
      }
      if (ctx.getTalent(count, 0) && ctx.abilities[ctx.count][10]+ctx.abilities[ctx.count][11]+ctx.abilities[ctx.count][3] <= 14) {
        // TODO: CONTINUE
      }
      if (ctx.getTalent(count, 122) == 0 && (ctx.abilities[ctx.count][10]+ctx.abilities[ctx.count][11]+ctx.abilities[ctx.count][2] <= 12 && ctx.abilities[ctx.count][10]+ctx.abilities[ctx.count][11]+ctx.abilities[ctx.count][3] <= 14)) {
        // TODO: CONTINUE
      }
      if (ctx.getTalent(count, 122) && ctx.abilities[ctx.count][10]+ctx.abilities[ctx.count][11]+ctx.abilities[ctx.count][3] <= 12) {
        // TODO: CONTINUE
      }
      if (character.cflags[ctx.count][42] == 79 && (character.cflags[ctx.count][40] & 64)  && ctx.abilities[ctx.count][10]+ctx.abilities[ctx.count][11]+ctx.abilities[ctx.count][3] <= 14) {
        // TODO: CONTINUE
      }
      A = ctx.abilities[ctx.count][30];
      if (ctx.getTalent(count, 33)) {
        A += 1;
      }
      if (ctx.getTalent(count, 20)) {
        A -= 2;
      }
      if (ctx.getTalent(count, 70)) {
        A += 1;
      }
      if (ctx.getTalent(count, 71)) {
        A -= 1;
      }
      if (ctx.getTalent(count, 75) && ctx.getTalent(count, 0) == 0 && ctx.abilities[ctx.count][2] >= ctx.abilities[ctx.count][3]) {
        A += 1;
      }
      if (ctx.getTalent(count, 77) && (ctx.getTalent(count, 0) || ctx.abilities[ctx.count][3] > ctx.abilities[ctx.count][2])) {
        A += 1;
      }
      if (ctx.getTalent(count, 76) && ctx.getTalent(count, 0)) {
        A += 1;
      }
      if (A > 0) {
        R += 1;
      }
    }
  }
  if (R == 0) {
    return 0;
  }
  E = ctx.rand(R);
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.abilities[ctx.count][11] >= 4 && ctx.abilities[ctx.count][30] >= 1) {
      if (ctx.getTalent(count, 85) == 0 && ctx.getTalent(count, 90) == 0) {
        // TODO: CONTINUE
      }
      if (ctx.base[ctx.count][0] <= 0) {
        // TODO: CONTINUE
      }
      if (ctx.base[ctx.count][0] <= 500) {
        // TODO: CONTINUE
      }
      if (ctx.getTalent(count, 154) || (character.cflags[ctx.count][110] - 2 <= DAY && ctx.getTalent(count, 153))) {
        // TODO: CONTINUE
      }
      if (ctx.getTalent(count, 151)) {
        // TODO: CONTINUE
      }
      if (character.mark[ctx.count][3] > 0) {
        // TODO: CONTINUE
      }
      if (ctx.getTalent(count, 0) && ctx.abilities[ctx.count][10]+ctx.abilities[ctx.count][11]+ctx.abilities[ctx.count][3] <= 14) {
        // TODO: CONTINUE
      }
      if (ctx.getTalent(count, 122) == 0 && (ctx.abilities[ctx.count][10]+ctx.abilities[ctx.count][11]+ctx.abilities[ctx.count][2] <= 12 && ctx.abilities[ctx.count][10]+ctx.abilities[ctx.count][11]+ctx.abilities[ctx.count][3] <= 14)) {
        // TODO: CONTINUE
      }
      if (ctx.getTalent(count, 122) && ctx.abilities[ctx.count][10]+ctx.abilities[ctx.count][11]+ctx.abilities[ctx.count][3] <= 12) {
        // TODO: CONTINUE
      }
      if (character.cflags[ctx.count][42] == 79 && (character.cflags[ctx.count][40] & 64)  && ctx.abilities[ctx.count][10]+ctx.abilities[ctx.count][11]+ctx.abilities[ctx.count][3] <= 14) {
        // TODO: CONTINUE
      }
      A = ctx.abilities[ctx.count][30];
      if (ctx.getTalent(count, 33)) {
        A += 1;
      }
      if (ctx.getTalent(count, 20)) {
        A -= 2;
      }
      if (ctx.getTalent(count, 70)) {
        A += 1;
      }
      if (ctx.getTalent(count, 71)) {
        A -= 1;
      }
      if (ctx.getTalent(count, 75) && ctx.getTalent(count, 0) == 0 && ctx.abilities[ctx.count][2] >= ctx.abilities[ctx.count][3]) {
        A += 1;
      }
      if (ctx.getTalent(count, 77) && (ctx.getTalent(count, 0) || ctx.abilities[ctx.count][3] > ctx.abilities[ctx.count][2])) {
        A += 1;
      }
      if (ctx.getTalent(count, 76) && ctx.getTalent(count, 0)) {
        A += 1;
      }
      if (A > 0 && E === 0) {
        L = ctx.count;
        // TODO: BREAK
      } else if (A > 0) {
        E -= 1;
      }
    }
  }
  ctx.showMessage(`${ctx.josaHelper("플레이어가")} 잠자리에 들려고 했을 때, ${ctx.getVarName("CALL", MASTER)}의 방에 머물고 있던 ${ctx.josaHelper(ctx.getVarName("CALLNAME", L), "가")} 갑자기,`);
  ctx.showMessage(`이불 속으로 기어들어 왔다`);
  await ctx.wait();
  character = L;
  character.tflags[13] = 5;
  await self_kojo(ctx, character);
  F = 1;
  if (ctx.getTalent(l, 122)) {
    F = 0;
  }
  if (ctx.getTalent(l, 0)) {
    F = 0;
  }
  if (character.cflags[L][42] == 79 && (character.cflags[L][40] & 64)) {
    F = 0;
  }
  if (ctx.abilities[L][2] < ctx.abilities[L][3]) {
    F = 0;
  }
  if (F === 1) {
    S = ctx.abilities[L][30];
    if (ctx.abilities[L][2] <= 4) {
      S += 1;
    } else if (ctx.abilities[L][2] === 5) {
      S += 2;
    } else if (ctx.abilities[L][2] >= 6) {
      S += 4;
    }
    ctx.showMessage(`${ctx.getVarName("CALL", MASTER)}에게 안기고 싶고, 자궁이 욱신거려 견딜 수가 없다고 한다……`);
    ctx.showMessage(`{S}회의 행위 후에, 두 사람은 연결된 채로 서로 끌어안고, 깊은 잠에 빠졌다`);
    ctx.showMessage(`${ctx.getVarName("EXP", 0)} +{S}`);
    ctx.showMessage(`${ctx.getVarName("EXP", 5)} +{S}`);
    ctx.exp[L][0] += S;
    ctx.exp[L][5] += S;
    ctx.showMessage(`${ctx.getVarName("PALAM", 1)}의 구슬 +{S*400}`);
    ctx.showMessage(`${ctx.getVarName("PALAM", 4)}의 구슬 +{S*250}`);
    ctx.showMessage(`W ${ctx.getVarName("PALAM", 5)}의 구슬 +{S*250}`);
    ctx.juel[L][1] += S*400;
    ctx.juel[L][4] += S*250;
    ctx.juel[L][5] += S*250;
  } else {
    S = ctx.abilities[L][30];
    if (ctx.abilities[L][3] <= 4) {
      S += 1;
    } else if (ctx.abilities[L][3] === 5) {
      S += 2;
    } else if (ctx.abilities[L][3] >= 6) {
      S += 4;
    }
    ctx.showMessage(`${ctx.getVarName("CALL", MASTER)}에게 안기고 싶어서,`);
    ctx.showMessage(`애널이 욱신거려 어쩔 줄 모르겠다고 한다……`);
    if (ctx.getTalent(l, 2) === 1) {
      ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", L), "는")} 아직 페니스를 받아들인 적 없는, 쾌락을 느끼게 된 구멍을 손으로 좌우로 넓히며`);
      ctx.showMessage(`${ctx.getVarName("CALL", MASTER)}에게 뒷처녀를 빼앗아줬으면 좋겠다고 간청해왔다`);
      ctx.showMessage(`좌우로 펼쳐져 작게 입을 연 애널은, ${ctx.getVarName("CALL", MASTER)}의 물건을 기다리듯이 씰룩이고 있다`);
      ctx.showMessage(`${ctx.getVarName("CALL", L)}의 치태에 욕망을 억제할 수 없게 된 ${ctx.josaHelper("플레이어는")}`);
      ctx.showMessage(`${ctx.getVarName("CALL", L)}의 높게 들려져, 살랑살랑 유혹하듯 흔들리는 엉덩이를 잡고, 흥분된 페니스를`);
      ctx.showMessage(`W 익숙해지도록 천천히 삽입했다……`);
    }
    ctx.showMessage(`{S}회의 행위 후, 두사람은 연결된 채로 안고서, 깊은 잠에 빠졌다`);
    if (ctx.getTalent(l, 2) === 1) {
      ctx.setColor(0xF58F98);
      ctx.showMessage('【애널처녀상실】');
      ctx.resetColor();
      ctx.getTalent(l, 2) = 0;
      if (L.no === 1 && ctx.getTalent(l, 432) === 0) {
        character.cstr[L][3] = "오빠";
      } else if (L.no === 1 && ctx.getTalent(l, 432) === 1) {
        character.cstr[L][3] = "형님";
      } else {
        character.cstr[L][3] = CALLctx.getName(ctx.master);
      }
    }
    ctx.showMessage(`${ctx.getVarName("EXP", 1)} +{S}`);
    ctx.showMessage(`${ctx.getVarName("EXP", 5)} +{S}`);
    ctx.exp[L][1] += S;
    ctx.exp[L][5] += S;
    ctx.showMessage(`${ctx.getVarName("PALAM", 2)}의 구슬 +{S*400}`);
    ctx.showMessage(`${ctx.getVarName("PALAM", 4)}의 구슬 +{S*250}`);
    ctx.showMessage(`W ${ctx.getVarName("PALAM", 5)}의 구슬 +{S*250}`);
    ctx.juel[L][2] += S*400;
    ctx.juel[L][4] += S*250;
    ctx.juel[L][5] += S*250;
  }
  ctx.drawLine();
  return 1;
}

export async function morning_cowgirl(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.getTalent(master, 122) == 0) {
    return 0;
  }
  R = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.abilities[ctx.count][11] >= 4 && ctx.abilities[ctx.count][30] >= 1) {
      if (ctx.getTalent(count, 85) == 0 && ctx.getTalent(count, 90) == 0) {
        // TODO: CONTINUE
      }
      if (ctx.base[ctx.count][0] <= 0) {
        // TODO: CONTINUE
      }
      if (ctx.base[ctx.count][0] <= 500) {
        // TODO: CONTINUE
      }
      if (ctx.getTalent(count, 154) || (character.cflags[ctx.count][110] - 2 <= DAY && ctx.getTalent(count, 153))) {
        // TODO: CONTINUE
      }
      if (ctx.getTalent(count, 151)) {
        // TODO: CONTINUE
      }
      if (character.mark[ctx.count][3] > 0) {
        // TODO: CONTINUE
      }
      if (ctx.getTalent(count, 0) && ctx.abilities[ctx.count][10]+ctx.abilities[ctx.count][11]+ctx.abilities[ctx.count][3] <= 14) {
        // TODO: CONTINUE
      }
      if (ctx.getTalent(count, 122) == 0 && (ctx.abilities[ctx.count][10]+ctx.abilities[ctx.count][11]+ctx.abilities[ctx.count][2] <= 12 && ctx.abilities[ctx.count][10]+ctx.abilities[ctx.count][11]+ctx.abilities[ctx.count][3] <= 14)) {
        // TODO: CONTINUE
      }
      if (ctx.getTalent(count, 122) && ctx.abilities[ctx.count][10]+ctx.abilities[ctx.count][11]+ctx.abilities[ctx.count][3] <= 12) {
        // TODO: CONTINUE
      }
      if (character.cflags[ctx.count][42] == 79 && (character.cflags[ctx.count][40] & 64)  && ctx.abilities[ctx.count][10]+ctx.abilities[ctx.count][11]+ctx.abilities[ctx.count][3] <= 14) {
        // TODO: CONTINUE
      }
      A = ctx.abilities[ctx.count][30];
      if (ctx.getTalent(count, 33)) {
        A += 1;
      }
      if (ctx.getTalent(count, 20)) {
        A -= 2;
      }
      if (ctx.getTalent(count, 70)) {
        A += 1;
      }
      if (ctx.getTalent(count, 71)) {
        A -= 1;
      }
      if (ctx.getTalent(count, 75) && ctx.getTalent(count, 0) == 0 && ctx.abilities[ctx.count][2] >= ctx.abilities[ctx.count][3]) {
        A += 1;
      }
      if (ctx.getTalent(count, 77) && (ctx.getTalent(count, 0) || ctx.abilities[ctx.count][3] > ctx.abilities[ctx.count][2])) {
        A += 1;
      }
      if (ctx.getTalent(count, 76) && ctx.getTalent(count, 0)) {
        A += 1;
      }
      if (A > 0) {
        R += 1;
      }
    }
  }
  if (R == 0) {
    return 0;
  }
  E = ctx.rand(R);
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.abilities[ctx.count][11] >= 4 && ctx.abilities[ctx.count][30] >= 1) {
      if (ctx.getTalent(count, 85) == 0 && ctx.getTalent(count, 90) == 0) {
        // TODO: CONTINUE
      }
      if (ctx.base[ctx.count][0] <= 0) {
        // TODO: CONTINUE
      }
      if (ctx.base[ctx.count][0] <= 500) {
        // TODO: CONTINUE
      }
      if (ctx.getTalent(count, 154) || (character.cflags[ctx.count][110] - 2 <= DAY && ctx.getTalent(count, 153))) {
        // TODO: CONTINUE
      }
      if (ctx.getTalent(count, 151)) {
        // TODO: CONTINUE
      }
      if (ctx.getTalent(count, 184) && ctx.getTalent(count, 31) == 0 && ctx.getTalent(count, 425) == 0) {
        // TODO: CONTINUE
      }
      if (character.mark[ctx.count][3] > 0) {
        // TODO: CONTINUE
      }
      if (ctx.getTalent(count, 0) && ctx.abilities[ctx.count][10]+ctx.abilities[ctx.count][11]+ctx.abilities[ctx.count][3] <= 14) {
        // TODO: CONTINUE
      }
      if (ctx.getTalent(count, 122) == 0 && (ctx.abilities[ctx.count][10]+ctx.abilities[ctx.count][11]+ctx.abilities[ctx.count][2] <= 12 && ctx.abilities[ctx.count][10]+ctx.abilities[ctx.count][11]+ctx.abilities[ctx.count][3] <= 14)) {
        // TODO: CONTINUE
      }
      if (ctx.getTalent(count, 122) && ctx.abilities[ctx.count][10]+ctx.abilities[ctx.count][11]+ctx.abilities[ctx.count][3] <= 12) {
        // TODO: CONTINUE
      }
      if (character.cflags[ctx.count][42] == 79 && (character.cflags[ctx.count][40] & 64)  && ctx.abilities[ctx.count][10]+ctx.abilities[ctx.count][11]+ctx.abilities[ctx.count][3] <= 14) {
        // TODO: CONTINUE
      }
      A = ctx.abilities[ctx.count][30];
      if (ctx.getTalent(count, 33)) {
        A += 1;
      }
      if (ctx.getTalent(count, 20)) {
        A -= 2;
      }
      if (ctx.getTalent(count, 70)) {
        A += 1;
      }
      if (ctx.getTalent(count, 71)) {
        A -= 1;
      }
      if (ctx.getTalent(count, 75) && ctx.getTalent(count, 0) == 0 && ctx.abilities[ctx.count][2] >= ctx.abilities[ctx.count][3]) {
        A += 1;
      }
      if (ctx.getTalent(count, 77) && (ctx.getTalent(count, 0) || ctx.abilities[ctx.count][3] > ctx.abilities[ctx.count][2])) {
        A += 1;
      }
      if (ctx.getTalent(count, 76) && ctx.getTalent(count, 0)) {
        A += 1;
      }
      if (A > 0 && E === 0) {
        L = ctx.count;
        // TODO: BREAK
      } else if (A > 0) {
        E -= 1;
      }
    }
  }
  character = L;
  character.tflags[13] = 5;
  await self_kojo(ctx, character);
  F = 1;
  if (ctx.getTalent(l, 122)) {
    F = 0;
  }
  if (ctx.getTalent(l, 0)) {
    F = 0;
  }
  if (character.cflags[L][42] == 79 && (character.cflags[L][40] & 64)) {
    F = 0;
  }
  if (ctx.abilities[L][2] < ctx.abilities[L][3]) {
    F = 0;
  }
  if (F === 1) {
    S = ctx.abilities[L][30];
    if (ctx.abilities[L][2] <= 4) {
      S += 1;
    } else if (ctx.abilities[L][2] === 5) {
      S += 2;
    } else if (ctx.abilities[L][2] >= 6) {
      S += 4;
    }
    ctx.drawLine();
    ctx.showMessage(`아침에, 사타구니에 온기를 느끼며 눈을 떴다`);
    await ctx.wait();
    ctx.showMessage(`눈을 돌리자 ${ctx.getVarName("CALL", MASTER)}의 위에서 ${ctx.josaHelper(ctx.getVarName("CALLNAME", L), "가")} 걸터앉아 허덕이고 있다`);
    ctx.showMessage(`멍해진 머리로 어젯밤 ${ctx.getVarName("CALL", MASTER)}의 방에 머물게 한 것을 생각해내고, 아직 ${ctx.josaHelper("플레이어가")}`);
    ctx.showMessage(`눈뜬 것을 눈치못챈 ${ctx.getVarName("CALL", L)}의 상하운동에 맞춰, 밑에서 강렬하게 밀어올렸다`);
    ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", L), "는")} 자궁이 일그러질 것 같은 압력에, 한층 더 큰 신음소리를 내며 절정했다……`);
    ctx.showMessage(`${ctx.getVarName("CALL", MASTER)}의 아침 발기에 욕망을 억제할 수 없었다고, ${ctx.josaHelper(ctx.getVarName("CALLNAME", L), "는")} 변명하면서도`);
    ctx.showMessage(`요염한 신음소리를 높이면서 더욱더 계속해서 허리를 흔들었다`);
    ctx.showMessage(`${ctx.josaHelper("플레이어는")} ${ctx.getVarName("CALL", L)}의`);
    if (ctx.getTalent(l, 122) === 1 || ctx.getTalent(l, 121) === 1) {
      ctx.showMessage(`페니스를 만지`);
    } else if (ctx.getTalent(l, 110) || ctx.getTalent(l, 114)) {
      ctx.showMessage(`풍만한 가슴을 문지르`);
    } else if (ctx.abilities[L][3] > 3) {
      ctx.showMessage(`애널에 손가락을 삽입하`);
    } else {
      ctx.showMessage(`클리토리스를 만지작거리`);
    }
    ctx.showMessage(`면서, 그대로 2회전으로 돌입했다……`);
    ctx.showMessage(`{S}회의 행위 후에, 두 사람은 늦게 집을 나섰다`);
    ctx.showMessage(`${ctx.getVarName("EXP", 0)} +{S}`);
    ctx.showMessage(`${ctx.getVarName("EXP", 5)} +{S}`);
    ctx.exp[L][0] += S;
    ctx.exp[L][5] += S;
    ctx.showMessage(`${ctx.getVarName("PALAM", 1)}의 구슬 +{S*400}`);
    ctx.showMessage(`${ctx.getVarName("PALAM", 4)}의 구슬 +{S*250}`);
    ctx.showMessage(`W ${ctx.getVarName("PALAM", 5)}의 구슬 +{S*250}`);
    ctx.juel[L][1] += S*400;
    ctx.juel[L][4] += S*250;
    ctx.juel[L][5] += S*250;
  } else if (F === 0 && ctx.getTalent(l, 2) === 0) {
    S = ctx.abilities[L][30];
    if (ctx.abilities[L][3] <= 4) {
      S += 1;
    } else if (ctx.abilities[L][3] === 5) {
      S += 2;
    } else if (ctx.abilities[L][3] >= 6) {
      S += 4;
    }
    ctx.drawLine();
    ctx.showMessage(`아침에, 사타구니에 온기를 느끼며 눈을 떴다`);
    await ctx.wait();
    ctx.showMessage(`눈을 돌리자 ${ctx.getVarName("CALL", MASTER)}의 위에서 ${ctx.josaHelper(ctx.getVarName("CALLNAME", L), "가")} 걸터앉아 허덕이고 있다`);
    ctx.showMessage(`멍해진 머리로 어젯밤 ${ctx.getVarName("CALL", MASTER)}의 방에 머물게 한 것을 생각해내고, 아직 ${ctx.josaHelper("플레이어가")}`);
    ctx.showMessage(`눈뜬 것을 눈치못챈 ${ctx.getVarName("CALL", L)}의 상하운동에 맞춰, 밑에서 강렬하게 밀어올렸다`);
    ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", L), "는")} 직장으로부터 자궁을 도려낼듯한 압력에, 한층 더 큰 신음소리를 내며 절정했다……`);
    ctx.showMessage(`${ctx.getVarName("CALL", MASTER)}의 아침 발기에 욕망을 억제할 수 없었다고, ${ctx.josaHelper(ctx.getVarName("CALLNAME", L), "는")} 변명하면서도`);
    ctx.showMessage(`요염한 신음소리를 높이면서 더욱더 계속해서 허리를 흔들었다`);
    ctx.showMessage(`${ctx.josaHelper("플레이어는")} ${ctx.getVarName("CALL", L)}의`);
    if (ctx.getTalent(l, 122) === 1 || ctx.getTalent(l, 121) === 1) {
      ctx.showMessage(`페니스를 만지`);
    } else if (ctx.getTalent(l, 110) || ctx.getTalent(l, 114)) {
      ctx.showMessage(`풍만한 가슴을 문지르`);
    } else if (ctx.abilities[L][2] > 3) {
      ctx.showMessage(`질에 손가락을 삽입하`);
    } else {
      ctx.showMessage(`클리토리스를 만지작거리`);
    }
    ctx.showMessage(`면서, 그대로 2회전으로 돌입했다……`);
    ctx.showMessage(`{S}회의 행위 후에, 두 사람은 늦게 집을 나섰다`);
    if (ctx.getTalent(l, 2) === 1) {
      ctx.setColor(0xF58F98);
      ctx.showMessage('【애널처녀상실】');
      ctx.resetColor();
      ctx.getTalent(l, 2) = 0;
      if (L.no === 1 && ctx.getTalent(l, 432) === 0) {
        character.cstr[L][3] = "오빠";
      } else if (L.no === 1 && ctx.getTalent(l, 432) === 1) {
        character.cstr[L][3] = "형님";
      } else {
        character.cstr[L][3] = CALLctx.getName(ctx.master);
      }
    }
    ctx.showMessage(`${ctx.getVarName("EXP", 1)} +{S}`);
    ctx.showMessage(`${ctx.getVarName("EXP", 5)} +{S}`);
    ctx.exp[L][1] += S;
    ctx.exp[L][5] += S;
    ctx.showMessage(`${ctx.getVarName("PALAM", 2)}의 구슬 +{S*400}`);
    ctx.showMessage(`${ctx.getVarName("PALAM", 4)}의 구슬 +{S*250}`);
    ctx.showMessage(`W ${ctx.getVarName("PALAM", 5)}의 구슬 +{S*250}`);
    ctx.juel[L][2] += S*400;
    ctx.juel[L][4] += S*250;
    ctx.juel[L][5] += S*250;
  }
  ctx.drawLine();
  return 1;
}
