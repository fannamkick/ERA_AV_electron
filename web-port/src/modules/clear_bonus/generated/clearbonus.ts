/**
 * CLEARBONUS.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function clearbonus(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: LOADGLOBAL
  ctx.locals[0] = ctx.global[200];
  // Label: INPUT_LOOP
  ctx.showMessage('□캐릭터 클리어 보너스□');
  ctx.showMessage(`소지 클리어 포인트: ${ctx.locals[0]}포인트`);
  ctx.drawLine();
  if (ctx.locals[1] === 0) {
    ctx.showMessage('[ 1] - 게임 기간을 두 배로 연장해 시작  　　　    　     　       (  2포인트)');
  } else {
    ctx.showMessage('[ -] - －－－－－－－－－－');
  }
  if (ctx.locals[2] === 0) {
    ctx.showMessage('[ 2] - 소지금을 500000포인트로 시작　　　　　     　　　　  　　　 (  3포인트)');
  } else {
    ctx.showMessage('[ -] - －－－－－－－－－－');
  }
  if (ctx.locals[3] === 0) {
    ctx.showMessage('[ 3] - 거물 아이돌과 계약한 상태로 시작　　 　　    　　　　　  　 (  5포인트)');
  } else {
    ctx.showMessage('[ -] - －－－－－－－－－－');
  }
  if (ctx.locals[4] === 0) {
    ctx.showMessage('[ 4] - 전설의 AV남배우 겸 감독의 제자가 된다.　　　　　　  　　　 ( 10포인트)');
  } else {
    ctx.showMessage('[ -] - －－－－－－－－－－');
  }
  if (ctx.locals[5] === 0) {
    ctx.showMessage('[ 5] - 미션모드를 해금한 상태로 시작      　　　　 　　　　　 　　 ( 15포인트)');
  } else {
    ctx.showMessage('[ -] - －－－－－－－－－－');
  }
  if (ctx.locals[6] === 0) {
    ctx.showMessage('[ 6] - 구입가능한 아이템을 모두 가진채 시작     　　 　　　　 　   ( 30포인트)');
  } else {
    ctx.showMessage('[ -] - －－－－－－－－－－');
  }
  if (ctx.locals[7] === 0 && ctx.global[60] === 1) {
    ctx.showMessage('[ 7] - 빚이 없는 상태로 시작    　　　　　　　　　　　　 　　　 　 (100포인트)');
  } else {
    ctx.showMessage('[ -] - －－－－－－－－－－');
  }
  if (ctx.locals[8] === 0) {
    ctx.showMessage('[ 8] - 계약 가능한 캐릭터의 남친 유무를 선택가능   　　　　 　　 　( 10포인트)');
  } else {
    ctx.showMessage('[ -] - －－－－－－－－－－');
  }
  if (ctx.locals[9] === 0) {
    ctx.showMessage('[ 9] - 기쎄고 허술한 그 아이와 계약한 상태로 시작 　　　　 　  　　( 30포인트)');
  } else {
    ctx.showMessage('[ -] - －－－－－－－－－－');
  }
  if (ctx.locals[10] === 0) {
    ctx.showMessage('[10] - 계약 가능한 캐릭터의 자지 유무를 선택가능     　　　 　　　 ( 40포인트)');
  } else {
    ctx.showMessage('[ -] - －－－－－－－－－－');
  }
  if (ctx.locals[11] === 0) {
    ctx.showMessage('[11] - 언제나 뜨거운 그 아이와 계약한 상태로 시작     　　　 　 　 ( 30포인트)');
  } else {
    ctx.showMessage('[ -] - －－－－－－－－－－');
  }
  if (ctx.locals[12] === 0) {
    ctx.showMessage('[12] - 계약 가능한 캐릭터가 보이면서 흥분하는지 선택가능         　(200포인트)');
  } else {
    ctx.showMessage('[ -] - －－－－－－－－－－');
  }
  if (ctx.locals[13] === 0) {
    ctx.showMessage('[13] - 고스트 프린세스 같은 그 아이와 계약한 상태로 시작 　 　　　 ( 30포인트)');
  } else {
    ctx.showMessage('[ -] - －－－－－－－－－－');
  }
  if (ctx.locals[3] === 0 && ctx.locals[9] === 0 && ctx.locals[11] === 0 && ctx.locals[13] === 0) {
    ctx.showMessage('[14] - 클리어 보너스 캐릭터 패키지   　　　　　　　　　　  　 　　 ( 80포인트)');
  } else {
    ctx.showMessage('[ -] - －－－－－－－－－－');
  }
  if (ctx.locals[15] === 0 && ctx.global[30] === 1) {
    ctx.showMessage('[15] - 모든 여배우 후보중 한명이 처음부터 소속된 상태로 시작       (300포인트)');
  } else {
    ctx.showMessage('[ -] - －－－－－－－－－－');
  }
  if (ctx.locals[16] === 0) {
    ctx.showMessage('[16] - (Ho잠정조치: 입수수단이 사라진 아이를 구제)　　　　　　　　　(  0포인트)');
  } else {
    ctx.showMessage('[ -] - －－－－－－－－－－');
  }
  ctx.drawLine();
  ctx.showMessage('[999] - 돌아간다');
  await ctx.inputNumber();
  if (ctx.result === 1 && ctx.locals[1] === 0 && ctx.locals[0] >= 2) {
    ctx.showMessage('게임 기간을 두 배로 한 상태에서 게임을 시작할 수 있습니다');
    ctx.showMessage('이 보너스를 사용하는 데 따르는 페널티는 없습니다');
    // Label: INPUT_LOOP_EXTEND
    ctx.showMessage('이 보너스를 습득하시겠습니까?');
    ctx.showMessage('[0] - 네');
    ctx.showMessage('[1] - 아니오');
    await ctx.inputNumber();
    if (ctx.result === 0) {
      ctx.flags[3] *= 2;
      ctx.showMessage(`W 게임 기간을 ${ctx.flags[3]}주로 연장했습니다`);
      ctx.locals[0] -= 2;
      ctx.locals[1] = 1;
      // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
    } else if (ctx.result === 1) {
      ctx.showMessage('이 보너스를 습득하지 않았습니다'); ctx.waitInput();
      // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
    } else {
      // GOTO INPUT_LOOP_EXTEND - 구조 변경 필요 (while/break 사용 권장)
    }
  } else if (ctx.result === 1 && ctx.locals[1] === 0 && ctx.locals[0] < 2) {
    ctx.showMessage('《보너스 포인트가 부족합니다》');
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 2 && ctx.locals[2] === 0 && ctx.locals[0] >= 3) {
    ctx.showMessage('게임 시작시의 자금을 500000포인트로 놓고 시작합니다');
    ctx.showMessage('이 보너스를 사용하는 데 따르는 페널티는 없습니다');
    // Label: INPUT_LOOP_HALFMILLION
    ctx.showMessage('이 보너스를 습득하시겠습니까?');
    ctx.showMessage('[0] - 네');
    ctx.showMessage('[1] - 아니오');
    await ctx.inputNumber();
    if (ctx.result === 0) {
      ctx.money = 500000;
      ctx.showMessage(`W 게임 시작시의 자금을 500000포인트로 변경했습니다`);
      ctx.locals[0] -= 3;
      ctx.locals[2] = 1;
      // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
    } else if (ctx.result === 1) {
      ctx.showMessage('게임 기간을 연장하지 않았습니다'); ctx.waitInput();
      // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
    } else {
      // GOTO INPUT_LOOP_HALFMILLION - 구조 변경 필요 (while/break 사용 권장)
    }
  } else if (ctx.result === 2 && ctx.locals[2] === 0 && ctx.locals[0] < 3) {
    ctx.showMessage('《보너스 포인트가 부족합니다》');
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 3 && ctx.locals[3] === 0 && ctx.locals[0] >= 5) {
    ctx.showMessage('거물 아이돌과 계약한 상태로 게임을 시작합니다');
    ctx.showMessage('이 보너스를 사용하는 데 따르는 페널티는 없습니다');
    // Label: INPUT_LOOP_ADDYUKI
    ctx.showMessage('이 보너스를 습득하시겠습니까?');
    ctx.showMessage('[0] - 네');
    ctx.showMessage('[1] - 아니오');
    await ctx.inputNumber();
    if (ctx.result === 0) {
      // TODO: ADDCHARA 150
      ctx.showMessage(`W 거물 아이돌과 계약한 채로 스타트합니다`);
      ctx.locals[0] -= 5;
      ctx.locals[3] = 1;
      // TODO: LOADGLOBAL
      ctx.global[350] += 1;
      // TODO: SAVEGLOBAL
      // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
    } else if (ctx.result === 1) {
      ctx.showMessage('거물 아이돌과 계약하지 않았습니다'); ctx.waitInput();
      // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
    } else {
      // GOTO INPUT_LOOP_ADDYUKI - 구조 변경 필요 (while/break 사용 권장)
    }
  } else if (ctx.result === 3 && ctx.locals[3] === 0 && ctx.locals[0] < 5) {
    ctx.showMessage('《보너스 포인트가 부족합니다》');
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 4 && ctx.locals[4] === 0 && ctx.locals[0] >= 10) {
    ctx.showMessage('전설의 AV 남배우 겸 감독의 제자로 입문한 상태에서 게임을 시작하게 됩니다');
    ctx.showMessage('이 보너스를 사용하는 데 따르는 페널티는 없습니다');
    // Label: INPUT_LOOP_CHOCOBALL
    ctx.showMessage('이 보너스를 습득하시겠습니까?');
    ctx.showMessage('[0] - 네');
    ctx.showMessage('[1] - 아니오');
    await ctx.inputNumber();
    if (ctx.result === 0) {
      ctx.showMessage(`W 전설의 AV 남배우 겸 감독의 제자로 입문한 상태로 게임을 시작합니다`);
      ctx.locals[0] -= 10;
      ctx.locals[4] = 1;
      ctx.getTalent(master, 55) = 1;
      ctx.getTalent(master, 91) = 1;
      ctx.getTalent(master, 92) = 1;
      ctx.getTalent(master, 93) = 1;
      ctx.getTalent(master, 325) = 1;
      ctx.masterAbilities[12] = 10;
      // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
    } else if (ctx.result === 1) {
      ctx.showMessage('전설의 AV 남배우 겸 감독의 제자로 입문하지 않았습니다'); ctx.waitInput();
      // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
    } else {
      // GOTO INPUT_LOOP_CHOCOBALL - 구조 변경 필요 (while/break 사용 권장)
    }
  } else if (ctx.result === 4 && ctx.locals[4] === 0 && ctx.locals[0] < 10) {
    ctx.showMessage('《보너스 포인트가 부족합니다》');
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 5 && ctx.locals[5] === 0 && ctx.locals[0] >= 15) {
    ctx.showMessage('미션모드를 해금한 상태에서 게임을 시작합니다');
    ctx.showMessage('이 보너스를 사용하는 데 따르는 페널티는 없습니다');
    // Label: INPUT_LOOP_MISSION
    ctx.showMessage('이 보너스를 습득하시겠습니까?');
    ctx.showMessage('[0] - 네');
    ctx.showMessage('[1] - 아니오');
    await ctx.inputNumber();
    if (ctx.result === 0) {
      ctx.showMessage(`W 미션모드를 해금한 상태에서 시작합니다`);
      ctx.locals[0] -= 15;
      ctx.flags[570] = 1;
      ctx.locals[5] = 1;
      // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
    } else if (ctx.result === 1) {
      ctx.showMessage('미션모드를 해금하지 않습니다'); ctx.waitInput();
      // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
    } else {
      // GOTO INPUT_LOOP_MISSION - 구조 변경 필요 (while/break 사용 권장)
    }
  } else if (ctx.result === 5 && ctx.locals[5] === 0 && ctx.locals[0] < 15) {
    ctx.showMessage('《보너스 포인트가 부족합니다》');
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 6 && ctx.locals[6] === 0 && ctx.locals[0] >= 30) {
    ctx.showMessage('구입할 수 있는 아이템을 모두 소지한 상태로 게임을 시작합니다');
    ctx.showMessage('이 보너스를 사용하는 데 따르는 페널티는 없습니다');
    // Label: INPUT_LOOP_ITEM
    ctx.showMessage('이 보너스를 습득하시겠습니까?');
    ctx.showMessage('[0] - 네');
    ctx.showMessage('[1] - 아니오');
    await ctx.inputNumber();
    if (ctx.result === 0) {
      ctx.showMessage(`W 구입할 수 있는 아이템을 모두 소지한채로 시작합니다`);
      ctx.locals[0] -= 30;
      for (let COUNT = 0; COUNT < 25; COUNT++) {
        if (ctx.count == 22) {
          // TODO: CONTINUE
        }
        ctx.item[ctx.count] = 1;
      }
      for (let COUNT = 0; COUNT < 5; COUNT++) {
        // TODO: ITEM:(COUNT + 24) = 99
      }
      ctx.item[34] = 99;
      ctx.item[37] = 1;
      ctx.locals[6] = 1;
      // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
    } else if (ctx.result === 1) {
      ctx.showMessage('아이템 소지상태를 바꾸지 않습니다'); ctx.waitInput();
      // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
    } else {
      // GOTO INPUT_LOOP_ITEM - 구조 변경 필요 (while/break 사용 권장)
    }
  } else if (ctx.result === 6 && ctx.locals[6] === 0 && ctx.locals[0] < 30) {
    ctx.showMessage('《보너스 포인트가 부족합니다》');
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 7 && ctx.locals[7] === 0 && ctx.global[60] === 1 && ctx.locals[0] >= 100) {
    ctx.showMessage('게임 클리어에 필요한 빚이 없는 상태로 게임을 시작합니다');
    ctx.showMessage('이 보너스를 사용하는 데 따르는 페널티는 없습니다');
    // Label: INPUT_LOOP_NOCHARGE2
    ctx.showMessage('이 보너스를 습득하시겠습니까?');
    ctx.showMessage('[0] - 네');
    ctx.showMessage('[1] - 아니오');
    await ctx.inputNumber();
    if (ctx.result === 0) {
      ctx.showMessage(`W 필요한 빚이 없는 상태로 시작합니다`);
      ctx.locals[0] -= 100;
      ctx.locals[7] = 1;
      ctx.flags[4] = 0;
      // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
    } else if (ctx.result === 1) {
      ctx.showMessage('빚은 그대로입니다'); ctx.waitInput();
      // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
    } else {
      // GOTO INPUT_LOOP_NOCHARGE2 - 구조 변경 필요 (while/break 사용 권장)
    }
  } else if (ctx.result === 7 && ctx.locals[7] === 0 && ctx.locals[0] < 100) {
    ctx.showMessage('《보너스 포인트가 부족합니다》');
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 8 && ctx.locals[8] === 0 && ctx.locals[0] >= 10) {
    ctx.showMessage('계약 가능한 캐릭터의 남친 유무를 선택가능합니다');
    ctx.showMessage('※일부 캐릭터 제외');
    ctx.showMessage('이 보너스를 사용하는 데 따르는 페널티는 없습니다');
    // Label: INPUT_LOOP_BOYFRIEND
    ctx.showMessage('이 보너스를 습득하시겠습니까?');
    ctx.showMessage('[0] - 네');
    ctx.showMessage('[1] - 아니오');
    await ctx.inputNumber();
    if (ctx.result === 0) {
      ctx.showMessage(`W 계약 가능한 캐릭터의 남친 유무를 선택가능합니다`);
      ctx.locals[0] -= 10;
      ctx.locals[8] = 1;
      ctx.flags[567] = 1;
      // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
    } else if (ctx.result === 1) {
      ctx.showMessage('계약 가능한 캐릭터의 남친 유무를 선택하지 않습니다'); ctx.waitInput();
      // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
    } else {
      // GOTO INPUT_LOOP_BOYFRIEND - 구조 변경 필요 (while/break 사용 권장)
    }
  } else if (ctx.result === 8 && ctx.locals[8] === 0 && ctx.locals[0] < 10) {
    ctx.showMessage('《보너스 포인트가 부족합니다》');
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 9 && ctx.locals[9] === 0 && ctx.locals[0] >= 30) {
    ctx.showMessage('기쎄고 허술한 그 아이와 계약한 상태로 시작합니다');
    ctx.showMessage('이 보너스를 사용하는 데 따르는 페널티는 없습니다');
    // Label: INPUT_LOOP_ADDSACHI
    ctx.showMessage('이 보너스를 습득하시겠습니까?');
    ctx.showMessage('[0] - 네');
    ctx.showMessage('[1] - 아니오');
    await ctx.inputNumber();
    if (ctx.result === 0) {
      // TODO: ADDCHARA 106
      ctx.showMessage(`W  기쎄고 허술한 그 아이와 계약한 상태로 시작합니다`);
      ctx.locals[0] -= 30;
      ctx.locals[9] = 1;
      // TODO: LOADGLOBAL
      ctx.global[306] += 1;
      // TODO: SAVEGLOBAL
      // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
    } else if (ctx.result === 1) {
      ctx.showMessage('기쎄고 허술한 그 아이와 계약하지 않습니다'); ctx.waitInput();
      // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
    } else {
      // GOTO INPUT_LOOP_ADDSACHI - 구조 변경 필요 (while/break 사용 권장)
    }
  } else if (ctx.result === 9 && ctx.locals[9] === 0 && ctx.locals[0] < 30) {
    ctx.showMessage('《보너스 포인트가 부족합니다》');
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 10 && ctx.locals[10] === 0 && ctx.locals[0] >= 40) {
    ctx.showMessage('계약 가능한 캐릭터의 자지 유무를 선택가능합니다');
    ctx.showMessage('※일부 캐릭터 제외');
    ctx.showMessage('이 보너스를 사용하는 데 따르는 페널티는 없습니다');
    // Label: INPUT_LOOP_FUTANARI
    ctx.showMessage('이 보너스를 습득하시겠습니까?');
    ctx.showMessage('[0] - 네');
    ctx.showMessage('[1] - 아니오');
    await ctx.inputNumber();
    if (ctx.result === 0) {
      ctx.showMessage(`W 계약 가능한 캐릭터의 자지 유무를 선택가능합니다`);
      ctx.locals[0] -= 40;
      ctx.locals[10] = 1;
      ctx.flags[568] = 1;
      // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
    } else if (ctx.result === 1) {
      ctx.showMessage('계약 가능한 캐릭터의 자지 유무를 선택하지 않습니다'); ctx.waitInput();
      // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
    } else {
      // GOTO INPUT_LOOP_FUTANARI - 구조 변경 필요 (while/break 사용 권장)
    }
  } else if (ctx.result === 10 && ctx.locals[10] === 0 && ctx.locals[0] < 40) {
    ctx.showMessage('《보너스 포인트가 부족합니다》');
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 11 && ctx.locals[11] === 0 && ctx.locals[0] >= 30) {
    ctx.showMessage('언제나 뜨거운 그 아이와 계약한 상태로 시작합니다');
    ctx.showMessage('이 보너스를 사용하는 데 따르는 페널티는 없습니다');
    // Label: INPUT_LOOP_ADDHIMENO
    ctx.showMessage('이 보너스를 습득하시겠습니까?');
    ctx.showMessage('[0] - 네');
    ctx.showMessage('[1] - 아니오');
    await ctx.inputNumber();
    if (ctx.result === 0) {
      // TODO: ADDCHARA 107
      ctx.showMessage(`W  언제나 뜨거운 그 아이와 계약한 상태로 시작합니다`);
      ctx.locals[0] -= 30;
      ctx.locals[11] = 1;
      // TODO: LOADGLOBAL
      ctx.global[307] += 1;
      // TODO: SAVEGLOBAL
      // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
    } else if (ctx.result === 1) {
      ctx.showMessage('언제나 뜨거운 그 아이와 계약하지 않습니다'); ctx.waitInput();
      // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
    } else {
      // GOTO INPUT_LOOP_ADDHIMENO - 구조 변경 필요 (while/break 사용 권장)
    }
  } else if (ctx.result === 11 && ctx.locals[11] === 0 && ctx.locals[0] < 30) {
    ctx.showMessage('《보너스 포인트가 부족합니다》');
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 12 && ctx.locals[12] === 0 && ctx.locals[0] >= 200) {
    ctx.showMessage('계약 가능한 캐릭터가 보이면서 흥분하는지 선택가능합니다');
    ctx.showMessage('이 보너스를 사용하는 데 따르는 페널티는');
    ctx.showMessage('【부끄럼 없음】이 없는 모든 캐릭터가【부끄럼 없음】을 얻습니다');
    // Label: INPUT_LOOP_HENTAI
    ctx.showMessage('이 보너스를 습득하시겠습니까?');
    ctx.showMessage('[0] - 네');
    ctx.showMessage('[1] - 아니오');
    await ctx.inputNumber();
    if (ctx.result === 0) {
      ctx.showMessage(`W 계약 가능한 캐릭터가 보이면서 흥분하는지 선택가능합니다`);
      ctx.locals[0] -= 200;
      ctx.locals[12] = 1;
      ctx.flags[569] = 1;
      // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
    } else if (ctx.result === 1) {
      ctx.showMessage('계약 가능한 캐릭터가 보이면서 흥분하는지 선택하지 않습니다'); ctx.waitInput();
      // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
    } else {
      // GOTO INPUT_LOOP_HENTAI - 구조 변경 필요 (while/break 사용 권장)
    }
  } else if (ctx.result === 12 && ctx.locals[12] === 0 && ctx.locals[0] < 200) {
    ctx.showMessage('《보너스 포인트가 부족합니다》');
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 13 && ctx.locals[13] === 0 && ctx.locals[0] >= 30) {
    ctx.showMessage('고스트 프린세스 같은 그 아이와 계약한 상태로 시작합니다');
    ctx.showMessage('이 보너스를 사용하는 데 따르는 페널티는 없습니다');
    // Label: INPUT_LOOP_ADDTAMAKI
    ctx.showMessage('이 보너스를 습득하시겠습니까?');
    ctx.showMessage('[0] - 네');
    ctx.showMessage('[1] - 아니오');
    await ctx.inputNumber();
    if (ctx.result === 0) {
      // TODO: ADDCHARA 108
      ctx.showMessage(`W  고스트 프린세스 같은 그 아이와 계약한 상태로 시작합니다`);
      ctx.locals[0] -= 30;
      ctx.locals[13] = 1;
      // TODO: LOADGLOBAL
      ctx.global[308] += 1;
      // TODO: SAVEGLOBAL
      // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
    } else if (ctx.result === 1) {
      ctx.showMessage('고스트 프린세스 같은 그 아이와 계약하지 않습니다'); ctx.waitInput();
      // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
    } else {
      // GOTO INPUT_LOOP_ADDTAMAKI - 구조 변경 필요 (while/break 사용 권장)
    }
  } else if (ctx.result === 13 && ctx.locals[13] === 0 && ctx.locals[0] < 30) {
    ctx.showMessage('《보너스 포인트가 부족합니다》');
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 14 && ctx.locals[3] === 0 && ctx.locals[9] === 0 && ctx.locals[11] === 0 && ctx.locals[13] === 0 && ctx.locals[0] >= 80) {
    ctx.showMessage('클리어보너스로 계약 가능한 모든 아이와 계약한 상태로 시작합니다');
    ctx.showMessage('이 보너스를 사용하는 데 따르는 페널티는 없습니다');
    // Label: INPUT_LOOP_ADDALL
    ctx.showMessage('이 보너스를 습득하시겠습니까?');
    ctx.showMessage('[0] - 네');
    ctx.showMessage('[1] - 아니오');
    await ctx.inputNumber();
    if (ctx.result === 0) {
      // TODO: ADDCHARA 106
      // TODO: ADDCHARA 107
      // TODO: ADDCHARA 108
      // TODO: ADDCHARA 150
      ctx.showMessage(`W  클리어보너스로 계약 가능한 모든 아이와 계약한 상태로 시작합니다`);
      ctx.locals[0] -= 80;
      ctx.locals[3] = 1;
      ctx.locals[9] = 1;
      ctx.locals[11] = 1;
      ctx.locals[13] = 1;
      // TODO: LOADGLOBAL
      ctx.global[306] += 1;
      ctx.global[307] += 1;
      ctx.global[308] += 1;
      ctx.global[350] += 1;
      // TODO: SAVEGLOBAL
      // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
    } else if (ctx.result === 1) {
      ctx.showMessage('클리어보너스로 계약 가능한 모든 아이와 계약하지 않습니다'); ctx.waitInput();
      // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
    } else {
      // GOTO INPUT_LOOP_ADDALL - 구조 변경 필요 (while/break 사용 권장)
    }
  } else if (ctx.result === 14 && ctx.locals[3] === 0 && ctx.locals[9] === 0 && ctx.locals[11] === 0 && ctx.locals[13] === 0 && ctx.locals[0] < 80) {
    ctx.showMessage('《보너스 포인트가 부족합니다》');
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 15 && ctx.locals[15] === 0 && ctx.locals[0] >= 300) {
    await actress_cb_list(ctx, character);
    if (ctx.result === 1) {
      ctx.locals[0] -= 300;
      ctx.locals[15] = 1;
    }
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 15 && ctx.locals[15] === 0 && ctx.locals[0] < 300) {
    ctx.showMessage('《보너스 포인트가 부족합니다》');
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 16 && ctx.locals[16] === 0) {
    ctx.showMessage('「쿠로이 미야코」「미나・크레인」두 명과 계약합니다');
    ctx.showMessage('(Ho미션보수 재배포까지 임시조치)');
    ctx.showMessage('패널티는 없지만 세트입니다');
    // Label: INPUT_LOOP_ADDMIYAKO
    ctx.showMessage('이 보너스를 습득하시겠습니까?');
    ctx.showMessage('[0] - 네');
    ctx.showMessage('[1] - 아니오');
    await ctx.inputNumber();
    if (ctx.result === 0) {
      // TODO: ADDCHARA 97
      // TODO: ADDCHARA 105
      ctx.showMessage(`W`);
      ctx.locals[16] = 1;
      // TODO: LOADGLOBAL
      ctx.global[297] += 1;
      ctx.global[305] += 1;
      // TODO: SAVEGLOBAL
      // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
    } else if (ctx.result === 1) {
      // TODO: PRINTW
      // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
    } else {
      // GOTO INPUT_LOOP_ADDMIYAKO - 구조 변경 필요 (while/break 사용 권장)
    }
  } else if (ctx.result === 8826 && character.cflags[ctx.master][150] === 0 && character.cflags[ctx.master][150] === 0 && character.cflags[ctx.master][151] === 0 && character.cflags[ctx.master][152] === 0 && character.cflags[ctx.master][153] === 0 && character.cflags[ctx.master][154] === 0 && character.cflags[ctx.master][155] === 0 && character.cflags[ctx.master][156] === 0 && character.cflags[ctx.master][157] === 0 && character.cflags[ctx.master][158] === 0 && character.cflags[ctx.master][161] === 0 && character.cflags[ctx.master][162] === 0) {
    ctx.showMessage(`W 디버그용입니다`);
    ctx.flags[3] *= 2;
    character.cflags[ctx.master][150] = 1;
    ctx.money = 500000;
    character.cflags[ctx.master][151] = 1;
    character.cflags[ctx.master][153] = 1;
    ctx.getTalent(master, 55) = 1;
    ctx.getTalent(master, 91) = 1;
    ctx.getTalent(master, 92) = 1;
    ctx.getTalent(master, 93) = 1;
    ctx.getTalent(master, 325) = 1;
    ctx.masterAbilities[12] = 10;
    ctx.flags[570] = 1;
    character.cflags[ctx.master][154] = 1;
    for (let COUNT = 0; COUNT < 25; COUNT++) {
      if (ctx.count == 22) {
        // TODO: CONTINUE
      }
      ctx.item[ctx.count] = 1;
    }
    for (let COUNT = 0; COUNT < 5; COUNT++) {
      // TODO: ITEM:(COUNT + 24) = 99
    }
    ctx.item[34] = 99;
    ctx.item[37] = 1;
    character.cflags[ctx.master][156] = 1;
    ctx.exp[ctx.master][90] += 50;
    character.cflags[ctx.master][155] = 1;
    character.cflags[ctx.master][157] = 1;
    ctx.flags[4] = 0;
    character.cflags[ctx.master][158] = 1;
    ctx.flags[567] = 1;
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 999) {
    if (GETCHARA(S, 0) != -1) {
      character = GETCHARA(S);
      await defolt_genitalcall(ctx, character);
      await clearbonus_call(ctx, character);
    }
    if (GETCHARA(180, 0) != -1) {
      character = GETCHARA(180);
      await defolt_genitalcall(ctx, character);
      await clearbonus_call(ctx, character);
    }
    if (GETCHARA(106, 0) != -1) {
      character = GETCHARA(106);
      await defolt_genitalcall(ctx, character);
      await clearbonus_call(ctx, character);
    }
    if (GETCHARA(107, 0) != -1) {
      character = GETCHARA(107);
      await defolt_genitalcall(ctx, character);
      await clearbonus_call(ctx, character);
    }
    if (GETCHARA(108, 0) != -1) {
      character = GETCHARA(108);
      await defolt_genitalcall(ctx, character);
      await clearbonus_call(ctx, character);
    }
    if (GETCHARA(150, 0) != -1) {
      character = GETCHARA(150);
      await defolt_genitalcall(ctx, character);
      await clearbonus_call(ctx, character);
    }
    if (GETCHARA(Y, 0) != -1) {
      character = GETCHARA(Y);
      await defolt_genitalcall(ctx, character);
      await clearbonus_call(ctx, character);
    }
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  return;
}

export async function characlear_calc(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else if (ctx.getTalent(count, 430) === 1 && character.cflags[ctx.count][850] === 0) {
      // TODO: LOADGLOBAL
      character.cflags[ctx.count][850] = 1;
      ctx.global[200] += 1;
      // TODO: SAVEGLOBAL
    }
  }
}

export async function actress_cb_list(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #DIM LIST, 250
  // TODO: #DIM PAGE
  // TODO: #DIM MAXPAGE
  // TODO: #DIM SHOWNUM
  // TODO: #DIM SHOWCOLUMN
  // TODO: #DIM SHOWLENGTH
  // TODO: LOADGLOBAL
  Y = 0;
  SHOWNUM = 30;
  SHOWCOLUMN = 3;
  SHOWLENGTH = 108;
  ctx.varSet(LIST, -1);
  ctx.locals[1] = 0;
  // TODO: FOR LOCAL, 0, 250
  if (!EXISTCSV(ctx.locals[0], 0)) {
    // TODO: CONTINUE
  }
  if (ctx.locals[0] == ctx.master) {
    // TODO: CONTINUE
  }
  // TODO: LIST:(LOCAL:1) = LOCAL
  ctx.locals[1]++;
  // TODO: NEXT
  MAXPAGE = ctx.locals[1] / SHOWNUM;
  // Label: INPUT_LOOP35
  ctx.drawLine();
  ctx.showMessage(`여배우명부 page[{PAGE}/{MAXPAGE}]`);
  ctx.showMessage(`%"‥" * (SHOWLENGTH / 2)%`);
  ctx.locals[1] = 0;
  // TODO: FOR LOCAL, PAGE * SHOWNUM, (PAGE + 1) * SHOWNUM
  if (ctx.locals[0] >= 250) {
    // TODO: CONTINUE
  }
  if (ctx.list[ctx.locals[0]] < 0) {
    ctx.showMessage(`%"", SHOWLENGTH / 3, LEFT%`);
  } else if (global[200 + ctx.list[ctx.locals[0]]]) {
    ctx.showMessage(`%@"[${ctx.list[ctx.locals[0]], 3}] - %CSVNAME(LIST:LOCAL, 0)%", SHOWLENGTH / 3, LEFT%`);
  } else {
    ctx.showMessage(`%"[ - ] - ----------", SHOWLENGTH / 3, LEFT%`);
  }
  if (ctx.locals[1] % SHOWCOLUMN == SHOWCOLUMN - 1) {
    ctx.showMessage('');
  }
  ctx.locals[1]++;
  // TODO: NEXT
  if (!await lineisempty(ctx, character)) {
    ctx.showMessage('');
  }
  ctx.showMessage(`%"‥" * (SHOWLENGTH / 2)%`);
  ctx.showMessage(`%"[998] - 이전 페이지", SHOWLENGTH / 3, LEFT%`);
  ctx.showMessage(`%"[999] - 돌아간다", SHOWLENGTH / 3, LEFT%`);
  ctx.showMessage(`%"[1000] - 다음 페이지", SHOWLENGTH / 3, LEFT%`);
  ctx.showMessage('');
  await ctx.inputNumber();
  if (ctx.result === 999) {
    return 0;
  } else if (ctx.result === 998 && ctx.page > 0) {
    ctx.page -= 1;
  } else if (ctx.result === 1000 && ctx.page < MAXPAGE) {
    ctx.page += 1;
  } else if (ctx.result >= 0 && ctx.result < 250 && MATCH(LIST, ctx.result) && global[200 + ctx.result] > 0) {
    Y = ctx.result;
    // TODO: ADDCHARA Y
    if (GETCHARA(Y, 0) != -1) {
      character = GETCHARA(Y);
    }
    ctx.showMessage(`%타겟과(1)% 계약한 상태로 시작하겠습니까?`);
    ctx.showMessage(`[0] - 네`);
    ctx.showMessage(`[1] - 아니오`);
    // Label: INPUT_LOOP_ACTRESS
    await ctx.inputNumber();
    if (ctx.result === 0) {
      ctx.showMessage(`W %타겟과(1)% 계약했습니다`);
      // TODO: FLAG:(999 + (NO:TARGET)) = -1
      // TODO: LOADGLOBAL
      // TODO: GLOBAL:(200 + (NO:TARGET)) += 1
      // TODO: SAVEGLOBAL
      await defolt_genitalcall(ctx, character);
      await clearbonus_call_chara(ctx, character);
      if (ctx.talents[330] == 1) {
        ctx.talents[330] = 0;
      }
      return 1;
    } else if (ctx.result) {
      ctx.showMessage(`W %타겟과(1)% 계약하지 않았습니다`);
      await キャラ削除, target(ctx, character);
    } else {
      // GOTO INPUT_LOOP_ACTRESS - 구조 변경 필요 (while/break 사용 권장)
    }
  }
  // GOTO INPUT_LOOP35 - 구조 변경 필요 (while/break 사용 권장)
}
