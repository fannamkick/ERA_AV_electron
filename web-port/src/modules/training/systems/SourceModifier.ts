/**
 * SourceModifier - SOURCE 보정 시스템
 *
 * 원본: ERB/システム関係/SYSTEM_SOURCE.ERB
 *
 * SOURCE 값에 소질/능력/관계 등의 보정을 적용합니다.
 */

import type { TrainingContext } from '../../../types/training';

export class SourceModifier {
  /**
   * 모든 보정 적용
   * 원본: SYSTEM_SOURCE.ERB 전체
   */
  static applyAll(source: number[], ctx: TrainingContext): number[] {
    let modified = [...source];

    // 1. 소질 보정
    modified = this.applyTalentModifiers(modified, ctx);

    // 2. 능력치 보정
    modified = this.applyAbilityModifiers(modified, ctx);

    // 3. 파라미터 보정
    modified = this.applyParameterModifiers(modified, ctx);

    // 4. 관계 보정
    modified = this.applyRelationModifiers(modified, ctx);

    // 5. 장비/의상 보정
    modified = this.applyEquipmentModifiers(modified, ctx);

    return modified;
  }

  /**
   * 소질 보정 적용
   * 원본: SYSTEM_SOURCE.ERB 라인 156-700+
   */
  static applyTalentModifiers(source: number[], ctx: TrainingContext): number[] {
    const modified = [...source];
    const talents = ctx.talents;

    // === C감각 소질 ===
    // TALENT:101 (C둔감) - 쾌C 0.5배
    if (talents[101]) {
      modified[0] *= 0.50; // 쾌C
    }
    // TALENT:102 (C민감) - 쾌C 2배
    if (talents[102]) {
      modified[0] *= 2.00; // 쾌C
    }

    // === V감각 소질 ===
    // TALENT:103 (V둔감) - 쾌V 0.5배
    if (talents[103]) {
      modified[1] *= 0.50; // 쾌V
    }
    // TALENT:104 (V민감) - 쾌V 2배
    if (talents[104]) {
      modified[1] *= 2.00; // 쾌V
    }

    // === A감각 소질 ===
    // TALENT:105 (A둔감) - 쾌A 0.5배
    if (talents[105]) {
      modified[2] *= 0.50; // 쾌A
    }
    // TALENT:106 (A민감) - 쾌A 2배
    if (talents[106]) {
      modified[2] *= 2.00; // 쾌A
    }

    // === B감각 소질 ===
    // TALENT:107 (B둔감) - 쾌B 0.5배
    if (talents[107]) {
      modified[3] *= 0.50; // 쾌B
    }
    // TALENT:108 (B민감) - 쾌B 2배
    if (talents[108]) {
      modified[3] *= 2.00; // 쾌B
    }

    // === 자위광 (TALENT:74) ===
    if (talents[74]) {
      modified[0] *= 1.50; // 쾌C
      modified[8] *= 1.20; // 욕정
    }

    // === 음핵 비대 (TALENT:230) ===
    if (talents[230]) {
      modified[0] *= 2.00; // 쾌C
    }

    // === 쾌감 부정/억압/저항 (TALENT:32, 34, 71) ===
    if (talents[32] || talents[34] || talents[71]) {
      // 쾌감 1/3 감소, 대신 억울 증가
      const reduction = 1 - ((ctx.abilities[11] || 0) * 0.1); // 욕망에 따라 감소
      modified[0] *= reduction; // 쾌C
      modified[1] *= reduction; // 쾌V
      modified[2] *= reduction; // 쾌A
      modified[3] *= reduction; // 쾌B

      // 억울 증가
      const frustration = Math.floor(
        (source[0] + source[1] + source[2] + source[3]) / 3
      );
      modified[16] = (modified[16] || 0) + frustration; // 억울
    }

    // === 마조히스트 (TALENT:80) ===
    if (talents[80]) {
      modified[12] *= 0.50; // 고통
      if (modified[12] > 0) {
        modified[4] = (modified[4] || 0) + modified[12]; // 고통 → 쾌감 전환
      }
    }

    // === 새디스트 (TALENT:83) ===
    if (talents[83] && ctx.assiPlay === 0) {
      // 굴욕/수치심 감소
      modified[11] *= 0.50; // 수치심
    }

    // === 자존심 (TALENT:15) ===
    if (talents[15]) {
      modified[11] *= 2.00; // 수치심
      modified[14] *= 1.50; // 반감
    }

    // === 악취민감 (TALENT:62) ===
    if (talents[62]) {
      modified[14] *= 3.00; // 반감 (불결 상황에서)
    }

    // === 악취둔감 (TALENT:61) ===
    if (talents[61]) {
      modified[14] *= 0.30; // 반감
    }

    // === 애인 (TALENT:85) ===
    if (talents[85] && ctx.assiPlay === 0) {
      modified[6] *= 2.00; // 윤활
      modified[14] *= 0.10; // 반감
    }

    // === 겁쟁이 (TALENT:10) ===
    if (talents[10]) {
      modified[13] *= 2.00; // 공포
    }

    // === 앞뒤 다른 (TALENT:11) ===
    if (talents[11]) {
      modified[14] *= 1.50; // 반감
    }

    // === 수치심 (TALENT:35) ===
    if (talents[35]) {
      modified[11] *= 2.00; // 수치심
    }

    // === 미숙함 (TALENT:135) ===
    if (talents[135]) {
      modified[12] *= 1.50; // 고통
      modified[13] *= 1.30; // 공포
    }

    // === 소체 (TALENT:100) ===
    if (talents[100]) {
      modified[12] *= 1.30; // 고통
    }

    // === 처녀 (TALENT:0) - 미경험 보너스 ===
    if (talents[0]) {
      modified[10] = (modified[10] || 0) + 100; // 습득
    }

    // === 애널처녀 (TALENT:2) ===
    if (talents[2]) {
      modified[10] = (modified[10] || 0) + 50; // 습득
    }

    return modified;
  }

