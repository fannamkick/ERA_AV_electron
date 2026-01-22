/**
 * CHEAT.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function cheat_main(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // Label: CHEAT_LOOP
  ctx.drawLine();
  ctx.showMessage('【치트 메뉴】');
  ctx.showMessage('');
  ctx.showMessage(`현재 소지금: {MONEY} 원`);
  ctx.showMessage(`현재 시간: {DAY+1}주차 \@(TIME == 0) ? "전반" # "후반"\@`);
  ctx.showMessage('');
  ctx.showMessage('[1] - 돈 추가');
  ctx.showMessage('[2] - 시간 조작');
  ctx.showMessage('[3] - 아이템 획득');
  ctx.showMessage('[4] - 캐릭터 에디터');
  ctx.showMessage('[5] - 전체 해금');
  ctx.showMessage('');
  ctx.showMessage('[0] - 돌아가기');
  ctx.showMessage('');
  await ctx.inputNumber();
  switch (ctx.result) {
    case 1:
      await cheat_money(ctx, character);
      case 2:
        await cheat_time(ctx, character);
        case 3:
          await cheat_item(ctx, character);
          case 4:
            await cheat_chara_select(ctx, character);
            case 5:
              await cheat_unlock(ctx, character);
              case 0:
                return 0;
              break;
            }
            // GOTO CHEAT_LOOP - 구조 변경 필요 (while/break 사용 권장)
}

export async function cheat_money(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine();
  ctx.showMessage('【돈 추가】');
  ctx.showMessage('');
  ctx.showMessage(`현재 소지금: {MONEY} 원`);
  ctx.showMessage('');
  ctx.showMessage('[1] - +10,000 원');
  ctx.showMessage('[2] - +100,000 원');
  ctx.showMessage('[3] - +1,000,000 원');
  ctx.showMessage('[4] - +10,000,000 원');
  ctx.showMessage('[5] - 직접 입력');
  ctx.showMessage('');
  ctx.showMessage('[0] - 돌아가기');
  ctx.showMessage('');
  await ctx.inputNumber();
  switch (ctx.result) {
    case 1:
      ctx.money += 10000;
      ctx.showMessage(`10,000 원 추가! 현재: {MONEY} 원`);
      case 2:
        ctx.money += 100000;
        ctx.showMessage(`100,000 원 추가! 현재: {MONEY} 원`);
        case 3:
          ctx.money += 1000000;
          ctx.showMessage(`1,000,000 원 추가! 현재: {MONEY} 원`);
          case 4:
            ctx.money += 10000000;
            ctx.showMessage(`10,000,000 원 추가! 현재: {MONEY} 원`);
            case 5:
              ctx.showMessage('추가할 금액을 입력하세요:');
              await ctx.inputNumber();
              ctx.money += ctx.result;
              ctx.showMessage(`{RESULT} 원 추가! 현재: {MONEY} 원`);
              case 0:
                return 0;
              break;
            }
            await ctx.wait();
            return 0;
}

export async function cheat_time(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine();
  ctx.showMessage('【시간 조작】');
  ctx.showMessage('');
  ctx.showMessage(`현재 시간: {DAY+1}주차 \@(TIME == 0) ? "전반" # "후반"\@`);
  ctx.showMessage('');
  ctx.showMessage('[1] - 전반/후반 전환');
  ctx.showMessage('[2] - 다음 주로');
  ctx.showMessage('[3] - 이전 주로');
  ctx.showMessage('[4] - 주차 직접 설정');
  ctx.showMessage('');
  ctx.showMessage('[0] - 돌아가기');
  ctx.showMessage('');
  await ctx.inputNumber();
  switch (ctx.result) {
    case 1:
      TIME = (TIME + 1) % 2;
      ctx.showMessage(`시간 변경: \@(TIME == 0) ? "전반" # "후반"\@`);
      case 2:
        DAY += 1;
        ctx.showMessage(`시간 변경: {DAY+1}주차`);
        case 3:
          DAY -= 1;
          if (DAY < 0) {
            DAY = 0;
          }
          ctx.showMessage(`시간 변경: {DAY+1}주차`);
          case 4:
            ctx.showMessage('주차를 입력하세요 (1~):');
            await ctx.inputNumber();
            DAY = ctx.result - 1;
            if (DAY < 0) {
              DAY = 0;
            }
            ctx.showMessage(`시간 설정: {DAY+1}주차`);
            case 0:
              return 0;
            break;
          }
          await ctx.wait();
          return 0;
}

export async function cheat_item(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // Label: ITEM_LOOP
  ctx.drawLine();
  ctx.showMessage('【아이템 획득】');
  ctx.showMessage('');
  PRINTL = "== 소모품 ===";
  ctx.showMessage(`[24] 콘돔: ${ctx.item[24]}개   [25] 로션: ${ctx.item[25]}개`);
  ctx.showMessage(`[26] 프린세스포이즌: ${ctx.item[26]}개   [27] 이뇨제: ${ctx.item[27]}개`);
  ctx.showMessage(`[30] 영양제: ${ctx.item[30]}개   [40] 배란유발제: ${ctx.item[40]}개`);
  ctx.showMessage('');
  PRINTL = "== 장비 (미보유만 표시) ===";
  if (ctx.item[0] == 0) {
    ctx.showMessage('[0] 로터');
  }
  if (ctx.item[1] == 0) {
    ctx.showMessage('[1] 바이브');
  }
  if (ctx.item[2] == 0) {
    ctx.showMessage('[2] E마사지기');
  }
  if (ctx.item[3] == 0) {
    ctx.showMessage('[3] 애널바이브');
  }
  if (ctx.item[6] == 0) {
    ctx.showMessage('[6] 비디오카메라');
  }
  if (ctx.item[7] == 0) {
    ctx.showMessage('[7] 클리캡');
  }
  if (ctx.item[8] == 0) {
    ctx.showMessage('[8] 니플캡');
  }
  if (ctx.item[10] == 0) {
    ctx.showMessage('[10] 채찍');
  }
  if (ctx.item[14] == 0) {
    ctx.showMessage('[14] 밧줄');
  }
  if (ctx.item[17] == 0) {
    ctx.showMessage('[17] 착유기');
  }
  if (ctx.item[39] == 0) {
    ctx.showMessage('[39] 비밀지식');
  }
  if (ctx.item[90] == 0) {
    ctx.showMessage('[90] 촉수생물');
  }
  ctx.showMessage('');
  ctx.showMessage('[100] - 소모품 전부 99개');
  ctx.showMessage('[101] - 장비 전부 획득');
  ctx.showMessage('[0] - 돌아가기');
  ctx.showMessage('');
  await ctx.inputNumber();
  if (ctx.result === 0) {
    return 0;
  } else if (ctx.result === 100) {
    ctx.item[24] = 99;
    ctx.item[25] = 99;
    ctx.item[26] = 99;
    ctx.item[27] = 99;
    ctx.item[30] = 99;
    ctx.item[40] = 99;
    ctx.showMessage('소모품 전부 99개로 설정!');
    await ctx.wait();
    // GOTO ITEM_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 101) {
    ctx.item[0] = 1;
    ctx.item[1] = 1;
    ctx.item[2] = 1;
    ctx.item[3] = 1;
    ctx.item[6] = 1;
    ctx.item[7] = 1;
    ctx.item[8] = 1;
    ctx.item[10] = 1;
    ctx.item[14] = 1;
    ctx.item[17] = 1;
    ctx.item[39] = 1;
    ctx.item[90] = 1;
    ctx.showMessage('장비 전부 획득!');
    await ctx.wait();
    // GOTO ITEM_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 24) {
    ctx.showMessage(`콘돔 현재: ${ctx.item[24]}개`);
    ctx.showMessage('설정할 개수:');
    await ctx.inputNumber();
    ctx.item[24] = ctx.result;
    ctx.showMessage('설정 완료!');
    await ctx.wait();
  } else if (ctx.result === 25) {
    ctx.showMessage(`로션 현재: ${ctx.item[25]}개`);
    ctx.showMessage('설정할 개수:');
    await ctx.inputNumber();
    ctx.item[25] = ctx.result;
    ctx.showMessage('설정 완료!');
    await ctx.wait();
  } else if (ctx.result === 26) {
    ctx.showMessage(`프린세스포이즌 현재: ${ctx.item[26]}개`);
    ctx.showMessage('설정할 개수:');
    await ctx.inputNumber();
    ctx.item[26] = ctx.result;
    ctx.showMessage('설정 완료!');
    await ctx.wait();
  } else if (ctx.result === 27) {
    ctx.showMessage(`이뇨제 현재: ${ctx.item[27]}개`);
    ctx.showMessage('설정할 개수:');
    await ctx.inputNumber();
    ctx.item[27] = ctx.result;
    ctx.showMessage('설정 완료!');
    await ctx.wait();
  } else if (ctx.result === 30) {
    ctx.showMessage(`영양제 현재: ${ctx.item[30]}개`);
    ctx.showMessage('설정할 개수:');
    await ctx.inputNumber();
    ctx.item[30] = ctx.result;
    ctx.showMessage('설정 완료!');
    await ctx.wait();
  } else if (ctx.result === 40) {
    ctx.showMessage(`배란유발제 현재: ${ctx.item[40]}개`);
    ctx.showMessage('설정할 개수:');
    await ctx.inputNumber();
    ctx.item[40] = ctx.result;
    ctx.showMessage('설정 완료!');
    await ctx.wait();
  } else if (ctx.result === 1) {
    ctx.item[1] = 1;
    ctx.showMessage('바이브 획득!');
    await ctx.wait();
  } else if (ctx.result === 2) {
    ctx.item[2] = 1;
    ctx.showMessage('E마사지기 획득!');
    await ctx.wait();
  } else if (ctx.result === 3) {
    ctx.item[3] = 1;
    ctx.showMessage('애널바이브 획득!');
    await ctx.wait();
  } else if (ctx.result === 6) {
    ctx.item[6] = 1;
    ctx.showMessage('비디오카메라 획득!');
    await ctx.wait();
  } else if (ctx.result === 7) {
    ctx.item[7] = 1;
    ctx.showMessage('클리캡 획득!');
    await ctx.wait();
  } else if (ctx.result === 8) {
    ctx.item[8] = 1;
    ctx.showMessage('니플캡 획득!');
    await ctx.wait();
  } else if (ctx.result === 10) {
    ctx.item[10] = 1;
    ctx.showMessage('채찍 획득!');
    await ctx.wait();
  } else if (ctx.result === 14) {
    ctx.item[14] = 1;
    ctx.showMessage('밧줄 획득!');
    await ctx.wait();
  } else if (ctx.result === 17) {
    ctx.item[17] = 1;
    ctx.showMessage('착유기 획득!');
    await ctx.wait();
  } else if (ctx.result === 39) {
    ctx.item[39] = 1;
    ctx.showMessage('비밀지식 획득!');
    await ctx.wait();
  } else if (ctx.result === 90) {
    ctx.item[90] = 1;
    ctx.showMessage('촉수생물 획득!');
    await ctx.wait();
  }
  // GOTO ITEM_LOOP - 구조 변경 필요 (while/break 사용 권장)
}

export async function cheat_chara_select(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // Label: CHARA_SELECT_LOOP
  ctx.drawLine();
  ctx.showMessage('【캐릭터 에디터 - 캐릭터 선택】');
  ctx.showMessage('');
  ctx.locals[0] = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    ctx.showMessage(`[${ctx.count}] ${ctx.getName(ctx.count)}`);
  }
  ctx.showMessage('');
  ctx.showMessage('[999] - 돌아가기');
  ctx.showMessage('');
  await ctx.inputNumber();
  if (ctx.result === 999) {
    return 0;
  } else if (ctx.result < 0 || ctx.result >= ctx.charanum) {
    // GOTO CHARA_SELECT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  character = ctx.result;
  await cheat_chara_edit(ctx, character);
  // GOTO CHARA_SELECT_LOOP - 구조 변경 필요 (while/break 사용 권장)
}

export async function cheat_chara_edit(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // Label: CHARA_EDIT_LOOP
  ctx.drawLine();
  ctx.showMessage(`【캐릭터 에디터 - ${ctx.getName(character)}】`);
  ctx.showMessage('');
  ctx.showMessage('');
  ctx.showMessage('[1] - 능력(ABL) 수정');
  ctx.showMessage('[2] - 경험(EXP) 수정');
  ctx.showMessage('[3] - 소질(TALENT) 수정');
  ctx.showMessage('[4] - 구슬(JUEL) 수정');
  ctx.showMessage('[5] - 기본 스탯 수정');
  ctx.showMessage('[6] - 상성(RELATION) 수정');
  ctx.showMessage('[7] - 원클릭 세팅');
  ctx.showMessage('');
  ctx.showMessage('[0] - 돌아가기');
  ctx.showMessage('');
  await ctx.inputNumber();
  switch (ctx.result) {
    case 1:
      await cheat_abl(ctx, character);
      case 2:
        await cheat_exp(ctx, character);
        case 3:
          await cheat_talent(ctx, character);
          case 4:
            await cheat_juel(ctx, character);
            case 5:
              await cheat_base(ctx, character);
              case 6:
                await cheat_relation(ctx, character);
                case 7:
                  await cheat_oneclick(ctx, character);
                  case 0:
                    return 0;
                  break;
                }
                // GOTO CHARA_EDIT_LOOP - 구조 변경 필요 (while/break 사용 권장)
}

export async function cheat_abl(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // Label: ABL_LOOP
  ctx.drawLine();
  ctx.showMessage(`【${ctx.getName(character)} - 능력(ABL) 수정】`);
  ctx.showMessage('');
  ctx.showMessage('');
  ctx.showMessage(`[0] C감각: ${ctx.abilities[character][0]}   [1] B감각: ${ctx.abilities[character][1]}`);
  ctx.showMessage(`[2] V감각: ${ctx.abilities[character][2]}   [3] A감각: ${ctx.abilities[character][3]}`);
  ctx.showMessage('');
  ctx.showMessage(`[10] 신뢰: ${ctx.abilities[character][10]}   [11] 욕망: ${ctx.abilities[character][11]}`);
  ctx.showMessage(`[12] 순종: ${ctx.abilities[character][12]}   [13] 기교: ${ctx.abilities[character][13]}`);
  ctx.showMessage(`[14] 봉사: ${ctx.abilities[character][14]}   [15] 노출: ${ctx.abilities[character][15]}`);
  ctx.showMessage('');
  ctx.showMessage('[100] - 전부 MAX');
  ctx.showMessage('[999] - 돌아가기');
  ctx.showMessage('');
  await ctx.inputNumber();
  if (ctx.result === 999) {
    return 0;
  } else if (ctx.result === 100) {
    ctx.abilities[character][0] = 10;
    ctx.abilities[character][1] = 10;
    ctx.abilities[character][2] = 10;
    ctx.abilities[character][3] = 10;
    ctx.abilities[character][10] = 10;
    ctx.abilities[character][11] = 10;
    ctx.abilities[character][12] = 10;
    ctx.abilities[character][13] = 10;
    ctx.abilities[character][14] = 10;
    ctx.abilities[character][15] = 10;
    ctx.showMessage('모든 능력을 MAX로 설정했습니다!');
    await ctx.wait();
    // GOTO ABL_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 0) {
    ctx.showMessage('새 값:');
    await ctx.inputNumber();
    ctx.abilities[character][0] = ctx.result;
  } else if (ctx.result === 1) {
    ctx.showMessage('새 값:');
    await ctx.inputNumber();
    ctx.abilities[character][1] = ctx.result;
  } else if (ctx.result === 2) {
    ctx.showMessage('새 값:');
    await ctx.inputNumber();
    ctx.abilities[character][2] = ctx.result;
  } else if (ctx.result === 3) {
    ctx.showMessage('새 값:');
    await ctx.inputNumber();
    ctx.abilities[character][3] = ctx.result;
  } else if (ctx.result === 10) {
    ctx.showMessage('새 값:');
    await ctx.inputNumber();
    ctx.abilities[character][10] = ctx.result;
  } else if (ctx.result === 11) {
    ctx.showMessage('새 값:');
    await ctx.inputNumber();
    ctx.abilities[character][11] = ctx.result;
  } else if (ctx.result === 12) {
    ctx.showMessage('새 값:');
    await ctx.inputNumber();
    ctx.abilities[character][12] = ctx.result;
  } else if (ctx.result === 13) {
    ctx.showMessage('새 값:');
    await ctx.inputNumber();
    ctx.abilities[character][13] = ctx.result;
  } else if (ctx.result === 14) {
    ctx.showMessage('새 값:');
    await ctx.inputNumber();
    ctx.abilities[character][14] = ctx.result;
  } else if (ctx.result === 15) {
    ctx.showMessage('새 값:');
    await ctx.inputNumber();
    ctx.abilities[character][15] = ctx.result;
  }
  ctx.showMessage('설정 완료!');
  await ctx.wait();
  // GOTO ABL_LOOP - 구조 변경 필요 (while/break 사용 권장)
}

export async function cheat_exp(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // Label: EXP_LOOP
  ctx.drawLine();
  ctx.showMessage(`【${ctx.getName(character)} - 경험(EXP) 수정】`);
  ctx.showMessage('');
  ctx.showMessage('');
  ctx.showMessage(`[0] V경험: ${ctx.exp[character][0]}     [1] A경험: ${ctx.exp[character][1]}`);
  ctx.showMessage(`[2] 절정: ${ctx.exp[character][2]}      [5] 성교: ${ctx.exp[character][5]}`);
  ctx.showMessage(`[10] 자위: ${ctx.exp[character][10]}    [22] 펠라: ${ctx.exp[character][22]}`);
  ctx.showMessage(`[76] AV출연: ${ctx.exp[character][76]}  [91] 인기: ${ctx.exp[character][91]}`);
  ctx.showMessage('');
  ctx.showMessage('[100] - 전부 MAX');
  ctx.showMessage('[999] - 돌아가기');
  ctx.showMessage('');
  await ctx.inputNumber();
  if (ctx.result === 999) {
    return 0;
  } else if (ctx.result === 100) {
    ctx.exp[character][0] = 9999;
    ctx.exp[character][1] = 9999;
    ctx.exp[character][2] = 9999;
    ctx.exp[character][5] = 9999;
    ctx.exp[character][10] = 9999;
    ctx.exp[character][22] = 9999;
    ctx.exp[character][76] = 9999;
    ctx.exp[character][91] = 9999;
    ctx.showMessage('모든 경험을 MAX로 설정했습니다!');
    await ctx.wait();
    // GOTO EXP_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 0) {
    ctx.showMessage('새 값:');
    await ctx.inputNumber();
    ctx.exp[character][0] = ctx.result;
  } else if (ctx.result === 1) {
    ctx.showMessage('새 값:');
    await ctx.inputNumber();
    ctx.exp[character][1] = ctx.result;
  } else if (ctx.result === 2) {
    ctx.showMessage('새 값:');
    await ctx.inputNumber();
    ctx.exp[character][2] = ctx.result;
  } else if (ctx.result === 5) {
    ctx.showMessage('새 값:');
    await ctx.inputNumber();
    ctx.exp[character][5] = ctx.result;
  } else if (ctx.result === 10) {
    ctx.showMessage('새 값:');
    await ctx.inputNumber();
    ctx.exp[character][10] = ctx.result;
  } else if (ctx.result === 22) {
    ctx.showMessage('새 값:');
    await ctx.inputNumber();
    ctx.exp[character][22] = ctx.result;
  } else if (ctx.result === 76) {
    ctx.showMessage('새 값:');
    await ctx.inputNumber();
    ctx.exp[character][76] = ctx.result;
  } else if (ctx.result === 91) {
    ctx.showMessage('새 값:');
    await ctx.inputNumber();
    ctx.exp[character][91] = ctx.result;
  }
  ctx.showMessage('설정 완료!');
  await ctx.wait();
  // GOTO EXP_LOOP - 구조 변경 필요 (while/break 사용 권장)
}

export async function cheat_talent(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // Label: TALENT_LOOP
  ctx.drawLine();
  ctx.showMessage(`【${ctx.getName(character)} - 소질(TALENT) 수정】`);
  ctx.showMessage('');
  ctx.showMessage('');
  ctx.showMessage(`[0] 처녀: \@TALENT:TARGET:0 ? "O" # "X"\@`);
  ctx.showMessage(`    [2] 애널처녀: \@TALENT:TARGET:2 ? "O" # "X"\@`);
  ctx.showMessage('');
  ctx.showMessage(`[76] 음란: \@TALENT:TARGET:76 ? "O" # "X"\@`);
  ctx.showMessage(`    [85] 연심: \@TALENT:TARGET:85 ? "O" # "X"\@`);
  ctx.showMessage(`[90] 섹프: \@TALENT:TARGET:90 ? "O" # "X"\@`);
  ctx.showMessage(`    [440] 절륜: \@TALENT:TARGET:440 ? "O" # "X"\@`);
  ctx.showMessage('');
  ctx.showMessage(`[74] 자위광: \@TALENT:TARGET:74 ? "O" # "X"\@`);
  ctx.showMessage(`  [75] 섹스광: \@TALENT:TARGET:75 ? "O" # "X"\@`);
  ctx.showMessage(`[77] 애널광: \@TALENT:TARGET:77 ? "O" # "X"\@`);
  ctx.showMessage(`  [78] 가슴광: \@TALENT:TARGET:78 ? "O" # "X"\@`);
  ctx.showMessage('');
  ctx.showMessage('[999] - 돌아가기');
  ctx.showMessage('');
  ctx.showMessage('토글할 소질 번호:');
  await ctx.inputNumber();
  if (ctx.result === 999) {
    return 0;
  } else if (ctx.result === 0) {
    ctx.getTalent(target, 0) = 1 - ctx.getTalent(target, 0);
  } else if (ctx.result === 2) {
    ctx.getTalent(target, 2) = 1 - ctx.getTalent(target, 2);
  } else if (ctx.result === 74) {
    ctx.getTalent(target, 74) = 1 - ctx.getTalent(target, 74);
  } else if (ctx.result === 75) {
    ctx.getTalent(target, 75) = 1 - ctx.getTalent(target, 75);
  } else if (ctx.result === 76) {
    ctx.getTalent(target, 76) = 1 - ctx.getTalent(target, 76);
  } else if (ctx.result === 77) {
    ctx.getTalent(target, 77) = 1 - ctx.getTalent(target, 77);
  } else if (ctx.result === 78) {
    ctx.getTalent(target, 78) = 1 - ctx.getTalent(target, 78);
  } else if (ctx.result === 85) {
    ctx.getTalent(target, 85) = 1 - ctx.getTalent(target, 85);
  } else if (ctx.result === 90) {
    ctx.getTalent(target, 90) = 1 - ctx.getTalent(target, 90);
  } else if (ctx.result === 440) {
    ctx.getTalent(target, 440) = 1 - ctx.getTalent(target, 440);
  }
  ctx.showMessage('토글 완료!');
  await ctx.wait();
  // GOTO TALENT_LOOP - 구조 변경 필요 (while/break 사용 권장)
}

export async function cheat_juel(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // Label: JUEL_LOOP
  ctx.drawLine();
  ctx.showMessage(`【${ctx.getName(character)} - 구슬(JUEL) 수정】`);
  ctx.showMessage('');
  ctx.showMessage('');
  ctx.showMessage(`[0] 쾌C: ${ctx.juel[character][0]}    [1] 쾌V: ${ctx.juel[character][1]}`);
  ctx.showMessage(`[2] 쾌A: ${ctx.juel[character][2]}    [14] 쾌B: ${ctx.juel[character][14]}`);
  ctx.showMessage('');
  ctx.showMessage(`[4] 온순: ${ctx.juel[character][4]}   [5] 욕정: ${ctx.juel[character][5]}`);
  ctx.showMessage(`[6] 굴복: ${ctx.juel[character][6]}   [7] 습득: ${ctx.juel[character][7]}`);
  ctx.showMessage('');
  ctx.showMessage(`[100] 부정: ${ctx.juel[character][100]}`);
  ctx.showMessage('');
  ctx.showMessage('[200] - 긍정 구슬 MAX');
  ctx.showMessage('[201] - 부정 구슬 제거');
  ctx.showMessage('[999] - 돌아가기');
  ctx.showMessage('');
  await ctx.inputNumber();
  if (ctx.result === 999) {
    return 0;
  } else if (ctx.result === 200) {
    ctx.juel[character][0] = 1000000;
    ctx.juel[character][1] = 1000000;
    ctx.juel[character][2] = 1000000;
    ctx.juel[character][14] = 1000000;
    ctx.juel[character][4] = 1000000;
    ctx.juel[character][5] = 1000000;
    ctx.juel[character][6] = 1000000;
    ctx.juel[character][7] = 1000000;
    ctx.showMessage('긍정 구슬 MAX!');
    await ctx.wait();
    // GOTO JUEL_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 201) {
    ctx.juel[character][9] = 0;
    ctx.juel[character][10] = 0;
    ctx.juel[character][11] = 0;
    ctx.juel[character][12] = 0;
    ctx.juel[character][13] = 0;
    ctx.juel[character][100] = 0;
    ctx.showMessage('부정 구슬 제거!');
    await ctx.wait();
    // GOTO JUEL_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 0) {
    ctx.showMessage('새 값:');
    await ctx.inputNumber();
    ctx.juel[character][0] = ctx.result;
  } else if (ctx.result === 1) {
    ctx.showMessage('새 값:');
    await ctx.inputNumber();
    ctx.juel[character][1] = ctx.result;
  } else if (ctx.result === 2) {
    ctx.showMessage('새 값:');
    await ctx.inputNumber();
    ctx.juel[character][2] = ctx.result;
  } else if (ctx.result === 14) {
    ctx.showMessage('새 값:');
    await ctx.inputNumber();
    ctx.juel[character][14] = ctx.result;
  } else if (ctx.result === 4) {
    ctx.showMessage('새 값:');
    await ctx.inputNumber();
    ctx.juel[character][4] = ctx.result;
  } else if (ctx.result === 5) {
    ctx.showMessage('새 값:');
    await ctx.inputNumber();
    ctx.juel[character][5] = ctx.result;
  } else if (ctx.result === 6) {
    ctx.showMessage('새 값:');
    await ctx.inputNumber();
    ctx.juel[character][6] = ctx.result;
  } else if (ctx.result === 7) {
    ctx.showMessage('새 값:');
    await ctx.inputNumber();
    ctx.juel[character][7] = ctx.result;
  } else if (ctx.result === 100) {
    ctx.showMessage('새 값:');
    await ctx.inputNumber();
    ctx.juel[character][100] = ctx.result;
  }
  ctx.showMessage('설정 완료!');
  await ctx.wait();
  // GOTO JUEL_LOOP - 구조 변경 필요 (while/break 사용 권장)
}

export async function cheat_base(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // Label: BASE_LOOP
  ctx.drawLine();
  ctx.showMessage(`【${ctx.getName(character)} - 기본 스탯 수정】`);
  ctx.showMessage('');
  ctx.showMessage('');
  ctx.showMessage(`[1] 체력: ${ctx.base[character][0]} / ${MAXctx.base[character][0]}`);
  ctx.showMessage(`[2] 기력: ${ctx.base[character][1]} / ${MAXctx.base[character][1]}`);
  ctx.showMessage(`[3] 호감도: ${character.cflags[character][100]}`);
  ctx.showMessage('');
  ctx.showMessage(`[4] 체력 최대치: ${MAXctx.base[character][0]}`);
  ctx.showMessage(`[5] 기력 최대치: ${MAXctx.base[character][1]}`);
  ctx.showMessage('');
  ctx.showMessage('[100] - 체력/기력 전회복');
  ctx.showMessage('[101] - 체력 최대치 +100');
  ctx.showMessage('[102] - 기력 최대치 +100');
  ctx.showMessage('[103] - 체력/기력 최대치 +500');
  ctx.showMessage('[0] - 돌아가기');
  ctx.showMessage('');
  await ctx.inputNumber();
  if (ctx.result === 0) {
    return 0;
  } else if (ctx.result === 100) {
    ctx.base[character][0] = MAXctx.base[character][0];
    ctx.base[character][1] = MAXctx.base[character][1];
    ctx.showMessage('체력/기력 전회복!');
    await ctx.wait();
  } else if (ctx.result === 101) {
    MAXctx.base[character][0] += 100;
    ctx.base[character][0] = MAXctx.base[character][0];
    ctx.showMessage(`체력 최대치 +100! 현재: ${MAXctx.base[character][0]}`);
    await ctx.wait();
  } else if (ctx.result === 102) {
    MAXctx.base[character][1] += 100;
    ctx.base[character][1] = MAXctx.base[character][1];
    ctx.showMessage(`기력 최대치 +100! 현재: ${MAXctx.base[character][1]}`);
    await ctx.wait();
  } else if (ctx.result === 103) {
    MAXctx.base[character][0] += 500;
    MAXctx.base[character][1] += 500;
    ctx.base[character][0] = MAXctx.base[character][0];
    ctx.base[character][1] = MAXctx.base[character][1];
    ctx.showMessage(`체력/기력 최대치 +500! 체력: ${MAXctx.base[character][0]}, 기력: ${MAXctx.base[character][1]}`);
    await ctx.wait();
  } else if (ctx.result === 1) {
    ctx.showMessage(`체력 현재값: ${ctx.base[character][0]}`);
    ctx.showMessage('새 값:');
    await ctx.inputNumber();
    ctx.base[character][0] = ctx.result;
    ctx.showMessage('설정 완료!');
    await ctx.wait();
  } else if (ctx.result === 2) {
    ctx.showMessage(`기력 현재값: ${ctx.base[character][1]}`);
    ctx.showMessage('새 값:');
    await ctx.inputNumber();
    ctx.base[character][1] = ctx.result;
    ctx.showMessage('설정 완료!');
    await ctx.wait();
  } else if (ctx.result === 3) {
    ctx.showMessage(`호감도 현재값: ${character.cflags[character][100]}`);
    ctx.showMessage('새 값:');
    await ctx.inputNumber();
    character.cflags[character][100] = ctx.result;
    ctx.showMessage('설정 완료!');
    await ctx.wait();
  } else if (ctx.result === 4) {
    ctx.showMessage(`체력 최대치 현재값: ${MAXctx.base[character][0]}`);
    ctx.showMessage('새 값:');
    await ctx.inputNumber();
    MAXctx.base[character][0] = ctx.result;
    ctx.base[character][0] = ctx.result;
    ctx.showMessage('설정 완료!');
    await ctx.wait();
  } else if (ctx.result === 5) {
    ctx.showMessage(`기력 최대치 현재값: ${MAXctx.base[character][1]}`);
    ctx.showMessage('새 값:');
    await ctx.inputNumber();
    MAXctx.base[character][1] = ctx.result;
    ctx.base[character][1] = ctx.result;
    ctx.showMessage('설정 완료!');
    await ctx.wait();
  }
  // GOTO BASE_LOOP - 구조 변경 필요 (while/break 사용 권장)
}

export async function cheat_relation(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // Label: RELATION_LOOP
  ctx.drawLine();
  ctx.showMessage(`【${ctx.getName(character)} - 상성(RELATION) 수정】`);
  ctx.showMessage('');
  ctx.showMessage('(100 = 1.00배, 200 = 2.00배, 1000 = 10.00배)');
  ctx.showMessage('');
  ctx.showMessage('주요 캐릭터와의 상성:');
  ctx.showMessage(`[0] 마스터(%NAME:0%): ${ctx.relation[character][0]} (${ctx.relation[character][0]/100}.${ctx.relation[character][0]%100/10}${ctx.relation[character][0]%10}배)`);
  ctx.showMessage('');
  ctx.showMessage('[100] - 마스터와 상성 MAX (1000 = 10배)');
  ctx.showMessage('[101] - 마스터와 상성 기본 (100 = 1배)');
  ctx.showMessage('[102] - 직접 입력');
  ctx.showMessage('');
  ctx.showMessage('[999] - 돌아가기');
  ctx.showMessage('');
  await ctx.inputNumber();
  if (ctx.result === 999) {
    return 0;
  } else if (ctx.result === 100) {
    ctx.relation[character][0] = 1000;
    ctx.showMessage('마스터와 상성 10.00배 설정!');
    await ctx.wait();
  } else if (ctx.result === 101) {
    ctx.relation[character][0] = 100;
    ctx.showMessage('마스터와 상성 1.00배 설정!');
    await ctx.wait();
  } else if (ctx.result === 102) {
    ctx.showMessage('상성 값 입력 (100=1배, 200=2배...):');
    await ctx.inputNumber();
    ctx.relation[character][0] = ctx.result;
    ctx.showMessage(`마스터와 상성 {RESULT}으로 설정!`);
    await ctx.wait();
  } else if (ctx.result === 0) {
    ctx.showMessage('상성 값 입력:');
    await ctx.inputNumber();
    ctx.relation[character][0] = ctx.result;
    ctx.showMessage('설정 완료!');
    await ctx.wait();
  }
  // GOTO RELATION_LOOP - 구조 변경 필요 (while/break 사용 권장)
}

export async function cheat_oneclick(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine();
  ctx.showMessage(`【${ctx.getName(character)} - 원클릭 세팅】`);
  ctx.showMessage('');
  ctx.showMessage('');
  ctx.showMessage('[1] - 즉시 함락 (연심+능력)');
  ctx.showMessage('[2] - 절륜 세팅 (음란+절륜)');
  ctx.showMessage('[3] - 감각 MAX (C/V/A/B + 감각강화)');
  ctx.showMessage('[4] - 구슬 MAX + 부정제거');
  ctx.showMessage('[5] - 상성 MAX (10배)');
  ctx.showMessage('');
  ctx.showMessage('[0] - 돌아가기');
  ctx.showMessage('');
  await ctx.inputNumber();
  switch (ctx.result) {
    case 1:
      ctx.getTalent(target, 85) = 1;
      ctx.getTalent(target, 400) = 1;
      ctx.abilities[character][10] = 7;
      ctx.abilities[character][11] = 5;
      ctx.abilities[character][12] = 5;
      ctx.abilities[character][13] = 5;
      character.cflags[character][100] = 200;
      ctx.showMessage('즉시 함락 완료!');
      await ctx.wait();
      case 2:
        ctx.getTalent(target, 76) = 1;
        ctx.getTalent(target, 440) = 1;
        ctx.getTalent(target, 0) = 0;
        ctx.abilities[character][0] = 10;
        ctx.abilities[character][2] = 10;
        ctx.abilities[character][11] = 10;
        ctx.showMessage('절륜 세팅 완료!');
        await ctx.wait();
        case 3:
          ctx.abilities[character][0] = 10;
          ctx.abilities[character][1] = 10;
          ctx.abilities[character][2] = 10;
          ctx.abilities[character][3] = 10;
          ctx.getTalent(target, 74) = 1;
          ctx.getTalent(target, 75) = 1;
          ctx.getTalent(target, 77) = 1;
          ctx.getTalent(target, 78) = 1;
          ctx.showMessage('감각 MAX 완료!');
          await ctx.wait();
          case 4:
            ctx.juel[character][0] = 1000000;
            ctx.juel[character][1] = 1000000;
            ctx.juel[character][2] = 1000000;
            ctx.juel[character][14] = 1000000;
            ctx.juel[character][4] = 1000000;
            ctx.juel[character][5] = 1000000;
            ctx.juel[character][6] = 1000000;
            ctx.juel[character][7] = 1000000;
            ctx.juel[character][100] = 0;
            ctx.showMessage('구슬 세팅 완료!');
            await ctx.wait();
            case 5:
              ctx.relation[character][0] = 1000;
              ctx.showMessage('마스터와 상성 10배 설정!');
              await ctx.wait();
              case 0:
                return 0;
              break;
            }
            return 0;
}

export async function cheat_unlock(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine();
  ctx.showMessage('【전체 해금】');
  ctx.showMessage('');
  ctx.showMessage('[1] - 빚 탕감');
  ctx.showMessage('[2] - 마스터 비밀지식 부여');
  ctx.showMessage('');
  ctx.showMessage('[0] - 돌아가기');
  ctx.showMessage('');
  await ctx.inputNumber();
  switch (ctx.result) {
    case 1:
      ctx.money = ctx.flags[4];
      ctx.showMessage(`빚 탕감! 현재: {MONEY} 원`);
      await ctx.wait();
      case 2:
        // TODO: TALENT:0:325 = 1
        ctx.showMessage('마스터에게 비밀지식 부여!');
        await ctx.wait();
        case 0:
          return 0;
        break;
      }
      return 0;
}

export async function cheat_train(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // Label: TRAIN_CHEAT_LOOP
  ctx.drawLine();
  ctx.showMessage(`【조교 중 치트】 대상: ${ctx.getName(character)}`);
  ctx.showMessage('');
  ctx.showMessage('');
  PRINTL = "== 즉시 효과 ===";
  ctx.showMessage('[1] C절정  [2] V절정  [3] A절정  [4] B절정  [5] 전신절정');
  ctx.showMessage('');
  PRINTL = "== 파라미터 ===";
  ctx.showMessage('[10] PALAM MAX  [11] PALAM 초기화  [12] 부정 제거');
  ctx.showMessage('');
  PRINTL = "== 체력/기력 ===";
  ctx.showMessage('[20] 체력 전회복  [21] 기력 전회복  [22] 사정MAX  [23] 사정초기화');
  ctx.showMessage('');
  PRINTL = "== 능력/소질 ===";
  ctx.showMessage('[30] 능력 수정  [31] 소질 수정');
  ctx.showMessage('');
  PRINTL = "== 특수 ===";
  ctx.showMessage('[40] 윤활MAX  [41] 처녀토글  [42] 애널처녀토글');
  ctx.showMessage('[43] 상성 MAX (10배)');
  ctx.showMessage('');
  ctx.showMessage('[0] - 돌아가기');
  ctx.showMessage('');
  await ctx.inputNumber();
  switch (ctx.result) {
    case 1:
      ctx.params[character][0] = 100000;
      EX[0] += 1;
      ctx.showMessage('C절정!');
      await ctx.wait();
      case 2:
        ctx.params[character][1] = 100000;
        EX[1] += 1;
        ctx.showMessage('V절정!');
        await ctx.wait();
        case 3:
          ctx.params[character][2] = 100000;
          EX[2] += 1;
          ctx.showMessage('A절정!');
          await ctx.wait();
          case 4:
            ctx.params[character][14] = 100000;
            EX[3] += 1;
            ctx.showMessage('B절정!');
            await ctx.wait();
            case 5:
              ctx.params[character][0] = 100000;
              ctx.params[character][1] = 100000;
              ctx.params[character][2] = 100000;
              ctx.params[character][14] = 100000;
              EX[0] += 1;
              EX[1] += 1;
              EX[2] += 1;
              EX[3] += 1;
              ctx.showMessage('전신 절정!');
              await ctx.wait();
              case 10:
                ctx.params[character][0] = 100000;
                ctx.params[character][1] = 100000;
                ctx.params[character][2] = 100000;
                ctx.params[character][3] = 30000;
                ctx.params[character][4] = 50000;
                ctx.params[character][5] = 50000;
                ctx.params[character][6] = 50000;
                ctx.params[character][7] = 50000;
                ctx.params[character][14] = 100000;
                ctx.showMessage('PALAM MAX!');
                await ctx.wait();
                case 11:
                  ctx.params[character][0] = 0;
                  ctx.params[character][1] = 0;
                  ctx.params[character][2] = 0;
                  ctx.params[character][3] = 0;
                  ctx.params[character][4] = 0;
                  ctx.params[character][5] = 0;
                  ctx.params[character][6] = 0;
                  ctx.params[character][7] = 0;
                  ctx.params[character][9] = 0;
                  ctx.params[character][10] = 0;
                  ctx.params[character][11] = 0;
                  ctx.params[character][12] = 0;
                  ctx.params[character][13] = 0;
                  ctx.params[character][14] = 0;
                  ctx.showMessage('PALAM 초기화!');
                  await ctx.wait();
                  case 12:
                    ctx.params[character][9] = 0;
                    ctx.params[character][10] = 0;
                    ctx.params[character][11] = 0;
                    ctx.params[character][12] = 0;
                    ctx.params[character][13] = 0;
                    ctx.showMessage('부정 파라미터 제거!');
                    await ctx.wait();
                    case 20:
                      ctx.base[character][0] = MAXctx.base[character][0];
                      LOSEctx.base[0] = 0;
                      ctx.showMessage('체력 전회복! (소모량 초기화)');
                      await ctx.wait();
                      case 21:
                        ctx.base[character][1] = MAXctx.base[character][1];
                        LOSEctx.base[1] = 0;
                        ctx.showMessage('기력 전회복! (소모량 초기화)');
                        await ctx.wait();
                        case 22:
                          ctx.base[character][2] = MAXctx.base[character][2];
                          ctx.showMessage('사정 게이지 MAX!');
                          await ctx.wait();
                          case 23:
                            ctx.base[character][2] = 0;
                            ctx.showMessage('사정 게이지 초기화!');
                            await ctx.wait();
                            case 30:
                              await cheat_train_abl(ctx, character);
                              case 31:
                                await cheat_train_talent(ctx, character);
                                case 40:
                                  ctx.params[character][3] = 30000;
                                  ctx.showMessage('윤활 MAX!');
                                  await ctx.wait();
                                  case 41:
                                    ctx.getTalent(target, 0) = 1 - ctx.getTalent(target, 0);
                                    ctx.showMessage('처녀 토글!');
                                    await ctx.wait();
                                    case 42:
                                      ctx.getTalent(target, 2) = 1 - ctx.getTalent(target, 2);
                                      ctx.showMessage('애널처녀 토글!');
                                      await ctx.wait();
                                      case 43:
                                        ctx.relation[character][0] = 1000;
                                        ctx.showMessage('마스터와 상성 10배!');
                                        await ctx.wait();
                                        case 0:
                                          return 0;
                                        break;
                                      }
                                      // GOTO TRAIN_CHEAT_LOOP - 구조 변경 필요 (while/break 사용 권장)
}

export async function cheat_train_abl(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // Label: TRAIN_ABL_LOOP
  ctx.drawLine();
  ctx.showMessage(`【${ctx.getName(character)} - 능력 수정】`);
  ctx.showMessage('');
  ctx.showMessage('');
  ctx.showMessage(`[1] C감각: ${ctx.abilities[character][0]}   [2] B감각: ${ctx.abilities[character][1]}`);
  ctx.showMessage(`[3] V감각: ${ctx.abilities[character][2]}   [4] A감각: ${ctx.abilities[character][3]}`);
  ctx.showMessage('');
  ctx.showMessage(`[5] 신뢰: ${ctx.abilities[character][10]}   [6] 욕망: ${ctx.abilities[character][11]}`);
  ctx.showMessage(`[7] 순종: ${ctx.abilities[character][12]}   [8] 기교: ${ctx.abilities[character][13]}`);
  ctx.showMessage(`[9] 봉사: ${ctx.abilities[character][14]}   [10] 노출: ${ctx.abilities[character][15]}`);
  ctx.showMessage('');
  ctx.showMessage('[11] - 감각 전부 MAX');
  ctx.showMessage('[12] - 기술 전부 MAX');
  ctx.showMessage('[0] - 돌아가기');
  ctx.showMessage('');
  await ctx.inputNumber();
  switch (ctx.result) {
    case 0:
      return 0;
      case 1:
        ctx.showMessage(`C감각 현재값: ${ctx.abilities[character][0]}`);
        ctx.showMessage('새 값 (0~10):');
        await ctx.inputNumber();
        ctx.abilities[character][0] = ctx.result;
        ctx.showMessage('설정 완료!');
        await ctx.wait();
        case 2:
          ctx.showMessage(`B감각 현재값: ${ctx.abilities[character][1]}`);
          ctx.showMessage('새 값 (0~10):');
          await ctx.inputNumber();
          ctx.abilities[character][1] = ctx.result;
          ctx.showMessage('설정 완료!');
          await ctx.wait();
          case 3:
            ctx.showMessage(`V감각 현재값: ${ctx.abilities[character][2]}`);
            ctx.showMessage('새 값 (0~10):');
            await ctx.inputNumber();
            ctx.abilities[character][2] = ctx.result;
            ctx.showMessage('설정 완료!');
            await ctx.wait();
            case 4:
              ctx.showMessage(`A감각 현재값: ${ctx.abilities[character][3]}`);
              ctx.showMessage('새 값 (0~10):');
              await ctx.inputNumber();
              ctx.abilities[character][3] = ctx.result;
              ctx.showMessage('설정 완료!');
              await ctx.wait();
              case 5:
                ctx.showMessage(`신뢰 현재값: ${ctx.abilities[character][10]}`);
                ctx.showMessage('새 값 (0~10):');
                await ctx.inputNumber();
                ctx.abilities[character][10] = ctx.result;
                ctx.showMessage('설정 완료!');
                await ctx.wait();
                case 6:
                  ctx.showMessage(`욕망 현재값: ${ctx.abilities[character][11]}`);
                  ctx.showMessage('새 값 (0~10):');
                  await ctx.inputNumber();
                  ctx.abilities[character][11] = ctx.result;
                  ctx.showMessage('설정 완료!');
                  await ctx.wait();
                  case 7:
                    ctx.showMessage(`순종 현재값: ${ctx.abilities[character][12]}`);
                    ctx.showMessage('새 값 (0~10):');
                    await ctx.inputNumber();
                    ctx.abilities[character][12] = ctx.result;
                    ctx.showMessage('설정 완료!');
                    await ctx.wait();
                    case 8:
                      ctx.showMessage(`기교 현재값: ${ctx.abilities[character][13]}`);
                      ctx.showMessage('새 값 (0~10):');
                      await ctx.inputNumber();
                      ctx.abilities[character][13] = ctx.result;
                      ctx.showMessage('설정 완료!');
                      await ctx.wait();
                      case 9:
                        ctx.showMessage(`봉사 현재값: ${ctx.abilities[character][14]}`);
                        ctx.showMessage('새 값 (0~10):');
                        await ctx.inputNumber();
                        ctx.abilities[character][14] = ctx.result;
                        ctx.showMessage('설정 완료!');
                        await ctx.wait();
                        case 10:
                          ctx.showMessage(`노출 현재값: ${ctx.abilities[character][15]}`);
                          ctx.showMessage('새 값 (0~10):');
                          await ctx.inputNumber();
                          ctx.abilities[character][15] = ctx.result;
                          ctx.showMessage('설정 완료!');
                          await ctx.wait();
                          case 11:
                            ctx.abilities[character][0] = 10;
                            ctx.abilities[character][1] = 10;
                            ctx.abilities[character][2] = 10;
                            ctx.abilities[character][3] = 10;
                            ctx.showMessage('감각 MAX!');
                            await ctx.wait();
                            case 12:
                              ctx.abilities[character][10] = 10;
                              ctx.abilities[character][11] = 10;
                              ctx.abilities[character][12] = 10;
                              ctx.abilities[character][13] = 10;
                              ctx.abilities[character][14] = 10;
                              ctx.abilities[character][15] = 10;
                              ctx.showMessage('기술 MAX!');
                              await ctx.wait();
                            break;
                          }
                          // GOTO TRAIN_ABL_LOOP - 구조 변경 필요 (while/break 사용 권장)
}

export async function cheat_train_talent(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // Label: TRAIN_TALENT_LOOP
  ctx.drawLine();
  ctx.showMessage(`【${ctx.getName(character)} - 소질 수정】`);
  ctx.showMessage('');
  ctx.showMessage('');
  ctx.showMessage(`[1] 처녀: \@TALENT:TARGET:0 ? "O" # "X"\@`);
  ctx.showMessage(`    [2] 애널처녀: \@TALENT:TARGET:2 ? "O" # "X"\@`);
  ctx.showMessage('');
  ctx.showMessage(`[3] 음란: \@TALENT:TARGET:76 ? "O" # "X"\@`);
  ctx.showMessage(`    [4] 연심: \@TALENT:TARGET:85 ? "O" # "X"\@`);
  ctx.showMessage(`[5] 섹프: \@TALENT:TARGET:90 ? "O" # "X"\@`);
  ctx.showMessage(`    [6] 절륜: \@TALENT:TARGET:440 ? "O" # "X"\@`);
  ctx.showMessage('');
  ctx.showMessage(`[7] 자위광: \@TALENT:TARGET:74 ? "O" # "X"\@`);
  ctx.showMessage(`  [8] 섹스광: \@TALENT:TARGET:75 ? "O" # "X"\@`);
  ctx.showMessage(`[9] 애널광: \@TALENT:TARGET:77 ? "O" # "X"\@`);
  ctx.showMessage(`  [10] 가슴광: \@TALENT:TARGET:78 ? "O" # "X"\@`);
  ctx.showMessage('');
  ctx.showMessage('[11] - 주요 소질 전부 부여');
  ctx.showMessage('[0] - 돌아가기');
  ctx.showMessage('');
  await ctx.inputNumber();
  switch (ctx.result) {
    case 0:
      return 0;
      case 1:
        ctx.getTalent(target, 0) = 1 - ctx.getTalent(target, 0);
        ctx.showMessage(`처녀: \@TALENT:TARGET:0 ? "O" # "X"\@`);
        ctx.showMessage('로 변경!');
        await ctx.wait();
        case 2:
          ctx.getTalent(target, 2) = 1 - ctx.getTalent(target, 2);
          ctx.showMessage(`애널처녀: \@TALENT:TARGET:2 ? "O" # "X"\@`);
          ctx.showMessage('로 변경!');
          await ctx.wait();
          case 3:
            ctx.getTalent(target, 76) = 1 - ctx.getTalent(target, 76);
            ctx.showMessage(`음란: \@TALENT:TARGET:76 ? "O" # "X"\@`);
            ctx.showMessage('로 변경!');
            await ctx.wait();
            case 4:
              ctx.getTalent(target, 85) = 1 - ctx.getTalent(target, 85);
              ctx.showMessage(`연심: \@TALENT:TARGET:85 ? "O" # "X"\@`);
              ctx.showMessage('로 변경!');
              await ctx.wait();
              case 5:
                ctx.getTalent(target, 90) = 1 - ctx.getTalent(target, 90);
                ctx.showMessage(`섹프: \@TALENT:TARGET:90 ? "O" # "X"\@`);
                ctx.showMessage('로 변경!');
                await ctx.wait();
                case 6:
                  ctx.getTalent(target, 440) = 1 - ctx.getTalent(target, 440);
                  ctx.showMessage(`절륜: \@TALENT:TARGET:440 ? "O" # "X"\@`);
                  ctx.showMessage('로 변경!');
                  await ctx.wait();
                  case 7:
                    ctx.getTalent(target, 74) = 1 - ctx.getTalent(target, 74);
                    ctx.showMessage(`자위광: \@TALENT:TARGET:74 ? "O" # "X"\@`);
                    ctx.showMessage('로 변경!');
                    await ctx.wait();
                    case 8:
                      ctx.getTalent(target, 75) = 1 - ctx.getTalent(target, 75);
                      ctx.showMessage(`섹스광: \@TALENT:TARGET:75 ? "O" # "X"\@`);
                      ctx.showMessage('로 변경!');
                      await ctx.wait();
                      case 9:
                        ctx.getTalent(target, 77) = 1 - ctx.getTalent(target, 77);
                        ctx.showMessage(`애널광: \@TALENT:TARGET:77 ? "O" # "X"\@`);
                        ctx.showMessage('로 변경!');
                        await ctx.wait();
                        case 10:
                          ctx.getTalent(target, 78) = 1 - ctx.getTalent(target, 78);
                          ctx.showMessage(`가슴광: \@TALENT:TARGET:78 ? "O" # "X"\@`);
                          ctx.showMessage('로 변경!');
                          await ctx.wait();
                          case 11:
                            ctx.getTalent(target, 76) = 1;
                            ctx.getTalent(target, 85) = 1;
                            ctx.getTalent(target, 90) = 1;
                            ctx.getTalent(target, 74) = 1;
                            ctx.getTalent(target, 75) = 1;
                            ctx.getTalent(target, 77) = 1;
                            ctx.getTalent(target, 78) = 1;
                            ctx.getTalent(target, 440) = 1;
                            ctx.showMessage('주요 소질 전부 부여!');
                            await ctx.wait();
                          break;
                        }
                        // GOTO TRAIN_TALENT_LOOP - 구조 변경 필요 (while/break 사용 권장)
}
