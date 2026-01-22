/**
 * CaressCommand - 애무 계열 커맨드 베이스 팩토리
 *
 * 애무 계열 커맨드(COMF0-9)의 공통 로직을 추출한 팩토리 함수
 * SafeContext를 사용하여 타입 안전한 컨텍스트 접근 제공
 */

import type { CommandPlugin, TrainingContext, CommandCategory } from '../../../../types/training';
import { SafeContext } from '../../context/SafeContext';
import {
  checkBasicAvailability,
  checkBottomNakedRequired,
  checkTopNakedRequired,
  handleSexualOrientationExp,
  checkAffectionExp,
  applySensitivityModifiers,
  applyLubricationModifier,
  applyLustModifier,
  applyExpLevelModifier,
} from '../../utils/sourceCalculator';
import { ABL, SOURCE, STAIN_PART } from '../../../../types/training';

// 타입 별칭
type AblKey = keyof typeof ABL;
type SourceKey = keyof typeof SOURCE;
type StainPartKey = keyof typeof STAIN_PART;

/**
 * 애무 커맨드 설정
 */
export interface CaressCommandConfig {
  /** 커맨드 ID */
  id: number;
  /** 커맨드 이름 */
  name: string;

  /** 카테고리 (기본: '애무') */
  category?: CommandCategory;

  /** 체력 소모 (기본: 5) */
  staminaCost?: number;
  /** 기력 소모 (기본: 50) */
  willpowerCost?: number;

  /** 관련 감각 능력치 */
  sensoryAbility: AblKey;
  /** 주요 SOURCE 키 */
  primarySource: SourceKey;
  /** 능력치 레벨별 주요 SOURCE 값 테이블 */
  valueTable: number[];

  /** 욕정 SOURCE 값 테이블 (선택) */
  lustTable?: number[];

  /** 불쾌 SOURCE 값 테이블 (선택) */
  discomfortTable?: number[];

  /** 고통 SOURCE 값 테이블 (선택) */
  painTable?: number[];

  /** 수치심 SOURCE 값 테이블 (선택) */
  shameTable?: number[];

  /** 관련 경험치 인덱스 (EXP) */
  expIndex?: number;
  /** 경험치 획득량 (기본: 1) */
  expGain?: number;

  /** 레즈 경험치 획득량 */
  lesbianExpAmount?: number;
  /** 호모 경험치 획득량 */
  gayExpAmount?: number;

  /** 부위별 더러움 처리 */
  stainConfig?: {
    /** 대상 부위 (입, 손, 가슴, V, A, 배) */
    targetPart: StainPartKey;
    /** 플레이어 부위 (입=0, 손=1) */
    playerPart: number;
  };

  /** 민감도 보정 적용 대상 */
  sensitivitySource?: SourceKey;

  /** 윤활 레벨 보정 적용 (PALAM:3) */
  applyLubrication?: boolean;
  /** 윤활 배율 테이블 (선택) */
  lubricationMultipliers?: number[];

  /** 욕정 레벨 보정 적용 (PALAM:5) */
  applyLust?: boolean;
  /** 욕정 배율 테이블 (선택) */
  lustMultipliers?: number[];

  /** 경험치 레벨 보정 설정 (선택) */
  expLevelModifier?: {
    expIndex: number;
    multipliers: number[];
  };

  /** 하의 벗김 필요 여부 */
  requireBottomNaked?: boolean;
  /** 상의 벗김 필요 여부 */
  requireTopNaked?: boolean;

  /** 추가 가용성 체크 함수 */
  extraAvailabilityCheck?: (safe: SafeContext) => boolean;

  /** 추가 SOURCE 계산 함수 */
  extraSourceCalculation?: (safe: SafeContext) => void;

  /** 실행 후 추가 처리 함수 */
  afterExecute?: (safe: SafeContext) => Promise<void>;
}

/**
 * 애무 커맨드 생성 팩토리
 *
 * @param config 커맨드 설정
 * @returns CommandPlugin
 */
