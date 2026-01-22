/**
 * COMF3 - 자위 (Masturbation)
 * 원본: ERB/指導関係/COMF3.ERB
 *
 * 조교 대상이 자신의 성기를 손으로 자극하는 명령
 * 가장 복잡한 커맨드 중 하나 - 바이브, 애널바이브, 샤워, 슬라임 등 다양한 조합
 * 새 구조 (SafeContext) 적용
 */

import type { CommandPlugin, TrainingContext } from '../../../../types/training';
import { SafeContext } from '../../context/SafeContext';
import { checkBasicAvailability } from '../../utils/sourceCalculator';
import { STAIN_PART } from '../../../../types/training';

// ============================================================================
// 테이블 정의
// ============================================================================

/** C감각별 기본값 테이블 */
const C_SENSE_VALUES = [
  { c: 15, learn: 2000, displ: 500 },
  { c: 50, learn: 2300, displ: 800 },
  { c: 300, learn: 2600, displ: 1200 },
  { c: 700, learn: 2900, displ: 1900 },
  { c: 1100, learn: 3200, displ: 2500 },
  { c: 1600, learn: 3500, displ: 3000 },
];

/** B감각별 쾌B 테이블 */
const B_SENSE_VALUES = [15, 50, 300, 700, 1100, 1600];

/** 바이브/슬라임 V감각 테이블 */
const V_SENSE_VIBE_VALUES = [
  { pleasure: 40, displ: 150 },
  { pleasure: 120, displ: 400 },
  { pleasure: 300, displ: 700 },
  { pleasure: 500, displ: 900 },
  { pleasure: 650, displ: 1000 },
  { pleasure: 850, displ: 1200 },
];

/** 바이브/슬라임 A감각 테이블 */
const A_SENSE_VIBE_VALUES = [
  { pleasure: 40, displ: 150 },
  { pleasure: 120, displ: 400 },
  { pleasure: 300, displ: 700 },
  { pleasure: 500, displ: 900 },
  { pleasure: 650, displ: 1000 },
  { pleasure: 850, displ: 1200 },
];

/** 슬라임 V/A 테이블 */
const SLIME_VALUES = [
  { pleasure: 20, displ: 750 },
  { pleasure: 60, displ: 200 },
  { pleasure: 150, displ: 350 },
  { pleasure: 250, displ: 450 },
  { pleasure: 325, displ: 500 },
  { pleasure: 425, displ: 600 },
];

/** 샤워 C감각 테이블 */
const C_SHOWER_VALUES = [
  { c: 150, learn: 1000, displ: 50 },
  { c: 400, learn: 1300, displ: 80 },
  { c: 800, learn: 1600, displ: 120 },
  { c: 1200, learn: 1900, displ: 190 },
  { c: 1500, learn: 2200, displ: 250 },
  { c: 1800, learn: 2500, displ: 300 },
];

/** 샤워 V감각 테이블 */
const V_SHOWER_VALUES = [
  { v: 0, displ: 0 },
  { v: 100, displ: 300 },
  { v: 200, displ: 400 },
  { v: 300, displ: 500 },
  { v: 400, displ: 600 },
  { v: 500, displ: 700 },
];

/** V경험 보정 테이블 (바이브) */
const V_EXP_MODIFIERS = [
  { mult: 0.60, pain: 150 },
  { mult: 1.00, pain: 20 },
  { mult: 1.20, pain: 0 },
  { mult: 1.40, pain: 0 },
  { mult: 1.60, pain: 0 },
];

/** A경험 보정 테이블 (바이브) */
const A_EXP_MODIFIERS = [
  { mult: 0.50, pain: 1000 },
  { mult: 1.00, pain: 150 },
  { mult: 1.10, pain: 20 },
  { mult: 1.20, pain: 0 },
  { mult: 1.40, pain: 0 },
  { mult: 1.60, pain: 0 },
];

