const fs = require('fs');
const path = require('path');

// ERB에서 추출한 실제 커맨드 이름
const commandNames = {
  0: '애무',
  1: '커닐링구스',
  2: '애널애무',
  3: '자위',
  4: '펠라한다',
  5: '가슴애무',
  6: '키스한다',
  7: '조개벌리기',
  8: '손가락삽입',
  9: '애널핥기',
  10: '로터',
  11: '촉수 삽입',
  12: 'E마사지기',
  13: '애널촉수',
  14: '촉수 클리자극',
  15: '촉수 유두자극',
  16: '촉수 착유',
  17: '촉수 페니스자극',
  18: '샤워',
  19: '애널비즈',
  20: '정상위',
  21: '후배위',
  22: '대면좌위',
  23: '배면좌위',
  24: '역강간',
  25: '역애널강간',
  26: '정상위애널',
  27: '후배위애널',
  28: '대면좌위애널',
  29: '배면좌위애널',
  30: '장갑훑기',
  31: '펠라치오',
  32: '파이즈리',
  33: '스마타',
  34: '기승위',
  35: '거품춤',
  36: '기승위애널',
  37: '애널봉사',
  38: '풋잡',
  39: '오나홀잡',
  40: '스팽킹',
  41: '채찍',
  42: '바늘',
  43: '아이마스크',
  44: '촉수 긴박',
  45: '볼개그',
  46: '촉수 관장',
  47: '본디지 착용',
  48: '풋잡한다',
  49: '애널전극',
  50: '로션',
  51: '미약',
  52: '이뇨제',
  53: '비디오카메라',
  54: '촬영세트 변경',
  55: '아무것도 안한다',
  56: '자기소개',
  57: '수치 플레이',
  58: '목욕탕 플레이',
  59: '코스프레',
  60: '조수에게 키스시킨다',
  61: '커닐링구스강제',
  62: '조수를 범한다',
  63: '조개맞대기',
  64: '・질＆애널 두개 꽂기',
  65: '조수를 범하게 한다',
  66: '두개 펠라',
  67: '풋잡한다',
  68: '더블 펠라',
  69: '식스나인',
  70: '더블 스마타',
  71: '더블 파이즈리',
  72: '미약',
  73: '유두 맞대기',
  80: '이라마치오',
  81: '피스트퍽',
  82: '애널피스트',
  83: '양구멍피스트',
  84: 'G스팟자극',
  85: '방뇨',
  87: '피어싱',
  88: '제모',
  89: '수간 플레이',
  90: '로터자위',
  91: '전동마사지기자위',
  92: '유두로터',
};

// improved.ts 파일 읽기
const improvedPath = path.join(__dirname, '../src/modules/training/commands/improved.ts');
let content = fs.readFileSync(improvedPath, 'utf-8');

// 각 커맨드 클래스의 getName() 수정
let updateCount = 0;
for (let i = 0; i <= 92; i++) {
  const correctName = commandNames[i];
  if (!correctName) continue;

  // getName() 메서드를 찾아서 교체
  // 패턴: export class Com{i}Command ... getName(): string { return '아무거나'; }
  const pattern = new RegExp(
    `(export class Com${i}Command[\\s\\S]{0,300}?getName\\(\\)\\s*:\\s*string\\s*\\{\\s*return\\s*')[^']+(';)`,
    ''
  );

  const newContent = content.replace(pattern, `$1${correctName}$2`);

  if (newContent !== content) {
    updateCount++;
    content = newContent;
  }
}

// 파일 저장
fs.writeFileSync(improvedPath, content, 'utf-8');
console.log(`업데이트 완료! ${updateCount}개 커맨드 이름 수정됨`);
