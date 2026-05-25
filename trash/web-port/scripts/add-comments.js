const fs = require('fs');
const path = require('path');

// ERB에서 추출한 실제 커맨드 이름과 설명
const commandInfo = {
  0: { name: '애무', desc: '손과 입으로 가슴과 클리토리스 자극' },
  1: { name: '커닐링구스', desc: '입으로 클리토리스 자극' },
  2: { name: '애널애무', desc: '손으로 애널 자극' },
  3: { name: '자위', desc: '대상이 스스로 바기나 자극' },
  4: { name: '펠라한다', desc: '입으로 페니스 자극' },
  5: { name: '가슴애무', desc: '손과 입으로 유방 자극' },
  6: { name: '키스한다', desc: '입으로 입 자극' },
  7: { name: '조개벌리기', desc: '대상이 스스로 바기나를 벌려 보임' },
  8: { name: '손가락삽입', desc: '손으로 바기나 자극' },
  9: { name: '애널핥기', desc: '입으로 애널 자극' },
  10: { name: '로터', desc: '로터로 클리토리스 자극' },
  11: { name: '촉수 삽입', desc: '촉수로 바기나 자극' },
  12: { name: 'E마사지기', desc: 'E마사지기로 클리토리스 자극' },
  13: { name: '애널촉수', desc: '촉수로 애널 자극' },
  14: { name: '촉수 클리자극', desc: '클리캡으로 클리토리스 자극' },
  15: { name: '촉수 유두자극', desc: '니플캡으로 유두 자극' },
  16: { name: '촉수 착유', desc: '착유기로 유방 자극' },
  17: { name: '촉수 페니스자극', desc: '오나홀로 페니스 자극' },
  18: { name: '샤워', desc: '샤워로 더러움 제거' },
  19: { name: '애널비즈', desc: '애널비즈로 애널 자극' },
  20: { name: '정상위', desc: '페니스를 바기나에 삽입' },
  21: { name: '후배위', desc: '페니스를 바기나에 삽입 (노출↑ 애정↓)' },
  22: { name: '대면좌위', desc: '페니스를 바기나에 삽입 (쾌C↓ 노출↓ 중독↑)' },
  23: { name: '배면좌위', desc: '페니스를 바기나에 삽입 (노출↓ 애정↓ 체력소모↓)' },
  24: { name: '역강간', desc: '대상의 페니스를 조교자 바기나에 삽입' },
  25: { name: '역애널강간', desc: '대상의 페니스를 조교자 애널에 삽입' },
  26: { name: '정상위애널', desc: '페니스를 애널에 삽입 (애정↓ 굴종↑)' },
  27: { name: '후배위애널', desc: '페니스를 애널에 삽입 (기력소비↑ 일탈↑ 굴종↑)' },
  28: { name: '대면좌위애널', desc: '페니스를 애널에 삽입' },
  29: { name: '배면좌위애널', desc: '페니스를 애널에 삽입' },
  30: { name: '장갑훑기', desc: '대상이 조교자 페니스를 손으로 자극' },
  31: { name: '펠라치오', desc: '대상이 조교자 페니스를 입으로 자극' },
  32: { name: '파이즈리', desc: '대상이 조교자 페니스를 유방으로 자극' },
  33: { name: '스마타', desc: '대상이 조교자 페니스를 클리토리스로 자극' },
  34: { name: '기승위', desc: '대상이 조교자 페니스를 바기나로 자극' },
  35: { name: '거품춤', desc: '대상이 조교자 페니스를 클리토리스와 바기나로 자극 (굴종↑ 일탈↑)' },
  36: { name: '기승위애널', desc: '대상이 조교자 페니스를 애널로 자극' },
  37: { name: '애널봉사', desc: '대상이 조교자 애널을 입으로 자극' },
  38: { name: '풋잡', desc: '대상이 조교자 페니스를 발로 자극 (가학쾌락경험↑)' },
  39: { name: '오나홀잡', desc: '대상이 조교자 페니스를 오나홀로 자극' },
  40: { name: '스팽킹', desc: 'SM계 - 스팽킹' },
  41: { name: '채찍', desc: 'SM계 - 채찍' },
  42: { name: '바늘', desc: 'SM계 - 바늘' },
  43: { name: '아이마스크', desc: 'SM계 - 아이마스크' },
  44: { name: '촉수 긴박', desc: 'SM계 - 촉수로 묶기' },
  45: { name: '볼개그', desc: 'SM계 - 볼개그' },
  46: { name: '촉수 관장', desc: 'SM계 - 촉수 관장' },
  47: { name: '본디지 착용', desc: '조수계 - 본디지 착용' },
  48: { name: '풋잡한다', desc: 'SM계 - 조교자가 대상 페니스를 발로 자극' },
  49: { name: '애널전극', desc: 'SM계 - 애널전극' },
  50: { name: '로션', desc: '도구 - 로션' },
  51: { name: '미약', desc: '도구 - 미약' },
  52: { name: '이뇨제', desc: '도구 - 이뇨제' },
  53: { name: '비디오카메라', desc: '도구 - 비디오 촬영' },
  54: { name: '촬영세트 변경', desc: '특수 - 촬영장소 변경' },
  55: { name: '아무것도 안한다', desc: '특수 - 초조하게 만듦' },
  56: { name: '자기소개', desc: '특수 - 자기소개 (촬영 중)' },
  57: { name: '수치 플레이', desc: '특수 - 거울로 수치 플레이' },
  58: { name: '목욕탕 플레이', desc: '특수 - 목욕탕 플레이' },
  59: { name: '코스프레', desc: '특수 - 코스프레' },
  60: { name: '조수에게 키스시킨다', desc: '조수계 - 대상이 조수에게 키스' },
  61: { name: '커닐링구스강제', desc: '조수계 - 대상이 조수 클리토리스를 입으로 자극' },
  62: { name: '조수를 범한다', desc: '조수계 - 조교자가 조수와 섹스' },
  63: { name: '조개맞대기', desc: '조수계 - 대상과 조수의 바기나를 맞댐' },
  64: { name: '・질＆애널 두개 꽂기', desc: '특수 - 조교자와 조수가 동시에 두 곳 공격' },
  65: { name: '조수를 범하게 한다', desc: '조수계 - 대상이 조수를 범함' },
  66: { name: '두개 펠라', desc: '조수계 - 대상이 조수와 조교자 페니스 동시에 입으로' },
  67: { name: '풋잡한다', desc: '조수계 - 풋잡' },
  68: { name: '더블 펠라', desc: '조수계 - 대상과 조수가 동시에 조교자 페니스를 입으로' },
  69: { name: '식스나인', desc: '특수 - 조교자와 대상이 동시에 성기를 입으로 자극' },
  70: { name: '더블 스마타', desc: '조수계 - 대상과 조수가 동시에 스마타' },
  71: { name: '더블 파이즈리', desc: '조수계 - 대상과 조수가 동시에 파이즈리' },
  72: { name: '미약', desc: '도구 - 미약' },
  73: { name: '유두 맞대기', desc: '조수계 - 유두 맞대기 (미완성)' },
  80: { name: '이라마치오', desc: '페니스를 목구멍 깊이 삽입' },
  81: { name: '피스트퍽', desc: '바기나에 주먹 삽입' },
  82: { name: '애널피스트', desc: '애널에 주먹 삽입' },
  83: { name: '양구멍피스트', desc: '바기나와 애널에 동시에 주먹 삽입' },
  84: { name: 'G스팟자극', desc: 'G스팟 자극' },
  85: { name: '방뇨', desc: '대상이 스스로 방뇨' },
  87: { name: '피어싱', desc: '신체에 피어싱 장착' },
  88: { name: '제모', desc: '음모 제거' },
  89: { name: '수간 플레이', desc: '수간 플레이' },
  90: { name: '로터자위', desc: '대상이 스스로 로터로 자위' },
  91: { name: '전동마사지기자위', desc: '대상이 스스로 전동마사지기로 자위' },
  92: { name: '유두로터', desc: '로터로 유두 자극' },
};

