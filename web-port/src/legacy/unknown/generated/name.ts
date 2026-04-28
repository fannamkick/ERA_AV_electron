/**
 * NAME.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function family_name_japan(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: TSTR:50 =
  ctx.locals[0] = ctx.rand(100);
  if (ctx.locals[0] === 0) {
    TSTR[50] = "사토";
  } else if (ctx.locals[0] === 1) {
    TSTR[50] = "스즈키";
  } else if (ctx.locals[0] === 2) {
    TSTR[50] = "타카하시";
  } else if (ctx.locals[0] === 3) {
    TSTR[50] = "타나카";
  } else if (ctx.locals[0] === 4) {
    TSTR[50] = "와타나베";
  } else if (ctx.locals[0] === 5) {
    TSTR[50] = "이토";
  } else if (ctx.locals[0] === 6) {
    TSTR[50] = "야마모토";
  } else if (ctx.locals[0] === 7) {
    TSTR[50] = "나카무라";
  } else if (ctx.locals[0] === 8) {
    TSTR[50] = "코바야시";
  } else if (ctx.locals[0] === 9) {
    TSTR[50] = "사이토";
  } else if (ctx.locals[0] === 10) {
    TSTR[50] = "카토";
  } else if (ctx.locals[0] === 11) {
    TSTR[50] = "요시다";
  } else if (ctx.locals[0] === 12) {
    TSTR[50] = "야마다";
  } else if (ctx.locals[0] === 13) {
    TSTR[50] = "야마구치";
  } else if (ctx.locals[0] === 14) {
    TSTR[50] = "마츠모토";
  } else if (ctx.locals[0] === 15) {
    TSTR[50] = "이노우에";
  } else if (ctx.locals[0] === 16) {
    TSTR[50] = "키무라";
  } else if (ctx.locals[0] === 17) {
    TSTR[50] = "하야시";
  } else if (ctx.locals[0] === 18) {
    TSTR[50] = "야마자키";
  } else if (ctx.locals[0] === 19) {
    TSTR[50] = "나카시마";
  } else if (ctx.locals[0] === 20) {
    TSTR[50] = "이케다";
  } else if (ctx.locals[0] === 21) {
    TSTR[50] = "아베";
  } else if (ctx.locals[0] === 22) {
    TSTR[50] = "하시모토";
  } else if (ctx.locals[0] === 23) {
    TSTR[50] = "야마시타";
  } else if (ctx.locals[0] === 24) {
    TSTR[50] = "모리";
  } else if (ctx.locals[0] === 25) {
    TSTR[50] = "이시카와";
  } else if (ctx.locals[0] === 26) {
    TSTR[50] = "마에다";
  } else if (ctx.locals[0] === 27) {
    TSTR[50] = "오가와";
  } else if (ctx.locals[0] === 28) {
    TSTR[50] = "후지타";
  } else if (ctx.locals[0] === 29) {
    TSTR[50] = "오카다";
  } else if (ctx.locals[0] === 30) {
    TSTR[50] = "이시이";
  } else if (ctx.locals[0] === 31) {
    TSTR[50] = "무라카미";
  } else if (ctx.locals[0] === 32) {
    TSTR[50] = "콘도";
  } else if (ctx.locals[0] === 33) {
    TSTR[50] = "사카모토";
  } else if (ctx.locals[0] === 34) {
    TSTR[50] = "엔도";
  } else if (ctx.locals[0] === 35) {
    TSTR[50] = "아오키";
  } else if (ctx.locals[0] === 36) {
    TSTR[50] = "후지이";
  } else if (ctx.locals[0] === 37) {
    TSTR[50] = "니시무라";
  } else if (ctx.locals[0] === 38) {
    TSTR[50] = "후쿠다";
  } else if (ctx.locals[0] === 39) {
    TSTR[50] = "타다";
  } else if (ctx.locals[0] === 40) {
    TSTR[50] = "미우라";
  } else if (ctx.locals[0] === 41) {
    TSTR[50] = "후지와라";
  } else if (ctx.locals[0] === 42) {
    TSTR[50] = "오카모토";
  } else if (ctx.locals[0] === 43) {
    TSTR[50] = "마츠다";
  } else if (ctx.locals[0] === 44) {
    TSTR[50] = "나카가와";
  } else if (ctx.locals[0] === 45) {
    TSTR[50] = "나카노";
  } else if (ctx.locals[0] === 46) {
    TSTR[50] = "하라다";
  } else if (ctx.locals[0] === 47) {
    TSTR[50] = "오노";
  } else if (ctx.locals[0] === 48) {
    TSTR[50] = "타무라";
  } else if (ctx.locals[0] === 49) {
    TSTR[50] = "타케우치";
  } else if (ctx.locals[0] === 50) {
    TSTR[50] = "카네코";
  } else if (ctx.locals[0] === 51) {
    TSTR[50] = "와다";
  } else if (ctx.locals[0] === 52) {
    TSTR[50] = "나카야마";
  } else if (ctx.locals[0] === 53) {
    TSTR[50] = "이시다";
  } else if (ctx.locals[0] === 54) {
    TSTR[50] = "우에다";
  } else if (ctx.locals[0] === 55) {
    TSTR[50] = "모리타";
  } else if (ctx.locals[0] === 56) {
    TSTR[50] = "코지마";
  } else if (ctx.locals[0] === 57) {
    TSTR[50] = "시바타";
  } else if (ctx.locals[0] === 58) {
    TSTR[50] = "하라";
  } else if (ctx.locals[0] === 59) {
    TSTR[50] = "미야자카";
  } else if (ctx.locals[0] === 60) {
    TSTR[50] = "사카이";
  } else if (ctx.locals[0] === 61) {
    TSTR[50] = "쿠도";
  } else if (ctx.locals[0] === 62) {
    TSTR[50] = "요코야마";
  } else if (ctx.locals[0] === 63) {
    TSTR[50] = "미야모토";
  } else if (ctx.locals[0] === 64) {
    TSTR[50] = "우치다";
  } else if (ctx.locals[0] === 65) {
    TSTR[50] = "타카기";
  } else if (ctx.locals[0] === 66) {
    TSTR[50] = "안도";
  } else if (ctx.locals[0] === 67) {
    TSTR[50] = "시마다";
  } else if (ctx.locals[0] === 68) {
    TSTR[50] = "타니구치";
  } else if (ctx.locals[0] === 69) {
    TSTR[50] = "오노";
  } else if (ctx.locals[0] === 70) {
    TSTR[50] = "타카다";
  } else if (ctx.locals[0] === 71) {
    TSTR[50] = "마루야마";
  } else if (ctx.locals[0] === 72) {
    TSTR[50] = "이마이";
  } else if (ctx.locals[0] === 73) {
    TSTR[50] = "코노";
  } else if (ctx.locals[0] === 74) {
    TSTR[50] = "후지모토";
  } else if (ctx.locals[0] === 75) {
    TSTR[50] = "무라다";
  } else if (ctx.locals[0] === 76) {
    TSTR[50] = "타케다";
  } else if (ctx.locals[0] === 77) {
    TSTR[50] = "우에노";
  } else if (ctx.locals[0] === 78) {
    TSTR[50] = "스기야마";
  } else if (ctx.locals[0] === 79) {
    TSTR[50] = "마스다";
  } else if (ctx.locals[0] === 80) {
    TSTR[50] = "코야마";
  } else if (ctx.locals[0] === 81) {
    TSTR[50] = "오오츠카";
  } else if (ctx.locals[0] === 82) {
    TSTR[50] = "히라노";
  } else if (ctx.locals[0] === 83) {
    TSTR[50] = "스가와라";
  } else if (ctx.locals[0] === 84) {
    TSTR[50] = "쿠보";
  } else if (ctx.locals[0] === 85) {
    TSTR[50] = "마츠이";
  } else if (ctx.locals[0] === 86) {
    TSTR[50] = "치바";
  } else if (ctx.locals[0] === 87) {
    TSTR[50] = "이와자키";
  } else if (ctx.locals[0] === 88) {
    TSTR[50] = "키노시타";
  } else if (ctx.locals[0] === 89) {
    TSTR[50] = "노구치";
  } else if (ctx.locals[0] === 90) {
    TSTR[50] = "마츠오";
  } else if (ctx.locals[0] === 91) {
    TSTR[50] = "키구치";
  } else if (ctx.locals[0] === 92) {
    TSTR[50] = "노무라";
  } else if (ctx.locals[0] === 93) {
    TSTR[50] = "아라이";
  } else if (ctx.locals[0] === 94) {
    TSTR[50] = "와타나베";
  } else if (ctx.locals[0] === 95) {
    TSTR[50] = "사노";
  } else if (ctx.locals[0] === 96) {
    TSTR[50] = "스기모토";
  } else if (ctx.locals[0] === 97) {
    TSTR[50] = "오니시";
  } else if (ctx.locals[0] === 98) {
    TSTR[50] = "후루카와";
  } else if (ctx.locals[0] === 99) {
    TSTR[50] = "하마다";
  }
  return;
}

export async function last_name_japan_female(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: TSTR:51 =
  ctx.locals[0] = ctx.rand(110);
  if (ctx.locals[0] === 0) {
    TSTR[51] = "아이";
  } else if (ctx.locals[0] === 1) {
    TSTR[51] = "아오이";
  } else if (ctx.locals[0] === 2) {
    TSTR[51] = "아카네";
  } else if (ctx.locals[0] === 3) {
    TSTR[51] = "아카리";
  } else if (ctx.locals[0] === 4) {
    TSTR[51] = "아키코";
  } else if (ctx.locals[0] === 5) {
    TSTR[51] = "아스카";
  } else if (ctx.locals[0] === 6) {
    TSTR[51] = "아미";
  } else if (ctx.locals[0] === 7) {
    TSTR[51] = "이쿠코";
  } else if (ctx.locals[0] === 8) {
    TSTR[51] = "이요";
  } else if (ctx.locals[0] === 9) {
    TSTR[51] = "에이코";
  } else if (ctx.locals[0] === 10) {
    TSTR[51] = "에미";
  } else if (ctx.locals[0] === 11) {
    TSTR[51] = "카에데";
  } else if (ctx.locals[0] === 12) {
    TSTR[51] = "카오리";
  } else if (ctx.locals[0] === 13) {
    TSTR[51] = "카스미";
  } else if (ctx.locals[0] === 14) {
    TSTR[51] = "키쿠";
  } else if (ctx.locals[0] === 15) {
    TSTR[51] = "키미코";
  } else if (ctx.locals[0] === 16) {
    TSTR[51] = "쿄코";
  } else if (ctx.locals[0] === 17) {
    TSTR[51] = "쿠미";
  } else if (ctx.locals[0] === 18) {
    TSTR[51] = "케이코";
  } else if (ctx.locals[0] === 19) {
    TSTR[51] = "코즈에";
  } else if (ctx.locals[0] === 20) {
    TSTR[51] = "코토네";
  } else if (ctx.locals[0] === 21) {
    TSTR[51] = "코유키";
  } else if (ctx.locals[0] === 22) {
    TSTR[51] = "아야카";
  } else if (ctx.locals[0] === 23) {
    TSTR[51] = "사에코";
  } else if (ctx.locals[0] === 24) {
    TSTR[51] = "사오리";
  } else if (ctx.locals[0] === 25) {
    TSTR[51] = "사키";
  } else if (ctx.locals[0] === 26) {
    TSTR[51] = "사치코";
  } else if (ctx.locals[0] === 27) {
    TSTR[51] = "사토미";
  } else if (ctx.locals[0] === 28) {
    TSTR[51] = "사야카";
  } else if (ctx.locals[0] === 29) {
    TSTR[51] = "시오리";
  } else if (ctx.locals[0] === 30) {
    TSTR[51] = "시즈카";
  } else if (ctx.locals[0] === 31) {
    TSTR[51] = "시노부";
  } else if (ctx.locals[0] === 32) {
    TSTR[51] = "준코";
  } else if (ctx.locals[0] === 33) {
    TSTR[51] = "쇼코";
  } else if (ctx.locals[0] === 34) {
    TSTR[51] = "스즈네";
  } else if (ctx.locals[0] === 35) {
    TSTR[51] = "세이코";
  } else if (ctx.locals[0] === 36) {
    TSTR[51] = "세리카";
  } else if (ctx.locals[0] === 37) {
    TSTR[51] = "소노코";
  } else if (ctx.locals[0] === 38) {
    TSTR[51] = "타에코";
  } else if (ctx.locals[0] === 39) {
    TSTR[51] = "타마미";
  } else if (ctx.locals[0] === 40) {
    TSTR[51] = "타미코";
  } else if (ctx.locals[0] === 41) {
    TSTR[51] = "치아키";
  } else if (ctx.locals[0] === 42) {
    TSTR[51] = "치에코";
  } else if (ctx.locals[0] === 43) {
    TSTR[51] = "츠키요";
  } else if (ctx.locals[0] === 44) {
    TSTR[51] = "츠바키";
  } else if (ctx.locals[0] === 45) {
    TSTR[51] = "테츠코";
  } else if (ctx.locals[0] === 46) {
    TSTR[51] = "테루미";
  } else if (ctx.locals[0] === 47) {
    TSTR[51] = "토우코";
  } else if (ctx.locals[0] === 48) {
    TSTR[51] = "토키코";
  } else if (ctx.locals[0] === 49) {
    TSTR[51] = "토시코";
  } else if (ctx.locals[0] === 50) {
    TSTR[51] = "토모에";
  } else if (ctx.locals[0] === 51) {
    TSTR[51] = "토모코";
  } else if (ctx.locals[0] === 52) {
    TSTR[51] = "토모미";
  } else if (ctx.locals[0] === 53) {
    TSTR[51] = "나오코";
  } else if (ctx.locals[0] === 54) {
    TSTR[51] = "나나코";
  } else if (ctx.locals[0] === 55) {
    TSTR[51] = "나츠키";
  } else if (ctx.locals[0] === 56) {
    TSTR[51] = "나루미";
  } else if (ctx.locals[0] === 57) {
    TSTR[51] = "니이나";
  } else if (ctx.locals[0] === 58) {
    TSTR[51] = "네이코";
  } else if (ctx.locals[0] === 59) {
    TSTR[51] = "네네";
  } else if (ctx.locals[0] === 60) {
    TSTR[51] = "노조미";
  } else if (ctx.locals[0] === 61) {
    TSTR[51] = "노리코";
  } else if (ctx.locals[0] === 62) {
    TSTR[51] = "하즈키";
  } else if (ctx.locals[0] === 63) {
    TSTR[51] = "하츠미";
  } else if (ctx.locals[0] === 64) {
    TSTR[51] = "하나코";
  } else if (ctx.locals[0] === 65) {
    TSTR[51] = "히카리";
  } else if (ctx.locals[0] === 66) {
    TSTR[51] = "히사코";
  } else if (ctx.locals[0] === 67) {
    TSTR[51] = "히데미";
  } else if (ctx.locals[0] === 68) {
    TSTR[51] = "하루나";
  } else if (ctx.locals[0] === 69) {
    TSTR[51] = "히로코";
  } else if (ctx.locals[0] === 70) {
    TSTR[51] = "히로미";
  } else if (ctx.locals[0] === 71) {
    TSTR[51] = "후지코";
  } else if (ctx.locals[0] === 72) {
    TSTR[51] = "후미코";
  } else if (ctx.locals[0] === 73) {
    TSTR[51] = "호노카";
  } else if (ctx.locals[0] === 74) {
    TSTR[51] = "마이";
  } else if (ctx.locals[0] === 75) {
    TSTR[51] = "마오";
  } else if (ctx.locals[0] === 76) {
    TSTR[51] = "마리코";
  } else if (ctx.locals[0] === 77) {
    TSTR[51] = "마사미";
  } else if (ctx.locals[0] === 78) {
    TSTR[51] = "마나카";
  } else if (ctx.locals[0] === 79) {
    TSTR[51] = "마미";
  } else if (ctx.locals[0] === 80) {
    TSTR[51] = "마유미";
  } else if (ctx.locals[0] === 81) {
    TSTR[51] = "마리에";
  } else if (ctx.locals[0] === 82) {
    TSTR[51] = "미카";
  } else if (ctx.locals[0] === 83) {
    TSTR[51] = "미키코";
  } else if (ctx.locals[0] === 84) {
    TSTR[51] = "미사키";
  } else if (ctx.locals[0] === 85) {
    TSTR[51] = "미즈키";
  } else if (ctx.locals[0] === 86) {
    TSTR[51] = "미츠키";
  } else if (ctx.locals[0] === 87) {
    TSTR[51] = "미도리";
  } else if (ctx.locals[0] === 88) {
    TSTR[51] = "무츠미";
  } else if (ctx.locals[0] === 89) {
    TSTR[51] = "메구미";
  } else if (ctx.locals[0] === 90) {
    TSTR[51] = "모모에";
  } else if (ctx.locals[0] === 91) {
    TSTR[51] = "야에코";
  } else if (ctx.locals[0] === 92) {
    TSTR[51] = "야스코";
  } else if (ctx.locals[0] === 93) {
    TSTR[51] = "유이";
  } else if (ctx.locals[0] === 94) {
    TSTR[51] = "유키";
  } else if (ctx.locals[0] === 95) {
    TSTR[51] = "유코";
  } else if (ctx.locals[0] === 96) {
    TSTR[51] = "유마";
  } else if (ctx.locals[0] === 97) {
    TSTR[51] = "유리코";
  } else if (ctx.locals[0] === 98) {
    TSTR[51] = "요코";
  } else if (ctx.locals[0] === 99) {
    TSTR[51] = "란";
  } else if (ctx.locals[0] === 100) {
    TSTR[51] = "리코";
  } else if (ctx.locals[0] === 101) {
    TSTR[51] = "리츠코";
  } else if (ctx.locals[0] === 102) {
    TSTR[51] = "리나";
  } else if (ctx.locals[0] === 103) {
    TSTR[51] = "료코";
  } else if (ctx.locals[0] === 104) {
    TSTR[51] = "루미";
  } else if (ctx.locals[0] === 105) {
    TSTR[51] = "루리";
  } else if (ctx.locals[0] === 106) {
    TSTR[51] = "레이코";
  } else if (ctx.locals[0] === 107) {
    TSTR[51] = "레오나";
  } else if (ctx.locals[0] === 108) {
    TSTR[51] = "와카코";
  } else if (ctx.locals[0] === 109) {
    TSTR[51] = "와카바";
  }
  return;
}