export function createCaressCommand(config: CaressCommandConfig): CommandPlugin {
  const {
    id,
    name,
    category = '애무',
    staminaCost = 5,
    willpowerCost = 50,
    sensoryAbility,
    primarySource,
    valueTable,
    lustTable,
    discomfortTable,
    painTable,
    shameTable,
    expIndex,
    expGain = 1,
    lesbianExpAmount = 3,
    gayExpAmount = 3,
    stainConfig,
    sensitivitySource,
    applyLubrication = false,
    lubricationMultipliers,
    applyLust = false,
    lustMultipliers,
    expLevelModifier,
    requireBottomNaked = false,
    requireTopNaked = false,
    extraAvailabilityCheck,
    extraSourceCalculation,
    afterExecute,
  } = config;

  return {
    id,
    name,
    category,
    staminaCost,

    /**
     * 가용성 판정
     */
    isAvailable: (context: TrainingContext) => {
      const safe = new SafeContext(context);

      // 기본 불가 조건 (촉수, 슬라임, 삼각목마)
      if (!checkBasicAvailability(safe)) {
        return false;
      }

      // 하의 벗김 필요
      if (requireBottomNaked && !checkBottomNakedRequired(safe)) {
        return false;
      }

      // 상의 벗김 필요
      if (requireTopNaked && !checkTopNakedRequired(safe)) {
        return false;
      }

      // 추가 가용성 체크
      if (extraAvailabilityCheck && !extraAvailabilityCheck(safe)) {
        return false;
      }

      return true;
    },

    /**
     * 커맨드 실행
     */
    async execute(context: TrainingContext): Promise<void> {
      const safe = new SafeContext(context);

      // 커맨드명 표시
      safe.message(name);

      // SOURCE 계산 - 감각 능력치 기반
      const abilityLevel = safe.getAbility(sensoryAbility);
      const baseValue = valueTable[Math.min(abilityLevel, valueTable.length - 1)] ?? 0;
      safe.addSource(primarySource, baseValue);

      // 욕정 SOURCE
      if (lustTable) {
        const lustValue = lustTable[Math.min(abilityLevel, lustTable.length - 1)] ?? 0;
        safe.addSource('욕정', lustValue);
      }

      // 불쾌 SOURCE
      if (discomfortTable) {
        const discomfortValue = discomfortTable[Math.min(abilityLevel, discomfortTable.length - 1)] ?? 0;
        safe.addSource('불쾌', discomfortValue);
      }

      // 고통 SOURCE
      if (painTable) {
        const painValue = painTable[Math.min(abilityLevel, painTable.length - 1)] ?? 0;
        safe.addSource('고통', painValue);
      }

      // 수치심 SOURCE
      if (shameTable) {
        const shameValue = shameTable[Math.min(abilityLevel, shameTable.length - 1)] ?? 0;
        safe.addSource('수치심', shameValue);
      }

      // LOSEBASE (체력/기력 소모)
      safe.addStaminaCost(staminaCost);
      safe.addWillpowerCost(willpowerCost);

      // 수간인 경우 조기 종료 (SOURCE 보정 적용 전)
      if (safe.hasEquipment('수간')) {
        // 경험치만 획득하고 종료
        if (expIndex !== undefined) {
          safe.addExperienceByIndex(expIndex, expGain);
        }
        return;
      }

      // 경험치 레벨 보정
      if (expLevelModifier) {
        applyExpLevelModifier(
          safe,
          primarySource,
          expLevelModifier.expIndex,
          expLevelModifier.multipliers
        );
      }

      // 윤활 레벨 보정
      if (applyLubrication) {
        applyLubricationModifier(safe, primarySource, lubricationMultipliers);
      }

      // 욕정 레벨 보정
      if (applyLust) {
        applyLustModifier(safe, primarySource, lustMultipliers);
      }

      // 민감도 보정
      if (sensitivitySource) {
        applySensitivityModifiers(safe, { [getSensitivityOption(sensoryAbility)]: sensitivitySource });
      }

      // 추가 SOURCE 계산
      if (extraSourceCalculation) {
        extraSourceCalculation(safe);
      }

      // 더러움 처리
      if (stainConfig) {
        safe.transferStainWithPlayer(
          STAIN_PART[stainConfig.targetPart],
          stainConfig.playerPart
        );
      }

      // SOURCE 적용
      if (context.applySource) {
        context.applySource(safe.getSourceArray());
      } else {
        // 직접 PALAM에 누적
        const sourceArray = safe.getSourceArray();
        context.params = context.params || [];
        for (let i = 0; i < sourceArray.length && i < context.params.length; i++) {
          context.params[i] = (context.params[i] || 0) + sourceArray[i];
        }
      }

      // 경험치 획득
      if (expIndex !== undefined) {
        safe.addExperienceByIndex(expIndex, expGain);
      }

      // 레즈/호모 경험치
      handleSexualOrientationExp(safe, lesbianExpAmount, gayExpAmount);

      // 애정경험 판정
      checkAffectionExp(safe, 1);

      // 추가 처리
      if (afterExecute) {
        await afterExecute(safe);
      }
    },
  };
}

/**
 * 감각 능력치에 대응하는 민감도 옵션 키 반환
 */
function getSensitivityOption(ability: AblKey): 'cSource' | 'vSource' | 'aSource' | 'bSource' {
  switch (ability) {
    case 'C감각':
      return 'cSource';
    case 'V감각':
      return 'vSource';
    case 'A감각':
      return 'aSource';
    case 'B감각':
      return 'bSource';
    default:
      return 'cSource';
  }
}

/**
 * 메시지 생성 유틸리티 (커맨드별 커스터마이징 가능)
 */
export interface MessageConfig {
  /** 기본 메시지 */
  baseMessage: string;
  /** 조건부 추가 메시지 */
  conditionalMessages?: Array<{
    condition: (safe: SafeContext) => boolean;
    message: string;
  }>;
}

export function generateMessage(safe: SafeContext, config: MessageConfig): string {
  let msg = config.baseMessage.replace('{name}', safe.targetName);

  if (config.conditionalMessages) {
    for (const { condition, message } of config.conditionalMessages) {
      if (condition(safe)) {
        msg += ' ' + message.replace('{name}', safe.targetName);
      }
    }
  }

  return msg;
}
