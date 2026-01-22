/**
 * COMF87 - 피어싱 (Piercing)
 *
 * Attaches or removes piercings on various body parts.
 * Locations: nipple (2), navel (1), labia (2), clitoris/penis (1), tongue (1)
 * Very extreme command with significant pain and submission effects.
 * Simplified implementation - actual ERB has complex UI for selecting locations.
 */

import type { CommandPlugin, TrainingContext } from '../../types';

export const COMF87: CommandPlugin = {
  id: 87,
  name: '피어싱',
  category: 'extreme',

  isAvailable(context: TrainingContext): boolean {
    const reasons: string[] = [];
    let score = 0;

    // ABL:욕망
    if (target.abl.욕망 > 0) {
      score += target.abl.욕망 * 3;
      reasons.push(`욕망 LV${target.abl.욕망}(${target.abl.욕망 * 3})`);
    }

    // ABL:마조끼
    if (target.abl.마조끼 > 0) {
      score += target.abl.마조끼 * 4;
      reasons.push(`마조끼 LV${target.abl.마조끼}(${target.abl.마조끼 * 4})`);
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

    // TALENT:호기심
    if (target.talent.호기심) {
      score -= 3;
      reasons.push(`호기심(-3)`);
    }

    // TALENT:보수적
    if (target.talent.보수적) {
      score -= 3;
      reasons.push(`보수적(-3)`);
    }

    // TALENT:아픔에 약함
    if (target.talent.아픔에_약함) {
      score -= 3;
      reasons.push(`아픔에 약함(-3)`);
    }

    // TALENT:아픔에 강함
    if (target.talent.아픔에_강함) {
      score += 3;
      reasons.push(`아픔에 강함(3)`);
    }

    // TALENT:愛
    if (target.talent.愛 && state.assistantPlayMode === 0) {
      score += 5;
      reasons.push(`愛(5)`);
    }

    // TALENT:마조
    if (target.talent.마조) {
      score += 10;
      reasons.push(`마조(10)`);
    }

    // Threshold varies by location (36-44)
    const threshold = 40;
    const canExecute = score >= threshold;

    return {
      canExecute,
      score,
      reasons: [...reasons, `= ${score}`, `${canExecute ? '>' : score === threshold ? '=' : '<'} 실행치 ${threshold}`]
    };
  },

  async execute(state: GameState, target: Character, player: Character): Promise<void> {
    state.saveStr[0] = '피어싱';

    // LOSEBASE
    state.loseBase.health += 50;
    state.loseBase.stamina += 100;

    // SOURCE calculation
    const source: Record<number, number> = {};
    source[6] = 3000; // Pain
    source[13] = 1000; // Submission
    source[14] = 3000; // Corruption

    // Location-specific additions (simplified - using nipple as example)
    source[6] += 4000;
    source[13] += 9000;
    source[14] += 12000;
    state.loseBase.health += 50;

    // ABL:마조끼 modifiers
    if (target.abl.마조끼 === 1) {
      source[13] *= 1.20;
      source[14] *= 0.90;
    } else if (target.abl.마조끼 === 2) {
      source[13] *= 1.40;
      source[14] *= 0.80;
    } else if (target.abl.마조끼 === 3) {
      source[13] *= 1.60;
      source[14] *= 0.50;
    } else if (target.abl.마조끼 === 4) {
      source[13] *= 1.80;
      source[14] *= 0.30;
    } else if (target.abl.마조끼 >= 5) {
      source[13] *= 2.00;
      source[14] *= 0.10;
    }

    // ABL:노출벽 modifiers
    if (target.abl.노출벽 === 2) source[14] *= 0.90;
    else if (target.abl.노출벽 === 3) source[14] *= 0.80;
    else if (target.abl.노출벽 === 4) source[14] *= 0.70;
    else if (target.abl.노출벽 >= 5) source[14] *= 0.60;

    // Video recording
    if (state.location === '비디오') {
      source[13] *= 1.50;
      source[14] *= 1.50;
    }

    // First piercing (if not navel) gives abnormal experience
    if (!target.flags.hasPiercing) {
      target.experience.이상 = (target.experience.이상 || 0) + 1;
      target.flags.hasPiercing = true;
    }

    // Nipple piercing experience
    target.experience.젖꼭지경험 = (target.experience.젖꼭지경험 || 0) + 10;

    // Stain transfer
    target.stains.breast |= player.stains.finger;
    player.stains.finger |= target.stains.breast;
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
