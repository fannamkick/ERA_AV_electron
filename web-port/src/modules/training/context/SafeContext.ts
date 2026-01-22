/**
 * SafeContext - 타입 안전한 TrainingContext 래퍼
 *
 * 매직 넘버 대신 상수 키를 사용하여 타입 안전하게 컨텍스트에 접근합니다.
 * character_variable_analysis.md 문서 기반으로 설계됨.
 */

import {
  ABL,
  TALENT,
  SOURCE,
  EXP,
  EQUIPMENT,
  CLOTHING_BITS,
  STAIN_PART,
  STAIN_BITS,
  CFLAG,
  MARK,
} from '../../../types/training';
import type { TrainingContext } from '../../../types/training';

// 타입 별칭
type AblKey = keyof typeof ABL;
type TalentKey = keyof typeof TALENT;
type SourceKey = keyof typeof SOURCE;
type ExpKey = keyof typeof EXP;
type EquipmentKey = keyof typeof EQUIPMENT;
type ClothingKey = keyof typeof CLOTHING_BITS;
type StainPartKey = keyof typeof STAIN_PART;
type StainBitKey = keyof typeof STAIN_BITS;
type CflagKey = keyof typeof CFLAG;
type MarkKey = keyof typeof MARK;

export class SafeContext {
  constructor(public readonly ctx: TrainingContext) {}

  // ============================================================================
  // ABL (능력치) - 조교로 성장
  // ============================================================================

  /** 능력치 값 가져오기 */
  getAbility(key: AblKey): number {
    return this.ctx.abilities[ABL[key]] ?? 0;
  }

  /** 능력치 인덱스로 직접 접근 */
  getAbilityByIndex(index: number): number {
    return this.ctx.abilities[index] ?? 0;
  }

  // ============================================================================
  // TALENT (소질) - 대부분 고정, 일부 조교로 변동
  // ============================================================================

  /** 대상이 소질을 가지고 있는지 확인 */
  hasTalent(key: TalentKey): boolean {
    return this.ctx.talents[TALENT[key]] === 1;
  }

  /** 대상의 소질 값 가져오기 */
  getTalent(key: TalentKey): number {
    return this.ctx.talents[TALENT[key]] ?? 0;
  }

  /** 소질 인덱스로 직접 체크 */
  hasTalentByIndex(index: number): boolean {
    return this.ctx.talents[index] === 1;
  }

  /** 소질 설정 */
  setTalent(key: TalentKey, value: number): void {
    this.ctx.talents[TALENT[key]] = value;
  }

  /** 소질 인덱스로 직접 설정 */
  setTalentByIndex(index: number, value: number): void {
    this.ctx.talents[index] = value;
  }

  /** 플레이어가 소질을 가지고 있는지 확인 */
  hasPlayerTalent(key: TalentKey): boolean {
    return this.ctx.playerTalents?.[TALENT[key]] === 1;
  }

  /** 플레이어 소질 인덱스로 직접 체크 */
  hasPlayerTalentByIndex(index: number): boolean {
    return this.ctx.playerTalents?.[index] === 1;
  }

  // ============================================================================
  // EQUIPMENT (장비 / TEQUIP)
  // ============================================================================

  /** 장비가 활성화되어 있는지 확인 */
  hasEquipment(key: EquipmentKey): boolean {
    return !!this.ctx.equipment?.[EQUIPMENT[key]];
  }

  /** 장비 인덱스로 직접 체크 */
  hasEquipmentByIndex(index: number): boolean {
    return !!this.ctx.equipment?.[index];
  }

  // ============================================================================
  // CLOTHING (의류 / CFLAG:40)
  // ============================================================================

  /** 특정 의류를 착용하고 있는지 확인 */
  isWearing(bit: ClothingKey): boolean {
    const clothing = this.ctx.charFlags?.[CFLAG.의류상태] ?? 0;
    return (clothing & CLOTHING_BITS[bit]) !== 0;
  }

  /** 상의가 벗겨져 있는지 확인 */
  isTopNaked(): boolean {
    return !this.isWearing('상의') && !this.isWearing('브래지어');
  }

