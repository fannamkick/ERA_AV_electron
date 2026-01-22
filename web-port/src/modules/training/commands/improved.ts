/**
 * Consolidated Training Commands
 * Auto-generated from Com0Command.ts through Com92Command.ts
 * Contains all 93 command factory functions
 */

import { TrainingCommand, SourceResult } from './CommandBase';
import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

/**
 * COM0: 애무
 * 손과 입으로 가슴과 클리토리스 자극
 */
export class Com0Command extends TrainingCommand {
  getName(): string {
    return '애무';
  }

  getDescription(): string {
    return '클리토리스를 애무하여 C쾌감을 올립니다';
  }

  isAvailable(): boolean {
    // 기본 조건: 하반신이 노출되어 있어야 함
    if (!this.bottomNaked()) {
      return false;
    }

    // 의식이 있어야 함
    if (this.character.flags[16] === -1) { // 기절 상태
      return false;
    }

    // 정조대 착용 시 불가
    if (this.character.flags[42] === 79) {
      return false;
    }

    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();

    // === SOURCE 계산 ===
    const source = this.calculateSource();

    // Character source에 적용
    this.character.source[0] = source.pleasureC;      // 쾌C
    this.character.source[17] = source.pleasureB;     // 쾌B
    this.character.source[3] = source.lubrication;    // 윤활
    this.character.source[4] = source.submission;     // 굴복 (성행동)
    this.character.source[8] = source.comfort || 30;  // 안심 (불결)
    this.character.source[12] = 100;                  // 반감 (노출)

    // 메시지 표시 (train_message_b 호출 필요)
    await this.showTrainMessage();

    // === 경험치 획득 ===
    this.gainExperience();

    // === BASE 업데이트 ===
    this.ctx.base[0] += 5;   // C감각 BASE 증가
    this.ctx.base[1] += 50;  // 욕망 BASE 증가
  }

  /**
   * SOURCE 값 계산
   */
  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};

    // === 쾌C 계산 (능력치 기반) ===
    const cSense = this.getAbility(0); // C감각
    const cValues = [20, 100, 500, 1200, 2000, 2800]; // 레벨별 쾌C
    source.pleasureC = this.calculateAbilitySource(0, cValues);

    // === 윤활 계산 (C감각 기반) ===
    const lubValues = [25, 50, 80, 100, 115, 125];
    source.lubrication = this.calculateAbilitySource(0, lubValues);

    // === 쾌B 계산 (B감각 기반) ===
    const bSense = this.getAbility(1); // B감각
    const bValues = [15, 50, 300, 700, 1100, 1600];
    source.pleasureB = this.calculateAbilitySource(1, bValues);

    // B감각에 의한 윤활 추가
    const bLubValues = [25, 50, 80, 100, 115, 125];
    source.lubrication! += this.calculateAbilitySource(1, bLubValues);

    // === 기본 값 설정 ===
    source.submission = 60;  // 굴복
    source.lust = 30;        // 욕정

    // === 특수 조건 처리 ===

    // 볼개그 착용 시
    if (this.character.equipment[45]) {
      source.lust = 0;
      source.pleasureC! /= 2;
      source.lubrication! /= 4;
      source.pleasureB! /= 2;
    }
    // 기절 상태 (실제로는 isAvailable에서 막히지만 방어적 코딩)
    else if (this.character.flags[16] === -1) {
      source.lust = 0;
      source.pleasureC! /= 2;
      source.lubrication! /= 4;
      source.pleasureB! /= 2;
    }
    // 정상 상태
    else {
      // 소질 기반 수정
      const modified = this.applySourceModifiers(source);
      Object.assign(source, modified);

      // 플레이어 얼룩 (stain) 처리
      if (this.ctx.playerStain[0]) {
        source.lust! *= 1.5;
      }

      // 얼룩 동기화
      this.ctx.stain[0] |= this.ctx.playerStain[0];
      this.ctx.playerStain[0] |= this.ctx.stain[0];
    }

    // === 장비 효과 ===

    // 바이브레이터 (equipment[89])
    if (this.character.equipment[89]) {
      // 바이브 장착 시 효과 증폭
      source.pleasureC! *= 1.5;
    }

    // 로터 (equipment[90])
    if (this.character.equipment[90]) {
      this.ctx.stain[1] |= 2;
      this.ctx.stain[1] |= 4;
      this.ctx.stain[5] |= 2;
      this.ctx.stain[5] |= 4;
    } else {
      this.ctx.stain[3] |= this.ctx.playerStain[1];
      this.ctx.playerStain[1] |= this.ctx.stain[3];
      this.ctx.stain[5] |= this.ctx.playerStain[1];
      this.ctx.playerStain[1] |= this.ctx.stain[5];
    }

    return source;
  }

  /**
   * 훈련 메시지 표시
   */
  private async showTrainMessage(): Promise<void> {
    await this.generateTrainMessage(0); // COM0
  }

  /**
   * 경험치 획득
   */
  private gainExperience(): void {
    // 순결 경험치
    const playerVirgin = this.ctx.getTalent?.(122) === 0; // 플레이어 순결
    const charVirgin = this.hasTalent(122); // 캐릭터 순결

    if (!charVirgin && !playerVirgin) {
      this.addExperience(40, 5); // 상호 비순결
    } else if (charVirgin && playerVirgin) {
      this.addExperience(41, 5); // 상호 순결
    }

    // 애무 경험치
    this.addExperience(14, 1);

    // 페로몬 경험치 (호감도 1000 이상)
    if (this.character.flags[2] >= 1000 && !this.isAssiPlay()) {
      this.addExperience(23, 2);
    }
  }
}

export async function com0(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  const command = new Com0Command(ctx, character);

  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }

  await command.execute();
}

/**
 * COM1: 커닐링구스
 * 입으로 클리토리스 자극
 */
export class Com1Command extends TrainingCommand {
  getName(): string {
    return '커닐링구스';
  }

  getDescription(): string {
    return '혀로 음부를 애무합니다';
  }

  isAvailable(): boolean {
    // 하반신 노출 필수
    if (!this.bottomNaked()) {
      return false;
    }

    // 의식 필수
    if (this.character.flags[16] === -1) {
      return false;
    }

    // 정조대 착용 시 불가
    if (this.character.flags[42] === 79) {
      return false;
    }

    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();

    // SOURCE 계산
    const source = this.calculateSource();

    // Character source에 적용
    this.character.source[0] = source.pleasureC || 0;  // 쾌C
    this.character.source[1] = source.pleasureV || 0;  // 쾌V
    this.character.source[3] = source.lubrication || 0; // 윤활
    this.character.source[4] = source.submission || 0;  // 굴복
    this.character.source[5] = source.lust || 0;       // 욕정
    this.character.source[12] = 100;

    // 메시지 표시
    await this.showTrainMessage();

    // 경험치 획득
    this.gainExperience();

    // BASE 업데이트
    this.ctx.base[0] += 15;  // C감각
    this.ctx.base[2] += 15;  // V감각
    this.ctx.base[1] += 60;  // 욕망
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};

    // 쾌C 계산 (혀 테크닉이 중요)
    const cValues = [50, 200, 600, 1400, 2200, 3200];
    source.pleasureC = this.calculateAbilitySource(0, cValues);

    // 쾌V 계산
    const vValues = [30, 150, 500, 1200, 2000, 3000];
    source.pleasureV = this.calculateAbilitySource(2, vValues);

    // 윤활 (커닐링구스는 윤활 효과 높음)
    source.lubrication = 200;

    // 굴복
    source.submission = 120;

    // 욕정
    source.lust = 100;

    // 소질 기반 수정
    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);

    // 특수 소질 효과

    // M기질
    if (this.hasTalent(85)) {
      source.submission! *= 1.5;
    }

    // S기질
    if (this.hasTalent(86)) {
      source.submission! /= 2;
    }

    // 감도가 높음
    if (this.hasTalent(62)) {
      source.pleasureC! *= 1.3;
      source.pleasureV! *= 1.2;
    }

    return source;
  }

  private async showTrainMessage(): Promise<void> {
    await this.generateTrainMessage(1); // COM1
  }

  private gainExperience(): void {
    // 애무 경험치
    this.addExperience(14, 2);

    // 커닐링구스 경험치
    this.addExperience(51, 5);

    // 순결 경험치
    const playerVirgin = this.ctx.getTalent?.(122) === 0;
    const charVirgin = this.hasTalent(122);

    if (!charVirgin && !playerVirgin) {
      this.addExperience(40, 5);
    } else if (charVirgin && playerVirgin) {
      this.addExperience(41, 5);
    }

    // 페로몬 (호감도 체크)
    if (this.character.flags[2] >= 1000 && !this.isAssiPlay()) {
      this.addExperience(23, 3);
    }
  }
}

export async function com1(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  const command = new Com1Command(ctx, character);

  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }

  await command.execute();
}

/**
 * COM2: 애널애무
 * 손으로 애널 자극
 */
export class Com2Command extends TrainingCommand {
  getName(): string {
    return '애널애무';
  }

  getDescription(): string {
    return '손으로 항문을 자극합니다';
  }

  isAvailable(): boolean {
    // 하반신 노출 필수
    if (!this.bottomNaked()) {
      return false;
    }

    // 의식 필수
    if (this.character.flags[16] === -1) {
      return false;
    }

    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();

    // SOURCE 계산
    const source = this.calculateSource();

    // Character source에 적용
    this.character.source[2] = source.pleasureA || 0;  // 쾌A
    this.character.source[3] = source.lubrication || 0; // 윤활
    this.character.source[4] = source.submission || 0;  // 굴복
    this.character.source[5] = source.lust || 0;       // 욕정
    this.character.source[6] = source.pain || 0;       // 고통
    this.character.source[12] = 850;
    this.character.source[13] = source.terror || 0;    // 공포
    this.character.source[14] = source.depression || 0; // 우울

    // 메시지 표시
    await this.showTrainMessage();

    // 경험치 획득
    this.gainExperience();

    // BASE 업데이트
    this.ctx.base[0] += 20;  // A감각
    this.ctx.base[1] += 100; // 욕망
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};

    // 쾌A 계산 (A감각 레벨에 따라)
    const aValues = [20, 75, 300, 700, 1100, 1500];
    source.pleasureA = this.calculateAbilitySource(3, aValues);

    // 공포 (A감각에 따라)
    const terrorValues = [300, 350, 400, 650, 1000, 1500];
    source.terror = this.calculateAbilitySource(3, terrorValues);

    // A경험에 따른 수정
    const aExp = this.ctx.exp[1] || 0;
    const aExpLevels = [100, 300, 700, 1500, 3000];

    if (aExp < aExpLevels[0]) {
      source.pleasureA! *= 0.2;
      source.terror! *= 0.2;
      source.pain = 500;
      source.depression = 200;
    } else if (aExp < aExpLevels[1]) {
      source.pleasureA! *= 0.5;
      source.terror! *= 0.5;
      source.pain = 400;
      source.depression = 100;
    } else if (aExp < aExpLevels[2]) {
      source.pleasureA! *= 1.0;
      source.terror! *= 1.0;
      source.pain = 300;
      source.depression = 50;
    } else if (aExp < aExpLevels[3]) {
      source.pleasureA! *= 1.2;
      source.terror! *= 1.2;
      source.pain = 200;
    } else if (aExp < aExpLevels[4]) {
      source.pleasureA! *= 1.6;
      source.terror! *= 1.6;
      source.pain = 100;
    } else {
      source.pleasureA! *= 1.8;
      source.terror! *= 1.8;
      source.pain = 50;
    }

    // 윤활에 따른 수정
    const lubrication = this.ctx.params[3] || 0;
    const lubLevels = [200, 500, 1000, 1500];

    if (lubrication < lubLevels[0]) {
      source.pleasureA! *= 0.1;
      source.terror! *= 0.1;
      source.pain! *= 3.0;
    } else if (lubrication < lubLevels[1]) {
      source.pleasureA! *= 0.2;
      source.terror! *= 0.2;
      source.pain! *= 2.0;
    } else if (lubrication < lubLevels[2]) {
      source.pleasureA! *= 0.6;
      source.terror! *= 0.6;
      source.pain! *= 1.0;
    } else if (lubrication < lubLevels[3]) {
      source.pleasureA! *= 1.0;
      source.terror! *= 1.0;
      source.pain! *= 0.5;
    } else {
      source.pleasureA! *= 2.0;
      source.terror! *= 2.0;
      source.pain! *= 0.1;
    }

    // 욕정에 따른 수정
    const lust = this.ctx.params[5] || 0;
    const lustLevels = [200, 500, 1000, 1500];

    if (lust < lustLevels[0]) {
      source.pleasureA! *= 0.3;
      source.terror! *= 0.3;
    } else if (lust < lustLevels[1]) {
      source.pleasureA! *= 0.6;
      source.terror! *= 0.6;
    } else if (lust < lustLevels[2]) {
      source.pleasureA! *= 1.0;
      source.terror! *= 1.0;
    } else if (lust < lustLevels[3]) {
      source.pleasureA! *= 1.3;
      source.terror! *= 1.3;
    } else {
      source.pleasureA! *= 1.6;
      source.terror! *= 1.6;
    }

    source.submission = 120;
    source.lust = 100;
    source.lubrication = 150;
    source.depression = source.depression || 0;

    // 소질 기반 수정
    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);

    // M기질
    if (this.hasTalent(85)) {
      source.submission! *= 1.5;
      source.pleasureA! *= 1.2;
    }

    // 애널개발
    if (this.hasTalent(76)) {
      source.pleasureA! *= 1.5;
      source.pain! *= 0.5;
    }

    return source;
  }

    private async showTrainMessage(): Promise<void> {
    await this.generateTrainMessage(2); // COM2
  }

  private gainExperience(): void {
    // 애무 경험치
    this.addExperience(14, 2);

    // 애널애무 경험치
    this.addExperience(50, 5);

    // A경험치
    this.addExperience(1, 3);

    // 순결 경험치
    const playerVirgin = this.ctx.getTalent?.(122) === 0;
    const charVirgin = this.hasTalent(122);

    if (!charVirgin && !playerVirgin) {
      this.addExperience(40, 5);
    } else if (charVirgin && playerVirgin) {
      this.addExperience(41, 5);
    }

    // 페로몬
    if (this.character.flags[2] >= 1000 && !this.isAssiPlay()) {
      this.addExperience(23, 3);
    }
  }
}

export async function com2(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  const command = new Com2Command(ctx, character);

  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }

  await command.execute();
}

/**
 * COM3: 자위
 * 대상이 스스로 바기나 자극
 */
export class Com3Command extends TrainingCommand {
  getName(): string {
    return '자위';
  }

  getDescription(): string {
    return '스스로 자위하게 합니다';
  }

  isAvailable(): boolean {
    // 하반신 노출 필수
    if (!this.bottomNaked()) {
      return false;
    }

    // 의식 필수
    if (this.character.flags[16] === -1) {
      return false;
    }

    return true;
  }

  async execute(): Promise<void> {
    let commandName = '';

    // 바이브 장착 여부 확인
    const hasVibrator = this.character.equipment[11] === 1;
    const hasAnalVibrator = this.character.equipment[13] === 1;

    if (hasVibrator && hasAnalVibrator) {
      commandName = '양구멍 바이브 자위';
    } else if (hasVibrator) {
      commandName = '바이브 자위';
    } else if (hasAnalVibrator) {
      commandName = '애널바이브 자위';
    } else {
      commandName = '자위';
    }

    this.message(commandName);
    this.ctx.saveStr[0] = commandName;

    // SOURCE 계산
    const source = this.calculateSource();

    // Character source에 적용
    this.character.source[0] = source.pleasureC || 0;  // 쾌C
    this.character.source[1] = source.pleasureV || 0;  // 쾌V
    this.character.source[2] = source.pleasureA || 0;  // 쾌A
    this.character.source[3] = source.lubrication || 0; // 윤활
    this.character.source[4] = source.submission || 0;  // 굴복
    this.character.source[5] = source.lust || 0;       // 욕정
    this.character.source[12] = 100;

    // 메시지 표시
    await this.showTrainMessage();

    // 경험치 획득
    this.gainExperience();

    // BASE 업데이트
    this.ctx.base[0] += 10;  // C감각
    this.ctx.base[2] += 10;  // V감각
    this.ctx.base[1] += 80;  // 욕망
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};

    // 바이브 장착 여부
    const hasVibrator = this.character.equipment[11] === 1;
    const hasAnalVibrator = this.character.equipment[13] === 1;

    // 쾌C 계산
    const cValues = hasVibrator
      ? [100, 400, 1000, 2000, 3200, 4500]  // 바이브 사용
      : [30, 150, 500, 1200, 2000, 3000];   // 일반 자위

    source.pleasureC = this.calculateAbilitySource(0, cValues);

    // 쾌V 계산
    const vValues = hasVibrator
      ? [50, 250, 700, 1500, 2500, 3800]
      : [20, 100, 400, 900, 1500, 2200];

    source.pleasureV = this.calculateAbilitySource(2, vValues);

    // 쾌A 계산 (애널바이브 사용 시)
    if (hasAnalVibrator) {
      const aValues = [50, 200, 600, 1300, 2100, 3200];
      source.pleasureA = this.calculateAbilitySource(3, aValues);
    } else {
      source.pleasureA = 0;
    }

    // 윤활
    source.lubrication = hasVibrator ? 250 : 180;

    // 굴복 (수치심)
    source.submission = 150;

    // 욕정
    source.lust = 120;

    // 소질 기반 수정
    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);

    // 특수 소질 효과

    // M기질
    if (this.hasTalent(85)) {
      source.submission! *= 1.5;
    }

    // 노출벽
    if (this.hasTalent(72)) {
      source.pleasureC! *= 1.2;
      source.pleasureV! *= 1.2;
      source.submission! *= 1.3;
    }

    // 자위중독
    if (this.hasTalent(81)) {
      source.pleasureC! *= 1.4;
      source.pleasureV! *= 1.4;
    }

    // 감도가 높음
    if (this.hasTalent(62)) {
      source.pleasureC! *= 1.3;
      source.pleasureV! *= 1.2;
    }

    return source;
  }

    private async showTrainMessage(): Promise<void> {
    await this.generateTrainMessage(3); // COM3
  }

  private gainExperience(): void {
    // 자위 경험치
    this.addExperience(49, 5);

    // 애무 경험치
    this.addExperience(14, 2);

    // 노출 경험치
    this.addExperience(22, 3);

    // 순결 경험치
    const playerVirgin = this.ctx.getTalent?.(122) === 0;
    const charVirgin = this.hasTalent(122);

    if (!charVirgin && !playerVirgin) {
      this.addExperience(40, 5);
    } else if (charVirgin && playerVirgin) {
      this.addExperience(41, 5);
    }

    // 페로몬
    if (this.character.flags[2] >= 1000 && !this.isAssiPlay()) {
      this.addExperience(23, 3);
    }
  }
}

export async function com3(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  const command = new Com3Command(ctx, character);

  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }

  await command.execute();
}

/**
 * COM4: 펠라한다
 * 입으로 페니스 자극
 */
export class Com4Command extends TrainingCommand {
  getName(): string {
    return '펠라한다';
  }

  getDescription(): string {
    return '입으로 성기를 자극합니다';
  }

  isAvailable(): boolean {
    // 의식 필수
    if (this.character.flags[16] === -1) {
      return false;
    }

    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();

    // SOURCE 계산
    const source = this.calculateSource();

    // Character source에 적용
    this.character.source[0] = source.pleasureC || 0;  // 쾌C
    this.character.source[12] = 220;
    this.character.source[14] = source.depression || 0;

    // 메시지 표시
    await this.showTrainMessage();

    // 경험치 획득
    this.gainExperience();

    // BASE 업데이트
    this.ctx.base[0] += 5;   // C감각
    this.ctx.base[1] += 50;  // 욕망

    // 얼룩 처리
    this.handleStains();
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};

    // 쾌C 계산 (C감각 기반)
    const cValues = [50, 200, 800, 1600, 2400, 3200];
    source.pleasureC = this.calculateAbilitySource(0, cValues);

    source.depression = 50;

    // 소질 기반 수정
    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);

    // 혀놀림 소질 (플레이어) - TALENT:52
    if (this.ctx.getTalent?.(52)) {
      source.pleasureC! *= 2.0;
    }

    return source;
  }

    private async showTrainMessage(): Promise<void> {
    await this.generateTrainMessage(4); // COM4
  }

  private gainExperience(): void {
    // 레즈/호모 경험치
    const playerVirgin = this.ctx.getTalent?.(122) === 0;
    const charVirgin = this.hasTalent(122);

    if (!charVirgin && !playerVirgin) {
      this.addExperience(40, 3);
    } else if (charVirgin && playerVirgin) {
      this.addExperience(41, 3);
    }

    // 애정 경험치
    const e = charVirgin ? 2 : 1;
    if (this.character.flags[2] >= 1000 && !this.isAssiPlay()) {
      this.addExperience(23, e);
    }
  }

  private handleStains(): void {
    // 얼룩 처리: 캐릭터의 성기 <-> 플레이어의 입
    this.ctx.stain[2] = (this.ctx.stain[2] || 0) | (this.ctx.playerStain[0] || 0);
    this.ctx.playerStain[0] = (this.ctx.playerStain[0] || 0) | (this.ctx.stain[2] || 0);
  }
}

