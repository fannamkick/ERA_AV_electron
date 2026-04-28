/**
 * EVENT_TRAIN_MESSAGE_B.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function train_message_b(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if ((ctx.flags[6] & 1)) {
    return 0;
  }
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  if (SELECTCOM === 0) {
    if ((character.cflags[40] & 64) && character.cflags[42] <= 50) {
      await print_clothtype_special(ctx, character);
      ctx.print('너머로');
    } else if (character.cflags[40] & 28) {
      await print_clothtype_main2(ctx, character);
      ctx.print('너머로');
    } else if ((character.cflags[40] & 1) || (character.cflags[40] & 2)) {
      ctx.print('속옷 너머로');
    }
    if (character.equipment[89] === 0 && character.equipment[90] === 0 && character.equipment[150] === 0) {
      ctx.showMessage(`${ctx.josaHelper("플레이어는")}`);
      if ((ctx.stain[0] < 2 || ctx.stain[0] == 16 || ctx.stain[0] == 17 || ctx.getTalent(master, 64) || ctx.assiPlay) && character.equipment[45] == 0 && character.cflags[16] != -1) {
        ctx.print('키스하면서');
      }
    }
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의`);
    if (ctx.talents[135]) {
      ctx.print('미숙한');
    } else if (ctx.talents[100]) {
      ctx.print('미발달된');
    } else if (ctx.talents[115]) {
      ctx.print('포동포동하게 살찐');
    }
    if (character.equipment[150]) {
      ctx.showMessage('몸을 슬라임이 기어다녔다…');
    } else if (character.equipment[90]) {
      ctx.showMessage('몸을 촉수가 희롱했다…');
    } else if (character.equipment[89]) {
      ctx.showMessage('몸을 개의 혀가 핥아댔다…');
    } else {
      ctx.showMessage('몸을 열심히 애무했다…');
    }
    if (ctx.talents[153] && character.cflags[110] <= DAY+5 && (character.cflags[42] != 11 || (character.cflags[40] & 64) == 0)) {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 둥글게 부풀어오른 배 안에서, 아이의 발길질이 희미하게 느껴진다……`);
    }
  } else if (SELECTCOM === 1) {
    if (character.equipment[89]) {
      ctx.showMessage(`개는`);
    } else {
      ctx.showMessage(`${ctx.josaHelper("플레이어는")}`);
    }
    if (character.equipment[57]) {
      ctx.showMessage(`${ctx.josaHelper("타겟을")} 얼굴 위에 올라타게하고, 소리를 내면서 음순을 빨아`);
    } else {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 비순을 상냥하게 빨아 풀어`);
    }
    if (ctx.talents[121] && ctx.params[5] >= PALAMLV[3]) {
      ctx.print(', 단단히 발기한 페니스를 혀로 핥아');
    } else if (ctx.talents[121]) {
      ctx.print(', 페니스 밑을 혀로 빨아올려');
    } else if (ctx.params[5] >= PALAMLV[3]) {
      ctx.print(', 부풀어오른 클리토리스를 혀로 빨아올려');
    }
    ctx.showMessage('주었다…');
  } else if (SELECTCOM === 2) {
    if (character.equipment[90] == 0 && character.equipment[150] == 0) {
      ctx.showMessage(`${ctx.josaHelper("플레이어는")}`);
    }
    if (character.equipment[150]) {
      ctx.showMessage(`슬라임이 ${ctx.getVarName("CALL", TARGET)}의 애널을 자극하고 있다…`);
    } else if (character.equipment[90]) {
      ctx.showMessage(`점액 투성이의 촉수가 ${ctx.getVarName("CALL", TARGET)}의 애널을 자극하고 있다…`);
    } else if (character.equipment[13]) {
      ctx.showMessage(`조금씩 진동하는 애널바이브를 앞뒤로 넣고 빼기를 반복했다…`);
    } else if (character.equipment[19]) {
      ctx.showMessage(`애널비즈를 가볍게 움직여 주었다…`);
    } else if (character.equipment[46]) {
      ctx.showMessage(`배설감으로 떨리는 국혈을 플러그로 빙글빙글 돌려주었다…`);
    } else if (character.equipment[49]) {
      ctx.showMessage(`희미하게 소리가 나는 전극으로 국혈을 집요허게 괴롭혔다…`);
    } else {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 애널을 자극`);
      if (ctx.params[5] >= PALAMLV[3] && ctx.abilities[3] >= 3) {
        ctx.print('하며 손 끝으로 직장까지 휘저었다…');
      } else {
        ctx.showMessage('했다…');
      }
    }
  } else if (SELECTCOM === 3) {
    if (ctx.talents[122]) {
      ctx.saveStr[2] = "음경을 문지르고";
      ctx.saveStr[3] = "수컷";
    } else if (ctx.talents[121] === 0) {
      ctx.saveStr[2] = "비부를 만지작거리고";
      ctx.saveStr[3] = "암컷";
    } else if (ctx.talents[121] === 1) {
      ctx.saveStr[2] = "발기한 후타나리 페니스를 문지르며 비부를 만지작거리고";
      ctx.saveStr[3] = "암컷";
    }
    if (A < V) {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}에게 자위를 명령해보았지만 거부당했다. 좀 더 지도할 필요가 있다.`);
    } else if (A > V && A < 50) {
      ctx.showMessage(`${ctx.josaHelper("플레이어가")} 자위를 명령하자 ${ctx.josaHelper("타겟은")}`);
      if (character.cflags[40] & 8) {
        await print_clothtype_main2(ctx, character);
        ctx.print('의 앞을 올려 성기를 드러내고');
      }
      if (ctx.talents[15]) {
        ctx.print('자존심은 굽히지 않고');
      }
      if (ctx.talents[22]) {
        ctx.print('무표정한 얼굴로 묵묵히');
      } else if (ctx.talents[10] || ctx.talents[14]) {
        ctx.print('떨리는 손 끝으로');
      } else if (ctx.talents[11]) {
        ctx.print('반항적으로 노려봤지만');
      } else if (ctx.talents[12]) {
        ctx.print('굴욕으로 입술을 깨물고');
      } else if (ctx.talents[35]) {
        ctx.print('수치심에 귀까지 완전히 빨개져');
      }
      if (character.equipment[53]) {
        ctx.print('비디오카메라 앞에서');
      }
      ctx.showMessage('자위를 시작했다.');
    } else if (A >=50 && A < 80) {
      ctx.showMessage(`지도의 성과인지, ${ctx.josaHelper("타겟은")} ${ctx.getVarName("CALL", PLAYER)}의 명령에 복종해 자위를 시작했다.`);
    } else if (A >= 80) {
      ctx.showMessage(`${ctx.josaHelper("플레이어가")} 명령하자 기뻐하며, ${ctx.josaHelper("타겟은")} 완전히 사육된 %SAVESTR:3%의 표정으로 자위를 시작했다.`);
    }
    if (character.equipment[11] && character.equipment[13] && ctx.abilities[2] >= 5 && ctx.abilities[3] >= 5 && ctx.abilities[0] >= 5 && ctx.abilities[1] >= 5 && ctx.params[5] >= PALAMLV[4] && PREVCOM === 3) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 침을 흘리며, 움찔움찔 몸을 떨면서 울고 있다`);
      ctx.showMessage(`절정이 멈추지 않아 계속해서 가고 있는 것 같다…`);
    } else if (character.equipment[11] && ctx.abilities[2] >= 5 && ctx.abilities[0] >= 5 && ctx.abilities[1] >= 5 && ctx.params[5] >= PALAMLV[4] && PREVCOM === 3) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 애액이 흩날리는 것도 신경쓰지 않고, 바이브를 격렬하게 움직이고 있다.`);
      ctx.showMessage(`이제는 다른 일을 신경쓸 여유도 없는 것 같다…`);
    } else if (character.equipment[13] && ctx.abilities[3] >= 5 && ctx.abilities[0] >= 5 && ctx.abilities[1] >= 5 && ctx.params[5] >= PALAMLV[4] && PREVCOM === 3) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 부들부들 몸을 떨면서, 아누스에 바이브를 삽입하고 있다`);
      ctx.showMessage(`주름을 밀고 들어올때마다 몇번이나 절정에 도달해버리는 것 같다…`);
    } else if (ctx.abilities[10] >= 3 && ctx.abilities[0] >= 5 && ctx.abilities[1] >= 5 && ctx.params[5] >= PALAMLV[4] && PREVCOM === 3) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 교성을 흘리며 일심분란하게 자신의 %SAVESTR:2% 있다`);
      ctx.showMessage(`멈추고 싶어도 손이 멋대로 움직여 멈춰지지 않는 것 같다…`);
    }
    ctx.saveStr[2] = STR[0];
    ctx.saveStr[3] = STR[0];
  } else if (SELECTCOM === 4) {
    if (character.equipment[89]) {
      ctx.showMessage(`개는`);
    } else {
      ctx.showMessage(`${ctx.josaHelper("플레이어는")}`);
    }
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의`);
    if (ctx.params[5] >= PALAMLV[3]) {
      ctx.print('딱딱하게 발기된');
    }
    ctx.showMessage('페니스를 입에 삼키고 빨기 시작했다…');
  } else if (SELECTCOM === 5) {
    if (character.equipment[89]) {
      ctx.showMessage(`개는 할짝할짝 소리를 내며`);
    } else if (character.equipment[90] === 0 && character.equipment[150] === 0) {
      ctx.showMessage(`${ctx.josaHelper("플레이어는")}`);
      if (character.cflags[7] & 1) {
        ctx.showMessage('유두를 관통하고 있는 금속제 피어스를 가볍게 잡아당기면서');
      }
    }
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의`);
    if (ctx.talents[116]) {
      ctx.print('완전히 평평한');
    } else if (ctx.talents[100] && ctx.talents[109]) {
      ctx.print('간신히 부푼 것을 알 수 있을 정도의');
    } else if (ctx.talents[109]) {
      ctx.print('표준보다 약간 작은');
    } else if (ctx.talents[110] && character.equipment[89] === 0) {
      ctx.print('손에서 넘쳐흐를 것 같은');
    } else if (ctx.talents[114]) {
      ctx.print('한 쪽 가슴만으로도 넘쳐흐를 것 같은');
    }
    if (character.equipment[150]) {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 가슴에 슬라임이 모이기 시작했다…`);
    } else if (character.equipment[90]) {
      ctx.showMessage('가슴을 짜내듯이, 촉수가 달라붙었다…');
    } else if (character.equipment[89]) {
      ctx.showMessage('가슴을 빨고 있다…');
    } else if (ctx.talents[130] && ctx.params[5] > PALAMLV[3] && character.equipment[16] === 0 && character.equipment[15] === 0 && character.equipment[16] === 0) {
      ctx.print('유방의 끝쪽의');
      ctx.showMessage('완전히 딱딱해진 돌기를 입으로 빨아들였다');
      ctx.showMessage('입 안에 흘러넘치듯이 대량의 모유가 흘러들어왔다…');
      if ((ctx.talents[85] || ctx.talents[90]) && character.equipment[44] == 0 && ctx.assiPlay == 0 && ctx.params[4] > PALAMLV[4] && character.tflags[899] == 0) {
        ctx.showMessage(`가슴에 달라붙은 ${ctx.getVarName("CALL", PLAYER)}의 머리를, ${ctx.josaHelper("타겟은")} 사랑스럽다는듯이 꽉 껴안았다`);
      }
    } else if (ctx.talents[130] && character.equipment[16] === 0) {
      ctx.showMessage('유방에 달라붙었다');
      ctx.showMessage(`입에 머금은 ${ctx.getVarName("CALL", TARGET)}의 유두에서, 달콤한 밀크가 분출하기 시작한다…`);
    } else if (ctx.params[5] > PALAMLV[3] && character.equipment[16] === 0 && character.equipment[15] === 0) {
      ctx.showMessage('가슴 끝의, 완전히 딱딱해진 돌기를 쥐었다…');
    } else if (ctx.talents[116]) {
      ctx.showMessage('가슴을 더듬었다…');
    } else {
      ctx.showMessage('가슴을 주물렀다…');
    }
  } else if (SELECTCOM === 6) {
    if (character.equipment[89] && character.cflags[42] === 11 && (character.cflags[40] & 64)) {
      ctx.showMessage(`들개는`);
      await print_clothtype_special(ctx, character);
      ctx.showMessage(`%조사만처리(RESULT+2,"를")% 핥고 있다……`);
    } else if (character.cflags[42] === 11 && (character.cflags[40] & 64)) {
      ctx.showMessage(`${ctx.josaHelper("플레이어는")}`);
      await print_clothtype_special(ctx, character);
      ctx.showMessage(`에게 키스했다……`);
    } else if (character.equipment[89]) {
      if (ctx.talents[136] && character.tflags[899] === 0) {
        ctx.showMessage(`${ctx.josaHelper("타겟과")} 들개는 마치 사이 좋은 연인처럼`);
        ctx.showMessage(`할짝할짝 서로의 혀를 빨았다……`);
        if (ctx.talents[85] && character.tflags[899] == 0) {
          ctx.showMessage(`그 모습은 옆에서 보고 있으면 질투를 느낄 정도다……`);
        }
      } else if (ctx.abilities[39] >= 3 && character.tflags[899] === 0) {
        ctx.showMessage(`개가 짐승의 숨결을 내뿜으며, ${ctx.getVarName("CALL", TARGET)}의 구강을 구석구석까지 빨면,`);
        ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}도 혀를 뻗어 개의 입 안을 빨아주었다……`);
      } else {
        ctx.showMessage(`개는 짐승의 숨결을 토하며, ${ctx.getVarName("CALL", TARGET)}의 구강을 구석구석까지 빨았다…`);
      }
    } else {
      ctx.showMessage(`${ctx.josaHelper("플레이어는")} ${ctx.getVarName("CALL", TARGET)}의 구강을 구석구석까지 빨`);
      if (ctx.abilities[10] >= 2 && ctx.exp[40] >= 1000 && ctx.getTalent(player, 122) === 0 && character.tflags[899] === 0) {
        ctx.showMessage(`며, 끈적하게 혀를 섞어 타액을 교환했다…`);
      } else if (ctx.abilities[10] >= 2 && character.tflags[899] === 0) {
        ctx.showMessage(`았다, 그러자 ${ctx.getVarName("CALL", TARGET)}도 적극적으로 혀를 섞어왔다…`);
      } else {
        ctx.showMessage('았다…');
      }
      if (character.cflags[7] & 16) {
        ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 혀 끝에 피어스의 감촉이 느껴진다……`);
      }
    }
  } else if (SELECTCOM === 7) {
    if (ctx.flags[36] === 0) {
      ctx.saveStr[2] = STR[0];
    } else if (character.cflags[6] === 0 - 2) {
      ctx.saveStr[2] = "영구 탈모된";
    } else if (character.cflags[6] === 0 - 1 || character.cflags[6] === 0 || (character.cflags[6] <= 5 && ctx.talents[125])) {
      ctx.saveStr[2] = "털 없는";
    } else if (character.cflags[6] <= 5) {
      ctx.saveStr[2] = "매끈매끈하게 깎은";
    } else if (character.cflags[6] <= 7) {
      ctx.saveStr[2] = "자라기 시작한 음모로 덮인";
    } else if (character.cflags[6] <= 9) {
      ctx.saveStr[2] = "엷은 음모로 덮인";
    } else if (character.cflags[6] <= 12) {
      ctx.saveStr[2] = "음모로 덮인";
    } else if (character.cflags[6] <= 18) {
      ctx.saveStr[2] = "마음껏 자란 음모로 우거진";
    } else if (character.cflags[6] > 18) {
      ctx.saveStr[2] = "애널까지 무성한 음모로 덮인";
    }
    ctx.showMessage(`${ctx.getVarName("CALL", PLAYER)}에게 명령받아, ${ctx.josaHelper("타겟은")}`);
    if (character.equipment[53]) {
      ctx.print('비디오카메라 앞에서');
    }
    if (character.cflags[40] & 8 && ctx.abilities[17] != 0) {
      await print_clothtype_main2(ctx, character);
      ctx.print('의 앞을 크게 젖히고,');
    }
    if (ctx.abilities[17] === 0) {
      if (ctx.talents[22]) {
        ctx.print('무표정한 얼굴로');
      } else if (ctx.talents[10] || ctx.talents[14]) {
        ctx.print('떨면서');
      } else if (ctx.talents[11]) {
        ctx.print('반항적으로 노려봤지만, 재차 명령하니 마지못해하는 모습으로');
      } else if (ctx.talents[12]) {
        ctx.print('굴욕으로 입술을 깨물며');
      } else if (ctx.talents[35]) {
        ctx.print('부끄러움에 귀까지 새빨갛게 되어서');
      }
      if (character.cflags[40] & 8) {
        await print_clothtype_main2(ctx, character);
        ctx.print('의 옷자락을 크게 걷어올리고,');
      }
      ctx.showMessage(`자신의 %SAVESTR:2% 음렬에 손가락을 넣어, 살며시 좌우로 벌려보였다`);
    } else if (ctx.abilities[17] === 1) {
      ctx.showMessage(`얼굴을 새빨갛게 물들이면서도, 흠칫흠칫, %SAVESTR:2% 성기를 분명하게 벌려보였다`);
    } else if (ctx.abilities[17] === 2) {
      ctx.showMessage(`하복부에 손을 대고, 집게와 중지로 싸인을 그리듯이, ${ctx.getVarName("CALL", PLAYER)}에게 %SAVESTR:2% 자신의 비소를 노출했다`);
    } else if (ctx.abilities[17] === 3) {
      ctx.showMessage(`기쁨에 찬 표정으로 한 손으로 %SAVESTR:2% 음순을 벌리고, 빈 손으로`);
      if (ctx.talents[121]) {
        ctx.print('페니스');
      } else {
        ctx.print('음핵');
      }
      ctx.showMessage('을 만지작거리기 시작했다');
    } else if (ctx.abilities[17] === 4) {
      ctx.showMessage(`양손의 손가락을 동시에 사용해 %SAVESTR:2% 음순뿐만이 아니라, 질구도 동시에 벌려보였다`);
    } else if (ctx.abilities[17] >= 5) {
      ctx.showMessage(`양손의 손가락을 %SAVESTR:2% 음순에 대고, 질구까지 ${ctx.getVarName("CALL", PLAYER)}에게 보이도록 크게 벌렸다`);
    }
    if (character.tflags[38] >= 2) {
      ctx.showMessage(`벌려진 질구에서 질내를 채우고 있던 정액이 계속해서 넘쳐흐른다……`);
    } else if (character.tflags[38]) {
      ctx.showMessage(`열린 음순에서 사정한지 얼마 안되는 정액이 흐르기 시작했다……`);
    }
    if (character.cflags[42] === 79 && (character.cflags[40] & 64)) {
      ctx.showMessage(`그리고 ${ctx.getVarName("CALL", TARGET)}의 바기너는 튼튼한 정조대로 확실히 지켜지고 있다`);
    } else {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의`);
      if (ctx.params[3] >= 3000) {
        ctx.showMessage(`애액에 젖어서 요염하게 빛나는`);
      }
      if (character.cflags[608] === 0 && ctx.talents[0] === 1) {
        ctx.showMessage(`바기나는 한 번도 사용된적 없는 핑크색이다`);
      } else if (character.cflags[608] >= 1 && ctx.talents[0] === 1) {
        ctx.showMessage(`거듭된 성행위로 비대해진 라비아는`);
        if (character.cflags[608] === 2) {
          ctx.showMessage(`검게 변색되었다`);
        } else if (character.cflags[608] === 1) {
          ctx.showMessage(`예쁜 핑크색이다`);
        }
      } else if (character.cflags[608] === 0 && ctx.talents[0] === 0) {
        ctx.showMessage(`바기나는 신품처럼 예쁜 핑크색이다`);
        ctx.showMessage(`${ctx.josaHelper("플레이어가")} 첫체험에 대해 묻자 ${ctx.josaHelper("타겟은")}`);
        if (ctx.talents[85] === 0 || ctx.talents[76] === 0) {
          ctx.showMessage(`부끄러워하면서도`);
        }
        ctx.showMessage(``);
        if (character.cflags[15] === 16) {
          ctx.showMessage(`${ctx.josaHelper("플레이어가")} 첫 상대라고 고백했다…`);
          if (ctx.talents[85] === 1) {
            ctx.showMessage(`${ctx.josaHelper("타겟은")} ${ctx.getVarName("CALL", MASTER)}에게 처녀를`);
            ctx.showMessage(`바친 것을 행복해하고 있다`);
          }
        } else if (character.cflags[15] === 2) {
          ctx.showMessage(`${ctx.getVarName("CALL", MASTER)}의 지시로 매춘을 한 이름 모를 남자손님에게`);
          ctx.showMessage(`처녀를 빼앗긴 것을 ${ctx.getVarName("CALL", PLAYER)}에게 고백했다…`);
        } else if (character.cflags[15] === 3) {
          ctx.showMessage(`${ctx.getVarName("CALL", MASTER)}의 지시로 매춘을 한 이름 모를 여자손님에게`);
          ctx.showMessage(`처녀를 빼앗긴 것을 ${ctx.getVarName("CALL", PLAYER)}에게 고백했다…`);
        } else if (character.cflags[15] === 4) {
          ctx.showMessage(`바이브로 처녀를 빼앗긴 것과 그 일에 대한 것을`);
          ctx.showMessage(`${ctx.getVarName("CALL", PLAYER)}에게 고백했다…`);
        } else if (character.cflags[15] === 5) {
          ctx.showMessage(`극태 바이브로 처녀를 빼앗긴 것과 그 일에 대한 것을`);
          ctx.showMessage(`${ctx.getVarName("CALL", PLAYER)}에게 고백했다…`);
        } else if (character.cflags[15] === 6) {
          ctx.showMessage(`${ctx.getVarName("CALL", MASTER)}의 지시로 매춘을 한 이름모를 손님에게`);
          ctx.showMessage(`처녀를 빼앗긴 것을 ${ctx.getVarName("CALL", PLAYER)}에게 고백했다…`);
        } else if (character.cflags[15] === 7) {
          ctx.showMessage(`치한에게 억지로 범해져 처녀를 빼앗긴 것을`);
          ctx.showMessage(`${ctx.getVarName("CALL", PLAYER)}에게 고백했다…`);
        } else if (character.cflags[15] === 8) {
          ctx.showMessage(`%CSTR:0%의 이름과 그 경위를 ${ctx.getVarName("CALL", PLAYER)}에게 고백했다…`);
          if (ctx.talents[85] === 1) {
            ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}은 ${ctx.getVarName("CALL", MASTER)}에게 처녀를`);
            ctx.showMessage(`바치지 못한 것을 죄송스러워 했다`);
          }
        } else if (character.cflags[15] === 11) {
          ctx.showMessage(`불량배에게 억지로 범해져 처녀를 빼앗긴 것을`);
          ctx.showMessage(`${ctx.getVarName("CALL", PLAYER)}에게 고백했다…`);
        } else if (character.cflags[15] === 14) {
          ctx.showMessage(`촉수에게 처녀를 빼앗긴 것을`);
          ctx.showMessage(`${ctx.getVarName("CALL", PLAYER)}에게 고백했다…`);
        } else {
          ctx.showMessage(`%CSTR:0%의 이름과 첫체험에 대해 ${ctx.getVarName("CALL", PLAYER)}에게 고백했다…`);
          if (ctx.talents[85] === 1) {
            ctx.showMessage(`${ctx.josaHelper("타겟은")} ${ctx.getVarName("CALL", MASTER)}에게 처녀를`);
            ctx.showMessage(`바치지 못한 것을 죄송스러워 했다`);
          }
        }
      } else if (character.cflags[608] >= 1 && ctx.exp[0] > 50 && ctx.talents[0] === 0) {
        ctx.showMessage(`거듭된 성행위로 비대해진 라비아는`);
        if (character.cflags[608] === 2) {
          ctx.showMessage(`검게 변색되었으`);
        } else if (character.cflags[608] === 1) {
          ctx.showMessage(`예쁜 핑크색이`);
        }
        ctx.showMessage(`며 몇번이고 페니스에 꿰뚫린 질구도 크게 벌려져 있다`);
        ctx.showMessage(`${ctx.josaHelper("플레이어가")} 첫체험에 대해서 묻자 ${ctx.josaHelper("타겟은")}`);
        if (ctx.talents[85] === 0 || ctx.talents[76] === 0) {
          ctx.showMessage(`부끄러워하면서도`);
        }
        ctx.showMessage(``);
        if (character.cflags[15] === 16) {
          ctx.showMessage(`${ctx.josaHelper("플레이어가")} 첫 상대라고 고백했다…`);
          if (ctx.talents[85] === 1) {
            ctx.showMessage(`${ctx.josaHelper("타겟은")} ${ctx.getVarName("CALL", MASTER)}에게 처녀를`);
            ctx.showMessage(`바친 것을 행복해하고 있다`);
          }
        } else if (character.cflags[15] === 2) {
          ctx.showMessage(`${ctx.getVarName("CALL", MASTER)}의 지시로 매춘을 한 이름 모를 남자손님에게`);
          ctx.showMessage(`처녀를 빼앗긴 것을 ${ctx.getVarName("CALL", PLAYER)}에게 고백했다…`);
        } else if (character.cflags[15] === 3) {
          ctx.showMessage(`${ctx.getVarName("CALL", MASTER)}의 지시로 매춘을 한 이름 모를 여자손님에게`);
          ctx.showMessage(`처녀를 빼앗긴 것을 ${ctx.getVarName("CALL", PLAYER)}에게 고백했다…`);
        } else if (character.cflags[15] === 4) {
          ctx.showMessage(`바이브로 처녀를 빼앗긴 것과 그 일에 대한 것을`);
          ctx.showMessage(`${ctx.getVarName("CALL", PLAYER)}에게 고백했다…`);
        } else if (character.cflags[15] === 5) {
          ctx.showMessage(`극태 바이브로 처녀를 빼앗긴 것과 그 일에 대한 것을`);
          ctx.showMessage(`${ctx.getVarName("CALL", PLAYER)}에게 고백했다…`);
        } else if (character.cflags[15] === 6) {
          ctx.showMessage(`${ctx.getVarName("CALL", MASTER)}의 지시로 매춘을 한 이름 모를 여자손님에게`);
          ctx.showMessage(`처녀를 빼앗긴 것을 ${ctx.getVarName("CALL", PLAYER)}에게 고백했다…`);
        } else if (character.cflags[15] === 7) {
          ctx.showMessage(`치한에게 억지로 범해져 처녀를 빼앗긴 것을`);
          ctx.showMessage(`${ctx.getVarName("CALL", PLAYER)}에게 고백했다…`);
        } else if (character.cflags[15] === 8) {
          ctx.showMessage(`%CSTR:0%의 이름과 그 경위를 ${ctx.getVarName("CALL", PLAYER)}에게 고백했다…`);
          if (ctx.talents[85] === 1) {
            ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}는 ${ctx.getVarName("CALL", MASTER)}에게 처녀를`);
            ctx.showMessage(`바치지 못한 것을 죄송스러워 했다`);
          }
        } else if (character.cflags[15] === 11) {
          ctx.showMessage(`불량배에게 억지로 범해져 처녀를 빼앗긴 것을`);
          ctx.showMessage(`${ctx.getVarName("CALL", PLAYER)}에게 고백했다…`);
        } else if (character.cflags[15] === 14) {
          ctx.showMessage(`촉수에게 처녀를 빼앗긴 것을`);
          ctx.showMessage(`${ctx.getVarName("CALL", PLAYER)}에게 고백했다…`);
        } else {
          ctx.showMessage(`%CSTR:0%의 이름과 그 일에 대한 것을 ${ctx.getVarName("CALL", PLAYER)}에게 고백했다…`);
          if (ctx.talents[85] === 1) {
            ctx.showMessage(`${ctx.josaHelper("타겟은")} ${ctx.getVarName("CALL", MASTER)}에게 처녀를`);
            ctx.showMessage(`바치지 못한 것을 죄송스러워 했다`);
          }
        }
      } else if (character.cflags[608] >= 1 && ctx.exp[0] <= 50 && ctx.talents[0] === 0) {
        ctx.showMessage(`거듭된 성행위로 비대해진 라비아는`);
        if (character.cflags[608] === 2) {
          ctx.showMessage(`검게 변색되었으`);
        } else if (character.cflags[608] === 1) {
          ctx.showMessage(`예쁜 핑크색이`);
        }
        ctx.showMessage(`いる`);
        ctx.showMessage(`${ctx.josaHelper("플레이어가")} 첫체험에 대해서 묻자 ${ctx.josaHelper("타겟은")}`);
        if (ctx.talents[85] === 0 || ctx.talents[76] === 0) {
          ctx.showMessage(`부끄러워하면서도`);
        }
        ctx.showMessage(``);
        if (character.cflags[15] === 16) {
          ctx.showMessage(`${ctx.josaHelper("플레이어가")} 첫 상대라고 고백했다…`);
          if (ctx.talents[85] === 1) {
            ctx.showMessage(`${ctx.josaHelper("타겟은")} ${ctx.getVarName("CALL", MASTER)}에게 처녀를`);
            ctx.showMessage(`바친 것을 행복해하고 있다`);
          }
        } else if (character.cflags[15] === 2) {
          ctx.showMessage(`${ctx.getVarName("CALL", MASTER)}의 지시로 매춘을 한 이름 모를 남자손님에게`);
          ctx.showMessage(`처녀를 빼앗긴 것을 ${ctx.getVarName("CALL", PLAYER)}에게 고백했다…`);
        } else if (character.cflags[15] === 3) {
          ctx.showMessage(`${ctx.getVarName("CALL", MASTER)}의 지시로 매춘을 한 이름 모를 여자손님에게`);
          ctx.showMessage(`처녀를 빼앗긴 것을 ${ctx.getVarName("CALL", PLAYER)}에게 고백했다…`);
        } else if (character.cflags[15] === 4) {
          ctx.showMessage(`바이브로 처녀를 빼앗긴 것과 그 일에 대한 것을`);
          ctx.showMessage(`${ctx.getVarName("CALL", PLAYER)}에게 고백했다…`);
        } else if (character.cflags[15] === 5) {
          ctx.showMessage(`극태 바이브로 처녀를 빼앗긴 것과 그 일에 대한 것을`);
          ctx.showMessage(`${ctx.getVarName("CALL", PLAYER)}에게 고백했다…`);
        } else if (character.cflags[15] === 6) {
          ctx.showMessage(`${ctx.getVarName("CALL", MASTER)}의 지시로 매춘을 한 이름 모를 여자손님에게`);
          ctx.showMessage(`처녀를 빼앗긴 것을 ${ctx.getVarName("CALL", PLAYER)}에게 고백했다…`);
        } else if (character.cflags[15] === 7) {
          ctx.showMessage(`치한에게 억지로 범해져 처녀를 빼앗긴 것을`);
          ctx.showMessage(`${ctx.getVarName("CALL", PLAYER)}에게 고백했다…`);
        } else if (character.cflags[15] === 8) {
          ctx.showMessage(`%CSTR:0%의 이름과 그 경위를 ${ctx.getVarName("CALL", PLAYER)}에게 고백했다…`);
          if (ctx.talents[85] === 1) {
            ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}는 ${ctx.getVarName("CALL", MASTER)}에게 처녀를`);
            ctx.showMessage(`바치지 못한 것을 죄송스러워 했다`);
          }
        } else if (character.cflags[15] === 11) {
          ctx.showMessage(`불량배에게 억지로 범해져 처녀를 빼앗긴 것을`);
          ctx.showMessage(`${ctx.getVarName("CALL", PLAYER)}에게 고백했다…`);
        } else if (character.cflags[15] === 14) {
          ctx.showMessage(`촉수에게 처녀를 빼앗긴 것을`);
          ctx.showMessage(`${ctx.getVarName("CALL", PLAYER)}에게 고백했다…`);
        } else {
          ctx.showMessage(`%CSTR:0%의 이름과 그 일에 대한 것을 ${ctx.getVarName("CALL", PLAYER)}에게 고백했다…`);
          if (ctx.talents[85] === 1) {
            ctx.showMessage(`${ctx.josaHelper("타겟은")} ${ctx.getVarName("CALL", MASTER)}에게 처녀를`);
            ctx.showMessage(`바치지 못한 것을 죄송스러워 했다`);
          }
        }
      }
    }
    if (character.cflags[7] & 8 || character.cflags[7] & 4) {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의`);
    }
    if (character.cflags[7] & 8) {
      if (ctx.params[5] >= PALAMLV[4]) {
        ctx.print('발기한');
      }
      if (ctx.talents[121]) {
        ctx.print('페니스');
      } else {
        ctx.print('클리토리스');
      }
      if (character.cflags[7] & 4) {
        ctx.print('와');
      }
    }
    if (character.cflags[7] & 4) {
      ctx.print('좌우의 음순');
    }
    if (character.cflags[7] & 8 || character.cflags[7] & 4) {
      ctx.showMessage('에서는, 부드러운 살을 뚫고 금속제의 피어스가 빛나고 있다……');
    }
    ctx.saveStr[2] = STR[0];
  } else if (SELECTCOM === 8) {
    ctx.showMessage(`${ctx.josaHelper("플레이어는")}, ${ctx.getVarName("CALL", TARGET)}의`);
    if (character.cflags[40] & 8 && ctx.abilities[17] != 0) {
      await print_clothtype_main2(ctx, character);
      ctx.print('의 옷자락을 걷어올리고,');
    }
    if (ctx.exp[0] === 0) {
      ctx.print('남자를 모르는');
    } else if (ctx.params[3] >= PALAMLV[4]) {
      ctx.print('젖어있는');
    }
    if (ctx.talents[132]) {
      ctx.print('어린 균열');
    } else {
      ctx.print('비렬');
    }
    if (character.equipment[11]) {
      ctx.showMessage(` 안에서, 요염하게 꾸물거리는 바이브를 앞뒤로 움직였다`);
    } else {
      ctx.showMessage(`에 자신의 손가락을`);
      if (PREVCOM === 8 && ctx.abilities[ctx.player][12] >= 3) {
        ctx.showMessage(`삽입하고 상냥하게 움직이고 있다…`);
      } else {
        ctx.showMessage(`천천히 삽입했다…`);
      }
    }
    if (character.equipment[11] && PREVCOM === 8 && ctx.abilities[ctx.player][12] >= 3) {
      ctx.showMessage(`${ctx.josaHelper("플레이어는")} 교묘하게 바이브를 조종해, 민감한 천장을 꾹 눌렀다…`);
    } else if (PREVCOM === 8 && ctx.abilities[ctx.player][12] >= 3) {
      ctx.showMessage(`${ctx.josaHelper("플레이어는")} ${ctx.getVarName("CALL", TARGET)}의 질 안에서 손가락을 굽혀, 부풀어있는 천장을 자극했다…`);
    } else if (character.equipment[11] && ctx.params[5] >= PALAMLV[3] && ctx.abilities[2] >= 2) {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 질은, 꿀에 젖어 바이브를 끈적끈적 휘감고 있다…`);
    } else if (character.equipment[11] && ctx.params[5] <= PALAMLV[3] && ctx.abilities[2] >= 2) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 바이브의 자극에 괴로워하고 있다…`);
    } else if (character.equipment[11] && ctx.params[5] >= PALAMLV[3] && ctx.abilities[2] <= 3) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 뺨을 붉히고 때때로 소리를 높이고 있다…`);
    } else if (character.equipment[11] && ctx.params[5] <= PALAMLV[3] && ctx.abilities[2] <= 3) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 조금 괴로운듯한 표정을 하고 있다…`);
    } else if (ctx.exp[0] <= 1) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 질내의 이물감을 무서워하고 있다…`);
    } else if (ctx.exp[0] >= 1 && ctx.exp[0] <= 30) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 손가락의 감촉을 한숨을 내쉬며 참고 있다…`);
    } else if (ctx.exp[0] >= 31 && ctx.exp[0] <= 50) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 손가락의 감촉을 즐기고 있는 것 같다…`);
    } else if (ctx.exp[0] >= 51 && ctx.exp[0] <= 80) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 손가락이 움직이는 감촉에 넋을 잃고 있다…`);
    } else if (ctx.exp[0] >= 81 && ctx.exp[0] <= 120) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 배안을 휘저어지는 감각에 뜨거운 숨길을 토해내고 있다…`);
    } else if (ctx.exp[0] >= 121) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 침을 늘어뜨리고, 스스로 허리를 흔들며 쾌락을 탐내고 있다…`);
    }
  } else if (SELECTCOM === 9) {
    if (character.equipment[89]) {
      ctx.showMessage(`개는 뜨거운 숨을 내뿜으며,`);
    } else {
      ctx.showMessage(`${ctx.josaHelper("플레이어는")}`);
    }
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의`);
    if (ctx.exp[1] <= 10) {
      ctx.print('단단히 닫혀있는');
    }
    ctx.print('아누스를 상냥하게 핥아 풀어주');
    if (ctx.exp[1] >= 50 && ctx.params[5] >= PALAMLV[3]) {
      ctx.print('고, 혀 끝을 넣어 구멍 안까지 휘저');
    }
    ctx.showMessage('었다…');
  } else if (SELECTCOM === 10) {
    ctx.showMessage(`${ctx.josaHelper("플레이어는")} ${ctx.getVarName("CALL", TARGET)}의`);
    if (ctx.talents[122] && ctx.params[5] >= PALAMLV[3]) {
      ctx.showMessage('발기한 페니스에 진동하는 로터를 꽉 눌렀다…');
    } else if (ctx.talents[122]) {
      ctx.showMessage('페니스에 진동하는 로터를 꽉 눌렀다…');
    } else if (ctx.talents[121] && ctx.params[5] >= PALAMLV[3]) {
      ctx.showMessage('질퍽거리는 음순에 진동하는 로터를 꽉 눌렀다…');
    } else if (ctx.talents[121]) {
      ctx.showMessage('음순에 진동하는 로터를 꽉 눌렀다…');
    } else if (ctx.params[5] >= PALAMLV[3]) {
      ctx.showMessage('단단하게 솟아오른 클리토리스에 진동하는 로터를 꽉 눌렀다…');
    } else {
      ctx.showMessage('클리토리스에 진동하는 로터를 꽉 눌렀다…');
    }
  } else if (SELECTCOM === 11) {
    if (character.equipment[11]) {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}에게서 꿈틀거리는`);
      if (ctx.talents[76] == 1) {
        ctx.showMessage(`극태`);
      }
      ctx.showMessage(`바이브를 천천히 뽑아냈다`);
      if (character.tflags[899] === 0) {
        if (ctx.exp[0] >= 201 && ctx.talents[85]) {
          ctx.showMessage(`${ctx.josaHelper("타겟은")} 질내의 상실감을 견디기 힘든듯`);
          if (ctx.talents[45] == 0 && ctx.talents[310] == 0) {
            ctx.showMessage(`눈물과`);
          }
          ctx.showMessage(`침을 흘리`);
        } else if (ctx.exp[0] >= 151 && ctx.exp[0] <= 200 && ctx.talents[85]) {
          ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 질내에 모여있던 점액이 긁어내져 방울방울 떨어져, 웅덩이를 만들`);
        } else if (ctx.exp[0] >= 121 && ctx.exp[0] <= 150 && ctx.talents[85]) {
          ctx.showMessage(`바이브가 뽑힌 ${ctx.getVarName("CALL", TARGET)}의 질벽에서는 뚝뚝하고 애액이 방울져 떨어지`);
        } else if (ctx.exp[0] >= 71 && ctx.exp[0] <= 120 && ctx.talents[85]) {
          ctx.showMessage(`${ctx.josaHelper("타겟은")} 우물쭈물하며 사타구니를 문지르며 ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.player), "를")} 보`);
        } else if (ctx.exp[0] >= 41 && ctx.exp[0] <= 70 && ctx.talents[85]) {
          ctx.showMessage(`${ctx.josaHelper("타겟은")} 뜨거운 한숨을 토해내`);
        } else if (ctx.exp[0] >= 21) {
          ctx.showMessage(`${ctx.josaHelper("타겟은")} 느슨해진 질구를 벌리`);
        } else if (ctx.exp[0] >= 1 && ctx.exp[0] <= 20) {
          ctx.showMessage(`${ctx.josaHelper("타겟은")} 안심한듯한 표정을 하`);
        }
        ctx.showMessage('고 있다…');
      }
    } else {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의`);
      if (ctx.params[3] >= PALAMLV[5]) {
        ctx.print('충분히');
      }
      if (ctx.params[3] >= PALAMLV[3]) {
        ctx.print('젖은');
      }
      if (ctx.talents[132]) {
        ctx.print('어린 균열에');
      } else {
        ctx.print('비렬에');
      }
      if (ctx.talents[76] == 1) {
        ctx.showMessage(`극태`);
      }
      ctx.showMessage('바이브 끝을 천천히 밀어넣었다…');
      if (character.tflags[899] === 0) {
        ctx.showMessage(`${ctx.josaHelper("타겟은")}`);
        if (ctx.talents[0] && ctx.talents[85] && ctx.talents[76]) {
          ctx.print('자신이 처녀인 것도 잊은듯이 미소를 띄우고');
        } else if (ctx.talents[0] && ctx.talents[85]) {
          ctx.showMessage(`${ctx.getVarName("CALL", PLAYER)}에게 안타까운 시선을 보내고`);
        } else if (ctx.talents[0] && ctx.talents[76]) {
          ctx.print('처녀인 것도 상관없이, 허리를 흔들며 조르고');
        } else if (ctx.talents[0] && ctx.talents[27]) {
          ctx.print('뭔가를 단념한듯한 표정을 짓고');
          if (ctx.talents[45] == 0 && ctx.talents[310] == 0) {
            ctx.print('눈에는 희미하게 눈물을 띄우고');
          }
        } else if (ctx.talents[0]) {
          ctx.print('덜덜 떨며, 상실의 공포를 무서워하고');
        } else if (ctx.exp[0] >= 201 && ctx.talents[85]) {
          ctx.print('삽입에 대한 기대감만으로 허리를 떨며 가버릴 것처럼 되어');
        } else if (ctx.exp[0] >= 151 && ctx.exp[0] <= 200 && ctx.talents[85]) {
          ctx.showMessage(`녹을듯한 눈으로 ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.player), "를")} 응시하며, 스스로 음순을 벌리고`);
        } else if (ctx.exp[0] >= 121 && ctx.exp[0] <= 150 && ctx.talents[85]) {
          ctx.print('황홀한 표정으로 기다릴 수 없다는 듯 허리를 흔들고');
        } else if (ctx.exp[0] >= 71 && ctx.exp[0] <= 120 && ctx.talents[85]) {
          ctx.showMessage(`굉장히 갖고 싶다는듯이 눈물을 글썽이며 ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.player), "를")} 보고`);
        } else if (ctx.exp[0] >= 41 && ctx.exp[0] <= 70 && ctx.talents[85]) {
          ctx.print('바이브가 스치는 감촉에 완전히 황홀한 한숨을 흘리고');
        } else if (ctx.exp[0] >= 1 && ctx.exp[0] <= 40 && ctx.talents[85]) {
          ctx.print('바이브가 스치는 감촉에 애타는듯이 애액을 흘리고');
        } else {
          ctx.print('바이브가 스치는 감촉에 질주름을 움찔거리고');
        }
        ctx.showMessage('있다…');
      }
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의`);
      if (ctx.params[3] >= PALAMLV[4]) {
        ctx.print('젖어있는');
      }
      ctx.showMessage(`성기에 바이브를 삽입했다`);
    }
  } else if (SELECTCOM === 12) {
    ctx.showMessage(`${ctx.josaHelper("플레이어는")} ${ctx.getVarName("CALL", TARGET)}의 비소에 진동하고 있는 전동마사지기를 꽉 눌렀다…`);
    if (character.tflags[899] === 0) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")}`);
      if (ctx.abilities[0] <= 2 && ctx.params[5] >= PALAMLV[0] && ctx.params[5] <= PALAMLV[3]) {
        ctx.print('굉장히 간지러운 듯하다');
      } else if (ctx.abilities[0] <= 2 && ctx.params[5] >= PALAMLV[3]) {
        ctx.print('아무 말도 못하고 있다');
      } else if (ctx.talents[85] && ctx.abilities[0] >= 4 && ctx.params[5] >= PALAMLV[0] && ctx.params[5] <= PALAMLV[3]) {
        ctx.print('애타게 기다린 것처럼 다리를 벌리고, 받아들이고 있는 것 같다');
      } else if (ctx.talents[85] && ctx.abilities[0] >= 4 && ctx.params[5] >= PALAMLV[3] && ctx.params[5] <= PALAMLV[5]) {
        ctx.showMessage(`쾌락에 침을 흘리며, 몇번이나 ${ctx.getVarName("CALL", PLAYER)}의 이름을 불렀다`);
      } else if (ctx.talents[85] && ctx.abilities[0] >= 4 && ctx.params[5] >= PALAMLV[5]) {
        ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.player), "를")} 끌어안고 절정의 황홀감에 잠겨있는 것 같다`);
      } else if (ctx.abilities[0] >= 3 && ctx.params[5] >= PALAMLV[0] && ctx.params[5] <= PALAMLV[3]) {
        ctx.print('강한 쾌감에 얼굴을 붉히고 있는 것 같다');
      } else if (ctx.abilities[0] >= 3 && ctx.params[5] >= PALAMLV[3] && ctx.params[5] <= PALAMLV[5]) {
        ctx.print('정신이 나간듯한 눈으로 쾌락을 탐내고 있는 것 같다');
      } else if (ctx.abilities[0] >= 3 && ctx.params[5] >= PALAMLV[5]) {
        ctx.print('당장이라도 절정에 달할 것 같은 모습이다');
      }
      ctx.showMessage('…');
    }
  } else if (SELECTCOM === 13) {
    if (character.equipment[13]) {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 아누스에서 애널바이브를 뽑았다.`);
      if (character.tflags[899] === 0) {
        ctx.showMessage(`${ctx.josaHelper("타겟은")}`);
        if (ctx.exp[1] >= 180) {
          ctx.print('음순과 입에서 침을 흘리면서, 엉덩이를 벌리고 있다');
        } else if (ctx.exp[1] >= 141 && ctx.exp[1] <= 179) {
          ctx.print('젖어있는 눈동자로 애원하듯이 엉덩이를 흔들었다');
        } else if (ctx.exp[1] >= 101 && ctx.exp[1] <= 140) {
          ctx.print('아직 부족하다는듯이 엉덩이를 쓱 내밀었다');
        } else if (ctx.exp[1] <= 20) {
          ctx.print('자극을 괴로운듯한 표정으로 참고 있다');
        } else if (ctx.exp[1] >= 21 && ctx.exp[1] <= 40) {
          ctx.print('강제적인 배설감에 얼굴을 찡그렸다');
        } else if (ctx.exp[1] >= 41 && ctx.exp[1] <= 75) {
          ctx.print('엉덩이를 우물쭈물 흔들면서도, 어딘지 안심한듯한 표정을 지었다');
        } else if (ctx.exp[1] >= 76 && ctx.exp[1] <= 100) {
          ctx.print('조금 아쉬운듯이 엉덩이를 흔들었다');
        }
        ctx.showMessage(`…`);
      }
    } else {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 국혈에 애널바이브를 가져다댔다…`);
      if (character.tflags[899] === 0) {
        ctx.showMessage(`${ctx.josaHelper("타겟은")}`);
        if (ctx.exp[1] >= 180) {
          ctx.print('녹아버린 표정으로, 스스로의 엉덩이를 벌리고');
        } else if (ctx.exp[1] >= 141 && ctx.exp[1] <= 179) {
          ctx.print('삽입을 애타게 기다리는듯이 허리를 흔들고');
        } else if (ctx.exp[1] >= 101 && ctx.exp[1] <= 140) {
          ctx.print('뺨을 붉히고, 기대감으로 엉덩이를 흔들고');
        } else if (ctx.exp[1] <= 20) {
          ctx.print('부저한 구멍을 범해지는 치욕과 굴욕감으로 얼룩진 얼굴을 하고');
        } else if (ctx.exp[1] >= 21 && ctx.exp[1] <= 40) {
          ctx.print('수치심으로 물든 얼굴을 숙이고');
        } else if (ctx.exp[1] >= 41 && ctx.exp[1] <= 75) {
          ctx.print('기대와 불안이 섞인듯한 복잡한 표정을 하고');
        } else if (ctx.exp[1] >= 76 && ctx.exp[1] <= 100) {
          ctx.print('바이브의 자극에 몸을 떨고');
        }
        ctx.showMessage(` 있다…`);
      }
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의`);
      if (ctx.params[3] >= PALAMLV[4]) {
        ctx.print('점액투성이의');
      }
      ctx.showMessage(`아누스에 바이브를 삽입했다`);
    }
  } else if (SELECTCOM === 14) {
    if (character.equipment[14]) {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}에게서 전동 클리캡을 떼어냈다`);
    } else {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 음핵에 전동 클리캡을 부착했다`);
    }
  } else if (SELECTCOM === 15) {
    if (character.equipment[15]) {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}에게서 클립 로터를 떼어냈다`);
    } else {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 유두에 클립 로터를 붙였다`);
    }
  } else if (SELECTCOM === 16) {
    if (character.equipment[16]) {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}에게서 착유기를 떼어냈다`);
    } else {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}에게 착유기를 부착했다`);
    }
  } else if (SELECTCOM === 17) {
    if (character.equipment[17]) {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}에게서 오나홀을 뗐다`);
    } else {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 페니스를 오나홀에 삽입했다`);
    }
  } else if (SELECTCOM === 18) {
    if (character.equipment[18]) {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}에게 샤워를 그만두게했다`);
    } else {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}에게 샤워하게 했다`);
    }
  } else if (SELECTCOM === 19) {
    if (character.equipment[19]) {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 아누스에서 애널비즈를 힘차게 뽑아냈다…`);
    } else {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 국혈에 애널비즈를 천천히 집어넣었다…`);
    }
  } else if (SELECTCOM === 20) {
    ctx.showMessage(`${ctx.josaHelper("플레이어는")}`);
    if (character.tflags[60] && PREVCOM === 20 && ((ctx.assiPlay && character.tflags[50]) || (ctx.assiPlay === 0 && character.tflags[50] === 0))) {
      if (ctx.getTalent(player, 121) || ctx.getTalent(player, 122)) {
        ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 질내의 감촉을 맛보면서, 다시 허리를 움직이기 시작했다…`);
      } else {
        ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 질내에서 뽑지 않고, 다시 허리를 움직이기 시작했다…`);
      }
      if (character.tflags[31]) {
        character.tflags[31] = 2;
      }
    } else if (character.tflags[60] && (PREVCOM === 21 || PREVCOM === 22 || PREVCOM === 23 || PREVCOM === 34 || PREVCOM === 131 || PREVCOM === 132 || PREVCOM === 133 || PREVCOM === 134) && ((ctx.assiPlay && character.tflags[50]) || (ctx.assiPlay === 0 && character.tflags[50] === 0))) {
      ctx.showMessage(`질내에서 빼지 않고 ${ctx.josaHelper("타겟을")} 위를 향해 눕히고, 다시 허리를 움직이기 시작했다…`);
      if (character.tflags[31]) {
        character.tflags[31] = 2;
      }
    } else {
      if (ctx.getTalent(player, 121) == 0 && ctx.getTalent(player, 122) == 0) {
        ctx.showMessage(`스스로의 허리에 장착한 페니스밴드로`);
      }
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의`);
      if (ctx.exp[0] == 0) {
        ctx.print('남자를 모르는');
      }
      if (ctx.params[3] >= PALAMLV[4]) {
        ctx.print('젖어있는');
      }
      if (ctx.talents[132]) {
        ctx.print('어린 균열을');
      } else {
        ctx.print('비렬을');
      }
      ctx.showMessage('꿰뚫었다…');
    }
  } else if (SELECTCOM === 21) {
    if (character.tflags[60] && PREVCOM === 21 && character.equipment[89]) {
      ctx.showMessage(`개는 ${ctx.getVarName("CALL", TARGET)}의 둔부에 자신의 하반신을 밀착시키고, 계속 허리를 흔들고 있다……`);
      if (ctx.abilities[39] >= 3 && ctx.params[5] > PALAMLV[4]) {
        ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}도 개의 움직임에 맞춰 허리를 흔들고 있다`);
      }
      if (character.tflags[31]) {
        character.tflags[31] = 2;
      }
    } else if (character.equipment[89]) {
      ctx.showMessage(`${ctx.josaHelper("플레이어가")} 신호하자, 들개는 ${ctx.getVarName("CALL", TARGET)}의 몸을 뒤에서부터 덮쳐,`);
      if (ctx.exp[0] == 0) {
        ctx.print('남자를 모르는');
      }
      if (ctx.params[3] >= PALAMLV[4]) {
        ctx.print('젖어있는');
      }
      if (ctx.talents[132]) {
        ctx.print('어린 균열');
      } else {
        ctx.print('비렬');
      }
      ctx.showMessage(`의 가장 깊은 곳까지, 뿌리까지 붉게 부푼 개의 페니스를 찔러넣었다…`);
    } else if (character.tflags[60] && PREVCOM === 21 && ((ctx.assiPlay && character.tflags[50]) || (ctx.assiPlay === 0 && character.tflags[50] === 0))) {
      if (ctx.getTalent(player, 119) || ctx.getTalent(player, 121) || ctx.getTalent(player, 122)) {
        ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 질내의 감촉을 맛보면서, 다시 허리를 움직이기 시작했다…`);
      } else {
        ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 질내에서 뽑지 않고, 다시 허리를 움직이기 시작했다…`);
      }
      if (character.tflags[31]) {
        character.tflags[31] = 2;
      }
    } else if (character.tflags[60] && (PREVCOM === 20 || PREVCOM === 22 || PREVCOM === 23 || PREVCOM === 34) && ((ctx.assiPlay && character.tflags[50]) || (ctx.assiPlay === 0 && character.tflags[50] === 0))) {
      ctx.showMessage(`질내에서 빼지 않고 ${ctx.getVarName("CALL", TARGET)}의 뒤로 돌아서, 다시 허리를 움직이기 시작했다…`);
      if (character.tflags[31]) {
        character.tflags[31] = 2;
      }
    } else {
      ctx.showMessage(`${ctx.josaHelper("플레이어는")}, 뒤에서 ${ctx.getVarName("CALL", TARGET)}의`);
      if (ctx.exp[0] == 0) {
        ctx.print('남자를 모르는');
      }
      if (ctx.params[3] >= PALAMLV[4]) {
        ctx.print('젖어있는');
      }
      if (ctx.talents[132]) {
        ctx.print('어린 균열');
      } else {
        ctx.print('비렬');
      }
      ctx.showMessage(`의 깊숙한 곳까지`);
      if (ctx.getTalent(player, 121) || ctx.getTalent(player, 122)) {
        ctx.print('딱딱하게 발기한 음경을');
      } else {
        ctx.print('허리에 고정한 페니스밴드를');
      }
      ctx.showMessage(`찔러넣었다…`);
    }
  } else if (SELECTCOM === 22) {
    ctx.showMessage(`${ctx.josaHelper("플레이어는")}`);
    if (character.tflags[60] && PREVCOM === 22 && ((ctx.assiPlay && character.tflags[50]) || (ctx.assiPlay === 0 && character.tflags[50] === 0))) {
      ctx.showMessage(`${ctx.josaHelper("타겟과")} 키스하며, 혀를 섞으면서 다시 허리를 움직이기 시작했다…`);
    } else if (character.tflags[60] && (PREVCOM === 20 || PREVCOM === 34) && ((ctx.assiPlay && character.tflags[50]) || (ctx.assiPlay === 0 && character.tflags[50] === 0))) {
      ctx.showMessage(`질내에서 페니스를 빼지않고 ${ctx.getVarName("CALL", TARGET)}의 몸을 꽉 껴안고, 허리를 흔들기 시작했다…`);
    } else {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 몸을 안아올려, 천천히 내리면서`);
      if (ctx.params[3] >= PALAMLV[4]) {
        ctx.print('젖어있는');
      }
      if (ctx.talents[132]) {
        ctx.print('어린 균열');
      } else {
        ctx.print('비렬');
      }
      ctx.showMessage(`에 삽입했다…`);
    }
  } else if (SELECTCOM === 23) {
    ctx.showMessage(`${ctx.josaHelper("플레이어는")}`);
    if (character.equipment[57] && character.tflags[60] && PREVCOM === 23 && ((ctx.assiPlay && character.tflags[50]) || (ctx.assiPlay === 0 && character.tflags[50] === 0))) {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 결합부와 가슴에 다시 손을 대어, 잘 보이도록 허리를 움직였다…`);
    } else if (character.equipment[57] && character.tflags[60] && (PREVCOM === 21 || PREVCOM === 34) && ((ctx.assiPlay && character.tflags[50]) || (ctx.assiPlay === 0 && character.tflags[50] === 0))) {
      ctx.showMessage(`질내에서 페니스를 빼지않고 ${ctx.getVarName("CALL", TARGET)}의 몸을 등 뒤에서 껴안고, 다리를 활짝 벌리게 했다…`);
    } else if (character.tflags[60] && PREVCOM === 23 && ((ctx.assiPlay && character.tflags[50]) || (ctx.assiPlay === 0 && character.tflags[50] === 0))) {
      ctx.showMessage(`${ctx.josaHelper("타겟을")} 등 뒤에서 꽉 껴안고, 다시 ${ctx.getVarName("CALL", TARGET)}의 몸을 흔들기 시작했다…`);
    } else if (character.tflags[60] && (PREVCOM === 21 || PREVCOM === 34) && ((ctx.assiPlay && character.tflags[50]) || (ctx.assiPlay === 0 && character.tflags[50] === 0))) {
      ctx.showMessage(`질내에서 페니스를 빼지않고 ${ctx.getVarName("CALL", TARGET)}의 몸을 등 뒤에서 껴안고, 몸을 흔들기 시작했다…`);
    } else if (character.equipment[57]) {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 몸을 안아올려, 천천히`);
      if (ctx.params[3] >= PALAMLV[4]) {
        ctx.print('젖어있는');
      }
      if (ctx.talents[132]) {
        ctx.print('어린 균열');
      } else {
        ctx.print('비렬');
      }
      ctx.showMessage(`에 삽입하며, 다리를 활짝 벌리게했다…`);
    } else {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 몸을 안아올려,`);
      if (ctx.params[3] >= PALAMLV[4]) {
        ctx.print('젖어있는');
      }
      if (ctx.talents[132]) {
        ctx.print('어린 균열');
      } else {
        ctx.print('비렬');
      }
      ctx.showMessage(`을 준비만전인 물건으로 천천히 관철했다…`);
    }
    if (character.equipment[57]) {
      if (ctx.abilities[17] >= 5) {
        ctx.showMessage(`${ctx.josaHelper("타겟은")} 거울에 비치는 치태를 녹은 눈으로 응시하며 환희의 목소리를 내고 있다…`);
      } else if (ctx.abilities[17] >= 3) {
        ctx.showMessage(`${ctx.josaHelper("타겟은")} 수치와 쾌락에 빠진듯한 표정으로 거울속의 치태를 응시하고 있다…`);
      } else if (ctx.abilities[17] >= 1) {
        ctx.showMessage(`${ctx.josaHelper("타겟은")} 얼굴을 수치로 물들이면서 때때로 음란한 소리를 내고 있다…`);
      } else {
        ctx.showMessage(`${ctx.josaHelper("타겟은")} 손으로 얼굴을 가리고 수치심에 몸을 떨고 있다…`);
      }
    }
  } else if (SELECTCOM === 26) {
    ctx.showMessage(`${ctx.josaHelper("플레이어는")}`);
    if (character.tflags[60] && PREVCOM === 26 && ((ctx.assiPlay && character.tflags[50]) || (ctx.assiPlay === 0 && character.tflags[50] === 0))) {
      if (ctx.getTalent(player, 121) || ctx.getTalent(player, 122)) {
        ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 국혈의 감촉을 맛보면서 다시 허리를 움직이기 시작했다…`);
      } else {
        ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 장내에서 뽑지않고, 다시 허리를 움직이기 시작했다…`);
      }
    } else if (character.tflags[60] && (PREVCOM === 27 || PREVCOM === 28 || PREVCOM === 36) && ((ctx.assiPlay && character.tflags[50]) || (ctx.assiPlay === 0 && character.tflags[50] === 0))) {
      ctx.showMessage(`장내에서 빼내지 않고 ${ctx.josaHelper("타겟을")} 위를 향해 눕히고, 다시 허리를 움직이기 시작했다…`);
    } else {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의`);
      if (ctx.params[3] >= PALAMLV[4]) {
        ctx.print('점액 투성이의');
      }
      ctx.showMessage('아누스를 관철했다…');
    }
  } else if (SELECTCOM === 27) {
    if (character.equipment[89] == 0) {
      ctx.showMessage(`${ctx.josaHelper("플레이어는")}`);
    }
    if (character.tflags[60] && PREVCOM === 27 && ((ctx.assiPlay && character.tflags[50]) || (ctx.assiPlay === 0 && character.tflags[50] === 0))) {
      if (character.equipment[89]) {
        ctx.showMessage(`개는 ${ctx.getVarName("CALL", TARGET)}의 둔부에 자신의 하반신을 밀착시키고, 허리를 계속 흔들고 있다……`);
        if (ctx.exp[56] >= 200 && ctx.params[5] > PALAMLV[4]) {
          ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}도 개의 움직임에 맞춰 허리를 흔들고 있다`);
        }
      } else if (ctx.getTalent(player, 121) || ctx.getTalent(player, 122)) {
        ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 아누스의 감촉을 맛보면서 다시 허리를 움직이기 시작했다…`);
      } else {
        ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 장내에서 뽑지않고, 다시 허리를 움직이기 시작했다…`);
      }
      if (character.tflags[31]) {
        character.tflags[31] = 2;
      }
    } else if (character.tflags[60] && (PREVCOM === 26 || PREVCOM === 29 || PREVCOM === 36) && ((ctx.assiPlay && character.tflags[50]) || (ctx.assiPlay === 0 && character.tflags[50] === 0))) {
      ctx.showMessage(`장내에서 빼내지 않고 ${ctx.getVarName("CALL", TARGET)}의 뒤로 돌아, 다시 허리를 움직이기 시작했다…`);
      if (character.tflags[31]) {
        character.tflags[31] = 2;
      }
    } else {
      if (character.equipment[89]) {
        ctx.print('발정난 개가, 그 페니스를');
      }
      ctx.showMessage(`등뒤에서 ${ctx.getVarName("CALL", TARGET)}의`);
      if (ctx.abilities[3] >= 3) {
        ctx.print('충분히 개발된');
      }
      if (ctx.params[3] >= PALAMLV[4]) {
        ctx.print('점액 투성이의');
      }
      ctx.showMessage(`애널에 뿌리까지 삽입했다…`);
    }
  } else if (SELECTCOM === 28) {
    ctx.showMessage(`${ctx.josaHelper("플레이어는")}`);
    if (character.tflags[60] && PREVCOM === 28 && ((ctx.assiPlay && character.tflags[50]) || (ctx.assiPlay === 0 && character.tflags[50] === 0))) {
      ctx.showMessage(`${ctx.josaHelper("타겟과")} 키스하며, 혀를 섞으면서 다시 허리를 움직이기 시작했다…`);
    } else if (character.tflags[60] && (PREVCOM === 26 || PREVCOM === 36) && ((ctx.assiPlay && character.tflags[50]) || (ctx.assiPlay === 0 && character.tflags[50] === 0))) {
      ctx.showMessage(`장내에서 페니스를 빼지않고 ${ctx.getVarName("CALL", TARGET)}의 몸을 꽉 껴안고, 허리를 흔들기 시작했다…`);
    } else {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 몸을 안아올려, 천천히 내리면서`);
      if (ctx.params[3] >= PALAMLV[4]) {
        ctx.print('점액 투성이의');
      }
      ctx.showMessage(`아누스에 삽입했다…`);
    }
  } else if (SELECTCOM === 29) {
    ctx.showMessage(`${ctx.josaHelper("플레이어는")}`);
    if (character.tflags[60] && PREVCOM === 29 && ((ctx.assiPlay && character.tflags[50]) || (ctx.assiPlay === 0 && character.tflags[50] === 0))) {
      ctx.showMessage(`${ctx.josaHelper("타겟을")} 등뒤에서 꽉 껴안고, 다시 ${ctx.getVarName("CALL", TARGET)}의 몸을 흔들기 시작했다…`);
    } else if (character.tflags[60] && (PREVCOM === 27 || PREVCOM === 36) && ((ctx.assiPlay && character.tflags[50]) || (ctx.assiPlay === 0 && character.tflags[50] === 0))) {
      ctx.showMessage(`장내에서 페니스를 빼지않고 ${ctx.getVarName("CALL", TARGET)}의 몸을 등 뒤에서 껴안고, 몸을 흔들기 시작했다…`);
    } else {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 몸을 안아올리고,`);
      if (ctx.params[3] >= PALAMLV[4]) {
        ctx.print('점액 투성이가 된');
      }
      ctx.showMessage(`아누스를 준비만전의 물건으로 천천히 관철했다…`);
    }
  } else if (SELECTCOM === 30) {
    ctx.showMessage(`${ctx.josaHelper("타겟은")}`);
    if (ctx.talents[85] && ctx.assiPlay == 0 && character.equipment[89] == 0) {
      ctx.print('사랑스러운 듯이');
    }
    if (ctx.talents[76]) {
      ctx.print('스스로');
    }
    if (character.equipment[89]) {
      ctx.showMessage(`개의`);
    } else {
      ctx.showMessage(`${ctx.getVarName("CALL", PLAYER)}의`);
    }
    ctx.showMessage(`페니스를`);
    if (character.cflags[42] === 83) {
      ctx.showMessage(`레이스 파티 글러브를 낀`);
    } else if (character.cflags[42] === 85) {
      ctx.showMessage(`에나멜 롱 글러브를 낀`);
    }
    ctx.showMessage(`손가락으로 문지르고 있다…`);
  } else if (SELECTCOM === 31) {
    ctx.showMessage(`${ctx.josaHelper("타겟은")}`);
    if (ctx.talents[85] && ctx.assiPlay == 0 && character.equipment[89] == 0) {
      ctx.print('사랑스러운 듯이');
    }
    if (ctx.talents[76]) {
      ctx.print('스스로');
    }
    if (character.equipment[89]) {
      ctx.showMessage(`개의`);
    } else {
      ctx.showMessage(`${ctx.getVarName("CALL", PLAYER)}의`);
    }
    ctx.showMessage(`페니스를 혀로 핥아 돌리고 있다…`);
  } else if (SELECTCOM === 32) {
    ctx.showMessage(`${ctx.josaHelper("타겟은")}`);
    if ((character.cflags[40] & 64) && character.cflags[42] <= 50) {
      await print_clothtype_special(ctx, character);
      ctx.print('너머로,');
    } else if (character.cflags[40] & 28) {
      await print_clothtype_main2(ctx, character);
      ctx.print('너머로,');
    } else if ((character.cflags[40] & 2)) {
      ctx.print('속옷 너머로,');
    }
    if (ctx.talents[85] && ctx.assiPlay == 0) {
      ctx.print('황홀한 표정을 지으며');
    }
    if (ctx.talents[109]) {
      ctx.showMessage(`평평한 가슴으로 열심히`);
      if (character.equipment[89]) {
        ctx.showMessage(`개의 페니스를`);
      } else {
        ctx.showMessage(`${ctx.getVarName("CALL", PLAYER)}의 페니스를`);
      }
    } else if (ctx.talents[110]) {
      ctx.showMessage(`풍만한 가슴으로`);
      if (character.equipment[89]) {
        ctx.showMessage(`개의 페니스를 감싸고`);
      } else {
        ctx.showMessage(`${ctx.getVarName("CALL", PLAYER)}의 페니스를 감싸고`);
      }
    } else if (ctx.talents[114]) {
      ctx.showMessage(`유방 사이에 완전히 묻힌`);
      if (character.equipment[89]) {
        ctx.showMessage(`개의 페니스를`);
      } else {
        ctx.showMessage(`${ctx.getVarName("CALL", PLAYER)}의 페니스를`);
      }
    } else {
      ctx.showMessage(`가슴으로`);
      if (character.equipment[89]) {
        ctx.showMessage(`개의 페니스를 감싸`);
      } else {
        ctx.showMessage(`${ctx.getVarName("CALL", PLAYER)}의 페니스를 감싸`);
      }
    }
    ctx.showMessage('문지르고 있다…');
  } else if (SELECTCOM === 33) {
    ctx.showMessage(`${ctx.josaHelper("타겟은")} ${ctx.getVarName("CALL", PLAYER)}의 페니스를 사타구니 사이에 끼우고`);
    if (ctx.talents[85] && ctx.talents[76] && ctx.params[5] > PALAMLV[5]) {
      ctx.showMessage(`쾌락에 빠진 표정으로 ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.player), "를")} 응시하면서`);
    } else if (ctx.talents[85] && ctx.params[5] > PALAMLV[5]) {
      ctx.print('금방이라도 녹아버릴듯한 표정을 지으면서');
    } else if (ctx.talents[76] && ctx.params[5] > PALAMLV[5]) {
      ctx.showMessage(`애원하는듯한 시선으로`);
    } else if (ctx.params[5] > PALAMLV[4]) {
      ctx.print('입에서 침을 흘리면서');
    } else if (ctx.talents[85] && ctx.talents[76]) {
      ctx.showMessage(`완전히 도취된 눈동자로 ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.player), "를")} 응시하면서`);
    } else if (ctx.talents[85]) {
      ctx.print('행복한 표정을 띄우면서');
    } else if (ctx.talents[76]) {
      ctx.showMessage(`음탕한 눈초리로 도발하면서`);
    } else if (ctx.talents[36]) {
      ctx.showMessage(`대담하게 허리를 움직이면서`);
    } else if (ctx.talents[22]) {
      ctx.showMessage(`상기된 얼굴로`);
    } else {
      ctx.print('부끄러운듯이');
    }
    if (ctx.talents[132]) {
      ctx.print('어린 균열을');
    } else {
      ctx.print('음순을');
    }
    ctx.showMessage('페니스에 문지르고 있다…');
  } else if (SELECTCOM === 34) {
    if (character.tflags[60] && PREVCOM === 34 && character.equipment[89]) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 난폭한 숨을 내쉬며 개 위에서 허리를 계속 흔들고 있다……`);
      if (character.tflags[31]) {
        character.tflags[31] = 2;
      }
    } else if (character.equipment[89]) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 배를 들어낸 개 위에 스스로 올라타,`);
      ctx.showMessage(`들개의 발기한 페니스를 자신의 의사로 바기너에 삽입했다……`);
    } else if (character.tflags[60] && PREVCOM === 34 && ((ctx.assiPlay && character.tflags[50]) || (ctx.assiPlay === 0 && character.tflags[50] === 0))) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 삽입된채로 페니스를 조이고, 다시 허리를 움직이기 시작했다…`);
      if (character.tflags[31]) {
        character.tflags[31] = 2;
      }
    } else if (character.tflags[60] && (PREVCOM === 20 || PREVCOM === 21 || PREVCOM === 24 || PREVCOM === 25 || PREVCOM === 26) && ((ctx.assiPlay && character.tflags[50]) || (ctx.assiPlay === 0 && character.tflags[50] === 0))) {
      ctx.showMessage(`${ctx.josaHelper("플레이어는")} 질내에서 빼지않고 ${ctx.josaHelper("타겟을")} 안아올리며, 아래에서 허리를 찔러올렸다…`);
      if (character.tflags[31]) {
        character.tflags[31] = 2;
      }
    } else {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} ${ctx.getVarName("CALL", PLAYER)}의 위에 올라타, 느긋하게 허리를 내`);
      if (ctx.talents[132] && ctx.exp[0] === 0) {
        ctx.print('려, 남자를 모르는 어린 균열에 페니스를 삼켜갔다…');
      } else if (ctx.exp[0] === 0) {
        ctx.print('려, 남자를 모르는 비렬에 페니스를 삼켜갔다…');
      } else {
        ctx.print('렸다…');
      }
      if (ctx.exp[0] >= EXPLV[3]) {
        ctx.showMessage('');
        ctx.showMessage(`${ctx.josaHelper("타겟은")}`);
        if (ctx.talents[99]) {
          ctx.print('덮치듯이 짓누르며');
        } else if (ctx.talents[100]) {
          ctx.print('작은 몸으로 열심히');
        }
        if (ctx.talents[153] && character.cflags[110] <= DAY+10) {
          ctx.print('부풀어 오른 배를 끌어안은채로');
        }
        if (ctx.talents[110] || ctx.talents[114]) {
          ctx.print('커다란 가슴을 흔들면서');
        }
        ctx.print('스스로 허리를 움직이고 있다…');
      }
      ctx.showMessage('');
    }
  } else if (SELECTCOM === 35) {
    ctx.showMessage(`${ctx.josaHelper("타겟은")} 비누로 거품을 만들어 자신의 몸에 바르고,`);
    if (ctx.talents[85]) {
      ctx.print('황홀한 표정으로');
    }
    if (ctx.talents[99]) {
      ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.player), "를")} 감싸듯이`);
    } else if (ctx.talents[100]) {
      ctx.showMessage(`${ctx.getVarName("CALL", PLAYER)}에게 작은 몸을 힘껏 밀착해`);
    } else if (ctx.talents[110] || ctx.talents[114]) {
      ctx.showMessage(`${ctx.getVarName("CALL", PLAYER)}에게 풍만한 가슴과 매끈한 피부를 문지르며`);
    } else {
      ctx.showMessage(`${ctx.getVarName("CALL", PLAYER)}에게 전신을 밀착해`);
    }
    ctx.showMessage('애무했다…');
  } else if (SELECTCOM === 36) {
    if (character.tflags[60] && PREVCOM === 36 && character.equipment[89]) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 난폭한 숨을 내쉬며 개 위에서 허리를 계속 흔들고 있다……`);
    } else if (character.equipment[89]) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 위로 향한 개 위에 스스로 올라타,`);
      ctx.showMessage(`들개의 발기한 페니스를 자신의 의사로 아누스에 삽입했다……`);
    } else if (character.tflags[60] && PREVCOM === 36 && ((ctx.assiPlay && character.tflags[50]) || (ctx.assiPlay === 0 && character.tflags[50] === 0))) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 삽입된채로 페니스를 조이고, 다시 허리를 움직이기 시작했다…`);
    } else if (character.tflags[60] && (PREVCOM === 26 || PREVCOM === 22 || PREVCOM === 28 || PREVCOM === 29) && ((ctx.assiPlay && character.tflags[50]) || (ctx.assiPlay === 0 && character.tflags[50] === 0))) {
      ctx.showMessage(`${ctx.josaHelper("플레이어는")} 장내에서 빼지않고 ${ctx.josaHelper("타겟을")} 안아올리고, 아래에서 허리를 찔러올렸다…`);
    } else {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} ${ctx.getVarName("CALL", PLAYER)}의 위에 올라타,`);
      if (ctx.params[3] >= PALAMLV[4]) {
        ctx.print('점액 투성이의');
      }
      ctx.showMessage('아누스로 천천히 물건을 삼켜나갔다…');
    }
    if (ctx.exp[0] >= EXPLV[3]) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")}`);
      if (ctx.talents[99]) {
        ctx.print('덮치듯이 짓누르며');
      } else if (ctx.talents[100]) {
        ctx.print('작은 몸으로 열심히');
      }
      if (ctx.talents[110] || ctx.talents[114]) {
        ctx.print('크게 가슴을 흔들면서');
      }
      ctx.showMessage('스스로 허리를 움직이고 있다…');
    }
  } else if (SELECTCOM === 37) {
    if (character.equipment[89]) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 개의 애널에 입맞추고 있다…`);
    } else if (ctx.talents[85] === 1) {
      ctx.showMessage(`${ctx.josaHelper("플레이어가")} 명령하자 ${ctx.josaHelper("타겟은")} 기쁜 표정으로 ${ctx.getVarName("CALL", PLAYER)}의 애널에 입을 맞추었다`);
    } else {
      ctx.showMessage(`${ctx.josaHelper("플레이어는")} ${ctx.getVarName("CALL", TARGET)}에게 자신의 애널에 입맞추게했다…`);
    }
  } else if (SELECTCOM === 38) {
    ctx.showMessage(`${ctx.josaHelper("타겟은")} ${ctx.getVarName("CALL", PLAYER)}의 페니스를`);
    if ((character.cflags[40] & 1) && ctx.talents[122] === 0) {
      if (ctx.params[3] >= PALAMLV[4]) {
        ctx.print('애액으로 비렬의 모양이 찍힌');
      }
      await print_underwear_under(ctx, character);
      ctx.showMessage(`%조사만처리(RESULT+2,"를")% 도발하듯이 보여주며`);
    } else if (!(character.cflags[40] & 1) && ctx.talents[122] === 0) {
      if (ctx.params[3] >= PALAMLV[4]) {
        ctx.print('애액으로 흠뻑 젖은채 입을 벌린');
      }
      if ((character.cflags[7] & 4)) {
        ctx.showMessage(`거울상처럼 두개의 피어스가 빛나는`);
      }
      if (character.cflags[608] === 0) {
        ctx.showMessage(`예쁜 핑크색인`);
      } else if (character.cflags[608] === 1) {
        ctx.showMessage(`라비아가 비대화된`);
      } else if (character.cflags[608] === 2) {
        ctx.showMessage(`라비아가 검게 변색되고 비대화된`);
      }
      ctx.showMessage(`L`);
      if (ctx.flags[36]) {
        if (character.cflags[6] > 18) {
          ctx.print('음부에서 애널까지 음모로 뒤덮인');
        } else if (character.cflags[6] > 13) {
          ctx.print('음모가 진하게 난');
        } else if (character.cflags[6] > 10) {
          ctx.print('음모를 예쁘게 정돈한');
        } else if (character.cflags[6] > 8) {
          ctx.print('가는 음모가 나있는');
        } else if (character.cflags[6] > 6) {
          ctx.print('희미하게 음모가 나기 시작한');
        } else if (character.cflags[6] > 0) {
          ctx.print('맨들맨들한');
        }
        ctx.showMessage(`성기를`);
      } else {
        ctx.showMessage(`성기를`);
      }
      ctx.showMessage(`도발하듯이 보여주며`);
    }
    if (character.cflags[173] === - 1) {
      ctx.showMessage(`맨발로`);
    } else if (character.cflags[173] === 0) {
      await print_shoestype_main(ctx, character);
      ctx.showMessage(`너머로`);
    }
    if (ctx.talents[83] || ctx.abilities[20] > 2) {
      ctx.print('짓밟듯이');
    }
    if (ctx.talents[85] || ctx.talents[76]) {
      ctx.print('열심히');
    }
    ctx.showMessage('문지르고 있다…');
  } else if (SELECTCOM === 39) {
    ctx.showMessage(`${ctx.josaHelper("타겟은")}`);
    if (ctx.abilities[20] <= 2) {
      ctx.showMessage(`${ctx.josaHelper("플레이어가")} 시키는 대로`);
    }
    if (ctx.assiPlay === 0 && character.equipment[89] === 0 && ctx.talents[83] === 0 && ctx.talents[85] === 1) {
      ctx.print('곤혹해하면서');
    } else if (ctx.assiPlay === 0 && character.equipment[89] === 0 && ctx.talents[83] === 1 && ctx.talents[85] === 1) {
      ctx.showMessage(`질려하고는 ${ctx.josaHelper("플레이어를")} 무시하듯 바라보며`);
    } else if (ctx.assiPlay === 0 && character.equipment[89] === 0 && ctx.talents[83] === 1 && ctx.talents[85] === 0) {
      ctx.showMessage(`질려하고는 ${ctx.josaHelper("플레이어를")} 바라보며`);
    }
    if (character.equipment[89]) {
      ctx.showMessage(`개의`);
    } else {
      ctx.showMessage(`${ctx.getVarName("CALL", PLAYER)}의`);
    }
    ctx.showMessage(`페니스를 오나홀로 문지르고 있다…`);
  } else if (SELECTCOM === 141) {
    ctx.showMessage(`${ctx.josaHelper("타겟은")}`);
    if ((character.cflags[40] & 64) && character.cflags[42] <= 50) {
      await print_clothtype_special(ctx, character);
      ctx.print('너머로,');
    } else if (character.cflags[40] & 28) {
      await print_clothtype_main2(ctx, character);
      ctx.print('너머로,');
    } else if ((character.cflags[40] & 2)) {
      ctx.print('속옷 너머로,');
    }
    if (ctx.talents[85] && ctx.assiPlay == 0) {
      ctx.print('황홀한 표정으로');
    }
    if (ctx.talents[413]) {
      ctx.print('없는 가슴을 열심히');
    } else if (ctx.getTalent(talent, 122)) {
      ctx.print('없는 가슴을 열심히');
    } else {
      ctx.print('없는 가슴을 열심히');
    }
    ctx.showMessage(`${ctx.getVarName("CALL", PLAYER)}의 페니스에 비비고 있다…`);
  } else if (SELECTCOM === 142) {
    ctx.showMessage(`${ctx.josaHelper("타겟은")}`);
    if (ctx.talents[85]) {
      ctx.print('황홀한 표정을 지으며');
    }
    if (ctx.talents[110]) {
      ctx.print('풍만한 가슴으로 페니스를 감싸고 흔들어');
    } else if (ctx.talents[114]) {
      ctx.print('너무 풍만한 가슴으로 페니스를 감싸고 주물러');
    }
    ctx.showMessage('자극하고 있다……'); ctx.waitInput();
  } else if (SELECTCOM === 40) {
    ctx.showMessage(`${ctx.josaHelper("플레이어는")}`);
    if (character.cflags[42] === 11 && (character.cflags[40] & 64)) {
      await print_clothtype_special(ctx, character);
      ctx.showMessage(`위를`);
    } else {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 엉덩이를`);
    }
    ctx.showMessage(`손바닥으로 때렸다`);
    if (character.cflags[42] === 11 && (character.cflags[40] & 64)) {
      await print_clothtype_special(ctx, character);
      ctx.showMessage(`%조사만처리(RESULT+2,"를")% 입고 있는 ${ctx.getVarName("CALL", TARGET)}에게는, 그다지 효과가 없는 것 같다…`);
    } else if (PREVCOM === 40 && (character.cflags[40] & 16) === 0) {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 얻어맞은 부분이 더 붉어져간다…`);
    } else if ((character.cflags[40] & 16) === 0) {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 얻어맞은 부분이 붉어졌다…`);
    }
  } else if (SELECTCOM === 41) {
    ctx.showMessage(`${ctx.josaHelper("플레이어는")}`);
    if (character.cflags[42] === 11 && (character.cflags[40] & 64)) {
      await print_clothtype_special(ctx, character);
    } else {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 몸`);
    }
    ctx.showMessage(`에 채찍을 내리쳤다…`);
    if (character.cflags[42] === 11 && (character.cflags[40] & 64)) {
      await print_clothtype_special(ctx, character);
      ctx.showMessage(`%조사만처리(RESULT+2,"를")% 입고 있는 ${ctx.getVarName("CALL", TARGET)}에게는, 그다지 효과가 없는 것 같다…`);
    } else if (PREVCOM === 41) {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 몸에 채찍 자국이 점점 늘어난다…`);
    } else {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 몸에 새빨간 채찍 자국이 생겼다…`);
    }
  } else if (SELECTCOM === 42) {
    ctx.showMessage(`${ctx.josaHelper("플레이어는")}`);
    if (character.cflags[42] === 11 && (character.cflags[40] & 64)) {
      await print_clothtype_special(ctx, character);
      ctx.showMessage(`%조사만처리(RESULT+2,"를")% 바늘로 찔렀다…`);
    } else {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 몸을 바늘로 찔렀다…`);
    }
    if (character.cflags[42] === 11 && (character.cflags[40] & 64)) {
      await print_clothtype_special(ctx, character);
      ctx.showMessage(`%조사만처리(RESULT+2,"를")% 입고 있는 ${ctx.getVarName("CALL", TARGET)}에게는, 그다지 효과가 없는 것 같다…`);
    }
  } else if (SELECTCOM === 144) {
    ctx.showMessage(`${ctx.josaHelper("플레이어는")}`);
    if ((character.cflags[40] & 4) === 0) {
      ctx.showMessage(`드러나있는`);
    } else {
      await print_clothtype_main2(ctx, character);
      ctx.showMessage(`의 위에서`);
    }
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 배를 힘껏 때렸다…`);
    if (PREVCOM === 144) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 더해지는 고통에 눈물과 침을 흘리며 토하고 있다…`);
    } else {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 고통에 소리를 지르며, 배를 움켜쥐고 침대 위에서 몸을 웅크리고 있다…`);
    }
  } else if (SELECTCOM === 43) {
    if (character.equipment[43]) {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}에게서 아이마스크를 떼어주었다`);
    } else {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}에게 아이마스크를 씌웠다`);
    }
  } else if (SELECTCOM === 44) {
    ctx.showMessage(`${ctx.josaHelper("플레이어는")}`);
    if (character.cflags[42] === 11 && (character.cflags[40] & 64)) {
      await print_clothtype_special(ctx, character);
      if (character.equipment[44]) {
        ctx.showMessage(`%조사만처리(RESULT+2,"를")% 풀어주었다`);
      } else {
        ctx.showMessage(`%조사만처리(RESULT+2,"를")% 밧줄로 묶었다`);
      }
    } else {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}`);
      if (character.equipment[44]) {
        ctx.showMessage(`%조사만처리(CALLNAME:TARGET,"를")% 풀어주었다`);
      } else {
        ctx.showMessage(`%조사만처리(CALLNAME:TARGET,"를")% 밧줄로 묶었다`);
      }
    }
  } else if (SELECTCOM === 45) {
    if (character.equipment[45]) {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}에게서 볼재갈을 벗겨주었다`);
    } else {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}에게 볼재갈을 씌웠다`);
    }
  } else if (SELECTCOM === 46) {
    if (character.equipment[46]) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 항문 마개를 뽑혀, 장내의 오물을 마구 흩뿌렸다.`);
      if (character.tflags[899] === 0) {
        if (ctx.abilities[21] === 0) {
          ctx.showMessage(`${ctx.josaHelper("타겟은")} 고통과 치욕의 표정을 띄우고 있다`);
        } else if (ctx.abilities[21] === 1) {
          ctx.showMessage(`${ctx.josaHelper("타겟은")} 비지땀을 흘리며, 아직도 하복부에 남아있는 배설감을 견디고 있다`);
        } else if (ctx.abilities[21] === 2) {
          ctx.showMessage(`${ctx.josaHelper("타겟은")} 부끄러워하면서도, 해방감으로 안심한듯한 표정을 띄우고 있다.`);
        } else if (ctx.abilities[21] === 3) {
          ctx.showMessage(`${ctx.josaHelper("타겟은")} 항문을 지나는 배설물의 감각에 때때로 음란한 허덕임을 지르고 있다.`);
        } else if (ctx.abilities[21] === 4) {
          ctx.showMessage(`${ctx.josaHelper("타겟은")} 몽롱한 표정으로 배설감을 즐기고 있다.`);
        } else if (ctx.abilities[21] >= 5) {
          ctx.showMessage(`${ctx.josaHelper("타겟은")} 배설감과 치욕을 마음껏 맛보고 있다.`);
          ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 표정은 쾌감으로 야무지지 못하게 흐트러져, 항문에서 오물을 흘리는 것과 동시에, 질구에서도 애액을 뚝뚝 떨어트리고 있다.`);
        }
      }
    } else {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 항문에 관장액을 흘려넣고, 마개를 했다`);
    }
  } else if (SELECTCOM === 47) {
    if (character.equipment[47]) {
      ctx.showMessage(`${ctx.getVarName("CALL", ASSI)}의 본디지룩을 벗겼다…`);
    } else {
      ctx.showMessage(`${ctx.getVarName("CALL", ASSI)}의 맨몸에 가죽제의 본디지룩을 입혔다…`);
    }
  } else if (SELECTCOM === 48) {
    ctx.showMessage(`${ctx.josaHelper("플레이어는")} ${ctx.getVarName("CALL", TARGET)}의`);
    if (ctx.params[5] >= PALAMLV[3]) {
      ctx.print('딱딱하게 발기한');
    }
    ctx.showMessage('페니스를 다리로 문질렀다…');
  } else if (SELECTCOM === 49) {
    if (character.equipment[49]) {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 아누스에서 전극을 뽑아주었다…`);
    } else {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 국혈에 전극을 삽입하며 스위치를 넣었다…`);
    }
  } else if (SELECTCOM === 50) {
    await print_clothtype(ctx, character);
    ctx.showMessage(`의 ${ctx.getVarName("CALL", TARGET)}에게 로션을 마구 칠했다…`);
  } else if (SELECTCOM === 51) {
    if (character.equipment[90]) {
      ctx.showMessage(`최음효과가 있는 액체가 촉수에서 흘러나왔다`);
    } else {
      ctx.showMessage(`${ctx.josaHelper("플레이어는")} ${ctx.getVarName("CALL", TARGET)}에게`);
      if (ctx.abilities[ctx.player][12] >= 3) {
        ctx.print('입으로');
      }
      if (ctx.abilities[10] <= 2) {
        ctx.print('억지로');
      }
      ctx.showMessage(`미약을 먹였다`);
    }
    ctx.showMessage(`${ctx.josaHelper("타겟은")} 난폭한 숨을 토하며 피부를 상기시키고 있다…`);
  } else if (SELECTCOM === 52) {
    if (character.equipment[90]) {
      ctx.showMessage(`극세사의 촉수가, 이뇨 작용이 있는 액체를 요도로 직접 흘려넣었다…`);
    } else {
      if (character.equipment[55] === 1) {
        ctx.showMessage(`${ctx.josaHelper("타겟은")} 이뇨제를 입에 머금었다`);
      } else {
        ctx.showMessage(`${ctx.josaHelper("플레이어는")} ${ctx.getVarName("CALL", TARGET)}에게`);
        if (ctx.abilities[ctx.player][12] >= 3) {
          ctx.print('입으로');
        }
        if (ctx.abilities[10] <= 2) {
          ctx.print('억지로');
        }
        ctx.showMessage(`미약을 먹였다`);
      }
    }
    if (character.tflags[899] === 0) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 난폭한 숨을 내쉬며,`);
      if (ctx.talents[45] == 0 && ctx.talents[310] == 0) {
        ctx.showMessage(`눈물을 띄우고`);
      }
      ctx.showMessage(`뇨의를 참고 있다…`);
    }
  } else if (SELECTCOM === 53) {
    if (character.equipment[53]) {
      ctx.showMessage('★★★비디오 촬영을 종료합니다★★★');
    } else {
      ctx.showMessage('★★★비디오 촬영을 시작합니다★★★');
    }
  } else if (SELECTCOM === 54) {
    if (character.equipment[54] === 0) {
      ctx.showMessage(`방으로 돌아왔다…`);
    } else {
      await print_clothtype(ctx, character);
      ctx.showMessage(`의 ${ctx.getVarName("CALL", TARGET)}`);
      if (ctx.assi > 0) {
        if (character.cflags[40] === character.cflags[ctx.assi][40] && character.cflags[41] === character.cflags[ctx.assi][41] && character.cflags[42] === character.cflags[ctx.assi][42]) {
          ctx.showMessage(`%조사만처리(CALLNAME:TARGET,"와")% ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.assi), "를")}`);
        } else {
          ctx.showMessage(`%조사만처리(CALLNAME:TARGET,"와")%`);
          T = character;
          character = ctx.assi;
          await print_clothtype(ctx, character);
          character = T;
          ctx.showMessage(`의 ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.assi), "를")}`);
        }
      } else {
        ctx.showMessage(`%조사만처리(CALLNAME:TARGET,"를")%`);
      }
      if (character.equipment[54] === 1) {
        ctx.showMessage(`데리고 밖으로 나갔다…`);
      } else if (character.equipment[54] === 2) {
        ctx.print('데리고 교실 셋트로 향했다…');
      } else if (character.equipment[54] === 3) {
        ctx.showMessage('데리고 수영장으로 갔다…');
      }
    }
  } else if (SELECTCOM === 56) {
    C = character.no + 2000;
    if (ctx.flags[C]) {
      ctx.showMessage(`${ctx.josaHelper("플레이어는")} ${ctx.getVarName("CALL", TARGET)}에게 말을 건넸다…`);
      if (ctx.abilities[10] >= 3 && ctx.abilities[17] >= 2) {
        if (character.cflags[8] != 1) {
          await genital_slang(ctx, character);
        }
      }
    } else if (character.equipment[53]) {
      ctx.showMessage(`${ctx.josaHelper("플레이어가")} ${ctx.getVarName("CALL", TARGET)}에게 자기소개를 재촉하면,`);
      if (ctx.talents[89] || ctx.abilities[17] >= 5) {
        ctx.showMessage(`${ctx.josaHelper("타겟은")} 자신의 본명이나 지금까지의 성경험에 대해`);
        if (ctx.abilities[31] >= 3) {
          ctx.showMessage(`, 게다가 자위시에 하는 망상의 내용까지도`);
        }
        ctx.showMessage(` 기쁨에 차 말하기 시작했다……`);
        ctx.showMessage(`이 비디오를 모르는 사람이 본다는 기대만으로 사타구니를 적시고 있다……`);
        character.tflags[32] |= 2;
      } else if (ctx.params[5] >= PALAMLV[4] && (ctx.talents[76] || ctx.abilities[11] >= 5)) {
        ctx.showMessage(`${ctx.josaHelper("타겟은")} 카메라를 보며 음란한 말을 하기 시작했다`);
        character.tflags[32] |= 2;
      } else if (ctx.talents[85] || ctx.abilities[10] >= 3 || ctx.abilities[11] >= 4 || ctx.abilities[17] >= 2) {
        ctx.showMessage(`${ctx.josaHelper("타겟은")} 카메라를 보며 자기소개를 시작했다`);
        character.tflags[32] |= 2;
      } else {
        ctx.showMessage(`${ctx.josaHelper("타겟은")} 고개를 돌리고 아무말도 하지 않았다`);
      }
    } else {
      ctx.showMessage(`${ctx.josaHelper("플레이어가")}`);
      if (ctx.params[5] >= PALAMLV[4] && (ctx.talents[85] || ctx.abilities[10] >= 5) && character.tflags[60]) {
        ctx.showMessage(`말을 걸자, ${ctx.josaHelper("타겟은")} 허리를 흔들면서 사랑의 말을 외쳤다`);
      } else if (ctx.params[5] >= PALAMLV[4] && (ctx.talents[76] || ctx.abilities[11] >= 5) && character.tflags[60]) {
        ctx.showMessage(`말을 걸자, ${ctx.josaHelper("타겟은")} 허리를 흔들면서 음란한 말을 계속해서 외쳤다`);
      } else if ((ctx.params[4] >= PALAMLV[4] || ctx.abilities[10] >= 5 || ctx.talents[85]) && ctx.params[5] >= PALAMLV[4]) {
        ctx.showMessage(`말을 걸자, ${ctx.josaHelper("타겟은")}`);
        if (character.equipment[11] || character.equipment[13] || character.equipment[14] || character.equipment[15] || character.equipment[16] || character.equipment[17]) {
          ctx.print('쾌락때문에');
        } else if (character.equipment[44] || character.equipment[49]) {
          ctx.print('고통때문에');
        }
        ctx.showMessage(`소리를 지르며, 필사적으로 대답했다`);
      } else if (ctx.params[4] >= PALAMLV[4] || ctx.talents[85] || ctx.abilities[10] >= 5) {
        ctx.showMessage(`말을 걸자, ${ctx.josaHelper("타겟은")} 기쁘게 대답했다`);
      } else if (ctx.params[4] >= PALAMLV[2] ||  ctx.abilities[10] >= 3) {
        ctx.showMessage(`말을 걸자, ${ctx.josaHelper("타겟은")} 흠칫흠칫 대답했다`);
      } else {
        ctx.showMessage(`말을 걸었지만, ${ctx.josaHelper("타겟은")} 제대로 듣고 있지 않은 것 같다…`);
      }
      if (ctx.abilities[10] >= 3 && ctx.abilities[17] >= 2) {
        if (character.cflags[8] != 1) {
          await genital_slang(ctx, character);
        }
      }
    }
    C = 0;
  } else if (SELECTCOM === 57) {
    if (character.equipment[57]) {
      ctx.showMessage(`${ctx.josaHelper("타겟을")} 데리고 거울 앞에서 멀어졌다…`);
    } else {
      await print_clothtype(ctx, character);
      ctx.showMessage(`의 ${ctx.josaHelper("타겟을")} 거울 앞에 데려왔다…`);
    }
  } else if (SELECTCOM === 58) {
    if (character.equipment[58]) {
      ctx.showMessage(`${ctx.josaHelper("플레이어와")} ${ctx.josaHelper("타겟은")} 방으로 돌아왔다…`);
    } else {
      ctx.showMessage(`${ctx.josaHelper("플레이어는")} ${ctx.josaHelper("타겟을")} 욕실로 데려갔다…`);
    }
  } else if (SELECTCOM === 59) {
    if (character.equipment[59]) {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}에게서 코스프레 의상을 벗겼다…`);
    } else {
      ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)}에게 코스프레 시키기로했다…`);
      await cosplay_costume(ctx, character);
    }
  } else if (SELECTCOM === 60) {
    ctx.showMessage(`${ctx.josaHelper("조수와")} ${ctx.josaHelper("타겟은")} 혀를 섞으며 키스하고 있다…`);
  } else if (SELECTCOM === 61) {
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}에게 ${ctx.getVarName("CALL", PLAYER)}의 음순을 빨게했다…`);
  } else if (SELECTCOM === 62) {
    if (character.tflags[60] && PREVCOM === 62) {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}에게 과시하면서, ${ctx.josaHelper("조수를")} 계속해서 범했다…`);
    } else {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}에게 과시하면서, ${ctx.getVarName("CALL", ASSI)}의`);
      if (ctx.exp[ctx.assi][0] === 0) {
        ctx.print('처음을');
      } else {
        ctx.print('바기너를');
      }
      ctx.showMessage('꿰뚫었다…');
    }
  } else if (SELECTCOM === 63) {
    ctx.showMessage(`${ctx.josaHelper("플레이어와")} ${ctx.josaHelper("타겟은")} 서로의 성기를 문질렀다…`);
  } else if (SELECTCOM === 64) {
    if (ctx.assiPlay) {
      if (character.tflags[40] === 1) {
        ctx.showMessage(`${ctx.josaHelper("플레이어는")} ${ctx.getVarName("CALL", TARGET)}의 음순에 삽입하면서,`);
      } else if (character.tflags[40] === 2) {
        ctx.showMessage(`${ctx.josaHelper("플레이어는")} ${ctx.getVarName("CALL", TARGET)}의 애널에 삽입하면서,`);
      } else if (character.tflags[40] === 3) {
        ctx.showMessage(`${ctx.josaHelper("플레이어는")} ${ctx.getVarName("CALL", TARGET)}에게 삼키게하면서,`);
      }
      if (character.tflags[41] === 1) {
        ctx.showMessage(`${ctx.getVarName("CALL", ASSI)}에게 음순을 관철하게했다…`);
      } else if (character.tflags[41] === 2) {
        ctx.showMessage(`${ctx.getVarName("CALL", ASSI)}에게 애널에 삽입하게했다…`);
      } else if (character.tflags[41] === 3) {
        ctx.showMessage(`${ctx.getVarName("CALL", ASSI)}에게 입안을 유린하게했다…`);
      }
    } else {
      if (character.tflags[41] === 1) {
        ctx.showMessage(`${ctx.getVarName("CALL", ASSI)}에게 ${ctx.getVarName("CALL", TARGET)}의 음순을 관철하게하면서,`);
      } else if (character.tflags[41] === 2) {
        ctx.showMessage(`${ctx.getVarName("CALL", ASSI)}에게 ${ctx.getVarName("CALL", TARGET)}의 애널에 삽입하게하면서,`);
      } else if (character.tflags[41] === 3) {
        ctx.showMessage(`${ctx.getVarName("CALL", ASSI)}에게 ${ctx.getVarName("CALL", TARGET)}의 입 안을 범하게하면서,`);
      }
      if (character.tflags[40] === 1) {
        ctx.showMessage(`${ctx.josaHelper("플레이어는")} 음순에 삽입했다…`);
      } else if (character.tflags[40] === 2) {
        ctx.showMessage(`${ctx.josaHelper("플레이어는")} 애널에 삽입했다…`);
      } else if (character.tflags[40] === 3) {
        ctx.showMessage(`${ctx.josaHelper("플레이어는")} 입을 유린했다…`);
      }
    }
  } else if (SELECTCOM === 65) {
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}에게 ${ctx.josaHelper("플레이어를")}`);
    if (ctx.getTalent(player, 85) === 1) {
      ctx.showMessage(`안겨`);
    } else {
      ctx.showMessage(`범하게 해`);
    }
    ctx.showMessage(`주기로 했다…`);
    ctx.showMessage(`${ctx.josaHelper("타겟은")}`);
    if (ctx.abilities[20] <= 2) {
      ctx.showMessage(`당황해 하면서`);
    } else if (ctx.abilities[20] <= 4) {
      ctx.showMessage(`반응을 즐기듯이`);
    } else {
      ctx.showMessage(`가학적인 미소를 지으며`);
    }
    ctx.showMessage(`${ctx.josaHelper("플레이어를")} 뒤에서`);
    if (ctx.talents[121] || ctx.talents[121]) {
      if (ctx.talents[121]) {
        ctx.showMessage(`후타나리`);
      }
      ctx.showMessage(`페니스`);
    } else {
      if (ctx.talents[83]) {
        ctx.showMessage(`극태`);
      }
      ctx.showMessage(`페니스밴드`);
    }
    ctx.showMessage(`로 찔렀다…`);
  } else if (SELECTCOM === 66) {
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}에게 ${ctx.josaHelper("플레이어와")} ${ctx.getVarName("CALL", PLAYER)}의 페니스에 동시에 봉사하게했다…`);
  } else if (SELECTCOM === 68) {
    ctx.showMessage(`${ctx.josaHelper("타겟과")} ${ctx.josaHelper("조수는")} 둘이 함께 ${ctx.getVarName("CALL", MASTER)}의 페니스를 혀로 핥고 있다…`);
  } else if (SELECTCOM === 69) {
    ctx.showMessage(`${ctx.josaHelper("타겟과")}`);
    if (character.equipment[89]) {
      ctx.showMessage(`개는`);
    } else if (ctx.assi > 0 && ctx.assiPlay) {
      ctx.showMessage(`${ctx.josaHelper("조수는")}`);
    }
    ctx.showMessage('서로의 성기를 빨았다…');
  } else if (SELECTCOM === 70) {
    ctx.showMessage(`${ctx.josaHelper("타겟과")} ${ctx.josaHelper("조수는")} 자신들의 성기 사이에 ${ctx.getVarName("CALL", MASTER)}의 페니스를 끼워, 둘이 함께 문질렀다…`);
  } else if (SELECTCOM === 71) {
    ctx.showMessage(`${ctx.josaHelper("타겟과")} ${ctx.josaHelper("조수는")} 두 명의 유방으로 ${ctx.getVarName("CALL", MASTER)}의 페니스를 양쪽에서 끼우고, 문지르고 있다…`);
  } else if (SELECTCOM === 80) {
    ctx.showMessage(`${ctx.josaHelper("플레이어는")} ${ctx.getVarName("CALL", TARGET)}의 목 안쪽까지 난폭하게 찔러넣었다…`);
  } else if (SELECTCOM === 81) {
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 질은 ${ctx.getVarName("CALL", PLAYER)}의 주먹으로 휘저어졌다.`);
    if (character.tflags[899] === 0) {
      if (ctx.abilities[2] === 2) {
        ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 질은 뻥하니 입을 벌리고 있다`);
      } else if (ctx.abilities[2] === 3) {
        ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 질은 벌려진채로 좀처럼 돌아오지 않는다`);
      } else if (ctx.abilities[2] === 4) {
        ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 입을 벌린 질구 안쪽에 자궁구가 보이고 있다`);
      } else if (ctx.abilities[2] >= 5) {
        ctx.showMessage(`${ctx.josaHelper("타겟은")}, 자신의 질구를 손가락으로 벌리고, 황홀해하고 있다.`);
      }
    }
  } else if (SELECTCOM === 82) {
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 항문은 ${ctx.getVarName("CALL", PLAYER)}의 주먹으로 휘저어졌다.`);
    if (character.tflags[899] === 0) {
      if (ctx.abilities[3] === 2) {
        ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 항문은 뻥하니 입을 벌리고 있다`);
      } else if (ctx.abilities[3] === 3) {
        ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 항문은 벌려진채로 좀처럼 돌아오지 않는다`);
      } else if (ctx.abilities[3] === 4) {
        ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 항문이 입을 벌려 장내가 보이고 있다.`);
      } else if (ctx.abilities[3] >= 5) {
        ctx.showMessage(`${ctx.josaHelper("타겟은")}, 자신의 항문을 손가락으로 벌리고, 황홀해하고 있다.`);
      }
    }
  } else if (SELECTCOM === 83) {
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 질과 항문은 ${ctx.getVarName("CALL", PLAYER)}의 주먹으로 휘저어졌다.`);
    if (character.tflags[899] === 0) {
      if (ctx.abilities[2] <= 4 || ctx.abilities[3] <= 4) {
        ctx.showMessage(`${ctx.josaHelper("타겟은")} 양 다리를 힘없이 벌리고 있다.`);
        ctx.showMessage(`한껏 벌려진 질구와 항문은 점액과 대소변으로 더럽혀져있다.`);
      } else if (ctx.abilities[2] >= 5 && ctx.abilities[3] >= 5) {
        ctx.showMessage(`${ctx.josaHelper("타겟은")} 여운을 맛보고 있다.`);
        ctx.showMessage(`양손의 손가락이, 완전히 벌려져 안쪽을 전부 드러내고있는, 질구와 항문 주위를 만지고 있다.`);
      }
    }
  } else if (SELECTCOM === 85) {
    if (character.equipment[150]) {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 오줌이 슬라임에게 흡수되고 있다…`);
    } else if (character.equipment[90]) {
      ctx.showMessage(`촉수에게 휘감겨진 ${ctx.josaHelper("타겟은")}, 오줌을 공중에 뿌려댔다…`);
    } else if (character.equipment[44]) {
      ctx.showMessage(`단단히 묶인 ${ctx.josaHelper("타겟은")} 움직이지 못하는채로 오줌을 싸기 시작했다`);
      if (character.cflags[42] != 69 || (character.cflags[40] & 64) == 0) {
        ctx.showMessage(`따끈따끈한 김이 나는 오줌이 ${ctx.getVarName("CALL", TARGET)}의 위로 역류해, 몸을 더럽혀간다…`);
      }
    } else if (character.equipment[55]) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")}`);
      ctx.showMessage(`${ctx.getVarName("CALL", PLAYER)}의 입 안에 오줌을 쌌다`);
    } else if (character.cflags[42] === 69 && (character.cflags[40] & 64) && ctx.abilities[10] >= 3 && ctx.abilities[17] >= 3) {
      ctx.showMessage(`${ctx.josaHelper("플레이어가")} 명령하자, ${ctx.josaHelper("타겟은")} 그 자리에서 기저귀 안에 오줌을 쌌다`);
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 황홀한 얼굴로 몸을 떨고 있다…`);
    } else if (character.cflags[42] === 69 && (character.cflags[40] & 64)) {
      ctx.showMessage(`${ctx.getVarName("CALL", PLAYER)}에게 명령받아, ${ctx.josaHelper("타겟은")} 얼굴을 새빨갛게 물들이고 기저귀 안에 오줌을 쌌다…`);
    } else if (character.cflags[42] === 11 && (character.cflags[40] & 64) && ctx.abilities[10] >= 3 && ctx.abilities[17] >= 3) {
      ctx.showMessage(`${ctx.josaHelper("플레이어가")} 명령하자, ${ctx.josaHelper("타겟은")} 기쁨에 차`);
      await print_clothtype_special(ctx, character);
      ctx.showMessage(` 안에 오줌을 쌌다…`);
      ctx.showMessage(`새로운 종류의 쾌락을 발견하고 있는 것 같다`);
    } else if (character.cflags[42] === 11 && (character.cflags[40] & 64)) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")}`);
      await print_clothtype_special(ctx, character);
      ctx.showMessage(` 안에 오줌을 쌌다…`);
      ctx.showMessage(`바깥쪽에서는 잘 알 수 없지만, 아무래도 안에서 울고 있는 것 같다…`);
    } else if ((character.cflags[40] & 8) && ctx.abilities[10] >= 3 && ctx.abilities[17] >= 3 && ctx.talents[28] && character.equipment[44] === 0) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 어떤 망설임도 없이, 기세 좋게`);
      await print_clothtype_main2(ctx, character);
      ctx.showMessage(` 안에 오줌을 내뿜기 시작했다…`);
      ctx.showMessage(`이 쪽과 시선이 마주쳤다고 생각하면, 갑작스레`);
      await print_clothtype_main2(ctx, character);
      ctx.showMessage(`%조사만처리(RESULT+2,"를")% 들어올리고,`);
      if ((character.cflags[40] & 1)) {
        ctx.print('오줌으로 질척해진 팬티');
      } else {
        ctx.print('오줌을 계속 싸고있는 성기');
      }
      ctx.showMessage(`를 보이면서 V자를 해보였다`);
      ctx.showMessage(`뭘 생각하고 있는건지…`);
    } else if (((character.cflags[40] & 8) || (character.cflags[40] & 16)) && ctx.abilities[10] >= 3 && ctx.abilities[17] >= 3) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 어떤 망설임도 없이, 기세 좋게`);
      await print_clothtype_main2(ctx, character);
      ctx.showMessage(`%조사만처리(RESULT+2,"를")% 입은채로 오줌을 싸기 시작했다…`);
    } else if ((character.cflags[40] & 8) || (character.cflags[40] & 16)) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 고개 숙인채로, 입을 다물고`);
      await print_clothtype_main2(ctx, character);
      ctx.showMessage(` 안에 방뇨했다…`);
    } else if ((character.cflags[40] & 1) && ctx.abilities[10] >= 3 && ctx.abilities[17] >= 3) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 황홀한 얼굴로 팬티 안에 오줌을 싸기 시작했다…`);
      ctx.showMessage(`질척질척하게 젖은 팬티의 감촉에 중독되어가고 있는 것 같다…`);
    } else if ((character.cflags[40] & 1)) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 새빨간 얼굴로 팬티 안에 방뇨했다…`);
    } else if (ctx.talents[57] && ctx.abilities[10] >= 3 && ctx.abilities[21] >= 3 && ctx.talents[132]) {
      ctx.showMessage(`${ctx.josaHelper("플레이어가")} ${ctx.getVarName("CALL", TARGET)}의 양 다리를 안아올리고, 오줌구멍을 손 끝으로 간지럽히자,`);
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 작은 몸을 떨며, 반사적으로 오줌을 내뿜어버렸다…`);
    } else if (ctx.talents[57] && ctx.abilities[10] >= 3 && ctx.abilities[21] >= 3) {
      ctx.showMessage(`${ctx.josaHelper("플레이어가")} ${ctx.getVarName("CALL", TARGET)}의 요도구를 가볍게 손끝으로 자극하자,`);
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 참지 못하고, 반사적으로 오줌을 내뿜어버렸다…`);
    } else if (ctx.abilities[10] >= 3 && ctx.talents[28] && ctx.abilities[17] >= 3 && character.equipment[53]) {
      ctx.showMessage(`${ctx.josaHelper("타겟이")} 뒤에서 손으로 다리를 M자로 활짝 벌리자,`);
      ctx.showMessage(`비디오카메라를 향해 피스 싸인을 해보이며 방뇨했다…`);
    } else if (ctx.abilities[10] >= 3 && ctx.abilities[17] >= 3 && character.equipment[54] === 1) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} ${ctx.getVarName("CALL", PLAYER)}의 명령대로,`);
      ctx.showMessage(`왕래가 많은 길 한 가운데에서 다리를 벌려 성기를 노출하고,`);
      ctx.showMessage(`통행인의 시선도 신경쓰지 않고, 선채로 오줌을 싸기 시작했다…`);
    } else if (ctx.abilities[10] >= 3 && ctx.abilities[17] >= 3) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")}`);
      if (character.equipment[44] == 0) {
        ctx.showMessage(`뒤에서 손으로 다리를 M자로 활짝 벌리고,`);
      }
      ctx.showMessage(`${ctx.getVarName("CALL", PLAYER)}에게 보이도록 방뇨했다…`);
    } else if (character.equipment[54] === 1) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 수치와 굴욕 투성이가 되어,`);
      if (ctx.talents[45] == 0 && ctx.talents[310] == 0) {
        ctx.showMessage(`눈물을 띄운채로,`);
      }
      ctx.showMessage(`풀 숲 안에서 방뇨했다…`);
    } else if (character.equipment[57]) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 거울 속에 비치는 자신을 보지 않게하면서 주저앉아 오줌을 싸기 시작했다…`);
    } else if (ctx.talents[132]) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} ${ctx.getVarName("CALL", PLAYER)}에게 어린아이처럼 양 다리를 안아올려진채로 오줌을 싸기 시작했다…`);
    } else {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 수치심에 뺨을 붉히면서, 그 자리에 주저앉아 오줌을 싸기 시작했다…`);
    }
  } else if (SELECTCOM === 87) {
    ctx.showMessage(`${ctx.josaHelper("플레이어는")} ${ctx.getVarName("CALL", TARGET)}의`);
    if (P === 1) {
      if (ctx.params[5] >= PALAMLV[4]) {
        ctx.print('발기한');
      } else if (ctx.abilities[1] >= 4) {
        ctx.print('민감한');
      } else if (ctx.talents[132]) {
        ctx.print('어린');
      }
      ctx.print('양 유두');
    } else if (P === 2) {
      ctx.print('배꼽');
    } else if (P === 4) {
      if (ctx.params[5] >= PALAMLV[4]) {
        ctx.print('음란하게 떨리는');
      } else if (ctx.abilities[2] >= 4) {
        ctx.print('민감한');
      } else if (ctx.talents[132]) {
        ctx.print('어린');
      }
      ctx.print('좌우의 소음순');
    } else if (P === 8) {
      if (ctx.params[5] >= PALAMLV[4]) {
        ctx.print('발기한');
      } else if (ctx.abilities[0] >= 4) {
        ctx.print('민감한');
      } else if (ctx.talents[132]) {
        ctx.print('작은');
      }
      if (ctx.talents[121] || ctx.talents[122]) {
        ctx.print('페니스');
      } else {
        ctx.print('클리토리스');
      }
    } else if (P === 16) {
      ctx.print('혀 끝');
    }
    if (character.cflags[7] & P) {
      ctx.showMessage(`W 에서 피어스를 빼냈다…`);
    } else {
      ctx.showMessage(`W 에 피어싱했다…`);
    }
  } else if (SELECTCOM === 88) {
    if (character.equipment[44]) {
      ctx.showMessage(`다리를 벌리고 성기를 내밀어 ${ctx.getVarName("CALL", TARGET)}의`);
    } else if (ctx.abilities[10] >= 3 && ctx.abilities[17] >= 4) {
      ctx.showMessage(`스스로 조르듯이 다리를 벌리고 성기를 내밀어 ${ctx.getVarName("CALL", TARGET)}의`);
    } else {
      ctx.showMessage(`다리를 벌리게 한 ${ctx.getVarName("CALL", TARGET)}의`);
    }
    if (character.cflags[6] > 12) {
      ctx.print('우거진');
    }
    ctx.showMessage(`음모를, ${ctx.josaHelper("플레이어는")} 깨끗하게 깎아냈다…`);
  } else if (SELECTCOM === 89) {
    if (character.cflags[42] === 11 && (character.cflags[40] & 64)) {
      await print_clothtype_special(ctx, character);
    } else {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}`);
    }
    if ((character.cflags[42] != 11 || (character.cflags[40] & 64) == 0) && character.equipment[89]) {
      ctx.print('의 몸');
    }
    if (character.equipment[89]) {
      ctx.showMessage(`에게서 개를 떼어놓았다…`);
    } else {
      ctx.showMessage(`에게 개를 밀어붙였다…`);
    }
  } else if (SELECTCOM === 143) {
    ctx.showMessage(`${ctx.josaHelper("플레이어는")} %조사처리(CALLNAME,"를")% 붙잡고`);
    if (character.equipment[44] == 1) {
      ctx.showMessage(`꽉 묶여 조이는`);
    }
    if (ctx.talents[110]) {
      ctx.print('풍만한 유방');
    } else if (ctx.talents[114]) {
      ctx.print('너무 풍만한 유방');
    }
    ctx.showMessage(`의 틈새에 페니스를 집어넣고`);
    ctx.showMessage(`부드럽고 따뜻한 가슴에 빨려들어가듯 허리를 흔들었다……`);
  } else if (SELECTCOM === 90) {
    if (ctx.talents[122]) {
      ctx.saveStr[2] = "음경을 문지르고";
      ctx.saveStr[3] = "수컷";
    } else if (ctx.talents[121] === 0) {
      ctx.saveStr[2] = "비부를 만지작거리고";
      ctx.saveStr[3] = "암컷";
    } else if (ctx.talents[121] === 1) {
      ctx.saveStr[2] = "발기한 후타나리 페니스를 문지르며 비부를 만지작거리고";
      ctx.saveStr[3] = "암컷";
    }
    if (A < V) {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}에게 자위를 명령해보았지만 거부당했다. 좀 더 지도할 필요가 있다.`);
    } else if (A > V && A < 50) {
      ctx.showMessage(`${ctx.josaHelper("플레이어가")} 자위를 명령하자, ${ctx.josaHelper("타겟은")}`);
      if (character.cflags[40] & 8) {
        await print_clothtype_main2(ctx, character);
        ctx.print('의 앞을 올려 성기를 드러내고');
      }
      if (ctx.talents[15]) {
        ctx.print('자존심은 굽히지 않고');
      }
      if (ctx.talents[22]) {
        ctx.print('무표정한 얼굴로 묵묵히');
      } else if (ctx.talents[10] || ctx.talents[14]) {
        ctx.print('떨리는 손 끝으로');
      } else if (ctx.talents[11]) {
        ctx.print('반항적으로 노려봤지만');
      } else if (ctx.talents[12]) {
        ctx.print('굴욕으로 입술을 깨물고');
      } else if (ctx.talents[35]) {
        ctx.print('수치심에 귀까지 완전히 빨개져');
      }
      if (character.equipment[53]) {
        ctx.print('비디오카메라 앞에서');
      }
      if (ctx.params[5] >= PALAMLV[3]) {
        ctx.print('발기한');
      }
      ctx.showMessage('클리토리스에 진동하는 로터를 대고 자위를 시작했다.');
    } else if (A >=50 && A < 80) {
      ctx.showMessage(`지도의 성과인지, ${ctx.josaHelper("타겟은")} ${ctx.getVarName("CALL", PLAYER)}의 명령에 복종해 자위를 시작했다.`);
    } else if (A >= 80) {
      ctx.showMessage(`${ctx.josaHelper("플레이어가")} 명령하자 기뻐하며, ${ctx.josaHelper("타겟은")} 완전히 사육된 %SAVESTR:3%의 표정으로 자위를 시작했다.`);
    }
    if (character.equipment[11] && character.equipment[13] && ctx.abilities[2] >= 5 && ctx.abilities[3] >= 5 && ctx.abilities[0] >= 5 && ctx.abilities[1] >= 5 && ctx.params[5] >= PALAMLV[4] && PREVCOM === 3) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 침을 흘리며, 움찔움찔 몸을 떨면서 울고 있다`);
      ctx.showMessage(`절정이 멈추지 않아 계속해서 가고 있는 것 같다…`);
    } else if (character.equipment[11] && ctx.abilities[2] >= 5 && ctx.abilities[0] >= 5 && ctx.abilities[1] >= 5 && ctx.params[5] >= PALAMLV[4] && PREVCOM === 3) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 애액이 흩날리는 것도 신경쓰지 않고, 바이브를 격렬하게 움직이고 있다.`);
      ctx.showMessage(`이제는 다른 일을 신경쓸 여유도 없는 것 같다…`);
    } else if (character.equipment[13] && ctx.abilities[3] >= 5 && ctx.abilities[0] >= 5 && ctx.abilities[1] >= 5 && ctx.params[5] >= PALAMLV[4] && PREVCOM === 3) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 부들부들 몸을 떨면서, 아누스에 바이브를 삽입하고 있다`);
      ctx.showMessage(`주름을 밀고 들어올때마다 몇번이나 절정에 도달해버리는 것 같다…`);
    } else if (ctx.abilities[10] >= 3 && ctx.abilities[0] >= 5 && ctx.abilities[1] >= 5 && ctx.params[5] >= PALAMLV[4] && PREVCOM === 3) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 교성을 흘리며 일심분란하게 자신의 %SAVESTR:2% 있다`);
      ctx.showMessage(`멈추고 싶어도 손이 멋대로 움직여 멈춰지지 않는 것 같다…`);
    }
    ctx.saveStr[2] = STR[0];
    ctx.saveStr[3] = STR[0];
  } else if (SELECTCOM === 91) {
    if (ctx.talents[122]) {
      ctx.saveStr[2] = "음경을 문지르고";
      ctx.saveStr[3] = "수컷";
    } else if (ctx.talents[121] === 0) {
      ctx.saveStr[2] = "비부를 만지작거리고";
      ctx.saveStr[3] = "암컷";
    } else if (ctx.talents[121] === 1) {
      ctx.saveStr[2] = "발기한 후타나리 페니스를 문지르며 비부를 만지작거리고";
      ctx.saveStr[3] = "암컷";
    }
    if (A < V) {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}에게 자위를 명령해보았지만 거부당했다. 좀 더 지도할 필요가 있다.`);
    } else if (A > V && A < 50) {
      ctx.showMessage(`${ctx.josaHelper("플레이어가")} 자위를 명령하자, ${ctx.josaHelper("타겟은")}`);
      if (character.cflags[40] & 8) {
        await print_clothtype_main2(ctx, character);
        ctx.print('의 앞을 올려 성기를 드러내고');
      }
      if (ctx.talents[15]) {
        ctx.print('자존심은 굽히지 않고');
      }
      if (ctx.talents[22]) {
        ctx.print('무표정한 얼굴로 묵묵히');
      } else if (ctx.talents[10] || ctx.talents[14]) {
        ctx.print('떨리는 손 끝으로');
      } else if (ctx.talents[11]) {
        ctx.print('반항적으로 노려봤지만');
      } else if (ctx.talents[12]) {
        ctx.print('굴욕으로 입술을 깨물고');
      } else if (ctx.talents[35]) {
        ctx.print('수치심에 귀까지 완전히 빨개져');
      }
      if (character.equipment[53]) {
        ctx.print('비디오카메라 앞에서');
      }
      if (ctx.talents[121] || ctx.talents[122]) {
        ctx.print('고간');
      } else {
        ctx.print('비소');
      }
      ctx.showMessage('에 진동하는 전동마사지기를 대고 자위를 시작했다.');
    } else if (A >=50 && A < 80) {
      ctx.showMessage(`지도의 성과인지, ${ctx.josaHelper("타겟은")} ${ctx.getVarName("CALL", PLAYER)}의 명령에 복종해 자위를 시작했다.`);
    } else if (A >= 80) {
      ctx.showMessage(`${ctx.josaHelper("플레이어가")} 명령하자 기뻐하며, ${ctx.josaHelper("타겟은")} 완전히 사육된 %SAVESTR:3%의 표정으로 자위를 시작했다.`);
    }
    if (character.equipment[11] && character.equipment[13] && ctx.abilities[2] >= 5 && ctx.abilities[3] >= 5 && ctx.abilities[0] >= 5 && ctx.abilities[1] >= 5 && ctx.params[5] >= PALAMLV[4] && PREVCOM === 3) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 침을 흘리며, 움찔움찔 몸을 떨면서 울고 있다`);
      ctx.showMessage(`절정이 멈추지 않아 계속해서 가고 있는 것 같다…`);
    } else if (character.equipment[11] && ctx.abilities[2] >= 5 && ctx.abilities[0] >= 5 && ctx.abilities[1] >= 5 && ctx.params[5] >= PALAMLV[4] && PREVCOM === 3) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 애액이 흩날리는 것도 신경쓰지 않고, 바이브를 격렬하게 움직이고 있다.`);
      ctx.showMessage(`이제는 다른 일을 신경쓸 여유도 없는 것 같다…`);
    } else if (character.equipment[13] && ctx.abilities[3] >= 5 && ctx.abilities[0] >= 5 && ctx.abilities[1] >= 5 && ctx.params[5] >= PALAMLV[4] && PREVCOM === 3) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 부들부들 몸을 떨면서, 아누스에 바이브를 삽입하고 있다`);
      ctx.showMessage(`주름을 밀고 들어올때마다 몇번이나 절정에 도달해버리는 것 같다…`);
    } else if (ctx.abilities[10] >= 3 && ctx.abilities[0] >= 5 && ctx.abilities[1] >= 5 && ctx.params[5] >= PALAMLV[4] && PREVCOM === 3) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 교성을 흘리며 일심분란하게 자신의 %SAVESTR:2% 있다`);
      ctx.showMessage(`멈추고 싶어도 손이 멋대로 움직여 멈춰지지 않는 것 같다…`);
    }
    ctx.saveStr[2] = STR[0];
    ctx.saveStr[3] = STR[0];
  } else if (SELECTCOM === 92) {
    if ((character.cflags[40] & 64) && character.cflags[42] <= 50) {
      await print_clothtype_special(ctx, character);
      ctx.print('너머로,');
    } else if (character.cflags[40] & 28) {
      await print_clothtype_main2(ctx, character);
      ctx.print('너머로,');
    } else if ((character.cflags[40] & 2)) {
      ctx.print('속옷 너머로,');
    }
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의`);
    if (ctx.talents[116]) {
      ctx.print('완전히 평평한');
    } else if (ctx.talents[100] && ctx.talents[109]) {
      ctx.print('간신히 부푼 것을 알 수 있을 정도의');
    } else if (ctx.talents[109]) {
      ctx.print('표준보다 약간 작은');
    } else if (ctx.talents[110] && character.equipment[89] === 0) {
      ctx.print('손에서 넘쳐흐를 것 같은');
    } else if (ctx.talents[114]) {
      ctx.print('한 쪽 가슴만으로도 넘쳐흐를 것 같은');
    }
    ctx.showMessage('가슴에 진동하는 로터를 꽉 눌렀다…');
  } else if (SELECTCOM === 100) {
    if (character.equipment[90]) {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}에게서 때어내 우리에 넣었다…`);
    } else {
      ctx.showMessage(`${ctx.josaHelper("플레이어가")} 조종하는 이형의 촉수가,`);
      if (character.cflags[42] === 11 && (character.cflags[40] & 64)) {
        await print_clothtype_special(ctx, character);
      } else {
        ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 몸`);
      }
      ctx.showMessage(`에 달라붙었다…`);
    }
  } else if (SELECTCOM === 101) {
    if (character.equipment[11]) {
      ctx.showMessage(`촉수가 ${ctx.getVarName("CALL", TARGET)}의 성기에서 뽑아내졌다`);
    } else {
      if (character.cflags[42] === 11 && (character.cflags[40] & 64)) {
        ctx.showMessage(`촉수 무리는`);
        await print_clothtype_special(ctx, character);
        ctx.showMessage(`의 틈새를 파고들어,`);
      }
      ctx.showMessage(`세세한 돌기로 덮인 촉수가 ${ctx.getVarName("CALL", TARGET)}의 성기를 파고 들었다`);
    }
  } else if (SELECTCOM === 102) {
    if (character.equipment[13]) {
      ctx.showMessage(`촉수는 ${ctx.getVarName("CALL", TARGET)}의 아누스에서 뽑아내졌다`);
    } else {
      if (character.cflags[42] === 11 && (character.cflags[40] & 64)) {
        ctx.showMessage(`촉수 무리는`);
        await print_clothtype_special(ctx, character);
        ctx.showMessage(`의 틈새를 파고들어,`);
      }
      ctx.showMessage(`장대한 촉수가 ${ctx.getVarName("CALL", TARGET)}의 애널에 파고들었다`);
    }
  } else if (SELECTCOM === 103) {
    if (character.equipment[14]) {
      ctx.showMessage(`촉수는 ${ctx.getVarName("CALL", TARGET)}의 클리 고문을 중단했다`);
    } else {
      if (character.cflags[42] === 11 && (character.cflags[40] & 64)) {
        ctx.showMessage(`촉수 무리는`);
        await print_clothtype_special(ctx, character);
        ctx.showMessage(`의 틈새를 파고들어,`);
      }
      ctx.showMessage(`세세하게 뻗은 촉수가 ${ctx.getVarName("CALL", TARGET)}의 클리토리스를 괴롭히기 시작했다`);
    }
  } else if (SELECTCOM === 104) {
    if (character.equipment[15]) {
      ctx.showMessage(`촉수는 ${ctx.getVarName("CALL", TARGET)}의 유두에서 떨어졌다`);
    } else {
      if (character.cflags[42] === 11 && (character.cflags[40] & 64)) {
        ctx.showMessage(`촉수 무리는`);
        await print_clothtype_special(ctx, character);
        ctx.showMessage(`의 틈새를 파고들어,`);
      }
      ctx.showMessage(`세세하게 꿈틀거리는 촉수가 ${ctx.getVarName("CALL", TARGET)}의 유두를 만지작거리기 시작했다`);
    }
  } else if (SELECTCOM === 105) {
    if (character.equipment[16]) {
      ctx.showMessage(`촉수는 ${ctx.getVarName("CALL", TARGET)}의 유두를 해방했다`);
    } else {
      if (character.cflags[42] === 11 && (character.cflags[40] & 64)) {
        ctx.showMessage(`촉수 무리는`);
        await print_clothtype_special(ctx, character);
        ctx.showMessage(`의 틈새를 파고들어,`);
      }
      ctx.showMessage(`흡착성있는 촉수가 ${ctx.getVarName("CALL", TARGET)}의 유두를 빨아들이기 시작했다`);
    }
  } else if (SELECTCOM === 106) {
    if (character.equipment[44]) {
      ctx.showMessage(`촉수는 ${ctx.getVarName("CALL", TARGET)}의 구속을 풀었다`);
    } else {
      if (character.cflags[42] === 11 && (character.cflags[40] & 64)) {
        ctx.showMessage(`촉수 무리는`);
        await print_clothtype_special(ctx, character);
        ctx.showMessage(`의 틈새를 파고들어,`);
      }
      ctx.showMessage(`무수한 촉수가 ${ctx.getVarName("CALL", TARGET)}의 몸을 묶었다`);
    }
  } else if (SELECTCOM === 107) {
    if (character.equipment[46]) {
      ctx.showMessage(`촉수가 빼내어지자 ${ctx.josaHelper("타겟은")} 오물을 항문에서 흩뿌렸다`);
    } else {
      if (character.cflags[42] === 11 && (character.cflags[40] & 64)) {
        ctx.showMessage(`촉수 무리는`);
        await print_clothtype_special(ctx, character);
        ctx.showMessage(`의 틈새를 파고들어,`);
      }
      ctx.showMessage(`극태의 촉수가 ${ctx.getVarName("CALL", TARGET)}의 국혈을 막아, 체액을 흘려넣었다`);
    }
  } else if (SELECTCOM === 108) {
    if (character.equipment[98]) {
      ctx.showMessage(`촉수는 ${ctx.getVarName("CALL", TARGET)}의 입에서 뽑아졌다`);
    } else {
      if (character.cflags[42] === 11 && (character.cflags[40] & 64)) {
        ctx.showMessage(`촉수 무리는`);
        await print_clothtype_special(ctx, character);
        ctx.showMessage(`의 틈새를 파고들어,`);
      }
      ctx.showMessage(`젖어서 빛나는 촉수가 ${ctx.getVarName("CALL", TARGET)}의 입안을 파고들었다`);
    }
  } else if (SELECTCOM === 109) {
    if (character.equipment[17]) {
      ctx.showMessage(`촉수는 ${ctx.getVarName("CALL", TARGET)}의 페니스를 해방했다`);
    } else {
      if (character.cflags[42] === 11 && (character.cflags[40] & 64)) {
        ctx.showMessage(`촉수 무리는`);
        await print_clothtype_special(ctx, character);
        ctx.showMessage(`의 틈새를 파고들어,`);
      }
      ctx.showMessage(`음란하게 진동하고 있는 촉수 무리가 ${ctx.getVarName("CALL", TARGET)}의 페니스를 휘어감고, 일제히 문질러대기 시작했다`);
    }
  } else if (SELECTCOM === 120) {
    if (PREVCOM === 34 && character.tflags[899] === 0) {
      ctx.showMessage(`W ${ctx.josaHelper("타겟은")} 상체를 크게 움직여, 질내의 천장에 페니스를 찔러댔다…`);
      if (ctx.exp[0] <= 30) {
        ctx.showMessage(`W ${ctx.josaHelper("타겟은")} 당황하면서도 행위를 계속하고 있다…`);
      } else if (ctx.exp[0] <= 50) {
        ctx.showMessage(`W ${ctx.josaHelper("타겟은")} 쾌감을 쫓아 허리를 계속해서 흔들고 있다…`);
      } else if (ctx.exp[0] <= 80) {
        ctx.showMessage(`W ${ctx.josaHelper("타겟은")} 엉덩이를 움츠리고, 조금씩 허리를 흔들며 교성을 지르고 있다…`);
      } else if (ctx.exp[0] <= 120) {
        ctx.showMessage(`${ctx.josaHelper("타겟은")} 뒤쪽에 손을 대고, 허리를 부들부들 떨며 쾌락을 탐내고 있다…`);
        ctx.showMessage(`W 페니스 끝이, 날카롭게 G스팟을 찌르고 있다…`);
      } else {
        ctx.showMessage(`${ctx.josaHelper("타겟은")} 여자의 급소를, 스스로의 허리 움직임으로 마음껏 자극하고 있다…`);
        ctx.showMessage(`W 무거운 물소리가 들릴때마다, 콧소리와함께 단정치 못한 소리가 새어나오고 있다…`);
      }
    } else {
      if (PREVCOM === 20) {
        ctx.showMessage(`W 허리를 움직여, ${ctx.getVarName("CALL", TARGET)}의 질내의 천장을 조금씩 문질러주었다…`);
      } else if (PREVCOM === 21) {
        ctx.showMessage(`W 상체를 구부려, ${ctx.getVarName("CALL", TARGET)}의 천장을 파내듯이 찔러넣었다…`);
      } else if (PREVCOM === 22) {
        ctx.showMessage(`W 상체를 떼어놓고, ${ctx.getVarName("CALL", TARGET)}의 아랫배를 눌러 질내의 천장을 문질러주었다…`);
      } else if (PREVCOM === 23) {
        ctx.showMessage(`W ${ctx.josaHelper("타겟을")} 들어올려, 흔들듯이 질내의 천장을 집요하게 자극했다…`);
      }
      if (character.tflags[899] === 0) {
        if (ctx.exp[0] <= 30) {
          ctx.showMessage(`W ${ctx.josaHelper("타겟은")} 조심조심 허리를 흔들고 있다…`);
        } else if (ctx.exp[0] <= 50) {
          ctx.showMessage(`W ${ctx.josaHelper("타겟은")} 입을 다물고 서투른 쾌락에 견디고 있다…`);
        } else if (ctx.exp[0] <= 80) {
          ctx.showMessage(`W ${ctx.josaHelper("타겟은")} 약점을 괴롭혀져, 지나친 쾌감에 눈을 떨고 있다…`);
        } else if (ctx.exp[0] <= 120) {
          ctx.showMessage(`${ctx.josaHelper("플레이어는")} 허리에 힘을 써, 질내에서 부들부들 떨게 했다…`);
          ctx.showMessage(`W ${ctx.josaHelper("타겟은")} 과민한 천장을 문질러지는 감촉에 뜨거운 숨을 흘리고 있다…`);
        } else {
          ctx.showMessage(`${ctx.josaHelper("타겟은")} 넘쳐나는 침을 삼키며, 발가락을 만채로 머리를 흔들며 괴로워하고 있다…`);
          ctx.showMessage(`W 제대로 호흡조차 하지 못하고, 온전한 소리도 되지 않는 허덕임을 반복한다…`);
        }
      }
    }
  } else if (SELECTCOM === 121) {
    if (PREVCOM === 34 && character.tflags[899] === 0) {
      ctx.showMessage(`W ${ctx.josaHelper("타겟은")} ${ctx.getVarName("CALL", PLAYER)}의 가슴을 껴안고, 페니스를 뿌리까지 삼켰다…`);
      if (ctx.exp[0] <= 30) {
        ctx.showMessage(`W ${ctx.josaHelper("타겟은")} 그대로 허리를 앞뒤로 흔들고 있다…`);
      } else if (ctx.exp[0] <= 50 && ctx.talents[121]) {
        ctx.showMessage(`W ${ctx.josaHelper("타겟은")} ${ctx.getVarName("CALL", PLAYER)}의 배에 페니스를 꽉 누르고 있다…`);
      } else if (ctx.exp[0] <= 50) {
        ctx.showMessage(`W ${ctx.josaHelper("타겟은")} ${ctx.getVarName("CALL", PLAYER)}의 음모로 클리토리스를 자극하고 있는 것 같다…`);
      } else if (ctx.exp[0] <= 80) {
        ctx.showMessage(`W ${ctx.josaHelper("타겟은")} 허리를 흔들며, 삽입감을 즐기며 뜨거운 숨을 토하고 있다…`);
      } else if (ctx.exp[0] <= 120) {
        ctx.showMessage(`${ctx.josaHelper("타겟은")} 쿵, 쿵하고 허리를 떨어트리며, 깊은 곳을 찌르는 감촉에 취하고 있다…`);
        ctx.showMessage(`W 탄력있는 자궁구가 터져, 황홀함과 함께 아이를 임신할 준비를 시작하고 있다…`);
      } else {
        ctx.showMessage(`${ctx.josaHelper("타겟은")} 리드미컬하게 허리를 세로로 흔들며, 암컷 그 자체인 얼굴로 침을 흘리고 있다…`);
        ctx.showMessage(`W 아이 만들기의 쾌락에 이성은 녹아버려, 암컷의 육체는 아이를 요구하며 탐욕으로 휘청이고 있다…`);
      }
    } else {
      if (PREVCOM == 20) {
        ctx.showMessage(`W 허리를 붙잡고 깊게 찔러, ${ctx.getVarName("CALL", TARGET)}의 자궁구를 때렸다…`);
      }
      if (PREVCOM == 21) {
        ctx.showMessage(`W 엉덩이를 붙잡고 깊게 찔러, ${ctx.getVarName("CALL", TARGET)}의 자궁구를 때렸다…`);
      }
      if (PREVCOM == 22) {
        ctx.showMessage(`W 허리를 깊게 안고, ${ctx.getVarName("CALL", TARGET)}의 자궁을 빙글빙글 괴롭히며 자극했다…`);
      }
      if (PREVCOM == 23) {
        ctx.showMessage(`W 허리를 앞으로 꽉 누르듯이해서, ${ctx.getVarName("CALL", TARGET)}의 깊은 곳까지 찔러올렸다…`);
      }
      if (PREVCOM === 612) {
        ctx.showMessage(`${ctx.josaHelper("플레이어는")} 거울 앞에서 ${ctx.getVarName("CALL", PLAYER)}의 치태를 보이듯이,`);
        ctx.showMessage(`W 허리를 앞으로 꽉 누르듯이해서, ${ctx.getVarName("CALL", TARGET)}의 깊은 곳까지 찔러올렸다…`);
      }
      if (ctx.exp[0] <= 30 || (ctx.exp[0] >= 31 && ctx.exp[0] <= 50 && (PREVCOM === 21 || PREVCOM === 612))) {
        ctx.showMessage(`W ${ctx.josaHelper("타겟은")} 이물감이 강한것인지, 괴로워하고 있는 것 같다…`);
      } else if (ctx.exp[0] <= 50 && ctx.talents[121]) {
        ctx.showMessage(`W ${ctx.josaHelper("타겟은")} 음모와 배꼽을 페니스로 희롱당해, 콧소리를 흘리고 있다…`);
      } else if (ctx.exp[0] <= 50) {
        ctx.showMessage(`W ${ctx.josaHelper("타겟은")} 음모에 클리토리스를 문질러져, 콧소리를 흘리고 있다…`);
      } else if (ctx.exp[0] <= 80) {
        ctx.showMessage(`W ${ctx.josaHelper("타겟은")} 길고 달콤한 한숨을 내쉬며, 삽입감에 이를 꽉 물고 있다…`);
      } else if (ctx.exp[0] <= 120) {
        ctx.showMessage(`의 자궁이 자식을 받아들일 준비를 마친 것 처럼, 끝 부분의 굴곡이 질 안쪽으로 안내한다…`);
        ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)}의 자궁을 노크할 때마다, 입을 뻐끔뻐끔하며 격렬하게 떨고 있다…`);
      } else {
        ctx.showMessage(`낮은 위치로 내려온 ${ctx.getVarName("CALL", TARGET)}의 자궁을 찌르며 흔들면,`);
        ctx.showMessage(`W ${ctx.josaHelper("타겟은")} 미친듯이 괴로워하며, 암컷으로서 최고의 쾌락에 빠졌다…`);
      }
    }
  } else if (SELECTCOM === 122) {
    if (ctx.params[3] > PALAMLV[3]) {
      ctx.showMessage(`${ctx.josaHelper("플레이어는")} ${ctx.getVarName("CALL", TARGET)}의 쿠퍼액으로 젖어 흔들리는 페니스와 당신의 페니스를 문질러댔다`);
    } else {
      ctx.showMessage(`${ctx.josaHelper("플레이어는")} ${ctx.josaHelper("타겟과")} 딱딱하게 발기한 페니스를 서로 문질러댔다`);
    }
  } else if (SELECTCOM === 123) {
    ctx.showMessage(`${ctx.josaHelper("타겟은")}`);
    if (ctx.talents[85]) {
      ctx.print('황홀한 표정을 지으며');
    }
    if (ctx.talents[109]) {
      ctx.showMessage('평평한 가슴에 페니스를 문지르며, 귀두를 혀로 핥았다…');
    } else if (ctx.talents[110]) {
      ctx.showMessage('페니스를 풍만한 가슴으로 감싸고, 머리를 드러낸 페니스를 빨며 자극하고 있다…');
    } else if (ctx.talents[114]) {
      ctx.showMessage('너무 풍만한 가슴으로 페니스를 감싸 숨겨버려, 자신의 가슴에 얼굴을 파묻고 페니스를 빨고 있다…');
    } else {
      ctx.showMessage('가슴에 페니스를 끼우고, 페니스를 빨며 자극하고 있다…');
    }
  } else if (SELECTCOM === 124) {
    ctx.showMessage(`${ctx.josaHelper("타겟은")}`);
    if (ctx.talents[85]) {
      ctx.print('황홀한 표정을 지으며');
    }
    if (ctx.talents[52]) {
      ctx.print('혀로 막대를 휘어감고');
    }
    ctx.print('목 안쪽까지 페니스를 삼키고');
    if (ctx.talents[16] >= 3) {
      ctx.showMessage('음탕한 소리를 내며 깊은 스트로크로 자극했다…');
    } else {
      ctx.showMessage('있다…');
    }
  } else if (SELECTCOM === 125) {
    ctx.showMessage(`${ctx.josaHelper("타겟은")}`);
    if (ctx.talents[85]) {
      ctx.print('달아오른 표정으로');
    }
    if (ctx.talents[76]) {
      ctx.print('음탕한 표정으로');
    }
    if (ctx.talents[52]) {
      ctx.print('혀로 막대를 휘어감고');
    }
    ctx.print('페니스를 삼킨채로 자신의');
    if (character.equipment[11] && character.equipment[13]) {
      ctx.showMessage('비부와 애널에 삽입된 바이브를 움직였다…');
    } else if (character.equipment[11]) {
      ctx.showMessage('비부에 삽입된 바이브를 움직였다…');
    } else if (character.equipment[13]) {
      ctx.showMessage('애널에 삽입된 바이브를 움직였다…');
    } else {
      if (ctx.talents[122]) {
        ctx.showMessage('음경을 문질렀다…');
      } else {
        ctx.showMessage('비부를 만지작거렸다…');
      }
    }
  } else if (SELECTCOM === 126) {
    ctx.showMessage(`${ctx.josaHelper("타겟은")}`);
    if (ctx.talents[85]) {
      ctx.print('황홀한 표정으로');
    }
    if (ctx.talents[52]) {
      ctx.print('혀로 막대를 휘어감고');
    }
    if (ctx.getTalent(player, 122)) {
      ctx.showMessage('페니스를 빨면서 다른 한 쪽 손으로 구슬을 만지고, 또 다른 한 손으로는 장대의 뿌리를 훑었다…');
    } else {
      ctx.showMessage('페니스를 빨면서 장대의 뿌리를 훑었다…');
    }
  } else if (SELECTCOM === 127) {
    ctx.showMessage(`${ctx.josaHelper("타겟은")} ${ctx.getVarName("CALL", PLAYER)}의 귀두를 혀로`);
    if (ctx.talents[52]) {
      ctx.print('빨아돌리며,');
    } else {
      ctx.print('빨아올리며,');
    }
    ctx.print('뺨을 움츠린채로 음란한 소리를 지르면서,');
    if (ctx.abilities[12] >= 4 && ctx.abilities[13] >= 3) {
      ctx.print('허리가 빠질지도 모른다고 생각할만큼');
    }
    ctx.showMessage('강하게 빨았다…');
  } else if (SELECTCOM === 128) {
    ctx.showMessage(`${ctx.josaHelper("타겟을")} 꿰뚫은채로 겹치듯이 몸을 넘어뜨려, 입술을 겹치고 혀를 섞었다…`);
  } else if (SELECTCOM === 129) {
    ctx.showMessage(`${ctx.josaHelper("타겟을")} 꿰뚫은채로`);
    if (ctx.talents[110] || ctx.talents[114]) {
      ctx.print('탄력있게 흔들리는 유방을');
    } else if (ctx.talents[109]) {
      ctx.print('작은 가슴을');
    } else {
      ctx.print('흔들리는 가슴을');
    }
    ctx.showMessage('주물렀다…');
  } else if (SELECTCOM === 130) {
    ctx.showMessage(`${ctx.josaHelper("타겟과")} 겹치듯이 몸을 넘어뜨리고, 입술을 겹치며 혀를 섞어,`);
    if (ctx.talents[110] || ctx.talents[114]) {
      ctx.print('탄력있게 흔들리는 유방을 주무르며');
    } else if (ctx.talents[109]) {
      ctx.print('작은 가슴을 만지작거리며');
    } else {
      ctx.print('흔들리는 가슴을 주무르며');
    }
    if (ctx.talents[85] || ctx.talents[90]) {
      ctx.print('양손의 손가락을 서로 얽히도록 잡고,');
    }
    ctx.showMessage('파내듯이 허리를 흔들며 자궁을 찔렀다…'); ctx.waitInput();
    if (character.tflags[899] === 0) {
      if (ctx.exp[0] <= 30 || (ctx.exp[0] >= 31 && ctx.exp[0] <= 50)) {
        ctx.showMessage(`W ${ctx.josaHelper("타겟은")} 이물감이 강한것인지, 괴로워하고 있는 것 같다…`);
      } else if (ctx.exp[0] <= 50 && ctx.talents[121] && character.equipment[89] === 0) {
        ctx.showMessage(`W ${ctx.josaHelper("타겟은")} 음모와 배꼽을 페니스로 희롱당해, 콧소리를 흘리고 있다…`);
      } else if (ctx.exp[0] <= 50 && character.equipment[89] === 0) {
        ctx.showMessage(`W ${ctx.josaHelper("타겟은")} 음모에 클리토리스를 문질러져, 콧소리를 흘리고 있다…`);
      } else if (ctx.exp[0] <= 80) {
        ctx.showMessage(`W ${ctx.josaHelper("타겟은")} 길고 달콤한 한숨을 내쉬며, 삽입감에 이를 꽉 물고 있다…`);
      } else if (ctx.exp[0] <= 120) {
        ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 자궁이 자식을 받아들일 준비를 마친 것 처럼, 끝 부분의 굴곡이 질 안쪽으로 안내한다…`);
        ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)}의 자궁을 노크할 때마다, 입을 뻐끔뻐끔하며 격렬하게 떨고 있다…`);
      } else {
        ctx.showMessage(`낮은 위치로 내려온 ${ctx.getVarName("CALL", TARGET)}의 자궁을 찌르며 흔들면,`);
        ctx.showMessage(`${ctx.josaHelper("타겟은")}`);
        if (ctx.talents[85]) {
          ctx.print('눈망울에 눈물을 띄우고');
        }
        if (ctx.params[5] > PALAMLV[4]) {
          ctx.print('침을 흘리고');
        }
        if (ctx.params[3] > PALAMLV[4]) {
          ctx.print('새하얀 액체로 질을 채우며');
        }
        ctx.showMessage(`W 미친듯이 괴로워하며, 암컷으로서 최고의 쾌락에 빠졌다…`);
      }
    }
  } else if (SELECTCOM === 131) {
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의`);
    if (ctx.talents[110] || ctx.talents[114]) {
      ctx.print('탄력있게 흔들리는 유방을 뒤에서 덥석 쥐고 주물거리며');
    } else if (ctx.talents[109]) {
      ctx.print('작은 가슴을 뒤에서 만지작거리며');
    } else {
      ctx.print('흔들리는 가슴을 뒤에서 주무르며');
    }
    ctx.showMessage('허리를 쳐올렸다…');
  } else if (SELECTCOM === 132) {
    ctx.showMessage(`${ctx.josaHelper("타겟을")} 뒤에서 범하면서, 떨리는 엉덩이를 손으로 때렸다…`);
    if (character.tflags[899] === 0) {
      if (ctx.abilities[21] < 3) {
        ctx.showMessage(`${ctx.josaHelper("타겟은")} 둔부에 전해지는 고통에 얼굴을 찡그리며 범해지고 있다`);
      } else if (ctx.abilities[21] >= 3 && ctx.abilities[21] < 5) {
        ctx.showMessage(`${ctx.josaHelper("타겟은")} 얻어맞으면서도 비부가 흠뻑 젖어, 엉덩이를 흔들며 조르듯이 허리를 움직이며 스스로 쾌락을 탐내고 있다…`);
      } else {
        ctx.showMessage(`엉덩이를 새빨갛게 될 정도로 얻어맞아, ${ctx.josaHelper("타겟은")} 아픔과 질을 파내어지는 쾌락에 비명을 지르며 미친듯이 괴로워했다…`);
      }
    }
  } else if (SELECTCOM === 133) {
    ctx.showMessage(`삽입하고 있는 ${ctx.getVarName("CALL", TARGET)}의 상체를 일으켜, 뒤에서부터`);
    if (ctx.talents[110] || ctx.talents[114]) {
      ctx.showMessage('탄력있게 흔들리는 유방을 뒤에서 덥석 쥐고 주물거리며,');
    } else if (ctx.talents[109]) {
      ctx.showMessage('작은 가슴을 뒤에서 만지작거리며,');
    } else {
      ctx.showMessage('흔들리는 가슴을 뒤에서 주무르며,');
    }
    ctx.print('턱을 잡고 이 쪽을 뒤돌아보게 하고');
    if (ctx.talents[85]) {
      ctx.print('혀를 섞으며 농후한 키스를 하면서');
    } else {
      ctx.print('혀를 섞으며 입안을 유린하면서');
    }
    ctx.showMessage('허리를 찔러올렸다…');
  } else if (SELECTCOM === 134) {
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의`);
    if (ctx.talents[110] || ctx.talents[114]) {
      ctx.showMessage('탄력있게 흔들리는 유방을 뒤에서 덥석 쥐고 주물거리며,');
    } else if (ctx.talents[109]) {
      ctx.showMessage('작은 가슴을 뒤에서 만지작거리며,');
    } else {
      ctx.showMessage('흔들리는 가슴을 뒤에서 주무르며,');
    }
    ctx.print('턱을 잡고 이 쪽을 뒤돌아보게 하고');
    if (ctx.talents[85]) {
      ctx.print('혀를 섞으며 농후한 키스를 하면서');
    } else {
      ctx.print('혀를 섞으며 입안을 유린하면서');
    }
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 양 팔을 잡고 허리를 잡아 당기는 것 같은 자세로 페니스를 찔러올리며 자궁구를 괴롭혔다…`);
    if (character.tflags[899] === 0) {
      if (ctx.exp[0] <= 30 || (ctx.exp[0] >= 31 && ctx.exp[0] <= 50)) {
        ctx.showMessage(`W ${ctx.josaHelper("타겟은")} 이물감이 강한것인지, 괴로워하고 있는 것 같다…`);
      } else if (ctx.exp[0] <= 50 && ctx.talents[121]) {
        ctx.showMessage(`W ${ctx.josaHelper("타겟은")} 음모와 배꼽을 페니스로 희롱당해, 콧소리를 흘리고 있다…`);
      } else if (ctx.exp[0] <= 50) {
        ctx.showMessage(`W ${ctx.josaHelper("타겟은")} 음모에 클리토리스를 문질러져, 콧소리를 흘리고 있다…`);
      } else if (ctx.exp[0] <= 80) {
        ctx.showMessage(`W ${ctx.josaHelper("타겟은")} 길고 달콤한 한숨을 내쉬며, 삽입감에 이를 꽉 물고 있다…`);
      } else if (ctx.exp[0] <= 120) {
        ctx.showMessage(`자궁구가 자식을 받아들일 준비를 마친 것 처럼, 끝 부분의 굴곡이 질 안쪽으로 안내한다…`);
        ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)}의 자궁을 노크할 때마다, 입을 뻐끔뻐끔하며 격렬하게 떨고 있다…`);
      } else {
        ctx.showMessage(`낮은 위치로 내려온 ${ctx.getVarName("CALL", TARGET)}의 자궁을 찌르며 흔들면,`);
        ctx.showMessage(`${ctx.josaHelper("타겟은")}`);
        if (ctx.talents[85]) {
          ctx.print('눈망울에 눈물을 띄우고,');
        }
        if (ctx.params[5] > PALAMLV[4]) {
          ctx.print('침을 흘리고');
        }
        if (ctx.params[3] > PALAMLV[4]) {
          ctx.print('새하얀 액체로 질을 채우며');
        }
        ctx.showMessage(`W 미친듯이 괴로워하며, 암컷으로서 최고의 쾌락에 빠졌다…`);
      }
    }
    if (character.tflags[31] === 2) {
      character.tflags[31] = 1;
    } else {
      character.tflags[31] = 0;
    }
  } else if (SELECTCOM === 135) {
    if (character.equipment[55]) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")}`);
      if (ctx.assi >= 0) {
        ctx.showMessage(`${ctx.getVarName("CALL", ASSI)}의 얼굴 위에서 떨어졌다`);
      } else {
        ctx.showMessage(`${ctx.getVarName("CALL", PLAYER)}의 얼굴 위에서 떨어졌다`);
      }
    } else {
      ctx.showMessage(`${ctx.josaHelper("타겟은")}`);
      if (ctx.assi >= 0) {
        ctx.showMessage(`${ctx.getVarName("CALL", PLAYER)}의 얼굴에 자신의`);
        if (ctx.getTalent(target, 128) === 1) {
          ctx.showMessage('풍만한 엉덩이를 꽉 눌렀다');
        } else {
          ctx.showMessage('엉덩이를 꽉 눌렀다');
        }
      } else {
        ctx.showMessage(`${ctx.getVarName("CALL", PLAYER)}의 얼굴에 자신의`);
        if (ctx.getTalent(target, 128) === 1) {
          ctx.showMessage('풍만한 엉덩이를 꽉 눌렀다');
        } else {
          ctx.showMessage('엉덩이를 꽉 눌렀다');
        }
      }
    }
  } else if (SELECTCOM === 136) {
    ctx.showMessage(`${ctx.josaHelper("플레이어는")} ${ctx.getVarName("CALL", TARGET)}의 머리를 쓰다듬었다`);
    if (ctx.talents[85]) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 눈을 가늘게 뜨고 기뻐하고 있다`);
    }
  } else if (SELECTCOM === 137) {
    if (character.equipment[70]) {
      ctx.showMessage(`${ctx.josaHelper("타겟을")} 삼각목마에서 내려줬다…`);
    } else {
      ctx.showMessage(`${ctx.josaHelper("타겟을")} 삼각목마에 태우고 구속했다…`);
    }
  } else if (SELECTCOM === 150) {
    if (character.equipment[150]) {
      ctx.showMessage(`${ctx.josaHelper("플레이어가")} 술법을 해제하자 ${ctx.getVarName("CALL", TARGET)}에게 달라붙어있던 슬라임은 형체도 없이 사라졌다`);
    } else {
      if (ctx.player.no === 104) {
        ctx.showMessage(`${ctx.getVarName("CALL", PLAYER)}의 마력으로 생겨난 슬라임이 ${ctx.getVarName("CALL", TARGET)}에게 달라붙었다…`);
      } else {
        ctx.showMessage(`푸른 마술서의 마력으로 생겨난 슬라임이 ${ctx.getVarName("CALL", TARGET)}에게 달라붙었다…`);
      }
    }
  } else if (SELECTCOM === 151) {
    if (character.equipment[151]) {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 질내에 들어갔던 슬라임이 밖으로 나오기 시작했다…`);
    } else {
      ctx.showMessage(`슬라임이 ${ctx.getVarName("CALL", TARGET)}의 질내로 들어가 자극을 준다…`);
    }
  } else if (SELECTCOM === 152) {
    if (character.equipment[152]) {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 항문에 들어갔던 슬라임이 밖으로 나오기 시작했다…`);
    } else {
      ctx.showMessage(`슬라임이 ${ctx.getVarName("CALL", TARGET)}의 애널로 들어가 자극을 준다…`);
    }
  } else if (SELECTCOM === 153) {
    if (ctx.talents[122]) {
      ctx.saveStr[2] = "음경을 문지르고";
      ctx.saveStr[3] = "수컷";
    } else if (ctx.talents[121] === 0) {
      ctx.saveStr[2] = "비부를 만지작거리고";
      ctx.saveStr[3] = "암컷";
    } else if (ctx.talents[121] === 1) {
      ctx.saveStr[2] = "발기한 후타나리 페니스를 문지르며 비부를 만지작거리고";
      ctx.saveStr[3] = "암컷";
    }
    if (A < V) {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}에게 자위를 명령해보았지만 거부당했다. 좀 더 지도할 필요가 있다.`);
    } else if (A > V && A < 50) {
      ctx.showMessage(`${ctx.josaHelper("플레이어가")} 자위를 명령하자, ${ctx.josaHelper("타겟은")}`);
      if (character.cflags[40] & 8) {
        await print_clothtype_main2(ctx, character);
        ctx.print('의 앞을 올려 성기를 드러내고');
      }
      if (ctx.talents[15]) {
        ctx.print('자존심은 굽히지 않고');
      }
      if (ctx.talents[22]) {
        ctx.print('무표정한 얼굴로 묵묵히');
      } else if (ctx.talents[10] || ctx.talents[14]) {
        ctx.print('떨리는 손 끝으로');
      } else if (ctx.talents[11]) {
        ctx.print('반항적으로 노려봤지만');
      } else if (ctx.talents[12]) {
        ctx.print('굴욕으로 입술을 깨물고');
      } else if (ctx.talents[35]) {
        ctx.print('수치심에 귀까지 완전히 빨개져');
      }
      if (character.equipment[53]) {
        ctx.print('비디오카메라 앞에서');
      }
      ctx.showMessage('자위를 시작했다.');
    } else if (A >=50 && A < 80) {
      ctx.showMessage(`지도의 성과인지, ${ctx.josaHelper("타겟은")} ${ctx.getVarName("CALL", PLAYER)}의 명령에 복종해 자위를 시작했다.`);
    } else if (A >= 80) {
      ctx.showMessage(`${ctx.josaHelper("플레이어가")} 명령하자 기뻐하며, ${ctx.josaHelper("타겟은")} 완전히 사육된 %SAVESTR:3%의 표정으로 자위를 시작했다.`);
    }
    if (character.equipment[151] && character.equipment[152] && ctx.abilities[2] >= 5 && ctx.abilities[3] >= 5 && ctx.abilities[0] >= 5 && ctx.abilities[1] >= 5 && ctx.params[5] >= PALAMLV[4] && PREVCOM === 3) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 침을 흘리며, 움찔움찔 몸을 떨면서 울고 있다`);
      ctx.showMessage(`절정이 멈추지 않아 계속해서 가고 있는 것 같다…`);
    } else if (character.equipment[151] && ctx.abilities[2] >= 5 && ctx.abilities[0] >= 5 && ctx.abilities[1] >= 5 && ctx.params[5] >= PALAMLV[4] && PREVCOM === 3) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 애액이 흩날리는 것도 신경쓰지 않고, 슬라임이 벌리고 있는 질내를 손가락으로 해집고 있다`);
      ctx.showMessage(`이제는 다른 일을 신경쓸 여유도 없는 것 같다…`);
    } else if (character.equipment[152] && ctx.abilities[3] >= 5 && ctx.abilities[0] >= 5 && ctx.abilities[1] >= 5 && ctx.params[5] >= PALAMLV[4] && PREVCOM === 3) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 부들부들 몸을 떨면서, 슬라임이 벌리고 있는 애널을 손가락으로 해집고 있다`);
      ctx.showMessage(`주름을 밀고 들어올때마다 몇번이나 절정에 도달해버리는 것 같다…`);
    } else if (ctx.abilities[10] >= 3 && ctx.abilities[0] >= 5 && ctx.abilities[1] >= 5 && ctx.params[5] >= PALAMLV[4] && PREVCOM === 153) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 교성을 흘리며 달라붙는 슬라임은 신경도 안쓰고 일심분란하게 자신의 %SAVESTR:2% 있다`);
      ctx.showMessage(`멈추고 싶어도 손이 멋대로 움직여 멈춰지지 않는 것 같다…`);
    }
    ctx.saveStr[2] = STR[0];
    ctx.saveStr[3] = STR[0];
  } else if (SELECTCOM === 154) {
    if (character.equipment[154]) {
      ctx.showMessage(`슬라임은 ${ctx.getVarName("CALL", TARGET)}의 입에서 빠져나왔다…`);
    } else {
      ctx.showMessage(`슬라임은`);
      if (character.cflags[42] === 11 && (character.cflags[40] & 64)) {
        await print_clothtype_special(ctx, character);
        ctx.showMessage(`의 틈새를 파고들어`);
      }
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 입으로 들어갔다…`);
    }
  } else if (SELECTCOM === 138) {
    ctx.showMessage(`${ctx.josaHelper("타겟은")}`);
    if (ctx.talents[88]) {
      ctx.print('황홀한 표정으로');
    }
    ctx.showMessage(`엎드려있는 ${ctx.getVarName("CALL", PLAYER)}의 페니스를 문지르며, ${ctx.getVarName("CALL", PLAYER)}의`);
    if (ctx.abilities[ctx.player][3] >= 3) {
      ctx.showMessage(`쾌락으로 벌렁이는`);
    } else {
      ctx.showMessage(`단단히 닫힌`);
    }
    ctx.showMessage('연분홍색 구멍 안으로 혀를 넣었다…');
    if ((character.cflags[7] & 16)) {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 혀끝에 달린 피어스가 ${ctx.getVarName("CALL", PLAYER)}의`);
      if (ctx.getTalent(player, 122) === 1) {
        ctx.showMessage(`전립선`);
      } else {
        ctx.showMessage(`장벽`);
      }
      ctx.showMessage(`에 닿을때마다 ${ctx.josaHelper("플레이어는")} 신음소리를 냈다…`);
    }
  } else if (SELECTCOM === 180) {
    if (ctx.talents[121] === 0) {
      ctx.showMessage(`${ctx.getVarName("CALL", PLAYER)}에게 명령받아 ${ctx.josaHelper("타겟은")}`);
      ctx.showMessage(`자신의 음핵을 ${ctx.getVarName("CALL", TARGET)} 같은`);
      if (MAXctx.base[31] >= 120) {
        ctx.showMessage(`미`);
      }
      if (ctx.base[9] <= 19) {
        ctx.showMessage(`소녀`);
      } else {
        ctx.showMessage(`녀`);
      }
      ctx.showMessage(`에게는 어울리지 않는, 사정기능이 달린 육봉으로 구현화했다…`);
      if (ctx.params[0] > PALAMLV[3]) {
        ctx.showMessage(`클리토리스와 감각이 연결돼있는 구현화 페니스는 이미 혈관이 보일만큼 커져서,`);
        ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 열기를 보여주듯 귀두에선 카우퍼액을 흘리고 있었다`);
      }
    } else {
      ctx.showMessage(`${ctx.getVarName("CALL", PLAYER)}에게 명령받아 ${ctx.josaHelper("타겟은")}`);
      ctx.showMessage(`구현화시킨 페니스를 소거했다…`);
      if (ctx.abilities[38] >= 3) {
        ctx.showMessage(`가짜라도 사정의 쾌감을 기억해버린`);
        ctx.showMessage(`${ctx.josaHelper("타겟은")} 무의식적으로 페니스가 있었던 부분을 문지르고 있다`);
      }
    }
  }
  return 1;
}
