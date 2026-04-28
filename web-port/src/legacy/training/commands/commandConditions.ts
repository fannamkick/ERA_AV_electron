/**
 * commandConditions.ts
 *
 * COMABLE.ERB의 모든 커맨드 가용성 조건을 TypeScript로 포팅
 * 각 @COM_ABLE0-154 함수의 조건을 선언적으로 정의
 */

import { TrainingContext, Character } from '../runtime/types';

/**
 * 커맨드 가용성 조건 체크 함수 타입
 */
export type ConditionChecker = (ctx: TrainingContext, char: Character) => boolean;

/**
 * 커맨드 조건 정의
 */
export interface CommandCondition {
  // 장비 제한 (TEQUIP)
  forbiddenEquipment?: number[];

  // 필수 소질 (TALENT)
  requiredTalents?: number[];

  // 금지 소질 (TALENT)
  forbiddenTalents?: number[];

  // 의상 플래그 체크 (CFLAG)
  clothingChecks?: Array<{
    flag: number;
    value?: number;
    bitMask?: number;
    condition: 'equals' | 'notEquals' | 'bitAnd' | 'bitNotAnd';
  }>;

  // 능력치 요구사항 (ABL)
  abilityRequirements?: Array<{
    abilityId: number;
    minLevel?: number;
    maxLevel?: number;
  }>;

  // 아이템 보유 필요 (ITEM)
  requiredItems?: number[];

  // 복잡한 커스텀 조건
  customCheck?: ConditionChecker;
}

/**
 * 모든 커맨드의 조건 정의
 * Key: 커맨드 번호 (0-92)
 */