export async function com4(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  const command = new Com4Command(ctx, character);

  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }

  await command.execute();
}

/**
 * COM5: 가슴애무
 * 손과 입으로 유방 자극
 */
export class Com5Command extends TrainingCommand {
  getName(): string {
    return '가슴애무';
  }

  getDescription(): string {
    return '손과 입으로 가슴을 애무합니다';
  }

  isAvailable(): boolean {
    // 상반신 노출 필수
    if (!this.topNaked()) {
      return false;
    }

    // 의식 필수
    if (this.character.flags[16] === -1) {
      return false;
    }

    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();

    // SOURCE 계산
    const source = this.calculateSource();

    // Character source에 적용
    this.character.source[17] = source.pleasureB || 0;  // 쾌B
    this.character.source[3] = source.lubrication || 0; // 윤활
    this.character.source[4] = source.submission || 0;  // 굴복
    this.character.source[5] = source.lust || 0;       // 욕정
    this.character.source[8] = source.comfort || 0;    // 안심
    this.character.source[12] = 100;

    // 메시지 표시
    await this.showTrainMessage();

    // 경험치 획득
    this.gainExperience();

    // BASE 업데이트
    this.ctx.base[0] += 5;   // C감각
    this.ctx.base[1] += 50;  // 욕망
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};

    // 쾌B 계산 (B감각 레벨에 따라)
    const bValues = [20, 100, 500, 1200, 2000, 2800];
    source.pleasureB = this.calculateAbilitySource(1, bValues);

    // 윤활
    const lubValues = [50, 100, 160, 200, 230, 250];
    source.lubrication = this.calculateAbilitySource(1, lubValues);

    // 안심
    source.comfort = 20;

    // 굴복
    source.submission = 60;

    // 욕정
    source.lust = 80;

    // 소질 기반 수정
    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);

    // 특수 소질 효과

    // 유아퇴행 (플레이어 소질)
    if (this.ctx.getTalent?.(131)) {
      source.pleasureB! *= 1.2;
      source.lubrication! *= 1.2;
    }

    // 유치 (플레이어 소질)
    if (this.ctx.getTalent?.(132)) {
      source.pleasureB! *= 1.2;
      source.lubrication! *= 1.2;
    }

    // 혀놀림 (플레이어 소질)
    if (this.ctx.getTalent?.(52)) {
      source.pleasureB! *= 1.4;
      source.comfort! += Math.floor(source.pleasureB! / 20);
    }

    // M기질
    if (this.hasTalent(85)) {
      source.submission! *= 1.5;
    }

    // 감도가 높음
    if (this.hasTalent(62)) {
      source.pleasureB! *= 1.3;
    }

    // 모유체질
    if (this.hasTalent(70)) {
      source.pleasureB! *= 1.2;
    }

    return source;
  }

    private async showTrainMessage(): Promise<void> {
    await this.generateTrainMessage(5); // COM5
  }

  private gainExperience(): void {
    // 애무 경험치
    this.addExperience(14, 2);

    // 가슴애무 경험치
    this.addExperience(48, 5);

    // 순결 경험치
    const playerVirgin = this.ctx.getTalent?.(122) === 0;
    const charVirgin = this.hasTalent(122);

    if (!charVirgin && !playerVirgin) {
      this.addExperience(40, 5);
    } else if (charVirgin && playerVirgin) {
      this.addExperience(41, 5);
    }

    // 페로몬
    if (this.character.flags[2] >= 1000 && !this.isAssiPlay()) {
      this.addExperience(23, 3);
    }
  }
}

export async function com5(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  const command = new Com5Command(ctx, character);

  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }

  await command.execute();
}

/**
 * COM6: 키스한다
 * 입으로 입 자극
 */
export class Com6Command extends TrainingCommand {
  getName(): string {
    return '키스한다';
  }

  getDescription(): string {
    return '입술에 키스합니다';
  }

  isAvailable(): boolean {
    // 의식 필수
    if (this.character.flags[16] === -1) {
      return false;
    }

    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = '키스';

    // SOURCE 계산
    const source = this.calculateSource();

    // Character source에 적용
    this.character.source[3] = source.lubrication || 0; // 윤활
    this.character.source[4] = source.submission || 0;  // 굴복
    this.character.source[5] = source.lust || 0;       // 욕정
    this.character.source[7] = source.love || 0;       // 애정
    this.character.source[8] = source.comfort || 0;    // 안심
    this.character.source[12] = 100;
    this.character.source[16] = source.habit || 0;     // 습관

    // 메시지 표시
    await this.showTrainMessage();

    // 경험치 획득
    this.gainExperience();

    // BASE 업데이트
    this.ctx.base[1] += 30;  // 욕망
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};

    // 키스 기본 효과
    source.lubrication = 100;
    source.submission = 80;
    source.lust = 100;
    source.love = 50;
    source.comfort = 30;
    source.habit = 20;

    // 소질 기반 수정
    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);

    // 특수 소질 효과

    // 키스마
    if (this.hasTalent(79)) {
      source.lust! *= 1.5;
      source.love! *= 1.3;
    }

    // 사랑
    if (this.hasTalent(85)) {
      source.love! *= 2.0;
      source.comfort! *= 1.5;
    }

    // 봉사정신
    const serviceLevel = this.getAbility(16);
    if (serviceLevel > 0) {
      source.submission! += serviceLevel * 10;
      source.comfort! += serviceLevel * 5;
    }

    // 키스숙련 (플레이어 소질)
    if (this.ctx.getTalent?.(53)) {
      source.lust! *= 1.4;
      source.love! *= 1.3;
      source.habit! += 30;
    }

    // 혀놀림 (플레이어 소질)
    if (this.ctx.getTalent?.(52)) {
      source.lust! *= 1.3;
      source.lubrication! *= 1.2;
    }

    // 욕망 레벨에 따른 보정
    const desireLevel = this.getAbility(11);
    if (desireLevel > 0) {
      source.lust! += desireLevel * 15;
      source.lubrication! += desireLevel * 10;
    }

    return source;
  }

    private async showTrainMessage(): Promise<void> {
    await this.generateTrainMessage(6); // COM6
  }

  private gainExperience(): void {
    // 키스 경험치
    this.addExperience(47, 5);

    // 애무 경험치
    this.addExperience(14, 2);

    // 순결 경험치
    const playerVirgin = this.ctx.getTalent?.(122) === 0;
    const charVirgin = this.hasTalent(122);

    if (!charVirgin && !playerVirgin) {
      this.addExperience(40, 5);
    } else if (charVirgin && playerVirgin) {
      this.addExperience(41, 5);
    }

    // 페로몬
    if (this.character.flags[2] >= 1000 && !this.isAssiPlay()) {
      this.addExperience(23, 3);
    }
  }
}

export async function com6(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  const command = new Com6Command(ctx, character);

  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }

  await command.execute();
}

/**
 * COM7: 조개벌리기
 * 대상이 스스로 바기나를 벌려 보임
 */
export class Com7Command extends TrainingCommand {
  getName(): string {
    return '조개벌리기';
  }

  getDescription(): string {
    return '스스로 음부를 벌려 보이게 합니다';
  }

  isAvailable(): boolean {
    // 하반신 노출 필수
    if (!this.bottomNaked()) {
      return false;
    }

    // 의식 필수
    if (this.character.flags[16] === -1) {
      return false;
    }

    // 정조대 착용 시 불가
    if (this.character.flags[42] === 79) {
      return false;
    }

    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();

    // SOURCE 계산
    const source = this.calculateSource();

    // Character source에 적용
    this.character.source[12] = source.sensitivity || 0;
    this.character.source[13] = source.terror || 0;
    this.character.source[14] = source.depression || 0;
    this.character.source[4] = source.submission || 0;
    this.character.source[5] = source.lust || 0;
    this.character.source[7] = source.exposure || 0;

    // 메시지 표시
    await this.showTrainMessage();

    // 경험치 획득
    this.gainExperience();

    // BASE 업데이트
    this.ctx.base[0] += 10;  // V감각
    this.ctx.base[1] += 50;  // 욕망

    // 얼룩 처리
    this.handleStains();
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};

    // V감각에 따른 기본 값
    const vSense = this.getAbility(2);
    const sensitivityValues = [1500, 1800, 2100, 2400, 2700, 3000];
    const terrorValues = [300, 600, 1000, 1500, 2100, 2800];

    source.sensitivity = sensitivityValues[Math.min(vSense, 5)];
    source.terror = terrorValues[Math.min(vSense, 5)];

    // 봉사정신에 따른 값
    const serviceSpirit = this.getAbility(16);
    const submissionValues = [100, 150, 200, 250, 300, 350];
    const lustValues = [50, 100, 200, 300, 500, 750];

    source.submission = submissionValues[Math.min(serviceSpirit, 5)];
    source.lust = lustValues[Math.min(serviceSpirit, 5)];

    // 노출벽에 따른 값
    const exhibitionism = this.getAbility(17);
    const exposureValues = [0, 100, 300, 800, 1500, 2500];
    const sensMultipliers = [1.0, 1.2, 1.4, 1.6, 2.0, 3.0];
    const lustMultipliers = [1.0, 1.2, 1.4, 1.6, 2.0, 3.0];

    source.exposure = exposureValues[Math.min(exhibitionism, 5)];
    source.sensitivity! *= sensMultipliers[Math.min(exhibitionism, 5)];
    source.lust! *= lustMultipliers[Math.min(exhibitionism, 5)];

    source.depression = 400;

    // 소질 기반 수정
    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);

    // 노출광
    if (this.hasTalent(89)) {
      source.exposure! += 500;
      source.sensitivity! *= 1.5;
      source.lust! *= 1.5;
    }

    return source;
  }

  private async showTrainMessage(): Promise<void> {
    const vSense = this.getAbility(2);
    const exhibitionism = this.getAbility(17);

    if (exhibitionism === 0 && vSense === 0) {
      this.message('"이, 이런 짓...너무 부끄러워..."');
    } else if (exhibitionism <= 2) {
      this.message('떨리는 손으로 조심스럽게 음부를 벌린다...');
    } else if (exhibitionism <= 4) {
      this.message('"이렇게...보여드릴게요..."');
    } else {
      this.message('"제 음부...잘 보이시나요...?"');
    }

    // 반응 메시지
    if (this.character.source[7] >= 1000) {
      this.message('부끄러움을 느끼면서도 흥분하고 있는 것 같다...');
    }
  }

  private gainExperience(): void {
    // 노출벽 Lv3 이상이면 자위 경험치
    const exhibitionism = this.getAbility(17);
    if (exhibitionism >= 3) {
      this.addExperience(10, 1); // 자위 경험
      this.addExperience(11, 1); // 지도자위 경험
    }

    // 레즈 경험
    if (this.hasTalent(122) === false && this.ctx.getTalent?.(122) === 0) {
      this.addExperience(40, 2);
    }
  }

  private handleStains(): void {
    // 얼룩 처리: 손가락 <-> 음부
    this.ctx.stain[1] = (this.ctx.stain[1] || 0) | (this.ctx.stain[3] || 0);
    this.ctx.stain[3] = (this.ctx.stain[3] || 0) | (this.ctx.stain[1] || 0);
  }
}

export async function com7(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  const command = new Com7Command(ctx, character);

  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }

  await command.execute();
}

/**
 * COM8: 손가락삽입
 * 손으로 바기나 자극
 */
export class Com8Command extends TrainingCommand {
  getName(): string {
    return '손가락삽입';
  }

  getDescription(): string {
    return '손가락으로 질 내부를 자극합니다';
  }

  isAvailable(): boolean {
    // 하반신 노출 필수
    if (!this.bottomNaked()) {
      return false;
    }

    // 의식 필수
    if (this.character.flags[16] === -1) {
      return false;
    }

    // 정조대 착용 시 불가
    if (this.character.flags[42] === 79) {
      return false;
    }

    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();

    // SOURCE 계산
    const source = this.calculateSource();

    // Character source에 적용
    this.character.source[1] = source.pleasureV || 0;  // 쾌V
    this.character.source[13] = source.terror || 0;    // 공포
    this.character.source[6] = source.pain || 0;       // 고통
    this.character.source[12] = 300;
    this.character.source[14] = 200;

    // 메시지 표시
    await this.showTrainMessage();

    // 경험치 획득
    this.gainExperience();

    // BASE 업데이트
    this.ctx.base[0] += 30;  // V감각
    this.ctx.base[1] += 80;  // 욕망

    // 얼룩 처리
    this.handleStains();
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};

    // 쾌V 계산 (V감각 기반)
    const vValues = [10, 50, 250, 600, 1200, 1800];
    source.pleasureV = this.calculateAbilitySource(2, vValues);

    // 공포 계산 (V감각 기반)
    const terrorValues = [150, 250, 400, 700, 1300, 2000];
    source.terror = this.calculateAbilitySource(2, terrorValues);

    // V경험에 따른 수정
    const vExp = this.ctx.exp[0] || 0;
    const vExpLevels = [100, 300, 700, 1500, 3000];

    if (vExp < vExpLevels[0]) {
      source.pleasureV! *= 0.2;
      source.terror! *= 0.2;
      source.pain = 300;
    } else if (vExp < vExpLevels[1]) {
      source.pleasureV! *= 0.5;
      source.terror! *= 0.5;
      source.pain = 180;
    } else if (vExp < vExpLevels[2]) {
      source.pleasureV! *= 1.0;
      source.terror! *= 0.8;
      source.pain = 80;
    } else if (vExp < vExpLevels[3]) {
      source.pleasureV! *= 1.2;
      source.terror! *= 1.0;
      source.pain = 30;
    } else if (vExp < vExpLevels[4]) {
      source.pleasureV! *= 1.6;
      source.terror! *= 1.2;
      source.pain = 0;
    } else {
      source.pleasureV! *= 1.8;
      source.terror! *= 1.5;
      source.pain = 0;
    }

    // 윤활에 따른 수정
    const lubrication = this.ctx.params[3] || 0;
    const lubLevels = [200, 500, 1000, 1500];

    if (lubrication < lubLevels[0]) {
      source.pleasureV! *= 0.1;
      source.pain! += 700;
      source.pain! *= 3.0;
    } else if (lubrication < lubLevels[1]) {
      source.pleasureV! *= 0.2;
      source.pain! += 200;
      source.pain! *= 1.0;
    } else if (lubrication < lubLevels[2]) {
      source.pleasureV! *= 0.6;
      source.pain! *= 0.8;
    } else if (lubrication < lubLevels[3]) {
      source.pleasureV! *= 1.0;
      source.pain! *= 0.5;
    } else {
      source.pleasureV! *= 2.0;
      source.pain! *= 0.1;
    }

    // 욕정에 따른 수정
    const lust = this.ctx.params[5] || 0;
    const lustLevels = [200, 500, 1000, 1500];

    if (lust < lustLevels[0]) {
      source.pleasureV! *= 0.5;
    } else if (lust < lustLevels[1]) {
      source.pleasureV! *= 0.8;
    } else if (lust < lustLevels[2]) {
      source.pleasureV! *= 1.2;
    } else if (lust < lustLevels[3]) {
      source.pleasureV! *= 1.5;
    } else {
      source.pleasureV! *= 1.8;
    }

    // 소질 기반 수정
    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);

    // V민감
    if (this.hasTalent(103)) {
      source.pain! *= 1.5;
      source.terror! *= 1.5;
    } else if (this.hasTalent(104)) {
      // V둔감
      source.pain! *= 0.6;
      source.terror! *= 0.6;
    }

    // 처녀 + 정조관념
    if (this.ctx.exp[0] === 0 && this.hasTalent(30)) {
      source.terror! *= 2.0;
    }

    // 미숙함
    if (this.hasTalent(135)) {
      source.pain! *= 2.0;
    }

    return source;
  }

  private async showTrainMessage(): Promise<void> {
    const vSense = this.getAbility(2);
    const vExp = this.ctx.exp[0] || 0;

    if (vExp < 100) {
      this.message('"아...아파요...!"');
    } else if (vSense === 0) {
      this.message('손가락이 천천히 질 내부로 들어간다...');
    } else if (vSense <= 2) {
      this.message('"으음...안에서...느껴져..."');
    } else if (vSense <= 4) {
      this.message('"아...! 안쪽이...자극받아...!!"');
    } else {
      this.message('"안돼...손가락만으로도...이렇게...!!"');
    }

    // 반응 메시지
    if (this.character.source[1] >= 1000) {
      this.message('질 내부가 손가락을 조이며 반응한다...');
    }
  }

  private gainExperience(): void {
    // 레즈 경험
    if (this.hasTalent(122) === false && this.ctx.getTalent?.(122) === 0) {
      this.addExperience(40, 4);
    }

    // 처녀가 아니면 V경험
    if (this.hasTalent(0) === false) {
      this.addExperience(0, 1);
    }

    // 애정 경험
    if (this.character.flags[2] >= 1000 && !this.isAssiPlay()) {
      this.addExperience(23, 1);
    }
  }

  private handleStains(): void {
    // 얼룩 처리: 손가락 <-> 음부
    this.ctx.stain[3] = (this.ctx.stain[3] || 0) | (this.ctx.playerStain[1] || 0);
    this.ctx.playerStain[1] = (this.ctx.playerStain[1] || 0) | (this.ctx.stain[3] || 0);
  }
}

export async function com8(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  const command = new Com8Command(ctx, character);

  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }

  await command.execute();
}

/**
 * COM9: 애널핥기
 * 입으로 애널 자극
 */
export class Com9Command extends TrainingCommand {
  getName(): string {
    return '애널핥기';
  }

  getDescription(): string {
    return '혀로 항문을 자극합니다';
  }

  isAvailable(): boolean {
    // 하반신 노출 필수
    if (!this.bottomNaked()) {
      return false;
    }

    // 의식 필수
    if (this.character.flags[16] === -1) {
      return false;
    }

    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();

    // SOURCE 계산
    const source = this.calculateSource();

    // Character source에 적용
    this.character.source[2] = source.pleasureA || 0;  // 쾌A
    this.character.source[10] = 50;
    this.character.source[12] = 300;
    this.character.source[14] = 500;

    // 메시지 표시
    await this.showTrainMessage();

    // 경험치 획득
    this.gainExperience();

    // BASE 업데이트
    this.ctx.base[0] += 5;   // A감각
    this.ctx.base[1] += 50;  // 욕망

    // 얼룩 처리
    this.handleStains();
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};

    // 쾌A 계산 (A감각 기반)
    const aValues = [5, 50, 200, 500, 1000, 1800];
    source.pleasureA = this.calculateAbilitySource(3, aValues);

    // 소질 기반 수정
    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);

    // 혀놀림 소질 (플레이어)
    if (this.ctx.getTalent?.(52)) {
      source.pleasureA! *= 2.0;
    }

    return source;
  }

  private async showTrainMessage(): Promise<void> {
    const aSense = this.getAbility(3);

    this.message('혀로 항문을 핥는다...');

    if (aSense === 0) {
      this.message('"으...! 이상한 느낌..."');
    } else if (aSense <= 2) {
      this.message('"아...항문이...자극받아..."');
    } else if (aSense <= 4) {
      this.message('"으아앗...! 거기...느껴져...!!"');
    } else {
      this.message('"안돼...항문만으로...이렇게...!!"');
    }

    // 반응 메시지
    if (this.character.source[2] >= 800) {
      this.message('항문이 민감하게 반응한다...');
    }
  }

  private gainExperience(): void {
    // 레즈/호모 경험
    if (this.hasTalent(122) === false && this.ctx.getTalent?.(122) === 0) {
      this.addExperience(40, 3);
    }

    // A경험
    this.addExperience(1, 1);
  }

  private handleStains(): void {
    // 얼룩 처리: 항문 <-> 플레이어의 입
    this.ctx.stain[4] = (this.ctx.stain[4] || 0) | (this.ctx.playerStain[0] || 0);
    this.ctx.playerStain[0] = (this.ctx.playerStain[0] || 0) | (this.ctx.stain[4] || 0);
  }
}

export async function com9(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  const command = new Com9Command(ctx, character);

  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }

  await command.execute();
}

/**
 * COM10: 로터
 * 로터로 클리토리스 자극
 */
export class Com10Command extends TrainingCommand {
  getName(): string {
    return '로터';
  }

  getDescription(): string {
    return '전동 로터로 클리토리스를 자극합니다';
  }

  isAvailable(): boolean {
    // 로터 아이템 보유 필요 (ITEM:0)
    if (!this.ctx.items || this.ctx.items[0] === undefined || this.ctx.items[0] <= 0) {
      return false;
    }

    // 하반신 노출 필수
    if (!this.bottomNaked()) {
      return false;
    }

    // 의식 필수
    if (this.character.flags[16] === -1) {
      return false;
    }

    // 정조대 착용 시 불가
    if (this.character.flags[42] === 79) {
      return false;
    }

    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();

    // SOURCE 계산
    const source = this.calculateSource();

    // Character source에 적용
    this.character.source[0] = source.pleasureC || 0;
    this.character.source[17] = source.pleasureB || 0;
    this.character.source[3] = source.lubrication || 0;
    this.character.source[4] = source.submission || 0;
    this.character.source[5] = source.lust || 0;
    this.character.source[12] = 100;

    // 장비 플래그 설정 (로터 장착)
    this.character.equipment[90] = 1;

    // 메시지 표시
    await this.showTrainMessage();

    // 경험치 획득
    this.gainExperience();

    // BASE 업데이트
    this.ctx.base[0] += 20;  // C감각
    this.ctx.base[1] += 40;  // 욕망
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};