/** 슬라임 V경험 보정 */
const V_SLIME_EXP_MODS = [
  { mult: 0.40, pain: 200 },
  { mult: 0.60, pain: 150 },
  { mult: 1.00, pain: 20 },
  { mult: 1.20, pain: 0 },
  { mult: 1.40, pain: 0 },
  { mult: 1.60, pain: 0 },
];

/** 슬라임 A경험 보정 */
const A_SLIME_EXP_MODS = [
  { mult: 0.50, pain: 1000 },
  { mult: 1.00, pain: 150 },
  { mult: 1.10, pain: 20 },
  { mult: 1.20, pain: 0 },
  { mult: 1.40, pain: 0 },
  { mult: 1.60, pain: 0 },
];

/** 윤활 보정 테이블 */
const LUB_MODIFIERS = [
  { vaMult: 0.40, painAdd: 800 },
  { vaMult: 0.80, painAdd: 500 },
  { vaMult: 1.00, painAdd: 300 },
  { vaMult: 1.40, painAdd: 120 },
  { vaMult: 1.80, painAdd: 100 },
];

/** 욕정 보정 배율 */
const LUST_MODIFIERS = [0.80, 0.90, 1.00, 1.10, 1.20];

/** 종순 보정 배율 */
const SUB_MODIFIERS = [0.80, 0.90, 1.00, 1.10, 1.20, 1.30];

/** 기교 보정 테이블 */
const TECH_VALUES = [
  { submit: 100, mult: 0.30 },
  { submit: 160, mult: 0.70 },
  { submit: 220, mult: 1.00 },
  { submit: 280, mult: 1.20 },
  { submit: 340, mult: 1.40 },
  { submit: 400, mult: 1.60 },
];

/** 자위중독 보정 테이블 */
const MAST_VALUES = [
  { yield: 0, mult: 1.00 },
  { yield: 100, mult: 1.10 },
  { yield: 300, mult: 1.20 },
  { yield: 800, mult: 1.30 },
  { yield: 1500, mult: 1.50 },
  { yield: 2500, mult: 1.70 },
];

/** 노출벽 보정 테이블 */
const EXHIB_VALUES = [
  { yield: 0, pleaseMult: 1.00, shameMult: 1.00 },
  { yield: 100, pleaseMult: 1.10, shameMult: 1.20 },
  { yield: 300, pleaseMult: 1.20, shameMult: 1.40 },
  { yield: 800, pleaseMult: 1.30, shameMult: 1.60 },
  { yield: 1500, pleaseMult: 1.50, shameMult: 2.00 },
  { yield: 2500, pleaseMult: 1.70, shameMult: 3.00 },
];

// ============================================================================
// 실행 판정
// ============================================================================

/**
 * 실행 가능 판정 (점수 시스템)
 */
function canExecute(safe: SafeContext): { canExecute: boolean; score: number; threshold: number } {
  let score = 0;

  // 종순도에 따른 기본 점수
  const submission = safe.getAbility('신뢰');
  if (submission >= 3) score += submission * 2;

  // 욕망 * 3
  score += safe.getAbility('욕망') * 3;

  // 노출벽 * 4
  score += safe.getAbility('노출벽') * 4;

  // 자위중독 * 3
  score += safe.getAbility('자위중독') * 3;

  // 쾌락각인 * 3
  score += safe.getMarkByIndex(1) * 3;

  // 욕정 레벨 * 3
  score += safe.getParamLevel(5) * 3;

  // 소질 보정
  if (safe.hasTalentByIndex(20)) score -= 5;  // 자제심
  if (safe.hasTalentByIndex(35)) score -= 5;  // 수줍음
  if (safe.hasTalentByIndex(36)) score += 2;  // 부끄럼 없음
  if (safe.hasTalentByIndex(60)) score += 5;  // 자위하기쉬움
  if (safe.hasTalentByIndex(70)) score += 5;  // 쾌감에 솔직
  if (safe.hasTalentByIndex(71)) score -= 5;  // 쾌감을 부정
  if (safe.hasTalentByIndex(89)) score += 10; // 노출광

  // 행복초
  if (safe.hasEquipmentByIndex(21)) score += 8;

  // 임계치 계산
  let threshold = 33;
  if (safe.hasEquipmentByIndex(53)) threshold += 10;  // 비디오 촬영
  if (safe.hasEquipment('샤워')) threshold += 3;
  if (safe.hasEquipment('바이브')) threshold += 5;
  if (safe.hasEquipment('애널바이브')) threshold += 5;
  if (safe.hasEquipmentByIndex(60)) threshold += 5;
  if (safe.hasEquipment('슬라임')) threshold -= 10;
  if (safe.hasEquipmentByIndex(151)) threshold += 5;  // 슬라임 질내
  if (safe.hasEquipmentByIndex(152)) threshold += 5;  // 슬라임 항문

  return { canExecute: score >= threshold, score, threshold };
}

