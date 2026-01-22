/**
 * EVENT_PARTICULAR_DAY.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function particular_date(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (DAY[1] === 2 && DAY[2] === 3) {
    await valentine_day(ctx, character);
  } else if (DAY[1] === 7 && DAY[2] === 3) {
    await summer_vacation1(ctx, character);
  }
  return 1;
}

export async function valentine_day(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  N = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else if (character.cflags[ctx.count][2] >= 200) {
      ctx.drawLine();
      N += 1;
      if (N < 4) {
        ctx.showMessage(`아침 식사를 마치고 방으로 돌아가던 중, ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "가")} ${ctx.josaHelper("플레이어를")} 불러 세웠다.`);
      } else {
        ctx.showMessage(`${ctx.josaHelper("플레이어가")} 오전의 예정을 생각하고 있을 때, ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "가")} 방을 노크했다.`);
      }
      if (character.cflags[ctx.count][2] >= 1000 && ctx.getTalent(count, 76)) {
        ctx.showMessage(`W 잠시 후에, 자신의 방으로 와달라는 것이었다.`);
        ctx.showMessage('');
        ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "가")} 말한대로 ${ctx.josaHelper("플레이어가")} 방에 들어가자,`);
        if ((ctx.abilities[ctx.count][21] === 3 && ctx.exp[ctx.count][51] >= 100) || (ctx.abilities[ctx.count][21] >= 4 && ctx.exp[ctx.count][51] >= 50)) {
          ctx.showMessage('리본으로 장식된 커다란 상자가 방 한가운데에 놓여져 있었다.');
          ctx.showMessage(`뚜껑을 열어 보니, 안에는 초콜릿으로 칠해진 ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "가")} 들어 있었다.`);
          ctx.showMessage(`스스로 묶은 것일까, ${ctx.getVarName("CALL", COUNT)}의 몸에는 리본이 몇 겹이나 감겨있고 황홀한 눈동자가 ${ctx.josaHelper("플레이어를")} 올려다보았다.`);
          if (ctx.getTalent(master, 83)) {
            ctx.showMessage(`W 질척질척 더러운 ${ctx.getVarName("CALL", COUNT)}의 피부를 구두로 사뿐히 즈려밟으니, ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "는")} 신음 소리를 내면서 고통의 쾌락에 숨이 가파라졌다…`);
            ctx.showMessage('');
            ctx.showMessage('피학쾌락경험 +2');
            ctx.exp[ctx.count][30] += 2;
          } else {
            ctx.showMessage(`W 손가락으로 ${ctx.getVarName("CALL", COUNT)}의 몸에 묻은 초콜릿을 떠올리자 그 자극으로 느껴버렸는지, ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "는")} 작게 허덕였다.`);
            ctx.showMessage('');
          }
          ctx.showMessage('긴박경험 +2');
          ctx.exp[ctx.count][51] += 2;
          ctx.showMessage('온순의 구슬 +500');
          ctx.juel[ctx.count][4] += 500;
          ctx.showMessage('욕정의 구슬 +200'); ctx.waitInput();
          ctx.juel[ctx.count][5] += 200;
        } else if ((character.cflags[ctx.count][41] === 0 && character.cflags[ctx.count][42] === 0) || ctx.flags[37] === 0 || ctx.abilities[ctx.count][17] >= 4) {
          ctx.showMessage(`알몸인 ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "가")} ${ctx.josaHelper("플레이어를")} 기다리고 있었다.`);
          if (ctx.abilities[ctx.count][17] >= 5 && ctx.abilities[ctx.count][2] >= 3) {
            ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "는")} M자 포즈로 양손으로 음순을 펼쳐 질에 넣은 초콜릿을 ${ctx.getVarName("CALL", MASTER)}에게 보여줬다.`);
            ctx.showMessage(`그 안을 손가락으로 초콜릿과 함께 휘저어 주면,  ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "는")} 수치와 쾌감으로 몸부림쳤다.`);
            ctx.showMessage(`초콜릿과 애액으로 더러워진 손가락을 ${ctx.getVarName("CALL", COUNT)}의 입가에 가져다대니, ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "는")} 황홀해하며 ${ctx.getVarName("CALL", MASTER)}의 손가락을 빨았다…`);
            ctx.showMessage('');
            ctx.showMessage('쾌V의 구슬 +200');
            ctx.juel[ctx.count][1] += 200;
            ctx.showMessage('욕정의 구슬 +300');
            ctx.juel[ctx.count][5] += 300;
            ctx.showMessage('치정의 구슬 +500'); ctx.waitInput();
            ctx.juel[ctx.count][8] += 500;
          } else if (ctx.abilities[ctx.count][17] >= 5) {
            ctx.showMessage(`${ctx.getVarName("CALL", COUNT)}의 맨살에는 초콜릿 소스로 하트 모양이 그려져있고 유두에는 휘핑 크림이 올려져 있다.`);
            ctx.showMessage(`${ctx.josaHelper("플레이어가")} 초콜릿을 핥을때마다 ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "는")} 흥분되는지, 신음소리를 내며 몸을 떨었다…`);
            ctx.showMessage('');
            ctx.showMessage('욕정의 구슬 +300');
            ctx.juel[ctx.count][5] += 300;
            ctx.showMessage('치정의 구슬 +500'); ctx.waitInput();
            ctx.juel[ctx.count][8] += 500;
          } else if (ctx.getTalent(count, 114) || ctx.getTalent(count, 251) || ctx.getTalent(count, 252) || ctx.getTalent(count, 253)) {
            ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "는")} 거대한 유방의 골짜기에 하트 모양의 초콜릿을 올려 ${ctx.getVarName("CALL", MASTER)}에게 내밀었다.`);
            ctx.showMessage(`${ctx.getVarName("CALL", COUNT)}의 가슴의 감촉을 마음껏 즐기면서 ${ctx.josaHelper("플레이어가")} 초콜릿을 다 먹었을 무렵에는, ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "는")} 홍조를 띄우며 뜨거운 숨을 내쉬고 있었다…`);
            ctx.showMessage('');
            ctx.showMessage('쾌B의 구슬 +200');
            ctx.juel[ctx.count][14] += 200;
            ctx.showMessage('욕정의 구슬 +300');
            ctx.juel[ctx.count][5] += 300;
            ctx.showMessage('치정의 구슬 +300'); ctx.waitInput();
            ctx.juel[ctx.count][8] += 300;
          } else {
            ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "는")} 준비한 초콜릿을 물고, ${ctx.getVarName("CALL", MASTER)}에게 입술을 내밀었다.`);
            ctx.showMessage(`입을 맞추는 동안 녹아내린 초콜릿과 서로의 타액이 섞여, ${ctx.josaHelper("플레이어와")} ${ctx.getVarName("CALL", COUNT)}의 농후한 키스는 계속됐다…`);
            ctx.showMessage('');
            ctx.showMessage('욕정의 구슬 +300');
            ctx.juel[ctx.count][5] += 300;
            ctx.showMessage('치정의 구슬 +300'); ctx.waitInput();
            ctx.juel[ctx.count][8] += 300;
          }
        } else {
          ctx.showMessage(`속옷 차림의 ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "가")} ${ctx.josaHelper("플레이어를")} 기다리고 있었다.`);
          if (ctx.getTalent(count, 114) || ctx.getTalent(count, 251) || ctx.getTalent(count, 252) || ctx.getTalent(count, 253)) {
            ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "는")} 거대한 유방의 골짜기에 하트 모양의 초콜릿을 올려 ${ctx.getVarName("CALL", MASTER)}에게 내밀었다.`);
            ctx.showMessage(`${ctx.getVarName("CALL", COUNT)}의 가슴의 감촉을 마음껏 즐기면서 ${ctx.josaHelper("플레이어가")} 초콜릿을 다 먹었을 무렵에는, ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "는")} 홍조를 띄우며 뜨거운 숨을 내쉬고 있었다…`);
            ctx.showMessage('');
            ctx.showMessage('쾌B의 구슬 +200');
            ctx.juel[ctx.count][14] += 200;
            ctx.showMessage('욕정의 구슬 +300');
            ctx.juel[ctx.count][5] += 300;
            ctx.showMessage('치정의 구슬 +200'); ctx.waitInput();
            ctx.juel[ctx.count][8] += 200;
          } else {
            ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "는")} 준비한 초콜릿을 물고, ${ctx.getVarName("CALL", MASTER)}에게 입술을 내밀었다.`);
            ctx.showMessage(`입을 맞추는 동안 녹아내린 초콜릿과 서로의 타액이 섞여, ${ctx.josaHelper("플레이어와")} ${ctx.getVarName("CALL", COUNT)}의 농후한 키스는 계속됐다…`);
            ctx.showMessage('');
            ctx.showMessage('욕정의 구슬 +300');
            ctx.juel[ctx.count][5] += 300;
            ctx.showMessage('치정의 구슬 +300'); ctx.waitInput();
            ctx.juel[ctx.count][8] += 300;
          }
        }
      } else if (character.cflags[ctx.count][2] >= 1000 && ctx.getTalent(count, 85)) {
        if (ctx.getTalent(count, 10) || ctx.getTalent(count, 35)) {
          ctx.print('얼굴이 새빨개진');
        } else if (ctx.getTalent(count, 13)) {
          ctx.print('왠지 들떠보이는');
        } else if (ctx.getTalent(count, 23) || ctx.getTalent(count, 25)) {
          ctx.print('즐거워 보이는');
        } else if (ctx.getTalent(count, 15)) {
          ctx.print('안절부절 못하는');
        } else {
          ctx.print('뺨을 붉힌');
        }
        ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "가")}`);
        if (ctx.getTalent(count, 20)) {
          ctx.print('눈치를 살피며');
        } else if (ctx.getTalent(count, 36) || ctx.getTalent(count, 28)) {
          ctx.print('힘차게');
        } else if (ctx.getTalent(count, 21)) {
          ctx.print('자연스럽게');
        } else if (ctx.getTalent(count, 10)) {
          ctx.print('소심하게');
        }
        ctx.showMessage(`${ctx.getVarName("CALL", MASTER)}에게 건낸 것은,`);
        if (ctx.getTalent(count, 205)) {
          ctx.print('고급스러운');
        } else if (ctx.getTalent(count, 28)) {
          ctx.print('화려한');
        } else if (ctx.getTalent(count, 20) || ctx.getTalent(count, 21)) {
          ctx.print('세련된');
        } else {
          ctx.print('귀여운');
        }
        ctx.print('포장지로 쌓인');
        if (ctx.getTalent(count, 221) || ctx.getTalent(count, 222)) {
          ctx.print('작은');
        }
        ctx.print('물건이었다.');
        ctx.showMessage(`${ctx.josaHelper("플레이어가")} 그것을 받아 들자, ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "는")}`);
        if (character.cflags[ctx.count][2] < 1500) {
          ctx.print('생긋 웃으며,');
        } else if (character.cflags[ctx.count][2] < 2000) {
          ctx.showMessage(`${ctx.josaHelper("플레이어를")} 꽉 껴안고`);
        } else if (ctx.getTalent(count, 100)) {
          ctx.showMessage(`발 돋움해 ${ctx.getVarName("CALL", MASTER)}에게 입맞추고,`);
        } else {
          ctx.showMessage(`미소지으며 ${ctx.getVarName("CALL", MASTER)}에게 입맞추고,`);
        }
        if (ctx.getTalent(count, 13) || ctx.getTalent(count, 18)) {
          ctx.showMessage('행복해하며 떠나갔다.');
        } else if (ctx.getTalent(count, 10) || ctx.getTalent(count, 35)) {
          ctx.showMessage('도망치듯이 떠나갔다.');
        } else {
          ctx.showMessage('손을 흔들며 떠나갔다.');
        }
        ctx.showMessage('아무래도 애정의 초콜릿 같다.');
        ctx.showMessage(`함께 들어있는 메세지 카드에는 ${ctx.getVarName("CALL", MASTER)}에게 보내는 편지`);
        if (ctx.abilities[ctx.count][11] >= 5 && character.cflags[ctx.count][2] >= 2000) {
          ctx.showMessage(`와 ${ctx.getVarName("CALL", COUNT)}의 키스마크`);
        }
        ctx.showMessage('가 있었다.');
        if (ctx.abilities[ctx.count][73] > 2) {
          ctx.showMessage(`초콜릿은 ${ctx.getVarName("CALL", COUNT)}의 수제 같았지만, 외형도 맛도 최고급 전문점의 솜씨라고 해도 좋을 정도였다.`);
          ctx.showMessage('요리경험 +5');
          ctx.exp[ctx.count][61] += 5;
        } else if (ctx.abilities[ctx.count][73] > 0) {
          ctx.showMessage(`초콜릿은 ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "가")} 직접 만든 것 같아 약간 서툰 부분도 있었지만, ${ctx.getVarName("CALL", MASTER)}에게는 충분히 맛있게 느껴졌다.`);
          ctx.showMessage('요리경험 +3');
          ctx.exp[ctx.count][61] += 3;
        }
        ctx.showMessage('');
        ctx.showMessage('애정경험 +5');
        ctx.exp[ctx.count][23] += 5;
        ctx.showMessage('온순의 구슬 +1000'); ctx.waitInput();
        ctx.juel[ctx.count][4] += 1000;
      } else if (character.cflags[ctx.count][2] >= 500) {
        ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "가")} 조금 당황해하며 ${ctx.getVarName("CALL", MASTER)}에게 내민 것은, 작은 선물이었다.`);
        ctx.showMessage(`발렌타인 초콜릿, 이라고 한다.`);
        ctx.showMessage(`${ctx.josaHelper("플레이어가")} 그것을 받으니, ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "는")} 미소지으며 떠나 갔다.`);
        ctx.showMessage(`W 온순의 구슬 +200`);
        ctx.juel[ctx.count][4] += 200;
      } else if (character.cflags[ctx.count][2] >= 200) {
        ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "가")} ${ctx.getVarName("CALL", MASTER)}에게 내민 것은, 간단하게 포장된 선물이었다.`);
        ctx.showMessage(`우정의 초콜릿이라는 거겠지.`);
        ctx.showMessage('');
        ctx.showMessage(`W 온순의 구슬 +100`);
        ctx.juel[ctx.count][4] += 100;
      }
    }
  }
  return 1;
}

export async function summer_vacation1(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine();
  ctx.showMessage(`오늘은 바다의 날이다……`);
  ctx.showMessage(`날씨도 좋고, 해수욕하기에 딱 맞는 날이었다。`);
  ctx.showMessage(`L`);
  // Label: SUMMER_VACATION_LOOP
  ctx.showMessage('여배우(후보)를 바다에 데리고 갑니까?');
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 아니오');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    return 1;
  } else if (ctx.result === 0) {
    ctx.showMessage('');
    // GOTO SUMMER_VACATION_LOOP2 - 구조 변경 필요 (while/break 사용 권장)
  } else {
    // GOTO SUMMER_VACATION_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  // Label: SUMMER_VACATION_LOOP2
  ctx.showMessage(`바다에 데려갈 여배우(후보)를 선택해 주세요`);
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count == 0) {
      // TODO: CONTINUE
    }
    if (ctx.base[ctx.count][0] < 1) {
      // TODO: CONTINUE
    }
    if (ctx.getTalent(count, 85) == 0 && ctx.getTalent(count, 90) == 0) {
      // TODO: CONTINUE
    }
    ctx.showMessage(`[${ctx.count}] ${ctx.getName(ctx.count)}`);
    ctx.showMessage('');
  }
  ctx.drawLine();
  ctx.showMessage(` [999] - 그만둔다`);
  await ctx.inputNumber();
  if (ctx.result === 999) {
    return 1;
  } else if (ctx.result === 0) {
    // GOTO SUMMER_VACATION_LOOP2 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result < 0 || ctx.result >= ctx.charanum) {
    // GOTO SUMMER_VACATION_LOOP2 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 85) === 0 && ctx.getTalent(result, 90) === 0) {
    // GOTO SUMMER_VACATION_LOOP2 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.base[ctx.result][0] < 1) {
    // GOTO SUMMER_VACATION_LOOP2 - 구조 변경 필요 (while/break 사용 권장)
  }
  character = ctx.result;
  ctx.showMessage(`W %타겟과(1)% 바다로 놀러갑니다.`);
  ctx.drawLine('‥');
  if (ctx.paramBand[68] >= 3 && ctx.abilities[17] >= 5) {
    ctx.showMessage(`끈이나 마찬가지인 에로틱 슬링샷을`);
  } else if (ctx.abilities[17] >= 5) {
    ctx.showMessage(`노출도가 높은 마이크로 비키니를`);
  } else {
    ctx.showMessage(`얌전한 원피스 비키니를`);
  }
  ctx.showMessage(`입은 ${ctx.josaHelper("타겟은")}`);
  if (ctx.talents[110] === 1 || ctx.talents[114] === 1) {
    ctx.showMessage(`커다란 가슴을 흔들며`);
  }
  ctx.showMessage(`${ctx.josaHelper("플레이어와")} 장난을 치고 있다……`);
  // TODO: PRINTW
  if (ctx.talents[422] === 0 && ctx.abilities[17] >= 3) {
    ctx.showMessage(`어느정도 ${ctx.josaHelper("타겟과")} 논 뒤에, 비치 체어에 엎드려 쉬고 있던 ${ctx.josaHelper("타겟이")}`);
    ctx.showMessage(`${ctx.getVarName("CALL", MASTER)}에게 선 오일을 발라달라고 보채왔다`);
    ctx.showMessage(`모처럼 바다에 왔으니 이런 커플 같은 일도 해보고 싶다고 하는데……`);
    ctx.showMessage(`《${ctx.getVarName("CALL", TARGET)}에게 선 오일을 발라줍니까?》`);
    ctx.showMessage('[0] - 네');
    ctx.showMessage('[1] - 아니오');
    // Label: INPUT_LOOP_SUNOIL
    await ctx.inputNumber();
    if (ctx.result === 0) {
      ctx.showMessage(`${ctx.josaHelper("플레이어는")} 엎드려있는 ${ctx.getVarName("CALL", TARGET)}의 온몸 구석구석에 선 오일을 발라줬다`);
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 간지러운듯 웃으면서도, ${ctx.getVarName("CALL", MASTER)}의 스킨십을 즐기고 있다……`);
      character.tflags[130] = 1;
    } else if (ctx.result === 1) {
      ctx.showMessage(`모처럼 예쁜 피부를 태우는 건 아깝다고 말하자 ${ctx.josaHelper("타겟은")} 아쉬워했다`);
      ctx.showMessage(`그래도 대신에 ${ctx.josaHelper("플레이어가")} 부끄러운 걸 참고 사온,`);
      ctx.showMessage(`커플용으로 빨대가 나눠진 트로피컬 쥬스를 보여주니`);
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 기쁘게 웃으며 빨대를 입에 대고, ${ctx.getVarName("CALL", MASTER)}도 빨리 마시라고 재촉했다……`);
    } else {
      // GOTO INPUT_LOOP_SUNOIL - 구조 변경 필요 (while/break 사용 권장)
    }
    // TODO: PRINTW
  }
  character.tflags[13] = 21;
  await self_kojo(ctx, character);
  ctx.showMessage('');
  ctx.showMessage('온순의 구슬 +1000');
  ctx.juel[4] += 1000;
  ctx.showMessage('욕정의 구슬 +500');
  ctx.juel[5] += 500;
  ctx.showMessage('야외노출경험 +5');
  ctx.exp[12] += 5;
  ctx.print('애정경험 +5');
  ctx.exp[23] += 5;
  await ctx.wait();
  if (ctx.talents[0] === 0 && ctx.abilities[30] >= 2 && ctx.abilities[17] >= 4) {
    ctx.drawLine('‥');
    ctx.showMessage(`해도 수평선 너머로 저물고 있지만,`);
    ctx.showMessage(`${ctx.josaHelper("타겟은")} 돌아가려 하질 않았다……`);
    ctx.showMessage(`거기다 인적이 드문 바위틈에 숨어들고는`);
    ctx.showMessage(`W 지금 바로 안아달라고 보채고 있다……`);
    ctx.showMessage('');
    character.tflags[13] = 22;
    await self_kojo(ctx, character);
    ctx.showMessage('');
    ctx.showMessage(`${ctx.josaHelper("플레이어는")} 별이 빛나는 밤하늘 아래에서, ${ctx.josaHelper("타겟과")} 밤새 사랑을 나눴다……`);
    N = 0;
    N = ((ctx.abilities[11] + ctx.abilities[30]) * 5) + ctx.rand(5);
    if (ctx.talents[440] === 1) {
      ctx.times('N', 1.80);
    } else if (ctx.talents[440] === 1) {
      ctx.times('N', 1.50);
    }
    N /= 10;
    ctx.showMessage(`성교경험 +${N}`);
    ctx.exp[5] += N;
    ctx.showMessage(`V경험 +${N + ctx.rand(51)}`);
    ctx.exp[0] += N * ctx.abilities[2] / 2;
    ctx.showMessage(`절정경험 +${N - ctx.rand(11)}`);
    ctx.exp[2] += N / 4;
    ctx.showMessage(`야외노출경험 +${N / 3}`);
    ctx.exp[12] += N * ctx.abilities[17] / 10;
    if ((ctx.getTalent(master, 121) === 1 || ctx.getTalent(master, 122) === 1)) {
      ctx.showMessage(`정액경험 +${N / 5}`);
      ctx.exp[20] += N * ctx.abilities[32] / 5;
    }
    ctx.showMessage(`봉사쾌락경험 +${N * 2}`);
    ctx.exp[21] += N * ctx.abilities[16] / 5;
    if ((ctx.getTalent(master, 121) === 1 || ctx.getTalent(master, 122) === 1)) {
      ctx.showMessage(`펠라경험 +${N / 3}`);
      ctx.exp[22] += N * ctx.abilities[13] / 3;
    }
    ctx.showMessage(`애정경험 +${N / 3}`);
    ctx.exp[23] += N * ctx.abilities[10] / 2;
    if (character.cflags[16] === -1) {
      character.cflags[16] = 1;
      if (character.no != 1) {
        ctx.cstr[1] = CALLctx.getName(ctx.master);
      } else if ((character.no === 1 || character.no === 91) && ctx.talents[11] === 0) {
        ctx.cstr[1] = "오빠";
      } else if ((character.no === 1 || character.no === 91) && ctx.talents[11] === 1) {
        ctx.cstr[1] = "형님";
      }
      character.cflags[820] = ctx.base[9];
      character.cflags[821] = DAY[1];
      character.cflags[822] = DAY[2];
      character.cflags[823] = 4;
      ctx.setColor(0xDDBBCC);
      ctx.showMessage(`【첫 키스】`);
      ctx.resetColor();
    }
    if (character.cflags[ctx.master][16] === -1) {
      character.cflags[ctx.master][16] = 1;
      character.cstr[ctx.master][1] = ctx.getName(character);
      character.cflags[ctx.master][820] = ctx.playerBase[9];
      character.cflags[ctx.master][821] = DAY[1];
      character.cflags[ctx.master][822] = DAY[2];
      character.cflags[ctx.master][823] = 4;
      ctx.setColor(0xDDBBCC);
      ctx.showMessage(`【첫 키스】(${ctx.getVarName("CALL", MASTER)})`);
      ctx.resetColor();
    }
    if (ctx.getTalent(master, 1) === 1 && (ctx.getTalent(master, 121) === 1 || ctx.getTalent(master, 122) === 1)) {
      ctx.getTalent(master, 1) = 0;
      character.cstr[ctx.master][2] = ctx.getName(character);
      ctx.setColor(0xDDBBCC);
      ctx.showMessage(`【동정상실】(${ctx.getVarName("CALL", MASTER)})`);
      ctx.resetColor();
      character.cflags[ctx.master][18] = 1;
    }
  }
  ctx.showMessage(`L`);
  ctx.showMessage(`W ${ctx.josaHelper("플레이어와")} 함께 보낸 여름의 추억을, ${ctx.josaHelper("타겟은")} 가슴 깊이 새겼다……`);
  if (character.cflags[155] === 0) {
    character.cflags[155] = 1;
  }
  if (character.tflags[130] === 1 || ctx.rand(11) >= 8) {
    ctx.showMessage(`《여름 바다를 만끽한 ${ctx.josaHelper("타겟은")} 완전히 피부가 타버렸다……》`);
    ctx.talents[422] = 1;
    character.cflags[614] = 4 + ctx.rand(4);
  }
  return 1;
}