    // 쾌C 계산 (로터는 강력한 C쾌감)
    const cValues = [150, 500, 1200, 2200, 3500, 5000];
    source.pleasureC = this.calculateAbilitySource(0, cValues);

    // 쾌B 계산
    const bValues = [20, 80, 300, 700, 1200, 1800];
    source.pleasureB = this.calculateAbilitySource(1, bValues);

    // 윤활
    source.lubrication = 180;

    // 굴복 (도구 사용의 굴욕감)
    source.submission = 140;

    // 욕정
    source.lust = 120;

    // 소질 기반 수정
    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);

    // 특수 소질 효과

    // M기질
    if (this.hasTalent(85)) {
      source.submission! *= 1.5;
      source.pleasureC! *= 1.2;
    }

    // 감도가 높음
    if (this.hasTalent(62)) {
      source.pleasureC! *= 1.5;  // 도구는 효과가 더 큼
    }

    // 조루 체질
    if (this.hasTalent(80)) {
      source.pleasureC! *= 1.3;
    }

    return source;
  }

  private async showTrainMessage(): Promise<void> {
    const cSense = this.getAbility(0);

    this.message('전동 로터를 클리토리스에 밀착시킨다...');

    if (cSense === 0) {
      this.message('\"으...윙윙...뭔가...이상해...\"');
    } else if (cSense <= 2) {
      this.message('\"아앗...! 진동이...느껴져...!!\"');
    } else if (cSense <= 4) {
      this.message('\"으아앗! 클리가...계속 자극받아...!!\"');
    } else {
      this.message('\"안돼...이거...너무 강해...이대로면...!!\"');
    }

    // 반응 메시지
    if (this.character.source[0] >= 3000) {
      this.message('온몸이 떨리며 쾌감에 몸을 맡긴다...');
    } else if (this.character.source[0] >= 1500) {
      this.message('클리토리스가 진동에 부풀어 오른다.');
    }
  }

  private gainExperience(): void {
    // 도구 사용 경험치
    this.addExperience(15, 3);

    // 로터 경험치
    this.addExperience(52, 5);

    // 애무 경험치
    this.addExperience(14, 2);

    // 순결 경험치
    const playerVirgin = this.ctx.getTalent?.(122) === 0;
    const charVirgin = this.hasTalent(122);

    if (!charVirgin && !playerVirgin) {
      this.addExperience(40, 5);
    } else if (charVirgin && playerVirgin) {
      this.addExperience(41, 5);
    }

    // 페로몬
    if (this.character.flags[2] >= 1000 && !this.isAssiPlay()) {
      this.addExperience(23, 3);
    }
  }
}

export async function com10(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  const command = new Com10Command(ctx, character);

  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }

  await command.execute();
}

/**
 * COM11: 촉수 삽입
 * 촉수로 바기나 자극
 */
export class Com11Command extends TrainingCommand {
  getName(): string {
    return '촉수 삽입';
  }

  getDescription(): string {
    return '정상위 체위로 질 성교를 합니다';
  }

  isAvailable(): boolean {
    // 하반신 노출 필수
    if (!this.bottomNaked()) {
      return false;
    }

    // 의식 필수
    if (this.character.flags[16] === -1) {
      return false;
    }

    // 정조대 착용 시 불가
    if (this.character.flags[42] === 79) {
      return false;
    }

    // V성교 요구 능력치 체크 (ability[31] >= 1)
    const vSexDemand = this.getAbility(31);
    if (vSexDemand < 1) {
      return false; // 아직 V성교를 받아들일 수 없음
    }

    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();

    // 처녀 체크
    const wasVirgin = this.isVirgin();

    // === SOURCE 계산 ===
    const source = this.calculateSource();

    // Character source에 적용
    this.character.source[0] = source.pleasureC || 0;
    this.character.source[1] = source.pleasureV || 0;
    this.character.source[17] = source.pleasureB || 0;
    this.character.source[3] = source.lubrication || 0;
    this.character.source[4] = source.submission || 0;
    this.character.source[5] = source.lust || 0;
    this.character.source[9] = source.pain || 0;
    this.character.source[12] = 100;

    // 메시지 표시
    await this.showTrainMessage(wasVirgin);

    // === 처녀 상실 ===
    if (wasVirgin) {
      this.loseVirginity();
      this.character.flags[100] = 1; // 첫 경험 플래그
    }

    // === 경험치 획득 ===
    this.gainExperience(wasVirgin);

    // === BASE 업데이트 ===
    this.ctx.base[0] += 10;  // C감각
    this.ctx.base[2] += 100; // V감각
    this.ctx.base[1] += 80;  // 욕망

    // === 임신 체크 ===
    if (this.shouldCheckPregnancy()) {
      await this.checkPregnancy();
    }
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};

    const cSense = this.getAbility(0);
    const vSense = this.getAbility(2);
    const bSense = this.getAbility(1);
    const technique = this.getAbility(12); // 기교

    // === 쾌C 계산 ===
    const cValues = [100, 300, 800, 1500, 2200, 3000];
    source.pleasureC = this.calculateAbilitySource(0, cValues);

    // === 쾌V 계산 (주 쾌감) ===
    const vValues = [200, 600, 1200, 2000, 3000, 4500];
    source.pleasureV = this.calculateAbilitySource(2, vValues);

    // === 쾌B 계산 ===
    const bValues = [50, 150, 400, 800, 1200, 1800];
    source.pleasureB = this.calculateAbilitySource(1, bValues);

    // === 윤활 ===
    source.lubrication = 150;

    // === 굴복 ===
    source.submission = 100;

    // === 욕정 ===
    source.lust = 80;

    // === 고통 (처녀인 경우) ===
    if (this.isVirgin()) {
      source.pain = 300;
      source.pleasureV! /= 2; // 처녀는 쾌감 절반
      source.pleasureC! /= 2;
    } else {
      source.pain = 0;
    }

    // === 기교에 따른 보정 ===
    if (technique >= 3) {
      source.pleasureV! *= 1.2;
      source.pleasureC! *= 1.2;
    }

    // === 소질 기반 수정 ===
    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);

    // === 특수 소질 효과 ===

    // M기질
    if (this.hasTalent(85)) {
      source.submission! *= 1.5;
    }

    // S기질
    if (this.hasTalent(86)) {
      source.submission! /= 2;
    }

    // 감도가 높음
    if (this.hasTalent(62)) {
      source.pleasureV! *= 1.3;
    }

    return source;
  }

  private async showTrainMessage(wasVirgin: boolean): Promise<void> {
    const vSense = this.getAbility(2);

    if (wasVirgin) {
      this.message('천천히 삽입하여 처녀막을 관통한다...');
      this.message('"아...아파요...!!"');
      this.message('혈흔이 시트를 적신다.');
    } else {
      if (vSense === 0) {
        this.message('서투르게 삽입하고 허리를 움직인다...');
      } else if (vSense <= 2) {
        this.message('정상위로 천천히 피스톤 운동을 한다.');
      } else if (vSense <= 4) {
        this.message('숙련된 움직임으로 깊숙이 찌른다!');
      } else {
        this.message('완벽한 리듬으로 가장 민감한 곳을 자극한다!!');
      }
    }

    // 반응 메시지
    if (this.character.source[1] >= 2000) {
      this.message('"기분 좋아...더...!!"');
    } else if (this.character.source[1] >= 1000) {
      this.message('"으음...느껴져..."');
    }
  }

  private gainExperience(wasVirgin: boolean): void {
    // V성교 경험치
    this.addExperience(1, wasVirgin ? 50 : 10);

    // 순결 경험치
    const playerVirgin = this.ctx.getTalent?.(122) === 0;
    const charVirgin = this.hasTalent(122);

    if (!charVirgin && !playerVirgin) {
      this.addExperience(40, 10);
    } else if (charVirgin && playerVirgin) {
      this.addExperience(41, 10);
    }

    // 정상위 경험치
    this.addExperience(50, 5);

    // 페로몬 (호감도 체크)
    if (this.character.flags[2] >= 1000 && !this.isAssiPlay()) {
      this.addExperience(23, 5);
    }

    // 첫 경험 보너스
    if (wasVirgin) {
      this.addExperience(100, 100); // 처녀 상실 기념
    }
  }

  private shouldCheckPregnancy(): boolean {
    // 임신 가능 상태 체크
    if (this.hasTalent(200)) { // 불임
      return false;
    }

    if (this.hasTalent(201)) { // 임신 중
      return false;
    }

    if (this.character.flags[50]) { // 피임약 복용
      return false;
    }

    return true;
  }

  private async checkPregnancy(): Promise<void> {
    // 임신 확률 계산 (간단한 구현)
    const chance = Math.random();
    const baseChance = 0.1; // 10% 기본 확률

    let finalChance = baseChance;

    // 배란일이면 확률 상승
    if (this.character.flags[51] === 1) {
      finalChance *= 3;
    }

    // 정액량에 따른 보정
    const semenAmount = this.ctx.source[20] || 0;
    finalChance *= (1 + semenAmount / 1000);

    if (chance < finalChance) {
      this.message('');
      this.message('** 임신했습니다! **');
      this.ctx.talents.push(201); // 임신 중 소질 추가
      this.character.flags[45] = 0; // 임신 주차
    }
  }
}

export async function com11(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  const command = new Com11Command(ctx, character);

  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }

  await command.execute();
}

/**
 * COM12: E마사지기
 * E마사지기로 클리토리스 자극
 */
export class Com12Command extends TrainingCommand {
  getName(): string {
    return 'E마사지기';
  }

  getDescription(): string {
    return '전동 마사지기로 클리토리스를 강하게 자극합니다';
  }

  isAvailable(): boolean {
    // E마사지기 아이템 보유 필요 (ITEM:1)
    if (!this.ctx.items || this.ctx.items[1] === undefined || this.ctx.items[1] <= 0) {
      return false;
    }

    // 하반신 노출 필수
    if (!this.bottomNaked()) {
      return false;
    }

    // 의식 필수
    if (this.character.flags[16] === -1) {
      return false;
    }

    // 정조대 착용 시 불가
    if (this.character.flags[42] === 79) {
      return false;
    }

    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();

    // SOURCE 계산
    const source = this.calculateSource();

    // Character source에 적용
    this.character.source[0] = source.pleasureC || 0;
    this.character.source[12] = 120;
    this.character.source[14] = 400;

    // 메시지 표시
    await this.showTrainMessage();

    // 경험치 획득
    this.gainExperience();

    // BASE 업데이트
    this.ctx.base[0] += 30;  // C감각
    this.ctx.base[1] += 150; // 욕망
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};

    // 쾌C 계산 (E마사지기는 모든 레벨에서 강력)
    const cValues = [2000, 2500, 3000, 3300, 3600, 3800];
    source.pleasureC = this.calculateAbilitySource(0, cValues);

    // 소질 기반 수정
    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);

    // M기질
    if (this.hasTalent(85)) {
      source.pleasureC! *= 1.3;
    }

    // 감도가 높음
    if (this.hasTalent(62)) {
      source.pleasureC! *= 1.5;
    }

    // 조루 체질
    if (this.hasTalent(80)) {
      source.pleasureC! *= 1.4;
    }

    return source;
  }

  private async showTrainMessage(): Promise<void> {
    const cSense = this.getAbility(0);

    this.message('강력한 진동의 마사지기를 클리토리스에 밀착시킨다!');

    if (cSense === 0) {
      this.message('"으아앗...! 뭐...뭔가...엄청나...!!"');
    } else if (cSense <= 2) {
      this.message('"안돼...! 진동이...너무 강해...!!"');
    } else if (cSense <= 4) {
      this.message('"으아아아...!! 클리가...완전히...!!"');
    } else {
      this.message('"안돼안돼안돼...!! 이거...미쳐버려...!!"');
    }

    // 반응 메시지
    if (this.character.source[0] >= 3000) {
      this.message('강렬한 쾌감에 전신을 떨며 경련한다!!');
    } else if (this.character.source[0] >= 2000) {
      this.message('클리토리스가 크게 부풀어 올라 있다...');
    }
  }

  private gainExperience(): void {
    // 도구 사용 경험치
    this.addExperience(15, 3);

    // 애무 경험치
    this.addExperience(14, 2);

    // 순결 경험치
    const playerVirgin = this.ctx.getTalent?.(122) === 0;
    const charVirgin = this.hasTalent(122);

    if (!charVirgin && !playerVirgin) {
      this.addExperience(40, 5);
    } else if (charVirgin && playerVirgin) {
      this.addExperience(41, 5);
    }
  }
}

export async function com12(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  const command = new Com12Command(ctx, character);

  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }

  await command.execute();
}

/**
 * COM13: 애널촉수
 * 촉수로 애널 자극
 */
export class Com13Command extends TrainingCommand {
  getName(): string {
    return '애널촉수';
  }

  getDescription(): string {
    return '애널바이브로 항문을 자극합니다';
  }

  isAvailable(): boolean {
    // 하반신 노출 필수
    if (!this.bottomNaked()) {
      return false;
    }

    // 의식 필수
    if (this.character.flags[16] === -1) {
      return false;
    }

    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();

    // SOURCE 계산
    const source = this.calculateSource();

    // Character source에 적용
    this.character.source[2] = source.pleasureA || 0;  // 쾌A
    this.character.source[13] = source.terror || 0;    // 공포
    this.character.source[6] = source.pain || 0;       // 고통
    this.character.source[14] = source.depression || 0;

    // 메시지 표시
    await this.showTrainMessage();

    // 경험치 획득
    this.gainExperience();

    // BASE 업데이트
    this.ctx.base[0] += 60;  // A감각
    this.ctx.base[1] += 150; // 욕망
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};

    // 쾌A 계산 (A감각 기반)
    const aValues = [80, 250, 600, 1000, 1300, 1700];
    source.pleasureA = this.calculateAbilitySource(3, aValues);

    // 공포 계산 (A감각 기반)
    const terrorValues = [300, 800, 1400, 1800, 2100, 2400];
    source.terror = this.calculateAbilitySource(3, terrorValues);

    source.depression = 300;

    // A경험에 따른 수정
    const aExp = this.ctx.exp[1] || 0;
    const aExpLevels = [100, 300, 700, 1500, 3000];

    if (aExp < aExpLevels[0]) {
      source.pleasureA! *= 0.5;
      source.pain = 2000;
      source.depression! += 200;
    } else if (aExp < aExpLevels[1]) {
      source.pleasureA! *= 1.0;
      source.pain = 300;
      source.depression! += 100;
    } else if (aExp < aExpLevels[2]) {
      source.pleasureA! *= 1.1;
      source.pain = 50;
      source.depression! += 50;
    } else if (aExp < aExpLevels[3]) {
      source.pleasureA! *= 1.2;
      source.pain = 10;
    } else if (aExp < aExpLevels[4]) {
      source.pleasureA! *= 1.4;
      source.pain = 0;
    } else {
      source.pleasureA! *= 1.6;
      source.pain = 0;
    }

    // 윤활에 따른 수정
    const lubrication = this.ctx.params[3] || 0;
    const lubLevels = [200, 500, 1000, 1500];

    if (lubrication < lubLevels[0]) {
      source.pleasureA! *= 0.4;
      source.pain! += 800;
    } else if (lubrication < lubLevels[1]) {
      source.pleasureA! *= 0.8;
      source.pain! += 500;
    } else if (lubrication < lubLevels[2]) {
      source.pleasureA! *= 1.0;
      source.pain! += 300;
    } else if (lubrication < lubLevels[3]) {
      source.pleasureA! *= 1.4;
      source.pain! += 120;
    } else {
      source.pleasureA! *= 1.8;
      source.pain! += 100;
    }

    // 욕정에 따른 수정
    const lust = this.ctx.params[5] || 0;
    const lustLevels = [200, 500, 1000, 1500];

    if (lust < lustLevels[0]) {
      source.pleasureA! *= 0.8;
    } else if (lust < lustLevels[1]) {
      source.pleasureA! *= 0.9;
    } else if (lust < lustLevels[2]) {
      source.pleasureA! *= 1.0;
    } else if (lust < lustLevels[3]) {
      source.pleasureA! *= 1.1;
    } else {
      source.pleasureA! *= 1.2;
    }

    // 종순에 따른 수정
    const obedience = this.getAbility(10);
    const obedienceMultipliers = [0.8, 0.9, 1.0, 1.0, 1.0, 1.0];
    const depressionMultipliers = [2.0, 1.5, 1.0, 0.8, 0.6, 0.3];

    source.pleasureA! *= obedienceMultipliers[Math.min(obedience, 5)];
    source.depression! *= depressionMultipliers[Math.min(obedience, 5)];

    // 소질 기반 수정
    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);

    // 큰 체구
    if (this.hasTalent(99)) {
      source.pain! *= 0.8;
    }

    // 작은 체형
    if (this.hasTalent(100)) {
      source.pain! *= 2.0;
    }

    // 미숙함
    if (this.hasTalent(135)) {
      source.pain! *= 2.0;
    }

    // A민감
    if (this.hasTalent(105)) {
      source.pain! *= 1.5;
      source.terror! *= 1.5;
      source.depression! *= 1.5;
    } else if (this.hasTalent(106)) {
      // A둔감
      source.pain! *= 0.6;
      source.terror! *= 0.6;
      source.depression! *= 0.6;
    }

    return source;
  }

  private async showTrainMessage(): Promise<void> {
    const aSense = this.getAbility(3);
    const aExp = this.ctx.exp[1] || 0;

    this.message('애널바이브를 천천히 삽입한다...');

    if (aExp < 100) {
      this.message('"안돼...! 그건...너무...!!"');
    } else if (aSense === 0) {
      this.message('"으윽...! 이상해...!"');
    } else if (aSense <= 2) {
      this.message('"아...! 항문이...채워져..."');
    } else if (aSense <= 4) {
      this.message('"으아앗...! 안쪽까지...느껴져...!!"');
    } else {
      this.message('"안돼...항문만으로도...이렇게 느껴져...!!"');
    }

    // 반응 메시지
    if (this.character.source[2] >= 1500) {
      this.message('바이브레이션이 항문을 자극하며 몸을 떨게 한다...');
    }
  }

  private gainExperience(): void {
    // A감각에 따른 A경험
    const aSense = this.getAbility(3);
    let exp = 1;
    if (aSense <= 1) {
      exp = 1;
    } else if (aSense <= 4) {
      exp = 2;
    } else if (aSense <= 7) {
      exp = 3;
    } else {
      exp = 4;
    }
    this.addExperience(1, exp);

    // 레즈/호모 경험
    const playerVirgin = this.ctx.getTalent?.(122) === 0;
    const charVirgin = this.hasTalent(122);

    if (!charVirgin && !playerVirgin) {
      this.addExperience(40, 1);
    } else if (charVirgin && playerVirgin) {
      this.addExperience(41, 1);
    }
  }
}

export async function com13(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  const command = new Com13Command(ctx, character);

  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }

  await command.execute();
}

/**
 * COM14: 촉수 클리자극
 * 클리캡으로 클리토리스 자극
 */
export class Com14Command extends TrainingCommand {
  getName(): string {
    return '촉수 클리자극';
  }

  getDescription(): string {
    return '클리토리스 캡으로 클리토리스를 집중 자극합니다';
  }

  isAvailable(): boolean {
    // 하반신 노출 필수
    if (!this.bottomNaked()) {
      return false;
    }

    // 의식 필수
    if (this.character.flags[16] === -1) {
      return false;
    }

    // 정조대 착용 시 불가
    if (this.character.flags[42] === 79) {
      return false;
    }

    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();

    // SOURCE 계산
    const source = this.calculateSource();

    // Character source에 적용
    this.character.source[0] = source.pleasureC || 0;  // 쾌C
    this.character.source[12] = 120;
    this.character.source[14] = 70;

    // 메시지 표시
    await this.showTrainMessage();

    // 경험치 획득
    this.gainExperience();

    // BASE 업데이트
    this.ctx.base[0] += 10;  // C감각
    this.ctx.base[1] += 80;  // 욕망
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};

    // 쾌C 계산 (C감각 기반)
    const cValues = [200, 400, 900, 1600, 2400, 3000];
    source.pleasureC = this.calculateAbilitySource(0, cValues);

    // 소질 기반 수정
    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);

    return source;
  }

  private async showTrainMessage(): Promise<void> {
    const cSense = this.getAbility(0);

    this.message('클리토리스에 전동 캡을 장착한다...');

    if (cSense === 0) {
      this.message('"으...! 진동이...!?"');
    } else if (cSense <= 2) {
      this.message('"아...클리토리스가...집중적으로..."');
    } else if (cSense <= 4) {
      this.message('"으아앗...! 클리토리스만...너무 강해...!!"');
    } else {
      this.message('"안돼...! 클리토리스만으로...절정에...!!"');
    }

    // 반응 메시지
    if (this.character.source[0] >= 2000) {
      this.message('강렬한 진동이 클리토리스를 끊임없이 자극한다...');
    }
  }

  private gainExperience(): void {
    // 레즈 경험
    if (this.hasTalent(122) === false && this.ctx.getTalent?.(122) === 0) {
      this.addExperience(40, 1);
    }
  }
}

