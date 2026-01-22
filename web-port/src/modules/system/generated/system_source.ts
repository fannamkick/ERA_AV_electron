/**
 * SYSTEM_SOURCE.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function source_check(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.flags[7] > 0) {
    await kojo_message_com(ctx, character);
  }
  if (ctx.assiPlay === 0 && character.equipment[35] && (character.tflags[0] || character.tflags[1] || character.tflags[2] || character.tflags[4] || character.tflags[5] || character.tflags[7] || character.tflags[8] || character.tflags[9] || character.tflags[18])) {
    ctx.showMessage('콘돔 안에 사정');
    character.equipment[35] = 0;
    character.tflags[0] = 0;
    character.tflags[1] = 0;
    character.tflags[2] = 0;
    character.tflags[4] = 0;
    character.tflags[5] = 0;
    character.tflags[7] = 0;
    character.tflags[8] = 0;
    character.tflags[9] = 0;
    character.tflags[18] = 0;
    character.tflags[900] = 1;
  } else if (ctx.assiPlay && character.equipment[36] && (character.tflags[0] || character.tflags[1] || character.tflags[2] || character.tflags[4] || character.tflags[5] || character.tflags[7] || character.tflags[8] || character.tflags[9] || character.tflags[18])) {
    ctx.showMessage('콘돔 안에 사정');
    character.equipment[36] = 0;
    character.tflags[0] = 0;
    character.tflags[1] = 0;
    character.tflags[2] = 0;
    character.tflags[4] = 0;
    character.tflags[5] = 0;
    character.tflags[7] = 0;
    character.tflags[8] = 0;
    character.tflags[9] = 0;
    character.tflags[18] = 0;
    character.tflags[900] = 1;
  }
  if (character.equipment[36] && character.tflags[6] && ctx.assi > 0) {
    ctx.showMessage(`콘돔 안에 사정(${ctx.getVarName("CALL", ASSI)})`);
    character.equipment[36] = 0;
    character.tflags[6] = 0;
    character.tflags[900] = 1;
  }
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  if (character.equipment[11]) {
    await equip_com11(ctx, character);
  }
  if (character.equipment[13]) {
    await equip_com13(ctx, character);
  }
  if (character.equipment[14]) {
    await equip_com14(ctx, character);
  }
  if (character.equipment[15]) {
    await equip_com15(ctx, character);
  }
  if (character.equipment[16]) {
    await equip_com16(ctx, character);
  }
  if (character.equipment[17]) {
    await equip_com17(ctx, character);
  }
  if (character.equipment[18]) {
    await equip_com18(ctx, character);
  }
  if (character.equipment[19]) {
    await equip_com19(ctx, character);
  }
  if (character.equipment[43]) {
    await equip_com43(ctx, character);
  }
  if (character.equipment[44]) {
    await equip_com44(ctx, character);
  }
  if (character.equipment[45]) {
    await equip_com45(ctx, character);
  }
  if (character.equipment[46]) {
    await equip_com46(ctx, character);
  }
  if (character.equipment[47]) {
    await equip_com47(ctx, character);
  }
  if (character.equipment[49]) {
    await equip_com49(ctx, character);
  }
  if (character.equipment[53]) {
    await equip_com53(ctx, character);
  }
  if (character.equipment[54]) {
    await equip_com54(ctx, character);
  }
  if (character.equipment[57]) {
    await equip_com57(ctx, character);
  }
  if (character.equipment[58]) {
    await equip_com58(ctx, character);
  }
  if (character.equipment[59]) {
    await equip_com59(ctx, character);
  }
  if (character.equipment[89]) {
    await equip_com89(ctx, character);
  }
  if (character.equipment[90]) {
    await equip_com100(ctx, character);
  }
  if (character.equipment[98]) {
    await equip_com108(ctx, character);
  }
  if (character.equipment[55]) {
    await equip_com135(ctx, character);
  }
  if (character.equipment[70]) {
    await equip_com137(ctx, character);
  }
  ctx.showMessage('');
  if (character.equipment[150]) {
    await equip_com150(ctx, character);
  }
  if (character.equipment[151]) {
    await equip_com151(ctx, character);
  }
  if (character.equipment[152]) {
    await equip_com152(ctx, character);
  }
  if (character.equipment[154]) {
    await equip_com154(ctx, character);
  }
  await source_sex_check(ctx, character);
  await player_skill_check(ctx, character);
  await master_skill_check(ctx, character);
  if (character.cflags[42] === 11 && (character.cflags[40] & 64)) {
    ctx.times('SOURCE:6', 0.10);
    if (character.equipment[90] === 0) {
      ctx.times('SOURCE:0', 0.10);
      ctx.times('SOURCE:1', 0.10);
      ctx.times('SOURCE:2', 0.10);
      ctx.times('SOURCE:17', 0.10);
    }
  }
  await incest_sex_check(ctx, character);
  await firstkiss_player_check(ctx, character);
  await firstkiss_target_check(ctx, character);
  await firstkiss_assi_check(ctx, character);
  await lost_virgin_check(ctx, character);
  await lost_analvirgin_check(ctx, character);
  await reject_camera(ctx, character);
  if (ctx.talents[101]) {
    ctx.times('SOURCE:0', 0.50);
  }
  if (ctx.talents[102]) {
    ctx.times('SOURCE:0', 2.00);
  }
  A = character.source[0];
  if (character.tflags[201] === 1) {
    ctx.times('A', 1.00);
  } else if (ctx.params[5] < PALAMLV[1]) {
    ctx.times('A', 0.50);
  } else if (ctx.params[5] < PALAMLV[2]) {
    ctx.times('A', 0.70);
  } else if (ctx.params[5] < PALAMLV[3]) {
    ctx.times('A', 1.00);
  } else if (ctx.params[5] < PALAMLV[4]) {
    ctx.times('A', 1.30);
  } else if (ctx.params[5] >= PALAMLV[4]) {
    ctx.times('A', 1.80);
  }
  B = character.source[0];
  if (ctx.abilities[11] === 0) {
    ctx.times('B', 0.10);
  } else if (ctx.abilities[11] === 1) {
    ctx.times('B', 0.15);
  } else if (ctx.abilities[11] === 2) {
    ctx.times('B', 0.20);
  } else if (ctx.abilities[11] === 3) {
    ctx.times('B', 0.25);
  } else if (ctx.abilities[11] === 4) {
    ctx.times('B', 0.30);
  } else if (ctx.abilities[11] === 5) {
    ctx.times('B', 0.40);
  } else {
    ctx.times('B', 0.50);
  }
  if (ctx.talents[32] || ctx.talents[34] || ctx.talents[71]) {
    C = character.source[0] / 3;
    if (ctx.abilities[11] === 0) {
      ctx.times('C', 1.00);
    } else if (ctx.abilities[11] === 1) {
      ctx.times('C', 0.85);
    } else if (ctx.abilities[11] === 2) {
      ctx.times('C', 0.70);
    } else if (ctx.abilities[11] === 3) {
      ctx.times('C', 0.40);
    } else if (ctx.abilities[11] === 4) {
      ctx.times('C', 0.30);
    } else if (ctx.abilities[11] === 5) {
      ctx.times('C', 0.10);
    } else {
      C = 0;
    }
  } else {
    C = 0;
  }
  if (ctx.talents[74]) {
    ctx.times('A', 1.50);
    ctx.times('B', 1.20);
    ctx.times('C', 0.50);
  }
  if (ctx.talents[230]) {
    ctx.times('A', 2.00);
  }
  UP[0] += A;
  UP[5] += B;
  UP[13] += C;
  if (ctx.talents[103]) {
    ctx.times('SOURCE:1', 0.50);
  }
  if (ctx.talents[104]) {
    ctx.times('SOURCE:1', 2.00);
  }
  A = character.source[1];
  if (character.tflags[201] === 1) {
    ctx.times('A', 1.00);
  } else if (ctx.params[5] < PALAMLV[1]) {
    ctx.times('A', 0.30);
  } else if (ctx.params[5] < PALAMLV[2]) {
    ctx.times('A', 0.50);
  } else if (ctx.params[5] < PALAMLV[3]) {
    ctx.times('A', 1.00);
  } else if (ctx.params[5] < PALAMLV[4]) {
    ctx.times('A', 1.50);
  } else if (ctx.params[5] >= PALAMLV[4]) {
    ctx.times('A', 2.00);
  }
  B = character.source[1];
  if (ctx.abilities[11] === 0) {
    ctx.times('B', 0.10);
  } else if (ctx.abilities[11] === 1) {
    ctx.times('B', 0.15);
  } else if (ctx.abilities[11] === 2) {
    ctx.times('B', 0.20);
  } else if (ctx.abilities[11] === 3) {
    ctx.times('B', 0.25);
  } else if (ctx.abilities[11] === 4) {
    ctx.times('B', 0.30);
  } else if (ctx.abilities[11] === 5) {
    ctx.times('B', 0.40);
  } else {
    ctx.times('B', 0.50);
  }
  if (ctx.talents[32] || ctx.talents[34] || ctx.talents[71]) {
    C = character.source[1] / 3;
    if (ctx.abilities[11] === 0) {
      ctx.times('C', 1.00);
    } else if (ctx.abilities[11] === 1) {
      ctx.times('C', 0.85);
    } else if (ctx.abilities[11] === 2) {
      ctx.times('C', 0.70);
    } else if (ctx.abilities[11] === 3) {
      ctx.times('C', 0.40);
    } else if (ctx.abilities[11] === 4) {
      ctx.times('C', 0.30);
    } else if (ctx.abilities[11] === 5) {
      ctx.times('C', 0.10);
    } else {
      C = 0;
    }
  } else {
    C = 0;
  }
  if (ctx.talents[75]) {
    ctx.times('A', 1.50);
    ctx.times('B', 1.20);
    ctx.times('C', 0.50);
  }
  if (ctx.talents[232]) {
    ctx.times('A', 1.50);
  }
  UP[1] += A;
  UP[4] += B;
  UP[5] += B;
  UP[13] += C;
  if (ctx.talents[105]) {
    ctx.times('SOURCE:2', 0.50);
  }
  if (ctx.talents[106]) {
    ctx.times('SOURCE:2', 2.00);
  }
  A = character.source[2];
  if (character.tflags[201] === 1) {
    ctx.times('A', 1.00);
  } else if (ctx.params[5] < PALAMLV[1]) {
    ctx.times('A', 0.60);
  } else if (ctx.params[5] < PALAMLV[2]) {
    ctx.times('A', 0.80);
  } else if (ctx.params[5] < PALAMLV[3]) {
    ctx.times('A', 1.00);
  } else if (ctx.params[5] < PALAMLV[4]) {
    ctx.times('A', 1.20);
  } else if (ctx.params[5] >= PALAMLV[4]) {
    ctx.times('A', 1.40);
  }
  B = character.source[2];
  if (ctx.abilities[11] === 0) {
    ctx.times('B', 0.05);
  } else if (ctx.abilities[11] === 1) {
    ctx.times('B', 0.10);
  } else if (ctx.abilities[11] === 2) {
    ctx.times('B', 0.40);
  } else if (ctx.abilities[11] === 3) {
    ctx.times('B', 0.80);
  } else if (ctx.abilities[11] === 4) {
    ctx.times('B', 1.20);
  } else if (ctx.abilities[11] === 5) {
    ctx.times('B', 1.80);
  } else {
    ctx.times('B', 2.00);
  }
  if (ctx.talents[32] || ctx.talents[34] || ctx.talents[71]) {
    C = character.source[2] / 3;
    if (ctx.abilities[11] === 0) {
      ctx.times('C', 1.00);
    } else if (ctx.abilities[11] === 1) {
      ctx.times('C', 0.85);
    } else if (ctx.abilities[11] === 2) {
      ctx.times('C', 0.70);
    } else if (ctx.abilities[11] === 3) {
      ctx.times('C', 0.40);
    } else if (ctx.abilities[11] === 4) {
      ctx.times('C', 0.30);
    } else if (ctx.abilities[11] === 5) {
      ctx.times('C', 0.10);
    } else {
      C = 0;
    }
  } else {
    C = 0;
  }
  if (ctx.talents[77]) {
    ctx.times('A', 1.50);
    ctx.times('B', 1.20);
    ctx.times('C', 0.50);
  }
  if (ctx.talents[233]) {
    ctx.times('A', 2.00);
  }
  UP[2] += A;
  UP[5] += B;
  UP[6] += B;
  UP[13] += C;
  if (ctx.talents[107]) {
    ctx.times('SOURCE:17', 0.50);
  }
  if (ctx.talents[108]) {
    ctx.times('SOURCE:17', 2.00);
  }
  if (ctx.talents[253]) {
    ctx.times('SOURCE:17', 2.50);
  } else if (ctx.talents[252]) {
    ctx.times('SOURCE:17', 2.15);
  } else if (ctx.talents[251]) {
    ctx.times('SOURCE:17', 1.80);
  } else if (ctx.talents[116]) {
    ctx.times('SOURCE:17', 1.50);
  } else if (ctx.talents[109]) {
    ctx.times('SOURCE:17', 1.20);
  } else if (ctx.talents[110]) {
    ctx.times('SOURCE:17', 0.90);
  } else if (ctx.talents[114]) {
    ctx.times('SOURCE:17', 0.80);
  }
  A = character.source[17];
  if (character.tflags[201] === 1) {
    ctx.times('A', 1.00);
  } else if (ctx.params[5] < PALAMLV[1]) {
    ctx.times('A', 0.50);
  } else if (ctx.params[5] < PALAMLV[2]) {
    ctx.times('A', 0.70);
  } else if (ctx.params[5] < PALAMLV[3]) {
    ctx.times('A', 1.00);
  } else if (ctx.params[5] < PALAMLV[4]) {
    ctx.times('A', 1.30);
  } else if (ctx.params[5] >= PALAMLV[4]) {
    ctx.times('A', 1.80);
  }
  B = character.source[17];
  if (ctx.abilities[11] === 0) {
    ctx.times('B', 0.10);
  } else if (ctx.abilities[11] === 1) {
    ctx.times('B', 0.15);
  } else if (ctx.abilities[11] === 2) {
    ctx.times('B', 0.20);
  } else if (ctx.abilities[11] === 3) {
    ctx.times('B', 0.25);
  } else if (ctx.abilities[11] === 4) {
    ctx.times('B', 0.30);
  } else if (ctx.abilities[11] === 5) {
    ctx.times('B', 0.40);
  } else {
    ctx.times('B', 0.50);
  }
  if (ctx.talents[32] || ctx.talents[34] || ctx.talents[71]) {
    C = character.source[17] / 3;
    if (ctx.abilities[11] === 0) {
      ctx.times('C', 1.00);
    } else if (ctx.abilities[11] === 1) {
      ctx.times('C', 0.85);
    } else if (ctx.abilities[11] === 2) {
      ctx.times('C', 0.70);
    } else if (ctx.abilities[11] === 3) {
      ctx.times('C', 0.40);
    } else if (ctx.abilities[11] === 4) {
      ctx.times('C', 0.30);
    } else if (ctx.abilities[11] === 5) {
      ctx.times('C', 0.10);
    } else {
      C = 0;
    }
  } else {
    C = 0;
  }
  if (ctx.talents[78]) {
    ctx.times('A', 1.50);
    ctx.times('B', 1.20);
    ctx.times('C', 0.50);
  }
  if (ctx.talents[231]) {
    ctx.times('A', 2.00);
  }
  UP[14] += A;
  UP[5] += B;
  UP[13] += C;
  if (SELECTCOM === PREVCOM && character.tflags[201] != 1) {
    UP[0] /= 2;
    UP[1] /= 2;
    UP[2] /= 2;
    UP[14] /= 2;
  }
  if (ctx.base[1] <= 0 && character.tflags[201] != 1) {
    UP[0] /= 2;
    UP[1] /= 2;
    UP[2] /= 2;
    UP[14] /= 2;
  }
  R = ctx.player.no;
  if (ctx.relation[R] != 0 && character.tflags[201] != 1) {
    UP[0] *= ctx.relation[R];
    UP[0] /= 100;
    UP[1] *= ctx.relation[R];
    UP[1] /= 100;
    UP[2] *= ctx.relation[R];
    UP[2] /= 100;
    UP[14] *= ctx.relation[R];
    UP[14] /= 100;
  }
  await up_talent_cva_check(ctx, character);
  A = UP[0] + UP[1] + UP[2] + UP[14];
  if (A > 100 && ctx.talents[122] === 0) {
    if (ctx.talents[42]) {
      ctx.times('A', 3.00);
    }
    if (ctx.talents[43]) {
      ctx.times('A', 0.40);
    }
    if (ctx.talents[170]) {
      ctx.times('A', 0.10);
    }
    character.source[10] += A / 5;
  }
  C = 0;
  V = 0;
  A = 0;
  B = 0;
  M = 0;
  if (UP[0] + ctx.params[0] >= PALAMLV[4] * 32) {
    C = 9;
    if (ctx.talents[520]) {
      M += 9;
    }
    DOWN[0] = (PALAMLV[4] * 32 - 1000);
    ctx.showMessage('최강절정C');
  } else if (UP[0] + ctx.params[0] >= PALAMLV[4] * 8) {
    C = 4;
    if (ctx.talents[520]) {
      M += 4;
    }
    DOWN[0] = (PALAMLV[4] * 8 - 1000);
    ctx.showMessage('초절정C');
  } else if (UP[0] + ctx.params[0] >= PALAMLV[4] * 2) {
    C = 2;
    if (ctx.talents[520]) {
      M += 2;
    }
    DOWN[0] = (PALAMLV[4] * 2 - 1000);
    ctx.showMessage('강절정C');
  } else if (UP[0] + ctx.params[0] >= PALAMLV[4]) {
    C = 1;
    if (ctx.talents[520]) {
      M += 1;
    }
    DOWN[0] = (PALAMLV[4] - 1000);
    ctx.showMessage('절정C');
  }
  if (UP[0] + ctx.params[0] - DOWN[0] >= PALAMLV[4]) {
    DOWN[0] = UP[0] + ctx.params[0] - PALAMLV[4] + 1;
  }
  if (UP[1] + ctx.params[1] >= PALAMLV[4] * 32) {
    V = 9;
    if (ctx.talents[520]) {
      M += 9;
    }
    DOWN[1] = (PALAMLV[4] * 32 - 1000);
    ctx.showMessage('최강절정V');
  } else if (UP[1] + ctx.params[1] >= PALAMLV[4] * 8) {
    V = 4;
    if (ctx.talents[520]) {
      M += 4;
    }
    DOWN[1] = (PALAMLV[4] * 8 - 1000);
    ctx.showMessage('초절정V');
  } else if (UP[1] + ctx.params[1] >= PALAMLV[4] * 2) {
    V = 2;
    if (ctx.talents[520]) {
      M += 2;
    }
    DOWN[1] = (PALAMLV[4] * 2 - 1000);
    ctx.showMessage('강절정V');
  } else if (UP[1] + ctx.params[1] >= PALAMLV[4]) {
    V = 1;
    if (ctx.talents[520]) {
      M += 1;
    }
    DOWN[1] = (PALAMLV[4] - 1000);
    ctx.showMessage('절정V');
  }
  if (UP[1] + ctx.params[1] - DOWN[1] >= PALAMLV[4]) {
    DOWN[1] = UP[1] + ctx.params[1] - PALAMLV[4] + 1;
  }
  if (UP[2] + ctx.params[2] >= PALAMLV[4] * 32) {
    A = 9;
    if (ctx.talents[520]) {
      M += 9;
    }
    DOWN[2] = (PALAMLV[4] * 32 - 1000);
    ctx.showMessage('최강절정A');
  } else if (UP[2] + ctx.params[2] >= PALAMLV[4] * 8) {
    A = 4;
    if (ctx.talents[520]) {
      M += 4;
    }
    DOWN[2] = (PALAMLV[4] * 8 - 1000);
    ctx.showMessage('초절정A');
  } else if (UP[2] + ctx.params[2] >= PALAMLV[4] * 2) {
    A = 2;
    if (ctx.talents[520]) {
      M += 2;
    }
    DOWN[2] = (PALAMLV[4] * 2 - 1000);
    ctx.showMessage('강절정A');
  } else if (UP[2] + ctx.params[2] >= PALAMLV[4]) {
    A = 1;
    if (ctx.talents[520]) {
      M += 1;
    }
    DOWN[2] = (PALAMLV[4] - 1000);
    ctx.showMessage('절정A');
  }
  if (UP[2] + ctx.params[2] - DOWN[2] >= PALAMLV[4]) {
    DOWN[2] = UP[2] + ctx.params[2] - PALAMLV[4] + 1;
  }
  if (UP[14] + ctx.params[14] >= PALAMLV[4] * 32) {
    B = 9;
    if (ctx.talents[520]) {
      M += 9;
    }
    DOWN[14] = (PALAMLV[4] * 32 - 1000);
    ctx.showMessage('최강절정B');
  } else if (UP[14] + ctx.params[14] >= PALAMLV[4] * 8) {
    B = 4;
    if (ctx.talents[520]) {
      M += 4;
    }
    DOWN[14] = (PALAMLV[4] * 8 - 1000);
    ctx.showMessage('초절정B');
  } else if (UP[14] + ctx.params[14] >= PALAMLV[4] * 2) {
    B = 2;
    if (ctx.talents[520]) {
      M += 2;
    }
    DOWN[14] = (PALAMLV[4] * 2 - 1000);
    ctx.showMessage('강절정B');
  } else if (UP[14] + ctx.params[14] >= PALAMLV[4]) {
    B = 1;
    if (ctx.talents[520]) {
      M += 1;
    }
    DOWN[14] = (PALAMLV[4] - 1000);
    ctx.showMessage('절정B');
  }
  if (UP[14] + ctx.params[14] - DOWN[14] >= PALAMLV[4]) {
    DOWN[14] = UP[14] + ctx.params[14] - PALAMLV[4] + 1;
  }
  await ecst_check(ctx, character);
  await seiin_start(ctx, character);
  if (C && V && A && B) {
    ctx.showMessage('사 중 절 정');
    ctx.showMessage('(각각 8배의 구슬을 얻을 수 있습니다)');
    C *= 8;
    V *= 8;
    A *= 8;
    B *= 8;
    if (ctx.talents[520]) {
      M *= 8;
    }
  } else if (C && V && A) {
    ctx.showMessage('C＆V＆A절정');
    ctx.showMessage('(각각 4배의 구슬을 얻을 수 있습니다)');
    C *= 4;
    V *= 4;
    A *= 4;
    if (ctx.talents[520]) {
      M *= 4;
    }
  } else if (B && V && A) {
    ctx.showMessage('B＆V＆A절정');
    ctx.showMessage('(각각 4배의 구슬을 얻을 수 있습니다)');
    B *= 4;
    V *= 4;
    A *= 4;
    if (ctx.talents[520]) {
      M *= 4;
    }
  } else if (C && B && A) {
    ctx.showMessage('C＆B＆A절정');
    ctx.showMessage('(각각 4배의 구슬을 얻을 수 있습니다)');
    C *= 4;
    B *= 4;
    A *= 4;
    if (ctx.talents[520]) {
      M *= 4;
    }
    if (DAY < 0) {
      character.cflags[ctx.master][97] += 8;
    }
  } else if (C && V && B) {
    ctx.showMessage('C＆V＆B절정');
    ctx.showMessage('(각각 4배의 구슬을 얻을 수 있습니다)');
    C *= 4;
    V *= 4;
    B *= 4;
    if (ctx.talents[520]) {
      M *= 4;
    }
    if (DAY < 0) {
      character.cflags[ctx.master][97] += 8;
    }
  } else if (C && V) {
    ctx.showMessage('C＆V절정');
    ctx.showMessage('(각각 2배의 구슬을 얻을 수 있습니다)');
    C *= 2;
    V *= 2;
    if (ctx.talents[520]) {
      M *= 2;
    }
  } else if (C && A) {
    ctx.showMessage('C＆A절정');
    ctx.showMessage('(각각 2배의 구슬을 얻을 수 있습니다)');
    C *= 2;
    A *= 2;
    if (ctx.talents[520]) {
      M *= 2;
    }
  } else if (V && A) {
    ctx.showMessage('V＆A절정');
    ctx.showMessage('(각각 2배의 구슬을 얻을 수 있습니다)');
    V *= 2;
    A *= 2;
    if (ctx.talents[520]) {
      M *= 2;
    }
  } else if (C && B) {
    ctx.showMessage('C＆B절정');
    ctx.showMessage('(각각 2배의 구슬을 얻을 수 있습니다)');
    C *= 2;
    B *= 2;
    if (ctx.talents[520]) {
      M *= 2;
    }
  } else if (V && B) {
    ctx.showMessage('V＆B절정');
    ctx.showMessage('(각각 2배의 구슬을 얻을 수 있습니다)');
    V *= 2;
    B *= 2;
    if (ctx.talents[520]) {
      M *= 2;
    }
  } else if (A && B) {
    ctx.showMessage('A＆B절정');
    ctx.showMessage('(각각 2배의 구슬을 얻을 수 있습니다)');
    A *= 2;
    B *= 2;
    if (ctx.talents[520]) {
      M *= 2;
    }
  }
  if (C) {
    character.source[12] += 500 * C;
    character.source[13] += 200 * C;
    if (ctx.talents[230]) {
      LOSEctx.base[0] += 10;
      LOSEctx.base[1] += 5;
    } else {
      LOSEctx.base[0] += 20;
      LOSEctx.base[1] += 10;
    }
    if (C === 2) {
      if (character.tflags[200] < 1) {
        character.tflags[200] = 1;
      }
    }
  }
  if (V) {
    character.source[12] += 700 * V;
    character.source[13] += 400 * V;
    character.source[11] += 800 * V;
    character.source[16] += 500 * V;
    if (ctx.talents[232]) {
      LOSEctx.base[0] += 20;
      LOSEctx.base[1] += 10;
    } else {
      LOSEctx.base[0] += 40;
      LOSEctx.base[1] += 20;
    }
    if (V === 1) {
      if (character.tflags[200] < 1) {
        character.tflags[200] = 1;
      }
    } else if (V === 2) {
      if (character.tflags[200] < 2) {
        character.tflags[200] = 2;
      }
    }
  }
  if (A) {
    character.source[12] += 1200 * A;
    character.source[13] += 4500 * A;
    character.source[11] += 3500 * A;
    character.source[16] += 1500 * A;
    if (ctx.talents[233]) {
      LOSEctx.base[0] += 30;
      LOSEctx.base[1] += 15;
    } else {
      LOSEctx.base[0] += 60;
      LOSEctx.base[1] += 30;
    }
    if (character.tflags[200] < 3) {
      character.tflags[200] = 3;
    }
  }
  if (B) {
    character.source[12] += 500 * B;
    character.source[13] += 200 * B;
    if (ctx.talents[231]) {
      LOSEctx.base[0] += 10;
      LOSEctx.base[1] += 5;
    } else {
      LOSEctx.base[0] += 20;
      LOSEctx.base[1] += 10;
    }
    if (B === 2) {
      if (character.tflags[200] < 1) {
        character.tflags[200] = 1;
      }
    }
  }
  L = 0;
  if (C || B) {
    L = 1;
  }
  if (V) {
    L = 2;
  }
  if (A || (C && B && V) || (C + B + V + A) >= 20) {
    L = 3;
  }
  if ((C && B && V && A) || (C + B + V + A) >= 36) {
    L = 4;
  }
  if ((C + B + V + A) >= 72) {
    L = 5;
  }
  if ((C + B + V + A) >= 288) {
    L = 10;
  }
  if (ctx.talents[20] || ctx.talents[27]) {
    L -= 1;
  }
  if (ctx.abilities[11] < L) {
    ctx.abilities[11] = L;
    ctx.showMessage(`그리고 ${ctx.josaHelper(ctx.getVarName("ABLNAME", 11), "가")} LV%조사처리(L,"가")% 되었다`);
    if (L >= 3) {
      await yokubo_up_check(ctx, character);
    }
  }
  NOWEX[0] = C;
  NOWEX[1] = V;
  NOWEX[2] = A;
  NOWEX[3] = B;
  EX[0] += C;
  EX[1] += V;
  EX[2] += A;
  EX[3] += B;
  ctx.exp[2] += C + V + A + B;
  if (ctx.talents[520]) {
    EX[10] += M;
  }
  await target_ejac_check(ctx, character);
  await target_milk_check(ctx, character);
  await master_flag_check(ctx, character);
  if (ctx.flags[38] > 0) {
    await check_iws(ctx, character);
  }
  A = character.source[3];
  B = character.source[3];
  if (ctx.abilities[10] === 0) {
    ctx.times('A', 0.10);
  } else if (ctx.abilities[10] === 1) {
    ctx.times('A', 0.25);
  } else if (ctx.abilities[10] === 2) {
    ctx.times('A', 0.40);
  } else if (ctx.abilities[10] === 3) {
    ctx.times('A', 0.60);
  } else if (ctx.abilities[10] === 4) {
    ctx.times('A', 0.80);
  } else if (ctx.abilities[10] === 5) {
    ctx.times('A', 1.00);
  } else {
    ctx.times('A', 1.20);
  }
  if (ctx.abilities[16] === 0) {
    ctx.times('A', 0.95);
  } else if (ctx.abilities[16] === 1) {
    ctx.times('A', 1.00);
  } else if (ctx.abilities[16] === 2) {
    ctx.times('A', 1.05);
  } else if (ctx.abilities[16] === 3) {
    ctx.times('A', 1.10);
  } else if (ctx.abilities[16] === 4) {
    ctx.times('A', 1.00);
  } else if (ctx.abilities[16] === 5) {
    ctx.times('A', 1.10);
  } else {
    ctx.times('A', 1.20);
  }
  if (ctx.abilities[11] === 0) {
    ctx.times('B', 0.00);
  } else if (ctx.abilities[11] === 1) {
    ctx.times('B', 0.05);
  } else if (ctx.abilities[11] === 2) {
    ctx.times('B', 0.10);
  } else if (ctx.abilities[11] === 3) {
    ctx.times('B', 0.20);
  } else if (ctx.abilities[11] === 4) {
    ctx.times('B', 0.30);
  } else if (ctx.abilities[11] === 5) {
    ctx.times('B', 0.40);
  } else {
    ctx.times('B', 0.50);
  }
  UP[4] += A;
  UP[5] += B;
  A = character.source[4];
  if (ctx.abilities[16] === 0) {
    ctx.times('A', 0.60);
  } else if (ctx.abilities[16] === 1) {
    ctx.times('A', 0.80);
  } else if (ctx.abilities[16] === 2) {
    ctx.times('A', 1.00);
  } else if (ctx.abilities[16] === 3) {
    ctx.times('A', 1.20);
  } else if (ctx.abilities[16] === 4) {
    ctx.times('A', 1.40);
  } else if (ctx.abilities[16] === 5) {
    ctx.times('A', 1.70);
  } else {
    ctx.times('A', 2.00);
  }
  if (ctx.abilities[13] === 0) {
    ctx.times('A', 0.95);
  } else if (ctx.abilities[13] === 1) {
    ctx.times('A', 1.00);
  } else if (ctx.abilities[13] === 2) {
    ctx.times('A', 1.05);
  } else if (ctx.abilities[13] === 3) {
    ctx.times('A', 1.10);
  } else if (ctx.abilities[13] === 4) {
    ctx.times('A', 1.00);
  } else if (ctx.abilities[13] === 5) {
    ctx.times('A', 1.10);
  } else {
    ctx.times('A', 1.20);
  }
  if (ctx.getTalent(player, 201)) {
    ctx.times('A', 1.20);
  }
  if (ctx.talents[32] || ctx.talents[34]) {
    B = character.source[4] / 5;
    if (ctx.abilities[16] === 0) {
      ctx.times('B', 1.80);
    } else if (ctx.abilities[16] === 1) {
      ctx.times('B', 1.30);
    } else if (ctx.abilities[16] === 2) {
      ctx.times('B', 0.90);
    } else if (ctx.abilities[16] === 3) {
      ctx.times('B', 0.70);
    } else if (ctx.abilities[16] === 4) {
      ctx.times('B', 0.50);
    } else if (ctx.abilities[16] === 5) {
      ctx.times('B', 0.30);
    } else {
      ctx.times('B', 0.10);
    }
  } else {
    B = 0;
  }
  UP[7] += A;
  UP[13] += B;
  A = character.source[5];
  if (ctx.abilities[10] === 0) {
    ctx.times('A', 0.50);
  } else if (ctx.abilities[10] === 1) {
    ctx.times('A', 0.80);
  } else if (ctx.abilities[10] === 2) {
    ctx.times('A', 1.00);
  } else if (ctx.abilities[10] === 3) {
    ctx.times('A', 1.20);
  } else if (ctx.abilities[10] === 4) {
    ctx.times('A', 1.40);
  } else if (ctx.abilities[10] === 5) {
    ctx.times('A', 1.60);
  } else if (ctx.abilities[10] === 6) {
    ctx.times('A', 1.80);
  } else {
    ctx.times('A', 2.00);
  }
  if (ctx.abilities[16] === 0) {
    ctx.times('A', 0.00);
  } else if (ctx.abilities[16] === 1) {
    ctx.times('A', 0.40);
  } else if (ctx.abilities[16] === 2) {
    ctx.times('A', 0.80);
  } else if (ctx.abilities[16] === 3) {
    ctx.times('A', 1.20);
  } else if (ctx.abilities[16] === 4) {
    ctx.times('A', 1.60);
  } else if (ctx.abilities[16] === 5) {
    ctx.times('A', 2.00);
  } else {
    ctx.times('A', 2.40);
  }
  if (ctx.abilities[13] === 0) {
    ctx.times('A', 0.95);
  } else if (ctx.abilities[13] === 1) {
    ctx.times('A', 1.00);
  } else if (ctx.abilities[13] === 2) {
    ctx.times('A', 1.05);
  } else if (ctx.abilities[13] === 3) {
    ctx.times('A', 1.10);
  } else if (ctx.abilities[13] === 4) {
    ctx.times('A', 1.00);
  } else if (ctx.abilities[13] === 5) {
    ctx.times('A', 1.10);
  } else {
    ctx.times('A', 1.20);
  }
  UP[4] += A;
  A = character.source[6];
  B = character.source[6];
  C = character.source[6];
  D = character.source[6];
  if (ctx.abilities[10] === 0) {
    ctx.times('B', 0.80);
    ctx.times('C', 0.80);
  } else if (ctx.abilities[10] === 1) {
    ctx.times('B', 0.70);
    ctx.times('C', 0.60);
  } else if (ctx.abilities[10] === 2) {
    ctx.times('B', 0.55);
    ctx.times('C', 0.50);
  } else if (ctx.abilities[10] === 3) {
    ctx.times('B', 0.45);
    ctx.times('C', 0.40);
  } else if (ctx.abilities[10] === 4) {
    ctx.times('B', 0.35);
    ctx.times('C', 0.20);
  } else if (ctx.abilities[10] === 5) {
    ctx.times('B', 0.25);
    ctx.times('C', 0.05);
  } else {
    ctx.times('B', 0.15);
    ctx.times('C', 0.00);
  }
  if (ctx.abilities[21] === 0) {
    ctx.times('C', 1.00);
    ctx.times('D', 0.00);
  } else if (ctx.abilities[21] === 1) {
    ctx.times('C', 0.80);
    ctx.times('D', 0.10);
  } else if (ctx.abilities[21] === 2) {
    ctx.times('C', 0.50);
    ctx.times('D', 0.20);
  } else if (ctx.abilities[21] === 3) {
    ctx.times('C', 0.30);
    ctx.times('D', 0.30);
  } else if (ctx.abilities[21] === 4) {
    ctx.times('C', 0.10);
    ctx.times('D', 0.45);
  } else if (ctx.abilities[21] === 5) {
    ctx.times('C', 0.05);
    ctx.times('D', 0.60);
  } else {
    ctx.times('C', 0.00);
    ctx.times('D', 0.75);
  }
  if (ctx.abilities[ctx.player][20] === 0) {
    ctx.times('D', 1.00);
  } else if (ctx.abilities[ctx.player][20] === 1) {
    ctx.times('D', 1.10);
  } else if (ctx.abilities[ctx.player][20] === 2) {
    ctx.times('D', 1.20);
  } else if (ctx.abilities[ctx.player][20] === 3) {
    ctx.times('D', 1.30);
  } else if (ctx.abilities[ctx.player][20] === 4) {
    ctx.times('D', 1.40);
  } else if (ctx.abilities[ctx.player][20] === 5) {
    ctx.times('D', 1.50);
  } else {
    ctx.times('D', 1.60);
  }
  if (ctx.talents[88]) {
    ctx.times('D', 2.00);
  }
  if (ctx.getTalent(player, 83)) {
    ctx.times('D', 2.00);
  }
  if (ctx.talents[40]) {
    ctx.times('A', 1.50);
    ctx.times('D', 4.00);
  } else if (ctx.talents[41]) {
    ctx.times('A', 0.80);
    ctx.times('D', 0.80);
  }
  if (ctx.talents[312]) {
    ctx.times('A', 0.50);
    ctx.times('B', 0.50);
    ctx.times('D', 0.50);
  }
  if (ctx.assiPlay) {
    ctx.times('C', 0.40);
  }
  UP[9] += A;
  UP[10] += B;
  UP[11] += C;
  UP[5] += D;
  A = character.source[7];
  B = character.source[7];
  if (ctx.abilities[11] === 0) {
    ctx.times('A', 0.10);
    ctx.times('B', 0.20);
  } else if (ctx.abilities[11] === 1) {
    ctx.times('A', 0.15);
    ctx.times('B', 0.30);
  } else if (ctx.abilities[11] === 2) {
    ctx.times('A', 0.20);
    ctx.times('B', 0.40);
  } else if (ctx.abilities[11] === 3) {
    ctx.times('A', 0.25);
    ctx.times('B', 0.50);
  } else if (ctx.abilities[11] === 4) {
    ctx.times('A', 0.30);
    ctx.times('B', 0.60);
  } else if (ctx.abilities[11] === 5) {
    ctx.times('A', 0.35);
    ctx.times('B', 0.70);
  } else if (ctx.abilities[11] === 6) {
    ctx.times('A', 0.40);
    ctx.times('B', 0.80);
  } else if (ctx.abilities[11] === 7) {
    ctx.times('A', 0.45);
    ctx.times('B', 0.90);
  } else {
    ctx.times('A', 0.50);
    ctx.times('B', 1.00);
  }
  UP[4] += A;
  UP[5] += B;
  A = character.source[8];
  B = character.source[8];
  if (ctx.abilities[10] === 0) {
    ctx.times('A', 0.60);
    ctx.times('B', 1.00);
  } else if (ctx.abilities[10] === 1) {
    ctx.times('A', 0.40);
    ctx.times('B', 0.80);
  } else if (ctx.abilities[10] === 2) {
    ctx.times('A', 0.25);
    ctx.times('B', 0.60);
  } else if (ctx.abilities[10] === 3) {
    ctx.times('A', 0.10);
    ctx.times('B', 0.30);
  } else if (ctx.abilities[10] === 4) {
    ctx.times('A', 0.00);
    ctx.times('B', 0.10);
  } else {
    ctx.times('A', 0.00);
    ctx.times('B', 0.00);
  }
  UP[11] += A;
  UP[12] += B;
  A = character.source[9];
  UP[3] += A;
  A = character.source[10];
  UP[3] += A;
  A = character.source[11];
  UP[5] += A;
  if (ctx.talents[35]) {
    ctx.times('SOURCE:12', 2.00);
  }
  if (ctx.talents[36]) {
    ctx.times('SOURCE:12', 0.50);
  }
  character.source[12] += (UP[3]-character.source[9]) / 2;
  A = character.source[12];
  B = character.source[12];
  C = character.source[12];
  if (ctx.abilities[17] === 0) {
    ctx.times('A', 0.00);
    ctx.times('C', 1.00);
  } else if (ctx.abilities[17] === 1) {
    ctx.times('A', 0.10);
    ctx.times('C', 0.90);
  } else if (ctx.abilities[17] === 2) {
    ctx.times('A', 0.20);
    ctx.times('C', 0.70);
  } else if (ctx.abilities[17] === 3) {
    ctx.times('A', 0.40);
    ctx.times('C', 0.50);
  } else if (ctx.abilities[17] === 4) {
    ctx.times('A', 0.60);
    ctx.times('C', 0.30);
  } else if (ctx.abilities[17] === 5) {
    ctx.times('A', 0.80);
    ctx.times('C', 0.10);
  } else {
    ctx.times('A', 1.00);
    ctx.times('C', 0.00);
  }
  if (ctx.params[8] < PALAMLV[1]) {
    ctx.times('B', 1.00);
  } else if (ctx.params[8] < PALAMLV[2]) {
    ctx.times('B', 0.90);
  } else if (ctx.params[8] < PALAMLV[3]) {
    ctx.times('B', 0.70);
  } else if (ctx.params[8] < PALAMLV[4]) {
    ctx.times('B', 0.50);
  } else if (ctx.params[8] >= PALAMLV[4]) {
    ctx.times('B', 0.30);
  }
  if (ctx.abilities[10] === 0) {
    ctx.times('C', 0.50);
  } else if (ctx.abilities[10] === 1) {
    ctx.times('C', 0.30);
  } else if (ctx.abilities[10] === 2) {
    ctx.times('C', 0.15);
  } else if (ctx.abilities[10] === 3) {
    ctx.times('C', 0.05);
  } else {
    ctx.times('C', 0.00);
  }
  UP[5] += A;
  UP[8] += B;
  UP[11] += C;
  A = character.source[13];
  B = character.source[13];
  if (ctx.abilities[10] === 0) {
    ctx.times('A', 0.12);
    ctx.times('B', 0.50);
  } else if (ctx.abilities[10] === 1) {
    ctx.times('A', 0.10);
    ctx.times('B', 0.80);
  } else if (ctx.abilities[10] === 2) {
    ctx.times('A', 0.05);
    ctx.times('B', 1.00);
  } else if (ctx.abilities[10] === 3) {
    ctx.times('A', 0.02);
    ctx.times('B', 1.10);
  } else if (ctx.abilities[10] === 4) {
    ctx.times('A', 0.00);
    ctx.times('B', 1.20);
  } else if (ctx.abilities[10] === 5) {
    ctx.times('A', 0.00);
    ctx.times('B', 1.30);
  } else if (ctx.abilities[10] === 6) {
    ctx.times('A', 0.00);
    ctx.times('B', 1.40);
  } else {
    ctx.times('A', 0.00);
    ctx.times('B', 1.50);
  }
  if (ctx.abilities[39] === 0) {
    ctx.times('B', 1.00);
  } else if (ctx.abilities[39] === 1) {
    ctx.times('B', 1.10);
  } else if (ctx.abilities[39] === 2) {
    ctx.times('B', 1.20);
  } else if (ctx.abilities[39] === 3) {
    ctx.times('B', 1.50);
  } else if (ctx.abilities[39] === 4) {
    ctx.times('B', 2.00);
  } else if (ctx.abilities[39] === 5) {
    ctx.times('B', 3.00);
  } else {
    ctx.times('B', 4.00);
  }
  UP[13] += A;
  UP[6] += B;
  if (ctx.talents[23]) {
    ctx.times('SOURCE:14', 0.30);
  }
  if (ctx.talents[24]) {
    ctx.times('SOURCE:14', 3.00);
  }
  A = character.source[14];
  if (ctx.abilities[10] === 0) {
    ctx.times('A', 1.00);
  } else if (ctx.abilities[10] === 1) {
    ctx.times('A', 0.80);
  } else if (ctx.abilities[10] === 2) {
    ctx.times('A', 0.70);
  } else if (ctx.abilities[10] === 3) {
    ctx.times('A', 0.40);
  } else if (ctx.abilities[10] === 4) {
    ctx.times('A', 0.20);
  } else {
    ctx.times('A', 0.00);
  }
  if (ctx.abilities[11] === 0) {
    ctx.times('A', 0.90);
  } else if (ctx.abilities[11] === 1) {
    ctx.times('A', 0.70);
  } else if (ctx.abilities[11] === 2) {
    ctx.times('A', 0.50);
  } else if (ctx.abilities[11] === 3) {
    ctx.times('A', 0.30);
  } else if (ctx.abilities[11] === 4) {
    ctx.times('A', 0.10);
  } else {
    ctx.times('A', 0.00);
  }
  UP[11] += A;
  A = character.source[15];
  UP[11] += A;
  A = character.source[16];
  UP[4] += A;
  await up_talent_check(ctx, character);
  R = ctx.player.no;
  if (ctx.relation[R] != 0) {
    UP[4] *= ctx.relation[R];
    UP[4] /= 100;
    UP[5] *= ctx.relation[R];
    UP[5] /= 100;
    UP[7] *= ctx.relation[R];
    UP[7] /= 100;
    UP[11] *= 100;
    UP[11] /= ctx.relation[R];
    UP[12] *= 100;
    UP[12] /= ctx.relation[R];
    UP[13] *= 100;
    UP[13] /= ctx.relation[R];
  }
  if (SELECTCOM === PREVCOM) {
    UP[4] /= 2;
    UP[5] /= 2;
    UP[6] /= 2;
    UP[7] /= 2;
    UP[8] /= 2;
  }
  character.tflags[59] = PREVCOM;
  ctx.locals[0] = ctx.abilities[11] * 20;
  ctx.locals[1] = LOSEctx.base[0] * 2;
  ctx.locals[3] = ctx.locals[1] - ctx.locals[0];
  if (ctx.locals[3] <= 50) {
    ctx.locals[3] = 50;
  }
  if (ctx.base[1] <= 0) {
    UP[3] /= 2;
    UP[4] /= 2;
    UP[5] /= 2;
    UP[7] /= 2;
    UP[9] /= 2;
    UP[13] /= 2;
    LOSEctx.base[0] += ctx.locals[3];
    LOSEctx.base[0] += 80;
  }
  await passout_check(ctx, character);
  if (character.equipment[54] && character.tflags[899] > 0) {
    await passout_outdoor(ctx, character);
  }
  D = UP[9]/16;
  if (ctx.abilities[21] === 0) {
    ctx.times('D', 1.00);
  } else if (ctx.abilities[21] === 1) {
    ctx.times('D', 0.95);
  } else if (ctx.abilities[21] === 2) {
    ctx.times('D', 0.90);
  } else if (ctx.abilities[21] === 3) {
    ctx.times('D', 0.80);
  } else if (ctx.abilities[21] === 4) {
    ctx.times('D', 0.65);
  } else {
    ctx.times('D', 0.50);
  }
  if (ctx.talents[40]) {
    ctx.times('D', 1.20);
  }
  if (ctx.talents[41]) {
    ctx.times('D', 0.80);
  }
  LOSEctx.base[0] += D;
  LOSEctx.base[1] += D;
  if (character.equipment[90]) {
    if (ctx.abilities[41] === 0) {
      ctx.times('LOSEBASE:0', 1.00);
      ctx.times('LOSEBASE:1', 1.00);
    } else if (ctx.abilities[41] === 1) {
      ctx.times('LOSEBASE:0', 1.00);
      ctx.times('LOSEBASE:1', 0.95);
    } else if (ctx.abilities[41] === 2) {
      ctx.times('LOSEBASE:0', 0.95);
      ctx.times('LOSEBASE:1', 0.95);
    } else if (ctx.abilities[41] === 3) {
      ctx.times('LOSEBASE:0', 0.95);
      ctx.times('LOSEBASE:1', 0.90);
    } else if (ctx.abilities[41] === 4) {
      ctx.times('LOSEBASE:0', 0.90);
      ctx.times('LOSEBASE:1', 0.90);
    } else if (ctx.abilities[41] === 5) {
      ctx.times('LOSEBASE:0', 0.80);
      ctx.times('LOSEBASE:1', 0.80);
    } else if (ctx.abilities[41] === 6) {
      ctx.times('LOSEBASE:0', 0.75);
      ctx.times('LOSEBASE:1', 0.75);
    } else if (ctx.abilities[41] === 7) {
      ctx.times('LOSEBASE:0', 0.70);
      ctx.times('LOSEBASE:1', 0.70);
    } else if (ctx.abilities[41] === 8) {
      ctx.times('LOSEBASE:0', 0.60);
      ctx.times('LOSEBASE:1', 0.60);
    } else if (ctx.abilities[41] === 9) {
      ctx.times('LOSEBASE:0', 0.50);
      ctx.times('LOSEBASE:1', 0.50);
    } else if (ctx.abilities[41] >= 10) {
      ctx.times('LOSEBASE:0', 0.40);
      ctx.times('LOSEBASE:1', 0.40);
    }
  }
  ctx.base[0] -= LOSEctx.base[0];
  ctx.base[1] -= LOSEctx.base[1];
  if (ctx.base[1] <= 0) {
    ctx.varSet(ctx.locals[0], 0);
    if (character.tflags[800] === 0 && ctx.talents[550] === 1) {
      ctx.locals[0] = MAXctx.base[1];
      ctx.locals[0] /= 2;
      ctx.showMessage('');
      ctx.showMessage(`피로한 기색이 짙어보이는 ${ctx.getVarName("CALL", TARGET)}에게 이 쯤에서 지도를 그만둘지 어떨지 물었지만,`);
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 분발해 지도를 속행할 것을 요청해왔다…`);
      ctx.showMessage(`W 《${ctx.getVarName("CALL", TARGET)}의 기력이 ${ctx.locals[0]} 회복되었다》`);
      ctx.base[1] = ctx.locals[0];
      character.tflags[800] = 1;
    }
  }
  character.tflags[60] = 0;
  if (SELECTCOM === 20 || SELECTCOM === 21 || SELECTCOM === 22 || SELECTCOM === 23 || SELECTCOM === 26 || SELECTCOM === 27 || SELECTCOM === 28 || SELECTCOM === 29 || SELECTCOM === 34 || SELECTCOM === 36 || SELECTCOM === 56 || SELECTCOM === 120 || SELECTCOM === 121 || SELECTCOM === 128 || SELECTCOM === 129 || SELECTCOM === 130 || SELECTCOM === 131 || SELECTCOM === 132 || SELECTCOM === 133 || SELECTCOM === 134) {
    if (character.tflags[2] == 0 || ctx.params[5] >= PALAMLV[4]) {
      character.tflags[60] = 1;
    }
  }
  if (character.equipment[37] && character.tflags[10]) {
    ctx.showMessage(`콘돔 안에 사정(${ctx.getVarName("CALL", TARGET)})`);
    character.equipment[37] = 0;
    character.tflags[10] = 0;
  }
  if (character.tflags[19]) {
    if (character.equipment[89] && character.tflags[16]) {
      character.cflags[character][106] += character.tflags[16];
    } else if (ctx.assiPlay && character.tflags[2]) {
      character.cflags[character][103] += character.tflags[2];
    } else if (character.tflags[2]) {
      character.cflags[character][101] += character.tflags[2];
    }
  } else if (SELECTCOM === 65 && ctx.assi >= 1 && character.tflags[10]) {
    character.cflags[character][104] += character.tflags[10];
  }
  await train_message_a(ctx, character);
  if (character.tflags[899] < 1) {
    await passout_text(ctx, character);
  } else if (character.tflags[899] >= 1) {
    await passout_text(ctx, character);
    if (character.tflags[896] == 2 || character.tflags[897] == 2 || character.tflags[898] == 2) {
      await passout_palam_check(ctx, character);
    }
    if (character.tflags[896] === 3 || character.tflags[897] === 3 || character.tflags[898] === 3) {
      await passout_palam_up(ctx, character);
      await mark_got_check(ctx, character);
      if (ctx.flags[7] > 0) {
        await kojo_message_markcng(ctx, character);
      }
    }
  }
  await pissing_ecst_check(ctx, character);
  if (ctx.flags[7] > 0) {
    await kojo_message_palamcng(ctx, character);
  }
  await mark_got_check(ctx, character);
  if (ctx.flags[7] > 0) {
    await kojo_message_markcng(ctx, character);
  }
  await exp_got_check(ctx, character);
  await sokuochi_check(ctx, character);
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥'); ctx.waitInput();
  await show_source(ctx, character);
  R = ctx.player.no;
  if (ctx.relation[R] != 0) {
    if (ctx.relation[R]%100 > 9) {
      ctx.showMessage(`＜상성 ${ctx.relation[R]/100}.${ctx.relation[R]%100}배＞`);
    } else {
      ctx.showMessage(`＜상성 ${ctx.relation[R]/100}.0${ctx.relation[R]%100}배＞`);
    }
  }
  if (SELECTCOM == PREVCOM) {
    ctx.showMessage('＜동일 커맨드 연속 실행＞');
  }
  PREVCOM = SELECTCOM;
  if (ctx.assiPlay) {
    character.tflags[50] = 1;
  } else {
    character.tflags[50] = 0;
  }
  if (ctx.base[0] > 0 && LOSEctx.base[0] > 0) {
    await loselife_bar(ctx, character);
    ctx.showMessage(`-${LOSEctx.base[0]}`);
    if (ctx.base[0] < 500) {
      ctx.print('★빈사★');
    }
    ctx.showMessage('');
  }
  if (ctx.base[1] > 0 && LOSEctx.base[1] > 0) {
    await losevital_bar(ctx, character);
    ctx.showMessage(` -${LOSEctx.base[1]}`);
  } else if (ctx.base[1] < 1) {
    ctx.showMessage('기력[................................] ★기력0★');
  }
  await palam_up_check(ctx, character);
}

export async function show_source(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character.source[0] > 0) {
    ctx.showMessage(`쾌C(${character.source[0]})`);
  }
  if (character.source[1] > 0) {
    ctx.showMessage(`쾌v(${character.source[1]})`);
  }
  if (character.source[2] > 0) {
    ctx.showMessage(`쾌a(${character.source[2]})`);
  }
  if (character.source[17] > 0) {
    ctx.showMessage(`쾌B(${character.source[17]})`);
  }
  if (character.source[3] > 0) {
    ctx.showMessage(`정애(${character.source[3]})`);
  }
  if (character.source[4] > 0) {
    ctx.showMessage(`성행위(${character.source[4]})`);
  }
  if (character.source[5] > 0) {
    ctx.showMessage(`달성감(${character.source[5]})`);
  }
  if (character.source[6] > 0) {
    ctx.showMessage(`아픔(${character.source[6]})`);
  }
  if (character.source[7] > 0) {
    ctx.showMessage(`중독충족(${character.source[7]})`);
  }
  if (character.source[8] > 0) {
    ctx.showMessage(`불결(${character.source[8]})`);
  }
  if (character.source[10] > 0) {
    ctx.showMessage(`애액분비(${character.source[10]})`);
  }
  if (character.source[9] > 0) {
    ctx.showMessage(`액체추가(${character.source[9]})`);
  }
  if (character.source[11] > 0) {
    ctx.showMessage(`욕정추가(${character.source[11]})`);
  }
  if (character.source[16] > 0) {
    ctx.showMessage(`온순함추가(${character.source[16]})`);
  }
  if (character.source[12] > 0) {
    ctx.showMessage(`노출(${character.source[12]})`);
  }
  if (character.source[13] > 0) {
    ctx.showMessage(`굴종(${character.source[13]})`);
  }
  if (character.source[14] > 0) {
    ctx.showMessage(`일탈(${character.source[14]})`);
  }
  if (character.source[15] > 0) {
    ctx.showMessage(`반감추가(${character.source[15]})`);
  }
  ctx.showMessage('');
}

export async function palam_up_check(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  for (let COUNT = 0; COUNT < 15; COUNT++) {
    if (ctx.count <= 2) {
      C = ctx.count;
    } else if (ctx.count === 3) {
      C = 14;
    } else {
      C = ctx.count - 1;
    }
    if (UP[C] > 0 || DOWN[C] > 0) {
      ctx.showMessage(`${ctx.getVarName("PALAM", C)}`);
      N = ctx.params[C];
      await figure_indent_2(ctx, character);
      ctx.showMessage(`${ctx.params[C]}`);
      if (UP[C] > 0) {
        ctx.showMessage(`+`);
        N = UP[C];
        await figure_indent_2(ctx, character);
        ctx.showMessage(`${UP[C]}`);
      } else {
        ctx.print('');
      }
      if (DOWN[C] > 0) {
        ctx.showMessage(`-`);
        N = DOWN[C];
        await figure_indent_2(ctx, character);
        ctx.showMessage(`${DOWN[C]}`);
      } else {
        ctx.print('');
      }
      ctx.showMessage(`=`);
      N = ctx.params[C] + UP[C] - DOWN[C];
      await figure_indent_2(ctx, character);
      ctx.showMessage(`${ctx.params[C] + UP[C] - DOWN[C]}`);
      ctx.params[C] += UP[C];
      ctx.params[C] -= DOWN[C];
      ctx.showMessage('');
    }
    if (C == 14 && (UP[0] > 0 || UP[1] > 0 || UP[2] > 0 || UP[14] > 0)) {
      ctx.showMessage('-------------------------------');
    }
    if (C == 3 && UP[3] > 0) {
      ctx.showMessage('-------------------------------');
    }
    if (C == 10) {
      ctx.showMessage('-------------------------------');
    }
  }
}

export async function palam_message(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (C === 3) {
    if (ctx.params[C] < PALAMLV[2]) {
      ctx.print('(별로 젖지 않았습니다)');
    } else if (ctx.params[C] < PALAMLV[4]) {
      ctx.print('(적당히 젖어 있습니다)');
    } else {
      ctx.print('(충분히 젖어있습니다)');
    }
  } else if (C === 4) {
    if (ctx.params[C] < PALAMLV[1]) {
      ctx.print('(호의를 갖고 있지 않습니다)');
    } else if (ctx.params[C] < PALAMLV[4]) {
      ctx.print('(호의를 안고 있습니다)');
    } else {
      ctx.print('(신뢰를 갖고 있습니다)');
    }
  } else if (C === 5) {
    if (ctx.params[C] < PALAMLV[1]) {
      ctx.print('(그럴 기분은 아직 되지 않은 것 같습니다)');
    } else if (ctx.params[C] < PALAMLV[4]) {
      ctx.print('(발정하고 있습니다)');
    } else {
      ctx.print('(쾌락의 포로가 되어 있습니다)');
    }
  } else if (C === 6) {
    if (ctx.params[C] < PALAMLV[2]) {
      ctx.print('(아직 굽힐 생각은 없는 것 같습니다)');
    } else if (ctx.params[C] < PALAMLV[4]) {
      ctx.print('(약간 무기력한 상태입니다)');
    } else {
      ctx.print('(마음까지 범해졌습니다)');
    }
  } else if (C === 7) {
    if (ctx.params[C] < PALAMLV[1]) {
      ctx.print('(잘 모르는 것 같습니다)');
    } else if (ctx.params[C] < PALAMLV[4]) {
      ctx.print('(기쁘게 하는 방법을 배우고 있습니다)');
    } else {
      ctx.print('(충분히 패턴을 익힌 것 같습니다)');
    }
  } else if (C === 8) {
    if (ctx.params[C] < PALAMLV[1]) {
      ctx.print('(부끄러움은 느끼고 있지 않습니다)');
    } else if (ctx.params[C] < PALAMLV[3]) {
      ctx.print('(수줍음을 느끼고 있습니다)');
    } else if (ctx.params[C] < PALAMLV[4]) {
      ctx.print('(강한 수치심을 느끼고 있습니다)');
    } else {
      ctx.print('(죽고 싶을 정도 부끄러워하고 있습니다)');
    }
  } else if (C === 9) {
    if (ctx.params[C] < PALAMLV[1]) {
      ctx.print('(아픔은 느끼고 있지 않습니다)');
    } else if (ctx.params[C] < PALAMLV[3]) {
      ctx.print('(조금 아파하고 있습니다)');
    } else if (ctx.params[C] < PALAMLV[4]) {
      ctx.print('(아파서 견딜 수 없는 것 같습니다)');
    } else {
      ctx.print('(정신이 몽롱해질 정도의 아픔입니다)');
    }
  } else if (C === 10) {
    if (ctx.params[C] < PALAMLV[1]) {
      ctx.print('(태연합니다)');
    } else if (ctx.params[C] < PALAMLV[3]) {
      ctx.print('(약간 무서워하고 있습니다)');
    } else if (ctx.params[C] < PALAMLV[4]) {
      ctx.print('(무서워서 견딜 수 없는 것 같습니다)');
    } else {
      ctx.print('(미쳐버릴듯한 공포입니다)');
    }
  } else if (C === 11) {
    if (ctx.params[C] < PALAMLV[1]) {
      ctx.print('(미움 받고는 있지 않습니다)');
    } else if (ctx.params[C] < PALAMLV[2]) {
      ctx.print('(조금 싫어하고 있습니다)');
    } else if (ctx.params[C] < PALAMLV[3]) {
      ctx.print('(미움받고 있습니다)');
    } else if (ctx.params[C] < PALAMLV[4]) {
      ctx.print('(강한 증오를 느낍니다)');
    } else {
      ctx.print('(살의마저 안고 있습니다)');
    }
  } else if (C === 12) {
    if (ctx.params[C] < PALAMLV[1]) {
      ctx.print('(불쾌감은 느끼고 있지 않습니다)');
    } else if (ctx.params[C] < PALAMLV[2]) {
      ctx.print('(좋은 기분은 아닙니다)');
    } else if (ctx.params[C] < PALAMLV[4]) {
      ctx.print('(기분이 나쁜 것 같습니다)');
    } else {
      ctx.print('(불쾌감으로 미칠 것 같은 상태입니다)');
    }
  } else if (C === 13) {
    if (ctx.params[C] < PALAMLV[1]) {
      ctx.print('(낙담하고 있지는 않습니다)');
    } else if (ctx.params[C] < PALAMLV[2]) {
      ctx.print('(조금 기운이 없는 것 같습니다)');
    } else if (ctx.params[C] < PALAMLV[4]) {
      ctx.print('(낙담하고 있습니다)');
    } else {
      ctx.print('(모든 것에 절망하고 있습니다)');
    }
  }
}

export async function figure_indent_2(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (N < 100000) {
    ctx.print('');
  }
  if (N < 10000) {
    ctx.print('');
  }
  if (N < 1000) {
    ctx.print('');
  }
  if (N < 100) {
    ctx.print('');
  }
  if (N < 10) {
    ctx.print('');
  }
  return 1;
}

export async function loselife_bar(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (MAXctx.base[0] <= 0) {
    return 0;
  }
  ctx.print('체력');
  A = (ctx.base[0]*32) / MAXctx.base[0];
  if (ctx.base[0] < 0) {
    A = 0;
  }
  B = (LOSEctx.base[0]*32) / MAXctx.base[0] + 1;
  if (ctx.base[0] < 0) {
    B = 0;
  }
  ctx.print('[');
  if (A > 0) {
    for (let COUNT = 0; COUNT < A; COUNT++) {
      ctx.printChar('=');
    }
  }
  if (B > 0) {
    for (let COUNT = 0; COUNT < B; COUNT++) {
      ctx.printChar('-');
    }
  }
  if (32 - (A+B) > 0) {
    for (let COUNT = 0; COUNT < 32 - (A+B); COUNT++) {
      ctx.print('.');
    }
  }
  ctx.print(']');
}

export async function losevital_bar(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (MAXctx.base[1] <= 0) {
    return 0;
  }
  ctx.print('기력');
  A = (ctx.base[1]*32 + 16) / MAXctx.base[1];
  if (ctx.base[1] < 0) {
    A = 0;
  }
  B = (LOSEctx.base[1]*32 +16) / MAXctx.base[1] + 1;
  if (ctx.base[1] < 0) {
    B = 0;
  }
  ctx.print('[');
  if (A > 0) {
    for (let COUNT = 0; COUNT < A; COUNT++) {
      ctx.printChar('=');
    }
  }
  if (B > 0) {
    for (let COUNT = 0; COUNT < B; COUNT++) {
      ctx.printChar('-');
    }
  }
  if (32 - (A+B) > 0) {
    for (let COUNT = 0; COUNT < 32 - (A+B); COUNT++) {
      ctx.print('.');
    }
  }
  ctx.print(']');
}
