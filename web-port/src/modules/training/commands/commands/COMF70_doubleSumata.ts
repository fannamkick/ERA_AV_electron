/**
 * COMF70 - 더블 스마타 (Double Sumata)
 *
 * Assistant command: Both slave and assistant perform sumata (intercrural sex)
 * simultaneously on the trainer's penis.
 */

import type { CommandPlugin, TrainingContext } from '../../types';

export const COMF70: CommandPlugin = {
  id: 70,
  name: '더블 스마타',
  category: 'assistant',

  isAvailable(context: TrainingContext): boolean {
    const reasons: string[] = [];
    let score = 0;

    // Incest check between assistant and target
    const assistant = state.assistant;
    if (!assistant) {
      return { canExecute: false, score: 0, reasons: ['No assistant present'] };
    }

    // Common order elements
    // score += await calculateCommonOrderScore(target, player);

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

    // ABL:정액중독
    if (target.abl.정액중독 > 0) {
      score += target.abl.정액중독 * 1;
      reasons.push(`정액중독 LV${target.abl.정액중독}(${target.abl.정액중독 * 1})`);
    }

    // MARK:쾌락각인
    if (target.mark.쾌락각인 > 0) {
      score += target.mark.쾌락각인 * 2;
      reasons.push(`쾌락각인 LV${target.mark.쾌락각인}(${target.mark.쾌락각인 * 2})`);
    }

    // PALAM:욕정
    const lustLevel = calculatePalamLevel(target.palam.욕정);
    if (lustLevel > 0) {
      score += lustLevel * 3;
      reasons.push(`욕정 LV${lustLevel}(${lustLevel * 3})`);
    }

    // TALENT:수줍음
    if (target.talent.수줍음) {
      score -= 1;
      reasons.push(`수줍음(-1)`);
    }

    // TALENT:쾌감을 부정
    if (target.talent.쾌감을_부정) {
      score -= 3;
      reasons.push(`쾌감을 부정(-3)`);
    }

    // TALENT:남성혐오
    if (target.talent.남성혐오 && player.talents.オトコ) {
      score -= 7;
      reasons.push(`남성혐오(-7)`);
    }

    // TALENT:愛
    if (target.talent.愛 && state.assistantPlayMode === 0) {
      score += 3;
      reasons.push(`愛(3)`);
    }

    // Trainer is futa
    if (player.talents.후타나리) {
      score += 8;
      reasons.push(`후타나리(8)`);
    }

    // TEQUIP:しあわせ草
    if (state.targetEquip.aphrodisiac) {
      score += 6;
      reasons.push(`しあわせ草(6)`);
    }

    // Dirt calculation
    let dirtValue = 0;
    if (player.stains.penis & 1) dirtValue += 1;    // Love juice
    if (player.stains.penis & 4) dirtValue += 3;    // Semen
    if (player.stains.penis & 8) dirtValue += 7;    // Anal
    if (player.stains.penis & 16) dirtValue += 1;   // Breast milk
    if (player.stains.legs & 32) dirtValue += 3;    // Urine

    if (target.talent.악취둔감) dirtValue = Math.floor(dirtValue / 3);
    if (target.talent.악취민감) dirtValue *= 2;

    // Sumata has reduced dirt impact
    dirtValue = Math.floor(dirtValue / 3);

    if (dirtValue > 0) {
      score -= dirtValue;
      const odorText = target.talent.악취둔감 ? ', 악취둔감' : target.talent.악취민감 ? ', 악취민감' : '';
      reasons.push(`더러움 있음${odorText}(-${dirtValue})`);
    }

    const threshold = 25;
    const canExecute = score >= threshold;

    return {
      canExecute,
      score,
      reasons: [...reasons, `= ${score}`, `${canExecute ? '>' : score === threshold ? '=' : '<'} 실행치 ${threshold}`]
    };
  },

  async execute(state: GameState, target: Character, player: Character): Promise<void> {
    const selectCom = 70;
    state.saveStr[0] = '더블 스마타';
    const assistant = state.assistant!;

    // LOSEBASE
    state.loseBase.health += 40;
    state.loseBase.stamina += 160;

    // SOURCE calculation
    const source: Record<number, number> = {};
    source[13] = 1500;
    source[14] = 600;

    // Dirt value (calculated above)
    let dirtValue = 0;
    if (player.stains.penis & 1) dirtValue += 1;
    if (player.stains.penis & 4) dirtValue += 3;
    if (player.stains.penis & 8) dirtValue += 7;
    if (player.stains.penis & 16) dirtValue += 1;
    if (player.stains.legs & 32) dirtValue += 3;
    if (target.talent.악취둔감) dirtValue = Math.floor(dirtValue / 3);
    if (target.talent.악취민감) dirtValue *= 2;
    dirtValue = Math.floor(dirtValue / 3);
    source[8] = dirtValue * 10 + 60;

    // ABL:봉사정신
    if (target.abl.봉사정신 === 0) {
      source[4] = 200;
      source[5] = 100;
      source[8] *= 4.00;
    } else if (target.abl.봉사정신 === 1) {
      source[4] = 250;
      source[5] = 180;
      source[8] *= 2.50;
    } else if (target.abl.봉사정신 === 2) {
      source[4] = 300;
      source[5] = 250;
      source[8] *= 1.50;
    } else if (target.abl.봉사정신 === 3) {
      source[4] = 350;
      source[5] = 350;
      source[8] *= 1.00;
    } else if (target.abl.봉사정신 === 4) {
      source[4] = 400;
      source[5] = 500;
      source[8] *= 0.50;
    } else {
      source[4] = 450;
      source[5] = 800;
      source[8] *= 0.10;
    }

    // ABL:기교 multipliers
    let techMult = 1.00;
    if (target.abl.기교 === 0) techMult = 0.70;
    else if (target.abl.기교 === 1) techMult = 0.90;
    else if (target.abl.기교 === 2) techMult = 1.00;
    else if (target.abl.기교 === 3) techMult = 1.20;
    else if (target.abl.기교 === 4) techMult = 1.40;
    else techMult = 1.60;
    source[4] *= techMult;
    source[5] *= techMult;

    // ABL:C감각
    let cSensBase = 20;
    let cSensMult = 0.80;
    if (target.abl.C감각 === 0) { cSensBase = 20; cSensMult = 0.80; }
    else if (target.abl.C감각 === 1) { cSensBase = 80; cSensMult = 0.90; }
    else if (target.abl.C감각 === 2) { cSensBase = 350; cSensMult = 1.00; }
    else if (target.abl.C감각 === 3) { cSensBase = 750; cSensMult = 1.10; }
    else if (target.abl.C감각 === 4) { cSensBase = 1200; cSensMult = 1.20; }
    else { cSensBase = 1750; cSensMult = 1.30; }
    source[0] = cSensBase;
    source[4] *= cSensMult;

    // PALAM:윤활
    const lubLevel = calculatePalamLevel(target.palam.윤활);
    let lubMultC = 1.00, lubMultPleasure = 1.00;
    if (lubLevel < 1) { lubMultC = 0.30; lubMultPleasure = 0.60; }
    else if (lubLevel < 2) { lubMultC = 0.60; lubMultPleasure = 0.80; }
    else if (lubLevel < 3) { lubMultC = 1.00; lubMultPleasure = 1.00; }
    else if (lubLevel < 4) { lubMultC = 1.50; lubMultPleasure = 1.20; }
    else if (lubLevel < 5) { lubMultC = 2.00; lubMultPleasure = 1.40; }
    else { lubMultC = 2.50; lubMultPleasure = 1.60; }
    source[0] *= lubMultC;
    source[4] *= lubMultPleasure;

    // Assistant's ABL:C감각
    let assistCMult4 = 1.00, assistCMult5 = 1.00;
    if (assistant.abl.C감각 === 0) { assistCMult4 = 0.80; assistCMult5 = 0.50; }
    else if (assistant.abl.C감각 === 1) { assistCMult4 = 0.90; assistCMult5 = 0.70; }
    else if (assistant.abl.C감각 === 2) { assistCMult4 = 1.00; assistCMult5 = 1.00; }
    else if (assistant.abl.C감각 === 3) { assistCMult4 = 1.10; assistCMult5 = 1.20; }
    else if (assistant.abl.C감각 === 4) { assistCMult4 = 1.20; assistCMult5 = 1.40; }
    else { assistCMult4 = 1.30; assistCMult5 = 1.70; }
    source[4] *= assistCMult4;
    source[5] *= assistCMult5;

    // Ejaculation gauge calculation
    let ejacGauge = 0;
    if (target.abl.기교 === 0) ejacGauge = 500;
    else if (target.abl.기교 === 1) ejacGauge = 1100;
    else if (target.abl.기교 === 2) ejacGauge = 2000;
    else if (target.abl.기교 === 3) ejacGauge = 3000;
    else if (target.abl.기교 === 4) ejacGauge = 3900;
    else ejacGauge = 4600;

    // PALAM:윤활 bonus to ejac
    if (lubLevel < 4) ejacGauge += 0;
    else if (lubLevel === 4) ejacGauge += 300;
    else if (lubLevel === 5) ejacGauge += 600;
    else ejacGauge += 1000;

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

    // Player's C sensitivity multiplier
    if (player.abl.C감각 === 0) ejacGauge *= 1.00;
    else if (player.abl.C감각 === 1) ejacGauge *= 1.50;
    else if (player.abl.C감각 === 2) ejacGauge *= 2.00;
    else if (player.abl.C감각 === 3) ejacGauge *= 2.50;
    else if (player.abl.C감각 === 4) ejacGauge *= 3.50;
    else ejacGauge *= 5.00;

    if (player.talents.후타나리 || player.talents.オトコ) {
      player.base.ejaculationGauge += Math.floor(ejacGauge);
    }

    // Ejaculation check
    const ejacThreshold = player.base.maxEjaculation;
    const currentEjac = player.base.ejaculationGauge;
    let ejacLevel = 0;
    if (currentEjac > ejacThreshold * 2) ejacLevel = 2;
    else if (currentEjac > ejacThreshold) ejacLevel = 1;

    if (ejacLevel > 0) {
      source[4] *= 2.00;

      // Semen addiction check
      if (target.abl.정액중독 === 0) {
        source[7] = 0;
        source[5] *= 1.50;
        source[13] *= 1.40;
      } else if (target.abl.정액중독 === 1) {
        source[7] = 200;
        source[5] *= 2.00;
        source[13] *= 1.00;
      } else if (target.abl.정액중독 === 2) {
        source[7] = 400;
        source[5] *= 2.50;
        source[13] *= 0.80;
      } else if (target.abl.정액중독 === 3) {
        source[7] = 700;
        source[5] *= 3.00;
        source[13] *= 0.50;
      } else if (target.abl.정액중독 === 4) {
        source[7] = 1000;
        source[5] *= 4.00;
        source[13] *= 0.20;
      } else {
        source[7] = 1500;
        source[5] *= 5.00;
        source[13] *= 0.00;
      }
    }

    // Large ejaculation
    if (ejacLevel === 2) {
      source[7] = (source[7] || 0) * 1.50;
      source[5] *= 1.20;

      player.experience.사정 += 2;
      target.experience.정액 += 2;
      // Display: 대량사정⚡
      // Display: 정액경험 +2

      player.stains.penis |= 4;
      player.base.ejaculationGauge -= ejacThreshold * 2;
      if (player.base.ejaculationGauge >= ejacThreshold) {
        player.base.ejaculationGauge = ejacThreshold - 1;
      }
      context.tflags[9] = 2; // Sumata ejaculation flag
    } else if (ejacLevel === 1) {
      player.experience.사정 += 1;
      target.experience.정액 += 1;
      // Display: 사정⚡
      // Display: 정액경험 +1

      player.stains.penis |= 4;
      player.base.ejaculationGauge -= ejacThreshold;
      if (player.base.ejaculationGauge >= ejacThreshold) {
        player.base.ejaculationGauge = ejacThreshold - 1;
      }
      context.tflags[9] = 1;
    }

    // Stain transfer
    // Target vagina ⇔ trainer penis
    target.stains.genital |= player.stains.penis;
    player.stains.penis |= target.stains.genital;
    // Assistant vagina ⇔ trainer penis
    assistant.stains.genital |= player.stains.penis;
    player.stains.penis |= assistant.stains.genital;
    // Target vagina ⇔ assistant vagina
    target.stains.genital |= assistant.stains.genital;
    assistant.stains.genital |= target.stains.genital;

    // Experience processing
    // Master and slave lesbian/gay
    if (!target.talent.オトコ && !player.talents.オトコ) {
      target.experience.레즈 += 7;
    } else if (target.talent.オトコ && player.talents.オトコ) {
      target.experience.호모 += 7;
    }

    // Assistant and slave lesbian/gay
    if (!target.talent.オトコ && !assistant.talents.オトコ) {
      target.experience.레즈 += 2;
    } else if (target.talent.オトコ && assistant.talents.オトコ) {
      target.experience.호모 += 2;
    }

    // Love experience
    if (target.affection >= 1000 && state.assistantPlayMode === 0) {
      target.experience.애정 += 1;
    }

    // Other processing
    context.tflags[100] = 1; // Pleasure experience
    context.tflags[200] = 1; // Submission mark 1

    // If trainer is futa, halve submission
    if (player.talents.후타나리) {
      source[13] /= 2;
    }

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