export async function com14(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  const command = new Com14Command(ctx, character);

  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }

  await command.execute();
}

/**
 * COM15: 촉수 유두자극
 * 니플캡으로 유두 자극
 */
export class Com15Command extends TrainingCommand {
  getName(): string {
    return '촉수 유두자극';
  }

  getDescription(): string {
    return '니플캡으로 유두를 자극합니다';
  }

  isAvailable(): boolean {
    // 상반신 노출 필수
    if (!this.topNaked()) {
      return false;
    }

    // 의식 필수
    if (this.character.flags[16] === -1) {
      return false;
    }

    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();

    // SOURCE 계산
    const source = this.calculateSource();

    // Character source에 적용
    this.character.source[17] = source.pleasureB || 0;  // 쾌B
    this.character.source[12] = 120;
    this.character.source[14] = 70;

    // 메시지 표시
    await this.showTrainMessage();

    // 경험치 획득
    this.gainExperience();

    // BASE 업데이트
    this.ctx.base[0] += 20;  // B감각
    this.ctx.base[1] += 70;  // 욕망
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};

    // 쾌B 계산 (B감각 기반)
    const bValues = [100, 300, 800, 1500, 2300, 2900];
    source.pleasureB = this.calculateAbilitySource(1, bValues);

    // 소질 기반 수정
    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);

    // 유두약함
    if (this.hasTalent(110)) {
      source.pleasureB! *= 1.5;
    }

    // B민감
    if (this.hasTalent(108)) {
      source.pleasureB! *= 1.5;
    } else if (this.hasTalent(107)) {
      // B둔감
      source.pleasureB! *= 0.6;
    }

    return source;
  }

  private async showTrainMessage(): Promise<void> {
    const bSense = this.getAbility(1);

    this.message('양쪽 유두에 니플캡을 장착한다...');

    if (bSense === 0) {
      this.message('"으...! 유두가...!?"');
    } else if (bSense <= 2) {
      this.message('"아...유두가...진동으로..."');
    } else if (bSense <= 4) {
      this.message('"으아앗...! 유두만...너무 자극적이야...!!"');
    } else {
      this.message('"안돼...! 유두만으로...이렇게 느껴져...!!"');
    }

    // 반응 메시지
    if (this.character.source[17] >= 2000) {
      this.message('니플캡의 진동이 유두를 끊임없이 자극한다...');
    }
  }

  private gainExperience(): void {
    // 레즈/호모 경험
    const playerVirgin = this.ctx.getTalent?.(122) === 0;
    const charVirgin = this.hasTalent(122);

    if (!charVirgin && !playerVirgin) {
      this.addExperience(40, 1);
    } else if (charVirgin && playerVirgin) {
      this.addExperience(41, 1);
    }
  }
}

export async function com15(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  const command = new Com15Command(ctx, character);

  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }

  await command.execute();
}

/**
 * COM16: 촉수 착유
 * 착유기로 유방 자극
 */
export class Com16Command extends TrainingCommand {
  getName(): string {
    return this.character.equipment[90] ? '촉수 착유' : '착유기';
  }

  getDescription(): string {
    return '착유기로 가슴을 집중적으로 자극합니다';
  }

  isAvailable(): boolean {
    // 상반신 노출 필수
    if (!this.topNaked()) {
      return false;
    }

    // 의식 필수
    if (this.character.flags[16] === -1) {
      return false;
    }

    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();

    // SOURCE 계산
    const source = this.calculateSource();

    // Character source에 적용
    this.character.source[17] = source.pleasureB || 0;  // 쾌B
    this.character.source[4] = 100;   // 굴복
    this.character.source[5] = 100;   // 욕정
    this.character.source[6] = 100;   // 고통
    this.character.source[7] = 100;   // 애정
    this.character.source[12] = 100;
    this.character.source[13] = 100;
    this.character.source[16] = 100;

    // 메시지 표시
    await this.showTrainMessage();

    // 경험치 획득
    this.gainExperience();

    // BASE 업데이트
    this.ctx.base[0] += 50;   // C감각
    this.ctx.base[1] += 100;  // 욕망

    // 착유기 장착/해제 토글
    this.character.equipment[16] = this.character.equipment[16] ? 0 : 1;

    // 촉수 착유 시 더러움
    if (this.character.equipment[90] && this.character.equipment[16]) {
      this.ctx.stain[5] |= 2;
      this.ctx.stain[5] |= 4;
    }
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};

    // 쾌B 계산 (B감각 기반)
    const bValues = [200, 400, 900, 1600, 2400, 3000];
    source.pleasureB = this.calculateAbilitySource(1, bValues);

    // 특수 소질 효과
    if (this.hasTalent(110)) { // 폭유
      source.pleasureB! *= 1.5;
    }

    if (this.hasTalent(108)) { // 모유체질
      source.pleasureB! *= 1.5;
    } else if (this.hasTalent(107)) { // 빈유
      source.pleasureB! *= 0.6;
    }

    // 절벽
    if (this.hasTalent(116)) {
      source.pain = (source.pain || 100) * 1.8;
    }

    // 빈유
    if (this.hasTalent(109)) {
      source.pain = (source.pain || 100) * 1.5;
    }

    // 슬라임 아이템 효과
    if (this.ctx.items?.[210] >= 1 && !this.character.equipment[90]) {
      this.ctx.base[0] *= 0.8;
      this.ctx.base[1] *= 0.8;
      source.pleasureB! *= 1.2;
    }

    return source;
  }

  private async showTrainMessage(): Promise<void> {
    const bSense = this.getAbility(1);

    if (this.character.equipment[90]) {
      this.message('촉수가 가슴을 감싸며 착유를 시작한다...');
    } else {
      this.message('착유기를 가슴에 장착한다...');
    }

    if (bSense === 0) {
      this.message('"으...가슴이...빨려들어가..."');
    } else if (bSense <= 2) {
      this.message('"아...유두가...너무 민감해..."');
    } else if (bSense <= 4) {
      this.message('"안돼...이렇게 강하게...!!"');
    } else {
      this.message('"으앗...!! 가슴만으로...느껴져...!!"');
    }

    if (this.hasTalent(70)) { // 모유체질
      this.message('착유기에서 모유가 추출되고 있다...');
    }
  }

  private gainExperience(): void {
    // 순결 경험치
    const playerVirgin = this.ctx.getTalent?.(122) === 0;
    const charVirgin = this.hasTalent(122);

    if (!charVirgin && !playerVirgin) {
      this.addExperience(40, 1);
    } else if (charVirgin && playerVirgin) {
      this.addExperience(41, 1);
    }
  }
}

export async function com16(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  const command = new Com16Command(ctx, character);

  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }

  await command.execute();
}

/**
 * COM17: 촉수 페니스자극
 * 오나홀로 페니스 자극
 */
export class Com17Command extends TrainingCommand {
  getName(): string {
    return this.character.equipment[90] ? '촉수 페니스자극' : '오나홀';
  }

  getDescription(): string {
    return '오나홀로 페니스를 자극합니다';
  }

  isAvailable(): boolean {
    // 하반신 노출 필수
    if (!this.bottomNaked()) {
      return false;
    }

    // 페니스 필수 (남성 또는 후타나리)
    if (!this.hasTalent(121) && !this.hasTalent(122)) {
      return false;
    }

    // 의식 필수
    if (this.character.flags[16] === -1) {
      return false;
    }

    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();

    // SOURCE 계산
    const source = this.calculateSource();

    // Character source에 적용
    this.character.source[0] = source.pleasureC || 0;  // 쾌C
    this.character.source[12] = 120;
    this.character.source[14] = 70;

    // 메시지 표시
    await this.showTrainMessage();

    // 경험치 획득
    this.gainExperience();

    // BASE 업데이트
    this.ctx.base[0] += 10;   // C감각
    this.ctx.base[1] += 80;   // 욕망

    // 오나홀 장착/해제 토글
    this.character.equipment[17] = this.character.equipment[17] ? 0 : 1;

    // 촉수 자극 시 더러움
    if (this.character.equipment[90] && this.character.equipment[17]) {
      this.ctx.stain[3] |= 2;
      this.ctx.stain[3] |= 4;
    }
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};

    // 쾌C 계산 (C감각 기반)
    const cValues = [200, 400, 900, 1600, 2400, 3000];
    source.pleasureC = this.calculateAbilitySource(0, cValues);

    // 슬라임 아이템 효과
    if (this.ctx.items?.[214] >= 1 && !this.character.equipment[90]) {
      this.ctx.base[0] *= 0.8;
      this.ctx.base[1] *= 0.8;
      source.pleasureC! *= 1.2;
    }

    return source;
  }

  private async showTrainMessage(): Promise<void> {
    const cSense = this.getAbility(0);

    if (this.character.equipment[90]) {
      this.message('촉수가 페니스를 감싸며 자극한다...');
    } else {
      this.message('오나홀을 페니스에 장착한다...');
    }

    if (cSense === 0) {
      this.message('"으...조이는 느낌이..."');
    } else if (cSense <= 2) {
      this.message('"아...생각보다...강해..."');
    } else if (cSense <= 4) {
      this.message('"으앗...! 너무...자극적이야...!!"');
    } else {
      this.message('"안돼...이렇게 계속하면...!!"');
    }
  }

  private gainExperience(): void {
    // 순결 경험치
    const playerVirgin = this.ctx.getTalent?.(122) === 0;
    const charVirgin = this.hasTalent(122);

    if (!charVirgin && !playerVirgin) {
      this.addExperience(40, 1);
    } else if (charVirgin && playerVirgin) {
      this.addExperience(41, 1);
    }
  }
}

export async function com17(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  const command = new Com17Command(ctx, character);

  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }

  await command.execute();
}

/**
 * COM18: 샤워
 * 샤워로 더러움 제거
 */
export class Com18Command extends TrainingCommand {
  getName(): string {
    return '샤워';
  }

  getDescription(): string {
    return '샤워로 몸을 씻으며 자극합니다';
  }

  isAvailable(): boolean {
    // 의식 필수
    if (this.character.flags[16] === -1) {
      return false;
    }

    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();

    // SOURCE 계산
    const source = this.calculateSource();

    // Character source에 적용
    this.character.source[3] = source.lubrication || 0;  // 윤활
    this.character.source[5] = 400;   // 욕정
    this.character.source[12] = source.sensation || 0;
    this.character.source[14] = 50;
    this.character.source[16] = 200;

    // 메시지 표시
    await this.showTrainMessage();

    // 경험치 획득
    this.gainExperience();

    // BASE 업데이트
    this.ctx.base[0] += 0;    // C감각
    this.ctx.base[1] += 10;   // 욕망

    // 샤워 장착/해제 토글
    this.character.equipment[18] = this.character.equipment[18] ? 0 : 1;

    // 샤워로 더러움 리셋
    this.resetStains();
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};

    // 욕정에 따른 감각 자극
    const lust = this.ctx.params[5] || 0;
    const lustLevels = [200, 500, 1000, 1500];

    if (lust < lustLevels[0]) {
      source.sensation = 10;
    } else if (lust < lustLevels[1]) {
      source.sensation = 30;
    } else if (lust < lustLevels[2]) {
      source.sensation = 60;
    } else if (lust < lustLevels[3]) {
      source.sensation = 100;
    } else {
      source.sensation = 150;
    }

    // 봉사정신에 따른 윤활
    const serviceValues = [0, 20, 40, 70, 110, 150];
    source.lubrication = this.calculateAbilitySource(16, serviceValues);

    // 종순에 따른 욕정 수정
    const obedience = this.getAbility(10);
    const obedienceMultipliers = [0.8, 0.9, 1.0, 1.1, 1.2, 1.3];
    source.lust = 400 * obedienceMultipliers[Math.min(obedience, 5)];

    // 동물귀 특수 효과
    if (this.hasTalent(124)) {
      source.fear = (source.fear || 0) * 1.6;
      source.antipathy = (source.antipathy || 0) * 1.5;
      source.depression = (source.depression || 0) * 2.0;
    }

    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('따뜻한 물이 온몸을 적신다...');

    const lust = this.ctx.params[5] || 0;

    if (lust < 200) {
      this.message('"...기분 좋네..."');
    } else if (lust < 1000) {
      this.message('"물이...살갗에 닿는 느낌이..."');
    } else {
      this.message('"물줄기가...민감한 곳을...!!"');
    }

    if (this.hasTalent(124)) { // 동물귀
      this.message('물을 싫어하는 것 같다...');
    }
  }

  private gainExperience(): void {
    // 순결 경험치
    const playerVirgin = this.ctx.getTalent?.(122) === 0;
    const charVirgin = this.hasTalent(122);

    if (!charVirgin && !playerVirgin) {
      this.addExperience(40, 1);
    } else if (charVirgin && playerVirgin) {
      this.addExperience(41, 1);
    }
  }

  private resetStains(): void {
    // 더러움 상태 리셋
    if (this.ctx.stain) {
      this.ctx.stain[0] = 0;
      this.ctx.stain[1] = 0;
      this.ctx.stain[2] = 2;
      this.ctx.stain[3] = 1;
      this.ctx.stain[4] = 8;
      this.ctx.stain[5] = 0;
    }

    // 윤활 반감
    if (this.ctx.params[3]) {
      this.ctx.params[3] = Math.floor(this.ctx.params[3] / 2);
    }
    if (this.ctx.params[12]) {
      this.ctx.params[12] = Math.floor(this.ctx.params[12] / 2);
    }
  }
}

export async function com18(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  const command = new Com18Command(ctx, character);

  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }

  await command.execute();
}

/**
 * COM19: 애널비즈
 * 애널비즈로 애널 자극
 */
export class Com19Command extends TrainingCommand {
  getName(): string {
    return '애널비즈';
  }

  getDescription(): string {
    return '애널비즈로 항문을 자극합니다';
  }

  isAvailable(): boolean {
    // 하반신 노출 필수
    if (!this.bottomNaked()) {
      return false;
    }

    // 의식 필수
    if (this.character.flags[16] === -1) {
      return false;
    }

    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();

    // SOURCE 계산
    const source = this.calculateSource();

    // Character source에 적용
    this.character.source[2] = source.pleasureA || 0;   // 쾌A
    this.character.source[6] = source.pain || 0;        // 고통
    this.character.source[13] = source.submission || 0; // 굴복

    // 메시지 표시
    await this.showTrainMessage();

    // 경험치 획득
    this.gainExperience();

    // BASE 업데이트
    this.ctx.base[0] += 60;   // C감각
    this.ctx.base[1] += 150;  // 욕망

    // 애널비즈 장착/해제 토글
    const wasEquipped = this.character.equipment[19] || 0;
    this.character.equipment[19] = wasEquipped ? 0 : 1;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};

    // 쾌A 계산 (A감각 기반)
    const aValues = [80, 250, 600, 1000, 1300, 1700];
    source.pleasureA = this.calculateAbilitySource(3, aValues);

    // 굴복 계산 (A감각 기반)
    const subValues = [300, 800, 1400, 1800, 2100, 2400];
    source.submission = this.calculateAbilitySource(3, subValues);

    // A경험에 따른 수정
    const aExp = this.ctx.exp[1] || 0;
    const expLevels = [100, 300, 700, 1500, 3000];

    if (aExp < expLevels[0]) {
      source.pleasureA! *= 0.5;
      source.pain = 2000;
    } else if (aExp < expLevels[1]) {
      source.pleasureA! *= 1.0;
      source.pain = 300;
    } else if (aExp < expLevels[2]) {
      source.pleasureA! *= 1.1;
      source.pain = 50;
    } else if (aExp < expLevels[3]) {
      source.pleasureA! *= 1.2;
      source.pain = 10;
    } else if (aExp < expLevels[4]) {
      source.pleasureA! *= 1.4;
      source.pain = 0;
    } else {
      source.pleasureA! *= 1.6;
      source.pain = 0;
    }

    // 윤활에 따른 수정
    const lubrication = this.ctx.params[3] || 0;
    const lubLevels = [200, 500, 1000, 1500];

    if (lubrication < lubLevels[0]) {
      source.pleasureA! *= 0.4;
      source.pain! += 1200;
    } else if (lubrication < lubLevels[1]) {
      source.pleasureA! *= 0.8;
      source.pain! += 700;
    } else if (lubrication < lubLevels[2]) {
      source.pleasureA! *= 1.0;
      source.pain! += 400;
    } else if (lubrication < lubLevels[3]) {
      source.pleasureA! *= 1.4;
      source.pain! += 150;
    } else {
      source.pleasureA! *= 1.8;
      source.pain! += 100;
    }

    // 욕정에 따른 수정
    const lust = this.ctx.params[5] || 0;
    const lustMultipliers = [0.8, 0.9, 1.0, 1.1, 1.2];
    const lustLevel = Math.min(4, Math.floor(lust / 200));
    source.pleasureA! *= lustMultipliers[lustLevel];

    // 종순에 따른 수정
    const obedience = this.getAbility(10);
    const obedienceMultipliers = [0.8, 0.9, 1.0, 1.1, 1.2, 1.3];
    source.pleasureA! *= obedienceMultipliers[Math.min(obedience, 5)];

    // 체구 소질
    if (this.hasTalent(99)) { // 큰 체구
      source.pain! *= 0.8;
    }

    if (this.hasTalent(100)) { // 작은 체형
      source.pain! *= 2.0;
    }

    if (this.hasTalent(135)) { // 미숙함
      source.pain! *= 2.0;
    }

    // A민감/둔감
    if (this.hasTalent(105)) { // A민감
      source.pain! *= 1.5;
      source.submission! *= 1.5;
    } else if (this.hasTalent(106)) { // A둔감
      source.pain! *= 0.6;
      source.submission! *= 0.6;
    }

    // 정조관념
    if (this.ctx.exp[0] === 0 && this.hasTalent(30)) {
      source.submission! /= 3;
    }

    // 장착 상태에 따른 보정
    const wasEquipped = this.character.equipment[19] || 0;
    if (!wasEquipped) {
      source.pleasureA! *= 0.8;
    } else {
      source.pleasureA! *= 3.0;
    }

    // 슬라임 아이템 효과
    if (this.ctx.items?.[212] >= 1 && !this.character.equipment[90]) {
      this.ctx.base[0] *= 0.8;
      this.ctx.base[1] *= 0.8;
      source.pleasureA! *= 1.2;
      source.pain! *= 0.8;
      source.submission! *= 1.2;
    }

    return source;
  }

  private async showTrainMessage(): Promise<void> {
    const aSense = this.getAbility(3);
    const aExp = this.ctx.exp[1] || 0;
    const wasEquipped = this.character.equipment[19] || 0;

    if (wasEquipped) {
      this.message('애널비즈를 천천히 뽑아낸다...');
    } else {
      this.message('애널비즈를 천천히 삽입한다...');
    }

    if (aExp === 0) {
      this.message('"으윽...! 아파...!!"');
    } else if (aSense === 0) {
      this.message('"으음...이상한 느낌..."');
    } else if (aSense <= 2) {
      this.message('"아...항문이...느껴져..."');
    } else if (aSense <= 4) {
      this.message('"으앗...! 뒤가...꽉 차...!!"');
    } else {
      this.message('"안돼...항문이...너무 민감해...!!"');
    }
  }

  private gainExperience(): void {
    // A경험
    const wasEquipped = this.character.equipment[19] || 0;
    if (!wasEquipped) {
      this.addExperience(1, 1);
    } else {
      this.addExperience(1, 2);
    }

    // 순결 경험치
    const playerVirgin = this.ctx.getTalent?.(122) === 0;
    const charVirgin = this.hasTalent(122);

    if (!charVirgin && !playerVirgin) {
      this.addExperience(40, 1);
    } else if (charVirgin && playerVirgin) {
      this.addExperience(41, 1);
    }
  }
}

export async function com19(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  const command = new Com19Command(ctx, character);

  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }

  await command.execute();
}

/**
 * COM20: 정상위
 * 페니스를 바기나에 삽입
 */
export class Com20Command extends TrainingCommand {
  getName(): string {
    return '정상위';
  }

  getDescription(): string {
    return '정상위 체위로 성교합니다';
  }

  isAvailable(): boolean {
    // 하반신 노출 필수
    if (!this.bottomNaked()) {
      return false;
    }

    // 의식 필수
    if (this.character.flags[16] === -1) {
      return false;
    }

    // 정조대 착용 시 불가
    if (this.character.flags[42] === 79) {
      return false;
    }

    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();

    // SOURCE 계산
    const source = this.calculateSource();

    // Character source에 적용
    this.character.source[1] = source.pleasureV || 0;   // 쾌V
    this.character.source[3] = source.lubrication || 0; // 윤활
    this.character.source[6] = source.pain || 0;        // 고통
    this.character.source[12] = 400;
    this.character.source[15] = source.depression || 0; // 반감

    // 메시지 표시
    await this.showTrainMessage();

    // 경험치 획득
    this.gainExperience();

    // BASE 업데이트
    const vSense = this.getAbility(2);
    const baseC = Math.max(10, 100 - vSense * 3);
    const baseV = Math.max(10, 50 - vSense * 2);

    this.ctx.base[0] += baseC;  // C감각 (V감각에 따라 감소)
    this.ctx.base[1] += baseV;  // 욕망
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};

    // 쾌V 계산 (V감각 기반)
    const vValues = [40, 150, 400, 1000, 1700, 2200];
    source.pleasureV = this.calculateAbilitySource(2, vValues);

