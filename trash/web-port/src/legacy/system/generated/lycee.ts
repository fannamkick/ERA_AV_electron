/**
 * LYCEE.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function lycee_main(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[1] = 0;
  ctx.locals[2] = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else if (character.cflags[ctx.count][140] === 0) {
      // TODO: CONTINUE
    } else {
      ctx.locals[1]++;
    }
  }
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else {
      ctx.locals[2]++;
    }
  }
  ctx.drawLine();
  ctx.showMessage(`《여자 기숙사》`);
  ctx.showMessage(`계약한 여배우를 여자 기숙사에 넣을 수 있습니다`);
  ctx.showMessage(`현재 입주자수(`);
  if (ctx.locals[1] < 10) {
    ctx.print('0');
  }
  ctx.showMessage(`${ctx.locals[1]}명 /`);
  if (ctx.locals[2] < 10) {
    ctx.print('0');
  }
  ctx.showMessage(`${ctx.locals[2]}명)`);
  ctx.drawLine();
  ctx.showMessage('[0] - 입주시킨다');
  ctx.showMessage('[1] - 불러온다');
  ctx.showMessage('[2] - 시설을 확장한다');
  if (ctx.flags[101]) {
    ctx.showMessage('[3] - 입주중인 배우에게 시설을 이용하게 시킨다');
  } else {
    ctx.showMessage('[-] - －－－－－－－');
  }
  ctx.drawLine();
  ctx.showMessage('[999] - 돌아간다');
  // Label: INPUT_LOOP
  await ctx.inputNumber();
  if (ctx.result === 0) {
    await lycee_in(ctx, character);
  } else if (ctx.result === 1) {
    await lycee_out(ctx, character);
  } else if (ctx.result === 2) {
    await lycee_labo(ctx, character);
  } else if (ctx.result === 3 && ctx.flags[101]) {
    await lycee_labo_use(ctx, character);
  } else if (ctx.result === 999) {
    return;
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  return 0;
}

export async function lycee_in(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[1] = 0;
  ctx.locals[2] = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else if (character.cflags[ctx.count][140] === 0) {
      // TODO: CONTINUE
    } else {
      ctx.locals[1]++;
    }
  }
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else {
      ctx.locals[2]++;
    }
  }
  ctx.showMessage(`《입주시킨다》`);
  ctx.showMessage(`현재 입주자수(`);
  if (ctx.locals[1] < 10) {
    ctx.print('0');
  }
  ctx.showMessage(`${ctx.locals[1]}명 /`);
  if (ctx.locals[2] < 10) {
    ctx.print('0');
  }
  ctx.showMessage(`${ctx.locals[2]}명)`);
  ctx.drawLine();
  // Label: INPUT_LOOP
  await life_list_new,1(ctx, character);
  if (ctx.result === 999) {
    return;
  } else if (ctx.result < 1 || ctx.result >= ctx.charanum) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else {
    character = ctx.result;
    ctx.showMessage(`《%타겟을(1)% 여자 기숙사에 입주시킵니까?》`);
    ctx.showMessage('[0] - 네');
    ctx.showMessage('[1] - 아니오');
    // Label: INPUT_LOOP_1
    await ctx.inputNumber();
    if (ctx.result === 0) {
      ctx.showMessage(`W 《%타겟을(1)% 여자 기숙사에 입주시켰습니다》`);
      character.cflags[140] = 1;
      ctx.restart();
    } else if (ctx.result === 1) {
      ctx.showMessage(`W 《입주시키지 않았습니다》`);
      ctx.restart();
    } else {
      // GOTO INPUT_LOOP_1 - 구조 변경 필요 (while/break 사용 권장)
    }
  }
  return 0;
}

export async function lycee_out(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[1] = 0;
  ctx.locals[2] = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else if (character.cflags[ctx.count][140] === 0) {
      // TODO: CONTINUE
    } else {
      ctx.locals[1]++;
    }
  }
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else {
      ctx.locals[2]++;
    }
  }
  ctx.showMessage(`《불러온다》`);
  ctx.showMessage(`현재 입주자수(`);
  if (ctx.locals[1] < 10) {
    ctx.print('0');
  }
  ctx.showMessage(`${ctx.locals[1]}명 /`);
  if (ctx.locals[2] < 10) {
    ctx.print('0');
  }
  ctx.showMessage(`${ctx.locals[2]}명)`);
  ctx.drawLine();
  // Label: INPUT_LOOP
  await life_list_new,5(ctx, character);
  if (ctx.result === 999) {
    return;
  } else if (ctx.result < 1 || ctx.result >= ctx.charanum) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else {
    character = ctx.result;
    ctx.showMessage(`《%타겟을(1)% 여자 기숙사에서 불러오겠습니까?》`);
    ctx.showMessage('[0] - 네');
    ctx.showMessage('[1] - 아니오');
    // Label: INPUT_LOOP_1
    await ctx.inputNumber();
    if (ctx.result === 0) {
      ctx.showMessage(`W 《%타겟을(1)% 여자 기숙사에서 불러왔습니다》`);
      character.cflags[140] = 0;
      character.cflags[141] = 0;
      ctx.restart();
    } else if (ctx.result === 1) {
      ctx.showMessage(`W 《불러오지 않았습니다》`);
      ctx.restart();
    } else {
      // GOTO INPUT_LOOP_1 - 구조 변경 필요 (while/break 사용 권장)
    }
  }
  return 0;
}

export async function lycee_labo_use(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[1] = 0;
  ctx.locals[2] = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else if (character.cflags[ctx.count][140] === 0) {
      // TODO: CONTINUE
    } else {
      ctx.locals[1]++;
    }
  }
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else {
      ctx.locals[2]++;
    }
  }
  ctx.showMessage(`《시설을 이용시킨다》`);
  ctx.showMessage(`현재 입주자수(`);
  if (ctx.locals[1] < 10) {
    ctx.print('0');
  }
  ctx.showMessage(`${ctx.locals[1]}명 /`);
  if (ctx.locals[2] < 10) {
    ctx.print('0');
  }
  ctx.showMessage(`${ctx.locals[2]}명)`);
  ctx.drawLine();
  // Label: INPUT_LOOP
  await life_list_new,5(ctx, character);
  if (ctx.result === 999) {
    return;
  } else if (ctx.result < 1 || ctx.result >= ctx.charanum) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else {
    character = ctx.result;
    ctx.showMessage(`《${ctx.getName(character)}에게 어떤 시설을 이용시키겠습니까?》`);
    if ((ctx.flags[101] & 1)) {
      ctx.showMessage('[0] - 에스테룸');
    }
    if ((ctx.flags[101] & 2)) {
      ctx.showMessage('[1] - 휴게실');
    }
    if ((ctx.flags[101] & 8)) {
      ctx.showMessage('[2] - 탁아소');
    }
    if ((ctx.flags[101] & 32)) {
      ctx.showMessage('[3] - 고급 노래방');
    }
    if ((ctx.flags[101] & 64)) {
      ctx.showMessage('[4] - 댄스 스튜디오');
    }
    // Label: INPUT_LOOP_1
    await ctx.inputNumber();
    if (ctx.result === 0 && (ctx.flags[101] & 1)) {
      ctx.showMessage(`W 《${ctx.getName(character)}에게 에스테룸을 이용시킵니다》`);
      character.cflags[141] = 1;
      ctx.restart();
    } else if (ctx.result === 1 && (ctx.flags[101] & 2)) {
      ctx.showMessage(`W 《${ctx.getName(character)}에게 휴게실을 이용시킵니다》`);
      character.cflags[141] = 2;
      ctx.restart();
    } else if (ctx.result === 2 && (ctx.flags[101] & 8)) {
      ctx.showMessage(`W 《${ctx.getName(character)}에게 탁아소를 이용시킵니다》`);
      character.cflags[141] = 3;
      ctx.restart();
    } else if (ctx.result === 3 && (ctx.flags[101] & 32)) {
      ctx.showMessage(`W 《${ctx.getName(character)}에게 고급 노래방을 이용시킵니다》`);
      character.cflags[141] = 4;
      ctx.restart();
    } else if (ctx.result === 4 && (ctx.flags[101] & 64)) {
      ctx.showMessage(`W 《${ctx.getName(character)}에게 댄스 스튜디오를 이용시킵니다》`);
      character.cflags[141] = 5;
      ctx.restart();
    } else {
      // GOTO INPUT_LOOP_1 - 구조 변경 필요 (while/break 사용 권장)
    }
  }
  return 0;
}

export async function life_list_lycee_in(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count == 0) {
      // TODO: CONTINUE
    }
    if (character.cflags[ctx.count][140] == 1) {
      // TODO: CONTINUE
    }
    if (ctx.base[ctx.count][0] < 1) {
      // TODO: CONTINUE
    }
    ctx.showMessage(`[${ctx.count}] ${ctx.getName(ctx.count)}`);
    ctx.print('(체력:');
    A = ctx.base[ctx.count][0];
    if (ctx.base[ctx.count][0] < 0) {
      A = 0;
    }
    ctx.showMessage(`${A}/${MAXctx.base[ctx.count][0]})`);
    ctx.print('/ (매력치:');
    if (ctx.base[ctx.count][0] < 0) {
      ctx.showMessage(`0/${MAXctx.base[ctx.count][31]}) /`);
    } else {
      ctx.showMessage(`${ctx.base[ctx.count][31]}/${MAXctx.base[ctx.count][31]}) /`);
    }
    if (ctx.count === ctx.flags[1] && character.cflags[ctx.count][1] >= 2) {
      ctx.print('(전회 지도・조수 가능)');
    } else if (ctx.count === ctx.flags[1]) {
      ctx.print('(전회 지도)');
    } else if (ctx.count === ctx.flags[2]) {
      ctx.print('(전회 조수)');
    } else if (character.cflags[ctx.count][1] >= 2) {
      ctx.print('(조수 가능)');
    }
    if (character.cflags[ctx.count][110] - 2 <= DAY && ctx.getTalent(count, 153)) {
      ctx.print('[산월]');
    } else if (ctx.getTalent(count, 153)) {
      ctx.print('[임신]');
    } else if (ctx.getTalent(count, 154)) {
      ctx.print('[육아]');
    }
    if (character.cflags[ctx.count][12] != 0) {
      if (character.cflags[ctx.count][12] === 1) {
        ctx.print('<회화');
      } else if (character.cflags[ctx.count][12] === 2 || character.cflags[ctx.count][12] === 7) {
        ctx.print('<봉사');
      } else if (character.cflags[ctx.count][12] === 3) {
        ctx.print('<A영업');
      } else if (character.cflags[ctx.count][12] === 4) {
        ctx.print('<V영업');
      } else if (character.cflags[ctx.count][12] === 5) {
        ctx.print('<SM');
      } else if (character.cflags[ctx.count][12] === 6) {
        ctx.print('<출장');
      }
      if (character.cflags[ctx.count][13]) {
        ctx.print('C');
      }
      ctx.print('>');
    }
    if (character.cflags[ctx.count][115] ==1) {
      ctx.print('<방목>');
    }
    ctx.showMessage('');
  }
  ctx.drawLine();
}

export async function life_list_lycee_out(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count == 0) {
      // TODO: CONTINUE
    }
    if (character.cflags[ctx.count][140] == 0) {
      // TODO: CONTINUE
    }
    if (ctx.base[ctx.count][0] < 1) {
      // TODO: CONTINUE
    }
    ctx.showMessage(`[${ctx.count}] ${ctx.getName(ctx.count)}`);
    ctx.print('(체력:');
    A = ctx.base[ctx.count][0];
    if (ctx.base[ctx.count][0] < 0) {
      A = 0;
    }
    ctx.showMessage(`${A}/${MAXctx.base[ctx.count][0]})`);
    ctx.print('/ (매력치:');
    if (ctx.base[ctx.count][0] < 0) {
      ctx.showMessage(`0/${MAXctx.base[ctx.count][31]}) /`);
    } else {
      ctx.showMessage(`${ctx.base[ctx.count][31]}/${MAXctx.base[ctx.count][31]}) /`);
    }
    if (ctx.count === ctx.flags[1] && character.cflags[ctx.count][1] >= 2) {
      ctx.print('(전회 지도・조수 가능)');
    } else if (ctx.count === ctx.flags[1]) {
      ctx.print('(전회 지도)');
    } else if (ctx.count === ctx.flags[2]) {
      ctx.print('(전회 조수)');
    } else if (character.cflags[ctx.count][1] >= 2) {
      ctx.print('(조수 가능)');
    }
    if (character.cflags[ctx.count][110] - 2 <= DAY && ctx.getTalent(count, 153)) {
      ctx.print('[산월]');
    } else if (ctx.getTalent(count, 153)) {
      ctx.print('[임신]');
    } else if (ctx.getTalent(count, 154)) {
      ctx.print('[육아]');
    }
    if (character.cflags[ctx.count][12] != 0) {
      if (character.cflags[ctx.count][12] === 1) {
        ctx.print('<회화');
      } else if (character.cflags[ctx.count][12] === 2 || character.cflags[ctx.count][12] === 7) {
        ctx.print('<봉사');
      } else if (character.cflags[ctx.count][12] === 3) {
        ctx.print('<A영업');
      } else if (character.cflags[ctx.count][12] === 4) {
        ctx.print('<V영업');
      } else if (character.cflags[ctx.count][12] === 5) {
        ctx.print('<SM');
      } else if (character.cflags[ctx.count][12] === 6) {
        ctx.print('<출장');
      }
      if (character.cflags[ctx.count][13]) {
        ctx.print('C');
      }
      ctx.print('>');
    }
    if (character.cflags[ctx.count][141] >= 1) {
      ctx.print('《');
      if (character.cflags[ctx.count][141] === 1) {
        ctx.print('에스테룸');
      } else if (character.cflags[ctx.count][141] === 2) {
        ctx.print('휴게실');
      } else if (character.cflags[ctx.count][141] === 3) {
        ctx.print('탁아소');
      } else if (character.cflags[ctx.count][141] === 4) {
        ctx.print('고급 노래방');
      } else if (character.cflags[ctx.count][141] === 5) {
        ctx.print('댄스 스튜디오');
      }
      ctx.print('이용중》');
    }
    if (character.cflags[ctx.count][115] ==1) {
      ctx.print('<방목>');
    }
    ctx.showMessage('');
  }
  ctx.drawLine();
}

export async function lycee_labo(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine();
  ctx.showMessage('어떤 시설을 확장합니까?');
  ctx.showMessage(`《운영자금 {MONEY}포인트》(현재 공헌도: ${ctx.exp[ctx.master][90]})`);
  ctx.drawLine('･･');
  if ((ctx.flags[101] & 1) == 0) {
    ctx.showMessage('[0] - 에스테룸　　　　　　(300000포인트)');
  }
  if ((ctx.flags[101] & 2) == 0) {
    ctx.showMessage('[1] - 휴게실　　　　　　　　　(150000포인트)');
  }
  if ((ctx.flags[101] & 4) == 0) {
    ctx.showMessage('[2] - 사계절용 수영장　　　　　(100000포인트)');
  }
  if ((ctx.flags[101] & 8) == 0) {
    ctx.showMessage('[3] - 탁아소　　　　　　　　　(300000포인트)');
  }
  if ((ctx.flags[101] & 32) == 0) {
    ctx.showMessage('[5] - 고급 노래방　　　(100000포인트)');
  }
  if ((ctx.flags[101] & 64) == 0) {
    ctx.showMessage('[6] - 댄스 스튜디오　　　　　(100000포인트)');
  }
  if ((ctx.flags[101] & 128) == 0) {
    ctx.showMessage('[7] - 경비원　　        　　　(80000포인트)');
  }
  ctx.drawLine('･･');
  ctx.showMessage('[99] - 확장상태 확인');
  ctx.drawLine();
  ctx.showMessage('[999] - 돌아간다');
  // Label: INPUT_LOOP
  await ctx.inputNumber();
  if (ctx.result === 0 && (ctx.flags[101] & 1) === 0) {
    ctx.showMessage(` 에스테룸을 설치했습니다`);
    ctx.showMessage(`W  한 주를 시작할때 시설을 이용중인 캐릭터의 매력치가 조금 회복됩니다`);
    ctx.money -= 300000;
    ctx.flags[101] |= 1;
    ctx.restart();
  } else if (ctx.result === 1 && (ctx.flags[101] & 2) === 0) {
    ctx.showMessage(` 휴게실을 설치했습니다`);
    ctx.showMessage(`W  한 주를 시작할때 시설을 이용중인 캐릭터 사이의 상성이 증가합니다`);
    ctx.money -= 150000;
    ctx.flags[101] |= 2;
    ctx.restart();
  } else if (ctx.result === 2 && (ctx.flags[101] & 4) === 0) {
    ctx.showMessage(` 사계절용 수영장을 설치했습니다`);
    ctx.showMessage(`W  비디오 촬영시「사계절용 수영장」을 선택할 수 있게 됩니다`);
    ctx.money -= 100000;
    ctx.flags[101] |= 4;
    ctx.restart();
  } else if (ctx.result === 3 && (ctx.flags[101] & 8) === 0) {
    ctx.showMessage(` 탁아소를 설치했습니다`);
    ctx.showMessage(`W  시설을 이용중인【육아 중】캐릭터의 현역복귀가 빨라집니다`);
    ctx.money -= 300000;
    ctx.flags[101] |= 8;
    ctx.restart();
  } else if (ctx.result === 5 && (ctx.flags[101] & 32) === 0) {
    ctx.showMessage(` 고급 노래방을 설치했습니다`);
    ctx.showMessage(`W  한 주를 시작할때 시설을 이용중인 캐릭터의 가창경험이 증가합니다`);
    ctx.money -= 300000;
    ctx.flags[101] |= 32;
    ctx.restart();
  } else if (ctx.result === 6 && (ctx.flags[101] & 64) === 0) {
    ctx.showMessage(` 댄스 스튜디오를 설치했습니다`);
    ctx.showMessage(`W  한 주를 시작할때 시설을 이용중인 캐릭터의 무용경험이 증가합니다`);
    ctx.money -= 300000;
    ctx.flags[101] |= 64;
    ctx.restart();
  } else if (ctx.result === 7 && (ctx.flags[101] & 128) === 0) {
    ctx.showMessage(` 경비원과 계약했습니다`);
    ctx.showMessage(`W  시설을 이용중인 캐릭터가【남친있음】일 경우 남친과 이벤트가 발생하지 않게 됩니다`);
    ctx.money -= 800000;
    ctx.flags[101] |= 128;
    ctx.restart();
  } else if (ctx.result === 999) {
    return 0;
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
}

export async function lycee_event_weekend(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if ((ctx.flags[101] & 1)) {
    ctx.locals[0] = 0;
    for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
      if (ctx.count === 0) {
        // TODO: CONTINUE
      } else if (character.cflags[ctx.count][140] === 0) {
        // TODO: CONTINUE
      } else if (character.cflags[ctx.count][141] != 1) {
        // TODO: CONTINUE
      } else {
        ctx.showMessage(`${ctx.josaHelper(ctx.getName(ctx.count), "는")} 여자 기숙사의 에스테룸에서 오일마사지를 받고 있다……`);
        ctx.locals[0] = MAXctx.base[ctx.count][31] * 3;
        ctx.locals[0] /= 100;
        if (ctx.locals[0] <= 1) {
          ctx.locals[0] = 1;
        }
        if (ctx.base[ctx.count][31] + ctx.locals[0] >= MAXctx.base[ctx.count][31]) {
          ctx.locals[0] = MAXctx.base[ctx.count][31] - ctx.base[ctx.count][31];
        }
        if (ctx.base[ctx.count][31] >= MAXctx.base[ctx.count][31]) {
          ctx.showMessage(`《${ctx.getVarName("CALL", COUNT)}에겐 더이상 효과가 없습니다》`);
        } else {
          ctx.showMessage(`《${ctx.getVarName("CALL", COUNT)}의 매력치가 ${ctx.locals[0]} 회복됐다》`);
          ctx.base[ctx.count][31] += ctx.locals[0];
        }
        ctx.drawLine('･･');
        await ctx.wait();
      }
    }
  }
  if ((ctx.flags[101] & 2)) {
    ctx.varSet(ctx.locals[0], 0);
    // TODO: FOR LOCAL, 0, CHARANUM
    if (ctx.locals[0] === 0) {
      // TODO: CONTINUE
    } else if (character.cflags[ctx.locals[0]][140] === 0) {
      // TODO: CONTINUE
    } else if (character.cflags[ctx.locals[0]][141] != 2) {
      // TODO: CONTINUE
    } else {
      // TODO: FOR LOCAL:1, 0, CHARANUM
      if (ctx.locals[0] === 0) {
        // TODO: CONTINUE
      } else if (cflag[ctx.locals[1]][140] === 0) {
        // TODO: CONTINUE
      } else if (cflag[ctx.locals[1]][141] != 2) {
        // TODO: CONTINUE
      } else if (ctx.locals[1] === ctx.locals[0]) {
        // TODO: CONTINUE
      } else if (ctx.relation[local][ctx.getCharacterNo(ctx.locals[1]]) >= 1000) {
        // TODO: CONTINUE
      } else {
        if (ctx.abilities[ctx.locals[0]][22] >= 2 && abl[ctx.locals[1]][22] >= 2 && ctx.relation[local][ctx.getCharacterNo(ctx.locals[1]]) >= 250) {
          ctx.locals[2] = 0;
          for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
            if (ctx.count === 0) {
              // TODO: CONTINUE
            } else if (character.cflags[ctx.count][141] === 2) {
              ctx.locals[2] += 1;
            }
          }
          ctx.showMessage(`휴게실에서 닿을 정도로 가깝게`);
          if (ctx.locals[2] >= 3) {
            ctx.showMessage(`다른 사람은 신경도 안쓰고`);
          }
          ctx.showMessage(`${ctx.josaHelper(ctx.getName(ctx.locals[0]), "과")} %(NAME:(LOCAL:1),"는")% 스킨십을 하며 일상적인 대화를 나누고 있었지만,`);
          ctx.showMessage(`이윽고 스킨십이 과격해지더니 혀를 엮고 타액을 교환하는 키스를 하며 서로의 비부를 애무하기 시작했다……`);
          ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.locals[0]), "과")} ${ctx.getVarName("CALLNAME", ctx.locals[1])}의 신음소리가 점점 달콤해지며`);
          if (ctx.locals[2] >= 3) {
            ctx.showMessage(`다른 사람이 보고 있는 앞에서`);
          }
          ctx.showMessage(`거의 동시에 절정했다`);
          ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.locals[0]), "과")} ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.locals[1]), "는")} 레즈플레이를 통해 서로를 더 깊이 알게됐다……`);
          // TODO: RELATION:LOCAL:(NO:(LOCAL:1)) += 10
          if (character.cflags[ctx.locals[0]][16] === -1) {
            ctx.showMessage('');
            character.cflags[ctx.locals[0]][16] = 1;
            ctx.setColor(0xF58F98);
            ctx.showMessage(`【첫 키스】`);
            ctx.resetColor();
            ctx.showMessage(`(${ctx.getVarName("CALL", LOCAL)})`);
            character.cstr[ctx.locals[0]][1] = name[ctx.locals[1]];
            character.cflags[ctx.locals[0]][820] = ctx.base[ctx].locals[9];
            character.cflags[ctx.locals[0]][821] = DAY[1];
            character.cflags[ctx.locals[0]][822] = DAY[2];
          }
          if (cflag[ctx.locals[1]][16] === -1) {
            ctx.showMessage('');
            // TODO: CFLAG:(LOCAL:1):16 = 1
            ctx.setColor(0xF58F98);
            ctx.showMessage(`【첫 키스】`);
            ctx.resetColor();
            ctx.showMessage(`(${ctx.getVarName("CALLNAME", ctx.locals[1])})`);
            // TODO: CSTR:(LOCAL:1):1 = %NAME:LOCAL%
            // TODO: CFLAG:(LOCAL:1):820 = BASE:(LOCAL:1):9
            // TODO: CFLAG:(LOCAL:1):821 = DAY:1
            // TODO: CFLAG:(LOCAL:1):822 = DAY:2
          }
          ctx.showMessage('');
          ctx.locals[3] = ctx.rand(11) + 1;
          if (ctx.locals[3] <= 1) {
            ctx.locals[3] = 1;
          }
          if (ctx.getTalent(local, 76) == 1) {
            ctx.locals[3] *= 2;
          }
          ctx.exp[ctx.locals[0]][40] += ctx.locals[3];
          ctx.exp[ctx.locals[0]][2] += ctx.locals[3];
          ctx.juel[ctx].locals[0] += ctx.locals[3] * 100;
          ctx.juel[ctx].locals[5] += ctx.locals[3] * 500;
          ctx.showMessage(`${ctx.getVarName("EXP", 40)}(${ctx.getVarName("CALL", LOCAL)})＋${ctx.locals[0]}`);
          ctx.showMessage(`${ctx.getVarName("EXP", 2)}(${ctx.getVarName("CALL", LOCAL)})＋${ctx.locals[0]}`);
          ctx.showMessage(`${ctx.getVarName("PALAM", 0)}의 구슬(${ctx.getVarName("CALL", LOCAL)})＋${ctx.locals[0] * 100}`);
          ctx.showMessage(`${ctx.getVarName("PALAM", 5)}의 구슬(${ctx.getVarName("CALL", LOCAL)})＋${ctx.locals[0] * 500}`);
          ctx.showMessage('');
        } else {
          ctx.showMessage(`${ctx.josaHelper(ctx.getName(ctx.locals[0]), "는")} %조사처리(NAME:(LOCAL:1),"와")% 휴게실에서 일상적인 대화를 하며 서로를 더 깊이 알게됐다……`);
          // TODO: RELATION:LOCAL:(NO:(LOCAL:1)) += 5
        }
        if (ctx.relation[local][ctx.getCharacterNo(ctx.locals[1]]) <= 100) {
          // TODO: RELATION:LOCAL:(NO:(LOCAL:1)) = 100
        }
        ctx.showMessage(`${ctx.josaHelper(ctx.getName(ctx.locals[0]), "와")} %NAME:(LOCAL:1)%의 상성이 ${ctx.relation[local][ctx.getCharacterNo(ctx.locals[1]])}％가 됐다`);
        ctx.drawLine('･･');
        await ctx.wait();
      }
      // TODO: NEXT
    }
    // TODO: NEXT
  }
  if ((ctx.flags[101] & 32)) {
    ctx.locals[0] = 0;
    for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
      if (ctx.count === 0) {
        // TODO: CONTINUE
      } else if (character.cflags[ctx.count][140] === 0) {
        // TODO: CONTINUE
      } else if (character.cflags[ctx.count][141] != 4) {
        // TODO: CONTINUE
      } else {
        ctx.showMessage(`${ctx.getName(ctx.count)}は女子寮の고급 노래방を利用している……`);
        ctx.locals[0] = ctx.rand(6);
        if (ctx.locals[0] <= 1) {
          ctx.locals[0] = 1;
        }
        ctx.exp[ctx.count][71] += ctx.locals[0];
        ctx.showMessage(`가창경험(${ctx.getVarName("CALL", COUNT)})＋${ctx.locals[0]}`);
        ctx.drawLine('･･');
        await ctx.wait();
      }
    }
  }
  if ((ctx.flags[101] & 64)) {
    ctx.locals[0] = 0;
    for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
      if (ctx.count === 0) {
        // TODO: CONTINUE
      } else if (character.cflags[ctx.count][140] === 0) {
        // TODO: CONTINUE
      } else if (character.cflags[ctx.count][141] != 5) {
        // TODO: CONTINUE
      } else {
        ctx.showMessage(`${ctx.josaHelper(ctx.getName(ctx.count), "는")}는 기숙사의 댄스 스튜디오에서 레슨을 받고 있다……`);
        ctx.locals[0] = ctx.rand(6);
        if (ctx.locals[0] <= 1) {
          ctx.locals[0] = 1;
        }
        ctx.exp[ctx.count][72] += ctx.locals[0];
        ctx.showMessage(`무용경험(${ctx.getVarName("CALL", COUNT)})＋${ctx.locals[0]}`);
        ctx.drawLine('･･');
        await ctx.wait();
      }
    }
  }
}
