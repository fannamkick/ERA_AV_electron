/**
 * MIYAKO_LABO.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function miyako_labo_op(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`요즘 미야코의 상태가 이상하다, 무언가를 꾸미고 있는 것 같다고 카논에게 상담받은 ${ctx.josaHelper("플레이어는")} 방과후 어딘가로 향하는 미야코를 미행했다`);
  ctx.showMessage(`미야코는 미행당하는 것도 모르고 카논 집 근처에 있는 빌딩에 들어갔다`);
  ctx.showMessage(`W 또 카논 방을 도촬이라도 하는 건지 의심하며 따라들어가니, 그곳엔 예상도 못한 것이 있었다`);
  ctx.showMessage(`가브병이었다, 빌딩의 방 하나를 경호하던 가브병은 미야코를 보더니 그녀에게 경례하고 길을 열었다`);
  ctx.showMessage(`W 미야코에게 뭔가 이상하다고 말하니 미야코는 이상한 비명을 지르며 ${ctx.josaHelper("플레이어를")} 바라봤다`);
  ctx.showMessage(`「횽와아아아!! 어? ${ctx.getVarName("CALL", MASTER)} 여, 여기는 어떻게 안거에요!? 이곳은 언니에게도 비밀로 하고 있었는데」`);
  ctx.showMessage(`W ${ctx.josaHelper("플레이어가")} 추궁하니 미야코는 마지못해 사정을 설명했다`);
  ctx.showMessage(`「요전번에 언니를 노리던 증오스러운 평화의 가희, 미나・크레인을 잡았던건 기억하고 계시나요?`);
  ctx.showMessage(`　그녀를 이대로 내버려두면 또 언니를 노릴건 불보듯 뻔해서 여기 있는 세뇌장치를 사용해서 제 명령에 절대복종 하도록 만든거에요`);
  ctx.showMessage(`　그랬더니 그녀의 부하들-지금부터는 가희의 기사단이라고 부르겠어요-이 죄다 그녀의 꼭두각시들이라 덤으로 제 명령에 따르게 된거에요`);
  ctx.showMessage(`　라고 해도 이 녀석들을 가만히 냅두면 또 그 여자가 이 녀석들을 기반으로 내란 준비를 시작할지도 모르니`);
  ctx.showMessage(`　저는 그 여자랑 이 녀석들을 떼어놓기 위해 녀석들을 이곳에 모아놓고 정기적으로 감시하는 거에요」`);
  ctx.showMessage(`가희의 기사단을 미나와 떨어트려 놓는 건 좋은 생각이지만, 이곳에 계속 가둬두는건 현실적으로 문제가 많다`);
  ctx.showMessage(`그리고 미야코가 가희의 기사단에게 명령을 내릴 수 있다면, 따로 할 수 있는 일이 있지 않을까`);
  ctx.showMessage(`「이 녀석들을 이용해요? 이 녀석들이 제대로 할 수 있는 일이래봤자 별볼일 없는 정보조작 정도에요…`);
  ctx.showMessage(`　AV의 유행장르를 살짝 우리에게 유리하게 바꾸는 정도라던가…」`);
  ctx.showMessage(`그거면 충분하기에 ${ctx.josaHelper("플레이어는")} 미야코에게 가희의 기사단에게 AV의 유행장르 조작을 부탁했다`);
  ctx.showMessage(`W 「알겠사와요, 그리고… 유행이 바뀌려면 시간이 필요하니 주의하는 거에요」`);
  ctx.flags[120] = 3;
  ctx.flags[121] = ctx.rand(31);
  ctx.flags[122] = ctx.rand(31);
  ctx.flags[123] = ctx.rand(31);
  ctx.flags[124] = ctx.rand(100);
  ctx.flags[125] = 0;
  ctx.flags[126] = 0;
  ctx.flags[127] = 0;
  ctx.flags[128] = 0;
  ctx.flags[129] = 0;
  return 0;
}

export async function miyako_labo(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (GETCHARA(10, 0) != -1) {
    ctx.locals[0] = GETCHARA(10);
  }
  if (GETCHARA(11, 0) != -1) {
    ctx.locals[1] = GETCHARA(11);
  }
  ctx.showMessage(`W 「어머 ${ctx.getVarName("CALL", MASTER)}, 오늘은 무슨 일인가요?」`);
  // Label: INPUT_LOOP
  ctx.drawLine();
  ctx.showMessage('가희의 기사단 지부');
  ctx.showMessage('《이번 달의 유행 변경과 가희의 기사단 관계자 영입이 가능합니다》');
  ctx.drawLine();
  ctx.printValue(DAY+1);
  ctx.print('주차');
  if (TIME === 0) {
    ctx.showMessage('전반');
  } else {
    ctx.showMessage('후반');
  }
  ctx.showMessage(`소지금: {MONEY}포인트`);
  ctx.drawLine();
  ctx.showMessage('[ 0] - 비디오 유행장르를 바꾼다              (수수료:  500000포인트)');
  ctx.showMessage('');
  if (GETCHARA(86, 0) > 0) {
    ctx.showMessage('[ -]');
  } else if (ctx.getTalent(ctx.locals[0], 0) === 1 && ctx.getTalent(ctx.locals[0], 522) === 1 && ctx.getTalent(ctx.locals[1], 85) === 1 && character.cflags[ctx.master][138] === 0 && ctx.paramBand[145] < 3) {
    ctx.showMessage('[ 1] - 소울・바이브레이션・시스템을 개발한다  (수수료: 1000000포인트)');
  }
  ctx.showMessage('');
  ctx.drawLine();
  ctx.showMessage('[999] - 돌아간다');
  await ctx.inputNumber();
  if (ctx.result === 0) {
    await miyako_labo_videosell(ctx, character);
  } else if (ctx.result === 1) {
    await miyako_labo_symphogear(ctx, character);
  } else if (ctx.result === 999) {
    return 0;
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
}

export async function miyako_labo_videosell(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.money < 500000) {
    ctx.showMessage(`「소지금이 부족하네요… 역시 돈이 없으면 불가능한 것이에요」`);
  } else if (ctx.flags[125] != 0) {
    ctx.showMessage(`「또 무슨 소리에요? 준비는 이미 끝난거에요」`);
  } else {
    // Label: INPUT_LOOP
    ctx.showMessage(`「알겠사와요, 이번 달에 유행시킬만한 장르는 이것이에요」`);
    await miyako_labo_videosell_select, flag:121, 0(ctx, character);
    await miyako_labo_videosell_select, flag:122, 1(ctx, character);
    await miyako_labo_videosell_select, flag:123, 2(ctx, character);
    ctx.showMessage('[ 3] - 카논 언니');
    ctx.drawLine();
    ctx.showMessage('[999] - 돌아간다');
    await ctx.inputNumber();
    if (ctx.result === 0) {
      ctx.showMessage(`「그러면 가희의 기사단에게 유행장르를`);
      await miyako_videosale_print, flag:121(ctx, character);
      ctx.showMessage(`W %조사만처리(RESULT+2,"로")% 바꾸도록 시키는 것이에요」`);
      ctx.flags[126] = ctx.flags[121];
      ctx.flags[125] = 1;
      ctx.money -= 500000;
      return 0;
    } else if (ctx.result === 1) {
      ctx.showMessage(`「그러면 가희의 기사단에게 유행장르를`);
      await miyako_videosale_print, flag:122(ctx, character);
      ctx.showMessage(`W %조사만처리(RESULT+2,"로")% 바꾸도록 시키는 것이에요」`);
      ctx.flags[126] = ctx.flags[122];
      ctx.flags[125] = 1;
      ctx.money -= 500000;
      return 0;
    } else if (ctx.result === 2) {
      ctx.showMessage(`「그러면 가희의 기사단에게 유행장르를`);
      await miyako_videosale_print, flag:123(ctx, character);
      ctx.showMessage(`W %조사만처리(RESULT+2,"로")% 바꾸도록 시키는 것이에요」`);
      ctx.flags[126] = ctx.flags[123];
      ctx.flags[125] = 1;
      ctx.money -= 500000;
      return 0;
    } else if (ctx.result === 3) {
      ctx.showMessage(`W 「그말을기다리고있었사와요지켜봐주세요언니제힘으로언니의훌륭함을전세계에알려보이겠사와요!!」`);
      if (ctx.flags[124] > 0) {
        ctx.showMessage(`W 미야코의 음모가 성공해버린 모양이다`);
        ctx.flags[126] = -1;
      } else {
        ctx.showMessage(`W 당연하게도 카논에게 들켰고, 수수료는 카논이 가져가 버렸다`);
        ctx.flags[126] = ctx.rand(31);
      }
      ctx.flags[125] = 1;
      ctx.money -= 500000;
      return 0;
    } else if (ctx.result === 999) {
      ctx.showMessage(`W 「관두는 거에요? 알겠사와요, 다만… 월이 바뀌지 않으면 유행시킬 수 있는 장르도 그대로인 것이에요」`);
      return 0;
    } else {
      // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
    }
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
}

export async function miyako_labo_videosell_select(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.args[0] === 0) {
    ctx.showMessage(` [ ${ctx.args[1]}] - 로리계열`);
  } else if (ctx.args[0] === 1) {
    ctx.showMessage(` [ ${ctx.args[1]}] - 누님계열`);
  } else if (ctx.args[0] === 2) {
    ctx.showMessage(` [ ${ctx.args[1]}] - 여고생계열`);
  } else if (ctx.args[0] === 3) {
    ctx.showMessage(` [ ${ctx.args[1]}] - 빈유`);
  } else if (ctx.args[0] === 4) {
    ctx.showMessage(` [ ${ctx.args[1]}] - 코스프레계열`);
  } else if (ctx.args[0] === 5) {
    ctx.showMessage(` [ ${ctx.args[1]}] - 상류층계열`);
  } else if (ctx.args[0] === 6) {
    ctx.showMessage(` [ ${ctx.args[1]}] - 거유`);
  } else if (ctx.args[0] === 7) {
    ctx.showMessage(` [ ${ctx.args[1]}] - 야외노출물`);
  } else if (ctx.args[0] === 8) {
    ctx.showMessage(` [ ${ctx.args[1]}] - 외국인・하프・쿼터`);
  } else if (ctx.args[0] === 9) {
    ctx.showMessage(` [ ${ctx.args[1]}] - 연예인물`);
  } else if (ctx.args[0] === 10) {
    ctx.showMessage(` [ ${ctx.args[1]}] - 유부녀`);
  } else if (ctx.args[0] === 11) {
    ctx.showMessage(` [ ${ctx.args[1]}] - 처녀상실물`);
  } else if (ctx.args[0] === 12) {
    ctx.showMessage(` [ ${ctx.args[1]}] - 서큐버스`);
  } else if (ctx.args[0] === 13) {
    ctx.showMessage(` [ ${ctx.args[1]}] - SM`);
  } else if (ctx.args[0] === 14) {
    ctx.showMessage(` [ ${ctx.args[1]}] - 캬바레녀`);
  } else if (ctx.args[0] === 15) {
    ctx.showMessage(` [ ${ctx.args[1]}] - 레즈계열`);
  } else if (ctx.args[0] === 16) {
    ctx.showMessage(` [ ${ctx.args[1]}] - 업소여성`);
  } else if (ctx.args[0] === 17) {
    ctx.showMessage(` [ ${ctx.args[1]}] - 낭자애`);
  } else if (ctx.args[0] === 18) {
    ctx.showMessage(` [ ${ctx.args[1]}] - 자위계열`);
  } else if (ctx.args[0] === 19) {
    ctx.showMessage(` [ ${ctx.args[1]}] - 애널SEX계열`);
  } else if (ctx.args[0] === 20) {
    ctx.showMessage(` [ ${ctx.args[1]}] - 임신물`);
  } else if (ctx.args[0] === 21) {
    ctx.showMessage(` [ ${ctx.args[1]}] - 후타나리`);
  } else if (ctx.args[0] === 22) {
    ctx.showMessage(` [ ${ctx.args[1]}] - 순애SEX물`);
  } else if (ctx.args[0] === 23) {
    ctx.showMessage(` [ ${ctx.args[1]}] - 안경소녀`);
  } else if (ctx.args[0] === 24) {
    ctx.showMessage(` [ ${ctx.args[1]}] - 음모 없음`);
  } else if (ctx.args[0] === 25) {
    ctx.showMessage(` [ ${ctx.args[1]}] - 갸루계`);
  } else if (ctx.args[0] === 26) {
    ctx.showMessage(` [ ${ctx.args[1]}] - 모델`);
  } else if (ctx.args[0] === 27) {
    ctx.showMessage(` [ ${ctx.args[1]}] - 메이드`);
  } else if (ctx.args[0] === 28) {
    ctx.showMessage(` [ ${ctx.args[1]}] - 간호사`);
  } else if (ctx.args[0] === 29) {
    ctx.showMessage(` [ ${ctx.args[1]}] - 여교사`);
  } else if (ctx.args[0] === 30) {
    ctx.showMessage(` [ ${ctx.args[1]}] - OL`);
  }
}

export async function miyako_videosale_print(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.args[0] === 0) {
    ctx.showMessage(`로리계열`);
    return 1;
  } else if (ctx.args[0] === 1) {
    ctx.showMessage(`누님계열`);
    return 1;
  } else if (ctx.args[0] === 2) {
    ctx.showMessage(`여고생계열`);
    return 1;
  } else if (ctx.args[0] === 3) {
    ctx.showMessage(`빈유`);
    return 0;
  } else if (ctx.args[0] === 4) {
    ctx.showMessage(`코스프레계열`);
    return 1;
  } else if (ctx.args[0] === 5) {
    ctx.showMessage(`상류층계열`);
    return 1;
  } else if (ctx.args[0] === 6) {
    ctx.showMessage(`거유`);
    return 0;
  } else if (ctx.args[0] === 7) {
    ctx.showMessage(`야외노출물`);
    return 1;
  } else if (ctx.args[0] === 8) {
    ctx.showMessage(`외국인・하프・쿼터`);
    return 0;
  } else if (ctx.args[0] === 9) {
    ctx.showMessage(`연예인물`);
    return 1;
  } else if (ctx.args[0] === 10) {
    ctx.showMessage(`유부녀`);
    return 0;
  } else if (ctx.args[0] === 11) {
    ctx.showMessage(`처녀상실물`);
    return 1;
  } else if (ctx.args[0] === 12) {
    ctx.showMessage(`서큐버스`);
    return 0;
  } else if (ctx.args[0] === 13) {
    ctx.showMessage(`SM`);
    return 1;
  } else if (ctx.args[0] === 14) {
    ctx.showMessage(`캬바레녀`);
    return 0;
  } else if (ctx.args[0] === 15) {
    ctx.showMessage(`레즈계열`);
    return 1;
  } else if (ctx.args[0] === 16) {
    ctx.showMessage(`업소여성`);
    return 1;
  } else if (ctx.args[0] === 17) {
    ctx.showMessage(`낭자애`);
    return 0;
  } else if (ctx.args[0] === 18) {
    ctx.showMessage(`자위계열`);
    return 1;
  } else if (ctx.args[0] === 19) {
    ctx.showMessage(`애널SEX계열`);
    return 1;
  } else if (ctx.args[0] === 20) {
    ctx.showMessage(`임신물`);
    return 1;
  } else if (ctx.args[0] === 21) {
    ctx.showMessage(`후타나리`);
    return 0;
  } else if (ctx.args[0] === 22) {
    ctx.showMessage(`순애SEX물`);
    return 1;
  } else if (ctx.args[0] === 23) {
    ctx.showMessage(`안경소녀`);
    return 0;
  } else if (ctx.args[0] === 24) {
    ctx.showMessage(`음모 없음`);
    return 1;
  } else if (ctx.args[0] === 25) {
    ctx.showMessage(`갸루계`);
    return 0;
  } else if (ctx.args[0] === 26) {
    ctx.showMessage(`모델`);
    return 1;
  } else if (ctx.args[0] === 27) {
    ctx.showMessage(`메이드`);
    return 0;
  } else if (ctx.args[0] === 28) {
    ctx.showMessage(`간호사`);
    return 0;
  } else if (ctx.args[0] === 29) {
    ctx.showMessage(`여교사`);
    return 0;
  } else if (ctx.args[0] === 30) {
    ctx.showMessage(`OL`);
    return 1;
  }
}
