/**
 * ACTRESS_INFO.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function actress_prof(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: LOADGLOBAL
  Y = 200 + X;
  if (X === 1) {
    ctx.showMessage('【미야마 카나데】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「오빠가 힘들어하고 있으니까……내가 어떻게든 해야 돼」');
    ctx.showMessage('');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('얌전하고 청초하고 헌신적이라는 삼박자를 골고루 갖춘 감독(=당신)의 여동생');
    ctx.showMessage('오빠가 힘든 걸 알고, 그런 오빠를 돕기 위해 스스로 AV배우가 되기로 결심했다');
    ctx.showMessage('학업성적이 매우 좋아 학년 톱을 유지하고있고 교사의 신뢰도 두터운');
    ctx.showMessage('【우등생】이지만, 운동은 못한다');
    ctx.showMessage('착실해보여도 의외로 유행에 민감하고 주위에 휩쓸리기 쉬운 면도 있다');
    ctx.showMessage('어렴풋한 연정을 친오빠에게 품고 있는 탓인지');
    ctx.showMessage('같은 반의 남자들이 접근하고 있다는 것을 전혀 모르고 있다');
    ctx.showMessage('하지만 이번 일로 인해 속마음은 마냥 편안하지 않아');
    ctx.showMessage('사소한 일로 연심이 흔들리게 될지도 모른다……');
    ctx.showMessage('');
    ctx.showMessage('연령: 15세　난이도: E　성장도: C　공헌도: B　매각치: B');
  } else if (X === 2) {
    ctx.showMessage('【사사키 미노리】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「카나데한테 그런 엣찌한 짓을 시킬 바에야, 차라리 나한테 하지?」');
    ctx.showMessage('');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('스포츠 만능에 보이시한, 감독(=당신)의 십여년지기 소꿉친구');
    ctx.showMessage('당신에게 자주 성희롱을 하고 있지만 상당히 순진한 면이 있어서');
    ctx.showMessage('의외의 반격에는 얼굴을 붉히며 굳어버리는 경우도');
    ctx.showMessage('여동생 연배인 카나데를 소중히 생각하고 있어서, 그런 그녀가 AV배우가 되려고 결심한');
    ctx.showMessage('것을 알고, 그저 대타로서 당신에게 AV배우가 되기 위해 나섰다');
    ctx.showMessage('당신에게 친구 이상의 감정은 없지만, 이성에게 흥미는 있어보인다');
    ctx.showMessage('');
    ctx.showMessage('연령: 16세　난이도: D　성장도: C　공헌도: A　매각치: C');
  } else if (X === 3) {
    ctx.showMessage('【쿠루메 사에】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「출연료는 얼마?　아 그래, 그 정도구나~」');
    ctx.showMessage('');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('근처의 편의점에서 아르바이트를 하고 있는,「요즘 여자」라는 느낌이 드는 소녀');
    ctx.showMessage('그다지 유복하지는 않은 것 같으며, 학교를 안 다니고 여러 아르바이트를 뛰고 있다');
    ctx.showMessage('AV배우가 되면 돈을 벌 수 있다는 단락적인 생각으로 당신(=감독)의 사무소 모집을');
    ctx.showMessage('인터넷에서 보고 응모했다');
    ctx.showMessage('잘 생기고 부자라면 연령을 불문하고, 반한 것마냥 쫄래쫄래 따라다닌다');
    ctx.showMessage('');
    ctx.showMessage('연령: 16세　난이도: D　성장도: D　공헌도: B　매각치: D');
  } else if (X === 4) {
    ctx.showMessage('【이이노 미키】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「후후……제가 눈에 띌 수 있는 찬스에요!」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('대기업의 아가씨로, 당신(=감독)의 반친구');
    ctx.showMessage('매우 고압적이라 남자를 하인으로밖에 생각하지 않고, 학교에서 남자를 셔틀로 써먹는');
    ctx.showMessage('모습은 셀 수 없을 정도로 많이 보인다');
    ctx.showMessage('들리는 소문에 따르면, 평범한 샐러리맨과 결혼한 나이차 큰 언니를 굉장히');
    ctx.showMessage('우러러보고 있어서, 언니의 말이라면 뭐라도 따르는 솔직한 면도 있는 것 같다');
    ctx.showMessage('관심받기 좋아하고 자신의 미모에 자신이 있기에, 이번 일을 듣고 입후보해왔다');
    ctx.showMessage('그러나 일단 분별력은 있어서, 본격적인 행위에는 저항이 있는 모양이다.');
    ctx.showMessage('또한, 의외로 남자에게 속기 쉬운 성격이다');
    ctx.showMessage('');
    ctx.showMessage('연령: 16세　난이도: B　성장도: D　공헌도: C　매각치: B');
  } else if (X === 5) {
    ctx.showMessage('【와타라이 키쿄우】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「응……힘낼게. 야한 거 잔뜩 가르쳐줘?」');
    ctx.showMessage('');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('다소 노출이 심한 코스프레 차림으로 동영상 사이트에 이른바「춤춰보았다」계 동영상을');
    ctx.showMessage('올리거나, 이벤트로 약간 야한 코스프레 ROM을 배포하고 있는 연령미상의 넷 아이돌');
    ctx.showMessage('그러나 그 모습은 과묵하지만 품행 단정하고 성적 우수, 있는 그대로의 자신과는 다른「누군가」');
    ctx.showMessage('를 강하게 동경하고 있는 연구자 기질의 중●생');
    ctx.showMessage('당장의 관심사는 남성의 생리현상이며');
    ctx.showMessage('나이에 맞지 않는 요염한 행동이나 말투로 도발하는 일도 잦다');
    ctx.showMessage('「우등생이 아닌 자신이 되는 것」과 남성을 가까이서 관찰할 수 있는 것 때문에, SNS에서');
    ctx.showMessage('지인에게 당신(=감독)의 사무소가 신인 여배우를 모집하고 있다는 것을 알아내고는,');
    ctx.showMessage('실제 나이를 속이고 응모했다');
    ctx.showMessage('어디까지나 그녀에게 남자는 관찰 대상 그 이상도 이하도 아니다');
    ctx.showMessage('따라서 이성에게 꾀이면 쉽게 넘어올 가능성도 있다');
    ctx.showMessage('');
    ctx.showMessage('연령: 14세　난이도: D　성장도: B　공헌도: B　매각치: B');
  } else if (X === 6) {
    ctx.showMessage('【칸다 히요리】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「당신……미안해요. 저는 약한 여자에요……」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('이이노 미키의 친언니로, 지금은 해외출장을 자주 나가는 샐러리맨과 결혼했고 아이도 있다');
    ctx.showMessage('친정집과의 불화로 몰래 만날 수밖에 없는 여동생을 매우 소중히 여기고 있다');
    ctx.showMessage('남편이 자주 집을 비우는 탓인지 달아오른 몸을 주체 못해, 안 되는 것임을 알면서도');
    ctx.showMessage('생으로의 실전 행위는 엄금한 채 만남계 사이트 등에서 성욕을 발산하던 중');
    ctx.showMessage('우연히 당신(=감독)의 사무소 직원이 그녀와 알게 되어, 좀 더 효율적으로 발산할 수 있는 장소로서');
    ctx.showMessage('AV 여배우를 모집하고 있음을 알았던 것 같다');
    ctx.showMessage('');
    ctx.showMessage('연령: 24세　난이도: C　성장도: D　공헌도: A　매각치: C');
  } else if (X === 7) {
    ctx.showMessage('【타타라 히나】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「유나쨩도 참~ ……아, 상냥하게 해 주실 거죠?」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('「작은 타타라씨」라고 불리는, XX현에선 유명한 테니스 선수');
    ctx.showMessage('언니이자 복식 파트너인 유나와의 관계는 레즈비언으로 의심될 정도의 진한 스킨십이 가득하고');
    ctx.showMessage('또 이른바 「연인 연결」로서 코트에 임하는 모습도 볼 수 있다');
    ctx.showMessage('히나 쪽이 얌전해서, 폭주하기 십상인 유나를 뒷바라지하는 손해보는 역할을 많이 맡지만');
    ctx.showMessage('반대로 유나가 이끌어주지 않으면 당황스러워할 정도로 유나에게 의존하고 있다');
    ctx.showMessage('딱히 이렇다할 훈련은 하고 있지 않지만, 왜인지 노래를 쓸데없이 잘 한다');
    ctx.showMessage('평범한 연예기획사로 착각한 유나가 프로필을 당신(=감독)의 사무소에 보내는 바람에');
    ctx.showMessage('여배우 후보에 올랐지만, 언니의 스탑퍼로서 조금씩 현재의 상황을');
    ctx.showMessage('받아들이고 있는 것 같다');
    ctx.showMessage('레즈 수준으로 유나와 서로 장난치고 해도, 확실히 남성에게 흥미는 있는 것 같다');
    ctx.showMessage('');
    ctx.showMessage('연령: 17세　난이도: D　성장도: B　공헌도: B　매각치: C');
  } else if (X === 8) {
    ctx.showMessage('【타타라 유나】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「에?　아이돌이 아니고 자위돌?　뭐 상관없어, 잘 부탁해♪」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('「큰 타타라씨」라고 불리는, XX현에서 유명한 테니스 선수');
    ctx.showMessage('여동생이자 복식 파트너인 히나와의 관계는 레즈비언으로 의심될 정도의 진한 스킨십이 가득하고');
    ctx.showMessage('또 이른바「연인 연결」로서 코트에 임하는 모습도 볼 수 있다');
    ctx.showMessage('유나 쪽이 활발하고, 종종 폭주하면 히나에게 수습되고 있지만, 내심으론 히나에게');
    ctx.showMessage('부담을 주지 않으려는 언니다운 면도 가지고 있다');
    ctx.showMessage('딱히 이렇다할 훈련은 하고 있지 않지만, 왜인지 노래를 쓸데없이 잘 한다');
    ctx.showMessage('평범한 연예기획사로 착각해서, 프로필을 당신(=감독)의 사무소로 보냈지만,');
    ctx.showMessage('AV여배우 후보라는 일을「재밌을 것 같다」라는 한마디로 시원스럽게 받아들이고');
    ctx.showMessage('말았다');
    ctx.showMessage('레즈 수준으로 유나와 서로 장난치고 해도, 확실히 남성에게 흥미는 있는 것 같다');
    ctx.showMessage('');
    ctx.showMessage('연령: 17세　난이도: E　성장도: B　공헌도: B　매각치: C');
  } else if (X === 9) {
    ctx.showMessage('【레이첼・I・파라디수스】(Rachel Invasor Paradisus)');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「곤란해하는 사람에게 손을 내미는 건 당연한 일이잖아요?」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('파라디수스 왕국이라는 유럽의 작은 섬나라에서 일본으로 유학온 공주님');
    ctx.showMessage('일본어가 서투른 건지 성격인지 가끔 말도 안 되는 얼빠진 발언을 반복해 주변 사람들을');
    ctx.showMessage('당황하게 만드는 것 같다');
    ctx.showMessage('온화하고 누구에게나 친절하지만 프라이드는 높고');
    ctx.showMessage('신분에 만족하는 삶을 인정하지 않는 완고한 면도 있다');
    ctx.showMessage('파라디수스 왕국엔 과학으로는 설명할 수 없는 신비한 힘이 있어서');
    ctx.showMessage('다른 사람을 특별한 도구 없이 치료할 수 있다고 한다');
    ctx.showMessage('또, 만드는 방법이 수상하지만 효과는 발군인 약을 조제하는 것이 취미로 보인다');
    ctx.showMessage('당신(=감독)의 처지를 알고 어떻게든 도와주고 싶다는 생각이 앞서 AV배우가');
    ctx.showMessage('뭐하는 일인지도 제대로 듣지 않고 입후보해왔다');
    ctx.showMessage('이성에 대한 면역은 별로 없고, 연애에 대한 동경을 안고 있는 것 같다');
    ctx.showMessage('');
    ctx.showMessage('연령: 17세　난이도: C　성장도: D　공헌도: SS　매각치: S');
  } else if (X === 10) {
    ctx.showMessage('【키류 카논】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「앗핫하, 나를 AV배우로 삼겠다는 건가. 당신 재밌는 남자네」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('뒷세계에서 절대적인 권력을 가진 키류 조직의 외동딸');
    ctx.showMessage('대쪽 같은 깔끔한 성격으로, 그 나이에 조직의 사내들을 한데 모으는 등');
    ctx.showMessage('남다른 카리스마를 지니고 있다');
    ctx.showMessage('또한, 성적도 우수하여 당신(=감독)이 다니는 학교의 학생회장을 맡고 있으며');
    ctx.showMessage('뛰어난 변론・교섭 기술은 이사회와 혼자서 자웅을 겨룰 수 있을 정도');
    ctx.showMessage('자신이 내다본 인재를 시험하는 성가신 습관이 있어서, 아무래도 원래부터 신경쓰이던 당신을');
    ctx.showMessage('이번 일에 말려들게 한 장본인이기도 하다');
    ctx.showMessage('본인 가라사대「너 정도의 남자라면 여자를 한둘쯤 쉽게 후리고 다니면서');
    ctx.showMessage('시키는 대로 하게 하는 건 간단하겠네」라는 모양이다');
    ctx.showMessage('당신에게 협력하기는 하지만, 여배우 후보로서는 꽤 고액의 계약금을 요구하고 있는데,');
    ctx.showMessage('이것도 당신을 시험하는 의미가 강한 것 같다');
    ctx.showMessage('아무래도 마음에 둔 사람이 이미 있는 것 같아서 품행도 꽤 단정하기 때문에,');
    ctx.showMessage('그렇게 쉽게 남성한테 넘어가지 않을, 것이다');
    ctx.showMessage('');
    ctx.showMessage('연령: 18세　난이도: B　성장도: D　공헌도: SS　매각치: D');
  } else if (X === 11) {
    ctx.showMessage('【스노 이쿠미】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「AV배우인가ー, 뭐 좋아ー. 재밌을 것 같고ー」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('언제나 체육복 차림으로 이 근처를 어슬렁거리는 무직……이라고 생각되는 소녀');
    ctx.showMessage('누군가 말을 걸면 귀찮은 듯한 말투로 대답하는 모습이 목격되고 있다');
    ctx.showMessage('또, 항상 편의점에서 고급 아이스크림을 사거나, 게임 샵에 이른 아침부터 줄 서 있거나 하지만,');
    ctx.showMessage('어디에서 수입을 얻고 있는지는 아예 수수께끼');
    ctx.showMessage('꾸미는 데 무관심한 탓인지 그다지 눈에는 띄지 않지만, 실은 꽤 예쁜 용모를 하고 있다');
    ctx.showMessage('어떻게 알았는지, 무슨 이유로 응모했는지 알 수는 없지만');
    ctx.showMessage('일단 하겠다는 의지는 있는 거 같다');
    ctx.showMessage('허나, 보낸 이력서는 나이나 쓰리사이즈 이외는 순 엉터리라고밖에 보이지 않아');
    ctx.showMessage('역시 잘 알 수 없는 소녀다');
    ctx.showMessage('');
    ctx.showMessage('연령: 19세　난이도: D　성장도: B　공헌도: C　매각치: D');
  } else if (X === 12) {
    ctx.showMessage('【고토 미츠키】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「섹스도 하고 돈도 받는다니, 딱 좋은 알바잖아?」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('거리의 진료소에서 근무하는, 소문난 미인 간호사');
    ctx.showMessage('섹스에 대해 매우 적극적이고, 호스트인 남자친구만으로는 만족하지 못해');
    ctx.showMessage('마음에 드는 입원환자를 자주 잡아먹고 있다');
    ctx.showMessage('AV 촬영에 대해선 성욕을 발산할 수 있는 가벼운 아르바이트 정도의 느낌이라며');
    ctx.showMessage('부담없이 신청해왔다');
    ctx.showMessage('카메라에 찍히는 것에 대해서도 거부감이 적어 즉시전력으로서 기대할 수 있다');
    ctx.showMessage('');
    ctx.showMessage('연령: 23세　난이도: E　성장도: C　공헌도: C　매각치: C');
  } else if (X === 13) {
    ctx.showMessage('【사카키 아유무】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「저기……나, 남자인데?」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('문무양도・용모단정・성격미인, 삼 박자를 고루 갖춘 흠집 없는 미소녀');
    ctx.showMessage('');
    ctx.showMessage('하　지　만　　남　자　다');
    ctx.showMessage('');
    ctx.showMessage('고등학교에서는 여자 취급을 당해 아이돌로서 추앙받고 있지만,');
    ctx.showMessage('본인은 좀 더 남성으로서 주위에 인정받고 싶다고 생각하는 것 같다');
    ctx.showMessage('거기에 눈독을 들인 사무소 직원이, AV 촬영으로 여성의 기분을 알게 된다면');
    ctx.showMessage('남자로서의 격이 올라갈 것이라는 영문 모를 이유로 여배우 데뷔에 동의했다');
    ctx.showMessage('');
    ctx.showMessage('여배우로서 히트할 수 있을지의 여부는 차치하고, 쇼타 취향의 누님으로부터는');
    ctx.showMessage('수로서는 최상. 특히 여교사에게는 군침도는 먹잇감으로 보이게 될 것 같다');
    ctx.showMessage('또한, 와타라이 키쿄우가 친밀한 관찰대상으로서 흥미를 가진 모양이다');
    ctx.showMessage('남배우로서 기용하는 것도 한 가지 지휘방법일지도 모른다');
    ctx.showMessage('');
    ctx.showMessage('연령: 17세　난이도: D　성장도: C　공헌도: D　매각치: B');
  } else if (X === 14) {
    ctx.showMessage('【미츠루 이즈키】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「불결해…… 심판해주겠어!」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('전국 대회에서 우승한 경험도 있는 검도부 주장 겸 풍기위원장');
    ctx.showMessage('저명한 검술가인 아버지를 존경하고, 연약한 남자는 싫다고 공언하기를 꺼리지 않는다');
    ctx.showMessage('사무라이 같은 말투와 굉장히 강직한 성격 때문에, 학교에서는 그녀를 매우 두려워한다');
    ctx.showMessage('그러나 여학생에게는 상냥하고 늠름한 미모로「언니」라며 동경하는 후배도 많지만,');
    ctx.showMessage('본인은 그런 쪽에 관심이 없다');
    ctx.showMessage('당신(=감독)이 여성을 상품화하고 있다는 소문을 듣고, 회심하게 만들기 위해');
    ctx.showMessage('당신의 사무소 문을 두드렸다');
    ctx.showMessage('');
    ctx.showMessage('연령: 17세　난이도: 난공불락　성장도: F　공헌도: E　매각치: C');
  } else if (X === 15) {
    ctx.showMessage('【히나미 하루노】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「야한 건 안된다고 생각합니다, 하느님께서 보고 계시거든요?」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('XX현의 제일 오래된 히나미 신사의 외동딸로 미야마 카나데의 반친구');
    ctx.showMessage('그야말로 야마토 나데시코 같은 소녀로 청초한 모습이 반 남자들에게 인기가 많다');
    ctx.showMessage('그러나 비슷한 나이대의 남성을 어려워한다');
    ctx.showMessage('하지만 당신(=감독)은 카나데를 통해 알고 있는 까닭에 어렵다는 의식은 하지 않고');
    ctx.showMessage('있는 모양으로, 허물 없는 분위기로 대화를 나눌 수 있다');
    ctx.showMessage('어른스럽고 차분한 성격으로 누구에게나 존대를 하지만, 가끔 나이에 걸맞는');
    ctx.showMessage('장난스러운 모습을 보여주기도 한다');
    ctx.showMessage('또한, 흥분하면 숨을 쉬기는 하는지 수상할 정도로 긴 말을 내뱉어');
    ctx.showMessage('후반부는 잘 알아들을 수 없을 때도 있다');
    ctx.showMessage('친한 친구인 카나데를 소중히 생각하여, 카나데가 여배우가 되자고 결심하고 있단 것을');
    ctx.showMessage('알게 된 그녀는, 대역이 되겠다는 듯 당신에게 AV 여배우가 되려 나섰다');
    ctx.showMessage('정조관념은 강하고, 또 이미 마음에 둔 사람이 있는 것인지 남자로부터의 어프로치도 그리');
    ctx.showMessage('간단히 허용하지 않지만, 카나데의 영향으로 패션 잡지를 읽는 등');
    ctx.showMessage('영향받기 쉬운 성격인 것 같다');
    ctx.showMessage('');
    ctx.showMessage('연령: 15세　난이도: E　성장도: C　공헌도: C　매각치: C');
  } else if (X === 16) {
    ctx.showMessage('【미사키 에리카】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「흥, 널 위해 나서주겠단 건 아니니깟!」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('착각에 의해『거짓 츤데레』라고 말할만한 개성을 가지게 되어, 억지로 거기에 맞춰');
    ctx.showMessage('대응하려고 하지만, 실제로는 꽤 소녀틱한 미야마 카나데의 반친구');
    ctx.showMessage('당신(=감독)보다도 연하이지만 서로 반말하는 사이이며, 곧잘 시시한 것으로 말싸움');
    ctx.showMessage('하는 경우도 많지만, 그 후에 쓸쓸해하는 것을 카나데와 히나미 하루노에게 위로받고');
    ctx.showMessage('있는 모습을 자주 볼 수 있다');
    ctx.showMessage('카나데가『에리쨩은 알기 쉬운 애야』라고 말할 정도로');
    ctx.showMessage('제대로 알아준다면 솔직해져줄지도 모른다');
    ctx.showMessage('밝고 활발한 무드 메이커이지만, 공부는 서투른 탓인지 통 영문 모를 대답을 할 때가 있고');
    ctx.showMessage('타고난 재수가 없어 본인과는 무관한 이유로 뭔가 아픈 꼴을 당할 때가 많다');
    ctx.showMessage('연애관에 대해서도 무진장 소녀틱해서, 거듭 카나데가『알기 쉬운 애』라고 표현할');
    ctx.showMessage('정도의 솔직함을 가지고 있는 까닭에, 이상한 남자가 꼬이지 않는다면 좋겠지만……');
    ctx.showMessage('');
    ctx.showMessage('연령: 15세　난이도: C　성장도: C　공헌도: C　매각치: C');
  } else if (X === 17) {
    ctx.showMessage('【미야마 미이】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「섹슈얼한 업무입니까…… 하와와」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('양 팔에 각인된 Multipurpose Interactive Interface의 앞 글자를 따 「미이」라고');
    ctx.showMessage('명명된 소녀형 안드로이드');
    ctx.showMessage('안드로이드라서 호적이 없기 때문에 편의상 「미야마 미이」라 자칭하고 있다');
    ctx.showMessage('인간과 조금도 차이나지 않는 조형에, 완벽한 응답에, 아무리 봐도 오버테크놀로지 덩어리인');
    ctx.showMessage('그녀지만, 어째서인지 당신(=감독)의 사무소로 보내졌다');
    ctx.showMessage('보낸 사람의 의도는 알 수 없지만, 피해는 없는데다가 여러가지로 사무소를 도와주고');
    ctx.showMessage('있으므로 일단 놔두기로 했다');
    ctx.showMessage('어찌된 영문인지 생식기능까지도 갖추고 있고, 본인 말로는 성행위도 가능하다고 한다');
    ctx.showMessage('연애감정이라는 개념이 생소한 데다, 사무소의 대표인 당신을 제일순위로 생각하고');
    ctx.showMessage('있기 때문에, 나쁜 벌레가 달라붙을 염려는 없다고 생각한다');
    ctx.showMessage('');
    ctx.showMessage('외견연령: 18세 정도　난이도: F　성장도: A　공헌도: S　매각치: S');
  } else if (X === 18) {
    ctx.showMessage('【렌카・록웰】(Renka Rockwell)');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「우와아…… 코스프레 옷이 가득하네요. 이거, 입어도 되나요?」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('오타쿠 문화 선호가 심각해서 미국에서 온 혼혈 유학생');
    ctx.showMessage('부활동은 치어리더부에 소속되어 있으며');
    ctx.showMessage('작은 몸집이면서도 아메리칸 사이즈의 거유로 뛰고 있는 탓에');
    ctx.showMessage('같은 운동장에서 부활동 중인 남자 운동부원들의 시선을 사로잡고 있다');
    ctx.showMessage('솔직한 성격에 긍정적인 성격인, 그야말로 그림으로 그린 것 같은 미국인이지만,');
    ctx.showMessage('이른바『야오이』물을 좋아하는지, 그녀에게 있어 이상적인 커플링으로서');
    ctx.showMessage('당신(=감독)과 사카키 아유무의 얽힘을 망상하고 혼자 흥분하는 위험한 면도 있어,');
    ctx.showMessage('당신과 아유무는 슬쩍 피하고 있었다');
    ctx.showMessage('그렇다고 여성을 버린 것은 아니고, 연애에 관해선 꽤나 빠져 있는 듯');
    ctx.showMessage('');
    ctx.showMessage('연령: 15세　난이도: D　성장도: D　공헌도: D　매각치: C');
  } else if (X === 19 && ctx.paramBand[69] === 0) {
    ctx.showMessage('【히토미쨩】(더치와이프)');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「………………」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('카논「어이 누구야 더치와이프 따위를 배우 후보에 올린 바보는……');
    ctx.showMessage('뭐…… 이 녀석은 당신과 여배우 후보의 연습 상대로 쓰면 되겠네.');
    ctx.showMessage('어, 뭐라고? 뭐, 외견상으론 평범한 여자애……인가 이거, 좀 기분 나쁘지만 말야――');
    ctx.showMessage('아무튼 전용 충전 도크에 넣을 필요가 있으니까');
    ctx.showMessage('그러다 치한에게 당할지도 몰라');
    ctx.showMessage('일단 간단한 감정 프로그램을 구축하고 있는 것 같으니');
    ctx.showMessage('당신을 따라준다거나 할 것 같은걸');
    ctx.showMessage('그런데…… 이렇게 기분 나쁜 걸 치한짓 하는 녀석이 불쌍해서 참을 수가 없어……」');
    ctx.showMessage('');
    ctx.showMessage('난이도: 없습니다　성장도: 한다곤 말 못함　공헌도: S　매각치: 안 팔림');
  } else if (X === 19 && ctx.paramBand[69] === 3) {
    ctx.showMessage('【스노 히토미】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「마스터가 더 기뻐해주셨으면 좋겠어요!」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('자기학습 프로그램에 심어져있던 함정이 발동해 폐기처분 될뻔했으나');
    ctx.showMessage('스노 이쿠미가 제 3세대 안드로이드에 기억영역을 모두 옮겨서 다시 태어난');
    ctx.showMessage('『히토미쨩』이라 불렸던 더치와이프');
    ctx.showMessage('미야마 미이와 자매관계라고 할 수 있을 것이다');
    ctx.showMessage('자신을 표현할 수단을 얻은 그녀는 자신에게 가장 소중한 사람인');
    ctx.showMessage('당신이 기뻐하는 것을 최우선사항으로 삼아');
    ctx.showMessage('그걸 위해서라면 뭐든지 실행하는 순종성과 위험성을 지녔다');
    ctx.showMessage('그녀의 외견은 개발자인 스노 이쿠미가 베이스로');
    ctx.showMessage('그녀와 쌍둥이라고 해도 믿을정도로 꼭 닮았다');
    ctx.showMessage('제 3세대 안드로이드로 태어난지 얼마 안되어 상식에 어둡고');
    ctx.showMessage('개량된 자기학습 프로그램의 왕성한 지식욕이 더해져');
    ctx.showMessage('무한의 가능성을 지니고 있다고 보여진다');
    ctx.showMessage('');
    ctx.showMessage('난이도: F　성장도: S　공헌도: S　매각치: S');
  } else if (X === 20) {
    ctx.showMessage('【아카바 마리】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「내 테크닉이라면 최고인 게 당연하잖아. 당신 보는 눈이 있는걸♪」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('말 그대로의 전형적인 흑갸루');
    ctx.showMessage('엣찌한 동시에 매우 탐욕스러워, 아르바이트로 레게댄서를 하면서 여러 남자를');
    ctx.showMessage('번갈아 타면서 사랑 많은 인생을 즐기고 있다');
    ctx.showMessage('AV업계에 대해서도 흥미진진하여, 스카우트맨이 말을 걸자 쾌히 승낙하여 따라왔다');
    ctx.showMessage('');
    ctx.showMessage('좋든 나쁘든 강렬한 임팩트를 갖고 있기 때문에, 순진한 소녀 중에는');
    ctx.showMessage('그녀와 교제하는 중에 갸루의 길에 발을 들여버리는 아이도 있을지 모른다……');
    ctx.showMessage('');
    ctx.showMessage('연령: 19세　난이도: D　성장도: C　공헌도: D　매각치: C');
  } else if (X === 21) {
    ctx.showMessage('【하세가와 미나토】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「괜ー찮아 괜ー찮아, 선생님한테 맡겨줘. 알겠지?」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('교사 생활 2년차인 초보교사이자, 카나데의 담임');
    ctx.showMessage('좋은 성품이 느껴지는 청초한 분위기를 풍기고 있으며, 학생들로부터도 매우 인기가 있다');
    ctx.showMessage('그 반면 굉장한 도짓코로서, 쉽게 속아버릴법한 사람 좋은 부분도……');
    ctx.showMessage('면담에서 카나데의 가정 사정을 알게 된 그녀는, 자신이 무엇인가 할 수 있진 않을까 하고 응모하여,');
    ctx.showMessage('떳떳하게 AV에 출연하여서 사랑하는 학생을 구할 것을 결의한다');
    ctx.showMessage('');
    ctx.showMessage('가정적이고 치유되는 성격이라, 창부로서도 적합할지 모른다');
    ctx.showMessage('');
    ctx.showMessage('연령: 24세　난이도: C　성장도: B　공헌도: C　매각치: B');
  } else if (X === 22) {
    ctx.showMessage('【오리베 마나카】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「오빠아ー, 좀 더 마~않이 야한짓 해줄거짓♪」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('원기 폭발・활력 넘치는 요즘 중학생');
    ctx.showMessage('좋아하는 사람에 대해서는 전력으로 어리광부리는 아이 같은 부분과, 엣찌한 일에 흥미진진해');
    ctx.showMessage('무의식적으로 남심을 유혹하는 사악한 부분을 겸비하고 있는 것이 매력');
    ctx.showMessage('빨리 엣찌를 경험하고 싶다고 생각하던 찰나에 스카우트되어, AV업계에 발을 디딘다');
    ctx.showMessage('');
    ctx.showMessage('성적 우수하고 딱딱한 성격의 언니에게는 대항심을 품고 있지만, 사실은 매우 사이가 좋다');
    ctx.showMessage('');
    ctx.showMessage('연령: 13세　 난이도: D　성장도: B　공헌도: C　매각치: C');
  } else if (X === 23) {
    ctx.showMessage('【아마미 루이】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「아니 그야 저도 관심 있는데요? 이제 애도 아니고」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('세련되지 않은 스트레이트 롱의 흑발 탓인지, 수수한 인상이 강한 중○생');
    ctx.showMessage('성격은 나이에 비해 어른스러우며, 성장을 생각하면 상당한 거유가 될 것 같은');
    ctx.showMessage('스타일을 갖고 있지만, 반친구인 키쿄우보다는 떨어지는 까닭에');
    ctx.showMessage('수수한 인상에 박차를 가하고 있다');
    ctx.showMessage('소문이나 유행에 민감해 본인 왈 「돈 될 것에 대해선 후각이 좋다」는 듯 하여,');
    ctx.showMessage('키쿄우가 슬쩍 보고 있던 당신(=감독) 사무소의 AV 여배우 모집 광고를 보고');
    ctx.showMessage('어른스러움을 악용해 응모해왔다');
    ctx.showMessage('남동생이 있는 것 같으며 꽤 돌보기 좋아하는 성격으로');
    ctx.showMessage('친밀한 그룹 내에선 중재 역을 맡는 모양이다');
    ctx.showMessage('연애에 관해선 골 빈 성격 탓인지 꽤나 홀려 있고');
    ctx.showMessage('영향 받기 쉬운 일면도 갖고 있다');
    ctx.showMessage('');
    ctx.showMessage('연령: 14세　 난이도: C　성장도: C　공헌도: D　매각치: B');
  } else if (X === 24) {
    ctx.showMessage('【테라모토 유카리】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「처음으로 뒷세계인가……라고 해도 앞세계이랑 뒷세계는 뭐가 다른 거야」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('학비를 위해 AV에 계속 출연하고 있는 여대생');
    ctx.showMessage('AV 여배우로서의 캐릭터에 이렇다 할만한 특징은 없지만, AV 여배우 중에선 차상급');
    ctx.showMessage('클래스의 외모와, 어느 정도 어브노멀한 시추에이션의 작품에도 출연하는 덕분에');
    ctx.showMessage('인기는 적당히 높다');
    ctx.showMessage('여태까지 전속 계약을 하던 메이커가 무너져, 정처 없이 떠돌고 있던 차에 이번 모집');
    ctx.showMessage('광고를 보고 응모해왔다');
    ctx.showMessage('연애관은 정상으로, 나름대로 교제해온 사람도 많다');
    ctx.showMessage('');
    ctx.resetColor();
    ctx.showMessage('연령: 21세　 난이도: C　성장도: C　공헌도: B　매각치: C');
  } else if (X === 25) {
    ctx.showMessage('【미카미 키요카】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「큰일났네에…… 이대로가면 교회를 닫아야 겠어」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('지역 교회를 운영하고 있는 항상 명랑 쾌활한 여성');
    ctx.showMessage('때마침 찾아온 불경기로 기부금이 줄어, 결국 갖고 있던 교회를 폐쇄하게 될 것 같던 차에');
    ctx.showMessage('일파만파처럼, 교회의 토지를 저당잡혀 키류 조직으로부터 선대의 운영자였던 신부가');
    ctx.showMessage('거액의 빚을 지고 있었던 것이 알려졌다');
    ctx.showMessage('당연히 기부금이 줄어 운영에서 온갖 문제를 겪고 있는 상황에 돈을 지불하는 대신에');
    ctx.showMessage('AV에 출연할 것을 권유받게 되었다');
    ctx.showMessage('그녀가 유일하게 받아들일 수 있었던 조건은, 교리에 반하는 행위인『혼전 성행위의 금지』');
    ctx.showMessage('뿐이며, 처녀를 지키기만 하면 문제는 없는 까닭에『애널섹스와 오럴섹스라면 OK』');
    ctx.showMessage('라고 하는 교리의 허점을 이용해 출연하게 된다');
    ctx.showMessage('교회에 인접한 아동시설에서 고아와 이웃 아이들을 모아');
    ctx.showMessage('일주일에 몇 번 정도 무료 음악교실을 열고 있으며');
    ctx.showMessage('해외 성가대에 재적했던 적도 있어 가창력은 발군이다');
    ctx.showMessage('예전에 이성과 사귄 적이 있어, 그 때 애널섹스는 경험한 적 있지만,');
    ctx.showMessage('처녀를 지키려는 정도의 신앙심은 있다');
    ctx.showMessage('');
    ctx.showMessage('연령: 27세　 난이도: D　성장도: B　공헌도: D　매각치: C');
  } else if (X === 26) {
    ctx.showMessage('【시미즈 사쿠라코】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「후하하하하! 이몸이 바로 RB단의 수령이시다! 리얼충 폭발해라!」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('거리의 커플들에게 시비를 거는 집단「RB(리얼충 폭발해라)단」의 수령');
    ctx.showMessage('옛날에는 외국 대학을 월반 졸업할 정도의 신동 소리를 들었지만 지금은 그렇다는');
    ctx.showMessage('생각이 안 들 정도로 몰락……아니 분명 사쿠라코의 행동은 본인에게는 의미가');
    ctx.showMessage('있긴 할 거다(by카논)');
    ctx.showMessage('「우리가 인기없는 것은 커플들 탓이다!」라는 수수께끼의 이론으로 결성된');
    ctx.showMessage('RB단이 당신(=감독)과 미노리가 나란히 걷고 있는 곳을 습격했을 때 알게됐다');
    ctx.showMessage('');
    ctx.showMessage('사실은 일부 계층에게 인기있기는 하지만, 불행할 정도로 거만한 성격과 절벽가슴인');
    ctx.showMessage('합법로리 체형이 아무래도 이해받지 못하는 것이다.');
    ctx.showMessage('또, RB단에서는 핀트가 엇나간 연애 세미나가 이루어지고 있으며, 그 세미나의');
    ctx.showMessage('강사도 맡고 있다');
    ctx.showMessage('그런 그녀지만 AV에 나오면 평범하게 인기있을 거다, 라는 지인 카논의 꼬드김으로 인해,');
    ctx.showMessage('AV배우로 나서게 됐다');
    ctx.showMessage('그러나 근본적인 부분에서 연애불신이고, 일부 계층의 접근이 과도하기 때문에,');
    ctx.showMessage('진심으로 접근해오는 상대에게는 둔감하다');
    ctx.showMessage('');
    ctx.showMessage('RB단의 활동과 병행하여, 해외에서 알게 된「멍한 느낌의 일본인 여자아이」');
    ctx.showMessage('를 찾고 있는 것 같으므로, 찾아주면 좋을지도 모르겠다');
    ctx.showMessage('');
    ctx.showMessage('연령: 18세　 난이도: B　성장도: C　공헌도: S　매각치: A');
  } else if (X === 27) {
    ctx.showMessage('【토모요시 아야노】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「우후훗, 멋진데요!」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('지역 경찰서 교통부에서 일하는 여경');
    ctx.showMessage('생긴 것도 집안도 아가씨지만 의외로 활동적이고 경찰서에서 높은 실적을 올리고 있다');
    ctx.showMessage('당신(=감독)이 AV촬영을 하고 있다는 소문을 듣고');
    ctx.showMessage('독단으로 조사하기 위해 사무소에 나타났지만…');
    ctx.showMessage('계급은 말단 경찰이지만 뒤에서 지역 경찰서의 실권을 쥐고 있는 상당한 수완가');
    ctx.showMessage('일의 파트너인 사쿠라이 프리실라를 매우 좋아해서 몰래 그녀의 몸을 노리고 있다');
    ctx.showMessage('비디오 촬영이 취미라 잘하면 그녀한테 AV를 찍어달라고 할 수도 있겠다');
    ctx.showMessage('');
    ctx.showMessage('연령: 20세　난이도: D　성장도: C　공헌도: S　매각치: C');
  } else if (X === 28) {
    ctx.showMessage('【사쿠라이 프리실라】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「하우~, 어쩌다 이렇게 된 거야~?」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('지역 경찰서 교통부에서 일하는 여경');
    ctx.showMessage('혼혈계 외모에 솔직하고 활발한 성격으로 지역에서 인기가 많다');
    ctx.showMessage('당신(=감독)이 불법행위를 하고 있다는 소문을 듣고');
    ctx.showMessage('독단으로 조사하기 위해 사무소에 나타났지만…');
    ctx.showMessage('사실 일의 파트너인 토모요시 아야노에게 몸을 노려지고 있으나');
    ctx.showMessage('아직 눈치채지 못했다');
    ctx.showMessage('');
    ctx.showMessage('연령: 20세　난이도: A　성장도: C　공헌도: B　매각치: C');
  } else if (X === 29) {
    ctx.showMessage('【아오이 하루카】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「주님, 용서해주십시오……」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('미카미 키요카와 같은 교회에서 일하는 수녀');
    ctx.showMessage('교회계 시설 출신이며, 대학 졸업 후 시설의 후배들에게 도움이 되기 위해 고향으로 돌아왔다');
    ctx.showMessage('하지만, 시설의 재정상황은 상상 이상으로 빡빡해서, 결국 빚을 갚기 위해');
    ctx.showMessage('몸을 파는 일을 피할 수 없게 된다');
    ctx.showMessage('학생 때부터 시설의 아이들을 돌봐 와서 가사 전반이 능숙하고');
    ctx.showMessage('봉사활동 등으로 인해 근처에서는 인기있는 누님이다');
    ctx.showMessage('특히 시설의 아이들은 언니처럼 따라주고 있다');
    ctx.showMessage('');
    ctx.showMessage('연령: 22세　난이도: C　성장도: C　공헌도: C 매각치: C');
  } else if (X === 30) {
    ctx.showMessage('【후미노 유즈카】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「저, 동물 싫어하시나요?」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('지역 상가에 있는『펫숍・후미노』의 간판 여성');
    ctx.showMessage('고령화가 진행되고 있는 상가에서는 그녀와 같은 어린 소녀는 드물고');
    ctx.showMessage('거기에『밝고 착한 아이』인 까닭에 상가의 아이돌 같은 취급을 받고 있다');
    ctx.showMessage('도감에도 실려있지 않은 것 같은 깃털과 날개가 달렸고 넛츠를 좋아하는, 일단 파충류로');
    ctx.showMessage('분류되는 애완동물『히나』와 학교 외에서는 항상 함께 있을 정도의 동물 애호가');
    ctx.showMessage('');
    ctx.showMessage('그녀가 AV 여배우를 지망하게 된 이유는, 교외의 대형 쇼핑센터 안에 펫숍이 생긴');
    ctx.showMessage('탓인지 매상이 격감한 까닭에, 부모에게 무리를 시키고 싶지 않다고 생각한');
    ctx.showMessage('그녀는 상가의 뒷배로, 예로부터『키류씨』라고 섬겨지고 있는');
    ctx.showMessage('키류 카논에게 상담해, 이 일을 소개받은 것이다');
    ctx.showMessage('거기서 만난 당신(=감독)을 따르게 됐지만, 아무래도 그녀는');
    ctx.showMessage('예전부터 한눈에 반하기 쉬운 것 같단 말을 카논으로부터 전해듣고 있다');
    ctx.showMessage('또한, 첫사랑은『곱상한 얼굴에 검정 계열의 코디를 한 강하고 상냥한 연상의 인물』');
    ctx.showMessage('이었다고 하지만, 전자기기 메이커의 사장 아가씨와 결혼해버린 까닭에');
    ctx.showMessage('그녀의 첫사랑은 이루어지지 않았다');
    ctx.showMessage('');
    ctx.showMessage('연령: 14세　난이도: D　성장도: B　공헌도: B　매각치: B');
  } else if (X === 31) {
    ctx.showMessage('【시라나미 유카리】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「…………뭐야?」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('새하얀 머리카락이 인상적인, 선이 가는 미소녀');
    ctx.showMessage('청초하고 가련한 분위기와는 정반대로, 과묵하고 무기력하며 모든 것에 귀찮아하는, 가시가 있는 성격');
    ctx.showMessage('선천적으로 몸이 약한 까닭에 학교에 다니지 않고, 집에서 요양 생활을 보내고 있다');
    ctx.showMessage('그러한 그녀가 AV배우가 되길 희망하는 것은, 자신이 살았던 증거로서 이 세상에');
    ctx.showMessage('뭔가 남기고 싶은 생각이 있기 때문일지도 모른다…… 촬영에는 완전히 비협조적이지만');
    ctx.showMessage('어쨌든 네거티브해서 촬영까지는 손이 많이 가지만, 그 반면 비주얼 면에서는 더할 나위 없는');
    ctx.showMessage('미모를 가진 소녀이다');
    ctx.showMessage('참고로 하는 것이 없이 TV나 인터넷만 잔뜩 보고 있었던 까닭에, 오타쿠 지식은 풍부');
    ctx.showMessage('');
    ctx.showMessage('연령: 16세　난이도: A　성장도: D　공헌도: C　매각치: A');
  } else if (X === 32) {
    ctx.showMessage('【아이다 엘레나】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「아버님의 병원을 지키기 위해서라면, 저…… 무슨 일이든 할 수 있어요」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('지역 진료소에서 근무하는, 젊은 내과의');
    ctx.showMessage('해외 인턴쉽을 소화해내고, 연령에 어울리지 않게 비상한 솜씨를 가졌다');
    ctx.showMessage('하지만, 가난한 사람들에게 싼 가격으로 치료를 하고 있는 아버지의 병원을 지키기 위해');
    ctx.showMessage('AV 촬영에 응모하게 되었다');
    ctx.showMessage('');
    ctx.showMessage('항상 모자를 쓰고 있지만, 그 밑에는 개과 동물의 귀가 숨어있다');
    ctx.showMessage('그녀의 어머니는 고대 켈트족 샤먼의 후예로 알려져 있으며, 그녀의 귀는');
    ctx.showMessage('고대 정령의 현현이라고 한다.');
    ctx.showMessage('그리고 그녀 자신도 고대의 비술을 알고 있는 위치・닥터로서의 얼굴을');
    ctx.showMessage('가지고 있다.');
    ctx.showMessage('');
    ctx.showMessage('연령: 23세　난이도: B　성장도: C　공헌도: A　매각치: B');
  } else if (X === 33) {
    ctx.showMessage('【아이다 알리사】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「……아버지 병원을 도와주는 거야?　그럼 뭐든지 할게」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('지역 진료소에서 근무하는 신인 간호사로서, 엘레나의 친여동생');
    ctx.showMessage('무엇이든 해내는 언니에 비해 기억력이 나쁘고, 간호사로서의 솜씨는 조금 모자른다');
    ctx.showMessage('하지만, 18세로는 보이지 않는 귀여운 소녀 같은 용모로, 노인들로부터는');
    ctx.showMessage('절대적인 인기를 자랑한다.');
    ctx.showMessage('과묵하고 무엇을 생각하고 있는지 알기 어렵지만, 감독인 당신을');
    ctx.showMessage('무너지던 진료소를 구해구는 선인으로 믿고 있으니 지도는 쉬울 것이다');
    ctx.showMessage('간호사 모자 아래에는 귀여운 늑대귀가 숨어있다');
    ctx.showMessage('');
    ctx.showMessage('연령: 18세　난이도: E　성장도: C　공헌도: C　매각치: B');
  } else if (X === 34) {
    ctx.showMessage('【나카지마 하즈키】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「그이를 위해서라면, 엣찌 정도는 참을 수 있어요……!」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('지역의 예술 대학에 다니고 있는 스포츠 만능 소녀');
    ctx.showMessage('실력파 테니스 선수로서 이름을 날리는 한편, 만화가 지망생인 애인과 열애 중');
    ctx.showMessage('남자친구의 영향으로 살짝 발을 딛은 동인업계에 푹 빠져버렸다');
    ctx.showMessage('그 매력적인 몸에 눈독 들인 키류 조직이, 남자친구라는 약점을 쥐고 반 강제로');
    ctx.showMessage('당신(=감독)의 현장에 데리고 왔다');
    ctx.showMessage('지도에 비협조적이지만, 코스플레이어로서의 지식은 촬영에 유용할지도 모른다');
    ctx.showMessage('');
    ctx.showMessage('연령: 18세　난이도: B　성장도: C　공헌도: C　매각치: C');
  } else if (X === 35) {
    ctx.showMessage('【오리베 나츠미】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「마나카도 참 이런 수상쩍은 곳에 출입하다니……!」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('카나데와 같은 반의 반장을 맡고 있는 재원으로서, 마나카의 언니');
    ctx.showMessage('수상한 스카우트맨을 따라가는 마나카를 봤다는 말을 반친구에게 듣고');
    ctx.showMessage('그 진위를 확인하기 위해서 사무소를 방문했다');
    ctx.showMessage('');
    ctx.showMessage('고지식한 성격으로 성적 행위에 대한 편견을 가지고 있다');
    ctx.showMessage('하지만 여동생인 마나카에게 매우 약하기 때문에, 그 부분을 찌르면 쉽게 함락될 것이다');
    ctx.showMessage('');
    ctx.showMessage('연령: 16세　난이도: B　성장도: A　공헌도: C　매각치: B');
  } else if (X === 36) {
    ctx.showMessage('【카와기시 아사히】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「내가 엣찌한 일을 하면, 그이는 구해주는 거겠지?」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('현재 인기 급상승 중인 카나데의 반친구');
    ctx.showMessage('예전에는 요리를 잘하는 것 외에는 장점이 없는, 매우 수수한 존재감의');
    ctx.showMessage('소녀였다고 하지만, 남자친구의 관심을 끌기 위해 이미지 체인지하여 그 감춰진');
    ctx.showMessage('미소녀성이 개화해, 학원의 아이돌 중 한 사람까지 올랐다');
    ctx.showMessage('그러나, 그 매력에 눈독 들인 키류 조직에 의해,');
    ctx.showMessage('반강제적으로 당신(=감독)의 현장으로 끌려와버리고 만다');
    ctx.showMessage('남자친구에 대한 지조를 지키기 위해 필사적으로 느끼지 않으려 하지만, 몸은 매우 민감하다');
    ctx.showMessage('주위에서의 주목도도 높고, AV 촬영을 납득시킨다면 인기 여배우가 되어줄 것이다');
    ctx.showMessage('');
    ctx.showMessage('연령: 16세　난이도: A　성장도: C　공헌도: B　매각치: B');
  } else if (X === 37) {
    ctx.showMessage('【아키나 미레이】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「에, 엣찌한 일은 안 된다고 생각해…(두근두근)」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('근처의 대형 병원에서 근무하는 신인 간호사');
    ctx.showMessage('어투는 조금 남자 같지만 생각을 밀어붙이지 못하는 성격');
    ctx.showMessage('용모는 상당히 좋을 터이지만, 남친 없는 세월=연령인 사람');
    ctx.showMessage('사실은 시를 짓는 취미를 가졌지만 부끄럽기 때문에 숨기고 있다.');
    ctx.showMessage('');
    ctx.showMessage('연령: 21세　난이도: C　성장도: C　공헌도: C　매각치: A');
  } else if (X === 38) {
    ctx.showMessage('【야미자키 린코】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「나의 성기사여, 구원받으라(오늘도 잘 부탁드려요♪)」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('키류 조직의 자회사인 예능 프로덕션에서 최근 데뷔한 신인 아이돌');
    ctx.showMessage('극도의 중2병을 앓고 있으며, 무대 의상도 본인의 희망에 따라 타천사를 모티프로');
    ctx.showMessage('삼았다고 하는 매우『안쓰러운』느낌 때문인지, 괴악한 취급을 받고 있다');
    ctx.showMessage('하지만 말을 치장하곤 있으나, 그 태도는 알기 쉬울 정도로 매우 솔직하다');
    ctx.showMessage('그 가창력과 댄스는 거칠면서도 소질이 느껴지는 것으로');
    ctx.showMessage('\'국민적 아이돌 그룹『Colorful Pure Girl』에 대항할 수 있을지도 모른다\'라는');
    ctx.showMessage('아이돌 비평가의 의견도 있다');
    ctx.showMessage('그런 그녀가 어째서 AV업계에 흥미를 드러냈는가 하면,');
    ctx.showMessage('당신(=감독)에 대해…… 그녀의 말을 번역하자면');
    ctx.showMessage('『이전 사무소에서 봤을 때 운명의 사람이라고 생각했어요♪』라는 것 같다');
    ctx.showMessage('현역 아이돌이므로 AV 발매에는 세심한 주의를 기울일 필요가 있지만,');
    ctx.showMessage('그런 뒷공작은 키류 조직이 손을 써둔다, 는 것 같으므로 스스럼 없이 촬영할 수');
    ctx.showMessage('있을 것이다');
    ctx.showMessage('');
    ctx.showMessage('연령: 14세　난이도: E　성장도: C　공헌도: A　매각치: S');
  } else if (X === 39) {
    ctx.showMessage('【코히나타 시오리】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「이렇게 된 바엔 어쩔 수 없군요. AV계의 천하를 쥐겠어요!」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('인근의 젊은이들을 상대로 사채꾼 흉내를 내고 있던 중학생');
    ctx.showMessage('다루고 있던 금액은 적었으나, 가혹한 추심(회수)으로 원한을 살 때가 많았다');
    ctx.showMessage('격앙된 채무자들에게 둘러싸여 폭행을 당하게 되었지만, 「우연」히 지나가던 카논에게');
    ctx.showMessage('구해진다');
    ctx.showMessage('그 뒤에, 지금까지보다 안전하게(=카논의 보호 아래) 고액의 돈벌이로 당신의');
    ctx.showMessage('사무소를 소개받았다');
    ctx.showMessage('중○생인 까닭에 몸은 결코 풍만하지 않다');
    ctx.showMessage('하지만, 담력이 좋고 어른 뺨치는 협상력을 가진 까닭에');
    ctx.showMessage('사무소의 경영에 도움이 될 것이다');
    ctx.showMessage('');
    ctx.showMessage('연령: 14세　난이도: C　성장도: B　공헌도: B　매각치: B');
  } else if (X === 40) {
    ctx.showMessage('【쇼우노 소라】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「응. 나, 토노의 여자친구. 그러니까 토노를 위해 힘낼거야」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('발군의 미모와 스타일을 가지고, 카논에게 필적할 정도로 우수한 성적을 거두고 있는 소녀');
    ctx.showMessage('본인에게 자각은 없지만, 그 완벽한 재색겸비함 때문에 주변으로부터 우러러지며,');
    ctx.showMessage('남자들로부터『절벽 위의 꽃』취급을 받고 있었지만,');
    ctx.showMessage('몇 달 전부터 토노라는 남학생과 사귀기 시작한 듯 하다');
    ctx.showMessage('고작 몇 개월이라는 기간인데도, 두 사람의 바보 커플상은 학원에서 유명하게 되었으며,');
    ctx.showMessage('그 때문인지 이전보다 남성들로부터의 인기도 줄어든 것 같다');
    ctx.showMessage('또한, 이미 토노와 미래를 맹세해 곧 동거를 시작하려 했지만,');
    ctx.showMessage('학생들이 할 수 있는 정도의 아르바이트로는 택도 없어, 그 계획도 좀처럼 진전되지 않고 있다');
    ctx.showMessage('');
    ctx.showMessage('그 사실을 안 카논으로부터 「벌이 좋은 아르바이트」로서 당신(=감독)을 소개받게 되었다');
    ctx.showMessage('덧붙여, 바보 커플답게 반드시 결혼까지는 서로 순결을 지키자는 다짐을');
    ctx.showMessage('했다는 것으로 보아, 키스밖엔 경험한 적이 없는 것 같다');
    ctx.showMessage('');
    ctx.showMessage('또한, 아르바이트 하던 햄버거 가게에 자주 오는 스노 이쿠미와는 어쩐지 돈독한 사이');
    ctx.showMessage('');
    ctx.showMessage('연령: 16세　난이도: D　성장도: A　공헌도: C　매각치: B');
  } else if (X === 41) {
    ctx.showMessage('【하뉴 리사】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「후훗, 착하다 착해♪」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('작은 체형에 동안이라 빈번히 중○생이라 착각될 정도지만');
    ctx.showMessage('그에 어울리지 않는 거유를 자랑하는 당신(=감독)의 선배이자 키류 카논의 반친구.');
    ctx.showMessage('느긋한 성격과 독특한 오라로 주위의 분위기를 무의식적으로 포근하게 만들고');
    ctx.showMessage('말도 잘 통해서인지 여러 사람들에게서 존경을 받고 있다.');
    ctx.showMessage('또, 딱히 강요를 하는건 아니지만, 올려다보면서 부탁을 받으면 아무도 거절하지 못한다');
    ctx.showMessage('');
    ctx.showMessage('학원 부지 구석에 만들어진 사육실에서 기르고 있는 동물들을 돌보고 있으며,');
    ctx.showMessage('그 먹이값을 벌기 위해 지인의 부모님이 경영하는');
    ctx.showMessage('웨이트리스 제복에 힘이 들어간 카페에서 아르바이트를 하고 있다.');
    ctx.showMessage('하지만 아르바이트 만으로는 동물들의 먹이값을 버는 것도 제대로 되지않아 곤란해');
    ctx.showMessage('하던 차에,『키류 조직의 인간』으로써를 겸해 그녀를 노리고 있던 카논에게');
    ctx.showMessage('『꽤나 좋은 아르바이트』라는 명목으로, 대우가 좋다며 AV 여배우업을 소개받았다');
    ctx.showMessage('정조관념이 강한 그녀는 고민에 고민을 거듭했지만, 카논의 화술로 구워삶아진 그녀는');
    ctx.showMessage('『모두』를 위해 이력서를 카논을 거쳐 건넸다');
    ctx.showMessage('이 학원에 입학하기까지는 계속 여학교였기때문에 남성에 대해 흥미를 가지고 있지만,');
    ctx.showMessage('동물을 귀여워해줄것만 같은 상냥한 사람이 아니면 별 느낌이 없다고 한다');
    ctx.showMessage('');
    ctx.showMessage('둘 다 애완동물을 좋아하고 단골이라는 관계여서인지, 후미노 유즈카와 특히 사이가 좋은것 같다');
    ctx.showMessage('');
    ctx.showMessage('연령: 17세　난이도: D　성장도: A　공헌도: A　매각치: B');
  } else if (X === 42) {
    ctx.showMessage('【후지카와 리에】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「선~배♪　괜찮으면, 어디 놀러가고 싶은데?」');
    ctx.showMessage('');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('당신(=감독)이 다니는 학교에 전학을 온 후배, 카나데와는 다른 반');
    ctx.showMessage('키류 조직 산하의 예능 프로덕션에 소속된 아이돌이지만, 현재 휴업 중');
    ctx.showMessage('최근엔 야미자키 린코가 같은 사무소에서 데뷔한 일도 있어 지명도는 떨어지는 중');
    ctx.showMessage('아이돌로써의 재능은 상당하지만, 재능이 꽃을 피우기 전에 휴업을 해버렸다');
    ctx.showMessage('예능계에 지쳐서이다, 라는 소문도 있다고 한다');
    ctx.showMessage('');
    ctx.showMessage('처음 만난건 키류 조직에 인사를 하러갔을때 스쳐지났을 뿐이지만');
    ctx.showMessage('그녀가 전학을 오게되어 우연히 재회한 뒤로는 직접적으로 호의를 받게 된다');
    ctx.showMessage('경력을 신경쓰지 않고 사람들 접하는 자세가 호감을 가져다준 모양이다');
    ctx.showMessage('뭔가 곤란하다면, 언제라도 힘이 되어주겠다고 자처하고 있지만……');
    ctx.showMessage('');
    ctx.showMessage('연령: 16세　난이도: D　성장도: B　공헌도: D　매각치: B');
  } else if (X === 43) {
    ctx.showMessage('【아이바 세리나】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「날 좀 내버려둬, 너 같은 남자하고 친하게 지낼 생각 없어!」');
    ctx.showMessage('');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('당신(=감독)반의 반장');
    ctx.showMessage('당신이 입학전에 장을 보러 나갔다가 미아가 된 카나데……와 함께');
    ctx.showMessage('미아가 됐을때 만나고, 그 뒤로 같은 반에서 만났다');
    ctx.showMessage('학원이사의 외동딸이지만, 무슨 사정이 있는지 현재는 자취중이다');
    ctx.showMessage('항상 당당한 자세가 주위의 인기를 모으지만,');
    ctx.showMessage('사실 고집이 쎄고 허세를 부리며 감정에 휩쓸리기 쉽고');
    ctx.showMessage('처음 만났을때는 친절했으나, 이성에게 불신감을 가지고 있는듯');
    ctx.showMessage('때때로 당신에게 독설을 날린다');
    ctx.showMessage('자취를 하며 돈이 빈궁한 모양인지');
    ctx.showMessage('카나데가 마트 특가세일에서 그녀의 모습을 본적이 있다고 한다');
    ctx.showMessage('그녀의 금전사정을 알아챈 카논이『꽤나 좋은 아르바이트』라며');
    ctx.showMessage('이 일을 소개받았지만, 남성불신에 자존심도 높아');
    ctx.showMessage('촬영에 지장이 있을지도 모른다');
    ctx.showMessage('');
    ctx.showMessage('참고로 본인은 동물을 별로 안좋아하지만, 봉사활동을 도와준적이 있어');
    ctx.showMessage('하뉴 리사하고 사이가 좋다고 한다……');
    ctx.showMessage('');
    ctx.showMessage('연령: 16세　난이도: A　성장도: B　공헌도: C　매각치: A');
  } else if (X === 44) {
    ctx.showMessage('【타카기 사오리】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「저기, 열심히 할테니 잘 부탁드려요」');
    ctx.showMessage('');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('번화가에 위치한, 미야마 카나데가 자주가는 부티크의 점원');
    ctx.showMessage('고○학생이라고 해도 믿을만한 동안이지만,');
    ctx.showMessage('때때로 구운 오징어에 사케를 홀짝이는 모습이 목격된다');
    ctx.showMessage('또 말수가 적고 감정이 표정에 드러나지 않아 무뚝뚝한 사람이라고 착각하기 쉽지만,');
    ctx.showMessage('머리속에선 항상 썰렁한 아재개그를 생각하고 있는등');
    ctx.showMessage('겉보기와 달리 내용물은 완전히 아저씨나 마찬가지');
    ctx.showMessage('그녀의 단골술집『순회』에 우연히 동행한 키류 카논과 마음이 맞아');
    ctx.showMessage('카논의 감언이설에 완전히 넘어가 AV배우 데뷔를 마음먹게 됐다');
    ctx.showMessage('');
    ctx.showMessage('그녀가 결심한 이유엔 지금까지 나름 연애경험을 쌓아왔지만,');
    ctx.showMessage('항상 선을 넘기 전에 파국을 맞아 키스조차 경험해본적이 없다는 것과');
    ctx.showMessage('매해 늘어나는 나이의 중압도 관련이 있을지 모른다');
    ctx.showMessage('');
    ctx.showMessage('연령: 25세　난이도: C　성장도: C　공헌도: C　매각치: C');
  } else if (X === 45) {
    ctx.showMessage('【미요시 유카코】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「아무런 장점도 없는 저 같은 사람도, 괜찮은가요……?」');
    ctx.showMessage('');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('단것을 너무나 좋아하여 카페코너가 마련된 양과자점');
    ctx.showMessage('『돌체・비타』에서 아르바이트를 하는 고○학생');
    ctx.showMessage('주목을 모을만한 화려함은 없지만, 온화한 성격과 미소');
    ctx.showMessage('그리고 유니폼의 미니스커트 밑으로 보이는 포동포동한 허벅지나');
    ctx.showMessage('작은 몸에 안어울리는 거유가 단골들에게 대인기……지만,');
    ctx.showMessage('누군가가 보고 있으면 쟁반으로 얼굴을 가려버릴 정도로');
    ctx.showMessage('중중의 부끄럼쟁이다');
    ctx.showMessage('속으로는 변신욕망을 가지고 있었는지 당신(=감독)이');
    ctx.showMessage('『돌체・비타』에서 여배우 후보와 면접을 했을때 흥미를 가졌고');
    ctx.showMessage('내향적이고 부끄럼쟁이인 성격을 고칠 수 있다면,');
    ctx.showMessage('그리고 무엇보다『변할 수 있다』면, 하는 마음에 여배우 후보에 입후보했다');
    ctx.showMessage('그러나 아무리『변하기』위해서라도');
    ctx.showMessage('선을 넘는 것은 부끄러운 모양이다');
    ctx.showMessage('');
    ctx.showMessage('연령: 17세　난이도: D　성장도: B　공헌도: C　매각치: C');
  } else if (X === 46) {
    ctx.showMessage('【타카나시 오토하】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「저는 그럴 사람이 못 돼요, 어디까지나 도우미랍니다」');
    ctx.showMessage('');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('키류 조직 관련회사인 예능사무소『러브핵・엔터테인먼트』에서');
    ctx.showMessage('사무원으로 일하고 있는, 자기도 모르게 얼굴을 비비고 싶어지는');
    ctx.showMessage('니삭스에 감싸인 포동포동한 허벅지가 매력적인 여성');
    ctx.showMessage('연령화제에 민감하고, 남친이 있던적이 없던것을 신경쓰고 있는 듯하다');
    ctx.showMessage('백합망상이 취미로 요즘은 카논과 카나데의 커플링이 마음에 든 것 같다');
    ctx.showMessage('나이차이가 많이나는 여동생이 키류 조직의 간부이기에');
    ctx.showMessage('키류조직 관련사업에도 빠삭해 AV여배우가 아니라 어디까지나');
    ctx.showMessage('『러브핵・엔터테인먼트』의 사무원으로 출장을 나왔지만,');
    ctx.showMessage('카논과 여동생의 의견을 따라 필요하다면 당신(=감독)의 촬영에 협력해주기로 했다');
    ctx.showMessage('톱 아이돌에게도 밀리지 않는 가창력을 가졌고');
    ctx.showMessage('과거 무명으로 잊혀진 아이돌『코토리 아소비』를 닮았다');
    ctx.showMessage('');
    ctx.showMessage('연령: 28세　난이도: D　성장도: B　공헌도: B　매각치: C');
  } else if (X === 47) {
    ctx.showMessage('【미즈모리 유키나】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「당신의 부탁이라면 뭐든지 들어줄 것 같아……」');
    ctx.showMessage('');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('XX현에서도 유명한, 취주악 명문인 중고일관 아가씨 학원에 다니는 고○학생');
    ctx.showMessage('집이 동북의 명가로 어릴적부터 엄격한 교육을 받은, 요즘 보기드문 새장속 아가씨로');
    ctx.showMessage('지금까지 여학교만 다닌 탓인지 이성에 면역이 없으며');
    ctx.showMessage('다른 사람을 의심할 줄을 모른다');
    ctx.showMessage('그런 아가씨가 어쩌다 이 업계에 발을 들였냐하면, 학원의 숙박연수에서');
    ctx.showMessage('같은 방을 쓰게된『요즘 아이들』의 음담회화에 강제참가한 결과');
    ctx.showMessage('대화의 내용을 그대로 믿어버려, 간단히 말해');
    ctx.showMessage('『아가씨의 불장난』이 세간의 상식이라고 착각해버린 것이다');
    ctx.showMessage('동작 하나하나에 이성을 유혹하는 섹기가 있으나 본인은 자각이 없고');
    ctx.showMessage('AV여배우로서 높은 소질이 있으며');
    ctx.showMessage('한번 업계에 빠지면 헤어나오지 못할 것 같은 위태로움도 가지고 있다');
    ctx.showMessage('');
    ctx.showMessage('연령: 15세　난이도: E　성장도: C　공헌도: B　매각치: B');
  } else if (X === 51) {
    ctx.showMessage('【구인광고】');
    ctx.showMessage('당신은 키류 조직에 의뢰해, 여배우 후보를 모으기 위한 광고를 해달라고 했다.');
    ctx.showMessage('당신의 투자이니 비용은 걱정하지 말라고 했지만, 그쪽이 더 무서워보이는 건 기분 탓일까.');
    ctx.showMessage('당일까지 어떤 인물이 올지 모르니, 고맙기는 한데……');
    ctx.showMessage('');
  } else if (X === 79) {
    ctx.showMessage('【캬바레녀】');
    ctx.showMessage('키류 조직이 운영하는 클럽에서 일하는 여자아이');
    ctx.showMessage('가정사정으로 빈곤한 생활을 보내고 있으며');
    ctx.showMessage('카논이 빠른 수입원으로 당신에게 소개했다');
    ctx.showMessage('');
    ctx.showMessage('로리계의 귀여운 얼굴로 마음씨도 곱고 기억력도 좋다');
    ctx.showMessage('가게 넘버원이 되기에 충분한 소질을 가지고 있으면서도');
    ctx.showMessage('외모에 화려함이 부족하기에 손해를 보고 있다');
    ctx.showMessage('물장사를 하는데도 세련됐지만,');
    ctx.showMessage('영향받기 쉬운 경향이 있어 한번 주위에 물들면 한번에 떨어져 버리는 타입');
    ctx.showMessage('그녀를 어떻게 키워나갈지는 당신에게 달려있다');
    ctx.showMessage('');
    ctx.showMessage('어째서인지 세계마다 이름이 바뀐다.');
    ctx.showMessage('어쩌면 당신이 아는 이름과 만날지도 모른다……');
    ctx.showMessage('');
  } else if (X === 80) {
    ctx.showMessage(`【니지마 미히로】`);
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「저기 있지, 내가 노래부르게 해줄래?」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage(` 국민적 아이돌 유닛의 센터를 맡고 있는 인기 아이돌로서`);
    ctx.showMessage(` 일단 당신(=감독)과 카나데, 미노리의 소꿉친구였던 소녀`);
    ctx.showMessage(` 부친이 사업에 실패할 적에 키류 조직에게 막대한 빚을 지게 되었으며`);
    ctx.showMessage(` 그 빚의 대가로 키류 조직에게 구속되어 감시 상태에 놓여있었다`);
    ctx.showMessage(` 그녀가 연예활동으로 벌어들인 출연료의 대부분은 키류 조직에게 빚을 갚는 데 충당되고 있었던 것이다`);
    ctx.showMessage(` 만, 당신의『지도』파트너가 된 카논이 미히로와 당신 사이의 관계를 조사하고서,`);
    ctx.showMessage(` 여러 가지 의미로 이용 가치가 있다고 판단, 현재는 카논이 신병을 맡고 있다`);
    ctx.showMessage(` 베개 영업이나 광고대행사의 일방적인 푸쉬 없이, 실력으로 스타덤의 자리에 오른 것이니만큼,`);
    ctx.showMessage(` 꽤 오기는 강하지만 상당히 솔직하다`);
    ctx.showMessage(` 어릴 적부터 계속 마음에 두고 있는 사람이 있으며, 그 마음은 상당히 강한 까닭에`);
    ctx.showMessage(` 그렇게 간단히 남자에게 휘둘릴 일은 없을 것 같다`);
    ctx.showMessage('');
    ctx.showMessage(` 연령: 17세　난이도: E　성장도: A　공헌도: A　매각치: SSS`);
  } else if (X === 81) {
    ctx.showMessage(`【에리스】`);
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「엣찌라는 걸 하면, 더 즐겁게 먹을 수 있는 건가요?」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage(` 레이첼이 이계에서 소환한 음마소녀`);
    ctx.showMessage(` 이계의 음마중에서도 명문 귀족가계 출신으로`);
    ctx.showMessage(` 일반적인 음마가 다른 생물에게서 직접 정액을 빼앗는것과 달리`);
    ctx.showMessage(` 그녀는 메이드가 가져다주는 정액밖에 먹은 적이 없다`);
    ctx.showMessage(` 그렇기에 성기도 애널도 아직 처녀지만, 섹스에 흥미가 없는 것은 아니고`);
    ctx.showMessage(` 오히려 흥미가 왕성하다`);
    ctx.showMessage(`L`);
    ctx.showMessage(` 머리색이나 도덕같은 상식은 다를지언정`);
    ctx.showMessage(` 얼굴이나 성격은 레이첼과 유사한 점이 많다`);
    ctx.showMessage(` 어쩌면 파라디수스 왕가의 친척, 혹은 평행세계의 레이첼인지도 모른다……`);
    ctx.showMessage('');
    ctx.showMessage(`연령: 170세　난이도: E　성장도: A　공헌도: SS　매각치: SS`);
  } else if (X === 82) {
    ctx.showMessage(`【리리스】`);
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「당신은 기분좋아지고 나도 배가 잔뜩v　기브・앤・테이크라는 거지」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage(` 레이첼이 이계에서 소환한 음마소녀`);
    ctx.showMessage(` 이계의 음마중에서도 명문 귀족가계 출신임에도`);
    ctx.showMessage(` 사냥이라 칭하며 스스로 남자의 정기를 빠는데 저항이 없다`);
    ctx.showMessage(` 기분이 좋다면 OK라는, 너무나 음마다운 행동원리를 가졌다`);
    ctx.showMessage(` 일반적인 인간이라면 음마가 자제하지 않으면 한순간에 폐인이 되버리지만,`);
    ctx.showMessage(` 당신은 조금 피로해질 뿐인 특수체질이기에`);
    ctx.showMessage(` 자제할 필요가 없는 상대라며 리리스는 당신이 굉장히 마음에 든것 같다`);
    ctx.showMessage(`L`);
    ctx.showMessage(` 이계 여왕의 반신이라 불리는 존재라고 하며`);
    ctx.showMessage(` 이쪽 세계에서 쓸일은 별로 없으나 격투기도 특기이다`);
    ctx.showMessage('');
    ctx.showMessage(`연령: 140세　난이도: D　성장도: A　공헌도: SS　매각치: SS`);
  } else if (X === 83) {
    ctx.showMessage(`【사쿠라 유이카】`);
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「목소리뿐만 아니라, 몸으로도 연기할 수 있게 되야해……!」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage(` 인기 급상승중인, 유아역에서 노파역까지 해낼 정도로 뛰어난 연기력을 가진 성우`);
    ctx.showMessage(` 애니메이션 잡지나 성우 정보지에 이름이 실려 있더라도 사진 등 개인을 특정할 수 있는 소재가`);
    ctx.showMessage(` 게재되지 않고, 최근 몇 년 동안 두각을 나타내온 것으로 인해 은퇴한 거물의 복면 명의라는 등의`);
    ctx.showMessage(` 억측들이 난무하고 있다`);
    ctx.showMessage(` 그 정체는 복면 명의 같은 것이 아니라 아직 젊은 나이의 신인성우이며`);
    ctx.showMessage(` 한때 키류 조직의 관련 회사가 정기적으로 발표했던 15금 이미지 비디오에 출연했던`);
    ctx.showMessage(` 전・주니어 아이돌`);
    ctx.showMessage(` 잡지 등에 노출이 되지 않는 것은 그러한 과거와`);
    ctx.showMessage(` 외모가 아닌 실력을 평가해주었으면 하는 본인의 의사에 의한 것이다`);
    ctx.showMessage(` 우연히 관련 회사의 자료를 정리하고 있던 카논이 성우로서 히트할 수 있는 그녀의 과거를 알고서`);
    ctx.showMessage(` 있지도 않던 당시의 계약서와 작성된 계약 내용의 불이행을 내세워`);
    ctx.showMessage(` 신병을 억류하는 것에 성공했다`);
    ctx.showMessage(` ……라곤 하지만, 연기력을 향상시키기 위해서라면 무엇이겠든 하겠다는 향상심 덩어리 같은`);
    ctx.showMessage(` 그녀에게 있어 AV에 출연한다는 사실은 흔치 않은 기회인 모양이라,`);
    ctx.showMessage(` 카논과는 어떤 의미에선 기브 앤 테이크의 관계에 있다`);
    ctx.showMessage(` 특정 남성과 교제하는 것은 자신의 목소리가 가진 이미지를 고정화시키고 말 것, 이라는`);
    ctx.showMessage(` 이해할 수 없는 지론이 있어 가드는 꽤 단단할 것이다`);
    ctx.showMessage('');
    ctx.showMessage(` 연령: 22세　난이도: D　성장도: A　공헌도: A　매각치: SS`);
  } else if (X === 84) {
    ctx.showMessage(`【아이리스】`);
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「만발하는 꽃처럼 하룻밤의 달콤한 꿈을 당신에게……」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage(` 이 세계에서 관측된 음마를 자신들의 세계에 맞이하기 위해서`);
    ctx.showMessage(` 세계를 넘어 찾아온 연령불명의 음마누나`);
    ctx.showMessage(` 일단 유부녀지만, 음마에게 다른 생물과 하는 성교는 생식행위가 아니라 식사이기에`);
    ctx.showMessage(` 섹스에 굉장히 관대한 가치관을 가지고 있다`);
    ctx.showMessage(` 에리스와 리리스를 이세계에서 소환해 돈벌이에 쓰고있는`);
    ctx.showMessage(` 당신에게 매우 관심을 가지고 있으며 음마의 진심흡정을 받고도`);
    ctx.showMessage(` 멀쩡한 당신의 특이체질에도 흥미가 있다`);
    ctx.showMessage(`L`);
    ctx.showMessage(` 이세계에 혼자 건널 수 있는 그녀가 평범한 음마가 아닌 것은 명백하다`);
    ctx.showMessage(` 레이첼하고는 소환자와 피소환자 이상의 친화성을 보이고 있어`);
    ctx.showMessage(` 이쿠미는 파라디수스 왕족이 본래 이계의 음마왕족이 아닐까 생각하고 있다`);
    ctx.showMessage('');
    ctx.showMessage(`연령: 258세　난이도: E　성장도: A　공헌도: SS　매각치: SS`);
  } else if (X === 85) {
    ctx.showMessage('【히나미 마유】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「과연……현세의 성풍속도 이렇게 바뀌었습니까. 저라도 도움이 될 수 있다면 좋겠습니다만」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('어려 보이지만 그 실체는 어느날 히나미 신사에 강림한 천사');
    ctx.showMessage('본명은 쓸데없이 길기 때문에 평소에는 편의상【히나미 마유】라고 자칭하며,');
    ctx.showMessage('와타라이 키쿄우와 같은 중학교에 다니고 있다');
    ctx.showMessage('마음씨 착한 성격에, 어쨌든 조금 천연끼가 있는데다 현세의 성풍속에 관심이 있는 것인지,');
    ctx.showMessage('이런 모욕적인「부탁」도 미소지으며 받아들여 줬다');
    ctx.showMessage('설마 천사를 구슬리는 무모한 짓에 도전하는 자는 없으리라 생각한다');
    ctx.showMessage('');
    ctx.showMessage('외견연령: 10대 중반　난이도: F　성장도: SS　공헌도: SS　매각치: SSS');
  } else if (X === 86) {
    ctx.showMessage('【유니스・A・파라디수스】(Eunice Akasha Paradisus)');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「나를 누구하고 생각하는 거지? 세계의 정점에 군림하는 유니스님이시라고」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('레이첼의 이복 동생으로 어릴 때부터 어떤 비밀결사의 그랜드 마스터를 맡고 있는 소녀');
    ctx.showMessage('태어났을 때부터 왕가 사상 최고의 마법 재능을 지니고, 왕가에서 유일하게 만물을 기록한');
    ctx.showMessage('『아카식 레코드』에 액세스하는데 성공한 천재');
    ctx.showMessage('그리고 필요한 지식을 필요한 만큼 흡수한 유니스는 스스로 왕가를 떠나');
    ctx.showMessage('온갖 기이한 경험을 거쳐 지금의 지위를 손에 넣었다');
    ctx.showMessage('원래는 레이첼처럼 마음 따뜻한 성격이었지만, 모든 것을 알고 나서 성격이 비뚤어졌다');
    ctx.showMessage('또한, 에너지 섭취의 효율성을 고려해서인지 스스로를 한없이 음마에 가까운 존재로 변모시켰다');
    ctx.showMessage('');
    ctx.showMessage('어째서인지 당신(=감독)에게는 호의적이고, AV배우라는 일임에도 불구하고 흔쾌히 승낙했다');
    ctx.showMessage('연애에는 세계의 모든 것을 파악하고 있기 때문에 관심조차 없다');
    ctx.showMessage('또한, 시미즈 사쿠라코와 아는 사이지만 캐릭터가 겹친다고 서로 생각하기 때문에 앙숙');
    ctx.showMessage('');
    ctx.showMessage('연령: 13세　난이도: D　성장도: SS　공헌도: SS　매각치: SSS');
  } else if (X === 87) {
    ctx.showMessage('【키리시마 쇼코】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「비열한 자는 용서 못해요……!」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('교회계열 시설 출신으로 국립대학에 다는 대학생');
    ctx.showMessage('시설은 돈이 없지만, 장학금으로 학비를 내고 있다');
    ctx.showMessage('보이쉬한 미모에 움직이기 쉽다는 이유로 남자옷을 입을때가 많다');
    ctx.showMessage('고등학교땐 가라테를 했으며 문무양도를 실천하고 있는 사람이지만, 요리를 비롯해 가사능력은 절망적이다');
    ctx.showMessage('시설에서 돌봐주는 아오이 하루카를 언니처럼 따르기 때문인지, 연애엔 소극적이다');
    ctx.showMessage('');
    ctx.showMessage(`연령: 19세　난이도: C　성장도: C　공헌도: C　매각치: C`);
  } else if (X === 88) {
    ctx.showMessage('【아마쿠사 에리】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「AV촬영…… 인가요. 저를 묶는 사슬이 더 늘어나는 거네요」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('고등학교에 다니며 모델을 하고있는 쿼터 소녀');
    ctx.showMessage('보라빛 머리를 하나로 묶고, 눈에 띄는 장신과 미모의 소유자');
    ctx.showMessage('부모를 사고로 잃고 교회계열 시설에 살고 있다');
    ctx.showMessage('그 전까지 받았던 교육덕분인지 말투와 태도에 기품이 묻어난다');
    ctx.showMessage('시설 경영이 어렵다는 것을 알고있고, 독립하고 싶은 마음은 강하나 대학은 다니고 싶기에');
    ctx.showMessage('장학금을 받기 위해 공부에 힘을 쏟고 있다');
    ctx.showMessage('같은 시설에 사는 선배인 키리시마 쇼코를 존경하고 따르고 있다');
    ctx.showMessage('그 나이대 소녀처럼 연애에 관심이 많지만, 모델의 자존심 때문인지');
    ctx.showMessage('자신에게 어울리는 사람을 찾고 있다');
    ctx.showMessage('');
    ctx.showMessage(`연령: 17세　난이도: C　성장도: C　공헌도: C　매각치: A`);
  } else if (X === 89) {
    ctx.showMessage('【니시카타 쿄코】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「뒷세계 AV업계에서 움직이는 막대한 돈……『녀석들』이 암약한다는 증거야!」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('출판사에서 일하는 르포라이터');
    ctx.showMessage('가는 몸과 안경에 얌전해보이는 풍모와 달리 정의감과 행동력의 덩어리 같은 사람');
    ctx.showMessage('아오이 하루카의 대학 선배이자 친구이기도 하다');
    ctx.showMessage('친구의 상태가 이상하단 걸 눈치채고 조사에 나선 결과');
    ctx.showMessage('키류 조직이 연관돼있는 것까지 알아냈다');
    ctx.showMessage('');
    ctx.showMessage('그리고 이 세계가『누군가』가 조종하고 있는게 아닐까,');
    ctx.showMessage('하는 음모론을 믿고 있다');
    ctx.showMessage('전엔 사귀던 남자가 있었지만 지금은 혼자로, 일을 이해해주는 남자가 이상형이라 한다');
    ctx.showMessage('');
    ctx.showMessage(`연령: 24세　난이도: D　성장도: B　공헌도: B　매각치: D`);
  } else if (X === 90) {
    ctx.showMessage('【카세 후미카】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「괴, 괴롭히지 마세요……」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('토모요시가에서 일하는 메이드');
    ctx.showMessage('토모요시가의 사용인은 대부분 특정 분야의 전문가로');
    ctx.showMessage('그중에서 특출난 점이 하나도 없는 자신의 존재를 의문시해왔다');
    ctx.showMessage('사실 그녀는 아야노가 성희롱을 하기 위해 채용한, 말하자면 성노예후보다');
    ctx.showMessage('물론 그녀는 그런줄은 꿈에도 모르고 일을 실수하고는 낙심하는 매일을 보내고 있다');
    ctx.showMessage('당신(=감독)의 실력을 인정한 아야노가 그녀를 당신에게 맡기려 한다는 것 같다');
    ctx.showMessage('소심한 성격이지만, 연애관은 보수적이고 가드가 단단해보인다');
    ctx.showMessage('');
    ctx.showMessage('괴롭혀주고 싶은 분위기를 지니고 있어 새드끼가 있는 사람이라면');
    ctx.showMessage('자기도 모르게 성희롱하고 싶어지는 선천적 마조체질이다');
    ctx.showMessage('참고로 그녀의 방에는 왠지 모르게 대량의 하니와가 장식돼있고');
    ctx.showMessage('본인은 「멋대로 모이고 있어요……」라고 한다');
    ctx.showMessage('');
    ctx.showMessage(`연령: 19세　난이도: D　성장도: B　공헌도: B　매각치: B`);
  } else if (X === 91) {
    ctx.showMessage('【미야마 카나】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「동ー졍ー인 오라비가 AV감독 같은 거 할 수 있겠엉?　내가 동ー졍ー버리게 해주까?」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('어느 날 갑자기 나타난『미야마 카나』라고 자칭하는,');
    ctx.showMessage('성격만 빼곤 미야마 카나데와 꼭 닮은 흑갸루 소녀');
    ctx.showMessage('어느샌가 당신(=감독)이 사는 집에 그녀의 방이 있게 되고, 주변 사람들도 처음부터 그녀가');
    ctx.showMessage('당신의 또다른 여동생이었던 양 취급하고 있다');
    ctx.showMessage('성격이 정반대이지만 카나데와는 진짜 쌍둥이인 것처럼 사이가 좋고, 좋고 나쁜 점도 영향받기');
    ctx.showMessage('쉬운 성격인 카나데가 그녀처럼 되지 않을까 하는 것이 당신의 요즘 걱정거리다');
    ctx.showMessage('그러나 그 요즘 고○학생 같은 성격인데도 성적은 우수, 전국고사에서도 미리 짜둔 것처럼');
    ctx.showMessage('전국에서도 성적 상위인 카나데와 거의 같은 점수를 얻고 있다');
    ctx.showMessage('카나데 말로는『분명 누구씨한테 인정받고 싶은거야』라고 하는데……');
    ctx.showMessage('반면, 이따금씩 밤놀이를 하다 보호받는다거나 해서 교사들로부터의 취급은 별로 좋지 않다');
    ctx.showMessage('당신과 카나데의『또 하나의 관계』를 알게 되자『그럼 나도 할래』하고 가벼운 느낌으로');
    ctx.showMessage('AV 여배우로 데뷔할 것을 지원했다');
    ctx.showMessage('이것에 관해서도 카나데의 말로는');
    ctx.showMessage('『분명 누군가씨의 도움이 되고 싶어한다고 생각해』라고 하지만……');
    ctx.showMessage('쉽게 반하고 영향도 잘 받는 성격이지만, 일단 진심인 상대는 있다고 한다');
    ctx.showMessage('하지만 즐거운 일에 탐욕스런 그녀이므로 그것이 변할 수도 있을 것이다');
    ctx.showMessage('');
    ctx.showMessage('연령: 15세　난이도: E　성장도: C　공헌도: B　매각치: B');
  } else if (X === 92) {
    ctx.showMessage('【안드로이드】');
    ctx.showMessage('');
    ctx.showMessage('미이의 운용데이터를 토대로 이쿠미가 만들어낸 안드로이드');
    ctx.showMessage('성별은 물론 성격까지 당신의 희망이 반영되어');
    ctx.showMessage('태어났을때부터 당신에게 절대적인 충성을 맹세한다');
    ctx.showMessage('생체파츠와 정신구조 일부에 카나데의 반친구인 미사키 에리카를');
    ctx.showMessage('샘플로 사용했기에 에리카에겐【여동생】혹은【남동생】이라고도 할 수 있다');
    ctx.showMessage('그리하여 선천적으로 그녀와 상성이 매우 좋다');
    ctx.showMessage('');
    ctx.showMessage('공방에서 나올때는 맨몸이므로 정신교육을 위해서도');
    ctx.showMessage('빨리 스타일리스트에서 머리모양과 옷을 설정해주세요');
    ctx.showMessage('');
  } else if (X === 93) {
    ctx.showMessage('【리 메이링】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「니하오. 저기…… 나랑 사이좋게 지내주면 좋겠어」');
    // TODO: SETFONT "MS ゴシック"
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('상하이 뒷세계를 장악한『구미회』수장');
    ctx.showMessage('뒷세계에 거대한 영향력을 가진 카논, 레이첼, 이쿠미를 농락한 당신을 주목해');
    ctx.showMessage('직접 당신이 다니는 학교에 유학생으로 전학왔다');
    ctx.showMessage('겉보기엔 그저 기가 약하고 얌전한 여자아이로 보이지만,');
    ctx.showMessage('필요할때면 강한 카리스마와 교섭력을 발휘하는,『능력있는 매는 발톱을 감추는』타입');
    ctx.showMessage('');
    ctx.showMessage('여우귀와 아홉개의 꼬리를 가졌으며, 절세의 미인으로 변해 과거 많은 고대왕조를 멸망시킨');
    ctx.showMessage('전설의 구미호의 환생이라는 말도 있다. 그 신비성과 카리스마에 심취한 부하도 많다');
    ctx.showMessage('');
    ctx.showMessage('참고로 본인 말로는');
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「이 꼬리, 푹신푹신해서 방석 대신으로 딱이야」');
    // TODO: SETFONT "MS ゴシック"
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('연령: 16세　난이도: D　성장도: E　공헌도: S　매각치: S');
  } else if (X === 94) {
    ctx.showMessage('【하세카와 미코토】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「다녀왔어…… 당신을 잊었던 날은, 단 하루도 없었어」');
    // TODO: SETFONT "MS ゴシック"
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('카나데, 미노리, 미히로와 같이 어린 시절을 같이 지낸, 당신의 또다른 소꿉친구');
    ctx.showMessage('명석한 두뇌와 가련한 외모를 가진 미소녀지만,');
    ctx.showMessage('어느 날 현대의학으로는 고칠 수 없는 불치병에 걸려 해외 연구기관에서 치료받게 된다');
    ctx.showMessage('그 기관에서 어떤 실험의 피험체가 됐다고 들었으나, 상세는 불명');
    ctx.showMessage('이제 병이 완치됐는지, 다시 당신 앞에 모습을 나타냈다');
    ctx.showMessage('그리고 소꿉친구들이 빚을 갚기 위해 AV업계에 발을 들이밀었다는 것도 알고');
    ctx.showMessage('자신도 당신을 돕기 위해 여배우 후보에 자진등록했다');
    ctx.showMessage('');
    ctx.showMessage('지능은 괸장히 높으나 살짝 멍한 부분이 있어');
    ctx.showMessage('다른 사람이 하는 말을 그대로 믿어버리는 경향이 있다');
    ctx.showMessage('카나데와 미히로도 너무 순수한 성격에 다른 사람에게 속기 쉬운 탓에');
    ctx.showMessage('그녀들이 돌아온 뒤로 미노리의 마음고생이 끊이지 않는다고 한다');
    ctx.showMessage('');
    ctx.showMessage('연령: 16세　난이도: E　성장도: S　공헌도: S　매각치: S');
  } else if (X === 95) {
    ctx.showMessage('【키류 엘렌】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「우후후…… 나는 젊은 애들처럼 쉽진 않을거야」');
    // TODO: SETFONT "MS ゴシック"
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('키류 조직의 현 수장・키류 마사타카의 아내이자 카논의 친엄마');
    ctx.showMessage('뛰어난 조교능력으로 뒷세계의 유력자들을 차례차례 농락하는 당신과 카논의 세력이');
    ctx.showMessage('조직에서도 더이상 과시할 수 없을 만큼 커졌기에, 수장파에서 보낸 자객으로서 찾아왔다');
    ctx.showMessage('그러나 그녀 자신도 조직의 앞날을 걱정하는 간부로서');
    ctx.showMessage('직접 당신의 역량을 확인하기 위해 여배우 후보를 자청했다');
    ctx.showMessage('');
    ctx.showMessage('사십이 가까운데도 경이적인 젊음을 자랑하며 어디를 봐도 15살 정도인 미소녀로밖에 보이질 않는다');
    ctx.showMessage('딸인 카논이 여자치고는 조금 큰 체구인 탓에, 같이 있으면 엘렌쪽이 여동생으로 보인다');
    ctx.showMessage('본인도 신이 나서 딸의 친구들 앞에서는');
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「안녕하세요, 카논 언니의 여동생인 엘렌이에요♪」');
    // TODO: SETFONT "MS ゴシック"
    ctx.resetColor();
    ctx.showMessage('라며 놀리는 탓에, 카논의 상처를 깊어질 뿐이다');
    ctx.showMessage('참고로 이 거짓말이 들킨 적은 한번도 없다고 한다');
    ctx.showMessage('가련한 외모와 달리 지능이 상당히 높아 십수개국어를 쓰는 다국어자이며');
    ctx.showMessage('수많은 나라의 요인들과 연줄을 가지고 있다');
    ctx.showMessage('그중엔 파라디수스 왕가에 속한자도 포함돼있어');
    ctx.showMessage('본래 알길이 없는 지식도 조금은 가지고 있는 것 같다');
    ctx.showMessage('남편인 키류 마사타카와는 연애결혼이다');
    ctx.showMessage('');
    ctx.showMessage('연령: 38세　난이도: E　성장도: B　공헌도: SS　매각치: S');
  } else if (X === 96) {
    ctx.showMessage('【리나・레스피치오】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「명령만 내려주세요. 공주님을 위해서라면 어떤 명령이든 수행하겠습니다」');
    // TODO: SETFONT "MS ゴシック"
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('해외 유학중인 레이첼의 보디가드와 밀정을 겸하는 유능한 여성');
    ctx.showMessage('대대로 파라디수스 왕가를 섬기는 밀정을 배출한 명문귀족가계에 태어나');
    ctx.showMessage('레이첼이 어릴적부터 옆에서 모셨기에 부하중에서도 특히 충성심이 높다');
    ctx.showMessage('유학중인 레이첼의 의향을 항상 우선시하라는 명령을 받았기에');
    ctx.showMessage('그녀가 포르노에 출연하고 싶다고 했을때, 걱정하면서도 말리지 않았다');
    ctx.showMessage('그 결과 당신의 우수성을 깨닫고 파라디수스 왕가의 선견성에 경의를 표함과 동시에');
    ctx.showMessage('자신도 당신에게 몸을 바치리라 생각했다');
    ctx.showMessage('지금까지 일과 함께하며 살아왔기에, 자신이 타인에게 매력적으로 비친다는 자각은 있으면서도');
    ctx.showMessage('자기평가가 의외로 낮기도 하다');
    ctx.showMessage('');
    ctx.showMessage('밀정으로서 굉장히 우수하며 자신의 부하들을 이용해');
    ctx.showMessage('여배우 후보들의 신변조사를 완벽하게 파악 가능하다');
    ctx.showMessage('그녀가 협력해준다면, 당신이 모르는 사이에 여배우 후보가');
    ctx.showMessage('다른 남자에게 넘어가는 일은 없겠지');
    ctx.showMessage('');
    ctx.showMessage('연령: 24세　난이도: E　성장도: B　공헌도: SS　매각치: S');
  } else if (X === 97) {
    ctx.showMessage('【쿠로이 미야코】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「아앙, 카논 언니를 향한 사랑이 오장육부를 돌며 터질 것 같아요오오오!!」');
    // TODO: SETFONT "MS ゴシック"
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('당신과 카논과 같은 학교에 다니는 변…… 꿈꾸는 아가씨');
    ctx.showMessage('카논을 맹렬히 숭배하며 스토커로 보일 정도로 쫓아다니고 있다');
    ctx.showMessage('그로인한 과도한 애정표정은 기행이 되어');
    ctx.showMessage('그녀가 좋은 집안의 아가씨이며 미소녀임에도 불구하고 주위에선');
    ctx.showMessage('「또 저 변태가 날뛰고 있네」「누가 좀 말려봐」「키류씨 아니면 아무도 못말려」');
    ctx.showMessage('라고 할 정도이다');
    ctx.showMessage('');
    ctx.showMessage('카논을 너무나 숭배하는 나머지「그녀가 아이돌로 데뷔하지 않다니 말도 안돼!」라며');
    ctx.showMessage('자신의 지갑을 털어 카논을 아이돌로 데뷔시키려 했다');
    ctx.showMessage('그 뒤, 카논에게 들켜(성적인)벌을 받고');
    ctx.showMessage('사죄의 뜻으로 AV에 데뷔하게 되지만,');
    ctx.showMessage('본인은 카논과 비밀을 공유하게 됐다는 생각에 내심 들뜬 것 같다');
    ctx.showMessage('');
    ctx.showMessage('《참고로 서두의 한마디는 샤워실에서 카논의 사물함에서 속옷을 뒤지다 들켜');
    ctx.showMessage('스턴건으로 제압당할때 받았습니다》');
    ctx.showMessage('');
    ctx.showMessage('연령: 16세　난이도: D　성장도: B　공헌도: B　매각치: D');
  } else if (X === 98) {
    ctx.showMessage('【아카기 유우히】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「히카루는 정말로 귀엽다니까아. 우후후후후……」');
    // TODO: SETFONT "MS ゴシック"
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('패션 모델계 최고 인기모델로, 아카기 히카루의 언니');
    ctx.showMessage('존재감 없는 여동생과는 대조적으로, 강렬할 정도의 존재감을 발하고 있다');
    ctx.showMessage('단순히 모델로서 우수할 뿐만 아니라 최근에는 후배 모델의');
    ctx.showMessage('프로듀스업에도 손을 대고 있으며, 언젠가는 자신의 사무소를 시작하는 날도 머지');
    ctx.showMessage('않은 게 아닐까 하는 소문이 있다');
    ctx.showMessage('그러한 그녀의 비밀은, 이상할 정도의 여동생에 대한 집착');
    ctx.showMessage('여동생 관련 상품을 모으는 것은 물론, 여동생의 속옷을 훔쳐 머리에 쓰기도 한다');
    ctx.showMessage('여동생에게 직접 손을 대지 못하는 스트레스를 해소하기 위해, 히카루와 동년배인 주니어 모델들을');
    ctx.showMessage('닥치는대로 먹어치워 언니라고 불리고 있지만, 전혀 충족되지 않는 것 같다');
    ctx.showMessage('');
    ctx.showMessage('연령: 19세　난이도: C　성장도: E　공헌도: S　매각치: A');
  } else if (X === 99) {
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
  } else if (X === 100) {
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
  } else if (X === 101) {
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
  } else if (X === 102) {
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
  } else if (X === 103) {
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
  } else if (X === 104) {
    ctx.showMessage('【엘파리아・로코코・라그라데】(Elfara Rokoko Rangurade)');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「저에게 엣찌한 일을 가르쳐 주세요」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('예전 당신이 지도했던 크리스티나가 낳은 딸');
    ctx.showMessage('본래 성마술의 부작용으로 임신할리 없는 그녀가 임신한 결과');
    ctx.showMessage('모친이 가진 지식을 어느정도 가지고 태어났다');
    ctx.showMessage('태어난지 며칠만에 현재 모습으로 자라난 탓에');
    ctx.showMessage('여러가지 것에 경험이 없이 지식만을 가지고 있다');
    ctx.showMessage('그 중에는 마력으로 움직이는 마법생물의 지식도 있어 잘만 사용하면 도움이 될지도 모른다');
    ctx.showMessage('그녀는 라그라데에겐 존재하지 않는 사람으로 돼있기에');
    ctx.showMessage('여배우로 쓰는 것엔 문제 없을 것이다');
    ctx.showMessage('');
    ctx.showMessage('당신(=감독)에게 온 이유는, 이곳올 수 없는 엄마를 대신해');
    ctx.showMessage('엄마가 받은 은혜를 갚기 위해');
    ctx.showMessage('또, 아빠를 찾는다는 목적도 있으며');
    ctx.showMessage('친부가 지도에 참가한다면 큰 효과가 나올지도 모른다');
    ctx.showMessage('……여담이지만, 그녀가 나라를 떠난 뒤');
    ctx.showMessage('라그라데에선 그녀의 모친을 빼닮은 정체불명의 창부가 매일 밤 나타난다고 한다');
    ctx.showMessage('');
    ctx.showMessage('외견연령: 10대 후반　난이도: D　성장도: B　공헌도: A　매각치: S');
  } else if (X === 104) {
    ctx.showMessage('【미나・크레인】(mina kerin)');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「당신은, 왜 싸우는 거죠?」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('라구라 불리는 나라의 내란을 수습했다고 전해지는 평화의 가희');
    ctx.showMessage('그러나 실상은 라구에 내란을 일으키고 그것을 수습하며 라구를 장악했다');
    ctx.showMessage('그녀의 양친은 과거 파라디수스 왕국 장악을 시도했다 도망쳤으며,');
    ctx.showMessage('라구를 장악해 파라디수스 왕가에 복수하기 위해 그녀를 개조해 세뇌능력을 부여했다');
    ctx.showMessage('그러나 무슨 속셈인지 그녀는 양친을 암살하고');
    ctx.showMessage('라구 내란을 일으켜 라구를 황폐하게 만들어버린다');
    ctx.showMessage('다음 목적으로 당신(=감독)이 사는 나라를 선택해 내란을 일으킬 불씨로');
    ctx.showMessage('키류 조직과 키류 카온을 점찍었지만,');
    ctx.showMessage('신경쓸 필요 없다며 방치했던 쿠로이 미야코와 당신(=감독)에 의해 저지당하고,');
    ctx.showMessage('분노가 치밀은 쿠로이 미야코에 의해 스스로 쌓아올린 조직을 빼앗기고');
    ctx.showMessage('그녀도 키류 카논 세뇌용으로 개발한 기억조작장치에 의해');
    ctx.showMessage('쿠로이 미야코에게 절대복종하게 되었다');
    ctx.showMessage('한편, 쿠로이 미야코 본인은');
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「언니에게 피해가 가는 일만 아니라면 마음대로 해도 좋아요」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('라며 그녀에게 딱히 무언가를 시킬 생각은 없는 것 같다');
    ctx.showMessage('');
    ctx.showMessage('연령: 19세　난이도: D　성장도: C　공헌도: B　매각치: B');
  } else if (X === 106) {
    ctx.showMessage('【마키하라 사치】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「제쪽이 더 귀엽죠!');
    ctx.showMessage('……아 맞다, 숙제가 있어서 이만 돌아…후, 후흥!」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('키류 조직 삼대 수장인 키류 마사타카와 일반인 사이에서 태어난, 키류 카논의 이복동생');
    ctx.showMessage('자주 만나지 못하는 아빠를 사랑하고 있으며, 자신이『첩의 딸』이라고 어렴풋이 깨닫고 있으면서도');
    ctx.showMessage('그런 환경을 납득하고 받아들였다');
    ctx.showMessage('그러나 어느 날, 그녀가 사는 고급맨션에 찾아온');
    ctx.showMessage('키류 마사타카의 상태가 이상하다고 알아채고');
    ctx.showMessage('무슨 일이 있었는지 캐묻은 결과, 카논이 쿠데타를 일으킨 사실을 알았다');
    ctx.showMessage('');
    ctx.showMessage('그 이후로 얼굴도 모르는 정실과 딸이자 아버지가 폐인이 된 원인인 카논과 엘렌,');
    ctx.showMessage('그리고 당신(=감독)을 증오하고 있었지……만,');
    ctx.showMessage('당신에게 한눈에 반했는지 미워하는지 아닌지 미묘한 태도이다');
    ctx.showMessage('키류 마사타카에게 편애받으며 금이야 옥이야 자란 탓인지 자존심이 높고 건방지…');
    ctx.showMessage('…긴 해도 의외로 맷집이 약해 조금만 몰아붙여도 금방 눈물이 고인다');
    ctx.showMessage('그런 그녀가 증오의 대상일『지금의』키류 조직의 핵심이라 할 수 있는 당신의 사무소에 찾아온 건');
    ctx.showMessage('당신을 농락해서 키류 조직을 다시 빼앗겠다는 속셈이었겠지만……');
    ctx.showMessage('');
    ctx.showMessage('카논과 엘렌을 보자마자 번개처럼 도망가 버렸다');
    ctx.showMessage('');
    ctx.showMessage('이거 참, 이렇게 허당이어서야 미워할 마음도 안드네……(키류 카논)');
    ctx.showMessage('역시 그이, 로리콘인가?(키류 엘렌)');
    ctx.showMessage('');
    ctx.showMessage('외견연령: 14세　난이도: A　성장도: C　공헌도: A　매각치: S');
  } else if (X === 107) {
    ctx.showMessage('【아카사카 히메노】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「기세만 있다면 뭐든 할 수 있어요!');
    ctx.showMessage('감독님, 오늘도 잘 부탁드립니다!」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('평소엔 당신(=감독)과 다른 학교의 럭비부 매니저로 활동하지만,');
    ctx.showMessage('규격외라 평가받는 미노리에게 필적할 신체능력을 가졌기에');
    ctx.showMessage('다른 동아리에 지원군으로 참가해 미노리와 격전을 펼치는 열혈 스포츠소녀');
    ctx.showMessage('그러나 체육계 여자임에도『여자다움』을 버리진 않은듯');
    ctx.showMessage('그 나잇대 소녀같은 일면도 가지고 있다');
    ctx.showMessage('미노리와는 서로를 존경하는『호적수』이며');
    ctx.showMessage('동경과 비슷한 감정을 가지고 있다');
    ctx.showMessage('성행위는 부끄럽게 생각하나 미노리와 마찬가지로 성욕이 왕성하고');
    ctx.showMessage('잡지에서 자위를 배운 뒤로 수치심을 넘어설 정도로 폭발하는');
    ctx.showMessage('성충동을 발산하기 위해 매일밤 자위행위를 하고 있다');
    ctx.showMessage('그러던 어느 날, 우연히 미노리가 출연한 AV를 친구네 집에서 발견한 그녀는');
    ctx.showMessage('화장등을 이용해 미노리인줄 모르도록 처리했음에도 불구하고');
    ctx.showMessage('여배우의 정체를 깨달아 버렸다');
    ctx.showMessage('억누를 수 없는 성충동과 미노리를 향한 경쟁심으로');
    ctx.showMessage('그녀는 미노리가 소속된 당신의 사무소를 알아내, 자기도 AV여배우가 될것을 희망했다');
    ctx.showMessage('');
    ctx.showMessage('외견연령: 16세　난이도: D　성장도: A　공헌도: A　매각치: A');
  } else if (X === 108) {
    ctx.showMessage('【사쿠라노 타마키】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「꺄ー!?」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('XX시 재개발구역에서 키류 카논이 조우한 소녀의 유령');
    ctx.showMessage('누군가를 찾고 있는듯하며, 그 강한 마음으로 실체화도 가능하기에');
    ctx.showMessage('평소엔 사람과 다를바 없는 생활을 보내고 있다');
    ctx.showMessage('키류 조직이 조사한 결과 재개발구역에서 예전에 모텔에 대화재가 난적이 있어');
    ctx.showMessage('사망자중에 그녀와 같은 이름인 사람이 있지만, 같은 사람인지는 알 수 없다고 한다');
    ctx.showMessage('성적인 화제에 약하고 살짝 놀리기만해도 얼굴이 새빨개져서 쏜살같이 도망치는 버릇이 있다');
    ctx.showMessage('');
    ctx.showMessage('오컬트에 자세한 레이첼에 의하면 그녀는 유령이 아니라 정령에 가까운 존재라고 하며');
    ctx.showMessage('그녀를 어떻게『다룰지』에 따라 체질이 변해간다고 한다');
    ctx.showMessage('');
    ctx.showMessage('외견연령: 18세　난이도: D　성장도: B　공헌도: C　매각치: A');
  } else if (X === 109) {
    ctx.showMessage('【마르티나・E・파라디수스】(Martina Empress Paradisus)');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「후후, 귀여운 조카의 부탁이니 거절 못하겠네♪」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('레이첼 자매의 모친의 동생으로, 레이첼의 이모이다');
    ctx.showMessage('일부러 젊게 꾸미지는 않지만, 겉보기로는 20대로밖에 보이지 않는다');
    ctx.showMessage('파라디수스가의 여자는 선천적으로 높은 마력소질을 가지지만,');
    ctx.showMessage('마술을 사용하는 의의를 느끼지 못한 그녀는, 몸에 마력을 부여하는 회로를 붙이길 거부하고');
    ctx.showMessage('젊어서부터 사교계에 데뷔해 파라디수스의 외교를 담당하고 있었지만,');
    ctx.showMessage('어느 사건에 의해 마력이 깃들고 일시적으로 파라디수스의 여왕직을 맡고 있었다');
    ctx.showMessage('');
    ctx.showMessage('현재는 파라디수스에서 추방당하여');
    ctx.showMessage('표면적으론 한 나라에서 모델겸 뷰티살롱의 경영자로 일하지만,');
    ctx.showMessage('파라디수스를 포함한 전세계에서 일급 암살자로서 경계당하고 있다');
    ctx.showMessage('본인은 파라디수스의 상층부나 왕족, 지금 소속한 비밀결사 녀석들과 비교하면');
    ctx.showMessage('자신은 비교적 상식인이라 자부하지만, 사실 중증의 쇼타콘이며');
    ctx.showMessage('일본에 놀러왔을때 우연히 발견한 사카키 아유무와 카부라기 시온에게 푹 빠져있다');
    ctx.showMessage('');
    ctx.showMessage('또한 일본에 딸이 있다고 하지만, 상세는 불명이다');
    ctx.showMessage('또한 그녀의 미들네임은 파라디수스 왕국의 세기둥인『혈족』을 나타내는 것이 아니라');
    ctx.showMessage('그녀가『혈족』에서 추방당했기에 편의상 붙인 것이다');
    ctx.showMessage('');
    ctx.showMessage('연령: 30세　난이도: C　성장도: S　공헌도: SS　매각치: SS');
  } else if (X === 150) {
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
  } else if (X === 151) {
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
  } else if (X === 152) {
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
    ctx.showMessage('그리고 다른 사람에겐 말 못할 위험한 취미가 있다고 한다');
    ctx.showMessage('');
    ctx.showMessage('연령: 19세　난이도: D　성장도: B　공헌도: B　매각치: A');
  } else if (X === 200) {
    ctx.showMessage('【아이샤・알하즈랏드】(Ayesha Alhazred)');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「저, 저기, 부끄러워서, AV촬영은, 못하겠어요……」');
    // TODO: SETFONT "MS ゴシック"
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('중동의 한 왕국의, 지금은 몰락한 무역상의 딸로 키류 조직');
    ctx.showMessage('키류 조직 관련회사가 채무 대신『받아낸』비취색 눈동자가 인상적인 소녀');
    ctx.showMessage('지금은 키류 조직이 운영하는 펍에서 벨리댄서로 일하지만,');
    ctx.showMessage('부끄러운 나머지 무대 위에서 굳어버린다고 한다');
    ctx.showMessage('항상 주뼛주뼛거리고 얌전하기에 다른 사람들과 거리를 좁히지 못하고 있는 모양이다');
    ctx.showMessage('또한 토착종교를 믿는 탓인지 일선을 넘기 싫어하기에');
    ctx.showMessage('창관으로 돌릴수도 없어서 관계자도 곤란해하고 있다');
    ctx.showMessage('');
    ctx.showMessage('연령: 14세　난이도: C　성장도: B　공헌도: B　매각치: C');
  } else if (X === 201) {
    ctx.showMessage('【아스카】(Asuka Eterna)');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「AV촬영? 그게 의식인건가!?」');
    // TODO: SETFONT "MS ゴシック"
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('자신을 이세계에서 찾아온 공주 용사라고 자칭하는, 신기한 아이');
    ctx.showMessage('당신이 AV감독이 되기 전에 하던 국민적RPG의 주인공을 닮았다');
    ctx.showMessage('운동신경은 매우 높으나 머리속은 완성도가 떨어진다');
    ctx.showMessage('당신이 운명의 상대라고 주장하며 아이를 만들어 달라며 다가온다');
    ctx.showMessage('백주 대낮에 키류 조직 사무소에 들어와 카논의 방의 선반을 뒤지다 포박당하고');
    ctx.showMessage('그녀의 발언을 재밌게 여긴 카논의 발상으로');
    ctx.showMessage('당신의 테스트를 겸해 미션이라는 명목으로 보내져왔다');
    ctx.showMessage('또한 키류 조직 사무소에 감금하는 것보다');
    ctx.showMessage('카논 스스로가 감시하는 것이 안전하다는 이유로 같은 학교에도 다니게 하고 있다');
    ctx.showMessage('다만 때때로 황당한 문제(?)를 일으키며 카논의 두통의 원인중 하나가 되고 있다……');
    ctx.showMessage('');
    ctx.showMessage('사실은 이세계인이 아니라 자신이 게임 속 주인공이라고 믿고 있는 여자아이');
    ctx.showMessage('해외 왕족의 피가 흐르기에 고귀한 분위기가 있지만,');
    ctx.showMessage('자신을 완전히 용사라 믿고 있기에 과거의 일을 기억하지 못하고 있다');
    ctx.showMessage('새장속 새처럼 자란 아이에게 게임을 시키면 이상한 일이 생길 수 있다, 조심하도록!');
    ctx.showMessage('');
    ctx.showMessage('연령: 18세?　난이도: E　성장도: C　공헌도: C　매각치: C');
  } else if (X === 202) {
    ctx.showMessage('【오노하라 안즈】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「데뷔하기 위해서라면 AV든 뭐든 할게요!!!」');
    // TODO: SETFONT "MS ゴシック"
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('사립 여학교에 다니는 고○학생이자');
    ctx.showMessage('교사인 오노하라 쿄스케와 결혼한 행복이 넘치는 새색시');
    ctx.showMessage('옛날부터 기타를 배워, 지금도 경음부에서 기타를 담당하고 있다');
    ctx.showMessage('그녀가 속한 밴드가 데모테이프를 보낸 곳이 키류 조직의 관련회사였기에');
    ctx.showMessage('여○생이자 기혼자라는 희귀한 프로필이 솔직하게 적힌 서류를 우연히 본 엘렌이');
    ctx.showMessage('그녀의 개인면접에서 직접 물어본');
    ctx.showMessage('『데뷔를 하고 싶으면…… 그러게, 카메라 앞에서도 벗을 수 있는 담력은 있어?』');
    ctx.showMessage('라는 말에 질 수 없다는 생각인지『해보겠어요!』라고 대답했기에');
    ctx.showMessage('이 미션이 시작되었다');
    ctx.showMessage('가창력도 외모도 평범하지만, 어째서인지 남성팬이 많다');
    ctx.showMessage('');
    ctx.showMessage('연령: 16세　난이도: A　성장도: C　공헌도: C　매각치: B');
  } else if (X === 203) {
    ctx.showMessage('【타카시나 미야】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「내가 히로인을 연기해내면, 오빠가 기뻐해줄까?」');
    // TODO: SETFONT "MS ゴシック"
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('최근에 당신(=감독)이 다니는 사립 XX학원에 전학온 소녀');
    ctx.showMessage('지역 전승을 각색한 연극무대를 계획하던 연극부가 히로인의 이미지에 딱이라며');
    ctx.showMessage('부원도 아닌 그녀를 히로인역에 발탁됐다');
    ctx.showMessage('정작 본인은 무뚝뚝하고 부끄럼쟁이라 무대에 올라가면 굳어버린다고 한다……');
    ctx.showMessage('다른 사람들의 눈이 너무 신경쓰인다고 하며');
    ctx.showMessage('조금이라도 익숙해지고 싶다며 상대역에게 약한 소리를 했다고 한다');
    ctx.showMessage('거기다 연극 속 히로인은 헌신적인 여동생이라는 설정이지만,');
    ctx.showMessage('때때로 소악마스러움이 묻어나는 역할이라 그녀와는 정반대의 성격이었다');
    ctx.showMessage('이번 일은 정식 의뢰인이 존재하지 않고');
    ctx.showMessage('카논의 독단으로 당신에게 미션 형식으로 맡겨지게 됐다');
    ctx.showMessage('미야 본인은 권유해준 부원에게 특별한 감정을 가지고 있는듯,');
    ctx.showMessage('카논이 내건 조건도『《오빠》를 위해서라면』받아들인 모양이다');
    ctx.showMessage('');
    ctx.showMessage('참고로 카나데가 AV여배우 후보라는 걸 알고서는');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「렛츠 배덕♪」');
    // TODO: SETFONT "MS ゴシック"
    ctx.resetColor();
    ctx.showMessage('이라는, 의외로 적극적인 일면이 있다');
    ctx.showMessage('');
    ctx.showMessage('연령: 15세　난이도: A　성장도: A　공헌도: A　매각치: B');
  } else if (X === 204) {
    ctx.showMessage('【이즈미 토코】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「아하하…… 어쩔 수 없지, 연기를 더 잘하기 위해서니까」');
    // TODO: SETFONT "MS ゴシック"
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('당신(=감독)이 다니는 사립 XX학원에서 비밀리에 진행되는');
    ctx.showMessage('『여친으로 삼고싶은 여학생』앙케이트에서 정통파 미소녀인 레이첼이나');
    ctx.showMessage('여성표가 많은 이즈키, 숨은 팬이 많은 미노리와 더불어 항상 상위를 차지하는 미소녀');
    ctx.showMessage('그녀가 소속된 신체조부의 기대주지만,');
    ctx.showMessage('기술면은 전국에서 인정받으면서도 표현력에 문제가 있다고 한다');
    ctx.showMessage('『여성의 요염함』이 부족하다고 평가받으며,');
    ctx.showMessage('그 약점때문에 항상 전국대회 진출권을 코앞에서 놓치고 있다');
    ctx.showMessage('심사원과 관객의 시선에도 끄떡않는 걸 보면');
    ctx.showMessage('딱히 부끄럼쟁이인것도 아닌듯 한데……');
    ctx.showMessage('의뢰인은 그녀의 표현력 부족을『토코가 여자의 기쁨을 모르는 게 원인』이라며');
    ctx.showMessage('자신을 코치로 소개해준 키류 조직에게 의뢰했다고 한다');
    ctx.showMessage('본인에겐 이번 일은『표현력을 기르기 위한 훈련』이라고 전했으며');
    ctx.showMessage('그 내용에 관해서는 의외로 쉽게 받아들일만큼 속기 쉬운 성격이다');
    ctx.showMessage('');
    ctx.showMessage('연령: 16세　난이도: S　성장도: A　공헌도: A　매각치: A');
  } else if (X === 205) {
    ctx.showMessage('【타카야시키 하루미】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「절 어엿한 쿠노이치로 만들어주세요!」');
    // TODO: SETFONT "MS ゴシック"
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('당신(=감독)과 같은 사립 XX학원에 다니는 여자아이지만,');
    ctx.showMessage('사실 옛날부터 이어져오던 닌자 일족의 후예');
    ctx.showMessage('평소엔 평범한 여○생으로 지내지만, 선선대부터 일족이 키류 조직에게『보호』받고 있으며');
    ctx.showMessage('그 대가로 밤에는 키류 조직의 밀정이 되어 적대조직의 동향을 살피고 있다');
    ctx.showMessage('그러나 정조관념이 강한 탓에 몸을 사용한 정보수집에 거리낌이 있고');
    ctx.showMessage('『남자와 여자의 관계』가 아니면 끌어낼 수 없는 정보나');
    ctx.showMessage('상대의 약점을 잡을수 없기에 밀정으로서는 삼류라고 평가받는것 같다');
    ctx.showMessage('');
    ctx.showMessage('참고로 전투시에는 야한 행위로 쌓인 힘을 이용, 초인적인 힘을 발휘하여');
    ctx.showMessage('적을 쓰러트릴 수 있고, 이를 위해 항시 야한 행위를 해줄 상대가 필요해진다');
    ctx.showMessage('그렇기에 야한 행위를 받아들일 몸만들기와 세대를 이어갈 자손을 남기기 위해');
    ctx.showMessage('당신에게 맡겨진것은 아닐까');
    ctx.showMessage('');
    ctx.showMessage('연령: 17세　난이도: S　성장도: A　공헌도: A　매각치: A');
  } else if (X === 206) {
    ctx.showMessage('【카부라기 시온】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「어차피 AV에 내보낼거면 남자 역할로 내보내라고……!」');
    // TODO: SETFONT "MS ゴシック"
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('아가씨 학원에 다니고 있지만, 그 정체는 카부라기 그룹의 도련님…… 남자이다');
    ctx.showMessage('본의아니게 조모의 지시대로 여장해서 아가씨학교에 다니고 있지만,');
    ctx.showMessage('여장이 취미인것도 남자를 좋아하는 것도 아니다');
    ctx.showMessage('매우 기가 드세고 가학적인 성격이며 자신이 귀엽다는 걸 자각하고 있다');
    ctx.showMessage('');
    ctx.showMessage('남자인줄 모르고 접근해온 백합취향의 상급생을 협박하여');
    ctx.showMessage('여러가지 의미로 노예처럼 부리고 있었으나, 그것이 화근이 되어');
    ctx.showMessage('키류 조직이 빚을 볼모로 학교에 스파이로 잡입시킨 여교사에게 현장을 목격당하고 만다');
    ctx.showMessage('카부라기 그룹과의 연줄을 원하던 키류 조직은 그를 조교해 자신들의 수하로 만들기위해');
    ctx.showMessage('당신에게 그의 신병을 넘겼다');
    ctx.showMessage('');
    ctx.showMessage('남자에게 닿기만해도 닭살이 돋을만큼 남자를 싫어하는 낭자애를');
    ctx.showMessage('자○가 없으면 살아갈 수 없는 암컷으로 만드는 것도');
    ctx.showMessage('조교의 묘미가 아닐까, 라고 언니는 생각해 (엘렌 왈)');
    ctx.showMessage('');
    ctx.showMessage('연령: 16세　난이도: S　성장도: A　공헌도: A　매각치: A');
  } else if (X === 207) {
    ctx.showMessage('【료지마 미치루】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「살짝 용돈 좀 번거가지고, 농담이 안통하네」');
    // TODO: SETFONT "MS ゴシック"
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('갈색으로 태운 피부에를 가진, 야한 일과 향락에 저항감이 없는 불량소녀');
    ctx.showMessage('싸움을 엄청 잘하여 다른 고등학교에서도 유명할 정도로');
    ctx.showMessage('키류 조직의 말단과 시비가 붙었을때 싸움실력을 눈여겨 본『수장파』가');
    ctx.showMessage('중요도가 낮은 변두리 클럽에서『단골』의 경호원으로 고용했다');
    ctx.showMessage('그러나 키류 조직을 재편할 때 적대 조직에게');
    ctx.showMessage('말단에게 알려질 정도로 중요하진 않으나, 기밀성이 있는 내부정보를 흘리거나');
    ctx.showMessage('프린세스포이즌을 유출하는등의 배반행위가 발각됐다');
    ctx.showMessage('과거의 키류 조직이라면 여자나 아이라도 배반행위는 가차없이 숙청했겠지만,');
    ctx.showMessage('지금의 조직, 즉 카논의 의향에 의해『숙청』만은 용서받았다');
    ctx.showMessage('과거 그녀와 육체관계를 가졌던 자의 말에 따르면');
    ctx.showMessage('몸을 놀렸던 것 치고는 명기를 가졌다고 하며, 그렇다면 조직에서');
    ctx.showMessage('성처리용 도구로『기르는』게 어떠냐는 의견이 채용됐다');
    ctx.showMessage('');
    ctx.showMessage('보기와 달리 몸이 약하고 낫는 게 느리기에');
    ctx.showMessage('너무 심한 플레이는 자제하는 것이 좋다');
    ctx.showMessage('');
    ctx.showMessage('연령: 17세　난이도: A　성장도: A　공헌도: A　매각치: B');
  } else if (X === 208) {
    ctx.showMessage('【카스가 릿카】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「어중간하겐 못합니다, 그러니 할 거라면 제대로 해주세요」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('지금은 죽은 남편이 남긴 작은 건설회사를 여성의 연약한 팔로 혼자 운영하는 여사장');
    ctx.showMessage('선천적으로 오기가 강하고, 근성론이나 정신론보다 합리성을 중시하는 한편,');
    ctx.showMessage('예상외의 사태가 일어나면 아무것도 못하는 일이 많고');
    ctx.showMessage('다른 사람에게 자신의 마음을 솔직하게 표현하지 못하며');
    ctx.showMessage('금속태 안경도 시너지를 내어 까칠한 성격으로 오인받아 경원시되기 십상이다');
    ctx.showMessage('그녀의 경영방침과 지휘력은 지역에서도 신뢰받고 있지만,');
    ctx.showMessage('때마침 찾아온 불경기에 의해 회사의 경영이 기울어가고');
    ctx.showMessage('언젠가 찾아올, 남편이 남겨진 회사가 망하는 날을 피하기 위해 발버둥치고 있다');
    ctx.showMessage('그러나 자금사정도 마땅치 않고, 주 거래 은행에게 대출을 취소당하거나');
    ctx.showMessage('견적상 확실하게 딸 수 있는 공공사업도. 관청과 유착이 있다며');
    ctx.showMessage('흉흉한 소문이 도는 회사에 뺐기는 등, 계속해서 안좋은 일이 일어나고 있었다');
    ctx.showMessage('최후의 수단으로 구면인 키류 엘렌에게 목돈의 원조를 요청했으나,');
    ctx.showMessage('엘렌은 원조를 거절하고 그 대신 그녀에게『간단한 일』을 소개시켜주기로 했다');
    ctx.showMessage('');
    ctx.showMessage('연령: 34세　난이도: B　성장도: D　공헌도: B　매각치: C');
  } else if (X === 209) {
    ctx.showMessage('【우에사카 미쿠】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「뭐야, 나도 어른 여자니까 섹스 정돈 말할 수 있다고」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('수천만분의 1이라 불릴 정도로 적은 확률로 태어난다는 음마와 인간의 혼혈 여성');
    ctx.showMessage('평소엔 당신(=감독)과 같은 학교에 다니고 있지만,');
    ctx.showMessage('음마 특유의 높은 신체능력을 살려, 본래 파라디수스 왕가의 요원이지만,');
    ctx.showMessage('명목상 자원봉사라는 취급으로 경찰의 치안유지에 협력하고 있다');
    ctx.showMessage('이성적이로 논리적인 사고와 신체능력에 걸맞는 실적으로 토모요시 아야노를 비롯한');
    ctx.showMessage('경찰 쪽 사람들에게 받는 신뢰는 두텁지만, 그런 그녀에게는 문제가 있었다……');
    ctx.showMessage('바로 부끄럼쟁이인 주제에 성적인 말로 상대를 조롱하는 성격으로');
    ctx.showMessage('이에는 경찰과 레이첼도 곤란해 하고 있다');
    ctx.showMessage('또 상대를 괴롭히는 말을 즐겨 사용하면서도');
    ctx.showMessage('본인 왈,『나는 도M이야』라는 등…… 아무래도 허세를 부려서라도');
    ctx.showMessage('자신이 음마의 아이라고 강조하는 것 같다');
    ctx.showMessage('');
    ctx.showMessage('연령: 17세　난이도: C　성장도: S　공헌도: B　매각치: A');
  } else if (X === 210) {
    ctx.showMessage('【아오노 노에루】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「바로 믿어버리니까 속이지 말아주세요!」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('미츠루 이즈키의 후배 부원이자 작은 무역회사 사장부부의 외동딸');
    ctx.showMessage('밝고 상냥한 성격이지만, 가끔씩 큰 실수를 저지르는 게 단점');
    ctx.showMessage('그래도 포기하거나 비굴해지지 않으며, 항상 목표를 향해 노력하는 강한 의지를 가지고');
    ctx.showMessage('부활동에 올곧이 임하는 자세를 이즈키에게 평가받고 있다');
    ctx.showMessage('');
    ctx.showMessage('최근엔 새롭게 밸리 댄스를 배우고 있다고 하는데');
    ctx.showMessage('그 춤은 굳이 평가하자면『빠빠라밤ー』한 느낌이라 한다');
    ctx.showMessage('애지중지하며 자란 딸이라 그런지 속기 쉬운 성격이며');
    ctx.showMessage('최근엔 그녀의 주위에 수상한 남자들의 수상한 권유가 끊이질 않는다고 한다');
    ctx.showMessage('그리고 얼마전, 드디어 속아버린 결과 팔뚝에 문신을 새겨버리는,');
    ctx.showMessage('돌이킬 수 없는 일을 저질러 버렸고 그 이후로 남성들을 꺼리게 돼버려');
    ctx.showMessage('그녀의 장래를 걱정한 사장부부가 거래처인 키류 조직 관련회사에 상담한것이 일의 발단이다');
    ctx.showMessage('');
    ctx.showMessage('그 일을 알게된 카논이『쉽게 속는 성격이라면 아예 남자를 알게 해버리는 편이 안전하다』');
    ctx.showMessage('라는 해답을 내놓아 대리인을 통해 사장부부에게 전달했다');
    ctx.showMessage('처음엔 말도 안된다며 상식적으로 거부하던 사장부부도');
    ctx.showMessage('『속아넘어간 결과 더 지독한 꼴을 당할지도 모른다』');
    ctx.showMessage('라며 대리인이 쐐기를 박듯 추가로 전한 카논의 전언에 구슬려진 건지');
    ctx.showMessage('딸의 순결과 장래를 저울질하고, 괴로운 고민 끝에 딸을 키류 조직에게 맡기기로 했다……');
    ctx.showMessage('');
    ctx.showMessage('연령: 15세　난이도: C　성장도: C　공헌도: C　매각치: B');
  } else if (X === 211) {
    ctx.showMessage('【아카기 히카루】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「AV에 나오면…… 존재감 있는 애가 될 수 있을까아?」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('아이돌급의 외모와 높은 운동신경에 참한 마음씨를 가진');
    ctx.showMessage('무척이나 귀여운 여자아이');
    ctx.showMessage('그런데도 무슨 연유인지 존재감이 흐릿하여');
    ctx.showMessage('주위에서 잊혀지는 일이 자주 있다');
    ctx.showMessage('자기가 주연인 AV에서라면 존재감을 내는 방법을 익힐 수 있지 않을까');
    ctx.showMessage('깊게 고민한 끝에 그녀는 AV 데뷔를 결심했다');
    ctx.showMessage('그런 짓까지 안해도, 에이스로 기대받는 육상부에 매진하면');
    ctx.showMessage('눈에 띄게 될 것 같은데……');
    ctx.showMessage('');
    ctx.showMessage('위로 굉장한 미인이며 패션모델인 언니가 있어');
    ctx.showMessage('그녀와 비교당하는 것도 컴플렉스의 원인중 하나다');
    ctx.showMessage('');
    ctx.showMessage('연령: 13세　난이도: E　성장도: E　공헌도: D　매각치: C');
  } else if (X === 212) {
    ctx.showMessage('【아사가미 토모코】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「무녀가 AV출연이라니……!　그래서 검열은 흐릿하게? 모자이크로?');
    ctx.showMessage('혹시 무수정으로 나올거면 미리 정돈해둬야……');
    ctx.showMessage('아, 아뇨!　아무것도 아니에요~?　싫은데 억지로 하는 거라구요~?」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('윤기있는 검은 생머리에 궁도부를 하고 있고');
    ctx.showMessage('히나미 신사만은 못하지만, 나름 유서깊은 아사가미 신사의 외동딸이자');
    ctx.showMessage('야마토 나데시코 타입의 폭유미소녀');
    ctx.showMessage('그러나 안타깝게도 성격이 조금『망가진』타입으로, 무녀가 해서는 안되는');
    ctx.showMessage('음담패설에다 화장실개그를 하며, 끝내 수업중에 망상에로소설을 쓰는 지경에 이른다');
    ctx.showMessage('거기다 오타쿠문화에도 정통하여 미소녀 게임의 판매량을 패키지만 보고도 맞추는,');
    ctx.showMessage('쓸데없는 재능도 가지고 있다');
    ctx.showMessage('그걸 감안하고봐도 남는 미소녀인 덕분인지 남자들의 인기가 높아');
    ctx.showMessage('비슷한 야마토 나데시코 타입인 히나미 하루노와 양분하고 있다');
    ctx.showMessage('도쿠가와 치와와 밴드를 하고 있으며 담당파트는 기타다');
    ctx.showMessage('도쿠가와 치와는 그녀의 망상벽을 단련시켜서 무언가를 꾸미려는 것 같은데……');
    ctx.showMessage('');
    ctx.showMessage('연령: 15세　난이도: C　성장도: C　공헌도: D　매각치: A');
  } else if (X === 213) {
    ctx.showMessage('【카미나 유우키】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「너 왠지 그 사람이랑 비슷…… 아니, 아무 것도 아니야!」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('○○현의, 풍광명미라고 하면 듣기는 좋지만 실상은 시골 그 자체인 ○○섬에서');
    ctx.showMessage('지금은 폐교된 학원에 다니던 고○학생');
    ctx.showMessage('온화하나 강직하고 정의감이 강한 성격으로 전엔 풍기위원을 맡을 정도였다');
    ctx.showMessage('빼어난 미소녀지만, 본인은 자신을『평범』하다고 생각하며');
    ctx.showMessage('이전 마음을 두고 있던 소년에게『자신과는 사는 세계가 다르다』며 고백도 못했다');
    ctx.showMessage('○○섬 근해에서 차세대 에너지원인 해양자원이 채굴된다는 사실이');
    ctx.showMessage('근년, 학회에서 밝혀져 눈독을 들인 투기꾼들에게 학원이 노려진다');
    ctx.showMessage('그때 마음을 둔 소년을 포함한 소수와 함께 투기꾼과 싸우기 위해 뛰어다녔지만,');
    ctx.showMessage('노력도 헛되이 폐교가 결정되고 그녀를 시작으로 투기꾼과 싸우던 몇명의 소녀들이');
    ctx.showMessage('소동의 혼란을 틈타, 돈이 될거라 판단한 투기꾼들에게 납치당했다');
    ctx.showMessage('그리고 그녀는 키류 조직에 팔렸지만, 이용가치가 있다고 판단한 엘렌에 의해 처리가 보류됐다');
    ctx.showMessage('');
    ctx.showMessage('그리고 최근들어 당신(=감독)의 눈부신 업적을 봐서');
    ctx.showMessage('그녀의 처분이 결정되었다');
    ctx.showMessage('그 과정에서 우선 당신이 다니는 학교에 복학하는 것과');
    ctx.showMessage('그녀의 옛 친구들의 수색이 약속됐는데……');
    ctx.showMessage('');
    ctx.showMessage('연령: 16세　난이도: C　성장도: C　공헌도: B　매각치: B');
  } else if (X === 214) {
    ctx.showMessage('【혼죠 메이코】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「원통하도다~♪');
    ctx.showMessage('안 놀아주면 달라붙을거야~」');
    // TODO: SETFONT "MS ゴシック"
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('키류 조직이 새로 손에 넣은 건물에 들러붙은 유령');
    ctx.showMessage('매우 밝고 낯을 안가리며 13살 정도의 귀여운 소녀의 모습을 하고 있다');
    ctx.showMessage('생전엔 의원과 외국인 아내 사이에서 태어난 아가씨였다고 한다');
    ctx.showMessage('그녀를 쫓아내기 위해 키류 조직에서 영능력자를 불러 제령한 결과');
    ctx.showMessage('그녀를 쫓아내려한 원흉인 카논에게 씌어버렸다고 한다');
    ctx.showMessage('아무래도 그녀는 사랑을 모르는 채로 죽어버린것에 미련이 남은듯');
    ctx.showMessage('오컬트과 기계라면 질색하는 카논이『어떻게든 해줘……』라며 눈물을 글썽이며 부탁해와서');
    ctx.showMessage('일단 당신(=감독)이 그녀를 맡게 되었다');
    ctx.showMessage('유령인지 헷갈릴 정도로 밝고 활기찬 성격에『실체화』까지 가능하여');
    ctx.showMessage('진짜 유령이 맞는지 의심스럽지만, 조직의 조사결과');
    ctx.showMessage('몇년 전, 동성동명에 똑같은 외모의 소녀가 사망한 것이 확인되어');
    ctx.showMessage('진짜 유령인지도 모른다');
    if (ctx.global[209] >= 1) {
      ctx.showMessage('그러고보니 레이첼말로는『실체화』가능한 유령의 매우 드물며');
      ctx.showMessage('아마도 더『상위』세계, 쉽게 말하면『신』의 의지 같은 것이');
      ctx.showMessage('작용하는 건지도 모른다, 라고 하는데……');
    }
    ctx.showMessage('촬영에 대해서도『어른의 연애과정중 하나』라고 생각하고 있는듯, 매우 협력적이다');
    ctx.showMessage('');
    ctx.showMessage('연령: 살아있었다면 15세　난이도: E　성장도: E　공헌도: C　매각치: B');
  } else if (X === 215) {
    ctx.showMessage('【후타미 안】');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「시, 싫어! 난 안 움직일거야!');
    ctx.showMessage('응, 누워있기만 해도 기분도 좋아지고 돈도 받을 수 있어? 그러면 뭐……」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('슈퍼 아이돌의 소질이 잠든 아이돌의 원석');
    ctx.showMessage('그러나 엄청난 게으름뱅이에');
    ctx.showMessage('자기 힘으로는 도저히 프로듀스할 수 없겠다며 포기한 프로듀서가');
    ctx.showMessage('하다못해 투자금 만이라도 회수하기 위해');
    ctx.showMessage('');
    ctx.showMessage('A V 데 뷔  시 키 기 로 했 다');
    ctx.showMessage('');
    ctx.showMessage('연령: 17세　난이도: A　성장도: B　공헌도: B　매각치: S');
  } else if (X === 216) {
    ctx.showMessage('【크리스티나・로코코・라그라데】(Kurstina Rokoko Rangurade)');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「언젠가, 다시 만날 수 있다고 믿고 있었어요. 언젠가…… 반드시」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('예전 당신이 부모와 함께 간 라그라데 왕국이라는 소국에서 친해진 소녀로');
    ctx.showMessage('사실 라그라데 왕국의 공주님');
    ctx.showMessage('라그라데 왕국에서 개최되는 마법대회에서 우승하기 위해 마력을 높일 필요가 있어');
    ctx.showMessage('일족에게 전해지는, 흥분을 마력으로 변환하는 마술에 손을 댔지만');
    ctx.showMessage('성적인 흥분을 얻을 수단을 몰라 당신에게 상담하러 왔다고 한다……');
    ctx.showMessage('라그라데 왕국에선 그녀를 대대적으로 수색하고 있기에');
    ctx.showMessage('그녀를 감싸줬다 들켰다간 큰일이 벌어질 것이다');
    ctx.showMessage('');
    ctx.showMessage('라그라데의 혈통은 파라디수스 왕가의 먼 친척뻘로');
    ctx.showMessage('그녀가 마법을 쓸 수 있는 것도 그것이 이유이다');
    ctx.showMessage('그러나 오랜 세월을 거치며 마력이 없는 사람과 섞여왔기에');
    ctx.showMessage('반대로 피가 섞이는 걸 꺼려온 파라디수스와 비교하면『마법을 조금 쓸 수 있는』정도이다');
    ctx.showMessage('성마술은【음마】와 관계성이 짙기에 라그라데의 선조는【음마】가 아닐까,');
    ctx.showMessage('라고 이쿠미는 추측하지만 진상은 알 수 없다');
    ctx.showMessage('');
    ctx.showMessage('연령: 18세　난이도: D　성장도: B　공헌도: A　매각치: S');
  } else if (X === 217) {
    ctx.showMessage('【니콜・파트리나탈리】(Nicole Patrinatali)');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「우, 우아~~앙!! 곧 크리스마스인데…… 선물은 전부 도둑맞았어~!」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('크리스마스 이브날 밤, 당신(=감독)의 사무소 앞에서');
    ctx.showMessage('알몸에 이상한 얼굴의 순록을 껴않고 몸을 녹이던 수수께끼의 소녀');
    ctx.showMessage('자칭 산타클로스라고 하며 선물도 입고있던 옷도 전부 정체모를 누군가가 훔쳐갔다고 한다');
    ctx.showMessage('');
    ctx.showMessage('수상하게 생각하면서도 마지못해 당신이 보호한 그녀는');
    ctx.showMessage('산타 활동을 재개하기 위해 자금을 모을 방법을 모색하던 도중,');
    ctx.showMessage('키류 카논이 그녀에게 돈을 버는 방법을 제안하는데');
    ctx.showMessage('그건 카논치고는 드문 방법이었다……');
    ctx.showMessage('');
    if (ctx.global[210]) {
      ctx.showMessage('레이첼에 의하면 그녀는 파라디수스 왕국에 사는, 마술을 사용해');
      ctx.showMessage('『다른 사람들의 소소한 소원』을 이루어 주는 것을 극상의 행복이라 생각하는');
      ctx.showMessage('파트리나탈리가의 딸이라고 한다');
      ctx.showMessage('파트리나탈리가는 국제 산타클로스 협회에도 인정받은 산타클로스지만,');
      ctx.showMessage('그녀는 인정받은지 얼마 안된 신참으로, 연수를 위해 방문한 이 나라에서 이런 꼴을 당한 것이라 한다');
      ctx.showMessage('');
    }
    ctx.showMessage('연령: 19세　난이도: D　성장도: B　공헌도: C　매각치: C');
  } else if (X === 230) {
    ctx.showMessage('【리젤롯테・K・파라디수스】(Lieselotte Kincsem Paradisus)');
    ctx.setColor(0xDDBBCC);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage('「기회가 생긴다면, 꼭 이야기를 들려주세요」');
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage('');
    ctx.showMessage('파라디수스 왕국의 제 2왕녀이자 레이첼과 유니스의 배다른 자매');
    ctx.showMessage('왕족 중에서는 약한 편이지만 방대한 마력을 작음 몸에 담고 있어');
    ctx.showMessage('빈번히 몸상태가 나빠지기에, 지금은 휠체어가 없으면 영지 밖으로 나가지도 못할 만큼 몸이 약하다');
    ctx.showMessage('');
    ctx.showMessage('그렇기에 사지의 움직임을 보조하는 목적으로');
    ctx.showMessage('대중에게 밝힐 수 없는 부위에 마술적인 의미를 가진 문신을 새겨넣었지만,');
    ctx.showMessage('그녀의 하얀 피부와 대조되어 가련함을 돋보이고 있다');
    ctx.showMessage('내성적이고 얌전하며 꽃과 동물을 사랑하는 상냥한 성격으로');
    ctx.showMessage('그탓에 신비함과 덧없음을 갖춘『정통파 공주님』으로서 국민중엔 열렬한 신봉자도 존재한다고 한다');
    ctx.showMessage('그녀의 존재는 레이첼이 마술약학을 연구하는 이유이기도 하다');
    ctx.showMessage('');
    ctx.showMessage('레이첼이 원인규명에 힘쓴 결과, 그녀의 몸상태가 나빠지는 원인은');
    ctx.showMessage('그녀의 마력용량에 비해 보유마력의 만성적인 고갈이 원인으로');
    ctx.showMessage('파라디수스 왕가에서는『선조회귀』라고도 불리는, 마력의 원천인 생명력을 자연에서 흡수하지 못하고');
    ctx.showMessage('다른 사람에게서 빼앗아서 보충해야 하는 체질때문이라고 판명됐다');
    ctx.showMessage('그리고 마력을 보충하는 가장 효율적인 방법은 파라디수스 왕국에서는 소실된 마술체계');
    ctx.showMessage('【성마술】――즉『정액』을 마력으로 변환하는 것이었다');
    ctx.showMessage('');
    ctx.showMessage('연령: 15세　난이도: S　성장도: B　공헌도: A　매각치: S');
  } else {
    ctx.showMessage(`네놈의 소개문은 없어요?`);
  }
  ctx.showMessage(` 지금까지 계약한 횟수: ${ctx.global[Y]}회`);
  await ctx.wait();
  return;
}
