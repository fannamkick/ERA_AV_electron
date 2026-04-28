/**
 * SHOP_BIRTHDAY.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function event_birthday(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.abilities[10] < 3) {
    return;
  }
  ctx.showMessage(`${ctx.josaHelper("플레이어는")} 생일을 맞이한 ${ctx.josaHelper("타겟을")} 축하해 주기로 했다……`);
  ctx.showMessage(`《${ctx.josaHelper("타겟을")} 어떻게 축하해 줍니까?》`);
  ctx.showMessage('[0] - 생일선물을 준다');
  ctx.showMessage('[1] - 아무것도 안한다');
  // Label: INPUT_LOOP
  await ctx.inputNumber();
  if (ctx.result === 0) {
    await birthday_present(ctx, character);
  } else if (ctx.result === 1) {
    ctx.showMessage(`W 《${ctx.getVarName("CALL", TARGET)}의 생일을 축하해 주지 않습니다》`);
    if (ctx.talents[85]) {
      ctx.showMessage(`생일축하를 못 받은 ${ctx.josaHelper("타겟은")} 삐졌다……`);
      ctx.showMessage('');
      ctx.showMessage(`W 《${ctx.getVarName("ABL", 10)}: Lv${ctx.abilities[10]}　→　Lv{(ABL:10 - 1)}》`);
      ctx.abilities[10] -= 1;
    }
  } else if (ctx.result === 2 && ctx.talents[85]) {
    ctx.showMessage(`W 《${ctx.getVarName("CALL", TARGET)}의 생일을 축하해 주지 않습니다》`);
    if (ctx.talents[85]) {
      ctx.showMessage(`생일축하를 못 받은 ${ctx.josaHelper("타겟은")} 삐졌다……`);
      ctx.showMessage('');
      ctx.showMessage(`W 《${ctx.getVarName("ABL", 10)}: Lv${ctx.abilities[10]}　→　Lv{(ABL:10 - 1)}》`);
      ctx.abilities[10] -= 1;
    }
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  return;
}

export async function birthday_present(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.varSet(ctx.locals[0], 0);
  ctx.showMessage(`《${ctx.getVarName("CALL", TARGET)}에게 어떤 선물을 줍니까?》`);
  ctx.showMessage('[0] - 화장품　　　　　　　　　(가격: 1000포인트)');
  ctx.showMessage('[1] - 운동기구　　　       　(가격: 5000포인트)');
  ctx.showMessage('[2] - 아로마 캔들 세트     　(가격:  500포인트)');
  ctx.showMessage('[3] - 수제요리              (가격:    0포인트)');
  // Label: INPUT_LOOP
  await ctx.inputNumber();
  if (ctx.result === 0) {
    ctx.showMessage(`${ctx.josaHelper("플레이어는")} ${ctx.getVarName("CALL", TARGET)}에게 화장품을 선물했다……`);
    if (character.cflags[760] != 1 || ctx.talents[430] === 1) {
      ctx.locals[0] = 5;
      ctx.locals[0] += ctx.rand(6);
      if (ctx.talents[326]) {
        ctx.locals[0] *= 2;
      }
      if ((ctx.base[31] + ctx.locals[0]) >= MAXctx.base[31]) {
        ctx.locals[0] = MAXctx.base[31] - ctx.base[31];
      }
      ctx.locals[1] = 1 + ctx.rand(5);
      ctx.locals[1] *= 10;
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 선물이 마음에 들었는지 기뻐하고 있다`);
      ctx.showMessage('');
      if (ctx.base[31] < MAXctx.base[31]) {
        ctx.showMessage(`《${ctx.getVarName("CALL", TARGET)}의 매력치가 ${ctx.locals[0]} 회복했다》`);
        ctx.base[31] += ctx.locals[0];
      }
      if (ctx.talents[85] === 0) {
        ctx.showMessage(`호감도 +${ctx.locals[1]}`);
        character.cflags[2] += (ctx.locals[1] * 10);
      } else {
        ctx.showMessage(`애정경험 +${ctx.locals[1]}`);
        ctx.exp[23] += ctx.locals[1];
      }
      await ctx.wait();
    } else {
      ctx.locals[0] = 1;
      ctx.locals[0] += ctx.rand(4);
      if ((ctx.base[31] + ctx.locals[0]) >= MAXctx.base[31]) {
        ctx.locals[0] = MAXctx.base[31] - ctx.base[31];
      }
      ctx.locals[1] = 1 + ctx.rand(5);
      ctx.locals[1] *= 5;
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 얼굴에 드러내지는 않지만, 작년과 같은 선물인 게 불만인 것 같다……`);
      ctx.showMessage('');
      if (ctx.base[31] < MAXctx.base[31]) {
        ctx.showMessage(`《${ctx.getVarName("CALL", TARGET)}의 매력치가 ${ctx.locals[0]} 회복했다》`);
        ctx.base[31] += ctx.locals[0];
      }
      if (ctx.talents[85] === 0) {
        ctx.showMessage(`호감도 +${ctx.locals[1]}`);
        character.cflags[2] += (ctx.locals[1] * 10);
      } else {
        ctx.showMessage(`애정경험 +${ctx.locals[1]}`);
        ctx.exp[23] += ctx.locals[1];
      }
      await ctx.wait();
    }
    character.cflags[760] = 1;
    ctx.money -= 1000;
  } else if (ctx.result === 1) {
    ctx.showMessage(`${ctx.josaHelper("플레이어는")} ${ctx.getVarName("CALL", TARGET)}에게 운동기구를 선물했다……`);
    if (character.cflags[760] != 2 || ctx.talents[430] === 1) {
      ctx.locals[0] = 100;
      ctx.locals[0] *= ctx.rand(3);
      if (ctx.locals[0] == 0) {
        ctx.locals[0] = 100;
      }
      if (ctx.talents[518]) {
        ctx.locals[0] += 100;
      }
      ctx.locals[1] = 1 + ctx.rand(5);
      ctx.locals[1] *= 10;
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 선물이 마음에 들었는지 기뻐하고 있다`);
      ctx.showMessage('');
      ctx.showMessage(`《${ctx.getVarName("CALL", TARGET)}의 최대 체력이 ${ctx.locals[0]} 증가했다》`);
      MAXctx.base[0] += ctx.locals[0];
      if (ctx.talents[85] === 0) {
        ctx.showMessage(`호감도 +${ctx.locals[1]}`);
        character.cflags[2] += (ctx.locals[1] * 10);
      } else {
        ctx.showMessage(`애정경험 +${ctx.locals[1]}`);
        ctx.exp[23] += ctx.locals[1];
      }
      await ctx.wait();
    } else {
      ctx.locals[0] = 100;
      if (ctx.talents[518]) {
        ctx.locals[0] += 100;
      }
      ctx.locals[1] = 1 + ctx.rand(5);
      ctx.locals[1] *= 10;
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 얼굴에 드러내지는 않지만, 작년과 같은 선물인 게 불만인 것 같다……`);
      ctx.showMessage('');
      ctx.showMessage(`《${ctx.getVarName("CALL", TARGET)}의 최대 체력이 ${ctx.locals[0]} 증가했다》`);
      MAXctx.base[0] += ctx.locals[0];
      if (ctx.talents[85] === 0) {
        ctx.showMessage(`호감도 +${ctx.locals[1]}`);
        character.cflags[2] += (ctx.locals[1] * 10);
      } else {
        ctx.showMessage(`애정경험 +${ctx.locals[1]}`);
        ctx.exp[23] += ctx.locals[1];
      }
      await ctx.wait();
    }
    character.cflags[760] = 2;
    ctx.money -= 5000;
  } else if (ctx.result === 2) {
    ctx.showMessage(`${ctx.josaHelper("플레이어는")} ${ctx.getVarName("CALL", TARGET)}에게 아로마 캔들 세트를 선물했다……`);
    if (character.cflags[760] != 3 || ctx.talents[430] === 1) {
      ctx.locals[0] = 100;
      ctx.locals[0] *= ctx.rand(3);
      if (ctx.locals[0] == 0) {
        ctx.locals[0] = 100;
      }
      ctx.locals[1] = 1 + ctx.rand(5);
      ctx.locals[1] *= 10;
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 선물이 마음에 들었는지 기뻐하고 있다`);
      ctx.showMessage('');
      ctx.showMessage(`《${ctx.getVarName("CALL", TARGET)}의 최대 기력이 ${ctx.locals[0]} 증가했다》`);
      MAXctx.base[1] += ctx.locals[0];
      if (ctx.talents[85] === 0) {
        ctx.showMessage(`호감도 +${ctx.locals[1]}`);
        character.cflags[2] += (ctx.locals[1] * 10);
      } else {
        ctx.showMessage(`애정경험 +${ctx.locals[1]}`);
        ctx.exp[23] += ctx.locals[1];
      }
      await ctx.wait();
    } else {
      ctx.locals[0] = 100;
      if (ctx.talents[518]) {
        ctx.locals[0] += 100;
      }
      ctx.locals[1] = 1 + ctx.rand(5);
      ctx.locals[1] *= 10;
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 얼굴에 드러내지는 않지만, 작년과 같은 선물인 게 불만인 것 같다……`);
      ctx.showMessage('');
      ctx.showMessage(`《${ctx.getVarName("CALL", TARGET)}의 최대 기력이 ${ctx.locals[0]} 증가했다》`);
      MAXctx.base[0] += ctx.locals[0];
      if (ctx.talents[85] === 0) {
        ctx.showMessage(`호감도 +${ctx.locals[1]}`);
        character.cflags[2] += (ctx.locals[1] * 10);
      } else {
        ctx.showMessage(`애정경험 +${ctx.locals[1]}`);
        ctx.exp[23] += ctx.locals[1];
      }
      await ctx.wait();
    }
    character.cflags[760] = 3;
    ctx.money -= 500;
  } else if (ctx.result === 3) {
    ctx.showMessage(`${ctx.josaHelper("플레이어는")} ${ctx.getVarName("CALL", TARGET)}에게 직접 요리를 만들어 줬다……`);
    ctx.locals[1] = 1 + ctx.rand(5);
    ctx.locals[1] *= 10;
    ctx.showMessage(`${ctx.josaHelper("타겟은")} 선물이 마음에 들었는지 기뻐하고 있다`);
    ctx.showMessage('');
    if (ctx.talents[85] === 0) {
      ctx.showMessage(`호감도 +${ctx.locals[1]}`);
      character.cflags[2] += (ctx.locals[1] * 10);
    } else {
      ctx.showMessage(`애정경험 +${ctx.locals[1]}`);
      ctx.exp[23] += ctx.locals[1];
    }
    await ctx.wait();
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  return;
  ctx.showMessage(`${ctx.josaHelper("플레이어는")} ${ctx.josaHelper("타겟과")} 데이트 약속을 했다……`);
  ctx.showMessage(`W`);
  ctx.showMessage(`그러나, 간단한 일이지만 사무소의 대표로 시급히 처리해야 하는 안건이 생겨 지각해 버렸다`);
  ctx.showMessage(`약속장소엔 이미`);
  if (ctx.talents[326] || ctx.talents[402]) {
    ctx.showMessage(`평소보다 힘들여 꾸민`);
  } else {
    ctx.showMessage(`정성들여 세팅한`);
  }
  if (ctx.abilities[17] >= 4) {
    ctx.showMessage(`데다 노출도가 높은`);
  }
  ctx.showMessage(` 모습으로 기다리던 ${ctx.josaHelper("타겟이")}, ${ctx.getVarName("CALL", MASTER)}의 모습을 보자마자 토라진,`);
  ctx.showMessage(`그러나 왠지 기쁜 얼굴을 하고 있다`);
  if (MAXctx.base[31] >= 120 && ctx.talents[87]) {
    ctx.showMessage(`사과하는 ${ctx.getVarName("CALL", MASTER)}에게 ${ctx.josaHelper("타겟은")} 질투심을 부채질하듯이, 기다리는 동안 {1 + RAND:10}명에게 헌팅 당했다고 말했다`);
    ctx.showMessage(`역시 다른 남자 눈에도 ${ctx.josaHelper("타겟은")} 매력적으로 비치는 듯하다……`);
  }
  ctx.showMessage(`L`);
  ctx.showMessage(`W ………………`);
  ctx.showMessage(`W …………`);
  ctx.showMessage(`……`);
  // TODO: PRINTW
  ctx.showMessage(`${ctx.josaHelper("플레이어와")} ${ctx.josaHelper("타겟은")} 노래방과 오락실, 아이쇼핑을 즐기며 둘만의 시간을 만끽했지만,`);
  ctx.showMessage(`${ctx.josaHelper("타겟은")} 오늘은 종일 ${ctx.josaHelper("플레이어와")} 같이 있고 싶어, 라면서 졸랐다`);
  ctx.showMessage('');
  ctx.showMessage(`《${ctx.josaHelper("타겟과")} 계속 데이트를 즐깁니까?》`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 아니오');
  await ctx.inputNumber();
  if (ctx.result === 0) {
  } else if (ctx.result === 1) {
    ctx.showMessage(`${ctx.josaHelper("타겟은")} 아쉬워 하면서도, 내년에도 데이트하자고 약속하니 기쁜듯이 웃으며`);
    ctx.showMessage(`${ctx.getVarName("CALL", MASTER)}에게 기습키스를 했다……`);
    ctx.showMessage(`L`);
    ctx.showMessage(`${ctx.josaHelper("타겟과")} 성공적으로 데이트를 마쳤다`);
    if (character.cflags[16] === -1) {
      character.cflags[16] = 1;
      ctx.setColor(0xDDBBCC);
      ctx.showMessage(`첫 키스`);
      ctx.resetColor();
      character.cflags[16] = 1;
      if (character.no === 1 && ctx.master.no === 0 && ctx.talents[432] === 0) {
        ctx.cstr[1] = "오빠";
      } else if (character.no === 1 && ctx.master.no === 0 && ctx.talents[432] === 1) {
        ctx.cstr[1] = "오라비";
      } else if (character.no === 90 && ctx.master.no === 0) {
        ctx.cstr[1] = "형님";
      } else {
        ctx.cstr[1] = ctx.getName(ctx.master);
      }
    }
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  return;
  ctx.showMessage(`몽롱한 표정으로 기대오는 ${ctx.getVarName("CALL", TARGET)}의 부탁이 의미하는 것을 깨달은 ${ctx.josaHelper("플레이어는")}`);
  ctx.showMessage(`역 뒷거리에 있는 러브호텔로 들어갔다……`);
  // TODO: PRINTW
  ctx.showMessage(`핑크색 간접조명이 비추는 방 한가운데의 침대 위에서, ${ctx.josaHelper("플레이어와")} ${ctx.josaHelper("타겟은")} 누가 먼저랄것 없이 입술을 겹치고`);
  ctx.showMessage(`옷 위로도 고동이 느껴지는 가슴에 손을 올리고 껴안았다`);
  ctx.showMessage(`그리고 흐름에 몸을 맡겨 ,`);
  if ((character.cflags[7] & 16)) {
    ctx.showMessage(`피어스가 빛나는`);
  }
  ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 혀와 ${ctx.getVarName("CALL", MASTER)}의 혀가 얽혀 타액을 교환하는 농후한 것으로 변해간다`);
  ctx.showMessage(`${ctx.josaHelper("플레이어가")} ${ctx.josaHelper("타겟과")} 시선을 맞추니, 뺨이 주황색으로 물든 ${ctx.getVarName("CALL", TARGET)}의 촉촉한 눈이 천천히 움직였다`);
  ctx.showMessage(`침대 위에 누은 ${ctx.getVarName("CALL", TARGET)}의 옷을 다정하게 벗겨주니, 오늘을 위한 승부속옷인지, 평소보다 화려한 디자인의 속옷이 드러났다`);
  ctx.showMessage(`照明の色も相まって`);
}
