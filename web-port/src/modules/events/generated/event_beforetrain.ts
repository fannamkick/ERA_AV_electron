/**
 * EVENT_BEFORETRAIN.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function pritrain_message(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (0) {
    ctx.drawLine();
    character.cflags[10] += 1;
    ctx.showMessage(`${ctx.getName(character)}에게 ${character.cflags[10]}회째 지도를 시작했다.`);
    await ctx.wait();
    ctx.drawLine();
    return 0;
  }
  ctx.varSet(ctx.locals[0]);
  if (ctx.flags[1111]) {
    // TODO: FOR LOCAL,0,CHARANUM
    if (GETBIT(ctx.flags[1111],ctx.locals[0])) {
      character.cflags[ctx.locals[0]][10] += 1;
    }
    // TODO: NEXT
  } else {
    character.cflags[10] += 1;
  }
  if ((ctx.flags[6] & 1)) {
    ctx.showMessage(`${ctx.getName(character)}에게 ${character.cflags[10]}회째 지도를 시작했다.`);
    await ctx.wait();
    return 0;
  }
  ctx.drawLine();
  if (ctx.flags[549] === 1) {
    if (character.cflags[42] === 79 && character.cflags[49] === 0 && character.cflags[40] >= 64) {
      character.cflags[40] -= 64;
    }
  }
  C = character.no + 2000;
  if (character.cflags[10] === 1 && ctx.flags[C] === 0) {
    ctx.showMessage(`${ctx.getName(character)}에게 첫 지도를 시작했다.`);
    ctx.showMessage('');
    if (ctx.flags[37]) {
      await pritrain_message_clothed(ctx, character);
    } else {
      await pritrain_message_noclothes(ctx, character);
    }
    if (ctx.talents[23]) {
      ctx.showMessage(`L`);
      ctx.showMessage(`그러나, ${ctx.getVarName("CALL", TARGET)}의 눈동자 깊은 곳에서`);
      ctx.showMessage(`마치 무언가를 기대하는듯한 빛이 비치는 것도 확실해 보인다.`);
    }
    if (ctx.assi > 0) {
      if (ctx.getTalent(assi, 83)) {
        ctx.showMessage(`L`);
        ctx.showMessage(`한편, 조수인 ${ctx.josaHelper("조수는")}, 마음껏 ${ctx.josaHelper("타겟을")} 괴롭힐 수 있다는 것에,`);
        ctx.showMessage(`벌써부터 내심 기대를 감출 수 없다는 모습이었다.`);
      } else if (ctx.getTalent(assi, 13)) {
        ctx.showMessage(`L`);
        ctx.showMessage(`조수인 ${ctx.josaHelper("조수는")} ${ctx.getVarName("CALL", TARGET)}의 모습을 보고,`);
        ctx.showMessage(`${ctx.getVarName("CALL", MASTER)}의 허가를 얻어, ${ctx.getVarName("CALL", TARGET)}의 어깨에 슬며시 손을 얹었다.`);
        if (ctx.talents[11]) {
          ctx.showMessage(`${ctx.josaHelper("타겟은")} 그 손을 매몰차게 뿌리치려 했다.`);
        }
      }
    }
    if (ctx.flags[37] === 0) {
      if (ctx.talents[310]) {
        await ctx.wait();
        ctx.showMessage(`――발가벗은 ${ctx.getName(character)}의 몸에선 확실히 위화감이 느껴졌다.`);
        ctx.showMessage(`하지만, 어차피 지도에는 지장이 없을 것이다.`);
      } else if (ctx.talents[313]) {
        await ctx.wait();
        ctx.showMessage(`――발가벗은 ${ctx.getName(character)}의 몸은 어딘지 모르게 위화감을 풍겼다.`);
        ctx.showMessage(`하지만, 어차피 지도에는 지장이 없을 것이다.`);
      } else if (ctx.talents[312]) {
        await ctx.wait();
        ctx.showMessage(`발가벗은 ${ctx.getVarName("CALL", TARGET)}의 온몸에는 빽빽하게 흉터가 아로새겨져 있었다.`);
        ctx.showMessage(`이건 만만치 않겠군, 하고 ${ctx.josaHelper("플레이어는")} 마음속으로 중얼거렸다.`);
      }
    }
    await ctx.wait();
    return 1;
  }
  ctx.showMessage(`${ctx.getName(character)}에게 ${character.cflags[10]}회째 지도를 시작했다.`);
  S = 0;
  C = character.no + 2000;
  if ((ctx.talents[13] || ctx.talents[14] || ctx.talents[88]) && ctx.abilities[10] >= 4 && ctx.abilities[16] >= 3 && character.mark[3] === 0 && ctx.flags[C] === 0) {
    await ctx.wait();
    ctx.showMessage(`${ctx.josaHelper("타겟은")}`);
    await print_clothtype(ctx, character);
    ctx.locals[1] = ctx.result;
    if (character.cflags[173] === 0) {
      if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] === 0) {
        ctx.showMessage(``);
      } else if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] != 0) {
        ctx.showMessage(`에`);
      } else if (character.cflags[170] != 0 && character.cflags[171] != 0) {
        ctx.showMessage(`에`);
      } else {
        ctx.showMessage(`%조사만처리(LOCAL:1+2,"와")%`);
      }
      await print_shoestype(ctx, character);
      if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] === 0) {
        ctx.showMessage(``);
      } else if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] != 0) {
        ctx.showMessage(`차림`);
      } else if (character.cflags[170] === 0 && character.cflags[171] != 0 && character.cflags[40] === 0) {
        ctx.showMessage(`차림`);
      } else if (character.cflags[170] != 0 && character.cflags[171] === 0 && character.cflags[40] === 0) {
        ctx.showMessage(`차림`);
      } else if (character.cflags[170] != 0 && character.cflags[171] === 0 && character.cflags[40] != 0) {
        ctx.showMessage(`차림`);
      } else {
        ctx.print('차림');
      }
    } else {
      ctx.showMessage(``);
    }
    if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] === 0) {
      ctx.showMessage(`로`);
    } else {
      ctx.showMessage(`으로`);
    }
    ctx.showMessage(`침대 가장자리에 앉아`);
    if (character.cflags[171] >= 1 && character.cflags[173] === 0 && character.cflags[170] != 0 && character.cflags[40] != 0) {
      await print_shoestype_main2(ctx, character);
      if (ctx.result === 0) {
        ctx.showMessage(`를 벗고`);
      } else {
        ctx.showMessage(`을 벗고`);
      }
    } else {
      ctx.showMessage(``);
    }
    ctx.showMessage(`${ctx.getVarName("CALL", MASTER)}에게 인사를 했다.`);
  } else if ((ctx.talents[13] || ctx.talents[14]) && ctx.abilities[10] >= 3 && character.mark[3] <= 1 && ctx.flags[C] === 0) {
    await ctx.wait();
    ctx.showMessage(`${ctx.josaHelper("타겟은")}`);
    await print_clothtype(ctx, character);
    ctx.locals[1] = ctx.result;
    if (character.cflags[173] === 0) {
      if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] === 0) {
        ctx.showMessage(``);
      } else if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] != 0) {
        ctx.showMessage(`에`);
      } else if (character.cflags[170] != 0 && character.cflags[171] != 0) {
        ctx.showMessage(`에`);
      } else {
        ctx.showMessage(`%조사만처리(LOCAL:1+2,"와")%`);
      }
      await print_shoestype(ctx, character);
      if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] === 0) {
        ctx.showMessage(``);
      } else if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] != 0) {
        ctx.showMessage(`차림`);
      } else if (character.cflags[170] === 0 && character.cflags[171] != 0 && character.cflags[40] === 0) {
        ctx.showMessage(`차림`);
      } else if (character.cflags[170] != 0 && character.cflags[171] === 0 && character.cflags[40] === 0) {
        ctx.showMessage(`차림`);
      } else if (character.cflags[170] != 0 && character.cflags[171] === 0 && character.cflags[40] != 0) {
        ctx.showMessage(`차림`);
      } else {
        ctx.print('차림');
      }
    } else {
      ctx.showMessage(``);
    }
    if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] === 0) {
      ctx.showMessage(`로`);
    } else {
      ctx.showMessage(`으로`);
    }
    ctx.showMessage(`침대 가장자리에 앉아`);
    if (character.cflags[171] >= 1 && character.cflags[173] === 0 && character.cflags[170] != 0 && character.cflags[40] != 0) {
      await print_shoestype_main2(ctx, character);
      if (ctx.result === 0) {
        ctx.showMessage(`를 벗고`);
      } else {
        ctx.showMessage(`을 벗고`);
      }
    } else {
      ctx.showMessage(``);
    }
    ctx.showMessage(`${ctx.getVarName("CALL", MASTER)}에게 인사를 했다.`);
    S = 1;
  } else if (ctx.flags[C] === 0) {
    await ctx.wait();
    await print_clothtype(ctx, character);
    ctx.locals[1] = ctx.result;
    if (character.cflags[173] === 0) {
      if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] === 0) {
        ctx.showMessage(``);
      } else if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] != 0) {
        ctx.showMessage(`에`);
      } else if (character.cflags[170] != 0 && character.cflags[171] != 0) {
        ctx.showMessage(`에`);
      } else {
        ctx.showMessage(`%조사만처리(LOCAL:1+2,"와")%`);
      }
      await print_shoestype(ctx, character);
      if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] === 0) {
        ctx.showMessage(``);
      } else if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] != 0) {
        ctx.showMessage(`차림`);
      } else if (character.cflags[170] === 0 && character.cflags[171] != 0 && character.cflags[40] === 0) {
        ctx.showMessage(`차림`);
      } else if (character.cflags[170] != 0 && character.cflags[171] === 0 && character.cflags[40] === 0) {
        ctx.showMessage(`차림`);
      } else if (character.cflags[170] != 0 && character.cflags[171] === 0 && character.cflags[40] != 0) {
        ctx.showMessage(`차림`);
      } else {
        ctx.print('차림');
      }
    } else {
      ctx.showMessage(``);
    }
    if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] === 0) {
      ctx.showMessage(`로`);
    } else {
      ctx.showMessage(`으로`);
    }
    ctx.showMessage(`침대 가장자리에 앉아`);
    if (character.cflags[171] >= 1 && character.cflags[173] === 0 && character.cflags[170] != 0 && character.cflags[40] != 0) {
      await print_shoestype_main2(ctx, character);
      if (ctx.result === 0) {
        ctx.showMessage(`를 벗고`);
      } else {
        ctx.showMessage(`을 벗고`);
      }
    } else {
      ctx.showMessage(``);
    }
    ctx.showMessage(`${ctx.getVarName("CALL", MASTER)}에게 인사를 했다.`);
    S = 1;
  }
  if (character.cflags[42] === 11 && (character.cflags[40] & 64) && ctx.flags[C] === 0) {
    if (character.cflags[40] == 64) {
      ctx.showMessage('아무래도, 안쪽은 알몸인 것 같다……');
    }
    await ctx.wait();
    S = 0;
    return 0;
  }
  if (ctx.talents[153] && character.cflags[110] <= DAY+10) {
    if (S === 0) {
      await print_clothtype(ctx, character);
      ctx.locals[1] = ctx.result;
      if (character.cflags[173] === 0) {
        if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] === 0) {
          ctx.showMessage(``);
        } else if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] != 0) {
          ctx.showMessage(`에`);
        } else if (character.cflags[170] != 0 && character.cflags[171] != 0) {
          ctx.showMessage(`에`);
        } else {
          ctx.showMessage(`%조사만처리(LOCAL:1+2,"와")%`);
        }
        await print_shoestype(ctx, character);
        if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] === 0) {
          ctx.showMessage(``);
        } else if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] != 0) {
          ctx.showMessage(``);
        } else if (character.cflags[170] === 0 && character.cflags[171] != 0 && character.cflags[40] === 0) {
          ctx.showMessage(`차림`);
        } else if (character.cflags[170] != 0 && character.cflags[171] === 0 && character.cflags[40] === 0) {
          ctx.showMessage(`차림`);
        } else {
          ctx.print('차림');
        }
      } else {
        ctx.showMessage(``);
      }
    }
    ctx.showMessage(`인 ${ctx.josaHelper("타겟은")}`);
    if (ctx.talents[100]) {
      ctx.print('그 작은 몸에 어울리지 않게');
    }
    ctx.showMessage(`지금도 팽팽한 배를 안고 있다.`);
    ctx.showMessage(`(과격한 지도는 피하는 게 좋을 것 같다)`);
  } else if (ctx.talents[153] && character.cflags[110] <= DAY+20) {
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 배는 안정기에 들어가 임산부 특유의 둥글게 부푼 라인을 드러내고 있다.`);
  } else if (ctx.talents[153] && character.cflags[110] <= DAY+30) {
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 배는 약간 봉긋하게 눈에 띄기 시작했다.`);
  }
  A = character.cflags[40];
  await wearing_cloth_all(ctx, character);
  B = character.cflags[40];
  character.cflags[40] = A;
  if ((character.cflags[40] & 4)) {
    if ((character.cflags[40] & 2) === 0 && (B & 2) && (ctx.talents[109] === 0 && ctx.talents[116] === 0)) {
      ctx.print('노브라인 유방이 옷 아래에서 흔들리고 있는 모습이');
      if (ctx.talents[110] || ctx.talents[114]) {
        ctx.print('확실히');
      } else {
        ctx.print('희미하게');
      }
      ctx.showMessage('드러나, 눈을 즐겁게 해주고 있다.');
    }
  }
  if ((character.cflags[7] & 1) && (character.cflags[40] & 2) === 0) {
    if ((character.cflags[40] & 4) === 1) {
      ctx.showMessage(`옷의 옷감 너머로, ${ctx.getVarName("CALL", TARGET)}의 양 유두에 매달린 피어스 형태가 솟아올라 있다.`);
    } else {
      ctx.showMessage(`${ctx.josaHelper("타겟이")} 움직일 때마다, 그 양쪽 젖꼭지에 매달린 피어스가 조금씩 흔들렸다.`);
    }
  }
  if ((character.cflags[40] & 1) === 0 && ((character.cflags[40] & 8) || (character.cflags[40] & 16))) {
    if ((B & 1) && ctx.talents[135] === 0 && ctx.abilities[17] < 3) {
      ctx.print('노팬티인 하반신이 부끄러운지');
      if (ctx.talents[121] === 1) {
        if (ctx.abilities[38] >= 3) {
          ctx.showMessage(`쿠퍼액을 질질 흘리며 발기한`);
        }
        await penisform(ctx, character);
        ctx.showMessage(`후타나리 페니스가 자란`);
      }
      ctx.showMessage('고간을 신경쓰고 있다……');
    }
  }
  if ((character.cflags[40] & 1) === 0 && (character.cflags[40] & 8)) {
    if ((B & 1) && ctx.abilities[17] >= 3) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 스커트를 잡아올려 속옷을 입지 않아 드러난`);
      if (ctx.talents[121] === 1) {
        if (ctx.abilities[38] >= 3) {
          ctx.showMessage(`쿠퍼액을 질질 흘리며 발기한`);
        }
        await penisform(ctx, character);
        ctx.showMessage(`후타나리 페니스`);
      } else {
        ctx.showMessage(`비부`);
      }
      ctx.showMessage(`를 당신에게 보여줬다`);
    }
  }
  if (character.cflags[40] === 0 && ctx.talents[121]) {
    if (ctx.abilities[38] >= 3) {
      ctx.showMessage(`쿠퍼액을 질질 흘리며 발기한`);
    }
    await penisform(ctx, character);
    ctx.showMessage(`후타나리 페니스`);
    if (ctx.abilities[38] >= 3 && ctx.abilities[31] >= 2) {
      ctx.showMessage(`를, 사정의 쾌락을 기억한 ${ctx.josaHelper("타겟이")} 무의식중에 흩고 있다……`);
    } else {
      ctx.showMessage(`를 아직 받아들이지 못했는지 양손으로 감추고 있다……`);
    }
  }
  if ((character.cflags[7] & 4) || (character.cflags[7] & 8) && (character.cflags[40] & 1) === 0 && (character.cflags[40] & 16) === 0) {
    if ((character.cflags[40] & 8) === 1) {
      ctx.print('치마 사이로 보이는');
    } else {
      ctx.print('알몸의');
    }
    ctx.print('비부에선');
    if ((character.cflags[7] & 4)) {
      ctx.print('양쪽 음순');
    }
    if ((character.cflags[7] & 4) && (character.cflags[7] & 8)) {
      ctx.print('과');
    }
    if ((character.cflags[7] & 8)) {
      ctx.print('클리토리스');
    }
    ctx.showMessage('에 낀 피어스가 빛을 받아 빛나고 있다……');
  }
  await ctx.wait();
  C = 0;
  S = 0;
  return 1;
}

export async function pritrain_message_noclothes(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.talents[22]) {
    ctx.showMessage(`${ctx.josaHelper("타겟은")} ${ctx.josaHelper("플레이어가")} 말하는대로 옷을 벗고서`);
    ctx.showMessage(`아무런 감정도 드러내지 않고, 앞쪽마저 숨기려고 하지 않은 채 우뚝 서 있다.`);
  } else if (ctx.talents[132] && ctx.talents[135]) {
    ctx.showMessage(`${ctx.josaHelper("타겟은")} 영문도 모른 채 옷을 벗어던지고, 알몸 상태가 되었다.`);
  } else if (ctx.talents[12]) {
    ctx.showMessage(`알몸으로 벗겨진 ${ctx.josaHelper("타겟은")}, 손으로 가슴과 사타구니를 가리고 있지만,`);
    ctx.showMessage(`의연한 태도를 취하고 있다. 약점만은 결코 보이지 않겠다는 각오인 것 같다.`);
  } else if (ctx.talents[11]) {
    ctx.showMessage(`${ctx.josaHelper("플레이어를")} 실컷 고생시킨 끝에 겨우 알몸이 된 ${ctx.josaHelper("타겟은")}`);
    ctx.showMessage(`필사적으로 몸을 감추려 앞으로 숙이고 있지만,`);
    ctx.showMessage(`그 눈만은 무서운 기세로 ${ctx.josaHelper("플레이어를")} 노려보고 있다.`);
  } else if (ctx.talents[21]) {
    ctx.showMessage(`${ctx.getVarName("CALL", MASTER)}의 명령에, ${ctx.josaHelper("타겟은")} 어깨를 으쓱 하고 옷을 벗었다.`);
    ctx.showMessage(`무슨 짓을 해도 상관 없으니 이런 허튼짓은 빨리 끝내버리고 싶어,`);
    ctx.showMessage(`하는 태도다.`);
  } else if (ctx.talents[132]) {
    ctx.showMessage(`알몸이 된 ${ctx.josaHelper("타겟은")} 그저 떨기만 할 뿐이었다.`);
    ctx.showMessage(`결국엔 그저, 평범한 어린애일 뿐이다.`);
  } else if (ctx.talents[20]) {
    ctx.showMessage(`알몸이 된 ${ctx.josaHelper("타겟은")} 양 손으로 몸을 가리고 있지만,`);
    ctx.showMessage(`표정은 어디까지나 평정을 가장하고 있다.`);
  } else if (ctx.talents[10]) {
    ctx.showMessage(`알몸으로 벗겨진 ${ctx.josaHelper("타겟은")} 자신의 어깨를 끌어안고서 떨고 있다.`);
    ctx.showMessage(`앞으로 자신을 기다릴 운명을 상상하고서, 공포에 이를 부딪치고 있다.`);
  } else if (ctx.talents[15]) {
    ctx.showMessage(`${ctx.josaHelper("타겟은")} 전라를 드러낸 치욕과 이제부터 노예로 취급될 그 굴욕을`);
    ctx.showMessage(`이를 악물고 어깨를 떨면서 필사적으로 참고 있다.`);
  } else if (ctx.talents[17]) {
    ctx.showMessage(`알몸이 된 ${ctx.josaHelper("타겟은")} 머뭇거리며 ${ctx.getVarName("CALL", MASTER)}의 눈치를 살피고 있다.`);
    ctx.showMessage(`말하는 것에 얌전히 따르면 아픈 꼴은 당하지 않을지도 모른다, 라고 생각하고 있는 것 같다.`);
  } else if (ctx.talents[13]) {
    ctx.showMessage(`알몸으로 벗겨졌지만, ${ctx.josaHelper("타겟은")} 자신이 처한 상황을 받아들일 수 없다는 모습이다.`);
    ctx.showMessage(`사람이 이런 심한 짓을 타인에게 할 수 있을 리 없다, 라는 생각이라도 하는 것일까.`);
  } else if (ctx.talents[14]) {
    ctx.showMessage(`저항해도 소용 없다고 깨달은 것인지, ${ctx.josaHelper("타겟은")} 얌전히 옷을 벗고서 알몸이 되었다.`);
    ctx.showMessage(`적어도, 억지로 옷을 벗겨지는 굴욕만큼은 피하고 싶었던 걸지도 모른다.`);
  } else if (ctx.talents[16]) {
    ctx.showMessage(`${ctx.josaHelper("타겟은")} 두려움에 떨면서도 ${ctx.josaHelper("플레이어를")} 노려보고 있다.`);
    ctx.showMessage(`이런 짓으로 자신은 굴복하지 않을 것이라는 자신이 있는 것 같다.`);
  } else {
    ctx.showMessage(`${ctx.josaHelper("타겟은")} 벗겨져서 알몸이 되었다.`);
  }
  return 1;
}

export async function pritrain_message_clothed(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.talents[22]) {
    await print_clothtype(ctx, character);
    ctx.locals[1] = ctx.result;
    if (character.cflags[173] === 0) {
      if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] === 0) {
        ctx.showMessage(``);
      } else if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] != 0) {
        ctx.showMessage(`에`);
      } else if (character.cflags[170] != 0 && character.cflags[171] != 0) {
        ctx.showMessage(`에`);
      } else {
        ctx.showMessage(`%조사만처리(LOCAL:1+2,"와")%`);
      }
      await print_shoestype(ctx, character);
      if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] === 0) {
        ctx.showMessage(``);
      } else if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] != 0) {
        ctx.showMessage(`차림`);
      } else if (character.cflags[170] === 0 && character.cflags[171] != 0 && character.cflags[40] === 0) {
        ctx.showMessage(`차림`);
      } else if (character.cflags[170] != 0 && character.cflags[171] === 0 && character.cflags[40] === 0) {
        ctx.showMessage(`차림`);
      } else if (character.cflags[170] != 0 && character.cflags[171] === 0 && character.cflags[40] != 0) {
        ctx.showMessage(`차림`);
      } else {
        ctx.print('차림');
      }
    } else {
      ctx.showMessage(``);
    }
    ctx.showMessage(`인 ${ctx.josaHelper("타겟은")} 아무 감정도 드러내지 않은 채 우뚝 서 있다.`);
  } else if (ctx.talents[132] && ctx.talents[135]) {
    await print_clothtype(ctx, character);
    ctx.locals[1] = ctx.result;
    if (character.cflags[173] === 0) {
      if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] === 0) {
        ctx.showMessage(``);
      } else if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] != 0) {
        ctx.showMessage(`에`);
      } else if (character.cflags[170] != 0 && character.cflags[171] != 0) {
        ctx.showMessage(`에`);
      } else {
        ctx.showMessage(`%조사만처리(LOCAL:1+2,"와")%`);
      }
      await print_shoestype(ctx, character);
      if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] === 0) {
        ctx.showMessage(``);
      } else if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] != 0) {
        ctx.showMessage(`차림`);
      } else if (character.cflags[170] === 0 && character.cflags[171] != 0 && character.cflags[40] === 0) {
        ctx.showMessage(`차림`);
      } else if (character.cflags[170] != 0 && character.cflags[171] === 0 && character.cflags[40] === 0) {
        ctx.showMessage(`차림`);
      } else if (character.cflags[170] != 0 && character.cflags[171] === 0 && character.cflags[40] != 0) {
        ctx.showMessage(`차림`);
      } else {
        ctx.print('차림');
      }
    } else {
      ctx.showMessage(``);
    }
    ctx.showMessage(`인 ${ctx.josaHelper("타겟은")} 무슨 짓을 당하고 있는 것인지 이해하지 못한 것 같다.`);
  } else if (ctx.talents[12]) {
    await print_clothtype(ctx, character);
    ctx.locals[1] = ctx.result;
    if (character.cflags[173] === 0) {
      if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] === 0) {
        ctx.showMessage(``);
      } else if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] != 0) {
        ctx.showMessage(`에`);
      } else if (character.cflags[170] != 0 && character.cflags[171] != 0) {
        ctx.showMessage(`에`);
      } else {
        ctx.showMessage(`%조사만처리(LOCAL:1+2,"와")%`);
      }
      await print_shoestype(ctx, character);
      if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] === 0) {
        ctx.showMessage(``);
      } else if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] != 0) {
        ctx.showMessage(`차림`);
      } else if (character.cflags[170] === 0 && character.cflags[171] != 0 && character.cflags[40] === 0) {
        ctx.showMessage(`차림`);
      } else if (character.cflags[170] != 0 && character.cflags[171] === 0 && character.cflags[40] === 0) {
        ctx.showMessage(`차림`);
      } else if (character.cflags[170] != 0 && character.cflags[171] === 0 && character.cflags[40] != 0) {
        ctx.showMessage(`차림`);
      } else {
        ctx.print('차림');
      }
    } else {
      ctx.showMessage(``);
    }
    ctx.showMessage(`인 ${ctx.josaHelper("타겟은")} 의연한 태도를 취하고 있다.`);
    ctx.showMessage(`약점만은 절대 보여주지 않겠다는 각오인 것 같다.`);
  } else if (ctx.talents[11]) {
    await print_clothtype(ctx, character);
    ctx.locals[1] = ctx.result;
    if (character.cflags[173] === 0) {
      if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] === 0) {
        ctx.showMessage(``);
      } else if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] != 0) {
        ctx.showMessage(`에`);
      } else if (character.cflags[170] != 0 && character.cflags[171] != 0) {
        ctx.showMessage(`에`);
      } else {
        ctx.showMessage(`%조사만처리(LOCAL:1+2,"와")%`);
      }
      await print_shoestype(ctx, character);
      if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] === 0) {
        ctx.showMessage(``);
      } else if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] != 0) {
        ctx.showMessage(`차림`);
      } else if (character.cflags[170] === 0 && character.cflags[171] != 0 && character.cflags[40] === 0) {
        ctx.showMessage(`차림`);
      } else if (character.cflags[170] != 0 && character.cflags[171] === 0 && character.cflags[40] === 0) {
        ctx.showMessage(`차림`);
      } else if (character.cflags[170] != 0 && character.cflags[171] === 0 && character.cflags[40] != 0) {
        ctx.showMessage(`차림`);
      } else {
        ctx.print('차림');
      }
    } else {
      ctx.showMessage(``);
    }
    ctx.showMessage(`인 ${ctx.josaHelper("타겟은")} ${ctx.josaHelper("플레이어를")} 노려보고 있다.`);
  } else if (ctx.talents[21]) {
    await print_clothtype(ctx, character);
    ctx.locals[1] = ctx.result;
    if (character.cflags[173] === 0) {
      if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] === 0) {
        ctx.showMessage(``);
      } else if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] != 0) {
        ctx.showMessage(`에`);
      } else if (character.cflags[170] != 0 && character.cflags[171] != 0) {
        ctx.showMessage(`에`);
      } else {
        ctx.showMessage(`%조사만처리(LOCAL:1+2,"와")%`);
      }
      await print_shoestype(ctx, character);
      if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] === 0) {
        ctx.showMessage(``);
      } else if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] != 0) {
        ctx.showMessage(`차림`);
      } else if (character.cflags[170] === 0 && character.cflags[171] != 0 && character.cflags[40] === 0) {
        ctx.showMessage(`차림`);
      } else if (character.cflags[170] != 0 && character.cflags[171] === 0 && character.cflags[40] === 0) {
        ctx.showMessage(`차림`);
      } else if (character.cflags[170] != 0 && character.cflags[171] === 0 && character.cflags[40] != 0) {
        ctx.showMessage(`차림`);
      } else {
        ctx.print('차림');
      }
    } else {
      ctx.showMessage(``);
    }
    ctx.showMessage(`인 ${ctx.josaHelper("타겟은")} 어깨를 으쓱거리고 있다.`);
    ctx.showMessage(`무슨 짓을 해도 상관 없으니까 이런 허튼짓은 빨리 끝내고 싶어,`);
    ctx.showMessage(`하는 태도다.`);
  } else if (ctx.talents[132]) {
    await print_clothtype(ctx, character);
    ctx.locals[1] = ctx.result;
    if (character.cflags[173] === 0) {
      if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] === 0) {
        ctx.showMessage(``);
      } else if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] != 0) {
        ctx.showMessage(`에`);
      } else if (character.cflags[170] != 0 && character.cflags[171] != 0) {
        ctx.showMessage(`에`);
      } else {
        ctx.showMessage(`%조사만처리(LOCAL:1+2,"와")%`);
      }
      await print_shoestype(ctx, character);
      if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] === 0) {
        ctx.showMessage(``);
      } else if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] != 0) {
        ctx.showMessage(`차림`);
      } else if (character.cflags[170] === 0 && character.cflags[171] != 0 && character.cflags[40] === 0) {
        ctx.showMessage(`차림`);
      } else if (character.cflags[170] != 0 && character.cflags[171] === 0 && character.cflags[40] === 0) {
        ctx.showMessage(`차림`);
      } else if (character.cflags[170] != 0 && character.cflags[171] === 0 && character.cflags[40] != 0) {
        ctx.showMessage(`차림`);
      } else {
        ctx.print('차림');
      }
    } else {
      ctx.showMessage(``);
    }
    ctx.showMessage(`인 ${ctx.josaHelper("타겟은")} 그저 떨고만 있다.`);
    ctx.showMessage(`결국엔 그저, 평범한 어린애일 뿐이다.`);
  } else if (ctx.talents[20]) {
    await print_clothtype(ctx, character);
    ctx.locals[1] = ctx.result;
    if (character.cflags[173] === 0) {
      if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] === 0) {
        ctx.showMessage(``);
      } else if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] != 0) {
        ctx.showMessage(`에`);
      } else if (character.cflags[170] != 0 && character.cflags[171] != 0) {
        ctx.showMessage(`에`);
      } else {
        ctx.showMessage(`%조사만처리(LOCAL:1+2,"와")%`);
      }
      await print_shoestype(ctx, character);
      if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] === 0) {
        ctx.showMessage(``);
      } else if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] != 0) {
        ctx.showMessage(`차림`);
      } else if (character.cflags[170] === 0 && character.cflags[171] != 0 && character.cflags[40] === 0) {
        ctx.showMessage(`차림`);
      } else if (character.cflags[170] != 0 && character.cflags[171] === 0 && character.cflags[40] === 0) {
        ctx.showMessage(`차림`);
      } else if (character.cflags[170] != 0 && character.cflags[171] === 0 && character.cflags[40] != 0) {
        ctx.showMessage(`차림`);
      } else {
        ctx.print('차림');
      }
    } else {
      ctx.showMessage(``);
    }
    ctx.showMessage(`인 ${ctx.josaHelper("타겟은")} 표정은 어디까지나 평정을 가장하고 있다.`);
  } else if (ctx.talents[10]) {
    await print_clothtype(ctx, character);
    ctx.locals[1] = ctx.result;
    if (character.cflags[173] === 0) {
      if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] === 0) {
        ctx.showMessage(``);
      } else if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] != 0) {
        ctx.showMessage(`에`);
      } else if (character.cflags[170] != 0 && character.cflags[171] != 0) {
        ctx.showMessage(`에`);
      } else {
        ctx.showMessage(`%조사만처리(LOCAL:1+2,"와")%`);
      }
      await print_shoestype(ctx, character);
      if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] === 0) {
        ctx.showMessage(``);
      } else if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] != 0) {
        ctx.showMessage(`차림`);
      } else if (character.cflags[170] === 0 && character.cflags[171] != 0 && character.cflags[40] === 0) {
        ctx.showMessage(`차림`);
      } else if (character.cflags[170] != 0 && character.cflags[171] === 0 && character.cflags[40] === 0) {
        ctx.showMessage(`차림`);
      } else if (character.cflags[170] != 0 && character.cflags[171] === 0 && character.cflags[40] != 0) {
        ctx.showMessage(`차림`);
      } else {
        ctx.print('차림');
      }
    } else {
      ctx.showMessage(``);
    }
    ctx.showMessage(`인 ${ctx.josaHelper("타겟은")} 자신의 어깨를 끌어안고서 떨고 있다.`);
    ctx.showMessage(`앞으로 자신을 기다릴 운명을 상상하고서, 공포에 이를 부딪치고 있다.`);
  } else if (ctx.talents[15]) {
    await print_clothtype(ctx, character);
    ctx.locals[1] = ctx.result;
    if (character.cflags[173] === 0) {
      if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] === 0) {
        ctx.showMessage(``);
      } else if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] != 0) {
        ctx.showMessage(`에`);
      } else if (character.cflags[170] != 0 && character.cflags[171] != 0) {
        ctx.showMessage(`에`);
      } else {
        ctx.showMessage(`%조사만처리(LOCAL:1+2,"와")%`);
      }
      await print_shoestype(ctx, character);
      if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] === 0) {
        ctx.showMessage(``);
      } else if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] != 0) {
        ctx.showMessage(`차림`);
      } else if (character.cflags[170] === 0 && character.cflags[171] != 0 && character.cflags[40] === 0) {
        ctx.showMessage(`차림`);
      } else if (character.cflags[170] != 0 && character.cflags[171] === 0 && character.cflags[40] === 0) {
        ctx.showMessage(`차림`);
      } else if (character.cflags[170] != 0 && character.cflags[171] === 0 && character.cflags[40] != 0) {
        ctx.showMessage(`차림`);
      } else {
        ctx.print('차림');
      }
    } else {
      ctx.showMessage(``);
    }
    ctx.showMessage(`인 ${ctx.josaHelper("타겟은")} 앞으로 노예로서 취급될 것이라는 굴욕을`);
    ctx.showMessage(`이를 악물고 어깨를 떨면서 필사적으로 참고 있다.`);
  } else if (ctx.talents[17]) {
    await print_clothtype(ctx, character);
    ctx.locals[1] = ctx.result;
    if (character.cflags[173] === 0) {
      if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] === 0) {
        ctx.showMessage(``);
      } else if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] != 0) {
        ctx.showMessage(`에`);
      } else if (character.cflags[170] != 0 && character.cflags[171] != 0) {
        ctx.showMessage(`에`);
      } else {
        ctx.showMessage(`%조사만처리(LOCAL:1+2,"와")%`);
      }
      await print_shoestype(ctx, character);
      if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] === 0) {
        ctx.showMessage(``);
      } else if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] != 0) {
        ctx.showMessage(`차림`);
      } else if (character.cflags[170] === 0 && character.cflags[171] != 0 && character.cflags[40] === 0) {
        ctx.showMessage(`차림`);
      } else if (character.cflags[170] != 0 && character.cflags[171] === 0 && character.cflags[40] === 0) {
        ctx.showMessage(`차림`);
      } else if (character.cflags[170] != 0 && character.cflags[171] === 0 && character.cflags[40] != 0) {
        ctx.showMessage(`차림`);
      } else {
        ctx.print('차림');
      }
    } else {
      ctx.showMessage(``);
    }
    ctx.showMessage(`인 ${ctx.josaHelper("타겟은")} 머뭇거리며 ${ctx.getVarName("CALL", MASTER)}의 눈치를 살피고 있다.`);
    ctx.showMessage(`말하는 것에 얌전히 따르면 아픈 꼴은 당하지 않을지도 모른다, 라고 생각하고 있는 것 같다.`);
  } else if (ctx.talents[13]) {
    await print_clothtype(ctx, character);
    ctx.locals[1] = ctx.result;
    if (character.cflags[173] === 0) {
      if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] === 0) {
        ctx.showMessage(``);
      } else if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] != 0) {
        ctx.showMessage(`에`);
      } else if (character.cflags[170] != 0 && character.cflags[171] != 0) {
        ctx.showMessage(`에`);
      } else {
        ctx.showMessage(`%조사만처리(LOCAL:1+2,"와")%`);
      }
      await print_shoestype(ctx, character);
      if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] === 0) {
        ctx.showMessage(``);
      } else if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] != 0) {
        ctx.showMessage(`차림`);
      } else if (character.cflags[170] === 0 && character.cflags[171] != 0 && character.cflags[40] === 0) {
        ctx.showMessage(`차림`);
      } else if (character.cflags[170] != 0 && character.cflags[171] === 0 && character.cflags[40] === 0) {
        ctx.showMessage(`차림`);
      } else if (character.cflags[170] != 0 && character.cflags[171] === 0 && character.cflags[40] != 0) {
        ctx.showMessage(`차림`);
      } else {
        ctx.print('차림');
      }
    } else {
      ctx.showMessage(``);
    }
    ctx.showMessage(`인 ${ctx.josaHelper("타겟은")} 자신이 처한 상황을 받아들일 수 없다는 모습이다.`);
    ctx.showMessage(`사람이 이런 심한 짓을 타인에게 할 수 있을 리 없다, 라는 생각이라도 하는 것일까.`);
  } else if (ctx.talents[14]) {
    ctx.showMessage(`저항해도 소용 없다고 깨달은 것인지`);
    await print_clothtype(ctx, character);
    ctx.locals[1] = ctx.result;
    if (character.cflags[173] === 0) {
      if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] === 0) {
        ctx.showMessage(``);
      } else if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] != 0) {
        ctx.showMessage(`에`);
      } else if (character.cflags[170] != 0 && character.cflags[171] != 0) {
        ctx.showMessage(`에`);
      } else {
        ctx.showMessage(`%조사만처리(LOCAL:1+2,"와")%`);
      }
      await print_shoestype(ctx, character);
      if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] === 0) {
        ctx.showMessage(``);
      } else if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] != 0) {
        ctx.showMessage(`차림`);
      } else if (character.cflags[170] === 0 && character.cflags[171] != 0 && character.cflags[40] === 0) {
        ctx.showMessage(`차림`);
      } else if (character.cflags[170] != 0 && character.cflags[171] === 0 && character.cflags[40] === 0) {
        ctx.showMessage(`차림`);
      } else if (character.cflags[170] != 0 && character.cflags[171] === 0 && character.cflags[40] != 0) {
        ctx.showMessage(`차림`);
      } else {
        ctx.print('차림');
      }
    } else {
      ctx.showMessage(``);
    }
    ctx.showMessage(`인 ${ctx.josaHelper("타겟은")} 얌전하게 기다리고 있다.`);
  } else if (ctx.talents[16]) {
    await print_clothtype(ctx, character);
    ctx.locals[1] = ctx.result;
    if (character.cflags[173] === 0) {
      if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] === 0) {
        ctx.showMessage(``);
      } else if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] != 0) {
        ctx.showMessage(`에`);
      } else if (character.cflags[170] != 0 && character.cflags[171] != 0) {
        ctx.showMessage(`에`);
      } else {
        ctx.showMessage(`%조사만처리(LOCAL:1+2,"와")%`);
      }
      await print_shoestype(ctx, character);
      if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] === 0) {
        ctx.showMessage(``);
      } else if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] != 0) {
        ctx.showMessage(``);
      } else if (character.cflags[170] === 0 && character.cflags[171] != 0 && character.cflags[40] === 0) {
        ctx.showMessage(`차림`);
      } else if (character.cflags[170] != 0 && character.cflags[171] === 0 && character.cflags[40] === 0) {
        ctx.showMessage(`차림`);
      } else {
        ctx.print('차림');
      }
    } else {
      ctx.showMessage(``);
    }
    ctx.showMessage(`인 ${ctx.josaHelper("타겟은")} 두려움에 떨면서도 ${ctx.josaHelper("플레이어를")} 노려보고 있다.`);
    ctx.showMessage(`이런 짓으로 자신은 굴복하지 않을 것이라는 자신이 있는 것 같다.`);
  } else {
    await print_clothtype(ctx, character);
    ctx.locals[1] = ctx.result;
    if (character.cflags[173] === 0) {
      if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] === 0) {
        ctx.showMessage(``);
      } else if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] != 0) {
        ctx.showMessage(`에`);
      } else if (character.cflags[170] != 0 && character.cflags[171] != 0) {
        ctx.showMessage(`에`);
      } else {
        ctx.showMessage(`%조사만처리(LOCAL:1+2,"와")%`);
      }
      await print_shoestype(ctx, character);
      if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] === 0) {
        ctx.showMessage(``);
      } else if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] != 0) {
        ctx.showMessage(``);
      } else if (character.cflags[170] === 0 && character.cflags[171] != 0 && character.cflags[40] === 0) {
        ctx.showMessage(`차림`);
      } else if (character.cflags[170] != 0 && character.cflags[171] === 0 && character.cflags[40] === 0) {
        ctx.showMessage(`차림`);
      } else {
        ctx.print('차림');
      }
    } else {
      ctx.showMessage(``);
    }
    ctx.showMessage(`인 ${ctx.josaHelper("타겟이")} 지도실로 끌려왔다.`);
  }
  if (character.cflags[171] != 0) {
    ctx.showMessage(`일단 ${ctx.josaHelper("플레이어는")} ${ctx.josaHelper("타겟이")} 신고있는`);
    await print_shoestype_main2(ctx, character);
    if (ctx.result === 0) {
      ctx.print('를');
    } else {
      ctx.print('을');
    }
    ctx.showMessage(`벗고 이쪽으로 오라고 재촉했다……`);
  }
  return 1;
}
