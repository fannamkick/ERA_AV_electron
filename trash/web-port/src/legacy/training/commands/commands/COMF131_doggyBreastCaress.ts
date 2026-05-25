/**
 * COMF131: 후배위・가슴애무 (Doggy Style + Breast Caress)
 * 원본: ERB/指導関係/COMF131.ERB
 *
 * セックス系コマンド: 후배위と가슴애무の合わせ技。배면좌위, 정상위・가슴애무よりも쾌Bの上昇値が多い
 */

import { CommandPlugin } from '../../types';
import { TrainingContext, SourceValues } from '../../types';

export const comf131DoggyBreastCaress: CommandPlugin = {
  id: 131,
  name: '후배위・가슴애무',
  category: '삽입',
  staminaCost: 25,

  isAvailable(context: TrainingContext): boolean {
    // 처녀 확인 필요하지만 CONFIRM_LOST_VIRGIN에서 처리
    return true;
  },

  async execute(context: TrainingContext): Promise<void> {
    // SELECTCOM = 131 (라인 7)
    context.selectCom = 131;

    // 처녀를奪うかどうかの確認 (라인 9-12)
    // CALL CONFIRM_LOST_VIRGIN
    // SIF RESULT == 0 → RETURN 0
    // (처녀 확인 시스템이 별도 처리한다고 가정)

    // PRINTL 후배위・가슴애무 (라인 15)
    context.showMessage('후배위・가슴애무');

    // SAVESTR:0 = 후배위・가슴애무 (라인 16)
    context.saveStr = context.saveStr || [];
    context.saveStr[0] = '후배위・가슴애무';

    // CALL TRAIN_MESSAGE_B (라인 17)
    // (메시지 생성 시스템 호출)

    // V経験を伴うコマンドのフラグ (라인 19-22)
    context.tflags = context.tflags || [];
    context.tflags[19] = 1;
    if (context.talents[85] && context.assiPlay === 0 && (context.exp[0] || 0) === 0) {
      context.tflags[20] = 1;
    }

    // 調教者の사정チェック (라인 24-25)
    // CALL COM_EJAC_PLAYER_SEX
    // (플레이어 사정 시스템에서 처리)

    // ソースの計算 (라인 27-200)
    // LOSEBASE (라인 30-31)
    context.loseBase[0] = (context.loseBase[0] || 0) + 60;
    context.loseBase[1] = (context.loseBase[1] || 0) + 120;

    // SOURCE:12 = 800 (라인 33)
    const source: number[] = new Array(19).fill(0);

    // ABL:V감각をみる (라인 35-54)
    const abl2 = context.abilities[2] || 0;
    if (abl2 === 0) {
      source[1] = 40;
      source[0] = 50;
    } else if (abl2 === 1) {
      source[1] = 150;
      source[0] = 150;
    } else if (abl2 === 2) {
      source[1] = 400;
      source[0] = 250;
    } else if (abl2 === 3) {
      source[1] = 1000;
      source[0] = 350;
    } else if (abl2 === 4) {
      source[1] = 1700;
      source[0] = 600;
    } else {
      source[1] = 2200;
      source[0] = 850;
    }

    // EXP:V경험をみる (라인 56-80)
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

    // ABL:B感覚をみる (라인 82-101)
    const abl1 = context.abilities[1] || 0;
    if (abl1 === 0) {
      source[3] = 20;
      source[0] += 50;
    } else if (abl1 === 1) {
      source[3] = 100;
      source[0] += 100;
    } else if (abl1 === 2) {
      source[3] = 500;
      source[0] += 160;
    } else if (abl1 === 3) {
      source[3] = 1200;
      source[0] += 200;
    } else if (abl1 === 4) {
      source[3] = 2000;
      source[0] += 230;
    } else {
      source[3] = 2800;
      source[0] += 250;
    }

    // PALAM:윤활をみる (라인 103-121)
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

    // 調教者が후타나리 (라인 123-127)
    if (context.assiPlay) {
      if (context.assiTalents?.[121]) {
        source[1] = Math.floor(source[1] * 2.50);
      }
    }

    // 큰체구 (라인 129-131)
    if (context.talents[99]) {
      source[12] = Math.floor(source[12] * 1.80);
    }

    // 小柄体形 (라인 132-134)
    if (context.talents[100]) {
      source[12] = Math.floor(source[12] * 2.00);
    }

    // 정조관념 (라인 136-155)
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

    // PALAM:욕정をみる (라인 157-173)
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

    // ABL:従順をみる (라인 175-200)
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

    // セックス後の処理 (라인 202-203)
    // CALL COM_AFTER_VAGINA_SEX
    // (질내 삽입 후처리 시스템에서 처리)

    // SOURCE 적용
    await context.applySource(source);
  }
};
