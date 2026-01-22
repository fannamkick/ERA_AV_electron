/**
 * COMABLE - 커맨드 가용성 판정 시스템
 *
 * 원본: ERB/指導関係/COMABLE.ERB
 * 각 커맨드의 실행 가능 여부를 판정합니다.
 *
 * 참고: COMMAND_DEPENDENCIES.md
 */

import type { TrainingContext } from '../types';

// ============================================================================
// 공통 조건 체크 함수
// ============================================================================

/**
 * 의류 상태 체크 (CFLAG:40 비트 플래그)
 *
 * 비트 의미:
 * - 1: 팬티
 * - 2: 브라
 * - 4: 상의
 * - 16: 하의
 * - 64: 특수장비
 * - 128: 상의노출
 * - 256: 하의노출
 */
export const clothingCheck = {
  /** 상의 착용 여부 (비트 4) */
  hasTop: (context: TrainingContext): boolean => {
    return (context.charFlags[40] & 4) !== 0;
  },

  /** 브래지어 착용 여부 (비트 2) */
  hasBra: (context: TrainingContext): boolean => {
    return (context.charFlags[40] & 2) !== 0;
  },

  /** 하의 착용 여부 (비트 16) */
  hasBottom: (context: TrainingContext): boolean => {
    return (context.charFlags[40] & 16) !== 0;
  },

  /** 팬티 착용 여부 (비트 1) */
  hasPanties: (context: TrainingContext): boolean => {
    return (context.charFlags[40] & 1) !== 0;
  },

  /** 상반신 노출 (상의와 브라 모두 벗음) */
  topNaked: (context: TrainingContext): boolean => {
    return !clothingCheck.hasTop(context) && !clothingCheck.hasBra(context);
  },

  /** 하반신 노출 (하의와 팬티 모두 벗음) */
  bottomNaked: (context: TrainingContext): boolean => {
    return !clothingCheck.hasBottom(context) && !clothingCheck.hasPanties(context);
  },

  /** 완전 나체 */
  fullyNaked: (context: TrainingContext): boolean => {
    return clothingCheck.topNaked(context) && clothingCheck.bottomNaked(context);
  },

  /** 하의 계열 착용 (팬티 OR 하의) */
  hasLowerClothing: (context: TrainingContext): boolean => {
    return (context.charFlags[40] & 17) !== 0; // 비트 1 OR 비트 16
  },

  /** 정조대 착용 (CFLAG:42 == 79) */
  hasChastityBelt: (context: TrainingContext): boolean => {
    return context.charFlags[42] === 79 && (context.charFlags[40] & 64) !== 0;
  },

  /** 쭈코인형 착용 (CFLAG:42 == 11) */
  hasZuukoDoll: (context: TrainingContext): boolean => {
    return context.charFlags[42] === 11 && (context.charFlags[40] & 64) !== 0;
  },

  /** 기저귀 착용 (CFLAG:42 == 69) */
  hasDiaper: (context: TrainingContext): boolean => {
    return context.charFlags[42] === 69 && (context.charFlags[40] & 64) !== 0;
  },

  /** 검은 스타킹 (CFLAG:170 == 6) without override */
  hasBlackStockings: (context: TrainingContext): boolean => {
    return context.charFlags[170] === 6 && context.charFlags[173] === 0;
  },
};

/**
 * 장비 상태 체크 (TEQUIP)
 */
export const equipmentCheck = {
  /** 밧줄 사용중 (TEQUIP:44) */
  hasRope: (context: TrainingContext): boolean => {
    return context.equipment[44] > 0;
  },

  /** 볼개그 사용중 (TEQUIP:45) */
  hasBallGag: (context: TrainingContext): boolean => {
    return context.equipment[45] > 0;
  },

  /** 수간 플레이중 (TEQUIP:89) */
  isBestiality: (context: TrainingContext): boolean => {
    return context.equipment[89] > 0;
  },

  /** 촉수 플레이중 (TEQUIP:90) */
  isTentacle: (context: TrainingContext): boolean => {
    return context.equipment[90] > 0;
  },

  /** 슬라임 플레이중 (TEQUIP:150) */
  isSlime: (context: TrainingContext): boolean => {
    return context.equipment[150] > 0;
  },

  /** 전극 사용중 (TEQUIP:49) */
  hasElectrode: (context: TrainingContext): boolean => {
    return context.equipment[49] > 0;
  },

  /** 안면기승 중 (TEQUIP:55) */
  isFacesitting: (context: TrainingContext): boolean => {
    return context.equipment[55] > 0;
  },

  /** 삼각목마 중 (TEQUIP:70) */
  isHogtie: (context: TrainingContext): boolean => {
    return context.equipment[70] > 0;
  },

  /** 목욕탕 중 (TEQUIP:58) */
  isBathroom: (context: TrainingContext): boolean => {
    return context.equipment[58] > 0;
  },

  /** 바이브 장착 (TEQUIP:11) */
  hasVibrator: (context: TrainingContext): boolean => {
    return context.equipment[11] > 0;
  },

  /** 애널바이브 장착 (TEQUIP:13) */
  hasAnalVibrator: (context: TrainingContext): boolean => {
    return context.equipment[13] > 0;
  },

  /** 애널비즈 장착 (TEQUIP:19) */
  hasAnalBeads: (context: TrainingContext): boolean => {
    return context.equipment[19] > 0;
  },

  /** 관장 활성 (TEQUIP:46) */
  hasEnema: (context: TrainingContext): boolean => {
    return context.equipment[46] > 0;
  },

  /** 샤워 중 (TEQUIP:18) */
  isShower: (context: TrainingContext): boolean => {
    return context.equipment[18] > 0;
  },

  /** 야외 플레이 중 (TEQUIP:54) */
  isOutdoor: (context: TrainingContext): boolean => {
    return context.equipment[54] > 0;
  },

  /** 수치 플레이 중 (TEQUIP:57) */
  isHumiliation: (context: TrainingContext): boolean => {
    return context.equipment[57] > 0;
  },

  /** 코스프레 중 (TEQUIP:59) */
  isCosplay: (context: TrainingContext): boolean => {
    return context.equipment[59] > 0;
  },

  /** 비디오 촬영 중 (TEQUIP:53) */
  isRecording: (context: TrainingContext): boolean => {
    return context.equipment[53] > 0;
  },
};

/**
 * 성별/소질 체크
 */
export const genderCheck = {
  /** 여성 (남성 소질 없음) */
  isFemale: (context: TrainingContext): boolean => {
    return !context.target.talent?.includes(121);
  },

  /** 남성 (TALENT:121) */
  isMale: (context: TrainingContext): boolean => {
    return context.target.talent?.includes(121) ?? false;
  },

  /** 후타나리 (TALENT:122) */
  isFutanari: (context: TrainingContext): boolean => {
    return context.target.talent?.includes(122) ?? false;
  },

  /** 페니스 있음 (남성 OR 후타나리) */
  hasPenis: (context: TrainingContext): boolean => {
    return genderCheck.isMale(context) || genderCheck.isFutanari(context);
  },

  /** 처녀 (EXP:0 == 0 or TALENT:0) */
  isVirgin: (context: TrainingContext): boolean => {
    return (context.experience[0] ?? 0) === 0;
  },

  /** 항문처녀 (EXP:1 == 0 or TALENT:1) */
  isAnalVirgin: (context: TrainingContext): boolean => {
    return (context.experience[1] ?? 0) === 0;
  },

  /** 트레이너가 여성 */
  trainerIsFemale: (context: TrainingContext): boolean => {
    // TODO: 트레이너 소질 체크 필요
    return true; // 임시
  },

  /** 트레이너가 페니스 있음 */
  trainerHasPenis: (context: TrainingContext): boolean => {
    // TODO: 트레이너 소질 체크 필요
    return true; // 임시
  },
};

/**
 * 능력치 체크
 */
export const abilityCheck = {
  /** 종순도 체크 */
  submission: (context: TrainingContext, minLevel: number): boolean => {
    return (context.target.abilities['종순'] || 0) >= minLevel;
  },

  /** 욕망 체크 */
  desire: (context: TrainingContext, minLevel: number): boolean => {
    return (context.target.abilities['욕망'] || 0) >= minLevel;
  },

  /** 레즈끼 체크 */
  lesbian: (context: TrainingContext, minLevel: number): boolean => {
    return (context.target.abilities['레즈끼'] || 0) >= minLevel;
  },

  /** 노출벽 체크 */
  exhibitionism: (context: TrainingContext, minLevel: number): boolean => {
    return (context.target.abilities['노출벽'] || 0) >= minLevel;
  },

  /** 기교 체크 */
  technique: (context: TrainingContext, minLevel: number): boolean => {
    return (context.target.abilities['기교'] || 0) >= minLevel;
  },

  /** 봉사정신 체크 */
  service: (context: TrainingContext, minLevel: number): boolean => {
    return (context.target.abilities['봉사정신'] || 0) >= minLevel;
  },

  /** 성교기술 체크 */
  sexTechnique: (context: TrainingContext, minLevel: number): boolean => {
    return (context.target.abilities['성교기술'] || 0) >= minLevel;
  },

  /** 가학 체크 */
  sadism: (context: TrainingContext, minLevel: number): boolean => {
    return (context.target.abilities['가학'] || 0) >= minLevel;
  },

  /** 마조 체크 */
  masochism: (context: TrainingContext, minLevel: number): boolean => {
    return (context.target.abilities['마조'] || 0) >= minLevel;
  },

  /** B감각 체크 */
  breastSensitivity: (context: TrainingContext, minLevel: number): boolean => {
    return (context.target.abilities['B감각'] || 0) >= minLevel;
  },

  /** 수간중독 체크 */
  bestialityAddiction: (context: TrainingContext, minLevel: number): boolean => {
    return (context.target.abilities['수간중독'] || 0) >= minLevel;
  },
};

/**
 * 소질(Talent) 체크
 */
