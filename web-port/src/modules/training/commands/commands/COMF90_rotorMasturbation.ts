/**
 * COMF90 - 로터자위 (Rotor Masturbation)
 *
 * Target masturbates using a rotor on clitoris.
 * Can combine with vibrator insertion, shower, or public settings.
 * Complex command with many equipment and location modifiers.
 * Simplified implementation focusing on core mechanics.
 */

import type { CommandPlugin, TrainingContext } from '../../types';

export const COMF90: CommandPlugin = {
  id: 90,
  name: '로터자위',
  category: 'masturbation',

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

    // ABL:자위중독
    if (target.abl.자위중독 > 0) {
      score += target.abl.자위중독 * 3;
      reasons.push(`자위중독 LV${target.abl.자위중독}(${target.abl.자위중독 * 3})`);
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

    // Negative modifiers
    if (target.talent.자제심) {
      score -= 5;
      reasons.push(`자제심(-5)`);
    }

    if (target.talent.수줍음) {
      score -= 5;
      reasons.push(`수줍음(-5)`);
    }

    if (target.talent.쾌감을_부정) {
      score -= 5;
      reasons.push(`쾌감을 부정(-5)`);
    }

    // Positive modifiers
    if (target.talent.부끄럼_없음) {
      score += 2;
      reasons.push(`부끄럼 없음(2)`);
    }

    if (target.talent.자위하기쉬움) {
      score += 5;
      reasons.push(`자위하기쉬움(5)`);
    }

    if (target.talent.쾌감에_솔직) {
      score += 5;
      reasons.push(`쾌감에 솔직(5)`);
    }

    if (target.talent.노출광) {
      score += 10;
      reasons.push(`노출광(10)`);
    }

    // Difficulty modifiers based on equipment/location
    let threshold = 35;
    if (state.location === '공개') threshold += 10;
    if (state.location === '샤워') threshold += 3;
    if (state.equipFlags.바이브) threshold += 5;
    if (state.equipFlags.애널바이브) threshold += 5;
    if (state.equipFlags.로터) threshold += 5;

    const canExecute = score >= threshold;

    return {
      canExecute,
      score,
      reasons: [...reasons, `= ${score}`, `${canExecute ? '>' : score === threshold ? '=' : '<'} 실행치 ${threshold}`]
    };
  },

  async execute(state: GameState, target: Character, player: Character): Promise<void> {
    state.saveStr[0] = '로터자위';

    // LOSEBASE
    state.loseBase.health += 10;
    state.loseBase.stamina += 80;

    // SOURCE calculation
    const source: Record<number, number> = {};
    source[14] = 400; // Corruption

    // Video recording
    if (state.location === '비디오') {
      source[10] = 50;
      source[11] = 100;
    }

    // ABL:C감각 - clitoral sensation
    if (target.abl.C감각 === 0) {
      source[0] = 115;
      source[12] = 2000;
      source[13] = 500;
    } else if (target.abl.C감각 === 1) {
      source[0] = 250;
      source[12] = 2300;
      source[13] = 800;
    } else if (target.abl.C감각 === 2) {
      source[0] = 750;
      source[12] = 2600;
      source[13] = 1200;
    } else if (target.abl.C감각 === 3) {
      source[0] = 1500;
      source[12] = 2900;
      source[13] = 1900;
    } else if (target.abl.C감각 === 4) {
      source[0] = 2300;
      source[12] = 3200;
      source[13] = 2500;
    } else {
      source[0] = 3200;
      source[12] = 3500;
      source[13] = 3000;
    }

    // ABL:B감각 - breast sensation
    if (target.abl.B감각 === 0) source[17] = 95;
    else if (target.abl.B감각 === 1) source[17] = 200;
    else if (target.abl.B감각 === 2) source[17] = 600;
    else if (target.abl.B감각 === 3) source[17] = 1150;
    else if (target.abl.B감각 === 4) source[17] = 2000;
    else source[17] = 3000;

    // ABL:기교 multipliers
    let techMult = 1.00;
    if (target.abl.기교 === 0) {
      source[4] = 100;
      techMult = 0.30;
    } else if (target.abl.기교 === 1) {
      source[4] = 160;
      techMult = 0.70;
    } else if (target.abl.기교 === 2) {
      source[4] = 220;
      techMult = 1.00;
    } else if (target.abl.기교 === 3) {
      source[4] = 280;
      techMult = 1.20;
    } else if (target.abl.기교 === 4) {
      source[4] = 340;
      techMult = 1.40;
    } else {
      source[4] = 400;
      techMult = 1.60;
    }

    source[0] *= techMult;
    source[17] *= techMult;

    // ABL:자위중독
    if (target.abl.자위중독 === 0) {
      source[7] = 0;
    } else if (target.abl.자위중독 === 1) {
      source[7] = 100;
      source[0] *= 1.10;
      source[17] *= 1.10;
    } else if (target.abl.자위중독 === 2) {
      source[7] = 300;
      source[0] *= 1.20;
      source[17] *= 1.20;
    } else if (target.abl.자위중독 === 3) {
      source[7] = 800;
      source[0] *= 1.30;
      source[17] *= 1.30;
    } else if (target.abl.자위중독 === 4) {
      source[7] = 1500;
      source[0] *= 1.50;
      source[17] *= 1.50;
    } else {
      source[7] = 2500;
      source[0] *= 1.70;
      source[17] *= 1.70;
    }

    // Public/outdoor exhibitionism modifiers
    if (state.location === '공개' || state.location === '야외') {
      if (target.abl.노출벽 >= 1) {
        source[7] += 100 * target.abl.노출벽;
        source[0] *= 1.10;
        source[12] *= 1.20;
      }

      if (target.talent.노출광) {
        source[7] += 500;
        source[0] *= 1.20;
        source[12] *= 1.50;
      }
    }

    // Stain transfers
    target.stains.finger |= target.stains.breast;
    target.stains.breast |= target.stains.finger;
    target.stains.finger |= target.stains.vagina;
    target.stains.vagina |= target.stains.finger;

    // Shower cleans stains
    if (state.location === '샤워') {
      target.stains.finger = 0;
      target.stains.penis = 2;
      target.stains.vagina = 1;
      target.stains.anus = 8;
      target.palam.윤활 = Math.floor(target.palam.윤활 / 2);
    }

    // Experience gain
    if (state.location === '비디오' || state.location === '야외') {
      target.experience.자위 = (target.experience.자위 || 0) + 2;
      target.experience.지도자위 = (target.experience.지도자위 || 0) + 2;

      if (!target.flags.publicMasturbation) {
        target.experience.이상 = (target.experience.이상 || 0) + 1;
        target.flags.publicMasturbation = true;
      }
    } else {
      target.experience.자위 = (target.experience.자위 || 0) + 1;
      target.experience.지도자위 = (target.experience.지도자위 || 0) + 1;
    }

    // Lesbian/gay experience
    if (!target.talent.オトコ && !player.talents.オトコ) {
      target.experience.레즈 = (target.experience.레즈 || 0) + 3;
    } else if (target.talent.オトコ && player.talents.オトコ) {
      target.experience.호모 = (target.experience.호모 || 0) + 3;
    }

    context.tflags[200] = 2; // Submission mark 2
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
