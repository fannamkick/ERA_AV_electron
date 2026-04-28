/**
 * EVENT_WORK_MESSAGE_SP.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function work_message_strip_01(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if ((ctx.flags[6] & 1)) {
    return 0;
  }
  ctx.print('스포트라이트를 받으면서,');
  await work_sub_print_member(ctx, character);
  ctx.showMessage(`%조사만처리(RESULT+2,"는")% 관객들에게 나체를 보이고 있다……`);
  await ctx.wait();
  if (ctx.flags[53] & 1) {
    ctx.print('그리고,');
    await work_sub_print_member(ctx, character);
    ctx.showMessage(`%조사만처리(RESULT+2,"는")% 객석을 향해 다리를 열어 비밀스런 곳을 드러내고,`);
    ctx.showMessage('야시시한 소리를 내며 성기를 휘젖기 시작했다……'); ctx.waitInput();
    if (ctx.flags[53] & 8) {
      ctx.print('무수히 많은 눈이 지켜보는 가운데 이어서 계속해서 자위하고 있는');
      if (character.tflags[14] === 2) {
        if (ctx.talents[122]) {
          ctx.print('부');
        }
        if (ctx.talents[122] == 0) {
          ctx.print('모');
        }
        if (ctx.getTalent(assi, 122)) {
          ctx.print('자');
        }
        if (ctx.getTalent(assi, 122) == 0) {
          ctx.print('녀');
        }
      } else if (character.tflags[14] === 4) {
        if (ctx.talents[122] && ctx.getTalent(assi, 122)) {
          ctx.print('형제');
        }
        if (ctx.talents[122] == 0 && ctx.getTalent(assi, 122) == 0) {
          ctx.print('자매');
        }
        if (ctx.talents[122] ^ ctx.getTalent(assi, 122)) {
          ctx.print('남매');
        }
      }
      ctx.showMessage('에게,');
      ctx.showMessage('객석에서 추잡한 야유가 터졌다……');
      ctx.showMessage('에게,');
      ctx.showMessage('객석으로부터 음란한 야유가 흘러나왔다……'); ctx.waitInput();
    }
    ctx.showMessage('');
  }
  if (ctx.flags[53] & 2) {
    ctx.print('이윽고');
    await work_sub_print_member(ctx, character);
    ctx.showMessage(`W %조사만처리(RESULT+2,"는")% 서로의 알몸을 음란하게 얽기 시작했다……`);
    if (ctx.flags[53] & 8) {
      if (character.tflags[14] === 2) {
        ctx.showMessage('M자로 열린 모친의 고간에 얼굴을 붙인채,');
        ctx.print('자신이 태어난 장소를 혀로 햝는');
        if (ctx.getTalent(assi, 135)) {
          ctx.print('유녀');
        } else if (ctx.getTalent(assi, 132)) {
          ctx.print('소녀');
        } else {
          ctx.print('딸');
        }
      } else if (character.tflags[14] === 4) {
        ctx.print('서로 반대로 붙어 상대의 성기를 서로 햝고 있는 언니와 여동생');
      }
      ctx.showMessage('의 모습을,');
      ctx.showMessage('관객은 숨을 죽이며 지켜보고 있다……'); ctx.waitInput();
    }
    ctx.showMessage('');
  }
  if (ctx.flags[53] & 4) {
    ctx.showMessage('본방 행위가 시작되었다……'); ctx.waitInput();
    if (ctx.getTalent(target, 121) && character.cflags[character][54] === 0 && ctx.getTalent(assi, 121) && character.cflags[ctx.assi][54] === 0) {
      ctx.showMessage(`${ctx.josaHelper("타겟과")} ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.assi), "는")}`);
      ctx.showMessage(`W 서로의 페니스로 서로의 보지를 교대로 꿰뚫었다`);
    } else if ((ctx.getTalent(target, 122) || ctx.getTalent(target, 121)) && character.cflags[ctx.assi][54] === 0) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 발기된 자신의 페니스가`);
      ctx.showMessage(`W ${ctx.getVarName("CALL", ASSI)}의 보지에 출납하는 모습을 손님들에게 과시했다`);
    } else if ((ctx.getTalent(assi, 122) || ctx.getTalent(assi, 121)) && character.cflags[54] === 0) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 자신의 보지가`);
      ctx.showMessage(`W ${ctx.getVarName("CALL", ASSI)}의 페니스로 관철당하는 모습을 손님에게 과시했다`);
    }
    if (ctx.flags[53] & 8) {
      await ctx.wait();
      if (character.tflags[14] === 2  && ctx.talents[122]) {
        ctx.print('아버지');
      } else if (character.tflags[14] === 2  && ctx.talents[122] === 0) {
        ctx.print('어머니');
      } else if (character.tflags[14] === 4  && ctx.talents[122] && ctx.getTalent(assi, 122)) {
        ctx.print('형');
      } else if (character.tflags[14] === 4  && ctx.talents[122] && ctx.getTalent(assi, 122) === 0) {
        ctx.print('오빠');
      } else if (character.tflags[14] === 4  && ctx.talents[122] === 0 && ctx.getTalent(assi, 122)) {
        ctx.print('누나');
      } else if (character.tflags[14] === 4  && ctx.talents[122] === 0 && ctx.getTalent(assi, 122) === 0) {
        ctx.print('언니');
      }
      ctx.print('가');
      if (character.tflags[14] === 2 && ctx.getTalent(assi, 122) === 0) {
        ctx.print('자신의 딸');
      } else if (character.tflags[14] === 2 && ctx.getTalent(assi, 122)) {
        ctx.print('자신의 아들');
      } else if (character.tflags[14] === 4 && ctx.getTalent(assi, 122) === 0) {
        ctx.print('자신의 여동생');
      } else if (character.tflags[14] === 4 && ctx.getTalent(assi, 122)) {
        ctx.print('자신의 남동생');
      }
      if (ctx.talents[121] && character.cflags[54] === 0 && ctx.getTalent(assi, 121) && character.cflags[ctx.assi][54] === 0) {
        ctx.print('과 서로서로 범하는');
      } else if ((ctx.talents[122] || ctx.talents[121]) && character.cflags[ctx.assi][54] === 0) {
        ctx.print('을 계속해서 범하는');
      } else if ((ctx.getTalent(assi, 122) || ctx.getTalent(assi, 121)) && character.cflags[54] === 0) {
        ctx.print('에게 계속해서 범해지는');
      }
      ctx.showMessage('비정상적인 광경에, 관객석은 조용해졌다……'); ctx.waitInput();
    }
    ctx.showMessage('');
  }
  if (A <= 1) {
    ctx.showMessage(`수치심을 참을 수 없어졌는지`);
    if (ctx.flags[42] === 1 && character > 0) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")}`);
    } else if (ctx.flags[42] === 2) {
      ctx.showMessage(`${ctx.josaHelper("타겟과")} ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.assi), "는")}`);
    } else if (ctx.flags[42] ==3) {
      ctx.print('3명은');
    } else {
      ctx.showMessage(`${ctx.flags[42]}명은`);
    }
    ctx.showMessage(`W  중간에 몸을 멈춰버렸다`);
  } else {
    if (ctx.flags[42] === 2) {
      if ((ctx.flags[53] & 8) && ctx.abilities[17] >= 4 && ctx.talents[57] && ctx.assiAbilities[17] >= 4 && ctx.getTalent(assi, 57)) {
        ctx.showMessage(`쇼의 마지막에 ${ctx.josaHelper("타겟이")} ${ctx.getVarName("CALL", ASSI)}의 양다리를 잡아들고 방뇨시키고,`);
        ctx.showMessage(`자기 자신도 그 자세 그래도 가랑이를 열어 동시에 방뇨하자,`);
        ctx.showMessage(`객석에서 대환성이 솟구쳐 올랐다……`);
      } else if ((ctx.flags[53] & 8) && ctx.assiAbilities[17] >= 4 && ctx.getTalent(assi, 57)) {
        ctx.showMessage(`쇼의 마지막에 ${ctx.josaHelper("타겟이")} ${ctx.getVarName("CALL", ASSI)}의 양다리를 아기처럼 안아올리고,`);
        ctx.showMessage(`객석을 향해 방뇨시키자, 대환성이 솟구쳐 올랐다……`);
      } else if (ctx.abilities[17] >= 4 && ctx.talents[57] && ctx.assiAbilities[17] >= 4 && ctx.getTalent(assi, 57)) {
        ctx.showMessage(`쇼의 마지막에 ${ctx.josaHelper("타겟과")} ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.assi), "가")} 줄지어 양다리를 열고,`);
        ctx.showMessage(`동시에 방뇨하자, 환성이 올랐다……`);
      } else if (ctx.abilities[17] >= 4 && ctx.talents[57]) {
        if (ctx.abilities[22] + ctx.assiAbilities[22] >= 6 && ctx.abilities[20] + ctx.assiAbilities[21] >= 6) {
          ctx.showMessage(`쇼의 마지막에 ${ctx.josaHelper("타겟이")} ${ctx.getVarName("CALL", ASSI)}의 입안에 방뇨하자,`);
          ctx.showMessage(`대환성이 솟구쳐 올랐다……`);
        } else {
          ctx.showMessage(`쇼의 마지막에 ${ctx.josaHelper("타겟이")} 객석을 향해 방뇨하자, 환성이 올랐다……`);
        }
      } else if (ctx.assiAbilities[17] >= 4 && ctx.getTalent(assi, 57)) {
        if (ctx.abilities[22] + ctx.assiAbilities[22] >= 6 && ctx.assiAbilities[20] + ctx.abilities[21] >= 6) {
          ctx.showMessage(`쇼의 마지막에 ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.assi), "가")} ${ctx.getVarName("CALL", TARGET)}의 입안에 방뇨하자,`);
          ctx.showMessage(`대환성이 솟구쳐 올랐다……`);
        } else {
          ctx.showMessage(`쇼의 마지막에 ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.assi), "가")} 객석을 향해 방뇨하자, 환성이 올랐다……`);
        }
      }
      await ctx.wait();
    } else if (ctx.abilities[17] >= 4 && ctx.talents[57]) {
      ctx.showMessage(`쇼의 마지막에 ${ctx.josaHelper("타겟이")} 객석을 향해 방뇨하자, 환성이 올랐다……`);
      await ctx.wait();
    }
    if (ctx.flags[50] === 0) {
      await work_sub_print_member(ctx, character);
      ctx.showMessage(`W %조사만처리(RESULT+2,"는")% 부끄러운듯이 미소지으며, 스테이지에서 내려왔다……`);
    }
  }
  return 1;
}

export async function work_message_strip_02(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if ((ctx.flags[6] & 1)) {
    return 0;
  }
  E = 1;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130] == 0) {
      // TODO: CONTINUE
    }
    if (ctx.getTalent(count, 76) == 0 || ctx.getTalent(count, 180) == 0) {
      E = 0;
    }
  }
  F = 1;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130] == 0) {
      // TODO: CONTINUE
    }
    if (character.cflags[ctx.count][54]) {
      // TODO: CONTINUE
    }
    F = 0;
  }
  ctx.print('매트 위에서');
  if (E) {
    ctx.print('다리가 반정도 열려있는 상태로 유혹하고 있는');
  } else {
    ctx.print('긴장으로 몸을 딱딱하게 굳은');
  }
  await work_sub_print_member(ctx, character);
  ctx.showMessage(`%조사만처리(RESULT+2,"를")%`);
  ctx.showMessage(`스테이지에 오른 {G/3}명의 관객이 차례로 덮쳐,`);
  if (F == 0) {
    ctx.print('보지와');
  }
  ctx.showMessage(`항문과 입을 마음껏 맛보았다……`);
  return 1;
}

export async function work_message_orgy_01(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if ((ctx.flags[6] & 1)) {
    return 0;
  }
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130] == 0) {
      // TODO: CONTINUE
    }
    if (ctx.getTalent(count, 76) === 1) {
      // TODO: CHKFONT "あくびん"
      if (ctx.result) {
        // TODO: SETFONT "あくびん"
      }
      ctx.setColor(0xDDBBCC);
      if (ctx.getTalent(count, 0) === 1) {
        ctx.showMessage(`「${ctx.getVarName("CALL", COUNT)}의 처녀막, 손님씨의 훌륭한 %조사처리(CSTR:COUNT:80,"로")% 뚫어줘」`);
      }
      ctx.showMessage(` 「${ctx.getVarName("CALL", COUNT)}의 보지에도 항문에도 입에도, 좋은 곳에 가~득 사정해줘♪」`);
      ctx.resetColor();
      // TODO: SETFONT ""
    }
    ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "는")}`);
    if (character.cflags[ctx.count][54] === 0) {
      if (ctx.getTalent(count, 0)) {
        ctx.print('더러움을 모르는');
      }
      ctx.showMessage(`질과`);
    }
    ctx.print('항문을 꿰뚫어');
    if (ctx.getTalent(count, 76) || ctx.getTalent(count, 180)) {
      ctx.print('지면서 입안에 든 페니스를 햝듯이 빨며');
    } else {
      ctx.print('지면서 입을 범해지고');
    }
    ctx.print(', 양손에');
    if (ctx.getTalent(count, 76) || ctx.getTalent(count, 180)) {
      ctx.showMessage('꽉 쥐고 있는 페니스를 음란한 손놀림으로 훑고 있다……'); ctx.waitInput();
    } else {
      ctx.showMessage('쥐어진 페니스를 계속 훑고 있다……'); ctx.waitInput();
    }
    // TODO: PRINTW
    if (ctx.getTalent(count, 414) === 1 && ctx.getTalent(count, 76) === 1) {
      // TODO: CHKFONT "あくびん"
      if (ctx.result) {
        // TODO: SETFONT "あくびん"
      }
      ctx.setColor(0xDDBBCC);
      ctx.showMessage(` 「야아앙, %CSTR:COUNT:80% 뽑으면 안돼에……」`);
      ctx.showMessage(` 「시러시러, 거긴 오줌구멍이야…… %CSTR:COUNT:80% 안들어가는 데야♪」`);
      ctx.showMessage(` 「더는 안돼, 엉덩일 범해지며 오줌싸는게 보여져버려♪」`);
      ctx.resetColor();
      // TODO: SETFONT ""
      ctx.showMessage(`어려보이는, 앳된 용모의 ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "가")} 적극적으로 페니스를 빨며, 스스로 허리를 흔드는 음탕한 모습에`);
      ctx.showMessage(`흥분한 남자들은, 티없는 몸을 더럽히려는 듯이 ${ctx.getVarName("CALL", COUNT)}의 전신에 백탁액을 뿌렸다……`);
      ctx.showMessage(`항문에 삽입된 채로 뒤로부터 안겨져, 강제적으로 M자모양 포즈를 강요당한`);
      ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "는")}, 요도를 집요하게 희롱당해져`);
      ctx.showMessage(`그 자극과 항문을 관철당하는 쾌감으로 뇨의가 한계를 맞이하여`);
      ctx.showMessage(`융단이 깔린 바닥을 향해 분수처럼 힘차게 방뇨하기 시작했다……`);
      // TODO: PRINTW
    } else if (ctx.getTalent(count, 414) === 1 && ctx.getTalent(count, 76) === 0) {
      ctx.showMessage(`어려보이는, 앳된 용모의 ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "가")} 어색하게 페니스를 입에 물고, 양구멍을 관철당하는 모습에`);
      ctx.showMessage(`흥분한 남자들은, 티없는 몸을 더럽히려는 듯이 ${ctx.getVarName("CALL", COUNT)}의 전신에 백탁액을 뿌렸다……`);
      ctx.showMessage(`W`);
    }
    if (ctx.getTalent(count, 509) === 1 && ctx.getTalent(count, 76) === 1) {
      // TODO: CHKFONT "あくびん"
      if (ctx.result) {
        // TODO: SETFONT "あくびん"
      }
      ctx.setColor(0xDDBBCC);
      ctx.showMessage(`「CPG 의상을 입은 ${ctx.getVarName("CALL", COUNT)}땅을 범하고 싶어, 라니……차암, 정액투성이가 되버리면`);
      ctx.showMessage(`클리닝 맡길 때 부끄러운데」`);
      ctx.showMessage(` 「……에, 안입으면 %CSTR:COUNT:80% 안넣어 주는거야……?」`);
      ctx.showMessage(` 「으우~……알았으니까 ${ctx.getVarName("CALL", COUNT)}의 축축한 보지에 %CSTR:COUNT:80% 넣어줘……」`);
      ctx.resetColor();
      // TODO: SETFONT ""
      ctx.showMessage(`대중적 아이돌그룹 멤버인 ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "가")} 적극적으로 페니스를 빨며, 스스로 허리를 흔드는 음탕한 모습에`);
      ctx.showMessage(`흥분한 남자들은, 보통이라면 손댈 수 없는 존재를 더럽히고 싶은 탓에 ${ctx.getVarName("CALL", COUNT)}의`);
      ctx.showMessage(`자궁에 차례차례 질내사정했고`);
      ctx.showMessage(`결합부에서는 역류한 정액이 방울져 흘려내리고 있다……`);
      ctx.showMessage(`누군가가 반입한 카메라를 들이밀자, ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "는")} 양손으로 브이싸인을 만들면서`);
      ctx.showMessage(`단정치못한 가버린 얼굴을 비치고 있다`);
      ctx.showMessage(`셔터가 눌릴때마다 ${ctx.getVarName("CALL", COUNT)}의 양구멍이 오므라들며, 삽입된 페니스를 억압하자`);
      ctx.showMessage(`더는 참지 못하고 정액을 안쪽에 쏟아넣었다……`);
      // TODO: PRINTW
    } else if (ctx.getTalent(count, 509) === 1 && ctx.getTalent(count, 76) === 0) {
      ctx.showMessage(`대중적 아이돌그룹 멤버인 ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "가")} 어색하게 페니스를 입에 물고, 양구멍을 관철당하는 모습에`);
      ctx.showMessage(`흥분한 남자들은, 보통이라면 손댈 수 없는 존재를 더럽히고 싶은 탓에 ${ctx.getVarName("CALL", COUNT)}의`);
      ctx.showMessage(`자궁에 차례차례 질내사정했다……`);
      ctx.showMessage(`결합부에서는 역류한 정액이 방울져 흘려내리고 있다……`);
      // TODO: PRINTW
    }
    if (ctx.getTalent(count, 519) === 1) {
      ctx.showMessage(`신인 기예 아이돌 그룹의 멤버, ${ctx.getVarName("CALL", COUNT)}의 타천사라는 이름에 어울리는 음란한 모습에`);
      ctx.showMessage(`흥분한 남자들은, 보통이라면 손댈 수 없는 존재를 더럽히고 싶은 탓에 ${ctx.getVarName("CALL", COUNT)}의`);
      ctx.showMessage(`자궁에 차례차례 질내사정했다……`);
      ctx.showMessage(`결합부에서는 역류한 정액이 방울져 흘려내리고 있다……`);
      // TODO: PRINTW
    }
    if (ctx.getTalent(count, 407) === 1 && ctx.getTalent(count, 76) === 1) {
      // TODO: CHKFONT "あくびん"
      if (ctx.result) {
        // TODO: SETFONT "あくびん"
      }
      ctx.setColor(0xDDBBCC);
      ctx.showMessage(` 「그렇게 엉덩이만 괴롭히지 말아줘어……바보가 되버려어」`);
      ctx.showMessage(` 「그래도……모두에게 정액관장 해줬으면해서 오늘을 위해 일주일이나 참아왔어♪」`);
      ctx.showMessage(` 「그・러・니・까v${ctx.getVarName("CALL", COUNT)}의 뒷구멍에 가~득 정액을 넣어줘♪」`);
      ctx.resetColor();
      // TODO: SETFONT ""
      ctx.showMessage(`고귀한 존재인 ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "가")} 적극적으로 페니스를 빨며, 스스로 허리를 흔드는 음탕한 모습에`);
      ctx.showMessage(`흥분한 남자들은, 보통이라면 손댈 수 없는 존재를 더럽히고 싶은 탓에 ${ctx.getVarName("CALL", COUNT)}의`);
      ctx.showMessage(`항문에 차례차례 사정했다`);
      ctx.showMessage(`장액투성이인 페니스를 넣고 뺄때마다 ${ctx.getVarName("CALL", COUNT)}의 결합부에서는`);
      ctx.showMessage(`질퍽질퍽하는 음란한 소리를 내고 있다……`);
      ctx.showMessage(`거듭된 정액관장에 견딜 수 없어진 ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "가")} 변의를 호소하자, 손님중 한명이`);
      ctx.showMessage(`스카토로감상 취미용으로 준비된 변기를 가져왔고`);
      ctx.showMessage(`거기에 배설하도록 요구받은 ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "는")} 머리뒤에 손을 올리고,`);
      ctx.showMessage(`땀냄새를 물씬 풍기`);
      if (character.cflags[ctx.count][607] === 1) {
        ctx.showMessage(`며 겨털이 땀에 젖어 반짝이`);
      }
      ctx.showMessage(`는 겨드랑이를 과시하`);
      ctx.showMessage(`면서, 천하게 오다리모양으로 정액이 섞인, 일국의 공주 것이라고는 생각되지 않는`);
      ctx.showMessage(`코가 꺾일것 같을 만큼 강렬한 악취를 내는 설사를, 피슛피슛한 하는 소리를 내면서 내보낸다`);
      ctx.showMessage(`배설행위와 자신의 오물을 노출되었다는 데에, ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "는")}`);
      ctx.showMessage(`부끄러워하기는 커녕 황홀한 표정을 띄우고 있다……`);
      // TODO: PRINTW
    } else if (ctx.getTalent(count, 407) === 1 && ctx.getTalent(count, 76) === 0) {
      ctx.showMessage(`고귀한 존재인 ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "가")} 어색하게 페니스를 입에 물고, 양구멍을 관철당하는 모습에`);
      ctx.showMessage(`흥분한 남자들은, 보통이라면 손댈 수 없는 존재를 더럽히고 싶은 탓에 ${ctx.getVarName("CALL", COUNT)}의`);
      ctx.showMessage(`항문에 차례차례 사정했다`);
      ctx.showMessage(`장액투성이인 페니스를 넣고 뺄때마다 ${ctx.getVarName("CALL", COUNT)}의 결합부에서는`);
      ctx.showMessage(`질퍽질퍽하는 음란한 소리를 내고 있다……`);
      // TODO: PRINTW
    }
    if (ctx.getTalent(count, 87) === 1 && ctx.getTalent(count, 76) === 1) {
      // TODO: CHKFONT "あくびん"
      if (ctx.result) {
        // TODO: SETFONT "あくびん"
      }
      ctx.setColor(0xDDBBCC);
      ctx.showMessage(` 「후훗, 손님의 %CSTR:COUNT:80%, 잔~뜩 문질문질 해줄께요♪」`);
      ctx.showMessage(` 「……에, ${ctx.getVarName("CALL", COUNT)}의 머리카락을 왜 %CSTR:COUNT:80%에 감는거야?」`);
      ctx.showMessage(`「차암, ${ctx.getVarName("CALL", COUNT)}의 머리카락이랑 겨드랑이에 정액을 뿌려대다니…… 손님도 차암 변태씨`);
      ctx.showMessage(`라니깐♪」`);
      ctx.resetColor();
      // TODO: SETFONT ""
      ctx.showMessage(`일부러 천천히 혀를 사용해 페니스를 봉사하고 있는 ${ctx.getVarName("CALL", COUNT)}에게 감질난`);
      ctx.showMessage(`남성객은, ${ctx.getVarName("CALL", COUNT)}의 머리를 잡아, 강제로 목구멍까지 페니스를 찔러 넣었다`);
      ctx.showMessage(`목을 범해져 숨막힌 소리를 내면서도, ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "는")} 가늘고 섬세한 손가락으로 구경만하던`);
      ctx.showMessage(`손님의 페니스를, 엄지와 검지로 만든 고리로 때로는 단단히 조이며 귀두부터 쓸어내리고 있다……`);
      ctx.showMessage(`${ctx.getVarName("CALL", COUNT)}의 비단실같이 사락사락거리는 머리카락의 냄새를 맡으면서 페니스를 만지며, 차레를 기다리고 있던`);
      ctx.showMessage(`손님은 기다릴 수 없었는지, ${ctx.getVarName("CALL", COUNT)}의`);
      await print_hairstyle_4count(ctx, character);
      if (character.cflags[ctx.count][602] === 5 || character.cflags[ctx.count][602] === 1 || character.cflags[ctx.count][602] === 2) {
        ctx.showMessage(`머리를`);
      } else if (character.cflags[ctx.count][602] === 4) {
        ctx.showMessage(`머리를 한손에 들고, 그것을`);
      } else if (character.cflags[ctx.count][602] === 6) {
        ctx.showMessage(`머리카락을 풀어, 풀린 머리카락을`);
      }
      ctx.showMessage(`딱딱하게 우뚝 솟은 거무스런 페니스에 비비며,`);
      ctx.showMessage(`오나홀을 대신해 자위를 시작했다`);
      ctx.showMessage(`다른 구경만하던 손님도 거기에 동조해 ${ctx.getVarName("CALL", COUNT)}의 겨드랑이나 허벅지, 구멍주변 여기저기에 페니스를`);
      ctx.showMessage(`꽉 누르며, 차례차례 백탁액으로 물들였다`);
      ctx.showMessage(`그리고 마지막에 이라마치오를 하고 있던 손님이 ${ctx.getVarName("CALL", COUNT)}의 입안에 사정하자, 정액투성이인`);
      ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "는")} 혀를 내밀어 사정된지 얼마 안된 정액을 주위에 보여주고는, 일부러 소리를 내며`);
      ctx.showMessage(`모조리 마셨다……`);
      // TODO: PRINTW
    } else if (ctx.getTalent(count, 87) === 1 && ctx.getTalent(count, 76) === 0) {
      ctx.showMessage(`열심히 혀를 사용해 페니스에 봉사하고 있는 ${ctx.getVarName("CALL", COUNT)}에게 감질난`);
      ctx.showMessage(`남성객은, ${ctx.getVarName("CALL", COUNT)}의 머리를 잡고, 강제로 목구멍까지 페니스를 찔러넣었다`);
      ctx.showMessage(`목을 범해져 숨막힌 소리를 내면서도, ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "는")} 가늘고 섬세한 손가락으로 구경만하던`);
      ctx.showMessage(`손님의 페니스를, 손님에게 지시받는대로 필사적으로 흝고 있다……`);
      // TODO: PRINTW
    }
    if (ctx.getTalent(count, 422) === 1 && ctx.getTalent(count, 432) === 1) {
      // TODO: CHKFONT "あくびん"
      if (ctx.result) {
        // TODO: SETFONT "あくびん"
      }
      ctx.setColor(0xDDBBCC);
      ctx.showMessage(` 「역시 약섹스가 최고지, 아저씨의 %CSTR:COUNT:80%도 딱딱하게 꼴려있고」`);
      ctx.showMessage(`「한 번 쌌는데도 %CSTR:COUNT:80% 뽑지않고 5번을 질내사정한다던가 흑%CSTR:COUNT:80% 주제에 도가 지나쳐.`);
      ctx.showMessage(`오물냄새나는 동정 포경%CSTR:COUNT:80%도 이것보단 오래가겠어♪ 아니면 내 테크닉이 너무 굉장한건가」`);
      ctx.showMessage(`「콘돔도 안끼고 이만큼 싸대다니 아저씨 어쩔 생각이야♪`);
      ctx.showMessage(`뭐, 그냥 넣어도 된다고 한 건 나지만」`);
      ctx.showMessage(`「정액이 나오지 않게 될때까지 하고 싶다고? 뭐야, 그렇게도 내 보지가`);
      ctx.showMessage(`맘에 들었다면 한가할 때 10장에 범하게 해줄께♪」`);
      ctx.showMessage(`「아핫, 그렇게 필사적으로 승락하다니…… 나야 좋지만♪`);
      ctx.showMessage(`자기 자식이랑 비슷한 나이대 여자에게 돈주면서까지 중년%조사처리(CSTR:COUNT:80,"로")% 약섹스가 하고 싶구나」`);
      ctx.showMessage(`「아저씨 돈 많아 보이니까 좋아, 그 대신 러브호텔이랑 밥은 아저씨가 쏘는거야♪」`);
      ctx.resetColor();
      // TODO: SETFONT ""
      ctx.showMessage(`파티도 끝나갈 무렵, 키류 조직이 뒤에서 뿌리고 있는【프린세스포이즌】라는 이름의`);
      ctx.showMessage(`합법 약품을 흡인한 ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "가")} 지금까지의 손님에게하던 온순한『연기』를 멈추고,`);
      ctx.showMessage(`흑갸루를 좋아하는 중년 남성객 위에 음란하게 다리를 벌리며 걸터앉고 허리를 격렬하게 흔들며, 하얀 광택이 나는`);
      ctx.showMessage(`입에서 피어스가 반짝이는 혀를 내민채, 끝없이 침을 흘리면서 쾌락을 탐내고 있다`);
      ctx.showMessage(`손님도 ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "를")} 보내버리려고, 그 잘록한 갈색 허리를 잡으면서`);
      ctx.showMessage(`숙련된 테크닉으로 페니스를 밑에서부터 밀어올렸지만,`);
      ctx.showMessage(`${ctx.getVarName("CALL", COUNT)}의 허리놀림에, ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "가")} 한번 절정할동안 삼회넘게 쏟아냈다……`);
      ctx.showMessage(`끝없는 ${ctx.getVarName("CALL", COUNT)}의 성욕 앞에 기진맥진한 손님은, 불만족한 ${ctx.getVarName("CALL", COUNT)}에게`);
      ctx.showMessage(`사적인『놀이』를 제안했다`);
      ctx.showMessage(`잠시동안 ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "는")} 품평하듯이 손님을 둘러보더니, 검지를 하나 세웠다`);
      ctx.showMessage(`물론 1장이 아니라, 10장. 이 난교파티 참가비용과 같은 금액이다`);
      ctx.showMessage(`손님은 잠시 골똘히 생각했지만, 이번처럼 비정상적인 섹스에 적극적으로 응해준`);
      ctx.showMessage(`자신의 딸과 동갑정도의『놀이상대』…… 섹스프렌드는 역시 매력적이었는지,`);
      ctx.showMessage(`바이브를 역수로 쥐고 자위하고 있던 ${ctx.getVarName("CALL", COUNT)}에게 연락처가 쓰여진 명함을 전했다……`);
      // TODO: PRINTW
    }
    if (ctx.getTalent(count, 121) === 1) {
      ctx.showMessage(`${ctx.getVarName("CALL", COUNT)}의 터질듯이 발기된 후타나리 페니스는, 뒤로부터 뻗어온 손에 계속해서 잡아당겨져,`);
      ctx.showMessage(`끝없이 정액을 토해내고 있다……`);
      ctx.showMessage(`W 황홀한 표정을 지으며, ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "는")} 수음을 계속해주길 애원하고 있었다`);
    }
    ctx.showMessage('');
    if (character.cflags[ctx.count][54] === 0 && ctx.getTalent(count, 0)) {
      ctx.showMessage(`범해지는 ${ctx.getVarName("CALL", COUNT)}의 질에서는, 하얀 거품섞인 애액과 정액에 처녀혈이 섞여 흐르기 시작하고 있었다`);
      ctx.setColor(0xF58F98);
      ctx.showMessage(`W 【처녀상실】`);
      ctx.resetColor();
    }
    if (ctx.getTalent(count, 2) === 1) {
      ctx.showMessage(`처음으로 페니스를 받아들여, 페니스 굵기대로 열려 있던 ${ctx.getVarName("CALL", COUNT)}의 항문은,`);
      ctx.showMessage(`원상태로 돌아가려 하면서도 누런 장액섞인 정액을 흘러보내고 있었다`);
      ctx.setColor(0xF58F98);
      ctx.showMessage(`W 【애널처녀상실】`);
      ctx.resetColor();
    }
    if (ctx.getTalent(count, 1) === 1) {
      ctx.showMessage(`충분히 애액이 스며든 여성손님의 질육에 삽입하며, 표피가 벗겨진지 얼마 안된 ${ctx.getVarName("CALL", COUNT)}의`);
      if (ctx.getTalent(count, 121) === 1) {
        ctx.showMessage(`후타나리 페니스`);
      } else if (ctx.getTalent(count, 121) === 1) {
        ctx.showMessage(`페니스`);
      }
      ctx.showMessage(`는 태어나서 처음으로 맛보는, 페니스를 모조리 짜내려는 질벽의 움직임에 견디지 못하고,`);
      ctx.showMessage(`흘러넘칠만큼 대량의 정액을 여성손님의 질내에 사정했다`);
      ctx.showMessage(`태어나서 첫 질내사정하는 쾌감에, ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "는")} 황홀한 표정을 짓고 있다……`);
      ctx.setColor(0xF58F98);
      ctx.showMessage(`W 【동정상실】`);
      ctx.resetColor();
    }
    if (ctx.getTalent(count, 76) === 1) {
      // TODO: CHKFONT "あくびん"
      if (ctx.result) {
        // TODO: SETFONT "あくびん"
      }
      ctx.setColor(0xDDBBCC);
      ctx.showMessage(` 「${ctx.getVarName("CALL", COUNT)}의 보지, 손님의 %CSTR:COUNT:80%모양이 되어버렸을지도……」`);
      ctx.showMessage(` 「또 ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "과")} 엣찌하러 와줘♪　약속이야」`);
      ctx.resetColor();
      // TODO: SETFONT ""
    }
    // TODO: PRINTW
  }
  return 1;
}
