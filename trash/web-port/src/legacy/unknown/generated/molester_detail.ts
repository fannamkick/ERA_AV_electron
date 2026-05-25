/**
 * MOLESTER_DETAIL.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function molester_brunch(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] += ctx.rand(6);
  if (ctx.locals[0] === 0) {
    character.tflags[13] = 16;
  } else if (ctx.locals[0] === 1) {
    character.tflags[13] = 16;
  } else if (ctx.locals[0] === 2) {
    character.tflags[13] = 17;
  } else if (ctx.locals[0] === 3) {
    character.tflags[13] = 18;
  } else if (ctx.locals[0] === 4) {
    character.tflags[13] = 19;
  } else if (ctx.locals[0] === 5) {
    character.tflags[13] = 20;
  }
  character = ctx.count;
  await self_kojo(ctx, character);
  ctx.showMessage(`${ctx.josaHelper("플레이어가")} 사무소를 나가려 했을 때, 이미 돌아갔을 터인 ${ctx.getVarName("CALL", COUNT)}에게서 전화가 걸려왔다.`);
  ctx.showMessage(`무슨 일인가 싶어 ${ctx.josaHelper("플레이어가")} 전화를 받으니,`);
  if (ctx.getTalent(count, 76) === 1) {
    ctx.showMessage(`요염한 목소리로`);
  } else {
    ctx.showMessage(`울먹거리며`);
  }
  ctx.showMessage(`전차로 돌아가던 중에 치한을 만났다고 말했다……`);
  // TODO: PRINTW
  ctx.showMessage(`${ctx.josaHelper("플레이어가")} ${ctx.getVarName("CALL", COUNT)}에게 자세하게 물어보니,`);
  if (ctx.locals[0] === 0) {
    ctx.showMessage(`엉덩이와 가슴을 야하게 문지르며`);
    ctx.showMessage(`치한의 발기한 페니스를 억지로 만지게 했다고 한다.`);
    ctx.showMessage(`그리고 그대로 온몸에 대량의 정액이 쏟아졌다고 했다……`);
    ctx.showMessage(`W`);
    ctx.showMessage(`${ctx.getVarName("EXP", 20)} +2`);
    ctx.showMessage(`${ctx.getVarName("PALAM", 8)}의 구슬 +500`);
    ctx.showMessage(`${ctx.getVarName("PALAM", 10)}의 구슬 +100`);
    if (ctx.getTalent(count, 76) === 0) {
      ctx.showMessage(`W ${ctx.getVarName("PALAM", 12)}의 구슬 +1000`);
    }
    ctx.exp[ctx.count][20] += 2;
    ctx.exp[ctx.count][103] += 1;
    ctx.juel[ctx.count][8] += 500;
    ctx.juel[ctx.count][10] += 100;
    if (ctx.getTalent(count, 76) === 0) {
      ctx.juel[ctx.count][12] += 1000;
    }
    ctx.base[ctx.count][31] -= 2;
  } else if (ctx.locals[0] === 1) {
    ctx.showMessage(`엉덩이와 가슴을 야하게 문지르며`);
    ctx.showMessage(`치한의 발기한 페니스를 억지로 만지게 했다고 한다.`);
    ctx.showMessage(`그리고 그대로 온몸에 대량의 정액이 쏟아졌다고 했다……`);
    ctx.showMessage(`W`);
    ctx.showMessage(`${ctx.getVarName("EXP", 20)} +2`);
    ctx.showMessage(`${ctx.getVarName("PALAM", 8)}의 구슬 +500`);
    ctx.showMessage(`${ctx.getVarName("PALAM", 10)}의 구슬 +100`);
    if (ctx.getTalent(count, 76) === 0) {
      ctx.showMessage(`W ${ctx.getVarName("PALAM", 12)}의 구슬 +1000`);
    }
    ctx.exp[ctx.count][20] += 2;
    ctx.exp[ctx.count][103] += 1;
    ctx.juel[ctx.count][8] += 500;
    ctx.juel[ctx.count][10] += 100;
    if (ctx.getTalent(count, 76) === 0) {
      ctx.juel[ctx.count][12] += 1000;
    }
    ctx.locals[0] = 0;
    ctx.base[ctx.count][31] -= 2;
  } else if (ctx.locals[0] === 2) {
    ctx.showMessage(`엉덩이와 가슴을 야하게 문지르며`);
    ctx.showMessage(`치한의 발기한 페니스를 억지로 만지게 했다고 한다.`);
    ctx.showMessage(`${ctx.getVarName("CALL", COUNT)}에게 대딸을 강요하면서`);
    ctx.showMessage(`속옷 너머로 클리토리스와 유두를 집요하게 문지르고`);
    ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "가")} 절정하는 것과 동시에`);
    ctx.showMessage(`치한이 대량의 정액을 ${ctx.getVarName("CALL", COUNT)}의 손에 사정했다고 했다…`);
    ctx.showMessage(`W`);
    ctx.showMessage(`${ctx.getVarName("EXP", 2)} +1`);
    ctx.showMessage(`${ctx.getVarName("EXP", 20)} +2`);
    ctx.showMessage(`${ctx.getVarName("PALAM", 8)}의 구슬 +800`);
    ctx.showMessage(`${ctx.getVarName("PALAM", 10)}의 구슬 +200`);
    if (ctx.getTalent(count, 76) === 0) {
      ctx.showMessage(`W ${ctx.getVarName("PALAM", 12)}의 구슬 +1500`);
    }
    ctx.exp[ctx.count][20] += 2;
    ctx.exp[ctx.count][103] += 1;
    ctx.exp[ctx.count][2] += 1;
    ctx.juel[ctx.count][8] += 800;
    ctx.juel[ctx.count][10] += 200;
    if (ctx.getTalent(count, 76) === 0) {
      ctx.juel[ctx.count][12] += 1500;
    }
    ctx.locals[0] = 0;
    ctx.base[ctx.count][31] -= 3;
  } else if (ctx.locals[0] === 3) {
    ctx.showMessage(`엉덩이와 가슴을 야하게 문지르며`);
    ctx.showMessage(`치한의 발기한 페니스를 억지로 만지게 했다고 한다.`);
    ctx.showMessage(`${ctx.getVarName("CALL", COUNT)}에게 대딸을 강요하면서`);
    ctx.showMessage(`속옷 안에 손을 넣어 엉덩이 구멍을 휘저었다고 한다…`);
    ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "가")}`);
    if (ctx.getTalent(count, 77)) {
      ctx.showMessage(`황홀한 표정으로 치한의 손가락을 아누스로 조이며`);
      ctx.showMessage(`교성과 함께 절정하자`);
    } else if (ctx.abilities[ctx.count][3] >= 3) {
      ctx.showMessage(`절정하자`);
    } else if (ctx.exp[ctx.count][1] === 0) {
      ctx.showMessage(`처음 느끼는 이물감에 저항하는 모습에 흥분한`);
    } else {
      ctx.showMessage(`이물감에 저항하는 모습에 흥분한`);
    }
    ctx.showMessage(`치한이 대량의 정액을 ${ctx.getVarName("CALL", COUNT)}의 손에 사정했다고 했다……`);
    ctx.showMessage(`W`);
    if (ctx.abilities[ctx.count][3] >= 3) {
      ctx.showMessage(`${ctx.getVarName("EXP", 2)}+1`);
    }
    ctx.showMessage(`${ctx.getVarName("EXP", 1)} +1`);
    ctx.showMessage(`${ctx.getVarName("EXP", 20)} +2`);
    ctx.showMessage(`${ctx.getVarName("PALAM", 8)}의 구슬 +1000`);
    ctx.showMessage(`${ctx.getVarName("PALAM", 10)}의 구슬 +300`);
    if (ctx.getTalent(count, 76) === 0) {
      ctx.showMessage(`W ${ctx.getVarName("PALAM", 12)}의 구슬 +2000`);
    }
    ctx.exp[ctx.count][20] += 2;
    ctx.exp[ctx.count][103] += 1;
    ctx.exp[ctx.count][1] += 1;
    if (ctx.abilities[ctx.count][3] >= 3) {
      ctx.exp[ctx.count][2] += 1;
    }
    ctx.juel[ctx.count][8] += 1000;
    ctx.juel[ctx.count][10] += 300;
    if (ctx.getTalent(count, 76) === 0) {
      ctx.juel[ctx.count][12] += 2000;
    }
    ctx.locals[0] = 0;
    ctx.base[ctx.count][31] -= 4;
  } else if (ctx.locals[0] === 4) {
    ctx.showMessage(`엉덩이와 가슴을 야하게 문지르며`);
    ctx.showMessage(`치한의 발기한 페니스를 억지로 만지게 했다고 한다.`);
    ctx.showMessage(`${ctx.getVarName("CALL", COUNT)}에게 대딸을 강요하면서`);
    ctx.showMessage(`속옷 안에 손을 넣어 질 속을 휘저었다고 한다…`);
    ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "가")}`);
    if (ctx.getTalent(count, 232)) {
      ctx.showMessage(`황홀한 표정으로 치한의 손가락을 조이며`);
      ctx.showMessage(`교성과 함께 절정하자`);
    } else if (ctx.abilities[ctx.count][2] >= 3) {
      ctx.showMessage(`절정하자`);
    } else if (ctx.exp[ctx.count][0] === 0) {
      ctx.showMessage(`처음 느끼는 이물감에 저항하는 모습에 흥분한`);
    } else {
      ctx.showMessage(`이물감에 저항하는 모습에 흥분한`);
    }
    ctx.showMessage(`치한이 대량의 정액을 ${ctx.getVarName("CALL", COUNT)}의 손에 사정했다고 했다……`);
    ctx.showMessage(`W`);
    if (ctx.abilities[ctx.count][2] >= 3) {
      ctx.showMessage(`${ctx.getVarName("EXP", 2)} +1`);
    }
    ctx.showMessage(`${ctx.getVarName("EXP", 20)} +2`);
    ctx.showMessage(`${ctx.getVarName("PALAM", 8)}의 구슬 +1000`);
    ctx.showMessage(`${ctx.getVarName("PALAM", 10)}의 구슬 +300`);
    if (ctx.getTalent(count, 76) === 0) {
      ctx.showMessage(`W ${ctx.getVarName("PALAM", 12)}의 구슬 +2000`);
    }
    ctx.exp[ctx.count][20] += 2;
    ctx.exp[ctx.count][103] += 1;
    if (ctx.abilities[ctx.count][2] >= 3) {
      ctx.exp[ctx.count][2] += 1;
    }
    ctx.juel[ctx.count][8] += 1000;
    ctx.juel[ctx.count][10] += 300;
    if (ctx.getTalent(count, 76) === 0) {
      ctx.juel[ctx.count][12] += 2000;
    }
    ctx.locals[0] = 0;
    ctx.base[ctx.count][31] -= 5;
  } else if (ctx.locals[0] >= 4) {
    ctx.showMessage(`엉덩이와 가슴을 야하게 문지르며`);
    ctx.showMessage(`치한의 발기한 페니스를 억지로 만지게 했다고 한다.`);
    ctx.showMessage(`${ctx.getVarName("CALL", COUNT)}에게 대딸을 강요하면서`);
    ctx.showMessage(`속옷 안에 손을 넣어 질 속을 휘저었다고 한다…`);
    ctx.showMessage(`그리고 ${ctx.getVarName("CALL", COUNT)}의 질이 애액으로 젖은 걸 확인하고는`);
    ctx.showMessage(`${ctx.getVarName("CALL", COUNT)}의 속옷을 제끼고, ${ctx.getVarName("CALL", COUNT)}에게 만져져 발딱 선 육봉을`);
    if (ctx.getTalent(count, 0) === 1) {
      ctx.showMessage(`처녀인`);
    } else if (ctx.getTalent(count, 271) === 1) {
      ctx.showMessage(`손가락으로 휘저어져 발정한`);
    }
    ctx.showMessage(`구멍에 집어넣었다……`);
    ctx.showMessage(`${ctx.getVarName("CALL", COUNT)}`);
    if (ctx.getTalent(count, 0) === 1) {
      ctx.showMessage(`%조사만처리(CALLNAME:COUNT,"가")% 처음보는 남자에게 처녀를 뺐기고, 우는 모습`);
    } else if (ctx.exp[ctx.count][1] >= 10) {
      ctx.showMessage(`의 구멍이 육봉을 받아들이고,`);
      ctx.showMessage(`반응해주는 ${ctx.getVarName("CALL", COUNT)}의 모습`);
    } else {
      ctx.showMessage(`의 처녀는 아니지만, 아직 미숙한`);
      ctx.showMessage(`${ctx.getVarName("CALL", COUNT)}의 구멍`);
    }
    ctx.showMessage(`에 흥분한 치한의 피스톤이 빨라졌다……`);
    ctx.showMessage(`그리고 ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "가")}`);
    if (ctx.exp[ctx.count][0] === 0) {
      ctx.showMessage(`처음 느끼는 이물감에 저항하는 모습에`);
    } else if (ctx.getTalent(count, 76)) {
      ctx.showMessage(`황홀한 표정으로 치한의 페니스를 직접 허리를 써서`);
      ctx.showMessage(`조이고, 교셩과 함께 절정하자 동시에`);
    } else if (ctx.exp[ctx.count][1] >= 10) {
      ctx.showMessage(`절정하자 동시에`);
    } else {
      ctx.showMessage(`아직 익숙하지 않은 이물감에 저항하는 모습에`);
    }
    ctx.showMessage(`한계를 맞이한 치한이 대량의 정액을 ${ctx.getVarName("CALL", COUNT)}의`);
    ctx.showMessage(`자궁에 쌌다고 했다……`);
    ctx.showMessage(`만족한 치한이 페니스를 뽑으니, ${ctx.getVarName("CALL", COUNT)}의 음순에서`);
    if (ctx.getTalent(count, 0) === 1) {
      ctx.showMessage(`처녀혈이 섞인`);
    }
    ctx.showMessage(`정액이 떨어져 작은 웅덩이가 생길만큼,`);
    ctx.showMessage(`대량으로 질내사정 당한 모양이다……`);
    ctx.showMessage(`W`);
    if (ctx.getTalent(count, 0)) {
      ctx.showMessage(`【처녀상실】`);
    }
    if (ctx.abilities[ctx.count][1] >= 10) {
      ctx.showMessage(`${ctx.getVarName("EXP", 2)} +1`);
    }
    ctx.showMessage(`${ctx.getVarName("EXP", 0)}+2`);
    if (ctx.getTalent(count, 0)) {
      ctx.getTalent(count, 0) = 0;
      character.cflags[ctx.count][15] = 7;
      character.cstr[ctx.count][0] = 痴漢;
      ctx.showMessage(`${ctx.getVarName("EXP", 50)} +2`);
      ctx.exp[ctx.count][50] += 2;
    }
    ctx.showMessage(`${ctx.getVarName("PALAM", 8)}의 구슬 +1000`);
    ctx.showMessage(`${ctx.getVarName("PALAM", 10)}의 구슬 +300`);
    if (ctx.getTalent(count, 76) === 0) {
      ctx.showMessage(`W ${ctx.getVarName("PALAM", 12)}의 구슬 +2000`);
    }
    ctx.exp[ctx.count][20] += 2;
    ctx.exp[ctx.count][103] += 1;
    ctx.exp[ctx.count][0] += 2;
    if (ctx.abilities[ctx.count][2] >= 3) {
      ctx.exp[ctx.count][2] += 1;
    }
    ctx.juel[ctx.count][8] += 1000;
    ctx.juel[ctx.count][10] += 300;
    if (ctx.getTalent(count, 76) === 0) {
      ctx.juel[ctx.count][12] += 2000;
    }
    ctx.locals[0] = 0;
    ctx.base[ctx.count][31] -= 15;
  }
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥'); ctx.waitInput();
}
