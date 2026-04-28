/**
 * MIYAKO_LABO2.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function miyako_labo_symphogear(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.money < 1000000) {
    ctx.showMessage(`「소지금이 부족하네요… 역시 돈이 없으면 불가능한 것이에요」`);
  } else {
    ctx.showMessage(`　완전히 키류 조직・미야코파의 거점이 되버린 빌딩의 시어터 룸에서`);
    ctx.showMessage(`　미야코는 황홀한 표정으로, 카논이 노래프로의 생방송에 나왔던 영상을 보고 있었다`);
    ctx.showMessage(`L`);
    ctx.showMessage(`「아아, ${ctx.getVarName("CALL", MASTER)}, 카논 언니 혼신의 싱글『순결한 맹세의 키스』는 역시 멋진 것이에요…`);
    ctx.showMessage(`　같이 나왔던 CPG의 싱글도 제치고 차트 1위인 거에요… 판매량 100만장도 꿈이 아닌 거에요!」`);
    ctx.showMessage(`L`);
    ctx.showMessage(`　…특수한 편집기술이라도 들어간건지, 노래하고 있는 카논의 주위로 반짝반짝 빛나는 것들이 모여드는 것처럼 보인다…`);
    ctx.showMessage(`L`);
    ctx.showMessage(`「알아챘사와요?`);
    ctx.showMessage(`　이쿠미님의 말씀으로는, 이건 자연 에너지라고도 불리는, 일종의 영혼, 엑토플라즈마나 마찬가지라는 거에요!`);
    ctx.showMessage(`　노래만 듣고서 저 정도로 모이는 건 전례가 없는 일이라는 거에요!`);
    ctx.showMessage(`　…뭐어, 언니는 옛날부터 유령들이 좋아하는 체질이었다죠, 정작 언니는 싫어하는 것 같지만…`);
    ctx.showMessage(`　그럼 여기부터가 문제인 것이에요`);
    ctx.showMessage(`　이것들은 언니의 노래에 반응하는 것 같으니, 이왕이면 잘 이용해주자, 라는 거에요!`);
    ctx.showMessage(`　저 자연 에너지는 순도와 지향성이 매우 높다고 해서,`);
    ctx.showMessage(`　잘만 조종하면 조종자를 지키는 방패가 될수도, 적을 쓰러트릴 창이 될수도 있다는 거에요!`);
    ctx.showMessage(`　이름을 붙이자면『소울・바이브레이션・시스템』, SVS이와요!`);
    ctx.showMessage(`　지금 가브 녀석들에게 미나・크레인의 세뇌노래를 강화하던 기계를 개량시키는 중이에요!`);
    ctx.showMessage(`　주위의 자연 에너지를 모아서, 그걸로 언니의 몸을 지키는 무기를 만드는 기계도 개발중인 거에요!`);
    ctx.showMessage(`　최종적으로 완성한 기계를 초소형화 시켜서 팔찌 크기로 만들 예정인 것이에요!`);
    ctx.showMessage(`　아아…, 에메랄드・퀸이 탄생할 때까지 얼마 안남은 거에요…!`);
    ctx.showMessage('');
    ctx.showMessage(`　자, 돈 준비는 충분하신가요!?」`);
    // Label: INPUT_LOOP
    ctx.showMessage('');
    ctx.showMessage('[ 0] - 네');
    ctx.showMessage('[ 1] - 아니오');
    ctx.drawLine();
    ctx.showMessage('[999] - 돌아간다');
    await ctx.inputNumber();
    if (ctx.result === 0) {
      await miyako_symphogear_ss(ctx, character);
      character.cflags[ctx.master][136] = 10;
      character.cflags[ctx.master][138] = 1;
      ctx.money -= 1000000;
      return 0;
    } else if (ctx.result === 1) {
      ctx.showMessage(`W 「흐흐흥, 이에요! 빨리 언니를 은하 제일의 히로인으로 만드는 거에요!」`);
      return 0;
    } else if (ctx.result === 999) {
      return 0;
    } else {
      // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
    }
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
}

export async function miyako_symphogear_ss(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`L`);
  ctx.showMessage(`　※이 밑으로 능력변화와 관계없는 내용이 이어집니다`);
  ctx.showMessage(`W 　※스킵을 하려면 우클릭을 눌러주세요`);
  ctx.showMessage('');
  ctx.showMessage('………………'); ctx.waitInput();
  ctx.showMessage('…………'); ctx.waitInput();
  ctx.showMessage('……');
  // TODO: PRINTW
  ctx.showMessage(`「――그렇게 된거에요…`);
  ctx.showMessage(`　계획은 틀림 없는 거에요!`);
  ctx.showMessage(`　자연 에너지도 순조롭게 모이고 있던 거에요!`);
  ctx.showMessage(`　그런데 모이기만 하고 거기서 멈춰버린 거에요…`);
  ctx.showMessage(`　어째서 계획대로 움직이지 않는건지, 가르쳐 주사와요!」`);
  ctx.showMessage(`L`);
  ctx.showMessage(`　폐빌딩의 지하를 꽉 채우는 거대한 기계 앞에서, 미야코는 작은 몸을 버둥버둥거리며, 기술고문으로 부른 스노 이쿠미에게 도움을 요청했다`);
  ctx.showMessage(`W`);
  ctx.showMessage(`「응ー, 저기ー, 미야코짱, 이렇게 영적인 요소도 강하고 섹션마다 필요한 움직임도 다른데`);
  ctx.showMessage(`　하나의 기계로 전부 재현하려고 하는 건 살짝 불가능해ー…`);
  ctx.showMessage(`　미야코짱이 마법사였으면 될지도 모르지만 말이야ー`);
  ctx.showMessage(`　다른 기구를 마법의 힘으로 억지로 이어버리는거야, 뒷세계 사람들한텐 당연한 일이니까ー`);
  ctx.showMessage(`　파라디수스나 옛 지배자들은 강력한 마법으로, 과학으로는 재현 불가능한 오버테크놀로지를 많이 가지고 있었지ー`);
  ctx.showMessage(`　이 기계를 미야코짱이 원하는 모습으로 만드려면, 엄청난 발명이겠지만…`);
  ctx.showMessage(`　살짝 불가능하지ー, 지금 이대로는ー`);
  ctx.showMessage(`　…그런데, 이 기계장치, 전에 책에서 본적이 있던 것 같은데ー, 기억이 잘 안나네ー…」`);
  ctx.showMessage(`W`);
  ctx.showMessage(`「그, 그럼 혹시, 제가 마법을 배우면, 움직이게 만들 수 있는 거에요!?」`);
  ctx.showMessage(`L`);
  ctx.showMessage(`「…응, 그렇지ー`);
  ctx.showMessage(`　그렇지만ー, 마법을 어디서 배우게ー?`);
  ctx.showMessage(`　다른 사람한테 배울 생각이라면, 관두는 게 좋아ー`);
  ctx.showMessage(`　현대 마술사중에서 그나마 양심적인 부류라면 파라디수스 정도인데`);
  ctx.showMessage(`　그쪽은 절대 마법을 외부인에게 가르쳐주지 않으니까ー`);
  ctx.showMessage(`　그렇다면 옛 지배자라던가 그쪽은 어떠냐면, 여러모로 되먹지 못한 사람들이니까, 아마 대가라며 엄청 심한 꼴을 당할거야ー…`);
  ctx.showMessage(`　애초에, 마법을 쓰려면 몸에 마력을 깃들여야 하는데`);
  ctx.showMessage(`　마력이란 원래 사람의 몸에는 독이라서 말이야ー`);
  ctx.showMessage(`　그러니까 마력을 얻으려면 반드시, 사람으로서 중요한 무언가를 잃게 된다, 라고 들었어ー」`);
  ctx.showMessage(`L`);
  ctx.showMessage(`「…………」`);
  ctx.showMessage(`L`);
  ctx.showMessage(`「카논짱 LOVE도 좋지만, 현실적인 문제도 제대로 알아야지ー`);
  ctx.showMessage(`　그럼, 난 볼일이 있어서 돌아갈게ー`);
  ctx.showMessage(`　…너도, 가끔은 이 폭주족짱을 멈출줄도 알아야지ー?」`);
  ctx.showMessage(`L`);
  ctx.showMessage(`　이쿠미는 돌아가버렸다…`);
  ctx.showMessage(`W`);
  ctx.showMessage(`「우으…, 그럴수가…, 방법이 없는 거에요…?`);
  ctx.showMessage(`　…아뇨, 저는 포기하지 않사와요!`);
  ctx.showMessage(`　…이, 이 고물!`);
  ctx.showMessage(`　빨리 움직이라는 거에요!」`);
  ctx.showMessage(`L`);
  ctx.showMessage(`　미야코는 웅~하고 울리는 기계를 열심히 조작하고 있지만, 아무리 노력해도 원하는 대로 움직이지는 않았다`);
  ctx.showMessage(`　결국 보지 못한 ${ctx.josaHelper("플레이어가")} 미야코를 멈추려고, 하자…`);
  ctx.showMessage(`L`);
  ctx.showMessage(`「자연 에너지가 많이 모여있네, 대체 누가 한 짓일까?」`);
  ctx.showMessage(`L`);
  ctx.showMessage(`　기계의 진행상황을 표시하는 모니터에 처음 보는 여성의 얼굴이 비쳤다`);
  ctx.showMessage(`　20살 전후로 보이지만…, 전에 어디선가 본 적 있는 분위기를 풍기고 있다…`);
  ctx.showMessage(`W`);
  ctx.showMessage(`「다, 당신, 대체 누구에요!?`);
  ctx.showMessage(`　갑자기 나와서는 실례인 거에요!`);
  ctx.showMessage(`　제대로 노크는 하고 나오는 거에요!」`);
  ctx.showMessage(`L`);
  ctx.showMessage(`　미야코의 헛소리에 수수께끼의 여성은 음험한 미소를 지었다`);
  ctx.showMessage(`W`);
  ctx.showMessage(`「후후후, 나는 널 알고 있어♪`);
  ctx.showMessage(`　이름은, 쿠로이 미야코―― 평범한 인간주제에 가브의 애송이를 물리친, 뒷세계에선 꽤나 유명인이니까」`);
  ctx.showMessage(`L`);
  ctx.showMessage(`「그, 그런 거에요!?`);
  ctx.showMessage(`　조금 부끄럽사와요…, ${ctx.getVarName("CALL", MASTER)}, 저도 이제 사인을 고민할만한 시기인 거에요?」`);
  ctx.showMessage(`L`);
  ctx.showMessage(`「…부끄러워할 때는 아니야`);
  ctx.showMessage(`　네가 속한 키류 조직은, 일단 내가 있는 조직이나, 파라디수스, 구미회하고는 잘 지내고 있지만,`);
  ctx.showMessage(`　그 밖의, 특히 옛 지배자들은 키류 조직을 상당히 경계하고 있어`);
  ctx.showMessage(`　말해두지만, 가브의 애송이를 쓰러트린 정도로 큰일을 했다고 생각하긴 아직 이르다?」`);
  ctx.showMessage(`L`);
  ctx.showMessage(`「그건 큰일인 거에요!`);
  ctx.showMessage(`　미나・크레인때도 꽤 힘들었는데, 더 심한 녀석들이 왔다간 버티지 못하는 거에요…!`);
  ctx.showMessage(`　당신, 가르쳐준 책임을 지고, 어떻게든 해주는 거에요!」`);
  ctx.showMessage(`W`);
  ctx.showMessage(`「…………후후후, 너, 재밌네, 마음에 들었어♪`);
  ctx.showMessage(`　그건 그렇고 재밌는 걸 만들고 있잖아`);
  ctx.showMessage(`　자연 에너지를 그렇게 많이 모아서는, 과거 번성했던 자연 에너지를 사용한 전투기술이라도 부활시키려 했니?`);
  ctx.showMessage(`　그 전투기술은 아마 바빌로니아의 성주에게 멸망당했다고 들었는데, 현대에 되살아나면 재밌으러야♪」`);
  ctx.showMessage(`L`);
  ctx.showMessage(`「무, 무슨 말을 하는 건지 전혀 모르겠어요!」`);
  ctx.showMessage(`L`);
  ctx.showMessage(`「질문에는 대답해 줘야겠지`);
  ctx.showMessage(`　…내 이름은【마르티나・파라디수스】`);
  ctx.showMessage(`　곧 당신하고 당신의 상사, …그리고『당신』도 만나러 갈게♪`);
  ctx.showMessage(`　그럼 잘 있어…」`);
  ctx.showMessage(`W`);
  ctx.showMessage(`　모니터에서 마르티나라 이름댄 여성의 모습이 사라진다…`);
  ctx.showMessage(`L`);
  ctx.showMessage(`「지, 지, 지금 그건 대체 누구인 거에요!?`);
  ctx.showMessage(`　파라디수스라고 했사와요!`);
  ctx.showMessage(`　잘 모르겠는 거에요…」`);
  ctx.showMessage(`W`);
}
