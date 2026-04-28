/**
 * VIDEO_TITLE.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function video_title_debut(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  await special_title_calc(ctx, character);
  if (character.tflags[160] === 1) {
    await special_title_decide_debut(ctx, character);
  } else {
    if (character.no != 42 && character.no != 46 && character.no != 80 && character.no != 150 && character.no != 1 && character.no != 91) {
      if (ctx.talents[76] === 1 && (ctx.talents[422] === 0 || ctx.talents[432] === 0)) {
        if (ctx.rand(2) === 0) {
          ctx.showMessage(`음란`);
          ctx.cstr[11] = "음란";
        } else {
          ctx.showMessage(`변태`);
          ctx.cstr[11] = "변태";
        }
      } else if (ctx.talents[76] === 1 && ctx.talents[422] === 1 && ctx.talents[432] === 1) {
        ctx.showMessage(`흑갸루걸레`);
        ctx.cstr[11] = "흑갸루걸레";
      } else if (ctx.talents[76] === 0 && ctx.talents[422] === 1 && ctx.talents[432] === 1) {
        ctx.showMessage(`흑갸루`);
        ctx.cstr[11] = "흑갸루";
      }
    }
    if ((character.no === 1 || character.no === 91) && ctx.talents[76] === 0 && ctx.talents[432] === 0) {
      ctx.showMessage(`순정소녀・`);
      character.cstr[character][12] = "순정소녀・";
    } else if ((character.no === 1 || character.no === 91) && ctx.talents[76] === 1 && ctx.talents[432] === 0) {
      ctx.showMessage(`청초 로리비치・`);
      character.cstr[character][12] = "청초 로리비치・";
    } else if ((character.no === 1 || character.no === 91) && ctx.talents[76] === 0 && ctx.talents[422] === 1 && ctx.talents[432] === 1) {
      ctx.showMessage(`에로귀염계 흑갸루・`);
      character.cstr[character][12] = "에로귀염계 흑갸루・";
    } else if ((character.no === 1 || character.no === 91) && ctx.talents[76] === 1 && ctx.talents[422] === 1 && ctx.talents[432] === 1) {
      ctx.showMessage(`흑갸루 로리비치・`);
      character.cstr[character][12] = "흑갸루 로리비치・";
    } else if ((character.no === 1 || character.no === 91) && ctx.talents[76] === 0 && ctx.talents[422] === 0 && ctx.talents[432] === 1) {
      ctx.showMessage(`에로귀염계 갸루・`);
      character.cstr[character][12] = "에로귀염계 갸루・";
    } else if ((character.no === 1 || character.no === 91) && ctx.talents[76] === 1 && ctx.talents[422] === 0 && ctx.talents[432] === 1) {
      ctx.showMessage(`갸루계 로리비치・`);
      character.cstr[character][12] = "갸루계 로리비치・";
    } else if (character.no === 2) {
      ctx.showMessage(`스포츠소녀・`);
      character.cstr[character][12] = "스포츠소녀・";
    } else if (character.no === 3) {
      ctx.showMessage(`요즘 여자아이・`);
      character.cstr[character][12] = "요즘 여자아이・";
    } else if (character.no === 4) {
      ctx.showMessage(`아가씨・`);
      character.cstr[character][12] = "아가씨・";
    } else if (character.no === 5) {
      ctx.showMessage(`인기 코스프레이어・`);
      character.cstr[character][12] = "인기 코스프레이어・";
    } else if (character.no === 6) {
      ctx.showMessage(`유부녀・`);
      character.cstr[character][12] = "유부녀・";
    } else if (character.no === 7) {
      ctx.showMessage(`백합자매・`);
      character.cstr[character][12] = "백합자매・";
    } else if (character.no === 8) {
      ctx.showMessage(`백합자매・`);
      character.cstr[character][12] = "백합자매・";
    } else if (character.no === 9) {
      ctx.showMessage(`공주님・`);
      character.cstr[character][12] = "공주님・";
    } else if (character.no === 10) {
      ctx.showMessage(`쿼터・`);
      character.cstr[character][12] = "쿼터・";
    } else if (character.no === 11) {
      ctx.showMessage(`세레브 니트・`);
      character.cstr[character][12] = "세레브 니트・";
    } else if (character.no === 12) {
      ctx.showMessage(`미인 간호사・`);
      character.cstr[character][12] = "미인 간호사・";
    } else if (character.no === 13) {
      ctx.showMessage(`낭자애・`);
      character.cstr[character][12] = "낭자애・";
    } else if (character.no === 14) {
      ctx.showMessage(`사무라이 걸・`);
      character.cstr[character][12] = "사무라이 걸・";
    } else if (character.no === 15) {
      ctx.showMessage(`미소녀 무녀・`);
      character.cstr[character][12] = "미소녀 무녀・";
    } else if (character.no === 16) {
      ctx.showMessage(`츤데레소녀・`);
      character.cstr[character][12] = "츤데레소녀・";
    } else if (character.no === 17) {
      ctx.showMessage(`메이드로이드・`);
      character.cstr[character][12] = "메이드로이드・";
    } else if (character.no === 18) {
      ctx.showMessage(`귀국자녀・`);
      character.cstr[character][12] = "귀국자녀・";
    } else if (character.no === 19) {
      ctx.showMessage(`더치와이프・`);
      character.cstr[character][12] = "더치와이프・";
    } else if (character.no === 20) {
      ctx.showMessage(`카리스마 점원・`);
      character.cstr[character][12] = "카리스마 점원・";
    } else if (character.no === 21) {
      ctx.showMessage(`여교사・`);
      character.cstr[character][12] = "여교사・";
    } else if (character.no === 22) {
      ctx.showMessage(`소악마 걸・`);
      character.cstr[character][12] = "소악마 걸・";
    } else if (character.no === 23) {
      ctx.showMessage(`유행소녀・`);
      character.cstr[character][12] = "유행소녀・";
    } else if (character.no === 24) {
      ctx.showMessage(`인기 AV배우・`);
      character.cstr[character][12] = "인기 AV배우・";
    } else if (character.no === 25) {
      ctx.showMessage(`수녀・`);
      character.cstr[character][12] = "수녀・";
    } else if (character.no === 26) {
      ctx.showMessage(`합법로리・`);
      character.cstr[character][12] = "합법로리・";
    } else if (character.no === 27) {
      ctx.showMessage(`아가씨・`);
      character.cstr[character][12] = "아가씨・";
    } else if (character.no === 28) {
      ctx.showMessage(`모에계 혼혈소녀・`);
      character.cstr[character][12] = "모에계 혼혈소녀・";
    } else if (character.no === 29) {
      ctx.showMessage(`성직자・`);
      character.cstr[character][12] = "성직자・";
    } else if (character.no === 30) {
      ctx.showMessage(`로리큐트・`);
      character.cstr[character][12] = "로리큐트・";
    } else if (character.no === 31) {
      ctx.showMessage(`음침계 로리소녀・`);
      character.cstr[character][12] = "음침계 로리소녀・";
    } else if (character.no === 32) {
      ctx.showMessage(`너무 아름다운 여의사・`);
      character.cstr[character][12] = "너무 아름다운 여의사・";
    } else if (character.no === 33) {
      ctx.showMessage(`로리 간호사・`);
      character.cstr[character][12] = "로리 간호사・";
    } else if (character.no === 34) {
      ctx.showMessage(`비밀 코스프레이어・`);
      character.cstr[character][12] = "비밀 코스프레이어・";
    } else if (character.no === 35) {
      ctx.showMessage(`쿨한 반장계 미소녀・`);
      character.cstr[character][12] = "쿨한 반장계 미소녀・";
    } else if (character.no === 36) {
      ctx.showMessage(`치유계 소꿉친구타입・`);
      character.cstr[character][12] = "치유계 소꿉친구타입・";
    } else if (character.no === 37) {
      ctx.showMessage(`인기 걸밴드의 베이시스트를 닮은`);
      character.cstr[character][12] = "인기 걸밴드의 베이시스트를 닮은";
    } else if (character.no === 38) {
      ctx.showMessage(`타천사계 미소녀・`);
      character.cstr[character][12] = "타천사계 미소녀・";
    } else if (character.no === 39) {
      ctx.showMessage(`납작가슴 독설소녀・`);
      character.cstr[character][12] = "납작맨들 독설소녀・";
    } else if (character.no === 40) {
      ctx.showMessage(`순종적인 폭유우등생・`);
      character.cstr[character][12] = "순종적인 폭유우등생・";
    } else if (character.no === 41) {
      ctx.showMessage(`폭신 치유계・`);
      character.cstr[character][12] = "폭신 치유계・";
    } else if (character.no === 42 && ctx.talents[76] === 0 && (ctx.talents[422] === 0 || ctx.talents[432] === 0)) {
      ctx.showMessage(`아이돌 휴업중인 ○세를 닮은`);
      character.cstr[character][12] = "아이돌 휴업중인 ○세를 닮은";
    } else if (character.no === 42 && ctx.talents[76] === 1 && (ctx.talents[422] === 0 || ctx.talents[432] === 0)) {
      ctx.showMessage(`아이돌 휴업중인 ○세를 닮은 음란소녀・`);
      character.cstr[character][12] = "아이돌 휴업중인 ○세를 닮은 음란소녀・";
    } else if (character.no === 42 && ctx.talents[76] === 0 && ctx.talents[422] === 1 && ctx.talents[432] === 1) {
      ctx.showMessage(`아이돌 휴업중인 ○세를 닮은 흑갸루・`);
      character.cstr[character][12] = "아이돌 휴업중인 ○세를 닮은 흑갸루・";
    } else if (character.no === 42 && ctx.talents[76] === 1 && ctx.talents[422] === 1 && ctx.talents[432] === 1) {
      ctx.showMessage(`아이돌 휴업중인 ○세를 닮은 흑갸루걸레・`);
      character.cstr[character][12] = "아이돌 휴업중인 ○세를 닮은 흑갸루걸레・";
    } else if (character.no === 43) {
      ctx.showMessage(`쌀쌀맞은 반장계 아가씨・`);
      character.cstr[character][12] = "쌀쌀맞은 반장계 아가씨・";
    } else if (character.no === 44) {
      ctx.showMessage(`묵묵한 모델계 장신미녀・`);
      character.cstr[character][12] = "묵묵한 모델계 장신미녀・";
    } else if (character.no === 45) {
      ctx.showMessage(`통통한 미소녀・`);
      character.cstr[character][12] = "통통한 미소녀・";
    } else if (character.no === 46 && ctx.talents[76] === 0 && (ctx.talents[422] === 0 || ctx.talents[432] === 0)) {
      ctx.showMessage(`추억의 아이돌・타카○나시를 닮은 미녀・`);
      character.cstr[character][12] = "추억의 아이돌・타카○나시를 닮은 미녀・";
    } else if (character.no === 46 && ctx.talents[76] === 1 && (ctx.talents[422] === 0 || ctx.talents[432] === 0)) {
      ctx.showMessage(`추억의 아이돌・타카○나시를 닮은 음란미녀・`);
      character.cstr[character][12] = "추억의 아이돌・타카○나시를 닮은 음란미녀・";
    } else if (character.no === 46 && ctx.talents[76] === 0 && ctx.talents[422] === 1 && ctx.talents[432] === 1) {
      ctx.showMessage(`추억의 아이돌・타카○나시를 닮은 흑갸루미녀・`);
      character.cstr[character][12] = "추억의 아이돌・타카○나시를 닮은 흑갸루미녀・";
    } else if (character.no === 46 && ctx.talents[76] === 1 && ctx.talents[422] === 1 && ctx.talents[432] === 1) {
      ctx.showMessage(`추억의 아이돌・타카○나시를 닮은 흑갸루걸레・`);
      character.cstr[character][12] = "추억의 아이돌・타카○나시를 닮은 흑갸루걸레・";
    } else if (character.no === 47) {
      ctx.showMessage(`청초 아가씨・`);
      character.cstr[character][12] = "청초 아가씨・";
    } else if (character.no === 70) {
      ctx.showMessage(`원교소녀・`);
      character.cstr[character][12] = "원교소녀・";
    } else if (character.no === 72) {
      ctx.showMessage(`찐레즈 여고생・`);
      character.cstr[character][12] = "찐레즈 여고생・";
    } else if (character.no === 71) {
      ctx.showMessage(`폭유언니・`);
      character.cstr[character][12] = "폭유언니・";
    } else if (character.no === 73) {
      ctx.showMessage(`수수한 아이・`);
      character.cstr[character][12] = "수수한 아이・";
    } else if (character.no === 74) {
      ctx.showMessage(`박복로리・`);
      character.cstr[character][12] = "박복로리・";
    } else if (character.no === 75) {
      ctx.showMessage(`아가씨・`);
      character.cstr[character][12] = "아가씨・";
    } else if (character.no === 76) {
      ctx.showMessage(`우등생・`);
      character.cstr[character][12] = "우등생・";
    } else if (character.no === 77) {
      ctx.showMessage(`폭유교사・`);
      character.cstr[character][12] = "폭유교사・";
    } else if (character.no === 78) {
      ctx.showMessage(`박복교사・`);
      character.cstr[character][12] = "박복교사・";
    } else if (character.no === 80 && ctx.talents[76] === 0 && (ctx.talents[422] === 0 || ctx.talents[432] === 0)) {
      ctx.showMessage(`C○G의 미○로를 닮은`);
      character.cstr[character][12] = "C○G의 미○로를 닮은";
    } else if (character.no === 80 && ctx.talents[76] === 1 && (ctx.talents[422] === 0 || ctx.talents[432] === 0)) {
      ctx.showMessage(`C○G의 미○로를 닮은 음란소녀・`);
      character.cstr[character][12] = "C○G의 미○로를 닮은 음란소녀・";
    } else if (character.no === 80 && ctx.talents[76] === 0 && ctx.talents[422] === 1 && ctx.talents[432] === 1) {
      ctx.showMessage(`C○G의 미○로를 닮은 흑갸루・`);
      character.cstr[character][12] = "C○G의 미○로를 닮은 흑갸루・";
    } else if (character.no === 80 && ctx.talents[76] === 1 && ctx.talents[422] === 1 && ctx.talents[432] === 1) {
      ctx.showMessage(`C○G의 미○로를 닮은 흑갸루걸레・`);
      character.cstr[character][12] = "C○G의 미○로를 닮은 흑갸루걸레・";
    } else if (character.no === 81) {
      ctx.showMessage(`아가씨・`);
      character.cstr[character][12] = "아가씨・";
    } else if (character.no === 82) {
      ctx.showMessage(`리틀 데빌・`);
      character.cstr[character][12] = "리틀 데빌・";
    } else if (character.no === 83) {
      ctx.showMessage(`전 주니어아이돌・`);
      character.cstr[character][12] = "전 주니어아이돌・";
    } else if (character.no === 84) {
      ctx.showMessage(`숙녀・`);
      character.cstr[character][12] = "숙녀・";
    } else if (character.no === 85) {
      ctx.showMessage(`여신・`);
      character.cstr[character][12] = "여신・";
    } else if (character.no === 86) {
      ctx.showMessage(`천재소녀・`);
      character.cstr[character][12] = "천재소녀・";
    } else if (character.no === 87) {
      ctx.showMessage(`남장미소녀・`);
      character.cstr[character][12] = "남장미소녀・";
    } else if (character.no === 93) {
      ctx.showMessage(`동물귀 중화소녀・`);
      character.cstr[character][12] = "동물귀 중화소녀・";
    } else if (character.no === 94) {
      ctx.showMessage(`안경・`);
      character.cstr[character][12] = "안경・";
    } else if (character.no === 95) {
      ctx.showMessage(`로리BBA(!?)・`);
      character.cstr[character][12] = "로리BBA(!?)・";
    } else if (character.no === 96) {
      ctx.showMessage(`쿨 뷰티・`);
      character.cstr[character][12] = "쿨 뷰티・";
    } else if (character.no === 97) {
      ctx.showMessage(`변태숙녀・`);
      character.cstr[character][12] = "변태숙녀・";
    } else if (character.no === 98) {
      ctx.showMessage(`누나계 인기 독자모델・`);
      character.cstr[character][12] = "누나계 인기 독자모델・";
    } else if (character.no === 99) {
      ctx.showMessage(`여동생계 병약 츤데레・`);
      character.cstr[character][12] = "여동생계 병약 츤데레・";
    } else if (character.no === 100) {
      ctx.showMessage(`강아지계 활발소녀・`);
      character.cstr[character][12] = "강아지계 활발소녀・";
    } else if (character.no === 101) {
      ctx.showMessage(`쿨한 검도소녀・`);
      character.cstr[character][12] = "쿨한 검도소녀・";
    } else if (character.no === 102) {
      ctx.showMessage(`소악마계 혼혈소녀・`);
      character.cstr[character][12] = "소악마계 혼혈소녀・";
    } else if (character.no === 103) {
      ctx.showMessage(`온화계 거유 아가씨・`);
      character.cstr[character][12] = "온화계 거유 아가씨・";
    } else if (character.no === 106) {
      ctx.showMessage(`미니멈 큐트계 로리 의붓여동생・`);
      character.cstr[character][12] = "미니멈 큐트계 로리 의붓여동생・";
    } else if (character.no === 107) {
      ctx.showMessage(`열혈 근성 스포츠소녀・`);
      character.cstr[character][12] = "열혈 근성 스포츠소녀・";
    } else if (character.no === 108) {
      ctx.showMessage(`공주님계 거유미소녀・`);
      character.cstr[character][12] = "공주님계 거유미소녀・";
    } else if (character.no === 150 && ctx.talents[76] === 0 && (ctx.talents[422] === 0 || ctx.talents[432] === 0)) {
      ctx.showMessage(`C○G의 유○를 닮은`);
      character.cstr[character][12] = "C○G의 유○를 닮은";
    } else if (character.no === 150 && ctx.talents[76] === 1 && (ctx.talents[422] === 0 || ctx.talents[432] === 0)) {
      ctx.showMessage(`C○G의 유○를 닮은 음란소녀・`);
      character.cstr[character][12] = "C○G의 유○를 닮은 음란소녀・";
    } else if (character.no === 150 && ctx.talents[76] === 0 && ctx.talents[422] === 1 && ctx.talents[432] === 1) {
      ctx.showMessage(`C○G의 유○를 닮은 흑갸루・`);
      character.cstr[character][12] = "C○G의 유○를 닮은 흑갸루・";
    } else if (character.no === 150 && ctx.talents[76] === 1 && ctx.talents[422] === 1 && ctx.talents[432] === 1) {
      ctx.showMessage(`C○G의 유○를 닮은 흑갸루걸레・`);
      character.cstr[character][12] = "C○G의 유○를 닮은 흑갸루걸레・";
    } else if (character.no === 151) {
      ctx.showMessage(`풍속녀・`);
      character.cstr[character][12] = "풍속녀・";
    } else if (character.no === 152) {
      ctx.showMessage(`미인 아가씨 여고생・`);
      character.cstr[character][12] = "미인 아가씨 여고생・";
    } else if (character.no === 200) {
      ctx.showMessage(`로리계 벨리 댄서・`);
      character.cstr[character][12] = "로리계 벨리 댄서";
    } else if (character.no === 201) {
      ctx.showMessage(`공주 용사(자칭)・`);
      character.cstr[character][12] = "공주 용사(자칭)・";
    } else if (character.no === 202) {
      ctx.showMessage(`걸밴드 어린아내・`);
      character.cstr[character][12] = "걸밴드 어린아내・";
    } else if (character.no === 203) {
      ctx.showMessage(`여배우 지망생・`);
      character.cstr[character][12] = "여배우 지망생・";
    } else if (character.no === 204) {
      ctx.showMessage(`S급 미소녀・`);
      character.cstr[character][12] = "S급 미소녀・";
    } else if (character.no === 205) {
      ctx.showMessage(`닌자 걸・`);
      character.cstr[character][12] = "닌자 걸・";
    } else if (character.no === 206) {
      ctx.showMessage(`그 아가씨를 닮은 낭자애・`);
      character.cstr[character][12] = "그 아가씨를 닮은 낭자애・";
    } else if (character.no === 207) {
      ctx.showMessage(`폭유 불량배・`);
      character.cstr[character][12] = "폭유 불량배・";
    } else if (character.no === 208) {
      ctx.showMessage(`커리어 우먼계 미망인・`);
      character.cstr[character][12] = "커리어 우먼계 미망인・";
    } else if (character.no === 209) {
      ctx.showMessage(`여왕님계 마조녀・`);
      character.cstr[character][12] = "여왕님계 마조녀・";
    } else if (character.no === 210) {
      ctx.showMessage(`덜렁이 아가씨・`);
      character.cstr[character][12] = "덜렁이 아가씨・";
    } else if (character.no === 211) {
      ctx.showMessage(`관심받고 싶어하는 로리・`);
      character.cstr[character][12] = "관심받고 싶어하는 로리・";
    } else if (character.no === 212) {
      ctx.showMessage(`더러움계 폭유무녀・`);
      character.cstr[character][12] = "더러움계 폭유무녀・";
    } else if (character.no === 213) {
      ctx.showMessage(`청춘 소박계 천연미소녀・`);
      character.cstr[character][12] = "청춘 소박계 천연미소녀・";
    } else if (character.no === 214) {
      ctx.showMessage(`천진난만한 로리계 미소녀・`);
      character.cstr[character][12] = "천진난만한 로리계 미소녀・";
    } else if (character.no === 215) {
      ctx.showMessage(`자택경비계 신세대 아이돌・`);
      character.cstr[character][12] = "자택경비계 신세대 아이돌・";
    }
    if (ctx.talents[153] === 1 && ctx.flags[22] & 4) {
      if (ctx.rand(2) === 0) {
        ctx.cstr[14] = "만삭 코스프레";
      } else {
        ctx.cstr[14] = "코스프레 임산부";
      }
    } else if (ctx.talents[153] === 1) {
      if (ctx.rand(2) === 0) {
        ctx.cstr[14] = "만삭";
      } else {
        ctx.cstr[14] = "임산부";
      }
    } else if (ctx.flags[22] & 4) {
      ctx.cstr[14] = "코스프레";
    }
    if (촬영부위V >= 촬영부위C && 촬영부위V >= 촬영부위A && 촬영내용성교) {
      ctx.cstr[13] = 조사처리(NICKctx.getName(character),"과");
      ctx.cstr[15] = "생SEX";
    } else if (촬영부위A && 촬영내용성교) {
      ctx.cstr[13] = 조사처리(NICKctx.getName(character),"과");
      ctx.cstr[15] = "애널섹스";
    } else if (촬영내용피스트) {
      ctx.cstr[13] = 조사처리(NICKctx.getName(character),"과");
      ctx.cstr[15] = "피스트퍽";
    } else if (촬영특수난교) {
      ctx.cstr[13] = 조사처리(NICKctx.getName(character),"과");
      ctx.cstr[15] = "대난교";
    } else if (촬영특수착유) {
      ctx.cstr[13] = "%NICKNAME:TARGET%의";
      ctx.cstr[15] = "착유파티";
    } else if (촬영특수거품춤) {
      ctx.cstr[13] = "%NICKNAME:TARGET%의";
      ctx.cstr[15] = "봉사 소프플레이";
    } else if (촬영내용펠라 && (촬영내용펠라 >= 촬영경향봉사/2)) {
      ctx.cstr[13] = "%NICKNAME:TARGET%의";
      ctx.cstr[15] = "봄 펠라축제";
    } else if (촬영경향봉사) {
      ctx.cstr[13] = "%NICKNAME:TARGET%의";
      ctx.cstr[15] = "봉사 대작전";
    } else if (촬영경향SM) {
      ctx.cstr[13] = 조사처리(NICKctx.getName(character),"과");
      ctx.cstr[15] = SM;
    } else if (촬영경향자위) {
      ctx.cstr[13] = "%NICKNAME:TARGET%의";
      ctx.cstr[15] = "엄청 에로한 자위를 보여줄게";
    } else if (촬영부위C && 촬영내용성교) {
      ctx.cstr[13] = "%NICKNAME:TARGET%의";
      ctx.cstr[15] = "역강간";
    } else if (촬영특수레즈) {
      ctx.cstr[13] = "%NICKNAME:TARGET%의";
      ctx.cstr[15] = "레즈SEX";
    }
    if (character.tflags[32] & 1) {
      ctx.cstr[13] = 조사처리(NICKctx.getName(character),"이");
    }
    ctx.showMessage(`%CSTR:13%`);
    // TODO: STRLENSU CSTR:14
    if (ctx.result) {
      ctx.showMessage(`%CSTR:14%`);
    }
    ctx.showMessage(`%CSTR:15%`);
    if (character.tflags[32] & 1) {
      ctx.showMessage(`%조사처리(CSTR:15,"로")% 처녀상실`);
      ctx.cstr[16] = %조사처리(ctx.cstr[15],"로")% 처녀상실;
      if (ctx.player.no === 0 && ctx.getTalent(player, 122) === 0 && (character.no === 1 || character.no === 91)) {
        ctx.showMessage(`~언니가 어른 여자로 만들어 주셨습니다~`);
        ctx.cstr[17] = "~언니가 어른 여자로 만들어 주셨습니다~";
      } else if (ctx.getTalent(player, 122) === 0 && ctx.talents[432] === 1 && ctx.getTalent(player, 432) === 1) {
        ctx.showMessage(`~레즈섹프갸루친구・${ctx.josaHelper("조수가")} 여자로 만들어 줬습니다~`);
        ctx.cstr[17] = "~레즈섹프갸루친구・%조수가()% 여자로 만들어 줬습니다~";
      } else if (ctx.getTalent(player, 122) === 0) {
        ctx.showMessage(`~\@ PLAYER ? ${ctx.getVarName("NICK", PLAYER)}chan # 감독 \@이 어른 여자로 만들어 주셨습니다~`);
        ctx.cstr[17] = "~\@ PLAYER ? %NICKNAME:PLAYER%chan # 감독 \@이 어른 여자로 만들어 주셨습니다~";
      } else if (ctx.talents[432] === 0 && (character.no === 1 || character.no === 91)) {
        ctx.showMessage(`~오빠가 여자로 만들어 줬습니다~`);
        ctx.cstr[17] = "~오빠가 여자로 만들어 줬습니다~";
      } else if (ctx.talents[432] === 1 && (character.no === 1 || character.no === 91)) {
        ctx.showMessage(`~형님의 자지가 여자로 만들어 주셨습니다~`);
        ctx.cstr[17] = "~형님의 자지가 여자로 만들어 주셨습니다~";
      } else if (ctx.talents[432] === 0 && ctx.base[9] < ctx.masterBase[9]) {
        ctx.showMessage(`~선배가 여자로 만들어 주셨습니다~`);
        ctx.cstr[17] = "~선배가 여자로 만들어 주셨습니다~";
      } else if (ctx.talents[432] === 0 && ctx.base[9]  > ctx.masterBase[9]) {
        ctx.showMessage(`~연하에게 어른 여자가 되버렸습니다~`);
        ctx.cstr[17] = "~연하에게 어른 여자가 되버렸습니다~";
      } else if (ctx.talents[432] === 0 && ctx.base[9]  === ctx.masterBase[9]) {
        ctx.showMessage(`~친구에게 여자가 되버렸습니다~`);
        ctx.cstr[17] = "~친구에게 여자가 되버렸습니다~";
      } else if (ctx.talents[432] === 1 && ctx.base[9] < ctx.masterBase[9]) {
        ctx.showMessage(`~선배의 자지가 어른 여자로 만들어 주셨습니다~`);
        ctx.cstr[17] = "~선배의 자지가 어른 여자로 만들어 주셨습니다~";
      } else if (ctx.talents[432] === 1 && ctx.base[9]  > ctx.masterBase[9]) {
        ctx.showMessage(`~연하의 자지에게 어른 여자가 되버렸습니다~`);
        ctx.cstr[17] = "~연하의 자지에게 어른 여자가 되버렸습니다~";
      } else if (ctx.talents[432] === 1 && ctx.base[9]  === ctx.masterBase[9]) {
        ctx.showMessage(`~연하의 자지로 어른 여자가 되버렸습니다~`);
        ctx.cstr[17] = "~연하의 자지로 어른 여자가 되버렸습니다~";
      }
      character.cflags[641] = 1;
    } else if (character.tflags[132] & 1) {
      ctx.showMessage(`%조사처리(CSTR:15,"로")% 애널처녀 상실`);
      ctx.cstr[16] = %조사처리(ctx.cstr[15],"로")% 애널처녀 상실;
      if (ctx.player.no === 0 && ctx.getTalent(player, 122) === 0 && (character.no === 1 || character.no === 91)) {
        ctx.showMessage(`~언니에게 애널처녀 바쳐버렸습니다~`);
        ctx.cstr[17] = "~언니에게 애널처녀 바쳐버렸습니다~";
      } else if (ctx.getTalent(player, 122) === 0 && ctx.talents[432] === 1 && ctx.getTalent(player, 432) === 1) {
        ctx.showMessage(`~레즈섹프갸루친구・${ctx.getVarName("NICK", ASSI)}에게 애널처녀 바쳐버렸습니다~`);
        ctx.cstr[17] = `~레즈섹프갸루친구・${NICKctx.getName(ctx.assi)}에게 애널처녀 바쳐버렸습니다~`;
      } else if (ctx.getTalent(player, 122) === 0) {
        ctx.showMessage(`~\@ PLAYER ? ${ctx.getVarName("NICK", PLAYER)}chan # 감독 \@에게 애널처녀 바쳐버렸습니다~`);
        ctx.cstr[17] = "~\@ PLAYER ? %NICKNAME:PLAYER%chan # 감독 \@에게 애널처녀 바쳐버렸습니다~";
      } else if (ctx.talents[432] === 0 && (character.no === 1 || character.no === 91)) {
        ctx.showMessage(`~오빠에게 애널처녀 바쳐버렸습니다~`);
        ctx.cstr[17] = "~오빠에게 애널처녀 바쳐버렸습니다~";
      } else if (ctx.talents[432] === 1 && (character.no === 1 || character.no === 91)) {
        ctx.showMessage(`~오빠의 자지에게 애널처녀 바쳐버렸습니다~`);
        ctx.cstr[17] = "~오빠의 자지에게 애널처녀 바쳐버렸습니다~";
      } else if (ctx.talents[432] === 0 && ctx.base[9] < 17) {
        ctx.showMessage(`~선배에게 애널처녀 바쳐버렸습니다~`);
        ctx.cstr[17] = "~선배에게 애널처녀 바쳐버렸습니다~";
      } else if (ctx.talents[432] === 0 && ctx.base[9]  > 17) {
        ctx.showMessage(`~연하에게 애널처녀 바쳐버렸습니다~`);
        ctx.cstr[17] = "~연하에게 애널처녀 바쳐버렸습니다~";
      } else if (ctx.talents[432] === 0 && ctx.base[9]  === 17) {
        ctx.showMessage(`~친구에게 애널처녀 바쳐버렸습니다~`);
        ctx.cstr[17] = "~친구에게 애널처녀 바쳐버렸습니다~";
      } else if (ctx.talents[432] === 1 && ctx.base[9] < 17) {
        ctx.showMessage(`~선배의 자지에게 애널처녀 바쳐버렸습니다~`);
        ctx.cstr[17] = "~선배의 자지에게 애널처녀 바쳐버렸습니다~";
      } else if (ctx.talents[432] === 1 && ctx.base[9]  > 17) {
        ctx.showMessage(`~연하의 자지에게 애널처녀 바쳐버렸습니다~`);
        ctx.cstr[17] = "~연하의 자지에게 애널처녀 바쳐버렸습니다~";
      } else if (ctx.talents[432] === 1 && ctx.base[9]  === 17) {
        ctx.showMessage(`~섹프의 자지에게 애널처녀 바쳐버렸습니다~`);
        ctx.cstr[17] = "~섹프의 자지에게 애널처녀 바쳐버렸습니다~";
      }
      character.cflags[641] = 1;
    } else if (character.tflags[133]) {
      if (character.tflags[133] === 1) {
        ctx.showMessage(`%조사처리(CSTR:15,"로")% 동정상실`);
        ctx.cstr[16] = %조사처리(ctx.cstr[15],"로")% 동정상실;
      }
      if (ctx.getTalent(player, 122) === 0 && ctx.talents[432] === 1 && ctx.getTalent(player, 432) === 1) {
        ctx.showMessage(`~레즈섹프갸루친구・${ctx.getVarName("NICK", ASSI)}의 보지에 %CSTR:9%의 자지 들어가 버렸습니다~`);
        ctx.cstr[17] = `~레즈섹프갸루친구・${NICKctx.getName(ctx.assi)}의 보지에 ${ctx.cstr[9]}의 자지 들어가 버렸습니다~`;
      } else if (ctx.getTalent(player, 122) === 0) {
        ctx.showMessage(`~\@ PLAYER ? ${ctx.getVarName("NICK", PLAYER)}chan # 감독 \@의 보지에 %CSTR:9%의 자지 들어가 버렸습니다~`);
        ctx.cstr[17] = `~\@ PLAYER ? ${NICKctx.getName(ctx.player)}chan # 감독 \@의 보지에 ${ctx.cstr[9]}의 자지 들어가 버렸습니다~`;
      }
      character.cflags[641] = 1;
    } else {
      ctx.showMessage(``);
      // TODO: CSTR:16 =
      character.cflags[641] = 0;
      // TODO: CSTR:17 =
    }
  }
}

export async function print_video_title(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`%CSTR:10%`);
  ctx.showMessage(`%CSTR:11%`);
  ctx.showMessage(`%CSTR:12%`);
  ctx.showMessage(`%CSTR:13%`);
  ctx.showMessage(`%CSTR:14%`);
  ctx.showMessage(`%CSTR:15%`);
  ctx.showMessage(`%CSTR:16%`);
  if (character.cflags[641] === 1) {
    ctx.showMessage('');
    ctx.showMessage(` %CSTR:17%`);
  } else {
    ctx.showMessage('');
  }
}

export async function video_title_new(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  await special_title_calc(ctx, character);
  if (character.tflags[160] === 1) {
    await special_title_decide(ctx, character);
  } else {
    if (character.no != 42 && character.no != 46 && character.no != 80 && character.no != 150 && character.no != 1 && character.no != 91) {
      if (ctx.talents[76] === 1 && ctx.talents[422] === 0) {
        if (ctx.rand(2) === 0) {
          ctx.showMessage(`음란`);
          ctx.cstr[31] = "음란";
        } else {
          ctx.showMessage(`변태`);
          ctx.cstr[31] = "변태";
        }
      } else if (ctx.talents[76] === 1 && ctx.talents[422] === 1 && ctx.talents[432] === 1) {
        ctx.showMessage(`흑갸루걸레`);
        ctx.cstr[31] = "흑갸루걸레";
      } else if (ctx.talents[76] === 0 && ctx.talents[422] === 1 && ctx.talents[432] === 1) {
        ctx.showMessage(`흑갸루`);
        ctx.cstr[31] = "흑갸루";
      }
    }
    if ((character.no === 1 || character.no === 91) && ctx.talents[76] === 0 && ctx.talents[432] === 0) {
      ctx.showMessage(`순정소녀・`);
      character.cstr[character][32] = "순정소녀・";
    } else if ((character.no === 1 || character.no === 91) && ctx.talents[76] === 1 && ctx.talents[432] === 0) {
      ctx.showMessage(`청초 로리비치・`);
      character.cstr[character][32] = "청초 로리비치・";
    } else if ((character.no === 1 || character.no === 91) && ctx.talents[76] === 0 && ctx.talents[422] === 1 && ctx.talents[432] === 1) {
      ctx.showMessage(`에로귀염계 흑갸루・`);
      character.cstr[character][32] = "에로귀염계 흑갸루・";
    } else if ((character.no === 1 || character.no === 91) && ctx.talents[76] === 1 && ctx.talents[422] === 1 && ctx.talents[432] === 1) {
      ctx.showMessage(`흑갸루 로리비치・`);
      character.cstr[character][32] = "흑갸루 로리비치・";
    } else if ((character.no === 1 || character.no === 91) && ctx.talents[76] === 0 && ctx.talents[422] === 0 && ctx.talents[432] === 1) {
      ctx.showMessage(`에로귀염계 갸루・`);
      character.cstr[character][32] = "에로귀염계 갸루・";
    } else if ((character.no === 1 || character.no === 91) && ctx.talents[76] === 1 && ctx.talents[422] === 0 && ctx.talents[432] === 1) {
      ctx.showMessage(`갸루계 로리비치・`);
      character.cstr[character][32] = "갸루계 로리비치・";
    } else if (character.no === 2) {
      ctx.showMessage(`스포츠소녀・`);
      character.cstr[character][32] = "스포츠소녀・";
    } else if (character.no === 3) {
      ctx.showMessage(`요즘 여자아이・`);
      character.cstr[character][32] = "요즘 여자아이・";
    } else if (character.no === 4) {
      ctx.showMessage(`아가씨・`);
      character.cstr[character][32] = "아가씨・";
    } else if (character.no === 5) {
      ctx.showMessage(`인기 코스프레이어・`);
      character.cstr[character][32] = "인기 코스프레이어・";
    } else if (character.no === 6) {
      ctx.showMessage(`유부녀・`);
      character.cstr[character][32] = "유부녀・";
    } else if (character.no === 7) {
      ctx.showMessage(`백합자매・`);
      character.cstr[character][32] = "백합자매・";
    } else if (character.no === 8) {
      ctx.showMessage(`백합자매・`);
      character.cstr[character][32] = "백합자매・";
    } else if (character.no === 9) {
      ctx.showMessage(`공주님・`);
      character.cstr[character][32] = "공주님・";
    } else if (character.no === 10) {
      ctx.showMessage(`쿼터・`);
      character.cstr[character][32] = "쿼터・";
    } else if (character.no === 11) {
      ctx.showMessage(`세레브 니트・`);
      character.cstr[character][32] = "세레브 니트・";
    } else if (character.no === 12) {
      ctx.showMessage(`미인 간호사・`);
      character.cstr[character][32] = "미인 간호사・";
    } else if (character.no === 13) {
      ctx.showMessage(`낭자애・`);
      character.cstr[character][32] = "낭자애・";
    } else if (character.no === 14) {
      ctx.showMessage(`사무라이 걸・`);
      character.cstr[character][32] = "사무라이 걸・";
    } else if (character.no === 15) {
      ctx.showMessage(`미소녀 무녀・`);
      character.cstr[character][32] = "미소녀 무녀・";
    } else if (character.no === 16) {
      ctx.showMessage(`츤데레소녀・`);
      character.cstr[character][32] = "츤데레소녀・";
    } else if (character.no === 17) {
      ctx.showMessage(`메이드로이드・`);
      character.cstr[character][32] = "메이드로이드・";
    } else if (character.no === 18) {
      ctx.showMessage(`귀국자녀・`);
      character.cstr[character][32] = "귀국자녀・";
    } else if (character.no === 19) {
      ctx.showMessage(`더치와이프・`);
      character.cstr[character][32] = "더치와이프・";
    } else if (character.no === 20) {
      ctx.showMessage(`카리스마 점원・`);
      character.cstr[character][32] = "카리스마 점원・";
    } else if (character.no === 21) {
      ctx.showMessage(`여교사・`);
      character.cstr[character][32] = "여교사・";
    } else if (character.no === 22) {
      ctx.showMessage(`소악마 걸・`);
      character.cstr[character][32] = "소악마 걸・";
    } else if (character.no === 23) {
      ctx.showMessage(`유행소녀・`);
      character.cstr[character][32] = "유행소녀・";
    } else if (character.no === 24) {
      ctx.showMessage(`인기 AV배우・`);
      character.cstr[character][32] = "인기 AV배우・";
    } else if (character.no === 25) {
      ctx.showMessage(`수녀・`);
      character.cstr[character][32] = "수녀・";
    } else if (character.no === 26) {
      ctx.showMessage(`합법로리・`);
      character.cstr[character][32] = "합법로리・";
    } else if (character.no === 27) {
      ctx.showMessage(`아가씨・`);
      character.cstr[character][32] = "아가씨・";
    } else if (character.no === 28) {
      ctx.showMessage(`모에계 혼혈소녀・`);
      character.cstr[character][32] = "모에계 혼혈소녀・";
    } else if (character.no === 29) {
      ctx.showMessage(`성직자・`);
      character.cstr[character][32] = "성직자・";
    } else if (character.no === 30) {
      ctx.showMessage(`로리큐트・`);
      character.cstr[character][32] = "로리큐트・";
    } else if (character.no === 31) {
      ctx.showMessage(`음침계 로리소녀`);
      character.cstr[character][32] = "음침계 로리소녀";
    } else if (character.no === 32) {
      ctx.showMessage(`너무 아름다운 여의・`);
      character.cstr[character][32] = "너무 아름다운 여의・";
    } else if (character.no === 33) {
      ctx.showMessage(`로리 간호사・`);
      character.cstr[character][32] = "로리 간호사・";
    } else if (character.no === 34) {
      ctx.showMessage(`비밀 코스프레이어・`);
      character.cstr[character][32] = "비밀 코스프레이어・";
    } else if (character.no === 35) {
      ctx.showMessage(`쿨한 반장계 미소녀・`);
      character.cstr[character][32] = "쿨한 반장계 미소녀・";
    } else if (character.no === 36) {
      ctx.showMessage(`치유계 소꿉친구타입・`);
      character.cstr[character][32] = "치유계 소꿉친구타입・";
    } else if (character.no === 37) {
      ctx.showMessage(`인기 걸밴드의 베이시스트를 닮은・`);
      character.cstr[character][32] = "인기 걸밴드의 베이시스트를 닮은・";
    } else if (character.no === 38) {
      ctx.showMessage(`타천사계 미소녀・`);
      character.cstr[character][32] = "타천사계 미소녀・";
    } else if (character.no === 39) {
      ctx.showMessage(`납작맨들 독설소녀・`);
      character.cstr[character][32] = "납작맨들 독설소녀・";
    } else if (character.no === 40) {
      ctx.showMessage(`순종적인 폭유우등생・`);
      character.cstr[character][32] = "순종적인 폭유우등생・";
    } else if (character.no === 41) {
      ctx.showMessage(`폭신 치유계・`);
      character.cstr[character][32] = "폭신 치유계・";
    } else if (character.no === 42 && ctx.talents[76] === 0 && (ctx.talents[422] === 0 || ctx.talents[432] === 0)) {
      ctx.showMessage(`아이돌 휴업중인 ○세를 닮은`);
      character.cstr[character][32] = "아이돌 휴업중인 ○세를 닮은";
    } else if (character.no === 42 && ctx.talents[76] === 1 && (ctx.talents[422] === 0 || ctx.talents[432] === 0)) {
      ctx.showMessage(`아이돌 휴업중인 ○세를 닮은 음란소녀・`);
      character.cstr[character][32] = "아이돌 휴업중인 ○세를 닮은 음란소녀・";
    } else if (character.no === 42 && ctx.talents[76] === 0 && ctx.talents[422] === 1 && ctx.talents[432] === 1) {
      ctx.showMessage(`아이돌 휴업중인 ○세를 닮은 흑갸루・`);
      character.cstr[character][32] = "아이돌 휴업중인 ○세를 닮은 흑갸루・";
    } else if (character.no === 42 && ctx.talents[76] === 1 && ctx.talents[422] === 1 && ctx.talents[432] === 1) {
      ctx.showMessage(`아이돌 휴업중인 ○세를 닮은흑갸루걸레・`);
      character.cstr[character][32] = "아이돌 휴업중인 ○세를 닮은흑갸루걸레・";
    } else if (character.no === 43) {
      ctx.showMessage(`쌀쌀맞은 반장계아가씨・`);
      character.cstr[character][32] = "쌀쌀맞은 반장계아가씨・";
    } else if (character.no === 44) {
      ctx.showMessage(`묵묵한 모델계 장신미녀・`);
      character.cstr[character][32] = "묵묵한 모델계 장신미녀・";
    } else if (character.no === 45) {
      ctx.showMessage(`통통한 미소녀・`);
      character.cstr[character][32] = "통통한 미소녀・";
    } else if (character.no === 46 && ctx.talents[76] === 0 && (ctx.talents[422] === 0 || ctx.talents[432] === 0)) {
      ctx.showMessage(`추억의 아이돌・타카○나시를 닮은 미녀・`);
      character.cstr[character][32] = "추억의 아이돌・타카○나시를 닮은 미녀・";
    } else if (character.no === 46 && ctx.talents[76] === 1 && (ctx.talents[422] === 0 || ctx.talents[432] === 0)) {
      ctx.showMessage(`추억의 아이돌・타카○나시를 닮은 음란미녀`);
      character.cstr[character][32] = "추억의 아이돌・타카○나시를 닮은 음란미녀・";
    } else if (character.no === 46 && ctx.talents[76] === 0 && ctx.talents[422] === 1 && ctx.talents[432] === 1) {
      ctx.showMessage(`추억의 아이돌・타카○나시를 닮은 흑갸루미녀・`);
      character.cstr[character][32] = "추억의 아이돌・타카○나시를 닮은 흑갸루미녀・";
    } else if (character.no === 46 && ctx.talents[76] === 1 && ctx.talents[422] === 1 && ctx.talents[432] === 1) {
      ctx.showMessage(`추억의 아이돌・타카○나시를 닮은 흑갸루걸레・`);
      character.cstr[character][32] = "추억의 아이돌・타카○나시를 닮은 흑갸루걸레・";
    } else if (character.no === 47) {
      ctx.showMessage(`청초 아가씨・`);
      character.cstr[character][32] = "청초 아가씨・";
    } else if (character.no === 70) {
      ctx.showMessage(`원교소녀・`);
      character.cstr[character][32] = "원교소녀・";
    } else if (character.no === 72) {
      ctx.showMessage(`찐레즈 여고생・`);
      character.cstr[character][32] = "찐레즈 여고생・";
    } else if (character.no === 71) {
      ctx.showMessage(`폭유언니・`);
      character.cstr[character][32] = "폭유언니・";
    } else if (character.no === 73) {
      ctx.showMessage(`수수한 아이・`);
      character.cstr[character][32] = "수수한 아이・";
    } else if (character.no === 74) {
      ctx.showMessage(`박복로리・`);
      character.cstr[character][32] = "박복로리・";
    } else if (character.no === 75) {
      ctx.showMessage(`아가씨・`);
      character.cstr[character][32] = "아가씨・";
    } else if (character.no === 76) {
      ctx.showMessage(`우등생・`);
      character.cstr[character][32] = "우등생・";
    } else if (character.no === 77) {
      ctx.showMessage(`폭유교사・`);
      character.cstr[character][32] = "폭유교사・";
    } else if (character.no === 78) {
      ctx.showMessage(`박복교사・`);
      character.cstr[character][32] = "박복교사・";
    } else if (character.no === 80 && ctx.talents[76] === 0 && (ctx.talents[422] === 0 || ctx.talents[432] === 0)) {
      ctx.showMessage(`C○G의 미○로를 닮은`);
      character.cstr[character][32] = "C○G의 미○로를 닮은";
    } else if (character.no === 80 && ctx.talents[76] === 1 && (ctx.talents[422] === 0 || ctx.talents[432] === 0)) {
      ctx.showMessage(`C○G의 미○로를 닮은 음란소녀・`);
      character.cstr[character][32] = "C○G의 미○로를 닮은 음란소녀・";
    } else if (character.no === 80 && ctx.talents[76] === 0 && ctx.talents[422] === 1 && ctx.talents[432] === 1) {
      ctx.showMessage(`C○G의 미○로를 닮은 흑갸루・`);
      character.cstr[character][32] = "C○G의 미○로를 닮은 흑갸루・";
    } else if (character.no === 80 && ctx.talents[76] === 1 && ctx.talents[422] === 1 && ctx.talents[432] === 1) {
      ctx.showMessage(`C○G의 미○로를 닮은흑갸루걸레・`);
      character.cstr[character][32] = "C○G의 미○로를 닮은흑갸루걸레・";
    } else if (character.no === 81) {
      ctx.showMessage(`아가씨・`);
      character.cstr[character][32] = "아가씨・";
    } else if (character.no === 82) {
      ctx.showMessage(`리틀 데빌・`);
      character.cstr[character][32] = "리틀 데빌・";
    } else if (character.no === 83) {
      ctx.showMessage(`전 주니어아이돌・`);
      character.cstr[character][32] = "전 주니어아이돌・";
    } else if (character.no === 84) {
      ctx.showMessage(`숙녀・`);
      character.cstr[character][32] = "숙녀・";
    } else if (character.no === 85) {
      ctx.showMessage(`여신・`);
      character.cstr[character][32] = "여신・";
    } else if (character.no === 86) {
      ctx.showMessage(`천재소녀・`);
      character.cstr[character][32] = "천재소녀・";
    } else if (character.no === 87) {
      ctx.showMessage(`남장미소녀・`);
      character.cstr[character][32] = "남장미소녀・";
    } else if (character.no === 93) {
      ctx.showMessage(`동물귀 중화소녀・`);
      character.cstr[character][32] = "동물귀 중화소녀・";
    } else if (character.no === 94) {
      ctx.showMessage(`안경・`);
      character.cstr[character][32] = "안경・";
    } else if (character.no === 95) {
      ctx.showMessage(`로리BBA(!?)・`);
      character.cstr[character][32] = "로리BBA(!?)・";
    } else if (character.no === 96) {
      ctx.showMessage(`쿨 뷰티・`);
      character.cstr[character][32] = "쿨 뷰티・";
    } else if (character.no === 97) {
      ctx.showMessage(`변태숙녀・`);
      character.cstr[character][32] = "변태숙녀・";
    } else if (character.no === 98) {
      ctx.showMessage(`누나계 인기 독자모델・`);
      character.cstr[character][32] = "누나계 인기 독자모델・";
    } else if (character.no === 99) {
      ctx.showMessage(`여동생계 병약 츤데레・`);
      character.cstr[character][32] = "여동생계 병약 츤데레・";
    } else if (character.no === 100) {
      ctx.showMessage(`강아지계 활발소녀・`);
      character.cstr[character][32] = "강아지계 활발소녀・";
    } else if (character.no === 101) {
      ctx.showMessage(`쿨한 검도소녀・`);
      character.cstr[character][32] = "쿨한 검도소녀・";
    } else if (character.no === 102) {
      ctx.showMessage(`소악마계 혼혈소녀・`);
      character.cstr[character][32] = "소악마계 혼혈소녀・";
    } else if (character.no === 103) {
      ctx.showMessage(`온화계 거유 아가씨・`);
      character.cstr[character][32] = "온화계 거유 아가씨・";
    } else if (character.no === 106) {
      ctx.showMessage(`미니멈 큐트계 로리 의붓여동생・`);
      character.cstr[character][32] = "미니멈 큐트계 로리 의붓여동생・";
    } else if (character.no === 107) {
      ctx.showMessage(`열혈 근성 스포츠소녀・`);
      character.cstr[character][32] = "열혈 근성 스포츠소녀・";
    } else if (character.no === 108) {
      ctx.showMessage(`공주님계 거유미소녀・`);
      character.cstr[character][32] = "공주님계 거유미소녀・";
    } else if (character.no === 151) {
      ctx.showMessage(`풍속녀・`);
      character.cstr[character][32] = "풍속녀・";
    } else if (character.no === 152) {
      ctx.showMessage(`미인 아가씨 여고생・`);
      character.cstr[character][32] = "미인 아가씨 여고생・";
    } else if (character.no === 200) {
      ctx.showMessage(`로리계 벨리 댄서・`);
      character.cstr[character][32] = "로리계 벨리 댄서";
    } else if (character.no === 201) {
      ctx.showMessage(`공주 용사(자칭)・`);
      character.cstr[character][32] = "공주 용사(자칭)・";
    } else if (character.no === 202) {
      ctx.showMessage(`걸밴드 어린아내・`);
      character.cstr[character][32] = "걸밴드 어린아내・";
    } else if (character.no === 203) {
      ctx.showMessage(`여배우 지망생・`);
      character.cstr[character][32] = "여배우 지망생・";
    } else if (character.no === 204) {
      ctx.showMessage(`S급 미소녀・`);
      character.cstr[character][32] = "S급 미소녀・";
    } else if (character.no === 205) {
      ctx.showMessage(`닌자 걸・`);
      character.cstr[character][32] = "닌자 걸・";
    } else if (character.no === 206) {
      ctx.showMessage(`그 아가씨를 닮은 낭자애・`);
      character.cstr[character][32] = "그 아가씨를 닮은 낭자애・";
    } else if (character.no === 207) {
      ctx.showMessage(`폭유 불량배・`);
      character.cstr[character][32] = "폭유 불량배・";
    } else if (character.no === 208) {
      ctx.showMessage(`커리어 우먼계 미망인`);
      character.cstr[character][32] = "커리어 우먼계 미망인";
    } else if (character.no === 209) {
      ctx.showMessage(`여왕님계 마조녀・`);
      character.cstr[character][32] = "여왕님계 마조녀・";
    } else if (character.no === 210) {
      ctx.showMessage(`덜렁이 아가씨・`);
      character.cstr[character][32] = "덜렁이 아가씨・";
    } else if (character.no === 211) {
      ctx.showMessage(`관심받고 싶어하는 로리・`);
      character.cstr[character][32] = "관심받고 싶어하는 로리・";
    } else if (character.no === 212) {
      ctx.showMessage(`더러움계 폭유무녀・`);
      character.cstr[character][32] = "더러움계 폭유무녀・";
    } else if (character.no === 213) {
      ctx.showMessage(`청춘 소박계 천연미소녀・`);
      character.cstr[character][32] = "청춘 소박계 천연미소녀・";
    } else if (character.no === 214) {
      ctx.showMessage(`천진난만한 로리계 미소녀・`);
      character.cstr[character][32] = "천진난만한 로리계 미소녀・";
    } else if (character.no === 215) {
      ctx.showMessage(`자택경비계 신세대 아이돌・`);
      character.cstr[character][32] = "자택경비계 신세대 아이돌・";
    } else if (character.no === 150 && ctx.talents[76] === 0 && (ctx.talents[422] === 0 || ctx.talents[432] === 0)) {
      ctx.showMessage(`C○G의 유○를 닮은`);
      character.cstr[character][32] = "C○G의 유○를 닮은";
    } else if (character.no === 150 && ctx.talents[76] === 1 && (ctx.talents[422] === 0 || ctx.talents[432] === 0)) {
      ctx.showMessage(`C○G의 유○를 닮은 음란소녀・`);
      character.cstr[character][32] = "C○G의 유○를 닮은 음란소녀・";
    } else if (character.no === 150 && ctx.talents[76] === 0 && ctx.talents[422] === 1 && ctx.talents[432] === 1) {
      ctx.showMessage(`C○G의 유○를 닮은 흑갸루・`);
      character.cstr[character][32] = "C○G의 유○를 닮은 흑갸루・";
    } else if (character.no === 150 && ctx.talents[76] === 1 && ctx.talents[422] === 1 && ctx.talents[432] === 1) {
      ctx.showMessage(`C○G의 유○를 닮은 흑갸루걸레・`);
      character.cstr[character][32] = "C○G의 유○를 닮은 흑갸루걸레・";
    }
    if (ctx.talents[153] === 1 && ctx.flags[22] & 4) {
      if (ctx.rand(2) === 0) {
        ctx.cstr[34] = "만삭 코스프레";
      } else {
        ctx.cstr[34] = "코스프레 임산부";
      }
    } else if (ctx.talents[153] === 1) {
      if (ctx.rand(2) === 0) {
        ctx.cstr[34] = "만삭";
      } else {
        ctx.cstr[34] = "임산부";
      }
    } else if (ctx.flags[22] & 4) {
      ctx.cstr[34] = "코스프레";
    }
    if (촬영부위V >= 촬영부위C && 촬영부위V >= 촬영부위A && 촬영내용성교) {
      ctx.cstr[33] = 조사처리(NICKctx.getName(character),"과");
      ctx.cstr[35] = "생SEX";
    } else if (촬영부위A && 촬영내용성교) {
      ctx.cstr[33] = 조사처리(NICKctx.getName(character),"과");
      ctx.cstr[35] = "애널섹스";
    } else if (촬영내용피스트) {
      ctx.cstr[33] = 조사처리(NICKctx.getName(character),"과");
      ctx.cstr[35] = "피스트퍽";
    } else if (촬영특수거품춤) {
      ctx.cstr[33] = "%NICKNAME:TARGET%의";
      ctx.cstr[35] = "봉사 소프플레이";
    } else if (촬영특수난교) {
      ctx.cstr[33] = "%NICKNAME:TARGET%의";
      ctx.cstr[35] = "대난교";
    } else if (촬영특수착유) {
      ctx.cstr[33] = "%NICKNAME:TARGET%의";
      ctx.cstr[35] = "착유파티";
    } else if (촬영내용펠라 && (촬영내용펠라 >= 촬영경향봉사/2)) {
      ctx.cstr[33] = "%NICKNAME:TARGET%의";
      ctx.cstr[35] = "봄 펠라축제";
    } else if (촬영경향봉사) {
      ctx.cstr[33] = "%NICKNAME:TARGET%의";
      ctx.cstr[35] = "봉사 대작전";
    } else if (촬영경향SM) {
      ctx.cstr[33] = 조사처리(NICKctx.getName(character),"과");
      ctx.cstr[35] = SM;
    } else if (촬영경향자위) {
      ctx.cstr[33] = "%NICKNAME:TARGET%의";
      ctx.cstr[35] = "엄청 에로한 자위를 보여줄게";
    } else if (촬영부위C && 촬영내용성교) {
      ctx.cstr[33] = "%NICKNAME:TARGET%의";
      ctx.cstr[35] = "역강간";
    } else if (촬영특수레즈) {
      ctx.cstr[33] = `${NICKctx.getName(character)}들의`;
      ctx.cstr[35] = "레즈SEX";
    }
    if (character.tflags[32] & 1) {
      ctx.cstr[33] = 조사처리(NICKctx.getName(character),"이");
    }
    ctx.showMessage(`%CSTR:33%%CSTR:34%%CSTR:35%`);
    if (character.tflags[32] & 1) {
      ctx.showMessage(`%조사처리(CSTR:35,"로")% 처녀상실`);
      ctx.cstr[36] = %조사처리(ctx.cstr[35],"로")% 처녀상실;
      if (ctx.player.no === 0 && ctx.getTalent(player, 122) === 0 && (character.no === 1 || character.no === 91)) {
        ctx.showMessage(`~언니가 어른 여자로 만들어 주셨습니다~`);
        ctx.cstr[37] = "~언니가 어른 여자로 만들어 주셨습니다~";
      } else if (ctx.getTalent(player, 122) === 0 && ctx.talents[432] === 1 && ctx.getTalent(player, 432) === 1) {
        ctx.showMessage(`~레즈섹프갸루친구・${ctx.josaHelper("조수가")} 여자로 만들어 줬습니다~`);
        ctx.cstr[37] = "~레즈섹프갸루친구・%조수가()% 여자로 만들어 줬습니다~";
      } else if (ctx.getTalent(player, 122) === 0) {
        ctx.showMessage(`~\@ PLAYER ? ${ctx.getVarName("NICK", PLAYER)}chan # 감독 \@이 어른 여자로 만들어 주셨습니다~`);
        ctx.cstr[37] = "~\@ PLAYER ? %NICKNAME:PLAYER%chan # 감독 \@이 어른 여자로 만들어 주셨습니다~";
      } else if (ctx.talents[432] === 0 && (character.no === 1 || character.no === 91)) {
        ctx.showMessage(`~오빠가 어른 여자로 만들어 주셨습니다~`);
        ctx.cstr[37] = "~오빠가 어른 여자로 만들어 주셨습니다~";
      } else if (ctx.talents[432] === 1 && (character.no === 1 || character.no === 91)) {
        ctx.showMessage(`~오빠의 자지가 어른 여자로 만들어 주셨습니다~`);
        ctx.cstr[37] = "~오빠의 자지가 어른 여자로 만들어 주셨습니다~";
      } else if (ctx.talents[432] === 0 && ctx.base[9] < ctx.masterBase[9]) {
        ctx.showMessage(`~선배가 어른 여자로 만들어 주셨습니다~`);
        ctx.cstr[37] = "~선배가 어른 여자로 만들어 주셨습니다~";
      } else if (ctx.talents[432] === 0 && ctx.base[9]  > ctx.masterBase[9]) {
        ctx.showMessage(`~연하에게 어른 여자가 되버렸습니다~`);
        ctx.cstr[37] = "~연하에게 어른 여자가 되버렸습니다~";
      } else if (ctx.talents[432] === 0 && ctx.base[9]  === ctx.masterBase[9]) {
        ctx.showMessage(`~친구에게 여자가 되버렸습니다~`);
        ctx.cstr[37] = "~친구에게 여자가 되버렸습니다~";
      } else if (ctx.talents[432] === 1 && ctx.base[9] < ctx.masterBase[9]) {
        ctx.showMessage(`~선배의 자지가 어른 여자로 만들어 주셨습니다~`);
        ctx.cstr[37] = "~선배의 자지가 어른 여자로 만들어 주셨습니다~";
      } else if (ctx.talents[432] === 1 && ctx.base[9]  > ctx.masterBase[9]) {
        ctx.showMessage(`~연하의 자지에게 어른 여자가 되버렸습니다~`);
        ctx.cstr[37] = "~연하의 자지에게 어른 여자가 되버렸습니다~";
      } else if (ctx.talents[432] === 1 && ctx.base[9]  === ctx.masterBase[9]) {
        ctx.showMessage(`~섹프의 자지에게 어른 여자가 되버렸습니다~`);
        ctx.cstr[37] = "~섹프의 자지에게 어른 여자가 되버렸습니다~";
      }
      character.cflags[641] = 1;
    } else if (character.tflags[132] & 1) {
      ctx.showMessage(`%조사처리(CSTR:35,"로")% 애널처녀상실`);
      ctx.cstr[36] = %조사처리(ctx.cstr[35],"로")% 애널처녀상실;
      if (ctx.player.no === 0 && ctx.getTalent(player, 122) === 0 && (character.no === 1 || character.no === 91)) {
        ctx.showMessage(`~언니에게 애널처녀 바쳐버렸습니다~`);
        ctx.cstr[37] = "~언니에게 애널처녀 바쳐버렸습니다~";
      } else if (ctx.getTalent(player, 122) === 0 && ctx.talents[432] === 1 && ctx.getTalent(player, 432) === 1) {
        ctx.showMessage(`~레즈섹프갸루친구・${ctx.getVarName("NICK", ASSI)}에게 애널처녀 바쳐버렸습니다~`);
        ctx.cstr[37] = `~레즈섹프갸루친구・${NICKctx.getName(ctx.assi)}에게 애널처녀 바쳐버렸습니다~`;
      } else if (ctx.getTalent(player, 122) === 0) {
        ctx.showMessage(`~\@ PLAYER ? ${ctx.getVarName("NICK", PLAYER)}chan # 감독 \@에게 애널처녀 바쳐버렸습니다~`);
        ctx.cstr[37] = "~\@ PLAYER ? %NICKNAME:PLAYER%chan # 감독 \@에게 애널처녀 바쳐버렸습니다~";
      } else if (ctx.talents[432] === 0 && (character.no === 1 || character.no === 91)) {
        ctx.showMessage(`~오빠에게 애널처녀 바쳐버렸습니다~`);
        ctx.cstr[37] = "~오빠에게 애널처녀 바쳐버렸습니다~";
      } else if (ctx.talents[432] === 1 && (character.no === 1 || character.no === 91)) {
        ctx.showMessage(`~오빠의 자지에게 애널처녀 바쳐버렸습니다~`);
        ctx.cstr[37] = "~오빠의 자지에게 애널처녀 바쳐버렸습니다~";
      } else if (ctx.talents[432] === 0 && ctx.base[9] < 17) {
        ctx.showMessage(`~선배에게 애널처녀 바쳐버렸습니다~`);
        ctx.cstr[37] = "~선배에게 애널처녀 바쳐버렸습니다~";
      } else if (ctx.talents[432] === 0 && ctx.base[9]  > 17) {
        ctx.showMessage(`~연하에게 애널처녀 바쳐버렸습니다~`);
        ctx.cstr[37] = "~연하에게 애널처녀 바쳐버렸습니다~";
      } else if (ctx.talents[432] === 0 && ctx.base[9]  === 17) {
        ctx.showMessage(`~친구에게 애널처녀 바쳐버렸습니다~`);
        ctx.cstr[37] = "~친구에게 애널처녀 바쳐버렸습니다~";
      } else if (ctx.talents[432] === 1 && ctx.base[9] < 17) {
        ctx.showMessage(`~선배의 자지에게 애널처녀 바쳐버렸습니다~`);
        ctx.cstr[37] = "~선배의 자지에게 애널처녀 바쳐버렸습니다~";
      } else if (ctx.talents[432] === 1 && ctx.base[9]  > 17) {
        ctx.showMessage(`~연하의 자지에게 애널처녀 바쳐버렸습니다~`);
        ctx.cstr[37] = "~연하의 자지에게 애널처녀 바쳐버렸습니다~";
      } else if (ctx.talents[432] === 1 && ctx.base[9]  === 17) {
        ctx.showMessage(`~섹프의 자지에게 애널처녀 바쳐버렸습니다~`);
        ctx.cstr[37] = "~섹프의 자지에게 애널처녀 바쳐버렸습니다~";
      }
      character.cflags[641] = 1;
    } else if (character.tflags[133]) {
      if (character.tflags[133] === 1) {
        ctx.showMessage(`%조사처리(CSTR:35,"로")% 동정상실`);
        ctx.cstr[36] = %조사처리(ctx.cstr[35],"로")% 동정상실;
      }
      if (ctx.getTalent(player, 122) === 0 && ctx.talents[432] === 1 && ctx.getTalent(player, 432) === 1) {
        ctx.showMessage(`~레즈섹프갸루친구・${ctx.getVarName("NICK", ASSI)}의 보지에 %CSTR:9%의 자지 들어가 버렸습니다~`);
        ctx.cstr[37] = `~레즈섹프갸루친구・${NICKctx.getName(ctx.assi)}의 보지에 ${ctx.cstr[9]}의 자지 들어가 버렸습니다~`;
      } else if (ctx.getTalent(player, 122) === 0) {
        ctx.showMessage(`~\@ PLAYER ? ${ctx.getVarName("NICK", PLAYER)}chan # 감독 \@의 보지에 %CSTR:9%의 자지 들어가 버렸습니다~`);
        ctx.cstr[37] = `~\@ PLAYER ? ${NICKctx.getName(ctx.player)}chan # 감독 \@의 보지에 ${ctx.cstr[9]}의 자지 들어가 버렸습니다~`;
      }
      character.cflags[641] = 1;
    } else {
      ctx.showMessage(``);
      // TODO: CSTR:36 =
      character.cflags[641] = 0;
      // TODO: CSTR:37 =
    }
  }
}

export async function print_video_title_new(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`%CSTR:30%`);
  ctx.showMessage(`%CSTR:31%`);
  ctx.showMessage(`%CSTR:32%`);
  ctx.showMessage(`%CSTR:33%`);
  ctx.showMessage(`%CSTR:34%`);
  ctx.showMessage(`%CSTR:35%`);
  ctx.showMessage(`%CSTR:36%`);
  if (character.cflags[642] === 1) {
    ctx.showMessage('');
    ctx.showMessage(` %CSTR:37%`);
  } else {
    ctx.showMessage('');
  }
}

export async function change_videotitle_represent(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character.tflags[160] === 0) {
    ctx.cstr[20] = ctx.cstr[30];
    ctx.cstr[21] = ctx.cstr[31];
    ctx.cstr[22] = ctx.cstr[32];
  } else {
    ctx.cstr[20] = ctx.cstr[30];
    ctx.cstr[21] = ctx.cstr[31];
    ctx.cstr[22] = ctx.cstr[32];
  }
  ctx.cstr[23] = ctx.cstr[33];
  ctx.cstr[24] = ctx.cstr[34];
  ctx.cstr[25] = ctx.cstr[35];
  ctx.cstr[26] = ctx.cstr[36];
  ctx.cstr[27] = ctx.cstr[37];
  if ((character.tflags[32] & 1 || character.tflags[132] & 1) && character.tflags[160] === 0 &&character.tflags[180] != 20) {
    character.cflags[643] = 1;
  } else {
    // TODO: CSTR:27 =
    character.cflags[643] = 0;
  }
}

export async function print_video_title_represent(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`%CSTR:20%`);
  ctx.showMessage(`%CSTR:21%`);
  ctx.showMessage(`%CSTR:22%`);
  ctx.showMessage(`%CSTR:23%`);
  ctx.showMessage(`%CSTR:24%`);
  ctx.showMessage(`%CSTR:25%`);
  ctx.showMessage(`%CSTR:26%`);
  if (character.cflags[643] === 1) {
    ctx.showMessage('');
    ctx.showMessage(` %CSTR:27%`);
  } else {
    ctx.showMessage('');
  }
}

export async function actress_article(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character.no != 42 && character.no != 46 && character.no != 80 && character.no != 150 && character.no != 1 && character.no != 91) {
    if (ctx.talents[76] === 1 && ctx.talents[422] === 0) {
      if (ctx.rand(2) === 0) {
        ctx.showMessage(`음란`);
        ctx.cstr[41] = "음란";
      } else {
        ctx.showMessage(`변태`);
        ctx.cstr[41] = "변태";
      }
    } else if (ctx.talents[76] === 1 && ctx.talents[422] === 1 && ctx.talents[432] === 1) {
      ctx.showMessage(`흑갸루걸레`);
      ctx.cstr[41] = "흑갸루걸레";
    } else if (ctx.talents[76] === 0 && ctx.talents[422] === 1 && ctx.talents[432] === 1) {
      ctx.showMessage(`흑갸루`);
      ctx.cstr[41] = "흑갸루";
    }
  }
  if ((character.no === 1 || character.no === 91) && ctx.talents[76] === 0 && (ctx.talents[422] === 0 || ctx.talents[432] === 0)) {
    character.cstr[character][42] = "순정소녀";
  } else if ((character.no === 1 || character.no === 91) && ctx.talents[76] === 1 && (ctx.talents[422] === 0 || ctx.talents[432] === 0)) {
    character.cstr[character][42] = "청초 로리비치";
  } else if ((character.no === 1 || character.no === 91) && ctx.talents[76] === 0 && ctx.talents[422] === 1 && ctx.talents[432] === 1) {
    character.cstr[character][42] = "건방지고 에로귀염한 흑갸루 레게 댄서";
  } else if ((character.no === 1 || character.no === 91) && ctx.talents[76] === 1 && ctx.talents[422] === 1 && ctx.talents[432] === 1) {
    character.cstr[character][42] = "흑갸루 로리비치 레게 댄서";
  } else if (character.no === 2) {
    character.cstr[character][42] = "스포츠소녀";
  } else if (character.no === 3) {
    character.cstr[character][42] = "요즘 여자아이";
  } else if (character.no === 4) {
    character.cstr[character][42] = "아가씨";
  } else if (character.no === 5) {
    character.cstr[character][42] = "인기 코스프레이어";
  } else if (character.no === 6) {
    character.cstr[character][42] = "유부녀";
  } else if (character.no === 7) {
    character.cstr[character][42] = "백합자매";
  } else if (character.no === 8) {
    character.cstr[character][42] = "백합자매";
  } else if (character.no === 9) {
    character.cstr[character][42] = "공주님";
  } else if (character.no === 10) {
    character.cstr[character][42] = "쿼터";
  } else if (character.no === 11) {
    character.cstr[character][42] = "세레브 니트";
  } else if (character.no === 12) {
    character.cstr[character][42] = "미인 간호사";
  } else if (character.no === 13) {
    character.cstr[character][42] = "낭자애";
  } else if (character.no === 14) {
    character.cstr[character][42] = "사무라이 걸";
  } else if (character.no === 15 && ctx.talents[76] === 0) {
    character.cstr[character][42] = "미소녀 무녀";
  } else if (character.no === 16) {
    character.cstr[character][42] = "츤데레소녀";
  } else if (character.no === 17) {
    character.cstr[character][42] = "메이드로이드";
  } else if (character.no === 18) {
    character.cstr[character][42] = "귀국자녀";
  } else if (character.no === 19) {
    character.cstr[character][42] = "더치와이프";
  } else if (character.no === 20) {
    character.cstr[character][42] = "카리스마 점원";
  } else if (character.no === 21) {
    character.cstr[character][42] = "여교사";
  } else if (character.no === 22) {
    character.cstr[character][42] = "소악마 걸";
  } else if (character.no === 23) {
    character.cstr[character][42] = "유행소녀";
  } else if (character.no === 24) {
    character.cstr[character][42] = "인기 AV배우";
  } else if (character.no === 25) {
    character.cstr[character][42] = "수녀";
  } else if (character.no === 26) {
    character.cstr[character][42] = "합법로리";
  } else if (character.no === 27) {
    character.cstr[character][42] = "아가씨";
  } else if (character.no === 28) {
    character.cstr[character][42] = "모에계 혼혈소녀";
  } else if (character.no === 29) {
    character.cstr[character][42] = "배덕한 성직자";
  } else if (character.no === 30) {
    character.cstr[character][42] = "로리큐트";
  } else if (character.no === 31) {
    character.cstr[character][42] = "음침계 로리소녀";
  } else if (character.no === 32) {
    character.cstr[character][42] = "너무 아름다운 여의";
  } else if (character.no === 33) {
    character.cstr[character][42] = "로리 간호사";
  } else if (character.no === 34) {
    character.cstr[character][42] = "비밀 코스프레이어";
  } else if (character.no === 35) {
    character.cstr[character][42] = "쿨한 반장계 미소녀";
  } else if (character.no === 36) {
    character.cstr[character][42] = "치유계 소꿉친구타입";
  } else if (character.no === 37) {
    character.cstr[character][42] = "인기 걸밴드의 베이시스트를 닮은";
  } else if (character.no === 38) {
    character.cstr[character][42] = "타천사계 미소녀";
  } else if (character.no === 39) {
    character.cstr[character][12] = "납작맨들 독설소녀";
  } else if (character.no === 40) {
    character.cstr[character][12] = "순종적인 폭유우등생";
  } else if (character.no === 41) {
    character.cstr[character][12] = "폭신 치유계";
  } else if (character.no === 42 && ctx.talents[76] === 0 && (ctx.talents[422] === 0 || ctx.talents[432] === 0)) {
    character.cstr[character][42] = "아이돌 휴업중인 ○세를 닮은";
  } else if (character.no === 42 && ctx.talents[76] === 1 && (ctx.talents[422] === 0 || ctx.talents[432] === 0)) {
    character.cstr[character][42] = "아이돌 휴업중인 ○세를 닮은 음란소녀";
  } else if (character.no === 42 && ctx.talents[76] === 0 && ctx.talents[422] === 1 && ctx.talents[432] === 1) {
    character.cstr[character][42] = "아이돌 휴업중인 ○세를 닮은 흑갸루";
  } else if (character.no === 42 && ctx.talents[76] === 1 && ctx.talents[422] === 1 && ctx.talents[432] === 1) {
    character.cstr[character][42] = "아이돌 휴업중인 ○세를 닮은 흑갸루걸레";
  } else if (character.no === 43) {
    character.cstr[character][42] = "쌀쌀맞은 반장계아가씨";
  } else if (character.no === 44) {
    character.cstr[character][42] = "묵묵한 모델계 장신미녀";
  } else if (character.no === 45) {
    character.cstr[character][42] = "통통한 미소녀";
  } else if (character.no === 46 && ctx.talents[76] === 0 && (ctx.talents[422] === 0 || ctx.talents[432] === 0)) {
    character.cstr[character][42] = "추억의 아이돌・코○리 아○비를 닮은 미녀";
  } else if (character.no === 46 && ctx.talents[76] === 1 && (ctx.talents[422] === 0 || ctx.talents[432] === 0)) {
    character.cstr[character][42] = "추억의 아이돌・코○리 아○비를 닮은 음란미녀";
  } else if (character.no === 46 && ctx.talents[76] === 0 && ctx.talents[422] === 1 && ctx.talents[432] === 1) {
    character.cstr[character][42] = "추억의 아이돌・코○리 아○비를 닮은 흑갸루미녀";
  } else if (character.no === 46 && ctx.talents[76] === 1 && ctx.talents[422] === 1 && ctx.talents[432] === 1) {
    character.cstr[character][42] = "추억의 아이돌・코○리 아○비를 닮은 흑갸루걸레";
  } else if (character.no === 47) {
    character.cstr[character][12] = "청초 아가씨";
  } else if (character.no === 70) {
    character.cstr[character][42] = "원교소녀";
  } else if (character.no === 72) {
    character.cstr[character][42] = "찐레즈 여고생";
  } else if (character.no === 71) {
    character.cstr[character][42] = "폭유언니";
  } else if (character.no === 73) {
    character.cstr[character][42] = "수수한 아이";
  } else if (character.no === 74) {
    character.cstr[character][42] = "박복로리";
  } else if (character.no === 75) {
    character.cstr[character][42] = "아가씨";
  } else if (character.no === 76) {
    character.cstr[character][42] = "우등생";
  } else if (character.no === 77) {
    character.cstr[character][42] = "폭유교사";
  } else if (character.no === 78) {
    character.cstr[character][42] = "박복교사";
  } else if (character.no === 80 && ctx.talents[76] === 0 && (ctx.talents[422] === 0 || ctx.talents[432] === 0)) {
    character.cstr[character][42] = "C○G의 미○로를 닮은";
  } else if (character.no === 80 && ctx.talents[76] === 1 && (ctx.talents[422] === 0 || ctx.talents[432] === 0)) {
    character.cstr[character][42] = "C○G의 미○로를 닮은 음란소녀";
  } else if (character.no === 80 && ctx.talents[76] === 0 && ctx.talents[422] === 1 && ctx.talents[432] === 1) {
    character.cstr[character][42] = "C○G의 미○로를 닮은 흑갸루";
  } else if (character.no === 80 && ctx.talents[76] === 1 && ctx.talents[422] === 1 && ctx.talents[432] === 1) {
    character.cstr[character][42] = "C○G의 미○로를 닮은흑갸루걸레";
  } else if (character.no === 81) {
    character.cstr[character][42] = "아가씨";
  } else if (character.no === 82) {
    character.cstr[character][42] = "리틀 데빌";
  } else if (character.no === 83) {
    character.cstr[character][42] = "전 주니어아이돌";
  } else if (character.no === 84) {
    character.cstr[character][42] = "숙녀";
  } else if (character.no === 85) {
    character.cstr[character][42] = "여신";
  } else if (character.no === 86) {
    character.cstr[character][42] = "천재소녀";
  } else if (character.no === 87) {
    character.cstr[character][42] = "남장미소녀";
  } else if (character.no === 93) {
    character.cstr[character][42] = "동물귀 중화소녀";
  } else if (character.no === 94) {
    character.cstr[character][42] = "안경";
  } else if (character.no === 95) {
    character.cstr[character][42] = "로리BBA(!?)";
  } else if (character.no === 96) {
    character.cstr[character][42] = "쿨 뷰티";
  } else if (character.no === 97) {
    character.cstr[character][42] = "변태숙녀";
  } else if (character.no === 98) {
    character.cstr[character][42] = "누나계 인기 독자모델";
  } else if (character.no === 99) {
    character.cstr[character][42] = "여동생계 병약 츤데레";
  } else if (character.no === 100) {
    character.cstr[character][42] = "강아지계 활발소녀";
  } else if (character.no === 101) {
    character.cstr[character][42] = "쿨한 검도소녀";
  } else if (character.no === 102) {
    character.cstr[character][42] = "소악마계 혼혈소녀";
  } else if (character.no === 103) {
    character.cstr[character][42] = "온화계 거유 아가씨";
  } else if (character.no === 106) {
    character.cstr[character][32] = "미니멈 큐트계 로리 의붓여동생";
  } else if (character.no === 107) {
    character.cstr[character][42] = "열혈 근성 스포츠소녀";
  } else if (character.no === 108) {
    character.cstr[character][42] = "공주님계 거유미소녀";
  } else if (character.no === 200) {
    character.cstr[character][42] = "로리계 벨리 댄서";
  } else if (character.no === 201) {
    character.cstr[character][42] = "공주 용사(자칭)";
  } else if (character.no === 202) {
    character.cstr[character][42] = "걸밴드 어린아내";
  } else if (character.no === 203) {
    character.cstr[character][42] = "여배우 지망생";
  } else if (character.no === 204) {
    character.cstr[character][42] = "S급 미소녀";
  } else if (character.no === 205) {
    character.cstr[character][42] = "닌자 걸";
  } else if (character.no === 206) {
    character.cstr[character][42] = "그 아가씨를 닮은 낭자애";
  } else if (character.no === 207) {
    character.cstr[character][42] = "폭유 불량배";
  } else if (character.no === 208) {
    character.cstr[character][42] = "커리어 우먼계 미망인";
  } else if (character.no === 209) {
    character.cstr[character][42] = "여왕님계 마조녀";
  } else if (character.no === 210) {
    character.cstr[character][42] = "덜렁이 아가씨";
  } else if (character.no === 211) {
    character.cstr[character][42] = "관심받고 싶어하는 로리";
  } else if (character.no === 212) {
    character.cstr[character][42] = "더러움계 폭유무녀";
  } else if (character.no === 213) {
    character.cstr[character][42] = "청춘 소박계 천연미소녀";
  } else if (character.no === 214) {
    character.cstr[character][42] = "천진난만한 로리계 미소녀";
  } else if (character.no === 215) {
    character.cstr[character][42] = "자택경비계 신세대 아이돌";
  } else if (character.no === 150 && ctx.talents[76] === 0 && (ctx.talents[422] === 0 || ctx.talents[432] === 0)) {
    character.cstr[character][42] = "C○G의 유○를 닮은 소녀";
  } else if (character.no === 150 && ctx.talents[76] === 1 && (ctx.talents[422] === 0 || ctx.talents[432] === 0)) {
    character.cstr[character][42] = "C○G의 유○를 닮은 음란소녀";
  } else if (character.no === 150 && ctx.talents[76] === 0 && ctx.talents[422] === 1 && ctx.talents[432] === 1) {
    character.cstr[character][42] = "C○G의 유○를 닮은 흑갸루";
  } else if (character.no === 150 && ctx.talents[76] === 1 && ctx.talents[422] === 1 && ctx.talents[432] === 1) {
    character.cstr[character][42] = "C○G의 유○를 닮은흑갸루걸레";
  } else if (character.no === 151) {
    ctx.showMessage(`풍속녀`);
    character.cstr[character][42] = "풍속녀";
  } else if (character.no === 152) {
    ctx.showMessage(`미인 아가씨 여고생`);
    character.cstr[character][42] = "미인 아가씨 여고생";
  }
}