  /**
   * 능력치 보정 적용
   * 원본: SYSTEM_SOURCE.ERB 라인 206-500
   */
  static applyAbilityModifiers(source: number[], ctx: TrainingContext): number[] {
    const modified = [...source];
    const desire = ctx.abilities[11] || 0; // 욕망

    // 욕망이 낮으면 쾌감 감소
    const desireMultiplier = [0.10, 0.15, 0.20, 0.25, 0.30, 0.40, 0.50][desire] || 0.50;

    // 욕정 파라미터 증가 (욕망에 비례)
    modified[8] *= desireMultiplier; // 욕정

    return modified;
  }

  /**
   * 파라미터 보정 적용
   * 원본: SYSTEM_SOURCE.ERB 라인 206-500
   */
  static applyParameterModifiers(source: number[], ctx: TrainingContext): number[] {
    const modified = [...source];

    // PALAM:욕정 (욕정도) 보정
    const lustLevel = this.getParamLevel(ctx.params[5] || 0);

    // 욕정이 높으면 쾌감 증가
    const lustMultipliers = [0.50, 0.70, 1.00, 1.30, 1.80];
    const lustMult = lustMultipliers[lustLevel] || 1.00;

    modified[0] *= lustMult; // 쾌C
    modified[1] *= lustMult * 0.7; // 쾌V (조금 덜 영향받음)
    modified[2] *= lustMult * 0.5; // 쾌A (더 덜 영향받음)
    modified[3] *= lustMult; // 쾌B

    return modified;
  }

  /**
   * 관계 보정 적용
   * 원본: SYSTEM_SOURCE.ERB (관계 체크 부분)
   */
  static applyRelationModifiers(source: number[], ctx: TrainingContext): number[] {
    const modified = [...source];

    // 호감도 >= 1000 (애인 관계)
    if (ctx.charFlags[2] >= 1000 && ctx.assiPlay === 0) {
      modified[6] *= 1.50; // 윤활 증가
      modified[14] *= 0.50; // 반감 감소
      modified[8] *= 1.30; // 욕정 증가
    }

    return modified;
  }

  /**
   * 장비/의상 보정 적용
   * 원본: SYSTEM_SOURCE.ERB 라인 154-165
   */
  static applyEquipmentModifiers(source: number[], ctx: TrainingContext): number[] {
    const modified = [...source];

    // === 즈코 인형 (CFLAG:42 == 11 && CFLAG:40 & 64) ===
    if (ctx.charFlags[42] === 11 && (ctx.charFlags[40] & 64)) {
      modified[8] *= 0.10; // 욕정
      if (!ctx.equipment[90]) {
        // 촉수가 아닐 때
        modified[0] *= 0.10; // 쾌C
        modified[1] *= 0.10; // 쾌V
        modified[2] *= 0.10; // 쾌A
        modified[3] *= 0.10; // 쾌B
      }
    }

    // === 바이브 (TEQUIP:11) ===
    if (ctx.equipment[11]) {
      modified[1] += 500; // 쾌V
      modified[6] += 80; // 윤활
    }

    // === 애널바이브 (TEQUIP:13) ===
    if (ctx.equipment[13]) {
      modified[2] += 400; // 쾌A
    }

    // === 로터 (TEQUIP:10) ===
    if (ctx.equipment[10]) {
      modified[0] += 300; // 쾌C
    }

    // === 비디오 촬영 (TEQUIP:53) ===
    if (ctx.equipment[53]) {
      modified[11] *= 2.00; // 수치심
    }

    // === 야외 플레이 (TEQUIP:54) ===
    if (ctx.equipment[54]) {
      modified[11] *= 1.50; // 수치심
      modified[14] *= 1.20; // 반감
    }

    // === 수간 (TEQUIP:89) ===
    if (ctx.equipment[89]) {
      modified[11] *= 2.00; // 수치심
      modified[14] *= 1.50; // 반감
      modified[12] *= 1.30; // 고통
    }

    // === 촉수 (TEQUIP:90) ===
    if (ctx.equipment[90]) {
      modified[0] *= 1.50; // 쾌C
      modified[1] *= 1.50; // 쾌V
      modified[2] *= 1.50; // 쾌A
      modified[14] *= 1.30; // 반감
    }

    // === 슬라임 (TEQUIP:150) ===
    if (ctx.equipment[150]) {
      modified[0] *= 1.30; // 쾌C
      modified[1] *= 1.30; // 쾌V
      modified[2] *= 1.30; // 쾌A
      modified[3] *= 1.30; // 쾌B
      modified[6] *= 2.00; // 윤활
    }

    return modified;
  }

  /**
   * 파라미터 레벨 계산 (PALAMLV)
   */
  private static getParamLevel(value: number): number {
    const thresholds = [0, 10000, 30000, 100000, 300000, 1000000, 3000000, 10000000];
    for (let i = thresholds.length - 1; i >= 0; i--) {
      if (value >= thresholds[i]) return i;
    }
    return 0;
  }
}