// ============================================================================
// SOURCE 계산
// ============================================================================

/**
 * SOURCE 계산
 */
function calculateMasturbationSource(safe: SafeContext): void {
  const cSense = safe.getAbility('C감각');
  const vSense = safe.getAbility('V감각');
  const aSense = safe.getAbility('A감각');
  const bSense = safe.getAbility('B감각');

  const vExpLevel = safe.getExpLevelByIndex(0);
  const aExpLevel = safe.getExpLevelByIndex(1);
  const lubLevel = safe.getParamLevel(3);
  const lustLevel = safe.getParamLevel(5);
  const submission = safe.getAbility('신뢰');

  // LOSEBASE
  safe.addStaminaCost(5);
  safe.addWillpowerCost(50);

  // 비디오 촬영중
  if (safe.hasEquipmentByIndex(53)) {
    safe.addPalam('욕정', 50);
    safe.addPalam('반감', 100);
  }

  // C감각 기본값
  const cData = C_SENSE_VALUES[Math.min(cSense, 5)];
  safe.addSource('쾌C', cData.c);
  safe.addPalam('습득', cData.learn);
  safe.addPalam('불쾌', cData.displ);

  // B감각 기본값
  safe.addSource('쾌B', B_SENSE_VALUES[Math.min(bSense, 5)]);

  let vPleasure = 0;
  let aPleasure = 0;
  let pain = 0;
  let displeasure = 0;

  // 바이브 삽입중
  if (safe.hasEquipment('바이브')) {
    const vVibeData = V_SENSE_VIBE_VALUES[Math.min(vSense, 5)];
    vPleasure += vVibeData.pleasure;
    displeasure += vVibeData.displ;

    const vExpMod = V_EXP_MODIFIERS[Math.min(Math.max(vExpLevel - 1, 0), 4)];
    vPleasure *= vExpMod.mult;
    pain += vExpMod.pain;

    // V민감/둔감
    if (safe.hasTalent('V둔감')) {
      pain *= 1.5;
      displeasure *= 1.5;
    } else if (safe.hasTalent('V민감')) {
      pain *= 0.6;
      displeasure *= 0.6;
    }

    safe.addPalam('불쾌', displeasure);
    displeasure = 0;
  }

  // 애널바이브 삽입중
  if (safe.hasEquipment('애널바이브')) {
    safe.addStaminaCost(30);
    safe.addWillpowerCost(80);

    const aVibeData = A_SENSE_VIBE_VALUES[Math.min(aSense, 5)];
    aPleasure += aVibeData.pleasure;
    displeasure += aVibeData.displ;

    const aExpMod = A_EXP_MODIFIERS[Math.min(aExpLevel, 5)];
    aPleasure *= aExpMod.mult;
    pain += aExpMod.pain;

    // A민감/둔감
    if (safe.hasTalent('A둔감')) {
      pain *= 1.5;
      displeasure *= 1.5;
    } else if (safe.hasTalent('A민감')) {
      pain *= 0.6;
      displeasure *= 0.6;
    }

    safe.addPalam('불쾌', displeasure);
    displeasure = 0;
  }

  // 샤워 사용중
  if (safe.hasEquipment('샤워')) {
    const cShowerData = C_SHOWER_VALUES[Math.min(cSense, 5)];
    safe.setSource('쾌C', cShowerData.c);
    safe.setPalam('습득', cShowerData.learn);
    safe.setPalam('불쾌', cShowerData.displ);

    const vShowerData = V_SHOWER_VALUES[Math.min(vSense, 5)];
    safe.addSource('쾌V', vShowerData.v);
    displeasure = vShowerData.displ;

    const aShowerData = A_SENSE_VIBE_VALUES[Math.min(aSense, 5)];
    aPleasure = aShowerData.pleasure;
    displeasure += aShowerData.displ;

    // V민감/둔감
    if (safe.hasTalent('V둔감')) {
      safe.multiplyPalam('고통', 1.5);
      displeasure *= 1.5;
    } else if (safe.hasTalent('V민감')) {
      safe.multiplyPalam('고통', 0.6);
      displeasure *= 0.6;
    }

    // A민감/둔감
    if (safe.hasTalent('A둔감')) {
      safe.multiplyPalam('고통', 1.5);
      displeasure *= 1.5;
    } else if (safe.hasTalent('A민감')) {
      safe.multiplyPalam('고통', 0.6);
      displeasure *= 0.6;
    }

    safe.addPalam('불쾌', displeasure);
    displeasure = 0;
  } else {
    aPleasure = 0;
    vPleasure = 0;
  }

  // 슬라임 질내 진입
  if (safe.hasEquipmentByIndex(151)) {
    const vSlimeData = SLIME_VALUES[Math.min(vSense, 5)];
    vPleasure += vSlimeData.pleasure;
    displeasure += vSlimeData.displ;

    const vSlimeExpMod = V_SLIME_EXP_MODS[Math.min(vExpLevel, 5)];
    vPleasure *= vSlimeExpMod.mult;
    pain += vSlimeExpMod.pain;

    if (safe.hasTalent('V둔감')) {
      pain *= 1.5;
      displeasure *= 1.5;
    } else if (safe.hasTalent('V민감')) {
      pain *= 0.6;
      displeasure *= 0.6;
    }

    safe.addPalam('불쾌', displeasure);
    displeasure = 0;
  }

  // 슬라임 항문 진입
  if (safe.hasEquipmentByIndex(152)) {
    safe.addStaminaCost(30);
    safe.addWillpowerCost(80);

    const aSlimeData = SLIME_VALUES[Math.min(aSense, 5)];
    aPleasure += aSlimeData.pleasure;
    displeasure += aSlimeData.displ;

    const aSlimeExpMod = A_SLIME_EXP_MODS[Math.min(aExpLevel, 5)];
    aPleasure *= aSlimeExpMod.mult;
    pain += aSlimeExpMod.pain;

    if (safe.hasTalent('A둔감')) {
      pain *= 1.5;
      displeasure *= 1.5;
    } else if (safe.hasTalent('A민감')) {
      pain *= 0.6;
      displeasure *= 0.6;
    }

    safe.addPalam('불쾌', displeasure);
    displeasure = 0;
  }

  // V or A 상승 시 C, B 감소
  if (safe.hasEquipment('바이브') || safe.hasEquipment('애널바이브')) {
    const totalVA = vSense + aSense;
    let cbMult = 1.0;
    if (totalVA <= 1) cbMult = 1.0;
    else if (totalVA <= 3) cbMult = 0.9;
    else if (totalVA <= 5) cbMult = 0.8;
    else if (totalVA <= 7) cbMult = 0.7;
    else if (totalVA <= 9) cbMult = 0.6;
    else cbMult = 0.5;

    safe.multiplySource('쾌C', cbMult);
    safe.multiplySource('쾌B', cbMult);
  }

  // 바이브/애널바이브/슬라임 삽입 시 보정
  const hasInsertion = safe.hasEquipment('바이브') || safe.hasEquipment('애널바이브') ||
    safe.hasEquipmentByIndex(151) || safe.hasEquipmentByIndex(152);

  if (hasInsertion) {
    const lubMod = LUB_MODIFIERS[Math.min(lubLevel, 4)];
    vPleasure *= lubMod.vaMult;
    aPleasure *= lubMod.vaMult;
    pain += lubMod.painAdd;

    const lustMult = LUST_MODIFIERS[Math.min(lustLevel, 4)];
    vPleasure *= lustMult;
    aPleasure *= lustMult;

    const subMult = SUB_MODIFIERS[Math.min(submission, 5)];
    vPleasure *= subMult;
    aPleasure *= subMult;

    // 체형 보정
    if (safe.hasTalentByIndex(99)) pain *= 0.8;   // 큰체구
    if (safe.hasTalentByIndex(100)) pain *= 2.0; // 작은체형
    if (safe.hasTalentByIndex(30)) pain *= 3.0;  // 정조관념

    safe.addSource('쾌V', Math.floor(vPleasure));
    safe.addSource('쾌A', Math.floor(aPleasure));
    safe.addPalam('고통', Math.floor(pain));
  }

  // 샤워 별도 계산
  if (safe.hasEquipment('샤워')) {
    const lubMod = LUB_MODIFIERS[Math.min(lubLevel, 4)];
    vPleasure *= lubMod.vaMult;
    aPleasure *= lubMod.vaMult;
    pain += lubMod.painAdd;

    const lustMult = LUST_MODIFIERS[Math.min(lustLevel, 4)];
    vPleasure *= lustMult;
    aPleasure *= lustMult;

    const subMult = SUB_MODIFIERS[Math.min(submission, 5)];
    vPleasure *= subMult;
    aPleasure *= subMult;

    safe.addSource('쾌V', Math.floor(vPleasure));
    safe.addSource('쾌A', Math.floor(aPleasure));
  }

  // 기교 보정
  const technique = safe.getAbility('기교');
  const techData = TECH_VALUES[Math.min(technique, 5)];
  safe.addSource('굴종', techData.submit);
  safe.multiplySource('쾌C', techData.mult);
  safe.multiplySource('쾌B', techData.mult);
  safe.multiplySource('쾌V', techData.mult);
  safe.multiplySource('쾌A', techData.mult);

  // 자위중독 보정
  const mastAddiction = safe.getAbility('자위중독');
  const mastData = MAST_VALUES[Math.min(mastAddiction, 5)];
  safe.addPalam('굴복', mastData.yield);
  safe.multiplySource('쾌C', mastData.mult);
  safe.multiplySource('쾌B', mastData.mult);
  if (mastAddiction >= 5) {
    safe.multiplySource('쾌V', 1.7);
    safe.multiplySource('쾌A', 1.5);
  } else {
    safe.multiplySource('쾌V', mastData.mult);
    safe.multiplySource('쾌A', mastData.mult);
  }

  // 공개/야외 시 노출벽 보정
  if (safe.hasEquipmentByIndex(53) || safe.hasEquipmentByIndex(54)) {
    const exhib = safe.getAbility('노출벽');
    const exhibData = EXHIB_VALUES[Math.min(exhib, 5)];
    safe.addPalam('굴복', exhibData.yield);
    safe.multiplySource('쾌C', exhibData.pleaseMult);
    safe.multiplySource('쾌B', exhibData.pleaseMult);
    safe.multiplySource('쾌V', exhibData.pleaseMult);
    safe.multiplySource('쾌A', exhibData.pleaseMult);
    safe.multiplyPalam('습득', exhibData.shameMult);

    // 노출광 소질
    if (safe.hasTalentByIndex(89)) {
      safe.addPalam('굴복', 500);
      safe.multiplySource('쾌C', 1.2);
      safe.multiplySource('쾌B', 1.2);
      safe.multiplySource('쾌V', 1.2);
      safe.multiplySource('쾌A', 1.2);
      safe.multiplyPalam('습득', 1.5);
    }
  }

  // 음모 생성 설정 + 제모 상태
  if (safe.getFlag(36) && !safe.hasTalentByIndex(125) && safe.getCharFlagByIndex(6) <= 5) {
    safe.multiplyPalam('습득', 2.0);
  }
}