export const talentCheck = {
  /** 자위 안함 (TALENT:150) */
  noMasturbation: (context: TrainingContext): boolean => {
    return context.target.talent?.includes(150) ?? false;
  },

  /** 봉사 안함 (TALENT:151) */
  noService: (context: TrainingContext): boolean => {
    return context.target.talent?.includes(151) ?? false;
  },

  /** 미숙함 (TALENT:135) */
  inexperienced: (context: TrainingContext): boolean => {
    return context.target.talent?.includes(135) ?? false;
  },

  /** 악취민감 (TALENT:62) */
  smellSensitive: (context: TrainingContext): boolean => {
    return context.target.talent?.includes(62) ?? false;
  },

  /** 악취둔감 (TALENT:61) */
  smellInsensitive: (context: TrainingContext): boolean => {
    return context.target.talent?.includes(61) ?? false;
  },

  /** 새디스트 (TALENT:83) */
  isSadist: (context: TrainingContext): boolean => {
    return context.target.talent?.includes(83) ?? false;
  },

  /** 소악마 (TALENT:87) */
  isDevilish: (context: TrainingContext): boolean => {
    return context.target.talent?.includes(87) ?? false;
  },

  /** 빈유 (TALENT:116) */
  flatChested: (context: TrainingContext): boolean => {
    return context.target.talent?.includes(116) ?? false;
  },

  /** 거유 (TALENT:110) */
  largeBusted: (context: TrainingContext): boolean => {
    return context.target.talent?.includes(110) ?? false;
  },

  /** 폭유 (TALENT:114) */
  hugeBusted: (context: TrainingContext): boolean => {
    return context.target.talent?.includes(114) ?? false;
  },

  /** 소체 (TALENT:100) */
  smallFrame: (context: TrainingContext): boolean => {
    return context.target.talent?.includes(100) ?? false;
  },

  /** 독 면역 (TALENT:56) */
  poisonImmune: (context: TrainingContext): boolean => {
    return context.target.talent?.includes(56) ?? false;
  },

  /** 방뇨애호 (TALENT:57) */
  urinationLover: (context: TrainingContext): boolean => {
    return context.target.talent?.includes(57) ?? false;
  },

  /** 동물귀 (TALENT:124) */
  animalEars: (context: TrainingContext): boolean => {
    return context.target.talent?.includes(124) ?? false;
  },

  /** 착유체질 (TALENT:130) */
  milkingBody: (context: TrainingContext): boolean => {
    return context.target.talent?.includes(130) ?? false;
  },

  /** 트레이너 비밀지식 (TALENT:PLAYER:325) */
  trainerSecretKnowledge: (context: TrainingContext): boolean => {
    // TODO: 트레이너 소질 체크
    return false;
  },
};

/**
 * 파라미터 체크
 */
export const paramCheck = {
  /** 윤활 충분 */
  hasLubrication: (context: TrainingContext, minValue: number = 100): boolean => {
    return context.parameters.윤활 >= minValue;
  },

  /** 욕정 충분 */
  hasDesire: (context: TrainingContext, minValue: number = 100): boolean => {
    return context.parameters.욕정 >= minValue;
  },

  /** 실신중 (TFLAG:899) */
  isFainted: (context: TrainingContext): boolean => {
    return (context.flags[899] ?? 0) > 0;
  },
};

/**
 * 조수 관련 체크
 */
export const assistantCheck = {
  /** 조수가 있음 */
  hasAssistant: (context: TrainingContext): boolean => {
    return context.assistant !== undefined;
  },

  /** 조수가 새디스트 */
  isSadist: (context: TrainingContext): boolean => {
    if (!context.assistant) return false;
    return context.assistant.talent?.includes(83) ?? false;
  },

  /** 조수가 소악마 */
  isDevilish: (context: TrainingContext): boolean => {
    if (!context.assistant) return false;
    return context.assistant.talent?.includes(87) ?? false;
  },

  /** 조수 기교 체크 */
  assistantTechnique: (context: TrainingContext, minLevel: number): boolean => {
    if (!context.assistant) return false;
    return (context.assistant.abilities['기교'] || 0) >= minLevel;
  },

  /** 조수 종순 체크 */
  assistantSubmission: (context: TrainingContext, minLevel: number): boolean => {
    if (!context.assistant) return false;
    return (context.assistant.abilities['종순'] || 0) >= minLevel;
  },

  /** 조수 레즈끼 체크 */
  assistantLesbian: (context: TrainingContext, minLevel: number): boolean => {
    if (!context.assistant) return false;
    return (context.assistant.abilities['레즈끼'] || 0) >= minLevel;
  },

  /** 조수 가학 체크 */
  assistantSadism: (context: TrainingContext, minLevel: number): boolean => {
    if (!context.assistant) return false;
    return (context.assistant.abilities['가학'] || 0) >= minLevel;
  },
};

/**
 * 아이템 체크
 */
export const itemCheck = {
  /** 아이템 보유 체크 */
  hasItem: (context: TrainingContext, itemId: number): boolean => {
    // NOITEM 모드 체크 (치트)
    if (context.globalFlags[999] === 1) return true;

    return (context.items[itemId] ?? 0) > 0;
  },
};

/**
 * 경험치 체크
 */
export const experienceCheck = {
  /** 질경험 체크 */
  vaginalExp: (context: TrainingContext, minExp: number): boolean => {
    return (context.experience[0] ?? 0) >= minExp;
  },

  /** 항문경험 체크 */
  analExp: (context: TrainingContext, minExp: number): boolean => {
    return (context.experience[1] ?? 0) >= minExp;
  },

  /** 확장경험 체크 */
  expansionExp: (context: TrainingContext, minExp: number): boolean => {
    return (context.experience[53] ?? 0) >= minExp;
  },
};

// ============================================================================
// 개별 커맨드 가용성 함수 (COM_ABLE0 ~ COM_ABLE154)
// ============================================================================

/**
 * COMF0 - 애무
 * 항상 가능
 */
export const COM_ABLE0 = (context: TrainingContext): boolean => {
  return true;
};

/**
 * COMF1 - 커닐링구스
 * 조건: 여성만, 촉수/슬라임/수간 불가, 하의 벗음
 */
export const COM_ABLE1 = (context: TrainingContext): boolean => {
  if (!genderCheck.isFemale(context)) return false;
  if (equipmentCheck.isTentacle(context)) return false;
  if (equipmentCheck.isSlime(context)) return false;
  if (equipmentCheck.isBestiality(context)) return false;
  if (equipmentCheck.isHogtie(context)) return false;
  if (clothingCheck.hasLowerClothing(context)) return false;

  // 조수 플레이시 추가 조건
  if (context.isAssistantPlay && assistantCheck.hasAssistant(context)) {
    if (!assistantCheck.isSadist(context)) {
      if (!abilityCheck.submission(context, 3) && !assistantCheck.assistantLesbian(context, 3)) {
        return false;
      }
    }
  }

  return true;
};

/**
 * COMF2 - 애널애무
 * 조건: 하의 벗음
 */
export const COM_ABLE2 = (context: TrainingContext): boolean => {
  if (equipmentCheck.isBestiality(context)) return false;
  if (equipmentCheck.isHogtie(context)) return false;
  if (clothingCheck.hasLowerClothing(context)) return false;

  // 조수 플레이시 윤활 조건
  if (context.isAssistantPlay && assistantCheck.hasAssistant(context)) {
    if (!paramCheck.hasLubrication(context, 50)) {
      if (!assistantCheck.isSadist(context)) {
        if (!abilityCheck.submission(context, 3) && !assistantCheck.assistantLesbian(context, 3)) {
          return false;
        }
      }
    }
  }

  return true;
};

/**
 * COMF3 - 자위
 * 조건: 자위 안함 소질 없음, 실신중 아님, 특정 장비 미사용, 하의 벗음
 */
export const COM_ABLE3 = (context: TrainingContext): boolean => {
  if (paramCheck.isFainted(context)) return false;
  if (talentCheck.noMasturbation(context)) return false;
  if (equipmentCheck.hasRope(context)) return false;
  if (equipmentCheck.isTentacle(context)) return false;
  if (equipmentCheck.isSlime(context)) return false;
  if (equipmentCheck.isHogtie(context)) return false;
  if (equipmentCheck.isBestiality(context)) return false;
  if (equipmentCheck.isFacesitting(context)) return false;
  if (clothingCheck.hasLowerClothing(context)) return false;

  // 조수 플레이시 추가 조건
  if (context.isAssistantPlay && assistantCheck.hasAssistant(context)) {
    if (!assistantCheck.isDevilish(context)) {
      if (abilityCheck.submission(context, 3) || assistantCheck.assistantLesbian(context, 3)) {
        return false;
      }
    }
  }

  return true;
};

/**
 * COMF4 - 펠라한다
 * 조건: 볼개그 미착용
 */
export const COM_ABLE4 = (context: TrainingContext): boolean => {
  if (equipmentCheck.hasBallGag(context)) return false;
  if (equipmentCheck.isTentacle(context)) return false;
  if (equipmentCheck.isSlime(context)) return false;
  if (equipmentCheck.isBestiality(context)) return false;
  if (equipmentCheck.isHogtie(context)) return false;
  if (equipmentCheck.isFacesitting(context)) return false;

  return true;
};

/**
 * COMF5 - 가슴애무
 * 조건: 여성만, 상의+브라 벗음
 */
export const COM_ABLE5 = (context: TrainingContext): boolean => {
  if (!genderCheck.isFemale(context)) return false;
  if (clothingCheck.hasZuukoDoll(context)) return false;
  if (!clothingCheck.topNaked(context)) return false;

  return true;
};

/**
 * COMF6 - 키스
 * 조건: 봉사 안함 소질 없음, 볼개그 미착용
 */
export const COM_ABLE6 = (context: TrainingContext): boolean => {
  if (talentCheck.noService(context)) return false;
  if (equipmentCheck.hasBallGag(context)) return false;
  if (equipmentCheck.isTentacle(context)) return false;
  if (equipmentCheck.isSlime(context)) return false;
  if (equipmentCheck.isFacesitting(context)) return false;

  return true;
};

/**
 * COMF7 - 조개벌리기
 * 조건: 여성, 종순≥2, 하의 벗음
 */
export const COM_ABLE7 = (context: TrainingContext): boolean => {
  if (paramCheck.isFainted(context)) return false;
  if (!genderCheck.isFemale(context)) return false;
  if (!abilityCheck.submission(context, 2)) return false;
  if (equipmentCheck.hasVibrator(context)) return false;
  if (equipmentCheck.hasRope(context)) return false;
  if (equipmentCheck.isTentacle(context)) return false;
  if (equipmentCheck.isSlime(context)) return false;
  if (equipmentCheck.isHogtie(context)) return false;
  if (equipmentCheck.isFacesitting(context)) return false;
  if (clothingCheck.hasLowerClothing(context)) return false;

  // 처녀이면 추가 조건
  if (genderCheck.isVirgin(context)) {
    if (!abilityCheck.submission(context, 3) && !abilityCheck.exhibitionism(context, 3)) {
      return false;
    }
  }

  return true;
};

/**
 * COMF8 - 손가락삽입
 * 조건: 여성, 하의 벗음
 */
