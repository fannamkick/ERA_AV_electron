// CSV 인코딩 테스트 스크립트
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Encoding from 'encoding-japanese';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 원본 게임 경로
const originalGamePath = 'e:\\ERA\\AV간편개조\\erAV_Ho_0.022(간편개조) - 복사본\\CSV';

// 테스트할 CSV 파일들
const testFiles = [
  'BASE.csv',
  'Abl.csv',
  'Palam.csv',
  'Chara01_宮間かなで.csv'
];

console.log('=== CSV 파일 인코딩 테스트 ===\n');

testFiles.forEach(filename => {
  const filePath = path.join(originalGamePath, filename);

  try {
    // 바이너리로 파일 읽기
    const buffer = fs.readFileSync(filePath);

    // Shift-JIS에서 유니코드로 변환
    const detectedEncoding = Encoding.detect(buffer);
    console.log(`\n📄 ${filename}`);
    console.log(`   감지된 인코딩: ${detectedEncoding}`);

    const unicodeArray = Encoding.convert(buffer, {
      to: 'UNICODE',
      from: detectedEncoding || 'SJIS'
    });

    const text = Encoding.codeToString(unicodeArray);
    const lines = text.split(/\r?\n/).slice(0, 20); // 처음 20줄만

    console.log(`   총 라인 수: ${text.split(/\r?\n/).length}`);
    console.log('   --- 처음 20줄 ---');
    lines.forEach((line, idx) => {
      if (line.trim()) {
        console.log(`   ${idx + 1}: ${line}`);
      }
    });

  } catch (error) {
    console.error(`❌ ${filename} 읽기 실패:`, error.message);
  }
});
