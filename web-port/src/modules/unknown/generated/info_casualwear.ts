/**
 * INFO_CASUALWEAR.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function print_clothtype_casualwear(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character.cflags[178] === 0) {
    ctx.print('없음');
    return 1;
  } else if (character.cflags[178] === 1) {
    ctx.print('평상복+스커트');
    return 1;
  } else if (character.cflags[178] === 2) {
    ctx.print('고쿠아쿠 고등학교 교복');
    return 1;
  } else if (character.cflags[178] === 3) {
    ctx.print('히노데 고등학교 교복');
    return 1;
  } else if (character.cflags[178] === 4) {
    ctx.print('하나마루 고등학교 교복');
    return 1;
  } else if (character.cflags[178] === 5) {
    ctx.print('신세츠 고등학교 교복');
    return 1;
  } else if (character.cflags[178] === 6) {
    ctx.print('세이에이 고등학교 교복');
    return 1;
  } else if (character.cflags[178] === 7) {
    ctx.print('파라이소 중학교 교복');
    return 1;
  } else if (character.cflags[178] === 8) {
    ctx.print('사립 메키메키 학원 교복');
    return 1;
  } else if (character.cflags[178] === 17) {
    ctx.print('고등학교 교복');
    return 1;
  } else if (character.cflags[178] === 18) {
    ctx.print('중학교 교복');
    return 1;
  } else if (character.cflags[178] === 19) {
    ctx.print('세일러복');
    return 1;
  } else if (character.cflags[178] === 20) {
    ctx.print('마호라 여자중학교 교복');
    return 1;
  } else if (character.cflags[178] === 21) {
    ctx.print('정장+치마');
    return 1;
  } else if (character.cflags[178] === 22) {
    ctx.print('아동복');
    return 1;
  } else if (character.cflags[178] === 23) {
    ctx.print('명품옷');
    return 1;
  } else if (character.cflags[178] === 24) {
    ctx.print('간호사복');
    return 1;
  } else if (character.cflags[178] === 25) {
    ctx.print('메이드복');
    return 1;
  } else if (character.cflags[178] === 26) {
    ctx.print('웨이트리스복');
    return 1;
  } else if (character.cflags[178] === 27) {
    ctx.print('편의점 제복');
    return 1;
  } else if (character.cflags[178] === 28) {
    ctx.print('사무원 제복');
    return 1;
  } else if (character.cflags[178] === 29) {
    ctx.print('CPG 유니폼');
    return 1;
  } else if (character.cflags[178] === 30) {
    ctx.print('펑크 로리타');
    return 0;
  } else if (character.cflags[178] === 31) {
    ctx.print('블레이저+스커트');
    return 0;
  } else if (character.cflags[178] === 32) {
    ctx.print('상복');
    return 1;
  } else if (character.cflags[178] === 40) {
    ctx.print('캐미솔과 데님미니스커트');
    return 0;
  } else if (character.cflags[178] === 51) {
    ctx.print('군복');
    return 1;
  } else if (character.cflags[178] === 52) {
    ctx.print('고식 로리타');
    return 0;
  } else if (character.cflags[178] === 53) {
    ctx.print('마호라예대 부속 중학교 교복');
    return 1;
  } else if (character.cflags[178] === 54) {
    ctx.print('치어리더 의상');
    return 1;
  } else if (character.cflags[178] === 55) {
    ctx.print('테니스복+스터트');
    return 1;
  } else if (character.cflags[178] === 56) {
    ctx.print('할로윈 마녀복');
    return 1;
  } else if (character.cflags[178] === 99) {
    ctx.print('유리 메이드복');
    return 1;
  } else if (character.cflags[178] === 101) {
    ctx.print('평상복+바지');
    return 1;
  } else if (character.cflags[178] === 102) {
    ctx.print('정장+바지');
    return 1;
  } else if (character.cflags[178] === 103) {
    ctx.print('츄리닝+바지');
    return 1;
  } else if (character.cflags[178] === 104) {
    ctx.print('무녀복+하카마');
    return 1;
  } else if (character.cflags[178] === 105) {
    ctx.print('야구 유니폼');
    return 1;
  } else if (character.cflags[178] === 106) {
    ctx.print('군복+바지');
    return 1;
  } else if (character.cflags[178] === 108) {
    ctx.print('블레이저+바지');
    return 0;
  } else if (character.cflags[178] === 109) {
    ctx.print('체육복+브루마');
    return 1;
  } else if (character.cflags[178] === 110) {
    ctx.print('닌자복');
    return 1;
  } else if (character.cflags[178] === 111) {
    ctx.print('왕자복');
    return 1;
  } else if (character.cflags[178] === 122) {
    ctx.print('아동복');
    return 1;
  } else if (character.cflags[178] === 131) {
    ctx.print('잠옷');
    return 1;
  } else if (character.cflags[178] === 191) {
    ctx.print('마이크로 비키니');
    return 0;
  } else if (character.cflags[178] === 201) {
    ctx.print('원피스');
    return 0;
  } else if (character.cflags[178] === 202) {
    ctx.print('기모노');
    return 0;
  } else if (character.cflags[178] === 203) {
    ctx.print('칵테일 드레스');
    return 0;
  } else if (character.cflags[178] === 204) {
    ctx.print('유카타');
    return 0;
  } else if (character.cflags[178] === 205) {
    ctx.print('마이크로 미니타이트 원피스');
    return 0;
  } else if (character.cflags[178] === 221) {
    ctx.print('차이나 드레스');
    return 0;
  } else if (character.cflags[178] === 222) {
    ctx.print('페미닌 원피스');
    return 0;
  } else if (character.cflags[178] === 229) {
    ctx.print('중학교 교복');
    return 1;
  } else if (character.cflags[178] === 230) {
    ctx.print('성 우르술라 고등학교 교복');
    return 1;
  } else if (character.cflags[178] === 231) {
    ctx.print('수도복');
    return 1;
  } else if (character.cflags[178] === 232) {
    ctx.print('원피스 정장');
    return 1;
  } else if (character.cflags[178] === 233) {
    ctx.print('여자 음양사복');
    return 1;
  } else if (character.cflags[178] === 240) {
    ctx.print('웨딩 드레스');
    return 0;
  } else if (character.cflags[178] === 241) {
    ctx.print('본디지');
    return 0;
  } else if (character.cflags[178] === 242) {
    ctx.print('음마의 본디지');
    return 0;
  } else if (character.cflags[178] === 243) {
    ctx.print('벨리댄스복');
    return 1;
  } else if (character.cflags[178] === 244) {
    ctx.print('구형 학교수영복');
    return 1;
  } else if (character.cflags[178] === 245) {
    ctx.print('라텍스 슈트');
    return 0;
  } else if (character.cflags[178] === 246) {
    ctx.print('브라질 수영복');
    return 1;
  } else if (character.cflags[178] === 251) {
    ctx.print('전신 타이즈');
    return 0;
  } else if (character.cflags[178] === 252) {
    ctx.print('멜빵바지');
    return 0;
  } else if (character.cflags[178] === 253) {
    ctx.print('프로페라단 코스튬');
    return 1;
  } else if (character.cflags[178] === 254) {
    ctx.print('버니걸');
    return 1;
  } else if (character.cflags[178] === 291) {
    ctx.print('학교수영복');
    return 1;
  } else if (character.cflags[178] === 292) {
    ctx.print('블랙 코스튬');
    return 1;
  } else if (character.cflags[178] === 295) {
    ctx.print('레오타드');
    return 0;
  } else if (character.cflags[178] === -1) {
    ctx.print('속옷');
    return 1;
  } else {
    ctx.print('옷');
    return 1;
  }
}