// ============================================================================
// 메시지 생성
// ============================================================================

/**
 * 메시지 생성
 */
function generateMasturbationMessage(safe: SafeContext): string {
  const targetName = safe.targetName;
  const submission = safe.getAbility('신뢰');
  const rebellion = safe.getParam(12);

  // 거부 케이스
  if (submission < rebellion) {
    return `${targetName}에게 자위를 명령해보았지만 거부당했다. 좀 더 지도할 필요가 있다.`;
  }

  // 완전 사육
  if (submission >= 80) {
    return `플레이어가 명령하자 기뻐하며, ${targetName}은 완전히 사육된 암컷의 표정으로 자위를 시작했다.`;
  }

  // 복종
  if (submission >= 50) {
    let msg = `플레이어가 자위를 명령하자 ${targetName}은 `;
    if (safe.hasTalentByIndex(22)) msg += '무표정한 얼굴로 묵묵히 ';
    else if (safe.hasTalentByIndex(10) || safe.hasTalentByIndex(14)) msg += '떨리는 손 끝으로 ';
    else if (safe.hasTalentByIndex(11)) msg += '반항적으로 노려봤지만 곧 ';
    else if (safe.hasTalentByIndex(12)) msg += '굴욕으로 입술을 깨물고 ';
    msg += '자위를 시작했다.';
    return msg;
  }

  // 초보 복종
  let msg = `플레이어가 자위를 명령하자 ${targetName}은 `;
  if (safe.hasTalentByIndex(35)) msg += '수치심에 귀까지 완전히 빨개져 ';
  if (safe.hasEquipmentByIndex(53)) msg += '비디오카메라 앞에서 ';
  msg += '자위를 시작했다.';

  // 연속 자위 + 고조 상태
  if (safe.prevCom === 3 && safe.getParam(5) >= 5000) {
    const hasVibe = safe.hasEquipment('바이브');
    const hasAnalVibe = safe.hasEquipment('애널바이브');

    if (hasVibe && hasAnalVibe) {
      msg += ` ${targetName}은 절정이 멈추지 않아, 필사적으로 바이브와 애널바이브를 움직이고 있다.`;
    } else if (hasVibe) {
      msg += ` ${targetName}은 애액이 흩날리는 것도 신경쓰지 않고, 바이브를 격렬하게 움직이고 있다.`;
    } else if (hasAnalVibe) {
      msg += ` ${targetName}은 아누스에 바이브를 출입시키며, 경련하고 있다.`;
    } else {
      msg += ` ${targetName}의 손이 멋대로 움직여, 자위를 멈출 수 없는 것 같다.`;
    }
    msg += ' 이제는 다른 일을 신경쓸 여유도 없는 것 같다…';
  }

  return msg;
}

