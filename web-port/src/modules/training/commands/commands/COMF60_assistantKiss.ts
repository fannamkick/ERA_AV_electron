/**
 * COMF60 - 조수에게 키스시킨다 (Assistant Kiss)
 *
 * Makes the target kiss the assistant.
 * Assistant command category.
 */

import type { CommandPlugin, TrainingContext } from '../../types';

export const COMF60: CommandPlugin = {
  id: 60,
  name: '조수에게 키스시킨다',
  category: 'assistant',

  isAvailable(context: TrainingContext): boolean {
    const reasons: string[] = [];
    let score = 0;

    // Common order elements (COM_ORDER)
    // score += calculateCommonOrderScore(target, player);

    // ABL:욕망 (Desire)
    if (target.abl.욕망 > 0) {
      score += target.abl.욕망 * 1;
      reasons.push(`욕망 LV${target.abl.욕망}(${target.abl.욕망 * 1})`);
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

    // PALAM:욕정 (Lust level)
    const lustLevel = calculatePalamLevel(target.palam.욕정);
    if (lustLevel > 0) {
      score += lustLevel * 1;
      reasons.push(`욕정 LV${lustLevel}(${lustLevel * 1})`);
    }

    // TALENT:수줍음 (Shy)
    if (target.talent.수줍음) {
      score -= 1;
      reasons.push(`수줍음(-1)`);
    }

    // TALENT:악취둔감 (Odor Insensitive)
    if (target.talent.악취둔감) {
      score += 1;
      reasons.push(`악취둔감(1)`);
    }

    // TALENT:악취민감 (Odor Sensitive)
    if (target.talent.악취민감) {
      score -= 1;
      reasons.push(`악취민감(-1)`);
    }

    // TALENT:헌신적 (Devoted)
    if (target.talent.헌신적) {
      score += 6;
      reasons.push(`헌신적(6)`);
    }

    // TALENT:쾌감을 부정 (Denies Pleasure)
    if (target.talent.쾌감을_부정) {
      score -= 1;
      reasons.push(`쾌감을 부정(-1)`);
    }

    // TALENT:女嫌い (Female-Hater) - if player is not male
    if (target.talent.女嫌い && !player.talents.オトコ) {
      score -= 5;
      reasons.push(`女嫌い(-5)`);
    }

    // TALENT:愛 (Love)
    if (target.talent.愛 && state.assistantPlayMode === 0) {
      score += 5;
      reasons.push(`愛(5)`);
    }

    // Dirt check on player's mouth
    let dirtPenalty = 0;
    if (player.stains.mouth & 1) dirtPenalty += 1;  // Love juice
    if (player.stains.mouth & 4) dirtPenalty += 3;  // Semen
    if (player.stains.mouth & 8) dirtPenalty += 7;  // Anal
    if (player.stains.mouth & 16) dirtPenalty += 15; // More anal

    // Adjust for odor talents
    if (target.talent.악취둔감) dirtPenalty = Math.floor(dirtPenalty / 3);
    if (target.talent.악취민감) dirtPenalty *= 2;

    // Kiss has less impact from dirt
    dirtPenalty = Math.floor(dirtPenalty / 2);

    if (dirtPenalty > 0) {
      score -= dirtPenalty;
      const odorText = target.talent.악취둔감 ? ', 악취둔감' : target.talent.악취민감 ? ', 악취민감' : '';
      reasons.push(`더러움 있음${odorText}(-${dirtPenalty})`);
    }

    const threshold = 15;
    const canExecute = score >= threshold;

    return {
      canExecute,
      score,
      reasons: [...reasons, `= ${score}`, `${canExecute ? '>' : score === threshold ? '=' : '<'} 실행치 ${threshold}`]
    };
  },

  async execute(state: GameState, target: Character, player: Character): Promise<void> {
    const selectCom = 60;
    state.saveStr[0] = '조수가 키스';

    // Call TRAIN_MESSAGE_B
    // await displayTrainMessage(state, 'B');

    // Ejaculation gauge calculation
    let ejacGauge = 0;

    // Based on ABL:기교 (Technique)
    if (target.abl.기교 === 0) ejacGauge = 50;
    else if (target.abl.기교 === 1) ejacGauge = 200;
    else if (target.abl.기교 === 2) ejacGauge = 300;
    else if (target.abl.기교 === 3) ejacGauge = 400;
    else if (target.abl.기교 === 4) ejacGauge = 500;
    else ejacGauge = 600;

    // ABL:従順 (Obedience)
    if (target.abl.従順 === 0) ejacGauge *= 0.80;
    else if (target.abl.従順 === 1) ejacGauge *= 0.90;
    else if (target.abl.従順 === 2) ejacGauge *= 1.00;
    else if (target.abl.従順 === 3) ejacGauge *= 1.10;
    else if (target.abl.従순 === 4) ejacGauge *= 1.20;
    else ejacGauge *= 1.30;

    // ABL:봉사기술 (Service Technique)
    if (target.abl.봉사기술 === 0) ejacGauge *= 0.50;
    else if (target.abl.봉사기술 === 1) ejacGauge *= 0.80;
    else if (target.abl.봉사기술 === 2) ejacGauge *= 1.20;
    else if (target.abl.봉사기술 === 3) ejacGauge *= 1.50;
    else if (target.abl.봉사기술 === 4) ejacGauge *= 1.80;
    else ejacGauge *= 2.40;

    // TALENT:혀놀림 (Tongue Skill)
    if (target.talent.혀놀림) ejacGauge *= 2.00;

    // Player's ABL:C감각
    if (player.abl.C감각 === 0) ejacGauge *= 1.00;
    else if (player.abl.C감각 === 1) ejacGauge *= 1.50;
    else if (player.abl.C감각 === 2) ejacGauge *= 2.00;
    else if (player.abl.C감각 === 3) ejacGauge *= 2.50;
    else if (player.abl.C감각 === 4) ejacGauge *= 3.50;
    else ejacGauge *= 5.00;

    if (player.talents.후타나리 || player.talents.オトコ) {
      player.base.ejaculationGauge += Math.floor(ejacGauge);
    }

    // LOSEBASE calculation
    state.loseBase.stamina += 20;

    // SOURCE calculation
    const source: Record<number, number> = {};
    source[13] = 100; // Submission
    source[14] = 10;  // Corruption

    // Dirt value from above calculation
    let dirtValue = 0;
    if (player.stains.mouth & 1) dirtValue += 1;
    if (player.stains.mouth & 4) dirtValue += 3;
    if (player.stains.mouth & 8) dirtValue += 7;
    if (player.stains.mouth & 16) dirtValue += 15;
    if (target.talent.악취둔감) dirtValue = Math.floor(dirtValue / 3);
    if (target.talent.악취민감) dirtValue *= 2;
    dirtValue = Math.floor(dirtValue / 2); // Kiss has less impact
    source[8] = dirtValue * 20 + 10;

    // ABL:봉사정신
    if (target.abl.봉사정신 === 0) {
      source[4] = 50;
      source[5] = 0;
      source[8] *= 4.00;
    } else if (target.abl.봉사정신 === 1) {
      source[4] = 150;
      source[5] = 50;
      source[8] *= 2.50;
    } else if (target.abl.봉사정신 === 2) {
      source[4] = 200;
      source[5] = 100;
      source[8] *= 1.50;
    } else if (target.abl.봉사정신 === 3) {
      source[4] = 250;
      source[5] = 180;
      source[8] *= 1.00;
    } else if (target.abl.봉사정신 === 4) {
      source[4] = 300;
      source[5] = 300;
      source[8] *= 0.50;
    } else {
      source[4] = 350;
      source[5] = 500;
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

    // Ejaculation check
    const ejacThreshold = player.base.maxEjaculation;
    const currentEjac = player.base.ejaculationGauge;
    let ejacLevel = 0;
    if (currentEjac > ejacThreshold * 2) ejacLevel = 2;
    else if (currentEjac > ejacThreshold) ejacLevel = 1;

    if (ejacLevel > 0) {
      source[4] *= 3.00;

      // ABL:정액중독
      if (target.abl.정액중독 === 0) {
        source[7] = 0;
        source[5] *= 2.00;
        source[13] *= 2.00;
      } else if (target.abl.정액중독 === 1) {
        source[7] = 100;
        source[5] *= 2.50;
        source[13] *= 1.60;
      } else if (target.abl.정액중독 === 2) {
        source[7] = 300;
        source[5] *= 3.00;
        source[13] *= 1.00;
      } else if (target.abl.정액중독 === 3) {
        source[7] = 700;
        source[5] *= 4.00;
        source[13] *= 0.70;
      } else if (target.abl.정액중독 === 4) {
        source[7] = 1500;
        source[5] *= 5.00;
        source[13] *= 0.40;
      } else {
        source[7] = 6000;
        source[5] *= 6.00;
        source[13] *= 0.10;
      }
    }

    // Large ejaculation
    if (ejacLevel === 2) {
      source[7] = (source[7] || 0) * 2.00;
      source[5] *= 1.50;

      player.experience.사정 += 2;
      target.experience.정액 += 1;
      // Display: 대량사정⚡
      // Display: 정액경험 +1

      player.stains.penis |= 4; // Semen stain

      player.base.ejaculationGauge -= ejacThreshold * 2;
      if (player.base.ejaculationGauge >= ejacThreshold) {
        player.base.ejaculationGauge = ejacThreshold - 1;
      }

      context.tflags[4] = 2; // Kiss ejaculation flag
    } else if (ejacLevel === 1) {
      player.experience.사정 += 1;
      // Display: 사정⚡

      player.stains.penis |= 4;

      player.base.ejaculationGauge -= ejacThreshold;
      if (player.base.ejaculationGauge >= ejacThreshold) {
        player.base.ejaculationGauge = ejacThreshold - 1;
      }

      context.tflags[4] = 1;
    }

    // Stain transfer: slave mouth ⇔ player mouth
    target.stains.mouth |= player.stains.mouth;
    player.stains.mouth |= target.stains.mouth;

    // First kiss
    if (state.characterFlags[target.id]?.firstKiss === -1) {
      context.tflags[13] = 1;
      state.characterFlags[target.id].firstKiss = 1;
      state.characterStrings[target.id][1] = player.name;
      context.tflags[134] = 1;
    }
    if (state.characterFlags[player.id]?.firstKiss === -1) {
      state.characterFlags[player.id].firstKiss = 1;
      state.characterStrings[player.id][1] = target.name;
    }

    // Lesbian/gay experience
    if (!target.talent.オトコ && !player.talents.オトコ) {
      target.experience.레즈 += 3;
    } else if (target.talent.オトコ && player.talents.オトコ) {
      target.experience.호모 += 3;
    }

    context.tflags[100] = 1;
    context.tflags[200] = 1; // Submission mark 1

    // Apply calculated sources to target
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
