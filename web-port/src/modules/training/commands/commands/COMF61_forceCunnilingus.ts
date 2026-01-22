/**
 * COMF61 - 커닐링구스강제 (Force Cunnilingus)
 *
 * Target performs cunnilingus on the trainer.
 * Can chain into 69 position under certain conditions.
 */

import type { CommandPlugin, TrainingContext } from '../../types';

export const COMF61: CommandPlugin = {
  id: 61,
  name: '커닐링구스강제',
  category: 'service',

  isAvailable(context: TrainingContext): boolean {
    const reasons: string[] = [];
    let score = 0;

    // Check for 69 position chain (same trainer, previous command was cunnilingus/fellatio/69)
    // This would be handled before canExecute in the actual implementation

    // Common order elements
    // score += calculateCommonOrderScore(target, player);

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

    // MARK:쾌락각인
    if (target.mark.쾌락각인 > 0) {
      score += target.mark.쾌락각인 * 2;
      reasons.push(`쾌락각인 LV${target.mark.쾌락각인}(${target.mark.쾌락각인 * 2})`);
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
      score += 3;
      reasons.push(`악취둔감(3)`);
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

    // TALENT:女嫌い
    if (target.talent.女嫌い && !player.talents.オトコ) {
      score -= 5;
      reasons.push(`女嫌い(-5)`);
    }

    // TALENT:愛
    if (target.talent.愛 && state.assistantPlayMode === 0) {
      score += 5;
      reasons.push(`愛(5)`);
    }

    // Dirt check on player's genitals
    let dirtPenalty = 0;
    if (player.stains.genital & 1) dirtPenalty += 1;
    if (player.stains.genital & 4) dirtPenalty += 3;
    if (player.stains.genital & 8) dirtPenalty += 7;
    if (player.stains.genital & 16) dirtPenalty += 15;

    if (target.talent.악취둔감) dirtPenalty = Math.floor(dirtPenalty / 3);
    if (target.talent.악취민감) dirtPenalty *= 2;

    if (dirtPenalty > 0) {
      score -= dirtPenalty;
      const odorText = target.talent.악취둔감 ? ', 악취둔감' : target.talent.악취민감 ? ', 악취민감' : '';
      reasons.push(`더러움 있음${odorText}(-${dirtPenalty})`);
    }

    const threshold = 23;
    const canExecute = score >= threshold;

    return {
      canExecute,
      score,
      reasons: [...reasons, `= ${score}`, `${canExecute ? '>' : score === threshold ? '=' : '<'} 실행치 ${threshold}`]
    };
  },

  async execute(state: GameState, target: Character, player: Character): Promise<void> {
    state.saveStr[0] = '커닐링구스강제';

    // Ejaculation gauge calculation (for trainer if futa/male)
    let ejacGauge = 0;

    if (target.abl.기교 === 0) ejacGauge = 100;
    else if (target.abl.기교 === 1) ejacGauge = 500;
    else if (target.abl.기교 === 2) ejacGauge = 900;
    else if (target.abl.기교 === 3) ejacGauge = 1200;
    else if (target.abl.기교 === 4) ejacGauge = 1500;
    else ejacGauge = 2000;

    // ABL:従順
    if (target.abl.従順 === 0) ejacGauge *= 0.80;
    else if (target.abl.従順 === 1) ejacGauge *= 0.90;
    else if (target.abl.従順 === 2) ejacGauge *= 1.00;
    else if (target.abl.従順 === 3) ejacGauge *= 1.10;
    else if (target.abl.従順 === 4) ejacGauge *= 1.20;
    else ejacGauge *= 1.30;

    // ABL:봉사기술
    if (target.abl.봉사기술 === 0) ejacGauge *= 0.50;
    else if (target.abl.봉사기술 === 1) ejacGauge *= 0.80;
    else if (target.abl.봉사기술 === 2) ejacGauge *= 1.20;
    else if (target.abl.봉사기술 === 3) ejacGauge *= 1.50;
    else if (target.abl.봉사기술 === 4) ejacGauge *= 1.80;
    else ejacGauge *= 2.40;

    // TALENT:혀놀림
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

    // LOSEBASE
    state.loseBase.health += 10;
    state.loseBase.stamina += 100;

    // SOURCE calculation
    const source: Record<number, number> = {};
    source[13] = 1000;
    source[14] = 500;

    // Dirt value
    let dirtValue = 0;
    if (player.stains.genital & 1) dirtValue += 1;
    if (player.stains.genital & 4) dirtValue += 3;
    if (player.stains.genital & 8) dirtValue += 7;
    if (player.stains.genital & 16) dirtValue += 15;
    if (target.talent.악취둔감) dirtValue = Math.floor(dirtValue / 3);
    if (target.talent.악취민감) dirtValue *= 2;
    source[8] = dirtValue * 80 + 50;

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

    // ABL:기교
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
      target.experience.정액 += 4;

      player.stains.penis |= 4;
      player.base.ejaculationGauge -= ejacThreshold * 2;
      if (player.base.ejaculationGauge >= ejacThreshold) {
        player.base.ejaculationGauge = ejacThreshold - 1;
      }

      context.tflags[5] = 2; // Cunnilingus ejaculation flag
    } else if (ejacLevel === 1) {
      player.experience.사정 += 1;
      target.experience.정액 += 1;

      player.stains.penis |= 4;
      player.base.ejaculationGauge -= ejacThreshold;
      if (player.base.ejaculationGauge >= ejacThreshold) {
        player.base.ejaculationGauge = ejacThreshold - 1;
      }

      context.tflags[5] = 1;
    }

    // Stain transfer
    target.stains.mouth |= player.stains.genital;
    player.stains.genital |= target.stains.mouth;

    // First kiss flags
    context.tflags[621] |= 1;
    context.tflags[621] |= 8;

    // Lesbian experience
    if (!target.talent.オトコ && !player.talents.オトコ) {
      target.experience.레즈 += 6;
    }

    context.tflags[100] = 1;
    context.tflags[200] = 1; // Submission mark 1
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
