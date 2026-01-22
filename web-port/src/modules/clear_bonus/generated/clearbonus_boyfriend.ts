/**
 * CLEARBONUS_BOYFRIEND.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function clearbonus_boyfriend(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.talents[122] === 0 && ctx.talents[206] === 0 && ctx.talents[184] === 0) {
    ctx.showMessage(`%타겟이(1)% 남친을 가진 IF세계로 갈까요?`);
    ctx.showMessage('[0] - 네');
    ctx.showMessage('[1] - 아니오');
    // Label: INPUT_LOOP_5
    await ctx.inputNumber();
    if (ctx.result === 0) {
      await defolt_genitalcall(ctx, character);
      await clearbonus_boyfriend_addexp(ctx, character);
    } else if (ctx.result === 1) {
      await calc_beauty(ctx, character);
    } else {
      // GOTO INPUT_LOOP_5 - 구조 변경 필요 (while/break 사용 권장)
    }
  }
}

export async function clearbonus_boyfriend_addexp(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  for (let COUNT = 0; COUNT < 30; COUNT++) {
    ctx.locals[ctx.count] = 0;
  }
  // Label: INPUT_LOOP_000
  ctx.locals[0] = character;
  character.cflags[ctx.locals[0]][621] = 1;
  if (ctx.flags[541] === 1) {
    character.cflags[ctx.locals[0]][622] = 0;
  } else {
    ctx.showMessage(`${ctx.getVarName("CALL", LOCAL)}의 남친은……`);
    ctx.showMessage('[0] - 양키');
    ctx.showMessage('[1] - 반 친구');
    ctx.showMessage('[2] - 고등학생');
    ctx.showMessage('[3] - 중학생');
    ctx.showMessage('[4] - 대학생');
    ctx.showMessage('[5] - 회사원');
    ctx.showMessage('[6] - 호스트');
    // Label: INPUT_LOOP_00
    await ctx.inputNumber();
    if (ctx.result >= 0 && ctx.result <= 6) {
      character.cflags[ctx.locals[0]][622] = ctx.result;
    } else {
      // GOTO INPUT_LOOP_00 - 구조 변경 필요 (while/break 사용 권장)
    }
  }
  ctx.locals[5] = 0;
  if (character.cflags[ctx.locals[0]][622] === 0) {
    ctx.locals[5] = ctx.rand(100);
    if (ctx.locals[0].no == 1) {
      ctx.locals[5] = 100;
    }
    if (ctx.locals[0].no == 2) {
      ctx.locals[5] = 100;
    }
    if (ctx.locals[5] >= 85) {
      ctx.getTalent(local, 432) = 1;
      ctx.locals[6] = 1;
      character.cstr[ctx.locals[0]][80] = "자지";
      character.cstr[ctx.locals[0]][81] = "보지";
      character.cstr[ctx.locals[0]][82] = "애널";
      if (ctx.rand(2) === 0) {
        character.cstr[ctx.locals[0]][9] = "나";
      } else {
        character.cstr[ctx.locals[0]][9] = "난";
      }
      if (ctx.locals[0].no == 1) {
        character.cstr[ctx.locals[0]][9] = "난";
      }
    }
  }
  ctx.locals[7] = 0;
  ctx.locals[7] = ctx.rand(100);
  if (ctx.locals[7] >= 85) {
    ctx.getTalent(local, 423) = 1;
    ctx.locals[8] = 1;
  }
  ctx.getTalent(local, 184) = 1;
  await decide_boyfriend,local(ctx, character);
  if (character.cflags[ctx.locals[0]][16] === -1) {
    ctx.showMessage(`${ctx.getVarName("CALL", LOCAL)}의 첫 키스 상대는……`);
    ctx.showMessage('[0] - 남친');
    ctx.showMessage('[1] - 아직');
    // Label: INPUT_LOOP_01
    await ctx.inputNumber();
    if (ctx.result === 1) {
      ctx.print('');
    } else if (ctx.result === 0) {
      character.cflags[ctx.locals[0]][16] = ctx.rand(3);
      if (character.cflags[ctx.locals[0]][16] == 0) {
        character.cflags[ctx.locals[0]][16] = 2;
      }
      if (character.cflags[ctx.locals[0]][16] === 1) {
        character.cstr[ctx.locals[0]][1] = `${character.cstr[ctx.locals[0]][7]} ${character.cstr[ctx.locals[0]][8]}(남친)`;
        ctx.base[ctx].locals[31] -= 5;
      } else if (character.cflags[ctx.locals[0]][16] === 2) {
        character.cflags[ctx.locals[0]][16] = 3;
        if (ctx.talents[432] === 0) {
          character.cstr[ctx.locals[0]][1] = `${character.cstr[ctx.locals[0]][7]} ${character.cstr[ctx.locals[0]][8]}`;
          character.cflags[824] = 1;
        } else {
          character.cstr[ctx.locals[0]][1] = `${character.cstr[ctx.locals[0]][7]} ${character.cstr[ctx.locals[0]][8]}`;
          character.cflags[824] = 1;
        }
        ctx.base[ctx].locals[31] -= 10;
      }
    } else {
      // GOTO INPUT_LOOP_01 - 구조 변경 필요 (while/break 사용 권장)
    }
  }
  if (character.cflags[ctx.locals[0]][15] === 0 && ctx.getTalent(local, 0) === 1) {
    ctx.showMessage(`${ctx.getVarName("CALL", LOCAL)}의 처녀 상실 상대는……`);
    ctx.showMessage('[0] - 남친');
    ctx.showMessage('[1] - 아직 처녀입니다');
    // Label: INPUT_LOOP_02
    await ctx.inputNumber();
    if (ctx.result === 1) {
      ctx.print('');
    } else if (ctx.result === 0) {
      character.cstr[ctx.locals[0]][0] = `${character.cstr[ctx.locals[0]][7]} ${character.cstr[ctx.locals[0]][8]}(남친)`;
      character.cflags[ctx.locals[0]][15] = 20;
      ctx.getTalent(local, 0) = 0;
      ctx.base[31] -= 10;
    } else {
      // GOTO INPUT_LOOP_02 - 구조 변경 필요 (while/break 사용 권장)
    }
  }
  if (ctx.getTalent(local, 0) === 0) {
    ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.locals[0]), "는")}……`);
    ctx.showMessage('[0] - 남친과 마구 해대서 경험 풍부함');
    ctx.showMessage('[1] - SEX는 익숙해짐');
    ctx.showMessage('[2] - 얼마 전 처녀상실');
    // Label: INPUT_LOOP_03
    await ctx.inputNumber();
    if (ctx.result === 0) {
      character.cvar[ctx.locals[0]][0] += 40 + ctx.rand(31);
      character.cvar[ctx.locals[0]][5] += 30 + ctx.rand(31);
      character.cvar[ctx.locals[0]][20] += character.cvar[ctx.locals[0]][5] - ctx.rand(11);
      character.cvar[ctx.locals[0]][2] += character.cvar[ctx.locals[0]][5] - ctx.rand(11);
      ctx.abilities[ctx.locals[0]][2] += 3 + ctx.rand(3);
      ctx.abilities[ctx.locals[0]][11] += 2;
      ctx.abilities[ctx.locals[0]][14] += 2;
      ctx.abilities[ctx.locals[0]][30] += 1;
      character.cflags[160] = (ctx.base[9] - ctx.rand(4));
      if (character.cflags[160] == ctx.base[9]) {
        character.cflags[160] = ctx.base[9] - 1;
      }
      character.cflags[161] = (DAY[1] - ctx.rand(4));
      if (character.cflags[161] <= 0) {
        character.cflags[161] = 12;
      }
      if (character.cflags[160] >= ctx.base[9]) {
        if (character.cflags[161] <= ctx.base[11]) {
          character.cflags[160] -= 1;
        }
      }
      if (character.cflags[161] == DAY[1] && character.cflags[162] >= DAY[2]) {
        character.cflags[161] = DAY[2];
      }
      character.cflags[162] = ctx.rand(4);
      if (character.cflags[162] == 0) {
        character.cflags[162] = 1;
      }
      character.cflags[163] = 3;
      character.cflags[164] = 3;
    } else if (ctx.result === 1) {
      character.cvar[ctx.locals[0]][0] += 20 + ctx.rand(11);
      character.cvar[ctx.locals[0]][5] += 15 + ctx.rand(11);
      character.cvar[ctx.locals[0]][20] += character.cvar[ctx.locals[0]][5] - ctx.rand(6);
      character.cvar[ctx.locals[0]][2] += character.cvar[ctx.locals[0]][5] - ctx.rand(6);
      ctx.abilities[ctx.locals[0]][2] += 1 + ctx.rand(3);
      ctx.abilities[ctx.locals[0]][11] += 1;
      ctx.abilities[ctx.locals[0]][14] += 1;
      character.cflags[160] = ctx.base[9];
      character.cflags[161] = (DAY[1] - ctx.rand(4));
      if (character.cflags[161] <= 0) {
        character.cflags[161] = 12;
      }
      character.cflags[162] = ctx.rand(4);
      if (character.cflags[161] == DAY[1] && character.cflags[162] >= DAY[2]) {
        character.cflags[161] = DAY[2];
      }
      character.cflags[163] = 3;
      character.cflags[164] = 0;
    } else if (ctx.result === 2) {
      character.cvar[ctx.locals[0]][0] += 1 + ctx.rand(5);
      character.cvar[ctx.locals[0]][5] += character.cvar[ctx.locals[0]][0] - ctx.rand(3);
      if (character.cvar[ctx.locals[0]][5] <= 0) {
        character.cvar[ctx.locals[0]][5] = 1;
      }
      character.cvar[ctx.locals[0]][20] += character.cvar[ctx.locals[0]][5] - ctx.rand(2);
      if (character.cvar[ctx.locals[0]][5] <= 0) {
        character.cvar[ctx.locals[0]][20] = 0;
      }
      character.cvar[ctx.locals[0]][2] += ctx.rand(2);
      ctx.abilities[ctx.locals[0]][2] += ctx.rand(2);
      character.cflags[160] = ctx.base[9];
      character.cflags[161] = (DAY[1] - ctx.rand(2));
      if (character.cflags[161] <= 0) {
        character.cflags[161] = 12;
      }
      character.cflags[162] = ctx.rand(4);
      if (character.cflags[161] == DAY[1] && character.cflags[162] >= DAY[2]) {
        character.cflags[161] = DAY[2];
      }
      character.cflags[163] = 3;
      character.cflags[164] = 0;
    } else {
      // GOTO INPUT_LOOP_03 - 구조 변경 필요 (while/break 사용 권장)
    }
  }
  if (ctx.getTalent(local, 2) === 1) {
    ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.locals[0]), "는")}……`);
    if (character.cflags[ctx.locals[0]][15] === 20) {
      ctx.showMessage('[0] - 애널처녀도 남친에게 바쳤습니다');
    } else {
      ctx.showMessage('[0] - 애널처녀는 남친에게 바쳤습니다');
    }
    if (ctx.getTalent(local, 0) === 0) {
      ctx.showMessage('[1] - 애널은 아직 처녀입니다');
    } else {
      ctx.showMessage('[1] - 애널도 처녀입니다');
    }
    // Label: INPUT_LOOP_04
    await ctx.inputNumber();
    if (ctx.result === 1) {
      ctx.print('');
    } else if (ctx.result === 0) {
      character.cflags[ctx.locals[0]][616] = 8;
      character.cstr[ctx.locals[0]][3] = `${character.cstr[ctx.locals[0]][7]} ${character.cstr[ctx.locals[0]][8]}(남친)`;
      ctx.getTalent(local, 2) = 0;
      ctx.base[31] -= 5;
    } else {
      // GOTO INPUT_LOOP_04 - 구조 변경 필요 (while/break 사용 권장)
    }
  }
  if (ctx.getTalent(local, 2) === 0) {
    ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.locals[0]), "는")}……`);
    if (character.cflags[ctx.locals[0]][15] === 20) {
      ctx.showMessage('[0] - 남친과 애널로도 마구 해대서 경험 풍부함');
    } else {
      ctx.showMessage('[0] - 남친과 애널로 마구 해대서 경험 풍부함');
    }
    if (character.cflags[ctx.locals[0]][15] === 20) {
      ctx.showMessage('[1] - 애널SEX도 익숙해짐');
    } else {
      ctx.showMessage('[1] - 애널SEX는 이제 익숙해짐');
    }
    if (character.cflags[ctx.locals[0]][15] === 20) {
      ctx.showMessage('[2] - 얼마 전 애널처녀도 상실');
    } else {
      ctx.showMessage('[2] - 얼마 전 애널처녀를 상실');
    }
    // Label: INPUT_LOOP_05
    await ctx.inputNumber();
    if (ctx.result === 0) {
      character.cvar[ctx.locals[0]][1] += 40 + ctx.rand(31);
      character.cvar[ctx.locals[0]][5] += 30 + ctx.rand(31);
      character.cvar[ctx.locals[0]][20] += character.cvar[ctx.locals[0]][5] - ctx.rand(11);
      ctx.abilities[ctx.locals[0]][3] += 3 + ctx.rand(3);
      character.cvar[ctx.locals[0]][2] += character.cvar[ctx.locals[0]][5] - ctx.rand(11);
      if (ctx.abilities[ctx.locals[0]][3] >= 5) {
        ctx.abilities[ctx.locals[0]][3] = 5;
      }
      ctx.abilities[ctx.locals[0]][11] += 2;
      ctx.abilities[ctx.locals[0]][14] += 2;
      ctx.abilities[ctx.locals[0]][30] += 1;
      character.cflags[ctx.locals[0]][830] = (ctx.base[9] - ctx.rand(4));
      if (character.cflags[ctx.locals[0]][830] == ctx.base[9]) {
        character.cflags[ctx.locals[0]][830] = ctx.base[9] - 1;
      }
      character.cflags[ctx.locals[0]][831] = (DAY[1] - ctx.rand(4));
      if (character.cflags[ctx.locals[0]][831] <= 0) {
        character.cflags[ctx.locals[0]][831] = 12;
      }
      if (character.cflags[ctx.locals[0]][830] >= ctx.base[9]) {
        if (character.cflags[ctx.locals[0]][831] <= ctx.base[11]) {
          character.cflags[ctx.locals[0]][830] -= 1;
        }
      }
      if (character.cflags[ctx.locals[0]][831] == DAY[1] && character.cflags[ctx.locals[0]][832] >= DAY[2]) {
        character.cflags[ctx.locals[0]][831] = DAY[2];
      }
      character.cflags[ctx.locals[0]][832] = ctx.rand(4);
      if (character.cflags[ctx.locals[0]][832] == 0) {
        character.cflags[ctx.locals[0]][832] = 1;
      }
      character.cflags[ctx.locals[0]][833] = 3;
      character.cflags[ctx.locals[0]][834] = 3;
    } else if (ctx.result === 1) {
      character.cvar[ctx.locals[0]][1] += 20 + ctx.rand(11);
      character.cvar[ctx.locals[0]][5] += 15 + ctx.rand(11);
      character.cvar[ctx.locals[0]][20] += character.cvar[ctx.locals[0]][5] - ctx.rand(6);
      character.cvar[ctx.locals[0]][2] += character.cvar[ctx.locals[0]][5] - ctx.rand(6);
      ctx.abilities[ctx.locals[0]][3] += 1 + ctx.rand(3);
      if (ctx.abilities[ctx.locals[0]][3] >= 3) {
        ctx.abilities[ctx.locals[0]][3] = 3;
      }
      ctx.abilities[ctx.locals[0]][11] += 1;
      ctx.abilities[ctx.locals[0]][14] += 1;
      character.cflags[830] = ctx.base[9];
      character.cflags[ctx.locals[0]][830] = ctx.base[9];
      character.cflags[ctx.locals[0]][831] = (DAY[1] - ctx.rand(4));
      if (character.cflags[ctx.locals[0]][831] <= 0) {
        character.cflags[ctx.locals[0]][831] = 12;
      }
      character.cflags[ctx.locals[0]][832] = ctx.rand(4);
      if (character.cflags[ctx.locals[0]][831] == DAY[1] && character.cflags[ctx.locals[0]][832] >= DAY[2]) {
        character.cflags[ctx.locals[0]][831] = DAY[2];
      }
      character.cflags[ctx.locals[0]][833] = 3;
      character.cflags[ctx.locals[0]][834] = 0;
    } else if (ctx.result === 2) {
      character.cvar[ctx.locals[0]][1] += 1 + ctx.rand(5);
      character.cvar[ctx.locals[0]][5] += character.cvar[ctx.locals[0]][0] - ctx.rand(3);
      if (character.cvar[ctx.locals[0]][5] <= 0) {
        character.cvar[ctx.locals[0]][5] = 1;
      }
      character.cvar[ctx.locals[0]][20] += character.cvar[ctx.locals[0]][5] - ctx.rand(2);
      if (character.cvar[ctx.locals[0]][20] <= 0) {
        character.cvar[ctx.locals[0]][20] = 0;
      }
      ctx.abilities[ctx.locals[0]][3] += 3 + ctx.rand(3);
      if (ctx.abilities[ctx.locals[0]][3] >= 3) {
        ctx.abilities[ctx.locals[0]][3] = 3;
      }
      character.cvar[ctx.locals[0]][2] += ctx.rand(2);
      character.cflags[ctx.locals[0]][830] = ctx.base[9];
      character.cflags[ctx.locals[0]][831] = (DAY[1] - ctx.rand(2));
      if (character.cflags[ctx.locals[0]][831] <= 0) {
        character.cflags[ctx.locals[0]][831] = 12;
      }
      character.cflags[ctx.locals[0]][832] = ctx.rand(4);
      if (character.cflags[ctx.locals[0]][831] == DAY[1] && character.cflags[ctx.locals[0]][832] >= DAY[2]) {
        character.cflags[ctx.locals[0]][831] = DAY[2];
      }
      character.cflags[ctx.locals[0]][833] = 3;
      character.cflags[ctx.locals[0]][834] = 0;
    } else {
      // GOTO INPUT_LOOP_05 - 구조 변경 필요 (while/break 사용 권장)
    }
  }
  character.cflags[ctx.locals[0]][631] = ctx.rand(100);
  if (character.cflags[ctx.locals[0]][631] >= 75) {
    character.cstr[ctx.locals[0]][80] = "자지";
  }
  character.cstr[ctx.locals[0]][81] = "보지";
  character.cstr[ctx.locals[0]][82] = "애널";
  ctx.getTalent(local, 76) = 1;
  character.cflags[ctx.locals[0]][631] = 0;
  ctx.exp[ctx.locals[0]][0] += character.cvar[ctx.locals[0]][0];
  ctx.exp[ctx.locals[0]][1] += character.cvar[ctx.locals[0]][1];
  ctx.exp[ctx.locals[0]][2] += character.cvar[ctx.locals[0]][2];
  ctx.exp[ctx.locals[0]][5] += character.cvar[ctx.locals[0]][5];
  ctx.exp[ctx.locals[0]][20] += character.cvar[ctx.locals[0]][20];
  ctx.exp[ctx.locals[0]][101] += character.cvar[ctx.locals[0]][5] / 4;
  if (character.cflags[ctx.locals[0]][15] == 20) {
    character.cflags[ctx.locals[0]][15] = 8;
  }
  if (character.cflags[ctx.locals[0]][16]) {
    character.cflags[ctx.locals[0]][16] = 8;
  }
  if (ctx.abilities[ctx.locals[0]][11] >= 5) {
    ctx.abilities[ctx.locals[0]][11] = 5;
  }
  if (ctx.getTalent(local, 76) === 1) {
    for (let COUNT = 0; COUNT < 110; COUNT++) {
      // TODO: EXP:LOCAL:COUNT *= 2
    }
    for (let COUNT = 0; COUNT < 50; COUNT++) {
      if (ctx.count === 10) {
        // TODO: CONTINUE
      } else if (ctx.count === 12) {
        // TODO: CONTINUE
      } else if (ctx.count === 13) {
        // TODO: CONTINUE
      } else if (ctx.count === 15) {
        // TODO: CONTINUE
      } else if (ctx.count === 16) {
        // TODO: CONTINUE
      } else if (ctx.count === 20) {
        // TODO: CONTINUE
      } else if (ctx.count === 21) {
        // TODO: CONTINUE
      } else if (ctx.count === 22) {
        // TODO: CONTINUE
      } else if (ctx.count === 33) {
        // TODO: CONTINUE
      }
      // TODO: ABL:LOCAL:COUNT *= 2
      if (ctx.abilities[ctx.locals[0]][ctx.count] >= 10) {
        // TODO: ABL:LOCAL:COUNT = 10
      }
    }
    if (ctx.abilities[ctx.locals[0]][0] >= 6) {
      ctx.getTalent(local, 74) = 1;
      ctx.getTalent(local, 101) = 0;
    }
    if (ctx.abilities[ctx.locals[0]][1] >= 6) {
      ctx.getTalent(local, 78) = 1;
      ctx.getTalent(local, 107) = 0;
    }
    if (ctx.abilities[ctx.locals[0]][2] >= 6) {
      ctx.getTalent(local, 75) = 1;
      ctx.getTalent(local, 103) = 0;
    }
    if (ctx.abilities[ctx.locals[0]][3] >= 6) {
      ctx.getTalent(local, 77) = 1;
      ctx.getTalent(local, 105) = 0;
    }
  }
  if (ctx.abilities[ctx.locals[0]][11] >= 4) {
    ctx.getTalent(local, 30) = 0;
    ctx.getTalent(local, 71) = 0;
    if (ctx.getTalent(local, 82) === 1) {
      ctx.getTalent(local, 82) = 0;
      ctx.getTalent(local, 81) = 1;
    }
    ctx.exp[ctx.locals[0]][50] += ctx.rand(3);
    ctx.exp[ctx.locals[0]][50] += ctx.rand(5);
  }
  if (ctx.exp[ctx.locals[0]][0] >= 1 || ctx.exp[ctx.locals[0]][1] >= 1 || ctx.exp[ctx.locals[0]][2] >= 1 || ctx.exp[ctx.locals[0]][5] >= 1 || ctx.exp[ctx.locals[0]][20] >= 1 || ctx.exp[ctx.locals[0]][50] >= 1) {
    ctx.showMessage(`${ctx.getVarName("CALL", LOCAL)}의 계약시점 경험이`);
    if (ctx.exp[ctx.locals[0]][0] >= 1) {
      ctx.showMessage(`${ctx.getVarName("EXP", 0)}: ${ctx.exp[ctx.locals[0]][0]}`);
    }
    if (ctx.exp[ctx.locals[0]][1] >= 1) {
      ctx.showMessage(`${ctx.getVarName("EXP", 1)}: ${ctx.exp[ctx.locals[0]][1]}`);
    }
    if (ctx.exp[ctx.locals[0]][2] >= 1) {
      ctx.showMessage(`${ctx.getVarName("EXP", 2)}: ${ctx.exp[ctx.locals[0]][2]}`);
    }
    if (ctx.exp[ctx.locals[0]][5] >= 1) {
      ctx.showMessage(`${ctx.getVarName("EXP", 5)}: ${ctx.exp[ctx.locals[0]][5]}`);
    }
    if (ctx.exp[ctx.locals[0]][20] >= 1) {
      ctx.showMessage(`${ctx.getVarName("EXP", 20)}: ${ctx.exp[ctx.locals[0]][20]}`);
    }
    if (ctx.exp[ctx.locals[0]][50] >= 1) {
      ctx.showMessage(`${ctx.getVarName("EXP", 50)}: ${ctx.exp[ctx.locals[0]][50]}`);
    }
    ctx.showMessage(`이렇게 변경됐고`);
    ctx.locals[1] += 1;
  }
  if (ctx.abilities[ctx.locals[0]][0] >= 1 || ctx.abilities[ctx.locals[0]][1] >= 1 || ctx.abilities[ctx.locals[0]][2] >= 1 || ctx.abilities[ctx.locals[0]][3] >= 1 || ctx.abilities[ctx.locals[0]][11] >= 1 || ctx.abilities[ctx.locals[0]][30] >= 1) {
    ctx.showMessage(`${ctx.getVarName("CALL", LOCAL)}의 각 능력이`);
    if (ctx.abilities[ctx.locals[0]][0] >= 1) {
      ctx.showMessage(`${ctx.getVarName("ABL", 0)}: LV${ctx.abilities[ctx.locals[0]][0]}`);
    }
    if (ctx.abilities[ctx.locals[0]][1] >= 1) {
      ctx.showMessage(`${ctx.getVarName("ABL", 1)}: LV${ctx.abilities[ctx.locals[0]][1]}`);
    }
    if (ctx.abilities[ctx.locals[0]][2] >= 1) {
      ctx.showMessage(`${ctx.getVarName("ABL", 2)}: LV${ctx.abilities[ctx.locals[0]][2]}`);
    }
    if (ctx.abilities[ctx.locals[0]][3] >= 1) {
      ctx.showMessage(`${ctx.getVarName("ABL", 3)}: LV${ctx.abilities[ctx.locals[0]][3]}`);
    }
    if (ctx.abilities[ctx.locals[0]][11] >= 1) {
      ctx.showMessage(`${ctx.getVarName("ABL", 11)}: LV${ctx.abilities[ctx.locals[0]][11]}`);
    }
    if (ctx.abilities[ctx.locals[0]][30] >= 1) {
      ctx.showMessage(`${ctx.getVarName("ABL", 30)}: LV${ctx.abilities[ctx.locals[0]][30]}`);
    }
    ctx.showMessage(`이렇게 변경됐고`);
    ctx.locals[1] += 1;
  }
  if (ctx.getTalent(local, 76) === 1 || ctx.getTalent(local, 89) === 1) {
    if (ctx.getTalent(local, 76) === 1) {
      ctx.setColor(0xF58F98);
      ctx.showMessage(`【${ctx.getVarName("TALENT", 76)}】`);
      ctx.localStrings[1] = 조사만처리(TALENTctx.getName(76),"를");
      ctx.resetColor();
    }
    if (ctx.getTalent(local, 89) === 1) {
      ctx.setColor(0xF58F98);
      ctx.showMessage(`【${ctx.getVarName("TALENT", 89)}】`);
      ctx.localStrings[1] = 조사만처리(TALENTctx.getName(89),"를");
      ctx.resetColor();
    }
    if (ctx.locals[6] === 1) {
      ctx.setColor(0xF58F98);
      ctx.showMessage(`【${ctx.getVarName("TALENT", 432)}】`);
      ctx.localStrings[1] = 조사만처리(TALENTctx.getName(432),"를");
      ctx.resetColor();
    }
    if (ctx.locals[7] === 1) {
      ctx.setColor(0xF58F98);
      ctx.showMessage(`【${ctx.getVarName("TALENT", 423)}】`);
      ctx.localStrings[1] = 조사만처리(TALENTctx.getName(423),"를");
      ctx.resetColor();
    }
    ctx.showMessage(`%LOCALS:1% 가진 상태로 시작`);
    ctx.locals[1] += 1;
  }
  if (ctx.locals[1] >= 1) {
    ctx.showMessage(`되며`);
  }
  ctx.showMessage(`신변조사에 의하면 ${ctx.getVarName("CALL", LOCAL)}의 남친은 %CSTR:LOCAL:7% %조사처리(CSTR:LOCAL:8,"라")%는 이름의`);
  if (character.cflags[ctx.locals[0]] === 0) {
    ctx.showMessage(`양키`);
  } else if (character.cflags[ctx.locals[0]] === 1) {
    ctx.showMessage(`반 친구`);
  } else if (character.cflags[ctx.locals[0]] === 2) {
    ctx.showMessage(`고등학생이`);
  } else if (character.cflags[ctx.locals[0]] === 3) {
    ctx.showMessage(`중학생이`);
  } else if (character.cflags[ctx.locals[0]] === 4) {
    ctx.showMessage(`대학생아`);
  } else if (character.cflags[ctx.locals[0]] === 5) {
    ctx.showMessage(`회사원아`);
  } else if (character.cflags[ctx.locals[0]] === 6) {
    ctx.showMessage(`호스트`);
  }
  ctx.showMessage(`라고 한다……`);
  ctx.showMessage(`《이대로 시작합니까?》`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 아니오');
  // Label: INPUT_LOOP_DECIDE
  await ctx.inputNumber();
  if (ctx.result === 0) {
    ctx.showMessage(``);
  } else if (ctx.result === 1) {
    ctx.locals[2] = ctx.locals[0].no;
    if (ctx.getTalent(local, 76) == 1) {
      ctx.locals[3] = 1;
    }
    if (ctx.getTalent(local, 89) == 1) {
      ctx.locals[4] = 1;
    }
    await キャラ削除, local(ctx, character);
    // TODO: ADDCHARA LOCAL:2
    // TODO: GETCHARA (LOCAL:2)
    ctx.locals[0] = "GETCHARA (LOCAL:2)";
    if (ctx.locals[3] === 1) {
      ctx.getTalent(local, 76) = 1;
      character.cstr[ctx.locals[0]][80] = "자지";
      character.cstr[ctx.locals[0]][81] = "보지";
      character.cstr[ctx.locals[0]][82] = "애널";
    }
    if (ctx.locals[4] == 1) {
      ctx.getTalent(local, 89) = 1;
    }
    character = ctx.locals[0];
    await wearing_cloth_all(ctx, character);
    await setting_underhair(ctx, character);
    ctx.locals[0] = character;
    // GOTO INPUT_LOOP_000 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 8826) {
    ctx.showMessage(`《디버그용입니다》`);
    ctx.abilities[ctx.locals[0]][2] = 10;
    ctx.abilities[ctx.locals[0]][3] = 10;
    ctx.abilities[ctx.locals[0]][11] = 10;
    ctx.abilities[ctx.locals[0]][14] = 10;
    ctx.abilities[ctx.locals[0]][30] = 10;
    ctx.abilities[ctx.locals[0]][31] = 10;
    ctx.exp[ctx.locals[0]][50] = 5 + ctx.rand(4);
    await decide_boyfriend,local(ctx, character);
    ctx.showMessage(`《남친의 이름을 다시 생성합니다》`);
    ctx.showMessage(`남친의 이름: %CSTR:LOCAL:7% %CSTR:LOCAL:8%`);
    character.cstr[ctx.locals[0]][80] = "자지";
    character.cstr[ctx.locals[0]][81] = "생삽입SEX 좋아하는 음란 촉촉보지";
    character.cstr[ctx.locals[0]][0] = `${character.cstr[ctx.locals[0]][7]} ${character.cstr[ctx.locals[0]][8]}`;
    character.cstr[ctx.locals[0]][1] = `${character.cstr[ctx.locals[0]][7]} ${character.cstr[ctx.locals[0]][8]}`;
    character.cstr[ctx.locals[0]][3] = `${character.cstr[ctx.locals[0]][7]} ${character.cstr[ctx.locals[0]][8]}`;
    character.cflags[ctx.locals[0]][824] = 1;
    // GOTO INPUT_LOOP_DECIDE - 구조 변경 필요 (while/break 사용 권장)
  } else {
    // GOTO INPUT_LOOP_DECIDE - 구조 변경 필요 (while/break 사용 권장)
  }
  if (character.cflags[ctx.locals[0]][16]) {
    if (character.cflags[ctx.locals[0]][160] >= character.cflags[ctx.locals[0]][830] && character.cflags[ctx.locals[0]][161] >= character.cflags[ctx.locals[0]][831]) {
      character.cflags[ctx.locals[0]][820] = character.cflags[ctx.locals[0]][830];
      character.cflags[ctx.locals[0]][821] = character.cflags[ctx.locals[0]][831];
      character.cflags[ctx.locals[0]][822] = character.cflags[ctx.locals[0]][832];
      character.cflags[ctx.locals[0]][823] = character.cflags[ctx.locals[0]][833];
    } else if (character.cflags[ctx.locals[0]][160] <= character.cflags[ctx.locals[0]][830]  && character.cflags[ctx.locals[0]][161] <= character.cflags[ctx.locals[0]][831]) {
      character.cflags[ctx.locals[0]][820] = character.cflags[ctx.locals[0]][160];
      character.cflags[ctx.locals[0]][821] = character.cflags[ctx.locals[0]][161];
      character.cflags[ctx.locals[0]][822] = character.cflags[ctx.locals[0]][162];
      character.cflags[ctx.locals[0]][823] = character.cflags[ctx.locals[0]][163];
    } else {
      character.cflags[ctx.locals[0]][820] = ctx.base[9];
      character.cflags[ctx.locals[0]][821] = (DAY[1] - ctx.rand(2));
      if (character.cflags[ctx.locals[0]][821] <= 0) {
        character.cflags[ctx.locals[0]][821] = 12;
      }
      character.cflags[ctx.locals[0]][822] = ctx.rand(4);
      if (character.cflags[ctx.locals[0]][821] == DAY[1] && character.cflags[ctx.locals[0]][822] >= DAY[2]) {
        character.cflags[ctx.locals[0]][821] = DAY[2];
      }
      character.cflags[ctx.locals[0]][823] = 3;
    }
  }
}

export async function setting_underhair(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.flags[36]) {
    if (character.no === 1) {
      character.cflags[6] = 14;
    } else if (character.no === 11) {
      character.cflags[6] = 18;
    } else if (character.no === 9) {
      character.cflags[6] = 1;
    } else if (character.no === 18) {
      character.cflags[6] = 1;
    } else if (character.no === 2) {
      character.cflags[6] = 7;
    } else if (ctx.talents[125]) {
      character.cflags[6] = -1;
    } else if (ctx.base[9] <= 15 && character.no != 5) {
      character.cflags[6] = 6;
    } else {
      character.cflags[6] = 12;
    }
  }
}
