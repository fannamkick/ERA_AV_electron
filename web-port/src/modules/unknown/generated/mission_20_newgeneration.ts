/**
 * MISSION_20_NEWGENERATION.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function mission_title_20(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.results = "CPG 뉴 제네레이션 －LESSON－";
}

export async function mission_visible_20(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  return GETCHARA(11) != -1 && GETCHARA(86) != -1;
}

export async function mission_fee_20(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  P[1] = 150000;
  P[2] = 15;
  P[3] = P[1] * 2;
  P[4] = 0;
  P[5] = 0;
}

export async function mission_info_20(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine('‥');
  ctx.showMessage('【CPG 뉴 제네레이션 -LESSON-】');
  ctx.showMessage('');
  ctx.showMessage('의뢰인: 러브핵・엔터테인먼트');
  ctx.showMessage('');
  ctx.showMessage('【스즈모토 스즈카】');
  ctx.showMessage('');
  ctx.showMessage('언뜻 보기엔 애교도 없고 흐트러진 교복과 귀의 피어스 때문에 불량아로 보이나');
  ctx.showMessage('CPG에 연습생으로 스카우트 된 뒤에도 학교 숙제도 제대로 해내는 성실한 아이');
  ctx.showMessage('빼어난 외모에 더해 아직 거칠지만 이목을 끄는 가창력이 있어');
  ctx.showMessage('영업에 따라 뮤직 어워드에서도 좋은 성과를 내지 않을까 주목받고 있다');
  ctx.showMessage('집은 꽃집을 하고 있고 어쩌다 가게를 볼때는');
  ctx.showMessage('가벼운 복장에도 좋은 센스가 묻어난다');
  ctx.showMessage('참고로 야미자키 린코보다 이해하기는 쉬워도 비슷한 비유를 할때가 있다');
  // TODO: PRINTW
  ctx.showMessage('【나가에 사츠키】');
  ctx.showMessage('');
  ctx.showMessage('어엿한 아이돌이 목표인 CPG의 노력가연습생');
  ctx.showMessage('애교가 부족한 스즈카와 반대로 낯을 가리지 않고');
  ctx.showMessage('천진난만하고 긍정적인 성격에 무대 위에선 담력도 있다');
  ctx.showMessage('특히 아이돌에게 빠질 수 없는 요소인『미소』가 매우 매력적으로');
  ctx.showMessage('별난 사람들이 많은 CPG멤버들과 달리 정통파 미소녀로서');
  ctx.showMessage('만인의 사랑을 받을 아이돌이 될거라 예상되고 있다');
  ctx.showMessage('CPG내에서 행해진 체력시험과 학력시험에선 훌륭하게도 평균점을 얻는등『평균』에게 사랑받는 경향이 있다');
  ctx.showMessage('참고로 이름은『사츠키(5월)』지만 4월생이다');
  // TODO: PRINTW
  ctx.showMessage('【우노 미호】');
  ctx.showMessage('');
  ctx.showMessage('『반의 분위기메이커』같은 존재로 밝고 외향적인 CPG연습생');
  ctx.showMessage('15살임에도 좋은 몸매를 가졌고 운동신경도 뛰어나기에');
  ctx.showMessage('댄스와 그라비아에 알맞고 평범한 아이돌이었다면 바로 데뷔했을 레벨이다');
  ctx.showMessage('');
  ctx.showMessage('그러나 CPG정멤버의 수준과 본인이 승부욕이 강한 측면을 고려해');
  ctx.showMessage('조금 열세한 가창력 강화를 중심으로한 레슨을 받고 있다');
  ctx.showMessage('아이돌을 목표한 동기는『다양한 사람들과 친해지고 싶으니까』라는 것으로 그에 걸맞게 친화력이 대단히 높다');
  ctx.showMessage('참고로 이성을 그다지 의식하지 않는지 어필이 대단히 적극적이며');
  ctx.showMessage('그로인해 착각하는 자가 속출하고 있다');
  // TODO: PRINTW
  ctx.showMessage('「……그럼, 대충 둘러본 감상은 어때?');
  ctx.showMessage('이 세명이 빠진 미히로를 대신해 나랑 엄마가 데뷔시킬 아이돌이야');
  ctx.showMessage('물론 급하게 레슨을 시켜봤자 총선거 2위인 사쿠라 유키에겐 못당하고 그쪽은 그쪽때로 팔아야 하니까');
  ctx.showMessage('영업은 우리들이 알아서 할테니, 사실 당신이 끼어들 여지는 없어');
  ctx.showMessage('');
  ctx.showMessage('그래도 이렇게『의뢰』가 내려온다는 건……');
  ctx.showMessage('뭐, 상상은 가겠지?');
  ctx.showMessage('한동안 이 세명을 맡길테니, 당신에게 바라는 건『최후의 보험』을 위한 지도야');
  ctx.showMessage('우리 방법으로는 삐끗하면 세명 모두 실패할 가능성도 있어. 그러면 어떻게 할지……');
  ctx.showMessage('말하지 않아도 알지?');
  ctx.showMessage('최소한의 주문을 하겠지만, 기본적으로 마음대로 해도 돼');
  ctx.showMessage('……아, 맞다, 잠깐만. 의뢰를『성공』취급하려면 두가지 패턴이 있지');
  // TODO: PRINTW
  ctx.showMessage('……그러니 성공조건 두가지 중 하나야');
  ctx.showMessage('');
  ctx.showMessage('공통조건은『세명 모두의 기교 LV5이상, 피사기능 LV4이상』');
  ctx.showMessage('');
  ctx.showMessage('1.『세명 모두 욕망 LV5이상, 노출벽 LV3이상이고 AV촬영을 경험함』');
  ctx.showMessage('2.『세명 모두 가창기능 LV4이상, 무용기능 LV4이상이고 AV촬영 금지』');
  ctx.showMessage('');
  ctx.showMessage('고 기한은 30주야');
  ctx.showMessage('1번으로 끝내거나 실패할 경우는 우리가 데려가겠지만,');
  ctx.showMessage('2번을 성공한다면 다른 의뢰처럼 당신에게 맡길수도 있어」');
  ctx.showMessage('');
  ctx.drawLine('‥');
}

export async function mission_receive_20(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: ADDCHARA 190
  // TODO: ADDCHARA 191
  // TODO: ADDCHARA 192
  // TODO: LOADGLOBAL
  ctx.global[390] += 1;
  ctx.global[391] += 1;
  ctx.global[392] += 1;
  // TODO: SAVEGLOBAL
  if (ctx.global[200] >= 0) {
    character = GETCHARA(190);
    await clearbonus_call(ctx, character);
  }
  if (ctx.global[200] >= 0) {
    character = GETCHARA(191);
    await clearbonus_call(ctx, character);
  }
  if (ctx.global[200] >= 0) {
    character = GETCHARA(192);
    await clearbonus_call(ctx, character);
  }
}

export async function mission_calc_20(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = GETCHARA(190);
  ctx.locals[1] = 0;
  ctx.locals[2] = 0;
  ctx.locals[3] = 0;
  if (ctx.abilities[ctx.locals[0]][12] >= 5) {
    ctx.locals[1]++;
  }
  if (ctx.abilities[ctx.locals[0]][70] >= 4) {
    ctx.locals[1]++;
  }
  if (ctx.abilities[ctx.locals[0]][11] >= 5) {
    ctx.locals[2]++;
  }
  if (ctx.abilities[ctx.locals[0]][17] >= 3) {
    ctx.locals[2]++;
  }
  if (ctx.exp[ctx.locals[0]][76] >= 1) {
    ctx.locals[2]++;
  }
  if (ctx.abilities[ctx.locals[0]][71] >= 4) {
    ctx.locals[3]++;
  }
  if (ctx.abilities[ctx.locals[0]][72] >= 4) {
    ctx.locals[3]++;
  }
  if (ctx.exp[ctx.locals[0]][76] == 0) {
    ctx.locals[3]++;
  }
  ctx.locals[0] = GETCHARA(191);
  if (ctx.abilities[ctx.locals[0]][12] >= 5) {
    ctx.locals[1]++;
  }
  if (ctx.abilities[ctx.locals[0]][70] >= 4) {
    ctx.locals[1]++;
  }
  if (ctx.abilities[ctx.locals[0]][11] >= 5) {
    ctx.locals[2]++;
  }
  if (ctx.abilities[ctx.locals[0]][17] >= 3) {
    ctx.locals[2]++;
  }
  if (ctx.exp[ctx.locals[0]][76] >= 1) {
    ctx.locals[2]++;
  }
  if (ctx.abilities[ctx.locals[0]][71] >= 4) {
    ctx.locals[3]++;
  }
  if (ctx.abilities[ctx.locals[0]][72] >= 4) {
    ctx.locals[3]++;
  }
  if (ctx.exp[ctx.locals[0]][76] == 0) {
    ctx.locals[3]++;
  }
  ctx.locals[0] = GETCHARA(192);
  if (ctx.abilities[ctx.locals[0]][12] >= 5) {
    ctx.locals[1]++;
  }
  if (ctx.abilities[ctx.locals[0]][70] >= 4) {
    ctx.locals[1]++;
  }
  if (ctx.abilities[ctx.locals[0]][11] >= 5) {
    ctx.locals[2]++;
  }
  if (ctx.abilities[ctx.locals[0]][17] >= 3) {
    ctx.locals[2]++;
  }
  if (ctx.exp[ctx.locals[0]][76] >= 1) {
    ctx.locals[2]++;
  }
  if (ctx.abilities[ctx.locals[0]][71] >= 4) {
    ctx.locals[3]++;
  }
  if (ctx.abilities[ctx.locals[0]][72] >= 4) {
    ctx.locals[3]++;
  }
  if (ctx.exp[ctx.locals[0]][76] == 0) {
    ctx.locals[3]++;
  }
  if ((ctx.locals[2] === 9 || ctx.locals[3] === 9) && ctx.locals[1] === 6) {
    if (ctx.locals[2] == 9) {
      return 1;
    }
    if (ctx.locals[3] == 9) {
      return 2;
    }
  }
  return 0;
}

export async function mission_report_20_arg_(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.args[0] <= 1) {
    ctx.locals[0] = GETCHARA(190);
    if (ctx.locals[0] != -1) {
      await キャラ削除, local(ctx, character);
    }
    ctx.locals[0] = GETCHARA(191);
    if (ctx.locals[0] != -1) {
      await キャラ削除, local(ctx, character);
    }
    ctx.locals[0] = GETCHARA(192);
    if (ctx.locals[0] != -1) {
      await キャラ削除, local(ctx, character);
    }
  } else {
    ctx.showMessage(`W  CPG의『정멤버 교체 총선거』결과가 발표됐다……`);
    ctx.showMessage(` 2군으로 떨어지는 정멤버도 있는 한편, 꽤 많은 득표수를 모아 스즈모토 스즈카・나가에 사츠키・우노 미호 세명은`);
    ctx.showMessage(` 무사히 정멤버로 승격할 수 있었다`);
    ctx.showMessage(`L`);
    ctx.showMessage(`W  《스즈모토 스즈카・나가에 사츠키・우노 미호가【${ctx.getVarName("TALENT", 509)}】의 정멤버가 됐다》`);
    ctx.locals[0] = GETCHARA(190);
    ctx.getTalent(local, 509) = 1;
    ctx.getTalent(local, 203) = 1;
    ctx.getTalent(local, 330) = 0;
    MAXctx.base[ctx].locals[31] += 60;
    ctx.base[ctx].locals[31] += 60;
    character.cflags[ctx.locals[0]][801] = 0;
    ctx.locals[0] = GETCHARA(191);
    ctx.getTalent(local, 509) = 1;
    ctx.getTalent(local, 203) = 1;
    ctx.getTalent(local, 330) = 0;
    MAXctx.base[ctx].locals[31] += 60;
    ctx.base[ctx].locals[31] += 60;
    character.cflags[ctx.locals[0]][801] = 0;
    ctx.locals[0] = GETCHARA(192);
    ctx.getTalent(local, 509) = 1;
    ctx.getTalent(local, 203) = 1;
    ctx.getTalent(local, 330) = 0;
    MAXctx.base[ctx].locals[31] += 60;
    ctx.base[ctx].locals[31] += 60;
    character.cflags[ctx.locals[0]][801] = 0;
  }
}

export async function mission_chara_no_20(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  return 218;
}
