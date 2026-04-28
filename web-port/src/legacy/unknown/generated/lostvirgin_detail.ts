/**
 * LOSTVIRGIN_DETAIL.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function lostvirgin_detail_calc(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.varSet(ctx.locals[0], 0);
  if (character.cflags[165] === 0) {
    if (character.cflags[161] === 1 || character.cflags[161] === 2 || character.cflags[161] === 4 || character.cflags[161] === 6 || character.cflags[161] === 7 || character.cflags[161] === 9 || character.cflags[161] === 11) {
      if (character.cflags[162] === 1) {
        character.cflags[165] = ctx.rand(7);
        if (character.cflags[165] == 0) {
          character.cflags[165] = 1;
        }
      } else if (character.cflags[162] === 2) {
        character.cflags[165] = 8 + ctx.rand(7);
      } else if (character.cflags[162] === 3) {
        character.cflags[165] = 15 + ctx.rand(8);
        if (character.cflags[165] == 14) {
          character.cflags[165] = 15;
        }
      } else if (character.cflags[162] === 4) {
        character.cflags[165] = 23 + ctx.rand(7);
      }
    } else {
      if (character.cflags[162] === 1) {
        character.cflags[165] = ctx.rand(7);
        if (character.cflags[165] == 0) {
          character.cflags[165] = 1;
        }
      } else if (character.cflags[162] === 2) {
        character.cflags[165] = 7 + ctx.rand(7);
      } else if (character.cflags[162] === 3) {
        character.cflags[165] = 14 + ctx.rand(7);
        if (character.cflags[165] == 14) {
          character.cflags[165] = 15;
        }
      } else if (character.cflags[162] === 4) {
        character.cflags[165] = 21 + ctx.rand(7);
      } else if (character.cflags[162] === 5) {
        character.cflags[165] = 28 + ctx.rand(7);
        if (character.cflags[165] >= 31) {
          character.cflags[165] = 31;
        }
      }
    }
    if (character.cflags[165] == MAXctx.base[12] && character.cflags[161] == MAXctx.base[11]) {
      character.cflags[166] = 1;
    }
  }
}

export async function lostvirgin_detail(
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
  ctx.print('처녀상실:');
  if (ctx.abilities[10] < 3 && character.no != 0) {
    ctx.showMessage('경험함');
  } else {
    await lostvirgin_detail_calc(ctx, character);
    if (character.cflags[160] === 0) {
      ctx.showMessage(`몇년 전`);
    } else {
      ctx.showMessage(`${character.cflags[160]}살`);
    }
    if (character.cflags[161] === 0) {
      ctx.showMessage(`어느 날`);
    } else {
      if (character.cflags[161] <= 9) {
        ctx.showMessage(``);
      }
      ctx.showMessage(`${character.cflags[161]}월`);
    }
    if (( character.cflags[160] === 0 && character.cflags[161] === 0 ) || character.cflags[165] === 0) {
    } else {
      if (character.cflags[165] <= 9) {
        ctx.showMessage(``);
      }
      ctx.showMessage(`${character.cflags[165]}일`);
    }
    ctx.showMessage(`에`);
    if (character.cflags[163] === 0 || character.cflags[163] >= 15) {
    } else {
      if (character.cflags[163] === 1) {
        ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 방`);
      } else if (character.cflags[163] === 2 && character.cflags[15] === 8 && ctx.talents[184] === 0 && ctx.exp[101] >= 1) {
        if (ctx.cstr[0] === "") {
          ctx.showMessage(`전 남친의 방`);
        } else {
          ctx.showMessage(`%CSTR:0%(전 남친)의 방`);
        }
      } else if (character.cflags[163] === 2 && character.cflags[15] === 8 && ctx.talents[184] === 1) {
        if (ctx.cstr[0] === "") {
          ctx.showMessage(`남친의 방`);
        } else {
          ctx.showMessage(`%CSTR:0%(남친)의 방`);
        }
      } else if (character.cflags[163] === 3) {
        ctx.showMessage(`러브호텔`);
      } else if (character.cflags[163] === 4) {
        ctx.showMessage(`바다`);
      } else if (character.cflags[163] === 5) {
        ctx.showMessage(`학교`);
      } else if (character.cflags[165] === 6) {
        ctx.showMessage(`폐공장`);
      } else if (character.cflags[163] === 7) {
        ctx.showMessage(`창관`);
      } else if (character.cflags[163] === 8) {
        ctx.showMessage(`전차 안`);
      } else if (character.cflags[163] === 9) {
        ctx.showMessage(`버스 안`);
      } else if (character.cflags[163] === 10) {
        ctx.showMessage(`야외`);
      } else if (character.cflags[163] === 11) {
        ctx.showMessage(`수영장`);
      } else if (character.cflags[163] === 12) {
        ctx.showMessage(`비밀 지하실`);
      } else if (character.cflags[163] === 13) {
        ctx.showMessage(`회원제 비밀클럽`);
      } else if (character.cflags[163] === 14) {
        ctx.showMessage(`촬영 스튜디오`);
      }
      ctx.showMessage(`에서,`);
    }
    if (character.cflags[166] == 1) {
      ctx.showMessage(`생일기념으로`);
    }
    if (character.cflags[15] === 0) {
      ctx.showMessage(`기억 안나는 사람`);
    } else if (character.cflags[15] === 1) {
      ctx.showMessage(`%CSTR:0%`);
    } else if (character.cflags[15] === 2) {
      ctx.showMessage(`이름도 모르는 남자손님`);
    } else if (character.cflags[15] === 3) {
      ctx.showMessage(`이름도 모르는 여자손님`);
    } else if (character.cflags[15] === 4) {
      ctx.showMessage(`바이브`);
    } else if (character.cflags[15] === 5) {
      ctx.showMessage(`극대바이브`);
    } else if (character.cflags[15] === 6) {
      ctx.showMessage(`이름도 모르는 손님`);
    } else if (character.cflags[15] === 7) {
      ctx.showMessage(`치한`);
    } else if (character.cflags[15] === 8 && character.cflags[167] === 1) {
      if (ctx.cstr[0] === "") {
        ctx.showMessage(`전 남친`);
      } else {
        ctx.showMessage(`%CSTR:0%(전 남친)`);
      }
    } else if (character.cflags[15] === 8 && ctx.talents[184] === 1 && character.cflags[163] != 2) {
      if (ctx.cstr[0] === "") {
        ctx.showMessage(`남친`);
      } else {
        ctx.showMessage(`%CSTR:0%(남친)`);
      }
    } else if (character.cflags[15] === 9) {
      ctx.showMessage(`섹프인 %CSTR:47%`);
    } else if (character.cflags[15] === 11) {
      ctx.showMessage(`불량배`);
    } else if (character.cflags[15] === 12) {
      ctx.showMessage(`배게영업 상대`);
    } else if (character.cflags[15] === 13) {
      ctx.showMessage(`『접대』손님`);
    } else if (character.cflags[15] === 14) {
      ctx.showMessage(`촉수생물`);
    } else if (character.cflags[15] === 15) {
      ctx.showMessage(`남편`);
    } else if (character.cflags[15] === 16) {
      ctx.showMessage(`${ctx.getName(ctx.master)}`);
    }
    if (character.cflags[15] === 4 || character.cflags[15] === 5) {
      ctx.showMessage(`로`);
    } else if (character.cflags[15] === 10) {
    } else {
      ctx.showMessage(`에게`);
    }
    if (character.cflags[164] === 0) {
      ctx.showMessage(``);
    } else if (character.cflags[164] === 1) {
      ctx.showMessage(`지도중에`);
    } else if (character.cflags[164] === 2) {
      ctx.showMessage(`촬영중에`);
    } else if (character.cflags[164] === 3) {
      ctx.showMessage(`몰래 찍히면서`);
    } else if (character.cflags[164] === 4) {
      ctx.showMessage(`억지로 강간당하며`);
    } else if (character.cflags[164] === 5) {
      ctx.showMessage(`윤간당하며`);
    } else if (character.cflags[164] === 6) {
      ctx.showMessage(`약을 먹여져서 스스로 %CSTR:80%에게 조르며`);
    }
    ctx.showMessage(`%UNICODE(0x2665)%`);
  }
  // TODO: SETFONT ""
  ctx.resetColor();
}
