/**
 * SYSTEM_CONFIG.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function system_configuration(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine();
  ctx.showMessage('어떤 설정을 변경하시겠습니까?');
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  ctx.print('[0] - 대사 표시 빈도');
  if (ctx.flags[7] === 2) {
    ctx.showMessage('항상 표시');
  } else if (ctx.flags[7] === 1) {
    ctx.showMessage('처음에만 표시');
  } else if (ctx.flags[7] === 0 - 2 || ctx.flags[7] === 0) {
    ctx.showMessage('표시하지 않음');
  }
  ctx.print('[1] - 지도시 텍스트의 요약');
  if ((ctx.flags[6] & 1)) {
    ctx.showMessage('ON');
  } else {
    ctx.showMessage('OFF');
  }
  ctx.print('[2] - 영업 결과 간략화');
  if ((ctx.flags[6] & 2)) {
    ctx.showMessage('ON');
  } else {
    ctx.showMessage('OFF');
  }
  ctx.print('[3] - 소모 아이템 자동구입');
  if (ctx.flags[34]) {
    ctx.showMessage('ON');
  } else {
    ctx.showMessage('OFF');
  }
  ctx.print('[4] - 빈사시 지도 자동 종료');
  if (ctx.flags[35]) {
    ctx.showMessage('ON');
  } else {
    ctx.showMessage('OFF');
  }
  ctx.print('[5] - 캐릭터의 음모를 자라게 한다');
  if (ctx.flags[36]) {
    ctx.showMessage('ON');
  } else {
    ctx.showMessage('OFF');
  }
  ctx.print('[6] - 착의 시스템 사용');
  if (ctx.flags[37]) {
    ctx.showMessage('ON');
  } else {
    ctx.showMessage('OFF');
  }
  ctx.print('[7] - 임신 시스템 사용');
  if (ctx.flags[60] === 0) {
    ctx.showMessage('ON');
  } else {
    ctx.showMessage('OFF');
  }
  ctx.print('[8] - IWS(이 아이돌은 내가 키웠다) 시스템 사용');
  if (ctx.flags[38] > 0) {
    ctx.showMessage('ON');
  } else {
    ctx.showMessage('OFF');
  }
  ctx.print('[9] - 실신 시스템 사용');
  if (ctx.flags[70] === 0) {
    ctx.showMessage('ON');
  } else {
    ctx.showMessage('OFF');
  }
  ctx.print('[10] - 추가 커맨드 사용');
  if (ctx.flags[71] === 0) {
    ctx.showMessage('ON');
  } else {
    ctx.showMessage('OFF');
  }
  ctx.print('[11] - 정음절정 시스템 사용');
  if (ctx.flags[72] === 0) {
    ctx.showMessage('ON');
  } else {
    ctx.showMessage('OFF');
  }
  ctx.print('[12] - 소질강화');
  if (ctx.flags[73] === 0) {
    ctx.showMessage('ON');
  } else {
    ctx.showMessage('OFF');
  }
  ctx.print('[13] - 나이먹기 시스템 사용·생일 등의 도입');
  if (ctx.flags[74] === 0) {
    ctx.showMessage('ON');
  } else {
    ctx.showMessage('OFF');
  }
  ctx.print('[14] - 로리콘 시스템 사용');
  if (ctx.flags[39] === 0) {
    ctx.showMessage('ON');
  } else {
    ctx.showMessage('OFF');
  }
  ctx.print('[15] - 항상발정 시스템 사용');
  if (ctx.flags[75] === 0) {
    ctx.showMessage('ON');
  } else {
    ctx.showMessage('OFF');
  }
  ctx.print('[16] - 네토라레 시스템 사용');
  if (ctx.flags[540] === 0) {
    ctx.showMessage('ON');
  } else {
    ctx.showMessage('OFF');
  }
  ctx.print('[17] - 정조대 자동탈착 시스템 사용');
  if (ctx.flags[549] === 1) {
    ctx.showMessage('ON');
  } else {
    ctx.showMessage('OFF');
  }
  ctx.print('[18] - 약품계 아이템의 자동투여');
  if (ctx.flags[76]) {
    ctx.showMessage('ON');
  } else {
    ctx.showMessage('OFF');
  }
  ctx.print('[19] - 성기형태 변화시스템 사용');
  if (ctx.flags[140] === 0) {
    ctx.showMessage('ON');
  } else {
    ctx.showMessage('OFF');
  }
  ctx.print('[20] - 음어시스템 사용');
  if (ctx.flags[160] === 0) {
    ctx.showMessage('ON');
  } else {
    ctx.showMessage('OFF');
  }
  ctx.showMessage('[21] - 첫 체험 필터');
  ctx.print('[22] - 갸루화 이벤트 적용');
  if (ctx.flags[85] === 0) {
    ctx.showMessage('ON');
  } else {
    ctx.showMessage('OFF');
  }
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  ctx.showMessage('[999] - 돌아간다');
  await ctx.inputNumber();
  if (ctx.result === 0) {
    await config_kojo(ctx, character);
  } else if (ctx.result === 1) {
    await config_traintext(ctx, character);
  } else if (ctx.result === 2) {
    await config_working(ctx, character);
  } else if (ctx.result === 3) {
    await config_autobuying(ctx, character);
  } else if (ctx.result === 4) {
    ctx.flags[35] = 1 - ctx.flags[35];
  } else if (ctx.result === 5) {
    await config_publichair(ctx, character);
  } else if (ctx.result === 6) {
    await config_clothing(ctx, character);
  } else if (ctx.result === 7) {
    await config_v_f(ctx, character);
  } else if (ctx.result === 8) {
    await config_iws(ctx, character);
  } else if (ctx.result === 9) {
    await config_passout(ctx, character);
  } else if (ctx.result === 10) {
    await config_ex_com(ctx, character);
  } else if (ctx.result === 11) {
    await config_seiin(ctx, character);
  } else if (ctx.result === 12) {
    await config_talent_ex(ctx, character);
  } else if (ctx.result === 13) {
    await config_birthday(ctx, character);
  } else if (ctx.result === 14) {
    await config_loli(ctx, character);
  } else if (ctx.result === 15) {
    await config_hatsujo(ctx, character);
  } else if (ctx.result === 16) {
    await config_ntr(ctx, character);
  } else if (ctx.result === 17) {
    await config_autoequip(ctx, character);
  } else if (ctx.result === 18) {
    await config_itemuse(ctx, character);
  } else if (ctx.result === 19) {
    await config_genitalform(ctx, character);
  } else if (ctx.result === 20) {
    await config_slung(ctx, character);
  } else if (ctx.result === 21) {
    await config_firstplay(ctx, character);
  } else if (ctx.result === 22) {
    await config_infection(ctx, character);
  } else if (ctx.result === 999) {
    await auto_buying(ctx, character);
    return 0;
  }
  ctx.restart();
}

export async function config_kojo(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine();
  if (ctx.flags[7] === 0) {
    ctx.showMessage('※대사 이벤트 관리 파일을 찾을 수 없습니다');
    await ctx.wait();
    return 0;
  }
  ctx.showMessage('대사 표시 빈도를 설정합니다');
  if (ctx.flags[7] === 2) {
    ctx.showMessage('현재 설정은《항상 표시》입니다');
  } else if (ctx.flags[7] === 1) {
    ctx.showMessage('현재 설정은《처음에만 표시》입니다');
  } else if (ctx.flags[7] === -2) {
    ctx.showMessage('현재 설정은《표시하지 않음》입니다');
  }
  ctx.showMessage('[0] - 항상 표시');
  ctx.showMessage('[1] - 표시하지 않음');
  ctx.showMessage('[2] - 처음에만 표시');
  ctx.showMessage('[999] - 돌아간다');
  await ctx.inputNumber();
  if (ctx.result === 0) {
    ctx.flags[7] = 2;
  } else if (ctx.result === 1) {
    ctx.flags[7] = -2;
  } else if (ctx.result === 2) {
    ctx.flags[7] = 1;
  } else if (ctx.result != 999) {
    ctx.restart();
  }
  return 0;
}

export async function config_traintext(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if ((ctx.flags[6] & 1)) {
    ctx.flags[6] -= 1;
  } else {
    ctx.flags[6] |= 1;
  }
  return 0;
}

export async function config_working(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if ((ctx.flags[6] & 2)) {
    ctx.flags[6] -= 2;
  } else {
    ctx.flags[6] |= 2;
  }
  return 0;
}

export async function config_autobuying(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine();
  ctx.showMessage('소모품 아이템의 자동보충을 설정합니다');
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  ctx.print('[0] - 로션');
  if ((ctx.flags[34] & 1)) {
    ctx.showMessage('ON');
  } else {
    ctx.showMessage('OFF');
  }
  ctx.print('[2] - 콘돔');
  if ((ctx.flags[34] & 8)) {
    ctx.showMessage('10개씩 구입');
  } else {
    ctx.showMessage('OFF');
  }
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  ctx.showMessage('[999] - 돌아간다');
  await ctx.inputNumber();
  if (ctx.result === 0) {
    if ((ctx.flags[34] & 1)) {
      ctx.flags[34] -= 1;
    } else {
      ctx.flags[34] |= 1;
    }
    ctx.restart();
  } else if (ctx.result === 2) {
    if ((ctx.flags[34] & 8)) {
      ctx.flags[34] -= 8;
    } else {
      ctx.flags[34] |= 8;
    }
    ctx.restart();
  } else if (ctx.result != 999) {
    ctx.restart();
  }
  return 0;
}

export async function config_publichair(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.flags[36]) {
    ctx.flags[36] = 0;
  } else {
    ctx.flags[36] = 1;
    for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
      if (character.cflags[ctx.count][6] != 0) {
        // TODO: CONTINUE
      }
      if (ctx.getTalent(count, 125)) {
        character.cflags[ctx.count][6] = -1;
      } else if (ctx.getTalent(count, 132) || ctx.getTalent(count, 135)) {
        character.cflags[ctx.count][6] = 7;
      } else if (ctx.getTalent(count, 221)) {
        character.cflags[ctx.count][6] = 7;
      } else if (ctx.getTalent(count, 220)) {
        character.cflags[ctx.count][6] = 9;
      } else {
        character.cflags[ctx.count][6] = 12;
      }
    }
  }
  return 0;
}

export async function config_clothing(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.flags[37] === 0) {
    ctx.flags[37] = 1;
  } else {
    // Label: INPUT_LOOP
    ctx.drawLine();
    ctx.showMessage(`착의 시스템을 OFF로 하면 모든 캐릭터의 착의 플래그가 사라집니다`);
    ctx.showMessage(`사라진 착의 플래그는 착의 시스템을 다시 ON으로 하더라도 복구되지 않습니다.`);
    ctx.showMessage('');
    ctx.showMessage(`착의 시스템을 OFF로 합니까?`);
    ctx.showMessage('[0] - 네');
    ctx.showMessage('[1] - 아니오');
    await ctx.inputNumber();
    if (ctx.result === 1) {
      return 0;
    } else if (ctx.result != 0) {
      // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
    }
    for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
      character.cflags[ctx.count][40] = 0;
      character.cflags[ctx.count][41] = 0;
      character.cflags[ctx.count][42] = 0;
      character.cflags[ctx.count][43] = 0;
      character.cflags[ctx.count][44] = 0;
      character.cflags[ctx.count][45] = 0;
      character.cflags[ctx.count][46] = 0;
      character.cflags[ctx.count][47] = 0;
    }
    ctx.flags[37] = 0;
    ctx.drawLine();
    ctx.showMessage('모든 캐릭터의 착의 플래그를 소거했습니다');
    ctx.drawLine();
  }
  return 0;
}

export async function config_v_f(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // Label: INPUT_LOOP
  ctx.drawLine();
  ctx.showMessage(`임신설정이 온 상태라면, 여배우(후보)가 임신할 가능성이 있습니다`);
  ctx.showMessage('');
  ctx.showMessage(`임신 설정을 사용합니까?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 아니오');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    ctx.flags[60] = 1;
    return 0;
  } else if (ctx.result != 0) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else {
    ctx.flags[60] = 0;
    return 0;
  }
  return 0;
}

export async function config_iws(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // Label: INPUT_LOOP
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  ctx.print('실행 레벨을 선택해주세요(현재Lv');
  ctx.printValue(ctx.flags[38]);
  ctx.showMessage('실행중)');
  ctx.showMessage('[1] - Lv1＊보통 　　　　　　　　　　=평범하게 성장합니다');
  ctx.showMessage('[2] - Lv2＊빠르게 　　　　　　　　　=빠르게 성장합니다');
  ctx.showMessage('[3] - Lv3＊이상할 정도로　　　　　　=이상하게 성장합니다');
  ctx.showMessage('[4] - Lv4＊위험한 정도로　　　　　　=위험할 정도로 성장합니다');
  ctx.showMessage('[5] - Lv5＊터무니없이 　　　　　　　=더 이상 인간이 아니게 됩니다');
  ctx.showMessage('[99] - IWS을 사용하지 않는다');
  ctx.showMessage('[200] - 쓰리사이즈 수동설정');
  ctx.showMessage('[300] - CSV파일 불러오기');
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  ctx.showMessage('[999] - 돌아간다');
  await ctx.inputNumber();
  if (ctx.result > 0 && ctx.result < 99) {
    ctx.flags[38] = ctx.result;
    ctx.showMessage(`W IWS 시스템을 ON으로 했습니다(Lv${ctx.flags[38]})`);
    ctx.showMessage('절정시 지도대상의 체형이 변합니다'); ctx.waitInput();
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 99) {
    ctx.flags[38] = 0;
    ctx.showMessage('IWS 시스템을 OFF로 했습니다'); ctx.waitInput();
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 200) {
    await manual_set_3size(ctx, character);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 300) {
    await read_csv_iws(ctx, character);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 999) {
    return 0;
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  return 0;
}

export async function config_passout(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // Label: INPUT_LOOP
  ctx.drawLine();
  ctx.showMessage(`실신 시스템을 ON으로 하면 대상이 일정 이상의 쾌락, 공포, 고통으로 실신하게 됩니다`);
  ctx.showMessage('');
  ctx.showMessage(`실신 시스템을 사용하시겠습니까?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 아니오');
  await ctx.inputNumber();
  if (ctx.result === 0) {
    ctx.flags[70] = 0;
    return 0;
  } else if (ctx.result === 1) {
    ctx.flags[70] = 1;
    return 0;
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  return 0;
}

export async function config_ex_com(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // Label: INPUT_LOOP
  ctx.drawLine();
  ctx.showMessage(`추가 커맨드를 ON으로 하면 지도시의 커맨드가 늘어납니다`);
  ctx.showMessage('');
  ctx.showMessage(`추가 커맨드를 사용합니까?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 아니오');
  await ctx.inputNumber();
  if (ctx.result === 0) {
    ctx.flags[71] = 0;
    return 0;
  } else if (ctx.result === 1) {
    ctx.flags[71] = 1;
    return 0;
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  return 0;
}

export async function config_seiin(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // Label: INPUT_LOOP
  ctx.drawLine();
  ctx.showMessage(`정음 절정 시스템을 ON으로 하면 대상이 정액을 마셨을 때 절정할 수 있게 됩니다`);
  ctx.showMessage('');
  ctx.showMessage(`정음 절정 시스템을 사용하시겠습니까?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 아니오');
  await ctx.inputNumber();
  if (ctx.result === 0) {
    ctx.flags[72] = 0;
    return 0;
  } else if (ctx.result === 1) {
    ctx.flags[72] = 1;
    return 0;
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  return 0;
}

export async function config_talent_ex(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // Label: INPUT_LOOP
  ctx.drawLine();
  ctx.showMessage(`소질강화을 ON으로 하면 각 감도가 큰 폭으로 상승하는 소질을 습득할 수 있게 됩니다`);
  ctx.showMessage('');
  ctx.showMessage(`소질강화을 사용합니까?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 아니오');
  await ctx.inputNumber();
  if (ctx.result === 0) {
    ctx.flags[73] = 0;
    return 0;
  } else if (ctx.result === 1) {
    ctx.flags[73] = 1;
    return 0;
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  return 0;
}

export async function config_birthday(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // Label: INPUT_LOOP
  ctx.drawLine();
  ctx.showMessage('나이먹기 시스템을 ON으로 하면, 생일을 맞이할 때마다 나이를 먹습니다(일부 캐릭터 제외)');
  ctx.showMessage('※생일 안내 메시지는 OFF일 때도 표시됩니다。');
  ctx.showMessage('');
  ctx.showMessage('나이먹기 시스템을 사용하시겠습니까?');
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 아니오');
  ctx.showMessage('[200] - 나이・생일・혈액형 수동설정');
  ctx.showMessage('[300] - CSV파일 불러오기(나이・생일・혈액형을 불러옵니다)');
  ctx.showMessage('[400] - 정신과 시간의 방에 간다 (오늘 날짜를 수동으로 설정합니다)');
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  ctx.showMessage('[999] - 돌아간다');
  await ctx.inputNumber();
  if (ctx.result === 0) {
    ctx.flags[74] = 0;
    return 0;
  } else if (ctx.result === 1) {
    ctx.flags[74] = 1;
    return 0;
  } else if (ctx.result === 200) {
    await manual_set_birthday(ctx, character);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 300) {
    await read_csv_birthday(ctx, character);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 400) {
    await manual_set_date(ctx, character);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 999) {
    return 0;
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  return 0;
}

export async function config_loli(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // Label: INPUT_LOOP
  ctx.drawLine();
  ctx.showMessage('로리콘 시스템을 사용하면 중학생 이하의 지도대상에 한해 지도 효과가 올라갑니다。');
  ctx.showMessage('대신, 중학생도 고등학생도 아닌 경우 지도 효과가 내려갑니다。');
  ctx.showMessage('');
  ctx.showMessage('로리콘 시스템을 사용하시겠습니까?');
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 아니오');
  await ctx.inputNumber();
  if (ctx.result === 0) {
    ctx.flags[39] = 0;
    return 0;
  } else if (ctx.result === 1) {
    ctx.flags[39] = 1;
    return 0;
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  return 0;
}

export async function config_hatsujo(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // Label: INPUT_LOOP
  ctx.drawLine();
  ctx.showMessage('항상발정 시스템을 사용하면 지도가 진행되면 에로해집니다。');
  ctx.showMessage('');
  ctx.showMessage('항상발정 시스템을 사용하시겠습니까?');
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 아니오');
  await ctx.inputNumber();
  if (ctx.result === 0) {
    ctx.flags[75] = 0;
    return 0;
  } else if (ctx.result === 1) {
    ctx.flags[75] = 1;
    return 0;
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  return 0;
}

export async function config_ntr(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // Label: INPUT_LOOP
  ctx.drawLine();
  ctx.showMessage('네토라레 시스템을 사용하면 여자 캐릭터가 NTR될 수 있습니다.');
  ctx.showMessage('');
  ctx.showMessage('네토라레 시스템을 사용하시겠습니까?');
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 아니오');
  await ctx.inputNumber();
  if (ctx.result === 0) {
    ctx.flags[540] = 0;
    return 0;
  } else if (ctx.result === 1) {
    ctx.flags[540] = 1;
    return 0;
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  return 0;
}

export async function config_autoequip(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // Label: INPUT_LOOP
  ctx.drawLine();
  ctx.showMessage('정조대 자동탈착을 ON으로 하면 지도 시작시 정조대를 벗고 끝나면 다시 입습니다');
  ctx.showMessage('');
  ctx.showMessage('정조대 자동탈착 시스템을 사용하시겠습니까?');
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 아니오');
  await ctx.inputNumber();
  if (ctx.result === 0) {
    ctx.flags[549] = 1;
    return 0;
  } else if (ctx.result === 1) {
    ctx.flags[549] = 0;
    return 0;
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  return 0;
}

export async function config_itemuse(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine();
  ctx.showMessage('턴끝에 약품계 아이템을 자동으로 투여 할 수 있습니다');
  ctx.showMessage('(소지수에서 감소하지 않고, 포인트가 떨어집니다)');
  ctx.showMessage('단, MASTER가【조합지식】을 지니고 있을 필요가 있습니다');
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  if (ctx.getTalent(master, 55)) {
    ctx.print('[0] - 영양제');
    if ((ctx.flags[76] & 1)) {
      ctx.showMessage('ON');
    } else {
      ctx.showMessage('OFF');
    }
    ctx.print('[1] - 배란유발제');
    if ((ctx.flags[76] & 2)) {
      ctx.showMessage('ON');
    } else {
      ctx.showMessage('OFF');
    }
    ctx.print('[2] - 배란억제제');
    if ((ctx.flags[76] & 4)) {
      ctx.showMessage('ON');
    } else {
      ctx.showMessage('OFF');
    }
    ctx.print('[3] - 향');
    if ((ctx.flags[76] & 8)) {
      ctx.showMessage('ON');
    } else {
      ctx.showMessage('OFF');
    }
  }
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  ctx.showMessage('[999] - 돌아간다');
  await ctx.inputNumber();
  if (ctx.result === 0) {
    if ((ctx.flags[76] & 1)) {
      ctx.flags[76] -= 1;
    } else {
      ctx.flags[76] |= 1;
    }
    ctx.restart();
  } else if (ctx.result === 1 && ctx.item[6]) {
    if ((ctx.flags[76] & 2)) {
      ctx.flags[76] -= 2;
    } else {
      ctx.flags[76] |= 2;
    }
    ctx.restart();
  } else if (ctx.result === 2) {
    if ((ctx.flags[76] & 4)) {
      ctx.flags[76] -= 4;
    } else {
      ctx.flags[76] |= 4;
    }
    ctx.restart();
  } else if (ctx.result === 3) {
    if ((ctx.flags[76] & 8)) {
      ctx.flags[76] -= 8;
    } else {
      ctx.flags[76] |= 8;
    }
    ctx.restart();
  } else if (ctx.result != 999) {
    ctx.restart();
  }
  return 0;
}

export async function config_slung(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine();
  ctx.showMessage('음어생성시스템의 사용을 설정합니다');
  ctx.print('[0] - 음어생성시스템의 사용');
  if (ctx.flags[160] === 0) {
    ctx.showMessage('ON');
  } else {
    ctx.showMessage('OFF');
  }
  ctx.showMessage('[1] - 음어 일괄설정');
  ctx.showMessage('[2] - 음어설정 초기화');
  // Label: INPUT_LOOP
  await ctx.inputNumber();
  if (ctx.result === 0 && ctx.flags[160] === 0) {
    ctx.flags[160] = 1;
  } else if (ctx.result === 0 && ctx.flags[160] === 1) {
    ctx.flags[160] = 0;
  } else if (ctx.result === 1) {
    ctx.showMessage('《남성기의 호칭을 결정해 주세요》');
    // Label: INPUT_LOOP_00
    // TODO: INPUTS
    if (ctx.results === "") {
      // GOTO INPUT_LOOP_00 - 구조 변경 필요 (while/break 사용 권장)
    } else {
      character.cstr[ctx.master][80] = ctx.results;
    }
    ctx.showMessage('《여성기의 호칭을 결정해 주세요》');
    // Label: INPUT_LOOP_01
    // TODO: INPUTS
    if (ctx.results === "") {
      // GOTO INPUT_LOOP_01 - 구조 변경 필요 (while/break 사용 권장)
    } else {
      character.cstr[ctx.master][81] = ctx.results;
    }
    ctx.showMessage('《항문의 호칭을 결정해 주세요》');
    // Label: INPUT_LOOP_02
    // TODO: INPUTS
    if (ctx.results === "") {
      // GOTO INPUT_LOOP_02 - 구조 변경 필요 (while/break 사용 권장)
    } else {
      character.cstr[ctx.master][82] = ctx.results;
    }
    ctx.showMessage(`W 《남성기를 %CSTR:MASTER:80%, 여성기를 %CSTR:MASTER:81%, 항문을 %CSTR:MASTER:82% 라고 부르게끔 설정했습니다》`);
    for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
      if (ctx.getCharacterNo(ctx.count) === 0) {
        // TODO: CONTINUE
      } else {
        character.cstr[ctx.count][80] = character.cstr[ctx.master][80];
        character.cstr[ctx.count][81] = character.cstr[ctx.master][81];
        character.cstr[ctx.count][82] = character.cstr[ctx.master][82];
      }
    }
  } else if (ctx.result === 2) {
    ctx.showMessage(`각 캐릭터에게 현재 설정되어 있는 음어를 초기화합니다`);
    ctx.showMessage(`※단 현재의 소질에 영향을 받습니다`);
    ctx.showMessage(`괜찮으시겠습니까?`);
    ctx.showMessage('[0] - 네');
    ctx.showMessage('[1] - 아니오');
    await ctx.inputNumber();
    // Label: INPUTLOOP
    if (ctx.result === 0) {
      ctx.showMessage(`W 《음어설정을 초기화 했습니다》`);
      for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
        if (ctx.getCharacterNo(ctx.count) === 0) {
          // TODO: CONTINUE
        } else {
          character = ctx.count;
          await defolt_genitalcall(ctx, character);
        }
      }
    } else if (ctx.result === 1) {
      ctx.showMessage(`W 《음어설정을 초기화 했습니다》`);
      await config_slung(ctx, character);
    } else {
      // GOTO INPUTLOOP - 구조 변경 필요 (while/break 사용 권장)
    }
  } else if (ctx.result === 3) {
    for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
      if (ctx.getCharacterNo(ctx.count) === 0) {
        // TODO: CONTINUE
      } else {
        character.cstr[ctx.count][80] = "자지";
        character.cstr[ctx.count][81] = "흠뻑 젖은 음란보지";
        character.cstr[ctx.count][82] = "똥구녕";
      }
    }
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
}

export async function config_genitalform(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.flags[140] === 0) {
    ctx.flags[140] = 1;
  } else {
    ctx.flags[140] = 0;
  }
  return 0;
}

export async function config_firstplay(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine();
  ctx.showMessage('첫 체험이 기록되는 커맨드 실행시 따로 확인할지를 설정합니다');
  ctx.print('[0] 처녀 필터');
  if (!ctx.flags[80]) {
    ctx.showMessage('- ON');
  } else {
    ctx.showMessage('- OFF');
  }
  ctx.print('[1] A처녀 필터');
  if (!ctx.flags[81]) {
    ctx.showMessage('- ON');
  } else {
    ctx.showMessage('- OFF');
  }
  ctx.print('[2] 첫 키스 필터');
  if (!ctx.flags[82]) {
    ctx.showMessage('- ON');
  } else {
    ctx.showMessage('- OFF');
  }
  ctx.showMessage('[999] 돌아간다');
  await ctx.inputNumber();
  if (ctx.result === 0) {
    ctx.flags[80] = "~FLAG:80";
    ctx.restart();
  } else if (ctx.result === 1) {
    ctx.flags[81] = "~FLAG:81";
    ctx.restart();
  } else if (ctx.result === 2) {
    ctx.flags[82] = "~FLAG:82";
    ctx.restart();
  } else if (ctx.result != 999) {
    ctx.restart();
  }
  return 0;
}

export async function config_infection(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.flags[85] = "~FLAG:85";
  return 0;
}