export const COM_ABLE8 = (context: TrainingContext): boolean => {
  if (!genderCheck.isFemale(context)) return false;
  if (equipmentCheck.isTentacle(context)) return false;
  if (equipmentCheck.isSlime(context)) return false;
  if (equipmentCheck.isHogtie(context)) return false;
  if (equipmentCheck.isBestiality(context)) return false;
  if (clothingCheck.hasLowerClothing(context)) return false;
  if (clothingCheck.hasChastityBelt(context)) return false;

  // 조수 플레이시 윤활 조건
  if (context.isAssistantPlay && assistantCheck.hasAssistant(context)) {
    if (!paramCheck.hasLubrication(context, 1000000)) { // PALAMLV:2
      if (!assistantCheck.isSadist(context)) {
        if (!abilityCheck.submission(context, 3) && !assistantCheck.assistantLesbian(context, 3)) {
          return false;
        }
      }
    }
  }

  return true;
};

/**
 * COMF9 - 애널핥기
 * 조건: 하의 벗음
 */
export const COM_ABLE9 = (context: TrainingContext): boolean => {
  if (equipmentCheck.isTentacle(context)) return false;
  if (equipmentCheck.isSlime(context)) return false;
  if (equipmentCheck.isHogtie(context)) return false;
  if (equipmentCheck.isFacesitting(context)) return false;
  if (equipmentCheck.hasAnalVibrator(context)) return false;
  if (equipmentCheck.hasAnalBeads(context)) return false;
  if (equipmentCheck.hasEnema(context)) return false;
  if (equipmentCheck.hasElectrode(context)) return false;
  if (clothingCheck.hasLowerClothing(context)) return false;

  return true;
};

/**
 * COMF10 - 로터
 * 조건: ITEM:0 필요
 */
export const COM_ABLE10 = (context: TrainingContext): boolean => {
  if (!itemCheck.hasItem(context, 0)) return false;
  if (equipmentCheck.isTentacle(context)) return false;
  if (equipmentCheck.isSlime(context)) return false;
  if (equipmentCheck.isHogtie(context)) return false;
  if (equipmentCheck.isBestiality(context)) return false;
  if (clothingCheck.hasLowerClothing(context)) return false;

  return true;
};

/**
 * COMF11 - 바이브
 * 조건: ITEM:1 필요, 여성, 윤활 또는 조수 조건
 */
export const COM_ABLE11 = (context: TrainingContext): boolean => {
  if (!itemCheck.hasItem(context, 1)) return false;
  if (!genderCheck.isFemale(context)) return false;

  // 이미 장착중이면 해제 가능
  if (equipmentCheck.hasVibrator(context)) return true;

  // 미숙함이면 새드 필요
  if (talentCheck.inexperienced(context)) {
    if (!assistantCheck.isSadist(context)) return false;
  }

  // 처녀이면서 능력치 낮으면 새드 필요
  if (genderCheck.isVirgin(context)) {
    if (!abilityCheck.submission(context, 4) && !abilityCheck.lesbian(context, 4)) {
      if (!assistantCheck.isSadist(context)) return false;
    }
  }

  // 윤활 부족시 새드 필요
  if (!paramCheck.hasLubrication(context, 50)) {
    if (!assistantCheck.isSadist(context)) return false;
  }

  if (equipmentCheck.isTentacle(context)) return false;
  if (equipmentCheck.isSlime(context)) return false;
  if (equipmentCheck.isHogtie(context)) return false;
  if (equipmentCheck.isBestiality(context)) return false;
  if (equipmentCheck.isFacesitting(context)) return false;
  if (clothingCheck.hasLowerClothing(context)) return false;

  return true;
};

/**
 * COMF12 - E마사지기
 * 조건: ITEM:2 필요, 하의 벗음
 */
export const COM_ABLE12 = (context: TrainingContext): boolean => {
  if (!itemCheck.hasItem(context, 2)) return false;
  if (equipmentCheck.isTentacle(context)) return false;
  if (equipmentCheck.isSlime(context)) return false;
  if (equipmentCheck.isBestiality(context)) return false;
  if (equipmentCheck.isHogtie(context)) return false;
  if (equipmentCheck.isFacesitting(context)) return false;
  if (equipmentCheck.isShower(context)) return false;
  if (clothingCheck.hasZuukoDoll(context)) return false;

  // 조수 플레이시
  if (context.isAssistantPlay && assistantCheck.hasAssistant(context)) {
    if (!assistantCheck.assistantTechnique(context, 3)) return false;
  }

  return true;
};

/**
 * COMF13 - 애널바이브
 * 조건: ITEM:3 필요, 하의 벗음, 윤활 또는 조건
 */
export const COM_ABLE13 = (context: TrainingContext): boolean => {
  if (!itemCheck.hasItem(context, 3)) return false;
  if (!clothingCheck.bottomNaked(context)) return false;

  // 이미 장착중이면 해제 가능
  if (equipmentCheck.hasAnalVibrator(context)) return true;

  // 미숙함이면 새드 필요
  if (talentCheck.inexperienced(context)) {
    if (!assistantCheck.isSadist(context)) return false;
  }

  // 항문처녀이면서 능력치 낮으면 새드 필요
  if (genderCheck.isAnalVirgin(context)) {
    if (!abilityCheck.submission(context, 4)) {
      if (!assistantCheck.isSadist(context)) return false;
    }
  }

  // 윤활 부족시 새드 필요
  if (!paramCheck.hasLubrication(context, 50)) {
    if (!assistantCheck.isSadist(context)) return false;
  }

  if (equipmentCheck.hasEnema(context)) return false;
  if (equipmentCheck.hasAnalBeads(context)) return false;
  if (equipmentCheck.hasElectrode(context)) return false;
  if (equipmentCheck.isTentacle(context)) return false;
  if (equipmentCheck.isSlime(context)) return false;
  if (equipmentCheck.isHogtie(context)) return false;
  if (equipmentCheck.isBestiality(context)) return false;
  if (equipmentCheck.isFacesitting(context)) return false;

  return true;
};

/**
 * COMF14 - 클리캡
 * 조건: ITEM:7 필요, 여성 OR 후타나리, 하의 벗음
 */
export const COM_ABLE14 = (context: TrainingContext): boolean => {
  if (!itemCheck.hasItem(context, 7)) return false;
  if (genderCheck.isMale(context) && !genderCheck.isFutanari(context)) return false;
  if (!clothingCheck.bottomNaked(context)) return false;

  // 이미 장착중이면 해제 가능
  if (context.equipment[14] > 0) return true;

  if (equipmentCheck.isTentacle(context)) return false;
  if (equipmentCheck.isSlime(context)) return false;
  if (equipmentCheck.isBestiality(context)) return false;
  if (equipmentCheck.isHogtie(context)) return false;
  if (equipmentCheck.isFacesitting(context)) return false;
  if (equipmentCheck.isShower(context)) return false;

  // 조수 플레이시
  if (context.isAssistantPlay && assistantCheck.hasAssistant(context)) {
    if (!assistantCheck.assistantTechnique(context, 3)) return false;
  }

  return true;
};

/**
 * COMF15 - 니플캡
 * 조건: ITEM:8 필요, 상의 벗음
 */
export const COM_ABLE15 = (context: TrainingContext): boolean => {
  if (!itemCheck.hasItem(context, 8)) return false;
  if (!clothingCheck.topNaked(context)) return false;

  // 이미 장착중이면 해제 가능
  if (context.equipment[15] > 0) return true;

  if (context.equipment[16] > 0) return false; // 착유기
  if (equipmentCheck.isTentacle(context)) return false;
  if (equipmentCheck.isSlime(context)) return false;
  if (equipmentCheck.isBestiality(context)) return false;
  if (equipmentCheck.isFacesitting(context)) return false;
  if (equipmentCheck.isShower(context)) return false;
  if (clothingCheck.hasZuukoDoll(context)) return false;

  // 조수 플레이시
  if (context.isAssistantPlay && assistantCheck.hasAssistant(context)) {
    if (!assistantCheck.assistantTechnique(context, 3)) return false;
  }

  return true;
};

/**
 * COMF16 - 착유기
 * 조건: ITEM:17 필요, 착유체질, B감각≥3, 여성, 상의 벗음
 */
export const COM_ABLE16 = (context: TrainingContext): boolean => {
  if (!itemCheck.hasItem(context, 17)) return false;
  if (!talentCheck.milkingBody(context)) return false;
  if (!abilityCheck.breastSensitivity(context, 3)) return false;
  if (!genderCheck.isFemale(context)) return false;
  if (!clothingCheck.topNaked(context)) return false;

  // 이미 장착중이면 해제 가능
  if (context.equipment[16] > 0) return true;

  if (context.equipment[15] > 0) return false; // 니플캡
  if (equipmentCheck.isTentacle(context)) return false;
  if (equipmentCheck.isSlime(context)) return false;
  if (equipmentCheck.isBestiality(context)) return false;
  if (equipmentCheck.isFacesitting(context)) return false;
  if (equipmentCheck.isShower(context)) return false;
  if (clothingCheck.hasZuukoDoll(context)) return false;

  // 조수 플레이시
  if (context.isAssistantPlay && assistantCheck.hasAssistant(context)) {
    if (!assistantCheck.assistantTechnique(context, 3)) return false;
  }

  return true;
};

/**
 * COMF17 - 오나홀
 * 조건: ITEM:12 필요, 남성 OR 후타나리
 */
export const COM_ABLE17 = (context: TrainingContext): boolean => {
  if (!itemCheck.hasItem(context, 12)) return false;
  if (!genderCheck.hasPenis(context)) return false;

  // 이미 장착중이면 해제 가능
  if (context.equipment[17] > 0) return true;

  if (equipmentCheck.isTentacle(context)) return false;
  if (equipmentCheck.isSlime(context)) return false;
  if (equipmentCheck.isHogtie(context)) return false;
  if (equipmentCheck.isBestiality(context)) return false;
  if (equipmentCheck.isFacesitting(context)) return false;
  if (clothingCheck.hasLowerClothing(context)) return false;

  // 조수 플레이시
  if (context.isAssistantPlay && assistantCheck.hasAssistant(context)) {
    if (!assistantCheck.assistantTechnique(context, 3)) return false;
  }

  return true;
};

/**
 * COMF18 - 샤워
 * 조건: 목욕탕 중
 */