export const COMMAND_CONDITIONS: Record<number, CommandCondition> = {
  // COM0: C감각 애무
  // @COM_ABLE0: RETURN 1 (항상 사용 가능)
  0: {},

  // COM1: 커닐링구스
  // @COM_ABLE1 (Lines 11-43)
  1: {
    forbiddenTalents: [122], // 남성
    forbiddenEquipment: [90, 150, 70], // 촉수, 슬라임, 삼각목마
    clothingChecks: [
      { flag: 40, bitMask: 17, condition: 'bitNotAnd' }, // 팬티(1) or 하의(16) 착용 금지
      { flag: 170, value: 6, condition: 'equals' }, // 검은 스타킹 체크용
      { flag: 173, value: 0, condition: 'equals' }, // 검은 스타킹 조건2
      { flag: 42, value: 69, condition: 'equals' }, // 기저귀 체크
      { flag: 40, bitMask: 64, condition: 'bitNotAnd' }, // 기저귀와 함께
      { flag: 42, value: 11, condition: 'equals' }, // 즈코 인형 체크
    ],
    customCheck: (ctx, char) => {
      // 검은 스타킹 착용시 불가
      if (char.cflag[170] === 6 && char.cflag[173] === 0) {
        return false;
      }
      // 기저귀 착용시 불가
      if (char.cflag[42] === 69 && (char.cflag[40] & 64)) {
        return false;
      }
      // 즈코 인형 착용시 불가
      if (char.cflag[42] === 11 && (char.cflag[40] & 64)) {
        return false;
      }

      // ASSIPLAY 조건 (조수 플레이)
      // TODO: ASSIPLAY 구현 시 추가
      // IF (STAIN:2 & 4 || STAIN:2 & 8 || STAIN:2 & 32) && ASSIPLAY
      //   SIF ABL:ASSI:0 <= 3 && TALENT:ASSI:62 && TALENT:ASSI:64 == 0
      //     RETURN 0

      return true;
    },
  },

  // COM2: 애널애무
  // @COM_ABLE2 (Lines 48-84)
  2: {
    forbiddenEquipment: [89, 70], // 수간, 삼각목마
    customCheck: (ctx, char) => {
      // 팬티(1) 또는 하의(16) 착용시 불가
      if ((char.cflag[40] & 17) !== 0) {
        return false;
      }
      // 검은 스타킹 착용시 불가
      if (char.cflag[170] === 6 && char.cflag[173] === 0) {
        return false;
      }
      // 기저귀 착용시 불가
      if (char.cflag[42] === 69 && (char.cflag[40] & 64)) {
        return false;
      }
      // 즈코 인형 착용시 불가
      if (char.cflag[42] === 11 && (char.cflag[40] & 64)) {
        return false;
      }

      // 주인 플레이는 자동 성공
      // TODO: ASSIPLAY 구현
      // IF ASSIPLAY == 0: RETURN 1

      // 조수 플레이의 경우 윤활 부족 체크
      // TODO: ASSIPLAY 윤활 조건 구현

      return true;
    },
  },

  // COM3: 자위
  // @COM_ABLE3 (Lines 90-134)
  3: {
    forbiddenTalents: [150], // 자위 안함
    forbiddenEquipment: [44, 90, 150, 70, 89, 55], // 밧줄, 촉수, 슬라임, 삼각목마, 수간, 안면기승
    customCheck: (ctx, char) => {
      // 실신중 불가 (TFLAG:899 > 0)
      if ((ctx.flags[899] || 0) > 0) {
        return false;
      }

      // 조수 플레이 시 조건 체크
      // TODO: ASSIPLAY 구현
      // IF ASSIPLAY
      //   SIF (ABL:ASSI:10 <= 3 || ABL:ASSI:22 <= 3) && TALENT:ASSI:87 == 0
      //     RETURN 0

      // 팬티(1) 또는 하의(16) 착용시 불가
      if ((char.cflag[40] & 17) !== 0) {
        return false;
      }
      // 검은 스타킹 착용시 불가
      if (char.cflag[170] === 6 && char.cflag[173] === 0) {
        return false;
      }
      // 기저귀 착용시 불가
      if (char.cflag[42] === 69 && (char.cflag[40] & 64)) {
        return false;
      }
      // 즈코 인형 착용시 불가
      if (char.cflag[42] === 11 && (char.cflag[40] & 64)) {
        return false;
      }

      return true;
    },
  },

  // COM4: 펠라
  // @COM_ABLE4 (Lines 139-177)
  4: {
    forbiddenEquipment: [90, 150, 89, 70, 55], // 촉수, 슬라임, 수간, 삼각목마, 안면기승
    customCheck: (ctx, char) => {
      // 조수 플레이 시: 성기가 더러우면서 악취민감+従順3 이하인 경우 불가
      // TODO: ASSIPLAY 구현
      // IF (STAIN:2 & 1 || STAIN:2 & 4 || STAIN:2 & 8 || STAIN:0 & 32) && ASSIPLAY
      //   SIF ABL:ASSI:10 <= 3 && TALENT:ASSI:62 && TALENT:ASSI:64 == 0
      //     RETURN 0

      // 대상이 남성 또는 후타나리가 아니면 불가
      const isFutanari = char.talent?.[121] || false;
      const isMale = char.talent?.[122] || false;
      if (!isFutanari && !isMale) {
        return false;
      }

      // 팬티(1) 또는 하의(16) 착용시 불가
      if ((char.cflag[40] & 1) || (char.cflag[40] & 16)) {
        return false;
      }
      // 검은 스타킹 착용시 불가
      if (char.cflag[170] === 6 && char.cflag[173] === 0) {
        return false;
      }
      // 기저귀 착용시 불가
      if (char.cflag[42] === 69 && (char.cflag[40] & 64)) {
        return false;
      }
      // 즈코 인형 착용시 불가
      if (char.cflag[42] === 11 && (char.cflag[40] & 64)) {
        return false;
      }

      return true;
    },
  },

  // COM5: 가슴애무
  // @COM_ABLE5 (Lines 182-201)
  5: {
    forbiddenTalents: [122], // 남성
    customCheck: (ctx, char) => {
      // 즈코 인형 착용시 불가
      if (char.cflag[42] === 11 && (char.cflag[40] & 64)) {
        return false;
      }

      // FLAG:37 (착의 시스템) ON인 경우
      if (ctx.flags?.[37]) {
        // 상의가 벗겨지거나, 상반신이 드러난 경우가 아니면 안됨
        if (!((char.cflag[40] & 128) || !(char.cflag[40] & 4))) {
          return false;
        }
        // 브라를 장착하고 있으면 안됨
        if (char.cflag[40] & 2) {
          return false;
        }
      }

      return true;
    },
  },

  // COM6: 키스
  // @COM_ABLE6 (Lines 206-229)
  6: {
    forbiddenTalents: [151], // 봉사 안함
    forbiddenEquipment: [45, 90, 150, 55], // 볼개그, 촉수, 슬라임, 안면기승
    customCheck: (ctx, char) => {
      // 조수 플레이 시: 입이 더러우면서 악취민감+従順3 이하인 경우 불가
      // TODO: ASSIPLAY 구현
      // IF (STAIN:0 & 1 || STAIN:0 & 4 || STAIN:0 & 8 || STAIN:0 & 32) && ASSIPLAY
      //   SIF ABL:ASSI:10 <= 3 && TALENT:ASSI:62 && TALENT:ASSI:64 == 0
      //     RETURN 0

      return true;
    },
  },

  // COM7: 조개벌리기
  // @COM_ABLE7 (Lines 234-279)
  7: {
    forbiddenTalents: [122], // 남성
    forbiddenEquipment: [11, 44, 90, 150, 70, 55], // 바이브, 밧줄, 촉수, 슬라임, 삼각목마, 안면기승
    abilityRequirements: [
      { abilityId: 10, minLevel: 2 }, // 従順 2 이상
    ],
    customCheck: (ctx, char) => {
      // 실신중 불가
      if ((ctx.flags[899] || 0) > 0) {
        return false;
      }

      // 처녀이면서 従順3 미만이고 노출벽3 미만이면 불가
      const isVirgin = char.talent?.[0] || false;
      const submission = char.abilities?.[10] || 0;
      const exposure = char.abilities?.[17] || 0;
      if (isVirgin && submission < 3 && exposure < 3) {
        return false;
      }

      // 팬티(1) 또는 하의(16) 착용시 불가
      if ((char.cflag[40] & 17) !== 0) {
        return false;
      }
      // 검은 스타킹 착용시 불가
      if (char.cflag[170] === 6 && char.cflag[173] === 0) {
        return false;
      }
      // 기저귀 착용시 불가
      if (char.cflag[42] === 69 && (char.cflag[40] & 64)) {
        return false;
      }
      // 즈코 인형 착용시 불가
      if (char.cflag[42] === 11 && (char.cflag[40] & 64)) {
        return false;
      }

      return true;
    },
  },

  // COM8: 손가락삽입
  // @COM_ABLE8 (Lines 284-322)
  8: {
    forbiddenTalents: [122], // 남성
    forbiddenEquipment: [90, 150, 70, 89], // 촉수, 슬라임, 삼각목마, 수간
    customCheck: (ctx, char) => {
      // 윤활 부족 조건
      // TODO: ASSIPLAY 구현
      // IF PALAM:3 < PALAMLV:2 && ASSIPLAY
      //   SIF (ABL:ASSI:10 <= 3 || ABL:ASSI:22 <= 3) && TALENT:ASSI:83 == 0
      //     RETURN 0

      // 팬티(1) 또는 하의(16) 착용시 불가
      if ((char.cflag[40] & 17) !== 0) {
        return false;
      }
      // 검은 스타킹 착용시 불가
      if (char.cflag[170] === 6 && char.cflag[173] === 0) {
        return false;
      }
      // 기저귀 착용시 불가
      if (char.cflag[42] === 69 && (char.cflag[40] & 64)) {
        return false;
      }
      // 정조대 착용시 불가
      if (char.cflag[42] === 79 && (char.cflag[40] & 64)) {
        return false;
      }
      // 즈코 인형 착용시 불가
      if (char.cflag[42] === 11 && (char.cflag[40] & 64)) {
        return false;
      }

      return true;
    },
  },

  // COM9: 애널핥기
  // @COM_ABLE9는 COMABLE.ERB에서 계속...
  // TODO: 나머지 커맨드 추가 (COM9-COM92)
};

