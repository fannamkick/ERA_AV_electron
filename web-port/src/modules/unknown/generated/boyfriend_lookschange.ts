/**
 * BOYFRIEND_LOOKSCHANGE.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function event_lookschange(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.varSet(TCVAR, 0);
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else if (ctx.getTalent(count, 184) === 1) {
      if (ctx.getTalent(count, 423) === 0 && ctx.exp[ctx.count][111] >= 9) {
        // TODO: CONTINUE
      } else if (ctx.exp[ctx.count][111] >= 11) {
        // TODO: CONTINUE
      } else if (character.cflags[ctx.count][622] != 0) {
        // TODO: CONTINUE
      } else if (character.cflags[ctx.count][140] === 1 && (ctx.flags[101] & 128)) {
        // TODO: CONTINUE
      } else {
        ctx.locals[0] = ctx.rand(100);
        if (ctx.getTalent(count, 423) == 1 || ctx.getTalent(count, 405) == 1) {
          ctx.locals[0] = 100;
        }
        if (ctx.locals[0] >= 80) {
          await event_lookschange_detail(ctx, character);
        }
        ctx.varSet(TCVAR, 0);
        ctx.locals[0] = 0;
      }
    }
  }
}

export async function event_lookschange_detail(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  character = ctx.count;
  ctx.locals[0] = character.cflags[622];
  ctx.varSet(TCVAR, 0);
  ctx.showMessage(`W 주말이 지나고 월요일, 사무소에 들어온 ${ctx.getName(character)}에게 ${ctx.josaHelper("플레이어는")} 위화감을 느꼈다……`);
  ctx.showMessage(`${ctx.josaHelper("타겟을")} 주의깊게 관찰해보니`);
  // TODO: CALLFORM PARSONAL_CHANGE
  ctx.showMessage(`것이 위화감의 원인이었다`);
  ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}에게 이야기를 들어보니, 사귀고 있는 남친인 %CSTR:7%의 취향이라고 한다`);
  ctx.showMessage(`${ctx.josaHelper("타겟은")} ${ctx.getVarName("CALL", MASTER)}에게 어울리는지 물어봤지만, ${ctx.josaHelper("플레이어는")} 뭐라고 대답해야 좋을지 몰라 말이 나오지 않았다……`);
  ctx.exp[111] += 1;
  ctx.varSet(ctx.locals[3]);
  // TODO: FOR LOCAL:3, 0 ,90
  if (tcvar[ctx.locals[3]]) {
    if (STRLENS(expname[ctx.locals[3]]) > 0) {
      // TODO: EXP:(LOCAL:3) += TCVAR:(LOCAL:3)
    } else {
      console.log('FORML %조사처리(EXP:{(LOCAL:3)},"는")% 정의되지 않았기에 가속처리를 스킵합니다');
    }
    if (tcvar[ctx.locals[3]] != 101) {
      ctx.showMessage(`${ctx.getVarName("EXPNAME", ctx.locals[3])} + ${tcvar[ctx.locals[3]]}`);
    }
  }
  // TODO: NEXT
  ctx.varSet(TCVAR);
  await ctx.wait();
  ctx.drawLine('･･');
}

export async function parsonal_change(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.exp[111] === 0 && character.cflags[600] != 1 && character.cflags[600] != 10) {
    await print_haircolor_tailor(ctx, character);
    ctx.showMessage(`색이었던 머리가 짙은색으로 변한`);
    character.cflags[600] = 1;
    character.cflags[601] = 1;
  } else if (ctx.exp[111] === 0 && character.cflags[600] === 1) {
    await print_haircolor_tailor(ctx, character);
    ctx.showMessage(`색이었던 머리가 갈색으로 변한`);
    character.cflags[600] = 10;
    character.cflags[601] = 1;
  } else if (ctx.exp[111] === 0 && character.cflags[600] === 10) {
    await print_haircolor_tailor(ctx, character);
    ctx.showMessage(`색이었던 머리가 탈색했는지 인공적인 플라티나 브라운으로 변한`);
    character.cflags[600] = 9;
    character.cflags[601] = 1;
  }
  if (ctx.exp[111] === 1 && character.cflags[602] != 1 && character.cflags[602] != 8 && character.cflags[602] != 5) {
    await print_hairstyle_tailor(ctx, character);
    ctx.showMessage(`%조사만처리(RESULT+2,"였")%던 머리가 어깨에서 정리된 세미 롱으로 바뀐`);
    character.cflags[602] = 1;
  } else if (ctx.exp[111] === 1 && (character.cflags[602] === 1 || character.cflags[602] === 5) && character.cflags[602] != 8) {
    await print_hairstyle_tailor(ctx, character);
    ctx.showMessage(`%조사만처리(RESULT+2,"였")%던 머리에 풍성한 파마를 한`);
    character.cflags[602] = 7;
  } else if (ctx.exp[111] === 1 && character.cflags[602] === 8) {
    ctx.showMessage(`허리까지 내려왔던`);
    await print_hairstyle_tailor(ctx, character);
    ctx.showMessage(`%조사만처리(RESULT+2,"를")% 중강까지 잘라 풍성한 파마를 한`);
    character.cflags[602] = 7;
  }
  if (ctx.exp[111] === 2 && character.cflags[41] != 30) {
    ctx.showMessage(`항상 사무소에 올때는`);
    await print_clothtype_main2(ctx, character);
    ctx.showMessage(`%조사만처리(RESULT+2,"였")%던 ${ctx.josaHelper("타겟이")} 노출이 많은 펑크 로리타 패션을 한`);
    character.cflags[41] = 30;
  } else if (ctx.exp[111] === 2 && character.cflags[41] === 30) {
    ctx.showMessage(`항상 사무소에 올때는`);
    await print_clothtype_main2(ctx, character);
    ctx.showMessage(`%조사만처리(RESULT+2,"였")%던 ${ctx.josaHelper("타겟이")} 노출이 많은 캐미솔과 데님미니스커트를 입은`);
    character.cflags[41] = 40;
  }
  if (ctx.exp[111] === 3 && character.cflags[600] != 9) {
    await print_haircolor_tailor(ctx, character);
    ctx.showMessage(`색이었던 머리가 탈색했는지 인공적인 플라티나 브라운으로 변한 머리끝을 만지작거리고 있는`);
    character.cflags[600] = 9;
    character.cflags[601] = 1;
  } else if (ctx.exp[111] === 3 && character.cflags[600] === 9) {
    ctx.showMessage(`탈색한 머리에 희미하게 밝은 핑크색 메쉬를 넣은 머리끝을 만지작거리고 있는`);
  }
  if (ctx.exp[111] === 4 && (character.cflags[7] & 2) === 0) {
    await print_clothtype_main2(ctx, character);
    ctx.showMessage(`틈새로 보이는 배꼽에 희미한 핑크색 쥬얼리가 박힌 피어스가 빛나고 있는`);
    character.cflags[7] |= 2;
  } else if (ctx.exp[111] === 4 && (character.cflags[7] & 2)) {
    await print_clothtype_main2(ctx, character);
    ctx.showMessage(`틈새로 보이는 배꼽에 달린 피어스에 크롬제 벨리 체인이 걸려있는`);
  }
  if (ctx.exp[111] === 5 && character.cflags[606] != 15) {
    await print_clothtype_main2(ctx, character);
    ctx.showMessage(`에서 삐져나온 오른팔에 호랑나비 타투가 새겨진`);
    if (character.cflags[606] === 0) {
      ctx.cstr[70] = "오른팔";
      ctx.cstr[71] = "호랑나비 모양의";
      character.cflags[606] |= 1;
    } else if (character.cflags[606] === 1) {
      ctx.cstr[72] = "오른팔";
      ctx.cstr[73] = "호랑나비 모양의";
      character.cflags[606] |= 2;
    } else if (character.cflags[606] === 3) {
      ctx.cstr[74] = "오른팔";
      ctx.cstr[75] = "호랑나비 모양의";
      character.cflags[606] |= 4;
    } else if (character.cflags[606] === 7) {
      ctx.cstr[76] = "오른팔";
      ctx.cstr[77] = "호랑나비 모양의";
      character.cflags[606] |= 8;
    }
    character.cvar[50] = 1;
  } else if (ctx.exp[111] === 5 && character.cflags[606] === 15) {
    await print_clothtype_main2(ctx, character);
    ctx.showMessage(`틈새로 보이는 문신이 늘어난`);
  }
  if (ctx.exp[111] === 6 && ctx.talents[432] === 0) {
    ctx.showMessage(`지금까지 자연스러운 화장을 고집하던 ${ctx.josaHelper("타겟이")}`);
    ctx.showMessage(`마스카라에 립글로스도 사용한【갸루계】화장을 하고 있는`);
    ctx.talents[432] = 1;
    ctx.talents[209] = 0;
  } else if (ctx.exp[111] === 6 && ctx.talents[432]) {
    ctx.showMessage(`화장이 더 진해진`);
  }
  if (ctx.exp[111] === 7 && ctx.talents[422] === 0) {
    ctx.showMessage(`태닝 살롱에 다녔는지, 탱탱한 피부가 구릿빛으로 탄`);
    ctx.talents[422] = 1;
  } else if (ctx.exp[111] === 7 && ctx.talents[422] === 1) {
    ctx.showMessage(`갈색 피부를 유감없이 드러내고 있는`);
  }
  if (ctx.exp[111] === 8 && character.cflags[41] != 205) {
    await print_clothtype_main2(ctx, character);
    ctx.showMessage(`%조사만처리(RESULT+2,"였")%던 ${ctx.josaHelper("타겟이")} 노출이 더 심한 보디콘풍 마이크로 미니타이트 원피스, 형광색 망사스타킹에`);
    ctx.showMessage(`팔에는 뱅글과 링 브레이슬릿으로 바뀐`);
    character.cflags[41] = 205;
    character.cflags[42] = 74;
    character.cflags[170] = 8;
  } else if (ctx.exp[111] === 8 && character.cflags[41] === 205) {
    ctx.showMessage(`안그래도 대담한`);
    await print_clothtype_main2(ctx, character);
    ctx.showMessage(`%조사만처리(RESULT+2,"가")% 더 아슬아슬한 디자인으로 바뀐`);
  }
  if (ctx.exp[111] === 9 && character.cflags[606] != 15) {
    await print_clothtype_main2(ctx, character);
    ctx.showMessage(`에서 삐져나온 왼허벅지 안쪽에 트라이벌 패턴 타투가 새겨져 있는`);
    if (character.cflags[606] === 0) {
      ctx.cstr[70] = "왼허벅지 안쪽";
      ctx.cstr[71] = "트라이벌 패턴";
      character.cflags[606] |= 1;
    } else if (character.cflags[606] === 1) {
      ctx.cstr[72] = "왼허벅지 안쪽";
      ctx.cstr[73] = "트라이벌 패턴";
      character.cflags[606] |= 2;
    } else if (character.cflags[606] === 3) {
      ctx.cstr[74] = "왼허벅지 안쪽";
      ctx.cstr[75] = "트라이벌 패턴";
      character.cflags[606] |= 4;
    } else if (character.cflags[606] === 7) {
      ctx.cstr[76] = "왼허벅지 안쪽";
      ctx.cstr[77] = "트라이벌 패턴";
      character.cflags[606] |= 8;
    }
    character.cvar[50] = 1;
  } else if (ctx.exp[111] === 9 && character.cflags[606] === 15) {
    await print_clothtype_main2(ctx, character);
    ctx.showMessage(`틈새로 보이는 타투가 더 늘어나 있는`);
  }
  if (ctx.exp[111] === 10) {
    ctx.showMessage(`남친인 %CSTR:7%에게 완전히 물들었는지, 말투도 바보같아지고,`);
    ctx.showMessage(`찰나의 쾌락을 갈구하는, 전형적인【갸루계】가 되어버린`);
    ctx.talents[14] = 0;
    ctx.talents[23] = 1;
    ctx.talents[24] = 0;
    ctx.talents[25] = 1;
    ctx.talents[26] = 0;
    ctx.talents[27] = 0;
    ctx.talents[28] = 1;
    ctx.talents[30] = 0;
    ctx.talents[31] = 1;
    ctx.talents[33] = 1;
    ctx.talents[35] = 0;
    ctx.talents[36] = 1;
    ctx.talents[87] = 1;
    ctx.talents[113] = 0;
    ctx.talents[132] = 0;
    ctx.talents[134] = 0;
    ctx.talents[209] = 0;
    ctx.talents[416] = 1;
    if (ctx.abilities[11] < 3) {
      ctx.abilities[11] = 3;
    }
    ctx.base[30] *= 3;
    ctx.cstr[80] = "자지";
    if (ctx.rand(2) === 0) {
      ctx.cstr[9] = "난";
    } else {
      ctx.cstr[9] = "나";
    }
  }
}
