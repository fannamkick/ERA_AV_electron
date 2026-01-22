/**
 * COMF88 - 제모 (Shaving / Hair Removal)
 *
 * Removes pubic hair from the target.
 * Extreme humiliation command, especially in public settings.
 */

import type { CommandPlugin, TrainingContext } from '../../types';

export const COMF88: CommandPlugin = {
  id: 88,
  name: '제모',
  category: 'extreme',

  isAvailable(context: TrainingContext): boolean {
    const reasons: string[] = [];
    let score = 0;

    // ABL:욕망
    if (target.abl.욕망 > 0) {
      score += target.abl.욕망 * 3;
      reasons.push(`욕망 LV${target.abl.욕망}(${target.abl.욕망 * 3})`);
    }

    // ABL:노출벽
    if (target.abl.노출벽 > 0) {
      score += target.abl.노출벽 * 4;
      reasons.push(`노출벽 LV${target.abl.노출벽}(${target.abl.노출벽 * 4})`);
    }

    // MARK:쾌락각인
    if (target.mark.쾌락각인 > 0) {
      score += target.mark.쾌락각인 * 3;
      reasons.push(`쾌락각인 LV${target.mark.쾌락각인}(${target.mark.쾌락각인 * 3})`);
    }

    // PALAM:욕정
    const lustLevel = calculatePalamLevel(target.palam.욕정);
    if (lustLevel > 0) {
      score += lustLevel * 3;
      reasons.push(`욕정 LV${lustLevel}(${lustLevel * 3})`);
    }

    // TALENT:자제심
    if (target.talent.자제심) {
      score -= 5;
      reasons.push(`자제심(-5)`);
    }

    // TALENT:수줍음
    if (target.talent.수줍음) {
      score -= 5;
      reasons.push(`수줍음(-5)`);
    }

    // TALENT:부끄럼 없음
    if (target.talent.부끄럼_없음) {
      score += 2;
      reasons.push(`부끄럼 없음(2)`);
    }

    // TALENT:노출광
    if (target.talent.노출광) {
      score += 10;
      reasons.push(`노출광(10)`);
    }

    // Public/outdoor adds difficulty
    let threshold = 36;
    if (state.location === '공개' || state.location === '야외') {
      threshold += 10;
    }

    const canExecute = score >= threshold;

    return {
      canExecute,
      score,
      reasons: [...reasons, `= ${score}`, `${canExecute ? '>' : score === threshold ? '=' : '<'} 실행치 ${threshold}`]
    };
  },

  async execute(state: GameState, target: Character, player: Character): Promise<void> {
    state.saveStr[0] = '제모';

    // LOSEBASE
    state.loseBase.health += 5;
    state.loseBase.stamina += 100;

    // SOURCE calculation
    const source: Record<number, number> = {};
    source[14] = 1000; // Corruption

    // Rope binding increases corruption
    if (state.equipFlags.밧줄) {
      source[14] += 3000;
    }

    // Video recording
    if (state.location === '비디오') {
      source[10] = 50;
      source[11] = 100;
    }

    // PALAM:욕정
    const lustLevel = calculatePalamLevel(target.palam.욕정);
    if (lustLevel === 0) source[12] = 3600;
    else if (lustLevel === 1) source[12] = 3900;
    else if (lustLevel === 2) source[12] = 4200;
    else if (lustLevel === 3) source[12] = 4500;
    else source[12] = 5000;

    // ABL:노출벽
    if (target.abl.노출벽 === 0) {
      source[7] = 0;
      source[13] = 7000;
    } else if (target.abl.노출벽 === 1) {
      source[7] = 60;
      source[13] = 6000;
    } else if (target.abl.노출벽 === 2) {
      source[7] = 200;
      source[13] = 5000;
    } else if (target.abl.노출벽 === 3) {
      source[7] = 600;
      source[13] = 4000;
    } else if (target.abl.노출벽 === 4) {
      source[7] = 1000;
      source[13] = 3000;
    } else {
      source[7] = 2000;
      source[13] = 2000;
    }

    // ABL:마조끼
    if (target.abl.마조끼 === 0) {
      source[7] *= 0.80;
      source[12] *= 1.00;
      source[10] = 100;
      source[11] = 100;
    } else if (target.abl.마조끼 === 1) {
      source[7] *= 1.00;
      source[12] *= 1.20;
      source[10] = 200;
      source[11] = 300;
    } else if (target.abl.마조끼 === 2) {
      source[7] *= 1.30;
      source[12] *= 1.40;
      source[10] = 400;
      source[11] = 700;
    } else if (target.abl.마조끼 === 3) {
      source[7] *= 1.40;
      source[12] *= 1.50;
      source[10] = 700;
      source[11] = 1200;
    } else if (target.abl.마조끼 === 4) {
      source[7] *= 1.70;
      source[12] *= 1.70;
      source[10] = 1100;
      source[11] = 1800;
    } else {
      source[7] *= 2.00;
      source[12] *= 2.00;
      source[10] = 1500;
      source[11] = 2500;
    }

    // Location modifiers
    if (state.location === '공개' || state.location === '야외') {
      source[12] *= 2.50;
      source[14] *= 2.50;
    } else if (state.location === '큰거울') {
      source[12] *= 1.50;
      source[14] *= 1.50;
    } else if (state.location === '욕실') {
      source[12] *= 0.50;
      source[14] *= 0.50;
    }

    // Personality shame multiplier
    let shameMult = 100;
    const urinationExp = target.experience.방뇨경험 || 0;
    if (urinationExp < 10) shameMult *= 3.00;
    else if (urinationExp < 50) shameMult *= 2.50;
    else if (urinationExp < 150) shameMult *= 2.00;
    else if (urinationExp < 500) shameMult *= 1.00;
    else if (urinationExp < 1500) shameMult *= 0.80;
    else shameMult *= 0.60;

    // Personality modifiers
    if (target.talent.겁쟁이) shameMult *= 1.20;
    if (target.talent.반항적) shameMult *= 2.00;
    if (target.talent.프라이드_높음) shameMult *= 2.00;
    if (target.talent.프라이드_낮음) shameMult *= 0.80;
    if (target.talent.자제심) shameMult *= 1.50;
    if (target.talent.감정부족) shameMult *= 0.60;
    if (target.talent.튀고_싶어함) shameMult *= 0.80;
    if (target.talent.억압) shameMult *= 3.00;
    if (target.talent.저항) shameMult *= 3.00;
    if (target.talent.수줍음) shameMult *= 3.50;
    if (target.talent.부끄럼_없음) shameMult *= 0.50;

    // TALENT:노출광
    if (target.talent.노출광) {
      source[7] += 500;
      source[12] *= 1.50;
    }

    source[14] += shameMult * 5;

    // Stain transfer
    target.stains.vagina |= player.stains.finger;
    player.stains.finger |= target.stains.vagina;

    // Lesbian/gay experience
    if (!target.talent.オトコ && !player.talents.オトコ) {
      target.experience.레즈 = (target.experience.레즈 || 0) + 2;
    } else if (target.talent.オトコ && player.talents.オトコ) {
      target.experience.호모 = (target.experience.호모 || 0) + 2;
    }

    // Love experience if in relationship
    if (target.affection >= 1000 && state.assistantPlayMode === 0) {
      target.experience.애정경험 = (target.experience.애정경험 || 0) + 2;
    }

    // Set shaved flag
    target.flags.isShaved = true;

    context.tflags[200] = 3; // Submission mark 3
  }
};

function calculatePalamLevel(value: number): number {
  if (value < 100) return 0;
  if (value < 300) return 1;
  if (value < 600) return 2;
  if (value < 1000) return 3;
  if (value < 1500) return 4;
  return 5;
}
