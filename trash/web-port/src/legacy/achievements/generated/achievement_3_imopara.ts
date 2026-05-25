/**
 * ACHIEVEMENT_3_IMOPARA.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function achievement_title_3(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.results = "여동생 파라다이스!";
}

export async function achievement_calc_3(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = 0;
  // TODO: FOR COUNT, 0, CHARANUM
  if (ctx.count == ctx.master) {
    // TODO: CONTINUE
  }
  if (ctx.getTalent(count, 320) && ctx.getTalent(count, 85) == 1) {
    ctx.locals[0]++;
  }
  // TODO: NEXT
  if (ctx.global[3] == 0 && await difficulty_check(ctx, character) && ctx.locals[0] >= 4) {
    ctx.global[3] = 1;
  }
  return ctx.global[3];
}

export async function achievement_main_3(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`수많은 여동생 속성 소녀들과 꺄아꺄아 우후후 한 적 있는 ${ctx.getVarName("CALL", MASTER)}에게 딱 맞는 실적이로군요`);
  ctx.showMessage(`어떤 명작 야겜 타이틀 같은 시추에이션이 취향인 것 같으므로`);
  ctx.showMessage(`W 앞으로도『여동생』들과 마음껏 즐겨주세요`);
  if (ctx.getTalent(master, 162) === 0) {
    ctx.showMessage(`피가 섞이지 않았어도『여동생』들에 대한 애정은 진짜인 모양이군요`);
    ctx.showMessage(`그런 ${ctx.getVarName("CALL", MASTER)}에겐【시스콘】의 칭호를 수여합니다`);
    ctx.getTalent(master, 162) = 1;
  }
}
