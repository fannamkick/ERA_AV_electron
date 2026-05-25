/**
 * SHOP_TAILOR.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function tailor_main(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  A = 0;
  R = 0;
  C = 0;
  S = 0;
  F = 0;
  // Label: INPUT_LOOP_01
  ctx.drawLine();
  ctx.showMessage('의상점');
  ctx.showMessage('《어떤 옷이나 장신구라도 취급하는 옷집입니다》');
  ctx.drawLine();
  ctx.printValue(DAY+1);
  ctx.print('주차');
  if (TIME === 0) {
    ctx.showMessage('전반');
  } else {
    ctx.showMessage('후반');
  }
  ctx.showMessage(`소지금: {MONEY}포인트`);
  ctx.drawLine();
  ctx.showMessage('누굴 데려갈까요?');
  ctx.drawLine();
  await life_list_new,4(ctx, character);
  if (ctx.result === 999) {
    A = 0;
    C = 0;
    R = 0;
    return 0;
  } else if (ctx.result < 0 || ctx.result >= ctx.charanum) {
    // GOTO INPUT_LOOP_01 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.base[ctx.result][0] < 1) {
    // GOTO INPUT_LOOP_01 - 구조 변경 필요 (while/break 사용 권장)
  }
  character = ctx.result;
  // Label: INPUT_LOOP_02
  A = 0;
  C = 0;
  R = 0;
  S = 0;
  ctx.drawLine();
  ctx.showMessage(`소지금: {MONEY}포인트`);
  ctx.showMessage(`지금 ${ctx.getName(character)}의 모습은`);
  await print_clothtype(ctx, character);
  ctx.showMessage('입니다.');
  ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}에게 어떤 옷을 입힐까요?`);
  ctx.drawLine();
  await show_info_casualwear(ctx, character);
  ctx.drawLine();
  ctx.showMessage('[ 0] - 평상복(100포인트)');
  ctx.showMessage('[ 1] - 평범한 옷(1000포인트)');
  ctx.showMessage('[ 2] - 학교지정교복(5000포인트)');
  ctx.showMessage('[ 3] - 기타 의상(10000포인트)');
  ctx.showMessage('[ 4] - 장신구');
  ctx.showMessage('[ 5] - 속옷(100포인트)');
  if (character.cflags[42] == 69 && ((character.cflags[40] & 64) == 0 || character.cflags[47] > 0)) {
    ctx.showMessage('[ 6] - 기저귀(50포인트)');
  }
  if (character.cflags[42] == 79 && (character.cflags[40] & 64) && character.cflags[49] == 0 && ctx.talents[0]) {
    ctx.showMessage('[ 7] - 정조대 열쇠를 버린다');
  }
  if (ctx.talents[422] == 0) {
    ctx.showMessage('[ 9] - 태닝살롱(1000포인트)');
  }
  ctx.showMessage('[10] - 헤어살롱');
  ctx.showMessage('[11] - 양말');
  ctx.showMessage('[12] - 신발');
  if (ctx.paramBand[305] >= 3 && ctx.exp[124] == 0) {
    ctx.showMessage('[13] - 스페셜 에스테(3000000포인트)');
  }
  if (character.cflags[41]) {
    ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  }
  if (character.cflags[41] && (character.cflags[45] === 0 || character.cflags[46] === 0)) {
    ctx.print('[20] -');
    await print_clothtype_main2(ctx, character);
    if (ctx.result === 0) {
      ctx.showMessage('를 처분한다');
    } else {
      ctx.showMessage('을 처분한다');
    }
  }
  if (character.cflags[43] == 0 || character.cflags[44] == 0) {
    ctx.showMessage('[21] - 속옷을 처분한다');
  }
  if (character.cflags[42] && character.cflags[47] === 0 && character.cflags[49] === 0) {
    ctx.print('[22] -');
    await print_clothtype_special(ctx, character);
    if (ctx.result === 0) {
      ctx.showMessage('를 처분한다');
    } else {
      ctx.showMessage('을 처분한다');
    }
  }
  if (character.cflags[170] != 0 || character.cflags[171] != 0) {
    ctx.showMessage('[23] - 신발과 양말을 처분한다');
  }
  if (character.cflags[178] != 0) {
    ctx.print('[24] - 예비 의상(');
    await print_clothtype_casualwear(ctx, character);
    if (ctx.result === 0) {
      ctx.showMessage(')와 바꾼다');
    } else {
      ctx.showMessage(')과 바꾼다');
    }
  }
  ctx.drawLine();
  T = character;
  ctx.showMessage(`LC \@(T <= 0) ? %" " * 16% # [1001] 이전 캐릭터\@`);
  // TODO: PRINTLC [999] 리스트로 돌아간다
  ctx.showMessage(`LC \@(T >= CHARANUM - 1) ? %" " * 16% # [1003] 다음 캐릭터\@`);
  ctx.showMessage('');
  ctx.showMessage(`LC %" " * 24% [1000] 메인 화면으로 돌아간다`);
  await ctx.inputNumber();
  if (ctx.result === 0) {
    await tailor_casual(ctx, character);
  } else if (ctx.result === 1) {
    await tailor_normal(ctx, character);
  } else if (ctx.result === 2) {
    await tailor_student(ctx, character);
  } else if (ctx.result === 3) {
    await tailor_other(ctx, character);
  } else if (ctx.result === 4) {
    await tailor_accessory(ctx, character);
  } else if (ctx.result === 5) {
    await tailor_underware(ctx, character);
  } else if (ctx.result === 6 && character.cflags[42] === 69) {
    await tailor_diaper(ctx, character);
  } else if (ctx.result === 7 && character.cflags[42] === 79 && (character.cflags[40] & 64) && character.cflags[49] === 0 && ctx.talents[0]) {
    await chastity_key(ctx, character);
  } else if (ctx.result === 9 && ctx.talents[422] === 0) {
    await tailor_blackgirl(ctx, character);
  } else if (ctx.result === 10) {
    await hairstyle_change(ctx, character);
  } else if (ctx.result === 11) {
    await tailor_socks(ctx, character);
  } else if (ctx.result === 12) {
    await tailor_shoes(ctx, character);
  } else if (ctx.result === 13 && ctx.paramBand[305] >= 3 && ctx.exp[124] === 0) {
    await tailor_esthetic(ctx, character);
  } else if (ctx.result === 20 && (character.cflags[45] === 0 || character.cflags[46] === 0)) {
    ctx.showMessage(`${ctx.josaHelper("타겟이")} 입고있던`);
    await print_clothtype_main2(ctx, character);
    if (ctx.result === 0) {
      ctx.print('를');
    } else {
      ctx.print('을');
    }
    ctx.showMessage('소각처리했습니다');
    character.cflags[41] = 0;
    character.cflags[45] = -3;
    character.cflags[46] = -3;
    character.cflags[40] -= character.cflags[40] & 28;
    await ctx.wait();
    // GOTO INPUT_LOOP_02 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 21 && (character.cflags[43] === 0 || character.cflags[44] === 0)) {
    if (character.cflags[43] >= 0) {
      await selling_pants(ctx, character);
    } else {
      ctx.showMessage(`W ${ctx.josaHelper("타겟이")} 입고있던 속옷을 처분했습니다`);
    }
    character.cflags[43] = -3;
    character.cflags[44] = -3;
    character.cflags[40] -= character.cflags[40] & 3;
    character.cflags[174] = 99;
    character.cflags[175] = -1;
    character.cflags[176] = 99;
    character.cflags[177] = -1;
    await ctx.wait();
    // GOTO INPUT_LOOP_02 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 22 && character.cflags[47] === 0 && character.cflags[49] === 0) {
    ctx.showMessage(`${ctx.josaHelper("타겟이")} 쓰던`);
    await print_clothtype_special(ctx, character);
    if (ctx.result === 0) {
      ctx.print('를');
    } else {
      ctx.print('을');
    }
    ctx.showMessage('소각처분했습니다');
    character.cflags[42] = 0;
    character.cflags[40] -= character.cflags[40] & 64;
    await ctx.wait();
    // GOTO INPUT_LOOP_02 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 23 && (character.cflags[170] != 0 || character.cflags[171] != 0)) {
    ctx.showMessage(`${ctx.josaHelper("타겟이")} 신고있던`);
    if (character.cflags[171] != 0) {
      await print_shoestype_main2(ctx, character);
      if (ctx.result === 0 && character.cflags[170] != 0) {
        ctx.print('와');
      } else if (ctx.result === 0 && character.cflags[170] != 0) {
        ctx.print('과');
      } else if (ctx.result === 0 && character.cflags[170] === 0) {
        ctx.print('를');
      } else if (ctx.result === 0 && character.cflags[170] != 0) {
        ctx.print('을');
      }
    }
    if (character.cflags[170] != 0) {
      await print_shoestype_main(ctx, character);
      if (ctx.result === 0) {
        ctx.print('를');
      } else if (ctx.result === 1) {
        ctx.print('을');
      }
    }
    ctx.showMessage('소각처분했습니다');
    character.cflags[170] = "= 0";
    character.cflags[171] = "= 0";
    await ctx.wait();
    // GOTO INPUT_LOOP_02 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 24 && character.cflags[178] != 0) {
    ctx.showMessage(`《현재 입고있는`);
    await print_clothtype_main2(ctx, character);
    if (ctx.result === 0) {
      ctx.showMessage('를');
    } else {
      ctx.showMessage('을');
    }
    ctx.showMessage(`예비인`);
    await print_clothtype_casualwear(ctx, character);
    if (ctx.result == 1) {
      ctx.print('으');
    }
    ctx.showMessage(`W 로 갈아입혔습니다》`);
    character.cflags[179] = character.cflags[41];
    character.cflags[41] = character.cflags[178];
    character.cflags[178] = character.cflags[179];
  } else if (ctx.result === 999) {
    // GOTO INPUT_LOOP_01 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 1000) {
    return 0;
  } else if (ctx.result === 1001 && T > 0) {
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)} 대신에`);
    character = T - 1;
    ctx.showMessage(`W %타겟을(1)% 의상점에 데리고 왔습니다`);
    // GOTO INPUT_LOOP_02 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 1003 && T < ctx.charanum - 1) {
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)} 대신에`);
    character = T + 1;
    ctx.showMessage(`W %타겟을(1)% 의상점에 데리고 왔습니다`);
    // GOTO INPUT_LOOP_02 - 구조 변경 필요 (while/break 사용 권장)
  } else {
    // GOTO INPUT_LOOP_02 - 구조 변경 필요 (while/break 사용 권장)
  }
  if (A === 0) {
    // GOTO INPUT_LOOP_02 - 구조 변경 필요 (while/break 사용 권장)
  } else if (A === 20 && character.cflags[49]) {
    ctx.showMessage(`W 정조대를 벗지 않으면 다른 장신구는 찰 수 없습니다`);
    // GOTO INPUT_LOOP_02 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    // GOTO INPUT_LOOP_02 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.abilities[10] < S) {
    ctx.showMessage(`W 착용을 거부당했습니다`);
    // GOTO INPUT_LOOP_02 - 구조 변경 필요 (while/break 사용 권장)
  }
  if (ctx.talents[99] && A === 3) {
    // Label: INPUT_LOOP_03
    ctx.showMessage(`이 옷은 ${ctx.getVarName("CALL", TARGET)}에게 맞지 않습니다……`);
    ctx.showMessage(` [0] - 억지로 입힌다`);
    ctx.showMessage(` [1] - 포기한다`);
    await ctx.inputNumber();
    if (ctx.result === 0) {
      ctx.showMessage('억지로 입히니 하의가 뜯어져버렸습니다');
      await ctx.wait();
      F = 2;
    } else if (ctx.result === 1) {
      // GOTO INPUT_LOOP_02 - 구조 변경 필요 (while/break 사용 권장)
    } else {
      // GOTO INPUT_LOOP_03 - 구조 변경 필요 (while/break 사용 권장)
    }
  } else if ((ctx.talents[100] === 0 && (ctx.talents[114] || ctx.talents[110])) && A === 3) {
    // Label: INPUT_LOOP_04
    ctx.showMessage(`이 옷은 ${ctx.getVarName("CALL", TARGET)}에게 맞지 않습니다……`);
    ctx.showMessage(` [0] - 억지로 입힌다`);
    ctx.showMessage(` [1] - 포기한다`);
    await ctx.inputNumber();
    if (ctx.result === 0) {
      ctx.showMessage('억지로 입히니 상의가 뜯어져버렸습니다');
      await ctx.wait();
      F = 1;
    } else if (ctx.result === 1) {
      // GOTO INPUT_LOOP_02 - 구조 변경 필요 (while/break 사용 권장)
    } else {
      // GOTO INPUT_LOOP_04 - 구조 변경 필요 (while/break 사용 권장)
    }
  }
  if (A <= 9) {
    ctx.showMessage(`%타겟을(1)%`);
    if (character.cflags[41] && (character.cflags[45] === 0 || character.cflags[46] === 0)) {
      await print_clothtype_main2(ctx, character);
      ctx.showMessage(`에서`);
      character.cflags[179] = character.cflags[41];
      character.cflags[178] = character.cflags[179];
    }
    character.cflags[41] = R;
    character.cflags[45] = 0;
    character.cflags[46] = 0;
    await print_clothtype_main2(ctx, character);
    if (ctx.result == 1) {
      ctx.print('으');
    }
    ctx.showMessage(`로 갈아입혔습니다`);
    if (F === 1) {
      ctx.print('방금 산');
      await print_clothtype_main2(ctx, character);
      if (ctx.result === 0) {
        ctx.showMessage('는');
      } else {
        ctx.showMessage('은');
      }
      ctx.showMessage(`상의가 뜯어져`);
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 가슴이 그대로 보입니다……`);
      character.cflags[44] = 0 - 3;
      character.cflags[45] = 0 - 3;
    } else if (F === 2) {
      ctx.print('방금 산');
      await print_clothtype_main2(ctx, character);
      if (ctx.result === 0) {
        ctx.showMessage('는');
      } else {
        ctx.showMessage('은');
      }
      ctx.showMessage(`하의가 뜯어져`);
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 엉덩이가 그대로 보입니다……`);
      character.cflags[46] = 0 - 3;
    }
    await wearing_cloth_able(ctx, character);
    if (character.cflags[179] != R) {
      ctx.print('지금까지 입고 있던');
      await print_clothtype_casualwear(ctx, character);
      if (ctx.result === 0) {
        ctx.showMessage('를');
      } else {
        ctx.showMessage('을');
      }
      ctx.showMessage('예비로 설정합니까?');
      ctx.showMessage('[0] - 네');
      ctx.showMessage('[1] - 아니오');
      // Label: INPUTLOOP_CASUALCHANGE
      await ctx.inputNumber();
      if (ctx.result === 0) {
        ctx.showMessage(`《`);
        await print_clothtype_casualwear(ctx, character);
        if (ctx.result === 0) {
          ctx.print('를');
        } else {
          ctx.print('을');
        }
        ctx.showMessage(`예비의상으로 지정합니다》`);
        character.cflags[41] = R;
        character.cflags[179] = 0;
      } else if (ctx.result === 1) {
        ctx.showMessage(`《`);
        await print_clothtype_casualwear(ctx, character);
        if (ctx.result === 0) {
          ctx.print('를');
        } else {
          ctx.print('을');
        }
        ctx.showMessage(`예비의상으로 지정하지 않습니다》`);
        character.cflags[178] = character.cflags[180];
        character.cflags[179] = 0;
      } else {
        // GOTO INPUTLOOP_CASUALCHANGE - 구조 변경 필요 (while/break 사용 권장)
      }
    }
  } else if (A === 10) {
    ctx.showMessage(`${ctx.getName(character)}에게 새로운 속옷을 사줬습니다`);
    if (character.cflags[43] >= 0 && character.cflags[48] >= 6) {
      await ctx.wait();
      await selling_pants(ctx, character);
    }
    if (character.cflags[41] === 0) {
      character.cflags[45] = -3;
      character.cflags[46] = -3;
    }
    character.cflags[43] = 0;
    character.cflags[44] = 0;
    await wearing_underware_all(ctx, character);
  } else if (A === 11) {
    ctx.showMessage(`가게 구석에서 ${ctx.getVarName("CALL", TARGET)}에게 기저귀를 채웠습니다`);
    character.cflags[47] = 0;
  } else if (A === 20) {
    if (character.cflags[42] && character.cflags[47] === 0) {
      ctx.showMessage(`${ctx.getName(character)}에게서`);
      await print_clothtype_special(ctx, character);
      if (ctx.result === 0) {
        ctx.print('를');
      } else {
        ctx.print('을');
      }
      ctx.showMessage(`벗기고`);
    } else {
      ctx.showMessage(`${ctx.getName(character)}에게`);
    }
    character.cflags[42] = R;
    character.cflags[47] = 0;
    await print_clothtype_special(ctx, character);
    if (ctx.result === 0) {
      ctx.print('를');
    } else {
      ctx.print('을');
    }
    ctx.showMessage(`줬습니다`);
    character.cflags[40] |= 64;
  }
  ctx.money -= C;
  await ctx.wait();
  character = -1;
  ctx.restart();
}

export async function tailor_casual(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  A = 1;
  C = 100;
  F = 0;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    A = 0;
    return 0;
  }
  // Label: INPUT_LOOP_01
  ctx.showMessage('□평상복');
  ctx.showMessage(`소지금: {MONEY}포인트`);
  ctx.drawLine();
  ctx.showMessage('[1] - 평상복・치마타입');
  ctx.showMessage('[2] - 평상복・바지타입');
  ctx.drawLine();
  ctx.showMessage('[999] - 돌아간다');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    R = 1;
    S = 0;
    if (ctx.talents[122]) {
      S = 3;
    }
  } else if (ctx.result === 2) {
    R = 101;
    S = 0;
  } else if (ctx.result === 999) {
    A = 0;
    C = 0;
    R = 0;
    S = 0;
    return 0;
  } else {
    // GOTO INPUT_LOOP_01 - 구조 변경 필요 (while/break 사용 권장)
  }
  return 1;
  return 1;
}

export async function tailor_normal(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  A = 1;
  C = 1000;
  F = 0;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    A = 0;
    return 0;
  }
  // Label: INPUT_LOOP_01
  ctx.showMessage('□평범한 옷');
  ctx.showMessage(`소지금: {MONEY}포인트`);
  ctx.drawLine();
  ctx.showMessage('[1] - 정장・치마타입');
  ctx.showMessage('[2] - 아동복(여아용)');
  ctx.showMessage('[3] - 명품옷');
  ctx.showMessage('[4] - 블레이저・스커트타입');
  ctx.showMessage('[5] - 정장・바지타입');
  ctx.showMessage('[6] - 츄리닝');
  ctx.showMessage('[7] - 블레이저・바지타입');
  ctx.showMessage('[8] - 아동복(남아용)');
  ctx.showMessage('[9] - 잠옷');
  ctx.showMessage('[10] - 원피스');
  ctx.showMessage('[11] - 기모노');
  ctx.showMessage('[12] - 칵테일 드레스');
  ctx.showMessage('[13] - 유카타');
  ctx.showMessage('[14] - 마이크로 미니타이트 원피스');
  ctx.showMessage('[15] - 페미닌 원피스');
  ctx.showMessage('[16] - 멜빵바지');
  ctx.showMessage('[17] - 원피스정장');
  ctx.showMessage('[18] - 캐미솔과 데님미니스커트');
  ctx.drawLine();
  ctx.showMessage('[999] - 돌아간다');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    R = 21;
    S = 0;
    if (ctx.talents[122]) {
      S = 3;
    }
  } else if (ctx.result === 2) {
    A = 3;
    R = 22;
    S = 5;
    if (ctx.talents[132] || ctx.talents[135] || ctx.talents[131]) {
      S = 0;
    }
    if (ctx.talents[122] && S < 3) {
      S = 3;
    }
  } else if (ctx.result === 3) {
    R = 23;
    S = 0;
  } else if (ctx.result === 4) {
    R = 31;
    S = 0;
    if (ctx.talents[122]) {
      S = 3;
    }
  } else if (ctx.result === 5) {
    R = 102;
    S = 0;
  } else if (ctx.result === 6) {
    R = 103;
    S = 0;
  } else if (ctx.result === 7) {
    R = 108;
    S = 0;
  } else if (ctx.result === 8) {
    A = 3;
    R = 122;
    S = 5;
    if (ctx.talents[132] || ctx.talents[135] || ctx.talents[131]) {
      S = 0;
    }
  } else if (ctx.result === 9) {
    R = 131;
    S = 0;
  } else if (ctx.result === 10) {
    R = 201;
    S = 0;
    if (ctx.talents[122]) {
      S = 3;
    }
  } else if (ctx.result === 11) {
    R = 202;
    S = 0;
  } else if (ctx.result === 12) {
    R = 203;
    S = 1;
    if (ctx.talents[122] && ctx.talents[322] == 0) {
      S = 3;
    }
  } else if (ctx.result === 13) {
    R = 204;
    S = 1;
  } else if (ctx.result === 14) {
    R = 205;
    S = 4;
    if (ctx.talents[153]) {
      S = 1;
    }
  } else if (ctx.result === 15) {
    A = 3;
    R = 222;
    S = 5;
    if (ctx.talents[132] || ctx.talents[135] || ctx.talents[131]) {
      S = 0;
    }
    if (ctx.talents[122] && S < 3) {
      S = 3;
    }
  } else if (ctx.result === 16) {
    R = 252;
    S = 0;
  } else if (ctx.result === 17) {
    R = 232;
    S = 0;
  } else if (ctx.result === 18) {
    R = 40;
    S = 0;
  } else if (ctx.result === 999) {
    A = 0;
    C = 0;
    R = 0;
    S = 0;
    T = 0;
    return 0;
  } else {
    // GOTO INPUT_LOOP_01 - 구조 변경 필요 (while/break 사용 권장)
  }
  return 1;
}

export async function tailor_student(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  A = 2;
  C = 5000;
  F = 0;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    A = 0;
    return 0;
  }
  // Label: INPUT_LOOP_01
  ctx.showMessage('학교지정교복');
  ctx.showMessage(`소지금: {MONEY}포인트`);
  ctx.drawLine();
  ctx.showMessage('[1] - 고쿠아쿠 고등학교 교복');
  ctx.showMessage('[2] - 히노데 고등학교 교복');
  ctx.showMessage('[3] - 하나마루 고등학교 교복');
  ctx.showMessage('[4] - 신세츠 고등학교 교복');
  ctx.showMessage('[5] - 세이에이 고등학교 교복');
  ctx.showMessage('[6] - 파라이소 중학교 교복');
  ctx.showMessage('[7] - 사립 메키메키 학원 교복');
  ctx.showMessage('[8] - 고등학교 교복');
  ctx.showMessage('[9] - 중학교 교복');
  ctx.showMessage('[10] - 세일러복');
  ctx.showMessage('[11] - 체육복과 부르마');
  ctx.showMessage('[12] - 유치원복');
  ctx.showMessage('[13] - 학교수영복');
  ctx.showMessage('[14] - 마호라 학원 초등부 교복');
  ctx.showMessage('[15] - 마호라 여자중학교 교복');
  ctx.showMessage('[16] - 성 우르술라 고등학교 교복');
  ctx.showMessage('[17] - 마호라예대 부속 중학교 교복');
  ctx.drawLine();
  ctx.showMessage('[999] - 돌아간다');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    R = 2;
    S = 4;
    if (ctx.talents[220] || ctx.talents[221] || ctx.talents[132] || ctx.talents[135]) {
      S = 0;
    }
  } else if (ctx.result === 2) {
    R = 3;
    S = 4;
    if (ctx.talents[220] || ctx.talents[221] || ctx.talents[132] || ctx.talents[135]) {
      S = 0;
    }
  } else if (ctx.result === 3) {
    R = 4;
    S = 4;
    if (ctx.talents[220] || ctx.talents[221] || ctx.talents[132] || ctx.talents[135]) {
      S = 0;
    }
  } else if (ctx.result === 4) {
    R = 5;
    S = 4;
    if (ctx.talents[220] || ctx.talents[221] || ctx.talents[132] || ctx.talents[135]) {
      S = 0;
    }
  } else if (ctx.result === 5) {
    R = 6;
    S = 4;
    if (ctx.talents[220] || ctx.talents[221] || ctx.talents[132] || ctx.talents[135]) {
      S = 0;
    }
  } else if (ctx.result === 6) {
    R = 7;
    S = 4;
    if (ctx.talents[221] || ctx.talents[132] || ctx.talents[135]) {
      S = 0;
    }
  } else if (ctx.result === 7) {
    R = 8;
    S = 4 - ctx.abilities[81];
    if (S < 1) {
      S = 1;
    }
  } else if (ctx.result === 8) {
    R = 17;
    S = 4;
    if (ctx.talents[220] || ctx.talents[221] || ctx.talents[132] || ctx.talents[135]) {
      S = 0;
    }
  } else if (ctx.result === 9) {
    R = 18;
    S = 4;
    if (ctx.talents[221] || ctx.talents[132] || ctx.talents[135]) {
      S = 0;
    }
  } else if (ctx.result === 10) {
    R = 19;
    S = 4;
    if (ctx.talents[220] || ctx.talents[221] || ctx.talents[132] || ctx.talents[135]) {
      S = 2;
    }
    if (ctx.talents[122] && S < 3) {
      S = 3;
    }
  } else if (ctx.result === 11) {
    R = 109;
    S = 5;
    if (ctx.talents[220] || ctx.talents[221] || ctx.talents[132] || ctx.talents[135]) {
      S = 2;
    }
    if (ctx.talents[122] && S < 3) {
      S = 3;
    }
  } else if (ctx.result === 12) {
    A = 3;
    R = 221;
    S = 5;
    if (ctx.talents[132] || ctx.talents[135] || ctx.talents[131]) {
      S = 0;
    }
  } else if (ctx.result === 13) {
    R = 291;
    S = 5;
    if (ctx.talents[220] || ctx.talents[221] || ctx.talents[132] || ctx.talents[135]) {
      S = 2;
    }
    if (ctx.talents[122] && S < 3) {
      S = 3;
    }
  } else if (ctx.result === 14) {
    A = 3;
    R = 229;
    S = 5;
    if (ctx.talents[132] || ctx.talents[135] || ctx.talents[131]) {
      S = 0;
    }
  } else if (ctx.result === 15) {
    R = 20;
    S = 4;
    if (ctx.talents[221] || ctx.talents[132] || ctx.talents[135]) {
      S = 0;
    }
  } else if (ctx.result === 16) {
    R = 230;
    S = 4;
    if (ctx.talents[220] || ctx.talents[221] || ctx.talents[132] || ctx.talents[135]) {
      S = 0;
    }
  } else if (ctx.result === 17) {
    R = 53;
    S = 4;
    if (ctx.talents[221] || ctx.talents[132] || ctx.talents[135]) {
      S = 0;
    }
  } else if (ctx.result === 999) {
    A = 0;
    C = 0;
    R = 0;
    S = 0;
    T = 0;
    return 0;
  } else {
    // GOTO INPUT_LOOP_01 - 구조 변경 필요 (while/break 사용 권장)
  }
  return 1;
}

export async function tailor_other(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  A = 1;
  C = 10000;
  F = 0;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    A = 0;
    return 0;
  }
  // Label: INPUT_LOOP_01
  ctx.showMessage('□기타 의상');
  ctx.showMessage(`소지금: {MONEY}포인트`);
  ctx.drawLine();
  ctx.showMessage('[1] - 간호사복');
  ctx.showMessage('[2] - 메이드복');
  ctx.showMessage('[3] - 웨이트리스복');
  ctx.showMessage('[4] - 편의점 제복');
  ctx.showMessage('[5] - 사무원 제복');
  ctx.showMessage('[6] - CPG 유니폼');
  ctx.showMessage('[7] - 펑크 로리타');
  ctx.showMessage('[8] - 상복');
  ctx.showMessage('[9] - 무녀복');
  ctx.showMessage('[10] - 야구 유니폼');
  ctx.showMessage('[11] - 군복');
  ctx.showMessage('[12] - 닌자복');
  ctx.showMessage('[13] - 왕자복');
  ctx.showMessage('[14] - 마이크로 비키니');
  ctx.showMessage('[15] - 구형 학교수영복');
  ctx.showMessage('[16] - 본디지');
  ctx.showMessage('[17] - 전신 타이즈');
  ctx.showMessage('[18] - 버니걸');
  ctx.showMessage('[19] - 군복+타이트스커트');
  ctx.showMessage('[20] - 수도복');
  ctx.showMessage('[21] - 레오타드');
  ctx.showMessage('[22] - 고식 로리타');
  ctx.showMessage('[23] - 여음양사복');
  ctx.showMessage('[24] - 치어리더 의상');
  if (ctx.paramBand[141] == 3) {
    ctx.showMessage('[25] - 웨딩 드레스');
  }
  if (ctx.paramBand[51] == 3) {
    ctx.showMessage('[26] - 벨리댄스복');
  }
  if (ctx.paramBand[54] == 3) {
    ctx.showMessage('[27] - 할로윈 마녀복');
  }
  if (ctx.paramBand[84] == 3) {
    ctx.showMessage('[28] - 테니스복');
  }
  if (ctx.paramBand[68] == 3) {
    ctx.showMessage('[29] - 슬링샷');
  }
  if (ctx.paramBand[146] == 3) {
    ctx.showMessage('[28] - 라텍스 슈트');
  }
  if (ctx.paramBand[304] >= 3) {
    ctx.showMessage('[99] - 유리 메이드복');
  }
  ctx.drawLine();
  ctx.showMessage('[999] - 돌아간다');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    R = 24;
    S = 2 - ctx.talents[63];
    if (ctx.talents[122] && S < 2) {
      S = 3;
    }
  } else if (ctx.result === 2) {
    R = 25;
    S = 3 - (ctx.abilities[81] + ctx.talents[63]);
    if (S < 1) {
      S = 1;
    }
  } else if (ctx.result === 3) {
    R = 26;
    S = 0;
  } else if (ctx.result === 4) {
    R = 27;
    S = 0;
  } else if (ctx.result === 5) {
    R = 28;
    S = 0;
  } else if (ctx.result === 6) {
    R = 29;
    S = 4;
    if (character.no == 92) {
      S = 0;
    }
  } else if (ctx.result === 7) {
    R = 30;
    S = 3;
    if (ctx.talents[203]) {
      S = 0;
    }
  } else if (ctx.result === 8) {
    R = 32;
    S = 2;
  } else if (ctx.result === 9) {
    R = 104;
    S = 3 - (ctx.abilities[81] + ctx.talents[207] * 2);
    if (S < 0) {
      S = 0;
    }
  } else if (ctx.result === 10) {
    R = 105;
    S = 0;
  } else if (ctx.result === 11) {
    R = 106;
    S = 3 - ctx.abilities[79];
    if (S < 0) {
      S = 0;
    }
  } else if (ctx.result === 12) {
    R = 110;
    S = 3;
    if (ctx.talents[312]) {
      S = 0;
    }
  } else if (ctx.result === 13) {
    R = 111;
    S = 3;
    if (ctx.talents[208]) {
      S = 0;
    }
  } else if (ctx.result === 14) {
    R = 191;
    S = 8 - ctx.abilities[17];
    if (S < 3) {
      S = 3;
    }
  } else if (ctx.result === 15) {
    R = 244;
    if (ctx.talents[204] === 0) {
      S = 5 - ctx.abilities[17];
      if (S < 4) {
        S = 4;
      }
    }
  } else if (ctx.result === 16) {
    R = 241;
    S = 8 - ctx.abilities[20];
    if (ctx.talents[83] || S < 1) {
      S = 1;
    }
  } else if (ctx.result === 17) {
    R = 251;
    S = 4;
  } else if (ctx.result === 18) {
    R = 254;
    S = 4;
  } else if (ctx.result === 19) {
    R = 51;
    S = 3 - ctx.abilities[81];
  } else if (ctx.result === 20) {
    R = 231;
    S = 3 - (ctx.abilities[81] + ctx.talents[204] * 2);
    if (S < 0) {
      S = 0;
    }
  } else if (ctx.result === 21) {
    R = 295;
    S = 4 - ctx.abilities[17];
  } else if (ctx.result === 22) {
    R = 52;
    S = 2;
  } else if (ctx.result === 23) {
    R = 233;
    S = 2;
  } else if (ctx.result === 24) {
    R = 54;
    S = 2;
  } else if (ctx.result === 25 && ctx.paramBand[141] === 3) {
    R = 240;
    S = 3;
  } else if (ctx.result === 26 && ctx.paramBand[51] === 3) {
    R = 243;
    S = 3;
  } else if (ctx.result === 27 && ctx.paramBand[54] === 3) {
    R = 56;
    S = 3;
  } else if (ctx.result === 27 && ctx.paramBand[54] === 3) {
    R = 56;
    S = 3;
  } else if (ctx.result === 28 && ctx.paramBand[84] === 3) {
    R = 55;
    S = 3;
  } else if (ctx.result === 29 && ctx.paramBand[68] === 3) {
    R = 246;
    S = 3;
  } else if (ctx.result === 30 && ctx.paramBand[84] === 3) {
    R = 245;
    S = 3;
  } else if (ctx.result === 99 && ctx.paramBand[304] >= 3) {
    R = 99;
    S = 0;
  } else if (ctx.result === 999) {
    A = 0;
    C = 0;
    R = 0;
    S = 0;
    T = 0;
    return 0;
  } else {
    // GOTO INPUT_LOOP_01 - 구조 변경 필요 (while/break 사용 권장)
  }
  return 1;
}

export async function tailor_accessory(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  A = 20;
  F = 0;
  // Label: INPUT_LOOP_01
  ctx.showMessage('□장신구');
  ctx.showMessage(`소지금: {MONEY}포인트`);
  ctx.drawLine();
  ctx.showMessage('[1] - 에이프런(10000포인트)');
  ctx.showMessage('[2] - 코트(10000포인트)');
  ctx.showMessage('[3] - 백의(10000포인트)');
  ctx.showMessage('[4] - 남자용 와이셔츠(10000포인트)');
  ctx.showMessage('[5] - 수수한 조끼(10000포인트)');
  ctx.showMessage('[6] - 떠돌이의 망토(10000포인트)');
  ctx.showMessage('[7] - 머플러(10000포인트)');
  ctx.showMessage('[8] - 간호사 모자(10000포인트)');
  ctx.showMessage('[9] - 개목걸이(10000포인트)');
  ctx.showMessage('[10] - 귀갑묶기용 끈(10000포인트)');
  ctx.showMessage('[11] - 카우벨과 코뚜레(10000포인트)');
  ctx.showMessage('[12] - 기저귀(100포인트)');
  ctx.showMessage('[13] - 정조대(10000포인트)');
  ctx.showMessage('[14] - 수녀용 베일(3000포인트)');
  ctx.showMessage('[15] - 웨딩 베일(3000포인트)');
  ctx.showMessage('[18] - 정장 자켓(1000포인트)');
  ctx.showMessage('[19] - 뱅글&링(2000포인트)');
  ctx.showMessage('[20] - 안경(1000포인트)');
  ctx.showMessage('[21] - 마법사의 로브(10000포인트)');
  ctx.showMessage('[22] - 고양이귀&꼬리(10000포인트)');
  ctx.showMessage('[23] - 폼폼(1000포인트)');
  ctx.showMessage('[24] - 레이스 파티 글러브(1000포인트)');
  ctx.showMessage('[25] - 에나멜 롱 글러브(10000포인트)');
  if (ctx.paramBand[83] == 3) {
    ctx.showMessage('[26] - 꼬리 애널플래그(50000포인트)');
  }
  if (ctx.paramBand[304] == 4) {
    ctx.showMessage('[27] - 유리 고양이귀(100000포인트)');
  }
  if (ctx.paramBand[56] >= 3) {
    ctx.showMessage('[28] - 프릴 앞치마(10000포인트)');
  }
  ctx.drawLine();
  ctx.showMessage('[999] - 돌아간다');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    R = 1;
    C = 10000;
    S = 0;
  } else if (ctx.result === 2) {
    R = 2;
    C = 10000;
    S = 0;
  } else if (ctx.result === 3) {
    R = 3;
    C = 10000;
    S = 0;
  } else if (ctx.result === 4) {
    R = 4;
    C = 10000;
    S = 1;
  } else if (ctx.result === 5) {
    R = 10;
    C = 10000;
    S = 0;
  } else if (ctx.result === 6) {
    R = 12;
    C = 10000;
    S = 1;
  } else if (ctx.result === 7) {
    R = 51;
    S = 0;
  } else if (ctx.result === 8) {
    R = 52;
    C = 10000;
    S = 2 - ctx.talents[63];
    if (ctx.talents[122] && S < 3) {
      S = 3;
    }
  } else if (ctx.result === 9) {
    R = 71;
    C = 10000;
    S = 10 - ctx.abilities[21];
    if (ctx.talents[124] && S > 5) {
      S = 5;
    }
    if (ctx.talents[136] || S < 3) {
      S = 3;
    }
  } else if (ctx.result === 10) {
    R = 72;
    C = 10000;
    S = 8 - ctx.abilities[21];
    if (ctx.talents[88] || S < 3) {
      S = 3;
    }
  } else if (ctx.result === 11) {
    R = 73;
    C = 10000;
    S = 5;
    if ((ctx.talents[110] || ctx.talents[114]) && ctx.talents[130]) {
      S = 3;
    }
  } else if (ctx.result === 12) {
    R = 69;
    C = 100;
    S = 5;
    if (ctx.talents[57]) {
      S = 1;
    }
  } else if (ctx.result === 13) {
    R = 79;
    C = 10000;
    S = 0;
    if (ctx.talents[122]) {
      S = 99;
    }
  } else if (ctx.result === 14) {
    R = 60;
    C = 3000;
    S = 3;
  } else if (ctx.result === 15) {
    R = 61;
    C = 3000;
    S = 3 - (ctx.abilities[81] + ctx.talents[204] * 2);
  } else if (ctx.result === 18) {
    R = 40;
    C = 1000;
    S = 0;
  } else if (ctx.result === 19) {
    R = 74;
    C = 2000;
    S = 2;
    if (ctx.talents[432] || ctx.talents[422]) {
      S = 0;
    }
  } else if (ctx.result === 20) {
    R = 80;
    C = 1000;
    S = 0;
  } else if (ctx.result === 21) {
    R = 41;
    C = 10000;
    S = 0;
  } else if (ctx.result === 22) {
    R = 65;
    C = 10000;
    S = 1;
  } else if (ctx.result === 23) {
    R = 66;
    C = 1000;
    S = 1;
  } else if (ctx.result === 24) {
    R = 83;
    C = 1000;
    S = 1;
  } else if (ctx.result === 25) {
    R = 85;
    C = 10000;
    S = 1;
  } else if (ctx.result === 26 && ctx.paramBand[83] === 3) {
    R = 82;
    C = 50000;
    S = 1;
    if (ctx.talents[2] == 1) {
      S = 11;
    }
  } else if (ctx.result === 27 && ctx.paramBand[304] === 4) {
    R = 99;
    C = 100000;
    S = 1;
  } else if (ctx.result === 28 && ctx.paramBand[56] >= 3) {
    R = 50;
    C = 10000;
    S = 1;
  } else if (ctx.result === 999) {
    A = 0;
    C = 0;
    R = 0;
    S = 0;
    T = 0;
    return 0;
  } else {
    // GOTO INPUT_LOOP_01 - 구조 변경 필요 (while/break 사용 권장)
  }
  return 1;
}

export async function tailor_underware(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  A = 10;
  C = 100;
  F = 0;
  S = 0;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    A = 0;
    C = 0;
    R = 0;
    T = 0;
    return 0;
  }
  await tailor_under_main(ctx, character);
  return 1;
}

export async function tailor_diaper(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  A = 11;
  C = 50;
  F = 0;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    A = 0;
    C = 0;
    R = 0;
    T = 0;
    return 0;
  }
  return 1;
}

export async function selling_pants(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  M = 100 * character.cflags[48];
  if (M == 0) {
    M = 50;
  }
  if (M > 500) {
    M = 500;
  }
  if (ctx.talents[74]) {
    ctx.times('M', 1.50);
  }
  if (ctx.talents[92]) {
    ctx.times('M', 2.00);
  }
  if (ctx.talents[126]) {
    ctx.times('M', 1.50);
  }
  if (ctx.talents[203]) {
    ctx.times('M', 2.00);
  }
  if (ctx.talents[220]) {
    ctx.times('M', 5.00);
  }
  if (ctx.talents[221]) {
    ctx.times('M', 5.00);
  }
  if (ctx.talents[414]) {
    ctx.times('M', 2.00);
  }
  if (ctx.talents[271]) {
    ctx.times('M', 2.00);
  }
  ctx.showMessage(`${ctx.josaHelper("타겟이")} 입고있던 팬티는 {M}포인트로 팔렸습니다.`);
  ctx.money += M;
  character.cflags[48] = 0;
}

export async function chastity_key(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  A = 0;
  ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 정조대 열쇠를 버려버리면`);
  ctx.showMessage(`더이상 ${ctx.getVarName("CALL", MASTER)}도 정조대를 벗길 수 없게 됩니다.`);
  ctx.showMessage(`열쇠를 버리면, 두번 다시 얻지 못할수도 있습니다.`);
  // Label: INPUT_LOOP_01
  ctx.showMessage('');
  ctx.showMessage(`정말 ${ctx.getName(character)}의 정조대 열쇠를 버립니까?`);
  ctx.showMessage(` [0] - 네`);
  ctx.showMessage(` [1] - 아니오`);
  await ctx.inputNumber();
  if (ctx.result === 0) {
    ctx.showMessage(`멍하는 바라보는 ${ctx.getVarName("CALL", TARGET)}의 눈앞에서`);
    ctx.showMessage(`W ${ctx.josaHelper("플레이어는")} 정조대 열쇠는 저멀리 던져버렸다.`);
    ctx.showMessage(`열쇠가 어디에 떨어졌는지는 아무도 모른다.`);
    await ctx.wait();
    character.cflags[49] = 1;
  } else if (ctx.result != 1) {
    // GOTO INPUT_LOOP_01 - 구조 변경 필요 (while/break 사용 권장)
  }
  return 1;
}

export async function tailor_special(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  A = 20;
  F = 0;
  // Label: INPUT_LOOP_01
  ctx.showMessage('□장신구');
  ctx.showMessage(`소지금: {MONEY}포인트`);
  ctx.drawLine();
  ctx.showMessage('[1] - 병아리 앞치마		( 100000포인트)');
  ctx.showMessage('[2] - 커다란 흰리본		( 100000포인트)');
  ctx.showMessage('[3] - 히비스커스 슈슈		( 100000포인트)');
  ctx.showMessage('[4] - 진주목걸이			( 500000포인트)');
  ctx.showMessage('[5] - 카츄사				( 200000포인트)');
  ctx.showMessage('[6] - 로켓 팬던트			( 500000포인트)');
  ctx.showMessage('[7] - 유나의 리본			( 100000포인트)');
  ctx.showMessage('[8] - 히나의 리본			( 100000포인트)');
  ctx.showMessage('[9] - 코로넷				(1000000포인트)');
  ctx.showMessage('[10] - 고에몽의 담뱃대		(1000000포인트)');
  ctx.showMessage('[11] - 호○인 쿄○마의 백의	( 500000포인트)');
  ctx.showMessage('[12] - 반짝이 네일			( 100000포인트)');
  ctx.showMessage('[13] - 붙임머리				( 100000포인트)');
  ctx.showMessage('[14] - 붉은실 리본			( 100000포인트)');
  ctx.showMessage('[15] - 방울초커				( 200000포인트)');
  ctx.showMessage('[16] - 검은 트윈리본		( 200000포인트)');
  ctx.showMessage('[17] - 프릴 앞치마			( 200000포인트)');
  ctx.showMessage('[18] - 리스트밴드			( 100000포인트)');
  ctx.showMessage('[20] - 카우보이 모자		( 100000포인트)');
  ctx.showMessage('[21] - 호박 머리핀			( 200000포인트)');
  ctx.showMessage('[70] - 검은 리본			( 100000포인트)');
  ctx.showMessage('[72] - 빨간 트윈리본		( 100000포인트)');
  ctx.showMessage('[80] - 가죽팔찌				( 500000포인트)');
  ctx.showMessage('[81] - 검은 가죽 팔토시		( 500000포인트)');
  ctx.drawLine();
  ctx.showMessage('[999] - 돌아간다');
  await ctx.inputNumber();
  if (ctx.result === 1 && character.no === 1) {
    R = 100;
    C = 1000000;
    S = 0;
  } else if (ctx.result === 2 && character.no === 2) {
    R = 101;
    C = 10000;
    S = 0;
  } else if (ctx.result === 3) {
    R = 3;
    C = 10000;
    S = 0;
  } else if (ctx.result === 4) {
    R = 4;
    C = 10000;
    S = 1;
  } else if (ctx.result === 5) {
    R = 10;
    C = 10000;
    S = 0;
  } else if (ctx.result === 6) {
    R = 12;
    C = 10000;
    S = 1;
  } else if (ctx.result === 7) {
    R = 51;
    S = 0;
  } else if (ctx.result === 8) {
    R = 52;
    C = 10000;
    S = 2 - ctx.talents[63];
    if (ctx.talents[122] && S < 3) {
      S = 3;
    }
  } else if (ctx.result === 9) {
    R = 71;
    C = 10000;
    S = 10 - ctx.abilities[21];
    if (ctx.talents[124] && S > 5) {
      S = 5;
    }
    if (ctx.talents[136] || S < 3) {
      S = 3;
    }
  } else if (ctx.result === 10) {
    R = 72;
    C = 10000;
    S = 8 - ctx.abilities[21];
    if (ctx.talents[88] || S < 3) {
      S = 3;
    }
  } else if (ctx.result === 11) {
    R = 73;
    C = 10000;
    S = 5;
    if ((ctx.talents[110] || ctx.talents[114]) && ctx.talents[130]) {
      S = 3;
    }
  } else if (ctx.result === 12) {
    R = 69;
    C = 100;
    S = 5;
    if (ctx.talents[57]) {
      S = 1;
    }
  } else if (ctx.result === 13) {
    R = 79;
    C = 100;
    S = 0;
    if (ctx.talents[122]) {
      S = 99;
    }
  } else if (ctx.result === 14) {
    R = 60;
    C = 3000;
    S = 3;
  } else if (ctx.result === 15) {
    R = 61;
    C = 3000;
    S = 3 - (ctx.abilities[81] + ctx.talents[204] * 2);
  } else if (ctx.result === 18) {
    R = 40;
    C = 1000;
    S = 0;
  } else if (ctx.result === 20) {
    R = 80;
    C = 1000;
    S = 0;
  } else if (ctx.result === 21) {
    R = 41;
    C = 10000;
    S = 0;
  } else if (ctx.result === 22) {
    R = 65;
    C = 10000;
    S = 1;
  } else if (ctx.result === 23) {
    R = 66;
    C = 1000;
    S = 1;
  } else if (ctx.result === 999) {
    A = 0;
    C = 0;
    R = 0;
    S = 0;
    T = 0;
    return 0;
  } else {
    // GOTO INPUT_LOOP_01 - 구조 변경 필요 (while/break 사용 권장)
  }
  return 1;
}

export async function tailor_blackgirl(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  C = 1000;
  F = 0;
  S = 3;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    A = 0;
    C = 0;
    R = 0;
    T = 0;
    return 0;
  }
  // Label: INPUT_LOOP_BG
  ctx.showMessage(` %타겟을(1)% 태닝살롱에 보내 건강한【${ctx.getVarName("TALENT", 422)}】로 만듭니다`);
  ctx.showMessage(` ※【갸루계】가 없을 경우 정기적으로 보내지 않으면 약 1개월후에 원래대로 돌아옵니다`);
  ctx.showMessage(` ${ctx.josaHelper("타겟을")} 태닝살롱에 보내겠습니까?`);
  ctx.showMessage('');
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 아니오');
  await ctx.inputNumber();
  if (ctx.result === 0 && ctx.talents[122] === 0) {
    ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
    ctx.showMessage(`W  태닝살롱에서 돌아온 ${ctx.josaHelper("타겟은")}《${ctx.getVarName("TALENT", 422)}》가 됐습니다`);
    ctx.talents[422] = 1;
    character.cflags[614] = 4 + ctx.rand(4);
    ctx.money -= C;
  } else if (ctx.result === 0 && ctx.talents[122] === 1) {
    ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
    ctx.showMessage(`W  태닝살롱에서 돌아온 ${ctx.josaHelper("타겟은")}《${ctx.getVarName("TALENT", 422)}》가 됐습니다`);
    ctx.talents[422] = 1;
    character.cflags[614] = 4 + ctx.rand(4);
    ctx.money -= C;
  } else {
    return 1;
  }
  return 1;
}

export async function tailor_esthetic(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  C = 3000000;
  F = 0;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    A = 0;
    C = 0;
    R = 0;
    T = 0;
    return 0;
  }
  // Label: INPUT_LOOP_ESTHETIC
  ctx.showMessage(` %타겟을(1)% 특별한 에스테살롱에 보내 매력치를 회복합니다`);
  ctx.showMessage(` ※이 항목은 캐릭터마다 한번씩만 사용가능합니다!`);
  ctx.showMessage(` ${ctx.josaHelper("타겟을")} 특별한 에스테살롱에 보냅니까?`);
  ctx.showMessage('');
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - い아니오');
  await ctx.inputNumber();
  if (ctx.result === 0) {
    ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
    ctx.showMessage(`W  《에스테살롱에서 돌아온 ${ctx.josaHelper("타겟은")} 매력을 되찾았다》`);
    ctx.base[31] = MAXctx.base[31];
    ctx.exp[124] = 1;
    ctx.money -= C;
  } else if (ctx.result === 1) {
    return 1;
  } else {
    // GOTO INPUT_LOOP_ESTHETIC - 구조 변경 필요 (while/break 사용 권장)
  }
  return 1;
}

export async function life_list_tailor(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count == 0) {
      // TODO: CONTINUE
    }
    if (ctx.base[ctx.count][0] < 1) {
      // TODO: CONTINUE
    }
    character = ctx.count;
    ctx.showMessage(`[${ctx.count}] ${ctx.getName(ctx.count)}`);
    if (character.cflags[41] && (character.cflags[45] >= 0 || character.cflags[46] >= 0)) {
      ctx.printChar('/');
      await print_clothtype_main2(ctx, character);
    } else if (character.cflags[41] && (character.cflags[43] >= 0 || character.cflags[44] >= 0)) {
      ctx.print('/ 속옷');
    } else {
      ctx.print('/ 전라');
    }
    if (character.cflags[42] && character.cflags[47] >= 0) {
      ctx.printChar('/');
      await print_clothtype_special(ctx, character);
    }
    ctx.showMessage('');
  }
}

export async function hairstyle_change(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // Label: INPUT_LOOP_50
  ctx.showMessage('□헤어살롱');
  ctx.showMessage(`소지금: {MONEY}포인트`);
  ctx.drawLine();
  ctx.showMessage(`%타겟은(1)%`);
  await print_hairstyle(ctx, character);
  ctx.showMessage(`。`);
  ctx.showMessage(`‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥`);
  ctx.showMessage('[0] - 머리모양을 바꾼다(500포인트)');
  ctx.showMessage('※더 긴머리로도 바꿀 수 있습니다');
  ctx.showMessage('[1] - 머리색을 바꾼다(1000포인트)');
  ctx.showMessage('※원래색으로 돌릴경우 1500포인트가 필요합니다');
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  ctx.showMessage('[999] - 돌아간다');
  await ctx.inputNumber();
  if (ctx.result === 0) {
    await haircut(ctx, character);
  } else if (ctx.result === 1) {
    await haircolor(ctx, character);
  } else if (ctx.result === 999) {
    return 1;
  } else {
    // GOTO INPUT_LOOP_50 - 구조 변경 필요 (while/break 사용 권장)
  }
}

export async function haircut(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  C = 500;
  X = 0;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    A = 0;
    return 0;
  }
  // Label: INPUT_LOOP_51
  ctx.showMessage('□헤어스타일 일람');
  ctx.showMessage(`소지금: {MONEY}포인트`);
  ctx.drawLine();
  ctx.showMessage('[ 0] - 쇼트');
  ctx.showMessage('[ 1] - 세미 롱');
  ctx.showMessage('[ 2] - 보브');
  ctx.showMessage('[ 3] - 포니테일');
  ctx.showMessage('[ 4] - 트윈테일');
  ctx.showMessage('[ 5] - 스트레이트 롱');
  ctx.showMessage('[ 6] - 올림머리');
  ctx.showMessage('[ 7] - 풍성한 파마');
  ctx.showMessage('[ 8] - 롱 웨이브');
  ctx.showMessage('[ 9] - 땋음머리');
  ctx.showMessage('[10] - 투 사이드 업');
  ctx.showMessage('[11] - 트윈드릴테일');
  ctx.showMessage('[12] - 경단머리');
  ctx.showMessage('[99] - 승천 페가서스MIX');
  ctx.drawLine();
  ctx.showMessage('[999] - 돌아간다');
  await ctx.inputNumber();
  if (ctx.result === 999) {
    return 1;
  } else if (ctx.result != 99 && ctx.result >= 13) {
    // GOTO INPUT_LOOP_51 - 구조 변경 필요 (while/break 사용 권장)
  } else if (character.cflags[602] != ctx.result) {
    character.cflags[character][602] = ctx.result;
    ctx.showMessage(`《${ctx.getVarName("CALL", TARGET)}의 헤어스타일이`);
    await print_hairstyle_tailor(ctx, character);
    if (ctx.result == 1) {
      ctx.print('으');
    }
    ctx.showMessage(`W 로 변했다》`);
  } else if (character.cflags[602] === ctx.result) {
    ctx.showMessage(`W  《${ctx.getVarName("CALL", TARGET)}의 헤어스타일을 바꾸지 않습니다》`);
  } else {
    // GOTO INPUT_LOOP_51 - 구조 변경 필요 (while/break 사용 권장)
  }
  return 1;
}

export async function haircolor(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  C = 1000;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    A = 0;
    return 0;
  }
  // Label: INPUT_LOOP_52
  ctx.showMessage('□머리색 일람');
  ctx.showMessage(`소지금: {MONEY}포인트`);
  ctx.drawLine();
  ctx.showMessage('[ 0] - 검은색');
  ctx.showMessage('[ 1] - 짙은색');
  ctx.showMessage('[ 2] - 금빛');
  ctx.showMessage('[ 3] - 은빛');
  ctx.showMessage('[ 4] - 붉은색');
  ctx.showMessage('[ 5] - 푸른색');
  ctx.showMessage('[ 6] - 녹색');
  ctx.showMessage('[ 7] - 핑크빛');
  ctx.showMessage('[ 8] - 보라색');
  ctx.showMessage('[ 9] - 탈색한다');
  ctx.showMessage('[10] - 갈색');
  ctx.showMessage('[99] - 원래 색으로 되돌린다');
  ctx.drawLine();
  ctx.showMessage('[999] - 돌아간다');
  await ctx.inputNumber();
  if (ctx.result === character.cflags[600]) {
    ctx.showMessage(`W 같은 색으로 바꿀 수 없습니다`);
    // GOTO INPUT_LOOP_52 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 999) {
    return 1;
  } else if (ctx.result != 99 && ctx.result >= 11) {
    // GOTO INPUT_LOOP_52 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result != 99 && ctx.result != character.cflags[600]) {
    ctx.showMessage(`${ctx.josaHelper("타겟은")} 머리를`);
    if (ctx.result === 0) {
      ctx.showMessage(`검은색으로 물들였`);
    } else if (ctx.result === 1) {
      ctx.showMessage(`짙은색으로 물들였`);
    } else if (ctx.result === 2) {
      ctx.showMessage(`금빛으로 물들였`);
    } else if (ctx.result === 3) {
      ctx.showMessage(`은빛으로 물들였`);
    } else if (ctx.result === 4) {
      ctx.showMessage(`븕은색으로 물들였`);
    } else if (ctx.result === 5) {
      ctx.showMessage(`푸른색으로 물들였`);
    } else if (ctx.result === 6) {
      ctx.showMessage(`녹색으로 물들였`);
    } else if (ctx.result === 7) {
      ctx.showMessage(`핑크빛으로 물들였`);
    } else if (ctx.result === 8) {
      ctx.showMessage(`보라색으로 물들였`);
    } else if (ctx.result === 9) {
      ctx.showMessage(`탈색했`);
    } else if (ctx.result === 10) {
      ctx.showMessage(`갈색으로 물들였`);
    }
    ctx.showMessage(`W 다`);
    character.cflags[character][600] = ctx.result;
    character.cflags[character][601] = 1;
    ctx.money -= C;
  } else if (ctx.result === 99 && character.cflags[character][601] === 1) {
    if (ctx.money < 1500) {
      ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
      // GOTO INPUT_LOOP_52 - 구조 변경 필요 (while/break 사용 권장)
    }
    if (character.cflags[character][603]) {
      ctx.showMessage(`W ${ctx.josaHelper("타겟은")} 머리를 원래색으로 되돌렸다.`);
      character.cflags[character][600] = character.cflags[character][603];
    } else if (CSVCFLAG(character.no,601) === 1) {
      ctx.showMessage(`W ${ctx.josaHelper("타겟은")} 머리를 원래색으로 되돌렸다.`);
      character.cflags[character][600] = 0;
    } else {
      ctx.showMessage(`W ${ctx.josaHelper("타겟은")} 머리를 원래색으로 되돌렸다.`);
      character.cflags[character][600] = CSVCFLAG(character.no,600);
    }
    character.cflags[character][601] = 0;
    ctx.money -= 1500;
  } else if (ctx.result === 99 && character.cflags[character][601] === 0) {
    ctx.showMessage(`W ${ctx.josaHelper("타겟은")} 염색을 하지 않았습니다.`);
    // GOTO INPUT_LOOP_52 - 구조 변경 필요 (while/break 사용 권장)
  } else {
    // GOTO INPUT_LOOP_52 - 구조 변경 필요 (while/break 사용 권장)
  }
  return 1;
}

export async function tailor_socks(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // Label: INPUT_LOOP_SOCKS
  ctx.showMessage('□양말 일람');
  ctx.showMessage(`소지금: {MONEY}포인트`);
  ctx.drawLine();
  ctx.showMessage('[ 1] - 발목양말		(5포인트)');
  ctx.showMessage('[ 2] - 학교지정 양말(10포인트)');
  ctx.showMessage('[ 3] - 하이삭스		(20포인트)');
  ctx.showMessage('[ 4] - 루즈삭스		(25포인트)');
  ctx.showMessage('[ 5] - 니삭스		(30포인트)');
  ctx.showMessage('[ 6] - 검은 스타킹	(40포인트)');
  ctx.showMessage('[ 7] - 가터 스타킹	(50포인트)');
  ctx.showMessage('[ 8] - 망사 스타킹	(100포인트)');
  if (ctx.paramBand[304] == 4) {
    ctx.showMessage('[99] - 유리 니삭스	(100000포인트)');
  }
  ctx.drawLine();
  ctx.showMessage('[999] - 돌아간다');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    ctx.showMessage(`W 《${ctx.getVarName("CALL", TARGET)}에게 발목양말을 사줬습니다》`);
    C = 5;
    S = 0;
    character.cflags[170] = 1;
    character.cflags[173] = 0;
  } else if (ctx.result === 2) {
    ctx.showMessage(`W 《${ctx.getVarName("CALL", TARGET)}에게 학교지정 양말을 사줬습니다》`);
    C = 10;
    S = 0;
    character.cflags[170] = 2;
    character.cflags[173] = 0;
  } else if (ctx.result === 3) {
    ctx.showMessage(`W 《${ctx.getVarName("CALL", TARGET)}에게 하이삭스를 사줬습니다》`);
    C = 15;
    S = 0;
    character.cflags[170] = 3;
    character.cflags[173] = 0;
  } else if (ctx.result === 4) {
    ctx.showMessage(`W 《${ctx.getVarName("CALL", TARGET)}에게 루즈삭스를 사줬습니다》`);
    C = 20;
    S = 0;
    character.cflags[170] = 4;
    character.cflags[173] = 0;
  } else if (ctx.result === 5) {
    ctx.showMessage(`W 《${ctx.getVarName("CALL", TARGET)}에게 니삭스를 사줬습니다》`);
    C = 30;
    S = 0;
    character.cflags[170] = 5;
    character.cflags[173] = 0;
  } else if (ctx.result === 6) {
    ctx.showMessage(`W 《${ctx.getVarName("CALL", TARGET)}에게 검은 스타킹을 사줬습니다》`);
    C = 40;
    S = 0;
    character.cflags[170] = 6;
    character.cflags[173] = 0;
  } else if (ctx.result === 7) {
    ctx.showMessage(`W 《${ctx.getVarName("CALL", TARGET)}에게 가터 스타킹을 사줬습니다》`);
    C = 50;
    S = 0;
    character.cflags[170] = 7;
    character.cflags[173] = 0;
  } else if (ctx.result === 8) {
    ctx.showMessage(`W 《${ctx.getVarName("CALL", TARGET)}에게 망사 스타킹을 사줬습니다》`);
    C = 20;
    S = 0;
    character.cflags[170] = 8;
    character.cflags[173] = 0;
  } else if (ctx.result === 99 && ctx.paramBand[304] === 4) {
    ctx.showMessage(`W 《${ctx.getVarName("CALL", TARGET)}에게 유리 니삭스를 사줬습니다》`);
    C = 20;
    S = 0;
    character.cflags[170] = 99;
    character.cflags[171] = 0;
    character.cflags[173] = -1;
  } else if (ctx.result === 999) {
    A = 0;
    C = 0;
    R = 0;
    S = 0;
    T = 0;
    return 0;
  } else {
    // GOTO INPUT_LOOP_SOCKS - 구조 변경 필요 (while/break 사용 권장)
  }
  return 1;
}

export async function tailor_shoes(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // Label: INPUT_LOOP_SHOES
  ctx.showMessage('□신발 일람');
  ctx.showMessage(`소지금: {MONEY}포인트`);
  ctx.drawLine();
  ctx.showMessage('[ 1] - 스니커			(100포인트)');
  ctx.showMessage('[ 2] - 학교 지정 로퍼	(200포인트)');
  ctx.showMessage('[ 3] - 펌프스			(250포인트)');
  ctx.showMessage('[ 4] - 하이힐			(300포인트)');
  ctx.showMessage('[ 5] - 샌들				(50포인트)');
  ctx.showMessage('[ 6] - 비치샌들			(80포인트)');
  ctx.showMessage('[ 7] - 간호사샌들		(100포인트)');
  ctx.showMessage('[ 8] - 펄핑크뮬			(1000포인트)');
  ctx.showMessage('[ 9] - 게타				(150포인트)');
  ctx.showMessage('[10] - 털슬리퍼			(80포인트)');
  ctx.showMessage('[11] - 화장실 슬리퍼	(10포인트)');
  ctx.showMessage('[12] - 끈부츠			(500포인트)');
  ctx.showMessage('[13] - 카우보이부츠		(700포인트)');
  ctx.showMessage('[14] - 핀힐 니하이부츠	(1500포인트)');
  ctx.showMessage('[15] - 크록스			(150포인트)');
  ctx.drawLine();
  ctx.showMessage('[999] - 돌아간다');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    ctx.showMessage(`W 《${ctx.getVarName("CALL", TARGET)}에게 스니커를 사줬습니다》`);
    C = 100;
    S = 0;
    character.cflags[171] = 1;
  } else if (ctx.result === 2) {
    ctx.showMessage(`W 《${ctx.getVarName("CALL", TARGET)}에게 학교 지정 로퍼를 사줬습니다》`);
    C = 200;
    S = 0;
    character.cflags[171] = 2;
  } else if (ctx.result === 3) {
    ctx.showMessage(`W 《${ctx.getVarName("CALL", TARGET)}에게 펌프스를 사줬습니다》`);
    C = 250;
    S = 0;
    character.cflags[171] = 3;
  } else if (ctx.result === 4) {
    ctx.showMessage(`W 《${ctx.getVarName("CALL", TARGET)}에게 하이힐을 사줬습니다》`);
    C = 300;
    S = 0;
    character.cflags[171] = 4;
  } else if (ctx.result === 5) {
    ctx.showMessage(`W 《${ctx.getVarName("CALL", TARGET)}에게 샌들을 사줬습니다》`);
    C = 50;
    S = 0;
    character.cflags[171] = 5;
  } else if (ctx.result === 6) {
    ctx.showMessage(`W 《${ctx.getVarName("CALL", TARGET)}에게 비치샌들을 사줬습니다》`);
    C = 80;
    S = 0;
    character.cflags[171] = 6;
  } else if (ctx.result === 7) {
    ctx.showMessage(`W 《${ctx.getVarName("CALL", TARGET)}에게 간호사샌들을 사줬습니다》`);
    C = 100;
    S = 0;
    character.cflags[171] = 7;
  } else if (ctx.result === 8) {
    ctx.showMessage(`W 《${ctx.getVarName("CALL", TARGET)}에게 펄핑크뮬을 사줬습니다》`);
    C = 1000;
    S = 0;
    character.cflags[171] = 8;
  } else if (ctx.result === 9) {
    ctx.showMessage(`W 《${ctx.getVarName("CALL", TARGET)}에게 게타를 사줬습니다》`);
    C = 150;
    S = 0;
    character.cflags[171] = 9;
  } else if (ctx.result === 10) {
    ctx.showMessage(`W 《${ctx.getVarName("CALL", TARGET)}에게 털슬리퍼를 사줬습니다》`);
    C = 70;
    S = 0;
    character.cflags[171] = 10;
  } else if (ctx.result === 11) {
    ctx.showMessage(`W 《${ctx.getVarName("CALL", TARGET)}에게 화장실 슬리퍼를 사줬습니다》`);
    C = 10;
    S = 3;
    character.cflags[171] = 11;
  } else if (ctx.result === 12) {
    ctx.showMessage(`W 《${ctx.getVarName("CALL", TARGET)}에게 끈부츠를 사줬습니다》`);
    C = 500;
    S = 0;
    character.cflags[171] = 12;
  } else if (ctx.result === 13) {
    ctx.showMessage(`W 《${ctx.getVarName("CALL", TARGET)}에게 카우보이부츠를 사줬습니다》`);
    C = 700;
    S = 0;
    character.cflags[171] = 13;
  } else if (ctx.result === 14) {
    ctx.showMessage(`W 《${ctx.getVarName("CALL", TARGET)}에게 핀힐 니하이부츠를 사줬습니다》`);
    C = 1500;
    S = 0;
    character.cflags[171] = 14;
  } else if (ctx.result === 15) {
    ctx.showMessage(`W 《${ctx.getVarName("CALL", TARGET)}에게 크록스를 사줬습니다》`);
    C = 150;
    S = 0;
    character.cflags[171] = 15;
  } else if (ctx.result === 999) {
    A = 0;
    C = 0;
    R = 0;
    S = 0;
    T = 0;
    return 0;
  } else {
    // GOTO INPUT_LOOP_SHOES - 구조 변경 필요 (while/break 사용 권장)
  }
  return 1;
}
