// CSV 파싱 관련 타입

/**
 * CSV 원본 데이터 포맷
 */
export interface CSVRow {
  [key: string]: string | number;
}

/**
 * BASE.csv 원본 형식
 */
export interface BaseCSVRow {
  0: number;  // ID
  1: string;  // 이름
}

/**
 * Abl.csv 원본 형식
 */
export interface AblCSVRow {
  0: number;  // ID
  1: string;  // 능력 이름
}

/**
 * Palam.csv 원본 형식
 */
export interface ParamCSVRow {
  0: number;  // ID
  1: string;  // 파라미터 이름
}

/**
 * 캐릭터 CSV 원본 형식
 */
export interface CharaCSVRow {
  [key: string]: string | number | undefined;
}

/**
 * CSV 파서 옵션
 */
export interface CSVParserOptions {
  encoding?: 'UTF8' | 'UTF16' | 'SJIS' | 'auto';
  skipComments?: boolean;  // ; 로 시작하는 주석 라인 스킵
  skipEmpty?: boolean;     // 빈 라인 스킵
}

/**
 * 파싱 결과
 */
export interface ParseResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}
