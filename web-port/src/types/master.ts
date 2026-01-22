/**
 * Master Character Type Definition
 *
 * 주인공(조교자/프로듀서)의 능력치 및 상태를 관리하는 타입
 * 일반 캐릭터와 달리 게임 진행자로서 필요한 최소한의 데이터만 보유
 */

/**
 * 마스터 기본 정보 (BASE:MASTER)
 * 원본 게임에서 실제로 사용되는 BASE 항목만 포함
 */
export interface MasterBase {
  0: number;   // 체력 (PASSOUT.ERB에서 사용)
  1: number;   // 기력 (PASSOUT.ERB에서 사용)
  2: number;   // 사정게이지 (조교 커맨드에서 사용)
  4: number;   // 사정량 (COMF89.ERB, TRAIN_MAIN.ERB에서 사용)
  9: number;   // 나이 (VIDEO_TITLE.ERB에서 사용)
  60: number;  // 금액 관련 (SHOP_AV.ERB, SHOP_ITEM.ERB에서 사용)
  61: number;  // 금액 관련 (ITEM_AV.ERB에서 사용)
}

/**
 * 마스터 능력치 (ABL:MASTER)
 * 원본 게임에서는 ABL:MASTER:0(C감각)과 ABL:MASTER:12(기교)만 사용
 */
export interface MasterAbilities {
  0: number;   // C감각 (COMF62, 66, 68, 71에서 참조)
  12: number;  // 기교 레벨 (가장 중요! 난이도별 초기값 다름, 상점에서 레벨업 가능)
}

/**
 * 마스터 경험치 (EXP:MASTER)
 * 공헌도, 인기 등 게임 진행에 필요한 경험치
 */
export interface MasterExperience {
  3: number;    // 사정경험 (COMF62, 66, 68, 71에서 사용)
  9: number;    // 특정 경험 (SHOP_AV.ERB, SCOUT.ERB 등에서 사용)
  90: number;   // 공헌도 (매우 중요! 여러 시스템에서 참조)
  91: number;   // 인기 (창관/AV 시스템에서 사용)
  107: number;  // 판매 관련 (SELL_CHARA.ERB에서 사용)
  109: number;  // C클럽 관련 (C_CLUB.ERB에서 사용)
}

/**
 * 마스터 특성 ID
 * 원본 게임에서 실제로 사용되는 TALENT:MASTER 항목들
 */
export type MasterTalentId =
  | 1    // 처녀 (마스터가 여성인 경우)
  | 55   // 조합지식 (아이템 제작/구매 관련)
  | 64   // 결벽증 (이벤트 메시지 관련)
  | 83   // 가학성애 (이벤트 분기)
  | 91   // 파란마술서 (특수 아이템)
  | 92   // 촉수생물 (특수 아이템)
  | 93   // EXTRA모드 해금 특성
  | 117  // 특수 능력 (EVENT_TURNEND.ERB)
  | 120  // 성별 관련 (EVENT_ADDICT.ERB)
  | 121  // 조수 관련 특성 1 (자주 사용됨)
  | 122  // 조수 관련 특성 2 (자주 사용됨)
  | 153  // 임신 관련
  | 156  // 임신체질
  | 163  // 특수 특성 (GET_SPECIALTALENT.ERB)
  | 198  // 캐릭터 수 관련
  | 325  // 클리어 보너스
  | 399; // 특수 획득 특성

/**
 * 마스터 특성 (TALENT:MASTER)
 * Partial Record로 필요한 특성만 보유
 */
export type MasterTalents = Partial<Record<MasterTalentId, number>>;

/**
 * 마스터 플래그 ID (주요 항목)
 * 원본 게임에서 자주 사용되는 CFLAG:MASTER 항목들
 */
export type MasterFlagId =
  // 이벤트 관련
  | 16    // 첫 키스
  | 18    // 특정 이벤트 플래그
  | 65    // 서큐버스 관련 (매우 자주 사용)
  | 97    // 시스템 관련
  // 임신 관련
  | 102   // 임신 상태
  | 110   // 임신 예정일
  | 111   // 임신 상대 ID
  // 클리어 보너스 (150-158)
  | 132   // 클리어 보너스 캐릭터
  | 150 | 151 | 152 | 153 | 154 | 155 | 156 | 157 | 158
  | 161 | 162
  // C클럽 관련
  | 630   // C클럽 플래그
  | 634   // C클럽 이벤트
  | 635   // C클럽 여자 이름
  // 특수 이벤트
  | 670   // 블랙걸 이벤트
  | 694   // NTR/상점 관련
  | 761   // 방문 관련
  | 770   // 미션 관련
  // 생일 관련
  | 820   // 생일 나이
  | 821   // 생일 월
  | 822   // 생일 일
  | 823;  // 생일 장소

/**
 * 마스터 플래그 (CFLAG:MASTER)
 * 게임 진행 상태를 저장하는 플래그들
 */
export type MasterFlags = Partial<Record<MasterFlagId | number, number>>;

