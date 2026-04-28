/**
 * EVENT_AFTERTRAIN.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function charadead_check(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.talents[85] === 1) {
    character.cflags[619] -= ctx.rand(5);
    if (character.cflags[619] <= 0) {
      character.cflags[619] = 0;
    }
  }
  if (ctx.base[0] > 0) {
    return 0;
  }
  R = ctx.rand(7) + 3;
  if ((ctx.talents[310] || ctx.talents[312] || ctx.talents[313]) && ctx.abilities[10] > R) {
    ctx.drawLine();
    ctx.showMessage(`${ctx.josaHelper("타겟은")} 순간 죽었다고 생각했으나,`);
    ctx.showMessage(`기적적으로 가사상태에서 살아났다.`);
    ctx.exp[50] += 1;
    ctx.showMessage('이상경험 +1');
    ctx.abilities[10] -= 3;
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 복종이 3 내려갔다.`);
    await ctx.wait();
    ctx.base[0] = 100;
  } else if (ctx.talents[315] || ctx.talents[316] || ctx.talents[199]) {
    ctx.drawLine();
    ctx.showMessage('');
    ctx.showMessage(`${ctx.josaHelper("타겟은")} 죽고 말았다……`);
    ctx.showMessage('');
    ctx.drawLine();
    if ((ctx.talents[315] || ctx.talents[316]) && ctx.base[10] > 0) {
      ctx.base[10] -= 14;
      if (ctx.base[10] < 1) {
        ctx.base[10] = 1;
      }
    }
    ctx.abilities[10] -= 3;
    if (ctx.abilities[10] < 0) {
      ctx.abilities[10] = 0;
    }
    ctx.base[0] = 0;
  } else {
    character.tflags[13] = 999;
    await self_kojo(ctx, character);
    ctx.drawLine();
    ctx.showMessage('');
    ctx.showMessage(`${ctx.josaHelper("타겟은")} 죽고 말았다……`);
    ctx.showMessage('');
    ctx.drawLine();
    ctx.base[0] = -1;
    T = character.no + 999;
    ctx.flags[T] = -2;
    ctx.flags[31] += 1;
  }
  if (ctx.flags[31] >= 3 && ctx.getTalent(master, 93) === 0) {
    ctx.showMessage(`W %플레이어는(1)%【${ctx.getVarName("TALENT", 93)}】를 익혔다`);
    ctx.getTalent(master, 93) = 1;
  }
  return 1;
}

export async function self_check(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character < 0) {
    return 0;
  }
  if (character.tflags[899] >= 1) {
    return 0;
  }
  if (ctx.flags[549] === 1) {
    if (character.cflags[42] === 79 && character.cflags[49] === 0 && character.cflags[40] <= 63) {
      character.cflags[40] += 64;
    }
  }
  if (ctx.talents[311] === 1) {
    if (character.cflags[42] === 80 && character.cflags[40] <=63) {
      character.cflags[40] += 64;
    }
  }
  await aftertrain_tentaclesex_check(ctx, character);
  if (ctx.talents[122] || (ctx.talents[122] === 0 && ctx.abilities[2] < ctx.abilities[3]) || (ctx.talents[0] && ctx.abilities[3] >= 3 && ctx.talents[2] === 0)) {
    await aftertrain_analsex_check(ctx, character);
  } else {
    await aftertrain_sex_check(ctx, character);
  }
  await aftertrain_lesbiansex_check(ctx, character);
  N = ctx.result;
  await aftertrain_masturbation_check(ctx, character);
  await aftertrain_beastsex_check(ctx, character);
  return 0;
}

export async function aftertrain_sex_check(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character < 0) {
    return 0;
  }
  if (ctx.talents[135]) {
    return 0;
  }
  if (ctx.talents[85] == 0 && ctx.talents[76] == 0) {
    return 0;
  }
  if (ctx.exp[5] < 30) {
    return 0;
  }
  if (ctx.talents[0] || ctx.talents[122] == 1) {
    return 0;
  }
  if (character.cflags[42] == 79 && (character.cflags[40] & 64)) {
    return 0;
  }
  if (ctx.getTalent(master, 122) == 0 && ctx.getTalent(master, 121) == 0) {
    return 0;
  }
  if (ctx.base[0] < 500) {
    return 0;
  }
  S = 0;
  if (ctx.abilities[2] === 4) {
    S += 1;
  } else if (ctx.abilities[2] === 5) {
    S += 2;
  } else if (ctx.abilities[2] >= 6) {
    S += 3;
  }
  if (ctx.abilities[30]) {
    S += ctx.abilities[30] / 2 + 1;
  }
  if (S <= 0) {
    return 0;
  }
  if (ctx.abilities[11] >= 5 && ctx.abilities[16] >= 5 && ctx.params[5] >= PALAMLV[4]) {
    S += 2;
  }
  if (ctx.abilities[11] == 4 && ctx.abilities[16] >= 4 && ctx.params[5] >= PALAMLV[4]) {
    S += 1;
  }
  if (ctx.abilities[11] >= 7 && ctx.abilities[5] >= 6 && ctx.params[5] >= PALAMLV[3]) {
    S += 1;
  }
  if (ctx.abilities[11] >= 4 && ctx.abilities[2] >= 3 && ctx.params[5] >= PALAMLV[3]) {
    S += 1;
  }
  if (ctx.talents[85]) {
    S += 1;
  }
  if (ctx.talents[76]) {
    S += 1;
  }
  if (ctx.talents[75]) {
    S += 2;
  }
  if (ctx.talents[70]) {
    S += 1;
  } else if (ctx.talents[71]) {
    S -= 2;
  }
  if (S <= 0) {
    return 0;
  }
  ctx.drawLine();
  ctx.showMessage(`${ctx.josaHelper("플레이어와")} ${ctx.josaHelper("타겟은")} 아직 채 가시지 않은 흥분을 주체하지 못하고,`);
  ctx.showMessage(`{S}회 침대에서 함께 뒹굴었다…`);
  character.tflags[13] = 4;
  await self_kojo(ctx, character);
  ctx.showMessage(`${ctx.getVarName("EXP", 0)} +{S}`);
  ctx.showMessage(`${ctx.getVarName("EXP", 5)} +{S}`);
  ctx.showMessage(`${ctx.getVarName("PALAM", 1)}의 구슬 +{S*200}`);
  ctx.showMessage(`${ctx.getVarName("PALAM", 4)}의 구슬 +{S*100}`);
  ctx.showMessage(`W ${ctx.getVarName("PALAM", 5)}의 구슬 +{S*250}`);
  ctx.exp[0] += S;
  ctx.exp[5] += S;
  ctx.juel[1] += S*200;
  ctx.juel[4] += S*100;
  ctx.juel[5] += S*250;
  if (ctx.abilities[10]+ctx.abilities[2]+ctx.abilities[16] >= 13) {
    ctx.showMessage(`W ${ctx.josaHelper("타겟은")} 아쉬움에 소매를 잡아당겼다`);
    ctx.showMessage(`W 하지만 그 손을 뿌리치고서, ${ctx.josaHelper("플레이어는")} 방을 뒤로 했다…`);
  }
  ctx.relation[0] += 5;
  if (ctx.relation[0] > 1000) {
    ctx.relation[0] = 1000;
  } else if (ctx.relation[0] < 100) {
    ctx.relation[0] = 100;
  }
  return 1;
}

export async function aftertrain_analsex_check(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character < 0) {
    return 0;
  }
  if (ctx.talents[85] == 0 && ctx.talents[76] == 0) {
    return 0;
  }
  if (ctx.exp[5] < 30) {
    return 0;
  }
  if (ctx.getTalent(master, 122) == 0 && ctx.getTalent(master, 121) == 0) {
    return 0;
  }
  if (ctx.base[0] < 500) {
    return 0;
  }
  S = 0;
  if (ctx.abilities[3] === 4) {
    S += 1;
  } else if (ctx.abilities[3] === 5) {
    S += 2;
  } else if (ctx.abilities[3] >= 6) {
    S += 3;
  }
  if (ctx.abilities[30]) {
    S += ctx.abilities[30] / 2 + 1;
  }
  if (S <= 0) {
    return 0;
  }
  if (ctx.abilities[11] >= 5 && ctx.abilities[16] >= 5 && ctx.params[5] >= PALAMLV[4]) {
    S += 2;
  }
  if (ctx.abilities[11] == 4 && ctx.abilities[16] >= 4 && ctx.params[5] >= PALAMLV[4]) {
    S += 1;
  }
  if (ctx.abilities[11] >= 7 && ctx.abilities[5] >= 6 && ctx.params[5] >= PALAMLV[3]) {
    S += 1;
  }
  if (ctx.abilities[11] >= 4 && ctx.abilities[2] >= 3 && ctx.params[5] >= PALAMLV[3]) {
    S += 1;
  }
  if (ctx.talents[85]) {
    S += 1;
  }
  if (ctx.talents[76]) {
    S += 1;
  }
  if (ctx.talents[75]) {
    S += 2;
  }
  if (ctx.talents[70]) {
    S += 1;
  } else if (ctx.talents[71]) {
    S -= 2;
  }
  if (S <= 0) {
    return 0;
  }
  ctx.drawLine();
  ctx.showMessage(`${ctx.josaHelper("플레이어와")} ${ctx.josaHelper("타겟은")} 아직 채 가시지 않은 흥분을 주체하지 못하고,`);
  ctx.showMessage(`{S}회 침대 위에서 함께 뒹굴었다…`);
  ctx.showMessage(`${ctx.getVarName("EXP", 1)} +{S}`);
  ctx.showMessage(`${ctx.getVarName("EXP", 5)} +{S}`);
  ctx.showMessage(`${ctx.getVarName("PALAM", 2)}의 구슬 +{S*200}`);
  ctx.showMessage(`${ctx.getVarName("PALAM", 4)}의 구슬 +{S*100}`);
  ctx.showMessage(`W ${ctx.getVarName("PALAM", 5)}의 구슬 +{S*250}`);
  ctx.exp[1] += S;
  ctx.exp[5] += S;
  ctx.juel[2] += S*200;
  ctx.juel[4] += S*100;
  ctx.juel[5] += S*250;
  if (ctx.abilities[10]+ctx.abilities[3]+ctx.abilities[16] >= 13) {
    ctx.showMessage(`W ${ctx.josaHelper("타겟은")} 아쉬움에 소매를 잡아당겼다`);
    ctx.showMessage(`W 그러나 그 손을 뿌리치고서, ${ctx.josaHelper("플레이어는")} 방을 뒤로 했다…`);
  }
  ctx.relation[0] += 5;
  if (ctx.relation[0] > 1000) {
    ctx.relation[0] = 1000;
  } else if (ctx.relation[0] < 100) {
    ctx.relation[0] = 100;
  }
  return 1;
}

export async function aftertrain_lesbiansex_check(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character < 0) {
    return 0;
  }
  if (ctx.assi < 0) {
    return 0;
  }
  if (ctx.talents[122] || ctx.getTalent(assi, 122)) {
    return 0;
  }
  if (ctx.abilities[22] < 2 || ctx.abilities[0] < 3 || ctx.abilities[10] < 2 || ctx.abilities[11] < 2) {
    return 0;
  }
  if (ctx.abilities[33] == 0 && ctx.assiAbilities[33] == 0) {
    return 0;
  }
  if (ctx.base[0] < 500) {
    return 0;
  }
  N = 0;
  S = 0;
  S = ctx.abilities[38];
  if (S == 0) {
    S = 1;
  }
  if (ctx.abilities[33] === 1) {
    N += 1;
  } else if (ctx.abilities[33] === 2) {
    N += 2;
  } else if (ctx.abilities[33] === 3) {
    N += 3;
  } else if (ctx.abilities[33] === 4) {
    N += 5;
  } else if (ctx.abilities[33] === 5) {
    N += 7;
  } else if (ctx.abilities[33] >= 6) {
    N += 9;
  }
  if (ctx.assiAbilities[33] === 1) {
    N += 1;
  } else if (ctx.assiAbilities[33] === 2) {
    N += 2;
  } else if (ctx.assiAbilities[33] === 3) {
    N += 5;
  } else if (ctx.assiAbilities[33] === 4) {
    N += 8;
  } else if (ctx.assiAbilities[33] === 5) {
    N += 13;
  } else if (ctx.assiAbilities[33] >= 6) {
    N += 18;
  }
  if (N <= 0) {
    return 0;
  }
  if (ctx.abilities[22] >= 5 && ctx.params[5] >= PALAMLV[3]) {
    N += 1;
  }
  if (ctx.assiAbilities[22] >= 3 && ctx.params[5] >= PALAMLV[3]) {
    N += 1;
  }
  if (ctx.abilities[11] >= 7 && ctx.abilities[5] >= 6 && ctx.params[5] >= PALAMLV[3]) {
    N += 1;
  }
  if (ctx.abilities[11] >= 4 && ctx.abilities[2] >= 3 && ctx.params[5] >= PALAMLV[3]) {
    N += 1;
  }
  R = ctx.assi.no;
  if (ctx.relation[R] > 0) {
    N *= ctx.relation[R];
    N /= 100;
  }
  if (ctx.talents[24]) {
    N -= 1;
  }
  if (ctx.getTalent(assi, 24)) {
    N -= 1;
  }
  if (ctx.talents[27]) {
    N -= 1;
  }
  if (ctx.getTalent(assi, 27)) {
    N -= 1;
  }
  if (ctx.talents[81]) {
    N += 2;
  }
  if (ctx.getTalent(assi, 81)) {
    N += 2;
  }
  if (ctx.talents[76]) {
    N += 1;
  }
  if (ctx.getTalent(assi, 76)) {
    N += 1;
  }
  if (ctx.talents[70]) {
    N += 1;
  } else if (ctx.talents[71]) {
    N -= 2;
  }
  if (ctx.getTalent(assi, 70)) {
    N += 1;
  } else if (ctx.getTalent(assi, 71)) {
    N -= 2;
  }
  if (N <= 0) {
    return 0;
  }
  if (S === 1) {
    ctx.drawLine();
    ctx.showMessage(`${ctx.josaHelper("플레이어가")} 밖으로 나간 후,`);
  } else {
    ctx.print('지도 종료 후에');
  }
  ctx.showMessage(`W ${ctx.josaHelper("타겟과")} ${ctx.josaHelper("조수는")} ${N}번 레즈비언 플레이를 한 것 같다.`);
  character.tflags[13] = 2;
  await self_kojo(ctx, character);
  ctx.showMessage(`${ctx.getVarName("EXP", 40)} +${N*2}`);
  if (N*100*ctx.abilities[10]/500 > 0) {
    ctx.showMessage(`${ctx.getVarName("EXP", 2)} +${N*100*ctx.abilities[10]/500}`);
  }
  ctx.showMessage(`${ctx.getVarName("PALAM", 0)}의 구슬 +${N*100*ctx.abilities[10]}`);
  ctx.showMessage(`${ctx.getVarName("PALAM", 5)}의 구슬 +${N*200}`);
  ctx.exp[40] += N*2;
  ctx.exp[2] += N*100*ctx.abilities[10]/500;
  ctx.juel[0] += N*100*ctx.abilities[10];
  ctx.juel[5] += N*200;
  if (ctx.getTalent(assi, 121)) {
    ctx.showMessage(`${ctx.getVarName("EXP", 20)} +${N}`);
    ctx.showMessage(`${ctx.getVarName("PALAM", 6)}의 구슬 +${N*100*(ctx.abilities[12]+ctx.abilities[16])}`);
    ctx.showMessage(`${ctx.getVarName("PALAM", 7)}의 구슬 +${N*100*(ctx.abilities[12]+ctx.abilities[16])}`);
    ctx.exp[20] += N;
    ctx.juel[6] += N*100*(ctx.abilities[12]+ctx.abilities[16]);
    ctx.juel[7] += N*100*(ctx.abilities[12]+ctx.abilities[16]);
  } else {
    ctx.showMessage(`${ctx.getVarName("PALAM", 6)}의 구슬 +${N*50*(ctx.abilities[12]+ctx.abilities[16])}`);
    ctx.showMessage(`${ctx.getVarName("PALAM", 7)}의 구슬 +${N*50*(ctx.abilities[12]+ctx.abilities[16])}`);
    ctx.juel[6] += N*50*(ctx.abilities[12]+ctx.abilities[16]);
    ctx.juel[7] += N*50*(ctx.abilities[12]+ctx.abilities[16]);
  }
  if (ctx.getTalent(assi, 83) || ctx.getTalent(assi, 553)) {
    ctx.showMessage(`${ctx.getVarName("EXP", 30)} +${N}`);
    if (ctx.getTalent(assi, 553)) {
      ctx.showMessage(`${ctx.getVarName("PALAM", 9)}의 구슬 +${N*100*ctx.assiAbilities[20]}`);
      ctx.juel[9] += N*100*ctx.assiAbilities[20];
    } else if ((N*100*ctx.abilities[21]) > 0) {
      ctx.showMessage(`${ctx.getVarName("PALAM", 9)}의 구슬 +${N*100*ctx.abilities[21]}`);
      ctx.juel[9] += N*100*ctx.abilities[21];
    }
    ctx.exp[30] += N;
  }
  if (ctx.getTalent(assi, 88) && ctx.abilities[character][20] >= 3) {
    ctx.showMessage(`${ctx.getVarName("EXP", 33)} +${N}`);
    if (ctx.talents[553]) {
      ctx.times('N', 1.80);
    }
    if (N*100*ctx.abilities[20] > 0) {
      ctx.showMessage(`${ctx.getVarName("PALAM", 5)}의 구슬 +${N*100*ctx.abilities[20]}`);
    }
    ctx.juel[5] += N*100*ctx.abilities[20];
    ctx.exp[33] += N;
  }
  if (ctx.talents[121]) {
    ctx.showMessage(`${ctx.getVarName("EXP", 3)} +${N*S}`);
    ctx.showMessage(`${ctx.getVarName("PALAM", 8)}의 구슬 +${N*100*S}`);
    ctx.exp[3] += N*S;
    ctx.juel[8] += N*100*S;
  }
  if (ctx.talents[121] && ctx.getTalent(assi, 121) && ctx.abilities[16] >= 3 && ctx.abilities[32] >= 3) {
    ctx.showMessage(`%조수와(1)% %타겟은(1)%`);
    if (TIME === 0) {
      ctx.showMessage(`W 해가 저물 때까지 서로의 페니스를 물고 빨았다.`);
    } else {
      ctx.showMessage(`W 밤새도록 서로의 페니스를 물고 빨았다.`);
    }
    ctx.showMessage(`${ctx.getVarName("EXP", 3)} +${N*S}`);
    ctx.showMessage(`${ctx.getVarName("EXP", 20)} +${N}`);
    ctx.showMessage(`${ctx.getVarName("EXP", 21)} +${N}`);
    ctx.showMessage(`${ctx.getVarName("EXP", 22)} +${N}`);
    ctx.showMessage(`${ctx.getVarName("PALAM", 5)}의 구슬 +${N*100}`);
    ctx.showMessage(`${ctx.getVarName("PALAM", 6)}의 구슬 +${N*100}`);
    ctx.showMessage(`${ctx.getVarName("PALAM", 8)}의 구슬 +${N*100*S}`);
    ctx.exp[3] += N*S;
    ctx.exp[20] += N;
    ctx.exp[21] += N;
    ctx.exp[22] += N;
    ctx.juel[5] += N*100;
    ctx.juel[6] += N*100;
    ctx.juel[8] += N*100*S;
  }
  // TODO: RELATION:(NO:ASSI) += 5
  if (ctx.talents[553] || ctx.getTalent(assi, 553)) {
    // TODO: RELATION:(NO:ASSI) += 5
  }
  if (relation[ctx.assi.no] > 1000) {
    // TODO: RELATION:(NO:ASSI) = 1000
  } else if (relation[ctx.assi.no] < 100) {
    // TODO: RELATION:(NO:ASSI) = 100
  }
  ctx.relation[assi][character.no] += 5;
  if (ctx.talents[553] || ctx.getTalent(assi, 553)) {
    // TODO: RELATION:(NO:ASSI) += 5
  }
  if (ctx.relation[assi][character.no] > 1000) {
    ctx.relation[assi][character.no] = 1000;
  } else if (ctx.relation[assi][character.no] < 100) {
    ctx.relation[assi][character.no] = 100;
  }
  return 1;
}

export async function aftertrain_masturbation_check(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character < 0) {
    return 0;
  }
  if (ctx.abilities[0] < 3 || ctx.abilities[11] < 2) {
    return 0;
  }
  if (ctx.talents[150]) {
    return 0;
  }
  if (ctx.base[0] < 500) {
    return 0;
  }
  A = 0;
  if (ctx.abilities[31] === 0) {
    return 0;
  }
  if (ctx.abilities[31] === 1) {
    A += 1;
  } else if (ctx.abilities[31] === 2) {
    A += 2;
  } else if (ctx.abilities[31] === 3) {
    A += 4;
  } else if (ctx.abilities[31] === 4) {
    A += 6;
  } else if (ctx.abilities[31] === 5) {
    A += 9;
  } else if (ctx.abilities[31] >= 6) {
    A += 14;
  }
  if (ctx.talents[60] && ctx.abilities[11] >= 3 && ctx.params[5] >= PALAMLV[3]) {
    A += 1;
  }
  if (ctx.assi >= 0) {
    if (ctx.getTalent(assi, 118) && ctx.abilities[11] >= 4 && ctx.params[5] >= PALAMLV[3]) {
      A += 1;
    }
  }
  if (ctx.abilities[11] >= 5 && ctx.abilities[17] >= 4 && ctx.params[5] >= PALAMLV[4]) {
    A += 1;
  }
  if (ctx.abilities[11] >= 4 && ctx.abilities[17] >= 3 && ctx.params[5] >= PALAMLV[4]) {
    A += 1;
  }
  if (A <= 0) {
    return 0;
  }
  if (ctx.talents[74]) {
    ctx.times('A', 1.50);
  }
  if (ctx.assi >= 0) {
    if (ctx.getTalent(assi, 118)) {
      ctx.times('A', 1.20);
    }
  }
  if (ctx.talents[17]) {
    A += 1;
  }
  if (ctx.talents[33]) {
    A += 1;
  }
  if (ctx.talents[15]) {
    A -= 1;
  }
  if (ctx.talents[20]) {
    A -= 1;
  }
  if (ctx.talents[32]) {
    A -= 1;
  }
  if (ctx.talents[70]) {
    A += 1;
  } else if (ctx.talents[71]) {
    A -= 2;
  }
  if (ctx.talents[76]) {
    A += 1;
  }
  if (A <= 0) {
    return 0;
  }
  ctx.drawLine();
  ctx.showMessage(`${ctx.josaHelper("타겟은")}`);
  if (N === 1) {
    ctx.showMessage(`${ctx.josaHelper("조수가")} 나간 뒤에,`);
  } else if (S === 1) {
    ctx.showMessage(`${ctx.josaHelper("플레이어가")} 나간 뒤에,`);
  } else {
    ctx.print('지도 종료 후에,');
  }
  if (ctx.talents[85] === 0 && N === 1 && ctx.abilities[22] > ctx.rand(5)) {
    ctx.showMessage(`${ctx.josaHelper("조수를")} 생각하면서 ${A}번 자위를 한 것 같다.`);
    Q = 1;
  } else if (ctx.talents[85] === 0 && ctx.abilities[40] > ctx.rand(5) && ctx.item[22]) {
    ctx.showMessage(`들개와의 교미를 망상하면서 ${A}번 자위를 한 것 같다.`);
    Q = 2;
  } else {
    ctx.showMessage(`${ctx.josaHelper("플레이어를")} 생각하면서 ${A}번 자위를 한 것 같다.`);
    Q = 0;
  }
  character.tflags[13] = 1;
  await self_kojo(ctx, character);
  ctx.showMessage(`${ctx.getVarName("EXP", 10)} +${A}`);
  ctx.exp[10] += A;
  ctx.showMessage(`${ctx.getVarName("PALAM", 0)}의 구슬 +${A*500}`);
  ctx.showMessage(`${ctx.getVarName("PALAM", 4)}의 구슬 +${A*100}`);
  ctx.showMessage(`W ${ctx.getVarName("PALAM", 5)}의 구슬 +${A*250}`);
  ctx.juel[0] += A*500;
  ctx.juel[4] += A*100;
  ctx.juel[5] += A*250;
  if (ctx.abilities[10]+ctx.abilities[17]+ctx.abilities[21] >= 10 && TIME === 0) {
    ctx.showMessage(`그 일을 %타겟은(1)% 보고해왔다.`);
    ctx.showMessage(`${ctx.getVarName("PALAM", 8)}의 구슬 +${A*200}`);
    ctx.juel[8] += A*200;
  }
  if ((ctx.abilities[10] >= 5 || ctx.abilities[11] >= 5) && Q === 0) {
    ctx.showMessage(`W 그러나 몇 번이고 자신을 위로해봐도, ${ctx.josaHelper("플레이어를")} 향한 욕망은 채워지지 않았다.`);
  } else if ((ctx.abilities[11] >= 5 || ctx.abilities[33] >= 3) && Q === 1) {
    ctx.showMessage(`W 그러나 몇 번이고 자신을 위로해봐도, ${ctx.josaHelper("조수를")} 향한 욕망은 채워지지 않았다.`);
  } else if ((ctx.abilities[11] >= 5 || ctx.abilities[40] >= 3) && Q === 2) {
    ctx.showMessage(`W 그러나 몇 번이고 자신을 위로해봐도, 수간을 향한 욕망은 채워지지 않았다.`);
  }
  return 1;
}

export async function aftertrain_beastsex_check(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character < 0) {
    return 0;
  }
  if (ctx.talents[135]) {
    return 0;
  }
  if (ctx.exp[56] < 50) {
    return 0;
  }
  if (ctx.talents[0] || ctx.talents[122] == 1) {
    return 0;
  }
  if (character.cflags[42] == 79 && (character.cflags[40] & 64)) {
    return 0;
  }
  if (ctx.item[22] == 0) {
    return 0;
  }
  if (ctx.base[0] < 500) {
    return 0;
  }
  B = 0;
  if (ctx.abilities[40] === 0) {
    B -= 2;
  } else if (ctx.abilities[40] === 1) {
    B -= 1;
  } else if (ctx.abilities[40] === 2) {
    B += 0;
  } else if (ctx.abilities[40] === 3) {
    B += 1;
  } else if (ctx.abilities[40] === 4) {
    B += 2;
  } else if (ctx.abilities[40] === 5) {
    B += 3;
  } else if (ctx.abilities[40] >= 6) {
    B += 4;
  }
  if (ctx.talents[124] && ctx.abilities[11] >= 3 && ctx.params[5] >= PALAMLV[3]) {
    B += 1;
  }
  if (ctx.abilities[11] >= 5 && ctx.abilities[17] >= 4 && ctx.params[5] >= PALAMLV[4]) {
    B += 1;
  }
  if (ctx.abilities[11] >= 4 && ctx.abilities[17] >= 3 && ctx.params[5] >= PALAMLV[4]) {
    B += 1;
  }
  if (ctx.talents[136]) {
    B += 2;
  }
  if (B <= 0) {
    return 0;
  }
  if (ctx.talents[17]) {
    B += 1;
  }
  if (ctx.talents[33]) {
    B += 1;
  }
  if (ctx.talents[124]) {
    B += 1;
  }
  if (ctx.talents[15]) {
    B -= 1;
  }
  if (ctx.talents[20]) {
    B -= 1;
  }
  if (ctx.talents[32]) {
    B -= 1;
  }
  if (ctx.talents[62] && ctx.talents[64] == 0) {
    B -= 2;
  }
  if (ctx.talents[70]) {
    B += 1;
  } else if (ctx.talents[71]) {
    B -= 2;
  }
  if (ctx.talents[76]) {
    B += 1;
  }
  if (ctx.talents[136]) {
    ctx.times('B', 1.50);
  }
  if (B <= 0) {
    return 0;
  }
  ctx.drawLine();
  ctx.showMessage(`그 후, ${ctx.josaHelper("타겟은")} 들개를 기르고 있는 개집에 잠입해,`);
  ctx.showMessage(`{B}번의 교미를 한 것 같다.`);
  ctx.showMessage(`${ctx.getVarName("EXP", 56)} +{B}`);
  ctx.showMessage(`${ctx.getVarName("EXP", 0)} +{B}`);
  ctx.showMessage(`${ctx.getVarName("EXP", 5)} +{B}`);
  ctx.exp[56] += B;
  ctx.exp[0] += B;
  ctx.exp[5] += B;
  ctx.showMessage(`${ctx.getVarName("PALAM", 1)}의 구슬 +{B*200}`);
  ctx.showMessage(`${ctx.getVarName("PALAM", 6)}의 구슬 +{B*300}`);
  ctx.showMessage(`W ${ctx.getVarName("PALAM", 8)}의 구슬 +{B*200}`);
  ctx.juel[1] += B*200;
  ctx.juel[6] += B*300;
  ctx.juel[8] += B*200;
  if (ctx.abilities[10]+ctx.abilities[17]+ctx.abilities[21] >= 12 && TIME === 0) {
    ctx.showMessage(`그것을 %타겟은(1)%`);
    if (ctx.talents[124]) {
      ctx.print('꼬리를 흔들면서');
    }
    ctx.showMessage(`보고해왔다.`);
    ctx.showMessage(`${ctx.getVarName("PALAM", 8)}의 구슬 +{B*200}`);
    ctx.juel[8] += B*200;
  }
  return 1;
}

export async function aftertrain_tentaclesex_check(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character < 0) {
    return 0;
  }
  if (ctx.talents[135]) {
    return 0;
  }
  if (ctx.exp[55] < 50) {
    return 0;
  }
  if (ctx.talents[0] || ctx.talents[122] == 1) {
    return 0;
  }
  if (character.cflags[42] == 79 && (character.cflags[40] & 64)) {
    return 0;
  }
  if (ctx.item[90] == 0) {
    return 0;
  }
  if (ctx.base[0] < 500) {
    return 0;
  }
  if (character.equipment[90] == 0) {
    return 0;
  }
  B = 0;
  if (ctx.abilities[41] === 0) {
    B -= 2;
  } else if (ctx.abilities[41] === 1) {
    B -= 1;
  } else if (ctx.abilities[41] === 2) {
    B += 0;
  } else if (ctx.abilities[41] === 3) {
    B += 1;
  } else if (ctx.abilities[41] === 4) {
    B += 2;
  } else if (ctx.abilities[41] === 5) {
    B += 3;
  } else if (ctx.abilities[41] >= 6) {
    B += 4;
  }
  if (ctx.abilities[41] >= 3 && ctx.abilities[11] >= 3 && ctx.params[5] >= PALAMLV[3]) {
    B += 1;
  }
  if (ctx.abilities[11] >= 5 && ctx.abilities[17] >= 4 && ctx.params[5] >= PALAMLV[4]) {
    B += 1;
  }
  if (ctx.abilities[11] >= 4 && ctx.abilities[17] >= 3 && ctx.params[5] >= PALAMLV[4]) {
    B += 1;
  }
  if (ctx.talents[137]) {
    B += 2;
  }
  if (B <= 0) {
    return 0;
  }
  if (ctx.talents[17]) {
    B += 1;
  }
  if (ctx.talents[33]) {
    B += 1;
  }
  if (ctx.talents[15]) {
    B -= 1;
  }
  if (ctx.talents[20]) {
    B -= 1;
  }
  if (ctx.talents[32]) {
    B -= 1;
  }
  if (ctx.talents[62] && ctx.talents[64] == 0) {
    B -= 2;
  }
  if (ctx.talents[70]) {
    B += 1;
  } else if (ctx.talents[71]) {
    B -= 2;
  }
  if (ctx.talents[76]) {
    B += 1;
  }
  if (ctx.talents[440]) {
    B += 1;
  }
  if (ctx.talents[137]) {
    ctx.times('B', 1.50);
  }
  if (B <= 0) {
    return 0;
  }
  ctx.drawLine();
  ctx.showMessage(`${ctx.josaHelper("타겟은")} 지도가 끝나고`);
  ctx.showMessage(`{B}회 촉수에게 당했다고 한다.`);
  ctx.showMessage(`${ctx.getVarName("EXP", 55)} +{B}`);
  ctx.showMessage(`${ctx.getVarName("EXP", 0)} +{B}`);
  ctx.showMessage(`${ctx.getVarName("EXP", 5)} +{B}`);
  ctx.showMessage(`${ctx.getVarName("EXP", 20)} +{B}`);
  ctx.exp[55] += B;
  ctx.exp[0] += B;
  ctx.exp[5] += B;
  ctx.exp[20] += B;
  character.cflags[107] += B;
  ctx.showMessage(`${ctx.getVarName("PALAM", 1)}의 구슬 +{B*200}`);
  ctx.showMessage(`${ctx.getVarName("PALAM", 5)}의 구슬 +{B*300}`);
  ctx.showMessage(`W ${ctx.getVarName("PALAM", 8)}의 구슬 +{B*200}`);
  ctx.juel[1] += B*200;
  ctx.juel[5] += B*300;
  ctx.juel[8] += B*200;
  if (ctx.abilities[10]+ctx.abilities[17]+ctx.abilities[21] >= 12 && TIME === 0) {
    ctx.showMessage(`그것을 %타겟은(1)%`);
    ctx.showMessage(`보고해왔다.`);
    ctx.showMessage(`${ctx.getVarName("PALAM", 8)}의 구슬 +{B*200}`);
    ctx.juel[8] += B*200;
  }
  return 1;
}
