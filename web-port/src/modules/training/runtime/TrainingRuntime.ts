/**
 * ERB 변환 코드 런타임 구현
 * TrainingContext의 실제 동작을 정의
 */

import type { TrainingContext, Character } from './types';

export class TrainingRuntime implements TrainingContext {
  // ============================================================================
  // 상태 배열 초기화
  // ============================================================================
  params: number[] = new Array(300).fill(0);
  talents: number[] = new Array(240).fill(0);
  playerTalents: number[] = new Array(240).fill(0);
  assiTalents: number[] = new Array(240).fill(0);
  masterTalents: number[] = new Array(240).fill(0);

  flags: number[] = new Array(300).fill(0);

  abilities: number[] = new Array(300).fill(0);
  assiAbilities: number[] = new Array(300).fill(0);
  masterAbilities: number[] = new Array(300).fill(0);

  exp: number[] = new Array(300).fill(0);
  playerExp: number[] = new Array(300).fill(0);

  juel: number[] = new Array(300).fill(0);

  saveStr: string[] = new Array(100).fill('');

  loseBase: number[] = new Array(100).fill(0);
  stain: number[] = new Array(100).fill(0);
  playerStain: number[] = new Array(100).fill(0);
  masterStain: number[] = new Array(100).fill(0);

  playerBase: number[] = new Array(100).fill(0);
  masterBase: number[] = new Array(100).fill(0);

  relation: number[][] = Array.from({ length: 100 }, () => new Array(100).fill(0));

  assiPlay: number = 0;
  player: any = null;
  assi: any = null;

  // ============================================================================
  // 메시지 큐
  // ============================================================================
  private messages: string[] = [];
  private buttons: Array<{ label: string; value: number }> = [];

  // ============================================================================
  // 색상/스타일 상태
  // ============================================================================
  private currentColor: number = 0;
  private currentAlignment: string = 'left';
  private fontStyle: number = 0;

  // ============================================================================
  // 메시지 출력
  // ============================================================================
  showMessage(msg: string): void {
    this.messages.push(msg);
  }

  showText(text: any): void {
    this.messages.push(String(text));
  }

  getString(key: string): string {
    // TODO: CSV 데이터에서 문자열 가져오기
    // 예: "EXPNAME:40" -> "쾌C 경험"
    return `[${key}]`;
  }

  print(text: string): void {
    this.messages.push(text);
  }

  printChar(char: string): void {
    // 특수 문자 반복 출력 (-, +, = 등)
    this.messages.push(char.repeat(40));
  }

  printValue(value: any): void {
    this.messages.push(String(value));
  }

  printValueLine(value: any): void {
    this.messages.push(String(value) + '\n');
  }

  drawLine(char: string = '-'): void {
    this.messages.push(char.repeat(60));
  }

  waitInput(): void {
    // UI에서 엔터 대기
  }

  addButton(label: string, value: number): void {
    this.buttons.push({ label, value });
  }

  // ============================================================================
  // 색상/스타일
  // ============================================================================
  setColor(color: number): void {
    this.currentColor = color;
  }

  resetColor(): void {
    this.currentColor = 0;
  }

  setMultiColor(...colors: number[]): void {
    // 다중 색상 설정
  }

  getColor(): number {
    return this.currentColor;
  }

  setAlignment(align: string): void {
    this.currentAlignment = align;
  }

  setFontStyle(style: number): void {
    this.fontStyle = style;
  }

  resetFontStyle(): void {
    this.fontStyle = 0;
  }

  setFontBold(bold: boolean): void {
    // 볼드 설정
  }

  setFontItalic(italic: boolean): void {
    // 이탤릭 설정
  }

  setFontRegular(): void {
    // 기본 폰트
  }

  // ============================================================================
  // 배율 계산
  // ============================================================================
  times(target: string, multiplier: number): void {
    // UI에 배율 표시 (예: "쾌C × 1.20")
  }

  // ============================================================================
  // 입출력
  // ============================================================================
  async wait(): Promise<void> {
    // 사용자 입력 대기
    return new Promise(resolve => {
      // UI에서 버튼 클릭/엔터 대기
      setTimeout(resolve, 100);
    });
  }

  clearLine(count: number): void {
    // 마지막 N줄 지우기
    this.messages.splice(-count);
  }

  printPlain(text: string): void {
    this.messages.push(text);
  }

  reuseLastLine(): void {
    // 마지막 줄 재사용
  }

  printHtml(html: string): void {
    this.messages.push(html);
  }

  split(ratio: number): void {
    // 화면 분할
  }

  skipDisplay(flag: boolean): void {
    // 출력 스킵 설정
  }

  // ============================================================================
  // 그래픽
  // ============================================================================
  drawBar(current: number, max: number, length: number = 20): void {
    const filled = Math.floor((current / max) * length);
    const empty = length - filled;
    const bar = '█'.repeat(filled) + '░'.repeat(empty);
    this.messages.push(`[${bar}] ${current}/${max}`);
  }

  drawBarStr(...args: any[]): void {
    // 문자열 바 그래프
  }

  // ============================================================================
  // 입력
  // ============================================================================
  async inputNumber(): Promise<number> {
    // UI에서 숫자 입력 대기
    return 0;
  }

  async inputString(): Promise<string> {
    // UI에서 문자열 입력 대기
    return '';
  }

  async oneInput(): Promise<number> {
    // 한 글자 입력
    return 0;
  }

  async oneInputString(): Promise<string> {
    // 한 글자 문자열 입력
    return '';
  }

