import { CommandPlugin, TrainingContext } from '../../types';

/**
 * COMF142 - 세로파이즈리 (Vertical Paizuri)
 * 원본: ERB/指導関係/COMF142.ERB (511 lines)
 *
 * 봉사계 커맨드: 조교 대상이 조교자의 성기를 유방으로 자극 (세로 방향)
 */
export const COMF142_verticalPaizuri: CommandPlugin = {
  id: 142,
  name: '세로파이즈리',
  category: '파이즈리',
  staminaCost: 0,

  isAvailable(context: TrainingContext): boolean {
    // 원본: COMF142.ERB @COM142 (라인 12-207)

    let A = 0;
    let S = 0;

    // CALL COM_ORDER
    // (순종도 등 공통 요소 - 현재는 생략, 필요시 추가)

    // ABL:욕망 (라인 19-27)
    const abl11 = context.abilities[11] || 0;
    if (abl11 > 0) {
      A += abl11 * 1;
      S = 1;
    }

    // ABL:봉사정신 (라인 28-36)
    const abl16 = context.abilities[16] || 0;
    if (abl16 > 0) {
      A += abl16 * 4;
      S = 1;
    }

    // ABL:정액중독 (라인 37-45)
    const abl32 = context.abilities[32] || 0;
    if (abl32 > 0) {
      A += abl32 * 3;
      S = 1;
    }

    // 쾌락각인 (라인 47-55)
    const mark1 = context.marks?.[1] || 0;
    if (mark1 > 0) {
      A += mark1 * 1;
      S = 1;
    }

    // PALAM:욕정 (라인 58-79)
    const palam5 = context.params[5] || 0;
    let L = 0;
    if (palam5 < 10000) {
      L = 0;
    } else if (palam5 < 30000) {
      L = 1;
    } else if (palam5 < 100000) {
      L = 2;
    } else if (palam5 < 300000) {
      L = 3;
    } else if (palam5 < 1000000) {
      L = 4;
    } else {
      L = 5;
    }
    if (L > 0) {
      A += L * 1;
      S = 1;
    }

    // TALENT:수줍음 (라인 81-88)
    if (context.talents[35] === 1) {
      A -= 3;
      S = 1;
    }

    // TALENT:악취둔감 (라인 89-97)
    if (context.talents[61] === 1) {
      A += 1;
      S = 1;
    }

    // TALENT:악취민감 (라인 98-105)
    if (context.talents[62] === 1) {
      A -= 3;
      S = 1;
    }

    // TALENT:헌신적 (라인 106-114)
    if (context.talents[63] === 1) {
      A += 6;
      S = 1;
    }

    // TALENT:쾌감을 부정 (라인 115-122)
    if (context.talents[71] === 1) {
      A -= 3;
      S = 1;
    }

    // TALENT:남성혐오 && 트레이너가 여성 (라인 123-130)
    if (context.talents[82] === 1 && context.playerTalents?.[122] === 1) {
      A -= 12;
      S = 1;
    }

    // TALENT:愛 && ASSIPLAY == 0 (라인 131-139)
    if (context.talents[85] === 1 && context.assiPlay === 0) {
      A += 5;
      S = 1;
    }

    // 트레이너가 후타나리 (라인 140-148)
    if (context.playerTalents?.[121] === 1) {
      A += 8;
      S = 1;
    }

    // 더러움 체크 (라인 150-187)
    let Y = 0;
    const playerStain2 = context.playerStain?.[2] || 0;
    const playerStain4 = context.playerStain?.[4] || 0;

    // 애액 (라인 151-153)
    if (playerStain2 & 1) Y += 1;
    // 정액 (라인 154-156)
    if (playerStain2 & 4) Y += 3;
    // 애널 (라인 157-159)
    if (playerStain2 & 8) Y += 7;
    // 모유 (라인 160-162)
    if (playerStain2 & 16) Y += 1;
    // 尿 (라인 163-165)
    if (playerStain4 & 32) Y += 3;

    // 악취둔감/민감 (라인 167-170)
    if (context.talents[61] === 1) Y = Math.floor(Y / 3);
    if (context.talents[62] === 1) Y = Math.floor(Y * 2);

    if (Y > 0) {
      A -= Y;
      S = 1;
    }

    // 실행치 체크: 40 이상 필요 (라인 189-207)
    const V = 40;
    return A >= V;
  },

  async execute(context: TrainingContext): Promise<void> {
    // 원본: COMF142.ERB @COM142 (라인 209-509)

    context.showMessage('세로파이즈리');

    // SAVESTR:0 = 세로파이즈리 (라인 209)
    context.saveStr = context.saveStr || [];
    context.saveStr[0] = '세로파이즈리';

    // CALL TRAIN_MESSAGE_B (라인 210)
    // (메시지 생성 로직 - 생략)

    // -------------------------------------------------
    // LOSEBASE 계산 (라인 215-221)
    // -------------------------------------------------
    context.loseBase = context.loseBase || [];
    if (context.talents[47] === 1) {
      // TALENT:47 (쿨데레)
      context.loseBase[0] = (context.loseBase[0] || 0) + 10;
      context.loseBase[1] = (context.loseBase[1] || 0) + 70;
    } else {
      context.loseBase[0] = (context.loseBase[0] || 0) + 10;
      context.loseBase[1] = (context.loseBase[1] || 0) + 150;
    }

    // -------------------------------------------------
    // SOURCE 계산 (라인 224-304)
    // -------------------------------------------------
    const source: number[] = [];

    // SOURCE:13, 14 (라인 224-225)
    source[13] = 1800;
    source[14] = 900;

    // ABL:봉사정신 → SOURCE:4, 5, 8 (라인 228-253)
    const abl16 = context.abilities[16] || 0;
    if (abl16 === 0) {
      source[4] = 420;
      source[5] = 150;
      source[8] = 400;
    } else if (abl16 === 1) {
      source[4] = 500;
      source[5] = 300;
      source[8] = 300;
    } else if (abl16 === 2) {
      source[4] = 580;
      source[5] = 600;
      source[8] = 150;
    } else if (abl16 === 3) {
      source[4] = 660;
      source[5] = 900;
      source[8] = 50;
    } else if (abl16 === 4) {
      source[4] = 740;
      source[5] = 1500;
      source[8] = 20;
    } else {
      source[4] = 820;
      source[5] = 2200;
      source[8] = 0;
    }

    // ABL:B感覚 → A (라인 255-268)
    const abl1 = context.abilities[1] || 0;
    let A = 0;
    if (abl1 === 0) {
      A = 100;
    } else if (abl1 === 1) {
      A = 200;
    } else if (abl1 === 2) {
      A = 400;
    } else if (abl1 === 3) {
      A = 800;
    } else if (abl1 === 4) {
      A = 1200;
    } else {
      A = 1500;
    }

    // 거유 (라인 270-273)
    if (context.talents[110] === 1) {
      A = Math.floor(A * 1.20);
    }

    // 폭유 (라인 274-277)
    if (context.talents[114] === 1) {
      A = Math.floor(A * 1.30);
    }

    // 절벽/빈유 (라인 278-282)
    if (context.talents[108] === 1) {
      A = Math.floor(A * 1.20);
    } else if (context.talents[107] === 1) {
      A = Math.floor(A * 0.70);
    }

    // SOURCE:17 += A (라인 284)
    source[17] = (source[17] || 0) + A;

    // ABL:기교 → SOURCE:4, 5 보정 (라인 285-304)
    const abl12 = context.abilities[12] || 0;
    if (abl12 === 0) {
      source[4] = Math.floor(source[4] * 0.50);
      source[5] = Math.floor(source[5] * 0.50);
    } else if (abl12 === 1) {
      source[4] = Math.floor(source[4] * 0.80);
      source[5] = Math.floor(source[5] * 0.80);
    } else if (abl12 === 2) {
      source[4] = Math.floor(source[4] * 1.00);
      source[5] = Math.floor(source[5] * 1.00);
    } else if (abl12 === 3) {
      source[4] = Math.floor(source[4] * 1.20);
      source[5] = Math.floor(source[5] * 1.20);
    } else if (abl12 === 4) {
      source[4] = Math.floor(source[4] * 1.50);
      source[5] = Math.floor(source[5] * 1.50);
    } else {
      source[4] = Math.floor(source[4] * 2.00);
      source[5] = Math.floor(source[5] * 2.00);
    }

    // -------------------------------------------------
    // 사정게이지 계산 (라인 309-387)
    // -------------------------------------------------
    let B = 0;

    // ABL:기교 (라인 311-324)
    if (abl12 === 0) {
      B = 1500;
    } else if (abl12 === 1) {
      B = 2100;
    } else if (abl12 === 2) {
      B = 2900;
    } else if (abl12 === 3) {
      B = 4000;
    } else if (abl12 === 4) {
      B = 5000;
    } else {
      B = 6000;
    }

    // ABL:従順 (라인 326-339)
    const abl10 = context.abilities[10] || 0;
    if (abl10 === 0) {
      B = Math.floor(B * 0.80);
    } else if (abl10 === 1) {
      B = Math.floor(B * 0.90);
    } else if (abl10 === 2) {
      B = Math.floor(B * 1.00);
    } else if (abl10 === 3) {
      B = Math.floor(B * 1.10);
    } else if (abl10 === 4) {
      B = Math.floor(B * 1.20);
    } else {
      B = Math.floor(B * 1.30);
    }

    // ABL:봉사기술 (라인 341-354)
    const abl13 = context.abilities[13] || 0;
    if (abl13 === 0) {
      B = Math.floor(B * 0.50);
    } else if (abl13 === 1) {
      B = Math.floor(B * 0.80);
    } else if (abl13 === 2) {
      B = Math.floor(B * 1.20);
    } else if (abl13 === 3) {
      B = Math.floor(B * 1.50);
    } else if (abl13 === 4) {
      B = Math.floor(B * 1.80);
    } else {
      B = Math.floor(B * 2.40);
    }

    // ABL:정액중독 (라인 356-369)
    const abl32 = context.abilities[32] || 0;
    if (abl32 === 0) {
      B = Math.floor(B * 0.80);
    } else if (abl32 === 1) {
      B = Math.floor(B * 0.90);
    } else if (abl32 === 2) {
      B = Math.floor(B * 1.00);
    } else if (abl32 === 3) {
      B = Math.floor(B * 1.10);
    } else if (abl32 === 4) {
      B = Math.floor(B * 1.20);
    } else {
      B = Math.floor(B * 1.30);
    }

    // 플레이어의 ABL:C感覚 (라인 371-384)
    const playerAbl0 = context.playerAbilities?.[0] || 0;
    if (playerAbl0 === 0) {
      B = Math.floor(B * 1.00);
    } else if (playerAbl0 === 1) {
      B = Math.floor(B * 1.50);
    } else if (playerAbl0 === 2) {
      B = Math.floor(B * 2.00);
    } else if (playerAbl0 === 3) {
      B = Math.floor(B * 2.50);
    } else if (playerAbl0 === 4) {
      B = Math.floor(B * 3.50);
    } else {
      B = Math.floor(B * 5.00);
    }

    // BASE:PLAYER:2 업데이트 (라인 386-387)
    if (context.playerTalents?.[121] === 1 || context.playerTalents?.[122] === 1) {
      context.playerBase = context.playerBase || [];
      context.playerBase[2] = (context.playerBase[2] || 0) + B;
    }

    // -------------------------------------------------
    // 사정 체크 (라인 392-467)
    // -------------------------------------------------
    const S = context.playerBase?.[2] || 0;
    const EJAC = context.playerMaxBase?.[2] || 10000;

    let E = 0;
    if (S > EJAC * 2) {
      E = 2; // 대량사정
    } else if (S > EJAC) {
      E = 1; // 통상사정
    }

    // 사정 시 SOURCE 보정 (라인 403-433)
    if (E > 0) {
      // SOURCE:4 3배 (라인 405)
      source[4] = Math.floor(source[4] * 3.00);

      // ABL:정액중독에 따른 SOURCE:7, 5, 13 (라인 407-432)
      if (abl32 === 0) {
        source[7] = 0;
        source[5] = Math.floor(source[5] * 2.00);
        source[13] = Math.floor(source[13] * 6.00);
      } else if (abl32 === 1) {
        source[7] = 500;
        source[5] = Math.floor(source[5] * 3.00);
        source[13] = Math.floor(source[13] * 4.50);
      } else if (abl32 === 2) {
        source[7] = 1200;
        source[5] = Math.floor(source[5] * 4.00);
        source[13] = Math.floor(source[13] * 3.50);
      } else if (abl32 === 3) {
        source[7] = 3000;
        source[5] = Math.floor(source[5] * 6.00);
        source[13] = Math.floor(source[13] * 3.00);
      } else if (abl32 === 4) {
        source[7] = 6000;
        source[5] = Math.floor(source[5] * 9.00);
        source[13] = Math.floor(source[13] * 2.00);
      } else {
        source[7] = 12000;
        source[5] = Math.floor(source[5] * 15.00);
        source[13] = Math.floor(source[13] * 1.50);
      }
    }

    // 대량사정 (라인 435-451)
    if (E === 2) {
      source[7] = Math.floor(source[7] * 2.00);
      source[5] = Math.floor(source[5] * 1.50);

      context.playerExp = context.playerExp || [];
      context.playerExp[3] = (context.playerExp[3] || 0) + 2;

      context.exp = context.exp || [];
      context.exp[20] = (context.exp[20] || 0) + 9;

      context.showMessage('대량사정⚡', { color: '0x00ffff' });
      context.showMessage('정액경험 +9');

      // STAIN:PLAYER:2 |= 4 (정액 더러움)
      context.playerStain = context.playerStain || [];
      context.playerStain[2] = (context.playerStain[2] || 0) | 4;

      // BASE:PLAYER:2 감소
      context.playerBase = context.playerBase || [];
      context.playerBase[2] = (context.playerBase[2] || 0) - EJAC * 2;
      if (context.playerBase[2] >= EJAC) {
        context.playerBase[2] = EJAC - 1;
      }
    }
    // 통상 사정 (라인 453-467)
    else if (E === 1) {
      context.playerExp = context.playerExp || [];
      context.playerExp[3] = (context.playerExp[3] || 0) + 1;

      context.exp = context.exp || [];
      context.exp[20] = (context.exp[20] || 0) + 3;

      context.showMessage('사정⚡', { color: '0x00ffff' });
      context.showMessage('정액경험 +3');

      // STAIN:PLAYER:2 |= 4
      context.playerStain = context.playerStain || [];
      context.playerStain[2] = (context.playerStain[2] || 0) | 4;

      // BASE:PLAYER:2 감소
      context.playerBase = context.playerBase || [];
      context.playerBase[2] = (context.playerBase[2] || 0) - EJAC;
      if (context.playerBase[2] >= EJAC) {
        context.playerBase[2] = EJAC - 1;
      }
    }

    // -------------------------------------------------
    // 더러움 전이 (라인 473-475)
    // -------------------------------------------------
    context.stain = context.stain || [];
    context.playerStain = context.playerStain || [];
    // STAIN:5 |= STAIN:PLAYER:2
    context.stain[5] = (context.stain[5] || 0) | (context.playerStain[2] || 0);
    // STAIN:PLAYER:2 |= STAIN:5
    context.playerStain[2] = (context.playerStain[2] || 0) | (context.stain[5] || 0);

    // -------------------------------------------------
    // 경험치 상승 (라인 480-494)
    // -------------------------------------------------
    context.exp = context.exp || [];

    // EXP:30 (파이즈리 경험) +1 (라인 480-481)
    context.exp[30] = (context.exp[30] || 0) + 1;
    context.showMessage('파이즈리경험 +1');

    // EXP:40 (레즈 경험) or EXP:41 (동성 경험) +7 (라인 483-491)
    if (context.talents[122] === 0 && context.playerTalents?.[122] === 0) {
      context.exp[40] = (context.exp[40] || 0) + 7;
      context.showMessage('레즈경험 +7');
    } else if (context.talents[122] === 1 && context.playerTalents?.[122] === 1) {
      context.exp[41] = (context.exp[41] || 0) + 7;
      context.showMessage('동성경험 +7');
    }

    // TFLAG:30 (애정 플래그) +1 (라인 493-494)
    const exp30 = context.exp[30] || 0;
    if (context.assiPlay === 0 && exp30 >= 30) {
      context.tflags = context.tflags || [];
      context.tflags[30] = (context.tflags[30] || 0) + 1;
    }

    // -------------------------------------------------
    // 기타 처리 (라인 499-507)
    // -------------------------------------------------
    context.tflags = context.tflags || [];
    context.tflags[100] = 1;

    // 굴복각인2 (라인 501-502)
    context.tflags[200] = 2;

    // 후타나리 보정 (라인 504-507)
    if (context.playerTalents?.[121] === 1) {
      source[13] = Math.floor(source[13] / 2);
    }

    // SOURCE 적용
    context.source = source;
  }
};
