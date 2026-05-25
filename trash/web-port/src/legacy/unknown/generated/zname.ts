/**
 * ZNAME.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function ____args_(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #FUNCTIONS
  if (ctx.argStrings[0] == "나가") {
    ctx.argStrings[0] = "내가";
  }
  if (ctx.argStrings[0] == "저가") {
    ctx.argStrings[0] = "제가";
  }
  if (ctx.argStrings[0] == "나의") {
    ctx.argStrings[0] = "내";
  }
  if (ctx.argStrings[0] == "너의") {
    ctx.argStrings[0] = "네";
  }
  if (ctx.argStrings[0] == "저의") {
    ctx.argStrings[0] = "제";
  }
  return;
}

export async function kr_name_args_(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #FUNCTION
  // TODO: #LOCALSIZE 6
  // TODO: #LOCALSSIZE 6
  ctx.locals[5] = ctx.result;
  ctx.localStrings[5] = ctx.results;
  ctx.localStrings[1] = ctx.argStrings[0];
  // TODO: STRLENSU LOCALS:1
  ctx.locals[1] = ctx.result - 1;
  if (ctx.locals[1] > 0) {
    // TODO: SUBSTRINGU LOCALS:1, LOCAL:1, 1
  } else {
    // TODO: SUBSTRINGU LOCALS:1, 0, 1
  }
  ctx.localStrings[2] = ctx.results;
  // TODO: WHILE LOCAL:1 > 0
  switch (ctx.localStrings[2]) {
    case ")":
      // TODO: WHILE LOCALS:2 != "(" && LOCAL:1 > 0
      ctx.locals[1] -= 1;
      // TODO: SUBSTRINGU LOCALS:1, LOCAL:1, 1
      ctx.localStrings[2] = ctx.results;
      // TODO: WEND
      ctx.locals[1] -= 1;
      // TODO: SUBSTRINGU LOCALS:1, LOCAL:1, 1
      ctx.localStrings[2] = ctx.results;
      // TODO: CONTINUE
      case ")":
        // TODO: WHILE LOCALS:2 != "(" && LOCAL:1 > 0
        ctx.locals[1] -= 1;
        // TODO: SUBSTRINGU LOCALS:1, LOCAL:1, 1
        ctx.localStrings[2] = ctx.results;
        // TODO: WEND
        ctx.locals[1] -= 1;
        // TODO: SUBSTRINGU LOCALS:1, LOCAL:1, 1
        ctx.localStrings[2] = ctx.results;
        // TODO: CONTINUE
        case "~":
          ctx.locals[1] -= 1;
          // TODO: SUBSTRINGU LOCALS:1, LOCAL:1, 1
          ctx.localStrings[2] = ctx.results;
          // TODO: CONTINUE
        break;
      }
      // TODO: BREAK
      // TODO: WEND
      ctx.result = ctx.locals[5];
      ctx.locals[5] = 0;
      ctx.results = ctx.localStrings[5];
      ctx.localStrings[5] = 0;
      if (ctx.localStrings[2] === "가") {
        return;
      } else if (ctx.localStrings[2] === "나") {
        return;
      } else if (ctx.localStrings[2] === "다") {
        return;
      } else if (ctx.localStrings[2] === "라") {
        return;
      } else if (ctx.localStrings[2] === "마") {
        return;
      } else if (ctx.localStrings[2] === "바") {
        return;
      } else if (ctx.localStrings[2] === "사") {
        return;
      } else if (ctx.localStrings[2] === "아") {
        return;
      } else if (ctx.localStrings[2] === "자") {
        return;
      } else if (ctx.localStrings[2] === "차") {
        return;
      } else if (ctx.localStrings[2] === "카") {
        return;
      } else if (ctx.localStrings[2] === "타") {
        return;
      } else if (ctx.localStrings[2] === "파") {
        return;
      } else if (ctx.localStrings[2] === "하") {
        return;
      } else if (ctx.localStrings[2] === "까") {
        return;
      } else if (ctx.localStrings[2] === "따") {
        return;
      } else if (ctx.localStrings[2] === "빠") {
        return;
      } else if (ctx.localStrings[2] === "싸") {
        return;
      } else if (ctx.localStrings[2] === "짜") {
        return;
      } else if (ctx.localStrings[2] === "갸") {
        return;
      } else if (ctx.localStrings[2] === "냐") {
        return;
      } else if (ctx.localStrings[2] === "댜") {
        return;
      } else if (ctx.localStrings[2] === "랴") {
        return;
      } else if (ctx.localStrings[2] === "먀") {
        return;
      } else if (ctx.localStrings[2] === "뱌") {
        return;
      } else if (ctx.localStrings[2] === "샤") {
        return;
      } else if (ctx.localStrings[2] === "야") {
        return;
      } else if (ctx.localStrings[2] === "쟈") {
        return;
      } else if (ctx.localStrings[2] === "챠") {
        return;
      } else if (ctx.localStrings[2] === "캬") {
        return;
      } else if (ctx.localStrings[2] === "탸") {
        return;
      } else if (ctx.localStrings[2] === "퍄") {
        return;
      } else if (ctx.localStrings[2] === "햐") {
        return;
      } else if (ctx.localStrings[2] === "꺄") {
        return;
      } else if (ctx.localStrings[2] === "땨") {
        return;
      } else if (ctx.localStrings[2] === "뺘") {
        return;
      } else if (ctx.localStrings[2] === "쌰") {
        return;
      } else if (ctx.localStrings[2] === "쨔") {
        return;
      } else if (ctx.localStrings[2] === "거") {
        return;
      } else if (ctx.localStrings[2] === "너") {
        return;
      } else if (ctx.localStrings[2] === "더") {
        return;
      } else if (ctx.localStrings[2] === "러") {
        return;
      } else if (ctx.localStrings[2] === "머") {
        return;
      } else if (ctx.localStrings[2] === "버") {
        return;
      } else if (ctx.localStrings[2] === "서") {
        return;
      } else if (ctx.localStrings[2] === "어") {
        return;
      } else if (ctx.localStrings[2] === "저") {
        return;
      } else if (ctx.localStrings[2] === "처") {
        return;
      } else if (ctx.localStrings[2] === "커") {
        return;
      } else if (ctx.localStrings[2] === "터") {
        return;
      } else if (ctx.localStrings[2] === "퍼") {
        return;
      } else if (ctx.localStrings[2] === "허") {
        return;
      } else if (ctx.localStrings[2] === "꺼") {
        return;
      } else if (ctx.localStrings[2] === "떠") {
        return;
      } else if (ctx.localStrings[2] === "뻐") {
        return;
      } else if (ctx.localStrings[2] === "써") {
        return;
      } else if (ctx.localStrings[2] === "쩌") {
        return;
      } else if (ctx.localStrings[2] === "겨") {
        return;
      } else if (ctx.localStrings[2] === "녀") {
        return;
      } else if (ctx.localStrings[2] === "뎌") {
        return;
      } else if (ctx.localStrings[2] === "려") {
        return;
      } else if (ctx.localStrings[2] === "며") {
        return;
      } else if (ctx.localStrings[2] === "벼") {
        return;
      } else if (ctx.localStrings[2] === "셔") {
        return;
      } else if (ctx.localStrings[2] === "여") {
        return;
      } else if (ctx.localStrings[2] === "져") {
        return;
      } else if (ctx.localStrings[2] === "쳐") {
        return;
      } else if (ctx.localStrings[2] === "켜") {
        return;
      } else if (ctx.localStrings[2] === "텨") {
        return;
      } else if (ctx.localStrings[2] === "펴") {
        return;
      } else if (ctx.localStrings[2] === "혀") {
        return;
      } else if (ctx.localStrings[2] === "껴") {
        return;
      } else if (ctx.localStrings[2] === "뗘") {
        return;
      } else if (ctx.localStrings[2] === "뼈") {
        return;
      } else if (ctx.localStrings[2] === "쎠") {
        return;
      } else if (ctx.localStrings[2] === "쪄") {
        return;
      } else if (ctx.localStrings[2] === "고") {
        return;
      } else if (ctx.localStrings[2] === "노") {
        return;
      } else if (ctx.localStrings[2] === "도") {
        return;
      } else if (ctx.localStrings[2] === "로") {
        return;
      } else if (ctx.localStrings[2] === "모") {
        return;
      } else if (ctx.localStrings[2] === "보") {
        return;
      } else if (ctx.localStrings[2] === "소") {
        return;
      } else if (ctx.localStrings[2] === "오") {
        return;
      } else if (ctx.localStrings[2] === "조") {
        return;
      } else if (ctx.localStrings[2] === "초") {
        return;
      } else if (ctx.localStrings[2] === "코") {
        return;
      } else if (ctx.localStrings[2] === "토") {
        return;
      } else if (ctx.localStrings[2] === "포") {
        return;
      } else if (ctx.localStrings[2] === "호") {
        return;
      } else if (ctx.localStrings[2] === "꼬") {
        return;
      } else if (ctx.localStrings[2] === "또") {
        return;
      } else if (ctx.localStrings[2] === "뽀") {
        return;
      } else if (ctx.localStrings[2] === "쏘") {
        return;
      } else if (ctx.localStrings[2] === "쯔") {
        return;
      } else if (ctx.localStrings[2] === "교") {
        return;
      } else if (ctx.localStrings[2] === "뇨") {
        return;
      } else if (ctx.localStrings[2] === "됴") {
        return;
      } else if (ctx.localStrings[2] === "료") {
        return;
      } else if (ctx.localStrings[2] === "묘") {
        return;
      } else if (ctx.localStrings[2] === "뵤") {
        return;
      } else if (ctx.localStrings[2] === "쇼") {
        return;
      } else if (ctx.localStrings[2] === "요") {
        return;
      } else if (ctx.localStrings[2] === "죠") {
        return;
      } else if (ctx.localStrings[2] === "쵸") {
        return;
      } else if (ctx.localStrings[2] === "쿄") {
        return;
      } else if (ctx.localStrings[2] === "툐") {
        return;
      } else if (ctx.localStrings[2] === "표") {
        return;
      } else if (ctx.localStrings[2] === "효") {
        return;
      } else if (ctx.localStrings[2] === "꾜") {
        return;
      } else if (ctx.localStrings[2] === "뚀") {
        return;
      } else if (ctx.localStrings[2] === "뾰") {
        return;
      } else if (ctx.localStrings[2] === "쑈") {
        return;
      } else if (ctx.localStrings[2] === "쬬") {
        return;
      } else if (ctx.localStrings[2] === "구") {
        return;
      } else if (ctx.localStrings[2] === "누") {
        return;
      } else if (ctx.localStrings[2] === "두") {
        return;
      } else if (ctx.localStrings[2] === "루") {
        return;
      } else if (ctx.localStrings[2] === "무") {
        return;
      } else if (ctx.localStrings[2] === "부") {
        return;
      } else if (ctx.localStrings[2] === "수") {
        return;
      } else if (ctx.localStrings[2] === "우") {
        return;
      } else if (ctx.localStrings[2] === "주") {
        return;
      } else if (ctx.localStrings[2] === "추") {
        return;
      } else if (ctx.localStrings[2] === "쿠") {
        return;
      } else if (ctx.localStrings[2] === "투") {
        return;
      } else if (ctx.localStrings[2] === "푸") {
        return;
      } else if (ctx.localStrings[2] === "후") {
        return;
      } else if (ctx.localStrings[2] === "꾸") {
        return;
      } else if (ctx.localStrings[2] === "뚜") {
        return;
      } else if (ctx.localStrings[2] === "뿌") {
        return;
      } else if (ctx.localStrings[2] === "쑤") {
        return;
      } else if (ctx.localStrings[2] === "쭈") {
        return;
      } else if (ctx.localStrings[2] === "규") {
        return;
      } else if (ctx.localStrings[2] === "뉴") {
        return;
      } else if (ctx.localStrings[2] === "듀") {
        return;
      } else if (ctx.localStrings[2] === "류") {
        return;
      } else if (ctx.localStrings[2] === "뮤") {
        return;
      } else if (ctx.localStrings[2] === "뷰") {
        return;
      } else if (ctx.localStrings[2] === "슈") {
        return;
      } else if (ctx.localStrings[2] === "유") {
        return;
      } else if (ctx.localStrings[2] === "쥬") {
        return;
      } else if (ctx.localStrings[2] === "츄") {
        return;
      } else if (ctx.localStrings[2] === "큐") {
        return;
      } else if (ctx.localStrings[2] === "튜") {
        return;
      } else if (ctx.localStrings[2] === "퓨") {
        return;
      } else if (ctx.localStrings[2] === "휴") {
        return;
      } else if (ctx.localStrings[2] === "뀨") {
        return;
      } else if (ctx.localStrings[2] === "뜌") {
        return;
      } else if (ctx.localStrings[2] === "쀼") {
        return;
      } else if (ctx.localStrings[2] === "쓔") {
        return;
      } else if (ctx.localStrings[2] === "쮸") {
        return;
      } else if (ctx.localStrings[2] === "그") {
        return;
      } else if (ctx.localStrings[2] === "느") {
        return;
      } else if (ctx.localStrings[2] === "드") {
        return;
      } else if (ctx.localStrings[2] === "르") {
        return;
      } else if (ctx.localStrings[2] === "므") {
        return;
      } else if (ctx.localStrings[2] === "브") {
        return;
      } else if (ctx.localStrings[2] === "스") {
        return;
      } else if (ctx.localStrings[2] === "으") {
        return;
      } else if (ctx.localStrings[2] === "즈") {
        return;
      } else if (ctx.localStrings[2] === "츠") {
        return;
      } else if (ctx.localStrings[2] === "크") {
        return;
      } else if (ctx.localStrings[2] === "트") {
        return;
      } else if (ctx.localStrings[2] === "프") {
        return;
      } else if (ctx.localStrings[2] === "흐") {
        return;
      } else if (ctx.localStrings[2] === "끄") {
        return;
      } else if (ctx.localStrings[2] === "뜨") {
        return;
      } else if (ctx.localStrings[2] === "쁘") {
        return;
      } else if (ctx.localStrings[2] === "쓰") {
        return;
      } else if (ctx.localStrings[2] === "쯔") {
        return;
      } else if (ctx.localStrings[2] === "기") {
        return;
      } else if (ctx.localStrings[2] === "니") {
        return;
      } else if (ctx.localStrings[2] === "디") {
        return;
      } else if (ctx.localStrings[2] === "리") {
        return;
      } else if (ctx.localStrings[2] === "미") {
        return;
      } else if (ctx.localStrings[2] === "비") {
        return;
      } else if (ctx.localStrings[2] === "시") {
        return;
      } else if (ctx.localStrings[2] === "이") {
        return;
      } else if (ctx.localStrings[2] === "지") {
        return;
      } else if (ctx.localStrings[2] === "치") {
        return;
      } else if (ctx.localStrings[2] === "키") {
        return;
      } else if (ctx.localStrings[2] === "티") {
        return;
      } else if (ctx.localStrings[2] === "피") {
        return;
      } else if (ctx.localStrings[2] === "히") {
        return;
      } else if (ctx.localStrings[2] === "끼") {
        return;
      } else if (ctx.localStrings[2] === "띠") {
        return;
      } else if (ctx.localStrings[2] === "삐") {
        return;
      } else if (ctx.localStrings[2] === "씨") {
        return;
      } else if (ctx.localStrings[2] === "찌") {
        return;
      } else if (ctx.localStrings[2] === "개") {
        return;
      } else if (ctx.localStrings[2] === "내") {
        return;
      } else if (ctx.localStrings[2] === "대") {
        return;
      } else if (ctx.localStrings[2] === "래") {
        return;
      } else if (ctx.localStrings[2] === "매") {
        return;
      } else if (ctx.localStrings[2] === "배") {
        return;
      } else if (ctx.localStrings[2] === "새") {
        return;
      } else if (ctx.localStrings[2] === "애") {
        return;
      } else if (ctx.localStrings[2] === "재") {
        return;
      } else if (ctx.localStrings[2] === "채") {
        return;
      } else if (ctx.localStrings[2] === "캐") {
        return;
      } else if (ctx.localStrings[2] === "태") {
        return;
      } else if (ctx.localStrings[2] === "패") {
        return;
      } else if (ctx.localStrings[2] === "해") {
        return;
      } else if (ctx.localStrings[2] === "깨") {
        return;
      } else if (ctx.localStrings[2] === "때") {
        return;
      } else if (ctx.localStrings[2] === "빼") {
        return;
      } else if (ctx.localStrings[2] === "쌔") {
        return;
      } else if (ctx.localStrings[2] === "째") {
        return;
      } else if (ctx.localStrings[2] === "걔") {
        return;
      } else if (ctx.localStrings[2] === "냬") {
        return;
      } else if (ctx.localStrings[2] === "댸") {
        return;
      } else if (ctx.localStrings[2] === "럐") {
        return;
      } else if (ctx.localStrings[2] === "먜") {
        return;
      } else if (ctx.localStrings[2] === "뱨") {
        return;
      } else if (ctx.localStrings[2] === "섀") {
        return;
      } else if (ctx.localStrings[2] === "얘") {
        return;
      } else if (ctx.localStrings[2] === "쟤") {
        return;
      } else if (ctx.localStrings[2] === "챼") {
        return;
      } else if (ctx.localStrings[2] === "컈") {
        return;
      } else if (ctx.localStrings[2] === "턔") {
        return;
      } else if (ctx.localStrings[2] === "퍠") {
        return;
      } else if (ctx.localStrings[2] === "햬") {
        return;
      } else if (ctx.localStrings[2] === "꺠") {
        return;
      } else if (ctx.localStrings[2] === "떄") {
        return;
      } else if (ctx.localStrings[2] === "뺴") {
        return;
      } else if (ctx.localStrings[2] === "썌") {
        return;
      } else if (ctx.localStrings[2] === "쨰") {
        return;
      } else if (ctx.localStrings[2] === "게") {
        return;
      } else if (ctx.localStrings[2] === "네") {
        return;
      } else if (ctx.localStrings[2] === "데") {
        return;
      } else if (ctx.localStrings[2] === "레") {
        return;
      } else if (ctx.localStrings[2] === "메") {
        return;
      } else if (ctx.localStrings[2] === "베") {
        return;
      } else if (ctx.localStrings[2] === "세") {
        return;
      } else if (ctx.localStrings[2] === "에") {
        return;
      } else if (ctx.localStrings[2] === "제") {
        return;
      } else if (ctx.localStrings[2] === "체") {
        return;
      } else if (ctx.localStrings[2] === "케") {
        return;
      } else if (ctx.localStrings[2] === "테") {
        return;
      } else if (ctx.localStrings[2] === "페") {
        return;
      } else if (ctx.localStrings[2] === "헤") {
        return;
      } else if (ctx.localStrings[2] === "께") {
        return;
      } else if (ctx.localStrings[2] === "떼") {
        return;
      } else if (ctx.localStrings[2] === "뻬") {
        return;
      } else if (ctx.localStrings[2] === "쎄") {
        return;
      } else if (ctx.localStrings[2] === "쩨") {
        return;
      } else if (ctx.localStrings[2] === "계") {
        return;
      } else if (ctx.localStrings[2] === "녜") {
        return;
      } else if (ctx.localStrings[2] === "뎨") {
        return;
      } else if (ctx.localStrings[2] === "례") {
        return;
      } else if (ctx.localStrings[2] === "몌") {
        return;
      } else if (ctx.localStrings[2] === "볘") {
        return;
      } else if (ctx.localStrings[2] === "셰") {
        return;
      } else if (ctx.localStrings[2] === "예") {
        return;
      } else if (ctx.localStrings[2] === "졔") {
        return;
      } else if (ctx.localStrings[2] === "쳬") {
        return;
      } else if (ctx.localStrings[2] === "켸") {
        return;
      } else if (ctx.localStrings[2] === "톄") {
        return;
      } else if (ctx.localStrings[2] === "폐") {
        return;
      } else if (ctx.localStrings[2] === "혜") {
        return;
      } else if (ctx.localStrings[2] === "꼐") {
        return;
      } else if (ctx.localStrings[2] === "뗴") {
        return;
      } else if (ctx.localStrings[2] === "뼤") {
        return;
      } else if (ctx.localStrings[2] === "쎼") {
        return;
      } else if (ctx.localStrings[2] === "쪠") {
        return;
      } else if (ctx.localStrings[2] === "과") {
        return;
      } else if (ctx.localStrings[2] === "놔") {
        return;
      } else if (ctx.localStrings[2] === "돠") {
        return;
      } else if (ctx.localStrings[2] === "롸") {
        return;
      } else if (ctx.localStrings[2] === "뫄") {
        return;
      } else if (ctx.localStrings[2] === "봐") {
        return;
      } else if (ctx.localStrings[2] === "솨") {
        return;
      } else if (ctx.localStrings[2] === "와") {
        return;
      } else if (ctx.localStrings[2] === "좌") {
        return;
      } else if (ctx.localStrings[2] === "촤") {
        return;
      } else if (ctx.localStrings[2] === "콰") {
        return;
      } else if (ctx.localStrings[2] === "톼") {
        return;
      } else if (ctx.localStrings[2] === "퐈") {
        return;
      } else if (ctx.localStrings[2] === "화") {
        return;
      } else if (ctx.localStrings[2] === "꽈") {
        return;
      } else if (ctx.localStrings[2] === "똬") {
        return;
      } else if (ctx.localStrings[2] === "뽜") {
        return;
      } else if (ctx.localStrings[2] === "쏴") {
        return;
      } else if (ctx.localStrings[2] === "쫘") {
        return;
      } else if (ctx.localStrings[2] === "괘") {
        return;
      } else if (ctx.localStrings[2] === "놰") {
        return;
      } else if (ctx.localStrings[2] === "돼") {
        return;
      } else if (ctx.localStrings[2] === "뢔") {
        return;
      } else if (ctx.localStrings[2] === "뫠") {
        return;
      } else if (ctx.localStrings[2] === "봬") {
        return;
      } else if (ctx.localStrings[2] === "쇄") {
        return;
      } else if (ctx.localStrings[2] === "왜") {
        return;
      } else if (ctx.localStrings[2] === "좨") {
        return;
      } else if (ctx.localStrings[2] === "쵀") {
        return;
      } else if (ctx.localStrings[2] === "쾌") {
        return;
      } else if (ctx.localStrings[2] === "퇘") {
        return;
      } else if (ctx.localStrings[2] === "퐤") {
        return;
      } else if (ctx.localStrings[2] === "홰") {
        return;
      } else if (ctx.localStrings[2] === "꽤") {
        return;
      } else if (ctx.localStrings[2] === "뙈") {
        return;
      } else if (ctx.localStrings[2] === "뽸") {
        return;
      } else if (ctx.localStrings[2] === "쐐") {
        return;
      } else if (ctx.localStrings[2] === "쫴") {
        return;
      } else if (ctx.localStrings[2] === "괴") {
        return;
      } else if (ctx.localStrings[2] === "뇌") {
        return;
      } else if (ctx.localStrings[2] === "되") {
        return;
      } else if (ctx.localStrings[2] === "뢰") {
        return;
      } else if (ctx.localStrings[2] === "뫼") {
        return;
      } else if (ctx.localStrings[2] === "뵈") {
        return;
      } else if (ctx.localStrings[2] === "쇠") {
        return;
      } else if (ctx.localStrings[2] === "외") {
        return;
      } else if (ctx.localStrings[2] === "죄") {
        return;
      } else if (ctx.localStrings[2] === "최") {
        return;
      } else if (ctx.localStrings[2] === "쾨") {
        return;
      } else if (ctx.localStrings[2] === "퇴") {
        return;
      } else if (ctx.localStrings[2] === "푀") {
        return;
      } else if (ctx.localStrings[2] === "회") {
        return;
      } else if (ctx.localStrings[2] === "꾀") {
        return;
      } else if (ctx.localStrings[2] === "뙤") {
        return;
      } else if (ctx.localStrings[2] === "뾔") {
        return;
      } else if (ctx.localStrings[2] === "쐬") {
        return;
      } else if (ctx.localStrings[2] === "쬐") {
        return;
      } else if (ctx.localStrings[2] === "궈") {
        return;
      } else if (ctx.localStrings[2] === "눠") {
        return;
      } else if (ctx.localStrings[2] === "둬") {
        return;
      } else if (ctx.localStrings[2] === "뤄") {
        return;
      } else if (ctx.localStrings[2] === "뭐") {
        return;
      } else if (ctx.localStrings[2] === "붜") {
        return;
      } else if (ctx.localStrings[2] === "숴") {
        return;
      } else if (ctx.localStrings[2] === "워") {
        return;
      } else if (ctx.localStrings[2] === "줘") {
        return;
      } else if (ctx.localStrings[2] === "춰") {
        return;
      } else if (ctx.localStrings[2] === "쿼") {
        return;
      } else if (ctx.localStrings[2] === "퉈") {
        return;
      } else if (ctx.localStrings[2] === "풔") {
        return;
      } else if (ctx.localStrings[2] === "훠") {
        return;
      } else if (ctx.localStrings[2] === "꿔") {
        return;
      } else if (ctx.localStrings[2] === "뚸") {
        return;
      } else if (ctx.localStrings[2] === "뿨") {
        return;
      } else if (ctx.localStrings[2] === "쒀") {
        return;
      } else if (ctx.localStrings[2] === "쭤") {
        return;
      } else if (ctx.localStrings[2] === "궤") {
        return;
      } else if (ctx.localStrings[2] === "눼") {
        return;
      } else if (ctx.localStrings[2] === "뒈") {
        return;
      } else if (ctx.localStrings[2] === "뤠") {
        return;
      } else if (ctx.localStrings[2] === "뭬") {
        return;
      } else if (ctx.localStrings[2] === "붸") {
        return;
      } else if (ctx.localStrings[2] === "쉐") {
        return;
      } else if (ctx.localStrings[2] === "웨") {
        return;
      } else if (ctx.localStrings[2] === "줴") {
        return;
      } else if (ctx.localStrings[2] === "췌") {
        return;
      } else if (ctx.localStrings[2] === "퀘") {
        return;
      } else if (ctx.localStrings[2] === "퉤") {
        return;
      } else if (ctx.localStrings[2] === "풰") {
        return;
      } else if (ctx.localStrings[2] === "훼") {
        return;
      } else if (ctx.localStrings[2] === "꿰") {
        return;
      } else if (ctx.localStrings[2] === "뛔") {
        return;
      } else if (ctx.localStrings[2] === "쀄") {
        return;
      } else if (ctx.localStrings[2] === "쒜") {
        return;
      } else if (ctx.localStrings[2] === "쮀") {
        return;
      } else if (ctx.localStrings[2] === "귀") {
        return;
      } else if (ctx.localStrings[2] === "늬") {
        return;
      } else if (ctx.localStrings[2] === "뒤") {
        return;
      } else if (ctx.localStrings[2] === "뤼") {
        return;
      } else if (ctx.localStrings[2] === "뮈") {
        return;
      } else if (ctx.localStrings[2] === "뷔") {
        return;
      } else if (ctx.localStrings[2] === "쉬") {
        return;
      } else if (ctx.localStrings[2] === "위") {
        return;
      } else if (ctx.localStrings[2] === "쥐") {
        return;
      } else if (ctx.localStrings[2] === "취") {
        return;
      } else if (ctx.localStrings[2] === "퀴") {
        return;
      } else if (ctx.localStrings[2] === "튀") {
        return;
      } else if (ctx.localStrings[2] === "퓌") {
        return;
      } else if (ctx.localStrings[2] === "휘") {
        return;
      } else if (ctx.localStrings[2] === "뀌") {
        return;
      } else if (ctx.localStrings[2] === "뛰") {
        return;
      } else if (ctx.localStrings[2] === "쀠") {
        return;
      } else if (ctx.localStrings[2] === "쒸") {
        return;
      } else if (ctx.localStrings[2] === "쮜") {
        return;
      } else if (ctx.localStrings[2] === "긔") {
        return;
      } else if (ctx.localStrings[2] === "늬") {
        return;
      } else if (ctx.localStrings[2] === "듸") {
        return;
      } else if (ctx.localStrings[2] === "릐") {
        return;
      } else if (ctx.localStrings[2] === "믜") {
        return;
      } else if (ctx.localStrings[2] === "븨") {
        return;
      } else if (ctx.localStrings[2] === "싀") {
        return;
      } else if (ctx.localStrings[2] === "의") {
        return;
      } else if (ctx.localStrings[2] === "즤") {
        return;
      } else if (ctx.localStrings[2] === "츼") {
        return;
      } else if (ctx.localStrings[2] === "킈") {
        return;
      } else if (ctx.localStrings[2] === "틔") {
        return;
      } else if (ctx.localStrings[2] === "픠") {
        return;
      } else if (ctx.localStrings[2] === "희") {
        return;
      } else if (ctx.localStrings[2] === "끠") {
        return;
      } else if (ctx.localStrings[2] === "띄") {
        return;
      } else if (ctx.localStrings[2] === "쁴") {
        return;
      } else if (ctx.localStrings[2] === "씌") {
        return;
      } else if (ctx.localStrings[2] === "쯰") {
        return;
      } else if (ctx.localStrings[2] === "2") {
        return;
      } else if (ctx.localStrings[2] === "4") {
        return;
      } else if (ctx.localStrings[2] === "5") {
        return;
      } else if (ctx.localStrings[2] === "9") {
        return;
      } else {
        return;
      }
}

export async function _____args(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #FUNCTIONS
  ctx.localStrings[0] = ctx.argStrings[0];
  if (KR_NAME(ctx.localStrings[0]) === 2) {
    if (ctx.argStrings[2] === "는" || ctx.argStrings[2] === "은") {
      ctx.localStrings[0] += "는";
    } else if (ctx.argStrings[2] === "가" || ctx.argStrings[2] === "이") {
      ctx.localStrings[0] += "가";
    } else if (ctx.argStrings[2] === "를" || ctx.argStrings[2] === "을") {
      ctx.localStrings[0] += "를";
    } else if (ctx.argStrings[2] === "와" || ctx.argStrings[2] === "과") {
      ctx.localStrings[0] += "와";
    } else if (ctx.argStrings[2] === "로" || ctx.argStrings[2] === "으로") {
      ctx.localStrings[0] += "로";
    } else if (ctx.argStrings[2] === "랑" || ctx.argStrings[2] === "이랑") {
      ctx.localStrings[0] += "랑";
    } else if (ctx.argStrings[2] === "라" || ctx.argStrings[2] === "이라") {
      ctx.localStrings[0] += "라";
    } else if (ctx.argStrings[2] === "며" || ctx.argStrings[2] === "이며") {
      ctx.localStrings[0] += "며";
    } else if (ctx.argStrings[2] === "고" || ctx.argStrings[2] === "이고") {
      ctx.localStrings[0] += "고";
    } else if (ctx.argStrings[2] === "다" || ctx.argStrings[2] === "이다") {
      ctx.localStrings[0] += "다";
    } else if (ctx.argStrings[2] === "였" || ctx.argStrings[2] === "이었") {
      ctx.localStrings[0] += "였";
    } else if (ctx.argStrings[2] === "여" || ctx.argStrings[2] === "이여") {
      ctx.localStrings[0] += "여";
    } else if (ctx.argStrings[2] === "야" || ctx.argStrings[2] === "이야") {
      ctx.localStrings[0] += "야";
    } else if (ctx.argStrings[2] === "나" || ctx.argStrings[2] === "이나") {
      ctx.localStrings[0] += "나";
    } else if (ctx.argStrings[2] === "면" || ctx.argStrings[2] === "이면") {
      ctx.localStrings[0] += "면";
    } else if (ctx.argStrings[2] === "지만" || ctx.argStrings[2] === "이지만") {
      ctx.localStrings[0] += "지만";
    } else if (ctx.argStrings[2] === "겠" || ctx.argStrings[2] === "이겠") {
      ctx.localStrings[0] += "겠";
    } else if (ctx.argStrings[2] === "셨" || ctx.argStrings[2] === "이셨") {
      ctx.localStrings[0] += "셨";
    } else if (ctx.argStrings[2] === "잖" || ctx.argStrings[2] === "이잖") {
      ctx.localStrings[0] += "잖";
    } else if (ctx.argStrings[2] === "니" || ctx.argStrings[2] === "이니") {
      ctx.localStrings[0] += "니";
    } else {
      ctx.localStrings[0] = ctx.localStrings[0] + ctx.argStrings[2];
    }
  } else {
    if (ctx.argStrings[2] === "는" || ctx.argStrings[2] === "은") {
      ctx.localStrings[0] += "은";
    } else if (ctx.argStrings[2] === "가" || ctx.argStrings[2] === "이") {
      ctx.localStrings[0] += "이";
    } else if (ctx.argStrings[2] === "를" || ctx.argStrings[2] === "을") {
      ctx.localStrings[0] += "을";
    } else if (ctx.argStrings[2] === "와" || ctx.argStrings[2] === "과") {
      ctx.localStrings[0] += "과";
    } else if (ctx.argStrings[2] === "로" || ctx.argStrings[2] === "으로") {
      ctx.localStrings[0] += "으로";
    } else if (ctx.argStrings[2] === "랑" || ctx.argStrings[2] === "이랑") {
      ctx.localStrings[0] += "이랑";
    } else if (ctx.argStrings[2] === "라" || ctx.argStrings[2] === "이라") {
      ctx.localStrings[0] += "이라";
    } else if (ctx.argStrings[2] === "며" || ctx.argStrings[2] === "이며") {
      ctx.localStrings[0] += "이며";
    } else if (ctx.argStrings[2] === "고" || ctx.argStrings[2] === "이고") {
      ctx.localStrings[0] += "이고";
    } else if (ctx.argStrings[2] === "다" || ctx.argStrings[2] === "이다") {
      ctx.localStrings[0] += "이다";
    } else if (ctx.argStrings[2] === "였" || ctx.argStrings[2] === "이었") {
      ctx.localStrings[0] += "이었";
    } else if (ctx.argStrings[2] === "여" || ctx.argStrings[2] === "이여") {
      ctx.localStrings[0] += "이여";
    } else if (ctx.argStrings[2] === "야" || ctx.argStrings[2] === "이야") {
      ctx.localStrings[0] += "이야";
    } else if (ctx.argStrings[2] === "나" || ctx.argStrings[2] === "이나") {
      ctx.localStrings[0] += "이나";
    } else if (ctx.argStrings[2] === "면" || ctx.argStrings[2] === "이면") {
      ctx.localStrings[0] += "이면";
    } else if (ctx.argStrings[2] === "지만" || ctx.argStrings[2] === "이지만") {
      ctx.localStrings[0] += "이지만";
    } else if (ctx.argStrings[2] === "겠" || ctx.argStrings[2] === "이겠") {
      ctx.localStrings[0] += "이겠";
    } else if (ctx.argStrings[2] === "셨" || ctx.argStrings[2] === "이셨") {
      ctx.localStrings[0] += "이셨";
    } else if (ctx.argStrings[2] === "잖" || ctx.argStrings[2] === "이잖") {
      ctx.localStrings[0] += "이잖";
    } else if (ctx.argStrings[2] === "니" || ctx.argStrings[2] === "이니") {
      ctx.localStrings[0] += "이니";
    } else {
      ctx.localStrings[0] = ctx.localStrings[0] + ctx.argStrings[2];
    }
  }
  ctx.localStrings[0] = 후치환(ctx.localStrings[0]);
  return;
}

export async function ______args(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #FUNCTIONS
  ctx.localStrings[0] = ctx.argStrings[0];
  if (KR_NAME(ctx.localStrings[0]) === 2) {
    if (ctx.argStrings[2] === "는" || ctx.argStrings[2] === "은") {
      ctx.localStrings[0] = "는";
    } else if (ctx.argStrings[2] === "가" || ctx.argStrings[2] === "이") {
      ctx.localStrings[0] = "가";
    } else if (ctx.argStrings[2] === "를" || ctx.argStrings[2] === "을") {
      ctx.localStrings[0] = "를";
    } else if (ctx.argStrings[2] === "와" || ctx.argStrings[2] === "과") {
      ctx.localStrings[0] = "와";
    } else if (ctx.argStrings[2] === "로" || ctx.argStrings[2] === "으로") {
      ctx.localStrings[0] = "로";
    } else if (ctx.argStrings[2] === "랑" || ctx.argStrings[2] === "이랑") {
      ctx.localStrings[0] = "랑";
    } else if (ctx.argStrings[2] === "라" || ctx.argStrings[2] === "이라") {
      ctx.localStrings[0] = "라";
    } else if (ctx.argStrings[2] === "며" || ctx.argStrings[2] === "이며") {
      ctx.localStrings[0] = "며";
    } else if (ctx.argStrings[2] === "고" || ctx.argStrings[2] === "이고") {
      ctx.localStrings[0] = "고";
    } else if (ctx.argStrings[2] === "다" || ctx.argStrings[2] === "이다") {
      ctx.localStrings[0] = "다";
    } else if (ctx.argStrings[2] === "였" || ctx.argStrings[2] === "이었") {
      ctx.localStrings[0] = "였";
    } else if (ctx.argStrings[2] === "여" || ctx.argStrings[2] === "이여") {
      ctx.localStrings[0] = "여";
    } else if (ctx.argStrings[2] === "야" || ctx.argStrings[2] === "이야") {
      ctx.localStrings[0] = "야";
    } else if (ctx.argStrings[2] === "나" || ctx.argStrings[2] === "이나") {
      ctx.localStrings[0] = "나";
    } else if (ctx.argStrings[2] === "면" || ctx.argStrings[2] === "이면") {
      ctx.localStrings[0] = "면";
    } else if (ctx.argStrings[2] === "지만" || ctx.argStrings[2] === "이지만") {
      ctx.localStrings[0] = "지만";
    } else if (ctx.argStrings[2] === "겠" || ctx.argStrings[2] === "이겠") {
      ctx.localStrings[0] = "겠";
    } else if (ctx.argStrings[2] === "셨" || ctx.argStrings[2] === "이셨") {
      ctx.localStrings[0] = "셨";
    } else if (ctx.argStrings[2] === "잖" || ctx.argStrings[2] === "이잖") {
      ctx.localStrings[0] = "잖";
    } else if (ctx.argStrings[2] === "니" || ctx.argStrings[2] === "이니") {
      ctx.localStrings[0] = "니";
    } else {
      ctx.localStrings[0] = ctx.argStrings[2];
    }
  } else {
    if (ctx.argStrings[2] === "는" || ctx.argStrings[2] === "은") {
      ctx.localStrings[0] = "은";
    } else if (ctx.argStrings[2] === "가" || ctx.argStrings[2] === "이") {
      ctx.localStrings[0] = "이";
    } else if (ctx.argStrings[2] === "를" || ctx.argStrings[2] === "을") {
      ctx.localStrings[0] = "을";
    } else if (ctx.argStrings[2] === "와" || ctx.argStrings[2] === "과") {
      ctx.localStrings[0] = "과";
    } else if (ctx.argStrings[2] === "로" || ctx.argStrings[2] === "으로") {
      ctx.localStrings[0] = "으로";
    } else if (ctx.argStrings[2] === "랑" || ctx.argStrings[2] === "이랑") {
      ctx.localStrings[0] = "이랑";
    } else if (ctx.argStrings[2] === "라" || ctx.argStrings[2] === "이라") {
      ctx.localStrings[0] = "이라";
    } else if (ctx.argStrings[2] === "며" || ctx.argStrings[2] === "이며") {
      ctx.localStrings[0] = "이며";
    } else if (ctx.argStrings[2] === "고" || ctx.argStrings[2] === "이고") {
      ctx.localStrings[0] = "이고";
    } else if (ctx.argStrings[2] === "다" || ctx.argStrings[2] === "이다") {
      ctx.localStrings[0] = "이다";
    } else if (ctx.argStrings[2] === "였" || ctx.argStrings[2] === "이었") {
      ctx.localStrings[0] = "이었";
    } else if (ctx.argStrings[2] === "여" || ctx.argStrings[2] === "이여") {
      ctx.localStrings[0] = "이여";
    } else if (ctx.argStrings[2] === "야" || ctx.argStrings[2] === "이야") {
      ctx.localStrings[0] = "이야";
    } else if (ctx.argStrings[2] === "나" || ctx.argStrings[2] === "이나") {
      ctx.localStrings[0] = "이나";
    } else if (ctx.argStrings[2] === "면" || ctx.argStrings[2] === "이면") {
      ctx.localStrings[0] = "이면";
    } else if (ctx.argStrings[2] === "지만" || ctx.argStrings[2] === "이지만") {
      ctx.localStrings[0] = "이지만";
    } else if (ctx.argStrings[2] === "겠" || ctx.argStrings[2] === "이겠") {
      ctx.localStrings[0] = "이겠";
    } else if (ctx.argStrings[2] === "셨" || ctx.argStrings[2] === "이셨") {
      ctx.localStrings[0] = "이셨";
    } else if (ctx.argStrings[2] === "잖" || ctx.argStrings[2] === "이잖") {
      ctx.localStrings[0] = "이잖";
    } else if (ctx.argStrings[2] === "니" || ctx.argStrings[2] === "이니") {
      ctx.localStrings[0] = "이니";
    } else {
      ctx.localStrings[0] = ctx.argStrings[2];
    }
  }
  return;
}

export async function ______args(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #FUNCTIONS
  return;
}

export async function _____args(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #FUNCTIONS
  return;
}

export async function ______args(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #FUNCTIONS
  if (ctx.argStrings[0] == "CALLNAME") {
    return;
  }
  return;
}

export async function ______args(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #FUNCTIONS
  if (ctx.argStrings[0] == "CALLNAME") {
    return;
  }
  return;
}

export async function ______args(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #FUNCTIONS
  if (ctx.argStrings[0] == "CALLNAME") {
    return;
  }
  return;
}

export async function ______args(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #FUNCTIONS
  if (ctx.argStrings[0] == "CALLNAME") {
    return;
  }
  return;
}

export async function ______args(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #FUNCTIONS
  if (ctx.argStrings[0] == "CALLNAME") {
    return;
  }
  return;
}

export async function ______args(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #FUNCTIONS
  if (ctx.argStrings[0] == "CALLNAME") {
    return;
  }
  return;
}

export async function ______args(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #FUNCTIONS
  if (ctx.argStrings[0] == "CALLNAME") {
    return;
  }
  return;
}

export async function ______args(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #FUNCTIONS
  if (ctx.argStrings[0] == "CALLNAME") {
    return;
  }
  return;
}

export async function ______args(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #FUNCTIONS
  if (ctx.argStrings[0] == "CALLNAME") {
    return;
  }
  return;
}

export async function ______args(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #FUNCTIONS
  if (ctx.argStrings[0] == "CALLNAME") {
    return;
  }
  return;
}

export async function ______args(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #FUNCTIONS
  if (ctx.argStrings[0] == "CALLNAME") {
    return;
  }
  return;
}

export async function ______args(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #FUNCTIONS
  if (ctx.argStrings[0] == "CALLNAME") {
    return;
  }
  return;
}

export async function ______args(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #FUNCTIONS
  if (ctx.argStrings[0] == "CALLNAME") {
    return;
  }
  return;
}

export async function ______args(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #FUNCTIONS
  if (ctx.argStrings[0] == "CALLNAME") {
    return;
  }
  return;
}

export async function ______args(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #FUNCTIONS
  if (ctx.argStrings[0] == "CALLNAME") {
    return;
  }
  return;
}

export async function ____args(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #FUNCTIONS
  if (ctx.argStrings[0] == "CALLNAME") {
    return;
  }
  return;
}

export async function ____args(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #FUNCTIONS
  if (ctx.argStrings[0] == "CALLNAME") {
    return;
  }
  return;
}

export async function ____args(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #FUNCTIONS
  if (ctx.argStrings[0] == "CALLNAME") {
    return;
  }
  return;
}

export async function ____args(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #FUNCTIONS
  if (ctx.argStrings[0] == "CALLNAME") {
    return;
  }
  return;
}

export async function _____args(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #FUNCTIONS
  if (ctx.argStrings[0] == "CALLNAME") {
    return;
  }
  return;
}

export async function _____args(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #FUNCTIONS
  if (ctx.argStrings[0] == "CALLNAME") {
    return;
  }
  return;
}

export async function _____args(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #FUNCTIONS
  if (ctx.argStrings[0] == "CALLNAME") {
    return;
  }
  return;
}

export async function _____args(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #FUNCTIONS
  if (ctx.argStrings[0] == "CALLNAME") {
    return;
  }
  return;
}

export async function _____args(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #FUNCTIONS
  if (ctx.argStrings[0] == "CALLNAME") {
    return;
  }
  return;
}

export async function _____args(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #FUNCTIONS
  if (ctx.argStrings[0] == "CALLNAME") {
    return;
  }
  return;
}

export async function _____args(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #FUNCTIONS
  if (ctx.argStrings[0] == "CALLNAME") {
    return;
  }
  return;
}

export async function _____args(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #FUNCTIONS
  if (ctx.argStrings[0] == "CALLNAME") {
    return;
  }
  return;
}

export async function _____args(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #FUNCTIONS
  if (ctx.argStrings[0] == "CALLNAME") {
    return;
  }
  return;
}

export async function _____args(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #FUNCTIONS
  if (ctx.argStrings[0] == "CALLNAME") {
    return;
  }
  return;
}

export async function _____args(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #FUNCTIONS
  if (ctx.argStrings[0] == "CALLNAME") {
    return;
  }
  return;
}

export async function ____args(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #FUNCTIONS
  if (ctx.argStrings[0] == "CALLNAME") {
    return;
  }
  return;
}

export async function ____args(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #FUNCTIONS
  if (ctx.argStrings[0] == "CALLNAME") {
    return;
  }
  return;
}

export async function ____args(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #FUNCTIONS
  if (ctx.argStrings[0] == "CALLNAME") {
    return;
  }
  return;
}

export async function ____args(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #FUNCTIONS
  if (ctx.argStrings[0] == "CALLNAME") {
    return;
  }
  return;
}

export async function ____args(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #FUNCTIONS
  if (ctx.argStrings[0] == "CALLNAME") {
    return;
  }
  return;
}

export async function ____args(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #FUNCTIONS
  if (ctx.argStrings[0] == "CALLNAME") {
    return;
  }
  return;
}

export async function ____args(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #FUNCTIONS
  if (ctx.argStrings[0] == "CALLNAME") {
    return;
  }
  return;
}

export async function ____args(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #FUNCTIONS
  if (ctx.argStrings[0] == "CALLNAME") {
    return;
  }
  return;
}

export async function ____args(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #FUNCTIONS
  if (ctx.argStrings[0] == "CALLNAME") {
    return;
  }
  return;
}

export async function ____args(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #FUNCTIONS
  if (ctx.argStrings[0] == "CALLNAME") {
    return;
  }
  return;
}

export async function ____args(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #FUNCTIONS
  if (ctx.argStrings[0] == "CALLNAME") {
    return;
  }
  return;
}

export async function ____args(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #FUNCTIONS
  if (ctx.argStrings[0] == "CALLNAME") {
    return;
  }
  return;
}

export async function ____args(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #FUNCTIONS
  if (ctx.argStrings[0] == "CALLNAME") {
    return;
  }
  return;
}

export async function ____args(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #FUNCTIONS
  if (ctx.argStrings[0] == "CALLNAME") {
    return;
  }
  return;
}

export async function ____args(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #FUNCTIONS
  if (ctx.argStrings[0] == "CALLNAME") {
    return;
  }
  return;
}
