/**
 * COMF73 - 유두 맞대기 (Nipple rubbing)
 * 원본: ERB/指導関係/COMF73.ERB
 *
 * 전력으로 미완성이지만 원본 ERB 로직을 100% 그대로 포팅
 * 에러 나서 발견. 지워도 괜찮았지만 그대로 둠
 */

import type { CommandPlugin } from '../../types';
import type { TrainingContext, SourceValues } from '../../types';
import { SourceModifier } from '../../systems/SourceModifier';

export const COMF73_nippleRubbing: CommandPlugin = {
  id: 73,
  name: '유두 맞대기',
  category: '애무',
  staminaCost: 30,

  /**
   * 가용성 판정
   * 원본: COMABLE.ERB @COM_ABLE73
   */
  isAvailable: (context: TrainingContext) => {
    // TODO: Add availability check from COMABLE.ERB
    return true;
  },

  /**
   * SOURCE 계산
   * 원본: COMF73.ERB 라인 10-139
   */
  // TODO: Move calculateSource logic to execute
  // calculateSource: (context: TrainingContext): SourceValues => {
    const { target } = context;
    const abilities = target.abl;
    const playerAbilities = context.player?.abilities || {};

    // LOSEBASE (라인 13-14)
    context.loseBase[1] += 30; // 원본 라인 13: LOSEBASE:1 += 30
    context.loseBase[1] += 90; // 원본 라인 14: LOSEBASE:1 += 90

    // 기본 SOURCE 설정 (라인 16-20)
    const source: number[] = new Array(19).fill(0);

    // ABL:종순을 봄 (라인 22-35)
    const submission = abilities['종순'] || 0;
    if (submission === 0) {
      source[14] = 200;
    } else if (submission === 1) {
      source[14] = 120;
    } else if (submission === 2) {
      source[14] = 60;
    } else if (submission === 3) {
      source[14] = 20;
    } else if (submission === 4) {
      source[14] = 0;
    } else {
      source[14] = 0;
    }

    // ABL:B감각을 봄 (라인 37-74)
    const bSense = abilities['B감각'] || 0;
    if (bSense === 0) {
      source[3] = 20;
      source[3] = 0;
      source[7] = 0;
      source[8] = 20;
      source[10] *= 0.80;
    } else if (bSense === 1) {
      source[3] = 80;
      source[3] = 10;
      source[7] = 50;
      source[8] = 20;
      source[10] *= 0.90;
    } else if (bSense === 2) {
      source[3] = 350;
      source[3] = 50;
      source[7] = 100;
      source[8] = 20;
      source[10] *= 1.00;
    } else if (bSense === 3) {
      source[3] = 750;
      source[3] = 100;
      source[7] = 300;
      source[8] = 20;
      source[10] *= 1.10;
    } else if (bSense === 4) {
      source[3] = 1200;
      source[3] = 700;
      source[7] = 600;
      source[8] = 20;
      source[10] *= 1.20;
    } else {
      source[3] = 1750;
      source[3] = 2000;
      source[7] = 1000;
      source[8] = 20;
      source[10] *= 1.30;
    }

    // ABL:기교를 봄 (라인 76-101)
    // 원본은 모든 케이스가 동일한 배율이지만 그대로 포팅
    const technique = abilities['기교'] || 0;
    if (technique === 0) {
      source[3] *= 1.00;
      source[7] *= 0.60;
      source[8] *= 0.50;
    } else if (technique === 1) {
      source[3] *= 1.00;
      source[7] *= 0.60;
      source[8] *= 0.50;
    } else if (technique === 2) {
      source[3] *= 1.00;
      source[7] *= 0.60;
      source[8] *= 0.50;
    } else if (technique === 3) {
      source[3] *= 1.00;
      source[7] *= 0.60;
      source[8] *= 0.50;
    } else if (technique === 4) {
      source[3] *= 1.00;
      source[7] *= 0.60;
      source[8] *= 0.50;
    } else {
      source[3] *= 1.00;
      source[7] *= 0.60;
      source[8] *= 0.50;
    }

    // ABL:봉사정신을 봄 (라인 103-116)
    const service = abilities['봉사정신'] || 0;
    if (service === 0) {
      source[7] *= 0.50;
    } else if (service === 1) {
      source[7] *= 1.00;
    } else if (service === 2) {
      source[7] *= 1.20;
    } else if (service === 3) {
      source[7] *= 1.40;
    } else if (service === 4) {
      source[7] *= 1.70;
    } else {
      source[7] *= 2.00;
    }

    // 조교자의 ABL:B감각을 봄 (라인 119-138)
    const playerBSense = playerAbilities['B감각'] || 0;
    if (playerBSense === 0) {
      source[3] *= 0.80;
      source[7] *= 0.50;
    } else if (playerBSense === 1) {
      source[3] *= 0.90;
      source[7] *= 0.70;
    } else if (playerBSense === 2) {
      source[3] *= 1.00;
      source[7] *= 1.00;
    } else if (playerBSense === 3) {
      source[3] *= 1.10;
      source[7] *= 1.20;
    } else if (playerBSense === 4) {
      source[3] *= 1.20;
      source[7] *= 1.40;
    } else {
      source[3] *= 1.30;
      source[7] *= 1.70;
    }

    // SourceModifier로 소질/능력 보정 적용
    source = SourceModifier.applyAll(source, context);

    return source;
  },

  /**
   * 커맨드 실행
   * 원본: COMF73.ERB 전체
   */
  async execute(context: TrainingContext): Promise<void> {
    // 커맨드명 표시 (라인 6)
    context.showMessage('유두 맞대기');

    // TODO: TRAIN_MESSAGE_B 호출 (라인 8)

    // 더럽힘 처리 (라인 141-143)
    // 노예의 B ⇔ 조교자의 B의 더러움이 이동
    context.stain[5] |= context.playerStain[5];
    context.playerStain[5] |= context.stain[5];

    // 경험 상승 (라인 145-149)
    if (context.talents[122] === 0 && context.playerTalents[122] === 0) {
      context.exp[40] += 8;
      context.showMessage('레즈경험 +8');
    }

    // TFLAG:30 증가 (라인 151-152)
    if (context.assiPlay === 0 && (context.target.abl[0] || 0) >= 3) {
      context.flags[30] += 1;
    }

    // TFLAG:100 설정 (라인 154)
    context.flags[100] = 1;
  },

  /**
   * 메시지 생성
   */
  // TODO: Move generateMessage logic to execute
  // generateMessage: (context: TrainingContext) => {
    const targetName = context.target.name;
    const playerName = context.playerName || '당신';
    return `${playerName}과(와) ${targetName}의 유두를 맞대었다.`;
  },
};