/**
 * 마스터 캐릭터 전체 데이터
 *
 * 일반 캐릭터와 달리 게임 진행자로서 필요한 최소한의 정보만 포함
 * 원본 ERB의 MASTER 번호 캐릭터에 대응
 */
export interface MasterCharacter {
  /** 기본 정보 (BASE:MASTER) */
  base: MasterBase;

  /** 능력치 (ABL:MASTER) */
  abl: MasterAbilities;

  /** 경험치 (EXP:MASTER) */
  exp: MasterExperience;

  /** 특성 (TALENT:MASTER) */
  talent: MasterTalents;

  /** 플래그 (CFLAG:MASTER) */
  cflag: MasterFlags;

  /** 마스터 이름 (게임 시작 시 설정) */
  name: string;
}

/**
 * 마스터 초기 데이터 생성
 * @param difficulty 난이도 (1: EASY, 2: NORMAL, 3: HARD, 4: POWERFUL, 9: EXTRA)
 * @param name 마스터 이름
 * @returns 초기화된 마스터 캐릭터 데이터
 */
export function createMasterCharacter(
  difficulty: 1 | 2 | 3 | 4 | 9 = 2,
  name: string = '프로듀서'
): MasterCharacter {
  // 난이도별 초기 기교 레벨 설정
  let initialTechnique = 0;
  if (difficulty === 1) {
    initialTechnique = 1; // EASY: 기교 Lv 1
  } else if (difficulty === 2) {
    initialTechnique = 0; // NORMAL: 기교 Lv 0
  } else if (difficulty === 3) {
    initialTechnique = 0; // HARD: 기교 Lv 0
  } else if (difficulty === 4) {
    initialTechnique = 0; // POWERFUL: 기교 Lv 0
  } else if (difficulty === 9) {
    initialTechnique = 0; // EXTRA: 기교 Lv 0
  }

  return {
    name,

    base: {
      0: 10000,  // 체력 (기본값)
      1: 10000,  // 기력 (기본값)
      2: 0,      // 사정게이지 (초기 0)
      4: 0,      // 사정량 (초기 0)
      9: 25,     // 나이 (기본 25세)
      60: 0,     // 금액 관련 (초기 0)
      61: 0,     // 금액 관련 (초기 0)
    },

    abl: {
      0: 0,                  // C감각 (초기 0)
      12: initialTechnique,  // 기교 (난이도별 차등)
    },

    exp: {
      3: 0,    // 사정경험 (초기 0)
      9: 0,    // 특정 경험 (초기 0)
      90: 0,   // 공헌도 (초기 0)
      91: 0,   // 인기 (초기 0)
      107: 0,  // 판매 관련 (초기 0)
      109: 0,  // C클럽 관련 (초기 0)
    },

    talent: {
      // 특성은 게임 진행 중 획득
      // 초기에는 빈 객체
    },

    cflag: {
      16: -1,  // 첫 키스 미경험 (-1)
      65: 0,   // 서큐버스 관련 (초기 0)
    },
  };
}

/**
 * 마스터 능력치 업데이트 헬퍼 함수들
 */
export const MasterHelpers = {
  /** 기교 레벨 증가 */
  increaseTechnique(master: MasterCharacter, amount: number = 1): MasterCharacter {
    return {
      ...master,
      abl: {
        ...master.abl,
        12: Math.min(master.abl[12] + amount, 10), // 최대 Lv 10
      },
    };
  },

  /** 공헌도 증가 */
  increaseContribution(master: MasterCharacter, amount: number): MasterCharacter {
    return {
      ...master,
      exp: {
        ...master.exp,
        90: master.exp[90] + amount,
      },
    };
  },

  /** 인기 증가 */
  increasePopularity(master: MasterCharacter, amount: number): MasterCharacter {
    return {
      ...master,
      exp: {
        ...master.exp,
        91: master.exp[91] + amount,
      },
    };
  },

  /** 특성 추가 */
  addTalent(master: MasterCharacter, talentId: MasterTalentId): MasterCharacter {
    return {
      ...master,
      talent: {
        ...master.talent,
        [talentId]: 1,
      },
    };
  },

  /** 특성 제거 */
  removeTalent(master: MasterCharacter, talentId: MasterTalentId): MasterCharacter {
    const newTalent = { ...master.talent };
    delete newTalent[talentId];
    return {
      ...master,
      talent: newTalent,
    };
  },

  /** 특성 보유 여부 확인 */
  hasTalent(master: MasterCharacter, talentId: MasterTalentId): boolean {
    return master.talent[talentId] === 1;
  },

  /** 플래그 설정 */
  setFlag(master: MasterCharacter, flagId: MasterFlagId | number, value: number): MasterCharacter {
    return {
      ...master,
      cflag: {
        ...master.cflag,
        [flagId]: value,
      },
    };
  },

  /** 플래그 값 가져오기 */
  getFlag(master: MasterCharacter, flagId: MasterFlagId | number): number {
    return master.cflag[flagId] ?? 0;
  },
};
