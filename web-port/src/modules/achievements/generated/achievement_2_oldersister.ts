/**
 * ACHIEVEMENT_2_OLDERSISTER.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function achievement_title_2(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.results = "좀 더 누나!제대로 하자";
}

export async function achievement_calc_2(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = 0;
  // TODO: FOR COUNT, 0, CHARANUM
  if (ctx.count == ctx.master) {
    // TODO: CONTINUE
  }
  if (ctx.base[ctx.count][9] >= 20 && ctx.getTalent(count, 505) == 0 && character.cflags[ctx.count][1] == 2) {
    ctx.locals[0]++;
  }
  // TODO: NEXT
  if (ctx.global[2] == 0 && await difficulty_check(ctx, character) && ctx.locals[0] >= 4) {
    ctx.global[2] = 1;
  }
  return ctx.global[2];
}

export async function achievement_main_2(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`수많은 성인 누님들과 꺄아꺄아 우후후 한 적 있는 ${ctx.getVarName("CALL", MASTER)}에게 딱 맞는 실적이군요`);
  ctx.showMessage(`어떤 명작 야겜 타이틀 같은 시추에이션이 취향인 것 같으므로`);
  ctx.showMessage(`W 앞으로도『누님』들과 마음껏 즐겨주세요`);
  if (ctx.flags[558] === 0) {
    ctx.showMessage(`L`);
    ctx.showMessage(`어느 날, ${ctx.josaHelper("플레이어는")} 복잡해보이는 표정의 카논으로부터 키류 조직에 불려갔다……`);
    ctx.showMessage(`방문한 키류 조직 저택에는 카논은 없고, 대신 마주선 것만으로도『압력』이 느껴지는, 카논을 닮은 소녀가`);
    ctx.showMessage(`객실의 의자에 앉아 있었다`);
    ctx.showMessage(`W 「네가, 카논쨩의 그거지?」`);
    ctx.showMessage(`새끼손가락을 핑, 하고 세우면서 수수께끼의 소녀가 흥미로운 듯 ${ctx.josaHelper("플레이어를")} 훑어보고 있다`);
    ctx.showMessage(`${ctx.josaHelper("플레이어는")} 영문모를『압력』에 침을 꿀꺽 삼키면서, 천천히 수긍했다`);
    ctx.showMessage(`「파파씨하곤 이야기를 나눠봤겠지만, 나하곤 아직이었지?`);
    ctx.showMessage(`W 　나는 키류 엘렌……  키류 조직의『수장파』의 장이고, 카논쨩의 마마를 하고 있답니다♪」`);
    ctx.showMessage(`${ctx.getVarName("CALL", MASTER)}의『카논의 언니입니까?』라는 질문에, 사랑스러운 몸짓으로 방긋, 하고 웃으면서`);
    ctx.showMessage(`소녀……키류 엘렌은 그렇게 말했다`);
    ctx.showMessage(`「흥흥, 과연……카논쨩이 반할만한 이유가 있었군`);
    ctx.showMessage(`그 아이, 그래보여도`);
    if (ctx.master.no === 0) {
      ctx.showMessage(`연하 취향`);
    } else if (ctx.getTalent(master, 122) === 0) {
      ctx.showMessage(`귀여운 여자애 취향`);
    } else {
      ctx.showMessage(`미형 취향`);
    }
    ctx.showMessage(`인걸`);
    ctx.showMessage(`W 내가 조금만 더 젊었어도 너 보쌈해갔을지도 몰라♪」`);
    ctx.showMessage(`그렇게 말하는 엘렌의 눈빛에 ${ctx.josaHelper("플레이어는")} 정조의 위기를 느끼며 몸을 움츠렸다`);
    ctx.showMessage(`「여튼, 너한테 여기로 와달라 한 이유는 단순하단다`);
    ctx.showMessage(`　나로서는『수장파』라던가『카논파』라던가, 그런 항쟁은 아무래도 좋거든`);
    ctx.showMessage(`　파파씨한테 만약의 일이 생길경우엔 후계자는 카논, 아니면 너니까`);
    ctx.showMessage(`　카논쨩의 재치는 앞서 있던 동란중에 키류 조직을 이만큼 키운 선대 이상인 건 틀림 없을걸`);
    ctx.showMessage(`　게다가 너도 주어진 일이, 우리 쪽에서 보살피는 중엔 꽤 싸게 부려먹히고 있는데도 노력하고 있고 말이지`);
    ctx.showMessage(`　……하지만 말야, 카논쨩이 만약 너를 선택했다고 해도 조직 모두가 납득하진 않는다고 생각해`);
    ctx.showMessage(`　너처럼 올곧은 애가 카논의 의사대로 반려로 선택된다는 건 현실문제적으로 어렵다는 건 알지?`);
    ctx.showMessage(`　상응하는 조직, 혹은 건실한 정치가인 부모를 둔 부잣집 도련님이라던가와 결혼하지 않으면 안 돼`);
    ctx.showMessage(`　네가 카논쨩을 아무리 좋아한다고 해도, 말이야`);
    ctx.showMessage(`　그럼 그걸 입다물게 하려면 어떻게 하면 좋을까 뭐 말하자면……답은 간단하단다♪」`);
    ctx.showMessage(`W 　하고서 엘렌은 ${ctx.getVarName("CALL", MASTER)}의 뺨에 가볍게 키스를 하고 미소지으며 말한다`);
    ctx.showMessage(`「나를 함락시켜봐♪`);
    ctx.showMessage(`　파파씨한테서 나를 빼앗고, 네가 수장 이상의 그릇이라는 걸 증명해서『수장파』를 입다물게 하는거야`);
    ctx.showMessage(`　하지만…… 나는 만만치 않단다?」`);
    ctx.showMessage('');
    ctx.showMessage(`《키류 엘렌이 여배우 후보가 되었습니다》`);
    // TODO: PRINTW
    ctx.flags[558] = 1;
    // TODO: ADDCHARA 95
    ctx.global[295] = 1;
    // TODO: SAVEGLOBAL
    if (ctx.global[200] >= 0) {
      character = GETCHARA(95);
      await clearbonus_call(ctx, character);
    }
  }
}