export const COM_ABLE18 = (context: TrainingContext): boolean => {
  if (!equipmentCheck.isBathroom(context)) return false;

  // 이미 샤워중이면 종료 가능
  if (equipmentCheck.isShower(context)) return true;

  if (equipmentCheck.isHogtie(context)) return false;
  if (equipmentCheck.isBestiality(context)) return false;
  if (context.equipment[14] > 0) return false; // 클리캡
  if (context.equipment[15] > 0) return false; // 니플캡
  if (context.equipment[16] > 0) return false; // 착유기

  // 동물귀 특수 조건
  if (talentCheck.animalEars(context)) {
    if (!abilityCheck.submission(context, 4) && !assistantCheck.isSadist(context)) {
      return false;
    }
  }

  // 완전 나체 필수
  if (!clothingCheck.fullyNaked(context)) return false;

  return true;
};

/**
 * COMF19 - 애널비즈
 * 조건: ITEM:20 필요, 하의 벗음
 */
export const COM_ABLE19 = (context: TrainingContext): boolean => {
  if (!itemCheck.hasItem(context, 20)) return false;
  if (!clothingCheck.bottomNaked(context)) return false;

  // 이미 장착중이면 해제 가능
  if (equipmentCheck.hasAnalBeads(context)) return true;

  if (equipmentCheck.hasAnalVibrator(context)) return false;
  if (equipmentCheck.hasEnema(context)) return false;
  if (equipmentCheck.hasElectrode(context)) return false;
  if (equipmentCheck.isTentacle(context)) return false;
  if (equipmentCheck.isSlime(context)) return false;
  if (equipmentCheck.isHogtie(context)) return false;
  if (equipmentCheck.isBestiality(context)) return false;
  if (equipmentCheck.isFacesitting(context)) return false;

  return true;
};

/**
 * COMF20 - 정상위
 * 조건: V경험 필요, 윤활 조건
 */
export const COM_ABLE20 = (context: TrainingContext): boolean => {
  // 트레이너 페니스 체크 (TODO: 실제 구현 필요)
  // if (!genderCheck.trainerHasPenis(context) && !itemCheck.hasItem(context, 4)) return false;

  if (!genderCheck.isFemale(context)) return false;
  if (talentCheck.inexperienced(context) && !talentCheck.isSadist(context)) return false;
  if (equipmentCheck.hasVibrator(context)) return false;

  // 처녀 조건
  if (genderCheck.isVirgin(context)) {
    if (!abilityCheck.submission(context, 4) && !abilityCheck.lesbian(context, 4)) {
      if (!assistantCheck.isSadist(context)) return false;
    }
  }

  // 윤활 조건
  if (!paramCheck.hasLubrication(context, 1000000)) { // PALAMLV:2
    if (!abilityCheck.submission(context, 3) && !abilityCheck.lesbian(context, 3)) {
      if (!assistantCheck.isSadist(context)) return false;
    }
  }

  // 목욕탕시 플레이매트 필요
  if (equipmentCheck.isBathroom(context) && !itemCheck.hasItem(context, 13)) {
    return false;
  }

  if (equipmentCheck.isTentacle(context)) return false;
  if (equipmentCheck.isSlime(context)) return false;
  if (equipmentCheck.isHogtie(context)) return false;
  if (equipmentCheck.isBestiality(context)) return false;
  if (equipmentCheck.isFacesitting(context)) return false;
  if (clothingCheck.hasLowerClothing(context)) return false;
  if (clothingCheck.hasChastityBelt(context)) return false;

  return true;
};

/**
 * COMF30 - 수음
 * 조건: 봉사 안함 소질 없음, 능력치 조건
 */
export const COM_ABLE30 = (context: TrainingContext): boolean => {
  if (talentCheck.noService(context)) return false;

  // 실행 점수 계산
  let score = 0;
  score += (context.target.abilities['욕망'] || 0);
  score += (context.target.abilities['봉사정신'] || 0) * 2;
  score += Math.floor(context.parameters.욕정 / 1000);

  // 소질 보너스/페널티
  if (context.target.talent?.includes(35)) score -= 3; // 수줍음
  if (context.target.talent?.includes(63)) score += 5; // 헌신적

  if (score < 14) return false;

  if (paramCheck.isFainted(context)) return false;
  if (equipmentCheck.hasRope(context)) return false;
  if (equipmentCheck.isHogtie(context)) return false;
  if (equipmentCheck.isTentacle(context)) return false;
  if (equipmentCheck.isSlime(context)) return false;

  // 수간 플레이시
  if (equipmentCheck.isBestiality(context)) {
    if (!abilityCheck.bestialityAddiction(context, 1)) return false;
  }

  return true;
};

/**
 * COMF40 - 스팽킹
 * 항상 가능 (장비 제약만)
 */
export const COM_ABLE40 = (context: TrainingContext): boolean => {
  if (equipmentCheck.isTentacle(context)) return false;
  if (equipmentCheck.isSlime(context)) return false;
  if (equipmentCheck.isBestiality(context)) return false;
  if (equipmentCheck.isFacesitting(context)) return false;

  // 조수 플레이시
  if (context.isAssistantPlay && assistantCheck.hasAssistant(context)) {
    if (!assistantCheck.isSadist(context) && !assistantCheck.assistantSadism(context, 2)) {
      if (!abilityCheck.submission(context, 3) && !assistantCheck.assistantLesbian(context, 3)) {
        return false;
      }
    }
  }

  return true;
};

/**
 * COMF54 - 야외 플레이
 * 조건: ITEM:18 필요, 종순≥3 OR 마조≥3
 */
export const COM_ABLE54 = (context: TrainingContext): boolean => {
  // 이미 활성중이면 토글 가능
  if (equipmentCheck.isOutdoor(context)) return true;

  if (!itemCheck.hasItem(context, 18)) return false;
  if (!abilityCheck.submission(context, 3) && !abilityCheck.masochism(context, 3)) {
    return false;
  }

  if (equipmentCheck.isTentacle(context)) return false;
  if (equipmentCheck.isSlime(context)) return false;
  if (equipmentCheck.isHogtie(context)) return false;
  if (equipmentCheck.isBathroom(context)) return false;
  if (equipmentCheck.isFacesitting(context)) return false;

  return true;
};

/**
 * COMF56 - 대화한다
 * 조건: 실신중 아님, 볼개그 없음
 */
export const COM_ABLE56 = (context: TrainingContext): boolean => {
  if (paramCheck.isFainted(context)) return false;
  if (equipmentCheck.hasBallGag(context)) return false;
  if (equipmentCheck.isTentacle(context)) return false;
  if (equipmentCheck.isSlime(context)) return false;
  if (equipmentCheck.isFacesitting(context)) return false;

  return true;
};

/**
 * COMF64 - 3P
 * 조건: 조수 필요, 항문경험≥10
 */
export const COM_ABLE64 = (context: TrainingContext): boolean => {
  if (!assistantCheck.hasAssistant(context)) return false;
  if (!genderCheck.isFemale(context)) return false;
  if (talentCheck.inexperienced(context)) return false;

  // 페니스 2개 필요 (TODO: 페니스밴드 체크)
  if (!experienceCheck.analExp(context, 10)) return false;

  if (paramCheck.isFainted(context)) return false;
  if (equipmentCheck.hasVibrator(context)) return false;
  if (equipmentCheck.hasAnalVibrator(context)) return false;
  if (equipmentCheck.isTentacle(context)) return false;
  if (equipmentCheck.isSlime(context)) return false;
  if (equipmentCheck.isHogtie(context)) return false;
  if (equipmentCheck.isBestiality(context)) return false;
  if (equipmentCheck.isFacesitting(context)) return false;
  if (clothingCheck.hasLowerClothing(context)) return false;
  if (clothingCheck.hasChastityBelt(context)) return false;

  return true;
};

/**
 * COMF85 - 방뇨
 * 조건: 이뇨제 OR 방뇨애호
 */
export const COM_ABLE85 = (context: TrainingContext): boolean => {
  if (paramCheck.isFainted(context)) return false;

  // 이뇨제 활성 OR 방뇨애호 소질
  const hasDiuretic = context.equipment[22] > 0;
  if (!hasDiuretic && !talentCheck.urinationLover(context)) return false;

  // 목욕탕 OR 종순≥3
  if (!equipmentCheck.isBathroom(context) && !abilityCheck.submission(context, 3)) {
    return false;
  }

  return true;
};

/**
 * COMF89 - 수간 플레이
 * 조건: ITEM:22 필요
 */
export const COM_ABLE89 = (context: TrainingContext): boolean => {
  // 이미 활성중이면 토글 가능
  if (equipmentCheck.isBestiality(context)) return true;

  if (!itemCheck.hasItem(context, 22)) return false;
  if (equipmentCheck.isHogtie(context)) return false;
  if (equipmentCheck.isBathroom(context)) return false;
  if (equipmentCheck.isCosplay(context)) return false;
  if (equipmentCheck.isFacesitting(context)) return false;

  return true;
};

// ============================================================================
// 가용성 함수 매핑
// ============================================================================

/**
 * COMF21-29 - 삽입 커맨드 계열
 * 기본적으로 COM_ABLE20과 유사한 조건
 */
export const COM_ABLE21 = COM_ABLE20; // 후배위
export const COM_ABLE22 = COM_ABLE20; // 대면좌위
export const COM_ABLE23 = COM_ABLE20; // 배면좌위

/**
 * COMF24 - 역강간
 * 조건: 대상 남성/후타나리, 밧줄, 욕정 충분
 */
export const COM_ABLE24 = (context: TrainingContext): boolean => {
  if (!genderCheck.hasPenis(context)) return false;
  if (!equipmentCheck.hasRope(context)) return false;

  let score = 0;
  score += (context.target.abilities['욕망'] || 0);
  score += Math.floor(context.parameters.욕정 / 500);

  if (score < 9) return false;

  if (equipmentCheck.isTentacle(context)) return false;
  if (equipmentCheck.isSlime(context)) return false;
  if (equipmentCheck.isHogtie(context)) return false;
  if (equipmentCheck.isBestiality(context)) return false;

  return true;
};

export const COM_ABLE25 = COM_ABLE24; // 역강간2

/**
 * COMF26-29 - 애널 삽입 계열
 * 조건: 항문경험≥10
 */
export const COM_ABLE26 = (context: TrainingContext): boolean => {
  if (!experienceCheck.analExp(context, 10)) return false;

  // 윤활 조건
  if (!paramCheck.hasLubrication(context, 1000000)) {
    if (!abilityCheck.submission(context, 3) && !abilityCheck.lesbian(context, 3)) {
      if (!assistantCheck.isSadist(context)) return false;
    }
  }

  // 목욕탕시 플레이매트 필요
  if (equipmentCheck.isBathroom(context) && !itemCheck.hasItem(context, 13)) {
    return false;
  }

  if (equipmentCheck.hasAnalVibrator(context)) return false;
  if (equipmentCheck.hasAnalBeads(context)) return false;
  if (equipmentCheck.hasEnema(context)) return false;
  if (equipmentCheck.hasElectrode(context)) return false;
  if (equipmentCheck.isTentacle(context)) return false;
  if (equipmentCheck.isSlime(context)) return false;
  if (equipmentCheck.isHogtie(context)) return false;
  if (equipmentCheck.isBestiality(context)) return false;
  if (equipmentCheck.isFacesitting(context)) return false;
  if (clothingCheck.hasLowerClothing(context)) return false;

  return true;
};

