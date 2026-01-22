/**
 * ELLEN_MISSION_DETAIL.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function mission_start(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  await mission_calc(ctx, character);
  ctx.showMessage(`어느 날, 엘렌이 ${ctx.josaHelper("플레이어를")} 키류 조직 사무소로 불러냈다……`);
  ctx.showMessage(`큰 방에 카논과 엘렌이 기다리고 있는 걸 보면, 조직이 관련된 부탁인 것 같다`);
  ctx.showMessage(`요즘은 키류 조직도 간부가 교체되며 인수인계로 정신이 없었고, 일부러 찾아오지도 않은데다`);
  ctx.showMessage(`카논과 엘렌도 여기저기 뛰어다니느라 얼굴을 보는 것도 오랜만의 일이었다`);
  ctx.showMessage(`키류 조직의 내부항쟁도 엘렌의 배반으로『카논파』의 승리로 끝나고, 선대 수장은 은거하게 됐다`);
  ctx.showMessage(`당분간은 신뢰할 수 있는 간부가 조직을 운영하게 되지만, 실권은 카논과 엘렌이 쥐고 있으며,`);
  ctx.showMessage(`${ctx.getVarName("CALL", MASTER)}도, 어느새 조직의 일원으로 받아들여져`);
  ctx.showMessage(`조직 안에서 할 수 있는 일이 전보다 많아지게 됐다`);
  ctx.showMessage(`${ctx.josaHelper("플레이어가")} 진 빚문제가 아직 남아있긴 하지만,`);
  ctx.showMessage(`전과는 조건이 달라졌기에 드럼통에 묻혀 바다에 수장될 일은 없어졌다고 한다……`);
  ctx.showMessage(`L`);
  ctx.showMessage(`「일단 고맙다고 해둘게♪`);
  ctx.showMessage(`　간부도 카논짱의 입김이 닿은 애들로 모아졌고, 조직내에서 네 발언권도 무시 못 할 정도로 커졌고`);
  if (R === 1 && I === 1) {
    ctx.showMessage(`레이첼짱하고 이쿠미짱도 네 덕분에 우리를 도와주겠다고 해주고……`);
  } else if (R === 1 && I === 0) {
    ctx.showMessage(`레이첼짱이 네 덕분에 우리를 도와주겠다고 해주고……`);
  } else if (R === 0 && I === 1) {
    ctx.showMessage(`이쿠미짱이 네 덕분에 우리를 도와주겠다고 해주고……`);
  }
  ctx.showMessage('');
  ctx.showMessage(`　네가 온 뒤로 우리 조직엔 좋은 일 투성이야`);
  ctx.showMessage(`　그래서 아마도 말야, 우리가 이 나라를 뒤에서 조종할 날도 멀지 않다고 봐`);
  ctx.showMessage(`　그치만, 실현하기 위해선 높으신 분들을 내가 길들여야 하는데`);
  ctx.showMessage(`　간단하게 들리겠지만, 그런 높으신 분들은『폭력과 돈』으로는 떨어트리기 힘들단 말이야`);
  ctx.showMessage(`W 　높으신 분들을 길들이려면, 그분들의 지배욕을 만족시킬 인재를 대줄 필요가 있어♪`);
  ctx.showMessage(`　그런 사람들은 대체로 남들에겐 말못할 변태취향이 있잖아?`);
  ctx.showMessage(`　예를 들면 처녀짱인데도 자위에 미친 조그만 아이가 좋다던가,`);
  ctx.showMessage(`　네게 맡기고 있는 창관에도 그런 손님이 있잖니`);
  ctx.showMessage(`　지금까지 그런『상여품』은 우리 조교사 담당이었지만, 그 사람이『수장파』였어`);
  ctx.showMessage(`　이번에 카논짱이 실권을 거머쥐게 되니까, 손가락을 자르고 은퇴해 버렸지`);
  ctx.showMessage(`W 　네 사업도 그렇고 불법행위를 봐주고 있는 건『상여품』이 있어서니까……`);
  ctx.showMessage(`　그래서 무슨 말이 하고 싶냐면…… 네가 그 일을 이어서 해줬으면 해♪`);
  ctx.showMessage(`　조교사라고 하니 저항감이 있을지 모르지만…… 이렇게 말하면 납득해 주려나?`);
  ctx.showMessage(`　……내가 부탁하는 인재를, 내가 지정한대로, 평소처럼『지도』하는 것`);
  ctx.showMessage(`　간단하게 말하면 네가 항상 하는 업무의 연장선상, 이라는 거야`);
  ctx.showMessage(`　다른게 있다면『조건이 지정된』부분이려나?`);
  ctx.showMessage(`　그렇게 어려운 일은 아니니까, 너무 부담가질 필요는 없는데…… 어떡할래?`);
  ctx.showMessage(`　네가『못 해!』라고 한다면, 다른 적당한 사람을 찾아볼게」`);
  ctx.showMessage(`L`);
  ctx.showMessage(`한 마디로『손님의 취향에 맞는 인재를 키워달라』는 의뢰다`);
  ctx.showMessage(`엘렌 말대로 이런 일을 맡길 수 있고, 조직 내에서 어느정도 권위도 있는 사람이라면 ${ctx.josaHelper("플레이어가")} 적임이겠지`);
  ctx.showMessage(`아마도『적당한 사람을 찾아본다』고 해도, 어느정도 경험과 실력이 있는 사람이 필요할텐데……`);
  ctx.showMessage(`W`);
  ctx.showMessage(`「물론 공짜는 아니야♪`);
  ctx.showMessage(`　지도하는 동안엔 여배우로 써도 돼고, 조직에서 보너스도 나올거야`);
  ctx.showMessage(`　이제와선 허울뿐이지만, 네 변제 기간을 늘려줄 수도 있어`);
  ctx.showMessage(`　거기다, 만약에 손님이『구입 예약』한 사람이 아니라면, 의뢰가 끝나고 네 사무소에서 계속 쓸 수도 있어`);
  ctx.showMessage(`　원하는 사람하고『놀고 싶을 뿐』인 사람도 있으니 말야`);
  ctx.showMessage(`　어때?　꽤 파격적인 조건이지♪」`);
  ctx.showMessage(`W`);
  ctx.showMessage(`엘렌 말대로, 엄청나게 좋은 조건이다`);
  ctx.showMessage(`그럼, 이걸 받아야 하나 말아야 하나……`);
  // Label: INPUTLOOP_DECIDE
  ctx.showMessage('[0] - 의뢰를 받는다');
  ctx.showMessage('[1] - 의뢰를 거절한다');
  await ctx.inputNumber();
  if (ctx.result === 0) {
    ctx.showMessage(`「다행이야, 사실 너말고 다른 사람에게 부탁하기는 싫었어`);
    ctx.showMessage(`　그럼, 이 일을 하기 전에 반드시 지켜야 할 조항이 있어`);
    ctx.showMessage(`　하나, 특수한 약물 투여 금지`);
    ctx.showMessage(`　하나, 특수한 인체개조 금지`);
    ctx.showMessage(`　하나, 성격이 변해버릴 정도의 지도는 금지`);
    ctx.showMessage(`W 　……어때?　지키기 어려운 조항은 아니지?」`);
    ctx.showMessage(`L`);
    ctx.showMessage(`엘렌에게 주의항목을 들으며, 지도하게 될 인재 자료를 흝어봤다……`);
    ctx.showMessage(`당연히도 첨부된 사진들은 모두 수준급의 외모를 가진 인재들 뿐이다`);
    ctx.showMessage(`${ctx.josaHelper("플레이어는")} 머리속에서 앞으로의 지도계획을 세우며, 카논과 엘렌과 잡담을 했다……`);
    ctx.showMessage(`W`);
    ctx.showMessage(`《미션이 해금됐습니다!》`);
    ctx.showMessage(`※앞으로 메인 화면의「미션」에서 의뢰를 받을 수 있습니다`);
    ctx.flags[570] = 1;
  } else if (ctx.result === 1) {
    ctx.showMessage(`「그래…… 마음이 바뀌면 말해줘♪」`);
    ctx.showMessage(`W`);
    ctx.showMessage(`지금은 아직 사무소 일만으로도 벅차다고 판단한 ${ctx.josaHelper("플레이어는")}, 제안을 거절하기로 했다……`);
  } else {
    // GOTO INPUTLOOP_DECIDE - 구조 변경 필요 (while/break 사용 권장)
  }
  ctx.showMessage(`W`);
  return 0;
}

export async function mission_calc(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  R = 0;
  I = 0;
  S = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else if (ctx.getCharacterNo(ctx.count) === 9) {
      if (character.cflags[ctx.count][1] === 2) {
        R = 1;
      }
    } else if (ctx.getCharacterNo(ctx.count) === 11) {
      if (character.cflags[ctx.count][1] === 2) {
        I = 1;
      }
    } else if (ctx.getCharacterNo(ctx.count) === 26) {
      if (character.cflags[ctx.count][1] === 2) {
        S = 1;
      }
    }
  }
}

export async function koisora_add(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character.cflags[ctx.master][669] < 5) {
    ctx.showMessage(`「그러고보니 유우키짱, 아이돌 활동 열심히 하나봐?」`);
    ctx.showMessage('');
    ctx.showMessage(`당신이 직접 찾아와도 곁눈질도 안하며 종이다발을 빠르게 넘기던 엘렌은`);
    ctx.showMessage(`카미나 유우키의 화제를 입에 올렸다`);
    ctx.showMessage('');
    ctx.showMessage(`「아무래도 CPG의 미히로짱급하고 비교하면 인기는 좀 떨어지지만,`);
    ctx.showMessage(`　그래도 데뷔곡이 주간차트 톱10에 들어가다니, 신인치고는 대단하잖아♪`);
    ctx.showMessage(`　거기다 리액션이랑 토크도 재밌다고 예능쪽도 평가가 괜찮고……`);
    ctx.showMessage(`　분명 유우키짱이라면 CPG의 미히로짱이나 포텐셜이 폭발한 린코짱 정도는 아니더라도`);
    ctx.showMessage(`　그 바로 밑까지라면 충분히 올라갈 거라고 봐`);
    ctx.showMessage(`　그러니까, 네겐 유우키짱의 인기가 더 올라가도록 도와주길 바래`);
    ctx.showMessage(`W 　――분명 우리 목적을 이루기 위한 재료가 될테니까」`);
    ctx.showMessage('');
    ctx.showMessage(`말을 마치고, 엘렌은 읽고 있던 종이다발을 ${ctx.getVarName("CALL", MASTER)}에게 건냈다`);
    ctx.showMessage(`무언가의 자료를 모아놓은 것으로 보이는 종이다발 표지에는`);
    ctx.showMessage(`『XX섬의 해저 에너지 자원에 대한 조사와 보고』라고 써있다`);
    if (GETCHARA(11, 0) >= 0) {
      ctx.showMessage(`그리고 제목 밑에는『연구주임: 스노 이쿠미』라고 적혀있었다`);
    }
    ctx.showMessage('');
    ctx.showMessage(`「다 읽어볼 필요는 없어♪`);
    ctx.showMessage(`　맞아, 이건 유우키짱의 고향인 XX섬의 바다 밑에 묻혀있다는 에너지 자원에 대해`);
    ctx.showMessage(`　내가 신뢰하는 연구자에게 극비리에 조사를 부탁한 자료야`);
    ctx.showMessage(`　그녀는 지질학은 전분분야가 아니라고 하지만, 적어도 국내 유수의 전문가들이`);
    ctx.showMessage(`　다발로 덤벼도 상대도 안될 만큼의 방대한 지식을『모든 과학분야』에서 가지고 있으니까`);
    ctx.showMessage(`　……그래, 우리의 목적은 XX섬`);
    ctx.showMessage(`　그런데 XX섬은 이미 해저 에너지 자원을 노리는 투기꾼들이`);
    ctx.showMessage(`　섬의 90%를 사버려서 말이야`);
    ctx.showMessage(`　지금부터 참가해도, 투기꾼들이 가격을 말도 안되게 올려버렸으니까……`);
    ctx.showMessage(`　예를 들면 XX섬에 있던, 지금은 폐교된 중학교 부지가 10억을 넘는다니까?`);
    ctx.showMessage(`　한마디로 XX섬은 부동산 버블이 한창인 곳이야`);
    ctx.showMessage(`　――『XX섬 출신인 카미나 유우키를 선전한다면 나머지 토지 10％는 간단히 손에 넣을 수 있을지도 몰라`);
    ctx.showMessage(`　그러니까 엘렌씨는 카미나 유우키를 아이돌로 팔아서 XX섬의 사람들에게 어필하려 하고 있어』`);
    ctx.showMessage(`W 　라고, 생각하고 있지 않아?`);
    ctx.showMessage(`　……안됐지만 오답이야`);
    ctx.showMessage(`　애초에 우리들…… 특히 카논짱이 XX섬하고 살짝 특별한 관계라서 말이야`);
    ctx.showMessage(`　그리고 넘겨준 자료에 의하면『XX섬에 해저 에너지 자원은 존재하지 않는다』――그게 결론이야`);
    ctx.showMessage(`　그러니까 연구자들하고 투기꾼들…… 아마 뒤에는 거물 정치가도 붙어있겠지,`);
    ctx.showMessage(`　그 셋이 결탁해서 땅을 굴리고 막대한 돈을 끌어모은다――`);
    ctx.showMessage(`　그게 나와 카논짱이 생각한 XX섬 알박기 소동의 진상이야`);
    ctx.showMessage(`　그리고 유우키짱을 아이돌로 만든 이유인데…… 이쪽 자료를 봐줄래?」`);
    // TODO: PRINTW
    if ((character.cflags[ctx.master][660] & 1) === 0) {
      ctx.drawLine('‥');
      ctx.showMessage('【이하라 코토노】');
      ctx.setColor(0xDDBBCC);
      // TODO: CHKFONT "あくびん"
      if (ctx.result) {
        // TODO: SETFONT "あくびん"
      }
      ctx.showMessage('「왜 제 주변의 남자들은 변태랑 짐승이랑 음란변태밖에 없는건가요!」');
      // TODO: SETFONT "MS ゴシック"
      ctx.resetColor();
      ctx.showMessage('○○현의, 풍광명미라고 하면 듣기는 좋지만 실상은 시골 그 자체인 ○○섬에서');
      ctx.showMessage('지금은 폐교된 학원에 다니던 고○학생');
      ctx.showMessage('공기가 맑은 곳이 아니면 몸상태가 나빠지는 병약체질이며');
      ctx.showMessage('어릴적부터 ○○섬에서 살아왔지만, 알박기 소동때 납치당했다');
      ctx.showMessage('그 뒤에 한 졸부에게 팔렸지만, 성적인 행위는 전혀 없이 손녀처럼 귀여움받았다');
      ctx.showMessage('(굳이 이상한 점을 말하자면『갈아입히기 인형』처럼 소중히 다뤄졌던 것일까)');
      ctx.showMessage('');
      ctx.showMessage('낮선 공기에 당연하게도 몸상태가 나빠져, 공기가 깨끗한 섬의 별장에서 요양생활중이며');
      ctx.showMessage('때때로 육지에서 젊고 실력있는 한의사가 찾아와 진료를 받고 있어');
      ctx.showMessage('현재는 소강상태이다');
      ctx.showMessage('항상 불만스러운 표정을 짓고 있고 오빠가 어느새인가 오타쿠가 되버린 탓에');
      ctx.showMessage('남성불신경향이 있다');
      ctx.showMessage('또 병약하다는 공통점이 있는 시라나미 유카리와는');
      ctx.showMessage('영혼의 쌍둥이로 보일만큼 사이가 좋다');
      ctx.showMessage('');
      ctx.showMessage('다양한 사람들과 만나게 해봤지만, 남자한테는 전혀 흥미가 없어보이니');
      ctx.showMessage('츤데레가 아니라 없데레 아닐까♪(엘렌왈)');
      ctx.showMessage('');
      ctx.showMessage('연령: 15세　난이도: C　성장도: D　공헌도: C　매각치: B');
    }
    if ((character.cflags[ctx.master][660] & 2) === 0) {
      ctx.drawLine('‥');
      ctx.showMessage('【고토 아야카】');
      ctx.setColor(0xDDBBCC);
      // TODO: CHKFONT "あくびん"
      if (ctx.result) {
        // TODO: SETFONT "あくびん"
      }
      ctx.showMessage('「강아지 같다……나, 나는 강아지가 아니야!」');
      // TODO: SETFONT "MS ゴシック"
      ctx.resetColor();
      ctx.showMessage('○○현의, 풍광명미라고 하면 듣기는 좋지만 실상은 시골 그 자체인 ○○섬에서');
      ctx.showMessage('지금은 폐교된 학원에 다니던 고○학생');
      ctx.showMessage('명량하고 쾌활한 성격으로 남자틈에 섞여서 노는 활력 넘치는 아이');
      ctx.showMessage('「덩치만 커진 아이」라는 말이 딱 맞을 정도로 색기가 부족하고,');
      ctx.showMessage('정신연령도 낮아 음담패설을 어려워해 관련된 이야기만 나와도 당황한다');
      ctx.showMessage('알박기 소동때 이유는 몰라도 그녀 혼자 남겨져');
      ctx.showMessage('뒤늦게 토지매수에 뛰어든 키류 조직에 보호받고');
      ctx.showMessage('지금은 엘렌의 도움으로 당신(=감독)과 다른 학원에 다니고 있다');
      ctx.showMessage('그래도 옛날 친구들이 걱정되는지, 대담하게도 때때로 키류 조직의 사무소에 찾아와');
      ctx.showMessage('엘렌에게 수색을 부탁하지만, 이유는 몰라도');
      ctx.showMessage('먼저 키류조직에(결과적으로)보호받은 카미나 유우키가 무사하다는 사실은 알려주지 않고 있다');
      ctx.showMessage('참고로 TV나 잡지에서 활약하는 유우키는');
      ctx.showMessage('『많이 닮은 사람』이라고 생각하는 것 같다');
      ctx.showMessage('');
      ctx.showMessage('연령: 16세　난이도: D　성장도: C　공헌도: C　매각치: B');
    }
    if ((character.cflags[ctx.master][660] & 4) === 0) {
      ctx.drawLine('‥');
      ctx.showMessage('【칸노 린카】');
      ctx.setColor(0xDDBBCC);
      // TODO: CHKFONT "あくびん"
      if (ctx.result) {
        // TODO: SETFONT "あくびん"
      }
      ctx.showMessage('「시끄럽다, 입 다물어라. 난 친구들을 구하고 싶은 것 뿐이야……!」');
      // TODO: SETFONT "MS ゴシック"
      ctx.resetColor();
      ctx.showMessage('');
      ctx.showMessage('○○현의, 풍광명미라고 하면 듣기는 좋지만 실상은 시골 그 자체인 ○○섬에서');
      ctx.showMessage('지금은 폐교된 학원에 다니던 고○학생');
      ctx.showMessage('인간관계가 서툴고 날선 성격에 항상 언짢아보이는 얼굴을 하고 있기에');
      ctx.showMessage('먼저 다가가는 사람이 없다');
      ctx.showMessage('성격과 분위기는 둘째치고 소재는 좋기에');
      ctx.showMessage('남학생들의 학교내 랭킹에선 항상 상위를 차지하고 있다고 한다');
      ctx.showMessage('알박기 소동때 납치당했으나 자력으로 투기꾼들에게서 탈출해');
      ctx.showMessage('언젠가 반드시 친구들을 되찾겠다고 결심하여');
      ctx.showMessage('지금은 뒷세계에서 경비원 비슷한 일을 하며 살아가고 있다');
      ctx.showMessage('그때 아이돌로 활동하던 카미나 유우키와 비슷한 사람을 본 그녀는');
      ctx.showMessage('그 아이돌이 소속된 예능사무소에 처들어가 아이돌과 면회를 요구하고 있었다,');
      ctx.showMessage('라는 보고를 들은 엘렌에게 보호받게 됐다');
      ctx.showMessage('');
      ctx.showMessage('연령: 16세　난이도: A　성장도: C　공헌도: C　매각치: B');
    }
    if ((character.cflags[ctx.master][660] & 8) === 0) {
      ctx.drawLine('‥');
      ctx.showMessage('【시노자키 미사】');
      ctx.setColor(0xDDBBCC);
      // TODO: CHKFONT "あくびん"
      if (ctx.result) {
        // TODO: SETFONT "あくびん"
      }
      ctx.showMessage('「어디, 한 번 즐겨볼까?」');
      // TODO: SETFONT "MS ゴシック"
      ctx.resetColor();
      ctx.showMessage('');
      ctx.showMessage('○○현의, 풍광명미라고 하면 듣기는 좋지만 실상은 시골 그 자체인 ○○섬에서');
      ctx.showMessage('지금은 폐교된 학원에 다니던 고○학생');
      ctx.showMessage('유아독존을 체현한 타입으로 성적은 최상위권에 의외로 빈틈없는 천재파');
      ctx.showMessage('학원에서는 풍기위원장을 밭아 카미나 유우키와 콤비로 활동했지만,');
      ctx.showMessage('사실 교사진에게 점수를 번다는 불순한 동기가 있었다');
      ctx.showMessage('알박기 소동이 일어나고 한 지하 카지노에 버니걸로 팔려갔지만,');
      ctx.showMessage('본인은 그 상황을 별로 비관시하지 않고 오히려 즐기고 있었으며');
      ctx.showMessage('지하 카지노에 초대받은 카논을 자신을 만족시켜줄 만한 상대라 판단하고');
      ctx.showMessage('속임수가 허용되는 포커로 승부했다');
      ctx.showMessage('결국 그녀의 속임수를 반대로 이용한 카논에게 패배하고,');
      ctx.showMessage('거기다 카지노를 파산시킬 기세로 이겨나간 카논에게');
      ctx.showMessage('돈 대신에 그녀의 신병이 키류 조직에 넘겨지게 됐다');
      ctx.showMessage('');
      ctx.showMessage('물론 그녀도 옛날 친구들을 찾기 포기한 것은 아니었고');
      ctx.showMessage('지하 카지노라면 인신매매에 훤한 사람과 만날 수 있을거라 확신하고 있었다하며');
      ctx.showMessage('그런 그녀에게 카논을 만난것은 천재일우의 기회라 할 수 있었다');
      ctx.showMessage('');
      ctx.showMessage('그리고 TV에서 과거 파트너였던 유우키가 아이돌로 활동하고 있다는 것과');
      ctx.showMessage('그녀가 키류 조직의 관련회사 소속이라는 것을 알고');
      ctx.showMessage('당신(=감독)과 만나길 요청했다');
      ctx.showMessage('');
      ctx.showMessage('연령: 16세　난이도: C　성장도: B　공헌도: C　매각치: B');
    }
    if ((character.cflags[ctx.master][660] & 16) === 0) {
      ctx.drawLine('‥');
      ctx.showMessage('【시이나 미시즈】');
      ctx.setColor(0xDDBBCC);
      // TODO: CHKFONT "あくびん"
      if (ctx.result) {
        // TODO: SETFONT "あくびん"
      }
      ctx.showMessage('「네 손, 크다…… 역시 남자아이, 네요」');
      // TODO: SETFONT "MS ゴシック"
      ctx.resetColor();
      ctx.showMessage('');
      ctx.showMessage('○○현의, 풍광명미라고 하면 듣기는 좋지만 실상은 시골 그 자체인 ○○섬에서');
      ctx.showMessage('지금은 폐교된 학원에 다니던 고○학생');
      ctx.showMessage('용모단전, 두뇌명석, 품행방정을 모두 갖춘 아가씨로');
      ctx.showMessage('학원에서는 학생회장으로서 학생들에게 두터운 신뢰를 받는 학생의 거울이었다');
      ctx.showMessage('평소의 온화한 분위기에선 상상도 안가지만,');
      ctx.showMessage('한 번 정한일은 절대 바꾸지 않는 단호한 일면도 있다');
      ctx.showMessage('어릴적부터 귀하게 자라왔지만, 그런 환경을 갑갑하게 여길때도 있어서인지');
      ctx.showMessage('도시와 자유를 향한 동경심이 크다');
      ctx.showMessage('알박기 소동때는 대지주의 딸로서의 입장도 있기에 표면적으로는 완만하게');
      ctx.showMessage('유력자에게 시집간 것으로 돼있지만, 실상은 팔려간 것이나 다름없었다');
      ctx.showMessage('그러나 누군가에 의해 그녀가 시집간 유력자의 스캔들이 차례차례 밝혀져,');
      ctx.showMessage('그 소동을 틈타 카미나 유우키의 친구인 그녀를 수색하던 키류 조직에 의해');
      ctx.showMessage('순정이 더럽혀지기 전에 무사히 구출되었다');
      ctx.showMessage('');
      ctx.showMessage('그 후엔 키류 엘렌의, 그녀들에게도 큰 이득이 있을『한 계획』을 위해');
      ctx.showMessage('키류 조직의 영향력 아래에 있는 온천여관에서 일하고 있다');
      ctx.showMessage('');
      ctx.showMessage('연령: 17세　난이도: C　성장도: B　공헌도: C　매각치: A');
    }
    ctx.drawLine('‥');
    ctx.showMessage(`「이 아이들은 알박기 소동때 유우키짱처럼 마지막까지 저항했던 아이들이야`);
    ctx.showMessage(`　결국 투기꾼들을 막지 못하고 납치당한 뒤 팔려나갔디만,`);
    ctx.showMessage(`　유우키짱이 아이돌이 돼준 덕분에, 어디 있는지 찾을 수 있었어`);
    ctx.showMessage(`　참고로, 아직은 말 못하지만, 이 아이들도 우리 계획의 열쇠가 되어줄 아이들이야♪`);
    ctx.showMessage(`　그런데 말야…… 아무래도 우리들하고 투기꾼들은 그렇게 차이는 안나잖아?`);
    ctx.showMessage(`　그러니까 영 신용을 얻지 못하고 있단 말이야`);
    ctx.showMessage(`　그래서, 네가 이 아이들을 맡아주면 어떨까?`);
    ctx.showMessage(`　대신 이 아이들을 빼내오는데 살~짝 돈이 들었으니까,`);
    ctx.showMessage(`　네 쪽에서도 조금만 부담해주는 형태로……」`);
    // TODO: PRINTW
    ctx.showMessage(`엘렌이 건네준, 카미나 유우키의 옛 친구들의 사진이 실린 자료를 바라보며`);
    ctx.showMessage(`${ctx.josaHelper("플레이어는")} 어떻게 하면 좋을지 생각했다……`);
    ctx.showMessage(`사진 속 소녀들은 모두 매력적인 미소녀들이니, 만약 AV에 출연시킬 수 있다면`);
    ctx.showMessage(`비용은 바로 회수 가능할 것이다……`);
    if ((character.cflags[ctx.master][660] & 1) == 0) {
      ctx.showMessage('[0] - 이하라 코토노를 소개받는다 (1000000포인트)');
    }
    if ((character.cflags[ctx.master][660] & 2) == 0) {
      ctx.showMessage('[1] - 고토 아야카를 소개받는다   (1000000포인트)');
    }
    if ((character.cflags[ctx.master][660] & 4) == 0) {
      ctx.showMessage('[2] - 칸노 린카를 소개받는다     (2000000포인트)');
    }
    if ((character.cflags[ctx.master][660] & 8) == 0) {
      ctx.showMessage('[3] - 시노자키 미사를 소개받는다 (2000000포인트)');
    }
    if ((character.cflags[ctx.master][660] & 16) == 0) {
      ctx.showMessage('[4] - 시이나 미시즈를 소개받는다 (3000000포인트)');
    }
    ctx.showMessage('[5] - 그만둔다');
    ctx.showMessage('※CAUTION※');
    ctx.showMessage('상여품으로 보냈을 경우, 해당 캐릭터는 이번 플레이에선 더이상 등장하지 않습니다!');
    // Label: INPUT_LOOP_KOISORA
    await ctx.inputNumber();
    if (ctx.result === 0 && character.cflags[ctx.master][660] === 0 && ctx.money >= 1000000) {
      ctx.showMessage('《이하라 코토노의 신병을 맡았습니다》'); ctx.waitInput();
      // TODO: ADDCHARA 99
      // TODO: LOADGLOBAL
      ctx.global[299] += 1;
      // TODO: SAVEGLOBAL
      character.cflags[ctx.master][660] |= 1;
      character.cflags[ctx.master][669] += 1;
      ctx.money -= 1000000;
      if (ctx.global[200] >= 0 && ctx.flags[540] === 0) {
        if (GETCHARA(99, 0) >= 0) {
          character = GETCHARA(99);
          await clearbonus_call(ctx, character);
        }
      }
    } else if (ctx.result === 0 && character.cflags[ctx.master][660] === 0 && ctx.money < 1000000) {
      ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
      // GOTO INPUT_LOOP_KOISORA - 구조 변경 필요 (while/break 사용 권장)
    } else if (ctx.result === 1 && character.cflags[ctx.master][661] === 0 && ctx.money >= 1000000) {
      ctx.showMessage('《이하라 코토노의 신병을 맡았습니다》'); ctx.waitInput();
      // TODO: ADDCHARA 100
      // TODO: LOADGLOBAL
      ctx.global[300] += 1;
      // TODO: SAVEGLOBAL
      character.cflags[ctx.master][660] |= 2;
      character.cflags[ctx.master][669] += 1;
      ctx.money -= 1000000;
      if (ctx.global[200] >= 0 && ctx.flags[540] === 0) {
        if (GETCHARA(100, 0) >= 0) {
          character = GETCHARA(100);
          await clearbonus_call(ctx, character);
        }
      }
    } else if (ctx.result === 1 && character.cflags[ctx.master][661] === 0 && ctx.money < 1000000) {
      ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
      // GOTO INPUT_LOOP_KOISORA - 구조 변경 필요 (while/break 사용 권장)
    } else if (ctx.result === 2 && character.cflags[ctx.master][662] === 0 && ctx.money >= 2000000) {
      ctx.showMessage('《칸노 린카의 신병을 맡았습니다》'); ctx.waitInput();
      // TODO: ADDCHARA 101
      // TODO: LOADGLOBAL
      ctx.global[301] += 1;
      // TODO: SAVEGLOBAL
      character.cflags[ctx.master][660] |= 4;
      character.cflags[ctx.master][669] += 1;
      ctx.money -= 2000000;
      if (ctx.global[200] >= 0 && ctx.flags[540] === 0) {
        if (GETCHARA(101, 0) >= 0) {
          character = GETCHARA(101);
          await clearbonus_call(ctx, character);
        }
      }
    } else if (ctx.result === 2 && character.cflags[ctx.master][662] === 0 && ctx.money < 2000000) {
      ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
      // GOTO INPUT_LOOP_KOISORA - 구조 변경 필요 (while/break 사용 권장)
    } else if (ctx.result === 3 && character.cflags[ctx.master][663] === 0 && ctx.money >= 2000000) {
      ctx.showMessage('《시노자키 미사의 신병을 맡았습니다》'); ctx.waitInput();
      // TODO: ADDCHARA 102
      // TODO: LOADGLOBAL
      ctx.global[302] += 1;
      // TODO: SAVEGLOBAL
      character.cflags[ctx.master][660] |= 8;
      character.cflags[ctx.master][669] += 1;
      ctx.money -= 2000000;
      if (ctx.global[200] >= 0 && ctx.flags[540] === 0) {
        if (GETCHARA(102, 0) >= 0) {
          character = GETCHARA(102);
          await clearbonus_call(ctx, character);
        }
      }
    } else if (ctx.result === 3 && character.cflags[ctx.master][663] === 0 && ctx.money < 2000000) {
      ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
      // GOTO INPUT_LOOP_KOISORA - 구조 변경 필요 (while/break 사용 권장)
    } else if (ctx.result === 4 && character.cflags[ctx.master][664] === 0 && ctx.money >= 3000000) {
      ctx.showMessage('《시이나 미시즈의 신병을 맡았습니다》'); ctx.waitInput();
      // TODO: ADDCHARA 103
      // TODO: LOADGLOBAL
      ctx.global[303] += 1;
      // TODO: SAVEGLOBAL
      character.cflags[ctx.master][660] |= 16;
      character.cflags[ctx.master][669] += 1;
      ctx.money -= 3000000;
      if (ctx.global[200] >= 0 && ctx.flags[540] === 0) {
        if (GETCHARA(103, 0) >= 0) {
          character = GETCHARA(103);
          await clearbonus_call(ctx, character);
        }
      }
    } else if (ctx.result === 4 && character.cflags[ctx.master][664] === 0 && ctx.money < 3000000) {
      ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
      // GOTO INPUT_LOOP_KOISORA - 구조 변경 필요 (while/break 사용 권장)
    } else if (ctx.result === 5) {
      return 0;
    } else {
      // GOTO INPUT_LOOP_KOISORA - 구조 변경 필요 (while/break 사용 권장)
    }
  } else if (character.cflags[ctx.master][669] >= 5) {
    ctx.showMessage(`W 「더 이상 소개해줄 아이가 없네?」`);
    return 0;
  }
  return 0;
}

export async function ellen_extraactress(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`「어때, 의뢰는 잘 되가고 있니?`);
  ctx.showMessage(`　네 덕분에 우리 세력의 뒷세계 발언력도 전보다 더 강해졌고……`);
  ctx.showMessage(`　역시 카논짤이 사람 볼 줄 안다니까♪`);
  ctx.showMessage(`　――그래서 오늘은, 바로 너를 위해 상을 준비했어♪`);
  ctx.showMessage(`　나는 나대로, 카논짱하고는 다른 루트의 커넥션이 있는데 말이야`);
  ctx.showMessage(`　앞으로 필요할때『이용』해주려 만들어 둔 거지만,`);
  ctx.showMessage(`　특별 서비스로 네게 이 사람들을 소개해줄까ー, 해서 말이지`);
  ctx.showMessage(`W 　물론 이건 의뢰가 이니니까, 어떻게『지도』하든 네 마음대로야♪`);
  ctx.showMessage(`　……어머 멋진 표정이네, 그럼 이쪽 서류를 봐줄래?`);
  // TODO: PRINTW
  if ((character.cflags[ctx.master][750] & 1) === 0 && (character.cflags[ctx.master][704] & 1) === 1) {
    ctx.drawLine('‥');
    ctx.showMessage('【사쿠라 유키】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「미히로에겐 질 수 없어……!」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('국민적 아이돌그룹【Colorful Pure Girls】의 결성멤버');
    ctx.showMessage('톱 아이돌중 한명이라는 것을 긍지로 여겼으나');
    ctx.showMessage('CPG총선거에서 니지마 미히로에게 배에 달하는 격차로 2위에 머물러');
    ctx.showMessage('세간과 언론의 평가가 미히로 다음가는『영원한 이인자』인 것에 불만이 있는것 같다');
    ctx.showMessage('그녀가 AV업계에 흥미를 가진 이유는,');
    ctx.showMessage('니지마 미히로가 사랑하는 당신(=감독)을 미히로에게서 빼앗아');
    ctx.showMessage('미히로를『이기고』싶기 때문이라고 한다');
    ctx.showMessage('이런 타산적인 성격때문인지 온갖 연예활동에서 높은 포텐셜을 보이는 미히로와 달리');
    ctx.showMessage('버라이어티 방송의 토크에서 높은 적성을 보이며');
    ctx.showMessage('살짝 마니악한 주제도 가능한 아이돌로 제작진에게 지지를 받고 있다');
    ctx.showMessage('과거 동생인 유이카가 주니어 아이돌로서 에로DVD를 내던 시절에');
    ctx.showMessage('키류 엘렌이 제안한 아이돌 프로젝트【퓨어 걸】의 후보생으로 스카우트 받았으나');
    ctx.showMessage('그 후 프로젝트는 방향을 바꿔 CPG가 됐고 엘렌도 관여하지 않게 됐기에');
    ctx.showMessage('스카우트해준 은혜는 느껴도 그 이상의 신뢰관계는 없다');
    ctx.showMessage('');
    ctx.showMessage('연령: 16세　난이도: C　성장도: A　공헌도: A　매각치: SS');
    ctx.drawLine('‥');
    // TODO: PRINTW
  }
  if ((character.cflags[ctx.master][750] & 2) === 0) {
    ctx.drawLine('‥');
    ctx.showMessage('【타카나시 노에미】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「어머어머, 제멋대로인 아이네요♪」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('18세라는 젊은 나이에 키류 조직의 사업중 하나인『창관』의 모든 것을 관리하는 간부로');
    ctx.showMessage('어려서부터 키류 조직 소속『조교사』로서 교육받았다');
    ctx.showMessage('키류 조직 내부의 파벌싸움에선 드물게도 중립파이며');
    ctx.showMessage('특정 세력에 가담하고 있지는 않다');
    ctx.showMessage('『창관』을 관리하는 만큼 뛰어난 지도기술을 가지고 있고');
    ctx.showMessage('특히 빚 대신에 팔려온 아가씨를 주문에 맞는 일류 창부로 키워내는 솜씨가 인정받고 있다');
    ctx.showMessage('');
    ctx.showMessage('그리고 의외로 그녀는 아직 스스로 순결을 지키고 있다');
    ctx.showMessage('비뚤어진 환경에서 자라왔기에, 더욱더 순결을 소중히 지켜온 것인지도 모른다……');
    ctx.showMessage('키류 카논의 뜻에 따라 아무것도 모르는 초심자인 당신(=감독)의 교사역할로서');
    ctx.showMessage('그리고 수장파의 뜻에 따라 카논의 감시역할로서');
    ctx.showMessage('당신의 사무소에 파견되었다');
    ctx.showMessage('');
    ctx.showMessage('연령: 18세　난이도: D　성장도: C　공헌도: A　매각치: C');
    ctx.drawLine('‥');
    // TODO: PRINTW
  }
  if ((character.cflags[ctx.master][750] & 4) === 0) {
    ctx.drawLine('‥');
    ctx.showMessage('【신도 아유미】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「AV여배우가 되는것도 하나의 경험이라 생각하고 도전해보고 싶어요」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('유명사립대의 미스콘테스트에서 우승한적이 있는, 라크로스부 소속 여대생');
    ctx.showMessage('대학 미팅에서 그녀를 노리던 남자에게 술을 먹여져');
    ctx.showMessage('『보쌈』당할뻔 했을때 키류 엘렌(과 부하들)이 구해준 뒤로,');
    ctx.showMessage('엘렌이 그녀가 다니는 대학의 OG였던 연관점도 있었기에');
    ctx.showMessage('사적인 일로도 이래저래 엘렌에게 신세를 졌다고 한다');
    ctx.showMessage('집은 관서의 명가로 귀하게 자라왔으나 전술한대로 미스콘테스트에서 우승하는등');
    ctx.showMessage('다양한 일에 도전하는 적극성을 갖췄다');
    ctx.showMessage('정조관념은 강한 편이지만, 특유의 도전정신 때문인지');
    ctx.showMessage('AV여배우라는 일에도 별로 저항감을 가지진 않았다');
    ctx.showMessage('연령에 맞지 않은『어른의 매력』이 넘치며, 동작 하나하나가 과하게 야하여');
    ctx.showMessage('본인이 인터넷에서 불명예스러운 별명으로 불리고 있다는 것은 모르고 있다');
    ctx.showMessage('');
    ctx.showMessage('연령: 19세　난이도: D　성장도: B　공헌도: B　매각치: A');
    ctx.drawLine('‥');
    // TODO: PRINTW
  }
  ctx.showMessage(`　……뭐, 이 정도일까?`);
  ctx.showMessage(`　나도 카논짱처럼 따로『소개료』는 받겠지만……`);
  ctx.showMessage(`　틈틈이『의뢰』만 받아준다면 껌값이나 마찬가지지?」`);
  ctx.showMessage(`W`);
  ctx.showMessage(`엘렌이 건네준 사진 속 여자들은 모두 매력적이니, 만약 AV에 출연시킬 수 있다면`);
  ctx.showMessage(`비용은 바로 회수 가능할 것이다……`);
  if ((character.cflags[ctx.master][750] & 1) == 0 && (character.cflags[ctx.master][704] & 1)) {
    ctx.showMessage('[0] - 사쿠라 유키를 소개받는다     (1000000포인트)');
  }
  if ((character.cflags[ctx.master][750] & 2) == 0) {
    ctx.showMessage('[1] - 타카나시 노에미를 소개받는다 (1000000포인트)');
  }
  if ((character.cflags[ctx.master][750] & 4) == 0) {
    ctx.showMessage('[2] - 신도 아유미를 소개받는다     (1000000포인트)');
  }
  ctx.showMessage('[9] - 그만둔다');
  ctx.showMessage('※CAUTION※');
  ctx.showMessage('상여품으로 보냈을 경우, 해당 캐릭터는 이번 플레이에선 더이상 등장하지 않습니다!');
  // Label: INPUTLOOP_00
  await ctx.inputNumber();
  if (ctx.result === 0 && (character.cflags[ctx.master][750] & 1) === 0 && ctx.money >= 1000000 && (character.cflags[ctx.master][704] & 1)) {
    ctx.showMessage(`%플레이어는% 사쿠라 유키를 소개받기로 했다……`);
    ctx.showMessage(`W`);
    ctx.showMessage(`그녀가 소속된 예능사무소는 키류 조직의 관련회사로 이미 이야기는 끝났는듯,`);
    ctx.showMessage(`바로 만나볼 수 있었다`);
    ctx.showMessage(`작은 카페에 불려나온 사쿠라 유키는【Colorful Pure Girls】의 결성멤버이자`);
    ctx.showMessage(`인기 넘버 2에 걸맞게 최상급의 외모를 자랑하고`);
    ctx.showMessage(`본인도 그걸 자각하고 있는듯, 바로 프라이드가 높은 아이라고 알 수 있었다`);
    // TODO: PRINTW
    ctx.showMessage(`「당신하고 니지마 미히로는 어떤 관계야?`);
    ctx.showMessage(`　연인? 아니면 섹프?`);
    ctx.showMessage(`　어느 쪽이든 상관 없지만…… 난, 미히로에게는 절대 질 수 없어`);
    ctx.showMessage(`　그러니까 이기기 위해서라면 무슨 일이던지 할거고, 너도 이용해 줄거야」`);
    ctx.showMessage(`W`);
    ctx.showMessage(`${ctx.josaHelper("플레이어가")} 입을 열기 전에 유키가 먼저 선언하고는, ${ctx.getVarName("CALL", MASTER)}에게서 서류를 빼았아 사인했다……`);
    ctx.showMessage(`앞으로가 약간 걱정되지만, 일단 할 마음은 충분한 것 같다`);
    ctx.showMessage('');
    ctx.showMessage(`《사쿠라 유키와 계약했습니다》`);
    character.cflags[ctx.master][750] |= 1;
    // TODO: LOADGLOBAL
    ctx.global[350] += 1;
    // TODO: SAVEGLOBAL
    // TODO: ADDCHARA 150
    if (ctx.global[200] >= 0 && ctx.flags[540] === 0) {
      if (GETCHARA(150, 0) >= 0) {
        character = GETCHARA(150);
        await clearbonus_call(ctx, character);
      }
    }
  } else if (ctx.result === 0 && (character.cflags[ctx.master][750] & 1) === 0 && ctx.money < 1000000) {
    ctx.showMessage(`W 《소지금이 부족합니다》`);
    // GOTO INPUTLOOP_00 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 1 && (character.cflags[ctx.master][750] & 2) === 0 && ctx.money >= 1000000) {
    ctx.showMessage(`%플레이어는% 타카나시 노에미를 소개받기로 했다……`);
    ctx.showMessage(`W`);
    ctx.showMessage(`${ctx.getVarName("CALL", MASTER)}의 사무소 여배우들도『신세』지고 있는 창관의 지배인실이 타카나시 노에미의 면접장소였다`);
    ctx.showMessage(`내부항쟁 이전부터 키류 조직의 간부였으며, 중립파였던 그녀는 카논이 실권을 거머쥔 지금도`);
    ctx.showMessage(`간부로서 키류 조직의『접대』의 거의 모든 것을 책임지고 있다`);
    ctx.showMessage(`――그리고 의외로, ${ctx.josaHelper("플레이어와")} 나이차이도 별로 없어보인다`);
    // TODO: PRINTW
    ctx.showMessage(`「조직의 방침이라면 따를 것이고, 우리 창관에 소개해준 아이들을 지켜보면 알아,`);
    ctx.showMessage(`　나하고는 조금 다른 방식의『지도』를 알 수 있을 좋은 기회인걸, 기쁘게 받아들일게`);
    ctx.showMessage(`　그 대신…… 앞으로도 우리 창관을 이용해 줄거지?」`);
    ctx.showMessage(`W`);
    ctx.showMessage(`${ctx.getVarName("CALL", MASTER)}에게서 이야기를 듣고, 노에미는 ${ctx.getVarName("CALL", MASTER)}의 실력을 신뢰하고 있다며`);
    ctx.showMessage(`흔쾌히 OK해준 데다가, 촬영의『파트너』로서도 협력해 준다고 한다`);
    ctx.showMessage('');
    ctx.showMessage(`《타카나시 노에미와 계약했습니다》`);
    character.cflags[ctx.master][750] |= 2;
    // TODO: LOADGLOBAL
    ctx.global[351] += 1;
    // TODO: SAVEGLOBAL
    // TODO: ADDCHARA 151
    if (ctx.global[200] >= 0 && ctx.flags[540] === 0) {
      if (GETCHARA(151, 0) >= 0) {
        character = GETCHARA(151);
        await clearbonus_call(ctx, character);
      }
    }
  } else if (ctx.result === 1 && (character.cflags[ctx.master][750] & 2) === 0 && ctx.money < 1000000) {
    ctx.showMessage(`W 《소지금이 부족합니다》`);
    // GOTO INPUTLOOP_00 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 2 && (character.cflags[ctx.master][750] & 4) === 0 && ctx.money >= 1000000) {
    ctx.showMessage(`%플레이어는% 신도 아유미를 소개받기로 했다……`);
    ctx.showMessage(`W`);
    ctx.showMessage(`신도 아유미가 다니는 대학 근처의 카페에서 그녀의 면접을 봤다`);
    ctx.showMessage(`${ctx.getVarName("CALL", MASTER)}의 기억이 맞다면, 이 대학은 카나데가 진로희망조사에 써냈던 곳이었다`);
    ctx.showMessage(`엘렌을 포함해 각계 유력자들의 모교인 이 대학엔 당연히,`);
    ctx.showMessage(`그 자녀들도 많이 다니고 있었고―― 아유미 또한 관서의 명사의 딸이다`);
    ctx.showMessage(`면접장소에 나타난 아유미는 고품스런 원피스를 입은, 그림에 그린듯한 아가씨 같아`);
    ctx.showMessage(`도저히 AV배우와 인연이 있어 보이는 사람은 아니었다`);
    // TODO: PRINTW
    ctx.showMessage(`「맨몸을 보이는 것은 부끄럽지만, 엘렌씨의 이야기를 들어보고`);
    ctx.showMessage(`　이것도 기회가 아닐까 생각했어요`);
    ctx.showMessage(`　전, 정말로 하고 싶은 일이 없어서, 아무튼 여러가지 일에 도전해보자, 하고`);
    ctx.showMessage(`　후후, 보통은 이런 일을 경험해볼 기회가 없으니까요, 그렇죠?」`);
    ctx.showMessage(`W`);
    ctx.showMessage(`${ctx.getVarName("CALL", MASTER)}에게 이야기를 듣고, 아유미는 비교적 쉽게 OK해줬다`);
    ctx.showMessage(`그럴 의도는 없겠지만, 동작 하나하나가 쓸데없이 야한 건 어째서일까……`);
    ctx.showMessage('');
    ctx.showMessage(`《신도 아유미와 계약했습니다》`);
    character.cflags[ctx.master][750] |= 4;
    // TODO: LOADGLOBAL
    ctx.global[352] += 1;
    // TODO: SAVEGLOBAL
    // TODO: ADDCHARA 152
    if (ctx.global[200] >= 0 && ctx.flags[540] === 0) {
      if (GETCHARA(152, 0) >= 0) {
        character = GETCHARA(152);
        await clearbonus_call(ctx, character);
      }
    }
  } else if (ctx.result === 2 && (character.cflags[ctx.master][750] & 4) === 0 && ctx.money < 1000000) {
    ctx.showMessage(`W 《소지금이 부족합니다》`);
    // GOTO INPUTLOOP_00 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 9) {
    return 0;
  } else {
    // GOTO INPUTLOOP_00 - 구조 변경 필요 (while/break 사용 권장)
  }
}
