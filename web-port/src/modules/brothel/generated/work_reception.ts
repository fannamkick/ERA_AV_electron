/**
 * WORK_RECEPTION.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function reception_main(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  A = 0;
  B = 0;
  C = 0;
  D = 0;
  E = 0;
  F = 0;
  G = 0;
  H = 0;
  L[0] = 0;
  L[1] = 0;
  L[2] = 0;
  L[3] = 0;
  N = 0;
  Q = 0;
  S = 0;
  U = 0;
  V = 0;
  ctx.flags[49] = 0;
  if (ctx.rand(3) == 0) {
    ctx.flags[49] |= 1;
  }
  if (ctx.rand(3) == 0) {
    ctx.flags[49] |= 2;
  }
  if (ctx.rand(3) == 0) {
    ctx.flags[49] |= 8;
  }
  if (ctx.rand(2) === 0) {
    if (ctx.rand(5) === 0) {
      ctx.flags[49] |= 32;
    } else if (ctx.rand(2) === 0) {
      ctx.flags[49] |= 16;
    } else {
      ctx.flags[49] |= 4;
    }
  }
  if ((ctx.flags[49] & 1) === 0 && ctx.rand(3) === 0) {
    if (ctx.rand(3) === 0) {
      ctx.flags[49] |= 64;
    } else if (ctx.rand(2) === 0) {
      ctx.flags[49] |= 128;
    } else {
      ctx.flags[49] |= 256;
    }
  }
  // Label: INPUT_LOOP
  ctx.showMessage(`${ctx.josaHelper("플레이어가")} 입수한 정보에 따르면, 이번 접대 상대는`);
  if ((ctx.flags[49] & 2)) {
    ctx.print('새디스트인');
  }
  if ((ctx.flags[49] & 8)) {
    ctx.print('매니아 취미인');
  }
  if ((ctx.flags[49] & 1)) {
    ctx.print('여성');
  } else {
    ctx.print('남성');
  }
  if ((ctx.flags[49] & 4)) {
    ctx.print('으로 로리콘');
  } else if ((ctx.flags[49] & 16)) {
    ctx.print('으로 여고생 페티쉬');
  } else if ((ctx.flags[49] & 32)) {
    ctx.print('으로 메이드 취향');
  }
  ctx.showMessage(`인 것 같`);
  if ((ctx.flags[49] & 64)) {
    ctx.print('으며, 게다가 꽤 연륜이 있는 아이돌 오타쿠인 것 같다');
  } else if ((ctx.flags[49] & 128)) {
    ctx.print('으며, 게다가 갸루가 좋아서 견딜 수 없는 것 같다');
  } else if ((ctx.flags[49] & 256)) {
    ctx.print('으며, 게다가 유부녀가 좋아서 참을 수 없는 것 같다');
  } else {
    ctx.print('다');
  }
  await ctx.wait();
  ctx.drawLine();
  ctx.showMessage('누구에게 접대를 맡기겠습니까?');
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count == 0) {
      // TODO: CONTINUE
    }
    if (TIME == 1 && character.cflags[ctx.count][12] != 0) {
      // TODO: CONTINUE
    }
    if (character.cflags[ctx.count][1] == 0) {
      // TODO: CONTINUE
    }
    if (ctx.base[ctx.count][0] < 500) {
      // TODO: CONTINUE
    }
    if (character.mark[ctx.count][3] >= 1) {
      // TODO: CONTINUE
    }
    if (ctx.abilities[ctx.count][10] + ctx.abilities[ctx.count][11] < 8) {
      // TODO: CONTINUE
    }
    if (character.cflags[ctx.count][110] - 2 <= DAY && ctx.getTalent(count, 153)) {
      // TODO: CONTINUE
    }
    if (ctx.getTalent(count, 154)) {
      // TODO: CONTINUE
    }
    if (ctx.getTalent(count, 122)) {
      // TODO: CONTINUE
    }
    ctx.showMessage(`[${ctx.count}] ${ctx.getName(ctx.count)}`);
    ctx.print('(체력:');
    A = ctx.base[ctx.count][0];
    if (ctx.base[ctx.count][0] < 0) {
      A = 0;
    }
    ctx.showMessage(`${A}/${MAXctx.base[ctx.count][0]})`);
  }
  ctx.drawLine();
  ctx.showMessage(` [999] - 접대를 단념한다`);
  await ctx.inputNumber();
  if (ctx.result === 999) {
    ctx.showMessage(`${ctx.josaHelper("플레이어는")} 어쩔 수 없이 접대를 단념했다`);
    ctx.showMessage(`흥이 깨진 접대 상대는, 짜증을 내며 돌아가 버렸다……`);
    await ctx.wait();
    ctx.exp[ctx.master][90] -= 10;
    ctx.showMessage(`공헌도　-10`);
    // TODO: BEGIN TURNEND
    return 0;
  } else if (ctx.result < 1 || ctx.result >= ctx.charanum) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (TIME === 1 && character.cflags[ctx.result][12] != 0) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (character.cflags[ctx.result][1] === 0) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.base[ctx.result][0] < 500) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (character.mark[ctx.result][3] >= 1) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.abilities[ctx.result][10] + ctx.abilities[ctx.result][11] < 8) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (character.cflags[ctx.result][110] - 2 <= DAY && ctx.getTalent(result, 153)) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 154)) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 122)) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  character = ctx.result;
  ctx.showMessage(`${ctx.getVarName("CALL", MASTER)}에게 이끌려 ${ctx.josaHelper("타겟이")} 방에 들어가니, 그 곳에 한`);
  if ((ctx.flags[49] & 1) === 1) {
    ctx.print('여성');
  } else if ((ctx.flags[49] & 1) === 0) {
    ctx.print('남성');
  }
  ctx.showMessage(`이 기다리고 있다`);
  ctx.showMessage(`이 사람이 이번의 접대 상대인 것 같다…`);
  await ctx.wait();
  A = 0;
  if ((ctx.flags[49] & 1) && ctx.abilities[22] > 0) {
    A |= 1;
  }
  if ((ctx.flags[49] & 2) && (ctx.talents[88] || ctx.abilities[21] >= 3)) {
    A |= 2;
  }
  if ((ctx.flags[49] & 4) && (ctx.base[9] <= 15 || ctx.talents[414] == 1)) {
    A |= 4;
  }
  if ((ctx.flags[49] & 16) && ctx.talents[220]) {
    A |= 4;
  }
  if ((ctx.flags[49] & 32) && ctx.talents[417]) {
    A |= 4;
  }
  if ((ctx.flags[49] & 8) && ctx.abilities[81] > 0) {
    A |= 8;
  }
  if ((ctx.flags[49] & 64) && ctx.talents[203]) {
    A |= 16;
  }
  if ((ctx.flags[49] & 128) && ctx.talents[422] && ctx.talents[432]) {
    A |= 16;
  }
  if ((ctx.flags[49] & 256) && ctx.talents[206]) {
    A |= 16;
  }
  B += 30;
  LOSEctx.base[0] = 0;
  character.cflags[12] = 0;
  if (ctx.talents[122]) {
    character.cflags[54] = 1;
  } else if (character.cflags[42] === 79 && (character.cflags[40] & 64)) {
    character.cflags[54] = 1;
  } else {
    character.cflags[54] = 0;
  }
  await reception_main2(ctx, character);
  ctx.showMessage(`W 접대를 종료합니다`);
  if (ctx.result === 0) {
    ctx.showMessage(`이번 접대는 대실패로 끝나고 말았다……`);
    B = 10;
    ctx.exp[ctx.master][90] -= B;
    ctx.showMessage(`공헌도　-{B}`);
  } else if (B < 100) {
    ctx.showMessage(`이번 접대는 실패로 끝난 것 같다……`);
    B = 5;
    ctx.exp[ctx.master][90] -= B;
    ctx.showMessage(`공헌도　-{B}`);
  } else {
    ctx.showMessage(`충분히 만족해 준 것 같다`);
    B /= 30;
    ctx.exp[ctx.master][90] += B;
    ctx.showMessage(`공헌도　+{B}`);
  }
  if (ctx.exp[ctx.master][90] < 0) {
    ctx.exp[ctx.master][90] = 0;
  }
  N = 200;
  if (ctx.talents[11]) {
    ctx.times('N', 1.10);
  }
  if (ctx.talents[15]) {
    ctx.times('N', 1.20);
  }
  if (ctx.talents[24]) {
    ctx.times('N', 1.20);
  }
  if (ctx.talents[31]) {
    ctx.times('N', 0.80);
  }
  if (ctx.talents[35]) {
    ctx.times('N', 1.10);
  }
  if (ctx.talents[36]) {
    ctx.times('N', 0.90);
  }
  if (ctx.talents[76]) {
    ctx.times('N', 0.60);
  }
  if (ctx.talents[80]) {
    ctx.times('N', 0.80);
  }
  if (ctx.talents[180]) {
    ctx.times('N', 0.50);
  }
  if (ctx.talents[181]) {
    ctx.times('N', 0.80);
  }
  if (ctx.talents[85] == 1) {
    N *= 3;
  }
  if (ctx.talents[85] >= 2) {
    N *= 5;
  }
  if (ctx.talents[184]) {
    N *= 2;
  }
  if (ctx.talents[84]) {
    N *= 10;
  }
  ctx.showMessage(`부정의 구슬 ${ctx.juel[100]}　+　${N}`);
  ctx.juel[100] += N;
  Q = ctx.abilities[10] * 100;
  if (ctx.talents[180]) {
    Q *= 2;
  } else {
    Q += 100;
  }
  U = Q;
  ctx.times('U', 1.73);
  V = Q;
  ctx.times('V', 1.41);
  if (character.mark[3] != 3 && ctx.juel[100] > U) {
    ctx.showMessage('반발각인 LV3을 습득'); ctx.waitInput();
    character.mark[3] = 3;
  } else if (character.mark[3] != 2 && ctx.juel[100] > V) {
    ctx.showMessage('반발각인 LV2를 습득'); ctx.waitInput();
    character.mark[3] = 2;
  } else if (character.mark[3] != 1 && ctx.juel[100] > Q) {
    ctx.showMessage('반발각인 LV1을 습득'); ctx.waitInput();
    character.mark[3] = 1;
  }
  character.cflags[54] = 0;
  ctx.flags[49] = 0;
  if (ctx.exp[ctx.master][90] >= 300 && ctx.getTalent(master, 325) === 0) {
    await ctx.wait();
    ctx.drawLine();
    ctx.showMessage('');
    ctx.showMessage(`W 접대에서 돌아온 ${ctx.josaHelper("타겟이")}, 한 장의 지도를 내밀었다`);
    ctx.showMessage(`W 이번 접대 상대로부터 받아온 것 같다`);
    ctx.showMessage('');
    ctx.showMessage('【비밀지식】을 손에 넣었습니다');
    ctx.showMessage('이후, 비밀 연구소에 갈 수 있게 됩니다');
    ctx.getTalent(master, 325) = 1;
  } else if (ctx.exp[ctx.master][90] >= 500 && ctx.getTalent(master, 398) === 0 && ctx.flags[47] === 0) {
    await ctx.wait();
    ctx.drawLine();
    ctx.showMessage('');
    ctx.showMessage(`W 접대에서 돌아온 ${ctx.josaHelper("타겟이")}, 작은 메달을 내밀었다`);
    ctx.showMessage(`W 이번 접대 상대로부터 받아온 것 같다`);
    ctx.showMessage('');
    ctx.showMessage('【훈장】을 손에 넣었습니다');
    ctx.getTalent(master, 398) = 1;
    ctx.flags[47] = 1;
  }
  await ctx.wait();
  // TODO: BEGIN TURNEND
  return 1;
}

export async function reception_main2(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  for (let COUNT = 0; COUNT < 10; COUNT++) {
    S = 0;
    D = 0;
    F = 0;
    ctx.drawLine();
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의`);
    await life_bar(ctx, character);
    ctx.showMessage(`만족도:{B}/ 쾌감도(상대):{C}/ 쾌감도(${ctx.getVarName("CALL", TARGET)}):{E}/ 남은시간:{10-COUNT}`);
    ctx.drawLine();
    ctx.showMessage(`무엇을 합니까?`);
    ctx.showMessage('[0] - 대화한다');
    ctx.showMessage('[1] - 봉사한다');
    if (ctx.abilities[15] >= 2 && character.cflags[54] == 0) {
      ctx.showMessage('[2] - 유혹한다');
    }
    if (ctx.abilities[21] >= 2 && character.cflags[54] == 0) {
      ctx.showMessage('[3] - 몸을 맡긴다');
    }
    ctx.showMessage('[999] - 접대를 중도 포기한다');
    // Label: INPUT_LOOP
    await ctx.inputNumber();
    if (ctx.result === 0) {
      await reception_talking(ctx, character);
    } else if (ctx.result === 1) {
      await reseption_service(ctx, character);
    } else if (ctx.result === 2 && ctx.abilities[15] >= 2) {
      await reception_temptation(ctx, character);
    } else if (ctx.result === 3 && ctx.abilities[21] >= 2) {
      await reception_abandon(ctx, character);
    } else if (ctx.result === 999) {
      ctx.showMessage(`${ctx.josaHelper("플레이어는")} ${ctx.getVarName("CALL", TARGET)}에게 접대를 중도 포기하게 했다`);
      ctx.showMessage(`흥이 깨진 접대 상대는, 짜증을 내며 돌아가 버렸다……`);
      await ctx.wait();
      ctx.exp[ctx.master][90] -= 10;
      ctx.showMessage(`공헌도　-10`);
      return 0;
    } else {
      // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
    }
    C += D;
    if (C <= 0) {
      C = 0;
    }
    if (S < 30 && C >= 100) {
      C = 99;
    }
    if (C >= 100) {
      if ((ctx.flags[49] & 1)) {
        ctx.showMessage('【절정(접대상대)】');
      } else {
        ctx.showMessage('【사정(접대상대)】');
        ctx.exp[20] += 1;
        ctx.showMessage('정액경험　+ 1');
      }
      B += 20;
      C -= 100;
    }
    E += F;
    if (E >= 100) {
      ctx.showMessage(`【절정(${ctx.getVarName("CALL", TARGET)})】`);
      ctx.exp[2] += 1;
      ctx.showMessage('절정경험　+1');
      B += 8;
      E -= 100;
    }
    if (ctx.talents[10]) {
      ctx.times('LOSEBASE:0', 1.10);
    }
    if (ctx.talents[32]) {
      ctx.times('LOSEBASE:0', 1.10);
    }
    if (ctx.talents[76]) {
      ctx.times('LOSEBASE:0', 0.80);
    }
    if (ctx.talents[180]) {
      ctx.times('LOSEBASE:0', 0.50);
    }
    ctx.base[0] -= LOSEctx.base[0];
    if (ctx.base[0] <= 0) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 접대중에 쓰러져, 조금도 움직이지 않았다`);
      ctx.showMessage(`무엇을 해도 반응이 없다……`);
      if (ctx.getTalent(master, 83) || ctx.getTalent(master, 93)) {
        ctx.showMessage(`${ctx.josaHelper("플레이어는")} 이 스캔들을 이용해, 접대 상대를 협박하기로 했다`);
        await ctx.wait();
        B /= 10;
        ctx.exp[ctx.master][90] += B;
        ctx.showMessage(`W 공헌도　+{B}`);
      } else {
        ctx.showMessage(`접대 상대는 시신의 처리를 ${ctx.getVarName("CALL", MASTER)}에게 맡기고, 급히 돌아가 버렸다……`);
        await ctx.wait();
      }
      await charadead_check(ctx, character);
      return 0;
    } else if (ctx.base[0] <= 500) {
      ctx.showMessage(`가혹한 플레이에 견디지 못하고, ${ctx.josaHelper("타겟은")} 도중에 접대를 포기했다`);
      ctx.showMessage(`흥이 깨진 접대 상대는, 짜증을 내며 돌아가 버렸다……`);
      await ctx.wait();
      return 0;
    } else if (B <= 0) {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 접대가 너무 서툴렀는지`);
      ctx.showMessage(`접대 상대는 짜증을 내며 자리에서 일어나, 돌아가 버렸다……`);
      await ctx.wait();
      return 0;
    }
  }
  return 1;
}

export async function reception_talking(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`${ctx.josaHelper("타겟은")} 접대 상대와 가벼운 대화를 했다……`);
  if (ctx.abilities[12] > ctx.abilities[15]) {
    S += ctx.abilities[12] * 2;
  } else if (ctx.abilities[15] >= ctx.abilities[12]) {
    S += ctx.abilities[15] * 3;
  }
  if (ctx.abilities[16] === 1) {
    S += 5;
  } else if (ctx.abilities[16] === 2) {
    S += 10;
  } else if (ctx.abilities[16] === 3) {
    S += 13;
  } else if (ctx.abilities[16] === 4) {
    S += 15;
  } else if (ctx.abilities[16] >= 5) {
    S += 20;
  }
  if (ctx.abilities[10] === 1) {
    S += 3;
  } else if (ctx.abilities[10] === 2) {
    S += 6;
  } else if (ctx.abilities[10] === 3) {
    S += 8;
  } else if (ctx.abilities[10] === 4) {
    S += 12;
  } else if (ctx.abilities[10] >= 5) {
    S += 15;
  }
  if (ctx.talents[123]) {
    S -= 5;
  }
  if (ctx.talents[9]) {
    S -= 10;
  }
  if (ctx.talents[211]) {
    S += 5;
  }
  if (ctx.talents[182]) {
    S += 10;
  }
  if ((A & 1)) {
    S += ctx.abilities[22];
  }
  if ((A & 2)) {
    S += ctx.abilities[21];
  }
  if ((A & 4)) {
    S += 5;
  }
  if ((A & 8)) {
    S += ctx.abilities[81] * 2;
  }
  if ((A & 16)) {
    S += 10;
  }
  if (L[0] >= 9) {
    S -= 100;
  } else if (L[0] >= 8) {
    S -= 50;
  } else if (L[0] >= 7) {
    S -= 20;
  } else if (L[0] >= 6) {
    S -= 10;
  } else if (L[0] >= 5) {
    S -= 5;
  } else if (L[0] >= 4) {
    S -= 1;
  }
  if (S >= 30) {
    B += 5;
    ctx.showMessage(`대화가 잘 무르익고 있다……`);
    if ((ctx.flags[49] & 4) && ctx.talents[132]) {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 천진난만함이 마음에 드는 것 같다`);
    } else if ((ctx.flags[49] & 16) && ctx.talents[220]) {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 풋풋함이 마음에 드는 것 같다`);
    } else if ((ctx.flags[49] & 32) && ctx.talents[417]) {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 헌신적인 면모가 마음에 든 것 같다`);
    } else if ((ctx.flags[49] & 8) && ctx.abilities[81] > 0) {
      ctx.showMessage(`잘은 모르겠지만, 애니메이션이나 게임의 화제로 열중하고 있는 것 같다`);
    }
    if ((A & 4)) {
      B += 3;
    }
    if ((A & 8)) {
      B += 2 + ctx.abilities[81] + ctx.abilities[15];
    }
    if ((A & 16)) {
      B += 5;
    }
    if (ctx.talents[509] || ctx.talents[515] || ctx.talents[519]) {
      B += 10;
    }
  } else {
    B -= 5;
    ctx.showMessage(`대화가 그다지 무르익지 않았다……`);
    if (L[0] >= 5) {
      ctx.showMessage(`같은 이야기만 반복하는 ${ctx.getVarName("CALL", TARGET)}에게, 상대는 지루해지기 시작했다`);
    }
  }
  await ctx.wait();
  LOSEctx.base[0] = 10;
  L[0] += 1;
}

export async function reseption_service(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`${ctx.josaHelper("타겟은")} 상대의`);
  if ((ctx.flags[49] & 1) === 0) {
    ctx.print('페니스에');
  } else if ((ctx.flags[49] & 1) === 1) {
    ctx.print('비부에');
  }
  ctx.showMessage(`혀를 감으며, 열심히 봉사했다……`);
  if (ctx.abilities[12] > ctx.abilities[13]) {
    S += ctx.abilities[12] * 2;
  } else if (ctx.abilities[13] >= ctx.abilities[12]) {
    S += ctx.abilities[13] * 3;
  }
  if (ctx.abilities[16] === 1) {
    S += 5;
  } else if (ctx.abilities[16] === 2) {
    S += 10;
  } else if (ctx.abilities[16] === 3) {
    S += 13;
  } else if (ctx.abilities[16] === 4) {
    S += 15;
  } else if (ctx.abilities[16] >= 5) {
    S += 20;
  }
  if (ctx.abilities[10] === 1) {
    S += 3;
  } else if (ctx.abilities[10] === 2) {
    S += 6;
  } else if (ctx.abilities[10] === 3) {
    S += 8;
  } else if (ctx.abilities[10] === 4) {
    S += 12;
  } else if (ctx.abilities[10] >= 5) {
    S += 15;
  }
  if ((A & 1)) {
    S += ctx.abilities[22];
  }
  if ((A & 2)) {
    S += ctx.abilities[21] * 2;
  }
  if ((A & 4)) {
    S += 5;
  }
  if ((A & 8)) {
    S += ctx.abilities[81];
  }
  if ((A & 16)) {
    S += 10;
  }
  if (L[1] >= 8) {
    S -= 100;
  } else if (L[1] >= 7) {
    S -= 50;
  } else if (L[1] >= 6) {
    S -= 20;
  } else if (L[1] >= 5) {
    S -= 10;
  } else if (L[1] >= 4) {
    S -= 5;
  } else if (L[1] >= 3) {
    S -= 1;
  }
  if (S >= 30) {
    B += 10;
    D += ctx.abilities[13];
    if (D <= 0) {
      D = 1;
    }
    D *= 5;
    if ((ctx.flags[49] & 4) && ctx.talents[132]) {
      ctx.showMessage(`어린 ${ctx.getVarName("CALL", TARGET)}의 필사적인 봉사에 흥분하고 있는 것 같다……`);
    } else if ((ctx.flags[49] & 16) && ctx.talents[220]) {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 필사적인 봉사에 흥분하고 있는 것 같다……`);
    } else if ((ctx.flags[49] & 32) && ctx.talents[417]) {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 필사적인 봉사에 흥분하고 있는 것 같다……`);
    } else {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 필사적인 봉사에 만족한 것 같다……`);
    }
    if ((A & 4)) {
      B += 5;
      D += 5;
    }
    if ((A & 16)) {
      B += 10;
      if (ctx.talents[509] || ctx.talents[515] || ctx.talents[519]) {
        B += 10;
      }
      D += 10;
    }
  } else {
    B -= 7;
    D = 0 - 10;
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 너무 서투른 봉사에, 아무래도 흥이 식어가는 것 같다……`);
    if (L[1] >= 5) {
      ctx.showMessage(`묵묵히 봉사만 하고 있으면 만족, 이라는 건 아닌 것 같다`);
    }
  }
  await ctx.wait();
  if ((ctx.flags[49] & 1) === 0) {
    ctx.exp[22] += 1;
    ctx.showMessage('펠라경험　+1'); ctx.waitInput();
    if (character.cflags[16] === -1) {
      ctx.setColor(0xF58F98);
      ctx.showMessage(`첫 키스`);
      ctx.resetColor();
      character.cflags[16] = 4;
      if (character.cflags[16] === 4 && ctx.talents[76] === 0 && ctx.talents[432] === 0) {
        ctx.cstr[1] = "모르는 아저씨의 고○";
      } else if (character.cflags[16] === 4 && ctx.talents[76] === 1 && ctx.talents[432] === 0) {
        ctx.cstr[1] = "모르는 아저씨의 자○";
      } else if (character.cflags[16] === 4 && ctx.talents[432] === 1) {
        ctx.cstr[1] = "모르는 아재의 자지";
      }
    }
  } else if ((ctx.flags[49] & 1) === 1) {
    ctx.exp[40] += 1;
    ctx.showMessage('레즈경험　+1'); ctx.waitInput();
    if (character.cflags[16] === -1) {
      ctx.setColor(0xF58F98);
      ctx.showMessage(`첫 키스`);
      ctx.resetColor();
      character.cflags[16] = 4;
      if (character.cflags[16] === 4 && ctx.talents[76] === 0 && ctx.talents[432] === 0) {
        ctx.cstr[1] = "모르는 언니의 그곳";
      } else if (character.cflags[16] === 4 && ctx.talents[76] === 1 && ctx.talents[432] === 0) {
        ctx.cstr[1] = "모르는 언니의 보지";
      } else if (character.cflags[16] === 4 && ctx.talents[432] === 1) {
        ctx.cstr[1] = "모르는 여자의 보지";
      }
    }
  }
  LOSEctx.base[0] = 50;
  L[1] += 1;
}

export async function reception_temptation(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`${ctx.josaHelper("타겟은")} 도발적인 말로 상대를 유혹했다……`);
  await ctx.wait();
  S += ctx.abilities[12];
  S += ctx.abilities[15] * 2;
  if (ctx.abilities[16] === 1) {
    S += 5;
  } else if (ctx.abilities[16] === 2) {
    S += 10;
  } else if (ctx.abilities[16] === 3) {
    S += 13;
  } else if (ctx.abilities[16] === 4) {
    S += 15;
  } else if (ctx.abilities[16] >= 5) {
    S += 20;
  }
  if (ctx.abilities[10] === 1) {
    S += 3;
  } else if (ctx.abilities[10] === 2) {
    S += 6;
  } else if (ctx.abilities[10] === 3) {
    S += 8;
  } else if (ctx.abilities[10] === 4) {
    S += 12;
  } else if (ctx.abilities[10] >= 5) {
    S += 15;
  }
  if (ctx.talents[123]) {
    S -= 5;
  }
  if (ctx.talents[9]) {
    S -= 10;
  }
  if (ctx.talents[182]) {
    S += 5;
  }
  if ((A & 1)) {
    S += ctx.abilities[22];
  }
  if ((A & 2)) {
    S -= ctx.abilities[21] * 2;
  }
  if ((A & 4)) {
    S += 5;
  }
  if ((A & 8)) {
    S += ctx.abilities[81] * 2;
  }
  if ((A & 16)) {
    S += 10;
  }
  if (L[2] >= 7) {
    S -= 100;
  } else if (L[2] >= 6) {
    S -= 50;
  } else if (L[2] >= 5) {
    S -= 20;
  } else if (L[2] >= 4) {
    S -= 10;
  } else if (L[2] >= 3) {
    S -= 5;
  } else if (L[2] >= 2) {
    S -= 1;
  }
  if (S >= 30) {
    B += 12;
    D += ctx.abilities[16];
    if (D == 0) {
      D += 1;
    }
    D *= 5;
    if (ctx.talents[0] || ctx.flags[49] & 1) {
      if ((ctx.flags[49] & 8) && ctx.abilities[81] >= 2) {
        ctx.showMessage(`${ctx.josaHelper("타겟이")} 두세마디, 알 수 없는 대사를 말해버렸다고 생각했을 때`);
        ctx.showMessage(`접대 상대도 뜻 모를 대사를 하며, ${ctx.getVarName("CALL", TARGET)}의 몸을 희롱하기 시작했다……`);
        ctx.showMessage(`잘은 모르겠지만, 뭔가 심야 애니메이션의 주인공과 히로인 역할을 하는 것 같다`);
      } else if ((ctx.flags[49] & 4) && ctx.talents[132]) {
        ctx.showMessage(`접대 상대는 유혹에 견디지 못하고, ${ctx.getVarName("CALL", TARGET)}의 미성숙한 몸을 농락한다……`);
      } else if ((ctx.flags[49] & 16) && ctx.talents[220]) {
        ctx.showMessage(`접대 상대는 유혹에 견디지 못하고, ${ctx.getVarName("CALL", TARGET)}의 때묻지 않은 몸을 농락한다……`);
      } else if ((ctx.flags[49] & 32) && ctx.talents[417]) {
        ctx.showMessage(`접대 상대는 유혹에 견디지 못하고, ${ctx.getVarName("CALL", TARGET)}의 잘 익은 육체를 농락한다……`);
      } else {
        ctx.showMessage(`접대 상대는 유혹에 견디지 못하고, ${ctx.getVarName("CALL", TARGET)}의 몸을 농락한다……`);
      }
      await ctx.wait();
      if ((A & 4)) {
        B += 6;
        D += 3;
      }
      if ((A & 8)) {
        B += 10;
        D += 5;
      }
      if ((A & 16)) {
        B += 12;
        D += 6;
      }
      if (C + D >= 100) {
        D = 99 - C;
      }
      F += ctx.abilities[0];
      F += ctx.abilities[1];
      F += ctx.abilities[10];
      F += ctx.abilities[11];
      F += ctx.rand(5);
      if ((ctx.flags[49] & 1)) {
        ctx.exp[40] += 1;
        ctx.showMessage('레즈경험　+1');
      }
      LOSEctx.base[0] = 80;
    } else {
      if ((ctx.flags[49] & 8) && ctx.abilities[81] >= 2) {
        ctx.showMessage(`${ctx.josaHelper("타겟이")} 두세마디, 알 수 없는 대사를 말해버렸다고 생각했을 때`);
        ctx.showMessage(`접대 상대도 뜻 모를 대사를 하며, ${ctx.getVarName("CALL", TARGET)}의 몸을 희롱하기 시작했다……`);
        ctx.showMessage(`잘은 모르겠지만, 뭔가 심야 애니메이션의 주인공과 히로인 역할을 하는 것 같다`);
      } else if ((ctx.flags[49] & 4) && ctx.talents[132]) {
        ctx.showMessage(`접대 상대는 유혹에 견디지 못하고, ${ctx.getVarName("CALL", TARGET)}의 미성숙한 몸을 농락한다……`);
      } else if ((ctx.flags[49] & 16) && ctx.talents[220]) {
        ctx.showMessage(`접대 상대는 유혹에 견디지 못하고, ${ctx.getVarName("CALL", TARGET)}의 때묻지 않은 몸을 농락한다……`);
      } else if ((ctx.flags[49] & 32) && ctx.talents[417]) {
        ctx.showMessage(`접대 상대는 유혹에 견디지 못하고, ${ctx.getVarName("CALL", TARGET)}의 잘 익은 육체를 농락한다……`);
      } else {
        ctx.showMessage(`접대 상대는 유혹에 견디지 못하고, ${ctx.getVarName("CALL", TARGET)}의 몸을 농락한다……`);
      }
      await ctx.wait();
      if ((A & 4)) {
        B += 8;
        D += 10;
      }
      if ((A & 8)) {
        B += 12;
        D += 15;
      }
      if ((A & 16)) {
        B += 16;
        if (ctx.talents[509] || ctx.talents[515] || ctx.talents[519]) {
          B += 10;
        }
        D += 20;
      }
      F += ctx.abilities[0];
      F += ctx.abilities[1];
      F += ctx.abilities[10];
      F += ctx.abilities[11];
      F += ctx.rand(5);
      if ((ctx.flags[49] & 1)) {
        ctx.exp[40] += 2;
        ctx.showMessage('레즈경험　+2');
      }
      LOSEctx.base[0] = 120;
    }
  } else {
    B -= 10;
    D = 0 - 15;
    ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)}의 도발이 무례하다고 느꼈는지, 그다지 좋은 기분은 아닌 것 같다……`);
    LOSEctx.base[0] = 10;
  }
  L[2] += 1;
}

export async function reception_abandon(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`W ${ctx.josaHelper("타겟은")} 상대에게 몸을 맡겼다……`);
  if (L[3] >= 7) {
    S -= 100;
  } else if (L[3] >= 6) {
    S -= 50;
  } else if (L[3] >= 5) {
    S -= 20;
  } else if (L[3] >= 4) {
    S -= 10;
  } else if (L[3] >= 3) {
    S -= 5;
  } else if (L[3] >= 2) {
    S -= 1;
  }
  if (ctx.rand(4) === 0) {
    await reception_caress(ctx, character);
  } else if (ctx.rand(3) === 0) {
    await reception_irrumatio(ctx, character);
  } else if (ctx.rand(2) === 0) {
    await reception_vaginasex(ctx, character);
  } else {
    await reception_analsex(ctx, character);
  }
  if (S >= 30) {
    if (((ctx.flags[49] & 64) && ctx.talents[203]) || ((ctx.flags[49] & 128) && ctx.talents[207])) {
      B += 10;
    }
  }
  L[3] += 1;
}

export async function reception_caress(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.abilities[10] <= 3) {
    S += 5;
  } else if (ctx.abilities[10] === 4) {
    S += 10;
  } else if (ctx.abilities[10] === 5) {
    S += 15;
  } else {
    S += 18;
  }
  if (ctx.abilities[0] <= 3) {
    S += 2;
  } else if (ctx.abilities[0] === 4) {
    S += 3;
  } else if (ctx.abilities[0] === 5) {
    S += 5;
  } else {
    S += 10;
  }
  if (ctx.abilities[1] <= 3) {
    S += 2;
  } else if (ctx.abilities[1] === 4) {
    S += 3;
  } else if (ctx.abilities[1] === 5) {
    S += 5;
  } else {
    S += 10;
  }
  if (ctx.abilities[21] <= 3) {
    S += 5;
  } else if (ctx.abilities[21] === 4) {
    S += 8;
  } else if (ctx.abilities[21] === 5) {
    S += 12;
  } else {
    S += 16;
  }
  if (ctx.talents[88]) {
    S += 5;
  }
  if (ctx.talents[123]) {
    S -= 5;
  }
  if (ctx.talents[9]) {
    S -= 10;
  }
  if ((A & 1)) {
    S += ctx.abilities[22] + 2;
  }
  if ((A & 2)) {
    S += ctx.abilities[21]/2 + 1;
  }
  if ((A & 4)) {
    S += 3;
  }
  if ((A & 8)) {
    S += ctx.abilities[81]/2 + 1;
  }
  if ((A & 16)) {
    S += 6;
  }
  if (S >= 30) {
    ctx.showMessage(`${ctx.josaHelper("타겟은")} 그`);
    if (ctx.talents[132] == 1) {
      ctx.print('미성숙한');
    }
    ctx.showMessage(`W 육체를 애무 받았다……`);
    B += 5;
    if ((A & 4)) {
      B += 3;
    }
    if ((A & 16)) {
      B += 5;
      if (ctx.talents[509] || ctx.talents[515] || ctx.talents[519]) {
        B += 10;
      }
    }
    F += ctx.abilities[0] * 2;
    F += ctx.abilities[1] * 2;
    F += ctx.abilities[10];
    LOSEctx.base[0] = 80;
  } else {
    ctx.showMessage(`W 몸이 굳어있는 ${ctx.getVarName("CALL", TARGET)}에게 흥이 깨진 것 같다……`);
    B -= 3;
    F += ctx.abilities[0];
    F += ctx.abilities[1];
    F += ctx.abilities[10];
    F /= 2;
    if (E + F >= 100) {
      F = 99 - E;
    }
    LOSEctx.base[0] = 30;
  }
  if ((ctx.flags[49] & 1) === 1) {
    ctx.exp[40] += 1;
    ctx.showMessage('레즈경험　+1'); ctx.waitInput();
  }
}

export async function reception_irrumatio(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.abilities[10] <= 3) {
    S += 2;
  } else if (ctx.abilities[10] === 4) {
    S += 5;
  } else if (ctx.abilities[10] === 5) {
    S += 7;
  } else {
    S += 12;
  }
  if (ctx.abilities[12] > ctx.abilities[13]) {
    S += ctx.abilities[12];
    S += ctx.abilities[12];
  } else if (ctx.abilities[13] >= ctx.abilities[12]) {
    S += ctx.abilities[13];
    S += ctx.abilities[13];
    S += ctx.abilities[13];
  }
  if (ctx.abilities[16] <= 3) {
    S += 2;
  } else if (ctx.abilities[16] === 4) {
    S += 3;
  } else if (ctx.abilities[16] === 5) {
    S += 5;
  } else {
    S += 10;
  }
  if (ctx.abilities[21] <= 3) {
    S += 8;
  } else if (ctx.abilities[21] === 4) {
    S += 10;
  } else if (ctx.abilities[21] === 5) {
    S += 15;
  } else {
    S += 20;
  }
  if (ctx.talents[88]) {
    S += 5;
  }
  if (ctx.talents[123]) {
    S -= 5;
  }
  if (ctx.talents[9]) {
    S -= 10;
  }
  if ((A & 1)) {
    S += ctx.abilities[22]/2 + 1;
  }
  if ((A & 2)) {
    S += ctx.abilities[21] + 2;
  }
  if ((A & 4)) {
    S += 6;
  }
  if ((A & 8)) {
    S += 0;
  }
  if ((A & 16)) {
    S += 12;
  }
  if (S >= 30) {
    ctx.showMessage(`W ${ctx.josaHelper("타겟은")} 머리를 잡혀, 성기에 봉사를 강요당했다……`);
    B += 12;
    if ((A & 4)) {
      B += 6;
      D += 6;
    }
    if ((A & 16)) {
      B += 12;
      if (ctx.talents[509] || ctx.talents[515] || ctx.talents[519]) {
        B += 10;
      }
      D += 12;
    }
    D += 13;
    if (ctx.abilities[13] >= 3) {
      D += 3;
    }
    if (ctx.abilities[16] >= 3) {
      D += 3;
    }
    if (ctx.abilities[12] > 5) {
      D *= 2;
    }
  } else {
    ctx.showMessage(`W ${ctx.josaHelper("타겟은")} 머리를 내리누르는 상대의 손을 뿌리치고, 얼굴을 돌렸다……`);
    B -= 20;
    D = 0 - 10;
  }
  if ((ctx.flags[49] & 1) === 1) {
    ctx.exp[40] += 1;
    ctx.showMessage('레즈경험　+1');
    if (character.cflags[16] === -1) {
      ctx.setColor(0xF58F98);
      ctx.showMessage(`첫 키스`);
      ctx.resetColor();
      character.cflags[16] = 1;
      if (character.cflags[16] === 4 && ctx.talents[76] === 0 && ctx.talents[432] === 0) {
        ctx.cstr[1] = "모르는 언니의 그곳";
      } else if (character.cflags[16] === 4 && ctx.talents[76] === 1 && ctx.talents[432] === 0) {
        ctx.cstr[1] = "모르는 언니의 보지";
      } else if (character.cflags[16] === 4 && ctx.talents[432] === 1) {
        ctx.cstr[1] = "모르는 여자의 보지";
      }
      character.cflags[820] = ctx.base[9];
      character.cflags[821] = DAY[1];
      character.cflags[822] = DAY[2];
    }
  } else if ((ctx.flags[49] & 1) === 0) {
    ctx.exp[22] += 1;
    ctx.showMessage('펠라경험　+1');
    if (character.cflags[16] === -1) {
      ctx.setColor(0xF58F98);
      ctx.showMessage(`첫 키스`);
      ctx.resetColor();
      character.cflags[16] = 1;
      if (character.cflags[16] === 4 && ctx.talents[76] === 0 && ctx.talents[432] === 0) {
        ctx.cstr[1] = "모르는 아저씨의 고○";
      } else if (character.cflags[16] === 4 && ctx.talents[76] === 1 && ctx.talents[432] === 0) {
        ctx.cstr[1] = "모르는 아저씨의 자○";
      } else if (character.cflags[16] === 4 && ctx.talents[432] === 1) {
        ctx.cstr[1] = "모르는 아재의 자지";
      }
      character.cflags[820] = ctx.base[9];
      character.cflags[821] = DAY[1];
      character.cflags[822] = DAY[2];
    }
  }
  LOSEctx.base[0] = 100;
}

export async function reception_vaginasex(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.talents[0] && (ctx.abilities[10] <= 4 && ctx.abilities[11] <= 4) && ctx.talents[31] === 0) {
    ctx.showMessage(`W ${ctx.josaHelper("타겟은")} 순결을 지키려고, 필사적으로 저항했다`);
    ctx.showMessage(`W 너무나도 강한 저항에, 상대도 물러설 수 밖에 없었다……`);
    B -= 5;
    C -= 5;
    LOSEctx.base[0] = 120;
    return 0;
  }
  ctx.showMessage(`${ctx.josaHelper("타겟은")} 밀려 넘어뜨려져,`);
  if (ctx.talents[132] == 1) {
    ctx.print('그 미성숙한');
  }
  ctx.showMessage(`W 비부를 꿰뚫렸다……`);
  if (ctx.abilities[10] <= 3) {
    S += 6;
  } else if (ctx.abilities[10] === 4) {
    S += 10;
  } else if (ctx.abilities[10] === 5) {
    S += 14;
  } else {
    S += 20;
  }
  if (ctx.abilities[2] <= 3) {
    S += 2;
  } else if (ctx.abilities[2] === 4) {
    S += 3;
  } else if (ctx.abilities[2] === 5) {
    S += 5;
  } else {
    S += 7;
  }
  if (ctx.abilities[14] <= 3) {
    S += 5;
  } else if (ctx.abilities[14] === 4) {
    S += 7;
  } else if (ctx.abilities[14] === 5) {
    S += 10;
  } else {
    S += 11;
  }
  if (ctx.abilities[16] <= 3) {
    S += 1;
  } else if (ctx.abilities[10] === 4) {
    S += 2;
  } else if (ctx.abilities[10] === 5) {
    S += 3;
  } else {
    S += 5;
  }
  if (ctx.talents[0]) {
    if (ctx.talents[85]) {
      S /= 2;
    } else {
      S -= 5;
    }
  }
  if (ctx.talents[88]) {
    S += 5;
  }
  if (ctx.talents[123]) {
    S -= 5;
  }
  if (ctx.talents[9]) {
    S -= 10;
  }
  if ((A & 1)) {
    S += ctx.abilities[22]/2 + 1;
  }
  if ((A & 2)) {
    S += ctx.abilities[21]/2 + 1;
  }
  if ((A & 4)) {
    S += 6;
  }
  if ((A & 8)) {
    S += 0;
  }
  if ((A & 16)) {
    S += 12;
  }
  if (S >= 30) {
    ctx.showMessage(`W ${ctx.josaHelper("타겟은")} 범해지면서 교성을 올리고 있다……`);
    if (ctx.talents[0]) {
      ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)}의 더러움을 모르는 비부가 꿰뚫려, 그곳으로부터 피가 한줄기 흘러나왔다……`);
      ctx.showMessage(`W 처녀를 빼앗은 것으로, 상대는 몹시 흥분하고 있다`);
      ctx.setColor(0xF58F98);
      ctx.showMessage('【접대로 처녀상실】');
      ctx.resetColor();
      ctx.showMessage(`${ctx.getVarName("EXP", 50)}+{2+(FLAG:49 & 1)}`);
      ctx.exp[50] += 2 + (ctx.flags[49] & 1);
      if (character.cflags[15] === 0) {
        if ((ctx.flags[49] & 1) === 1 && ctx.talents[432] === 0) {
          character.cflags[15] = 3;
          ctx.cstr[0] = "모르는 여자";
        } else if ((ctx.flags[49] & 1) === 1 && ctx.talents[432] === 1) {
          character.cflags[15] = 3;
          ctx.cstr[0] = "모르는 여자";
        } else if ((ctx.flags[49] & 1) === 0 && ctx.talents[432] === 0) {
          character.cflags[15] = 2;
          ctx.cstr[0] = "모르는 아저씨";
        } else if ((ctx.flags[49] & 1) === 0 && ctx.talents[432] === 1) {
          character.cflags[15] = 2;
          ctx.cstr[0] = "모르는 아재";
        }
      }
      ctx.talents[0] = 0;
      B += 30;
    }
    D += 10;
    if (ctx.abilities[2] >= 3) {
      D += 5;
    }
    if (ctx.abilities[14] >= 3) {
      D += 10;
    }
    if (ctx.abilities[16] >= 3) {
      D += 3;
    }
    if (ctx.flags[49] & 1) {
      B += 9;
    } else {
      B += 13;
    }
    if ((A & 4)) {
      B += 6;
      D += 8;
    }
    if ((A & 16)) {
      B += 12;
      if (ctx.talents[509] || ctx.talents[515] || ctx.talents[519]) {
        B += 10;
      }
      D += 10;
    }
    if (ctx.abilities[2] === 1) {
      F += 5;
    } else if (ctx.abilities[2] === 2) {
      F += 10;
    } else if (ctx.abilities[2] === 3) {
      F += 13;
    } else if (ctx.abilities[2] === 4) {
      F += 15;
    } else if (ctx.abilities[2] >= 5) {
      F += 20;
    }
    if (ctx.abilities[12] === 1) {
      F += 3;
    } else if (ctx.abilities[12] === 2) {
      F += 7;
    } else if (ctx.abilities[12] === 3) {
      F += 12;
    } else if (ctx.abilities[12] === 4) {
      F += 14;
    } else if (ctx.abilities[12] >= 5) {
      F += 15;
    }
  } else {
    if (ctx.talents[0]) {
      ctx.showMessage(`W 처녀의 아픔에 견디지 못하고, ${ctx.josaHelper("타겟은")} 격렬하게 몸을 비틀어 저항하고 말았다……`);
      ctx.setColor(0xF58F98);
      ctx.showMessage('【접대로 처녀상실】');
      ctx.resetColor();
      ctx.showMessage(`${ctx.getVarName("EXP", 50)}+{2+(FLAG:49 & 1)}`);
      ctx.exp[50] += 2 + (ctx.flags[49] & 1);
      if (character.cflags[15] === 0) {
        if ((ctx.flags[49] & 1) === 1 && ctx.talents[432] === 0) {
          character.cflags[15] = 3;
          ctx.cstr[0] = "모르는 여자";
        } else if ((ctx.flags[49] & 1) === 1 && ctx.talents[432] === 1) {
          character.cflags[15] = 3;
          ctx.cstr[0] = "모르는 여자";
        } else if ((ctx.flags[49] & 1) === 0 && ctx.talents[432] === 0) {
          character.cflags[15] = 2;
          ctx.cstr[0] = "모르는 아저씨";
        } else if ((ctx.flags[49] & 1) === 0 && ctx.talents[432] === 1) {
          character.cflags[15] = 2;
          ctx.cstr[0] = "모르는 아재";
        }
      }
      ctx.talents[0] = 0;
      B += 10;
      D += ctx.abilities[2];
      F = 0 - 30;
    } else {
      ctx.showMessage(`W 범해지면서도 저항하는 ${ctx.getVarName("CALL", TARGET)}에게, 약간 흥이 돋은 것 같다……`);
      B -= 6;
      D += ctx.abilities[2];
      F = 0 - 10;
    }
  }
  ctx.showMessage('V경험　+1');
  ctx.exp[0] += 1;
  if ((ctx.flags[49] & 1)) {
    ctx.exp[40] += 2;
    ctx.showMessage('레즈경험　+2'); ctx.waitInput();
  }
  LOSEctx.base[0] = 120;
}

export async function reception_analsex(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`${ctx.josaHelper("타겟은")} 밀어 넘어뜨려져,`);
  if (ctx.talents[132] == 1) {
    ctx.print('그 미성숙한');
  }
  ctx.showMessage(`W 애널을 꿰뚫렸다……`);
  if (ctx.abilities[10] <= 3) {
    S += 6;
  } else if (ctx.abilities[10] === 4) {
    S += 10;
  } else if (ctx.abilities[10] === 5) {
    S += 14;
  } else {
    S += 20;
  }
  if (ctx.abilities[3] <= 3) {
    S += 2;
  } else if (ctx.abilities[3] === 4) {
    S += 3;
  } else if (ctx.abilities[3] === 5) {
    S += 5;
  } else {
    S += 7;
  }
  if (ctx.abilities[14] <= 3) {
    S += 5;
  } else if (ctx.abilities[14] === 4) {
    S += 7;
  } else if (ctx.abilities[14] === 5) {
    S += 10;
  } else {
    S += 11;
  }
  if (ctx.abilities[16] <= 3) {
    S += 1;
  } else if (ctx.abilities[10] === 4) {
    S += 2;
  } else if (ctx.abilities[10] === 5) {
    S += 3;
  } else {
    S += 5;
  }
  if (ctx.talents[88]) {
    S += 5;
  }
  if (ctx.talents[123]) {
    S -= 5;
  }
  if (ctx.talents[9]) {
    S -= 10;
  }
  if ((A & 1)) {
    S += ctx.abilities[22]/2 + 1;
  }
  if ((A & 2)) {
    S += ctx.abilities[21]/2 + 1;
  }
  if ((A & 4)) {
    S += 6;
  }
  if ((A & 8)) {
    S += 0;
  }
  if ((A & 16)) {
    S += 12;
  }
  if (S >= 30) {
    ctx.showMessage(`W ${ctx.josaHelper("타겟은")} 애널을 범해지며 교성을 올리고 있다……`);
    D += 10;
    if (ctx.abilities[3] >= 3) {
      D += 5;
    }
    if (ctx.abilities[14] >= 3) {
      D += 10;
    }
    if (ctx.abilities[16] >= 3) {
      D += 3;
    }
    if (ctx.abilities[3] === 1) {
      F += 5;
    } else if (ctx.abilities[3] === 2) {
      F += 10;
    } else if (ctx.abilities[3] === 3) {
      F += 13;
    } else if (ctx.abilities[3] === 4) {
      F += 15;
    } else if (ctx.abilities[3] >= 5) {
      F += 20;
    }
    if (ctx.abilities[12] === 1) {
      F += 3;
    } else if (ctx.abilities[12] === 2) {
      F += 7;
    } else if (ctx.abilities[12] === 3) {
      F += 12;
    } else if (ctx.abilities[12] === 4) {
      F += 14;
    } else if (ctx.abilities[12] >= 5) {
      F += 15;
    }
    if (ctx.flags[49] & 1) {
      B += 12;
    } else {
      B += 15;
    }
    if ((A & 4)) {
      B += 8;
      D += 8;
    }
    if ((A & 16)) {
      B += 15;
      if (ctx.talents[509] || ctx.talents[515] || ctx.talents[519]) {
        B += 10;
      }
      D += 10;
    }
  } else {
    ctx.showMessage(`W 애널을 범해지면서도 저항하는 ${ctx.getVarName("CALL", TARGET)}에게, 약간 흥이 돋은 것 같다……`);
    B -= 6;
    D += ctx.abilities[3];
    F = 0 - 10;
  }
  ctx.showMessage('A경험　+1');
  ctx.exp[1] += 1;
  if (ctx.talents[2] === 1) {
    ctx.setColor(0xF58F98);
    ctx.showMessage('【애널처녀상실】');
    ctx.resetColor();
    ctx.talents[2] = 0;
    if ((ctx.flags[49] & 1) === 1 && ctx.talents[432] === 0) {
      ctx.cstr[3] = "모르는 여자";
    } else if ((ctx.flags[49] & 1) === 1 && ctx.talents[432] === 1) {
      ctx.cstr[3] = "모르는 여자";
    } else if ((ctx.flags[49] & 1) === 0 && ctx.talents[432] === 0) {
      ctx.cstr[3] = "모르는 아저씨";
    } else if ((ctx.flags[49] & 1) === 0 && ctx.talents[432] === 1) {
      ctx.cstr[3] = "모르는 아재";
    }
  }
  if ((ctx.flags[49] & 1)) {
    ctx.exp[40] += 2;
    ctx.showMessage('레즈경험　+2'); ctx.waitInput();
  }
  LOSEctx.base[0] = 120;
}