  /** 하의가 벗겨져 있는지 확인 */
  isBottomNaked(): boolean {
    return !this.isWearing('하의') && !this.isWearing('팬티');
  }

  // ============================================================================
  // SOURCE - 커맨드 실행 시 PALAM 증가량
  // ============================================================================

  /** SOURCE 배열 초기화 */
  private ensureSource(): number[] {
    if (!this.ctx.source) {
      this.ctx.source = new Array(19).fill(0);
    }
    return this.ctx.source;
  }

  /** SOURCE 값 추가 */
  addSource(key: SourceKey, amount: number): void {
    const source = this.ensureSource();
    source[SOURCE[key]] = (source[SOURCE[key]] ?? 0) + amount;
  }

  /** SOURCE 값 가져오기 */
  getSource(key: SourceKey): number {
    return this.ctx.source?.[SOURCE[key]] ?? 0;
  }

  /** SOURCE 값 설정 */
  setSource(key: SourceKey, value: number): void {
    const source = this.ensureSource();
    source[SOURCE[key]] = value;
  }

  /** SOURCE 값 곱하기 */
  multiplySource(key: SourceKey, multiplier: number): void {
    const source = this.ensureSource();
    source[SOURCE[key]] = Math.floor((source[SOURCE[key]] ?? 0) * multiplier);
  }

  /** SOURCE 인덱스로 직접 접근 */
  addSourceByIndex(index: number, amount: number): void {
    const source = this.ensureSource();
    source[index] = (source[index] ?? 0) + amount;
  }

  /** SOURCE 인덱스로 직접 설정 */
  setSourceByIndex(index: number, value: number): void {
    const source = this.ensureSource();
    source[index] = value;
  }

  /** SOURCE 인덱스로 직접 곱하기 */
  multiplySourceByIndex(index: number, multiplier: number): void {
    const source = this.ensureSource();
    source[index] = Math.floor((source[index] ?? 0) * multiplier);
  }

  /** 전체 SOURCE 배열 가져오기 (복사본) */
  getSourceArray(): number[] {
    return [...this.ensureSource()];
  }

  // ============================================================================
  // LOSEBASE (체력/기력 소모)
  // ============================================================================

  /** LOSEBASE 배열 초기화 */
  private ensureLoseBase(): number[] {
    if (!this.ctx.loseBase) {
      this.ctx.loseBase = new Array(10).fill(0);
    }
    return this.ctx.loseBase;
  }

  /** 체력 소모 추가 */
  addStaminaCost(amount: number): void {
    const loseBase = this.ensureLoseBase();
    loseBase[0] = (loseBase[0] ?? 0) + amount;
  }

  /** 기력 소모 추가 */
  addWillpowerCost(amount: number): void {
    const loseBase = this.ensureLoseBase();
    loseBase[1] = (loseBase[1] ?? 0) + amount;
  }

  // ============================================================================
  // EXP (경험치) - 조교로 증가
  // ============================================================================

  /** 경험치 추가 (메시지 표시) */
  addExperience(key: ExpKey, amount: number): void {
    this.ctx.exp[EXP[key]] = (this.ctx.exp[EXP[key]] ?? 0) + amount;
    this.ctx.showMessage(`${key} +${amount}`);
  }

  /** 경험치 추가 (메시지 없음) */
  addExperienceSilent(key: ExpKey, amount: number): void {
    this.ctx.exp[EXP[key]] = (this.ctx.exp[EXP[key]] ?? 0) + amount;
  }

  /** 경험치 값 가져오기 */
  getExperience(key: ExpKey): number {
    return this.ctx.exp[EXP[key]] ?? 0;
  }

  /** 경험치 인덱스로 직접 추가 */
  addExperienceByIndex(index: number, amount: number, label?: string): void {
    this.ctx.exp[index] = (this.ctx.exp[index] ?? 0) + amount;
    if (label) {
      this.ctx.showMessage(`${label} +${amount}`);
    }
  }