export const COM_ABLE27 = COM_ABLE26; // 후배위애널
export const COM_ABLE28 = COM_ABLE26; // 대면좌위애널
export const COM_ABLE29 = COM_ABLE26; // 배면좌위애널

/**
 * COMF31-39 - 봉사 커맨드 계열
 * 기본적으로 COM_ABLE30과 유사한 점수 계산
 */
export const COM_ABLE31 = (context: TrainingContext): boolean => {
  if (talentCheck.noService(context)) return false;
  if (equipmentCheck.hasBallGag(context)) return false;

  let score = 0;
  score += (context.target.abilities['욕망'] || 0);
  score += (context.target.abilities['봉사정신'] || 0) * 2;
  score += Math.floor(context.parameters.욕정 / 1000);
  if (context.target.talent?.includes(35)) score -= 3;
  if (context.target.talent?.includes(63)) score += 5;

  if (score < 14) return false;

  if (paramCheck.isFainted(context)) return false;
  if (equipmentCheck.hasRope(context)) return false;
  if (equipmentCheck.isHogtie(context)) return false;
  if (equipmentCheck.isTentacle(context)) return false;
  if (equipmentCheck.isSlime(context)) return false;

  if (equipmentCheck.isBestiality(context)) {
    if (!abilityCheck.bestialityAddiction(context, 1)) return false;
  }

  return true;
};

export const COM_ABLE32 = (context: TrainingContext): boolean => {
  if (!genderCheck.isFemale(context)) return false;
  if (talentCheck.flatChested(context)) return false;
  if (!clothingCheck.topNaked(context)) return false;
  return COM_ABLE31(context);
};

export const COM_ABLE33 = (context: TrainingContext): boolean => {
  if (!genderCheck.isFemale(context)) return false;
  if (!paramCheck.hasLubrication(context, 2000)) return false;
  if (!clothingCheck.bottomNaked(context)) return false;
  if (equipmentCheck.hasVibrator(context)) return false;
  return COM_ABLE31(context);
};

export const COM_ABLE34 = (context: TrainingContext): boolean => {
  if (!genderCheck.isFemale(context)) return false;
  if (talentCheck.inexperienced(context)) return false;
  if (equipmentCheck.hasVibrator(context)) return false;
  if (!clothingCheck.bottomNaked(context)) return false;
  if (clothingCheck.hasChastityBelt(context)) return false;
  return COM_ABLE31(context);
};

export const COM_ABLE35 = (context: TrainingContext): boolean => {
  if (!equipmentCheck.isBathroom(context)) return false;
  if (!itemCheck.hasItem(context, 13)) return false;
  if (!clothingCheck.fullyNaked(context)) return false;
  return COM_ABLE31(context);
};

export const COM_ABLE36 = (context: TrainingContext): boolean => {
  if (!experienceCheck.analExp(context, 10)) return false;
  if (equipmentCheck.hasAnalVibrator(context)) return false;
  if (equipmentCheck.hasAnalBeads(context)) return false;
  if (equipmentCheck.hasEnema(context)) return false;
  if (equipmentCheck.hasElectrode(context)) return false;
  if (!clothingCheck.bottomNaked(context)) return false;
  return COM_ABLE31(context);
};

export const COM_ABLE37 = COM_ABLE31; // 애널봉사
export const COM_ABLE38 = COM_ABLE31; // 풋잡
export const COM_ABLE39 = (context: TrainingContext): boolean => {
  if (!itemCheck.hasItem(context, 12)) return false;
  return COM_ABLE31(context);
};

/**
 * COMF41-49 - SM 커맨드
 */
export const COM_ABLE41 = (context: TrainingContext): boolean => {
  if (!itemCheck.hasItem(context, 10)) return false;
  return COM_ABLE40(context);
};

export const COM_ABLE42 = (context: TrainingContext): boolean => {
  if (!itemCheck.hasItem(context, 11)) return false;
  if (equipmentCheck.isBathroom(context)) return false;
  return COM_ABLE40(context);
};

export const COM_ABLE43 = (context: TrainingContext): boolean => {
  if (!itemCheck.hasItem(context, 5)) return false;
  if (paramCheck.isFainted(context)) return false;
  if (clothingCheck.hasZuukoDoll(context)) return false;
  // 이미 장착중이면 해제 가능
  if (context.equipment[43] > 0) return true;
  return true;
};

export const COM_ABLE44 = (context: TrainingContext): boolean => {
  if (!itemCheck.hasItem(context, 14)) return false;
  // 이미 장착중이면 해제 가능 (단, 삼각목마 아닐 때)
  if (context.equipment[44] > 0 && !equipmentCheck.isHogtie(context)) return true;

  // 트레이너 기교≥3 필요
  // TODO: 트레이너 능력치 체크

  if (equipmentCheck.isTentacle(context)) return false;
  if (equipmentCheck.isSlime(context)) return false;
  if (equipmentCheck.isBestiality(context)) return false;
  if (equipmentCheck.isFacesitting(context)) return false;

  return true;
};

export const COM_ABLE45 = (context: TrainingContext): boolean => {
  if (!itemCheck.hasItem(context, 14)) return false;
  // 이미 장착중이면 해제 가능
  if (context.equipment[45] > 0) return true;

  if (context.equipment[98] > 0) return false; // 촉수 심후
  if (equipmentCheck.isSlime(context)) return false;
  if (clothingCheck.hasZuukoDoll(context)) return false;

  return true;
};

export const COM_ABLE46 = (context: TrainingContext): boolean => {
  if (!itemCheck.hasItem(context, 15)) return false;
  if (!experienceCheck.analExp(context, 25)) return false;
  if (!clothingCheck.bottomNaked(context)) return false;

  // 이미 장착중이면 해제 가능
  if (context.equipment[46] > 0) return true;

  // 능력치 합계 조건
  const abilitySum = (context.target.abilities['종순'] || 0) +
                     (context.target.abilities['욕망'] || 0) +
                     (context.target.abilities['노출벽'] || 0);
  if (abilitySum < 10) return false;

  if (equipmentCheck.hasAnalVibrator(context)) return false;
  if (equipmentCheck.hasAnalBeads(context)) return false;
  if (equipmentCheck.hasElectrode(context)) return false;
  if (equipmentCheck.isTentacle(context)) return false;
  if (equipmentCheck.isSlime(context)) return false;
  if (equipmentCheck.isHogtie(context)) return false;
  if (equipmentCheck.isBestiality(context)) return false;
  if (equipmentCheck.isFacesitting(context)) return false;

  return true;
};

export const COM_ABLE47 = (context: TrainingContext): boolean => {
  if (!itemCheck.hasItem(context, 23)) return false;
  if (!context.isAssistantPlay) return false;
  if (!assistantCheck.hasAssistant(context)) return false;

  // 이미 장착중이면 해제 가능
  if (context.equipment[47] > 0) return true;

  // 조수 가학≥2 필요
  if (!assistantCheck.assistantSadism(context, 2)) {
    // TODO: 특수 소질 체크 (TALENT:ASSI:553)
    return false;
  }

  return true;
};

export const COM_ABLE48 = (context: TrainingContext): boolean => {
  if (!genderCheck.hasPenis(context)) return false;
  if (!clothingCheck.bottomNaked(context)) return false;
  return COM_ABLE40(context);
};

export const COM_ABLE49 = (context: TrainingContext): boolean => {
  if (!itemCheck.hasItem(context, 21)) return false;
  if (!clothingCheck.bottomNaked(context)) return false;

  // 이미 장착중이면 해제 가능
  if (context.equipment[49] > 0) return true;

  if (equipmentCheck.hasAnalVibrator(context)) return false;
  if (equipmentCheck.hasAnalBeads(context)) return false;
  if (equipmentCheck.hasEnema(context)) return false;
  if (equipmentCheck.isBathroom(context)) return false;
  if (equipmentCheck.isTentacle(context)) return false;
  if (equipmentCheck.isSlime(context)) return false;
  if (equipmentCheck.isHogtie(context)) return false;
  if (equipmentCheck.isBestiality(context)) return false;
  if (equipmentCheck.isFacesitting(context)) return false;

  return true;
};

/**
 * COMF50-53 - 특수 아이템
 */
export const COM_ABLE50 = (context: TrainingContext): boolean => {
  if (!itemCheck.hasItem(context, 25)) return false;
  if (equipmentCheck.isTentacle(context)) return false;
  if (equipmentCheck.isSlime(context)) return false;
  if (equipmentCheck.isShower(context)) return false;
  return true;
};

export const COM_ABLE51 = (context: TrainingContext): boolean => {
  if (!itemCheck.hasItem(context, 26)) return false;
  if (talentCheck.poisonImmune(context)) return false;
  return true;
};

export const COM_ABLE52 = (context: TrainingContext): boolean => {
  if (!itemCheck.hasItem(context, 27)) return false;
  if (talentCheck.poisonImmune(context) && !equipmentCheck.isTentacle(context)) return false;
  if (context.equipment[22] > 0) return false; // 이미 활성중
  return true;
};

export const COM_ABLE53 = (context: TrainingContext): boolean => {
  if (!itemCheck.hasItem(context, 6)) return false;
  // 이미 촬영중이면 종료 가능
  if (equipmentCheck.isRecording(context)) return true;
  return true;
};

/**
 * COMF55 - 아무것도 안한다
 */
export const COM_ABLE55 = (context: TrainingContext): boolean => {
  return true;
};

/**
 * COMF57 - 수치 플레이
 */
export const COM_ABLE57 = (context: TrainingContext): boolean => {
  if (!itemCheck.hasItem(context, 16)) return false;
  if (!abilityCheck.submission(context, 2)) return false;

  // 이미 활성중이면 종료 가능
  if (equipmentCheck.isHumiliation(context)) return true;

  if (equipmentCheck.isOutdoor(context)) return false;
  if (equipmentCheck.isBathroom(context)) return false;
  if (equipmentCheck.isTentacle(context)) return false;
  if (equipmentCheck.isSlime(context)) return false;
  if (equipmentCheck.isHogtie(context)) return false;
  if (equipmentCheck.isBestiality(context)) return false;

  return true;
};

/**
 * COMF58 - 목욕탕 플레이
 */
