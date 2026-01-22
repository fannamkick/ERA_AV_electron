/**
 * commandAvailability.ts
 *
 * COMABLE.ERB의 @COM_ABLE0~154를 TypeScript로 직접 포팅
 * 각 함수는 ERB 코드를 거의 1:1로 변환
 */

import { TrainingContext } from '../runtime/types';
import { Character } from '../runtime/types';

/**
 * 조건 체크 함수 타입
 */
type AvailabilityChecker = (ctx: TrainingContext, char: Character) => boolean;

/**
 * 모든 커맨드의 가용성 조건
 * Key: 커맨드 번호 (0-92)
 * Value: 가용성 체크 함수
 */
export const COMMAND_AVAILABLE: Record<number, AvailabilityChecker> = {
  // ============================================================================
  // COM0: C감각 애무
  // @COM_ABLE0: RETURN 1
  // ============================================================================
  0: () => true,

  // ============================================================================
  // COM1: 커닐링구스
  // @COM_ABLE1 (Lines 11-43)
  // ============================================================================
  1: (ctx, char) => {
    // 대상이 남성이면 불가 (TALENT:122)
    if (char.talents?.[122]) return false;

    // 촉수 지도중 불가 (TEQUIP:90)
    if (char.equipment?.[90]) return false;

    // 슬라임 지도중 불가 (TEQUIP:150)
    if (char.equipment?.[150]) return false;

    // 삼각목마 기승 중 불가 (TEQUIP:70)
    if (char.equipment?.[70]) return false;

    // 팬티(1) 또는 하의(16) 착용시 불가 (CFLAG:40 & 17)
    if ((char.cflags?.[40] || 0) & 17) return false;

    // 검은 스타킹 착용시 불가
    if ((char.cflags?.[170] || 0) === 6 && (char.cflags?.[173] || 0) === 0) return false;

    // 기저귀 착용시 불가
    if ((char.cflags?.[42] || 0) === 69 && ((char.cflags?.[40] || 0) & 64)) return false;

    // 즈코 인형 착용시 불가
    if ((char.cflags?.[42] || 0) === 11 && ((char.cflags?.[40] || 0) & 64)) return false;

    // TODO: ASSIPLAY 조건
    // IF (STAIN:2 & 4 || STAIN:2 & 8 || STAIN:2 & 32) && ASSIPLAY
    //   SIF ABL:ASSI:0 <= 3 && TALENT:ASSI:62 && TALENT:ASSI:64 == 0
    //     RETURN 0

    return true;
  },

  // ============================================================================
  // COM2: 애널애무
  // @COM_ABLE2 (Lines 48-84)
  // ============================================================================
  2: (ctx, char) => {
    // 수간 플레이중 불가 (TEQUIP:89)
    if (char.equipment?.[89]) return false;

    // 삼각목마 기승 중 불가 (TEQUIP:70)
    if (char.equipment?.[70]) return false;

    // 팬티(1) 또는 하의(16) 착용시 불가
    if ((char.cflags?.[40] || 0) & 17) return false;

    // 검은 스타킹 착용시 불가
    if ((char.cflags?.[170] || 0) === 6 && (char.cflags?.[173] || 0) === 0) return false;

    // 기저귀 착용시 불가
    if ((char.cflags?.[42] || 0) === 69 && ((char.cflags?.[40] || 0) & 64)) return false;

    // 즈코 인형 착용시 불가
    if ((char.cflags?.[42] || 0) === 11 && ((char.cflags?.[40] || 0) & 64)) return false;

    // 주인 플레이는 자동 성공
    if ((ctx.assiPlay || 0) === 0) return true;

    // 조수 플레이의 경우
    const lubrication = ctx.params?.[3] || 0;
    // TODO: PALAMLV:2 계산
    const lubLevel = 1000000; // 임시

    if (lubrication < lubLevel) {
      // 조수가 새드면 OK (TALENT:ASSI:83)
      if (ctx.assiTalents?.[83]) return true;

      // 조수가 従順4 이상 AND 레즈끼4 이상이면 OK
      const assiSubmission = ctx.assiAbilities?.[10] || 0;
      const assiLesbian = ctx.assiAbilities?.[22] || 0;

      if (assiSubmission >= 4 && assiLesbian >= 4) return true;

      return false;
    }

    return true;
  },

  // ============================================================================
  // COM3: 자위
  // @COM_ABLE3 (Lines 90-134)
  // ============================================================================
  3: (ctx, char) => {
    // 실신중 불가 (TFLAG:899 > 0)
    if ((char.tflags?.[899] || 0) > 0) return false;

    // 조수 플레이 시 조건 체크
    if (ctx.assiPlay) {
      const assiSubmission = ctx.assiAbilities?.[10] || 0;
      const assiLesbian = ctx.assiAbilities?.[22] || 0;
      const assiDevil = ctx.assiTalents?.[87] || 0;

      // 従順3 이하 OR 레즈끼3 이하의 조수는 자위 불가 (소악마 제외)
      if ((assiSubmission <= 3 || assiLesbian <= 3) && !assiDevil) {
        return false;
      }
    }

    // 자위 안함 소질 보유 시 불가 (TALENT:150)
    if (char.talents?.[150]) return false;

    // 밧줄 사용중 불가 (TEQUIP:44)
    if (char.equipment?.[44]) return false;

    // 촉수 지도중 불가 (TEQUIP:90)
    if (char.equipment?.[90]) return false;

    // 슬라임 지도중 불가 (TEQUIP:150)
    if (char.equipment?.[150]) return false;

    // 삼각목마 기승 중 불가 (TEQUIP:70)
    if (char.equipment?.[70]) return false;

    // 수간 플레이중 불가 (TEQUIP:89)
    if (char.equipment?.[89]) return false;

    // 안면기승 플레이중 불가 (TEQUIP:55)
    if (char.equipment?.[55]) return false;

    // 팬티(1) 또는 하의(16) 착용시 불가
    if ((char.cflags?.[40] || 0) & 17) return false;

    // 검은 스타킹 착용시 불가
    if ((char.cflags?.[170] || 0) === 6 && (char.cflags?.[173] || 0) === 0) return false;

    // 기저귀 착용시 불가
    if ((char.cflags?.[42] || 0) === 69 && ((char.cflags?.[40] || 0) & 64)) return false;

    // 즈코 인형 착용시 불가
    if ((char.cflags?.[42] || 0) === 11 && ((char.cflags?.[40] || 0) & 64)) return false;

    return true;
  },

  // ============================================================================
  // COM4: 펠라
  // @COM_ABLE4 (Lines 139-177)
  // ============================================================================
  4: (ctx, char) => {
    // 조수 플레이 시: 성기가 더러우면서 악취민감+従順3 이하인 경우 불가
    if (ctx.assiPlay) {
      const stain2 = ctx.stain?.[2] || 0;
      const stain0 = ctx.stain?.[0] || 0;

      if ((stain2 & 1) || (stain2 & 4) || (stain2 & 8) || (stain0 & 32)) {
        const assiSubmission = ctx.assiAbilities?.[10] || 0;
        const assiSmellSensitive = ctx.assiTalents?.[62] || 0;
        const assiIgnoreDirt = ctx.assiTalents?.[64] || 0;

        if (assiSubmission <= 3 && assiSmellSensitive && !assiIgnoreDirt) {
          return false;
        }
      }
    }

    // 대상이 남성 또는 후타나리가 아니면 불가
    const isFutanari = char.talents?.[121] || 0;
    const isMale = char.talents?.[122] || 0;
    if (!isFutanari && !isMale) return false;

    // 촉수 지도중 불가
    if (char.equipment?.[90]) return false;

    // 슬라임 지도중 불가
    if (char.equipment?.[150]) return false;

    // 수간 플레이중 불가
    if (char.equipment?.[89]) return false;

    // 삼각목마 기승 중 불가
    if (char.equipment?.[70]) return false;

    // 안면기승 플레이중 불가
    if (char.equipment?.[55]) return false;

    // 팬티(1) 또는 하의(16) 착용시 불가
    if (((char.cflags?.[40] || 0) & 1) || ((char.cflags?.[40] || 0) & 16)) return false;

    // 검은 스타킹 착용시 불가
    if ((char.cflags?.[170] || 0) === 6 && (char.cflags?.[173] || 0) === 0) return false;

    // 기저귀 착용시 불가
    if ((char.cflags?.[42] || 0) === 69 && ((char.cflags?.[40] || 0) & 64)) return false;

    // 즈코 인형 착용시 불가
    if ((char.cflags?.[42] || 0) === 11 && ((char.cflags?.[40] || 0) & 64)) return false;

    return true;
  },

  // ============================================================================
  // COM5: 가슴애무
  // @COM_ABLE5 (Lines 182-201)
  // ============================================================================
  5: (ctx, char) => {
    // 남성이면 불가 (TALENT:122)
    if (char.talents?.[122]) return false;

    // 즈코 인형 착용시 불가
    if ((char.cflags?.[42] || 0) === 11 && ((char.cflags?.[40] || 0) & 64)) return false;

    // FLAG:37 (착의 시스템) ON인 경우
    if (ctx.flags?.[37]) {
      // 상의가 벗겨지거나, 상반신이 드러난 경우가 아니면 안됨
      if (!(((char.cflags?.[40] || 0) & 128) || !((char.cflags?.[40] || 0) & 4))) {
        return false;
      }
      // 브라를 장착하고 있으면 안됨
      if ((char.cflags?.[40] || 0) & 2) return false;
    }

    return true;
  },

  // ============================================================================
  // COM6: 키스
  // @COM_ABLE6 (Lines 206-229)
  // ============================================================================
  6: (ctx, char) => {
    // 조수 플레이 시: 입이 더러우면서 악취민감+従順3 이하인 경우 불가
    if (ctx.assiPlay) {
      const stain0 = ctx.stain?.[0] || 0;

      if ((stain0 & 1) || (stain0 & 4) || (stain0 & 8) || (stain0 & 32)) {
        const assiSubmission = ctx.assiAbilities?.[10] || 0;
        const assiSmellSensitive = ctx.assiTalents?.[62] || 0;
        const assiIgnoreDirt = ctx.assiTalents?.[64] || 0;

        if (assiSubmission <= 3 && assiSmellSensitive && !assiIgnoreDirt) {
          return false;
        }
      }
    }

    // 봉사 안함 소질 보유 시 불가 (TALENT:151)
    if (char.talents?.[151]) return false;

    // 볼개그 사용중 불가 (TEQUIP:45)
    if (char.equipment?.[45]) return false;

    // 촉수 지도중 불가 (TEQUIP:90)
    if (char.equipment?.[90]) return false;

    // 슬라임 지도중 불가 (TEQUIP:150)
    if (char.equipment?.[150]) return false;

    // 안면기승 플레이중 불가 (TEQUIP:55)
    if (char.equipment?.[55]) return false;

    return true;
  },

  // ============================================================================
  // COM7: 조개벌리기
  // @COM_ABLE7 (Lines 234-279)
  // ============================================================================
  7: (ctx, char) => {
    // 실신중 불가 (TFLAG:899)
    if ((char.tflags?.[899] || 0) > 0) return false;

    // 남성이면 불가 (TALENT:122)
    if (char.talents?.[122]) return false;

    // 従順2 미만이면 불가 (ABL:10 < 2)
    if ((ctx.abilities?.[10] || 0) < 2) return false;

    // 처녀이면서 従順3 미만이고 노출벽3 미만이면 불가
    if (char.talents?.[0] && (ctx.abilities?.[10] || 0) < 3 && (ctx.abilities?.[17] || 0) < 3) {
      return false;
    }

    // 바이브 사용중 불가 (TEQUIP:11)
    if (char.equipment?.[11]) return false;

    // 밧줄 사용중 불가 (TEQUIP:44)
    if (char.equipment?.[44]) return false;

    // 촉수 지도중 불가
    if (char.equipment?.[90]) return false;

    // 슬라임 지도중 불가
    if (char.equipment?.[150]) return false;

    // 삼각목마 기승 중 불가
    if (char.equipment?.[70]) return false;

    // 안면기승 플레이중 불가
    if (char.equipment?.[55]) return false;

    // 팬티(1) 또는 하의(16) 착용시 불가
    if ((char.cflags?.[40] || 0) & 17) return false;

    // 검은 스타킹 착용시 불가
    if ((char.cflags?.[170] || 0) === 6 && (char.cflags?.[173] || 0) === 0) return false;

    // 기저귀 착용시 불가
    if ((char.cflags?.[42] || 0) === 69 && ((char.cflags?.[40] || 0) & 64)) return false;

    // 즈코 인형 착용시 불가
    if ((char.cflags?.[42] || 0) === 11 && ((char.cflags?.[40] || 0) & 64)) return false;

    return true;
  },

  // ============================================================================
  // COM8: 손가락삽입
  // @COM_ABLE8 (Lines 284-322)
  // ============================================================================
  8: (ctx, char) => {
    // 남성이면 불가 (TALENT:122)
    if (char.talents?.[122]) return false;

    // 윤활 부족 조건
    if (ctx.assiPlay) {
      const lubrication = ctx.params?.[3] || 0;
      const lubLevel = 1000000; // TODO: PALAMLV:2

      if (lubrication < lubLevel) {
        const assiSubmission = ctx.assiAbilities?.[10] || 0;
        const assiLesbian = ctx.assiAbilities?.[22] || 0;
        const assiSadist = ctx.assiTalents?.[83] || 0;

        if ((assiSubmission <= 3 || assiLesbian <= 3) && !assiSadist) {
          return false;
        }
      }
    }

    // 촉수 지도중 불가
    if (char.equipment?.[90]) return false;

    // 슬라임 지도중 불가
    if (char.equipment?.[150]) return false;

    // 삼각목마 기승 중 불가
    if (char.equipment?.[70]) return false;

    // 수간 플레이중 불가
    if (char.equipment?.[89]) return false;

    // 팬티(1) 또는 하의(16) 착용시 불가
    if ((char.cflags?.[40] || 0) & 17) return false;

    // 검은 스타킹 착용시 불가
    if ((char.cflags?.[170] || 0) === 6 && (char.cflags?.[173] || 0) === 0) return false;

    // 기저귀 착용시 불가
    if ((char.cflags?.[42] || 0) === 69 && ((char.cflags?.[40] || 0) & 64)) return false;

    // 정조대 착용시 불가
    if ((char.cflags?.[42] || 0) === 79 && ((char.cflags?.[40] || 0) & 64)) return false;

    // 즈코 인형 착용시 불가
    if ((char.cflags?.[42] || 0) === 11 && ((char.cflags?.[40] || 0) & 64)) return false;

    return true;
  },

  // TODO: COM9-92 나머지 조건 추가
};

/**
 * 커맨드 가용성 체크 헬퍼 함수
 */
export function isCommandAvailable(
  commandId: number,
  ctx: TrainingContext,
  char: Character
): boolean {
  const checker = COMMAND_AVAILABLE[commandId];

  if (!checker) {
    // 조건이 정의되지 않은 커맨드는 기본적으로 사용 불가
    console.warn(`Command ${commandId} availability not defined`);
    return false;
  }

  return checker(ctx, char);
}
