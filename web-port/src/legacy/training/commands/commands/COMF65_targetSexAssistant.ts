/**
 * COMF65 - 조수를 범하게 한다 (Make Target Sex Assistant)
 *
 * Forces the training target to have sex with the assistant.
 * Significant psychological impact, especially with family relationships.
 */

import type { CommandPlugin, TrainingContext } from '../../types';

export const COMF65: CommandPlugin = {
  id: 65,
  name: '조수를 범하게 한다',
  category: 'assistant',

  isAvailable(context: TrainingContext): boolean {
    const reasons: string[] = [];
    let score = 0;

    // Incest check
    context.tflags[14] = 0;
    // CALL INCEST would be here

    // ABL:욕망
    if (target.abl.욕망 > 0) {
      score += target.abl.욕망 * 2;
      reasons.push(`욕망 LV${target.abl.욕망}(${target.abl.욕망 * 2})`);
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
      score += lustLevel * 2;
      reasons.push(`욕정 LV${lustLevel}(${lustLevel * 2})`);
    }

    // TALENT:수줍음
    if (target.talent.수줍음) {
      score -= 1;
      reasons.push(`수줍음(-1)`);
    }

    // TALENT:헌신적
    if (target.talent.헌신적) {
      score += 6;
      reasons.push(`헌신적(6)`);
    }

    // TALENT:쾌감에 솔직
    if (target.talent.쾌감에_솔직) {
      score += 2;
      reasons.push(`쾌감에 솔직(2)`);
    }

    // TALENT:쾌감을 부정
    if (target.talent.쾌감을_부정) {
      score -= 2;
      reasons.push(`쾌감을 부정(-2)`);
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

    // Assistant is virgin penalty
    const assistantId = state.currentAssistant;
    if (assistantId && state.characterExp[assistantId]?.V경험 === 0) {
      score -= 15;
      reasons.push(`조수가 처녀(-15)`);
    }

    // Incest penalties
    const incestType = context.tflags[14];
    if (incestType === 1) {
      score -= 10;
      reasons.push(`조수가 모친(-10)`);
    } else if (incestType === 2) {
      score -= 20;
      reasons.push(`조수가 딸(-20)`);
    } else if (incestType === 3) {
      score -= 5;
      reasons.push(`조수가 언니(-5)`);
    } else if (incestType === 4) {
      score -= 5;
      reasons.push(`조수가 여동생(-5)`);
    }

    const threshold = 40;
    const canExecute = score >= threshold;

    return {
      canExecute,
      score,
      reasons: [...reasons, `= ${score}`, `${canExecute ? '>' : score === threshold ? '=' : '<'} 실행치 ${threshold}`]
    };
  },

  async execute(state: GameState, target: Character, player: Character): Promise<void> {
    state.saveStr[0] = '조수를 범하게 한다';

    const assistantId = state.currentAssistant;
    const assistant = assistantId ? state.characters[assistantId] : null;
    if (!assistant) return;

    // Ejaculation gauge (target if futa/male)
    let ejacGauge = 0;
    if (target.abl.기교 === 0) ejacGauge = 50;
    else if (target.abl.기교 === 1) ejacGauge = 300;
    else if (target.abl.기교 === 2) ejacGauge = 800;
    else if (target.abl.기교 === 3) ejacGauge = 1500;
    else if (target.abl.기교 === 4) ejacGauge = 2000;
    else ejacGauge = 3200;

    // Multipliers for 從順, 봉사정신, assistant's V감각, assistant's V경험, target's C감각
    // (Abbreviated - full logic follows ERB pattern)

    if (target.abl.從順 === 0) ejacGauge *= 0.80;
    else if (target.abl.從順 === 1) ejacGauge *= 0.90;
    else if (target.abl.從順 === 2) ejacGauge *= 1.00;
    else if (target.abl.從順 === 3) ejacGauge *= 1.10;
    else if (target.abl.從順 === 4) ejacGauge *= 1.20;
    else ejacGauge *= 1.30;

    if (target.abl.봉사정신 === 0) ejacGauge *= 0.50;
    else if (target.abl.봉사정신 === 1) ejacGauge *= 0.80;
    else if (target.abl.봉사정신 === 2) ejacGauge *= 1.20;
    else if (target.abl.봉사정신 === 3) ejacGauge *= 1.50;
    else if (target.abl.봉사정신 === 4) ejacGauge *= 1.80;
    else ejacGauge *= 2.40;

    // Assistant's V감각
    if (assistant.abl.V감각 === 0) ejacGauge *= 0.50;
    else if (assistant.abl.V감각 === 1) ejacGauge *= 0.80;
    else if (assistant.abl.V감각 === 2) ejacGauge *= 1.00;
    else if (assistant.abl.V감각 === 3) ejacGauge *= 1.20;
    else if (assistant.abl.V감각 === 4) ejacGauge *= 1.50;
    else ejacGauge *= 2.00;

    // Target's C감각
    if (target.abl.C감각 === 0) ejacGauge *= 1.00;
    else if (target.abl.C감각 === 1) ejacGauge *= 1.50;
    else if (target.abl.C감각 === 2) ejacGauge *= 2.00;
    else if (target.abl.C감각 === 3) ejacGauge *= 2.50;
    else if (target.abl.C감각 === 4) ejacGauge *= 3.50;
    else ejacGauge *= 5.00;

    if (player.talents.후타나리 || player.talents.オトコ) {
      player.base.ejaculationGauge = (player.base.ejaculationGauge || 0) + Math.floor(ejacGauge);
    }

    // LOSEBASE
    state.loseBase.health += 40;
    state.loseBase.stamina += 220;

    // SOURCE calculation
    const source: Record<number, number> = {};
    source[13] = 1500;
    source[14] = 800;

    // ABL:봉사정신
    if (target.abl.봉사정신 === 0) {
      source[0] = 800;
      source[4] = 1600;
      source[5] = 200;
    } else if (target.abl.봉사정신 === 1) {
      source[0] = 1400;
      source[4] = 1900;
      source[5] = 400;
    } else if (target.abl.봉사정신 === 2) {
      source[0] = 2000;
      source[4] = 2300;
      source[5] = 750;
    } else if (target.abl.봉사정신 === 3) {
      source[0] = 2500;
      source[4] = 2700;
      source[5] = 1150;
    } else if (target.abl.봉사정신 === 4) {
      source[0] = 2900;
      source[4] = 3100;
      source[5] = 1750;
    } else {
      source[0] = 3200;
      source[4] = 3500;
      source[5] = 2500;
    }

    // ABL:기교 multipliers
    let techMult = 1.00;
    if (target.abl.기교 === 0) techMult = 0.50;
    else if (target.abl.기교 === 1) techMult = 0.50; // Note: ERB has varied values
    else if (target.abl.기교 === 2) techMult = 0.50;
    else if (target.abl.기교 === 3) techMult = 0.50;
    else if (target.abl.기교 === 4) techMult = 0.50;
    else techMult = 0.50;
    source[0] *= techMult;

    techMult = 1.00;
    if (target.abl.기교 === 0) techMult = 0.50;
    else if (target.abl.기교 === 1) techMult = 0.80;
    else if (target.abl.기교 === 2) techMult = 1.00;
    else if (target.abl.기교 === 3) techMult = 1.50;
    else if (target.abl.기교 === 4) techMult = 2.00;
    else if (target.abl.기교 === 5) techMult = 2.50;
    else if (target.abl.기교 === 6) techMult = 3.00;
    else if (target.abl.기교 === 7) techMult = 3.50;
    else techMult = 4.00;
    source[4] *= techMult;
    source[5] *= techMult;

    // Lesbian/gay adjustment
    if (!target.talent.オトコ && assistant && !assistant.talents.オトコ) {
      if (target.abl.레즈끼 === 0) {
        source[4] *= 0.20;
        source[5] *= 0.20;
      } else if (target.abl.레즈끼 === 1) {
        source[4] *= 0.40;
        source[5] *= 0.40;
      } else if (target.abl.레즈끼 === 2) {
        source[4] *= 0.60;
        source[5] *= 0.60;
      } else if (target.abl.레즈끼 === 3) {
        source[4] *= 0.80;
        source[5] *= 0.80;
      } else if (target.abl.레즈끼 === 4) {
        source[4] *= 1.00;
        source[5] *= 1.00;
      } else {
        source[4] *= 1.20;
        source[5] *= 1.20;
      }
    }

    if (target.talent.オトコ && assistant && assistant.talents.オトコ) {
      if (target.abl.ホモっ気 === 0) {
        source[4] *= 0.20;
        source[5] *= 0.20;
      } else if (target.abl.ホモっ気 === 1) {
        source[4] *= 0.40;
        source[5] *= 0.40;
      } else if (target.abl.ホモっ気 === 2) {
        source[4] *= 0.60;
        source[5] *= 0.60;
      } else if (target.abl.ホモっ気 === 3) {
        source[4] *= 0.80;
        source[5] *= 0.80;
      } else if (target.abl.ホモっ気 === 4) {
        source[4] *= 1.00;
        source[5] *= 1.00;
      } else {
        source[4] *= 1.20;
        source[5] *= 1.20;
      }
    }

    // Assistant virginity loss
    if (assistant && assistant.talents.처녀) {
      source[13] *= 20.00;
      source[14] *= 3.00;
      assistant.talents.처녀 = false;

      target.experience.이상 = (target.experience.이상 || 0) + 1;

      if (target.abl.從順 < 3) {
        target.abl.從順 = 3;
      }
    }

    // Assistant's V경험 and 성교경험 UP
    if (assistant) {
      assistant.experience.V경험 = (assistant.experience.V경험 || 0) + 1;
      assistant.experience.성교경험 = (assistant.experience.성교경험 || 0) + 1;
    }

    // Incest multipliers
    const incestType = context.tflags[14];
    if (incestType === 1 || incestType === 2) {
      source[13] *= 3.00;
      source[14] *= 3.00;
      if (target.abl.從順 < 3) target.abl.從順 = 3;
    } else if (incestType === 3 || incestType === 4) {
      source[13] *= 2.00;
      source[14] *= 2.00;
      if (target.abl.從順 < 2) target.abl.從順 = 2;
    } else if (incestType === 5 || incestType === 6) {
      source[13] *= 1.50;
      source[14] *= 1.50;
      if (target.abl.從順 < 2) target.abl.從順 = 2;
    }

    // Virginity loss for target
    if (target.talent.동정) {
      target.talent.동정 = false;
    }

    context.tflags[14] = 0;

    // Ejaculation check (abbreviated)
    const ejacThreshold = player.base.maxEjaculation || 10000;
    let ejacLevel = 0;
    if (player.base.ejaculationGauge > ejacThreshold * 2) ejacLevel = 2;
    else if (player.base.ejaculationGauge > ejacThreshold) ejacLevel = 1;

    if (ejacLevel > 0) {
      source[4] *= 3.00;

      // 정액중독 check
      if (target.abl.정액중독 === 0) {
        source[7] = 0;
        source[5] *= 2.00;
        source[13] *= 2.00;
      } else if (target.abl.정액중독 === 1) {
        source[7] = 50;
        source[5] *= 2.50;
        source[13] *= 1.60;
      } else if (target.abl.정액중독 === 2) {
        source[7] = 150;
        source[5] *= 3.00;
        source[13] *= 1.00;
      } else if (target.abl.정액중독 === 3) {
        source[7] = 300;
        source[5] *= 4.50;
        source[13] *= 0.70;
      } else if (target.abl.정액중독 === 4) {
        source[7] = 600;
        source[5] *= 6.00;
        source[13] *= 0.40;
      } else {
        source[7] = 1200;
        source[5] *= 8.00;
        source[13] *= 0.10;
      }
    }

    if (ejacLevel === 2) {
      source[7] = (source[7] || 0) * 2.00;
      source[5] *= 1.50;
      player.experience.사정 = (player.experience.사정 || 0) + 2;
      target.experience.정액 = (target.experience.정액 || 0) + 1;
      player.stains.penis |= 4;
      player.base.ejaculationGauge -= ejacThreshold * 2;
      if (player.base.ejaculationGauge >= ejacThreshold) {
        player.base.ejaculationGauge = ejacThreshold - 1;
      }
      context.tflags[6] = 2; // Assistant ejaculation flag
    } else if (ejacLevel === 1) {
      player.experience.사정 = (player.experience.사정 || 0) + 1;
      player.stains.penis |= 4;
      player.base.ejaculationGauge -= ejacThreshold;
      if (player.base.ejaculationGauge >= ejacThreshold) {
        player.base.ejaculationGauge = ejacThreshold - 1;
      }
      context.tflags[6] = 1;
    }

    // Stain transfer
    if (target.talent.オトコ || target.talent.후타나리) {
      if (assistant) {
        target.stains.penis |= assistant.stains.vagina;
        assistant.stains.vagina |= target.stains.penis;
      }
    }

    // Lesbian/gay experience
    if (!target.talent.オトコ && assistant && !assistant.talents.オトコ) {
      target.experience.레즈 = (target.experience.레즈 || 0) + 10;
    } else if (target.talent.オトコ && assistant && assistant.talents.オトコ) {
      target.experience.호모 = (target.experience.호모 || 0) + 10;
    }

    context.tflags[200] = 2; // Submission mark 2

    // NTR experience calculation (abbreviated)
    let ntrExp = 1;
    if (target.abl.욕망 <= 1) ntrExp = 1;
    else if (target.abl.욕망 <= 2) ntrExp = 2;
    else if (target.abl.욕망 <= 3) ntrExp = 3;
    else if (target.abl.욕망 <= 4) ntrExp = 4;
    else ntrExp = 5;

    target.experience.NTR = (target.experience.NTR || 0) + ntrExp;

    context.tflags[100] = 1;
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
