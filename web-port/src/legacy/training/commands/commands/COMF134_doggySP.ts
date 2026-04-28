/**
 * COMF134: 후배위SP (Doggy Style Special)
 * 원본: ERB/指導関係/COMF134.ERB
 *
 * セックス系コマンド: 서서삽입＋子宮責め
 */

import { CommandPlugin } from '../../types';
import { TrainingContext, SourceValues } from '../../types';

export const comf134DoggySP: CommandPlugin = {
  id: 134,
  name: '후배위SP',
  category: '삽입',
  staminaCost: 25,

  isAvailable(context: TrainingContext): boolean {
    // 처녀 확인 필요하지만 CONFIRM_LOST_VIRGIN에서 처리
    return true;
  },

  async execute(context: TrainingContext): Promise<void> {
    // SELECTCOM = 134 (라인 7)
    context.selectCom = 134;

    // 처녀를奪うかどうかの確인 (라인 9-12)
    // CALL CONFIRM_LOST_VIRGIN
    // SIF RESULT == 0 → RETURN 0
    // (처녀 확인 시스템이 별도 처리한다고 가정)

    // PRINTL 후배위SP (라인 16)
    context.showMessage('후배위SP');

    // SAVESTR:0 = 후배위SP (라인 17)
    context.saveStr = context.saveStr || [];
    context.saveStr[0] = '후배위SP';

    // CALL TRAIN_MESSAGE_B (라인 18)
    // (메시지 생성 시스템 호출)

    // V経験を伴うコマンドのフラグ (라인 20-23)
    context.tflags = context.tflags || [];
    context.tflags[19] = 1;
    if (context.talents[85] && context.assiPlay === 0 && (context.exp[0] || 0) === 0 && !context.equipment[89]) {
      context.tflags[20] = 1;
    }

    // 調教者の사정チェック (라인 25-26)
    // CALL COM_EJAC_PLAYER_SEX
    // (플레이어 사정 시스템에서 처리)

    // ソースの計算 (라인 28-280)
    // LOSEBASE (라인 31-32)
    context.loseBase[0] = (context.loseBase[0] || 0) + 60;
    context.loseBase[1] = (context.loseBase[1] || 0) + 120;

    // SOURCE:12 = 800 (라인 34)
    const source: number[] = new Array(19).fill(0);

    // ABL:봉사정신をみる (라인 36-55)
    const abl16 = context.abilities[16] || 0;
    if (abl16 === 0) {
      source[5] = 50;
      source[4] = 10;
    } else if (abl16 === 1) {
      source[5] = 150;
      source[4] = 50;
    } else if (abl16 === 2) {
      source[5] = 200;
      source[4] = 100;
    } else if (abl16 === 3) {
      source[5] = 250;
      source[4] = 180;
    } else if (abl16 === 4) {
      source[5] = 300;
      source[4] = 300;
    } else {
      source[5] = 350;
      source[4] = 500;
    }

    // ABL:기교をみる (라인 57-76)
    const abl12 = context.abilities[12] || 0;
    if (abl12 === 0) {
      source[5] = Math.floor(source[5] * 0.50);
      source[4] = Math.floor(source[4] * 0.50);
    } else if (abl12 === 1) {
      source[5] = Math.floor(source[5] * 0.80);
      source[4] = Math.floor(source[4] * 0.80);
    } else if (abl12 === 2) {
      source[5] = Math.floor(source[5] * 1.00);
      source[4] = Math.floor(source[4] * 1.00);
    } else if (abl12 === 3) {
      source[5] = Math.floor(source[5] * 1.50);
      source[4] = Math.floor(source[4] * 1.50);
    } else if (abl12 === 4) {
      source[5] = Math.floor(source[5] * 2.50);
      source[4] = Math.floor(source[4] * 2.50);
    } else {
      source[5] = Math.floor(source[5] * 4.00);
      source[4] = Math.floor(source[4] * 4.00);
    }

    // ABL:V감각をみる (라인 78-97)
    const abl2 = context.abilities[2] || 0;
    if (abl2 === 0) {
      source[1] = 10;
      source[0] = 250;
    } else if (abl2 === 1) {
      source[1] = 50;
      source[0] = 500;
    } else if (abl2 === 2) {
      source[1] = 450;
      source[0] = 550;
    } else if (abl2 === 3) {
      source[1] = 1000;
      source[0] = 800;
    } else if (abl2 === 4) {
      source[1] = 2800;
      source[0] = 1200;
    } else {
      source[1] = 4000;
      source[0] = 1800;
    }

    // EXP:V경험をみる (라인 99-123)
    const exp0 = context.exp[0] || 0;
    const explv1 = 100; // EXPLV:1 가정
    const explv2 = 500;
    const explv3 = 2000;
    const explv4 = 8000;
    const explv5 = 30000;

    if (exp0 < explv1) {
      source[1] = Math.floor(source[1] * 0.20);
      source[12] = 5000;

      if (context.assiPlay && !context.playerTalents?.[122]) {
        context.exp[50] = (context.exp[50] || 0) + 1;
        context.showMessage('처녀를빼앗김경험 +1');
      }
    } else if (exp0 < explv2) {
      source[1] = Math.floor(source[1] * 0.60);
      source[12] = 220;
    } else if (exp0 < explv3) {
      source[1] = Math.floor(source[1] * 1.00);
      source[12] = 30;
    } else if (exp0 < explv4) {
      source[1] = Math.floor(source[1] * 1.20);
      source[12] = 5;
    } else if (exp0 < explv5) {
      source[1] = Math.floor(source[1] * 1.30);
      source[12] = 0;
    } else {
      source[1] = Math.floor(source[1] * 1.80);
      source[12] = 0;
    }

    // ABL:B感覚をみる (라인 125-144)
    const abl1 = context.abilities[1] || 0;
    if (abl1 === 0) {
      source[3] = 20;
      source[0] += 50;
    } else if (abl1 === 1) {
      source[3] = 100;
      source[0] += 100;
    } else if (abl1 === 2) {
      source[3] = 600;
      source[0] += 200;
    } else if (abl1 === 3) {
      source[3] = 1400;
      source[0] += 300;
    } else if (abl1 === 4) {
      source[3] = 2200;
      source[0] += 600;
    } else {
      source[3] = 3200;
      source[0] += 1000;
    }

    // PALAM:윤활をみる (라인 146-164)
    const palam3 = context.params[3] || 0;
    const palamlv1 = 1000;
    const palamlv2 = 3000;
    const palamlv3 = 10000;
    const palamlv4 = 30000;

    if (palam3 < palamlv1) {
      source[1] = Math.floor(source[1] * 0.10);
      source[12] += 900;
      source[12] = Math.floor(source[12] * 3.00);
    } else if (palam3 < palamlv2) {
      source[1] = Math.floor(source[1] * 0.40);
      source[12] += 250;
      source[12] = Math.floor(source[12] * 1.00);
    } else if (palam3 < palamlv3) {
      source[1] = Math.floor(source[1] * 1.00);
      source[12] = Math.floor(source[12] * 0.50);
    } else if (palam3 < palamlv4) {
      source[1] = Math.floor(source[1] * 1.40);
      source[12] = Math.floor(source[12] * 0.20);
    } else if (palam3 >= palamlv4) {
      source[1] = Math.floor(source[1] * 1.80);
      source[12] = Math.floor(source[12] * 0.10);
    }

    // 調教者が후타나리 (라인 166-170)
    if (context.assiPlay) {
      if (context.assiTalents?.[121]) {
        source[1] = Math.floor(source[1] * 2.50);
      }
    }

    // 큰체구 (라인 172-174)
    if (context.talents[99]) {
      source[12] = Math.floor(source[12] * 1.80);
    }

    // 小柄体形 (라인 175-177)
    if (context.talents[100]) {
      source[12] = Math.floor(source[12] * 2.00);
    }

    // 정조관념 (라인 179-198)
    if (context.talents[30]) {
      if (exp0 === 0) {
        source[0] = Math.floor(source[0] * 0.60);
        source[14] = 10000;
      } else {
        source[0] = Math.floor(source[0] * 0.60);
        source[14] = 1000;
      }
    } else if (context.talents[31]) {
      // 정조무관심
      if (exp0 === 0) {
        source[0] = Math.floor(source[0] * 0.60);
        source[14] = 300;
      }
    } else {
      if (exp0 === 0) {
        source[14] = 3000;
      }
    }

    // PALAM:욕정をみる (라인 200-216)
    const palam5 = context.params[5] || 0;
    if (palam5 < palamlv1) {
      source[1] = Math.floor(source[1] * 0.60);
      source[0] = Math.floor(source[0] * 0.30);
    } else if (palam5 < palamlv2) {
      source[1] = Math.floor(source[1] * 0.80);
      source[0] = Math.floor(source[0] * 0.60);
    } else if (palam5 < palamlv3) {
      source[1] = Math.floor(source[1] * 1.00);
      source[0] = Math.floor(source[0] * 1.00);
    } else if (palam5 < palamlv4) {
      source[1] = Math.floor(source[1] * 1.20);
      source[0] = Math.floor(source[0] * 1.50);
    } else if (palam5 >= palamlv4) {
      source[1] = Math.floor(source[1] * 1.50);
      source[0] = Math.floor(source[0] * 1.80);
    }

    // ABL:従順をみる (라인 218-243)
    const abl10 = context.abilities[10] || 0;
    if (abl10 === 0) {
      source[1] = Math.floor(source[1] * 0.50);
      source[0] = Math.floor(source[0] * 0.60);
      source[14] = Math.floor(source[14] * 2.00);
    } else if (abl10 === 1) {
      source[1] = Math.floor(source[1] * 0.80);
      source[0] = Math.floor(source[0] * 0.80);
      source[14] = Math.floor(source[14] * 1.50);
    } else if (abl10 === 2) {
      source[1] = Math.floor(source[1] * 1.00);
      source[0] = Math.floor(source[0] * 1.00);
      source[14] = Math.floor(source[14] * 1.00);
    } else if (abl10 === 3) {
      source[1] = Math.floor(source[1] * 1.30);
      source[0] = Math.floor(source[0] * 1.20);
      source[14] = Math.floor(source[14] * 0.80);
    } else if (abl10 === 4) {
      source[1] = Math.floor(source[1] * 1.60);
      source[0] = Math.floor(source[0] * 1.40);
      source[14] = Math.floor(source[14] * 0.60);
    } else {
      source[1] = Math.floor(source[1] * 2.00);
      source[0] = Math.floor(source[0] * 1.60);
      source[14] = Math.floor(source[14] * 0.30);
    }

    // 愛 (라인 245-250)
    if (context.talents[85]) {
      source[1] = Math.floor(source[1] * 1.50);
      source[0] = Math.floor(source[0] * 2.00);
      source[3] = Math.floor(source[3] * 1.50);
    }

    // 후배위스팽킹を挟んでいた場合, 마조끼補正がさらにかかる (라인 252-280)
    if ((context.tflags[59] || 0) === 132 || context.prevCom === 132) {
      // ABL:마조끼をみる (라인 254-279)
      const abl21 = context.abilities[21] || 0;
      if (abl21 === 0) {
        source[1] = Math.floor(source[1] * 0.60);
        source[7] = Math.floor(source[7] * 0.80);
        source[11] = Math.floor(source[11] * 0.80);
      } else if (abl21 === 1) {
        source[1] = Math.floor(source[1] * 0.80);
        source[7] = Math.floor(source[7] * 1.00);
        source[11] = Math.floor(source[11] * 1.00);
      } else if (abl21 === 2) {
        source[1] = Math.floor(source[1] * 1.00);
        source[7] = Math.floor(source[7] * 1.20);
        source[11] = Math.floor(source[11] * 1.50);
      } else if (abl21 === 3) {
        source[1] = Math.floor(source[1] * 1.10);
        source[7] = Math.floor(source[7] * 1.40);
        source[11] = Math.floor(source[11] * 3.00);
      } else if (abl21 === 4) {
        source[1] = Math.floor(source[1] * 1.20);
        source[7] = Math.floor(source[7] * 2.00);
        source[11] = Math.floor(source[11] * 5.00);
      } else {
        source[1] = Math.floor(source[1] * 1.30);
        source[7] = Math.floor(source[7] * 3.00);
        source[11] = Math.floor(source[11] * 8.00);
      }
    }

    // 汚れの処理 (라인 282-291)
    // 奴隷の口⇔調教者の口の汚れが移動 (라인 285-287)
    context.stain = context.stain || [];
    context.playerStain = context.playerStain || [];
    context.stain[0] = (context.stain[0] || 0) | (context.playerStain[0] || 0);
    context.playerStain[0] = (context.playerStain[0] || 0) | (context.stain[0] || 0);

    // 奴隷のB⇔調教者の指の汚れが移動 (라인 289-291)
    context.stain[5] = (context.stain[5] || 0) | (context.playerStain[1] || 0);
    context.playerStain[1] = (context.playerStain[1] || 0) | (context.stain[5] || 0);

    // セックス後の処理 (라인 293-294)
    // CALL COM_AFTER_VAGINA_SEX
    // (질내 삽입 후처리 시스템에서 처리)

    // SOURCE 적용
    await context.applySource(source);
  }
};