export const COM_ABLE58 = (context: TrainingContext): boolean => {
  if (!abilityCheck.submission(context, 2)) return false;

  // 이미 활성중이면 종료 가능
  if (equipmentCheck.isBathroom(context)) return true;

  // 동물귀 특수 조건
  if (talentCheck.animalEars(context)) {
    if (!abilityCheck.submission(context, 3)) return false;
  }

  if (equipmentCheck.isOutdoor(context)) return false;
  if (equipmentCheck.isHumiliation(context)) return false;
  if (equipmentCheck.isTentacle(context)) return false;
  if (equipmentCheck.isSlime(context)) return false;
  if (equipmentCheck.isHogtie(context)) return false;
  if (equipmentCheck.isBestiality(context)) return false;
  if (equipmentCheck.isFacesitting(context)) return false;
  if (!clothingCheck.fullyNaked(context)) return false;

  return true;
};

/**
 * COMF59 - 코스프레
 */
export const COM_ABLE59 = (context: TrainingContext): boolean => {
  if (!itemCheck.hasItem(context, 19)) return false;
  if (context.isAssistantPlay) return false;

  // 이미 활성중이면 종료 가능 (단, 촬영중엔 불가)
  if (equipmentCheck.isCosplay(context)) {
    if (equipmentCheck.isRecording(context)) return false;
    return true;
  }

  // TODO: MARK:2 >= 2 체크 필요
  // TODO: TALENT:330 == 0 체크 필요

  if (equipmentCheck.isRecording(context)) return false;
  if (equipmentCheck.isOutdoor(context)) return false;
  if (equipmentCheck.isHumiliation(context)) return false;
  if (equipmentCheck.isBathroom(context)) return false;
  if (equipmentCheck.isTentacle(context)) return false;
  if (equipmentCheck.isSlime(context)) return false;
  if (equipmentCheck.isBestiality(context)) return false;
  if (equipmentCheck.isFacesitting(context)) return false;

  return true;
};

/**
 * COMF60 - 조수에게 키스
 * 조건: 조수 있음, 조수 플레이 모드
 */
export const COM_ABLE60 = (context: TrainingContext): boolean => {
  if (!context.isAssistantPlay) return false;
  if (!assistantCheck.hasAssistant(context)) return false;
  if (equipmentCheck.hasBallGag(context)) return false;
  if (equipmentCheck.isTentacle(context)) return false;
  if (equipmentCheck.isSlime(context)) return false;
  if (equipmentCheck.isFacesitting(context)) return false;

  // 조수 종순≥3 OR 조수 레즈끼≥3
  if (!assistantCheck.assistantSubmission(context, 3) &&
      !assistantCheck.assistantLesbian(context, 3)) {
    return false;
  }

  return true;
};

/**
 * COMF61 - 커닐강제
 * 조건: 여성 조수, 대상 여성, 조수 플레이
 */
export const COM_ABLE61 = (context: TrainingContext): boolean => {
  if (!context.isAssistantPlay) return false;
  if (!assistantCheck.hasAssistant(context)) return false;
  if (!genderCheck.isFemale(context)) return false;

  // 조수가 여성이어야 함
  if (context.assistant && context.assistant.talent?.includes(121)) return false;

  if (equipmentCheck.isTentacle(context)) return false;
  if (equipmentCheck.isSlime(context)) return false;
  if (equipmentCheck.isBestiality(context)) return false;
  if (equipmentCheck.isHogtie(context)) return false;
  if (clothingCheck.hasLowerClothing(context)) return false;

  // 조수 레즈끼≥3
  if (!assistantCheck.assistantLesbian(context, 3)) return false;

  return true;
};

/**
 * COMF62 - 조수를 범한다
 * 조건: RELATION > 100, 조수 플레이, 조수 여성
 */
export const COM_ABLE62 = (context: TrainingContext): boolean => {
  if (!context.isAssistantPlay) return false;
  if (!assistantCheck.hasAssistant(context)) return false;
  if (context.relation <= 100) return false;

  // 조수가 여성이어야 함
  if (context.assistant && context.assistant.talent?.includes(121)) return false;

  // 트레이너가 페니스 필요 (TODO: 페니스밴드 체크)
  // if (!genderCheck.trainerHasPenis(context) && !itemCheck.hasItem(context, 4)) return false;

  if (equipmentCheck.isTentacle(context)) return false;
  if (equipmentCheck.isSlime(context)) return false;
  if (equipmentCheck.isHogtie(context)) return false;
  if (equipmentCheck.isBestiality(context)) return false;
  if (equipmentCheck.isFacesitting(context)) return false;

  return true;
};

/**
 * COMF63 - 조개맞대기
 * 조건: 대상 여성, 조수 여성, 조수 플레이
 */
export const COM_ABLE63 = (context: TrainingContext): boolean => {
  if (!context.isAssistantPlay) return false;
  if (!assistantCheck.hasAssistant(context)) return false;
  if (!genderCheck.isFemale(context)) return false;

  // 조수가 여성이어야 함
  if (context.assistant && context.assistant.talent?.includes(121)) return false;

  if (equipmentCheck.hasVibrator(context)) return false;
  if (equipmentCheck.isTentacle(context)) return false;
  if (equipmentCheck.isSlime(context)) return false;
  if (equipmentCheck.isHogtie(context)) return false;
  if (equipmentCheck.isBestiality(context)) return false;
  if (equipmentCheck.isFacesitting(context)) return false;
  if (clothingCheck.hasLowerClothing(context)) return false;
  if (clothingCheck.hasChastityBelt(context)) return false;

  // 조수 레즈끼≥3
  if (!assistantCheck.assistantLesbian(context, 3)) return false;

  return true;
};

/**
 * COMF65 - 조수를 범하게 한다
 * 조건: 조수 있음, 조수가 페니스 필요
 */
export const COM_ABLE65 = (context: TrainingContext): boolean => {
  if (!assistantCheck.hasAssistant(context)) return false;
  if (!genderCheck.isFemale(context)) return false;

  // 조수가 페니스 있어야 함
  if (context.assistant) {
    const assistantHasPenis = context.assistant.talent?.includes(121) ||
                             context.assistant.talent?.includes(122);
    if (!assistantHasPenis) return false;
  }

  if (talentCheck.inexperienced(context)) return false;

  // 처녀 조건
  if (genderCheck.isVirgin(context)) {
    if (!abilityCheck.submission(context, 4) && !abilityCheck.lesbian(context, 4)) {
      if (!assistantCheck.isSadist(context)) return false;
    }
  }

  // 윤활 조건
  if (!paramCheck.hasLubrication(context, 1000000)) {
    if (!abilityCheck.submission(context, 3) && !abilityCheck.lesbian(context, 3)) {
      if (!assistantCheck.isSadist(context)) return false;
    }
  }

  if (equipmentCheck.hasVibrator(context)) return false;
  if (equipmentCheck.isTentacle(context)) return false;
  if (equipmentCheck.isSlime(context)) return false;
  if (equipmentCheck.isHogtie(context)) return false;
  if (equipmentCheck.isBestiality(context)) return false;
  if (equipmentCheck.isFacesitting(context)) return false;
  if (clothingCheck.hasLowerClothing(context)) return false;
  if (clothingCheck.hasChastityBelt(context)) return false;

  return true;
};

/**
 * COMF66 - 두개펠라
 * 조건: 조수 있음, 페니스 2개 필요
 */
export const COM_ABLE66 = (context: TrainingContext): boolean => {
  if (!assistantCheck.hasAssistant(context)) return false;
  if (talentCheck.noService(context)) return false;

  // TODO: 페니스 2개 조건 체크

  let score = 0;
  score += (context.target.abilities['욕망'] || 0);
  score += (context.target.abilities['봉사정신'] || 0) * 2;
  score += Math.floor(context.parameters.욕정 / 1000);
  if (context.target.talent?.includes(35)) score -= 3;
  if (context.target.talent?.includes(63)) score += 5;

  if (score < 14) return false;

  if (paramCheck.isFainted(context)) return false;
  if (equipmentCheck.hasRope(context)) return false;
  if (equipmentCheck.hasBallGag(context)) return false;
  if (equipmentCheck.isHogtie(context)) return false;
  if (equipmentCheck.isTentacle(context)) return false;
  if (equipmentCheck.isSlime(context)) return false;

  if (equipmentCheck.isBestiality(context)) {
    if (!abilityCheck.bestialityAddiction(context, 1)) return false;
  }

  return true;
};

/**
 * COMF67 - 더블펠라
 * 조건: 조수 있음
 */
export const COM_ABLE67 = (context: TrainingContext): boolean => {
  if (!assistantCheck.hasAssistant(context)) return false;
  if (talentCheck.noService(context)) return false;
  if (context.isAssistantPlay) return false;

  // 조수도 봉사안함이면 불가
  if (context.assistant && context.assistant.talent?.includes(151)) return false;

  let score = 0;
  score += (context.target.abilities['욕망'] || 0);
  score += (context.target.abilities['봉사정신'] || 0) * 2;
  score += Math.floor(context.parameters.욕정 / 1000);
  if (context.target.talent?.includes(35)) score -= 3;
  if (context.target.talent?.includes(63)) score += 5;

  if (score < 14) return false;

  // 조수 능력치 체크
  let assistantScore = 0;
  if (context.assistant) {
    assistantScore += (context.assistant.abilities['욕망'] || 0);
    assistantScore += (context.assistant.abilities['봉사정신'] || 0) * 2;
    if (context.assistant.talent?.includes(35)) assistantScore -= 3;
    if (context.assistant.talent?.includes(63)) assistantScore += 5;
  }
  if (assistantScore < 10) return false;

  if (paramCheck.isFainted(context)) return false;
  if (equipmentCheck.hasRope(context)) return false;
  if (equipmentCheck.hasBallGag(context)) return false;
  if (equipmentCheck.isHogtie(context)) return false;
  if (equipmentCheck.isTentacle(context)) return false;
  if (equipmentCheck.isSlime(context)) return false;

  return true;
};

/**
 * COMF68 - 식스나인
 * 조건: 조수 있음, 트레이너 여성, 조수 여성, 대상 여성
 */
export const COM_ABLE68 = (context: TrainingContext): boolean => {
  if (!assistantCheck.hasAssistant(context)) return false;
  if (!genderCheck.isFemale(context)) return false;

  // 조수가 여성이어야 함
  if (context.assistant && context.assistant.talent?.includes(121)) return false;

  // 트레이너도 여성이어야 함
  // TODO: 트레이너 성별 체크

  if (equipmentCheck.isTentacle(context)) return false;
  if (equipmentCheck.isSlime(context)) return false;
  if (equipmentCheck.isHogtie(context)) return false;
  if (equipmentCheck.isBestiality(context)) return false;
  if (clothingCheck.hasLowerClothing(context)) return false;

  // 조수 레즈끼≥2
  if (!assistantCheck.assistantLesbian(context, 2)) return false;

  return true;
};

