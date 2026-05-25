/**
 * BOYFRIENDNAME_CALC2.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function decide_boyfriend2(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = character;
  character.cflags[627] += ctx.rand(114);
  if (character.cflags[627] === 0) {
    character.cstr[ctx.locals[0]][7] = "아사노";
  } else if (character.cflags[627] === 1) {
    character.cstr[ctx.locals[0]][7] = "이케조에";
  } else if (character.cflags[627] === 2) {
    character.cstr[ctx.locals[0]][7] = "우키타";
  } else if (character.cflags[627] === 3) {
    character.cstr[ctx.locals[0]][7] = "에다노";
  } else if (character.cflags[627] === 4) {
    character.cstr[ctx.locals[0]][7] = "오자와";
  } else if (character.cflags[627] === 5) {
    character.cstr[ctx.locals[0]][7] = "칸";
  } else if (character.cflags[627] === 6) {
    character.cstr[ctx.locals[0]][7] = "키시다";
  } else if (character.cflags[627] === 7) {
    character.cstr[ctx.locals[0]][7] = "쿠와시마";
  } else if (character.cflags[627] === 8) {
    character.cstr[ctx.locals[0]][7] = "케도인";
  } else if (character.cflags[627] === 9) {
    character.cstr[ctx.locals[0]][7] = "콘도";
  } else if (character.cflags[627] === 10) {
    character.cstr[ctx.locals[0]][7] = "사사모리";
  } else if (character.cflags[627] === 11) {
    character.cstr[ctx.locals[0]][7] = "시바타";
  } else if (character.cflags[627] === 12) {
    character.cstr[ctx.locals[0]][7] = "스와야마";
  } else if (character.cflags[627] === 13) {
    character.cstr[ctx.locals[0]][7] = "세노";
  } else if (character.cflags[627] === 14) {
    character.cstr[ctx.locals[0]][7] = "센고쿠";
  } else if (character.cflags[627] === 15) {
    character.cstr[ctx.locals[0]][7] = "타다노";
  } else if (character.cflags[627] === 16) {
    character.cstr[ctx.locals[0]][7] = "치탄다";
  } else if (character.cflags[627] === 17) {
    character.cstr[ctx.locals[0]][7] = "츠야마";
  } else if (character.cflags[627] === 18) {
    character.cstr[ctx.locals[0]][7] = "테즈카";
  } else if (character.cflags[627] === 19) {
    character.cstr[ctx.locals[0]][7] = "토이케";
  } else if (character.cflags[627] === 20) {
    character.cstr[ctx.locals[0]][7] = "나루미야";
  } else if (character.cflags[627] === 21) {
    character.cstr[ctx.locals[0]][7] = "니시나";
  } else if (character.cflags[627] === 22) {
    character.cstr[ctx.locals[0]][7] = "누마타";
  } else if (character.cflags[627] === 23) {
    character.cstr[ctx.locals[0]][7] = "네기시";
  } else if (character.cflags[627] === 24) {
    character.cstr[ctx.locals[0]][7] = "노다";
  } else if (character.cflags[627] === 25) {
    character.cstr[ctx.locals[0]][7] = "하토야마";
  } else if (character.cflags[627] === 26) {
    character.cstr[ctx.locals[0]][7] = "히라다";
  } else if (character.cflags[627] === 27) {
    character.cstr[ctx.locals[0]][7] = "후지와라";
  } else if (character.cflags[627] === 28) {
    character.cstr[ctx.locals[0]][7] = "헤노코";
  } else if (character.cflags[627] === 29) {
    character.cstr[ctx.locals[0]][7] = "혼야";
  } else if (character.cflags[627] === 30) {
    character.cstr[ctx.locals[0]][7] = "마에바라";
  } else if (character.cflags[627] === 31) {
    character.cstr[ctx.locals[0]][7] = "미타카";
  } else if (character.cflags[627] === 32) {
    character.cstr[ctx.locals[0]][7] = "무라키";
  } else if (character.cflags[627] === 33) {
    character.cstr[ctx.locals[0]][7] = "메지로";
  } else if (character.cflags[627] === 34) {
    character.cstr[ctx.locals[0]][7] = "모기";
  } else if (character.cflags[627] === 35) {
    character.cstr[ctx.locals[0]][7] = "야스다";
  } else if (character.cflags[627] === 36) {
    character.cstr[ctx.locals[0]][7] = "유아사";
  } else if (character.cflags[627] === 37) {
    character.cstr[ctx.locals[0]][7] = "요시다";
  } else if (character.cflags[627] === 38) {
    character.cstr[ctx.locals[0]][7] = "란도";
  } else if (character.cflags[627] === 39) {
    character.cstr[ctx.locals[0]][7] = "리키시";
  } else if (character.cflags[627] === 40) {
    character.cstr[ctx.locals[0]][7] = "루이혼";
  } else if (character.cflags[627] === 41) {
    character.cstr[ctx.locals[0]][7] = "레이바";
  } else if (character.cflags[627] === 42) {
    character.cstr[ctx.locals[0]][7] = "로기";
  } else if (character.cflags[627] === 43) {
    character.cstr[ctx.locals[0]][7] = "와카히사";
  } else if (character.cflags[627] === 44) {
    character.cstr[ctx.locals[0]][7] = "카네코";
  } else if (character.cflags[627] === 45) {
    character.cstr[ctx.locals[0]][7] = "사루야마";
  } else if (character.cflags[627] === 46) {
    character.cstr[ctx.locals[0]][7] = "아이카와";
  } else if (character.cflags[627] === 47) {
    character.cstr[ctx.locals[0]][7] = "아시야";
  } else if (character.cflags[627] === 48) {
    character.cstr[ctx.locals[0]][7] = "이이다";
  } else if (character.cflags[627] === 49) {
    character.cstr[ctx.locals[0]][7] = "이세자키";
  } else if (character.cflags[627] === 50) {
    character.cstr[ctx.locals[0]][7] = "이토";
  } else if (character.cflags[627] === 51) {
    character.cstr[ctx.locals[0]][7] = "이치하라";
  } else if (character.cflags[627] === 52) {
    character.cstr[ctx.locals[0]][7] = "우에하라";
  } else if (character.cflags[627] === 53) {
    character.cstr[ctx.locals[0]][7] = "우에다";
  } else if (character.cflags[627] === 54) {
    character.cstr[ctx.locals[0]][7] = "우치다";
  } else if (character.cflags[627] === 55) {
    character.cstr[ctx.locals[0]][7] = "우츠미";
  } else if (character.cflags[627] === 56) {
    character.cstr[ctx.locals[0]][7] = "우루시하라";
  } else if (character.cflags[627] === 57) {
    character.cstr[ctx.locals[0]][7] = "에토";
  } else if (character.cflags[627] === 58) {
    character.cstr[ctx.locals[0]][7] = "에가와";
  } else if (character.cflags[627] === 59) {
    character.cstr[ctx.locals[0]][7] = "에타지마";
  } else if (character.cflags[627] === 60) {
    character.cstr[ctx.locals[0]][7] = "엔도";
  } else if (character.cflags[627] === 61) {
    character.cstr[ctx.locals[0]][7] = "에비하라";
  } else if (character.cflags[627] === 62) {
    character.cstr[ctx.locals[0]][7] = "오노";
  } else if (character.cflags[627] === 63) {
    character.cstr[ctx.locals[0]][7] = "오다";
  } else if (character.cflags[627] === 64) {
    character.cstr[ctx.locals[0]][7] = "오하라";
  } else if (character.cflags[627] === 65) {
    character.cstr[ctx.locals[0]][7] = "오카다";
  } else if (character.cflags[627] === 66) {
    character.cstr[ctx.locals[0]][7] = "오야";
  } else if (character.cflags[627] === 67) {
    character.cstr[ctx.locals[0]][7] = "오타니";
  } else if (character.cflags[627] === 68) {
    character.cstr[ctx.locals[0]][7] = "오오이";
  } else if (character.cflags[627] === 69) {
    character.cstr[ctx.locals[0]][7] = "오키";
  } else if (character.cflags[627] === 70) {
    character.cstr[ctx.locals[0]][7] = "오노미치";
  } else if (character.cflags[627] === 71) {
    character.cstr[ctx.locals[0]][7] = "오야마우치";
  } else if (character.cflags[627] === 72) {
    character.cstr[ctx.locals[0]][7] = "오에하라";
  } else if (character.cflags[627] === 73) {
    character.cstr[ctx.locals[0]][7] = "오노미야";
  } else if (character.cflags[627] === 74) {
    character.cstr[ctx.locals[0]][7] = "카토";
  } else if (character.cflags[627] === 75) {
    character.cstr[ctx.locals[0]][7] = "카와시마";
  } else if (character.cflags[627] === 76) {
    character.cstr[ctx.locals[0]][7] = "카와치";
  } else if (character.cflags[627] === 77) {
    character.cstr[ctx.locals[0]][7] = "카미시마";
  } else if (character.cflags[627] === 75) {
    character.cstr[ctx.locals[0]][7] = "카미치";
  } else if (character.cflags[627] === 76) {
    character.cstr[ctx.locals[0]][7] = "카미자키";
  } else if (character.cflags[627] === 74) {
    character.cstr[ctx.locals[0]][7] = "카네다";
  } else if (character.cflags[627] === 75) {
    character.cstr[ctx.locals[0]][7] = "카시와라";
  } else if (character.cflags[627] === 76) {
    character.cstr[ctx.locals[0]][7] = "카시와기";
  } else if (character.cflags[627] === 77) {
    character.cstr[ctx.locals[0]][7] = "카츠야";
  } else if (character.cflags[627] === 78) {
    character.cstr[ctx.locals[0]][7] = "카츠라기";
  } else if (character.cflags[627] === 79) {
    character.cstr[ctx.locals[0]][7] = "키타니";
  } else if (character.cflags[627] === 80) {
    character.cstr[ctx.locals[0]][7] = "키미시마";
  } else if (character.cflags[627] === 81) {
    character.cstr[ctx.locals[0]][7] = "키사라기";
  } else if (character.cflags[627] === 82) {
    character.cstr[ctx.locals[0]][7] = "키리가야";
  } else if (character.cflags[627] === 83) {
    character.cstr[ctx.locals[0]][7] = "키사노키";
  } else if (character.cflags[627] === 84) {
    character.cstr[ctx.locals[0]][7] = "키하라";
  } else if (character.cflags[627] === 85) {
    character.cstr[ctx.locals[0]][7] = "키린";
  } else if (character.cflags[627] === 86) {
    character.cstr[ctx.locals[0]][7] = "켄자키";
  } else if (character.cflags[627] === 87) {
    character.cstr[ctx.locals[0]][7] = "케센누마";
  } else if (character.cflags[627] === 88) {
    character.cstr[ctx.locals[0]][7] = "쿠리하라";
  } else if (character.cflags[627] === 89) {
    character.cstr[ctx.locals[0]][7] = "쿠루가야";
  } else if (character.cflags[627] === 90) {
    character.cstr[ctx.locals[0]][7] = "쿠루스";
  } else if (character.cflags[627] === 91) {
    character.cstr[ctx.locals[0]][7] = "쿠보타";
  } else if (character.cflags[627] === 92) {
    character.cstr[ctx.locals[0]][7] = "쿠사하라";
  } else if (character.cflags[627] === 93) {
    character.cstr[ctx.locals[0]][7] = "쿠시다";
  } else if (character.cflags[627] === 94) {
    character.cstr[ctx.locals[0]][7] = "쿠시에다";
  } else if (character.cflags[627] === 95) {
    character.cstr[ctx.locals[0]][7] = "콘노";
  } else if (character.cflags[627] === 96) {
    character.cstr[ctx.locals[0]][7] = "코미야";
  } else if (character.cflags[627] === 97) {
    character.cstr[ctx.locals[0]][7] = "코바야시";
  } else if (character.cflags[627] === 98) {
    character.cstr[ctx.locals[0]][7] = "코바야카와";
  } else if (character.cflags[627] === 99) {
    character.cstr[ctx.locals[0]][7] = "코니시";
  } else if (character.cflags[627] === 100) {
    character.cstr[ctx.locals[0]][7] = "코모리";
  } else if (character.cflags[627] === 101) {
    character.cstr[ctx.locals[0]][7] = "코다이라";
  } else if (character.cflags[627] === 102) {
    character.cstr[ctx.locals[0]][7] = "코다마";
  } else if (character.cflags[627] === 103) {
    character.cstr[ctx.locals[0]][7] = "사토";
  } else if (character.cflags[627] === 104) {
    character.cstr[ctx.locals[0]][7] = "스즈키";
  } else if (character.cflags[627] === 105) {
    character.cstr[ctx.locals[0]][7] = "사와다";
  } else if (character.cflags[627] === 106) {
    character.cstr[ctx.locals[0]][7] = "야나기사와";
  } else if (character.cflags[627] === 107) {
    character.cstr[ctx.locals[0]][7] = "사누마";
  } else if (character.cflags[627] === 108) {
    character.cstr[ctx.locals[0]][7] = "사키모리";
  } else if (character.cflags[627] === 109) {
    character.cstr[ctx.locals[0]][7] = "사시하라";
  } else if (character.cflags[627] === 110) {
    character.cstr[ctx.locals[0]][7] = "오지마";
  } else if (character.cflags[627] === 111) {
    character.cstr[ctx.locals[0]][7] = "이와다";
  } else if (character.cflags[627] === 112) {
    character.cstr[ctx.locals[0]][7] = "아오야마";
  } else if (character.cflags[627] === 113) {
    character.cstr[ctx.locals[0]][7] = "사이토";
  } else {
    character.cstr[ctx.locals[0]][7] = "길버트";
  }
  character.cflags[627] = 0;
  character.cflags[627] += ctx.rand(45);
  if (character.cflags[627] === 0) {
    character.cstr[ctx.locals[0]][8] = "아키히사";
  } else if (character.cflags[627] === 1) {
    character.cstr[ctx.locals[0]][8] = "이치로";
  } else if (character.cflags[627] === 2) {
    character.cstr[ctx.locals[0]][8] = "우쿄";
  } else if (character.cflags[627] === 3) {
    character.cstr[ctx.locals[0]][8] = "에이치로";
  } else if (character.cflags[627] === 4) {
    character.cstr[ctx.locals[0]][8] = "오가이";
  } else if (character.cflags[627] === 5) {
    character.cstr[ctx.locals[0]][8] = "카즈히토";
  } else if (character.cflags[627] === 6) {
    character.cstr[ctx.locals[0]][8] = "쿄스케";
  } else if (character.cflags[627] === 7) {
    character.cstr[ctx.locals[0]][8] = "쿠니아키";
  } else if (character.cflags[627] === 8) {
    character.cstr[ctx.locals[0]][8] = "켄이치";
  } else if (character.cflags[627] === 9) {
    character.cstr[ctx.locals[0]][8] = "코타로";
  } else if (character.cflags[627] === 10) {
    character.cstr[ctx.locals[0]][8] = "사토시";
  } else if (character.cflags[627] === 11) {
    character.cstr[ctx.locals[0]][8] = "쇼타";
  } else if (character.cflags[627] === 12) {
    character.cstr[ctx.locals[0]][8] = "스구루";
  } else if (character.cflags[627] === 13) {
    character.cstr[ctx.locals[0]][8] = "세이지";
  } else if (character.cflags[627] === 14) {
    character.cstr[ctx.locals[0]][8] = "소지";
  } else if (character.cflags[627] === 15) {
    character.cstr[ctx.locals[0]][8] = "타이치";
  } else if (character.cflags[627] === 16) {
    character.cstr[ctx.locals[0]][8] = "치하루";
  } else if (character.cflags[627] === 17) {
    character.cstr[ctx.locals[0]][8] = "츠네히코";
  } else if (character.cflags[627] === 18) {
    character.cstr[ctx.locals[0]][8] = "테루야";
  } else if (character.cflags[627] === 19) {
    character.cstr[ctx.locals[0]][8] = "토고";
  } else if (character.cflags[627] === 20) {
    character.cstr[ctx.locals[0]][8] = "나오토";
  } else if (character.cflags[627] === 21) {
    character.cstr[ctx.locals[0]][8] = "니헤이";
  } else if (character.cflags[627] === 22) {
    character.cstr[ctx.locals[0]][8] = "누이토";
  } else if (character.cflags[627] === 23) {
    character.cstr[ctx.locals[0]][8] = "네로";
  } else if (character.cflags[627] === 24) {
    character.cstr[ctx.locals[0]][8] = "켄스케";
  } else if (character.cflags[627] === 25) {
    character.cstr[ctx.locals[0]][8] = "하치로";
  } else if (character.cflags[627] === 26) {
    character.cstr[ctx.locals[0]][8] = "히데히사";
  } else if (character.cflags[627] === 27) {
    character.cstr[ctx.locals[0]][8] = "이쿠토";
  } else if (character.cflags[627] === 28) {
    character.cstr[ctx.locals[0]][8] = "헤이지";
  } else if (character.cflags[627] === 29) {
    character.cstr[ctx.locals[0]][8] = "호케이";
  } else if (character.cflags[627] === 30) {
    character.cstr[ctx.locals[0]][8] = "마사토";
  } else if (character.cflags[627] === 31) {
    character.cstr[ctx.locals[0]][8] = "미키야";
  } else if (character.cflags[627] === 32) {
    character.cstr[ctx.locals[0]][8] = "소마";
  } else if (character.cflags[627] === 33) {
    character.cstr[ctx.locals[0]][8] = "메구루";
  } else if (character.cflags[627] === 34) {
    character.cstr[ctx.locals[0]][8] = "시게히사";
  } else if (character.cflags[627] === 35) {
    character.cstr[ctx.locals[0]][8] = "야스시";
  } else if (character.cflags[627] === 36) {
    character.cstr[ctx.locals[0]][8] = "유키오";
  } else if (character.cflags[627] === 37) {
    character.cstr[ctx.locals[0]][8] = "요시히코";
  } else if (character.cflags[627] === 38) {
    character.cstr[ctx.locals[0]][8] = "요시히토";
  } else if (character.cflags[627] === 39) {
    character.cstr[ctx.locals[0]][8] = "라이언";
  } else if (character.cflags[627] === 40) {
    character.cstr[ctx.locals[0]][8] = "리치";
  } else if (character.cflags[627] === 41) {
    character.cstr[ctx.locals[0]][8] = "루히";
  } else if (character.cflags[627] === 42) {
    character.cstr[ctx.locals[0]][8] = "레오";
  } else if (character.cflags[627] === 43) {
    character.cstr[ctx.locals[0]][8] = "로쿠로";
  } else if (character.cflags[627] === 44) {
    character.cstr[ctx.locals[0]][8] = "와카노리";
  } else if (character.cflags[627] === 45) {
    character.cstr[ctx.locals[0]][8] = "이부키";
  } else {
    character.cstr[ctx.locals[0]][8] = "죠지";
  }
  character.cflags[627] = 0;
}

export async function decide_sexfriend2(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  character.cflags[627] += ctx.rand(45);
  if (character.cflags[627] === 0) {
    character.cstr[ctx.locals[0]][47] = "아사노";
  } else if (character.cflags[627] === 1) {
    character.cstr[ctx.locals[0]][47] = "이케조에";
  } else if (character.cflags[627] === 2) {
    character.cstr[ctx.locals[0]][47] = "우키타";
  } else if (character.cflags[627] === 3) {
    character.cstr[ctx.locals[0]][47] = "에다노";
  } else if (character.cflags[627] === 4) {
    character.cstr[ctx.locals[0]][47] = "오자와";
  } else if (character.cflags[627] === 5) {
    character.cstr[ctx.locals[0]][47] = "칸";
  } else if (character.cflags[627] === 6) {
    character.cstr[ctx.locals[0]][47] = "키시다";
  } else if (character.cflags[627] === 7) {
    character.cstr[ctx.locals[0]][47] = "쿠와시마";
  } else if (character.cflags[627] === 8) {
    character.cstr[ctx.locals[0]][47] = "케도인";
  } else if (character.cflags[627] === 9) {
    character.cstr[ctx.locals[0]][47] = "콘도";
  } else if (character.cflags[627] === 10) {
    character.cstr[ctx.locals[0]][47] = "사사모리";
  } else if (character.cflags[627] === 11) {
    character.cstr[ctx.locals[0]][47] = "시바타";
  } else if (character.cflags[627] === 12) {
    character.cstr[ctx.locals[0]][47] = "스와야마";
  } else if (character.cflags[627] === 13) {
    character.cstr[ctx.locals[0]][47] = "세노";
  } else if (character.cflags[627] === 14) {
    character.cstr[ctx.locals[0]][47] = "센고쿠";
  } else if (character.cflags[627] === 15) {
    character.cstr[ctx.locals[0]][47] = "타다노";
  } else if (character.cflags[627] === 16) {
    character.cstr[ctx.locals[0]][47] = "치탄다";
  } else if (character.cflags[627] === 17) {
    character.cstr[ctx.locals[0]][47] = "츠야마";
  } else if (character.cflags[627] === 18) {
    character.cstr[ctx.locals[0]][47] = "테즈카";
  } else if (character.cflags[627] === 19) {
    character.cstr[ctx.locals[0]][47] = "토이케";
  } else if (character.cflags[627] === 20) {
    character.cstr[ctx.locals[0]][47] = "나루미야";
  } else if (character.cflags[627] === 21) {
    character.cstr[ctx.locals[0]][47] = "니시나";
  } else if (character.cflags[627] === 22) {
    character.cstr[ctx.locals[0]][47] = "누마타";
  } else if (character.cflags[627] === 23) {
    character.cstr[ctx.locals[0]][47] = "네기시";
  } else if (character.cflags[627] === 24) {
    character.cstr[ctx.locals[0]][47] = "노다";
  } else if (character.cflags[627] === 25) {
    character.cstr[ctx.locals[0]][47] = "하토야마";
  } else if (character.cflags[627] === 26) {
    character.cstr[ctx.locals[0]][47] = "히라다";
  } else if (character.cflags[627] === 27) {
    character.cstr[ctx.locals[0]][47] = "후지와라";
  } else if (character.cflags[627] === 28) {
    character.cstr[ctx.locals[0]][47] = "헤노코";
  } else if (character.cflags[627] === 29) {
    character.cstr[ctx.locals[0]][47] = "혼야";
  } else if (character.cflags[627] === 30) {
    character.cstr[ctx.locals[0]][47] = "마에바라";
  } else if (character.cflags[627] === 31) {
    character.cstr[ctx.locals[0]][47] = "미타카";
  } else if (character.cflags[627] === 32) {
    character.cstr[ctx.locals[0]][47] = "무라키";
  } else if (character.cflags[627] === 33) {
    character.cstr[ctx.locals[0]][47] = "메지로";
  } else if (character.cflags[627] === 34) {
    character.cstr[ctx.locals[0]][47] = "모기";
  } else if (character.cflags[627] === 35) {
    character.cstr[ctx.locals[0]][47] = "야스다";
  } else if (character.cflags[627] === 36) {
    character.cstr[ctx.locals[0]][47] = "유아사";
  } else if (character.cflags[627] === 37) {
    character.cstr[ctx.locals[0]][47] = "요시다";
  } else if (character.cflags[627] === 38) {
    character.cstr[ctx.locals[0]][47] = "란도";
  } else if (character.cflags[627] === 39) {
    character.cstr[ctx.locals[0]][47] = "리키시";
  } else if (character.cflags[627] === 40) {
    character.cstr[ctx.locals[0]][47] = "루이혼";
  } else if (character.cflags[627] === 41) {
    character.cstr[ctx.locals[0]][47] = "레이바";
  } else if (character.cflags[627] === 42) {
    character.cstr[ctx.locals[0]][47] = "로기";
  } else if (character.cflags[627] === 43) {
    character.cstr[ctx.locals[0]][47] = "와카히사";
  } else if (character.cflags[627] === 44) {
    character.cstr[ctx.locals[0]][47] = "카네코";
  } else if (character.cflags[627] === 45) {
    character.cstr[ctx.locals[0]][47] = "사루야마";
  } else {
    character.cstr[ctx.locals[0]][47] = "길버트";
  }
  character.cflags[627] = 0;
  character.cflags[627] += ctx.rand(45);
  if (character.cflags[627] === 0) {
    character.cstr[ctx.locals[0]][48] = "아키히사";
  } else if (character.cflags[627] === 1) {
    character.cstr[ctx.locals[0]][48] = "이치로";
  } else if (character.cflags[627] === 2) {
    character.cstr[ctx.locals[0]][48] = "우쿄";
  } else if (character.cflags[627] === 3) {
    character.cstr[ctx.locals[0]][48] = "에이치로";
  } else if (character.cflags[627] === 4) {
    character.cstr[ctx.locals[0]][48] = "오가이";
  } else if (character.cflags[627] === 5) {
    character.cstr[ctx.locals[0]][48] = "카즈히토";
  } else if (character.cflags[627] === 6) {
    character.cstr[ctx.locals[0]][48] = "쿄스케";
  } else if (character.cflags[627] === 7) {
    character.cstr[ctx.locals[0]][48] = "쿠니아키";
  } else if (character.cflags[627] === 8) {
    character.cstr[ctx.locals[0]][48] = "켄이치";
  } else if (character.cflags[627] === 9) {
    character.cstr[ctx.locals[0]][48] = "코타로";
  } else if (character.cflags[627] === 10) {
    character.cstr[ctx.locals[0]][48] = "사토시";
  } else if (character.cflags[627] === 11) {
    character.cstr[ctx.locals[0]][48] = "쇼타";
  } else if (character.cflags[627] === 12) {
    character.cstr[ctx.locals[0]][48] = "스구루";
  } else if (character.cflags[627] === 13) {
    character.cstr[ctx.locals[0]][48] = "세이지";
  } else if (character.cflags[627] === 14) {
    character.cstr[ctx.locals[0]][48] = "소지";
  } else if (character.cflags[627] === 15) {
    character.cstr[ctx.locals[0]][48] = "타이치";
  } else if (character.cflags[627] === 16) {
    character.cstr[ctx.locals[0]][48] = "치하루";
  } else if (character.cflags[627] === 17) {
    character.cstr[ctx.locals[0]][48] = "츠네히코";
  } else if (character.cflags[627] === 18) {
    character.cstr[ctx.locals[0]][48] = "테루야";
  } else if (character.cflags[627] === 19) {
    character.cstr[ctx.locals[0]][48] = "토고";
  } else if (character.cflags[627] === 20) {
    character.cstr[ctx.locals[0]][48] = "나오토";
  } else if (character.cflags[627] === 21) {
    character.cstr[ctx.locals[0]][48] = "니헤이";
  } else if (character.cflags[627] === 22) {
    character.cstr[ctx.locals[0]][48] = "누이토";
  } else if (character.cflags[627] === 23) {
    character.cstr[ctx.locals[0]][48] = "네로";
  } else if (character.cflags[627] === 24) {
    character.cstr[ctx.locals[0]][48] = "켄스케";
  } else if (character.cflags[627] === 25) {
    character.cstr[ctx.locals[0]][48] = "하치로";
  } else if (character.cflags[627] === 26) {
    character.cstr[ctx.locals[0]][48] = "히데히사";
  } else if (character.cflags[627] === 27) {
    character.cstr[ctx.locals[0]][48] = "이쿠토";
  } else if (character.cflags[627] === 28) {
    character.cstr[ctx.locals[0]][48] = "헤이지";
  } else if (character.cflags[627] === 29) {
    character.cstr[ctx.locals[0]][48] = "호케이";
  } else if (character.cflags[627] === 30) {
    character.cstr[ctx.locals[0]][48] = "마사토";
  } else if (character.cflags[627] === 31) {
    character.cstr[ctx.locals[0]][48] = "미키야";
  } else if (character.cflags[627] === 32) {
    character.cstr[ctx.locals[0]][48] = "소마";
  } else if (character.cflags[627] === 33) {
    character.cstr[ctx.locals[0]][48] = "메구루";
  } else if (character.cflags[627] === 34) {
    character.cstr[ctx.locals[0]][48] = "시게히사";
  } else if (character.cflags[627] === 35) {
    character.cstr[ctx.locals[0]][48] = "야스시";
  } else if (character.cflags[627] === 36) {
    character.cstr[ctx.locals[0]][48] = "유키오";
  } else if (character.cflags[627] === 37) {
    character.cstr[ctx.locals[0]][48] = "요시히코";
  } else if (character.cflags[627] === 38) {
    character.cstr[ctx.locals[0]][48] = "요시히토";
  } else if (character.cflags[627] === 39) {
    character.cstr[ctx.locals[0]][48] = "라이언";
  } else if (character.cflags[627] === 40) {
    character.cstr[ctx.locals[0]][48] = "리치";
  } else if (character.cflags[627] === 41) {
    character.cstr[ctx.locals[0]][48] = "루히";
  } else if (character.cflags[627] === 42) {
    character.cstr[ctx.locals[0]][48] = "레오";
  } else if (character.cflags[627] === 43) {
    character.cstr[ctx.locals[0]][48] = "로쿠로";
  } else if (character.cflags[627] === 44) {
    character.cstr[ctx.locals[0]][48] = "와카노리";
  } else if (character.cflags[627] === 45) {
    character.cstr[ctx.locals[0]][48] = "이부키";
  } else {
    character.cstr[ctx.locals[0]][48] = "죠지";
  }
  character.cflags[627] = 0;
}
