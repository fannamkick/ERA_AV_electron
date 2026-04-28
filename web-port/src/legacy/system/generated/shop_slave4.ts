/**
 * SHOP_SLAVE4.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function chara_buy_event(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character.no === 1) {
    if (ctx.master.no === 0) {
      if (DAY[0] === 0 && TIME[0] === 0) {
        ctx.showMessage(`「오빠 혼자 괴롭게 만들기 싫어……`);
        ctx.showMessage(`　그러니까 나도 부끄럽지만…… AV배우가 돼서 오빠를 도울거야!」`);
        ctx.showMessage(`……앞으로 ${ctx.josaHelper("플레이어는")} AV감독이 되어서, 부모가 남긴 빚을 갚아나가야만 한다`);
        ctx.showMessage(`……그 빚이 연대 보증인이든 면식 있는 사이이든 상관 없이, 수금할 것은 확실히 징수한다`);
        ctx.showMessage(`……갚아낼 수 없을 경우 그에 상응하는 대접을 받게 할지도 모른다`);
        ctx.showMessage(`L`);
        ctx.showMessage(`카논이 그 말을 남기고 떠나고서 한동안 묵묵부답으로 있던 카나데가, 얼굴을 새빨갛게 한 채 말했다`);
        ctx.showMessage(`선택의 여지가 없다고 알고 있었지만, 혼자 견뎌낸다면 카나데는 무사할거라고 생각하던 ${ctx.josaHelper("플레이어는")}`);
        ctx.showMessage(`카나데의 제안을 거절할 수밖에 없었다`);
        ctx.showMessage(`하지만 그다지 자기주장이 강하지 않은 카나데로서는 드물게, ${ctx.josaHelper("플레이어가")} 얼마나 강하게 타일러도 그 의견을 굽히지 않았다`);
        ctx.showMessage(`「모르는 사람하고 엣찌할지도 모르는 건 참을 수 없고, 알몸이 되거나 하는 것도 사실은 싫지만……`);
        ctx.showMessage(`　그치만, 오빠가 그래서 더 괴로운 일을 겪을지 모른다면…… 나도 그 정도는 참을 수 있어!`);
        ctx.showMessage(`　그러니까…… 그러니까 오빠, 나를 고용해줘!」`);
        ctx.showMessage(`카나데는 생각을 바꾸지 않을거라 통감한 ${ctx.josaHelper("플레이어는")}도 한숨을 쉬며`);
        ctx.showMessage(`카논에게 받은 계약서를 카나데에게 전달했다……`);
      } else {
        ctx.showMessage(`「이대로 모르는 척 하면서 오빠에게 전부 맡기기 싫어……`);
        ctx.showMessage(`　그러니까 나도 부끄럽지만…… AV배우가 돼서 오빠를 도울거야!」`);
        ctx.showMessage(`L`);
        ctx.showMessage(`새빨간 얼굴로 방에 찾아온 카나데가 말했다`);
        ctx.showMessage(`선택의 여지가 없다고 알고 있었지만, 혼자 견뎌낸다면 카나데는 무사할거라고 생각하던 ${ctx.josaHelper("플레이어는")}`);
        ctx.showMessage(`카나데의 제안을 거절할 수밖에 없었다`);
        ctx.showMessage(`하지만 그다지 자기주장이 강하지 않은 카나데로서는 드물게, ${ctx.josaHelper("플레이어가")} 얼마나 강하게 타일러도 그 의견을 굽히지 않았다`);
        ctx.showMessage(`「모르는 사람하고 엣찌할지도 모르는 건 참을 수 없고, 알몸이 되거나 하는 것도 사실은 싫지만……`);
        ctx.showMessage(`　그치만, 오빠가 그래서 더 괴로운 일을 겪을지 모른다면…… 나도 그 정도는 참을 수 있어!`);
        ctx.showMessage(`　그러니까…… 그러니까 오빠, 나를 고용해줘!」`);
        ctx.showMessage(`카나데는 생각을 바꾸지 않을거라 통감한 ${ctx.josaHelper("플레이어는")}도 한숨을 쉬며`);
        ctx.showMessage(`카논에게 받았던 계약서를 카나데에게 전달했다……`);
      }
    }
    // TODO: PRINTW
  } else if (character.no === 3) {
    ctx.showMessage('「뭐야, 아까 거는 계약금이고 출연료가 아니었구나」');
    ctx.showMessage(`아무래도 지레짐작해버리는 성격답게, 계약서에 사인한 사에에게 ${ctx.josaHelper("플레이어가")}`);
    ctx.showMessage(`・계약금과 출연료는 별개`);
    ctx.showMessage(`・출연료가 아닌, 한 작품마다 다달이 매상을 지불하겠다`);
    ctx.showMessage(`라고 전하자, 안도한듯한 표정을 지었다`);
    ctx.showMessage(`「즉 당신이 노력한다면 동생들한테 좋은 걸 먹여줄 순 있단 거야`);
    ctx.showMessage(`　큰일이지? 자라나는 동생들한테 비참한 생각이 들지 않을 정도로 아르바이트하는 것도 말야」`);
    ctx.showMessage(`사에의 가정환경을 파악하고 있다는 듯, 영업용 미소를 지으며 동석한 카논이 입을 열자 사에는 안색이 새파래졌다`);
    ctx.showMessage(`「자, 잠깐! 유스케도 타카시도 나오키도 관계 없잖아!?`);
    ctx.showMessage(`　당신이 야쿠자인지 뭔진 모르겠지만 그 애들한테 손을 대면 용서하지 않을 거니까아!」`);
    ctx.showMessage(`「에구, 무서워 무서워라…… 우리 쪽에 빚 지고 있는 것도 아니고『기본적으로』햇병아리한테는 손 대지 않을거야`);
    ctx.showMessage(`　……뭐, 어떤 이유가 있다면 다르겠지만?」`);
    ctx.showMessage(`　그렇게 말하고서, 카논은 여러 가지 감정이 섞인 미소를 지은 채 ${ctx.getVarName("CALL", MASTER)}의 옆모습을 바라봤다……`);
    // TODO: PRINTW
  } else if (character.no === 4) {
  } else if (character.no === 5) {
  } else if (character.no === 6) {
  } else if (character.no === 7) {
  } else if (character.no === 8) {
  } else if (character.no === 10) {
  } else if (character.no === 11) {
  } else if (character.no === 12) {
  } else if (character.no === 13) {
  } else if (character.no === 14) {
  } else if (character.no === 20) {
  } else if (character.no === 21) {
  } else if (character.no === 22) {
  } else if (character.no === 23) {
  } else if (character.no === 24) {
  } else if (character.no === 25) {
  } else if (character.no === 26) {
  } else if (character.no === 27) {
  } else if (character.no === 28) {
  } else if (character.no === 29) {
    ctx.showMessage('작금의 불황에 따른 기부의 감소에 영향받아, 유지조차 곤란해진 교회와 복지시설');
    ctx.showMessage('빚과 그 변제의 악순환을 탈출하기 위해, 아오이 하루카는 가르침으로부터 등을 돌린 채 사인을 했다');
    ctx.showMessage('「……제대로, 금액의 7할은 직접 빚 변제로 돌려주는 거죠?」');
    ctx.showMessage('그녀 나름의 각오는 하고 있겠지만, 그 말에는 불안의 색이 엿보인다');
    ctx.showMessage(`${ctx.josaHelper("플레이어가")} 긍정하자, 하루카는 자신을 억누르듯 수도복 위에서도 크기를 짐작할 수 있을 정도의 가슴에 손을 올렸다`);
    ctx.showMessage('「부끄럽습니다만, 저는 지금까지 남성과 교제했던 적이 없습니다」');
    ctx.showMessage('「어찌해야 할지 잘 모르겠습니다만, 지시에 따르겠사오니…… 부디 지도를 부탁드립니다」');
    // TODO: PRINTW
  } else if (character.no === 40 && ctx.master.no === 0) {
    ctx.showMessage(`「그런데 부부금슬의 비결을 알고 있니?`);
    ctx.showMessage(`　애정과 배려라…… 그것도 물론 중요하지만 좀 더 현실적인 게 있어`);
    ctx.showMessage(`　그게 뭐냐고? 물론『밤 생활』란 녀석이지`);
    ctx.showMessage(`　이런저런 책무나 가면을 벗어던지고,`);
    ctx.showMessage(`　서로 한 사람의 남성과 여성으로 돌아간 모습을 새로 보여주는 귀중한 기회이니까 말야`);
    ctx.showMessage(`　이혼하는 부부가 늘어난다고 하는것도`);
    ctx.showMessage(`　난 섹스리스 기간이 늘어나는게 원인이라고 생각해`);
    ctx.showMessage(`　우리 엄마도 가족들밖에 없으면 언제까지고 신혼부부처럼`);
    ctx.showMessage(`　아버지랑 닭살 분위기나 풍기고……라니 얘기가 어긋났군`);
    ctx.showMessage(`　충실한 밤 생활을 위해선 남자에게 맡기지만 하면 안되고`);
    ctx.showMessage(`　여자쪽도 액션을 취하는 게 중요한건 알지?`);
    ctx.showMessage(`　그리고 미통녀라니 상대가 동정이어도 귀찮아할 뿐이니까`);
    ctx.showMessage(`　적당히 테크닉도 가진 녀석 상대로 처녀는 버려두는 게 낫다고 생각하는데?`);
    ctx.showMessage(`　너희들의 약속은 말야…… 나쁘게 말하면 아직도 꿈꾸는 애들의 발상이야`);
    ctx.showMessage(`　기술도 뭣도 없는 동정과 미통녀의 첫날밤이라니 최악의 결과로 남을테고`);
    ctx.showMessage(`　그럼 앞서 말했듯이 섹스리스로 사이가 멀어지는 경우가 많으니까`);
    ctx.showMessage(`　마침 이 녀석이 그런건 잘 아니까 하는 김에 이것저것 가르쳐달라고 해,`);
    ctx.showMessage(`　남자를 기쁘게 만드는 방법 같은거 말야`);
    ctx.showMessage(`　물론 남자친구한테는 절대 들키지 않도록 신분은 숨길거고`);
    ctx.showMessage(`　이 녀석의 입이 얼마나 무거운지는 믿어도 좋아`);
    ctx.showMessage(`　그리고 동정은 진짜 처녀인지 재생 처녀인지 분간 같은건 못하니까`);
    ctx.showMessage(`　네가 결혼하게 되면 솜씨 좋은 의사도 소개시켜 줄게`);
    ctx.showMessage(`　……실제로 이 학교에도 이 녀석에게『지도』받은 애들이 몇명 있는데,`);
    ctx.showMessage(`　그런 소문은 들은 적 없잖아?」`);
    ctx.showMessage(`W`);
    ctx.showMessage(`동석하고 있던 카논이 반은 다르지만 같은 학교에 다니는 당신을 고용주로서 소개해줬다`);
    ctx.showMessage(`${ctx.josaHelper("플레이어가")} 보기에는 쇼우노 소라의 표정에 놀라운 기색은 느껴지지 않았지만,`);
    ctx.showMessage(`아무래도 본인이 말하고 있는 것 보다는 훨씬 놀랐을 것이다`);
    ctx.showMessage(`그리고 카논이 다시 한 번『업무 내용』과, 특유의 입담으로 상대의 약점을 찌르듯이`);
    ctx.showMessage(`이점을 나열하고 있지만…… 역시『AV배우가 된다』는 상황에도 표정에 변화가 없다`);
    ctx.showMessage(`${ctx.josaHelper("플레이어는")} 이 일을 시작하고부터 완전히 몸에 배어버린,`);
    ctx.showMessage(`소라의 얼굴이 여자의 쾌락으로 녹아내리는 모습을 상상하며, 소라가 과연 받아들여줄까…… 걱정하며 침을 삼켰다`);
    ctx.showMessage(`잠시 후, 돌아온 대답은……`);
    // TODO: PRINTW
    ctx.showMessage(`「알았어, 토노가 그걸로 기뻐해 준다면 AV 여배우가 돼도 좋아`);
    ctx.showMessage(`　나, 토노랑 결혼할 때까지 섹스하지 않는다고 약속하고 있는데다, 토노를 속이게 되겠지만,`);
    ctx.showMessage(`　……그래도 토노와의 미래를 위해서라면 부탁이야,`);
    ctx.showMessage(`　내게 토노를 기쁘게 해주는 방법을  가르쳐줬으면 해」`);
    // TODO: PRINTW
    ctx.showMessage(`천천히 소라의 입에서 나오는 말을 듣던 카논이`);
    ctx.showMessage(`음흉한 미소를 짓고 있다고 생각한 것은 기분 탓일까`);
    ctx.showMessage(`아무튼 본인의 동의를 얻었으니 ${ctx.josaHelper("플레이어는")} 계약서를 건내주고 내일까지 써오라고 했다……`);
    ctx.showMessage(`W`);
  }
  return 0;
}
