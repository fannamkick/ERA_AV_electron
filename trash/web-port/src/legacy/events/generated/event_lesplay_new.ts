/**
 * EVENT_LESPLAY_NEW.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function event_lesplay_new(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #DIM LCOUNT
  // TODO: #DIM f_actor
  // TODO: #DIM s_actor
  // TODO: #DIM NumofTimes
  await clearrandchoose(ctx, character);
  // TODO: FOR LCOUNT,0,CHARANUM
  if (!(LCOUNT === 0 || ctx.abilities[LCOUNT][22] <= 2 || LCOUNT.no === 10)) {
    await addrandchoose(LCOUNT, ctx, character);
  }
  // TODO: NEXT
  if (await choicecount_f(ctx, character) > 0) {
    await randchoose(ctx, character);
    // TODO: f_actor = RESULT
  } else {
    return;
  }
  await clearrandchoose(ctx, character);
  // TODO: FOR LCOUNT,0,CHARANUM
  if (LCOUNT != f_actor && ctx.abilities[LCOUNT][22] >= 2  && (ctx.relation[f_actor][LCOUNT.no] >= 120) && ctx.rand(100) < 10 && ctx.getTalent(lcount, 122) === 0 && LCOUNT.no != 10) {
    await addrandchoose(LCOUNT, ctx, character);
  }
  // TODO: NEXT
  if (await choicecount_f(ctx, character) > 0) {
    await randchoose(ctx, character);
    // TODO: s_actor = RESULT
  } else {
    return;
  }
  ctx.showMessage(`내일은 모처럼의 휴일이니`);
  if (f_actor.no === 1) {
    ctx.showMessage(`${ctx.getVarName("CALL", f_actor)}의 방에 ${ctx.josaHelper(ctx.getName(s_actor), "가")} 놀러왔다`);
  } else if (s_actor.no === 1) {
    ctx.showMessage(`${ctx.getVarName("CALL", s_actor)}의 방에 ${ctx.josaHelper(ctx.getName(f_actor), "가")} 놀러왔다`);
  } else if (f_actor.no === 1 && s_actor.no === 17) {
    ctx.showMessage(`${ctx.josaHelper(ctx.getName(f_actor), "와")} ${ctx.josaHelper(ctx.getName(s_actor), "랑")} 놀기로 했다`);
  } else if (f_actor.no === 17 && s_actor.no === 1) {
    ctx.showMessage(`${ctx.josaHelper(ctx.getName(f_actor), "와")} ${ctx.josaHelper(ctx.getName(s_actor), "랑")} 놀기로 했다`);
  } else {
    ctx.showMessage(`${ctx.josaHelper(ctx.getName(f_actor), "와")} ${ctx.josaHelper(ctx.getName(s_actor), "가")} ${ctx.getVarName("CALL", MASTER)}의 방에 놀러왔다`);
  }
  ctx.showMessage(`W`);
  ctx.showMessage(`${ctx.getVarName("CALL", MASTER)}도 함께`);
  if (ctx.abilities[f_actor][73] >= 2 && ctx.abilities[s_actor][73] < 2) {
    ctx.showMessage(`${ctx.josaHelper(ctx.getName(f_actor), "가")} 만든 요리를 먹으며`);
  } else if (ctx.abilities[f_actor][73] < 2 && ctx.abilities[s_actor][73] >= 2) {
    ctx.showMessage(`${ctx.josaHelper(ctx.getName(s_actor), "가")} 만든 요리를 먹으며`);
  } else if (ctx.abilities[f_actor][73] >= 2 && ctx.abilities[s_actor][73] >= 2) {
    ctx.showMessage(`${ctx.josaHelper(ctx.getName(f_actor), "랑")} ${ctx.josaHelper(ctx.getName(s_actor), "가")} 만든 요리를 먹으며`);
  } else {
    ctx.showMessage(`배달시킨 피자를 먹으며`);
  }
  ctx.showMessage(`보드게임을 하거나 영화를 보고, 잡담을 하며 즐거운 시간을 보냈다`);
  ctx.showMessage(`그렇게 밤이 깊어지고, 졸린듯 눈을 비비는 ${ctx.josaHelper(ctx.getName(f_actor), "와")} ${ctx.josaHelper(ctx.getName(s_actor), "가")} 자기 전에 샤워를 하고 싶다고 하기에,`);
  ctx.showMessage(`당신은 두 사람의 알몸에는 이미 익숙해졌지만, 그래도 최소한의 매너를 지키고 먼저 방으로 돌아갔다`);
  ctx.showMessage(`그런데, 욕실에 둘이 같이 간 것처럼 보인 건 기분 탓일까……`);
  // TODO: PRINTW
  await kojo_lesplay,f_actor,s_actor(ctx, character);
  ctx.showMessage(`옆 방에서 ${ctx.josaHelper(ctx.getName(f_actor), "와")} ${ctx.getVarName("CALL", s_actor)}의 신음소리가 들린다……`);
  ctx.showMessage(`그때 본것은 기분 탓이 아니라 정말 같이 욕탕에 들어갔다가 몸이 뜨거워졌는지,`);
  ctx.showMessage(`옆방에서 ${ctx.josaHelper("플레이어가")} 자고 있는 것도 잊은듯이 레즈 플레이를 시작했다`);
  ctx.showMessage(`사이가 좋은건 바람직하지만, 주위에는 신경써주길 바라며, ${ctx.josaHelper("플레이어는")}`);
  ctx.showMessage(`두 사람의 신음소리에 영향받았는지 자기는 불러주지 않는 외로움을 느끼며`);
  if (ctx.getTalent(master, 122) === 1 || ctx.getTalent(master, 121) === 1) {
    ctx.showMessage(`발기한 페니스를`);
  } else {
    ctx.showMessage(`애액으로 젖은 바기나를`);
  }
  ctx.showMessage(`스스로 위로했다……`);
  ctx.showMessage('');
  // TODO: NumofTimes = 0
  if (ctx.abilities[f_actor][33] === 1) {
    // TODO: NumofTimes += 1
  } else if (ctx.abilities[f_actor][33] === 2) {
    // TODO: NumofTimes += 2
  } else if (ctx.abilities[f_actor][33] === 3) {
    // TODO: NumofTimes += 3
  } else if (ctx.abilities[f_actor][33] === 4) {
    // TODO: NumofTimes += 5
  } else if (ctx.abilities[f_actor][33] === 5) {
    // TODO: NumofTimes += 8
  } else if (ctx.abilities[f_actor][33] >= 6) {
    // TODO: NumofTimes += 13
  }
  if (ctx.abilities[s_actor][33] === 1) {
    // TODO: NumofTimes += 1
  } else if (ctx.abilities[s_actor][33] === 2) {
    // TODO: NumofTimes += 2
  } else if (ctx.abilities[s_actor][33] === 3) {
    // TODO: NumofTimes += 3
  } else if (ctx.abilities[s_actor][33] === 4) {
    // TODO: NumofTimes += 5
  } else if (ctx.abilities[s_actor][33] === 5) {
    // TODO: NumofTimes += 8
  } else if (ctx.abilities[s_actor][33] >= 6) {
    // TODO: NumofTimes += 13
  }
  if (ctx.abilities[f_actor][22] >= 3) {
    // TODO: NumofTimes += 1
  }
  if (ctx.abilities[s_actor][22] >= 3) {
    // TODO: NumofTimes += 1
  }
  if (ctx.abilities[f_actor][11] >= 7) {
    // TODO: NumofTimes += 1
  }
  if (ctx.abilities[f_actor][11] >= 4) {
    // TODO: NumofTimes += 1
  }
  if (ctx.relation[f_actor][s_actor.no] > 0) {
    // TODO: NumofTimes *= RELATION:f_actor:(NO:s_actor) * 3
    // TODO: NumofTimes /= 100
  }
  if (ctx.getTalent(f_actor, 24)) {
    // TODO: NumofTimes -= 1
  }
  if (ctx.getTalent(s_actor, 24)) {
    // TODO: NumofTimes -= 1
  }
  if (ctx.getTalent(f_actor, 27)) {
    // TODO: NumofTimes -= 1
  }
  if (ctx.getTalent(s_actor, 27)) {
    // TODO: NumofTimes -= 1
  }
  if (ctx.getTalent(f_actor, 81)) {
    // TODO: NumofTimes += 2
  }
  if (ctx.getTalent(s_actor, 81)) {
    // TODO: NumofTimes += 2
  }
  if (ctx.getTalent(f_actor, 76)) {
    // TODO: NumofTimes += 1
  }
  if (ctx.getTalent(s_actor, 76)) {
    // TODO: NumofTimes += 1
  }
  if (ctx.getTalent(f_actor, 70)) {
    // TODO: NumofTimes += 1
  } else if (ctx.getTalent(f_actor, 71)) {
    // TODO: NumofTimes -= 2
  }
  if (ctx.getTalent(s_actor, 70)) {
    // TODO: NumofTimes += 1
  } else if (ctx.getTalent(s_actor, 71)) {
    // TODO: NumofTimes -= 2
  }
  // TODO: NumofTimes /= 10
  if (NumofTimes <= 1) {
    // TODO: NumofTimes = 1
  }
  ctx.showMessage(`${ctx.getVarName("EXP", 40)} +{NumofTimes*2}(${ctx.getVarName("CALL", f_actor)})`);
  if (NumofTimes*100*ctx.abilities[f_actor][11]/500 > 0) {
    ctx.showMessage(`${ctx.getVarName("EXP", 2)} +{NumofTimes*100*ABL:f_actor:11/500}(${ctx.getVarName("CALL", f_actor)})`);
  }
  ctx.showMessage(`${ctx.getVarName("PALAM", 0)}의 구슬 +{NumofTimes*100*ABL:f_actor:11}(${ctx.getVarName("CALL", f_actor)})`);
  ctx.showMessage(`${ctx.getVarName("PALAM", 5)}의 구슬 +{NumofTimes*200}(${ctx.getVarName("CALL", f_actor)})`);
  // TODO: EXP:f_actor:40 += NumofTimes*2
  // TODO: EXP:f_actor:2 += NumofTimes*100*ABL:f_actor:11/500
  // TODO: JUEL:f_actor:0 += NumofTimes*100*ABL:f_actor:11
  // TODO: JUEL:f_actor:5 += NumofTimes*200
  if (ctx.getTalent(s_actor, 121)) {
    ctx.showMessage(`${ctx.getVarName("EXP", 20)} +{NumofTimes}(${ctx.getVarName("CALL", f_actor)})`);
    ctx.showMessage(`${ctx.getVarName("PALAM", 6)}의 구슬 +{NumofTimes*100*(ABL:f_actor:12+ABL:f_actor:16)}(${ctx.getVarName("CALL", f_actor)})`);
    ctx.showMessage(`${ctx.getVarName("PALAM", 7)}의 구슬 +{NumofTimes*100*(ABL:f_actor:12+ABL:f_actor:16)}(${ctx.getVarName("CALL", f_actor)})`);
    // TODO: EXP:f_actor:20 += NumofTimes
    // TODO: JUEL:f_actor:6 += NumofTimes*100*(ABL:f_actor:12+ABL:f_actor:16)
    // TODO: JUEL:f_actor:7 += NumofTimes*100*(ABL:f_actor:12+ABL:f_actor:16)
  } else {
    ctx.showMessage(`${ctx.getVarName("PALAM", 6)}의 구슬 +{NumofTimes*50*(ABL:f_actor:12+ABL:f_actor:16)}(${ctx.getVarName("CALL", f_actor)})`);
    ctx.showMessage(`${ctx.getVarName("PALAM", 7)}의 구슬 +{NumofTimes*50*(ABL:f_actor:12+ABL:f_actor:16)}(${ctx.getVarName("CALL", f_actor)})`);
    // TODO: JUEL:f_actor:6 += NumofTimes*50*(ABL:f_actor:12+ABL:f_actor:16)
    // TODO: JUEL:f_actor:7 += NumofTimes*50*(ABL:f_actor:12+ABL:f_actor:16)
  }
  if (ctx.getTalent(s_actor, 83)) {
    ctx.showMessage(`${ctx.getVarName("EXP", 30)} +{NumofTimes}`);
    if (NumofTimes*100*ctx.abilities[f_actor][21] > 0) {
      ctx.showMessage(`${ctx.getVarName("PALAM", 9)}의 구슬 +{NumofTimes*100*ABL:f_actor:21}(${ctx.getVarName("CALL", f_actor)})`);
    }
    // TODO: JUEL:f_actor:19 += NumofTimes*100*ABL:f_actor:21
    // TODO: EXP:f_actor:30 += NumofTimes
  }
  if (ctx.getTalent(s_actor, 88) === 1 && ctx.abilities[f_actor][20] >= 3) {
    ctx.showMessage(`${ctx.getVarName("EXP", 33)} +{NumofTimes}`);
    if (NumofTimes*100*ctx.abilities[f_actor][20] > 0) {
      ctx.showMessage(`${ctx.getVarName("PALAM", 5)}의 구슬 +{NumofTimes*100*ABL:f_actor:20}(${ctx.getVarName("CALL", f_actor)})`);
    }
    // TODO: JUEL:f_actor:5 += NumofTimes*100*ABL:f_actor:20
    // TODO: EXP:f_actor:33 += NumofTimes
  }
  if (ctx.getTalent(f_actor, 121)) {
    ctx.showMessage(`${ctx.getVarName("EXP", 3)} +{NumofTimes}(${ctx.getVarName("CALL", f_actor)})`);
    ctx.showMessage(`${ctx.getVarName("PALAM", 8)}의 구슬 +{NumofTimes*100}(${ctx.getVarName("CALL", f_actor)})`);
    // TODO: EXP:f_actor:3 += NumofTimes
    // TODO: JUEL:f_actor:8 += NumofTimes*100
  }
  ctx.showMessage('');
  ctx.showMessage(`${ctx.getVarName("EXP", 40)} +{NumofTimes*2}(${ctx.getVarName("CALL", s_actor)})`);
  if (NumofTimes*100*ctx.abilities[s_actor][11]/500 > 0) {
    ctx.showMessage(`${ctx.getVarName("EXP", 2)} +{NumofTimes*100*ABL:s_actor:11/500}(${ctx.getVarName("CALL", s_actor)})`);
  }
  ctx.showMessage(`${ctx.getVarName("PALAM", 0)}의 구슬 +{NumofTimes*100*ABL:s_actor:11}(${ctx.getVarName("CALL", s_actor)})`);
  ctx.showMessage(`${ctx.getVarName("PALAM", 5)}의 구슬 +{NumofTimes*200}(${ctx.getVarName("CALL", s_actor)})`);
  // TODO: EXP:s_actor:40 += NumofTimes*2
  // TODO: EXP:s_actor:2 += NumofTimes*100*ABL:s_actor:11/500
  // TODO: JUEL:s_actor:0 += NumofTimes*100*ABL:s_actor:11
  // TODO: JUEL:s_actor:5 += NumofTimes*200
  if (ctx.getTalent(f_actor, 121)) {
    ctx.showMessage(`${ctx.getVarName("EXP", 20)} +{NumofTimes}(${ctx.getVarName("CALL", s_actor)})`);
    ctx.showMessage(`${ctx.getVarName("PALAM", 6)}의 구슬 +{NumofTimes*100*(ABL:s_actor:12+ABL:s_actor:16)}(${ctx.getVarName("CALL", s_actor)})`);
    ctx.showMessage(`${ctx.getVarName("PALAM", 7)}의 구슬 +{NumofTimes*100*(ABL:s_actor:12+ABL:s_actor:16)}(${ctx.getVarName("CALL", s_actor)})`);
    // TODO: EXP:s_actor:20 += NumofTimes
    // TODO: JUEL:s_actor:6 += NumofTimes*100*(ABL:s_actor:12+ABL:s_actor:16)
    // TODO: JUEL:s_actor:7 += NumofTimes*100*(ABL:s_actor:12+ABL:s_actor:16)
  } else {
    ctx.showMessage(`${ctx.getVarName("PALAM", 6)}의 구슬 +{NumofTimes*50*(ABL:s_actor:12+ABL:s_actor:16)}(${ctx.getVarName("CALL", s_actor)})`);
    ctx.showMessage(`${ctx.getVarName("PALAM", 7)}의 구슬 +{NumofTimes*50*(ABL:s_actor:12+ABL:s_actor:16)}(${ctx.getVarName("CALL", s_actor)})`);
    // TODO: JUEL:s_actor:6 += NumofTimes*50*(ABL:s_actor:12+ABL:s_actor:16)
    // TODO: JUEL:s_actor:7 += NumofTimes*50*(ABL:s_actor:12+ABL:s_actor:16)
  }
  if (ctx.getTalent(f_actor, 83)) {
    ctx.showMessage(`${ctx.getVarName("EXP", 30)} +{NumofTimes}`);
    if (NumofTimes*100*ctx.abilities[s_actor][21] > 0) {
      ctx.showMessage(`${ctx.getVarName("PALAM", 9)}의 구슬 +{NumofTimes*100*ABL:s_actor:21}(${ctx.getVarName("CALL", s_actor)})`);
    }
    // TODO: JUEL:s_actor:9 += NumofTimes*100*ABL:s_actor:21
    // TODO: EXP:s_actor:30 += NumofTimes
  }
  if (ctx.getTalent(f_actor, 88) === 1 && ctx.abilities[f_actor][20] >= 3) {
    ctx.showMessage(`${ctx.getVarName("EXP", 33)} +{NumofTimes}`);
    if (NumofTimes*100*ctx.abilities[f_actor][20] > 0) {
      ctx.showMessage(`${ctx.getVarName("PALAM", 5)}의 구슬 +{NumofTimes*100*ABL:f_actor:20}(${ctx.getVarName("CALL", s_actor)})`);
    }
    // TODO: JUEL:f_actor:5 += NumofTimes*100*ABL:f_actor:20
    // TODO: EXP:f_actor:33 += NumofTimes
  }
  if (ctx.getTalent(s_actor, 121)) {
    ctx.showMessage(`${ctx.getVarName("EXP", 3)} +{NumofTimes}`);
    ctx.showMessage(`${ctx.getVarName("PALAM", 8)}의 구슬 +{NumofTimes*100}(${ctx.getVarName("CALL", s_actor)})`);
    // TODO: EXP:s_actor:3 += NumofTimes
    // TODO: JUEL:s_actor:8 += NumofTimes*100
  }
  // TODO: RELATION:s_actor:(NO:f_actor) += 10
  // TODO: RELATION:f_actor:(NO:s_actor) += 10
}
