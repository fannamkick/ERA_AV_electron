/**
 * EVENT_MAEKOJO.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function maekojo_lesplay(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = ctx.args[0];
  ctx.locals[1] = ctx.args[1];
  // TODO: CHKFONT "あくびん"
  if (ctx.result) {
    // TODO: SETFONT "あくびん"
  }
  ctx.setColor(0xDDBBCC);
  ctx.showMessage(`「츕, 응…… 하앗, 안돼`);
  if ((ctx.base[ctx].locals[9] < base[ctx.locals[1]][9]) || ctx.locals[0].no === 9 || ctx.locals[0].no === 17) {
    ctx.showMessage(`요……`);
  } else {
    ctx.showMessage(`……`);
  }
  ctx.showMessage(`옆방에서`);
  if (ctx.getTalent(local, 504) === 1) {
    ctx.showMessage(`마스터가`);
  } else if (ctx.locals[0].no === 1 && ctx.getTalent(local, 432) === 0 && ctx.master.no === 0) {
    ctx.showMessage(`오빠가`);
  } else if ((ctx.locals[0].no === 1 || ctx.locals[0].no === 91) && ctx.getTalent(local, 432) === 1 && ctx.master.no === 0) {
    ctx.showMessage(`형님이`);
  } else {
    ctx.showMessage(`그 사람이`);
  }
  ctx.showMessage(`자고 있는데……」`);
  ctx.showMessage(`「응……『${ctx.getVarName("CALL", LOCAL)}`);
  if ((ctx.base[ctx].locals[9] > base[ctx.locals[1]][9]) || ctx.getCharacterNo(ctx.locals[1]) === 9 || ctx.getCharacterNo(ctx.locals[1]) === 17) {
    ctx.showMessage(`씨`);
  } else {
    ctx.showMessage(`짱`);
  }
  ctx.showMessage(`하고 같이 목욕했을 때부터 참을 수가 없었다』니……`);
  ctx.showMessage(`참, ${ctx.getVarName("CALLNAME", ctx.locals[1])}`);
  if ((ctx.base[ctx].locals[9] < base[ctx.locals[1]][9]) || ctx.locals[0].no === 9 || ctx.locals[0].no === 17) {
    ctx.showMessage(`씨는`);
  } else {
    ctx.showMessage(`짱은`);
  }
  ctx.showMessage(`너무 야하`);
  if ((ctx.base[ctx].locals[9] < base[ctx.locals[1]][9]) || ctx.locals[0].no === 9 || ctx.locals[0].no === 17) {
    ctx.showMessage(`다니까요`);
  } else {
    ctx.showMessage(`다니까`);
  }
  ctx.showMessage(`」`);
  if (ctx.getTalent(ctx.locals[1], 121) === 1) {
    ctx.showMessage(`「꺅…… ${ctx.getVarName("CALLNAME", ctx.locals[1])}`);
    if ((ctx.base[ctx].locals[9] < base[ctx.locals[1]][9]) || ctx.locals[0].no === 9 || ctx.locals[0].no === 17) {
      ctx.showMessage(`씨`);
    } else {
      ctx.showMessage(`짱`);
    }
    ctx.showMessage(`의 %CSTR:LOCAL:80%, 잠옷 너머로도`);
    if (ctx.getTalent(local, 76) === 1 && ctx.getTalent(local, 432) === 0) {
      ctx.showMessage(`단단해진`);
    } else if (ctx.getTalent(local, 432) === 1) {
      ctx.showMessage(`발기한`);
    } else {
      ctx.showMessage(`커진`);
    }
    ctx.showMessage(`게 보여……」`);
  }
  ctx.showMessage(`「그치만…… 사실 %CSTR:LOCAL:9%도 이제 더 이상 참을 수 없어`);
  if ((ctx.base[ctx].locals[9] < base[ctx.locals[1]][9]) || ctx.locals[0].no === 9 || ctx.locals[0].no === 17) {
    ctx.showMessage(`요`);
  } else {
    ctx.showMessage(``);
  }
  ctx.showMessage(`L`);
  ctx.showMessage(`그러니까……`);
  if (ctx.getTalent(local, 504) === 1) {
    ctx.showMessage(`마스터`);
  } else if (ctx.locals[0].no === 1 && ctx.getTalent(local, 432) === 0 && ctx.master.no === 0) {
    ctx.showMessage(`오빠`);
  } else if ((ctx.locals[0].no === 1 || ctx.locals[0].no === 91) && ctx.getTalent(local, 432) === 1 && ctx.master.no === 0) {
    ctx.showMessage(`형님`);
  } else {
    ctx.showMessage(`그 사람`);
  }
  ctx.showMessage(`도 이제 잤을테니까…… 둘이서 기분좋아`);
  if ((ctx.base[ctx].locals[9] < base[ctx.locals[1]][9]) || ctx.locals[0].no === 9 || ctx.locals[0].no === 17) {
    ctx.showMessage(`져요`);
  } else {
    ctx.showMessage(`지자`);
  }
  ctx.showMessage(`」`);
  ctx.showMessage(`「아……앙, ${ctx.getVarName("CALLNAME", ctx.locals[1])}`);
  if ((ctx.base[ctx].locals[9] < base[ctx.locals[1]][9]) || ctx.locals[0].no === 9 || ctx.locals[0].no === 17) {
    ctx.showMessage(`씨`);
  } else {
    ctx.showMessage(`짱`);
  }
  ctx.showMessage(`의`);
  if (ctx.getTalent(ctx.locals[1], 121) === 1) {
    ctx.showMessage(`%CSTR:LOCAL:80%`);
  } else {
    ctx.showMessage(`클리토리스`);
  }
  ctx.showMessage(`, %CSTR:LOCAL:9%의`);
  if (ctx.getTalent(local, 121) === 1) {
    ctx.showMessage(`%조사처리(CSTR:LOCAL:80,"와")%`);
  } else {
    ctx.showMessage(`클리토리스와`);
  }
  ctx.showMessage(`키스하고 있어……♪」`);
  if (ctx.getTalent(local, 121) === 1 && ctx.getTalent(ctx.locals[1], 121) === 1) {
    ctx.showMessage(`「아항, ${ctx.getVarName("CALLNAME", ctx.locals[1])}`);
    if ((ctx.base[ctx].locals[9] < base[ctx.locals[1]][9]) || ctx.locals[0].no === 9 || ctx.locals[0].no === 17) {
      ctx.showMessage(`씨`);
    } else {
      ctx.showMessage(`짱`);
    }
    ctx.showMessage(`의 %CSTR:LOCAL:80%`);
    ctx.showMessage(`,`);
    if (character.cflags[ctx.locals[0]][609] < cflag[ctx.locals[1]][609]) {
      ctx.showMessage(`%후치환(CSTR:COUNT:9+"의")% 것보다 컸`);
    } else if (character.cflags[ctx.locals[0]][609] > cflag[ctx.locals[1]][609]) {
      ctx.showMessage(`%후치환(CSTR:COUNT:9+"의")% 것보다 작았`);
    } else {
      ctx.showMessage(`%후치환(CSTR:COUNT:9+"의")% 거하고 비슷하`);
    }
    ctx.showMessage(`네`);
    if ((ctx.base[ctx].locals[9] < base[ctx.locals[1]][9]) || ctx.locals[0].no === 9 || ctx.locals[0].no === 17) {
      ctx.showMessage(`요`);
    } else {
      ctx.showMessage(``);
    }
    ctx.showMessage(`……♪`);
    ctx.showMessage(`그리고`);
    if (cflag[ctx.locals[1]][611] === 2 && ctx.getTalent(ctx.locals[1], 1) === 0) {
      ctx.showMessage(`벗겨진`);
    } else if (cflag[ctx.locals[1]][611] === 3) {
      ctx.showMessage(`벗겨진`);
    } else {
      ctx.showMessage(`포경`);
    }
    ctx.showMessage(`%CSTR:LOCAL:80%`);
    if ((ctx.base[ctx].locals[9] < base[ctx.locals[1]][9]) || ctx.locals[0].no === 9 || ctx.locals[0].no === 17) {
      ctx.showMessage(`에요`);
    } else {
      ctx.showMessage(`고`);
    }
    ctx.showMessage(`……`);
    ctx.showMessage(``);
    if (cflag[ctx.locals[1]][611] < 2 && character.cflags[ctx.locals[0]][611] === 2 && ctx.getTalent(local, 1) === 0) {
      ctx.showMessage(`%CSTR:LOCAL:9%처럼 벗겨진 %조사처리(CSTR:LOCAL:80,"가")% 더 발딱 서서 기분 좋아`);
      if ((ctx.base[ctx].locals[9] < base[ctx.locals[1]][9]) || ctx.locals[0].no === 9 || ctx.locals[0].no === 17) {
        ctx.showMessage(`요`);
      } else {
        ctx.showMessage(``);
      }
      ctx.showMessage(`♪`);
    } else if (character.cflags[ctx.locals[0]][611] < 2  && cflag[ctx.locals[1]][611] === 2 && ctx.getTalent(ctx.locals[1], 1) === 0) {
      ctx.showMessage(`%CSTR:LOCAL:9%도 ${ctx.getVarName("CALLNAME", ctx.locals[1])}`);
      if ((ctx.base[ctx].locals[9] < base[ctx.locals[1]][9]) || ctx.locals[0].no === 9 || ctx.locals[0].no === 17) {
        ctx.showMessage(`씨`);
      } else if (ctx.locals[0].no != 10) {
        ctx.showMessage(`짱`);
      }
      ctx.showMessage(`처럼 벗겨진 %CSTR:LOCAL:80%면 더 기분 좋을텐데……♪`);
    } else {
      ctx.showMessage(`%CSTR:LOCAL:9%하고 똑같네`);
      if ((ctx.base[ctx].locals[9] < base[ctx.locals[1]][9]) || ctx.locals[0].no === 9 || ctx.locals[0].no === 17) {
        ctx.showMessage(`요`);
      } else {
        ctx.showMessage(``);
      }
      ctx.showMessage(`♪`);
    }
    ctx.showMessage(`」`);
  }
  ctx.showMessage(`「응…… 더 기분 좋게 해줘`);
  if ((ctx.base[ctx].locals[9] < base[ctx.locals[1]][9]) || ctx.locals[0].no === 9 || ctx.locals[0].no === 17) {
    ctx.showMessage(`요`);
  } else {
    ctx.showMessage(``);
  }
  ctx.showMessage(`♪`);
  ctx.showMessage(`입하고`);
  if (ctx.getTalent(local, 121) === 1) {
    ctx.showMessage(`%CSTR:LOCAL:80%`);
  } else {
    ctx.showMessage(`%CSTR:LOCAL:81%`);
  }
  ctx.showMessage(`, 양쪽으로 키스해줘`);
  if ((ctx.base[ctx].locals[9] < base[ctx.locals[1]][9]) || ctx.locals[0].no === 9 || ctx.locals[0].no === 17) {
    ctx.showMessage(`요`);
  } else {
    ctx.showMessage(``);
  }
  ctx.showMessage(`……」`);
  ctx.resetColor();
  // TODO: SETFONT ""
  // TODO: PRINTW
  return;
}

export async function maekojo_ntr_staff(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: CHKFONT "あくびん"
  if (ctx.result) {
    // TODO: SETFONT "あくびん"
  }
  ctx.setColor(0xDDBBCC);
  ctx.showMessage(`「응…… %CSTR:COUNT:7%, 더 야하게 키스해줘%UNICODE(0x2665)%」`);
  ctx.showMessage(`「후앗…… 키스 하면서 %CSTR:COUNT:81% 괴롭히면 안대%UNICODE(0x2665)% 너무 기분 좋아서 서있을 수가 없으니까……%UNICODE(0x2665)%`);
  ctx.showMessage(`　느끼는 %CSTR:COUNT:9%의 얼굴이 귀여워서 괴롭히고 싶어진다니…… 기뻐%UNICODE(0x2665)%`);
  ctx.showMessage(`　그럼, %CSTR:COUNT:9%도 %CSTR:COUNT:7%씨의 %CSTR:COUNT:80% 핥아줄게♪」`);
  ctx.showMessage(`「츄…… 응, 흐응………… 으응…… 으붑…… 쥬릅…… 츄, 할짝…… 응, 으응, 후응……`);
  ctx.showMessage(`하앙…… 응…… 역시 %CSTR:COUNT:7%씨의 %CSTR:COUNT:80%,`);
  if (ctx.getCharacterNo(ctx.count) === 1 && ctx.getTalent(count, 432) === 0) {
    ctx.showMessage(`오빠`);
  } else if (ctx.getCharacterNo(ctx.count) === 1 && ctx.getTalent(count, 432) === 1) {
    ctx.showMessage(`오라비`);
  } else if (ctx.getCharacterNo(ctx.count) === 91) {
    ctx.showMessage(`형님`);
  } else {
    ctx.showMessage(`그 사람`);
  }
  ctx.showMessage(`것보다 커%UNICODE(0x2665)%`);
  ctx.showMessage(`정액도 진하고 끈적여서 맛있어……%UNICODE(0x2665)%`);
  ctx.showMessage(`　츕, 응, 츄…… 후아응…… 나올 것 같아? 괜찮아, %후치환(CSTR:COUNT:9+"의")% 입안에 잔뜩 싸줘%UNICODE(0x2665)%`);
  ctx.showMessage(`　크응…… 음…… 푸하아, 에헤헤…… 오늘도 다 마셨어♪ 그런데…… %CSTR:COUNT:7%씨는 아직 부족한가보네%UNICODE(0x2665)%」`);
  ctx.showMessage(`「아니~…… 그치만 %CSTR:COUNT:7%씨, 항상 3번은 싸야 만족하고, 거기다……♪`);
  ctx.showMessage(`%CSTR:COUNT:9%도`);
  if (ctx.getTalent(count, 432) === 1) {
    ctx.showMessage(`%CSTR:COUNT:80% 박아`);
  } else {
    ctx.showMessage(`%CSTR:COUNT:80% 넣어`);
  }
  ctx.showMessage(`주면 하는걸%UNICODE(0x2665)%`);
  ctx.showMessage(`　위험한 날이지만…… 약속한대로 평소처럼 생으로……야♪ %CSTR:COUNT:7%씨의 %CSTR:COUNT:80%, 그대로 느끼고 싶으니까……%UNICODE(0x2665)%」`);
  ctx.showMessage(`「아아아아앙%UNICODE(0x2665)% %CSTR:COUNT:9%의 %CSTR:COUNT:81%, %CSTR:COUNT:7%씨 모양으로 넓어지고 있어……♪`);
  if (character.cflags[ctx.count][15] === 10) {
    ctx.showMessage(`%조사처리(CSTR:COUNT:9,"를")% 여자로 만들어준 %CSTR:COUNT:80%인걸,`);
  } else {
    ctx.showMessage(`몇번이나 섹스했으니까…… 이제 %CSTR:COUNT:9%의`);
  }
  ctx.showMessage(`%CSTR:COUNT:81%도 이게 아니면 안된다고 하고 있어%UNICODE(0x2665)%`);
  ctx.showMessage(`아앙%UNICODE(0x2665)% 앞으로`);
  if (ctx.getCharacterNo(ctx.count) === 1 && ctx.getTalent(count, 432) === 0) {
    ctx.showMessage(`오빠`);
  } else if (ctx.getCharacterNo(ctx.count) === 1 && ctx.getTalent(count, 432) === 1) {
    ctx.showMessage(`오라비`);
  } else if (ctx.getCharacterNo(ctx.count) === 91) {
    ctx.showMessage(`형님`);
  } else {
    ctx.showMessage(`그 사람`);
  }
  ctx.showMessage(`의 %조사처리(CSTR:COUNT:80,"로")%는 만족 못해%UNICODE(0x2665)%`);
  ctx.showMessage(`하앙…… 흐응, 맞아♪`);
  if (ctx.getCharacterNo(ctx.count) === 1 && ctx.getTalent(count, 432) === 0) {
    ctx.showMessage(`오빠`);
  } else if (ctx.getCharacterNo(ctx.count) === 1 && ctx.getTalent(count, 432) === 1) {
    ctx.showMessage(`오라비`);
  } else if (ctx.getCharacterNo(ctx.count) === 91) {
    ctx.showMessage(`형님`);
  } else {
    ctx.showMessage(`그 사람`);
  }
  ctx.showMessage(`의 %CSTR:COUNT:80%따위 %CSTR:COUNT:7%씨랑 비교하면 번데기야%UNICODE(0x2665)%」`);
  ctx.showMessage(`「그런 작은거 말고, %CSTR:COUNT:7%씨의 아기가 갖고 싶어……%UNICODE(0x2665)%`);
  ctx.showMessage(`말했던대로 배란촉진제도 먹고 왔으니까, %CSTR:COUNT:7%씨의 정액으로`);
  ctx.showMessage(`난자가 빠져버릴 정도로 안에 싸줘%UNICODE(0x2665)%`);
  ctx.showMessage(`자, 자궁 입구가 %CSTR:COUNT:80%`);
  ctx.showMessage(` 끝이랑 엣찌한 키스 하면서 조르는 게 느껴지지%UNICODE(0x2665)%」`);
  ctx.showMessage(`「하앙, 임신해도 좋아%UNICODE(0x2665)% %CSTR:COUNT:7%씨가 모른척해도 상관없어!`);
  ctx.showMessage(`　아이가 태어나도 %CSTR:COUNT:9% 혼자서 키울테니까……%UNICODE(0x2665)%`);
  ctx.showMessage(`　그러니까 안에 잔뜩 싸줘…… %CSTR:COUNT:7%씨의 아기 배고 싶어……!!」`);
  ctx.showMessage(`「간다, 가, 가버려어어어어어엇!!`);
  ctx.showMessage(`자궁으로 %CSTR:COUNT:7%씨의 정액`);
  ctx.showMessage(`꿀꺽꿀꺽 마시면서 가버려어어어어어어어어어어어어어어~%UNICODE(0x2665)%」`);
  ctx.resetColor();
  // TODO: SETFONT ""
  // TODO: PRINTW
}