/**
 * COMF69 - 더블스마타
 * 조건: 조수 있음, 대상 여성, 조수 여성
 */
export const COM_ABLE69 = (context: TrainingContext): boolean => {
  if (!assistantCheck.hasAssistant(context)) return false;
  if (!genderCheck.isFemale(context)) return false;
  if (talentCheck.noService(context)) return false;

  // 조수가 여성이어야 함
  if (context.assistant && context.assistant.talent?.includes(121)) return false;

  // 조수도 봉사안함이면 불가
  if (context.assistant && context.assistant.talent?.includes(151)) return false;

  let score = 0;
  score += (context.target.abilities['욕망'] || 0);
  score += (context.target.abilities['봉사정신'] || 0) * 2;
  score += Math.floor(context.parameters.욕정 / 1000);
  if (context.target.talent?.includes(35)) score -= 3;
  if (context.target.talent?.includes(63)) score += 5;

  if (score < 14) return false;

  // 조수 능력치 체크
  let assistantScore = 0;
  if (context.assistant) {
    assistantScore += (context.assistant.abilities['욕망'] || 0);
    assistantScore += (context.assistant.abilities['봉사정신'] || 0) * 2;
    if (context.assistant.talent?.includes(35)) assistantScore -= 3;
    if (context.assistant.talent?.includes(63)) assistantScore += 5;
  }
  if (assistantScore < 10) return false;

  if (!paramCheck.hasLubrication(context, 2000)) return false;
  if (!clothingCheck.bottomNaked(context)) return false;
  if (equipmentCheck.hasVibrator(context)) return false;
  if (paramCheck.isFainted(context)) return false;
  if (equipmentCheck.hasRope(context)) return false;
  if (equipmentCheck.isHogtie(context)) return false;
  if (equipmentCheck.isTentacle(context)) return false;
  if (equipmentCheck.isSlime(context)) return false;

  return true;
};

/**
 * COMF70 - 더블파이즈리
 * 조건: 조수 있음, 대상 거유/폭유, 조수 거유/폭유
 */
export const COM_ABLE70 = (context: TrainingContext): boolean => {
  if (!assistantCheck.hasAssistant(context)) return false;
  if (!genderCheck.isFemale(context)) return false;
  if (talentCheck.noService(context)) return false;
  if (talentCheck.flatChested(context)) return false;

  // 대상이 거유 OR 폭유
  if (!talentCheck.largeBusted(context) && !talentCheck.hugeBusted(context)) return false;

  // 조수가 빈유면 불가
  if (context.assistant && context.assistant.talent?.includes(116)) return false;

  // 조수도 거유 OR 폭유
  const assistantLargeBusted = context.assistant?.talent?.includes(110) ?? false;
  const assistantHugeBusted = context.assistant?.talent?.includes(114) ?? false;
  if (!assistantLargeBusted && !assistantHugeBusted) return false;

  // 조수도 봉사안함이면 불가
  if (context.assistant && context.assistant.talent?.includes(151)) return false;

  let score = 0;
  score += (context.target.abilities['욕망'] || 0);
  score += (context.target.abilities['봉사정신'] || 0) * 2;
  score += Math.floor(context.parameters.욕정 / 1000);
  if (context.target.talent?.includes(35)) score -= 3;
  if (context.target.talent?.includes(63)) score += 5;

  if (score < 14) return false;

  // 조수 능력치 체크
  let assistantScore = 0;
  if (context.assistant) {
    assistantScore += (context.assistant.abilities['욕망'] || 0);
    assistantScore += (context.assistant.abilities['봉사정신'] || 0) * 2;
    if (context.assistant.talent?.includes(35)) assistantScore -= 3;
    if (context.assistant.talent?.includes(63)) assistantScore += 5;
  }
  if (assistantScore < 10) return false;

  if (!clothingCheck.topNaked(context)) return false;
  if (paramCheck.isFainted(context)) return false;
  if (equipmentCheck.hasRope(context)) return false;
  if (equipmentCheck.isHogtie(context)) return false;
  if (equipmentCheck.isTentacle(context)) return false;
  if (equipmentCheck.isSlime(context)) return false;

  return true;
};

/**
 * COMF71 - 조수 안면기승
 * 조건: 조수 있음, 조수 여성, 대상 여성
 */
export const COM_ABLE71 = (context: TrainingContext): boolean => {
  if (!assistantCheck.hasAssistant(context)) return false;
  if (!genderCheck.isFemale(context)) return false;

  // 조수가 여성이어야 함
  if (context.assistant && context.assistant.talent?.includes(121)) return false;

  // 이미 활성중이면 해제 가능
  if (equipmentCheck.isFacesitting(context)) return true;

  // 조수 레즈끼≥3 OR 조수 새디스트
  if (!assistantCheck.assistantLesbian(context, 3) && !assistantCheck.isSadist(context)) {
    return false;
  }

  if (equipmentCheck.isHogtie(context)) return false;
  if (equipmentCheck.isTentacle(context)) return false;
  if (equipmentCheck.isSlime(context)) return false;
  if (equipmentCheck.isBestiality(context)) return false;

  return true;
};

/**
 * COMF70 - 삼각목마 (COMF70은 더블파이즈리로 이미 사용)
 * 실제 COMF72로 추정
 */
export const COM_ABLE72 = (context: TrainingContext): boolean => {
  if (!itemCheck.hasItem(context, 24)) return false;

  // 이미 활성중이면 해제 가능
  if (equipmentCheck.isHogtie(context)) return true;

  // 밧줄 필요
  if (!equipmentCheck.hasRope(context)) return false;

  // 소체 조건
  if (!talentCheck.smallFrame(context)) {
    // TODO: 체중 체크 필요 (TALENT:TARGET:19 < 40)
  }

  if (equipmentCheck.hasVibrator(context)) return false;
  if (equipmentCheck.isTentacle(context)) return false;
  if (equipmentCheck.isSlime(context)) return false;
  if (equipmentCheck.isBestiality(context)) return false;
  if (equipmentCheck.isFacesitting(context)) return false;
  if (!clothingCheck.bottomNaked(context)) return false;

  return true;
};

/**
 * COMF80 - 이라마치오
 * 조건: 기교≥3, 볼개그 없음
 */
export const COM_ABLE80 = (context: TrainingContext): boolean => {
  // 트레이너 기교≥3 필요
  // TODO: 트레이너 능력치 체크

  if (equipmentCheck.hasBallGag(context)) return false;
  if (equipmentCheck.isTentacle(context)) return false;
  if (equipmentCheck.isSlime(context)) return false;
  if (equipmentCheck.isHogtie(context)) return false;
  if (equipmentCheck.isBestiality(context)) return false;
  if (equipmentCheck.isFacesitting(context)) return false;

  return true;
};

/**
 * COMF81 - 피스트펄링
 * 조건: 확장경험≥100, 기교≥3, 여성
 */
export const COM_ABLE81 = (context: TrainingContext): boolean => {
  if (!experienceCheck.expansionExp(context, 100)) return false;
  if (!genderCheck.isFemale(context)) return false;

  // 트레이너 기교≥3 필요
  // TODO: 트레이너 능력치 체크

  if (equipmentCheck.hasVibrator(context)) return false;
  if (equipmentCheck.isTentacle(context)) return false;
  if (equipmentCheck.isSlime(context)) return false;
  if (equipmentCheck.isHogtie(context)) return false;
  if (equipmentCheck.isBestiality(context)) return false;
  if (equipmentCheck.isFacesitting(context)) return false;
  if (clothingCheck.hasLowerClothing(context)) return false;
  if (clothingCheck.hasChastityBelt(context)) return false;

  return true;
};

/**
 * COMF82 - 애널피스트
 * 조건: 확장경험≥100, 항문경험≥100, 기교≥3
 */
export const COM_ABLE82 = (context: TrainingContext): boolean => {
  if (!experienceCheck.expansionExp(context, 100)) return false;
  if (!experienceCheck.analExp(context, 100)) return false;

  // 트레이너 기교≥3 필요
  // TODO: 트레이너 능력치 체크

  if (equipmentCheck.hasAnalVibrator(context)) return false;
  if (equipmentCheck.hasAnalBeads(context)) return false;
  if (equipmentCheck.hasEnema(context)) return false;
  if (equipmentCheck.hasElectrode(context)) return false;
  if (equipmentCheck.isTentacle(context)) return false;
  if (equipmentCheck.isSlime(context)) return false;
  if (equipmentCheck.isHogtie(context)) return false;
  if (equipmentCheck.isBestiality(context)) return false;
  if (equipmentCheck.isFacesitting(context)) return false;
  if (clothingCheck.hasLowerClothing(context)) return false;

  return true;
};

/**
 * COMF83 - 양구멍피스트
 * 조건: 확장경험≥100, V경험≥100, A경험≥100, 기교≥3, 여성
 */
export const COM_ABLE83 = (context: TrainingContext): boolean => {
  if (!experienceCheck.expansionExp(context, 100)) return false;
  if (!experienceCheck.vaginalExp(context, 100)) return false;
  if (!experienceCheck.analExp(context, 100)) return false;
  if (!genderCheck.isFemale(context)) return false;

  // 트레이너 기교≥3 필요
  // TODO: 트레이너 능력치 체크

  if (equipmentCheck.hasVibrator(context)) return false;
  if (equipmentCheck.hasAnalVibrator(context)) return false;
  if (equipmentCheck.hasAnalBeads(context)) return false;
  if (equipmentCheck.hasEnema(context)) return false;
  if (equipmentCheck.hasElectrode(context)) return false;
  if (equipmentCheck.isTentacle(context)) return false;
  if (equipmentCheck.isSlime(context)) return false;
  if (equipmentCheck.isHogtie(context)) return false;
  if (equipmentCheck.isBestiality(context)) return false;
  if (equipmentCheck.isFacesitting(context)) return false;
  if (clothingCheck.hasLowerClothing(context)) return false;
  if (clothingCheck.hasChastityBelt(context)) return false;

  return true;
};

/**
 * COMF84 - 피어싱
 * 조건: 기교≥3
 */
export const COM_ABLE84 = (context: TrainingContext): boolean => {
  // 트레이너 기교≥3 필요
  // TODO: 트레이너 능력치 체크

  // TODO: CFLAG 피어싱 상태 체크 필요 (CFLAG:150-169 범위)

  return true;
};

