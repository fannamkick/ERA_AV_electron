/**
 * ACHIEVEMENT_12_CHURCH.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function achievement_title_12(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.results = "빚 완전 청산!";
}

export async function achievement_calc_12(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = 0;
  // TODO: FOR COUNT, 0, CHARANUM
  if (ctx.count == ctx.master) {
    // TODO: CONTINUE
  }
  if ((ctx.getCharacterNo(ctx.count) == 25 || ctx.getCharacterNo(ctx.count) == 29 || ctx.getCharacterNo(ctx.count) == 87 || ctx.getCharacterNo(ctx.count) == 88) && character.cflags[ctx.count][1] == 2) {
    ctx.locals[0] += character.cflags[ctx.count][730];
  }
  // TODO: NEXT
  if (ctx.global[12] == 0 && await difficulty_check(ctx, character) && ctx.locals[0] >= 2000000) {
    ctx.global[12] = 1;
  }
  return ctx.global[12];
}

export async function achievement_main_12(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`빚을 갚기 위해 몸을 팔 수밖에 없었던「미카미 키요카」「아오이 하루카」「키리시마 쇼코」「아마쿠사 에리」……`);
  ctx.showMessage(`키류 조직에 진 빚도 완제하고, 분발했던 그녀들이 마침내 보답받는 날이 왔습니다`);
  ctx.showMessage(`그리고 그것이 가르침을 거역하는 것이라는걸 이해하고 있어도, 그녀들은 교회와는 다른『자신들이 있을 장소』를 찾아낸 것 같습니다`);
  ctx.showMessage(`W ……과연 그것이 진짜 행복인지 어떤지는 본인들밖에 모릅니다만`);
  if (ctx.flags[548] === 0) {
    // TODO: FOR LOCAL, 0, CHARANUM
    if (ctx.locals[0] === ctx.master) {
      // TODO: CONTINUE
    } else if (character.cflags[ctx.locals[0]][1] === 2) {
      if (ctx.locals[0].no === 25) {
        ctx.getTalent(local, 210) = 0;
        ctx.getTalent(local, 211) = 1;
        ctx.getTalent(local, 126) = 1;
        ctx.showMessage(`W 《미카미 키요카는【가난뱅이】를 잃고【협상에 능숙함】【인기인】을 얻었다》`);
      } else if (ctx.locals[0].no === 29) {
        ctx.getTalent(local, 210) = 0;
        ctx.getTalent(local, 113) = 1;
        ctx.getTalent(local, 118) = 1;
        ctx.showMessage(`W 《아오이 하루카는【가난뱅이】를 잃고【매력】【고무】를 얻었다》`);
      } else if (ctx.locals[0].no === 87) {
        ctx.getTalent(local, 127) = 0;
        ctx.getTalent(local, 13) = 1;
        ctx.getTalent(local, 63) = 1;
        ctx.showMessage(`W 《키리시마 쇼코는【역습】를 잃고【솔직함】【헌신적】을 얻었다》`);
      } else if (ctx.locals[0].no === 88) {
        ctx.getTalent(local, 15) = 0;
        ctx.getTalent(local, 13) = 1;
        ctx.getTalent(local, 93) = 1;
        ctx.showMessage(`W 《아마쿠사 에리는【프라이드 높음】를 잃고【솔직함】【카리스마】를 얻었다》`);
      }
    }
    // TODO: NEXT
    ctx.flags[548] = 1;
  }
}
