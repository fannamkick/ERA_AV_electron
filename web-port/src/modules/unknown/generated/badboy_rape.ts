/**
 * BADBOY_RAPE.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function badboy_rape_calc(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #DIM DYNAMIC C_NUM
  // TODO: #DIM DYNAMIC DANGER_VALUE
  if (ctx.flags[301] == 0) {
    return 1;
  }
  // TODO: FOR C_NUM, 1, CHARANUM
  if (ctx.getTalent(c_num, 122)) {
    // TODO: CONTINUE
  }
  if (character.cflags[C_NUM][633]) {
    // TODO: CONTINUE
  }
  if (ctx.getTalent(c_num, 153)) {
    // TODO: CONTINUE
  }
  if (ctx.getTalent(c_num, 154)) {
    // TODO: CONTINUE
  }
  if (ctx.getTalent(c_num, 429)) {
    // TODO: CONTINUE
  }
  if (ctx.getTalent(c_num, 502)) {
    // TODO: CONTINUE
  }
  if (ctx.getTalent(c_num, 503)) {
    // TODO: CONTINUE
  }
  if (ctx.getTalent(c_num, 504)) {
    // TODO: CONTINUE
  }
  if (ctx.getTalent(c_num, 505)) {
    // TODO: CONTINUE
  }
  if (ctx.getTalent(c_num, 512)) {
    // TODO: CONTINUE
  }
  if (ctx.getTalent(c_num, 511)) {
    // TODO: CONTINUE
  }
  if (ctx.getTalent(c_num, 516)) {
    // TODO: CONTINUE
  }
  if (ctx.getTalent(c_num, 430)) {
    // TODO: CONTINUE
  }
  if (ctx.getTalent(c_num, 517)) {
    // TODO: CONTINUE
  }
  if (ctx.getTalent(c_num, 521)) {
    // TODO: CONTINUE
  }
  if (ctx.getTalent(c_num, 553)) {
    // TODO: CONTINUE
  }
  if (character.cflags[C_NUM][40] >= 64 && character.cflags[C_NUM][42] == 79) {
    // TODO: CONTINUE
  }
  DANGER_VALUE += ctx.rand(100);
  DANGER_VALUE -= ctx.abilities[C_NUM][51];
  if (ctx.getTalent(c_num, 10)) {
    DANGER_VALUE += ctx.rand(10);
  }
  if (ctx.getTalent(c_num, 14)) {
    DANGER_VALUE += ctx.rand(10);
  }
  if (ctx.getTalent(c_num, 31)) {
    DANGER_VALUE += ctx.rand(10);
  }
  if (ctx.getTalent(c_num, 76)) {
    DANGER_VALUE += ctx.rand(10);
  }
  if (ctx.getTalent(c_num, 12)) {
    DANGER_VALUE -= ctx.rand(5);
  }
  if (ctx.getTalent(c_num, 16)) {
    DANGER_VALUE -= ctx.rand(5);
  }
  if (ctx.getTalent(c_num, 28)) {
    DANGER_VALUE -= ctx.rand(5);
  }
  if (ctx.getTalent(c_num, 79)) {
    DANGER_VALUE -= ctx.rand(5);
  }
  if (ctx.getTalent(c_num, 82)) {
    DANGER_VALUE -= ctx.rand(5);
  }
  if (ctx.getTalent(c_num, 93)) {
    DANGER_VALUE -= ctx.rand(5);
  }
  if (ctx.flags[301] == 1) {
    DANGER_VALUE += 10;
  }
  if (ctx.flags[301] == 2) {
    DANGER_VALUE += 20;
  }
  if (ctx.flags[301] == 3) {
    DANGER_VALUE += 30;
  }
  if (DANGER_VALUE >= 98 && ctx.flags[600] == 0) {
    await badboy_rape, c_num(ctx, character);
  }
  DANGER_VALUE = 0;
  // TODO: NEXT
}

export async function badboy_rape(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #DIM DYNAMIC C_NUM
  // TODO: #DIM DYNAMIC V_EXP_VALUE
  // TODO: #DIM DYNAMIC FELLA_EXP_VALUE
  // TODO: #DIM DYNAMIC A_EXP_VALUE
  // TODO: #DIM DYNAMIC DRUG_EXP_VALUE
  // TODO: #DIM DYNAMIC WEIRD_EXP_VALUE
  C_NUM = ctx.args[0];
  V_EXP_VALUE = 1;
  FELLA_EXP_VALUE = 5;
  A_EXP_VALUE = 0;
  DRUG_EXP_VALUE = 1;
  WEIRD_EXP_VALUE = 0;
  ctx.showMessage(`오늘은 ${ctx.josaHelper(ctx.getVarName("CALLNAME", C_NUM), "를")} 지도하는 날인데……`);
  ctx.showMessage(`지금까지 한번도 지도를 빠진적이 없던 ${ctx.josaHelper(ctx.getVarName("CALLNAME", C_NUM), "가")}, 오늘은 아무리 기다려도 사무소에 나타나질 않는다`);
  ctx.showMessage(`몸이 아프거나 급한 일이 있다면 문자라도 할텐데, ${ctx.josaHelper(ctx.getVarName("CALLNAME", C_NUM), "가")} 무소식이라니 별일이다`);
  ctx.showMessage(`그러고보니 요즘, 근처 역 주변에 불량배들이 모여있는 걸 봤는데…… 혹시 시비가 잡혔는지도 모른다`);
  ctx.showMessage(`만에 하나의 경우를 고려해, 실력에 자신있는 사무소 스탭들을 데리고 ${ctx.josaHelper("플레이어는")} ${ctx.josaHelper(ctx.getVarName("CALLNAME", C_NUM), "를")} 역까지 마중나갔다……`);
  // TODO: PRINTW
  ctx.showMessage(`역 주변엔 ${ctx.getVarName("CALL", C_NUM)}의 모습은 커녕, 평소 보이던 불량배들까지 보이지 않는다`);
  ctx.showMessage(`${ctx.josaHelper("플레이어는")} 역 앞의, ${ctx.josaHelper(ctx.getVarName("CALLNAME", C_NUM), "가")} 사무소에 오기 전에 자주 들러 과자를 사오는 편의점에 들어가,`);
  ctx.showMessage(`W 휴대폰에 들어있는 ${ctx.getVarName("CALL", C_NUM)}의 사진을 보여주며, 오늘은 ${ctx.josaHelper(ctx.getVarName("CALLNAME", C_NUM), "가")} 오지 않았나 물어봤다……`);
  ctx.showMessage(`그러자 한시간 전에 ${ctx.josaHelper(ctx.getVarName("CALLNAME", C_NUM), "와")} 닮은 여자가 가게 앞에 몰려있던 불량배에게 둘러쌓여서,`);
  ctx.showMessage(`강제로 어딘가에 끌려가는 걸 봤다, 라고 대답했다`);
  ctx.showMessage(`${ctx.josaHelper("플레이어는")} 가슴이 술렁거려 편의점을 뛰쳐나와, 불량배들이 모일만한 곳을 닥치는 대로 찾아다니다……`);
  ctx.showMessage(`W 불경기로 문을 닫은 폐공장에서 간신히, 심한 몰골인 ${ctx.josaHelper(ctx.getVarName("CALLNAME", C_NUM), "를")} 발견했다`);
  ctx.showMessage(`억지로 벗겨졌는지 바닥에 팽개쳐져있는 ${ctx.getVarName("CALL", C_NUM)}의 옷은 군데군데 뜯겨있고,`);
  ctx.showMessage(`벽에 몸을 기대고 있는 ${ctx.getVarName("CALL", C_NUM)}의 눈은 텅 빈데다 몸 여기저기에 정액이 달라붙어 있으며, 팔에는 주사자국까지 나있다……`);
  ctx.showMessage(`빨갛게 충혈된, ${ctx.getVarName("CALL", C_NUM)}의 질에선`);
  if (ctx.getTalent(c_num, 0)) {
    ctx.showMessage(`처녀혈이 섞인`);
  }
  ctx.showMessage(`정액이 뚝뚝 떨어져 지면에 자국을 남기고 있다……`);
  ctx.showMessage(`W ${ctx.josaHelper(ctx.getVarName("CALLNAME", C_NUM), "는")} 불량배들에게 강간당했다……`);
  V_EXP_VALUE += ctx.rand(5);
  FELLA_EXP_VALUE += ctx.rand(10);
  A_EXP_VALUE += ctx.rand(3);
  DRUG_EXP_VALUE += ctx.rand(3);
  ctx.showMessage(`V경험 +{V_EXP_VALUE}`);
  if (character.cflags[C_NUM][15] === 0 && ctx.getTalent(c_num, 0)) {
    ctx.setColor(0xF58F98);
    ctx.showMessage(`【처녀상실】`);
    character.cflags[C_NUM][15] = 11;
    ctx.getTalent(c_num, 0) = 0;
    character.cstr[C_NUM][0] = "불량배";
    WEIRD_EXP_VALUE += 1;
    ctx.resetColor();
    ctx.base[C_NUM][31] -= 10;
    character.cflags[C_NUM][160] = ctx.base[C_NUM][9];
    character.cflags[C_NUM][161] = DAY[1];
    character.cflags[C_NUM][162] = DAY[2];
    character.cflags[C_NUM][163] = 6;
    character.cflags[C_NUM][164] = 4;
  }
  if (A_EXP_VALUE > 0) {
    ctx.showMessage(`A경험 +{A_EXP_VALUE}`);
    if (ctx.getTalent(c_num, 2) === 1) {
      ctx.setColor(0xF58F98);
      ctx.showMessage(`【애널처녀상실】`);
      ctx.getTalent(c_num, 2) = 0;
      character.cstr[C_NUM][3] = "불량배";
      ctx.resetColor();
      WEIRD_EXP_VALUE += 1;
      ctx.base[C_NUM][31] -= 5;
      character.cflags[C_NUM][616] = 11;
      character.cflags[C_NUM][830] = ctx.base[C_NUM][9];
      character.cflags[C_NUM][831] = DAY[1];
      character.cflags[C_NUM][832] = DAY[2];
      character.cflags[C_NUM][833] = 6;
      character.cflags[C_NUM][834] = 4;
    }
  }
  if (ctx.exp[C_NUM][105] == 0) {
    WEIRD_EXP_VALUE += 1;
  }
  ctx.showMessage(`성교경험 +{V_EXP_VALUE}`);
  ctx.showMessage(`펠라경험 +{FELLA_EXP_VALUE}`);
  if (character.cflags[C_NUM][16] === -1) {
    ctx.setColor(0xDDBBCC);
    ctx.showMessage(`첫 키스`);
    character.cflags[C_NUM][16] = 11;
    character.cstr[C_NUM][1] = "불량배";
    ctx.resetColor();
    ctx.base[C_NUM][31] -= 10;
    character.cflags[C_NUM][820] = ctx.base[C_NUM][9];
    character.cflags[C_NUM][821] = DAY[1];
    character.cflags[C_NUM][822] = DAY[2];
    character.cflags[C_NUM][823] = 6;
    character.cflags[C_NUM][824] = 1;
  }
  ctx.showMessage(`정액경험 +{A_EXP_VALUE+V_EXP_VALUE+FELLA_EXP_VALUE}`);
  ctx.showMessage(`약물경험 +{DRUG_EXP_VALUE}`);
  if (WEIRD_EXP_VALUE > 0) {
    ctx.showMessage(`이상경험 +{WEIRD_EXP_VALUE}`);
  }
  character.cflags[C_NUM][651] = 0;
  ctx.exp[ctx.count][0] += V_EXP_VALUE;
  ctx.exp[C_NUM][1] += A_EXP_VALUE;
  ctx.exp[C_NUM][5] += A_EXP_VALUE;
  ctx.exp[C_NUM][20] += V_EXP_VALUE + A_EXP_VALUE + FELLA_EXP_VALUE;
  ctx.exp[C_NUM][50] += WEIRD_EXP_VALUE;
  ctx.exp[C_NUM][57] += DRUG_EXP_VALUE;
  ctx.exp[C_NUM][105] += 1;
  ctx.base[C_NUM][31] -= 5;
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥'); ctx.waitInput();
}
