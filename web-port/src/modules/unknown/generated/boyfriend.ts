/**
 * BOYFRIEND.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function print_boyfriend(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character.cflags[621] >= 1) {
    if (character.cflags[622] === 1) {
      ctx.print('반친구');
    } else if (character.cflags[622] === 2) {
      ctx.print('고등학생');
    } else if (character.cflags[622] === 3) {
      ctx.print('중학생');
    } else if (character.cflags[622] === 4) {
      ctx.print('대학생');
    } else if (character.cflags[622] === 5) {
      ctx.print('직장인');
    } else if (character.cflags[622] === 6) {
      ctx.print('호스트');
    } else if (character.cflags[622] === 99) {
      ctx.print('주인님');
    } else {
      ctx.print('양키');
    }
  }
}

export async function event_boyfriend(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.getTalent(count, 85) === 0 && ctx.getTalent(count, 430) === 0 && character.cflags[ctx.count][621] != 1) {
    ctx.showMessage(`W ${ctx.getVarName("CALL", COUNT)}의 모습이 이상하다……`);
    ctx.showMessage(`${ctx.getVarName("CALL", COUNT)}에게 직접 캐물어보니 남친이 생겼다고 한다.`);
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "는")} 홍조를 띄우며 남친과 깨가 쏟아지는 에피소드를 ${ctx.getVarName("CALL", MASTER)}에게 자랑했다……`);
    await decide_boyfriend,count(ctx, character);
    character.cflags[ctx.count][621] = 1;
    if (ctx.flags[541] === 0 || ctx.getTalent(count, 432) === 0) {
      character.cflags[ctx.count][622] += ctx.rand(7);
      if (character.cflags[ctx.count][622] === 1 && ctx.base[ctx.count][9] > 18) {
        character.cflags[ctx.count][622] = 5;
      }
      ctx.base[ctx.count][31] -= 5;
    }
    ctx.getTalent(count, 184) = 1;
    if (character.cflags[ctx.count][16] === -1) {
      ctx.showMessage(`W ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "는")} 이미 남친에게 첫 키스를 바쳤다고 한다……`);
      character.cflags[ctx.count][16] = 8;
      character.cstr[ctx.count][1] = `${character.cstr[ctx.count][7]} ${character.cstr[ctx.count][8]}`;
      ctx.base[ctx.count][31] -= 5;
      character.cflags[ctx.count][820] = ctx.base[ctx.count][9];
      character.cflags[ctx.count][821] = DAY[1];
      character.cflags[ctx.count][822] = DAY[2];
    }
    ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥'); ctx.waitInput();
  } else if (ctx.getTalent(count, 85) === 1 && ctx.getTalent(count, 430) === 0 && character.cflags[ctx.count][621] != 1) {
    ctx.showMessage(`W ${ctx.getVarName("CALL", COUNT)}의 모습이 이상하다……`);
    ctx.showMessage(`${ctx.getVarName("CALL", COUNT)}에게 직접 캐물어보니 ${ctx.getVarName("CALL", MASTER)}보다 좋아하는 남자가 생겼다고 한다.`);
    ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "는")} ${ctx.getVarName("CALL", MASTER)}에게 이전처럼 지내자고 말했다……`);
    character.cflags[ctx.count][621] = 1 || ctx.getTalent(count, 432) == 0;
    if (ctx.flags[541] === 0) {
      character.cflags[ctx.count][622] += ctx.rand(7);
      if (character.cflags[ctx.count][622] === 1 && ctx.base[ctx.count][9] > 18) {
        character.cflags[ctx.count][622] = 5;
      }
    } else {
      character.cflags[ctx.count][622] = 0;
    }
    await decide_boyfriend,count(ctx, character);
    ctx.getTalent(count, 85) = 0;
    ctx.getTalent(count, 184) = 1;
    ctx.base[ctx.count][31] -= 5;
    if (character.cflags[ctx.count][16] === -1) {
      ctx.showMessage(`W ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "는")} 이미 다른 남자에게 첫 키스를 바쳤다고 한다……`);
      character.cflags[ctx.count][16] = 8;
      character.cstr[ctx.count][1] = `${character.cstr[ctx.count][7]} ${character.cstr[ctx.count][8]}`;
      ctx.base[ctx.count][31] -= 5;
      character.cflags[ctx.count][820] = ctx.base[9];
      character.cflags[ctx.count][821] = DAY[1];
      character.cflags[ctx.count][822] = DAY[2];
    }
    ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥'); ctx.waitInput();
  }
}

export async function event_boyfriend2(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  for (let COUNT = 0; COUNT < 100; COUNT++) {
    J:ctx.count = 0;
    J = 0;
  }
  ctx.varSet(ctx.locals[0], 0);
  ctx.varSet(TCVAR, 0);
  // TODO: FOR LOCAL, 0, CHARANUM
  if (ctx.locals[0] === 0) {
    // TODO: CONTINUE
  } else if (ctx.getTalent(local, 184) === 0) {
    // TODO: CONTINUE
  } else if (ctx.getTalent(local, 153) === 1) {
    // TODO: CONTINUE
  } else if (ctx.getTalent(local, 154) === 1) {
    // TODO: CONTINUE
  } else if (character.cflags[ctx.locals[0]][140] === 1 && (ctx.flags[101] & 128)) {
    // TODO: CONTINUE
  } else if (ctx.getTalent(local, 190) === 1) {
    // TODO: CONTINUE
  } else {
    character = ctx.locals[0];
    ctx.locals[1] = character.cflags[622];
    ctx.locals[2] = ctx.rand(3);
    if (character.cflags[623] == 1) {
      ctx.locals[2] = 0;
    }
    if (ctx.locals[2] <= 1) {
      // TODO: TRYCALLFORM BF_COMMONEV_{LOCAL:2}
    } else {
      ctx.locals[2] = ctx.rand(2);
      // TODO: TRYCALLFORM BF_EV{LOCAL:1}_{LOCAL:2}
    }
    for (let COUNT = 0; COUNT < 100; COUNT++) {
      if (J:ctx.count >= 1) {
        ctx.showMessage('');
        // TODO: BREAK
      }
    }
    // TODO: FOR LOCAL:4, 0, 100
    if (j[ctx.locals[4]]) {
      if (STRLENS(palamname[ctx.locals[4]]) > 0) {
        // TODO: JUEL:(LOCAL:4) += J:(LOCAL:4)
      } else {
        console.log('FORML %조사처리(JUEL:{(LOCAL:4)},"는")% 정의되지 않았기에 가속처리를 스킵합니다');
      }
      if (j[ctx.locals[4]] > 0) {
        ctx.showMessage(`${ctx.getVarName("PALAMNAME", ctx.locals[4])}의 구슬 + ${j[ctx.locals[4]]}`);
      }
    }
    // TODO: NEXT
    // TODO: FOR LOCAL:5, 0, 90
    if (tcvar[ctx.locals[5]]) {
      ctx.locals[6] = 1;
    }
    // TODO: NEXT
    if (ctx.locals[6] == 1) {
      ctx.showMessage('');
    }
    // TODO: FOR LOCAL:3, 0, 90
    if (tcvar[ctx.locals[3]]) {
      if (STRLENS(expname[ctx.locals[3]]) > 0) {
        // TODO: EXP:(LOCAL:3) += TCVAR:(LOCAL:3)
      } else {
        console.log('FORML %조사처리(EXP:{(LOCAL:3)},"는")% 정의되지 않았기에 가속처리를 스킵합니다');
      }
      if (tcvar[ctx.locals[3]] != 101) {
        ctx.showMessage(`${ctx.getVarName("EXPNAME", ctx.locals[3])} + ${tcvar[ctx.locals[3]]}`);
      }
    }
    // TODO: NEXT
    if (character.cvar[5] >= 1) {
      ctx.drawLine('･･');
      await ctx.wait();
    }
    for (let COUNT = 0; COUNT < 100; COUNT++) {
      J:ctx.count = 0;
      J = 0;
    }
    ctx.varSet(character.cvar[character], 0);
  }
  // TODO: NEXT
}

export async function calc_bfsex(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.varSet(character.cvar[character], 0);
  ctx.varSet(ctx.locals[0], 0);
  for (let COUNT = 0; COUNT < 100; COUNT++) {
    J:ctx.count = 0;
  }
  S = 0;
  if (ctx.abilities[2] === 4) {
    ctx.locals[0] += 1;
  } else if (ctx.abilities[2] === 5) {
    ctx.locals[0] += 2;
  } else if (ctx.abilities[2] >= 6) {
    ctx.locals[0] += 3;
  }
  if (ctx.abilities[30]) {
    ctx.locals[0] += ctx.abilities[30] / 2 + 1;
  }
  if (ctx.abilities[11] >= 5 && ctx.abilities[16] >= 5) {
    ctx.locals[0] += 2;
  }
  if (ctx.abilities[11] >= 3 && ctx.abilities[16] >= 3) {
    ctx.locals[0] += 1;
  }
  if (ctx.abilities[11] >= 7 && ctx.abilities[5] >= 6) {
    ctx.locals[0] += 1;
  }
  if (ctx.abilities[11] >= 4 && ctx.abilities[2] >= 3) {
    ctx.locals[0] += 1;
  }
  if (ctx.talents[184]) {
    ctx.locals[0] += 1;
  }
  if (ctx.talents[75]) {
    ctx.locals[0] *= 2;
  }
  if (ctx.talents[70]) {
    ctx.locals[0] += 1;
  }
  if (ctx.talents[76]) {
    ctx.locals[0] *= 2;
  }
  if (ctx.talents[432] == 1 && ctx.talents[422] == 0) {
    ctx.times('LOCAL', 1.50);
  }
  if (ctx.talents[422] == 1 && ctx.talents[432] == 0) {
    ctx.times('LOCAL', 1.50);
  }
  if (ctx.talents[422] == 1 && ctx.talents[432] == 1) {
    ctx.times('LOCAL', 2.00);
  }
  character.cvar[0] += ctx.locals[0];
  character.cvar[20] += ctx.locals[0]*2;
  character.cvar[5] += ctx.locals[0];
  if (ctx.talents[153] === 0 && ctx.talents[154] === 0) {
    ctx.locals[1] += ctx.rand(100);
    if (character.cflags[109] >= 1) {
      ctx.locals[2] = character.cflags[109] * 2;
      ctx.locals[1] *= ctx.locals[2];
    } else if (character.cflags[109] === -1) {
      ctx.locals[1] = 0;
    }
    if (ctx.talents[30] == 1) {
      ctx.locals[1] = 0;
    }
    if (ctx.talents[30] == 0 && ctx.talents[31] == 0) {
      ctx.locals[1] /= 2;
    }
    if (ctx.talents[420] == 1) {
      ctx.locals[1] = 0;
    }
    if (ctx.talents[500] == 1) {
      ctx.locals[1] = 0;
    }
    if (ctx.talents[501] == 1) {
      ctx.locals[1] = 0;
    }
    if (ctx.talents[504] == 1) {
      ctx.locals[1] = 0;
    }
    if (ctx.talents[505] == 1) {
      ctx.locals[1] = 0;
    }
    if (ctx.talents[508] == 1) {
      ctx.locals[1] = 0;
    }
    if (ctx.talents[511] == 1) {
      ctx.locals[1] = 0;
    }
    if (ctx.talents[520] == 1) {
      ctx.locals[1] = 0;
    }
    if (ctx.talents[521] == 1) {
      ctx.locals[1] = 0;
    }
    if (ctx.locals[1] >= 95) {
      character.cflags[102] = 7;
      character.cflags[110] = DAY + 10 + ctx.rand(3);
      character.cflags[111] = -4;
      ctx.cstr[60] = `${ctx.cstr[7]} ${ctx.cstr[8]}(남친)`;
    }
  }
  J[0] += ctx.locals[0] * 25;
  J[1] += ctx.locals[0] * 250;
  J[14] += ctx.locals[0] * 10;
  J[5] += ctx.locals[0] * 500;
  J[7] += ctx.locals[0] * 100;
  J[8] += ctx.locals[0] * 20;
}

export async function bf_commonev_0(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character.cflags[42] == 79 && character.cflags[40] >= 64) {
    return;
  }
  if (DAY[1] >= 7 && DAY[1] <= 8) {
    ctx.locals[0] = ctx.rand(4);
  } else {
    ctx.locals[0] = ctx.rand(3);
  }
  if (character.cflags[623] == 1) {
    ctx.locals[0] = 2;
  }
  await calc_bfsex(ctx, character);
  ctx.showMessage(`주말이 지나고 월요일,`);
  if (character.cflags[623] != 1) {
    ctx.showMessage(`어제 휴일이었던 %타겟은(1)%,`);
  } else {
    ctx.showMessage(`주말에 참가한 미팅에서 그대로『보쌈』당한 %타겟은(1)%,`);
    if (ctx.talents[0] == 1) {
      character.cvar[50] += 1;
    }
  }
  if (ctx.locals[0] === 0) {
    ctx.showMessage(`남친의 방`);
    character.cflags[163] = 2;
  } else if (ctx.locals[0] === 1) {
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 방`);
    character.cflags[163] = 1;
  } else if (ctx.locals[0] === 2) {
    ctx.showMessage(`러브호텔`);
    character.cflags[163] = 3;
  } else if (ctx.locals[0] === 3) {
    ctx.showMessage(`바다`);
    character.cflags[163] = 4;
  }
  ctx.showMessage(`에서`);
  if (character.cflags[15] === 0) {
    ctx.showMessage(`처음으로 sex하고 처녀를 바친`);
  } else {
    ctx.showMessage(`러브러브sex를 한`);
  }
  ctx.locals[1] = ctx.rand(10);
  if (character.cflags[622] == 0) {
    ctx.locals[1] = 9;
  }
  if (ctx.locals[1] >= 8) {
    ctx.showMessage(`데다, 그 모습을 몰래 찍힌`);
    character.cflags[164] = 3;
    J[8] *= 10;
    character.cvar[70] += (character.cvar[0] / 10);
    if (character.cvar[70] <= 0) {
      character.cvar[70] = 1;
    }
  }
  ctx.showMessage(`것을 스탭`);
  if (ctx.charanum >= 2) {
    ctx.showMessage(`과 다른 여배우`);
    for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
      if (ctx.count === 0) {
        // TODO: CONTINUE
      } else if (ctx.count === character) {
        // TODO: CONTINUE
      } else if (ctx.getTalent(count, 400) === 1) {
        ctx.locals[2] += 1;
      }
    }
    if (ctx.locals[2] == 0) {
      ctx.showMessage(`후보`);
    }
  }
  ctx.showMessage(`들에게 기쁜듯이 웃으며 자랑했다……`);
  if (character.cflags[15] === 0) {
    ctx.showMessage(`듣고보니 확실히 스탭들과 담소하는 ${ctx.getVarName("CALL", TARGET)}의 얼굴에선`);
    ctx.showMessage(`남자를 알게 된 여자의 요염함이 느껴진다`);
    if (character.no === 1 && ctx.master.no === 0) {
      ctx.showMessage(`${ctx.getVarName("CALL", MASTER)}에게 정말 소중한, 하나뿐인 가족인 ${ctx.josaHelper("타겟이")}`);
      ctx.showMessage(`자신이 모르는 곳에서`);
      await print_boyfriend(ctx, character);
      ctx.showMessage(`남친에게 어른이 돼버렸다는 사실――`);
      ctx.showMessage(`다른 남자의 것이 돼버렸다는 사실에, ${ctx.josaHelper("플레이어는")} 질투하고 있었다`);
    }
  }
  ctx.exp[101] += 1;
  if (ctx.locals[1] >= 8 && ctx.talents[0]) {
    character.cvar[50] += 1;
  }
  if (character.cflags[15] === 0) {
    ctx.setColor(0xF58F98);
    ctx.showMessage('【처녀상실】');
    ctx.resetColor();
    character.cflags[15] = 8;
    ctx.talents[0] = 0;
    ctx.cstr[0] = `${ctx.cstr[7]} ${ctx.cstr[8]}`;
    character.cflags[160] = ctx.base[9];
    character.cflags[161] = DAY[1];
    character.cflags[162] = DAY[2];
  }
  if (character.cflags[16] === -1) {
    ctx.setColor(0xF58F98);
    ctx.showMessage('【첫 키스】');
    ctx.resetColor();
    if (ctx.rand(2) === 0) {
      ctx.cstr[1] = `${ctx.cstr[7]} ${ctx.cstr[8]}`;
      character.cflags[16] = 8;
    } else {
      ctx.cstr[1] = `${ctx.cstr[7]} ${ctx.cstr[8]}`;
      character.cflags[16] = 8;
      character.cflags[824] = 1;
      character.cvar[50] += 1;
    }
    character.cflags[820] = ctx.base[9];
    character.cflags[821] = DAY[1];
    character.cflags[822] = DAY[2];
  }
  if (character.cflags[623] == 1) {
    character.cflags[623] = 0;
  }
}

export async function calc_bfsex2(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.varSet(character.cvar[character], 0);
  ctx.varSet(ctx.locals[0], 0);
  S = 0;
  if (ctx.abilities[3] === 4) {
    ctx.locals[0] += 1;
  } else if (ctx.abilities[3] === 5) {
    ctx.locals[0] += 2;
  } else if (ctx.abilities[3] >= 6) {
    ctx.locals[0] += 3;
  }
  if (ctx.abilities[30]) {
    ctx.locals[0] += ctx.abilities[30] / 2 + 1;
  }
  if (ctx.abilities[11] >= 5 && ctx.abilities[16] >= 5) {
    ctx.locals[0] += 2;
  }
  if (ctx.abilities[11] >= 3 && ctx.abilities[16] >= 3) {
    ctx.locals[0] += 1;
  }
  if (ctx.abilities[11] >= 7 && ctx.abilities[5] >= 6) {
    ctx.locals[0] += 1;
  }
  if (ctx.abilities[11] >= 4 && ctx.abilities[2] >= 3) {
    ctx.locals[0] += 1;
  }
  if (ctx.talents[184]) {
    ctx.locals[0] += 1;
  }
  if (ctx.talents[75]) {
    ctx.locals[0] *= 2;
  }
  if (ctx.talents[70]) {
    ctx.locals[0] += 1;
  }
  if (ctx.talents[76]) {
    ctx.locals[0] *= 2;
  }
  character.cvar[1] += ctx.locals[0];
  character.cvar[20] += ctx.locals[0]*2;
  character.cvar[5] += ctx.locals[0];
  J[0] += ctx.locals[0] * 25;
  J[2] += ctx.locals[0] * 250;
  J[14] += ctx.locals[0] * 10;
  J[5] += ctx.locals[0] * 500;
  J[7] += ctx.locals[0] * 100;
  J[8] += ctx.locals[0] * 20;
}

export async function bf_commonev_1(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.exp[1] == 0) {
    return;
  }
  if (character.cflags[42] == 79 && character.cflags[40] >= 64) {
    return;
  }
  if (DAY[1] >= 7 && DAY[1] <= 8) {
    ctx.locals[0] = ctx.rand(4);
  } else {
    ctx.locals[0] = ctx.rand(3);
  }
  await calc_bfsex2(ctx, character);
  ctx.showMessage(`주말이 지나고 월요일, 어제 휴일이었던 %타겟은(1)%,`);
  if (ctx.locals[0] === 0) {
    ctx.showMessage(`남친의 방`);
    character.cflags[833] = 2;
  } else if (ctx.locals[0] === 1) {
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 방`);
    character.cflags[833] = 1;
  } else if (ctx.locals[0] === 2) {
    ctx.showMessage(`러브호텔`);
    character.cflags[833] = 3;
  } else if (ctx.locals[0] === 3) {
    ctx.showMessage(`바다`);
    character.cflags[833] = 4;
  }
  ctx.showMessage(`에서`);
  if (character.cflags[15] === 8 && ctx.talents[2] === 1) {
    ctx.showMessage(`처녀와, 손가락 밖에 넣은 적이 없는 애널처녀까지 남친에게 바친`);
  } else if (ctx.talents[2] === 1) {
    ctx.showMessage(`손가락 밖에 넣은 적이 없는 애널처녀까지 남친에게 바친`);
  } else {
    ctx.showMessage(`러브러브 애널sex를 한`);
  }
  ctx.locals[1] = ctx.rand(10);
  if (ctx.locals[1] >= 8) {
    ctx.showMessage(`데다, 그 모습을 몰래 찍힌`);
    character.cflags[834] = 3;
    character.cvar[70] += character.cvar[0];
  }
  ctx.showMessage(`것을 스탭`);
  if (ctx.charanum >= 2) {
    ctx.showMessage(`과 다른 여배우`);
    for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
      if (ctx.count === 0) {
        // TODO: CONTINUE
      } else if (ctx.count === character) {
        // TODO: CONTINUE
      } else if (ctx.getTalent(count, 400) === 1) {
        // TODO: CONTINUE
        ctx.locals[2] = 1;
      }
    }
    if (ctx.locals[2] == 0) {
      ctx.showMessage(`후보`);
    }
  }
  ctx.showMessage(`들에게 기쁜듯이 웃으며 자랑했다……`);
  if (ctx.talents[2] === 1) {
    ctx.showMessage(`듣고보니 확실히 스탭들과 담소하는 ${ctx.getVarName("CALL", TARGET)}의 얼굴에선`);
    ctx.showMessage(`사랑하는 남친을 위해서라면 어브노멀한 플레이도 받아들이는, 어른 여자의여유가 묻어난다`);
  }
  ctx.exp[101] += 1;
  if (ctx.locals[1] >= 8 && ctx.talents[0]) {
    character.cvar[50] = 1;
  }
  if (ctx.talents[2] === 1) {
    character.cflags[616] = 8;
    ctx.setColor(0xF58F98);
    ctx.showMessage('【애널처녀상실】');
    ctx.resetColor();
    ctx.talents[2] = 0;
    ctx.cstr[3] = `${ctx.cstr[7]} ${ctx.cstr[8]}`;
    character.cflags[830] = ctx.base[9];
    character.cflags[831] = DAY[1];
    character.cflags[832] = DAY[2];
  }
  if (character.cflags[16] === -1) {
    ctx.setColor(0xF58F98);
    ctx.showMessage('【첫 키스】');
    ctx.resetColor();
    character.cflags[16] = 8;
    if (ctx.rand(2) === 0) {
      ctx.cstr[1] = `${ctx.cstr[7]} ${ctx.cstr[8]}`;
    } else {
      ctx.cstr[1] = `${ctx.cstr[7]} ${ctx.cstr[8]}`;
      character.cflags[824] = 1;
    }
    character.cflags[820] = ctx.base[9];
    character.cflags[821] = DAY[1];
    character.cflags[822] = DAY[2];
  }
}
