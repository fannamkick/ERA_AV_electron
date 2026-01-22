/**
 * GET_SPECIALTALENT.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function check_specialskil(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character < 0) {
    return 0;
  }
  if (ctx.talents[9]) {
    return 0;
  }
  if (character.mark[3] === 0) {
    if (character.cflags[2] >= 2000 && character.cflags[1] < 2 && (ctx.talents[76] || ctx.talents[85]) && ctx.talents[199] === 0) {
      ctx.showMessage(`W ${ctx.josaHelper("타겟이")} 이쪽을 바라보는 눈이 이상하다`);
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 몸도 마음도 ${ctx.getVarName("CALL", MASTER)}에게 의존해 버린 것 같다…`);
      if (ctx.abilities[10] < 5) {
        ctx.abilities[10] = 5;
        ctx.showMessage('순종이 LV5가 됐다');
      }
      if (character.cflags[1] < 1) {
        ctx.showMessage(`%타겟이(1)% 은퇴 가능하게 되었습니다`);
      }
      ctx.showMessage(`W %타겟이(1)% 조수 가능하게 되었습니다`);
      character.cflags[1] = 2;
    } else if (character.cflags[2] >= 1000) {
      if (ctx.talents[505] === 1 || ctx.talents[504] === 1 || ctx.talents[511] === 1) {
        if (ctx.abilities[10] >= 3 && ctx.exp[21] >= 200 && ctx.talents[85] === 0 && ctx.talents[184] === 0 && character.cflags[621] != 1) {
          ctx.showMessage(`W ${ctx.josaHelper("타겟이")} 이쪽을 바라보는 눈이 이상하다`);
          ctx.showMessage(`${ctx.josaHelper("타겟은")} ${ctx.josaHelper("플레이어와")}의 행위에 즐거움을 느끼고 있는 것 같다…`);
          ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 85)}】%조사만처리(TALENTNAME:85,"를")% 얻었다`);
          ctx.talents[85] = 1;
          character.cflags[619] = 0;
          character.cflags[620] *= 2;
          if (ctx.talents[76] == 0) {
            ctx.flags[30] += 1;
          }
          if (ctx.flags[39] === 0 && ctx.talents[76] === 0) {
            if (ctx.talents[222]) {
              ctx.flags[68] += 2;
            } else if (ctx.talents[221]) {
              ctx.flags[68] += 1;
            } else if (ctx.talents[220]) {
              ctx.flags[68] += 0;
            } else {
              ctx.flags[68] -= 1;
            }
            if (ctx.flags[68] > 5) {
              ctx.flags[68] = 5;
            }
            if (ctx.flags[68] < 0) {
              ctx.flags[68] = 0;
            }
          }
          if (ctx.talents[11] && ctx.talents[18]) {
            ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 11)}】%조사만처리(TALENTNAME:11,"를")% 잃고,【${ctx.getVarName("TALENT", 13)}】%조사만처리(TALENTNAME:13,"를")% 얻었다`);
            ctx.talents[11] = 0;
            ctx.talents[13] = 1;
          }
          if (ctx.talents[18] === 0 && ctx.talents[11]) {
            ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 11)}】%조사만처리(TALENTNAME:11,"를")% 잃었다`);
            ctx.talents[11] = 0;
          }
          if ((ctx.talents[20] || ctx.talents[21]) && ctx.talents[199] === 0) {
            ctx.showMessage(`%타겟은(1)%`);
            if (ctx.talents[20]) {
              ctx.showMessage(`【${ctx.getVarName("TALENT", 20)}】%조사만처리(TALENTNAME:20,"를")%`);
              ctx.talents[20] = 0;
            }
            if (ctx.talents[21]) {
              ctx.showMessage(`【${ctx.getVarName("TALENT", 21)}】%조사만처리(TALENTNAME:21,"를")%`);
              ctx.talents[21] = 0;
            }
            ctx.showMessage('잃었다');
            ctx.showMessage('부정의 구슬이 반이 됐다');
            ctx.juel[100] /= 2;
          }
          if (ctx.talents[27] === 1 && ctx.talents[199] === 0) {
            ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 27)}】%조사만처리(TALENTNAME:27,"를")% 잃었다`);
            ctx.talents[27] = 0;
          }
          if (ctx.talents[11] === 0 && ctx.talents[13] === 0 && ctx.talents[18] === 1) {
            ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 13)}】%조사만처리(TALENTNAME:13,"을")% 얻었다`);
            ctx.talents[13] = 1;
          }
          if (ctx.talents[151] === 1 && ctx.talents[199] === 0) {
            ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 151)}】%조사만처리(TALENTNAME:151,"가")% 아니게 됐다`);
            ctx.talents[151] = 0;
          }
          if (ctx.talents[84] === 1 && ctx.talents[199] === 0) {
            ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 84)}】%조사만처리(TALENTNAME:84,"가")% 사라졌다`);
            ctx.talents[84] = 0;
          }
          if (ctx.talents[198] === 1 && ctx.talents[199] === 0) {
            ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 198)}】%조사만처리(TALENTNAME:198,"가")% 완화됐다`);
            ctx.talents[198] = 0;
          }
          if (ctx.talents[82] === 1 && ctx.talents[81] === 0) {
            ctx.showMessage(`남자를 싫어하던 %타겟은(1)%【${ctx.getVarName("TALENT", 82)}】`);
            ctx.showMessage(`W 에서【${ctx.getVarName("TALENT", 81)}】%조사만처리(TALENTNAME:81,"가")% 됐다`);
            ctx.talents[82] = 0;
            ctx.talents[81] = 1;
          }
          if (ctx.talents[399] === 1 && ctx.getTalent(master, 399) === 0 && ctx.flags[5] != 9) {
            ctx.showMessage(`W ${ctx.getName(character)}에게서 ${ctx.josaHelper("플레이어는")}【${ctx.getVarName("TALENT", 399)}】%조사만처리(TALENTNAME:399,"을")% 배웠다`);
            ctx.getTalent(master, 399) = 1;
          }
          if (ctx.base[10] > 0) {
            D = ctx.base[10] / 2;
            ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)}에게 남겨진 생명은, 나머지 {D}주 입니다`);
          }
          if (ctx.getRelation(character, "ctx.master") <= 100) {
            ctx.getRelation(character, "ctx.master") = 100;
          }
        }
      } else {
        if (ctx.abilities[10] >= 3 && ctx.exp[21] >= EXPLV[5] && ctx.talents[76] === 0 && ctx.talents[85] === 0 && ctx.talents[184] === 0 && ctx.exp[40] <= 1200 && character.cflags[621] != 1 && ctx.flags[110] === 0) {
          ctx.showMessage(`W ${ctx.josaHelper("타겟이")} 이쪽을 바라보는 눈이 이상하다`);
          ctx.showMessage(`${ctx.josaHelper("타겟은")} ${ctx.josaHelper("플레이어와")}의 행위에 즐거움을 느끼고 있는 것 같다…`);
          ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 85)}】%조사만처리(TALENTNAME:85,"을")% 얻었다`);
          ctx.talents[85] = 1;
          character.cflags[619] = 0;
          character.cflags[620] *= 2;
          if (ctx.talents[76] == 0) {
            ctx.flags[30] += 1;
          }
          if (ctx.flags[39] === 0 && ctx.talents[76] === 0) {
            if (ctx.talents[222]) {
              ctx.flags[68] += 2;
            } else if (ctx.talents[221]) {
              ctx.flags[68] += 1;
            } else if (ctx.talents[220]) {
              ctx.flags[68] += 0;
            } else {
              ctx.flags[68] -= 1;
            }
            if (ctx.flags[68] > 5) {
              ctx.flags[68] = 5;
            }
            if (ctx.flags[68] < 0) {
              ctx.flags[68] = 0;
            }
          }
          if (ctx.talents[11] && ctx.talents[18]) {
            ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 11)}】%조사만처리(TALENTNAME:11,"을")% 잃고,【${ctx.getVarName("TALENT", 13)}】%조사만처리(TALENTNAME:13,"을")% 얻었다`);
            ctx.talents[11] = 0;
            ctx.talents[13] = 1;
          }
          if ((ctx.talents[20] || ctx.talents[21]) && ctx.talents[199] === 0) {
            ctx.showMessage(`%타겟은(1)%`);
            if (ctx.talents[20]) {
              ctx.showMessage(`【${ctx.getVarName("TALENT", 20)}】%조사만처리(TALENTNAME:20,"을")%`);
              ctx.talents[20] = 0;
            }
            if (ctx.talents[21]) {
              ctx.showMessage(`【${ctx.getVarName("TALENT", 21)}】%조사만처리(TALENTNAME:21,"을")%`);
              ctx.talents[21] = 0;
            }
            ctx.showMessage('잃었다');
            ctx.showMessage('부정의 구슬이 반이 됐다');
            ctx.juel[100] /= 2;
          }
          if (ctx.talents[27] === 1 && ctx.talents[199] === 0) {
            ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 27)}】%조사만처리(TALENTNAME:27,"을")% 잃었다`);
            ctx.talents[27] = 0;
          }
          if (ctx.talents[151] === 1 && ctx.talents[199] === 0) {
            ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 151)}】%조사만처리(TALENTNAME:151,"가")% 아니게 됐다`);
            ctx.talents[151] = 0;
          }
          if (ctx.talents[84] === 1 && ctx.talents[199] === 0) {
            ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 84)}】%조사만처리(TALENTNAME:84,"가")% 사라졌다`);
            ctx.talents[84] = 0;
          }
          if (ctx.talents[11] === 0 && ctx.talents[13] === 0 && ctx.talents[18] === 1) {
            ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 13)}】%조사만처리(TALENTNAME:13,"을")% 얻었다`);
            ctx.talents[13] = 1;
          }
          if (ctx.talents[82] === 1 && ctx.talents[81] === 0) {
            ctx.showMessage(`남자를 싫어하던 %타겟은(1)%【${ctx.getVarName("TALENT", 82)}】`);
            ctx.showMessage(`W 에서【${ctx.getVarName("TALENT", 81)}】%조사만처리(TALENTNAME:81,"가")% 됐다`);
            ctx.talents[82] = 0;
            ctx.talents[81] = 1;
          }
          if (ctx.talents[198] === 1 && ctx.talents[199] === 0) {
            ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 198)}】%조사만처리(TALENTNAME:198,"가")% 완화됐다`);
            ctx.talents[198] = 0;
          }
          if (ctx.talents[399] === 1 && ctx.getTalent(master, 399) === 0 && ctx.flags[5] != 9) {
            ctx.showMessage(`W ${ctx.getName(character)}에게서 ${ctx.josaHelper("플레이어는")}【${ctx.getVarName("TALENT", 399)}】%조사만처리(TALENTNAME:399,"을")% 배웠다`);
            ctx.getTalent(master, 399) = 1;
          }
          if (ctx.base[10] > 0) {
            D = ctx.base[10] / 2;
            ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)}에게 남겨진 생명은, 나머지 {D}주 입니다`);
          }
          if (ctx.getRelation(character, "ctx.master") <= 100) {
            ctx.getRelation(character, "ctx.master") = 100;
          }
        }
        if (ctx.abilities[10] >= 3 && ctx.exp[21] >= EXPLV[5] && ctx.talents[76] === 0 && ctx.talents[85] === 0 && ctx.talents[184] === 0 && character.cflags[621] != 1 && ctx.flags[110] === 1) {
          ctx.showMessage(`W ${ctx.josaHelper("타겟이")} 이쪽을 바라보는 눈이 이상하다`);
          ctx.showMessage(`${ctx.josaHelper("타겟은")} ${ctx.josaHelper("플레이어와")}의 행위에 즐거움을 느끼고 있는 것 같다…`);
          ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 85)}】%조사만처리(TALENTNAME:85,"을")% 얻었다`);
          ctx.talents[85] = 1;
          character.cflags[619] = 0;
          character.cflags[620] *= 2;
          if (ctx.talents[76] == 0) {
            ctx.flags[30] += 1;
          }
          if (ctx.flags[39] === 0 && ctx.talents[76] === 0) {
            if (ctx.talents[222]) {
              ctx.flags[68] += 2;
            } else if (ctx.talents[221]) {
              ctx.flags[68] += 1;
            } else if (ctx.talents[220]) {
              ctx.flags[68] += 0;
            } else {
              ctx.flags[68] -= 1;
            }
            if (ctx.flags[68] > 5) {
              ctx.flags[68] = 5;
            }
            if (ctx.flags[68] < 0) {
              ctx.flags[68] = 0;
            }
          }
          if (ctx.talents[11] && ctx.talents[18]) {
            ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 11)}】%조사만처리(TALENTNAME:11,"를")% 잃고,【${ctx.getVarName("TALENT", 13)}】%조사만처리(TALENTNAME:13,"를")% 얻었다`);
            ctx.talents[11] = 0;
            ctx.talents[13] = 1;
          }
          if ((ctx.talents[20] || ctx.talents[21]) && ctx.talents[199] === 0) {
            ctx.showMessage(`%타겟은(1)%`);
            if (ctx.talents[20]) {
              ctx.showMessage(`【${ctx.getVarName("TALENT", 20)}】%조사만처리(TALENTNAME:20,"를")%`);
              ctx.talents[20] = 0;
            }
            if (ctx.talents[21]) {
              ctx.showMessage(`【${ctx.getVarName("TALENT", 21)}】%조사만처리(TALENTNAME:21,"를")%`);
              ctx.talents[21] = 0;
            }
            ctx.showMessage('잃었다');
            ctx.showMessage('부정의 구슬이 반이 됐다');
            ctx.juel[100] /= 2;
          }
          if (ctx.talents[27] === 1 && ctx.talents[199] === 0) {
            ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 27)}】%조사만처리(TALENTNAME:27,"을")% 잃었다`);
            ctx.talents[27] = 0;
          }
          if (ctx.talents[151] === 1 && ctx.talents[199] === 0) {
            ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 151)}】%조사만처리(TALENTNAME:151,"가")% 아니게 됐다`);
            ctx.talents[151] = 0;
          }
          if (ctx.talents[84] === 1 && ctx.talents[199] === 0) {
            ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 84)}】%조사만처리(TALENTNAME:84,"가")% 사라졌다`);
            ctx.talents[84] = 0;
          }
          if (ctx.talents[11] === 0 && ctx.talents[13] === 0 && ctx.talents[18] === 1) {
            ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 13)}】%조사만처리(TALENTNAME:13,"을")% 얻었다`);
            ctx.talents[13] = 1;
          }
          if (ctx.talents[82] === 1 && ctx.talents[81] === 0) {
            ctx.showMessage(`남자를 싫어하던 %타겟은(1)%【${ctx.getVarName("TALENT", 82)}】`);
            ctx.showMessage(`W 에서【${ctx.getVarName("TALENT", 81)}】%조사만처리(TALENTNAME:81,"가")% 됐다`);
            ctx.talents[82] = 0;
            ctx.talents[81] = 1;
          }
          if (ctx.talents[198] === 1 && ctx.talents[199] === 0) {
            ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 198)}】%조사만처리(TALENTNAME:198,"가")% 완화됐다`);
            ctx.talents[198] = 0;
          }
          if (ctx.talents[399] === 1 && ctx.getTalent(master, 399) === 0 && ctx.flags[5] != 9) {
            ctx.showMessage(`W ${ctx.getName(character)}에게서 ${ctx.josaHelper("플레이어는")}【${ctx.getVarName("TALENT", 399)}】%조사만처리(TALENTNAME:399,"을")% 배웠다`);
            ctx.getTalent(master, 399) = 1;
          }
          if (ctx.base[10] > 0) {
            D = ctx.base[10] / 2;
            ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)}에게 남겨진 생명은, 나머지 {D}주 입니다`);
          }
          if (ctx.getRelation(character, "ctx.master") <= 100) {
            ctx.getRelation(character, "ctx.master") = 100;
          }
        }
      }
      if (ctx.talents[505] === 0 && ctx.talents[504] === 0 && ctx.talents[511] === 0 && ctx.talents[553] === 0) {
        if (ctx.abilities[11] >= 3 && ctx.abilities[0]+ctx.abilities[1]+ctx.abilities[2]+ctx.abilities[3] >= 10 && ctx.exp[50] >= 3 && ctx.talents[76] === 0 && ctx.talents[85] === 0 && (ctx.talents[0] === 0 || ctx.talents[2] === 0)) {
          ctx.showMessage(`W ${ctx.josaHelper("타겟이")} 이쪽을 바라보는 눈이 이상하다`);
          ctx.showMessage(`${ctx.josaHelper("타겟은")} ${ctx.getVarName("CALL", MASTER)}에게 받고 있는 쾌락에 빠져버린 것 같다…`);
          ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 76)}】%조사만처리(TALENTNAME:76,"을")% 얻었다`);
          ctx.talents[76] = 1;
          if (ctx.talents[85] == 0) {
            ctx.flags[30] += 1;
          }
          if (ctx.flags[39] === 0 && ctx.talents[85] === 0) {
            if (ctx.talents[222] && ctx.flags[68] < 4) {
              ctx.flags[68] += 2;
            }
            if (ctx.talents[222] && ctx.flags[68] == 4) {
              ctx.flags[68] = 5;
            }
            if (ctx.talents[221] && ctx.flags[68] < 5) {
              ctx.flags[68] += 1;
            }
            if (ctx.talents[221] == 0 && ctx.talents[220] == 0 && ctx.flags[68] > 0) {
              ctx.flags[68] -= 1;
            }
          }
          if ((ctx.talents[20] || ctx.talents[21]) && ctx.talents[199] === 0) {
            ctx.showMessage(`%타겟은(1)%`);
            if (ctx.talents[20]) {
              ctx.showMessage(`【${ctx.getVarName("TALENT", 20)}】%조사만처리(TALENTNAME:20,"을")%`);
              ctx.talents[20] = 0;
            }
            if (ctx.talents[21]) {
              ctx.showMessage(`【${ctx.getVarName("TALENT", 21)}】%조사만처리(TALENTNAME:21,"을")%`);
              ctx.talents[21] = 0;
            }
            ctx.showMessage('잃었다');
            ctx.showMessage('부정의 구슬이 반이 됐다');
            ctx.juel[100] /= 2;
          }
          if (ctx.talents[27] === 1 && ctx.talents[199] === 0) {
            ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 27)}】%조사만처리(TALENTNAME:27,"을")% 잃었다`);
            ctx.talents[27] = 0;
          }
          if ((ctx.talents[32] || ctx.talents[34] || ctx.talents[84]) && ctx.talents[199] === 0) {
            ctx.showMessage(`%타겟은(1)%`);
            if (ctx.talents[32]) {
              ctx.showMessage(`【${ctx.getVarName("TALENT", 32)}】%조사만처리(TALENTNAME:32,"을")%`);
              ctx.talents[32] = 0;
            }
            if (ctx.talents[34]) {
              ctx.showMessage(`【${ctx.getVarName("TALENT", 34)}】%조사만처리(TALENTNAME:34,"을")%`);
              ctx.talents[34] = 0;
            }
            if (ctx.talents[84]) {
              ctx.showMessage(`【${ctx.getVarName("TALENT", 84)}】%조사만처리(TALENTNAME:84,"을")%`);
              ctx.talents[84] = 0;
            }
            ctx.showMessage('잃었다');
            ctx.showMessage('부정의 구슬이 반이 됐다');
            ctx.juel[100] /= 2;
          }
          if (ctx.talents[71] === 1 && ctx.talents[199] === 0) {
            ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 71)}】%조사만처리(TALENTNAME:71,"을")% 잃었다`);
            ctx.talents[71] = 0;
          }
          if (ctx.talents[150] === 1 && ctx.talents[199] === 0) {
            ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 150)}】%조사만처리(TALENTNAME:150,"가")% 아니게 됐다`);
            ctx.talents[150] = 0;
          }
          if (ctx.talents[82] === 1 && ctx.talents[81] === 0) {
            ctx.showMessage(`남자를 싫어하던 %타겟은(1)%【${ctx.getVarName("TALENT", 82)}】`);
            ctx.showMessage(`W 에서【${ctx.getVarName("TALENT", 81)}】%조사만처리(TALENTNAME:81,"가")% 됐다`);
            ctx.talents[82] = 0;
            ctx.talents[81] = 1;
          }
          if (ctx.talents[198] === 1 && ctx.talents[199] === 0) {
            ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 198)}】%조사만처리(TALENTNAME:198,"가")% 완화됐다`);
            ctx.talents[198] = 0;
          }
          if (ctx.getRelation(character, "ctx.master") <= 100) {
            ctx.getRelation(character, "ctx.master") = 100;
          }
        }
      } else {
        if (ctx.abilities[11] >= 3 && ctx.abilities[0]+ctx.abilities[1]+ctx.abilities[2]+ctx.abilities[3] >= 10 && ctx.exp[50] >= 2 && ctx.talents[76] === 0) {
          ctx.showMessage(`W ${ctx.josaHelper("타겟이")} 이쪽을 바라보는 눈이 이상하다`);
          ctx.showMessage(`${ctx.josaHelper("타겟은")} ${ctx.getVarName("CALL", MASTER)}에게 받고 있는 쾌락에 빠져버린 것 같다…`);
          ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 76)}】%조사만처리(TALENTNAME:76,"을")% 얻었다`);
          ctx.talents[76] = 1;
          if (ctx.talents[85] == 0) {
            ctx.flags[30] += 1;
          }
          if (ctx.flags[39] === 0 && ctx.talents[85] === 0) {
            if (ctx.talents[222] && ctx.flags[68] < 4) {
              ctx.flags[68] += 2;
            }
            if (ctx.talents[222] && ctx.flags[68] == 4) {
              ctx.flags[68] = 5;
            }
            if (ctx.talents[221] && ctx.flags[68] < 5) {
              ctx.flags[68] += 1;
            }
            if (ctx.talents[221] == 0 && ctx.talents[220] == 0 && ctx.flags[68] > 0) {
              ctx.flags[68] -= 1;
            }
          }
          if ((ctx.talents[20] || ctx.talents[21]) && ctx.talents[199] === 0) {
            ctx.showMessage(`%타겟은(1)%`);
            if (ctx.talents[20]) {
              ctx.showMessage(`【${ctx.getVarName("TALENT", 20)}】%조사만처리(TALENTNAME:20,"을")%`);
              ctx.talents[20] = 0;
            }
            if (ctx.talents[21]) {
              ctx.showMessage(`【${ctx.getVarName("TALENT", 21)}】%조사만처리(TALENTNAME:21,"을")%`);
              ctx.talents[21] = 0;
            }
            ctx.showMessage('잃었다');
            ctx.showMessage('부정의 구슬이 반이 됐다');
            ctx.juel[100] /= 2;
          }
          if (ctx.talents[27] === 1 && ctx.talents[199] === 0) {
            ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 27)}】%조사만처리(TALENTNAME:27,"을")% 잃었다`);
            ctx.talents[27] = 0;
          }
          if ((ctx.talents[32] || ctx.talents[34] || ctx.talents[84]) && ctx.talents[199] === 0) {
            ctx.showMessage(`%타겟은(1)%`);
            if (ctx.talents[32]) {
              ctx.showMessage(`【${ctx.getVarName("TALENT", 32)}】%조사만처리(TALENTNAME:32,"을")%`);
              ctx.talents[32] = 0;
            }
            if (ctx.talents[34]) {
              ctx.showMessage(`【${ctx.getVarName("TALENT", 34)}】%조사만처리(TALENTNAME:34,"을")%`);
              ctx.talents[34] = 0;
            }
            if (ctx.talents[84]) {
              ctx.showMessage(`【${ctx.getVarName("TALENT", 84)}】%조사만처리(TALENTNAME:84,"을")%`);
              ctx.talents[84] = 0;
            }
            ctx.showMessage('잃었다');
            ctx.showMessage('부정의 구슬이 반이 됐다');
            ctx.juel[100] /= 2;
          }
          if (ctx.talents[71] === 1 && ctx.talents[199] === 0) {
            ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 71)}】%조사만처리(TALENTNAME:71,"을")% 잃었다`);
            ctx.talents[71] = 0;
          }
          if (ctx.talents[82] === 1 && ctx.talents[81] === 0) {
            ctx.showMessage(`남자를 싫어하던 %타겟은(1)%【${ctx.getVarName("TALENT", 82)}】`);
            ctx.showMessage(`W 에서【${ctx.getVarName("TALENT", 81)}】%조사만처리(TALENTNAME:81,"가")% 됐다`);
            ctx.talents[82] = 0;
            ctx.talents[81] = 1;
          }
          if (ctx.talents[150] === 1 && ctx.talents[199] === 0) {
            ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 150)}】%조사만처리(TALENTNAME:150,"가")% 아니게 됐다`);
            ctx.talents[150] = 0;
          }
          if (ctx.talents[198] === 1 && ctx.talents[199] === 0) {
            ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 198)}】%조사만처리(TALENTNAME:198,"가")% 완화됐다`);
            ctx.talents[198] = 0;
          }
          if (ctx.getRelation(character, "ctx.master") <= 100) {
            ctx.getRelation(character, "ctx.master") = 100;
          }
        }
      }
    }
    if (character.cflags[2] >= 5000 && ctx.abilities[10] >= 5 && character.mark[1] === 3 && character.mark[2] === 3) {
      if (ctx.talents[150]) {
        ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 150)}】%조사만처리(TALENTNAME:150,"을")% 잃었다`);
        ctx.talents[150] = 0;
      }
      if (ctx.talents[151]) {
        ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 151)}】%조사만처리(TALENTNAME:151,"을")% 잃었다`);
        ctx.talents[151] = 0;
      }
      if (ctx.talents[152]) {
        ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 152)}】%조사만처리(TALENTNAME:152,"을")% 잃었다`);
        ctx.talents[152] = 0;
      }
      if (ctx.talents[199]) {
        ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 199)}】%조사만처리(TALENTNAME:199,"을")% 잃었다`);
        ctx.talents[199] = 0;
      }
    }
  }
  if (ctx.talents[51]) {
    if (ctx.abilities[12] >= 7 && ctx.abilities[13] >= 7 && ctx.exp[22] >= 1500 && ctx.talents[52] === 0) {
      ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)}의 봉사도 굉장히 능숙해졌다……`);
      ctx.showMessage(`W ${ctx.josaHelper("타겟은")}【${ctx.getVarName("TALENT", 52)}】%조사만처리(TALENTNAME:52,"을")% 얻었다`);
      ctx.talents[52] = 1;
    }
  } else {
    if (ctx.abilities[12] >= 5 && ctx.abilities[13] >= 5 && ctx.exp[22] >= 1000 && ctx.talents[52] === 0) {
      ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)}의 봉사도 굉장히 능숙해졌다……`);
      ctx.showMessage(`W ${ctx.josaHelper("타겟은")}【${ctx.getVarName("TALENT", 52)}】%조사만처리(TALENTNAME:52,"을")% 얻었다`);
      ctx.talents[52] = 1;
    }
  }
  if (ctx.abilities[20] >= 4 && ctx.abilities[12] >= 4 && ctx.exp[33] >= 300 && ctx.talents[83] === 0 && ((ctx.talents[505] === 0 && ctx.talents[88] === 0) || ctx.talents[505] === 1)) {
    ctx.showMessage(`W ${ctx.josaHelper("타겟이")} 이쪽을 바라보는 눈이 이상하다`);
    ctx.showMessage(`${ctx.josaHelper("타겟은")} 사람을 고통스럽게 하는 기쁨에 눈뜬 것 같다`);
    ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 83)}】%조사만처리(TALENTNAME:83,"을")% 얻었다`);
    ctx.talents[83] = 1;
  }
  if (ctx.abilities[21] >= 4 && ctx.abilities[17] >= 2 && ctx.exp[30] >= 300 && ctx.talents[88] === 0 && ((ctx.talents[505] === 0 && ctx.talents[83] === 0) || ctx.talents[505] === 1)) {
    ctx.showMessage(`W ${ctx.josaHelper("타겟이")} 이쪽을 바라보는 눈이 이상하다`);
    ctx.showMessage(`${ctx.josaHelper("타겟은")} 몸을 학대받는 기쁨에 눈뜬 것 같다`);
    ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 88)}】%조사만처리(TALENTNAME:88,"을")% 얻었다`);
    ctx.talents[88] = 1;
  }
  if (ctx.abilities[17] >= 4 && ctx.exp[10] >= 200 && ctx.exp[2] >= 100 && ctx.talents[89] === 0 && ctx.exp[12] >= 100) {
    ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)}의 상태가 이상하다…`);
    ctx.showMessage(`자신의 부끄러운 모습을 타인에게 보여지는 것이 기뻐서 견딜 수 없는 것 같다`);
    ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 89)}】%조사만처리(TALENTNAME:89,"을")% 얻었다`);
    ctx.talents[89] = 1;
  } else if (ctx.abilities[17] >= 3 && ctx.exp[10] >= 100 && ctx.exp[2] >= 50 && ctx.talents[89] === 0 && ctx.exp[12] >= 50 && (ctx.talents[28] === 1 || ctx.talents[505] === 1 || ctx.talents[36] === 1)) {
    ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)}의 상태가 이상하다…`);
    ctx.showMessage(`자신의 부끄러운 모습을 타인에게 보여지는 것이 기뻐서 견딜 수 없는 것 같다`);
    ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 89)}】%조사만처리(TALENTNAME:89,"을")% 얻었다`);
    ctx.talents[89] = 1;
  }
  if (ctx.abilities[11] >= 5 && ctx.abilities[40] >= 3 && ctx.exp[56] >= 300 && ctx.talents[136] === 0) {
    ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)}의 상태가 이상하다…`);
    ctx.showMessage(`바닥에 네발로 엎드려 허리를 흔들면서 이쪽을 올려보는 눈은,`);
    ctx.showMessage(`마치 한창 발정하고 있는 암캐 그 자체다`);
    ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 136)}】%조사만처리(TALENTNAME:136,"가")% 됐다`);
    ctx.talents[136] = 1;
  }
  if (ctx.abilities[11] >= 5 && ctx.abilities[41] >= 3 && ctx.exp[55] >= 300 && ctx.talents[137] === 0) {
    ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)}의 상태가 이상하다…`);
    ctx.showMessage(`촉수에 완전히 몸을 맡기고 있는 모습은`);
    ctx.showMessage(`촉수의 묘판 그 자체였다`);
    ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 137)}】%조사만처리(TALENTNAME:137,"가")% 됐다`);
    ctx.talents[137] = 1;
  }
  if ((ctx.talents[76] === 0 && ctx.talents[505] === 0) && ctx.talents[74] === 0) {
    if (ctx.abilities[0] >= 4 && ctx.exp[2] >= 100 && ctx.talents[74] === 0 && ctx.exp[10] >= 100) {
      ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)}의 상태가 이상하다…`);
      ctx.showMessage(`지도가 끝났는데도 ${ctx.josaHelper("타겟은")} ${ctx.josaHelper("플레이어를")} 잊은듯이,`);
      if (ctx.talents[121] || ctx.talents[122]) {
        ctx.print('페니스');
      } else {
        ctx.print('클리토리스');
      }
      ctx.showMessage(`를 문지르고 있다`);
      ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 74)}】%조사만처리(TALENTNAME:74,"가")% 됐다`);
      ctx.talents[74] = 1;
      if (ctx.talents[71] === 1 && ctx.talents[199] === 0) {
        ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 71)}】%조사만처리(TALENTNAME:71,"을")% 잃었다`);
        ctx.talents[71] = 0;
      }
    }
  } else if ((ctx.talents[76] === 1 || ctx.talents[505] === 1) && ctx.talents[74] === 0) {
    if (ctx.abilities[0] >= 3 && ctx.exp[2] >= 50 && ctx.talents[74] === 0 && ctx.exp[10] >= 50) {
      ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)}의 상태가 이상하다…`);
      ctx.showMessage(`지도가 끝났는데도 ${ctx.josaHelper("타겟은")} ${ctx.josaHelper("플레이어를")} 잊은듯이,`);
      if (ctx.talents[121] || ctx.talents[122]) {
        ctx.print('페니스');
      } else {
        ctx.print('클리토리스');
      }
      ctx.showMessage(`를 문지르고 있다`);
      ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 74)}】%조사만처리(TALENTNAME:74,"가")% 됐다`);
      ctx.talents[74] = 1;
      if (ctx.talents[71] === 1 && ctx.talents[199] === 0) {
        ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 71)}】%조사만처리(TALENTNAME:71,"을")% 잃었다`);
        ctx.talents[71] = 0;
      }
    }
  }
  if ((ctx.talents[76] === 0 && ctx.talents[505] === 0) && ctx.talents[75] === 0) {
    if (ctx.abilities[2] >= 4 && ctx.exp[0] >= 150 && ctx.exp[2] >= 100 && ctx.talents[75] === 0) {
      ctx.showMessage(`W ${ctx.josaHelper("타겟이")} 이쪽을 바라보는 눈이 이상하다`);
      ctx.showMessage(`지도가 끝났는데도 ${ctx.josaHelper("타겟은")} ${ctx.getVarName("CALL", MASTER)}에게 매달려 더 범해달라고 원해왔다`);
      ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 75)}】%조사만처리(TALENTNAME:75,"가")% 됐다`);
      ctx.talents[75] = 1;
      if (ctx.talents[71] === 1 && ctx.talents[199] === 0) {
        ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 71)}】%조사만처리(TALENTNAME:71,"을")% 잃었다`);
        ctx.talents[71] = 0;
      }
    }
  } else if ((ctx.talents[76] === 1 || ctx.talents[505] === 1) && ctx.talents[75] === 0) {
    if (ctx.abilities[2] >= 3 && ctx.exp[0] >= 80 && ctx.exp[2] >= 50 && ctx.talents[75] === 0) {
      ctx.showMessage(`W ${ctx.josaHelper("타겟이")} 이쪽을 바라보는 눈이 이상하다`);
      ctx.showMessage(`지도가 끝났는데도 ${ctx.josaHelper("타겟은")} ${ctx.getVarName("CALL", MASTER)}에게 매달려 더 범해달라고 원해왔다`);
      ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 75)}】%조사만처리(TALENTNAME:75,"가")% 됐다`);
      ctx.talents[75] = 1;
      if (ctx.talents[71] === 1 && ctx.talents[199] === 0) {
        ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 71)}】%조사만처리(TALENTNAME:71,"을")% 잃었다`);
        ctx.talents[71] = 0;
      }
    }
  }
  if ((ctx.talents[76] === 0 && ctx.talents[505] === 0) && ctx.talents[77] === 0) {
    if (ctx.abilities[3] >= 4 && ctx.exp[32] >= 300 && ctx.exp[2] >= 100 && ctx.talents[77] === 0) {
      ctx.showMessage(`W ${ctx.josaHelper("타겟이")} 이쪽을 바라보는 눈이 이상하다`);
      ctx.showMessage(`지도가 끝났는데도 ${ctx.josaHelper("타겟은")} 애널을 휘저으며 ${ctx.getVarName("CALL", MASTER)}에게 더 해달라고 시선을 보내고 있다`);
      ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 77)}】%조사만처리(TALENTNAME:77,"가")% 됐다`);
      ctx.talents[77] = 1;
      if (ctx.talents[71] === 1 && ctx.talents[199] === 0) {
        ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 71)}】%조사만처리(TALENTNAME:71,"을")% 잃었다`);
        ctx.talents[71] = 0;
      }
    }
  } else if ((ctx.talents[76] === 1 || ctx.talents[505] === 1) && ctx.talents[77] === 0) {
    if (ctx.abilities[3] >= 3 && ctx.exp[32] >= 150 && ctx.exp[2] >= 50 && ctx.talents[77] === 0) {
      ctx.showMessage(`W ${ctx.josaHelper("타겟이")} 이쪽을 바라보는 눈이 이상하다`);
      ctx.showMessage(`지도가 끝났는데도 ${ctx.josaHelper("타겟은")} 애널을 휘저으며 ${ctx.getVarName("CALL", MASTER)}에게 더 해달라고 시선을 보내고 있다`);
      ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 77)}】%조사만처리(TALENTNAME:77,"가")% 됐다`);
      ctx.talents[77] = 1;
      if (ctx.talents[71] === 1 && ctx.talents[199] === 0) {
        ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 71)}】%조사만처리(TALENTNAME:71,"을")% 잃었다`);
        ctx.talents[71] = 0;
      }
    }
  }
  if ((ctx.talents[76] === 0 && ctx.talents[505] === 0) && ctx.talents[78] === 0) {
    if (ctx.abilities[1] >= 4 && ctx.exp[14] >= 150 && ctx.exp[2] >= 100 && ctx.talents[78] === 0) {
      ctx.showMessage(`W ${ctx.josaHelper("타겟이")} 이쪽을 바라보는 눈이 이상하다`);
      ctx.showMessage(`지도가 끝났는데도 ${ctx.josaHelper("타겟은")} 유두를 문지르며 ${ctx.getVarName("CALL", MASTER)}에게 더 해달라고 시선을 보내고 있다`);
      ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 78)}】%조사만처리(TALENTNAME:78,"가")% 됐다`);
      ctx.talents[78] = 1;
      if (ctx.talents[71] === 1 && ctx.talents[199] === 0) {
        ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 71)}】%조사만처리(TALENTNAME:71,"을")% 잃었다`);
        ctx.talents[71] = 0;
      }
    }
  } else if ((ctx.talents[76] === 1 || ctx.talents[505] === 1) && ctx.talents[78] === 0) {
    if (ctx.abilities[1] >= 3 && ctx.exp[14] >= 80 && ctx.exp[2] >= 50 && ctx.talents[78] === 0) {
      ctx.showMessage(`W ${ctx.josaHelper("타겟이")} 이쪽을 바라보는 눈이 이상하다`);
      ctx.showMessage(`지도가 끝났는데도 ${ctx.josaHelper("타겟은")} 유두를 문지르며 ${ctx.getVarName("CALL", MASTER)}에게 더 해달라고 시선을 보내고 있다`);
      ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 78)}】%조사만처리(TALENTNAME:78,"가")% 됐다`);
      ctx.talents[78] = 1;
      if (ctx.talents[71] === 1 && ctx.talents[199] === 0) {
        ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 71)}】%조사만처리(TALENTNAME:71,"을")% 잃었다`);
        ctx.talents[71] = 0;
      }
    }
  }
  if (ctx.flags[73] === 0) {
    if (ctx.abilities[0] >= 5 && ctx.talents[74] === 1 && ctx.talents[230] === 0 && (ctx.talents[505] === 1 || ctx.talents[440])) {
      ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)}의 상태가 이상하다…`);
      ctx.showMessage(`지도가 끝났는데도 ${ctx.josaHelper("타겟은")} ${ctx.getVarName("CALL", MASTER)}에게`);
      if (ctx.talents[121] || ctx.talents[122]) {
        ctx.print('페니스');
      } else {
        ctx.print('클리토리스');
      }
      ctx.showMessage('를 진정시켜달라고 애원했다…');
      ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 230)}】%조사만처리(TALENTNAME:230,"을")% 얻었다`);
      ctx.talents[230] = 1;
    }
    if (ctx.abilities[2] >= 5 && ctx.talents[75] === 1 && ctx.talents[232] === 0 && (ctx.talents[505] === 1 || ctx.talents[440] === 1)) {
      ctx.showMessage(`W ${ctx.josaHelper("타겟이")} 이쪽을 바라보는 눈이 이상하다`);
      ctx.showMessage(`지도가 끝났는데도 ${ctx.josaHelper("타겟은")} ${ctx.getVarName("CALL", MASTER)}에게 자궁의 갈증을 달래달라고 매달렸다…`);
      ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 232)}】%조사만처리(TALENTNAME:232,"을")% 얻었다`);
      ctx.talents[232] = 1;
    }
    if (ctx.abilities[3] >= 5 && ctx.talents[77] === 1 && ctx.talents[233] === 0 && (ctx.talents[505] === 1 || ctx.talents[440] === 1)) {
      ctx.showMessage(`W ${ctx.josaHelper("타겟이")} 이쪽을 바라보는 눈이 이상하다`);
      ctx.showMessage(`지도가 끝났는데도 ${ctx.josaHelper("타겟은")} ${ctx.getVarName("CALL", MASTER)}에게 엉덩이를 괴롭혀달라고 간절히 애원했다…`);
      ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 233)}】%조사만처리(TALENTNAME:233,"을")% 얻었다`);
      ctx.talents[233] = 1;
    }
    if (ctx.abilities[1] >= 5 && ctx.talents[78] === 1 && ctx.talents[231] === 0 && (ctx.talents[505] === 1 || ctx.talents[440] === 1)) {
      ctx.showMessage(`W ${ctx.josaHelper("타겟이")} 이쪽을 바라보는 눈이 이상하다`);
      ctx.showMessage(`지도가 끝났는데도 ${ctx.josaHelper("타겟은")} ${ctx.getVarName("CALL", MASTER)}에게 가슴을 주물러달라고 애원했다…`);
      ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 231)}】%조사만처리(TALENTNAME:231,"을")% 얻었다`);
      ctx.talents[231] = 1;
    }
    if (ctx.talents[230] && ctx.talents[231] && ctx.talents[232] && ctx.talents[233] && ctx.talents[272] === 0 && (ctx.talents[505] === 1 || ctx.talents[440] === 1)) {
      ctx.showMessage(`W ${ctx.josaHelper("타겟은")}【${ctx.getVarName("TALENT", 272)}】%조사만처리(TALENTNAME:272,"을")% 얻었다`);
      ctx.talents[272] = 1;
      if (ctx.talents[101]) {
        ctx.showMessage(`W ${ctx.josaHelper("타겟은")}【${ctx.getVarName("TALENT", 101)}】%조사만처리(TALENTNAME:101,"을")% 잃었다`);
        ctx.talents[101] = 0;
      }
      if (ctx.talents[103]) {
        ctx.showMessage(`W ${ctx.josaHelper("타겟은")}【${ctx.getVarName("TALENT", 103)}】%조사만처리(TALENTNAME:103,"을")% 잃었다`);
        ctx.talents[103] = 0;
      }
      if (ctx.talents[105]) {
        ctx.showMessage(`W ${ctx.josaHelper("타겟은")}【${ctx.getVarName("TALENT", 105)}】%조사만처리(TALENTNAME:105,"을")% 잃었다`);
        ctx.talents[105] = 0;
      }
      if (ctx.talents[107]) {
        ctx.showMessage(`W ${ctx.josaHelper("타겟은")}【${ctx.getVarName("TALENT", 107)}】%조사만처리(TALENTNAME:107,"을")% 잃었다`);
        ctx.talents[107] = 0;
      }
      ctx.showMessage(`W ${ctx.josaHelper("타겟은")}【${ctx.getVarName("TALENT", 102)}】%조사만처리(TALENTNAME:102,"이")% 됐다`);
      ctx.talents[102] = 1;
      ctx.showMessage(`W ${ctx.josaHelper("타겟은")}【${ctx.getVarName("TALENT", 104)}】%조사만처리(TALENTNAME:104,"이")% 됐다`);
      ctx.talents[104] = 1;
      ctx.showMessage(`W ${ctx.josaHelper("타겟은")}【${ctx.getVarName("TALENT", 106)}】%조사만처리(TALENTNAME:106,"이")% 됐다`);
      ctx.talents[106] = 1;
      ctx.showMessage(`W ${ctx.josaHelper("타겟은")}【${ctx.getVarName("TALENT", 108)}】%조사만처리(TALENTNAME:108,"이")% 됐다`);
      ctx.talents[108] = 1;
      ctx.showMessage(`L`);
    }
  }
  if (ctx.flags[75] === 0) {
    if (ctx.talents[271] === 0) {
      if (character.cflags[81] >= 700 && character.cflags[82] >= 2250) {
        ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)}의 상태가 이상하다…`);
        ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의`);
        if (ctx.getTalent(target, 122) || ctx.getTalent(target, 121)) {
          ctx.print('페니스');
        }
        if (ctx.getTalent(target, 121)) {
          ctx.print('와');
        }
        if (ctx.getTalent(target, 122) == 0) {
          ctx.print('보지');
        }
        ctx.showMessage(`에서 투명한 액체가 펑펑 솟아났다…`);
        ctx.showMessage(`W ${ctx.josaHelper("타겟은")}【${ctx.getVarName("TALENT", 271)}】%조사만처리(TALENTNAME:271,"을")% 얻었다`);
        ctx.talents[271] = 1;
        if (ctx.talents[43] === 0 && ctx.talents[42] === 0) {
          ctx.showMessage(`W ${ctx.josaHelper("타겟은")}【${ctx.getVarName("TALENT", 42)}】%조사만처리(TALENTNAME:42,"을")% 얻었다`);
          ctx.talents[42] = 1;
        } else if (ctx.talents[43]) {
          ctx.showMessage(`W ${ctx.josaHelper("타겟은")}【${ctx.getVarName("TALENT", 43)}】%조사만처리(TALENTNAME:43,"을")% 잃었다`);
          ctx.talents[43] = 0;
        }
        if ((ctx.talents[32] || ctx.talents[34] || ctx.talents[84]) && ctx.talents[199] === 0) {
          ctx.showMessage(`%타겟은(1)%`);
          if (ctx.talents[32]) {
            ctx.showMessage(`【${ctx.getVarName("TALENT", 32)}】%조사만처리(TALENTNAME:32,"을")%`);
            ctx.talents[32] = 0;
          }
          if (ctx.talents[34]) {
            ctx.showMessage(`【${ctx.getVarName("TALENT", 34)}】%조사만처리(TALENTNAME:34,"을")%`);
            ctx.talents[34] = 0;
          }
          if (ctx.talents[84]) {
            ctx.showMessage(`【${ctx.getVarName("TALENT", 84)}】%조사만처리(TALENTNAME:84,"을")%`);
            ctx.talents[84] = 0;
          }
          ctx.showMessage('잃었다');
          ctx.showMessage('부정의 구슬이 반이 됐다');
          ctx.juel[100] /= 2;
        }
        if (ctx.talents[71] === 1 && ctx.talents[199] === 0) {
          ctx.showMessage(`W ${ctx.josaHelper("타겟은")}【${ctx.getVarName("TALENT", 71)}】%조사만처리(TALENTNAME:71,"을")% 잃었다`);
          ctx.talents[71] = 0;
        }
        if (ctx.talents[30] === 1 && ctx.talents[199] === 0) {
          ctx.showMessage(`W ${ctx.josaHelper("타겟은")}【${ctx.getVarName("TALENT", 30)}】%조사만처리(TALENTNAME:30,"을")% 잃었다`);
          ctx.talents[30] = 0;
        }
      }
    }
  }
  if (character.tflags[110] && ctx.talents[47] === 0) {
    ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)}의 상태가 이상하다…`);
    ctx.showMessage(`${ctx.josaHelper("타겟은")} 성적자극 없이 정액을 마신 것만으로 가버리게 됐다`);
    ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 47)}】%조사만처리(TALENTNAME:47,"을")% 얻었다`);
    ctx.talents[47] = 1;
    if (ctx.talents[62] === 1) {
      ctx.showMessage(`W ${ctx.josaHelper("타겟은")}【${ctx.getVarName("TALENT", 62)}】%조사만처리(TALENTNAME:62,"가")% 아니게 됐다`);
      ctx.talents[62] = 0;
    }
    if (ctx.abilities[32] < 5) {
      ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)}의 정액중독이 LV5가 됐다`);
      ctx.abilities[32] = 5;
    }
    character.tflags[110] = 0;
  }
  if (ctx.abilities[16] >= 5 && ctx.talents[151] && ctx.talents[199] === 0) {
    ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 151)}】%조사만처리(TALENTNAME:151,"을")% 잃었다`);
    ctx.talents[151] = 0;
  }
  if (ctx.abilities[31] >= 5 && ctx.talents[150] && ctx.talents[199] === 0) {
    ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 150)}】%조사만처리(TALENTNAME:150,"을")% 잃었다`);
    ctx.talents[150] = 0;
  }
  if (ctx.abilities[20] >= 4 && ctx.abilities[12] >= 4 && ctx.talents[87] === 0) {
    ctx.showMessage(`W ${ctx.getName(character)}의 상태가 이상하다……`);
    ctx.showMessage(`최근 ${ctx.josaHelper("타겟은")} 봉사할 때 일부러 대충하면서, 상대방의 반응을 보고 즐기는 듯 하다`);
    if (ctx.talents[13] === 1) {
      ctx.showMessage(`지금까지 말한대로 따라주던`);
    }
    ctx.showMessage(`${ctx.josaHelper("타겟이")} 남자를 가지고 노는【${ctx.getVarName("TALENT", 87)}】 같은 매력을 가지게 된 것을,`);
    ctx.showMessage(`W ${ctx.josaHelper("플레이어는")} 기뻐해야할지 말아야할지 생각이 복잡해졌다`);
    ctx.talents[87] = 1;
  }
  if (ctx.abilities[10] >= 7 && ctx.abilities[16] >= 7 && ctx.talents[85] === 1 && ctx.talents[430] === 0 && ctx.talents[532] === 0 && ctx.exp[23] > 499 && character.mark[2] === 3 && ctx.talents[184] === 0) {
    ctx.showMessage(`W %타겟은(1)% ${ctx.getVarName("CALL", MASTER)}에게 할말이 있다고 했다……`);
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}에게 무슨 일이냐고 재촉하자, ${ctx.josaHelper("타겟은")} 얼굴을 새빨갛게 물들이며`);
    ctx.showMessage(`${ctx.getVarName("CALL", MASTER)}에게 결혼해주지 않아도 좋으니, 곁에만 있게 해달라`);
    ctx.showMessage(`W …… 며, ${ctx.getVarName("CALL", MASTER)}에게【${ctx.getVarName("TALENT", 430)}】%조사만처리(TALENTNAME:430,"을")% 맹세했다`);
    ctx.talents[430] = 1;
    if (character.cflags[661] === 1) {
      character.cflags[661] = 0;
      character.cflags[621] = 0;
    }
    if (ctx.relation[target][ctx.master.no] <= 200) {
      ctx.relation[target][ctx.master.no] = 200;
    }
  } else if (ctx.abilities[10] >= 10 && ctx.abilities[16] >= 10 && ctx.talents[85] === 1 && ctx.talents[430] === 0 && ctx.exp[23] > 999 && character.mark[2] === 3 && ctx.talents[184] === 0) {
    ctx.showMessage(`W %타겟은(1)% ${ctx.getVarName("CALL", MASTER)}에게 할말이 있다고 했다……`);
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}에게 무슨 일이냐고 재촉하자, ${ctx.josaHelper("타겟은")} 얼굴을 새빨갛게 물들이며`);
    ctx.showMessage(`${ctx.getVarName("CALL", MASTER)}에게 결혼해주지 않아도 좋으니, 곁에만 있게 해달라`);
    ctx.showMessage(`W …… 며, ${ctx.getVarName("CALL", MASTER)}에게【${ctx.getVarName("TALENT", 430)}】%조사만처리(TALENTNAME:430,"을")% 맹세했다`);
    ctx.talents[430] = 1;
    if (character.cflags[661] === 1) {
      character.cflags[661] = 0;
      character.cflags[621] = 0;
    }
    if (ctx.relation[target][ctx.master.no] <= 200) {
      ctx.relation[target][ctx.master.no] = 200;
    }
  }
  if (ctx.abilities[11] >= 7 && ctx.talents[76] === 1 && ctx.talents[440] === 0 && (ctx.abilities[0] === 10 || ctx.abilities[1] === 10 || ctx.abilities[2] === 10 || ctx.abilities[3] === 10) && ((ctx.exp[50] >= 5 && ctx.talents[505] === 0 && ctx.talents[504] === 0 && ctx.talents[511] === 0 && (ctx.talents[0] === 0 || ctx.talents[2] === 0)) || (ctx.exp[50] >= 3 && (ctx.talents[505] === 1 || ctx.talents[504] === 1 || ctx.talents[511] === 1 || ctx.talents[553] === 1)))) {
    ctx.showMessage(`W ${ctx.getName(character)}의 상태가 이상하다……`);
    ctx.showMessage(`지도가 끝나도 몇번이고`);
    if (ctx.abilities[2] === 10) {
      ctx.showMessage(`${ctx.getVarName("CALL", MASTER)}의 허리를 발로 감싸고 몇번이나 자궁에 씨앗을 받으며`);
    } else if (ctx.abilities[3] === 10 && ctx.talents[2] === 0) {
      ctx.showMessage(`${ctx.getVarName("CALL", MASTER)}의 허리를 발로 감싸고 몇번이나 직장에 씨앗을 받으며`);
    } else if (ctx.abilities[0] === 10) {
      if (ctx.talents[121] === 0) {
        ctx.showMessage(`단단하게 선 클리토리스로`);
      } else {
        ctx.showMessage(`딱딱하게 발기한 후타나리 페니스로`);
      }
      ctx.showMessage(`자위하며`);
    } else if (ctx.abilities[1] === 10) {
      ctx.showMessage(`빨갛게 충혈된 유두를 문지르며`);
    }
    ctx.showMessage(`, 제대로 발음도 못하는 상태로 음어를 연호하면서 절정을 반복하고도, 더 강한 쾌락을 갈망했다`);
    ctx.showMessage(`W 음란을 넘어선 ${ctx.getVarName("CALL", TARGET)}의 끝없는 성욕은, 그야말로【${ctx.getVarName("TALENT", 440)}】%조사만처리(TALENTNAME:440,"라")%는 말이 어울렸다……`);
    ctx.talents[440] = 1;
  }
  if (ctx.talents[520] && (ctx.base[40] === 0 ||  ctx.base[31] <= 0)) {
    ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)}의 상태가 이상하다…`);
    ctx.showMessage(`W ${ctx.josaHelper("타겟은")} 성마술의 반동을 견디지 못하고 정신이【${ctx.getVarName("TALENT", 9)}】돼버렸다`);
    await add_catastroph(ctx, character);
  }
  if (ctx.talents[184] === 1 && ctx.talents[30] === 0 && ctx.talents[76] === 1 && ctx.talents[425] === 1 && ctx.talents[85] === 0 && ctx.abilities[10] >= 3 && ctx.abilities[11] >= 5 && ctx.abilities[30] >= 2 && (ctx.talents[0] === 0 || ctx.talents[2] === 0) && ctx.exp[21] >= 300 && ctx.talents[90] === 0) {
    ctx.showMessage(`방금 전까지 침대 위에서 ${ctx.getVarName("CALL", MASTER)}에게`);
    if (ctx.abilities[2] >= ctx.abilities[3]) {
      ctx.showMessage(`바기나를`);
    } else {
      ctx.showMessage(`애널을`);
    }
    ctx.showMessage(`후배위로 격하게 찔리며 교성을 내뱉던`);
    await print_clothtype(ctx, character);
    if (character.cflags[40] != 0) {
      ctx.showMessage(`차림`);
    }
    ctx.showMessage(`의 ${ctx.josaHelper("타겟은")}`);
    ctx.showMessage(`${ctx.getVarName("CALL", MASTER)}의 페니스가 열어놓은`);
    if (ctx.abilities[2] >= ctx.abilities[3]) {
      ctx.showMessage(`질구`);
    } else {
      ctx.showMessage(`애널`);
    }
    ctx.showMessage(`애서 ${ctx.getVarName("CALL", MASTER)}의 정액을 질질 흘리며,`);
    if (ctx.talents[400] == 1) {
      ctx.showMessage(`AV배우와 감독이라는 관계에 만족하지 말고,`);
    }
    ctx.showMessage(`W 서로의 성욕을 채워주는 관계가 되지 않겠냐고 유혹해왔다……`);
    if (character.cflags[15] == 8) {
      ctx.showMessage(`남친에게 처녀를 바친 뒤로, 수없이 몸을 꿰뚫려`);
    }
    ctx.showMessage(`섹스의 쾌락을 기억해버린 ${ctx.josaHelper("타겟은")}, 남친만으로는 만족하지 못하게 된 것 같다……`);
    ctx.showMessage(`사적으로도 ${ctx.getVarName("CALL", TARGET)}의 몸을 맛볼 수 있다는 매력적인 제안에, ${ctx.josaHelper("플레이어는")} 대답 대신`);
    if (ctx.abilities[2] >= ctx.abilities[3]) {
      ctx.showMessage(`바기나`);
    } else {
      ctx.showMessage(`애널`);
    }
    ctx.showMessage(`안쪽까지 페니스를 집어넣었다……`);
    ctx.showMessage('');
    ctx.showMessage(`W 《${ctx.josaHelper("플레이어는")} ${ctx.getName(character)}의【${ctx.getVarName("TALENT", 90)}】중 한 명이 됐다》`);
    ctx.talents[90] = 1;
  }
  if (ctx.talents[81] === 0 && character.cflags[2] >= 1500 && ctx.exp[40] >= 2000 && ctx.abilities[22] >= 4 && ctx.abilities[33] >= 3 && ctx.talents[82] === 0) {
    ctx.showMessage(`W ${ctx.getName(character)}의 상태가 이상하다……`);
    ctx.showMessage(`거듭되는 지도로 몇번이나 동성과 몸을 섞어온 ${ctx.josaHelper("타겟은")}`);
    ctx.showMessage(`이제 레즈플레이에도 저항감이 없어진 것 같다`);
    ctx.showMessage(`W 《%타겟은(1)%【${ctx.getVarName("TALENT", 81)}】%조사만처리(TALENTNAME:81,"가")% 됐다》`);
    ctx.talents[81] = 1;
  }
  if (ctx.exp[104] >= 20 && ctx.talents[30]) {
    ctx.showMessage(`W ${ctx.getName(character)}의 상태가 이상하다……`);
    ctx.showMessage(`얼마 전까지는 성적인 행위에 저항감이 있었지만, 섹프들과 몸을 섞는 사이에`);
    ctx.showMessage(`성행위에 저항감이 없어진 것 같다`);
    ctx.showMessage(`W 《%타겟은(1)%【${ctx.getVarName("TALENT", 30)}】%조사만처리(TALENTNAME:30,"를")% 잃었다》`);
    ctx.talents[30] = 0;
  }
  if (ctx.exp[104] >= 30 && ctx.talents[423] && ctx.talents[85] === 0 && ctx.talents[432] === 0) {
    ctx.showMessage(`W ${ctx.getName(character)}의 상태가 이상하다……`);
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의『최애』섹프인 %CSTR:47%에게 영향을 받은건지,`);
    ctx.showMessage(`취향이 점점【${ctx.getVarName("TALENT", 432)}】%조사만처리(TALENTNAME:432,"로")% 변하고 있다……`);
    ctx.showMessage(`W 《%타겟은(1)%【${ctx.getVarName("TALENT", 432)}】%조사만처리(TALENTNAME:432,"가")% 됐다》`);
    ctx.talents[432] = 1;
  }
  if (ctx.exp[104] >= 50 && ctx.talents[31] === 0 && ctx.talents[76] === 1) {
    if (character.no === 1 && ctx.master.no === 0 && ctx.talents[85] === 0) {
      // TODO: CHKFONT "あくびん"
      if (ctx.result) {
        // TODO: SETFONT "あくびん"
      }
      ctx.setColor(0xDDBBCC);
      ctx.showMessage(`「하앙, 흐응……츄르츕……!`);
      ctx.showMessage(`　아앗……하항……츄브……츕……응!`);
      ctx.showMessage(`　……츄, 츄…… 하아――앙!!`);
      ctx.showMessage(`　아하, 네 %CSTR:80%, 냄새나는 좆밥이 쌓여있네?`);
      ctx.showMessage(`　이정도로 %CSTR:9% 펠라치오로 좆밥 청소해주길 기다린거야?`);
      ctx.showMessage(`……그치만, 이 냄새를 맡고 있으면 %조사처리(CSTR:81,"가")% 큥큥 울려서`);
      ctx.showMessage(`박아버리고 싶어져%UNICODE(0x2665)%`);
      ctx.showMessage(`　그러니까 ……네 %CSTR:80%, 그냥 넣어버릴게?`);
      ctx.showMessage(`――아앙%UNICODE(0x2665)% 네 %CSTR:80%,`);
      ctx.showMessage(`단단하고 커서, %CSTR:81% 안쪽을 비비고 있어%UNICODE(0x2665)%`);
      ctx.showMessage(`　수업중에도 생SEX하고 싶어져서…… 앙, %조사처리(CSTR:81,"가")% 계속 쑤셨어%UNICODE(0x2665)%`);
      ctx.showMessage(`응, 맞아%UNICODE(0x2665)% %CSTR:80%, %CSTR:80% 가지고 싶다고`);
      ctx.showMessage(`계속 생각났어%UNICODE(0x2665)%`);
      ctx.showMessage(`　하루노짱하고 에리짱이랑 이야기할 때도, 머리 속에선 %CSTR:80%만 생각했었어%UNICODE(0x2665)%`);
      ctx.showMessage(`　%조사처리(CSTR:9,"는")% 사실 다른 애들 생각처럼 우등생이 아니야%UNICODE(0x2665)%`);
      ctx.showMessage(`　난교 생SEX를 엄청 좋아하는 걸레야%UNICODE(0x2665)%`);
      ctx.showMessage(`　――응, 좋아하는 사람?`);
      ctx.showMessage(`　있었지만, 이제 아무래도 좋아졌어%UNICODE(0x2665)%`);
      ctx.showMessage(`　그치만 SEX도 안해주고, %조사처리(CSTR:9,"가")% 좋아하는 건 사람이 아니라 단단하게 발기한 %CSTR:80%%UNICODE(0x2665)%`);
      ctx.showMessage(`그런 사람이랑 같이 있을 바에는`);
      ctx.showMessage(`너희들과 SEX하는 게 몇배는 즐겁고 기분 좋아아앙%UNICODE(0x2665)%`);
      ctx.showMessage(`　그러니까 오늘도 ……햐아앙!　정액이 다 떨어질때까지 ${ctx.josaHelper("타겟을")} 범해줘%UNICODE(0x2665)%」`);
      ctx.showMessage(`L`);
      // TODO: SETFONT ""
      ctx.resetColor();
      ctx.showMessage(`W 방과후, %타겟이(1)% 같은 반의 남자 여러명과 학교 뒷편에 가는 게 보였다……`);
      ctx.showMessage(`요즘 학원의 남자들 사이에서, ${ctx.josaHelper("타겟이")}『부탁하면 누구든 대주는 걸레』라고 불리던데`);
      ctx.showMessage(`이것도 관계가 있는 걸까`);
      ctx.showMessage(`궁금해진 ${ctx.josaHelper("플레이어가")} ${ctx.getVarName("CALL", TARGET)}의 뒤를 쫓아 학교 뒷편에 가자, 평소엔 잠겨있는`);
      ctx.showMessage(`체육창고 문이 살짝 열려있고, 남자들의 말소리가 들려왔다`);
      ctx.showMessage(`문 틈새로 안을 들여다보니 치마를 걷어 올려서`);
      await print_underwear_color_under(ctx, character);
      ctx.showMessage(``);
      await print_underwear_under(ctx, character);
      ctx.showMessage(`를 보여주면서, 상스럽게 다리를 벌려 남학생 위에 걸터앉아,`);
      ctx.showMessage(`양손엔 다른 학생들의 페니스를 교대로 펠라하는 ${ctx.josaHelper("타겟이")} 보였다`);
      ctx.showMessage(`지금까지 본적 없는 음란한 표정으로 육봉을 입에 넣고 범해지던`);
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 스스로 허리를 흔들며, 옛날의 청순함 모습은 어디로 갔는지, 그저 쾌락만을 추구하고 있었다`);
      ctx.showMessage(`거기다 남자들의 대화로 보건데,`);
      ctx.showMessage(`그들이 ${ctx.josaHelper("타겟과")} SEX하는 것도 이게 처음은 아닌 것 같다……`);
      ctx.showMessage(`『그』얌전하고 청순했던 ${ctx.josaHelper("타겟이")} SEX에 빠져, 이름도 모르는 남자의 육봉에`);
      ctx.showMessage(`범해지는 모습에, ${ctx.getVarName("CALL", PLAYER)}의 페니스는 아플 정도로 커져 있었다`);
    } else if (character.no != 1) {
      ctx.showMessage(`W ${ctx.getName(character)}에게 이상한 소문이 돌고 있다……`);
      ctx.showMessage(`소문으로는 ${ctx.josaHelper("타겟은")}`);
      if (ctx.talents[14] == 1) {
        ctx.showMessage(`겉으로는 얌전한 채 하면서`);
      }
      ctx.showMessage(`『부탁하면 누구든 대주는』걸레고, 진짜로 ${ctx.getVarName("CALL", TARGET)}하고`);
      ctx.showMessage(`SEX해본 사람도 많다고 한다`);
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}에게 진짜냐고 추궁하자, 오늘도 지도받기 전에 섹프들과『놀고』왔다고 했다`);
    }
    ctx.showMessage(`W 《%타겟은(1)%【${ctx.getVarName("TALENT", 31)}】%조사만처리(TALENTNAME:31,"가")% 됐다》`);
    ctx.talents[31] = 1;
  }
  if (ctx.base[9] < 20 && ctx.exp[92] >= 5 && ctx.talents[452] === 0) {
    ctx.showMessage(`지금까지 미성년 음주나 흡연등을 계속하여, 몇번이나 훈계를 당한 ${ctx.josaHelper("타겟은")}, 동네에서도 유명한 불량아가 되어있었다.`);
    ctx.showMessage(`W ${ctx.josaHelper("타겟은")}【${ctx.getVarName("TALENT", 452)}】%조사만처리(TALENTNAME:452,"가")% 됐다`);
    ctx.talents[452] = 1;
  }
  if (character.cflags[730] >= 500000 && ctx.exp[76] >= 11 && ctx.talents[401] === 0) {
    ctx.showMessage(`‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥`);
    ctx.showMessage(`%플레이어는(1)%, 인터넷에 올린 동영상에 달린 댓글을 살펴봤다.`);
    ctx.showMessage(`L`);
    ctx.showMessage(`L`);
    if (ctx.base[9] < 27) {
      ctx.showMessage(`「신작인『%CSTR:30%%CSTR:31%%CSTR:32%%CSTR:33%%CSTR:34%%CSTR:35%%CSTR:36%%CSTR:37%』에서`);
      ctx.showMessage(`　${ctx.getVarName("NICK", TARGET)}짱을 처음 봤는데, 너무 야하고 귀여워서 빨딱 섰다」`);
      ctx.showMessage(`L`);
      ctx.showMessage(`「대표작인『%CSTR:20%%CSTR:21%%CSTR:22%%CSTR:23%%CSTR:24%%CSTR:25%%CSTR:26%%CSTR:27%』도`);
      ctx.showMessage(`　명작이지. 앞으로도 야한거 내놔」`);
      ctx.showMessage(`L`);
      ctx.showMessage(`「데뷔작인『%CSTR:10%%CSTR:11%%CSTR:12%%CSTR:13%%CSTR:14%%CSTR:15%%CSTR:16%%CSTR:17%』본 뒤부터,`);
      ctx.showMessage(`　쭉 ${ctx.getVarName("NICK", TARGET)}짱 팬이었는데, 딱 한번이라도 떡치고 싶다!」`);
    }
    if (ctx.base[9] >= 27) {
      ctx.showMessage(`「신작인『%CSTR:30%%CSTR:31%%CSTR:32%%CSTR:33%%CSTR:34%%CSTR:35%%CSTR:36%%CSTR:37%』에서`);
      ctx.showMessage(`　${ctx.josaHelper(ctx.getVarName("NICKNAME", character), "을")} 처음 봤는데, 너무 야해서 쥬지가 터지는 줄 알았다」`);
      ctx.showMessage(`L`);
      ctx.showMessage(`「대표작인『%CSTR:20%%CSTR:21%%CSTR:22%%CSTR:23%%CSTR:24%%CSTR:25%%CSTR:26%%CSTR:27%』도`);
      ctx.showMessage(`　명작이지. 앞으로도 색기가 넘치는 작품, 부탁합니다!」`);
      ctx.showMessage(`L`);
      ctx.showMessage(`「데뷔작인『%CSTR:10%%CSTR:11%%CSTR:12%%CSTR:13%%CSTR:14%%CSTR:15%%CSTR:16%%CSTR:17%』본 뒤부터,`);
      ctx.showMessage(`쭉 ${ctx.getVarName("NICK", TARGET)} 팬이었는데, 하룻밤만이라도 같이 자고 싶어」`);
    }
    ctx.showMessage(`L`);
    ctx.showMessage(`L`);
    ctx.showMessage(`AV에 데뷔한 뒤, 수많은 작품으로 팬들을 매료해온 결과`);
    ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("NICKNAME", character), "는")}【${ctx.getVarName("TALENT", 401)}】%조사만처리(TALENTNAME:401,"이")% 됐다.`);
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}에게 이 일을 전해주니, 싫지는 않은 듯, 살짝 웃었다.`);
    ctx.talents[401] = 1;
    MAXctx.base[31] += 20;
    ctx.base[31] += 20;
  }
  if (ctx.abilities[15] >= 5 && ctx.exp[73] >= 200 && ctx.exp[80] >= 20 && Talent[421] === 1 && Talent[182] === 0) {
    ctx.showMessage(` ${ctx.josaHelper("타겟은")}【${ctx.getVarName("TALENT", 421)}】일에도 익숙해져 손님 대응도 능숙하게 해내게 됐다.`);
    ctx.showMessage(` ${ctx.josaHelper("타겟은")}【${ctx.getVarName("TALENT", 182)}】%조사만처리(TALENTNAME:182,"을")% 얻었다`);
    ctx.talents[182] = 1;
  }
  if (ctx.flags[30] >= 5 && ctx.getTalent(master, 92) === 0) {
    ctx.showMessage(`W %플레이어는(1)%【${ctx.getVarName("TALENT", 92)}】%조사만처리(TALENTNAME:92,"을")% 가지게 됐다`);
    ctx.getTalent(master, 92) = 1;
  }
  if (ctx.flags[68] >= 4 && ctx.getTalent(master, 163) === 0) {
    ctx.showMessage(`W %플레이어는(1)%【${ctx.getVarName("TALENT", 163)}】%조사만처리(TALENTNAME:163,"이")% 됐다`);
    ctx.getTalent(master, 163) = 1;
  }
}
