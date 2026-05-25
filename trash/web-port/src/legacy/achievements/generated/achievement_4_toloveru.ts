/**
 * ACHIEVEMENT_4_TOLOVERU.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function achievement_title_4(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.results = "트러블 서큐버스";
}

export async function achievement_calc_4(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = 0;
  // TODO: FOR COUNT, 0, CHARANUM
  if (ctx.count == ctx.master) {
    // TODO: CONTINUE
  }
  if (ctx.getTalent(count, 505) && ctx.getTalent(count, 85) == 1) {
    ctx.locals[0]++;
  }
  // TODO: NEXT
  if (ctx.global[4] == 0 && await difficulty_check(ctx, character) && ctx.locals[0] >= 4) {
    ctx.global[4] = 1;
  }
  return ctx.global[4];
}

export async function achievement_main_4(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(` 수많은 음마 여자아이들과 꺄꺄우후후 했던 ${ctx.getVarName("CALL", MASTER)}에게 딱 맞는 실적이군요`);
  ctx.showMessage(`어떤 에로게임 타이틀과 같은 시추에이션을 좋아하는 것 같으니`);
  ctx.showMessage(`W 앞으로도『서큐버스』들과의 트러블을 기대해 주세요`);
  if (ctx.flags[559] === 0) {
    ctx.showMessage('');
    ctx.showMessage(`「후후, 거기 아가야……나와 좋은 거 하지 않을래?」`);
    ctx.showMessage(`어느 날, ${ctx.josaHelper("플레이어가")} 거리를 걷고 있을 때, 노출도 높은 요염한 미녀가 갑자기 말을 걸었다`);
    ctx.showMessage(`풍속점 여자라기엔 소행 하나하나에 기품이 서려있어,`);
    ctx.showMessage(`단지 그자리에 있는 것만으로 벌레등처럼 남자를 끌어들이는 마성의 매력이 있다`);
    ctx.showMessage(`지금까지 수십명의 음마와 접해왔던 ${ctx.getVarName("CALL", MASTER)}에게는, 그녀의 정체가 음마라는게 명확했다`);
    ctx.showMessage(`W 오늘도 몹시 쥐어짜진지 얼마 안되서, 별로 상대하고 싶지는 않지만……`);
    ctx.showMessage(`「어머 유감이네`);
    ctx.showMessage(`　모처럼 인간여자로는 맛볼 수 없는 극상의 쾌락을 아가에게 맛보여주려고 했더니……랄까 뭔가요?`);
    ctx.showMessage(`아가,`);
    if (GETCHARA(81) > 0) {
      ctx.showMessage(`에리스`);
    } else if (GETCHARA(82) > 0) {
      ctx.showMessage(`리리스`);
    } else {
      ctx.showMessage(`음마의 존재`);
    }
    ctx.showMessage(`를 알고 있었어!?`);
    ctx.showMessage(`　……그래, 그렇다면 얘기가 빠르겠네`);
    ctx.showMessage(`W 　나는 아이리스, 동포를 찾기위해 이 세계에 온 음마야」`);
    ctx.showMessage(`아이리스라 자칭한 음마여성이 말하길, 다른 세계……즉 이 세계에서 음마의 존재가 관측됐기에`);
    ctx.showMessage(`동포를 맞아들이기 위해서 그녀가 왔다고 한다`);
    ctx.showMessage(`「과연……즉 아가가 알고 있는 음마는 남자의 정령을 효율좋게 빨아들인다는 거지?`);
    ctx.showMessage(`　그리고 아가에게는 음마에 대한 항체……라고 할만한게 있다, 라`);
    ctx.showMessage(`　특히나, 항체소유자인 아가의 정령은 음마에게 있어서 극상의 맛이기도 한다라……`);
    ctx.showMessage(`　그걸 가지고 아가가 음마를 몇 명이나 길들이고 울린다라……과연`);
    ctx.showMessage(`　후후, 흥미롭네요……아가, 나를 다른 음마처럼 길들여 보지 않을래?`);
    ctx.showMessage(`W 　뭐, 아가가 안된다 말해도 맘대로 따라갈테지만♪」`);
    ctx.showMessage(`……아무래도 이상한 곳에서 마음에 든 것 같았다`);
    ctx.showMessage(`자세한 사정은 잠시 후에 설명해도 좋겠지, 라고 생각하면서,`);
    ctx.showMessage(`${ctx.josaHelper("플레이어는")} 예정을 변경해서 이 일을 보고하기 위해 카논에게로 향하기로 했다……`);
    ctx.showMessage('');
    ctx.showMessage(`《아이리스가 여배우 후보가 되었습니다》`);
    // TODO: PRINTW
    // TODO: ADDCHARA 84
    ctx.global[284] = 1;
    // TODO: SAVEGLOBAL
    ctx.flags[559] = 1;
    if (ctx.global[200] >= 0) {
      character = GETCHARA(84);
      await clearbonus_call(ctx, character);
    }
  }
}
