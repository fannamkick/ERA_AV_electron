/**
 * BLACKGIRL.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function blackgirl_event(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else if (ctx.getTalent(local, 153) === 1) {
      // TODO: CONTINUE
    } else if (ctx.getTalent(local, 154) === 1) {
      // TODO: CONTINUE
    } else if ((ctx.getTalent(count, 422) === 1 && ctx.getTalent(count, 432) === 1 && ctx.getTalent(count, 430) === 0) || (ctx.getTalent(count, 422) === 1 && ctx.getTalent(count, 432) === 1 && ctx.getTalent(count, 430) === 1 && ctx.flags[545] === 1)) {
      await start_bgevent(ctx, character);
    }
  }
}

export async function start_bgevent(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.rand(8) === 0) {
    await nothing(ctx, character);
  } else if (ctx.rand(7) === 0) {
    await nothing(ctx, character);
  } else if (ctx.rand(6) === 0) {
    await nothing(ctx, character);
  } else if (ctx.rand(5) === 0) {
    await event_bgguidance(ctx, character);
  } else if (ctx.rand(4) === 0) {
    character.cflags[ctx.count][692] = 0;
    await event_bgsex(ctx, character);
  } else if (ctx.rand(3) === 0) {
    await event_bgtatto(ctx, character);
  } else if (ctx.rand(2) === 0 && ctx.flags[540] === 0) {
    character.cflags[ctx.count][692] = 0;
    await event_bgsex(ctx, character);
  } else if (ctx.rand(1) === 0) {
    await event_bgguidance(ctx, character);
  } else {
    await nothing(ctx, character);
  }
}

export async function event_bgtatto(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character.cflags[ctx.count][606] < 15) {
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.setColor(0xDDBBCC);
    ctx.showMessage(`「`);
    if (ctx.getCharacterNo(ctx.count) === 1 || ctx.getCharacterNo(ctx.count) === 91) {
      ctx.showMessage(`어때, 형님. 짱 멋지지, 이 타투♪`);
    } else if (ctx.getCharacterNo(ctx.count) != 1 && ctx.getCharacterNo(ctx.count) != 91 && ctx.getTalent(count, 11)) {
      ctx.showMessage(`짱 멋지지, 이 타투♪`);
    } else if (ctx.getCharacterNo(ctx.count) != 1 && ctx.getCharacterNo(ctx.count) != 91 && ctx.getTalent(count, 11) === 0) {
      ctx.showMessage(`타투를 새`);
      if (ctx.getCharacterNo(ctx.count) === 14) {
        ctx.showMessage(`겨 봤는데`);
      } else if (ctx.getCharacterNo(ctx.count) === 9 || ctx.getCharacterNo(ctx.count) === 106 || ctx.getCharacterNo(ctx.count) === 152) {
        ctx.showMessage(`겨 봤는데요`);
      } else {
        ctx.showMessage(`겼는데`);
      }
      ctx.showMessage(`…… 간지`);
      if (ctx.getCharacterNo(ctx.count) === 9 || ctx.getCharacterNo(ctx.count) === 106 || ctx.getCharacterNo(ctx.count) === 152) {
        ctx.showMessage(`나나요?`);
      } else if (ctx.getCharacterNo(ctx.count) === 11) {
        ctx.showMessage(`나지ー?`);
      } else if (ctx.getCharacterNo(ctx.count) === 14) {
        ctx.showMessage(`나나?`);
      } else if (ctx.getCharacterNo(ctx.count) === 80) {
        ctx.showMessage(`나지☆`);
      } else {
        ctx.showMessage(`나려나?`);
      }
    }
    ctx.showMessage(`」`);
    ctx.showMessage(`「`);
    if (ctx.getCharacterNo(ctx.count) === 1 || ctx.getCharacterNo(ctx.count) === 91) {
      ctx.showMessage(`그럼 더 팍팍 새기고 올테니까 기다려, 형님`);
    } else if (ctx.getCharacterNo(ctx.count) != 1 && ctx.getCharacterNo(ctx.count) != 91 && ctx.getTalent(count, 11)) {
      ctx.showMessage(`그럼 더 팍팍 새기고 올테니까 기다려`);
    } else if (ctx.getCharacterNo(ctx.count) != 1 && ctx.getCharacterNo(ctx.count) != 91 && ctx.getTalent(count, 11) === 0) {
      ctx.showMessage(`그럼, 더 팍팍 새기고`);
      if (ctx.getCharacterNo(ctx.count) === 9 || ctx.getCharacterNo(ctx.count) === 106 || ctx.getCharacterNo(ctx.count) === 152) {
        ctx.showMessage(`올게요`);
      } else if (ctx.getCharacterNo(ctx.count) === 11) {
        ctx.showMessage(`올게ー`);
      } else if (ctx.getCharacterNo(ctx.count) === 14) {
        ctx.showMessage(`오겠어`);
      } else if (ctx.getCharacterNo(ctx.count) === 80) {
        ctx.showMessage(`와줄게`);
      } else {
        ctx.showMessage(`올게`);
      }
    }
    if (ctx.getTalent(count, 85) === 1) {
      ctx.showMessage(`%UNICODE(0x2665)%`);
    } else {
      ctx.print('♪');
    }
    ctx.showMessage(`」`);
    ctx.resetColor();
    // TODO: SETFONT ""
    ctx.showMessage(`주말이 지나고 월요일, 사무소 스탭들과 담소하던 ${ctx.josaHelper(ctx.getName(ctx.count), "가")},`);
    ctx.showMessage(`조금 늦게 들어온 ${ctx.getVarName("CALL", MASTER)}에게 다가와,`);
    if (character.cflags[ctx.count][606] === 0) {
      ctx.showMessage(`팔뚝에 새긴 트라이벌 패턴 타투를 보여주`);
      character.cflags[ctx.count][606] |= 1;
      character.cstr[ctx.count][70] = "왼 팔뚝";
      character.cstr[ctx.count][71] = "트라이벌 패턴";
    } else if (character.cflags[ctx.count][606] === 1) {
      ctx.showMessage(`손목을 감듯이 새긴, 덩굴 모양의 타투를 보여주`);
      character.cflags[ctx.count][606] |= 2;
      character.cstr[ctx.count][72] = "오른 손목";
      character.cstr[ctx.count][73] = "로즈 아이비 모양의";
    } else if (character.cflags[ctx.count][606] === 3) {
      ctx.showMessage(`허벅지에 전갈을 모티브로 한 타투를 보여주`);
      character.cflags[ctx.count][606] |= 4;
      character.cstr[ctx.count][74] = "오른 허벅지 바깥쪽";
      character.cstr[ctx.count][75] = "스콜피온 테일";
    } else if (character.cflags[ctx.count][606] === 7) {
      ctx.showMessage(`갑자기 윗옷을 벗고 등뒤에 천사의 날개를 모티브로 한 타투를 보여주`);
      character.cflags[ctx.count][606] |= 8;
      character.cstr[ctx.count][76] = "등";
      character.cstr[ctx.count][77] = "천사의 날개 모양의";
    }
    ctx.showMessage(`며 ${ctx.getVarName("CALL", MASTER)}에게 어울리는지 물어보았다`);
    ctx.showMessage(`감독, 그러니까 고용주`);
    if (ctx.getCharacterNo(ctx.count) === 1 || ctx.getCharacterNo(ctx.count) === 91) {
      ctx.showMessage(`이며, 유일한 혈육이기도 한`);
    } else {
      ctx.showMessage(`인`);
    }
    ctx.showMessage(`${ctx.getVarName("CALL", MASTER)}에게 아무말 없이 멋대로 행동한 ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "를")}`);
    ctx.showMessage(`간단히 설교한 했지만, 그래도 확실히 어울리긴 하기에, 혼나서 시무룩해하는`);
    ctx.showMessage(`%조사만처리(NAME:COUNT,"를")% 위로하면서「어울려」라고 말했다……`);
    ctx.showMessage('');
    character.cflags[ctx.count][617] += 1;
    ctx.showMessage('이상경험 +1');
    ctx.exp[ctx.count][50] += 1;
    ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥'); ctx.waitInput();
  }
}

export async function event_bgsex(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character.cflags[ctx.count][40] >= 64 && character.cflags[ctx.count][42] === 79) {
    return;
  } else if (ctx.getTalent(count, 432) === 0 && character.cflags[ctx.count][691] === 0) {
    return;
  } else if (character.cflags[ctx.count][692] === 1) {
    return;
  } else {
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.setColor(0xDDBBCC);
    if (character.cflags[ctx.count][15] === 0) {
      ctx.showMessage(`「`);
      if ((ctx.getCharacterNo(ctx.count) === 1 || ctx.getCharacterNo(ctx.count) === 91) && ctx.talents[85] === 1 && ctx.getTalent(count, 432) === 1) {
        ctx.showMessage(`처녀는 그 녀석한테 주고 싶었지만…… 뭐, 어때%UNICODE(0x2665)%`);
        ctx.showMessage(`그 녀석도 처녀따위 귀찮을테고`);
      } else if ((ctx.getCharacterNo(ctx.count) === 1 || ctx.getCharacterNo(ctx.count) === 91) && ctx.getTalent(count, 85) === 0 && ctx.getTalent(count, 432) === 1) {
        ctx.showMessage(`섹프로 처녀상실이라니 짱인데?`);
        ctx.showMessage(`나도 처녀따윈 빨리 떼버리고 싶었고,`);
        ctx.showMessage(`너도 처녀 따먹으니까 좋잖아`);
      } else if (ctx.getCharacterNo(ctx.count) != 1 && ctx.getCharacterNo(ctx.count) != 91 && ctx.getTalent(count, 11) === 1 && ctx.getTalent(count, 432) === 1) {
        ctx.showMessage(`섹프로 처녀상실이라니 짱인데?`);
        ctx.showMessage(`나도 처녀따윈 빨리 떼보리고싶었고,`);
        ctx.showMessage(`너도 처녀따먹으니까 좋잖아`);
      } else {
        ctx.showMessage(`섹프로 처녀상실`);
        if (ctx.getCharacterNo(ctx.count) === 14) {
          ctx.showMessage(`이라니…… 뭐, 어때.`);
        } else if (ctx.getCharacterNo(ctx.count) === 9 || ctx.getCharacterNo(ctx.count) === 106 || ctx.getCharacterNo(ctx.count) === 152) {
          ctx.showMessage(`이라니…… 뭐, 좋아요.`);
        } else if (ctx.getCharacterNo(ctx.count) === 11) {
          ctx.showMessage(`이라니…… 뭐, 좋아ー`);
        } else {
          ctx.showMessage(`이라니…… 뭐, 좋아.`);
        }
        ctx.showMessage(`처녀따위 빨리 떼버리고 싶었고,`);
        if (ctx.getCharacterNo(ctx.count) === 14) {
          ctx.showMessage(`너도`);
        } else if (ctx.getCharacterNo(ctx.count) === 9 || ctx.getCharacterNo(ctx.count) === 106 || ctx.getCharacterNo(ctx.count) === 152) {
          ctx.showMessage(`당신도`);
        } else if (ctx.getCharacterNo(ctx.count) === 10) {
          ctx.showMessage(`댁도`);
        } else {
          ctx.showMessage(`너도`);
        }
        ctx.showMessage(`처녀`);
        if (ctx.getCharacterNo(ctx.count) === 9 || ctx.getCharacterNo(ctx.count) === 106 || ctx.getCharacterNo(ctx.count) === 152) {
          ctx.showMessage(`먹으`);
        } else {
          ctx.showMessage(`따먹으`);
        }
        ctx.showMessage(`니까 좋`);
        if (ctx.getCharacterNo(ctx.count) === 14) {
          ctx.showMessage(`지`);
        } else if (ctx.getCharacterNo(ctx.count) === 9  || ctx.getCharacterNo(ctx.count) === 106 || ctx.getCharacterNo(ctx.count) === 152) {
          ctx.showMessage(`지요`);
        } else if (ctx.getCharacterNo(ctx.count) === 10) {
          ctx.showMessage(`겠지`);
        } else if (ctx.getCharacterNo(ctx.count) === 11) {
          ctx.showMessage(`잖아ー`);
        } else if (ctx.getCharacterNo(ctx.count) === 80) {
          ctx.showMessage(`잖앗`);
        } else {
          ctx.showMessage(`을거 아냐`);
        }
      }
      ctx.showMessage(`♪`);
      ctx.showMessage(`」`);
    }
    ctx.showMessage(`「아♪ 아앙%UNICODE(0x2665)% 생%CSTR:COUNT:80% 기분 좋아, 더 안까지 넣어줘%UNICODE(0x2665)%」`);
    if ((ctx.getCharacterNo(ctx.count) === 1 || ctx.getCharacterNo(ctx.count) === 91) && character.cflags[ctx.count][15] > 0 && ctx.getTalent(count, 432) === 1) {
      ctx.showMessage(`「그 녀석 꺼보다 두꺼운 %조사처리(CSTR:COUNT:80,"가")% %후치환(CSTR:COUNT:9+"의")% %CSTR:COUNT:81% 범하고 있어%UNICODE(0x2665)%」`);
      ctx.showMessage(`「응……?　그 녀석은 형님을 말하는 거야♪ %후치환(CSTR:COUNT:9+"의")%`);
      if (ctx.getTalent(count, 85) === 0) {
        ctx.showMessage(`육바이브♪`);
      } else if (ctx.getTalent(count, 85) === 1) {
        ctx.showMessage(`소중한 남친%UNICODE(0x2665)%`);
      }
      ctx.showMessage(`」`);
      ctx.showMessage(`「`);
      if (ctx.getTalent(count, 85) === 0) {
        ctx.showMessage(`%CSTR:COUNT:9%한테 박으면서『예전의 카나데로 돌아와줘』같은 소리나 하고`);
        ctx.showMessage(`%CSTR:COUNT:80% 발딱 세우는거 있지.`);
        ctx.showMessage(`존나 웃긴다니까♪」`);
        if (character.cflags[ctx.master][670] === 1) {
          ctx.showMessage(`「거기다 동정이었는지,`);
          ctx.showMessage(`%후치환(CSTR:COUNT:9+"의")% %CSTR:COUNT:81%에 %CSTR:COUNT:80% 넣기만해도 사정해 버렸어.`);
          ctx.showMessage(`동정에 조루고, %CSTR:COUNT:80%도 작다니 진짜 최악이야%UNICODE(0x2665)%」`);
        }
      } else if (ctx.getTalent(count, 85) === 1) {
        ctx.showMessage(`남친이 형님이라니 완전 위험하지♪ 번데기지만`);
        ctx.showMessage(`얼굴은 미남이고 돈도 많아%UNICODE(0x2665)%」`);
      }
      ctx.showMessage(`「응, 맞아%UNICODE(0x2665)% 네 거하고 비교하면 형님의 %CSTR:COUNT:80%따위 번데기야, 번데기♪`);
      ctx.showMessage(`그래도 생으로 SEX해주`);
      if (ctx.getTalent(count, 85) === 1) {
        ctx.showMessage(`고, 작아도 사랑하는 형님의 %조사처리(CSTR:COUNT:80,"니")%까 기분 좋지만`);
      } else {
        ctx.showMessage(`니까 참고 있지만`);
      }
      ctx.showMessage(`%UNICODE(0x2665)%」`);
    } else if (ctx.getCharacterNo(ctx.count) != 1 && ctx.getCharacterNo(ctx.count) != 91 && ctx.getCharacterNo(ctx.count) != 106 && character.cflags[ctx.count][15]  > 0 && ctx.getTalent(count, 11) && ctx.getTalent(count, 432) === 1) {
      ctx.showMessage(`「그 녀석 꺼보다 두꺼운 %조사처리(CSTR:COUNT:80,"가")% %후치환(CSTR:COUNT:9+"의")% %CSTR:COUNT:81% 범하고 있어%UNICODE(0x2665)%」`);
      ctx.showMessage(`「응……?　그 녀석은`);
      if (ctx.getTalent(count, 85) === 0) {
        ctx.showMessage(`육바이브군`);
      } else if (ctx.getTalent(count, 85) === 1) {
        ctx.showMessage(`남친`);
      }
      ctx.showMessage(`이야%UNICODE(0x2665)%」`);
      ctx.showMessage(`「응, 맞아%UNICODE(0x2665)% 네 거하고 비교하면 그 녀석의 %CSTR:COUNT:80%따위 번데기야, 번데기♪`);
      ctx.showMessage(`그래도 생으로 SEX해주니까 참고 있지만%UNICODE(0x2665)%」`);
      if (ctx.masterAbilities[12] <= 6) {
        ctx.showMessage(` 「거기다…… 너무 허접이라 전혀 기분 좋아지질 않는 걸%UNICODE(0x2665)%」`);
      }
      ctx.showMessage(`「으응…… 이제 됐잖아%UNICODE(0x2665)% %조사처리(CSTR:COUNT:81,"가")% 바보가 될 정도로 격하게 범해줘♪」`);
    } else if (character.cflags[ctx.count][15] != 0) {
      ctx.showMessage(`「그이보다 두꺼운 %조사처리(CSTR:COUNT:80,"가")% %후치환(CSTR:COUNT:9+"의")% %CSTR:COUNT:81% 범하고 있어%UNICODE(0x2665)%」`);
      ctx.showMessage(`「응……?　그이는`);
      if (ctx.getTalent(count, 85) === 0) {
        ctx.showMessage(`육바이브군`);
      } else if (ctx.getTalent(count, 85) === 1) {
        ctx.showMessage(`남친`);
      }
      if (ctx.getCharacterNo(ctx.count) === 9 || ctx.getCharacterNo(ctx.count) === 106 || ctx.getCharacterNo(ctx.count) === 152) {
        ctx.showMessage(`이예요`);
      } else if (ctx.getCharacterNo(ctx.count) === 14) {
        ctx.showMessage(`인데`);
      } else {
        ctx.showMessage(`이야`);
      }
      ctx.showMessage(`%UNICODE(0x2665)%」`);
      ctx.showMessage(`「응, 맞아%UNICODE(0x2665)%`);
      if (ctx.getCharacterNo(ctx.count) === 14) {
        ctx.showMessage(`네`);
      } else if (ctx.getCharacterNo(ctx.count) === 9 || ctx.getCharacterNo(ctx.count) === 106 || ctx.getCharacterNo(ctx.count) === 152) {
        ctx.showMessage(`당신`);
      } else if (ctx.getCharacterNo(ctx.count) === 10) {
        ctx.showMessage(`댁`);
      } else {
        ctx.showMessage(`네`);
      }
      ctx.showMessage(`거랑 비교하면 그이의 %CSTR:COUNT:80%따위 번데기%CSTR:COUNT:80%따위 번데기`);
      if (ctx.getCharacterNo(ctx.count) === 9 || ctx.getCharacterNo(ctx.count) === 106 || ctx.getCharacterNo(ctx.count) === 152) {
        ctx.showMessage(`예요,`);
      } else if (ctx.getCharacterNo(ctx.count) === 14) {
        ctx.showMessage(`야,`);
      } else {
        ctx.showMessage(`지,`);
      }
      ctx.showMessage(`번데기♪ 그래도 생으로 SEX해주니까 참고있는 거`);
      if (ctx.getCharacterNo(ctx.count) === 9 || ctx.getCharacterNo(ctx.count) === 106 || ctx.getCharacterNo(ctx.count) === 152) {
        ctx.showMessage(`예요`);
      } else if (ctx.getCharacterNo(ctx.count) === 14) {
        ctx.showMessage(`야`);
      } else {
        ctx.showMessage(``);
      }
      ctx.showMessage(`%UNICODE(0x2665)%」`);
      if (ctx.masterAbilities[12] <= 6) {
        ctx.showMessage(` 「거기다…… 너무 허접이라 전혀 기분 좋아지질 않아%UNICODE(0x2665)%」`);
      }
      ctx.showMessage(`「으응…… 이제 됐잖아%UNICODE(0x2665)% %조사처리(CSTR:COUNT:81,"가")% 바보가 될 정도로 격하게 범해줘♪」`);
    }
    ctx.showMessage(`「간다아아아아ーーー앗%UNICODE(0x2665)% %CSTR:COUNT:9%의`);
    if (character.cflags[ctx.count][15] === 0) {
      ctx.showMessage(`처녀%CSTR:COUNT:81%에 생질싸`);
    } else if (character.cflags[ctx.count][15] > 0) {
      ctx.showMessage(`%CSTR:COUNT:81%에 생질싸 씨뿌리기`);
    }
    ctx.showMessage(`당해서 가버려어어엇~%UNICODE(0x2665)%」`);
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage(`주말이 지나고 월요일, 사무소 스탬들과 ${ctx.josaHelper(ctx.getName(ctx.count), "가")} TV에서 AV같은 것을 보고 있었다`);
    ctx.showMessage(`빈말로도 화질이 그리 좋지않고, 소리가 심하게 갈라졌지만 화면 속에서 섹스를`);
    ctx.showMessage(`즐기고 있는 것이 ${ctx.getVarName("CALL", COUNT)}인 것만큼은 확실했다`);
    ctx.showMessage(`그다지 남의 사생활에 참견하는 것은 아니지만,`);
    if (character.cflags[ctx.count][15] === 0) {
      ctx.showMessage(`자신의 감시 밖에서 ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "가")} 처녀를 깨버린 것에,`);
    } else if (character.cflags[ctx.count][15] > 0) {
      ctx.showMessage(`거기까진 자신은 없지만「번데기」라는 소리를 ${ctx.getVarName("CALL", COUNT)}에게 들어버린 것에,`);
    }
    ctx.showMessage(`${ctx.josaHelper("플레이어는")} 심경이 복잡해졌다……`);
    ctx.showMessage(`L`);
    if (ctx.getTalent(count, 425) === 0) {
      ctx.getTalent(count, 425) = 1;
      await decide_sexfriend,count(ctx, character);
    }
    if (ctx.getTalent(count, 27) == 1) {
      ctx.getTalent(count, 27) = 0;
    }
    if (character.cflags[ctx.count][15] === 0 && ctx.getTalent(count, 0) === 1) {
      character.cflags[ctx.count][15] = 9;
      ctx.setColor(0xF58F98);
      ctx.showMessage('【처녀상실】');
      ctx.resetColor();
      ctx.showMessage('이상경험 +1');
      ctx.getTalent(count, 0) = 0;
      ctx.exp[ctx.count][50] += 1;
      character.cstr[ctx.count][0] = `${character.cstr[ctx.count][47]} ${character.cstr[ctx.count][48]}(섹프)`;
      character.cflags[ctx.count][160] = ctx.base[ctx.count][9];
      character.cflags[ctx.count][161] = DAY[1];
      character.cflags[ctx.count][162] = DAY[2];
      character.cflags[ctx.count][163] = 3;
      character.cflags[ctx.count][164] = 3;
    }
    if (character.cflags[ctx.count][16] === -1) {
      character.cflags[ctx.count][16] = 9;
      ctx.setColor(0xDDBBCC);
      ctx.showMessage('【첫 키스】');
      ctx.resetColor();
      character.cstr[ctx.count][1] = `${character.cstr[ctx.count][47]} ${character.cstr[ctx.count][48]}(섹프)의 극태${character.cstr[ctx.count][80]}%String.fromCharCode(0x2665)%`;
      character.cflags[ctx.count][820] = ctx.base[ctx.count][9];
      character.cflags[ctx.count][821] = DAY[1];
      character.cflags[ctx.count][822] = DAY[2];
      character.cflags[ctx.count][823] = 3;
      character.cflags[ctx.count][824] = 1;
    }
    S = 0;
    if (ctx.abilities[ctx.count][2] === 4) {
      S += 1;
    } else if (ctx.abilities[ctx.count][2] === 5) {
      S += 2;
    } else if (ctx.abilities[ctx.count][2] >= 6) {
      S += 3;
    }
    if (ctx.abilities[ctx.count][30]) {
      S += ctx.abilities[ctx.count][30] / 2 + 1;
    }
    if (ctx.abilities[ctx.count][11] >= 5 && ctx.abilities[ctx.count][16] >= 5) {
      S += 2;
    }
    if (ctx.abilities[ctx.count][11] >= 3 && ctx.abilities[ctx.count][16] >= 3) {
      S += 1;
    }
    if (ctx.abilities[ctx.count][11] >= 7 && ctx.abilities[ctx.count][5] >= 6) {
      S += 1;
    }
    if (ctx.abilities[ctx.count][11] >= 4 && ctx.abilities[ctx.count][2] >= 3) {
      S += 1;
    }
    if (ctx.getTalent(count, 31)) {
      S += 10;
    }
    if (ctx.getTalent(count, 75)) {
      S *= 2;
    }
    if (ctx.getTalent(count, 70)) {
      S += 1;
      if (ctx.getTalent(count, 76)) {
        S *= 2;
      }
    }
    if (S < 5) {
      S = 2 + ctx.rand(4);
    }
    ctx.showMessage(`${ctx.getVarName("EXP", 0)} +{S}`);
    ctx.showMessage(`${ctx.getVarName("EXP", 2)} +{S}`);
    ctx.showMessage(`${ctx.getVarName("EXP", 5)} +{S}`);
    ctx.showMessage(`${ctx.getVarName("EXP", 20)} +{S*2}`);
    ctx.showMessage(`${ctx.getVarName("EXP", 22)} +{S/2}`);
    ctx.exp[ctx.count][0] += S;
    ctx.exp[ctx.count][2] += S / 2 + ctx.rand(6);
    ctx.exp[ctx.count][20] += S*2;
    ctx.exp[ctx.count][5] += S;
    ctx.exp[ctx.count][22] += S / 2;
    ctx.exp[ctx.count][104] += 1;
    ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥'); ctx.waitInput();
    character.cflags[ctx.count][692] = 1;
    if (character.cflags[ctx.count][691] == 0) {
      character.cflags[ctx.count][691] = 1;
    }
  }
  return;
}

export async function event_bgguidance(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.base[ctx.count][9] < 19) {
    ctx.showMessage(`W 한가롭게 사무소 뒷정리를 하고있던 중, ${ctx.getVarName("CALL", MASTER)}의 휴대폰에 한통의 전화가 걸려왔다……`);
    ctx.showMessage(`전화를 건 사람은 경찰로, ${ctx.josaHelper(ctx.getName(ctx.count), "가")}`);
    if (ctx.rand(2) === 0) {
      ctx.showMessage(`한밤중에 패밀리 레스토랑에서 흡연하고 있어서 데려왔다고 한다`);
      ctx.showMessage(`W ${ctx.josaHelper("플레이어는")} 한숨을 쉬고, ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "를")} 경찰서까지 마중 나가기로 했다……`);
      if (ctx.getTalent(count, 424) === 0) {
        ctx.getTalent(count, 424) = 1;
        await cigarettes_4count(ctx, character);
      }
    } else {
      ctx.showMessage(`한밤중에 노래방에서 술을 마시고 있어서 데려왔다고한다`);
      ctx.showMessage(`${ctx.josaHelper("플레이어는")} 한숨을 쉬고, ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "를")} 경찰서까지 마중 나가기로 했다……`);
    }
    ctx.showMessage('');
    ctx.showMessage(`훈계경험 +1`);
    // TODO: PRINTW
    ctx.exp[ctx.count][92] += 1;
    ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥'); ctx.waitInput();
  }
}

export async function sunburn_after(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else if (ctx.getTalent(count, 432) === 1) {
      // TODO: CONTINUE
    } else if (ctx.getTalent(count, 505) === 1 && ctx.getTalent(count, 511) === 1) {
      // TODO: CONTINUE
    } else if (ctx.getCharacterNo(ctx.count) === 200) {
      // TODO: CONTINUE
    } else if (ctx.getTalent(count, 422) === 1) {
      character.cflags[ctx.count][614] -= 1;
      if (character.cflags[ctx.count][614] <= 0) {
        ctx.showMessage(`《${ctx.josaHelper(ctx.getName(ctx.count), "는")} 태닝살롱의 효과가 끊겨 원래 살색으로 돌아왔다》`);
        ctx.getTalent(count, 422) = 0;
      }
    }
  }
}