  /** 경험치 레벨 계산 (EXPLV) */
  getExpLevel(key: ExpKey): number {
    const exp = this.getExperience(key);
    if (exp >= 10000) return 5;
    if (exp >= 5000) return 4;
    if (exp >= 2000) return 3;
    if (exp >= 1000) return 2;
    if (exp >= 500) return 1;
    return 0;
  }

  /** 경험치 인덱스로 레벨 계산 */
  getExpLevelByIndex(index: number): number {
    const exp = this.ctx.exp[index] ?? 0;
    if (exp >= 10000) return 5;
    if (exp >= 5000) return 4;
    if (exp >= 2000) return 3;
    if (exp >= 1000) return 2;
    if (exp >= 500) return 1;
    return 0;
  }

  // ============================================================================
  // PALAM (파라미터) - 조교 중 매번 변동
  // ============================================================================

  /** 파라미터 값 가져오기 */
  getParam(index: number): number {
    return this.ctx.params[index] ?? 0;
  }

  /** 파라미터 레벨 계산 (PALAMLV) */
  getParamLevel(index: number): number {
    const value = this.getParam(index);
    const thresholds = [0, 10000, 30000, 100000, 300000, 1000000, 3000000, 10000000];
    for (let i = thresholds.length - 1; i >= 0; i--) {
      if (value >= thresholds[i]) return i;
    }
    return 0;
  }

  // ============================================================================
  // STAIN (더러움) - 비트마스크
  // ============================================================================

  /** STAIN 배열 초기화 */
  private ensureStain(): number[] {
    if (!this.ctx.stain) {
      this.ctx.stain = new Array(20).fill(0);
    }
    return this.ctx.stain;
  }

  /** 특정 부위에 특정 더러움이 있는지 확인 */
  hasStain(part: StainPartKey, bit: StainBitKey): boolean {
    const stain = this.ctx.stain?.[STAIN_PART[part]] ?? 0;
    return (stain & STAIN_BITS[bit]) !== 0;
  }

  /** 더러움 추가 (비트 OR) */
  addStain(part: StainPartKey, bit: StainBitKey): void {
    const stain = this.ensureStain();
    stain[STAIN_PART[part]] = (stain[STAIN_PART[part]] ?? 0) | STAIN_BITS[bit];
  }

  /** 더러움 인덱스로 직접 추가 */
  addStainByIndex(index: number, bits: number): void {
    const stain = this.ensureStain();
    stain[index] = (stain[index] ?? 0) | bits;
  }

  /** 더러움 가져오기 */
  getStainByIndex(index: number): number {
    return this.ctx.stain?.[index] ?? 0;
  }

  /** 더러움 이동 (양방향) - 대상 내 부위 간 */
  transferStain(from: number, to: number): void {
    const stain = this.ensureStain();
    const fromValue = stain[from] ?? 0;
    const toValue = stain[to] ?? 0;
    stain[from] = fromValue | toValue;
    stain[to] = toValue | fromValue;
  }

  /** 플레이어 STAIN 초기화 */
  private ensurePlayerStain(): number[] {
    if (!this.ctx.playerStain) {
      this.ctx.playerStain = new Array(20).fill(0);
    }
    return this.ctx.playerStain;
  }

  /** 플레이어와 대상 간 더러움 이동 */
  transferStainWithPlayer(targetPart: number, playerPart: number): void {
    const stain = this.ensureStain();
    const playerStain = this.ensurePlayerStain();
    const targetValue = stain[targetPart] ?? 0;
    const playerValue = playerStain[playerPart] ?? 0;
    stain[targetPart] = targetValue | playerValue;
    playerStain[playerPart] = playerValue | targetValue;
  }

  // ============================================================================
  // MARK (각인) - 조교로 누적
  // ============================================================================

  /** 각인 값 가져오기 */
  getMark(key: MarkKey): number {
    return this.ctx.marks?.[MARK[key]] ?? 0;
  }

  /** 각인 인덱스로 가져오기 */
  getMarkByIndex(index: number): number {
    return this.ctx.marks?.[index] ?? 0;
  }

  // ============================================================================
  // CFLAG (캐릭터 플래그)
  // ============================================================================

