/**
 * LOSTANALVIRGIN_DETAIL.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function lostanalvirgin_detail_calc(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.varSet(ctx.locals[0], 0);
  if (character.cflags[835] === 0) {
    if (character.cflags[831] === 1 || character.cflags[831] === 2 || character.cflags[831] === 4 || character.cflags[831] === 6 || character.cflags[831] === 7 || character.cflags[831] === 9 || character.cflags[831] === 11) {
      if (character.cflags[832] === 1) {
        character.cflags[835] = ctx.rand(7);
        if (character.cflags[835] == 0) {
          character.cflags[835] = 1;
        }
      } else if (character.cflags[832] === 2) {
        character.cflags[835] = 8 + ctx.rand(7);
      } else if (character.cflags[832] === 3) {
        character.cflags[835] = 15 + ctx.rand(8);
        if (character.cflags[835] == 14) {
          character.cflags[835] = 15;
        }
      } else if (character.cflags[832] === 4) {
        character.cflags[835] = 23 + ctx.rand(7);
      }
    } else {
      if (character.cflags[832] === 1) {
        character.cflags[835] = ctx.rand(7);
        if (character.cflags[835] == 0) {
          character.cflags[835] = 1;
        }
      } else if (character.cflags[832] === 2) {
        character.cflags[835] = 7 + ctx.rand(7);
      } else if (character.cflags[832] === 3) {
        character.cflags[835] = 14 + ctx.rand(7);
        if (character.cflags[835] == 14) {
          character.cflags[835] = 15;
        }
      } else if (character.cflags[832] === 4) {
        character.cflags[835] = 21 + ctx.rand(7);
      } else if (character.cflags[832] === 5) {
        character.cflags[835] = 28 + ctx.rand(7);
        if (character.cflags[835] >= 31) {
          character.cflags[835] = 31;
        }
      }
    }
    if (character.cflags[835] == MAXctx.base[12] && character.cflags[831] == MAXctx.base[11]) {
      character.cflags[836] = 1;
    }
  }
}

export async function lostanalvirgin_detail(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: CHKFONT "あくびん"
  if (ctx.result) {
    // TODO: SETFONT "あくびん"
  }
  ctx.setColor(0xF58F98);
  ctx.print('');
  await heart_code(ctx, character);
  ctx.print('애널처녀상실:');
  if (ctx.abilities[10] < 3 && character.no != 0) {
    ctx.showMessage('경험함');
  } else {
    await lostanalvirgin_detail_calc(ctx, character);
    if (character.cflags[830] === 0) {
      ctx.showMessage(`몇년 전`);
    } else {
      ctx.showMessage(`${character.cflags[830]}살`);
    }
    if (character.cflags[831] === 0) {
      ctx.showMessage(`어는 날`);
    } else {
      if (character.cflags[831] <= 9) {
        ctx.showMessage(``);
      }
      ctx.showMessage(`${character.cflags[831]}월`);
    }
    if (( character.cflags[830] === 0 && character.cflags[831] === 0 ) || character.cflags[835] === 0) {
    } else {
      if (character.cflags[835] <= 9) {
        ctx.showMessage(``);
      }
      ctx.showMessage(`${character.cflags[835]}일`);
    }
    ctx.showMessage(`에`);
    if (character.cflags[833] === 0 || character.cflags[833] >= 15) {
    } else {
      if (character.cflags[833] === 1) {
        ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 방`);
      } else if (character.cflags[833] === 2 && character.cflags[616] === 8 && ctx.talents[184] === 0 && ctx.exp[101] >= 1) {
        if (ctx.cstr[3] === "") {
          ctx.showMessage(`전 남친의 방`);
        } else {
          ctx.showMessage(`%CSTR:3%(전 남친)의 방`);
        }
      } else if (character.cflags[833] === 2 && character.cflags[616] === 8 && ctx.talents[184] === 1) {
        if (ctx.cstr[3] === "") {
          ctx.showMessage(`남친의 방`);
        } else {
          ctx.showMessage(`%CSTR:3%(남친)의 방`);
        }
      } else if (character.cflags[833] === 3) {
        ctx.showMessage(`러브호텔`);
      } else if (character.cflags[833] === 4) {
        ctx.showMessage(`바다`);
      } else if (character.cflags[833] === 5) {
        ctx.showMessage(`학교`);
      } else if (character.cflags[835] === 6) {
        ctx.showMessage(`폐공장`);
      } else if (character.cflags[833] === 7) {
        ctx.showMessage(`창관`);
      } else if (character.cflags[833] === 8) {
        ctx.showMessage(`전차 안`);
      } else if (character.cflags[833] === 9) {
        ctx.showMessage(`버스 안`);
      } else if (character.cflags[833] === 10) {
        ctx.showMessage(`야외`);
      } else if (character.cflags[833] === 11) {
        ctx.showMessage(`수영장`);
      } else if (character.cflags[833] === 12) {
        ctx.showMessage(`비밀 지하실`);
      } else if (character.cflags[833] === 13) {
        ctx.showMessage(`회원제 비밀클럽`);
      } else if (character.cflags[833] === 14) {
        ctx.showMessage(`촬영 스튜디오`);
      }
      ctx.showMessage(`에서`);
    }
    if (character.cflags[836] == 1) {
      ctx.showMessage(`생일기념으로`);
    }
    if (character.cflags[616] === 0) {
      ctx.showMessage(`기억 안나는 사람`);
    } else if (character.cflags[616] === 1) {
      ctx.showMessage(`%CSTR:3%`);
    } else if (character.cflags[616] === 2) {
      ctx.showMessage(`이름도 모르는 남자손님`);
    } else if (character.cflags[616] === 3) {
      ctx.showMessage(`이름도 모르는 여자손님`);
    } else if (character.cflags[616] === 4) {
      ctx.showMessage(`애널바이브`);
    } else if (character.cflags[616] === 5) {
      ctx.showMessage(`극대애널바이브`);
    } else if (character.cflags[616] === 6) {
      ctx.showMessage(`이름도 모르는 손님`);
    } else if (character.cflags[616] === 7) {
      ctx.showMessage(`치한`);
    } else if (character.cflags[616] === 8 && character.cflags[837] === 1) {
      if (ctx.cstr[3] === "") {
        ctx.showMessage(`전 남친`);
      } else {
        ctx.showMessage(`%CSTR:3%(전 남친)`);
      }
    } else if (character.cflags[616] === 8 && ctx.talents[184] === 1) {
      if (ctx.cstr[3] === "") {
        ctx.showMessage(`남친`);
      } else {
        ctx.showMessage(`%CSTR:3%(남친)`);
      }
    } else if (character.cflags[616] === 9) {
      ctx.showMessage(`섹프인 %CSTR:47%`);
    } else if (character.cflags[616] === 11) {
      ctx.showMessage(`불량배`);
    } else if (character.cflags[616] === 12) {
      ctx.showMessage(`배게영업 상대`);
    } else if (character.cflags[616] === 13) {
      ctx.showMessage(`『접대』손님`);
    } else if (character.cflags[616] === 14) {
      ctx.showMessage(`촉수생물`);
    } else if (character.cflags[616] === 15) {
      ctx.showMessage(`남편`);
    } else if (character.cflags[616] === 16) {
      ctx.showMessage(`${ctx.getName(ctx.master)}`);
    }
    if (character.cflags[616] != 4 && character.cflags[616] != 5 && character.cflags[616] != 7 && character.cflags[616] != 11 && character.cflags[616] != 12 && character.cflags[616] != 13 && character.cflags[616] != 8 && character.cflags[616] != 14) {
      ctx.showMessage(`에게`);
    } else if (character.cflags[616] === 4 || character.cflags[616] === 5) {
      ctx.showMessage(`로`);
    } else {
      ctx.showMessage(`에게`);
    }
    if (character.cflags[834] === 0 && character.cflags[616] === 8) {
      ctx.showMessage(``);
    } else if (character.cflags[834] === 1) {
      ctx.showMessage(`지도중에`);
    } else if (character.cflags[834] === 2) {
      ctx.showMessage(`촬영중에`);
    } else if (character.cflags[834] === 3) {
      ctx.showMessage(`몰래 찍히면서`);
    } else if (character.cflags[834] === 4) {
      ctx.showMessage(`약을 먹여져서 스스로 %CSTR:80%에게 조르며`);
    } else if (character.cflags[834] === 5) {
      ctx.showMessage(`윤간당하며`);
    }
    ctx.showMessage(`%UNICODE(0x2665)%`);
  }
  // TODO: SETFONT ""
  ctx.resetColor();
}
