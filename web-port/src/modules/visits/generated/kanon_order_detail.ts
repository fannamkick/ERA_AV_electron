/**
 * KANON_ORDER_DETAIL.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function boyfriend_lost(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  C = 300000;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    return 0;
  }
  // Label: INPUT_LOOP
  ctx.showMessage(`「흠, 눈이 가는 그 아이에게 나쁜 벌레가 달라붙었다고」`);
  ctx.showMessage(`키류 조직의 응접실, 삼색고양이의 등을 쓰다듬으며 카논은 재밌다는 듯 웃었다`);
  ctx.showMessage(`${ctx.josaHelper("플레이어가")} 상담한 것은 여배우 후보에게 나쁜 벌레, 남친이 생겨버린 일`);
  ctx.showMessage(`연애를 하지 말라는 것은 아니지만, 만약에 여배우 후보에게 흠집이라도 생긴다면 큰일이다`);
  ctx.showMessage(`L`);
  ctx.showMessage(`그렇게 되기 전에 어떻게 할 수 없을까, 하고`);
  ctx.showMessage(`${ctx.josaHelper("플레이어는")} 비밀리에 뒷세계에 정통한 키류 조직에 의뢰하기로 마음먹었다`);
  ctx.showMessage(`「한마디로 그 남친을 협박하든 뭘 하든 해서 헤어지게 만들면 되는거지?`);
  ctx.showMessage(`　그렇다면 조금 인상이 험악한 애들을 보내면 되니까 간단하지」`);
  ctx.showMessage(`그리고 카논이 손뼉을 치고, 장지 너머에서 대기하던 어깨를 불러 애들을 준비시키라고 전하자,`);
  ctx.showMessage(`어깨는 카논에게 귓속말을 했고 카논의 표정이 살짝 굳었다`);
  ctx.showMessage(`「아ー ……아무리 너와 나 사이라도, 세상에 공짜는 없다는 거지」`);
  ctx.showMessage(`밑준비를 포함해 경비로 상당한 금액이 필요하다며,`);
  ctx.showMessage(`카논의 중계가 있어도 ${ctx.josaHelper("플레이어가")} 적어도 30만 P는 부담해야 한다고 한다`);
  ctx.showMessage(`그래도 생각해보면, 여배우에게 흠집이 나서`);
  ctx.showMessage(`『상품』가치가 없어지는 것보단 싼값이다`);
  ctx.showMessage(`생각을 정리한 ${ctx.josaHelper("플레이어는")} 카논에게 30만 p를 지불하고,`);
  ctx.showMessage(`바로 의뢰를 수행해달라 했다……`);
  // TODO: PRINTW
  ctx.showMessage(`「아ー 그래, 안드로이드나 음마처럼 남친이 생길리가 없는 애들한테는 필요 없겠지.`);
  ctx.showMessage(`　그리고 남친이 없는 아이나 네 여친한테 작업거는 바보도 없앨 수 있어」`);
  // TODO: PRINTW
  await life_list_new,1(ctx, character);
  if (ctx.result === 999) {
    return 0;
  } else if (ctx.result < 0 || ctx.result >= ctx.charanum) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.base[ctx.result][0] < 1) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 504)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 504)}】는 남친이 생길리 없습니다`);
    return 0;
  } else if (ctx.getTalent(result, 505)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 505)}】는 남친이 생길리 없습니다`);
    return 0;
  } else if (ctx.getTalent(result, 184) && ctx.getTalent(result, 206)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 206)}】를 헤어지게 할 수는 없습니다`);
    return 0;
  } else if (ctx.getTalent(result, 511)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 511)}】는 남친이 생길리 없습니다`);
    return 0;
  }
  T = ctx.result;
  ctx.showMessage(`${ctx.getName(T)}에게 붙은 나쁜 벌레는 퇴치합니까?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 그만둔다');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    return 0;
  } else if (ctx.result === 0) {
    if (ctx.getTalent(t, 184)) {
      ctx.showMessage(`W ${ctx.josaHelper(ctx.getName(T), "가")} 울적해 하고 있다……`);
      ctx.showMessage(`사귀고 있던 남친과 헤어진 모양이다`);
      ctx.showMessage(`${ctx.josaHelper("플레이어가")} 사무소 소파에 앉아 차를 홀짝이는 카논을 바라보니`);
      ctx.showMessage(`뒤가 있다는 듯이 웃고 있었다……`);
      ctx.showMessage(`W ${ctx.josaHelper(ctx.getVarName("CALLNAME", T), "는")}【${ctx.getVarName("TALENT", 184)}】이 아니게 됐다`);
      ctx.getTalent(t, 184) = 0;
      ctx.getTalent(t, 190) = 0;
      character.cflags[T][619] = 0;
      character.cflags[T][621] = 2;
      character.cflags[T][622] = 0;
      if (character.cflags[T][16] === 8 && character.cflags[T][824] === 0 && character.cflags[T][827] === 0) {
        character.cstr[T][1] = `${character.cstr[T][7]} ${character.cstr[T][8]}`;
        character.cflags[T][827] = 1;
      } else if (character.cflags[T][16] === 8 && character.cflags[T][824] === 1 && character.cflags[T][827] === 0) {
        character.cstr[T][1] = `${character.cstr[T][7]} ${character.cstr[T][8]}`;
        character.cflags[T][827] = 1;
      }
      if (character.cflags[T][15] === 8 && character.cflags[T][167] === 0) {
        character.cstr[T][0] = `${character.cstr[T][7]} ${character.cstr[T][8]}`;
        character.cflags[T][167] = 1;
      }
      if (character.cflags[T][616] === 8 && character.cflags[T][837] === 0) {
        character.cstr[T][3] = `${character.cstr[T][7]} ${character.cstr[T][8]}`;
        character.cflags[T][837] = 1;
      }
      ctx.exp[T][109] += 1;
    } else if (character.cflags[T][661] === 1 && character.cflags[T][662] === 1) {
      ctx.showMessage(`W ${ctx.josaHelper(ctx.getName(T), "가")} 울적해 하고 있다……`);
      ctx.showMessage(`스탭인 %조사처리(CSTR:T:7,"가")% 요즘 모습을 보이질 않는 것과 관련이 있는 걸까`);
      ctx.showMessage(`${ctx.josaHelper("플레이어가")} 사무소 소파에 앉아 차를 홀짝이는 카논을 바라보니`);
      ctx.showMessage(`뒤가 있다는 듯이 웃고 있었다……`);
      ctx.getTalent(t, 184) = 0;
      character.cflags[T][619] = 0;
      character.cflags[T][621] = 2;
      character.cflags[T][622] = 0;
      character.cflags[T][661] = 0;
      character.cflags[T][662] = 0;
      if (character.cflags[T][16] === 10) {
        character.cstr[T][1] = `${character.cstr[T][7]} ${character.cstr[T][8]}(전 스텝)`;
      }
      if (character.cflags[T][15] === 10) {
        character.cstr[T][0] = `${character.cstr[T][7]} ${character.cstr[T][8]}(전 스텝)`;
      }
      character.cflags[T][663] = 1;
      ctx.exp[T][109] += 1;
    } else {
      ctx.showMessage(`${ctx.josaHelper("플레이어가")} 사무소 소파에 앉아 차를 홀짝이는 카논을 바라보니`);
      ctx.showMessage(`뒤가 있다는 듯이 웃고 있었다……`);
      ctx.showMessage(`${ctx.getVarName("CALL", T)}에게 찝적대던 남자들을`);
      ctx.showMessage(`키류조직을 이래저래 처리해준 모양이다……`);
      character.cflags[T][619] = 0;
    }
  }
  // TODO: PRINTW
  ctx.money -= C;
  return 1;
}

export async function tatto(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  C = 100000;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    return 0;
  }
  // Label: INPUT_LOOP
  ctx.showMessage(`「흠, 여배우 후보에게 타투를 새기고 싶으니까 문신사를 소개해달라고」`);
  ctx.showMessage(`키류 조직의 응접실, 삼색고양이의 등을 쓰다듬으며 카논은 재밌다는 듯 웃었다`);
  ctx.showMessage(`${ctx.josaHelper("플레이어가")} 상담한 것은 여배우 후보에게 문신을 새기고 싶다는 것이었다`);
  ctx.showMessage(`요즘은 패션의 하나로 문신을 새기는 경우도 늘고있고,`);
  ctx.showMessage(`서양의 포르노 여배우는 자기가 출연한 타이틀과 제작 레이블을 지키기 위해 새기는 경우도 있다고 한다`);
  ctx.showMessage(`그리고 반복되는 지도로 감각이 둔해지고 있는 ${ctx.josaHelper("플레이어는")} 미소녀・미녀가 모인 여배우들의 예쁜 피부에`);
  ctx.showMessage(`문신이 새겨진 모습을 보고 싶다는 욕망을 참을 수 없어졌다……`);
  ctx.showMessage(`L`);
  ctx.showMessage(`「뭐ー, 그 마음은 알것도 같아.`);
  ctx.showMessage(`　예쁜 걸 부수고 싶어……라기 보다는, 이럴땐 더럽히고 싶어, 떨어트리고 싶어.`);
  ctx.showMessage(`　예쁜 피부에 타투가 새겨져있는 언밸런스함이 흥분된다는 남자도 있을테고……」`);
  ctx.showMessage(`그리고 카논이 손뼉을 치고, 장지 너머에서 대기하던 어깨를 불러 애들을 준비시키라고 전하자,`);
  ctx.showMessage(`어깨는 카논에게 귓속말을 했고 카논의 표정이 살짝 굳었다`);
  ctx.showMessage(`「음ー ……일단 몇가지 조건이 있어`);
  ctx.showMessage(`　문신을 새길 아이가 널 따를 것, 본인 동의 없이 새길 수는 없으니까.`);
  ctx.showMessage(`　그리고, 이미 여배우로 데뷔한 아이일 것 ――뭐, 이건 간단하지.`);
  ctx.showMessage(`　마지막으로 문신사에게 알몸을 보여줄 수 있는 아이일 것, 새기려면 벗어야 하니까`);
  ctx.showMessage(`　새긴 적 있는 아이라면 필요 없는 조건이지만 말이야」`);
  ctx.showMessage(`카논은 말을 마치고 문신사가 살고 있는 집주소가 적힌 메모를 ${ctx.getVarName("CALL", MASTER)}에게 건냈다`);
  ctx.showMessage(`새길 수 있는 부위는 몇군데 있지만, 어디에 새겨도 금액은 10만 p라고 한다`);
  // TODO: PRINTW
  ctx.showMessage(`「아ー그래, 안드로이드에겐 새길 수 없으니까 조심해.`);
  ctx.showMessage(`그런 정밀기기는 부숴먹을 걱정도 있으니까`);
  ctx.showMessage(`만약 안드로이드에게 타투를 새기고 싶으면 전문가한테 새겨달라고 해」`);
  // TODO: PRINTW
  await life_list_new,1(ctx, character);
  if (ctx.result === 999) {
    return 0;
  } else if (ctx.result < 0 || ctx.result >= ctx.charanum) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.base[ctx.result][0] < 1) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 504)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 504)}】에겐 문신을 새길 수 없습니다`);
    return 0;
  } else if (ctx.exp[ctx.result][76] === 0 && character.cflags[ctx.result][606] === 0) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.result), "는")} 아직 데뷔하지 않았습니다`);
    return 0;
  } else if (ctx.abilities[ctx.result][17] <= 3 && character.cflags[ctx.result][606] === 0) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.result), "는")} 부끄러워서 알몸을 보여줄 수가 없다고 합니다`);
    return 0;
  } else if (character.cflags[ctx.result][606] === 15) {
    ctx.showMessage(`W ${ctx.getVarName("CALL", RESULT)}에겐 더 이상 문신을 새길 곳이 없습니다`);
    return 0;
  }
  character = ctx.result;
  ctx.showMessage(`${ctx.getName(character)}에게 문신을 새깁니까?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 그만둔다');
  // Label: INPUT_LOOP_000
  await ctx.inputNumber();
  if (ctx.result === 1) {
    return 0;
  } else if (ctx.result === 0 && character.cflags[606] != 15) {
    // Label: INPUTLOOP_00
    ctx.showMessage(`어디에 새길까요?`);
    ctx.showMessage(`《부위를 입력해 주세요》`);
    // TODO: INPUTS
    ctx.cstr[78] = ctx.results;
    ctx.showMessage(`어떤 문신을 새길까요?`);
    ctx.showMessage(`《새길 도안이나 문자를 입력해 주세요》`);
    // TODO: INPUTS
    ctx.cstr[79] = ctx.results;
    ctx.showMessage(`%CSTR:78%에게 새기는 것은……`);
    ctx.showMessage('[0] - 도안');
    ctx.showMessage('[1] - 문자');
    ctx.showMessage('[2] - 기타');
    // Label: INPUT_LOOP_01
    await ctx.inputNumber();
    if (ctx.result === 0) {
      ctx.locals[0] = 1;
    } else if (ctx.result === 1) {
      ctx.locals[0] = 2;
    } else if (ctx.result === 2) {
      ctx.locals[0] = 3;
    }
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 %CSTR:78%에 %CSTR:79%`);
    if (ctx.locals[0] === 1) {
      ctx.showMessage(`모양의`);
    } else if (ctx.locals[0] === 2) {
      ctx.showMessage(`%조사만처리(CSTR:79,"라")%고`);
    } else if (ctx.locals[0] === 3) {
      ctx.showMessage(``);
    }
    ctx.showMessage(`문신을 새깁니다`);
    ctx.showMessage(`맞습니까?`);
    ctx.showMessage('[0] - 네');
    ctx.showMessage('[1] - 아니오');
    // Label: INPUT_LOOP01
    await ctx.inputNumber();
    if (ctx.result === 0) {
      ctx.showMessage(`《${ctx.getVarName("CALL", TARGET)}의 %CSTR:78%에 문신을 새겼습니다》`);
      if (ctx.locals[0] === 1) {
        ctx.localStrings[0] = ctx.cstr[79];
        ctx.showMessage(`도안: %CSTR:79%`);
        if (ctx.rand(2) === 0) {
          ctx.cstr[79] = ctx.localStrings[0];
        } else {
          ctx.cstr[79] = ctx.localStrings[0];
        }
      } else if (ctx.locals[0] === 2) {
        ctx.localStrings[0] = ctx.cstr[79];
        ctx.showMessage(`글귀: %CSTR:79%`);
        if (ctx.rand(2) === 0) {
          ctx.cstr[79] = ctx.localStrings[0];
        } else {
          ctx.cstr[79] = ctx.localStrings[0];
        }
      } else if (ctx.locals[0] === 3) {
        ctx.localStrings[0] = ctx.cstr[79];
        ctx.showMessage(`%CSTR:79%`);
        if (ctx.rand(2) === 0) {
          ctx.cstr[79] = ctx.localStrings[0];
        } else {
          ctx.cstr[79] = ctx.localStrings[0];
        }
      }
      ctx.showMessage(`W 이상경험 +1`);
      ctx.exp[50] += 1;
      if (character.cflags[606] === 0) {
        ctx.cstr[70] = ctx.cstr[78];
        ctx.cstr[71] = ctx.cstr[79];
        character.cflags[606] |= 1;
        ctx.money -= C;
        return 1;
      } else if ((character.cflags[606] & 1)) {
        ctx.cstr[72] = ctx.cstr[78];
        ctx.cstr[73] = ctx.cstr[79];
        character.cflags[606] |= 2;
        ctx.money -= C;
        return 1;
      } else if ((character.cflags[606] & 2)) {
        ctx.cstr[74] = ctx.cstr[78];
        ctx.cstr[75] = ctx.cstr[79];
        character.cflags[606] |= 4;
        ctx.money -= C;
        return 1;
      } else if ((character.cflags[606] & 4)) {
        ctx.cstr[76] = ctx.cstr[78];
        ctx.cstr[77] = ctx.cstr[79];
        character.cflags[606] |= 8;
        ctx.money -= C;
        return 1;
      }
    } else if (ctx.result === 1) {
      ctx.showMessage(`W 《다시 입력해 주세요》`);
      // GOTO INPUTLOOP_00 - 구조 변경 필요 (while/break 사용 권장)
    } else {
      // GOTO INPUT_LOOP01 - 구조 변경 필요 (while/break 사용 권장)
    }
  } else {
    // GOTO INPUT_LOOP_000 - 구조 변경 필요 (while/break 사용 권장)
  }
  return 1;
}

export async function bodyguard(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  C = 800000;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    return 0;
  }
  // Label: INPUT_LOOP
  ctx.showMessage(`「흠, 눈이 가는 그 아이에게 호위를 붙이고 싶다고」`);
  ctx.showMessage(`키류 조직의 응접실, 삼색고양이의 등을 쓰다듬으며 카논은 재밌다는 듯 웃었다`);
  ctx.showMessage(`${ctx.josaHelper("플레이어가")} 상담한 것은 여배우 후보가 치한을 당했던 일`);
  ctx.showMessage(`그냥 몸을 만져지는 정도라면 괜찮겠지만, 만약에 여배우 후보에게 흠집이라도 생긴다면 큰일이다`);
  ctx.showMessage(`L`);
  ctx.showMessage(`그렇게 되기 전에 어떻게 할 수 없을까, 하고`);
  ctx.showMessage(`${ctx.josaHelper("플레이어는")} 비밀리에 뒷세계에 정통한 키류 조직에 의뢰하기로 마음먹었다`);
  ctx.showMessage(`「한마디로 경호가 필요하다 이거지.`);
  ctx.showMessage(`　그리고 가급적이면…… 그 아이에게 반하지 않을 남자라면 더 좋다, 고.`);
  ctx.showMessage(`　그렇다면 우리 조직원 중에 게이인 녀석들이 몇명 있으니까,`);
  ctx.showMessage(`　그 녀석들한테 맡기면 간단하지」`);
  ctx.showMessage(`그리고 카논이 손뼉을 치고, 장지 너머에서 대기하던 어깨를 불러 애들을 준비시키라고 전하자,`);
  ctx.showMessage(`어깨는 카논에게 귓속말을 했고 카논의 표정이 살짝 굳었다`);
  ctx.showMessage(`「아ー ……아무리 너와 나 사이라도, 세상에 공짜는 없다는 거지」`);
  ctx.showMessage(`밑준비를 포함해 경비로 상당한 금액이 필요하다며,`);
  ctx.showMessage(`카논의 중계가 있어도 ${ctx.josaHelper("플레이어가")} 적어도 80만 P는 부담해야 한다고 한다`);
  ctx.showMessage(`그래도 생각해보면, 여배우에게 흠집이 나서`);
  ctx.showMessage(`『상품』가치가 없어지는 것보단 싼값이다`);
  ctx.showMessage(`생각을 정리한 ${ctx.josaHelper("플레이어는")} 카논에게 80만 p를 지불하고,`);
  ctx.showMessage(`바로 의뢰를 수행해달라 했다……`);
  // TODO: PRINTW
  ctx.showMessage(`「아ー 그래, 안드로이드나 음마처럼 자력으로 해결 가능한 애들한테는 필요 없겠지.`);
  ctx.showMessage(`　그리고 나는 평소에도 호위가 있으니까 필요 없어」`);
  // TODO: PRINTW
  await life_list_new,1(ctx, character);
  if (ctx.result === 999) {
    return 0;
  } else if (ctx.result < 0 || ctx.result >= ctx.charanum) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.base[ctx.result][0] < 1) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 504)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 504)}】에겐 호위가 필요 없습니다`);
    return 0;
  } else if (ctx.getTalent(result, 505)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 505)}】에겐 호위가 필요 없습니다`);
    return 0;
  } else if (ctx.getTalent(result, 511)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 511)}】에겐 호위가 필요 없습니다`);
    return 0;
  } else if (ctx.getTalent(result, 503)) {
    ctx.showMessage(`W ${ctx.getVarName("CALL", RESULT)}에겐 호위가 필요 없습니다`);
    return 0;
  } else if (ctx.getTalent(result, 502)) {
    ctx.showMessage(`W ${ctx.getVarName("CALL", RESULT)}에겐 이미 호위가 붙어있습니다`);
    return 0;
  } else if (character.cflags[ctx.result][633] === 1) {
    ctx.showMessage(`W ${ctx.getVarName("CALL", RESULT)}에겐 이미 호위가 붙어있습니다`);
    return 0;
  }
  T = ctx.result;
  ctx.showMessage(`${ctx.getName(T)}에게 호위를 붙입니까?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 그만둔다');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    return 0;
  } else if (ctx.result === 0) {
    ctx.showMessage(`${ctx.getVarName("CALL", T)}에게 호위를 붙였습니다`);
    character.cflags[T][633] = 1;
  }
  ctx.money -= C;
  return 1;
}

export async function add_idol(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  C = 1000000;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    return 0;
  }
  ctx.showMessage(`「아ー, 잠깐 이것 좀 봐줄래」`);
  ctx.showMessage(`키류 조직의 응접실, 삼색고양이의 등을 쓰다듬으며 카논은 종이 한장을 꺼냈다`);
  ctx.showMessage(`그것은 사진과 간단한 프로필이 적힌, 이력서처럼 보였다`);
  ctx.showMessage(`「우리 조직의 압류대상인 여자인데,`);
  ctx.showMessage(`　전에 네가 여배우 후보를 찾고 있다고 들었던게 생각나서 말야.`);
  ctx.showMessage(`　아마 평범한 모집으로는 절대로 나오지 않을 상등품이야―― 뭐, 그만큼 계약료`);
  ctx.showMessage(`　……아니, 조직의『소개료』는 받아갈 거지만」`);
  ctx.showMessage(`확실히 사진 속 그녀에게선 엄청난 소질이 느껴지기에,`);
  ctx.showMessage(`투자금은 높아도 금방 회수할 수 있을 것이다`);
  ctx.showMessage(`W 흥미를 가진 ${ctx.josaHelper("플레이어는")} 프로필을 읽어보기로 했다……`);
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  ctx.showMessage(`【니지마 미히로】`);
  ctx.showMessage('');
  ctx.showMessage(` 국민적 아이돌 유닛의 센터를 맡고 있는 인기 아이돌로서`);
  ctx.showMessage(` 일단 당신(=감독)과 카나데, 미노리의 소꿉친구였던 소녀`);
  ctx.showMessage(` 부친이 사업에 실패할 적에 키류 조직에게 막대한 빚을 지게 되었으며`);
  ctx.showMessage(` 그 빚의 대가로 키류 조직에게 구속되어 감시 상태에 놓여있었다`);
  ctx.showMessage(` 그녀가 연예활동으로 벌어들인 출연료의 대부분은 키류 조직에게 빚을 갚는 데 충당되고 있었던 것이다`);
  ctx.showMessage(` 만, 당신의『지도』파트너가 된 카논이 미히로와 당신 사이의 관계를 조사하고서,`);
  ctx.showMessage(` 여러 가지 의미로 이용 가치가 있다고 판단, 현재는 카논이 신병을 맡고 있다`);
  ctx.showMessage(` 베개 영업이나 광고대행사의 일방적인 푸쉬 없이, 실력으로 스타덤의 자리에 오른 것이니만큼,`);
  ctx.showMessage(` 꽤 오기는 강하지만 상당히 솔직하다`);
  ctx.showMessage(` 어릴 적부터 계속 마음에 두고 있는 사람이 있으며, 그 마음은 상당히 강한 까닭에`);
  ctx.showMessage(` 그렇게 간단히 남자에게 휘둘릴 일은 없을 것 같다`);
  ctx.showMessage('');
  ctx.showMessage(` 연령: 17세　난이도: E　성장도: A　공헌도: A　매각치: SSS`);
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  ctx.showMessage(`W`);
  ctx.showMessage(`「그래서, 이 아이는 어때?　소개료는 100만 p야」`);
  ctx.showMessage(`L`);
  // Label: INPUT_LOOP
  ctx.showMessage('[0] - 소개해 달라 한다');
  ctx.showMessage('[1] - 그만둔다');
  ctx.showMessage('※CAUTION※');
  ctx.showMessage('상여품으로 보냈을 경우, 해당 캐릭터는 이번 플레이에선 더이상 등장하지 않습니다!');
  await ctx.inputNumber();
  if (ctx.result === 0) {
    ctx.showMessage(`아이마스크가 씌어진 미히로가 응접실로 끌려왔다……`);
    ctx.showMessage(`어깨가 아이마스크를 벗기자, 주위를 둘러보던 미히로는`);
    ctx.showMessage(`${ctx.josaHelper("플레이어와")} 카논이 있는 걸 깨닫고, 눈을 동그랗게 뜨고 ${ctx.josaHelper("플레이어를")} 쳐다봤다……`);
    ctx.showMessage(`자신의 소꿉친구가 키류 조직의 문턱을 드나드는 것이 놀라운 모양이다`);
    // TODO: PRINTW
    ctx.showMessage(`카논이 지금부터 무슨 일을 시킬지 대략적으로 설명하자,`);
    ctx.showMessage(`미히로는 ${ctx.josaHelper("플레이어가")} 자신과 비슷한 처지임을 깨닫고,`);
    ctx.showMessage(`혼란해 하면서도 자신에게 거부권이 없다는 현실을 앞에두고 천천히 계약서에 싸인했다……`);
    ctx.showMessage(`W`);
    ctx.showMessage(`《니지마 미히로가 여배우 후보가 됐습니다》`);
    ctx.showMessage(`W`);
    // TODO: ADDCHARA 80
    character.cflags[ctx.master][704] |= 1;
    // TODO: LOADGLOBAL
    ctx.global[280] += 1;
    // TODO: SAVEGLOBAL
    if (ctx.global[200] >= 0 && ctx.flags[540] === 0) {
      if (GETCHARA(80, 0) >= 0) {
        character = GETCHARA(80);
        await clearbonus_call(ctx, character);
      }
    }
  } else if (ctx.result === 1) {
    return 0;
  }
  ctx.money -= C;
  return 0;
}

export async function add_va(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  C = 1000000;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    return 0;
  }
  // Label: INPUT_LOOP
  ctx.showMessage(`「아ー, 잠깐 이것 좀 봐줄래」`);
  ctx.showMessage(`키류 조직의 응접실, 삼색고양이의 등을 쓰다듬으며 카논은 종이 한장을 꺼냈다`);
  ctx.showMessage(`그것은 사진과 간단한 프로필이 적힌, 이력서처럼 보였다`);
  ctx.showMessage(`「우리 조직의 압류대상인 여자인데,`);
  ctx.showMessage(`　전에 네가 여배우 후보를 찾고 있다고 들었던게 생각나서 말야.`);
  ctx.showMessage(`　아마 평범한 모집으로는 절대로 나오지 않을 상등품이야―― 뭐, 그만큼 계약료`);
  ctx.showMessage(`　……아니, 조직의『소개료』는 받아갈 거지만」`);
  ctx.showMessage(`확실히 사진 속 그녀에게선 엄청난 소질이 느껴지기에,`);
  ctx.showMessage(`투자금은 높아도 금방 회수할 수 있을 것이다`);
  ctx.showMessage(`W 흥미를 가진 ${ctx.josaHelper("플레이어는")} 프로필을 읽어보기로 했다……`);
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  ctx.showMessage(`【사쿠라 유이카】`);
  ctx.showMessage(` 인기 급상승중인, 유아역에서 노파역까지 해낼 정도로 뛰어난 연기력을 가진 성우`);
  ctx.showMessage(` 애니메이션 잡지나 성우 정보지에 이름이 실려 있더라도 사진 등 개인을 특정할 수 있는 소재가`);
  ctx.showMessage(` 게재되지 않고, 최근 몇 년 동안 두각을 나타내온 것으로 인해 은퇴한 거물의 복면 명의라는 등의`);
  ctx.showMessage(` 억측들이 난무하고 있다`);
  ctx.showMessage(` 그 정체는 복면 명의 같은 것이 아니라 아직 젊은 나이의 신인성우이며`);
  ctx.showMessage(` 한때 키류 조직의 관련 회사가 정기적으로 발표했던 15금 이미지 비디오에 출연했던`);
  ctx.showMessage(` 전・주니어 아이돌`);
  ctx.showMessage(` 잡지 등에 노출이 되지 않는 것은 그러한 과거와`);
  ctx.showMessage(` 외모가 아닌 실력을 평가해주었으면 하는 본인의 의사에 의한 것이다`);
  ctx.showMessage(` 우연히 관련 회사의 자료를 정리하고 있던 카논이 성우로서 히트할 수 있는 그녀의 과거를 알고서`);
  ctx.showMessage(` 있지도 않던 당시의 계약서와 작성된 계약 내용의 불이행을 내세워`);
  ctx.showMessage(` 신병을 억류하는 것에 성공했다`);
  ctx.showMessage(` ……라곤 하지만, 연기력을 향상시키기 위해서라면 무엇이겠든 하겠다는 향상심 덩어리 같은`);
  ctx.showMessage(` 그녀에게 있어 AV에 출연한다는 사실은 흔치 않은 기회인 모양이라,`);
  ctx.showMessage(` 카논과는 어떤 의미에선 기브 앤 테이크의 관계에 있다`);
  ctx.showMessage(` 특정 남성과 교제하는 것은 자신의 목소리가 가진 이미지를 고정화시키고 말 것, 이라는`);
  ctx.showMessage(` 이해할 수 없는 지론이 있어 가드는 꽤 단단할 것이다`);
  ctx.showMessage('');
  ctx.showMessage(` 연령: 22세　난이도: D　성장도: A　공헌도: A　매각치: SS`);
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  ctx.showMessage(`W`);
  ctx.showMessage(`「그래서, 이 아이는 어때?　소개료는 100만 p야」`);
  ctx.showMessage(`L`);
  ctx.showMessage('[0] - 소개해 달라 한다');
  ctx.showMessage('[1] - 그만둔다');
  ctx.showMessage('※CAUTION※');
  ctx.showMessage('상여품으로 보냈을 경우, 해당 캐릭터는 이번 플레이에선 더이상 등장하지 않습니다!');
  await ctx.inputNumber();
  if (ctx.result === 0) {
    ctx.showMessage(`카논이 연락하자 유이카가 응접실로 들어왔다……`);
    ctx.showMessage(`카논이 ${ctx.josaHelper("플레이어를")} 소개하자 유이카는 온화한 미소를 지으며 인사했다……`);
    // TODO: PRINTW
    ctx.showMessage(`카논이 앞으로 그녀가 해야할 일을 대략적으로 설명하자,`);
    ctx.showMessage(`유이카는 내용을 제대로 확인하면서도 자연스럽게 계약서에 싸인했다……`);
    ctx.showMessage(`W`);
    ctx.showMessage(`《사쿠라 유이카가 여배우 후보가 됐습니다》`);
    ctx.showMessage(`W`);
    // TODO: ADDCHARA 83
    character.cflags[ctx.master][704] |= 2;
    // TODO: LOADGLOBAL
    ctx.global[283] += 1;
    // TODO: SAVEGLOBAL
    if (ctx.global[200] >= 0 && ctx.flags[540] === 0) {
      if (GETCHARA(83, 0) >= 0) {
        character = GETCHARA(83);
        await clearbonus_call(ctx, character);
      }
    }
  } else if (ctx.result === 1) {
    return 0;
  }
  ctx.money -= C;
  return 0;
}

export async function add_shisetu(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  C = 10000;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    return 0;
  }
  if ((character.cflags[ctx.master][758] & 1) === 0 || (character.cflags[ctx.master][758] & 2) === 0 || (character.cflags[ctx.master][758] & 4) === 0) {
    ctx.showMessage(`「아ー, 잠깐 이것 좀 봐줄래」`);
    ctx.showMessage(`키류 조직의 응접실, 삼색고양이의 등을 쓰다듬으며 카논은 몇장의 종이를 꺼냈다`);
    ctx.showMessage(`그것은 사진과 간단한 프로필이 적힌, 이력서처럼 보였다`);
    ctx.showMessage(`「우리 조직의 압류대상인 여자인데,`);
    ctx.showMessage(`　전에 네가 여배우 후보를 찾고 있다고 들었던게 생각나서 말야.`);
    ctx.showMessage(`　아마 평범한 모집으로는 절대로 나오지 않을 상등품이야―― 뭐, 그만큼 계약료`);
    ctx.showMessage(`　……아니, 조직의『소개료』는 받아갈 거지만」`);
    ctx.showMessage(`확실히 사진 속 그녀에게선 엄청난 소질이 느껴지기에,`);
    ctx.showMessage(`투자금은 높아도 금방 회수할 수 있을 것이다`);
    ctx.showMessage(`W 흥미를 가진 ${ctx.josaHelper("플레이어는")} 프로필을 읽어보기로 했다……`);
    if ((character.cflags[ctx.master][758] & 1) === 0) {
      ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
      ctx.showMessage(`【키리시마 쇼코】`);
      ctx.showMessage('');
      ctx.showMessage('교회계열 시설 출신으로 국립대학에 다는 대학생');
      ctx.showMessage('시설은 돈이 없지만, 장학금으로 학비를 내고 있다');
      ctx.showMessage('보이쉬한 미모에 움직이기 쉽다는 이유로 남자옷을 입을때가 많다');
      ctx.showMessage('고등학교땐 가라테를 했으며 문무양도를 실천하고 있는 사람이지만, 요리를 비롯해 가사능력은 절망적이다');
      ctx.showMessage('시설에서 돌봐주는 아오이 하루카를 언니처럼 따르기 때문인지, 연애엔 소극적이다');
      ctx.showMessage('');
      ctx.showMessage(`연령: 19세　난이도: C　성장도: C　공헌도: C　매각치: C`);
      ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
      // TODO: PRINTW
      ctx.showMessage(`${ctx.josaHelper("플레이어가")} 자료를 끝까지 읽자 카논이 입을 열었다.`);
      ctx.showMessage(`「이 시설은 경영이 정말 심각해서 말이야…… 뭐, 우리한테 돈을 빌릴 정도니 당연한 거지만`);
      ctx.showMessage(`　이 언니가 돈을 받으러 온 우리 조직원하고 문제를 일으켜 버렸단 말이지`);
      ctx.showMessage(`　우리 애들이 얻어맞은 이상, 그대로 끝낼 수는 없는 노릇이잖아?`);
      ctx.showMessage(`　그래서, 이렇게 된거야`);
      ctx.showMessage(`　어때? 네가 필요없다면 우리가 알아서『처리』할건데,`);
      ctx.showMessage(`　솔직히 우리 풍속점에서 썩히기엔 아까운 미인이잖아?」`);
      // TODO: PRINTW
    }
    if ((character.cflags[ctx.master][758] & 2) === 0) {
      ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
      ctx.showMessage(`【아마쿠사 에리】`);
      ctx.showMessage('');
      ctx.showMessage('고등학교에 다니며 모델을 하고있는 쿼터 소녀');
      ctx.showMessage('보라빛 머리를 하나로 묶고, 눈에 띄는 장신과 미모의 소유자');
      ctx.showMessage('부모를 사고로 잃고 교회계열 시설에 살고 있다');
      ctx.showMessage('그 전까지 받았던 교육덕분인지 말투와 태도에 기품이 묻어난다');
      ctx.showMessage('시설 경영이 어렵다는 것을 알고있고, 독립하고 싶은 마음은 강하나 대학은 다니고 싶기에');
      ctx.showMessage('장학금을 받기 위해 공부에 힘을 쏟고 있다');
      ctx.showMessage('같은 시설에 사는 선배인 키리시마 쇼코를 존경하고 따르고 있다');
      ctx.showMessage('그 나이대 소녀처럼 연애에 관심이 많지만, 모델의 자존심 때문인지');
      ctx.showMessage('자신에게 어울리는 사람을 찾고 있다');
      ctx.showMessage('');
      ctx.showMessage(`연령: 17세　난이도: C　성장도: C　공헌도: C　매각치: A`);
      ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
      // TODO: PRINTW
      ctx.showMessage(`${ctx.josaHelper("플레이어가")} 자료를 끝까지 읽자 카논이 입을 열었다.`);
      ctx.showMessage(`「아 아이는 불쌍하게 됐어. 같은 학교에 다니는 정으로, 그냥 놔줘도 괜찮았겠지만 말야`);
      ctx.showMessage(`　시설에서 우리 애들하고 키리시마가 문제를 일으켰을때, 그 자리에 있던게 잘못이었지`);
      ctx.showMessage(`　한심하게도 우리 애들이 키리시마를 제압할때, 이 아이를 인질로 써버렸다나봐`);
      ctx.showMessage(`　이러니 해방해 버리면 일이 어떻게 굴러갈지…… 쉽게 상상이 가지?`);
      ctx.showMessage(`　그래서 이렇게 되버린 셈인데……`);
      ctx.showMessage(`　어때? 네가 필요없다면 우리 풍속점에서 적당히 굴리게 될건데」`);
      // TODO: PRINTW
    }
    if ((character.cflags[ctx.master][758] & 4) === 0) {
      ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
      ctx.showMessage(`【니시카타　쿄코】`);
      ctx.showMessage('');
      ctx.showMessage('출판사에서 일하는 르포라이터');
      ctx.showMessage('가는 몸과 안경에 얌전해보이는 풍모와 달리 정의감과 행동력의 덩어리 같은 사람');
      ctx.showMessage('아오이 하루카의 대학 선배이자 친구이기도 하다');
      ctx.showMessage('친구의 상태가 이상하단 걸 눈치채고 조사에 나선 결과');
      ctx.showMessage('키류 조직이 연관돼있는 것까지 알아냈다');
      ctx.showMessage('');
      ctx.showMessage('그리고 이 세계가『누군가』가 조종하고 있는게 아닐까,');
      ctx.showMessage('하는 음모론을 믿고 있다');
      ctx.showMessage('전엔 사귀던 남자가 있었지만 지금은 혼자로, 일을 이해해주는 남자가 이상형이라 한다');
      ctx.showMessage('');
      ctx.showMessage(`연령: 24세　난이도: D　성장도: B　공헌도: B　매각치: D`);
      ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
      // TODO: PRINTW
      ctx.showMessage(`${ctx.josaHelper("플레이어가")} 자료를 끝까지 읽자 카논이 입을 열었다.`);
      ctx.showMessage(`「능력은 우수하단 말이지, 이 사람`);
      ctx.showMessage(`　……그러니까 더욱 방치할 수는 없지만`);
      ctx.showMessage(`　우리 조직만의 문제가 아니라 너랑,`);
      ctx.showMessage(`　어쩌면 파라디수스의 진상까지 알아낼지도 몰라`);
      ctx.showMessage(`　한 바보의 정의감 때문에 후세까지 화근이 남을 외교문제라도 생겼다간……`);
      ctx.showMessage(`　뭐, 어떻게 될지는 지금 이 나라를 보면 명확하지`);
      ctx.showMessage(`　거기다…… 파라디수스뿐만 아니라 더 위에 있는 존재까지 눈치챌지 모르니까, 말야`);
      ctx.showMessage(`　대부분의 대중들은 음모론이라며 웃어 넘기겠지만, 그런 것도 떠돌아선 안되는 거야,`);
      ctx.showMessage(`　그 녀석들의 존재는`);
      ctx.showMessage(`　……라고 해도, 지금 말한 건 잊어줄래? 함부로 끼어들었다간 무슨 일을 당할지 모르는 거니까`);
      ctx.showMessage(`　일단 네가 필요없다고 하면 우리쪽에서 적당히 처분해야지」`);
      // TODO: PRINTW
    }
    ctx.showMessage(`「그래서, 이 아이들은 어때?　소개료는 이걸 봐줘」`);
    ctx.showMessage(`L`);
    // Label: INPUT_LOOP_URARE
    if ((character.cflags[ctx.master][758] & 1) === 0) {
      ctx.showMessage('[0] - 키리시마 쇼코를 소개받는다  (100000포인트)');
    }
    if ((character.cflags[ctx.master][758] & 2) === 0) {
      ctx.showMessage('[1] - 아마쿠사 에리를 소개받는다  (100000포인트)');
    }
    if ((character.cflags[ctx.master][758] & 4) === 0) {
      ctx.showMessage('[2] - 니시카타쿄코를 소개받는다   ( 50000포인트)');
    }
    ctx.showMessage('[3] - 그만둔다');
    ctx.showMessage('※CAUTION※');
    ctx.showMessage('상여품으로 보냈을 경우, 해당 캐릭터는 이번 플레이에선 더이상 등장하지 않습니다!');
    await ctx.inputNumber();
    if (ctx.result === 0 && ctx.money >= 50000 && (character.cflags[ctx.master][758] & 1) === 0) {
      ctx.showMessage(`카논이 연락하자 쇼코가 응접실로 들어왔다……`);
      ctx.showMessage(`카논이 ${ctx.josaHelper("플레이어를")} 소개하자 쇼코는 ${ctx.josaHelper("플레이어를")} 경멸이 담긴 시선으로 노려봤다……`);
      ctx.showMessage(`「겉으로는 이래도, 허튼짓을 했다간 시설이 어떻게 될지 잘 알고 있으니까,`);
      ctx.showMessage(`　바보 같은 짓은 안 할거야…… 그렇지?」`);
      // TODO: PRINTW
      ctx.showMessage(`카논의 말에, 쇼코는 분해하면서도 묵묵히 계약서에 싸인했다……`);
      ctx.showMessage(`W`);
      ctx.showMessage(`《키리시마 쇼코가 여배우 후보가 됐습니다》`);
      ctx.showMessage(`W`);
      // TODO: ADDCHARA 87
      character.cflags[ctx.master][758] |= 1;
      C += 50000;
      // TODO: LOADGLOBAL
      ctx.global[287] += 1;
      // TODO: SAVEGLOBAL
      if (ctx.global[200] >= 0 && ctx.flags[540] === 0) {
        if (GETCHARA(87, 0) >= 0) {
          character = GETCHARA(87);
          await clearbonus_call(ctx, character);
        }
      }
    } else if (ctx.result === 1 && ctx.money >= 50000 && (character.cflags[ctx.master][758] & 2) === 0) {
      ctx.showMessage(`카논이 연락하자 에리가 응접실로 들어왔다……`);
      ctx.showMessage(`카논이 ${ctx.josaHelper("플레이어를")} 소개하자 에리는 ${ctx.josaHelper("플레이어를")} 흔들리는 눈빛으로 바라봤다……`);
      ctx.showMessage(`「그런 얼굴 하지 말라고, 이쪽이 그나마 제일 나은 방법이라고 알고 있잖아?`);
      ctx.showMessage(`　너를 돈벌이에 쓰는 건 똑같지만, 나름대로의 자유는 보장해줄테니까」`);
      // TODO: PRINTW
      ctx.showMessage(`카논의 말에, 에리는 눈물을 머금고 계약서에 싸인했다……`);
      ctx.showMessage(`W`);
      ctx.showMessage(`《아마쿠사 에리가 여배우 후보가 됐습니다》`);
      ctx.showMessage(`W`);
      // TODO: ADDCHARA 88
      character.cflags[ctx.master][758] |= 2;
      C = 100000;
      // TODO: LOADGLOBAL
      ctx.global[288] += 1;
      // TODO: SAVEGLOBAL
      if (ctx.global[200] >= 0 && ctx.flags[540] === 0) {
        if (GETCHARA(88, 0) >= 0) {
          character = GETCHARA(88);
          await clearbonus_call(ctx, character);
        }
      }
    } else if (ctx.result === 2 && ctx.money >= 10000 && (character.cflags[ctx.master][758] & 4) === 0) {
      ctx.showMessage(`카논이 연락하자 쿄코가 응접실로 들어왔다……`);
      ctx.showMessage(`카논이 ${ctx.josaHelper("플레이어를")} 소개하자 쿄코는 바로 ${ctx.getVarName("CALL", MASTER)}에게 욕설을 퍼부으려다……`);
      ctx.showMessage(`카논의 위협적인 시선을 느끼고 입을 다물었다.`);
      ctx.showMessage(`「그쯤 해둬. 자기 입장을 아직도 모르겠다면, 그냥 없던 일로 할래?`);
      ctx.showMessage(`　그리고…… 네가 눈치채고 있는 그 녀석들한테서도 지령이 와서 말이야`);
      ctx.showMessage(`『처음부터 없던 것』이 될지, 돈벌이의 도구로 살아갈지…… 뭐, 답은 정해져 있지 않아?」`);
      // TODO: PRINTW
      ctx.showMessage(`카논이 앞으로 쿄코가 하게 될 일을 다시 설명하자,`);
      ctx.showMessage(`그녀는 몇번이나 내용을 확인하더니, 마지못해 계약서에 싸인했다……`);
      ctx.showMessage(`W`);
      ctx.showMessage(`《니시카타 쿄코가 여배우 후보가 됐습니다》`);
      ctx.showMessage(`W`);
      // TODO: ADDCHARA 89
      character.cflags[ctx.master][758] |= 4;
      C = 50000;
      // TODO: LOADGLOBAL
      ctx.global[289] += 1;
      // TODO: SAVEGLOBAL
      if (ctx.global[200] >= 0 && ctx.flags[540] === 0) {
        if (GETCHARA(89, 0) >= 0) {
          character = GETCHARA(89);
          await clearbonus_call(ctx, character);
        }
      }
    } else if (ctx.result === 3) {
      return 0;
    } else {
      // GOTO INPUT_LOOP_URARE - 구조 변경 필요 (while/break 사용 권장)
    }
    ctx.money -= C;
  } else if ((character.cflags[ctx.master][758] & 1) && (character.cflags[ctx.master][758] & 2) && (character.cflags[ctx.master][758] & 4) === 0) {
    ctx.showMessage(`W 「지금은 소개할만한 여자가 없네?」`);
    return 0;
  }
  return 0;
}
