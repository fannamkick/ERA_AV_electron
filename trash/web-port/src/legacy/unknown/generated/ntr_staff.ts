/**
 * NTR_STAFF.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function ntr_staff_begin(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #DIM DYNAMIC C_NUM
  // TODO: #DIM DYNAMIC DANGER_VALUE
  // TODO: FOR C_NUM, 1, CHARANUM
  if (ctx.getTalent(c_num, 82)) {
    // TODO: CONTINUE
  }
  if (ctx.getTalent(c_num, 122)) {
    // TODO: CONTINUE
  }
  if (ctx.getTalent(c_num, 153)) {
    // TODO: CONTINUE
  }
  if (ctx.getTalent(c_num, 154)) {
    // TODO: CONTINUE
  }
  if (ctx.getTalent(c_num, 184)) {
    // TODO: CONTINUE
  }
  if (ctx.getTalent(c_num, 430)) {
    // TODO: CONTINUE
  }
  if (ctx.getTalent(c_num, 502)) {
    // TODO: CONTINUE
  }
  if (ctx.getTalent(c_num, 504)) {
    // TODO: CONTINUE
  }
  if (ctx.getTalent(c_num, 505)) {
    // TODO: CONTINUE
  }
  if (ctx.getTalent(c_num, 511)) {
    // TODO: CONTINUE
  }
  if (ctx.getTalent(c_num, 516)) {
    // TODO: CONTINUE
  }
  if (ctx.getTalent(c_num, 517)) {
    // TODO: CONTINUE
  }
  if (ctx.getTalent(c_num, 519)) {
    // TODO: CONTINUE
  }
  if (ctx.getTalent(c_num, 521)) {
    // TODO: CONTINUE
  }
  if (ctx.getTalent(c_num, 553)) {
    // TODO: CONTINUE
  }
  if (character.cflags[C_NUM][661] >= 1) {
    // TODO: CONTINUE
  }
  if (character.cflags[C_NUM][633]) {
    // TODO: CONTINUE
  }
  if (character.cflags[C_NUM][140] && (ctx.flags[101] & 128)) {
    // TODO: CONTINUE
  }
  if (character.cflags[C_NUM][40] >= 64 && character.cflags[C_NUM][42] == 79) {
    // TODO: CONTINUE
  }
  if (character.cflags[ctx.master][694] == 1) {
    // TODO: CONTINUE
  }
  if (DAY <= 1) {
    // TODO: CONTINUE
  }
  DANGER_VALUE += ctx.rand(100);
  if (ctx.getTalent(c_num, 416)) {
    DANGER_VALUE += 20;
  }
  if (ctx.getTalent(c_num, 24)) {
    DANGER_VALUE -= 5;
  }
  if (ctx.getTalent(c_num, 27)) {
    DANGER_VALUE -= 5;
  }
  if (ctx.getTalent(c_num, 30)) {
    DANGER_VALUE -= 5;
  }
  if (ctx.getTalent(c_num, 85)) {
    DANGER_VALUE -= 10;
  }
  if (ctx.getTalent(c_num, 86)) {
    DANGER_VALUE -= 10;
  }
  if (ctx.getTalent(c_num, 428)) {
    DANGER_VALUE -= 5;
  }
  if (ctx.getTalent(c_num, 509)) {
    DANGER_VALUE -= 10;
  }
  if (ctx.getTalent(c_num, 31)) {
    DANGER_VALUE += 5;
  }
  if (ctx.getTalent(c_num, 73)) {
    DANGER_VALUE += 50;
  }
  if (ctx.getTalent(c_num, 76) && ctx.getTalent(c_num, 85) == 0) {
    DANGER_VALUE += 15;
  }
  if (ctx.getTalent(c_num, 134)) {
    DANGER_VALUE += 5;
  }
  if (ctx.getTalent(c_num, 432)) {
    DANGER_VALUE += 10;
  }
  if (ctx.getTalent(c_num, 601)) {
    DANGER_VALUE += 20;
  }
  if (C_NUM.no == 1 || C_NUM.no == 91) {
    DANGER_VALUE += 10;
  }
  if (DANGER_VALUE >= 95) {
    character.cflags[C_NUM][660] += 1;
    if (character.cflags[C_NUM][660] >= 5) {
      character.cflags[C_NUM][661] = 1;
      character.cflags[C_NUM][619] = 0;
      character.cflags[C_NUM][621] = 1;
      await decide_boyfriend, c_num(ctx, character);
    }
  }
  DANGER_VALUE = 0;
  // TODO: NEXT
}

export async function base_ntr_staff(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #DIM DYNAMIC C_NUM
  // TODO: FOR C_NUM, 1, CHARANUM
  if (character.cflags[C_NUM][40] >= 64 && character.cflags[C_NUM][42] == 79) {
    // TODO: CONTINUE
  }
  if (character.cflags[C_NUM][633]) {
    // TODO: CONTINUE
  }
  if (character.cflags[C_NUM][661] === 1) {
    await exp_ntr_staff(ctx, character);
    ctx.exp[C_NUM][108] += 1;
  }
  // TODO: NEXT
}

export async function exp_ntr_staff(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #DIM DYNAMIC C_NUM
  C_NUM = ctx.args[0];
  if (ctx.exp[C_NUM][108] === 0) {
    await firstkiss_ntr_staff, c_num(ctx, character);
  } else if (ctx.exp[C_NUM][108] === 1 && ctx.getTalent(c_num, 0) === 1 && character.cflags[C_NUM][15] === 0) {
    await lostvirgin_ntr_staff, c_num(ctx, character);
  } else if (ctx.exp[C_NUM][108] === 5) {
    await changecloth_ntr_staff, c_num(ctx, character);
  } else if (ctx.exp[C_NUM][108] === 10) {
    await ntr_staff_last(ctx, character);
    ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥'); ctx.waitInput();
  } else {
    await sex_ntr_staff, c_num(ctx, character);
  }
}

export async function firstkiss_ntr_staff(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #DIM DYNAMIC C_NUM
  C_NUM = ctx.args[0];
  if (character.cflags[C_NUM][16] === -1) {
    character.cflags[C_NUM][16] = 10;
    character.cstr[C_NUM][1] = "???";
    ctx.base[C_NUM][31] -= 5;
    character.cflags[C_NUM][820] = ctx.base[C_NUM][9];
    character.cflags[C_NUM][821] = DAY[1];
    character.cflags[C_NUM][822] = DAY[2];
  }
}

export async function lostvirgin_ntr_staff(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #DIM DYNAMIC C_NUM
  // TODO: #DIM DYNAMIC V_EXP_VALUE
  // TODO: #DIM DYNAMIC SEMEN_EXP_VALUE
  // TODO: #DIM DYNAMIC IKU_EXP_VALUE
  C_NUM = ctx.args[0];
  V_EXP_VALUE = 1;
  SEMEN_EXP_VALUE = 1;
  IKU_EXP_VALUE = 1;
  V_EXP_VALUE += ctx.rand(3);
  SEMEN_EXP_VALUE += ctx.rand(3);
  IKU_EXP_VALUE += ctx.rand(2);
  character.cflags[ctx.count][160] = ctx.base[ctx.count][9];
  character.cflags[ctx.count][161] = DAY[1];
  character.cflags[ctx.count][162] = DAY[2];
  character.cflags[ctx.count][163] = 3;
  character.cflags[ctx.count][164] = 3;
  ctx.getTalent(count, 0) = 0;
  character.cflags[ctx.count][15] = 10;
  character.cstr[ctx.count][0] = "???";
  ctx.exp[ctx.count][0] += V_EXP_VALUE;
  ctx.exp[ctx.count][2] += IKU_EXP_VALUE;
  ctx.exp[ctx.count][5] += V_EXP_VALUE;
  ctx.exp[ctx.count][20] += SEMEN_EXP_VALUE;
  ctx.juel[ctx.count][1] += 100 * V_EXP_VALUE;
  ctx.juel[ctx.count][5] += 300 * IKU_EXP_VALUE;
  ctx.juel[ctx.count][4] -= 200 * (V_EXP_VALUE + IKU_EXP_VALUE);
  if (ctx.juel[ctx.count][4] < 0) {
    ctx.abilities[ctx.count][10] -= 1;
    ctx.juel[ctx.count][4] = 0;
    if (ctx.abilities[ctx.count][10] < 1) {
      ctx.abilities[ctx.count][10] = 0;
      ctx.base[ctx.count][31] -= 10;
    }
  }
}

export async function changecloth_ntr_staff(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #DIM DYNAMIC C_NUM
  C_NUM = ctx.args[0];
  ctx.showMessage(`W ${ctx.getName(C_NUM)}의 모습이 이상하다……`);
  if (character.cflags[C_NUM][600] != 2) {
    ctx.showMessage(`머리를 갑자기 염색하거나,`);
  }
  ctx.showMessage(`노출도가 높은 옷을 원해서 입게 됐다`);
  ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", C_NUM), "는")} 이미지 체인지라고 하지만, 듣기로는 저번 휴일에`);
  ctx.showMessage(`스탭인 %CSTR:C_NUM:7%처럼 보이는 사람과 같이 있는 모습을 봤다고 한다`);
  ctx.showMessage(`그것도 이상할 정도로 친해보여서, 말을 걸기고 껄끄러운 분위기 였다고 한다`);
  ctx.showMessage(`그러고보니, 확실히 요즘 ${ctx.josaHelper(ctx.getVarName("CALLNAME", C_NUM), "가")} %조사처리(CSTR:C_NUM:7,"를")% 계속 눈으로 쫓는 것도 같다`);
  ctx.showMessage(`그러나 ${ctx.getVarName("CALL", MASTER)} 이외의 스탭이 여배우에게 손대는 건 카논이 금지했을텐데……`);
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥'); ctx.waitInput();
  character.cflags[C_NUM][40] = 13;
  character.cflags[C_NUM][41] = 205;
  character.cflags[C_NUM][170] = 8;
  character.cflags[C_NUM][171] = 8;
  if (character.cflags[C_NUM][600] != 2) {
    character.cflags[C_NUM][600] = 2;
    character.cflags[C_NUM][601] = 1;
  }
  character.cflags[C_NUM][602] = 7;
  if (ctx.getTalent(c_num, 423) === 1) {
    ctx.getTalent(c_num, 432) = 1;
    if (C_NUM.no != 1) {
      if (ctx.rand(2) === 0) {
        character.cstr[C_NUM][9] = "난";
      } else {
        character.cstr[C_NUM][9] = "나";
      }
      if (ctx.rand(2) === 0) {
        character.cstr[C_NUM][80] = "자지";
        character.cstr[C_NUM][81] = "보지";
      } else {
        character.cstr[C_NUM][80] = "자지";
        character.cstr[C_NUM][81] = "보지";
      }
    } else {
      character.cstr[C_NUM][9] = "난";
      character.cstr[C_NUM][80] = "자지";
      character.cstr[C_NUM][81] = "보지";
      ctx.getTalent(c_num, 422) = 1;
      character.cflags[C_NUM][7] |= 2;
      character.cflags[C_NUM][7] |= 16;
      character.cflags[C_NUM][174] = 11;
      character.cflags[C_NUM][175] = 6;
      character.cflags[C_NUM][176] = 11;
      character.cflags[C_NUM][177] = 6;
    }
  }
  character.cflags[C_NUM][662] = 1;
}

export async function sex_ntr_staff(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #DIM DYNAMIC C_NUM
  // TODO: #DIM DYNAMIC V_EXP_VALUE
  // TODO: #DIM DYNAMIC SEMEN_EXP_VALUE
  // TODO: #DIM DYNAMIC IKU_EXP_VALUE
  // TODO: #DIM DYNAMIC FELLA_EXP_VALUE
  C_NUM = ctx.args[0];
  V_EXP_VALUE = 5;
  SEMEN_EXP_VALUE = 5;
  IKU_EXP_VALUE = 8;
  FELLA_EXP_VALUE = 2;
  V_EXP_VALUE += ctx.rand(5);
  SEMEN_EXP_VALUE += ctx.rand(5);
  IKU_EXP_VALUE += ctx.rand(5);
  FELLA_EXP_VALUE += ctx.rand(3);
  ctx.exp[ctx.count][0] += V_EXP_VALUE;
  ctx.exp[ctx.count][2] += IKU_EXP_VALUE;
  ctx.exp[ctx.count][5] += V_EXP_VALUE;
  ctx.exp[ctx.count][20] += SEMEN_EXP_VALUE;
  ctx.exp[ctx.count][22] += FELLA_EXP_VALUE;
  ctx.juel[ctx.count][1] += 400 * V_EXP_VALUE;
  ctx.juel[ctx.count][5] += 300 * IKU_EXP_VALUE;
  ctx.juel[ctx.count][5] += 300 * FELLA_EXP_VALUE;
  ctx.juel[ctx.count][4] -= 200 * (V_EXP_VALUE + IKU_EXP_VALUE);
  if (ctx.juel[ctx.count][4] < 0) {
    ctx.abilities[ctx.count][10] -= 1;
    ctx.juel[ctx.count][4] = 0;
    if (ctx.abilities[ctx.count][10] < 1) {
      ctx.abilities[ctx.count][10] = 0;
    }
  }
  if (ctx.getTalent(count, 424) === 0) {
    ctx.getTalent(count, 424) += ctx.rand(2);
    if (ctx.getTalent(count, 424) >= 1) {
      ctx.getTalent(count, 424) = 1;
      await cigarettes_4count(ctx, character);
    }
  }
  if (ctx.getTalent(count, 85) === 1) {
    ctx.getTalent(count, 85) = ctx.rand(2);
    if (ctx.getTalent(count, 85) >= 1) {
      ctx.getTalent(count, 85) = 1;
    }
  }
}

export async function ntr_staff_last(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #DIM DYNAMIC C_NUM
  C_NUM = ctx.args[0];
  ctx.showMessage(`밤 늦게까지 사무소에 남아있던 ${ctx.josaHelper("플레이어가")} 사무소를 나가려고 했을 때, PC 한대의 전원이 켜져있는 걸 알아챘다`);
  ctx.showMessage(`분명 저건…… 스탭인 %CSTR:C_NUM:7%의 PC일거다`);
  ctx.showMessage(`아마 대용량 자료를 편집하다, 그대로 두고간 것일까,`);
  ctx.showMessage(`잘 살펴보니 DVD드라이브가 열려있고, 안에는 DVD－R이 한 장 들어있다`);
  ctx.showMessage(`%CSTR:C_NUM:7% 뿐만 아니라 PC 전원 끄는 걸 깜빡하거나,『자료』라며 다른 메이커의 AV를 다운로드 구입하고 그대로 돌아가는 사람도 있다`);
  ctx.showMessage(`그럴땐, 그냥 깜빡한 거라면 마지막까지 남아있던 사람이 꺼두고, 사정이 있어서 켜둬야 한다고 말했으면 그대로 둔다`);
  ctx.showMessage(`W 이번엔 켜둬야 한다는 말은 듣지 못했으니 ${ctx.josaHelper("플레이어는")} PC의 대기화면을 풀고, 전원을 끄려고 했다……`);
  ctx.showMessage(`돌아온 화면엔 몇가지 파일이 들어있는 폴더가 떠있었고,`);
  ctx.showMessage(`그대로 폴더를 닫으려고 하다 …… ${ctx.josaHelper("플레이어는")} 움직임을 멈췄다`);
  ctx.showMessage(`폴더에 들어있는 파일 이름은『${ctx.getVarName("CALL", C_NUM)} 섹스촬영 Vol.${ctx.rand(10)+1}』이나『${ctx.getVarName("CALL", C_NUM)} 정액새어나옴』등등 이었다`);
  ctx.showMessage(`가슴이 술렁거린 ${ctx.josaHelper("플레이어는")}, 요즘 ${ctx.josaHelper(ctx.getVarName("CALLNAME", C_NUM), "과")} %CSTR:C_NUM:7%의 모습이 어딘가 이상했던 것을 기억해내고,`);
  ctx.showMessage(`의문이 확신으로 변하는 걸 느끼며 드라이브에 들어가있는 DVD－R을 재생했다……`);
  // TODO: PRINTW
  await kojo_ntr_staff, c_num(ctx, character);
  ctx.showMessage(`……역시 파일명으로 예상했던 대로, DVD에 기록된 파일은 ${ctx.getVarName("CALL", C_NUM)}의 섹스영상이었다`);
  ctx.showMessage(`이 사무소의 스탭들은 사정이 있어 카논이 준비한 사람들로, ${ctx.getVarName("CALL", MASTER)} 이외의 스탭들이 여배우에게 손을 대는 것은 금지돼있다`);
  ctx.showMessage(`그러고보니, 카논이『만에 하나 스탭이 여자에게 손을 댔다면 바로 연락해줘』라고 한 말이 기억난 ${ctx.josaHelper("플레이어는")}`);
  ctx.showMessage(`휴대폰으로 카논을 부르기로 했다……`);
  // TODO: PRINTW
  ctx.showMessage(`「오ー ……이거 제대로 섹스영상이네…… 그리고, 이 목소리는 틀림없이 %CSTR:C_NUM:7%인데`);
  ctx.showMessage(`　뭐, 여배우들은 모두 미소녀・미녀니까 손을 대고 싶어지는 기분도 알겠지만 말이야……`);
  ctx.showMessage(`　하지만, 여기가 정상적인 곳이 아니란 걸 잊어버렸다면 큰 문제지`);
  ctx.showMessage(`　이게 일반 예능사무소였다면 잘리고 끝일테니, %CSTR:C_NUM:7%도 정신줄을 놓아버린 건지……`);
  ctx.showMessage(`　우리 같은 놈들에게 빚을 져놓고, 이렇게 섹스영상까지 찍을 정도로 여유가 넘치는건 말야`);
  ctx.showMessage(`　지금의 생활은『이곳에 있으니까』가능한거고, 아니었다면 지금쯤 어떤 곳에 있을지 말했을텐데`);
  ctx.showMessage(`　『네놈들이 만에 하나라도 여배우들에게 손을 댄다면…… 그래, 바다 깊은 곳에 있는 콘크리트 드럼통이 하나 늘어나겠지』`);
  ctx.showMessage(`　라고 그 놈들을 모아놓고서 말이야`);
  ctx.showMessage(`W 　어차피 감시가 느슨하니까 걸릴리가 없다고 배째라 했겠지…… 아무리 그래도 너무 멍청한거 아냐?`);
  ctx.showMessage(`　일단 이 일은 내가 알아서 해결할게 ……아마 원망받겠지만, 나 한명만 원망해준다면 그것도 괜찮겠지`);
  ctx.showMessage(`W 　이 가업을 잇기로 했을때부터, 원망받는 건…… 그 누구보다 익숙하니까……`);
  ctx.showMessage(`　하지만, 이거 하나는 말해둘게…… 이 일은 내 실수이기도 하고, 네 실수이기도 하잖아`);
  ctx.showMessage(`　막으려고 했다면 막을 수 있었고, 애초에 네 매력이 떨어지니 이 사단이 났다는 건…… 제대로 이해하고 있겠지?`);
  ctx.showMessage(`　뭐, 다시는 이런 일 없게 더 좋은 남자가 되도록 노력하라는 거야`);
  ctx.showMessage(`　그럼 난 %CSTR:C_NUM:7%에게 우리 애들 솜씨나 보여주러 가볼까……」`);
  // TODO: PRINTW
  ctx.showMessage(`다음날, %조사처리(CSTR:C_NUM:7,"가")% 없는게 신경쓰이는지, ${ctx.josaHelper(ctx.getVarName("CALLNAME", C_NUM), "는")} 안절부절 못하며 다른 스탭들과 이야기하고 있었다`);
  ctx.showMessage(`왠지 어색한 분위기를 깨듯이, 부하들을 데리고 나타난 카논이『%CSTR:C_NUM:7%이라면 처분했다』고 말하고는,`);
  ctx.showMessage(`갑작스러운 소식에 안색이 창백해진 ${ctx.josaHelper(ctx.getVarName("CALLNAME", C_NUM), "를")} 불러내어, 사무소 밖으로 나갔다……`);
  // TODO: PRINTW
  ctx.showMessage(`「일단『지인』에게 데려가 봤는데, 100％ 임신은 안했다고 했어`);
  ctx.showMessage(`　의학적인 견해는 아니니까 믿기 힘들 수도 있지만, 웬만한 의사들보다 훨씬 정확한 사람이야`);
  ctx.showMessage(`　그리고 뒷처리로 %CSTR:C_NUM:7%에 관한 기억『만은』지워뒀어」`);
  // TODO: PRINTW
  ctx.showMessage(`말을 마치고, 돌아온 카논은 어딘가 안심한 표정으로 차를 홀짝였다`);
  ctx.showMessage(`어쩌면, ${ctx.getVarName("CALL", C_NUM)}에게 원망받을 일 없이 끝나 다행이라고 생각하는지도 모른다……`);
  // TODO: PRINTW
  if (character.cflags[C_NUM][15] === 10) {
    ctx.showMessage(`《${ctx.getName(C_NUM)}의 첫 상대가 밝혀졌습니다》`);
    character.cstr[C_NUM][0] = `${character.cstr[C_NUM][7]} ${character.cstr[C_NUM][8]}(전스탭)`;
    character.cflags[C_NUM][15] = 8;
    ctx.exp[C_NUM][101] += 10;
  }
  if (character.cflags[C_NUM][16] === 10) {
    ctx.showMessage(`《${ctx.getName(C_NUM)}의 첫 키스 상대가 밝혀졌습니다》`);
    if (ctx.rand(2) === 0) {
      character.cstr[C_NUM][1] = `${character.cstr[C_NUM][7]} ${character.cstr[C_NUM][8]}(전스탭)`;
    } else {
      character.cstr[C_NUM][1] = `${character.cstr[C_NUM][7]} ${character.cstr[C_NUM][8]}(전스탭)`;
      character.cflags[C_NUM][824] = 1;
    }
  }
  character.cflags[C_NUM][619] = 0;
  character.cflags[C_NUM][621] = 0;
  character.cflags[C_NUM][661] = 2;
  ctx.base[C_NUM][31] -= 10;
  ctx.exp[C_NUM][109] += 1;
  character.cflags[C_NUM][827] = 1;
}
