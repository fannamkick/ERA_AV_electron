/**
 * COMF80 - 이라마치오 (Irrumatio / Deep Throat)
 *
 * Command where trainer forcefully thrusts into target's mouth.
 * Can transition to 3P if conditions are met.
 */

import type { CommandPlugin, TrainingContext } from '../../types';

export const COMF80: CommandPlugin = {
  id: 80,
  name: '이라마치오',
  category: 'service',

  isAvailable(context: TrainingContext): boolean {
    const reasons: string[] = [];
    let score = 0;

    // First kiss confirmation check
    // const firstKissResult = await confirmFirstKiss(state, target, player);
    // if (!firstKissResult) return { canExecute: false, score: 0, reasons: ['First kiss cancelled'] };

    // Check for 3P transition
    if (state.prevCommand === 64) {
      // Previous was 3P - check if can continue to 3P
      // If yes, jump to COM64
    } else if ((state.assistantPlayMode && context.tflags[50] === 0) ||
               (!state.assistantPlayMode && context.tflags[50])) {
      // Trainer switched between master/assistant
      if (state.prevCommand === 20 || state.prevCommand === 21 ||
          state.prevCommand === 27 || state.prevCommand === 64) {
        // Previous was missionary/doggy/anal doggy/3P - can transition to 3P
      }
    }

    // Execution check only if not forced by restraints or willingness
    if (player.talents.거근 === 0 || target.talent.쾌락에_익숙) {
      // Common order elements
      // score += await calculateCommonOrderScore(target, player);

      // ABL:욕망
      if (target.abl.욕망 > 0) {
        score += target.abl.욕망 * 1;
        reasons.push(`욕망 LV${target.abl.욕망}(${target.abl.욕망 * 1})`);
      }

      // ABL:봉사정신
      if (target.abl.봉사정신 > 0) {
        score += target.abl.봉사정신 * 4;
        reasons.push(`봉사정신 LV${target.abl.봉사정신}(${target.abl.봉사정신 * 4})`);
      }

      // ABL:정액중독
      if (target.abl.정액중독 > 0) {
        score += target.abl.정액중독 * 3;
        reasons.push(`정액중독 LV${target.abl.정액중독}(${target.abl.정액중독 * 3})`);
      }

      // MARK:쾌락각인
      if (target.mark.쾌락각인 > 0) {
        score += target.mark.쾌락각인 * 1;
        reasons.push(`쾌락각인 LV${target.mark.쾌락각인}(${target.mark.쾌락각인 * 1})`);
      }

      // PALAM:욕정
      const lustLevel = calculatePalamLevel(target.palam.욕정);
      if (lustLevel > 0) {
        score += lustLevel * 1;
        reasons.push(`욕정 LV${lustLevel}(${lustLevel * 1})`);
      }

      // TALENT:수줍음
      if (target.talent.수줍음) {
        score -= 1;
        reasons.push(`수줍음(-1)`);
      }

      // TALENT:악취둔감
      if (target.talent.악취둔감) {
        score += 1;
        reasons.push(`악취둔감(1)`);
      }

      // TALENT:악취민감
      if (target.talent.악취민감) {
        score -= 3;
        reasons.push(`악취민감(-3)`);
      }

      // TALENT:헌신적
      if (target.talent.헌신적) {
        score += 6;
        reasons.push(`헌신적(6)`);
      }

      // TALENT:쾌감을 부정
      if (target.talent.쾌감을_부정) {
        score -= 1;
        reasons.push(`쾌감을 부정(-1)`);
      }

      // TALENT:愛
      if (target.talent.愛 && state.assistantPlayMode === 0) {
        score += 5;
        reasons.push(`愛(5)`);
      }

      // Trainer is futa
      if (player.talents.후타나리) {
        score += 8;
        reasons.push(`후타나리(8)`);
      }

      // Dirt calculation
      let dirtValue = 0;
      if (player.stains.penis & 1) dirtValue += 1;
      if (player.stains.penis & 4) dirtValue += 3;
      if (player.stains.penis & 8) dirtValue += 7;
      if (player.stains.penis & 16) dirtValue += 15;

      if (target.talent.악취둔감) dirtValue = Math.floor(dirtValue / 3);
      if (target.talent.악취민감) dirtValue *= 2;

      if (dirtValue > 0) {
        score -= dirtValue;
        const odorText = target.talent.악취둔감 ? ', 악취둔감' : target.talent.악취민감 ? ', 악취민감' : '';
        reasons.push(`더러움 있음${odorText}(-${dirtValue})`);
      }

      const threshold = 36;
      const canExecute = score >= threshold;

      return {
        canExecute,
        score,
        reasons: [...reasons, `= ${score}`, `${canExecute ? '>' : score === threshold ? '=' : '<'} 실행치 ${threshold}`]
      };
    }

    return { canExecute: true, score: 100, reasons: ['Auto-execute due to restraints/willingness'] };
  },

  async execute(state: GameState, target: Character, player: Character): Promise<void> {
    state.saveStr[0] = '이라마치오';

    // Ejaculation gauge calculation
    let ejacGauge = 0;
    if (target.abl.기교 === 0) ejacGauge = 1200;
    else if (target.abl.기교 === 1) ejacGauge = 1700;
    else if (target.abl.기교 === 2) ejacGauge = 2300;
    else if (target.abl.기교 === 3) ejacGauge = 3000;
    else if (target.abl.기교 === 4) ejacGauge = 3600;
    else ejacGauge = 4200;

    // Obedience multiplier
    if (target.abl.従順 === 0) ejacGauge *= 0.80;
    else if (target.abl.従順 === 1) ejacGauge *= 0.90;
    else if (target.abl.従順 === 2) ejacGauge *= 1.00;
    else if (target.abl.従順 === 3) ejacGauge *= 1.10;
    else if (target.abl.従順 === 4) ejacGauge *= 1.20;
    else ejacGauge *= 1.30;

    // Service spirit multiplier
    if (target.abl.봉사정신 === 0) ejacGauge *= 0.50;
    else if (target.abl.봉사정신 === 1) ejacGauge *= 0.80;
    else if (target.abl.봉사정신 === 2) ejacGauge *= 1.20;
    else if (target.abl.봉사정신 === 3) ejacGauge *= 1.50;
    else if (target.abl.봉사정신 === 4) ejacGauge *= 1.80;
    else ejacGauge *= 2.40;

    // Semen addiction multiplier
    if (target.abl.정액중독 === 0) ejacGauge *= 1.00;
    else if (target.abl.정액중독 === 1) ejacGauge *= 1.20;
    else if (target.abl.정액중독 === 2) ejacGauge *= 1.30;
    else if (target.abl.정액중독 === 3) ejacGauge *= 1.50;
    else if (target.abl.정액중독 === 4) ejacGauge *= 1.70;
    else ejacGauge *= 2.00;

    // Tongue skill multiplier
    if (target.talent.혀놀림) ejacGauge *= 2.00;

    // Player's C sensitivity
    if (player.abl.C감각 === 0) ejacGauge *= 1.00;
    else if (player.abl.C감각 === 1) ejacGauge *= 1.50;
    else if (player.abl.C감각 === 2) ejacGauge *= 2.00;
    else if (player.abl.C감각 === 3) ejacGauge *= 2.50;
    else if (player.abl.C감각 === 4) ejacGauge *= 3.50;
    else ejacGauge *= 5.00;

    if (player.talents.후타나리 || player.talents.オトコ) {
      player.base.ejaculationGauge += Math.floor(ejacGauge);
    }

    // SOURCE calculation
    const source: Record<number, number> = {};

    // LOSEBASE
    if (target.talent.절륜) {
      state.loseBase.health += 100;
      state.loseBase.stamina += 70;
    } else {
      state.loseBase.health += 200;
      state.loseBase.stamina += 150;
    }

    source[6] = 200;
    source[13] = 1500;
    source[14] = 500;
    source[16] = 500;

    // Dirt value
    let dirtValue = 0;
    if (player.stains.penis & 1) dirtValue += 1;
    if (player.stains.penis & 4) dirtValue += 3;
    if (player.stains.penis & 8) dirtValue += 7;
    if (player.stains.penis & 16) dirtValue += 15;
    if (target.talent.악취둔감) dirtValue = Math.floor(dirtValue / 3);
    if (target.talent.악취민감) dirtValue *= 2;
    source[8] = dirtValue * 40 + 100;

    // ABL:봉사정신
    if (target.abl.봉사정신 === 0) {
      source[4] = 420;
      source[5] = 150;
      source[8] *= 4.00;
    } else if (target.abl.봉사정신 === 1) {
      source[4] = 500;
      source[5] = 300;
      source[8] *= 2.50;
    } else if (target.abl.봉사정신 === 2) {
      source[4] = 580;
      source[5] = 600;
      source[8] *= 1.50;
    } else if (target.abl.봉사정신 === 3) {
      source[4] = 660;
      source[5] = 900;
      source[8] *= 1.00;
    } else if (target.abl.봉사정신 === 4) {
      source[4] = 740;
      source[5] = 1500;
      source[8] *= 0.50;
    } else {
      source[4] = 820;
      source[5] = 2200;
      source[8] *= 0.10;
    }

    // ABL:기교 multipliers
    let techMult = 1.00;
    if (target.abl.기교 === 0) techMult = 0.50;
    else if (target.abl.기교 === 1) techMult = 0.80;
    else if (target.abl.기교 === 2) techMult = 1.00;
    else if (target.abl.기교 === 3) techMult = 1.20;
    else if (target.abl.기교 === 4) techMult = 1.50;
    else techMult = 2.00;
    source[4] *= techMult;
    source[5] *= techMult;

    // Ejaculation check
    const ejacThreshold = player.base.maxEjaculation;
    const currentEjac = player.base.ejaculationGauge;
    let ejacLevel = 0;
    if (currentEjac > ejacThreshold * 2) ejacLevel = 2;
    else if (currentEjac > ejacThreshold) ejacLevel = 1;

    if (ejacLevel > 0) {
      source[4] *= 3.00;

      // Semen addiction check
      if (target.abl.정액중독 === 0) {
        source[7] = 0;
        source[5] *= 2.00;
        source[13] *= 4.00;
      } else if (target.abl.정액중독 === 1) {
        source[7] = 500;
        source[5] *= 3.00;
        source[13] *= 3.00;
      } else if (target.abl.정액중독 === 2) {
        source[7] = 1200;
        source[5] *= 4.00;
        source[13] *= 2.50;
      } else if (target.abl.정액중독 === 3) {
        source[7] = 3000;
        source[5] *= 6.00;
        source[13] *= 2.00;
      } else if (target.abl.정액중독 === 4) {
        source[7] = 6000;
        source[5] *= 9.00;
        source[13] *= 1.50;
      } else {
        source[7] = 12000;
        source[5] *= 15.00;
        source[13] *= 1.00;
      }
    }

    // Large ejaculation
    if (ejacLevel === 2) {
      source[7] = (source[7] || 0) * 2.00;
      source[5] *= 1.50;

      player.experience.사정 += 2;
      target.experience.정액 += 9;
      // Display: 대량사정⚡
      // Display: 정액경험 +9

      player.stains.penis |= 4;
      player.base.ejaculationGauge -= ejacThreshold * 2;
      if (player.base.ejaculationGauge >= ejacThreshold) {
        player.base.ejaculationGauge = ejacThreshold - 1;
      }
      context.tflags[0] = 2; // Oral ejaculation flag
    } else if (ejacLevel === 1) {
      player.experience.사정 += 1;
      target.experience.정액 += 3;
      // Display: 사정⚡
      // Display: 정액경험 +3

      player.stains.penis |= 4;
      player.base.ejaculationGauge -= ejacThreshold;
      if (player.base.ejaculationGauge >= ejacThreshold) {
        player.base.ejaculationGauge = ejacThreshold - 1;
      }
      context.tflags[0] = 1;
    }

    // Fellatio experience
    target.experience.펠라 += 1;

    // Stain transfer: slave mouth ⇔ trainer penis
    target.stains.mouth |= player.stains.penis;
    player.stains.penis |= target.stains.mouth;

    // If service spirit LV2+ and technique LV2+, lick clean
    if (target.abl.봉사정신 >= 2 && target.abl.기교 >= 2) {
      player.stains.penis = 2;
      if (ejacLevel >= 1) {
        context.tflags[8] = 1;
      }
    }

    // First kiss flags
    context.tflags[621] |= 1;
    context.tflags[621] |= 2;

    // Lesbian/gay experience
    if (!target.talent.オトコ && !player.talents.オトコ) {
      target.experience.레즈 += 7;
    } else if (target.talent.オトコ && player.talents.オトコ) {
      target.experience.호모 += 7;
    }

    // C experience high enough check
    if (state.assistantPlayMode === 0 && target.experience.C >= 600) {
      context.tflags[30] += 1;
    }

    // If trainer is futa, halve submission
    if (player.talents.후타나리) {
      source[13] /= 2;
    }

    context.tflags[100] = 1;
    context.tflags[200] = 2; // Submission mark 2

    // Apply source values
    // applySourceValues(target, source);
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
