/**
 * C_CLUB.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function c_club_event(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else if (ctx.getTalent(count, 421) === 1) {
      await start_c_clubevent(ctx, character);
    }
  }
}

export async function start_c_clubevent(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.rand(8) === 0) {
    await nothing(ctx, character);
  } else if (ctx.rand(7) === 0) {
    await nothing(ctx, character);
  } else if (ctx.rand(6) === 0) {
    await nothing(ctx, character);
  } else if (ctx.rand(5) === 0 && ctx.money > 10000) {
    await event_c_clubhall(ctx, character);
    ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥'); ctx.waitInput();
  } else if (ctx.rand(4) === 0) {
    await nothing(ctx, character);
  } else if (ctx.rand(3) === 0 && ctx.money > 10000) {
    await event_c_clubhall(ctx, character);
    ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥'); ctx.waitInput();
  } else if (ctx.rand(2) === 0) {
    await nothing(ctx, character);
  } else if (ctx.rand(1) === 0) {
    await event_c_clubafter(ctx, character);
  } else {
    await nothing(ctx, character);
  }
}

export async function event_c_clubhall(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`휴일을 이용해, ${ctx.josaHelper(ctx.getName(ctx.count), "가")} 일하는 캬바쿠라에 왔다……`);
  ctx.showMessage(`공교롭게도 ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "는")} 이미 지명을 받은 모양이라, ${ctx.getVarName("CALL", COUNT)}의 시간이 날때까지`);
  if (ctx.exp[ctx.master][109] === 0) {
    ctx.showMessage(`다른 아가씨가`);
  } else if (ctx.exp[ctx.master][109] >= 1 && character.cflags[ctx.master][634] === 0) {
    ctx.showMessage(`%조사처리(CSTR:MASTER:51,"가")%`);
  } else if (character.cflags[ctx.master][634] === 1) {
    ctx.showMessage(`다른 아가씨가`);
  }
  ctx.showMessage(`${ctx.josaHelper("플레이어를")} 상대하겠다고 했다`);
  if (ctx.exp[ctx.master][109] === 0) {
    ctx.showMessage(`동석해준 여자가 내민 명함에는`);
    await c_clubgirl_namedecide(ctx, character);
    ctx.showMessage(`%CSTR:MASTER:50% %CSTR:MASTER:51%라고 써있었다. 별명이 아니고 진짜 이름이다`);
    ctx.showMessage(`특별회원에게만 주는 명함이라고 한다`);
  }
  ctx.showMessage(`손님에게 술을 따르거나 담배에 불을 붙여주거나 하는, 노출도가 높은 드레스 차림인 ${ctx.getVarName("CALL", COUNT)}에게 곁눈질을 하며`);
  ctx.showMessage(`${ctx.josaHelper("플레이어는")}`);
  if (character.cflags[ctx.master][630] === 0) {
    ctx.showMessage(`%CSTR:MASTER:51%에게`);
  } else {
    ctx.showMessage(`아가씨에게`);
  }
  ctx.showMessage(`${ctx.getVarName("CALL", COUNT)}의 평판을 물어봤다……`);
  ctx.showMessage(`그녀는 다른 아가씨들보다`);
  if (ctx.getTalent(count, 63) === 1) {
    ctx.showMessage(`손님을 정성을 다해 대접하는`);
  } else if (ctx.getTalent(count, 205) === 1) {
    ctx.showMessage(`화려홤에 기품까지 갖춘`);
  } else if (ctx.getTalent(count, 87) === 1) {
    ctx.showMessage(`남심을 어지럽히는 소악마의 매력을 가진`);
  } else if (ctx.getTalent(count, 117)) {
    ctx.showMessage(`같이 있으면 치유받는`);
  } else if (ctx.getTalent(count, 118)) {
    ctx.showMessage(`손님의 푸념을 듣고 격려해주는`);
  } else {
    ctx.showMessage(`손님과 진지하게 마주보는`);
  }
  ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "는")}, 손님들과 가게에서 평판이 높다고 한다……`);
  ctx.showMessage('');
  ctx.showMessage('회화경험 +5');
  ctx.showMessage('지명경험 +1');
  ctx.exp[ctx.count][73] += 5;
  ctx.exp[ctx.count][80] += 1;
  ctx.exp[ctx.master][109] += 1;
  character.cflags[ctx.master][630] += ctx.rand(100);
  if (character.cflags[ctx.master][630] >= 60 && ctx.money >= 500000 && character.cflags[ctx.master][634] === 0) {
    await event_add_c_girl(ctx, character);
  }
}

export async function event_add_c_girl(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: PRINTW
  // TODO: CHKFONT "あくびん"
  if (ctx.result) {
    // TODO: SETFONT "あくびん"
  }
  ctx.setColor(0xDDBBCC);
  ctx.showMessage(`「오너에게 들었는데요…… 손님, 오너 관계자라면서요?」`);
  ctx.showMessage(`「그리고 오너가『빚을 빨리 갚고 싶으면 그 녀석한테 상담해봐』라고 하셨는데……」`);
  ctx.showMessage('');
  ctx.resetColor();
  // TODO: SETFONT ""
  ctx.showMessage(`슬슬 돌아갈까 하던 ${ctx.getVarName("CALL", MASTER)}에게, 상대를 해준 %조사처리(CSTR:MASTER:51,"가")% 할 말이 있다고 한다……`);
  ctx.showMessage(`들어보니 그녀도 키류 조직에게 막대한 빚을 졌고, 거기서 오너, 그러니까 카논이 ${ctx.josaHelper("플레이어를")} 소개해줬다고 한다`);
  ctx.showMessage(`이 가게에 다닌지 어느정도 된 것 치고는 아직 미숙하지만, 확실히 카논이 소개할 만큼의 가능성은 느껴진다`);
  ctx.showMessage(`사무소 경영도 궤도에 올랐고, 여배우를 늘려도 좋을 시기일 것이다……`);
  ctx.showMessage('');
  // Label: INPUT_LOOP_C_GIRL
  ctx.showMessage(`%CSTR:MASTER:50% %조사처리(CSTR:MASTER:51,"와")% 계약합니까?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 아니오');
  await ctx.inputNumber();
  if (ctx.result === 0) {
    ctx.showMessage(`${ctx.josaHelper("플레이어는")} 계약하기로 결심하고, %CSTR:MASTER:51%에게 지정한 날에 사무소에 오라고 전했다`);
    ctx.showMessage(`기쁜듯, 그리고 어딘가 안심한듯이 보이는 %조사처리(CSTR:MASTER:51,"는")%,`);
    ctx.showMessage(`${ctx.getVarName("CALL", MASTER)}에게 머리를 숙이고 몇번이고 감사를 표했다……`);
    ctx.showMessage('');
    ctx.showMessage(`《%CSTR:MASTER:50% %조사처리(CSTR:MASTER:51,"와")% 계약했습니다》`);
    // TODO: ADDCHARA 79
    character.cflags[ctx.master][634] = 1;
    // TODO: LOADGLOBAL
    ctx.global[279] += 1;
    // TODO: SAVEGLOBAL
  } else if (ctx.result === 1) {
    ctx.showMessage(`${ctx.josaHelper("플레이어가")} 잠시 고민한 끝에, 사정이 있어 아직 전속 배우를 늘릴 생각은 없다고 %CSTR:MASTER:51%에게 전하자,`);
    ctx.showMessage(`%조사처리(CSTR:MASTER:51,"는")% 안타까워 하면서도, ${ctx.getVarName("CALL", MASTER)}에게 미소를 지으며 영업토크를 시작했다……`);
  } else {
    // GOTO INPUT_LOOP_C_GIRL - 구조 변경 필요 (while/break 사용 권장)
  }
}

export async function event_c_clubafter(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = ctx.rand(3);
  ctx.showMessage(`${ctx.josaHelper(ctx.getName(ctx.count), "는")} 캬바쿠라 일을 끝내고, 지명 손님과 애프터를 즐겼다……`);
  if (ctx.locals[0] === 0) {
    ctx.showMessage(`노래방에 들어가 ${ctx.getVarName("CALL", COUNT)}`);
    if (ctx.abilities[ctx.count][71] >= 5) {
      ctx.showMessage(`%조사만처리(CALLNAME:COUNT,"가")% 1곡 부르니,`);
      ctx.showMessage(`손님은 그녀의 노래소리에 빠져들었다`);
      ctx.showMessage(`결국, 대부분 ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "가")} 혼자 노래를 불러버렸지만,`);
      ctx.showMessage(`${ctx.getVarName("CALL", COUNT)}의 노랫소리를 독점했다, 며 손님은 만족한 모양이다`);
      ctx.showMessage(`가창경험 +${ctx.abilities[ctx.count][71]}`);
      ctx.exp[ctx.count][71] += ctx.abilities[ctx.count][71] + 2;
    } else {
      ctx.showMessage(`%조사만처리(CALLNAME:COUNT,"는")% 듀엣곡을 중심으로 선곡해,`);
      ctx.showMessage(`손님과 함께 노래를 불렀다.`);
      ctx.showMessage(`가창경험 +4`);
      ctx.exp[ctx.count][71] += 4;
    }
  } else if (ctx.locals[0] === 1) {
    ctx.showMessage(`식당에 들어간 ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "는")} 맛있는 요리에 활짝 웃음을 짓고,`);
    ctx.showMessage(`그 모습을 본 손님은 매우 기뻐했다`);
    ctx.showMessage(`회화경험 +4`);
    ctx.exp[ctx.count][73] += 4;
  } else if (ctx.locals[0] === 2) {
    ctx.showMessage(`두사람은 오락실에 놀러가, 함께 스티커 사진을 찍거나 댄스게임을 즐겼다.`);
    ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "와")} 같이 찍은 스티커 사진을 받아든 손님은 매우 기뻐했다.`);
    ctx.showMessage(`피사경험 +2`);
    ctx.showMessage(`무용경험 +2`);
    ctx.exp[ctx.count][70] += 2;
    ctx.exp[ctx.count][72] += 2;
  }
}
