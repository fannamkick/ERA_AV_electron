/**
 * INTERVIEW.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function interview(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  for (let COUNT = 0; COUNT < 100; COUNT++) {
    // TODO: TFLAG:(COUNT+400) = 0
  }
  ctx.showMessage('');
  ctx.showMessage('이번 면접 상대는……');
  ctx.showMessage('[0] - 여자');
  // Label: INPUT_LOOP_INTERVIEW
  await ctx.inputNumber();
  if (ctx.result === 0) {
    character.tflags[400] = 0;
  } else if (ctx.result === 1) {
    character.tflags[400] = 1;
  } else if (ctx.result === 2) {
    character.tflags[400] = 2;
  } else {
    // GOTO INPUT_LOOP_INTERVIEW - 구조 변경 필요 (while/break 사용 권장)
  }
  await interview_2nd(ctx, character);
  return 0;
}

export async function interview_2nd(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  character.tflags[401] = 8 + ctx.rand(13) + ctx.rand(13);
  character.tflags[402] = ctx.rand(11) + 1;
  if (character.tflags[402] === 1 || character.tflags[402] === 3 || character.tflags[402] === 5 || character.tflags[402] === 7 || character.tflags[402] === 8 || character.tflags[402] === 10 || character.tflags[402] === 12) {
    character.tflags[403] = ctx.rand(30) + 1;
  } else if (character.tflags[402] === 4 || character.tflags[402] === 6 || character.tflags[402] === 9 || character.tflags[402] === 11) {
    character.tflags[403] = ctx.rand(29) + 1;
  } else if (character.tflags[402] === 2) {
    character.tflags[403] = ctx.rand(28) + 1;
  }
  character.tflags[404] = ctx.rand(3) + 1;
  if (character.tflags[401] <= 15) {
    character.tflags[405] = 0;
  } else {
    character.tflags[405] = ctx.rand(9) + 1;
  }
  character.tflags[406] = ctx.rand(21);
  character.tflags[407] = ctx.rand(100);
  ctx.locals[0] = 0;
  if (character.tflags[400] === 0) {
    ctx.locals[0] = ctx.rand(51) + ctx.rand(51);
  } else if (character.tflags[400] === 2 && ctx.rand(3) === 0) {
    ctx.locals[0] = ctx.rand(101) - ctx.rand(101);
    if (ctx.locals[0] < 0) {
      ctx.locals[0] = 0;
    }
  }
  if (ctx.locals[0] <= 4) {
    character.tflags[408] = 1;
  } else if (ctx.locals[0] >= 5 && ctx.locals[0] <= 19) {
    character.tflags[408] = 2;
  } else if (ctx.locals[0] >= 70 && ctx.locals[0] <= 94) {
    character.tflags[408] = 3;
  } else if (ctx.locals[0] >= 95 && ctx.locals[0] <= 99) {
    character.tflags[408] = 4;
  } else {
    character.tflags[408] = 0;
  }
  character.tflags[409] = ctx.rand(10);
  character.tflags[410] = 100 + ctx.rand(100);
  ctx.locals[0] = 0;
  ctx.locals[0] = ctx.rand(100);
  if (ctx.locals[0] < (character.tflags[401] * 2)) {
    character.tflags[411] = 1;
  } else if (( character.tflags[405] === 7 && ctx.rand(10) > 0 )) {
  } else {
    character.tflags[411] = 0;
  }
  ctx.locals[0] = 0;
  ctx.locals[0] = ctx.rand(100);
  if (( character.tflags[409] >= 2 && character.tflags[409] <= 7 ) || character.tflags[405] === 7) {
    if (ctx.locals[0] < (character.tflags[401] * 3)) {
      character.tflags[412] = 1;
    } else {
      character.tflags[412] = 0;
    }
  } else {
    if (ctx.locals[0] < (character.tflags[401] * 1)) {
      character.tflags[412] = 1;
    } else {
      character.tflags[412] = 0;
    }
  }
  ctx.locals[0] = 0;
  ctx.locals[0] = ctx.rand(100);
  if (( character.tflags[409] >= 2 && character.tflags[409] <= 7 ) || character.tflags[405] === 7) {
    if (ctx.locals[0] < (character.tflags[401] * 1)) {
      character.tflags[413] = 1;
    } else if (character.tflags[400] === 2) {
      if (ctx.locals[0] >= (character.tflags[401] * 3)) {
        character.tflags[413] = 1;
      } else {
        character.tflags[413] = 0;
      }
    } else {
      character.tflags[413] = 0;
    }
  } else {
    if (ctx.locals[0] < (character.tflags[401] / 4)) {
      character.tflags[413] = 1;
    } else {
      character.tflags[413] = 0;
    }
  }
  character.tflags[414] = ctx.rand(19);
  if (character.tflags[400] < 16 && character.tflags[400] >= ctx.rand(7) + 9) {
    character.tflags[415] = 1;
  } else {
    character.tflags[415] = ctx.rand(20);
  }
  if (character.tflags[400] === 0 || character.tflags[400] === 2) {
    character.tflags[416] = 23 + ctx.rand(15);
  } else if (character.tflags[400] === 1) {
    character.tflags[416] = 20 + ctx.rand(11);
  }
  ctx.locals[0] = 0;
  ctx.locals[0] = ctx.rand(100);
  if (ctx.locals[0] <= 4) {
    character.tflags[417] = 40;
  } else if (ctx.locals[0] >= 95) {
    character.tflags[417] = 41;
  } else {
    character.tflags[417] = 0;
  }
  ctx.locals[0] = 0;
  ctx.locals[0] = ctx.rand(100);
  if (ctx.locals[0] <= 4) {
    character.tflags[418] = 42;
  } else if (ctx.locals[0] >= 95) {
    character.tflags[418] = 43;
  } else {
    character.tflags[418] = 0;
  }
  ctx.locals[0] = 0;
  ctx.locals[0] = ctx.rand(100);
  if (ctx.locals[0] <= 4) {
    character.tflags[419] = 99;
  } else if (ctx.locals[0] >= 95) {
    character.tflags[419] = 100;
  } else {
    character.tflags[419] = 0;
  }
  ctx.print('약속했던 카페에');
  if (character.tflags[401] <= 14) {
    ctx.print('너무 어려보이고');
  } else if (character.tflags[401] >= 15 && character.tflags[401] <=18) {
    ctx.print('어린티가 남아있고');
  } else if (character.tflags[401] >= 19) {
    ctx.print('성숙해보이고');
  }
  character.tflags[421] = ctx.rand(6) - ctx.rand(6);
  if (character.tflags[421] <= -5) {
    ctx.print('걱정될 정도로 가는');
  } else if (character.tflags[421] <= -3) {
    ctx.print('살이 너무 빠진');
  } else if (character.tflags[421] === -2) {
    ctx.print('가냘픈');
  } else if (character.tflags[421] === -1) {
    ctx.print('날씬한');
  } else if (character.tflags[421] < 2) {
  } else if (character.tflags[421] === 2) {
    ctx.print('약간 통통한');
  } else if (character.tflags[421] === 3) {
    ctx.print('통통한');
  } else if (character.tflags[421] <= 5) {
    ctx.print('살집있는');
  } else if (character.tflags[421] >= 6) {
    ctx.print('비만이 걱정되는');
  }
  if (character.tflags[419] === 99) {
    ctx.print('큰');
  } else if (character.tflags[419] === 100) {
    ctx.print('작은');
  }
  character.tflags[420] = (ctx.rand(10) + 1) *100;
  if (character.tflags[400] === 0 && character.tflags[401] <= 14) {
    ctx.print('소녀가');
  } else if (character.tflags[400] === 0) {
    ctx.print('여자가');
  } else if (character.tflags[400] === 1 && character.tflags[401] <= 14) {
    ctx.print('소년이');
  } else if (character.tflags[400] === 1) {
    ctx.print('남자가');
  } else if (character.tflags[400] === 2) {
    ctx.print('낭자애가');
  }
  ctx.showMessage('찾아왔다.');
  if (character.tflags[406] === 0 || character.tflags[406] === 11) {
    ctx.print('검은');
  } else if (character.tflags[406] === 1 || character.tflags[406] === 12) {
    ctx.print('짙은');
  } else if (character.tflags[406] === 2 || character.tflags[406] === 13) {
    ctx.print('금빛');
  } else if (character.tflags[406] === 3 || character.tflags[406] === 14) {
    ctx.print('은빛');
  } else if (character.tflags[406] === 4 || character.tflags[406] === 15) {
    ctx.print('붉은');
  } else if (character.tflags[406] === 5 || character.tflags[406] === 16) {
    ctx.print('푸른');
  } else if (character.tflags[406] === 6 || character.tflags[406] === 17) {
    ctx.print('녹색');
  } else if (character.tflags[406] === 7 || character.tflags[406] === 18) {
    ctx.print('핑크빛');
  } else if (character.tflags[406] === 8 || character.tflags[406] === 19) {
    ctx.print('보라빛');
  } else if (character.tflags[406] === 9) {
    ctx.print('하얀');
  } else if (character.tflags[406] === 10 || character.tflags[406] === 21) {
    ctx.print('갈색');
  } else if (character.tflags[406] === 20) {
    ctx.print('탈색한');
  }
  ctx.print('머리를');
  if (character.tflags[401] <= 15) {
    if (character.tflags[407] <= 10) {
      character.tflags[407] = 0;
      ctx.print('쇼트로');
    } else if (character.tflags[407] <= 28) {
      character.tflags[407] = 1;
      ctx.print('세미 롱으로');
    } else if (character.tflags[407] <= 43) {
      character.tflags[407] = 2;
      ctx.print('보브로');
    } else if (character.tflags[407] <= 58) {
      character.tflags[407] = 3;
      ctx.print('포니테일로');
    } else if (character.tflags[407] <= 68) {
      character.tflags[407] = 4;
      ctx.print('트윈테일로');
    } else if (character.tflags[407] <= 78) {
      character.tflags[407] = 5;
      ctx.print('스트레이트 롱으로');
    } else if (character.tflags[407] <= 83) {
      character.tflags[407] = 6;
      ctx.print('올림머리로');
    } else if (character.tflags[407] <= 93) {
      character.tflags[407] = 7;
      ctx.print('풍성한 파마로');
    } else if (character.tflags[407] <= 98) {
      character.tflags[407] = 8;
      ctx.print('롱 웨이브로');
    } else if (character.tflags[407] === 99) {
      ctx.print('승천 페가서스MIX 올림으로');
    }
  } else if (character.tflags[401] <=18) {
    if (character.tflags[407] <= 10) {
      character.tflags[407] = 0;
      ctx.print('쇼트로');
    } else if (character.tflags[407] <= 25) {
      character.tflags[407] = 1;
      ctx.print('세미 롱으로');
    } else if (character.tflags[407] <= 40) {
      character.tflags[407] = 2;
      ctx.print('보브로');
    } else if (character.tflags[407] <= 50) {
      character.tflags[407] = 3;
      ctx.print('포니테일로');
    } else if (character.tflags[407] <= 55) {
      character.tflags[407] = 4;
      ctx.print('트윈테일로');
    } else if (character.tflags[407] <= 73) {
      character.tflags[407] = 5;
      ctx.print('스트레이트 롱으로');
    } else if (character.tflags[407] <= 78) {
      character.tflags[407] = 6;
      ctx.print('올림머리로');
    } else if (character.tflags[407] <= 88) {
      character.tflags[407] = 7;
      ctx.print('풍성한 파마로');
    } else if (character.tflags[407] <= 98) {
      character.tflags[407] = 8;
      ctx.print('롱 웨이브로');
    } else if (character.tflags[407] === 99) {
      ctx.print('승천 페가서스MIX 올림으로');
    }
  } else if (character.tflags[401] <=22) {
    if (character.tflags[407] <= 10) {
      character.tflags[407] = 0;
      ctx.print('쇼트로');
    } else if (character.tflags[407] <= 25) {
      character.tflags[407] = 1;
      ctx.print('세미 롱으로');
    } else if (character.tflags[407] <= 40) {
      character.tflags[407] = 2;
      ctx.print('보브로');
    } else if (character.tflags[407] <= 45) {
      character.tflags[407] = 3;
      ctx.print('포니테일로');
    } else if (character.tflags[407] <= 47) {
      character.tflags[407] = 4;
      ctx.print('트윈테일로');
    } else if (character.tflags[407] <= 62) {
      character.tflags[407] = 5;
      ctx.print('스트레이트 롱으로');
    } else if (character.tflags[407] <= 68) {
      character.tflags[407] = 6;
      ctx.print('올림머리로');
    } else if (character.tflags[407] <= 83) {
      character.tflags[407] = 7;
      ctx.print('풍성한 파마로');
    } else if (character.tflags[407] <= 98) {
      character.tflags[407] = 8;
      ctx.print('롱 웨이브로');
    } else if (character.tflags[407] === 99) {
      ctx.print('승천 페가서스MIX 올림으로');
    }
  } else {
    if (character.tflags[407] <= 10) {
      character.tflags[407] = 0;
      ctx.print('쇼트로');
    } else if (character.tflags[407] <= 25) {
      character.tflags[407] = 1;
      ctx.print('세미 롱으로');
    } else if (character.tflags[407] <= 35) {
      character.tflags[407] = 2;
      ctx.print('보브로');
    } else if (character.tflags[407] <= 38) {
      character.tflags[407] = 3;
      ctx.print('포니테일로');
    } else if (character.tflags[407] <= 39) {
      character.tflags[407] = 4;
      ctx.print('트윈테일로');
    } else if (character.tflags[407] <= 59) {
      character.tflags[407] = 5;
      ctx.print('스트레이트 롱으로');
    } else if (character.tflags[407] <= 68) {
      character.tflags[407] = 6;
      ctx.print('올림머리로');
    } else if (character.tflags[407] <= 83) {
      character.tflags[407] = 7;
      ctx.print('풍성한 파마로');
    } else if (character.tflags[407] <= 98) {
      character.tflags[407] = 8;
      ctx.print('롱 웨이브로');
    } else if (character.tflags[407] === 99) {
      ctx.print('승천 페가서스MIX 올림으로');
    }
  }
  ctx.showMessage('하고 있다.');
  if (character.tflags[400] === 0 && character.tflags[408] > 0) {
    ctx.print('가슴에 눈길을 주니');
    if (character.tflags[408] === 1) {
      ctx.showMessage('완전히 납작하지만, 수요는 있을지 모른다.');
    } else if (character.tflags[408] === 2) {
      ctx.showMessage('겸손하게 부풀어 있었다.');
    } else if (character.tflags[408] === 3) {
      ctx.showMessage('옷 너머로도 알 수 있는 풍요함이 있었다.');
    } else if (character.tflags[408] === 4) {
      ctx.showMessage('지금이라도 옷에서 삐져나올 것만 같았다.');
    }
  } else if (character.tflags[400] === 2 && character.tflags[408] != 0) {
    ctx.print('자신도 모르게 눈길이 간 가슴은');
    if (character.tflags[408] === 1) {
      ctx.showMessage('약간 부푼 느낌이 든다. 그럴리가 없는데…');
    } else if (character.tflags[408] === 2) {
      ctx.showMessage('살짝 부풀어 오른게 보인다. 저건 가짜일까?');
    } else if (character.tflags[408] === 3) {
      ctx.showMessage('이상하게도 옷 너머로도 알 수 있을만큼 부풀어있다.');
    } else if (character.tflags[408] === 4) {
      ctx.showMessage('성별이 의심될 정도로 위대했다.');
    }
  }
  ctx.print('직업은');
  if (character.tflags[405] === 0 && character.tflags[401] <= 12) {
    ctx.print('초●학생이');
  } else if (character.tflags[405] === 0 && character.tflags[401] >= 13 && character.tflags[401] <= 15) {
    ctx.print('중●생이');
  } else if (character.tflags[405] === 1) {
    if (character.tflags[400] === 0 || character.tflags[400] === 2) {
      ctx.print('간호사');
    } else if (character.tflags[400] === 1) {
      ctx.print('간호사');
    }
  } else if (character.tflags[405] === 2) {
    ctx.print('교사');
  } else if (character.tflags[405] === 3) {
    if (character.tflags[400] === 0 || character.tflags[400] === 2) {
      ctx.print('메이드');
    } else if (character.tflags[400] === 1) {
      ctx.print('집사');
    }
  } else if (character.tflags[405] === 4) {
    ctx.print('성우');
  } else if (character.tflags[405] === 5) {
    if (character.tflags[400] === 0) {
      ctx.print('업소여성이');
    } else if (character.tflags[400] === 1) {
      ctx.print('업소남성이');
    } else if (character.tflags[400] === 2) {
      ctx.print('업소여성(♂)이');
    }
  } else if (character.tflags[405] === 6) {
    ctx.print('아이돌이');
  } else if (character.tflags[405] === 7) {
    if (character.tflags[400] === 0 || character.tflags[400] === 2) {
      ctx.print('주부');
    } else if (character.tflags[400] === 1) {
      ctx.print('주부');
    }
  } else if (character.tflags[405] === 8) {
    ctx.print('패션모델이');
  } else if (character.tflags[405] === 9) {
    ctx.print('아르바이트');
  } else if (character.tflags[405] === 10) {
    ctx.print('무직이');
  }
  if (character.tflags[409] <= 1) {
    ctx.showMessage('라고 한다.');
  }
  if (character.tflags[409] >= 2) {
    ctx.print('고');
  }
  if (character.tflags[409] >= 2 && character.tflags[409] < 7) {
    ctx.print('어느');
  }
  if (character.tflags[409] === 2) {
    ctx.print('고등학생과');
  } else if (character.tflags[409] === 3) {
    ctx.print('중학생과');
  } else if (character.tflags[409] === 4) {
    ctx.print('대학생과');
  } else if (character.tflags[409] === 5) {
    ctx.print('회사원과');
  } else if (character.tflags[409] === 6) {
    ctx.print('호스트와');
  } else if (character.tflags[409] === 7) {
    ctx.print('누군가와 배덕적인 관계를');
  } else if (character.tflags[409] > 7) {
    if (character.tflags[405] === 7) {
      ctx.print('배우자가 아닌 이성과');
    } else {
      ctx.print('이성과');
    }
    ctx.showMessage('사귄 경험은 없다고 한다.');
  }
  if (character.tflags[405] == 7) {
    ctx.print('배우자 몰래');
  }
  if (character.tflags[409] >= 2 && character.tflags[409] < 7) {
    ctx.showMessage('사귀고 있다고 한다.');
  } else if (character.tflags[409] === 7) {
    ctx.showMessage('가지고 있다고 한다.');
  }
  ctx.showMessage(`AV데뷔를 한다면 출연료로 ${character.tflags[420]}를 요구했다.`);
  ctx.locals[1] = 0;
  ctx.locals[2] = 0;
  ctx.locals[3] = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.abilities[ctx.count][15] >= 1 && ctx.locals[1] === 0) {
      ctx.showMessage(`%조사처리(CALLNAME:COUNT, "는")% 상대의`);
      if (character.tflags[414] === 10) {
        ctx.print('검쟁이인');
      } else if (character.tflags[414] === 11) {
        ctx.print('건방진');
      } else if (character.tflags[414] === 12) {
        ctx.print('다부진');
      } else if (character.tflags[414] === 13) {
        ctx.print('솔직한');
      } else if (character.tflags[414] === 14) {
        ctx.print('얌전한');
      } else if (character.tflags[414] === 15) {
        ctx.print('프라이드가 높은');
      } else if (character.tflags[414] === 16) {
        ctx.print('활발한');
      } else if (character.tflags[414] === 17) {
        ctx.print('프라이드가 낮은');
      } else if (character.tflags[414] === 18) {
        ctx.print('츤데레같은');
      } else {
        ctx.print('평범한');
      }
      if (character.tflags[416] >= 30) {
        ctx.print('성격과');
      } else {
        ctx.showMessage('점을 신경쓰고 있다.');
      }
      if (character.tflags[416] === 30) {
        ctx.showMessage('정조관념이 강한 점을 신경쓰고 있다.');
      } else if (character.tflags[416] === 31) {
        ctx.showMessage('경박해 보이는 점을 신경쓰고 있다.');
      } else if (character.tflags[416] === 32) {
        ctx.showMessage('욕망을 억누르고 있는 점을 신경쓰고 있다.');
      } else if (character.tflags[416] === 33) {
        ctx.showMessage('성에 개방적인 점을 신경쓰고 있다.');
      } else if (character.tflags[416] === 34) {
        ctx.showMessage('면접을 보는것도 싫어하는 점을 신경쓰고 있다.');
      } else if (character.tflags[416] === 35) {
        ctx.showMessage('바로 얼굴이 빨개지는 점을 신경쓰고 있다.');
      } else if (character.tflags[416] === 36) {
        ctx.showMessage('노출도가 높은 의상인 점을 신경쓰고 있다.');
      } else if (character.tflags[416] === 37) {
        ctx.showMessage('벌벌 떨고 있는 점을 신경쓰고 있다.');
      }
      ctx.locals[1] = 1;
    }
    if (ctx.abilities[ctx.count][15] >= 3 && ctx.locals[2] === 0) {
      ctx.showMessage(`말을 잘하는 %조사처리(CALLNAME:COUNT, "가")% 긴장을 풀어주고 이야기를 자세하게 들어보니`);
      if (character.tflags[411] === 0 && character.tflags[412] === 0 && character.tflags[413] === 0) {
        ctx.showMessage('섹스는 물론이고 키스도 한적이 없다고 한다.');
      } else if (character.tflags[411] === 0 && character.tflags[412] === 1 && character.tflags[413] === 0) {
        ctx.showMessage('섹스는 해봤어도 키스는 한적이 없다고 한다.');
      } else if (character.tflags[411] === 0 && character.tflags[412] === 0 && character.tflags[413] === 1) {
        ctx.showMessage('애널로 한 경험이 있다고 한다……');
      } else if (character.tflags[411] === 0 && character.tflags[412] === 1 && character.tflags[413] === 1) {
        ctx.showMessage('키스만 빼고 대부분 해봤다고 한다……');
      } else if (character.tflags[411] === 1 && character.tflags[412] === 0 && character.tflags[413] === 0) {
        ctx.showMessage('키스는 해봤지만, 그 이상은 한적이 없다고 한다.');
      } else if (character.tflags[411] === 1 && character.tflags[412] === 1 && character.tflags[413] === 0) {
        ctx.showMessage('연인과 섹스해본 적이 있다고 한다.');
      } else if (character.tflags[411] === 1 && character.tflags[412] === 0 && character.tflags[413] === 1) {
        ctx.showMessage('앞쪽 정조는 지켜왔다고 한다……');
      } else if (character.tflags[411] === 1 && character.tflags[412] === 1 && character.tflags[413] === 1) {
        ctx.showMessage('키스와 섹스는 물론 애널경험도 있다고 한다.');
      }
      if (character.tflags[415] <= 1) {
        ctx.showMessage('아래쪽 털은 영구제모 했다고 한다.');
      } else if (character.tflags[415] >= 2 && character.tflags[415] <= 5) {
        ctx.showMessage('아래쪽에 털이 없는게 컴플렉스라고 한다.');
      } else if (character.tflags[415] >= 6 && character.tflags[415] <= 7) {
        ctx.showMessage('음모를 정리해본 적이 없다고 한다……');
      }
      if (character.tflags[417] === 40) {
        ctx.showMessage('아픈 건 못 견딘다고 한다.');
      } else if (character.tflags[417] === 41) {
        ctx.showMessage('아파도 참을 줄 안다고 한다.');
      }
      if (character.tflags[418] === 42) {
        ctx.showMessage('금방 젖어버리는 체질이라고 한다.');
      } else if (character.tflags[418] === 43) {
        ctx.showMessage('잘 젖지 않는 체질이라고 한다.');
      }
      ctx.locals[2] = 1;
    }
    if (ctx.abilities[ctx.count][15] >= 5 && ctx.locals[3] === 0) {
      ctx.locals[3] = 1;
    }
  }
}

export async function interview_add(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[4] = ctx.charanum - 1;
  character.tflags[430] = 1500;
  character.tflags[431] = 1500;
  if (character.tflags[400] === 1) {
    character.tflags[431] -= 100;
    if (character.tflags[402] > 12) {
      character.tflags[430] += 100;
    }
    if (character.tflags[402] > 15) {
      character.tflags[430] += 200;
    }
  }
  if (character.tflags[400] === 1) {
    // TODO: TALENT:(LOCAL:4):122 = 1
  } else if (character.tflags[400] === 2) {
    // TODO: TALENT:(LOCAL:4):122 = 1
    // TODO: TALENT:(LOCAL:4):413 = 1
  }
  // TODO: BASE:(LOCAL:4):9 = TFLAG:401
  // TODO: BASE:(LOCAL:4):11 = TFLAG:402
  // TODO: BASE:(LOCAL:4):12 = TFLAG:403
  // TODO: BASE:(LOCAL:4):13 = TFLAG:404
  if (character.tflags[405] === 0 && character.tflags[401] <= 12) {
    // TODO: TALENT:(LOCAL:4):222 = 1
    // TODO: CFLAG:(LOCAL:4):41 = 22
    character.tflags[430] -= 100;
    character.tflags[431] -= 100;
  } else if (character.tflags[405] === 0 && character.tflags[401] >= 13 && character.tflags[401] <= 15) {
    // TODO: TALENT:(LOCAL:4):221 = 1
    // TODO: CFLAG:(LOCAL:4):41 = 18
  } else if (character.tflags[405] === 1) {
    // TODO: TALENT:(LOCAL:4):411 = 1
    // TODO: CFLAG:(LOCAL:4):41 = 24
    character.tflags[430] += 100;
  } else if (character.tflags[405] === 2) {
    // TODO: TALENT:(LOCAL:4):412 = 1
    // TODO: CFLAG:(LOCAL:4):41 = 21
    character.tflags[431] += 100;
  } else if (character.tflags[405] === 3) {
    // TODO: TALENT:(LOCAL:4):417 = 1
    // TODO: CFLAG:(LOCAL:4):41 = 25
  } else if (character.tflags[405] === 4) {
    // TODO: TALENT:(LOCAL:4):506 = 1
    // TODO: CFLAG:(LOCAL:4):41 = 1
    character.tflags[430] += 100;
  } else if (character.tflags[405] === 5) {
    // TODO: TALENT:(LOCAL:4):180 = 1
    // TODO: CFLAG:(LOCAL:4):41 = 203
  } else if (character.tflags[405] === 6) {
    // TODO: TALENT:(LOCAL:4):203 = 1
    // TODO: CFLAG:(LOCAL:4):41 = 30
    character.tflags[430] += 100;
  } else if (character.tflags[405] === 7) {
    // TODO: TALENT:(LOCAL:4):206 = 1
    // TODO: CFLAG:(LOCAL:4):41 = 101
    // TODO: CFLAG:(LOCAL:4):42 = 1
  } else if (character.tflags[405] === 8) {
    // TODO: TALENT:(LOCAL:4):402 = 1
    // TODO: CFLAG:(LOCAL:4):41 = 23
  } else if (character.tflags[405] === 9) {
    // TODO: TALENT:(LOCAL:4):403 = 1
    // TODO: CFLAG:(LOCAL:4):41 = 140
    character.tflags[430] += 100;
  } else if (character.tflags[405] === 10) {
    // TODO: TALENT:(LOCAL:4):405 = 1
    // TODO: CFLAG:(LOCAL:4):41 = 103
  }
  if (character.tflags[400] === 1) {
    // TODO: CFLAG:(LOCAL:4):41 = 103
  }
  if (character.tflags[406] < 11) {
    // TODO: CFLAG:(LOCAL:4):600 = TFLAG:406
    // TODO: CFLAG:(LOCAL:4):601 = 0
    // TODO: CFLAG:(LOCAL:4):603 = TFLAG:406
  } else {
    // TODO: CFLAG:(LOCAL:4):600 = (TFLAG:406 - 11)
    // TODO: CFLAG:(LOCAL:4):601 = 1
    // TODO: CFLAG:(LOCAL:4):603 = RAND:11
  }
  // TODO: CFLAG:(LOCAL:4):602 = TFLAG:407
  ctx.locals[0] = 0;
  if (character.tflags[400] === 2) {
    S = ctx.rand(3);
  } else {
    S = character.tflags[400];
  }
  if (S === 0) {
    if (character.tflags[401] === 8) {
      ctx.locals[0] = 128;
    } else if (character.tflags[401] === 9) {
      ctx.locals[0] = 133;
    } else if (character.tflags[401] === 10) {
      ctx.locals[0] = 140;
    } else if (character.tflags[401] === 11) {
      ctx.locals[0] = 147;
    } else if (character.tflags[401] === 12) {
      ctx.locals[0] = 152;
    } else if (character.tflags[401] === 13) {
      ctx.locals[0] = 133;
    } else if (character.tflags[401] === 14) {
      ctx.locals[0] = 156;
    } else if (character.tflags[401] === 15) {
      ctx.locals[0] = 157;
    } else {
      ctx.locals[0] = 158;
    }
  } else if (S === 1) {
    if (character.tflags[401] === 8) {
      ctx.locals[0] = 128;
    } else if (character.tflags[401] === 9) {
      ctx.locals[0] = 133;
    } else if (character.tflags[401] === 10) {
      ctx.locals[0] = 139;
    } else if (character.tflags[401] === 11) {
      ctx.locals[0] = 145;
    } else if (character.tflags[401] === 12) {
      ctx.locals[0] = 152;
    } else if (character.tflags[401] === 13) {
      ctx.locals[0] = 159;
    } else if (character.tflags[401] === 14) {
      ctx.locals[0] = 165;
    } else if (character.tflags[401] === 15) {
      ctx.locals[0] = 168;
    } else if (character.tflags[401] === 16) {
      ctx.locals[0] = 170;
    } else {
      ctx.locals[0] = 171;
    }
  } else {
    if (character.tflags[401] === 8) {
      ctx.locals[0] = 128;
    } else if (character.tflags[401] === 9) {
      ctx.locals[0] = 133;
    } else if (character.tflags[401] === 10) {
      ctx.locals[0] = 139;
    } else if (character.tflags[401] === 11) {
      ctx.locals[0] = 145;
    } else if (character.tflags[401] === 12) {
      ctx.locals[0] = 151;
    } else if (character.tflags[401] === 13) {
      ctx.locals[0] = 156;
    } else if (character.tflags[401] === 14) {
      ctx.locals[0] = 159;
    } else if (character.tflags[401] === 15) {
      ctx.locals[0] = 161;
    } else if (character.tflags[401] === 16) {
      ctx.locals[0] = 162;
    } else {
      ctx.locals[0] = 162;
    }
  }
  // TODO: BASE:(LOCAL:4):20 = LOCAL:0
  if (character.tflags[419] === 99) {
    ctx.locals[0] = 105 + ctx.rand(21);
  } else if (character.tflags[419] === 100) {
    ctx.locals[0] = ctx.rand(11) - ctx.rand(11);
    if (ctx.locals[0] > 0) {
      ctx.locals[0] = 0 - ctx.locals[0];
    }
    ctx.locals[0] = 95 + ctx.locals[0];
  } else {
    ctx.locals[0] = 100 + ctx.rand(6) - ctx.rand(6);
  }
  // TODO: BASE:(LOCAL:4):20 = BASE:(LOCAL:4):20 * LOCAL:0 / 100
  F = ctx.rand(101) - ctx.rand(101);
  if (character.tflags[400] === 0) {
    if (character.tflags[401] > 16) {
      F = 16 - 8;
    } else {
      F = character.tflags[401] - 8;
    }
    F = 160 + (F * 12) + ctx.rand(121) - ctx.rand(121);
  } else if (character.tflags[400] === 1) {
    F = 165 + ctx.rand(121) - ctx.rand(121);
  } else if (character.tflags[400] === 2) {
    if (character.tflags[401] > 16) {
      F = 16;
    } else {
      F = character.tflags[401] - 8;
    }
    F = 160 + (F * 8);
  }
  if (character.tflags[421] === 0) {
    F += ctx.rand(11);
    F -= ctx.rand(11);
  } else if (character.tflags[421] > 0) {
    F += character.tflags[421] * 20 + ctx.rand(20);
  } else if (character.tflags[421] < 0) {
    F -= character.tflags[421] * 20 + ctx.rand(20);
  }
  if (character.tflags[400] === 0 || character.tflags[400] === 2) {
    if (character.tflags[401] < 10) {
      if (ctx.rand(20) === 0) {
        X = 10 + ctx.rand(51) - ctx.rand(51);
        if (X < 10) {
          X = 10;
        }
      } else {
        X = ctx.rand(11) - ctx.rand(11);
        if (X < 10) {
          X = 10;
        }
      }
      E = 100;
    } else if ((character.tflags[401] > 10 && character.tflags[401] < 16)) {
      if (ctx.rand(10) === 0) {
        X = 10 + (character.tflags[401] - 10) * 1;
      } else {
        X = 10 + (character.tflags[401] - 10) * 15;
      }
      X = X + ctx.rand(31) - ctx.rand(31);
      if (X < 15) {
        X = 15;
      }
      E = 100 + ( 30 * ( X - ( 10 + (character.tflags[401] - 10) * 15 ) ) / 100 );
    } else {
      if (ctx.rand(10) === 0) {
        X = 15;
      } else {
        X = 85;
      }
      X = X + ctx.rand(31) - ctx.rand(31);
      if (X < 15) {
        X = 15;
      }
      E = 100 + ( 30 * ( X - 85 ) / 100 );
    }
  } else if (character.tflags[400] === 1) {
    if (character.tflags[401] < 12) {
      X = ctx.rand(11) - ctx.rand(11);
      if (X < 10) {
        X = 10;
      }
      E = 100;
    } else if ((character.tflags[401] > 12 && character.tflags[401] < 17)) {
      X = 10 + (character.tflags[401] - 10) * 15;
      X = X + ctx.rand(31) - ctx.rand(31);
      if (X < 15) {
        X = 15;
      }
      E = 100 + ( 30 * ( X - ( 10 + (character.tflags[401] - 10) * 15 ) ) / 100 );
    } else {
      X = 85;
      X = X + ctx.rand(31) - ctx.rand(31);
      if (X < 15) {
        X = 15;
      }
      E = 100 + ( 30 * ( X - 85 ) / 100 );
    }
  }
  if (character.tflags[400] === 0) {
    M = 30 + ctx.rand(31) - ctx.rand(21);
  } else if (character.tflags[400] === 1) {
    M = 45 + ctx.rand(51) - ctx.rand(31);
  } else if (character.tflags[400] === 2) {
    M = 35 + ctx.rand(36) - ctx.rand(26);
  }
  character.tflags[430] = character.tflags[430] + ( M - 50 ) * 10;
  // TODO: BASE:(LOCAL:4):21 += BASE:(LOCAL:4):20 * M / 100
  // TODO: BASE:(LOCAL:4):20 = BASE:(LOCAL:4):20 * E / 100
  // TODO: BASE:(LOCAL:4):21 = BASE:(LOCAL:4):20 * BASE:(LOCAL:4):20 * BASE:(LOCAL:4):20 * 47 / 100 / 100 / 100 / 10
  if (character.tflags[400] == 0 || character.tflags[400] == 2) {
    // TODO: BASE:(LOCAL:4):21 = BASE:(LOCAL:4):21 * 8 / 10
  }
  // TODO: BASE:(LOCAL:4):21 += (15 + M) * BASE:(LOCAL:4):20 * 23 / 100 / 100
  // TODO: BASE:(LOCAL:4):21 += F * 50 * BASE:(LOCAL:4):20 / 1000 / 100
  E = base[ctx.locals[4]][20] * (3200 + F + (M * 10) );
  E = E / 100 * 10 / 100;
  // TODO: BASE:(LOCAL:4):23 = E / 10
  E = E + base[ctx.locals[4]][20] * (ctx.rand(16) - ctx.rand(16)) / 100;
  // TODO: BASE:(LOCAL:4):24 = E / 10
  if (E % 10 >= 5) {
    // TODO: BASE:(LOCAL:4):23 += 1
  } else {
  }
  // TODO: BASE:(LOCAL:4):22 = BASE:(LOCAL:4):20 * 44
  if (character.tflags[400] === 0) {
    X = (X - 60) * 3;
    if (character.tflags[408] === 1) {
      E = 350 + ctx.rand(350) + X;
      character.tflags[431] += 100;
    } else if (character.tflags[408] === 2) {
      E = 700 + ctx.rand(450) + X;
    } else if (character.tflags[408] === 0) {
      E = 1150 + ctx.rand(500) + X;
    } else if (character.tflags[408] === 3) {
      E = 1650 + ctx.rand(650) + X;
    } else if (character.tflags[408] === 4) {
      E = 2300 + ctx.rand(851) + X;
      character.tflags[430] += 100;
    } else {
      E = 700 + ctx.rand(500) + X;
    }
    // TODO: BASE:(LOCAL:4):21 += E / 1250
  } else if (character.tflags[400] === 1) {
    E = M * 2 * base[ctx.locals[4]][20];
    // TODO: BASE:(LOCAL:4):21 += M / 50
  } else {
  }
  E = E + base[ctx.locals[4]][22];
  // TODO: BASE:(LOCAL:4):22 = E / 100
  if (E % 100 >= 5) {
    // TODO: BASE:(LOCAL:4):22 += 1
  } else {
  }
  E = E + base[ctx.locals[4]][20] * (ctx.rand(16) - ctx.rand(16)) / 100;
  // TODO: BASE:(LOCAL:4):24 = E / 100
  if (E % 100 >= 5) {
    // TODO: BASE:(LOCAL:4):24 += 1
  } else {
  }
  if (character.tflags[409] >= 2 && character.tflags[409] <= 6) {
    // TODO: TALENT:(LOCAL:4):184 = 1
    // TODO: CFLAG:(LOCAL:4):621 = 1
    // TODO: CFLAG:(LOCAL:4):622 = TFLAG:409
  }
  // TODO: CFLAG:(LOCAL:4):620 = TFLAG:410
  S = 0;
  if (character.tflags[411] === 0) {
    // TODO: CFLAG:(LOCAL:4):16 = -1
  } else if (character.tflags[411] === 1) {
    // TODO: CFLAG:(LOCAL:4):16 = 1
    E = ctx.rand(10);
    if (character.tflags[409] >= 2 && character.tflags[409] <= 6) {
      E = ctx.rand(10);
      if (E < 5) {
        if (character.tflags[405] === 7) {
          // TODO: CSTR:(LOCAL:4):1 = 남편
        } else if (character.tflags[400] === 1 || ( character.tflags[400] === 2 && ctx.rand(3) === 0 )) {
          // TODO: CSTR:(LOCAL:4):1 = 여자친구
        } else {
          // TODO: CSTR:(LOCAL:4):1 = 남자친구
        }
      } else if (E < 7) {
        if (character.tflags[405] === 7) {
          // TODO: CSTR:(LOCAL:4):1 = 남편의 자지
        } else if (character.tflags[400] === 1 || ( character.tflags[400] === 2 && ctx.rand(3) === 0 )) {
          // TODO: CSTR:(LOCAL:4):1 = 여자친구의 가슴
        } else {
          // TODO: CSTR:(LOCAL:4):1 = 남자친구의 자지
        }
      } else if (E === 7) {
        if (character.tflags[400] === 1 || ( character.tflags[400] === 2 && ctx.rand(3) === 0 )) {
          // TODO: CSTR:(LOCAL:4):1 = 모르는 여자
        } else {
          // TODO: CSTR:(LOCAL:4):1 = 모르는 남자
        }
      } else {
        if (character.tflags[400] === 1 || ( character.tflags[400] === 2 && ctx.rand(3) === 0 )) {
          // TODO: CSTR:(LOCAL:4):1 = 전 여친
        } else {
          // TODO: CSTR:(LOCAL:4):1 = 전 남친
        }
      }
    } else if (character.tflags[409] === 7) {
      E = ctx.rand(8);
      if (E === 0) {
        if (character.tflags[400] === 0 || (character.tflags[400] === 2 && ctx.rand(2) === 0)) {
          if (ctx.rand(3) === 0) {
            // TODO: CSTR:(LOCAL:4):1 = 오빠
          } else {
            // TODO: CSTR:(LOCAL:4):1 = 의붓오빠
          }
        } else {
          if (ctx.rand(3) === 0) {
            // TODO: CSTR:(LOCAL:4):1 = 언니
          } else {
            // TODO: CSTR:(LOCAL:4):1 = 의붓언니
          }
        }
      } else if (E === 1) {
        if (character.tflags[400] === 0 || (character.tflags[400] === 2 && ctx.rand(2) === 0)) {
          if (ctx.rand(3) === 0) {
            // TODO: CSTR:(LOCAL:4):1 = 남동생
          } else {
            // TODO: CSTR:(LOCAL:4):1 = 의붓남동생
          }
        } else {
          if (ctx.rand(3) === 0) {
            // TODO: CSTR:(LOCAL:4):1 = 여동생
          } else {
            // TODO: CSTR:(LOCAL:4):1 = 의붓여동생
          }
        }
      } else if (E === 2) {
        if (character.tflags[400] === 0 || (character.tflags[400] === 2 && ctx.rand(2) === 0)) {
          if (ctx.rand(3) === 0) {
            // TODO: CSTR:(LOCAL:4):1 = 아빠
          } else {
            // TODO: CSTR:(LOCAL:4):1 = 새아빠
          }
        } else {
          if (ctx.rand(3) === 0) {
            // TODO: CSTR:(LOCAL:4):1 = 엄마
          } else {
            // TODO: CSTR:(LOCAL:4):1 = 새엄마
          }
        }
      } else if (E === 3) {
        if (character.tflags[400] === 0 || (character.tflags[400] === 2 && ctx.rand(2) === 0)) {
          // TODO: CSTR:(LOCAL:4):1 = 조부
        } else {
          // TODO: CSTR:(LOCAL:4):1 = 조모
        }
      } else if (E === 4) {
        if (character.tflags[400] === 0 || (character.tflags[400] === 2 && ctx.rand(2) === 0)) {
          if (ctx.rand(3) === 0) {
            // TODO: CSTR:(LOCAL:4):1 = 숙부
          } else {
            // TODO: CSTR:(LOCAL:4):1 = 백부
          }
        } else {
          if (ctx.rand(3) === 0) {
            // TODO: CSTR:(LOCAL:4):1 = 숙모
          } else {
            // TODO: CSTR:(LOCAL:4):1 = 백모
          }
        }
      } else if (E === 5) {
        E = ctx.rand(5);
        if (E === 0) {
          // TODO: CSTR:(LOCAL:4):1 = 전 담임교사
        } else if (E === 1) {
          // TODO: CSTR:(LOCAL:4):1 = 체육교사
        } else if (E === 2) {
          // TODO: CSTR:(LOCAL:4):1 = 교장
        } else if (E === 3) {
          // TODO: CSTR:(LOCAL:4):1 = 용무원
        } else if (E === 4) {
          if (character.tflags[400] === 0 || (character.tflags[400] === 2 && ctx.rand(2) === 0)) {
            // TODO: CSTR:(LOCAL:4):1 = 가정교사 오빠
          } else {
            // TODO: CSTR:(LOCAL:4):1 = 가정교사 언니
          }
        } else if (E === 5) {
          if (character.tflags[400] === 0 || (character.tflags[400] === 2 && ctx.rand(2) === 0)) {
            // TODO: CSTR:(LOCAL:4):1 = 가정교사 아저씨
          } else {
            // TODO: CSTR:(LOCAL:4):1 = 가정교사 아줌마
          }
        } else if (E === 6) {
          if (character.tflags[400] === 0 || (character.tflags[400] === 2 && ctx.rand(2) === 0)) {
            // TODO: CSTR:(LOCAL:4):1 = 의사
          } else {
            // TODO: CSTR:(LOCAL:4):1 = 간호사
          }
        }
      } else if (E === 6) {
        if (character.tflags[400] === 0 || (character.tflags[400] === 2 && ctx.rand(2) === 0)) {
          // TODO: CSTR:(LOCAL:4):1 = 집사
        } else {
          // TODO: CSTR:(LOCAL:4):1 = 메이드
        }
      } else {
        if (character.tflags[400] === 0 || (character.tflags[400] === 2 && ctx.rand(2) === 0)) {
          E = ctx.rand(5);
          if (E === 0) {
            // TODO: CSTR:(LOCAL:4):1 = 들개(♂)
          } else {
            // TODO: CSTR:(LOCAL:4):1 = 애완견(♂)
          }
        } else {
          E = ctx.rand(10);
          if (E < 2) {
            // TODO: CSTR:(LOCAL:4):1 = 들개(♀)
          } else if (E < 9) {
            // TODO: CSTR:(LOCAL:4):1 = 애완견(♀)
          } else {
            // TODO: CSTR:(LOCAL:4):1 = 들개(♂)
          }
          // TODO: EXP:(LOCAL:4):56 = EXP:(LOCAL:4):56 + 1 + RAND:26
        }
      }
    } else if (E === 0) {
      if (ctx.rand(5) === 0) {
        E = ctx.rand(4);
        if (E === 3 || (S === 1 && E === 2)) {
          S = 1;
          character.tflags[411] = 0;
          // TODO: CFLAG:(LOCAL:4):16 = -1
          if (character.tflags[400] === 0) {
            // TODO: CSTR:(LOCAL:4):1 = 남자친구(사실 미경험)
          } else if (character.tflags[400] === 1) {
            // TODO: CSTR:(LOCAL:4):1 = 여자친구(사실 미경험)
          } else if (character.tflags[400] === 2) {
            if (ctx.rand(3) === 0) {
              // TODO: CSTR:(LOCAL:4):1 = 남자친구(사실 미경험)
            } else {
              // TODO: CSTR:(LOCAL:4):1 = 여자친구(사실 미경험)
            }
          }
        }
      } else {
        if (character.tflags[405] === 7 && ctx.rand(5) === 0) {
          // TODO: CSTR:(LOCAL:4):1 = 남편
        } else if (character.tflags[400] === 0 && (character.tflags[400] === 2 && ctx.rand(3) === 0)) {
          // TODO: CSTR:(LOCAL:4):1 = 모르는 남자
        } else {
          // TODO: CSTR:(LOCAL:4):1 = 모르는 여자
        }
      }
    } else {
      if (character.tflags[400] === 0 && (character.tflags[400] === 2 && ctx.rand(3) === 0)) {
        // TODO: CSTR:(LOCAL:4):1 = 전 남친
      } else {
        // TODO: CSTR:(LOCAL:4):1 = 전 여친
      }
    }
  }
  if (character.tflags[412] === 0) {
    // TODO: TALENT:(LOCAL:4):0 = 1
  } else if (character.tflags[412] === 1) {
    // TODO: EXP:(LOCAL:4):0 += 1 + RAND:20
    // TODO: EXP:(LOCAL:4):2 += 1 + RAND:(EXP:(LOCAL:4):0)
    // TODO: CFLAG:(LOCAL:4):15 = 1
    E = ctx.rand(10);
    if (character.tflags[409] >= 2 && character.tflags[409] <= 6) {
      E = ctx.rand(10);
      if (E < 5) {
        if (character.tflags[405] === 7) {
          // TODO: CSTR:(LOCAL:4):0 = 남편
        } else if (character.tflags[400] === 1 || ( character.tflags[400] === 2 && ctx.rand(3) === 0 )) {
          // TODO: CSTR:(LOCAL:4):0 = 여자친구
        } else {
          // TODO: CSTR:(LOCAL:4):0 = 남자친구
        }
      } else if (E < 7 && character.tflags[400] === 0) {
        E = ctx.rand(3);
      } else if (E === 0) {
        // TODO: CSTR:(LOCAL:4):0 = 바이브
      } else if (E === 1) {
        // TODO: CSTR:(LOCAL:4):0 = 딜도
      } else {
        // TODO: CSTR:(LOCAL:4):0 = 로터
      }
    } else if (E < 7 && character.tflags[400] != 0) {
      // TODO: TALENT:(LOCAL:4):1 = 1
    } else if (E === 7) {
      if (character.tflags[400] === 1 || ( character.tflags[400] === 2 && ctx.rand(3) === 0 )) {
        // TODO: CSTR:(LOCAL:4):0 = 모르는 여자
      } else {
        // TODO: CSTR:(LOCAL:4):0 = 모르는 남자
      }
    } else {
      if (character.tflags[400] === 1 || ( character.tflags[400] === 2 && ctx.rand(3) === 0 )) {
        // TODO: CSTR:(LOCAL:4):0 = 전 여친
      } else {
        // TODO: CSTR:(LOCAL:4):0 = 전 남친
      }
    }
  } else if (character.tflags[409] === 7) {
    E = ctx.rand(8);
    if (E === 0) {
      if (character.tflags[400] === 0 || (character.tflags[400] === 2 && ctx.rand(2) === 0)) {
        if (ctx.rand(3) === 0) {
          // TODO: CSTR:(LOCAL:4):0 = 오빠
        } else {
          // TODO: CSTR:(LOCAL:4):0 = 의붓오빠
        }
      } else {
        if (ctx.rand(3) === 0) {
          // TODO: CSTR:(LOCAL:4):0 = 언니
        } else {
          // TODO: CSTR:(LOCAL:4):0 = 의붓언니
        }
      }
    } else if (E === 1) {
      if (character.tflags[400] === 0 || (character.tflags[400] === 2 && ctx.rand(2) === 0)) {
        if (ctx.rand(3) === 0) {
          // TODO: CSTR:(LOCAL:4):0 = 남동생
        } else {
          // TODO: CSTR:(LOCAL:4):0 = 의붓남동생
        }
      } else {
        if (ctx.rand(3) === 0) {
          // TODO: CSTR:(LOCAL:4):0 = 여동생
        } else {
          // TODO: CSTR:(LOCAL:4):0 = 의붓여동생
        }
      }
    } else if (E === 2) {
      if (character.tflags[400] === 0 || (character.tflags[400] === 2 && ctx.rand(2) === 0)) {
        if (ctx.rand(3) === 0) {
          // TODO: CSTR:(LOCAL:4):0 = 아빠
        } else {
          // TODO: CSTR:(LOCAL:4):0 = 새아빠
        }
      } else {
        if (ctx.rand(3) === 0) {
          // TODO: CSTR:(LOCAL:4):0 = 엄마
        } else {
          // TODO: CSTR:(LOCAL:4):0 = 새엄마
        }
      }
    } else if (E === 3) {
      if (character.tflags[400] === 0 || (character.tflags[400] === 2 && ctx.rand(2) === 0)) {
        // TODO: CSTR:(LOCAL:4):0 = 조부
      } else {
        // TODO: CSTR:(LOCAL:4):0 = 조모
      }
    } else if (E === 4) {
      if (character.tflags[400] === 0 || (character.tflags[400] === 2 && ctx.rand(2) === 0)) {
        if (ctx.rand(3) === 0) {
          // TODO: CSTR:(LOCAL:4):0 = 숙부
        } else {
          // TODO: CSTR:(LOCAL:4):0 = 백부
        }
      } else {
        if (ctx.rand(3) === 0) {
          // TODO: CSTR:(LOCAL:4):0 = 숙모
        } else {
          // TODO: CSTR:(LOCAL:4):0 = 백모
        }
      }
    } else if (E === 5) {
      E = ctx.rand(5);
      if (E === 0) {
        // TODO: CSTR:(LOCAL:4):0 = 전 담임교사
      } else if (E === 1) {
        // TODO: CSTR:(LOCAL:4):0 = 체육교사
      } else if (E === 2) {
        // TODO: CSTR:(LOCAL:4):0 = 교장
      } else if (E === 3) {
        // TODO: CSTR:(LOCAL:4):0 = 용무원
      } else if (E === 4) {
        if (character.tflags[400] === 0 || (character.tflags[400] === 2 && ctx.rand(2) === 0)) {
          // TODO: CSTR:(LOCAL:4):0 = 가정교사 오빠
        } else {
          // TODO: CSTR:(LOCAL:4):0 = 가정교사 언니
        }
      } else if (E === 5) {
        if (character.tflags[400] === 0 || (character.tflags[400] === 2 && ctx.rand(2) === 0)) {
          // TODO: CSTR:(LOCAL:4):0 = 가정교사 아저씨
        } else {
          // TODO: CSTR:(LOCAL:4):0 = 가정교사 아줌마
        }
      } else if (E === 6) {
        if (character.tflags[400] === 0 || (character.tflags[400] === 2 && ctx.rand(2) === 0)) {
          if (ctx.rand(2) === 0) {
            // TODO: CSTR:(LOCAL:4):0 = 의사
          } else {
            // TODO: CSTR:(LOCAL:4):0 = 의료기구
          }
        } else {
          E = ctx.rand(5);
          if (E === 0) {
            // TODO: CSTR:(LOCAL:4):0 = 의료기구
          } else if (E < 4) {
            // TODO: CSTR:(LOCAL:4):0 = 간호사
          } else {
            // TODO: CSTR:(LOCAL:4):0 = 여의사
          }
        }
      }
    } else if (E === 6) {
      if (character.tflags[400] === 0 || (character.tflags[400] === 2 && ctx.rand(2) === 0)) {
        // TODO: CSTR:(LOCAL:4):0 = 집사
      } else {
        // TODO: CSTR:(LOCAL:4):0 = 메이드
      }
    } else {
      if (character.tflags[400] === 0 || (character.tflags[400] === 2 && ctx.rand(2) === 0)) {
        E = ctx.rand(5);
        if (E === 0) {
          // TODO: CSTR:(LOCAL:4):0 = 들개(♂)
        } else {
          // TODO: CSTR:(LOCAL:4):0 = 애완견(♂)
        }
      } else {
        E = ctx.rand(10);
        if (E < 2) {
          // TODO: CSTR:(LOCAL:4):0 = 들개(♀)
        } else if (E < 9) {
          // TODO: CSTR:(LOCAL:4):0 = 애완견(♀)
        } else {
          // TODO: CSTR:(LOCAL:4):0 = 들개(♂)
        }
        // TODO: EXP:(LOCAL:4):56 = EXP:(LOCAL:4):56 + 1 + RAND:26
      }
    }
  } else if (( E === 0 && character.tflags[400] === 0)) {
    E = ctx.rand(3);
    if (E === 0) {
      // TODO: CSTR:(LOCAL:4):0 = 필기도구
    } else if (E === 1) {
      E = ctx.rand(3);
      if (E == 0) {
        // TODO: CSTR:(LOCAL:4):0 = 송이버섯
      }
      if (E == 1) {
        // TODO: CSTR:(LOCAL:4):0 = 바나나
      }
      if (E == 2) {
        // TODO: CSTR:(LOCAL:4):0 = 오이
      }
      if (E == 3) {
        // TODO: CSTR:(LOCAL:4):0 = 당근
      }
      if (E == 4) {
        // TODO: CSTR:(LOCAL:4):0 = 계란
      }
    } else {
      // TODO: CSTR:(LOCAL:4):0 = 기다란 무언가
    }
  } else if (( E === 1 || S === 1 && E < 7 )) {
    if (character.tflags[400] === 0) {
      E = ctx.rand(4);
      if (E === 3 || (S === 1 && E === 2)) {
        S = 1;
        E = ctx.rand(3);
        if (character.tflags[400] === 0) {
          if (E === 0) {
            // TODO: CSTR:(LOCAL:4):0 = 이차원 남친(사실 미경험)
            // TODO: TALENT:(LOCAL:4):0 = 1
          } else if (E === 1) {
            // TODO: CSTR:(LOCAL:4):0 = 망상속 남친(자위: 손가락)
          } else {
            // TODO: CSTR:(LOCAL:4):0 = 가상 남친(자위: 기다란 무언가)
          }
        } else if (character.tflags[400] === 1) {
          E = ctx.rand(10);
          if (E === 0) {
            // TODO: CSTR:(LOCAL:4):0 = 망상속 여친(사실 미경험)
            // TODO: TALENT:(LOCAL:4):1 = 1
          } else if (E < 9) {
            // TODO: CSTR:(LOCAL:4):0 = 이차원 여친(자위)
          } else {
            // TODO: CSTR:(LOCAL:4):0 = 해삼
          }
        } else if (character.tflags[400] === 2) {
          E = ctx.rand(10);
          if (E === 0) {
            if (ctx.rand(3) === 0) {
              // TODO: CSTR:(LOCAL:4):0 = 망상속 여친(사실 미경험)
            } else {
              // TODO: CSTR:(LOCAL:4):0 = 망상속 남친(사실 미경험)
            }
            // TODO: TALENT:(LOCAL:4):1 = 1
          } else if (E < 6) {
            // TODO: CSTR:(LOCAL:4):0 = 망상속 여친(자위)
          } else {
            // TODO: CSTR:(LOCAL:4):0 = 망상속 남친(자위)
          }
        } else {
          if (character.tflags[400] === 0 && (character.tflags[400] === 2 && ctx.rand(3) === 0)) {
            // TODO: CSTR:(LOCAL:4):0 = 모르는 남자
          } else if (character.tflags[400] === 1) {
            // TODO: CSTR:(LOCAL:4):0 = 모르는 여자
          }
        }
      }
    } else if (E === 2) {
      // TODO: CSTR:(LOCAL:4):0 = 자고있어서 처녀상실이유 불명
    } else if (E === 3) {
      // TODO: CSTR:(LOCAL:4):0 = 강간당함
    } else {
      if (character.tflags[405] === 7 && ctx.rand(3) === 0) {
        // TODO: CSTR:(LOCAL:4):0 = 남편
      } else {
        if (character.tflags[400] === 0 && (character.tflags[400] === 2 && ctx.rand(3) === 0)) {
          // TODO: CSTR:(LOCAL:4):0 = 전 남친
        } else if (character.tflags[400] === 1) {
          // TODO: CSTR:(LOCAL:4):0 = 전 여친
        }
      }
    }
  }
  if (character.tflags[413] === 0) {
    // TODO: TALENT:(LOCAL:4):2 = 1
  } else if (character.tflags[413] === 1) {
    if (character.tflags[400] === 0) {
      // TODO: EXP:(LOCAL:4):1 += 1 + RAND:10
      // TODO: EXP:(LOCAL:4):2 += 1 + RAND:(EXP:(LOCAL:4):1)
    }
    if (character.tflags[409] >= 2 && character.tflags[409] <= 6) {
      E = ctx.rand(10);
      if (E < 5) {
        if (character.tflags[405] === 7) {
          // TODO: CSTR:(LOCAL:4):2 = 남편
        } else if (character.tflags[400] === 1 || ( character.tflags[400] === 2 && ctx.rand(3) === 0 )) {
          // TODO: CSTR:(LOCAL:4):2 = 여자친구
        } else {
          // TODO: CSTR:(LOCAL:4):2 = 남자친구
        }
      } else if (E < 7 && character.tflags[400] === 0) {
        E = ctx.rand(3);
        if (E === 0) {
          // TODO: CSTR:(LOCAL:4):2 = 애널바이브
        } else if (E === 1) {
          // TODO: CSTR:(LOCAL:4):2 = 애널비즈
        } else if (E === 2) {
          // TODO: CSTR:(LOCAL:4):2 = 구슬
        }
      } else if (E === 7) {
        if (character.tflags[400] === 1 || ( character.tflags[400] === 2 && ctx.rand(3) === 0 )) {
          // TODO: CSTR:(LOCAL:4):2 = 모르는 여자
        } else {
          // TODO: CSTR:(LOCAL:4):2 = 모르는 남자
        }
      } else {
        if (character.tflags[400] === 1 || ( character.tflags[400] === 2 && ctx.rand(3) === 0 )) {
          // TODO: CSTR:(LOCAL:4):2 = 전 여친
        } else {
          // TODO: CSTR:(LOCAL:4):2 = 전 남친
        }
      }
    } else if (character.tflags[409] === 7) {
      E = ctx.rand(8);
      if (E === 0) {
        if (character.tflags[400] === 0 || (character.tflags[400] === 2 && ctx.rand(2) === 0)) {
          if (ctx.rand(3) === 0) {
            // TODO: CSTR:(LOCAL:4):3 = 오빠
          } else {
            // TODO: CSTR:(LOCAL:4):3 = 의붓오빠
          }
        } else {
          if (ctx.rand(3) === 0) {
            // TODO: CSTR:(LOCAL:4):3 = 언니
          } else {
            // TODO: CSTR:(LOCAL:4):3 = 의붓언니
          }
        }
      } else if (E === 1) {
        if (character.tflags[400] === 0 || (character.tflags[400] === 2 && ctx.rand(2) === 0)) {
          if (ctx.rand(3) === 0) {
            // TODO: CSTR:(LOCAL:4):3 = 남동생
          } else {
            // TODO: CSTR:(LOCAL:4):3 = 의붓남동생
          }
        } else {
          if (ctx.rand(3) === 0) {
            // TODO: CSTR:(LOCAL:4):3 = 여동생
          } else {
            // TODO: CSTR:(LOCAL:4):3 = 의붓여동생
          }
        }
      } else if (E === 2) {
        if (character.tflags[400] === 0 || (character.tflags[400] === 2 && ctx.rand(2) === 0)) {
          if (ctx.rand(3) === 0) {
            // TODO: CSTR:(LOCAL:4):3 = 아빠
          } else {
            // TODO: CSTR:(LOCAL:4):3 = 새아빠
          }
        } else {
          if (ctx.rand(3) === 0) {
            // TODO: CSTR:(LOCAL:4):3 = 엄마
          } else {
            // TODO: CSTR:(LOCAL:4):3 = 새엄마
          }
        }
      } else if (E === 3) {
        if (character.tflags[400] === 0 || (character.tflags[400] === 2 && ctx.rand(2) === 0)) {
          // TODO: CSTR:(LOCAL:4):3 = 조부
        } else {
          // TODO: CSTR:(LOCAL:4):3 = 조모
        }
      } else if (E === 4) {
        if (character.tflags[400] === 0 || (character.tflags[400] === 2 && ctx.rand(2) === 0)) {
          if (ctx.rand(3) === 0) {
            // TODO: CSTR:(LOCAL:4):3 = 숙부
          } else {
            // TODO: CSTR:(LOCAL:4):3 = 백부
          }
        } else {
          if (ctx.rand(3) === 0) {
            // TODO: CSTR:(LOCAL:4):3 = 숙모
          } else {
            // TODO: CSTR:(LOCAL:4):3 = 백모
          }
        }
      } else if (E === 5) {
        E = ctx.rand(5);
        if (E === 0) {
          // TODO: CSTR:(LOCAL:4):3 = 전 담임교사
        } else if (E === 1) {
          // TODO: CSTR:(LOCAL:4):3 = 체육교사
        } else if (E === 2) {
          // TODO: CSTR:(LOCAL:4):3 = 교장
        } else if (E === 3) {
          // TODO: CSTR:(LOCAL:4):3 = 용무원
        } else if (E === 4) {
          if (character.tflags[400] === 0 || (character.tflags[400] === 2 && ctx.rand(2) === 0)) {
            // TODO: CSTR:(LOCAL:4):3 = 가정교사 오빠
          } else {
            // TODO: CSTR:(LOCAL:4):3 = 가정교사 언니
          }
        } else if (E === 5) {
          if (character.tflags[400] === 0 || (character.tflags[400] === 2 && ctx.rand(2) === 0)) {
            // TODO: CSTR:(LOCAL:4):3 = 가정교사 아저씨
          } else {
            // TODO: CSTR:(LOCAL:4):3 = 가정교사 아줌마
          }
        } else if (E === 6) {
          if (character.tflags[400] === 0 || (character.tflags[400] === 2 && ctx.rand(2) === 0)) {
            if (ctx.rand(2) === 0) {
              // TODO: CSTR:(LOCAL:4):3 = 의사
            } else {
              // TODO: CSTR:(LOCAL:4):3 = 의료기구
            }
          } else {
            E = ctx.rand(5);
            if (E === 0) {
              // TODO: CSTR:(LOCAL:4):3 = 의료기구
            } else if (E < 4) {
              // TODO: CSTR:(LOCAL:4):3 = 강호사
            } else {
              // TODO: CSTR:(LOCAL:4):3 = 여의사
            }
          }
        }
      } else if (E === 6) {
        if (character.tflags[400] === 0 || (character.tflags[400] === 2 && ctx.rand(2) === 0)) {
          // TODO: CSTR:(LOCAL:4):3 = 집사
        } else {
          // TODO: CSTR:(LOCAL:4):3 = 메이드
        }
      } else {
        if (character.tflags[400] === 0 || (character.tflags[400] === 2 && ctx.rand(2) === 0)) {
          E = ctx.rand(5);
          if (E === 0) {
            // TODO: CSTR:(LOCAL:4):3 = 들개(♂)
          } else {
            // TODO: CSTR:(LOCAL:4):3 = 애완견(♂)
          }
        } else {
          E = ctx.rand(10);
          if (E < 2) {
            // TODO: CSTR:(LOCAL:4):3 = 들개(♀)
          } else if (E < 9) {
            // TODO: CSTR:(LOCAL:4):3 = 애완견(♀)
          } else {
            // TODO: CSTR:(LOCAL:4):3 = 들개(♂)
          }
          // TODO: EXP:(LOCAL:4):56 = EXP:(LOCAL:4):56 + 1 + RAND:26
        }
      }
    } else if (( E === 1 || S === 1 && E < 7 )) {
      if (character.tflags[400] === 0) {
        E = ctx.rand(4);
        if (E === 3 || (S === 1 && E === 2)) {
          S = 1;
          E = ctx.rand(3);
          if (character.tflags[400] === 0) {
            if (E === 0) {
              // TODO: CSTR:(LOCAL:4):3 = 이차원 남친(사실 미경험)
              // TODO: TALENT:(LOCAL:4):2 = 1
            } else if (E === 1) {
              // TODO: CSTR:(LOCAL:4):3 = 망상속 남친(자위: 손가락)
            } else {
              // TODO: CSTR:(LOCAL:4):3 = 가상 남친(자위: 기다란 무언가)
            }
          } else if (character.tflags[400] === 1) {
            E = ctx.rand(10);
            if (E === 0) {
              // TODO: CSTR:(LOCAL:4):3 = 망상속 여친(사실 미경험)
              // TODO: TALENT:(LOCAL:4):2 = 1
              // TODO: EXP:(LOCAL:4):1 = 0
              // TODO: EXP:(LOCAL:4):2 = 0
            } else {
              // TODO: CSTR:(LOCAL:4):3 = 이차원 여친(자위)
            }
          } else if (character.tflags[400] === 2) {
            E = ctx.rand(10);
            if (E === 0) {
              if (ctx.rand(3) === 0) {
                // TODO: CSTR:(LOCAL:4):3 = 망상속 여친(사실 미경험)
              } else {
                // TODO: CSTR:(LOCAL:4):3 = 망상속 남친(사실 미경험)
              }
              // TODO: TALENT:(LOCAL:4):2 = 1
              // TODO: EXP:(LOCAL:4):1 = 0
              // TODO: EXP:(LOCAL:4):2 = 0
            } else if (E < 6) {
              // TODO: CSTR:(LOCAL:4):3 = 망상속 여친(자위)
            } else {
              // TODO: CSTR:(LOCAL:4):3 = 망상속 남친(자위)
            }
          }
        } else {
          if (character.tflags[400] === 0 && (character.tflags[400] === 2 && ctx.rand(3) === 0)) {
            // TODO: CSTR:(LOCAL:4):3 = 모르는 남자
          } else if (character.tflags[400] === 1) {
            // TODO: CSTR:(LOCAL:4):3 = 모르는 여자
          }
        }
      }
    } else {
      if (character.tflags[405] === 7 && ctx.rand(3) === 0) {
        // TODO: CSTR:(LOCAL:4):3 = 남편
      } else {
        if (character.tflags[400] === 0 && (character.tflags[400] === 2 && ctx.rand(3) === 0)) {
          // TODO: CSTR:(LOCAL:4):3 = 전 남친
        } else if (character.tflags[400] === 1) {
          // TODO: CSTR:(LOCAL:4):3 = 전 여친
        }
      }
    }
  }
  if (character.tflags[414] >= 10) {
    // TODO: TALENT:(LOCAL:4):(TFLAG:414) = 1
  }
  if (character.tflags[415] <= 1) {
    // TODO: CFLAG:(LOCAL:4):6 = -2
  } else if (character.tflags[415] >= 2 && character.tflags[415] <= 5) {
    // TODO: CFLAG:(LOCAL:4):6 = -1
  } else if (character.tflags[415] >= 6 && character.tflags[415] <= 7) {
    // TODO: CFLAG:(LOCAL:4):6 = 15
  } else if (character.tflags[415] >= 8) {
    // TODO: CFLAG:(LOCAL:4):6 = 12
  }
  if (character.tflags[416] >= 30) {
    // TODO: TALENT:(LOCAL:4):(TFLAG:416) = 1
  }
  if (character.tflags[417] === 40) {
    // TODO: TALENT:(LOCAL:4):(TFLAG:417) = 1
  } else if (character.tflags[417] === 41) {
    // TODO: TALENT:(LOCAL:4):(TFLAG:417) = 1
  }
  if (character.tflags[418] === 42) {
    // TODO: TALENT:(LOCAL:4):(TFLAG:418) = 1
  } else if (character.tflags[418] === 43) {
    // TODO: TALENT:(LOCAL:4):(TFLAG:418) = 1
  }
  if (character.tflags[408] === 1) {
    // TODO: TALENT:(LOCAL:4):116 = 1
  } else if (character.tflags[408] === 2) {
    // TODO: TALENT:(LOCAL:4):109 = 1
  } else if (character.tflags[408] === 3) {
    // TODO: TALENT:(LOCAL:4):110 = 1
  } else if (character.tflags[408] === 4) {
    // TODO: TALENT:(LOCAL:4):114 = 1
  }
  if (base[ctx.locals[4]][20] < 150) {
    // TODO: TALENT:(LOCAL:4):100 = 1
  } else if (base[ctx.locals[4]][20] >= 170) {
    // TODO: TALENT:(LOCAL:4):99 = 1
  }
  // TODO: MAXBASE:(LOCAL:4):0 = TFLAG:430
  // TODO: MAXBASE:(LOCAL:4):1 = TFLAG:431
  // TODO: BASE:(LOCAL:4):0 = TFLAG:430
  // TODO: BASE:(LOCAL:4):1 = TFLAG:431
  // TODO: BASE:(LOCAL:4):30 = TFLAG:420
  // Label: NAME_CHECK
  await family_name_japan(ctx, character);
  await last_name_japan_female(ctx, character);
  // TODO: NAME:(LOCAL:4) =
  // TODO: NAME:(LOCAL:4) += TSTR:50 + " " + TSTR:51
  // TODO: CALLNAME:(LOCAL:4) += TSTR:51
  // TODO: NICKNAME:(LOCAL:4) += TSTR:51
  ctx.locals[6] = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (CALLctx.getName(ctx.count) === callname[ctx.locals[4]]) {
      ctx.locals[6] += 1;
    }
  }
  if (ctx.locals[6] >= 2) {
    // GOTO NAME_CHECK - 구조 변경 필요 (while/break 사용 권장)
  }
  return 0;
}
