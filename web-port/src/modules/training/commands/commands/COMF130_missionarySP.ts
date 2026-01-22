/**
 * COMF130: 정상위SP (Missionary Special)
 * 원본: ERB/指導関係/COMF130.ERB
 *
 * セックス系コマンド: 정상위・키스と정상위・가슴애무と子宮責めの合わせ技
 * 発動までに時間がかかる上, 必要能力も高めだが効果は非常に高い
 * 愛があると補正が大きい
 */

import { CommandPlugin } from '../../types';
import { TrainingContext, SourceValues } from '../../types';

export const comf130MissionarySP: CommandPlugin = {
  id: 130,
  name: '정상위SP',
  category: '삽입',
  staminaCost: 30,

  isAvailable(context: TrainingContext): boolean {
    // 처녀 확인 필요하지만 CONFIRM_LOST_VIRGIN에서 처리
    return true;
  },

  async execute(context: TrainingContext): Promise<void> {
    // SELECTCOM = 130 (라인 9)
    context.selectCom = 130;

    // 처녀를奪うかどうかの確認 (라인 11-14)
    // CALL CONFIRM_LOST_VIRGIN
    // SIF RESULT == 0 → RETURN 0
    // (처녀 확인 시스템이 별도 처리한다고 가정)

    // PRINTL 정상위SP (라인 17)
    context.showMessage('정상위SP');

    // SAVESTR:0 = 정상위SP (라인 18)
    context.saveStr = context.saveStr || [];
    context.saveStr[0] = '정상위SP';

    // CALL TRAIN_MESSAGE_B (라인 19)
    // (메시지 생성 시스템 호출)

    // V経験を伴うコマンドのフラグ (라인 21-24)
    context.tflags = context.tflags || [];
    context.tflags[19] = 1;
    if (context.talents[85] && context.assiPlay === 0 && (context.exp[0] || 0) === 0) {
      context.tflags[20] = 1;
    }

    // 調教者の사정チェック (라인 27)
    // CALL COM_EJAC_PLAYER_SEX
    // (플레이어 사정 시스템에서 처리)

    // ソースの計算 (라인 29-265)
    // LOSEBASE (라인 32-33)
    context.loseBase[0] = (context.loseBase[0] || 0) + 70;
    context.loseBase[1] = (context.loseBase[1] || 0) + 130;

    // SOURCE:12 = 400 (라인 35)
    const source: number[] = new Array(19).fill(0);

    // ABL:봉사정신をみる (라인 37-56)
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

    // ABL:기교をみる (라인 58-77)
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

    // ABL:C感覚をみる (라인 79-92)
    const abl0 = context.abilities[0] || 0;
    if (abl0 === 0) {
      source[0] = 20;
    } else if (abl0 === 1) {
      source[0] = 100;
    } else if (abl0 === 2) {
      source[0] = 500;
    } else if (abl0 === 3) {
      source[0] = 1200;
    } else if (abl0 === 4) {
      source[0] = 2000;
    } else {
      source[0] = 2800;
    }

    // ABL:V감각をみる (라인 94-113)
    const abl2 = context.abilities[2] || 0;
    if (abl2 === 0) {
      source[1] = 10;
      source[0] += 250;
    } else if (abl2 === 1) {
      source[1] = 50;
      source[0] += 500;
    } else if (abl2 === 2) {
      source[1] = 450;
      source[0] += 550;
    } else if (abl2 === 3) {
      source[1] = 1000;
      source[0] += 800;
    } else if (abl2 === 4) {
      source[1] = 2800;
      source[0] += 1200;
    } else {
      source[1] = 4000;
      source[0] += 1800;
    }

    // EXP:V경험をみる (라인 115-134)
    const exp0 = context.exp[0] || 0;
    const explv1 = 100; // EXPLV:1 가정
    const explv2 = 500;
    const explv3 = 2000;
    const explv4 = 8000;
    const explv5 = 30000;

    if (exp0 < explv1) {
      source[1] = Math.floor(source[1] * 0.20);
      source[12] = 5500;
    } else if (exp0 < explv2) {
      source[1] = Math.floor(source[1] * 0.60);
      source[12] = 300;
    } else if (exp0 < explv3) {
      source[1] = Math.floor(source[1] * 1.00);
      source[12] = 50;
    } else if (exp0 < explv4) {
      source[1] = Math.floor(source[1] * 1.20);
      source[12] = 10;
    } else if (exp0 < explv5) {
      source[1] = Math.floor(source[1] * 1.30);
      source[12] = 0;
    } else {
      source[1] = Math.floor(source[1] * 1.80);
      source[12] = 0;
    }

    // PALAM:윤활をみる (라인 136-154)
    const palam3 = context.params[3] || 0;
    const palamlv1 = 1000;
    const palamlv2 = 3000;
    const palamlv3 = 10000;
    const palamlv4 = 30000;

    if (palam3 < palamlv1) {
      source[1] = Math.floor(source[1] * 0.10);
      source[12] = Math.floor((source[12] + 1000) * 3.00);
    } else if (palam3 < palamlv2) {
      source[1] = Math.floor(source[1] * 0.40);
      source[12] = Math.floor((source[12] + 300) * 1.00);
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

    // 調教者が후타나리 (라인 156-160)
    if (context.assiPlay) {
      if (context.assiTalents?.[121]) {
        source[1] = Math.floor(source[1] * 2.50);
      }
    }

    // 큰체구 (라인 162-164)
    if (context.talents[99]) {
      source[12] = Math.floor(source[12] * 0.80);
    }

    // 小柄体形 (라인 165-167)
    if (context.talents[100]) {
      source[12] = Math.floor(source[12] * 2.00);
    }

    // 미숙함 (라인 168-170)
    if (context.talents[135]) {
      source[12] = Math.floor(source[12] * 4.00);
    }

    // 정조관념 (라인 172-191)
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

    // ABL:B感覚をみる (라인 193-212)
    const abl1 = context.abilities[1] || 0;
    if (abl1 === 0) {
      source[3] = 20;
      source[0] = 50;
    } else if (abl1 === 1) {
      source[3] = 100;
      source[0] = 100;
    } else if (abl1 === 2) {
      source[3] = 500;
      source[0] = 160;
    } else if (abl1 === 3) {
      source[3] = 1200;
      source[0] = 200;
    } else if (abl1 === 4) {
      source[3] = 2000;
      source[0] = 230;
    } else {
      source[3] = 2800;
      source[0] = 250;
    }

    // PALAM:욕정をみる (라인 214-230)
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

    // ABL:従順をみる (라인 232-257)
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

    // TALENT:愛をみる (라인 259-265)
    if (context.talents[85]) {
      source[0] = Math.floor(source[0] * 1.50);
      source[1] = Math.floor(source[1] * 1.50);
      source[0] = Math.floor(source[0] * 2.00);
      source[3] = Math.floor(source[3] * 1.50);
    }

    // 汚れの処理 (라인 267-276)
    // 奴隷の口⇔調教者の口の汚れが移動 (라인 270-272)
    context.stain = context.stain || [];
    context.playerStain = context.playerStain || [];
    context.stain[0] = (context.stain[0] || 0) | (context.playerStain[0] || 0);
    context.playerStain[0] = (context.playerStain[0] || 0) | (context.stain[0] || 0);

    // 奴隷のB⇔調教者の指の汚れが移動 (라인 274-276)
    context.stain[5] = (context.stain[5] || 0) | (context.playerStain[1] || 0);
    context.playerStain[1] = (context.playerStain[1] || 0) | (context.stain[5] || 0);

    // セックス後の処理 (라인 279)
    // CALL COM_AFTER_VAGINA_SEX
    // (질내 삽입 후처리 시스템에서 처리)

    // SOURCE 적용
    await context.applySource(source);
  }
};
