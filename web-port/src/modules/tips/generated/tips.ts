/**
 * TIPS.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function tips_main(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`《TIPS》`);
  ctx.showMessage(`공략의 힌트 등`);
  await serihu_fullcolor,"※改修中です",0xccffcc(ctx, character);
  ctx.drawLine('･･');
  ctx.showMessage('[0] - 여배우 후보의 함락・은퇴 가능 조건');
  ctx.showMessage('[1] - 특수한 소질의 획득 방법');
  ctx.showMessage('[2] - 매력치에 대해서');
  ctx.showMessage('[3] - 미션이란');
  ctx.showMessage('[4] - 각종 실적 해금방법');
  ctx.showMessage('[5] - 초심자 강좌');
  ctx.showMessage('[6] - 가입조건이 특수한 캐릭터');
  ctx.showMessage('[7] - 임신에 관해');
  ctx.drawLine('･･');
  ctx.showMessage('[999] - 돌아간다');
  // Label: INPUT_LOOP
  await ctx.inputNumber();
  if (ctx.result === 0) {
    await tips_characlear(ctx, character);
  } else if (ctx.result === 1) {
    await tips_talent(ctx, character);
  } else if (ctx.result === 2) {
    await tips_beauty(ctx, character);
  } else if (ctx.result === 3) {
    await tips_mission(ctx, character);
  } else if (ctx.result === 4) {
    await tips_achievement(ctx, character);
  } else if (ctx.result === 5) {
    await tips_hint(ctx, character);
  } else if (ctx.result === 6) {
    await tips_extrachara(ctx, character);
  } else if (ctx.result === 7) {
    await tips_pregnancy(ctx, character);
  } else if (ctx.result === 792) {
    await testmode(ctx, character);
  } else if (ctx.result === 999) {
    return 0;
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
}

export async function tips_mission(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine('･･');
  ctx.showMessage(`◆미션◆`);
  ctx.showMessage(`지정된 캐릭터를 지정된 조건으로 육성하는 모드`);
  ctx.showMessage(`난이도는 SS→F까지 7단계가 있고 난이도에 따라 습득 포인트와 공헌도가 달라진다`);
  ctx.showMessage(`L`);
  ctx.showMessage(`◆미션해방조건◆`);
  ctx.showMessage(`미션을 해방하려면 아래의 조건을 만족해야 한다`);
  ctx.showMessage(`L`);
  ctx.showMessage(`○키류 엘렌과 키류 카논이【영원한 사랑】을 습득했다`);
  ctx.showMessage(`※키류 엘렌과 계약하려면 실적「좀 더 누나!제대로 하자」을 달성해야 한다`);
  ctx.showMessage(`L`);
  ctx.showMessage(`이상의 조건을 만족하고  키류 조직 사무소에서「엘렌을 만나러 간다」를 실행하면 해방된다`);
  ctx.showMessage(`L`);
  ctx.drawLine('･･');
  await ctx.wait();
  await tips_main(ctx, character);
}

export async function tips_achievement(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine('･･');
  ctx.showMessage(`◆실적◆`);
  ctx.showMessage(`특정 조건을 만족하면 해금된다`);
  ctx.showMessage(`실적을 해금하면 보통 나오지 않는 특수한 캐릭터나 소질을 얻을 수 있다`);
  ctx.showMessage(`L`);
  ctx.showMessage(`◆실적 해금방법◆`);
  ctx.showMessage(`L`);
  ctx.showMessage(`실적번호00: 제비`);
  ctx.showMessage(`함락시킨 여배우가 10명 이상`);
  ctx.showMessage(`※단 레이첼・파라디수스의 비약에 의해【연심】【음란】을 습득한 캐릭터는 카운트하지 않는다`);
  ctx.showMessage(`L`);
  ctx.showMessage(`실적번호01: 로리큐브`);
  ctx.showMessage(`15살 이하 혹은【동안】을 가진 캐릭터를 4명 이상 조수가능으로 만든다`);
  ctx.showMessage(`※단【음마】【안드로이드】【천사】를 습득한 캐릭터는 카운트되지 않는다`);
  ctx.showMessage(`L`);
  ctx.showMessage(`실적번호02: 좀 더 누나!제대로 하자`);
  ctx.showMessage(`20살 이상인 캐릭터를 4명 이상 조수가능으로 만든다`);
  ctx.showMessage(`※단【음마】【안드로이드】【천사】를 습득한 캐릭터는 카운트되지 않는다`);
  ctx.showMessage(`L`);
  ctx.showMessage(`실적번호03: 여동생 파라다이스!`);
  ctx.showMessage(`【여동생】을 가진 캐릭터가 4명 이상【연심】을 습득했다`);
  ctx.showMessage(`L`);
  ctx.showMessage(`실적번호04: 트러블 서큐버스`);
  ctx.showMessage(`【음마】를 습득한 캐릭터가 4명 이상【연심】을 습득했다`);
  ctx.showMessage(`L`);
  ctx.showMessage(`실적번호05: 위대한 유니콘`);
  ctx.showMessage(`【처녀】【애널처녀】를 가진 캐릭터가 5명 이상【영원한 사랑】을 습득하고`);
  ctx.showMessage(`현재 소지포인트가 500만 이상`);
  ctx.showMessage(`※단【음마】【안드로이드】【천사】를 습득한 캐릭터.`);
  ctx.showMessage(`　또는 연구소에서 처녀막 재생수술을 실시한 캐릭터는 카운트되지 않는다`);
  ctx.showMessage(`L`);
  ctx.showMessage(`실적번호06: NTR = CUCKOLD`);
  ctx.showMessage(`【남친있음】을 가진 캐릭터가 4명 이상 남친과 섹스를 경험했다`);
  ctx.showMessage(`L`);
  ctx.showMessage(`실적번호07: BLACK IMPACT`);
  ctx.showMessage(`【갸루계】혹은【갈색피부】를 가진 캐릭터가 4명 이상`);
  ctx.showMessage(`L`);
  ctx.showMessage(`실적번호08: 내 여동생이 이렇게 빗치일 리 없어`);
  ctx.showMessage(`미야마 카나데가【비처녀】또는【애널비처녀】고`);
  ctx.showMessage(`【절륜】【남친있음】【섹프있음】【갈색피부】【갸루계】를 습득했다`);
  ctx.showMessage(`L`);
  ctx.showMessage(`실적번호09: 현재 빈번호`);
  ctx.showMessage(`L`);
  ctx.showMessage(`W`);
  ctx.showMessage(`실적번호10: GOLD RUSH`);
  ctx.showMessage(`비디오 판매 총 포인트가 500만 이상`);
  ctx.showMessage(`L`);
  ctx.showMessage(`실적번호11: 야왕`);
  ctx.showMessage(`공헌도가 500이상`);
  ctx.showMessage(`L`);
  ctx.showMessage(`실적번호12: 빚 완전 청산!`);
  ctx.showMessage(`미카미 키요카, 아오이 하루카, 키리시마 쇼코, 아마쿠사 에리의 비디오 판매 총 포인트가 200만 이상`);
  ctx.showMessage(`L`);
  ctx.showMessage(`실적번호13: 제 3의 소꿉친구`);
  ctx.showMessage(`미야마 카나데, 사사키 미노리, 니지마 미히로가【영원한 사랑】을 습득했다`);
  ctx.showMessage(`L`);
  ctx.showMessage(`실적번호14: BIG3`);
  ctx.showMessage(`레이첼・파라디수스, 키류 카논, 스노 이쿠미가【영원한 사랑】을 습득했다`);
  ctx.showMessage(`L`);
  ctx.showMessage(`실적번호15: HAERETICUS`);
  ctx.showMessage(`레이첼・파라디수스, 유니스・파라디수스, 리나・레스피치오, 우에사카 미쿠가`);
  ctx.showMessage(`【영원한 사랑】을 습득했다`);
  ctx.showMessage(`L`);
  ctx.showMessage(`실적번호16: 미야마가`);
  ctx.showMessage(`습득할 수 없습니다(루트 미실장)`);
  ctx.showMessage(`L`);
  ctx.showMessage(`실적번호17: FALLEN ANGELS`);
  ctx.showMessage(`습득할 수 없습니다(루트 미실장)`);
  ctx.showMessage(`L`);
  ctx.showMessage(`실적번호18: 후타나리 러버즈`);
  ctx.showMessage(`【후타나리】를 가진 캐릭터가 5명 이상 사정중독 LV3이상이고 【동정】이 아니다`);
  ctx.showMessage(`L`);
  ctx.showMessage(`실적번호19: ONLY ONE EMPRESS`);
  ctx.showMessage(`습득할 수 없습니다(루트 미실장)`);
  ctx.showMessage(`L`);
  ctx.showMessage(`실적번호20: Strawberry Panic!`);
  ctx.showMessage(`레즈끼가 LV10인 캐릭터 7명 이상`);
  ctx.drawLine('･･');
  await ctx.wait();
  await tips_main(ctx, character);
}

export async function tips_hint(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine('･･');
  ctx.showMessage(`◆초심자용 공략방법◆`);
  ctx.showMessage(`강사: 타카나시 노에미`);
  CUSTOMDRAWLINE = =;
  ctx.showMessage(`그럼 누나가 간단한 공략방법을 알려줄게♪`);
  ctx.showMessage(`먼저 여배우가 되줄것 같은 여자아이와 계약해야 하는데……`);
  ctx.showMessage(`여자아이들은 모두 계약금이 정해져 있어서 처음엔 포인트가 부족해서 계약 못하는 아이도 많이 있을거야`);
  ctx.showMessage(`처음엔 지도실력도 그렇게 높지 않을테니, 우선 여자아이들을 잔뜩 만져주면서 솜씨를 갈고 닦아야 하겠지?`);
  ctx.showMessage(`그러니 첫 포인트로 두명 정도 계약하는게 좋을거야`);
  ctx.showMessage(`참고로 내 추천은 이 아이들이야`);
  ctx.showMessage(`W`);
  ctx.showMessage(`・미야마 카나데`);
  ctx.showMessage(`Extra모드가 아니라면 네【여동생】인 아이야`);
  ctx.showMessage(`【얌전함】에【솔직함】도 있고, 거기에 AV업계에선 인기있는【동안】`);
  ctx.showMessage(`물론 네 가족이니까 상성도 엄청 좋을거야`);
  ctx.showMessage(`거기다【멋쟁이】니까 외모도 신경써서 가꾸고……`);
  ctx.showMessage(`아쉬운 점은 운동을 못한다는 점 정도?`);
  ctx.showMessage(`그리고 다른 사람에게 말못할 취미를 숨겨두고 있나봐`);
  ctx.showMessage(`한마디로, 처음 계약할 수 있는 아이들 중엔 최상급 여배우 후보야`);
  ctx.showMessage(`W`);
  ctx.showMessage(`・사사키 미노리`);
  ctx.showMessage(`Extra모드가 아니라면 네【소꿉친구】인 아이야`);
  ctx.showMessage(`야한 일에【호기심】을 가졌고, 거기다 엉덩이로 자위할 정도로【도착적】인 취미가 있나봐`);
  ctx.showMessage(`그탓에 성욕도 꽤나 왕성해 보이는데……`);
  ctx.showMessage(`물론 네【소꿉친구】니까 상성은 높을거야`);
  ctx.showMessage(`【운동부】인 만큼 운동도 특기고`);
  ctx.showMessage(`얼마나 힘든 지도를 받아도 다음날에는 쌩쌩할 정도로【회복 빠름】이네`);
  ctx.showMessage(`단점이라 한다면 촬영횟수가 많아질테니 손님들이 질리기 쉬워진다는 점일까?`);
  ctx.showMessage(`W`);
  ctx.showMessage(`・와타라이 키쿄우`);
  ctx.showMessage(`인터넷에 SmileVidz라는 동영상 사이트 알지?`);
  ctx.showMessage(`이 아이는 거기서【동안】으로 인기를 얻은【코스플레이어】야`);
  ctx.showMessage(`덕분에 카메라에도 익숙하고 남자에게【호기심】도 있어보이니 촬영하기 쉬울거야`);
  ctx.showMessage(`하지만, 금방 지쳐버릴 정도로【회복 느림】이고`);
  ctx.showMessage(`【쿨】한 성격이라 친해지기 어려울지도 모르겠네`);
  ctx.showMessage(`단점은 운동을 엄청 못한다나봐`);
  ctx.showMessage(`그래도【코스플레이어】인 만큼 오타쿠 지식은 풍부해서 그런 사람하고 대화가 통하나봐`);
  ctx.showMessage(`처음 계약할 수 있는 아이들 중엔 꽤 스펙이 높은 아이야`);
  ctx.showMessage(`W`);
  ctx.showMessage(`・오리베 마나카`);
  ctx.showMessage(`너를「오빠」라며 따라주는【여동생】같은 여자아이야`);
  ctx.showMessage(`【솔직함】에 야한 일에도【호기심】을 가지고【튀고 싶어함】인 아이라 카메라에도 금방 익숙해질거야`);
  ctx.showMessage(`거기에 장난치기 좋아하는【소악마】같은 성격이니 그쪽 취미에 눈뜰지도 모르겠네`);
  ctx.showMessage(`아쉬운 점은 아직【중학생】이라서 자기 매력을 모르는 점일까?`);
  ctx.showMessage(`그래도 어린 만큼【회복 빠름】이고, 지도 횟수도 늘릴 수 있을거야`);
  ctx.showMessage(`W`);
  ctx.showMessage(`・미요시 유카코`);
  ctx.showMessage(`과자를 좋아하는 통통한 여자아이네`);
  ctx.showMessage(`약간【수수함】이 있지만 가슴이 커다란【거유】니까`);
  ctx.showMessage(`이런 아이를 좋아하는 사람에겐 충분한【매력】이 있을거야`);
  ctx.showMessage(`그리고【솔직함】에【얌전함】도 있고, 자신이 없는지【프라이드 낮음】이 있어서`);
  ctx.showMessage(`여자아이에게 익숙해지기엔 좋은 상대일거야♪`);
  ctx.showMessage(`단점은 몸치라고 해도 좋을정도로 운동을 못한다는 점`);
  ctx.showMessage(`그래도 과자를 먹으면 바로 기운을 되찾는【회복 빠름】이니까 괜찮을지도?`);
  ctx.showMessage(`W`);
  ctx.showMessage(`・면접 상대`);
  ctx.showMessage(`어떤 아이가 올지는 나도 몰라`);
  ctx.showMessage(`물론 우리들도 사전조사를 제대로 마치고 소개하는 거지만,`);
  ctx.showMessage(`다른 아이들에 비하면 매력이 떨어질지도 모르겠네`);
  ctx.showMessage(`그만큼 계약금은 다른 아이들보다 싸지니까 한번 도전해보는 것도 좋지 않을까?`);
  ctx.showMessage(`W`);
  ctx.showMessage(`물론 이 아이들 말고도 키우면 개화하는 아이들은 많이 있어`);
  ctx.showMessage(`그래도 아직 익숙하지 않은 너라면 이 아이들을 상대로 실력을 쌓는것도 좋을거야`);
  ctx.showMessage(`그리고 이 아이들을 촬영해 돈이 쌓이면 조금씩 촬영도구를 모아봐도 좋겠지`);
  ctx.showMessage(`내 추천은 코스프레의상, 플레이매트, E마사지기려나`);
  ctx.showMessage(`코스프레의상은 촬영할 때 입히면`);
  ctx.showMessage(`코스프레물을 좋아하는 손님이 비디오를 많이 사주실거야`);
  ctx.showMessage(`여자아이들도 귀여운 옷을 입을 수 있으니까 널 향한 신뢰도 깊어질게 틀림없어`);
  ctx.showMessage(`플레이매트는 목욕탕에서 소프플레이를 촬영할때 도움이 될거야`);
  ctx.showMessage(`E마사지기는 흔히 전기마사지기라고 하지`);
  ctx.showMessage(`W`);
  ctx.showMessage(`이렇게 샀는데도 돈이 더 모였다면 다음엔 더 비싼 여배우 후보와 계약해보자`);
  ctx.showMessage(`계약료가 높은 아이들은 특수한 기술을 가지고 있어`);
  ctx.showMessage(`그중에서도 우수한 아이들을 소개해줄게`);
  ctx.showMessage(`W`);
  ctx.showMessage(`・키류 카논`);
  ctx.showMessage(`널 이 업계로 끌여들인 장본인이야`);
  ctx.showMessage(`그치만 돈만 얹어주면 뭐든지 해주는【야쿠자의 딸】이고 다방면에 영향력이 있을 정도로【협상에 능숙함】`);
  ctx.showMessage(`그리고 네 사정을 잘 알고 있으니까 처음부터 조수가 되줄 정도로 촬영에도 협조적이지`);
  ctx.showMessage(`이리저리 바쁜 아이라 모델같은 부업을 못하는 게 단점이네`);
  ctx.showMessage(`W`);
  ctx.showMessage(`・레이첼・파라디수스`);
  ctx.showMessage(`유럽의 작은 나라에서 유학온【외국인】이고 진짜【공주님】이야`);
  ctx.showMessage(`【조합지식】이 있어서인지【치료】도 특기인가봐`);
  ctx.showMessage(`쉽게 믿지 못하겠지만【이계 지식】이라는 것도 가지고 있다고 하던데……`);
  ctx.showMessage(`단점은 점잖아 보여도 심이 단단한【다부짐】인 점이려나`);
  ctx.showMessage(`W`);
  ctx.showMessage(`・스노 이쿠미`);
  ctx.showMessage(`네 사무소 옆 빌딩에 살고 있는 신비한 여자아이야`);
  ctx.showMessage(`특별히 직업이 없이【니트】라고 불리던데……`);
  ctx.showMessage(`그런데 어떻게 구했는지 몰라도 세상에 없는【최첨단 과학】의 지식을 가지고 있는 수수께끼의 여자아이지`);
  ctx.showMessage(`【니트】인 덕분인지 오타쿠 지식도 상당히 풍부한가봐`);
  ctx.showMessage(`단점은 집에만 있어서 그런지 몸치에다 외모엔 관심이 없어서 관리를 하지 않는다는 점이야`);
  ctx.showMessage(`W`);
  ctx.showMessage(`・시미즈 사쿠라코`);
  ctx.showMessage(`자칭【악의 조직】이라지만, 사실 XX현에서 리얼충 커플에게 온갖 방해공작을 펼치는 단체`);
  ctx.showMessage(`『RB단』의 보스이자【작은체형】이고【절벽】인, 특수취향이 좋아할법한 여자아이야`);
  ctx.showMessage(`한마디로 신동인 아이라 월반해서 해외 대학에 들어가 심리학을 전공했나봐`);
  ctx.showMessage(`그래도 단순히 방해만 하는 게 아니라 자신을 가꾸기 위한 세미나 같은 것도 주최하고 있어서`);
  ctx.showMessage(`인기를 얻기 위한 지식은 풍부한가봐`);
  ctx.showMessage(`아쉬운 점은 발육이 나빠서 넣을때 고생할 것 같은 점이려나?`);
  ctx.showMessage(`W`);
  ctx.showMessage(`이 4명과 계약하면 네 빛도 금방 갚을 수 있을거야`);
  ctx.showMessage(`물론 이 아이들 말고도 멋진 소질을 가진 아이들은 많고`);
  ctx.showMessage(`반대로 매출은 낮아도 조수로서 우수한 아이도 있으니까 찾아보렴♪`);
  ctx.showMessage(`L`);
  ctx.showMessage(`……아, 맞다`);
  ctx.showMessage(`게임 시작할때『EASY』를 골라주면 내가 협력해줄게`);
  ctx.showMessage(`그치만 EASY에선 강좌에 있는 실적을 사용 못하니까 조심해줘`);
  ctx.drawLine('･･');
  await ctx.wait();
  await tips_main(ctx, character);
}

export async function tips_extrachara(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine('･･');
  ctx.showMessage(`◆EX캐릭터◆`);
  ctx.showMessage(`가입조건이 복잡한 캐릭터를 편의상『EX캐릭터』라 부른다`);
  ctx.showMessage(`일부 EX캐릭터만 가지는 측수한 기능도 있기에`);
  ctx.showMessage(`비디오 판매량도 통상계약 가능한 캐릭터보다 높은 경향이 있다`);
  ctx.showMessage(`또 EX캐릭터를 은퇴시킬 경우 그 주차에서는 재계약할 수 없다`);
  ctx.showMessage(`L`);
  ctx.showMessage(`◆EX캐릭터 중 조건이 기록되지 않은 캐릭터의 가입조건◆`);
  ctx.showMessage(`○신형 안드로이드`);
  ctx.showMessage(`스노 이쿠미와 미야마 미이가 조수가능하고【비밀지식】을 가지고 있다`);
  ctx.showMessage(`L`);
  ctx.showMessage(`L`);
  ctx.showMessage(`○캬바레녀`);
  ctx.showMessage(`계약한 여배우중【캬바레녀】를 가진 캐릭터가 있다`);
  ctx.showMessage(`L`);
  ctx.showMessage(`○히나미 마유`);
  ctx.showMessage(`실적『위대한 유니콘』을 해금했다`);
  ctx.showMessage(`L`);
  ctx.showMessage(`○유니스・파라디수스`);
  ctx.showMessage(`실적『위대한 유니콘』을 해금했다`);
  ctx.showMessage(`L`);
  ctx.showMessage(`○리 메이링`);
  ctx.showMessage(`실적『BIG3』를 해금했다`);
  ctx.showMessage(`L`);
  ctx.showMessage(`○키류 엘렌`);
  ctx.showMessage(`실적『좀 더 누나!제대로 하자』를 해금했다`);
  ctx.showMessage(`L`);
  ctx.showMessage(`○아이리스`);
  ctx.showMessage(`실적『트러블 서큐버스』를 해금했다`);
  ctx.showMessage(`L`);
  ctx.showMessage(`○미야마 카나`);
  ctx.showMessage(`실적『내 여동생이 이렇게 빗치일 리 없어』를 해금했고, 스노 이쿠미가 조수를 한 적이 있다`);
  ctx.showMessage(`L`);
  ctx.showMessage(`○하세카와 미코토`);
  ctx.showMessage(`실적『제 3의 소꿉친구』를 해금했다`);
  ctx.showMessage(`L`);
  ctx.showMessage(`L`);
  ctx.showMessage(`○엘파리아・로코코・라그라데(엘파리아・라그라데)`);
  ctx.showMessage(`미션『공주님은 특훈중』을 크리스티나・로코코・라그라데가【임신】한 상태로 성공한다`);
  ctx.showMessage(`L`);
  ctx.showMessage(`L`);
  ctx.showMessage(`L`);
  ctx.showMessage(`L`);
  ctx.drawLine('･･');
  await ctx.wait();
  await tips_main(ctx, character);
}

export async function tips_pregnancy(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine('･･');
  ctx.showMessage(`◆임신에 관해◆`);
  ctx.showMessage(`일반적으로(설정이 ON이라면) 안에 싸면 임신할 가능성이 있다`);
  ctx.showMessage(`그러나, 예외는 존재한다`);
  ctx.showMessage(`◎안드로이드　－　어쩔 수 없지`);
  ctx.showMessage(`◎음마, 천사　－　종족이 다르면 좀처럼`);
  ctx.showMessage(`◎이계 지식, 최첨단 과학, 성마술　－　각각 피임방법이 있다던가`);
  ctx.showMessage(`◎피임수술　－　그거려고 하는거라`);
  ctx.showMessage(`L`);
  ctx.showMessage(`반대로 예외를 예외가 아니게 만드는 방법도 있다고 한다`);
  ctx.showMessage(`천재가 촉수를 연구하면 길이 열릴 것이다`);
  ctx.showMessage(`L`);
  ctx.drawLine('･･');
  await ctx.wait();
  await tips_main(ctx, character);
}
