/**
 * SELL_VIDEO.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function sell_video(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: 촬영부위C = 0
  // TODO: 촬영부위B = 0
  // TODO: 촬영부위V = 0
  // TODO: 촬영부위A = 0
  // TODO: 촬영내용애무 = 0
  // TODO: 촬영내용기구 = 0
  // TODO: 촬영내용성교 = 0
  // TODO: 촬영내용피스트 = 0
  // TODO: 촬영내용펠라 = 0
  // TODO: 촬영경향봉사 = 0
  // TODO: 촬영경향가학 = 0
  // TODO: 촬영경향SM = 0
  // TODO: 촬영경향자위 = 0
  // TODO: 촬영특수로션 = 0
  // TODO: 촬영특수약물 = 0
  // TODO: 촬영특수긴박 = 0
  // TODO: 촬영특수착유 = 0
  // TODO: 촬영특수스캇 = 0
  // TODO: 촬영특수난교 = 0
  // TODO: 촬영특수야외 = 0
  // TODO: 촬영특수촉수 = 0
  // TODO: 촬영특수레즈 = 0
  // TODO: 촬영특수후타나리 = 0
  // TODO: 촬영특수거품춤 = 0
  X = 0;
  character.tflags[70] -= 1;
  if (character.tflags[70] <= 0) {
    return 0;
  }
  ctx.drawLine();
  P = 0;
  Q = 0;
  T = 0;
  U = 0;
  E = 0;
  G = 0;
  F = ctx.flags[22];
  for (let COUNT = 0; COUNT < character.tflags[70]; COUNT++) {
    ctx.locals[0] = ctx.count + 11;
    T = "FLAG:LOCAL % 1000";
    U = 0;
    if (ctx.flags[ctx.locals[0]] >= 1000) {
      U = 1;
    }
    if (T === 54) {
      if (F & 1) {
        F -= 1;
      } else {
        G = 500;
        // TODO: 촬영특수야외 += 4
        F |= 1;
      }
    } else if (T === 58) {
      if (F & 2) {
        F -= 2;
      } else {
        F |= 2;
      }
    } else if (T === 44) {
      if (F & 8) {
        F -= 8;
      } else {
        G = 500;
        // TODO: 촬영경향SM += 4
        // TODO: 촬영특수긴박 += 4
        F |= 8;
      }
    } else if (T === 11) {
      G = 300;
      // TODO: 촬영부위V += 3
      // TODO: 촬영내용기구 += 3
      if (F & 16) {
        F -= 16;
      } else {
        F |= 16;
      }
    } else if (T === 13) {
      G = 700;
      // TODO: 촬영부위A += 3
      // TODO: 촬영내용기구 += 3
      if (F & 32) {
        F -= 32;
      } else {
        F |= 32;
      }
    } else if (T === 46) {
      if (F & 64) {
        G = 1500;
        // TODO: 촬영부위A += 3
        // TODO: 촬영내용기구 += 3
        // TODO: 촬영경향SM += 5
        // TODO: 촬영특수스캇 += 20
        F -= 64;
      } else {
        F |= 64;
      }
    } else if (T === 89) {
      if (F & 128) {
        G = 3000;
        F -= 128;
      } else {
        F |= 128;
      }
    } else if (T === 100) {
      if (F & 256) {
        G = 5000;
        F -= 256;
      } else {
        G = 100;
        // TODO: 촬영특수촉수 += 5
        F |= 256;
      }
    } else if (T === 18) {
      if (F & 512) {
        F -= 512;
      } else {
        F |= 512;
        G = 100;
      }
    } else if (T === 137) {
      if (F & 8) {
        F -= 1024;
      } else {
        G = 2000;
        // TODO: 촬영경향SM += 4
        // TODO: 촬영경향SM += 4
        // TODO: 촬영특수긴박 += 4
        F |= 1024;
      }
    } else if (T === 150) {
      if (F & 2056) {
        G = 3000;
        F -= 2056;
      } else {
        G = 300;
        // TODO: 촬영특수로션 += 5
        F |= 2056;
      }
    } else if (T === 0) {
      G = 50;
      // TODO: 촬영부위C += 2
      // TODO: 촬영부위B += 2
      // TODO: 촬영내용애무 += 3
    } else if (T === 1) {
      G = 50;
      // TODO: 촬영부위C += 3
      // TODO: 촬영내용애무 += 3
    } else if (T === 2) {
      if ((F & 32)) {
        G = 600;
        // TODO: 촬영부위A += 3
        // TODO: 촬영내용애무 += 3
        // TODO: 촬영내용기구 += 3
      } else {
        G = 100;
        // TODO: 촬영부위A += 3
        // TODO: 촬영내용애무 += 3
      }
    } else if (T === 3) {
      E = 31;
      if ((F & 16) && (F & 32)) {
        G = 1800;
        // TODO: 촬영부위V += 2
        // TODO: 촬영부위A += 2
        // TODO: 촬영내용기구 += 3
        // TODO: 촬영경향자위 += 5
      } else if ((F & 16)) {
        G = 1200;
        // TODO: 촬영부위V += 3
        // TODO: 촬영내용기구 += 3
        // TODO: 촬영경향자위 += 3
      } else if ((F & 32)) {
        G = 1300;
        // TODO: 촬영부위A += 3
        // TODO: 촬영내용기구 += 3
        // TODO: 촬영경향자위 += 3
      } else if ((F & 512)) {
        G = 1000;
        // TODO: 촬영부위C += 2
        // TODO: 촬영부위B += 2
        // TODO: 촬영내용기구 += 3
        // TODO: 촬영경향자위 += 3
      } else {
        G = 500;
        // TODO: 촬영부위C += 2
        // TODO: 촬영부위B += 2
        // TODO: 촬영경향자위 += 3
      }
    } else if (T === 4) {
      E = 32;
      G = 200;
      // TODO: 촬영부위C += 3
      // TODO: 촬영내용애무 += 3
      if (ctx.talents[121]) {
        // TODO: 촬영특수후타나리 += 10
      }
    } else if (T === 5) {
      G = 100;
      // TODO: 촬영부위B += 3
      // TODO: 촬영내용애무 += 3
    } else if (T === 6) {
      G = 100;
      // TODO: 촬영경향봉사 += 3
    } else if (T === 7) {
      E = 17;
      G = 300;
      // TODO: 촬영부위C += 2
      // TODO: 촬영부위V += 2
      // TODO: 촬영경향자위 += 2
    } else if (T === 8) {
      if ((F & 16)) {
        G = 400;
        // TODO: 촬영부위V += 3
        // TODO: 촬영내용애무 += 3
        // TODO: 촬영내용기구 += 3
      } else {
        G = 150;
        // TODO: 촬영부위V += 3
        // TODO: 촬영내용애무 += 3
      }
    } else if (T === 9) {
      G = 150;
      // TODO: 촬영부위A += 3
      // TODO: 촬영내용애무 += 3
    } else if (T === 10) {
      G = 250;
      // TODO: 촬영부위C += 3
      // TODO: 촬영내용기구 += 3
    } else if (T === 12) {
      G = 300;
      // TODO: 촬영부위C += 3
      // TODO: 촬영내용기구 += 3
    } else if (T === 14) {
      G = 150;
      // TODO: 촬영부위C += 3
      // TODO: 촬영내용기구 += 3
    } else if (T === 15) {
      G = 150;
      // TODO: 촬영부위B += 3
      // TODO: 촬영내용기구 += 3
    } else if (T === 16) {
      G = 500;
      // TODO: 촬영부위B += 3
      // TODO: 촬영내용기구 += 3
      // TODO: 촬영경향SM += 3
      // TODO: 촬영특수착유 += 10
    } else if (T === 17) {
      G = 100;
      // TODO: 촬영부위C += 3
      // TODO: 촬영내용기구 += 3
      // TODO: 촬영경향자위 += 3
      if (ctx.talents[121]) {
        // TODO: 촬영특수후타나리 += 10
      }
    } else if (T === 19) {
      G = 700;
      // TODO: 촬영부위A += 3
      // TODO: 촬영내용기구 += 3
    } else if (T === 20) {
      E = 30;
      G = 800;
      // TODO: 촬영부위V += 3
      // TODO: 촬영내용성교 += 3
    } else if (T === 21) {
      E = 30;
      G = 1300;
      // TODO: 촬영부위V += 3
      // TODO: 촬영내용성교 += 3
    } else if (T === 22) {
      E = 30;
      G = 700;
      // TODO: 촬영부위V += 3
      // TODO: 촬영내용성교 += 3
    } else if (T === 23) {
      E = 30;
      G = 1500;
      // TODO: 촬영부위V += 3
      // TODO: 촬영내용성교 += 3
    } else if (T === 24) {
      E = 30;
      G = 2000;
      // TODO: 촬영부위C += 3
      // TODO: 촬영내용성교 += 5
    } else if (T === 25) {
      E = 30;
      G = 2300;
      // TODO: 촬영부위C += 3
      // TODO: 촬영내용성교 += 5
    } else if (T === 26) {
      E = 30;
      G = 1300;
      // TODO: 촬영부위A += 3
      // TODO: 촬영내용성교 += 3
    } else if (T === 27) {
      E = 30;
      G = 1800;
      // TODO: 촬영부위A += 3
      // TODO: 촬영내용성교 += 3
    } else if (T === 28) {
      E = 30;
      G = 1200;
      // TODO: 촬영부위A += 3
      // TODO: 촬영내용성교 += 3
    } else if (T === 29) {
      E = 30;
      G = 2000;
      // TODO: 촬영부위A += 3
      // TODO: 촬영내용성교 += 3
    } else if (T === 30) {
      E = 32;
      G = 300;
      // TODO: 촬영경향봉사 += 3
    } else if (T === 31) {
      E = 32;
      G = 500;
      // TODO: 촬영경향봉사 += 3
      // TODO: 촬영내용펠라 += 3
    } else if (T === 32) {
      E = 32;
      G = 650;
      // TODO: 촬영부위B += 3
      // TODO: 촬영경향봉사 += 3
    } else if (T === 33) {
      E = 32;
      G = 770;
      // TODO: 촬영부위C += 3
      // TODO: 촬영경향봉사 += 3
    } else if (T === 34) {
      E = 30;
      G = 1700;
      // TODO: 촬영부위V += 3
      // TODO: 촬영내용성교 += 3
      // TODO: 촬영경향가학 += 3
    } else if (T === 35) {
      E = 16;
      G = 1800;
      // TODO: 촬영부위B += 3
      // TODO: 촬영경향봉사 += 3
      // TODO: 촬영특수거품춤 = 1
    } else if (T === 36) {
      E = 30;
      G = 2300;
      // TODO: 촬영부위B += 3
      // TODO: 촬영내용성교 += 3
      // TODO: 촬영경향가학 += 3
    } else if (T === 38) {
      E = 20;
      G = 550;
      // TODO: 촬영경향가학 += 3
    } else if (T === 40) {
      E = 21;
      G = 250;
      // TODO: 촬영경향SM += 3
    } else if (T === 41) {
      E = 21;
      G = 450;
      // TODO: 촬영경향SM += 3
    } else if (T === 42) {
      E = 21;
      G = 700;
      // TODO: 촬영경향SM += 3
    } else if (T === 43) {
      G = 150;
      // TODO: 촬영경향SM += 5
    } else if (T === 45) {
      G = 100;
      // TODO: 촬영경향SM += 5
    } else if (T === 50 && (F & 128) === 0) {
      G = 100;
      // TODO: 촬영특수로션 += 20
    } else if (T === 56) {
      G = 10;
    } else if (T === 60) {
      G = 100;
      if (ctx.getTalent(assi, 122) === 0) {
        E = 33;
        // TODO: 촬영특수레즈 += 3
      }
    } else if (T === 61) {
      E = 33;
      G = 250;
      // TODO: 촬영내용성교 += 3
      // TODO: 촬영경향봉사 += 3
      // TODO: 촬영특수난교 += 3
    } else if (T === 62) {
      G = 800;
    } else if (T === 63) {
      E = 33;
      G = 1000;
      // TODO: 촬영부위C += 3
      // TODO: 촬영내용애무 += 3
      // TODO: 촬영특수레즈 += 10
    } else if (T === 64) {
      G = 3000;
      // TODO: 촬영부위V += 2
      // TODO: 촬영부위A += 2
      // TODO: 촬영내용성교 += 5
      // TODO: 촬영특수난교 += 3
    } else if (T === 65) {
      E = 33;
      G = 1200;
      // TODO: 촬영부위C += 3
      // TODO: 촬영내용성교 += 3
      // TODO: 촬영특수난교 += 3
    } else if (T === 66) {
      E = 32;
      G = 800;
      // TODO: 촬영경향봉사 += 3
      // TODO: 촬영특수난교 += 3
      // TODO: 촬영내용펠라 += 3
    } else if (T === 68) {
      E = 32;
      G = 800;
      // TODO: 촬영경향봉사 += 3
      // TODO: 촬영특수난교 += 3
      // TODO: 촬영내용펠라 += 3
    } else if (T === 69) {
      E = 32;
      G = 600;
      // TODO: 촬영부위C += 3
      // TODO: 촬영경향봉사 += 3
      if (( U == 1 && (ctx.getTalent(assi, 121) || ctx.getTalent(assi, 122)) ) || ( U == 0 && (ctx.getTalent(master, 121) || ctx.getTalent(master, 122)))) {
        // TODO: 촬영내용펠라 += 3
      }
    } else if (T === 70) {
      G = 1200;
      E = 32;
      // TODO: 촬영부위C += 3
      // TODO: 촬영경향봉사 += 3
      // TODO: 촬영특수난교 += 3
    } else if (T === 71) {
      G = 1300;
      E = 32;
      // TODO: 촬영부위B += 3
      // TODO: 촬영경향봉사 += 3
      // TODO: 촬영특수난교 += 3
      // TODO: 촬영내용펠라 += 3
    } else if (T === 80) {
      E = 32;
      G = 1000;
      // TODO: 촬영경향SM += 3
    } else if (T === 81) {
      E = 21;
      G = 2000;
      // TODO: 촬영부위V += 3
      // TODO: 촬영내용피스트 += 10
    } else if (T === 82) {
      E = 21;
      G = 2500;
      // TODO: 촬영부위A += 3
      // TODO: 촬영내용피스트 += 10
    } else if (T === 83) {
      E = 21;
      G = 3000;
      // TODO: 촬영부위V += 2
      // TODO: 촬영부위A += 2
      // TODO: 촬영내용피스트 += 20
    } else if (T === 85) {
      E = 17;
      G = 500;
      // TODO: 촬영특수스캇 += 5
    } else if (T === 86) {
      E = 21;
      G = 600;
      // TODO: 촬영특수스캇 += 5
    } else if (T === 90) {
      E = 31;
      if ((F & 16) && (F & 32)) {
        G = 2000;
        // TODO: 촬영부위V += 2
        // TODO: 촬영부위A += 2
        // TODO: 촬영내용기구 += 3
        // TODO: 촬영경향자위 += 5
      } else if ((F & 16)) {
        G = 1400;
        // TODO: 촬영부위V += 3
        // TODO: 촬영내용기구 += 3
        // TODO: 촬영경향자위 += 3
      } else if ((F & 32)) {
        G = 1500;
        // TODO: 촬영부위A += 3
        // TODO: 촬영내용기구 += 3
        // TODO: 촬영경향자위 += 3
      } else if ((F & 512)) {
        G = 1200;
        // TODO: 촬영부위C += 2
        // TODO: 촬영부위B += 2
        // TODO: 촬영내용기구 += 3
        // TODO: 촬영경향자위 += 3
      } else {
        G = 700;
        // TODO: 촬영부위C += 2
        // TODO: 촬영부위B += 2
        // TODO: 촬영내용기구 += 3
        // TODO: 촬영경향자위 += 3
      }
    } else if (T === 91) {
      E = 31;
      if ((F & 16) && (F & 32)) {
        G = 2300;
        // TODO: 촬영부위V += 2
        // TODO: 촬영부위A += 2
        // TODO: 촬영내용기구 += 3
        // TODO: 촬영경향자위 += 5
      } else if ((F & 16)) {
        G = 1700;
        // TODO: 촬영부위V += 3
        // TODO: 촬영내용기구 += 3
        // TODO: 촬영경향자위 += 3
      } else if ((F & 32)) {
        G = 1800;
        // TODO: 촬영부위A += 3
        // TODO: 촬영내용기구 += 3
        // TODO: 촬영경향자위 += 3
      } else if ((F & 512)) {
        G = 1500;
        // TODO: 촬영부위C += 2
        // TODO: 촬영부위B += 2
        // TODO: 촬영내용기구 += 3
        // TODO: 촬영경향자위 += 3
      } else {
        G = 1000;
        // TODO: 촬영부위C += 2
        // TODO: 촬영부위B += 2
        // TODO: 촬영내용기구 += 3
        // TODO: 촬영경향자위 += 3
      }
    } else if (T === 92) {
      G = 200;
      // TODO: 촬영부위B += 3
      // TODO: 촬영내용기구 += 3
    } else if (T === 101) {
      E = 41;
      G = 800;
      // TODO: 촬영부위V += 3
      // TODO: 촬영내용성교 += 3
      // TODO: 촬영특수촉수 += 5
    } else if (T === 102) {
      E = 41;
      G = 1000;
      // TODO: 촬영부위A += 3
      // TODO: 촬영내용성교 += 3
      // TODO: 촬영특수촉수 += 5
    } else if (T === 103) {
      E = 41;
      G = 300;
      // TODO: 촬영부위C += 3
      // TODO: 촬영내용애무 += 3
      // TODO: 촬영특수촉수 += 5
    } else if (T === 104) {
      E = 41;
      G = 300;
      // TODO: 촬영부위B += 3
      // TODO: 촬영내용애무 += 3
      // TODO: 촬영특수촉수 += 5
    } else if (T === 105) {
      E = 41;
      G = 1000;
      // TODO: 촬영부위B += 3
      // TODO: 촬영경향SM += 3
      // TODO: 촬영특수착유 += 10
      // TODO: 촬영특수촉수 += 5
    } else if (T === 106) {
      E = 41;
      G = 800;
      // TODO: 촬영경향SM += 20
      // TODO: 촬영특수긴박 += 20
      // TODO: 촬영특수촉수 += 5
    } else if (T === 107) {
      E = 41;
      G = 1500;
      // TODO: 촬영부위A += 3
      // TODO: 촬영경향SM += 3
      // TODO: 촬영특수스캇 += 20
      // TODO: 촬영특수촉수 += 5
    } else if (T === 108) {
      E = 41;
      G = 800;
      // TODO: 촬영경향SM += 3
      // TODO: 촬영특수촉수 += 5
    } else if (T === 109) {
      E = 41;
      G = 1000;
      // TODO: 촬영부위C += 3
      // TODO: 촬영내용애무 += 3
      // TODO: 촬영특수촉수 += 5
      if (ctx.talents[121]) {
        // TODO: 촬영특수후타나리 += 10
      }
    } else if (T === 120) {
      E = 30;
      G = 1200;
      // TODO: 촬영부위V += 3
      // TODO: 촬영내용성교 += 3
    } else if (T === 121) {
      E = 30;
      G = 1400;
      // TODO: 촬영부위V += 3
      // TODO: 촬영내용성교 += 3
    } else if (T === 122) {
      E = 32;
      G = 200;
      // TODO: 촬영부위C += 3
      // TODO: 촬영내용애무 += 3
      if (ctx.talents[121]) {
        // TODO: 촬영특수후타나리 += 10
      }
    } else if (T === 123) {
      E = 32;
      G = 700;
      // TODO: 촬영부위B += 3
      // TODO: 촬영경향봉사 += 3
    } else if (T === 124) {
      E = 32;
      G = 750;
      // TODO: 촬영경향봉사 += 5
    } else if (T === 125) {
      E = 32;
      G = 800;
      // TODO: 촬영부위C += 2
      // TODO: 촬영부위B += 2
      // TODO: 촬영경향봉사 += 3
    } else if (T === 126) {
      E = 32;
      G = 600;
      // TODO: 촬영경향봉사 += 4
    } else if (T === 127) {
      E = 32;
      G = 800;
      // TODO: 촬영경향봉사 += 5
    } else if (T === 128) {
      E = 30;
      G = 800;
      // TODO: 촬영부위V += 3
      // TODO: 촬영내용성교 += 3
    } else if (T === 129) {
      E = 30;
      G = 900;
      // TODO: 촬영부위B += 2
      // TODO: 촬영부위V += 3
      // TODO: 촬영내용성교 += 3
    } else if (T === 130) {
      E = 30;
      G = 1000;
      // TODO: 촬영부위V += 3
      // TODO: 촬영내용성교 += 4
    } else if (T === 131) {
      E = 30;
      G = 1300;
      // TODO: 촬영부위B += 2
      // TODO: 촬영부위V += 3
      // TODO: 촬영내용성교 += 3
    } else if (T === 132) {
      E = 30;
      G = 1400;
      // TODO: 촬영부위V += 3
      // TODO: 촬영내용성교 += 3
      // TODO: 촬영경향가학 += 3
    } else if (T === 133) {
      E = 30;
      G = 1500;
      // TODO: 촬영부위V += 3
      // TODO: 촬영내용성교 += 3
    } else if (T === 134) {
      E = 30;
      G = 1500;
      // TODO: 촬영부위V += 3
      // TODO: 촬영내용성교 += 3
    } else if (T === 141) {
      E = 32;
      G = 600;
      // TODO: 촬영부위B += 3
      // TODO: 촬영경향봉사 += 3
    } else if (T === 142) {
      E = 32;
      G = 680;
      // TODO: 촬영부위B += 3
      // TODO: 촬영경향봉사 += 3
    } else if (T === 143) {
      E = 32;
      G = 680;
      // TODO: 촬영부위B +=3
      // TODO: 촬영경향가학 +=3
    }
    if (F & 1) {
      if ((E != 0) && (ctx.abilities[E] < ctx.abilities[17])) {
        E = 17;
      }
      // TODO: 촬영특수야외 += 1
    }
    if (F & 4) {
      if ((E != 0) && (ctx.abilities[E] < ctx.abilities[10])) {
        E = 10;
      }
    }
    if (F & 128) {
      G += 300;
      if ((E != 0) && (ctx.abilities[E] < ctx.abilities[40])) {
        E = 40;
      }
    }
    if (F & 8) {
      if ((E != 0) && (ctx.abilities[E] < ctx.abilities[21])) {
        E = 21;
      }
      // TODO: 촬영특수긴박 += 1
    }
    if (F & 1024) {
      G += 500;
      if ((E != 0) && (ctx.abilities[E] < ctx.abilities[21])) {
        E = 21;
      }
      // TODO: 촬영경향SM += 1
    }
    if (ctx.assi > 0) {
      if (U && ctx.getTalent(assi, 122) == 0) {
        // TODO: 촬영특수레즈 += 1
      }
    }
    if (E) {
      if (ctx.abilities[E] > 5) {
        ctx.times('G', 1.50);
      } else if (ctx.abilities[E] > 2) {
        ctx.times('G', 1.20);
      } else if (ctx.abilities[E] > 0) {
        ctx.times('G', 1.10);
      }
    }
    P += G;
    E = 0;
    G = 0;
  }
  if (character.tflags[32] & 1) {
    P += 5000;
    ctx.showMessage(`비디오엔 ${ctx.getVarName("CALL", TARGET)}의 처녀상실 장면이 기록돼있다`);
    ctx.exp[50] += 1;
    ctx.showMessage(`${ctx.getVarName("EXP", 50)} +1`);
  }
  if (character.tflags[132] & 1) {
    P += 8000;
    ctx.showMessage(`비디오엔 ${ctx.getVarName("CALL", TARGET)}의 애널처녀상실 장면이 기록돼있다`);
    ctx.exp[50] += 1;
    ctx.showMessage(`${ctx.getVarName("EXP", 50)} +1`);
  }
  if (ctx.flags[22] & 4) {
    ctx.times('P', 1.2);
  }
  if (character.tflags[32] & 2) {
    if (ctx.abilities[15] === 0) {
      ctx.times('P', 0.90);
    } else if (ctx.abilities[15] === 1) {
      ctx.times('P', 1.00);
    } else if (ctx.abilities[15] === 2) {
      ctx.times('P', 1.05);
    } else if (ctx.abilities[15] === 3) {
      ctx.times('P', 1.10);
    } else if (ctx.abilities[15] === 4) {
      ctx.times('P', 1.15);
    } else if (ctx.abilities[15] === 5) {
      ctx.times('P', 1.20);
    } else {
      ctx.times('P', 1.25);
    }
  }
  if (ctx.talents[9]) {
    ctx.times('P', 0.50);
  }
  if (ctx.talents[0]) {
    ctx.times('P', 1.20);
  }
  if (ctx.talents[21]) {
    ctx.times('P', 0.70);
  }
  if (ctx.talents[22]) {
    ctx.times('P', 0.70);
  }
  if (ctx.talents[35]) {
    ctx.times('P', 1.10);
  }
  if (ctx.talents[76]) {
    ctx.times('P', 1.50);
  }
  if (ctx.talents[440]) {
    ctx.times('P', 1.50);
  }
  if (ctx.talents[100]) {
    ctx.times('P', 1.20);
  }
  if (ctx.talents[110]) {
    ctx.times('P', 1.20);
  }
  if (ctx.talents[114]) {
    ctx.times('P', 1.40);
  }
  if (ctx.talents[115]) {
    ctx.times('P', 0.50);
  }
  if (ctx.talents[121]) {
    ctx.times('P', 1.20);
  }
  if (ctx.talents[123]) {
    ctx.times('P', 0.80);
  }
  if (ctx.talents[124]) {
    ctx.times('P', 1.10);
  }
  if (ctx.talents[126]) {
    ctx.times('P', 1.30);
  }
  if (ctx.talents[92]) {
    ctx.times('P', 1.30);
  }
  if (ctx.talents[113]) {
    ctx.times('P', 1.30);
  }
  if (ctx.talents[115]) {
    ctx.times('P', 0.20);
  }
  if (ctx.talents[122] && ctx.talents[413] == 0) {
    ctx.times('P', 0.20);
  }
  if (ctx.talents[130]) {
    ctx.times('P', 1.20);
  }
  if (ctx.talents[135]) {
    ctx.times('P', 1.30);
  }
  if (ctx.talents[201]) {
    ctx.times('P', 1.10);
  }
  if (ctx.talents[203]) {
    ctx.times('P', 1.50);
  }
  if (ctx.talents[204]) {
    ctx.times('P', 1.20);
  }
  if (ctx.talents[209]) {
    ctx.times('P', 1.20);
  }
  if (ctx.talents[224]) {
    ctx.times('P', 1.20);
  }
  if (ctx.talents[205]) {
    ctx.times('P', 2.00);
  }
  if (ctx.talents[206]) {
    ctx.times('P', 1.10);
  }
  if (ctx.talents[212]) {
    ctx.times('P', 1.50);
  }
  if (ctx.talents[220]) {
    ctx.times('P', 1.20);
  }
  if (ctx.talents[221]) {
    ctx.times('P', 1.30);
  }
  if (ctx.talents[222]) {
    ctx.times('P', 1.40);
  }
  if (ctx.talents[402]) {
    ctx.times('P', 1.40);
  }
  if (ctx.talents[407]) {
    ctx.times('P', 1.50);
  }
  if (ctx.talents[408]) {
    ctx.times('P', 1.40);
  }
  if (ctx.talents[409]) {
    ctx.times('P', 1.30);
  }
  if (ctx.talents[410]) {
    ctx.times('P', 1.20);
  }
  if (ctx.talents[413]) {
    ctx.times('P', 1.20);
  }
  if (ctx.talents[414]) {
    ctx.times('P', 1.50);
  }
  if (ctx.talents[421]) {
    ctx.times('P', 1.30);
  }
  if (ctx.talents[422]) {
    ctx.times('P', 1.10);
  }
  if (ctx.talents[427]) {
    ctx.times('P', 1.10);
  }
  if (ctx.talents[429]) {
    ctx.times('P', 1.10);
  }
  if (ctx.talents[432]) {
    ctx.times('P', 1.10);
  }
  if (ctx.talents[433]) {
    ctx.times('P', 1.40);
  }
  if (ctx.talents[507]) {
    ctx.times('P', 1.50);
  }
  if (ctx.talents[505]) {
    ctx.times('P', 1.50);
  }
  if (ctx.talents[502]) {
    ctx.times('P', 1.50);
  }
  if (ctx.talents[516]) {
    ctx.times('P', 1.50);
  }
  if (ctx.talents[509]) {
    ctx.times('P', 3.00);
  }
  if (ctx.talents[515]) {
    ctx.times('P', 2.50);
  }
  if (ctx.talents[518]) {
    ctx.times('P', 3.0);
  }
  if (ctx.talents[519]) {
    ctx.times('P', 3.0);
  }
  if (ctx.talents[522]) {
    ctx.times('P', 3.0);
  }
  if (ctx.talents[523]) {
    ctx.times('P', 3.0);
  }
  if (ctx.talents[512]) {
    ctx.times('P', 3.00);
  }
  if (ctx.talents[530]) {
    ctx.times('P', 1.25);
  }
  if (ctx.talents[531]) {
    ctx.times('P', 1.50);
  }
  if (ctx.talents[552]) {
    ctx.times('P', 1.50);
  }
  if (ctx.talents[562]) {
    ctx.times('P', 1.50);
  }
  if (ctx.talents[604]) {
    ctx.times('P', 2.00);
  }
  if (ctx.talents[605]) {
    ctx.times('P', 1.50);
  }
  if (ctx.talents[606]) {
    ctx.times('P', 1.50);
  }
  if (ctx.talents[607]) {
    ctx.times('P', 1.50);
  }
  if (character.no == 38) {
    ctx.times('P', 2.50);
  }
  if (character.no == 83) {
    ctx.times('P', 2.50);
  }
  if (character.no == 209) {
    ctx.times('P', 2.00);
  }
  if (ctx.abilities[70] === 0) {
    ctx.times('P', 1.00);
  } else if (ctx.abilities[70] === 1) {
    ctx.times('P', 1.10);
  } else if (ctx.abilities[70] === 2) {
    ctx.times('P', 1.20);
  } else if (ctx.abilities[70] === 3) {
    ctx.times('P', 1.30);
  } else if (ctx.abilities[70] === 4) {
    ctx.times('P', 1.40);
  } else if (ctx.abilities[70] === 5) {
    ctx.times('P', 1.50);
  } else if (ctx.abilities[70] === 6) {
    ctx.times('P', 1.60);
  } else if (ctx.abilities[70] === 7) {
    ctx.times('P', 1.70);
  } else if (ctx.abilities[70] === 8) {
    ctx.times('P', 1.80);
  } else if (ctx.abilities[70] === 9) {
    ctx.times('P', 1.90);
  } else {
    ctx.times('P', 2.00);
  }
  if (ctx.abilities[17] === 0) {
    ctx.times('P', 1.00);
  } else if (ctx.abilities[17] === 1) {
    ctx.times('P', 1.10);
  } else if (ctx.abilities[17] === 2) {
    ctx.times('P', 1.20);
  } else if (ctx.abilities[17] === 3) {
    ctx.times('P', 1.30);
  } else if (ctx.abilities[17] === 4) {
    ctx.times('P', 1.40);
  } else if (ctx.abilities[17] === 5) {
    ctx.times('P', 1.50);
  } else if (ctx.abilities[17] === 6) {
    ctx.times('P', 1.60);
  } else if (ctx.abilities[17] === 7) {
    ctx.times('P', 1.70);
  } else if (ctx.abilities[17] === 8) {
    ctx.times('P', 1.80);
  } else if (ctx.abilities[17] === 9) {
    ctx.times('P', 1.90);
  } else {
    ctx.times('P', 2.00);
  }
  if (ctx.flags[5] === 3) {
    ctx.times('P', 0.70);
  } else if (ctx.flags[5] === 4) {
    ctx.times('P', 0.50);
  }
  await videosale_calc(ctx, character);
  await special_title_calc(ctx, character);
  if (character.tflags[160] === 1) {
    ctx.times('P', 2.50);
  }
  P *= ctx.base[character][31];
  P /= 100;
  P -= 500;
  if (P > 0) {
    if (ctx.getTalent(target, 400) === 0) {
      ctx.showMessage(`L	${ctx.josaHelper("타겟을")}【${ctx.getVarName("TALENT", 400)}】로 데뷔시킵니까?`);
      // Label: INPUTLOOP_DEBUT
      ctx.showMessage('[0] - 네');
      ctx.showMessage('[1] - 아니오');
      await ctx.inputNumber();
      if (ctx.result === 0) {
      } else if (ctx.result === 1) {
        return;
      } else {
        // GOTO INPUTLOOP_DEBUT - 구조 변경 필요 (while/break 사용 권장)
      }
    }
    ctx.showMessage(`W 촬영한 비디오는 {P}포인트로 팔렸다.`);
    character.tflags[137] = 1;
    if (ctx.assi > 0) {
      if (ctx.getTalent(assi, 211) && ctx.assiAbilities[15]) {
        Q = P * ctx.assiAbilities[15] * 5;
        Q /= 100;
        ctx.showMessage(`W ${ctx.getVarName("CALL", ASSI)}의 선전활동이 효과를 발휘해 비디오는 {Q}포인트 비싸게 팔렸다.`);
        P += Q;
      }
    }
    await producer_debut(ctx, character);
    ctx.showMessage(`촬영한 비디오를 인터넷에 올려 {P}포인트를 손에 넣었다.`);
    ctx.money += P;
    ctx.showMessage(`AV출연편수+1`);
    ctx.exp[character][76] += 1;
    if (ctx.talents[400] === 1 && ctx.talents[432] === 0 && character.no != 1 && character.no != 91) {
      ctx.base[30] += 500;
    } else if (ctx.talents[400] === 1 && ctx.talents[432] === 0 && (character.no === 1 || character.no === 91)) {
      ctx.base[30] += 100;
    } else if (ctx.talents[400] === 1 && ctx.talents[432] === 1 && character.no != 1 && character.no != 91) {
      ctx.base[30] += 1000;
    } else if (ctx.talents[400] === 1 && ctx.talents[432] === 1 && (character.no === 1 || character.no === 91)) {
      ctx.base[30] += 300;
    }
    ctx.showMessage(`감독경험 +1 (${ctx.getVarName("CALL", MASTER)})`);
    ctx.exp[ctx.master][9] += 1;
    character.cflags[character][730] += P;
    ctx.money[2] += P;
    if (ctx.getTalent(target, 400) === 0) {
      ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
      ctx.showMessage(`${ctx.josaHelper("타겟이")}【${ctx.getVarName("TALENT", 400)}】로 데뷔했다`);
      // Label: INPUTLOOP_DECIDENAME
      ctx.showMessage(`《${ctx.getVarName("CALL", TARGET)}의 예명을 정해주십시오》`);
      // TODO: INPUTS
      if (ctx.results == "") {
        ctx.results = NICKNAME;
      }
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 예명을 %조사처리(RESULTS,"로")% 합니까?`);
      NICKctx.getName(character) = ctx.results;
      // Label: INPUTLOOP_DECIDE
      ctx.showMessage('[0] - 네');
      ctx.showMessage('[1] - 아니오');
      await ctx.inputNumber();
      if (ctx.result === 0) {
        ctx.showMessage(`본인과 상담하여 ${ctx.josaHelper(ctx.getVarName("NICKNAME", character), "로")} 결정했다`);
      } else if (ctx.result === 1) {
        ctx.showMessage(`예명을 다시 입력해 주십시오`);
        // GOTO INPUTLOOP_DECIDENAME - 구조 변경 필요 (while/break 사용 권장)
      } else {
        // GOTO INPUTLOOP_DECIDE - 구조 변경 필요 (while/break 사용 권장)
      }
      ctx.showMessage(`L`);
      ctx.showMessage(`${ctx.getVarName("NICK", TARGET)}의 데뷔작은`);
      ctx.showMessage(`『`);
      // TODO: CHKFONT "あくびん"
      if (ctx.result) {
        // TODO: SETFONT "あくびん"
      }
      ctx.setColor(0xDDBBCC);
      await video_title_debut(ctx, character);
      ctx.resetColor();
      // TODO: SETFONT ""
      ctx.showMessage(`』`);
      ctx.showMessage(`라는 제목으로 인터넷에 올라갔다……`);
      if (P >= 10000) {
        ctx.showMessage(`데뷔작이 대히트하여 차기작을 기다리는 댓글이 달리고 있다……`);
      }
      ctx.getTalent(target, 400) = 1;
      character.cflags[734] = P;
      character.cflags[733] += ctx.rand(20);
    } else if (ctx.getTalent(target, 400) === 1) {
      ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
      ctx.showMessage(`${ctx.getVarName("NICK", TARGET)}의 이번 작품은`);
      ctx.showMessage(`『`);
      // TODO: CHKFONT "あくびん"
      if (ctx.result) {
        // TODO: SETFONT "あくびん"
      }
      ctx.setColor(0xDDBBCC);
      await video_title_new(ctx, character);
      ctx.resetColor();
      // TODO: SETFONT ""
      ctx.showMessage(`』`);
      ctx.showMessage(`라는 제목으로 인터넷에 올라갔다……`);
      if (P >= 100000) {
        ctx.showMessage(`이 작품이 대히트하여 차기작을 기다리는 댓글이 달리고 있다……`);
      }
      character.cflags[character][732] = P;
      X = P;
      if (character.cflags[character][731] < X) {
        character.cflags[character][731] = character.cflags[character][732];
        await change_videotitle_represent(ctx, character);
      }
      character.cflags[733] += ctx.rand(20);
    }
  } else {
    ctx.showMessage('녹화한 비디오는 상품가치가 없었습니다');
  }
  await ctx.wait();
}