    // 윤활 계산 (V감각 기반)
    const lubValues = [150, 250, 350, 500, 700, 1000];
    source.lubrication = this.calculateAbilitySource(2, lubValues);

    // V경험에 따른 수정
    const vExp = this.ctx.exp[0] || 0;
    const vExpLevels = [100, 300, 700, 1500, 3000];

    if (vExp < vExpLevels[0]) {
      source.pleasureV! *= 0.2;
      source.pain = 5500;
    } else if (vExp < vExpLevels[1]) {
      source.pleasureV! *= 0.6;
      source.pain = 300;
    } else if (vExp < vExpLevels[2]) {
      source.pleasureV! *= 1.0;
      source.pain = 50;
    } else if (vExp < vExpLevels[3]) {
      source.pleasureV! *= 1.2;
      source.pain = 10;
    } else if (vExp < vExpLevels[4]) {
      source.pleasureV! *= 1.3;
      source.pain = 0;
    } else {
      source.pleasureV! *= 1.8;
      source.pain = 0;
    }

    // 윤활에 따른 수정
    const lubrication = this.ctx.params[3] || 0;
    const lubLevels = [200, 500, 1000, 1500];

    if (lubrication < lubLevels[0]) {
      source.pleasureV! *= 0.1;
      source.pain! += 1000;
      source.pain! *= 3.0;
    } else if (lubrication < lubLevels[1]) {
      source.pleasureV! *= 0.4;
      source.pain! += 300;
      source.pain! *= 1.0;
    } else if (lubrication < lubLevels[2]) {
      source.pleasureV! *= 1.0;
      source.pain! *= 0.5;
    } else if (lubrication < lubLevels[3]) {
      source.pleasureV! *= 1.4;
      source.pain! *= 0.2;
    } else {
      source.pleasureV! *= 1.8;
      source.pain! *= 0.1;
    }

    // 정조관념
    if (this.hasTalent(30)) {
      if (vExp === 0) {
        source.lubrication! *= 0.6;
        source.depression = 10000;
      } else {
        source.lubrication! *= 0.6;
        source.depression = 1000;
      }
    } else if (this.hasTalent(31)) {
      // 정조무관심
      if (vExp === 0) {
        source.lubrication! *= 0.6;
        source.depression = 300;
      }
    } else {
      if (vExp === 0) {
        source.depression = 3000;
      }
    }

    // 욕정에 따른 수정
    const lust = this.ctx.params[5] || 0;
    const lustLevels = [200, 500, 1000, 1500];

    if (lust < lustLevels[0]) {
      source.pleasureV! *= 0.6;
      source.lubrication! *= 0.3;
    } else if (lust < lustLevels[1]) {
      source.pleasureV! *= 0.8;
      source.lubrication! *= 0.6;
    } else if (lust < lustLevels[2]) {
      source.pleasureV! *= 1.0;
      source.lubrication! *= 1.0;
    } else if (lust < lustLevels[3]) {
      source.pleasureV! *= 1.2;
      source.lubrication! *= 1.5;
    } else {
      source.pleasureV! *= 1.5;
      source.lubrication! *= 1.8;
    }

    // 종순에 따른 수정
    const obedience = this.getAbility(10);
    const obedienceVMultipliers = [0.5, 0.8, 1.0, 1.3, 1.6, 2.0];
    const obedienceLubMultipliers = [0.6, 0.8, 1.0, 1.2, 1.4, 1.6];
    const obedienceDepMultipliers = [2.0, 1.5, 1.0, 0.8, 0.6, 0.3];

    source.pleasureV! *= obedienceVMultipliers[Math.min(obedience, 5)];
    source.lubrication! *= obedienceLubMultipliers[Math.min(obedience, 5)];
    if (source.depression) {
      source.depression *= obedienceDepMultipliers[Math.min(obedience, 5)];
    }

    // 소질 기반 수정
    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);

    // 큰 체구
    if (this.hasTalent(99)) {
      source.pain! *= 0.8;
    }

    // 작은 체형
    if (this.hasTalent(100)) {
      source.pain! *= 2.0;
    }

    // 미숙함
    if (this.hasTalent(135)) {
      source.pain! *= 4.0;
    }

    return source;
  }

  private async showTrainMessage(): Promise<void> {
    const vSense = this.getAbility(2);
    const vExp = this.ctx.exp[0] || 0;

    this.message('정상위 체위로 천천히 삽입한다...');

    if (vExp === 0) {
      this.message('"아...아파...!!"');
      this.message('처음의 고통에 몸을 떤다...');
    } else if (vSense === 0) {
      this.message('"으음...가득 차는 느낌..."');
    } else if (vSense <= 2) {
      this.message('"아...안이...느껴져..."');
    } else if (vSense <= 4) {
      this.message('"으아앗...! 안쪽까지...꽉 차...!!"');
    } else {
      this.message('"안돼...이렇게 격렬하게...느껴져...!!"');
    }

    // 반응 메시지
    if (this.character.source[1] >= 1500) {
      this.message('질 내부가 격렬하게 조이며 쾌감을 느끼고 있다...');
    }
  }

  private gainExperience(): void {
    // V경험
    const vExp = this.ctx.exp[0] || 0;
    if (vExp === 0) {
      this.addExperience(0, 5);
    } else {
      this.addExperience(0, 2);
    }

    // 레즈/호모 경험
    const playerVirgin = this.ctx.getTalent?.(122) === 0;
    const charVirgin = this.hasTalent(122);

    if (!charVirgin && !playerVirgin) {
      this.addExperience(40, 3);
    } else if (charVirgin && playerVirgin) {
      this.addExperience(41, 3);
    }

    // 애정 경험
    if (this.character.flags[2] >= 1000 && !this.isAssiPlay()) {
      this.addExperience(23, 3);
    }
  }
}

export async function com20(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  const command = new Com20Command(ctx, character);

  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }

  await command.execute();
}

/**
 * COM21: 후배위
 * 페니스를 바기나에 삽입 (노출↑ 애정↓)
 */
export class Com21Command extends TrainingCommand {
  getName(): string {
    return '후배위';
  }

  getDescription(): string {
    return '후배위 체위로 성교합니다';
  }

  isAvailable(): boolean {
    // 하반신 노출 필수
    if (!this.bottomNaked()) {
      return false;
    }

    // 의식 필수
    if (this.character.flags[16] === -1) {
      return false;
    }

    // 정조대 착용 시 불가
    if (this.character.flags[42] === 79) {
      return false;
    }

    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();

    // SOURCE 계산
    const source = this.calculateSource();

    // Character source에 적용
    this.character.source[1] = source.pleasureV || 0;   // 쾌V
    this.character.source[3] = source.lubrication || 0; // 윤활
    this.character.source[6] = source.pain || 0;        // 고통
    this.character.source[12] = 800;  // 후배위는 노출이 높음
    this.character.source[15] = source.depression || 0; // 반감

    // 메시지 표시
    await this.showTrainMessage();

    // 경험치 획득
    this.gainExperience();

    // BASE 업데이트
    const vSense = this.getAbility(2);
    const baseC = Math.max(10, 50 - vSense * 3);
    const baseV = Math.max(10, 100 - vSense * 2);

    this.ctx.base[0] += baseC;  // C감각 (V감각에 따라 감소)
    this.ctx.base[1] += baseV;  // 욕망
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};

    // 쾌V 계산 (V감각 기반)
    const vValues = [40, 150, 400, 1000, 1700, 2200];
    source.pleasureV = this.calculateAbilitySource(2, vValues);

    // 윤활 계산 (V감각 기반)
    const lubValues = [50, 150, 250, 350, 600, 850];
    source.lubrication = this.calculateAbilitySource(2, lubValues);

    // V경험에 따른 수정
    const vExp = this.ctx.exp[0] || 0;
    const vExpLevels = [100, 300, 700, 1500, 3000];

    if (vExp < vExpLevels[0]) {
      source.pleasureV! *= 0.2;
      source.pain = 5000;
    } else if (vExp < vExpLevels[1]) {
      source.pleasureV! *= 0.6;
      source.pain = 220;
    } else if (vExp < vExpLevels[2]) {
      source.pleasureV! *= 1.0;
      source.pain = 30;
    } else if (vExp < vExpLevels[3]) {
      source.pleasureV! *= 1.2;
      source.pain = 5;
    } else if (vExp < vExpLevels[4]) {
      source.pleasureV! *= 1.3;
      source.pain = 0;
    } else {
      source.pleasureV! *= 1.8;
      source.pain = 0;
    }

    // 윤활에 따른 수정
    const lubrication = this.ctx.params[3] || 0;
    const lubLevels = [200, 500, 1000, 1500];

    if (lubrication < lubLevels[0]) {
      source.pleasureV! *= 0.1;
      source.pain! += 900;
      source.pain! *= 3.0;
    } else if (lubrication < lubLevels[1]) {
      source.pleasureV! *= 0.4;
      source.pain! += 250;
      source.pain! *= 1.0;
    } else if (lubrication < lubLevels[2]) {
      source.pleasureV! *= 1.0;
      source.pain! *= 0.5;
    } else if (lubrication < lubLevels[3]) {
      source.pleasureV! *= 1.4;
      source.pain! *= 0.2;
    } else {
      source.pleasureV! *= 1.8;
      source.pain! *= 0.1;
    }

    // 정조관념
    if (this.hasTalent(30)) {
      if (vExp === 0) {
        source.lubrication! *= 0.6;
        source.depression = 10000;
      } else {
        source.lubrication! *= 0.6;
        source.depression = 1000;
      }
    } else if (this.hasTalent(31)) {
      // 정조무관심
      if (vExp === 0) {
        source.lubrication! *= 0.6;
        source.depression = 300;
      }
    } else {
      if (vExp === 0) {
        source.depression = 3000;
      }
    }

    // 욕정에 따른 수정
    const lust = this.ctx.params[5] || 0;
    const lustLevels = [200, 500, 1000, 1500];

    if (lust < lustLevels[0]) {
      source.pleasureV! *= 0.6;
      source.lubrication! *= 0.3;
    } else if (lust < lustLevels[1]) {
      source.pleasureV! *= 0.8;
      source.lubrication! *= 0.6;
    } else if (lust < lustLevels[2]) {
      source.pleasureV! *= 1.0;
      source.lubrication! *= 1.0;
    } else if (lust < lustLevels[3]) {
      source.pleasureV! *= 1.2;
      source.lubrication! *= 1.5;
    } else {
      source.pleasureV! *= 1.5;
      source.lubrication! *= 1.8;
    }

    // 종순에 따른 수정
    const obedience = this.getAbility(10);
    const obedienceVMultipliers = [0.5, 0.8, 1.0, 1.3, 1.6, 2.0];
    const obedienceLubMultipliers = [0.6, 0.8, 1.0, 1.2, 1.4, 1.6];
    const obedienceDepMultipliers = [2.0, 1.5, 1.0, 0.8, 0.6, 0.3];

    source.pleasureV! *= obedienceVMultipliers[Math.min(obedience, 5)];
    source.lubrication! *= obedienceLubMultipliers[Math.min(obedience, 5)];
    if (source.depression) {
      source.depression *= obedienceDepMultipliers[Math.min(obedience, 5)];
    }

    // 소질 기반 수정
    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);

    // 큰 체구
    if (this.hasTalent(99)) {
      source.pain! *= 1.8;
    }

    // 작은 체형
    if (this.hasTalent(100)) {
      source.pain! *= 2.0;
    }

    return source;
  }

  private async showTrainMessage(): Promise<void> {
    const vSense = this.getAbility(2);
    const vExp = this.ctx.exp[0] || 0;

    this.message('후배위 체위로 뒤에서 삽입한다...');

    if (vExp === 0) {
      this.message('"이, 이렇게...부끄러워...!!"');
    } else if (vSense === 0) {
      this.message('"으음...뒤에서...가득..."');
    } else if (vSense <= 2) {
      this.message('"아...깊숙이...느껴져..."');
    } else if (vSense <= 4) {
      this.message('"으아앗...! 안쪽까지...꽉...!!"');
    } else {
      this.message('"안돼...이 체위...너무 깊어...!!"');
    }

    // 반응 메시지
    if (this.character.source[1] >= 1500) {
      this.message('깊은 삽입에 질 내부가 격렬하게 조인다...');
    }
  }

  private gainExperience(): void {
    // V경험
    const vExp = this.ctx.exp[0] || 0;
    if (vExp === 0) {
      this.addExperience(0, 5);
    } else {
      this.addExperience(0, 2);
    }

    // 레즈/호모 경험
    const playerVirgin = this.ctx.getTalent?.(122) === 0;
    const charVirgin = this.hasTalent(122);

    if (!charVirgin && !playerVirgin) {
      this.addExperience(40, 3);
    } else if (charVirgin && playerVirgin) {
      this.addExperience(41, 3);
    }

    // 애정 경험
    if (this.character.flags[2] >= 1000 && !this.isAssiPlay()) {
      this.addExperience(23, 2);
    }
  }
}

export async function com21(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  const command = new Com21Command(ctx, character);

  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }

  await command.execute();
}

/**
 * COM22: 대면좌위
 * 페니스를 바기나에 삽입 (쾌C↓ 노출↓ 중독↑)
 */
export class Com22Command extends TrainingCommand {
  getName(): string {
    return '대면좌위';
  }

  getDescription(): string {
    return '대면좌위 체위로 성교합니다';
  }

  isAvailable(): boolean {
    // 하반신 노출 필수
    if (!this.bottomNaked()) {
      return false;
    }

    // 의식 필수
    if (this.character.flags[16] === -1) {
      return false;
    }

    // 정조대 착용 시 불가
    if (this.character.flags[42] === 79) {
      return false;
    }

    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();

    // SOURCE 계산
    const source = this.calculateSource();

    // Character source에 적용
    this.character.source[0] = source.pleasureC || 0;   // 쾌C (기교에 따라)
    this.character.source[1] = source.pleasureV || 0;   // 쾌V
    this.character.source[3] = source.lubrication || 0; // 윤활
    this.character.source[4] = source.submission || 0;  // 굴복
    this.character.source[5] = source.lust || 0;        // 욕정
    this.character.source[6] = source.pain || 0;        // 고통
    this.character.source[7] = 100;  // 노출
    this.character.source[10] = source.antipathy || 0;  // 반감
    this.character.source[12] = 100;
    this.character.source[15] = source.depression || 0; // 반감
    this.character.source[16] = source.love || 0;       // 애정

    // 메시지 표시
    await this.showTrainMessage();

    // 경험치 획득
    this.gainExperience();

    // BASE 업데이트
    const vSense = this.getAbility(2);
    const baseC = Math.max(10, 10 - vSense * 3);
    const baseV = Math.max(10, 80 - vSense * 2);

    this.ctx.base[0] += baseC;  // C감각 (V감각에 따라 감소)
    this.ctx.base[1] += baseV;  // 욕망
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};

    // 쾌V 계산 (V감각 기반)
    const vValues = [40, 150, 300, 700, 1100, 1500];
    source.pleasureV = this.calculateAbilitySource(2, vValues);

    // 윤활 계산 (V감각 기반)
    const lubValues = [150, 250, 350, 500, 700, 1000];
    source.lubrication = this.calculateAbilitySource(2, lubValues);

    // 봉사정신에 따른 값
    const serviceSpirit = this.getAbility(16);
    const submissionValues = [50, 150, 300, 400, 500, 800];
    const lustValues = [10, 50, 100, 200, 300, 500];
    const loveValues = [100, 300, 700, 1200, 1800, 2500];

    source.submission = submissionValues[Math.min(serviceSpirit, 5)];
    source.lust = lustValues[Math.min(serviceSpirit, 5)];
    source.love = loveValues[Math.min(serviceSpirit, 5)];

    // V경험에 따른 수정
    const vExp = this.ctx.exp[0] || 0;
    const vExpLevels = [100, 300, 700, 1500, 3000];

    if (vExp < vExpLevels[0]) {
      source.pleasureV! *= 0.2;
      source.pain = 3500;
    } else if (vExp < vExpLevels[1]) {
      source.pleasureV! *= 0.6;
      source.pain = 250;
    } else if (vExp < vExpLevels[2]) {
      source.pleasureV! *= 1.0;
      source.pain = 50;
    } else if (vExp < vExpLevels[3]) {
      source.pleasureV! *= 1.1;
      source.pain = 10;
    } else if (vExp < vExpLevels[4]) {
      source.pleasureV! *= 1.2;
      source.pain = 0;
    } else {
      source.pleasureV! *= 1.3;
      source.pain = 0;
    }

    // 윤활에 따른 수정
    const lubrication = this.ctx.params[3] || 0;
    const lubLevels = [200, 500, 1000, 1500];

    if (lubrication < lubLevels[0]) {
      source.pleasureV! *= 0.5;
      source.pain! += 1000;
      source.pain! *= 2.5;
    } else if (lubrication < lubLevels[1]) {
      source.pleasureV! *= 0.8;
      source.pain! += 300;
      source.pain! *= 1.0;
    } else if (lubrication < lubLevels[2]) {
      source.pleasureV! *= 1.0;
      source.pain! *= 0.5;
    } else if (lubrication < lubLevels[3]) {
      source.pleasureV! *= 1.2;
      source.pain! *= 0.2;
    } else {
      source.pleasureV! *= 1.5;
      source.pain! *= 0.1;
    }

    // 정조관념
    if (this.hasTalent(30)) {
      if (vExp === 0) {
        source.lubrication! *= 0.6;
        source.depression = 10000;
      } else {
        source.lubrication! *= 0.6;
        source.depression = 1000;
      }
    } else if (this.hasTalent(31)) {
      // 정조무관심
      if (vExp === 0) {
        source.lubrication! *= 0.6;
        source.depression = 300;
      }
    } else {
      if (vExp === 0) {
        source.depression = 3000;
      }
    }

    // 욕정에 따른 수정
    const lust = this.ctx.params[5] || 0;
    const lustLevels = [200, 500, 1000, 1500];

    if (lust < lustLevels[0]) {
      source.pleasureV! *= 0.8;
      source.lubrication! *= 0.8;
    } else if (lust < lustLevels[1]) {
      source.pleasureV! *= 1.0;
      source.lubrication! *= 1.2;
    } else if (lust < lustLevels[2]) {
      source.pleasureV! *= 1.2;
      source.lubrication! *= 1.8;
    } else if (lust < lustLevels[3]) {
      source.pleasureV! *= 1.4;
      source.lubrication! *= 2.4;
    } else {
      source.pleasureV! *= 1.6;
      source.lubrication! *= 3.0;
    }

    // 종순에 따른 수정
    const obedience = this.getAbility(10);
    const obedienceVMultipliers = [0.8, 1.1, 1.5, 1.8, 2.4, 3.0];
    const obedienceLubMultipliers = [0.9, 1.2, 1.6, 1.9, 2.6, 3.6];
    const obedienceDepMultipliers = [2.0, 1.6, 1.2, 1.0, 1.0, 1.0];

    source.pleasureV! *= obedienceVMultipliers[Math.min(obedience, 5)];
    source.lubrication! *= obedienceLubMultipliers[Math.min(obedience, 5)];
    if (source.depression) {
      source.depression *= obedienceDepMultipliers[Math.min(obedience, 5)];
    }

    // 플레이어 기교에 따른 C쾌감 및 애정 추가
    const playerSkill = this.ctx.assiAbilities[12] || 0;
    const cPleasureValues = [0, 0, 0, 50, 100, 300];
    const antiValues = [0, 50, 100, 150, 250, 400];

    source.pleasureC = cPleasureValues[Math.min(playerSkill, 5)];
    source.antipathy = antiValues[Math.min(playerSkill, 5)];

    // V경험 3 이상이면 C쾌감도 V쾌감에 추가
    if (vExp >= 700) {
      source.pleasureV! += source.pleasureC!;
    }

    source.lubrication! += cPleasureValues[Math.min(playerSkill, 5)] + 100;

    // 소질 기반 수정
    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);

    // 큰 체구
    if (this.hasTalent(99)) {
      source.pain! *= 0.8;
    }

    // 작은 체형
    if (this.hasTalent(100)) {
      source.pain! *= 2.0;
    }

    // 미숙함
    if (this.hasTalent(135)) {
      source.pain! *= 4.0;
    }

    // 애정 소질
    if (this.hasTalent(85)) {
      source.lubrication! *= 3.0;
      source.love! *= 2.0;
    }

    return source;
  }

  private async showTrainMessage(): Promise<void> {
    const vSense = this.getAbility(2);
    const vExp = this.ctx.exp[0] || 0;
    const serviceSpirit = this.getAbility(16);

    this.message('대면좌위로 서로를 마주보며 결합한다...');

    if (vExp === 0) {
      this.message('"아...처음인데...이렇게..."');
    } else if (serviceSpirit >= 4) {
      this.message('"당신을...기쁘게 해드리고 싶어..."');
    } else if (vSense === 0) {
      this.message('"으음...얼굴을 보면서..."');
    } else if (vSense <= 2) {
      this.message('"아...깊이...느껴져..."');
    } else if (vSense <= 4) {
      this.message('"으아앗...! 안쪽까지...가득...!!"');
    } else {
      this.message('"안돼...이렇게 밀착되면...너무...!!"');
    }

    // 반응 메시지
    if (this.character.source[16] >= 1500) {
      this.message('서로를 바라보며 깊은 애정을 느끼고 있다...');
    } else if (this.character.source[1] >= 1000) {
      this.message('적극적으로 허리를 움직이며 쾌감을 추구한다...');
    }
  }

  private gainExperience(): void {
    // V경험
    const vExp = this.ctx.exp[0] || 0;
    if (vExp === 0) {
      this.addExperience(0, 5);
    } else {
      this.addExperience(0, 2);
    }

    // 레즈/호모 경험
    const playerVirgin = this.ctx.getTalent?.(122) === 0;
    const charVirgin = this.hasTalent(122);

    if (!charVirgin && !playerVirgin) {
      this.addExperience(40, 3);
    } else if (charVirgin && playerVirgin) {
      this.addExperience(41, 3);
    }

    // 애정 경험 (대면좌위는 애정 경험 높음)
    if (this.character.flags[2] >= 1000 && !this.isAssiPlay()) {
      this.addExperience(23, 5);
    } else {
      this.addExperience(23, 3);
    }
  }
}