/**
 * 커맨드명 생성
 */
function generateCommandName(safe: SafeContext): string {
  let name = '';

  if (safe.hasEquipmentByIndex(53)) name += '공개 ';
  if (safe.hasEquipmentByIndex(54)) name += '야외 ';
  if (safe.hasEquipment('샤워')) name += '샤워 ';

  if (safe.hasEquipment('슬라임')) {
    name += '슬라임 ';
  } else if (safe.hasEquipmentByIndex(151) && safe.hasEquipmentByIndex(152)) {
    name += '슬라임 양구멍 ';
  } else if (safe.hasEquipmentByIndex(151)) {
    name += '슬라임 질내 ';
  } else if (safe.hasEquipmentByIndex(152)) {
    name += '슬라임 애널 ';
  }

  if (safe.hasEquipment('바이브') && safe.hasEquipment('애널바이브')) {
    name += '양구멍 바이브 ';
  } else if (safe.hasEquipment('바이브')) {
    name += '바이브 ';
  } else if (safe.hasEquipment('애널바이브')) {
    name += '애널바이브 ';
  }

  return name + '자위';
}

// ============================================================================
// 커맨드 정의
// ============================================================================

export const COMF3_masturbation: CommandPlugin = {
  id: 3,
  name: '자위',
  category: '애무',
  staminaCost: 5,

  /**
   * 가용성 판정
   */
  isAvailable: (context: TrainingContext) => {
    const safe = new SafeContext(context);

    // 기본 불가 조건
    if (!checkBasicAvailability(safe)) return false;

    // 일반 자위는 팬티 or 하의 착용 불가 (바이브 자위는 가능)
    const hasVibrator = safe.hasEquipment('바이브') || safe.hasEquipment('애널바이브');
    if (!hasVibrator && safe.isWearing('팬티')) return false;
    if (!hasVibrator && safe.isWearing('하의')) return false;

    return true;
  },

  /**
   * 커맨드 실행
   */
  async execute(context: TrainingContext): Promise<void> {
    const safe = new SafeContext(context);

    // 실행 가능 여부 판정
    const execCheck = canExecute(safe);
    if (!execCheck.canExecute) {
      safe.message(`${safe.targetName}은(는) 자위를 거부했다.`);
      safe.message(`점수: ${execCheck.score} < 실행치: ${execCheck.threshold}`);
      return;
    }

    // 커맨드명 표시
    safe.message(generateCommandName(safe));

    // 메시지 표시
    safe.message(generateMasturbationMessage(safe));

    // SOURCE 계산
    calculateMasturbationSource(safe);

    // 더러움 처리
    safe.transferStain(STAIN_PART.손, STAIN_PART.가슴);
    safe.transferStain(STAIN_PART.손, STAIN_PART.V);

    // 샤워 자위는 더럽힘 리셋 + 윤활 절반
    if (safe.hasEquipment('샤워')) {
      safe.addStainByIndex(STAIN_PART.손, 0);
      safe.addStainByIndex(STAIN_PART.가슴, 2);  // 땀
      safe.addStainByIndex(STAIN_PART.V, 1);     // 애액
      safe.addStainByIndex(STAIN_PART.A, 8);     // 항문
      context.params[3] = Math.floor(context.params[3] / 2);
    }

    // SOURCE 적용
    if (context.applySource) {
      context.applySource(safe.getSourceArray());
    } else {
      const sourceArray = safe.getSourceArray();
      context.params = context.params || [];
      for (let i = 0; i < sourceArray.length && i < context.params.length; i++) {
        context.params[i] = (context.params[i] || 0) + sourceArray[i];
      }
    }

    // 경험치 획득
    const isPublic = safe.hasEquipmentByIndex(53) || safe.hasEquipmentByIndex(54);
    const expMult = isPublic ? 2 : 1;

    safe.addExperienceByIndex(10, expMult, '자위경험');
    safe.addExperienceByIndex(11, expMult, '지도자위경험');
    safe.addExperience('애무경험', 1);

    // 공개/야외 + 첫 경험 → 이상경험
    if (isPublic && safe.getCharFlagByIndex(3) === 0) {
      safe.addExperienceByIndex(50, 1, '이상경험');
      safe.setCharFlagByIndex(3, 1);
    }

    // 레즈/호모 경험치
    safe.handleSexualOrientationExp(3, 3);

    // 굴복각인 2 상당
    safe.setFlag(200, 2);
  },
};
