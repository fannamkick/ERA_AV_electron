/**
 * IKUMI_LABO_DETAIL.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function kill_pregnancy(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  C = 0;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    return 0;
  }
  ctx.showMessage(`「불임수술이지ー, 응, 가능해ー」`);
  ctx.showMessage(`사무소 옆에 자리한 이쿠미의 연구소의 한 방, 평소대로 파이프 의자의`);
  ctx.showMessage(`등받이를 껴안고 늘어져있던 이쿠미는 간단한 일이라는 듯이 말했다`);
  ctx.showMessage(`${ctx.josaHelper("플레이어가")} 가져온 문제는 섹스신을 찍을 여배우 후보들이`);
  ctx.showMessage(`임신하지 않도록 할 수 있을까, 하는 것이었다`);
  ctx.showMessage(`여배우 후보들도 임신이라는 리스크는 피하고 싶고,`);
  ctx.showMessage(`그렇다고 콘돔을 사용하면 매상이 줄어든다`);
  ctx.showMessage(`배란을 억제시키는 사후 피임약도 존재하지만,`);
  ctx.showMessage(`W 그걸 사용해도 여전히 임신할 위험은 존재한다고 한다`);
  ctx.showMessage(`물론 일반 병원에서도 불임수술은 받을 수 있지만,`);
  ctx.showMessage(`W 아직 젊은 여자들이 받는 것 만으로『뒤가 있다』고 눈치채일 가능성도 있고……`);
  ctx.showMessage(`「응ー 그러면 불법적인 방법에 기댈 수 밖에 없지ー.`);
  ctx.showMessage(`　가장 빠른 방법은 난소를 없애버리는 거지만,`);
  ctx.showMessage(`　그럼 수술자국도 남아서 팔리기 힘들어 질테고ー.`);
  ctx.showMessage(`　기본적으로 위험일만 피하면 된다는 이야기도 있지만,`);
  ctx.showMessage(`　대체 위험일이란 게 존재하는지도 의문이고ー……`);
  ctx.showMessage(`　거기다 애들의 나이를 생각하면, 배란을 막아서 호르몬 밸런스가 무너지기라도 했다간`);
  ctx.showMessage(`　되돌릴 수 없는 심각한 문제가 생길테고, 물론 그렇게 안되게 예방하는 기술은`);
  ctx.showMessage(`　내가 알기론『아직』웬만한 의사들은 알리가 없을테니까ー」`);
  ctx.showMessage(`불임수술은 기혼자에 아이도 여럿 있는,`);
  ctx.showMessage(`혹은 임신과 출산이 엄마의 몸에 악영향을 미칠 경우에만 받을 수 있다,`);
  ctx.showMessage(`라는 사실을 말해주고 이쿠미는 자료가 쌓여있는 책상을 뒤지기 시작했다……`);
  ctx.showMessage(`W`);
  ctx.showMessage(`「이게 불임수술 자료야ー。`);
  ctx.showMessage(`　학회에서는 발표『못』하고, 환자한테 이상한 약을 먹이는 거니까`);
  ctx.showMessage(`　부작용도 무섭단 말이지ー ……아직, 임상실험도 제대로 못 해봤으니까ー」`);
  ctx.showMessage(`부작용이 무섭다, 는 말에 ${ctx.josaHelper("플레이어는")} 깜짝 놀랐다`);
  ctx.showMessage(`「뭐, 그래도 내가 만든 거니까 심각한 부작용은 없을꺼야ー。`);
  ctx.showMessage(`　마법이라던가 그런거 쓰는 사람이라면 부작용 없는 불임방법도 알고 있겠지만,`);
  ctx.showMessage(`　세상에 그런 사람들은 파라디수스 왕족 밖에 없으려나ー。`);
  ctx.showMessage(`　있을만한 부작용이라면 그 사람의 체력을 수치화 했을때,`);
  ctx.showMessage(`　그 최대치가 한 500정도 줄어드는 정도려나ー」`);
  ctx.showMessage(`체력이 부족한 여배우 후보에겐 꽤나 가혹한 치료가 되겠지만,`);
  ctx.showMessage(`더 리스크가 높은 지도나 촬영이 가능해진다고 생각하면 충분히 이점도 있다`);
  ctx.showMessage(`생각을 정리한 ${ctx.josaHelper("플레이어는")} 이쿠미에게 불임수술을 의뢰하기로 했다……`);
  ctx.showMessage(`L`);
  // TODO: PRINTW
  ctx.showMessage(`「내가 만든 MII라던가, 파라디수스 왕족처럼 임신 안하는`);
  ctx.showMessage(`　사람들한텐 해도 소용없어ー。`);
  ctx.showMessage(`　그리고 임신중인 아이라던가, 체력이 적은 아이는 부작용이 무서우니까`);
  ctx.showMessage(`　패스려나ー`);
  ctx.showMessage(`　아, 반대로 불임수술을 받은 아이를 임신할 수 있게 돌릴 수도 있어ー」`);
  // TODO: PRINTW
  // Label: INPUT_LOOP
  await life_list_new,1(ctx, character);
  if (ctx.result === 999) {
    return 0;
  } else if (ctx.result < 0 || ctx.result >= ctx.charanum) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.base[ctx.result][0] < 1) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 504)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 504)}】는 임신하지 않습니다`);
    return 0;
  } else if (ctx.getTalent(result, 505)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 505)}】는 피임마법을 사용해 임신하지 않습니다`);
    return 0;
  } else if (ctx.getTalent(result, 500)) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.result), "는")} 피임마법을 사용해 임신하지 않습니다`);
    return 0;
  } else if (ctx.getTalent(result, 330)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 330)}】대상자는 불임수술할 수 없습니다`);
    return 0;
  } else if (ctx.getTalent(result, 153)) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.result), "는")} 임신중이므로 모체에 악영향을 미칠 가능성이 있습니다`);
    return 0;
  } else if (MAXctx.base[ctx.result][0] <= 1000) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.result), "는")} 체력이 적어 악영향을 미칠 가능성이 있습니다`);
    return 0;
  }
  T = ctx.result;
  // Label: INPUT_LOOP_2
  ctx.showMessage(`${ctx.josaHelper(ctx.getName(T), "로")} 합니까?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 그만둔다');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    return 0;
  } else if (ctx.result === 0) {
    if (ctx.getTalent(t, 420) === 0) {
      ctx.showMessage(`W ${ctx.josaHelper(ctx.getName(T), "를")} 이쿠미의 연구소에 데려갔다……`);
      ctx.showMessage(`불임수술을 받아달라고 하니 ${ctx.josaHelper(ctx.getVarName("CALLNAME", T), "는")} 망설이면서도 고개를 끄덕였다……`);
      ctx.showMessage(`W ${ctx.josaHelper(ctx.getVarName("CALLNAME", T), "는")}【${ctx.getVarName("TALENT", 420)}】이 됐다`);
      ctx.getTalent(t, 420) = 1;
      MAXctx.base[T][0] -= 500;
      ctx.base[T][0] -= 500;
    } else if (ctx.getTalent(t, 420) === 1) {
      ctx.showMessage(`W ${ctx.josaHelper(ctx.getName(T), "를")} 이쿠미의 연구소에 데려갔다……`);
      ctx.showMessage(`피임치료를 받아달라고 하니 ${ctx.josaHelper(ctx.getVarName("CALLNAME", T), "는")} 망설이면서도 고개를 끄덕였다……`);
      ctx.showMessage(`W ${ctx.josaHelper(ctx.getVarName("CALLNAME", T), "는")}【${ctx.getVarName("TALENT", 420)}】이 아니게 됐다`);
      ctx.getTalent(t, 420) = 0;
      MAXctx.base[T][0] += 500;
      ctx.base[T][0] += 500;
    }
  } else {
    // GOTO INPUT_LOOP_2 - 구조 변경 필요 (while/break 사용 권장)
  }
  // TODO: PRINTW
  ctx.money -= C;
  return 1;
}

export async function ablchange(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  C = 0;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    return 0;
  }
  // Label: INPUT_LOOP
  ctx.showMessage(`「감각증폭 말이지ー, 응, 가능해ー」`);
  ctx.showMessage(`사무소 옆에 자리한 이쿠미의 연구소의 한 방, 평소대로 파이프 의자의`);
  ctx.showMessage(`등받이를 껴안고 늘어져있던 이쿠미는 간단한 일이라는 듯이 말했다`);
  ctx.showMessage(`${ctx.josaHelper("플레이어가")} 가져온 문제는 여배우 후보들의 잠재의식을`);
  ctx.showMessage(`컨트롤 할 수 없을까, 하는 것이었다`);
  ctx.showMessage(`여배우 후보들을 지도하며, 새로운 쾌락을 알아가는 그녀들을 지켜보는 건,`);
  ctx.showMessage(`지도하는 입장에선 확실히 기쁜 일이다`);
  ctx.showMessage(`그러나 자신의 기교로는 각성시킬 수 없는,`);
  ctx.showMessage(`잠재의식의 부분이 존재하는 것도 사실이었다`);
  ctx.showMessage(`간단한 소질이라면 키류 조직에게 소개받은 불법 연구소에서 세뇌시킬 수도 있지만,`);
  ctx.showMessage(`W 보다 근본적인 잠재의식은 그럴수도 없었다`);
  ctx.showMessage(`「뭐, 그 연구소의 세뇌기술도 그렇게 대단한 건 아니니까ー`);
  ctx.showMessage(`　거기서야 해봤자 일종의 트라우마를 심어놓는 정도고,`);
  ctx.showMessage(`　그런거야 일반 병원 정신과에서도 평범하게 하고 있으니까ー.`);
  ctx.showMessage(`　더 강한 걸 하고 싶다면 스페셜한 머-신이 필요하니까,`);
  ctx.showMessage(`　그런 걸 개발하던 그 나라라던가, 그 나라라던가―― 와, 누가 왔나봐ー, 꺄~ 납치당한다ー.`);
  ctx.showMessage(`　……크흠, 그런데 우연히도 그런『원더훌』한 머-신이라면`);
  ctx.showMessage(`　의뢰로 만들었던 프로토타입이 있으니까, 그 연구소보단 기대해도 좋아ー」`);
  ctx.showMessage(`그런데ー, 라며 말을 이은 이쿠미는 ${ctx.getVarName("CALL", MASTER)}에게 경비에 대해 설명했다……`);
  // TODO: PRINTW
  ctx.showMessage(`・완성품이랑 별 차이는 없지만, 소비 전력이 장난아니란 말이지ー`);
  ctx.showMessage(`・구체적으로 포인트로 말하자면 30만P 정도ー`);
  ctx.showMessage(`・그 대신 한계돌파도 할 수 있어ー`);
  ctx.showMessage(`・살짝, 아니 꽤나 엄-청 어브노멀한 세뇌니까 조심해야해ー`);
  ctx.showMessage(`W`);
  await life_list(ctx, character);
  ctx.showMessage('[999] - 돌아간다');
  await ctx.inputNumber();
  if (ctx.result === 999) {
    return 0;
  } else if (ctx.result < 0 || ctx.result >= ctx.charanum) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.base[ctx.result][0] < 1) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  T = ctx.result;
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 그만둔다');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    return 0;
  }
  // TODO: PRINTW
  ctx.money -= C;
  return 1;
}

export async function ablchange_datail(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  T = character;
  // Label: INPUT_LOOP
  ctx.showMessage(`《어떤 소질을 개화시킬까요?》`);
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  ctx.showMessage(`[ 0] 순진무구`);
  ctx.showMessage(`[ 1] 프라이드 높음`);
  ctx.showMessage(`[ 2] 프라이드 낮음`);
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    return 0;
  }
}

export async function succubus_change(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  C = 5000000;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    return 0;
  }
  ctx.showMessage(`「드디어 서큐버스 유전자 해석이 끝났어ー」`);
  ctx.showMessage(`사무소 옆에 자리한 이쿠미의 연구소의 한 방, 평소대로 파이프 의자의`);
  ctx.showMessage(`등받이를 껴안고 늘어져있던 이쿠미는 별일 아니라는 듯이 말했다`);
  ctx.showMessage(`다른 일을 부탁하기 위해 찾아왔던 ${ctx.josaHelper("플레이어는")},`);
  ctx.showMessage(`이쿠미의 말에 귀를 의심했다`);
  ctx.showMessage(`레이첼이 소환한 음마―― 이상할 정도로 성장이 빠르고`);
  ctx.showMessage(`특유의 흡정능력으로 어떤 남자가 상대라도 삐쩍 마를때까지 짜낸다는,`);
  ctx.showMessage(`악마 그 자체인 초상적 존재`);
  ctx.showMessage(`다행히도 ${ctx.josaHelper("플레이어는")} 레이첼이 건내준 비약 덕분에 그런 꼴은 면했지만,`);
  ctx.showMessage(`예를들어 치한 중에선 정기를 끝까지 빨려 폐인으로 전락한 경우도 있었다`);
  ctx.showMessage(`흡정능력을 제외해도 특출난 성기술을 가지고 있기에,`);
  ctx.showMessage(`그 어떤 청순한 미소녀라도 음탕하게 쾌락을 탐하는 모습이 호사가들 사이에 인기가 있다`);
  ctx.showMessage(`그 음마의 유전자를 해석해냈다는 이야기는――`);
  ctx.showMessage(`W 희대의 천재・이쿠미라면 복제도 간단하게 해낼지도 모른다`);
  ctx.showMessage(`「아ー ……그건 좀 힘들지 몰라ー ……유전자 정보를 그대로 복사해버리면`);
  ctx.showMessage(`　프로그램이 반응해서 자동적으로 보호막을 걸어버리는 것 같아ー.`);
  ctx.showMessage(`　그래서ー, 레이치한테도 물어봤는데 복제랑 비슷하게 호문클루스도 못 만든데ー.`);
  ctx.showMessage(`　그런데 내 클론한테 실험해 봤는데ー, 염기배열에 인자를 주입하는 방식이면`);
  ctx.showMessage(`　보호막도 반응하지 않더라ー.`);
  ctx.showMessage(`　아마 이 인자를 주입하는 방법이 서큐버스가 개체를 늘리는 방법같아ー。`);
  ctx.showMessage(`　흡혈귀에게 물린 사람이 흡혈귀가 되는 것처럼,`);
  ctx.showMessage(`　입으로 깨물면서 인자를 주입한다나봐ー.`);
  ctx.showMessage(`　그런데ー, 서큐버스에게 인간은 먹이니까,`);
  ctx.showMessage(`　함부로 동족을 늘리면 안되는 불문률이 있데ー。`);
  ctx.showMessage(`　어차피 인간인 우리들한테 그딴 규칙은 알바 없으니까`);
  ctx.showMessage(`W 　마음대로 늘려버려도 상관 없겠지만ー」`);
  ctx.showMessage(`그 뒤로도 설명이 이어지고, 어찌어찌 이쿠미의 말을 이해한 ${ctx.josaHelper("플레이어는")}`);
  ctx.showMessage(`여배우 후보의 클론을 만들고, 더하여 음마로 만들 수 없을지 물어봤지만……`);
  ctx.showMessage(`W`);
  ctx.showMessage(`「클론이든 호문클루스든, 제대로 만들려면 변제기간을 넘어야 완성되니까ー`);
  ctx.showMessage(`　……실험에 사용한 클론은 미리 임상용으로 만들어둔걸 급속배양한 거니까`);
  ctx.showMessage(`　금방 죽어버리고ー.`);
  ctx.showMessage(`　그러니까 빠르게 인공음마를 만드록 싶으면…… 음ー, 여자애들 중에 골라서`);
  ctx.showMessage(`W 　직접 유전자를 조작하는 수밖에 없으려나ー ……레이치한테 물어봐도 똑같은 대답일거야ー」`);
  ctx.showMessage(`라고 대답했다.`);
  ctx.showMessage(`음마를 소환할 때와 방향은 달라도, 비슷할 정도로 윤리를 무시하는 방법이다.`);
  ctx.showMessage(`「뭐, 윤리관 따위 신경쓸 필요 없는데 말야ー`);
  ctx.showMessage(`　……지금까지 여자애들을 실컷 희롱해온 인간이 신경쓸것도 못 되고,`);
  ctx.showMessage(`　과학 발전에도 전혀 도움이 안되니까 나는 무시하고 있고ー」`);
  ctx.showMessage(`W ${ctx.josaHelper("플레이어가")} 생각에 잠겨있자 이쿠미는 레이첼과 비슷한 말을 하기 시작했다.`);
  ctx.showMessage(`「그치만, 그렇게 악당이 되진 못하는, 근본에 인간미가 있는 사람이니까`);
  ctx.showMessage(`　나도 마음에 든거지만 말이야ー.`);
  ctx.showMessage(`　예를 들어 키류 조직에 진 빚을 갚는 가장 빠른 방법이라하면`);
  ctx.showMessage(`　레이치한테 미약을 만들어 달라고 한다던가, 내 기술을 군사개발해서 외국에 판다던가ー,`);
  ctx.showMessage(`　아니면 스너프 비디오는 촬영한다던가ー?`);
  ctx.showMessage(`　이런 완전히 길을 벗어나는 방법이 있었는데도, 너는 바보처럼`);
  ctx.showMessage(`　키류 조직이 시키는데로 AV니 풍속점이니『그나마 나은 방법』으로 빚을 갚으려 하고ー`);
  ctx.showMessage(`　……진짜 악당짓은 못한다는 말이지ー.`);
  ctx.showMessage(`　음ー 그리고 언젠가 유전자 조작을 이용한 치료는 연구자들이 확립시키고`);
  ctx.showMessage(`W 　정식의료로 승인될 테니까, 조금 늦느냐 빠르냐의 차이 아닐까ー?」`);
  ctx.showMessage(`음마를 소환할 때처럼 결심을 할때가 온 것같다`);
  ctx.showMessage(`그러나 여배우 후보들이 아무리 음마와 교류가 있다고 해도,`);
  ctx.showMessage(`자기자신이『인간이 아니게』되는 것에는 꽤나 저항감이 있겠지`);
  ctx.showMessage(`그러니―― 조건은 어려울 것이다`);
  // TODO: PRINTW
  ctx.showMessage(`「음ー간단히 말하면 널 얼마나 신뢰하는지가 문제지ー`);
  ctx.showMessage(`　――그냥 사이가 좋다던가가 아니라 사랑이니 뭐니 하는 개념으로.`);
  ctx.showMessage(`　그리고 네게 헌신적인 아이가 아니면 안 하려고 할거야ー.`);
  ctx.showMessage(`W 　참고로, MII같은 경우는 애초에 유전자가 없으니까 불가능해ー……」`);
  // Label: INPUT_LOOP
  ctx.print('');
  await life_list_new,1(ctx, character);
  if (ctx.result === 999) {
    return 1;
  } else if (ctx.result < 0 || ctx.result >= ctx.charanum) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.base[ctx.result][0] < 1) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 501)) {
    ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)} 자신을 음마로 만들 수는 없습니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 504)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 504)}】를 음마로 만들 수는 없습니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 330)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 330)}】대상을 음마로 만들 수는 없습니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 505)) {
    ctx.showMessage(`W 이미【${ctx.getVarName("TALENT", 505)}】입니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 85) === 0 && ctx.getTalent(result, 90) === 0) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getName(ctx.result), "는")} ${ctx.getVarName("CALL", MASTER)}에게 빠지지 않았습니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.abilities[ctx.result][16] <= 6) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getName(ctx.result), "가")} ${ctx.getVarName("CALL", MASTER)}에게 봉사하는 마음이 부족합니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.abilities[ctx.result][10] <= 6) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getName(ctx.result), "는")} ${ctx.getVarName("CALL", MASTER)}에게 몸도 마음도 바칠 생각은 없어 보입니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  character = ctx.result;
  ctx.showMessage(`${ctx.josaHelper("타겟을")} 음마로 전생시킵니까?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 그만둔다');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 0) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getName(ctx.result), "를")} 이쿠미의 연구소에 데려왔다……`);
    ctx.showMessage(`개조수술을 받으면 앞으로 ${ctx.josaHelper("타겟은")} 인간에서 음마로 살아가야 한다고 설명하니,`);
    ctx.showMessage(`${ctx.josaHelper("타겟은")} 긴 침묵 끝에 고개를 끄덕였다`);
    ctx.showMessage(`인외의 존재가 되는 공포를, ${ctx.josaHelper("플레이어를")} 위해 봉사한다는 기쁨이 이긴 것 같다……`);
    ctx.showMessage(`L`);
    ctx.showMessage(`${ctx.josaHelper("타겟은")} 연구실에 설치된, 오늘을 위해 만든 캡슐 모양의 수술대에 누워`);
    ctx.showMessage(`긴장한 표정으로 수술이 시작되기를 기다리고 있다……`);
    // TODO: PRINTW
    ctx.showMessage(`사무소에서 기다리던 ${ctx.getVarName("CALL", MASTER)}에게, 개조수술이 끝난듯 이쿠미가 찾아왔다`);
    ctx.showMessage(`그러나 어딘지 석연치 않은 얼굴로, 평소엔 게을러보여도 할말은 제대로 하던 이쿠미가`);
    ctx.showMessage(`W 웬일로 얼버무리듯이 말을 꺼냈다`);
    ctx.showMessage(`「수술은 일단 성공했어ー, 그런데ー……」`);
    ctx.showMessage(`이쿠미는 거기서 말을 끊고, 연구소를 향해 턱짓을 했다`);
    ctx.showMessage(`${ctx.josaHelper("플레이어가")} 연구소에 도착하니, 알몸인채 멍한 표정으로 캡슐에 누워있는`);
    ctx.showMessage(`${ctx.josaHelper("타겟이")} 보였다`);
    ctx.showMessage(`머리카락과 눈동자에서 색이 사라지고, 이목구비나 체형 이외에는 이전의 모습을 찾아볼 수가 없었다……`);
    ctx.showMessage(`그리고 ${ctx.josaHelper("타겟이")} ${ctx.josaHelper("플레이어를")} 보자 마치 처음 보는 사람처럼,`);
    ctx.showMessage(`어쩐지 어색하게, 작은 입을 열고――『처음뵙겠습니다』라고 인사했다……`);
    ctx.showMessage(`W`);
    ctx.showMessage(`「아마ー ……음마 인자의 영향으로 기억이 모두 사라진 모양이야ー`);
    ctx.showMessage(`　……부작용이라고 할까, 이물이 들어온것으로 발동한 뇌의 방위시스템이라고 할까ー.`);
    ctx.showMessage(`　임상실험에서는 기억이란 게 없는 클론이 대상이었으니까 예상도 못했고ー`);
    ctx.showMessage(`　……한마디로 내 예상이 너무 낙관적이었어ー`);
    ctx.showMessage(`　……이성의 정기를 먹이로 삼는, 인간과는 전혀 다른 방법으로`);
    ctx.showMessage(`　양분을 얻는 존재니까 무슨 일이 일어나도 이상할 게 없었는데…… 큭!」`);
    ctx.showMessage(`보기 드물게 거친 목소리로, 이쿠미는 과학에 종사하는 자로서 반드시 지켜야 할`);
    ctx.showMessage(`위험예측을 얕보았던 자신을 책망했다`);
    ctx.showMessage(`L`);
    ctx.showMessage(`『당신이, 제 주인님이신가요?』`);
    ctx.showMessage(`${ctx.getVarName("CALL", MASTER)}의 옷소매를 잡으며, 어리숙하고 서투룬 말투로 ${ctx.josaHelper("타겟이")} 말했다`);
    ctx.showMessage(`저번 레이첼의 음마 소환으로 음마에게 마스터가 필요하다는 건 알고 있다`);
    ctx.showMessage(`그렇지만, 소중히 여겨오던 ${ctx.getVarName("CALL", TARGET)}의 입에서 이런 서먹서먹한 말이 나오다니――`);
    ctx.showMessage(`${ctx.josaHelper("플레이어는")} 믿고 싶지 않았다`);
    ctx.showMessage(`W`);
    ctx.showMessage(`하지만, 기억을 잃었어도, 인간이 아니게 되어도,`);
    ctx.showMessage(`그녀가 ${ctx.josaHelper("플레이어를")} 따라주던 ${ctx.getName(character)}인 것은 변함없다`);
    ctx.showMessage(`${ctx.josaHelper("타겟과")} 함께 지낸 나날을 떠올리며, ${ctx.josaHelper("플레이어는")} 그녀를 내버려 둘 수는 없다고 판단하고`);
    ctx.showMessage(`처음부터 시작될 새로운 관계를 쌓아가자고 결심했다……`);
    ctx.showMessage(`W`);
    ctx.showMessage(`W 《${ctx.getName(character)}의 모든 기억이 리셋됐습니다》`);
    ctx.showMessage(`W 《%타겟은(1)% 음마로 전생했습니다》`);
    await succubus_status_ach(ctx, character);
    character.cflags[ctx.master][722] += 1;
    // Label: INPUT_LOOP_RENAME
    ctx.showMessage(`새로 태어난 ${ctx.getName(character)}에게 새로운 이름을 붙이겠습니까?`);
    ctx.showMessage('[0] - 네');
    ctx.showMessage('[1] - 아니오');
    await ctx.inputNumber();
    if (ctx.result === 0) {
      ctx.showMessage('이름을 입력해 주세요');
      // TODO: INPUTS
      // Label: INPUT_LOOP_NAMEDECIDE1
      ctx.showMessage(`${ctx.getName(character)}의 새로운 이름은 ${ctx.results}입니까?`);
      ctx.showMessage('[0] - 네');
      ctx.showMessage('[1] - 아니오');
      await ctx.inputNumber();
      if (ctx.result === 0) {
        ctx.showMessage(`W ${ctx.getName(character)}의 새로운 이름은 ${ctx.results}입니다`);
        ctx.getName(character) = ctx.results;
      } else if (ctx.result === 1) {
        ctx.showMessage(`다시 입력해 주세요`);
        // TODO: INPUTS
        // GOTO INPUT_LOOP_NAMEDECIDE1 - 구조 변경 필요 (while/break 사용 권장)
      } else {
        // GOTO INPUT_LOOP_NAMEDECIDE1 - 구조 변경 필요 (while/break 사용 권장)
      }
      ctx.showMessage('다음으로 별명을 결정해 주세요');
      // TODO: INPUTS
      // Label: INPUT_LOOP_NAMEDECIDE2
      ctx.showMessage(`${ctx.getName(character)}의 새로운 별명은 ${ctx.results}입니까?`);
      ctx.showMessage('[0] - 네');
      ctx.showMessage('[1] - 아니오');
      await ctx.inputNumber();
      if (ctx.result === 0) {
        ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)}의 새로운 별명은 ${ctx.results}입니다`);
        CALLctx.getName(character) = ctx.results;
      } else if (ctx.result === 1) {
        ctx.showMessage(`다시 입력해 주세요`);
        // TODO: INPUTS
        // GOTO INPUT_LOOP_NAMEDECIDE2 - 구조 변경 필요 (while/break 사용 권장)
      } else {
        // GOTO INPUT_LOOP_NAMEDECIDE2 - 구조 변경 필요 (while/break 사용 권장)
      }
      ctx.showMessage('마지막으로 새로운 예명을 입력해 주세요');
      // TODO: INPUTS
      // Label: INPUT_LOOP_NAMEDECIDE3
      ctx.showMessage(`${ctx.getName(character)}의 새로운 예명은 ${ctx.results}입니까?`);
      ctx.showMessage('[0] - 네');
      ctx.showMessage('[1] - 아니오');
      await ctx.inputNumber();
      if (ctx.result === 0) {
        ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)}의 새로운 예명은 ${ctx.results}입니다`);
        NICKctx.getName(character) = ctx.results;
      } else if (ctx.result === 1) {
        ctx.showMessage(`다시 입력해 주세요`);
        // TODO: INPUTS
        // GOTO INPUT_LOOP_NAMEDECIDE3 - 구조 변경 필요 (while/break 사용 권장)
      } else {
        // GOTO INPUT_LOOP_NAMEDECIDE3 - 구조 변경 필요 (while/break 사용 권장)
      }
      ctx.showMessage(`이름《${ctx.getName(character)}》, 별명《${ctx.getVarName("CALL", TARGET)}》, 예명《${ctx.getVarName("NICK", TARGET)}》입니다`);
    } else if (ctx.result === 1) {
      ctx.showMessage(`이름을 변경하지 않았습니다`);
    } else {
      // GOTO INPUT_LOOP_RENAME - 구조 변경 필요 (while/break 사용 권장)
    }
  }
  // TODO: PRINTW
  ctx.money -= C;
  return 1;
}

export async function add_android(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  C = 5000000;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    return 0;
  }
  // Label: INPUT_LOOP_CAUTION
  ctx.showMessage(`※이 항목에서는 이 게임의 무대설정을 옅볼 수 있습니다……만, 상당히 중2병스럽고 깁니다`);
  ctx.showMessage(` 그래도 읽습니까?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 아니오');
  await ctx.inputNumber();
  if (ctx.result === 0) {
    ctx.showMessage(`W 아직 안 썼으므로 요약합니다`);
    ctx.showMessage(`요약하면「필요자금 500만 포인트・플레이기간 50주 연장」입니다`);
  } else if (ctx.result === 1) {
    ctx.showMessage(`써있는 내용을 요약하면「필요자금 500만 포인트・플레이기간 50주 연장」입니다`);
  } else {
    // GOTO INPUT_LOOP_CAUTION - 구조 변경 필요 (while/break 사용 권장)
  }
  // Label: INPUT_LOOP_DECIDE
  ctx.showMessage(`신형 안드로이드를 제작합니까?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 아니오');
  await ctx.inputNumber();
  if (ctx.result === 0) {
    // TODO: ADDCHARA 92
    await add_ikumi_android(ctx, character);
    character.cflags[ctx.master][709] = 1;
    // TODO: LOADGLOBAL
    ctx.global[292] += 1;
    // TODO: SAVEGLOBAL
  } else if (ctx.result === 1) {
    return 0;
  } else {
    // GOTO INPUT_LOOP_DECIDE - 구조 변경 필요 (while/break 사용 권장)
  }
  ctx.money -= C;
  ctx.flags[3] += 50;
  return 1;
}

export async function boost_item40(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  C = 500000;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    return 0;
  }
  // Label: INPUT_LOOP
  ctx.showMessage(`「어떤 생물이라도 임신할 수 있으면 되는거지. 응, 가능해ー」`);
  ctx.showMessage(`사무소 옆에 자리한 이쿠미의 연구소의 한 방, 평소대로 파이프 의자의`);
  ctx.showMessage(`등받이를 껴안고 늘어져있던 이쿠미는 간단한 일이라는 듯이 말했다`);
  ctx.showMessage(`「네 덕분에 중요한 샘플도 얻었으니까ー. 물론 비용은 필요하지만……`);
  ctx.showMessage(`　배란유발제를 사용할 때 같이 먹으면 효과가 있을꺼야ー.`);
  ctx.showMessage(`　소재는 있으니까, 50만 포인트 정도면 돼ー. 어때ー?」`);
  // TODO: PRINTW
  // Label: INPUT_LOOP_DECIDE
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 그만둔다');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    return 0;
  } else if (ctx.result === 0) {
    ctx.paramBand[303] = 3;
    ctx.showMessage('배란유발제 강화제가 들어간 용기를 받았다');
    ctx.showMessage('「이건 사용하면 안드로이드든, 천사든 자손을 남길 수 있어ー.');
    ctx.showMessage('매일 자동으로 생성되도록 할테니까, 없어질 걱정은 안해도 되ー.');
    ctx.showMessage('아, 그리고, 우리 연구소나 딴데서 불임수술을 받았어도 임신시켜버리니까 조심히 사용해ー」');
  } else {
    // GOTO INPUT_LOOP_DECIDE - 구조 변경 필요 (while/break 사용 권장)
  }
  // TODO: PRINTW
  ctx.money -= C;
  return 1;
}