  async timedInput(timeout: number): Promise<number> {
    // 시간 제한 입력
    return 0;
  }

  async timedWait(time: number): Promise<void> {
    // 시간 제한 대기
    await new Promise(resolve => setTimeout(resolve, time));
  }

  // ============================================================================
  // 능력치 체크
  // ============================================================================
  checkAbilityUp(abl: number): void {
    // 능력치 상승 체크
  }

  checkCharacterAbilityUp(abl: number): void {
    // 캐릭터 능력치 상승 체크
  }

  // ============================================================================
  // 배열/변수 조작
  // ============================================================================
  varSet(...args: any[]): void {
    // 변수 배열 설정
  }

  arraySet(...args: any[]): void {
    // 배열 설정
  }

  arrayShift(...args: any[]): void {
    // 배열 shift
  }

  arrayCopy(...args: any[]): void {
    // 배열 복사
  }

  randomize(): void {
    // 난수 초기화
    Math.random();
  }

  swap(...args: any[]): void {
    // 값 교환
  }

  // ============================================================================
  // 게임 제어
  // ============================================================================
  quitGame(): void {
    // 게임 종료
  }

  restart(): void {
    // 재시작
  }

  async saveGame(): Promise<void> {
    // 게임 저장
  }

  async loadGame(): Promise<void> {
    // 게임 로드
  }

  deleteData(slot: number): void {
    // 데이터 삭제
  }

  resetData(): void {
    // 데이터 리셋
    this.params.fill(0);
    this.flags.fill(0);
    this.exp.fill(0);
  }

  // ============================================================================
  // 비트 연산
  // ============================================================================
  getBit(...args: any[]): number {
    return 0;
  }

  setBit(...args: any[]): void {
    // 비트 설정
  }

  clearBit(...args: any[]): void {
    // 비트 클리어
  }

  invertBit(...args: any[]): void {
    // 비트 반전
  }

  // ============================================================================
  // 출력 제어
  // ============================================================================
  setNoSkip(flag: boolean): void {
    // 스킵 금지
  }

  putForm(text: string): void {
    this.messages.push(text);
  }

  // ============================================================================
  // 문자열 함수
  // ============================================================================
  getStrData(key: string): string {
    return `[${key}]`;
  }

  replace(...args: any[]): string {
    return '';
  }

  substring(...args: any[]): string {
    return '';
  }

  strFind(...args: any[]): number {
    return -1;
  }

  strCount(...args: any[]): number {
    return 0;
  }

  strLen(str: string): number {
    return str.length;
  }

  isNumeric(str: string): boolean {
    return !isNaN(Number(str));
  }

  toUpper(str: string): string {
    return str.toUpperCase();
  }

  toLower(str: string): string {
    return str.toLowerCase();
  }

  toFull(str: string): string {
    // 전각 변환
    return str;
  }

  toHalf(str: string): string {
    // 반각 변환
    return str;
  }

  toNumber(str: string): number {
    return Number(str) || 0;
  }

  toString(val: any): string {
    return String(val);
  }

  formatNumber(num: number): string {
    return num.toLocaleString();
  }

  escape(str: string): string {
    return str;
  }

  encodeToUni(...args: any[]): string {
    return '';
  }

  // ============================================================================
  // 수학 함수
  // ============================================================================
  limit(val: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, val));
  }

  inRange(...args: any[]): boolean {
    return false;
  }

  // ============================================================================
  // 배열 함수
  // ============================================================================
  sumArray(...args: any[]): number {
    return 0;
  }

  maxArray(...args: any[]): number {
    return 0;
  }

  minArray(...args: any[]): number {
    return 0;
  }

  match(...args: any[]): number {
    return -1;
  }

  groupMatch(...args: any[]): boolean {
    return false;
  }

  removeDuplicates(...args: any[]): any[] {
    return [];
  }

  sumConditionalArray(...args: any[]): number {
    return 0;
  }

  arraySize(...args: any[]): number {
    return 0;
  }

  // ============================================================================
  // 시간
  // ============================================================================
  getTime(): number {
    return Date.now();
  }

  // ============================================================================
  // 관계도 함수
  // ============================================================================
  getRelation(character: any, type: string): number {
    // TODO: 관계도 시스템 구현
    return 0;
  }

  setRelation(character: any, type: string, value: number): void {
    // TODO: 관계도 설정
  }

  // ============================================================================
  // 유틸리티
  // ============================================================================
  getMessages(): string[] {
    return [...this.messages];
  }

  clearMessages(): void {
    this.messages = [];
  }

  getButtons(): Array<{ label: string; value: number }> {
    return [...this.buttons];
  }

  clearButtons(): void {
    this.buttons = [];
  }
}

/**
 * 캐릭터 런타임 구현
 */
export class CharacterRuntime implements Character {
  source: number[] = new Array(300).fill(0);
  cflags: number[] = new Array(300).fill(0);
  flags: number[] = this.cflags;  // 별칭
  tflags: number[] = new Array(100).fill(0);
  equipment: number[] = new Array(300).fill(0);
  mark: number[] = new Array(100).fill(0);
  cvar: number[] = new Array(100).fill(0);
  tcvar: number[] = this.cvar;  // 별칭

  constructor(
    public id: number,
    public name: string
  ) {}

  /**
   * SOURCE 초기화
   */
  resetSource(): void {
    this.source.fill(0);
  }

  /**
   * SOURCE 합계 계산
   */
  getSourceSum(): number {
    return this.source.reduce((sum, val) => sum + val, 0);
  }
}
