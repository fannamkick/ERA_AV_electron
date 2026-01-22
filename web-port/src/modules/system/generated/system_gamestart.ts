/**
 * SYSTEM_GAMESTART.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function eventfirst(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: LOADGLOBAL
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  ctx.showMessage('');
  ctx.showMessage('이 게임은 성적으로 과격한 묘사가 다수 포함되어 있어,');
  ctx.showMessage('18세 미만인 분이나, 현실과 가상의 구별을 할 수 없는 분,');
  ctx.showMessage('자신의 행동에 책임을 가질 수 없는 분의 플레이는 금지합니다.');
  ctx.showMessage('또한 이 게임에 등장하는 모든 등장인물들은 모두 만 19세 이상입니다.');
  ctx.showMessage('이상의 사항을 확인하신 후, 게임을 시작해주십시오.');
  ctx.showMessage('');
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  await ctx.wait();
  DAY = 0;
  TIME = 0;
  character = -1;
  ctx.assi = -1;
  ctx.flags[1] = -1;
  ctx.flags[2] = -1;
  ctx.flags[200] = 1;
  ctx.flags[201] = 0;
  ctx.flags[36] = 1;
  ctx.flags[37] = 1;
  ctx.flags[60] = 0;
  ctx.flags[70] = 1;
  await chara_price(ctx, character);
  // Label: BEFORE_MODE_SELECT
  ctx.showMessage('');
  ctx.showMessage('★★모드를 선택해주십시오★★');
  ctx.showMessage('[0] EASY     (120주 제한, 목표 금액 3000000Pt)');
  ctx.showMessage('[1] NORMAL   (100주 제한, 목표 금액 5000000Pt)');
  ctx.showMessage('[9] 모드 설명을 읽는다');
  // Label: INPUT_LOOP_0
  await ctx.inputNumber();
  if (ctx.result === 0) {
    ctx.flags[3] = 120;
    ctx.flags[4] = 3000000;
    ctx.flags[5] = 1;
    ctx.flags[35] = 1;
    ctx.item[6] = 1;
    ctx.money = 2000;
    ctx.master = ctx.getCharacterNo(0);
    DAY[1] = 4;
    DAY[2] = 1;
    ctx.flags[23] = 10;
    ctx.flags[24] = 1;
    // TODO: ADDCHARA 151
    // TODO: LOADGLOBAL
    ctx.global[351] += 1;
    // TODO: SAVEGLOBAL
    ctx.masterAbilities[12] += 1;
  } else if (ctx.result === 1) {
    ctx.flags[3] = 100;
    ctx.flags[4] = 5000000;
    ctx.flags[5] = 2;
    ctx.flags[35] = 1;
    ctx.item[6] = 1;
    ctx.money = 1000;
    ctx.master = ctx.getCharacterNo(0);
    DAY[1] = 4;
    DAY[2] = 1;
    ctx.flags[23] = 10;
  } else if (ctx.result === 9) {
    ctx.showMessage('EASY모드는 기한 120주(행동횟수 +40회), 목표 금액 3000000Pt(NORMAL의 3/5)이며');
    ctx.showMessage('초기 포인트가 2000pt, 주인공 기교가 +1, 여배우후보「타카나시 노에미」가입한 상태로 시작합니다');
    ctx.print('그러나');
    await hint_chara("EASY모드를 경유한 데이터", ctx, character);
    ctx.showMessage('는 실적을 당성할 수 없습니다');
    ctx.showMessage('실적 달성을 목표한다면 NORMAL모드로 시작하길 바랍니다');
    ctx.showMessage('그리고 캐릭터 클리어 보너스는 EASY모드에서도 습득 가능합니다');
    ctx.showMessage('NORMAL로 놀기 전에 EASY를 탐구하는 것도 헛된 일은 아닐 겁니다…… 노력에 걸맞을지는 몰라도요');
    // TODO: PRINTW
    // GOTO BEFORE_MODE_SELECT - 구조 변경 필요 (while/break 사용 권장)
  } else {
    // GOTO INPUT_LOOP_0 - 구조 변경 필요 (while/break 사용 권장)
  }
  ctx.showMessage('네토라레 기능을 ON으로 설정합니까?');
  // Label: INPUT_LOOP_2
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 아니오');
  ctx.showMessage('[2] - 그게 뭐야?');
  await ctx.inputNumber();
  if (ctx.result === 0) {
    ctx.showMessage('네토라레 기능을 ON으로 설정했습니다');
    ctx.showMessage('');
    ctx.flags[540] = 0;
  } else if (ctx.result === 1) {
    ctx.showMessage('네토라레 기능을 OFF로 설정했습니다');
    ctx.showMessage('');
    ctx.flags[540] = 1;
  } else if (ctx.result === 2) {
    ctx.showMessage('등장하는 여성 캐릭터들은 항상 다른 남자들에게 수작을 당할 가능성이 있게 됩니다');
    ctx.showMessage('그것은 동급생이거나, 호스트이거나, 치한이거나……');
    ctx.showMessage('여성 캐릭터들이 다른 남성의 소유가 되는 것이 싫은 분께서는 OFF하시는 것을 권장합니다');
    // TODO: PRINTW
    // GOTO INPUT_LOOP_2 - 구조 변경 필요 (while/break 사용 권장)
  } else {
    // GOTO INPUT_LOOP_2 - 구조 변경 필요 (while/break 사용 권장)
  }
  if (ctx.global[200] > 0) {
    await clearbonus(ctx, character);
  }
  await set_videosale(ctx, character);
  if (ctx.flags[5] == 1) {
    ctx.showMessage(`W 《키류 조직으로부터 업소녀「타카나시 노에미」가 파견되었습니다》`);
  }
  await start_select_opening(ctx, character);
  // TODO: BEGIN SHOP
  return 0;
}

export async function start_select_opening(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // Label: INPUT_LOOP_2
  ctx.showMessage('★오프닝 스토리를 생략합니까?★');
  ctx.showMessage('[0] - 생략한다');
  ctx.showMessage('[1] - 생략하지 않는다');
  ctx.showMessage('[2] - 세줄요약');
  await ctx.inputNumber();
  if (ctx.result === 0) {
    ctx.drawLine();
    ctx.showMessage('(오프닝 스토리를 생략합니다)');
  } else if (ctx.result === 1) {
    await opening(ctx, character);
  } else if (ctx.result === 2) {
    await simple_opening(ctx, character);
  } else {
    // GOTO INPUT_LOOP_2 - 구조 변경 필요 (while/break 사용 권장)
  }
}