export async function com22(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  const command = new Com22Command(ctx, character);

  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }

  await command.execute();
}

/**
 * COM23: 배면좌위
 * 페니스를 바기나에 삽입 (노출↓ 애정↓ 체력소모↓)
 */
export class Com23Command extends TrainingCommand {
  getName(): string {
    return '배면좌위';
  }

  getDescription(): string {
    return '배면좌위 체위로 성교합니다';
  }

  isAvailable(): boolean {
    // 하반신 노출 필수
    if (!this.bottomNaked()) {
      return false;
    }

    // 의식 필수
    if (this.character.flags[16] === -1) {
      return false;
    }

    // 정조대 착용 시 불가
    if (this.character.flags[42] === 79) {
      return false;
    }

    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();

    // SOURCE 계산
    const source = this.calculateSource();

    // Character source에 적용
    this.character.source[0] = source.pleasureC || 0;   // 쾌C
    this.character.source[1] = source.pleasureV || 0;   // 쾌V
    this.character.source[17] = source.pleasureB || 0;  // 쾌B
    this.character.source[3] = source.lubrication || 0; // 윤활
    this.character.source[6] = source.pain || 0;        // 고통
    this.character.source[10] = source.affection || 0;  // 애정
    this.character.source[12] = 200;
    this.character.source[15] = source.depression || 0; // 반감

    // 메시지 표시
    await this.showTrainMessage();

    // 경험치 획득
    this.gainExperience();

    // BASE 업데이트
    const vSense = this.getAbility(2);
    const baseC = Math.max(10, 20 - vSense * 3);
    const baseV = Math.max(10, 150 - vSense * 2);

    this.ctx.base[0] += baseC;
    this.ctx.base[1] += baseV;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};

    // 쾌V 계산 (V감각 기반)
    const vValues = [50, 150, 300, 600, 1000, 1500];
    source.pleasureV = this.calculateAbilitySource(2, vValues);

    // 윤활 계산
    const lubValues = [50, 100, 200, 300, 500, 700];
    source.lubrication = this.calculateAbilitySource(2, lubValues);

    // 쾌B 계산 (B감각 기반)
    const bValues = [50, 200, 500, 800, 1300, 1800];
    source.pleasureB = this.calculateAbilitySource(1, bValues);

    // B감각에 의한 윤활 추가
    const bLubValues = [50, 200, 400, 600, 1000, 1400];
    source.lubrication! += this.calculateAbilitySource(1, bLubValues);

    // 쾌C 계산 (C감각 기반)
    const cValues = [40, 160, 500, 900, 1400, 2100];
    source.pleasureC = this.calculateAbilitySource(0, cValues);

    // V경험에 따른 수정
    const vExp = this.ctx.exp[0] || 0;
    const expLevels = [100, 300, 700, 1500, 3000];

    if (vExp < expLevels[0]) {
      source.pleasureV! *= 0.2;
      source.pain = 3000;
    } else if (vExp < expLevels[1]) {
      source.pleasureV! *= 0.6;
      source.pain = 240;
    } else if (vExp < expLevels[2]) {
      source.pleasureV! *= 1.0;
      source.pain = 30;
    } else if (vExp < expLevels[3]) {
      source.pleasureV! *= 1.2;
      source.pain = 5;
    } else if (vExp < expLevels[4]) {
      source.pleasureV! *= 1.4;
      source.pain = 0;
    } else {
      source.pleasureV! *= 1.6;
      source.pain = 0;
    }

    // 윤활에 따른 수정
    const lubrication = this.ctx.params[3] || 0;
    const lubLevels = [200, 500, 1000, 1500];

    if (lubrication < lubLevels[0]) {
      source.pleasureV! *= 0.4;
      source.pain! += 600;
      source.pain! *= 2.6;
    } else if (lubrication < lubLevels[1]) {
      source.pleasureV! *= 0.7;
      source.pain! += 180;
    } else if (lubrication < lubLevels[2]) {
      source.pleasureV! *= 1.0;
      source.pain! *= 0.5;
    } else if (lubrication < lubLevels[3]) {
      source.pleasureV! *= 1.2;
      source.pain! *= 0.2;
    } else {
      source.pleasureV! *= 1.6;
      source.pain! *= 0.1;
    }

    // 정조관념
    if (this.hasTalent(30)) {
      if (vExp === 0) {
        source.lubrication! *= 0.6;
        source.depression = 10000;
      } else {
        source.lubrication! *= 0.6;
        source.depression = 1000;
      }
    } else if (this.hasTalent(31)) {
      if (vExp === 0) {
        source.lubrication! *= 0.6;
        source.depression = 300;
      }
    } else {
      if (vExp === 0) {
        source.depression = 3000;
      }
    }

    // 욕정에 따른 수정
    const lust = this.ctx.params[5] || 0;
    const lustLevels = [200, 500, 1000, 1500];

    if (lust < lustLevels[0]) {
      source.pleasureV! *= 0.8;
      source.pleasureC! *= 0.8;
      source.lubrication! *= 0.6;
    } else if (lust < lustLevels[1]) {
      source.pleasureV! *= 1.0;
      source.pleasureC! *= 1.0;
      source.lubrication! *= 1.0;
    } else if (lust < lustLevels[2]) {
      source.pleasureV! *= 1.2;
      source.pleasureC! *= 1.1;
      source.lubrication! *= 1.5;
    } else if (lust < lustLevels[3]) {
      source.pleasureV! *= 1.4;
      source.pleasureC! *= 1.2;
      source.lubrication! *= 2.0;
    } else {
      source.pleasureV! *= 1.6;
      source.pleasureC! *= 1.3;
      source.lubrication! *= 2.6;
    }

    // 종순에 따른 수정
    const obedience = this.getAbility(10);
    const obedienceVMultipliers = [1.5, 1.5, 1.5, 1.8, 2.1, 2.5];
    const obedienceLubMultipliers = [1.0, 1.3, 1.5, 1.9, 2.2, 2.6];
    const obedienceDepMultipliers = [2.0, 1.8, 1.6, 1.4, 1.2, 1.0];

    source.pleasureV! *= obedienceVMultipliers[Math.min(obedience, 5)];
    source.lubrication! *= obedienceLubMultipliers[Math.min(obedience, 5)];
    if (source.depression) {
      source.depression *= obedienceDepMultipliers[Math.min(obedience, 5)];
    }

    // 플레이어 기교에 따른 윤활 및 애정
    const playerSkill = this.ctx.getAbility?.(12) || 0;
    const skillLubValues = [100, 150, 200, 300, 500, 800];
    const skillAffValues = [0, 50, 100, 150, 250, 400];

    source.lubrication! += skillLubValues[Math.min(playerSkill, 5)];
    source.affection = skillAffValues[Math.min(playerSkill, 5)];

    // 소질 기반 수정
    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);

    // 체구 소질
    if (this.hasTalent(99)) {
      source.pain! *= 0.8;
    }

    if (this.hasTalent(100)) {
      source.pain! *= 2.0;
    }

    if (this.hasTalent(135)) {
      source.pain! *= 4.0;
    }

    // 애 소질
    if (this.hasTalent(85)) {
      source.lubrication! *= 2.0;
    }

    return source;
  }

  private async showTrainMessage(): Promise<void> {
    const vSense = this.getAbility(2);
    const vExp = this.ctx.exp[0] || 0;

    this.message('배면좌위 체위로 천천히 삽입한다...');

    if (vExp === 0) {
      this.message('"으윽...! 아파...!!"');
      this.message('처음의 고통에 몸을 떤다...');
    } else if (vSense === 0) {
      this.message('"으음...꽉 차는 느낌..."');
    } else if (vSense <= 2) {
      this.message('"아...안이...느껴져..."');
    } else if (vSense <= 4) {
      this.message('"으아앗...! 안쪽까지...!!"');
    } else {
      this.message('"안돼...너무 깊이...느껴져...!!"');
    }
  }

  private gainExperience(): void {
    // V경험
    const vExp = this.ctx.exp[0] || 0;
    if (vExp === 0) {
      this.addExperience(0, 5);
    } else {
      this.addExperience(0, 2);
    }

    // 레즈/호모 경험
    const playerVirgin = this.ctx.getTalent?.(122) === 0;
    const charVirgin = this.hasTalent(122);

    if (!charVirgin && !playerVirgin) {
      this.addExperience(40, 3);
    } else if (charVirgin && playerVirgin) {
      this.addExperience(41, 3);
    }

    // 애정 경험
    if (this.character.flags[2] >= 1000 && !this.isAssiPlay()) {
      this.addExperience(23, 2);
    }
  }
}

export async function com23(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  const command = new Com23Command(ctx, character);

  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }

  await command.execute();
}

/**
 * COM24: 역강간
 * 대상의 페니스를 조교자 바기나에 삽입
 */
export class Com24Command extends TrainingCommand {
  getName(): string {
    return '역강간';
  }

  getDescription(): string {
    return '대상이 플레이어의 질에 삽입합니다';
  }

  isAvailable(): boolean {
    // 대상이 페니스를 가지고 있어야 함
    if (!this.hasTalent(121) && !this.hasTalent(122)) {
      return false;
    }

    // 플레이어가 여성이어야 함 (또는 후타나리)
    if (this.ctx.getTalent?.(119)) { // 플레이어가 무성
      return false;
    }

    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();

    const source = this.calculateSource();

    this.character.source[0] = source.pleasureC || 0;
    this.character.source[3] = 550;
    this.character.source[4] = source.submission || 0;
    this.character.source[12] = 1200;
    this.character.source[13] = 1000;
    this.character.source[14] = 800;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[0] += 40;
    this.ctx.base[1] += 75;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};

    // C감각 기반
    const cValues = [800, 1400, 2000, 2500, 2900, 3200];
    source.pleasureC = this.calculateAbilitySource(0, cValues);

    // 플레이어 기교에 따른 수정
    const playerSkill = this.ctx.getAbility?.(12) || 0;
    const skillMultipliers = [0.5, 0.8, 1.0, 1.5, 2.5, 3.0];
    const subValues = [1600, 1900, 2300, 2700, 3100, 3500];

    source.pleasureC! *= skillMultipliers[Math.min(playerSkill, 5)];
    source.submission = subValues[Math.min(playerSkill, 5)];

    // 플레이어 V감각에 따른 수정
    const playerVSense = this.ctx.getAbility?.(4) || 0;
    const vMultipliers = [0.5, 0.8, 1.0, 1.2, 1.5, 2.0];
    source.pleasureC! *= vMultipliers[Math.min(playerVSense, 5)];

    // 대상이 남성이 아닌 경우
    if (!this.hasTalent(122)) {
      source.fear = 1200;
    }

    // 플레이어가 처녀인 경우
    if (this.ctx.getTalent?.(0)) {
      source.antipathy = (source.antipathy || 0) * 20;
      source.fear = (source.fear || 800) * 3;
    }

    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('플레이어의 몸 위에 올라탄다...');

    const cSense = this.getAbility(0);

    if (cSense === 0) {
      this.message('"...조이는 느낌이..."');
    } else if (cSense <= 2) {
      this.message('"...기분 좋아..."');
    } else if (cSense <= 4) {
      this.message('"으...질 안이...느껴져...!!"');
    } else {
      this.message('"너무...조여와...!!"');
    }
  }

  private gainExperience(): void {
    // 레즈/호모 경험
    const playerVirgin = this.ctx.getTalent?.(122) === 0;
    const charVirgin = this.hasTalent(122);

    if (!charVirgin && !playerVirgin) {
      this.addExperience(40, 4);
    } else if (charVirgin && playerVirgin) {
      this.addExperience(41, 4);
    }

    // 성교 경험
    this.addExperience(5, 1);

    // 애정 경험
    if (this.character.flags[2] >= 1000 && !this.isAssiPlay()) {
      const affAmount = this.hasTalent(1) ? 50 : 4;
      this.addExperience(23, affAmount);
    }
  }
}

export async function com24(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  const command = new Com24Command(ctx, character);

  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }

  await command.execute();
}

/**
 * COM25: 역애널강간
 * 대상의 페니스를 조교자 애널에 삽입
 */
export class Com25Command extends TrainingCommand {
  getName(): string {
    return '역애널강간';
  }

  getDescription(): string {
    return '대면좌위 체위로 삽입합니다';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    if (!this.bottomNaked()) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[0] = source.pleasureC || 0;
    this.character.source[1] = source.pleasureV || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[0] += 10;
    this.ctx.base[1] += 50;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pleasureC = 200;
    source.pleasureV = 800;
    source.submission = 100;
    source.lust = 100;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('대면좌위로 천천히 삽입한다...');
  }

  private gainExperience(): void {
    this.addExperience(14, 2);
  }
}

export async function com25(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com25Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}

/**
 * COM26: 정상위애널
 * 페니스를 애널에 삽입 (애정↓ 굴종↑)
 */
export class Com26Command extends TrainingCommand {
  getName(): string {
    return '정상위애널';
  }

  getDescription(): string {
    return '배면좌위 체위로 삽입합니다';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    if (!this.bottomNaked()) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[0] = source.pleasureC || 0;
    this.character.source[1] = source.pleasureV || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[0] += 10;
    this.ctx.base[1] += 50;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pleasureC = 150;
    source.pleasureV = 850;
    source.submission = 120;
    source.lust = 100;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('배면좌위로 깊숙이 삽입한다...');
  }

  private gainExperience(): void {
    this.addExperience(14, 2);
  }
}

export async function com26(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com26Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}

/**
 * COM27: 후배위애널
 * 페니스를 애널에 삽입 (기력소비↑ 일탈↑ 굴종↑)
 */
export class Com27Command extends TrainingCommand {
  getName(): string {
    return '후배위애널';
  }

  getDescription(): string {
    return '항문에 삽입합니다';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    if (!this.bottomNaked()) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[2] = source.pleasureA || 0;
    this.character.source[6] = source.pain || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[2] += 20;
    this.ctx.base[1] += 30;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pleasureA = 600;
    source.pain = 150;
    source.submission = 150;
    source.lust = 80;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('항문에 천천히 삽입한다...');
  }

  private gainExperience(): void {
    this.addExperience(14, 2);
    this.addExperience(15, 1); // 애널 경험치
  }
}

export async function com27(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com27Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}

/**
 * COM28: 대면좌위애널
 * 페니스를 애널에 삽입
 */
export class Com28Command extends TrainingCommand {
  getName(): string {
    return '대면좌위애널';
  }

  getDescription(): string {
    return '질과 항문에 동시에 삽입합니다';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    if (!this.bottomNaked()) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[1] = source.pleasureV || 0;
    this.character.source[2] = source.pleasureA || 0;
    this.character.source[6] = source.pain || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[1] += 30;
    this.ctx.base[2] += 30;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pleasureV = 900;
    source.pleasureA = 700;
    source.pain = 200;
    source.submission = 200;
    source.lust = 150;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('양쪽 구멍에 동시에 삽입한다...');
  }

  private gainExperience(): void {
    this.addExperience(14, 3);
    this.addExperience(15, 2);
  }
}

export async function com28(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com28Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}

/**
 * COM29: 배면좌위애널
 * 페니스를 애널에 삽입
 */
export class Com29Command extends TrainingCommand {
  getName(): string {
    return '배면좌위애널';
  }

  getDescription(): string {
    return '입, 질, 항문에 동시에 삽입합니다';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    if (!this.bottomNaked()) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[1] = source.pleasureV || 0;
    this.character.source[2] = source.pleasureA || 0;
    this.character.source[18] = source.pleasureM || 0;
    this.character.source[6] = source.pain || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[1] += 40;
    this.ctx.base[2] += 40;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pleasureV = 1000;
    source.pleasureA = 800;
    source.pleasureM = 500;
    source.pain = 250;
    source.submission = 300;
    source.lust = 200;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('세 구멍 모두에 동시에 삽입한다...');
  }

  private gainExperience(): void {
    this.addExperience(14, 4);
    this.addExperience(15, 3);
  }
}

export async function com29(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com29Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}

/**
 * COM30: 장갑훑기
 * 대상이 조교자 페니스를 손으로 자극
 */
export class Com30Command extends TrainingCommand {
  getName(): string {
    return '장갑훑기';
  }

  getDescription(): string {
    return '손으로 남성기를 자극합니다';
  }

  isAvailable(): boolean {
    // 의식 필수
    if (this.character.flags[16] === -1) {
      return false;
    }

    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();

    // SOURCE 계산
    const source = this.calculateSource();

    // Character source에 적용
    this.character.source[4] = source.submission || 0;  // 굴복
    this.character.source[5] = source.lust || 0;       // 욕정
    this.character.source[12] = 100;

    // 메시지 표시
    await this.showTrainMessage();

    // 경험치 획득
    this.gainExperience();

    // BASE 업데이트
    this.ctx.base[1] += 40;  // 욕망
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};

    // 기본 굴복, 욕정
    source.submission = 100;
    source.lust = 80;

    // 봉사정신에 따른 보정
    const serviceLevel = this.getAbility(16);
    if (serviceLevel > 0) {
      source.submission += serviceLevel * 20;
      source.lust += serviceLevel * 10;
    }

    // 욕망 레벨
    const desireLevel = this.getAbility(11);
    if (desireLevel > 0) {
      source.lust += desireLevel * 5;
    }

    // 소질 기반 수정
    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);

    // 봉사정신 소질
    if (this.hasTalent(73)) {
      source.submission! *= 1.3;
    }

    return source;
  }

  private async showTrainMessage(): Promise<void> {
    const serviceLevel = this.getAbility(16);

    if (serviceLevel === 0) {
      this.message('"이...이렇게...?"');
      this.message('서투르게 손을 움직인다...');
    } else if (serviceLevel <= 2) {
      this.message('조심스럽게 손으로 자극한다.');
    } else if (serviceLevel <= 4) {
      this.message('능숙한 손놀림으로 자극한다!');
    } else {
      this.message('완벽한 테크닉으로 쾌감을 이끌어낸다!!');
    }
  }

  private gainExperience(): void {
    // 수음 경험치
    this.addExperience(44, 5);

    // 봉사 경험치
    this.addExperience(16, 3);

    // 순결 경험치
    const playerVirgin = this.ctx.getTalent?.(122) === 0;
    const charVirgin = this.hasTalent(122);

    if (!charVirgin && !playerVirgin) {
      this.addExperience(40, 5);
    } else if (charVirgin && playerVirgin) {
      this.addExperience(41, 5);
    }
  }
}

export async function com30(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  const command = new Com30Command(ctx, character);

  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }

  await command.execute();
}

/**
 * COM31: 펠라치오
 * 대상이 조교자 페니스를 입으로 자극
 */
export class Com31Command extends TrainingCommand {
  getName(): string {
    return '펠라치오';
  }

  getDescription(): string {
    return '입으로 남성기를 자극합니다';
  }

  isAvailable(): boolean {
    // 의식 필수
    if (this.character.flags[16] === -1) {
      return false;
    }

    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();

    // SOURCE 계산
    const source = this.calculateSource();

    // Character source에 적용
    this.character.source[4] = source.submission || 0;
    this.character.source[5] = source.lust || 0;
    this.character.source[12] = 100;

    // 메시지 표시
    await this.showTrainMessage();

    // 경험치 획득
    this.gainExperience();

    // BASE 업데이트
    this.ctx.base[1] += 60;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};

    source.submission = 150;
    source.lust = 100;

    const serviceLevel = this.getAbility(16);
    if (serviceLevel > 0) {
      source.submission += serviceLevel * 25;
      source.lust += serviceLevel * 15;
    }

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);

    if (this.hasTalent(73)) {
      source.submission! *= 1.4;
    }

    if (this.hasTalent(78)) { // 펠라테크
      source.lust! *= 1.5;
    }

    return source;
  }

  private async showTrainMessage(): Promise<void> {
    const serviceLevel = this.getAbility(16);

    if (serviceLevel <= 1) {
      this.message('"으음...음..."');
      this.message('서투르게 입으로 받아들인다...');
    } else if (serviceLevel <= 3) {
      this.message('입술과 혀를 사용해 자극한다.');
    } else {
      this.message('숙련된 테크닉으로 완벽하게 봉사한다!!');
    }

    if (this.hasTalent(78)) {
      this.message('놀라운 혀놀림을 선보인다!');
    }
  }

  private gainExperience(): void {
    this.addExperience(45, 5);
    this.addExperience(16, 3);

    const playerVirgin = this.ctx.getTalent?.(122) === 0;
    const charVirgin = this.hasTalent(122);

    if (!charVirgin && !playerVirgin) {
      this.addExperience(40, 5);
    } else if (charVirgin && playerVirgin) {
      this.addExperience(41, 5);
    }
  }
}

