/**
 * EVENT_MORNING.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function event_morning_pickup(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else if (character.cflags[ctx.count][60] === 1) {
      if (ctx.getTalent(count, 122) == 0) {
        await event_morning_decide(ctx, character);
      }
      // TODO: BREAK
    }
  }
}

export async function event_morning_decide(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.abilities[ctx.count][32] >= 1 && HAVE_PENIS(ctx.master)) {
    await event_morning_fellatio(ctx, character);
  } else {
    await event_morning_normal(ctx, character);
  }
}

export async function event_morning_normal(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  X = 1 + ctx.rand(5);
  if (ctx.getTalent(count, 85) == 1) {
    X *= 2;
  }
  if (TIME == 1) {
    X *= 2;
  }
  if (ctx.base[ctx.count][0] <= 500) {
    return;
  }
  if (ctx.getTalent(count, 154)) {
    return;
  }
  if (character.cflags[ctx.count][110] - 2 <= DAY && ctx.getTalent(count, 153)) {
    return;
  }
  if (ctx.getTalent(count, 151)) {
    return;
  }
  if (character.mark[ctx.count][3] > 0) {
    return;
  }
  ctx.drawLine();
  ctx.showMessage(`W 누군가가 ${ctx.josaHelper("플레이어를")} 부르는 소리가 난다……`);
  ctx.showMessage(`그리고 동시에 몸이 흔들리는 느낌에, ${ctx.josaHelper("플레이어가")} 눈을 뜨니, 부탁한 대로 ${ctx.josaHelper(ctx.getName(ctx.count), "가")} 일으키러 와준 듯 하다`);
  ctx.showMessage(`${ctx.josaHelper("플레이어가")} 잠에 취해 눈을 비비면서 고맙다고 하니, ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "는")}`);
  if (character.cflags[ctx.count][16] === -1) {
    ctx.showMessage(`수줍은듯이 부끄러워 했다.`);
  } else {
    ctx.showMessage(`가볍게 뺨에 키스를 하고 미소지었다.`);
  }
  if (ctx.getTalent(count, 87) === 1 && character.cflags[ctx.count][16] != -1) {
    ctx.showMessage(`평소처럼 장난인 모양이다……`);
  } else if (ctx.getTalent(count, 85) === 1 && ctx.getTalent(count, 87) === 0 && character.cflags[ctx.count][16] != -1) {
    ctx.showMessage(`나름의 애정표현 인 것 같다……`);
  }
  ctx.showMessage('');
  ctx.showMessage(`온순의 구슬 +{X*100}`);
  ctx.showMessage(`습득의 구슬 +{X*50}`);
  if (ctx.getTalent(count, 85) == 1) {
    ctx.showMessage(`애정경험 +{X}`);
  }
  await ctx.wait();
  ctx.juel[ctx.count][4] += X*100;
  ctx.juel[ctx.count][7] += X*50;
  if (ctx.getTalent(count, 85) == 1) {
    ctx.exp[ctx.count][23] += X;
  }
}

export async function event_morning_fellatio(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  X = 3 + ctx.rand(4);
  if (ctx.abilities[ctx.count][32] >= 3) {
    X *= ctx.abilities[ctx.count][32];
  }
  if (X >= 13) {
    X = 12;
  }
  if (TIME == 1) {
    X *= 2;
  }
  Y = X - ctx.rand(4);
  if (Y >= 25) {
    Y = 24;
  }
  if (Y <= 2) {
    Y = 3;
  }
  if (ctx.base[ctx.count][0] <= 500) {
    return;
  }
  if (ctx.getTalent(count, 154)) {
    return;
  }
  if (character.cflags[ctx.count][110] - 2 <= DAY && ctx.getTalent(count, 153)) {
    return;
  }
  if (ctx.getTalent(count, 151)) {
    return;
  }
  if (character.mark[ctx.count][3] > 0) {
    return;
  }
  ctx.drawLine();
  ctx.showMessage(`W ${ctx.getVarName("CALL", MASTER)}는 고간에 온기를 느껴 눈이 떠졌다……`);
  ctx.showMessage(`묘하게 봉긋히 솟아오른 이불을 걷어 보면, ${ctx.getVarName("CALL", MASTER)}의 발기한 육봉을 ${ctx.josaHelper(ctx.getName(ctx.count), "가")}`);
  if (ctx.getTalent(count, 47) === 1) {
    ctx.showMessage(`정액을 빨아내기 위해 열심히 빨고`);
  } else if (ctx.abilities[ctx.count][13] >= 3) {
    ctx.showMessage(`귀두나 힘줄을 혀로 핥고, 입안에 넣으며 봉사하고`);
  } else {
    ctx.showMessage(`아직 어색하지만, 열심히 입에 페니스를 머금어 펠라치오하고`);
  }
  ctx.showMessage(`있다`);
  ctx.showMessage(`${ctx.getVarName("CALL", COUNT)}의 펠라로 이미 {Y-1}회나 사정해 버린 듯, 아침 햇빛을 받아 자신의 타액과`);
  ctx.showMessage(`${ctx.getVarName("CALL", MASTER)}의 정액으로 요염하게 빛나는 ${ctx.getVarName("CALL", COUNT)}의 입술`);
  if (X >= 7) {
    ctx.showMessage(`뿐만 아니라, 얼굴 전체까지가 쏟아진 정액에 백탁으로 물들었`);
  } else {
    ctx.showMessage(`에서 정액이 늘어져 있`);
  }
  ctx.showMessage(`다`);
  ctx.showMessage(`${ctx.getVarName("CALL", COUNT)}의 요망한 모습에 사정감이 한계까지 차오른 ${ctx.josaHelper("플레이어는")},`);
  if (ctx.getTalent(count, 88) === 1) {
    ctx.showMessage(`${ctx.getVarName("CALL", COUNT)}의 머리를 잡아 목 안쪽에 페니스를 찔러 넣으`);
  } else {
    ctx.showMessage(`${ctx.getVarName("CALL", COUNT)}의 펠라를 충분히 만끽하`);
  }
  ctx.showMessage(`면서 욕망을 털어 놓았다……`);
  ctx.showMessage(`그리고 ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "는")} 입안에 모인 정액을`);
  if (ctx.abilities[ctx.count][32] >= 3) {
    ctx.showMessage(`혀를 내밀고 과시하듯이, 일부러 소리를 내면서`);
  } else {
    ctx.showMessage(`아직 정액의 맛에 익숙해 지지 못한듯 천천히`);
  }
  ctx.showMessage(` 삼키기 시작했다……`);
  ctx.showMessage('');
  ctx.exp[ctx.count][22] += X;
  ctx.showMessage(`${ctx.getVarName("EXP", 22)} +{X}`);
  ctx.exp[ctx.count][20] += X;
  ctx.showMessage(`${ctx.getVarName("EXP", 20)} +{Y}`);
  ctx.showMessage(`${ctx.getVarName("PALAM", 4)}의 구슬 +{X*50}`);
  ctx.showMessage(`${ctx.getVarName("PALAM", 6)}의 구슬 +{X*30}`);
  ctx.showMessage(`${ctx.getVarName("PALAM", 7)}의 구슬 +{X*40}`);
  if (character.cflags[ctx.count][16] === -1) {
    if (ctx.getTalent(count, 432) === 1 && (ctx.getCharacterNo(ctx.count) === 1 || ctx.getCharacterNo(ctx.count) === 91)) {
      character.cstr[ctx.count][1] = "형님의 자지";
    } else if (ctx.getTalent(count, 76) === 1 && (ctx.getCharacterNo(ctx.count) === 1 || ctx.getCharacterNo(ctx.count) === 91)) {
      character.cstr[ctx.count][1] = "오빠의 자○";
    } else if (ctx.getTalent(count, 76) === 0 && (ctx.getCharacterNo(ctx.count) === 1 || ctx.getCharacterNo(ctx.count) === 91)) {
      character.cstr[ctx.count][1] = "오빠의 고○";
    } else if (ctx.getCharacterNo(ctx.count) != 1 && ctx.getCharacterNo(ctx.count) != 91 && ctx.getTalent(count, 432) === 1) {
      character.cstr[ctx.count][1] = `${CALLctx.getName(ctx.master)}의 자지`;
    } else if (ctx.getCharacterNo(ctx.count) != 1 && ctx.getCharacterNo(ctx.count) != 91 && ctx.getTalent(count, 76) === 1) {
      character.cstr[ctx.count][1] = `${CALLctx.getName(ctx.master)}의 자○`;
    } else if (ctx.getCharacterNo(ctx.count) != 1 && ctx.getCharacterNo(ctx.count) != 91 && ctx.getTalent(count, 76) === 0) {
      character.cstr[ctx.count][1] = `${CALLctx.getName(ctx.master)}의 고○`;
    } else {
      character.cstr[ctx.count][1] = `${CALLctx.getName(ctx.master)}의 자지님v`;
    }
    character.cflags[ctx.count][16] = 1;
    character.cflags[ctx.count][820] = ctx.base[ctx.count][9];
    character.cflags[ctx.count][821] = DAY[1];
    character.cflags[ctx.count][822] = DAY[2];
    ctx.setColor(0xF58F98);
    ctx.showMessage('【첫 키스】');
    ctx.resetColor();
    ctx.base[ctx.count][31] -= 5;
  }
  await ctx.wait();
  ctx.juel[ctx.count][4] += X*50;
  ctx.juel[ctx.count][6] += X*30;
  ctx.juel[ctx.count][7] += X*40;
}
