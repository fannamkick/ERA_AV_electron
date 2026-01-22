/**
 * SYSTEM_SOURCE_SUB2.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function source_lesbian_sex_check(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.abilities[22] === 0) {
    ctx.times('SOURCE:8', 0.80);
    ctx.times('SOURCE:14', 0.80);
    ctx.times('SOURCE:13', 0.90);
  } else if (ctx.abilities[22] === 1) {
    character.source[7] += 100;
    ctx.times('SOURCE:8', 0.60);
    ctx.times('SOURCE:14', 0.60);
    ctx.times('SOURCE:13', 0.75);
    ctx.times('SOURCE:0', 1.10);
    ctx.times('SOURCE:1', 1.10);
    ctx.times('SOURCE:2', 1.10);
    ctx.times('SOURCE:5', 1.10);
    ctx.times('SOURCE:17', 1.10);
  } else if (ctx.abilities[22] === 2) {
    character.source[7] += 200;
    ctx.times('SOURCE:8', 0.40);
    ctx.times('SOURCE:14', 0.40);
    ctx.times('SOURCE:13', 0.60);
    ctx.times('SOURCE:0', 1.20);
    ctx.times('SOURCE:1', 1.20);
    ctx.times('SOURCE:2', 1.20);
    ctx.times('SOURCE:5', 1.20);
    ctx.times('SOURCE:17', 1.20);
  } else if (ctx.abilities[22] === 3) {
    character.source[7] += 350;
    ctx.times('SOURCE:8', 0.25);
    ctx.times('SOURCE:14', 0.25);
    ctx.times('SOURCE:13', 0.45);
    ctx.times('SOURCE:0', 1.30);
    ctx.times('SOURCE:1', 1.30);
    ctx.times('SOURCE:2', 1.30);
    ctx.times('SOURCE:5', 1.30);
    ctx.times('SOURCE:17', 1.30);
  } else if (ctx.abilities[22] === 4) {
    character.source[7] += 500;
    ctx.times('SOURCE:8', 0.15);
    ctx.times('SOURCE:14', 0.15);
    ctx.times('SOURCE:13', 0.30);
    ctx.times('SOURCE:0', 1.40);
    ctx.times('SOURCE:1', 1.40);
    ctx.times('SOURCE:2', 1.40);
    ctx.times('SOURCE:5', 1.40);
    ctx.times('SOURCE:17', 1.40);
  } else {
    character.source[7] += 750;
    ctx.times('SOURCE:8', 0.10);
    ctx.times('SOURCE:14', 0.10);
    ctx.times('SOURCE:13', 0.15);
    ctx.times('SOURCE:0', 1.60);
    ctx.times('SOURCE:1', 1.60);
    ctx.times('SOURCE:2', 1.60);
    ctx.times('SOURCE:5', 1.60);
    ctx.times('SOURCE:17', 1.60);
  }
  if (ctx.abilities[33] === 1) {
    ctx.times('SOURCE:8', 0.60);
    ctx.times('SOURCE:14', 0.60);
    ctx.times('SOURCE:0', 1.20);
    ctx.times('SOURCE:1', 1.20);
    ctx.times('SOURCE:2', 1.20);
    ctx.times('SOURCE:5', 1.20);
    ctx.times('SOURCE:17', 1.20);
  } else if (ctx.abilities[33] === 2) {
    ctx.times('SOURCE:8', 0.40);
    ctx.times('SOURCE:14', 0.40);
    ctx.times('SOURCE:0', 1.40);
    ctx.times('SOURCE:1', 1.40);
    ctx.times('SOURCE:2', 1.40);
    ctx.times('SOURCE:5', 1.40);
    ctx.times('SOURCE:17', 1.40);
  } else if (ctx.abilities[33] === 3) {
    ctx.times('SOURCE:8', 0.30);
    ctx.times('SOURCE:14', 0.30);
    ctx.times('SOURCE:0', 1.60);
    ctx.times('SOURCE:1', 1.60);
    ctx.times('SOURCE:2', 1.60);
    ctx.times('SOURCE:5', 1.60);
    ctx.times('SOURCE:17', 1.60);
  } else if (ctx.abilities[33] === 4) {
    ctx.times('SOURCE:8', 0.20);
    ctx.times('SOURCE:14', 0.20);
    ctx.times('SOURCE:0', 1.80);
    ctx.times('SOURCE:1', 1.80);
    ctx.times('SOURCE:2', 1.80);
    ctx.times('SOURCE:5', 1.80);
    ctx.times('SOURCE:17', 1.80);
  } else {
    ctx.times('SOURCE:8', 0.10);
    ctx.times('SOURCE:14', 0.10);
    ctx.times('SOURCE:0', 2.00);
    ctx.times('SOURCE:1', 2.00);
    ctx.times('SOURCE:2', 2.00);
    ctx.times('SOURCE:5', 2.00);
    ctx.times('SOURCE:17', 2.00);
  }
  if (ctx.abilities[ctx.player][22] === 0) {
    ctx.times('SOURCE:0', 0.40);
    ctx.times('SOURCE:1', 0.40);
    ctx.times('SOURCE:2', 0.40);
    ctx.times('SOURCE:3', 0.20);
    ctx.times('SOURCE:4', 0.30);
    ctx.times('SOURCE:5', 0.30);
    ctx.times('SOURCE:17', 0.40);
  } else if (ctx.abilities[ctx.player][22] === 1) {
    ctx.times('SOURCE:0', 0.70);
    ctx.times('SOURCE:1', 0.70);
    ctx.times('SOURCE:2', 0.70);
    ctx.times('SOURCE:3', 0.60);
    ctx.times('SOURCE:4', 0.70);
    ctx.times('SOURCE:5', 0.70);
    ctx.times('SOURCE:17', 0.70);
  } else if (ctx.abilities[ctx.player][22] === 2) {
    ctx.times('SOURCE:0', 1.00);
    ctx.times('SOURCE:1', 1.00);
    ctx.times('SOURCE:2', 1.00);
    ctx.times('SOURCE:3', 1.00);
    ctx.times('SOURCE:4', 1.00);
    ctx.times('SOURCE:5', 1.00);
    ctx.times('SOURCE:17', 1.00);
  } else if (ctx.abilities[ctx.player][22] === 3) {
    ctx.times('SOURCE:0', 1.10);
    ctx.times('SOURCE:1', 1.10);
    ctx.times('SOURCE:2', 1.10);
    ctx.times('SOURCE:3', 1.40);
    ctx.times('SOURCE:4', 1.30);
    ctx.times('SOURCE:5', 1.30);
    ctx.times('SOURCE:17', 1.10);
  } else if (ctx.abilities[ctx.player][22] === 4) {
    ctx.times('SOURCE:0', 1.20);
    ctx.times('SOURCE:1', 1.20);
    ctx.times('SOURCE:2', 1.20);
    ctx.times('SOURCE:3', 1.80);
    ctx.times('SOURCE:4', 1.60);
    ctx.times('SOURCE:5', 1.60);
    ctx.times('SOURCE:17', 1.20);
  } else {
    ctx.times('SOURCE:0', 1.30);
    ctx.times('SOURCE:1', 1.30);
    ctx.times('SOURCE:2', 1.30);
    ctx.times('SOURCE:3', 2.50);
    ctx.times('SOURCE:4', 2.00);
    ctx.times('SOURCE:5', 2.00);
    ctx.times('SOURCE:17', 1.30);
  }
  if (ctx.abilities[ctx.player][33] === 1) {
    ctx.times('SOURCE:0', 1.10);
    ctx.times('SOURCE:1', 1.10);
    ctx.times('SOURCE:2', 1.10);
    ctx.times('SOURCE:3', 1.50);
    ctx.times('SOURCE:4', 1.50);
    ctx.times('SOURCE:5', 1.50);
    ctx.times('SOURCE:17', 1.10);
  } else if (ctx.abilities[ctx.player][33] === 2) {
    ctx.times('SOURCE:0', 1.20);
    ctx.times('SOURCE:1', 1.20);
    ctx.times('SOURCE:2', 1.20);
    ctx.times('SOURCE:3', 2.00);
    ctx.times('SOURCE:4', 2.00);
    ctx.times('SOURCE:5', 2.00);
    ctx.times('SOURCE:17', 1.20);
  } else if (ctx.abilities[ctx.player][33] === 3) {
    ctx.times('SOURCE:0', 1.40);
    ctx.times('SOURCE:1', 1.40);
    ctx.times('SOURCE:2', 1.40);
    ctx.times('SOURCE:3', 2.50);
    ctx.times('SOURCE:4', 2.50);
    ctx.times('SOURCE:5', 2.50);
    ctx.times('SOURCE:17', 1.40);
  } else if (ctx.abilities[ctx.player][33] === 4) {
    ctx.times('SOURCE:0', 1.60);
    ctx.times('SOURCE:1', 1.60);
    ctx.times('SOURCE:2', 1.60);
    ctx.times('SOURCE:3', 3.50);
    ctx.times('SOURCE:4', 3.00);
    ctx.times('SOURCE:5', 3.00);
    ctx.times('SOURCE:17', 1.60);
  } else {
    ctx.times('SOURCE:0', 1.80);
    ctx.times('SOURCE:1', 1.80);
    ctx.times('SOURCE:2', 1.80);
    ctx.times('SOURCE:3', 5.00);
    ctx.times('SOURCE:4', 4.00);
    ctx.times('SOURCE:5', 4.00);
    ctx.times('SOURCE:17', 1.80);
  }
  if (ctx.getTalent(player, 20)) {
    ctx.times('SOURCE:4', 0.50);
    ctx.times('SOURCE:5', 0.50);
  }
}

export async function source_gay_sex_check(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.abilities[23] === 0) {
    ctx.times('SOURCE:8', 4.00);
    ctx.times('SOURCE:14', 4.00);
    ctx.times('SOURCE:5', 0.50);
  } else if (ctx.abilities[23] === 1) {
    character.source[7] += 10;
    ctx.times('SOURCE:8', 2.00);
    ctx.times('SOURCE:14', 2.00);
    ctx.times('SOURCE:5', 0.70);
    ctx.times('SOURCE:0', 1.10);
    ctx.times('SOURCE:1', 1.10);
    ctx.times('SOURCE:2', 1.10);
    ctx.times('SOURCE:17', 1.10);
  } else if (ctx.abilities[23] === 2) {
    character.source[7] += 40;
    ctx.times('SOURCE:8', 1.40);
    ctx.times('SOURCE:14', 1.40);
    ctx.times('SOURCE:5', 0.90);
    ctx.times('SOURCE:0', 1.20);
    ctx.times('SOURCE:1', 1.20);
    ctx.times('SOURCE:2', 1.20);
    ctx.times('SOURCE:17', 1.20);
  } else if (ctx.abilities[23] === 3) {
    character.source[7] += 100;
    ctx.times('SOURCE:8', 1.00);
    ctx.times('SOURCE:14', 1.00);
    ctx.times('SOURCE:5', 1.10);
    ctx.times('SOURCE:0', 1.30);
    ctx.times('SOURCE:1', 1.30);
    ctx.times('SOURCE:2', 1.30);
    ctx.times('SOURCE:17', 1.30);
  } else if (ctx.abilities[23] === 4) {
    character.source[7] += 200;
    ctx.times('SOURCE:8', 0.70);
    ctx.times('SOURCE:14', 0.70);
    ctx.times('SOURCE:5', 1.20);
    ctx.times('SOURCE:0', 1.40);
    ctx.times('SOURCE:1', 1.40);
    ctx.times('SOURCE:2', 1.40);
    ctx.times('SOURCE:17', 1.40);
  } else if (ctx.abilities[23] === 5) {
    character.source[7] += 350;
    ctx.times('SOURCE:8', 0.50);
    ctx.times('SOURCE:14', 0.50);
    ctx.times('SOURCE:5', 1.30);
    ctx.times('SOURCE:0', 1.50);
    ctx.times('SOURCE:1', 1.50);
    ctx.times('SOURCE:2', 1.50);
    ctx.times('SOURCE:17', 1.50);
  }
  if (ctx.getTalent(player, 20)) {
    ctx.times('SOURCE:4', 0.50);
    ctx.times('SOURCE:5', 0.50);
  }
}
