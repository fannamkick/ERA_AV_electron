/**
 * sourceCalculator - SOURCE 계산 유틸리티
 *
 * 공통적으로 사용되는 SOURCE 계산 로직을 모아둔 유틸리티
 */

import { SafeContext } from '../context/SafeContext';
import { ABL, SOURCE } from '../../../types/training';

type AblKey = keyof typeof ABL;
type SourceKey = keyof typeof SOURCE;

// ============================================================================
// 레벨 계산 (공통)
// ============================================================================

/**
 * 파라미터 레벨 계산 (PALAMLV)
 */
export function getParamLevel(value: number): number {
  const thresholds = [0, 10000, 30000, 100000, 300000, 1000000, 3000000, 10000000];
  for (let i = thresholds.length - 1; i >= 0; i--) {
    if (value >= thresholds[i]) return i;
  }
  return 0;
}

/**
 * 경험치 레벨 계산 (EXPLV)
 */
export function getExpLevel(exp: number): number {
  if (exp >= 10000) return 5;
  if (exp >= 5000) return 4;
  if (exp >= 2000) return 3;
  if (exp >= 1000) return 2;
  if (exp >= 500) return 1;
  return 0;
}

// ============================================================================
// SOURCE 계산 헬퍼
// ============================================================================

/**
 * 능력치 기반 SOURCE 값 계산
 * valueTable[능력치레벨] 값을 반환
 */
export function calculateByAbility(
  safe: SafeContext,
  ability: AblKey,
  valueTable: number[]
): number {
  const level = safe.getAbility(ability);
  return valueTable[Math.min(level, valueTable.length - 1)] ?? 0;
}

/**
 * 능력치 레벨별 복합 값 계산
 * 여러 SOURCE에 동시에 값을 설정할 때 사용
 */
export function calculateByAbilityMultiple<T extends Record<SourceKey, number>>(
  safe: SafeContext,
  ability: AblKey,
  valueTables: T[]
): T {
  const level = safe.getAbility(ability);
  const index = Math.min(level, valueTables.length - 1);
  return valueTables[index];
}

// ============================================================================
// 보정 적용
// ============================================================================

/**
 * 경험치 레벨에 따른 배율 적용
 */
export function applyExpLevelModifier(
  safe: SafeContext,
  sourceKey: SourceKey,
  expIndex: number,
  multipliers: number[]
): void {
  const level = safe.getExpLevelByIndex(expIndex);
  const mult = multipliers[Math.min(level, multipliers.length - 1)] ?? 1;
  safe.multiplySource(sourceKey, mult);
}

/**
 * 파라미터 레벨에 따른 배율 적용
 */
export function applyParamLevelModifier(
  safe: SafeContext,
  sourceKey: SourceKey,
  paramIndex: number,
  multipliers: number[]
): void {
  const level = safe.getParamLevel(paramIndex);
  const mult = multipliers[Math.min(level, multipliers.length - 1)] ?? 1;
  safe.multiplySource(sourceKey, mult);
}

/**
 * 윤활 레벨 보정 적용 (PALAM:3)
 */
export function applyLubricationModifier(
  safe: SafeContext,
  sourceKey: SourceKey,
  multipliers: number[] = [0.1, 0.2, 0.6, 1.0, 2.0]
): void {
  applyParamLevelModifier(safe, sourceKey, 3, multipliers);
}

/**
 * 욕정 레벨 보정 적용 (PALAM:5)
 */
export function applyLustModifier(
  safe: SafeContext,
  sourceKey: SourceKey,
  multipliers: number[] = [0.5, 0.8, 1.2, 1.5, 1.8]
): void {
  applyParamLevelModifier(safe, sourceKey, 5, multipliers);
}

// ============================================================================
// 공통 경험치 처리
// ============================================================================

/**
 * 레즈/호모 경험치 처리
 */
export function handleSexualOrientationExp(
  safe: SafeContext,
  lesbianAmount: number = 5,
  gayAmount: number = 5
): void {
  safe.handleSexualOrientationExp(lesbianAmount, gayAmount);
}

/**
 * 애정경험 판정 (호감도 >= 1000 && 주인 플레이)
 */
export function checkAffectionExp(safe: SafeContext, amount: number = 1): void {
  safe.checkAffectionExp(amount);
}

// ============================================================================
// 민감/둔감 보정
// ============================================================================

/**
 * 모든 민감/둔감 보정을 한 번에 적용 (해당 부위만)
 */
export function applySensitivityModifiers(
  safe: SafeContext,
  options: {
    cSource?: SourceKey;
    vSource?: SourceKey;
    aSource?: SourceKey;
    bSource?: SourceKey;
  }
): void {
  if (options.cSource) safe.applyCSensitivityModifier(options.cSource);
  if (options.vSource) safe.applyVSensitivityModifier(options.vSource);
  if (options.aSource) safe.applyASensitivityModifier(options.aSource);
  if (options.bSource) safe.applyBSensitivityModifier(options.bSource);
}

// ============================================================================
// 공통 가용성 체크
// ============================================================================

/**
 * 기본 커맨드 불가 조건 체크 (촉수, 슬라임, 삼각목마)
 */
export function checkBasicAvailability(safe: SafeContext): boolean {
  if (safe.hasEquipment('촉수')) return false;
  if (safe.hasEquipment('슬라임')) return false;
  if (safe.hasEquipment('삼각목마')) return false;
  return true;
}

/**
 * 하의 벗김 필요 체크
 */
export function checkBottomNakedRequired(safe: SafeContext): boolean {
  // 팬티 or 하의 착용 불가 (비트 1 = 팬티, 비트 16 = 하의)
  const clothing = safe.getCharFlagByIndex(40);
  return (clothing & 17) === 0;
}

/**
 * 상의 벗김 필요 체크
 */
export function checkTopNakedRequired(safe: SafeContext): boolean {
  return safe.isTopNaked();
}