// improved.ts 파일 읽기
const improvedPath = path.join(__dirname, '../src/modules/training/commands/improved.ts');
let content = fs.readFileSync(improvedPath, 'utf-8');

// 각 커맨드 클래스 앞에 주석 추가
let commentCount = 0;
for (let i = 0; i <= 92; i++) {
  const info = commandInfo[i];
  if (!info) continue;

  // 이미 주석이 있는지 확인
  const existingCommentPattern = new RegExp(`/\\*\\*[\\s\\S]*?COM${i}:[\\s\\S]*?\\*/\\s*export class Com${i}Command`);
  const hasComment = existingCommentPattern.test(content);

  if (hasComment) {
    // 기존 주석 업데이트
    const updatePattern = new RegExp(
      `(/\\*\\*\\s*\\n\\s*\\* COM${i}:)\\s*[^\\n]+(\\s*\\n\\s*\\*)[^\\n]+(\\s*\\n\\s*\\*/\\s*export class Com${i}Command)`
    );
    content = content.replace(updatePattern, `$1 ${info.name}$2 ${info.desc}$3`);
    commentCount++;
  } else {
    // 새 주석 추가
    const classPattern = new RegExp(`(export class Com${i}Command extends TrainingCommand \\{)`);
    const replacement = `/**\n * COM${i}: ${info.name}\n * ${info.desc}\n */\n$1`;
    content = content.replace(classPattern, replacement);
    commentCount++;
  }
}

// 파일 저장
fs.writeFileSync(improvedPath, content, 'utf-8');
console.log(`주석 추가/업데이트 완료! ${commentCount}개 커맨드 주석 처리됨`);