  /** 캐릭터 플래그 가져오기 */
  getCharFlag(key: CflagKey): number {
    return this.ctx.charFlags?.[CFLAG[key]] ?? 0;
  }

  /** 캐릭터 플래그 인덱스로 가져오기 */
  getCharFlagByIndex(index: number): number {
    return this.ctx.charFlags?.[index] ?? 0;
  }

  /** 캐릭터 플래그 설정 */
  setCharFlag(key: CflagKey, value: number): void {
    if (!this.ctx.charFlags) {
      this.ctx.charFlags = {};
    }
    this.ctx.charFlags[CFLAG[key]] = value;
  }

  /** 캐릭터 플래그 인덱스로 설정 */
  setCharFlagByIndex(index: number, value: number): void {
    if (!this.ctx.charFlags) {
      this.ctx.charFlags = {};
    }
    this.ctx.charFlags[index] = value;
  }

  // ============================================================================
  // FLAG (임시 플래그 / TFLAG)
  // ============================================================================

  /** 임시 플래그 가져오기 */
  getFlag(index: number): number {
    return this.ctx.flags?.[index] ?? 0;
  }

  /** 임시 플래그 설정 */
  setFlag(index: number, value: number): void {
    if (!this.ctx.flags) {
      this.ctx.flags = {};
    }
    this.ctx.flags[index] = value;
  }

  // ============================================================================
  // 편의 메서드
  // ============================================================================

  /** 대상 이름 */
  get targetName(): string {
    return this.ctx.target.name;
  }

  /** 조수 플레이 모드인지 확인 */
  get isAssistantPlay(): boolean {
    return this.ctx.assiPlay === 1;
  }

  /** 이전 커맨드 ID */
  get prevCom(): number {
    return this.ctx.prevCom ?? 0;
  }

  /** 현재 일자 */
  get day(): number {
    return this.ctx.day;
  }

  /** 메시지 표시 */
  message(text: string): void {
    this.ctx.showMessage(text);
  }

  // ============================================================================
  // 공통 판정 헬퍼
  // ============================================================================

  /** 레즈/호모 경험치 처리 */
  handleSexualOrientationExp(lesbianAmount: number, gayAmount: number): void {
    const targetMale = this.hasTalent('남성');
    const playerMale = this.hasPlayerTalent('남성');

    if (!targetMale && !playerMale) {
      this.addExperience('레즈경험', lesbianAmount);
    } else if (targetMale && playerMale) {
      this.addExperience('호모경험', gayAmount);
    }
  }

  /** 애정경험 판정 (호감도 >= 1000 && 주인 플레이) */
  checkAffectionExp(amount: number = 1): void {
    if (this.getCharFlag('호감도') >= 1000 && !this.isAssistantPlay) {
      this.addExperience('애정경험', amount);
    }
  }

  /** V 민감/둔감 보정 적용 */
  applyVSensitivityModifier(sourceKey: SourceKey): void {
    if (this.hasTalent('V둔감')) {
      this.multiplySource(sourceKey, 1.5);
    } else if (this.hasTalent('V민감')) {
      this.multiplySource(sourceKey, 0.6);
    }
  }

  /** A 민감/둔감 보정 적용 */
  applyASensitivityModifier(sourceKey: SourceKey): void {
    if (this.hasTalent('A둔감')) {
      this.multiplySource(sourceKey, 1.5);
    } else if (this.hasTalent('A민감')) {
      this.multiplySource(sourceKey, 0.6);
    }
  }

  /** C 민감/둔감 보정 적용 */
  applyCSensitivityModifier(sourceKey: SourceKey): void {
    if (this.hasTalent('C둔감')) {
      this.multiplySource(sourceKey, 1.5);
    } else if (this.hasTalent('C민감')) {
      this.multiplySource(sourceKey, 0.6);
    }
  }

  /** B 민감/둔감 보정 적용 */
  applyBSensitivityModifier(sourceKey: SourceKey): void {
    if (this.hasTalent('B둔감')) {
      this.multiplySource(sourceKey, 1.5);
    } else if (this.hasTalent('B민감')) {
      this.multiplySource(sourceKey, 0.6);
    }
  }
}
