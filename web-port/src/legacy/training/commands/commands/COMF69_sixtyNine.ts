/**
 * COMF69 - 식스나인 (69 Position)
 *
 * Special command where trainer and target simultaneously stimulate each other's genitals orally.
 * Triggered by specific command sequences with the same trainer.
 *
 * Trigger conditions:
 * - Previous and current trainer are the same
 * - Conditions from COM_ABLE69 are met
 * - Sequence combinations:
 *   펠라치오〔させる〕⇔펠라한다 (trainer male/futa with target male/futa)
 *   펠라치오〔させる〕⇔커닐링구스〔する〕(trainer male with target female)
 *   커닐링구스강제⇔펠라한다 (trainer female with target male/futa)
 *   커닐링구스강제⇔커닐링구스〔する〕(trainer female with target female)
 */

import type { CommandPlugin, TrainingContext } from '../../types';
import { calculateSourceValues } from '../calculators/sourceCalculator';
import { checkCommandExecution } from '../calculators/executionChecker';

export const COMF69: CommandPlugin = {
  id: 69,
  name: '식스나인',
  category: 'special',

  isAvailable(context: TrainingContext): boolean {
    const reasons: string[] = [];
    let score = 0;

    // Incest check
    context.tflags[14] = 0;
    // Call INCEST function (would be implemented separately)
    // const incestType = checkIncest(target, player);

    // COM_ORDER - common order elements
    // score += calculateCommonOrderScore(target, player);

    // ABL:욕망 (Desire)
    if (target.abl.욕망 > 0) {
      score += target.abl.욕망 * 2;
      reasons.push(`욕망 LV${target.abl.욕망}(${target.abl.욕망 * 2})`);
    }

    // ABL:봉사정신 (Service Spirit)
    if (target.abl.봉사정신 > 0) {
      score += target.abl.봉사정신 * 4;
      reasons.push(`봉사정신 LV${target.abl.봉사정신}(${target.abl.봉사정신 * 4})`);
    }

    // MARK:쾌락각인 (Pleasure Mark)
    if (target.mark.쾌락각인 > 0) {
      score += target.mark.쾌락각인 * 2;
      reasons.push(`쾌락각인 LV${target.mark.쾌락각인}(${target.mark.쾌락각인 * 2})`);
    }

    // PALAM:욕정 (Lust)
    const lustLevel = calculatePalamLevel(target.palam.욕정);
    if (lustLevel > 0) {
      score += lustLevel * 2;
      reasons.push(`욕정 LV${lustLevel}(${lustLevel * 2})`);
    }

    // TALENT:수줍음 (Shy)
    if (target.talent.수줍음) {
      score -= 3;
      reasons.push(`수줍음(-3)`);
    }

    // TALENT:악취둔감 (Odor Insensitive)
    if (target.talent.악취둔감) {
      score += 3;
      reasons.push(`악취둔감(3)`);
    }

    // TALENT:악취민감 (Odor Sensitive)
    if (target.talent.악취민감) {
      score -= 3;
      reasons.push(`악취민감(-3)`);
    }

    // TALENT:헌신적 (Devoted)
    if (target.talent.헌신적) {
      score += 6;
      reasons.push(`헌신적(6)`);
    }

    // TALENT:쾌감에 솔직 (Honest with Pleasure)
    if (target.talent.쾌감에_솔직) {
      score += 3;
      reasons.push(`쾌감에 솔직(3)`);
    }

    // TALENT:쾌감을 부정 (Denies Pleasure)
    if (target.talent.쾌감을_부정) {
      score -= 3;
      reasons.push(`쾌감을 부정(-3)`);
    }

    // TALENT:愛 (Love) - only if not assistant play
    if (target.talent.愛 && state.assistantPlayMode === 0) {
      score += 5;
      reasons.push(`愛(5)`);
    }

    // TEQUIP:しあわせ草 (Aphrodisiac)
    if (state.targetEquip.aphrodisiac) {
      score += 8;
      reasons.push(`しあわせ草(8)`);
    }

    // Dirt check
    let dirtPenalty = 0;
    // Love juice dirt
    if (player.stains.genital & 1) dirtPenalty += 1;
    // Semen dirt
    if (player.stains.genital & 4) dirtPenalty += 3;
    // Anal dirt
    if (player.stains.genital & 8) dirtPenalty += 7;
    if (player.stains.genital & 16) dirtPenalty += 15;

    // Adjust for odor talents
    if (target.talent.악취둔감) dirtPenalty = Math.floor(dirtPenalty / 3);
    if (target.talent.악취민감) dirtPenalty *= 2;

    if (dirtPenalty > 0) {
      score -= dirtPenalty;
      const odorText = target.talent.악취둔감 ? ', 악취둔감' : target.talent.악취민감 ? ', 악취민감' : '';
      reasons.push(`더러움 있음${odorText}(-${dirtPenalty})`);
    }

    const threshold = 33;
    const canExecute = score >= threshold;

    return {
      canExecute,
      score,
      reasons: [...reasons, `= ${score}`, `${canExecute ? '>' : score === threshold ? '=' : '<'} 실행치 ${threshold}`]
    };
  },

  async execute(state: GameState, target: Character, player: Character): Promise<void> {
    const selectCom = 69;
    state.saveStr[0] = '식스나인';

    // Call TRAIN_MESSAGE_B
    // await displayTrainMessage(state, 'B');

    // Ejaculation gauge calculation
    let ejacGauge = 0;

    // Based on ABL:기교 (Technique)
    if (target.abl.기교 === 0) ejacGauge = 1200;
    else if (target.abl.기교 === 1) ejacGauge = 1700;
    else if (target.abl.기교 === 2) ejacGauge = 2300;
    else if (target.abl.기교 === 3) ejacGauge = 3000;
    else if (target.abl.기교 === 4) ejacGauge = 3600;
    else ejacGauge = 4200;

    // ABL:從順 (Obedience)
    if (target.abl.従順 === 0) ejacGauge *= 0.80;
    else if (target.abl.従順 === 1) ejacGauge *= 0.90;
    else if (target.abl.従順 === 2) ejacGauge *= 1.00;
    else if (target.abl.従順 === 3) ejacGauge *= 1.10;
    else if (target.abl.従順 === 4) ejacGauge *= 1.20;
    else ejacGauge *= 1.30;

    // ABL:봉사정신 (Service Spirit)
    if (target.abl.봉사정신 === 0) ejacGauge *= 0.50;
    else if (target.abl.봉사정신 === 1) ejacGauge *= 0.80;
    else if (target.abl.봉사정신 === 2) ejacGauge *= 1.20;
    else if (target.abl.봉사정신 === 3) ejacGauge *= 1.50;
    else if (target.abl.봉사정신 === 4) ejacGauge *= 1.80;
    else ejacGauge *= 2.40;

    // ABL:정액중독 (Semen Addiction)
    if (target.abl.정액중독 === 0) ejacGauge *= 1.00;
    else if (target.abl.정액중독 === 1) ejacGauge *= 1.20;
    else if (target.abl.정액중독 === 2) ejacGauge *= 1.30;
    else if (target.abl.정액중독 === 3) ejacGauge *= 1.50;
    else if (target.abl.정액중독 === 4) ejacGauge *= 1.70;
    else ejacGauge *= 2.00;

    // TALENT:혀놀림 (Tongue Skill)
    if (target.talent.혀놀림) ejacGauge *= 2.00;

    // Player's ABL:C감각 (C Sensitivity)
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

    // LOSEBASE calculation
    if (target.talent.절륜) {
      state.loseBase.health += 10;
      state.loseBase.stamina += 80;
    } else {
      state.loseBase.health += 20;
      state.loseBase.stamina += 160;
    }

    source[9] = 100;   // Unknown
    source[10] = 900;  // Unknown
    source[12] = 1400; // Shame
    source[13] = 1300; // Submission
    source[14] = 800;  // Corruption

    // Dirt calculation from above
    let dirtValue = 0;
    if (player.stains.genital & 1) dirtValue += 1;
    if (player.stains.genital & 4) dirtValue += 3;
    if (player.stains.genital & 8) dirtValue += 7;
    if (player.stains.genital & 16) dirtValue += 15;
    if (target.talent.악취둔감) dirtValue = Math.floor(dirtValue / 3);
    if (target.talent.악취민감) dirtValue *= 2;
    source[8] = dirtValue * 80 + 50;

    // ABL:C감각
    if (target.abl.C감각 === 0) source[0] = 40;
    else if (target.abl.C감각 === 1) source[0] = 160;
    else if (target.abl.C감각 === 2) source[0] = 700;
    else if (target.abl.C감각 === 3) source[0] = 1500;
    else if (target.abl.C감각 === 4) source[0] = 2400;
    else source[0] = 3300;

    // Trainer's TALENT:혀놀림
    if (player.talents.혀놀림) {
      source[0] *= 2.00;
      source[16] = (source[16] || 0) + Math.floor(source[0] / 20);
    }

    // ABL:봉사정신
    if (target.abl.봉사정신 === 0) {
      source[4] = 620;
      source[5] = 150;
      source[8] *= 4.00;
    } else if (target.abl.봉사정신 === 1) {
      source[4] = 700;
      source[5] = 300;
      source[8] *= 2.50;
    } else if (target.abl.봉사정신 === 2) {
      source[4] = 820;
      source[5] = 600;
      source[8] *= 1.50;
    } else if (target.abl.봉사정신 === 3) {
      source[4] = 940;
      source[5] = 900;
      source[8] *= 1.00;
    } else if (target.abl.봉사정신 === 4) {
      source[4] = 1100;
      source[5] = 1500;
      source[8] *= 0.50;
    } else {
      source[4] = 1260;
      source[5] = 2200;
      source[8] *= 0.10;
    }

    // ABL:기교 multipliers
    let techMult = 1.00;
    if (target.abl.기교 === 0) techMult = 0.50;
    else if (target.abl.기교 === 1) techMult = 0.80;
    else if (target.abl.기교 === 2) techMult = 1.00;
    else if (target.abl.기교 === 3) techMult = 1.50;
    else if (target.abl.기교 === 4) techMult = 2.50;
    else techMult = 4.00;
    source[4] *= techMult;
    source[5] *= techMult;

    // Player's ABL:C감각 multipliers
    let playerCMult4 = 1.00, playerCMult5 = 1.00;
    if (player.abl.C감각 === 0) { playerCMult4 = 0.80; playerCMult5 = 0.50; }
    else if (player.abl.C감각 === 1) { playerCMult4 = 0.90; playerCMult5 = 0.70; }
    else if (player.abl.C감각 === 2) { playerCMult4 = 1.00; playerCMult5 = 1.00; }
    else if (player.abl.C감각 === 3) { playerCMult4 = 1.10; playerCMult5 = 1.20; }
    else if (player.abl.C감각 === 4) { playerCMult4 = 1.20; playerCMult5 = 1.40; }
    else { playerCMult4 = 1.30; playerCMult5 = 1.70; }
    source[4] *= playerCMult4;
    source[5] *= playerCMult5;

    // Previous command check for anal
    if (state.prevCommand === 9) {
      if (target.abl.A감각 === 0) source[2] = 5;
      else if (target.abl.A감각 === 1) source[2] = 50;
      else if (target.abl.A감각 === 2) source[2] = 200;
      else if (target.abl.A감각 === 3) source[2] = 500;
      else if (target.abl.A감각 === 4) source[2] = 1000;
      else source[2] = 1800;
    }

    // Incest multipliers
    if (context.tflags[14] === 1 || context.tflags[14] === 2) {
      source[13] *= 3.00; // Parent-child
      source[14] *= 3.00;
    } else if (context.tflags[14] === 3 || context.tflags[14] === 4) {
      source[13] *= 2.00; // Siblings
      source[14] *= 2.00;
    }

    // Ejaculation check
    const ejacThreshold = player.base.maxEjaculation;
    const currentEjac = player.base.ejaculationGauge;
    let ejacLevel = 0;
    if (currentEjac > ejacThreshold * 2) ejacLevel = 2;
    else if (currentEjac > ejacThreshold) ejacLevel = 1;

    if (ejacLevel > 0) {
      source[4] *= 3.00;

      // ABL:정액중독 check
      if (target.abl.정액중독 === 0) {
        source[7] = 0;
        source[5] *= 2.00;
        source[13] *= 2.00;
      } else if (target.abl.정액중독 === 1) {
        source[7] = 200;
        source[5] *= 2.50;
        source[13] *= 1.60;
      } else if (target.abl.정액중독 === 2) {
        source[7] = 500;
        source[5] *= 3.00;
        source[13] *= 1.00;
      } else if (target.abl.정액중독 === 3) {
        source[7] = 1200;
        source[5] *= 4.50;
        source[13] *= 0.70;
      } else if (target.abl.정액중독 === 4) {
        source[7] = 2500;
        source[5] *= 6.00;
        source[13] *= 0.40;
      } else {
        source[7] = 5000;
        source[5] *= 8.00;
        source[13] *= 0.10;
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

      // Semen stain
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

    // If trainer is male or futa, fellatio experience
    if (player.talents.オトコ || player.talents.후타나리) {
      target.experience.펠라 += 1;
    }

    // Stain transfer: slave mouth ⇔ trainer genital
    target.stains.mouth |= player.stains.genital;
    player.stains.genital |= target.stains.mouth;
    // Slave genital ⇔ trainer mouth
    target.stains.genital |= player.stains.mouth;
    player.stains.mouth |= target.stains.genital;

    // First kiss flags
    context.tflags[620] |= 1;
    if (target.talent.オトコ || target.talent.후타나리) {
      context.tflags[620] |= 2;
    } else {
      context.tflags[620] |= 8;
    }
    context.tflags[621] |= 1;
    if (player.talents.オトコ || player.talents.후타나리) {
      context.tflags[621] |= 2;
    } else {
      context.tflags[621] |= 8;
    }

    // Lesbian/gay experience
    if (!target.talent.オトコ && !player.talents.オトコ) {
      target.experience.레즈 += 8;
    } else if (target.talent.オトコ && player.talents.オトコ) {
      target.experience.호모 += 8;
    }

    context.tflags[100] = 1;
    context.tflags[200] = 2; // Submission mark 2

    // Apply calculated sources to target
    // applySourceValues(target, source);
  }
};

function calculatePalamLevel(value: number): number {
  // This would reference actual PALAMLV thresholds
  if (value < 100) return 0;
  if (value < 300) return 1;
  if (value < 600) return 2;
  if (value < 1000) return 3;
  if (value < 1500) return 4;
  return 5;
}
