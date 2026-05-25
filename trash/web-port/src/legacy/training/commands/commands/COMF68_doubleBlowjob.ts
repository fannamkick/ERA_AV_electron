/**
 * COMF68 - 더블 펠라 (Double Blowjob - Target and assistant together)
 *
 * Target and assistant perform fellatio on the trainer together.
 * Special incest detection - shows relationship prefix (mother-daughter, sisters, etc.)
 * Includes stain sharing mechanics between target and assistant if they have semen addiction.
 */

import type { CommandPlugin, TrainingContext } from '../../types';

export const COMF68: CommandPlugin = {
  id: 68,
  name: '더블 펠라',
  category: 'assistant',

  isAvailable(context: TrainingContext): boolean {
    const reasons: string[] = [];
    let score = 0;

    // Incest check between target and assistant
    context.tflags[14] = 0;
    // CALL INCEST would be done here

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

    // TALENT:남성혐오
    if (target.talent.남성혐오 && player.talents.オトコ) {
      score -= 12;
      reasons.push(`남성혐오(-12)`);
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

    // Dirt check on player's genitals
    let dirtPenalty = 0;
    if (player.stains.penis & 1) dirtPenalty += 1;
    if (player.stains.penis & 4) dirtPenalty += 3;
    if (player.stains.penis & 8) dirtPenalty += 7;
    if (player.stains.penis & 16) dirtPenalty += 15;

    if (target.talent.악취둔감) dirtPenalty = Math.floor(dirtPenalty / 3);
    if (target.talent.악취민감) dirtPenalty *= 2;

    if (dirtPenalty > 0) {
      score -= dirtPenalty;
      const odorText = target.talent.악취둔감 ? ', 악취둔감' : target.talent.악취민감 ? ', 악취민감' : '';
      reasons.push(`더러움 있음${odorText}(-${dirtPenalty})`);
    }

    const threshold = 34;
    const canExecute = score >= threshold;

    return {
      canExecute,
      score,
      reasons: [...reasons, `= ${score}`, `${canExecute ? '>' : score === threshold ? '=' : '<'} 실행치 ${threshold}`]
    };
  },

  async execute(state: GameState, target: Character, player: Character): Promise<void> {
    const incestType = context.tflags[14];

    // Build command name with incest prefix
    let commandName = '';
    const assistantId = state.currentAssistant;
    const assistant = assistantId ? state.characters[assistantId] : null;

    if (assistant) {
      if ((incestType === 1 || incestType === 2) && !target.talent.オトコ && !assistant.talents.オトコ) {
        commandName = '모녀 더블 펠라';
      } else if (incestType === 1 || incestType === 2) {
        commandName = '부모자식 더블 펠라';
      } else if ((incestType === 3 || incestType === 4) && !target.talent.オトコ && !assistant.talents.オトコ) {
        commandName = '자매 더블 펠라';
      } else if ((incestType === 3 || incestType === 4) && target.talent.オトコ && assistant.talents.オトコ) {
        commandName = '형제 더블 펠라';
      } else if (incestType === 3 || incestType === 4) {
        commandName = '남매 더블 펠라';
      } else if (incestType === 5 || incestType === 6) {
        commandName = '사촌 더블 펠라';
      } else {
        commandName = '더블 펠라';
      }
    } else {
      commandName = '더블 펠라';
    }

    state.saveStr[0] = commandName;

    // Ejaculation gauge calculation
    let ejacGauge = 0;

    if (target.abl.기교 === 0) ejacGauge = 800;
    else if (target.abl.기교 === 1) ejacGauge = 1100;
    else if (target.abl.기교 === 2) ejacGauge = 1500;
    else if (target.abl.기교 === 3) ejacGauge = 2000;
    else if (target.abl.기교 === 4) ejacGauge = 2400;
    else ejacGauge = 2800;

    // ABL:從順
    if (target.abl.從順 === 0) ejacGauge *= 0.80;
    else if (target.abl.從順 === 1) ejacGauge *= 0.90;
    else if (target.abl.從順 === 2) ejacGauge *= 1.00;
    else if (target.abl.從順 === 3) ejacGauge *= 1.10;
    else if (target.abl.從順 === 4) ejacGauge *= 1.20;
    else ejacGauge *= 1.30;

    // ABL:봉사정신
    if (target.abl.봉사정신 === 0) ejacGauge *= 0.50;
    else if (target.abl.봉사정신 === 1) ejacGauge *= 0.80;
    else if (target.abl.봉사정신 === 2) ejacGauge *= 1.20;
    else if (target.abl.봉사정신 === 3) ejacGauge *= 1.50;
    else if (target.abl.봉사정신 === 4) ejacGauge *= 1.80;
    else ejacGauge *= 2.40;

    // ABL:정액중독
    if (target.abl.정액중독 === 0) ejacGauge *= 1.00;
    else if (target.abl.정액중독 === 1) ejacGauge *= 1.20;
    else if (target.abl.정액중독 === 2) ejacGauge *= 1.30;
    else if (target.abl.정액중독 === 3) ejacGauge *= 1.50;
    else if (target.abl.정액중독 === 4) ejacGauge *= 1.70;
    else ejacGauge *= 2.00;

    // TALENT:혀놀림
    if (target.talent.혀놀림) ejacGauge *= 2.00;

    // Assistant's ABL:기교
    if (assistant && assistant.abl.기교 >= 2) {
      if (assistant.abl.기교 === 2) ejacGauge *= 1.00;
      else if (assistant.abl.기교 === 3) ejacGauge *= 1.20;
      else if (assistant.abl.기교 === 4) ejacGauge *= 1.50;
      else ejacGauge *= 1.80;
    }

    // Assistant's TALENT:혀놀림
    if (assistant && assistant.talents.혀놀림) ejacGauge *= 2.00;

    // Player's ABL:C감각
    if (player.abl.C감각 === 0) ejacGauge *= 1.00;
    else if (player.abl.C감각 === 1) ejacGauge *= 1.50;
    else if (player.abl.C감각 === 2) ejacGauge *= 2.00;
    else if (player.abl.C감각 === 3) ejacGauge *= 2.50;
    else if (player.abl.C감각 === 4) ejacGauge *= 3.50;
    else ejacGauge *= 5.00;

    if (player.talents.オトコ || player.talents.후타나리) {
      player.base.ejaculationGauge += Math.floor(ejacGauge);
    }

    // LOSEBASE
    state.loseBase.health += 10;
    state.loseBase.stamina += 100;

    // SOURCE calculation
    const source: Record<number, number> = {};
    source[13] = 1500;
    source[14] = 500;

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
      source[3] = 300;
      source[4] = 420;
      source[5] = 150;
      source[8] *= 4.00;
    } else if (target.abl.봉사정신 === 1) {
      source[3] = 400;
      source[4] = 500;
      source[5] = 300;
      source[8] *= 2.50;
    } else if (target.abl.봉사정신 === 2) {
      source[3] = 550;
      source[4] = 580;
      source[5] = 600;
      source[8] *= 1.50;
    } else if (target.abl.봉사정신 === 3) {
      source[3] = 700;
      source[4] = 660;
      source[5] = 900;
      source[8] *= 1.00;
    } else if (target.abl.봉사정신 === 4) {
      source[3] = 900;
      source[4] = 740;
      source[5] = 1500;
      source[8] *= 0.50;
    } else {
      source[3] = 1000;
      source[4] = 820;
      source[5] = 2200;
      source[8] *= 0.10;
    }

    // ABL:從順
    if (target.abl.從順 === 0) source[3] *= 0.50;
    else if (target.abl.從順 === 1) source[3] *= 0.80;
    else if (target.abl.從順 === 2) source[3] *= 1.00;
    else if (target.abl.從順 === 3) source[3] *= 1.20;
    else if (target.abl.從順 === 4) source[3] *= 1.50;
    else source[3] *= 2.00;

    // ABL:기교
    if (target.abl.기교 === 0) {
      source[4] *= 0.50;
      source[5] *= 0.50;
    } else if (target.abl.기교 === 1) {
      source[4] *= 0.80;
      source[5] *= 0.80;
    } else if (target.abl.기교 === 2) {
      source[4] *= 1.00;
      source[5] *= 1.00;
    } else if (target.abl.기교 === 3) {
      source[4] *= 1.20;
      source[5] *= 1.20;
    } else if (target.abl.기교 === 4) {
      source[4] *= 1.50;
      source[5] *= 1.50;
    } else {
      source[4] *= 2.00;
      source[5] *= 2.00;
    }

    // Incest multipliers
    if (incestType === 1 || incestType === 2) {
      source[13] *= 3.00;
      source[14] *= 3.00;
    } else if (incestType === 3 || incestType === 4) {
      source[13] *= 2.00;
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

      // ABL:정액중독
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

      player.stains.penis |= 4;
      player.base.ejaculationGauge -= ejacThreshold * 2;
      if (player.base.ejaculationGauge >= ejacThreshold) {
        player.base.ejaculationGauge = ejacThreshold - 1;
      }

      context.tflags[0] = 2; // Oral ejaculation flag
    } else if (ejacLevel === 1) {
      player.experience.사정 += 1;
      target.experience.정액 += 3;

      player.stains.penis |= 4;
      player.base.ejaculationGauge -= ejacThreshold;
      if (player.base.ejaculationGauge >= ejacThreshold) {
        player.base.ejaculationGauge = ejacThreshold - 1;
      }

      context.tflags[0] = 1;
    }

    target.experience.봉사경험 = (target.experience.봉사경험 || 0) + 1;

    // Stain transfers
    target.stains.mouth |= player.stains.penis;
    player.stains.penis |= target.stains.mouth;

    if (assistant) {
      assistant.stains.mouth |= player.stains.penis;
      player.stains.penis |= assistant.stains.mouth;
    }

    // Clean up if high skill
    if (target.abl.봉사정신 >= 2 && target.abl.기교 >= 2) {
      player.stains.penis = 2;
      if (ejacLevel >= 1) {
        context.tflags[8] = 2;
      }
    }

    // Semen sharing between target and assistant if either has addiction
    if (assistant && !target.talent.オトコ && !assistant.talents.オトコ &&
        (target.abl.정액중독 > 0 || assistant.abl.정액중독 > 0)) {
      target.stains.mouth |= assistant.stains.mouth;
      assistant.stains.mouth |= target.stains.mouth;
      if (ejacLevel >= 1) {
        context.tflags[8] = 3;
      }
    }

    // First kiss tracking
    context.tflags[621] |= 1;
    context.tflags[621] |= 2;
    context.tflags[622] |= 1;
    context.tflags[622] |= 2;

    // Lesbian/gay experience with trainer
    if (!target.talent.オトコ && !player.talents.オトコ) {
      target.experience.레즈 = (target.experience.레즈 || 0) + 7;
    } else if (target.talent.オトコ && player.talents.オトコ) {
      target.experience.호모 = (target.experience.호모 || 0) + 7;
    }

    // Lesbian/gay experience with assistant
    if (assistant) {
      if (!target.talent.オトコ && !assistant.talents.オトコ) {
        target.experience.레즈 = (target.experience.레즈 || 0) + 7;
      } else if (target.talent.オトコ && assistant.talents.オトコ) {
        target.experience.호모 = (target.experience.호모 || 0) + 7;
      }
    }

    // Trainer is futa
    if (player.talents.후타나리) {
      source[13] = Math.floor(source[13] / 2);
    }

    context.tflags[100] = 1;
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
