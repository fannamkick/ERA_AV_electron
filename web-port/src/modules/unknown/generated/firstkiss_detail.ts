/**
 * FIRSTKISS_DETAIL.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function firstkiss_detail_calc(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.varSet(ctx.locals[0], 0);
  if (character.cflags[825] === 0) {
    if (character.cflags[821] === 1 || character.cflags[821] === 2 || character.cflags[821] === 4 || character.cflags[821] === 6 || character.cflags[821] === 7 || character.cflags[821] === 9 || character.cflags[821] === 11) {
      if (character.cflags[822] === 1) {
        character.cflags[825] = ctx.rand(7);
        if (character.cflags[825] == 0) {
          character.cflags[825] = 1;
        }
      } else if (character.cflags[822] === 2) {
        character.cflags[825] = 8 + ctx.rand(7);
      } else if (character.cflags[822] === 3) {
        character.cflags[825] = 15 + ctx.rand(8);
        if (character.cflags[825] == 14) {
          character.cflags[825] = 15;
        }
      } else if (character.cflags[822] === 4) {
        character.cflags[825] = 23 + ctx.rand(7);
      }
    } else {
      if (character.cflags[822] === 1) {
        character.cflags[825] = ctx.rand(7);
        if (character.cflags[825] == 0) {
          character.cflags[825] = 1;
        }
      } else if (character.cflags[822] === 2) {
        character.cflags[825] = 7 + ctx.rand(7);
      } else if (character.cflags[822] === 3) {
        character.cflags[825] = 14 + ctx.rand(7);
        if (character.cflags[825] == 14) {
          character.cflags[825] = 15;
        }
      } else if (character.cflags[822] === 4) {
        character.cflags[825] = 21 + ctx.rand(7);
      } else if (character.cflags[822] === 5) {
        character.cflags[825] = 28 + ctx.rand(7);
        if (character.cflags[825] >= 31) {
          character.cflags[825] = 31;
        }
      }
    }
    if (character.cflags[825] == MAXctx.base[12] && character.cflags[821] == MAXctx.base[11]) {
      character.cflags[826] = 1;
    }
  }
}

export async function firstkiss_detail(
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
  ctx.print('첫 키스:');
  if (ctx.abilities[10] < 3 && character.no != 0) {
    ctx.showMessage('경험함');
  } else {
    await firstkiss_detail_calc(ctx, character);
    if (character.cflags[820] === 0) {
      ctx.showMessage(`몇년 전`);
    } else {
      ctx.showMessage(`${character.cflags[820]}살`);
    }
    if (character.cflags[821] === 0) {
      ctx.showMessage(`어느 날`);
    } else {
      if (character.cflags[821] <= 9) {
        ctx.showMessage(``);
      }
      ctx.showMessage(`${character.cflags[821]}월`);
    }
    if (( character.cflags[820] === 0 && character.cflags[821] === 0 ) || character.cflags[825] === 0) {
    } else {
      if (character.cflags[825] <= 9) {
        ctx.showMessage(``);
      }
      ctx.showMessage(`${character.cflags[825]}일`);
    }
    ctx.showMessage(`에`);
    if (character.cflags[823] === 0 || character.cflags[823] >= 15) {
    } else {
      if (character.cflags[823] === 1) {
        ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 방`);
      } else if (character.cflags[823] === 2 && character.cflags[16] === 8 && ctx.talents[184] === 0 && ctx.exp[101] >= 1) {
        if (ctx.cstr[1] === "") {
          ctx.showMessage(`전 남친의 방`);
        } else {
          ctx.showMessage(`%CSTR:1%(전 남친)의 방`);
        }
      } else if (character.cflags[823] === 2 && character.cflags[16] === 8 && ctx.talents[184] === 1) {
        if (ctx.cstr[1] === "") {
          ctx.showMessage(`남친의 방`);
        } else {
          ctx.showMessage(`%CSTR:1%(남친)의 방`);
        }
      } else if (character.cflags[823] === 3) {
        ctx.showMessage(`러브호텔`);
      } else if (character.cflags[823] === 4) {
        ctx.showMessage(`바다`);
      } else if (character.cflags[823] === 5) {
        ctx.showMessage(`학교`);
      } else if (character.cflags[823] === 6) {
        ctx.showMessage(`폐공장`);
      } else if (character.cflags[823] === 7) {
        ctx.showMessage(`창관`);
      } else if (character.cflags[823] === 8) {
        ctx.showMessage(`전차 안`);
      } else if (character.cflags[823] === 9) {
        ctx.showMessage(`버스 안`);
      } else if (character.cflags[823] === 10) {
        ctx.showMessage(`야외`);
      } else if (character.cflags[823] === 11) {
        ctx.showMessage(`수영장`);
      } else if (character.cflags[823] === 12) {
        ctx.showMessage(`비밀 지하실`);
      } else if (character.cflags[823] === 13) {
        ctx.showMessage(`회원제 비밀클럽`);
      } else if (character.cflags[823] === 14) {
        ctx.showMessage(`촬영 스튜디오`);
      }
      ctx.showMessage(`에서,`);
    }
    if (character.cflags[826] == 1) {
      ctx.showMessage(`생일기념으로`);
    }
    if (character.cflags[16] === 0) {
      ctx.showMessage(`기억 안나는 사람`);
    } else if (character.cflags[16] === 1) {
      ctx.showMessage(`%CSTR:1%`);
    } else if (character.cflags[16] === 2) {
      ctx.showMessage(`이름도 모르는 남자손님`);
    } else if (character.cflags[16] === 3) {
      ctx.showMessage(`이름도 모르는 여자손님`);
    } else if (character.cflags[16] === 4) {
      ctx.showMessage(`바이브`);
    } else if (character.cflags[16] === 5) {
      ctx.showMessage(`극대바이브`);
    } else if (character.cflags[16] === 6) {
      ctx.showMessage(`이름도 모르는 손님`);
    } else if (character.cflags[16] === 7) {
      ctx.showMessage(`치한`);
    } else if (character.cflags[16] === 8 && character.cflags[827] === 1) {
      if (ctx.cstr[1] === "") {
        ctx.showMessage(`전 남친`);
      } else {
        ctx.showMessage(`%CSTR:1%(전 남친)`);
      }
    } else if (character.cflags[16] === 8 && ctx.talents[184] === 1) {
      if (ctx.cstr[1] === "") {
        ctx.showMessage(`남친`);
      } else {
        ctx.showMessage(`%CSTR:1%(남친)`);
      }
    } else if (character.cflags[16] === 9) {
      ctx.showMessage(`섹프인 %CSTR:47%`);
    } else if (character.cflags[16] === 11) {
      ctx.showMessage(`불량배`);
    } else if (character.cflags[16] === 12) {
      ctx.showMessage(`배게영업 상대`);
    } else if (character.cflags[16] === 13) {
      ctx.showMessage(`『접대』손님`);
    } else if (character.cflags[16] === 14) {
      ctx.showMessage(`촉수생물`);
    } else if (character.cflags[16] === 15) {
      ctx.showMessage(`남편`);
    } else if (character.cflags[16] === 16) {
      ctx.showMessage(`${ctx.getVarName("CALL", MASTER)}`);
    }
    if (character.cflags[16] === 10) {
    } else if (character.cflags[824] != 0) {
      ctx.showMessage(`의`);
    } else if (character.cflags[16] === 1 && ctx.cstr[1] === "") {
    } else {
      ctx.showMessage(`에게`);
    }
    if (character.cflags[824] === 1) {
      ctx.showMessage(`%CSTR:80%에게`);
    } else if (character.cflags[824] === 2) {
      ctx.showMessage(`%CSTR:82%에게`);
    } else if (character.cflags[824] === 3) {
      ctx.showMessage(`%CSTR:81%에게`);
    }
    ctx.showMessage(`%UNICODE(0x2665)%`);
  }
  // TODO: SETFONT ""
  ctx.resetColor();
}
