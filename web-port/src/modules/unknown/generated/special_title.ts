/**
 * SPECIAL_TITLE.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function special_title_calc(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if ((character.cflags[40] >= 12 && character.cflags[40] != 64 && character.cflags[41] === 243 && ctx.talents[422] === 1)) {
    character.tflags[160] = 1;
  } else if ((character.cflags[40] >= 76 && character.cflags[41] === 99 && character.cflags[42] === 99 && character.cflags[170] === 99 && ctx.talents[87] === 1)) {
    character.tflags[160] = 1;
  } else if (((character.cflags[40] >= 12 && character.cflags[40] != 64 && character.cflags[41] === 52 && character.cflags[600] === 2 && character.cflags[602] === 11) && (character.cflags[40] >= 12 && character.cflags[41] === 52 &&  character.cflags[40] != 64 && character.cflags[600] === 3 && character.cflags[602] === 5))) {
    character.tflags[160] = 1;
  } else if ((character.cflags[40] >= 12 && character.cflags[40] != 64 && character.cflags[41] === 51 && character.cflags[600] === 2 && character.cflags[602] === 8 && ctx.talents[203] === 1 && ctx.talents[93] === 1)) {
    character.tflags[160] = 1;
  } else if ((character.cflags[40] >= 76 && character.cflags[41] === 40 && character.cflags[42] === 74 && (ctx.talents[87] === 1 || ctx.talents[432] === 1))) {
    character.tflags[160] = 1;
  } else if ((character.cflags[40] >= 76 && character.cflags[41] === 240 && character.cflags[42] === 61 && ctx.talents[432] === 1 && character.tflags[32] & 1)) {
    character.tflags[160] = 1;
  } else if ((character.cflags[40] >= 12 && character.cflags[40] != 64 && character.cflags[41] === 30 && ctx.talents[109] === 0 && ctx.talents[116] === 0)) {
    character.tflags[160] = 1;
  } else if ((character.cflags[40] >= 12 && character.cflags[40] != 64 && character.cflags[41] === 244)) {
    character.tflags[160] = 1;
  } else if ((character.tflags[180] === 1 && character.cflags[600] === 6 && character.cflags[602] === 4)) {
    character.tflags[160] = 1;
  } else if ((character.tflags[180] === 16 && character.cflags[600] === 11 && character.cflags[602] === 5)) {
    character.tflags[160] = 1;
  } else if ((character.tflags[180] === 20 && character.tflags[32] & 1 && ctx.talents[320])) {
    character.tflags[160] = 1;
  } else if ((character.tflags[180] === 8 && A[3] && B[3] && character.cflags[600] === 10 && character.cflags[602] === 5 && ctx.base[9] <= 22)) {
    character.tflags[160] = 1;
  }
  if (ctx.assi <= 0) {
    return;
  }
  if ((character.no === 1 && ctx.assi.no === 17)) {
    character.tflags[160] = 1;
  } else if (((character.no === 1 && ctx.getTalent(target, 432) === 0) && (ctx.assi.no === 15 && ctx.getTalent(target, 432) === 0))) {
    character.tflags[160] = 1;
  } else if (((character.no === 1 && ctx.getTalent(target, 432) === 0) && (ctx.assi.no === 91 && ctx.getTalent(assi, 432) === 1))) {
    character.tflags[160] = 1;
  } else if (((character.no === 91 && ctx.getTalent(target, 432) === 1) && (ctx.assi.no === 1 && ctx.getTalent(assi, 432) === 0))) {
    character.tflags[160] = 1;
  } else if (((character.no === 15 && ctx.getTalent(target, 432) === 0) && (ctx.assi.no === 1 && ctx.getTalent(target, 432) === 0))) {
    character.tflags[160] = 1;
  } else if ((character.no === 17 && ctx.assi.no === 1)) {
    character.tflags[160] = 1;
  } else if ((character.no === 3 && ctx.assi.no === 20)) {
    character.tflags[160] = 1;
  } else if ((character.no === 20 && ctx.assi.no === 3)) {
    character.tflags[160] = 1;
  } else if ((character.no === 4 && ctx.assi.no === 6)) {
    character.tflags[160] = 1;
  } else if ((character.no === 6 && ctx.assi.no === 4)) {
    character.tflags[160] = 1;
  } else if ((character.no === 5 && ctx.assi.no === 26)) {
    character.tflags[160] = 1;
  } else if ((character.no === 26 && ctx.assi.no === 5)) {
    character.tflags[160] = 1;
  } else if ((character.no === 7 && ctx.assi.no === 8)) {
    character.tflags[160] = 1;
  } else if ((character.no === 8 && ctx.assi.no === 7)) {
    character.tflags[160] = 1;
  } else if ((character.no === 9 && ctx.assi.no === 86)) {
    character.tflags[160] = 1;
  } else if ((character.no === 86 && ctx.assi.no === 9)) {
    character.tflags[160] = 1;
  } else if ((character.no === 10 && ctx.assi.no === 75)) {
    character.tflags[160] = 1;
  } else if ((character.no === 75 && ctx.assi.no === 10)) {
    character.tflags[160] = 1;
  } else if ((character.no === 11 && ctx.assi.no === 26)) {
    character.tflags[160] = 1;
  } else if ((character.no === 26 && ctx.assi.no === 11)) {
    character.tflags[160] = 1;
  } else if ((character.no === 25 && ctx.assi.no === 29)) {
    character.tflags[160] = 1;
  } else if ((character.no === 29 && ctx.assi.no === 25)) {
    character.tflags[160] = 1;
  } else if ((character.no === 27 && ctx.assi.no === 28)) {
    character.tflags[160] = 1;
  } else if ((character.no === 28 && ctx.assi.no === 27)) {
    character.tflags[160] = 1;
  } else if ((character.no === 80 && ctx.assi.no === 997)) {
    character.tflags[160] = 1;
  } else if ((character.no === 997 && ctx.assi.no === 80)) {
    character.tflags[160] = 1;
  } else if ((character.no === 32 && ctx.assi.no === 33)) {
    character.tflags[160] = 1;
  } else if ((character.no === 33 && ctx.assi.no === 32)) {
    character.tflags[160] = 1;
  } else if ((character.no === 34 && ctx.assi.no === 36)) {
    character.tflags[160] = 1;
  } else if ((character.no === 36 && ctx.assi.no === 34)) {
    character.tflags[160] = 1;
  } else if ((character.no === 95 && ctx.assi.no === 10)) {
    character.tflags[160] = 1;
  } else if ((character.no === 10 && ctx.assi.no === 95)) {
    character.tflags[160] = 1;
  } else if ((character.no === 22 && ctx.assi.no === 35)) {
    character.tflags[160] = 1;
  } else if ((character.no === 35 && ctx.assi.no === 22)) {
    character.tflags[160] = 1;
  } else if ((character.no === 5 && ctx.assi.no === 13)) {
    character.tflags[160] = 1;
  } else if ((character.no === 13 && ctx.assi.no === 5)) {
    character.tflags[160] = 1;
  } else if ((character.no === 15 && ctx.assi.no === 85)) {
    character.tflags[160] = 1;
  } else if ((character.no === 85 && ctx.assi.no === 15)) {
    character.tflags[160] = 1;
  } else if ((character.no === 9 && ctx.assi.no === 96)) {
    character.tflags[160] = 1;
  } else if ((character.no === 96 && ctx.assi.no === 9)) {
    character.tflags[160] = 1;
  } else if ((character.no === 200 && ctx.assi.no === 4)) {
    character.tflags[160] = 1;
  } else if ((character.no === 4 && ctx.assi.no === 200)) {
    character.tflags[160] = 1;
  } else if ((character.no === 5 && ctx.assi.no === 18)) {
    character.tflags[160] = 1;
  } else if ((character.no === 18 && ctx.assi.no === 5)) {
    character.tflags[160] = 1;
  } else if ((character.no === 93 && ctx.assi.no === 32)) {
    character.tflags[160] = 1;
  } else if ((character.no === 32 && ctx.assi.no === 93)) {
    character.tflags[160] = 1;
  } else if ((character.no === 93 && ctx.assi.no === 33)) {
    character.tflags[160] = 1;
  } else if ((character.no === 33 && ctx.assi.no === 93)) {
    character.tflags[160] = 1;
  } else if ((character.no === 202 && ctx.assi.no === 37)) {
    character.tflags[160] = 1;
  } else if ((character.no === 37 && ctx.assi.no === 202)) {
    character.tflags[160] = 1;
  } else if ((character.no === 87 && ctx.assi.no === 14)) {
    character.tflags[160] = 1;
  } else if ((character.no === 14 && ctx.assi.no === 87)) {
    character.tflags[160] = 1;
  } else if ((character.no === 39 && ctx.assi.no === 203)) {
    character.tflags[160] = 1;
  } else if ((character.no === 203 && ctx.assi.no === 39)) {
    character.tflags[160] = 1;
  } else if ((character.no === 41 && ctx.assi.no === 43)) {
    character.tflags[160] = 1;
  } else if ((character.no === 43 && ctx.assi.no === 41)) {
    character.tflags[160] = 1;
  } else if ((character.no === 23 && ctx.assi.no === 97)) {
    character.tflags[160] = 1;
  } else if ((character.no === 97 && ctx.assi.no === 23)) {
    character.tflags[160] = 1;
  } else if ((character.no === 10 && ctx.assi.no === 97)) {
    character.tflags[160] = 1;
  } else if ((character.no === 97 && ctx.assi.no === 10)) {
    character.tflags[160] = 1;
  } else if ((character.no === 98 && ctx.assi.no === 211)) {
    character.tflags[160] = 1;
  } else if ((character.no === 211 && ctx.assi.no === 98)) {
    character.tflags[160] = 1;
  } else if ((character.no === 15 && ctx.assi.no === 212)) {
    character.tflags[160] = 1;
  } else if ((character.no === 212 && ctx.assi.no === 15)) {
    character.tflags[160] = 1;
  } else if ((character.no === 14 && ctx.assi.no === 205)) {
    character.tflags[160] = 1;
  } else if ((character.no === 205 && ctx.assi.no === 14)) {
    character.tflags[160] = 1;
  } else if ((character.no === 81 && ctx.assi.no === 84)) {
    character.tflags[160] = 1;
  } else if ((character.no === 84 && ctx.assi.no === 81)) {
    character.tflags[160] = 1;
  } else if ((character.no === 9 && ctx.assi.no === 81)) {
    character.tflags[160] = 1;
  } else if ((character.no === 81 && ctx.assi.no === 9)) {
    character.tflags[160] = 1;
  } else if ((character.no === 17 && ctx.assi.no === 92)) {
    character.tflags[160] = 1;
  } else if ((character.no === 92 && ctx.assi.no === 17)) {
    character.tflags[160] = 1;
  } else if ((character.no === 17 && ctx.assi.no === 19)) {
    character.tflags[160] = 1;
  } else if ((character.no === 19 && ctx.assi.no === 17)) {
    character.tflags[160] = 1;
  } else if ((character.no === 1 && ctx.talents[211] === 1 && ctx.talents[83] === 1 && character.cflags[41] === 241 && character.cflags[40] === 76 && character.cflags[42] === 85)) {
    character.tflags[160] = 1;
  } else if ((character.no === 2 && ctx.assi.no === 107)) {
    character.tflags[160] = 1;
  } else if ((character.no === 107 && ctx.assi.no === 2)) {
    character.tflags[160] = 1;
  } else if ((ctx.talents[220] === 1 && ctx.talents[432] === 1 && ctx.getTalent(assi, 220) === 1 && ctx.getTalent(assi, 432) === 1)) {
    character.tflags[160] = 1;
  } else if (F & 128) {
    character.tflags[160] = 1;
  }
}

export async function special_title_decide_debut(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if ((character.cflags[40] >= 12 && character.cflags[40] != 64  && character.cflags[41] === 243 && ctx.talents[422] === 1)) {
    ctx.showMessage(`Arabian Rave Night ~BLACK ANOTHER EX-HARD HARD HARD!!~`);
    ctx.cstr[13] = "Arabian Rave Night　~BLACK ANOTHER EX-HARD HARD HARD!!~";
  } else if ((character.cflags[40] >= 76 && character.cflags[41] === 99 && character.cflags[42] === 99 && character.cflags[170] === 99 && ctx.talents[87] === 1)) {
    ctx.showMessage(`돌격! 유리 니삭스 공주!　~어째서 이렇게 된 거야~`);
    ctx.cstr[13] = "돌격! 유리 니삭스 공주!　~어째서 이렇게 된 거야~";
  } else if (((character.cflags[40] >= 12 && character.cflags[40] != 64 && character.cflags[41] === 52 && character.cflags[600] === 2 && character.cflags[602] === 4) && (character.cflags[40] >= 12 && character.cflags[41] === 52 &&  character.cflags[40] != 64 && character.cflags[600] === 3 && character.cflags[602] === 5))) {
    ctx.showMessage(`금지된 장난　~성소녀영역, 음욕의 앨리스・게임~`);
    ctx.cstr[13] = "금지된 장난　~성소녀영역, 음욕의 앨리스・게임~";
  } else if ((character.cflags[40] >= 12 && character.cflags[40] != 64 && character.cflags[41] === 51 && character.cflags[600] === 2 && character.cflags[602] === 8 && ctx.talents[203] === 1 && ctx.talents[93] === 1)) {
    ctx.showMessage(`초은하 아이돌 총감사제!　~내 보○에 정액을 잔뜩 투표해줘~`);
    ctx.cstr[13] = "초은하 아이돌 총감사제!　~내 보○에 정액을 잔뜩 투표해줘~";
  } else if ((character.cflags[40] >= 76 && character.cflags[41] === 40 && character.cflags[42] === 74 && (ctx.talents[87] === 1 || ctx.talents[432] === 1))) {
    ctx.showMessage(`PREMIUM BAD GIRLS　~네 정액, %타겟이(1)% 전부 뽑・아・줄・게☆~`);
    ctx.cstr[13] = "PREMIUM BAD GIRLS　~네 정액, %타겟이(1)% 전부 뽑・아・줄・게☆~";
  } else if ((character.cflags[40] >= 76 && character.cflags[41] === 240 && character.cflags[42] === 61 && ctx.talents[432] === 1 && character.tflags[32] & 1)) {
    ctx.showMessage(`Princess Bride! 　~제발 제 처음을 받아주세요, 서방님~`);
    ctx.cstr[13] = "Princess Bride! 　~제발 제 처음을 받아주세요, 서방님~";
  } else if ((character.cflags[40] >= 12 && character.cflags[40] != 64 && character.cflags[41] === 30 && ctx.talents[109] === 0 && ctx.talents[116] === 0)) {
    ctx.showMessage(`방과후 티슈타임　~그것이 내 X-Plan~`);
    ctx.cstr[13] = "방과후 티슈타임　~그것이 내 X-Plan~";
  } else if ((character.cflags[40] >= 12 && character.cflags[40] != 64 && character.cflags[41] === 244)) {
    ctx.showMessage(`학교수영복H。 ~${ctx.getVarName("NICK", TARGET)}~`);
    ctx.cstr[13] = "학교수영복H。 ~%NICKNAME:TARGET%~";
  } else if ((character.tflags[180] === 1 && character.cflags[600] === 6 && character.cflags[602] === 4)) {
    ctx.showMessage(`전자의 가희・음욕에 떨어져　~하츠네 ○쿠의 욕정~`);
    ctx.cstr[13] = "전자의 가희・음욕에 떨어져　~하츠네 ○쿠의 욕정~";
  } else if ((character.tflags[180] === 16 && character.cflags[600] === 11 && character.cflags[602] === 5)) {
    ctx.showMessage(`Angel Bitch!　~천사짱 진짜 엣찌~`);
    ctx.cstr[13] = "Angel Bitch!　~천사짱 진짜 엣찌~";
  } else if ((character.tflags[180] === 20 && character.tflags[32] & 1 && ctx.talents[320])) {
    ctx.showMessage(`노을빛으로 물드는 처녀혈・하드코어 ~처녀상실이에요, 오빠~`);
    ctx.cstr[13] = "노을빛으로 물드는 처녀혈・하드코어 ~처녀상실이에요, 오빠~";
  } else if ((character.tflags[180] === 8 && A[3] && B[3] && character.cflags[600] === 10 && character.cflags[602] === 5 && ctx.base[9] <= 22)) {
    ctx.showMessage(`누드 아웃・오프라인 ~항명기사단・미소녀부단장의 하드 애널퍽~`);
    ctx.cstr[13] = "누드 아웃・오프라인 ~항명기사단・미소녀부단장의 하드 애널퍽~";
  }
  if (ctx.assi <= 0) {
    return;
  }
  if ((character.no === 1 && ctx.assi.no === 17)) {
    ctx.showMessage(`노예자매능욕 ~음욕에 빠지는 미소녀자매~`);
    ctx.cstr[13] = "노예자매능욕 ~음욕에 빠지는 미소녀자매~";
  } else if (((character.no === 1 && ctx.getTalent(target, 432) === 0) && (ctx.assi.no === 15 && ctx.getTalent(assi, 432) === 0))) {
    ctx.showMessage(`Lily's Garden ~청초한 흑발 미소녀들의 비밀의 백합정원~`);
    ctx.cstr[13] = "Lily\'s Garden ~청초한 흑발 미소녀들의 비밀의 백합정원~";
  } else if (((character.no === 1 && ctx.getTalent(target, 432) === 0) && (ctx.assi.no === 91 && ctx.getTalent(assi, 432) === 1))) {
    ctx.showMessage(`거울 속의 또 한명의 나 ~GIRL IN THE MIRROR~`);
    ctx.cstr[13] = "거울 속의 또 한명의 나 ~GIRL IN THE MIRROR~";
  } else if (((character.no === 91 && ctx.getTalent(target, 432) === 1) && (ctx.assi.no === 1 && ctx.getTalent(assi, 432) === 0))) {
    ctx.showMessage(`거울 속의 또 한명의 나 ~GIRL IN THE MIRROR~`);
    ctx.cstr[13] = "거울 속의 또 한명의 나 ~GIRL IN THE MIRROR~";
  } else if (((character.no === 15 && ctx.getTalent(target, 432) === 0) && (ctx.assi.no === 1 && ctx.getTalent(assi, 432) === 0))) {
    ctx.showMessage(`Lily's Garden ~청초한 흑발 미소녀들의 비밀의 백합정원~`);
    ctx.cstr[13] = "Lily\'s Garden ~청초한 흑발 미소녀들의 비밀의 백합정원~";
  } else if ((character.no === 17 && ctx.assi.no === 1)) {
    ctx.showMessage(`노예자매능욕 ~음욕에 빠지는 미소녀자매~`);
    ctx.cstr[13] = "노예자매능욕 ~음욕에 빠지는 미소녀자매~";
  } else if ((character.no === 3 && ctx.assi.no === 20)) {
    ctx.showMessage(`흑백갸루 대난교　~Sex on the bitch!~`);
    ctx.cstr[13] = "흑백갸루 대난교　~Sex on the bitch!~";
  } else if ((character.no === 20 && ctx.assi.no === 3)) {
    ctx.showMessage(`흑백갸루 대난교　~Sex on the bitch!~`);
    ctx.cstr[13] = "흑백갸루 대난교　~Sex on the bitch!~";
  } else if ((character.no === 4 && ctx.assi.no === 6)) {
    ctx.showMessage(`유한 세레브자매　~유부녀 언니가 동생을 음란교육~`);
    ctx.cstr[13] = "유한 세레브자매　~유부녀 언니가 동생을 음란교육~";
  } else if ((character.no === 6 && ctx.assi.no === 4)) {
    ctx.showMessage(`유한 세레브자매　~유부녀 언니가 동생을 음란교육~`);
    ctx.cstr[13] = "유한 세레브자매　~유부녀 언니가 동생을 음란교육~";
  } else if ((character.no === 5 && ctx.assi.no === 26)) {
    ctx.showMessage(`W로리타 백탁절임　~이렇게 잔뜩 나오면 빠져버려~`);
    ctx.cstr[13] = "W로리타 백탁절임　~이렇게 잔뜩 나오면 빠져버려~";
  } else if ((character.no === 26 && ctx.assi.no === 5)) {
    ctx.showMessage(`W로리타 백탁절임　~이렇게 잔뜩 나오면 빠져버려~`);
    ctx.cstr[13] = "W로리타 백탁절임　~이렇게 잔뜩 나오면 빠져버려~";
  } else if ((character.no === 7 && ctx.assi.no === 8)) {
    ctx.showMessage(`백합미소녀 상간　~자매만의 비밀 엣찌 들켜버렸습니다~`);
    ctx.cstr[13] = "백합미소녀 상간　~자매만의 비밀 엣찌 들켜버렸습니다~";
  } else if ((character.no === 8 && ctx.assi.no === 7)) {
    ctx.showMessage(`백합미소녀 상간　~자매만의 비밀 엣찌 들켜버렸습니다~`);
    ctx.cstr[13] = "백합미소녀 상간　~자매만의 비밀 엣찌 들켜버렸습니다~";
  } else if ((character.no === 9 && ctx.assi.no === 86)) {
    ctx.showMessage(`PARADISE LOST　~실낙원의 자매공주~`);
    ctx.cstr[13] = "PARADISE LOST　~실낙원의 자매공주~";
  } else if ((character.no === 86 && ctx.assi.no === 9)) {
    ctx.showMessage(`PARADISE LOST　~실낙원의 자매공주~`);
    ctx.cstr[13] = "PARADISE LOST　~실낙원의 자매공주~";
  } else if ((character.no === 10 && ctx.assi.no === 75)) {
    ctx.showMessage(`음욕에 물드는 학생회실　~엘리트 아가씨는 정액투성이~`);
    ctx.cstr[13] = "음욕에 물드는 학생회실　~엘리트 아가씨는 정액투성이~";
  } else if ((character.no === 75 && ctx.assi.no === 10)) {
    ctx.showMessage(`음욕에 물드는 학생회실　~엘리트 아가씨는 정액투성이~`);
    ctx.cstr[13] = "음욕에 물드는 학생회실　~엘리트 아가씨는 정액투성이~";
  } else if ((character.no === 11 && ctx.assi.no === 26)) {
    ctx.showMessage(`코킹호스☆랩소디　~진한 정액짜내기♪~`);
    ctx.cstr[13] = "코킹호스☆랩소디　~진한 정액짜내기♪~";
  } else if ((character.no === 26 && ctx.assi.no === 11)) {
    ctx.showMessage(`코킹호스☆랩소디　~진한 정액짜내기♪~`);
    ctx.cstr[13] = "코킹호스☆랩소디　~진한 정액짜내기♪~";
  } else if ((character.no === 25 && ctx.assi.no === 29)) {
    ctx.showMessage(`배덕의 수녀 절정지옥　~하느님, 용서해 주세요~`);
    ctx.cstr[13] = "배덕의 수녀 절정지옥　~하느님, 용서해 주세요~";
  } else if ((character.no === 29 && ctx.assi.no === 25)) {
    ctx.showMessage(`발정 수녀・성당의 검은 미사　~마리아님께 보이고 있어~`);
    ctx.cstr[13] = "발정 수녀・성당의 검은 미사　~마리아님께 보이고 있어~";
  } else if ((character.no === 27 && ctx.assi.no === 28)) {
    ctx.showMessage(`SPERMA Capter Cherry　~정자 불법소지죄로 체포합니다!~`);
    ctx.cstr[13] = "SPERMA Capter Cherry　~정자 불법소지죄로 체포합니다!~";
  } else if ((character.no === 28 && ctx.assi.no === 27)) {
    ctx.showMessage(`SPERMA Capter Cherry　~정자 불법소지죄로 체포합니다!~`);
    ctx.cstr[13] = "SPERMA Capter Cherry　~정자 불법소지죄로 체포합니다!~";
  } else if ((character.no === 80 && ctx.assi.no === 997)) {
    ctx.showMessage(`닮은꼴!!　국민 아이돌 꿈의 더블캐스트! ~미○로＆유○~`);
    ctx.cstr[13] = "닮은꼴!!　국민 아이돌 꿈의 더블캐스트! ~미○로＆유○~";
  } else if ((character.no === 997 && ctx.assi.no === 80)) {
    ctx.showMessage(`닮은꼴!!　국민 아이돌 꿈의 더블캐스트! ~미○로＆유○~`);
    ctx.cstr[13] = "닮은꼴!!　국민 아이돌 꿈의 더블캐스트! ~미○로＆유○~";
  } else if ((character.no === 32 && ctx.assi.no === 33)) {
    ctx.showMessage(`미인자매・비밀의 의사놀이　~언니, 콩이 지릿지릿해~`);
    ctx.cstr[13] = "미인자매・비밀의 의사놀이　~언니, 콩이 지릿지릿해~";
  } else if ((character.no === 33 && ctx.assi.no === 32)) {
    ctx.showMessage(`미인자매・비밀의 의사놀이　~언니, 콩이 지릿지릿해~`);
    ctx.cstr[13] = "미인자매・비밀의 의사놀이　~언니, 콩이 지릿지릿해~";
  } else if ((character.no === 34 && ctx.assi.no === 36)) {
    ctx.showMessage(`음란 바람소녀　~남친을 배신하고 AV나와버렸습니다~`);
    ctx.cstr[13] = "음란 바람소녀　~남친을 배신하고 AV나와버렸습니다~";
  } else if ((character.no === 36 && ctx.assi.no === 34)) {
    ctx.showMessage(`음란 바람소녀　~남친을 배신하고 AV나와버렸습니다~`);
    ctx.cstr[13] = "음란 바람소녀　~남친을 배신하고 AV나와버렸습니다~";
  } else if ((character.no === 95 && ctx.assi.no === 10)) {
    ctx.showMessage(`기모노자매・더러워진 다다미방　~엄마? 아니, 사실 언니죠?w~`);
    ctx.cstr[13] = "기모노자매・더러워진 다다미방　~엄마? 아니, 사실 언니죠?w~";
  } else if ((character.no === 10 && ctx.assi.no === 95)) {
    ctx.showMessage(`기모노자매・더러워진 다다미방　~짐승의 방~`);
    ctx.cstr[13] = "기모노자매・더러워진 다다미방　~짐승의 방~";
  } else if ((character.no === 22 && ctx.assi.no === 35)) {
    ctx.showMessage(`미소녀자매・사랑의 과외수업! ~남자를 가르쳐주세요~`);
    ctx.cstr[13] = "미소녀자매・사랑의 과외수업! ~남자를 가르쳐주세요~";
  } else if ((character.no === 35 && ctx.assi.no === 22)) {
    ctx.showMessage(`소악마☆리틀 시스터　~언니, 엣찌를 가르쳐줄게~`);
    ctx.cstr[13] = "소악마☆리틀 시스터　~언니, 엣찌를 가르쳐줄게~";
  } else if ((character.no === 5 && ctx.assi.no === 13)) {
    ctx.showMessage(`육식소녀　동정・강탈!　~여장남자가 흘낏흘낏 쳐다봐서 먹어버렸습니다~`);
    ctx.cstr[13] = "육식소녀　동정・강탈!　~여장남자가 흘낏흘낏 쳐다봐서 먹어버렸습니다~";
  } else if ((character.no === 13 && ctx.assi.no === 5)) {
    ctx.showMessage(`육식소녀　동정・강탈!　~여장남자가 흘낏흘낏 쳐다봐서 먹어버렸습니다~`);
    ctx.cstr[13] = "육식소녀　동정・강탈!　~여장남자가 흘낏흘낏 쳐다봐서 먹어버렸습니다~";
  } else if ((character.no === 15 && ctx.assi.no === 85)) {
    ctx.showMessage(`아아 천사님　~천사와 무녀의 동서양결합 SEX풀코스~`);
    ctx.cstr[13] = "아아 천사님　~천사와 무녀의 동서양결합 SEX풀코스~";
  } else if ((character.no === 85 && ctx.assi.no === 15)) {
    ctx.showMessage(`아아 천사님　~천사와 무녀의 동서양결합 SEX풀코스~`);
    ctx.cstr[13] = "아아 천사님　~천사와 무녀의 동서양결합 SEX풀코스~";
  } else if ((character.no === 9 && ctx.assi.no === 96)) {
    ctx.showMessage(`탐정귀족・하극상SEX　~여탐정이 주인의 그곳을 강제수색~`);
    ctx.cstr[13] = "탐정귀족・하극상SEX　~여탐정이 주인의 그곳을 강제수색~";
  } else if ((character.no === 96 && ctx.assi.no === 9)) {
    ctx.showMessage(`공주님 폭주!　~국민의 암캐구멍은 나의 것~`);
    ctx.cstr[13] = "공주님 폭주!　~국민의 암캐구멍은 나의 것~";
  } else if ((character.no === 200 && ctx.assi.no === 4)) {
    ctx.showMessage(`미소녀 아가씨・비밀의 오후　~음락의 화원~`);
    ctx.cstr[13] = "미소녀 아가씨・비밀의 오후　~음락의 화원~";
  } else if ((character.no === 4 && ctx.assi.no === 200)) {
    ctx.showMessage(`미소녀 아가씨・비밀의 오후　~음락의 화원~`);
    ctx.cstr[13] = "미소녀 아가씨・비밀의 오후　~음락의 화원~";
  } else if ((character.no === 5 && ctx.assi.no === 18)) {
    ctx.showMessage(`일미대결! 미소녀 코스프레이어　~에로는 세계의 공통언어~`);
    ctx.cstr[13] = "일미대결! 미소녀 코스프레이어　~에로는 세계의 공통언어~";
  } else if ((character.no === 18 && ctx.assi.no === 5)) {
    ctx.showMessage(`일미대결! 미소녀 코스프레이어　~에로는 세계의 공통언어~`);
    ctx.cstr[13] = "일미대결! 미소녀 코스프레이어　~에로는 세계의 공통언어~";
  } else if ((character.no === 93 && ctx.assi.no === 32)) {
    ctx.showMessage(`동물귀 난무!　~동물귀 아가씨를 뒤어세도 앞에서도~`);
    ctx.cstr[13] = "동물귀 난무!　~동물귀 아가씨를 뒤어세도 앞에서도~";
  } else if ((character.no === 32 && ctx.assi.no === 93)) {
    ctx.showMessage(`동물귀 난무!　~동물귀 아가씨를 뒤어세도 앞에서도~`);
    ctx.cstr[13] = "동물귀 난무!　~동물귀 아가씨를 뒤어세도 앞에서도~";
  } else if ((character.no === 93 && ctx.assi.no === 33)) {
    ctx.showMessage(`동물귀 아가씨・정액chuchu　~오늘도 잔뜩 봉사하겠멍~`);
    ctx.cstr[13] = "동물귀 아가씨・정액chuchu　~오늘도 잔뜩 봉사하겠멍~";
  } else if ((character.no === 33 && ctx.assi.no === 93)) {
    ctx.showMessage(`동물귀 아가씨・정액chuchu　~오늘도 잔뜩 봉사하겠멍~`);
    ctx.cstr[13] = "동물귀 아가씨・정액chuchu　~오늘도 잔뜩 봉사하겠멍~";
  } else if ((character.no === 202 && ctx.assi.no === 37)) {
    ctx.showMessage(`인기 걸밴드・강간제!　~우리들의 그곳이 모에모에 큥~`);
    ctx.cstr[13] = "인기 걸밴드・강간제!　~우리들의 그곳이 모에모에 큥~";
  } else if ((character.no === 37 && ctx.assi.no === 202)) {
    ctx.showMessage(`인기 걸밴드・강간제!　~우리들의 그곳이 모에모에 큥~`);
    ctx.cstr[13] = "인기 걸밴드・강간제!　~우리들의 그곳이 모에모에 큥~";
  } else if ((character.no === 87 && ctx.assi.no === 14)) {
    ctx.showMessage(`발정 캣파이트　~절정지옥 3판승부~`);
    ctx.cstr[13] = "발정 캣파이트　~절정지옥 3판승부~";
  } else if ((character.no === 14 && ctx.assi.no === 87)) {
    ctx.showMessage(`발정 캣파이트2　~육덕진 팬티레슬링~`);
    ctx.cstr[13] = "발정 캣파이트2　~육덕진 팬티레슬링~";
  } else if ((character.no === 39 && ctx.assi.no === 203)) {
    ctx.showMessage(`여○생 민감 포인트　~비밀의 성기지도 해주세요~`);
    ctx.cstr[13] = "여○생 민감 포인트　~비밀의 성기지도 해주세요~";
  } else if ((character.no === 203 && ctx.assi.no === 39)) {
    ctx.showMessage(`여○생 민감 포인트　~비밀의 성기지도 해주세요~`);
    ctx.cstr[13] = "여○생 민감 포인트　~비밀의 성기지도 해주세요~";
  } else if ((character.no === 41 && ctx.assi.no === 43)) {
    ctx.showMessage(`절정에로심포니　~여학교 아가씨・당신의 색으로 물들여 주세요~`);
    ctx.cstr[13] = "절정에로심포니　~여학교 아가씨・당신의 색으로 물들여 주세요~";
  } else if ((character.no === 43 && ctx.assi.no === 41)) {
    ctx.showMessage(`절정에로심포니　~여학교 아가씨・당신의 색으로 물들여 주세요~`);
    ctx.cstr[13] = "절정에로심포니　~여학교 아가씨・당신의 색으로 물들여 주세요~";
  } else if ((character.no === 23 && ctx.assi.no === 97)) {
    ctx.showMessage(`어떤 AV의 촬영풍경　~절정천국으로 레벨업이랍니다~`);
    ctx.cstr[13] = "어떤 AV의 촬영풍경　~절정천국으로 레벨업이랍니다~";
  } else if ((character.no === 97 && ctx.assi.no === 23)) {
    ctx.showMessage(`어떤 AV의 촬영풍경　~절정천국으로 레벨업이랍니다~`);
    ctx.cstr[13] = "어떤 AV의 촬영풍경　~절정천국으로 레벨업이랍니다~";
  } else if ((character.no === 10 && ctx.assi.no === 97)) {
    ctx.showMessage(`저지먼트랍니다!　~언니의 치마안을 조사해보겠사옵니다~`);
    ctx.cstr[13] = "저지먼트랍니다!　~언니의 치마안을 조사해보겠사옵니다~";
  } else if ((character.no === 97 && ctx.assi.no === 10)) {
    ctx.showMessage(`저지먼트랍니다!　~언니에게 벌을 받아 버린겁니다~`);
    ctx.cstr[13] = "저지먼트랍니다!　~언니에게 벌을 받아 버린겁니다~";
  } else if ((character.no === 98 && ctx.assi.no === 211)) {
    ctx.showMessage(`진심유리!!　~인기 카리스마 모델을 닮은 언니가 여동생을 음행해서 대사건!!~`);
    ctx.cstr[13] = "진심유리!!　~인기 카리스마 모델을 닮은 언니가 여동생을 음행해서 대사건!!~";
  } else if ((character.no === 211 && ctx.assi.no === 98)) {
    ctx.showMessage(`진심유리!!　~인기 카리스마 모델을 닮은 언니가 여동생을 음행해서 대사건!!~`);
    ctx.cstr[13] = "진심유리!!　~인기 카리스마 모델을 닮은 언니가 여동생을 음행해서 대사건!!~";
  } else if ((character.no === 15 && ctx.assi.no === 212)) {
    ctx.showMessage(`음란 무녀님 신락부!!　~우리의 엣찌를 신님께 봉납합니다~`);
    ctx.cstr[13] = "음란 무녀님 신락부!!　~우리의 엣찌를 신님께 봉납합니다~";
  } else if ((character.no === 212 && ctx.assi.no === 15)) {
    ctx.showMessage(`음란 무녀님 신락부!!　~우리의 엣찌를 신님께 봉납합니다~`);
    ctx.cstr[13] = "음란 무녀님 신락부!!　~우리의 엣찌를 신님께 봉납합니다~";
  } else if ((character.no === 14 && ctx.assi.no === 205)) {
    ctx.showMessage(`사무라이 걸VS미소녀 닌자　~일본풍 엣찌 십번승부!~`);
    ctx.cstr[13] = "사무라이 걸VS미소녀 닌자　~일본풍 엣찌 십번승부!~";
  } else if ((character.no === 205 && ctx.assi.no === 14)) {
    ctx.showMessage(`사무라이 걸VS미소녀 닌자　~일본풍 엣찌 십번승부!~`);
    ctx.cstr[13] = "사무라이 걸VS미소녀 닌자　~일본풍 엣찌 십번승부!~";
  } else if ((character.no === 81 && ctx.assi.no === 84)) {
    ctx.showMessage(`한여름 밤의 음마　~섹시 음마가 당신의 자○를 짜낸다~`);
    ctx.cstr[13] = "한여름 밤의 음마　~섹시 음마가 당신의 자○를 짜낸다~";
  } else if ((character.no === 84 && ctx.assi.no === 81)) {
    ctx.showMessage(`한여름 밤의 음마　~섹시 음마가 당신의 자○를 짜낸다~`);
    ctx.cstr[13] = "한여름 밤의 음마　~섹시 음마가 당신의 자○를 짜낸다~";
  } else if ((character.no === 9 && ctx.assi.no === 81)) {
    ctx.showMessage(`Princess Lovers!　~2명의 내가 사랑해줄게~`);
    ctx.cstr[13] = "Princess Lovers!　~2명의 내가 사랑해줄게~";
  } else if ((character.no === 81 && ctx.assi.no === 9)) {
    ctx.showMessage(`Princess Lovers!　~2명의 내가 사랑해줄게~`);
    ctx.cstr[13] = "Princess Lovers!　~2명의 내가 사랑해줄게~";
  } else if ((character.no === 17 && ctx.assi.no === 92)) {
    ctx.showMessage(`Marionette Company　~로봇소녀 정액탱크~`);
    ctx.cstr[13] = "Marionette Company　~로봇소녀 정액탱크~";
  } else if ((character.no === 92 && ctx.assi.no === 17)) {
    ctx.showMessage(`Marionette Company　~로봇소녀 정액탱크~`);
    ctx.cstr[13] = "Marionette Company　~로봇소녀 정액탱크~";
  } else if ((character.no === 17 && ctx.assi.no === 19)) {
    ctx.showMessage(`Saver Marionette　~우리들이 당신의 고간의 구세주~`);
    ctx.cstr[13] = "Saver Marionette　~우리들이 당신의 고간의 구세주~";
  } else if ((character.no === 19 && ctx.assi.no === 17)) {
    ctx.showMessage(`Saver Marionette　~우리들이 당신의 고간의 구세주~`);
    ctx.cstr[13] = "Saver Marionette　~우리들이 당신의 고간의 구세주~";
  } else if ((character.no === 1 && ctx.talents[211] === 1 && ctx.talents[83] === 1 && character.cflags[41] === 241 && character.cflags[40] === 76 && character.cflags[42] === 85)) {
    ctx.showMessage(`Queen's Pride　~내 여동생은 새드 여왕님~`);
    ctx.cstr[13] = "Queen\'s Pride　~내 여동생은 새드 여왕님~";
  } else if ((character.no === 2 && ctx.assi.no === 107)) {
    ctx.showMessage(`성기제전! 음란한 보○픽 개막 ~우리들의 보○를 응원해줘!~`);
    ctx.cstr[13] = "성기제전! 음란한 보○픽 개막 ~우리들의 보○를 응원해줘!~";
  } else if ((character.no === 107 && ctx.assi.no === 2)) {
    ctx.showMessage(`성기제전! 음란한 보○픽 개막 ~우리들의 보○를 응원해줘!~`);
    ctx.cstr[13] = "성기제전! 음란한 보○픽 개막 ~우리들의 보○를 응원해줘!~";
  } else if ((ctx.talents[220] === 1 && ctx.talents[432] === 1 && ctx.getTalent(assi, 220) === 1 && ctx.getTalent(assi, 432) === 1)) {
    ctx.showMessage(`요즘 아이들과 원교・난교　~${ctx.josaHelper(ctx.getVarName("NICKNAME", character), "과")} ${ctx.getVarName("NICK", ASSI)}의 방과후 아르바이트~`);
    ctx.cstr[13] = `요즘 아이들과 원교・난교　~%조사처리(NICKNAME:TARGET,"과")% ${NICKctx.getName(ctx.assi)}의 방과후 아르바이트~`;
  } else if (F & 128) {
    ctx.showMessage(`BEAST FUCK ~짐승에게 범해져 기뻐하는 음란암캐・${ctx.getVarName("NICK", TARGET)}~`);
    ctx.cstr[13] = "BEAST FUCK ~짐승에게 범해져 기뻐하는 음란암캐・%NICKNAME:TARGET%~";
  }
}

export async function special_title_decide(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: CSTR:30 =
  // TODO: CSTR:31 =
  // TODO: CSTR:32 =
  // TODO: CSTR:34 =
  // TODO: CSTR:35 =
  // TODO: CSTR:36 =
  // TODO: CSTR:37 =
  character.cflags[642] = 0;
  if ((character.cflags[40] >= 12 && character.cflags[40] != 64 && character.cflags[41] === 243 && ctx.talents[422] === 1)) {
    ctx.showMessage(`Arabian Rave Night　~BLACK ANOTHER EX-HARD HARD HARD!!~`);
    ctx.cstr[33] = "Arabian Rave Night　~BLACK ANOTHER EX-HARD HARD HARD!!~";
  } else if ((character.cflags[40] >= 76 && character.cflags[41] === 99 && character.cflags[42] === 99 && character.cflags[170] === 99 && ctx.talents[87] === 1)) {
    ctx.showMessage(`돌격! 유리 니삭스 공주!　~어째서 이렇게 된 거야~`);
    ctx.cstr[33] = "돌격! 유리 니삭스 공주!　~어째서 이렇게 된 거야~";
  } else if (((character.cflags[40] >= 12 && character.cflags[40] != 64 && character.cflags[41] === 52 && character.cflags[600] === 2 && character.cflags[604] === 4) && (character.cflags[40] >= 12 && character.cflags[41] === 52 &&  character.cflags[40] != 64 && character.cflags[600] === 3 && character.cflags[604] === 5))) {
    ctx.showMessage(`금지된 장난 ~성소녀영역, 음욕의 앨리스・게임~`);
    ctx.cstr[33] = "금지된 장난 ~성소녀영역, 음욕의 앨리스・게임~";
  } else if ((character.cflags[40] >= 12 && character.cflags[40] != 64 && character.cflags[41] === 51 && character.cflags[600] === 2 && character.cflags[602] === 8 && ctx.talents[203] === 1 && ctx.talents[93] === 1)) {
    ctx.showMessage(`초은하 아이돌 총감사제!　~내 보○에 정액을 잔뜩 투표해줘~`);
    ctx.cstr[33] = "초은하 아이돌 총감사제!　~내 보○에 정액을 잔뜩 투표해줘~";
  } else if ((character.cflags[40] >= 76 && character.cflags[41] === 40 && character.cflags[42] === 74 && (ctx.talents[87] === 1 || ctx.talents[432] === 1))) {
    ctx.showMessage(`PREMIUM BAD GIRLS　~네 정액, %타겟이(1)% 전부 뽑・아・줄・게☆~`);
    ctx.cstr[33] = "PREMIUM BAD GIRLS　~네 정액, %타겟이(1)% 전부 뽑・아・줄・게☆~";
  } else if ((character.cflags[40] >= 76 && character.cflags[41] === 240 && character.cflags[42] === 61 && ctx.talents[432] === 1 && character.tflags[32] & 1)) {
    ctx.showMessage(`Princess Bride! 　~제발 제 처음을 받아주세요, 서방님~`);
    ctx.cstr[33] = "Princess Bride! 　~제발 제 처음을 받아주세요, 서방님~";
  } else if ((character.cflags[40] >= 12 && character.cflags[40] != 64 && character.cflags[41] === 30 && ctx.talents[109] === 0 && ctx.talents[116] === 0)) {
    ctx.showMessage(`방과후 티슈타임　~그것이 내 X-Plan~`);
    ctx.cstr[33] = "방과후 티슈타임　~그것이 내 X-Plan~";
  } else if ((character.cflags[40] >= 12 && character.cflags[40] != 64 && character.cflags[41] === 244)) {
    ctx.showMessage(`학교수영복H。 ~${ctx.getVarName("NICK", TARGET)}~`);
    ctx.cstr[33] = "학교수영복H。 ~%NICKNAME:TARGET%~";
  } else if ((character.tflags[180] === 1 && character.cflags[600] === 6 && character.cflags[602] === 4)) {
    ctx.showMessage(`전자의 가희・음욕에 떨어져　~하츠네 ○쿠의 욕정~`);
    ctx.cstr[33] = "전자의 가희・음욕에 떨어져　~하츠네 ○쿠의 욕정~";
  } else if ((character.tflags[180] === 16 && character.cflags[600] === 11 && character.cflags[602] === 5)) {
    ctx.showMessage(`Angel Bitch!　~천사짱 진짜 엣찌~`);
    ctx.cstr[33] = "Angel Bitch!　~천사짱 진짜 엣찌~";
  } else if ((character.tflags[180] === 20 && character.tflags[32] & 1 && ctx.talents[320])) {
    ctx.showMessage(`노을빛으로 물드는 처녀혈・하드코어 ~처녀상실이에요, 오빠~`);
    ctx.cstr[33] = "노을빛으로 물드는 처녀혈・하드코어 ~처녀상실이에요, 오빠~";
  } else if ((character.tflags[180] === 8 &&  A[3] && B[3] && character.cflags[600] === 10 && character.cflags[602] === 5 && ctx.base[9] <= 22)) {
    ctx.showMessage(`누드 아웃・오프라인 ~항명기사단・미소녀부단장의 하드 애널퍽~`);
    ctx.cstr[33] = "누드 아웃・오프라인 ~항명기사단・미소녀부단장의 하드 애널퍽~";
  }
  if (ctx.assi <= 0) {
    return;
  }
  if ((character.no === 1 && ctx.assi.no === 17)) {
    ctx.showMessage(`노예자매능욕 ~음욕에 빠지는 미소녀자매~`);
    ctx.cstr[33] = "노예자매능욕 ~음욕에 빠지는 미소녀자매~";
  } else if (((character.no === 1 && ctx.getTalent(target, 432) === 0) && (ctx.assi.no === 15 && ctx.getTalent(assi, 432) === 0))) {
    ctx.showMessage(`Lily's Garden ~청초한 흑발 미소녀들의 비밀의 백합정원~`);
    ctx.cstr[33] = "Lily\'s Garden ~청초한 흑발 미소녀들의 비밀의 백합정원~";
  } else if (((character.no === 1 && ctx.getTalent(target, 432) === 0) && (ctx.assi.no === 91 && ctx.getTalent(assi, 432) === 1))) {
    ctx.showMessage(`거울 속의 또 한명의 나 ~GIRL IN THE MIRROR~`);
    ctx.cstr[33] = "거울 속의 또 한명의 나 ~GIRL IN THE MIRROR~";
  } else if (((character.no === 91 && ctx.getTalent(target, 432) === 1) && (ctx.assi.no === 1 && ctx.getTalent(assi, 432) === 0))) {
    ctx.showMessage(`거울 속의 또 한명의 나 ~GIRL IN THE MIRROR~`);
    ctx.cstr[33] = "거울 속의 또 한명의 나 ~GIRL IN THE MIRROR~";
  } else if (((character.no === 15 && ctx.getTalent(target, 432) === 0) && (ctx.assi.no === 1 && ctx.getTalent(assi, 432) === 0))) {
    ctx.showMessage(`Lily's Garden ~청초한 흑발 미소녀들의 비밀의 백합정원~`);
    ctx.cstr[33] = "Lily\'s Garden ~청초한 흑발 미소녀들의 비밀의 백합정원~";
  } else if ((character.no === 17 && ctx.assi.no === 1)) {
    ctx.showMessage(`노예자매능욕 ~음욕에 빠지는 미소녀자매~`);
    ctx.cstr[33] = "노예자매능욕 ~음욕에 빠지는 미소녀자매~";
  } else if ((character.no === 3 && ctx.assi.no === 20)) {
    ctx.showMessage(`흑백갸루 대난교　~Sex on the bitch!~`);
    ctx.cstr[33] = "흑백갸루 대난교　~Sex on the bitch!~";
  } else if ((character.no === 20 && ctx.assi.no === 3)) {
    ctx.showMessage(`흑백갸루 대난교　~Sex on the bitch!~`);
    ctx.cstr[33] = "흑백갸루 대난교　~Sex on the bitch!~";
  } else if ((character.no === 4 && ctx.assi.no === 6)) {
    ctx.showMessage(`유한 세레브자매　~유부녀 언니가 동생을 음란교육~`);
    ctx.cstr[33] = "유한 세레브자매　~유부녀 언니가 동생을 음란교육~";
  } else if ((character.no === 6 && ctx.assi.no === 4)) {
    ctx.showMessage(`유한 세레브자매　~유부녀 언니가 동생을 음란교육~`);
    ctx.cstr[33] = "유한 세레브자매　~유부녀 언니가 동생을 음란교육~";
  } else if ((character.no === 5 && ctx.assi.no === 26)) {
    ctx.showMessage(`W로리타 백탁절임　~이렇게 잔뜩 나오면 빠져버려~`);
    ctx.cstr[33] = "W로리타 백탁절임　~이렇게 잔뜩 나오면 빠져버려~";
  } else if ((character.no === 26 && ctx.assi.no === 5)) {
    ctx.showMessage(`W로리타 백탁절임　~이렇게 잔뜩 나오면 빠져버려~`);
    ctx.cstr[33] = "W로리타 백탁절임　~이렇게 잔뜩 나오면 빠져버려~";
  } else if ((character.no === 7 && ctx.assi.no === 8)) {
    ctx.showMessage(`백합미소녀 상간　~자매만의 비밀 엣찌 들켜버렸습니다~`);
    ctx.cstr[33] = "백합미소녀 상간　~자매만의 비밀 엣찌 들켜버렸습니다~";
  } else if ((character.no === 8 && ctx.assi.no === 7)) {
    ctx.showMessage(`백합미소녀 상간　~자매만의 비밀 엣찌 들켜버렸습니다~`);
    ctx.cstr[33] = "백합미소녀 상간　~자매만의 비밀 엣찌 들켜버렸습니다~";
  } else if ((character.no === 9 && ctx.assi.no === 86)) {
    ctx.showMessage(`PARADISE LOST　~실낙원의 자매공주~`);
    ctx.cstr[33] = "PARADISE LOST　~실낙원의 자매공주~";
  } else if ((character.no === 86 && ctx.assi.no === 9)) {
    ctx.showMessage(`PARADISE LOST　~실낙원의 자매공주~`);
    ctx.cstr[33] = "PARADISE LOST　~실낙원의 자매공주~";
  } else if ((character.no === 10 && ctx.assi.no === 75)) {
    ctx.showMessage(`음욕에 물드는 학생회실　~엘리트 아가씨는 정액투성이~`);
    ctx.cstr[33] = "음욕에 물드는 학생회실　~엘리트 아가씨는 정액투성이~";
  } else if ((character.no === 75 && ctx.assi.no === 10)) {
    ctx.showMessage(`음욕에 물드는 학생회실　~엘리트 아가씨는 정액투성이~`);
    ctx.cstr[33] = "음욕에 물드는 학생회실　~엘리트 아가씨는 정액투성이~";
  } else if ((character.no === 11 && ctx.assi.no === 26)) {
    ctx.showMessage(`코킹호스☆랩소디　~진한 정액짜내기♪~`);
    ctx.cstr[33] = "코킹호스☆랩소디　~진한 정액짜내기♪~";
  } else if ((character.no === 26 && ctx.assi.no === 11)) {
    ctx.showMessage(`코킹호스☆랩소디　~진한 정액짜내기♪~`);
    ctx.cstr[33] = "코킹호스☆랩소디　~진한 정액짜내기♪~";
  } else if ((character.no === 25 && ctx.assi.no === 29)) {
    ctx.showMessage(`배덕의 수녀 절정지옥　~하느님, 용서해 주세요~`);
    ctx.cstr[33] = "배덕의 수녀 절정지옥　~하느님, 용서해 주세요~";
  } else if ((character.no === 29 && ctx.assi.no === 25)) {
    ctx.showMessage(`발정 수녀・성당의 검은 미사　~마리아님께 보이고 있어~`);
    ctx.cstr[33] = "발정 수녀・성당의 검은 미사　~마리아님께 보이고 있어~";
  } else if ((character.no === 27 && ctx.assi.no === 28)) {
    ctx.showMessage(`SPERMA Capter Cherry　~정자 불법소지죄로 체포합니다!~`);
    ctx.cstr[33] = "SPERMA Capter Cherry　~정자 불법소지죄로 체포합니다!~";
  } else if ((character.no === 28 && ctx.assi.no === 27)) {
    ctx.showMessage(`SPERMA Capter Cherry　~정자 불법소지죄로 체포합니다!~`);
    ctx.cstr[33] = "SPERMA Capter Cherry　~정자 불법소지죄로 체포합니다!~";
  } else if ((character.no === 80 && ctx.assi.no === 997)) {
    ctx.showMessage(`닮은꼴!!　국민 아이돌 꿈의 더블캐스트! ~미○로＆유○~`);
    ctx.cstr[33] = "닮은꼴!!　국민 아이돌 꿈의 더블캐스트! ~미○로＆유○~";
  } else if ((character.no === 997 && ctx.assi.no === 80)) {
    ctx.showMessage(`닮은꼴!!　국민 아이돌 꿈의 더블캐스트! ~미○로＆유○~`);
    ctx.cstr[33] = "닮은꼴!!　국민 아이돌 꿈의 더블캐스트! ~미○로＆유○~";
  } else if ((character.no === 32 && ctx.assi.no === 33)) {
    ctx.showMessage(`미인자매・비밀의 의사놀이　~언니, 콩이 지릿지릿해~`);
    ctx.cstr[33] = "미인자매・비밀의 의사놀이　~언니, 콩이 지릿지릿해~";
  } else if ((character.no === 33 && ctx.assi.no === 32)) {
    ctx.showMessage(`미인자매・비밀의 의사놀이　~언니, 콩이 지릿지릿해~`);
    ctx.cstr[33] = "미인자매・비밀의 의사놀이　~언니, 콩이 지릿지릿해~";
  } else if ((character.no === 34 && ctx.assi.no === 36)) {
    ctx.showMessage(`음란 바람소녀　~남친을 배신하고 AV나와버렸습니다~`);
    ctx.cstr[33] = "음란 바람소녀　~남친을 배신하고 AV나와버렸습니다~";
  } else if ((character.no === 36 && ctx.assi.no === 34)) {
    ctx.showMessage(`음란 바람소녀　~남친을 배신하고 AV나와버렸습니다~`);
    ctx.cstr[33] = "음란 바람소녀　~남친을 배신하고 AV나와버렸습니다~";
  } else if ((character.no === 95 && ctx.assi.no === 10)) {
    ctx.showMessage(`기모노자매・더러워진 다다미방　~엄마? 아니, 사실 언니죠?w~`);
    ctx.cstr[33] = "기모노자매・더러워진 다다미방　~엄마? 아니, 사실 언니죠?w~";
  } else if ((character.no === 10 && ctx.assi.no === 95)) {
    ctx.showMessage(`기모노자매・더러워진 다다미방　~짐승의 방~`);
    ctx.cstr[33] = "기모노자매・더러워진 다다미방　~짐승의 방~";
  } else if ((character.no === 22 && ctx.assi.no === 35)) {
    ctx.showMessage(`미소녀자매・사랑의 과외수업!　~남자를 가르쳐주세요~`);
    ctx.cstr[33] = "미소녀자매・사랑의 과외수업!　~남자를 가르쳐주세요~";
  } else if ((character.no === 35 && ctx.assi.no === 22)) {
    ctx.showMessage(`소악마☆리틀 시스터　~언니, 엣찌를 가르쳐줄게~`);
    ctx.cstr[33] = "소악마☆리틀 시스터　~언니, 엣찌를 가르쳐줄게~";
  } else if ((character.no === 5 && ctx.assi.no === 13)) {
    ctx.showMessage(`육식소녀　동정・강탈!　~여장남자가 흘낏흘낏 쳐다봐서 먹어버렸습니다~`);
    ctx.cstr[33] = "육식소녀　동정・강탈!　~여장남자가 흘낏흘낏 쳐다봐서 먹어버렸습니다~";
  } else if ((character.no === 13 && ctx.assi.no === 5)) {
    ctx.showMessage(`육식소녀　동정・강탈!　~여장남자가 흘낏흘낏 쳐다봐서 먹어버렸습니다~`);
    ctx.cstr[33] = "육식소녀　동정・강탈!　~여장남자가 흘낏흘낏 쳐다봐서 먹어버렸습니다~";
  } else if ((character.no === 15 && ctx.assi.no === 85)) {
    ctx.showMessage(`아아 천사님　~천사와 무녀의 동서양결합SEX풀코스~`);
    ctx.cstr[33] = "아아 천사님　~천사와 무녀의 동서양결합SEX풀코스~";
  } else if ((character.no === 85 && ctx.assi.no === 15)) {
    ctx.showMessage(`아아 천사님　~천사와 무녀의 동서양결합SEX풀코스~`);
    ctx.cstr[33] = "아아 천사님　~천사와 무녀의 동서양결합SEX풀코스~";
  } else if ((character.no === 9 && ctx.assi.no === 96)) {
    ctx.showMessage(`탐정귀족・하극상SEX　~여탐정이 주인의 그곳을 강제수색~`);
    ctx.cstr[33] = "탐정귀족・하극상SEX　~여탐정이 주인의 그곳을 강제수색~";
  } else if ((character.no === 96 && ctx.assi.no === 9)) {
    ctx.showMessage(`공주님 폭주!　~국민의 암캐구멍은 나의 것~`);
    ctx.cstr[33] = "공주님 폭주!　~국민의 암캐구멍은 나의 것~";
  } else if ((character.no === 200 && ctx.assi.no === 4)) {
    ctx.showMessage(`미소녀 아가씨・비밀의 오후　~음락의 화원~`);
    ctx.cstr[33] = "미소녀 아가씨・비밀의 오후　~음락의 화원~";
  } else if ((character.no === 4 && ctx.assi.no === 200)) {
    ctx.showMessage(`미소녀 아가씨・비밀의 오후　~음락의 화원~`);
    ctx.cstr[33] = "미소녀 아가씨・비밀의 오후　~음락의 화원~";
  } else if ((character.no === 5 && ctx.assi.no === 18)) {
    ctx.showMessage(`일미대결! 미소녀 코스프레이어　~에로는 세계의 공통언어~`);
    ctx.cstr[33] = "일미대결! 미소녀 코스프레이어　~에로는 세계의 공통언어~";
  } else if ((character.no === 18 && ctx.assi.no === 5)) {
    ctx.showMessage(`일미대결! 미소녀 코스프레이어　~에로는 세계의 공통언어~`);
    ctx.cstr[33] = "일미대결! 미소녀 코스프레이어　~에로는 세계의 공통언어~";
  } else if ((character.no === 93 && ctx.assi.no === 32)) {
    ctx.showMessage(`동물귀 난무!　~동물아가씨를 뒤어세도 앞에서도~`);
    ctx.cstr[33] = "동물귀 난무!　~동물아가씨를 뒤어세도 앞에서도~";
  } else if ((character.no === 32 && ctx.assi.no === 93)) {
    ctx.showMessage(`동물귀 난무!　~동물아가씨를 뒤어세도 앞에서도~`);
    ctx.cstr[33] = "동물귀 난무!　~동물아가씨를 뒤어세도 앞에서도~";
  } else if ((character.no === 93 && ctx.assi.no === 33)) {
    ctx.showMessage(`동물귀 아가씨・정액chuchu　~오늘도 잔뜩 봉사하겠멍~`);
    ctx.cstr[33] = "동물귀 아가씨・정액chuchu　~오늘도 잔뜩 봉사하겠멍~";
  } else if ((character.no === 33 && ctx.assi.no === 93)) {
    ctx.showMessage(`동물귀 아가씨・정액chuchu　~오늘도 잔뜩 봉사하겠멍~`);
    ctx.cstr[33] = "동물귀 아가씨・정액chuchu　~오늘도 잔뜩 봉사하겠멍~";
  } else if ((character.no === 202 && ctx.assi.no === 37)) {
    ctx.showMessage(`人気ガルデモ・강간제!　~우리들의 그곳이 모에모에 큥~`);
    ctx.cstr[33] = "人気ガルデモ・강간제!　~우리들의 그곳이 모에모에 큥~";
  } else if ((character.no === 37 && ctx.assi.no === 202)) {
    ctx.showMessage(`人気ガルデモ・강간제!　~우리들의 그곳이 모에모에 큥~`);
    ctx.cstr[33] = "人気ガルデモ・강간제!　~우리들의 그곳이 모에모에 큥~";
  } else if ((character.no === 87 && ctx.assi.no === 14)) {
    ctx.showMessage(`발정 캣파이트　~절정지옥 3판승부~`);
    ctx.cstr[33] = "발정 캣파이트　~절정지옥 3판승부~";
  } else if ((character.no === 14 && ctx.assi.no === 87)) {
    ctx.showMessage(`발정 캣파이트2　~육덕진 팬티레슬링~`);
    ctx.cstr[33] = "발정 캣파이트2　~육덕진 팬티레슬링~";
  } else if ((character.no === 39 && ctx.assi.no === 203)) {
    ctx.showMessage(`여○생 민감 포인트　~비밀의 염기지도 해주세요~`);
    ctx.cstr[33] = "여○생 민감 포인트　~비밀의 염기지도 해주세요~";
  } else if ((character.no === 203 && ctx.assi.no === 39)) {
    ctx.showMessage(`여○생 민감 포인트　~비밀의 염기지도 해주세요~`);
    ctx.cstr[33] = "여○생 민감 포인트　~비밀의 염기지도 해주세요~";
  } else if ((character.no === 41 && ctx.assi.no === 43)) {
    ctx.showMessage(`절정에로심포니　~여학교 아가씨・당신의 색으로 물들여 주세요~`);
    ctx.cstr[33] = "절정에로심포니　~여학교 아가씨・당신의 색으로 물들여 주세요~";
  } else if ((character.no === 43 && ctx.assi.no === 41)) {
    ctx.showMessage(`절정에로심포니　~여학교 아가씨・당신의 색으로 물들여 주세요~`);
    ctx.cstr[33] = "절정에로심포니　~여학교 아가씨・당신의 색으로 물들여 주세요~";
  } else if ((character.no === 23 && ctx.assi.no === 97)) {
    ctx.showMessage(`어떤 AV의 촬영풍경　~절정천국으로 레벨업이랍니다~`);
    ctx.cstr[33] = "어떤 AV의 촬영풍경　~절정천국으로 레벨업이랍니다~";
  } else if ((character.no === 97 && ctx.assi.no === 23)) {
    ctx.showMessage(`어떤 AV의 촬영풍경　~절정천국으로 레벨업이랍니다~`);
    ctx.cstr[33] = "어떤 AV의 촬영풍경　~절정천국으로 레벨업이랍니다~";
  } else if ((character.no === 10 && ctx.assi.no === 97)) {
    ctx.showMessage(`저지먼트랍니다!　~언니의 치마안을 조사해보겠사옵니다~`);
    ctx.cstr[33] = "저지먼트랍니다!　~언니의 치마안을 조사해보겠사옵니다~";
  } else if ((character.no === 97 && ctx.assi.no === 10)) {
    ctx.showMessage(`저지먼트랍니다!　~언니에게 벌을 받아 버린겁니다~`);
    ctx.cstr[33] = "저지먼트랍니다!　~언니에게 벌을 받아 버린겁니다~";
  } else if ((character.no === 98 && ctx.assi.no === 211)) {
    ctx.showMessage(`진심유리!!　~인기 카리스마 모델을 닮은 언니가 여동생을 음행해서 대사건!!~`);
    ctx.cstr[33] = "진심유리!!　~인기 카리스마 모델을 닮은 언니가 여동생을 음행해서 대사건!!~";
  } else if ((character.no === 211 && ctx.assi.no === 98)) {
    ctx.showMessage(`진심유리!!　~인기 카리스마 모델을 닮은 언니가 여동생을 음행해서 대사건!!~`);
    ctx.cstr[33] = "진심유리!!　~인기 카리스마 모델을 닮은 언니가 여동생을 음행해서 대사건!!~";
  } else if ((character.no === 15 && ctx.assi.no === 212)) {
    ctx.showMessage(`음란 무녀님 신락부!!　~우리의 엣찌를 신님께 봉납합니다~`);
    ctx.cstr[33] = "음란 무녀님 신락부!!　~우리의 엣찌를 신님께 봉납합니다~";
  } else if ((character.no === 212 && ctx.assi.no === 15)) {
    ctx.showMessage(`음란 무녀님 신락부!!　~우리의 엣찌를 신님께 봉납합니다~`);
    ctx.cstr[33] = "음란 무녀님 신락부!!　~우리의 엣찌를 신님께 봉납합니다~";
  } else if ((character.no === 14 && ctx.assi.no === 205)) {
    ctx.showMessage(`사무라이 걸VS미소녀 닌자　~일본풍 엣찌 십번승부!~`);
    ctx.cstr[33] = "사무라이 걸VS미소녀 닌자　~일본풍 엣찌 십번승부!~";
  } else if ((character.no === 205 && ctx.assi.no === 14)) {
    ctx.showMessage(`사무라이 걸VS미소녀 닌자　~일본풍 엣찌 십번승부!~`);
    ctx.cstr[33] = "사무라이 걸VS미소녀 닌자　~일본풍 엣찌 십번승부!~";
  } else if ((character.no === 81 && ctx.assi.no === 84)) {
    ctx.showMessage(`한여름 밤의 음마　~섹시 음마가 당신의 자○를 짜낸다~`);
    ctx.cstr[33] = "한여름 밤의 음마　~섹시 음마가 당신의 자○를 짜낸다~";
  } else if ((character.no === 84 && ctx.assi.no === 81)) {
    ctx.showMessage(`한여름 밤의 음마　~섹시 음마가 당신의 자○를 짜낸다~`);
    ctx.cstr[33] = "한여름 밤의 음마　~섹시 음마가 당신의 자○를 짜낸다~";
  } else if ((character.no === 9 && ctx.assi.no === 81)) {
    ctx.showMessage(`Princess Lovers!　~2명의 내가 사랑해줄게~`);
    ctx.cstr[33] = "Princess Lovers!　~2명의 내가 사랑해줄게~";
  } else if ((character.no === 81 && ctx.assi.no === 9)) {
    ctx.showMessage(`Princess Lovers!　~2명의 내가 사랑해줄게~`);
    ctx.cstr[33] = "Princess Lovers!　~2명의 내가 사랑해줄게~";
  } else if ((character.no === 17 && ctx.assi.no === 92)) {
    ctx.showMessage(`Marionette Company　~로봇소녀 정액탱크~`);
    ctx.cstr[33] = "Marionette Company　~로봇소녀 정액탱크~";
  } else if ((character.no === 92 && ctx.assi.no === 17)) {
    ctx.showMessage(`Marionette Company　~로봇소녀 정액탱크~`);
    ctx.cstr[33] = "Marionette Company　~로봇소녀 정액탱크~";
  } else if ((character.no === 17 && ctx.assi.no === 19)) {
    ctx.showMessage(`Saver Marionette　~우리들이 당신의 고간의 구세주~`);
    ctx.cstr[33] = "Saver Marionette　~우리들이 당신의 고간의 구세주~";
  } else if ((character.no === 19 && ctx.assi.no === 17)) {
    ctx.showMessage(`Saver Marionette　~우리들이 당신의 고간의 구세주~`);
    ctx.cstr[33] = "Saver Marionette　~우리들이 당신의 고간의 구세주~";
  } else if ((character.no === 1 && ctx.talents[211] === 1 && ctx.talents[83] === 1 && character.cflags[41] === 241 && character.cflags[40] === 76 && character.cflags[42] === 85)) {
    ctx.showMessage(`Queen's Pride　~내 여동생은 새드 여왕님~`);
    ctx.cstr[33] = "Queen\'s Pride　~내 여동생은 새드 여왕님~";
  } else if ((character.no === 2 && ctx.assi.no === 107)) {
    ctx.showMessage(`성기제전! 음란한 보○픽 개막 ~우리들의 보○를 응원해줘!~`);
    ctx.cstr[33] = "성기제전! 음란한 보○픽 개막 ~우리들의 보○를 응원해줘!~";
  } else if ((character.no === 107 && ctx.assi.no === 107)) {
    ctx.showMessage(`성기제전! 음란한 보○픽 개막 ~우리들의 보○를 응원해줘!~`);
    ctx.cstr[33] = "성기제전! 음란한 보○픽 개막 ~우리들의 보○를 응원해줘!~";
  } else if ((ctx.talents[220] === 1 && ctx.talents[432] === 1 && ctx.getTalent(assi, 220) === 1 && ctx.getTalent(assi, 432) === 1)) {
    ctx.showMessage(`요즘 아이들과 원교・난교　~${ctx.josaHelper(ctx.getVarName("NICKNAME", character), "과")} ${ctx.getVarName("NICK", ASSI)}의 방과후 아르바이트~`);
    ctx.cstr[33] = `요즘 아이들과 원교・난교　~%조사처리(NICKNAME:TARGET,"과")% ${NICKctx.getName(ctx.assi)}의 방과후 아르바이트~`;
  }
}
