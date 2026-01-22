/**
 * SYSTEM_SOURCE_SUB1.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function source_sex_check(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.talents[122] === 0 && ctx.getTalent(player, 122) === 0) {
    await source_lesbian_sex_check(ctx, character);
  } else if (ctx.talents[122] && ctx.getTalent(player, 122)) {
    await source_gay_sex_check(ctx, character);
  }
}

export async function player_skill_check(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.getTalent(player, 33)) {
    ctx.times('SOURCE:0', 1.20);
    ctx.times('SOURCE:1', 1.20);
    ctx.times('SOURCE:2', 1.20);
    ctx.times('SOURCE:3', 1.20);
    ctx.times('SOURCE:17', 1.20);
  }
  if (ctx.getTalent(player, 87)) {
    ctx.times('SOURCE:12', 1.60);
  }
  if (ctx.getTalent(player, 91)) {
    ctx.times('SOURCE:8', 0.50);
    ctx.times('SOURCE:14', 0.50);
    ctx.times('SOURCE:0', 1.20);
    ctx.times('SOURCE:1', 1.20);
    ctx.times('SOURCE:2', 1.20);
    ctx.times('SOURCE:5', 1.20);
    ctx.times('SOURCE:17', 1.20);
  }
  if (ctx.getTalent(player, 92)) {
    ctx.times('SOURCE:8', 0.50);
    ctx.times('SOURCE:14', 0.50);
    ctx.times('SOURCE:0', 1.20);
    ctx.times('SOURCE:1', 1.20);
    ctx.times('SOURCE:2', 1.20);
    ctx.times('SOURCE:5', 1.20);
    ctx.times('SOURCE:17', 1.20);
  }
  if (ctx.getTalent(player, 155) && ctx.getTalent(target, 160)) {
    ctx.times('SOURCE:8', 0.50);
    ctx.times('SOURCE:14', 0.50);
    ctx.times('SOURCE:3', 1.20);
    ctx.times('SOURCE:5', 1.20);
  }
  if (ctx.getTalent(player, 156) && ctx.getTalent(target, 161)) {
    ctx.times('SOURCE:8', 0.50);
    ctx.times('SOURCE:14', 0.50);
    ctx.times('SOURCE:3', 1.20);
    ctx.times('SOURCE:5', 1.20);
  }
  if (ctx.getTalent(player, 320) && ctx.getTalent(target, 162)) {
    ctx.times('SOURCE:8', 0.50);
    ctx.times('SOURCE:14', 0.50);
    ctx.times('SOURCE:3', 1.20);
    ctx.times('SOURCE:5', 1.20);
  }
  if (ctx.getTalent(player, 207) && (ctx.getTalent(target, 315) || ctx.getTalent(target, 316))) {
    ctx.times('SOURCE:8', 0.50);
    ctx.times('SOURCE:14', 0.50);
    ctx.times('SOURCE:3', 1.20);
    ctx.times('SOURCE:5', 1.20);
  }
  if (ctx.getTalent(player, 163) && ctx.getTalent(target, 221)) {
    ctx.times('SOURCE:0', 1.20);
    ctx.times('SOURCE:1', 1.20);
    ctx.times('SOURCE:2', 1.20);
    ctx.times('SOURCE:17', 1.20);
    ctx.times('SOURCE:14', 0.80);
  }
  if (ctx.getTalent(player, 163) && ctx.getTalent(target, 221) === 0 && ctx.getTalent(target, 220) === 0) {
    ctx.times('SOURCE:0', 0.80);
    ctx.times('SOURCE:1', 0.80);
    ctx.times('SOURCE:2', 0.80);
    ctx.times('SOURCE:17', 0.80);
    ctx.times('SOURCE:14', 1.20);
  }
  if (ctx.abilities[ctx.player][12] === 0) {
    ctx.times('SOURCE:0', 0.50);
    ctx.times('SOURCE:1', 0.50);
    ctx.times('SOURCE:2', 0.50);
    ctx.times('SOURCE:17', 0.50);
  } else if (ctx.abilities[ctx.player][12] === 1) {
    ctx.times('SOURCE:0', 0.80);
    ctx.times('SOURCE:1', 0.80);
    ctx.times('SOURCE:2', 0.80);
    ctx.times('SOURCE:17', 0.80);
  } else if (ctx.abilities[ctx.player][12] === 2) {
    ctx.times('SOURCE:0', 1.00);
    ctx.times('SOURCE:1', 1.00);
    ctx.times('SOURCE:2', 1.00);
    ctx.times('SOURCE:17', 1.00);
  } else if (ctx.abilities[ctx.player][12] === 3) {
    ctx.times('SOURCE:0', 1.20);
    ctx.times('SOURCE:1', 1.20);
    ctx.times('SOURCE:2', 1.20);
    ctx.times('SOURCE:17', 1.20);
  } else if (ctx.abilities[ctx.player][12] === 4) {
    ctx.times('SOURCE:0', 1.50);
    ctx.times('SOURCE:1', 1.50);
    ctx.times('SOURCE:2', 1.50);
    ctx.times('SOURCE:17', 1.50);
  } else if (ctx.abilities[ctx.player][12] >= 5) {
    ctx.times('SOURCE:0', 2.00);
    ctx.times('SOURCE:1', 2.00);
    ctx.times('SOURCE:2', 2.00);
    ctx.times('SOURCE:17', 2.00);
  }
}

export async function master_skill_check(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.assiPlay === 0) {
    if (character.cflags[2] >= 500) {
      ctx.times('SOURCE:8', 0.70);
      ctx.times('SOURCE:14', 0.70);
      ctx.times('SOURCE:0', 1.20);
      ctx.times('SOURCE:1', 1.20);
      ctx.times('SOURCE:2', 1.20);
      ctx.times('SOURCE:3', 1.30);
      ctx.times('SOURCE:17', 1.20);
    } else if (character.cflags[2] >= 300) {
      ctx.times('SOURCE:8', 0.80);
      ctx.times('SOURCE:14', 0.80);
      ctx.times('SOURCE:0', 1.10);
      ctx.times('SOURCE:1', 1.10);
      ctx.times('SOURCE:2', 1.10);
      ctx.times('SOURCE:3', 1.20);
      ctx.times('SOURCE:17', 1.10);
    } else if (character.cflags[2] >= 100) {
      ctx.times('SOURCE:8', 0.90);
      ctx.times('SOURCE:14', 0.90);
      ctx.times('SOURCE:3', 1.10);
    }
  }
  if (ctx.talents[76] && ctx.assiPlay === 0) {
    ctx.times('SOURCE:0', 1.80);
    ctx.times('SOURCE:1', 1.80);
    ctx.times('SOURCE:2', 1.80);
    ctx.times('SOURCE:17', 1.80);
  }
  if (ctx.talents[85] && ctx.assiPlay === 0) {
    ctx.times('SOURCE:0', 1.30);
    ctx.times('SOURCE:1', 1.30);
    ctx.times('SOURCE:2', 1.30);
    ctx.times('SOURCE:3', 1.80);
    ctx.times('SOURCE:17', 1.30);
  }
}

export async function incest_sex_check(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  character.tflags[14] = 0;
  await incest(ctx, character);
  if (character.tflags[14] && character.tflags[19]) {
    if (character.tflags[14] === 1 && ctx.getTalent(player, 122)) {
      ctx.showMessage('부녀상간');
    } else if (character.tflags[14] === 1 && ctx.getTalent(player, 122) === 0) {
      ctx.showMessage('모녀상간');
    } else if (character.tflags[14] === 2 && ctx.getTalent(player, 122)) {
      ctx.showMessage('모자상간');
    } else if (character.tflags[14] === 2 && ctx.getTalent(player, 122) === 0) {
      ctx.showMessage('모녀상간');
    } else if (character.tflags[14] === 3 && ctx.getTalent(player, 122)) {
      ctx.showMessage('남매상간');
    } else if (character.tflags[14] === 3 && ctx.getTalent(player, 122) === 0) {
      ctx.showMessage('자매상간');
    } else if (character.tflags[14] === 4 && ctx.getTalent(player, 122)) {
      ctx.showMessage('남매상간');
    } else if (character.tflags[14] === 4 && ctx.getTalent(player, 122) === 0) {
      ctx.showMessage('자매상간');
    } else if (character.tflags[14] === 5 && ctx.getTalent(player, 122) === 0) {
      ctx.showMessage('사촌동생상간');
    } else if (character.tflags[14] === 6 && ctx.getTalent(player, 122)) {
      ctx.showMessage('사촌상간');
    }
    if (character.tflags[14] === 1 || character.tflags[14] === 2) {
      ctx.times('SOURCE:3', 2.00);
      ctx.times('SOURCE:14', 2.00);
      ctx.times('SOURCE:16', 2.00);
    } else if (character.tflags[14] === 3 || character.tflags[14] === 4) {
      ctx.times('SOURCE:3', 1.50);
      ctx.times('SOURCE:14', 1.50);
      ctx.times('SOURCE:16', 1.50);
    }
  }
}

export async function lost_virgin_check(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.talents[0] == 0 || character.tflags[19] == 0) {
    return 0;
  }
  ctx.setColor(0xF58F98);
  ctx.showMessage('【처녀상실】');
  ctx.resetColor();
  ctx.talents[0] = 0;
  if (ctx.relation[target][ctx.player.no] <= 1000) {
    ctx.relation[target][ctx.player.no] += 20;
  }
  character.tflags[3] = 1;
  character.tflags[31] = 1;
  if (character.equipment[53]) {
    character.tflags[32] |= 1;
  }
  character.tflags[136] = 1;
  character.tflags[14] = 0;
  await incest(ctx, character);
  if (character.cflags[15] === 0) {
    character.cflags[160] = ctx.base[9];
    character.cflags[161] = DAY[1];
    character.cflags[162] = DAY[2];
    if (character.equipment[54] === 1) {
      character.cflags[163] = 10;
    } else if (character.equipment[54] === 2) {
      character.cflags[163] = 5;
    } else if (character.equipment[54] === 3) {
      character.cflags[163] = 11;
    } else if (character.equipment[54] === 4) {
      character.cflags[163] = 12;
    } else {
      character.cflags[163] = 0;
    }
    if ((character.tflags[32] & 1)) {
      character.cflags[164] = 2;
    } else if (character.mark[3] >= 2) {
      character.cflags[164] = 4;
    } else {
      character.cflags[164] = 1;
    }
  }
  if (character.cflags[15] === 0 && character.no === 1 && ctx.talents[432] === 0 && ctx.player.no === 0) {
    character.cflags[15] = 16;
    ctx.cstr[0] = "오빠";
    if (SELECTCOM === 11) {
      if (ctx.talents[76] === 0) {
        ctx.cstr[0] = "바이브";
        character.cflags[15] = 4;
      } else if (ctx.talents[76] === 1) {
        ctx.cstr[0] = "극태 바이브";
        character.cflags[15] = 5;
      }
    } else if (character.equipment[90] === 1) {
      ctx.cstr[0] = "촉수생물";
      character.cflags[15] = 14;
    }
  } else if (character.cflags[15] === 0 && character.no === 1 && ctx.talents[432] === 1 && ctx.player.no === 0) {
    character.cflags[15] = 16;
    ctx.cstr[0] = "형님";
    if (SELECTCOM === 11) {
      if (ctx.talents[76] === 0) {
        ctx.cstr[0] = "바이브";
        character.cflags[15] = 4;
      } else if (ctx.talents[76] === 1) {
        ctx.cstr[0] = "극태 바이브";
        character.cflags[15] = 5;
      }
    } else if (character.equipment[90] === 1) {
      ctx.cstr[0] = "촉수생물";
      character.cflags[15] = 14;
    }
  } else if (character.cflags[15] === 0) {
    character.cflags[15] = 1;
    ctx.cstr[0] = ctx.getName(ctx.player);
    if (ctx.player.no == ctx.master) {
      character.cflags[15] = 16;
    }
    if (SELECTCOM === 11) {
      if (ctx.talents[76] === 0) {
        ctx.cstr[0] = "바이브";
        character.cflags[15] = 4;
      } else if (ctx.talents[76] === 1) {
        ctx.cstr[0] = "극태 바이브";
        character.cflags[15] = 5;
      }
    } else if (character.equipment[90] === 1) {
      ctx.cstr[0] = "촉수생물";
      character.cflags[15] = 14;
    }
  }
  if (ctx.player === ctx.master && ctx.talents[85]) {
    character.tflags[150] = 1;
    ctx.times('SOURCE:3', 2.00);
    ctx.times('SOURCE:15', 0.30);
  } else if (ctx.talents[76]) {
    character.tflags[150] = 1;
    ctx.times('SOURCE:3', 2.00);
    ctx.times('SOURCE:6', 0.50);
    ctx.times('SOURCE:15', 0.30);
  } else if (ctx.assiPlay && ctx.relation[R] >= 200 && character.tflags[14] === 0) {
    character.tflags[150] = 1;
  }
}

export async function firstkiss_player_check(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character.cflags[ctx.player][16] != -1 || character.tflags[620] == 0) {
    return 0;
  }
  ctx.setColor(0xF58F98);
  ctx.showMessage(`【첫 키스】(${ctx.getVarName("CALL", PLAYER)})`);
  ctx.resetColor();
  character.cflags[ctx.player][16] = 1;
  character.cflags[ctx.player][820] = ctx.playerBase[9];
  character.cflags[ctx.player][821] = DAY[1];
  character.cflags[ctx.player][822] = DAY[2];
  if ((character.tflags[620] & 2)) {
    character.cstr[ctx.player][1] = ctx.getName(character);
  } else if ((character.tflags[620] & 4)) {
    character.cstr[ctx.player][1] = ctx.getName(character);
  } else if ((character.tflags[620] & 8)) {
    character.cstr[ctx.player][1] = ctx.getName(character);
  } else {
    character.cstr[ctx.player][1] = ctx.getName(character);
  }
  character.tflags[620] = 0;
}

export async function firstkiss_assi_check(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.assiPlay == 0) {
    return 0;
  }
  if (character.cflags[ctx.assi][16] != -1 || character.tflags[622] == 0) {
    return 0;
  }
  ctx.setColor(0xF58F98);
  ctx.showMessage(`【첫 키스】(${ctx.getVarName("CALL", ASSI)})`);
  ctx.resetColor();
  character.cflags[ctx.assi][16] = 1;
  character.cflags[ctx.assi][820] = ctx.base[ctx.assi][9];
  character.cflags[ctx.assi][821] = DAY[1];
  character.cflags[ctx.assi][822] = DAY[2];
  if ((character.tflags[620] & 2)) {
    character.cstr[ctx.assi][1] = ctx.getName(character);
  } else if ((character.tflags[620] & 4)) {
    character.cstr[ctx.assi][1] = ctx.getName(character);
  } else if ((character.tflags[620] & 8)) {
    character.cstr[ctx.assi][1] = ctx.getName(character);
  } else {
    character.cstr[ctx.assi][1] = ctx.getName(character);
  }
}

export async function firstkiss_target_check(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character.cflags[16] != -1 || character.tflags[621] == 0) {
    return 0;
  }
  ctx.setColor(0xF58F98);
  ctx.showMessage('【첫 키스】');
  ctx.resetColor();
  character.cflags[16] = 1;
  character.cflags[820] = ctx.base[9];
  character.cflags[821] = DAY[1];
  character.cflags[822] = DAY[2];
  if ((character.tflags[621] & 2)) {
    if (character.no === 1 && ctx.master.no === 0 && ctx.talents[432] === 0 && ctx.assiPlay === 0) {
      ctx.cstr[1] = "오빠";
      character.cflags[16] = 16;
    } else if (character.no === 1 && ctx.master.no === 0 && ctx.talents[432] === 1 && ctx.assiPlay === 0) {
      ctx.cstr[1] = "오라비";
      character.cflags[16] = 16;
    } else {
      ctx.cstr[1] = ctx.getName(ctx.player);
      if (ctx.player.no == ctx.master) {
        character.cflags[16] = 16;
      }
    }
    character.cflags[824] = 1;
  } else if ((character.tflags[621] & 4)) {
    if (character.no === 1 && ctx.master.no === 0 && ctx.talents[432] === 0 && ctx.assiPlay === 0) {
      ctx.cstr[1] = "오빠";
      character.cflags[16] = 16;
    } else if (character.no === 1 && ctx.master.no === 0 && ctx.talents[432] === 1 && ctx.assiPlay === 0) {
      ctx.cstr[1] = "오라비";
      character.cflags[16] = 16;
    } else {
      ctx.cstr[1] = ctx.getName(ctx.player);
      if (ctx.player.no == ctx.master) {
        character.cflags[16] = 16;
      }
    }
    character.cflags[824] = 2;
  } else if ((character.tflags[621] & 8)) {
    if (character.no === 1 && ctx.master.no === 0 && ctx.talents[432] === 0 && ctx.assiPlay === 0) {
      ctx.cstr[1] = "오빠";
      character.cflags[16] = 16;
    } else if (character.no === 1 && ctx.master.no === 0 && ctx.talents[432] === 1 && ctx.assiPlay === 0) {
      ctx.cstr[1] = "오라비";
      character.cflags[16] = 16;
    } else {
      ctx.cstr[1] = ctx.getName(ctx.player);
    }
    character.cflags[824] = 3;
  } else {
    if (character.no === 1 && ctx.master.no === 0 && ctx.talents[432] === 0 && ctx.assiPlay === 0) {
      ctx.cstr[1] = "오빠";
      character.cflags[16] = 16;
    } else if (character.no === 1 && ctx.master.no === 0 && ctx.talents[432] === 1 && ctx.assiPlay === 0) {
      ctx.cstr[1] = "오라비";
      character.cflags[16] = 16;
    } else {
      ctx.cstr[1] = ctx.getName(ctx.player);
      if (ctx.player.no == ctx.master) {
        character.cflags[16] = 16;
      }
    }
  }
}

export async function lost_analvirgin_check(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.talents[2] === 0 || character.tflags[101] === 0) {
    return 0;
  }
  ctx.setColor(0xF58F98);
  ctx.showMessage('【애널처녀상실】');
  ctx.resetColor();
  character.tflags[131] = 1;
  ctx.talents[2] = 0;
  if (character.equipment[53]) {
    character.tflags[132] |= 1;
  }
  R = ctx.player.no;
  character.tflags[14] = 0;
  await incest(ctx, character);
  character.cflags[830] = ctx.base[9];
  character.cflags[831] = DAY[1];
  character.cflags[832] = DAY[2];
  if (character.equipment[53]) {
    character.cflags[834] = 2;
  } else {
    character.cflags[834] = 1;
  }
  if (character.equipment[54] === 1) {
    character.cflags[163] = 10;
  } else if (character.equipment[54] === 2) {
    character.cflags[163] = 5;
  } else if (character.equipment[54] === 3) {
    character.cflags[163] = 11;
  } else if (character.equipment[54] === 4) {
    character.cflags[163] = 12;
  } else {
    character.cflags[163] = 14;
  }
  if (character.cflags[616] === 0 && character.no === 1 && ctx.talents[432] === 0 && ctx.player.no === 0) {
    if (SELECTCOM === 13) {
      if (ctx.talents[76] === 0) {
        ctx.cstr[3] = "애널바이브";
        character.cflags[616] = 4;
      } else if (ctx.talents[76] === 1) {
        ctx.cstr[3] = "극태 애널바이브";
        character.cflags[616] = 5;
      }
    } else if (SELECTCOM === 68) {
      ctx.cstr[3] = "애널피스트";
      character.cflags[616] = 1;
    } else if (SELECTCOM === 76) {
      ctx.cstr[3] = "촉수생물";
      character.cflags[616] = 14;
    } else {
      ctx.cstr[3] = "오빠";
      character.cflags[616] = 16;
    }
  } else if (character.cflags[616] === 0 && character.no === 1 && ctx.talents[432] === 1 && ctx.player.no === 0) {
    if (SELECTCOM === 13) {
      if (ctx.talents[76] === 0) {
        ctx.cstr[3] = "애널바이브";
        character.cflags[616] = 4;
      } else if (ctx.talents[76] === 1) {
        ctx.cstr[3] = "극태 애널바이브";
        character.cflags[616] = 5;
      }
    } else if (SELECTCOM === 68) {
      ctx.cstr[3] = "애널피스트";
      character.cflags[616] = 1;
    } else if (SELECTCOM === 76) {
      ctx.cstr[3] = "촉수생물";
      character.cflags[616] = 14;
    } else {
      ctx.cstr[3] = "형님";
      character.cflags[616] = 16;
    }
  } else if (character.cflags[616] === 0) {
    if (SELECTCOM === 13) {
      if (ctx.talents[76] === 0) {
        ctx.cstr[3] = "애널바이브";
        character.cflags[616] = 4;
      } else if (ctx.talents[76] === 1) {
        ctx.cstr[3] = "극태 애널바이브";
        character.cflags[616] = 5;
      }
    } else if (SELECTCOM === 68) {
      ctx.cstr[3] = "애널피스트";
      character.cflags[616] = 1;
    } else if (SELECTCOM === 76) {
      ctx.cstr[3] = "촉수생물";
      character.cflags[616] = 14;
    } else {
      ctx.cstr[3] = ctx.getName(ctx.player);
      character.cflags[616] = 1;
    }
  }
  if (ctx.player.no == ctx.master && character.cflags[616] == 1) {
    character.cflags[616] = 16;
  }
  if (ctx.player === ctx.master && ctx.talents[85]) {
    character.tflags[150] = 1;
    ctx.times('SOURCE:3', 2.00);
    ctx.times('SOURCE:15', 0.30);
  } else if (ctx.talents[76]) {
    character.tflags[150] = 1;
    ctx.times('SOURCE:3', 2.00);
    ctx.times('SOURCE:6', 0.50);
    ctx.times('SOURCE:15', 0.30);
  } else if (ctx.assiPlay && ctx.relation[R] >= 200 && character.tflags[14] === 0) {
    character.tflags[150] = 1;
  }
}

export async function target_ejac_check(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.talents[121] == 0 && ctx.talents[122] == 0) {
    return 0;
  }
  if (ctx.talents[135]) {
    return 0;
  }
  A = UP[0] + UP[1] + UP[2] + UP[14];
  if (ctx.talents[20]) {
    A /= 2;
  }
  if (ctx.talents[70]) {
    ctx.times('A', 1.20);
  }
  if (ctx.talents[76]) {
    ctx.times('A', 1.10);
  }
  if (ctx.talents[71]) {
    ctx.times('A', 0.80);
  }
  if (character.equipment[21]) {
    A *= 2;
  }
  if (character.equipment[22]) {
    A /= 2;
  }
  if (character.equipment[37]) {
    A /= 2;
  }
  A = 1000+(A-1000)/2;
  ctx.base[2] += A;
  S = ctx.base[2];
  EJAC = MAXctx.base[2];
  if (S > EJAC * 2) {
    E = 2;
  } else if (S > EJAC) {
    E = 1;
  } else {
    E = 0;
  }
  if (E === 2) {
    LOSEctx.base[0] += 20;
    LOSEctx.base[1] += 100;
    if (ctx.exp[3] < EXPLV[1]) {
      character.source[12] += 20000;
      character.source[13] += 10000;
    } else if (ctx.exp[3] < EXPLV[2]) {
      character.source[12] += 10000;
      character.source[13] += 8000;
    } else if (ctx.exp[3] < EXPLV[3]) {
      character.source[12] += 7000;
      character.source[13] += 6000;
    } else if (ctx.exp[3] < EXPLV[4]) {
      character.source[12] += 5000;
      character.source[13] += 4000;
    } else if (ctx.exp[3] < EXPLV[5]) {
      character.source[12] += 3000;
      character.source[13] += 2000;
    } else {
      character.source[12] += 1800;
      character.source[13] += 1200;
    }
    ctx.showMessage(ctx.getString('NAME:TARGET'));
    ctx.setColor(0x00ffff);
    ctx.showMessage('대량사정⚡');
    ctx.resetColor();
    ctx.showMessage('정액경험 +1');
    ctx.showMessage('사정경험 +2');
    if (DAY < 0) {
      character.cflags[ctx.master][97] += 4;
    }
    if (ctx.exp[3] === 0 && ctx.talents[122] === 0) {
      ctx.exp[50] += 1;
      ctx.showMessage('이상경험 +1');
    }
    ctx.exp[20] += 1;
    ctx.exp[3] += 2;
    ctx.stain[2] |= 4;
    ctx.base[2] -= EJAC*2;
    if (ctx.base[2] >= EJAC) {
      ctx.base[2] = EJAC-1;
    }
    character.tflags[10] = 2;
    NOWEX[5] += 1;
    EX[5] += 1;
  } else if (E === 1) {
    LOSEctx.base[1] += 40;
    if (ctx.exp[3] < EXPLV[1]) {
      character.source[12] += 10000;
      character.source[13] += 5000;
    } else if (ctx.exp[3] < EXPLV[2]) {
      character.source[12] += 5000;
      character.source[13] += 4000;
    } else if (ctx.exp[3] < EXPLV[3]) {
      character.source[12] += 2500;
      character.source[13] += 2000;
    } else if (ctx.exp[3] < EXPLV[4]) {
      character.source[12] += 1600;
      character.source[13] += 1400;
    } else if (ctx.exp[3] < EXPLV[5]) {
      character.source[12] += 800;
      character.source[13] += 500;
    } else {
      character.source[12] += 200;
      character.source[13] += 250;
    }
    ctx.showMessage(ctx.getString('NAME:TARGET'));
    ctx.setColor(0x00ffff);
    ctx.showMessage('사정⚡');
    ctx.resetColor();
    ctx.showMessage('사정경험 +1');
    if (DAY < 0) {
      character.cflags[ctx.master][97] += 2;
    }
    if (ctx.exp[3] === 0 && ctx.talents[122] === 0) {
      ctx.exp[50] += 1;
      ctx.showMessage('이상경험 +1');
    }
    ctx.exp[3] += 1;
    ctx.stain[2] |= 4;
    ctx.base[2] -= EJAC;
    if (ctx.base[2] >= EJAC) {
      ctx.base[2] = EJAC-1;
    }
    character.tflags[10] = 1;
    NOWEX[5] += 1;
    EX[5] += 1;
  }
}

export async function target_milk_check(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.talents[130] == 0) {
    return 0;
  }
  A = UP[0] / 5 + UP[1] / 5 + UP[2] / 5 + UP[14] * 3;
  if (ctx.talents[20]) {
    A /= 2;
  }
  if (ctx.talents[70]) {
    ctx.times('A', 1.20);
  }
  if (ctx.talents[76]) {
    ctx.times('A', 1.10);
  }
  if (ctx.talents[71]) {
    ctx.times('A', 0.80);
  }
  if (ctx.talents[108]) {
    ctx.times('A', 1.50);
  }
  if (character.equipment[21]) {
    A *= 2;
  }
  if (character.equipment[22]) {
    A /= 2;
  }
  if (ctx.getTalent(player, 131)) {
    A *= 2;
  }
  if (ctx.getTalent(player, 132)) {
    A *= 2;
  }
  if (ctx.talents[109]) {
    ctx.times('A', 0.50);
  }
  if (ctx.talents[116]) {
    ctx.times('A', 0.20);
  }
  A = 1000+(A-1000)/2;
  ctx.base[3] += A;
  S = ctx.base[3];
  EJAC = MAXctx.base[3];
  if (S > EJAC * 2) {
    E = 2;
  } else if (S > EJAC) {
    E = 1;
  } else {
    E = 0;
  }
  if (E === 2) {
    LOSEctx.base[0] += 20;
    LOSEctx.base[1] += 100;
    if (ctx.exp[54] < EXPLV[1]) {
      character.source[12] += 20000;
      character.source[13] += 10000;
    } else if (ctx.exp[54] < EXPLV[2]) {
      character.source[12] += 10000;
      character.source[13] += 8000;
    } else if (ctx.exp[54] < EXPLV[3]) {
      character.source[12] += 7000;
      character.source[13] += 6000;
    } else if (ctx.exp[54] < EXPLV[4]) {
      character.source[12] += 5000;
      character.source[13] += 4000;
    } else if (ctx.exp[54] < EXPLV[5]) {
      character.source[12] += 3000;
      character.source[13] += 2000;
    } else {
      character.source[12] += 1800;
      character.source[13] += 1200;
    }
    ctx.showMessage(`%타겟은(1)% 유두에서 대량의 모유를 분출했다.`);
    ctx.showMessage('분유경험 +2');
    if (ctx.exp[54] === 0) {
      ctx.exp[50] += 1;
      ctx.showMessage('이상경험 +1');
    }
    ctx.exp[54] += 2;
    ctx.stain[5] |= 16;
    ctx.base[3] -= EJAC*2;
    if (ctx.base[3] >= EJAC) {
      ctx.base[3] = EJAC-1;
    }
    character.tflags[11] += 2;
    if (character.equipment[16] && character.equipment[90] == 0) {
      character.tflags[35] += 2;
    }
    NOWEX[4] += 1;
    EX[4] += 1;
  } else if (E === 1) {
    LOSEctx.base[1] += 40;
    if (ctx.exp[54] < EXPLV[1]) {
      character.source[12] += 10000;
      character.source[13] += 5000;
    } else if (ctx.exp[54] < EXPLV[2]) {
      character.source[12] += 5000;
      character.source[13] += 4000;
    } else if (ctx.exp[54] < EXPLV[3]) {
      character.source[12] += 2500;
      character.source[13] += 2000;
    } else if (ctx.exp[54] < EXPLV[4]) {
      character.source[12] += 1600;
      character.source[13] += 1400;
    } else if (ctx.exp[54] < EXPLV[5]) {
      character.source[12] += 800;
      character.source[13] += 500;
    } else {
      character.source[12] += 200;
      character.source[13] += 250;
    }
    ctx.showMessage(`%타겟은(1)% 유두에서 모유를 분출했다.`);
    ctx.showMessage('분유경험 +1');
    if (DAY < 0) {
      character.cflags[ctx.master][97] += 2;
    }
    if (ctx.exp[54] === 0) {
      ctx.exp[50] += 1;
      ctx.showMessage('이상경험 +1');
    }
    ctx.exp[54] += 1;
    ctx.stain[5] |= 16;
    ctx.base[3] -= EJAC;
    if (ctx.base[3] >= EJAC) {
      ctx.base[3] = EJAC-1;
    }
    character.tflags[11] += 1;
    if (character.equipment[16] && character.equipment[90] == 0) {
      character.tflags[35] += 1;
    }
    NOWEX[4] += 1;
    EX[4] += 1;
  }
}

export async function up_talent_cva_check(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character.equipment[21]) {
    ctx.times('UP:0', 2.00);
    ctx.times('UP:1', 2.00);
    ctx.times('UP:2', 2.00);
    ctx.times('UP:14', 2.00);
  }
  if (character.equipment[22]) {
    ctx.times('UP:0', 0.70);
    ctx.times('UP:1', 0.70);
    ctx.times('UP:2', 0.70);
    ctx.times('UP:14', 0.70);
  }
  if (character.tflags[899] > 0) {
    ctx.times('UP:0', 0.20);
    ctx.times('UP:1', 0.20);
    ctx.times('UP:2', 0.20);
    ctx.times('UP:14', 0.20);
  }
  if (ctx.talents[20]) {
    ctx.times('UP:0', 0.30);
    ctx.times('UP:1', 0.50);
    ctx.times('UP:2', 0.70);
    ctx.times('UP:14', 0.30);
  }
  if (ctx.talents[122]) {
    ctx.times('UP:2', 1.30);
  }
  if (ctx.talents[115]) {
    ctx.times('UP:0', 0.50);
    ctx.times('UP:1', 0.50);
    ctx.times('UP:2', 0.50);
    ctx.times('UP:14', 0.50);
  }
  if (ctx.talents[272]) {
    ctx.times('UP:0', 1.20);
    ctx.times('UP:1', 1.20);
    ctx.times('UP:2', 1.20);
    ctx.times('UP:14', 1.20);
  }
}

export async function up_talent_check(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character.equipment[21]) {
    ctx.times('UP:4', 1.20);
    ctx.times('UP:5', 2.00);
    ctx.times('UP:6', 1.20);
    ctx.times('UP:11', 0.75);
    ctx.times('UP:12', 0.50);
  }
  if (character.equipment[22]) {
    ctx.times('UP:4', 0.80);
    ctx.times('UP:5', 1.50);
    ctx.times('UP:6', 0.80);
    ctx.times('UP:11', 0.50);
    ctx.times('UP:12', 1.20);
    ctx.times('UP:13', 1.50);
    ctx.times('UP:15', 1.20);
  }
  if (character.tflags[899] > 0) {
    ctx.times('UP:4', 0.50);
    ctx.times('UP:5', 0.75);
    ctx.times('UP:6', 0.10);
    ctx.times('UP:8', 0.10);
    ctx.times('UP:10', 0.00);
    ctx.times('UP:11', 0.00);
    ctx.times('UP:12', 0.10);
    ctx.times('UP:13', 0.00);
  }
  if (ctx.talents[10]) {
    ctx.times('UP:10', 2.00);
    ctx.times('UP:11', 0.50);
    ctx.times('UP:13', 0.25);
  }
  if (ctx.talents[11]) {
    ctx.times('UP:4', 0.25);
    ctx.times('UP:5', 0.50);
    ctx.times('UP:11', 1.50);
  }
  if (ctx.talents[12]) {
    ctx.times('UP:4', 0.30);
    ctx.times('UP:5', 0.75);
    ctx.times('UP:10', 0.80);
    ctx.times('UP:11', 2.00);
    ctx.times('UP:13', 2.00);
  }
  if (ctx.talents[13]) {
    ctx.times('UP:4', 2.00);
    ctx.times('UP:11', 0.60);
  }
  if (ctx.talents[14]) {
    ctx.times('UP:11', 0.30);
  }
  if (ctx.talents[15]) {
    ctx.times('UP:6', 0.50);
    ctx.times('UP:10', 0.60);
    ctx.times('UP:11', 1.20);
  }
  if (ctx.talents[17]) {
    ctx.times('UP:6', 2.00);
    ctx.times('UP:10', 1.50);
    ctx.times('UP:11', 0.80);
  }
  if (ctx.talents[21]) {
    ctx.times('UP:4', 0.50);
    ctx.times('UP:5', 0.50);
    ctx.times('UP:6', 0.50);
    ctx.times('UP:10', 0.80);
    ctx.times('UP:11', 0.80);
  }
  if (ctx.talents[22]) {
    ctx.times('UP:4', 0.60);
    ctx.times('UP:5', 0.60);
    ctx.times('UP:6', 0.60);
    ctx.times('UP:8', 0.60);
    ctx.times('UP:10', 0.60);
    ctx.times('UP:11', 0.60);
    ctx.times('UP:12', 0.60);
    ctx.times('UP:13', 0.60);
  }
  if (ctx.talents[23]) {
    ctx.times('UP:7', 1.20);
  }
  if (ctx.talents[24]) {
    ctx.times('UP:7', 0.80);
  }
  if (ctx.talents[25]) {
    ctx.times('UP:13', 0.30);
  }
  if (ctx.talents[26]) {
    ctx.times('UP:13', 2.50);
  }
  if (ctx.talents[32]) {
    ctx.times('UP:5', 0.50);
    ctx.times('UP:11', 2.00);
    ctx.times('UP:13', 1.50);
  }
  if (ctx.talents[33]) {
    ctx.times('UP:5', 2.00);
    ctx.times('UP:6', 2.00);
  }
  if (ctx.talents[34]) {
    ctx.times('UP:5', 0.50);
    ctx.times('UP:11', 2.00);
  }
  if (ctx.talents[40]) {
    ctx.times('UP:10', 2.00);
    ctx.times('UP:11', 1.50);
  }
  if (ctx.talents[41]) {
    ctx.times('UP:10', 0.50);
    ctx.times('UP:11', 0.75);
  }
  if (ctx.talents[50]) {
    ctx.times('UP:7', 2.00);
  }
  if (ctx.talents[51]) {
    ctx.times('UP:7', 0.50);
  }
  if (ctx.talents[63]) {
    ctx.times('UP:6', 2.00);
  }
  if (ctx.talents[70]) {
    ctx.times('UP:5', 2.00);
  }
  if (ctx.talents[71]) {
    ctx.times('UP:5', 0.50);
  }
  if (ctx.talents[85] && ctx.assiPlay === 0) {
    ctx.times('UP:4', 1.20);
    ctx.times('UP:6', 2.00);
    ctx.times('UP:11', 0.50);
    ctx.times('UP:12', 0.50);
  }
  if (ctx.talents[86]) {
    ctx.times('UP:6', 4.00);
    ctx.times('UP:11', 0.50);
  }
  if (ctx.talents[115]) {
    ctx.times('UP:13', 0.20);
  }
  if (ctx.getTalent(player, 93)) {
    ctx.times('UP:10', 2.00);
    ctx.times('UP:11', 0.50);
  }
  if (ctx.talents[272]) {
    ctx.times('UP:5', 1.20);
  }
  if (ctx.talents[271]) {
    ctx.times('UP:5', 1.20);
    ctx.times('UP:3', 1.20);
  }
  if (character.tflags[2] && (SELECTCOM === 20 || SELECTCOM === 21 || SELECTCOM === 22 || SELECTCOM === 23 || SELECTCOM === 34)) {
    if (ctx.assiPlay === 0 && character.equipment[35] === 0 && character.tflags[2] && ctx.talents[85] === 0) {
      ctx.times('UP:10', 2.00);
    } else if (ctx.assi > 0 && ctx.assiPlay && character.equipment[36] === 0) {
      R = ctx.assi.no;
      if (ctx.getRelation(character, "R") < 200) {
        ctx.times('UP:10', 2.00);
      }
    }
  }
  if (character.mark[3] === 3) {
    ctx.times('UP:4', 0.10);
  } else if (character.mark[3] === 2) {
    ctx.times('UP:4', 0.40);
  } else if (character.mark[3] === 1) {
    ctx.times('UP:4', 0.70);
  }
}

export async function mark_got_check(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  A = UP[11] + UP[12];
  if (A >= 500 && A < 1200 && character.mark[4] <= 0 && character.tflags[150] === 0) {
    character.mark[3] = 1;
    character.mark[4] = 1;
    character.tflags[21] = 1;
    ctx.showMessage('반발각인 LV1을 습득');
  } else if (A >= 1200 && A < 3000 && character.mark[4] <= 1 && character.tflags[150] === 0) {
    character.mark[3] = 2;
    character.mark[4] = 2;
    character.tflags[21] = 2;
    ctx.showMessage('반발각인 LV2를 습득');
    if (ctx.abilities[10] === 1 && ctx.talents[22] === 0) {
      ctx.showMessage('그리고 신뢰가 LV0으로 내려갔다');
      ctx.abilities[10] = 0;
    } else if (ctx.abilities[10] === 2 && ctx.talents[22] === 0) {
      ctx.showMessage('그리고 신뢰가 LV1로 내려갔다');
      ctx.abilities[10] = 1;
    }
  } else if (A >= 3000 && character.mark[4] <= 2 && character.tflags[150] === 0) {
    character.mark[3] = 3;
    character.mark[4] = 3;
    character.tflags[21] = 3;
    ctx.showMessage('반발각인 LV3을 습득');
    if (ctx.abilities[10] > 0 && ctx.abilities[10] <= 2 && ctx.talents[22] === 0) {
      ctx.showMessage('그리고 신뢰가 LV0으로 내려갔다');
      ctx.abilities[10] = 0;
    } else if (ctx.abilities[10] === 3 && ctx.talents[22] === 0) {
      ctx.showMessage('그리고 신뢰가 LV2로 내려갔다');
      ctx.abilities[10] = 2;
    }
  }
  character.tflags[150] = 0;
  if (UP[9] >= 500 && UP[9] < 1500 && character.mark[0] <= 0) {
    character.mark[0] = 1;
    character.tflags[22] = 1;
    ctx.showMessage('고통각인 LV1을 습득');
  } else if (UP[9] >= 1500 && UP[9] < 3000 && character.mark[0] <= 1) {
    character.mark[0] = 2;
    character.tflags[22] = 2;
    ctx.showMessage('고통각인 LV2를 습득');
    if (ctx.abilities[10] === 0 && ctx.talents[12] === 0 && ctx.talents[22] === 0) {
      ctx.showMessage('그리고 신뢰가 LV1이 됐다');
      ctx.abilities[10] = 1;
      await jujun_up_check(ctx, character);
    }
  } else if (UP[9] >= 3000 && character.mark[0] <= 2) {
    character.mark[0] = 3;
    character.tflags[22] = 3;
    ctx.showMessage('고통각인 LV3을 습득');
    if (ctx.abilities[10] === 0 && ctx.talents[12] === 0 && ctx.talents[22] === 0) {
      ctx.showMessage('그리고 신뢰가 LV1이 됐다');
      ctx.abilities[10] = 1;
      await jujun_up_check(ctx, character);
    }
    if (ctx.getTalent(player, 83)) {
      ctx.showMessage(`${ctx.getVarName("EXP", 50)} +1`);
      ctx.exp[50] += 1;
    }
  }
  A = UP[0] + UP[1] + UP[2] + UP[14];
  if (A >= 500 && A < 1500 && character.mark[1] <= 0) {
    character.mark[1] = 1;
    character.tflags[23] = 1;
    ctx.showMessage('쾌락각인 LV1을 습득');
  } else if (A >= 1500 && A < 3000 && character.mark[1] <= 1) {
    character.mark[1] = 2;
    character.tflags[23] = 2;
    ctx.showMessage('쾌락각인 LV2를 습득');
  } else if (A >= 3000 && character.mark[1] <= 2) {
    character.mark[1] = 3;
    character.tflags[23] = 3;
    ctx.showMessage('쾌락각인 LV3을 습득');
    if (ctx.abilities[10] === 0 && ctx.talents[20] === 0 && ctx.talents[22] === 0) {
      ctx.showMessage('그리고 신뢰가 LV1이 됐다');
      ctx.abilities[10] = 1;
      await jujun_up_check(ctx, character);
    }
  }
  if (character.tflags[200] === 1 && character.mark[2] <= 0) {
    character.mark[2] = 1;
    character.tflags[24] = 1;
    ctx.showMessage('굴복각인 LV1을 습득');
  } else if (character.tflags[200] === 2 && character.mark[2] <= 1) {
    character.mark[2] = 2;
    character.tflags[24] = 2;
    ctx.showMessage('굴복각인 LV2를 습득');
    if (ctx.abilities[10] === 0 && ctx.talents[22] === 0) {
      ctx.showMessage('그리고 신뢰가 LV1이 됐다');
      ctx.abilities[10] = 1;
      await jujun_up_check(ctx, character);
    }
  } else if (character.tflags[200] === 3 && character.mark[2] <= 2) {
    character.mark[2] = 3;
    character.tflags[24] = 3;
    ctx.showMessage('굴복각인 LV3을 습득');
    if (ctx.abilities[10] <= 1 && ctx.talents[22] === 0) {
      ctx.showMessage('그리고 신뢰가 LV2가 됐다');
      ctx.abilities[10] = 2;
      await jujun_up_check(ctx, character);
    }
  }
}

export async function yokubo_up_check(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.abilities[11] >= 3 && (ctx.talents[32] || ctx.talents[34])) {
    ctx.showMessage(`%타겟은(1)%`);
    if (ctx.talents[32]) {
      ctx.showMessage(`【${ctx.getVarName("TALENT", 32)}】`);
      ctx.talents[32] = 0;
    }
    if (ctx.talents[34]) {
      ctx.showMessage(`【${ctx.getVarName("TALENT", 34)}】`);
      ctx.talents[34] = 0;
    }
    ctx.showMessage('을 잃었다');
    ctx.showMessage('부정의 구슬이 절반이 되었다');
    ctx.juel[100] /= 2;
    character.tflags[25] = 1;
  }
}

export async function jujun_up_check(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.abilities[10] >= 4 && ctx.talents[11] && ctx.talents[18]) {
    ctx.showMessage(`%타겟은(1)%【${ctx.getVarName("TALENT", 11)}】을 잃고,`);
    ctx.showMessage(`【${ctx.getVarName("TALENT", 13)}】을 습득했다`);
    ctx.talents[11] = 0;
    ctx.talents[13] = 1;
  }
}

export async function exp_got_check(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  A = UP[0] + UP[1] + UP[2] + UP[14];
  E = 0;
  if (UP[7] < 100) {
    A = 0;
  } else if (UP[7] < 300) {
    A *= 1;
  } else if (UP[7] < 700) {
    A *= 2;
  } else if (UP[7] < 1500) {
    A *= 3;
  } else {
    A *= 4;
  }
  if (character.tflags[100]) {
    if (A >= 12000) {
      E = 16;
      ctx.times('UP:11', 0.65);
      ctx.times('UP:12', 0.30);
    } else if (A >= 8000) {
      E = 12;
      ctx.times('UP:11', 0.70);
      ctx.times('UP:12', 0.40);
    } else if (A >= 5000) {
      E = 8;
      ctx.times('UP:11', 0.75);
      ctx.times('UP:12', 0.50);
    } else if (A >= 3000) {
      E = 4;
      ctx.times('UP:11', 0.80);
      ctx.times('UP:12', 0.60);
    } else if (A >= 2000) {
      E = 2;
      ctx.times('UP:11', 0.85);
      ctx.times('UP:12', 0.70);
    } else if (A >= 1000) {
      E = 1;
      ctx.times('UP:11', 0.90);
      ctx.times('UP:12', 0.80);
    }
    if (E) {
      ctx.print('봉사쾌락경험 +');
      ctx.printValueLine(E);
      ctx.exp[21] += E;
      character.tflags[26] = E;
    }
  }
  A = UP[2];
  E = 0;
  if (UP[2] < 300) {
    A = 0;
  } else if (UP[2] < 1000) {
    A *= 1;
  } else if (UP[2] < 5000) {
    A *= 2;
  } else if (UP[2] < 10000) {
    A *= 3;
  } else {
    A *= 4;
  }
  if (A >= 12000) {
    E = 16;
    ctx.times('UP:11', 0.80);
    ctx.times('UP:12', 0.90);
    ctx.times('UP:6', 1.20);
  } else if (A >= 8000) {
    E = 12;
    ctx.times('UP:11', 0.85);
    ctx.times('UP:12', 0.90);
    ctx.times('UP:6', 1.15);
  } else if (A >= 5000) {
    E = 8;
    ctx.times('UP:11', 0.85);
    ctx.times('UP:12', 0.95);
    ctx.times('UP:6', 1.10);
  } else if (A >= 3000) {
    E = 4;
    ctx.times('UP:11', 0.90);
    ctx.times('UP:12', 0.95);
    ctx.times('UP:6', 1.05);
  } else if (A >= 2000) {
    E = 2;
    ctx.times('UP:11', 0.90);
    ctx.times('UP:12', 1.00);
    ctx.times('UP:6', 1.00);
  } else if (A >= 1000) {
    E = 1;
    ctx.times('UP:11', 0.95);
    ctx.times('UP:12', 1.00);
    ctx.times('UP:6', 1.00);
  }
  if (E) {
    ctx.print('A쾌락경험 +');
    ctx.printValueLine(E);
    ctx.exp[32] += E;
    character.tflags[128] = E;
  }
  A = UP[0] + UP[1] + UP[2] + UP[14];
  if (A == 0) {
    A = UP[5];
  }
  E = 0;
  F = 0;
  if (A >= 3000 && UP[9] >= 2000) {
    E = 16;
    ctx.times('UP:11', 0.65);
  } else if (A >= 2500 && UP[9] >= 1500) {
    E = 12;
    ctx.times('UP:11', 0.70);
  } else if (A >= 1500 && UP[9] >= 1000) {
    E = 8;
    ctx.times('UP:11', 0.75);
  } else if (A >= 1000 && UP[9] >= 500) {
    E = 4;
    ctx.times('UP:11', 0.80);
  } else if (A >= 600 && UP[9] >= 300) {
    E = 2;
    ctx.times('UP:11', 0.85);
  } else if (A >= 300 && UP[9] >= 100) {
    E = 1;
    ctx.times('UP:11', 0.90);
  }
  if (E) {
    ctx.print('피학쾌락경험 +');
    ctx.printValueLine(E);
    ctx.exp[30] += E;
    character.tflags[27] = E;
    if (ctx.assiPlay && ctx.assi > 0) {
      if (ctx.assiAbilities[20] + character.equipment[47] === 0) {
        ctx.times('E', 0.00);
        F = 0;
      } else if (ctx.assiAbilities[20] + character.equipment[47] === 1) {
        ctx.times('E', 0.50);
        F = 0;
      } else if (ctx.assiAbilities[20] + character.equipment[47] === 2) {
        ctx.times('E', 1.00);
        F = E / 2;
      } else if (ctx.assiAbilities[20] + character.equipment[47] === 3) {
        F = E * 2;
      } else if (ctx.assiAbilities[20] + character.equipment[47] === 4) {
        F = E * 10;
      } else if (ctx.assiAbilities[20] + character.equipment[47] >= 5) {
        F = E * 50;
      }
      if (E) {
        ctx.showMessage(`가학쾌락경험 +{E}(${ctx.getVarName("CALL", ASSI)})`);
        ctx.exp[ctx.assi][33] += E;
      }
      if (F) {
        ctx.showMessage(`${ctx.getVarName("PALAM", 5)}의 구슬 +{F}(${ctx.getVarName("CALL", ASSI)})`);
        ctx.juel[ctx.assi][5] += F;
      }
    }
  }
}

export async function sokuochi_check(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.talents[73] == 0) {
    return 0;
  }
  if (UP[0] > 1 && ctx.abilities[0] < 1) {
    ctx.abilities[0] = 1;
    ctx.showMessage(`${ctx.getVarName("ABL", 0)} LV1이 되었다`);
  } else if (UP[0] > 30 && ctx.abilities[0] < 2) {
    ctx.abilities[0] = 2;
    ctx.showMessage(`${ctx.getVarName("ABL", 0)} LV2가 되었다`);
  } else if (UP[0] > 60 && ctx.abilities[0] < 3) {
    ctx.abilities[0] = 3;
    ctx.showMessage(`${ctx.getVarName("ABL", 0)} LV3이 되었다`);
  } else if (UP[0] > 200 && ctx.abilities[0] < 4) {
    ctx.abilities[0] = 4;
    ctx.showMessage(`${ctx.getVarName("ABL", 0)} LV4가 되었다`);
  } else if (UP[0] > 1000 && ctx.abilities[0] < 5) {
    ctx.abilities[0] = 5;
    ctx.showMessage(`${ctx.getVarName("ABL", 0)} LV5가 되었다`);
  }
  if (UP[1] > 1 && ctx.abilities[2] < 1) {
    ctx.abilities[2] = 1;
    ctx.showMessage(`${ctx.getVarName("ABL", 2)} LV1이 되었다`);
  } else if (UP[1] > 30 && ctx.abilities[2] < 2) {
    ctx.abilities[2] = 2;
    ctx.showMessage(`${ctx.getVarName("ABL", 2)} LV2가 되었다`);
  } else if (UP[1] > 60 && ctx.abilities[2] < 3) {
    ctx.abilities[2] = 3;
    ctx.showMessage(`${ctx.getVarName("ABL", 2)} LV3이 되었다`);
  } else if (UP[1] > 200 && ctx.abilities[2] < 4) {
    ctx.abilities[2] = 4;
    ctx.showMessage(`${ctx.getVarName("ABL", 2)} LV4가 되었다`);
  } else if (UP[1] > 1000 && ctx.abilities[2] < 5) {
    ctx.abilities[2] = 5;
    ctx.showMessage(`${ctx.getVarName("ABL", 2)} LV5가 되었다`);
  }
  if (UP[2] > 1 && ctx.abilities[3] < 1) {
    ctx.abilities[3] = 1;
    ctx.showMessage(`${ctx.getVarName("ABL", 3)} LV1이 되었다`);
  } else if (UP[2] > 30 && ctx.abilities[3] < 2) {
    ctx.abilities[3] = 2;
    ctx.showMessage(`${ctx.getVarName("ABL", 3)} LV2가 되었다`);
  } else if (UP[2] > 60 && ctx.abilities[3] < 3) {
    ctx.abilities[3] = 3;
    ctx.showMessage(`${ctx.getVarName("ABL", 3)} LV3이 되었다`);
  } else if (UP[2] > 200 && ctx.abilities[3] < 4) {
    ctx.abilities[3] = 4;
    ctx.showMessage(`${ctx.getVarName("ABL", 3)} LV4가 되었다`);
  } else if (UP[2] > 1000 && ctx.abilities[3] < 5) {
    ctx.abilities[3] = 5;
    ctx.showMessage(`${ctx.getVarName("ABL", 3)} LV5가 되었다`);
  }
  if (UP[14] > 1 && ctx.abilities[1] < 1) {
    ctx.abilities[1] = 1;
    ctx.showMessage(`${ctx.getVarName("ABL", 1)} LV1이 되었다`);
  } else if (UP[14] > 30 && ctx.abilities[1] < 2) {
    ctx.abilities[1] = 2;
    ctx.showMessage(`${ctx.getVarName("ABL", 1)} LV2가 되었다`);
  } else if (UP[14] > 60 && ctx.abilities[1] < 3) {
    ctx.abilities[1] = 3;
    ctx.showMessage(`${ctx.getVarName("ABL", 1)} LV3이 되었다`);
  } else if (UP[14] > 200 && ctx.abilities[1] < 4) {
    ctx.abilities[1] = 4;
    ctx.showMessage(`${ctx.getVarName("ABL", 1)} LV4가 되었다`);
  } else if (UP[14] > 1000 && ctx.abilities[1] < 5) {
    ctx.abilities[1] = 5;
    ctx.showMessage(`${ctx.getVarName("ABL", 1)} LV5가 되었다`);
  }
  if (UP[4] > 1 && ctx.abilities[10] < 1) {
    ctx.abilities[10] = 1;
    ctx.showMessage(`${ctx.getVarName("ABL", 10)} LV1이 되었다`);
  } else if (UP[4] > 30 && ctx.abilities[10] < 2) {
    ctx.abilities[10] = 2;
    ctx.showMessage(`${ctx.getVarName("ABL", 10)} LV2가 되었다`);
  } else if (UP[4] > 60 && ctx.abilities[10] < 3) {
    ctx.abilities[10] = 3;
    ctx.showMessage(`${ctx.getVarName("ABL", 10)} LV3이 되었다`);
  } else if (UP[4] > 200 && ctx.abilities[10] < 4) {
    ctx.abilities[10] = 4;
    ctx.showMessage(`${ctx.getVarName("ABL", 10)} LV4가 되었다`);
  } else if (UP[4] > 1000 && ctx.abilities[10] < 5) {
    ctx.abilities[10] = 5;
    ctx.showMessage(`${ctx.getVarName("ABL", 10)} LV5가 되었다`);
  }
  if (UP[5] > 1 && ctx.abilities[11] < 1) {
    ctx.abilities[11] = 1;
    ctx.showMessage(`${ctx.getVarName("ABL", 11)} LV1이 되었다`);
  } else if (UP[5] > 30 && ctx.abilities[11] < 2) {
    ctx.abilities[11] = 2;
    ctx.showMessage(`${ctx.getVarName("ABL", 11)} LV2가 되었다`);
  } else if (UP[5] > 60 && ctx.abilities[11] < 3) {
    ctx.abilities[11] = 3;
    ctx.showMessage(`${ctx.getVarName("ABL", 11)} LV3이 되었다`);
  } else if (UP[5] > 200 && ctx.abilities[11] < 4) {
    ctx.abilities[11] = 4;
    ctx.showMessage(`${ctx.getVarName("ABL", 11)} LV4가 되었다`);
  } else if (UP[5] > 1000 && ctx.abilities[11] < 5) {
    ctx.abilities[11] = 5;
    ctx.showMessage(`${ctx.getVarName("ABL", 11)} LV5가 되었다`);
  }
  if (UP[7] > 1 && ctx.abilities[12] < 1) {
    ctx.abilities[12] = 1;
    ctx.showMessage(`${ctx.getVarName("ABL", 12)} LV1이 되었다`);
  } else if (UP[7] > 30 && ctx.abilities[12] < 2) {
    ctx.abilities[12] = 2;
    ctx.showMessage(`${ctx.getVarName("ABL", 12)} LV2가 되었다`);
  } else if (UP[7] > 60 && ctx.abilities[12] < 3) {
    ctx.abilities[12] = 3;
    ctx.showMessage(`${ctx.getVarName("ABL", 12)} LV3이 되었다`);
  } else if (UP[7] > 200 && ctx.abilities[12] < 4) {
    ctx.abilities[12] = 4;
    ctx.showMessage(`${ctx.getVarName("ABL", 12)} LV4가 되었다`);
  } else if (UP[7] > 1000 && ctx.abilities[12] < 5) {
    ctx.abilities[12] = 5;
    ctx.showMessage(`${ctx.getVarName("ABL", 12)} LV5가 되었다`);
  }
  if (UP[6] > 1 && ctx.abilities[16] < 1 && ctx.abilities[0] >= 1) {
    ctx.abilities[16] = 1;
    ctx.showMessage(`${ctx.getVarName("ABL", 16)} LV1이 되었다`);
  } else if (UP[6] > 30 && ctx.abilities[16] < 2 && ctx.abilities[0] >= 2) {
    ctx.abilities[16] = 2;
    ctx.showMessage(`${ctx.getVarName("ABL", 16)} LV2가 되었다`);
  } else if (UP[6] > 60 && ctx.abilities[16] < 3 && ctx.abilities[0] >= 3) {
    ctx.abilities[16] = 3;
    ctx.showMessage(`${ctx.getVarName("ABL", 16)} LV3이 되었다`);
  } else if (UP[6] > 200 && ctx.abilities[16] < 4 && ctx.abilities[0] >= 4) {
    ctx.abilities[16] = 4;
    ctx.showMessage(`${ctx.getVarName("ABL", 16)} LV4가 되었다`);
  } else if (UP[6] > 1000 && ctx.abilities[16] < 5 && ctx.abilities[0] >= 5) {
    ctx.abilities[16] = 5;
    ctx.showMessage(`${ctx.getVarName("ABL", 16)} LV5가 되었다`);
  }
  if (UP[8] > 1 && ctx.abilities[17] < 1 && ctx.abilities[1] >= 1) {
    ctx.abilities[17] = 1;
    ctx.showMessage(`${ctx.getVarName("ABL", 17)} LV1이 되었다`);
  } else if (UP[8] > 30 && ctx.abilities[17] < 2 && ctx.abilities[1] >= 2) {
    ctx.abilities[17] = 2;
    ctx.showMessage(`${ctx.getVarName("ABL", 17)} LV2가 되었다`);
  } else if (UP[8] > 60 && ctx.abilities[17] < 3 && ctx.abilities[1] >= 3) {
    ctx.abilities[17] = 3;
    ctx.showMessage(`${ctx.getVarName("ABL", 17)} LV3이 되었다`);
  } else if (UP[8] > 200 && ctx.abilities[17] < 4 && ctx.abilities[1] >= 4) {
    ctx.abilities[17] = 4;
    ctx.showMessage(`${ctx.getVarName("ABL", 17)} LV4가 되었다`);
  } else if (UP[8] > 1000 && ctx.abilities[17] < 5 && ctx.abilities[1] >= 5) {
    ctx.abilities[17] = 5;
    ctx.showMessage(`${ctx.getVarName("ABL", 17)} LV5가 되었다`);
  }
  if (UP[9] > 1 && ctx.abilities[21] < 1 && ctx.abilities[11] >= 1) {
    ctx.abilities[21] = 1;
    ctx.showMessage(`${ctx.getVarName("ABL", 21)} LV1이 되었다`);
  } else if (UP[9] > 30 && ctx.abilities[21] < 2 && ctx.abilities[11] >= 2) {
    ctx.abilities[21] = 2;
    ctx.showMessage(`${ctx.getVarName("ABL", 21)} LV2가 되었다`);
  } else if (UP[9] > 60 && ctx.abilities[21] < 3 && ctx.abilities[11] >= 3) {
    ctx.abilities[21] = 3;
    ctx.showMessage(`${ctx.getVarName("ABL", 21)} LV3이 되었다`);
  } else if (UP[9] > 200 && ctx.abilities[21] < 4 && ctx.abilities[11] >= 4) {
    ctx.abilities[21] = 4;
    ctx.showMessage(`${ctx.getVarName("ABL", 21)} LV4가 되었다`);
  } else if (UP[9] > 1000 && ctx.abilities[21] < 5 && ctx.abilities[11] >= 5) {
    ctx.abilities[21] = 5;
    ctx.showMessage(`${ctx.getVarName("ABL", 21)} LV5가 되었다`);
  }
  if (ctx.exp[40] > 1 && ctx.abilities[22] < 1 && ctx.abilities[11] >= 1) {
    ctx.abilities[22] = 1;
    ctx.showMessage(`${ctx.getVarName("ABL", 22)} LV1이 되었다`);
  } else if (ctx.exp[40] > 5 && ctx.abilities[22] < 2 && ctx.abilities[11] >= 2) {
    ctx.abilities[22] = 2;
    ctx.showMessage(`${ctx.getVarName("ABL", 22)} LV2가 되었다`);
  } else if (ctx.exp[40] > 20 && ctx.abilities[22] < 3 && ctx.abilities[11] >= 3) {
    ctx.abilities[22] = 3;
    ctx.showMessage(`${ctx.getVarName("ABL", 22)} LV3이 되었다`);
  } else if (ctx.exp[40] > 40 && ctx.abilities[22] < 4 && ctx.abilities[11] >= 4) {
    ctx.abilities[22] = 4;
    ctx.showMessage(`${ctx.getVarName("ABL", 22)} LV4가 되었다`);
  } else if (ctx.exp[40] > 100 && ctx.abilities[22] < 5 && ctx.abilities[11] >= 5) {
    ctx.abilities[22] = 5;
    ctx.showMessage(`${ctx.getVarName("ABL", 22)} LV5가 되었다`);
  }
  if (ctx.exp[41] > 1 && ctx.abilities[23] < 1 && ctx.abilities[11] >= 1) {
    ctx.abilities[23] = 1;
    ctx.showMessage(`${ctx.getVarName("ABL", 23)} LV1이 되었다`);
  } else if (ctx.exp[41] > 5 && ctx.abilities[23] < 2 && ctx.abilities[11] >= 2) {
    ctx.abilities[23] = 2;
    ctx.showMessage(`${ctx.getVarName("ABL", 23)} LV2가 되었다`);
  } else if (ctx.exp[41] > 20 && ctx.abilities[23] < 3 && ctx.abilities[11] >= 3) {
    ctx.abilities[23] = 3;
    ctx.showMessage(`${ctx.getVarName("ABL", 23)} LV3이 되었다`);
  } else if (ctx.exp[41] > 40 && ctx.abilities[23] < 4 && ctx.abilities[11] >= 4) {
    ctx.abilities[23] = 4;
    ctx.showMessage(`${ctx.getVarName("ABL", 23)} LV4가 되었다`);
  } else if (ctx.exp[41] > 100 && ctx.abilities[23] < 5 && ctx.abilities[11] >= 5) {
    ctx.abilities[23] = 5;
    ctx.showMessage(`${ctx.getVarName("ABL", 23)} LV5가 되었다`);
  }
}

export async function ecst_check(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  character.tflags[29] = C + V + A + B;
}

export async function pissing_ecst_check(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character.tflags[29] >= 7 && character.equipment[22] && ctx.talents[57]) {
    ctx.showMessage(`${ctx.getVarName("EXP", 31)} +5`);
    ctx.exp[31] += 5;
    character.equipment[22] = 0;
    ctx.stain[2] |= 32;
    ctx.stain[3] |= 32;
    await soiling_cloth_no1(ctx, character);
  } else if ((character.tflags[29] >= 7 && character.equipment[22]) || (character.tflags[29] >= 5 && character.equipment[22] && ctx.talents[57])) {
    ctx.showMessage(`${ctx.getVarName("EXP", 31)} +4`);
    ctx.exp[31] += 4;
    character.equipment[22] = 0;
    ctx.stain[2] |= 32;
    ctx.stain[3] |= 32;
    await soiling_cloth_no1(ctx, character);
  } else if ((character.tflags[29] >= 7 && ctx.talents[57]) || (character.tflags[29] >= 5 && character.equipment[22]) || (character.tflags[29] >= 3 && character.equipment[22] && ctx.talents[57])) {
    ctx.showMessage(`${ctx.getVarName("EXP", 31)} +3`);
    ctx.exp[31] += 3;
    character.equipment[22] = 0;
    ctx.stain[2] |= 32;
    ctx.stain[3] |= 32;
    await soiling_cloth_no1(ctx, character);
  } else if ((character.tflags[29] >= 5 && ctx.talents[57]) || (character.tflags[29] >= 3 && character.equipment[22]) || (character.tflags[29] >= 1 && character.equipment[22] && ctx.talents[57])) {
    ctx.showMessage(`${ctx.getVarName("EXP", 31)} +2`);
    ctx.exp[31] += 2;
    if (ctx.talents[57] == 0) {
      character.equipment[22] = 0;
    }
    ctx.stain[2] |= 32;
    ctx.stain[3] |= 32;
    await soiling_cloth_no1(ctx, character);
  } else if ((character.tflags[29] >= 3 && ctx.talents[57]) || (character.tflags[29] >= 1 && character.equipment[22])) {
    ctx.showMessage(`${ctx.getVarName("EXP", 31)} +1`);
    ctx.exp[31] += 1;
    ctx.stain[2] |= 32;
    ctx.stain[3] |= 32;
  }
}

export async function master_flag_check(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  character.tflags[29] += character.tflags[10] + character.tflags[11];
  Q = 0;
  if (NOWEX[0] > 0) {
    Q += 1;
  }
  if (NOWEX[1] > 0) {
    Q += 1;
  }
  if (NOWEX[2] > 0) {
    Q += 1;
  }
  if (NOWEX[3] > 0) {
    Q += 1;
  }
  if (character.tflags[10] > 0) {
    Q += 1;
  }
  if (character.tflags[11] > 0) {
    Q += 1;
  }
  character.tflags[30] += character.tflags[29] * Q;
  for (let COUNT = 0; COUNT < 5; COUNT++) {
    if (character.tflags[ctx.count] > 0 && ctx.exp[20] >= EXPLV[3]) {
      character.tflags[30] += character.tflags[ctx.count];
    }
  }
  if (character.tflags[9] > 0 && ctx.exp[20] >= EXPLV[3]) {
    character.tflags[30] += character.tflags[9];
  }
  if (ctx.assiPlay === 0 && character.equipment[90] === 0) {
    R = ctx.abilities[10];
    if (ctx.talents[11]) {
      R -= 1;
    }
    if (ctx.talents[13]) {
      R += 1;
    }
    if (ctx.talents[20]) {
      R -= 1;
    }
    if (ctx.talents[21]) {
      R -= 1;
    }
    if (ctx.talents[22]) {
      R -= 1;
    }
    if (ctx.talents[34]) {
      R -= 1;
    }
    if (ctx.talents[63]) {
      R += 1;
    }
    if (ctx.talents[70]) {
      R += 1;
    }
    if (ctx.talents[71]) {
      R -= 1;
    }
    if (ctx.talents[79] && ctx.getTalent(master, 122) == 0) {
      R -= 1;
    }
    if (ctx.talents[82] && ctx.getTalent(master, 122)) {
      R -= 1;
    }
    if (ctx.talents[85]) {
      R += 2;
    }
    if (ctx.talents[86]) {
      R += 2;
    }
    if (ctx.getTalent(master, 91)) {
      R += 1;
    }
    if (ctx.getTalent(master, 92)) {
      R += 1;
    }
    if (ctx.getTalent(master, 113)) {
      R += 1;
    }
    if (ctx.getTalent(master, 126)) {
      R += 1;
    }
    if (R <= 0) {
      R = 1;
    }
    R += character.tflags[30];
    if (ctx.relation[ctx.master] != 0) {
      R *= ctx.relation[ctx.master];
      R /= 100;
    }
    character.cflags[2] += R;
    if (ctx.item[37]) {
      ctx.showMessage(`호감도 상승: {R/10}.{R%10}％`);
      ctx.showMessage(`호감도 합계: {(CFLAG:2)/10}％`);
    }
  }
  R = 0;
  character.tflags[30] = 0;
}
