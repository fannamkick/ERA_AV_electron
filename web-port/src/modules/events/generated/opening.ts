/**
 * OPENING.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function opening(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine();
  ctx.showMessage('');
  ctx.showMessage(`「……그럼, 오늘 내가 온 것은 조의를 표하기 위해서도 아니고 학생회장답게`);
  ctx.showMessage(`　불행하게 부모를 잃은 학우를 격려하려 온것도 아니야.`);
  ctx.showMessage(`　――너도 알고 있겠지?　우리집이 뭐하는 곳인지, 말이야.」`);
  ctx.showMessage(`W`);
  ctx.showMessage(`교통사고로 부모를 잃고 화장도 끝난 그날,`);
  ctx.showMessage(`${ctx.getVarName("CALL", MASTER)}의 집에 ${ctx.josaHelper("플레이어가")} 다니는 학원의 학생회장인 키류 카논이 찾아왔다.`);
  ctx.showMessage(`그러나 카논은 교복이 아닌 화려한 기모노를 입고 있고`);
  ctx.showMessage(`옆에는 선글라스를 쓰고 스킨헤드인 어깨를 두명 데리고 있다.`);
  ctx.showMessage(`오지랖이 넓은 여장부 학생회장은 어디까지나 겉모습일 뿐, ${ctx.josaHelper("플레이어는")} 그녀가 이 주변을 통솔하는 조직`);
  ctx.showMessage(`즉 야쿠자의 외동딸인 것을 알고 있다.`);
  ctx.showMessage(`그리고 장례가 끝나자 야쿠자가 찾아왔다는 건 다시 말해――`);
  ctx.showMessage(`W`);
  ctx.showMessage(`「쉽게 말하면, 앞으로 너희 남매가 갚아야할 빚이 있다는 말이야.`);
  ctx.showMessage(`　너희들이 직접 빌린게 아니니 당연히 모르겠지만, 지금 찾아온걸 생각하면 알겠지?`);
  ctx.showMessage(`　너희들이 갚아야할 빚이란, 너희 부모가 빌리고 안갚은 돈을 말하는 거라고.`);
  ctx.showMessage(`　부모님이 야쿠자에게 돈을 빌릴리가 없어? 그야 그렇겠지.`);
  ctx.showMessage(`　미야마 선생님은 책도 그럭저럭 팔리고 미디어계의 신뢰도 두터운 정치평론가였어.`);
  ctx.showMessage(`　나도 선생님 책은 몇권정도 읽어봤지만, 뭐 여기저기서 씨부려대는 엉터리하고 다르게`);
  ctx.showMessage(`　제대로 된 말이었지.`);
  ctx.showMessage(`W 　그런 분이 돈을 빌려주는 일은 있어도 빌릴 일은 없겠지.`);
  ctx.showMessage(`　……그런데, 이렇게 생각해보면 어떨까?`);
  ctx.showMessage(`　너희들은 잘 알겠지만, 미야마 선생님은 사람이 너무 좋았지.`);
  ctx.showMessage(`　그런 분이라면 친구가 우리처럼 위험~한 곳에서 돈을 빌릴때 연대보증인이 돼주지 않을까?`);
  ctx.showMessage(`　그렇게 돼서, 이게 그 증거야.`);
  ctx.showMessage(`　너희들이야 아직 집안 인감 같은 건 본적도 없겠지만,`);
  ctx.showMessage(`　잘 찾아보면 이거랑 똑같은 도장이 집에서 나올거야.`);
  ctx.showMessage(`　그런데 그 친구가 도망갔으니 빚은 그대로 미야마 선생님에게 넘어간다, 까지는 이해되지?`);
  ctx.showMessage(`　그래도 제대로 된 금융기관이라면 파산같은 방법도 있고`);
  ctx.showMessage(`　애초에 이런 미성년자에게 등쳐먹을 일은 없겠지만, 우리 업계는 좀 달라.`);
  ctx.showMessage(`W 　부모가 죽으면 아이에게서 어떤 방법을 쓰더라도 회수한다.`);
  ctx.showMessage(`　――맞다, 여동생씨……카나데였나?`);
  ctx.showMessage(`　이번달부터 우리 학원에 등록한 성적 최우수 신입생에다 오빠한테는 신세도 졌으니`);
  ctx.showMessage(`　당연히 이름은 알고 있지.`);
  ctx.showMessage(`　네 머리라면『이런 위법금리는 재판소에 고소하고 변호사를 통해 착실하게`);
  ctx.showMessage(`　갚아나가자』라고 생각할지도 모르지만, 그런건 소용없어.`);
  ctx.showMessage(`　우리는 얕보이면 끝장인 업계니까 그랬다간 바로 전면전쟁이지.`);
  ctx.showMessage(`　다시 말해서, 너희 남매에게 도망칠 길은 없다는 거야.`);
  ctx.showMessage(`　그럼 알아들은 것 같으니 다음으로 넘어갈까.`);
  ctx.showMessage(`　금액은 거기 써있는 대로인데, 상환은 우리가 관리하는『포인트』로 해주셔야겠어.`);
  ctx.showMessage(`　……어때, 이만한 돈을 돌려줄 계획은 서나?`);
  ctx.showMessage(`　미야마 선생님의 생명보험, 거기에 네가 앞으로 벌돈을 다 더해도`);
  ctx.showMessage(`　부족할 만큼 엄청난 금액이지.`);
  ctx.showMessage(`　그래서 같은 학원에 다니는 학생끼리니, 내가 너희들 남매에게 일을 소개해주기로 한거야.`);
  ctx.showMessage(`　내가 지금부터 이야기하는 건 어디까지나 선택지중 하나야. 그밖에도 후보는 있지.`);
  ctx.showMessage(`　다른 후보부터 말해보자면, 우리 지하풍속점에서 몸을 판다던가`);
  ctx.showMessage(`　남자라도 좋아하는 변태는 많으니 몇년이 걸릴지는 몰라도 갚을 수는 있겠지.`);
  ctx.showMessage(`　……아무리 그래도 그건 싫지? 그래서 내가 소개할 일은 이거야.」`);
  // TODO: PRINTW
  ctx.showMessage(`카논이 눈짓을 하자 어깨가 탁자에 비디오카메라와 비디오테이프를 놓았다.`);
  // TODO: PRINTW
  ctx.showMessage(`「너는 오늘부터 AV감독에 AV남배우, 그리고 AV레이블 운영도 해줘야겠어.`);
  ctx.showMessage(`　……뭐가 다르냐는 얼굴이네. 좀 더 자세하게 이야기 해줄까?`);
  ctx.showMessage(`　예를 들면, 지하풍속점에서 매일 손님을 받아도 빚을 갚으려면 십년은 넘게 걸리겠지.`);
  ctx.showMessage(`　짐작은 가겠지만『지하』가 앞에 붙으면 인권이고 뭐고 없어.`);
  ctx.showMessage(`　인간 대접도 못받는 비품이나 마찬가지야.`);
  ctx.showMessage(`　반대로 이쪽은 똑같이 몸을 팔아도 더 많은 돈이 움직이고`);
  ctx.showMessage(`　무엇보다 어느정도 사생활이 보장되지.`);
  ctx.showMessage(`　거기다 매상은 그대로 네가 운영하게 될 회사에 들어와.`);
  ctx.showMessage(`　그 대신…… 네가 학원을 졸업하는 날까지는 갚아줘야겠어.`);
  ctx.showMessage(`　물론 그 전에 돈을 마련했다면 그때 갚아도 좋아.`);
  ctx.showMessage(`　그밖에 불안한 부분이 있다면 우리가 뒤도 봐줄거고, 이거라면 빚도 빨리 갚을 수 있고`);
  ctx.showMessage(`　지하풍속점에서 물건취급 받을 일도 없단 말이야.`);
  ctx.showMessage(`W 　어느쪽이 너희 남매를 위한 길인지는 말할 것도 없잖아?`);
  ctx.showMessage(`　……다른 일? 그야 있긴 있지만, 지하풍속점이랑 여러가지 의미로 다를바 없어.`);
  ctx.showMessage(`　그래서 이 일을 가지고 온거야.`);
  ctx.showMessage(`　이 일에 키류 조직이 들일 노력을 생각하면 단기상환도 괜찮으니까`);
  ctx.showMessage(`　뭐, 이런 이야기를 가지고 왔으니 당연히 구린 뒤가 있지만,`);
  ctx.showMessage(`W 　그건 때가 오면 이야기 해줄게.`);
  ctx.showMessage(`　이 기간동안 키류 조직이 너희 남매를 재촉하는 일은 절대 없을거야.`);
  ctx.showMessage(`　그 대신은 아니지만, 감시의 의미도 겸해서`);
  ctx.showMessage(`　스탭은 우리 조직원을 보내겠어.`);
  ctx.showMessage(`　여배우 후보는 일단 리스트를 만들어 뒀지만, 누구랑 계약할지는 네가 알아서 해.」`);
  ctx.showMessage(`W`);
  ctx.showMessage(`　그리고 카논이 어깨에게 꺼내라고 한건, 두꺼운 바인더였다.`);
  ctx.showMessage(`　이미 키류 조직에서 면접을 했는지, 학원에서 본적있는 카논의 글씨로 한명한명 코멘트가 달려있고`);
  ctx.showMessage(`　그중에는 ${ctx.josaHelper("플레이어가")} 아는 얼굴도 있었다.`);
  ctx.showMessage(`W`);
  ctx.showMessage(`「이게 지금 내가 소개해줄 수 있는 리스트야. 아, 숫자가 부족하려나?`);
  ctx.showMessage(`　일단 물어볼게, 카나데. 혹시 오빠가 빚을 갚기 위해 이 일을 선택한다면,`);
  ctx.showMessage(`　너에게 여배우가 될 각오는 있어?`);
  ctx.showMessage(`　―어이쿠, 그렇게 노려보지 말라고.`);
  ctx.showMessage(`　계약할지 말지는 너 하기 나름이니까 카나데는 내버려두고`);
  ctx.showMessage(`　다른 여자를 제물로 빚을 갚으면 되는 거잖아.`);
  ctx.showMessage(`　……흠, 할 마음은 있는거지? 그럼 나중에 잠깐 시간 좀 내주겠어?`);
  ctx.showMessage(`　그럼 이제 문제는 없겠지.`);
  ctx.showMessage(`　어쩔래? AV감독이 돼서 빚을 갚을거야, 아니면――」`);
  // TODO: PRINTW
  ctx.showMessage(`카논이 악마같은 미소를 지으며 물어온다.`);
  ctx.showMessage(`${ctx.getVarName("CALL", MASTER)}에게 카나데가 걱정스러운 눈빛을 보내고 있다.`);
  // TODO: PRINTW
  ctx.showMessage(`할 수 밖에, 없겠지――`);
  ctx.showMessage(`L`);
  await ctx.wait();
  return 0;
}

export async function simple_opening(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine();
  ctx.showMessage(`부모가 사고로 돌아가시더니 아빠가 연대보증인이었다.`);
  ctx.showMessage(`피보증인은 도망가고 상대는 키류 조직이라는 야쿠자.`);
  ctx.showMessage(`상환을 위해『가장 나은 선택지』로 조직에서 AV운영을 하게 된다.`);
  ctx.drawLine();
  await ctx.wait();
  return;
}