/**
 * 커맨드 가용성 체크 헬퍼 함수
 */
export function checkCommandAvailable(
  commandId: number,
  ctx: TrainingContext,
  char: Character
): boolean {
  const condition = COMMAND_CONDITIONS[commandId];

  if (!condition) {
    // 조건이 정의되지 않은 경우 항상 사용 가능
    return true;
  }

  // 금지된 장비 체크
  if (condition.forbiddenEquipment) {
    for (const equipId of condition.forbiddenEquipment) {
      if (char.equipment?.[equipId]) {
        return false;
      }
    }
  }

  // 필수 소질 체크
  if (condition.requiredTalents) {
    for (const talentId of condition.requiredTalents) {
      if (!char.talent?.[talentId]) {
        return false;
      }
    }
  }

  // 금지된 소질 체크
  if (condition.forbiddenTalents) {
    for (const talentId of condition.forbiddenTalents) {
      if (char.talent?.[talentId]) {
        return false;
      }
    }
  }

  // 능력치 요구사항 체크
  if (condition.abilityRequirements) {
    for (const req of condition.abilityRequirements) {
      const abilityLevel = char.abilities?.[req.abilityId] || 0;
      if (req.minLevel !== undefined && abilityLevel < req.minLevel) {
        return false;
      }
      if (req.maxLevel !== undefined && abilityLevel > req.maxLevel) {
        return false;
      }
    }
  }

  // 아이템 보유 체크
  if (condition.requiredItems) {
    for (const itemId of condition.requiredItems) {
      if (!ctx.items || ctx.items[itemId] === undefined || ctx.items[itemId] <= 0) {
        return false;
      }
    }
  }

  // 커스텀 조건 체크
  if (condition.customCheck) {
    if (!condition.customCheck(ctx, char)) {
      return false;
    }
  }

  return true;
}