export async function com31(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  const command = new Com31Command(ctx, character);

  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }

  await command.execute();
}

/**
 * COM32: 파이즈리
 * 대상이 조교자 페니스를 유방으로 자극
 */
export class Com32Command extends TrainingCommand {
  getName(): string {
    return '파이즈리';
  }

  getDescription(): string {
    return '가슴으로 봉사합니다';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    if (!this.topNaked()) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[17] = source.pleasureB || 0;
    this.character.source[4] = source.submission || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[1] += 20;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pleasureB = 300;
    source.submission = 80;
    source.lust = 60;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('가슴으로 부드럽게 감싼다...');
  }

  private gainExperience(): void {
    this.addExperience(16, 2);
  }
}

export async function com32(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com32Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}

/**
 * COM33: 스마타
 * 대상이 조교자 페니스를 클리토리스로 자극
 */
export class Com33Command extends TrainingCommand {
  getName(): string {
    return '스마타';
  }

  getDescription(): string {
    return '발로 봉사합니다';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[4] = source.submission || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[1] += 15;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.submission = 100;
    source.lust = 50;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('발로 능숙하게 자극한다...');
  }

  private gainExperience(): void {
    this.addExperience(16, 1);
  }
}

export async function com33(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com33Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}

/**
 * COM34: 기승위
 * 대상이 조교자 페니스를 바기나로 자극
 */
export class Com34Command extends TrainingCommand {
  getName(): string {
    return '기승위';
  }

  getDescription(): string {
    return '소변을 마시게 합니다';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[4] = source.submission || 0;
    this.character.source[5] = source.shame || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[4] += 30;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.submission = 150;
    source.shame = 200;
    source.lust = 40;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('소변을 마시게 한다...');
  }

  private gainExperience(): void {
    this.addExperience(17, 3);
  }
}

export async function com34(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com34Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}

/**
 * COM35: 거품춤
 * 대상이 조교자 페니스를 클리토리스와 바기나로 자극 (굴종↑ 일탈↑)
 */
export class Com35Command extends TrainingCommand {
  getName(): string {
    return '거품춤';
  }

  getDescription(): string {
    return '모유를 마십니다';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    if (!this.topNaked()) return false;
    if (!this.hasTalent(108)) return false; // 모유체질 필요
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[17] = source.pleasureB || 0;
    this.character.source[7] = source.affection || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[1] += 25;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pleasureB = 400;
    source.affection = 100;
    source.lust = 70;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('가슴에서 흘러나오는 모유를 마신다...');
  }

  private gainExperience(): void {
    this.addExperience(16, 2);
  }
}

export async function com35(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com35Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}

/**
 * COM36: 기승위애널
 * 대상이 조교자 페니스를 애널로 자극
 */
export class Com36Command extends TrainingCommand {
  getName(): string {
    return '기승위애널';
  }

  getDescription(): string {
    return '정액을 마시게 합니다';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[4] = source.submission || 0;
    this.character.source[5] = source.shame || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[4] += 20;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.submission = 120;
    source.shame = 150;
    source.lust = 80;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('정액을 삼키게 한다...');
  }

  private gainExperience(): void {
    this.addExperience(17, 2);
  }
}

export async function com36(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com36Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}

/**
 * COM37: 애널봉사
 * 대상이 조교자 애널을 입으로 자극
 */
export class Com37Command extends TrainingCommand {
  getName(): string {
    return '애널봉사';
  }

  getDescription(): string {
    return '애액을 마십니다';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    if (!this.bottomNaked()) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[0] = source.pleasureC || 0;
    this.character.source[4] = source.submission || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[0] += 15;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pleasureC = 200;
    source.submission = 100;
    source.lust = 90;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('흘러나온 애액을 핥아 마신다...');
  }

  private gainExperience(): void {
    this.addExperience(16, 2);
  }
}

export async function com37(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com37Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}

/**
 * COM38: 풋잡
 * 대상이 조교자 페니스를 발로 자극 (가학쾌락경험↑)
 */
export class Com38Command extends TrainingCommand {
  getName(): string {
    return '풋잡';
  }

  getDescription(): string {
    return '역강간 플레이를 합니다';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    if (!this.bottomNaked()) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[1] = source.pleasureV || 0;
    this.character.source[8] = source.lust || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[1] += 40;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pleasureV = 1000;
    source.lust = 200;
    source.submission = 50;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('강제로 삽입당한다...');
  }

  private gainExperience(): void {
    this.addExperience(14, 3);
  }
}

export async function com38(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com38Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}

/**
 * COM39: 오나홀잡
 * 대상이 조교자 페니스를 오나홀로 자극
 */
export class Com39Command extends TrainingCommand {
  getName(): string {
    return '오나홀잡';
  }

  getDescription(): string {
    return '레즈비언 플레이를 합니다';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[0] = source.pleasureC || 0;
    this.character.source[17] = source.pleasureB || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[0] += 20;
    this.ctx.base[1] += 20;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pleasureC = 300;
    source.pleasureB = 300;
    source.lust = 120;
    source.affection = 80;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('서로의 몸을 애무한다...');
  }

  private gainExperience(): void {
    this.addExperience(16, 2);
  }
}

export async function com39(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com39Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}

/**
 * COM40: 스팽킹
 * SM계 - 스팽킹
 */
export class Com40Command extends TrainingCommand {
  getName(): string {
    return '스팽킹';
  }

  getDescription(): string {
    return '엉덩이를 때립니다';
  }

  isAvailable(): boolean {
    // 하반신 노출 필수
    if (!this.bottomNaked()) {
      return false;
    }

    // 의식 필수
    if (this.character.flags[16] === -1) {
      return false;
    }

    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();

    const source = this.calculateSource();

    this.character.source[6] = source.pain || 0;
    this.character.source[12] = 200;
    this.character.source[14] = 500;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[0] += 80;
    this.ctx.base[1] += 40;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};

    const painLevel = this.ctx.params[9] || 0;
    const painLevels = [200, 500, 1000, 1500];

    if (painLevel < painLevels[0]) {
      source.pain = 300;
    } else if (painLevel < painLevels[1]) {
      source.pain = 500;
    } else if (painLevel < painLevels[2]) {
      source.pain = 800;
    } else if (painLevel < painLevels[3]) {
      source.pain = 1200;
    } else {
      source.pain = 1800;
    }

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);

    if (this.hasTalent(85)) { // M기질
      source.pain! *= 0.7;
    }

    if (this.hasTalent(86)) { // S기질
      source.pain! *= 1.5;
    }

    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('손바닥으로 엉덩이를 때린다!');
    this.message('"으앗...!!"');

    if (this.hasTalent(85)) {
      this.message('고통 속에서도 쾌감을 느끼고 있다...');
    }
  }

  private gainExperience(): void {
    this.addExperience(56, 5);

    const playerVirgin = this.ctx.getTalent?.(122) === 0;
    const charVirgin = this.hasTalent(122);

    if (!charVirgin && !playerVirgin) {
      this.addExperience(40, 2);
    } else if (charVirgin && playerVirgin) {
      this.addExperience(41, 2);
    }

    if (this.character.flags[2] >= 1000 && !this.isAssiPlay()) {
      this.addExperience(23, 1);
    }
  }
}

export async function com40(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  const command = new Com40Command(ctx, character);

  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }

  await command.execute();
}

/**
 * COM41: 채찍
 * SM계 - 채찍
 */
export class Com41Command extends TrainingCommand {
  getName(): string {
    return '채찍';
  }

  getDescription(): string {
    return '채찍으로 때립니다';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[6] = source.pain || 0;
    this.character.source[4] = source.submission || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[3] += 30;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pain = 300;
    source.submission = 150;
    source.fear = 100;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('채찍이 피부를 때린다...');
  }

  private gainExperience(): void {
    this.addExperience(18, 2);
  }
}

export async function com41(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com41Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}

/**
 * COM42: 바늘
 * SM계 - 바늘
 */
export class Com42Command extends TrainingCommand {
  getName(): string {
    return '바늘';
  }

  getDescription(): string {
    return 'SM계 - 바늘';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[14] = source.antipathy || 0;
    this.character.source[6] = source.pain || 0;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[1] += 20; // 기력소모
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};

    // 반감
    source.antipathy = 1000;

    // 고통 (PALAM:9 레벨에 따라 3000~4500)
    const painLevel = this.ctx.params[9] || 0;
    const painLevels = [800, 1400, 2100, 3000];

    if (painLevel < painLevels[0]) {
      source.pain = 3000;
    } else if (painLevel < painLevels[1]) {
      source.pain = 3300;
    } else if (painLevel < painLevels[2]) {
      source.pain = 3600;
    } else if (painLevel < painLevels[3]) {
      source.pain = 4000;
    } else {
      source.pain = 4500;
    }

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('날카로운 바늘이 피부를 찌른다...');
  }

  private gainExperience(): void {
    // TALENT:122에 따라 EXP:40 또는 EXP:41
    const targetTalent122 = this.hasTalent(122);
    const playerTalent122 = this.ctx.talents?.[122] || false;

    if (!targetTalent122 && !playerTalent122) {
      this.addExperience(40, 2);
    } else if (targetTalent122 && playerTalent122) {
      this.addExperience(41, 2);
    }

    // 애정경험 (조건부)
    if (this.character.flags[2] >= 1000 &&
        (this.getAbility(21) >= 3 || this.hasTalent(88)) &&
        this.ctx.assiplay === 0) {
      this.addExperience(23, 1);
    }
  }
}

export async function com42(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com42Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}

/**
 * COM43: 아이마스크
 * SM계 - 아이마스크
 */
export class Com43Command extends TrainingCommand {
  getName(): string {
    return '아이마스크';
  }

  getDescription(): string {
    return '관장을 합니다';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    if (!this.bottomNaked()) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[2] = source.pleasureA || 0;
    this.character.source[6] = source.pain || 0;
    this.character.source[4] = source.submission || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[2] += 20;
    this.ctx.base[4] += 30;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pleasureA = 200;
    source.pain = 180;
    source.submission = 150;
    source.shame = 200;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('항문에 관장액을 주입한다...');
  }

  private gainExperience(): void {
    this.addExperience(18, 2);
    this.addExperience(15, 1);
  }
}

export async function com43(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com43Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}

/**
 * COM44: 촉수 긴박
 * SM계 - 촉수로 묶기
 */
export class Com44Command extends TrainingCommand {
  getName(): string {
    return '촉수 긴박';
  }

  getDescription(): string {
    return '유두에 집게를 물립니다';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    if (!this.topNaked()) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[17] = source.pleasureB || 0;
    this.character.source[6] = source.pain || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[1] += 20;
    this.ctx.base[3] += 20;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pleasureB = 300;
    source.pain = 200;
    source.submission = 100;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('유두에 집게를 물린다...');
  }

  private gainExperience(): void {
    this.addExperience(18, 2);
  }
}

export async function com44(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com44Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}

/**
 * COM45: 볼개그
 * SM계 - 볼개그
 */
export class Com45Command extends TrainingCommand {
  getName(): string {
    return '볼개그';
  }

  getDescription(): string {
    return '로프로 묶습니다';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[6] = source.pain || 0;
    this.character.source[4] = source.submission || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[3] += 25;
    this.ctx.base[4] += 20;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pain = 180;
    source.submission = 200;
    source.fear = 120;
    source.shame = 150;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('로프로 몸을 단단히 묶는다...');
  }

  private gainExperience(): void {
    this.addExperience(18, 2);
  }
}

export async function com45(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com45Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}

/**
 * COM46: 촉수 관장
 * SM계 - 촉수 관장
 */
export class Com46Command extends TrainingCommand {
  getName(): string {
    return '촉수 관장';
  }

  getDescription(): string {
    return '전기 충격을 가합니다';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[6] = source.pain || 0;
    this.character.source[4] = source.submission || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[3] += 35;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pain = 350;
    source.submission = 180;
    source.fear = 150;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('전기 충격이 몸을 관통한다...');
  }

  private gainExperience(): void {
    this.addExperience(18, 3);
  }
}

export async function com46(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com46Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}

/**
 * COM47: 본디지 착용
 * 조수계 - 본디지 착용
 */
export class Com47Command extends TrainingCommand {
  getName(): string {
    return '본디지 착용';
  }

  getDescription(): string {
    return '엉덩이를 때립니다';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    if (!this.bottomNaked()) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[6] = source.pain || 0;
    this.character.source[4] = source.submission || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[3] += 20;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pain = 200;
    source.submission = 130;
    source.shame = 100;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('엉덩이를 손바닥으로 때린다...');
  }

  private gainExperience(): void {
    this.addExperience(18, 2);
  }
}

export async function com47(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com47Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}

/**
 * COM48: 풋잡한다
 * SM계 - 조교자가 대상 페니스를 발로 자극
 */
export class Com48Command extends TrainingCommand {
  getName(): string {
    return '풋잡한다';
  }

  getDescription(): string {
    return '목줄을 채웁니다';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[4] = source.submission || 0;
    this.character.source[5] = source.shame || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[4] += 40;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.submission = 250;
    source.shame = 200;
    source.fear = 80;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('목에 목줄을 채운다...');
  }

  private gainExperience(): void {
    this.addExperience(18, 2);
  }
}

export async function com48(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com48Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}

/**
 * COM49: 애널전극
 * SM계 - 애널전극
 */
export class Com49Command extends TrainingCommand {
  getName(): string {
    return '애널전극';
  }

  getDescription(): string {
    return '애완동물처럼 대합니다';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[4] = source.submission || 0;
    this.character.source[5] = source.shame || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[4] += 50;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.submission = 300;
    source.shame = 250;
    source.lust = 100;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('개처럼 행동하게 한다...');
  }

  private gainExperience(): void {
    this.addExperience(18, 3);
  }
}

export async function com49(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com49Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}

/**
 * COM50: 로션
 * 도구 - 로션
 */
export class Com50Command extends TrainingCommand {
  getName(): string {
    return '로션';
  }

  getDescription(): string {
    return '자위하는 것을 감상합니다';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[0] = source.pleasureC || 0;
    this.character.source[5] = source.shame || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[0] += 15;
    this.ctx.base[4] += 30;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pleasureC = 300;
    source.shame = 200;
    source.lust = 150;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('자위하는 모습을 감상한다...');
  }

  private gainExperience(): void {
    this.addExperience(19, 2);
  }
}

export async function com50(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com50Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}

/**
 * COM51: 미약
 * 도구 - 미약
 */
export class Com51Command extends TrainingCommand {
  getName(): string {
    return '미약';
  }

  getDescription(): string {
    return '소변을 보게 합니다';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[5] = source.shame || 0;
    this.character.source[4] = source.submission || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[4] += 35;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.shame = 250;
    source.submission = 150;
    source.lust = 80;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('소변을 보게 한다...');
  }

  private gainExperience(): void {
    this.addExperience(19, 2);
  }
}

export async function com51(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com51Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}

/**
 * COM52: 이뇨제
 * 도구 - 이뇨제
 */
export class Com52Command extends TrainingCommand {
  getName(): string {
    return '이뇨제';
  }

  getDescription(): string {
    return '몸에 낙서를 합니다';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[5] = source.shame || 0;
    this.character.source[4] = source.submission || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[4] += 30;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.shame = 200;
    source.submission = 130;
    source.lust = 60;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('몸에 낙서를 한다...');
  }

  private gainExperience(): void {
    this.addExperience(19, 2);
  }
}

export async function com52(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com52Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}

/**
 * COM53: 비디오카메라
 * 도구 - 비디오 촬영
 */
export class Com53Command extends TrainingCommand {
  getName(): string {
    return '비디오카메라';
  }

  getDescription(): string {
    return '사진이나 영상을 촬영합니다';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[5] = source.shame || 0;
    this.character.source[8] = source.lust || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[4] += 25;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.shame = 180;
    source.lust = 100;
    source.submission = 100;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('카메라로 촬영한다...');
  }

  private gainExperience(): void {
    this.addExperience(19, 2);
  }
}

export async function com53(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com53Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}

/**
 * COM54: 촬영세트 변경
 * 특수 - 촬영장소 변경
 */
export class Com54Command extends TrainingCommand {
  getName(): string {
    return '촬영세트 변경';
  }

  getDescription(): string {
    return '공공장소에서 노출시킵니다';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[5] = source.shame || 0;
    this.character.source[8] = source.lust || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[4] += 40;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.shame = 300;
    source.lust = 150;
    source.submission = 120;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('공공장소에서 노출시킨다...');
  }

  private gainExperience(): void {
    this.addExperience(19, 3);
  }
}

export async function com54(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com54Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}

/**
 * COM55: 아무것도 안한다
 * 특수 - 초조하게 만듦
 */
export class Com55Command extends TrainingCommand {
  getName(): string {
    return '아무것도 안한다';
  }

  getDescription(): string {
    return '여러 명에게 당하게 합니다';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    if (!this.bottomNaked()) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[1] = source.pleasureV || 0;
    this.character.source[2] = source.pleasureA || 0;
    this.character.source[18] = source.pleasureM || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[1] += 50;
    this.ctx.base[4] += 50;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pleasureV = 1200;
    source.pleasureA = 900;
    source.pleasureM = 600;
    source.submission = 300;
    source.shame = 350;
    source.lust = 250;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('여러 명에게 동시에 범해진다...');
  }

  private gainExperience(): void {
    this.addExperience(14, 5);
    this.addExperience(19, 4);
  }
}

export async function com55(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com55Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}

/**
 * COM56: 자기소개
 * 특수 - 자기소개 (촬영 중)
 */
export class Com56Command extends TrainingCommand {
  getName(): string {
    return '자기소개';
  }

  getDescription(): string {
    return '최면을 겁니다';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[4] = source.submission || 0;
    this.character.source[8] = source.lust || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[4] += 45;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.submission = 350;
    source.lust = 200;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('최면을 건다...');
  }

  private gainExperience(): void {
    this.addExperience(20, 3);
  }
}

export async function com56(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com56Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}

/**
 * COM57: 수치 플레이
 * 특수 - 거울로 수치 플레이
 */
export class Com57Command extends TrainingCommand {
  getName(): string {
    return '수치 플레이';
  }

  getDescription(): string {
    return '약물을 투여합니다';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[8] = source.lust || 0;
    this.character.source[4] = source.submission || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[1] += 40;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.lust = 400;
    source.submission = 200;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('약물을 투여한다...');
  }

  private gainExperience(): void {
    this.addExperience(20, 2);
  }
}

export async function com57(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com57Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}

/**
 * COM58: 목욕탕 플레이
 * 특수 - 목욕탕 플레이
 */
export class Com58Command extends TrainingCommand {
  getName(): string {
    return '목욕탕 플레이';
  }

  getDescription(): string {
    return '모유를 짜냅니다';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    if (!this.topNaked()) return false;
    if (!this.hasTalent(108)) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[17] = source.pleasureB || 0;
    this.character.source[5] = source.shame || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[1] += 30;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pleasureB = 500;
    source.shame = 150;
    source.lust = 120;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('가슴에서 모유를 짜낸다...');
  }

  private gainExperience(): void {
    this.addExperience(16, 3);
  }
}

export async function com58(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com58Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}

/**
 * COM59: 코스프레
 * 특수 - 코스프레
 */
export class Com59Command extends TrainingCommand {
  getName(): string {
    return '코스프레';
  }

  getDescription(): string {
    return '임신 관련 플레이를 합니다';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[1] = source.pleasureV || 0;
    this.character.source[8] = source.lust || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[1] += 35;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pleasureV = 800;
    source.lust = 200;
    source.affection = 150;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('임신 플레이를 한다...');
  }

  private gainExperience(): void {
    this.addExperience(14, 3);
  }
}

export async function com59(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com59Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}

/**
 * COM60: 조수에게 키스시킨다
 * 조수계 - 대상이 조수에게 키스
 */
export class Com60Command extends TrainingCommand {
  getName(): string {
    return '조수에게 키스시킨다';
  }

  getDescription(): string {
    return '특수 조합 커맨드를 실행합니다';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[0] = source.pleasureC || 0;
    this.character.source[1] = source.pleasureV || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[0] += 10;
    this.ctx.base[1] += 50;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pleasureC = 100;
    source.pleasureV = 100;
    source.submission = 100;
    source.lust = 100;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('조합 커맨드 실행 중...');
  }

  private gainExperience(): void {
    this.addExperience(14, 2);
  }
}

export async function com60(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com60Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}

/**
 * COM61: 커닐링구스강제
 * 조수계 - 대상이 조수 클리토리스를 입으로 자극
 */
export class Com61Command extends TrainingCommand {
  getName(): string {
    return '커닐링구스강제';
  }

  getDescription(): string {
    return '특수 조합 커맨드를 실행합니다';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[0] = source.pleasureC || 0;
    this.character.source[1] = source.pleasureV || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[0] += 10;
    this.ctx.base[1] += 50;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pleasureC = 100;
    source.pleasureV = 100;
    source.submission = 100;
    source.lust = 100;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('조합 커맨드 실행 중...');
  }

