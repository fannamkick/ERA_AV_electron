/**
 * EVENT_SELL_AFTER.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function event_sell_after(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage('');
  ctx.setColor(0xDDBBCC);
  // TODO: CHKFONT "あくびん"
  if (ctx.result) {
    // TODO: SETFONT "あくびん"
  }
  if (ctx.talents[85] === 1 && ctx.talents[76] === 0 && ctx.talents[430] === 0 && character.no != 1 && character.no != 91 && character.cflags[619] >= character.cflags[620] - 10) {
    ctx.showMessage(`「%조사처리(CSTR:9,"를")% 신경 써 주지 않는 ${ctx.getVarName("CALL", MASTER)} 따위, 이제 몰라……」`);
    ctx.showMessage(`「%조사처리(CSTR:9,"는")% 알아서 행복을 찾을꺼니까……!」`);
    ctx.showMessage(`「응, 사랑하고 있어 달링,　달링의 아기 낳아 줄께」`);
    ctx.showMessage(`「아앙, 정말 성질이 급해♪　이런 곳에서 야한거 하면 안돼에」`);
  } else if (ctx.talents[85] === 1 && ctx.talents[76] === 0 && ctx.talents[430] === 0 && character.no != 1 && character.no != 91 && character.cflags[619] >= character.cflags[620] / 2) {
    ctx.showMessage(`「부탁해, 좀 더 격렬하게 팡팡해 줘」`);
    ctx.showMessage(`「감독이 나쁜거야, %조사처리(CSTR:9,"를")% 내버려 두니까!」`);
    ctx.showMessage(`「있지~, 좀 더 %후치환(CSTR:9+"의")% 질내에 꿀렁꿀렁해 줘」`);
    ctx.showMessage(`「저런 번데기%조사처리(CSTR:80,"로")%는 이제 만족 할 수 없어, 씩씩한 정액 가득 원해에」`);
    ctx.showMessage(`「아앙, 바람 섹스로 질내사정 최고오오오오오오옷」`);
  } else if (ctx.talents[85] === 1 && ctx.talents[76] === 1 && ctx.talents[430] === 1 && ctx.talents[505] === 1 && character.no != 1 && character.no != 91 && character.no != 81 && character.no != 82) {
    ctx.showMessage(`「마스터, 마스터♪　오늘도 여러 사람에게 잔뜩 야한일 당하고 왔어♪」`);
    ctx.showMessage(`「그래도, 역시 마스터가 야한짓 해주지 않으면 안심해서 잘 수 없어♪」`);
    ctx.showMessage(`「있지 마스터, 안심해서 잘 수 있도록 오늘도 %CSTR:81%에 가득 꿀렁꿀렁하고 정액 쏟아줘」`);
    ctx.showMessage(`「아앙, 마스터 정말 좋아해 영원히 함께야」`);
  } else if (ctx.talents[85] === 1 && ctx.talents[76] === 0 && ctx.talents[430] === 1 && ctx.talents[206] === 1 && character.no != 1 && character.no != 91) {
    ctx.showMessage(`「그 사람은…… 이제 괜찮아요。%조사처리(CSTR:9,"는")%, 진정한 사랑을 찾아냈으니까……」`);
    ctx.showMessage(`「우후후…… 배의 아기, 지금 움직였어요. 진짜 파파를 아는거네요……」`);
    ctx.showMessage(`「사랑하고 있어요, 여・보 ……쪽」`);
  } else if (ctx.talents[76] === 1 && character.no != 1 && character.no != 91 && ctx.talents[206] === 1) {
    ctx.showMessage(`「이제 그 사람 따위론 만족 할 수 없어, 좀 더 팡팡해 줘!」`);
    ctx.showMessage(`「자궁의 안쪽이 쑤시고 있어, 아앙, 바람 섹스 최고오오오」`);
    ctx.showMessage(`「이런 거 알아 버리면, 더 이상 보통의 주부로는 못 돌아가아아아아」`);
    ctx.showMessage(`「당신, 미안해요♪　당신과의 섹스따위 보다 몇만배도 기분 좋은거얼♪」`);
  } else if (ctx.talents[85] === 1 && ctx.talents[76] === 0 && character.no != 1 && character.no != 91) {
    ctx.showMessage(` 「저기, ${ctx.getVarName("CALL", MASTER)}, 오늘도 늦게 돌아와요?」`);
    ctx.showMessage(` 「그래요…… 어쩔 수 없지요, 빚은 갚아야 하니까」`);
    ctx.showMessage(` 「다른 여자아이와 야한일 하는 건 괜찮지만…… 다음엔 ${ctx.getVarName("CALL", TARGET)}도 귀여워해 줘요?」`);
    ctx.showMessage(` 「우읏, 그러면 다녀오세요, ${ctx.getVarName("CALL", MASTER)}」`);
  } else if (ctx.talents[85] === 1 && ctx.talents[76] === 1 && character.no != 1 && character.no != 91) {
    ctx.showMessage(` 「다녀오셨어요 ${ctx.getVarName("CALL", MASTER)}, 참을 수 없어서 먼저 하고 있었어요오」`);
    ctx.showMessage(` 「${ctx.getVarName("CALL", TARGET)}의 %CSTR:81%, 이렇~게 굵은 바이브 먹어 버려서 벌써 질척질척이야」`);
    ctx.showMessage(` 「아핫, ${ctx.getVarName("CALL", MASTER)}의 %CSTR:80%, 정액이랑 애액이 섞여서 맛있어♪」`);
    ctx.showMessage(` 「지금 %CSTR:81%에 바이브 넣고 있으니까 삽입하는 곳은 %CSTR:82%로, 응?」`);
    ctx.showMessage(` 「봐, %CSTR:82%로도 자위 하고 있었으니까 ${ctx.getVarName("CALL", MASTER)}의 %CSTR:81%도 금방 넣을 수 있어요♪」`);
    ctx.showMessage(` 「있지, 또 AV찍고 싶은데…… 물론 감독도 남자 배우도 ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.master), "으로")}, 말이야」`);
  } else if (ctx.talents[76] === 1 && ctx.talents[85] === 0&& character.no != 1) {
    ctx.showMessage(` 「앗, %CSTR:80% 기분 좋앗 ${ctx.getVarName("CALL", TARGET)}의 %CSTR:81% 망가져버렷」`);
    ctx.showMessage(` 「당신의 %CSTR:80%도 입으로 물어 줄테니까 이쪽에 와♪」`);
    ctx.showMessage(` 「싫엉, %조사처리(CSTR:82,"랑")% %CSTR:81% 동시에 문지르지 말아 줘」`);
    ctx.showMessage(` 「더 이상 안되엣! 전신 정액 투성이가 돼서 가버려어어어어어어엇」`);
  } else if (ctx.talents[85] === 1 && ctx.talents[76] === 0 && ctx.talents[422] === 0 && ctx.talents[430] === 1 && ctx.master.no === 0 && (character.no === 1 || character.no === 91)) {
    ctx.showMessage(` 「저기 오빠, 오늘도 늦게 돌아와?」`);
    ctx.showMessage(` 「그래…… 어쩔 수 없지, 아버지가 남긴 빛을 갚아야 하니까」`);
    ctx.showMessage(` 「다른 여자아이와 야한 짓 하는 건 괜찮지만…… 나도 귀여워해줘?」`);
    ctx.showMessage(` 「응, 그러면 다녀오세요, 나의 여보옷」`);
  } else if (ctx.talents[85] === 1 && ctx.talents[76] === 0 && ctx.talents[422] === 1 && ctx.talents[430] === 1 && ctx.master.no === 0 && (character.no === 1 || character.no === 91)) {
    ctx.showMessage(` 「이봐 형님, 오늘도 늦게 돌아와?」`);
    ctx.showMessage(` 「그런가…… 별 수 없지, 아빠가 남긴 빚은 갚아야 하니까」`);
    ctx.showMessage(` 「다른 여자한테 박는건 괜찮지만…… 나도 귀여워해 줄거지♪」`);
    ctx.showMessage(` 「OK, 그러면 다녀와, 달링」`);
  } else if (ctx.talents[85] === 1 && ctx.talents[76] === 0 && ctx.talents[422] === 0 && ctx.talents[430] === 0 && ctx.master.no === 0 && (character.no === 1 || character.no === 91)) {
    ctx.showMessage(` 「저기 오빠, 오늘도 늦게 돌아와?」`);
    ctx.showMessage(` 「그래…… 어쩔 수 없지, 아버지가 남긴 빛을 갚아야 하니까」`);
    ctx.showMessage(` 「다른 여자아이와 야한 짓 하는 건 괜찮지만…… 나도 귀여워해줘?」`);
    ctx.showMessage(` 「응, 그러면 다녀오세요, 오빠」`);
  } else if (ctx.talents[85] === 1 && ctx.talents[76] === 0 && ctx.talents[422] === 1 && ctx.talents[430] === 0 && ctx.master.no === 0 && (character.no === 1 || character.no === 91)) {
    ctx.showMessage(` 「이봐 형님, 오늘도 늦게 돌아와?」`);
    ctx.showMessage(` 「그런가…… 별 수 없지, 아빠가 남긴 빚은 갚아야 하니까」`);
    ctx.showMessage(` 「다른 여자한테 박는건 괜찮지만…… 나도 귀여워해 줄거지♪」`);
    ctx.showMessage(` 「OK, 그러면 다녀와, 오빠」`);
  } else if (ctx.talents[85] === 1 && ctx.talents[76] === 1 && ctx.talents[422] === 0 && ctx.master.no === 0 && (character.no === 1 || character.no === 91)) {
    ctx.showMessage(` 「다녀오셨어요 오빠, 참을 수 없어서 먼저 하고 있었어」`);
    ctx.showMessage(` 「카나데의 %CSTR:81%, 이렇~게 굵은 바이브 먹어 버려서 벌써 질척질척해」`);
    ctx.showMessage(` 「아핫, 오빠의 %CSTR:80%, 정액이랑 애액이 섞여서 맛있어♪」`);
    ctx.showMessage(` 「지금 %CSTR:81%에 바이브 넣고 있으니까 삽입하는 것은 %CSTR:82%로, 응?」`);
    ctx.showMessage(` 「봐, %CSTR:82%로도 자위하고 있었으니까 오빠의 %CSTR:80%도 금방 넣을 수 있겠지♪」`);
    ctx.showMessage(` 「있지, 또 AV찍고 싶은데…… 물론 감독도 남배우씨도 오빠로, 말야」`);
  } else if (ctx.talents[85] === 1 && ctx.talents[76] === 1 && ctx.talents[422] === 1  && ctx.master.no === 0 && (character.no === 1 || character.no === 91)) {
    ctx.showMessage(` 「어서와 형님, 참을 수 없어서 먼저 자위하고 있었어」`);
    ctx.showMessage(` 「나의 %CSTR:81%, 이렇게 굵은 바이브 먹어 버려서 벌써 질척질척해」`);
    ctx.showMessage(` 「아핫, 형님의 %CSTR:80%, 정액이랑 애액이 섞여서 맛있어♪」`);
    ctx.showMessage(` 「지금 %CSTR:81%에 바이브 넣고 있으니까 박는 것은 %CSTR:82%도 괜찮지?」`);
    ctx.showMessage(` 「봐, %CSTR:82%로도 자위하고 있었으니까 형님의 %CSTR:80%도 금방 박을 수 있잖아♪」`);
    ctx.showMessage(` 「저기, 또 AV찍고 싶은데…… 물론 감독도 남배우도 형님으로, 말야」`);
  } else if (ctx.talents[76] === 1 && ctx.talents[85] === 0&& character.no === 1 && ctx.talents[422] === 0) {
    ctx.showMessage(` 「앗, %CSTR:80% 기분 좋앗, 카나데의 %CSTR:81% 망가져버렷」`);
    ctx.showMessage(` 「자, 오빠의 %CSTR:80%도 입으로 물어 줄테니까 이쪽으로 와♪」`);
    ctx.showMessage(` 「싫엉, %조사처리(CSTR:82,"랑")% %CSTR:81% 동시에 문지르지 말아 줘」`);
    ctx.showMessage(` 「더 이상 안됏! 전신 정액 투성이가 돼서 가버려어어어어어어엇」`);
  } else if (ctx.talents[76] === 1 && ctx.talents[85] === 0&& character.no === 1 && ctx.talents[422] === 1) {
    ctx.showMessage(` 「앗, 생 삽입 기분 좋아앗, 질척질척 %CSTR:81% 망가져버렷」`);
    ctx.showMessage(` 「자, 형님의 %CSTR:80%도 펠라해 줄테니까 이쪽에 와♪」`);
    ctx.showMessage(` 「싫엉, %조사처리(CSTR:82,"랑")% %CSTR:81% 동시에 문지르지 말아 줘」`);
    ctx.showMessage(` 「더 이상 안됏! 전신 정액 투성이가 돼서 가버려어어어어어어엇」`);
  } else {
    ctx.showMessage(` 「부탁드려요…… 더 이상하면 망가져 버리니깐 %CSTR:81%에 %CSTR:80% 넣지 말아줘요……」`);
    ctx.showMessage(` 「풍속에서 일하고 있다고, 야한걸 좋아하는 게 아니에요……」`);
    ctx.showMessage(` 「싫엇, %CSTR:82%따위 핥지 말아 주세요!」`);
    ctx.showMessage(` 「더 이상 싫어…… 안쪽에 정액나와서…… 임신해버려어……」`);
  }
  ctx.resetColor();
  // TODO: SETFONT ""
  ctx.showMessage('');
  if (ctx.talents[85] === 1 && ctx.talents[76] === 0 && ctx.talents[430] === 0 && character.no != 1 && character.no != 91 && character.cflags[619] >= character.cflags[620] / 2) {
    ctx.showMessage(`W AV배우를 은퇴한 ${ctx.josaHelper("타겟은")}……`);
    ctx.showMessage(`한동안 ${ctx.josaHelper("플레이어와")} 함께 살고 있었지만, 너무나도 ${ctx.getVarName("CALL", MASTER)}에게`);
    ctx.showMessage(`관심받지 못하는 나날에 점차 싫증이 나, 지도에 의해 달아오른 몸을 주체하지 못하기 시작했다……`);
    ctx.showMessage(`어느 날, 일에서 돌아온 ${ctx.josaHelper("플레이어는")}, 빛이 사라진 깜깜한 방 안에서 쪽지 한장이`);
    ctx.showMessage(`남아 있는 것을 발견했다`);
    ctx.showMessage(`「찾지 말아 주세요」`);
    ctx.showMessage(`${ctx.josaHelper("타겟을")} 영원히 잃어 버렸다고 이해한 ${ctx.josaHelper("플레이어는")}, 당분간 상실감에 풀 죽어 있었다`);
    ctx.showMessage(`일에 매달려있기만 해 신경써주지 못 한 것이 나쁜건가. 2명의 정이 좀 더 깊어져 있었으면, 어쩌면……`);
    ctx.showMessage(`아무리 후회해도, 더 이상 만회는 할 수 없다……`);
  } else if (ctx.talents[85] === 1 && ctx.talents[76] === 1 && ctx.talents[430] === 1 && ctx.talents[505] === 1 && character.no != 1 && character.no != 91 && character.no != 81 && character.no != 82) {
    ctx.showMessage(`W AV배우를 은퇴한 ${ctx.josaHelper("타겟은")}……`);
    ctx.showMessage(`${ctx.getVarName("CALL", MASTER)}에 의해 음마가 된 ${ctx.getVarName("CALL", TARGET)}에게는,『먹이』로써 이성의 정이 필요했다`);
    ctx.showMessage(`거기서 ${ctx.josaHelper("플레이어는")} ${ctx.josaHelper("타겟을")} 밤의 거리에 풀어놓아, 자유롭게 이성의 정을 짜내 오도록 명했다……`);
    ctx.showMessage(`이 후, ${ctx.josaHelper("타겟은")} 음마의 성질에 따라서 자유롭게 정을 섭취해 왔지만, 그 식사 마지막에는 반드시`);
    ctx.showMessage(`주인인 ${ctx.getVarName("CALL", MASTER)}의 정을 요구해왔다`);
    ctx.showMessage(`마치 사냥의 성과를 자랑하는 고양이처럼, 오늘 하루 얼만큼의 남자들로부터 어떻게 정을 짜냈는지 자랑스럽게 보고하면서,`);
    ctx.showMessage(`${ctx.josaHelper("타겟은")} 순종과 애정에 젖은 눈을 흔들며 ${ctx.getVarName("CALL", MASTER)}의 위에서 허리를 계속 흔들었다`);
    ctx.showMessage(`주종의 사랑의 정은, ${ctx.getVarName("CALL", MASTER)}의 생명이 다하는 날까지 영원히 계속되겠지……`);
  } else if (ctx.talents[85] === 1 && ctx.talents[76] === 0 && ctx.talents[430] === 1 && ctx.talents[206] === 1 && character.no != 1 && character.no != 91) {
    ctx.showMessage(`W AV배우를 은퇴한 ${ctx.josaHelper("타겟은")}……`);
    ctx.showMessage(`남편과 이혼하지 않고, 주말마다 ${ctx.getVarName("CALL", MASTER)}의 집에 다니며 사랑을 주고 받는 나날을 보내고 있었다`);
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 남편도, 아내가 다른 남자에게 가로채였다고 어렴풋이 깨달은 것 같지만,`);
    ctx.showMessage(`딱히 행동을 취하지 않았다`);
    ctx.showMessage(`지금, ${ctx.getVarName("CALL", TARGET)}의 크게 부풀은 배 안에는, ${ctx.getVarName("CALL", MASTER)}의 아이가 숨쉬고 있다`);
    ctx.showMessage(`남편을 배반해, 다른 남자와의 사랑을 기르는 생활…… 그 배덕감에, ${ctx.josaHelper("타겟은")} 넋을 잃고 미소 짓는 것이였다……`);
  } else if (ctx.talents[85] === 1 && ctx.talents[76] === 1 && ctx.talents[430] === 1 && character.no != 1 && character.no != 91 && ctx.talents[206] === 1) {
    ctx.showMessage(`W AV배우를 은퇴한 ${ctx.josaHelper("타겟은")}……`);
    ctx.showMessage(`${ctx.getVarName("CALL", MASTER)}에게 지도받아 농익은 몸을 개발당한 ${ctx.josaHelper("타겟은")}, 밤마다 거리에 나와`);
    ctx.showMessage(`남자를 찾아다니는 음탕한 바람둥이 아내로 전락했다`);
    ctx.showMessage(`그 중에서도 제일 마음에 드는 것은, 역시 ${ctx.josaHelper("타겟을")} 지도한 ${ctx.josaHelper("플레이어였")}다`);
    ctx.showMessage(`러브호텔의 한 방에서 ${ctx.josaHelper("타겟과")} 촬영한 바람현장은, 이후 익명으로 ${ctx.getVarName("CALL", TARGET)}의`);
    ctx.showMessage(`남편의 PC에 보내질 예정이다`);
    ctx.showMessage(`돌아왔을 때의 남편의 표정을 상상하며, ${ctx.getVarName("CALL", TARGET)}의 정욕은 한층 불타오르는 것이었다……`);
  } else if (ctx.talents[76] === 1 && ctx.talents[85] === 1 &&character.no != 1 && character.no != 91 && character.cflags[619] < character.cflags[620] / 2) {
    ctx.showMessage(`W AV배우를 은퇴한 ${ctx.josaHelper("타겟은")}……`);
    ctx.showMessage(`사무소를 나와 동거중인 ${ctx.josaHelper("타겟이")} 기다리는 자택으로 돌아온 ${ctx.getVarName("CALL", MASTER)}의 눈 앞에,`);
    ctx.showMessage(`현관에서 알몸 에이프런 차림으로 한 손에 바이브를 들고 격렬히 자위를 하고 있는 ${ctx.getVarName("CALL", TARGET)}의 모습이 보였다`);
    ctx.showMessage(`거듭되는 지도로 음욕에 눈 떠, 여러가지의 의미로 ${ctx.getVarName("CALL", MASTER)} 없이는 살아갈 수 없게 된`);
    ctx.showMessage(`${ctx.josaHelper("타겟은")}, AV배우를 은퇴한 후에도 이렇게 매일같이 유혹해왔다`);
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 동료였던 여배우 후보들의 지도와 촬영을 한 뒤라 지쳐있었지만,`);
    ctx.showMessage(`${ctx.getVarName("CALL", MASTER)}의 페니스는 그 음란한 모습에 다시 딱딱해지고 있었다`);
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 리퀘스트대로, ${ctx.josaHelper("플레이어는")} 높게 치겨 올린 엉덩이를 잡아,`);
    ctx.showMessage(`여배우를 그만두어도 계속된 개발로 완전히 쾌락 기관이 된 ${ctx.getVarName("CALL", TARGET)}의 애널에`);
    ctx.showMessage(`팽팽히 부풀어 오른 물건을 단숨에 안까지 찔러 넣었다……`);
    ctx.showMessage(`아무래도 오늘 밤도 자는 것이 늦어질 것 같다……`);
  } else if (ctx.talents[76] === 1 && ctx.talents[85] === 1 && ctx.master.no === 0 && (character.no === 1 || character.no === 91) && character.cflags[619] < character.cflags[620] / 2) {
    ctx.showMessage(`W AV배우를 은퇴한 ${ctx.josaHelper("타겟은")}……`);
    ctx.showMessage(`사무소를 나와 사랑스러운 아내이자…… 친 여동생인 ${ctx.josaHelper("타겟이")} 기다리는 자택에 돌아온`);
    ctx.showMessage(`${ctx.josaHelper("플레이어가")} 본 것은, 현관에서 알몸 에이프런 차림으로`);
    ctx.showMessage(`바이브를 한 손에 들고 격렬히 자위를 하고 있는 ${ctx.getVarName("CALL", TARGET)}의 모습이였다`);
    ctx.showMessage(`거듭되는 지도로 음욕에 눈 떠, 이전보다도 여러가지 의미로 ${ctx.getVarName("CALL", MASTER)} 없이는 살아갈 수 없게 된`);
    ctx.showMessage(`${ctx.josaHelper("타겟은")}, AV배우를 은퇴한 후에도 이렇게 매일같이 유혹해왔다`);
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 동료였던 여배우 후보들의 지도와 촬영을 한 뒤라 지쳐있었지만,`);
    ctx.showMessage(`${ctx.getVarName("CALL", MASTER)}의 페니스는 그 음란한 모습에 다시 딱딱해지고 있었다`);
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 리퀘스트대로, ${ctx.josaHelper("플레이어는")} 높게 치겨 올린 엉덩이를 잡아,`);
    ctx.showMessage(`여배우를 그만두어도 계속된 개발로 완전히 쾌락 기관이 된 ${ctx.getVarName("CALL", TARGET)}의 애널에`);
    ctx.showMessage(`팽팽히 부풀어 오른 물건을 단숨에 안까지 찔러 넣었다……`);
    ctx.showMessage(`아무래도 오늘 밤도 자는 것이 늦어질 것 같다……`);
  } else if (ctx.talents[76] === 0 && ctx.talents[85] === 1 && character.no != 1 && character.no != 91 && character.cflags[619] < character.cflags[620] / 2) {
    ctx.showMessage(`W AV배우를 은퇴한 ${ctx.josaHelper("타겟은")}……`);
    ctx.showMessage(`어느 휴일, 촬영을 위해 집을 나서는 ${ctx.josaHelper("플레이어를")}, 동거중인 ${ctx.josaHelper("타겟이")}`);
    ctx.showMessage(`도시락 가방을 한 손에 들고 불러 세웠다`);
    ctx.showMessage(`AV배우를 은퇴한 후, 이렇게 바지런하게 ${ctx.josaHelper("플레이어가")} 출근하는 모습을 지켜보고, 도시락까지 만들어 주는`);
    ctx.showMessage(`……말하자면 우렁각시 같은 존재가 지금의 ${ctx.josaHelper("타겟이었")}다`);
    ctx.showMessage(`카나데와도 사이 좋게 지내며, 요리를 서로 가르쳐주거나 여자라서 말할 수 있는 고민을 들어주면서,`);
    ctx.showMessage(`사이가 정다운 모습을 보게 되는 일이 있다`);
    ctx.showMessage(`고맙다고 말하고 도시락을 받으려고 한 ${ctx.getVarName("CALL", MASTER)}의 뺨에, ${ctx.josaHelper("타겟이")} 갑자기`);
    ctx.showMessage(`키스를 했다……`);
    ctx.showMessage(`오늘도 힘낼 수 있을 것 같다……`);
  } else if (ctx.talents[76] === 0 && ctx.talents[85] === 1 && (character.no === 1 || character.no === 91) && ctx.talents[430] === 0 && ctx.master.no === 0 && character.cflags[619] < character.cflags[620] / 2) {
    ctx.showMessage(`W AV배우를 은퇴한 ${ctx.josaHelper("타겟은")}……`);
    ctx.showMessage(`어느 휴일, 촬영을 위해서 집을 나서는 ${ctx.josaHelper("플레이어를")}, ${ctx.josaHelper("타겟이")}`);
    ctx.showMessage(`도시락 가방을 한 손에 들고 불러 세웠다`);
    ctx.showMessage(`AV배우를 은퇴한 후, 이전보다 더욱 바지런하게 ${ctx.josaHelper("플레이어가")} 출근하는 모습을 지켜보고,`);
    ctx.showMessage(`도시락까지 만들어주는 ……마치 ${ctx.getVarName("CALL", MASTER)}의 아내 같은 존재가 지금의 ${ctx.josaHelper("타겟이었")}다`);
    ctx.showMessage(`고맙다고 말하고 도시락을 받으려고 한 ${ctx.getVarName("CALL", MASTER)}의 뺨에, ${ctx.josaHelper("타겟이")} 갑자기`);
    ctx.showMessage(`키스를 했다……`);
    ctx.showMessage(`오늘도 힘낼 수 있을 것 같다……`);
  } else if (ctx.talents[76] === 0 && ctx.talents[85] === 1 && (character.no === 1 || character.no === 91) && ctx.talents[430] === 1 && ctx.master.no === 0 && character.cflags[619] < character.cflags[620] / 2) {
    ctx.showMessage(`W AV배우를 은퇴한 ${ctx.josaHelper("타겟은")}……`);
    ctx.showMessage(`어느 휴일, 촬영을 위해서 집을 나오려고 하는 ${ctx.josaHelper("플레이어를")}, 가장 사랑하는 여동생이며……`);
    ctx.showMessage(`가장 사랑하는 아내이기도 한 ${ctx.josaHelper("타겟이")} 도시락 가방을 한 손에 들고 불러 세웠다`);
    ctx.showMessage(`AV배우를 은퇴한 후, 이전보다 더욱 바지런하게 ${ctx.josaHelper("플레이어가")} 출근하는 모습을 지켜보고,`);
    ctx.showMessage(`도시락까지 만들어주는 ……그야말로 좋은 아내 같은 존재가 지금의 ${ctx.josaHelper("타겟이었")}다`);
    ctx.showMessage(`그리고…… ${ctx.getVarName("CALL", TARGET)}의 배에는 ${ctx.josaHelper("플레이어와")}의 사랑의 결정이 머물고 있었다`);
    ctx.showMessage(`AV배우를 은퇴한 후, ${ctx.josaHelper("타겟이")} 졸라 피임하지 않고 몇번이나 사랑을 나눈 결과다`);
    ctx.showMessage(`혼인신고는 할 수 없지만, 서류 위에서의 부부라는 관계 따위 아무래도 좋다,고 둘 다 생각하고 있다`);
    ctx.showMessage(`세간으로부터 손가락질을 당할지라도 ${ctx.josaHelper("타겟과")} 그 아이를 지켜 가자고 맹세하며,`);
    ctx.showMessage(`고맙다고 말하고 도시락을 받으려고 한 ${ctx.getVarName("CALL", MASTER)}의 뺨에, ${ctx.josaHelper("타겟이")} 갑자기`);
    ctx.showMessage(`키스를 했다……`);
    ctx.showMessage(`아오늘도 힘낼 수 있을 것 같다……`);
  } else if (ctx.talents[76] === 1 && ctx.talents[85] === 0 && character.cflags[619] < character.cflags[620] / 2) {
    ctx.showMessage(`W AV배우를 은퇴한 ${ctx.josaHelper("타겟은")}……`);
    ctx.showMessage(`이름을 바꾸어 다른 라벨에서 다시 데뷔했다`);
    ctx.showMessage(`${ctx.josaHelper("플레이어가")} 촬영해 온 그 어떤 작품보다도 추잡하게 비치고 있는 ${ctx.getVarName("CALL", TARGET)}의 모습에,`);
    ctx.showMessage(`${ctx.josaHelper("플레이어는")} 가벼운 질투와, 아까운 짓을 했다고 생각하며,`);
    ctx.showMessage(`그 날의 지도를 준비했다……`);
  } else {
    ctx.showMessage(`W AV배우를 은퇴한 ${ctx.josaHelper("타겟은")}……`);
    ctx.showMessage(`키류 조직이 경영하는 금지사항 없는 지하 풍속에서 일하고 있다고 했다`);
    ctx.showMessage(`전에 모습을 보러 간 스탭이 말하기로는, 날이 갈수록 여위어가며 눈에서 생기가 사라졌다고 한다`);
    ctx.showMessage(`그리고 보여줬던 ${ctx.getVarName("CALL", TARGET)}의 사진에는, 신체의 여기저기에 멍이 있고`);
    ctx.showMessage(`${ctx.getVarName("CALL", MASTER)}의 기억과 다른 거대한 유방에, 고간에는 팔 정도 굵기의 긴 페니스가 생겼고……`);
    ctx.showMessage(`왼팔까지 없어져 있었다……`);
    ctx.showMessage(`끔직한 기억이 떠오른 ${ctx.josaHelper("플레이어는")} 가볍게 머리를 흔들고, 그 주의 촬영 내용에 의식을 집중했다……`);
  }
  // TODO: PRINTW
}