/**
 * COMF86 - 제모
 * 조건: 기교≥2
 */
export const COM_ABLE86 = (context: TrainingContext): boolean => {
  // 트레이너 기교≥2 필요
  // TODO: 트레이너 능력치 체크

  // TODO: CFLAG:41 (음모 상태) 체크 필요

  return true;
};

/**
 * COMF87 - 문신
 * 조건: 비밀지식 소질
 */
export const COM_ABLE87 = (context: TrainingContext): boolean => {
  if (!talentCheck.trainerSecretKnowledge(context)) return false;

  // TODO: CFLAG:180-199 (문신 상태) 체크 필요

  return true;
};

/**
 * COMF88 - 세뇌
 * 조건: 비밀지식 소질
 */
export const COM_ABLE88 = (context: TrainingContext): boolean => {
  if (!talentCheck.trainerSecretKnowledge(context)) return false;

  // TODO: 세뇌 관련 조건 체크 필요

  return true;
};

/**
 * COMF90 - 로터자위
 * 조건: ITEM:0, 자위 가능, 종순+욕망+노출벽≥9
 */
export const COM_ABLE90 = (context: TrainingContext): boolean => {
  if (!itemCheck.hasItem(context, 0)) return false;
  if (paramCheck.isFainted(context)) return false;
  if (talentCheck.noMasturbation(context)) return false;

  // 능력치 합계 조건
  const abilitySum = (context.target.abilities['종순'] || 0) +
                     (context.target.abilities['욕망'] || 0) +
                     (context.target.abilities['노출벽'] || 0);
  if (abilitySum < 9) return false;

  if (equipmentCheck.hasRope(context)) return false;
  if (equipmentCheck.isTentacle(context)) return false;
  if (equipmentCheck.isSlime(context)) return false;
  if (equipmentCheck.isHogtie(context)) return false;
  if (equipmentCheck.isBestiality(context)) return false;
  if (equipmentCheck.isFacesitting(context)) return false;
  if (clothingCheck.hasLowerClothing(context)) return false;

  return true;
};

/**
 * COMF91 - 전동마사지기자위
 * 조건: ITEM:2, 자위 가능, 종순+욕망+노출벽≥9
 */
export const COM_ABLE91 = (context: TrainingContext): boolean => {
  if (!itemCheck.hasItem(context, 2)) return false;
  if (paramCheck.isFainted(context)) return false;
  if (talentCheck.noMasturbation(context)) return false;

  // 능력치 합계 조건
  const abilitySum = (context.target.abilities['종순'] || 0) +
                     (context.target.abilities['욕망'] || 0) +
                     (context.target.abilities['노출벽'] || 0);
  if (abilitySum < 9) return false;

  if (equipmentCheck.hasRope(context)) return false;
  if (equipmentCheck.isTentacle(context)) return false;
  if (equipmentCheck.isSlime(context)) return false;
  if (equipmentCheck.isHogtie(context)) return false;
  if (equipmentCheck.isBestiality(context)) return false;
  if (equipmentCheck.isFacesitting(context)) return false;
  if (equipmentCheck.isShower(context)) return false;
  if (clothingCheck.hasZuukoDoll(context)) return false;

  return true;
};

/**
 * COMF92 - 유두로터
 * 조건: ITEM:0, 상의 벗음, 종순+욕망+노출벽≥9
 */
export const COM_ABLE92 = (context: TrainingContext): boolean => {
  if (!itemCheck.hasItem(context, 0)) return false;
  if (!clothingCheck.topNaked(context)) return false;

  // 능력치 합계 조건
  const abilitySum = (context.target.abilities['종순'] || 0) +
                     (context.target.abilities['욕망'] || 0) +
                     (context.target.abilities['노출벽'] || 0);
  if (abilitySum < 9) return false;

  if (equipmentCheck.isTentacle(context)) return false;
  if (equipmentCheck.isSlime(context)) return false;
  if (equipmentCheck.isBestiality(context)) return false;
  if (equipmentCheck.isFacesitting(context)) return false;
  if (equipmentCheck.isShower(context)) return false;
  if (clothingCheck.hasZuukoDoll(context)) return false;

  return true;
};

/**
 * COMF100-109 - 촉수 시스템
 */
export const COM_ABLE100 = (context: TrainingContext): boolean => {
  if (!itemCheck.hasItem(context, 28)) return false;

  // 이미 활성중이면 해제 가능
  if (equipmentCheck.isTentacle(context)) return true;

  if (equipmentCheck.isHogtie(context)) return false;
  if (equipmentCheck.isBathroom(context)) return false;
  if (equipmentCheck.isCosplay(context)) return false;
  if (equipmentCheck.isFacesitting(context)) return false;

  return true;
};

// COM_ABLE101-109 - 촉수 플레이중에만 가능한 커맨드들
export const COM_ABLE101 = (context: TrainingContext): boolean => {
  return equipmentCheck.isTentacle(context);
};

export const COM_ABLE102 = COM_ABLE101; // 촉수 애무
export const COM_ABLE103 = COM_ABLE101; // 촉수 삽입
export const COM_ABLE104 = COM_ABLE101; // 촉수 애널
export const COM_ABLE105 = COM_ABLE101; // 촉수 구강
export const COM_ABLE106 = COM_ABLE101; // 촉수 젖꼭지
export const COM_ABLE107 = COM_ABLE101; // 촉수 속박
export const COM_ABLE108 = COM_ABLE101; // 촉수 산란
export const COM_ABLE109 = COM_ABLE101; // 촉수 전신

/**
 * COMF110-111 - 의류 시스템
 */
export const COM_ABLE110 = (context: TrainingContext): boolean => {
  // 의류 착용
  // TODO: 의류 목록 체크

  return true;
};

export const COM_ABLE111 = (context: TrainingContext): boolean => {
  // 의류 탈의
  // 뭔가 입고 있어야 함
  const hasClothing = (context.charFlags[40] ?? 0) > 0;
  return hasClothing;
};

/**
 * COMF150-154 - 슬라임 시스템
 */
export const COM_ABLE150 = (context: TrainingContext): boolean => {
  if (!itemCheck.hasItem(context, 29)) return false;

  // 이미 활성중이면 해제 가능
  if (equipmentCheck.isSlime(context)) return true;

  if (equipmentCheck.isHogtie(context)) return false;
  if (equipmentCheck.isBathroom(context)) return false;
  if (equipmentCheck.isCosplay(context)) return false;
  if (equipmentCheck.isFacesitting(context)) return false;

  return true;
};

// COM_ABLE151-154 - 슬라임 플레이중에만 가능한 커맨드들
export const COM_ABLE151 = (context: TrainingContext): boolean => {
  return equipmentCheck.isSlime(context);
};

export const COM_ABLE152 = COM_ABLE151; // 슬라임 애무
export const COM_ABLE153 = COM_ABLE151; // 슬라임 삽입
export const COM_ABLE154 = COM_ABLE151; // 슬라임 질식

export const availabilityMap: Record<number, (context: TrainingContext) => boolean> = {
  0: COM_ABLE0,
  1: COM_ABLE1,
  2: COM_ABLE2,
  3: COM_ABLE3,
  4: COM_ABLE4,
  5: COM_ABLE5,
  6: COM_ABLE6,
  7: COM_ABLE7,
  8: COM_ABLE8,
  9: COM_ABLE9,
  10: COM_ABLE10,
  11: COM_ABLE11,
  12: COM_ABLE12,
  13: COM_ABLE13,
  14: COM_ABLE14,
  15: COM_ABLE15,
  16: COM_ABLE16,
  17: COM_ABLE17,
  18: COM_ABLE18,
  19: COM_ABLE19,
  20: COM_ABLE20,
  21: COM_ABLE21,
  22: COM_ABLE22,
  23: COM_ABLE23,
  24: COM_ABLE24,
  25: COM_ABLE25,
  26: COM_ABLE26,
  27: COM_ABLE27,
  28: COM_ABLE28,
  29: COM_ABLE29,
  30: COM_ABLE30,
  31: COM_ABLE31,
  32: COM_ABLE32,
  33: COM_ABLE33,
  34: COM_ABLE34,
  35: COM_ABLE35,
  36: COM_ABLE36,
  37: COM_ABLE37,
  38: COM_ABLE38,
  39: COM_ABLE39,
  40: COM_ABLE40,
  41: COM_ABLE41,
  42: COM_ABLE42,
  43: COM_ABLE43,
  44: COM_ABLE44,
  45: COM_ABLE45,
  46: COM_ABLE46,
  47: COM_ABLE47,
  48: COM_ABLE48,
  49: COM_ABLE49,
  50: COM_ABLE50,
  51: COM_ABLE51,
  52: COM_ABLE52,
  53: COM_ABLE53,
  54: COM_ABLE54,
  55: COM_ABLE55,
  56: COM_ABLE56,
  57: COM_ABLE57,
  58: COM_ABLE58,
  59: COM_ABLE59,
  60: COM_ABLE60,
  61: COM_ABLE61,
  62: COM_ABLE62,
  63: COM_ABLE63,
  64: COM_ABLE64,
  65: COM_ABLE65,
  66: COM_ABLE66,
  67: COM_ABLE67,
  68: COM_ABLE68,
  69: COM_ABLE69,
  70: COM_ABLE70,
  71: COM_ABLE71,
  72: COM_ABLE72,
  80: COM_ABLE80,
  81: COM_ABLE81,
  82: COM_ABLE82,
  83: COM_ABLE83,
  84: COM_ABLE84,
  85: COM_ABLE85,
  86: COM_ABLE86,
  87: COM_ABLE87,
  88: COM_ABLE88,
  89: COM_ABLE89,
  90: COM_ABLE90,
  91: COM_ABLE91,
  92: COM_ABLE92,
  100: COM_ABLE100,
  101: COM_ABLE101,
  102: COM_ABLE102,
  103: COM_ABLE103,
  104: COM_ABLE104,
  105: COM_ABLE105,
  106: COM_ABLE106,
  107: COM_ABLE107,
  108: COM_ABLE108,
  109: COM_ABLE109,
  110: COM_ABLE110,
  111: COM_ABLE111,
  150: COM_ABLE150,
  151: COM_ABLE151,
  152: COM_ABLE152,
  153: COM_ABLE153,
  154: COM_ABLE154,
};

/**
 * 커맨드 가용성 체크
 */
export function checkCommandAvailability(
  commandId: number,
  context: TrainingContext
): boolean {
  const checker = availabilityMap[commandId];
  if (checker) {
    return checker(context);
  }

  // 기본: 항상 가능
  return true;
}