  private gainExperience(): void {
    this.addExperience(14, 2);
  }
}

export async function com61(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com61Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}

/**
 * COM62: 조수를 범한다
 * 조수계 - 조교자가 조수와 섹스
 */
export class Com62Command extends TrainingCommand {
  getName(): string {
    return '조수를 범한다';
  }

  getDescription(): string {
    return '특수 조합 커맨드를 실행합니다';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[0] = source.pleasureC || 0;
    this.character.source[1] = source.pleasureV || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[0] += 10;
    this.ctx.base[1] += 50;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pleasureC = 100;
    source.pleasureV = 100;
    source.submission = 100;
    source.lust = 100;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('조합 커맨드 실행 중...');
  }

  private gainExperience(): void {
    this.addExperience(14, 2);
  }
}

export async function com62(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com62Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}

/**
 * COM63: 조개맞대기
 * 조수계 - 대상과 조수의 바기나를 맞댐
 */
export class Com63Command extends TrainingCommand {
  getName(): string {
    return '조개맞대기';
  }

  getDescription(): string {
    return '특수 조합 커맨드를 실행합니다';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[0] = source.pleasureC || 0;
    this.character.source[1] = source.pleasureV || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[0] += 10;
    this.ctx.base[1] += 50;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pleasureC = 100;
    source.pleasureV = 100;
    source.submission = 100;
    source.lust = 100;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('조합 커맨드 실행 중...');
  }

  private gainExperience(): void {
    this.addExperience(14, 2);
  }
}

export async function com63(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com63Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}

/**
 * COM64: ・질＆애널 두개 꽂기
 * 특수 - 조교자와 조수가 동시에 두 곳 공격
 */
export class Com64Command extends TrainingCommand {
  getName(): string {
    return '・질＆애널 두개 꽂기';
  }

  getDescription(): string {
    return '특수 조합 커맨드를 실행합니다';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[0] = source.pleasureC || 0;
    this.character.source[1] = source.pleasureV || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[0] += 10;
    this.ctx.base[1] += 50;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pleasureC = 100;
    source.pleasureV = 100;
    source.submission = 100;
    source.lust = 100;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('조합 커맨드 실행 중...');
  }

  private gainExperience(): void {
    this.addExperience(14, 2);
  }
}

export async function com64(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com64Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}

/**
 * COM65: 조수를 범하게 한다
 * 조수계 - 대상이 조수를 범함
 */
export class Com65Command extends TrainingCommand {
  getName(): string {
    return '조수를 범하게 한다';
  }

  getDescription(): string {
    return '특수 조합 커맨드를 실행합니다';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[0] = source.pleasureC || 0;
    this.character.source[1] = source.pleasureV || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[0] += 10;
    this.ctx.base[1] += 50;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pleasureC = 100;
    source.pleasureV = 100;
    source.submission = 100;
    source.lust = 100;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('조합 커맨드 실행 중...');
  }

  private gainExperience(): void {
    this.addExperience(14, 2);
  }
}

export async function com65(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com65Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}

/**
 * COM66: 두개 펠라
 * 조수계 - 대상이 조수와 조교자 페니스 동시에 입으로
 */
export class Com66Command extends TrainingCommand {
  getName(): string {
    return '두개 펠라';
  }

  getDescription(): string {
    return '특수 조합 커맨드를 실행합니다';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[0] = source.pleasureC || 0;
    this.character.source[1] = source.pleasureV || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[0] += 10;
    this.ctx.base[1] += 50;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pleasureC = 100;
    source.pleasureV = 100;
    source.submission = 100;
    source.lust = 100;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('조합 커맨드 실행 중...');
  }

  private gainExperience(): void {
    this.addExperience(14, 2);
  }
}

export async function com66(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com66Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}

/**
 * COM67: 풋잡한다
 * 조수계 - 풋잡
 */
export class Com67Command extends TrainingCommand {
  getName(): string {
    return '풋잡한다';
  }

  getDescription(): string {
    return '특수 조합 커맨드를 실행합니다';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[0] = source.pleasureC || 0;
    this.character.source[1] = source.pleasureV || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[0] += 10;
    this.ctx.base[1] += 50;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pleasureC = 100;
    source.pleasureV = 100;
    source.submission = 100;
    source.lust = 100;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('조합 커맨드 실행 중...');
  }

  private gainExperience(): void {
    this.addExperience(14, 2);
  }
}

export async function com67(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com67Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}

/**
 * COM68: 더블 펠라
 * 조수계 - 대상과 조수가 동시에 조교자 페니스를 입으로
 */
export class Com68Command extends TrainingCommand {
  getName(): string {
    return '더블 펠라';
  }

  getDescription(): string {
    return '특수 조합 커맨드를 실행합니다';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[0] = source.pleasureC || 0;
    this.character.source[1] = source.pleasureV || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[0] += 10;
    this.ctx.base[1] += 50;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pleasureC = 100;
    source.pleasureV = 100;
    source.submission = 100;
    source.lust = 100;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('조합 커맨드 실행 중...');
  }

  private gainExperience(): void {
    this.addExperience(14, 2);
  }
}

export async function com68(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com68Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}

/**
 * COM69: 식스나인
 * 특수 - 조교자와 대상이 동시에 성기를 입으로 자극
 */
export class Com69Command extends TrainingCommand {
  getName(): string {
    return '식스나인';
  }

  getDescription(): string {
    return '특수 조합 커맨드를 실행합니다';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[0] = source.pleasureC || 0;
    this.character.source[1] = source.pleasureV || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[0] += 10;
    this.ctx.base[1] += 50;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pleasureC = 100;
    source.pleasureV = 100;
    source.submission = 100;
    source.lust = 100;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('조합 커맨드 실행 중...');
  }

  private gainExperience(): void {
    this.addExperience(14, 2);
  }
}

export async function com69(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com69Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}

/**
 * COM70: 더블 스마타
 * 조수계 - 대상과 조수가 동시에 스마타
 */
export class Com70Command extends TrainingCommand {
  getName(): string {
    return '더블 스마타';
  }

  getDescription(): string {
    return '특수 조합 커맨드를 실행합니다';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[0] = source.pleasureC || 0;
    this.character.source[1] = source.pleasureV || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[0] += 10;
    this.ctx.base[1] += 50;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pleasureC = 100;
    source.pleasureV = 100;
    source.submission = 100;
    source.lust = 100;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('조합 커맨드 실행 중...');
  }

  private gainExperience(): void {
    this.addExperience(14, 2);
  }
}

export async function com70(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com70Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}

/**
 * COM71: 더블 파이즈리
 * 조수계 - 대상과 조수가 동시에 파이즈리
 */
export class Com71Command extends TrainingCommand {
  getName(): string {
    return '더블 파이즈리';
  }

  getDescription(): string {
    return '특수 조합 커맨드를 실행합니다';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[0] = source.pleasureC || 0;
    this.character.source[1] = source.pleasureV || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[0] += 10;
    this.ctx.base[1] += 50;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pleasureC = 100;
    source.pleasureV = 100;
    source.submission = 100;
    source.lust = 100;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('조합 커맨드 실행 중...');
  }

  private gainExperience(): void {
    this.addExperience(14, 2);
  }
}

export async function com71(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com71Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}

/**
 * COM72: 미약
 * 도구 - 미약
 */
export class Com72Command extends TrainingCommand {
  getName(): string {
    return '미약';
  }

  getDescription(): string {
    return '특수 조합 커맨드를 실행합니다';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[0] = source.pleasureC || 0;
    this.character.source[1] = source.pleasureV || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[0] += 10;
    this.ctx.base[1] += 50;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pleasureC = 100;
    source.pleasureV = 100;
    source.submission = 100;
    source.lust = 100;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('조합 커맨드 실행 중...');
  }

  private gainExperience(): void {
    this.addExperience(14, 2);
  }
}

export async function com72(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com72Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}

/**
 * COM73: 유두 맞대기
 * 조수계 - 유두 맞대기 (미완성)
 */
export class Com73Command extends TrainingCommand {
  getName(): string {
    return '유두 맞대기';
  }

  getDescription(): string {
    return '특수 조합 커맨드를 실행합니다';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[0] = source.pleasureC || 0;
    this.character.source[1] = source.pleasureV || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[0] += 10;
    this.ctx.base[1] += 50;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pleasureC = 100;
    source.pleasureV = 100;
    source.submission = 100;
    source.lust = 100;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('조합 커맨드 실행 중...');
  }

  private gainExperience(): void {
    this.addExperience(14, 2);
  }
}

export async function com73(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com73Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}

export class Com74Command extends TrainingCommand {
  getName(): string {
    return '조합커맨드14';
  }

  getDescription(): string {
    return '특수 조합 커맨드를 실행합니다';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[0] = source.pleasureC || 0;
    this.character.source[1] = source.pleasureV || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[0] += 10;
    this.ctx.base[1] += 50;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pleasureC = 100;
    source.pleasureV = 100;
    source.submission = 100;
    source.lust = 100;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('조합 커맨드 실행 중...');
  }

  private gainExperience(): void {
    this.addExperience(14, 2);
  }
}

export async function com74(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com74Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}

export class Com75Command extends TrainingCommand {
  getName(): string {
    return '조합커맨드15';
  }

  getDescription(): string {
    return '특수 조합 커맨드를 실행합니다';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[0] = source.pleasureC || 0;
    this.character.source[1] = source.pleasureV || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[0] += 10;
    this.ctx.base[1] += 50;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pleasureC = 100;
    source.pleasureV = 100;
    source.submission = 100;
    source.lust = 100;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('조합 커맨드 실행 중...');
  }

  private gainExperience(): void {
    this.addExperience(14, 2);
  }
}

export async function com75(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com75Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}

export class Com76Command extends TrainingCommand {
  getName(): string {
    return '조합커맨드16';
  }

  getDescription(): string {
    return '특수 조합 커맨드를 실행합니다';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[0] = source.pleasureC || 0;
    this.character.source[1] = source.pleasureV || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[0] += 10;
    this.ctx.base[1] += 50;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pleasureC = 100;
    source.pleasureV = 100;
    source.submission = 100;
    source.lust = 100;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('조합 커맨드 실행 중...');
  }

  private gainExperience(): void {
    this.addExperience(14, 2);
  }
}

export async function com76(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com76Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}

export class Com77Command extends TrainingCommand {
  getName(): string {
    return '조합커맨드17';
  }

  getDescription(): string {
    return '특수 조합 커맨드를 실행합니다';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[0] = source.pleasureC || 0;
    this.character.source[1] = source.pleasureV || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[0] += 10;
    this.ctx.base[1] += 50;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pleasureC = 100;
    source.pleasureV = 100;
    source.submission = 100;
    source.lust = 100;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('조합 커맨드 실행 중...');
  }

  private gainExperience(): void {
    this.addExperience(14, 2);
  }
}

export async function com77(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com77Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}

export class Com78Command extends TrainingCommand {
  getName(): string {
    return '조합커맨드18';
  }

  getDescription(): string {
    return '특수 조합 커맨드를 실행합니다';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[0] = source.pleasureC || 0;
    this.character.source[1] = source.pleasureV || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[0] += 10;
    this.ctx.base[1] += 50;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pleasureC = 100;
    source.pleasureV = 100;
    source.submission = 100;
    source.lust = 100;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('조합 커맨드 실행 중...');
  }

  private gainExperience(): void {
    this.addExperience(14, 2);
  }
}

export async function com78(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com78Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}

export class Com79Command extends TrainingCommand {
  getName(): string {
    return '조합커맨드19';
  }

  getDescription(): string {
    return '특수 조합 커맨드를 실행합니다';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[0] = source.pleasureC || 0;
    this.character.source[1] = source.pleasureV || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[0] += 10;
    this.ctx.base[1] += 50;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pleasureC = 100;
    source.pleasureV = 100;
    source.submission = 100;
    source.lust = 100;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('조합 커맨드 실행 중...');
  }

  private gainExperience(): void {
    this.addExperience(14, 2);
  }
}

export async function com79(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com79Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}

/**
 * COM80: 이라마치오
 * 페니스를 목구멍 깊이 삽입
 */
export class Com80Command extends TrainingCommand {
  getName(): string {
    return '이라마치오';
  }

  getDescription(): string {
    return '특수 조합 커맨드를 실행합니다';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[0] = source.pleasureC || 0;
    this.character.source[1] = source.pleasureV || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[0] += 10;
    this.ctx.base[1] += 50;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pleasureC = 100;
    source.pleasureV = 100;
    source.submission = 100;
    source.lust = 100;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('조합 커맨드 실행 중...');
  }

  private gainExperience(): void {
    this.addExperience(14, 2);
  }
}

export async function com80(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com80Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}

/**
 * COM81: 피스트퍽
 * 바기나에 주먹 삽입
 */
export class Com81Command extends TrainingCommand {
  getName(): string {
    return '피스트퍽';
  }

  getDescription(): string {
    return '특수 조합 커맨드를 실행합니다';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[0] = source.pleasureC || 0;
    this.character.source[1] = source.pleasureV || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[0] += 10;
    this.ctx.base[1] += 50;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pleasureC = 100;
    source.pleasureV = 100;
    source.submission = 100;
    source.lust = 100;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('조합 커맨드 실행 중...');
  }

  private gainExperience(): void {
    this.addExperience(14, 2);
  }
}

export async function com81(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com81Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}

/**
 * COM82: 애널피스트
 * 애널에 주먹 삽입
 */
export class Com82Command extends TrainingCommand {
  getName(): string {
    return '애널피스트';
  }

  getDescription(): string {
    return '특수 조합 커맨드를 실행합니다';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[0] = source.pleasureC || 0;
    this.character.source[1] = source.pleasureV || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[0] += 10;
    this.ctx.base[1] += 50;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pleasureC = 100;
    source.pleasureV = 100;
    source.submission = 100;
    source.lust = 100;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('조합 커맨드 실행 중...');
  }

  private gainExperience(): void {
    this.addExperience(14, 2);
  }
}

export async function com82(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com82Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}

/**
 * COM83: 양구멍피스트
 * 바기나와 애널에 동시에 주먹 삽입
 */
export class Com83Command extends TrainingCommand {
  getName(): string {
    return '양구멍피스트';
  }

  getDescription(): string {
    return '특수 조합 커맨드를 실행합니다';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[0] = source.pleasureC || 0;
    this.character.source[1] = source.pleasureV || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[0] += 10;
    this.ctx.base[1] += 50;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pleasureC = 100;
    source.pleasureV = 100;
    source.submission = 100;
    source.lust = 100;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('조합 커맨드 실행 중...');
  }

  private gainExperience(): void {
    this.addExperience(14, 2);
  }
}

export async function com83(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com83Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}

/**
 * COM84: G스팟자극
 * G스팟 자극
 */
export class Com84Command extends TrainingCommand {
  getName(): string {
    return 'G스팟자극';
  }

  getDescription(): string {
    return '특수 조합 커맨드를 실행합니다';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[0] = source.pleasureC || 0;
    this.character.source[1] = source.pleasureV || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[0] += 10;
    this.ctx.base[1] += 50;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pleasureC = 100;
    source.pleasureV = 100;
    source.submission = 100;
    source.lust = 100;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('조합 커맨드 실행 중...');
  }

  private gainExperience(): void {
    this.addExperience(14, 2);
  }
}

export async function com84(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com84Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}

/**
 * COM85: 방뇨
 * 대상이 스스로 방뇨
 */
export class Com85Command extends TrainingCommand {
  getName(): string {
    return '방뇨';
  }

  getDescription(): string {
    return '특수 조합 커맨드를 실행합니다';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[0] = source.pleasureC || 0;
    this.character.source[1] = source.pleasureV || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[0] += 10;
    this.ctx.base[1] += 50;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pleasureC = 100;
    source.pleasureV = 100;
    source.submission = 100;
    source.lust = 100;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('조합 커맨드 실행 중...');
  }

  private gainExperience(): void {
    this.addExperience(14, 2);
  }
}

export async function com85(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com85Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}

export class Com86Command extends TrainingCommand {
  getName(): string {
    return '조합커맨드26';
  }

  getDescription(): string {
    return '특수 조합 커맨드를 실행합니다';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[0] = source.pleasureC || 0;
    this.character.source[1] = source.pleasureV || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[0] += 10;
    this.ctx.base[1] += 50;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pleasureC = 100;
    source.pleasureV = 100;
    source.submission = 100;
    source.lust = 100;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('조합 커맨드 실행 중...');
  }

  private gainExperience(): void {
    this.addExperience(14, 2);
  }
}

export async function com86(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com86Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}

/**
 * COM87: 피어싱
 * 신체에 피어싱 장착
 */
export class Com87Command extends TrainingCommand {
  getName(): string {
    return '피어싱';
  }

  getDescription(): string {
    return '특수 조합 커맨드를 실행합니다';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[0] = source.pleasureC || 0;
    this.character.source[1] = source.pleasureV || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[0] += 10;
    this.ctx.base[1] += 50;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pleasureC = 100;
    source.pleasureV = 100;
    source.submission = 100;
    source.lust = 100;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('조합 커맨드 실행 중...');
  }

  private gainExperience(): void {
    this.addExperience(14, 2);
  }
}

export async function com87(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com87Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}

/**
 * COM88: 제모
 * 음모 제거
 */
export class Com88Command extends TrainingCommand {
  getName(): string {
    return '제모';
  }

  getDescription(): string {
    return '특수 조합 커맨드를 실행합니다';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[0] = source.pleasureC || 0;
    this.character.source[1] = source.pleasureV || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[0] += 10;
    this.ctx.base[1] += 50;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pleasureC = 100;
    source.pleasureV = 100;
    source.submission = 100;
    source.lust = 100;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('조합 커맨드 실행 중...');
  }

  private gainExperience(): void {
    this.addExperience(14, 2);
  }
}

export async function com88(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com88Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}

/**
 * COM89: 수간 플레이
 * 수간 플레이
 */
export class Com89Command extends TrainingCommand {
  getName(): string {
    return '수간 플레이';
  }

  getDescription(): string {
    return '특수 조합 커맨드를 실행합니다';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[0] = source.pleasureC || 0;
    this.character.source[1] = source.pleasureV || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[0] += 10;
    this.ctx.base[1] += 50;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pleasureC = 100;
    source.pleasureV = 100;
    source.submission = 100;
    source.lust = 100;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('조합 커맨드 실행 중...');
  }

  private gainExperience(): void {
    this.addExperience(14, 2);
  }
}

export async function com89(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com89Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}

/**
 * COM90: 로터자위
 * 대상이 스스로 로터로 자위
 */
export class Com90Command extends TrainingCommand {
  getName(): string {
    return '로터자위';
  }

  getDescription(): string {
    return '특수 조합 커맨드를 실행합니다';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[0] = source.pleasureC || 0;
    this.character.source[1] = source.pleasureV || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[0] += 10;
    this.ctx.base[1] += 50;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pleasureC = 100;
    source.pleasureV = 100;
    source.submission = 100;
    source.lust = 100;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('조합 커맨드 실행 중...');
  }

  private gainExperience(): void {
    this.addExperience(14, 2);
  }
}

export async function com90(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com90Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}

/**
 * COM91: 전동마사지기자위
 * 대상이 스스로 전동마사지기로 자위
 */
export class Com91Command extends TrainingCommand {
  getName(): string {
    return '전동마사지기자위';
  }

  getDescription(): string {
    return '특수 조합 커맨드를 실행합니다';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[0] = source.pleasureC || 0;
    this.character.source[1] = source.pleasureV || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[0] += 10;
    this.ctx.base[1] += 50;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pleasureC = 100;
    source.pleasureV = 100;
    source.submission = 100;
    source.lust = 100;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('조합 커맨드 실행 중...');
  }

  private gainExperience(): void {
    this.addExperience(14, 2);
  }
}

export async function com91(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com91Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}

/**
 * COM92: 유두로터
 * 로터로 유두 자극
 */
export class Com92Command extends TrainingCommand {
  getName(): string {
    return '유두로터';
  }

  getDescription(): string {
    return '특수 조합 커맨드를 실행합니다';
  }

  isAvailable(): boolean {
    if (this.character.flags[16] === -1) return false;
    return true;
  }

  async execute(): Promise<void> {
    this.message(this.getName());
    this.ctx.saveStr[0] = this.getName();
    const source = this.calculateSource();

    this.character.source[0] = source.pleasureC || 0;
    this.character.source[1] = source.pleasureV || 0;
    this.character.source[12] = 100;

    await this.showTrainMessage();
    this.gainExperience();

    this.ctx.base[0] += 10;
    this.ctx.base[1] += 50;
  }

  private calculateSource(): Partial<SourceResult> {
    const source: Partial<SourceResult> = {};
    source.pleasureC = 100;
    source.pleasureV = 100;
    source.submission = 100;
    source.lust = 100;

    const modified = this.applySourceModifiers(source);
    Object.assign(source, modified);
    return source;
  }

  private async showTrainMessage(): Promise<void> {
    this.message('조합 커맨드 실행 중...');
  }

  private gainExperience(): void {
    this.addExperience(14, 2);
  }
}

export async function com92(ctx: TrainingContext, character: Character): Promise<void> {
  const command = new Com92Command(ctx, character);
  if (!command.isAvailable()) {
    ctx.showMessage('지금은 이 커맨드를 사용할 수 없습니다.');
    return;
  }
  await command.execute();
}